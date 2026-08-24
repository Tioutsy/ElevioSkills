import { Router } from "express";
import { getCompanyAccess, sendHttpError, HttpError } from "../lib/access.js";
import {
  getLearnerCompanyChallenges,
  evaluateEmployeeChallengeProgress,
  updateChallengeLifecycleStatuses,
} from "../lib/challengeService.js";
import { db, companyChallengesTable, companyChallengeCriteriaTable, employeeChallengeProgressTable } from "@workspace/db";
import { and, eq, asc } from "drizzle-orm";

const router = Router();

/**
 * GET /api/company-challenges
 * Returns active, upcoming, and completed company challenges for the authenticated learner.
 */
router.get("/", async (req, res) => {
  try {
    const access = await getCompanyAccess(req);
    if (!access || !access.employee) {
      throw new HttpError(401, "Authentication required as an active employee");
    }

    // Trigger evaluation to ensure any newly satisfied criteria are recognized
    await evaluateEmployeeChallengeProgress({
      employee: access.employee,
      clerkUserId: access.userId,
    });

    const data = await getLearnerCompanyChallenges(access.employee);
    res.json(data);
  } catch (err) {
    sendHttpError(res, err);
  }
});

/**
 * GET /api/company-challenges/:id
 * Returns single challenge detail with tenant boundary enforcement.
 */
router.get("/:id", async (req, res) => {
  try {
    const access = await getCompanyAccess(req);
    if (!access || !access.employee) {
      throw new HttpError(401, "Authentication required");
    }

    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const challengeId = parseInt(rawId, 10);
    if (isNaN(challengeId)) {
      throw new HttpError(400, "Invalid challenge ID");
    }

    await updateChallengeLifecycleStatuses(access.companyId);

    const [challenge] = await db
      .select()
      .from(companyChallengesTable)
      .where(
        and(
          eq(companyChallengesTable.id, challengeId),
          eq(companyChallengesTable.companyId, access.companyId)
        )
      )
      .limit(1);

    if (!challenge) {
      throw new HttpError(404, "Challenge not found for your company");
    }

    // Criteria
    const criteria = await db
      .select()
      .from(companyChallengeCriteriaTable)
      .where(eq(companyChallengeCriteriaTable.challengeId, challengeId))
      .orderBy(asc(companyChallengeCriteriaTable.orderIndex));

    // Progress
    const [progress] = await db
      .select()
      .from(employeeChallengeProgressTable)
      .where(
        and(
          eq(employeeChallengeProgressTable.challengeId, challengeId),
          eq(employeeChallengeProgressTable.employeeId, access.employee.id)
        )
      )
      .limit(1);

    const now = new Date();
    const daysRemaining = Math.max(0, Math.ceil((challenge.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    res.json({
      challenge: {
        id: challenge.id,
        code: challenge.code,
        title: challenge.title,
        description: challenge.description,
        category: challenge.category,
        icon: challenge.icon,
        theme: challenge.theme,
        rewardPoints: challenge.rewardPoints,
        startDate: challenge.startDate.toISOString(),
        endDate: challenge.endDate.toISOString(),
        status: challenge.status,
        daysRemaining,
      },
      criteria: criteria.map((c) => ({
        id: c.id,
        criterionType: c.criterionType,
        title: c.title,
        description: c.description,
        courseSlug: c.courseSlug,
        courseTitle: c.courseTitle,
        assessmentThreshold: c.assessmentThreshold,
        allowPriorCompletion: c.allowPriorCompletion,
      })),
      progress: {
        status: progress?.status || "IN_PROGRESS",
        completedCriteriaCount: progress?.completedCriteriaCount || 0,
        totalCriteriaCount: criteria.length || 1,
        progressPct: progress?.progressPct || 0,
        completedAt: progress?.completedAt?.toISOString() || null,
        pointsAwarded: progress?.pointsAwarded || 0,
      },
    });
  } catch (err) {
    sendHttpError(res, err);
  }
});

export default router;
