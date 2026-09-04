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

  for (const record of CANONICAL_COURSE_IMAGE_MANIFEST) {
    const existing = await db
      .select({ id: coursesTable.id, code: coursesTable.courseCode, thumbnailUrl: coursesTable.thumbnailUrl })
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, record.courseCode))
      .limit(1);

    if (existing.length === 0) {
      logger.warn({ courseCode: record.courseCode }, "Course not found in database during image reconciliation");
      continue;
    }

    const current = existing[0];
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
