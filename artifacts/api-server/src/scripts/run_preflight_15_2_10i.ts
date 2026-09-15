import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { inArray, asc, eq, notLike } from "drizzle-orm";
import fs from "node:fs";

async function main() {
  const targetCodes = [
    "ELH-96", "ELH-97", "ELH-98", "ELH-99", "ELH-100", "ELH-101",
    "ELH-102", "ELH-103", "ELH-104", "ELH-105", "ELH-106", "ELH-107"
  ];
  
  const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, targetCodes)).orderBy(asc(coursesTable.courseCode));
  const allQuestions = await db.select().from(quizQuestionsTable);
  const allAttempts = await db.select().from(quizAttemptsTable);
  const allEnrollments = await db.select().from(enrollmentsTable);
  const allCerts = await db.select().from(certificatesTable);
  const allBadges = await db.select().from(badgeDefinitionsTable);
  const allLedgers = await db.select().from(elevioScoreLedgerTable);
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
  
  console.log(`Resolved ${courses.length} target courses`);
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

  const preflightData = {
    targetCodes,
    resolvedCount: courses.length,
    totalCanonicalCourses: allCourses.length,
    totalScoredQuestions: allQuestions.length,
    totalQuizAttempts: allAttempts.length,
    totalEnrollments: allEnrollments.length,
    totalCertificates: allCerts.length,
    totalBadges: allBadges.length,
    totalScoreLedgers: allLedgers.length,
    courses: courses.map(c => {
      const qs = allQuestions.filter(q => q.courseId === c.id);
      return {
        id: c.id,
        courseCode: c.courseCode,
        title: c.title,
        version: c.version,
        passingScore: c.passingScore,
        questionCount: qs.length,
        questionIds: qs.map(q => q.id)
      };
    })
  };

  fs.writeFileSync("src/audits/preflight_cohort_15_2_10i.json", JSON.stringify(preflightData, null, 2));
  console.log("Wrote preflight_cohort_15_2_10i.json");
}

main().catch(console.error);
