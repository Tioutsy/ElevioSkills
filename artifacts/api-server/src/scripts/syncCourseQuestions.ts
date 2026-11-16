import { ensureSyncCourseQuestions } from "../lib/ensureSyncCourseQuestions";

async function main() {
  console.log("Starting repository quiz questions synchronization by course code...");
  const report = await ensureSyncCourseQuestions();
  console.log("Synchronization report:", report);
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to synchronize course quiz questions:", err);
  process.exit(1);
});
