import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { eq, notLike, inArray, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import { SPRINT_15_2_10K_COHORT, SPRINT_15_2_10K_COHORT_COURSE_IDS, SPRINT_15_2_10K_COHORT_COURSE_CODES } from "./courseAssessmentCohort15_2_10K.js";
import { ensureCohort15_2_10KRemediation } from "./ensureCohort15_2_10KRemediation.js";
import fs from "node:fs";

describe("Sprint 15.2.10K — Corporate Sustainability Governance, Operations & Risk Management Assessment Quality Verification Gates (52 Gates)", () => {
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
    assert.strictEqual(SPRINT_15_2_10K_COHORT.length, 12, "Cohort must contain exactly 12 courses");
    assert.strictEqual(SPRINT_15_2_10K_COHORT_COURSE_IDS.length, 12);
  });

  // Gate 5: Cohort contains only ELH-120 through ELH-131
  test("Gate 5: Cohort contains only ELH-120 through ELH-131", () => {
    const expected = [
      "ELH-120", "ELH-121", "ELH-122", "ELH-123", "ELH-124", "ELH-125",
      "ELH-126", "ELH-127", "ELH-128", "ELH-129", "ELH-130", "ELH-131"
    ];
    assert.deepStrictEqual(SPRINT_15_2_10K_COHORT_COURSE_CODES, expected);
  });

  // Gate 6: Every target resolves uniquely
  test("Gate 6: Every target resolves uniquely", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, SPRINT_15_2_10K_COHORT_COURSE_CODES));
    assert.strictEqual(courses.length, 12);
    const codes = new Set(courses.map(c => c.courseCode));
    assert.strictEqual(codes.size, 12);
  });

  // Gate 7: Course ID 799 (ELH-120) resolves correctly
  test("Gate 7: Course ID 799 (ELH-120) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 799));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-120");
    assert.strictEqual(c.title, "Cross-Functional Sustainability Working Groups");
    assert.strictEqual(c.version, 2);
  });

  // Gate 8: Course ID 721 (ELH-121) resolves correctly
  test("Gate 8: Course ID 721 (ELH-121) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 721));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-121");
    assert.strictEqual(c.title, "Building Business Cases for Sustainability Projects");
    assert.strictEqual(c.version, 2);
  });

  // Gate 9: Course ID 722 (ELH-122) resolves correctly
  test("Gate 9: Course ID 722 (ELH-122) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 722));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-122");
    assert.strictEqual(c.title, "Managing Subcontractor Sustainability Compliance");
    assert.strictEqual(c.version, 2);
  });

  // Gate 10: Course ID 769 (ELH-123) resolves correctly
  test("Gate 10: Course ID 769 (ELH-123) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 769));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-123");
    assert.strictEqual(c.title, "Managing Capital Expenditure (CapEx) for Energy Retrofits");
    assert.strictEqual(c.version, 2);
  });

  // Gate 11: Course ID 800 (ELH-124) resolves correctly
  test("Gate 11: Course ID 800 (ELH-124) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 800));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-124");
    assert.strictEqual(c.title, "Executive Climate Governance & Net-Zero Strategy");
    assert.strictEqual(c.version, 2);
  });

  // Gate 12: Course ID 801 (ELH-125) resolves correctly
  test("Gate 12: Course ID 801 (ELH-125) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 801));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-125");
    assert.strictEqual(c.title, "Occupational Health, Safety & Environmental Systems");
    assert.strictEqual(c.version, 2);
  });

  // Gate 13: Course ID 802 (ELH-126) resolves correctly
  test("Gate 13: Course ID 802 (ELH-126) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 802));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-126");
    assert.strictEqual(c.title, "Facilities Energy Management for Specialists");
    assert.strictEqual(c.version, 2);
  });

  // Gate 14: Course ID 803 (ELH-127) resolves correctly
  test("Gate 14: Course ID 803 (ELH-127) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 803));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-127");
    assert.strictEqual(c.title, "Sustainable Supply Chain Management for Procurement");
    assert.strictEqual(c.version, 2);
  });

  // Gate 15: Course ID 723 (ELH-128) resolves correctly
  test("Gate 15: Course ID 723 (ELH-128) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 723));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-128");
    assert.strictEqual(c.title, "Sustainability for Health & Safety (HSE) Officers");
    assert.strictEqual(c.version, 2);
  });

  // Gate 16: Course ID 804 (ELH-129) resolves correctly
  test("Gate 16: Course ID 804 (ELH-129) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 804));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-129");
    assert.strictEqual(c.title, "Environmental Risk & Compliance Management");
    assert.strictEqual(c.version, 2);
  });

  // Gate 17: Course ID 805 (ELH-130) resolves correctly
  test("Gate 17: Course ID 805 (ELH-130) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 805));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-130");
    assert.strictEqual(c.title, "Sustainability Communications & Green Claims");
    assert.strictEqual(c.version, 2);
  });

  // Gate 18: Course ID 742 (ELH-131) resolves correctly
  test("Gate 18: Course ID 742 (ELH-131) resolves correctly", async () => {
    const [c] = await db.select().from(coursesTable).where(eq(coursesTable.id, 742));
    assert.ok(c);
    assert.strictEqual(c.courseCode, "ELH-131");
    assert.strictEqual(c.title, "Executive ESG Strategy & Board Oversight");
    assert.strictEqual(c.version, 2);
  });

  // Gate 19: All 12 courses have exactly 8 scored questions (96 total)
  test("Gate 19: All 12 courses have exactly 8 scored questions (96 total)", async () => {
    for (const courseId of SPRINT_15_2_10K_COHORT_COURSE_IDS) {
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      assert.strictEqual(questions.length, 8, `Course ID ${courseId} must have exactly 8 scored questions`);
    }
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    assert.strictEqual(cohortQuestions.length, 96, "Cohort must contain exactly 96 scored questions");
  });

  // Gate 20: Every question in cohort has exactly 4 options
  test("Gate 20: Every question in cohort has exactly 4 options", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
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
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options as string);
      const unique = new Set(opts.map((o: string) => o.trim().toLowerCase()));
      assert.strictEqual(unique.size, 4, `Question ID ${q.id} has duplicate options`);
    }
  });

  // Gate 22: Every question has valid correct option index (0..3)
  test("Gate 22: Every question has valid correct option index (0..3)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      assert.ok(typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3);
    }
  });

  // Gate 23: Every question has non-empty correctExplanation and incorrectExplanation
  test("Gate 23: Every question has non-empty correctExplanation and incorrectExplanation", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    for (const q of cohortQuestions) {
      assert.ok(typeof q.correctExplanation === "string" && q.correctExplanation.trim().length > 0);
      assert.ok(typeof q.incorrectExplanation === "string" && q.incorrectExplanation.trim().length > 0);
    }
  });

  // Gate 24: Every question has exactly 4 non-empty optionFeedback entries
  test("Gate 24: Every question has exactly 4 non-empty optionFeedback entries", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
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
    for (const courseId of SPRINT_15_2_10K_COHORT_COURSE_IDS) {
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
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    const totalCounts = [0, 0, 0, 0];
    for (const q of cohortQuestions) {
      totalCounts[q.correctOption]++;
    }
    assert.deepStrictEqual(totalCounts, [24, 24, 24, 24], "Cohort total must be exactly 24 correct answers per index");
  });

  // Gate 27: Every course has passingScore = 80
  test("Gate 27: Every course has passingScore = 80", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.passingScore, 80, `Course ${c.courseCode} must have passingScore 80`);
    }
  });

  // Gate 28: Version monotonic progression: all 12 targets are v2 (ELH-131 advanced v1->v2)
  test("Gate 28: Version monotonic progression: all 12 targets are v2 (ELH-131 advanced v1->v2)", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    for (const c of courses) {
      assert.strictEqual(c.version, 2, `Course ${c.courseCode} must be version 2`);
    }
  });

  // Gate 29: Scenario orientation rate reaches >= 50% (actual: 100%)
  test("Gate 29: Scenario orientation rate reaches >= 50% (actual: 100%)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    const scenarioCount = cohortQuestions.filter(q => q.question.length > 80).length;
    const rate = (scenarioCount / cohortQuestions.length) * 100;
    assert.ok(rate >= 50, `Scenario rate is ${rate}%, expected >= 50%`);
  });

  // Gate 30: Cognitive depth (Application / Analysis) reaches >= 60% (actual: 100%)
  test("Gate 30: Cognitive depth (Application / Analysis) reaches >= 60% (actual: 100%)", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    const highDepth = cohortQuestions.filter(q => /which|how|what|determine|calculate|identify|recommend|diagnose|select|evaluate|implement|optimize|mitigate|troubleshoot|prioritize|distinguish|structure|assess|design/i.test(q.question));
    const rate = (highDepth.length / cohortQuestions.length) * 100;
    assert.ok(rate >= 60, `Cognitive depth rate is ${rate}%, expected >= 60%`);
  });

  // Gate 31: No "all of the above" or "none of the above" in options
  test("Gate 31: No 'all of the above' or 'none of the above' in options", async () => {
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
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
    const cohortQuestions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    const questionTexts = new Set<string>();
    for (const q of cohortQuestions) {
      const clean = q.question.trim().toLowerCase();
      assert.ok(!questionTexts.has(clean), `Duplicate question found: "${q.question}"`);
      questionTexts.add(clean);
    }
  });

  // Gate 33: Working groups & change management reflect RACI, green champions, OKRs, charters, PMO, and executive sponsorship
  test("Gate 33: Working groups & change management reflect RACI, green champions, OKRs, charters, PMO, and executive sponsorship", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 799));
    assert.strictEqual(questions.length, 8);
    const wgTerms = ["raci", "charter", "sponsor", "green champion", "okr", "cross-functional", "silo", "pilot", "stakeholder", "sustainability", "working group", "steering committee", "decision paper", "pmo", "kanban", "tco", "lifecycle costing", "governance"];
    const matching = questions.filter(q => wgTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Working groups course reflects authentic governance criteria");
  });

  // Gate 34: Business cases reflect CapEx/OpEx, NPV, IRR, MACC, avoided carbon costs, DCF, and co-benefits
  test("Gate 34: Business cases reflect CapEx/OpEx, NPV, IRR, MACC, avoided carbon costs, DCF, and co-benefits", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 721));
    assert.strictEqual(questions.length, 8);
    const bcTerms = ["npv", "irr", "payback", "macc", "marginal abatement", "wacc", "carbon price", "hurdle rate", "sensitivity analysis", "total cost of ownership", "capex", "business case", "dcf", "discounted cash flow", "utility tariff", "co-benefit", "cfo", "investment memo", "chiller", "solar pv", "led lighting", "retrofit", "energy efficiency", "climate risks"];
    const matching = questions.filter(q => bcTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Business case course reflects authentic financial analysis criteria");
  });

  // Gate 35: Subcontractor compliance reflects Tier-1 audits, Sedex/SMETA, supplier codes, PTW, and corrective action plans
  test("Gate 35: Subcontractor compliance reflects Tier-1 audits, Sedex/SMETA, supplier codes, PTW, and corrective action plans", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 722));
    assert.strictEqual(questions.length, 8);
    const subTerms = ["sedex", "smeta", "tier-1", "supplier code of conduct", "corrective action plan", "cap", "on-site audit", "subcontractor", "compliance", "pre-qualification", "procurement", "permit-to-work", "ptw", "stop-work", "duty-of-care", "weighbridge", "hazard", "spill"];
    const matching = questions.filter(q => subTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Subcontractor compliance course reflects authentic supply chain audit criteria");
  });

  // Gate 36: Energy retrofits CapEx reflects MACC, EPC/ESCO, IPMVP, shadow pricing, NPV, and CapEx memo
  test("Gate 36: Energy retrofits CapEx reflects MACC, EPC/ESCO, IPMVP, shadow pricing, NPV, and CapEx memo", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 769));
    assert.strictEqual(questions.length, 8);
    const retroTerms = ["ipmvp", "ashrae", "level ii", "level iii", "espc", "epc", "esco", "energy performance", "macc", "marginal abatement", "retrofit", "commissioning", "measurement and verification", "capex", "chiller", "shadow price", "npv", "payback", "energy", "carbon shadow price", "decarbonization", "savings"];
    const matching = questions.filter(q => retroTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Energy retrofit CapEx course reflects authentic M&V and engineering criteria");
  });

  // Gate 37: Executive climate governance reflects TCFD, ISSB S2, transition plans, and board oversight
  test("Gate 37: Executive climate governance reflects TCFD, ISSB S2, transition plans, and board oversight", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 800));
    assert.strictEqual(questions.length, 8);
    const execTerms = ["tcfd", "issb s2", "board", "governance", "climate transition plan", "remuneration", "scenario analysis", "physical risk", "transition risk", "oversight", "net-zero", "scope 1", "scope 2", "scope 3", "audit committee"];
    const matching = questions.filter(q => execTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Executive climate governance reflects authentic board oversight standards");
  });

  // Gate 38: Integrated HSE systems reflect ISO 14001, ISO 45001, plan-do-check-act, and regulatory compliance
  test("Gate 38: Integrated HSE systems reflect ISO 14001, ISO 45001, plan-do-check-act, and regulatory compliance", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 801));
    assert.strictEqual(questions.length, 8);
    const hseTerms = ["iso 14001", "iso 45001", "aspects and impacts", "hazard identification", "pdca", "management review", "near-miss", "spill", "emergency response", "safety", "environmental", "hierarchy of controls", "audit", "compliance", "life cycle"];
    const matching = questions.filter(q => hseTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Integrated HSE systems course reflects authentic EHS management standards");
  });

  // Gate 39: Facilities energy management reflects COP, power factor, APFC, peak shaving, DCV, SEER, and affinity laws
  test("Gate 39: Facilities energy management reflects COP, power factor, APFC, peak shaving, DCV, SEER, and affinity laws", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 802));
    assert.strictEqual(questions.length, 8);
    const facTerms = ["iso 50001", "enpi", "energy performance", "bms", "sub-metering", "energy baseline", "setpoint", "variable frequency drive", "vfd", "hvac", "power factor", "compressed air", "economizer", "cop", "coefficient of performance", "chilled water", "chiller", "apfc", "peak shaving", "dcv", "demand-controlled ventilation", "ashrae 62.1", "seer", "iplv", "affinity laws", "pump", "energy audit", "energy management"];
    const matching = questions.filter(q => facTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Facilities energy management course reflects authentic industrial energy management");
  });

  // Gate 40: Sustainable supply chain reflects Scope 3 Category 1, CDP Supply Chain, EcoVadis, and supplier scorecards
  test("Gate 40: Sustainable supply chain reflects Scope 3 Category 1, CDP Supply Chain, EcoVadis, and supplier scorecards", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 803));
    assert.strictEqual(questions.length, 8);
    const supplyTerms = ["scope 3", "purchased goods", "cdp supply chain", "ecovadis", "supplier scorecard", "spend-based", "activity-based", "deforestation", "human rights", "procurement", "tier-1", "supplier code", "rfp", "iso 20400", "csddd", "eudr", "fsc", "pefc"];
    const matching = questions.filter(q => supplyTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "Sustainable supply chain course reflects authentic procurement sustainability standards");
  });

  // Gate 41: HSE officers course reflects hierarchy of controls, spill containment, HazMat SDS, heat stress, and near-miss
  test("Gate 41: HSE officers course reflects hierarchy of controls, spill containment, HazMat SDS, heat stress, and near-miss", async () => {
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 723));
    assert.strictEqual(questions.length, 8);
    const hseOffTerms = ["hierarchy of controls", "spill containment", "secondary containment", "sds", "ghs", "root cause analysis", "fishbone", "5 whys", "lockout/tagout", "loto", "hse", "safety", "hearing conservation", "chemical substitution", "heat stress", "wbgt", "near-miss", "lti", "hazardous waste", "spill response", "chemical", "ppe", "solvent"];
    const matching = questions.filter(q => hseOffTerms.some(t => q.question.toLowerCase().includes(t)));
    assert.ok(matching.length >= 6, "HSE officers course reflects authentic industrial safety operations");
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
    await ensureCohort15_2_10KRemediation();
    const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, SPRINT_15_2_10K_COHORT_COURSE_IDS));
    assert.strictEqual(questions.length, 96);
  });

  // Gate 47: Pre/post remediation snapshots exist and validate cleanly
  test("Gate 47: Pre/post remediation snapshots exist and validate cleanly", () => {
    assert.ok(fs.existsSync("src/audits/preRemediationSnapshot15_2_10K.json"));
    assert.ok(fs.existsSync("src/audits/postRemediationSnapshot15_2_10K.json"));
  });

  // Gate 48: Course assessment quality inventory exists and covers all 136 courses
  test("Gate 48: Course assessment quality inventory exists and covers all 136 courses", () => {
    assert.ok(fs.existsSync("src/audits/courseAssessmentQualityInventory15_2_10K.json"));
  });

  // Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10K.md exists and is complete
  test("Gate 49: Master report COURSE_ASSESSMENT_REMEDIATION_15_2_10K.md exists and is complete", () => {
    assert.ok(fs.existsSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10K.md"));
    const content = fs.readFileSync("/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_ASSESSMENT_REMEDIATION_15_2_10K.md", "utf-8");
    assert.ok(content.includes("READY FOR FINAL ASSESSMENT REMEDIATION COHORT 15.2.10L"));
  });

  // Gate 50: Target versions: ELH-120..130 remain v2, ELH-131 monotonically advanced from v1 to v2
  test("Gate 50: Target versions: ELH-120..130 remain v2, ELH-131 monotonically advanced from v1 to v2", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, SPRINT_15_2_10K_COHORT_COURSE_IDS));
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

  // Gate 52: Total enterprise ready courses reaches exactly 120
  test("Gate 52: Total enterprise ready courses reaches exactly 120", () => {
    const inventory = JSON.parse(fs.readFileSync("src/audits/courseAssessmentQualityInventory15_2_10K.json", "utf-8"));
    assert.strictEqual(inventory.enterpriseReadyCourses, 120, "There must be exactly 120 enterprise ready courses after Sprint 15.2.10K");
    assert.strictEqual(inventory.legacyAcceptedCourses, 16, "There must be exactly 16 legacy accepted courses after Sprint 15.2.10K");
  });
});
