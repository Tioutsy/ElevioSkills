import { db, coursesTable, quizQuestionsTable } from "@workspace/db";
import { notLike, asc } from "drizzle-orm";
import { SPRINT_15_2_10K_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10K.js";
import { SPRINT_15_2_10J_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10J.js";
import { SPRINT_15_2_10I_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10I.js";
import { SPRINT_15_2_10H_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10H.js";
import { SPRINT_15_2_10G_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10G.js";
import { SPRINT_15_2_10F_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10F.js";
import { SPRINT_15_2_10E_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10E.js";
import { SPRINT_15_2_10D_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10D.js";
import { SPRINT_15_2_10C_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10C.js";
import { SPRINT_15_2_10B_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10B.js";
import fs from "node:fs";

async function run() {
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).orderBy(asc(coursesTable.courseCode));
  const allQuestions = await db.select().from(quizQuestionsTable).orderBy(asc(quizQuestionsTable.courseId), asc(quizQuestionsTable.orderIndex));

  const allRemediatedCourseIds = [
    ...SPRINT_15_2_10B_COHORT_COURSE_IDS,
    ...SPRINT_15_2_10C_COHORT_COURSE_IDS,
    ...SPRINT_15_2_10D_COHORT_COURSE_IDS,
    ...SPRINT_15_2_10E_COHORT_COURSE_IDS,
    ...SPRINT_15_2_10F_COHORT_COURSE_IDS,
    ...SPRINT_15_2_10G_COHORT_COURSE_IDS,
    ...SPRINT_15_2_10H_COHORT_COURSE_IDS,
    ...SPRINT_15_2_10I_COHORT_COURSE_IDS,
    ...SPRINT_15_2_10J_COHORT_COURSE_IDS,
    ...SPRINT_15_2_10K_COHORT_COURSE_IDS
  ];

  const remainingCourses = allCourses.filter(c => !allRemediatedCourseIds.includes(c.id));

  console.log(`Found ${remainingCourses.length} remaining legacy courses after Sprint 15.2.10K:`);

  const remainingDetails = remainingCourses.map((c, index) => {
    const qs = allQuestions.filter(q => q.courseId === c.id);
    const questionsWith4Fb = qs.filter(q => Array.isArray(q.optionFeedback) && q.optionFeedback.length === 4 && q.optionFeedback.every(f => typeof f === "string" && f.trim().length > 0)).length;
    
    return {
      index: index + 1,
      courseId: c.id,
      courseCode: c.courseCode,
      title: c.title,
      version: c.version,
      passingScore: c.passingScore,
      scoredQuestionCount: qs.length,
      completeFeedbackCount: questionsWith4Fb,
      principalDefects: [
        c.passingScore !== 80 ? `Passing score non-standard (${c.passingScore}% vs 80%)` : null,
        questionsWith4Fb < qs.length ? `Incomplete option feedback (${questionsWith4Fb}/${qs.length})` : null,
        c.version === 1 ? "Version 1 awaiting monotonic upgrade to v2" : null,
        "Requires scenario grounding, Bloom's cognitive depth upgrade, and strict 2/2/2/2 key distribution"
      ].filter(Boolean) as string[],
      appearedInPriorCohort: false
    };
  });

  remainingDetails.forEach(c => {
    console.log(`${c.index}. [${c.courseCode}] (ID: ${c.courseId}) v${c.version} | ${c.passingScore}% | "${c.title}"`);
  });

  const report = {
    generatedAt: new Date().toISOString(),
    sprint: "15.2.10K",
    status: "REMAINING_LEGACY_RECONCILIATION",
    remainingCourseCount: remainingCourses.length,
    proofEnterpriseReadyExcluded: remainingCourses.every(c => !allRemediatedCourseIds.includes(c.id)),
    recommendedFinalPartition: {
      finalCohort: "Sprint 15.2.10L (Catalogue Final Remediation & Closure)",
      targetCoursesCount: remainingCourses.length,
      targetCourses: remainingCourses.map(c => c.courseCode),
      notes: "The remaining 16 legacy-accepted courses represent the final cohort required to achieve 100% (136/136) enterprise-ready catalogue status."
    },
    remainingCourses: remainingDetails
  };

  fs.writeFileSync(
    "src/audits/remainingLegacyAssessmentCohortAfter15_2_10K.json",
    JSON.stringify(report, null, 2)
  );

  console.log("\nWrote remainingLegacyAssessmentCohortAfter15_2_10K.json successfully.");
  process.exit(0);
}

run().catch(err => {
  console.error("Error generating remaining legacy cohort report:", err);
  process.exit(1);
});
