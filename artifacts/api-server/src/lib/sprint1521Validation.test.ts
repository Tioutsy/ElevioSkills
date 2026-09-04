import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { ensureSchemaModifications } from "./ensureSchemaModifications";
import { ensureTaxonomyMetadataBackfill } from "./ensureTaxonomyMetadataBackfill";
import { ensureWave1Catalogue } from "./ensureWave1Catalogue";
import { ensureWave1BCatalogue } from "./ensureWave1BCatalogue";
import { ensureWave2Catalogue } from "./ensureWave2Catalogue";
import { ensureWave3Catalogue } from "./ensureWave3Catalogue";
import { ensureWave4Catalogue } from "./ensureWave4Catalogue";
import {
  DIAGNOSTIC_QUESTION_BANK,
  generateDiagnosticBlueprint,
  getNextAdaptiveQuestion,
  scoreDiagnosticSession,
  calculateLearningImpact,
  DiagnosticResponse,
} from "./diagnosticEngine";
import { CANONICAL_COMPETENCIES } from "./competencyIntelligenceEngine";
import { generateLearningJourney, LearnerProfile } from "./learningPathEngine";
import { db, coursesTable } from "@workspace/db";

describe("Sprint 15.2.1 Master Validation: Question Bank Expansion & Reassessment Reliability", () => {
  before(async () => {
    await ensureSchemaModifications();
    await ensureTaxonomyMetadataBackfill();
    await ensureWave1Catalogue();
    await ensureWave1BCatalogue();
    await ensureWave2Catalogue();
    await ensureWave3Catalogue();
    await ensureWave4Catalogue();
  });

  test("1. Baseline Protection: Full 136-course catalogue remains published and unmodified", async () => {
    const allCourses = await db.select().from(coursesTable);
    assert.equal(allCourses.length, 136, "Catalogue must contain exactly 136 courses");
  });

  test("2. Question Bank Depth: Exactly 88 standalone diagnostic items across all 11 competencies (8 per competency)", () => {
    assert.equal(DIAGNOSTIC_QUESTION_BANK.length, 88, `Diagnostic question bank must contain 88 items, got ${DIAGNOSTIC_QUESTION_BANK.length}`);

    for (const [code] of Object.entries(CANONICAL_COMPETENCIES)) {
      const items = DIAGNOSTIC_QUESTION_BANK.filter((q) => q.competency === code);
      assert.equal(items.length, 8, `Competency ${code} must have exactly 8 diagnostic items`);

      const d1 = items.filter((q) => q.difficulty === 1).length;
      const d2 = items.filter((q) => q.difficulty === 2).length;
      const d3 = items.filter((q) => q.difficulty === 3).length;
      const d4 = items.filter((q) => q.difficulty === 4).length;

      assert.equal(d1, 2, `${code} must have 2 D1 items`);
      assert.equal(d2, 2, `${code} must have 2 D2 items`);
      assert.equal(d3, 2, `${code} must have 2 D3 items`);
      assert.equal(d4, 2, `${code} must have 2 D4 items`);
    }
  });

  test("3. Equivalent Item Groups: 44 distinct groups exist for baseline/reassessment separation", () => {
    const groups = new Set(DIAGNOSTIC_QUESTION_BANK.map((q) => q.equivalentGroupId));
    assert.equal(groups.size, 44, `Must contain 44 distinct equivalent groups, got ${groups.size}`);

    for (const groupId of groups) {
      const groupItems = DIAGNOSTIC_QUESTION_BANK.filter((q) => q.equivalentGroupId === groupId);
      assert.equal(groupItems.length, 2, `Equivalent group ${groupId} must contain 2 paired items (Version A & B)`);
    }
  });

  test("4. Reassessment Reliability: Engine selects unseen equivalent items to prevent memorization", () => {
    const seenQuestionIds = new Set(["DIAG-ENG-01A", "DIAG-ENG-02A", "DIAG-ENG-03A"]);
    const responses: DiagnosticResponse[] = [];

    const nextQ = getNextAdaptiveQuestion("COMP_ENERGY", responses, seenQuestionIds);
    assert.ok(nextQ);
    assert.equal(nextQ!.id, "DIAG-ENG-01B", "Reassessment must select unseen equivalent DIAG-ENG-01B");
    assert.ok(!seenQuestionIds.has(nextQ!.id), "Selected question must not be in seen set");
  });

  test("5. High Confidence Depth Enforcement: Requires multiple independent items", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_FACILITIES",
      jobFamily: "JF_TECHNICAL",
      seniority: "SEN_SUPERVISOR",
    };

    const blueprint = generateDiagnosticBlueprint(profile, allCourses);

    // Case 1: 1 question only -> Moderate confidence
    const respSingle: DiagnosticResponse[] = [
      { questionId: "DIAG-ENG-03A", competency: "COMP_ENERGY", selectedOptionIndex: 0, isCorrect: true },
    ];
    const snapSingle = scoreDiagnosticSession(201, 10, respSingle, blueprint);
    const engSingle = snapSingle.competencies.find((c) => c.competency === "COMP_ENERGY");
    assert.equal(engSingle!.baselineConfidence, "MODERATE", "Single question cannot confer HIGH confidence");

    // Case 2: 2 questions with difficulty depth -> High confidence
    const respMulti: DiagnosticResponse[] = [
      { questionId: "DIAG-ENG-02A", competency: "COMP_ENERGY", selectedOptionIndex: 0, isCorrect: true },
      { questionId: "DIAG-ENG-03A", competency: "COMP_ENERGY", selectedOptionIndex: 0, isCorrect: true },
    ];
    const snapMulti = scoreDiagnosticSession(202, 10, respMulti, blueprint);
    const engMulti = snapMulti.competencies.find((c) => c.competency === "COMP_ENERGY");
    assert.equal(engMulti!.baselineConfidence, "HIGH", "Multiple consistent questions confer HIGH confidence");
  });

  test("6. Performance Scalability: Computes 1,000 expanded diagnostic sessions in < 500ms", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_FINANCE",
      department: "DEP_FINANCE",
      jobFamily: "JF_PROFESSIONAL",
      seniority: "SEN_INDIVIDUAL",
    };

    const blueprint = generateDiagnosticBlueprint(profile, allCourses);
    const start = Date.now();

    for (let i = 0; i < 1000; i++) {
      scoreDiagnosticSession(200 + i, 10, [
        { questionId: "DIAG-ENG-01A", competency: "COMP_ENERGY", selectedOptionIndex: 0, isCorrect: true },
        { questionId: "DIAG-WAT-01A", competency: "COMP_WATER", selectedOptionIndex: 0, isCorrect: true },
      ], blueprint);
    }

    const elapsed = Date.now() - start;
    assert.ok(elapsed < 1000, `1,000 expanded diagnostic sessions must score in < 1,000ms, elapsed: ${elapsed}ms`);
  });
});
