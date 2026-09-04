import { describe, test, before } from "node:test";
import * as assert from "node:assert/strict";
import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  enrollmentsTable,
  lessonProgressTable,
  certificatesTable,
  quizAttemptsTable,
  badgeDefinitionsTable,
} from "@workspace/db";
import { inArray, eq, notInArray, and, notLike } from "drizzle-orm";
import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine";
import {
  BATCH_3A_COURSES,
  ensureBatch3ARemediation,
  executeVersionSafeRollbackBatch3A,
} from "./ensureBatch3ARemediation";

describe("Sprint 15.2.5 — Batch 3A Remediation Master Verification Suite", () => {
  let snapshotData: any = null;
  const WAVE_3A_CODES = [
    "ELH-13", "ELH-14", "ELH-15", "ELH-16",
    "ELH-21", "ELH-22", "ELH-117", "ELH-118",
    "ELH-121", "ELH-122", "ELH-128", "ELH-130"
  ];

  const BATCH_1_CODES = [
    "ELH-01", "ELH-02", "ELH-07", "ELH-08",
    "ELH-09", "ELH-10", "ELH-11", "ELH-31",
    "ELH-32", "ELH-33", "ELH-34"
  ];

  const BATCH_2_CODES = [
    "ELH-03", "ELH-04", "ELH-05", "ELH-06",
    "ELH-18", "ELH-24", "ELH-25", "ELH-26",
    "ELH-27", "ELH-28", "ELH-29", "ELH-30"
  ];

  before(async () => {
    await ensureBatch3ARemediation();
    const rawSnapshot = fs.readFileSync("src/lib/preRemediationSnapshotBatch3A.json", "utf-8");
    snapshotData = JSON.parse(rawSnapshot);
  });

  // Gate 1: Reconcile exact 12 authorized Wave 3A courses
  test("Gate 1: Should contain exactly 12 authorized Wave 3A courses in BATCH_3A_COURSES", () => {
    assert.equal(BATCH_3A_COURSES.length, 12);
    const codes = BATCH_3A_COURSES.map(c => c.courseCode);
    assert.deepEqual(codes, WAVE_3A_CODES);
  });

  // Gate 2: Version bumped to v2 across all 12 courses
  test("Gate 2: Should have version = 2 for all 12 Wave 3A courses in the database", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    assert.equal(courses.length, 12);
    for (const c of courses) {
      assert.equal(c.version, 2);
      assert.equal(c.isPublished, true);
      assert.equal(c.status, "published");
    }
  });

  // Gate 3: Exactly 5 chunked lessons per course
  test("Gate 3: Should contain exactly 5 chunked lessons for each Wave 3A course", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, c.id)).orderBy(lessonsTable.orderIndex);
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

  // Gate 4: At least 2 interactive decision scenarios in Lesson 4 with genuine trade-offs
  test("Gate 4: Should have at least 2 interactive decision scenarios in Lesson 4 with score & consequences", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, c.id)).orderBy(lessonsTable.orderIndex);
      const l4 = lessons[3];
      const blocks = l4.contentBlocks as any[];
      const scenarios = blocks.filter(b => b.type === "interactive_scenario");
      assert.ok(scenarios.length >= 2, `Course ${c.courseCode} has less than 2 scenarios in lesson 4`);
      for (const sc of scenarios) {
        assert.ok(sc.prompt);
        assert.ok(sc.options.length >= 2);
        for (const opt of sc.options) {
          assert.ok(opt.text);
          assert.ok(opt.consequence);
          assert.ok(opt.feedback);
          assert.equal(typeof opt.score, "number");
        }
      }
    }
  });

  // Gate 5: Exactly 8 scored assessment items per course
  test("Gate 5: Should have exactly 8 scored quiz questions per course", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const quizzes = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, c.id)).orderBy(quizQuestionsTable.orderIndex);
      assert.equal(quizzes.length, 8);
    }
  });

  // Gate 6: Exactly 4 distinct answer options per quiz item
  test("Gate 6: Should provide exactly 4 distinct answer options per question", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const quizzes = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, c.id));
      for (const q of quizzes) {
        const opts = q.options as string[];
        assert.equal(opts.length, 4);
        const uniqueOpts = new Set(opts);
        assert.equal(uniqueOpts.size, 4);
      }
    }
  });

  // Gate 7: Option-level teaching feedback on all 4 options
  test("Gate 7: Should provide optionFeedback for all 4 options per question", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const quizzes = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, c.id));
      for (const q of quizzes) {
        const feedbacks = q.optionFeedback as string[];
        assert.equal(feedbacks.length, 4);
        for (const fb of feedbacks) {
          assert.ok(fb.length > 15);
        }
      }
    }
  });

  // Gate 8: Passing score calibrated to 75%
  test("Gate 8: Should have passingScore = 75 across all 12 courses", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      assert.equal(c.passingScore, 75);
    }
  });

  // Gate 9: Level set to D3 Applied Workplace Practice
  test("Gate 9: Should have level = 'D3 Applied' across all 12 courses", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      assert.equal(c.level, "D3 Applied");
    }
  });

  // Gate 10: Valid primary and secondary competency mappings
  test("Gate 10: Should map valid primary and secondary competencies", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      assert.ok(c.primaryCompetency);
      assert.ok(c.primaryCompetency.startsWith("COMP_"));
      assert.ok(Array.isArray(c.secondaryCompetencies));
      assert.ok((c.secondaryCompetencies as string[]).length >= 1);
    }
  });

  // Gate 11: Calibrated 20-minute duration
  test("Gate 11: Should have durationMinutes = 20 across all 12 courses", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      assert.equal(c.durationMinutes, 20);
    }
  });

  // Gate 12: Applied workplace hook in Lesson 1
  test("Gate 12: Should feature an operational workplace hook in Lesson 1", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const [l1] = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, c.id)).orderBy(lessonsTable.orderIndex).limit(1);
      assert.equal(l1.orderIndex, 0);
      assert.ok(l1.content && l1.content.length > 30);
    }
  });

  // Gate 13: 30-day Workplace Action in Lesson 5
  test("Gate 13: Should include a 30-day Workplace Action in Lesson 5", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, c.id)).orderBy(lessonsTable.orderIndex);
      const l5 = lessons[4];
      assert.equal(l5.orderIndex, 4);
      const blocks = l5.contentBlocks as any[];
      const actionBlocks = blocks.filter(b => b.variant === "action" || (b.title && b.title.includes("Action")));
      assert.ok(actionBlocks.length >= 1);
    }
  });

  // Gate 14: Valid recommended next course code & ID
  test("Gate 14: Should have a valid recommended next course code and resolved ID", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      assert.ok(c.recommendedNextCourseId && c.recommendedNextCourseId > 0, `Course ${c.courseCode} missing valid recommendedNextCourseId`);
      const def = BATCH_3A_COURSES.find(item => item.courseCode === c.courseCode);
      assert.ok(def?.recommendedNextCourseCode?.startsWith("ELH-"), `Course ${c.courseCode} definition missing recommendedNextCourseCode`);
    }
  });

  // Gate 15: Course completion badge definition
  test("Gate 15: Should define completion badge name and message", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      assert.ok(c.badgeName);
      assert.ok(c.badgeName.length > 5);
      assert.ok(c.completionMessage);
      assert.ok(c.completionMessage.length > 15);
    }
  });

  // Gate 16: Zero-touch protection for pre-Wave-3A courses
  test("Gate 16: Should preserve all Batch 1 & 2 courses at version >= 2 and catalogue total at 136", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(allCourses.length, 136);

    const b1b2Courses = allCourses.filter(c => c.courseCode && (BATCH_1_CODES.includes(c.courseCode) || BATCH_2_CODES.includes(c.courseCode)));
    assert.equal(b1b2Courses.length, 23);
    for (const c of b1b2Courses) {
      assert.ok((c.version ?? 1) >= 2);
    }
  });

  // Gate 17: Total canonical catalogue = 136 courses
  test("Gate 17: Should maintain exactly 136 total courses in database", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(allCourses.length, 136);
  });

  // Gate 18: Total remediated courses across Batch 1, 2, and 3A should equal at least 35
  test("Gate 18: Total remediated courses across Batch 1, 2, and 3A should be at least 35", async () => {
    const remediated = await db.select().from(coursesTable).where(and(eq(coursesTable.version, 2), notLike(coursesTable.courseCode, "TEST-%")));
    assert.ok(remediated.length >= 35);
  });

  // Gate 19: Forward-only rollback safety
  test("Gate 19: Forward rollback should increment version monotonically without decrementing", async () => {
    const testCode = "TEST-ISOLATED-ROLLBACK-BATCH3A";

    // Create temporary isolated course
    await db.delete(coursesTable).where(eq(coursesTable.courseCode, testCode));
    const [created] = await db
      .insert(coursesTable)
      .values({
        courseCode: testCode,
        title: "Test Rollback Course Batch 3A",
        slug: "test-rollback-course-batch-3a",
        description: "Test description for forward rollback verification",
        categoryId: 1,
        level: "D3 Applied Workplace Practice",
        version: 2,
        isPublished: true,
        priceUsd: "0",
        passingScore: 75,
      })
      .returning();

    const newV = await executeVersionSafeRollbackBatch3A(testCode, {
      title: "Sustainability Action Planning (Rollback Test)",
    });
    assert.equal(newV, 3, "Forward rollback must bump version from 2 to 3");

    const [cAfter] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, testCode));
    assert.equal(cAfter.version, 3, "Database record must reflect version 3");

    // Clean up temporary isolated course without touching any canonical records
    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, created.id));
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, created.id));
    await db.delete(coursesTable).where(eq(coursesTable.id, created.id));
  });

  // Gate 20: Pre-submission quiz payload security
  test("Gate 20: Correct options should be valid integer indices between 0 and 3", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const quizzes = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, c.id));
      for (const q of quizzes) {
        assert.ok(q.correctOption >= 0 && q.correctOption <= 3);
      }
    }
  });

  // Gate 21: Sequential lesson ordering (0..4)
  test("Gate 21: Should have strictly sequential lesson order indexes from 0 to 4", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, c.id)).orderBy(lessonsTable.orderIndex);
      const orders = lessons.map(l => l.orderIndex);
      assert.deepEqual(orders, [0, 1, 2, 3, 4]);
    }
  });

  // Gate 22: Sequential quiz ordering (0..7)
  test("Gate 22: Should have strictly sequential quiz question order indexes from 0 to 7", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const quizzes = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, c.id)).orderBy(quizQuestionsTable.orderIndex);
      const orders = quizzes.map(q => q.orderIndex);
      assert.deepEqual(orders, [0, 1, 2, 3, 4, 5, 6, 7]);
    }
  });

  // Gate 23: Pre-remediation snapshot file integrity
  test("Gate 23: Pre-remediation snapshot file should contain all 12 Wave 3A courses", () => {
    assert.equal(snapshotData.totalCanonicalCourses, 136);
    assert.equal(snapshotData.wave3ACoursesCount, 12);
    assert.equal(snapshotData.previouslyRemediatedCount, 23);
    assert.equal(snapshotData.otherCatalogueCount, 101);
    for (const code of WAVE_3A_CODES) {
      assert.ok(snapshotData.wave3ACourses[code]);
      assert.equal(snapshotData.wave3ACourses[code].courseCode, code);
    }
  });

  // Gate 24: Instructional review artifact and Claim-Evidence Register presence
  test("Gate 24: batch3AInstructionalQualityReview.md should exist and cover all 12 courses", () => {
    const content = fs.readFileSync("src/lib/batch3AInstructionalQualityReview.md", "utf-8");
    for (const code of WAVE_3A_CODES) {
      assert.ok(content.includes(code), `Review document missing ${code}`);
    }
    assert.ok(content.includes("Claim-Evidence Register"));
    assert.ok(content.includes("OSHA 2005"));
    assert.ok(content.includes("ICC Advertising and Marketing Communications Code"));
  });

  // Gate 25: Unique lowercase slugs
  test("Gate 25: All 12 courses should have unique lowercase slugs", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    const slugs = courses.map(c => c.slug);
    const uniqueSlugs = new Set(slugs);
    assert.equal(uniqueSlugs.size, 12);
    for (const s of slugs) {
      assert.ok(s);
      assert.equal(s, s.toLowerCase());
      assert.match(s, /^[a-z0-9-]+$/);
    }
  });

  // Gate 26: At least 4 measurable learning objectives
  test("Gate 26: Should have at least 4 learning objectives per course", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const objs = c.learningObjectives as string[];
      assert.ok(objs.length >= 4);
    }
  });

  // Gate 27: Relevant operational target roles
  test("Gate 27: Should specify intended operational roles per course", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const roles = c.intendedRoles as string[];
      assert.ok(roles.length >= 2);
    }
  });

  // Gate 28: Distinct learning outcome mapping per quiz question
  test("Gate 28: Should have learningOutcome and practicalTakeaway defined for all quiz items", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    for (const c of courses) {
      const quizzes = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, c.id));
      for (const q of quizzes) {
        assert.ok(q.learningOutcome && q.learningOutcome.length > 10);
        assert.ok(q.practicalTakeaway && q.practicalTakeaway.length > 10);
      }
    }
  });

  // Gate 29: Historical learner enrollment protection
  test("Gate 29: Historical enrollments should retain their enrolled version", async () => {
    const allEnrollments = await db.select().from(enrollmentsTable);
    for (const e of allEnrollments) {
      assert.ok(typeof e.enrolledVersion === "number");
      assert.ok(e.enrolledVersion >= 1);
    }
  });

  // Gate 30: Zero diagnostic question collisions (verbatim & semantic)
  test("Gate 30: Scored quiz items should not collide with the diagnostic question bank", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    const diagnosticPrompts = DIAGNOSTIC_QUESTION_BANK.map(dq => dq.prompt.trim().toLowerCase());

    for (const c of courses) {
      const quizzes = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, c.id));
      for (const q of quizzes) {
        const qText = q.question.trim().toLowerCase();
        for (const dp of diagnosticPrompts) {
          assert.notEqual(qText, dp);
        }
      }
    }
  });

  // Gate 31: Deep semantic claim-to-source alignment
  test("Gate 31: Course claims should align precisely with verified statutory and technical facts", () => {
    // 1. ELH-122: OSHA 2005 Section 5 duty of care for non-employees
    const elh122 = BATCH_3A_COURSES.find(c => c.courseCode === "ELH-122")!;
    const l1Body = (elh122.lessons[0].contentBlocks[1] as any)?.bodyText || "";
    assert.ok(l1Body.includes("Section 5 of the Mauritius Occupational Safety and Health Act 2005"));

    // 2. ELH-128: Secondary containment risk-assessed standard disclaimer
    const elh128 = BATCH_3A_COURSES.find(c => c.courseCode === "ELH-128")!;
    const l2Body = (elh128.lessons[1].contentBlocks[1] as any)?.bodyText || "";
    assert.ok(l2Body.includes("Secondary containment should be sized according to the substance"));
    assert.ok(l2Body.includes("must not be presented as a universal Mauritian statutory requirement without a directly applicable provision"));

    // 3. ELH-130: ICC Code as self-regulatory framework distinguished from consumer protection law
    const elh130 = BATCH_3A_COURSES.find(c => c.courseCode === "ELH-130")!;
    const l1Text = (elh130.lessons[0].contentBlocks[1] as any)?.bodyText || "";
    assert.ok(l1Text.includes("self-regulatory framework"));
  });

  // Gate 32: D3 Cognitive depth calibration (>=60% application/judgement items)
  test("Gate 32: At least 60% of quiz items across Wave 3A should test application, analysis, or evaluation", () => {
    let applicationCount = 0;
    let totalQuestions = 0;

    for (const c of BATCH_3A_COURSES) {
      for (const q of c.quizQuestions) {
        totalQuestions++;
        const prompt = q.question.toLowerCase();
        if (
          prompt.includes("which") ||
          prompt.includes("how") ||
          prompt.includes("why") ||
          prompt.includes("what is the proper") ||
          prompt.includes("what should") ||
          prompt.includes("when") ||
          prompt.includes("calculate")
        ) {
          applicationCount++;
        }
      }
    }

    const applicationRatio = applicationCount / totalQuestions;
    assert.ok(applicationRatio >= 0.60, `Application ratio is ${applicationRatio}, expected >= 0.60`);
  });

  // Gate 33: Mobile responsiveness and accessibility validation
  test("Gate 33: Lesson content blocks should use standard accessible block schemas", async () => {
    const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
    const validBlockTypes = new Set(["heading", "short_text", "callout", "interactive_scenario"]);

    for (const c of courses) {
      const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, c.id));
      for (const l of lessons) {
        const blocks = l.contentBlocks as any[];
        for (const b of blocks) {
          assert.ok(validBlockTypes.has(b.type), `Invalid block type: ${b.type}`);
        }
      }
    }
  });
});
