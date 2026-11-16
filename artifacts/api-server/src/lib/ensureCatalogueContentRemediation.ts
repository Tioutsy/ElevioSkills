import { db, coursesTable, lessonsTable } from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { logger } from "./logger";

import { BATCH_1_REMEDIATED_COURSES } from "./ensureBatch1Remediation";
import { BATCH_2_REMEDIATED_COURSES } from "./ensureBatch2Remediation";
import { BATCH_3A_COURSES } from "./ensureBatch3ARemediation";
import { BATCH_3B_COURSES } from "./ensureBatch3BRemediation";

export interface RemediationSummary {
  coursesEvaluated: number;
  coursesRemediated: number;
  lessonsInserted: number;
  universalLessonsSynthesized: number;
}

interface NormalizedLessonDef {
  title: string;
  orderIndex: number;
  durationMinutes: number;
  content: string;
  contentBlocks: any[];
}

interface NormalizedCourseDef {
  courseCode: string;
  title: string;
  slug?: string;
  description?: string;
  lessons: NormalizedLessonDef[];
}

/**
 * Idempotently audits and repairs catalogue course lessons and content blocks.
 * Ensures no published course has draft skeletons, missing lessons, or empty content blocks.
 */
export async function ensureCatalogueContentRemediation(): Promise<RemediationSummary> {
  const summary: RemediationSummary = {
    coursesEvaluated: 0,
    coursesRemediated: 0,
    lessonsInserted: 0,
    universalLessonsSynthesized: 0,
  };

  logger.info("Starting ensureCatalogueContentRemediation: checking course content across batches...");

  // 1. Gather all normalized course definitions across batches 1, 2, 3A, 3B
  const allBatches: NormalizedCourseDef[] = [];

  for (const c of BATCH_1_REMEDIATED_COURSES) {
    allBatches.push({
      courseCode: c.courseCode,
      title: c.title,
      slug: c.slug,
      description: c.description,
      lessons: c.lessons.map((l, idx) => ({
        title: l.title,
        orderIndex: l.order ?? idx,
        durationMinutes: l.minutes ?? 3,
        content: l.content,
        contentBlocks: l.blocks || [],
      })),
    });
  }

  for (const c of BATCH_2_REMEDIATED_COURSES) {
    allBatches.push({
      courseCode: c.courseCode,
      title: c.title,
      slug: c.slug,
      description: c.description,
      lessons: c.lessons.map((l, idx) => ({
        title: l.title,
        orderIndex: l.orderIndex ?? idx,
        durationMinutes: l.durationMinutes ?? 3,
        content: l.content,
        contentBlocks: l.contentBlocks || [],
      })),
    });
  }

  for (const c of BATCH_3A_COURSES) {
    allBatches.push({
      courseCode: c.courseCode,
      title: c.title,
      slug: c.slug,
      description: c.description,
      lessons: c.lessons.map((l, idx) => ({
        title: l.title,
        orderIndex: l.orderIndex ?? idx,
        durationMinutes: l.durationMinutes ?? 3,
        content: l.content,
        contentBlocks: l.contentBlocks || [],
      })),
    });
  }

  for (const c of BATCH_3B_COURSES) {
    allBatches.push({
      courseCode: c.courseCode,
      title: c.title,
      slug: c.slug,
      description: c.description,
      lessons: c.lessons.map((l, idx) => ({
        title: l.title,
        orderIndex: l.orderIndex ?? idx,
        durationMinutes: l.durationMinutes ?? 3,
        content: l.content,
        contentBlocks: l.contentBlocks || [],
      })),
    });
  }

  summary.coursesEvaluated = allBatches.length;

  // 2. Iterate through each authored course definition and verify database content
  for (const def of allBatches) {
    try {
      // Find course in database by courseCode
      const [existingCourse] = await db
        .select({
          id: coursesTable.id,
          courseCode: coursesTable.courseCode,
          title: coursesTable.title,
          isPublished: coursesTable.isPublished,
        })
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, def.courseCode))
        .limit(1);

      if (!existingCourse) {
        continue;
      }

      const courseId = existingCourse.id;

      // Query current lessons for this course
      const currentLessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, courseId));

      const hasMissingLessons = currentLessons.length < def.lessons.length;
      const hasEmptyBlocks = currentLessons.some(
        (l) => !l.contentBlocks || !Array.isArray(l.contentBlocks) || (l.contentBlocks as any[]).length === 0
      );
      const hasDraftSkeleton = currentLessons.some(
        (l) => (l.content && l.content.includes("[DRAFT SKELETON]")) || (l.title && l.title.includes("[DRAFT SKELETON]"))
      );

      const needsRemediation = hasMissingLessons || hasEmptyBlocks || hasDraftSkeleton;

      if (needsRemediation) {
        logger.info(
          { courseCode: def.courseCode, courseId, hasMissingLessons, hasEmptyBlocks, hasDraftSkeleton },
          `Remediating content for course ${def.courseCode} (${def.title})...`
        );

        await db.transaction(async (tx) => {
          // Delete old/draft lessons
          await tx.delete(lessonsTable).where(eq(lessonsTable.courseId, courseId));

          // Insert authored lessons with rich contentBlocks
          for (let idx = 0; idx < def.lessons.length; idx++) {
            const l = def.lessons[idx]!;
            await tx.insert(lessonsTable).values({
              courseId,
              title: l.title,
              orderIndex: l.orderIndex ?? idx,
              durationMinutes: l.durationMinutes || 3,
              content: l.content || `Practical guidelines for ${l.title}.`,
              contentBlocks: l.contentBlocks,
              isArchived: false,
            });
            summary.lessonsInserted++;
          }

          // If course title has [DRAFT SKELETON], update it
          if (existingCourse.title && existingCourse.title.includes("[DRAFT SKELETON]")) {
            await tx
              .update(coursesTable)
              .set({
                title: def.title,
                description: def.description,
              })
              .where(eq(coursesTable.id, courseId));
          }
        });

        summary.coursesRemediated++;
      }
    } catch (err) {
      logger.error({ err, courseCode: def.courseCode }, "Error remediating course content");
    }
  }

  // 3. Universal safety net: find any published course lessons that still have empty contentBlocks
  try {
    const publishedCourses = await db
      .select({ id: coursesTable.id, courseCode: coursesTable.courseCode, title: coursesTable.title })
      .from(coursesTable)
      .where(eq(coursesTable.isPublished, true));

    for (const pc of publishedCourses) {
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, pc.id));

      for (const lesson of lessons) {
        const hasNoBlocks =
          !lesson.contentBlocks ||
          !Array.isArray(lesson.contentBlocks) ||
          (lesson.contentBlocks as any[]).length === 0;

        if (hasNoBlocks) {
          const bodyText = lesson.content && lesson.content.trim().length > 0
            ? lesson.content
            : `Practical operational habits and workplace standards for ${lesson.title}.`;

          const synthesizedBlocks: any[] = [
            {
              id: `c${pc.id}-l${lesson.id || lesson.orderIndex}-b0`,
              type: "heading",
              position: 0,
              headingText: lesson.title,
            },
            {
              id: `c${pc.id}-l${lesson.id || lesson.orderIndex}-b1`,
              type: "short_text",
              position: 1,
              bodyText,
            },
          ];

          await db
            .update(lessonsTable)
            .set({ contentBlocks: synthesizedBlocks })
            .where(eq(lessonsTable.id, lesson.id));

          summary.universalLessonsSynthesized++;
        }
      }
    }
  } catch (err) {
    logger.error({ err }, "Error in universal lesson block synthesis");
  }

  logger.info({ summary }, "ensureCatalogueContentRemediation completed successfully.");
  return summary;
}
