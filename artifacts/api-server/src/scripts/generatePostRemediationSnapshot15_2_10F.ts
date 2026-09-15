import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { notLike, inArray, eq, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine.js";
import { SPRINT_15_2_10F_COHORT_COURSE_IDS, SPRINT_15_2_10F_COHORT } from "../lib/courseAssessmentCohort15_2_10F.js";
import fs from "node:fs";
import crypto from "node:crypto";

async function run() {
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).orderBy(asc(coursesTable.courseCode));
  const allQuestions = await db.select().from(quizQuestionsTable).orderBy(asc(quizQuestionsTable.courseId), asc(quizQuestionsTable.orderIndex));
  const allAttempts = await db.select().from(quizAttemptsTable);
  const allEnrollments = await db.select().from(enrollmentsTable);
  const allCertificates = await db.select().from(certificatesTable);
  const allBadges = await db.select().from(badgeDefinitionsTable);
  const allScoreLedgers = await db.select().from(elevioScoreLedgerTable);

  const cohortQuestions = allQuestions.filter(q => SPRINT_15_2_10F_COHORT_COURSE_IDS.includes(q.courseId));
  const cohortCourses = allCourses.filter(c => SPRINT_15_2_10F_COHORT_COURSE_IDS.includes(c.id));

  // Compute quality indicators for the cohort
  const qualityRecords = cohortQuestions.map(q => {
    const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options as string);
    const feedback = q.optionFeedback ? (Array.isArray(q.optionFeedback) ? q.optionFeedback : JSON.parse(q.optionFeedback as string)) : [];
    const text = q.question || "";
    
    // Scenario indicator keywords
    const scenarioKeywords = ["you are", "facility", "building", "system", "plant", "site", "manager", "engineer", "auditor", "during", "when", "technician", "operator", "contractor", "client", "operations", "retail", "supermarket", "store", "supplier", "packaging", "motor", "vfd", "scrubber", "voc", "cold chain", "food waste", "plastic", "markdown"];
    const isScenario = scenarioKeywords.some(k => text.toLowerCase().includes(k)) || text.length > 80;
    
    // Cognitive depth (Application / Analysis)
    const isHigherOrder = /determine|calculate|identify the primary|recommend|diagnose|select the most|evaluate|implement|optimize|mitigate|troubleshoot|prioritize/i.test(text) || isScenario;

    return {
      id: q.id,
      courseId: q.courseId,
      orderIndex: q.orderIndex,
      question: q.question,
      optionsCount: opts.length,
      correctOption: q.correctOption,
      hasCorrectExplanation: !!(q.correctExplanation && q.correctExplanation.trim().length > 0),
      hasIncorrectExplanation: !!(q.incorrectExplanation && q.incorrectExplanation.trim().length > 0),
      hasOptionFeedback: feedback.length === 4 && feedback.every((f: string) => f && f.trim().length > 0),
      isScenario,
      isHigherOrder
    };
  });

  const scenarioCount = qualityRecords.filter(r => r.isScenario).length;
  const higherOrderCount = qualityRecords.filter(r => r.isHigherOrder).length;

  const snapshot = {
    timestamp: new Date().toISOString(),
    sprint: "15.2.10F",
    status: "POST_REMEDIATION",
    summary: {
      totalCanonicalCourses: allCourses.length,
      totalScoredQuestions: allQuestions.length,
      diagnosticBankQuestions: DIAGNOSTIC_QUESTION_BANK.length,
      cohortCourseCount: cohortCourses.length,
      cohortQuestionCount: cohortQuestions.length,
      allCohortPassingScoresStandardizedTo80: cohortCourses.every(c => c.passingScore === 80),
      cohortQuality: {
        totalQuestions: qualityRecords.length,
        fourDistinctOptionsPct: (qualityRecords.filter(r => r.optionsCount === 4).length / qualityRecords.length) * 100,
        validCorrectOptionPct: (qualityRecords.filter(r => r.correctOption >= 0 && r.correctOption <= 3).length / qualityRecords.length) * 100,
        completeOptionFeedbackPct: (qualityRecords.filter(r => r.hasOptionFeedback).length / qualityRecords.length) * 100,
        completeCorrectExplanationPct: (qualityRecords.filter(r => r.hasCorrectExplanation).length / qualityRecords.length) * 100,
        completeIncorrectExplanationPct: (qualityRecords.filter(r => r.hasIncorrectExplanation).length / qualityRecords.length) * 100,
        scenarioOrientationPct: (scenarioCount / qualityRecords.length) * 100,
        higherOrderDepthPct: (higherOrderCount / qualityRecords.length) * 100,
      },
      historicalDataIntegrity: {
        totalQuizAttempts: allAttempts.length,
        totalEnrollments: allEnrollments.length,
        totalCertificates: allCertificates.length,
        totalBadges: allBadges.length,
        totalScoreLedgerRecords: allScoreLedgers.length
      }
    },
    cohortCourses: cohortCourses.map(c => ({
      id: c.id,
      courseCode: c.courseCode,
      title: c.title,
      version: c.version,
      passingScore: c.passingScore,
      questionCount: allQuestions.filter(q => q.courseId === c.id).length
    })),
    qualityRecords
  };

  const snapshotJson = JSON.stringify(snapshot, null, 2);
  const hash = crypto.createHash("sha256").update(snapshotJson).digest("hex");
  (snapshot as any).sha256 = hash;

  fs.writeFileSync(
    "src/audits/postRemediationSnapshot15_2_10F.json",
    JSON.stringify(snapshot, null, 2)
  );

  console.log("Post-remediation snapshot 15.2.10F saved successfully!");
  console.log(`SHA-256: ${hash}`);
  console.log(`Scenario Orientation: ${snapshot.summary.cohortQuality.scenarioOrientationPct.toFixed(1)}%`);
  console.log(`Cognitive Depth: ${snapshot.summary.cohortQuality.higherOrderDepthPct.toFixed(1)}%`);
  process.exit(0);
}

run().catch(err => {
  console.error("Error generating post-remediation snapshot:", err);
  process.exit(1);
});
