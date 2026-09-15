import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine.js";
import { inArray, asc } from "drizzle-orm";
import fs from "node:fs";

async function main() {
  const targetCodes = [
    "ELH-01", "ELH-02", "ELH-03", "ELH-04", "ELH-05", "ELH-06",
    "ELH-07", "ELH-08", "ELH-09", "ELH-10", "ELH-11",
    "ELH-132", "ELH-133", "ELH-134", "ELH-135", "ELH-136"
  ];

  console.log("=== SPRINT 15.2.10L PREFLIGHT AUDIT ===");

  const allCourses = await db.select().from(coursesTable).orderBy(asc(coursesTable.courseCode));
  const allQuestions = await db.select().from(quizQuestionsTable);
  const allAttempts = await db.select().from(quizAttemptsTable);
  const allEnrollments = await db.select().from(enrollmentsTable);
  const allCerts = await db.select().from(certificatesTable);
  const allBadges = await db.select().from(badgeDefinitionsTable);
  const allLedgers = await db.select().from(elevioScoreLedgerTable);

  console.log(`Total Canonical Courses in DB: ${allCourses.length}`);
  console.log(`Total Persisted Scored Questions: ${allQuestions.length}`);
  console.log(`Diagnostic Question Bank Size: ${DIAGNOSTIC_QUESTION_BANK.length}`);
  console.log(`Historical Quiz Attempts: ${allAttempts.length}`);
  console.log(`Historical Enrollments: ${allEnrollments.length}`);
  console.log(`Historical Certificates: ${allCerts.length}`);
  console.log(`Historical Badges: ${allBadges.length}`);
  console.log(`Historical Score-Ledgers: ${allLedgers.length}`);

  const targetCourses = allCourses.filter(c => c.courseCode && targetCodes.includes(c.courseCode));
  console.log(`\nResolved Target Courses (${targetCourses.length}/16):`);

  let v1Count = 0;
  let v2Count = 0;

  for (const c of targetCourses) {
    const qs = allQuestions.filter(q => q.courseId === c.id);
    if (c.version === 1) v1Count++;
    if (c.version === 2) v2Count++;
    console.log(`[${c.courseCode}] ID: ${c.id} | v${c.version} | passing: ${c.passingScore}% | questions: ${qs.length} | "${c.title}"`);
  }

  console.log(`\nVersion summary among targets: v1=${v1Count}, v2=${v2Count}`);

  // Create preflight audit data
  const preflightData = {
    sprint: "15.2.10L",
    generatedAt: new Date().toISOString(),
    resolvedTargetCount: targetCourses.length,
    totalCanonicalCourses: allCourses.length,
    totalScoredQuestions: allQuestions.length,
    totalDiagnosticQuestions: DIAGNOSTIC_QUESTION_BANK.length,
    historicalBaseline: {
      quizAttempts: allAttempts.length,
      enrollments: allEnrollments.length,
      certificates: allCerts.length,
      badgeDefinitions: allBadges.length,
      scoreLedgers: allLedgers.length
    },
    versionSummary: {
      v1: v1Count,
      v2: v2Count
    },
    courses: targetCourses.map(c => {
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

  fs.writeFileSync("src/audits/preflight_cohort_15_2_10l.json", JSON.stringify(preflightData, null, 2));
  console.log("\nWrote preflight_cohort_15_2_10l.json successfully.");
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
