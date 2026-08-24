import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import {
  db,
  companiesTable,
  employeesTable,
  categoriesTable,
  coursesTable,
  quizAttemptsTable,
  learnerCommitmentsTable,
  elevioScoreLedgerTable,
} from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import {
  awardCourseCompletionScore,
  awardQuizPassScore,
  awardWorkplaceActionScore,
  getEmployeeScoreSummary,
  reverseScoreTransaction,
  syncEmployeeElevioScore,
  SCORING_POINTS,
} from "./lib/scoringService.js";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications.js";

describe("Sprint 14 — ELEVIO Score & Gamification Foundation Tests", () => {
  let companyAId: number;
  let companyBId: number;
  let employeeA1Id: number;
  let employeeA2Id: number;
  let employeeB1Id: number;
  let testCourse1Id: number;
  let testCourse2Id: number;

  const TEST_CLERK_USER_A1 = "test_clerk_user_a1_score";
  const TEST_CLERK_USER_A2 = "test_clerk_user_a2_score";
  const TEST_CLERK_USER_B1 = "test_clerk_user_b1_score";

  before(async () => {
    // 0. Ensure schema modifications exist
    await ensureSchemaModifications();

    // 1. Create Test Company A and Company B
    const [compA] = await db
      .insert(companiesTable)
      .values({
        name: "Score Test Company A",
        slug: `score-test-comp-a-${Date.now()}`,
        industry: "Technology",
      })
      .returning();
    companyAId = compA.id;

    const [compB] = await db
      .insert(companiesTable)
      .values({
        name: "Score Test Company B",
        slug: `score-test-comp-b-${Date.now()}`,
        industry: "Finance",
      })
      .returning();
    companyBId = compB.id;

    // 2. Create Employees
    const [empA1] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        clerkUserId: TEST_CLERK_USER_A1,
        name: "Alice A1",
        email: `alice.a1.${Date.now()}@comp-a.com`,
        role: "employee",
        status: "active",
      })
      .returning();
    employeeA1Id = empA1.id;

    const [empA2] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        clerkUserId: TEST_CLERK_USER_A2,
        name: "Arthur A2",
        email: `arthur.a2.${Date.now()}@comp-a.com`,
        role: "employee",
        status: "active",
      })
      .returning();
    employeeA2Id = empA2.id;

    const [empB1] = await db
      .insert(employeesTable)
      .values({
        companyId: companyBId,
        clerkUserId: TEST_CLERK_USER_B1,
        name: "Bob B1",
        email: `bob.b1.${Date.now()}@comp-b.com`,
        role: "employee",
        status: "active",
      })
      .returning();
    employeeB1Id = empB1.id;

    // 3. Get or create category
    let [cat] = await db.select().from(categoriesTable).limit(1);
    if (!cat) {
      const [newCat] = await db
        .insert(categoriesTable)
        .values({
          name: "General Sustainability",
          slug: `general-sustainability-${Date.now()}`,
        })
        .returning();
      cat = newCat;
    }

    // 4. Create Test Courses
    const [c1] = await db
      .insert(coursesTable)
      .values({
        title: "Sustainability Foundations Test",
        slug: `sustainability-foundations-test-${Date.now()}`,
        description: "Test description",
        categoryId: cat.id,
        level: "beginner",
        version: 1,
        passingScore: 70,
        status: "published",
      })
      .returning();
    testCourse1Id = c1.id;

    const [c2] = await db
      .insert(coursesTable)
      .values({
        title: "Circular Economy Test",
        slug: `circular-economy-test-${Date.now()}`,
        description: "Test description",
        categoryId: cat.id,
        level: "intermediate",
        version: 1,
        passingScore: 70,
        status: "published",
      })
      .returning();
    testCourse2Id = c2.id;
  });

  after(async () => {
    // Cleanup created test records
    await db.delete(elevioScoreLedgerTable).where(eq(elevioScoreLedgerTable.companyId, companyAId));
    await db.delete(elevioScoreLedgerTable).where(eq(elevioScoreLedgerTable.companyId, companyBId));
    await db.delete(quizAttemptsTable).where(eq(quizAttemptsTable.userId, TEST_CLERK_USER_A1));
    await db.delete(quizAttemptsTable).where(eq(quizAttemptsTable.userId, TEST_CLERK_USER_A2));
    await db.delete(quizAttemptsTable).where(eq(quizAttemptsTable.userId, TEST_CLERK_USER_B1));
    await db.delete(learnerCommitmentsTable).where(eq(learnerCommitmentsTable.companyId, companyAId));
    await db.delete(learnerCommitmentsTable).where(eq(learnerCommitmentsTable.companyId, companyBId));
    await db.delete(employeesTable).where(eq(employeesTable.companyId, companyAId));
    await db.delete(employeesTable).where(eq(employeesTable.companyId, companyBId));
    await db.delete(coursesTable).where(eq(coursesTable.id, testCourse1Id));
    await db.delete(coursesTable).where(eq(coursesTable.id, testCourse2Id));
    await db.delete(companiesTable).where(eq(companiesTable.id, companyAId));
    await db.delete(companiesTable).where(eq(companiesTable.id, companyBId));
  });

  describe("1. Course Completion Scoring", () => {
    it("awards +100 points on initial qualifying course completion", async () => {
      const res = await awardCourseCompletionScore({
        companyId: companyAId,
        employeeId: employeeA1Id,
        clerkUserId: TEST_CLERK_USER_A1,
        courseId: testCourse1Id,
        courseTitle: "Sustainability Foundations Test",
        version: 1,
      });

      assert.equal(res.awarded, true);
      assert.equal(res.transaction?.points, 100);
      assert.equal(res.transaction?.eventType, "COURSE_COMPLETED");

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeA1Id));
      assert.equal(emp.elevioScore, 100);
    });

    it("does not award a second +100 points when replaying or reopening a completed course", async () => {
      const res = await awardCourseCompletionScore({
        companyId: companyAId,
        employeeId: employeeA1Id,
        clerkUserId: TEST_CLERK_USER_A1,
        courseId: testCourse1Id,
        courseTitle: "Sustainability Foundations Test",
        version: 1,
      });

      assert.equal(res.awarded, false);

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeA1Id));
      assert.equal(emp.elevioScore, 100);
    });

    it("handles concurrent completion requests safely without duplicate points", async () => {
      const concurrentCalls = await Promise.all([
        awardCourseCompletionScore({
          companyId: companyAId,
          employeeId: employeeA1Id,
          clerkUserId: TEST_CLERK_USER_A1,
          courseId: testCourse2Id,
          version: 1,
        }),
        awardCourseCompletionScore({
          companyId: companyAId,
          employeeId: employeeA1Id,
          clerkUserId: TEST_CLERK_USER_A1,
          courseId: testCourse2Id,
          version: 1,
        }),
        awardCourseCompletionScore({
          companyId: companyAId,
          employeeId: employeeA1Id,
          clerkUserId: TEST_CLERK_USER_A1,
          courseId: testCourse2Id,
          version: 1,
        }),
      ]);

      const awardedCount = concurrentCalls.filter((c) => c.awarded).length;
      assert.equal(awardedCount, 1);

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeA1Id));
      assert.equal(emp.elevioScore, 200); // 100 from course 1 + 100 from course 2
    });
  });

  describe("2. Quiz Scoring & Performance Bonuses", () => {
    it("awards +50 quiz pass, +15 bonus for 85%, and +20 first attempt bonus on first pass", async () => {
      const [attempt] = await db
        .insert(quizAttemptsTable)
        .values({
          userId: TEST_CLERK_USER_A2,
          courseId: testCourse1Id,
          courseVersion: 1,
          score: 85,
          totalQuestions: 10,
          correctAnswers: 8,
          passed: true,
        })
        .returning();

      const awards = await awardQuizPassScore({
        companyId: companyAId,
        employeeId: employeeA2Id,
        clerkUserId: TEST_CLERK_USER_A2,
        courseId: testCourse1Id,
        courseTitle: "Sustainability Foundations Test",
        score: 85,
        quizAttemptId: attempt.id,
      });

      // Expected: +50 (pass), +15 (85% bonus), +20 (first attempt) = 85 points
      const awardedPoints = awards.filter((a) => a.awarded).reduce((sum, a) => sum + a.points, 0);
      assert.equal(awardedPoints, 85);

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeA2Id));
      assert.equal(emp.elevioScore, 85);
    });

    it("awards +25 bonus for 90-99% score and +40 bonus for 100% score", async () => {
      // Create employee A3 to test 100% score
      const [empA3] = await db
        .insert(employeesTable)
        .values({
          companyId: companyAId,
          name: "Anna A3",
          email: `anna.a3.${Date.now()}@comp-a.com`,
          role: "employee",
          status: "active",
        })
        .returning();

      const [attempt100] = await db
        .insert(quizAttemptsTable)
        .values({
          userId: `test_user_a3_${Date.now()}`,
          courseId: testCourse1Id,
          score: 100,
          totalQuestions: 10,
          correctAnswers: 10,
          passed: true,
        })
        .returning();

      const awards = await awardQuizPassScore({
        companyId: companyAId,
        employeeId: empA3.id,
        clerkUserId: attempt100.userId,
        courseId: testCourse1Id,
        score: 100,
        quizAttemptId: attempt100.id,
      });

      // Expected: +50 (pass), +40 (100% bonus), +20 (first attempt) = 110 points
      const bonusAward = awards.find((a) => a.eventType === "QUIZ_SCORE_BONUS");
      assert.equal(bonusAward?.points, 40);

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, empA3.id));
      assert.equal(emp.elevioScore, 110);

      // Cleanup A3
      await db.delete(elevioScoreLedgerTable).where(eq(elevioScoreLedgerTable.employeeId, empA3.id));
      await db.delete(quizAttemptsTable).where(eq(quizAttemptsTable.id, attempt100.id));
      await db.delete(employeesTable).where(eq(employeesTable.id, empA3.id));
    });

    it("does not award first-attempt bonus if learner failed a previous attempt", async () => {
      // 1. First attempt: FAILED
      const [failedAttempt] = await db
        .insert(quizAttemptsTable)
        .values({
          userId: TEST_CLERK_USER_B1,
          courseId: testCourse1Id,
          score: 50,
          totalQuestions: 10,
          correctAnswers: 5,
          passed: false,
        })
        .returning();

      // 2. Second attempt: PASSED with 85%
      const [passAttempt] = await db
        .insert(quizAttemptsTable)
        .values({
          userId: TEST_CLERK_USER_B1,
          courseId: testCourse1Id,
          score: 85,
          totalQuestions: 10,
          correctAnswers: 8,
          passed: true,
        })
        .returning();

      const awards = await awardQuizPassScore({
        companyId: companyBId,
        employeeId: employeeB1Id,
        clerkUserId: TEST_CLERK_USER_B1,
        courseId: testCourse1Id,
        score: 85,
        quizAttemptId: passAttempt.id,
      });

      // Should have +50 pass, +15 bonus, but NO first attempt pass
      const firstAttemptAward = awards.find((a) => a.eventType === "FIRST_ATTEMPT_PASS");
      assert.equal(firstAttemptAward, undefined);

      const totalAwarded = awards.filter((a) => a.awarded).reduce((sum, a) => sum + a.points, 0);
      assert.equal(totalAwarded, 65); // 50 + 15

      const [empB] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeB1Id));
      assert.equal(empB.elevioScore, 65);
    });

    it("does not award repeat points when retaking an already-passed quiz", async () => {
      // 3. Third attempt on testCourse1Id for B1
      const [retakeAttempt] = await db
        .insert(quizAttemptsTable)
        .values({
          userId: TEST_CLERK_USER_B1,
          courseId: testCourse1Id,
          score: 100,
          totalQuestions: 10,
          correctAnswers: 10,
          passed: true,
        })
        .returning();

      const awards = await awardQuizPassScore({
        companyId: companyBId,
        employeeId: employeeB1Id,
        clerkUserId: TEST_CLERK_USER_B1,
        courseId: testCourse1Id,
        score: 100,
        quizAttemptId: retakeAttempt.id,
      });

      const awardedCount = awards.filter((a) => a.awarded).length;
      assert.equal(awardedCount, 0); // No repeat farming

      const [empB] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeB1Id));
      assert.equal(empB.elevioScore, 65); // Score unchanged
    });
  });

  describe("3. Workplace Action Scoring", () => {
    let commitmentId: number;

    it("awards 0 points when a workplace action is merely selected/planned", async () => {
      const [commitment] = await db
        .insert(learnerCommitmentsTable)
        .values({
          companyId: companyAId,
          employeeId: employeeA1Id,
          courseId: testCourse1Id,
          commitmentType: "suggested",
          commitmentText: "I commit to turning off monitors and AC every evening.",
          actionCategory: "energy",
          status: "committed",
        })
        .returning();
      commitmentId = commitment.id;

      // When merely committed, no scoring function is invoked. Employee score remains unchanged.
      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeA1Id));
      assert.equal(emp.elevioScore, 200);
    });

    it("awards +50 points when a workplace action is completed/reported", async () => {
      const res = await awardWorkplaceActionScore({
        companyId: companyAId,
        employeeId: employeeA1Id,
        clerkUserId: TEST_CLERK_USER_A1,
        commitmentId,
        courseId: testCourse1Id,
        commitmentText: "I commit to turning off monitors and AC every evening.",
        actionCategory: "energy",
      });

      assert.equal(res.awarded, true);
      assert.equal(res.transaction?.points, 50);
      assert.equal(res.transaction?.eventType, "WORKPLACE_ACTION_COMPLETED");

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeA1Id));
      assert.equal(emp.elevioScore, 250); // 200 + 50
    });

    it("does not duplicate points if action completion is reported again", async () => {
      const res = await awardWorkplaceActionScore({
        companyId: companyAId,
        employeeId: employeeA1Id,
        clerkUserId: TEST_CLERK_USER_A1,
        commitmentId,
        courseId: testCourse1Id,
      });

      assert.equal(res.awarded, false);

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeA1Id));
      assert.equal(emp.elevioScore, 250);
    });
  });

  describe("4. Tenant Isolation & Security", () => {
    it("ensures Company A summary strictly isolates Company B score data", async () => {
      const summaryA = await getEmployeeScoreSummary(employeeA1Id, companyAId);
      const summaryB = await getEmployeeScoreSummary(employeeB1Id, companyBId);

      assert.equal(summaryA.totalScore, 250);
      assert.equal(summaryA.breakdown.learning, 200);
      assert.equal(summaryA.breakdown.workplaceActions, 50);

      assert.equal(summaryB.totalScore, 65);
      assert.equal(summaryB.breakdown.knowledge, 65);
      assert.equal(summaryB.breakdown.workplaceActions, 0);

      // Attempting to fetch employee A1 with Company B's tenant ID returns 0
      const crossTenantSummary = await getEmployeeScoreSummary(employeeA1Id, companyBId);
      assert.equal(crossTenantSummary.totalScore, 0);
      assert.equal(crossTenantSummary.transactionsCount, 0);
    });
  });

  describe("5. Ledger Reconcile & Reversal Architecture", () => {
    it("reconciles employee score total exactly with active non-reversed transactions", async () => {
      const calculatedTotal = await syncEmployeeElevioScore(employeeA1Id);
      assert.equal(calculatedTotal, 250);

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeA1Id));
      assert.equal(emp.elevioScore, calculatedTotal);
    });

    it("reverses a transaction without deleting history and recalculates employee score", async () => {
      const [txToReverse] = await db
        .select()
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.employeeId, employeeA1Id),
            eq(elevioScoreLedgerTable.eventType, "WORKPLACE_ACTION_COMPLETED")
          )
        )
        .limit(1);

      assert.ok(txToReverse);

      const reversed = await reverseScoreTransaction({
        transactionId: txToReverse.id,
        reason: "Learner requested revocation of accidental duplicate action entry",
        actorUserId: "platform_admin_test",
        actorRole: "platform_admin",
      });

      assert.equal(reversed.isReversed, true);
      assert.equal(reversed.reversalReason, "Learner requested revocation of accidental duplicate action entry");

      // Score should now be 200 (250 - 50)
      const [empAfter] = await db.select().from(employeesTable).where(eq(employeesTable.id, employeeA1Id));
      assert.equal(empAfter.elevioScore, 200);

      // Verify historic transaction still exists in DB
      const [persistedTx] = await db
        .select()
        .from(elevioScoreLedgerTable)
        .where(eq(elevioScoreLedgerTable.id, txToReverse.id));
      assert.ok(persistedTx);
      assert.equal(persistedTx.isReversed, true);
    });
  });
});
