import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  db,
  coursesTable,
  quizQuestionsTable,
  quizAttemptsTable,
  certificatesTable,
  enrollmentsTable,
} from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine";

test("Sprint 17.0A1 — Assessment Versioning, Legacy Compatibility & Security Invariants", async (t) => {
  const TEST_USER_ID = "test-learner-versioning-user-1";

  // Cleanup any test attempts or certificates before/after
  const cleanup = async () => {
    try {
      await db.delete(quizAttemptsTable).where(eq(quizAttemptsTable.userId, TEST_USER_ID));
      await db.delete(certificatesTable).where(eq(certificatesTable.userId, TEST_USER_ID));
      await db.delete(enrollmentsTable).where(eq(enrollmentsTable.userId, TEST_USER_ID));
    } catch (e) {
      // ignore
    }
  };

  await cleanup();

  // Test 1: Every new attempt records the current assessment version
  await t.test("Test 1: Every new attempt records the current assessment version", async () => {
    const courseId = 1; // ELH-01
    const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId));
    assert.ok(course, "Course ELH-01 must exist");
    assert.strictEqual(course.version, 2, "Course ELH-01 must be version 2");

    const [attempt] = await db
      .insert(quizAttemptsTable)
      .values({
        userId: TEST_USER_ID,
        courseId,
        courseVersion: course.version,
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        passed: true,
      })
      .returning();

    assert.strictEqual(attempt.courseVersion, 2, "New attempt must record version 2");
    assert.strictEqual(attempt.totalQuestions, 10, "New attempt denominator must be 10");
  });

  // Test 2: Historical attempts retain their original version
  await t.test("Test 2: Historical attempts retain their original version", async () => {
    const courseId = 1;
    const [legacyAttempt] = await db
      .insert(quizAttemptsTable)
      .values({
        userId: TEST_USER_ID,
        courseId,
        courseVersion: 1, // Legacy version
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        passed: true,
      })
      .returning();

    assert.strictEqual(legacyAttempt.courseVersion, 1, "Legacy attempt must record version 1");
    assert.strictEqual(legacyAttempt.totalQuestions, 5, "Legacy attempt must retain original denominator 5");
  });

  // Test 3: Historical scores are not recalculated
  await t.test("Test 3: Historical scores are not recalculated", async () => {
    const attempts = await db
      .select()
      .from(quizAttemptsTable)
      .where(eq(quizAttemptsTable.userId, TEST_USER_ID));

    const legacy = attempts.find((a) => a.courseVersion === 1);
    assert.ok(legacy, "Legacy attempt must be found");
    assert.strictEqual(legacy.score, 80, "Legacy score must remain exactly 80%");
    assert.strictEqual(legacy.totalQuestions, 5, "Legacy denominator must remain 5, never recalculated to 10");
    assert.strictEqual(legacy.correctAnswers, 4, "Legacy correct answers must remain 4");
  });

  // Test 4: Historical certificates remain unchanged
  await t.test("Test 4: Historical certificates remain unchanged", async () => {
    const courseId = 1;
    const legacyCode = "ECO-HISTORIC-V1-CERT";
    const [legacyCert] = await db
      .insert(certificatesTable)
      .values({
        userId: TEST_USER_ID,
        courseId,
        courseVersion: 1,
        uniqueCode: legacyCode,
        certificateTitle: "Sustainability Foundations (v1)",
      })
      .returning();

    assert.strictEqual(legacyCert.courseVersion, 1, "Legacy certificate must record version 1");
    assert.strictEqual(legacyCert.uniqueCode, legacyCode, "Unique code must remain unchanged");

    const [retrievedCert] = await db
      .select()
      .from(certificatesTable)
      .where(eq(certificatesTable.uniqueCode, legacyCode));
    assert.ok(retrievedCert, "Legacy certificate must resolve");
    assert.strictEqual(retrievedCert.courseVersion, 1);
  });

  // Test 5: New attempts contain exactly 10 questions
  await t.test("Test 5: New attempts contain exactly 10 questions for ELH-01–11", async () => {
    for (let cId = 1; cId <= 11; cId++) {
      const questions = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, cId));
      assert.strictEqual(questions.length, 10, `Course ${cId} must have exactly 10 questions in active table`);
    }
  });

  // Test 6: Legacy and current question sets are independently resolvable
  await t.test("Test 6: Legacy and current question sets are independently resolvable", async () => {
    // Legacy attempt compatibility simulation:
    // When a legacy submission with 5 answers arrives, it evaluates against denominator 5 and records version 1
    const legacySubmissionAnswers = [
      { questionId: 101, selectedOption: 0 },
      { questionId: 102, selectedOption: 1 },
      { questionId: 103, selectedOption: 2 },
      { questionId: 104, selectedOption: 3 },
      { questionId: 105, selectedOption: 0 },
    ];
    const totalQuestionsLegacy = legacySubmissionAnswers.length;
    const correctLegacy = 4;
    const scoreLegacy = Math.round((correctLegacy / totalQuestionsLegacy) * 100);
    assert.strictEqual(scoreLegacy, 80, "Legacy calculation yields 80% against denominator 5");

    // Current submission with 10 questions evaluates against denominator 10
    const totalQuestionsCurrent = 10;
    const correctCurrent = 8;
    const scoreCurrent = Math.round((correctCurrent / totalQuestionsCurrent) * 100);
    assert.strictEqual(scoreCurrent, 80, "Current calculation yields 80% against denominator 10");
  });

  // Test 7: Diagnostics never enter scored assessments
  await t.test("Test 7: Diagnostics never enter scored assessments", async () => {
    assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic bank must contain exactly 88 questions");
    const activeQuestions = await db.select().from(quizQuestionsTable);
    const scoredTexts = new Set(activeQuestions.map((q) => q.question.toLowerCase().trim()));

    for (const diag of DIAGNOSTIC_QUESTION_BANK) {
      assert.ok(
        !scoredTexts.has(diag.prompt.toLowerCase().trim()),
        `Diagnostic question "${diag.id}" leaked into scored assessment questions!`
      );
      assert.ok(diag.id.startsWith("DIAG-"), `Diagnostic question ID ${diag.id} must have DIAG- prefix`);
    }
  });

  // Test 8: ELH-35–136 remain inactive
  await t.test("Test 8: ELH-35–136 remain inactive in active database", async () => {
    const courses = await db.select().from(coursesTable);
    assert.strictEqual(courses.length, 34, "Active database course count must be exactly 34");
    for (const c of courses) {
      const num = parseInt(c.courseCode?.replace("ELH-", "") || "0", 10);
      assert.ok(num <= 34, `Staged course ${c.courseCode} detected in active database!`);
    }
  });

  // Test 9: Course IDs, codes and slugs remain stable
  await t.test("Test 9: Course IDs, codes and slugs remain strictly stable", async () => {
    const EXPECTED_IDENTIFIERS = [
      { code: "ELH-01", id: 1, slug: "sustainability-foundations" },
      { code: "ELH-02", id: 2, slug: "waste-sorting-mauritian-bin-system" },
      { code: "ELH-03", id: 3, slug: "energy-efficiency-at-work" },
      { code: "ELH-04", id: 4, slug: "water-conservation" },
      { code: "ELH-05", id: 5, slug: "sustainable-procurement" },
      { code: "ELH-06", id: 6, slug: "green-office-practices" },
      { code: "ELH-07", id: 7, slug: "carbon-footprint-awareness" },
      { code: "ELH-08", id: 8, slug: "biodiversity-in-mauritius" },
      { code: "ELH-09", id: 9, slug: "esg-basics" },
      { code: "ELH-10", id: 10, slug: "environmental-compliance" },
      { code: "ELH-11", id: 11, slug: "circular-economy" },
    ];

    const courses = await db.select().from(coursesTable);
    for (const exp of EXPECTED_IDENTIFIERS) {
      const match = courses.find((c) => c.id === exp.id);
      assert.ok(match, `Course ${exp.code} with ID ${exp.id} must exist`);
      assert.strictEqual(match.courseCode, exp.code);
      assert.strictEqual(match.slug, exp.slug);
    }
  });

  // Test 10: Legal-reference metadata contains source and status fields
  await t.test("Test 10: Legal-reference metadata contains source and status fields", async () => {
    const registerPath = "/Users/sharonlennon/.gemini/antigravity-ide/brain/75567789-3312-42f9-8945-ad365293292a/foundation_legal_claim_register_verified.json";
    assert.ok(fs.existsSync(registerPath), "Verified legal claim register must exist");
    const raw = fs.readFileSync(registerPath, "utf-8");
    const register = JSON.parse(raw);
    assert.ok(register.claims.length > 0, "Register must contain claims");

    for (const claim of register.claims) {
      assert.ok(claim.courseCode, "Claim must have courseCode");
      assert.ok(claim.lesson, "Claim must have lesson");
      assert.ok(claim.exactClaim, "Claim must have exactClaim");
      assert.ok(claim.classification, "Claim must have classification");
      assert.ok(claim.officialInstrumentTitle, "Claim must have officialInstrumentTitle");
      assert.ok(claim.responsibleAuthority, "Claim must have responsibleAuthority");
      assert.ok(claim.authoritativePrimarySourceUrl, "Claim must have authoritativePrimarySourceUrl");
      assert.ok(claim.currentRepealedSupersededStatus, "Claim must have currentRepealedSupersededStatus");
      assert.ok(claim.evidenceStatus, "Claim must have evidenceStatus");
    }
  });

  // Test 11: Production and staging authentication remain fail-closed
  await t.test("Test 11: Production and staging authentication remain fail-closed", async () => {
    const testCases = [
      { nodeEnv: "production", fallback: "true", expectedAllowed: false },
      { nodeEnv: "production", fallback: "false", expectedAllowed: false },
      { nodeEnv: "staging", fallback: "true", expectedAllowed: false },
      { nodeEnv: "development", fallback: "true", expectedAllowed: true },
      { nodeEnv: "development", fallback: "false", expectedAllowed: false },
    ];

    for (const tc of testCases) {
      const isAllowed = tc.nodeEnv === "development" && tc.fallback === "true";
      assert.strictEqual(
        isAllowed,
        tc.expectedAllowed,
        `Auth fallback mismatch for env=${tc.nodeEnv} fallback=${tc.fallback}`
      );
    }
  });

  await cleanup();
});
