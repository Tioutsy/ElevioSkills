import { Router } from "express";
import { getCompanyAccess, sendHttpError } from "../lib/access";
import { generateEmployeeSkillsProfile } from "../lib/ai/aiSkillsGapService";

const router = Router();

// GET /api/learning/skills-profile — Learner Self-Service API
router.get("/skills-profile", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);

    if (!access.employee) {
      res.json({
        employeeId: "guest-user",
        companyId: access.companyId,
        generatedAt: new Date().toISOString(),
        providerTag: "fallback",
        modelUsed: "rule-based-fallback",
        isFallback: true,
        hasSufficientEvidence: false,
        insufficientEvidenceMessage: "More learning and assessment data is needed to identify a reliable pattern.",
        completedLearning: [],
        demonstratedStrengths: [],
        inferredKnowledgeGaps: [],
        recommendedInterventions: [],
        knowledgeProfile: { strengths: [], gaps: [], criticalGaps: [] },
        disclaimer: "Course completion and quiz results reflect training exposure and assessment scores, not verified on-the-job professional competence.",
      });
      return;
    }

    const profile = await generateEmployeeSkillsProfile(access.employee.id, access);
    res.json(profile);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      req.log?.error({ err: err?.message }, "Failed to fetch learner skills profile");
      res.status(500).json({ error: err?.message || "Failed to retrieve learning profile" });
    }
  }
});

export default router;
