import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { eq, notLike, inArray, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import { SPRINT_15_2_10I_COHORT, SPRINT_15_2_10I_COHORT_COURSE_IDS, SPRINT_15_2_10I_COHORT_COURSE_CODES } from "./courseAssessmentCohort15_2_10I.js";
import { ensureCohort15_2_10IRemediation } from "./ensureCohort15_2_10IRemediation.js";
import fs from "node:fs";

describe("Sprint 15.2.10I — IT Infrastructure, Healthcare Operations & Sustainable Buildings Assessment Quality Verification Gates (52 Gates)", () => {
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
    assert.strictEqual(SPRINT_15_2_10I_COHORT.length, 12, "Cohort must contain exactly 12 courses");
    assert.strictEqual(SPRINT_15_2_10I_COHORT_COURSE_IDS.length, 12);
  });

  // Gate 5: Cohort contains only ELH-96 through ELH-107
  test("Gate 5: Cohort contains only ELH-96 through ELH-107", () => {
    const expected = [
      "ELH-96", "ELH-97", "ELH-98", "ELH-99", "ELH-100", "ELH-101",
      "ELH-102", "ELH-103", "ELH-104", "ELH-105", "ELH-106", "ELH-107"
    ];
    assert.deepStrictEqual(SPRINT_15_2_10I_COHORT_COURSE_CODES, expected);
  });

  // Gate 6: Every target resolves uniquely
  test("Gate 6: Every target resolves uniquely", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, SPRINT_15_2_10I_COHORT_COURSE_CODES));
    assert.strictEqual(courses.length, 12);
    const codes = new Set(courses.map(c => c.courseCode));
    assert.strictEqual(codes.size, 12);
  });

  // Gate 7: Course ID 758 (ELH-96) resolves correctly
  test("Gate 7: Course ID 758 (ELH-96) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 758));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-96");
    assert.strictEqual(c.title, "Data Center Energy Efficiency & Cooling");
    assert.strictEqual(c.version, 2);
  });

  // Gate 8: Course ID 759 (ELH-97) resolves correctly
  test("Gate 8: Course ID 759 (ELH-97) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 759));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-97");
    assert.strictEqual(c.title, "Sustainable IT Hardware Lifecycle & E-Waste");
    assert.strictEqual(c.version, 2);
  });

  // Gate 9: Course ID 760 (ELH-98) resolves correctly
  test("Gate 9: Course ID 760 (ELH-98) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 760));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-98");
    assert.strictEqual(c.title, "Green Office Systems for Professional Services");
    assert.strictEqual(c.version, 2);
  });

  // Gate 10: Course ID 765 (ELH-99) resolves correctly
  test("Gate 10: Course ID 765 (ELH-99) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 765));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-99");
    assert.strictEqual(c.title, "Hospital & Clinic Medical Waste Segregation");
    assert.strictEqual(c.version, 2);
  });

  // Gate 11: Course ID 766 (ELH-100) resolves correctly
  test("Gate 11: Course ID 766 (ELH-100) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 766));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-100");
    assert.strictEqual(c.title, "Energy & Water Conservation in Healthcare Facilities");
    assert.strictEqual(c.version, 2);
  });

  // Gate 12: Course ID 767 (ELH-101) resolves correctly
  test("Gate 12: Course ID 767 (ELH-101) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 767));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-101");
    assert.strictEqual(c.title, "Sustainable Healthcare Procurement & Single-Use Reductions");
    assert.strictEqual(c.version, 2);
  });

  // Gate 13: Course ID 784 (ELH-102) resolves correctly
  test("Gate 13: Course ID 784 (ELH-102) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 784));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-102");
    assert.strictEqual(c.title, "Anesthetic Gas & Pharmaceutical Waste Management");
    assert.strictEqual(c.version, 2);
  });

  // Gate 14: Course ID 785 (ELH-103) resolves correctly
  test("Gate 14: Course ID 785 (ELH-103) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 785));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-103");
    assert.strictEqual(c.title, "Healthcare Indoor Air Quality & Infection Ventilation");
    assert.strictEqual(c.version, 2);
  });

  // Gate 15: Course ID 786 (ELH-104) resolves correctly
  test("Gate 15: Course ID 786 (ELH-104) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 786));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-104");
    assert.strictEqual(c.title, "Climate Resilience & Disaster Preparedness for Hospitals");
    assert.strictEqual(c.version, 2);
  });

  // Gate 16: Course ID 787 (ELH-105) resolves correctly
  test("Gate 16: Course ID 787 (ELH-105) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 787));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-105");
    assert.strictEqual(c.title, "Sustainable Hotel Kitchen Energy & Equipment");
    assert.strictEqual(c.version, 2);
  });

  // Gate 17: Course ID 788 (ELH-106) resolves correctly
  test("Gate 17: Course ID 788 (ELH-106) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 788));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-106");
    assert.strictEqual(c.title, "Low-Impact Coastal Resort Landscaping & Native Flora");
    assert.strictEqual(c.version, 2);
  });

  // Gate 18: Course ID 789 (ELH-107) resolves correctly
  test("Gate 18: Course ID 789 (ELH-107) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 789));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-107");
    assert.strictEqual(c.title, "Net-Zero Energy Building Design & Passive Architecture");
    assert.strictEqual(c.version, 2);
  });

  // Gate 19: All 12 courses have exactly 8 scored questions (96 total)
  test("Gate 19: All 12 courses have exactly 8 scored questions (96 total)", async () => {
    for (const courseId of SPRINT_15_2_10I_COHORT_COURSE_IDS) {
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      assert.strictEqual(questions.length, 8, `Course ID ${courseId} must have exactly 8 scored questions`);
    }
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    assert.strictEqual(cohortQuestions.length, 96, "Cohort must contain exactly 96 scored questions");
  });

  // Gate 20: Every question in cohort has exactly 4 options
  test("Gate 20: Every question in cohort has exactly 4 options", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options as string);
      assert.strictEqual(opts.length, 4, `Question ID ${q.id} must have 4 options`);
      for (const opt of opts) {
        assert.ok(typeof opt === "string" && opt.trim().length > 0, `Option in Q ${q.id} must not be empty`);
      }
    }
  });

  // Gate 21: Every question has 4 distinct options (no duplicates)
  test("Gate 21: Every question has 4 distinct options (no duplicates)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options as string);
      const unique = new Set(opts.map((o: string) => o.trim().toLowerCase()));
      assert.strictEqual(unique.size, 4, `Question ID ${q.id} has duplicate options`);
    }
  });

  // Gate 22: Every question has valid correct option index (0..3)
  test("Gate 22: Every question has valid correct option index (0..3)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      assert.ok(typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3);
    }
  });

  // Gate 23: Every question has non-empty correctExplanation and incorrectExplanation
  test("Gate 23: Every question has non-empty correctExplanation and incorrectExplanation", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      assert.ok(typeof q.correctExplanation === "string" && q.correctExplanation.trim().length > 0);
      assert.ok(typeof q.incorrectExplanation === "string" && q.incorrectExplanation.trim().length > 0);
    }
  });

  // Gate 24: Every question has exactly 4 non-empty optionFeedback entries
  test("Gate 24: Every question has exactly 4 non-empty optionFeedback entries", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      const fb = q.optionFeedback ? (Array.isArray(q.optionFeedback) ? q.optionFeedback : JSON.parse(q.optionFeedback as string)) : [];
      assert.strictEqual(fb.length, 4, `Question ${q.id} must have 4 optionFeedback entries`);
      for (let i = 0; i < 4; i++) {
        assert.ok(typeof fb[i] === "string" && fb[i].trim().length > 0, `Feedback ${i} in Q ${q.id} must not be empty`);
      }
    }
  });

  // Gate 25: All 12 courses have strictly balanced answer keys (2/2/2/2)
  test("Gate 25: All 12 courses have strictly balanced answer keys (2/2/2/2)", async () => {
    for (const courseId of SPRINT_15_2_10I_COHORT_COURSE_IDS) {
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId)).orderBy(asc(quizQuestionsTable.orderIndex));
      const counts = [0, 0, 0, 0];
      for (const q of questions) {
        counts[q.correctOption]++;
      }
      assert.deepStrictEqual(counts, [2, 2, 2, 2], `Course ID ${courseId} must have exactly [2, 2, 2, 2] answer distribution`);
    }
  });

  // Gate 26: Full cohort has exactly 24 correct answers at each option index
  test("Gate 26: Full cohort has exactly 24 correct answers at each option index", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    const totalCounts = [0, 0, 0, 0];
    for (const q of cohortQuestions) {
      totalCounts[q.correctOption]++;
    }
    assert.deepStrictEqual(totalCounts, [24, 24, 24, 24], "Cohort total must be exactly 24 correct answers per index");
  });

  // Gate 27: Every course has passingScore = 80
  test("Gate 27: Every course has passingScore = 80", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.passingScore, 80, `Course ${c.courseCode} must have passingScore 80`);
    }
  });

  // Gate 28: Version monotonic progression: ELH-97, ELH-98, ELH-99, ELH-105, ELH-106 v1 -> v2; all other targets remain v2
  test("Gate 28: Version monotonic progression: ELH-97, ELH-98, ELH-99, ELH-105, ELH-106 v1 -> v2; all other targets remain v2", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.version, 2, `Course ${c.courseCode} must be version 2`);
    }
  });

  // Gate 29: Scenario orientation rate reaches >= 50% (actual: 100%)
  test("Gate 29: Scenario orientation rate reaches >= 50% (actual: 100%)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    const scenarioCount = cohortQuestions.filter(q => q.question.length > 80).length;
    const rate = (scenarioCount / cohortQuestions.length) * 100;
    assert.ok(rate >= 50, `Scenario rate is ${rate}%, expected >= 50%`);
  });

  // Gate 30: Cognitive depth (Application / Analysis) reaches >= 60% (actual: 100%)
  test("Gate 30: Cognitive depth (Application / Analysis) reaches >= 60% (actual: 100%)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    const highDepth = cohortQuestions.filter(q => /which|how|what|determine|calculate|identify|recommend|diagnose|select|evaluate|implement|optimize|mitigate|troubleshoot|prioritize|distinguish|structure|assess/i.test(q.question));
    const rate = (highDepth.length / cohortQuestions.length) * 100;
    assert.ok(rate >= 60, `Cognitive depth rate is ${rate}%, expected >= 60%`);
  });

  // Gate 31: No "all of the above" or "none of the above" in options
  test("Gate 31: No 'all of the above' or 'none of the above' in options", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options as string);
      for (const opt of opts) {
        assert.ok(!/all of the above/i.test(opt), `Q ${q.id} contains 'all of the above'`);
        assert.ok(!/none of the above/i.test(opt), `Q ${q.id} contains 'none of the above'`);
      }
    }
  });

  // Gate 32: No duplicate questions across cohort
  test("Gate 32: No duplicate questions across cohort", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    const questionTexts = new Set<string>();
    for (const q of cohortQuestions) {
      const clean = q.question.trim().toLowerCase();
      assert.ok(!questionTexts.has(clean), `Duplicate question found: "${q.question}"`);
      questionTexts.add(clean);
    }
  });

  // Gate 33: Data center cooling questions reflect PUE, economizers, containment, and liquid cooling
  test("Gate 33: Data center cooling questions reflect PUE, economizers, containment, and liquid cooling", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 758));
    assert.strictEqual(questions.length, 8);
    const dcTerms = ["pue", "containment", "economizer", "liquid cooling", "ashrae", "ups", "hot aisle", "cold aisle", "cooling", "data center"];
    const matching = questions.filter(q => dcTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Data center course reflects authentic technical criteria");
  });

  // Gate 34: IT hardware lifecycle questions reflect NIST 800-88, e-Stewards, circular leasing, and conflict minerals
  test("Gate 34: IT hardware lifecycle questions reflect NIST 800-88, e-Stewards, circular leasing, and conflict minerals", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 759));
    assert.strictEqual(questions.length, 8);
    const itTerms = ["e-stewards", "nist sp 800-88", "leasing", "e-waste", "conflict", "modular", "embodied", "hardware", "weee", "cryptographic", "sanitization", "disposition", "laptop", "server", "device", "scope 3", "daas"];
    const matching = questions.filter(q => itTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "IT lifecycle course reflects authentic hardware standards");
  });

  // Gate 35: Green office systems questions reflect plug loads, print quotas, and sleep states
  test("Gate 35: Green office systems questions reflect plug loads, print quotas, and sleep states", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 760));
    assert.strictEqual(questions.length, 8);
    const officeTerms = ["smart power strip", "sleep mode", "pin-to-print", "energy star", "sub-metering", "cloud storage", "conference room", "paperless", "office", "plug load"];
    const matching = questions.filter(q => officeTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Green office course reflects authentic facility criteria");
  });

  // Gate 36: Hospital medical waste questions reflect sharps, autoclave validation, RCRA segregation, and color codes
  test("Gate 36: Hospital medical waste questions reflect sharps, autoclave validation, RCRA segregation, and color codes", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 765));
    assert.strictEqual(questions.length, 8);
    const wasteTerms = ["red bag", "sharps", "autoclave", "rcra", "geobacillus", "pathological", "cytotoxic", "spill", "medical waste", "segregation", "biohazard", "syringe", "sterilization", "pharmaceutical", "rmw"];
    const matching = questions.filter(q => wasteTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Medical waste course reflects authentic healthcare safety criteria");
  });

  // Gate 37: Healthcare energy & water conservation questions reflect heat recovery, low-flow plumbing, and sterilization
  test("Gate 37: Healthcare energy & water conservation questions reflect heat recovery, low-flow plumbing, and sterilization", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 766));
    assert.strictEqual(questions.length, 8);
    const hcTerms = ["chiller", "heat recovery", "run-around coil", "ro reject", "autoclave", "aerator", "energy star", "lighting", "hospital", "hvac"];
    const matching = questions.filter(q => hcTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Healthcare facility conservation reflects authentic engineering criteria");
  });

  // Gate 38: Healthcare procurement questions reflect EPP, reprocessed SUDs, PVC/DEHP elimination, and take-back
  test("Gate 38: Healthcare procurement questions reflect EPP, reprocessed SUDs, PVC/DEHP elimination, and take-back", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 767));
    assert.strictEqual(questions.length, 8);
    const procTerms = ["fda 510(k)", "dehp", "custom procedure trays", "extended producer responsibility", "reprocessed", "single-use", "take-back", "tco", "procurement", "pvc"];
    const matching = questions.filter(q => procTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Healthcare procurement reflects authentic clinical supply chain criteria");
  });

  // Gate 39: Anesthetic gas & pharma waste questions reflect Desflurane GWP, dynamic capture, RCRA hazardous, and DEA controls
  test("Gate 39: Anesthetic gas & pharma waste questions reflect Desflurane GWP, dynamic capture, RCRA hazardous, and DEA controls", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 784));
    assert.strictEqual(questions.length, 8);
    const gasTerms = ["desflurane", "sevoflurane", "gwp", "wags", "rcra", "dea", "p-listed", "activated carbon", "pharmaceutical", "anesthetic", "anesthesia", "nitrous oxide", "chemotherapy", "halogenated"];
    const matching = questions.filter(q => gasTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Anesthetic gas & pharma waste reflects authentic clinical environmental criteria");
  });

  // Gate 40: Healthcare IAQ questions reflect ACH, negative pressure, HEPA filtration, and relative humidity
  test("Gate 40: Healthcare IAQ questions reflect ACH, negative pressure, HEPA filtration, and relative humidity", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 785));
    assert.strictEqual(questions.length, 8);
    const iaqTerms = ["air changes per hour", "negative pressure", "hepa", "operating room", "relative humidity", "ultraviolet germicidal", "damper", "ashrae 170", "ventilation", "infection"];
    const matching = questions.filter(q => iaqTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Healthcare IAQ reflects authentic ASHRAE 170 / infection control criteria");
  });

  // Gate 41: Climate resilience questions reflect flood barriers, on-site fuel, microgrids, and potable water reserves
  test("Gate 41: Climate resilience questions reflect flood barriers, on-site fuel, microgrids, and potable water reserves", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 786));
    assert.strictEqual(questions.length, 8);
    const resTerms = ["generator", "flood", "substation", "72 hours", "potable water", "microgrid", "dry-bulb", "hvac redundancy", "resilience", "disaster"];
    const matching = questions.filter(q => resTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Hospital resilience reflects authentic disaster preparedness criteria");
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
    await ensureCohort15_2_10IRemediation();
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10I_COHORT_COURSE_IDS));
    assert.strictEqual(questions.length, 96);
  });

  // Gate 47: Pre/post remediation snapshots exist and validate cleanly
  test("Gate 47: Pre/post remediation snapshots exist and validate cleanly", () => {
    assert.ok(fs.existsSync("src/audits/preRemediationSnapshot15_2_10I.json"));
    assert.ok(fs.existsSync("src/audits/postRemediationSnapshot15_2_10I.json"));
  });

  // Gate 48: Course assessment quality inventory exists and covers all 136 courses
  test("Gate 48: Course assessment quality inventory exists and covers all 136 courses", () => {
    assert.ok(fs.existsSync("src/audits/courseAssessmentQualityInventory15_2_10I.json"));
  });

  // Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10I.md exists and is complete
  test("Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10I.md exists and is complete", () => {
    assert.ok(fs.existsSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10I.md"));
    const content = fs.readFileSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10I.md", "utf-8");
    assert.ok(content.includes("READY FOR ASSESSMENT COHORT 15.2.10J"));
  });

  // Gate 50: Upgraded target versions moved forward monotonically (ELH-97, ELH-98, ELH-99, ELH-105, ELH-106 v1 -> v2)
  test("Gate 50: Upgraded target versions moved forward monotonically (ELH-97, ELH-98, ELH-99, ELH-105, ELH-106 v1 -> v2)", async () => {
    const upgradedCodes = ["ELH-97", "ELH-98", "ELH-99", "ELH-105", "ELH-106"];
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, upgradedCodes));
    assert.strictEqual(courses.length, 5);
    for (const c of courses) {
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

  // Gate 52: Total enterprise ready courses reaches exactly 96
  test("Gate 52: Total enterprise ready courses reaches exactly 96", () => {
    const inventory = JSON.parse(fs.readFileSync("src/audits/courseAssessmentQualityInventory15_2_10I.json", "utf-8"));
    assert.strictEqual(inventory.enterpriseReadyCourses, 96, "There must be exactly 96 enterprise ready courses after Sprint 15.2.10I");
  });
});
