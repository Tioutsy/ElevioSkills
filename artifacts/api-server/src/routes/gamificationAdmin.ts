import { Router } from "express";
import { requirePlatformAdmin, requireCompanyAdmin, getCompanyAccess, sendHttpError, HttpError } from "../lib/access.js";
import {
  getPlatformGamificationHealth,
  getCompanyGamificationAnalytics,
  runGamificationDiagnostics,
  recalculateEmployeeScore,
  reviewGamificationAnomaly,
  listGamificationAnomalies,
  generatePlatformGamificationAuditCsv,
  generateCompanyEngagementCsv,
} from "../lib/gamificationAnalyticsService.js";

const router = Router();

// ==========================================
// PLATFORM ADMIN: HEALTH & ANOMALY WORKFLOW
// ==========================================

// GET /api/platform-admin/gamification/health
router.get("/platform-admin/gamification/health", async (req, res): Promise<void> => {
  try {
    await requirePlatformAdmin(req);

    const startDate = req.query.startDate ? new Date(String(req.query.startDate)) : undefined;
    const endDate = req.query.endDate ? new Date(String(req.query.endDate)) : undefined;

    const health = await getPlatformGamificationHealth(startDate, endDate);
    res.json(health);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch platform gamification health");
      res.status(500).json({ error: err.message || "Failed to fetch gamification health" });
    }
  }
});

// GET /api/platform-admin/gamification/anomalies
router.get("/platform-admin/gamification/anomalies", async (req, res): Promise<void> => {
  try {
    await requirePlatformAdmin(req);

    const companyId = req.query.companyId ? Number(req.query.companyId) : undefined;
    const status = req.query.status ? String(req.query.status) : undefined;
    const anomalyType = req.query.anomalyType ? String(req.query.anomalyType) : undefined;
    const severity = req.query.severity ? String(req.query.severity) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;

    const result = await listGamificationAnomalies({
      companyId,
      status,
      anomalyType,
      severity,
      limit,
      offset,
    });

    res.json(result);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to list gamification anomalies");
      res.status(500).json({ error: err.message || "Failed to list anomalies" });
    }
  }
});

// POST /api/platform-admin/gamification/anomalies/diagnose — Trigger on-demand diagnostics
router.post("/platform-admin/gamification/anomalies/diagnose", async (req, res): Promise<void> => {
  try {
    await requirePlatformAdmin(req);
    const companyId = req.body?.companyId ? Number(req.body.companyId) : undefined;

    const result = await runGamificationDiagnostics(companyId);
    res.json(result);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to run gamification diagnostics");
      res.status(500).json({ error: err.message || "Failed to run diagnostics" });
    }
  }
});

// POST /api/platform-admin/gamification/anomalies/:id/review — Review, dismiss, or resolve anomaly
router.post("/platform-admin/gamification/anomalies/:id/review", async (req, res): Promise<void> => {
  try {
    const access = await requirePlatformAdmin(req);
    const anomalyId = Number(req.params.id);
    const { status, resolutionNote } = req.body;

    if (isNaN(anomalyId)) {
      res.status(400).json({ error: "Invalid anomaly ID" });
      return;
    }

    const validStatuses = ["REVIEWED", "DISMISSED", "RESOLVED"];
    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ error: `Invalid status. Expected one of: ${validStatuses.join(", ")}` });
      return;
    }

    const updated = await reviewGamificationAnomaly({
      anomalyId,
      status,
      resolutionNote,
      actorUserId: access.userId,
      actorRole: "platform_admin",
    });

    res.json({ success: true, anomaly: updated });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to review gamification anomaly");
      res.status(500).json({ error: err.message || "Failed to review anomaly" });
    }
  }
});

// POST /api/platform-admin/scores/recalculate/:employeeId — Controlled score recalculation
router.post("/platform-admin/scores/recalculate/:employeeId", async (req, res): Promise<void> => {
  try {
    const access = await requirePlatformAdmin(req);
    const employeeId = Number(req.params.employeeId);
    const { reason } = req.body;

    if (isNaN(employeeId)) {
      res.status(400).json({ error: "Invalid employee ID" });
      return;
    }

    if (!reason || typeof reason !== "string" || reason.trim().length < 5) {
      res.status(400).json({ error: "A valid reason (min 5 characters) is required for recalculation" });
      return;
    }

    const result = await recalculateEmployeeScore({
      employeeId,
      reason: reason.trim(),
      actorUserId: access.userId,
      actorRole: "platform_admin",
    });

    res.json({ success: true, ...result });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to recalculate employee score");
      res.status(500).json({ error: err.message || "Failed to recalculate employee score" });
    }
  }
});

// GET /api/platform-admin/gamification/export — CSV Audit Export
router.get("/platform-admin/gamification/export", async (req, res): Promise<void> => {
  try {
    await requirePlatformAdmin(req);
    const companyIdFilter = req.query.companyId ? Number(req.query.companyId) : undefined;

    const csvContent = await generatePlatformGamificationAuditCsv(companyIdFilter);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="gamification_audit_${new Date().toISOString().split("T")[0]}.csv"`
    );
    res.send(csvContent);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to export gamification audit CSV");
      res.status(500).json({ error: err.message || "Failed to export audit CSV" });
    }
  }
});

// ==========================================
// COMPANY ADMIN: ENGAGEMENT & COMPETITION
// ==========================================

const handleCompanyAnalytics = async (req: any, res: any): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const seasonId = req.query.seasonId ? Number(req.query.seasonId) : undefined;

    const analytics = await getCompanyGamificationAnalytics(access.companyId, seasonId);
    res.json(analytics);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch company gamification analytics");
      res.status(500).json({ error: err.message || "Failed to fetch gamification analytics" });
    }
  }
};

router.get("/company/gamification/analytics", handleCompanyAnalytics);

const handleCompanyExport = async (req: any, res: any): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const seasonId = req.query.seasonId ? Number(req.query.seasonId) : undefined;

    const csvContent = await generateCompanyEngagementCsv(access.companyId, seasonId);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="company_engagement_${new Date().toISOString().split("T")[0]}.csv"`
    );
    res.send(csvContent);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to export company engagement CSV");
      res.status(500).json({ error: err.message || "Failed to export engagement CSV" });
    }
  }
};

router.get("/company/gamification/export", handleCompanyExport);

export default router;
