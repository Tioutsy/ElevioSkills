import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine.js";
import { inArray, asc, notLike } from "drizzle-orm";
import fs from "node:fs";

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
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
  
  console.log(`Resolved ${courses.length} target courses:`);
  for (const c of courses) {
    const qs = allQuestions.filter(q => q.courseId === c.id);
    const keyDist = [0, 0, 0, 0];
    let fbCount = 0;
    for (const q of qs) {
      if (typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3) {
        keyDist[q.correctOption]++;
      }
      const fb = q.optionFeedback ? (Array.isArray(q.optionFeedback) ? q.optionFeedback : JSON.parse(q.optionFeedback as unknown as string)) : [];
      if (fb.length === 4 && fb.every((f: string) => f && f.trim().length > 0)) {
        fbCount++;
      }
    }
    console.log(`Code: ${c.courseCode} | ID: ${c.id} | Title: "${c.title}" | Vers: v${c.version} | Pass: ${c.passingScore}% | Questions: ${qs.length} | Keys: ${JSON.stringify(keyDist)} | CompleteFB: ${fbCount}/${qs.length}`);
  }

  const v1Count = allCourses.filter(c => c.version === 1).length;
  const v2Count = allCourses.filter(c => c.version === 2).length;

  console.log(`\nCatalogue Totals:`);
  console.log(`Canonical Courses: ${allCourses.length}`);
  console.log(`Scored Questions: ${allQuestions.length}`);
  console.log(`Diagnostic Questions: ${DIAGNOSTIC_QUESTION_BANK.length}`);
  console.log(`Versions: v1=${v1Count}, v2=${v2Count}`);
  console.log(`Learner Records: Attempts=${allAttempts.length}, Enrollments=${allEnrollments.length}, Certificates=${allCerts.length}, Badges=${allBadges.length}, Ledger=${allLedgers.length}`);

  const preflightData = {
    targetCodes,
    resolvedCount: courses.length,
    totalCanonicalCourses: allCourses.length,
    totalScoredQuestions: allQuestions.length,
    totalDiagnosticQuestions: DIAGNOSTIC_QUESTION_BANK.length,
    totalQuizAttempts: allAttempts.length,
    totalEnrollments: allEnrollments.length,
    totalCertificates: allCerts.length,
    totalBadges: allBadges.length,
    totalScoreLedgers: allLedgers.length,
    v1Count,
    v2Count,
    courses: courses.map(c => {
      const qs = allQuestions.filter(q => q.courseId === c.id);
      return {
        id: c.id,
        courseCode: c.courseCode,
        title: c.title,
        version: c.version,
        passingScore: c.passingScore,
        questionCount: qs.length,
        questionIds: qs.map(q => q.id),
        learningObjectives: c.learningObjectives,
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
    })
  };

  fs.writeFileSync("src/audits/preflight_cohort_15_2_10k.json", JSON.stringify(preflightData, null, 2));
  console.log("\nWrote preflight_cohort_15_2_10k.json successfully.");
}

main().catch(console.error);
