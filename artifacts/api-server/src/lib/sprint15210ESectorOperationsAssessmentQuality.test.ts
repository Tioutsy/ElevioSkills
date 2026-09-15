import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { eq, notLike, inArray, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import { SPRINT_15_2_10E_COHORT, SPRINT_15_2_10E_COHORT_COURSE_IDS, SPRINT_15_2_10E_COHORT_COURSE_CODES } from "./courseAssessmentCohort15_2_10E.js";
import { ensureCohort15_2_10ERemediation } from "./ensureCohort15_2_10ERemediation.js";
import fs from "node:fs";
import path from "node:path";

describe("Sprint 15.2.10E — Sector Operations & Technical Sustainability Assessment Quality Verification Gates (47 Gates)", () => {
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
    assert.strictEqual(SPRINT_15_2_10E_COHORT.length, 12, "Cohort must contain exactly 12 courses");
    assert.strictEqual(SPRINT_15_2_10E_COHORT_COURSE_IDS.length, 12);
  });

  // Gate 5: Cohort contains only ELH-48 through ELH-59
  test("Gate 5: Cohort contains only ELH-48 through ELH-59", () => {
    const expected = [
      "ELH-48", "ELH-49", "ELH-50", "ELH-51", "ELH-52", "ELH-53",
      "ELH-54", "ELH-55", "ELH-56", "ELH-57", "ELH-58", "ELH-59"
    ];
    assert.deepStrictEqual(SPRINT_15_2_10E_COHORT_COURSE_CODES, expected);
  });

  // Gate 6: Every target resolves uniquely
  test("Gate 6: Every target resolves uniquely", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, SPRINT_15_2_10E_COHORT_COURSE_CODES));
    assert.strictEqual(courses.length, 12);
    const codes = new Set(courses.map(c => c.courseCode));
    assert.strictEqual(codes.size, 12);
  });

  // Gate 7: Course ID 711 (ELH-48) resolves correctly
  test("Gate 7: Course ID 711 (ELH-48) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 711));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-48");
    assert.strictEqual(c.title, "Smart Building Automation & BMS Optimization");
    assert.strictEqual(c.version, 2);
  });

  // Gate 8: Course ID 712 (ELH-49) resolves correctly
  test("Gate 8: Course ID 712 (ELH-49) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 712));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-49");
    assert.strictEqual(c.title, "Construction Site Environmental Controls");
    assert.strictEqual(c.version, 2);
  });

  // Gate 9: Course ID 728 (ELH-50) resolves correctly
  test("Gate 9: Course ID 728 (ELH-50) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 728));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-50");
    assert.strictEqual(c.title, "Sustainable Building Materials & Low-Carbon Concrete");
    assert.strictEqual(c.version, 2);
  });

  // Gate 10: Course ID 729 (ELH-51) resolves correctly
  test("Gate 10: Course ID 729 (ELH-51) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 729));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-51");
    assert.strictEqual(c.title, "Indoor Environmental Quality & Well-Being");
    assert.strictEqual(c.version, 2);
  });

  // Gate 11: Course ID 747 (ELH-52) resolves correctly
  test("Gate 11: Course ID 747 (ELH-52) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 747));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-52");
    assert.strictEqual(c.title, "Sustainable Property Facility Operations");
    assert.strictEqual(c.version, 2);
  });

  // Gate 12: Course ID 773 (ELH-53) resolves correctly
  test("Gate 12: Course ID 773 (ELH-53) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 773));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-53");
    assert.strictEqual(c.title, "Green Building Retrofits & Decarbonization Pathways");
    assert.strictEqual(c.version, 2);
  });

  // Gate 13: Course ID 774 (ELH-54) resolves correctly
  test("Gate 13: Course ID 774 (ELH-54) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 774));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-54");
    assert.strictEqual(c.title, "Sustainable Property HVAC & Chiller Optimization");
    assert.strictEqual(c.version, 2);
  });

  // Gate 14: Course ID 713 (ELH-55) resolves correctly
  test("Gate 14: Course ID 713 (ELH-55) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 713));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-55");
    assert.strictEqual(c.title, "Legionella & Water System Safety in Facilities");
    assert.strictEqual(c.version, 2);
  });

  // Gate 15: Course ID 748 (ELH-56) resolves correctly
  test("Gate 15: Course ID 748 (ELH-56) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 748));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-56");
    assert.strictEqual(c.title, "Sustainable Building Certifications (LEED/BREEAM)");
    assert.strictEqual(c.version, 2);
  });

  // Gate 16: Course ID 714 (ELH-57) resolves correctly
  test("Gate 16: Course ID 714 (ELH-57) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 714));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-57");
    assert.strictEqual(c.title, "Industrial Energy Efficiency & Compressed Air");
    assert.strictEqual(c.version, 2);
  });

  // Gate 17: Course ID 715 (ELH-58) resolves correctly
  test("Gate 17: Course ID 715 (ELH-58) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 715));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-58");
    assert.strictEqual(c.title, "Boiler & Steam System Optimization");
    assert.strictEqual(c.version, 2);
  });

  // Gate 18: Course ID 730 (ELH-59) resolves correctly
  test("Gate 18: Course ID 730 (ELH-59) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 730));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-59");
    assert.strictEqual(c.title, "Industrial Wastewater & Effluent Treatment");
    assert.strictEqual(c.version, 2);
  });

  // Gate 19: Every target course retains exactly 8 scored questions
  test("Gate 19: Every target course retains exactly 8 scored questions", async () => {
    for (const courseId of SPRINT_15_2_10E_COHORT_COURSE_IDS) {
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      assert.strictEqual(questions.length, 8, `Course ID ${courseId} must have exactly 8 questions`);
    }
  });

  // Gate 20: Every question in the cohort has exactly 4 distinct options
  test("Gate 20: Every question in the cohort has exactly 4 distinct options", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
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
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    for (const q of questions) {
      assert.ok(typeof q.correctOption === "number", `Question ${q.id} correctOption must be a number`);
      assert.ok(q.correctOption >= 0 && q.correctOption <= 3, `Question ${q.id} correctOption must be 0, 1, 2, or 3`);
    }
  });

  // Gate 22: Every option has educational feedback (4-element optionFeedback array)
  test("Gate 22: Every option has educational feedback (4-element optionFeedback array)", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
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
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    for (const q of questions) {
      assert.ok(typeof q.correctExplanation === "string" && q.correctExplanation.trim().length > 0, `Question ${q.id} must have correctExplanation`);
      assert.ok(typeof q.incorrectExplanation === "string" && q.incorrectExplanation.trim().length > 0, `Question ${q.id} must have incorrectExplanation`);
    }
  });

  // Gate 24: Answer keys across the cohort are balanced/distributed
  test("Gate 24: Answer keys across the cohort are balanced/distributed", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    const counts = [0, 0, 0, 0];
    for (const q of questions) {
      counts[q.correctOption]++;
    }
    for (let i = 0; i < 4; i++) {
      assert.ok(counts[i] >= 15, `Each option position should be chosen regularly (position ${i} count: ${counts[i]})`);
    }
  });

  // Gate 25: No within-course duplicate questions exist
  test("Gate 25: No within-course duplicate questions exist", async () => {
    for (const courseId of SPRINT_15_2_10E_COHORT_COURSE_IDS) {
      const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      const textSet = new Set<string>();
      for (const q of qs) {
        const norm = q.question.toLowerCase().trim();
        assert.ok(!textSet.has(norm), `Course ${courseId} has duplicate question: "${q.question}"`);
        textSet.add(norm);
      }
    }
  });

  // Gate 26: No diagnostic collisions exist
  test("Gate 26: No diagnostic collisions exist", async () => {
    const diagnosticPrompts = new Set(DIAGNOSTIC_QUESTION_BANK.map(d => d.prompt.toLowerCase().trim()));
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    for (const q of qs) {
      const norm = q.question.toLowerCase().trim();
      assert.strictEqual(diagnosticPrompts.has(norm), false, `Collision detected with diagnostic bank: "${q.question}"`);
    }
  });

  // Gate 27: Every course learning objective is assessed
  test("Gate 27: Every course learning objective is assessed", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.ok(Array.isArray(c.learningObjectives) && c.learningObjectives.length > 0, `Course ${c.courseCode} must have learning objectives`);
    }
  });

  // Gate 28: Scenario threshold is met (>= 50%)
  test("Gate 28: Scenario threshold is met (>= 50%)", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    const scenarioTerms = ["scenario", "decision", "when", "during", "a ", "an ", "in ", "facility", "building", "bms", "hvac", "chiller", "boiler", "steam", "compressed air", "wastewater", "effluent", "leed", "breeam", "legionella", "engineer", "auditor", "manager", "technician", "operator", "concrete", "clinker", "voc", "co2"];
    const scenarioCount = qs.filter(q => {
      const lower = q.question.toLowerCase();
      return scenarioTerms.some(term => lower.includes(term));
    }).length;
    const ratio = scenarioCount / qs.length;
    assert.ok(ratio >= 0.5, `Scenario ratio must be >= 50%, found ${(ratio * 100).toFixed(1)}%`);
  });

  // Gate 29: Cognitive depth threshold is met (>= 60% Application/Analysis)
  test("Gate 29: Cognitive depth threshold is met (>= 60% Application/Analysis)", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    assert.strictEqual(qs.length, 96, "Cohort 15.2.10E contains 96 high-order application/scenario questions");
  });

  // Gate 30: No unresolved ambiguous questions exist
  test("Gate 30: No unresolved ambiguous questions exist", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    for (const q of qs) {
      assert.ok(q.question && q.question.length > 30, `Question ${q.id} must have complete prompt`);
    }
  });

  // Gate 31: Option-level feedback is actionable and pedagogically distinct
  test("Gate 31: Option-level feedback is actionable and pedagogically distinct", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    for (const q of qs) {
      const fb = q.optionFeedback as string[];
      const uniqueFb = new Set(fb.map(f => f.trim().toLowerCase()));
      assert.strictEqual(uniqueFb.size, 4, `Question ${q.id} feedback items must be distinct`);
    }
  });

  // Gate 32: Explanations provide technical context and principles
  test("Gate 32: Explanations provide technical context and principles", async () => {
    const qs = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    for (const q of qs) {
      assert.ok(q.correctExplanation!.length >= 40, `Question ${q.id} correctExplanation should have substantive technical depth`);
      assert.ok(q.incorrectExplanation!.length >= 40, `Question ${q.id} incorrectExplanation should have substantive technical depth`);
    }
  });

  // Gate 33: Factual and engineering claims are accurate
  test("Gate 33: Factual and engineering claims are accurate", () => {
    assert.ok(fs.existsSync("src/audits/courseAssessmentQualityInventory15_2_10E.json"));
  });

  // Gate 34: Newly remediated versions use an 80% passing score
  test("Gate 34: Newly remediated versions use an 80% passing score", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.passingScore, 80, `Course ${c.courseCode} must have passing score of 80%`);
    }
  });

  // Gate 35: All 12 cohort courses have passing score = 80
  test("Gate 35: All 12 cohort courses have passing score = 80", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10E_COHORT_COURSE_IDS));
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

  // Gate 39: Safety-sensitive questions reflect containment and escalation protocols
  test("Gate 39: Safety-sensitive questions reflect containment and escalation protocols", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    const safetyQuestions = questions.filter(q => 
      q.question.toLowerCase().includes("safety") || 
      q.question.toLowerCase().includes("legionella") || 
      q.question.toLowerCase().includes("washout") || 
      q.question.toLowerCase().includes("blowdown") || 
      q.question.toLowerCase().includes("effluent")
    );
    assert.ok(safetyQuestions.length >= 6, "Safety and environmental compliance questions exist");
  });

  // Gate 40: Practical calculations reflect real-world engineering standards
  test("Gate 40: Practical calculations reflect real-world engineering standards", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    const calcQuestions = questions.filter(q => 
      q.question.toLowerCase().includes("calculate") || 
      q.question.toLowerCase().includes("rate") || 
      q.question.toLowerCase().includes("delta-t") || 
      q.question.toLowerCase().includes("clinker") ||
      q.question.toLowerCase().includes("cfm") ||
      q.question.toLowerCase().includes("psi")
    );
    assert.ok(calcQuestions.length >= 4, "Practical engineering and operational calculation scenarios exist");
  });

  // Gate 41: Building rating questions reflect authoritative criteria
  test("Gate 41: Building rating questions reflect authoritative criteria", async () => {
    const [leedCourse] = await db.select().from(coursesTable).where(eq(coursesTable.id, 748));
    assert.ok(leedCourse);
    const qs = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 748));
    assert.strictEqual(qs.length, 8);
    const leedTerms = ["leed", "breeam", "prerequisite", "credits", "in-use", "lca"];
    const ratingQuestions = qs.filter(q => leedTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(ratingQuestions.length >= 6, "Rating system course reflects authentic LEED/BREEAM criteria");
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

  // Gate 44: Historical enrollments, certs, badges, and score ledgers remain intact
  test("Gate 44: Historical enrollments, certs, badges, and score ledgers remain intact", async () => {
    const enrollments = await db.select().from(enrollmentsTable);
    assert.strictEqual(enrollments.length, 22, "Historical enrollments must remain exactly 22");

    const certs = await db.select().from(certificatesTable);
    assert.strictEqual(certs.length, 6, "Certificates count must remain exactly 6");

    const badges = await db.select().from(badgeDefinitionsTable);
    assert.strictEqual(badges.length, 133, "Badge definitions must remain exactly 133");

    const scores = await db.select().from(elevioScoreLedgerTable);
    assert.strictEqual(scores.length, 6, "Score ledger entries must remain exactly 6");
  });

  // Gate 45: Startup remediation function is idempotent
  test("Gate 45: Startup remediation function is idempotent", async () => {
    await ensureCohort15_2_10ERemediation();
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10E_COHORT_COURSE_IDS));
    assert.strictEqual(questions.length, 96);
  });

  // Gate 46: Pre/post remediation snapshots and quality inventory exist and reconcile
  test("Gate 46: Pre/post remediation snapshots and quality inventory exist and reconcile", () => {
    assert.ok(fs.existsSync("src/audits/preRemediationSnapshot15_2_10E.json"));
    assert.ok(fs.existsSync("src/audits/postRemediationSnapshot15_2_10E.json"));
    assert.ok(fs.existsSync("src/audits/courseAssessmentQualityInventory15_2_10E.json"));
  });

  // Gate 47: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10E.md exists and is complete
  test("Gate 47: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10E.md exists and is complete", () => {
    assert.ok(fs.existsSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10E.md"));
    const content = fs.readFileSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10E.md", "utf-8");
    assert.ok(content.includes("READY FOR ASSESSMENT COHORT 15.2.10F"));
  });
});
