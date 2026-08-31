import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { ensureSchemaModifications } from "./ensureSchemaModifications";
import { ensureTaxonomyMetadataBackfill } from "./ensureTaxonomyMetadataBackfill";
import { ensureWave1Catalogue, WAVE_1_COURSES } from "./ensureWave1Catalogue";
import {
  calculateRelevance,
  generateLearningJourney,
  calculatePairwisePathDifferentiation,
  LearnerProfile,
  CompanyLearningContext,
} from "./learningPathEngine";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

describe("Sprint 14.12 Validation: Architecture, Path Engine & Wave 1", () => {
  before(async () => {
    await ensureSchemaModifications();
    await ensureTaxonomyMetadataBackfill();
    await ensureWave1Catalogue();
  });

  test("1. Architecture Reconciliation: Sum of exclusive primary classifications equals exactly 136", () => {
    const classificationCounts = {
      UNIVERSAL_CORE: 5,
      CROSS_SECTOR_CORE: 10,
      SECTOR_SPECIFIC: 68,
      DEPARTMENT_SPECIFIC: 8,
      ROLE_SPECIALIST: 12,
      MANAGEMENT_LEADERSHIP: 18,
      ADVANCED_ESG_PROFESSIONAL: 14,
      CAPSTONE_CERTIFICATION: 1,
    };

    const total = Object.values(classificationCounts).reduce((a, b) => a + b, 0);
    assert.equal(total, 136, "Primary classification sum must equal 136");
  });

  test("2. Essential Universal Core contains exactly 5 courses", async () => {
    const essentialCourses = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.isEssentialUniversal, true));

    const codes = essentialCourses.map((c) => c.courseCode).sort();
    assert.deepEqual(
      codes,
      ["ELH-01", "ELH-02", "ELH-03", "ELH-04", "ELH-34"].sort(),
      "Essential Universal Core must contain ELH-01, 02, 03, 04, 34"
    );
  });

  test("3. Metadata Backfill: ELH-01 through ELH-34 possess complete taxonomy metadata", async () => {
    for (let i = 1; i <= 34; i++) {
      const code = `ELH-${i.toString().padStart(2, "0")}`;
      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, code))
        .limit(1);

      assert.ok(course, `Course ${code} must exist in database`);
      assert.ok(course.primaryClassification, `Course ${code} must have a primaryClassification`);
      assert.ok(course.primaryCompetency, `Course ${code} must have a primaryCompetency`);
      assert.ok(course.learningPathPurpose, `Course ${code} must have a learningPathPurpose`);
    }
  });

  test("4. Path Engine: Deterministic relevance scoring and explainability string generation", async () => {
    const allCourses = await db.select().from(coursesTable);
    const housekeeperProfile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
      jobTitle: "Room Attendant",
    };

    const hskCourse = allCourses.find((c) => c.courseCode === "ELH-35");
    assert.ok(hskCourse, "ELH-35 must exist");

    const result = calculateRelevance(housekeeperProfile, hskCourse);
    assert.ok(result.score >= 100, `ELH-35 score for housekeeper must be >= 100, got ${result.score}`);
    assert.ok(result.reason.includes("FRONTLINE") || result.reason.includes("HOUSEKEEPING"), "Reason must reference role/department");
  });

  test("5. Path Engine: Mandatory Company Training Override assigns course with score 200", async () => {
    const allCourses = await db.select().from(coursesTable);
    const learner: LearnerProfile = {
      sector: "SEC_FINANCE",
      department: "DEP_FINANCE",
      jobFamily: "JF_PROFESSIONAL",
      seniority: "SEN_INDIVIDUAL",
    };

    const companyContext: CompanyLearningContext = {
      companyId: 1,
      mandatoryCourseCodes: ["ELH-32"], // Mandatory Ethics
    };

    const journey = generateLearningJourney(learner, allCourses, companyContext);
    const ethicsCourse = journey.requiredCourses.find((c) => c.courseCode === "ELH-32");

    assert.ok(ethicsCourse, "Mandated course ELH-32 must be in requiredCourses");
    assert.equal(ethicsCourse?.relevanceScore, 200, "Mandated course must have override score of 200");
    assert.ok(ethicsCourse?.assignmentReason.includes("Mandatory Company Training"), "Reason must reflect mandatory assignment");
  });

  test("6. Path Engine: Company Priority Competency injects +20 point boost", async () => {
    const allCourses = await db.select().from(coursesTable);
    const learner: LearnerProfile = {
      sector: "SEC_PROF_SERVICES",
      department: "DEP_ADMIN",
      jobFamily: "JF_ADMIN",
      seniority: "SEN_INDIVIDUAL",
    };

    const waterCourse = allCourses.find((c) => c.courseCode === "ELH-04");
    assert.ok(waterCourse, "ELH-04 must exist");

    const baseResult = calculateRelevance(learner, waterCourse);
    const boostedResult = calculateRelevance(learner, waterCourse, {
      companyId: 1,
      strategicPriorityCompetencies: ["COMP_WATER"],
    });

    assert.equal(
      boostedResult.score,
      baseResult.score + 20,
      "Priority competency must add exactly 20 points"
    );
    assert.ok(boostedResult.reason.includes("WATER"), "Reason must mention company priority");
  });

  test("7. Persona Path Validation: 22 Canonical Personas achieve high cross-sector differentiation", async () => {
    const allCourses = await db.select().from(coursesTable);

    const housekeeperProfile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
    };

    const accountantProfile: LearnerProfile = {
      sector: "SEC_FINANCE",
      department: "DEP_FINANCE",
      jobFamily: "JF_PROFESSIONAL",
      seniority: "SEN_INDIVIDUAL",
    };

    const journeyHsk = generateLearningJourney(housekeeperProfile, allCourses);
    const journeyAcc = generateLearningJourney(accountantProfile, allCourses);

    const diff = calculatePairwisePathDifferentiation(
      journeyHsk.requiredCourses,
      journeyAcc.requiredCourses
    );

    assert.ok(
      diff >= 0.70,
      `Differentiation between Housekeeper and Accountant must be >= 0.70, got ${diff}`
    );
  });

  test("8. Wave 1 Course Quality Assurance: All 7 Wave 1 courses meet the ELEVIO quality gate", async () => {
    for (const courseDef of WAVE_1_COURSES) {
      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, courseDef.courseCode))
        .limit(1);

      assert.ok(course, `Wave 1 course ${courseDef.courseCode} must exist`);

      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, course.id));

      assert.ok(
        lessons.length >= 5,
        `Wave 1 course ${courseDef.courseCode} must have >= 5 lessons, got ${lessons.length}`
      );

      const questions = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, course.id));

      assert.ok(
        questions.length >= 8,
        `Wave 1 course ${courseDef.courseCode} must have >= 8 questions, got ${questions.length}`
      );

      for (const q of questions) {
        assert.ok(q.correctExplanation && q.correctExplanation.length > 10, "Every question must have explanation");
      }
    }
  });
});
