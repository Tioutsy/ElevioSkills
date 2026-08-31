import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { ensureSchemaModifications } from "./ensureSchemaModifications";
import { ensureTaxonomyMetadataBackfill } from "./ensureTaxonomyMetadataBackfill";
import { ensureWave1Catalogue, WAVE_1_COURSES } from "./ensureWave1Catalogue";
import { ensureWave1BCatalogue, WAVE_1B_COURSES } from "./ensureWave1BCatalogue";
import {
  calculateRelevance,
  generateLearningJourney,
  calculatePairwisePathDifferentiation,
  LearnerProfile,
  CompanyLearningContext,
} from "./learningPathEngine";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

describe("Sprint 14.13 Validation: Wave 1B Production & Real Learning-Path Experience", () => {
  before(async () => {
    await ensureSchemaModifications();
    await ensureTaxonomyMetadataBackfill();
    await ensureWave1Catalogue();
    await ensureWave1BCatalogue();
  });

  test("1. Production Course Count: Total active production catalogue equals 52 courses (41 + 11)", async () => {
    const allCourses = await db.select().from(coursesTable);
    assert.ok(allCourses.length >= 52, `Catalogue must contain at least 52 courses, got ${allCourses.length}`);
  });

  test("2. Wave 1B Course Seeding: All 11 approved Wave 1B courses are present with complete lessons & quizzes", async () => {
    const wave1BCodes = [
      "ELH-55", "ELH-57", "ELH-58", "ELH-62", "ELH-83", "ELH-85",
      "ELH-117", "ELH-118", "ELH-121", "ELH-122", "ELH-128"
    ];

    for (const code of wave1BCodes) {
      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, code))
        .limit(1);

      assert.ok(course, `Wave 1B course ${code} must exist in database`);
      assert.ok(course.primaryClassification, `Course ${code} must have a primaryClassification`);

      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, course.id));
      assert.ok(lessons.length >= 5, `Course ${code} must have >= 5 lessons, got ${lessons.length}`);

      const questions = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, course.id));
      assert.ok(questions.length >= 8, `Course ${code} must have >= 8 questions, got ${questions.length}`);

      for (const q of questions) {
        assert.ok(q.correctExplanation && q.correctExplanation.length > 5, `Question in ${code} must have correctExplanation`);
        assert.ok(q.incorrectExplanation && q.incorrectExplanation.length > 5, `Question in ${code} must have incorrectExplanation`);
      }
    }
  });

  test("3. Pedagogical Sequence: Required paths are ordered logically (Foundations -> Sector -> Role -> Mgmt -> Capstone)", async () => {
    const allCourses = await db.select().from(coursesTable);
    const facilitiesManagerProfile: LearnerProfile = {
      sector: "SEC_PROPERTY",
      department: "DEP_FACILITIES",
      jobFamily: "JF_MANAGER",
      seniority: "SEN_MANAGER",
    };

    const journey = generateLearningJourney(facilitiesManagerProfile, allCourses);
    assert.ok(journey.requiredCourses.length > 0, "Journey must contain required courses");

    for (let i = 1; i < journey.requiredCourses.length; i++) {
      assert.ok(
        journey.requiredCourses[i].pedagogicalOrder >= journey.requiredCourses[i - 1].pedagogicalOrder,
        `Course at index ${i} (${journey.requiredCourses[i].courseCode}, order ${journey.requiredCourses[i].pedagogicalOrder}) must have order >= previous course (${journey.requiredCourses[i - 1].courseCode}, order ${journey.requiredCourses[i - 1].pedagogicalOrder})`
      );
    }
  });

  test("4. Managerial Progression: Managers receive management & KPI modules while individual contributors receive task SOPs", async () => {
    const allCourses = await db.select().from(coursesTable);

    const accountantProfile: LearnerProfile = {
      sector: "SEC_FINANCE",
      department: "DEP_FINANCE",
      jobFamily: "JF_PROFESSIONAL",
      seniority: "SEN_INDIVIDUAL",
    };

    const financeMgrProfile: LearnerProfile = {
      sector: "SEC_FINANCE",
      department: "DEP_FINANCE",
      jobFamily: "JF_MANAGER",
      seniority: "SEN_MANAGER",
    };

    const journeyAcc = generateLearningJourney(accountantProfile, allCourses);
    const journeyMgr = generateLearningJourney(financeMgrProfile, allCourses);

    const hasMgmtCourseInAcc = journeyAcc.requiredCourses.some((c) => c.primaryClassification === "MANAGEMENT_LEADERSHIP");
    const hasMgmtCourseInMgr = journeyMgr.requiredCourses.some((c) => c.primaryClassification === "MANAGEMENT_LEADERSHIP");

    assert.equal(hasMgmtCourseInAcc, false, "Accountant should not have general management courses in required path");
    assert.equal(hasMgmtCourseInMgr, true, "Finance Manager must have management courses in required path");
  });

  test("5. Incomplete Profile Handling: Unassigned learners receive only Essential Universal Core and warning", async () => {
    const allCourses = await db.select().from(coursesTable);
    const incompleteProfile: LearnerProfile = { incompleteProfile: true };

    const journey = generateLearningJourney(incompleteProfile, allCourses);
    assert.equal(journey.isProfileIncomplete, true, "isProfileIncomplete flag must be true");
    assert.equal(journey.requiredCourses.length, 5, "Incomplete profile must be assigned exactly 5 Essential Universal courses");
    assert.ok(journey.incompleteProfileWarning?.includes("incomplete"), "Must provide profile completion warning");
  });

  test("6. Explainability: 100% of assigned courses have clear non-technical reasons with zero raw score leakage", async () => {
    const allCourses = await db.select().from(coursesTable);
    const housekeeperProfile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
    };

    const journey = generateLearningJourney(housekeeperProfile, allCourses);

    for (const c of journey.requiredCourses) {
      assert.ok(c.assignmentReason, `Course ${c.courseCode} must have an assignmentReason`);
      assert.equal(c.assignmentReason.includes("score ="), false, "Must not leak raw algorithm scores");
      assert.equal(c.assignmentReason.includes("R_c"), false, "Must not leak technical formula names");
    }
  });

  test("7. Tenant Isolation & Company Priority Booster: Priority adds +20 points without cross-tenant bleed", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_PROF_SERVICES",
      department: "DEP_ADMIN",
      jobFamily: "JF_ADMIN",
      seniority: "SEN_INDIVIDUAL",
    };

    const waterCourse = allCourses.find((c) => c.courseCode === "ELH-04");
    assert.ok(waterCourse, "ELH-04 must exist");

    const baseRes = calculateRelevance(profile, waterCourse);
    const tenant1Res = calculateRelevance(profile, waterCourse, { companyId: 1, strategicPriorityCompetencies: ["COMP_WATER"] });
    const tenant2Res = calculateRelevance(profile, waterCourse, { companyId: 2, strategicPriorityCompetencies: ["COMP_ENERGY"] });

    assert.equal(tenant1Res.score, baseRes.score + 20, "Tenant 1 with water priority must get +20 boost");
    assert.equal(tenant2Res.score, baseRes.score, "Tenant 2 with energy priority must not get water boost");
  });
});
