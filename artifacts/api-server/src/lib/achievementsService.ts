import { db } from "@workspace/db";
import {
  badgeDefinitionsTable,
  employeeBadgesTable,
  enrollmentsTable,
  quizAttemptsTable,
  learnerCommitmentsTable,
  elevioScoreLedgerTable,
  companySeasonsTable,
  learningPathsTable,
  learningPathCoursesTable,
  employeesTable,
  type Employee,
  type BadgeDefinition,
} from "@workspace/db";
import { eq, and, asc, sql, desc, isNull, gte, lte } from "drizzle-orm";
import { logger } from "./logger.js";

// Canonical Sprint 14.2 Categories
export type AchievementCategory =
  | "Learning"
  | "Knowledge"
  | "Action"
  | "Consistency"
  | "Competition";

export type AwardSource =
  | "course_completion"
  | "pathway_completion"
  | "quiz_excellence"
  | "workplace_action"
  | "learning_consistency"
  | "seasonal_competition"
  | "historical_sync";

export interface AchievementItem {
  id: number;
  code: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  isSeasonal: boolean;
  tier: string | null;
  earned: boolean;
  earnedAt: string | null;
  seasonId: number | null;
  metadata: Record<string, any> | null;
  progressCurrent: number;
  progressTarget: number;
  progressLabel: string;
  unlockInstruction: string | null;
  orderIndex: number;
}

export interface AchievementSummary {
  totalEarned: number;
  inProgressCount: number;
  categories: {
    category: AchievementCategory;
    earnedCount: number;
    totalCount: number;
  }[];
  recentEarned: AchievementItem | null;
  achievements: AchievementItem[];
}

// Canonical definitions for Sprint 14.2
export const CANONICAL_ACHIEVEMENTS = [
  {
    code: "FIRST_STEP",
    slug: "first-step",
    name: "First Step",
    description: "Completed your first ELEVIO Skills course.",
    icon: "book-open",
    category: "Learning" as AchievementCategory,
    criteriaType: "course_count",
    threshold: 1,
    isSeasonal: false,
    orderIndex: 10,
  },
  {
    code: "FOUNDATION_COMPLETE",
    slug: "foundation-complete",
    name: "Foundation Complete",
    description: "Completed the Sustainability Foundation pathway.",
    icon: "award",
    category: "Learning" as AchievementCategory,
    criteriaType: "pathway_completion",
    threshold: 1,
    isSeasonal: false,
    orderIndex: 11,
  },
  {
    code: "KNOWLEDGE_PERFORMER",
    slug: "knowledge-performer",
    name: "Knowledge Performer",
    description: "Achieved 90% or higher on a course assessment.",
    icon: "zap",
    category: "Knowledge" as AchievementCategory,
    criteriaType: "assessment_score",
    threshold: 90,
    isSeasonal: false,
    orderIndex: 20,
  },
  {
    code: "PERFECT_ASSESSMENT",
    slug: "perfect-assessment",
    name: "Perfect Assessment",
    description: "Achieved a perfect score on a course assessment.",
    icon: "star",
    category: "Knowledge" as AchievementCategory,
    criteriaType: "assessment_score",
    threshold: 100,
    isSeasonal: false,
    orderIndex: 21,
  },
  {
    code: "FIRST_TRY_SUCCESS",
    slug: "first-try-success",
    name: "First-Try Success",
    description: "Passed a course assessment on the first attempt.",
    icon: "target",
    category: "Knowledge" as AchievementCategory,
    criteriaType: "first_attempt_pass",
    threshold: 1,
    isSeasonal: false,
    orderIndex: 22,
  },
  {
    code: "ACTION_TAKER",
    slug: "action-taker",
    name: "Action Taker",
    description: "Put learning into practice by completing a Workplace Action.",
    icon: "check-square",
    category: "Action" as AchievementCategory,
    criteriaType: "action_count",
    threshold: 1,
    isSeasonal: false,
    orderIndex: 30,
  },
  {
    code: "ACTION_PRACTITIONER",
    slug: "action-practitioner",
    name: "Action Practitioner",
    description: "Completed five Workplace Actions.",
    icon: "briefcase",
    category: "Action" as AchievementCategory,
    criteriaType: "action_count",
    threshold: 5,
    isSeasonal: false,
    orderIndex: 31,
  },
  {
    code: "CONSISTENT_LEARNER",
    slug: "consistent-learner",
    name: "Consistent Learner",
    description: "Stayed actively engaged in learning for three consecutive months.",
    icon: "calendar",
    category: "Consistency" as AchievementCategory,
    criteriaType: "consecutive_months",
    threshold: 3,
    isSeasonal: false,
    orderIndex: 40,
  },
  {
    code: "MONTHLY_TOP_10",
    slug: "monthly-top-10",
    name: "Monthly Top 10",
    description: "Finished among your company's Top 10 learners for the month.",
    icon: "medal",
    category: "Competition" as AchievementCategory,
    criteriaType: "seasonal_rank",
    threshold: 10,
    isSeasonal: true,
    orderIndex: 50,
  },
  {
    code: "MONTHLY_TOP_3",
    slug: "monthly-top-3",
    name: "Monthly Top 3",
    description: "Finished in the Top 3 in your company's monthly ELEVIO ranking.",
    icon: "trophy",
    category: "Competition" as AchievementCategory,
    criteriaType: "seasonal_rank",
    threshold: 3,
    isSeasonal: true,
    orderIndex: 51,
  },
  {
    code: "MONTHLY_LEADER",
    slug: "monthly-leader",
    name: "Monthly Leader",
    description: "Finished #1 in your company's monthly ELEVIO ranking.",
    icon: "crown",
    category: "Competition" as AchievementCategory,
    criteriaType: "seasonal_rank",
    threshold: 1,
    isSeasonal: true,
    orderIndex: 52,
  },
];

/**
 * 1. Synchronize canonical achievement definitions into database idempotently.
 */
export async function ensureAchievementDefinitions() {
  logger.info("Synchronizing ELEVIO Skills achievement definitions...");

  for (const item of CANONICAL_ACHIEVEMENTS) {
    try {
      const [existing] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, item.code))
        .limit(1);

      if (existing) {
        await db
          .update(badgeDefinitionsTable)
          .set({
            slug: item.slug,
            name: item.name,
            description: item.description,
            icon: item.icon,
            category: item.category,
            criteriaType: item.criteriaType,
            threshold: item.threshold,
            isSeasonal: item.isSeasonal,
            orderIndex: item.orderIndex,
            isActive: true,
          })
          .where(eq(badgeDefinitionsTable.id, existing.id));
      } else {
        await db.insert(badgeDefinitionsTable).values({
          code: item.code,
          slug: item.slug,
          name: item.name,
          description: item.description,
          icon: item.icon,
          category: item.category,
          criteriaType: item.criteriaType,
          threshold: item.threshold,
          isSeasonal: item.isSeasonal,
          orderIndex: item.orderIndex,
          isActive: true,
          courseIds: [],
        });
      }
    } catch (err) {
      logger.error({ err, item }, "Failed to sync achievement definition");
    }
  }

  logger.info("Achievement definitions synced successfully.");
}

/**
 * Idempotently awards an achievement to an employee.
 * Strictly guarantees ZERO additional ELEVIO Score points are generated.
 */
export async function awardAchievementIdempotently(params: {
  employee: Employee;
  code: string;
  source: AwardSource;
  seasonId?: number | null;
  metadata?: Record<string, any> | null;
  tx?: any;
}): Promise<boolean> {
  const { employee, code, source, seasonId = null, metadata = null, tx = db } = params;

  const [def] = await tx
    .select()
    .from(badgeDefinitionsTable)
    .where(eq(badgeDefinitionsTable.code, code))
    .limit(1);

  if (!def) {
    logger.warn({ code }, "Attempted to award unknown achievement code");
    return false;
  }

  try {
    // Check if already awarded (handling seasonal vs non-seasonal)
    if (def.isSeasonal && seasonId) {
      const [existing] = await tx
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, employee.id),
            eq(employeeBadgesTable.badgeId, def.id),
            eq(employeeBadgesTable.seasonId, seasonId)
          )
        )
        .limit(1);

      if (existing) return false;
    } else {
      const [existing] = await tx
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, employee.id),
            eq(employeeBadgesTable.badgeId, def.id)
          )
        )
        .limit(1);

      if (existing) return false;
    }

    // Insert badge record (Zero points awarded)
    await tx.insert(employeeBadgesTable).values({
      employeeId: employee.id,
      companyId: employee.companyId,
      badgeId: def.id,
      seasonId: seasonId,
      awardSource: source,
      metadata: metadata ? JSON.stringify(metadata) : null,
      earnedAt: new Date(),
    });

    logger.info(
      {
        employeeId: employee.id,
        achievement: def.name,
        code,
        seasonId,
      },
      "Unlocked professional achievement (0 additional points awarded)"
    );

    return true;
  } catch (err: any) {
    if (err.code === "23505") {
      // Unique constraint conflict — already earned
      return false;
    }
    logger.error({ err, employeeId: employee.id, code }, "Error awarding achievement");
    return false;
  }
}

/**
 * 2. Evaluate Course Completion Achievements (FIRST_STEP, FOUNDATION_COMPLETE)
 */
export async function evaluateCourseCompletionAchievements(params: {
  employee: Employee;
  courseId: number;
  tx?: any;
}): Promise<void> {
  const { employee, tx = db } = params;
  const userId = employee.clerkUserId || employee.email;

  // 1. FIRST_STEP: Completed at least 1 course
  await awardAchievementIdempotently({
    employee,
    code: "FIRST_STEP",
    source: "course_completion",
    tx,
  });

  // 2. FOUNDATION_COMPLETE: Completed all required courses in canonical pathway
  // Find canonical Foundation pathway courses
  const pathwayCourses = await tx
    .select({ courseId: learningPathCoursesTable.courseId })
    .from(learningPathCoursesTable)
    .where(
      and(
        eq(learningPathCoursesTable.pathId, 1),
        eq(learningPathCoursesTable.isRequired, true)
      )
    );

  const requiredCourseIds = pathwayCourses.map((p: any) => p.courseId);
  if (requiredCourseIds.length > 0) {
    const completedCourses = await tx
      .select({ courseId: enrollmentsTable.courseId })
      .from(enrollmentsTable)
      .where(
        and(
          eq(enrollmentsTable.userId, userId),
          eq(enrollmentsTable.status, "completed")
        )
      );

    const completedSet = new Set(completedCourses.map((c: any) => c.courseId));
    const allCompleted = requiredCourseIds.every((id: number) => completedSet.has(id));

    if (allCompleted) {
      await awardAchievementIdempotently({
        employee,
        code: "FOUNDATION_COMPLETE",
        source: "pathway_completion",
        tx,
      });
    }
  }

  // Also check Consistency on learning activity
  await evaluateConsistencyAchievements({ employee, tx });
}

/**
 * 3. Evaluate Quiz Achievements (FIRST_TRY_SUCCESS, KNOWLEDGE_PERFORMER, PERFECT_ASSESSMENT)
 */
export async function evaluateQuizAchievements(params: {
  employee: Employee;
  courseId: number;
  scorePct: number;
  attemptCount: number;
  tx?: any;
}): Promise<void> {
  const { employee, scorePct, attemptCount, tx = db } = params;

  // FIRST_TRY_SUCCESS: Passed on attempt 1
  if (attemptCount === 1) {
    await awardAchievementIdempotently({
      employee,
      code: "FIRST_TRY_SUCCESS",
      source: "quiz_excellence",
      tx,
    });
  }

  // KNOWLEDGE_PERFORMER: >= 90%
  if (scorePct >= 90) {
    await awardAchievementIdempotently({
      employee,
      code: "KNOWLEDGE_PERFORMER",
      source: "quiz_excellence",
      tx,
    });
  }

  // PERFECT_ASSESSMENT: 100%
  if (scorePct >= 100) {
    await awardAchievementIdempotently({
      employee,
      code: "PERFECT_ASSESSMENT",
      source: "quiz_excellence",
      tx,
    });
  }

  // Also evaluate Consistency
  await evaluateConsistencyAchievements({ employee, tx });
}

/**
 * 4. Evaluate Workplace Action Achievements (ACTION_TAKER, ACTION_PRACTITIONER)
 */
export async function evaluateWorkplaceActionAchievements(params: {
  employee: Employee;
  commitmentId?: number;
  tx?: any;
}): Promise<void> {
  const { employee, tx = db } = params;

  // Count distinct completed workplace actions
  const completedActions = await tx
    .select({ id: learnerCommitmentsTable.id })
    .from(learnerCommitmentsTable)
    .where(
      and(
        eq(learnerCommitmentsTable.employeeId, employee.id),
        eq(learnerCommitmentsTable.companyId, employee.companyId),
        eq(learnerCommitmentsTable.status, "action-reported")
      )
    );

  const count = completedActions.length;

  // ACTION_TAKER: >= 1 action
  if (count >= 1) {
    await awardAchievementIdempotently({
      employee,
      code: "ACTION_TAKER",
      source: "workplace_action",
      tx,
    });
  }

  // ACTION_PRACTITIONER: >= 5 actions
  if (count >= 5) {
    await awardAchievementIdempotently({
      employee,
      code: "ACTION_PRACTITIONER",
      source: "workplace_action",
      tx,
    });
  }

  // Also evaluate Consistency
  await evaluateConsistencyAchievements({ employee, tx });
}

/**
 * 5. Evaluate Consistency Achievements (CONSISTENT_LEARNER)
 * Active non-reversed learning score events during 3 consecutive calendar months.
 */
export async function evaluateConsistencyAchievements(params: {
  employee: Employee;
  tx?: any;
}): Promise<void> {
  const { employee, tx = db } = params;

  const records = await tx
    .select({ eventTimestamp: elevioScoreLedgerTable.eventTimestamp })
    .from(elevioScoreLedgerTable)
    .where(
      and(
        eq(elevioScoreLedgerTable.companyId, employee.companyId),
        eq(elevioScoreLedgerTable.employeeId, employee.id),
        eq(elevioScoreLedgerTable.isReversed, false)
      )
    );

  const monthSet = new Set<string>();
  for (const r of records) {
    if (r.eventTimestamp) {
      const d = new Date(r.eventTimestamp);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      monthSet.add(`${y}-${m}`);
    }
  }

  const monthKeys = Array.from(monthSet).sort();
  if (monthKeys.length < 3) return;

  // Check for 3 consecutive months
  let hasConsecutive3 = false;
  for (let i = 0; i <= monthKeys.length - 3; i++) {
    const [y1, m1] = monthKeys[i].split("-").map(Number);
    const [y2, m2] = monthKeys[i + 1].split("-").map(Number);
    const [y3, m3] = monthKeys[i + 2].split("-").map(Number);

    const date1 = new Date(Date.UTC(y1, m1 - 1, 1));
    const date2 = new Date(Date.UTC(y2, m2 - 1, 1));
    const date3 = new Date(Date.UTC(y3, m3 - 1, 1));

    // Next month check
    const diff1 = (date2.getUTCFullYear() - date1.getUTCFullYear()) * 12 + (date2.getUTCMonth() - date1.getUTCMonth());
    const diff2 = (date3.getUTCFullYear() - date2.getUTCFullYear()) * 12 + (date3.getUTCMonth() - date2.getUTCMonth());

    if (diff1 === 1 && diff2 === 1) {
      hasConsecutive3 = true;
      break;
    }
  }

  if (hasConsecutive3) {
    await awardAchievementIdempotently({
      employee,
      code: "CONSISTENT_LEARNER",
      source: "learning_consistency",
      tx,
    });
  }
}

/**
 * 6. Evaluate Seasonal Competition Achievements on CLOSED Seasons
 * (MONTHLY_TOP_10, MONTHLY_TOP_3, MONTHLY_LEADER)
 */
export async function evaluateClosedSeasonAchievements(params: {
  companyId: number;
  seasonId: number;
  tx?: any;
}): Promise<void> {
  const { companyId, seasonId, tx = db } = params;

  // 1. Verify season is CLOSED
  const [season] = await tx
    .select()
    .from(companySeasonsTable)
    .where(
      and(
        eq(companySeasonsTable.id, seasonId),
        eq(companySeasonsTable.companyId, companyId)
      )
    )
    .limit(1);

  if (!season || season.status !== "CLOSED") {
    logger.warn({ seasonId, status: season?.status }, "Cannot award competition achievements on non-closed season");
    return;
  }

  // 2. Query seasonal scores using Drizzle
  const records = await tx
    .select({
      employeeId: elevioScoreLedgerTable.employeeId,
      points: elevioScoreLedgerTable.points,
    })
    .from(elevioScoreLedgerTable)
    .where(
      and(
        eq(elevioScoreLedgerTable.companyId, companyId),
        eq(elevioScoreLedgerTable.isReversed, false),
        gte(elevioScoreLedgerTable.eventTimestamp, season.startDate),
        lte(elevioScoreLedgerTable.eventTimestamp, season.endDate)
      )
    );

  const scoreByEmp = new Map<number, number>();
  for (const r of records) {
    scoreByEmp.set(r.employeeId, (scoreByEmp.get(r.employeeId) || 0) + r.points);
  }

  const participants = Array.from(scoreByEmp.entries())
    .map(([employeeId, seasonalScore]) => ({ employee_id: employeeId, seasonal_score: seasonalScore }))
    .filter((p) => p.seasonal_score > 0)
    .sort((a, b) => b.seasonal_score - a.seasonal_score);

  if (participants.length === 0) return;

  // Assign standard competition ranks (1, 2, 2, 4)
  let currentRank = 1;
  for (let i = 0; i < participants.length; i++) {
    if (i > 0 && participants[i].seasonal_score < participants[i - 1].seasonal_score) {
      currentRank = i + 1;
    }

    const empId = participants[i].employee_id;
    const employeeObj = { id: empId, companyId } as Employee;

    // MONTHLY_LEADER: Rank 1
    if (currentRank === 1) {
      await awardAchievementIdempotently({
        employee: employeeObj,
        code: "MONTHLY_LEADER",
        source: "seasonal_competition",
        seasonId: season.id,
        metadata: {
          seasonTitle: season.title,
          place: 1,
          label: `Monthly Leader — ${season.title}`,
        },
        tx,
      });
    }

    // MONTHLY_TOP_3: Rank <= 3
    if (currentRank <= 3) {
      const placeLabel = currentRank === 1 ? "1st Place" : currentRank === 2 ? "2nd Place" : "3rd Place";
      await awardAchievementIdempotently({
        employee: employeeObj,
        code: "MONTHLY_TOP_3",
        source: "seasonal_competition",
        seasonId: season.id,
        metadata: {
          seasonTitle: season.title,
          rank: currentRank,
          placeLabel: `${placeLabel} — ${season.title}`,
        },
        tx,
      });
    }

    // MONTHLY_TOP_10: Rank <= 10
    if (currentRank <= 10) {
      await awardAchievementIdempotently({
        employee: employeeObj,
        code: "MONTHLY_TOP_10",
        source: "seasonal_competition",
        seasonId: season.id,
        metadata: {
          seasonTitle: season.title,
          rank: currentRank,
          label: `Monthly Top 10 — ${season.title}`,
        },
        tx,
      });
    }
  }

  logger.info({ companyId, seasonId, participantCount: participants.length }, "Evaluated closed season competition achievements");
}

/**
 * 7. Get Complete Employee Achievement Progress and Metrics
 */
export async function getEmployeeAchievementProgress(
  employee: Employee
): Promise<AchievementSummary> {
  const userId = employee.clerkUserId || employee.email;

  // Load earned awards for this employee
  const earnedRecords = await db
    .select()
    .from(employeeBadgesTable)
    .where(eq(employeeBadgesTable.employeeId, employee.id))
    .orderBy(desc(employeeBadgesTable.earnedAt));

  // Map of earned badges: code -> array of earned instances
  const earnedByBadgeId = new Map<number, typeof employeeBadgesTable.$inferSelect[]>();
  for (const rec of earnedRecords) {
    if (!earnedByBadgeId.has(rec.badgeId)) {
      earnedByBadgeId.set(rec.badgeId, []);
    }
    earnedByBadgeId.get(rec.badgeId)!.push(rec);
  }

  // Load definitions
  const definitions = await db
    .select()
    .from(badgeDefinitionsTable)
    .where(eq(badgeDefinitionsTable.isActive, true))
    .orderBy(asc(badgeDefinitionsTable.orderIndex));

  // 1. Completed courses count
  const completedEnrollments = await db
    .select({ courseId: enrollmentsTable.courseId })
    .from(enrollmentsTable)
    .where(
      and(
        eq(enrollmentsTable.userId, userId),
        eq(enrollmentsTable.status, "completed")
      )
    );
  const completedCourseCount = completedEnrollments.length;

  // 2. Pathway courses progress
  const pathwayCourses = await db
    .select({ courseId: learningPathCoursesTable.courseId })
    .from(learningPathCoursesTable)
    .where(
      and(
        eq(learningPathCoursesTable.pathId, 1),
        eq(learningPathCoursesTable.isRequired, true)
      )
    );
  const pathwayCourseIds = new Set(pathwayCourses.map((p) => p.courseId));
  const completedPathwayCount = completedEnrollments.filter((c) =>
    pathwayCourseIds.has(c.courseId)
  ).length;
  const pathwayTotal = pathwayCourseIds.size || 12;

  // 3. Completed actions count
  const completedActions = await db
    .select({ id: learnerCommitmentsTable.id })
    .from(learnerCommitmentsTable)
    .where(
      and(
        eq(learnerCommitmentsTable.employeeId, employee.id),
        eq(learnerCommitmentsTable.companyId, employee.companyId),
        eq(learnerCommitmentsTable.status, "action-reported")
      )
    );
  const completedActionsCount = completedActions.length;

  // 4. Consecutive months count
  const activeMonthsResult = await db.execute(sql`
    SELECT DISTINCT TO_CHAR(event_timestamp AT TIME ZONE 'UTC', 'YYYY-MM') AS month_key
    FROM elevio_score_ledger
    WHERE company_id = ${employee.companyId}
      AND employee_id = ${employee.id}
      AND is_reversed = false
    ORDER BY month_key ASC;
  `);
  const monthKeys: string[] = (activeMonthsResult.rows || activeMonthsResult).map(
    (r: any) => r.month_key
  );
  let maxConsecutiveMonths = 0;
  if (monthKeys.length > 0) {
    let currentStreak = 1;
    maxConsecutiveMonths = 1;
    for (let i = 0; i < monthKeys.length - 1; i++) {
      const [y1, m1] = monthKeys[i].split("-").map(Number);
      const [y2, m2] = monthKeys[i + 1].split("-").map(Number);
      const date1 = new Date(Date.UTC(y1, m1 - 1, 1));
      const date2 = new Date(Date.UTC(y2, m2 - 1, 1));
      const diff = (date2.getUTCFullYear() - date1.getUTCFullYear()) * 12 + (date2.getUTCMonth() - date1.getUTCMonth());
      if (diff === 1) {
        currentStreak++;
        if (currentStreak > maxConsecutiveMonths) maxConsecutiveMonths = currentStreak;
      } else {
        currentStreak = 1;
      }
    }
  }

  // 5. Quiz highest score
  const quizScores = await db
    .select({ score: quizAttemptsTable.score })
    .from(quizAttemptsTable)
    .where(
      and(
        eq(quizAttemptsTable.userId, userId),
        eq(quizAttemptsTable.passed, true)
      )
    );
  const maxQuizScore = quizScores.length ? Math.max(...quizScores.map((q) => q.score)) : 0;

  const achievementItems: AchievementItem[] = [];

  for (const def of definitions) {
    const earnedInstances = earnedByBadgeId.get(def.id) || [];
    const isEarned = earnedInstances.length > 0;
    const latestEarned = earnedInstances[0] || null;

    let progressCurrent = 0;
    let progressTarget = def.threshold || 1;
    let progressLabel = "Locked";
    let unlockInstruction: string | null = null;

    let parsedMetadata = null;
    if (latestEarned?.metadata) {
      try {
        parsedMetadata = JSON.parse(latestEarned.metadata);
      } catch {
        parsedMetadata = { raw: latestEarned.metadata };
      }
    }

    switch (def.code) {
      case "FIRST_STEP":
        progressCurrent = isEarned ? 1 : Math.min(completedCourseCount, 1);
        progressTarget = 1;
        progressLabel = isEarned ? "Completed" : `${progressCurrent} of 1 course`;
        unlockInstruction = "Complete any qualifying course to unlock.";
        break;

      case "FOUNDATION_COMPLETE":
        progressCurrent = isEarned ? pathwayTotal : completedPathwayCount;
        progressTarget = pathwayTotal;
        progressLabel = isEarned ? "Completed" : `${progressCurrent} of ${pathwayTotal} pathway courses`;
        unlockInstruction = `Complete all ${pathwayTotal} courses in the Sustainability Foundation pathway.`;
        break;

      case "KNOWLEDGE_PERFORMER":
        progressCurrent = isEarned ? 90 : maxQuizScore;
        progressTarget = 90;
        progressLabel = isEarned ? "Completed" : `${progressCurrent}% / 90%`;
        unlockInstruction = "Score 90% or higher on any course quiz assessment.";
        break;

      case "PERFECT_ASSESSMENT":
        progressCurrent = isEarned ? 100 : maxQuizScore;
        progressTarget = 100;
        progressLabel = isEarned ? "Completed" : `${progressCurrent}% / 100%`;
        unlockInstruction = "Score 100% on any course quiz assessment.";
        break;

      case "FIRST_TRY_SUCCESS":
        progressCurrent = isEarned ? 1 : 0;
        progressTarget = 1;
        progressLabel = isEarned ? "Completed" : "0 / 1";
        unlockInstruction = "Pass a course assessment on your very first attempt.";
        break;

      case "ACTION_TAKER":
        progressCurrent = isEarned ? 1 : Math.min(completedActionsCount, 1);
        progressTarget = 1;
        progressLabel = isEarned ? "Completed" : `${progressCurrent} of 1 action`;
        unlockInstruction = "Complete and report your first workplace action.";
        break;

      case "ACTION_PRACTITIONER":
        progressCurrent = isEarned ? 5 : Math.min(completedActionsCount, 5);
        progressTarget = 5;
        progressLabel = isEarned ? "Completed" : `${progressCurrent} of 5 actions`;
        unlockInstruction = `${Math.max(0, 5 - completedActionsCount)} more Workplace Actions to unlock.`;
        break;

      case "CONSISTENT_LEARNER":
        progressCurrent = isEarned ? 3 : Math.min(maxConsecutiveMonths, 3);
        progressTarget = 3;
        progressLabel = isEarned ? "Completed" : `${progressCurrent} of 3 consecutive months`;
        unlockInstruction = "Stay active in learning across 3 consecutive calendar months.";
        break;

      case "MONTHLY_TOP_10":
      case "MONTHLY_TOP_3":
      case "MONTHLY_LEADER":
        progressCurrent = isEarned ? 1 : 0;
        progressTarget = 1;
        progressLabel = isEarned ? "Awarded" : "Competition Milestone";
        unlockInstruction = "Awarded upon monthly season closure based on final company standings.";
        break;

      default:
        progressCurrent = isEarned ? 1 : 0;
        progressTarget = 1;
        progressLabel = isEarned ? "Completed" : "In Progress";
        break;
    }

    achievementItems.push({
      id: def.id,
      code: def.code || def.slug.toUpperCase(),
      name: def.name,
      description: def.description,
      icon: def.icon,
      category: (def.category || "Learning") as AchievementCategory,
      isSeasonal: def.isSeasonal,
      tier: def.tier,
      earned: isEarned,
      earnedAt: latestEarned ? latestEarned.earnedAt.toISOString() : null,
      seasonId: latestEarned?.seasonId || null,
      metadata: parsedMetadata,
      progressCurrent,
      progressTarget,
      progressLabel,
      unlockInstruction,
      orderIndex: def.orderIndex,
    });
  }

  const earnedList = achievementItems.filter((a) => a.earned);
  const inProgressList = achievementItems.filter((a) => !a.earned);

  const categories: AchievementCategory[] = [
    "Learning",
    "Knowledge",
    "Action",
    "Consistency",
    "Competition",
  ];

  const categoryStats = categories.map((cat) => ({
    category: cat,
    earnedCount: achievementItems.filter((a) => a.category === cat && a.earned).length,
    totalCount: achievementItems.filter((a) => a.category === cat).length,
  }));

  const recentEarned = earnedList.length
    ? [...earnedList].sort((a, b) => (b.earnedAt || "").localeCompare(a.earnedAt || ""))[0]
    : null;

  return {
    totalEarned: earnedList.length,
    inProgressCount: inProgressList.length,
    categories: categoryStats,
    recentEarned,
    achievements: achievementItems,
  };
}

/**
 * 8. Company Admin: Get Organization-Wide Recognition Summary
 */
export async function getCompanyRecognitionAnalytics(companyId: number): Promise<{
  totalAchievementsAwarded: number;
  activeEmployeesWithAchievements: number;
  totalActiveEmployees: number;
  achievementBreakdown: {
    code: string;
    name: string;
    category: string;
    icon: string;
    awardedCount: number;
  }[];
}> {
  const [empCount] = await db
    .select({ count: sql<number>`count(*)::integer` })
    .from(employeesTable)
    .where(
      and(
        eq(employeesTable.companyId, companyId),
        eq(employeesTable.status, "active")
      )
    );

  const breakdownResult = await db.execute(sql`
    SELECT 
      b.code,
      b.name,
      b.category,
      b.icon,
      COUNT(eb.id)::integer AS awarded_count
    FROM badge_definitions b
    LEFT JOIN employee_badges eb 
      ON eb.badge_id = b.id 
      AND eb.company_id = ${companyId}
    WHERE b.is_active = true
    GROUP BY b.id, b.code, b.name, b.category, b.icon, b.order_index
    ORDER BY b.order_index ASC;
  `);

  const breakdown = (breakdownResult.rows || breakdownResult).map((r: any) => ({
    code: r.code,
    name: r.name,
    category: r.category,
    icon: r.icon,
    awardedCount: Number(r.awarded_count) || 0,
  }));

  const totalAwards = breakdown.reduce((acc: number, item: any) => acc + item.awardedCount, 0);

  const [distinctEmployees] = await db
    .select({ count: sql<number>`count(DISTINCT ${employeeBadgesTable.employeeId})::integer` })
    .from(employeeBadgesTable)
    .where(eq(employeeBadgesTable.companyId, companyId));

  return {
    totalAchievementsAwarded: totalAwards,
    activeEmployeesWithAchievements: distinctEmployees?.count || 0,
    totalActiveEmployees: empCount?.count || 0,
    achievementBreakdown: breakdown,
  };
}

// Compatibility wrappers for existing routes and scripts
export async function awardCourseBadge(employee: Employee, courseId: number): Promise<any> {
  await evaluateCourseCompletionAchievements({ employee, courseId });
  return null;
}

export async function evaluateCourseMilestones(employee: Employee): Promise<any[]> {
  await evaluateConsistencyAchievements({ employee });
  return [];
}

export async function evaluateChallengeAchievements(employee: Employee): Promise<any[]> {
  await evaluateWorkplaceActionAchievements({ employee });
  return [];
}

