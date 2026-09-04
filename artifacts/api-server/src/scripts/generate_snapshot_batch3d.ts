import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { inArray, eq, notLike } from "drizzle-orm";
import * as fs from "node:fs";
import * as crypto from "node:crypto";
import { CANONICAL_BATCH_3_REGISTER } from "../lib/canonicalBatch3Register";

const WAVE_3D_CODES = [
  "ELH-80", "ELH-81", "ELH-82", "ELH-84", "ELH-85", "ELH-86",
  "ELH-88", "ELH-89", "ELH-90", "ELH-91", "ELH-92", "ELH-93",
  "ELH-94", "ELH-95", "ELH-96", "ELH-100", "ELH-101", "ELH-102"
];

async function main() {
  console.log("Generating Pre-Remediation Snapshot for Batch 3D...");

  const allCourses = await db
    .select()
    .from(coursesTable)
    .where(notLike(coursesTable.courseCode, "TEST-%"));

  const v2Count = allCourses.filter((c) => (c.version ?? 1) >= 2).length;
  const v1Count = allCourses.filter((c) => (c.version ?? 1) === 1).length;

  console.log(`Preflight Total Courses: ${allCourses.length}`);
  console.log(`Preflight Version 2: ${v2Count}`);
  console.log(`Preflight Version 1: ${v1Count}`);

  if (allCourses.length !== 136 || v2Count !== 71 || v1Count !== 65) {
    throw new Error(`Preflight accounting mismatch! Expected 136 total (71 v2, 65 v1), got ${allCourses.length} (v2: ${v2Count}, v1: ${v1Count})`);
  }

  const targets = [];

  for (const code of WAVE_3D_CODES) {
    const course = allCourses.find((c) => c.courseCode === code);
    if (!course) {
      throw new Error(`Target course ${code} not found in database!`);
    }

    if ((course.version ?? 1) !== 1) {
      throw new Error(`Target course ${code} is already at version ${course.version}! Must be version 1.`);
    }

    const lessons = await db
      .select()
      .from(lessonsTable)
      .where(eq(lessonsTable.courseId, course.id));

    const questions = await db
      .select()
      .from(quizQuestionsTable)
      .where(eq(quizQuestionsTable.courseId, course.id));

    const contentForHash = JSON.stringify({
      courseCode: course.courseCode,
      title: course.title,
      slug: course.slug,
      description: course.description,
      version: course.version,
      lessons: lessons.map((l) => ({
        title: l.title,
        orderIndex: l.orderIndex,
        content: l.content,
        blocks: l.contentBlocks,
      })),
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
      })),
    });

    const hash = crypto.createHash("sha256").update(contentForHash).digest("hex");

    targets.push({
      id: course.id,
      courseCode: course.courseCode,
      title: course.title,
      version: course.version ?? 1,
      level: course.level,
      categoryId: course.categoryId,
      lessonCount: lessons.length,
      questionCount: questions.length,
      beforeChecksum: hash,
    });
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    totalCanonicalCourses: allCourses.length,
    v2Count,
    v1Count,
    batch: "Batch 3D",
    targetCount: targets.length,
    targets,
  };

  const outputPath = "src/lib/preRemediationSnapshotBatch3D.json";
  fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));
  console.log(`Successfully generated ${outputPath} with ${targets.length} targets.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
