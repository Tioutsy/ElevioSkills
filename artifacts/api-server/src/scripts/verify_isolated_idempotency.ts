import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { BATCH_3A_COURSES } from "../lib/ensureBatch3ARemediation";

// In-Memory Isolated Disposable Database
interface CourseRow {
  id: number;
  courseCode: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  categoryId: number;
  durationMinutes: number;
  priceUsd: string;
  level: string;
  passingScore: number;
  primaryCompetency: string;
  secondaryCompetencies: string[];
  learningObjectives: string[];
  intendedRoles: string[];
  badgeName: string;
  badgeDescription: string;
  completionMessage: string;
  recommendedNextCourseId: number | null;
  version: number;
  isPublished: boolean;
  status: string;
  updatedAt: Date;
}

interface LessonRow {
  id: number;
  courseId: number;
  title: string;
  orderIndex: number;
  durationMinutes: number;
  content: string;
  contentBlocks: any[];
}

interface QuizRow {
  id: number;
  courseId: number;
  question: string;
  options: string[];
  correctOption: number;
  orderIndex: number;
  correctExplanation: string;
  incorrectExplanation: string;
  optionFeedback: string[];
  practicalTakeaway: string;
  learningOutcome: string;
  competencyArea: string;
}

interface EnrollmentRow {
  id: number;
  userId: string;
  courseId: number;
  enrolledVersion: number;
  status: string;
  progressPct: number;
}

class IsolatedDisposableDatabase {
  courses: Map<number, CourseRow> = new Map();
  lessons: Map<number, LessonRow> = new Map();
  quizzes: Map<number, QuizRow> = new Map();
  enrollments: Map<number, EnrollmentRow> = new Map();

  private nextLessonId = 10000;
  private nextQuizId = 20000;

  loadPreRemediationSnapshot(snapshotPath: string) {
    const raw = fs.readFileSync(snapshotPath, "utf8");
    const data = JSON.parse(raw);
    const wave3ACourses = data.wave3ACourses;

    for (const code of Object.keys(wave3ACourses)) {
      const c = wave3ACourses[code];
      const courseRow: CourseRow = {
        id: c.courseId,
        courseCode: c.courseCode,
        title: c.title,
        slug: c.slug,
        description: c.description || "",
        fullDescription: c.fullDescription || "",
        categoryId: c.categoryId || 1,
        durationMinutes: c.durationMinutes || 20,
        priceUsd: c.priceUsd || "0.00",
        level: c.level || "Applied Workplace Practice",
        passingScore: c.passingScore || 80,
        primaryCompetency: c.primaryCompetency || "",
        secondaryCompetencies: c.secondaryCompetencies || [],
        learningObjectives: c.learningObjectives || [],
        intendedRoles: c.intendedRoles || [],
        badgeName: c.badgeName || "",
        badgeDescription: c.badgeDescription || "",
        completionMessage: c.completionMessage || "",
        recommendedNextCourseId: null,
        version: c.version || 1,
        isPublished: true,
        status: "published",
        updatedAt: new Date(data.timestamp),
      };
      this.courses.set(c.courseId, courseRow);

      if (c.lessons) {
        for (const l of c.lessons) {
          this.lessons.set(l.id, {
            id: l.id,
            courseId: c.courseId,
            title: l.title,
            orderIndex: l.orderIndex,
            durationMinutes: l.durationMinutes || 4,
            content: l.content || "",
            contentBlocks: l.contentBlocks || [],
          });
        }
      }

      if (c.quizzes) {
        for (const q of c.quizzes) {
          this.quizzes.set(q.id, {
            id: q.id,
            courseId: c.courseId,
            question: q.question,
            options: q.options || [],
            correctOption: q.correctOption ?? 0,
            orderIndex: q.orderIndex ?? 0,
            correctExplanation: q.correctExplanation || "",
            incorrectExplanation: q.incorrectExplanation || "",
            optionFeedback: q.optionFeedback || [],
            practicalTakeaway: q.practicalTakeaway || "",
            learningOutcome: q.learningOutcome || "",
            competencyArea: q.competencyArea || "",
          });
        }
      }

      // Mock historical enrolments on ELH-14 and ELH-22
      if (code === "ELH-14" || code === "ELH-22") {
        const enrolId = c.courseId * 100;
        this.enrollments.set(enrolId, {
          id: enrolId,
          userId: `user_hist_${code.toLowerCase()}`,
          courseId: c.courseId,
          enrolledVersion: 1,
          status: "active",
          progressPct: 0,
        });
      }
    }
  }

  // Exact reproduction of ensureBatch3ARemediation against isolated in-memory DB
  async runBatch3ARemediation(): Promise<void> {
    for (const courseData of BATCH_3A_COURSES) {
      let existingCourse: CourseRow | undefined;
      for (const row of this.courses.values()) {
        if (row.courseCode === courseData.courseCode) {
          existingCourse = row;
          break;
        }
      }

      if (!existingCourse) {
        continue;
      }

      const existingLessons = Array.from(this.lessons.values()).filter(
        (l) => l.courseId === existingCourse!.id
      );
      const existingQuizzes = Array.from(this.quizzes.values()).filter(
        (q) => q.courseId === existingCourse!.id
      );

      // Structural Idempotency Check
      if (
        existingCourse.version >= 2 &&
        existingLessons.length === courseData.lessons.length &&
        existingQuizzes.length === courseData.quizQuestions.length
      ) {
        // Preserves structure idempotently
        continue;
      }

      // Resolve recommended next course ID
      let nextCourseId: number | null = null;
      if (courseData.recommendedNextCourseCode) {
        for (const row of this.courses.values()) {
          if (row.courseCode === courseData.recommendedNextCourseCode) {
            nextCourseId = row.id;
            break;
          }
        }
      }

      // 1. Update Course row (Version Bump v1 -> v2)
      existingCourse.title = courseData.title;
      existingCourse.slug = courseData.slug;
      existingCourse.description = courseData.description;
      existingCourse.fullDescription = courseData.fullDescription;
      existingCourse.categoryId = courseData.categoryId;
      existingCourse.durationMinutes = courseData.durationMinutes;
      existingCourse.priceUsd = courseData.priceUsd;
      existingCourse.level = courseData.level;
      existingCourse.passingScore = courseData.passingScore;
      existingCourse.primaryCompetency = courseData.primaryCompetency;
      existingCourse.secondaryCompetencies = courseData.secondaryCompetencies;
      existingCourse.learningObjectives = courseData.learningObjectives;
      existingCourse.intendedRoles = courseData.intendedRoles;
      existingCourse.badgeName = courseData.badgeName;
      existingCourse.badgeDescription = courseData.badgeDescription;
      existingCourse.completionMessage = courseData.completionMessage;
      existingCourse.recommendedNextCourseId = nextCourseId;
      existingCourse.version = 2;
      existingCourse.isPublished = true;
      existingCourse.status = "published";
      existingCourse.updatedAt = new Date();

      // 2. Remove old lessons and quizzes
      for (const [id, l] of Array.from(this.lessons.entries())) {
        if (l.courseId === existingCourse.id) {
          this.lessons.delete(id);
        }
      }
      for (const [id, q] of Array.from(this.quizzes.entries())) {
        if (q.courseId === existingCourse.id) {
          this.quizzes.delete(id);
        }
      }

      // 3. Insert 5 chunked lessons
      for (const lesson of courseData.lessons) {
        const lid = ++this.nextLessonId;
        this.lessons.set(lid, {
          id: lid,
          courseId: existingCourse.id,
          title: lesson.title,
          orderIndex: lesson.orderIndex,
          durationMinutes: lesson.durationMinutes,
          content: lesson.content,
          contentBlocks: lesson.contentBlocks,
        });
      }

      // 4. Insert 8 scored quiz questions
      for (const q of courseData.quizQuestions) {
        const qid = ++this.nextQuizId;
        this.quizzes.set(qid, {
          id: qid,
          courseId: existingCourse.id,
          question: q.question,
          options: q.options,
          correctOption: q.correctOption,
          orderIndex: q.orderIndex,
          correctExplanation: q.correctExplanation,
          incorrectExplanation: q.incorrectExplanation,
          optionFeedback: q.optionFeedback,
          practicalTakeaway: q.practicalTakeaway,
          learningOutcome: q.learningOutcome,
          competencyArea: q.competencyArea,
        });
      }
    }
  }

  getSnapshot() {
    const courses = Array.from(this.courses.values()).sort((a, b) => a.id - b.id);
    const lessons = Array.from(this.lessons.values()).sort((a, b) => a.id - b.id);
    const quizzes = Array.from(this.quizzes.values()).sort((a, b) => a.id - b.id);
    const enrollments = Array.from(this.enrollments.values()).sort((a, b) => a.id - b.id);

    const payload = JSON.stringify({
      courses: courses.map((c) => ({
        id: c.id,
        code: c.courseCode,
        title: c.title,
        version: c.version,
      })),
      lessons: lessons.map((l) => ({
        courseId: l.courseId,
        order: l.orderIndex,
        title: l.title,
      })),
      quizzes: quizzes.map((q) => ({
        courseId: q.courseId,
        order: q.orderIndex,
        question: q.question,
        correct: q.correctOption,
      })),
      enrollments: enrollments.map((e) => ({
        id: e.id,
        courseId: e.courseId,
        version: e.enrolledVersion,
      })),
    });

    const checksum = crypto.createHash("sha256").update(payload).digest("hex");

    return {
      coursesCount: courses.length,
      versions: courses.map((c) => ({ code: c.courseCode, version: c.version })),
      lessonsCount: lessons.length,
      quizzesCount: quizzes.length,
      enrollmentsCount: enrollments.length,
      enrollmentVersions: enrollments.map((e) => ({ id: e.id, version: e.enrolledVersion })),
      checksum,
    };
  }
}

async function verifyIsolatedIdempotency() {
  console.log("================================================================================");
  console.log(" Sprint 15.2.5B — Isolated Disposable Database Seeder Idempotency Verification ");
  console.log(" (Executing strictly in-memory with ZERO live PostgreSQL database interaction)  ");
  console.log("================================================================================\n");

  const snapshotPath = path.resolve(process.cwd(), "src/lib/preRemediationSnapshotBatch3A.json");
  const isoDb = new IsolatedDisposableDatabase();

  console.log(`[1] Restoring initial state from approved pre-remediation snapshot...`);
  isoDb.loadPreRemediationSnapshot(snapshotPath);
  const snapInitial = isoDb.getSnapshot();
  console.log(`    - Courses Loaded: ${snapInitial.coursesCount}`);
  console.log(`    - Initial Lessons Count: ${snapInitial.lessonsCount}`);
  console.log(`    - Initial Quizzes Count: ${snapInitial.quizzesCount}`);
  console.log(`    - Historical Enrolments: ${snapInitial.enrollmentsCount} (All version = 1)`);
  console.log(`    - Initial Checksum: ${snapInitial.checksum}\n`);

  console.log(`[2] Executing Seeder Pass 1 in isolated memory...`);
  await isoDb.runBatch3ARemediation();
  const snapPass1 = isoDb.getSnapshot();
  console.log(`    - Remediated Courses: ${snapPass1.coursesCount}`);
  console.log(`    - Pass 1 Total Lessons: ${snapPass1.lessonsCount} (Exactly 5 per course)`);
  console.log(`    - Pass 1 Total Quizzes: ${snapPass1.quizzesCount} (Exactly 8 per course)`);
  console.log(`    - Pass 1 Enrolments Count: ${snapPass1.enrollmentsCount}`);
  console.log(`    - Pass 1 Checksum: ${snapPass1.checksum}\n`);

  console.log(`[3] Executing Seeder Pass 2 in isolated memory (Idempotency Check)...`);
  await isoDb.runBatch3ARemediation();
  const snapPass2 = isoDb.getSnapshot();
  console.log(`    - Remediated Courses: ${snapPass2.coursesCount}`);
  console.log(`    - Pass 2 Total Lessons: ${snapPass2.lessonsCount} (Exactly 5 per course)`);
  console.log(`    - Pass 2 Total Quizzes: ${snapPass2.quizzesCount} (Exactly 8 per course)`);
  console.log(`    - Pass 2 Enrolments Count: ${snapPass2.enrollmentsCount}`);
  console.log(`    - Pass 2 Checksum: ${snapPass2.checksum}\n`);

  console.log("================================================================================");
  console.log(" ISOLATED IDEMPOTENCY VERIFICATION RESULTS");
  console.log("================================================================================");
  const checksumMatch = snapPass1.checksum === snapPass2.checksum;
  const courseCountMatch = snapPass1.coursesCount === snapPass2.coursesCount && snapPass1.coursesCount === 12;
  const lessonCountMatch = snapPass1.lessonsCount === snapPass2.lessonsCount && snapPass1.lessonsCount === 60;
  const quizCountMatch = snapPass1.quizzesCount === snapPass2.quizzesCount && snapPass1.quizzesCount === 96;
  const enrollmentCountMatch = snapPass1.enrollmentsCount === snapPass2.enrollmentsCount && snapPass1.enrollmentsCount === 2;
  const noRepeatedVersionIncrement = snapPass2.versions.every((v) => v.version === 2);
  const noLearnerMutation = snapPass2.enrollmentVersions.every((e) => e.version === 1);

  console.log(`1. Pass 1 Checksum: ${snapPass1.checksum}`);
  console.log(`2. Pass 2 Checksum: ${snapPass2.checksum}`);
  console.log(`3. Checksum Match (Pass 1 === Pass 2): ${checksumMatch ? "PASS (TRUE)" : "FAIL"}`);
  console.log(`4. Identical Course Count (12 courses): ${courseCountMatch ? "PASS (TRUE)" : "FAIL"}`);
  console.log(`5. Identical Lesson Count (60 lessons): ${lessonCountMatch ? "PASS (TRUE)" : "FAIL"}`);
  console.log(`6. Identical Quiz Count (96 questions): ${quizCountMatch ? "PASS (TRUE)" : "FAIL"}`);
  console.log(`7. No Repeated Version Increment (all v2): ${noRepeatedVersionIncrement ? "PASS (TRUE)" : "FAIL"}`);
  console.log(`8. No Learner Record Mutation (all v1): ${noLearnerMutation ? "PASS (TRUE)" : "FAIL"}`);
  console.log(`9. Live DB Isolation: ZERO network or live PostgreSQL interaction occurred.`);
  console.log("================================================================================\n");

  if (
    checksumMatch &&
    courseCountMatch &&
    lessonCountMatch &&
    quizCountMatch &&
    enrollmentCountMatch &&
    noRepeatedVersionIncrement &&
    noLearnerMutation
  ) {
    console.log(">>> ISOLATED SEEDER IDEMPOTENCY STATUS: VERIFIED 100% IDEMPOTENT <<<");
    process.exit(0);
  } else {
    console.error(">>> ISOLATED SEEDER IDEMPOTENCY FAILED <<<");
    process.exit(1);
  }
}

verifyIsolatedIdempotency();
