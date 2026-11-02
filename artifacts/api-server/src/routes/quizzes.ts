import { Router } from "express";
import { db } from "@workspace/db";
import {
  quizQuestionsTable,
  quizAttemptsTable,
  certificatesTable,
  coursesTable,
  enrollmentsTable,
  employeesTable,
  companiesTable,
  courseAssignmentsTable,
} from "@workspace/db";
import { and, desc, eq, inArray, or } from "drizzle-orm";
import { SubmitQuizBody } from "@workspace/api-zod";
import { randomUUID } from "crypto";
import { getCompanyAccess, sendHttpError } from "../lib/access";
import { syncEmployeeLearningStats } from "../lib/lmsData";
import {
  evaluateQuizAchievements,
  evaluateCourseCompletionAchievements,
  awardCourseBadge,
  evaluateCourseMilestones,
} from "../lib/achievementsService";
import { awardQuizPassScore, awardCourseCompletionScore } from "../lib/scoringService";
import { evaluateEmployeeChallengeProgress } from "../lib/challengeService";

const router = Router();

router.get("/:courseId/quiz", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.courseId) ? req.params.courseId[0] : req.params.courseId;
  const courseId = parseInt(raw, 10);
  if (isNaN(courseId)) {
    res.status(400).json({ error: "Invalid courseId" });
    return;
  }

  const [course] = await db
    .select({
      isPublished: coursesTable.isPublished,
      courseCode: coursesTable.courseCode,
      version: coursesTable.version,
    })
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));

  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }

  let accessContext = null;
  try {
    accessContext = await getCompanyAccess(req);
  } catch (e) {
    // Ignore auth errors for guest/learner accesses
  }

  const isPlatformAdmin = accessContext?.role === "platform_admin";
  if (!course.isPublished && !isPlatformAdmin) {
    res.status(403).json({ error: "Cannot access quiz for an unpublished course" });
    return;
  }

  const { evaluateCourseAccess } = await import("../lib/courseAccessService");
  const accessDecision = await evaluateCourseAccess(courseId, accessContext);
  if (!accessDecision.allowed) {
    res.status(403).json({
      error: accessDecision.reason === "PREREQUISITE_REQUIRED" ? "PREREQUISITES_INCOMPLETE" : accessDecision.reason,
      message: accessDecision.reason === "PLAN_UPGRADE_REQUIRED"
        ? `Quiz is restricted. This course requires the ${accessDecision.requiredPlanName} plan.`
        : accessDecision.reason === "PREREQUISITE_REQUIRED"
        ? "You must complete all prerequisite courses before accessing this quiz."
        : "Access denied.",
      requiredPlanCode: accessDecision.requiredPlanCode,
      requiredPlanName: accessDecision.requiredPlanName,
      missingPrerequisiteCourseIds: accessDecision.missingPrerequisiteCourseIds,
      prerequisites: accessDecision.prerequisiteDetails,
    });
    return;
  }

  const questions = await db
    .select({
      id: quizQuestionsTable.id,
      question: quizQuestionsTable.question,
      options: quizQuestionsTable.options,
      orderIndex: quizQuestionsTable.orderIndex,
    })
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.courseId, courseId))
    .orderBy(quizQuestionsTable.orderIndex);

  res.json({
    courseId,
    version: course.version ?? 1,
    totalQuestions: questions.length,
    questions,
  });
});

router.post("/:courseId/quiz/submit", async (req, res): Promise<void> => {
  try {
    const raw = Array.isArray(req.params.courseId) ? req.params.courseId[0] : req.params.courseId;
    const courseId = parseInt(raw, 10);
    if (isNaN(courseId)) {
      res.status(400).json({ error: "Invalid courseId" });
      return;
    }

    const bodyData = req.body?.data && typeof req.body.data === "object" ? req.body.data : req.body;
    const parsed = SubmitQuizBody.safeParse(bodyData);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    let access: any;
    try {
      access = await getCompanyAccess(req);
    } catch (e) {
      res.status(401).json({ error: "Authentication required to submit quiz" });
      return;
    }

    if (!access || !access.userId) {
      res.status(401).json({ error: "Authentication required to submit quiz" });
      return;
    }

    const isPlatformAdmin = access.role === "platform_admin";

    const enrollmentClauses = [eq(enrollmentsTable.userId, access.userId)];
    if (access.employee) {
      enrollmentClauses.push(eq(enrollmentsTable.employeeId, access.employee.id));
      enrollmentClauses.push(inArray(enrollmentsTable.userId, [access.employee.email]));
    } else if (access.email) {
      enrollmentClauses.push(eq(enrollmentsTable.userId, access.email));
    }

    const [enrollment] = await db
      .select()
      .from(enrollmentsTable)
      .where(and(eq(enrollmentsTable.courseId, courseId), or(...enrollmentClauses)))
      .orderBy(desc(enrollmentsTable.id))
      .limit(1);

    if (!enrollment && !isPlatformAdmin) {
      res.status(403).json({ error: "This course has not been assigned to you" });
      return;
    }

    // Cross-tenant submission check
    if (enrollment && access.companyId && enrollment.companyId && enrollment.companyId !== access.companyId && !isPlatformAdmin) {
      res.status(403).json({ error: "Cross-tenant attempt submission is strictly prohibited" });
      return;
    }

    const [course] = await db
      .select({
        id: coursesTable.id,
        isPublished: coursesTable.isPublished,
        passingScore: coursesTable.passingScore,
        title: coursesTable.title,
        version: coursesTable.version,
      })
      .from(coursesTable)
      .where(eq(coursesTable.id, courseId));

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    if (!course.isPublished && !isPlatformAdmin) {
      res.status(403).json({ error: "Cannot submit quiz for an unpublished course" });
      return;
    }

    const { evaluateCourseAccess } = await import("../lib/courseAccessService");
    const accessDecision = await evaluateCourseAccess(courseId, access);
    if (!accessDecision.allowed) {
      res.status(403).json({
        error: accessDecision.reason === "PREREQUISITE_REQUIRED" ? "PREREQUISITES_INCOMPLETE" : accessDecision.reason,
        message: accessDecision.reason === "PLAN_UPGRADE_REQUIRED"
          ? `Quiz submission blocked. This course requires the ${accessDecision.requiredPlanName} plan.`
          : accessDecision.reason === "PREREQUISITE_REQUIRED"
          ? "You must complete all prerequisite courses before submitting this quiz."
          : "Access denied.",
        requiredPlanCode: accessDecision.requiredPlanCode,
        requiredPlanName: accessDecision.requiredPlanName,
      });
      return;
    }

    // Check reuse of already-finalised attempt where retake is not authorised
    const existingPassedAttempts = await db
      .select()
      .from(quizAttemptsTable)
      .where(and(
        eq(quizAttemptsTable.userId, access.userId),
        eq(quizAttemptsTable.courseId, courseId),
        eq(quizAttemptsTable.passed, true)
      ))
      .limit(1);

    if (existingPassedAttempts.length > 0 && req.query.allowRetake !== "true" && req.body.allowRetake !== true && !isPlatformAdmin) {
      const existingCerts = await db
        .select()
        .from(certificatesTable)
        .where(and(
          eq(certificatesTable.userId, access.userId),
          eq(certificatesTable.courseId, courseId)
        ))
        .limit(1);
      if (existingCerts.length > 0) {
        res.status(409).json({ error: "Reuse of an already-finalised attempt where retake is not authorised" });
        return;
      }
    }

    // Authoritative server-side question definition
    const questions = await db
      .select()
      .from(quizQuestionsTable)
      .where(and(
        eq(quizQuestionsTable.courseId, courseId),
        eq(quizQuestionsTable.isArchived, false)
      ))
      .orderBy(quizQuestionsTable.orderIndex);

    if (!questions || questions.length === 0) {
      res.status(400).json({ error: "Assessment questions not found for this course" });
      return;
    }

    const authorizedQuestionCount = questions.length;
    const submittedAnswers = parsed.data.answers;

    if (!Array.isArray(submittedAnswers)) {
      res.status(400).json({ error: "Submission answers must be an array" });
      return;
    }

    // Enforce server-authoritative denominator and question set:
    // Reject submissions omitting required questions or submitting shortened sets
    if (submittedAnswers.length !== authorizedQuestionCount) {
      res.status(400).json({
        error: `Submission answer count (${submittedAnswers.length}) does not match the authorised assessment question count (${authorizedQuestionCount}) for course ${courseId} (Version ${course.version ?? 1})`
      });
      return;
    }

    // Verify question IDs: reject duplicate, unknown, alien, or tampered IDs
    const validQuestionMap = new Map(questions.map((q) => [q.id, q]));
    const seenQuestionIds = new Set<number>();

    for (const ans of submittedAnswers) {
      if (!ans || typeof ans !== "object" || typeof ans.questionId !== "number") {
        res.status(400).json({ error: "Invalid answer structure: questionId must be an integer" });
        return;
      }

      if (seenQuestionIds.has(ans.questionId)) {
        res.status(400).json({ error: `Duplicate question ID ${ans.questionId} in submission` });
        return;
      }
      seenQuestionIds.add(ans.questionId);

      const authorizedQ = validQuestionMap.get(ans.questionId);
      if (!authorizedQ) {
        res.status(400).json({
          error: `Question ID ${ans.questionId} does not belong to course ${courseId} assessment version ${course.version ?? 1}`
        });
        return;
      }

      if (typeof ans.selectedOption !== "number" || ans.selectedOption < 0 || ans.selectedOption >= authorizedQ.options.length) {
        res.status(400).json({ error: `Invalid selectedOption for question ID ${ans.questionId}` });
        return;
      }
    }

    // Ensure EVERY question from the authorized set was answered
    for (const q of questions) {
      if (!seenQuestionIds.has(q.id)) {
        res.status(400).json({ error: `Missing answer for required question ID ${q.id}` });
        return;
      }
    }

    const competencyScores: Record<string, { correct: number, total: number, percentage: number, passed: boolean }> = {};
    let isCertification = false;
    for (const q of questions) {
      if (q.competencyArea) {
        isCertification = true;
        if (!competencyScores[q.competencyArea]) {
          competencyScores[q.competencyArea] = { correct: 0, total: 0, percentage: 0, passed: false };
        }
        competencyScores[q.competencyArea].total++;
      }
    }

    let correctAnswers = 0;
    const incorrectSourceCourseIds: Record<number, number> = {};

    for (const answer of submittedAnswers) {
      const question = validQuestionMap.get(answer.questionId)!;
      const isCorrect = question.correctOption === answer.selectedOption;
      if (isCorrect) {
        correctAnswers++;
        if (question.competencyArea) {
          competencyScores[question.competencyArea].correct++;
        }
      } else {
        if (question.sourceCourseId) {
          incorrectSourceCourseIds[question.sourceCourseId] = (incorrectSourceCourseIds[question.sourceCourseId] || 0) + 1;
        }
      }
    }

    const totalQuestions = authorizedQuestionCount;
    const effectiveCourseVersion = course.version ?? 1;

    let allCompetenciesPassed = true;
    for (const key of Object.keys(competencyScores)) {
      const comp = competencyScores[key];
      comp.percentage = comp.total > 0 ? Math.round((comp.correct / comp.total) * 100) : 0;
      comp.passed = comp.percentage >= 70;
      if (!comp.passed) allCompetenciesPassed = false;
    }

    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const passingScore = course.passingScore ?? 70;

    let passed = score >= passingScore;
    if (isCertification) {
      passed = score >= 80 && allCompetenciesPassed;
    }

    const userId = access.userId;
    const [dbAttempt] = await db.insert(quizAttemptsTable).values({
      userId,
      courseId,
      courseVersion: effectiveCourseVersion,
      score,
      totalQuestions,
      correctAnswers,
      passed,
      competencyScores: isCertification ? competencyScores : null,
    }).returning();

    let employee = access.employee;
    if (!employee && enrollment?.employeeId) {
      const [found] = await db
        .select()
        .from(employeesTable)
        .where(eq(employeesTable.id, enrollment.employeeId))
        .limit(1);
      employee = found ?? null;
    }

    let certificateId: number | null = null;
    if (passed) {
      const companyId = employee?.companyId ?? enrollment?.companyId ?? access.companyId;
      const [company] = await db
        .select()
        .from(companiesTable)
        .where(eq(companiesTable.id, companyId))
        .limit(1);
      const certClauses = [eq(certificatesTable.userId, userId)];
      if (employee) certClauses.push(eq(certificatesTable.employeeId, employee.id));

      const [existingCert] = await db
        .select()
        .from(certificatesTable)
        .where(and(eq(certificatesTable.courseId, courseId), or(...certClauses)))
        .orderBy(desc(certificatesTable.id))
        .limit(1);

      if (existingCert) {
        certificateId = existingCert.id;
      } else {
        const code = `ECO-${randomUUID().slice(0, 8).toUpperCase()}`;
        const certificateTitle = isCertification ? "Elevio Core Sustainability Certificate" : null;
        const [cert] = await db
          .insert(certificatesTable)
          .values({
            userId,
            companyId,
            employeeId: employee?.id,
            employeeName: employee?.name ?? "Elevio Learner",
            companyName: company?.name ?? "Elevio",
            courseId,
            courseVersion: effectiveCourseVersion,
            uniqueCode: code,
            certificateTitle,
          })
          .returning();
        certificateId = cert.id;
      }

      const completedAt = new Date();
      if (enrollment) {
        await db
          .update(enrollmentsTable)
          .set({
            status: "completed",
            progressPct: 100,
            completedAt,
            completedVersion: effectiveCourseVersion,
            lastAccessedAt: completedAt,
          })
          .where(eq(enrollmentsTable.id, enrollment.id));
      }

      if (employee) {
        await db
          .update(courseAssignmentsTable)
          .set({ completedAt })
          .where(
            and(
              eq(courseAssignmentsTable.employeeId, employee.id),
              eq(courseAssignmentsTable.courseId, courseId),
            ),
          );
        await syncEmployeeLearningStats(employee.id);
        try {
          const awardCompanyId = employee.companyId || enrollment?.companyId || access.companyId;
          await awardQuizPassScore({
            companyId: awardCompanyId,
            employeeId: employee.id,
            clerkUserId: userId,
            courseId,
            courseTitle: course?.title,
            score,
            quizAttemptId: dbAttempt[0].id,
          });
          await awardCourseCompletionScore({
            companyId: awardCompanyId,
            employeeId: employee.id,
            clerkUserId: userId,
            courseId,
            courseTitle: course?.title,
            version: effectiveCourseVersion,
          });
          await evaluateQuizAchievements({
            employee,
            courseId,
            scorePct: score,
            attemptCount: 1,
          });
          await evaluateCourseCompletionAchievements({
            employee,
            courseId,
          });
          await evaluateEmployeeChallengeProgress({
            employee,
            clerkUserId: userId,
          });
        } catch (scoreErr: any) {
          req.log?.error({ err: scoreErr?.message }, "Non-fatal error awarding ELEVIO score or evaluating achievements");
        }
      }
    }

    const feedback = parsed.data.answers.map((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        question: question?.question ?? "",
        selectedOption: answer.selectedOption,
        correctOption: question?.correctOption ?? 0,
        isCorrect: question?.correctOption === answer.selectedOption,
        correctExplanation: question?.correctExplanation ?? null,
        incorrectExplanation: question?.incorrectExplanation ?? null,
        practicalTakeaway: question?.practicalTakeaway ?? null,
        optionFeedback: question?.optionFeedback ?? [],
        options: question?.options ?? [],
        competencyArea: question?.competencyArea ?? null,
        sourceCourseId: question?.sourceCourseId ?? null,
        learningOutcome: question?.learningOutcome ?? null,
      };
    });

    let recommendations: number[] = [];
    let weakestCompetencyArea: string | null = null;

    if (isCertification && !passed) {
       recommendations = Object.entries(incorrectSourceCourseIds)
           .sort((a, b) => b[1] - a[1])
           .slice(0, 3)
           .map(e => parseInt(e[0]));
           
       let lowestScore = 100;
       for (const key of Object.keys(competencyScores)) {
          if (competencyScores[key].percentage < lowestScore) {
             lowestScore = competencyScores[key].percentage;
             weakestCompetencyArea = key;
          }
       }
    }

    const newAchievements: any[] = [];
    if (passed && employee) {
      const newBadge = await awardCourseBadge(employee, courseId);
      const newMilestones = await evaluateCourseMilestones(employee);
      if (newBadge) newAchievements.push(newBadge);
      newAchievements.push(...newMilestones);
    }

    res.json({ 
      score, 
      passed, 
      totalQuestions, 
      correctAnswers, 
      certificateId, 
      feedback,
      competencyScores: isCertification ? competencyScores : null,
      recommendations: recommendations.length > 0 ? recommendations : null,
      weakestCompetencyArea,
      newAchievements
    });
  } catch (err) {
    console.error("SUBMIT QUIZ ERR:", err);
    if (!sendHttpError(res, err)) {
      req.log?.error({ err }, "Failed to submit quiz");
      res.status(500).json({ error: (err as any)?.message || "Failed to submit quiz" });
    }
  }
});

export default router;
