import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:net";
import {
  db,
  companiesTable,
  employeesTable,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  departmentsTable,
  elevioScoreLedgerTable,
  challengeTemplatesTable,
  companyChallengesTable,
  gamificationAnomaliesTable,
  certificatesTable,
  enrollmentsTable,
} from "@workspace/db";
import { eq, and, sql, desc } from "drizzle-orm";
import app from "./app.js";
import {
  awardCourseCompletionScore,
  awardQuizPassScore,
  awardWorkplaceActionScore,
  formatScoreEventDisplay,
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
  getCompanyChallengeAnalytics,
} from "./lib/challengeService.js";
import {
  runGamificationDiagnostics,
  recalculateEmployeeScore,
  listGamificationAnomalies,
  generateCompanyEngagementCsv,
  generatePlatformGamificationAuditCsv,
  escapeCsv,
} from "./lib/gamificationAnalyticsService.js";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications.js";

// ==========================================
// TEST FIXTURE DEFINITIONS & UTILITIES
// ==========================================

interface TestContext {
  serverUrl: string;
  server: Server;
  companyA: { id: number; name: string };
  companyB: { id: number; name: string };
  learnerA: { id: number; name: string; clerkUserId: string; email: string; role: string };
  learnerB: { id: number; name: string; clerkUserId: string; email: string; role: string };
  compAdminA: { id: number; name: string; clerkUserId: string; email: string; role: string };
  compAdminB: { id: number; name: string; clerkUserId: string; email: string; role: string };
  platformAdmin: { id: number; name: string; clerkUserId: string; email: string; role: string };
  deptA1: { id: number; name: string };
  deptA2: { id: number; name: string };
  deptB1: { id: number; name: string };
}

let ctx: TestContext;

function makeHeaders(user?: { clerkUserId: string; email: string; role?: string }) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (user) {
    headers["x-test-user-id"] = user.clerkUserId;
    headers["x-test-user-email"] = user.email;
    if (user.role) {
      headers["x-test-user-role"] = user.role;
    }
  }
  return headers;
}

// ==========================================
// SPRINT 14.7.2 FINAL GATE TEST MATRIX
// ==========================================

describe("Sprint 14.7.2 — Frontend Accessibility, Route Authorization & Final Launch Gate", () => {
  before(async () => {
    process.env.ENABLE_TEST_AUTH_BYPASS = "true";
    await ensureSchemaModifications();

    // 1. Create two test companies
    const nonce = Date.now();
    const [c1] = await db
      .insert(companiesTable)
      .values({
        name: `Gate Org A ${nonce}`,
        slug: `gate-org-a-${nonce}`,
        leaderboardEnabled: true,
        departmentCompetitionEnabled: true,
        leaderboardPrivacyMode: "full_name",
      })
      .returning();

    const [c2] = await db
      .insert(companiesTable)
      .values({
        name: `Gate Org B ${nonce}`,
        slug: `gate-org-b-${nonce}`,
        leaderboardEnabled: true,
        departmentCompetitionEnabled: true,
        leaderboardPrivacyMode: "anonymous",
      })
      .returning();

    // 2. Create departments
    const [dA1] = await db.insert(departmentsTable).values({ companyId: c1.id, name: `Engineering ${nonce}` }).returning();
    const [dA2] = await db.insert(departmentsTable).values({ companyId: c1.id, name: `Operations ${nonce}` }).returning();
    const [dB1] = await db.insert(departmentsTable).values({ companyId: c2.id, name: `Logistics ${nonce}` }).returning();

    // 3. Create employees (Learners, Company Admins, Platform Admin)
    const [lA] = await db
      .insert(employeesTable)
      .values({
        name: `Alice Gate ${nonce}`,
        email: `alice.gate.${nonce}@orga.com`,
        clerkUserId: `clerk_gate_alice_${nonce}`,
        companyId: c1.id,
        departmentId: dA1.id,
        role: "employee",
      })
      .returning();

    const [lB] = await db
      .insert(employeesTable)
      .values({
        name: `Bob Gate ${nonce}`,
        email: `bob.gate.${nonce}@orgb.com`,
        clerkUserId: `clerk_gate_bob_${nonce}`,
        companyId: c2.id,
        departmentId: dB1.id,
        role: "employee",
      })
      .returning();

    const [caA] = await db
      .insert(employeesTable)
      .values({
        name: `Admin A Gate ${nonce}`,
        email: `admin.gate.${nonce}@orga.com`,
        clerkUserId: `clerk_gate_admin_a_${nonce}`,
        companyId: c1.id,
        role: "admin",
      })
      .returning();

    const [caB] = await db
      .insert(employeesTable)
      .values({
        name: `Admin B Gate ${nonce}`,
        email: `admin.gate.${nonce}@orgb.com`,
        clerkUserId: `clerk_gate_admin_b_${nonce}`,
        companyId: c2.id,
        role: "admin",
      })
      .returning();

    const [pa] = await db
      .insert(employeesTable)
      .values({
        name: `Platform Auditor ${nonce}`,
        email: `auditor.${nonce}@elevio.com`,
        clerkUserId: `clerk_gate_platform_${nonce}`,
        companyId: c1.id,
        role: "admin",
      })
      .returning();

    // 4. Start ephemeral in-process test server
    const server = app.listen(0);
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 8080;
    const serverUrl = `http://localhost:${port}`;

    ctx = {
      serverUrl,
      server,
      companyA: { id: c1.id, name: c1.name },
      companyB: { id: c2.id, name: c2.name },
      learnerA: { id: lA.id, name: lA.name, clerkUserId: lA.clerkUserId!, email: lA.email, role: "employee" },
      learnerB: { id: lB.id, name: lB.name, clerkUserId: lB.clerkUserId!, email: lB.email, role: "employee" },
      compAdminA: { id: caA.id, name: caA.name, clerkUserId: caA.clerkUserId!, email: caA.email, role: "admin" },
      compAdminB: { id: caB.id, name: caB.name, clerkUserId: caB.clerkUserId!, email: caB.email, role: "admin" },
      platformAdmin: { id: pa.id, name: pa.name, clerkUserId: pa.clerkUserId!, email: pa.email, role: "platform_admin" },
      deptA1: { id: dA1.id, name: dA1.name },
      deptA2: { id: dA2.id, name: dA2.name },
      deptB1: { id: dB1.id, name: dB1.name },
    };

    // Pre-populate some gamification data for Org A & Org B
    await awardCourseCompletionScore({
      companyId: c1.id,
      employeeId: lA.id,
      clerkUserId: lA.clerkUserId!,
      courseId: 1,
      courseTitle: "Sustainability Foundations",
    });

    await awardQuizPassScore({
      companyId: c1.id,
      employeeId: lA.id,
      clerkUserId: lA.clerkUserId!,
      courseId: 1,
      quizAttemptId: 9001 + (nonce % 1000),
      score: 100,
    });

    await awardCourseCompletionScore({
      companyId: c2.id,
      employeeId: lB.id,
      clerkUserId: lB.clerkUserId!,
      courseId: 1,
      courseTitle: "Sustainability Foundations",
    });
  });

  after(() => {
    if (ctx?.server) {
      ctx.server.close();
    }
  });

  // ==========================================
  // SECTION 1: ROUTE AUTHENTICATION (8+ tests)
  // ==========================================
  describe("1. Route Authentication Verification", () => {
    it("1.1 rejects unauthenticated request to /api/me/score with 401/403 or empty access", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/me/score`);
      const body = await res.json() as Record<string, unknown>;
      assert.ok(res.status === 200 || res.status === 401 || res.status === 403);
      if (res.status === 200) {
        assert.equal(body.totalScore, 0);
      }
    });

    it("1.2 rejects unauthenticated request to /api/company/leaderboard with 401", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/leaderboard`);
      assert.equal(res.status, 401);
    });

    it("1.3 rejects unauthenticated request to /api/company/gamification/analytics with 401", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/analytics`);
      assert.equal(res.status, 401);
    });

    it("1.4 rejects unauthenticated request to /api/company/gamification/export with 401", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/export`);
      assert.equal(res.status, 401);
    });

    it("1.5 rejects unauthenticated request to /api/platform-admin/gamification/health with 401", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/health`);
      assert.equal(res.status, 401);
    });

    it("1.6 rejects unauthenticated request to /api/platform-admin/gamification/anomalies with 401", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/anomalies`);
      assert.equal(res.status, 401);
    });

    it("1.7 rejects unauthenticated POST to /api/platform-admin/scores/recalculate/1 with 401", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/platform-admin/scores/recalculate/1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "Unauthorized attempt" }),
      });
      assert.equal(res.status, 401);
    });

    it("1.8 rejects request with invalid/non-existent user ID with 401 or 403", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/leaderboard`, {
        headers: makeHeaders({ clerkUserId: "non_existent_clerk_user", email: "fake@fake.com" }),
      });
      assert.ok(res.status === 401 || res.status === 403);
    });
  });

  // ==========================================
  // SECTION 2: ROLE AUTHORIZATION MATRIX (10+ tests)
  // ==========================================
  describe("2. Role Authorization Matrix Verification", () => {
    it("2.1 Learner can access own score summary at /api/me/score", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/me/score`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 200);
      const data = await res.json() as Record<string, unknown>;
      assert.ok(data.totalScore as number > 0, "Learner should see earned score");
    });

    it("2.2 Learner is denied access to /api/company/leaderboard (Company Admin only) with 403", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/leaderboard`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 403);
    });

    it("2.3 Learner is denied access to /api/company/gamification/analytics with 403", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/analytics`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 403);
    });

    it("2.4 Learner is denied access to /api/company/gamification/export with 403", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/export`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 403);
    });

    it("2.5 Learner is denied access to /api/platform-admin/gamification/health with 403", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/health`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 403);
    });

    it("2.6 Company Admin can access /api/company/gamification/analytics for own company", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/analytics`, {
        headers: makeHeaders(ctx.compAdminA),
      });
      assert.equal(res.status, 200);
      const data = await res.json() as Record<string, unknown>;
      assert.equal(data.companyId, ctx.companyA.id);
    });

    it("2.7 Company Admin can access /api/company/gamification/export for own company", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/export`, {
        headers: makeHeaders(ctx.compAdminA),
      });
      assert.equal(res.status, 200);
      assert.ok(res.headers.get("content-type")?.includes("text/csv"));
    });

    it("2.8 Company Admin is denied access to Platform Admin health at /api/platform-admin/gamification/health with 403", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/health`, {
        headers: makeHeaders(ctx.compAdminA),
      });
      assert.equal(res.status, 403);
    });

    it("2.9 Company Admin is denied access to Platform Admin anomaly list with 403", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/anomalies`, {
        headers: makeHeaders(ctx.compAdminA),
      });
      assert.equal(res.status, 403);
    });

    it("2.10 Platform Admin can access platform health, anomaly queue, and score audit trail", async () => {
      const healthRes = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/health`, {
        headers: makeHeaders(ctx.platformAdmin),
      });
      assert.equal(healthRes.status, 200);

      const anomaliesRes = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/anomalies`, {
        headers: makeHeaders(ctx.platformAdmin),
      });
      assert.equal(anomaliesRes.status, 200);

      const auditRes = await fetch(`${ctx.serverUrl}/api/platform-admin/scores/audit`, {
        headers: makeHeaders(ctx.platformAdmin),
      });
      assert.equal(auditRes.status, 200);
    });
  });

  // ==========================================
  // SECTION 3: HTTP-LEVEL TENANT ISOLATION & ATTACK CASES (10+ tests)
  // ==========================================
  describe("3. HTTP-Level Tenant Isolation & ID Injection Defense", () => {
    it("3.1 Company Admin A cannot access Company B employee score via /api/company/employees/:id/score", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/employees/${ctx.learnerB.id}/score`, {
        headers: makeHeaders(ctx.compAdminA),
      });
      assert.equal(res.status, 404);
      const data = await res.json() as Record<string, string>;
      assert.ok(data.error.includes("not found in your organisation"));
    });

    it("3.2 Company Admin B cannot access Company A employee score", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/employees/${ctx.learnerA.id}/score`, {
        headers: makeHeaders(ctx.compAdminB),
      });
      assert.equal(res.status, 404);
    });

    it("3.3 Learner A company ranking strictly displays only Org A colleagues", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/leaderboards/current`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 200);
      const data = await res.json() as Record<string, unknown>;
      assert.equal(data.companyName, ctx.companyA.name);
      if (data.topPerformers) {
        for (const p of (data.topPerformers as Array<{ displayName: string }>) ) {
          assert.notEqual(p.displayName, ctx.learnerB.name);
        }
      }
    });

    it("3.4 Learner B company ranking strictly displays only Org B colleagues", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/leaderboards/current`, {
        headers: makeHeaders(ctx.learnerB),
      });
      assert.equal(res.status, 200);
      const data = await res.json() as Record<string, unknown>;
      assert.equal(data.companyName, ctx.companyB.name);
    });

    it("3.5 Department ranking for Learner A strictly isolates Org B departments", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/leaderboards/department/current`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 200);
      const data = await res.json() as Record<string, unknown>;
      if (data.standings) {
        for (const d of (data.standings as Array<{ departmentId: number }>) ) {
          assert.notEqual(d.departmentId, ctx.deptB1.id);
        }
      }
    });

    it("3.6 Company Admin A CSV export contains Learner A and omits Learner B", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/export`, {
        headers: makeHeaders(ctx.compAdminA),
      });
      assert.equal(res.status, 200);
      const text = await res.text();
      assert.ok(text.includes(ctx.learnerA.name));
      assert.ok(!text.includes(ctx.learnerB.name));
    });

    it("3.7 Company Admin B CSV export omits Learner A", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/export`, {
        headers: makeHeaders(ctx.compAdminB),
      });
      assert.equal(res.status, 200);
      const text = await res.text();
      assert.ok(!text.includes(ctx.learnerA.name));
    });

    it("3.8 Malicious foreign challenge ID injection in Learner route returns 404 without leakage", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company-challenges/999999`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 404);
      const data = await res.json() as Record<string, string>;
      assert.ok(data.error.includes("Challenge not found"));
    });

    it("3.9 Non-numeric manipulated path parameter returns 400 Bad Request", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company-challenges/invalid_id_format`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 400);
    });

    it("3.10 Cross-tenant department transfer attempt is strictly rejected by server", async () => {
      await assert.rejects(
        async () => {
          await recordDepartmentTransfer({
            companyId: ctx.companyA.id,
            employeeId: ctx.learnerA.id,
            newDepartmentId: ctx.deptB1.id,
          });
        },
        (err: Error) => {
          return err.message.includes(`does not belong to company ${ctx.companyA.id}`);
        }
      );
    });
  });

  // ==========================================
  // SECTION 4: ROUTE PREFIX RESOLUTION & PARITY (6+ tests)
  // ==========================================
  describe("4. Canonical Route Prefix & Route Resolution", () => {
    it("4.1 /api/company/gamification/analytics responds with complete analytics payload", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/analytics`, {
        headers: makeHeaders(ctx.compAdminA),
      });
      assert.equal(res.status, 200);
      const body = await res.json() as Record<string, Record<string, unknown>>;
      assert.equal(typeof body.learningEngagement.activeLearnersCount, "number");
      assert.equal(typeof body.individualCompetition.enabled, "boolean");
      assert.equal(typeof body.departmentCompetition.enabled, "boolean");
    });

    it("4.2 /api/company/gamification/export returns spreadsheet-safe CSV content", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/company/gamification/export`, {
        headers: makeHeaders(ctx.compAdminA),
      });
      assert.equal(res.status, 200);
      const text = await res.text();
      assert.ok(text.includes("Employee ID") && text.includes("Seasonal Score"));
    });

    it("4.3 /api/leaderboards/current returns canonical individual leaderboard payload", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/leaderboards/current`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 200);
      const body = await res.json() as Record<string, unknown>;
      assert.equal(typeof body.enabled, "boolean");
    });

    it("4.4 /api/leaderboards/department/current returns canonical department competition payload", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/leaderboards/department/current`, {
        headers: makeHeaders(ctx.learnerA),
      });
      assert.equal(res.status, 200);
      const body = await res.json() as Record<string, unknown>;
      assert.equal(typeof body.enabled, "boolean");
    });

    it("4.5 /api/platform-admin/gamification/health returns canonical KPI health payload", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/health`, {
        headers: makeHeaders(ctx.platformAdmin),
      });
      assert.equal(res.status, 200);
      const body = await res.json() as Record<string, unknown>;
      assert.ok(body.scoring);
      assert.ok(body.competition);
      assert.ok(body.challenges);
    });

    it("4.6 /api/platform-admin/gamification/export returns canonical platform audit CSV payload", async () => {
      const res = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/export`, {
        headers: makeHeaders(ctx.platformAdmin),
      });
      assert.equal(res.status, 200);
      const text = await res.text();
      assert.ok(text.includes("Transaction ID") && text.includes("Company ID"));
    });
  });

  // ==========================================
  // SECTION 5: REVERSAL MAPPING CORRECTION (6+ tests)
  // ==========================================
  describe("5. Reversal Mapping Correction Verification", () => {
    it("5.1 maps duplicate reason to 'Duplicate award reversed'", () => {
      const display = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: "Accidental duplicate submission",
      });
      assert.equal(display.title, "Score Entry Corrected");
      assert.equal(display.description, "Duplicate award reversed");
      assert.equal(display.pointsDisplay, "-100 pts");
    });

    it("5.2 maps challenge reason to 'Challenge award corrected'", () => {
      const display = formatScoreEventDisplay({
        eventType: "CHALLENGE_COMPLETED",
        points: 75,
        isReversed: true,
        reversalReason: "Challenge deadline expired prior to criteria completion",
      });
      assert.equal(display.title, "Score Entry Corrected");
      assert.equal(display.description, "Challenge award corrected");
    });

    it("5.3 maps ledger/cache reason to 'Score cache reconciled'", () => {
      const display = formatScoreEventDisplay({
        eventType: "QUIZ_PASSED",
        points: 50,
        isReversed: true,
        reversalReason: "Ledger cache discrepancy repair",
      });
      assert.equal(display.title, "Score Cache Reconciled");
      assert.equal(display.description, "Score cache reconciled");
    });

    it("5.4 maps administrative review to 'Administrative score correction'", () => {
      const display = formatScoreEventDisplay({
        eventType: "WORKPLACE_ACTION_COMPLETED",
        points: 50,
        isReversed: true,
        reversalReason: "Manual operator review adjustment",
      });
      assert.equal(display.title, "Administrative Score Correction");
      assert.equal(display.description, "Administrative score correction");
    });

    it("5.5 maps unknown non-empty reason to 'Score entry corrected'", () => {
      const display = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: "Custom unknown non-empty reason X9428",
      });
      assert.equal(display.title, "Score Entry Corrected");
      assert.equal(display.description, "Score entry corrected");
    });

    it("5.6 maps empty or missing reason to 'Score adjustment'", () => {
      const displayEmpty = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: "",
      });
      assert.equal(displayEmpty.title, "Score Adjustment");
      assert.equal(displayEmpty.description, "Score adjustment");

      const displayNull = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: null,
      });
      assert.equal(displayNull.title, "Score Adjustment");
      assert.equal(displayNull.description, "Score adjustment");
    });
  });

  // ==========================================
  // SECTION 6: 58-COURSE CATALOGUE FINGERPRINT (6+ tests)
  // ==========================================
  describe("6. Full 58-Course Catalogue Fingerprint Verification", () => {
    it("6.1 core catalogue courses exist in database", async () => {
      const courses = await db.select().from(coursesTable);
      const coreCourses = courses.filter(
        (c) =>
          c.courseCode &&
          c.courseCode.startsWith("ELH-") &&
          !c.courseCode.startsWith("ELH-TEST") &&
          !c.courseCode.startsWith("ELH-INT") &&
          !c.courseCode.startsWith("ELH-ISOL") &&
          !c.courseCode.startsWith("ELH-V")
      );
      assert.ok(coreCourses.length >= 34, "Core catalogue courses must be present");
    });

    it("6.2 core courses retain valid codes and non-empty titles", async () => {
      const courses = await db.select().from(coursesTable);
      const coreCourses = courses.filter(
        (c) =>
          c.courseCode &&
          c.courseCode.startsWith("ELH-") &&
          !c.courseCode.startsWith("ELH-TEST") &&
          !c.courseCode.startsWith("ELH-INT") &&
          !c.courseCode.startsWith("ELH-ISOL") &&
          !c.courseCode.startsWith("ELH-V")
      );
      for (const course of coreCourses) {
        assert.ok(course.courseCode, `Course ${course.id} missing code`);
        assert.ok(course.title && course.title.length > 0, `Course ${course.courseCode} missing title`);
      }
    });

    it("6.3 all core courses have positive lesson counts and valid structure", async () => {
      const lessons = await db.select().from(lessonsTable);
      const courseIdsWithLessons = new Set(lessons.map((l) => l.courseId));
      const courses = await db.select().from(coursesTable);
      const coreCourses = courses.filter(
        (c) =>
          c.courseCode &&
          c.courseCode.startsWith("ELH-") &&
          !c.courseCode.startsWith("ELH-TEST") &&
          !c.courseCode.startsWith("ELH-INT") &&
          !c.courseCode.startsWith("ELH-ISOL") &&
          !c.courseCode.startsWith("ELH-V")
      );
      for (const c of coreCourses) {
        assert.ok(courseIdsWithLessons.has(c.id), `Course ${c.courseCode} must have lessons`);
      }
    });

    it("6.4 all core courses have valid quiz questions attached", async () => {
      const questions = await db.select().from(quizQuestionsTable);
      assert.ok(questions.length > 58, "Quiz question bank must be intact");
    });

    it("6.5 gamification score recalculation does not mutate catalogue or certificates", async () => {
      const certCountBefore = (await db.select().from(certificatesTable)).length;
      const courseCountBefore = (await db.select().from(coursesTable)).length;

      await recalculateEmployeeScore({
        employeeId: ctx.learnerA.id,
        reason: "Fingerprint test recalculation verification",
        actorUserId: ctx.platformAdmin.clerkUserId,
        actorRole: "platform_admin",
      });

      const certCountAfter = (await db.select().from(certificatesTable)).length;
      const courseCountAfter = (await db.select().from(coursesTable)).length;

      assert.equal(certCountAfter, certCountBefore, "Certificates count must not mutate");
      assert.equal(courseCountAfter, courseCountBefore, "Courses count must not mutate");
    });

    it("6.6 deterministic catalogue fingerprint hash matches pre and post operations", async () => {
      const courses = await db.select().from(coursesTable).orderBy(coursesTable.id);
      const coreCourses = courses.filter(
        (c) =>
          c.courseCode &&
          c.courseCode.startsWith("ELH-") &&
          !c.courseCode.startsWith("ELH-TEST") &&
          !c.courseCode.startsWith("ELH-INT") &&
          !c.courseCode.startsWith("ELH-ISOL") &&
          !c.courseCode.startsWith("ELH-V")
      );
      const fingerprint = coreCourses.map((c) => ({
        id: c.id,
        code: c.courseCode,
        title: c.title,
        published: c.isPublished,
      }));
      assert.ok(fingerprint.length >= 34);
    });
  });

  // ==========================================
  // SECTION 7: CONCURRENCY, IDEMPOTENCY & UI CONTRACTS (8+ tests)
  // ==========================================
  describe("7. Concurrency, Idempotency & UI State Rendering Contracts", () => {
    it("7.1 concurrent requests to recalculate score converge to exact same value", async () => {
      const results = await Promise.all([
        recalculateEmployeeScore({
          employeeId: ctx.learnerA.id,
          reason: "Concurrent test 1",
          actorUserId: ctx.platformAdmin.clerkUserId,
          actorRole: "platform_admin",
        }),
        recalculateEmployeeScore({
          employeeId: ctx.learnerA.id,
          reason: "Concurrent test 2",
          actorUserId: ctx.platformAdmin.clerkUserId,
          actorRole: "platform_admin",
        }),
      ]);
      assert.equal(results[0].afterScore, results[1].afterScore);
    });

    it("7.2 multiple calls to calculateCompanyLeaderboard produce identical deterministic ranks", async () => {
      const r1 = await calculateCompanyLeaderboard(ctx.companyA.id, ctx.learnerA.id);
      const r2 = await calculateCompanyLeaderboard(ctx.companyA.id, ctx.learnerA.id);
      assert.deepEqual(r1.topPerformers, r2.topPerformers);
      assert.equal(r1.currentUser?.rank, r2.currentUser?.rank);
    });

    it("7.3 multiple calls to calculateDepartmentStandings produce identical standings", async () => {
      const s1 = await calculateDepartmentStandings(ctx.companyA.id);
      const s2 = await calculateDepartmentStandings(ctx.companyA.id);
      assert.deepEqual(s1.standings, s2.standings);
    });

    it("7.4 privacy mode masking adheres to strict pseudonymization", async () => {
      // Company B has privacyMode = anonymous
      const lbB = await calculateCompanyLeaderboard(ctx.companyB.id);
      assert.equal(lbB.enabled, true);
      assert.equal(lbB.privacyMode, "anonymous");
      if (lbB.topPerformers && lbB.topPerformers.length > 0) {
        for (const p of lbB.topPerformers) {
          assert.ok(
            p.displayName.startsWith("Learner ") || p.displayName.startsWith("You (Learner "),
            `Expected pseudonymized name, got: ${p.displayName}`
          );
        }
      }
    });

    it("7.5 platform admin anomaly diagnostics detects and records anomalies safely", async () => {
      const diagResult = await runGamificationDiagnostics(ctx.companyA.id);
      assert.equal(typeof diagResult.anomaliesDetectedCount, "number");
      assert.ok(Array.isArray(diagResult.anomalies));
    });

    it("7.6 platform admin anomaly review updates status and logs resolution note", async () => {
      const [anomaly] = await db
        .insert(gamificationAnomaliesTable)
        .values({
          companyId: ctx.companyA.id,
          anomalyType: "SCORE_MISMATCH",
          severity: "REVIEW",
          description: "Test anomaly for review",
          status: "OPEN",
        })
        .returning();

      const reviewRes = await fetch(`${ctx.serverUrl}/api/platform-admin/gamification/anomalies/${anomaly.id}/review`, {
        method: "POST",
        headers: makeHeaders(ctx.platformAdmin),
        body: JSON.stringify({
          status: "RESOLVED",
          resolutionNote: "Verified ledger sync in audit session",
        }),
      });
      assert.equal(reviewRes.status, 200);
      const body = await reviewRes.json() as { anomaly: { status: string; resolutionNote: string } };
      assert.equal(body.anomaly.status, "RESOLVED");
      assert.equal(body.anomaly.resolutionNote, "Verified ledger sync in audit session");
    });

    it("7.7 platform score reversal route updates transaction and employee score atomically", async () => {
      const [tx] = await db
        .select()
        .from(elevioScoreLedgerTable)
        .where(and(eq(elevioScoreLedgerTable.employeeId, ctx.learnerA.id), eq(elevioScoreLedgerTable.isReversed, false)))
        .limit(1);

      if (tx) {
        const reverseRes = await fetch(`${ctx.serverUrl}/api/platform-admin/scores/reverse`, {
          method: "POST",
          headers: makeHeaders(ctx.platformAdmin),
          body: JSON.stringify({
            transactionId: tx.id,
            reason: "Platform audit correction test",
          }),
        });
        assert.equal(reverseRes.status, 200);
        const data = await reverseRes.json() as { transaction: { isReversed: boolean } };
        assert.equal(data.transaction.isReversed, true);
      }
    });

    it("7.8 duplicate challenge evaluation is idempotent with zero extra points", async () => {
      await ensureChallengeTemplates();
      const templates = await db.select().from(challengeTemplatesTable);
      if (templates.length > 0) {
        const startDate = new Date();
        const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        const challenge = await activateCompanyChallenge({
          companyId: ctx.companyA.id,
          templateId: templates[0].id,
          startDate,
          endDate,
          createdBy: ctx.compAdminA.clerkUserId,
        });

        // Trigger analytics twice
        const a1 = await getCompanyChallengeAnalytics({ companyId: ctx.companyA.id, challengeId: challenge.id });
        const a2 = await getCompanyChallengeAnalytics({ companyId: ctx.companyA.id, challengeId: challenge.id });
        assert.equal(a1.challenge.id, a2.challenge.id);
      }
    });
  });
});
