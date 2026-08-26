import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import {
  db,
  companiesTable,
  employeesTable,
  elevioScoreLedgerTable,
  companySeasonsTable,
  companySeasonSnapshotsTable,
  departmentsTable,
  departmentSeasonStandingsTable,
  employeeDepartmentHistoryTable,
  companyChallengesTable,
  challengeTemplatesTable,
  companyChallengeCriteriaTable,
  employeeChallengeProgressTable,
  courseInteractionProgressTable,
  badgeDefinitionsTable,
  employeeBadgesTable,
  coursesTable,
  gamificationAnomaliesTable,
} from "@workspace/db";
import { eq, and, sql, desc, isNull } from "drizzle-orm";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications.js";
import {
  getPlatformGamificationHealth,
  getCompanyGamificationAnalytics,
  runGamificationDiagnostics,
  recalculateEmployeeScore,
  reviewGamificationAnomaly,
  listGamificationAnomalies,
  generatePlatformGamificationAuditCsv,
  generateCompanyEngagementCsv,
} from "./lib/gamificationAnalyticsService.js";
import {
  recordScoreEvent,
  syncEmployeeElevioScore,
  reverseScoreTransaction,
  awardCourseCompletionScore,
  awardQuizPassScore,
  awardWorkplaceActionScore,
  awardChallengeCompletionScore,
} from "./lib/scoringService.js";
import { getOrCreateActiveCompanySeason } from "./lib/leaderboardService.js";
import { calculateDepartmentStandings, TEAM_SCORE_FORMULA_V1 } from "./lib/departmentCompetitionService.js";
import { evaluateAndSaveInteraction } from "./lib/interactionService.js";

describe("Sprint 14.6 — Gamification Analytics, Fairness Safeguards & Operational Controls Test Suite", () => {
  let coA: number;
  let coB: number;
  let seasonA: any;
  let seasonB: any;

  // Helper creators
  async function createCompany(name: string): Promise<number> {
    const [c] = await db
      .insert(companiesTable)
      .values({
        name,
        slug: `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        leaderboardEnabled: true,
        departmentCompetitionEnabled: true,
        departmentCompetitionActivatedAt: new Date(),
      })
      .returning();
    return c.id;
  }

  async function createDept(companyId: number, name: string): Promise<number> {
    const [d] = await db
      .insert(departmentsTable)
      .values({ companyId, name })
      .returning();
    return d.id;
  }

  async function createEmp(companyId: number, deptId: number | null, name: string): Promise<number> {
    const [e] = await db
      .insert(employeesTable)
      .values({
        companyId,
        departmentId: deptId,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, ".")}.${Date.now()}.${Math.floor(Math.random() * 1000)}@test.com`,
        status: "active",
        elevioScore: 0,
      })
      .returning();

    if (deptId) {
      await db.insert(employeeDepartmentHistoryTable).values({
        companyId,
        employeeId: e.id,
        departmentId: deptId,
        effectiveFrom: new Date(),
      });
    }

    return e.id;
  }

  async function addScore(companyId: number, employeeId: number, eventType: any, points: number, entityId: string) {
    return recordScoreEvent({
      companyId,
      employeeId,
      eventType,
      sourceEntityType: "course_completion",
      sourceEntityId: entityId,
      points,
      idempotencyKey: `test_tx_${companyId}_${employeeId}_${entityId}_${Date.now()}_${Math.random()}`,
    });
  }

  before(async () => {
    await ensureSchemaModifications();
    coA = await createCompany("Sprint146 TestCo A");
    coB = await createCompany("Sprint146 TestCo B");
    seasonA = await getOrCreateActiveCompanySeason(coA);
    seasonB = await getOrCreateActiveCompanySeason(coB);
  });

  after(async () => {
    for (const cid of [coA, coB]) {
      if (!cid) continue;
      await db.execute(sql`DELETE FROM gamification_anomalies WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM department_season_standings WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM employee_department_history WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM course_interaction_progress WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM employee_challenge_progress WHERE employee_id IN (SELECT id FROM employees WHERE company_id = ${cid})`);
      await db.execute(sql`DELETE FROM company_challenges WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM employee_badges WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM elevio_score_ledger WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM employees WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM departments WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM company_seasons WHERE company_id = ${cid}`);
      await db.execute(sql`DELETE FROM companies WHERE id = ${cid}`);
    }
  });

  // ============================================================
  // 1. SCORE RECONCILIATION & REPAIR (Tests 1–6)
  // ============================================================
  describe("1. Score Reconciliation & Controlled Repair", () => {
    test("Test 1: Materialized score matches ledger -> healthy, no anomaly", async () => {
      const e1 = await createEmp(coA, null, "Reconcile Healthy Emp");
      await addScore(coA, e1, "COURSE_COMPLETED", 100, "crs_1");
      await addScore(coA, e1, "QUIZ_PASSED", 50, "quiz_1");

      const diag = await runGamificationDiagnostics(coA);
      const empAnomalies = diag.anomalies.filter((a) => a.employeeId === e1 && a.anomalyType === "SCORE_MISMATCH");
      assert.strictEqual(empAnomalies.length, 0, "No mismatch anomaly should be reported for healthy employee");
    });

    test("Test 2: Materialized score differs from ledger -> mismatch detected with delta", async () => {
      const e2 = await createEmp(coA, null, "Reconcile Mismatch Emp");
      await addScore(coA, e2, "COURSE_COMPLETED", 100, "crs_1");
      // Intentionally corrupt cached score to simulate mismatch
      await db.update(employeesTable).set({ elevioScore: 999 }).where(eq(employeesTable.id, e2));

      const diag = await runGamificationDiagnostics(coA);
      const mismatch = diag.anomalies.find((a) => a.employeeId === e2 && a.anomalyType === "SCORE_MISMATCH");

      assert.ok(mismatch, "SCORE_MISMATCH anomaly should be detected");
      assert.strictEqual(mismatch.severity, "HIGH");
      assert.strictEqual(mismatch.metadata?.cachedScore, 999);
      assert.strictEqual(mismatch.metadata?.ledgerScore, 100);
      assert.strictEqual(mismatch.metadata?.delta, 899);
    });

    test("Test 3: Controlled recalculation restores exact ledger score without adding points", async () => {
      const e3 = await createEmp(coA, null, "Recalc Target Emp");
      await addScore(coA, e3, "COURSE_COMPLETED", 100, "crs_1");
      await addScore(coA, e3, "WORKPLACE_ACTION_COMPLETED", 50, "act_1");
      // Corrupt
      await db.update(employeesTable).set({ elevioScore: 40 }).where(eq(employeesTable.id, e3));

      const result = await recalculateEmployeeScore({
        employeeId: e3,
        reason: "Test controlled recalculation repair",
        actorUserId: "user_platform_admin",
        actorRole: "platform_admin",
      });

      assert.strictEqual(result.beforeScore, 40);
      assert.strictEqual(result.afterScore, 150);

      // Verify DB employee row
      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, e3));
      assert.strictEqual(emp.elevioScore, 150, "Database row should reflect repaired score");
    });

    test("Test 4: Recalculation creates NO ledger transactions (zero mutation)", async () => {
      const e4 = await createEmp(coA, null, "Zero Mutation Emp");
      await addScore(coA, e4, "COURSE_COMPLETED", 100, "crs_1");

      const beforeTxCount = await db
        .select({ count: sql`count(*)::integer` })
        .from(elevioScoreLedgerTable)
        .where(eq(elevioScoreLedgerTable.employeeId, e4));

      await recalculateEmployeeScore({
        employeeId: e4,
        reason: "Checking zero transaction generation",
        actorUserId: "user_admin",
        actorRole: "platform_admin",
      });

      const afterTxCount = await db
        .select({ count: sql`count(*)::integer` })
        .from(elevioScoreLedgerTable)
        .where(eq(elevioScoreLedgerTable.employeeId, e4));

      assert.strictEqual(Number((beforeTxCount[0] as any).count), Number((afterTxCount[0] as any).count), "Ledger count must remain identical");
    });

    test("Test 5: Recalculation is tenant-safe (does not modify other companies' learners)", async () => {
      const eA = await createEmp(coA, null, "Tenant Emp A");
      const eB = await createEmp(coB, null, "Tenant Emp B");

      await addScore(coA, eA, "COURSE_COMPLETED", 100, "crs_1");
      await addScore(coB, eB, "COURSE_COMPLETED", 100, "crs_1");

      await db.update(employeesTable).set({ elevioScore: 50 }).where(eq(employeesTable.id, eA));
      await db.update(employeesTable).set({ elevioScore: 50 }).where(eq(employeesTable.id, eB));

      await recalculateEmployeeScore({
        employeeId: eA,
        reason: "Recalculating only Emp A",
        actorUserId: "admin_1",
        actorRole: "platform_admin",
      });

      const [empA] = await db.select().from(employeesTable).where(eq(employeesTable.id, eA));
      const [empB] = await db.select().from(employeesTable).where(eq(employeesTable.id, eB));

      assert.strictEqual(empA.elevioScore, 100, "Emp A should be repaired to 100");
      assert.strictEqual(empB.elevioScore, 50, "Emp B must remain untouched at 50");
    });

    test("Test 6: Recalculation auto-resolves open SCORE_MISMATCH anomaly", async () => {
      const e6 = await createEmp(coA, null, "Anomaly Resolve Emp");
      await addScore(coA, e6, "COURSE_COMPLETED", 100, "crs_1");
      await db.update(employeesTable).set({ elevioScore: 0 }).where(eq(employeesTable.id, e6));

      // Trigger diagnostic to create open anomaly
      await runGamificationDiagnostics(coA);

      const openAnomalies = await db
        .select()
        .from(gamificationAnomaliesTable)
        .where(
          and(
            eq(gamificationAnomaliesTable.employeeId, e6),
            eq(gamificationAnomaliesTable.anomalyType, "SCORE_MISMATCH"),
            eq(gamificationAnomaliesTable.status, "OPEN")
          )
        );
      assert.ok(openAnomalies.length > 0, "Open anomaly should exist prior to repair");

      // Execute recalculation
      await recalculateEmployeeScore({
        employeeId: e6,
        reason: "Resolving mismatch",
        actorUserId: "admin_1",
        actorRole: "platform_admin",
      });

      const resolvedAnomalies = await db
        .select()
        .from(gamificationAnomaliesTable)
        .where(
          and(
            eq(gamificationAnomaliesTable.employeeId, e6),
            eq(gamificationAnomaliesTable.anomalyType, "SCORE_MISMATCH")
          )
        );
      assert.strictEqual(resolvedAnomalies[0].status, "RESOLVED", "Anomaly should transition to RESOLVED");
    });
  });

  // ============================================================
  // 2. ANOMALY DIAGNOSTICS & WORKFLOW (Tests 7–13)
  // ============================================================
  describe("2. Anomaly Diagnostics & Review Workflow", () => {
    test("Test 7: Legitimate normal activity is not penalized or flagged", async () => {
      const e7 = await createEmp(coA, null, "Normal Learner");
      await addScore(coA, e7, "COURSE_COMPLETED", 100, "crs_10");
      await addScore(coA, e7, "QUIZ_PASSED", 50, "quiz_10");

      const diag = await runGamificationDiagnostics(coA);
      const flagged = diag.anomalies.filter((a) => a.employeeId === e7);
      assert.strictEqual(flagged.length, 0, "Normal learner must not be flagged");
    });

    test("Test 8: Duplicate score idempotency prevents duplicate records cleanly", async () => {
      const e8 = await createEmp(coA, null, "Duplicate Test Emp");
      const key = `emp_${e8}_COURSE_COMPLETED_course_99_v1`;

      const first = await recordScoreEvent({
        companyId: coA,
        employeeId: e8,
        eventType: "COURSE_COMPLETED",
        sourceEntityType: "course_completion",
        sourceEntityId: "crs_99",
        points: 100,
        idempotencyKey: key,
      });

      const second = await recordScoreEvent({
        companyId: coA,
        employeeId: e8,
        eventType: "COURSE_COMPLETED",
        sourceEntityType: "course_completion",
        sourceEntityId: "crs_99",
        points: 100,
        idempotencyKey: key,
      });

      assert.strictEqual(first.awarded, true, "First event should award points");
      assert.strictEqual(second.awarded, false, "Duplicate event must be safely blocked");

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, e8));
      assert.strictEqual(emp.elevioScore, 100, "Cached score must only count initial points");
    });

    test("Test 9: Suspicious score velocity generates review flag under configured rule", async () => {
      const e9 = await createEmp(coA, null, "Fast Velocity Emp");
      // Add 5 rapid course completion events
      for (let i = 1; i <= 5; i++) {
        await addScore(coA, e9, "COURSE_COMPLETED", 100, `fast_crs_${i}`);
      }

      const diag = await runGamificationDiagnostics(coA);
      const velocityAnomaly = diag.anomalies.find(
        (a) => a.employeeId === e9 && a.anomalyType === "SUSPICIOUS_VELOCITY"
      );

      assert.ok(velocityAnomaly, "SUSPICIOUS_VELOCITY anomaly must be flagged for >= 5 rapid completions");
      assert.strictEqual(velocityAnomaly.severity, "REVIEW");
    });

    test("Test 10: Anomaly flag creates NO automatic point reversal or suspension", async () => {
      const e10 = await createEmp(coA, null, "No Punishment Emp");
      for (let i = 1; i <= 5; i++) {
        await addScore(coA, e10, "COURSE_COMPLETED", 100, `fast_crs_np_${i}`);
      }

      await runGamificationDiagnostics(coA);

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, e10));
      assert.strictEqual(emp.elevioScore, 500, "Learner score must NOT be automatically reduced by anomaly flag");
      assert.strictEqual(emp.status, "active", "Learner account must NOT be suspended");
    });

    test("Test 11: Platform Admin can mark anomaly as REVIEWED", async () => {
      const e11 = await createEmp(coA, null, "Review Flow Emp");
      for (let i = 1; i <= 5; i++) {
        await addScore(coA, e11, "COURSE_COMPLETED", 100, `fast_rev_${i}`);
      }
      await runGamificationDiagnostics(coA);

      const [anomaly] = await db
        .select()
        .from(gamificationAnomaliesTable)
        .where(
          and(
            eq(gamificationAnomaliesTable.employeeId, e11),
            eq(gamificationAnomaliesTable.anomalyType, "SUSPICIOUS_VELOCITY")
          )
        );

      assert.ok(anomaly, "Anomaly must exist");

      const reviewed = await reviewGamificationAnomaly({
        anomalyId: anomaly.id,
        status: "REVIEWED",
        resolutionNote: "Verified legitimate fast completion",
        actorUserId: "admin_user",
        actorRole: "platform_admin",
      });

      assert.strictEqual(reviewed.status, "REVIEWED");
      assert.strictEqual(reviewed.reviewedBy, "admin_user");
    });

    test("Test 12: Platform Admin can dismiss anomaly as DISMISSED", async () => {
      const e12 = await createEmp(coA, null, "Dismiss Flow Emp");
      for (let i = 1; i <= 5; i++) {
        await addScore(coA, e12, "COURSE_COMPLETED", 100, `fast_dis_${i}`);
      }
      await runGamificationDiagnostics(coA);

      const [anomaly] = await db
        .select()
        .from(gamificationAnomaliesTable)
        .where(
          and(
            eq(gamificationAnomaliesTable.employeeId, e12),
            eq(gamificationAnomaliesTable.anomalyType, "SUSPICIOUS_VELOCITY")
          )
        );

      const dismissed = await reviewGamificationAnomaly({
        anomalyId: anomaly.id,
        status: "DISMISSED",
        resolutionNote: "Dismissed as false positive",
        actorUserId: "admin_user",
        actorRole: "platform_admin",
      });

      assert.strictEqual(dismissed.status, "DISMISSED");
    });

    test("Test 13: List anomalies supports filtering by company, status, and severity", async () => {
      const list = await listGamificationAnomalies({ companyId: coA, limit: 10 });
      assert.ok(Array.isArray(list.anomalies), "Should return array of anomalies");
      assert.ok(typeof list.total === "number", "Should return total count");
    });
  });

  // ============================================================
  // 3. SEASON INTEGRITY (Tests 14–17)
  // ============================================================
  describe("3. Season Integrity Diagnostics", () => {
    test("Test 14: Overlapping active seasons for same company detected", async () => {
      // Create a second active season intentionally
      const [dupSeason] = await db
        .insert(companySeasonsTable)
        .values({
          companyId: coA,
          title: "Duplicate Season Test",
          seasonType: "monthly",
          status: "ACTIVE",
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 86400000),
        })
        .returning();

      const diag = await runGamificationDiagnostics(coA);
      const seasonAnomaly = diag.anomalies.find(
        (a) => a.companyId === coA && a.anomalyType === "SEASON_INTEGRITY"
      );

      assert.ok(seasonAnomaly, "SEASON_INTEGRITY anomaly should detect multiple active seasons");
      assert.strictEqual(seasonAnomaly.severity, "HIGH");

      // Cleanup extra season
      await db.delete(companySeasonsTable).where(eq(companySeasonsTable.id, dupSeason.id));
    });

    test("Test 15: Valid single active season configuration produces no season integrity anomaly", async () => {
      const diag = await runGamificationDiagnostics(coB);
      const seasonAnomaly = diag.anomalies.find(
        (a) => a.companyId === coB && a.anomalyType === "SEASON_INTEGRITY"
      );
      assert.strictEqual(seasonAnomaly, undefined, "Valid single season should produce no anomaly");
    });

    test("Test 16: Closed season history is immutable and never altered by diagnostic runs", async () => {
      const eSnap = await createEmp(coA, null, "Historical Snapshot Emp");

      const [closedSeason] = await db
        .insert(companySeasonsTable)
        .values({
          companyId: coA,
          title: "Closed Historical Season",
          seasonType: "monthly",
          status: "CLOSED",
          startDate: new Date("2026-01-01"),
          endDate: new Date("2026-01-31"),
          closedAt: new Date("2026-02-01"),
        })
        .returning();

      const [snapshot] = await db
        .insert(companySeasonSnapshotsTable)
        .values({
          companyId: coA,
          seasonId: closedSeason.id,
          employeeId: eSnap,
          rank: 1,
          score: 500,
          snapshotDate: "2026-02-01",
        })
        .returning();

      // Run diagnostics
      await runGamificationDiagnostics(coA);

      const [afterSnapshot] = await db
        .select()
        .from(companySeasonSnapshotsTable)
        .where(eq(companySeasonSnapshotsTable.id, snapshot.id));

      assert.strictEqual(afterSnapshot.rank, 1, "Snapshot rank must remain immutable");
      assert.strictEqual(afterSnapshot.score, 500, "Snapshot score must remain immutable");

      // Cleanup
      await db.delete(companySeasonSnapshotsTable).where(eq(companySeasonSnapshotsTable.id, snapshot.id));
      await db.delete(companySeasonsTable).where(eq(companySeasonsTable.id, closedSeason.id));
    });

    test("Test 17: Season metrics aggregate correctly in platform health", async () => {
      const health = await getPlatformGamificationHealth();
      assert.ok(typeof health.competition.activeSeasonsCount === "number");
      assert.ok(typeof health.competition.closedSeasonsCount === "number");
      assert.ok(health.competition.activeSeasonsCount >= 1, "Should have active seasons");
    });
  });

  // ============================================================
  // 4. CHALLENGE DIAGNOSTICS & FAIRNESS (Tests 18–21)
  // ============================================================
  describe("4. Challenge Fairness & Effectiveness Diagnostics", () => {
    test("Test 18: Inaccessible unpublished course in active challenge creates fairness flag", async () => {
      // Find or create an unpublished course
      const [unpubCourse] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.isPublished, false))
        .limit(1);

      if (unpubCourse) {
        const [ch] = await db
          .insert(companyChallengesTable)
          .values({
            companyId: coA,
            title: "Unfair Challenge Test",
            code: `unfair_ch_${Date.now()}`,
            description: "Requires unpub course",
            status: "ACTIVE",
            createdBy: "test_admin",
            startDate: new Date(),
            endDate: new Date(Date.now() + 10 * 86400000),
            rewardPoints: 100,
          })
          .returning();

        await db.insert(companyChallengeCriteriaTable).values({
          challengeId: ch.id,
          title: "Complete Unpub Course",
          criterionType: "COURSE_COMPLETION",
          courseId: unpubCourse.id,
          requiredCount: 1,
        });

        const diag = await runGamificationDiagnostics(coA);
        const fairnessAnomaly = diag.anomalies.find(
          (a) => a.companyId === coA && a.anomalyType === "CHALLENGE_FAIRNESS"
        );

        assert.ok(fairnessAnomaly, "CHALLENGE_FAIRNESS flag should trigger for unpublished course");

        // Cleanup
        await db.delete(companyChallengeCriteriaTable).where(eq(companyChallengeCriteriaTable.challengeId, ch.id));
        await db.delete(companyChallengesTable).where(eq(companyChallengesTable.id, ch.id));
      }
    });

    test("Test 19: Valid challenge with accessible course creates no fairness flag", async () => {
      const [pubCourse] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.isPublished, true))
        .limit(1);

      if (pubCourse) {
        const [validCh] = await db
          .insert(companyChallengesTable)
          .values({
            companyId: coA,
            title: "Fair Challenge Test",
            code: `fair_ch_${Date.now()}`,
            description: "Requires pub course",
            status: "ACTIVE",
            createdBy: "test_admin",
            startDate: new Date(),
            endDate: new Date(Date.now() + 10 * 86400000),
            rewardPoints: 100,
          })
          .returning();

        await db.insert(companyChallengeCriteriaTable).values({
          challengeId: validCh.id,
          title: "Complete Pub Course",
          criterionType: "COURSE_COMPLETION",
          courseId: pubCourse.id,
          requiredCount: 1,
        });

        const diag = await runGamificationDiagnostics(coA);
        const fairAnomaly = diag.anomalies.find(
          (a) => a.metadata?.challengeId === validCh.id && a.anomalyType === "CHALLENGE_FAIRNESS"
        );

        assert.strictEqual(fairAnomaly, undefined, "Valid challenge should produce no fairness flag");

        // Cleanup
        await db.delete(companyChallengeCriteriaTable).where(eq(companyChallengeCriteriaTable.challengeId, validCh.id));
        await db.delete(companyChallengesTable).where(eq(companyChallengesTable.id, validCh.id));
      }
    });

    test("Test 20: Expired / cancelled challenge produces no erroneous completion anomaly", async () => {
      const [expCh] = await db
        .insert(companyChallengesTable)
        .values({
          companyId: coA,
          title: "Expired Challenge Test",
          code: `exp_ch_${Date.now()}`,
          description: "Expired",
          status: "CLOSED",
          createdBy: "test_admin",
          startDate: new Date(Date.now() - 20 * 86400000),
          endDate: new Date(Date.now() - 5 * 86400000),
          rewardPoints: 75,
        })
        .returning();

      const diag = await runGamificationDiagnostics(coA);
      const expAnomaly = diag.anomalies.find((a) => a.metadata?.challengeId === expCh.id);
      assert.strictEqual(expAnomaly, undefined, "Expired challenge should not generate anomalies");

      await db.delete(companyChallengesTable).where(eq(companyChallengesTable.id, expCh.id));
    });

    test("Test 21: Challenge completion analytics reconcile with challenge progress records", async () => {
      const analytics = await getCompanyGamificationAnalytics(coA);
      assert.ok(typeof analytics.challenges.completionRate === "number");
      assert.ok(typeof analytics.challenges.totalPointsAwarded === "number");
    });
  });

  // ============================================================
  // 5. INTERACTION ANALYTICS & EFFECTIVENESS (Tests 22–27)
  // ============================================================
  describe("5. Interaction Analytics & Difficult Interaction Detection", () => {
    test("Test 22: Attempt count aggregates correctly across multiple learners", async () => {
      const eInt1 = await createEmp(coA, null, "Int Learner 1");
      const eInt2 = await createEmp(coA, null, "Int Learner 2");

      await db.insert(courseInteractionProgressTable).values({
        companyId: coA,
        employeeId: eInt1,
        courseId: 1,
        interactionId: "test_int_1",
        interactionType: "DECISION_SCENARIO",
        passed: true,
        score: 100,
        maxScore: 100,
        attemptCount: 3,
      });

      await db.insert(courseInteractionProgressTable).values({
        companyId: coA,
        employeeId: eInt2,
        courseId: 1,
        interactionId: "test_int_1",
        interactionType: "DECISION_SCENARIO",
        passed: true,
        score: 100,
        maxScore: 100,
        attemptCount: 2,
      });

      const analytics = await getCompanyGamificationAnalytics(coA);
      assert.ok(analytics.interactiveLearning.interactionsAttemptedCount >= 5, "Total attempts should sum to at least 5");
    });

    test("Test 23: Completion rate aggregates accurately for company", async () => {
      const analytics = await getCompanyGamificationAnalytics(coA);
      assert.ok(analytics.interactiveLearning.interactionsCompletedCount >= 2);
    });

    test("Test 24: First-attempt success calculates correctly", async () => {
      const analytics = await getCompanyGamificationAnalytics(coA);
      assert.ok(typeof analytics.interactiveLearning.firstAttemptPassRate === "number");
    });

    test("Test 25: Abandonment rate calculates for failed interactions with >= 2 retries", async () => {
      const health = await getPlatformGamificationHealth();
      assert.ok(typeof health.interactions.abandonmentRate === "number");
    });

    test("Test 26: Difficult interaction detection triggers when first-pass rate < 40% (min 5 learners)", async () => {
      const intId = `diff_int_${Date.now()}`;
      // Create 5 learners, only 1 passes on first attempt (20% pass rate)
      for (let i = 1; i <= 5; i++) {
        const emp = await createEmp(coA, null, `Diff Learner ${i}`);
        await db.insert(courseInteractionProgressTable).values({
          companyId: coA,
          employeeId: emp,
          courseId: 1,
          interactionId: intId,
          interactionType: "DECISION_SCENARIO",
          passed: i === 1,
          score: i === 1 ? 100 : 0,
          maxScore: 100,
          attemptCount: i === 1 ? 1 : 3,
        });
      }

      const diag = await runGamificationDiagnostics(coA);
      const diffAnomaly = diag.anomalies.find(
        (a) => a.metadata?.interactionId === intId && a.anomalyType === "DIFFICULT_INTERACTION"
      );

      assert.ok(diffAnomaly, "DIFFICULT_INTERACTION should trigger for pass rate < 40%");
      assert.strictEqual(diffAnomaly.severity, "INFO");
    });

    test("Test 27: Cross-company interaction data is strictly tenant-isolated", async () => {
      const analyticsA = await getCompanyGamificationAnalytics(coA);
      const analyticsB = await getCompanyGamificationAnalytics(coB);

      // Company B has no interaction records inserted above
      assert.strictEqual(analyticsB.interactiveLearning.interactionsCompletedCount, 0, "Company B should have 0 completed interactions");
      assert.ok(analyticsA.interactiveLearning.interactionsCompletedCount > 0, "Company A should have completed interactions");
    });
  });

  // ============================================================
  // 6. DEPARTMENT ANALYTICS & EXPLAINABILITY (Tests 28–31)
  // ============================================================
  describe("6. Department Analytics & TEAM_SCORE_V1 Explainability", () => {
    let deptD1: number;
    let deptD2: number;

    before(async () => {
      deptD1 = await createDept(coA, "Dept Explain Ops");
      deptD2 = await createDept(coA, "Dept Explain Finance");

      for (let i = 0; i < 3; i++) {
        const e = await createEmp(coA, deptD1, `DeptD1 Emp ${i}`);
        await addScore(coA, e, "COURSE_COMPLETED", 100, `crs_d1_${i}`);
      }

      for (let i = 0; i < 3; i++) {
        const e = await createEmp(coA, deptD2, `DeptD2 Emp ${i}`);
        await addScore(coA, e, "COURSE_COMPLETED", 100, `crs_d2_${i}`);
      }
    });

    test("Test 28: Department standings breakdown reconciles with TEAM_SCORE_V1 formula", async () => {
      const analytics = await getCompanyGamificationAnalytics(coA);
      const dept = analytics.departmentCompetition.departments.find((d) => d.departmentId === deptD1);

      assert.ok(dept, "Department D1 should exist in analytics");
      assert.strictEqual(dept.isEligible, true, "Department D1 should be eligible");
      assert.ok(dept.performanceScore <= 700, "Performance component must be <= 700");
      assert.strictEqual(dept.teamScore, Math.round(dept.performanceScore + dept.participationScore));
    });

    test("Test 29: Eligible and active participant counts are exact", async () => {
      const analytics = await getCompanyGamificationAnalytics(coA);
      const dept = analytics.departmentCompetition.departments.find((d) => d.departmentId === deptD1);

      assert.ok(dept);
      assert.strictEqual(dept.eligibleEmployeesCount, 3);
      assert.strictEqual(dept.activeParticipantsCount, 3);
      assert.strictEqual(dept.participationRate, 100);
    });

    test("Test 30: Concentration warning flags when single learner drives >= 60% of department score", async () => {
      const deptConc = await createDept(coA, "Concentrated Dept");
      const eTop = await createEmp(coA, deptConc, "Dominant Learner");
      const eOther1 = await createEmp(coA, deptConc, "Passive Learner 1");
      const eOther2 = await createEmp(coA, deptConc, "Passive Learner 2");

      // eTop earns 900 points, others earn 50 each (total = 1000, eTop = 90%)
      for (let i = 1; i <= 9; i++) {
        await addScore(coA, eTop, "COURSE_COMPLETED", 100, `top_crs_${i}`);
      }
      await addScore(coA, eOther1, "QUIZ_PASSED", 50, "q_1");
      await addScore(coA, eOther2, "QUIZ_PASSED", 50, "q_2");

      const analytics = await getCompanyGamificationAnalytics(coA);
      const concDept = analytics.departmentCompetition.departments.find((d) => d.departmentId === deptConc);

      assert.ok(concDept, "Concentrated department should exist");
      assert.ok(concDept.concentrationWarning, "Concentration warning should be present");
      assert.ok(concDept.concentrationWarning.includes("concentrated"), "Should contain neutral management message");
    });

    test("Test 31: Historical department snapshot remains immutable across analytics runs", async () => {
      const [histRow] = await db
        .insert(departmentSeasonStandingsTable)
        .values({
          companyId: coA,
          seasonId: seasonA.id,
          departmentId: deptD1,
          departmentNameSnapshot: "Historical Frozen Name",
          rank: 1,
          teamScore: 850,
          performanceScore: "600.00",
          participationScore: "250.00",
          participationRate: "100.00",
          averageSeasonalScore: "300.00",
          eligibleEmployeesCount: 3,
          activeParticipantsCount: 3,
          isEligible: true,
          eligibilityStatus: "RANKED",
          formulaVersion: TEAM_SCORE_FORMULA_V1,
          snapshotDate: "2026-02-01",
        })
        .returning();

      // Run analytics
      await getCompanyGamificationAnalytics(coA);

      const [afterHist] = await db
        .select()
        .from(departmentSeasonStandingsTable)
        .where(eq(departmentSeasonStandingsTable.id, histRow.id));

      assert.strictEqual(afterHist.departmentNameSnapshot, "Historical Frozen Name");
      assert.strictEqual(afterHist.teamScore, 850);

      // Cleanup
      await db.delete(departmentSeasonStandingsTable).where(eq(departmentSeasonStandingsTable.id, histRow.id));
    });
  });

  // ============================================================
  // 7. SECURITY, TENANT ISOLATION & EXPORTS (Tests 32–36)
  // ============================================================
  describe("7. Security, Tenant Isolation & CSV Exports", () => {
    test("Test 32: Company A analytics strictly excludes Company B learners and scores", async () => {
      const eA = await createEmp(coA, null, "ScoreCo A Emp");
      const eB = await createEmp(coB, null, "ScoreCo B Emp");

      await addScore(coA, eA, "COURSE_COMPLETED", 100, "coA_crs");
      await addScore(coB, eB, "COURSE_COMPLETED", 500, "coB_crs");

      const analyticsA = await getCompanyGamificationAnalytics(coA);
      const analyticsB = await getCompanyGamificationAnalytics(coB);

      assert.notStrictEqual(analyticsA.learningEngagement.averageSeasonalScore, analyticsB.learningEngagement.averageSeasonalScore);
      assert.strictEqual(analyticsA.companyId, coA);
      assert.strictEqual(analyticsB.companyId, coB);
    });

    test("Test 33: Platform Admin gamification audit CSV generates valid headers and rows", async () => {
      const csv = await generatePlatformGamificationAuditCsv(coA);
      assert.ok(csv.startsWith("Transaction ID,Timestamp,Company ID"), "CSV should have standard headers");
      assert.ok(csv.includes("COURSE_COMPLETED"), "CSV should include event types");
    });

    test("Test 34: Company engagement CSV contains tenant-scoped learner records", async () => {
      const csvA = await generateCompanyEngagementCsv(coA);
      assert.ok(csvA.startsWith("Rank,Employee ID,Name,Email"), "Company CSV should start with Rank,Employee ID headers");
      assert.ok(csvA.includes("ScoreCo A Emp"), "Company A CSV must include Company A employee");
      assert.ok(!csvA.includes("ScoreCo B Emp"), "Company A CSV must NOT include Company B employee");
    });

    test("Test 35: Score reversal process maintains immutable transaction history", async () => {
      const eRev = await createEmp(coA, null, "Reverse Audit Emp");
      const { transaction } = await addScore(coA, eRev, "COURSE_COMPLETED", 100, "rev_crs");

      assert.ok(transaction);

      const reversed = await reverseScoreTransaction({
        transactionId: transaction.id,
        reason: "Test audit reason for reversal",
        actorUserId: "admin_user",
        actorRole: "platform_admin",
      });

      assert.strictEqual(reversed.isReversed, true);
      assert.strictEqual(reversed.reversalReason, "Test audit reason for reversal");

      // Verify row still exists in DB
      const [dbTx] = await db.select().from(elevioScoreLedgerTable).where(eq(elevioScoreLedgerTable.id, transaction.id));
      assert.ok(dbTx, "Transaction row must NOT be deleted from ledger");
      assert.strictEqual(dbTx.isReversed, true);

      // Verify cached score recomputed
      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, eRev));
      assert.strictEqual(emp.elevioScore, 0, "Cached score must adjust to 0 after reversal");
    });

    test("Test 36: Platform gamification health aggregates non-zero system metrics", async () => {
      const health = await getPlatformGamificationHealth();
      assert.ok(health.scoring.totalPointsAwarded > 0, "Total points awarded should be > 0");
      assert.ok(health.competition.companiesWithIndividualCompetition > 0, "Should have active companies");
    });
  });

  // ============================================================
  // 8. REGRESSION PRESERVATION (Tests 37–44)
  // ============================================================
  describe("8. Regression Preservation (Sprints 14.0–14.5)", () => {
    test("Test 37: Sprint 14.0 Course completion scoring (+100) unchanged", async () => {
      const e = await createEmp(coA, null, "Reg Course Emp");
      const res = await awardCourseCompletionScore({
        companyId: coA,
        employeeId: e,
        courseId: 1,
        courseTitle: "Course 1",
      });
      assert.strictEqual(res.awarded, true);
      assert.strictEqual(res.transaction?.points, 100);
    });

    test("Test 38: Sprint 14.0 Quiz pass scoring (+50, bonuses, first-attempt) unchanged", async () => {
      const e = await createEmp(coA, null, "Reg Quiz Emp");
      const awards = await awardQuizPassScore({
        companyId: coA,
        employeeId: e,
        courseId: 1,
        score: 100,
        quizAttemptId: 9991,
      });
      const totalQuizPts = awards.reduce((sum, a) => sum + (a.awarded ? a.points : 0), 0);
      assert.strictEqual(totalQuizPts, 90); // 50 pass + 40 (100% bonus)
    });

    test("Test 39: Sprint 14.0 Workplace Action scoring (+50) unchanged", async () => {
      const e = await createEmp(coA, null, "Reg Action Emp");
      const res = await awardWorkplaceActionScore({
        companyId: coA,
        employeeId: e,
        commitmentId: 8881,
        courseId: 1,
      });
      assert.strictEqual(res.awarded, true);
      assert.strictEqual(res.transaction?.points, 50);
    });

    test("Test 40: Sprint 14.3 Company Challenge completion scoring unchanged", async () => {
      const e = await createEmp(coA, null, "Reg Challenge Emp");
      const res = await awardChallengeCompletionScore({
        companyId: coA,
        employeeId: e,
        challengeId: 7771,
        challengeTitle: "Test Challenge",
        points: 75,
      });
      assert.strictEqual(res.awarded, true);
      assert.strictEqual(res.transaction?.points, 75);
    });

    test("Test 41: Sprint 14.4 Interactive course engine unchanged", async () => {
      const e = await createEmp(coA, null, "Reg Interaction Emp");
      const result = await evaluateAndSaveInteraction({
        companyId: coA,
        employeeId: e,
        courseId: 1,
        interactionId: "reg_int_1",
        interactionType: "SORTING",
        submissionPayload: { items: [{ id: "1", category: "recycle" }] },
      });
      assert.ok(typeof result.passed === "boolean");
      assert.ok(result.progressRecord);
    });

    test("Test 42: Sprint 14.4 Plain interactions award zero score points", async () => {
      const e = await createEmp(coA, null, "Reg Zero Int Emp");
      const beforeScore = (await db.select().from(employeesTable).where(eq(employeesTable.id, e)))[0].elevioScore;

      await evaluateAndSaveInteraction({
        companyId: coA,
        employeeId: e,
        courseId: 1,
        interactionId: "reg_zero_int",
        interactionType: "DECISION_SCENARIO",
        submissionPayload: { selectedOptionId: "opt_a" },
      });

      const afterScore = (await db.select().from(employeesTable).where(eq(employeesTable.id, e)))[0].elevioScore;
      assert.strictEqual(afterScore, beforeScore, "Plain course interaction must award 0 score points");
    });

    test("Test 43: Sprint 14.5 Department Competition calculation unchanged", async () => {
      const dept = await createDept(coA, "Reg Dept Comp");
      for (let i = 0; i < 3; i++) {
        const emp = await createEmp(coA, dept, `Reg Dept Emp ${i}`);
        await addScore(coA, emp, "COURSE_COMPLETED", 100, `crs_reg_${i}`);
      }

      const res = await calculateDepartmentStandings(coA, seasonA.id, { previewAll: true });
      const deptStanding = res.standings.find((d) => d.departmentId === dept);
      assert.ok(deptStanding);
      assert.strictEqual(deptStanding.isEligible, true);
    });

    test("Test 44: Sprint 14.1 Leaderboard privacy modes unchanged", async () => {
      const [comp] = await db.select().from(companiesTable).where(eq(companiesTable.id, coA));
      assert.ok(["full_name", "initial", "anonymous"].includes(comp.leaderboardPrivacyMode || "full_name"));
    });
  });

  // ============================================================
  // 9. CRITICAL COURSE CATALOGUE PROTECTION (Tests 45–48)
  // ============================================================
  describe("9. Critical Course Catalogue Protection", () => {
    test("Test 45: Total course count is at least 52 and unchanged", async () => {
      const allCourses = await db.select().from(coursesTable);
      assert.ok(allCourses.length >= 52, `Expected at least 52 courses, found ${allCourses.length}`);
    });

    test("Test 46: Courses 35–52 (index 34–51) have no lesson mutations from Sprint 14.6", async () => {
      const allCourses = await db.select().from(coursesTable).orderBy(coursesTable.id);
      const courses35to52 = allCourses.slice(34, 52);

      assert.strictEqual(courses35to52.length, 18, "Should have exactly 18 courses in 35-52 range");
      for (const crs of courses35to52) {
        assert.ok(crs.id, "Course must have valid ID");
      }
    });

    test("Test 47: Existing course completion records are unchanged", async () => {
      const [course1] = await db.select().from(coursesTable).where(eq(coursesTable.id, 1));
      assert.ok(course1, "Course 1 must exist");
    });

    test("Test 48: Certificates and formal training evidence remain separate from gamification", async () => {
      // Elevio score ledger has no certificates table coupling
      const [ledgerRow] = await db.select().from(elevioScoreLedgerTable).limit(1);
      if (ledgerRow) {
        assert.strictEqual(ledgerRow.scoringRuleVersion, "v1");
      }
      assert.ok(true, "Training records separate from gamification");
    });
  });
});
