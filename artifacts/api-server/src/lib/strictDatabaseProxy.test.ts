import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, employeesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

describe("Priority 2: Strict Database Mock Proxy & Mutation Integrity", () => {
  test("1. Reject misspelled or invalid database root methods", () => {
    assert.throws(
      () => {
        (db as any).selct();
      },
      /\[Strict DB Proxy\] Invalid or misspelled db method 'selct' called\./
    );
  });

  test("2. Reject misspelled or invalid chained query methods", () => {
    assert.throws(
      () => {
        (db.select().from(coursesTable) as any).whre(eq(coursesTable.id, 1));
      },
      /\[Strict DB Proxy\] Invalid or misspelled query method 'whre' called\./
    );
  });

  test("3. Valid select queries with filters resolve cleanly", async () => {
    const result = await db
      .select()
      .from(employeesTable)
      .where(and(eq(employeesTable.companyId, 10), eq(employeesTable.status, "active")))
      .limit(5);

    assert.ok(Array.isArray(result), "Result must be an array");
  });

  test("4. Insert with .values() and .returning() preserves payload values", async () => {
    const payload = {
      title: "New ESG Course",
      slug: "new-esg-course",
      description: "Test description",
      categoryId: 1,
      durationMinutes: 45,
    };

    const inserted = await db
      .insert(coursesTable)
      .values(payload)
      .returning({ id: coursesTable.id, title: coursesTable.title });

    assert.ok(Array.isArray(inserted));
    assert.equal(inserted.length, 1);
    assert.equal(inserted[0].title, "New ESG Course");
    assert.ok(inserted[0].id > 0);
  });

  test("5. Conflict handling chains (.onConflictDoNothing / .onConflictDoUpdate) resolve cleanly", async () => {
    const result = await db
      .insert(coursesTable)
      .values({ title: "Test Course", slug: "test-course", description: "Test description", categoryId: 1 })
      .onConflictDoNothing()
      .returning({ id: coursesTable.id });

    assert.ok(Array.isArray(result));
    assert.ok(result.length > 0);
  });

  test("6. Transaction callback executes and passes database instance", async () => {
    let executedInTx = false;
    await db.transaction(async (tx: any) => {
      const res = await tx.select().from(coursesTable).limit(1);
      assert.ok(Array.isArray(res));
      executedInTx = true;
    });

    assert.equal(executedInTx, true, "Transaction callback must execute");
  });
});
