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

  const snapshot = {
    capturedAt: new Date().toISOString(),
    sprint: "15.2.10F",
    canonicalCourseCount: allCourses.length,
    catalogueScoredQuestionCount: allQuestions.length,
    diagnosticItemCount: DIAGNOSTIC_QUESTION_BANK.length,
    historicalLearnerData: {
      attemptsCount: allAttempts.length,
      enrollmentsCount: allEnrollments.length,
      certificatesCount: allCertificates.length,
      badgeDefinitionsCount: allBadges.length,
      scoreLedgerCount: allScoreLedgers.length
    },
    cohortMetadata: SPRINT_15_2_10F_COHORT,
    cohortCourses: cohortCourses.map(c => ({
      id: c.id,
      code: c.courseCode,
      title: c.title,
      version: c.version,
      passingScore: c.passingScore
    })),
    cohortQuestions: cohortQuestions.map(q => ({
      id: q.id,
      courseId: q.courseId,
      orderIndex: q.orderIndex,
      question: q.question,
      options: q.options,
      correctOption: q.correctOption,
      optionFeedback: q.optionFeedback,
      correctExplanation: q.correctExplanation,
      incorrectExplanation: q.incorrectExplanation
    }))
  };

  const snapshotJson = JSON.stringify(snapshot, null, 2);
  const hash = crypto.createHash("sha256").update(snapshotJson).digest("hex");
  (snapshot as any).sha256 = hash;

  fs.writeFileSync(
    "src/audits/preRemediationSnapshot15_2_10F.json",
    JSON.stringify(snapshot, null, 2)
  );

  console.log("Saved preRemediationSnapshot15_2_10F.json successfully.");
  console.log(`SHA-256: ${hash}`);
  process.exit(0);
}

run().catch(err => {
  console.error("Error generating pre-remediation snapshot:", err);
  process.exit(1);
});
