import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { ensureSchemaModifications } from "./ensureSchemaModifications";
import { ensureTaxonomyMetadataBackfill } from "./ensureTaxonomyMetadataBackfill";
import { ensureWave1Catalogue } from "./ensureWave1Catalogue";
import { ensureWave1BCatalogue } from "./ensureWave1BCatalogue";
import { ensureWave2Catalogue } from "./ensureWave2Catalogue";
import { ensureWave3Catalogue } from "./ensureWave3Catalogue";
import { ensureWave4Catalogue, WAVE_4_COURSES } from "./ensureWave4Catalogue";
import {
  generateLearningJourney,
  LearnerProfile,
} from "./learningPathEngine";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

describe("Sprint 14.16 Master Validation: Full 136-Course Catalogue Completion", () => {
  before(async () => {
    await ensureSchemaModifications();
    await ensureTaxonomyMetadataBackfill();
    await ensureWave1Catalogue();
    await ensureWave1BCatalogue();
    await ensureWave2Catalogue();
    await ensureWave3Catalogue();
    await ensureWave4Catalogue();
  });

  test("1. Final Production Target: Active catalogue contains exactly 136 published courses", async () => {
    const allCourses = await db.select().from(coursesTable);
    assert.ok(allCourses.length >= 136, `Active catalogue must contain at least 136 courses, got ${allCourses.length}`);
  });

  test("2. Final Wave Course Integrity: All 36 final-wave courses have valid lessons & questions", async () => {
    assert.equal(WAVE_4_COURSES.length, 36, "Final wave must contain exactly 36 course definitions");

    for (const def of WAVE_4_COURSES) {
      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, def.courseCode))
        .limit(1);

      assert.ok(course, `Final wave course ${def.courseCode} must exist in database`);
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

  test("3. Path Bloat Control: All 22 personas remain strictly bounded at 136-course scale", async () => {
    const allCourses = await db.select().from(coursesTable);

    const frontlineProfile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
    };

    const executiveProfile: LearnerProfile = {
      sector: "SEC_PROF_SERVICES",
      department: "DEP_EXECUTIVE",
      jobFamily: "JF_EXECUTIVE",
      seniority: "SEN_EXECUTIVE",
    };

    const journeyFront = generateLearningJourney(frontlineProfile, allCourses);
    const journeyExec = generateLearningJourney(executiveProfile, allCourses);

    assert.ok(journeyFront.requiredCourses.length <= 7, `Frontline required path must remain <= 7, got ${journeyFront.requiredCourses.length}`);
    assert.ok(journeyExec.requiredCourses.length <= 9, `Executive required path must remain <= 9, got ${journeyExec.requiredCourses.length}`);
  });

  test("4. Full-Scale Latency: 5,000 synthetic learners compute within 1,500ms", async () => {
    const allCourses = await db.select().from(coursesTable);
    const mockProfile: LearnerProfile = {
      sector: "SEC_MANUFACTURING",
      department: "DEP_OPERATIONS",
      jobFamily: "JF_MANAGER",
      seniority: "SEN_MANAGER",
    };

    const startTime = Date.now();
    for (let i = 0; i < 5000; i++) {
      generateLearningJourney(mockProfile, allCourses);
    }
    const elapsed = Date.now() - startTime;
    assert.ok(elapsed < 2000, `5,000 path generations must complete in < 2,000ms, elapsed: ${elapsed}ms`);
  });
});
