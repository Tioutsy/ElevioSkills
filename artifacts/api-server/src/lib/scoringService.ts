import { db, elevioScoreLedgerTable, employeesTable, coursesTable, learnerCommitmentsTable, quizAttemptsTable, type ElevioScoreLedger } from "@workspace/db";
import { eq, and, sql, desc, inArray } from "drizzle-orm";
import { logger } from "./logger.js";
import { logAuditEvent } from "./auditLogService.js";

export const SCORING_RULE_VERSION = "v1";

export const SCORING_POINTS = {
  COURSE_COMPLETED: 100,
  QUIZ_PASSED: 50,
  QUIZ_SCORE_80_89: 15,
  QUIZ_SCORE_90_99: 25,
  QUIZ_SCORE_100: 40,
  FIRST_ATTEMPT_PASS: 20,
  WORKPLACE_ACTION_COMPLETED: 50,
} as const;

export type ScoreEventType =
  | "COURSE_COMPLETED"
  | "QUIZ_PASSED"
  | "QUIZ_SCORE_BONUS"
  | "FIRST_ATTEMPT_PASS"
  | "WORKPLACE_ACTION_COMPLETED"
  | "CHALLENGE_COMPLETED";

export type ScoreCategory = "learning" | "knowledge" | "workplaceActions" | "other";

export function getScoreCategory(eventType: string): ScoreCategory {
  switch (eventType) {
    case "COURSE_COMPLETED":
    case "CHALLENGE_COMPLETED":
      return "learning";
    case "QUIZ_PASSED":
    case "QUIZ_SCORE_BONUS":
    case "FIRST_ATTEMPT_PASS":
      return "knowledge";
    case "WORKPLACE_ACTION_COMPLETED":
      return "workplaceActions";
    default:
      return "other";
  }
}

export interface RecordScoreInput {
  companyId: number;
  employeeId: number;
  clerkUserId?: string | null;
  eventType: ScoreEventType;
  sourceEntityType: "course_completion" | "quiz_attempt" | "learner_commitment" | "company_challenge";
  sourceEntityId: string;
  courseId?: number | null;
  points: number;
  idempotencyKey: string;
  eventTimestamp?: Date;
  metadata?: Record<string, any>;
}

/**
 * Atomically records a score transaction into the ledger using its idempotency key.
 * If the idempotency key already exists, returns awarded: false without duplicating points.
 */
export async function recordScoreEvent(input: RecordScoreInput): Promise<{ awarded: boolean; transaction?: ElevioScoreLedger }> {
  try {
    const result = await db
      .insert(elevioScoreLedgerTable)
      .values({
        companyId: input.companyId,
        employeeId: input.employeeId,
        clerkUserId: input.clerkUserId ?? null,
        eventType: input.eventType,
        sourceEntityType: input.sourceEntityType,
        sourceEntityId: String(input.sourceEntityId),
        courseId: input.courseId ?? null,
        points: input.points,
        scoringRuleVersion: SCORING_RULE_VERSION,
        idempotencyKey: input.idempotencyKey,
        metadata: input.metadata ?? null,
        isReversed: false,
        eventTimestamp: input.eventTimestamp ?? new Date(),
      })
      .onConflictDoNothing({ target: elevioScoreLedgerTable.idempotencyKey })
      .returning();

    if (result.length > 0) {
      const transaction = result[0];
      await syncEmployeeElevioScore(input.employeeId);
      logger.info(
        {
          employeeId: input.employeeId,
          companyId: input.companyId,
          eventType: input.eventType,
          points: input.points,
          transactionId: transaction.id,
        },
        "Awarded ELEVIO score points"
      );
      return { awarded: true, transaction };
    }

    return { awarded: false };
  } catch (err: any) {
    logger.error({ err: err?.message, input }, "Failed to record score event");
    throw err;
  }
}

/**
 * Synchronizes the cached elevio_score column on the employees table with the ledger.
 */
export async function syncEmployeeElevioScore(employeeId: number): Promise<number> {
  const result: any = await db.execute(sql`
    SELECT COALESCE(SUM(points), 0)::integer AS total
    FROM "elevio_score_ledger"
    WHERE "employee_id" = ${employeeId}
      AND "is_reversed" = false;
  `);

  const total = Number((result.rows || result)[0]?.total || 0);

  await db
    .update(employeesTable)
    .set({
      elevioScore: total,
      updatedAt: new Date(),
    })
    .where(eq(employeesTable.id, employeeId));

  return total;
}

/**
 * Award points for completing a course (+100).
 */
export async function awardCourseCompletionScore(params: {
  companyId: number;
  employeeId: number;
  clerkUserId?: string | null;
  courseId: number;
  courseTitle?: string | null;
  version?: number | null;
  eventTimestamp?: Date;
}) {
  const version = params.version || 1;
  const idempotencyKey = `emp_${params.employeeId}_COURSE_COMPLETED_course_${params.courseId}_v${version}`;

  return recordScoreEvent({
    companyId: params.companyId,
    employeeId: params.employeeId,
    clerkUserId: params.clerkUserId,
    eventType: "COURSE_COMPLETED",
    sourceEntityType: "course_completion",
    sourceEntityId: `course_${params.courseId}_v${version}`,
    courseId: params.courseId,
    points: SCORING_POINTS.COURSE_COMPLETED,
    idempotencyKey,
    eventTimestamp: params.eventTimestamp,
    metadata: {
      courseTitle: params.courseTitle,
      version,
    },
  });
}

/**
 * Award points for passing a quiz (+50 base, performance bonus, and first-attempt bonus).
 */
export async function awardQuizPassScore(params: {
  companyId: number;
  employeeId: number;
  clerkUserId?: string | null;
  courseId: number;
  courseTitle?: string | null;
  score: number;
  quizAttemptId: number;
  eventTimestamp?: Date;
}) {
  const awards: { eventType: ScoreEventType; awarded: boolean; points: number }[] = [];

  // 1. Base quiz pass (+50)
  const passKey = `emp_${params.employeeId}_QUIZ_PASSED_course_${params.courseId}`;
  const passResult = await recordScoreEvent({
    companyId: params.companyId,
    employeeId: params.employeeId,
    clerkUserId: params.clerkUserId,
    eventType: "QUIZ_PASSED",
    sourceEntityType: "quiz_attempt",
    sourceEntityId: String(params.quizAttemptId),
    courseId: params.courseId,
    points: SCORING_POINTS.QUIZ_PASSED,
    idempotencyKey: passKey,
    eventTimestamp: params.eventTimestamp,
    metadata: {
      courseTitle: params.courseTitle,
      score: params.score,
      quizAttemptId: params.quizAttemptId,
    },
  });
  awards.push({ eventType: "QUIZ_PASSED", awarded: passResult.awarded, points: SCORING_POINTS.QUIZ_PASSED });

  // 2. Knowledge performance bonus (80-89%: +15, 90-99%: +25, 100%: +40)
  let bonusPoints = 0;
  if (params.score === 100) {
    bonusPoints = SCORING_POINTS.QUIZ_SCORE_100;
  } else if (params.score >= 90) {
    bonusPoints = SCORING_POINTS.QUIZ_SCORE_90_99;
  } else if (params.score >= 80) {
    bonusPoints = SCORING_POINTS.QUIZ_SCORE_80_89;
  }

  if (bonusPoints > 0) {
    const bonusKey = `emp_${params.employeeId}_QUIZ_SCORE_BONUS_course_${params.courseId}`;
    const bonusResult = await recordScoreEvent({
      companyId: params.companyId,
      employeeId: params.employeeId,
      clerkUserId: params.clerkUserId,
      eventType: "QUIZ_SCORE_BONUS",
      sourceEntityType: "quiz_attempt",
      sourceEntityId: String(params.quizAttemptId),
      courseId: params.courseId,
      points: bonusPoints,
      idempotencyKey: bonusKey,
      eventTimestamp: params.eventTimestamp,
      metadata: {
        courseTitle: params.courseTitle,
        score: params.score,
        bonusTier: params.score === 100 ? "100%" : params.score >= 90 ? "90-99%" : "80-89%",
        quizAttemptId: params.quizAttemptId,
      },
    });
    awards.push({ eventType: "QUIZ_SCORE_BONUS", awarded: bonusResult.awarded, points: bonusPoints });
  }

  // 3. First-attempt pass (+20)
  // Check if there are any earlier attempts for this user and course
  if (params.clerkUserId) {
    const priorAttemptsResult: any = await db.execute(sql`
      SELECT count(*)::integer AS count
      FROM "quiz_attempts"
      WHERE "user_id" = ${params.clerkUserId}
        AND "course_id" = ${params.courseId}
        AND "id" < ${params.quizAttemptId};
    `);
    const priorCount = Number((priorAttemptsResult.rows || priorAttemptsResult)[0]?.count || 0);

    if (priorCount === 0) {
      const firstAttemptKey = `emp_${params.employeeId}_FIRST_ATTEMPT_PASS_course_${params.courseId}`;
      const firstResult = await recordScoreEvent({
        companyId: params.companyId,
        employeeId: params.employeeId,
        clerkUserId: params.clerkUserId,
        eventType: "FIRST_ATTEMPT_PASS",
        sourceEntityType: "quiz_attempt",
        sourceEntityId: String(params.quizAttemptId),
        courseId: params.courseId,
        points: SCORING_POINTS.FIRST_ATTEMPT_PASS,
        idempotencyKey: firstAttemptKey,
        eventTimestamp: params.eventTimestamp,
        metadata: {
          courseTitle: params.courseTitle,
          quizAttemptId: params.quizAttemptId,
        },
      });
      awards.push({ eventType: "FIRST_ATTEMPT_PASS", awarded: firstResult.awarded, points: SCORING_POINTS.FIRST_ATTEMPT_PASS });
    }
  }

  return awards;
}

/**
 * Award points for completing a workplace action (+50).
 */
export async function awardWorkplaceActionScore(params: {
  companyId: number;
  employeeId: number;
  clerkUserId?: string | null;
  commitmentId: number;
  courseId?: number | null;
  commitmentText?: string | null;
  actionCategory?: string | null;
  eventTimestamp?: Date;
}) {
  const idempotencyKey = `emp_${params.employeeId}_WORKPLACE_ACTION_COMPLETED_action_${params.commitmentId}`;

  return recordScoreEvent({
    companyId: params.companyId,
    employeeId: params.employeeId,
    clerkUserId: params.clerkUserId,
    eventType: "WORKPLACE_ACTION_COMPLETED",
    sourceEntityType: "learner_commitment",
    sourceEntityId: String(params.commitmentId),
    courseId: params.courseId,
    points: SCORING_POINTS.WORKPLACE_ACTION_COMPLETED,
    idempotencyKey,
    eventTimestamp: params.eventTimestamp,
    metadata: {
      commitmentId: params.commitmentId,
      commitmentText: params.commitmentText,
      actionCategory: params.actionCategory,
    },
  });
}

/**
 * Award points for completing a company challenge (+25 to +150, typically +75 or +100).
 */
export async function awardChallengeCompletionScore(params: {
  companyId: number;
  employeeId: number;
  clerkUserId?: string | null;
  challengeId: number;
  challengeTitle?: string;
  points: number;
  completedAt?: Date;
}) {
  const idempotencyKey = `challenge:${params.challengeId}:employee:${params.employeeId}:complete`;

  return recordScoreEvent({
    companyId: params.companyId,
    employeeId: params.employeeId,
    clerkUserId: params.clerkUserId,
    eventType: "CHALLENGE_COMPLETED",
    sourceEntityType: "company_challenge",
    sourceEntityId: String(params.challengeId),
    points: params.points,
    idempotencyKey,
    eventTimestamp: params.completedAt ?? new Date(),
    metadata: {
      challengeId: params.challengeId,
      challengeTitle: params.challengeTitle,
    },
  });
}

/**
 * Retrieves an employee's score summary, category breakdown, and recent transactions.
 */
export async function getEmployeeScoreSummary(employeeId: number, companyId: number) {
  const transactions = await db
    .select()
    .from(elevioScoreLedgerTable)
    .where(
      and(
        eq(elevioScoreLedgerTable.employeeId, employeeId),
        eq(elevioScoreLedgerTable.companyId, companyId)
      )
    )
    .orderBy(desc(elevioScoreLedgerTable.createdAt));

  let totalScore = 0;
  const breakdown = {
    learning: 0,
    knowledge: 0,
    workplaceActions: 0,
    other: 0,
  };

  for (const tx of transactions) {
    if (!tx.isReversed) {
      totalScore += tx.points;
      const category = getScoreCategory(tx.eventType);
      breakdown[category] += tx.points;
    }
  }

  return {
    totalScore,
    breakdown,
    transactionsCount: transactions.length,
    recentTransactions: transactions.slice(0, 10),
  };
}

/**
 * Reverse a score transaction without deleting history.
 */
export async function reverseScoreTransaction(params: {
  transactionId: number;
  reason: string;
  actorUserId: string;
  actorRole: string;
}) {
  const [existing] = await db
    .select()
    .from(elevioScoreLedgerTable)
    .where(eq(elevioScoreLedgerTable.id, params.transactionId))
    .limit(1);

  if (!existing) {
    throw new Error("Score transaction not found");
  }

  if (existing.isReversed) {
    throw new Error("Score transaction is already reversed");
  }

  const [updated] = await db
    .update(elevioScoreLedgerTable)
    .set({
      isReversed: true,
      reversedAt: new Date(),
      reversalReason: params.reason,
    })
    .where(eq(elevioScoreLedgerTable.id, params.transactionId))
    .returning();

  await syncEmployeeElevioScore(existing.employeeId);

  await logAuditEvent({
    companyId: existing.companyId,
    actorUserId: params.actorUserId,
    actorRole: params.actorRole,
    action: "score_transaction.reversed",
    targetType: "elevio_score_ledger",
    targetId: String(existing.id),
    metadata: {
      employeeId: existing.employeeId,
      points: existing.points,
      eventType: existing.eventType,
      reason: params.reason,
    },
  });

  logger.info(
    {
      transactionId: existing.id,
      employeeId: existing.employeeId,
      points: existing.points,
      reason: params.reason,
    },
    "Reversed score transaction"
  );

  return updated;
}
