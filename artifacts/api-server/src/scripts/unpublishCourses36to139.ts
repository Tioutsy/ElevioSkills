import { db, coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export async function unpublishCourses36to139(): Promise<{
  totalEvaluated: number;
  unpublishedCount: number;
  remainingPublishedCount: number;
  updatedCourses: Array<{ id: number; courseCode: string | null; title: string }>;
}> {
  console.log("==================================================");
  console.log("Executing Unpublish Task: Courses 36 to 139");
  console.log("==================================================");

  // Generate all codes from ELH-36 to ELH-139
  const targetCodes = new Set<string>();
  for (let i = 36; i <= 139; i++) {
    targetCodes.add(`ELH-${i.toString().padStart(2, "0")}`);
  }

  // Canonical historical IDs for courses 36 to 136 from ELEVIO catalogue ledger
  const canonicalIds36to136 = new Set<number>([
    808, 809, 724, 810, 725, 726, 744, 745, 772, 727, 746, 811,
    711, 712, 728, 729, 747, 773, 774, 713, 748, 714, 715, 730,
    749, 731, 716, 732, 750, 775, 776, 733, 734, 751, 752, 735,
    753, 777, 778, 736, 737, 754, 755, 738, 756, 757, 779, 717,
    739, 718, 740, 761, 762, 780, 781, 763, 782, 764, 783, 741,
    758, 759, 760, 765, 766, 767, 784, 785, 786, 787, 788, 789,
    790, 791, 792, 793, 794, 795, 796, 797, 798, 719, 720, 768,
    799, 721, 722, 769, 800, 801, 802, 803, 723, 804, 805, 742,
    770, 743, 806, 807, 771
  ]);

  const allCourses = await db.select().from(coursesTable);
  console.log(`Found ${allCourses.length} total courses in database.`);

  const toUnpublish = allCourses.filter((c) => {
    // Check 1: Numeric ID between 36 and 139
    if (c.id >= 36 && c.id <= 139) return true;

    // Check 2: Canonical catalogue ID match
    if (canonicalIds36to136.has(c.id)) return true;

    // Check 3: Course code match (e.g., ELH-36 through ELH-139)
    if (c.courseCode) {
      if (targetCodes.has(c.courseCode)) return true;
      const m = c.courseCode.match(/^ELH-(\d+)$/i);
      if (m) {
        const num = parseInt(m[1], 10);
        if (num >= 36 && num <= 139) return true;
      }
    }

    return false;
  });

  console.log(`Found ${toUnpublish.length} courses matching scope (36 to 139).`);

  const updatedCourses: Array<{ id: number; courseCode: string | null; title: string }> = [];

  for (const course of toUnpublish) {
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

    console.log(
      `  [UNPUBLISHED] ID: ${course.id.toString().padEnd(4)} | Code: ${(course.courseCode || "N/A").padEnd(8)} | "${course.title}"`
    );
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

  console.log("--------------------------------------------------");
  console.log(`Summary:`);
  console.log(`- Evaluated: ${allCourses.length} courses`);
  console.log(`- Unpublished: ${updatedCourses.length} courses (set to isPublished=false, status='draft')`);
  console.log(`- Remaining Published: ${remainingPublished.length} courses`);
  console.log("--------------------------------------------------");
  console.log(`Active Published Courses:`);
  for (const c of remainingPublished) {
    console.log(`  [ACTIVE] ID: ${c.id.toString().padEnd(4)} | Code: ${(c.courseCode || "N/A").padEnd(8)} | "${c.title}"`);
  }
  console.log("==================================================");

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
