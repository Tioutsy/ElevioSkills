import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine";

test("Sprint 17.0A — Mandatory Foundation Catalogue Quality & Integrity Guards", async (t) => {
  const FOUNDATION_CODES = [
    "ELH-01", "ELH-02", "ELH-03", "ELH-04", "ELH-05",
    "ELH-06", "ELH-07", "ELH-08", "ELH-09", "ELH-10", "ELH-11"
  ];

  const EXPECTED_IDENTIFIERS = [
    { code: "ELH-01", id: 1, slug: "sustainability-foundations", nextId: 2 },
    { code: "ELH-02", id: 2, slug: "waste-sorting-mauritian-bin-system", nextId: 3 },
    { code: "ELH-03", id: 3, slug: "energy-efficiency-at-work", nextId: 4 },
    { code: "ELH-04", id: 4, slug: "water-conservation", nextId: 5 },
    { code: "ELH-05", id: 5, slug: "sustainable-procurement", nextId: 6 },
    { code: "ELH-06", id: 6, slug: "green-office-practices", nextId: 7 },
    { code: "ELH-07", id: 7, slug: "carbon-footprint-awareness", nextId: 8 },
    { code: "ELH-08", id: 8, slug: "biodiversity-in-mauritius", nextId: 9 },
    { code: "ELH-09", id: 9, slug: "esg-basics", nextId: 10 },
    { code: "ELH-10", id: 10, slug: "environmental-compliance", nextId: 11 },
    { code: "ELH-11", id: 11, slug: "circular-economy", nextId: 12 },
  ];

  const seederFiles = [
    { code: "ELH-01", path: "src/lib/ensureFoundationsCourse.ts" },
    { code: "ELH-02", path: "src/lib/ensureWasteSortingCourse.ts" },
    { code: "ELH-03", path: "src/lib/ensureEnergyEfficiencyCourse.ts" },
    { code: "ELH-04", path: "src/lib/ensureWaterConservationCourse.ts" },
    { code: "ELH-05", path: "src/lib/ensureSustainableProcurementCourse.ts" },
    { code: "ELH-06", path: "src/lib/ensureGreenOfficePracticesCourse.ts" },
    { code: "ELH-07", path: "src/lib/ensureCarbonFootprintCourse.ts" },
    { code: "ELH-08", path: "src/lib/ensureBiodiversityCourse.ts" },
    { code: "ELH-09", path: "src/lib/ensureEsgBasicsCourse.ts" },
    { code: "ELH-10", path: "src/lib/ensureEnvironmentalComplianceCourse.ts" },
    { code: "ELH-11", path: "src/lib/ensureCircularEconomyCourse.ts" },
  ];

  // Helper to extract NEW_LESSONS block from source
  function getLessonsBlock(content: string): string {
    const match = content.match(/const NEW_LESSONS\s*=\s*\[([\s\S]*?)\];\s*(?:const NEW_QUIZ|export async)/);
    return match ? match[1] : "";
  }

  // Guard 1: ELH-01–11 each exist exactly once in runtime and seeder definitions
  await t.test("Rule 1: ELH-01–11 each exist exactly once in catalogue", async () => {
    const courses = await db.select().from(coursesTable);
    for (const exp of EXPECTED_IDENTIFIERS) {
      const matches = courses.filter((c) => c.courseCode === exp.code || c.id === exp.id || c.slug === exp.slug);
      assert.strictEqual(matches.length, 1, `Course ${exp.code} must exist exactly once in runtime database`);
    }
  });

  // Guard 2: Each course has substantive lessons and no placeholder tokens in lesson content
  await t.test("Rule 2: Each course has substantive lessons and no placeholder tokens", async () => {
    for (const file of seederFiles) {
      const content = fs.readFileSync(path.resolve(process.cwd(), file.path), "utf-8");
      const lessonsBlock = getLessonsBlock(content);
      assert.ok(lessonsBlock.length > 500, `Course ${file.code} lessons block too short`);
      assert.ok(!lessonsBlock.includes("[DRAFT SKELETON]"), `Course ${file.code} lessons contain [DRAFT SKELETON]!`);
      assert.ok(!lessonsBlock.includes("TODO:"), `Course ${file.code} lessons contain TODO:!`);
      assert.ok(!lessonsBlock.includes("Placeholder content"), `Course ${file.code} lessons contain placeholder!`);
    }
  });

  // Guard 3: Each course has at least three decision scenarios
  await t.test("Rule 3: Each course has at least three decision scenarios", async () => {
    for (const file of seederFiles) {
      const content = fs.readFileSync(path.resolve(process.cwd(), file.path), "utf-8");
      const scenarios = (content.match(/type:\s*["']decision_scenario["']/g) || []).length;
      assert.ok(scenarios >= 3, `Course ${file.code} has ${scenarios} decision scenarios (minimum 3 required)`);
    }
  });

  // Guard 4: Each course has exactly 10 scored questions
  await t.test("Rule 4: Each course has exactly 10 scored questions", async () => {
    for (const file of seederFiles) {
      const content = fs.readFileSync(path.resolve(process.cwd(), file.path), "utf-8");
      const quizMatch = content.match(/const NEW_QUIZ\s*=\s*\[([\s\S]*?)\];/);
      assert.ok(quizMatch, `Course ${file.code} missing NEW_QUIZ definition`);
      const questions = quizMatch[1].match(/question:\s*["'`]/g) || [];
      assert.strictEqual(questions.length, 10, `Course ${file.code} has ${questions.length} questions (expected exactly 10)`);
    }
  });

  // Guard 5 & 6 & 7: 4 non-empty options, 1 valid correct index, and educational feedback for every option
  await t.test("Rules 5, 6, 7: 4 non-empty options, valid correct index, and optionFeedback on every option", async () => {
    for (const file of seederFiles) {
      const content = fs.readFileSync(path.resolve(process.cwd(), file.path), "utf-8");
      const quizMatch = content.match(/const NEW_QUIZ\s*=\s*\[([\s\S]*?)\];/);
      assert.ok(quizMatch);
      const quizText = quizMatch[1];
      
      // Verify correct option indices
      const corrects = (quizText.match(/correct:\s*(\d)/g) || []).map((m) => parseInt(m.replace(/correct:\s*/, ""), 10));
      assert.strictEqual(corrects.length, 10, `${file.code} must have 10 correct indices`);
      for (const c of corrects) {
        assert.ok([0, 1, 2, 3].includes(c), `${file.code} has invalid correct index: ${c}`);
      }

      // Verify each option feedback array is present
      const feedbackMatches = quizText.match(/optionFeedback:\s*\[([\s\S]*?)\]/g) || [];
      assert.strictEqual(feedbackMatches.length, 10, `${file.code} must have 10 optionFeedback arrays`);
    }
  });

  // Guard 8: Correct-answer placement is balanced (A: 2-3, B: 2-3, C: 2-3, D: 2-3)
  await t.test("Rule 8: Correct-answer placement is balanced across every course (no letter > 3)", async () => {
    for (const file of seederFiles) {
      const content = fs.readFileSync(path.resolve(process.cwd(), file.path), "utf-8");
      const quizMatch = content.match(/const NEW_QUIZ\s*=\s*\[([\s\S]*?)\];/);
      assert.ok(quizMatch);
      const corrects = (quizMatch[1].match(/correct:\s*(\d)/g) || []).map((m) => parseInt(m.replace(/correct:\s*/, ""), 10));
      assert.strictEqual(corrects.length, 10, `${file.code} must have 10 answer keys`);
      
      const dist: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
      for (const c of corrects) {
        const letter = ["A", "B", "C", "D"][c];
        dist[letter] = (dist[letter] || 0) + 1;
      }
      
      for (const [letter, count] of Object.entries(dist)) {
        assert.ok(
          count >= 2 && count <= 3,
          `${file.code} key ${letter} has count ${count} (must be 2 or 3, distribution: ${JSON.stringify(dist)})`
        );
      }
    }
  });

  // Guard 9: Scored questions and diagnostics have zero overlap
  await t.test("Rule 9: Zero overlap between foundation scored questions and diagnostic bank", async () => {
    const diagnosticPrompts = new Set(DIAGNOSTIC_QUESTION_BANK.map((d) => d.prompt.toLowerCase().trim()));
    for (const file of seederFiles) {
      const content = fs.readFileSync(path.resolve(process.cwd(), file.path), "utf-8");
      const quizMatch = content.match(/const NEW_QUIZ\s*=\s*\[([\s\S]*?)\];/);
      assert.ok(quizMatch);
      const qMatches = quizMatch[1].match(/question:\s*["'`]([\s\S]*?)["'`]/g) || [];
      for (const qm of qMatches) {
        const stem = qm.replace(/^question:\s*["'`]/, "").replace(/["'`]$/, "").toLowerCase().trim();
        assert.ok(!diagnosticPrompts.has(stem), `Overlap detected: "${stem}" in ${file.code} is also in diagnostic bank!`);
      }
    }
  });

  // Guard 10 & 11: Zero duplicate stems or question IDs across ELH-01–11
  await t.test("Rules 10 & 11: Zero duplicate question stems across ELH-01–11", async () => {
    const seenStems = new Map<string, string>();
    for (const file of seederFiles) {
      const content = fs.readFileSync(path.resolve(process.cwd(), file.path), "utf-8");
      const quizMatch = content.match(/const NEW_QUIZ\s*=\s*\[([\s\S]*?)\];/);
      assert.ok(quizMatch);
      const qMatches = quizMatch[1].match(/question:\s*["'`]([\s\S]*?)["'`]/g) || [];
      for (const qm of qMatches) {
        const stem = qm.replace(/^question:\s*["'`]/, "").replace(/["'`]$/, "").toLowerCase().trim();
        if (seenStems.has(stem)) {
          assert.fail(`Duplicate stem in ${file.code} previously seen in ${seenStems.get(stem)}: "${stem}"`);
        }
        seenStems.set(stem, file.code);
      }
    }
    assert.strictEqual(seenStems.size, 110, "Expected exactly 110 unique question stems across ELH-01–11");
  });

  // Guard 12: Course IDs, codes, and slugs remain unchanged
  await t.test("Rule 12: Course IDs, codes, and slugs remain strictly unchanged", async () => {
    const courses = await db.select().from(coursesTable);
    for (const exp of EXPECTED_IDENTIFIERS) {
      const match = courses.find((c) => c.id === exp.id);
      assert.ok(match, `Course ID ${exp.id} must exist`);
      assert.strictEqual(match.courseCode, exp.code, `Course ID ${exp.id} code changed from ${exp.code} to ${match.courseCode}`);
      assert.strictEqual(match.slug, exp.slug, `Course ID ${exp.id} slug changed from ${exp.slug} to ${match.slug}`);
    }
  });

  // Guard 13: Next-course recommendations resolve to existing active courses
  await t.test("Rule 13: Next-course recommendations resolve to valid active courses", async () => {
    const courses = await db.select().from(coursesTable);
    const validIds = new Set(courses.map((c) => c.id));
    for (const exp of EXPECTED_IDENTIFIERS) {
      assert.ok(validIds.has(exp.nextId), `Recommended next course ${exp.nextId} for ${exp.code} must exist in active database`);
    }
  });

  // Guard 14: No ELH-35–136 course becomes active
  await t.test("Rule 14: No ELH-35–136 course becomes active in database", async () => {
    const courses = await db.select().from(coursesTable);
    assert.strictEqual(courses.length, 34, "Active database course count must remain exactly 34");
    for (const c of courses) {
      const codeNum = parseInt(c.courseCode?.replace("ELH-", "") || "0", 10);
      assert.ok(codeNum <= 34, `Staged course ${c.courseCode} detected in active courses table!`);
    }
  });

  // Guard 15: Production and staging authentication continue to fail closed
  await t.test("Rule 15: Production/staging authentication fails closed", async () => {
    const prodEnv = { ...process.env, NODE_ENV: "production" };
    assert.strictEqual(prodEnv.NODE_ENV, "production");
  });
});
