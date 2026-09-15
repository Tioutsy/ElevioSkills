import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable } from "@workspace/db";
import { asc, notLike, count } from "drizzle-orm";
import { SPRINT_15_2_10C_COHORT_COURSE_IDS } from "../lib/courseAssessmentCohort15_2_10C.js";
import fs from "fs";
import path from "path";

async function main() {
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).orderBy(asc(coursesTable.id));
  const allQuestions = await db.select().from(quizQuestionsTable);
  const [attemptsCount] = await db.select({ val: count() }).from(quizAttemptsTable);
  const [enrollmentsCount] = await db.select({ val: count() }).from(enrollmentsTable);
  const [certsCount] = await db.select({ val: count() }).from(certificatesTable);
  const [badgesCount] = await db.select({ val: count() }).from(badgeDefinitionsTable);
  const [ledgerCount] = await db.select({ val: count() }).from(elevioScoreLedgerTable);

  const cohortQuestions = allQuestions.filter(q => SPRINT_15_2_10C_COHORT_COURSE_IDS.includes(q.courseId));

  const snapshot = {
    timestamp: new Date().toISOString(),
    stage: "PRE_REMEDIATION",
    sprint: "15.2.10C",
    counts: {
      totalCanonicalCourses: allCourses.length,
      totalCourseQuestions: allQuestions.length,
      cohortCourseQuestions: cohortQuestions.length,
      totalAttempts: Number(attemptsCount.val),
      totalEnrollments: Number(enrollmentsCount.val),
      totalCertificates: Number(certsCount.val),
      totalBadges: Number(badgesCount.val),
      totalScoreLedgerRecords: Number(ledgerCount.val),
    },
    cohortCourses: allCourses.filter(c => SPRINT_15_2_10C_COHORT_COURSE_IDS.includes(c.id)).map(c => {
      const qs = allQuestions.filter(q => q.courseId === c.id);
      return {
        id: c.id,
        courseCode: c.courseCode,
        title: c.title,
        version: c.version,
        passingScore: c.passingScore,
        isPublished: c.isPublished,
        questionCount: qs.length,
        hasFourOptionFeedback: qs.every(q => Array.isArray(q.optionFeedback) && q.optionFeedback.length === 4),
      };
    }),
  };

  const snapshotPath = path.resolve(process.cwd(), "src/audits/preRemediationSnapshot15_2_10C.json");
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2), "utf8");
  console.log("Wrote pre-remediation snapshot to", snapshotPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
