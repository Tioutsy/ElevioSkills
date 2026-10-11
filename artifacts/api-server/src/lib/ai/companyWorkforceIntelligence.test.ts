import assert from "node:assert";
import { test } from "node:test";
import {
  aggregateCompanyWorkforceIntelligence,
  EmployeeProfileInput,
} from "./companyWorkforceIntelligenceService";

// Disable network Gemini API calls during unit tests
process.env.GEMINI_API_KEY = "";

const mockCompany = {
  id: 10,
  name: "EcoHotel Group",
  industry: "Hospitality & Tourism",
  trainingPriorities: ["waste_management", "energy_efficiency"],
};

const mockCatalog = [
  {
    id: 1,
    courseCode: "ELH-01",
    title: "Sustainability Foundations",
    description: "Introductory course",
    level: "Beginner",
  },
  {
    id: 2,
    courseCode: "ELH-02",
    title: "Waste Sorting & Management",
    description: "Waste circularity",
    level: "Intermediate",
  },
  {
    id: 3,
    courseCode: "ELH-03",
    title: "Energy Efficiency Basics",
    description: "Power conservation",
    level: "Intermediate",
  },
  {
    id: 4,
    courseCode: "ELH-04",
    title: "Corporate Governance & Anti-Corruption",
    description: "Governance ethics",
    level: "Advanced",
  },
];

function createMockEmployeeProfile(
  id: number,
  name: string,
  dept: string,
  strengths: Array<{ topicId: string; topicLabel: string; domain: string }>,
  gaps: Array<{ topicId: string; topicLabel: string; domain: string; severity: "critical" | "moderate" | "low" }>
): EmployeeProfileInput {
  return {
    employee: { id, name, email: `emp${id}@hotel.com`, department: dept },
    profile: {
      employeeId: id,
      companyId: 10,
      generatedAt: new Date().toISOString(),
      modelUsed: "deterministic",
      hasSufficientEvidence: true,
      knowledgeProfile: [],
      completedLearning: [{ courseId: 1, courseCode: "ELH-01", title: "Sustainability Foundations", topicsAddressed: ["Environmental Management"] }],
      demonstratedStrengths: strengths.map((s) => ({
        topicId: s.topicId,
        topicLabel: s.topicLabel,
        domain: s.domain as any,
        evidenceText: "Quiz score 90%",
      })),
      inferredKnowledgeGaps: gaps.map((g) => ({
        topicId: g.topicId,
        topicLabel: g.topicLabel,
        domain: g.domain as any,
        severity: g.severity,
        reason: "Failed quiz attempt",
        evidence: "Score 45%",
      })),
      recommendedInterventions: [],
      disclaimer: "Training evidence only",
      providerTag: "fallback",
      isFallback: true,
    } as any,
  };
}

test("Fixture 1: Small company with insufficient evidence (< 3 learners with evidence)", async () => {
  const smallProfiles: EmployeeProfileInput[] = [
    createMockEmployeeProfile(1, "Alex", "Operations", [], []),
    {
      employee: { id: 2, name: "Sam", email: "sam@hotel.com", department: "Operations" },
      profile: {
        employeeId: 2,
        companyId: 10,
        generatedAt: new Date().toISOString(),
        modelUsed: "deterministic",
        hasSufficientEvidence: false,
        knowledgeProfile: [],
        insufficientEvidenceMessage: "More learning and assessment data is needed.",
        completedLearning: [],
        demonstratedStrengths: [],
        inferredKnowledgeGaps: [],
        recommendedInterventions: [],
        disclaimer: "Training evidence only",
        providerTag: "fallback",
        isFallback: true,
      } as any,
    },
  ];

  const result = await aggregateCompanyWorkforceIntelligence(mockCompany, smallProfiles, mockCatalog);

  assert.strictEqual(result.hasSufficientEvidence, false);
  assert.strictEqual(
    result.insufficientEvidenceMessage,
    "More employee learning and assessment data is required before reliable company-level patterns can be identified."
  );
  assert.strictEqual(result.recommendedActions.length, 0);
});

test("Fixture 2: Company with strong environmental performance", async () => {
  const envProfiles: EmployeeProfileInput[] = [
    createMockEmployeeProfile(
      1,
      "Alex",
      "Facilities",
      [
        { topicId: "energy_efficiency", topicLabel: "Energy Efficiency & Renewables", domain: "environmental" },
        { topicId: "waste_management", topicLabel: "Waste Sorting & Circular Economy", domain: "environmental" },
      ],
      []
    ),
    createMockEmployeeProfile(
      2,
      "Sam",
      "Facilities",
      [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency & Renewables", domain: "environmental" }],
      []
    ),
    createMockEmployeeProfile(
      3,
      "Jordan",
      "Operations",
      [{ topicId: "waste_management", topicLabel: "Waste Sorting & Circular Economy", domain: "environmental" }],
      []
    ),
  ];

  const result = await aggregateCompanyWorkforceIntelligence(mockCompany, envProfiles, mockCatalog);

  assert.strictEqual(result.hasSufficientEvidence, true);
  assert.strictEqual(result.domainDistribution.environmental.strengthCount, 4);
  assert.strictEqual(result.topCompanyStrengths[0].topicId, "energy_efficiency");
  assert.strictEqual(result.topCompanyStrengths[0].strengthCount, 2);
});

test("Fixture 3: Company with governance gaps & grounded course recommendations", async () => {
  const govProfiles: EmployeeProfileInput[] = [
    createMockEmployeeProfile(
      1,
      "Alex",
      "Management",
      [],
      [{ topicId: "business_ethics", topicLabel: "Business Ethics & Integrity", domain: "governance", severity: "critical" }]
    ),
    createMockEmployeeProfile(
      2,
      "Sam",
      "Management",
      [],
      [{ topicId: "business_ethics", topicLabel: "Business Ethics & Integrity", domain: "governance", severity: "critical" }]
    ),
    createMockEmployeeProfile(
      3,
      "Jordan",
      "Procurement",
      [],
      [{ topicId: "business_ethics", topicLabel: "Business Ethics & Integrity", domain: "governance", severity: "moderate" }]
    ),
  ];

  const result = await aggregateCompanyWorkforceIntelligence(mockCompany, govProfiles, mockCatalog);

  assert.strictEqual(result.hasSufficientEvidence, true);
  assert.strictEqual(result.domainDistribution.governance.gapCount, 3);
  assert.strictEqual(result.domainDistribution.governance.criticalGapCount, 2);
  assert.strictEqual(result.topCompanyGaps[0].topicId, "business_ethics");

  assert.ok(result.recommendedActions.length > 0, "Should generate recommended action for governance gap");
  assert.strictEqual(result.recommendedActions[0].courseCode, "ELH-04");
  assert.strictEqual(result.recommendedActions[0].priority, "high");
});

test("Fixture 4: Department aggregation & sample protection rule (2+ evaluated vs <2 insufficient_sample)", async () => {
  const deptProfiles: EmployeeProfileInput[] = [
    // Operations (2 evidence learners -> evaluated)
    createMockEmployeeProfile(1, "Alex", "Operations", [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental" }], []),
    createMockEmployeeProfile(2, "Sam", "Operations", [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental" }], []),
    // HR (1 evidence learner -> insufficient_sample)
    createMockEmployeeProfile(3, "Jordan", "HR", [{ topicId: "social_responsibility", topicLabel: "Social Responsibility", domain: "social" }], []),
  ];

  const result = await aggregateCompanyWorkforceIntelligence(mockCompany, deptProfiles, mockCatalog);

  const opsDept = result.departmentSummaries.find((d) => d.department === "Operations");
  const hrDept = result.departmentSummaries.find((d) => d.department === "HR");

  assert.ok(opsDept);
  assert.strictEqual(opsDept?.hasSufficientSample, true);
  assert.strictEqual(opsDept?.sampleStatus, "evaluated");

  assert.ok(hrDept);
  assert.strictEqual(hrDept?.hasSufficientSample, false);
  assert.strictEqual(hrDept?.sampleStatus, "insufficient_sample");
});

test("Fixture 5: Privacy check — No employee names or emails in output", async () => {
  const profiles: EmployeeProfileInput[] = [
    createMockEmployeeProfile(1, "John Smith", "Facilities", [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental" }], []),
    createMockEmployeeProfile(2, "Jane Doe", "Facilities", [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental" }], []),
    createMockEmployeeProfile(3, "Robert Johnson", "Facilities", [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental" }], []),
  ];

  const result = await aggregateCompanyWorkforceIntelligence(mockCompany, profiles, mockCatalog);
  const jsonStr = JSON.stringify(result);

  assert.ok(!jsonStr.includes("John Smith"));
  assert.ok(!jsonStr.includes("emp1@hotel.com"));
});

test("Fixture 6: Gemini Fallback behavior when API key is unconfigured", async () => {
  const oldKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;

  try {
    const profiles: EmployeeProfileInput[] = [
      createMockEmployeeProfile(1, "Alex", "Facilities", [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental" }], []),
      createMockEmployeeProfile(2, "Sam", "Facilities", [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental" }], []),
      createMockEmployeeProfile(3, "Jordan", "Facilities", [{ topicId: "energy_efficiency", topicLabel: "Energy Efficiency", domain: "environmental" }], []),
    ];

    const result = await aggregateCompanyWorkforceIntelligence(mockCompany, profiles, mockCatalog);

    assert.strictEqual(result.providerTag, "fallback");
    assert.strictEqual(result.isFallback, true);
    assert.ok(result.executiveSummary.includes("EcoHotel Group"));
  } finally {
    process.env.GEMINI_API_KEY = oldKey;
  }
});
