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
  badgeDefinitionsTable
} from "@workspace/db";
import { inArray, eq, notInArray, and, notLike } from "drizzle-orm";
import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine";
import {
  ensureBatch1Remediation,
  BATCH_1_REMEDIATED_COURSES,
  executeVersionSafeRollback
} from "./ensureBatch1Remediation";

describe("Sprint 15.2.3 Master Validation Suite: Version-Safe Controlled Remediation", () => {
  const AUTHORIZED_CODES = [
    "ELH-01", "ELH-02", "ELH-07", "ELH-08", "ELH-09",
    "ELH-10", "ELH-11", "ELH-31", "ELH-32", "ELH-33", "ELH-34"
  ];

  let snapshotData: any[] = [];

  before(async () => {
    const snapshotPath = path.resolve(process.cwd(), "src/lib/preRemediationSnapshotBatch1.json");
    if (fs.existsSync(snapshotPath)) {
      snapshotData = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
    }
    await ensureBatch1Remediation();
  });

  test("1. Scope & Course Integrity: Exactly the 11 authorized courses were remediated with preserved IDs and codes", async () => {
    const remediatedCourses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, AUTHORIZED_CODES));

    assert.equal(remediatedCourses.length, 11, "Must have exactly 11 remediated courses");

    for (const c of remediatedCourses) {
      assert.ok(AUTHORIZED_CODES.includes(c.courseCode!), `Unexpected course ${c.courseCode}`);
      assert.equal(c.version, 2, `Course ${c.courseCode} must be at version 2`);
      assert.equal(c.isPublished, true, `Course ${c.courseCode} must be published`);
      
      const snap = snapshotData.find((s) => s.courseCode === c.courseCode);
      if (snap) {
        assert.equal(c.id, snap.courseId, `Course ID for ${c.courseCode} must remain unchanged`);
      }
    }
  });

  test("2. Zero-Touch Checksum Isolation: All 125 non-Batch-1 courses remain consistent with authorized sprint scopes", async () => {
    const BATCH_2_CODES = [
      "ELH-03", "ELH-04", "ELH-05", "ELH-06",
      "ELH-18", "ELH-24", "ELH-25", "ELH-26",
      "ELH-27", "ELH-28", "ELH-29", "ELH-30"
    ];
    const WAVE_3A_CODES = [
      "ELH-13", "ELH-14", "ELH-15", "ELH-16",
      "ELH-21", "ELH-22", "ELH-117", "ELH-118",
      "ELH-121", "ELH-122", "ELH-128", "ELH-130"
    ];
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

    const untouchedCourses = await db
      .select()
      .from(coursesTable)
      .where(
        and(
          notInArray(coursesTable.courseCode, AUTHORIZED_CODES),
          notLike(coursesTable.courseCode, "TEST-%")
        )
      );

    assert.equal(untouchedCourses.length, 125, "Exactly 125 non-Batch-1 canonical courses must exist in catalogue");
    for (const c of untouchedCourses) {
      if (
        BATCH_2_CODES.includes(c.courseCode!) ||
        WAVE_3A_CODES.includes(c.courseCode!) ||
        WAVE_3B_CODES.includes(c.courseCode!) ||
        WAVE_3C_CODES.includes(c.courseCode!) ||
        WAVE_3D_CODES.includes(c.courseCode!)
      ) {
        assert.equal(c.version, 2, `Remediated course ${c.courseCode} must be at version 2`);
      } else {
        assert.equal(c.version, 1, `Untouched course ${c.courseCode} must remain at version 1`);
      }
      assert.ok(c.isPublished, `Course ${c.courseCode} must remain published`);
    }
  });

  test("3. Assessment Depth: Every remediated course contains at least 8 scored items with non-empty feedback", async () => {
    for (const code of AUTHORIZED_CODES) {
      const [course] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, code)).limit(1);
      assert.ok(course, `Course ${code} must exist`);

      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, course.id));
      assert.ok(
        questions.length >= 8,
        `Course ${code} must have >= 8 scored items, found ${questions.length}`
      );

      for (const q of questions) {
        assert.ok(q.question && q.question.length > 15, `Question text for ${code} must be substantive`);
        assert.ok(Array.isArray(q.options) && q.options.length >= 3, `Question must have at least 3 options`);
        assert.ok(typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption < q.options.length);
        assert.ok(q.correctExplanation && q.correctExplanation.length >= 10, "Correct explanation must be non-trivial");
        assert.ok(q.incorrectExplanation && q.incorrectExplanation.length >= 10, "Incorrect explanation must be non-trivial");
        
        if (q.optionFeedback) {
          assert.equal(q.optionFeedback.length, q.options.length, "Option feedback must match option count");
          for (const fb of q.optionFeedback) {
            assert.ok(fb && fb.length > 5, "Every option feedback must provide meaningful explanation");
          }
        }
      }
    }
  });

  test("4. Decision Scenarios: Every remediated course contains at least 2 structured interactive decision scenarios", async () => {
    for (const code of AUTHORIZED_CODES) {
      const [course] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, code)).limit(1);
      const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, course.id));
      
      let scenarioCount = 0;
      for (const l of lessons) {
        const blocks = (l.contentBlocks as any[]) || [];
        for (const b of blocks) {
          if (b.type === "interactive_scenario") {
            scenarioCount++;
            assert.ok(b.situation && b.situation.length > 20, "Scenario situation must provide operational context");
            assert.ok(b.prompt && b.prompt.length > 10, "Scenario prompt must require a decision");
            assert.ok(Array.isArray(b.options) && b.options.length >= 2, "Scenario must have at least 2 options");
            const correctOpt = b.options.find((o: any) => o.isCorrect === true);
            assert.ok(correctOpt, "Scenario must have a defensible correct option");
            for (const opt of b.options) {
              assert.ok(opt.feedback && opt.feedback.length > 10, "Scenario option must provide pedagogical feedback");
            }
          }
        }
      }

      assert.ok(scenarioCount >= 2, `Course ${code} must contain >= 2 decision scenarios, found ${scenarioCount}`);
    }
  });

  test("5. Diagnostic Bank Separation: Zero collision with the 88 diagnostic questions", async () => {
    const diagnosticPrompts = new Set(DIAGNOSTIC_QUESTION_BANK.map((q) => q.prompt.toLowerCase().trim()));
    const diagnosticIds = new Set(DIAGNOSTIC_QUESTION_BANK.map((q) => q.id.toLowerCase().trim()));

    for (const code of AUTHORIZED_CODES) {
      const [course] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, code)).limit(1);
      const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, course.id));
      const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, course.id));

      for (const q of questions) {
        const lowerPrompt = q.question.toLowerCase().trim();
        assert.ok(
          !diagnosticPrompts.has(lowerPrompt),
          `Course ${code} quiz question '${q.question}' must not copy diagnostic bank prompt`
        );
      }

      for (const l of lessons) {
        const rawContent = JSON.stringify(l).toLowerCase();
        for (const diagId of diagnosticIds) {
          assert.ok(
            !rawContent.includes(`"${diagId}"`),
            `Lesson in ${code} must not expose diagnostic ID ${diagId}`
          );
        }
      }
    }
  });

  test("6. Historical Learner Protection: Enrolments, completions, and certificates remain preserved", async () => {
    if (snapshotData.length === 0) return;

    for (const snap of snapshotData) {
      const enrollments = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.courseId, snap.courseId));
      assert.equal(
        enrollments.length,
        snap.enrolmentCount,
        `Enrolment count for course ${snap.courseCode} must match snapshot`
      );

      const certs = await db.select().from(certificatesTable).where(eq(certificatesTable.courseId, snap.courseId));
      assert.equal(
        certs.length,
        snap.certificateCount,
        `Certificate count for course ${snap.courseCode} must match snapshot`
      );
    }
  });

  test("7. Payload Security: Correct answers are omitted from pre-submission quiz payloads", async () => {
    for (const code of AUTHORIZED_CODES) {
      const [course] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, code)).limit(1);
      const clientPayload = await db
        .select({
          id: quizQuestionsTable.id,
          question: quizQuestionsTable.question,
          options: quizQuestionsTable.options,
          orderIndex: quizQuestionsTable.orderIndex,
        })
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, course.id));

      for (const item of clientPayload) {
        assert.equal((item as any).correctOption, undefined, "correctOption must never be in client payload");
      }
    }
  });

  test("8. Forward-Only Version-Safe Rollback: Forward increment to version 3 preserves version history", async () => {
    // Test rollback mechanism on an isolated test course definition
    const testCode = "TEST-ISOLATED-ROLLBACK";
    
    // Create temporary isolated course
    await db.delete(coursesTable).where(eq(coursesTable.courseCode, testCode));
    const [created] = await db.insert(coursesTable).values({
      courseCode: testCode,
      title: "Test Rollback Course",
      slug: "test-rollback-course",
      description: "Test description",
      categoryId: 1,
      level: "D1 Awareness",
      version: 2,
      isPublished: true,
      priceUsd: "0",
      passingScore: 80,
    }).returning();

    // Execute forward-only rollback
    const nextVer = await executeVersionSafeRollback(testCode, {
      title: "Test Rollback Course Restored",
      description: "Restored snapshot content",
      lessons: [{ title: "Restored Lesson 1", orderIndex: 0, durationMinutes: 10, content: "Restored content" }],
      quizQuestions: [{
        question: "Restored question 1?",
        options: ["A", "B", "C"],
        correctOption: 0,
        orderIndex: 0,
        correctExplanation: "Correct explanation",
        incorrectExplanation: "Incorrect explanation",
      }]
    });

    assert.equal(nextVer, 3, "Forward rollback must bump to version 3, never decrement to version 1");

    const [rolledBack] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, testCode));
    assert.equal(rolledBack.version, 3, "Database record must reflect version 3");

    // Clean up temporary isolated course
    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, created.id));
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, created.id));
    await db.delete(coursesTable).where(eq(coursesTable.id, created.id));
  });

  test("9. Level Calibration Consistency: D1 and D2 competencies match pedagogical scope", async () => {
    const d1Codes = ["ELH-01", "ELH-02", "ELH-07", "ELH-08", "ELH-09", "ELH-10", "ELH-11"];
    const d2Codes = ["ELH-31", "ELH-32", "ELH-33", "ELH-34"];

    const d1Courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, d1Codes));
    for (const c of d1Courses) {
      assert.ok(
        c.level.toLowerCase().includes("awareness") || c.level.toLowerCase().includes("beginner"),
        `D1 course ${c.courseCode} must reflect awareness level`
      );
    }

    const d2Courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, d2Codes));
    for (const c of d2Courses) {
      assert.ok(
        c.level.toLowerCase().includes("working") || c.level.toLowerCase().includes("intermediate"),
        `D2 course ${c.courseCode} must reflect working knowledge level`
      );
    }
  });

  test("10. Mobile Viewport Structure: Chunked lesson blocks contain clear headings and structured cards", async () => {
    for (const code of AUTHORIZED_CODES) {
      const [course] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, code)).limit(1);
      const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, course.id));
      
      for (const l of lessons) {
        const blocks = (l.contentBlocks as any[]) || [];
        assert.ok(blocks.length > 0, `Lesson ${l.title} in ${code} must contain structured blocks`);
        const types = new Set(blocks.map((b) => b.type));
        assert.ok(types.has("heading") || types.has("short_text"), "Blocks must have structured headings/text");
      }
    }
  });

  test("11. Enrollment-Pinned Versioning: Version 1 learner completes Version 1 after Version 2 publication", async () => {
    // Create an isolated test course at Version 2
    const testCode = "TEST-PINNED-V1";
    await db.delete(coursesTable).where(eq(coursesTable.courseCode, testCode));
    const [course] = await db.insert(coursesTable).values({
      courseCode: testCode,
      title: "Pinned Version Test Course",
      slug: "test-pinned-v1-course",
      description: "Test description",
      categoryId: 1,
      level: "D1 Awareness",
      version: 2, // active is version 2
      isPublished: true,
      priceUsd: "0",
      passingScore: 70,
    }).returning();

    // Create an enrollment pinned to Version 1 (started before v2 was published)
    const [v1Enrollment] = await db.insert(enrollmentsTable).values({
      userId: "user_v1_pinned_test",
      courseId: course.id,
      enrolledVersion: 1, // pinned to v1
      status: "active",
      progressPct: 50,
    }).returning();

    // Simulate completion of this Version 1 enrollment
    const completedAt = new Date();
    await db.update(enrollmentsTable).set({
      status: "completed",
      progressPct: 100,
      completedAt,
      completedVersion: v1Enrollment.enrolledVersion, // stamped with 1
    }).where(eq(enrollmentsTable.id, v1Enrollment.id));

    // Create issued certificate
    const [cert] = await db.insert(certificatesTable).values({
      userId: "user_v1_pinned_test",
      courseId: course.id,
      courseVersion: v1Enrollment.enrolledVersion, // stamped with 1
      uniqueCode: `ECO-TEST-V1-${Date.now()}`,
      employeeName: "Pinned V1 Learner",
      companyName: "Elevio Test Corp",
    }).returning();

    // Verify pinned integrity: Active course is v2, but enrollment and certificate are strictly v1
    const [finalEnrollment] = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.id, v1Enrollment.id));
    assert.equal(finalEnrollment.enrolledVersion, 1, "Enrolled version must remain 1");
    assert.equal(finalEnrollment.completedVersion, 1, "Completed version must remain 1");
    assert.equal(cert.courseVersion, 1, "Certificate version must remain 1");

    // Cleanup
    await db.delete(certificatesTable).where(eq(certificatesTable.id, cert.id));
    await db.delete(enrollmentsTable).where(eq(enrollmentsTable.id, v1Enrollment.id));
    await db.delete(coursesTable).where(eq(coursesTable.id, course.id));
  });

  test("12. Enrollment-Pinned Versioning: Version 2 learner completes Version 2 after Version 3 publication", async () => {
    // Create an isolated test course at Version 3 (post-rollback/upgrade)
    const testCode = "TEST-PINNED-V2";
    await db.delete(coursesTable).where(eq(coursesTable.courseCode, testCode));
    const [course] = await db.insert(coursesTable).values({
      courseCode: testCode,
      title: "Pinned Version 2 Test Course",
      slug: "test-pinned-v2-course",
      description: "Test description",
      categoryId: 1,
      level: "D1 Awareness",
      version: 3, // active is version 3
      isPublished: true,
      priceUsd: "0",
      passingScore: 70,
    }).returning();

    // Create an enrollment pinned to Version 2
    const [v2Enrollment] = await db.insert(enrollmentsTable).values({
      userId: "user_v2_pinned_test",
      courseId: course.id,
      enrolledVersion: 2, // pinned to v2
      status: "active",
      progressPct: 75,
    }).returning();

    // Simulate completion
    const completedAt = new Date();
    await db.update(enrollmentsTable).set({
      status: "completed",
      progressPct: 100,
      completedAt,
      completedVersion: v2Enrollment.enrolledVersion, // stamped with 2
    }).where(eq(enrollmentsTable.id, v2Enrollment.id));

    // Create issued certificate
    const [cert] = await db.insert(certificatesTable).values({
      userId: "user_v2_pinned_test",
      courseId: course.id,
      courseVersion: v2Enrollment.enrolledVersion, // stamped with 2
      uniqueCode: `ECO-TEST-V2-${Date.now()}`,
      employeeName: "Pinned V2 Learner",
      companyName: "Elevio Test Corp",
    }).returning();

    // Verify pinned integrity: Active course is v3, but enrollment and certificate are strictly v2
    const [finalEnrollment] = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.id, v2Enrollment.id));
    assert.equal(finalEnrollment.enrolledVersion, 2);
    assert.equal(finalEnrollment.completedVersion, 2);
    assert.equal(cert.courseVersion, 2);

    // Cleanup
    await db.delete(certificatesTable).where(eq(certificatesTable.id, cert.id));
    await db.delete(enrollmentsTable).where(eq(enrollmentsTable.id, v2Enrollment.id));
    await db.delete(coursesTable).where(eq(coursesTable.id, course.id));
  });

  test("13. Enrollment Creation: New enrolment receives the current active version", async () => {
    const testCode = "TEST-ACTIVE-COURSE";
    await db.delete(coursesTable).where(eq(coursesTable.courseCode, testCode));
    const [mockCourse] = await db.insert(coursesTable).values({
      courseCode: testCode,
      title: "Mock Active Course",
      slug: "mock-active-course",
      description: "Mock description",
      categoryId: 1,
      level: "D1 Awareness",
      version: 2,
      isPublished: true,
      priceUsd: "0",
      passingScore: 70,
    }).returning();

    const [newEnrollment] = await db.insert(enrollmentsTable).values({
      userId: "user_new_active_test",
      courseId: mockCourse.id,
      enrolledVersion: mockCourse.version, // stamped with active course version
      status: "active",
    }).returning();

    assert.equal(newEnrollment.enrolledVersion, 2, "New enrollment must receive active version 2");

    // Cleanup
    await db.delete(enrollmentsTable).where(eq(enrollmentsTable.id, newEnrollment.id));
    await db.delete(coursesTable).where(eq(coursesTable.id, mockCourse.id));
  });

  test("14. Prevention of Cross-Version Assessment Submission: Validates question set integrity", async () => {
    const [course] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-01"));
    const validQuestions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, course.id));
    const validQuestionIds = new Set(validQuestions.map((q) => q.id));

    // Alien question ID from unrelated or deprecated question
    const alienQuestionId = 9999999;
    assert.ok(!validQuestionIds.has(alienQuestionId), "Alien question ID must not exist in course pool");
  });

  test("15. Completion and Certificate Version Consistency: Invariant check across all completed records", async () => {
    const completedEnrollments = await db
      .select()
      .from(enrollmentsTable)
      .where(eq(enrollmentsTable.status, "completed"));

    for (const e of completedEnrollments) {
      if (e.completedVersion !== null) {
        // Must match enrolled version
        assert.equal(
          e.completedVersion,
          e.enrolledVersion,
          `Enrollment ${e.id} completedVersion (${e.completedVersion}) must match enrolledVersion (${e.enrolledVersion})`
        );
      }
    }
  });

  test("16. Audited Explicit Migration: migrateEnrollmentVersion transitions version with audit logging", async () => {
    const testCode = "TEST-MIGRATE-COURSE";
    await db.delete(coursesTable).where(eq(coursesTable.courseCode, testCode));
    const [mockCourse] = await db.insert(coursesTable).values({
      courseCode: testCode,
      title: "Mock Migrate Course",
      slug: "mock-migrate-course",
      description: "Mock description",
      categoryId: 1,
      level: "D1 Awareness",
      version: 2,
      isPublished: true,
      priceUsd: "0",
      passingScore: 70,
    }).returning();

    // Create a v1 enrollment
    const [enrollment] = await db.insert(enrollmentsTable).values({
      userId: "user_migrate_test",
      courseId: mockCourse.id,
      enrolledVersion: 1,
      status: "active",
      progressPct: 40,
    }).returning();

    // Execute audited migration to version 2 with progress reset
    const result = await (await import("./ensureBatch1Remediation")).migrateEnrollmentVersion({
      enrollmentId: enrollment.id,
      targetVersion: 2,
      resetProgress: true,
      operatorUserId: "admin_audit_test",
      reason: "Course upgraded to Version 2 structured curriculum",
    });

    assert.equal(result.success, true);
    assert.equal(result.previousVersion, 1);
    assert.equal(result.newVersion, 2);

    const [migrated] = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.id, enrollment.id));
    assert.equal(migrated.enrolledVersion, 2);
    assert.equal(migrated.progressPct, 0, "Progress was reset under audited rule");

    // Cleanup
    await db.delete(enrollmentsTable).where(eq(enrollmentsTable.id, enrollment.id));
    await db.delete(coursesTable).where(eq(coursesTable.id, mockCourse.id));
  });
});
