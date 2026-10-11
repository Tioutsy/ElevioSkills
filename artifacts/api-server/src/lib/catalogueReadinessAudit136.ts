import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

export type ReadinessTier =
  | "Learner-ready"
  | "Content complete"
  | "Partial"
  | "Skeleton"
  | "Recovered metadata only"
  | "Missing";

export interface CourseReadinessItem {
  code: string;
  id?: number;
  title?: string;
  slug?: string;
  readiness: ReadinessTier;
  lessonCount: number;
  quizQuestionCount: number;
  hasExplanations: boolean;
  notes: string;
}

export interface CatalogueReadinessMatrix {
  totalTarget: 136;
  totalPresent: number;
  learnerReadyCount: number;
  contentCompleteCount: number;
  partialCount: number;
  skeletonCount: number;
  missingCount: number;
  totalLessons: number;
  totalQuestions: number;
  courses: CourseReadinessItem[];
}

export async function auditCatalogueReadiness136(): Promise<CatalogueReadinessMatrix> {
  const allCourses = await db.select().from(coursesTable);
  const allLessons = await db.select().from(lessonsTable);
  const allQuestions = await db.select().from(quizQuestionsTable);

  const courseByCode = new Map<string, typeof allCourses[0]>();
  for (const c of allCourses) {
    if (c.courseCode) {
      courseByCode.set(c.courseCode, c);
    }
  }

  const items: CourseReadinessItem[] = [];

  for (let i = 1; i <= 136; i++) {
    const code = `ELH-${i.toString().padStart(2, "0")}`;
    const course = courseByCode.get(code);

    if (!course) {
      items.push({
        code,
        readiness: "Missing",
        lessonCount: 0,
        quizQuestionCount: 0,
        hasExplanations: false,
        notes: "Not found in database table",
      });
      continue;
    }

    const cLessons = allLessons.filter((l) => l.courseId === course.id);
    const cQuestions = allQuestions.filter((q) => q.courseId === course.id);
    const hasExplanations = cQuestions.some(
      (q) => (q.correctExplanation && q.correctExplanation.length > 10) || ((q as any).explanation && (q as any).explanation.length > 10)
    );

    let readiness: ReadinessTier = "Skeleton";
    let notes = "Course shell with basic metadata";

    if (cLessons.length >= 3 && cQuestions.length >= 8 && hasExplanations) {
      readiness = "Learner-ready";
      notes = "Fully authored curriculum with rich instructional lessons and comprehensive assessment";
    } else if (cLessons.length >= 2 && cQuestions.length >= 5) {
      readiness = "Content complete";
      notes = "Complete core lessons with standard assessment suite";
    } else if (cLessons.length > 0 || cQuestions.length > 0) {
      readiness = "Partial";
      notes = `Partial modules: ${cLessons.length} lessons, ${cQuestions.length} questions`;
    }

    items.push({
      code,
      id: course.id,
      title: course.title,
      slug: course.slug || undefined,
      readiness,
      lessonCount: cLessons.length,
      quizQuestionCount: cQuestions.length,
      hasExplanations,
      notes,
    });
  }

  return {
    totalTarget: 136,
    totalPresent: allCourses.length,
    learnerReadyCount: items.filter((i) => i.readiness === "Learner-ready").length,
    contentCompleteCount: items.filter((i) => i.readiness === "Content complete").length,
    partialCount: items.filter((i) => i.readiness === "Partial").length,
    skeletonCount: items.filter((i) => i.readiness === "Skeleton").length,
    missingCount: items.filter((i) => i.readiness === "Missing").length,
    totalLessons: allLessons.length,
    totalQuestions: allQuestions.length,
    courses: items,
  };
}

// Allow direct CLI execution
if (process.argv[1]?.endsWith("catalogueReadinessAudit136.ts") || process.argv[1]?.endsWith("catalogueReadinessAudit136.js")) {
  auditCatalogueReadiness136().then((res) => {
    console.log(JSON.stringify(res, null, 2));
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
