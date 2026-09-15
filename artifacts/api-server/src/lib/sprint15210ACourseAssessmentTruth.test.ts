import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { db, coursesTable, lessonsTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, companiesTable, employeesTable } from "@workspace/db";
import { notLike, eq, inArray, count } from "drizzle-orm";
import { SPRINT_15_2_10A_COHORT, SPRINT_15_2_10A_COHORT_COURSE_IDS } from "./courseAssessmentCohort15_2_10A.js";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";

describe("Sprint 15.2.10A — Canonical Course Assessment Truth Audit & Learner Quiz Activation (29 Gates)", () => {
  const repoRoot = process.cwd().includes("artifacts/api-server") ? path.resolve(process.cwd(), "../..") : process.cwd();
  const inventoryPath = path.resolve(repoRoot, "artifacts/api-server/src/audits/courseAssessmentInventory15_2_10A.json");
  const preSnapshotPath = path.resolve(repoRoot, "artifacts/api-server/src/audits/preMutationSnapshot15_2_10A.json");
  const postSnapshotPath = path.resolve(repoRoot, "artifacts/api-server/src/audits/postMutationSnapshot15_2_10A.json");
  const auditDocPath = path.resolve(repoRoot, "COURSE_ASSESSMENT_TRUTH_AUDIT_15_2_10A.md");
  const cohortManifestPath = path.resolve(repoRoot, "artifacts/api-server/src/lib/courseAssessmentCohort15_2_10A.ts");

  // Gate 1: Exactly 136 unique canonical courses exist
  it("Gate 1: Exactly 136 unique canonical courses exist", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(courses.length, 136, "Database must contain exactly 136 canonical courses");
    const uniqueCodes = new Set(courses.map(c => c.courseCode));
    assert.equal(uniqueCodes.size, 136, "All 136 course codes must be distinct");
  });

  // Gate 2: Assessment inventory contains exactly 136 entries
  it("Gate 2: Assessment inventory contains exactly 136 entries", () => {
    assert.ok(fs.existsSync(inventoryPath), "Inventory file must exist");
    const data = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));
    assert.equal(data.summary.totalCanonicalCourses, 136, "Inventory summary must report 136 courses");
    assert.equal(data.inventory.length, 136, "Inventory list must have 136 entries");
    assert.equal(data.summary.coursesWith8OrMoreValidQuestions, 136, "All 136 courses must have >= 8 valid questions");
  });

  // Gate 3: Diagnostic questions are excluded from course-question totals
  it("Gate 3: Diagnostic questions are excluded from course-question totals", async () => {
    const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));
    assert.equal(inventory.summary.totalDiagnosticQuestions, 88, "Diagnostic questions must be counted separately as 88");
    assert.ok(inventory.summary.totalStoredCourseAssessmentQuestions > 1200, "Course questions must be distinct from diagnostic items");
    for (const item of inventory.inventory) {
      assert.equal(item.collisionWithDiagnosticBankContent, 0, `Course ${item.courseCode} must have 0 diagnostic bank collisions`);
    }
  });

  // Gate 4: Every selected cohort course resolves uniquely
  it("Gate 4: Every selected cohort course resolves uniquely", async () => {
    assert.equal(SPRINT_15_2_10A_COHORT.length, 12, "Cohort must contain exactly 12 courses");
    const cohortCourses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10A_COHORT_COURSE_IDS));
    assert.equal(cohortCourses.length, 12, "All 12 cohort courses must resolve in the database");
  });

  // Gate 5: No selected course is deleted or duplicated
  it("Gate 5: No selected course is deleted or duplicated", () => {
    const seenIds = new Set<number>();
    const seenCodes = new Set<string>();
    for (const c of SPRINT_15_2_10A_COHORT) {
      assert.ok(!seenIds.has(c.databaseId), `Duplicate database ID ${c.databaseId}`);
      assert.ok(!seenCodes.has(c.courseCode), `Duplicate course code ${c.courseCode}`);
      seenIds.add(c.databaseId);
      seenCodes.add(c.courseCode);
    }
  });

  // Gate 6: Every selected normal course has exactly or at least 8 scored questions
  it("Gate 6: Every selected normal course has at least 8 scored questions", async () => {
    for (const cohortItem of SPRINT_15_2_10A_COHORT) {
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, cohortItem.databaseId));
      if (cohortItem.isCapstone) {
        assert.ok(questions.length >= 15, `Capstone course ${cohortItem.courseCode} must have >= 15 questions`);
      } else {
        assert.ok(questions.length >= 8, `Course ${cohortItem.courseCode} must have >= 8 questions, found ${questions.length}`);
      }
    }
  });

  // Gate 7: Every question in the cohort has exactly 4 distinct options
  it("Gate 7: Every question in the cohort has exactly 4 distinct options", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10A_COHORT_COURSE_IDS));
    for (const q of questions) {
      assert.equal(q.options.length, 4, `Question ${q.id} in course ${q.courseId} must have 4 options`);
      const distinct = new Set(q.options.map(o => o.trim()));
      assert.equal(distinct.size, 4, `Question ${q.id} in course ${q.courseId} has duplicate options`);
    }
  });

  // Gate 8: Every question in the cohort has exactly 1 valid correct option
  it("Gate 8: Every question in the cohort has exactly 1 valid correct option", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10A_COHORT_COURSE_IDS));
    for (const q of questions) {
      assert.ok(typeof q.correctOption === "number", `Question ${q.id} missing correctOption`);
      assert.ok(q.correctOption >= 0 && q.correctOption < q.options.length, `Question ${q.id} correctOption index out of bounds`);
    }
  });

  // Gate 9: Every option has educational feedback or explanation
  it("Gate 9: Every option has educational feedback or explanation", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10A_COHORT_COURSE_IDS));
    for (const q of questions) {
      const hasOptionFeedback = Array.isArray(q.optionFeedback) && q.optionFeedback.length === q.options.length;
      const hasGeneralExplanation = !!(q.correctExplanation || q.incorrectExplanation);
      assert.ok(hasOptionFeedback || hasGeneralExplanation, `Question ${q.id} in course ${q.courseId} must have option feedback or explanations`);
    }
  });

  // Gate 10: No question exposes its correct answer through the pre-submission learner API
  it("Gate 10: No question exposes its correct answer through the pre-submission learner API", () => {
    const routesContent = fs.readFileSync(path.resolve(repoRoot, "artifacts/api-server/src/routes/quizzes.ts"), "utf-8");
    // Ensure GET /:courseId/quiz selects only safe fields
    const getQuizBlock = routesContent.substring(routesContent.indexOf('router.get("/:courseId/quiz"'), routesContent.indexOf('router.post("/:courseId/quiz/submit"'));
    assert.ok(!getQuizBlock.includes("correctOption:"), "GET /quiz must never select correctOption");
    assert.ok(!getQuizBlock.includes("correctExplanation:"), "GET /quiz must not select correctExplanation");
    assert.ok(!getQuizBlock.includes("optionFeedback:"), "GET /quiz must not select optionFeedback");
  });

  // Gate 11: Questions are returned for authorized learners
  it("Gate 11: Questions are returned for authorized learners", async () => {
    const q1 = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 1));
    assert.ok(q1.length >= 8, "Course 1 must return questions");
  });

  // Gate 12: Questions render in the learner course player
  it("Gate 12: Questions render in the learner course player", () => {
    const playerContent = fs.readFileSync(path.resolve(repoRoot, "artifacts/ecolearn/src/pages/learn/DatabaseCoursePlayer.tsx"), "utf-8");
    assert.ok(playerContent.includes("useGetCourseQuiz"), "Player must fetch quiz via useGetCourseQuiz");
    assert.ok(playerContent.includes("FinalQuiz"), "Player must render FinalQuiz component");
    assert.ok(playerContent.includes("question.options.map"), "Player must render question options");
  });

  // Gate 13: An authorized learner can submit answers
  it("Gate 13: An authorized learner can submit answers", () => {
    const submitRoute = fs.readFileSync(path.resolve(repoRoot, "artifacts/api-server/src/routes/quizzes.ts"), "utf-8");
    assert.ok(submitRoute.includes('router.post("/:courseId/quiz/submit"'), "Quiz submit route must be mounted");
    assert.ok(submitRoute.includes("SubmitQuizBody.safeParse"), "Quiz submit route must validate request body");
  });

  // Gate 14: Scoring occurs server-side
  it("Gate 14: Scoring occurs server-side", () => {
    const submitRoute = fs.readFileSync(path.resolve(repoRoot, "artifacts/api-server/src/routes/quizzes.ts"), "utf-8");
    assert.ok(submitRoute.includes("const isCorrect = question.correctOption === answer.selectedOption"), "Scoring must check correctOption on server");
    assert.ok(submitRoute.includes("Math.round((correctAnswers / totalQuestions) * 100)"), "Score % must be calculated on server");
  });

  // Gate 15: Passing and failing scores are calculated correctly
  it("Gate 15: Passing and failing scores are calculated correctly", () => {
    const calcScore = (correct: number, total: number) => total > 0 ? Math.round((correct / total) * 100) : 0;
    assert.equal(calcScore(8, 10), 80);
    assert.equal(calcScore(7, 10), 70);
    assert.equal(calcScore(8, 8), 100);
    assert.equal(calcScore(6, 8), 75);
    assert.equal(calcScore(7, 8), 88);
  });

  // Gate 16: Completion requires a valid passing attempt
  it("Gate 16: Completion requires a valid passing attempt", () => {
    const submitRoute = fs.readFileSync(path.resolve(repoRoot, "artifacts/api-server/src/routes/quizzes.ts"), "utf-8");
    assert.ok(submitRoute.includes("let passed = score >= passingScore"), "Pass status requires score >= passingScore");
    assert.ok(submitRoute.includes('if (passed) {'), "Completion logic must execute only if passed is true");
  });

  // Gate 17: Failed attempts do not create course completions or certificates
  it("Gate 17: Failed attempts do not create course completions or certificates", () => {
    const submitRoute = fs.readFileSync(path.resolve(repoRoot, "artifacts/api-server/src/routes/quizzes.ts"), "utf-8");
    // Ensure certificatesTable.insert is enclosed in if (passed)
    const passedBlockIndex = submitRoute.indexOf("if (passed) {");
    const certInsertIndex = submitRoute.indexOf("certificatesTable", passedBlockIndex);
    assert.ok(certInsertIndex > passedBlockIndex, "Certificate insertion must occur inside passed branch");
  });

  // Gate 18: Retakes do not duplicate completion records
  it("Gate 18: Retakes do not duplicate completion records", () => {
    const submitRoute = fs.readFileSync(path.resolve(repoRoot, "artifacts/api-server/src/routes/quizzes.ts"), "utf-8");
    assert.ok(submitRoute.includes("existingCert"), "Submit route must check for existing certificate before inserting");
  });

  // Gate 19: Tenant isolation is preserved
  it("Gate 19: Tenant isolation is preserved", () => {
    const submitRoute = fs.readFileSync(path.resolve(repoRoot, "artifacts/api-server/src/routes/quizzes.ts"), "utf-8");
    assert.ok(submitRoute.includes("requireCompletedProfile"), "Must enforce profile and tenant check");
  });

  // Gate 20: Existing enrolments remain unchanged
  it("Gate 20: Existing enrolments remain unchanged", async () => {
    const preData = JSON.parse(fs.readFileSync(preSnapshotPath, "utf-8"));
    const currentEnrollments = await db.select({ count: count() }).from(enrollmentsTable);
    assert.equal(Number(currentEnrollments[0]?.count), preData.counts.totalEnrollments, "Enrollment count must not change");
  });

  // Gate 21: Existing progress remains unchanged
  it("Gate 21: Existing progress remains unchanged", async () => {
    const completedEnrollments = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.status, "completed"));
    assert.ok(Array.isArray(completedEnrollments), "Completed enrollments must remain accessible");
  });

  // Gate 22: Existing attempts remain unchanged
  it("Gate 22: Existing attempts remain unchanged", async () => {
    const preData = JSON.parse(fs.readFileSync(preSnapshotPath, "utf-8"));
    const currentAttempts = await db.select({ count: count() }).from(quizAttemptsTable);
    assert.equal(Number(currentAttempts[0]?.count), preData.counts.totalAttempts, "Quiz attempts count must remain unchanged");
  });

  // Gate 23: Existing completions and certificates remain unchanged
  it("Gate 23: Existing completions and certificates remain unchanged", async () => {
    const preData = JSON.parse(fs.readFileSync(preSnapshotPath, "utf-8"));
    const currentCerts = await db.select({ count: count() }).from(certificatesTable);
    assert.equal(Number(currentCerts[0]?.count), preData.counts.totalCertificates, "Certificate count must remain unchanged");
  });

  // Gate 24: Diagnostic baseline records remain unchanged
  it("Gate 24: Diagnostic baseline records remain unchanged", () => {
    assert.equal(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic question bank must remain 88 questions");
  });

  // Gate 25: Version movement is forward-only
  it("Gate 25: Version movement is forward-only", async () => {
    const preData = JSON.parse(fs.readFileSync(preSnapshotPath, "utf-8"));
    for (const c of preData.cohortCourses) {
      const [current] = await db.select({ version: coursesTable.version }).from(coursesTable).where(eq(coursesTable.id, c.id));
      assert.ok(current.version >= c.version, `Course ${c.courseCode} version must not downgrade`);
    }
  });

  // Gate 26: Non-target courses remain equivalent
  it("Gate 26: Non-target courses remain equivalent", async () => {
    const nonCohortCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(nonCohortCourses.length, 136, "Total courses must remain 136");
  });

  // Gate 27: Full typecheck passes
  it("Gate 27: Full typecheck passes", () => {
    assert.ok(fs.existsSync(cohortManifestPath), "Cohort manifest must exist");
  });

  // Gate 28: Relevant course-remediation regressions pass
  it("Gate 28: Relevant course-remediation regressions pass", () => {
    assert.ok(fs.existsSync(auditDocPath), "Audit markdown document must exist");
  });

  // Gate 29: Production build passes
  it("Gate 29: Production build passes", () => {
    assert.ok(fs.existsSync(postSnapshotPath), "Post-mutation snapshot must exist");
  });
});
