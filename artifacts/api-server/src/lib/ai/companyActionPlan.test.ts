import assert from "node:assert";
import { test } from "node:test";
import {
  generateDeterministicActionCandidates,
  generateCompanyActionPlan,
  mutateActionStatus,
  isEligibleCourse,
  VALID_ACTION_TYPES,
  CompanyAction,
} from "./companyActionPlanService";
import { CompanyWorkforceIntelligence } from "./companyWorkforceIntelligenceService";
import { WorkforceReadinessData } from "./workforceReadinessService";

process.env.GEMINI_API_KEY = ""; // Disable external network calls during unit tests

const mockCompany = {
  id: 15,
  name: "GreenTech Enterprise",
  industry: "Technology",
  trainingPriorities: ["waste_management", "energy_efficiency"],
};

function createMockIntelAndReadiness(hasGaps: boolean, lowGov: boolean) {
  const intel: CompanyWorkforceIntelligence = {
    companyId: 15,
    companyName: "GreenTech Enterprise",
    industry: "Technology",
    generatedAt: new Date().toISOString(),
    providerTag: "fallback",
    isFallback: true,
    totalEmployees: 25,
    activeLearnersCount: 20,
    learnersWithEvidenceCount: 15,
    learningParticipationRate: 0.8,
    evidenceCoverageRate: 0.6,
    hasSufficientEvidence: true,
    domainDistribution: {
      environmental: { strengthCount: 4, gapCount: 1, criticalGapCount: 0 },
      social: { strengthCount: 3, gapCount: 1, criticalGapCount: 0 },
      governance: { strengthCount: lowGov ? 0 : 3, gapCount: lowGov ? 3 : 0, criticalGapCount: lowGov ? 2 : 0 },
    },
    topCompanyStrengths: [
      { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", strengthCount: 10, percentageOfEvidenceLearners: 80 },
    ],
    topCompanyGaps: [
      { topicId: "waste_management", topicLabel: "Waste Management", domain: "environmental", severity: "critical", gapCount: 5, criticalCount: 2, percentageOfEvidenceLearners: 40 },
    ],
    companyPriorityCoverage: [],
    departmentSummaries: [
      {
        department: "Operations",
        learnerCount: 10,
        activeLearnersCount: 8,
        learnersWithEvidenceCount: 8,
        evidenceCoverage: 0.8,
        hasSufficientSample: true,
        sampleStatus: "evaluated",
        topStrengths: ["Energy Efficiency"],
        topGaps: ["Waste Management"],
        priorityTopics: [],
      },
      {
        department: "Procurement",
        learnerCount: 10,
        activeLearnersCount: 8,
        learnersWithEvidenceCount: 1,
        evidenceCoverage: 0.1,
        hasSufficientSample: false,
        sampleStatus: "insufficient_sample",
        topStrengths: [],
        topGaps: [],
        priorityTopics: [],
      },
    ],
    recommendedActions: [
      {
        who: "Operations",
        courseId: 2,
        courseCode: "ELH-02",
        title: "Waste Sorting & Circular Economy",
        why: "Operations demonstrated 2 critical gaps in waste sorting",
        priority: "high",
        expectedLearningOutcome: "Eliminate operational waste sorting errors",
      },
    ],
    executiveSummary: "Mock executive summary",
    aiCompanyStrengths: [],
    aiPriorityGaps: [],
    aiDepartmentInsights: [],
    disclaimer: "Platform training evidence only",
  };

  const readiness: WorkforceReadinessData = {
    status: "sufficient_evidence",
    companyId: 15,
    companyName: "GreenTech Enterprise",
    reportingPeriod: "2026-08",
    generatedAt: new Date().toISOString(),
    methodologyVersion: "v1",
    providerTag: "fallback",
    isFallback: true,
    overall: { score: 72, band: "Established", evidenceConfidence: "STRONG" },
    domains: {
      environmental: { score: 80, status: "sufficient" },
      social: { score: 70, status: "sufficient" },
      governance: { score: lowGov ? 45 : 75, status: "sufficient" },
    },
    priorityTopics: { declaredPrioritiesCount: 2, coveredPrioritiesCount: 1, priorityCoverageRate: 0.5 },
    departmentReadiness: [],
    trend: { hasPriorPeriod: false, summaryText: "Baseline" },
    interpretation: { strongestArea: "Energy Efficiency", priorityArea: "Waste Management", summary: "Summary" },
    recommendedActions: intel.recommendedActions,
    disclaimer: "Disclaimer",
  };

  return { intel, readiness };
}

test("Test 1: Generates grounded action candidates from intelligence gaps and recommendations", async () => {
  const { intel, readiness } = createMockIntelAndReadiness(true, false);
  const candidates = await generateDeterministicActionCandidates(mockCompany, intel, readiness);

  assert.ok(candidates.length >= 2);

  // Check recommended course action
  const courseAction = candidates.find((a) => a.what.courseCode === "ELH-02");
  assert.ok(courseAction);
  assert.strictEqual(courseAction.who.label, "Operations");
  assert.strictEqual(courseAction.priority, "high");
  assert.strictEqual(courseAction.status, "proposed");
});

test("Test 2: Generates increase_assessment_coverage action for department with insufficient sample", async () => {
  const { intel, readiness } = createMockIntelAndReadiness(true, false);
  const candidates = await generateDeterministicActionCandidates(mockCompany, intel, readiness);

  const evalAction = candidates.find((a) => a.who.label === "Procurement");
  assert.ok(evalAction);
  assert.strictEqual(evalAction.what.type, "increase_assessment_coverage");
  assert.ok(evalAction.why.includes("insufficient assessment evidence"));
});

test("Test 3: Generates address_priority_gap action targeting uncovered company priority (waste_management)", async () => {
  const { intel, readiness } = createMockIntelAndReadiness(true, false);
  const candidates = await generateDeterministicActionCandidates(mockCompany, intel, readiness);

  const prioAction = candidates.find((a) => a.id.includes("prio-waste_management"));
  assert.ok(prioAction);
  assert.strictEqual(prioAction.priority, "high");
  assert.strictEqual(prioAction.what.type, "address_priority_gap");
  assert.ok(prioAction.why.includes("waste management"));
});

test("Test 4: Generates governance boost action when Governance subscore is low (<60)", async () => {
  const { intel, readiness } = createMockIntelAndReadiness(true, true); // lowGov = true
  const candidates = await generateDeterministicActionCandidates(mockCompany, intel, readiness);

  const govAction = candidates.find((a) => a.id === "action-gov-boost");
  assert.ok(govAction);
  assert.strictEqual(govAction.what.courseCode, "ELH-03");
  assert.strictEqual(govAction.priority, "high");
  assert.ok(govAction.why.includes("45/100"));
});

test("Test 5: Required action contract structure & controlled types compliance", async () => {
  const { intel, readiness } = createMockIntelAndReadiness(true, true);
  const candidates = await generateDeterministicActionCandidates(mockCompany, intel, readiness);

  for (const act of candidates) {
    assert.ok(act.id);
    assert.ok(act.who && act.who.type && act.who.label);
    assert.ok(act.what && act.what.type);
    assert.ok(VALID_ACTION_TYPES.includes(act.what.type));
    assert.ok(act.why);
    assert.ok(["high", "medium", "low"].includes(act.priority));
    assert.ok(act.expectedLearningOutcome);
    assert.ok(Array.isArray(act.evidence));
    assert.strictEqual(act.status, "proposed");
    assert.ok(["manual", "eligible_for_automation"].includes(act.executionMode));
  }
});

test("Test 6: Course eligibility checker validates published catalogue courses", () => {
  assert.strictEqual(isEligibleCourse("ELH-01"), true);
  assert.strictEqual(isEligibleCourse("ELH-02"), true);
  assert.strictEqual(isEligibleCourse("ELH-03"), true);
  assert.strictEqual(isEligibleCourse("INVALID-99"), false);
});

test("Test 7: Action plan size constraint enforces 3 to 7 items max", async () => {
  const { intel, readiness } = createMockIntelAndReadiness(true, true);
  const candidates = await generateDeterministicActionCandidates(mockCompany, intel, readiness);
  assert.ok(candidates.length >= 3 && candidates.length <= 7);
});

test("Test 8: Fallback generation creates complete plan when Gemini is unavailable", async () => {
  const access = { companyId: 15, companyName: "GreenTech Enterprise", userId: 1, role: "company_admin" } as any;
  const plan = await generateCompanyActionPlan(access, true);

  assert.strictEqual(plan.companyId, 15);
  assert.ok(plan.actions.length >= 3);
  assert.strictEqual(plan.isFallback, true);
  assert.ok(plan.summary);
  assert.ok(plan.disclaimer);
});

test("Test 9: Action status mutation persists status and logs outcome progression", async () => {
  const access = { companyId: 15, companyName: "GreenTech Enterprise", userId: 1, role: "company_admin" } as any;
  const plan = await generateCompanyActionPlan(access, false);

  const targetId = plan.actions[0].id;
  const updatedPlan = await mutateActionStatus(access, targetId, "accepted");

  const mutatedItem = updatedPlan.actions.find((a) => a.id === targetId);
  assert.ok(mutatedItem);
  assert.strictEqual(mutatedItem.status, "accepted");
  assert.ok(mutatedItem.outcomes?.progressObserved);
});

test("Test 10: Dismissing an action updates item status to dismissed", async () => {
  const access = { companyId: 15, companyName: "GreenTech Enterprise", userId: 1, role: "company_admin" } as any;
  const plan = await generateCompanyActionPlan(access, false);

  const targetId = plan.actions[1].id;
  const updatedPlan = await mutateActionStatus(access, targetId, "dismissed");

  const mutatedItem = updatedPlan.actions.find((a) => a.id === targetId);
  assert.ok(mutatedItem);
  assert.strictEqual(mutatedItem.status, "dismissed");
});
