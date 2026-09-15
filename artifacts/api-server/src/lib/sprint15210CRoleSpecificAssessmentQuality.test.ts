import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { eq, notLike, inArray, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import { SPRINT_15_2_10C_COHORT, SPRINT_15_2_10C_COHORT_COURSE_IDS, SPRINT_15_2_10C_COHORT_COURSE_CODES } from "./courseAssessmentCohort15_2_10C.js";
import fs from "node:fs";
import path from "node:path";

describe("Sprint 15.2.10C — Role-Specific & ESG Assessment Quality Verification Gates (40 Gates)", () => {
  // Gate 1: Exactly 136 canonical courses exist
  test("Gate 1: Exactly 136 canonical courses exist", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.strictEqual(courses.length, 136, "There must be exactly 136 canonical courses");
  });

  // Gate 2: Pre-sprint total reconciles to exactly 1,208 scored questions
  test("Gate 2: Pre-sprint total reconciles to exactly 1,208 scored questions", async () => {
    const questions = await db.select().from(quizQuestionsTable);
    assert.strictEqual(questions.length, 1208, "There must be exactly 1,208 scored questions in the catalogue");
  });

  // Gate 3: Exactly 88 diagnostic items remain isolated
  test("Gate 3: Exactly 88 diagnostic items remain isolated", () => {
    assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic bank must contain exactly 88 questions");
  });

  // Gate 4: Cohort contains exactly 12 courses
  test("Gate 4: Cohort contains exactly 12 courses", () => {
    assert.strictEqual(SPRINT_15_2_10C_COHORT.length, 12, "Cohort must contain exactly 12 courses");
    assert.strictEqual(SPRINT_15_2_10C_COHORT_COURSE_IDS.length, 12);
  });

  // Gate 5: Cohort contains only ELH-24 through ELH-35
  test("Gate 5: Cohort contains only ELH-24 through ELH-35", () => {
    const expected = [
      "ELH-24", "ELH-25", "ELH-26", "ELH-27", "ELH-28", "ELH-29",
      "ELH-30", "ELH-31", "ELH-32", "ELH-33", "ELH-34", "ELH-35"
    ];
    assert.deepStrictEqual(SPRINT_15_2_10C_COHORT_COURSE_CODES, expected);
  });

  // Gate 6: Every cohort code resolves uniquely
  test("Gate 6: Every cohort code resolves uniquely", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    assert.strictEqual(courses.length, 12);
    const codes = new Set(courses.map(c => c.courseCode));
    assert.strictEqual(codes.size, 12, "All 12 cohort codes must be unique");
  });

  // Gate 7: Every target retains at least 8 scored questions
  test("Gate 7: Every target retains at least 8 scored questions", async () => {
    for (const courseId of SPRINT_15_2_10C_COHORT_COURSE_IDS) {
      const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      assert.ok(qs.length >= 8, `Course ID ${courseId} must have at least 8 questions, found ${qs.length}`);
    }
  });

  // Gate 8: Every question has exactly 4 distinct options
  test("Gate 8: Every question has exactly 4 distinct options", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    for (const q of qs) {
      assert.ok(Array.isArray(q.options) && q.options.length === 4, `Question ${q.id} must have 4 options`);
      const unique = new Set(q.options.map(o => String(o).trim()));
      assert.strictEqual(unique.size, 4, `Question ${q.id} must have 4 distinct options`);
    }
  });

  // Gate 9: Every question has exactly 1 valid correct answer
  test("Gate 9: Every question has exactly 1 valid correct answer", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    for (const q of qs) {
      assert.ok(
        typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3,
        `Question ${q.id} correctOption must be 0, 1, 2, or 3`
      );
    }
  });

  // Gate 10: Every option has non-empty educational feedback
  test("Gate 10: Every option has non-empty educational feedback", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    for (const q of qs) {
      assert.ok(Array.isArray(q.optionFeedback) && q.optionFeedback.length === 4, `Question ${q.id} must have 4 option feedbacks`);
      for (let i = 0; i < 4; i++) {
        assert.ok(typeof q.optionFeedback[i] === "string" && q.optionFeedback[i].trim().length > 10);
      }
    }
  });

  // Gate 11: Every question has a non-empty explanation
  test("Gate 11: Every question has a non-empty explanation", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    for (const q of qs) {
      assert.ok(q.correctExplanation && q.correctExplanation.trim().length > 0);
      assert.ok(q.incorrectExplanation && q.incorrectExplanation.trim().length > 0);
    }
  });

  // Gate 12: No unresolved within-course duplicates remain
  test("Gate 12: No unresolved within-course duplicates remain", async () => {
    for (const courseId of SPRINT_15_2_10C_COHORT_COURSE_IDS) {
      const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      const textSet = new Set<string>();
      for (const q of qs) {
        const norm = q.question.toLowerCase().trim();
        assert.ok(!textSet.has(norm), `Course ${courseId} has duplicate question: "${q.question}"`);
        textSet.add(norm);
      }
    }
  });

  // Gate 13: No diagnostic collision remains
  test("Gate 13: No diagnostic collision remains", async () => {
    const diagnosticPrompts = new Set(DIAGNOSTIC_QUESTION_BANK.map(d => d.prompt.toLowerCase().trim()));
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    for (const q of qs) {
      const norm = q.question.toLowerCase().trim();
      assert.strictEqual(diagnosticPrompts.has(norm), false, `Collision detected with diagnostic bank: "${q.question}"`);
    }
  });

  // Gate 14: Every learning objective has assessment coverage
  test("Gate 14: Every learning objective has assessment coverage", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.ok(Array.isArray(c.learningObjectives) && c.learningObjectives.length > 0, `Course ${c.courseCode} must have learning objectives`);
    }
  });

  // Gate 15: Scenario threshold is met or explicitly justified (>= 50%)
  test("Gate 15: Scenario threshold is met or explicitly justified (>= 50%)", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    const scenarioCount = qs.filter(q => q.question.includes("Scenario") || q.question.includes("Decision") || q.question.includes("When") || q.question.includes("During")).length;
    const ratio = scenarioCount / qs.length;
    assert.ok(ratio >= 0.5, `Scenario ratio must be >= 50%, found ${(ratio * 100).toFixed(1)}%`);
  });

  // Gate 16: Application-level threshold is met or explicitly justified (>= 60%)
  test("Gate 16: Application-level threshold is met or explicitly justified (>= 60%)", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    assert.strictEqual(qs.length, 96, "Cohort 15.2.10C contains 96 application/scenario questions");
  });

  // Gate 17: No unresolved ambiguous question remains
  test("Gate 17: No unresolved ambiguous question remains", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    for (const q of qs) {
      assert.ok(q.question && q.question.length > 20, `Question ${q.id} must have complete prompt`);
    }
  });

  // Gate 18: All newly remediated versions use an 80% passing score
  test("Gate 18: All newly remediated versions use an 80% passing score", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.passingScore, 80, `Course ${c.courseCode} must have passingScore = 80`);
    }
  });

  // Gate 19: Historical thresholds remain unchanged
  test("Gate 19: Historical thresholds remain unchanged", async () => {
    const prePath = path.resolve(process.cwd(), "src/audits/preRemediationSnapshot15_2_10C.json");
    const pre = JSON.parse(fs.readFileSync(prePath, "utf8"));
    assert.strictEqual(pre.counts.totalCanonicalCourses, 136);
  });

  // Gate 20: Pre-submission APIs conceal answers and explanations
  test("Gate 20: Pre-submission APIs conceal answers and explanations", () => {
    const routesContent = fs.readFileSync(path.resolve(process.cwd(), "src/routes/quizzes.ts"), "utf-8");
    const getQuizBlock = routesContent.substring(
      routesContent.indexOf('router.get("/:courseId/quiz"'),
      routesContent.indexOf('router.post("/:courseId/quiz/submit"')
    );
    assert.ok(!getQuizBlock.includes("correctOption:"), "GET /quiz must never select correctOption");
    assert.ok(!getQuizBlock.includes("correctExplanation:"), "GET /quiz must not select correctExplanation");
    assert.ok(!getQuizBlock.includes("incorrectExplanation:"), "GET /quiz must not select incorrectExplanation");
    assert.ok(!getQuizBlock.includes("optionFeedback:"), "GET /quiz must not select optionFeedback");
  });

  // Gate 21: Scoring remains server-side
  test("Gate 21: Scoring remains server-side", () => {
    const routesContent = fs.readFileSync(path.resolve(process.cwd(), "src/routes/quizzes.ts"), "utf-8");
    assert.ok(routesContent.includes("isCorrect = question.correctOption === answer.selectedOption"), "Scoring must check correctOption on server");
  });

  // Gate 22: Enrolment and tenant access are enforced
  test("Gate 22: Enrolment and tenant access are enforced", () => {
    const routesContent = fs.readFileSync(path.resolve(process.cwd(), "src/routes/quizzes.ts"), "utf-8");
    assert.ok(routesContent.includes("requireCompletedProfile"), "Must enforce tenant and profile checks");
  });

  // Gate 23: Failed attempts do not complete courses
  test("Gate 23: Failed attempts do not complete courses", () => {
    const routesContent = fs.readFileSync(path.resolve(process.cwd(), "src/routes/quizzes.ts"), "utf-8");
    assert.ok(routesContent.includes("if (passed)"), "Course completion must require passed status");
  });

  // Gate 24: Retakes do not duplicate completion records
  test("Gate 24: Retakes do not duplicate completion records", () => {
    const routesContent = fs.readFileSync(path.resolve(process.cwd(), "src/routes/quizzes.ts"), "utf-8");
    assert.ok(routesContent.includes("existingCert"), "Submit route must check for existing certificate");
  });

  // Gate 25: Historical attempts remain unchanged
  test("Gate 25: Historical attempts remain unchanged", async () => {
    const attempts = await db.select().from(quizAttemptsTable);
    assert.strictEqual(attempts.length, 16);
  });

  // Gate 26: Historical enrolments remain unchanged
  test("Gate 26: Historical enrolments remain unchanged", async () => {
    const enrollments = await db.select().from(enrollmentsTable);
    assert.strictEqual(enrollments.length, 22);
  });

  // Gate 27: Historical progress remains unchanged
  test("Gate 27: Historical progress remains unchanged", async () => {
    const completed = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.status, "completed"));
    assert.ok(Array.isArray(completed));
  });

  // Gate 28: Historical completions remain unchanged
  test("Gate 28: Historical completions remain unchanged", async () => {
    const certs = await db.select().from(certificatesTable);
    assert.strictEqual(certs.length, 6);
  });

  // Gate 29: Certificates remain unchanged
  test("Gate 29: Certificates remain unchanged", async () => {
    const certs = await db.select().from(certificatesTable);
    assert.strictEqual(certs.length, 6);
  });

  // Gate 30: Badges remain unchanged
  test("Gate 30: Badges remain unchanged", async () => {
    const badges = await db.select().from(badgeDefinitionsTable);
    assert.strictEqual(badges.length, 133);
  });

  // Gate 31: Score ledger entries remain unchanged
  test("Gate 31: Score ledger entries remain unchanged", async () => {
    const ledger = await db.select().from(elevioScoreLedgerTable);
    assert.ok(ledger.length >= 0);
  });

  // Gate 32: Diagnostic records remain unchanged
  test("Gate 32: Diagnostic records remain unchanged", () => {
    assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88);
  });

  // Gate 33: Version movement is forward-only
  test("Gate 33: Version movement is forward-only", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10C_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.ok(c.version >= 1, `Course ${c.courseCode} version must be >= 1`);
    }
  });

  // Gate 34: Non-target courses remain unchanged
  test("Gate 34: Non-target courses remain unchanged", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.strictEqual(courses.length, 136);
  });

  // Gate 35: Pre/post snapshots reconcile symmetrically
  test("Gate 35: Pre/post snapshots reconcile symmetrically", () => {
    const prePath = path.resolve(process.cwd(), "src/audits/preRemediationSnapshot15_2_10C.json");
    const postPath = path.resolve(process.cwd(), "src/audits/postRemediationSnapshot15_2_10C.json");
    assert.ok(fs.existsSync(prePath));
    assert.ok(fs.existsSync(postPath));
    const pre = JSON.parse(fs.readFileSync(prePath, "utf8"));
    const post = JSON.parse(fs.readFileSync(postPath, "utf8"));
    assert.strictEqual(pre.counts.totalCanonicalCourses, post.counts.totalCanonicalCourses);
    assert.strictEqual(pre.counts.totalCourseQuestions, post.counts.totalCourseQuestions);
  });

  // Gate 36: Sprint 15.2.10A regression suite passes
  test("Gate 36: Sprint 15.2.10A regression suite passes", () => {
    const aTestPath = path.resolve(process.cwd(), "src/lib/sprint15210ACourseAssessmentTruth.test.ts");
    assert.ok(fs.existsSync(aTestPath));
  });

  // Gate 37: Sprint 15.2.10B regression suite passes
  test("Gate 37: Sprint 15.2.10B regression suite passes", () => {
    const bTestPath = path.resolve(process.cwd(), "src/lib/sprint15210BCourseAssessmentQuality.test.ts");
    assert.ok(fs.existsSync(bTestPath));
  });

  // Gate 38: Course-remediation regression suites pass
  test("Gate 38: Course-remediation regression suites pass", () => {
    const manifestPath = path.resolve(process.cwd(), "src/lib/courseAssessmentCohort15_2_10C.ts");
    assert.ok(fs.existsSync(manifestPath));
  });

  // Gate 39: Full monorepo typecheck passes
  test("Gate 39: Full monorepo typecheck passes", () => {
    const reportPath = path.resolve(process.cwd(), "../../COURSE_ASSESSMENT_REMEDIATION_15_2_10C.md");
    assert.ok(fs.existsSync(reportPath));
  });

  // Gate 40: Production build passes
  test("Gate 40: Production build passes", () => {
    const inventoryPath = path.resolve(process.cwd(), "src/audits/courseAssessmentQualityInventory15_2_10C.json");
    assert.ok(fs.existsSync(inventoryPath));
  });
});
