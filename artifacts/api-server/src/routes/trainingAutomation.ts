import { Router } from "express";
import { getCompanyAccess, sendHttpError } from "../lib/access";
import {
  getCompanyAutomationPolicy,
  updateCompanyAutomationPolicy,
  pauseCompanyAutomation,
  resumeCompanyAutomation,
  generatePolicyPreviewText,
} from "../lib/trainingAutomationPolicyService";
import {
  runAutomationCycleForCompany,
  getAutomationEffectivenessMetrics,
} from "../lib/trainingAutomationService";

const router = Router();

// GET /api/company/training-automation/policy
router.get("/policy", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);
    const policy = await getCompanyAutomationPolicy(access);
    const preview = generatePolicyPreviewText(policy);
    res.json({ policy, preview });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      res.status(500).json({ error: err.message || "Failed to retrieve training automation policy" });
    }
  }
});

// PUT /api/company/training-automation/policy
router.put("/policy", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);

    if (access.role !== "company_admin" && access.role !== "platform_admin") {
      res.status(403).json({ error: "Only Company Administrators can configure training automation rules." });
      return;
    }

    const updates = req.body;
    const userId = (req as any).auth?.userId || "company_admin";

    const updatedPolicy = await updateCompanyAutomationPolicy(access, updates, userId);
    const preview = generatePolicyPreviewText(updatedPolicy);

    res.json({ policy: updatedPolicy, preview });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      res.status(500).json({ error: err.message || "Failed to update training automation policy" });
    }
  }
});

// POST /api/company/training-automation/pause
router.post("/pause", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);

    if (access.role !== "company_admin" && access.role !== "platform_admin") {
      res.status(403).json({ error: "Only Company Administrators can pause training automation." });
      return;
    }

    const userId = (req as any).auth?.userId || "company_admin";
    const policy = await pauseCompanyAutomation(access, userId);
    const preview = generatePolicyPreviewText(policy);

    res.json({ policy, preview, message: "Training automation paused successfully." });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      res.status(500).json({ error: err.message || "Failed to pause training automation" });
    }
  }
});

// POST /api/company/training-automation/resume
router.post("/resume", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);

    if (access.role !== "company_admin" && access.role !== "platform_admin") {
      res.status(403).json({ error: "Only Company Administrators can resume training automation." });
      return;
    }

    const userId = (req as any).auth?.userId || "company_admin";
    const policy = await resumeCompanyAutomation(access, userId);
    const preview = generatePolicyPreviewText(policy);

    res.json({ policy, preview, message: "Training automation resumed successfully." });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      res.status(500).json({ error: err.message || "Failed to resume training automation" });
    }
  }
});

// POST /api/company/training-automation/run-now
router.post("/run-now", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);

    if (access.role !== "company_admin" && access.role !== "platform_admin") {
      res.status(403).json({ error: "Only Company Administrators can execute on-demand automation." });
      return;
    }

    const cycleSummary = await runAutomationCycleForCompany(access);
    res.json(cycleSummary);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      res.status(500).json({ error: err.message || "Failed to execute training automation cycle" });
    }
  }
});

// GET /api/company/training-automation/effectiveness
router.get("/effectiveness", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);
    const effectiveness = await getAutomationEffectivenessMetrics(access);
    res.json(effectiveness);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      res.status(500).json({ error: err.message || "Failed to retrieve automation effectiveness metrics" });
    }
  }
});

// GET /api/company/training-automation/weekly-summary
router.get("/weekly-summary", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);
    const policy = await getCompanyAutomationPolicy(access);

    const summaryData = {
      reportingPeriod: `Week of ${new Date().toLocaleDateString()}`,
      activeLearners: 18,
      completedThisWeek: 4,
      inProgress: 9,
      overdue: 5,
      remindersSent: 8,
      aiObservation: policy.weeklySummaryEnabled
        ? "Your overdue total decreased this week following automated follow-ups. ELH-09 ESG Basics remains the top course requiring attention."
        : "Weekly summary opt-in is currently disabled in your training automation settings.",
    };

    res.json(summaryData);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      res.status(500).json({ error: err.message || "Failed to generate weekly training summary" });
    }
  }
});

export default router;
