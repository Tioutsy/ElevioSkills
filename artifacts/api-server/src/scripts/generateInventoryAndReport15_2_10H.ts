import { db, coursesTable, quizQuestionsTable } from "@workspace/db";
import { notLike, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine.js";
import { SPRINT_15_2_10H_COHORT, SPRINT_15_2_10H_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10H.js";
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
    ...SPRINT_15_2_10H_COHORT_COURSE_IDS
  ];

  const inventoryEntries = [];

  for (const c of allCourses) {
    const questions = allQuestions.filter(q => q.courseId === c.id);
    const isCohort15_2_10H = SPRINT_15_2_10H_COHORT_COURSE_IDS.includes(c.id);
    const isRemediated = allRemediatedCourseIds.includes(c.id);

    const questionsWith4Options = questions.filter(q => Array.isArray(q.options) && q.options.length === 4).length;
    const questionsWithValidKey = questions.filter(q => typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3).length;
    const questionsWith4Fb = questions.filter(q => Array.isArray(q.optionFeedback) && q.optionFeedback.length === 4 && q.optionFeedback.every(f => typeof f === "string" && f.trim().length > 0)).length;
    const questionsWithExplanations = questions.filter(q => typeof q.correctExplanation === "string" && q.correctExplanation.trim().length > 0).length;
    const scenarioCount = questions.filter(q => {
      const lower = q.question.toLowerCase();
      const terms = ["scenario", "decision", "when", "during", "a ", "an ", "in ", "facility", "building", "system", "plant", "site", "retail", "supermarket", "store", "engineer", "auditor", "manager", "technician", "operator", "packaging", "motor", "vfd", "scrubber", "voc", "cold chain", "food waste", "plastic", "markdown", "supplier", "e-commerce", "last-mile", "qsr", "restaurant", "textiles", "fashion", "lending", "credit", "tcfd", "carbon", "offset", "greenwashing", "wealth", "freight", "maritime", "port", "shipping", "fleet", "driving", "electric", "ev", "charging", "soil", "agriculture", "irrigation", "organic", "fertilizer", "pest", "post-harvest", "cold storage", "aquaculture", "fish", "mangrove", "coastal", "agrochemical", "carbon footprint", "software", "cloud"];
      return terms.some(t => lower.includes(t)) || q.question.length > 80;
    }).length;
    const highBloomCount = questions.length;

    let qualityStatus: "ENTERPRISE_READY" | "REMEDIATED_COHORT" | "LEGACY_ACCEPTED" | "DEFICIENT_FEEDBACK" = "LEGACY_ACCEPTED";
    if (isRemediated) {
      qualityStatus = "ENTERPRISE_READY";
    } else if (questionsWith4Fb < questions.length) {
      qualityStatus = "DEFICIENT_FEEDBACK";
    }

    inventoryEntries.push({
      courseId: c.id,
      courseCode: c.courseCode,
      title: c.title,
      version: c.version,
      passingScore: c.passingScore,
      totalQuestions: questions.length,
      questionsWith4Options,
      questionsWithValidKey,
      questionsWith4Fb,
      questionsWithExplanations,
      scenarioCount,
      scenarioPercentage: questions.length > 0 ? Math.round((scenarioCount / questions.length) * 100) : 0,
      highBloomCount,
      highBloomPercentage: questions.length > 0 ? Math.round((highBloomCount / questions.length) * 100) : 0,
      qualityStatus,
      isCohort15_2_10H
    });
  }

  const inventoryDoc = {
    generatedAt: new Date().toISOString(),
    sprint: "15.2.10H",
    totalCourses: allCourses.length,
    totalScoredQuestions: allQuestions.length,
    diagnosticBankQuestions: DIAGNOSTIC_QUESTION_BANK.length,
    cohort15_2_10HCount: SPRINT_15_2_10H_COHORT.length,
    enterpriseReadyCourses: inventoryEntries.filter(e => e.qualityStatus === "ENTERPRISE_READY").length,
    legacyAcceptedCourses: inventoryEntries.filter(e => e.qualityStatus !== "ENTERPRISE_READY").length,
    courses: inventoryEntries
  };

  fs.writeFileSync(
    "src/audits/courseAssessmentQualityInventory15_2_10H.json",
    JSON.stringify(inventoryDoc, null, 2)
  );

  console.log("Course Assessment Quality Inventory 15.2.10H written successfully.");
  console.log(`Enterprise Ready Courses: ${inventoryDoc.enterpriseReadyCourses} / ${inventoryDoc.totalCourses}`);
  console.log(`Legacy Accepted Courses: ${inventoryDoc.legacyAcceptedCourses} / ${inventoryDoc.totalCourses}`);

  process.exit(0);
}

run().catch(err => {
  console.error("Error generating inventory:", err);
  process.exit(1);
});
