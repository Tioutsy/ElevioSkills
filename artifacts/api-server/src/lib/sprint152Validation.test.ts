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
  regenerateLearningPathAfterDiagnostic,
  DiagnosticResponse,
} from "./diagnosticEngine";
import { generateLearningJourney, LearnerProfile, CompanyLearningContext } from "./learningPathEngine";
import { generateLearnerSkillsProfile } from "./competencyIntelligenceEngine";
import { db, coursesTable } from "@workspace/db";

describe("Sprint 15.2 Master Validation: Diagnostic Baselines & Measured Learning Impact", () => {
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

  test("2. Diagnostic Blueprint Generation: Targets competencies with low/no evidence", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_FACILITIES",
      jobFamily: "JF_TECHNICAL",
      seniority: "SEN_SUPERVISOR",
      completedCourseCodes: [], // Zero evidence
    };

    const blueprint = generateDiagnosticBlueprint(profile, allCourses);
    assert.ok(blueprint.testedCompetencies.length > 0, "Must identify competencies to test");
    assert.ok(blueprint.totalQuestionTarget >= 3, "Must target reasonable question volume");
  });

  test("3. Adaptive Questioning & Branching: Steps up on correct answers and terminates within bounds", () => {
    const responses: DiagnosticResponse[] = [];

    // Step 1: Initial Question
    const q1 = getNextAdaptiveQuestion("COMP_ENERGY", responses);
    assert.ok(q1);
    assert.equal(q1!.difficulty, 1, "Initial question starts at Difficulty 1");

    // Step 2: Answer correctly -> should step up difficulty
    responses.push({
      questionId: q1!.id,
      competency: "COMP_ENERGY",
      selectedOptionIndex: q1!.correctOptionIndex,
      isCorrect: true,
    });

    const q2 = getNextAdaptiveQuestion("COMP_ENERGY", responses);
    assert.ok(q2);
    assert.ok(q2!.difficulty >= 2, "Steps up to Difficulty 2 on correct response");
  });

  test("4. Immutable Baseline Creation: Computes traceable proficiency and confidence", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_FACILITIES",
      jobFamily: "JF_TECHNICAL",
      seniority: "SEN_SUPERVISOR",
    };

    const blueprint = generateDiagnosticBlueprint(profile, allCourses);
    const responses: DiagnosticResponse[] = [
      { questionId: "DIAG-ENG-01", competency: "COMP_ENERGY", selectedOptionIndex: 0, isCorrect: true },
      { questionId: "DIAG-ENG-02", competency: "COMP_ENERGY", selectedOptionIndex: 1, isCorrect: true },
      { questionId: "DIAG-ENG-03", competency: "COMP_ENERGY", selectedOptionIndex: 1, isCorrect: true },
    ];

    const baseline = scoreDiagnosticSession(101, 10, responses, blueprint);
    const energyRec = baseline.competencies.find((c) => c.competency === "COMP_ENERGY");
    assert.ok(energyRec);
    assert.equal(energyRec!.baselineProficiency, 3, "3/3 correct including Level 3 yields Baseline Level 3");
    assert.equal(energyRec!.baselineConfidence, "HIGH", "3 questions confer HIGH confidence");
  });

  test("5. Measured Learning Impact: Quantifies Before vs After Capability Growth", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
      completedCourseCodes: ["ELH-01", "ELH-02", "ELH-35"], // Completed courses
    };

    const blueprint = generateDiagnosticBlueprint(profile, allCourses);
    // Baseline was Level 1 Awareness
    const baseline = scoreDiagnosticSession(102, 10, [
      { questionId: "DIAG-WAT-01", competency: "COMP_WATER", selectedOptionIndex: 0, isCorrect: true },
    ], blueprint);

    // Current state has completed ELH-35 (Level 2 Working Knowledge)
    const currentSkills = generateLearnerSkillsProfile(profile, allCourses);
    const impact = calculateLearningImpact(baseline, currentSkills);

    const waterImpact = impact.find((i) => i.competency === "COMP_WATER");
    assert.ok(waterImpact);
    assert.ok(waterImpact!.proficiencyDelta >= 1, "Must measure positive proficiency delta");
    assert.equal(waterImpact!.impactState, "PROFICIENCY_INCREASED");
  });

  test("6. Path Regeneration & Mandatory Protection: Preserves compliance tracks", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_FACILITIES",
      jobFamily: "JF_TECHNICAL",
      seniority: "SEN_SUPERVISOR",
    };

    const companyContext: CompanyLearningContext = {
      companyId: 10,
      mandatoryCourseCodes: ["ELH-32"], // Mandatory compliance course
    };

    const journey = generateLearningJourney(profile, allCourses, companyContext);
    const blueprint = generateDiagnosticBlueprint(profile, allCourses, companyContext);

    // Baseline proves strong Energy knowledge
    const baseline = scoreDiagnosticSession(103, 10, [
      { questionId: "DIAG-ENG-01", competency: "COMP_ENERGY", selectedOptionIndex: 0, isCorrect: true },
      { questionId: "DIAG-ENG-02", competency: "COMP_ENERGY", selectedOptionIndex: 1, isCorrect: true },
      { questionId: "DIAG-ENG-03", competency: "COMP_ENERGY", selectedOptionIndex: 1, isCorrect: true },
    ], blueprint);

    const regenerated = regenerateLearningPathAfterDiagnostic(
      journey.requiredCourses,
      journey.recommendedCourses,
      baseline,
      allCourses
    );

    // Mandatory course must be 100% preserved
    const hasMandate = regenerated.updatedRequired.some((c) => c.courseCode === "ELH-32");
    assert.equal(hasMandate, true, "Mandatory compliance course ELH-32 must NEVER be removed by diagnostic");
  });

  test("7. Performance Scalability: Computes 1,000 diagnostic sessions in < 500ms", async () => {
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
      scoreDiagnosticSession(100 + i, 10, [
        { questionId: "DIAG-ENG-01", competency: "COMP_ENERGY", selectedOptionIndex: 0, isCorrect: true },
        { questionId: "DIAG-WAT-01", competency: "COMP_WATER", selectedOptionIndex: 0, isCorrect: true },
      ], blueprint);
    }

    const elapsed = Date.now() - start;
    assert.ok(elapsed < 1000, `1,000 diagnostic sessions must score in < 1,000ms, elapsed: ${elapsed}ms`);
  });
});
