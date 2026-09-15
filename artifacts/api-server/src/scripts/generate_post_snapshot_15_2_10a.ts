import { db, coursesTable, lessonsTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { notLike, inArray, count, sql } from "drizzle-orm";
import fs from "node:fs";
import path from "node:path";

async function generateSnapshot() {
  const cohortIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).orderBy(coursesTable.id);
  const cohortCourses = allCourses.filter(c => cohortIds.includes(c.id));
  
  const allQuestions = await db.select().from(quizQuestionsTable);
  const cohortQuestions = allQuestions.filter(q => cohortIds.includes(q.courseId));

  const allAttempts = await db.select().from(quizAttemptsTable);
  const allEnrollments = await db.select().from(enrollmentsTable);
  const allCertificates = await db.select().from(certificatesTable);
  const allBadges = await db.select().from(badgeDefinitionsTable);
  const allScoreLedgers = await db.select().from(elevioScoreLedgerTable);

  const snapshot = {
    timestamp: new Date().toISOString(),
    stage: "POST_MUTATION",
    sprint: "15.2.10A",
    counts: {
      totalCanonicalCourses: allCourses.length,
      totalCourseQuestions: allQuestions.length,
      cohortCourseQuestions: cohortQuestions.length,
      totalAttempts: allAttempts.length,
      totalEnrollments: allEnrollments.length,
      totalCertificates: allCertificates.length,
      totalBadges: allBadges.length,
      totalScoreLedgerRecords: allScoreLedgers.length,
    },
    cohortCourses: cohortCourses.map(c => ({
      id: c.id,
      courseCode: c.courseCode,
      title: c.title,
      version: c.version,
      passingScore: c.passingScore,
      isPublished: c.isPublished,
      questionCount: allQuestions.filter(q => q.courseId === c.id).length,
    })),
    enrollmentsByVersion: allEnrollments.reduce((acc, e) => {
      const ver = String(e.enrolledVersion || 1);
      acc[ver] = (acc[ver] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  const outPath = path.resolve(process.cwd(), "src/audits/postMutationSnapshot15_2_10A.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2));
  console.log(`Post-mutation snapshot written to ${outPath}`);
  console.log(JSON.stringify(snapshot, null, 2));
}

generateSnapshot().catch(console.error);
