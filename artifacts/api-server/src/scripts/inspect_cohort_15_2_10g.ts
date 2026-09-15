import { db, coursesTable, quizQuestionsTable, enrollmentsTable, quizAttemptsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { notLike, inArray, eq, asc } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine.js";
import fs from "node:fs";

async function main() {
  const codes = [
    "ELH-72", "ELH-73", "ELH-74", "ELH-75", "ELH-76", "ELH-77",
    "ELH-78", "ELH-79", "ELH-80", "ELH-81", "ELH-82", "ELH-83"
  ];
  
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).orderBy(asc(coursesTable.courseCode));
  const allQuestions = await db.select().from(quizQuestionsTable).orderBy(asc(quizQuestionsTable.courseId), asc(quizQuestionsTable.orderIndex));
  const allAttempts = await db.select().from(quizAttemptsTable);
  const allEnrollments = await db.select().from(enrollmentsTable);
  const allCertificates = await db.select().from(certificatesTable);
  const allBadges = await db.select().from(badgeDefinitionsTable);
  const allScoreLedgers = await db.select().from(elevioScoreLedgerTable);

  console.log("=== CATALOGUE METRICS ===");
  console.log(`Canonical Courses: ${allCourses.length}`);
  console.log(`Scored Questions: ${allQuestions.length}`);
  console.log(`Diagnostic Questions: ${DIAGNOSTIC_QUESTION_BANK.length}`);
  console.log(`Historical Attempts: ${allAttempts.length}`);
  console.log(`Historical Enrollments: ${allEnrollments.length}`);
  console.log(`Historical Certificates: ${allCertificates.length}`);
  console.log(`Historical Badges: ${allBadges.length}`);
  console.log(`Historical Score Ledger Events: ${allScoreLedgers.length}`);

  const cohortCourses = allCourses.filter(c => c.courseCode && codes.includes(c.courseCode));
  console.log(`\nCohort Courses Found: ${cohortCourses.length}`);

  const details: any[] = [];

  for (const c of cohortCourses) {
    const questions = allQuestions.filter(q => q.courseId === c.id);
    const enrollments = allEnrollments.filter(e => e.courseId === c.id);
    const attempts = allAttempts.filter(a => a.courseId === c.id);
    
    const keyDistribution = [0, 0, 0, 0];
    let feedbackComplete = 0;
    let scenarioCount = 0;
    let applicationCount = 0;

    for (const q of questions) {
      if (typeof q.correctOption === 'number' && q.correctOption >= 0 && q.correctOption <= 3) {
        keyDistribution[q.correctOption]++;
      }
      if (Array.isArray(q.optionFeedback) && q.optionFeedback.length === 4 && q.optionFeedback.every((f: any) => typeof f === 'string' && f.trim().length > 0)) {
        feedbackComplete++;
      }
      // Simple heuristic checks for existing state
      const text = (q.question || "").toLowerCase();
      if (text.includes("a ") || text.includes("an ") || text.includes("during") || text.includes("when") || text.includes("facility") || text.includes("store") || text.includes("hotel") || text.includes("bank") || text.includes("hospital") || text.includes("system") || text.includes("audit") || text.includes("manager") || text.includes("technician")) {
        scenarioCount++;
      }
      if (text.includes("how should") || text.includes("which action") || text.includes("best approach") || text.includes("calculate") || text.includes("recommend") || text.includes("determine") || text.includes("implement") || text.includes("most effective")) {
        applicationCount++;
      }
    }

    const cDetail = {
      id: c.id,
      code: c.courseCode,
      title: c.title,
      category: (c as any).category,
      level: (c as any).level,
      version: c.version,
      passingScore: c.passingScore,
      questionsCount: questions.length,
      enrollmentsCount: enrollments.length,
      attemptsCount: attempts.length,
      keyDistribution,
      feedbackComplete: `${feedbackComplete}/${questions.length}`,
      scenarioCount,
      applicationCount,
      learningObjectives: (c as any).learningObjectives || (c as any).objectives,
      targetRoles: (c as any).targetRoles || (c as any).roles,
      questions: questions.map(q => ({
        id: q.id,
        orderIndex: q.orderIndex,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        optionFeedback: q.optionFeedback,
        correctExplanation: q.correctExplanation,
        incorrectExplanation: q.incorrectExplanation
      }))
    };

    details.push(cDetail);

    console.log(`\n-----------------------------------------`);
    console.log(`[${c.courseCode}] ID: ${c.id} | "${c.title}"`);
    console.log(`  Version: v${c.version} | Passing Score: ${c.passingScore}%`);
    console.log(`  Questions: ${questions.length} | Enrollments: ${enrollments.length} | Attempts: ${attempts.length}`);
    console.log(`  Keys (0/1/2/3): [${keyDistribution.join(", ")}] | Feedback: ${feedbackComplete}/${questions.length}`);
    console.log(`  Category: ${(c as any).category} | Level: ${(c as any).level}`);
  }

  fs.writeFileSync("src/audits/preflight_cohort_15_2_10g.json", JSON.stringify({
    timestamp: new Date().toISOString(),
    sprint: "15.2.10G",
    catalogueSummary: {
      canonicalCourses: allCourses.length,
      scoredQuestions: allQuestions.length,
      diagnosticQuestions: DIAGNOSTIC_QUESTION_BANK.length,
      historicalAttempts: allAttempts.length,
      historicalEnrollments: allEnrollments.length,
      historicalCertificates: allCertificates.length,
      historicalBadges: allBadges.length,
      historicalScoreLedgers: allScoreLedgers.length
    },
    cohortDetails: details
  }, null, 2));

  console.log("\nSaved preflight_cohort_15_2_10g.json successfully.");
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
