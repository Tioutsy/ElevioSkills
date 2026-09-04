import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { notLike, eq, and, sql } from "drizzle-orm";
import { CANONICAL_BATCH_3_REGISTER } from "../lib/canonicalBatch3Register";

async function main() {
  const allCourses = await db
    .select()
    .from(coursesTable)
    .where(notLike(coursesTable.courseCode, "TEST-%"));

  console.log("Total canonical courses:", allCourses.length);
  const v2Courses = allCourses.filter((c) => (c.version ?? 1) >= 2);
  const v1Courses = allCourses.filter((c) => (c.version ?? 1) === 1);

  console.log("Version 2 courses:", v2Courses.length);
  console.log("Version 1 courses:", v1Courses.length);

  const wave3dFromRegister = CANONICAL_BATCH_3_REGISTER.filter((c) => c.waveAssignment === "Wave 3D");
  console.log("\nWave 3D courses defined in CANONICAL_BATCH_3_REGISTER (" + wave3dFromRegister.length + "):");
  wave3dFromRegister.forEach((c) => {
    const dbCourse = allCourses.find((x) => x.courseCode === c.courseCode);
    console.log(`- ${c.courseCode} (DB ID: ${c.id}, DB ver: ${dbCourse?.version}, DB level: ${dbCourse?.level}): "${c.title}" [${dbCourse?.primaryCompetency}]`);
  });

  const wave3eFromRegister = CANONICAL_BATCH_3_REGISTER.filter((c) => c.waveAssignment === "Wave 3E");
  console.log("\nWave 3E courses defined in CANONICAL_BATCH_3_REGISTER (" + wave3eFromRegister.length + "):");
  wave3eFromRegister.forEach((c) => {
    const dbCourse = allCourses.find((x) => x.courseCode === c.courseCode);
    console.log(`- ${c.courseCode} (DB ID: ${c.id}, DB ver: ${dbCourse?.version}, DB level: ${dbCourse?.level}): "${c.title}" [${dbCourse?.primaryCompetency}]`);
  });

  console.log("\nAll remaining Version 1 courses in DB (total: " + v1Courses.length + "):");
  v1Courses.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  v1Courses.forEach((c) => {
    const inReg = CANONICAL_BATCH_3_REGISTER.find((x) => x.courseCode === c.courseCode);
    console.log(`- ${c.courseCode} (ID: ${c.id}, Level: ${c.level}, RegWave: ${inReg?.waveAssignment}): "${c.title}" [${c.primaryCompetency}]`);
  });

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
