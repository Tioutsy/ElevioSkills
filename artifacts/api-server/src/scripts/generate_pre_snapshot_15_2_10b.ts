import { db, coursesTable, lessonsTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { notLike, inArray, count, sql } from "drizzle-orm";
import fs from "node:fs";
import path from "node:path";

async function generateSnapshot() {
  const cohortCodes = ["ELH-12", "ELH-13", "ELH-14", "ELH-15", "ELH-16", "ELH-17", "ELH-18", "ELH-19", "ELH-20", "ELH-21", "ELH-22", "ELH-23"];
  
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).orderBy(coursesTable.id);
  const cohortCourses = allCourses.filter(c => c.courseCode && cohortCodes.includes(c.courseCode));
  const cohortIds = cohortCourses.map(c => c.id);
  
  const allQuestions = await db.select().from(quizQuestionsTable);
  const cohortQuestions = allQuestions.filter(q => cohortIds.includes(q.courseId));

  const allAttempts = await db.select().from(quizAttemptsTable);
  const allEnrollments = await db.select().from(enrollmentsTable);
  const allCertificates = await db.select().from(certificatesTable);
  const allBadges = await db.select().from(badgeDefinitionsTable);
  const allScoreLedgers = await db.select().from(elevioScoreLedgerTable);

  const snapshot = {
    timestamp: new Date().toISOString(),
    stage: "PRE_REMEDIATION",
    sprint: "15.2.10B",
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

  const outPath = path.resolve(process.cwd(), "src/audits/preRemediationSnapshot15_2_10B.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2));
  console.log(`Pre-remediation snapshot written to ${outPath}`);
  console.log(JSON.stringify(snapshot, null, 2));
}

generateSnapshot().catch(console.error);
