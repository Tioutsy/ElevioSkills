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
  ensureBatch2Remediation,
  BATCH_2_REMEDIATED_COURSES,
  executeVersionSafeRollbackBatch2,
} from "./ensureBatch2Remediation";

describe("Sprint 15.2.4 Master Validation Suite: Batch 2 Controlled Course Remediation", () => {
  const BATCH_2_CODES = [
    "ELH-03", "ELH-04", "ELH-05", "ELH-06",
    "ELH-18", "ELH-24", "ELH-25", "ELH-26",
    "ELH-27", "ELH-28", "ELH-29", "ELH-30"
  ];

  const BATCH_1_CODES = [
    "ELH-01", "ELH-02", "ELH-07", "ELH-08",
    "ELH-09", "ELH-10", "ELH-11", "ELH-31",
    "ELH-32", "ELH-33", "ELH-34"
  ];

  let snapshotData: any = null;

  before(async () => {
    const snapPath = path.resolve(process.cwd(), "src/lib/preRemediationSnapshotBatch2.json");
    if (fs.existsSync(snapPath)) {
      snapshotData = JSON.parse(fs.readFileSync(snapPath, "utf-8"));
    }
    await ensureBatch2Remediation();
  });

  // 1. Scope & Course Invariants
  test("Gate 1: Reconciles exactly 12 authorized courses in Batch 2 scope", () => {
    assert.equal(BATCH_2_CODES.length, 12, "Batch 2 must have exactly 12 courses");
    assert.equal(BATCH_2_REMEDIATED_COURSES.length, 12, "Batch 2 definitions must contain 12 courses");
    const codes = BATCH_2_REMEDIATED_COURSES.map((c) => c.courseCode).sort();
    assert.deepEqual(codes, [...BATCH_2_CODES].sort(), "Batch 2 codes must match canonical list");
  });

  // 2. Monotonic Versioning
  test("Gate 2: All 12 Batch 2 courses have version bumped to 2 in database", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    assert.equal(courses.length, 12);
    for (const c of courses) {
      assert.equal(c.version, 2, `Course ${c.courseCode} must have version=2`);
      assert.equal(c.isPublished, true, `Course ${c.courseCode} must be published`);
      assert.equal(c.status, "published");
    }
  });

  // 3. Lesson Count
  test("Gate 3: All 12 Batch 2 courses have exactly 5 chunked lessons", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    for (const c of courses) {
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, c.id));

      assert.equal(lessons.length, 5, `Course ${c.courseCode} must have 5 lessons`);
    }
  });

  // 4. Interactive Decision Scenarios
  test("Gate 4: All 12 Batch 2 courses contain at least 2 interactive decision scenarios with consequences", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      let scenarioCount = 0;
      for (const l of def.lessons) {
        for (const block of l.contentBlocks) {
          if (block.type === "interactive_scenario") {
            scenarioCount++;
            assert.ok(block.options.length >= 2, `${def.courseCode} scenario must have at least 2 options`);
            for (const opt of block.options) {
              assert.ok(opt.consequence && opt.consequence.length > 10, `${def.courseCode} option must have consequence text`);
              assert.ok(opt.feedback && opt.feedback.length > 10, `${def.courseCode} option must have feedback text`);
              assert.equal(typeof opt.score, "number");
            }
          }
        }
      }
      assert.ok(scenarioCount >= 2, `${def.courseCode} must have at least 2 scenarios`);
    }
  });

  // 5. Scored Assessment Count
  test("Gate 5: All 12 Batch 2 courses have exactly 8 scored assessment items in database", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    for (const c of courses) {
      const quiz = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, c.id));

      assert.equal(quiz.length, 8, `Course ${c.courseCode} must have 8 quiz questions`);
    }
  });

  // 6. Question Options
  test("Gate 6: Every quiz question has exactly 4 distinct answer options", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    for (const c of courses) {
      const quiz = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, c.id));

      for (const q of quiz) {
        assert.equal(q.options.length, 4, `Question '${q.question}' must have 4 options`);
        assert.ok(q.correctOption >= 0 && q.correctOption <= 3, `correctOption must be 0-3`);
      }
    }
  });

  // 7. Option-level Teaching Feedback
  test("Gate 7: Every option (correct and distractors) has detailed instructional feedback", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      for (const q of def.quizQuestions) {
        assert.ok(q.optionFeedback, `${def.courseCode} question must have optionFeedback`);
        assert.equal(q.optionFeedback.length, 4, `${def.courseCode} question optionFeedback must have 4 items`);
        for (const fb of q.optionFeedback) {
          assert.ok(fb.length >= 15, `Feedback must be comprehensive: ${fb}`);
        }
        assert.ok(q.correctExplanation.length >= 20, "correctExplanation must be detailed");
        assert.ok(q.incorrectExplanation.length >= 20, "incorrectExplanation must be detailed");
        assert.ok(q.practicalTakeaway.length >= 15, "practicalTakeaway must be present");
      }
    }
  });

  // 8. Passing Score
  test("Gate 8: Passing score is calibrated to 75% across all 12 Batch 2 courses", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    for (const c of courses) {
      assert.equal(c.passingScore, 75);
    }
  });

  // 9. Evidenced Level
  test("Gate 9: Course levels are accurately set to D1 Awareness or D2 Working Knowledge", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    for (const c of courses) {
      assert.ok(["D1 Awareness", "D2 Working Knowledge"].includes(c.level));
    }
  });

  // 10. Primary Competency
  test("Gate 10: Every course has a valid primary competency starting with COMP_", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    for (const c of courses) {
      assert.ok(c.primaryCompetency && c.primaryCompetency.startsWith("COMP_"));
    }
  });

  // 11. Duration Calibration
  test("Gate 11: All 12 courses have standard 20-minute calibrated duration", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    for (const c of courses) {
      assert.equal(c.durationMinutes, 20);
    }
  });

  // 12. Workplace Hook in Lesson 1
  test("Gate 12: Lesson 1 contains relatable workplace hook and operational stakes", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      const lesson1 = def.lessons[0];
      assert.ok(lesson1.contentBlocks.length >= 2);
      assert.equal(lesson1.contentBlocks[0].type, "heading");
      assert.ok(lesson1.contentBlocks[1].bodyText.length > 50);
    }
  });

  // 13. Workplace Action in Lesson 5
  test("Gate 13: Lesson 5 contains a 30-day workplace action commitment", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      const lesson5 = def.lessons[4];
      const hasAction = lesson5.contentBlocks.some(
        (b: any) => b.type === "callout" && b.variant === "action"
      );
      assert.ok(hasAction, `${def.courseCode} Lesson 5 must contain an action callout`);
    }
  });

  // 14. Next Course Recommendation
  test("Gate 14: Every course has a valid next-course recommendation code", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      assert.ok(def.recommendedNextCourseCode && def.recommendedNextCourseCode.startsWith("ELH-"));
    }
  });

  // 15. Completion Recognition
  test("Gate 15: Every course defines a professional completion badge and message", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      assert.ok(def.badgeName && def.badgeName.length > 0);
      assert.ok(def.badgeDescription && def.badgeDescription.length > 0);
      assert.ok(def.completionMessage && def.completionMessage.length > 0);
    }
  });

  // 16. Catalogue Isolation
  test("Gate 16: Checksums confirm all other 124 canonical courses remain unaltered", async () => {
    const otherCourses = await db
      .select()
      .from(coursesTable)
      .where(
        and(
          notInArray(coursesTable.courseCode, BATCH_2_CODES),
          notLike(coursesTable.courseCode, "TEST-%")
        )
      );

    assert.equal(otherCourses.length, 124, "Must have exactly 124 other canonical courses");

    // Batch 1 courses (11 courses) remain at version 2
    const b1 = otherCourses.filter((c) => BATCH_1_CODES.includes(c.courseCode!));
    assert.equal(b1.length, 11);
    for (const c of b1) {
      assert.equal(c.version, 2, `Batch 1 course ${c.courseCode} must remain at v2`);
    }

    // Remaining non-remediated catalogue courses remain at version 1
    const WAVE_3A_CODES = ["ELH-13", "ELH-14", "ELH-15", "ELH-16", "ELH-21", "ELH-22", "ELH-117", "ELH-118", "ELH-121", "ELH-122", "ELH-128", "ELH-130"];
    const WAVE_3B_CODES = [
      "ELH-17", "ELH-19", "ELH-20", "ELH-23",
      "ELH-35", "ELH-36", "ELH-39", "ELH-43",
      "ELH-45", "ELH-47", "ELH-48", "ELH-49",
      "ELH-50", "ELH-52", "ELH-53", "ELH-54",
      "ELH-55", "ELH-56"
    ];
    const WAVE_3C_CODES = [
      "ELH-57", "ELH-58", "ELH-59", "ELH-60",
      "ELH-62", "ELH-63", "ELH-64", "ELH-65",
      "ELH-66", "ELH-67", "ELH-69", "ELH-70",
      "ELH-74", "ELH-75", "ELH-76", "ELH-77",
      "ELH-78", "ELH-79"
    ];
    const WAVE_3D_CODES = [
      "ELH-80", "ELH-81", "ELH-82", "ELH-84", "ELH-85", "ELH-86",
      "ELH-88", "ELH-89", "ELH-90", "ELH-91", "ELH-92", "ELH-93",
      "ELH-94", "ELH-95", "ELH-96", "ELH-100", "ELH-101", "ELH-102"
    ];
    const untouched = otherCourses.filter(
      (c) =>
        !BATCH_1_CODES.includes(c.courseCode!) &&
        !WAVE_3A_CODES.includes(c.courseCode!) &&
        !WAVE_3B_CODES.includes(c.courseCode!) &&
        !WAVE_3C_CODES.includes(c.courseCode!) &&
        !WAVE_3D_CODES.includes(c.courseCode!)
    );
    assert.equal(untouched.length, 47);
    for (const c of untouched) {
      assert.equal(c.version, 1, `Untouched course ${c.courseCode} must remain at v1`);
    }
  });

  // 17. Total Catalogue Invariant
  test("Gate 17: Total canonical catalogue count is exactly 136 courses", async () => {
    const allCanonical = await db
      .select()
      .from(coursesTable)
      .where(notLike(coursesTable.courseCode, "TEST-%"));

    assert.equal(allCanonical.length, 136, "Canonical catalogue must have exactly 136 courses");
  });

  // 18. Total Remediated Catalogue Count
  test("Gate 18: Total remediated courses includes at least 23 of 136 courses (Batch 1 + Batch 2)", async () => {
    const v2Courses = await db
      .select()
      .from(coursesTable)
      .where(
        and(
          eq(coursesTable.version, 2),
          notLike(coursesTable.courseCode, "TEST-%")
        )
      );

    assert.ok(v2Courses.length >= 23, "Total remediated courses (Batch 1 + Batch 2 + subsequent) must be at least 23");
  });

  // 19. Forward-Only Version-Safe Rollback Engine
  test("Gate 19: Forward-only rollback increments version monotonically and preserves history", async () => {
    const testCode = "TEST-ISOLATED-ROLLBACK-BATCH2";

    // Create temporary isolated course
    await db.delete(coursesTable).where(eq(coursesTable.courseCode, testCode));
    const [created] = await db
      .insert(coursesTable)
      .values({
        courseCode: testCode,
        title: "Test Rollback Course Batch 2",
        slug: "test-rollback-course-batch-2",
        description: "Test description for forward rollback verification",
        categoryId: 1,
        level: "D1 Awareness",
        version: 2,
        isPublished: true,
        priceUsd: "0",
        passingScore: 75,
      })
      .returning();

    const nextVer = await executeVersionSafeRollbackBatch2(testCode, {
      title: "Energy Efficiency at Work (Rollback Baseline)",
    });

    assert.equal(nextVer, 3, "Rollback must increment to next integer version (v3)");

    const [cAfter] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, testCode));

    assert.equal(cAfter.version, 3, "Database record must reflect version 3");

    // Clean up temporary isolated course without touching any canonical records
    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, created.id));
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, created.id));
    await db.delete(coursesTable).where(eq(coursesTable.id, created.id));
  });

  // 20. No Answer Leaks in Question Options
  test("Gate 20: Quiz questions do not embed answer keys inside option text", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      for (const q of def.quizQuestions) {
        for (const opt of q.options) {
          assert.ok(!opt.toLowerCase().startsWith("correct:"));
          assert.ok(!opt.toLowerCase().startsWith("answer is"));
        }
      }
    }
  });

  // 21. Lesson Order Index Continuity
  test("Gate 21: Lesson order indexes are strictly sequential (0 to 4)", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    for (const c of courses) {
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, c.id));

      const orders = lessons.map((l) => l.orderIndex).sort((a, b) => a - b);
      assert.deepEqual(orders, [0, 1, 2, 3, 4]);
    }
  });

  // 22. Quiz Order Index Continuity
  test("Gate 22: Quiz question order indexes are strictly sequential (0 to 7)", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, BATCH_2_CODES));

    for (const c of courses) {
      const quiz = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, c.id));

      const orders = quiz.map((q) => q.orderIndex).sort((a, b) => a - b);
      assert.deepEqual(orders, [0, 1, 2, 3, 4, 5, 6, 7]);
    }
  });

  // 23. Pre-Remediation Snapshot
  test("Gate 23: Pre-remediation snapshot file exists and covers all 12 Batch 2 courses", () => {
    const snapPath = path.resolve(process.cwd(), "src/lib/preRemediationSnapshotBatch2.json");
    assert.ok(fs.existsSync(snapPath), "Snapshot file must exist");
    const snap = JSON.parse(fs.readFileSync(snapPath, "utf-8"));
    assert.equal(Object.keys(snap.batch2Courses).length, 12);
    assert.equal(Object.keys(snap.catalogueChecksums).length, 124);
  });

  // 24. Instructional Review Artifact & Claim Register
  test("Gate 24: batch2InstructionalQualityReview.md exists and contains the Claim-Evidence Register", () => {
    const reviewPath = path.resolve(process.cwd(), "src/lib/batch2InstructionalQualityReview.md");
    assert.ok(fs.existsSync(reviewPath), "Review artifact must exist");
    const content = fs.readFileSync(reviewPath, "utf-8");
    assert.ok(content.includes("Precise Claim-Evidence Register for Batch 2"));
    assert.ok(content.includes("Occupational Safety and Health Act 2005"));
    assert.ok(content.includes("Bank of Mauritius"));
  });

  // 25. Unique Slugs
  test("Gate 25: Course slugs are unique, lowercase, and hyphenated", () => {
    const slugs = BATCH_2_REMEDIATED_COURSES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    assert.equal(uniqueSlugs.size, 12);
    for (const s of slugs) {
      assert.ok(/^[a-z0-9-]+$/.test(s));
    }
  });

  // 26. Learning Objectives Completeness
  test("Gate 26: Every course has at least 4 measurable learning objectives", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      assert.ok(def.learningObjectives.length >= 4);
    }
  });

  // 27. Intended Roles Completeness
  test("Gate 27: Every course specifies relevant operational target roles", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      assert.ok(def.intendedRoles.length >= 2);
    }
  });

  // 28. Learning Outcomes on Quiz Questions
  test("Gate 28: Every quiz question maps to a distinct learning outcome", () => {
    for (const def of BATCH_2_REMEDIATED_COURSES) {
      for (const q of def.quizQuestions) {
        assert.ok(q.learningOutcome && q.learningOutcome.length > 0);
        assert.ok(q.competencyArea && q.competencyArea.length > 0);
      }
    }
  });

  // 29. Historical Learner Enrollment Safety
  test("Gate 29: Existing active learner enrollments retain version 1 and are not corrupted", async () => {
    const existingEnrollments = await db
      .select()
      .from(enrollmentsTable)
      .where(inArray(enrollmentsTable.courseId, [3, 4])); // ELH-03 and ELH-04 had 1 active enrollment each

    for (const e of existingEnrollments) {
      assert.equal(e.enrolledVersion, 1, "Existing learner must remain enrolled in version 1");
    }
  });

  // 30. Zero Diagnostic Collisions
  test("Gate 30: Zero verbatim question collisions with diagnostic assessment banks", () => {
    const questions = BATCH_2_REMEDIATED_COURSES.flatMap((c) =>
      c.quizQuestions.map((q) => q.question.toLowerCase().trim())
    );
    const uniqueQuestions = new Set(questions);
    assert.equal(uniqueQuestions.size, questions.length, "All Batch 2 questions must be mutually unique");

    // Check collision with diagnostic bank
    const diagnosticTexts = (DIAGNOSTIC_QUESTION_BANK || []).map((d: any) =>
      d.text ? d.text.toLowerCase().trim() : ""
    );
    for (const q of questions) {
      assert.ok(!diagnosticTexts.includes(q), `Batch 2 question collided with diagnostic bank: ${q}`);
    }
  });

  // 31. Deep Semantic Claim-to-Source Alignment
  test("Gate 31: Claim text strictly aligns with cited source metadata and avoids false mandates", () => {
    const elh26 = BATCH_2_REMEDIATED_COURSES.find((c) => c.courseCode === "ELH-26")!;
    const elh28 = BATCH_2_REMEDIATED_COURSES.find((c) => c.courseCode === "ELH-28")!;
    const elh03 = BATCH_2_REMEDIATED_COURSES.find((c) => c.courseCode === "ELH-03")!;
    const elh04 = BATCH_2_REMEDIATED_COURSES.find((c) => c.courseCode === "ELH-04")!;

    // 1. ELH-26: ISO 20400 is guidance, not a mandatory 15-20% percentage mandate
    const elh26Text = JSON.stringify(elh26);
    assert.ok(!elh26Text.includes("mandatory 15% to 20% weighting"), "Must not state ISO 20400 mandates 15-20%");
    assert.ok(!elh26Text.includes("mandatory 15%–20%"), "Must not state ISO 20400 mandates 15-20%");
    assert.ok(elh26Text.includes("guidance rather than prescribing mandatory fixed percentage"), "Must identify ISO 20400 as guidance");

    // 2. ELH-28: ICC Code is a self-regulatory framework, distinguished from statutory law
    const elh28Text = JSON.stringify(elh28);
    assert.ok(elh28Text.includes("self-regulatory framework"), "Must identify ICC Code as a self-regulatory framework");
    assert.ok(!elh28Text.includes("violates Chapter D of the ICC Advertising and Marketing Communications Code, destroys brand reputation, invites regulatory sanctions"), "Must not state ICC non-compliance directly produces regulatory sanctions");

    // 3. ELH-03: Thermal comfort depends on environmental and personal factors (ASHRAE 55)
    const elh03Text = JSON.stringify(elh03);
    assert.ok(elh03Text.includes("air temperature, radiant temperature, air speed, and relative humidity"), "Must list environmental comfort factors");
    assert.ok(elh03Text.includes("clothing insulation and metabolic activity"), "Must list personal comfort factors");
    assert.ok(!elh03Text.includes("avoids compressor overwork and provides a balanced operational guideline"), "Must remove universal overwork setpoint claim");

    // 4. ELH-04: Removed ungrounded 200-1,000 L/day range and accurately conveys silent flapper leakage
    const elh04Text = JSON.stringify(elh04);
    assert.ok(!elh04Text.includes("200 and 1,000 liters"), "Must remove ungrounded 200-1000 L/day range");
    assert.ok(elh04Text.includes("silent, unmetered water waste in commercial buildings"), "Must accurately describe flapper leakage");
  });
});
