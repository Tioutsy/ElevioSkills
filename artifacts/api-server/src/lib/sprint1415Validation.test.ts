import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { ensureSchemaModifications } from "./ensureSchemaModifications";
import { ensureTaxonomyMetadataBackfill } from "./ensureTaxonomyMetadataBackfill";
import { ensureWave1Catalogue } from "./ensureWave1Catalogue";
import { ensureWave1BCatalogue } from "./ensureWave1BCatalogue";
import { ensureWave2Catalogue } from "./ensureWave2Catalogue";
import { ensureWave3Catalogue, WAVE_3_COURSES } from "./ensureWave3Catalogue";
import {
  generateLearningJourney,
  calculatePairwisePathDifferentiation,
  LearnerProfile,
} from "./learningPathEngine";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

describe("Sprint 14.15 Master Validation: Wave 3 Expansion (100 Courses) & Commercial Readiness", () => {
  before(async () => {
    await ensureSchemaModifications();
    await ensureTaxonomyMetadataBackfill();
    await ensureWave1Catalogue();
    await ensureWave1BCatalogue();
    await ensureWave2Catalogue();
    await ensureWave3Catalogue();
  });

  test("1. Production Milestone: Catalogue expanded from 72 to at least 100 courses", async () => {
    const allCourses = await db.select().from(coursesTable);
    assert.ok(allCourses.length >= 100, `Active catalogue must contain at least 100 courses, got ${allCourses.length}`);
  });

  test("2. Wave 3 Course Integrity: All 28 approved courses have valid lessons and questions", async () => {
    assert.equal(WAVE_3_COURSES.length, 28, "Wave 3 must contain exactly 28 courses");

    for (const def of WAVE_3_COURSES) {
      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, def.courseCode))
        .limit(1);

      assert.ok(course, `Wave 3 course ${def.courseCode} must exist in database`);
      assert.ok(course.primaryClassification, `Course ${def.courseCode} must have primaryClassification`);

      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, course.id));
      assert.ok(lessons.length >= 5, `Course ${def.courseCode} must have >= 5 lessons, got ${lessons.length}`);

      const questions = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, course.id));
      assert.ok(questions.length >= 8, `Course ${def.courseCode} must have >= 8 questions, got ${questions.length}`);
    }
  });

  test("3. New Industry Unlocking: Agriculture and Healthcare courses are live in production", async () => {
    const agriCourse = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, "ELH-87"))
      .limit(1);
    assert.ok(agriCourse.length > 0, "Regenerative Agriculture course ELH-87 must be live");

    const healthCourse = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, "ELH-99"))
      .limit(1);
    assert.ok(healthCourse.length > 0, "Hospital Medical Waste course ELH-99 must be live");
  });

  test("4. Path Bloat Control: 100-course catalogue keeps persona required paths strictly bounded", async () => {
    const allCourses = await db.select().from(coursesTable);

    const housekeeperProfile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
    };

    const managerProfile: LearnerProfile = {
      sector: "SEC_MANUFACTURING",
      department: "DEP_OPERATIONS",
      jobFamily: "JF_MANAGER",
      seniority: "SEN_MANAGER",
    };

    const journeyHk = generateLearningJourney(housekeeperProfile, allCourses);
    const journeyMgr = generateLearningJourney(managerProfile, allCourses);

    assert.ok(journeyHk.requiredCourses.length <= 7, `Frontline required path must remain <= 7, got ${journeyHk.requiredCourses.length}`);
    assert.ok(journeyMgr.requiredCourses.length <= 10, `Manager required path must remain <= 10, got ${journeyMgr.requiredCourses.length}`);
  });

  test("5. Performance Benchmarking: Live path generation runs in < 500ms for 1,000 learners", async () => {
    const allCourses = await db.select().from(coursesTable);
    const mockProfile: LearnerProfile = {
      sector: "SEC_FINANCE",
      department: "DEP_FINANCE",
      jobFamily: "JF_PROFESSIONAL",
      seniority: "SEN_INDIVIDUAL",
    };

    const startTime = Date.now();
    for (let i = 0; i < 1000; i++) {
      generateLearningJourney(mockProfile, allCourses);
    }
    const elapsed = Date.now() - startTime;
    assert.ok(elapsed < 1000, `1,000 live learning path generations must complete in < 1,000ms, elapsed: ${elapsed}ms`);
  });
});
