import { db, coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

export async function unpublishCourses36to139(): Promise<{
  totalEvaluated: number;
  unpublishedCount: number;
  remainingPublishedCount: number;
  updatedCourses: Array<{ id: number; courseCode: string | null; title: string }>;
}> {
  logger.info("Enforcing publication boundary: Keep only ELH-01 to ELH-35 published; unpublish all courses as from ELH-36...");

  // Generate allowed codes: ELH-01 to ELH-35
  const allowedCodes = new Set<string>();
  for (let i = 1; i <= 35; i++) {
    allowedCodes.add(`ELH-${i.toString().padStart(2, "0")}`);
  }

  const allCourses = await db.select().from(coursesTable);
  logger.info(`Found ${allCourses.length} total courses in database.`);

  const updatedCourses: Array<{ id: number; courseCode: string | null; title: string }> = [];

  for (const course of allCourses) {
    const isAllowed = course.courseCode && allowedCodes.has(course.courseCode);

    if (isAllowed) {
      // Ensure ELH-01 through ELH-35 remain published
      if (!course.isPublished || course.status !== "published") {
        await db
          .update(coursesTable)
          .set({
            isPublished: true,
            status: "published",
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, course.id));
      }
    } else {
      // Unpublish all other courses (ELH-36 upwards or unassigned)
      if (course.isPublished || course.status === "published") {
        await db
          .update(coursesTable)
          .set({
            isPublished: false,
            status: "draft",
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, course.id));

        updatedCourses.push({
          id: course.id,
          courseCode: course.courseCode,
          title: course.title,
        });

        logger.info(
          `  [UNPUBLISHED] ID: ${course.id.toString().padEnd(4)} | Code: ${(course.courseCode || "N/A").padEnd(8)} | "${course.title}"`
        );
      }
    }
  }

  // Verify remaining published courses
  const remainingPublished = await db
    .select({
      id: coursesTable.id,
      courseCode: coursesTable.courseCode,
      title: coursesTable.title,
      isPublished: coursesTable.isPublished,
      status: coursesTable.status,
    })
    .from(coursesTable)
    .where(eq(coursesTable.isPublished, true));

  logger.info(
    {
      totalEvaluated: allCourses.length,
      unpublishedCount: updatedCourses.length,
      remainingPublishedCount: remainingPublished.length,
      activePublishedCodes: remainingPublished.map((c) => c.courseCode),
    },
    `Publication boundary enforcement completed: ${remainingPublished.length} courses published (ELH-01 to ELH-35), ${updatedCourses.length} courses unpublished.`
  );

  return {
    totalEvaluated: allCourses.length,
    unpublishedCount: updatedCourses.length,
    remainingPublishedCount: remainingPublished.length,
    updatedCourses,
  };
}

if (process.argv[1]?.includes("unpublishCourses36to139")) {
  unpublishCourses36to139()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Failed to unpublish courses:", err);
      process.exit(1);
    });
}
