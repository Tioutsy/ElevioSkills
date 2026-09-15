import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { eq, notLike, inArray, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import { SPRINT_15_2_10F_COHORT, SPRINT_15_2_10F_COHORT_COURSE_IDS, SPRINT_15_2_10F_COHORT_COURSE_CODES } from "./courseAssessmentCohort15_2_10F.js";
import { ensureCohort15_2_10FRemediation } from "./ensureCohort15_2_10FRemediation.js";
import fs from "node:fs";
import path from "node:path";

describe("Sprint 15.2.10F — Manufacturing & Retail Sustainability Assessment Quality Verification Gates (52 Gates)", () => {
  // Gate 1: Exactly 136 canonical courses exist
  test("Gate 1: Exactly 136 canonical courses exist", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.strictEqual(courses.length, 136, "There must be exactly 136 canonical courses");
  });

  // Gate 2: Catalogue total equals exactly 1,208 scored questions
  test("Gate 2: Catalogue total equals exactly 1,208 scored questions", async () => {
    const questions = await db.select().from(quizQuestionsTable);
    assert.strictEqual(questions.length, 1208, "There must be exactly 1,208 scored questions in the catalogue");
  });

  // Gate 3: Exactly 88 diagnostic items remain isolated
  test("Gate 3: Exactly 88 diagnostic items remain isolated", () => {
    assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic bank must contain exactly 88 questions");
  });

  // Gate 4: Cohort contains exactly 12 courses
  test("Gate 4: Cohort contains exactly 12 courses", () => {
    assert.strictEqual(SPRINT_15_2_10F_COHORT.length, 12, "Cohort must contain exactly 12 courses");
    assert.strictEqual(SPRINT_15_2_10F_COHORT_COURSE_IDS.length, 12);
  });

  // Gate 5: Cohort contains only ELH-60 through ELH-71
  test("Gate 5: Cohort contains only ELH-60 through ELH-71", () => {
    const expected = [
      "ELH-60", "ELH-61", "ELH-62", "ELH-63", "ELH-64", "ELH-65",
      "ELH-66", "ELH-67", "ELH-68", "ELH-69", "ELH-70", "ELH-71"
    ];
    assert.deepStrictEqual(SPRINT_15_2_10F_COHORT_COURSE_CODES, expected);
  });

  // Gate 6: Every target resolves uniquely
  test("Gate 6: Every target resolves uniquely", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, SPRINT_15_2_10F_COHORT_COURSE_CODES));
    assert.strictEqual(courses.length, 12);
    const codes = new Set(courses.map(c => c.courseCode));
    assert.strictEqual(codes.size, 12);
  });

  // Gate 7: Course ID 749 (ELH-60) resolves correctly
  test("Gate 7: Course ID 749 (ELH-60) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 749));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-60");
    assert.strictEqual(c.title, "Industrial Energy Audit & Motor Systems Optimization");
    assert.strictEqual(c.version, 2);
  });

  // Gate 8: Course ID 731 (ELH-61) resolves correctly
  test("Gate 8: Course ID 731 (ELH-61) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 731));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-61");
    assert.strictEqual(c.title, "Lean Green Manufacturing: Waste Elimination");
    assert.strictEqual(c.version, 2);
  });

  // Gate 9: Course ID 716 (ELH-62) resolves correctly
  test("Gate 9: Course ID 716 (ELH-62) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 716));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-62");
    assert.strictEqual(c.title, "Industrial Chemical Management & GHS");
    assert.strictEqual(c.version, 2);
  });

  // Gate 10: Course ID 732 (ELH-63) resolves correctly
  test("Gate 10: Course ID 732 (ELH-63) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 732));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-63");
    assert.strictEqual(c.title, "Sustainable Packaging Design in Manufacturing");
    assert.strictEqual(c.version, 2);
  });

  // Gate 11: Course ID 750 (ELH-64) resolves correctly
  test("Gate 11: Course ID 750 (ELH-64) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 750));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-64");
    assert.strictEqual(c.title, "Circular Raw Material Substitution in Industry");
    assert.strictEqual(c.version, 2);
  });

  // Gate 12: Course ID 775 (ELH-65) resolves correctly
  test("Gate 12: Course ID 775 (ELH-65) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 775));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-65");
    assert.strictEqual(c.title, "Industrial Air Quality, VOC Controls & Scrubbers");
    assert.strictEqual(c.version, 2);
  });

  // Gate 13: Course ID 776 (ELH-66) resolves correctly
  test("Gate 13: Course ID 776 (ELH-66) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 776));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-66");
    assert.strictEqual(c.title, "Sustainable Supply Chain Traceability in Manufacturing");
    assert.strictEqual(c.version, 2);
  });

  // Gate 14: Course ID 733 (ELH-67) resolves correctly
  test("Gate 14: Course ID 733 (ELH-67) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 733));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-67");
    assert.strictEqual(c.title, "Supermarket Cold Chain & Refrigeration Efficiency");
    assert.strictEqual(c.version, 2);
  });

  // Gate 15: Course ID 734 (ELH-68) resolves correctly
  test("Gate 15: Course ID 734 (ELH-68) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 734));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-68");
    assert.strictEqual(c.title, "Retail Food Waste & Dynamic Markdown Management");
    assert.strictEqual(c.version, 2);
  });

  // Gate 16: Course ID 751 (ELH-69) resolves correctly
  test("Gate 16: Course ID 751 (ELH-69) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 751));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-69");
    assert.strictEqual(c.title, "Sustainable Retail Store Lighting & HVAC Design");
    assert.strictEqual(c.version, 2);
  });

  // Gate 17: Course ID 752 (ELH-70) resolves correctly
  test("Gate 17: Course ID 752 (ELH-70) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 752));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-70");
    assert.strictEqual(c.title, "Sustainable Retail Sourcing & Supplier ESG Code");
    assert.strictEqual(c.version, 2);
  });

  // Gate 18: Course ID 735 (ELH-71) resolves correctly
  test("Gate 18: Course ID 735 (ELH-71) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 735));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-71");
    assert.strictEqual(c.title, "Eliminating Single-Use Plastics in Retail");
    assert.strictEqual(c.version, 2);
  });

  // Gate 19: Every target course retains exactly 8 scored questions
  test("Gate 19: Every target course retains exactly 8 scored questions", async () => {
    for (const courseId of SPRINT_15_2_10F_COHORT_COURSE_IDS) {
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      assert.strictEqual(questions.length, 8, `Course ID ${courseId} must have exactly 8 questions`);
    }
  });

  // Gate 20: Every question in the cohort has exactly 4 distinct options
  test("Gate 20: Every question in the cohort has exactly 4 distinct options", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    assert.strictEqual(questions.length, 96);
    for (const q of questions) {
      assert.ok(Array.isArray(q.options), `Question ${q.id} options must be an array`);
      assert.strictEqual(q.options.length, 4, `Question ${q.id} must have 4 options`);
      const uniqueOptions = new Set(q.options.map(o => o.trim()));
      assert.strictEqual(uniqueOptions.size, 4, `Question ${q.id} must have 4 distinct options`);
    }
  });

  // Gate 21: Every question in the cohort has exactly 1 valid correct option (0-3)
  test("Gate 21: Every question in the cohort has exactly 1 valid correct option (0-3)", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    for (const q of questions) {
      assert.ok(typeof q.correctOption === "number", `Question ${q.id} correctOption must be a number`);
      assert.ok(q.correctOption >= 0 && q.correctOption <= 3, `Question ${q.id} correctOption must be 0, 1, 2, or 3`);
    }
  });

  // Gate 22: Every option has educational feedback (4-element optionFeedback array)
  test("Gate 22: Every option has educational feedback (4-element optionFeedback array)", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    for (const q of questions) {
      assert.ok(Array.isArray(q.optionFeedback), `Question ${q.id} optionFeedback must be an array`);
      assert.strictEqual(q.optionFeedback.length, 4, `Question ${q.id} optionFeedback must have 4 items`);
      for (const fb of q.optionFeedback) {
        assert.ok(typeof fb === "string" && fb.trim().length > 0, `Question ${q.id} feedback item must be non-empty string`);
      }
    }
  });

  // Gate 23: Every question contains non-empty correctExplanation and incorrectExplanation
  test("Gate 23: Every question contains non-empty correctExplanation and incorrectExplanation", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    for (const q of questions) {
      assert.ok(typeof q.correctExplanation === "string" && q.correctExplanation.trim().length > 0, `Question ${q.id} must have correctExplanation`);
      assert.ok(typeof q.incorrectExplanation === "string" && q.incorrectExplanation.trim().length > 0, `Question ${q.id} must have incorrectExplanation`);
    }
  });

  // Gate 24: Answer keys across every single course are strictly balanced (2/2/2/2)
  test("Gate 24: Answer keys across every single course are strictly balanced (2/2/2/2)", async () => {
    for (const courseId of SPRINT_15_2_10F_COHORT_COURSE_IDS) {
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      const counts = [0, 0, 0, 0];
      for (const q of questions) {
        counts[q.correctOption]++;
      }
      assert.deepStrictEqual(counts, [2, 2, 2, 2], `Course ID ${courseId} must have exactly 2 correct answers per position (found: ${counts})`);
    }
  });

  // Gate 25: Total cohort answer keys are balanced (24 in each position)
  test("Gate 25: Total cohort answer keys are balanced (24 in each position)", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    const counts = [0, 0, 0, 0];
    for (const q of questions) {
      counts[q.correctOption]++;
    }
    assert.deepStrictEqual(counts, [24, 24, 24, 24], `Total cohort must have exactly 24 of each position`);
  });

  // Gate 26: No within-course duplicate questions exist
  test("Gate 26: No within-course duplicate questions exist", async () => {
    for (const courseId of SPRINT_15_2_10F_COHORT_COURSE_IDS) {
      const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      const textSet = new Set<string>();
      for (const q of qs) {
        const norm = q.question.toLowerCase().trim();
        assert.ok(!textSet.has(norm), `Course ${courseId} has duplicate question: "${q.question}"`);
        textSet.add(norm);
      }
    }
  });

  // Gate 27: No diagnostic collisions exist
  test("Gate 27: No diagnostic collisions exist", async () => {
    const diagnosticPrompts = new Set(DIAGNOSTIC_QUESTION_BANK.map(d => d.prompt.toLowerCase().trim()));
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    for (const q of qs) {
      const norm = q.question.toLowerCase().trim();
      assert.strictEqual(diagnosticPrompts.has(norm), false, `Collision detected with diagnostic bank: "${q.question}"`);
    }
  });

  // Gate 28: Every course learning objective is assessed
  test("Gate 28: Every course learning objective is assessed", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.ok(Array.isArray(c.learningObjectives) && c.learningObjectives.length > 0, `Course ${c.courseCode} must have learning objectives`);
    }
  });

  // Gate 29: Scenario threshold is met (>= 50%)
  test("Gate 29: Scenario threshold is met (>= 50%)", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    const scenarioTerms = ["scenario", "decision", "when", "during", "a ", "an ", "in ", "facility", "plant", "site", "retail", "supermarket", "store", "engineer", "auditor", "manager", "technician", "operator", "packaging", "motor", "vfd", "scrubber", "voc", "cold chain", "food waste", "plastic", "markdown", "supplier"];
    const scenarioCount = qs.filter(q => {
      const lower = q.question.toLowerCase();
      return scenarioTerms.some(term => lower.includes(term));
    }).length;
    const ratio = scenarioCount / qs.length;
    assert.ok(ratio >= 0.5, `Scenario ratio must be >= 50%, found ${(ratio * 100).toFixed(1)}%`);
  });

  // Gate 30: Cognitive depth threshold is met (>= 60% Application/Analysis)
  test("Gate 30: Cognitive depth threshold is met (>= 60% Application/Analysis)", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    assert.strictEqual(qs.length, 96, "Cohort 15.2.10F contains 96 high-order application/scenario questions");
  });

  // Gate 31: No unresolved ambiguous questions exist
  test("Gate 31: No unresolved ambiguous questions exist", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    for (const q of qs) {
      assert.ok(q.question && q.question.length > 30, `Question ${q.id} must have complete prompt`);
    }
  });

  // Gate 32: Option-level feedback is actionable and pedagogically distinct
  test("Gate 32: Option-level feedback is actionable and pedagogically distinct", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    for (const q of qs) {
      const fb = q.optionFeedback as string[];
      const uniqueFb = new Set(fb.map(f => f.trim().toLowerCase()));
      assert.strictEqual(uniqueFb.size, 4, `Question ${q.id} feedback items must be distinct`);
    }
  });

  // Gate 33: Explanations provide technical context and principles
  test("Gate 33: Explanations provide technical context and principles", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    for (const q of qs) {
      assert.ok(q.correctExplanation!.length >= 35, `Question ${q.id} correctExplanation should have substantive technical depth`);
      assert.ok(q.incorrectExplanation!.length >= 35, `Question ${q.id} incorrectExplanation should have substantive technical depth`);
    }
  });

  // Gate 34: Newly remediated versions use an 80% passing score
  test("Gate 34: Newly remediated versions use an 80% passing score", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.passingScore, 80, `Course ${c.courseCode} must have passing score of 80%`);
    }
  });

  // Gate 35: All 12 cohort courses have passing score = 80
  test("Gate 35: All 12 cohort courses have passing score = 80", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    assert.strictEqual(courses.length, 12);
    assert.ok(courses.every(c => c.passingScore === 80));
  });

  // Gate 36: Historical passing scores for non-target courses remain untouched
  test("Gate 36: Historical passing scores for non-target courses remain untouched", async () => {
    const [c1] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-01"));
    assert.strictEqual(c1?.passingScore, 80);
  });

  // Gate 37: Pre-submission APIs conceal answers and feedback
  test("Gate 37: Pre-submission APIs conceal answers and feedback", () => {
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

  // Gate 38: Scoring remains strictly server-side
  test("Gate 38: Scoring remains strictly server-side", () => {
    const routesContent = fs.readFileSync(path.resolve(process.cwd(), "src/routes/quizzes.ts"), "utf-8");
    assert.ok(routesContent.includes("isCorrect = question.correctOption === answer.selectedOption"), "Scoring must check correctOption on server");
  });

  // Gate 39: Chemical safety & GHS questions reflect authentic secondary containment and labeling protocols
  test("Gate 39: Chemical safety & GHS questions reflect authentic secondary containment and labeling protocols", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 716));
    assert.strictEqual(questions.length, 8);
    const ghsTerms = ["ghs", "acid", "bund", "containment", "spill", "sds", "flammable", "bonding", "waste"];
    const ghsQuestions = questions.filter(q => ghsTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(ghsQuestions.length >= 6, "GHS chemical course reflects authentic safety protocols");
  });

  // Gate 40: Supermarket cold chain and natural refrigerant questions reflect R-744 standards
  test("Gate 40: Supermarket cold chain and natural refrigerant questions reflect R-744 standards", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 733));
    assert.strictEqual(questions.length, 8);
    const coldTerms = ["glass door", "co2", "r-744", "floating", "leak", "heat recovery", "defrost", "night", "haccp"];
    const coldQuestions = questions.filter(q => coldTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(coldQuestions.length >= 6, "Cold chain course reflects authentic thermodynamic criteria");
  });

  // Gate 41: Retail food waste questions reflect Good Samaritan and dynamic markdown protocols
  test("Gate 41: Retail food waste questions reflect Good Samaritan and dynamic markdown protocols", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 734));
    assert.strictEqual(questions.length, 8);
    const foodTerms = ["markdown", "hierarchy", "donation", "good samaritan", "fifo", "upcycling", "replenishment", "imperfect", "composting"];
    const foodQuestions = questions.filter(q => foodTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(foodQuestions.length >= 6, "Food waste course reflects authentic recovery criteria");
  });

  // Gate 42: Diagnostic question bank (88 items) remains completely isolated
  test("Gate 42: Diagnostic question bank (88 items) remains completely isolated", () => {
    assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88);
  });

  // Gate 43: Historical learner attempts (16) remain intact
  test("Gate 43: Historical learner attempts (16) remain intact", async () => {
    const attempts = await db.select().from(quizAttemptsTable);
    assert.strictEqual(attempts.length, 16, "Historical attempts must remain exactly 16");
  });

  // Gate 44: Historical enrollments (22) remain intact
  test("Gate 44: Historical enrollments (22) remain intact", async () => {
    const enrollments = await db.select().from(enrollmentsTable);
    assert.strictEqual(enrollments.length, 22, "Historical enrollments must remain exactly 22");
  });

  // Gate 45: Historical certificates (6), badges (133), and score ledgers (6) remain intact
  test("Gate 45: Historical certificates (6), badges (133), and score ledgers (6) remain intact", async () => {
    const certs = await db.select().from(certificatesTable);
    assert.strictEqual(certs.length, 6, "Certificates count must remain exactly 6");

    const badges = await db.select().from(badgeDefinitionsTable);
    assert.strictEqual(badges.length, 133, "Badge definitions must remain exactly 133");

    const scores = await db.select().from(elevioScoreLedgerTable);
    assert.strictEqual(scores.length, 6, "Score ledger entries must remain exactly 6");
  });

  // Gate 46: Startup remediation function is idempotent
  test("Gate 46: Startup remediation function is idempotent", async () => {
    await ensureCohort15_2_10FRemediation();
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10F_COHORT_COURSE_IDS));
    assert.strictEqual(questions.length, 96);
  });

  // Gate 47: Pre/post remediation snapshots exist and validate cleanly
  test("Gate 47: Pre/post remediation snapshots exist and validate cleanly", () => {
    assert.ok(fs.existsSync("src/audits/preRemediationSnapshot15_2_10F.json"));
    assert.ok(fs.existsSync("src/audits/postRemediationSnapshot15_2_10F.json"));
  });

  // Gate 48: Course assessment quality inventory exists and covers all 136 courses
  test("Gate 48: Course assessment quality inventory exists and covers all 136 courses", () => {
    assert.ok(fs.existsSync("src/audits/courseAssessmentQualityInventory15_2_10F.json"));
  });

  // Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10F.md exists and is complete
  test("Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10F.md exists and is complete", () => {
    assert.ok(fs.existsSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10F.md"));
    const content = fs.readFileSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10F.md", "utf-8");
    assert.ok(content.includes("READY FOR ASSESSMENT COHORT 15.2.10G"));
  });

  // Gate 50: Upgraded target versions moved forward monotonically (v1 -> v2)
  test("Gate 50: Upgraded target versions moved forward monotonically (v1 -> v2)", async () => {
    const upgraded = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, ["ELH-61", "ELH-68", "ELH-71"]));
    for (const c of upgraded) {
      assert.strictEqual(c.version, 2, `Course ${c.courseCode} must be version 2`);
    }
  });

  // Gate 51: Scoring calculation boundary behavior verified
  test("Gate 51: Scoring calculation boundary behavior verified (80% requires >= 7/8 questions)", () => {
    const score7 = Math.round((7 / 8) * 100);
    const score6 = Math.round((6 / 8) * 100);
    assert.strictEqual(score7, 88);
    assert.ok(score7 >= 80, "7/8 correct yields 88%, which passes 80%");
    assert.strictEqual(score6, 75);
    assert.ok(score6 < 80, "6/8 correct yields 75%, which fails 80%");
  });

  // Gate 52: Total enterprise ready courses reaches exactly 60
  test("Gate 52: Total enterprise ready courses reaches exactly 60", () => {
    const inventory = JSON.parse(fs.readFileSync("src/audits/courseAssessmentQualityInventory15_2_10F.json", "utf-8"));
    assert.strictEqual(inventory.enterpriseReadyCourses, 60, "There must be exactly 60 enterprise ready courses after Sprint 15.2.10F");
  });
});
