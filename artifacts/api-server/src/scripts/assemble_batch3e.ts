import * as fs from "fs";
import * as path from "path";
import { BATCH3E_DATA_A } from "./batch3e_data_a";
import { BATCH3E_DATA_B } from "./batch3e_data_b";
import { BATCH3E_DATA_C } from "./batch3e_data_c";

const ALL_COURSES = [
  ...BATCH3E_DATA_A,
  ...BATCH3E_DATA_B,
  ...BATCH3E_DATA_C
];

console.log(`Total courses to assemble: ${ALL_COURSES.length}`);

// Validate that we have exactly 21 courses with unique codes
const codes = ALL_COURSES.map(c => c.courseCode);
const uniqueCodes = new Set(codes);
if (codes.length !== 21 || uniqueCodes.size !== 21) {
  throw new Error(`Expected 21 unique courses, got ${codes.length} (unique: ${uniqueCodes.size})`);
}

// Validate that every course has exactly 5 lessons and 8 quiz questions
for (const course of ALL_COURSES) {
  if (course.lessons.length !== 5) {
    throw new Error(`Course ${course.courseCode} has ${course.lessons.length} lessons (expected 5)`);
  }
  if (course.quizQuestions.length !== 8) {
    throw new Error(`Course ${course.courseCode} has ${course.quizQuestions.length} quiz questions (expected 8)`);
  }
  // Validate 4 options and 4 feedback items per question
  for (let i = 0; i < course.quizQuestions.length; i++) {
    const q = course.quizQuestions[i];
    if (q.options.length !== 4) {
      throw new Error(`Course ${course.courseCode} question ${i + 1} has ${q.options.length} options (expected 4)`);
    }
    if (q.optionFeedback.length !== 4) {
      throw new Error(`Course ${course.courseCode} question ${i + 1} has ${q.optionFeedback.length} optionFeedback items (expected 4)`);
    }
    if (q.correctOption < 0 || q.correctOption > 3) {
      throw new Error(`Course ${course.courseCode} question ${i + 1} has invalid correctOption: ${q.correctOption}`);
    }
  }
  // Validate recommendation is not self
  if (course.recommendedNextCourseCode === course.courseCode) {
    throw new Error(`Course ${course.courseCode} recommends itself`);
  }
}

console.log("All 21 courses passed structural and content validation!");

const fileHeader = `import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  enrollmentsTable,
  lessonProgressTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger";

export interface RemediatedCourseDataBatch3E {
  courseCode: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  categoryId: number;
  durationMinutes: number;
  priceUsd: string;
  level: string;
  passingScore: number;
  primaryCompetency: string;
  secondaryCompetencies: string[];
  learningObjectives: string[];
  intendedRoles: string[];
  badgeName: string;
  badgeDescription: string;
  completionMessage: string;
  recommendedNextCourseCode: string;
  lessons: Array<{
    title: string;
    orderIndex: number;
    durationMinutes: number;
    content: string;
    contentBlocks: any[];
  }>;
  quizQuestions: Array<{
    question: string;
    options: string[];
    correctOption: number;
    orderIndex: number;
    correctExplanation: string;
    incorrectExplanation: string;
    optionFeedback: string[];
    practicalTakeaway: string;
    learningOutcome: string;
    competencyArea: string;
  }>;
}

export const BATCH_3E_COURSES: RemediatedCourseDataBatch3E[] = ${JSON.stringify(ALL_COURSES, null, 2)};

export async function ensureBatch3ERemediation(options?: { force?: boolean }): Promise<void> {
  logger.info("[Batch3E] Starting Sprint 15.2.10 Batch 3E controlled course remediation (21 courses)...");

  for (const courseData of BATCH_3E_COURSES) {
    const [existingCourse] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, courseData.courseCode))
      .limit(1);

    if (!existingCourse) {
      logger.warn({ code: courseData.courseCode }, "[Batch3E] Course not found in database. Skipping.");
      continue;
    }

    if (!options?.force && existingCourse.version && existingCourse.version >= 2) {
      logger.info(
        { code: courseData.courseCode, version: existingCourse.version },
        "[Batch3E] Course already at Version 2 or above. Idempotent skip."
      );
      continue;
    }

    let nextCourseId: number | null = null;
    if (courseData.recommendedNextCourseCode) {
      const [nextCourse] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, courseData.recommendedNextCourseCode))
        .limit(1);
      if (nextCourse) {
        nextCourseId = nextCourse.id;
      }
    }

    logger.info({ code: courseData.courseCode, id: existingCourse.id }, "[Batch3E] Upgrading course to version 2...");

    // 1. Update Course Metadata to Version 2
    await db
      .update(coursesTable)
      .set({
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        fullDescription: courseData.fullDescription,
        categoryId: courseData.categoryId,
        durationMinutes: courseData.durationMinutes,
        priceUsd: courseData.priceUsd,
        level: courseData.level,
        passingScore: courseData.passingScore,
        primaryCompetency: courseData.primaryCompetency,
        secondaryCompetencies: courseData.secondaryCompetencies,
        learningObjectives: courseData.learningObjectives,
        intendedRoles: courseData.intendedRoles,
        badgeName: courseData.badgeName,
        badgeDescription: courseData.badgeDescription,
        completionMessage: courseData.completionMessage,
        recommendedNextCourseId: nextCourseId,
        version: 2,
        isPublished: true,
        status: "published",
        updatedAt: new Date(),
      })
      .where(eq(coursesTable.id, existingCourse.id));

    // 2. Clear out legacy Version 1 lessons and quiz questions
    const oldLessons = await db
      .select()
      .from(lessonsTable)
      .where(eq(lessonsTable.courseId, existingCourse.id));

    const oldLessonIds = oldLessons.map((l) => l.id);
    if (oldLessonIds.length > 0) {
      await db
        .delete(lessonProgressTable)
        .where(inArray(lessonProgressTable.lessonId, oldLessonIds));
    }

    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, existingCourse.id));
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, existingCourse.id));

    // 3. Insert 5 new chunked lessons
    for (const lesson of courseData.lessons) {
      await db.insert(lessonsTable).values({
        courseId: existingCourse.id,
        title: lesson.title,
        orderIndex: lesson.orderIndex,
        durationMinutes: lesson.durationMinutes,
        content: lesson.content,
        contentBlocks: lesson.contentBlocks,
      });
    }

    // 4. Insert 8 new scored quiz questions with feedback
    for (const q of courseData.quizQuestions) {
      await db.insert(quizQuestionsTable).values({
        courseId: existingCourse.id,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        orderIndex: q.orderIndex,
        correctExplanation: q.correctExplanation,
        incorrectExplanation: q.incorrectExplanation,
        optionFeedback: q.optionFeedback,
        practicalTakeaway: q.practicalTakeaway,
        learningOutcome: q.learningOutcome,
        competencyArea: q.competencyArea,
      });
    }

    logger.info(
      { code: courseData.courseCode, courseId: existingCourse.id, version: 2, lessonsCount: courseData.lessons.length, quizCount: courseData.quizQuestions.length },
      "[Batch3E] Successfully remediated course with 5 lessons and 8 scored quiz items."
    );
  }

  logger.info("[Batch3E] Wave 3E remediation completed successfully for all 21 courses.");
}

// Forward-only version-safe rollback engine for Batch 3E
export async function executeVersionSafeRollbackBatch3E(
  courseCode: string,
  snapshotContent: {
    title?: string;
    description?: string;
    lessons?: any[];
    quizQuestions?: any[];
  }
): Promise<number> {
  const [course] = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.courseCode, courseCode))
    .limit(1);

  if (!course) {
    throw new Error("Course " + courseCode + " not found for rollback");
  }

  const currentVersion = course.version ?? 1;
  const nextVersion = currentVersion + 1; // Strict monotonic forward increment (e.g. v2 -> v3)

  await db
    .update(coursesTable)
    .set({
      title: snapshotContent.title || course.title,
      description: snapshotContent.description || course.description,
      version: nextVersion,
      updatedAt: new Date(),
    })
    .where(eq(coursesTable.id, course.id));

  if (snapshotContent.lessons && snapshotContent.lessons.length > 0) {
    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, course.id));
    for (const l of snapshotContent.lessons) {
      await db.insert(lessonsTable).values({
        courseId: course.id,
        title: l.title,
        orderIndex: l.orderIndex,
        durationMinutes: l.durationMinutes || 10,
        content: l.content || "",
        contentBlocks: l.contentBlocks || [],
      });
    }
  }

  if (snapshotContent.quizQuestions && snapshotContent.quizQuestions.length > 0) {
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, course.id));
    for (const q of snapshotContent.quizQuestions) {
      await db.insert(quizQuestionsTable).values({
        courseId: course.id,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        orderIndex: q.orderIndex,
        correctExplanation: q.correctExplanation || "",
        incorrectExplanation: q.incorrectExplanation || "",
        optionFeedback: q.optionFeedback || [],
        practicalTakeaway: q.practicalTakeaway || "",
      });
    }
  }

  logger.info({ code: courseCode, previousVersion: currentVersion, rolledBackToNewVersion: nextVersion }, "Batch 3E forward rollback executed successfully.");
  return nextVersion;
}
`;

const targetPath = path.resolve(process.cwd(), "src/lib/ensureBatch3ERemediation.ts");
fs.writeFileSync(targetPath, fileHeader, "utf-8");
console.log(`Successfully wrote ${targetPath} (${Buffer.byteLength(fileHeader)} bytes).`);
