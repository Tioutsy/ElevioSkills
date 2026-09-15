import { db, coursesTable, lessonsTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable } from "@workspace/db";
import { notLike, eq, count, sql } from "drizzle-orm";

async function main() {
  const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).orderBy(coursesTable.id);
  console.log(`Total canonical courses: ${allCourses.length}`);

  const allQuestions = await db.select().from(quizQuestionsTable);
  console.log(`Total quiz questions in DB: ${allQuestions.length}`);

  const allAttempts = await db.select().from(quizAttemptsTable);
  console.log(`Total quiz attempts in DB: ${allAttempts.length}`);

  // Count questions per course
  const questionsByCourse: Record<number, typeof allQuestions> = {};
  for (const q of allQuestions) {
    if (!questionsByCourse[q.courseId]) {
      questionsByCourse[q.courseId] = [];
    }
    questionsByCourse[q.courseId].push(q);
  }

  let coursesWithQuestions = 0;
  let coursesWith8OrMore = 0;
  let coursesWithZero = 0;

  for (const c of allCourses) {
    const qs = questionsByCourse[c.id] || [];
    if (qs.length === 0) {
      coursesWithZero++;
    } else {
      coursesWithQuestions++;
      if (qs.length >= 8) {
        coursesWith8OrMore++;
      }
    }
  }

  console.log({
    coursesWithQuestions,
    coursesWith8OrMore,
    coursesWithZero,
  });

  // Sample courses with questions
  console.log("\nCourses with question counts:");
  for (const c of allCourses) {
    const qs = questionsByCourse[c.id] || [];
    if (qs.length > 0) {
      console.log(`Course [${c.id}] ${c.courseCode} (v${c.version}): ${qs.length} questions, passingScore: ${c.passingScore}`);
    }
  }
}

main().catch(console.error);
