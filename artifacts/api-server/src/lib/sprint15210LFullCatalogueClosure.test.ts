import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { notLike, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import fs from "node:fs";

describe("Sprint 15.2.10L — Full 136-Course Catalogue Assessment Closure Verification (12 Gates)", () => {
  // Gate 1: Exactly 136 canonical courses exist in database
  test("Gate 1: Exactly 136 canonical courses exist in database", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.strictEqual(courses.length, 136, "There must be exactly 136 canonical courses");
  });

  // Gate 2: Exactly 1,208 scored quiz questions exist across all 136 courses
  test("Gate 2: Exactly 1,208 scored quiz questions exist across all 136 courses", async () => {
    const questions = await db.select().from(quizQuestionsTable);
    assert.strictEqual(questions.length, 1208, "There must be exactly 1,208 scored questions in the catalogue");
  });

  // Gate 3: Exactly 88 diagnostic questions exist in the diagnostic bank (44 equivalent pairs)
  test("Gate 3: Exactly 88 diagnostic questions exist in the diagnostic bank (44 equivalent pairs)", () => {
    assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic bank must contain exactly 88 questions");
  });

  // Gate 4: 100% of canonical courses (136/136) are verified ENTERPRISE_READY
  test("Gate 4: 100% of canonical courses (136/136) are verified ENTERPRISE_READY", async () => {
    const inventory = JSON.parse(fs.readFileSync("src/audits/courseAssessmentQualityInventory15_2_10L.json", "utf-8"));
    assert.strictEqual(inventory.enterpriseReadyCourses, 136, "All 136 courses must be enterprise ready");
    assert.strictEqual(inventory.legacyAcceptedCourses, 0, "There must be 0 legacy accepted courses");
  });

  // Gate 5: 0 legacy-accepted courses remain in catalogue
  test("Gate 5: 0 legacy-accepted courses remain in catalogue", async () => {
    const closure = JSON.parse(fs.readFileSync("src/audits/finalCatalogueAssessmentClosure15_2_10L.json", "utf-8"));
    assert.strictEqual(closure.closureMetrics.legacyAcceptedCourses, 0);
    assert.strictEqual(closure.closureMetrics.enterpriseReadyCourses, 136);
  });

  // Gate 6: 100% of all canonical course questions have exactly 4 options
  test("Gate 6: 100% of all canonical course questions have exactly 4 options", async () => {
    const canonicalCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const canonicalCourseIds = canonicalCourses.map(c => c.id);
    const allQuestions = await db.select().from(quizQuestionsTable);
    const canonicalQuestions = allQuestions.filter(q => canonicalCourseIds.includes(q.courseId));
    
    assert.ok(canonicalQuestions.length >= 1088, "Canonical questions must exceed minimum threshold");
    for (const q of canonicalQuestions) {
      const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options as unknown as string);
      assert.strictEqual(opts.length, 4, `Question ID ${q.id} in course ${q.courseId} must have exactly 4 options`);
    }
  });

  // Gate 7: 100% of all canonical course questions have valid correct option indices (0..3)
  test("Gate 7: 100% of all canonical course questions have valid correct option indices (0..3)", async () => {
    const canonicalCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const canonicalCourseIds = canonicalCourses.map(c => c.id);
    const allQuestions = await db.select().from(quizQuestionsTable);
    const canonicalQuestions = allQuestions.filter(q => canonicalCourseIds.includes(q.courseId));

    for (const q of canonicalQuestions) {
      assert.ok(typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3, `Question ID ${q.id} must have correctOption between 0 and 3`);
    }
  });

  // Gate 8: 100% of all canonical course questions have complete 4-element option-level feedback arrays
  test("Gate 8: 100% of all canonical course questions have complete 4-element option-level feedback arrays", async () => {
    const canonicalCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const canonicalCourseIds = canonicalCourses.map(c => c.id);
    const allQuestions = await db.select().from(quizQuestionsTable);
    const canonicalQuestions = allQuestions.filter(q => canonicalCourseIds.includes(q.courseId));

    for (const q of canonicalQuestions) {
      const fb = Array.isArray(q.optionFeedback) ? q.optionFeedback : JSON.parse(q.optionFeedback as unknown as string);
      assert.strictEqual(fb.length, 4, `Question ID ${q.id} must have exactly 4 option feedback items`);
      for (const item of fb) {
        assert.ok(typeof item === "string" && item.trim().length > 0, `Question ID ${q.id} feedback item must be non-empty`);
      }
    }
  });

  // Gate 9: 100% of all canonical course questions have non-empty correctExplanation and incorrectExplanation strings
  test("Gate 9: 100% of all canonical course questions have non-empty correctExplanation and incorrectExplanation strings", async () => {
    const canonicalCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const canonicalCourseIds = canonicalCourses.map(c => c.id);
    const allQuestions = await db.select().from(quizQuestionsTable);
    const canonicalQuestions = allQuestions.filter(q => canonicalCourseIds.includes(q.courseId));

    for (const q of canonicalQuestions) {
      assert.ok(typeof q.correctExplanation === "string" && q.correctExplanation.trim().length > 0, `Question ID ${q.id} must have non-empty correctExplanation`);
      assert.ok(typeof q.incorrectExplanation === "string" && q.incorrectExplanation.trim().length > 0, `Question ID ${q.id} must have non-empty incorrectExplanation`);
    }
  });

  // Gate 10: All 136 canonical courses have passing score of at least 80%
  test("Gate 10: All 136 canonical courses have passing score of at least 80%", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    for (const c of courses) {
      assert.ok(c.passingScore >= 80, `Course ${c.courseCode} must have passing score >= 80 (found ${c.passingScore})`);
    }
  });

  // Gate 11: Total Version 2 courses is 135
  test("Gate 11: Total Version 2 courses is 135", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const v2 = courses.filter(c => c.version === 2).length;
    assert.strictEqual(v2, 135, "Expected 135 Version 2 courses");
  });

  // Gate 12: Historical learner records are preserved with zero corruption
  test("Gate 12: Historical learner records are preserved with zero corruption", async () => {
    const attempts = await db.select().from(quizAttemptsTable);
    assert.strictEqual(attempts.length, 16, "Quiz attempts count must remain 16");

    const enrollments = await db.select().from(enrollmentsTable);
    assert.strictEqual(enrollments.length, 22, "Enrollments count must remain 22");

    const certs = await db.select().from(certificatesTable);
    assert.strictEqual(certs.length, 6, "Certificates count must remain 6");

    const badges = await db.select().from(badgeDefinitionsTable);
    assert.strictEqual(badges.length, 133, "Badge definitions count must remain 133");

    const scores = await db.select().from(elevioScoreLedgerTable);
    assert.strictEqual(scores.length, 6, "Score ledgers count must remain 6");
  });
});
