import {
  db,
  coursesTable,
  quizQuestionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger.js";
import { SPRINT_15_2_10J_COHORT, SPRINT_15_2_10J_COHORT_COURSE_IDS } from "./courseAssessmentCohort15_2_10J.js";
import { COHORT_15_2_10J_PART1_DATA } from "./cohort15_2_10j_data_part1.js";
import type { CohortCourseRemediationData, CohortQuestionDefinition } from "./cohort15_2_10j_data_part1.js";
import { COHORT_15_2_10J_PART2_DATA } from "./cohort15_2_10j_data_part2.js";

export type { CohortCourseRemediationData, CohortQuestionDefinition };

export const COHORT_15_2_10J_DATA: CohortCourseRemediationData[] = [
  ...COHORT_15_2_10J_PART1_DATA,
  ...COHORT_15_2_10J_PART2_DATA,
];

export async function ensureCohort15_2_10JRemediation(): Promise<void> {
  try {
    const [existingSeed] = await db
      .select()
      .from(systemSeedsTable)
      .where(eq(systemSeedsTable.name, "sprint-15-2-10j-assessment-remediation"))
      .limit(1);

    if (existingSeed) {
      logger.info("Sprint 15.2.10J Controlled Assessment Quality Remediation already applied. Skipping runtime rewrite.");
      return;
    }

    const cohortCourses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.id, SPRINT_15_2_10J_COHORT_COURSE_IDS));

    if (cohortCourses.length !== 12) {
      logger.warn(
        { found: cohortCourses.length, expected: 12 },
        "Cohort 15.2.10J courses not fully present in DB yet. Skipping assessment remediation until seeded."
      );
      return;
    }

    await db.transaction(async (tx) => {
      for (const courseData of COHORT_15_2_10J_DATA) {
        const { courseId, courseCode, passingScore, questions } = courseData;

        // 1. Ensure passing score is 80 and version is at least 2
        const existingCourse = cohortCourses.find((c) => c.id === courseId);
        const newVersion = Math.max(2, existingCourse?.version ?? 2);

        await tx
          .update(coursesTable)
          .set({
            passingScore,
            version: newVersion,
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, courseId));

        // 2. Re-seed questions with complete optionFeedback, balanced 2/2/2/2 keys, and scenario depth
        await tx.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
        await tx.insert(quizQuestionsTable).values(
          questions.map((q) => ({
            courseId,
            question: q.question,
            options: q.options,
            correctOption: q.correct,
            orderIndex: q.order,
            correctExplanation: q.correctExplanation,
            incorrectExplanation: q.incorrectExplanation,
            optionFeedback: q.optionFeedback,
            competencyArea: q.competencyArea ?? null,
            sourceCourseId: q.sourceCourseId ?? null,
            isArchived: false,
          }))
        );

        logger.info({ courseId, courseCode, count: questions.length }, "Remediated course assessment with complete option-level feedback and scenarios.");
      }

      // Record seed version
      await tx
        .insert(systemSeedsTable)
        .values({
          name: "sprint-15-2-10j-assessment-remediation",
          version: 1,
        })
        .onConflictDoUpdate({
          target: systemSeedsTable.name,
          set: { version: 1, runAt: new Date() },
        });

      logger.info("Sprint 15.2.10J Controlled Assessment Quality Remediation transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute Sprint 15.2.10J assessment remediation");
    throw err;
  }
}
