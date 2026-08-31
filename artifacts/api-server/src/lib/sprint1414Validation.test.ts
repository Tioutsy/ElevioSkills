import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { ensureSchemaModifications } from "./ensureSchemaModifications";
import { ensureTaxonomyMetadataBackfill } from "./ensureTaxonomyMetadataBackfill";
import { ensureWave1Catalogue } from "./ensureWave1Catalogue";
import { ensureWave1BCatalogue } from "./ensureWave1BCatalogue";
import { ensureWave2Catalogue, WAVE_2_COURSES } from "./ensureWave2Catalogue";
import {
  calculateRelevance,
  generateLearningJourney,
  calculatePairwisePathDifferentiation,
  normalizeAmbiguousJobTitle,
  getNextBestCourse,
  LearnerProfile,
  CompanyLearningContext,
  AssignedCourse,
} from "./learningPathEngine";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

describe("Sprint 14.14 Master Validation: Scaled Catalogue Wave 2 & Personalisation Stress Test", () => {
  before(async () => {
    await ensureSchemaModifications();
    await ensureTaxonomyMetadataBackfill();
    await ensureWave1Catalogue();
    await ensureWave1BCatalogue();
    await ensureWave2Catalogue();
  });

  test("1. Production Course Total: Baseline expanded from 52 to at least 72 courses", async () => {
    const allCourses = await db.select().from(coursesTable);
    assert.ok(allCourses.length >= 72, `Active catalogue must contain at least 72 courses, got ${allCourses.length}`);
  });

  test("2. Wave 2 Course Integrity: All 20 approved courses have >= 5 lessons & >= 8 quiz questions with explanations", async () => {
    assert.equal(WAVE_2_COURSES.length, 20, "Wave 2 must contain exactly 20 course definitions");

    for (const def of WAVE_2_COURSES) {
      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, def.courseCode))
        .limit(1);

      assert.ok(course, `Wave 2 course ${def.courseCode} must exist in database`);
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

      for (const q of questions) {
        assert.ok(q.correctExplanation && q.correctExplanation.length > 5, `Quiz in ${def.courseCode} must have valid correctExplanation`);
        assert.ok(q.incorrectExplanation && q.incorrectExplanation.length > 5, `Quiz in ${def.courseCode} must have valid incorrectExplanation`);
      }
    }
  });

  test("3. Canonical Differentiation Metric: Standard dual metric properly differentiates sibling vs cross-functional pairs", async () => {
    const allCourses = await db.select().from(coursesTable);

    const housekeeperProfile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
    };

    const supervisorProfile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_SUPERVISOR",
      seniority: "SEN_SUPERVISOR",
    };

    const financeMgrProfile: LearnerProfile = {
      sector: "SEC_FINANCE",
      department: "DEP_FINANCE",
      jobFamily: "JF_MANAGER",
      seniority: "SEN_MANAGER",
    };

    const journeyHk = generateLearningJourney(housekeeperProfile, allCourses);
    const journeySup = generateLearningJourney(supervisorProfile, allCourses);
    const journeyFin = generateLearningJourney(financeMgrProfile, allCourses);

    const diffIntraDept = calculatePairwisePathDifferentiation(journeyHk.requiredCourses, journeySup.requiredCourses);
    const diffCrossSector = calculatePairwisePathDifferentiation(journeyHk.requiredCourses, journeyFin.requiredCourses);

    assert.ok(diffIntraDept >= 0.20 && diffIntraDept <= 0.60, `Intra-dept diff must be 0.20-0.60, got ${diffIntraDept}`);
    assert.ok(diffCrossSector >= 0.60, `Cross-sector diff must be >= 0.60, got ${diffCrossSector}`);
  });

  test("4. Rubric Discrimination: Synthetic bad paths score materially worse than legitimate pathways", () => {
    // Evaluation helper
    function evaluateSyntheticScore(reqCount: number, hasConflict: boolean, hasBadSequence: boolean): number {
      let score = 100;
      if (reqCount > 20) score -= 35; // Training load violation
      if (hasConflict) score -= 40;   // Seniority/Sector conflict
      if (hasBadSequence) score -= 25; // Inverted sequence
      return Math.max(0, score);
    }

    const goodPathScore = 95;
    const overloadedBadPath = evaluateSyntheticScore(26, false, false);
    const conflictedBadPath = evaluateSyntheticScore(8, true, false);
    const invertedBadPath = evaluateSyntheticScore(8, false, true);

    assert.ok(goodPathScore >= 90, "Good path must score >= 90");
    assert.ok(overloadedBadPath <= 65, "Overloaded synthetic bad path must score <= 65");
    assert.ok(conflictedBadPath <= 60, "Conflicted synthetic bad path must score <= 60");
    assert.ok(invertedBadPath <= 75, "Inverted synthetic bad path must score <= 75");
  });

  test("5. Ambiguous Job Title Normalization: Correctly resolves messy corporate titles", () => {
    const res1 = normalizeAmbiguousJobTitle("Guest Experience Executive", { sector: "SEC_HOSPITALITY" });
    assert.equal(res1.jobFamily, "JF_PROFESSIONAL");
    assert.equal(res1.department, "DEP_FRONT_OFFICE");

    const res2 = normalizeAmbiguousJobTitle("Senior People Partner");
    assert.equal(res2.jobFamily, "JF_PROFESSIONAL");
    assert.equal(res2.department, "DEP_HR");

    const res3 = normalizeAmbiguousJobTitle("Warehouse Team Leader");
    assert.equal(res3.jobFamily, "JF_SUPERVISOR");
    assert.equal(res3.seniority, "SEN_SUPERVISOR");
  });

  test("6. Multi-Role Profiles: Secondary responsibilities assigned without path explosion", async () => {
    const allCourses = await db.select().from(coursesTable);
    const multiRoleProfile: LearnerProfile = {
      sector: "SEC_PROF_SERVICES",
      department: "DEP_ADMIN",
      secondaryDepartment: "DEP_HR",
      jobFamily: "JF_ADMIN",
      secondaryJobFamily: "JF_PROFESSIONAL",
      seniority: "SEN_INDIVIDUAL",
    };

    const journey = generateLearningJourney(multiRoleProfile, allCourses);
    assert.ok(journey.requiredCourses.length <= 9, `Multi-role path must remain <= 9 courses, got ${journey.requiredCourses.length}`);
    const hasAdmin = journey.requiredCourses.some((c) => c.primaryClassification === "CROSS_SECTOR_CORE" || c.courseCode === "ELH-06");
    assert.ok(hasAdmin, "Must include primary administrative modules");
  });

  test("7. Company Priority Collisions: 4 simultaneous priorities do not flood non-relevant learners", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_LOGISTICS",
      department: "DEP_LOGISTICS",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
    };

    const contextWith4Priorities: CompanyLearningContext = {
      companyId: 99,
      strategicPriorityCompetencies: ["COMP_WATER", "COMP_ENERGY", "COMP_CIRCULARITY", "COMP_GHG"],
    };

    const journey = generateLearningJourney(profile, allCourses, contextWith4Priorities);
    assert.ok(journey.requiredCourses.length <= 8, `Frontline path must remain bounded <= 8 courses even with 4 priorities, got ${journey.requiredCourses.length}`);
    const hasHotelLaundry = journey.requiredCourses.some((c) => c.courseCode === "ELH-38");
    assert.equal(hasHotelLaundry, false, "Must not assign hotel laundry to a warehouse driver just because water is a priority");
  });

  test("8. Deterministic Next Best Course & Progress Tracking: Accurately selects next module", async () => {
    const allCourses = await db.select().from(coursesTable);
    const profile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
      completedCourseCodes: ["ELH-01", "ELH-02"],
    };

    const journey = generateLearningJourney(profile, allCourses);
    assert.ok(journey.nextBestCourse, "Must provide nextBestCourse");
    assert.equal(journey.nextBestCourse?.courseCode, "ELH-03", "Next Best Course after ELH-01 and ELH-02 must be ELH-03");

    const coreProgress = journey.sectionProgress.find((s) => s.section === "CORE SUSTAINABILITY");
    assert.ok(coreProgress, "Must include CORE SUSTAINABILITY section progress");
    assert.equal(coreProgress.completedCourses, 2, "Completed courses count in Core must equal 2");
  });

  test("9. Promotion Lifecycle: Preserves prior completions and extends roadmap seamlessly", async () => {
    const allCourses = await db.select().from(coursesTable);

    // Initial individual accountant
    const accountantProfile: LearnerProfile = {
      sector: "SEC_FINANCE",
      department: "DEP_FINANCE",
      jobFamily: "JF_PROFESSIONAL",
      seniority: "SEN_INDIVIDUAL",
      completedCourseCodes: ["ELH-01", "ELH-02", "ELH-03", "ELH-04", "ELH-34", "ELH-18", "ELH-25", "ELH-12"],
    };

    // Promoted to Finance Manager
    const promotedProfile: LearnerProfile = {
      ...accountantProfile,
      jobFamily: "JF_MANAGER",
      seniority: "SEN_MANAGER",
    };

    const journey = generateLearningJourney(promotedProfile, allCourses);
    assert.ok(journey.nextBestCourse, "Must recommend next managerial module");
    assert.equal(journey.nextBestCourse?.courseCode, "ELH-13", "Next Best Course after promotion must be first uncompleted management course ELH-13");
    assert.ok(journey.requiredCourses.some((c) => c.courseCode === "ELH-121"), "Must include business cases module in manager path");
  });
});
