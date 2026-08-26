import { Router } from "express";
import { db, companiesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  getCompanyAccess,
  requireCompanyAdmin,
  sendHttpError,
  HttpError,
} from "../lib/access.js";
import {
  calculateCompanyLeaderboard,
  getCompanyAdminLeaderboard,
  updateCompanyCompetitionSettings,
  getCompanySeasonHistory,
  PrivacyMode,
} from "../lib/leaderboardService.js";

const router = Router();

// ==========================================
// LEARNER LEADERBOARD ENDPOINTS
// ==========================================

// GET /api/leaderboards or /api/leaderboards/current
router.get(["/", "/current"], async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);
    const requestingEmployeeId = access.employee?.id;

    const leaderboard = await calculateCompanyLeaderboard(
      access.companyId,
      requestingEmployeeId
    );

    res.json(leaderboard);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch company leaderboard");
      res.status(500).json({ error: err.message || "Failed to fetch leaderboard" });
    }
  }
});

// GET /api/leaderboards/history — Previous closed seasons
router.get("/history", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);
    const requestingEmployeeId = access.employee?.id;

    const history = await getCompanySeasonHistory(
      access.companyId,
      requestingEmployeeId
    );

    res.json({ history });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch season history");
      res.status(500).json({ error: err.message || "Failed to fetch season history" });
    }
  }
});

// ==========================================
// COMPANY ADMIN LEADERBOARD & SETTINGS
// ==========================================

// GET /api/company/leaderboard — Company Admin full standings
router.get("/company/leaderboard", async (req, res): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const leaderboard = await getCompanyAdminLeaderboard(access.companyId);
    res.json(leaderboard);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch company admin leaderboard");
      res.status(500).json({ error: err.message || "Failed to fetch company admin leaderboard" });
    }
  }
});

// GET /api/company/settings/competition — Fetch competition settings
router.get("/company/settings/competition", async (req, res): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const [company] = await db
      .select({
        id: companiesTable.id,
        leaderboardEnabled: companiesTable.leaderboardEnabled,
        leaderboardPrivacyMode: companiesTable.leaderboardPrivacyMode,
      })
      .from(companiesTable)
      .where(eq(companiesTable.id, access.companyId))
      .limit(1);

    if (!company) {
      res.status(404).json({ error: "Company not found" });
      return;
    }

    res.json({
      enabled: company.leaderboardEnabled,
      privacyMode: company.leaderboardPrivacyMode,
    });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch company competition settings");
      res.status(500).json({ error: err.message || "Failed to fetch competition settings" });
    }
  }
});

// PUT /api/company/settings/competition — Update individual competition settings
router.put("/company/settings/competition", async (req, res): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const { enabled, privacyMode } = req.body;

    if (typeof enabled !== "boolean") {
      res.status(400).json({ error: "Field 'enabled' (boolean) is required" });
      return;
    }

    const validModes = ["full_name", "initial", "anonymous"];
    if (privacyMode && !validModes.includes(privacyMode)) {
      res.status(400).json({
        error: `Invalid privacyMode. Expected one of: ${validModes.join(", ")}`,
      });
      return;
    }

    const updated = await updateCompanyCompetitionSettings({
      companyId: access.companyId,
      enabled,
      privacyMode: privacyMode as PrivacyMode,
      actorUserId: access.userId,
      actorRole: access.role,
    });

    res.json({ success: true, ...updated });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to update company competition settings");
      res.status(500).json({ error: err.message || "Failed to update competition settings" });
    }
  }
});

// ==========================================
// DEPARTMENT COMPETITION ENDPOINTS — LEARNER
// ==========================================

// GET /api/leaderboards/department/current
router.get("/department/current", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);
    const employeeId = access.employee?.id;

    const { getLearnerDepartmentRanking } = await import("../lib/departmentCompetitionService.js");
    const ranking = await getLearnerDepartmentRanking(access.companyId, employeeId);

    res.json(ranking);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch department ranking");
      res.status(500).json({ error: err.message || "Failed to fetch department ranking" });
    }
  }
});

// GET /api/leaderboards/department/history
router.get("/department/history", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);

    const { getDepartmentSeasonHistory } = await import("../lib/departmentCompetitionService.js");
    const history = await getDepartmentSeasonHistory(access.companyId);

    res.json({ history });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch department season history");
      res.status(500).json({ error: err.message || "Failed to fetch department season history" });
    }
  }
});

// ==========================================
// DEPARTMENT COMPETITION ENDPOINTS — ADMIN
// ==========================================

// GET /api/company/department-competition/settings
router.get("/company/department-competition/settings", async (req, res): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);

    const [company] = await db
      .select({
        id: companiesTable.id,
        departmentCompetitionEnabled: companiesTable.departmentCompetitionEnabled,
        departmentCompetitionActivatedAt: companiesTable.departmentCompetitionActivatedAt,
      })
      .from(companiesTable)
      .where(eq(companiesTable.id, access.companyId))
      .limit(1);

    if (!company) {
      res.status(404).json({ error: "Company not found" });
      return;
    }

    res.json({
      enabled: company.departmentCompetitionEnabled,
      activatedAt: company.departmentCompetitionActivatedAt?.toISOString() || null,
    });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch department competition settings");
      res.status(500).json({ error: err.message || "Failed to fetch department competition settings" });
    }
  }
});

// POST /api/company/department-competition/settings
router.post("/company/department-competition/settings", async (req, res): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const { enabled } = req.body;

    if (typeof enabled !== "boolean") {
      res.status(400).json({ error: "Field 'enabled' (boolean) is required" });
      return;
    }

    const { updateDepartmentCompetitionSettings } = await import("../lib/departmentCompetitionService.js");
    const updated = await updateDepartmentCompetitionSettings({
      companyId: access.companyId,
      enabled,
      actorClerkUserId: access.userId,
    });

    res.json({ success: true, ...updated });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to update department competition settings");
      const statusCode = err.message?.includes("requires at least") ? 422 : 500;
      res.status(statusCode).json({ error: err.message || "Failed to update department competition settings" });
    }
  }
});

// GET /api/company/department-competition/performance
router.get("/company/department-competition/performance", async (req, res): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const seasonId = req.query.seasonId ? Number(req.query.seasonId) : undefined;

    const { getCompanyDepartmentPerformance } = await import("../lib/departmentCompetitionService.js");
    const performance = await getCompanyDepartmentPerformance(access.companyId, seasonId);

    res.json(performance);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch department performance analytics");
      res.status(500).json({ error: err.message || "Failed to fetch department performance analytics" });
    }
  }
});

export default router;

