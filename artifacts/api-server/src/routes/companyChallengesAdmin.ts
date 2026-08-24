import { Router } from "express";
import { requireCompanyAdmin, sendHttpError, HttpError } from "../lib/access.js";
import {
  challengeTemplatesTable,
  companyChallengesTable,
  companyChallengeCriteriaTable,
  employeeChallengeProgressTable,
  employeesTable,
  departmentsTable,
  db,
} from "@workspace/db";
import { and, eq, desc, asc, inArray } from "drizzle-orm";
import {
  activateCompanyChallenge,
  cancelCompanyChallenge,
  getCompanyChallengeAnalytics,
  validateTemplateEntitlement,
  updateChallengeLifecycleStatuses,
} from "../lib/challengeService.js";

const router = Router();

/**
 * GET /api/company/challenges/templates
 * Returns all active approved challenge templates with entitlement eligibility.
 */
router.get("/templates", async (req, res) => {
  try {
    const access = await requireCompanyAdmin(req);

    const templates = await db
      .select()
      .from(challengeTemplatesTable)
      .where(eq(challengeTemplatesTable.isActive, true))
      .orderBy(asc(challengeTemplatesTable.orderIndex));

    const result = [];
    for (const t of templates) {
      const entitlement = await validateTemplateEntitlement(access.companyId, t);
      result.push({
        id: t.id,
        code: t.code,
        title: t.title,
        summary: t.summary,
        description: t.description,
        category: t.category,
        icon: t.icon,
        theme: t.theme,
        rewardPoints: t.rewardPoints,
        defaultDurationDays: t.defaultDurationDays,
        requiredCourseSlug: t.requiredCourseSlug,
        criteriaConfig: t.criteriaConfig,
        orderIndex: t.orderIndex,
        isEligible: entitlement.eligible,
        ineligibilityReason: entitlement.reason || null,
      });
    }

    res.json(result);
  } catch (err) {
    sendHttpError(res, err);
  }
});

/**
 * GET /api/company/challenges
 * Returns all company challenges (active, upcoming, closed, cancelled) for the admin's tenant.
 */
router.get("/", async (req, res) => {
  try {
    const access = await requireCompanyAdmin(req);
    await updateChallengeLifecycleStatuses(access.companyId);

    const challenges = await db
      .select()
      .from(companyChallengesTable)
      .where(eq(companyChallengesTable.companyId, access.companyId))
      .orderBy(desc(companyChallengesTable.createdAt));

    const challengeIds = challenges.map((c) => c.id);
    const allCriteria = challengeIds.length > 0
      ? await db
          .select()
          .from(companyChallengeCriteriaTable)
          .where(inArray(companyChallengeCriteriaTable.challengeId, challengeIds))
          .orderBy(asc(companyChallengeCriteriaTable.orderIndex))
      : [];

    const criteriaMap = new Map<number, any[]>();
    for (const crit of allCriteria) {
      const list = criteriaMap.get(crit.challengeId) || [];
      list.push(crit);
      criteriaMap.set(crit.challengeId, list);
    }

    const result = challenges.map((c) => ({
      id: c.id,
      code: c.code,
      title: c.title,
      description: c.description,
      category: c.category,
      icon: c.icon,
      theme: c.theme,
      rewardPoints: c.rewardPoints,
      startDate: c.startDate.toISOString(),
      endDate: c.endDate.toISOString(),
      status: c.status,
      createdBy: c.createdBy,
      createdAt: c.createdAt.toISOString(),
      cancelledAt: c.cancelledAt?.toISOString() || null,
      cancellationReason: c.cancellationReason || null,
      criteria: criteriaMap.get(c.id) || [],
    }));

    res.json(result);
  } catch (err) {
    sendHttpError(res, err);
  }
});

/**
 * POST /api/company/challenges/activate
 * Activates an approved challenge template for the company.
 */
router.post("/activate", async (req, res) => {
  try {
    const access = await requireCompanyAdmin(req);
    const { templateId, startDate, endDate } = req.body;

    const parsedTemplateId = parseInt(templateId, 10);
    if (isNaN(parsedTemplateId)) {
      throw new HttpError(400, "Valid templateId is required");
    }

    if (!startDate || !endDate) {
      throw new HttpError(400, "startDate and endDate are required");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new HttpError(400, "Invalid start or end date format");
    }

    const challenge = await activateCompanyChallenge({
      companyId: access.companyId,
      templateId: parsedTemplateId,
      startDate: start,
      endDate: end,
      createdBy: access.userId,
    });

    res.status(201).json(challenge);
  } catch (err: any) {
    sendHttpError(res, err);
  }
});

/**
 * POST /api/company/challenges/:id/cancel
 * Cancels an active or upcoming challenge.
 */
router.post("/:id/cancel", async (req, res) => {
  try {
    const access = await requireCompanyAdmin(req);
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const challengeId = parseInt(rawId, 10);
    if (isNaN(challengeId)) {
      throw new HttpError(400, "Invalid challenge ID");
    }

    const { reason } = req.body || {};

    const updated = await cancelCompanyChallenge({
      companyId: access.companyId,
      challengeId,
      cancelledBy: access.userId,
      cancellationReason: reason,
    });

    res.json(updated);
  } catch (err) {
    sendHttpError(res, err);
  }
});

/**
 * GET /api/company/challenges/:id/analytics
 * Returns challenge participation analytics and department breakdown.
 */
router.get("/:id/analytics", async (req, res) => {
  try {
    const access = await requireCompanyAdmin(req);
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const challengeId = parseInt(rawId, 10);
    if (isNaN(challengeId)) {
      throw new HttpError(400, "Invalid challenge ID");
    }

    const rawDeptId = req.query.departmentId ? String(req.query.departmentId) : undefined;
    const departmentId = rawDeptId ? parseInt(rawDeptId, 10) : undefined;

    const data = await getCompanyChallengeAnalytics({
      companyId: access.companyId,
      challengeId,
      departmentId,
    });

    res.json(data);
  } catch (err) {
    sendHttpError(res, err);
  }
});

/**
 * GET /api/company/challenges/:id/progress
 * Returns list of employee progress records for this challenge.
 */
router.get("/:id/progress", async (req, res) => {
  try {
    const access = await requireCompanyAdmin(req);
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const challengeId = parseInt(rawId, 10);
    if (isNaN(challengeId)) {
      throw new HttpError(400, "Invalid challenge ID");
    }

    const [challenge] = await db
      .select()
      .from(companyChallengesTable)
      .where(and(eq(companyChallengesTable.id, challengeId), eq(companyChallengesTable.companyId, access.companyId)))
      .limit(1);

    if (!challenge) {
      throw new HttpError(404, "Challenge not found");
    }

    const employees = await db
      .select({
        id: employeesTable.id,
        name: employeesTable.name,
        email: employeesTable.email,
        departmentId: employeesTable.departmentId,
      })
      .from(employeesTable)
      .where(and(eq(employeesTable.companyId, access.companyId), eq(employeesTable.status, "active")));

    const departments = await db
      .select()
      .from(departmentsTable)
      .where(eq(departmentsTable.companyId, access.companyId));
    const deptMap = new Map(departments.map((d) => [d.id, d.name]));

    const progressList = await db
      .select()
      .from(employeeChallengeProgressTable)
      .where(
        and(
          eq(employeeChallengeProgressTable.companyId, access.companyId),
          eq(employeeChallengeProgressTable.challengeId, challengeId)
        )
      );

    const progressMap = new Map(progressList.map((p) => [p.employeeId, p]));

    const result = employees.map((emp) => {
      const p = progressMap.get(emp.id);
      return {
        employeeId: emp.id,
        employeeName: emp.name,
        employeeEmail: emp.email,
        departmentName: emp.departmentId ? (deptMap.get(emp.departmentId) || "Department " + emp.departmentId) : "General / Unassigned",
        status: p?.status || "NOT_STARTED",
        completedCriteriaCount: p?.completedCriteriaCount || 0,
        progressPct: p?.progressPct || 0,
        completedAt: p?.completedAt?.toISOString() || null,
        pointsAwarded: p?.pointsAwarded || 0,
      };
    });

    res.json(result);
  } catch (err) {
    sendHttpError(res, err);
  }
});

export default router;
