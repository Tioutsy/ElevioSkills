import assert from "node:assert/strict";
import test from "node:test";
import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";
import { ensureSustainabilityPerformanceReviewCourse } from "./ensureSustainabilityPerformanceReviewCourse";

test("Course 19 (ELH-19) Seeding & Integrity Unit Tests", async () => {
  // 1. Initial seed execution
  console.log("- Running Course 19 seeder...");
  await ensureSustainabilityPerformanceReviewCourse();

  // Verify course exists with correct metadata
  const [course] = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.courseCode, "ELH-19"))
    .limit(1);

  assert.ok(course, "Course ELH-19 must exist");
  assert.equal(course.slug, "reviewing-sustainability-performance-and-corrective-action");
  assert.equal(course.passingScore, 80);
  assert.equal(course.status, "published");
  assert.equal(course.title, "Reviewing Sustainability Performance and Taking Corrective Action");

  // Verify exactly 6 lessons
  const lessons = await db
    .select()
    .from(lessonsTable)
    .where(eq(lessonsTable.courseId, course.id));
  assert.equal(lessons.length, 6, "Must have exactly 6 lessons");

  // Verify every lesson has non-empty contentBlocks
  for (const lesson of lessons) {
    assert.ok(
      Array.isArray(lesson.contentBlocks) &&
        lesson.contentBlocks.length > 0,
      `Lesson "${lesson.title}" must have populated contentBlocks`
    );
  }

  // Verify exactly 10 quiz questions
  const quizQuestions = await db
    .select()
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.courseId, course.id));
  assert.equal(
    quizQuestions.length,
    10,
    "Must have exactly 10 quiz questions"
  );

  // Verify badge definition
  const [badge] = await db
    .select()
    .from(badgeDefinitionsTable)
    .where(eq(badgeDefinitionsTable.slug, "sustainability-performance-reviewer"))
    .limit(1);
  assert.ok(badge, "Sustainability Performance Reviewer badge must exist");
  assert.equal(badge.name, "Sustainability Performance Reviewer");

  // Verify system seed marker was recorded
  const [seedMarker] = await db
    .select()
    .from(systemSeedsTable)
    .where(eq(systemSeedsTable.name, "sustainability-performance-review-v2"))
    .limit(1);
  assert.ok(seedMarker, "Seed marker sustainability-performance-review-v2 must be recorded");

  // 2. Idempotency test — run seeder again; counts must not change
  console.log("- Running seeder again for idempotency check...");
  await ensureSustainabilityPerformanceReviewCourse();

  const lessonsRetry = await db
    .select()
    .from(lessonsTable)
    .where(eq(lessonsTable.courseId, course.id));
  assert.equal(
    lessonsRetry.length,
    6,
    "Second run must not duplicate lessons"
  );

  const quizRetry = await db
    .select()
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.courseId, course.id));
  assert.equal(
    quizRetry.length,
    10,
    "Second run must not duplicate quiz questions"
  );

  // 3. Integrity guard check — repair missing questions
  console.log("- Testing integrity guard (deleting quiz questions to trigger repair)...");
  await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, course.id));
  await db.delete(systemSeedsTable).where(eq(systemSeedsTable.name, "sustainability-performance-review-v2"));

  await ensureSustainabilityPerformanceReviewCourse();

  const quizRepaired = await db
    .select()
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.courseId, course.id));
  assert.equal(quizRepaired.length, 10, "Repaired course must contain 10 questions");

  // 4. Dual-row collision guard: when ELH-19 is on "reviewing-sustainability-performance-and-taking-corrective-action"
  // and a separate draft row exists with slug "reviewing-sustainability-performance-and-corrective-action" (0 questions),
  // both rows are preserved without unique slug collision and the draft row receives 6 lessons + 10 balanced questions.
  await db
    .update(coursesTable)
    .set({ slug: "reviewing-sustainability-performance-and-taking-corrective-action" })
    .where(eq(coursesTable.id, course.id));

  const [draftRow] = await db
    .insert(coursesTable)
    .values({
      title: "Reviewing Sustainability Performance and Corrective Action",
      slug: "reviewing-sustainability-performance-and-corrective-action",
      description: "Draft duplicate row",
      categoryId: 2,
      durationMinutes: 20,
      priceUsd: "1400.00",
      level: "intermediate",
      isFeatured: false,
      isPublished: false,
      status: "draft",
    })
    .returning();

  await ensureSustainabilityPerformanceReviewCourse();

  const [updatedDraft] = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.id, draftRow.id))
    .limit(1);
  assert.equal(updatedDraft.isPublished, false, "Duplicate draft row must remain unpublished by default");
  assert.equal(updatedDraft.status, "draft", "Duplicate draft row must remain in draft status");

  const draftLessons = await db
    .select()
    .from(lessonsTable)
    .where(eq(lessonsTable.courseId, draftRow.id));
  assert.equal(draftLessons.length, 6, "Duplicate draft row must be populated with 6 substantive lessons");

  const draftQuiz = await db
    .select()
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.courseId, draftRow.id));
  assert.equal(draftQuiz.length, 10, "Duplicate draft row must be populated with 10 balanced quiz questions");

  // Clean up synthetic duplicate draft row and restore canonical slug on course.id
  await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, draftRow.id));
  await db.delete(lessonsTable).where(eq(lessonsTable.courseId, draftRow.id));
  await db.delete(coursesTable).where(eq(coursesTable.id, draftRow.id));
  await db
    .update(coursesTable)
    .set({ slug: "reviewing-sustainability-performance-and-corrective-action" })
    .where(eq(coursesTable.id, course.id));
});
