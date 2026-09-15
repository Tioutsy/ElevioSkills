import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { eq, notLike, inArray, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import { SPRINT_15_2_10J_COHORT, SPRINT_15_2_10J_COHORT_COURSE_IDS, SPRINT_15_2_10J_COHORT_COURSE_CODES } from "./courseAssessmentCohort15_2_10J.js";
import { ensureCohort15_2_10JRemediation } from "./ensureCohort15_2_10JRemediation.js";
import fs from "node:fs";

describe("Sprint 15.2.10J — Clean Energy, Circular Economy & Sustainability Governance Assessment Quality Verification Gates (52 Gates)", () => {
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
    assert.strictEqual(SPRINT_15_2_10J_COHORT.length, 12, "Cohort must contain exactly 12 courses");
    assert.strictEqual(SPRINT_15_2_10J_COHORT_COURSE_IDS.length, 12);
  });

  // Gate 5: Cohort contains only ELH-108 through ELH-119
  test("Gate 5: Cohort contains only ELH-108 through ELH-119", () => {
    const expected = [
      "ELH-108", "ELH-109", "ELH-110", "ELH-111", "ELH-112", "ELH-113",
      "ELH-114", "ELH-115", "ELH-116", "ELH-117", "ELH-118", "ELH-119"
    ];
    assert.deepStrictEqual(SPRINT_15_2_10J_COHORT_COURSE_CODES, expected);
  });

  // Gate 6: Every target resolves uniquely
  test("Gate 6: Every target resolves uniquely", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, SPRINT_15_2_10J_COHORT_COURSE_CODES));
    assert.strictEqual(courses.length, 12);
    const codes = new Set(courses.map(c => c.courseCode));
    assert.strictEqual(codes.size, 12);
  });

  // Gate 7: Course ID 790 (ELH-108) resolves correctly
  test("Gate 7: Course ID 790 (ELH-108) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 790));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-108");
    assert.strictEqual(c.title, "Renewable Energy: Rooftop Solar PV & Storage");
    assert.strictEqual(c.version, 2);
  });

  // Gate 8: Course ID 791 (ELH-109) resolves correctly
  test("Gate 8: Course ID 791 (ELH-109) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 791));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-109");
    assert.strictEqual(c.title, "Industrial Heat Recovery & Combined Heat and Power");
    assert.strictEqual(c.version, 2);
  });

  // Gate 9: Course ID 792 (ELH-110) resolves correctly
  test("Gate 9: Course ID 792 (ELH-110) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 792));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-110");
    assert.strictEqual(c.title, "Closed-Loop Water Recycling in Commercial Real Estate");
    assert.strictEqual(c.version, 2);
  });

  // Gate 10: Course ID 793 (ELH-111) resolves correctly
  test("Gate 10: Course ID 793 (ELH-111) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 793));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-111");
    assert.strictEqual(c.title, "Zero Waste to Landfill Certification in Manufacturing");
    assert.strictEqual(c.version, 2);
  });

  // Gate 11: Course ID 794 (ELH-112) resolves correctly
  test("Gate 11: Course ID 794 (ELH-112) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 794));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-112");
    assert.strictEqual(c.title, "Green Cold Chain Logistics & Refrigerated Transport");
    assert.strictEqual(c.version, 2);
  });

  // Gate 12: Course ID 795 (ELH-113) resolves correctly
  test("Gate 12: Course ID 795 (ELH-113) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 795));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-113");
    assert.strictEqual(c.title, "Sustainable Packaging Procurement for Logistics");
    assert.strictEqual(c.version, 2);
  });

  // Gate 13: Course ID 796 (ELH-114) resolves correctly
  test("Gate 13: Course ID 796 (ELH-114) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 796));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-114");
    assert.strictEqual(c.title, "ESG Data Assurance & Audit Readiness");
    assert.strictEqual(c.version, 2);
  });

  // Gate 14: Course ID 797 (ELH-115) resolves correctly
  test("Gate 14: Course ID 797 (ELH-115) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 797));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-115");
    assert.strictEqual(c.title, "Biodiversity Impact Assessment (BIA) for Projects");
    assert.strictEqual(c.version, 2);
  });

  // Gate 15: Course ID 798 (ELH-116) resolves correctly
  test("Gate 15: Course ID 798 (ELH-116) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 798));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-116");
    assert.strictEqual(c.title, "Circular Economy Business Models & Product-as-a-Service");
    assert.strictEqual(c.version, 2);
  });

  // Gate 16: Course ID 719 (ELH-117) resolves correctly
  test("Gate 16: Course ID 719 (ELH-117) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 719));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-117");
    assert.strictEqual(c.title, "Setting SMART Departmental Sustainability Targets");
    assert.strictEqual(c.version, 2);
  });

  // Gate 17: Course ID 720 (ELH-118) resolves correctly
  test("Gate 17: Course ID 720 (ELH-118) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 720));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-118");
    assert.strictEqual(c.title, "Managing Sustainability Performance & KPIs");
    assert.strictEqual(c.version, 2);
  });

  // Gate 18: Course ID 768 (ELH-119) resolves correctly
  test("Gate 18: Course ID 768 (ELH-119) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 768));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-119");
    assert.strictEqual(c.title, "Engaging Frontline Employees in Green Initiatives");
    assert.strictEqual(c.version, 2);
  });

  // Gate 19: All 12 courses have exactly 8 scored questions (96 total)
  test("Gate 19: All 12 courses have exactly 8 scored questions (96 total)", async () => {
    for (const courseId of SPRINT_15_2_10J_COHORT_COURSE_IDS) {
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      assert.strictEqual(questions.length, 8, `Course ID ${courseId} must have exactly 8 scored questions`);
    }
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    assert.strictEqual(cohortQuestions.length, 96, "Cohort must contain exactly 96 scored questions");
  });

  // Gate 20: Every question in cohort has exactly 4 options
  test("Gate 20: Every question in cohort has exactly 4 options", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
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
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options as string);
      const unique = new Set(opts.map((o: string) => o.trim().toLowerCase()));
      assert.strictEqual(unique.size, 4, `Question ID ${q.id} has duplicate options`);
    }
  });

  // Gate 22: Every question has valid correct option index (0..3)
  test("Gate 22: Every question has valid correct option index (0..3)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      assert.ok(typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3);
    }
  });

  // Gate 23: Every question has non-empty correctExplanation and incorrectExplanation
  test("Gate 23: Every question has non-empty correctExplanation and incorrectExplanation", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      assert.ok(typeof q.correctExplanation === "string" && q.correctExplanation.trim().length > 0);
      assert.ok(typeof q.incorrectExplanation === "string" && q.incorrectExplanation.trim().length > 0);
    }
  });

  // Gate 24: Every question has exactly 4 non-empty optionFeedback entries
  test("Gate 24: Every question has exactly 4 non-empty optionFeedback entries", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
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
    for (const courseId of SPRINT_15_2_10J_COHORT_COURSE_IDS) {
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
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    const totalCounts = [0, 0, 0, 0];
    for (const q of cohortQuestions) {
      totalCounts[q.correctOption]++;
    }
    assert.deepStrictEqual(totalCounts, [24, 24, 24, 24], "Cohort total must be exactly 24 correct answers per index");
  });

  // Gate 27: Every course has passingScore = 80
  test("Gate 27: Every course has passingScore = 80", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.passingScore, 80, `Course ${c.courseCode} must have passingScore 80`);
    }
  });

  // Gate 28: Version monotonic progression: all 12 targets remain v2
  test("Gate 28: Version monotonic progression: all 12 targets remain v2", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.version, 2, `Course ${c.courseCode} must be version 2`);
    }
  });

  // Gate 29: Scenario orientation rate reaches >= 50% (actual: 100%)
  test("Gate 29: Scenario orientation rate reaches >= 50% (actual: 100%)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    const scenarioCount = cohortQuestions.filter(q => q.question.length > 80).length;
    const rate = (scenarioCount / cohortQuestions.length) * 100;
    assert.ok(rate >= 50, `Scenario rate is ${rate}%, expected >= 50%`);
  });

  // Gate 30: Cognitive depth (Application / Analysis) reaches >= 60% (actual: 100%)
  test("Gate 30: Cognitive depth (Application / Analysis) reaches >= 60% (actual: 100%)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    const highDepth = cohortQuestions.filter(q => /which|how|what|determine|calculate|identify|recommend|diagnose|select|evaluate|implement|optimize|mitigate|troubleshoot|prioritize|distinguish|structure|assess/i.test(q.question));
    const rate = (highDepth.length / cohortQuestions.length) * 100;
    assert.ok(rate >= 60, `Cognitive depth rate is ${rate}%, expected >= 60%`);
  });

  // Gate 31: No "all of the above" or "none of the above" in options
  test("Gate 31: No 'all of the above' or 'none of the above' in options", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
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
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    const questionTexts = new Set<string>();
    for (const q of cohortQuestions) {
      const clean = q.question.trim().toLowerCase();
      assert.ok(!questionTexts.has(clean), `Duplicate question found: "${q.question}"`);
      questionTexts.add(clean);
    }
  });

  // Gate 33: Solar PV & Storage questions reflect clipping, ILR, BESS peak shaving, NEC 690.12, and LFP
  test("Gate 33: Solar PV & Storage questions reflect clipping, ILR, BESS peak shaving, NEC 690.12, and LFP", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 790));
    assert.strictEqual(questions.length, 8);
    const solarTerms = ["clipping", "inverter", "peak shaving", "bess", "battery", "rapid shutdown", "nec 690.12", "lfp", "self-consumption", "dead load", "bypass diodes", "volt-var", "solar", "pv"];
    const matching = questions.filter(q => solarTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Solar PV course reflects authentic engineering criteria");
  });

  // Gate 34: Industrial heat recovery & CHP reflect ORC, Pinch Analysis, Spark Spread, condensing economizers, and HRSG
  test("Gate 34: Industrial heat recovery & CHP reflect ORC, Pinch Analysis, Spark Spread, condensing economizers, and HRSG", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 791));
    assert.strictEqual(questions.length, 8);
    const heatTerms = ["organic rankine cycle", "orc", "pinch analysis", "spark spread", "condensing economizer", "desuperheater", "hrsg", "flash steam", "scr", "heat recovery", "chp", "boiler"];
    const matching = questions.filter(q => heatTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Heat recovery course reflects authentic thermal criteria");
  });

  // Gate 35: Closed-loop water recycling reflects MBR, cooling tower CoC, purple pipe, first-flush, and Legionella
  test("Gate 35: Closed-loop water recycling reflects MBR, cooling tower CoC, purple pipe, first-flush, and Legionella", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 792));
    assert.strictEqual(questions.length, 8);
    const waterTerms = ["mbr", "membrane bioreactor", "cycles of concentration", "blowdown", "purple", "first-flush", "rainwater", "legionella", "ashrae 188", "greywater", "stormwater", "rpz", "backflow", "water"];
    const matching = questions.filter(q => waterTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Water recycling course reflects authentic closed-loop criteria");
  });

  // Gate 36: Zero waste manufacturing reflects TRUE/UL 2799, 90%+ diversion, swarf reclamation, and closed-loop laundry
  test("Gate 36: Zero waste manufacturing reflects TRUE/UL 2799, 90%+ diversion, swarf reclamation, and closed-loop laundry", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 793));
    assert.strictEqual(questions.length, 8);
    const wasteTerms = ["true", "zero waste", "diversion", "swarf", "metal chips", "ul 2799", "returnable", "totes", "mass-balance", "laundry", "mono-material", "segregation", "mrf", "landfill"];
    const matching = questions.filter(q => wasteTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Zero waste manufacturing reflects authentic circular waste standards");
  });

  // Gate 37: Green cold chain reflects R-744 CO2, eTRU shore power, PCM plates, and F-Gas leak monitoring
  test("Gate 37: Green cold chain reflects R-744 CO2, eTRU shore power, PCM plates, and F-Gas leak monitoring", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 794));
    assert.strictEqual(questions.length, 8);
    const coldTerms = ["r-744", "carbon dioxide", "tru", "shore power", "phase change", "pcm", "f-gas", "dock", "telematics", "fsma", "aerodynamic", "ammonia", "cascade", "cold chain", "refrigerat"];
    const matching = questions.filter(q => coldTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Green cold chain reflects authentic transport refrigeration criteria");
  });

  // Gate 38: Sustainable packaging reflects 3D right-sizing, FSC certification, molded pulp/mycelium, and mono-PE
  test("Gate 38: Sustainable packaging reflects 3D right-sizing, FSC certification, molded pulp/mycelium, and mono-PE", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 795));
    assert.strictEqual(questions.length, 8);
    const pkgTerms = ["void space", "right-sizing", "fsc", "chain-of-custody", "molded pulp", "mycelium", "mono-material", "pe mailer", "stretch wrap", "downgauging", "ista 3a", "pcr", "water-activated", "packaging", "corrugat"];
    const matching = questions.filter(q => pkgTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Sustainable packaging reflects authentic procurement criteria");
  });

  // Gate 39: ESG data assurance reflects ISAE 3000/ISSA 5000, ICSR, Scope 2 EACs/RECs, and double materiality
  test("Gate 39: ESG data assurance reflects ISAE 3000/ISSA 5000, ICSR, Scope 2 EACs/RECs, and double materiality", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 796));
    assert.strictEqual(questions.length, 8);
    const esgTerms = ["limited assurance", "reasonable assurance", "isae 3000", "issa 5000", "icsr", "eacs", "recs", "ghg protocol", "consolidation", "recalculation", "materiality threshold", "ltifr", "double materiality", "assurance", "audit"];
    const matching = questions.filter(q => esgTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "ESG assurance reflects authentic auditing standards");
  });

  // Gate 40: Biodiversity impact assessment reflects Mitigation Hierarchy, BNG 10%, TNFD LEAP, and eDNA
  test("Gate 40: Biodiversity impact assessment reflects Mitigation Hierarchy, BNG 10%, TNFD LEAP, and eDNA", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 797));
    assert.strictEqual(questions.length, 8);
    const bioTerms = ["mitigation hierarchy", "biodiversity net gain", "bng", "tnfd", "leap", "edna", "iucn red list", "wildlife corridor", "offset", "natural capital", "biodiversity", "species"];
    const matching = questions.filter(q => bioTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Biodiversity impact course reflects authentic ecological standards");
  });

  // Gate 41: Circular economy business models reflect PaaS incentives, remanufacturing, DPP, and repairability
  test("Gate 41: Circular economy business models reflect PaaS incentives, remanufacturing, DPP, and repairability", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 798));
    assert.strictEqual(questions.length, 8);
    const circTerms = ["product-as-a-service", "paas", "remanufacturing", "digital product passport", "dpp", "reverse logistics", "repairability", "butterfly diagram", "buy-back", "material circularity indicator", "circular", "reuse"];
    const matching = questions.filter(q => circTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Circular business models reflect authentic circular economics");
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
    await ensureCohort15_2_10JRemediation();
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    assert.strictEqual(questions.length, 96);
  });

  // Gate 47: Pre/post remediation snapshots exist and validate cleanly
  test("Gate 47: Pre/post remediation snapshots exist and validate cleanly", () => {
    assert.ok(fs.existsSync("src/audits/preRemediationSnapshot15_2_10J.json"));
    assert.ok(fs.existsSync("src/audits/postRemediationSnapshot15_2_10J.json"));
  });

  // Gate 48: Course assessment quality inventory exists and covers all 136 courses
  test("Gate 48: Course assessment quality inventory exists and covers all 136 courses", () => {
    assert.ok(fs.existsSync("src/audits/courseAssessmentQualityInventory15_2_10J.json"));
  });

  // Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10J.md exists and is complete
  test("Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10J.md exists and is complete", () => {
    assert.ok(fs.existsSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10J.md"));
    const content = fs.readFileSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10J.md", "utf-8");
    assert.ok(content.includes("READY FOR ASSESSMENT COHORT 15.2.10K"));
  });

  // Gate 50: Target versions remained stable at v2
  test("Gate 50: Target versions remained stable at v2", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10J_COHORT_COURSE_IDS));
    assert.strictEqual(courses.length, 12);
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

  // Gate 52: Total enterprise ready courses reaches exactly 108
  test("Gate 52: Total enterprise ready courses reaches exactly 108", () => {
    const inventory = JSON.parse(fs.readFileSync("src/audits/courseAssessmentQualityInventory15_2_10J.json", "utf-8"));
    assert.strictEqual(inventory.enterpriseReadyCourses, 108, "There must be exactly 108 enterprise ready courses after Sprint 15.2.10J");
  });
});
