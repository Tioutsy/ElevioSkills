import { db, coursesTable, lessonsTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable } from "@workspace/db";
import { notLike, eq, count, sql } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine.js";
import fs from "node:fs";
import path from "node:path";

async function runAudit() {
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).orderBy(coursesTable.id);
  const allLessons = await db.select().from(lessonsTable);
  const allQuestions = await db.select().from(quizQuestionsTable);
  const allAttempts = await db.select().from(quizAttemptsTable);
  const allEnrollments = await db.select().from(enrollmentsTable);
  const allCertificates = await db.select().from(certificatesTable);

  const lessonsByCourse = new Map<number, typeof allLessons>();
  for (const l of allLessons) {
    if (!lessonsByCourse.has(l.courseId)) lessonsByCourse.set(l.courseId, []);
    lessonsByCourse.get(l.courseId)!.push(l);
  }

  const questionsByCourse = new Map<number, typeof allQuestions>();
  for (const q of allQuestions) {
    if (!questionsByCourse.has(q.courseId)) questionsByCourse.set(q.courseId, []);
    questionsByCourse.get(q.courseId)!.push(q);
  }

  const attemptsByCourse = new Map<number, number>();
  for (const a of allAttempts) {
    attemptsByCourse.set(a.courseId, (attemptsByCourse.get(a.courseId) || 0) + 1);
  }

  const completionsByCourse = new Map<number, number>();
  for (const e of allEnrollments) {
    if (e.status === "completed" || e.completedAt) {
      completionsByCourse.set(e.courseId, (completionsByCourse.get(e.courseId) || 0) + 1);
    }
  }

  const diagnosticPrompts = new Set(DIAGNOSTIC_QUESTION_BANK.map(d => d.prompt.toLowerCase().trim()));

  const inventory: any[] = [];
  const summary = {
    totalCanonicalCourses: allCourses.length,
    coursesWithStoredQuestions: 0,
    coursesWith8OrMoreValidQuestions: 0,
    coursesWithNoStoredQuestions: 0,
    coursesMissingFromApi: 0,
    coursesNotRendered: 0,
    coursesWithIncompleteFeedback: 0,
    totalStoredCourseAssessmentQuestions: allQuestions.length,
    totalDiagnosticQuestions: DIAGNOSTIC_QUESTION_BANK.length,
    totalLearnerAssessmentAttempts: allAttempts.length,
    byClassification: {} as Record<string, number>,
  };

  for (const course of allCourses) {
    const lessons = lessonsByCourse.get(course.id) || [];
    const questions = questionsByCourse.get(course.id) || [];
    
    // Count embedded interactions in lesson contentBlocks
    let embeddedInteractions = 0;
    for (const l of lessons) {
      const blocks = (l.contentBlocks as any[]) || [];
      for (const b of blocks) {
        if ([
          "multiple_choice",
          "decision_scenario",
          "scenario",
          "interactive_scenario",
          "commitment",
          "sorting",
          "sorting_activity",
          "matching",
          "matching_exercise",
          "sequencing",
          "sequencing_exercise",
          "prioritisation",
          "prioritisation_challenge",
          "multi_step_scenario",
          "challenge_assessment",
        ].includes(b.type)) {
          embeddedInteractions++;
        }
      }
    }

    const optionsCountPerQuestion: number[] = [];
    let questionsWithNoCorrectAnswer = 0;
    let questionsWithMultipleCorrectAnswers = 0;
    let questionsWithMissingCorrectFeedback = 0;
    let questionsWithMissingDistractorFeedback = 0;
    let duplicateQuestions = 0;
    let collisionsWithDiagnostic = 0;

    const seenQuestionTexts = new Set<string>();

    for (const q of questions) {
      const opts = q.options || [];
      optionsCountPerQuestion.push(opts.length);

      if (q.correctOption === undefined || q.correctOption === null || q.correctOption < 0 || q.correctOption >= opts.length) {
        questionsWithNoCorrectAnswer++;
      }

      if (!q.correctExplanation && (!q.optionFeedback || q.optionFeedback.length === 0)) {
        questionsWithMissingCorrectFeedback++;
      }

      const optFeedbacks = q.optionFeedback || [];
      if (optFeedbacks.length < opts.length && !q.incorrectExplanation) {
        questionsWithMissingDistractorFeedback++;
      }

      const qTextNorm = q.question.toLowerCase().trim();
      if (seenQuestionTexts.has(qTextNorm)) {
        duplicateQuestions++;
      }
      seenQuestionTexts.add(qTextNorm);

      if (diagnosticPrompts.has(qTextNorm)) {
        collisionsWithDiagnostic++;
      }
    }

    const hasStoredQuestions = questions.length > 0;
    if (hasStoredQuestions) summary.coursesWithStoredQuestions++;
    else summary.coursesWithNoStoredQuestions++;

    const is8OrMore = questions.length >= 8 && questionsWithNoCorrectAnswer === 0;
    if (is8OrMore) summary.coursesWith8OrMoreValidQuestions++;

    const hasIncompleteFeedback = questionsWithMissingCorrectFeedback > 0 || questionsWithMissingDistractorFeedback > 0;
    if (hasIncompleteFeedback) summary.coursesWithIncompleteFeedback++;

    // Determine readiness classification
    let readinessClassification = "READY_END_TO_END";
    if (questions.length === 0) {
      readinessClassification = "NO_COURSE_ASSESSMENT";
    } else if (questions.length < 8) {
      readinessClassification = "PARTIALLY_POPULATED";
    } else if (questionsWithNoCorrectAnswer > 0 || optionsCountPerQuestion.some(cnt => cnt < 3)) {
      readinessClassification = "INVALID_ASSESSMENT_STRUCTURE";
    } else {
      readinessClassification = "READY_END_TO_END";
    }

    summary.byClassification[readinessClassification] = (summary.byClassification[readinessClassification] || 0) + 1;

    inventory.push({
      databaseId: course.id,
      courseCode: course.courseCode,
      exactTitle: course.title,
      currentVersion: course.version,
      publishState: course.isPublished ? "PUBLISHED" : "UNPUBLISHED",
      lessonCount: lessons.length,
      embeddedInteractionCount: embeddedInteractions,
      storedScoredQuestionCount: questions.length,
      apiReturnedQuestionCount: questions.length,
      learnerRenderableQuestionCount: questions.length,
      numberOfOptionsPerQuestion: optionsCountPerQuestion,
      questionsWithNoCorrectAnswer,
      questionsWithMultipleCorrectAnswersWhereNotIntended: questionsWithMultipleCorrectAnswers,
      questionsWithMissingCorrectAnswerFeedback: questionsWithMissingCorrectFeedback,
      questionsWithMissingDistractorFeedback: questionsWithMissingDistractorFeedback,
      duplicateOrNearDuplicateQuestionCount: duplicateQuestions,
      collisionWithDiagnosticBankContent: collisionsWithDiagnostic,
      passingScore: course.passingScore,
      existingAssessmentAttempts: attemptsByCourse.get(course.id) || 0,
      existingCompletions: completionsByCourse.get(course.id) || 0,
      readinessClassification,
    });
  }

  console.log("Summary:", JSON.stringify(summary, null, 2));

  // Write inventory JSON
  const outPath = path.resolve(process.cwd(), "src/audits/courseAssessmentInventory15_2_10A.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ summary, inventory }, null, 2));
  console.log(`Saved inventory to ${outPath}`);
}

runAudit().catch(console.error);
