import { db, coursesTable, quizQuestionsTable, lessonsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { logger } from "./logger";

import { COHORT_15_2_10B_DATA } from "./ensureCohort15_2_10BRemediation";
import { COHORT_15_2_10C_DATA } from "./ensureCohort15_2_10CRemediation";
import { COHORT_15_2_10D_DATA } from "./ensureCohort15_2_10DRemediation";
import { COHORT_15_2_10E_DATA } from "./ensureCohort15_2_10ERemediation";
import { COHORT_15_2_10F_DATA } from "./ensureCohort15_2_10FRemediation";
import { COHORT_15_2_10G_DATA } from "./ensureCohort15_2_10GRemediation";
import { COHORT_15_2_10H_DATA } from "./ensureCohort15_2_10HRemediation";
import { COHORT_15_2_10I_DATA } from "./ensureCohort15_2_10IRemediation";
import { COHORT_15_2_10J_DATA } from "./ensureCohort15_2_10JRemediation";
import { COHORT_15_2_10K_DATA } from "./ensureCohort15_2_10KRemediation";
import { COHORT_15_2_10L_DATA } from "./ensureCohort15_2_10LRemediation";

export interface SyncQuestionsResult {
  totalTargetCourses: number;
  syncedCoursesCount: number;
  questionsInsertedCount: number;
  questionsRemappedCount: number;
  alreadyPopulatedCount: number;
  missingInDbCount: number;
}

const ALL_COHORTS = [
  ...COHORT_15_2_10L_DATA, // ELH-01..11, ELH-132..136
  ...COHORT_15_2_10B_DATA, // ELH-12..23
  ...COHORT_15_2_10C_DATA, // ELH-24..35
  ...COHORT_15_2_10D_DATA, // ELH-36..47
  ...COHORT_15_2_10E_DATA, // ELH-48..59
  ...COHORT_15_2_10F_DATA, // ELH-60..71
  ...COHORT_15_2_10G_DATA, // ELH-72..83
  ...COHORT_15_2_10H_DATA, // ELH-84..95
  ...COHORT_15_2_10I_DATA, // ELH-96..107
  ...COHORT_15_2_10J_DATA, // ELH-108..119
  ...COHORT_15_2_10K_DATA, // ELH-120..131
];

/**
 * Idempotently links and synchronizes authored quiz questions for every challenge in the catalogue
 * by dynamic courseCode matching (ELH-01 through ELH-136) rather than fragile hardcoded IDs.
 */
export async function ensureSyncCourseQuestions(): Promise<SyncQuestionsResult> {
  const result: SyncQuestionsResult = {
    totalTargetCourses: ALL_COHORTS.length,
    syncedCoursesCount: 0,
    questionsInsertedCount: 0,
    questionsRemappedCount: 0,
    alreadyPopulatedCount: 0,
    missingInDbCount: 0,
  };

  try {
    const allCourses = await db.select().from(coursesTable);
    const courseByCode = new Map<string, typeof allCourses[0]>();

    for (const c of allCourses) {
      if (c.courseCode) {
        courseByCode.set(c.courseCode.trim().toUpperCase(), c);
      }
    }

    // Process each cohort definition
    for (const cohort of ALL_COHORTS) {
      const code = cohort.courseCode.trim().toUpperCase();
      const targetCourse = courseByCode.get(code);

      if (!targetCourse) {
        result.missingInDbCount++;
        continue;
      }

      const actualCourseId = targetCourse.id;
      const legacyCourseId = cohort.courseId;

      // Check current active questions for actualCourseId
      const existingQs = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, actualCourseId));

      const activeExisting = existingQs.filter((q) => !q.isArchived);

      if (activeExisting.length >= cohort.questions.length && activeExisting.length > 0) {
        result.alreadyPopulatedCount++;
        continue;
      }

      // Step 1: Check if questions were orphan-linked under legacy courseId
      if (actualCourseId !== legacyCourseId) {
        const legacyQuestions = await db
          .select()
          .from(quizQuestionsTable)
          .where(eq(quizQuestionsTable.courseId, legacyCourseId));

        if (legacyQuestions.length >= cohort.questions.length) {
          await db
            .update(quizQuestionsTable)
            .set({ courseId: actualCourseId })
            .where(eq(quizQuestionsTable.courseId, legacyCourseId));

          result.questionsRemappedCount += legacyQuestions.length;
          result.syncedCoursesCount++;
          continue;
        }
      }

      // Step 2: Insert or replace complete authored questions for this challenge
      if (existingQs.length > 0) {
        await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, actualCourseId));
      }

      await db.insert(quizQuestionsTable).values(
        cohort.questions.map((q) => ({
          courseId: actualCourseId,
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

      // Ensure passing score is set on the course
      await db
        .update(coursesTable)
        .set({
          passingScore: cohort.passingScore || 80,
          updatedAt: new Date(),
        })
        .where(eq(coursesTable.id, actualCourseId));

      result.questionsInsertedCount += cohort.questions.length;
      result.syncedCoursesCount++;
    }

    // Ensure listed formatting for ELH-30 / Waste Hierarchy lessons if present in database
    try {
      const allLessons = await db.select().from(lessonsTable);
      for (const lesson of allLessons) {
        if (!lesson.contentBlocks || !Array.isArray(lesson.contentBlocks)) continue;
        let modified = false;
        const updatedBlocks = (lesson.contentBlocks as any[]).map((block) => {
          if (
            block.headingText === "The 5R Hierarchy in Daily Operations" ||
            (block.bodyText && block.bodyText.includes("1. Refuse: Avoid purchasing"))
          ) {
            modified = true;
            return {
              ...block,
              bodyText:
                "1. Refuse: Avoid purchasing non-essential single-use packaging and items.\n\n2. Reduce: Optimize usage volumes and eliminate operational excess.\n\n3. Reuse & Repair: Maintain equipment, repair broken fixtures, and use durable containers.\n\n4. Repurpose: Adapt surplus materials for alternative internal uses.\n\n5. Recycle: Clean and segregate genuine recyclable materials for industrial reprocessing.",
            };
          }
          if (
            block.headingText === "Operating Across Official MMS Cyclone Alert Stages" ||
            (block.bodyText && block.bodyText.includes("Mauritius Meteorological Services Tropical Cyclone Warning System"))
          ) {
            modified = true;
            return {
              ...block,
              bodyText:
                "Under the Mauritius Meteorological Services Tropical Cyclone Warning System (metservice.intnet.mu/tropical-cyclone/warning-system.php), warnings are issued across 4 sequential alert stages:\n\n1. Class I: Issued 36 to 48 hours before the occurrence of gusts of 120 km/h (verify backup generator fuel, test sump pumps, clear roof drains).\n\n2. Class II: Issued so as to allow, as far as practicable, 12 hours of daylight before the occurrence of gusts of 120 km/h (secure outdoor equipment, shutter windows, initiate cloud backups).\n\n3. Class III: Issued so as to allow, as far as practicable, 6 hours of daylight before the occurrence of gusts of 120 km/h (orderly shutdown and staff dismissal before public transport stops).\n\n4. Class IV: Issued when gusts of 120 km/h are occurring in Mauritius and are expected to continue.",
            };
          }
          return block;
        });

        if (modified) {
          await db
            .update(lessonsTable)
            .set({ contentBlocks: updatedBlocks })
            .where(eq(lessonsTable.id, lesson.id));
        }
      }
    } catch (e) {
      logger.warn({ err: e }, "[Sync Questions] Non-blocking lesson block formatting notice.");
    }

    logger.info(
      {
        alreadyPopulated: result.alreadyPopulatedCount,
        newlySynced: result.syncedCoursesCount,
        questionsInserted: result.questionsInsertedCount,
        questionsRemapped: result.questionsRemappedCount,
      },
      "[Sync Questions] Course quiz questions synchronization completed successfully."
    );
  } catch (err) {
    logger.error({ err }, "[Sync Questions] Failed to synchronize course quiz questions.");
    throw err;
  }

  return result;
}
