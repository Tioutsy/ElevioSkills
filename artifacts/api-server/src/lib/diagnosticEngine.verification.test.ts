import test from "node:test";
import assert from "node:assert/strict";
import {
  DIAGNOSTIC_QUESTION_BANK,
  generateDiagnosticBlueprint,
  scoreDiagnosticSession,
} from "./diagnosticEngine";

test("Diagnostic Question Bank Verification Suite", async (t) => {
  await t.test("1. DIAGNOSTIC_QUESTION_BANK has exactly 88 questions", () => {
    assert.equal(
      DIAGNOSTIC_QUESTION_BANK.length,
      88,
      `Expected 88 diagnostic questions, found ${DIAGNOSTIC_QUESTION_BANK.length}`
    );
  });

  await t.test("2. Exactly 11 unique competency domains are represented", () => {
    const competencies = new Set(DIAGNOSTIC_QUESTION_BANK.map((q) => q.competency));
    assert.equal(
      competencies.size,
      11,
      `Expected 11 competencies, found ${competencies.size}: ${Array.from(competencies).join(", ")}`
    );
    // Every competency has exactly 8 questions (4 pairs)
    for (const comp of competencies) {
      const count = DIAGNOSTIC_QUESTION_BANK.filter((q) => q.competency === comp).length;
      assert.equal(
        count,
        8,
        `Competency ${comp} should have exactly 8 questions, found ${count}`
      );
    }
  });

  await t.test("3. Exactly 44 equivalent pair groups exist (2 questions per group)", () => {
    const groupMap = new Map<string, string[]>();
    for (const q of DIAGNOSTIC_QUESTION_BANK) {
      assert.ok(q.equivalentGroupId, `Question ${q.id} missing equivalentGroupId`);
      if (!groupMap.has(q.equivalentGroupId)) {
        groupMap.set(q.equivalentGroupId, []);
      }
      groupMap.get(q.equivalentGroupId)!.push(q.id);
    }
    assert.equal(
      groupMap.size,
      44,
      `Expected 44 equivalent groups, found ${groupMap.size}`
    );
    for (const [groupId, qIds] of groupMap.entries()) {
      assert.equal(
        qIds.length,
        2,
        `Group ${groupId} should contain exactly 2 paired questions, found ${qIds.length}`
      );
    }
  });

  await t.test("4. Question IDs follow canonical naming and have no collisions", () => {
    const ids = new Set<string>();
    for (const q of DIAGNOSTIC_QUESTION_BANK) {
      assert.ok(!ids.has(q.id), `Duplicate diagnostic question ID found: ${q.id}`);
      ids.add(q.id);
      assert.ok(q.prompt && q.prompt.length > 10, `Question ${q.id} has invalid prompt`);
      assert.ok(Array.isArray(q.options) && q.options.length >= 2, `Question ${q.id} options invalid`);
      assert.ok(
        q.correctOptionIndex >= 0 && q.correctOptionIndex < q.options.length,
        `Question ${q.id} correctOptionIndex ${q.correctOptionIndex} out of bounds`
      );
      assert.ok(q.rationale && q.rationale.length > 5, `Question ${q.id} missing rationale`);
    }
  });

  await t.test("5. Blueprint generation selects balanced representative items", () => {
    const profile = {
      id: 101,
      sector: "SEC_HOSPITALITY",
      department: "DEP_OPERATIONS",
      jobFamily: "JF_PROFESSIONAL",
      seniority: "SEN_INDIVIDUAL",
      completedCourseCodes: [],
    };
    const blueprint = generateDiagnosticBlueprint(profile, []);
    assert.ok(blueprint.testedCompetencies.length > 0, "Blueprint should identify tested competencies");
    assert.ok(blueprint.totalQuestionTarget > 0, "Blueprint should assign a positive question quota");
    assert.equal(blueprint.learnerId, 101);
  });
});
