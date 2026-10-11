import assert from "node:assert";
import { test } from "node:test";
import {
  aggregateMonthlyManagementBrief,
  MonthlyManagementBrief,
} from "./monthlyManagementBriefService";
import { CompanyWorkforceIntelligence } from "./companyWorkforceIntelligenceService";

// Network Gemini disabled for fast unit tests
process.env.GEMINI_API_KEY = "";

const mockCompany = {
  id: 10,
  name: "EcoHotel Group",
  industry: "Hospitality",
  trainingPriorities: ["waste_management", "energy_efficiency"],
};

function createMockWorkforceIntelligence(
  hasSufficient: boolean,
  activeLearners: number = 15,
  strengths: Array<{ topicId: string; topicLabel: string; domain: "environmental" | "social" | "governance"; count: number }> = [],
  gaps: Array<{ topicId: string; topicLabel: string; domain: "environmental" | "social" | "governance"; severity: "critical" | "moderate" | "low"; gapCount: number; criticalCount: number }> = []
): CompanyWorkforceIntelligence {
  return {
    companyId: 10,
    companyName: "EcoHotel Group",
    industry: "Hospitality",
    generatedAt: new Date().toISOString(),
    providerTag: "fallback",
    isFallback: true,
    totalEmployees: 20,
    activeLearnersCount: activeLearners,
    learnersWithEvidenceCount: hasSufficient ? 12 : 1,
    learningParticipationRate: activeLearners / 20,
    evidenceCoverageRate: hasSufficient ? 12 / 20 : 1 / 20,
    hasSufficientEvidence: hasSufficient,
    insufficientEvidenceMessage: hasSufficient
      ? undefined
      : "More employee learning and assessment data is required before reliable company-level patterns can be identified.",
    domainDistribution: {
      environmental: { strengthCount: 10, gapCount: 2, criticalGapCount: 1 },
      social: { strengthCount: 5, gapCount: 1, criticalGapCount: 0 },
      governance: { strengthCount: 3, gapCount: 3, criticalGapCount: 2 },
    },
    topCompanyStrengths: strengths.map((s) => ({
      topicId: s.topicId,
      topicLabel: s.topicLabel,
      domain: s.domain,
      strengthCount: s.count,
      percentageOfEvidenceLearners: 80,
    })),
    topCompanyGaps: gaps.map((g) => ({
      topicId: g.topicId,
      topicLabel: g.topicLabel,
      domain: g.domain,
      severity: g.severity,
      gapCount: g.gapCount,
      criticalCount: g.criticalCount,
      percentageOfEvidenceLearners: 40,
    })),
    companyPriorityCoverage: [],
    departmentSummaries: [
      {
        department: "Facilities",
        learnerCount: 8,
        activeLearnersCount: 6,
        learnersWithEvidenceCount: hasSufficient ? 5 : 1,
        evidenceCoverage: hasSufficient ? 0.625 : 0.125,
        hasSufficientSample: hasSufficient,
        sampleStatus: hasSufficient ? "evaluated" : "insufficient_sample",
        topStrengths: strengths.map((s) => s.topicLabel),
        topGaps: gaps.map((g) => g.topicLabel),
        priorityTopics: [],
      },
    ],
    recommendedActions: [
      {
        who: "Facilities",
        courseId: 2,
        courseCode: "ELH-02",
        title: "Waste Sorting & Circular Economy",
        why: "Critical assessment gaps detected",
        priority: "high",
        expectedLearningOutcome: "Close waste management gaps",
      },
    ],
    executiveSummary: "Mock executive summary",
    aiCompanyStrengths: [],
    aiPriorityGaps: [],
    aiDepartmentInsights: [],
    disclaimer: "Training evidence only",
  };
}

test("Test 1: Company with sufficient evidence generates complete brief contract", async () => {
  const intel = createMockWorkforceIntelligence(
    true,
    15,
    [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 10 }],
    [{ topicId: "waste_management", topicLabel: "Waste Management", domain: "environmental", severity: "critical", gapCount: 4, criticalCount: 2 }]
  );

  const brief = await aggregateMonthlyManagementBrief(mockCompany, "2026-08", intel, null);

  assert.strictEqual(brief.companyId, 10);
  assert.strictEqual(brief.reportingMonth, "2026-08");
  assert.strictEqual(brief.periodStart, "2026-08-01");
  assert.strictEqual(brief.periodEnd, "2026-08-31");
  assert.strictEqual(brief.overview.hasSufficientEvidence, true);
  assert.strictEqual(brief.strengths.length, 1);
  assert.strictEqual(brief.priorityGaps.length, 1);
  assert.strictEqual(brief.recommendedActions.length, 1);
  assert.ok(brief.aiExecutiveSummary.executiveSummary.includes("EcoHotel Group"));
});

test("Test 2: Company with insufficient evidence displays clear safeguard state", async () => {
  const intel = createMockWorkforceIntelligence(false);

  const brief = await aggregateMonthlyManagementBrief(mockCompany, "2026-08", intel, null);

  assert.strictEqual(brief.overview.hasSufficientEvidence, false);
  assert.ok(brief.aiExecutiveSummary.executiveSummary.includes("insufficient employee assessment evidence"));
  assert.strictEqual(brief.emergingGaps.length, 0);
});

test("Test 3 & 4: Month-over-month trend detection (Improvement vs Deterioration)", async () => {
  const JulyIntel = createMockWorkforceIntelligence(true, 10);
  const JulyBrief = await aggregateMonthlyManagementBrief(mockCompany, "2026-07", JulyIntel, null);

  // August: Higher active learners (18 > 10) -> Improvement
  const AugustIntelHigher = createMockWorkforceIntelligence(true, 18);
  const AugustBrief = await aggregateMonthlyManagementBrief(mockCompany, "2026-08", AugustIntelHigher, JulyBrief);

  assert.strictEqual(AugustBrief.trends.hasPriorMonthData, true);
  assert.strictEqual(AugustBrief.trends.activeLearnersChange, "increased");
  assert.ok(AugustBrief.trends.summaryText.includes("increased"));

  // August: Lower active learners (5 < 10) -> Deterioration
  const AugustIntelLower = createMockWorkforceIntelligence(true, 5);
  const AugustBriefLower = await aggregateMonthlyManagementBrief(mockCompany, "2026-08", AugustIntelLower, JulyBrief);

  assert.strictEqual(AugustBriefLower.trends.activeLearnersChange, "decreased");
});

test("Test 5: Baseline month with no prior-month data", async () => {
  const intel = createMockWorkforceIntelligence(true, 12);
  const brief = await aggregateMonthlyManagementBrief(mockCompany, "2026-08", intel, null);

  assert.strictEqual(brief.trends.hasPriorMonthData, false);
  assert.ok(brief.trends.summaryText.includes("Baseline reporting period established"));
});

test("Test 6: Gemini Fallback behavior when API key is unconfigured", async () => {
  const intel = createMockWorkforceIntelligence(true, 14);
  const brief = await aggregateMonthlyManagementBrief(mockCompany, "2026-08", intel, null);

  assert.strictEqual(brief.providerTag, "fallback");
  assert.strictEqual(brief.isFallback, true);
  assert.ok(brief.aiExecutiveSummary.executiveSummary.length > 0);
  assert.ok(brief.aiExecutiveSummary.whatNeedsAttention.length > 0);
});

test("Test 7: Zero PII Guarantee — No individual names or emails in output", async () => {
  const intel = createMockWorkforceIntelligence(true, 14);
  const brief = await aggregateMonthlyManagementBrief(mockCompany, "2026-08", intel, null);

  const jsonStr = JSON.stringify(brief);
  assert.ok(!jsonStr.includes("@hotel.com"));
  assert.ok(!jsonStr.includes("clerkUserId"));
  assert.ok(!jsonStr.includes("John Smith"));
});

test("Test 8: Grounded Recommended Actions format & course code validity", async () => {
  const intel = createMockWorkforceIntelligence(true, 14);
  const brief = await aggregateMonthlyManagementBrief(mockCompany, "2026-08", intel, null);

  for (const action of brief.recommendedActions) {
    assert.ok(action.who.length > 0, "Target WHO must be non-empty");
    assert.ok(action.courseId > 0, "Course ID must be > 0");
    assert.ok(action.courseCode.length > 0, "Course code must be non-empty");
    assert.ok(action.title.length > 0, "Title must be non-empty");
    assert.ok(action.why.length > 0, "Why rationale must be non-empty");
    assert.ok(action.expectedLearningOutcome.length > 0, "Expected outcome must be non-empty");
  }
});
