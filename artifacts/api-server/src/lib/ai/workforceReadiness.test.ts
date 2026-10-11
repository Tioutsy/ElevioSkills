import assert from "node:assert";
import { test } from "node:test";
import {
  computeWorkforceReadiness,
  deriveReadinessBand,
  deriveEvidenceConfidence,
  WorkforceReadinessData,
} from "./workforceReadinessService";
import { CompanyWorkforceIntelligence } from "./companyWorkforceIntelligenceService";

process.env.GEMINI_API_KEY = ""; // Disable external network Gemini call during unit testing

const mockCompany = {
  id: 15,
  name: "GreenTech Enterprise",
  industry: "Technology",
  trainingPriorities: ["waste_management", "energy_efficiency"],
};

function createMockIntelligence(
  evalLearnersCount: number,
  strengths: Array<{ topicId: string; topicLabel: string; domain: "environmental" | "social" | "governance"; count: number }> = [],
  gaps: Array<{ topicId: string; topicLabel: string; domain: "environmental" | "social" | "governance"; severity: "critical" | "moderate" | "low"; gapCount: number; criticalCount: number }> = []
): CompanyWorkforceIntelligence {
  const totalEmployees = 20;
  const hasSufficient = evalLearnersCount >= 3;

  const envStrengths = strengths.filter((s) => s.domain === "environmental").length;
  const envGaps = gaps.filter((g) => g.domain === "environmental").length;
  const envCritical = gaps.filter((g) => g.domain === "environmental").reduce((acc, g) => acc + g.criticalCount, 0);

  const socStrengths = strengths.filter((s) => s.domain === "social").length;
  const socGaps = gaps.filter((g) => g.domain === "social").length;

  const govStrengths = strengths.filter((s) => s.domain === "governance").length;
  const govGaps = gaps.filter((g) => g.domain === "governance").length;

  return {
    companyId: 15,
    companyName: "GreenTech Enterprise",
    industry: "Technology",
    generatedAt: new Date().toISOString(),
    providerTag: "fallback",
    isFallback: true,
    totalEmployees,
    activeLearnersCount: 16,
    learnersWithEvidenceCount: evalLearnersCount,
    learningParticipationRate: 0.8,
    evidenceCoverageRate: evalLearnersCount / totalEmployees,
    hasSufficientEvidence: hasSufficient,
    insufficientEvidenceMessage: hasSufficient ? undefined : "More employee learning data is required.",
    domainDistribution: {
      environmental: { strengthCount: envStrengths, gapCount: envGaps, criticalGapCount: envCritical },
      social: { strengthCount: socStrengths, gapCount: socGaps, criticalGapCount: 0 },
      governance: { strengthCount: govStrengths, gapCount: govGaps, criticalGapCount: 0 },
    },
    topCompanyStrengths: strengths.map((s) => ({
      topicId: s.topicId,
      topicLabel: s.topicLabel,
      domain: s.domain,
      strengthCount: s.count,
      percentageOfEvidenceLearners: 85,
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
        department: "Engineering",
        learnerCount: 10,
        activeLearnersCount: 8,
        learnersWithEvidenceCount: hasSufficient ? 6 : 1,
        evidenceCoverage: hasSufficient ? 0.6 : 0.1,
        hasSufficientSample: hasSufficient,
        sampleStatus: hasSufficient ? "evaluated" : "insufficient_sample",
        topStrengths: strengths.map((s) => s.topicLabel),
        topGaps: gaps.map((g) => g.topicLabel),
        priorityTopics: [],
      },
      {
        department: "Operations",
        learnerCount: 10,
        activeLearnersCount: 8,
        learnersWithEvidenceCount: hasSufficient ? 5 : 1,
        evidenceCoverage: hasSufficient ? 0.5 : 0.1,
        hasSufficientSample: hasSufficient,
        sampleStatus: hasSufficient ? "evaluated" : "insufficient_sample",
        topStrengths: strengths.map((s) => s.topicLabel),
        topGaps: gaps.map((g) => g.topicLabel),
        priorityTopics: [],
      },
    ],
    recommendedActions: [
      {
        who: "Operations",
        courseId: 3,
        courseCode: "ELH-03",
        title: "ESG Data Management",
        why: "Identified gap",
        priority: "high",
        expectedLearningOutcome: "Improved governance tracking",
      },
    ],
    executiveSummary: "Mock summary",
    aiCompanyStrengths: [],
    aiPriorityGaps: [],
    aiDepartmentInsights: [],
    disclaimer: "Training evidence only",
  };
}

test("Test 1: Insufficient evidence company yields insufficient_evidence status", async () => {
  const intel = createMockIntelligence(1); // 1 learner < 3 threshold
  const res = await computeWorkforceReadiness(mockCompany, "2026-08", intel, null);

  assert.strictEqual(res.status, "insufficient_evidence");
  assert.strictEqual(res.overall.score, 0);
  assert.strictEqual(res.overall.band, "Early");
  assert.strictEqual(res.overall.evidenceConfidence, "LOW");
  assert.ok(res.overall.insufficientEvidenceMessage?.includes("More employee learning"));
});

test("Test 2: Strong environmental evidence yields high Environmental subscore", async () => {
  const intel = createMockIntelligence(12, [
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 10 },
    { topicId: "waste_management", topicLabel: "Waste Management", domain: "environmental", count: 8 },
  ]);

  const res = await computeWorkforceReadiness(mockCompany, "2026-08", intel, null);

  assert.strictEqual(res.status, "sufficient_evidence");
  assert.strictEqual(res.domains.environmental.status, "sufficient");
  assert.ok((res.domains.environmental.score || 0) >= 80);
});

test("Test 3: Weak governance evidence reflects lower Governance subscore", async () => {
  const intel = createMockIntelligence(12, [
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 10 },
  ], [
    { topicId: "esg_reporting", topicLabel: "ESG Reporting & Governance", domain: "governance", severity: "critical", gapCount: 5, criticalCount: 2 },
  ]);

  const res = await computeWorkforceReadiness(mockCompany, "2026-08", intel, null);

  assert.strictEqual(res.domains.governance.status, "sufficient");
  assert.ok((res.domains.governance.score || 0) < 50);
});

test("Test 4: Mixed ESG domains calculate separate E/S/G subscores", async () => {
  const intel = createMockIntelligence(10, [
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 8 },
    { topicId: "dei_workplace", topicLabel: "DEI & Workplace Social", domain: "social", count: 6 },
  ], [
    { topicId: "supply_chain_gov", topicLabel: "Supply Chain Governance", domain: "governance", severity: "moderate", gapCount: 4, criticalCount: 0 },
  ]);

  const res = await computeWorkforceReadiness(mockCompany, "2026-08", intel, null);

  assert.ok(res.domains.environmental.score !== null);
  assert.ok(res.domains.social.score !== null);
  assert.ok(res.domains.governance.score !== null);
  assert.notStrictEqual(res.domains.environmental.score, res.domains.governance.score);
});

test("Test 5: Company priority weighting impacts readiness score", async () => {
  // Company has priority ["waste_management", "energy_efficiency"]
  const intelWithPrios = createMockIntelligence(12, [
    { topicId: "waste_management", topicLabel: "Waste Management", domain: "environmental", count: 9 },
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 9 },
  ]);

  const intelNoPrios = createMockIntelligence(12, [
    { topicId: "random_topic_1", topicLabel: "Random Topic 1", domain: "social", count: 9 },
  ]);

  const res1 = await computeWorkforceReadiness(mockCompany, "2026-08", intelWithPrios, null);
  const res2 = await computeWorkforceReadiness(mockCompany, "2026-08", intelNoPrios, null);

  assert.ok(res1.overall.score > res2.overall.score);
  assert.strictEqual(res1.priorityTopics.coveredPrioritiesCount, 2);
});

test("Test 6: Department readiness breakdowns respect minimum sample sizes", async () => {
  const intel = createMockIntelligence(10, [
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 8 },
  ]);

  const res = await computeWorkforceReadiness(mockCompany, "2026-08", intel, null);

  assert.strictEqual(res.departmentReadiness.length, 2);
  for (const dept of res.departmentReadiness) {
    assert.strictEqual(dept.sampleStatus, "evaluated");
    assert.ok(dept.score !== null);
  }
});

test("Test 7: Historical trend comparison correctly identifies direction (+ / -)", async () => {
  const intelJuly = createMockIntelligence(10, [
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 5 },
  ]);
  const julyRes = await computeWorkforceReadiness(mockCompany, "2026-07", intelJuly, null);

  const intelAugust = createMockIntelligence(16, [
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 12 },
    { topicId: "waste_management", topicLabel: "Waste Management", domain: "environmental", count: 10 },
  ]);
  const augRes = await computeWorkforceReadiness(mockCompany, "2026-08", intelAugust, julyRes);

  assert.strictEqual(augRes.trend.hasPriorPeriod, true);
  assert.strictEqual(augRes.trend.previousScore, julyRes.overall.score);
  assert.ok((augRes.trend.change || 0) > 0);
  assert.strictEqual(augRes.trend.direction, "improving");
});

test("Test 8: Gemini failure or unconfigured key defaults smoothly to deterministic fallback", async () => {
  const intel = createMockIntelligence(12, [
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 8 },
  ]);

  const res = await computeWorkforceReadiness(mockCompany, "2026-08", intel, null);

  assert.strictEqual(res.providerTag, "fallback");
  assert.strictEqual(res.isFallback, true);
  assert.ok(res.interpretation.summary.includes("GreenTech Enterprise"));
  assert.ok(res.interpretation.strongestArea.length > 0);
});

test("Test 9: Methodology versioning is strictly v1", async () => {
  const intel = createMockIntelligence(10, [
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 8 },
  ]);

  const res = await computeWorkforceReadiness(mockCompany, "2026-08", intel, null);

  assert.strictEqual(res.methodologyVersion, "v1");
});

test("Test 10: Score bounding guarantees score cannot exceed 100 or fall below 0", async () => {
  // Extreme high case
  const superHighIntel = createMockIntelligence(20, [
    { topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental", count: 20 },
    { topicId: "waste_management", topicLabel: "Waste Management", domain: "environmental", count: 20 },
    { topicId: "dei_workplace", topicLabel: "DEI & Social", domain: "social", count: 20 },
  ]);
  const highRes = await computeWorkforceReadiness(mockCompany, "2026-08", superHighIntel, null);
  assert.ok(highRes.overall.score <= 100);

  // Extreme gap case
  const superLowIntel = createMockIntelligence(3, [], [
    { topicId: "g1", topicLabel: "G1", domain: "governance", severity: "critical", gapCount: 10, criticalCount: 10 },
    { topicId: "g2", topicLabel: "G2", domain: "governance", severity: "critical", gapCount: 10, criticalCount: 10 },
  ]);
  const lowRes = await computeWorkforceReadiness(mockCompany, "2026-08", superLowIntel, null);
  assert.ok(lowRes.overall.score >= 0);
});

test("Test 11: Helper functions for readiness bands and confidence levels", () => {
  assert.strictEqual(deriveReadinessBand(85), "Strong");
  assert.strictEqual(deriveReadinessBand(65), "Established");
  assert.strictEqual(deriveReadinessBand(45), "Developing");
  assert.strictEqual(deriveReadinessBand(20), "Early");

  assert.strictEqual(deriveEvidenceConfidence(15, 0.6), "STRONG");
  assert.strictEqual(deriveEvidenceConfidence(5, 0.3), "MODERATE");
  assert.strictEqual(deriveEvidenceConfidence(2, 0.1), "LOW");
});
