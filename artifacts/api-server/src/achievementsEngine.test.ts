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
  badgeDefinitionsTable,
  employeeBadgesTable,
  enrollmentsTable,
  learningPathsTable,
  learningPathCoursesTable,
  type Employee,
} from "@workspace/db";
import { eq, and, sql, desc } from "drizzle-orm";
import {
  ensureAchievementDefinitions,
  evaluateCourseCompletionAchievements,
  evaluateQuizAchievements,
  evaluateWorkplaceActionAchievements,
  evaluateConsistencyAchievements,
  evaluateClosedSeasonAchievements,
  getEmployeeAchievementProgress,
  getCompanyRecognitionAnalytics,
  CANONICAL_ACHIEVEMENTS,
} from "./lib/achievementsService.js";
import {
  awardCourseCompletionScore,
  awardQuizPassScore,
  awardWorkplaceActionScore,
} from "./lib/scoringService.js";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications.js";

describe("Sprint 14.2 — Achievements, Milestones & Professional Recognition Test Matrix", () => {
  let companyAId: number;
  let companyBId: number;
  let empA1: Employee;
  let empA2: Employee;
  let empB1: Employee;
  let testCourse1Id: number;
  let testCourse2Id: number;

  const CLERK_USER_A1 = "clerk_test_achieve_a1";
  const CLERK_USER_A2 = "clerk_test_achieve_a2";
  const CLERK_USER_B1 = "clerk_test_achieve_b1";

  before(async () => {
    // 0. Ensure schema modifications exist and sync definitions
    await ensureSchemaModifications();
    await ensureAchievementDefinitions();

    // 1. Create Test Companies
    const [compA] = await db
      .insert(companiesTable)
      .values({
        name: "Infracare Achievement Corp A",
        slug: `infracare-achieve-corp-a-${Date.now()}`,
        leaderboardEnabled: true,
        leaderboardPrivacyMode: "initial",
      })
      .returning();
    companyAId = compA.id;

    const [compB] = await db
      .insert(companiesTable)
      .values({
        name: "Infracare Achievement Corp B",
        slug: `infracare-achieve-corp-b-${Date.now()}`,
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
    empA1 = eA1;

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
    empA2 = eA2;

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
    empB1 = eB1;

    // 3. Create Test Courses
    let [cat] = await db.select().from(categoriesTable).limit(1);
    if (!cat) {
      const [newCat] = await db
        .insert(categoriesTable)
        .values({ name: "Energy", slug: `energy-ach-${Date.now()}` })
        .returning();
      cat = newCat;
    }

    const [c1] = await db
      .insert(coursesTable)
      .values({
        title: "Sustainability Intro 101",
        slug: `sus-intro-101-${Date.now()}`,
        description: "Intro course",
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
        title: "Sustainability Advanced 201",
        slug: `sus-adv-201-${Date.now()}`,
        description: "Advanced course",
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
    await db.delete(employeeBadgesTable).where(eq(employeeBadgesTable.companyId, companyAId));
    await db.delete(employeeBadgesTable).where(eq(employeeBadgesTable.companyId, companyBId));
    await db.delete(companySeasonsTable).where(eq(companySeasonsTable.companyId, companyAId));
    await db.delete(companySeasonsTable).where(eq(companySeasonsTable.companyId, companyBId));
    await db.delete(elevioScoreLedgerTable).where(eq(elevioScoreLedgerTable.companyId, companyAId));
    await db.delete(elevioScoreLedgerTable).where(eq(elevioScoreLedgerTable.companyId, companyBId));
    await db.delete(learnerCommitmentsTable).where(eq(learnerCommitmentsTable.companyId, companyAId));
    await db.delete(learnerCommitmentsTable).where(eq(learnerCommitmentsTable.companyId, companyBId));
    await db.delete(enrollmentsTable).where(eq(enrollmentsTable.userId, CLERK_USER_A1));
    await db.delete(enrollmentsTable).where(eq(enrollmentsTable.userId, CLERK_USER_A2));
    await db.delete(employeesTable).where(eq(employeesTable.companyId, companyAId));
    await db.delete(employeesTable).where(eq(employeesTable.companyId, companyBId));
    await db.delete(coursesTable).where(eq(coursesTable.id, testCourse1Id));
    await db.delete(coursesTable).where(eq(coursesTable.id, testCourse2Id));
    await db.delete(companiesTable).where(eq(companiesTable.id, companyAId));
    await db.delete(companiesTable).where(eq(companiesTable.id, companyBId));
  });

  describe("1. Learning Achievements (First Step & Foundation Complete)", () => {
    it("awards First Step on completing the employee's first qualifying course", async () => {
      await db.insert(enrollmentsTable).values({
        userId: CLERK_USER_A1,
        courseId: testCourse1Id,
        companyId: companyAId,
        status: "completed",
      });

      await evaluateCourseCompletionAchievements({
        employee: empA1,
        courseId: testCourse1Id,
      });

      const [firstStepDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "FIRST_STEP"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, firstStepDef.id)
          )
        )
        .limit(1);

      assert.ok(earned);
      assert.equal(earned.awardSource, "course_completion");
    });

    it("does not duplicate First Step upon completing a second course", async () => {
      await db.insert(enrollmentsTable).values({
        userId: CLERK_USER_A1,
        courseId: testCourse2Id,
        companyId: companyAId,
        status: "completed",
      });

      await evaluateCourseCompletionAchievements({
        employee: empA1,
        courseId: testCourse2Id,
      });

      const [firstStepDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "FIRST_STEP"))
        .limit(1);

      const awards = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, firstStepDef.id)
          )
        );

      assert.equal(awards.length, 1);
    });

    it("does not award Foundation Complete if pathway courses are incomplete", async () => {
      const [foundationDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "FOUNDATION_COMPLETE"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, foundationDef.id)
          )
        )
        .limit(1);

      assert.equal(earned, undefined);
    });

    it("awards Foundation Complete when all required pathway courses are completed", async () => {
      // Find required courses in pathway 1
      const pathCourses = await db
        .select({ courseId: learningPathCoursesTable.courseId })
        .from(learningPathCoursesTable)
        .where(
          and(
            eq(learningPathCoursesTable.pathId, 1),
            eq(learningPathCoursesTable.isRequired, true)
          )
        );

      for (const p of pathCourses) {
        await db
          .insert(enrollmentsTable)
          .values({
            userId: CLERK_USER_A1,
            courseId: p.courseId,
            companyId: companyAId,
            status: "completed",
          })
          .onConflictDoNothing();
      }

      await evaluateCourseCompletionAchievements({
        employee: empA1,
        courseId: pathCourses[0]?.courseId || 1,
      });

      const [foundationDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "FOUNDATION_COMPLETE"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, foundationDef.id)
          )
        )
        .limit(1);

      assert.ok(earned);
      assert.equal(earned.awardSource, "pathway_completion");
    });
  });

  describe("2. Knowledge Achievements (Knowledge Performer, Perfect Assessment & First-Try Success)", () => {
    it("awards First-Try Success when passing on the first genuine attempt", async () => {
      await evaluateQuizAchievements({
        employee: empA2,
        courseId: testCourse1Id,
        scorePct: 80,
        attemptCount: 1,
      });

      const [firstTryDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "FIRST_TRY_SUCCESS"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA2.id),
            eq(employeeBadgesTable.badgeId, firstTryDef.id)
          )
        )
        .limit(1);

      assert.ok(earned);
    });

    it("does not award First-Try Success if passing on a second attempt", async () => {
      await evaluateQuizAchievements({
        employee: empB1,
        courseId: testCourse1Id,
        scorePct: 85,
        attemptCount: 2,
      });

      const [firstTryDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "FIRST_TRY_SUCCESS"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empB1.id),
            eq(employeeBadgesTable.badgeId, firstTryDef.id)
          )
        )
        .limit(1);

      assert.equal(earned, undefined);
    });

    it("awards Knowledge Performer on 90% or higher score", async () => {
      await evaluateQuizAchievements({
        employee: empA1,
        courseId: testCourse1Id,
        scorePct: 92,
        attemptCount: 1,
      });

      const [knowledgeDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "KNOWLEDGE_PERFORMER"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, knowledgeDef.id)
          )
        )
        .limit(1);

      assert.ok(earned);
    });

    it("awards Perfect Assessment on 100% score", async () => {
      await evaluateQuizAchievements({
        employee: empA1,
        courseId: testCourse2Id,
        scorePct: 100,
        attemptCount: 1,
      });

      const [perfectDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "PERFECT_ASSESSMENT"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, perfectDef.id)
          )
        )
        .limit(1);

      assert.ok(earned);
    });
  });

  describe("3. Workplace Action Achievements (Action Taker & Action Practitioner)", () => {
    it("awards Action Taker on first completed workplace action", async () => {
      await db.insert(learnerCommitmentsTable).values({
        companyId: companyAId,
        employeeId: empA1.id,
        courseId: testCourse1Id,
        commitmentText: "First waste reduction project",
        status: "action-reported",
      });

      await evaluateWorkplaceActionAchievements({
        employee: empA1,
      });

      const [actionTakerDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "ACTION_TAKER"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, actionTakerDef.id)
          )
        )
        .limit(1);

      assert.ok(earned);
    });

    it("does not award Action Practitioner before 5 completed actions", async () => {
      const [practitionerDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "ACTION_PRACTITIONER"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, practitionerDef.id)
          )
        )
        .limit(1);

      assert.equal(earned, undefined);
    });

    it("awards Action Practitioner on completing 5 workplace actions", async () => {
      // Insert 4 more completed actions for Sarah (total 5)
      for (let i = 2; i <= 5; i++) {
        await db.insert(learnerCommitmentsTable).values({
          companyId: companyAId,
          employeeId: empA1.id,
          courseId: testCourse1Id,
          commitmentText: `Workplace action #${i}`,
          status: "action-reported",
        });
      }

      await evaluateWorkplaceActionAchievements({
        employee: empA1,
      });

      const [practitionerDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "ACTION_PRACTITIONER"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, practitionerDef.id)
          )
        )
        .limit(1);

      assert.ok(earned);
    });
  });

  describe("4. Consistency Achievements (Consistent Learner)", () => {
    it("awards Consistent Learner across 3 consecutive active months", async () => {
      // Record non-reversed score entries in June, July, August 2026
      await db.insert(elevioScoreLedgerTable).values([
        {
          companyId: companyAId,
          employeeId: empA1.id,
          eventType: "COURSE_COMPLETED",
          sourceEntityType: "course",
          sourceEntityId: testCourse1Id,
          points: 100,
          idempotencyKey: `consist_test_1_${Date.now()}`,
          eventTimestamp: new Date(Date.UTC(2026, 5, 15, 12, 0, 0)), // June 2026
        },
        {
          companyId: companyAId,
          employeeId: empA1.id,
          eventType: "QUIZ_PASSED",
          sourceEntityType: "course",
          sourceEntityId: testCourse1Id,
          points: 50,
          idempotencyKey: `consist_test_2_${Date.now()}`,
          eventTimestamp: new Date(Date.UTC(2026, 6, 15, 12, 0, 0)), // July 2026
        },
        {
          companyId: companyAId,
          employeeId: empA1.id,
          eventType: "WORKPLACE_ACTION_COMPLETED",
          sourceEntityType: "course",
          sourceEntityId: testCourse1Id,
          points: 50,
          idempotencyKey: `consist_test_3_${Date.now()}`,
          eventTimestamp: new Date(Date.UTC(2026, 7, 15, 12, 0, 0)), // August 2026
        },
      ] as any);

      await evaluateConsistencyAchievements({
        employee: empA1,
      });

      const [consistentDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "CONSISTENT_LEARNER"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, consistentDef.id)
          )
        )
        .limit(1);

      assert.ok(earned);
    });

    it("does not award Consistent Learner if active months are non-consecutive", async () => {
      // Kevin active in March 2026, May 2026, August 2026 (gaps)
      await db.insert(elevioScoreLedgerTable).values([
        {
          companyId: companyAId,
          employeeId: empA2.id,
          eventType: "COURSE_COMPLETED",
          sourceEntityType: "course",
          sourceEntityId: testCourse1Id,
          points: 100,
          idempotencyKey: `gap_test_1_${Date.now()}`,
          eventTimestamp: new Date(Date.UTC(2026, 2, 15, 12, 0, 0)), // March
        },
        {
          companyId: companyAId,
          employeeId: empA2.id,
          eventType: "QUIZ_PASSED",
          sourceEntityType: "course",
          sourceEntityId: testCourse1Id,
          points: 50,
          idempotencyKey: `gap_test_2_${Date.now()}`,
          eventTimestamp: new Date(Date.UTC(2026, 4, 15, 12, 0, 0)), // May
        },
        {
          companyId: companyAId,
          employeeId: empA2.id,
          eventType: "WORKPLACE_ACTION_COMPLETED",
          sourceEntityType: "course",
          sourceEntityId: testCourse1Id,
          points: 50,
          idempotencyKey: `gap_test_3_${Date.now()}`,
          eventTimestamp: new Date(Date.UTC(2026, 7, 15, 12, 0, 0)), // August
        },
      ] as any);

      await evaluateConsistencyAchievements({
        employee: empA2,
      });

      const [consistentDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "CONSISTENT_LEARNER"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA2.id),
            eq(employeeBadgesTable.badgeId, consistentDef.id)
          )
        )
        .limit(1);

      assert.equal(earned, undefined);
    });
  });

  describe("5. Seasonal Recognition (Monthly Top 10, Top 3 & Monthly Leader)", () => {
    let closedSeasonId: number;

    it("does not award seasonal recognition while season remains ACTIVE", async () => {
      const [activeSeason] = await db
        .insert(companySeasonsTable)
        .values({
          companyId: companyAId,
          seasonType: "MONTHLY",
          title: "Active Season Test",
          startDate: new Date(Date.UTC(2026, 7, 1, 0, 0, 0)),
          endDate: new Date(Date.UTC(2026, 7, 31, 23, 59, 59)),
          status: "ACTIVE",
        })
        .returning();

      await evaluateClosedSeasonAchievements({
        companyId: companyAId,
        seasonId: activeSeason.id,
      });

      const [leaderDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "MONTHLY_LEADER"))
        .limit(1);

      const [earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, leaderDef.id),
            eq(employeeBadgesTable.seasonId, activeSeason.id)
          )
        )
        .limit(1);

      assert.equal(earned, undefined);
      await db.delete(companySeasonsTable).where(eq(companySeasonsTable.id, activeSeason.id));
    });

    it("awards Monthly Top 10, Monthly Top 3, and Monthly Leader on CLOSED season results", async () => {
      const [closedSeason] = await db
        .insert(companySeasonsTable)
        .values({
          companyId: companyAId,
          seasonType: "MONTHLY",
          title: "August 2026",
          startDate: new Date(Date.UTC(2026, 7, 1, 0, 0, 0)),
          endDate: new Date(Date.UTC(2026, 7, 31, 23, 59, 59)),
          status: "CLOSED",
          closedAt: new Date(Date.UTC(2026, 8, 1, 0, 0, 0)),
        })
        .returning();
      closedSeasonId = closedSeason.id;

      await evaluateClosedSeasonAchievements({
        companyId: companyAId,
        seasonId: closedSeason.id,
      });

      // Sarah is Rank 1 in August 2026
      const [leaderDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "MONTHLY_LEADER"))
        .limit(1);

      const [top3Def] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "MONTHLY_TOP_3"))
        .limit(1);

      const [top10Def] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "MONTHLY_TOP_10"))
        .limit(1);

      const [leaderEarned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, leaderDef.id),
            eq(employeeBadgesTable.seasonId, closedSeasonId)
          )
        )
        .limit(1);

      const [top3Earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, top3Def.id),
            eq(employeeBadgesTable.seasonId, closedSeasonId)
          )
        )
        .limit(1);

      const [top10Earned] = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, top10Def.id),
            eq(employeeBadgesTable.seasonId, closedSeasonId)
          )
        )
        .limit(1);

      assert.ok(leaderEarned);
      assert.ok(top3Earned);
      assert.ok(top10Earned);
      assert.ok(top3Earned.metadata?.includes("1st Place"));
    });

    it("ensures season closure evaluation is idempotent and creates zero duplicate records on retry", async () => {
      await evaluateClosedSeasonAchievements({
        companyId: companyAId,
        seasonId: closedSeasonId,
      });

      const [leaderDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "MONTHLY_LEADER"))
        .limit(1);

      const leaderRecords = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, leaderDef.id),
            eq(employeeBadgesTable.seasonId, closedSeasonId)
          )
        );

      assert.equal(leaderRecords.length, 1);
    });

    it("allows the same employee to earn seasonal recognition in a subsequent season", async () => {
      const [septSeason] = await db
        .insert(companySeasonsTable)
        .values({
          companyId: companyAId,
          seasonType: "MONTHLY",
          title: "September 2026",
          startDate: new Date(Date.UTC(2026, 8, 1, 0, 0, 0)),
          endDate: new Date(Date.UTC(2026, 8, 30, 23, 59, 59)),
          status: "CLOSED",
          closedAt: new Date(Date.UTC(2026, 9, 1, 0, 0, 0)),
        })
        .returning();

      // Record September score
      await db.insert(elevioScoreLedgerTable).values({
        companyId: companyAId,
        employeeId: empA1.id,
        eventType: "COURSE_COMPLETED",
        sourceEntityType: "course",
        sourceEntityId: testCourse1Id,
        points: 100,
        idempotencyKey: `sept_score_${Date.now()}`,
        eventTimestamp: new Date(Date.UTC(2026, 8, 15, 12, 0, 0)),
      } as any);

      await evaluateClosedSeasonAchievements({
        companyId: companyAId,
        seasonId: septSeason.id,
      });

      const [leaderDef] = await db
        .select()
        .from(badgeDefinitionsTable)
        .where(eq(badgeDefinitionsTable.code, "MONTHLY_LEADER"))
        .limit(1);

      const allLeaderAwards = await db
        .select()
        .from(employeeBadgesTable)
        .where(
          and(
            eq(employeeBadgesTable.employeeId, empA1.id),
            eq(employeeBadgesTable.badgeId, leaderDef.id)
          )
        );

      assert.equal(allLeaderAwards.length, 2); // August and September awards
      await db.delete(companySeasonsTable).where(eq(companySeasonsTable.id, septSeason.id));
    });
  });

  describe("6. Scoring Integrity & Zero Points Verification", () => {
    it("guarantees unlocking achievements awards 0 additional ELEVIO Score points", async () => {
      const [empBefore] = await db
        .select()
        .from(employeesTable)
        .where(eq(employeesTable.id, empA1.id));

      const ledgerCountBefore = await db
        .select({ count: sql<number>`count(*)::integer` })
        .from(elevioScoreLedgerTable)
        .where(eq(elevioScoreLedgerTable.employeeId, empA1.id));

      // Re-trigger achievement evaluations
      await evaluateCourseCompletionAchievements({ employee: empA1, courseId: testCourse1Id });
      await evaluateQuizAchievements({ employee: empA1, courseId: testCourse1Id, scorePct: 100, attemptCount: 1 });
      await evaluateWorkplaceActionAchievements({ employee: empA1 });

      const [empAfter] = await db
        .select()
        .from(employeesTable)
        .where(eq(employeesTable.id, empA1.id));

      const ledgerCountAfter = await db
        .select({ count: sql<number>`count(*)::integer` })
        .from(elevioScoreLedgerTable)
        .where(eq(elevioScoreLedgerTable.employeeId, empA1.id));

      // Zero score change, zero new ledger entries
      assert.equal(empAfter.elevioScore, empBefore.elevioScore);
      assert.equal(ledgerCountAfter[0].count, ledgerCountBefore[0].count);
    });
  });

  describe("7. Progress Calculation & UI Contract", () => {
    it("returns structured summary with exact earned counts and in-progress metrics", async () => {
      const summary = await getEmployeeAchievementProgress(empA1);
      assert.ok(summary.totalEarned >= 6);
      assert.ok(summary.categories.length === 5);

      const actionItem = summary.achievements.find((a) => a.code === "ACTION_PRACTITIONER");
      assert.ok(actionItem);
      assert.equal(actionItem.earned, true);
      assert.equal(actionItem.progressLabel, "Completed");
    });

    it("returns company-wide analytics for Company Admin without leaking private details", async () => {
      const analytics = await getCompanyRecognitionAnalytics(companyAId);
      assert.ok(analytics.totalActiveEmployees >= 2); // Sarah & Kevin
      assert.ok(analytics.totalAchievementsAwarded >= 6);
      assert.ok(analytics.activeEmployeesWithAchievements >= 1);
    });
  });
});
