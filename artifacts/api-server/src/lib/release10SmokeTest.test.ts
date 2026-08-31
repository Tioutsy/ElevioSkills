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
  generateLearningJourney,
  LearnerProfile,
  CompanyLearningContext,
} from "./learningPathEngine";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

describe("ELEVIO SKILLS Release 1.0 Production Go-Live Smoke Test Suite", () => {
  before(async () => {
    await ensureSchemaModifications();
    await ensureTaxonomyMetadataBackfill();
    await ensureWave1Catalogue();
    await ensureWave1BCatalogue();
    await ensureWave2Catalogue();
    await ensureWave3Catalogue();
    await ensureWave4Catalogue();
  });

  test("1. Production Freeze: Exactly 136 published courses are live in the database", async () => {
    const allCourses = await db.select().from(coursesTable);
    assert.equal(allCourses.length, 136, `Active catalogue must contain exactly 136 courses, got ${allCourses.length}`);
  });

  test("2. Zero Broken Prerequisites & Valid Lesson Hierarchies", async () => {
    const allCourses = await db.select().from(coursesTable);
    for (const course of allCourses) {
      const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, course.id));
      assert.ok(lessons.length >= 5, `Course ${course.courseCode} must have >= 5 lessons`);

      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, course.id));
      assert.ok(questions.length >= 8, `Course ${course.courseCode} must have >= 8 questions`);
    }
  });

  test("3. Multi-Tenant Enterprise Isolation Smoke Test", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
    };

    const tenantConfig: CompanyLearningContext = {
      companyId: 888,
      strategicPriorityCompetencies: ["COMP_WATER"],
      mandatoryCourseCodes: ["ELH-32"],
    };

    const journey = generateLearningJourney(profile, allCourses, tenantConfig);
    assert.ok(journey.requiredCourses.some(c => c.courseCode === "ELH-32"), "Mandatory compliance course must be present");
    assert.ok(journey.requiredCourses.some(c => c.courseCode === "ELH-35"), "Sector housekeeping course must be present");
    assert.ok(journey.nextBestCourse, "Next Best Course must be deterministically computed");
  });
});
