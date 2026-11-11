import { Router } from "express";
import { getCompanyAccess, sendHttpError, HttpError } from "../lib/access";
import { calculateSustainabilitySkillsReview } from "../lib/skillsReviewService";

const router = Router();

// GET /api/skills-review/me — Retrieve personal Sustainability Skills Review
router.get("/me", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);
    const review = await calculateSustainabilitySkillsReview(access);
    res.json(review);
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      res.status(500).json({ error: "Failed to calculate Sustainability Skills Review" });
    }
  }
});

// GET /api/skills-review/summary — Quick progress summary for navbar/dashboard cards
router.get("/summary", async (req, res): Promise<void> => {
  try {
    const access = await getCompanyAccess(req);
    const review = await calculateSustainabilitySkillsReview(access);
    res.json({
      isUnlocked: review.isUnlocked,
      completedCount: review.completedCount,
      totalRequired: review.totalRequired,
      progressPercentage: review.progressPercentage,
      overallScore: review.overallScore,
      performanceRating: review.performanceRating,
    });
  } catch (err: any) {
    if (!sendHttpError(res, err)) {
      res.status(500).json({ error: "Failed to retrieve skills review summary" });
    }
  }
});

export default router;
