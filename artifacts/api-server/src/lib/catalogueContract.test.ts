import test from "node:test";
import assert from "node:assert/strict";
import { auditCatalogueContracts, CANONICAL_CATALOGUE_CONTRACTS } from "./catalogueContract";

test("Sprint 16.8 / 16.8A Authoritative Catalogue Contract Validation Suite", async (t) => {
  await t.test("1. Canonical catalogue contracts define exactly 34 core launch courses (ELH-01..34)", () => {
    assert.equal(CANONICAL_CATALOGUE_CONTRACTS.length, 34);
    assert.equal(CANONICAL_CATALOGUE_CONTRACTS[0].courseCode, "ELH-01");
    assert.equal(CANONICAL_CATALOGUE_CONTRACTS[33].courseCode, "ELH-34");
  });

  await t.test("2. Contract audit detects zero duplicate course codes, IDs, or slugs", async () => {
    const summary = await auditCatalogueContracts();
    assert.equal(summary.duplicateIdentifiersFound.length, 0, `Expected 0 duplicate identifiers, got: ${summary.duplicateIdentifiersFound.join(", ")}`);
  });

  await t.test("3. Contract audit confirms zero orphaned quiz questions", async () => {
    const summary = await auditCatalogueContracts();
    assert.equal(summary.orphanedQuestionsFound, 0, `Expected 0 orphaned questions, got: ${summary.orphanedQuestionsFound}`);
  });

  await t.test("4. All 34 canonical contract courses exist in runtime database", async () => {
    const summary = await auditCatalogueContracts();
    assert.equal(summary.missingRuntimeCourses.length, 0, `Expected 0 missing courses, got: ${summary.missingRuntimeCourses.join(", ")}`);
    assert.equal(summary.isFullyValid, true, "Catalogue contract validation must be fully valid");
  });

  await t.test("5. Readiness evaluation distinguishes registered, seeded, assessment_ready, content_complete, and learner_ready", async () => {
    const summary = await auditCatalogueContracts();
    assert.equal(summary.courseEvaluations.length, 34);
    for (const evaluation of summary.courseEvaluations) {
      assert.equal(evaluation.isRegistered, true, `Course ${evaluation.courseCode} must be registered`);
      assert.equal(evaluation.isSeeded, true, `Course ${evaluation.courseCode} must be seeded in database`);
      assert.ok(
        ["registered", "seeded", "assessment_ready", "content_complete", "learner_ready"].includes(evaluation.status),
        `Status must be a recognized tier, got: ${evaluation.status}`
      );
    }
  });

  await t.test("6. Normal courses requiring 10 questions are NOT learner-ready with only 5 questions", () => {
    const normalContract = CANONICAL_CATALOGUE_CONTRACTS.find(c => c.courseCode === "ELH-01");
    assert.ok(normalContract);
    assert.equal(normalContract.expectedMinQuizQuestions, 10, "Normal course ELH-01 must require 10 questions");
  });
});
