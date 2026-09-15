import fs from "node:fs";
import { COHORT_15_2_10F_DATA } from "../lib/ensureCohort15_2_10FRemediation.js";

async function main() {
  const updatedData = COHORT_15_2_10F_DATA.map((course) => {
    const updatedQuestions = course.questions.map((q, idx) => {
      const targetIdx = (q.order - 1) % 4; // 0, 1, 2, 3, 0, 1, 2, 3 -> exactly 2 of each!
      const currentCorrect = q.correct;
      const opts = [...q.options] as [string, string, string, string];
      const fbs = [...q.optionFeedback] as [string, string, string, string];

      if (currentCorrect !== targetIdx) {
        const tempOpt = opts[currentCorrect];
        opts[currentCorrect] = opts[targetIdx];
        opts[targetIdx] = tempOpt;

        const tempFb = fbs[currentCorrect];
        fbs[currentCorrect] = fbs[targetIdx];
        fbs[targetIdx] = tempFb;
      }

      return {
        ...q,
        options: opts,
        correct: targetIdx,
        optionFeedback: fbs,
      };
    });

    return {
      ...course,
      questions: updatedQuestions,
    };
  });

  // Re-serialize ensureCohort15_2_10FRemediation.ts
  let code = `import {
  db,
  coursesTable,
  quizQuestionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger.js";
import { SPRINT_15_2_10F_COHORT, SPRINT_15_2_10F_COHORT_COURSE_IDS } from "./courseAssessmentCohort15_2_10F.js";

export interface CohortQuestionDefinition {
  order: number;
  question: string;
  options: [string, string, string, string];
  correct: number;
  correctExplanation: string;
  incorrectExplanation: string;
  optionFeedback: [string, string, string, string];
  competencyArea?: string;
  sourceCourseId?: number;
}

export interface CohortCourseRemediationData {
  courseId: number;
  courseCode: string;
  passingScore: number;
  questions: CohortQuestionDefinition[];
}

export const COHORT_15_2_10F_DATA: CohortCourseRemediationData[] = ${JSON.stringify(updatedData, null, 2)};

export async function ensureCohort15_2_10FRemediation(): Promise<void> {
  try {
    const cohortCourses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.id, SPRINT_15_2_10F_COHORT_COURSE_IDS));

    if (cohortCourses.length !== 12) {
      logger.warn(
        { found: cohortCourses.length, expected: 12 },
        "Cohort 15.2.10F courses not fully present in DB yet. Skipping assessment remediation until seeded."
      );
      return;
    }

    await db.transaction(async (tx) => {
      for (const courseData of COHORT_15_2_10F_DATA) {
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
          name: "sprint-15-2-10f-assessment-remediation",
          version: 1,
        })
        .onConflictDoUpdate({
          target: systemSeedsTable.name,
          set: { version: 1, runAt: new Date() },
        });

      logger.info("Sprint 15.2.10F Controlled Assessment Quality Remediation transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute Sprint 15.2.10F assessment remediation");
    throw err;
  }
}
`;

  fs.writeFileSync("src/lib/ensureCohort15_2_10FRemediation.ts", code);
  console.log("Successfully enforced exact 2/2/2/2 distribution for all 12 courses!");
}

main().catch(console.error);
