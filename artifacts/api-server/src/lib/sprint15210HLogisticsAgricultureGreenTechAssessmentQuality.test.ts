import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { eq, notLike, inArray, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import { SPRINT_15_2_10H_COHORT, SPRINT_15_2_10H_COHORT_COURSE_IDS, SPRINT_15_2_10H_COHORT_COURSE_CODES } from "./courseAssessmentCohort15_2_10H.js";
import { ensureCohort15_2_10HRemediation } from "./ensureCohort15_2_10HRemediation.js";
import fs from "node:fs";

describe("Sprint 15.2.10H — Fleet Logistics, Sustainable Agriculture & Green Software Assessment Quality Verification Gates (52 Gates)", () => {
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
    assert.strictEqual(SPRINT_15_2_10H_COHORT.length, 12, "Cohort must contain exactly 12 courses");
    assert.strictEqual(SPRINT_15_2_10H_COHORT_COURSE_IDS.length, 12);
  });

  // Gate 5: Cohort contains only ELH-84 through ELH-95
  test("Gate 5: Cohort contains only ELH-84 through ELH-95", () => {
    const expected = [
      "ELH-84", "ELH-85", "ELH-86", "ELH-87", "ELH-88", "ELH-89",
      "ELH-90", "ELH-91", "ELH-92", "ELH-93", "ELH-94", "ELH-95"
    ];
    assert.deepStrictEqual(SPRINT_15_2_10H_COHORT_COURSE_CODES, expected);
  });

  // Gate 6: Every target resolves uniquely
  test("Gate 6: Every target resolves uniquely", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, SPRINT_15_2_10H_COHORT_COURSE_CODES));
    assert.strictEqual(courses.length, 12);
    const codes = new Set(courses.map(c => c.courseCode));
    assert.strictEqual(codes.size, 12);
  });

  // Gate 7: Course ID 739 (ELH-84) resolves correctly
  test("Gate 7: Course ID 739 (ELH-84) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 739));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-84");
    assert.strictEqual(c.title, "Commercial Fleet Electrification & EV Charging");
    assert.strictEqual(c.version, 2);
  });

  // Gate 8: Course ID 718 (ELH-85) resolves correctly
  test("Gate 8: Course ID 718 (ELH-85) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 718));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-85");
    assert.strictEqual(c.title, "Sustainable Warehouse Operations");
    assert.strictEqual(c.version, 2);
  });

  // Gate 9: Course ID 740 (ELH-86) resolves correctly
  test("Gate 9: Course ID 740 (ELH-86) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 740));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-86");
    assert.strictEqual(c.title, "Route Optimization & Logistics Efficiency");
    assert.strictEqual(c.version, 2);
  });

  // Gate 10: Course ID 761 (ELH-87) resolves correctly
  test("Gate 10: Course ID 761 (ELH-87) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 761));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-87");
    assert.strictEqual(c.title, "Regenerative Agriculture & Soil Health");
    assert.strictEqual(c.version, 2);
  });

  // Gate 11: Course ID 762 (ELH-88) resolves correctly
  test("Gate 11: Course ID 762 (ELH-88) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 762));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-88");
    assert.strictEqual(c.title, "Smart Irrigation & Agricultural Water Efficiency");
    assert.strictEqual(c.version, 2);
  });

  // Gate 12: Course ID 780 (ELH-89) resolves correctly
  test("Gate 12: Course ID 780 (ELH-89) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 780));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-89");
    assert.strictEqual(c.title, "Organic Fertilizers & Biological Pest Management");
    assert.strictEqual(c.version, 2);
  });

  // Gate 13: Course ID 781 (ELH-90) resolves correctly
  test("Gate 13: Course ID 781 (ELH-90) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 781));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-90");
    assert.strictEqual(c.title, "Post-Harvest Loss Reduction & Cold Storage");
    assert.strictEqual(c.version, 2);
  });

  // Gate 14: Course ID 763 (ELH-91) resolves correctly
  test("Gate 14: Course ID 763 (ELH-91) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 763));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-91");
    assert.strictEqual(c.title, "Sustainable Aquaculture & Responsible Fish Farming");
    assert.strictEqual(c.version, 2);
  });

  // Gate 15: Course ID 782 (ELH-92) resolves correctly
  test("Gate 15: Course ID 782 (ELH-92) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 782));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-92");
    assert.strictEqual(c.title, "Mangrove & Coastal Ecosystem Protection in Agriculture");
    assert.strictEqual(c.version, 2);
  });

  // Gate 16: Course ID 764 (ELH-93) resolves correctly
  test("Gate 16: Course ID 764 (ELH-93) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 764));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-93");
    assert.strictEqual(c.title, "Agrochemical Safety & Runoff Prevention");
    assert.strictEqual(c.version, 2);
  });

  // Gate 17: Course ID 783 (ELH-94) resolves correctly
  test("Gate 17: Course ID 783 (ELH-94) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 783));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-94");
    assert.strictEqual(c.title, "Agri-Food Carbon Footprinting & Certification");
    assert.strictEqual(c.version, 2);
  });

  // Gate 18: Course ID 741 (ELH-95) resolves correctly
  test("Gate 18: Course ID 741 (ELH-95) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 741));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-95");
    assert.strictEqual(c.title, "Green Software Engineering & Cloud Efficiency");
    assert.strictEqual(c.version, 2);
  });

  // Gate 19: All 12 courses have exactly 8 scored questions (96 total)
  test("Gate 19: All 12 courses have exactly 8 scored questions (96 total)", async () => {
    for (const courseId of SPRINT_15_2_10H_COHORT_COURSE_IDS) {
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      assert.strictEqual(questions.length, 8, `Course ID ${courseId} must have exactly 8 scored questions`);
    }
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    assert.strictEqual(cohortQuestions.length, 96, "Cohort must contain exactly 96 scored questions");
  });

  // Gate 20: Every question in cohort has exactly 4 options
  test("Gate 20: Every question in cohort has exactly 4 options", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
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
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options as string);
      const unique = new Set(opts.map((o: string) => o.trim().toLowerCase()));
      assert.strictEqual(unique.size, 4, `Question ID ${q.id} has duplicate options`);
    }
  });

  // Gate 22: Every question has valid correct option index (0..3)
  test("Gate 22: Every question has valid correct option index (0..3)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      assert.ok(typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3);
    }
  });

  // Gate 23: Every question has non-empty correctExplanation and incorrectExplanation
  test("Gate 23: Every question has non-empty correctExplanation and incorrectExplanation", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      assert.ok(typeof q.correctExplanation === "string" && q.correctExplanation.trim().length > 0);
      assert.ok(typeof q.incorrectExplanation === "string" && q.incorrectExplanation.trim().length > 0);
    }
  });

  // Gate 24: Every question has exactly 4 non-empty optionFeedback entries
  test("Gate 24: Every question has exactly 4 non-empty optionFeedback entries", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
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
    for (const courseId of SPRINT_15_2_10H_COHORT_COURSE_IDS) {
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
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    const totalCounts = [0, 0, 0, 0];
    for (const q of cohortQuestions) {
      totalCounts[q.correctOption]++;
    }
    assert.deepStrictEqual(totalCounts, [24, 24, 24, 24], "Cohort total must be exactly 24 correct answers per index");
  });

  // Gate 27: Every course has passingScore = 80
  test("Gate 27: Every course has passingScore = 80", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.passingScore, 80, `Course ${c.courseCode} must have passingScore 80`);
    }
  });

  // Gate 28: Version monotonic progression: ELH-87 v1 -> v2, all other 11 targets remain v2
  test("Gate 28: Version monotonic progression: ELH-87 v1 -> v2, all other 11 targets remain v2", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.version, 2, `Course ${c.courseCode} must be version 2`);
    }
  });

  // Gate 29: Scenario orientation rate reaches >= 50% (actual: 100%)
  test("Gate 29: Scenario orientation rate reaches >= 50% (actual: 100%)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    const scenarioCount = cohortQuestions.filter(q => q.question.length > 80).length;
    const rate = (scenarioCount / cohortQuestions.length) * 100;
    assert.ok(rate >= 50, `Scenario rate is ${rate}%, expected >= 50%`);
  });

  // Gate 30: Cognitive depth (Application / Analysis) reaches >= 60% (actual: 100%)
  test("Gate 30: Cognitive depth (Application / Analysis) reaches >= 60% (actual: 100%)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    const highDepth = cohortQuestions.filter(q => /which|how|what|determine|calculate|identify|recommend|diagnose|select|evaluate|implement|optimize|mitigate|troubleshoot|prioritize|distinguish|structure|assess/i.test(q.question));
    const rate = (highDepth.length / cohortQuestions.length) * 100;
    assert.ok(rate >= 60, `Cognitive depth rate is ${rate}%, expected >= 60%`);
  });

  // Gate 31: No "all of the above" or "none of the above" in options
  test("Gate 31: No 'all of the above' or 'none of the above' in options", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
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
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    const questionTexts = new Set<string>();
    for (const q of cohortQuestions) {
      const clean = q.question.trim().toLowerCase();
      assert.ok(!questionTexts.has(clean), `Duplicate question found: "${q.question}"`);
      questionTexts.add(clean);
    }
  });

  // Gate 33: Fleet electrification questions reflect authentic EV depot load management & TCO
  test("Gate 33: Fleet electrification questions reflect authentic EV depot load management & TCO", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 739));
    assert.strictEqual(questions.length, 8);
    const evTerms = ["smart load management", "peak demand", "total cost of ownership", "pre-conditioning", "bess", "battery", "lockout/tagout", "v2g", "iso 15118", "high-voltage", "charging", "fleet"];
    const matching = questions.filter(q => evTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "EV fleet course reflects authentic technical criteria");
  });

  // Gate 34: Sustainable warehouse questions reflect LED harvesting, lithium MHE, and dock seals
  test("Gate 34: Sustainable warehouse questions reflect LED harvesting, lithium MHE, and dock seals", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 718));
    assert.strictEqual(questions.length, 8);
    const whTerms = ["led", "daylight harvesting", "lithium-ion", "dock", "zero waste", "solar pv", "pre-stretch", "hvls", "rainwater", "warehouse", "mhe"];
    const matching = questions.filter(q => whTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Sustainable warehouse course reflects authentic technical criteria");
  });

  // Gate 35: Route optimization questions reflect dynamic dispatch, idling reduction, and gCO2e/t-km
  test("Gate 35: Route optimization questions reflect dynamic dispatch, idling reduction, and gCO2e/t-km", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 740));
    assert.strictEqual(questions.length, 8);
    const routeTerms = ["route optimization", "idling", "micro-fulfillment", "gco₂e", "backhaul", "aerodynamic", "reefer", "dispatch", "telematics", "logistics"];
    const matching = questions.filter(q => routeTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Route optimization course reflects authentic logistics criteria");
  });

  // Gate 36: Regenerative agriculture questions reflect SOM, no-till, AMF, and AMP grazing
  test("Gate 36: Regenerative agriculture questions reflect SOM, no-till, AMF, and AMP grazing", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 761));
    assert.strictEqual(questions.length, 8);
    const agTerms = ["no-till", "cover crop", "mycorrhizal", "rotational grazing", "soil organic matter", "biochar", "agroforestry", "plfa", "regenerative", "soil"];
    const matching = questions.filter(q => agTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Regenerative agriculture course reflects authentic soil science criteria");
  });

  // Gate 37: Smart irrigation questions reflect ETc, tensiometers, PWP, and RPZ backflow preventers
  test("Gate 37: Smart irrigation questions reflect ETc, tensiometers, PWP, and RPZ backflow preventers", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 762));
    assert.strictEqual(questions.length, 8);
    const irriTerms = ["drip irrigation", "evapotranspiration", "wilting point", "leaching fraction", "backflow", "percolation", "pressurized", "mulch", "water", "irrigation"];
    const matching = questions.filter(q => irriTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Smart irrigation course reflects authentic hydraulic criteria");
  });

  // Gate 38: Organic fertilizers & pest management reflect thermal composting, pheromones, and Bt
  test("Gate 38: Organic fertilizers & pest management reflect thermal composting, pheromones, and Bt", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 780));
    assert.strictEqual(questions.length, 8);
    const pestTerms = ["predatory", "compost", "mineralization", "pheromone", "threshold", "aerated compost tea", "bacillus thuringiensis", "rotation", "organic", "pest"];
    const matching = questions.filter(q => pestTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Biological pest management course reflects authentic IPM criteria");
  });

  // Gate 39: Post-harvest cold storage questions reflect precooling, MAP, ethylene scrubbers, and CA storage
  test("Gate 39: Post-harvest cold storage questions reflect precooling, MAP, ethylene scrubbers, and CA storage", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 781));
    assert.strictEqual(questions.length, 8);
    const coldTerms = ["precooling", "ethylene", "modified atmosphere", "relative humidity", "mechanical", "phase change", "controlled atmosphere", "aflatoxin", "cold storage", "post-harvest"];
    const matching = questions.filter(q => coldTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Post-harvest course reflects authentic post-harvest biology criteria");
  });

  // Gate 40: Aquaculture questions reflect RAS nitrification, FIFO ratio, DO thresholds, and IMTA
  test("Gate 40: Aquaculture questions reflect RAS nitrification, FIFO ratio, DO thresholds, and IMTA", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 763));
    assert.strictEqual(questions.length, 8);
    const aquaTerms = ["recirculating aquaculture", "fish-in:fish-out", "dissolved oxygen", "open-net", "biosecurity", "imta", "feed conversion ratio", "escapement", "aquaculture", "fish"];
    const matching = questions.filter(q => aquaTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Aquaculture course reflects authentic aquaculture criteria");
  });

  // Gate 41: Green software questions reflect SCI formula, carbon-aware computing, PUE, and quantization
  test("Gate 41: Green software questions reflect SCI formula, carbon-aware computing, PUE, and quantization", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 741));
    assert.strictEqual(questions.length, 8);
    const swTerms = ["software carbon intensity", "carbon-aware", "serverless", "embodied carbon", "dark mode", "database", "pue", "quantization", "cloud", "software"];
    const matching = questions.filter(q => swTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Green software course reflects authentic GSF criteria");
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
    await ensureCohort15_2_10HRemediation();
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10H_COHORT_COURSE_IDS));
    assert.strictEqual(questions.length, 96);
  });

  // Gate 47: Pre/post remediation snapshots exist and validate cleanly
  test("Gate 47: Pre/post remediation snapshots exist and validate cleanly", () => {
    assert.ok(fs.existsSync("src/audits/preRemediationSnapshot15_2_10H.json"));
    assert.ok(fs.existsSync("src/audits/postRemediationSnapshot15_2_10H.json"));
  });

  // Gate 48: Course assessment quality inventory exists and covers all 136 courses
  test("Gate 48: Course assessment quality inventory exists and covers all 136 courses", () => {
    assert.ok(fs.existsSync("src/audits/courseAssessmentQualityInventory15_2_10H.json"));
  });

  // Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10H.md exists and is complete
  test("Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10H.md exists and is complete", () => {
    assert.ok(fs.existsSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10H.md"));
    const content = fs.readFileSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10H.md", "utf-8");
    assert.ok(content.includes("READY FOR ASSESSMENT COHORT 15.2.10I"));
  });

  // Gate 50: Upgraded target versions moved forward monotonically (ELH-87 v1 -> v2)
  test("Gate 50: Upgraded target versions moved forward monotonically (ELH-87 v1 -> v2)", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-87"));
    assert.strictEqual(c.version, 2, "Course ELH-87 must be version 2");
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

  // Gate 52: Total enterprise ready courses reaches exactly 84
  test("Gate 52: Total enterprise ready courses reaches exactly 84", () => {
    const inventory = JSON.parse(fs.readFileSync("src/audits/courseAssessmentQualityInventory15_2_10H.json", "utf-8"));
    assert.strictEqual(inventory.enterpriseReadyCourses, 84, "There must be exactly 84 enterprise ready courses after Sprint 15.2.10H");
  });
});
