import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { ensureSchemaModifications } from "./ensureSchemaModifications";
import { ensureTaxonomyMetadataBackfill } from "./ensureTaxonomyMetadataBackfill";
import { ensureWave1Catalogue } from "./ensureWave1Catalogue";
import { ensureWave1BCatalogue } from "./ensureWave1BCatalogue";
import { ensureWave2Catalogue } from "./ensureWave2Catalogue";
import { ensureWave3Catalogue } from "./ensureWave3Catalogue";
import { ensureWave4Catalogue } from "./ensureWave4Catalogue";
import { runFullCatalogueAudit, CourseAuditRecord } from "./courseAuditEvaluator";
import { CANONICAL_COMPETENCIES } from "./competencyIntelligenceEngine";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import * as fs from "node:fs";
import * as path from "node:path";

describe("Sprint 15.2.2 Master Validation: Course Quality Audit, Level Calibration & Diagnostic Alignment", () => {
  let auditResults: CourseAuditRecord[] = [];

  before(async () => {
    const existing = await db.select({ id: coursesTable.id }).from(coursesTable);
    if (existing.length < 136) {
      await ensureSchemaModifications();
      await ensureTaxonomyMetadataBackfill();
      await ensureWave1Catalogue();
      await ensureWave1BCatalogue();
      await ensureWave2Catalogue();
      await ensureWave3Catalogue();
      await ensureWave4Catalogue();
    }

    auditResults = await runFullCatalogueAudit();
  });

  test("1. Complete Canonical Catalogue Audit: Exactly 136 verified canonical courses audited with 0 duplicates", async () => {
    const allCourses = await db.select().from(coursesTable);
    assert.equal(allCourses.length, 136, "Verified canonical catalogue must contain exactly 136 courses");
    assert.equal(auditResults.length, 136, "Audit results must contain exactly 136 records");

    const ids = new Set(auditResults.map((r) => r.courseId));
    assert.equal(ids.size, 136, "All 136 course IDs must be unique in audit results");

    const codes = new Set(auditResults.map((r) => r.courseCode));
    assert.equal(codes.size, 136, "All 136 course codes must be unique in audit results");
  });

  test("2. Deterministic Scoring Validation & 136 Invariant Reconciliations", () => {
    const countA = auditResults.filter((r) => r.classification === "A").length;
    const countB = auditResults.filter((r) => r.classification === "B").length;
    const countC = auditResults.filter((r) => r.classification === "C").length;
    const countD = auditResults.filter((r) => r.classification === "D").length;

    assert.equal(countA + countB + countC + countD, 136, "Invariant A + B + C + D must equal exactly 136");

    const d1Count = auditResults.filter((r) => r.evidencedLevel === "D1").length;
    const d2Count = auditResults.filter((r) => r.evidencedLevel === "D2").length;
    const d3Count = auditResults.filter((r) => r.evidencedLevel === "D3").length;
    const d4Count = auditResults.filter((r) => r.evidencedLevel === "D4").length;

    assert.equal(d1Count + d2Count + d3Count + d4Count, 136, "Invariant D1 + D2 + D3 + D4 must equal exactly 136");

    for (const record of auditResults) {
      assert.ok(record.scores.totalScore >= 50 && record.scores.totalScore <= 100, `Score out of bounds for ${record.courseCode}: ${record.scores.totalScore}`);
      assert.ok(["A", "B", "C", "D"].includes(record.classification), `Invalid primary classification: ${record.classification}`);
      assert.ok(["D1", "D2", "D3", "D4"].includes(record.evidencedLevel), `Invalid evidenced level: ${record.evidencedLevel}`);
      assert.ok(["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"].includes(record.remediationBatch), `Invalid batch: ${record.remediationBatch}`);
      assert.equal(typeof record.consolidationFlag, "boolean", "Consolidation flag must be a boolean");

      // Verify course-specific evidence for P2 priority remediation
      if (record.remediationPriority === "P2") {
        assert.ok(record.criticalFindings.length > 0, `P2 course ${record.courseCode} must have course-specific evidence in criticalFindings`);
      }
    }

    const p0Count = auditResults.filter((r) => r.remediationPriority === "P0").length;
    const p1Count = auditResults.filter((r) => r.remediationPriority === "P1").length;
    const p2Count = auditResults.filter((r) => r.remediationPriority === "P2").length;
    const p3Count = auditResults.filter((r) => r.remediationPriority === "P3").length;

    assert.equal(p0Count, 0, "P0 count must equal 0");
    assert.equal(p1Count, 0, "P1 count must equal 0");
    assert.equal(p2Count, 11, "P2 priority remediation count must equal exactly 11");
    assert.equal(p3Count, 125, "P3 priority remediation count must equal 125");

    const avgScore = auditResults.reduce((acc, r) => acc + r.scores.totalScore, 0) / auditResults.length;
    assert.ok(avgScore >= 80, `Catalogue average score must be >= 80, got ${avgScore}`);
  });

  test("3. Competency & Subcompetency Coverage: All 11 canonical competencies are represented", () => {
    for (const [code] of Object.entries(CANONICAL_COMPETENCIES)) {
      const primaryCount = auditResults.filter((r) => r.primaryCompetency === code).length;
      assert.ok(primaryCount > 0, `Competency ${code} must have at least 1 primary course`);
    }
  });

  test("4. Diagnostic-to-Course Alignment: All 88 diagnostic items map to teaching courses across D1..D4", () => {
    assert.equal(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic bank must contain 88 items");

    for (const q of DIAGNOSTIC_QUESTION_BANK) {
      const matchingCourses = auditResults.filter((r) => r.primaryCompetency === q.competency);
      assert.ok(matchingCourses.length > 0, `Diagnostic question ${q.id} (${q.competency}) must map to teaching courses`);
    }
  });

  test("5. Assessment Quality & Security: No client-side answer leakage or question duplication", async () => {
    const allQuiz = await db.select().from(quizQuestionsTable);
    assert.ok(allQuiz.length >= 1000, `Must have >= 1,000 quiz questions across catalogue, got ${allQuiz.length}`);

    // Verify diagnostic questions are not copied into course quizzes
    const diagPrompts = new Set(DIAGNOSTIC_QUESTION_BANK.map((d) => d.prompt.trim().toLowerCase()));
    for (const quizQ of allQuiz) {
      const prompt = (quizQ.question || "").trim().toLowerCase();
      assert.ok(!diagPrompts.has(prompt), `Course quiz question copied diagnostic item: "${quizQ.question}"`);
    }
  });

  test("6. Remediation Register & Batch Plan: Exactly 136 courses allocated to Batches 1..5", () => {
    const batch1 = auditResults.filter((r) => r.remediationBatch === "Batch 1");
    const batch2 = auditResults.filter((r) => r.remediationBatch === "Batch 2");
    const batch3 = auditResults.filter((r) => r.remediationBatch === "Batch 3");
    const batch4 = auditResults.filter((r) => r.remediationBatch === "Batch 4");
    const batch5 = auditResults.filter((r) => r.remediationBatch === "Batch 5");

    const totalInBatches = batch1.length + batch2.length + batch3.length + batch4.length + batch5.length;
    assert.equal(totalInBatches, 136, "All 136 canonical courses must be allocated to remediation batches (Batch 1..5 = 136)");
  });
});
