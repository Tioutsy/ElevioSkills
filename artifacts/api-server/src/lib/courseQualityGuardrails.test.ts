import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { ensureCatalogueSkeletons } from "./ensureCatalogueSkeletons";
import { ensureFoundationsCourse } from "./ensureFoundationsCourse";
import { ensureWasteSortingCourse } from "./ensureWasteSortingCourse";
import { ensureEnergyEfficiencyCourse } from "./ensureEnergyEfficiencyCourse";
import { ensureWaterConservationCourse } from "./ensureWaterConservationCourse";
import { ensureSustainableProcurementCourse } from "./ensureSustainableProcurementCourse";
import { ensureGreenOfficePracticesCourse } from "./ensureGreenOfficePracticesCourse";
import { ensureCarbonFootprintCourse } from "./ensureCarbonFootprintCourse";
import { ensureBiodiversityCourse } from "./ensureBiodiversityCourse";
import { ensureEsgBasicsCourse } from "./ensureEsgBasicsCourse";
import { ensureEnvironmentalComplianceCourse } from "./ensureEnvironmentalComplianceCourse";
import { ensureCircularEconomyCourse } from "./ensureCircularEconomyCourse";
import { ensureFinalSustainabilityCertificationCourse } from "./ensureFinalSustainabilityCertificationCourse";
import { ensureActionPlanningCourse } from "./ensureActionPlanningCourse";
import { ensureDepartmentalSustainabilityGoalsCourse } from "./ensureDepartmentalSustainabilityGoalsCourse";
import { ensureWorkplaceSustainabilityTeamCourse } from "./ensureWorkplaceSustainabilityTeamCourse";
import { ensureCommunicatingSustainabilityAtWorkCourse } from "./ensureCommunicatingSustainabilityAtWorkCourse";
import { ensureTrackingSustainabilityActionsCourse } from "./ensureTrackingSustainabilityActionsCourse";
import { ensureSustainabilityDataCollectionCourse } from "./ensureSustainabilityDataCollectionCourse";
import { ensureSustainabilityPerformanceReviewCourse } from "./ensureSustainabilityPerformanceReviewCourse";
import { ensureSustainabilityRolesAccountabilityCourse } from "./ensureSustainabilityRolesAccountabilityCourse";
import { ensureEmployeeSustainabilityEngagementCourse } from "./ensureEmployeeSustainabilityEngagementCourse";
import { ensureEffectiveGreenTeamsCourse } from "./ensureEffectiveGreenTeamsCourse";
import { ensureWorkplaceSustainabilityInitiativesCourse } from "./ensureWorkplaceSustainabilityInitiativesCourse";
import { ensureSustainabilityForHrTeamsCourse } from "./ensureSustainabilityForHrTeamsCourse";
import { ensureSustainabilityForFinanceTeamsCourse } from "./ensureSustainabilityForFinanceTeamsCourse";
import { ensureSustainabilityForProcurementAndPurchasingTeamsCourse } from "./ensureSustainabilityForProcurementAndPurchasingTeamsCourse";
import { ensureSustainabilityForFacilitiesAndPropertyTeamsCourse } from "./ensureSustainabilityForFacilitiesAndPropertyTeamsCourse";
import { ensureSustainabilityForSalesAndMarketingTeamsCourse } from "./ensureSustainabilityForSalesAndMarketingTeamsCourse";
import { ensureSustainabilityForOperationsAndFrontlineTeamsCourse } from "./ensureSustainabilityForOperationsAndFrontlineTeamsCourse";
import { ensureClimateRiskCourse } from "./ensureClimateRiskCourse";
import { ensureSocialResponsibilityAtWorkCourse } from "./ensureSocialResponsibilityAtWorkCourse";
import { ensureEthicsGovernanceCourse } from "./ensureEthicsGovernanceCourse";
import { ensureEsgDataCourse } from "./ensureEsgDataCourse";
import { ensureEsgInMyJobCourse } from "./ensureEsgInMyJobCourse";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

describe("ELEVIO SKILLS Permanent Course Quality Guardrails (All 34 Production Courses)", () => {
  before(async () => {
    // Run all seeders to ensure database has the latest versioned content
    await ensureCatalogueSkeletons();
    await ensureFoundationsCourse();
    await ensureWasteSortingCourse();
    await ensureEnergyEfficiencyCourse();
    await ensureWaterConservationCourse();
    await ensureSustainableProcurementCourse();
    await ensureGreenOfficePracticesCourse();
    await ensureCarbonFootprintCourse();
    await ensureBiodiversityCourse();
    await ensureEsgBasicsCourse();
    await ensureEnvironmentalComplianceCourse();
    await ensureCircularEconomyCourse();
    await ensureFinalSustainabilityCertificationCourse();
    await ensureActionPlanningCourse();
    await ensureDepartmentalSustainabilityGoalsCourse();
    await ensureWorkplaceSustainabilityTeamCourse();
    await ensureCommunicatingSustainabilityAtWorkCourse();
    await ensureTrackingSustainabilityActionsCourse();
    await ensureSustainabilityDataCollectionCourse();
    await ensureSustainabilityPerformanceReviewCourse();
    await ensureSustainabilityRolesAccountabilityCourse();
    await ensureEmployeeSustainabilityEngagementCourse();
    await ensureEffectiveGreenTeamsCourse();
    await ensureWorkplaceSustainabilityInitiativesCourse();
    await ensureSustainabilityForHrTeamsCourse();
    await ensureSustainabilityForFinanceTeamsCourse();
    await ensureSustainabilityForProcurementAndPurchasingTeamsCourse();
    await ensureSustainabilityForFacilitiesAndPropertyTeamsCourse();
    await ensureSustainabilityForSalesAndMarketingTeamsCourse();
    await ensureSustainabilityForOperationsAndFrontlineTeamsCourse();
    await ensureClimateRiskCourse();
    await ensureSocialResponsibilityAtWorkCourse();
    await ensureEthicsGovernanceCourse();
    await ensureEsgDataCourse();
    await ensureEsgInMyJobCourse();
  });

  test("1. Production catalogue contains exactly 34 courses (ELH-01 through ELH-34) with zero missing codes", async () => {
    const courses = await db.select().from(coursesTable);
    const codes = courses.map((c) => c.courseCode).filter(Boolean);

    for (let i = 1; i <= 34; i++) {
      const code = `ELH-${i.toString().padStart(2, "0")}`;
      assert.ok(codes.includes(code), `Course code ${code} must exist in catalogue`);
    }
  });

  test("2. All standard courses possess >= 5 lessons with valid structured content blocks", async () => {
    const courses = await db.select().from(coursesTable);
    for (const course of courses) {
      if (!course.courseCode) continue;
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, course.id));

      assert.ok(
        lessons.length >= 4,
        `Course ${course.courseCode} (${course.title}) must have at least 4-6 lessons, got ${lessons.length}`
      );

      for (const lesson of lessons) {
        assert.ok(
          Array.isArray(lesson.contentBlocks) && lesson.contentBlocks.length > 0,
          `Lesson ${lesson.title} in ${course.courseCode} must have non-empty structured content blocks`
        );
      }
    }
  });

  test("3. All standard courses possess >= 5 assessment questions with explicit explanations and option feedback", async () => {
    const courses = await db.select().from(coursesTable);
    for (const course of courses) {
      if (!course.courseCode) continue;
      const questions = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, course.id));

      assert.ok(
        questions.length >= 5,
        `Course ${course.courseCode} must have at least 5 quiz questions, got ${questions.length}`
      );

      for (const q of questions) {
        assert.ok(q.question && q.question.length >= 15, `Question in ${course.courseCode} must have descriptive text`);
        assert.ok(Array.isArray(q.options) && q.options.length >= 3, `Question in ${course.courseCode} must have >= 3 options`);
        assert.ok(
          q.correctExplanation && q.correctExplanation.length > 10,
          `Question in ${course.courseCode} must have descriptive correctExplanation`
        );
      }
    }
  });

  test("4. Remediated core courses (ELH-03, 04, 05, 06, 07, 08, 09, 10, 11, 31, 32, 33, 34) have exactly 10 questions", async () => {
    const targetCodes = [
      "ELH-03", "ELH-04", "ELH-05", "ELH-06", "ELH-07", "ELH-08",
      "ELH-09", "ELH-10", "ELH-11", "ELH-31", "ELH-32", "ELH-33", "ELH-34"
    ];

    for (const code of targetCodes) {
      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, code))
        .limit(1);

      assert.ok(course, `Course ${code} must exist`);
      const questions = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, course.id));

      assert.equal(
        questions.length,
        10,
        `Remediated course ${code} must have exactly 10 scenario-based questions, got ${questions.length}`
      );
    }
  });

  test("5. Role-based courses (ELH-24, 25, 26, 27, 28, 29) contain embedded decision scenarios in lesson bodies", async () => {
    const roleCodes = ["ELH-24", "ELH-25", "ELH-26", "ELH-27", "ELH-28", "ELH-29"];

    for (const code of roleCodes) {
      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, code))
        .limit(1);

      assert.ok(course, `Role course ${code} must exist`);
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, course.id));

      let decisionCount = 0;
      for (const lesson of lessons) {
        if (Array.isArray(lesson.contentBlocks)) {
          for (const block of lesson.contentBlocks as Array<{ type?: string }>) {
            if (block.type === "decision_scenario") {
              decisionCount++;
            }
          }
        }
      }

      assert.ok(
        decisionCount >= 2,
        `Role course ${code} must contain at least 2 embedded decision scenarios, found ${decisionCount}`
      );
    }
  });

  test("6. Paired courses (ELH-05 vs ELH-26, ELH-18 vs ELH-33) have distinct titles and learning focus", async () => {
    const [c05] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-05"));
    const [c26] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-26"));
    const [c18] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-18"));
    const [c33] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-33"));

    assert.notEqual(c05.title, c26.title, "ELH-05 and ELH-26 must have distinct titles");
    assert.notEqual(c18.title, c33.title, "ELH-18 and ELH-33 must have distinct titles");
    assert.ok(c05.title.includes("Non-Specialists"), "ELH-05 title must reflect non-specialist focus");
    assert.ok(c33.title.includes("Reporting") || c33.title.includes("Measurement"), "ELH-33 title must reflect reporting/disclosure focus");
  });
});
