import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable } from "@workspace/db";
import { inArray, notLike } from "drizzle-orm";
import { CANONICAL_BATCH_3_REGISTER, Batch3CourseRecord } from "./canonicalBatch3Register";

describe("Sprint 15.2.5 — Canonical Batch 3 Register Invariant Suite", () => {
  // Invariant 1: Exactly 87 unique Batch 3 course IDs
  test("Invariant 1: Exactly 87 unique Batch 3 course IDs", () => {
    const ids = CANONICAL_BATCH_3_REGISTER.map(c => c.id);
    const uniqueIds = new Set(ids);
    assert.equal(ids.length, 87, `Expected 87 records, received ${ids.length}`);
    assert.equal(uniqueIds.size, 87, `Expected 87 unique IDs, received ${uniqueIds.size}`);
  });

  // Invariant 2: Exactly 87 unique Batch 3 course codes
  test("Invariant 2: Exactly 87 unique Batch 3 course codes", () => {
    const codes = CANONICAL_BATCH_3_REGISTER.map(c => c.courseCode);
    const uniqueCodes = new Set(codes);
    assert.equal(codes.length, 87, `Expected 87 codes, received ${codes.length}`);
    assert.equal(uniqueCodes.size, 87, `Expected 87 unique codes, received ${uniqueCodes.size}`);
  });

  // Invariant 3: Every course is strictly D3 Applied level
  test("Invariant 3: Every course is strictly evidenced as D3 Applied level", () => {
    for (const c of CANONICAL_BATCH_3_REGISTER) {
      assert.equal(c.evidencedLevel, "D3", `Course ${c.courseCode} has unexpected level ${c.evidencedLevel}`);
    }
  });

  // Invariant 4: No Batch 1, Batch 2, D4 or consolidation-only course is included
  test("Invariant 4: Exclusion of Batch 1, Batch 2, D4, and consolidation courses", () => {
    const b1Codes = new Set([
      "ELH-01", "ELH-02", "ELH-07", "ELH-08", "ELH-09", "ELH-10", "ELH-11",
      "ELH-31", "ELH-32", "ELH-33", "ELH-34"
    ]);
    const b2Codes = new Set([
      "ELH-03", "ELH-04", "ELH-05", "ELH-06", "ELH-18", "ELH-24",
      "ELH-25", "ELH-26", "ELH-27", "ELH-28", "ELH-29", "ELH-30"
    ]);
    const d4Codes = new Set([
      "ELH-12", "ELH-131", "ELH-132", "ELH-134", "ELH-135", "ELH-136"
    ]);

    for (const c of CANONICAL_BATCH_3_REGISTER) {
      assert.ok(!b1Codes.has(c.courseCode), `Batch 1 course ${c.courseCode} detected in Batch 3 register`);
      assert.ok(!b2Codes.has(c.courseCode), `Batch 2 course ${c.courseCode} detected in Batch 3 register`);
      assert.ok(!d4Codes.has(c.courseCode), `D4 Strategic course ${c.courseCode} detected in Batch 3 register`);
    }
  });

  // Invariant 5: Wave 3A contains exactly 12 courses
  test("Invariant 5: Wave 3A contains exactly 12 courses", () => {
    const wave3A = CANONICAL_BATCH_3_REGISTER.filter(c => c.waveAssignment === "Wave 3A");
    assert.equal(wave3A.length, 12, `Expected 12 Wave 3A courses, found ${wave3A.length}`);
    const expectedWave3ACodes = [
      "ELH-13", "ELH-14", "ELH-15", "ELH-16",
      "ELH-21", "ELH-22", "ELH-117", "ELH-118",
      "ELH-121", "ELH-122", "ELH-128", "ELH-130"
    ];
    for (const code of expectedWave3ACodes) {
      assert.ok(wave3A.some(c => c.courseCode === code), `Missing Wave 3A course: ${code}`);
    }
  });

  // Invariant 6: Remaining Batch 3 courses equal exactly 75
  test("Invariant 6: Remaining Batch 3 courses equal exactly 75", () => {
    const nonWave3A = CANONICAL_BATCH_3_REGISTER.filter(c => c.waveAssignment !== "Wave 3A");
    assert.equal(nonWave3A.length, 75, `Expected 75 non-Wave-3A courses, found ${nonWave3A.length}`);
  });

  // Invariant 7: Every course has exactly one valid wave assignment
  test("Invariant 7: Every one of the 87 courses has exactly one valid wave assignment", () => {
    const validWaves = new Set(["Wave 3A", "Wave 3B", "Wave 3C", "Wave 3D", "Wave 3E"]);
    for (const c of CANONICAL_BATCH_3_REGISTER) {
      assert.ok(validWaves.has(c.waveAssignment), `Course ${c.courseCode} has invalid wave: ${c.waveAssignment}`);
    }
  });

  // Invariant 8: Database synchronization - IDs and codes must match live database
  test("Invariant 8: Database synchronization - IDs and codes match live database", async () => {
    const dbCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    for (const c of CANONICAL_BATCH_3_REGISTER) {
      const match = dbCourses.find(dbc => dbc.courseCode === c.courseCode);
      assert.ok(match, `Course ${c.courseCode} missing from live database`);
      assert.equal(match.id, c.id, `Course ID mismatch for ${c.courseCode}: register has ${c.id}, DB has ${match.id}`);
    }
  });
});
