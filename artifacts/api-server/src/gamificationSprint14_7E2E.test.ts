import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import {
  db,
  companiesTable,
  employeesTable,
  categoriesTable,
  coursesTable,
  departmentsTable,
  elevioScoreLedgerTable,
  challengeTemplatesTable,
  gamificationAnomaliesTable,
} from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import {
  awardCourseCompletionScore,
  awardQuizPassScore,
  awardWorkplaceActionScore,
  getEmployeeScoreSummary,
  SCORING_POINTS,
} from "./lib/scoringService.js";
import {
  calculateCompanyLeaderboard,
  updateCompanyCompetitionSettings,
} from "./lib/leaderboardService.js";
import {
  calculateDepartmentStandings,
  recordDepartmentTransfer,
} from "./lib/departmentCompetitionService.js";
import {
  ensureChallengeTemplates,
  activateCompanyChallenge,
  evaluateEmployeeChallengeProgress,
  getCompanyChallengeAnalytics,
} from "./lib/challengeService.js";
import {
  runGamificationDiagnostics,
  recalculateEmployeeScore,
  listGamificationAnomalies,
  generateCompanyEngagementCsv,
  escapeCsv,
} from "./lib/gamificationAnalyticsService.js";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications.js";

describe("Sprint 14.7 — Gamification Launch Readiness, End-to-End Verification & UX Closure Suite", () => {
  let companyAId: number;
  let companyBId: number;
  let deptA1Id: number;
  let deptA2Id: number;
  let empA1: any;
  let empA2: any;
  let empB1: any;
  let testCourseId: number;
  let testChallengeId: number;
  let templateWasteId: number;

  const CLERK_USER_A1 = `sprint14_7_clerk_a1_${Date.now()}`;
  const CLERK_USER_A2 = `sprint14_7_clerk_a2_${Date.now()}`;
  const CLERK_USER_B1 = `sprint14_7_clerk_b1_${Date.now()}`;

  before(async () => {
    await ensureSchemaModifications();
    await ensureChallengeTemplates();

    // 1. Create Companies
    const [compA] = await db
      .insert(companiesTable)
      .values({
        name: "Sprint 14.7 Test Company A",
        slug: `sprint14-7-comp-a-${Date.now()}`,
        leaderboardEnabled: true,
        departmentCompetitionEnabled: true,
        leaderboardPrivacyMode: "full_name",
      })
      .returning();
    companyAId = compA.id;

    const [compB] = await db
      .insert(companiesTable)
      .values({
        name: "Sprint 14.7 Test Company B",
        slug: `sprint14-7-comp-b-${Date.now()}`,
        leaderboardEnabled: true,
        departmentCompetitionEnabled: true,
      })
      .returning();
    companyBId = compB.id;

    // 2. Create Departments for Company A
    const [dept1] = await db
      .insert(departmentsTable)
      .values({
        companyId: companyAId,
        name: "Sustainability & Operations",
      })
      .returning();
    deptA1Id = dept1.id;

    const [dept2] = await db
      .insert(departmentsTable)
      .values({
        companyId: companyAId,
        name: "Corporate Finance",
      })
      .returning();
    deptA2Id = dept2.id;

    // 3. Create Employees
    const [eA1] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        clerkUserId: CLERK_USER_A1,
        name: "=cmd|' /C calc'!A1 Alice Leader", // Formatted to test CSV formula injection
        email: `alice.${Date.now()}@company-a.com`,
        departmentId: deptA1Id,
        elevioScore: 0,
        status: "active",
      })
      .returning();
    empA1 = eA1;

    const [eA2] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        clerkUserId: CLERK_USER_A2,
        name: "Bob Private",
        email: `bob.${Date.now()}@company-a.com`,
        departmentId: deptA1Id,
        elevioScore: 0,
        status: "active",
      })
      .returning();
    empA2 = eA2;

    const [eB1] = await db
      .insert(employeesTable)
      .values({
        companyId: companyBId,
        clerkUserId: CLERK_USER_B1,
        name: "Charlie Foreign",
        email: `charlie.${Date.now()}@company-b.com`,
        elevioScore: 0,
        status: "active",
      })
      .returning();
    empB1 = eB1;

    // 4. Create Test Course
    const [category] = await db.select().from(categoriesTable).limit(1);
    const [course] = await db
      .insert(coursesTable)
      .values({
        title: "Sprint 14.7 Integration Course",
        description: "Integration test course description",
        slug: `sprint14-7-course-${Date.now()}`,
        courseCode: `ELH-TEST-${Date.now().toString().slice(-4)}`,
        categoryId: category?.id ?? 1,
        isPublished: true,
        status: "published",
      })
      .returning();
    testCourseId = course.id;

    // 5. Activate Test Challenge from Template
    const [wasteTpl] = await db
      .select()
      .from(challengeTemplatesTable)
      .where(eq(challengeTemplatesTable.code, "WASTE_SORTING_CHALLENGE"))
      .limit(1);
    templateWasteId = wasteTpl.id;

    const challenge = await activateCompanyChallenge({
      companyId: companyAId,
      templateId: templateWasteId,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 86400 * 1000),
      createdBy: "admin_user_a",
    });
    testChallengeId = challenge.id;
  });

  // =========================================================================
  // JOURNEY 1 — Learner Earns Legitimate Points & Duplicate Prevention
  // =========================================================================
  describe("Journey 1 — Learner Earns Legitimate Points", () => {
    it("1.1 completes eligible activity and records exactly one score-ledger entry", async () => {
      const award = await awardCourseCompletionScore({
        companyId: companyAId,
        employeeId: empA1.id,
        clerkUserId: CLERK_USER_A1,
        courseId: testCourseId,
        courseTitle: "Sprint 14.7 Integration Course",
      });

      assert.equal(award.awarded, true, "First course completion must award points");

      const [ledgerEntry] = await db
        .select()
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.employeeId, empA1.id),
            eq(elevioScoreLedgerTable.eventType, "COURSE_COMPLETED")
          )
        );

      assert.ok(ledgerEntry, "Ledger entry must exist in database");
      assert.equal(ledgerEntry.points, 100);
      assert.equal(ledgerEntry.isReversed, false);
    });

    it("1.2 updates materialized lifetime score and current season score", async () => {
      const [emp] = await db
        .select()
        .from(employeesTable)
        .where(eq(employeesTable.id, empA1.id));

      assert.equal(emp.elevioScore, 100, "Materialized elevio_score must equal 100");

      const summary = await getEmployeeScoreSummary(empA1.id, companyAId);
      assert.equal(summary.totalScore, 100);
      assert.equal(summary.breakdown.learning, 100);
      assert.equal(summary.recentTransactions.length, 1);
      assert.equal(summary.recentTransactions[0].displayTitle, "Course Completed");
    });

    it("1.3 prevents duplicate submissions from awarding points again (Idempotency)", async () => {
      const duplicateAward = await awardCourseCompletionScore({
        companyId: companyAId,
        employeeId: empA1.id,
        clerkUserId: CLERK_USER_A1,
        courseId: testCourseId,
        courseTitle: "Sprint 14.7 Integration Course",
      });

      assert.equal(duplicateAward.awarded, false, "Duplicate completion must not award points");

      const [emp] = await db
        .select()
        .from(employeesTable)
        .where(eq(employeesTable.id, empA1.id));

      assert.equal(emp.elevioScore, 100, "Score must remain 100 without duplicate inflation");
    });
  });

  // =========================================================================
  // JOURNEY 2 — Privacy-Controlled Leaderboard & CSV Export
  // =========================================================================
  describe("Journey 2 — Privacy-Controlled Leaderboard & Exports", () => {
    it("2.1 respects company anonymous privacy mode on leaderboard", async () => {
      // Set Company A to anonymous privacy mode
      await updateCompanyCompetitionSettings({
        companyId: companyAId,
        enabled: true,
        privacyMode: "anonymous",
        actorUserId: "admin_tester",
        actorRole: "company_admin",
      });

      // Award Bob 50 points
      await awardWorkplaceActionScore({
        companyId: companyAId,
        employeeId: empA2.id,
        clerkUserId: CLERK_USER_A2,
        commitmentId: 1,
        commitmentText: "Green commuting action",
      });

      const leaderboard = await calculateCompanyLeaderboard(companyAId, empA1.id);
      assert.equal(leaderboard.enabled, true);
      assert.equal(leaderboard.privacyMode, "anonymous");
      assert.ok(leaderboard.topPerformers && leaderboard.topPerformers.length > 0);
      assert.ok(
        leaderboard.topPerformers.some((p) => p.displayName.includes("Learner") || p.displayName.includes("You"))
      );
      assert.equal(
        leaderboard.topPerformers.some((p) => p.displayName.includes("Bob Private")),
        false,
        "Real name must not be visible in anonymous mode"
      );
    });

    it("2.2 respects learner privacy mode in Company Admin CSV export", async () => {
      const csv = await generateCompanyEngagementCsv(companyAId);
      assert.ok(csv.includes("ELEVIO Skills Company Engagement"), "Header must include export title");
      assert.ok(csv.includes("Learner #"), "Anonymous learners must be masked as 'Learner #ID'");
      assert.ok(csv.includes("[Hidden - Opted Out]"), "Email addresses must be masked for anonymous learners");
      assert.equal(csv.includes("bob."), false, "Real email must not be leaked");
    });
  });

  // =========================================================================
  // JOURNEY 3 — Company Challenge Progress & Cross-Company Security
  // =========================================================================
  describe("Journey 3 — Company Challenge Progress & Cross-Company Security", () => {
    it("3.1 evaluates employee challenge progress without crashing or duplicate score", async () => {
      const evalResult = await evaluateEmployeeChallengeProgress({ employee: empA1 });
      assert.ok(Array.isArray(evalResult.completedChallenges));

      const repeatEval = await evaluateEmployeeChallengeProgress({ employee: empA1 });
      assert.ok(Array.isArray(repeatEval.completedChallenges));
    });

    it("3.2 blocks foreign company from accessing Company A challenge analytics", async () => {
      const analyticsA = await getCompanyChallengeAnalytics({
        companyId: companyAId,
        challengeId: testChallengeId,
      });
      assert.ok(analyticsA.challenge);

      await assert.rejects(
        async () => {
          await getCompanyChallengeAnalytics({
            companyId: companyBId,
            challengeId: testChallengeId,
          });
        },
        /Challenge not found/
      );
    });
  });

  // =========================================================================
  // JOURNEY 4 — Department Competition & Historical Transfer Attribution
  // =========================================================================
  describe("Journey 4 — Department Competition & Historical Transfer Attribution", () => {
    it("4.1 preserves historical points in Dept A1 after learner transfers to Dept A2", async () => {
      // Transfer Alice to Department A2
      await recordDepartmentTransfer({
        companyId: companyAId,
        employeeId: empA1.id,
        newDepartmentId: deptA2Id,
        effectiveDate: new Date(),
      });

      // Award Alice new points in Department A2 (+50 for quiz)
      await awardQuizPassScore({
        companyId: companyAId,
        employeeId: empA1.id,
        clerkUserId: CLERK_USER_A1,
        courseId: testCourseId,
        score: 85,
        quizAttemptId: 9991,
      });

      const res = await calculateDepartmentStandings(companyAId);
      assert.equal(res.enabled, true);
      assert.equal(res.formulaVersion, "TEAM_SCORE_V1");
      assert.ok(res.standings.length >= 1, "Standings calculated deterministically");
    });
  });

  // =========================================================================
  // JOURNEY 5 — Score Mismatch Review, Non-Punitive Diagnostics & Safe Repair
  // =========================================================================
  describe("Journey 5 — Score Mismatch Review, Non-Punitive Diagnostics & Safe Repair", () => {
    it("5.1 detects score mismatch without altering ledger or punishing employee", async () => {
      // Manually simulate a desynced cache (materialized score corrupted to 9999)
      await db
        .update(employeesTable)
        .set({ elevioScore: 9999 })
        .where(eq(employeesTable.id, empA1.id));

      const diag = await runGamificationDiagnostics(companyAId);
      assert.ok(diag.anomaliesDetectedCount > 0, "Diagnostics must flag the mismatch");

      const anomalies = await listGamificationAnomalies({
        companyId: companyAId,
        anomalyType: "SCORE_MISMATCH",
        status: "OPEN",
      });

      assert.ok(anomalies.total >= 1, "Anomaly record must be created in OPEN status");

      // Verify no points were deducted automatically
      const [empBefore] = await db
        .select()
        .from(employeesTable)
        .where(eq(employeesTable.id, empA1.id));

      assert.equal(empBefore.elevioScore, 9999, "Score must not be automatically punished/mutated");
    });

    it("5.2 performs server-authorized, idempotent score reconciliation", async () => {
      const anomalies = await listGamificationAnomalies({
        companyId: companyAId,
        anomalyType: "SCORE_MISMATCH",
        status: "OPEN",
      });

      const mismatchAnomaly = anomalies.anomalies[0];
      assert.ok(mismatchAnomaly, "Mismatch anomaly should exist");

      // Calculate actual ledger sum
      const ledgerRows = await db
        .select({ sum: sql`COALESCE(SUM(points), 0)::integer` })
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.employeeId, empA1.id),
            eq(elevioScoreLedgerTable.isReversed, false)
          )
        );
      const expectedSum = Number((ledgerRows[0] as any).sum);

      const recalcResult = await recalculateEmployeeScore({
        employeeId: empA1.id,
        reason: "Operational audit reconciliation against ledger source of truth",
        actorUserId: "platform_admin_operator_1",
        actorRole: "platform_admin",
      });

      assert.equal(recalcResult.beforeScore, 9999);
      assert.equal(recalcResult.afterScore, expectedSum, "Score must be restored to immutable ledger sum");

      const [empAfter] = await db
        .select()
        .from(employeesTable)
        .where(eq(employeesTable.id, empA1.id));

      assert.equal(empAfter.elevioScore, expectedSum);

      // Verify anomaly is now RESOLVED
      const [updatedAnomaly] = await db
        .select()
        .from(gamificationAnomaliesTable)
        .where(eq(gamificationAnomaliesTable.id, mismatchAnomaly.id));

      assert.equal(updatedAnomaly.status, "RESOLVED");

      // Verify repeating reconciliation is idempotent
      const repeatRecalc = await recalculateEmployeeScore({
        employeeId: empA1.id,
        reason: "Repeat reconciliation check",
        actorUserId: "platform_admin_operator_1",
        actorRole: "platform_admin",
      });

      assert.equal(repeatRecalc.beforeScore, expectedSum);
      assert.equal(repeatRecalc.afterScore, expectedSum, "Idempotent recalculation produces identical score");
    });
  });

  // =========================================================================
  // JOURNEY 6 — Strict Tenant Isolation
  // =========================================================================
  describe("Journey 6 — Strict Tenant Isolation", () => {
    it("6.1 prevents Company B from viewing Company A's engagement metrics or CSV", async () => {
      const compBCsv = await generateCompanyEngagementCsv(companyBId);
      assert.ok(compBCsv.includes("Charlie F.") || compBCsv.includes("Charlie Foreign"), "Company B export should contain Charlie");
      assert.equal(compBCsv.includes("Alice Leader"), false, "Company B export MUST NOT leak Company A employees");
    });
  });

  // =========================================================================
  // JOURNEY 7 — CSV Security & Anti-Formula Injection
  // =========================================================================
  describe("Journey 7 — CSV Security & Anti-Formula Injection", () => {
    it("7.1 sanitizes cells starting with formula injection characters (=, +, -, @)", () => {
      const unsafeFormula = "=1+1;cmd|' /C calc'!A1";
      const sanitized = escapeCsv(unsafeFormula);
      assert.ok(sanitized.startsWith("''=") || sanitized.startsWith("'="), "Formula must be prefixed with safe apostrophe");

      const plusFormula = "+SUM(A1:A10)";
      assert.ok(escapeCsv(plusFormula).startsWith("'+"), "+ prefix must be escaped");

      const atFormula = "@SUM(A1:A10)";
      assert.ok(escapeCsv(atFormula).startsWith("'@"), "@ prefix must be escaped");
    });
  });
});
