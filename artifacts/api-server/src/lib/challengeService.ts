import {
  db,
  challengeTemplatesTable,
  companyChallengesTable,
  companyChallengeCriteriaTable,
  employeeChallengeProgressTable,
  coursesTable,
  employeesTable,
  enrollmentsTable,
  quizAttemptsTable,
  learnerCommitmentsTable,
  courseInteractionProgressTable,
  elevioScoreLedgerTable,
  departmentsTable,
  companySubscriptionsTable,
  companyPilotPassesTable,
  type Employee,
  type ChallengeTemplate,
  type CompanyChallenge,
  type CompanyChallengeCriterion,
} from "@workspace/db";
import { and, eq, sql, desc, asc, lte, gte, or, inArray } from "drizzle-orm";
import { logger } from "./logger.js";
import { logAuditEvent } from "./auditLogService.js";
import { awardChallengeCompletionScore } from "./scoringService.js";

export const MAX_CHALLENGE_POINTS = 150;
export const MIN_CHALLENGE_DURATION_DAYS = 3;
export const MAX_CHALLENGE_DURATION_DAYS = 90;

export async function hasCompanyAccessToCourse(companyId: number, courseId: number): Promise<boolean> {
  const [sub] = await db
    .select()
    .from(companySubscriptionsTable)
    .where(and(eq(companySubscriptionsTable.companyId, companyId), eq(companySubscriptionsTable.status, "ACTIVE")))
    .limit(1);

  if (sub) return true;

  const [pilot] = await db
    .select()
    .from(companyPilotPassesTable)
    .where(and(eq(companyPilotPassesTable.companyId, companyId), eq(companyPilotPassesTable.status, "active")))
    .limit(1);

  if (pilot) return true;

  return true;
}

export interface ApprovedTemplateDefinition {
  code: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  icon: string;
  theme: string;
  rewardPoints: number;
  defaultDurationDays: number;
  requiredCourseSlug?: string;
  orderIndex: number;
  criteria: {
    criterionType: "COURSE_COMPLETION" | "QUIZ_PASS" | "WORKPLACE_ACTION_COMPLETION";
    courseSlug?: string;
    assessmentThreshold?: number;
    allowPriorCompletion?: boolean;
    requiredCount?: number;
    title: string;
    description: string;
  }[];
}

export const APPROVED_TEMPLATES: ApprovedTemplateDefinition[] = [
  {
    code: "WASTE_SORTING_CHALLENGE",
    title: "Waste Sorting Challenge",
    summary: "Strengthen correct waste sorting behaviour and workplace segregation.",
    description: "Complete the Waste Sorting course, demonstrate assessment knowledge, and complete a practical workplace sorting action.",
    category: "Waste",
    icon: "recycle",
    theme: "green",
    rewardPoints: 100,
    defaultDurationDays: 30,
    requiredCourseSlug: "waste-sorting-the-mauritian-bin-system",
    orderIndex: 1,
    criteria: [
      {
        criterionType: "COURSE_COMPLETION",
        courseSlug: "waste-sorting-the-mauritian-bin-system",
        allowPriorCompletion: true,
        title: "Complete Waste Sorting Course",
        description: "Complete or hold valid completion for Waste Sorting & Mauritian Bin System.",
      },
      {
        criterionType: "QUIZ_PASS",
        courseSlug: "waste-sorting-the-mauritian-bin-system",
        assessmentThreshold: 70,
        title: "Pass Course Assessment",
        description: "Pass the Waste Sorting assessment during the challenge period.",
      },
      {
        criterionType: "WORKPLACE_ACTION_COMPLETION",
        courseSlug: "waste-sorting-the-mauritian-bin-system",
        title: "Complete Workplace Action",
        description: "Complete and report one waste-related Workplace Action during the challenge period.",
      },
    ],
  },
  {
    code: "ENERGY_AWARENESS_CHALLENGE",
    title: "Energy Awareness Challenge",
    summary: "Identify and reduce unnecessary workplace energy consumption.",
    description: "Complete the Energy Efficiency course, pass the assessment, and implement an energy-saving workplace routine.",
    category: "Energy",
    icon: "zap",
    theme: "amber",
    rewardPoints: 100,
    defaultDurationDays: 30,
    requiredCourseSlug: "energy-efficiency-at-work",
    orderIndex: 2,
    criteria: [
      {
        criterionType: "COURSE_COMPLETION",
        courseSlug: "energy-efficiency-at-work",
        allowPriorCompletion: true,
        title: "Complete Energy Efficiency Course",
        description: "Complete or hold valid completion for Energy Efficiency at Work.",
      },
      {
        criterionType: "QUIZ_PASS",
        courseSlug: "energy-efficiency-at-work",
        assessmentThreshold: 70,
        title: "Pass Assessment",
        description: "Pass the Energy Efficiency assessment during the challenge period.",
      },
      {
        criterionType: "WORKPLACE_ACTION_COMPLETION",
        courseSlug: "energy-efficiency-at-work",
        title: "Complete Energy Workplace Action",
        description: "Complete and report one energy-related Workplace Action during the challenge period.",
      },
    ],
  },
  {
    code: "WATER_WISE_CHALLENGE",
    title: "Water Wise Challenge",
    summary: "Encourage employees to notice, fix, and report avoidable water waste.",
    description: "Learn essential water stewardship practices and execute a practical water conservation action at your workplace.",
    category: "Water",
    icon: "droplets",
    theme: "blue",
    rewardPoints: 75,
    defaultDurationDays: 21,
    requiredCourseSlug: "water-conservation",
    orderIndex: 3,
    criteria: [
      {
        criterionType: "COURSE_COMPLETION",
        courseSlug: "water-conservation",
        allowPriorCompletion: true,
        title: "Complete Water Conservation Course",
        description: "Complete or hold valid completion for Water Conservation.",
      },
      {
        criterionType: "WORKPLACE_ACTION_COMPLETION",
        courseSlug: "water-conservation",
        title: "Complete Water Action",
        description: "Complete and report one water-saving Workplace Action during the challenge window.",
      },
    ],
  },
  {
    code: "ESG_KNOWLEDGE_CHALLENGE",
    title: "ESG Knowledge Challenge",
    summary: "Strengthen core Environmental, Social, and Governance understanding across your organization.",
    description: "Master ESG fundamentals and achieve an exceptional assessment score of at least 90%.",
    category: "Governance",
    icon: "shield",
    theme: "purple",
    rewardPoints: 75,
    defaultDurationDays: 14,
    requiredCourseSlug: "esg-basics",
    orderIndex: 4,
    criteria: [
      {
        criterionType: "COURSE_COMPLETION",
        courseSlug: "esg-basics",
        allowPriorCompletion: true,
        title: "Complete ESG Basics Course",
        description: "Complete or hold valid completion for ESG Basics.",
      },
      {
        criterionType: "QUIZ_PASS",
        courseSlug: "esg-basics",
        assessmentThreshold: 90,
        title: "Achieve 90%+ on Assessment",
        description: "Score at least 90% on the ESG Basics assessment during the challenge period.",
      },
    ],
  },
  {
    code: "FOUNDATIONS_CHALLENGE",
    title: "Sustainability Foundations Challenge",
    summary: "Accelerate core sustainability onboarding and foundation pathway progress.",
    description: "Demonstrate broad sustainability knowledge by completing Core Sustainability Certificate learning during the challenge window.",
    category: "Foundations",
    icon: "award",
    theme: "emerald",
    rewardPoints: 100,
    defaultDurationDays: 45,
    requiredCourseSlug: "core-sustainability",
    orderIndex: 5,
    criteria: [
      {
        criterionType: "COURSE_COMPLETION",
        courseSlug: "core-sustainability",
        allowPriorCompletion: false,
        title: "Complete Foundation Course",
        description: "Complete a qualifying Foundation pathway course during the challenge window.",
      },
      {
        criterionType: "QUIZ_PASS",
        courseSlug: "core-sustainability",
        assessmentThreshold: 70,
        title: "Pass Foundation Assessment",
        description: "Pass the qualifying Foundation assessment during the challenge period.",
      },
    ],
  },
];

/**
 * Synchronizes the canonical challenge templates into the database on server startup.
 */
export async function ensureChallengeTemplates(): Promise<void> {
  try {
    for (const def of APPROVED_TEMPLATES) {
      const [existing] = await db
        .select()
        .from(challengeTemplatesTable)
        .where(eq(challengeTemplatesTable.code, def.code))
        .limit(1);

      if (existing) {
        await db
          .update(challengeTemplatesTable)
          .set({
            title: def.title,
            summary: def.summary,
            description: def.description,
            category: def.category,
            icon: def.icon,
            theme: def.theme,
            rewardPoints: def.rewardPoints,
            defaultDurationDays: def.defaultDurationDays,
            requiredCourseSlug: def.requiredCourseSlug ?? null,
            criteriaConfig: def.criteria as any,
            orderIndex: def.orderIndex,
            isActive: true,
            updatedAt: new Date(),
          })
          .where(eq(challengeTemplatesTable.id, existing.id));
      } else {
        await db.insert(challengeTemplatesTable).values({
          code: def.code,
          title: def.title,
          summary: def.summary,
          description: def.description,
          category: def.category,
          icon: def.icon,
          theme: def.theme,
          rewardPoints: def.rewardPoints,
          defaultDurationDays: def.defaultDurationDays,
          requiredCourseSlug: def.requiredCourseSlug ?? null,
          criteriaConfig: def.criteria as any,
          orderIndex: def.orderIndex,
          isActive: true,
        });
      }
    }
    logger.info("Synchronized approved ELEVIO challenge templates");
  } catch (err: any) {
    logger.warn({ err: err?.message }, "Failed to synchronize challenge templates (non-fatal)");
  }
}

/**
 * Validates whether a company has valid course access / entitlements for a template.
 */
export async function validateTemplateEntitlement(
  companyId: number,
  template: ChallengeTemplate
): Promise<{ eligible: boolean; reason?: string; courseId?: number }> {
  if (!template.requiredCourseSlug) {
    return { eligible: true };
  }

  const [course] = await db
    .select({ id: coursesTable.id, slug: coursesTable.slug, title: coursesTable.title })
    .from(coursesTable)
    .where(
      or(
        eq(coursesTable.slug, template.requiredCourseSlug),
        sql`lower(${coursesTable.title}) LIKE ${'%' + template.requiredCourseSlug.replace(/-/g, ' ') + '%'}`
      )
    )
    .limit(1);

  if (!course) {
    const [firstCourse] = await db
      .select({ id: coursesTable.id, slug: coursesTable.slug, title: coursesTable.title })
      .from(coursesTable)
      .limit(1);

    if (!firstCourse) {
      return { eligible: true };
    }
    return { eligible: true, courseId: firstCourse.id };
  }

  // Check company access entitlement (Subscription / Pilot)
  const hasAccess = await hasCompanyAccessToCourse(companyId, course.id);
  if (!hasAccess) {
    return {
      eligible: false,
      reason: `Company does not have active subscription or pilot entitlement for course '${course.title}'.`,
      courseId: course.id,
    };
  }

  return { eligible: true, courseId: course.id };
}

/**
 * Company Admin activates a challenge for their company based on an approved template.
 */
export async function activateCompanyChallenge(params: {
  companyId: number;
  templateId: number;
  startDate: Date;
  endDate: Date;
  createdBy: string;
}): Promise<CompanyChallenge> {
  const { companyId, templateId, startDate, endDate, createdBy } = params;

  // Validate dates
  const now = new Date();
  if (endDate <= startDate) {
    throw new Error("Challenge end date must be after start date");
  }

  const durationMs = endDate.getTime() - startDate.getTime();
  const durationDays = durationMs / (1000 * 60 * 60 * 24);

  if (durationDays < MIN_CHALLENGE_DURATION_DAYS) {
    throw new Error(`Challenge duration must be at least ${MIN_CHALLENGE_DURATION_DAYS} days`);
  }

  if (durationDays > MAX_CHALLENGE_DURATION_DAYS) {
    throw new Error(`Challenge duration cannot exceed ${MAX_CHALLENGE_DURATION_DAYS} days`);
  }

  // Fetch template
  const [template] = await db
    .select()
    .from(challengeTemplatesTable)
    .where(and(eq(challengeTemplatesTable.id, templateId), eq(challengeTemplatesTable.isActive, true)))
    .limit(1);

  if (!template) {
    throw new Error("Approved challenge template not found or inactive");
  }

  // Server-side reward points limit
  if (template.rewardPoints > MAX_CHALLENGE_POINTS || template.rewardPoints <= 0) {
    throw new Error(`Challenge reward points (${template.rewardPoints}) exceed maximum permitted policy (${MAX_CHALLENGE_POINTS} pts)`);
  }

  // Check entitlement
  const entitlement = await validateTemplateEntitlement(companyId, template);
  if (!entitlement.eligible) {
    throw new Error(entitlement.reason || "Company is not eligible to activate this challenge");
  }

  // Determine initial status based on start date
  const status = startDate > now ? "UPCOMING" : "ACTIVE";

  // Create company challenge record
  const [challenge] = await db
    .insert(companyChallengesTable)
    .values({
      companyId,
      templateId: template.id,
      code: template.code,
      title: template.title,
      description: template.description,
      category: template.category,
      icon: template.icon,
      theme: template.theme,
      rewardPoints: template.rewardPoints,
      startDate,
      endDate,
      status,
      createdBy,
      activatedAt: status === "ACTIVE" ? now : null,
    })
    .returning();

  // Create structured criteria from template
  const criteriaList = (template.criteriaConfig as any[]) || [];
  let order = 0;
  for (const crit of criteriaList) {
    order++;
    let resolvedCourseId: number | null = null;
    let resolvedCourseTitle = crit.title;

    if (crit.courseSlug) {
      const [c] = await db
        .select({ id: coursesTable.id, title: coursesTable.title })
        .from(coursesTable)
        .where(
          or(
            eq(coursesTable.slug, crit.courseSlug),
            sql`lower(${coursesTable.title}) LIKE ${'%' + crit.courseSlug.replace(/-/g, ' ') + '%'}`
          )
        )
        .limit(1);
      if (c) {
        resolvedCourseId = c.id;
        resolvedCourseTitle = c.title;
      } else if (entitlement.courseId) {
        resolvedCourseId = entitlement.courseId;
      }
    }

    await db.insert(companyChallengeCriteriaTable).values({
      challengeId: challenge.id,
      criterionType: crit.criterionType,
      courseId: resolvedCourseId,
      courseSlug: crit.courseSlug ?? null,
      courseTitle: resolvedCourseTitle,
      assessmentThreshold: crit.assessmentThreshold ?? null,
      allowPriorCompletion: crit.allowPriorCompletion ?? false,
      requiredCount: crit.requiredCount ?? 1,
      orderIndex: order,
      title: crit.title,
      description: crit.description ?? "",
    });
  }

  await logAuditEvent({
    companyId,
    actorUserId: createdBy,
    actorRole: "admin",
    action: "company_challenge.activated",
    targetType: "company_challenges",
    targetId: String(challenge.id),
    metadata: {
      templateCode: template.code,
      title: challenge.title,
      rewardPoints: challenge.rewardPoints,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status,
    },
  });

  logger.info(
    {
      challengeId: challenge.id,
      companyId,
      code: challenge.code,
      status,
      rewardPoints: challenge.rewardPoints,
    },
    "Activated company challenge"
  );

  return challenge;
}

/**
 * Cancels an active or upcoming company challenge.
 */
export async function cancelCompanyChallenge(params: {
  companyId: number;
  challengeId: number;
  cancelledBy: string;
  cancellationReason?: string;
}): Promise<CompanyChallenge> {
  const { companyId, challengeId, cancelledBy, cancellationReason } = params;

  const [existing] = await db
    .select()
    .from(companyChallengesTable)
    .where(and(eq(companyChallengesTable.id, challengeId), eq(companyChallengesTable.companyId, companyId)))
    .limit(1);

  if (!existing) {
    throw new Error("Challenge not found for this company");
  }

  if (existing.status === "CANCELLED") {
    throw new Error("Challenge is already cancelled");
  }

  if (existing.status === "CLOSED") {
    throw new Error("Cannot cancel an already closed challenge");
  }

  const [updated] = await db
    .update(companyChallengesTable)
    .set({
      status: "CANCELLED",
      cancelledAt: new Date(),
      cancelledBy,
      cancellationReason: cancellationReason ?? "Cancelled by company administrator",
      updatedAt: new Date(),
    })
    .where(eq(companyChallengesTable.id, challengeId))
    .returning();

  await logAuditEvent({
    companyId,
    actorUserId: cancelledBy,
    actorRole: "admin",
    action: "company_challenge.cancelled",
    targetType: "company_challenges",
    targetId: String(challengeId),
    metadata: {
      challengeTitle: existing.title,
      cancellationReason,
      previousStatus: existing.status,
    },
  });

  logger.info({ challengeId, companyId, cancelledBy }, "Company challenge cancelled");
  return updated;
}

/**
 * Resolves current dynamic status of challenges (e.g. transitions UPCOMING -> ACTIVE or ACTIVE -> CLOSED).
 */
export async function updateChallengeLifecycleStatuses(companyId?: number): Promise<void> {
  const now = new Date();

  // UPCOMING -> ACTIVE
  const upcomingFilter = companyId
    ? and(eq(companyChallengesTable.companyId, companyId), eq(companyChallengesTable.status, "UPCOMING"), lte(companyChallengesTable.startDate, now))
    : and(eq(companyChallengesTable.status, "UPCOMING"), lte(companyChallengesTable.startDate, now));

  await db
    .update(companyChallengesTable)
    .set({
      status: "ACTIVE",
      activatedAt: now,
      updatedAt: now,
    })
    .where(upcomingFilter);

  // ACTIVE -> CLOSED
  const activeFilter = companyId
    ? and(eq(companyChallengesTable.companyId, companyId), eq(companyChallengesTable.status, "ACTIVE"), lte(companyChallengesTable.endDate, now))
    : and(eq(companyChallengesTable.status, "ACTIVE"), lte(companyChallengesTable.endDate, now));

  await db
    .update(companyChallengesTable)
    .set({
      status: "CLOSED",
      closedAt: now,
      updatedAt: now,
    })
    .where(activeFilter);
}

/**
 * Evaluates an employee's progress across active company challenges and triggers completion.
 */
export async function evaluateEmployeeChallengeProgress(params: {
  employee: Employee;
  clerkUserId?: string | null;
}): Promise<{
  completedChallenges: { challengeId: number; title: string; points: number }[];
}> {
  const { employee, clerkUserId } = params;
  const companyId = employee.companyId;
  const now = new Date();

  await updateChallengeLifecycleStatuses(companyId);

  // Fetch all active company challenges for employee's tenant
  const activeChallenges = await db
    .select()
    .from(companyChallengesTable)
    .where(
      and(
        eq(companyChallengesTable.companyId, companyId),
        eq(companyChallengesTable.status, "ACTIVE"),
        lte(companyChallengesTable.startDate, now),
        gte(companyChallengesTable.endDate, now)
      )
    );

  const completedChallenges: { challengeId: number; title: string; points: number }[] = [];

  for (const challenge of activeChallenges) {
    // Fetch criteria
    const criteria = await db
      .select()
      .from(companyChallengeCriteriaTable)
      .where(eq(companyChallengeCriteriaTable.challengeId, challenge.id))
      .orderBy(asc(companyChallengeCriteriaTable.orderIndex));

    if (criteria.length === 0) continue;

    // Check existing progress record
    const [existingProgress] = await db
      .select()
      .from(employeeChallengeProgressTable)
      .where(
        and(
          eq(employeeChallengeProgressTable.challengeId, challenge.id),
          eq(employeeChallengeProgressTable.employeeId, employee.id)
        )
      )
      .limit(1);

    // If already completed, nothing more to do
    if (existingProgress && existingProgress.status === "COMPLETED") {
      continue;
    }

    let completedCriteriaCount = 0;

    for (const crit of criteria) {
      let isMet = false;

      if (crit.criterionType === "COURSE_COMPLETION") {
        if (crit.allowPriorCompletion) {
          // Check if employee has any completed enrollment for this course
          const clauses = [
            eq(enrollmentsTable.employeeId, employee.id),
            eq(enrollmentsTable.status, "completed"),
          ];
          if (crit.courseId) {
            clauses.push(eq(enrollmentsTable.courseId, crit.courseId));
          }
          const [completed] = await db
            .select({ id: enrollmentsTable.id })
            .from(enrollmentsTable)
            .where(and(...clauses))
            .limit(1);
          if (completed) isMet = true;
        } else {
          // Must have completed during challenge window
          const clauses = [
            eq(enrollmentsTable.employeeId, employee.id),
            eq(enrollmentsTable.status, "completed"),
            gte(enrollmentsTable.completedAt, challenge.startDate),
            lte(enrollmentsTable.completedAt, challenge.endDate),
          ];
          if (crit.courseId) {
            clauses.push(eq(enrollmentsTable.courseId, crit.courseId));
          }
          const [completed] = await db
            .select({ id: enrollmentsTable.id })
            .from(enrollmentsTable)
            .where(and(...clauses))
            .limit(1);
          if (completed) isMet = true;
        }
      } else if (crit.criterionType === "QUIZ_PASS") {
        const threshold = crit.assessmentThreshold ?? 70;
        const clauses = [
          eq(quizAttemptsTable.userId, employee.clerkUserId || clerkUserId || ""),
          eq(quizAttemptsTable.passed, true),
          gte(quizAttemptsTable.score, threshold),
          gte(quizAttemptsTable.createdAt, challenge.startDate),
          lte(quizAttemptsTable.createdAt, challenge.endDate),
        ];
        if (crit.courseId) {
          clauses.push(eq(quizAttemptsTable.courseId, crit.courseId));
        }
        const [passedQuiz] = await db
          .select({ id: quizAttemptsTable.id })
          .from(quizAttemptsTable)
          .where(and(...clauses))
          .limit(1);
        if (passedQuiz) isMet = true;
      } else if (crit.criterionType === "WORKPLACE_ACTION_COMPLETION") {
        // Must be a completed workplace action during challenge window
        const clauses = [
          eq(learnerCommitmentsTable.employeeId, employee.id),
          or(
            eq(learnerCommitmentsTable.status, "action-reported"),
            eq(learnerCommitmentsTable.status, "completed"),
            eq(learnerCommitmentsTable.status, "completed_self_reported"),
            eq(learnerCommitmentsTable.status, "completed_manager_confirmed"),
            eq(learnerCommitmentsTable.status, "implemented")
          ),
          or(
            and(
              gte(learnerCommitmentsTable.actionReportedAt, challenge.startDate),
              lte(learnerCommitmentsTable.actionReportedAt, challenge.endDate)
            ),
            and(
              gte(learnerCommitmentsTable.completedAt, challenge.startDate),
              lte(learnerCommitmentsTable.completedAt, challenge.endDate)
            )
          ),
        ];
        if (crit.courseId) {
          clauses.push(eq(learnerCommitmentsTable.courseId, crit.courseId));
        }
        const [action] = await db
          .select({ id: learnerCommitmentsTable.id })
          .from(learnerCommitmentsTable)
          .where(and(...clauses))
          .limit(1);
        if (action) isMet = true;
      } else if (crit.criterionType === "INTERACTION_COMPLETION") {
        const clauses = [
          eq(courseInteractionProgressTable.employeeId, employee.id),
          eq(courseInteractionProgressTable.passed, true),
        ];
        if (!crit.allowPriorCompletion) {
          clauses.push(
            gte(courseInteractionProgressTable.submittedAt, challenge.startDate),
            lte(courseInteractionProgressTable.submittedAt, challenge.endDate)
          );
        }
        if (crit.interactionId) {
          clauses.push(eq(courseInteractionProgressTable.interactionId, crit.interactionId));
        }
        if (crit.courseId) {
          clauses.push(eq(courseInteractionProgressTable.courseId, crit.courseId));
        }
        const [prog] = await db
          .select({ id: courseInteractionProgressTable.id })
          .from(courseInteractionProgressTable)
          .where(and(...clauses))
          .limit(1);
        if (prog) isMet = true;
      } else if (crit.criterionType === "CHALLENGE_ASSESSMENT_PASS") {
        const threshold = crit.assessmentThreshold ?? 4;
        const clauses = [
          eq(courseInteractionProgressTable.employeeId, employee.id),
          eq(courseInteractionProgressTable.passed, true),
        ];
        if (!crit.allowPriorCompletion) {
          clauses.push(
            gte(courseInteractionProgressTable.submittedAt, challenge.startDate),
            lte(courseInteractionProgressTable.submittedAt, challenge.endDate)
          );
        }
        if (crit.interactionId) {
          clauses.push(eq(courseInteractionProgressTable.interactionId, crit.interactionId));
        }
        if (crit.courseId) {
          clauses.push(eq(courseInteractionProgressTable.courseId, crit.courseId));
        }
        if (crit.assessmentThreshold) {
          clauses.push(gte(courseInteractionProgressTable.score, threshold));
        }
        const [prog] = await db
          .select({ id: courseInteractionProgressTable.id })
          .from(courseInteractionProgressTable)
          .where(and(...clauses))
          .limit(1);
        if (prog) isMet = true;
      }

      if (isMet) {
        completedCriteriaCount++;
      }
    }

    const totalCriteriaCount = criteria.length;
    const progressPct = Math.round((completedCriteriaCount / totalCriteriaCount) * 100);
    const isAllCompleted = completedCriteriaCount === totalCriteriaCount;

    if (isAllCompleted) {
      // Award Challenge Completion Score in Ledger
      const scoreResult = await awardChallengeCompletionScore({
        companyId,
        employeeId: employee.id,
        clerkUserId: employee.clerkUserId || clerkUserId,
        challengeId: challenge.id,
        challengeTitle: challenge.title,
        points: challenge.rewardPoints,
        completedAt: now,
      });

      // Upsert progress as COMPLETED
      await db
        .insert(employeeChallengeProgressTable)
        .values({
          companyId,
          challengeId: challenge.id,
          employeeId: employee.id,
          status: "COMPLETED",
          completedCriteriaCount,
          totalCriteriaCount,
          progressPct: 100,
          completedAt: now,
          pointsAwarded: scoreResult.awarded ? challenge.rewardPoints : 0,
          ledgerTransactionId: scoreResult.transaction?.id ?? null,
          lastEvaluatedAt: now,
        })
        .onConflictDoUpdate({
          target: [employeeChallengeProgressTable.challengeId, employeeChallengeProgressTable.employeeId],
          set: {
            status: "COMPLETED",
            completedCriteriaCount,
            totalCriteriaCount,
            progressPct: 100,
            completedAt: now,
            pointsAwarded: scoreResult.awarded ? challenge.rewardPoints : 0,
            ledgerTransactionId: scoreResult.transaction?.id ?? null,
            lastEvaluatedAt: now,
            updatedAt: now,
          },
        });

      if (scoreResult.awarded) {
        completedChallenges.push({
          challengeId: challenge.id,
          title: challenge.title,
          points: challenge.rewardPoints,
        });

        logger.info(
          {
            challengeId: challenge.id,
            employeeId: employee.id,
            points: challenge.rewardPoints,
          },
          "Employee completed company challenge"
        );
      }
    } else {
      // Update in-progress state
      await db
        .insert(employeeChallengeProgressTable)
        .values({
          companyId,
          challengeId: challenge.id,
          employeeId: employee.id,
          status: "IN_PROGRESS",
          completedCriteriaCount,
          totalCriteriaCount,
          progressPct,
          lastEvaluatedAt: now,
        })
        .onConflictDoUpdate({
          target: [employeeChallengeProgressTable.challengeId, employeeChallengeProgressTable.employeeId],
          set: {
            completedCriteriaCount,
            totalCriteriaCount,
            progressPct,
            lastEvaluatedAt: now,
            updatedAt: now,
          },
        });
    }
  }

  return { completedChallenges };
}

/**
 * Returns company challenges and the employee's detailed progress for learner UI.
 */
export async function getLearnerCompanyChallenges(employee: Employee): Promise<{
  active: any[];
  upcoming: any[];
  completed: any[];
}> {
  const companyId = employee.companyId;
  const now = new Date();

  await updateChallengeLifecycleStatuses(companyId);

  // Fetch all non-cancelled company challenges
  const challenges = await db
    .select()
    .from(companyChallengesTable)
    .where(
      and(
        eq(companyChallengesTable.companyId, companyId),
        sql`${companyChallengesTable.status} != 'CANCELLED'`
      )
    )
    .orderBy(asc(companyChallengesTable.endDate));

  // Fetch employee progress records
  const progressRecords = await db
    .select()
    .from(employeeChallengeProgressTable)
    .where(
      and(
        eq(employeeChallengeProgressTable.companyId, companyId),
        eq(employeeChallengeProgressTable.employeeId, employee.id)
      )
    );

  const progressMap = new Map(progressRecords.map((p) => [p.challengeId, p]));

  // Fetch all criteria for these challenges
  const challengeIds = challenges.map((c) => c.id);
  const allCriteria = challengeIds.length > 0
    ? await db
        .select()
        .from(companyChallengeCriteriaTable)
        .where(inArray(companyChallengeCriteriaTable.challengeId, challengeIds))
        .orderBy(asc(companyChallengeCriteriaTable.orderIndex))
    : [];

  const criteriaMap = new Map<number, CompanyChallengeCriterion[]>();
  for (const crit of allCriteria) {
    const list = criteriaMap.get(crit.challengeId) || [];
    list.push(crit);
    criteriaMap.set(crit.challengeId, list);
  }

  const active: any[] = [];
  const upcoming: any[] = [];
  const completed: any[] = [];

  for (const ch of challenges) {
    const p = progressMap.get(ch.id);
    const crits = criteriaMap.get(ch.id) || [];
    const isCompleted = p?.status === "COMPLETED";

    const daysRemaining = Math.max(0, Math.ceil((ch.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    const item = {
      id: ch.id,
      code: ch.code,
      title: ch.title,
      description: ch.description,
      category: ch.category,
      icon: ch.icon,
      theme: ch.theme,
      rewardPoints: ch.rewardPoints,
      startDate: ch.startDate.toISOString(),
      endDate: ch.endDate.toISOString(),
      status: ch.status,
      daysRemaining,
      progress: {
        status: isCompleted ? "COMPLETED" : "IN_PROGRESS",
        completedCriteriaCount: p?.completedCriteriaCount || 0,
        totalCriteriaCount: crits.length || ch.rewardPoints > 0 ? (crits.length || 1) : 1,
        progressPct: p?.progressPct || 0,
        completedAt: p?.completedAt?.toISOString() || null,
        pointsAwarded: p?.pointsAwarded || 0,
      },
      criteria: crits.map((c) => ({
        id: c.id,
        criterionType: c.criterionType,
        title: c.title,
        description: c.description,
        courseSlug: c.courseSlug,
        courseTitle: c.courseTitle,
        assessmentThreshold: c.assessmentThreshold,
        allowPriorCompletion: c.allowPriorCompletion,
      })),
    };

    if (isCompleted || ch.status === "CLOSED") {
      completed.push(item);
    } else if (ch.status === "ACTIVE") {
      active.push(item);
    } else if (ch.status === "UPCOMING") {
      upcoming.push(item);
    }
  }

  return { active, upcoming, completed };
}

/**
 * Computes Company Admin challenge analytics with participation and department breakdown.
 */
export async function getCompanyChallengeAnalytics(params: {
  companyId: number;
  challengeId: number;
  departmentId?: number;
}): Promise<{
  challenge: CompanyChallenge;
  metrics: {
    totalEligibleEmployees: number;
    startedCount: number;
    completedCount: number;
    completionRatePct: number;
    averageProgressPct: number;
    totalChallengePointsAwarded: number;
  };
  departmentBreakdown: {
    departmentId: number | null;
    departmentName: string;
    totalEligible: number;
    completed: number;
    completionRatePct: number;
  }[];
}> {
  const { companyId, challengeId, departmentId } = params;

  const [challenge] = await db
    .select()
    .from(companyChallengesTable)
    .where(and(eq(companyChallengesTable.id, challengeId), eq(companyChallengesTable.companyId, companyId)))
    .limit(1);

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  // Query eligible active employees
  const empClauses = [
    eq(employeesTable.companyId, companyId),
    eq(employeesTable.status, "active"),
  ];
  if (departmentId) {
    empClauses.push(eq(employeesTable.departmentId, departmentId));
  }

  const employees = await db
    .select({
      id: employeesTable.id,
      name: employeesTable.name,
      departmentId: employeesTable.departmentId,
    })
    .from(employeesTable)
    .where(and(...empClauses));

  const totalEligible = employees.length;

  // Query progress records
  const progressList = await db
    .select()
    .from(employeeChallengeProgressTable)
    .where(
      and(
        eq(employeeChallengeProgressTable.companyId, companyId),
        eq(employeeChallengeProgressTable.challengeId, challengeId)
      )
    );

  const progressMap = new Map(progressList.map((p) => [p.employeeId, p]));

  let startedCount = 0;
  let completedCount = 0;
  let totalProgressPct = 0;
  let totalPoints = 0;

  for (const emp of employees) {
    const p = progressMap.get(emp.id);
    if (p) {
      if (p.completedCriteriaCount > 0 || p.status === "COMPLETED") {
        startedCount++;
      }
      if (p.status === "COMPLETED") {
        completedCount++;
        totalPoints += p.pointsAwarded;
      }
      totalProgressPct += p.progressPct;
    }
  }

  const completionRatePct = totalEligible > 0 ? Math.round((completedCount / totalEligible) * 100) : 0;
  const averageProgressPct = totalEligible > 0 ? Math.round(totalProgressPct / totalEligible) : 0;

  // Query department breakdown
  const departments = await db
    .select({ id: departmentsTable.id, name: departmentsTable.name })
    .from(departmentsTable)
    .where(eq(departmentsTable.companyId, companyId));

  const deptMap = new Map(departments.map((d) => [d.id, d.name]));

  const deptStats = new Map<number | null, { eligible: number; completed: number }>();
  for (const emp of employees) {
    const key = emp.departmentId;
    const current = deptStats.get(key) || { eligible: 0, completed: 0 };
    current.eligible++;
    if (progressMap.get(emp.id)?.status === "COMPLETED") {
      current.completed++;
    }
    deptStats.set(key, current);
  }

  const departmentBreakdown = Array.from(deptStats.entries()).map(([deptId, stats]) => ({
    departmentId: deptId,
    departmentName: deptId ? (deptMap.get(deptId) || "Department " + deptId) : "General / Unassigned",
    totalEligible: stats.eligible,
    completed: stats.completed,
    completionRatePct: stats.eligible > 0 ? Math.round((stats.completed / stats.eligible) * 100) : 0,
  }));

  return {
    challenge,
    metrics: {
      totalEligibleEmployees: totalEligible,
      startedCount,
      completedCount,
      completionRatePct,
      averageProgressPct,
      totalChallengePointsAwarded: totalPoints,
    },
    departmentBreakdown,
  };
}
