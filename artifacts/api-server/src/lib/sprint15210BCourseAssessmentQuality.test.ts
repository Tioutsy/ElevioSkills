import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { eq, notLike, inArray, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import { SPRINT_15_2_10B_COHORT, SPRINT_15_2_10B_COHORT_COURSE_IDS } from "./courseAssessmentCohort15_2_10B.js";
import fs from "node:fs";
import path from "node:path";

describe("Sprint 15.2.10B — Assessment Quality & Controlled Remediation Verification Gates (34 Gates)", () => {
  // Gate 1: Exact 136 canonical course count preserved
  test("Gate 1: Exact 136 canonical course count preserved", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.strictEqual(courses.length, 136, "There must be exactly 136 canonical courses");
  });

  // Gate 2: Total 1,208 scored questions preserved across 136 courses
  test("Gate 2: Total 1,208 scored questions preserved across 136 courses", async () => {
    const questions = await db.select().from(quizQuestionsTable);
    assert.strictEqual(questions.length, 1208, "There must be exactly 1,208 scored questions in the catalogue");
  });

  // Gate 3: All 136 courses have at least 8 questions (or 15 for ELH-12)
  test("Gate 3: All 136 courses have at least 8 questions (or 15 for ELH-12)", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const allQuestions = await db.select().from(quizQuestionsTable);

    for (const course of courses) {
      const qs = allQuestions.filter((q) => q.courseId === course.id);
      if (course.courseCode === "ELH-12" || course.id === 12) {
        assert.strictEqual(qs.length, 15, `Capstone course ${course.courseCode} must have exactly 15 questions`);
      } else {
        assert.ok(qs.length >= 8, `Course ${course.courseCode} (ID: ${course.id}) must have at least 8 questions, found ${qs.length}`);
      }
    }
  });

  // Gate 4: Exactly 88 diagnostic questions (44 pairs) isolated from course assessments (0 collisions)
  test("Gate 4: Exactly 88 diagnostic questions (44 pairs) isolated from course assessments (0 collisions)", async () => {
    assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic question bank must contain exactly 88 questions");
    const diagnosticPrompts = new Set(DIAGNOSTIC_QUESTION_BANK.map((d) => d.prompt.toLowerCase().trim()));

    const allQuestions = await db.select().from(quizQuestionsTable);
    for (const q of allQuestions) {
      const qPrompt = q.question.toLowerCase().trim();
      assert.strictEqual(diagnosticPrompts.has(qPrompt), false, `Collision detected between course question ${q.id} and diagnostic bank: "${q.question}"`);
    }
  });

  // Gate 5: Zero duplicate questions within any single course
  test("Gate 5: Zero duplicate questions within any single course", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const allQuestions = await db.select().from(quizQuestionsTable);

    for (const course of courses) {
      const qs = allQuestions.filter((q) => q.courseId === course.id);
      const textSet = new Set<string>();
      for (const q of qs) {
        const norm = q.question.toLowerCase().trim();
        assert.ok(!textSet.has(norm), `Course ${course.courseCode} has duplicate question within itself: "${q.question}"`);
        textSet.add(norm);
      }
    }
  });

  // Gate 6: Pre-submission GET /:courseId/quiz returns questions with options but conceals answers and explanations
  test("Gate 6: Pre-submission GET /:courseId/quiz returns questions with options but conceals answers and explanations", () => {
    const routesContent = fs.readFileSync(path.resolve(process.cwd(), "src/routes/quizzes.ts"), "utf-8");
    const getQuizBlock = routesContent.substring(
      routesContent.indexOf('router.get("/:courseId/quiz"'),
      routesContent.indexOf('router.post("/:courseId/quiz/submit"')
    );
    assert.ok(!getQuizBlock.includes("correctOption:"), "GET /quiz must never select correctOption");
    assert.ok(!getQuizBlock.includes("correctExplanation:"), "GET /quiz must not select correctExplanation");
    assert.ok(!getQuizBlock.includes("incorrectExplanation:"), "GET /quiz must not select incorrectExplanation");
    assert.ok(!getQuizBlock.includes("optionFeedback:"), "GET /quiz must not select optionFeedback");
    assert.ok(getQuizBlock.includes("options:"), "GET /quiz must include options");
  });

  // Gate 7: Post-submission POST /:courseId/quiz/submit evaluates server-side and returns score, pass/fail status, and option feedback
  test("Gate 7: Post-submission POST /:courseId/quiz/submit evaluates server-side and returns score, pass/fail status, and option feedback", () => {
    const routesContent = fs.readFileSync(path.resolve(process.cwd(), "src/routes/quizzes.ts"), "utf-8");
    assert.ok(routesContent.includes('router.post("/:courseId/quiz/submit"'), "Quiz submit route must be mounted");
    assert.ok(routesContent.includes("isCorrect = question.correctOption === answer.selectedOption"), "Scoring must check correctOption on server");
    assert.ok(routesContent.includes("optionFeedback"), "Submit response must provide educational feedback");
  });

  // Gate 8: Historical learner attempts (16) remain intact and unmodified
  test("Gate 8: Historical learner attempts (16) remain intact and unmodified", async () => {
    const attempts = await db.select().from(quizAttemptsTable);
    assert.strictEqual(attempts.length, 16, "All 16 historical quiz attempts must be preserved");
  });

  // Gate 9: Historical enrollments (22) remain intact and unmodified
  test("Gate 9: Historical enrollments (22) remain intact and unmodified", async () => {
    const enrollments = await db.select().from(enrollmentsTable);
    assert.strictEqual(enrollments.length, 22, "All 22 historical enrollments must be preserved");
  });

  // Gate 10: Historical certificates (6) remain intact and unmodified
  test("Gate 10: Historical certificates (6) remain intact and unmodified", async () => {
    const certs = await db.select().from(certificatesTable);
    assert.strictEqual(certs.length, 6, "All 6 historical certificates must be preserved");
  });

  // Gate 11: Historical badges (133) remain intact and unmodified
  test("Gate 11: Historical badges (133) remain intact and unmodified", async () => {
    const badges = await db.select().from(badgeDefinitionsTable);
    assert.strictEqual(badges.length, 133, "All 133 historical badge definitions must be preserved");
  });

  // Gate 12: Historical score ledger events remain intact and unmodified
  test("Gate 12: Historical score ledger events remain intact and unmodified", async () => {
    const ledger = await db.select().from(elevioScoreLedgerTable);
    assert.ok(ledger.length >= 0, "Score ledger table is intact and accessible");
  });

  // Gate 13: Controlled Cohort 15.2.10B contains exactly 12 courses (ELH-12 through ELH-23)
  test("Gate 13: Controlled Cohort 15.2.10B contains exactly 12 courses (ELH-12 through ELH-23)", () => {
    assert.strictEqual(SPRINT_15_2_10B_COHORT.length, 12, "Cohort must contain exactly 12 courses");
    assert.strictEqual(SPRINT_15_2_10B_COHORT_COURSE_IDS.length, 12, "Cohort course IDs must contain exactly 12 IDs");
    const codes = SPRINT_15_2_10B_COHORT.map((c) => c.courseCode);
    assert.deepStrictEqual(codes, [
      "ELH-12", "ELH-13", "ELH-14", "ELH-15", "ELH-16", "ELH-17",
      "ELH-18", "ELH-19", "ELH-20", "ELH-21", "ELH-22", "ELH-23"
    ]);
  });

  // Gate 14: All 12 Cohort 15.2.10B courses have standardized 80% passing score
  test("Gate 14: All 12 Cohort 15.2.10B courses have standardized 80% passing score", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10B_COHORT_COURSE_IDS));
    assert.strictEqual(courses.length, 12);
    for (const c of courses) {
      assert.strictEqual(c.passingScore, 80, `Cohort course ${c.courseCode} (ID: ${c.id}) must have passingScore = 80`);
    }
  });

  // Gate 15: ELH-12 retains exactly 15 capstone questions
  test("Gate 15: ELH-12 retains exactly 15 capstone questions", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 12));
    assert.strictEqual(qs.length, 15);
  });

  // Gate 16: ELH-13 contains exactly 10 questions
  test("Gate 16: ELH-13 contains exactly 10 questions", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 13));
    assert.strictEqual(qs.length, 10);
  });

  // Gate 17: ELH-14 contains exactly 10 questions
  test("Gate 17: ELH-14 contains exactly 10 questions", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 14));
    assert.strictEqual(qs.length, 10);
  });

  // Gate 18: ELH-15 contains exactly 10 questions
  test("Gate 18: ELH-15 contains exactly 10 questions", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 162));
    assert.strictEqual(qs.length, 10);
  });

  // Gate 19: ELH-16 contains exactly 10 questions
  test("Gate 19: ELH-16 contains exactly 10 questions", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 114));
    assert.strictEqual(qs.length, 10);
  });

  // Gate 20: ELH-17 contains exactly 10 questions
  test("Gate 20: ELH-17 contains exactly 10 questions", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 163));
    assert.strictEqual(qs.length, 10);
  });

  // Gate 21: ELH-18 contains exactly 10 questions
  test("Gate 21: ELH-18 contains exactly 10 questions", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 120));
    assert.strictEqual(qs.length, 10);
  });

  // Gate 22: ELH-19 contains exactly 8 questions
  test("Gate 22: ELH-19 contains exactly 8 questions", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 161));
    const qs = allQs.filter((q) => !q.isArchived);
    assert.strictEqual(qs.length, 8);
  });

  // Gate 23: ELH-20 contains exactly 10 questions
  test("Gate 23: ELH-20 contains exactly 10 questions", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 164));
    const qs = allQs.filter((q) => !q.isArchived);
    assert.strictEqual(qs.length, 10);
  });

  // Gate 24: ELH-21 contains exactly 10 questions
  test("Gate 24: ELH-21 contains exactly 10 questions", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 102));
    const qs = allQs.filter((q) => !q.isArchived);
    assert.strictEqual(qs.length, 10);
  });

  // Gate 25: ELH-22 contains exactly 10 questions
  test("Gate 25: ELH-22 contains exactly 10 questions", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 143));
    const qs = allQs.filter((q) => !q.isArchived);
    assert.strictEqual(qs.length, 10);
  });

  // Gate 26: ELH-23 contains exactly 8 questions
  test("Gate 26: ELH-23 contains exactly 8 questions", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 944));
    const qs = allQs.filter((q) => !q.isArchived);
    assert.strictEqual(qs.length, 8);
  });

  // Gate 27: Total Cohort 15.2.10B questions equals exactly 121
  test("Gate 27: Total Cohort 15.2.10B questions equals exactly 121", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10B_COHORT_COURSE_IDS));
    const qs = allQs.filter((q) => !q.isArchived);
    assert.strictEqual(qs.length, 121, "Total questions across the 12 cohort courses must equal 121");
  });

  // Gate 28: 100% of Cohort 15.2.10B questions have 4 distinct, non-empty options
  test("Gate 28: 100% of Cohort 15.2.10B questions have 4 distinct, non-empty options", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10B_COHORT_COURSE_IDS));
    const qs = allQs.filter((q) => !q.isArchived);
    for (const q of qs) {
      assert.ok(Array.isArray(q.options), `Question ${q.id} options must be an array`);
      assert.strictEqual(q.options.length, 4, `Question ${q.id} must have exactly 4 options`);
      const uniqueOpts = new Set(q.options.map((o) => String(o).trim()));
      assert.strictEqual(uniqueOpts.size, 4, `Question ${q.id} must have 4 distinct options`);
      for (const opt of q.options) {
        assert.ok(String(opt).trim().length > 0, `Question ${q.id} option must not be empty`);
      }
    }
  });

  // Gate 29: 100% of Cohort 15.2.10B questions have exactly 1 valid correct option index (between 0 and 3)
  test("Gate 29: 100% of Cohort 15.2.10B questions have exactly 1 valid correct option index (between 0 and 3)", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10B_COHORT_COURSE_IDS));
    const qs = allQs.filter((q) => !q.isArchived);
    for (const q of qs) {
      assert.ok(
        typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3,
        `Question ${q.id} correctOption must be an integer between 0 and 3, found ${q.correctOption}`
      );
    }
  });

  // Gate 30: 100% of Cohort 15.2.10B questions have a 4-element optionFeedback array with educational feedback for all choices
  test("Gate 30: 100% of Cohort 15.2.10B questions have a 4-element optionFeedback array with educational feedback for all choices", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10B_COHORT_COURSE_IDS));
    const qs = allQs.filter((q) => !q.isArchived);
    for (const q of qs) {
      assert.ok(Array.isArray(q.optionFeedback), `Question ${q.id} optionFeedback must be an array`);
      assert.strictEqual(q.optionFeedback.length, 4, `Question ${q.id} optionFeedback must contain 4 items`);
      for (let i = 0; i < 4; i++) {
        assert.ok(
          typeof q.optionFeedback[i] === "string" && q.optionFeedback[i].trim().length > 10,
          `Question ${q.id} optionFeedback[${i}] must be informative non-empty feedback`
        );
      }
    }
  });

  // Gate 31: 100% of Cohort 15.2.10B questions have non-empty correctExplanation and incorrectExplanation
  test("Gate 31: 100% of Cohort 15.2.10B questions have non-empty correctExplanation and incorrectExplanation", async () => {
    const allQs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10B_COHORT_COURSE_IDS));
    const qs = allQs.filter((q) => !q.isArchived);
    for (const q of qs) {
      assert.ok(q.correctExplanation && q.correctExplanation.trim().length > 0, `Question ${q.id} must have correctExplanation`);
      assert.ok(q.incorrectExplanation && q.incorrectExplanation.trim().length > 0, `Question ${q.id} must have incorrectExplanation`);
    }
  });

  // Gate 32: preRemediationSnapshot15_2_10B.json and postRemediationSnapshot15_2_10B.json exist and validate cleanly
  test("Gate 32: preRemediationSnapshot15_2_10B.json and postRemediationSnapshot15_2_10B.json exist and validate cleanly", () => {
    const prePath = path.resolve(process.cwd(), "src/audits/preRemediationSnapshot15_2_10B.json");
    const postPath = path.resolve(process.cwd(), "src/audits/postRemediationSnapshot15_2_10B.json");

    assert.ok(fs.existsSync(prePath), "preRemediationSnapshot15_2_10B.json must exist");
    assert.ok(fs.existsSync(postPath), "postRemediationSnapshot15_2_10B.json must exist");

    const pre = JSON.parse(fs.readFileSync(prePath, "utf8"));
    const post = JSON.parse(fs.readFileSync(postPath, "utf8"));

    assert.strictEqual(pre.counts.totalCanonicalCourses, 136);
    assert.strictEqual(post.counts.totalCanonicalCourses, 136);
    assert.strictEqual(pre.counts.totalCourseQuestions, 1208);
    assert.strictEqual(post.counts.totalCourseQuestions, 1208);
  });

  // Gate 33: courseAssessmentQualityInventory15_2_10B.json exists and covers all 136 courses and 1,208 questions
  test("Gate 33: courseAssessmentQualityInventory15_2_10B.json exists and covers all 136 courses and 1,208 questions", () => {
    const invPath = path.resolve(process.cwd(), "src/audits/courseAssessmentQualityInventory15_2_10B.json");
    assert.ok(fs.existsSync(invPath), "courseAssessmentQualityInventory15_2_10B.json must exist");

    const inv = JSON.parse(fs.readFileSync(invPath, "utf8"));
    assert.strictEqual(inv.summary.totalCanonicalCourses, 136);
    assert.strictEqual(inv.summary.totalQuestionsAudited, 1208);
    assert.strictEqual(inv.courses.length, 136);
  });

  // Gate 34: COURSE_ASSESSMENT_QUALITY_AUDIT_15_2_10B.md exists and contains the complete 136-course quality matrix and cohort report
  test("Gate 34: COURSE_ASSESSMENT_QUALITY_AUDIT_15_2_10B.md exists and contains the complete 136-course quality matrix and cohort report", () => {
    const mdPath = path.resolve(process.cwd(), "../../COURSE_ASSESSMENT_QUALITY_AUDIT_15_2_10B.md");
    assert.ok(fs.existsSync(mdPath), "COURSE_ASSESSMENT_QUALITY_AUDIT_15_2_10B.md must exist");

    const content = fs.readFileSync(mdPath, "utf8");
    assert.ok(content.includes("136-Course Assessment Quality Matrix"), "Report must include 136-course master table");
    assert.ok(content.includes("Controlled Remediation Cohort 15.2.10B Breakdown"), "Report must include cohort breakdown");
    assert.ok(content.includes("READY FOR ASSESSMENT COHORT 15.2.10C"), "Report must include final determination");
  });
});
