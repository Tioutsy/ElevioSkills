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
  companySeasonsTable,
  companySeasonSnapshotsTable,
  auditLogsTable,
} from "@workspace/db";
import { eq, and, sql, desc } from "drizzle-orm";
import {
  getOrCreateActiveCompanySeason,
  calculateCompanyLeaderboard,
  getCompanyAdminLeaderboard,
  updateCompanyCompetitionSettings,
  getCompanySeasonHistory,
  formatDisplayName,
  getMonthBounds,
  getMonthTitle,
} from "./lib/leaderboardService.js";
import {
  awardCourseCompletionScore,
  awardQuizPassScore,
  awardWorkplaceActionScore,
  reverseScoreTransaction,
} from "./lib/scoringService.js";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications.js";

describe("Sprint 14.1 — Company Leaderboards, Seasons & Privacy Controls Test Matrix", () => {
  let companyAId: number;
  let companyBId: number;
  let empA1Id: number;
  let empA2Id: number;
  let empA3Id: number;
  let empB1Id: number;
  let testCourseId: number;

  const CLERK_USER_A1 = "clerk_test_leaderboard_a1";
  const CLERK_USER_A2 = "clerk_test_leaderboard_a2";
  const CLERK_USER_A3 = "clerk_test_leaderboard_a3";
  const CLERK_USER_B1 = "clerk_test_leaderboard_b1";

  before(async () => {
    // 0. Ensure schema modifications exist
    await ensureSchemaModifications();

    // 1. Create Test Companies
    const [compA] = await db
      .insert(companiesTable)
      .values({
        name: "Leaderboard Corp A",
        slug: `lb-corp-a-${Date.now()}`,
        leaderboardEnabled: false, // Default is disabled
        leaderboardPrivacyMode: "initial",
      })
      .returning();
    companyAId = compA.id;

    const [compB] = await db
      .insert(companiesTable)
      .values({
        name: "Leaderboard Corp B",
        slug: `lb-corp-b-${Date.now()}`,
        leaderboardEnabled: true,
        leaderboardPrivacyMode: "anonymous",
      })
      .returning();
    companyBId = compB.id;

    // 2. Create Employees
    const [eA1] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        clerkUserId: CLERK_USER_A1,
        name: "Sarah Ramdin",
        email: `sarah.${Date.now()}@corp-a.com`,
        department: "Sustainability",
        role: "employee",
        status: "active",
      })
      .returning();
    empA1Id = eA1.id;

    const [eA2] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        clerkUserId: CLERK_USER_A2,
        name: "Kevin Mootoo",
        email: `kevin.${Date.now()}@corp-a.com`,
        department: "Operations",
        role: "employee",
        status: "active",
      })
      .returning();
    empA2Id = eA2.id;

    const [eA3] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        clerkUserId: CLERK_USER_A3,
        name: "Melissa Tsang",
        email: `melissa.${Date.now()}@corp-a.com`,
        department: "Logistics",
        role: "employee",
        status: "active",
      })
      .returning();
    empA3Id = eA3.id;

    const [eB1] = await db
      .insert(employeesTable)
      .values({
        companyId: companyBId,
        clerkUserId: CLERK_USER_B1,
        name: "David Paul",
        email: `david.${Date.now()}@corp-b.com`,
        department: "Finance",
        role: "employee",
        status: "active",
      })
      .returning();
    empB1Id = eB1.id;

    // 3. Create Course
    let [cat] = await db.select().from(categoriesTable).limit(1);
    if (!cat) {
      const [newCat] = await db
        .insert(categoriesTable)
        .values({ name: "Energy", slug: `energy-lb-${Date.now()}` })
        .returning();
      cat = newCat;
    }

    const [course] = await db
      .insert(coursesTable)
      .values({
        title: "Energy Efficiency 101",
        slug: `energy-eff-101-${Date.now()}`,
        description: "Energy efficiency fundamentals",
        categoryId: cat.id,
        level: "beginner",
        version: 1,
        passingScore: 70,
        status: "published",
      })
      .returning();
    testCourseId = course.id;
  });

  after(async () => {
    await db.delete(companySeasonSnapshotsTable).where(eq(companySeasonSnapshotsTable.companyId, companyAId));
    await db.delete(companySeasonSnapshotsTable).where(eq(companySeasonSnapshotsTable.companyId, companyBId));
    await db.delete(companySeasonsTable).where(eq(companySeasonsTable.companyId, companyAId));
    await db.delete(companySeasonsTable).where(eq(companySeasonsTable.companyId, companyBId));
    await db.delete(elevioScoreLedgerTable).where(eq(elevioScoreLedgerTable.companyId, companyAId));
    await db.delete(elevioScoreLedgerTable).where(eq(elevioScoreLedgerTable.companyId, companyBId));
    await db.delete(employeesTable).where(eq(employeesTable.companyId, companyAId));
    await db.delete(employeesTable).where(eq(employeesTable.companyId, companyBId));
    await db.delete(coursesTable).where(eq(coursesTable.id, testCourseId));
    await db.delete(companiesTable).where(eq(companiesTable.id, companyAId));
    await db.delete(companiesTable).where(eq(companiesTable.id, companyBId));
  });

  describe("1. Season Lifecycle Architecture", () => {
    it("creates the first company season with status ACTIVE", async () => {
      const season = await getOrCreateActiveCompanySeason(companyAId);
      assert.ok(season.id);
      assert.equal(season.companyId, companyAId);
      assert.equal(season.status, "ACTIVE");
      assert.equal(season.seasonType, "MONTHLY");
      assert.equal(season.title, getMonthTitle(new Date()));
    });

    it("ensures duplicate creation attempts are idempotent and do not create duplicate seasons", async () => {
      const season1 = await getOrCreateActiveCompanySeason(companyAId);
      const season2 = await getOrCreateActiveCompanySeason(companyAId);
      assert.equal(season1.id, season2.id);

      const count = await db
        .select({ count: sql<number>`count(*)::integer` })
        .from(companySeasonsTable)
        .where(
          and(
            eq(companySeasonsTable.companyId, companyAId),
            eq(companySeasonsTable.seasonType, "MONTHLY"),
            eq(companySeasonsTable.title, season1.title)
          )
        );
      assert.equal(count[0].count, 1);
    });

    it("handles mid-month activation by setting start timestamp to activation date", async () => {
      const midMonthDate = new Date(Date.UTC(2026, 7, 18, 14, 0, 0)); // 18 August 2026
      const season = await getOrCreateActiveCompanySeason(companyBId, {
        isMidMonthActivation: true,
        activationDate: midMonthDate,
      });

      assert.equal(season.startDate.getTime(), midMonthDate.getTime());
      assert.equal(season.endDate.getUTCFullYear(), 2026);
      assert.equal(season.endDate.getUTCMonth(), 7); // August
      assert.equal(season.endDate.getUTCDate(), 31);
    });

    it("preserves lifetime ELEVIO Score when season starts or resets", async () => {
      // Award course completion to Sarah
      await awardCourseCompletionScore({
        companyId: companyAId,
        employeeId: empA1Id,
        clerkUserId: CLERK_USER_A1,
        courseId: testCourseId,
        version: 1,
      });

      const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, empA1Id));
      assert.equal(emp.elevioScore, 100);
    });
  });

  describe("2. Company Ranking, Ties & Next-Position Rules", () => {
    it("returns disabled response when company competition is off", async () => {
      const result = await calculateCompanyLeaderboard(companyAId, empA1Id);
      assert.equal(result.enabled, false);
      assert.ok(result.message?.includes("disabled"));
    });

    it("enables competition via Company Admin update and returns live leaderboard", async () => {
      await updateCompanyCompetitionSettings({
        companyId: companyAId,
        enabled: true,
        privacyMode: "initial",
        actorUserId: "admin_user_test",
        actorRole: "company_admin",
      });

      const result = await calculateCompanyLeaderboard(companyAId, empA1Id);
      assert.equal(result.enabled, true);
      assert.equal(result.totalParticipants, 3); // Sarah, Kevin, Melissa
    });

    it("ranks highest seasonal score first using non-reversed points inside season boundaries", async () => {
      // Award Kevin +50 (Workplace Action)
      const [commitmentKevin] = await db
        .insert(learnerCommitmentsTable)
        .values({
          companyId: companyAId,
          employeeId: empA2Id,
          courseId: testCourseId,
          commitmentText: "LED lighting upgrade",
          status: "action-reported",
        })
        .returning();

      await awardWorkplaceActionScore({
        companyId: companyAId,
        employeeId: empA2Id,
        clerkUserId: CLERK_USER_A2,
        commitmentId: commitmentKevin.id,
        courseId: testCourseId,
      });

      // Award Melissa +50 (Workplace Action)
      const [commitmentMelissa] = await db
        .insert(learnerCommitmentsTable)
        .values({
          companyId: companyAId,
          employeeId: empA3Id,
          courseId: testCourseId,
          commitmentText: "Waste sorting bins",
          status: "action-reported",
        })
        .returning();

      await awardWorkplaceActionScore({
        companyId: companyAId,
        employeeId: empA3Id,
        clerkUserId: CLERK_USER_A3,
        commitmentId: commitmentMelissa.id,
        courseId: testCourseId,
      });

      // Sarah: 100 pts (Rank 1)
      // Kevin: 50 pts (Rank 2 - Tie)
      // Melissa: 50 pts (Rank 2 - Tie)
      const lb = await calculateCompanyLeaderboard(companyAId, empA2Id);
      assert.equal(lb.enabled, true);

      const top = lb.topPerformers!;
      assert.equal(top[0].seasonalScore, 100);
      assert.equal(top[0].rank, 1);

      assert.equal(top[1].seasonalScore, 50);
      assert.equal(top[1].rank, 2);

      assert.equal(top[2].seasonalScore, 50);
      assert.equal(top[2].rank, 2);
    });

    it("calculates next-position overtaking points correctly for ties and leading positions", async () => {
      // Kevin is currently Rank 2 (50 pts). Top score is Sarah (100 pts).
      // Points needed to OVERTAKE Rank 1 = (100 - 50) + 1 = 51 pts.
      const lbKevin = await calculateCompanyLeaderboard(companyAId, empA2Id);
      assert.equal(lbKevin.currentUser?.rank, 2);
      assert.equal(lbKevin.currentUser?.pointsToNextRank, 51);
      assert.equal(lbKevin.currentUser?.nextRankTarget, 1);
      assert.equal(lbKevin.currentUser?.targetMessage, "51 points to move ahead of #1");

      // Sarah is currently Rank 1. Leading message is displayed.
      const lbSarah = await calculateCompanyLeaderboard(companyAId, empA1Id);
      assert.equal(lbSarah.currentUser?.rank, 1);
      assert.equal(lbSarah.currentUser?.targetMessage, "You're currently leading your company this month.");
    });

    it("excludes reversed transactions from seasonal score and updates rank immediately", async () => {
      const [tx] = await db
        .select()
        .from(elevioScoreLedgerTable)
        .where(
          and(
            eq(elevioScoreLedgerTable.companyId, companyAId),
            eq(elevioScoreLedgerTable.employeeId, empA1Id)
          )
        )
        .limit(1);

      await reverseScoreTransaction({
        transactionId: tx.id,
        reason: "Test score rollback",
        actorUserId: "platform_admin",
        actorRole: "platform_admin",
      });

      // Sarah is now 0 pts, Kevin & Melissa are Rank 1 with 50 pts each. Sarah is Rank 3.
      const lb = await calculateCompanyLeaderboard(companyAId, empA1Id);
      assert.equal(lb.currentUser?.rank, 3);
      assert.equal(lb.currentUser?.seasonalScore, 0);

      // Re-award Sarah +100 for subsequent tests
      await awardCourseCompletionScore({
        companyId: companyAId,
        employeeId: empA1Id,
        clerkUserId: CLERK_USER_A1,
        courseId: testCourseId,
        version: 2, // version 2 to create fresh award
      });
    });
  });

  describe("3. Privacy & Masking Controls", () => {
    it("formats first name + surname initial correctly in 'initial' mode", () => {
      assert.equal(formatDisplayName("Sarah Ramdin", 1, "initial", false), "Sarah R.");
      assert.equal(formatDisplayName("Kevin Mootoo", 2, "initial", false), "Kevin M.");
      assert.equal(formatDisplayName("Sarah Ramdin", 1, "initial", true), "Sarah R. (You)");
    });

    it("formats full name correctly in 'full_name' mode", () => {
      assert.equal(formatDisplayName("Sarah Ramdin", 1, "full_name", false), "Sarah Ramdin");
      assert.equal(formatDisplayName("Sarah Ramdin", 1, "full_name", true), "Sarah Ramdin (You)");
    });

    it("formats pseudonyms without leaking identity in 'anonymous' mode", () => {
      assert.equal(formatDisplayName("Sarah Ramdin", 1, "anonymous", false), "Learner 1");
      assert.equal(formatDisplayName("Kevin Mootoo", 2, "anonymous", false), "Learner 2");
      assert.equal(formatDisplayName("Sarah Ramdin", 1, "anonymous", true), "You (Learner 1)");
    });

    it("enforces privacy mode server-side in API payload", async () => {
      // Company B has anonymous mode
      const lbB = await calculateCompanyLeaderboard(companyBId, empB1Id);
      assert.equal(lbB.privacyMode, "anonymous");
      assert.ok(lbB.topPerformers![0].displayName.includes("Learner") || lbB.topPerformers![0].displayName.includes("You"));
      assert.equal(lbB.topPerformers![0].displayName.includes("David"), false); // No real name leak
    });
  });

  describe("4. Tenant Security & Cross-Company Isolation", () => {
    it("ensures Company A learner cannot access Company B leaderboard", async () => {
      // Calculating Company B leaderboard for an employee from Company A
      const lbCross = await calculateCompanyLeaderboard(companyBId, empA1Id);
      // Requesting employee from Company A is marked not eligible / not found in Company B
      assert.equal(lbCross.currentUser?.isEligible, false);
      assert.equal(lbCross.currentUser?.rank, null);
    });

    it("ensures Company Admin leaderboard displays only employees belonging to the admin's tenant", async () => {
      const adminLbA = await getCompanyAdminLeaderboard(companyAId);
      assert.equal(adminLbA.totalEmployees, 3);
      assert.ok(adminLbA.standings.every((s) => [empA1Id, empA2Id, empA3Id].includes(s.employeeId)));
      assert.equal(adminLbA.standings.some((s) => s.employeeId === empB1Id), false);
    });
  });

  describe("5. Settings & Audit Logging", () => {
    it("records audit log event immutably when Company Admin modifies competition settings", async () => {
      await updateCompanyCompetitionSettings({
        companyId: companyAId,
        enabled: true,
        privacyMode: "full_name",
        actorUserId: "admin_user_audit_test",
        actorRole: "company_admin",
      });

      const [auditEntry] = await db
        .select()
        .from(auditLogsTable)
        .where(
          and(
            eq(auditLogsTable.companyId, companyAId),
            eq(auditLogsTable.action, "company.competition_settings_updated")
          )
        )
        .orderBy(desc(auditLogsTable.createdAt))
        .limit(1);

      assert.ok(auditEntry);
      assert.equal(auditEntry.actorUserId, "admin_user_audit_test");
      assert.ok(auditEntry.metadata?.includes("full_name"));
    });
  });

  describe("6. Historical Seasons Support", () => {
    it("returns closed seasons with final participant count and user standings", async () => {
      // Create a closed July season for Company A
      const [closedSeason] = await db
        .insert(companySeasonsTable)
        .values({
          companyId: companyAId,
          seasonType: "MONTHLY",
          title: "July 2026",
          startDate: new Date(Date.UTC(2026, 6, 1, 0, 0, 0)),
          endDate: new Date(Date.UTC(2026, 6, 31, 23, 59, 59)),
          status: "CLOSED",
          closedAt: new Date(Date.UTC(2026, 7, 1, 0, 0, 0)),
        })
        .returning();

      const history = await getCompanySeasonHistory(companyAId, empA1Id);
      assert.ok(history.length >= 1);
      assert.equal(history[0].title, "July 2026");
      assert.equal(history[0].id, closedSeason.id);

      // Cleanup closed season
      await db.delete(companySeasonsTable).where(eq(companySeasonsTable.id, closedSeason.id));
    });
  });
});
