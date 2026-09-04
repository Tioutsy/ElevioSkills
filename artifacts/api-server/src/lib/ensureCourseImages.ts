/**
 * Sprint 15.2.9 — Course Image Database Updater
 * Ensures all 136 canonical courses have authoritative 16:9 thumbnail URLs set in the database.
 * Purely updates thumbnailUrl — does not alter versions, lessons, questions, scores, or content.
 */

import { db, coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger.js";
import { CANONICAL_COURSE_IMAGE_MANIFEST } from "./courseImageManifest.js";

export async function ensureCourseImages(): Promise<{
  totalChecked: number;
  updated: number;
  alreadyCorrect: number;
}> {
  let updated = 0;
  let alreadyCorrect = 0;

  logger.info({ totalCourses: CANONICAL_COURSE_IMAGE_MANIFEST.length }, "Checking and reconciling canonical course images...");

  // Fetch all existing courses in a single query for maximum speed and zero latency overhead
  const existingCourses = await db
    .select({ id: coursesTable.id, code: coursesTable.courseCode, thumbnailUrl: coursesTable.thumbnailUrl })
    .from(coursesTable);

  const courseMap = new Map(existingCourses.map(c => [c.code, c]));

  for (const record of CANONICAL_COURSE_IMAGE_MANIFEST) {
    const current = courseMap.get(record.courseCode);

    if (!current) {
      logger.warn({ courseCode: record.courseCode }, "Course not found in database during image reconciliation");
      continue;
    }

    if (current.thumbnailUrl === record.imagePath) {
      alreadyCorrect++;
    } else {
      await db
        .update(coursesTable)
        .set({
          thumbnailUrl: record.imagePath,
        })
        .where(eq(coursesTable.courseCode, record.courseCode));
      updated++;
      logger.info({ courseCode: record.courseCode, newThumbnail: record.imagePath }, "Updated course thumbnail to canonical image");
    }
  }

  logger.info(
    { total: CANONICAL_COURSE_IMAGE_MANIFEST.length, updated, alreadyCorrect },
    "Course image reconciliation completed successfully."
  );

  return {
    totalChecked: CANONICAL_COURSE_IMAGE_MANIFEST.length,
    updated,
    alreadyCorrect,
  };
}
