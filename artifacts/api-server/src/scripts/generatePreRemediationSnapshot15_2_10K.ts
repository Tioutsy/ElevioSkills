import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine.js";
import { inArray, asc } from "drizzle-orm";
import fs from "node:fs";
import crypto from "node:crypto";

async function main() {
  const targetCodes = [
    "ELH-120", "ELH-121", "ELH-122", "ELH-123", "ELH-124", "ELH-125",
    "ELH-126", "ELH-127", "ELH-128", "ELH-129", "ELH-130", "ELH-131"
  ];
  
  const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, targetCodes)).orderBy(asc(coursesTable.courseCode));
  const allQuestions = await db.select().from(quizQuestionsTable);
  const allAttempts = await db.select().from(quizAttemptsTable);
  const allEnrollments = await db.select().from(enrollmentsTable);
  const allCerts = await db.select().from(certificatesTable);
  const allBadges = await db.select().from(badgeDefinitionsTable);
  const allLedgers = await db.select().from(elevioScoreLedgerTable);

  const cohortData = courses.map(c => {
    const qs = allQuestions.filter(q => q.courseId === c.id);
    return {
      courseId: c.id,
      courseCode: c.courseCode,
      title: c.title,
      version: c.version,
      passingScore: c.passingScore,
      questionCount: qs.length,
      questions: qs.map(q => ({
        id: q.id,
        order: q.orderIndex,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        optionFeedback: q.optionFeedback,
        correctExplanation: q.correctExplanation,
        incorrectExplanation: q.incorrectExplanation
      }))
    };
  });

  const snapshot = {
    sprint: "15.2.10K",
    timestamp: new Date().toISOString(),
    cohort: "ELH-120 through ELH-131",
    targetCourseCount: courses.length,
    targetQuestionCount: cohortData.reduce((acc, c) => acc + c.questionCount, 0),
    historicalBaseline: {
      quizAttempts: allAttempts.length,
      enrollments: allEnrollments.length,
      certificates: allCerts.length,
      badgeDefinitions: allBadges.length,
      scoreLedgers: allLedgers.length,
      diagnosticBankQuestions: DIAGNOSTIC_QUESTION_BANK.length,
      diagnosticPairs: DIAGNOSTIC_QUESTION_BANK.length / 2
    },
    courses: cohortData
  };

  const rawJson = JSON.stringify(snapshot, null, 2);
  const hash = crypto.createHash("sha256").update(rawJson).digest("hex");
  const finalSnapshot = {
    sha256: hash,
    ...snapshot
  };

  fs.writeFileSync("src/audits/preRemediationSnapshot15_2_10K.json", JSON.stringify(finalSnapshot, null, 2));
  console.log("Pre-remediation snapshot 15.2.10K saved successfully!");
  console.log(`SHA-256: ${hash}`);
}

main().catch(console.error);
