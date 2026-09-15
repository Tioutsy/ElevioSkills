import { db, coursesTable, quizQuestionsTable } from "@workspace/db";
import { eq, inArray } from "drizzle-orm";

async function inspectCohort() {
  const cohortIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const courses = await db.select().from(coursesTable).where(inArray(coursesTable.id, cohortIds)).orderBy(coursesTable.id);
  const questions = await db.select().from(quizQuestionsTable).where(inArray(quizQuestionsTable.courseId, cohortIds)).orderBy(quizQuestionsTable.courseId, quizQuestionsTable.orderIndex);

  console.log(`Found ${courses.length} courses and ${questions.length} questions.`);

  for (const c of courses) {
    const cQuestions = questions.filter(q => q.courseId === c.id);
    console.log(`\n=== Course [${c.id}] ${c.courseCode}: ${c.title} (v${c.version}, passScore: ${c.passingScore}%) ===`);
    console.log(`Total questions: ${cQuestions.length}`);
    for (const [i, q] of cQuestions.entries()) {
      console.log(`  Q${i+1} (id: ${q.id}, order: ${q.orderIndex}): "${q.question}"`);
      console.log(`     options (${q.options.length}): ${JSON.stringify(q.options)}`);
      console.log(`     correctOption: ${q.correctOption} (${q.options[q.correctOption]})`);
      console.log(`     correctExplanation: ${q.correctExplanation ? 'YES' : 'NO'}`);
      console.log(`     optionFeedback (${q.optionFeedback?.length || 0}): ${JSON.stringify(q.optionFeedback || [])}`);
    }
  }
}

inspectCohort().catch(console.error);
