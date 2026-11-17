import { db, coursesTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { logger } from "../lib/logger";

export async function unpublishCourses36to139(): Promise<{
  totalEvaluated: number;
  unpublishedCount: number;
  remainingPublishedCount: number;
  updatedCourses: Array<{ id: number; courseCode: string | null; title: string }>;
}> {
  logger.info("Enforcing publication boundary: Keep only ELH-01 to ELH-43 published; unpublish all courses as from ELH-44...");

  // Generate allowed codes: ELH-01 to ELH-43
  const allowedCodes = new Set<string>();
  for (let i = 1; i <= 43; i++) {
    allowedCodes.add(`ELH-${i.toString().padStart(2, "0")}`);
  }

  try {
    await db.execute(sql`
      UPDATE "courses"
      SET "is_published" = false, "status" = 'draft', "updated_at" = NOW()
      WHERE ("course_code" NOT IN (
        'ELH-01','ELH-02','ELH-03','ELH-04','ELH-05','ELH-06','ELH-07','ELH-08','ELH-09','ELH-10',
        'ELH-11','ELH-12','ELH-13','ELH-14','ELH-15','ELH-16','ELH-17','ELH-18','ELH-19','ELH-20',
        'ELH-21','ELH-22','ELH-23','ELH-24','ELH-25','ELH-26','ELH-27','ELH-28','ELH-29','ELH-30',
        'ELH-31','ELH-32','ELH-33','ELH-34','ELH-35','ELH-36','ELH-37','ELH-38','ELH-39','ELH-40',
        'ELH-41','ELH-42','ELH-43'
      ) OR "course_code" IS NULL);
    `);
    await db.execute(sql`
      UPDATE "courses"
      SET "is_published" = true, "status" = 'published', "updated_at" = NOW()
      WHERE "course_code" IN (
        'ELH-01','ELH-02','ELH-03','ELH-04','ELH-05','ELH-06','ELH-07','ELH-08','ELH-09','ELH-10',
        'ELH-11','ELH-12','ELH-13','ELH-14','ELH-15','ELH-16','ELH-17','ELH-18','ELH-19','ELH-20',
        'ELH-21','ELH-22','ELH-23','ELH-24','ELH-25','ELH-26','ELH-27','ELH-28','ELH-29','ELH-30',
        'ELH-31','ELH-32','ELH-33','ELH-34','ELH-35','ELH-36','ELH-37','ELH-38','ELH-39','ELH-40',
        'ELH-41','ELH-42','ELH-43'
      );
    `);
  } catch (sqlErr) {
    logger.warn({ err: sqlErr }, "Direct SQL batch unpublish notice, proceeding with ORM iteration...");
  }

  const allCourses = await db.select().from(coursesTable);
  logger.info(`Found ${allCourses.length} total courses in database.`);

  const updatedCourses: Array<{ id: number; courseCode: string | null; title: string }> = [];

  for (const course of allCourses) {
    const isAllowed = course.courseCode && allowedCodes.has(course.courseCode);

    if (isAllowed) {
      // Ensure ELH-01 through ELH-43 remain published
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
      // Unpublish all other courses (ELH-44 upwards or unassigned)
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
