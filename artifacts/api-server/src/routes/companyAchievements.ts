import { Router } from "express";
import { getCompanyAccess, requireCompanyAdmin, sendHttpError, HttpError } from "../lib/access.js";
import {
  getCompanyRecognitionAnalytics,
  getEmployeeAchievementProgress,
} from "../lib/achievementsService.js";
import { db, employeesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

// GET /api/company/achievements/summary — Company Admin organization recognition analytics
router.get("/summary", async (req, res): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const analytics = await getCompanyRecognitionAnalytics(access.companyId);
    res.json(analytics);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch company recognition summary");
      res.status(500).json({ error: err.message || "Failed to fetch recognition summary" });
    }
  }
});

// GET /api/company/employees/:id/achievements — Company Admin employee recognition view (tenant-isolated)
router.get("/employees/:id/achievements", async (req, res): Promise<void> => {
  try {
    const access = await requireCompanyAdmin(req);
    const employeeId = parseInt(req.params.id, 10);
    if (isNaN(employeeId)) {
      res.status(400).json({ error: "Invalid employee ID" });
      return;
    }

    // Verify employee belongs to same company
    const [targetEmployee] = await db
      .select()
      .from(employeesTable)
      .where(
        and(
          eq(employeesTable.id, employeeId),
          eq(employeesTable.companyId, access.companyId)
        )
      )
      .limit(1);

    if (!targetEmployee) {
      throw new HttpError(404, "Employee not found in your organization");
    }

    const progress = await getEmployeeAchievementProgress(targetEmployee);
    res.json({
      employee: {
        id: targetEmployee.id,
        name: targetEmployee.name,
        email: targetEmployee.email,
        department: targetEmployee.department,
        jobTitle: targetEmployee.jobTitle,
      },
      ...progress,
    });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to fetch employee achievements for company admin");
      res.status(500).json({ error: err.message || "Failed to fetch employee achievements" });
    }
  }
});

export default router;
