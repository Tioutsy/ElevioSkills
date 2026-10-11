import assert from "node:assert";
import { test } from "node:test";
import {
  FallbackSkillsGapProvider,
  GeminiSkillsGapProvider,
  SkillsGapInput,
} from "./skillsGapProvider";
import { KNOWLEDGE_TAXONOMY, mapCourseToTopics } from "./skillsTaxonomy";
import { FallbackRecommendationProvider } from "./recommendationProviders";

const mockInput: SkillsGapInput = {
  company: {
    sector: "Hospitality & Tourism",
    trainingPriorities: ["waste_management", "energy_efficiency"],
  },
  employee: {
    employeeId: 501,
    companyId: 10,
    name: "Alex Smith",
    email: "alex@hotel.com",
    department: "Facilities Management",
    roleCategory: "Operations",
    jobTitle: "Facilities Coordinator",
    seniority: "Staff",
  },
  learningEvidence: {
    completedCourses: [
      {
        courseId: 1,
        courseCode: "ELH-01",
        title: "Sustainability Foundations",
        completedAt: "2026-07-01T10:00:00Z",
        score: 95,
      },
    ],
    assignedCourses: [
      {
        courseId: 2,
        courseCode: "ELH-02",
        title: "Waste Sorting & Management",
        dueDate: "2026-08-30T00:00:00Z",
        status: "assigned",
      },
    ],
    quizPerformance: [
      {
        courseId: 1,
        courseTitle: "Sustainability Foundations",
        score: 95,
        passed: true,
        attemptTimestamp: "2026-07-01T10:00:00Z",
      },
      {
        courseId: 3,
        courseTitle: "Energy Efficiency Basics",
        score: 55,
        passed: false,
        attemptTimestamp: "2026-07-05T10:00:00Z",
      },
    ],
  },
  catalog: [
    {
      id: 1,
      courseCode: "ELH-01",
      title: "Sustainability Foundations",
      description: "Introductory course",
      level: "Beginner",
      topics: ["sustainability_foundations"],
    },
    {
      id: 2,
      courseCode: "ELH-02",
      title: "Waste Sorting & Management",
      description: "Waste circularity",
      level: "Intermediate",
      topics: ["waste_management"],
    },
    {
      id: 3,
      courseCode: "ELH-03",
      title: "Energy Efficiency Basics",
      description: "Power conservation",
      level: "Intermediate",
      topics: ["energy_efficiency"],
    },
    {
      id: 4,
      courseCode: "ELH-04",
      title: "Biodiversity & Natural Ecosystems",
      description: "Ecosystem protection",
      level: "Beginner",
      topics: ["biodiversity"],
    },
  ],
};

test("Skills Taxonomy mapping and taxonomy rules", () => {
  assert.ok(KNOWLEDGE_TAXONOMY.length >= 10, "Taxonomy should contain at least 10 domain topics");
  const topics = mapCourseToTopics({ id: 1, title: "Waste Sorting and Recycling Practice" });
  assert.strictEqual(topics[0].id, "waste_management");
});

test("FallbackSkillsGapProvider produces structured profile with strengths, gaps, and recommendations", async () => {
  const provider = new FallbackSkillsGapProvider();
  const profile = await provider.analyzeSkillsGap(mockInput);

  assert.strictEqual(profile.employeeId, 501);
  assert.strictEqual(profile.providerTag, "fallback");
  assert.strictEqual(profile.isFallback, true);
  assert.strictEqual(profile.hasSufficientEvidence, true);
  assert.ok(profile.completedLearning.length > 0, "Should contain completed learning");
  assert.ok(profile.demonstratedStrengths.length > 0, "Should reflect high quiz score as strength");
  assert.ok(profile.inferredKnowledgeGaps.length > 0, "Should reflect low quiz score as gap");
  assert.ok(profile.disclaimer.includes("professional competence"), "Disclaimer must highlight completion != competence");
});

test("Insufficient evidence handling when zero learning history exists", async () => {
  const provider = new FallbackSkillsGapProvider();
  const emptyInput: SkillsGapInput = {
    ...mockInput,
    learningEvidence: {
      completedCourses: [],
      assignedCourses: [],
      quizPerformance: [],
    },
  };

  const profile = await provider.analyzeSkillsGap(emptyInput);
  assert.strictEqual(profile.hasSufficientEvidence, false);
  assert.strictEqual(profile.insufficientEvidenceMessage, "More learning and assessment data is needed to identify a reliable pattern.");
});

test("Repeated attempts trajectory: Improving learner trajectory (45 -> 55 -> 85)", async () => {
  const provider = new FallbackSkillsGapProvider();
  const improvingInput: SkillsGapInput = {
    ...mockInput,
    learningEvidence: {
      completedCourses: [],
      assignedCourses: [],
      quizPerformance: [
        { courseId: 3, courseTitle: "Energy Efficiency Basics", score: 45, passed: false, attemptTimestamp: "2026-07-01T10:00:00Z" },
        { courseId: 3, courseTitle: "Energy Efficiency Basics", score: 55, passed: false, attemptTimestamp: "2026-07-02T10:00:00Z" },
        { courseId: 3, courseTitle: "Energy Efficiency Basics", score: 85, passed: true, attemptTimestamp: "2026-07-03T10:00:00Z" },
      ],
    },
  };

  const profile = await provider.analyzeSkillsGap(improvingInput);
  const strength = profile.demonstratedStrengths.find((s) => s.trajectory === "improving_learner");
  assert.ok(strength, "Improving trajectory must be categorized under demonstrated strengths");
  assert.strictEqual(strength?.topicId, "energy_efficiency");
});

test("Repeated attempts trajectory: Persistent repeated weakness (40 -> 45 -> 42)", async () => {
  const provider = new FallbackSkillsGapProvider();
  const persistentWeaknessInput: SkillsGapInput = {
    ...mockInput,
    learningEvidence: {
      completedCourses: [],
      assignedCourses: [],
      quizPerformance: [
        { courseId: 3, courseTitle: "Energy Efficiency", score: 40, passed: false, attemptTimestamp: "2026-07-01T10:00:00Z" },
        { courseId: 3, courseTitle: "Energy Efficiency", score: 45, passed: false, attemptTimestamp: "2026-07-02T10:00:00Z" },
        { courseId: 3, courseTitle: "Energy Efficiency", score: 42, passed: false, attemptTimestamp: "2026-07-03T10:00:00Z" },
      ],
    },
  };

  const profile = await provider.analyzeSkillsGap(persistentWeaknessInput);
  const gap = profile.inferredKnowledgeGaps.find((g) => g.trajectory === "persistent_repeated_weakness");
  assert.ok(gap, "Persistent weakness must be categorized as a critical knowledge gap");
  assert.strictEqual(gap?.severity, "critical");
});

test("10T Recommendation Engine Integration: Knowledge gap boosts candidate course ranking", async () => {
  const recProvider = new FallbackRecommendationProvider();
  const recInput = {
    company: {
      sector: "Hospitality & Tourism",
      employeeBand: "25",
      trainingPriorities: [],
    },
    learner: {
      employeeId: 501,
      companyId: 10,
      department: "Operations",
      completedCourseIds: [],
      assignedCourseIds: [],
      knowledgeProfile: {
        strengths: [],
        gaps: ["biodiversity"],
        criticalGaps: ["biodiversity"],
      },
    },
    availableCourses: [
      {
        id: 10,
        courseCode: "ELH-10",
        title: "Biodiversity & Natural Capital Protection",
        description: "Course for biodiversity",
        level: "Intermediate",
        durationMinutes: 45,
        prerequisites: [],
      },
      {
        id: 11,
        courseCode: "ELH-11",
        title: "General Business Communication",
        description: "General topic",
        level: "Beginner",
        durationMinutes: 30,
        prerequisites: [],
      },
    ],
  };

  const recommendation = await recProvider.generateRecommendation(recInput);
  assert.ok(recommendation.recommendedCourses.length > 0);
  assert.strictEqual(recommendation.recommendedCourses[0].courseId, 10, "Course addressing critical gap in biodiversity must be ranked #1");
  assert.strictEqual(recommendation.recommendedCourses[0].priority, "high");
});

test("GeminiSkillsGapProvider falls back gracefully when GEMINI_API_KEY is not configured", async () => {
  const oldKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;

  try {
    const provider = new GeminiSkillsGapProvider();
    const profile = await provider.analyzeSkillsGap(mockInput);

    assert.strictEqual(profile.isFallback, true);
    assert.strictEqual(profile.providerTag, "fallback");
  } finally {
    process.env.GEMINI_API_KEY = oldKey;
  }
});

test("Grounding Safety: Excludes already completed and assigned courses from recommendations", async () => {
  const provider = new FallbackSkillsGapProvider();
  const profile = await provider.analyzeSkillsGap(mockInput);

  const recommendedIds = profile.recommendedInterventions.map((r) => r.courseId);
  assert.ok(!recommendedIds.includes(1), "Completed course ID 1 must not be recommended");
  assert.ok(!recommendedIds.includes(2), "Already assigned course ID 2 must not be recommended");
});
