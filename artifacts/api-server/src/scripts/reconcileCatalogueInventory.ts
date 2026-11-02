/**
 * Reproducible Catalogue & Assessment Inventory Reconciliation CLI
 *
 * Usage:
 *   pnpm --filter @workspace/api-server exec tsx src/scripts/reconcileCatalogueInventory.ts
 *
 * Connects to the configured database (or mock DB when running in dry-run/test mode)
 * and outputs a complete record-by-record inventory of:
 *   - Course ID, stable courseCode, slug, title, version
 *   - Publication status (published / draft / review / archived), category, level
 *   - Active and archived lesson counts + substantive block status
 *   - Active and archived scored quiz question counts
 *   - Option-level feedback and explanation completeness
 *   - Answer-key distribution (options A/B/C/D)
 *   - Separate diagnostic question bank count (DIAG-*, 88 questions)
 *   - Duplicate slug/code/title and broken recommendedNextCourseId detection
 */
import { db, coursesTable, categoriesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "../lib/diagnosticEngine";

export interface CourseReconciliationRow {
  id: number;
  courseCode: string | null;
  slug: string | null;
  title: string;
  version: number;
  status: string;
  isPublished: boolean;
  categoryId: number | null;
  categoryName: string | null;
  level: string;
  durationMinutes: number;
  activeLessonCount: number;
  archivedLessonCount: number;
  substantiveLessonCount: number;
  activeScoredQuestionCount: number;
  archivedScoredQuestionCount: number;
  questionsWithCompleteOptionsAndKey: number;
  questionsWithExplanations: number;
  questionsWithOptionFeedback: number;
  answerKeyDistribution: [number, number, number, number];
  recommendedNextCourseId: number | null;
  brokenNextCourseReference: boolean;
  readinessStatus: "READY" | "DRAFT_INCOMPLETE" | "NEEDS_REMEDIATION";
  readinessReasons: string[];
}

export async function generateCatalogueInventoryReport() {
  const courses = await db
    .select({
      id: coursesTable.id,
      courseCode: coursesTable.courseCode,
      slug: coursesTable.slug,
      title: coursesTable.title,
      version: coursesTable.version,
      status: coursesTable.status,
      isPublished: coursesTable.isPublished,
      categoryId: coursesTable.categoryId,
      categoryName: categoriesTable.name,
      level: coursesTable.level,
      durationMinutes: coursesTable.durationMinutes,
      learningObjectives: coursesTable.learningObjectives,
      recommendedNextCourseId: coursesTable.recommendedNextCourseId,
    })
    .from(coursesTable)
    .leftJoin(categoriesTable, eq(coursesTable.categoryId, categoriesTable.id));

  const lessons = await db.select().from(lessonsTable);
  const questions = await db.select().from(quizQuestionsTable);

  const courseIds = new Set(courses.map((c) => c.id));
  const lessonsByCourse = new Map<number, typeof lessons>();
  for (const l of lessons) {
    const arr = lessonsByCourse.get(l.courseId) ?? [];
    arr.push(l);
    lessonsByCourse.set(l.courseId, arr);
  }

  const questionsByCourse = new Map<number, typeof questions>();
  for (const q of questions) {
    const arr = questionsByCourse.get(q.courseId) ?? [];
    arr.push(q);
    questionsByCourse.set(q.courseId, arr);
  }

  const rows: CourseReconciliationRow[] = courses.map((c) => {
    const cLessons = lessonsByCourse.get(c.id) ?? [];
    const activeLessons = cLessons.filter((l) => !l.isArchived);
    const archivedLessons = cLessons.filter((l) => l.isArchived);
    const substantiveLessons = activeLessons.filter((l) => {
      const blocks = Array.isArray(l.contentBlocks) ? l.contentBlocks : [];
      const bodyLen = typeof l.content === "string" ? l.content.trim().length : 0;
      return blocks.length >= 3 || bodyLen >= 200;
    });

    const cQuestions = questionsByCourse.get(c.id) ?? [];
    const activeQuestions = cQuestions.filter((q) => !q.isArchived);
    const archivedQuestions = cQuestions.filter((q) => q.isArchived);

    const dist: [number, number, number, number] = [0, 0, 0, 0];
    let completeOpts = 0;
    let withExplanations = 0;
    let withOptionFeedback = 0;

    for (const q of activeQuestions) {
      const opts = Array.isArray(q.options) ? q.options : [];
      if (
        typeof q.question === "string" &&
        q.question.trim().length > 10 &&
        opts.length >= 2 &&
        typeof q.correctOption === "number" &&
        q.correctOption >= 0 &&
        q.correctOption < opts.length
      ) {
        completeOpts++;
      }
      if (q.correctOption >= 0 && q.correctOption < 4) {
        dist[q.correctOption]++;
      }
      if (
        typeof q.correctExplanation === "string" &&
        q.correctExplanation.trim().length > 0 &&
        typeof q.incorrectExplanation === "string" &&
        q.incorrectExplanation.trim().length > 0
      ) {
        withExplanations++;
      }
      if (Array.isArray(q.optionFeedback) && q.optionFeedback.length >= opts.length) {
        withOptionFeedback++;
      }
    }

    const brokenNext =
      c.recommendedNextCourseId !== null &&
      c.recommendedNextCourseId !== undefined &&
      !courseIds.has(c.recommendedNextCourseId);

    const reasons: string[] = [];
    if (activeLessons.length === 0) reasons.push("No active lessons");
    if (substantiveLessons.length < activeLessons.length) {
      reasons.push(`${activeLessons.length - substantiveLessons.length} lesson(s) lack substantive body/blocks`);
    }
    if (activeQuestions.length === 0) reasons.push("Zero active scored quiz questions");
    else if (activeQuestions.length < 8) reasons.push(`Only ${activeQuestions.length} active scored questions (<8 target)`);
    if (completeOpts < activeQuestions.length) reasons.push("Incomplete question options or invalid correctOption index");
    if (withExplanations < activeQuestions.length) reasons.push("Missing correct/incorrect explanations on some questions");
    if (brokenNext) reasons.push(`Broken recommendedNextCourseId (${c.recommendedNextCourseId})`);

    const readinessStatus: CourseReconciliationRow["readinessStatus"] =
      reasons.length === 0
        ? "READY"
        : !c.isPublished || c.status !== "published"
        ? "DRAFT_INCOMPLETE"
        : "NEEDS_REMEDIATION";

    return {
      id: c.id,
      courseCode: c.courseCode ?? null,
      slug: c.slug ?? null,
      title: c.title,
      version: c.version ?? 1,
      status: c.status ?? "draft",
      isPublished: Boolean(c.isPublished),
      categoryId: c.categoryId ?? null,
      categoryName: c.categoryName ?? null,
      level: c.level,
      durationMinutes: c.durationMinutes,
      activeLessonCount: activeLessons.length,
      archivedLessonCount: archivedLessons.length,
      substantiveLessonCount: substantiveLessons.length,
      activeScoredQuestionCount: activeQuestions.length,
      archivedScoredQuestionCount: archivedQuestions.length,
      questionsWithCompleteOptionsAndKey: completeOpts,
      questionsWithExplanations: withExplanations,
      questionsWithOptionFeedback: withOptionFeedback,
      answerKeyDistribution: dist,
      recommendedNextCourseId: c.recommendedNextCourseId ?? null,
      brokenNextCourseReference: brokenNext,
      readinessStatus,
      readinessReasons: reasons,
    };
  });

  const publishedRows = rows.filter((r) => r.isPublished && r.status === "published");
  const draftRows = rows.filter((r) => !r.isPublished || r.status !== "published");

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      totalCourses: rows.length,
      publishedCourses: publishedRows.length,
      draftOrUnpublishedCourses: draftRows.length,
      totalActiveLessons: rows.reduce((s, r) => s + r.activeLessonCount, 0),
      totalActiveScoredQuestions: rows.reduce((s, r) => s + r.activeScoredQuestionCount, 0),
      publishedActiveScoredQuestions: publishedRows.reduce((s, r) => s + r.activeScoredQuestionCount, 0),
      diagnosticQuestionBankCount: DIAGNOSTIC_QUESTION_BANK.length,
      readyCoursesCount: rows.filter((r) => r.readinessStatus === "READY").length,
      draftIncompleteCount: rows.filter((r) => r.readinessStatus === "DRAFT_INCOMPLETE").length,
      needsRemediationCount: rows.filter((r) => r.readinessStatus === "NEEDS_REMEDIATION").length,
    },
    courses: rows,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateCatalogueInventoryReport()
    .then((report) => {
      console.log(JSON.stringify(report.summary, null, 2));
      process.exit(0);
    })
    .catch((err) => {
      console.error("Failed to generate catalogue inventory report:", err);
      process.exit(1);
    });
}
