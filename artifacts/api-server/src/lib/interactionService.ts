import {
  db,
  courseInteractionProgressTable,
  coursesTable,
  lessonsTable,
  employeesTable,
  type CourseInteractionProgress,
  type Employee,
} from "@workspace/db";
import { and, eq } from "drizzle-orm";
import { logger } from "./logger.js";
import { evaluateEmployeeChallengeProgress } from "./challengeService.js";

export type InteractionType =
  | "DECISION_SCENARIO"
  | "SORTING"
  | "MATCHING"
  | "SEQUENCING"
  | "PRIORITISATION"
  | "MULTI_STEP_SCENARIO"
  | "CHALLENGE_ASSESSMENT";

export interface SubmitInteractionInput {
  companyId: number;
  employeeId: number;
  userId?: string | null;
  courseId: number;
  lessonId?: number;
  interactionId: string;
  interactionType: InteractionType;
  submissionPayload: Record<string, any>;
  interactionConfig?: Record<string, any>; // Optional client-supplied config for ad-hoc lesson blocks
}

export interface InteractionEvaluationResult {
  passed: boolean;
  score: number;
  maxScore: number;
  feedback: {
    title: string;
    summary: string;
    detail?: string;
    isOptimal?: boolean;
    consequences?: string;
    takeaway?: string;
    itemFeedback?: Record<string, any>;
  };
  progressRecord: CourseInteractionProgress;
  challengeProgressUpdated?: boolean;
}

/**
 * Validates and evaluates interaction submission server-side.
 */
export async function evaluateAndSaveInteraction(
  input: SubmitInteractionInput
): Promise<InteractionEvaluationResult> {
  const { companyId, employeeId, courseId, lessonId, interactionId, interactionType, submissionPayload, interactionConfig } = input;

  // 1. Fetch employee to verify tenant
  const [employee] = await db
    .select()
    .from(employeesTable)
    .where(and(eq(employeesTable.id, employeeId), eq(employeesTable.companyId, companyId)))
    .limit(1);

  if (!employee) {
    throw new Error("Employee not found or tenant mismatch");
  }

  // 2. Evaluate based on interaction type
  let passed = true;
  let score = 100;
  let maxScore = 100;
  let feedbackTitle = "Interaction Completed";
  let feedbackSummary = "Well done on completing this workplace activity.";
  let feedbackDetail: string | undefined;
  let consequences: string | undefined;
  let takeaway: string | undefined;
  let isOptimal = true;
  let itemFeedback: Record<string, any> | undefined;

  switch (interactionType) {
    case "DECISION_SCENARIO": {
      const selectedOptionId = submissionPayload.selectedOptionId ?? submissionPayload.selectedIndex;
      const choices = interactionConfig?.choices || interactionConfig?.options || [];
      const chosenChoice = choices.find((c: any, idx: number) => c.id === selectedOptionId || idx === selectedOptionId);

      if (chosenChoice) {
        isOptimal = chosenChoice.ideal === true || chosenChoice.correct === true || chosenChoice.isCorrect === true;
        passed = isOptimal;
        score = isOptimal ? 100 : 0;
        feedbackTitle = isOptimal ? "Best response" : "Consider this approach";
        feedbackSummary = chosenChoice.feedback || (isOptimal ? "Strong workplace decision." : "Not the best option.");
        consequences = chosenChoice.consequences || chosenChoice.consequence;
        takeaway = interactionConfig?.takeaway;
      }
      break;
    }

    case "SORTING": {
      // Items categorized into buckets
      // submissionPayload.assignments: { [itemId]: categoryId }
      const assignments = submissionPayload.assignments || {};
      const expectedItems = interactionConfig?.items || [];
      maxScore = expectedItems.length || 1;
      let correctCount = 0;
      const itemResults: Record<string, boolean> = {};

      for (const item of expectedItems) {
        const assignedCategory = assignments[item.id];
        const isCorrect = assignedCategory === item.expectedCategoryId || assignedCategory === item.category;
        itemResults[item.id] = isCorrect;
        if (isCorrect) correctCount++;
      }

      score = correctCount;
      passed = correctCount === maxScore;
      isOptimal = passed;
      feedbackTitle = passed ? "Sorting Verified" : "Sorting Review Needed";
      feedbackSummary = passed
        ? "All items correctly assigned to their respective workplace disposal and recycling streams."
        : `You sorted ${correctCount} of ${maxScore} items correctly. Review the stream requirements and retry if desired.`;
      itemFeedback = itemResults;
      takeaway = interactionConfig?.takeaway || "Always check site-specific bin labels and designated collector guidelines.";
      break;
    }

    case "MATCHING": {
      // Pairs matched: submissionPayload.pairs: [{ termId, definitionId }]
      const pairs = submissionPayload.pairs || [];
      const expectedPairs = interactionConfig?.pairs || [];
      maxScore = expectedPairs.length || 1;
      let matchedCount = 0;

      for (const p of pairs) {
        const expected = expectedPairs.find(
          (ep: any) =>
            (ep.termId === p.termId && ep.definitionId === p.definitionId) ||
            (ep.term === p.term && ep.match === p.match)
        );
        if (expected) matchedCount++;
      }

      score = matchedCount;
      passed = matchedCount === maxScore;
      isOptimal = passed;
      feedbackTitle = passed ? "Concepts Correctly Matched" : "Matching Review";
      feedbackSummary = passed
        ? "All sustainability concepts and responsibilities successfully paired."
        : `Matched ${matchedCount} of ${maxScore} pairs correctly.`;
      break;
    }

    case "SEQUENCING": {
      // Ordered array of step IDs: submissionPayload.orderedIds
      const orderedIds = submissionPayload.orderedIds || [];
      const expectedOrder = (interactionConfig?.steps || interactionConfig?.items || []).map((s: any) => s.id);
      maxScore = expectedOrder.length || 1;

      let inOrderCount = 0;
      for (let i = 0; i < expectedOrder.length; i++) {
        if (orderedIds[i] === expectedOrder[i]) inOrderCount++;
      }

      score = inOrderCount;
      passed = inOrderCount === maxScore;
      isOptimal = passed;
      feedbackTitle = passed ? "Correct Sequence" : "Order Adjustment Needed";
      feedbackSummary = passed
        ? "Steps arranged in the recommended operational sequence."
        : "The sequence order could be improved. Remember to prioritize containment and reporting before escalation.";
      takeaway = interactionConfig?.takeaway;
      break;
    }

    case "PRIORITISATION": {
      // Array of selected priority IDs: submissionPayload.selectedIds
      const selectedIds: string[] = submissionPayload.selectedIds || [];
      const optimalIds: string[] = interactionConfig?.optimalPriorityIds || [];
      const maxSelect = interactionConfig?.maxSelect || 2;
      maxScore = maxSelect;

      let matchedPriorities = 0;
      for (const id of selectedIds) {
        if (optimalIds.includes(id)) matchedPriorities++;
      }

      score = matchedPriorities;
      passed = matchedPriorities >= (interactionConfig?.requiredThreshold ?? 1);
      isOptimal = matchedPriorities === optimalIds.length;
      feedbackTitle = isOptimal ? "Optimal Priorities Selected" : passed ? "Strong Priority Choice" : "Review Priorities";
      feedbackSummary = isOptimal
        ? "You identified the key operational issues with immediate environmental and cost impact."
        : `You chose ${matchedPriorities} of ${optimalIds.length} top-priority actions.`;
      consequences = interactionConfig?.consequences;
      break;
    }

    case "MULTI_STEP_SCENARIO": {
      // Multi-stage decision tree: submissionPayload.stepResponses: Record<stageId, optionId>
      const stepResponses = submissionPayload.stepResponses || {};
      const finalOutcome = interactionConfig?.outcomes?.[submissionPayload.finalNodeId] || {
        title: "Scenario Concluded",
        summary: "You evaluated the procurement request and followed workplace sustainability guidelines.",
        isOptimal: true,
      };

      isOptimal = finalOutcome.isOptimal !== false;
      passed = isOptimal;
      score = isOptimal ? 100 : 50;
      feedbackTitle = finalOutcome.title || (isOptimal ? "Successful Workplace Resolution" : "Suboptimal Outcome");
      feedbackSummary = finalOutcome.summary;
      consequences = finalOutcome.consequences;
      takeaway = finalOutcome.takeaway || interactionConfig?.takeaway;
      break;
    }

    case "CHALLENGE_ASSESSMENT": {
      // Assessment with questions: submissionPayload.answers: { [qId]: selectedOptionIndex }
      const answers = submissionPayload.answers || {};
      const questions = interactionConfig?.questions || [];
      maxScore = questions.length || 5;
      const passThreshold = interactionConfig?.passThreshold || Math.ceil(maxScore * 0.8); // 80% default

      let correctCount = 0;
      const qFeedback: Record<string, boolean> = {};

      for (const q of questions) {
        const selected = answers[q.id];
        const isCorrect = selected === q.correctIndex;
        qFeedback[q.id] = isCorrect;
        if (isCorrect) correctCount++;
      }

      score = correctCount;
      passed = correctCount >= passThreshold;
      isOptimal = passed;
      feedbackTitle = passed ? "Challenge Assessment Passed" : "Assessment Review Required";
      feedbackSummary = passed
        ? `Passed with ${correctCount} of ${maxScore} correct! This satisfies the challenge knowledge criterion.`
        : `You scored ${correctCount} of ${maxScore} (need ${passThreshold} to pass). Review course materials and try again.`;
      itemFeedback = qFeedback;
      break;
    }

    default: {
      passed = true;
      score = 100;
      maxScore = 100;
    }
  }

  // 3. Upsert into course_interaction_progress (scoped cleanly per employee, course, and interaction)
  const [existing] = await db
    .select()
    .from(courseInteractionProgressTable)
    .where(
      and(
        eq(courseInteractionProgressTable.employeeId, employeeId),
        eq(courseInteractionProgressTable.courseId, courseId),
        eq(courseInteractionProgressTable.interactionId, interactionId)
      )
    )
    .limit(1);

  const attemptCount = existing ? existing.attemptCount + 1 : 1;
  const status = passed ? "PASSED" : "IN_PROGRESS";

  let progressRecord: CourseInteractionProgress;
  if (existing) {
    const [updated] = await db
      .update(courseInteractionProgressTable)
      .set({
        status,
        score,
        maxScore,
        passed,
        attemptCount,
        statePayload: submissionPayload,
        submittedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(courseInteractionProgressTable.id, existing.id))
      .returning();
    progressRecord = updated;
  } else {
    const [inserted] = await db
      .insert(courseInteractionProgressTable)
      .values({
        companyId,
        employeeId,
        userId: employee.clerkUserId,
        courseId,
        lessonId: lessonId || null,
        interactionId,
        interactionType,
        status,
        score,
        maxScore,
        passed,
        attemptCount,
        statePayload: submissionPayload,
        submittedAt: new Date(),
      })
      .returning();
    progressRecord = inserted;
  }

  logger.info(
    {
      employeeId,
      interactionId,
      interactionType,
      passed,
      score,
      maxScore,
    },
    "Evaluated and persisted course interaction"
  );

  // 4. Trigger challenge progress evaluation if this interaction fulfills active company challenges
  let challengeProgressUpdated = false;
  try {
    const evalRes = await evaluateEmployeeChallengeProgress({ employee });
    if (evalRes.completedChallenges.length > 0) {
      challengeProgressUpdated = true;
    }
  } catch (err: any) {
    logger.warn({ err: err?.message }, "Failed to evaluate challenge progress after interaction submission");
  }

  return {
    passed,
    score,
    maxScore,
    feedback: {
      title: feedbackTitle,
      summary: feedbackSummary,
      detail: feedbackDetail,
      isOptimal,
      consequences,
      takeaway,
      itemFeedback,
    },
    progressRecord,
    challengeProgressUpdated,
  };
}

/**
 * Retrieves saved interaction progress for an employee and course.
 */
export async function getLearnerCourseInteractions(params: {
  companyId: number;
  employeeId: number;
  courseId: number;
}): Promise<CourseInteractionProgress[]> {
  return await db
    .select()
    .from(courseInteractionProgressTable)
    .where(
      and(
        eq(courseInteractionProgressTable.companyId, params.companyId),
        eq(courseInteractionProgressTable.employeeId, params.employeeId),
        eq(courseInteractionProgressTable.courseId, params.courseId)
      )
    );
}
