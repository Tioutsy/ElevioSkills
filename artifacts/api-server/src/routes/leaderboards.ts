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

// PUT /api/company/settings/competition — Update competition settings
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

export default router;
