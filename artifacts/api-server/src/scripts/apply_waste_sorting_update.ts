import { ensureWasteSortingCourse } from "../lib/ensureWasteSortingCourse.js";
import { db, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Applying Waste Sorting Course (ELH-02) 8-question standardisation...");
  await ensureWasteSortingCourse();
  
  const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, 2)).orderBy(quizQuestionsTable.orderIndex);
  console.log(`Course 2 updated successfully. Total questions in DB: ${questions.length}`);
  for (const q of questions) {
    console.log(`  Q${q.orderIndex}: "${q.question}" (options: ${q.options.length}, correct: ${q.correctOption}, feedback: ${q.optionFeedback?.length || 0})`);
  }
}

main().catch(console.error);
