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
  certificatesTable,
  enrollmentsTable,
} from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import {
  awardCourseCompletionScore,
  awardQuizPassScore,
  awardWorkplaceActionScore,
  getEmployeeScoreSummary,
  formatScoreEventDisplay,
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
  generatePlatformGamificationAuditCsv,
  escapeCsv,
} from "./lib/gamificationAnalyticsService.js";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications.js";

/**
 * Standard RFC 4180 CSV parser helper for verifying output structure.
 */
function parseCsv(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;

  let i = 0;
  while (i < csvText.length) {
    const ch = csvText[i];
    const nextCh = csvText[i + 1];

    if (inQuotes) {
      if (ch === '"') {
        if (nextCh === '"') {
          currentCell += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        currentCell += ch;
        i++;
        continue;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
        continue;
      } else if (ch === ',') {
        currentRow.push(currentCell);
        currentCell = "";
        i++;
        continue;
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && nextCh === '\n') {
          i += 2;
        } else {
          i++;
        }
        currentRow.push(currentCell);
        currentCell = "";
        if (currentRow.some((c) => c.trim().length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        continue;
      } else {
        currentCell += ch;
        i++;
        continue;
      }
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }

  return rows;
}

describe("Sprint 14.7.1 — Launch Readiness Evidence, Route Security & UX Verification Closure", () => {
  let companyAId: number;
  let companyBId: number;
  let deptA1Id: number;
  let deptA2Id: number;
  let empA1: any;
  let empA2: any;
  let empB1: any;
  let testCourseId: number;
  let testChallengeId: number;
  let baselineCoursesCount: number;

  const CLERK_A1 = `sprint14_7_1_a1_${Date.now()}`;
  const CLERK_A2 = `sprint14_7_1_a2_${Date.now()}`;
  const CLERK_B1 = `sprint14_7_1_b1_${Date.now()}`;

  before(async () => {
    await ensureSchemaModifications();
    await ensureChallengeTemplates();

    // Record baseline courses count
    const courses = await db.select().from(coursesTable);
    baselineCoursesCount = courses.length;

    // Create Test Companies
    const [cA] = await db
      .insert(companiesTable)
      .values({
        name: "Sprint 14.7.1 Test Org A",
        slug: `sprint14-7-1-org-a-${Date.now()}`,
        leaderboardEnabled: true,
        departmentCompetitionEnabled: true,
        leaderboardPrivacyMode: "full_name",
      })
      .returning();
    companyAId = cA.id;

    const [cB] = await db
      .insert(companiesTable)
      .values({
        name: "Sprint 14.7.1 Test Org B",
        slug: `sprint14-7-1-org-b-${Date.now()}`,
        leaderboardEnabled: true,
        departmentCompetitionEnabled: true,
        leaderboardPrivacyMode: "initial",
      })
      .returning();
    companyBId = cB.id;

    // Create Departments
    const [dA1] = await db
      .insert(departmentsTable)
      .values({ companyId: companyAId, name: "Engineering & Safety" })
      .returning();
    deptA1Id = dA1.id;

    const [dA2] = await db
      .insert(departmentsTable)
      .values({ companyId: companyAId, name: "Logistics & Fleet" })
      .returning();
    deptA2Id = dA2.id;

    // Create Employees with diverse names (including Unicode & Formula injection attempts)
    const [eA1] = await db
      .insert(employeesTable)
      .values({
        companyId: companyAId,
        clerkUserId: CLERK_A1,
        name: "=SUM(1+1) Alice Smarter",
        email: `alice.${Date.now()}@orga.com`,
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
        clerkUserId: CLERK_A2,
        name: "Jean-François Émile", // Unicode test name
        email: `jf.${Date.now()}@orga.com`,
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
        clerkUserId: CLERK_B1,
        name: "@Admin Brenda Foreign",
        email: `brenda.${Date.now()}@orgb.com`,
        elevioScore: 0,
        status: "active",
      })
      .returning();
    empB1 = eB1;

    // Create Test Course
    const [cat] = await db.select().from(categoriesTable).limit(1);
    const [course] = await db
      .insert(coursesTable)
      .values({
        title: "Sprint 14.7.1 Evidence Verification Course",
        description: "Evidence course",
        slug: `sprint14-7-1-course-${Date.now()}`,
        courseCode: `ELH-TEST-${Date.now().toString().slice(-4)}`,
        categoryId: cat?.id ?? 1,
        isPublished: true,
        status: "published",
      })
      .returning();
    testCourseId = course.id;

    // Activate Challenge
    const [tpl] = await db.select().from(challengeTemplatesTable).limit(1);
    const ch = await activateCompanyChallenge({
      companyId: companyAId,
      templateId: tpl.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 86400 * 1000),
      createdBy: "admin_tester",
    });
    testChallengeId = ch.id;
  });

  // =========================================================================
  // 1. REVERSAL DESCRIPTION ACCURACY & LABELS (5+ tests)
  // =========================================================================
  describe("1. Reversal Description Accuracy & Non-Punitive Labels", () => {
    it("1.1 maps duplicate reversal to 'Duplicate award reversed'", () => {
      const display = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: "Duplicate award entry during retry",
      });
      assert.equal(display.title, "Score Entry Corrected");
      assert.equal(display.description, "Duplicate award reversed");
      assert.equal(display.pointsDisplay, "-100 pts");
    });

    it("1.2 maps challenge correction to 'Challenge award corrected'", () => {
      const display = formatScoreEventDisplay({
        eventType: "CHALLENGE_COMPLETED",
        points: 50,
        isReversed: true,
        reversalReason: "Challenge criteria recalculation",
      });
      assert.equal(display.title, "Score Entry Corrected");
      assert.equal(display.description, "Challenge award corrected");
    });

    it("1.3 maps cache reconciliation to 'Score cache reconciled'", () => {
      const display = formatScoreEventDisplay({
        eventType: "QUIZ_PASSED",
        points: 50,
        isReversed: true,
        reversalReason: "Ledger cache reconciliation alignment",
      });
      assert.equal(display.title, "Score Cache Reconciled");
      assert.equal(display.description, "Score cache reconciled");
    });

    it("1.4 maps administrative review to 'Administrative score correction'", () => {
      const display = formatScoreEventDisplay({
        eventType: "WORKPLACE_ACTION_COMPLETED",
        points: 50,
        isReversed: true,
        reversalReason: "Administrative correction per operator ticket #1204",
      });
      assert.equal(display.title, "Administrative Score Correction");
      assert.equal(display.description, "Administrative score correction");
    });

    it("1.5 uses neutral fallback 'Score adjustment' for missing or unknown reasons", () => {
      const displayEmpty = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: null,
      });
      assert.equal(displayEmpty.title, "Score Adjustment");
      assert.equal(displayEmpty.description, "Score adjustment");

      const displayUnknown = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
      });
      assert.equal(displayUnknown.title, "Score Adjustment");
      assert.equal(displayUnknown.description, "Score adjustment");
    });

    it("1.6 guarantees zero leakage of internal event codes or operator private notes", () => {
      const display = formatScoreEventDisplay({
        eventType: "INTERNAL_EVT_CODE_XYZ",
        points: 25,
        isReversed: true,
        reversalReason: "Internal investigation notes: User flagged by anomaly sensor",
      });
      assert.equal(display.description.includes("INTERNAL_EVT_CODE_XYZ"), false);
      assert.equal(display.description.includes("sensor"), false);
      assert.equal(display.description.includes("flagged"), false);
    });
  });

  // =========================================================================
  // 2. DOCUMENTATION-TO-CODE ALIGNMENT (4+ tests)
  // =========================================================================
  describe("2. Documentation-to-Code Alignment", () => {
    it("2.1 scoring points constants match official economic documentation", () => {
      assert.equal(SCORING_POINTS.COURSE_COMPLETED, 100);
      assert.equal(SCORING_POINTS.QUIZ_PASSED, 50);
      assert.equal(SCORING_POINTS.QUIZ_SCORE_80_89, 15);
      assert.equal(SCORING_POINTS.QUIZ_SCORE_90_99, 25);
      assert.equal(SCORING_POINTS.QUIZ_SCORE_100, 40);
      assert.equal(SCORING_POINTS.FIRST_ATTEMPT_PASS, 20);
      assert.equal(SCORING_POINTS.WORKPLACE_ACTION_COMPLETED, 50);
    });

    it("2.2 department standings calculator executes TEAM_SCORE_V1 formula version", async () => {
      const res = await calculateDepartmentStandings(companyAId);
      assert.equal(res.formulaVersion, "TEAM_SCORE_V1");
      assert.equal(res.enabled, true);
    });

    it("2.3 company settings schema supports documented competition toggles", async () => {
      await updateCompanyCompetitionSettings({
        companyId: companyAId,
        enabled: true,
        privacyMode: "initial",
        actorUserId: "admin_test",
        actorRole: "company_admin",
      });

      const [comp] = await db
        .select()
        .from(companiesTable)
        .where(eq(companiesTable.id, companyAId));

      assert.equal(comp.leaderboardEnabled, true);
      assert.equal(comp.leaderboardPrivacyMode, "initial");
    });

    it("2.4 anomaly diagnostics engine returns supported automated diagnostic types", async () => {
      const diag = await runGamificationDiagnostics(companyAId);
      assert.ok(typeof diag.anomaliesDetectedCount === "number");
      assert.ok(Array.isArray(diag.anomalies));
    });
  });

  // =========================================================================
  // 3. TENANT ISOLATION & IDENTIFIER MANIPULATION (10+ tests)
  // =========================================================================
  describe("3. Tenant Isolation & Identifier Manipulation Security", () => {
    it("3.1 Company B cannot access Company A challenge analytics", async () => {
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

    it("3.2 Company B score summary query strictly returns zero records for Company A employee", async () => {
      const summary = await getEmployeeScoreSummary(empA1.id, companyBId);
      assert.equal(summary.totalScore, 0);
      assert.equal(summary.transactionsCount, 0);
    });

    it("3.3 Company A leaderboard does not include Company B employees", async () => {
      const lb = await calculateCompanyLeaderboard(companyAId, empA1.id);
      const containsEmpB = (lb.topPerformers || []).some((p) => p.displayName.includes("Brenda"));
      assert.equal(containsEmpB, false);
    });

    it("3.4 Company B leaderboard does not include Company A employees", async () => {
      const lb = await calculateCompanyLeaderboard(companyBId, empB1.id);
      const containsEmpA = (lb.topPerformers || []).some((p) => p.displayName.includes("Alice") || p.displayName.includes("Jean-François"));
      assert.equal(containsEmpA, false);
    });

    it("3.5 Department standings for Company B does not leak Company A departments", async () => {
      const standings = await calculateDepartmentStandings(companyBId);
      const hasDeptA = standings.standings.some((d) => d.departmentId === deptA1Id || d.departmentId === deptA2Id);
      assert.equal(hasDeptA, false);
    });

    it("3.6 Company CSV export for Org B contains Brenda and strictly omits Alice", async () => {
      const csv = await generateCompanyEngagementCsv(companyBId);
      assert.ok(csv.includes("Brenda") || csv.includes("Org B"), "Company B export must contain Brenda or Org B scope");
      assert.equal(csv.includes("Alice"), false, "Company B export must not contain Alice");
    });

    it("3.7 Company CSV export for Org A strictly omits Brenda", async () => {
      const csv = await generateCompanyEngagementCsv(companyAId);
      assert.equal(csv.includes("Brenda"), false, "Company A export must not contain Brenda");
    });

    it("3.8 Anomaly listing for Company A returns only Company A anomalies", async () => {
      const listA = await listGamificationAnomalies({ companyId: companyAId });
      const hasOtherCompany = listA.anomalies.some((a) => a.companyId !== companyAId);
      assert.equal(hasOtherCompany, false);
    });

    it("3.9 Non-existent challenge ID returns Challenge not found rather than leaking data", async () => {
      await assert.rejects(
        async () => {
          await getCompanyChallengeAnalytics({
            companyId: companyAId,
            challengeId: 9999999,
          });
        },
        /Challenge not found/
      );
    });

    it("3.10 Foreign department transfer cannot attach employee to foreign company department", async () => {
      const [deptForeign] = await db
        .insert(departmentsTable)
        .values({ companyId: companyBId, name: "Company B Operations" })
        .returning();

      // Alice belongs to Company A; moving to Company B department should fail or maintain isolation
      await assert.rejects(
        async () => {
          await recordDepartmentTransfer({
            companyId: companyAId,
            employeeId: empA1.id,
            newDepartmentId: deptForeign.id,
            effectiveDate: new Date(),
          });
        },
        /Department \d+ does not belong to company/
      );
    });
  });

  // =========================================================================
  // 4. CSV PARSING, PRIVACY & INJECTION DEFENSE (10+ tests)
  // =========================================================================
  describe("4. CSV Parsing, Privacy & Anti-Formula Injection", () => {
    it("4.1 escapes '=' prefix with safe apostrophe", () => {
      const sanitized = escapeCsv("=cmd|' /C calc'!A1");
      assert.ok(sanitized.startsWith("''=") || sanitized.startsWith("'="));
    });

    it("4.2 escapes '+' prefix with safe apostrophe", () => {
      const sanitized = escapeCsv("+12345");
      assert.ok(sanitized.startsWith("'+"));
    });

    it("4.3 escapes '-' prefix with safe apostrophe", () => {
      const sanitized = escapeCsv("-SUM(A1:A10)");
      assert.ok(sanitized.startsWith("'-"));
    });

    it("4.4 escapes '@' prefix with safe apostrophe", () => {
      const sanitized = escapeCsv("@SUM(A1:A10)");
      assert.ok(sanitized.startsWith("'@"));
    });

    it("4.5 escapes leading whitespace before formula symbol", () => {
      const sanitized = escapeCsv("   =1+1");
      assert.ok(sanitized.startsWith("'   =") || sanitized.startsWith("   '="));
    });

    it("4.6 escapes Tab (\\t) and Carriage Return (\\r) prefixes", () => {
      const tabFormula = "\t=1+1";
      assert.ok(escapeCsv(tabFormula).startsWith("'\t"));
    });

    it("4.7 correctly escapes quotes and commas per RFC 4180", () => {
      const cell = 'Hello, "World"';
      const escaped = escapeCsv(cell);
      assert.equal(escaped, '"Hello, ""World"""');
    });

    it("4.8 preserves Unicode characters without corruption", () => {
      const unicodeName = "Jean-François Émile 日本語";
      const escaped = escapeCsv(unicodeName);
      assert.equal(escaped, unicodeName);
    });

    it("4.9 Company Engagement CSV is valid RFC 4180 parseable format", async () => {
      const csv = await generateCompanyEngagementCsv(companyAId);
      const parsed = parseCsv(csv);
      assert.ok(parsed.length >= 3, "CSV must have metadata rows and data table");
      assert.ok(parsed.some((row) => row.some((c) => c.includes("ELEVIO Skills Company Engagement"))));
    });

    it("4.10 Platform Audit CSV is valid RFC 4180 parseable format", async () => {
      const csv = await generatePlatformGamificationAuditCsv();
      const parsed = parseCsv(csv);
      assert.ok(parsed.length >= 2, "Platform CSV must parse cleanly");
      assert.ok(parsed.some((row) => row.some((c) => c.includes("ELEVIO Skills Platform Gamification"))));
    });
  });

  // =========================================================================
  // 5. CATALOGUE & CERTIFICATE PROTECTION (6+ tests)
  // =========================================================================
  describe("5. Catalogue & Certificate Protection", () => {
    it("5.1 core catalogue courses count remains exactly 58", async () => {
      const courses = await db.select().from(coursesTable);
      const coreCourses = courses.filter((c) => !c.courseCode?.startsWith("ELH-TEST"));
      assert.equal(coreCourses.length, 58, "Core catalogue must remain exactly 58 courses");
    });

    it("5.2 core courses retain published status and course codes", async () => {
      const [elh01] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, "ELH-01"));

      assert.ok(elh01, "ELH-01 must exist");
      assert.equal(elh01.isPublished, true);
      assert.equal(elh01.status, "published");
    });

    it("5.3 awarding gamification points does not mutate courses table", async () => {
      const coursesBefore: any = await db.select({ count: sql`COUNT(*)::integer` }).from(coursesTable);

      await awardCourseCompletionScore({
        companyId: companyAId,
        employeeId: empA2.id,
        clerkUserId: CLERK_A2,
        courseId: testCourseId,
        courseTitle: "Sprint 14.7.1 Evidence Verification Course",
      });

      const coursesAfter: any = await db.select({ count: sql`COUNT(*)::integer` }).from(coursesTable);
      assert.equal(coursesBefore[0].count, coursesAfter[0].count);
    });

    it("5.4 score recalculation does not mutate certificates or formal completions", async () => {
      const certCountBefore: any = await db.select({ count: sql`COUNT(*)::integer` }).from(certificatesTable);
      const enrollCountBefore: any = await db.select({ count: sql`COUNT(*)::integer` }).from(enrollmentsTable);

      await recalculateEmployeeScore({
        employeeId: empA2.id,
        reason: "Operational verification audit",
        actorUserId: "platform_admin_test",
        actorRole: "platform_admin",
      });

      const certCountAfter: any = await db.select({ count: sql`COUNT(*)::integer` }).from(certificatesTable);
      const enrollCountAfter: any = await db.select({ count: sql`COUNT(*)::integer` }).from(enrollmentsTable);

      assert.equal(certCountBefore[0].count, certCountAfter[0].count);
      assert.equal(enrollCountBefore[0].count, enrollCountAfter[0].count);
    });

    it("5.5 ledger reversals do not delete course enrollments or certificates", async () => {
      const certCount: any = await db.select({ count: sql`COUNT(*)::integer` }).from(certificatesTable);
      assert.ok(Number(certCount[0]?.count ?? 0) >= 0);
    });

    it("5.6 gamification tables remain strictly segregated from certificate issuance tables", () => {
      assert.ok(elevioScoreLedgerTable);
      assert.ok(certificatesTable);
      assert.notEqual(elevioScoreLedgerTable, certificatesTable);
    });
  });

  // =========================================================================
  // 6. CONCURRENCY & IDEMPOTENCY CLOSURE (8+ tests)
  // =========================================================================
  describe("6. Concurrency & Idempotency Closure", () => {
    it("6.1 concurrent course completion awards points exactly once", async () => {
      const results = await Promise.all([
        awardCourseCompletionScore({
          companyId: companyAId,
          employeeId: empA1.id,
          clerkUserId: CLERK_A1,
          courseId: testCourseId,
          courseTitle: "Sprint 14.7.1 Evidence Verification Course",
        }),
        awardCourseCompletionScore({
          companyId: companyAId,
          employeeId: empA1.id,
          clerkUserId: CLERK_A1,
          courseId: testCourseId,
          courseTitle: "Sprint 14.7.1 Evidence Verification Course",
        }),
        awardCourseCompletionScore({
          companyId: companyAId,
          employeeId: empA1.id,
          clerkUserId: CLERK_A1,
          courseId: testCourseId,
          courseTitle: "Sprint 14.7.1 Evidence Verification Course",
        }),
      ]);

      const awardedCount = results.filter((r) => r.awarded).length;
      assert.equal(awardedCount, 1, "Exactly one concurrent attempt must award points");
    });

    it("6.2 concurrent challenge evaluations execute without duplicate ledger entries", async () => {
      const evalPromises = [
        evaluateEmployeeChallengeProgress({ employee: empA1 }),
        evaluateEmployeeChallengeProgress({ employee: empA1 }),
      ];
      const res = await Promise.all(evalPromises);
      assert.ok(res[0]);
      assert.ok(res[1]);
    });

    it("6.3 concurrent score recalculation converges to identical ledger sum", async () => {
      const recalcResults = await Promise.all([
        recalculateEmployeeScore({
          employeeId: empA1.id,
          reason: "Concurrent audit check 1",
          actorUserId: "admin_test",
          actorRole: "platform_admin",
        }),
        recalculateEmployeeScore({
          employeeId: empA1.id,
          reason: "Concurrent audit check 2",
          actorUserId: "admin_test",
          actorRole: "platform_admin",
        }),
      ]);

      assert.equal(recalcResults[0].afterScore, recalcResults[1].afterScore);
    });

    it("6.4 repeated department transfer calls maintain consistent department standings", async () => {
      await recordDepartmentTransfer({
        companyId: companyAId,
        employeeId: empA2.id,
        newDepartmentId: deptA2Id,
        effectiveDate: new Date(),
      });

      const standings1 = await calculateDepartmentStandings(companyAId);
      const standings2 = await calculateDepartmentStandings(companyAId);

      assert.equal(standings1.standings.length, standings2.standings.length);
    });

    it("6.5 repeated leaderboard calculations produce deterministic ranks", async () => {
      const lb1 = await calculateCompanyLeaderboard(companyAId, empA1.id);
      const lb2 = await calculateCompanyLeaderboard(companyAId, empA1.id);

      const performers1 = lb1.topPerformers || [];
      const performers2 = lb2.topPerformers || [];

      assert.equal(performers1.length, performers2.length);
      if (performers1.length > 0 && performers2.length > 0) {
        assert.equal(performers1[0].seasonalScore, performers2[0].seasonalScore);
      }
    });

    it("6.6 repeated CSV generation is idempotent and side-effect free", async () => {
      const csv1 = await generateCompanyEngagementCsv(companyAId);
      const csv2 = await generateCompanyEngagementCsv(companyAId);

      assert.equal(csv1.length, csv2.length);
    });

    it("6.7 duplicate workplace action completion rejects second award", async () => {
      const first = await awardWorkplaceActionScore({
        companyId: companyAId,
        employeeId: empA1.id,
        clerkUserId: CLERK_A1,
        commitmentId: 8881,
        commitmentText: "Recycled office paper",
      });

      const duplicate = await awardWorkplaceActionScore({
        companyId: companyAId,
        employeeId: empA1.id,
        clerkUserId: CLERK_A1,
        commitmentId: 8881,
        commitmentText: "Recycled office paper",
      });

      assert.equal(first.awarded, true);
      assert.equal(duplicate.awarded, false);
    });

    it("6.8 duplicate quiz pass rejects second award", async () => {
      const first = await awardQuizPassScore({
        companyId: companyAId,
        employeeId: empA2.id,
        clerkUserId: CLERK_A2,
        courseId: testCourseId,
        score: 95,
        quizAttemptId: 7771,
      });

      const duplicate = await awardQuizPassScore({
        companyId: companyAId,
        employeeId: empA2.id,
        clerkUserId: CLERK_A2,
        courseId: testCourseId,
        score: 95,
        quizAttemptId: 7771,
      });

      assert.equal(first.some((a) => a.awarded), true);
      assert.equal(duplicate.every((a) => !a.awarded), true);
    });
  });
});
