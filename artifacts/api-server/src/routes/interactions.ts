import { Router } from "express";
import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { db, employeesTable } from "@workspace/db";
import { and, eq } from "drizzle-orm";
import { logger } from "../lib/logger.js";
import {
  evaluateAndSaveInteraction,
  getLearnerCourseInteractions,
  type InteractionType,
} from "../lib/interactionService.js";

const router = Router();

async function getAuthenticatedEmployee(req: Request) {
  const auth = getAuth(req);
  const clerkUserId = auth.userId || (req.headers["x-user-id"] as string);
  const email = (req.headers["x-user-email"] as string) || (auth.sessionClaims?.email as string);

  if (!clerkUserId && !email) {
    return null;
  }

  const [employee] = await db
    .select()
    .from(employeesTable)
    .where(
      clerkUserId
        ? eq(employeesTable.clerkUserId, clerkUserId)
        : eq(employeesTable.email, email)
    )
    .limit(1);

  return employee || null;
}

/**
 * POST /api/interactions/submit
 * Submits an interaction attempt, validates correctness server-side,
 * and updates challenge progress if applicable.
 */
router.post("/submit", async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await getAuthenticatedEmployee(req);
    if (!employee) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const {
      courseId,
      lessonId,
      interactionId,
      interactionType,
      submissionPayload,
      interactionConfig,
    } = req.body;

    if (!courseId || !interactionId || !interactionType || !submissionPayload) {
      res.status(400).json({ error: "Missing required interaction parameters" });
      return;
    }

    const result = await evaluateAndSaveInteraction({
      companyId: employee.companyId,
      employeeId: employee.id,
      userId: employee.clerkUserId,
      courseId: Number(courseId),
      lessonId: lessonId ? Number(lessonId) : undefined,
      interactionId: String(interactionId),
      interactionType: interactionType as InteractionType,
      submissionPayload,
      interactionConfig,
    });

    res.json(result);
  } catch (err: any) {
    logger.error({ err: err?.message }, "Failed to submit interaction");
    res.status(500).json({ error: err?.message || "Failed to process interaction" });
  }
});

/**
 * GET /api/interactions/progress
 * Retrieves saved interaction progress for an employee and course.
 */
router.get("/progress", async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await getAuthenticatedEmployee(req);
    if (!employee) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const courseId = Number(req.query.courseId);
    if (!courseId) {
      res.status(400).json({ error: "courseId parameter required" });
      return;
    }

    const progress = await getLearnerCourseInteractions({
      companyId: employee.companyId,
      employeeId: employee.id,
      courseId,
    });

    res.json(progress);
  } catch (err: any) {
    logger.error({ err: err?.message }, "Failed to fetch interaction progress");
    res.status(500).json({ error: err?.message || "Failed to fetch interaction progress" });
  }
});

export default router;
