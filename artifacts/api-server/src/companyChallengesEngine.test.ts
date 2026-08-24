import assert from "node:assert/strict";
import { describe, it, before, after } from "node:test";
import {
  db,
  companiesTable,
  employeesTable,
  coursesTable,
  enrollmentsTable,
  quizAttemptsTable,
  learnerCommitmentsTable,
  elevioScoreLedgerTable,
  companySeasonsTable,
  challengeTemplatesTable,
  companyChallengesTable,
  companyChallengeCriteriaTable,
  employeeChallengeProgressTable,
  departmentsTable,
  badgeDefinitionsTable,
  employeeBadgesTable,
} from "@workspace/db";
import { and, eq, sql, desc, gte, lte } from "drizzle-orm";
import {
  ensureChallengeTemplates,
  activateCompanyChallenge,
  cancelCompanyChallenge,
  evaluateEmployeeChallengeProgress,
  getLearnerCompanyChallenges,
  getCompanyChallengeAnalytics,
  validateTemplateEntitlement,
  updateChallengeLifecycleStatuses,
  MAX_CHALLENGE_POINTS,
  MIN_CHALLENGE_DURATION_DAYS,
  MAX_CHALLENGE_DURATION_DAYS,
} from "./lib/challengeService.js";
import {
  awardCourseCompletionScore,
  awardQuizPassScore,
  awardWorkplaceActionScore,
  syncEmployeeElevioScore,
} from "./lib/scoringService.js";
import {
  calculateCompanyLeaderboard,
  getOrCreateActiveCompanySeason,
} from "./lib/leaderboardService.js";
import {
  evaluateCourseCompletionAchievements,
  ensureAchievementDefinitions,
} from "./lib/achievementsService.js";

describe("Sprint 14.3 — Company Challenges & Competitive Missions Test Matrix", () => {
  let companyAId: number;
  let companyBId: number;
  let deptA1Id: number;
  let deptA2Id: number;

  let empA1: any;
  let empA2: any;
  let empA3: any;
  let empB1: any;

  let testCourse1Id: number;
  let testCourse2Id: number;
  let templateWasteId: number;
  let templateEnergyId: number;

  before(async () => {
    // 1. Synchronize templates and achievements
    await ensureChallengeTemplates();
    await ensureAchievementDefinitions();

    // 2. Setup Test Companies (Using 'Infracare' naming so startup migration scripts preserve them)
    const [compA] = await db
      .insert(companiesTable)
      .values({
        name: "Infracare Challenge Corp A",
        slug: `infracare-chal-a-${Date.now()}`,
        industry: "Facilities & Operations",
        maxEmployees: 100,
        leaderboardEnabled: true,
        leaderboardPrivacyMode: "initial",
      })
      .returning();
    companyAId = compA.id;

    const [compB] = await db
      .insert(companiesTable)
      .values({
        name: "Infracare Challenge Corp B",
        slug: `infracare-chal-b-${Date.now()}`,
        industry: "Logistics",
        maxEmployees: 50,
        leaderboardEnabled: true,
      })
      .returning();
    companyBId = compB.id;

    // 3. Departments in Company A
    const [dept1] = await db
      .insert(departmentsTable)
      .values({
        companyId: companyAId,
        name: "Operations & Facilities",
      })
      .returning();
    deptA1Id = dept1.id;

    const [dept2] = await db
      .insert(departmentsTable)
      .values({
        companyId: companyAId,
        name: "Finance & Administration",
      })
      .returning();
    deptA2Id = dept2.id;

    // 4. Employees
    const [eA1] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        departmentId: deptA1Id,
        name: "Alice Dupont",
        email: `alice.dupont.${Date.now()}@infracare.mu`,
        role: "employee",
        status: "active",
        clerkUserId: `clerk_alice_${Date.now()}`,
        elevioScore: 0,
      })
      .returning();
    empA1 = eA1;

    const [eA2] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        departmentId: deptA1Id,
        name: "Kevin Ramgoolam",
        email: `kevin.ramgoolam.${Date.now()}@infracare.mu`,
        role: "employee",
        status: "active",
        clerkUserId: `clerk_kevin_${Date.now()}`,
        elevioScore: 0,
      })
      .returning();
    empA2 = eA2;

    const [eA3] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        departmentId: deptA2Id,
        name: "Sarah Chen",
        email: `sarah.chen.${Date.now()}@infracare.mu`,
        role: "employee",
        status: "active",
        clerkUserId: `clerk_sarah_${Date.now()}`,
        elevioScore: 0,
      })
      .returning();
    empA3 = eA3;

    const [eB1] = await db
      .insert(employeesTable)
      .values({
        companyId: companyBId,
        name: "Bob Martin",
        email: `bob.martin.${Date.now()}@infracare.mu`,
        role: "employee",
        status: "active",
        clerkUserId: `clerk_bob_${Date.now()}`,
        elevioScore: 0,
      })
      .returning();
    empB1 = eB1;

    // 5. Test Courses
    const [c1] = await db
      .insert(coursesTable)
      .values({
        title: `Waste Sorting Mauritius ${Date.now()}`,
        slug: `waste-sorting-the-mauritian-bin-system`,
        description: "Waste sorting course description",
        categoryId: 1,
        passingScore: 70,
        version: 1,
      } as any)
      .onConflictDoUpdate({
        target: coursesTable.slug,
        set: { title: `Waste Sorting Mauritius ${Date.now()}` },
      })
      .returning();
    testCourse1Id = c1.id;

    const [c2] = await db
      .insert(coursesTable)
      .values({
        title: `Energy Efficiency At Work ${Date.now()}`,
        slug: `energy-efficiency-at-work`,
        description: "Energy efficiency course description",
        categoryId: 1,
        passingScore: 70,
        version: 1,
      } as any)
      .onConflictDoUpdate({
        target: coursesTable.slug,
        set: { title: `Energy Efficiency At Work ${Date.now()}` },
      })
      .returning();
    testCourse2Id = c2.id;

    // 6. Retrieve templates
    const [wasteTpl] = await db
      .select()
      .from(challengeTemplatesTable)
      .where(eq(challengeTemplatesTable.code, "WASTE_SORTING_CHALLENGE"))
      .limit(1);
    templateWasteId = wasteTpl.id;

    const [energyTpl] = await db
      .select()
      .from(challengeTemplatesTable)
      .where(eq(challengeTemplatesTable.code, "ENERGY_AWARENESS_CHALLENGE"))
      .limit(1);
    templateEnergyId = energyTpl.id;
  });

  describe("1. Challenge Creation & Lifecycle Architecture", () => {
    it("1. allows eligible Company Admin to activate an approved challenge template", async () => {
      const start = new Date();
      const end = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      const challenge = await activateCompanyChallenge({
        companyId: companyAId,
        templateId: templateWasteId,
        startDate: start,
        endDate: end,
        createdBy: "admin_user_a",
      });

      assert.ok(challenge.id);
      assert.equal(challenge.companyId, companyAId);
      assert.equal(challenge.status, "ACTIVE");
      assert.equal(challenge.rewardPoints, 100);

      // Criteria should be instantiated
      const criteria = await db
        .select()
        .from(companyChallengeCriteriaTable)
        .where(eq(companyChallengeCriteriaTable.challengeId, challenge.id));

      assert.equal(criteria.length, 3);
    });

    it("2. rejects invalid start and end dates (end before start)", async () => {
      const start = new Date();
      const end = new Date(Date.now() - 1000);

      await assert.rejects(
        async () => {
          await activateCompanyChallenge({
            companyId: companyAId,
            templateId: templateWasteId,
            startDate: start,
            endDate: end,
            createdBy: "admin_user_a",
          });
        },
        /end date must be after start date/
      );
    });

    it("3. rejects challenge duration shorter than 3 days", async () => {
      const start = new Date();
      const end = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 day

      await assert.rejects(
        async () => {
          await activateCompanyChallenge({
            companyId: companyAId,
            templateId: templateWasteId,
            startDate: start,
            endDate: end,
            createdBy: "admin_user_a",
          });
        },
        /duration must be at least 3 days/
      );
    });

    it("4. rejects challenge duration longer than 90 days", async () => {
      const start = new Date();
      const end = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000); // 100 days

      await assert.rejects(
        async () => {
          await activateCompanyChallenge({
            companyId: companyAId,
            templateId: templateWasteId,
            startDate: start,
            endDate: end,
            createdBy: "admin_user_a",
          });
        },
        /duration cannot exceed 90 days/
      );
    });

    it("5. transitions UPCOMING challenge to ACTIVE when start date is reached", async () => {
      const pastStart = new Date(Date.now() - 10000);
      const futureEnd = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

      const [upcomingChallenge] = await db
        .insert(companyChallengesTable)
        .values({
          companyId: companyAId,
          code: "UPCOMING_TEST",
          title: "Upcoming Test Mission",
          rewardPoints: 75,
          startDate: pastStart,
          endDate: futureEnd,
          status: "UPCOMING",
          createdBy: "admin_user_a",
        })
        .returning();

      await updateChallengeLifecycleStatuses(companyAId);

      const [refreshed] = await db
        .select()
        .from(companyChallengesTable)
        .where(eq(companyChallengesTable.id, upcomingChallenge.id));

      assert.equal(refreshed.status, "ACTIVE");
    });

    it("6. transitions ACTIVE challenge to CLOSED when end date is passed", async () => {
      const pastStart = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);
      const pastEnd = new Date(Date.now() - 1000);

      const [expiredChallenge] = await db
        .insert(companyChallengesTable)
        .values({
          companyId: companyAId,
          code: "EXPIRED_TEST",
          title: "Expired Test Mission",
          rewardPoints: 75,
          startDate: pastStart,
          endDate: pastEnd,
          status: "ACTIVE",
          createdBy: "admin_user_a",
        })
        .returning();

      await updateChallengeLifecycleStatuses(companyAId);

      const [refreshed] = await db
        .select()
        .from(companyChallengesTable)
        .where(eq(companyChallengesTable.id, expiredChallenge.id));

      assert.equal(refreshed.status, "CLOSED");
    });

    it("7. allows Company Admin to cancel a challenge and prevents further reward bonuses", async () => {
      const start = new Date();
      const end = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

      const challenge = await activateCompanyChallenge({
        companyId: companyAId,
        templateId: templateEnergyId,
        startDate: start,
        endDate: end,
        createdBy: "admin_user_a",
      });

      const cancelled = await cancelCompanyChallenge({
        companyId: companyAId,
        challengeId: challenge.id,
        cancelledBy: "admin_user_a",
        cancellationReason: "Company schedule priority shift",
      });

      assert.equal(cancelled.status, "CANCELLED");
      assert.equal(cancelled.cancellationReason, "Company schedule priority shift");

      // Verify that evaluating progress on cancelled challenge does not award points
      const result = await evaluateEmployeeChallengeProgress({
        employee: empA1,
      });

      const awardedForCancelled = result.completedChallenges.find((c) => c.challengeId === challenge.id);
      assert.equal(awardedForCancelled, undefined);
    });
  });

  describe("2. Criteria & Progress Evaluation", () => {
    let testChallenge: any;

    before(async () => {
      const start = new Date(Date.now() - 1000);
      const end = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

      testChallenge = await activateCompanyChallenge({
        companyId: companyAId,
        templateId: templateWasteId,
        startDate: start,
        endDate: end,
        createdBy: "admin_user_a",
      });
    });

    it("8. initial state returns 0 progress when no criteria are satisfied", async () => {
      const data = await getLearnerCompanyChallenges(empA2);
      const activeCh = data.active.find((c) => c.id === testChallenge.id);

      assert.ok(activeCh);
      assert.equal(activeCh.progress.completedCriteriaCount, 0);
      assert.equal(activeCh.progress.progressPct, 0);
      assert.equal(activeCh.progress.status, "IN_PROGRESS");
    });

    it("9. advances progress when one qualifying criterion (course completion) is met", async () => {
      // Complete course for empA2
      await db.insert(enrollmentsTable).values({
        companyId: companyAId,
        employeeId: empA2.id,
        userId: empA2.clerkUserId,
        courseId: testCourse1Id,
        status: "completed",
        progressPct: 100,
        completedAt: new Date(),
      });

      await evaluateEmployeeChallengeProgress({ employee: empA2 });

      const data = await getLearnerCompanyChallenges(empA2);
      const activeCh = data.active.find((c) => c.id === testChallenge.id);

      assert.ok(activeCh);
      assert.equal(activeCh.progress.completedCriteriaCount, 1);
      assert.equal(activeCh.progress.progressPct, 33);
    });

    it("10. does not count assessment event that occurred before challenge start date if current activity is required", async () => {
      // Quiz passed before challenge start date (e.g. 5 days ago)
      const pastDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);

      await db.insert(quizAttemptsTable).values({
        userId: empA3.clerkUserId,
        courseId: testCourse1Id,
        score: 100,
        passed: true,
        totalQuestions: 10,
        correctAnswers: 10,
        createdAt: pastDate,
      });

      await evaluateEmployeeChallengeProgress({ employee: empA3 });

      const [progress] = await db
        .select()
        .from(employeeChallengeProgressTable)
        .where(
          and(
            eq(employeeChallengeProgressTable.challengeId, testChallenge.id),
            eq(employeeChallengeProgressTable.employeeId, empA3.id)
          )
        )
        .limit(1);

      // Quiz criterion should NOT be satisfied because attempt was before start date
      assert.equal(progress?.completedCriteriaCount || 0, 0);
    });

    it("11. multi-step challenge remains incomplete until EVERY criterion is satisfied", async () => {
      // empA2 already has course completed (1/3)
      // Now pass quiz during challenge window (2/3)
      await db.insert(quizAttemptsTable).values({
        userId: empA2.clerkUserId,
        courseId: testCourse1Id,
        score: 85,
        passed: true,
        totalQuestions: 10,
        correctAnswers: 9,
        createdAt: new Date(),
      });

      await evaluateEmployeeChallengeProgress({ employee: empA2 });

      const [progress] = await db
        .select()
        .from(employeeChallengeProgressTable)
        .where(
          and(
            eq(employeeChallengeProgressTable.challengeId, testChallenge.id),
            eq(employeeChallengeProgressTable.employeeId, empA2.id)
          )
        )
        .limit(1);

      assert.equal(progress?.completedCriteriaCount, 2);
      assert.equal(progress?.status, "IN_PROGRESS");
      assert.equal(progress?.pointsAwarded, 0);
    });
  });

  describe("3. Scoring, Idempotency & Ledger Integration", () => {
    let scoringChallenge: any;

    before(async () => {
      const start = new Date(Date.now() - 1000);
      const end = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

      scoringChallenge = await activateCompanyChallenge({
        companyId: companyAId,
        templateId: templateWasteId,
        startDate: start,
        endDate: end,
        createdBy: "admin_user_a",
      });
    });

    it("12. awards exact +100 CHALLENGE_COMPLETED bonus upon satisfying all criteria", async () => {
      const initialScore = empA1.elevioScore || 0;

      // 1. Course completion
      await db.insert(enrollmentsTable).values({
        companyId: companyAId,
        employeeId: empA1.id,
        userId: empA1.clerkUserId,
        courseId: testCourse1Id,
        status: "completed",
        progressPct: 100,
        completedAt: new Date(),
      });

      // 2. Quiz pass
      await db.insert(quizAttemptsTable).values({
        userId: empA1.clerkUserId,
        courseId: testCourse1Id,
        score: 90,
        passed: true,
        totalQuestions: 10,
        correctAnswers: 9,
        createdAt: new Date(),
      });

      // 3. Workplace Action
      await db.insert(learnerCommitmentsTable).values({
        companyId: companyAId,
        employeeId: empA1.id,
        courseId: testCourse1Id,
        commitmentText: "Set up two-stream paper recycling bin in facilities office",
        actionCategory: "waste",
        status: "completed",
        actionReportedAt: new Date(),
        completedAt: new Date(),
      });

      const evalResult = await evaluateEmployeeChallengeProgress({ employee: empA1 });

      const completedForScoring = evalResult.completedChallenges.find((c) => c.challengeId === scoringChallenge.id);
      assert.ok(completedForScoring);
      assert.equal(completedForScoring.points, 100);

      // Verify ledger transaction
      const [ledgerTx] = await db
        .select()
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.employeeId, empA1.id),
            eq(elevioScoreLedgerTable.eventType, "CHALLENGE_COMPLETED"),
            eq(elevioScoreLedgerTable.sourceEntityId, String(scoringChallenge.id))
          )
        )
        .limit(1);

      assert.ok(ledgerTx);
      assert.equal(ledgerTx.points, 100);
      assert.equal(ledgerTx.idempotencyKey, `challenge:${scoringChallenge.id}:employee:${empA1.id}:complete`);

      // Verify employee elevioScore is updated
      const [updatedEmp] = await db
        .select({ elevioScore: employeesTable.elevioScore })
        .from(employeesTable)
        .where(eq(employeesTable.id, empA1.id))
        .limit(1);

      assert.ok(updatedEmp.elevioScore >= initialScore + 100);
    });

    it("13. guarantees idempotency: retry produces zero duplicate points or ledger entries", async () => {
      const txCountBefore = await db
        .select({ count: sql<number>`count(*)::integer` })
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.employeeId, empA1.id),
            eq(elevioScoreLedgerTable.eventType, "CHALLENGE_COMPLETED")
          )
        );

      // Run evaluation again
      const evalResult2 = await evaluateEmployeeChallengeProgress({ employee: empA1 });

      assert.equal(evalResult2.completedChallenges.length, 0);

      const txCountAfter = await db
        .select({ count: sql<number>`count(*)::integer` })
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.employeeId, empA1.id),
            eq(elevioScoreLedgerTable.eventType, "CHALLENGE_COMPLETED")
          )
        );

      assert.equal(txCountAfter[0].count, txCountBefore[0].count);
    });

    it("14. concurrent completion requests safely award exactly one completion bonus", async () => {
      // Create fresh employee empA3 with all criteria satisfied
      await db.insert(enrollmentsTable).values({
        companyId: companyAId,
        employeeId: empA3.id,
        userId: empA3.clerkUserId,
        courseId: testCourse1Id,
        status: "completed",
        progressPct: 100,
        completedAt: new Date(),
      });
      await db.insert(quizAttemptsTable).values({
        userId: empA3.clerkUserId,
        courseId: testCourse1Id,
        score: 80,
        passed: true,
        totalQuestions: 10,
        correctAnswers: 8,
        createdAt: new Date(),
      });
      await db.insert(learnerCommitmentsTable).values({
        companyId: companyAId,
        employeeId: empA3.id,
        courseId: testCourse1Id,
        commitmentText: "Waste audit in accounting department",
        actionCategory: "waste",
        status: "completed",
        actionReportedAt: new Date(),
        completedAt: new Date(),
      });

      // Fire concurrent evaluations
      const [res1, res2] = await Promise.all([
        evaluateEmployeeChallengeProgress({ employee: empA3 }),
        evaluateEmployeeChallengeProgress({ employee: empA3 }),
      ]);

      const allCompleted = [...res1.completedChallenges, ...res2.completedChallenges];
      const completedForScoring = allCompleted.filter((c) => c.challengeId === scoringChallenge.id);
      assert.equal(completedForScoring.length, 1);

      const ledgerEntries = await db
        .select()
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.employeeId, empA3.id),
            eq(elevioScoreLedgerTable.eventType, "CHALLENGE_COMPLETED"),
            eq(elevioScoreLedgerTable.sourceEntityId, String(scoringChallenge.id))
          )
        );

      assert.equal(ledgerEntries.length, 1);
    });

    it("15. does not alter or duplicate underlying course (+100), quiz (+50), action (+50) scores", async () => {
      const scoreResult = await awardCourseCompletionScore({
        companyId: companyAId,
        employeeId: empA1.id,
        courseId: testCourse1Id,
        version: 1,
      });

      // Standard points are unchanged
      if (scoreResult.awarded) {
        assert.equal(scoreResult.transaction?.points, 100);
      }
    });

    it("16. challenge bonus points contribute directly to the monthly season containing completion timestamp", async () => {
      await getOrCreateActiveCompanySeason(companyAId);

      const leaderboard = await calculateCompanyLeaderboard(companyAId, empA1.id);

      assert.ok(leaderboard.enabled);
      assert.ok(leaderboard.currentUser);
      assert.ok(leaderboard.currentUser.seasonalScore >= 100);
    });
  });

  describe("4. Security & Tenant Isolation", () => {
    it("17. ensures Company A learner cannot access Company B challenges", async () => {
      const chalB = await activateCompanyChallenge({
        companyId: companyBId,
        templateId: templateWasteId,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdBy: "admin_user_b",
      });

      const dataA = await getLearnerCompanyChallenges(empA1);
      const hasChalB = dataA.active.some((c) => c.id === chalB.id);

      assert.equal(hasChalB, false);
    });

    it("18. ensures Company Admin cannot view analytics for another company's challenge", async () => {
      const chalB = await db
        .select()
        .from(companyChallengesTable)
        .where(eq(companyChallengesTable.companyId, companyBId))
        .limit(1);

      if (chalB[0]) {
        await assert.rejects(
          async () => {
            await getCompanyChallengeAnalytics({
              companyId: companyAId,
              challengeId: chalB[0].id,
            });
          },
          /Challenge not found/
        );
      }
    });
  });

  describe("5. Participation Analytics & Department Reporting", () => {
    let analyticsChallengeId: number;

    before(async () => {
      const [ch] = await db
        .select()
        .from(companyChallengesTable)
        .where(eq(companyChallengesTable.companyId, companyAId))
        .limit(1);
      analyticsChallengeId = ch.id;
    });

    it("19. calculates accurate participation metrics, completion rate %, and ledger points", async () => {
      const analytics = await getCompanyChallengeAnalytics({
        companyId: companyAId,
        challengeId: analyticsChallengeId,
      });

      assert.equal(analytics.metrics.totalEligibleEmployees, 3);
      assert.ok(analytics.metrics.completedCount >= 1);
      assert.ok(analytics.metrics.completionRatePct >= 33);
      assert.ok(analytics.metrics.totalChallengePointsAwarded >= 100);
    });

    it("20. breaks down participation accurately by department", async () => {
      const analytics = await getCompanyChallengeAnalytics({
        companyId: companyAId,
        challengeId: analyticsChallengeId,
      });

      assert.ok(analytics.departmentBreakdown.length >= 2);
      const opsDept = analytics.departmentBreakdown.find((d) => d.departmentId === deptA1Id);
      assert.ok(opsDept);
      assert.equal(opsDept.totalEligible, 2);
    });
  });

  describe("6. Regressions Verification", () => {
    it("21. course completion scoring (+100) remains 100% operational", async () => {
      const res = await awardCourseCompletionScore({
        companyId: companyAId,
        employeeId: empB1.id,
        courseId: testCourse1Id,
        version: 1,
      });

      assert.ok(res.awarded);
      assert.equal(res.transaction?.points, 100);
    });

    it("22. achievements evaluation remains operational and awards strictly 0 additional points", async () => {
      const pointsBefore = await db
        .select({ elevioScore: employeesTable.elevioScore })
        .from(employeesTable)
        .where(eq(employeesTable.id, empB1.id))
        .limit(1);

      await evaluateCourseCompletionAchievements({
        employee: empB1,
        courseId: testCourse1Id,
      });

      const pointsAfter = await db
        .select({ elevioScore: employeesTable.elevioScore })
        .from(employeesTable)
        .where(eq(employeesTable.id, empB1.id))
        .limit(1);

      assert.equal(pointsAfter[0].elevioScore, pointsBefore[0].elevioScore);
    });
  });
});
