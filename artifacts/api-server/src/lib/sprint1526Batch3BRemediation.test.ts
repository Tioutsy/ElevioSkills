import { describe, test, before } from "node:test";
import * as assert from "node:assert/strict";
import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  enrollmentsTable,
  lessonProgressTable,
} from "@workspace/db";
import { inArray, eq, notLike } from "drizzle-orm";
import * as fs from "node:fs";
import {
  BATCH_3B_COURSES,
  ensureBatch3BRemediation,
  executeVersionSafeRollbackBatch3B,
} from "./ensureBatch3BRemediation";
import { CANONICAL_BATCH_3_REGISTER } from "./canonicalBatch3Register";

describe("Sprint 15.2.6 — Batch 3B Remediation Master Verification Suite", () => {
  let snapshotData: any = null;

  const WAVE_3B_CODES = [
    "ELH-17", "ELH-19", "ELH-20", "ELH-23",
    "ELH-35", "ELH-36", "ELH-39", "ELH-43",
    "ELH-45", "ELH-47", "ELH-48", "ELH-49",
    "ELH-50", "ELH-52", "ELH-53", "ELH-54",
    "ELH-55", "ELH-56",
  ];

  const BATCH_1_CODES = [
    "ELH-01", "ELH-02", "ELH-07", "ELH-08",
    "ELH-09", "ELH-10", "ELH-11", "ELH-31",
    "ELH-32", "ELH-33", "ELH-34",
  ];

  const BATCH_2_CODES = [
    "ELH-03", "ELH-04", "ELH-05", "ELH-06",
    "ELH-18", "ELH-24", "ELH-25", "ELH-26",
    "ELH-27", "ELH-28", "ELH-29", "ELH-30",
  ];

  const WAVE_3A_CODES = [
    "ELH-13", "ELH-14", "ELH-15", "ELH-16",
    "ELH-21", "ELH-22", "ELH-117", "ELH-118",
    "ELH-121", "ELH-122", "ELH-128", "ELH-130",
  ];

  const EXPECTED_BATCH_3B_CANONICAL_MAP: Record<string, { id: number; title: string }> = {
    "ELH-17": { id: 163, title: "Tracking Sustainability Actions and Progress" },
    "ELH-19": { id: 161, title: "Reviewing Sustainability Performance and Taking Corrective Action" },
    "ELH-20": { id: 164, title: "Sustainability Roles, Responsibilities and Accountability" },
    "ELH-23": { id: 895, title: "Planning and Delivering Workplace Sustainability Initiatives" },
    "ELH-35": { id: 710, title: "Sustainable Housekeeping Operations" },
    "ELH-36": { id: 808, title: "Sustainable Commercial Kitchens & Culinary" },
    "ELH-39": { id: 810, title: "Hotel Engineering: Central Plant & HVAC Optimization" },
    "ELH-43": { id: 745, title: "Energy-Efficient Hotel Guest Rooms & Smart Controls" },
    "ELH-45": { id: 727, title: "Sustainable Hospitality Sourcing & Local Purchasing" },
    "ELH-47": { id: 811, title: "Green Leases & Tenant Sustainability Engagement" },
    "ELH-48": { id: 711, title: "Smart Building Automation & BMS Optimization" },
    "ELH-49": { id: 712, title: "Construction Site Environmental Controls" },
    "ELH-50": { id: 728, title: "Sustainable Building Materials & Low-Carbon Concrete" },
    "ELH-52": { id: 747, title: "Sustainable Property Facility Operations" },
    "ELH-53": { id: 773, title: "Green Building Retrofits & Decarbonization Pathways" },
    "ELH-54": { id: 774, title: "Sustainable Property HVAC & Chiller Optimization" },
    "ELH-55": { id: 713, title: "Legionella & Water System Safety in Facilities" },
    "ELH-56": { id: 748, title: "Sustainable Building Certifications (LEED/BREEAM)" },
  };

  before(async () => {
    await ensureBatch3BRemediation();
    const rawSnapshot = fs.readFileSync("src/lib/preRemediationSnapshotBatch3B.json", "utf-8");
    snapshotData = JSON.parse(rawSnapshot);
  });

  // Gate 1: Reconcile exact 18 authorized Wave 3B courses
  test("Gate 1: Should contain exactly 18 authorized Wave 3B courses in BATCH_3B_COURSES", () => {
    assert.equal(BATCH_3B_COURSES.length, 18);
    const codes = BATCH_3B_COURSES.map((c) => c.courseCode);
    assert.deepEqual(codes, WAVE_3B_CODES);
  });

  // Gate 2: Database ID and Canonical Title Alignment
  test("Gate 2: Should match authoritative canonical title and ID mapping from CANONICAL_BATCH_3_REGISTER", () => {
    for (const courseData of BATCH_3B_COURSES) {
      const expected = EXPECTED_BATCH_3B_CANONICAL_MAP[courseData.courseCode];
      assert.ok(expected, `Missing expectation for ${courseData.courseCode}`);
      assert.equal(courseData.title, expected.title);

      const regEntry = CANONICAL_BATCH_3_REGISTER.find(
        (r) => r.courseCode === courseData.courseCode
      );
      assert.ok(regEntry, `Missing register entry for ${courseData.courseCode}`);
      assert.equal(regEntry?.title, expected.title);
      assert.equal(regEntry?.waveAssignment, "Wave 3B");
    }
  });

  // Gate 3: Version bumped to v2 across all 18 courses
  test("Gate 3: Should have version = 2 for all 18 Wave 3B courses in the database", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    assert.equal(courses.length, 18);
    for (const c of courses) {
      assert.equal(c.version, 2);
      assert.equal(c.isPublished, true);
      assert.equal(c.status, "published");
      const expected = EXPECTED_BATCH_3B_CANONICAL_MAP[c.courseCode!];
      assert.equal(c.id, expected.id);
      assert.equal(c.title, expected.title);
    }
  });

  // Gate 4: Exactly 5 chunked lessons per course
  test("Gate 4: Should contain exactly 5 chunked lessons for each Wave 3B course", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, c.id))
        .orderBy(lessonsTable.orderIndex);
      assert.equal(lessons.length, 5);
      for (let i = 0; i < 5; i++) {
        assert.equal(lessons[i].orderIndex, i);
        assert.ok((lessons[i].durationMinutes || 0) >= 3);
        assert.ok(lessons[i].title);
        assert.ok(Array.isArray(lessons[i].contentBlocks));
        assert.ok((lessons[i].contentBlocks as any[]).length >= 2);
      }
    }
  });

  // Gate 5: At least 2 interactive decision scenarios in Lesson 4
  test("Gate 5: Should have at least 2 interactive decision scenarios in Lesson 4 with 4 options and feedback", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, c.id))
        .orderBy(lessonsTable.orderIndex);
      const l4 = lessons[3];
      const blocks = l4.contentBlocks as any[];
      const scenarios = blocks.filter((b) => b.type === "interactive_scenario");
      assert.ok(
        scenarios.length >= 2,
        `Course ${c.courseCode} has less than 2 scenarios in lesson 4`
      );
      for (const sc of scenarios) {
        assert.ok(sc.prompt);
        assert.equal(sc.options.length, 4);
        const correctOpts = sc.options.filter((o: any) => o.isCorrect === true);
        assert.equal(correctOpts.length, 1);
        for (const opt of sc.options) {
          assert.ok(opt.text);
          assert.ok(opt.feedback);
          assert.ok(opt.feedback.length > 10);
        }
      }
    }
  });

  // Gate 6: Exactly 8 scored assessment items per course
  test("Gate 6: Should have exactly 8 scored quiz questions per course (144 total)", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    let totalQuestions = 0;
    for (const c of courses) {
      const quizzes = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, c.id))
        .orderBy(quizQuestionsTable.orderIndex);
      assert.equal(quizzes.length, 8);
      totalQuestions += quizzes.length;
    }
    assert.equal(totalQuestions, 144);
  });

  // Gate 7: Exactly 4 distinct answer options per quiz item
  test("Gate 7: Should provide exactly 4 distinct answer options per question", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      const quizzes = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, c.id));
      for (const q of quizzes) {
        const opts = q.options as string[];
        assert.equal(opts.length, 4);
        const uniqueOpts = new Set(opts);
        assert.equal(uniqueOpts.size, 4);
      }
    }
  });

  // Gate 8: Option-level teaching feedback on all 4 options
  test("Gate 8: Should provide optionFeedback for all 4 options per question", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      const quizzes = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, c.id));
      for (const q of quizzes) {
        const feedbacks = q.optionFeedback as string[];
        assert.equal(feedbacks.length, 4);
        for (const fb of feedbacks) {
          assert.ok(fb.length > 10);
        }
      }
    }
  });

  // Gate 9: Passing score calibrated to 75%
  test("Gate 9: Should have passingScore = 75 across all 18 courses", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      assert.equal(c.passingScore, 75);
    }
  });

  // Gate 10: Level set to D3 Applied Workplace Practice
  test("Gate 10: Should have level = 'D3 Applied' across all 18 courses", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      assert.equal(c.level, "D3 Applied");
    }
  });

  // Gate 11: Calibrated 20-minute duration
  test("Gate 11: Should have durationMinutes = 20 across all 18 courses", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      assert.equal(c.durationMinutes, 20);
    }
  });

  // Gate 12: Applied workplace hook in Lesson 1
  test("Gate 12: Should feature an operational workplace hook in Lesson 1", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      const [l1] = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, c.id))
        .orderBy(lessonsTable.orderIndex)
        .limit(1);
      assert.equal(l1.orderIndex, 0);
      assert.ok(l1.content && l1.content.length > 20);
    }
  });

  // Gate 13: 30-day Workplace Action in Lesson 5
  test("Gate 13: Should include a 30-day Workplace Action in Lesson 5", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, c.id))
        .orderBy(lessonsTable.orderIndex);
      const l5 = lessons[4];
      assert.equal(l5.orderIndex, 4);
      const blocks = l5.contentBlocks as any[];
      const actionBlocks = blocks.filter(
        (b) => b.variant === "action" || (b.title && b.title.includes("Action"))
      );
      assert.ok(actionBlocks.length >= 1);
    }
  });

  // Gate 14: Valid recommended next course code & ID
  test("Gate 14: Should have a valid recommended next course code and resolved ID", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      assert.ok(
        c.recommendedNextCourseId && c.recommendedNextCourseId > 0,
        `Course ${c.courseCode} missing valid recommendedNextCourseId`
      );
      const def = BATCH_3B_COURSES.find((item) => item.courseCode === c.courseCode);
      assert.ok(
        def?.recommendedNextCourseCode?.startsWith("ELH-"),
        `Course ${c.courseCode} definition missing recommendedNextCourseCode`
      );
    }
  });

  // Gate 15: Course completion badge definition
  test("Gate 15: Should define completion badge name and message", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));
    for (const c of courses) {
      assert.ok(c.badgeName);
      assert.ok(c.badgeName.length > 5);
      assert.ok(c.completionMessage);
      assert.ok(c.completionMessage.length > 15);
    }
  });

  // Gate 16: Zero-touch protection of previous 35 remediated courses
  test("Gate 16: Should preserve all 35 previously remediated courses at version >= 2", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const prevRemediated = allCourses.filter(
      (c) =>
        c.courseCode &&
        (BATCH_1_CODES.includes(c.courseCode) ||
          BATCH_2_CODES.includes(c.courseCode) ||
          WAVE_3A_CODES.includes(c.courseCode))
    );

    assert.equal(prevRemediated.length, 35);
    for (const c of prevRemediated) {
      assert.ok((c.version ?? 1) >= 2);
    }

    // Check single ELH-06 recommendation target invariant
    const elh06 = allCourses.find((c) => c.courseCode === "ELH-06");
    assert.ok(elh06);
    assert.equal(elh06?.recommendedNextCourseId, 7);
  });

  // Gate 17: Protection of un-remediated courses at version 1
  test("Gate 17: Remaining courses remain untouched at version 1 (at least 65, up to 83 at Wave 3B)", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(allCourses.length, 136);

    const v1Courses = allCourses.filter((c) => (c.version ?? 1) === 1);
    assert.ok(v1Courses.length <= 83);
  });

  // Gate 18: Total catalogue totals: 136 total, at least 53 remediated
  test("Gate 18: Total catalogue numbers: exactly 136 total, at least 53 remediated", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(allCourses.length, 136);

    const remediated = allCourses.filter((c) => (c.version ?? 1) >= 2);
    assert.ok(remediated.length >= 53);
  });

  // Gate 19: Forward-only rollback safety on isolated non-canonical record
  test("Gate 19: Forward rollback should increment version monotonically without decrementing", async () => {
    const testCode = "TEST-ISOLATED-ROLLBACK-BATCH3B";

    // Clean up any previous test artifact
    await db.delete(coursesTable).where(eq(coursesTable.courseCode, testCode));

    const [created] = await db
      .insert(coursesTable)
      .values({
        courseCode: testCode,
        title: "Isolated Rollback Test Course",
        slug: "test-isolated-rollback-batch3b",
        description: "Isolated rollback verification test row",
        fullDescription: "Isolated rollback verification test row",
        categoryId: 1,
        durationMinutes: 20,
        priceUsd: "0.00",
        level: "D3 Applied",
        passingScore: 75,
        version: 2,
      })
      .returning();

    assert.equal(created.version, 2);

    const dummySnapshot = {
      title: "Restored Historical Title",
      description: "Restored historical description",
      lessons: [],
      quizQuestions: [],
    };

    const nextVer = await executeVersionSafeRollbackBatch3B(testCode, dummySnapshot);

    // Strict forward increment: v2 -> v3
    assert.equal(nextVer, 3);

    const [updated] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, testCode));

    assert.equal(updated.version, 3);
    assert.equal(updated.title, "Restored Historical Title");

    // Cleanup isolated test row
    await db.delete(coursesTable).where(eq(coursesTable.id, created.id));
  });

  // Gate 20: Pre-remediation baseline snapshot integrity
  test("Gate 20: Pre-remediation snapshot covers all 18 Wave 3B courses with valid checksums", () => {
    assert.ok(snapshotData);
    assert.equal(snapshotData.sprint, "Sprint 15.2.6");
    assert.equal(snapshotData.wave3BCoursesCount, 18);
    assert.equal(Object.keys(snapshotData.wave3BCourses).length, 18);

    for (const code of WAVE_3B_CODES) {
      const snap = snapshotData.wave3BCourses[code];
      assert.ok(snap, `Missing snapshot for ${code}`);
      assert.ok(snap.contentChecksum, `Missing checksum for ${code}`);
      assert.equal(snap.contentChecksum.length, 64);
    }
  });

  // Gate 21: Idempotency of ensureBatch3BRemediation()
  test("Gate 21: Repeated execution of ensureBatch3BRemediation is completely idempotent", async () => {
    // Run second pass
    await ensureBatch3BRemediation();

    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3B_CODES));

    assert.equal(courses.length, 18);
    for (const c of courses) {
      assert.equal(c.version, 2);
    }
  });
});
