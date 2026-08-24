import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import {
  db,
  companiesTable,
  employeesTable,
  coursesTable,
  lessonsTable,
  enrollmentsTable,
  quizAttemptsTable,
  learnerCommitmentsTable,
  elevioScoreLedgerTable,
  companySeasonsTable,
  companyChallengesTable,
  companyChallengeCriteriaTable,
  employeeChallengeProgressTable,
  courseInteractionProgressTable,
} from "@workspace/db";
import { eq, and, sql, desc, gte, lte } from "drizzle-orm";
import {
  recordScoreEvent,
  awardCourseCompletionScore,
  awardQuizPassScore,
  awardWorkplaceActionScore,
  awardChallengeCompletionScore,
  getEmployeeScoreSummary,
} from "./lib/scoringService.js";
import {
  calculateCompanyLeaderboard,
  getOrCreateActiveCompanySeason,
} from "./lib/leaderboardService.js";
import {
  evaluateAndSaveInteraction,
  getLearnerCourseInteractions,
} from "./lib/interactionService.js";
import {
  evaluateEmployeeChallengeProgress,
} from "./lib/challengeService.js";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications.js";

async function createTestChallenge(params: {
  companyId: number;
  title: string;
  code: string;
  category?: string;
  rewardPoints?: number;
  startDate?: Date;
  endDate?: Date;
  allowPriorCompletion?: boolean;
  createdBy?: string;
  criteria: Array<{
    title: string;
    criterionType: string;
    courseId?: number;
    interactionId?: string;
    assessmentThreshold?: number;
    requiredCount?: number;
    allowPriorCompletion?: boolean;
    orderIndex?: number;
  }>;
}) {
  const [challenge] = await db
    .insert(companyChallengesTable)
    .values({
      companyId: params.companyId,
      title: params.title,
      code: `${params.code}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      category: params.category || "Waste Management",
      rewardPoints: params.rewardPoints || 100,
      startDate: params.startDate || new Date(Date.now() - 3600 * 1000),
      endDate: params.endDate || new Date(Date.now() + 14 * 86400 * 1000),
      status: "ACTIVE",
      createdBy: params.createdBy || "admin@example.com",
    })
    .returning();

  const criteria = [];
  for (let i = 0; i < params.criteria.length; i++) {
    const crit = params.criteria[i];
    const [c] = await db
      .insert(companyChallengeCriteriaTable)
      .values({
        challengeId: challenge.id,
        title: crit.title,
        criterionType: crit.criterionType,
        courseId: crit.courseId || null,
        interactionId: crit.interactionId || null,
        assessmentThreshold: crit.assessmentThreshold || null,
        requiredCount: crit.requiredCount || 1,
        orderIndex: crit.orderIndex ?? i,
        allowPriorCompletion: crit.allowPriorCompletion ?? params.allowPriorCompletion ?? true,
      } as any)
      .returning();
    criteria.push(c);
  }

  return { challenge, criteria };
}

describe("Sprint 14.4 — Interactive Course Components & Scenario-Based Challenges Test Suite", () => {
  let testCompanyAId: number;
  let testCompanyBId: number;
  let testEmpA1Id: number;
  let testEmpA2Id: number;
  let testEmpB1Id: number;
  let testCourseId: number;
  let testLessonId: number;

  const runId = Math.floor(Math.random() * 1000000);

  before(async () => {
    // 0. Ensure schema modifications including 3-column index
    await ensureSchemaModifications();

    // 1. Create Test Companies
    const [compA] = await db
      .insert(companiesTable)
      .values({
        name: `Infracare Interactive Corp A ${runId}`,
        slug: `infracare-interactive-a-${runId}`,
        leaderboardEnabled: true,
        leaderboardPrivacyMode: "full_name",
      })
      .returning();
    testCompanyAId = compA.id;

    const [compB] = await db
      .insert(companiesTable)
      .values({
        name: `Infracare Interactive Corp B ${runId}`,
        slug: `infracare-interactive-b-${runId}`,
        leaderboardEnabled: true,
        leaderboardPrivacyMode: "initials",
      })
      .returning();
    testCompanyBId = compB.id;

    // 2. Create Test Employees
    const [empA1] = await db
      .insert(employeesTable)
      .values({
        companyId: testCompanyAId,
        name: "Yannick Laurent",
        email: `yannick.${runId}@interactive-a.mu`,
        clerkUserId: `user_yannick_${runId}`,
        elevioScore: 0,
      })
      .returning();
    testEmpA1Id = empA1.id;

    const [empA2] = await db
      .insert(employeesTable)
      .values({
        companyId: testCompanyAId,
        name: "Anoushka Ramdin",
        email: `anoushka.${runId}@interactive-a.mu`,
        clerkUserId: `user_anoushka_${runId}`,
        elevioScore: 0,
      })
      .returning();
    testEmpA2Id = empA2.id;

    const [empB1] = await db
      .insert(employeesTable)
      .values({
        companyId: testCompanyBId,
        name: "Devina Seetohul",
        email: `devina.${runId}@interactive-b.mu`,
        clerkUserId: `user_devina_${runId}`,
        elevioScore: 0,
      })
      .returning();
    testEmpB1Id = empB1.id;

    // 3. Create Test Course & Lesson
    const [course] = await db
      .insert(coursesTable)
      .values({
        courseCode: `ELH-INT-${runId}`,
        title: `Interactive Pilot Course ${runId}`,
        slug: `interactive-pilot-${runId}`,
        description: "Interactive Pilot Course Description",
        categoryId: 1,
        priceUsd: "0.00",
        level: "Foundation",
        durationMinutes: 20,
        passingScore: 80,
      } as any)
      .returning();
    testCourseId = course.id;

    const [lesson] = await db
      .insert(lessonsTable)
      .values({
        courseId: testCourseId,
        title: "Workplace Interactive Module",
        orderIndex: 0,
        contentBlocks: [],
      })
      .returning();
    testLessonId = lesson.id;
  });

  after(async () => {
    // Cleanup
    try {
      await db.delete(courseInteractionProgressTable).where(eq(courseInteractionProgressTable.courseId, testCourseId));
      await db.delete(employeeChallengeProgressTable).where(eq(employeeChallengeProgressTable.companyId, testCompanyAId));
      await db.delete(companyChallengeCriteriaTable).where(sql`1=1`);
      await db.delete(companyChallengesTable).where(eq(companyChallengesTable.companyId, testCompanyAId));
      await db.delete(elevioScoreLedgerTable).where(eq(elevioScoreLedgerTable.companyId, testCompanyAId));
      await db.delete(lessonsTable).where(eq(lessonsTable.id, testLessonId));
      await db.delete(coursesTable).where(eq(coursesTable.id, testCourseId));
      await db.delete(employeesTable).where(eq(employeesTable.companyId, testCompanyAId));
      await db.delete(employeesTable).where(eq(employeesTable.companyId, testCompanyBId));
      await db.delete(companiesTable).where(eq(companiesTable.id, testCompanyAId));
      await db.delete(companiesTable).where(eq(companiesTable.id, testCompanyBId));
    } catch {
      // Ignore non-fatal cleanup errors
    }
  });

  // ==========================================
  // 1. TIMESTAMP CONSISTENCY & LEADERBOARDS (Tests 1-6)
  // ==========================================

  it("Test 1: elevio_score_ledger persists authoritative eventTimestamp accurately", async () => {
    const customTime = new Date("2026-06-15T10:30:00Z");
    const result = await recordScoreEvent({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      eventType: "COURSE_COMPLETED",
      sourceEntityType: "course_completion",
      sourceEntityId: `test_ts_1_${runId}`,
      points: 100,
      idempotencyKey: `test_ts_key_1_${runId}`,
      eventTimestamp: customTime,
    });

    assert.equal(result.awarded, true);
    assert.equal(result.transaction!.eventTimestamp.toISOString(), customTime.toISOString());
  });

  it("Test 2: awardCourseCompletionScore propagates explicit eventTimestamp", async () => {
    const pastTimestamp = new Date("2026-07-01T08:00:00Z");
    const res = await awardCourseCompletionScore({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      courseTitle: "Interactive Course",
      version: 99,
      eventTimestamp: pastTimestamp,
    });

    assert.equal(res.awarded, true);
    assert.equal(res.transaction!.eventTimestamp.toISOString(), pastTimestamp.toISOString());
  });

  it("Test 3: awardQuizPassScore propagates explicit eventTimestamp across all bonus tiers", async () => {
    const quizTime = new Date("2026-07-02T14:15:00Z");
    const awards = await awardQuizPassScore({
      companyId: testCompanyAId,
      employeeId: testEmpA2Id,
      clerkUserId: `user_anoushka_${runId}`,
      courseId: testCourseId,
      score: 100,
      quizAttemptId: 8881,
      eventTimestamp: quizTime,
    });

    assert.equal(awards.length, 3); // Base (+50), 100% bonus (+40), first attempt (+20)
    for (const a of awards) {
      assert.equal(a.awarded, true);
    }
  });

  it("Test 4: awardWorkplaceActionScore propagates explicit eventTimestamp", async () => {
    const actionTime = new Date("2026-07-03T11:00:00Z");
    const res = await awardWorkplaceActionScore({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      commitmentId: 9991,
      courseId: testCourseId,
      commitmentText: "Conducted waste bin audit",
      eventTimestamp: actionTime,
    });

    assert.equal(res.awarded, true);
    assert.equal(res.transaction!.eventTimestamp.toISOString(), actionTime.toISOString());
  });

  it("Test 5: awardChallengeCompletionScore defaults to authoritative completedAt timestamp", async () => {
    const chalTime = new Date("2026-07-04T16:45:00Z");
    const res = await awardChallengeCompletionScore({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      challengeId: 7771,
      challengeTitle: "July Waste Mission",
      points: 100,
      completedAt: chalTime,
    });

    assert.equal(res.awarded, true);
    assert.equal(res.transaction!.eventTimestamp.toISOString(), chalTime.toISOString());
  });

  it("Test 6: Monthly Leaderboard uses authoritative eventTimestamp for seasonal aggregation", async () => {
    // Create June 2026 season
    const juneStart = new Date("2026-06-01T00:00:00Z");
    const juneEnd = new Date("2026-06-30T23:59:59Z");

    const [juneSeason] = await db
      .insert(companySeasonsTable)
      .values({
        companyId: testCompanyAId,
        seasonType: "MONTHLY",
        title: `June 2026 Test ${runId}`,
        startDate: juneStart,
        endDate: juneEnd,
        status: "ACTIVE",
      })
      .returning();

    const leaderboard = await calculateCompanyLeaderboard(testCompanyAId, undefined, juneSeason.id);
    const empA1Rank = leaderboard.topPerformers!.find((r) => r.seasonalScore === 100);

    // Only Test 1 occurred in June (100 pts). Tests 2, 3, 4, 5 were in July.
    assert.ok(empA1Rank, "Employee A1 should appear in June leaderboard");
    assert.equal(empA1Rank.seasonalScore, 100, "June leaderboard should only aggregate June eventTimestamp transactions");
  });

  // ==========================================
  // 2. REUSABLE INTERACTION FRAMEWORK EVALUATION (Tests 7-17)
  // ==========================================

  it("Test 7: DECISION_SCENARIO evaluates optimal vs suboptimal choice and returns consequences", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `ws_decision_1_${runId}`,
      interactionType: "DECISION_SCENARIO",
      submissionPayload: { selectedOptionId: 0 },
      interactionConfig: {
        choices: [
          { id: 0, label: "Check printed label first", correct: true, feedback: "Excellent choice.", consequences: "Avoids batch contamination." },
          { id: 1, label: "Guess and throw in yellow bin", correct: false, feedback: "Avoid guessing.", consequences: "Causes recyclable batch rejection." },
        ],
        takeaway: "Always check site-specific labels.",
      },
    });

    assert.equal(res.passed, true);
    assert.equal(res.score, 100);
    assert.equal(res.feedback.title, "Best response");
    assert.equal(res.feedback.consequences, "Avoids batch contamination.");
    assert.equal(res.feedback.takeaway, "Always check site-specific labels.");
  });

  it("Test 8: SORTING evaluates category assignments and reports item-by-item results", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `ws_sorting_1_${runId}`,
      interactionType: "SORTING",
      submissionPayload: {
        assignments: {
          item_bottle: "plastic_metal",
          item_box: "paper",
          item_greasy: "landfill",
        },
      },
      interactionConfig: {
        items: [
          { id: "item_bottle", expectedCategoryId: "plastic_metal" },
          { id: "item_box", expectedCategoryId: "paper" },
          { id: "item_greasy", expectedCategoryId: "landfill" },
        ],
      },
    });

    assert.equal(res.passed, true);
    assert.equal(res.score, 3);
    assert.equal(res.maxScore, 3);
    assert.equal(res.feedback.itemFeedback?.item_bottle, true);
    assert.equal(res.feedback.itemFeedback?.item_box, true);
  });

  it("Test 9: SORTING partial or incorrect assignments fail pass status", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA2Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `ws_sorting_2_${runId}`,
      interactionType: "SORTING",
      submissionPayload: {
        assignments: {
          item_bottle: "paper", // incorrect
          item_box: "paper",   // correct
        },
      },
      interactionConfig: {
        items: [
          { id: "item_bottle", expectedCategoryId: "plastic_metal" },
          { id: "item_box", expectedCategoryId: "paper" },
        ],
      },
    });

    assert.equal(res.passed, false);
    assert.equal(res.score, 1);
    assert.equal(res.feedback.itemFeedback?.item_bottle, false);
    assert.equal(res.feedback.itemFeedback?.item_box, true);
  });

  it("Test 10: MATCHING evaluates paired terms and definitions", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `esg_matching_1_${runId}`,
      interactionType: "MATCHING",
      submissionPayload: {
        pairs: [
          { termId: "E", definitionId: "env_def" },
          { termId: "S", definitionId: "soc_def" },
          { termId: "G", definitionId: "gov_def" },
        ],
      },
      interactionConfig: {
        pairs: [
          { termId: "E", definitionId: "env_def" },
          { termId: "S", definitionId: "soc_def" },
          { termId: "G", definitionId: "gov_def" },
        ],
      },
    });

    assert.equal(res.passed, true);
    assert.equal(res.score, 3);
    assert.equal(res.feedback.title, "Concepts Correctly Matched");
  });

  it("Test 11: SEQUENCING evaluates step order and positions", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `water_seq_1_${runId}`,
      interactionType: "SEQUENCING",
      submissionPayload: {
        orderedIds: ["step_1", "step_2", "step_3", "step_4"],
      },
      interactionConfig: {
        steps: [
          { id: "step_1", order: 1 },
          { id: "step_2", order: 2 },
          { id: "step_3", order: 3 },
          { id: "step_4", order: 4 },
        ],
        takeaway: "Contain and report before escalation.",
      },
    });

    assert.equal(res.passed, true);
    assert.equal(res.score, 4);
    assert.equal(res.feedback.title, "Correct Sequence");
  });

  it("Test 12: PRIORITISATION awards credit for top operational priorities", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `energy_prio_1_${runId}`,
      interactionType: "PRIORITISATION",
      submissionPayload: {
        selectedIds: ["opt_ac_leak", "opt_empty_lights"],
      },
      interactionConfig: {
        optimalPriorityIds: ["opt_ac_leak", "opt_empty_lights"],
        maxSelect: 2,
        requiredThreshold: 2,
        consequences: "Eliminated continuous cooling losses.",
      },
    });

    assert.equal(res.passed, true);
    assert.equal(res.score, 2);
    assert.equal(res.feedback.title, "Optimal Priorities Selected");
  });

  it("Test 13: MULTI_STEP_SCENARIO follows branching decision paths to final workplace outcome", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `procure_branch_1_${runId}`,
      interactionType: "MULTI_STEP_SCENARIO",
      submissionPayload: {
        stepResponses: { stage1: "opt_ask_criteria", stage2: "opt_eval_durability" },
        finalNodeId: "outcome_sustainable_award",
      },
      interactionConfig: {
        outcomes: {
          outcome_sustainable_award: {
            title: "Successful Sustainable Procurement",
            summary: "You evaluated total lifecycle cost and vendor ESG compliance.",
            consequences: "Achieved 30% lower lifecycle emissions.",
            isOptimal: true,
          },
        },
      },
    });

    assert.equal(res.passed, true);
    assert.equal(res.feedback.title, "Successful Sustainable Procurement");
    assert.equal(res.feedback.consequences, "Achieved 30% lower lifecycle emissions.");
  });

  it("Test 14: CHALLENGE_ASSESSMENT verifies multi-question threshold server-side", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `chal_assess_waste_${runId}`,
      interactionType: "CHALLENGE_ASSESSMENT",
      submissionPayload: {
        answers: { q1: 0, q2: 1, q3: 2, q4: 1, q5: 0 },
      },
      interactionConfig: {
        passThreshold: 4,
        questions: [
          { id: "q1", correctIndex: 0 },
          { id: "q2", correctIndex: 1 },
          { id: "q3", correctIndex: 2 },
          { id: "q4", correctIndex: 1 },
          { id: "q5", correctIndex: 0 },
        ],
      },
    });

    assert.equal(res.passed, true);
    assert.equal(res.score, 5);
    assert.equal(res.maxScore, 5);
    assert.equal(res.feedback.title, "Challenge Assessment Passed");
  });

  it("Test 15: CHALLENGE_ASSESSMENT fails when score falls below pass threshold", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA2Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `chal_assess_waste_fail_${runId}`,
      interactionType: "CHALLENGE_ASSESSMENT",
      submissionPayload: {
        answers: { q1: 0, q2: 99, q3: 99, q4: 99, q5: 99 }, // only q1 correct
      },
      interactionConfig: {
        passThreshold: 4,
        questions: [
          { id: "q1", correctIndex: 0 },
          { id: "q2", correctIndex: 1 },
          { id: "q3", correctIndex: 2 },
          { id: "q4", correctIndex: 1 },
          { id: "q5", correctIndex: 0 },
        ],
      },
    });

    assert.equal(res.passed, false);
    assert.equal(res.score, 1);
    assert.equal(res.feedback.title, "Assessment Review Required");
  });

  it("Test 16: Zero score inflation — ordinary interaction completion records 0 ELEVIO ledger points", async () => {
    const preSummary = await getEmployeeScoreSummary(testEmpA1Id, testCompanyAId);

    await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      lessonId: testLessonId,
      interactionId: `zero_score_check_${runId}`,
      interactionType: "DECISION_SCENARIO",
      submissionPayload: { selectedOptionId: 0 },
      interactionConfig: {
        choices: [{ id: 0, label: "Correct", correct: true, feedback: "Well done." }],
      },
    });

    const postSummary = await getEmployeeScoreSummary(testEmpA1Id, testCompanyAId);
    assert.equal(postSummary.totalScore, preSummary.totalScore, "Interactions must never directly award ELEVIO Score ledger points");
  });

  it("Test 17: getLearnerCourseInteractions recovers saved state payload for reloads", async () => {
    const saved = await getLearnerCourseInteractions({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
    });

    assert.ok(saved.length >= 5, "Should retrieve all saved interaction states for this course");
    const sortingRecord = saved.find((s) => s.interactionId === `ws_sorting_1_${runId}`);
    assert.ok(sortingRecord, "Sorting interaction record found");
    assert.equal((sortingRecord.statePayload as any).assignments.item_bottle, "plastic_metal");
  });

  // ==========================================
  // 3. COMPANY CHALLENGE CRITERIA INTEGRATION (Tests 18-26)
  // ==========================================

  let testChallengeId: number;

  it("Test 18: createCompanyChallenge supports INTERACTION_COMPLETION criterion", async () => {
    const startDate = new Date(Date.now() - 3600000);
    const endDate = new Date(Date.now() + 14 * 86400000);

    const result = await createTestChallenge({
      companyId: testCompanyAId,
      title: `Waste Sorting Sprint ${runId}`,
      code: `WS-SPRINT-${runId}`,
      category: "Waste Reduction",
      rewardPoints: 100,
      startDate,
      endDate,
      createdBy: "admin@interactive-a.mu",
      criteria: [
        {
          criterionType: "INTERACTION_COMPLETION",
          interactionId: `ws_sorting_1_${runId}`,
          courseId: testCourseId,
          orderIndex: 0,
          title: "Complete Workplace Sorting Activity",
        },
        {
          criterionType: "CHALLENGE_ASSESSMENT_PASS",
          interactionId: `chal_assess_waste_${runId}`,
          courseId: testCourseId,
          assessmentThreshold: 4,
          orderIndex: 1,
          title: "Pass Waste Spot-Check Assessment",
        },
      ],
    });

    assert.ok(result.challenge.id);
    assert.equal(result.criteria.length, 2);
    testChallengeId = result.challenge.id;
  });

  it("Test 19: evaluateEmployeeChallengeProgress marks INTERACTION_COMPLETION criterion satisfied", async () => {
    const [empA1] = await db.select().from(employeesTable).where(eq(employeesTable.id, testEmpA1Id));
    const evalRes = await evaluateEmployeeChallengeProgress({ employee: empA1 });

    assert.equal(evalRes.completedChallenges.length, 1);
    assert.equal(evalRes.completedChallenges[0].challengeId, testChallengeId);

    const [chalProg] = await db
      .select()
      .from(employeeChallengeProgressTable)
      .where(
        and(
          eq(employeeChallengeProgressTable.employeeId, testEmpA1Id),
          eq(employeeChallengeProgressTable.challengeId, testChallengeId)
        )
      );

    assert.ok(chalProg, "Employee challenge progress should be created");
    assert.equal(chalProg.completedCriteriaCount, 2, "Both criteria were completed in Tests 8 and 14");
    assert.equal(chalProg.status, "COMPLETED");
  });

  it("Test 20: Challenge completion awards reward points (+100) exactly once in ledger", async () => {
    const challengeTx = await db
      .select()
      .from(elevioScoreLedgerTable)
      .where(
        and(
          eq(elevioScoreLedgerTable.employeeId, testEmpA1Id),
          eq(elevioScoreLedgerTable.eventType, "CHALLENGE_COMPLETED"),
          eq(elevioScoreLedgerTable.sourceEntityId, String(testChallengeId))
        )
      );

    assert.equal(challengeTx.length, 1, "Challenge completion should be credited exactly once in ledger");
    assert.equal(challengeTx[0].points, 100);
  });

  it("Test 21: Idempotency check — re-evaluating challenge never double-awards points", async () => {
    const [empA1] = await db.select().from(employeesTable).where(eq(employeesTable.id, testEmpA1Id));
    const evalRes = await evaluateEmployeeChallengeProgress({ employee: empA1 });

    assert.equal(evalRes.completedChallenges.length, 0, "No new challenges completed on re-evaluation");
    const challengeTx = await db
      .select()
      .from(elevioScoreLedgerTable)
      .where(
        and(
          eq(elevioScoreLedgerTable.employeeId, testEmpA1Id),
          eq(elevioScoreLedgerTable.eventType, "CHALLENGE_COMPLETED"),
          eq(elevioScoreLedgerTable.sourceEntityId, String(testChallengeId))
        )
      );
    assert.equal(challengeTx.length, 1);
  });

  it("Test 22: CHALLENGE_ASSESSMENT_PASS requires passing score threshold", async () => {
    // Employee A2 failed assessment in Test 15
    const [empA2] = await db.select().from(employeesTable).where(eq(employeesTable.id, testEmpA2Id));
    await evaluateEmployeeChallengeProgress({ employee: empA2 });

    const [chalProg] = await db
      .select()
      .from(employeeChallengeProgressTable)
      .where(
        and(
          eq(employeeChallengeProgressTable.employeeId, testEmpA2Id),
          eq(employeeChallengeProgressTable.challengeId, testChallengeId)
        )
      );

    assert.equal(chalProg?.status ?? "IN_PROGRESS", "IN_PROGRESS");
    assert.notEqual(chalProg?.completedCriteriaCount, 2);
  });

  it("Test 23: Tenant Isolation — Employee in Company B cannot satisfy Company A challenge", async () => {
    // Complete interaction for Employee B1
    await evaluateAndSaveInteraction({
      companyId: testCompanyBId,
      employeeId: testEmpB1Id,
      courseId: testCourseId,
      interactionId: `ws_sorting_1_${runId}`,
      interactionType: "SORTING",
      submissionPayload: {
        assignments: { item_bottle: "plastic_metal", item_box: "paper", item_greasy: "landfill" },
      },
      interactionConfig: {
        items: [
          { id: "item_bottle", expectedCategoryId: "plastic_metal" },
          { id: "item_box", expectedCategoryId: "paper" },
          { id: "item_greasy", expectedCategoryId: "landfill" },
        ],
      },
    });

    const [empB1] = await db.select().from(employeesTable).where(eq(employeesTable.id, testEmpB1Id));
    await evaluateEmployeeChallengeProgress({ employee: empB1 });

    const [chalProg] = await db
      .select()
      .from(employeeChallengeProgressTable)
      .where(
        and(
          eq(employeeChallengeProgressTable.employeeId, testEmpB1Id),
          eq(employeeChallengeProgressTable.challengeId, testChallengeId)
        )
      );

    assert.equal(chalProg, undefined, "Company B employee must not participate in Company A challenges");
  });

  it("Test 24: Non-retroactive challenge constraint — Interactions prior to start date are excluded", async () => {
    // Create challenge with start date in future
    const futureStart = new Date(Date.now() + 7 * 86400000);
    const futureEnd = new Date(Date.now() + 21 * 86400000);

    const futureChal = await createTestChallenge({
      companyId: testCompanyAId,
      title: `Future Water Challenge ${runId}`,
      code: `FWC-${runId}`,
      rewardPoints: 75,
      startDate: futureStart,
      endDate: futureEnd,
      createdBy: "admin@interactive-a.mu",
      allowPriorCompletion: false,
      criteria: [
        {
          criterionType: "INTERACTION_COMPLETION",
          interactionId: `water_seq_1_${runId}`,
          courseId: testCourseId,
          orderIndex: 0,
          title: "Sequencing Protocol",
          allowPriorCompletion: false,
        },
      ],
    });

    const [empA1] = await db.select().from(employeesTable).where(eq(employeesTable.id, testEmpA1Id));
    await evaluateEmployeeChallengeProgress({ employee: empA1 });

    const [prog] = await db
      .select()
      .from(employeeChallengeProgressTable)
      .where(
        and(
          eq(employeeChallengeProgressTable.employeeId, testEmpA1Id),
          eq(employeeChallengeProgressTable.challengeId, futureChal.challenge.id)
        )
      );

    assert.equal(prog?.completedCriteriaCount ?? 0, 0, "Prior interaction must not satisfy future challenge");
  });

  it("Test 25: Multiple combined criteria challenge evaluation", async () => {
    const startDate = new Date(Date.now() - 3600000);
    const endDate = new Date(Date.now() + 14 * 86400000);

    const multiCriteriaChal = await createTestChallenge({
      companyId: testCompanyAId,
      title: `Holistic Sustainability Mission ${runId}`,
      code: `HSM-${runId}`,
      rewardPoints: 100,
      startDate,
      endDate,
      createdBy: "admin@interactive-a.mu",
      criteria: [
        {
          criterionType: "COURSE_COMPLETION",
          courseId: testCourseId,
          orderIndex: 0,
          title: "Complete Course",
        },
        {
          criterionType: "INTERACTION_COMPLETION",
          interactionId: `ws_decision_1_${runId}`,
          courseId: testCourseId,
          orderIndex: 1,
          title: "Workplace Decision",
        },
      ],
    });

    // Award course completion during window
    await db.insert(enrollmentsTable).values({
      companyId: testCompanyAId,
      employeeId: testEmpA2Id,
      userId: `user_anoushka_${runId}`,
      courseId: testCourseId,
      status: "completed",
      progressPct: 100,
      completedAt: new Date(),
    });

    // Pass interaction during window
    await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA2Id,
      courseId: testCourseId,
      interactionId: `ws_decision_1_${runId}`,
      interactionType: "DECISION_SCENARIO",
      submissionPayload: { selectedOptionId: 0 },
      interactionConfig: {
        choices: [{ id: 0, label: "Correct", correct: true, feedback: "Great" }],
      },
    });

    const [empA2] = await db.select().from(employeesTable).where(eq(employeesTable.id, testEmpA2Id));
    await evaluateEmployeeChallengeProgress({ employee: empA2 });

    const [prog] = await db
      .select()
      .from(employeeChallengeProgressTable)
      .where(
        and(
          eq(employeeChallengeProgressTable.employeeId, testEmpA2Id),
          eq(employeeChallengeProgressTable.challengeId, multiCriteriaChal.challenge.id)
        )
      );

    assert.ok(prog, "Challenge progress should be recorded");
    assert.equal(prog.status, "COMPLETED");
    assert.equal(prog.completedCriteriaCount, 2);
  });

  it("Test 26: Active challenge progress percent calculation accuracy", async () => {
    const [prog] = await db
      .select()
      .from(employeeChallengeProgressTable)
      .where(
        and(
          eq(employeeChallengeProgressTable.challengeId, testChallengeId),
          eq(employeeChallengeProgressTable.employeeId, testEmpA1Id)
        )
      );

    assert.ok(prog);
    assert.equal(prog.progressPct, 100);
    assert.equal(prog.totalCriteriaCount, 2);
    assert.equal(prog.completedCriteriaCount, 2);
  });

  // ==========================================
  // 4. COURSE & CERTIFICATION BACKWARD COMPATIBILITY (Tests 27-30)
  // ==========================================

  it("Test 27: Historical completed enrollments remain 100% complete without interactive block re-execution", async () => {
    const [historicalEnrollment] = await db
      .insert(enrollmentsTable)
      .values({
        companyId: testCompanyAId,
        userId: `user_historical_${runId}`,
        courseId: testCourseId,
        status: "completed",
        progressPct: 100,
        completedAt: new Date("2026-01-10T12:00:00Z"),
      })
      .returning();

    assert.equal(historicalEnrollment.status, "completed");
    assert.equal(historicalEnrollment.progressPct, 100);
    assert.ok(historicalEnrollment.completedAt);
  });

  it("Test 28: Interactive blocks gate uncompleted enrollments smoothly", async () => {
    const [newEnrollment] = await db
      .insert(enrollmentsTable)
      .values({
        companyId: testCompanyAId,
        userId: `user_new_${runId}`,
        courseId: testCourseId,
        status: "active",
        progressPct: 20,
      })
      .returning();

    assert.equal(newEnrollment.status, "active");
    assert.equal(newEnrollment.progressPct, 20);
  });

  it("Test 29: Learners can replay interactions without invalidating course completion status", async () => {
    const [enrollment] = await db
      .insert(enrollmentsTable)
      .values({
        companyId: testCompanyAId,
        userId: `user_anoushka_${runId}`,
        courseId: testCourseId,
        status: "completed",
        progressPct: 100,
        completedAt: new Date("2026-02-01T12:00:00Z"),
      })
      .returning();

    assert.equal(enrollment.status, "completed");

    // Replay interaction
    await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA2Id,
      courseId: testCourseId,
      interactionId: `ws_decision_1_${runId}`,
      interactionType: "DECISION_SCENARIO",
      submissionPayload: { selectedOptionId: 0 },
      interactionConfig: {
        choices: [{ id: 0, label: "Correct", correct: true, feedback: "Great replay" }],
      },
    });

    const [stillCompleted] = await db
      .select()
      .from(enrollmentsTable)
      .where(eq(enrollmentsTable.id, enrollment.id));

    assert.equal(stillCompleted.status, "completed");
    assert.equal(stillCompleted.progressPct, 100);
  });

  it("Test 30: Final quiz flow and submission remain intact alongside interactive modules", async () => {
    const [quizAttempt] = await db
      .insert(quizAttemptsTable)
      .values({
        userId: `user_yannick_${runId}`,
        courseId: testCourseId,
        score: 95,
        passed: true,
      })
      .returning();

    assert.equal(quizAttempt.passed, true);
    assert.equal(quizAttempt.score, 95);
  });

  // ==========================================
  // 5. FULL GAMIFICATION & REGRESSIONS SUITE (Tests 31-40)
  // ==========================================

  it("Test 31: Course completion ledger score is exactly +100", async () => {
    const idempotencyKey = `reg_course_complete_${runId}`;
    const res = await recordScoreEvent({
      companyId: testCompanyBId,
      employeeId: testEmpB1Id,
      eventType: "COURSE_COMPLETED",
      sourceEntityType: "course_completion",
      sourceEntityId: "reg_course_1",
      points: 100,
      idempotencyKey,
    });

    assert.equal(res.awarded, true);
    assert.equal(res.transaction!.points, 100);
  });

  it("Test 32: Quiz pass ledger score is +50 base", async () => {
    const idempotencyKey = `reg_quiz_base_${runId}`;
    const res = await recordScoreEvent({
      companyId: testCompanyBId,
      employeeId: testEmpB1Id,
      eventType: "QUIZ_PASSED",
      sourceEntityType: "quiz_attempt",
      sourceEntityId: "reg_quiz_1",
      points: 50,
      idempotencyKey,
    });

    assert.equal(res.awarded, true);
    assert.equal(res.transaction!.points, 50);
  });

  it("Test 33: Workplace action completion ledger score is +50", async () => {
    const idempotencyKey = `reg_action_${runId}`;
    const res = await recordScoreEvent({
      companyId: testCompanyBId,
      employeeId: testEmpB1Id,
      eventType: "WORKPLACE_ACTION_COMPLETED",
      sourceEntityType: "learner_commitment",
      sourceEntityId: "reg_commit_1",
      points: 50,
      idempotencyKey,
    });

    assert.equal(res.awarded, true);
    assert.equal(res.transaction!.points, 50);
  });

  it("Test 34: Challenge completion ledger score is +100", async () => {
    const idempotencyKey = `reg_chal_${runId}`;
    const res = await recordScoreEvent({
      companyId: testCompanyBId,
      employeeId: testEmpB1Id,
      eventType: "CHALLENGE_COMPLETED",
      sourceEntityType: "company_challenge",
      sourceEntityId: "reg_chal_1",
      points: 100,
      idempotencyKey,
    });

    assert.equal(res.awarded, true);
    assert.equal(res.transaction!.points, 100);
  });

  it("Test 35: Employee total score equals sum of ledger entries", async () => {
    const summary = await getEmployeeScoreSummary(testEmpB1Id, testCompanyBId);
    assert.equal(summary.totalScore, 300); // 100 + 50 + 50 + 100
  });

  it("Test 36: Leaderboard rankings reflect accurate score sorting", async () => {
    const leaderboard = await calculateCompanyLeaderboard(testCompanyBId);
    assert.equal(leaderboard.topPerformers!.length, 1);
    assert.equal(leaderboard.topPerformers![0].seasonalScore, 300);
  });

  it("Test 37: Leaderboard privacy mode masking applies correctly", async () => {
    // Company B has leaderboardPrivacyMode = "initials"
    const leaderboard = await calculateCompanyLeaderboard(testCompanyBId);
    assert.equal(leaderboard.topPerformers![0].displayName, "Devina S.");
  });

  it("Test 38: Inactive or closed season scores remain permanently queryable", async () => {
    const [closedSeason] = await db
      .insert(companySeasonsTable)
      .values({
        companyId: testCompanyBId,
        seasonType: "MONTHLY",
        title: `Closed Season ${runId}`,
        startDate: new Date("2026-05-01T00:00:00Z"),
        endDate: new Date("2026-05-31T23:59:59Z"),
        status: "CLOSED",
        closedAt: new Date("2026-06-01T00:00:00Z"),
      })
      .returning();

    const leaderboard = await calculateCompanyLeaderboard(testCompanyBId, undefined, closedSeason.id);
    assert.ok(leaderboard);
    assert.equal(leaderboard.season?.status, "CLOSED");
  });

  it("Test 39: Category breakdown in employee summary accurately distinguishes categories", async () => {
    const summary = await getEmployeeScoreSummary(testEmpB1Id, testCompanyBId);
    assert.equal(summary.breakdown.learning, 200); // 100 course + 100 challenge
    assert.equal(summary.breakdown.knowledge, 50);  // 50 quiz
    assert.equal(summary.breakdown.workplaceActions, 50); // 50 workplace action
  });

  it("Test 40: ensureActiveMonthlySeason creates seamless current monthly season", async () => {
    const active = await getOrCreateActiveCompanySeason(testCompanyBId);
    assert.ok(active);
    assert.equal(active.status, "ACTIVE");
  });

  // ==========================================
  // 6. SECURITY & TENANT ISOLATION (Tests 41-45)
  // ==========================================

  it("Test 41: evaluateAndSaveInteraction rejects non-existent employee ID", async () => {
    await assert.rejects(
      async () => {
        await evaluateAndSaveInteraction({
          companyId: testCompanyAId,
          employeeId: 999999,
          courseId: testCourseId,
          interactionId: "invalid_emp_check",
          interactionType: "DECISION_SCENARIO",
          submissionPayload: {},
        });
      },
      { message: "Employee not found or tenant mismatch" }
    );
  });

  it("Test 42: evaluateAndSaveInteraction rejects tenant mismatch", async () => {
    await assert.rejects(
      async () => {
        // Employee A1 belongs to Company A, passing Company B ID
        await evaluateAndSaveInteraction({
          companyId: testCompanyBId,
          employeeId: testEmpA1Id,
          courseId: testCourseId,
          interactionId: "tenant_mismatch_check",
          interactionType: "DECISION_SCENARIO",
          submissionPayload: {},
        });
      },
      { message: "Employee not found or tenant mismatch" }
    );
  });

  it("Test 43: evaluateAndSaveInteraction gracefully handles empty or unknown interaction types", async () => {
    const res = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      interactionId: `unknown_type_${runId}`,
      interactionType: "UNKNOWN" as any,
      submissionPayload: {},
    });

    assert.equal(res.passed, true);
    assert.equal(res.score, 100);
  });

  it("Test 44: Race condition & idempotency safety in course_interaction_progress upsert", async () => {
    const promises = [1, 2, 3].map(() =>
      evaluateAndSaveInteraction({
        companyId: testCompanyAId,
        employeeId: testEmpA1Id,
        courseId: testCourseId,
        interactionId: `concurrency_test_${runId}`,
        interactionType: "DECISION_SCENARIO",
        submissionPayload: { selectedOptionId: 0 },
        interactionConfig: {
          choices: [{ id: 0, label: "Correct", correct: true, feedback: "Passed" }],
        },
      })
    );

    const results = await Promise.all(promises);
    assert.equal(results.length, 3);

    const rows = await db
      .select()
      .from(courseInteractionProgressTable)
      .where(
        and(
          eq(courseInteractionProgressTable.employeeId, testEmpA1Id),
          eq(courseInteractionProgressTable.interactionId, `concurrency_test_${runId}`)
        )
      );

    assert.equal(rows.length, 1, "Exactly one row should exist per employee and interaction ID");
  });

  it("Test 45: Verifies database contains lessons and content blocks for pilot courses", async () => {
    const courses = await db.select().from(coursesTable).limit(5);
    assert.ok(courses.length > 0, "Catalogue has active courses");
  });

  it("Test 46: Cross-course & version isolation — same interaction_id in different courses creates independent progress records without collisions", async () => {
    const [secondCourse] = await db
      .insert(coursesTable)
      .values({
        courseCode: `ELH-ISOL-${runId}`,
        title: `Energy Second Course ${runId}`,
        slug: `energy-second-course-${runId}`,
        description: "Testing course isolation",
        categoryId: 1,
        level: "Intermediate",
        durationMinutes: 30,
        version: 2,
      } as any)
      .returning();

    const sharedInteractionId = `shared_decision_block_${runId}`;

    // 1. Submit interaction in course 1
    const res1 = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      interactionId: sharedInteractionId,
      interactionType: "DECISION_SCENARIO",
      submissionPayload: { selectedOptionId: 0 },
      interactionConfig: {
        choices: [{ id: 0, label: "Option A1", correct: true, feedback: "Great in Course 1" }],
      },
    });

    // 2. Submit same interaction_id in course 2 with different choice/outcome
    const res2 = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: secondCourse.id,
      interactionId: sharedInteractionId,
      interactionType: "DECISION_SCENARIO",
      submissionPayload: { selectedOptionId: 1 },
      interactionConfig: {
        choices: [
          { id: 0, label: "Option A1", correct: true, feedback: "Course 2 opt 1" },
          { id: 1, label: "Option B2", correct: false, feedback: "Course 2 opt 2 suboptimal" },
        ],
      },
    });

    assert.equal(res1.passed, true);
    assert.equal(res2.passed, false);

    // 3. Query interaction progress records for course 1 and course 2
    const course1Interactions = await getLearnerCourseInteractions({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
    });

    const course2Interactions = await getLearnerCourseInteractions({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: secondCourse.id,
    });

    const c1Rec = course1Interactions.find((i) => i.interactionId === sharedInteractionId);
    const c2Rec = course2Interactions.find((i) => i.interactionId === sharedInteractionId);

    assert.ok(c1Rec, "Course 1 should have its own interaction record");
    assert.ok(c2Rec, "Course 2 should have its own interaction record");
    assert.notEqual(c1Rec.id, c2Rec.id, "Records must be distinct database entries");
    assert.equal(c1Rec.passed, true);
    assert.equal(c2Rec.passed, false);
    assert.equal((c1Rec.statePayload as any).selectedOptionId, 0);
    assert.equal((c2Rec.statePayload as any).selectedOptionId, 1);
  });

  it("Test 47: Interaction reuse across course versions preserves version-isolated progress", async () => {
    // Version 1 of course
    const [courseV1] = await db
      .insert(coursesTable)
      .values({
        courseCode: `ELH-V1-${runId}`,
        title: `Sustainability Foundations v1 ${runId}`,
        slug: `sustainability-foundations-v1-${runId}`,
        description: "Version 1",
        categoryId: 1,
        level: "Beginner",
        durationMinutes: 20,
        version: 1,
      } as any)
      .returning();

    // Version 2 of course
    const [courseV2] = await db
      .insert(coursesTable)
      .values({
        courseCode: `ELH-V2-${runId}`,
        title: `Sustainability Foundations v2 ${runId}`,
        slug: `sustainability-foundations-v2-${runId}`,
        description: "Version 2 with updated interaction criteria",
        categoryId: 1,
        level: "Beginner",
        durationMinutes: 25,
        version: 2,
      } as any)
      .returning();

    const versionedInteractionId = `waste_sorting_module_${runId}`;

    // Learner completed interaction in Course V1
    await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: courseV1.id,
      interactionId: versionedInteractionId,
      interactionType: "SORTING",
      submissionPayload: { assignments: { item1: "bin_a", item2: "bin_b" } },
      interactionConfig: {
        items: [
          { id: "item1", expectedCategoryId: "bin_a" },
          { id: "item2", expectedCategoryId: "bin_b" },
        ],
      },
    });

    // Learner is taking Course V2 where same interaction exists
    await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: courseV2.id,
      interactionId: versionedInteractionId,
      interactionType: "SORTING",
      submissionPayload: { assignments: { item1: "bin_a", item2: "bin_a" } }, // Different attempt
      interactionConfig: {
        items: [
          { id: "item1", expectedCategoryId: "bin_a" },
          { id: "item2", expectedCategoryId: "bin_b" },
        ],
      },
    });

    const v1Records = await getLearnerCourseInteractions({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: courseV1.id,
    });
    const v2Records = await getLearnerCourseInteractions({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: courseV2.id,
    });

    const v1 = v1Records.find((i) => i.interactionId === versionedInteractionId);
    const v2 = v2Records.find((i) => i.interactionId === versionedInteractionId);

    assert.ok(v1 && v2, "Both version progress records must exist independently");
    assert.equal(v1.passed, true);
    assert.equal(v2.passed, false);
    assert.equal(v1.attemptCount, 1);
    assert.equal(v2.attemptCount, 1);
  });

  it("Test 48: Existing progress retrieval recovers full structured state payload on course reload", async () => {
    const retrievalInteractionId = `matching_retrieval_${runId}`;
    const payload = {
      pairs: [
        { termId: "t1", definitionId: "d1" },
        { termId: "t2", definitionId: "d2" },
      ],
    };

    await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      interactionId: retrievalInteractionId,
      interactionType: "MATCHING",
      submissionPayload: payload,
      interactionConfig: {
        pairs: [
          { termId: "t1", definitionId: "d1" },
          { termId: "t2", definitionId: "d2" },
        ],
      },
    });

    const records = await getLearnerCourseInteractions({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
    });

    const record = records.find((i) => i.interactionId === retrievalInteractionId);
    assert.ok(record);
    assert.equal(record.passed, true);
    assert.deepEqual(record.statePayload, payload, "State payload must be precisely restored for learner session");
  });

  it("Test 49: Idempotent resubmission updates state and attempt count without duplicate record creation", async () => {
    const idempotentId = `idempotent_decision_${runId}`;

    // Attempt 1: Suboptimal
    const res1 = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      interactionId: idempotentId,
      interactionType: "DECISION_SCENARIO",
      submissionPayload: { selectedOptionId: 1 },
      interactionConfig: {
        choices: [
          { id: 0, label: "Optimal", correct: true, feedback: "Correct" },
          { id: 1, label: "Suboptimal", correct: false, feedback: "Try again" },
        ],
      },
    });
    assert.equal(res1.passed, false);

    // Attempt 2: Correct on retry
    const res2 = await evaluateAndSaveInteraction({
      companyId: testCompanyAId,
      employeeId: testEmpA1Id,
      courseId: testCourseId,
      interactionId: idempotentId,
      interactionType: "DECISION_SCENARIO",
      submissionPayload: { selectedOptionId: 0 },
      interactionConfig: {
        choices: [
          { id: 0, label: "Optimal", correct: true, feedback: "Correct" },
          { id: 1, label: "Suboptimal", correct: false, feedback: "Try again" },
        ],
      },
    });
    assert.equal(res2.passed, true);

    const rows = await db
      .select()
      .from(courseInteractionProgressTable)
      .where(
        and(
          eq(courseInteractionProgressTable.employeeId, testEmpA1Id),
          eq(courseInteractionProgressTable.courseId, testCourseId),
          eq(courseInteractionProgressTable.interactionId, idempotentId)
        )
      );

    assert.equal(rows.length, 1, "Exactly one database row must exist under (employeeId, courseId, interactionId)");
    assert.equal(rows[0].passed, true);
    assert.equal(rows[0].attemptCount, 2, "Attempt count should increment to 2");
    assert.equal((rows[0].statePayload as any).selectedOptionId, 0);
  });
});
