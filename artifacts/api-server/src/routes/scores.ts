import { Router } from "express";
import { db, elevioScoreLedgerTable, employeesTable, companiesTable, coursesTable } from "@workspace/db";
import { eq, and, desc, sql } from "drizzle-orm";
import { getCompanyAccess, requireCompanyAdmin, requirePlatformAdmin, sendHttpError, HttpError } from "../lib/access.js";
import { getEmployeeScoreSummary, reverseScoreTransaction, getScoreCategory } from "../lib/scoringService.js";

const router = Router();

// ==========================================
// LEARNER SCORE ENDPOINT
// ==========================================

// GET /api/me/score — Authenticated learner's ELEVIO Score and category breakdown
router.get("/me/score", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);
    if (!access.employee) {
      res.json({
        totalScore: 0,
        breakdown: {
          learning: 0,
          knowledge: 0,
          workplaceActions: 0,
          other: 0,
        },
        transactionsCount: 0,
        recentTransactions: [],
      });
      return;
    }

    const summary = await getEmployeeScoreSummary(access.employee.id, access.companyId);
    res.json(summary);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch learner score summary");
      res.status(500).json({ error: err.message || "Failed to fetch score summary" });
    }
  }
});

// ==========================================
// COMPANY ADMIN SCORE ENDPOINT
// ==========================================

// GET /api/company/employees/:employeeId/score — Company Admin view of employee's score
router.get("/company/employees/:employeeId/score", async (req, res): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const employeeId = Number(req.params.employeeId);
    if (isNaN(employeeId)) {
      res.status(400).json({ error: "Invalid employee ID" });
      return;
    }

    const [employee] = await db
      .select({
        id: employeesTable.id,
        name: employeesTable.name,
        email: employeesTable.email,
        companyId: employeesTable.companyId,
        elevioScore: employeesTable.elevioScore,
      })
      .from(employeesTable)
      .where(and(eq(employeesTable.id, employeeId), eq(employeesTable.companyId, access.companyId)))
      .limit(1);

    if (!employee) {
      res.status(404).json({ error: "Employee not found in your organisation" });
      return;
    }

    const summary = await getEmployeeScoreSummary(employee.id, access.companyId);
    res.json({
      employeeId: employee.id,
      name: employee.name,
      email: employee.email,
      ...summary,
    });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch employee score details");
      res.status(500).json({ error: err.message || "Failed to fetch employee score details" });
    }
  }
});

// ==========================================
// PLATFORM ADMIN SCORE AUDIT & REVERSAL
// ==========================================

// GET /api/platform-admin/scores/audit — Platform Admin audit trail
router.get("/platform-admin/scores/audit", async (req, res): Promise<void> => {
  try {
    await requirePlatformAdmin(req);

    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
    const offset = Math.max(0, Number(req.query.offset) || 0);
    const companyIdFilter = req.query.companyId ? Number(req.query.companyId) : undefined;
    const employeeIdFilter = req.query.employeeId ? Number(req.query.employeeId) : undefined;

    const conditions = [];
    if (companyIdFilter) conditions.push(eq(elevioScoreLedgerTable.companyId, companyIdFilter));
    if (employeeIdFilter) conditions.push(eq(elevioScoreLedgerTable.employeeId, employeeIdFilter));

    const transactions = await db
      .select({
        id: elevioScoreLedgerTable.id,
        companyId: elevioScoreLedgerTable.companyId,
        employeeId: elevioScoreLedgerTable.employeeId,
        eventType: elevioScoreLedgerTable.eventType,
        points: elevioScoreLedgerTable.points,
        sourceEntityType: elevioScoreLedgerTable.sourceEntityType,
        sourceEntityId: elevioScoreLedgerTable.sourceEntityId,
        courseId: elevioScoreLedgerTable.courseId,
        scoringRuleVersion: elevioScoreLedgerTable.scoringRuleVersion,
        idempotencyKey: elevioScoreLedgerTable.idempotencyKey,
        isReversed: elevioScoreLedgerTable.isReversed,
        reversedAt: elevioScoreLedgerTable.reversedAt,
        reversalReason: elevioScoreLedgerTable.reversalReason,
        metadata: elevioScoreLedgerTable.metadata,
        eventTimestamp: elevioScoreLedgerTable.eventTimestamp,
        createdAt: elevioScoreLedgerTable.createdAt,
        employeeName: employeesTable.name,
        companyName: companiesTable.name,
      })
      .from(elevioScoreLedgerTable)
      .leftJoin(employeesTable, eq(elevioScoreLedgerTable.employeeId, employeesTable.id))
      .leftJoin(companiesTable, eq(elevioScoreLedgerTable.companyId, companiesTable.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(elevioScoreLedgerTable.createdAt))
      .limit(limit)
      .offset(offset);

    const countResult: any = await db.execute(sql`
      SELECT count(*)::integer AS total FROM "elevio_score_ledger";
    `);
    const total = Number((countResult.rows || countResult)[0]?.total || 0);

    res.json({
      total,
      limit,
      offset,
      transactions,
    });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch platform admin score audit ledger");
      res.status(500).json({ error: err.message || "Failed to fetch score audit ledger" });
    }
  }
});

// POST /api/platform-admin/scores/reverse — Reverse a score transaction
router.post("/platform-admin/scores/reverse", async (req, res): Promise<void> => {
  try {
    const access = await requirePlatformAdmin(req);
    const { transactionId, reason } = req.body;

    if (!transactionId || typeof transactionId !== "number") {
      res.status(400).json({ error: "Valid numeric transactionId is required" });
      return;
    }

    if (!reason || typeof reason !== "string" || reason.trim().length < 5) {
      res.status(400).json({ error: "A valid reversal reason (min 5 characters) is required" });
      return;
    }

    const reversed = await reverseScoreTransaction({
      transactionId,
      reason: reason.trim(),
      actorUserId: access.userId,
      actorRole: "platform_admin",
    });

    res.json({ success: true, transaction: reversed });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to reverse score transaction");
      res.status(400).json({ error: err.message || "Failed to reverse score transaction" });
    }
  }
});

export default router;
