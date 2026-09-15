import { db, coursesTable, lessonsTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable } from "@workspace/db";
import { notLike, eq, inArray, sql } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine.js";
import fs from "node:fs";
import path from "node:path";

async function runQualityAudit() {
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).orderBy(coursesTable.id);
  const allLessons = await db.select().from(lessonsTable);
  const allQuestions = await db.select().from(quizQuestionsTable).orderBy(quizQuestionsTable.courseId, quizQuestionsTable.orderIndex);
  const allAttempts = await db.select().from(quizAttemptsTable);
  const allEnrollments = await db.select().from(enrollmentsTable);

  console.log(`Auditing ${allQuestions.length} questions across ${allCourses.length} courses...`);

  // Diagnostic items prompts
  const diagnosticPrompts = new Map(DIAGNOSTIC_QUESTION_BANK.map(d => [d.prompt.toLowerCase().trim(), d]));

  // Global question text registry for duplicate detection
  const globalQuestionTextMap = new Map<string, { courseId: number; courseCode: string; questionId: number }[]>();

  for (const q of allQuestions) {
    const norm = q.question.toLowerCase().trim();
    if (!globalQuestionTextMap.has(norm)) {
      globalQuestionTextMap.set(norm, []);
    }
    const c = allCourses.find(c => c.id === q.courseId);
    globalQuestionTextMap.get(norm)!.push({
      courseId: q.courseId,
      courseCode: c?.courseCode || String(q.courseId),
      questionId: q.id,
    });
  }

  // Passing score distribution
  const passingScoreDist: Record<number, number> = {};
  for (const c of allCourses) {
    passingScoreDist[c.passingScore] = (passingScoreDist[c.passingScore] || 0) + 1;
  }
  console.log("Passing score distribution:", passingScoreDist);

  const questionInventory: any[] = [];
  const courseSummaries: any[] = [];

  let totalRecall = 0;
  let totalUnderstand = 0;
  let totalApply = 0;
  let totalAnalyse = 0;
  let totalEvaluate = 0;
  let totalScenarioBased = 0;
  let totalDiagnosticCollisions = 0;
  let totalWithinCourseDuplicates = 0;
  let totalCrossCourseDuplicates = 0;
  let totalMissingOptionFeedback = 0;
  let totalFactualRiskHigh = 0;

  for (const course of allCourses) {
    const courseQuestions = allQuestions.filter(q => q.courseId === course.id);
    const courseLessons = allLessons.filter(l => l.courseId === course.id);
    const courseObjectives = course.learningObjectives || [];

    let cScenario = 0;
    let cApplyOrHigher = 0;
    let cMissingOptionFeedback = 0;
    let cDiagnosticCollisions = 0;
    let cWithinCourseDupes = 0;
    let cCrossCourseDupes = 0;
    let cQualityScoreSum = 0;

    const seenInCourse = new Set<string>();

    for (const q of courseQuestions) {
      const qNorm = q.question.toLowerCase().trim();
      const isWithinCourseDupe = seenInCourse.has(qNorm);
      if (isWithinCourseDupe) {
        cWithinCourseDupes++;
        totalWithinCourseDuplicates++;
      }
      seenInCourse.add(qNorm);

      const crossCourses = (globalQuestionTextMap.get(qNorm) || []).filter(item => item.courseId !== course.id);
      const isCrossCourseDupe = crossCourses.length > 0;
      if (isCrossCourseDupe) {
        cCrossCourseDupes++;
        totalCrossCourseDuplicates++;
      }

      const diagMatch = diagnosticPrompts.get(qNorm);
      const isDiagnosticCollision = !!diagMatch;
      if (isDiagnosticCollision) {
        cDiagnosticCollisions++;
        totalDiagnosticCollisions++;
      }

      // Cognitive level & scenario heuristics
      const lowerQ = q.question.toLowerCase();
      const isScenario = lowerQ.includes("scenario") ||
                         lowerQ.includes("you notice") ||
                         lowerQ.includes("you observe") ||
                         lowerQ.includes("during a") ||
                         lowerQ.includes("a team") ||
                         lowerQ.includes("an employee") ||
                         lowerQ.includes("a supervisor") ||
                         lowerQ.includes("a manager") ||
                         lowerQ.includes("what should") ||
                         lowerQ.includes("how should") ||
                         lowerQ.includes("in this situation");

      if (isScenario) {
        cScenario++;
        totalScenarioBased++;
      }

      let cognitiveLevel = "UNDERSTAND";
      if (isScenario || lowerQ.includes("how should") || lowerQ.includes("what is the best action") || lowerQ.includes("what should the team do")) {
        cognitiveLevel = "APPLY";
      }
      if (lowerQ.includes("evaluate") || lowerQ.includes("prioritise") || lowerQ.includes("calculate") || lowerQ.includes("compare")) {
        cognitiveLevel = "ANALYSE";
      }
      if (lowerQ.startsWith("what is the definition") || lowerQ.startsWith("which acronym") || (!isScenario && (lowerQ.startsWith("what is") || lowerQ.startsWith("which of the following is")))) {
        cognitiveLevel = "RECALL";
      }

      if (cognitiveLevel === "RECALL") totalRecall++;
      else if (cognitiveLevel === "UNDERSTAND") totalUnderstand++;
      else if (cognitiveLevel === "APPLY") { totalApply++; cApplyOrHigher++; }
      else if (cognitiveLevel === "ANALYSE") { totalAnalyse++; cApplyOrHigher++; }
      else if (cognitiveLevel === "EVALUATE") { totalEvaluate++; cApplyOrHigher++; }

      // Option feedback completeness
      const hasFullOptionFeedback = Array.isArray(q.optionFeedback) && q.optionFeedback.length === q.options.length && q.optionFeedback.every(f => typeof f === "string" && f.trim().length > 0);
      if (!hasFullOptionFeedback) {
        cMissingOptionFeedback++;
        totalMissingOptionFeedback++;
      }

      // Factual risk heuristic
      let factualRisk = "LOW";
      if (lowerQ.includes("mare chicose") || lowerQ.includes("mauritius") || lowerQ.includes("ceb") || lowerQ.includes("osha") || lowerQ.includes("hazardous") || lowerQ.includes("legal") || lowerQ.includes("iso 14001") || lowerQ.includes("ghg protocol")) {
        factualRisk = "MEDIUM";
      }

      // Quality score (out of 100)
      let qScore = 80;
      if (isScenario) qScore += 10;
      if (hasFullOptionFeedback) qScore += 10;
      if (!hasFullOptionFeedback) qScore -= 15;
      if (isWithinCourseDupe) qScore -= 30;
      if (isDiagnosticCollision) qScore -= 30;
      if (q.options.length !== 4) qScore -= 20;

      cQualityScoreSum += qScore;

      let remediationRecommendation = "PASS";
      if (!hasFullOptionFeedback && (q.correctExplanation || q.incorrectExplanation)) {
        remediationRecommendation = "REWRITE_FEEDBACK";
      }
      if (isWithinCourseDupe) {
        remediationRecommendation = "DUPLICATE_REPLACEMENT_REQUIRED";
      }
      if (q.options.length !== 4) {
        remediationRecommendation = "REPLACE_DISTRACTORS";
      }

      questionInventory.push({
        questionId: q.id,
        courseId: course.id,
        courseCode: course.courseCode,
        courseTitle: course.title,
        courseVersion: course.version,
        questionOrder: q.orderIndex,
        questionText: q.question,
        optionsCount: q.options.length,
        correctOption: q.correctOption,
        cognitiveLevel,
        isScenarioBased: isScenario,
        hasFullOptionFeedback,
        factualRisk,
        isDiagnosticCollision,
        isWithinCourseDupe,
        isCrossCourseDupe,
        qualityScore: qScore,
        remediationRecommendation,
      });
    }

    const avgQScore = courseQuestions.length > 0 ? Math.round(cQualityScoreSum / courseQuestions.length) : 0;
    const scenarioPct = courseQuestions.length > 0 ? Math.round((cScenario / courseQuestions.length) * 100) : 0;
    const applyPct = courseQuestions.length > 0 ? Math.round((cApplyOrHigher / courseQuestions.length) * 100) : 0;

    let courseReadiness = "ENTERPRISE_READY";
    if (cMissingOptionFeedback > 0 || scenarioPct < 50) {
      courseReadiness = "MINOR_POLISH";
    }
    if (cWithinCourseDupes > 0 || cDiagnosticCollisions > 0 || courseQuestions.length < 8) {
      courseReadiness = "TARGETED_REMEDIATION";
    }

    courseSummaries.push({
      courseId: course.id,
      courseCode: course.courseCode,
      title: course.title,
      version: course.version,
      passingScore: course.passingScore,
      totalQuestions: courseQuestions.length,
      scenarioPct,
      applyPct,
      missingOptionFeedbackCount: cMissingOptionFeedback,
      withinCourseDuplicates: cWithinCourseDupes,
      diagnosticCollisions: cDiagnosticCollisions,
      averageQualityScore: avgQScore,
      readiness: courseReadiness,
    });
  }

  const qualitySummary = {
    totalQuestionsAudited: allQuestions.length,
    totalCanonicalCourses: allCourses.length,
    cognitiveDistribution: {
      RECALL: totalRecall,
      UNDERSTAND: totalUnderstand,
      APPLY: totalApply,
      ANALYSE: totalAnalyse,
      EVALUATE: totalEvaluate,
    },
    scenarioBasedQuestions: totalScenarioBased,
    scenarioPercentage: Math.round((totalScenarioBased / allQuestions.length) * 100),
    totalDiagnosticCollisions,
    totalWithinCourseDuplicates,
    totalCrossCourseDuplicates,
    totalMissingOptionFeedback,
    passingScoreDistribution: passingScoreDist,
    courseReadinessDistribution: courseSummaries.reduce((acc, c) => {
      acc[c.readiness] = (acc[c.readiness] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  console.log("Quality Summary:", JSON.stringify(qualitySummary, null, 2));

  // Write quality inventory JSON
  const outPath = path.resolve(process.cwd(), "src/audits/courseAssessmentQualityInventory15_2_10B.json");
  fs.writeFileSync(outPath, JSON.stringify({ summary: qualitySummary, courses: courseSummaries, questions: questionInventory }, null, 2));
  console.log(`Saved quality inventory to ${outPath}`);
}

runQualityAudit().catch(console.error);
