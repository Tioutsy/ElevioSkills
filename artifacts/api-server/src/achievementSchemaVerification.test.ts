import assert from "node:assert/strict";
import test from "node:test";
import { db, employeesTable, badgeDefinitionsTable, employeeBadgesTable, companySeasonsTable, companiesTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { verifyDatabaseIntegrity } from "./lib/verifyDatabaseIntegrity";

test("Achievement Schema Verification & Seasonal Badge Uniqueness Matrix", async (t) => {
  const runId = Math.floor(Math.random() * 1000000);

  // Setup test company & employee
  const [testCompany] = await db
    .insert(companiesTable)
    .values({
      name: `Schema Verify Corp ${runId}`,
      slug: `schema-verify-corp-${runId}`,
    } as any)
    .returning();

  const [testEmp] = await db
    .insert(employeesTable)
    .values({
      companyId: testCompany.id,
      name: `Badge Tester ${runId}`,
      email: `badge.tester.${runId}@example.com`,
      role: "learner",
      clerkUserId: `user_badge_${runId}`,
    } as any)
    .returning();

  // Create Seasonal & Non-Seasonal Badge Definitions
  const [seasonalBadge] = await db
    .insert(badgeDefinitionsTable)
    .values({
      code: `SEASONAL_TOP_3_${runId}`,
      slug: `seasonal-top-3-${runId}`,
      name: "Monthly Top 3",
      description: "Finished in Top 3 for the month",
      category: "Competition",
      criteriaType: "competition",
      isSeasonal: true,
    } as any)
    .returning();

  const [nonSeasonalBadge] = await db
    .insert(badgeDefinitionsTable)
    .values({
      code: `FIRST_STEP_${runId}`,
      slug: `first-step-${runId}`,
      name: "First Step",
      description: "Completed first course",
      category: "Learning",
      criteriaType: "learning",
      isSeasonal: false,
    } as any)
    .returning();

  // Create two distinct seasons
  const [seasonA] = await db
    .insert(companySeasonsTable)
    .values({
      companyId: testCompany.id,
      seasonNumber: 1,
      title: `Season A ${runId}`,
      startDate: new Date("2026-01-01T00:00:00Z"),
      endDate: new Date("2026-01-31T23:59:59Z"),
      status: "CLOSED",
    } as any)
    .returning();

  const [seasonB] = await db
    .insert(companySeasonsTable)
    .values({
      companyId: testCompany.id,
      seasonNumber: 2,
      title: `Season B ${runId}`,
      startDate: new Date("2026-02-01T00:00:00Z"),
      endDate: new Date("2026-02-28T23:59:59Z"),
      status: "ACTIVE",
    } as any)
    .returning();

  t.after(async () => {
    // Cleanup test artifacts
    await db.delete(employeeBadgesTable).where(eq(employeeBadgesTable.employeeId, testEmp.id));
    await db.delete(companySeasonsTable).where(eq(companySeasonsTable.companyId, testCompany.id));
    await db.delete(badgeDefinitionsTable).where(eq(badgeDefinitionsTable.id, seasonalBadge.id));
    await db.delete(badgeDefinitionsTable).where(eq(badgeDefinitionsTable.id, nonSeasonalBadge.id));
    await db.delete(employeesTable).where(eq(employeesTable.id, testEmp.id));
    await db.delete(companiesTable).where(eq(companiesTable.id, testCompany.id));
  });

  // 1. Valid non-seasonal partial unique index passes verification
  await t.test("Test 1: Valid non-seasonal partial unique index passes verification", async () => {
    const report = await verifyDatabaseIntegrity();
    const missingNonSeasonal = report.issues.find((i) => i.message.includes("Non-seasonal partial unique index"));
    assert.equal(missingNonSeasonal, undefined, "Non-seasonal partial unique index must be recognized as valid");
  });

  // 2. Valid seasonal partial unique index passes verification
  await t.test("Test 2: Valid seasonal partial unique index passes verification", async () => {
    const report = await verifyDatabaseIntegrity();
    const missingSeasonal = report.issues.find((i) => i.message.includes("Seasonal partial unique index"));
    assert.equal(missingSeasonal, undefined, "Seasonal partial unique index must be recognized as valid");
  });

  // 3. Missing non-seasonal uniqueness fails verification
  await t.test("Test 3: Missing non-seasonal uniqueness fails verification", async () => {
    // Temporarily drop non-seasonal unique index
    await db.execute(sql`DROP INDEX IF EXISTS uniq_employee_badge_non_seasonal;`);
    try {
      const report = await verifyDatabaseIntegrity();
      assert.equal(report.valid, false, "Verifier must fail when non-seasonal partial unique index is missing");
      const issue = report.issues.find((i) => i.message.includes("Non-seasonal partial unique index"));
      assert.ok(issue, "Issue describing missing non-seasonal partial index must be present");
    } finally {
      await db.execute(sql`
        CREATE UNIQUE INDEX IF NOT EXISTS "uniq_employee_badge_non_seasonal" 
        ON "employee_badges" ("employee_id", "badge_id") WHERE "season_id" IS NULL;
      `);
    }
  });

  // 4. Missing seasonal uniqueness fails verification
  await t.test("Test 4: Missing seasonal uniqueness fails verification", async () => {
    // Temporarily drop seasonal unique index
    await db.execute(sql`DROP INDEX IF EXISTS uniq_employee_badge_seasonal;`);
    try {
      const report = await verifyDatabaseIntegrity();
      assert.equal(report.valid, false, "Verifier must fail when seasonal partial unique index is missing");
      const issue = report.issues.find((i) => i.message.includes("Seasonal partial unique index"));
      assert.ok(issue, "Issue describing missing seasonal partial index must be present");
    } finally {
      await db.execute(sql`
        CREATE UNIQUE INDEX IF NOT EXISTS "uniq_employee_badge_seasonal" 
        ON "employee_badges" ("employee_id", "badge_id", "season_id") WHERE "season_id" IS NOT NULL;
      `);
    }
  });

  // 5. Obsolete global uniqueness is NOT required
  await t.test("Test 5: Obsolete global uniqueness (employee_id, badge_id) is NOT required for clean pass", async () => {
    const report = await verifyDatabaseIntegrity();
    assert.equal(report.valid, true, "Verifier must pass cleanly without unconditional UNIQUE(employee_id, badge_id)");
    const obsoleteIssue = report.issues.find((i) => i.message.includes("uniq_employee_badge"));
    assert.equal(obsoleteIssue, undefined, "No obsolete constraint issue should be reported");
  });

  // 6. Employee may hold the same seasonal badge in Season A and Season B
  await t.test("Test 6: Employee may hold the same seasonal badge in Season A and Season B", async () => {
    // Award in Season A
    const [awardSeasonA] = await db
      .insert(employeeBadgesTable)
      .values({
        employeeId: testEmp.id,
        companyId: testCompany.id,
        badgeId: seasonalBadge.id,
        seasonId: seasonA.id,
        awardSource: "seasonal_competition",
      })
      .returning();

    // Award same badge in Season B
    const [awardSeasonB] = await db
      .insert(employeeBadgesTable)
      .values({
        employeeId: testEmp.id,
        companyId: testCompany.id,
        badgeId: seasonalBadge.id,
        seasonId: seasonB.id,
        awardSource: "seasonal_competition",
      })
      .returning();

    assert.ok(awardSeasonA && awardSeasonB, "Both seasonal awards must succeed");
    assert.notEqual(awardSeasonA.id, awardSeasonB.id, "Awards must be distinct rows");

    // Verification must pass with both seasonal awards present
    const report = await verifyDatabaseIntegrity();
    assert.equal(report.valid, true, "Verifier must recognize recurring seasonal awards across distinct seasons as valid");
  });

  // 7. Duplicate seasonal badge within the same season is rejected
  await t.test("Test 7: Duplicate seasonal badge within the same season is rejected by database index", async () => {
    let duplicateRejected = false;
    try {
      await db.insert(employeeBadgesTable).values({
        employeeId: testEmp.id,
        companyId: testCompany.id,
        badgeId: seasonalBadge.id,
        seasonId: seasonA.id, // duplicate award in Season A
        awardSource: "seasonal_competition",
      });
    } catch (err: any) {
      duplicateRejected = true;
      const isUniqueError = err.cause?.code === "23505" || /unique|duplicate|violates/i.test(`${err.message} ${err.cause?.message || ""}`);
      assert.ok(isUniqueError, "PostgreSQL unique index error expected for duplicate seasonal badge");
    }
    assert.equal(duplicateRejected, true, "Duplicate badge in same season must be rejected by partial unique index");
  });

  // 8. Duplicate non-seasonal badge is rejected
  await t.test("Test 8: Duplicate non-seasonal badge (season_id = NULL) is rejected by database index", async () => {
    // Initial non-seasonal award
    await db.insert(employeeBadgesTable).values({
      employeeId: testEmp.id,
      companyId: testCompany.id,
      badgeId: nonSeasonalBadge.id,
      seasonId: null,
      awardSource: "course_completion",
    });

    let duplicateRejected = false;
    try {
      // Duplicate non-seasonal award
      await db.insert(employeeBadgesTable).values({
        employeeId: testEmp.id,
        companyId: testCompany.id,
        badgeId: nonSeasonalBadge.id,
        seasonId: null,
        awardSource: "course_completion",
      });
    } catch (err: any) {
      duplicateRejected = true;
      const isUniqueError = err.cause?.code === "23505" || /unique|duplicate|violates/i.test(`${err.message} ${err.cause?.message || ""}`);
      assert.ok(isUniqueError, "PostgreSQL unique index error expected for duplicate non-seasonal badge");
    }
    assert.equal(duplicateRejected, true, "Duplicate non-seasonal badge must be rejected by partial unique index");
  });
});
