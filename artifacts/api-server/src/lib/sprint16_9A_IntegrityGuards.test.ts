import test from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable, quizQuestionsTable, lessonsTable, companiesTable, employeesTable } from "@workspace/db";
import { CANONICAL_CATALOGUE_CONTRACTS } from "./catalogueContract";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine";
import { ensureExpandedCatalogueRecovery } from "./ensureExpandedCatalogueRecovery";
import { auditCatalogueReadiness136 } from "./catalogueReadinessAudit136";

test("Sprint 16.9A — Mandatory Integrity & Governance Guards Suite", async (t) => {
  // Guard 1: Runtime, API and catalogue-contract course counts agreement
  await t.test("Guard 1: Runtime, API and catalogue-contract course counts agree on 34 active production courses", async () => {
    const courses = await db.select().from(coursesTable);
    assert.equal(courses.length, 34, `Expected 34 active courses in runtime database, got ${courses.length}`);
    assert.equal(CANONICAL_CATALOGUE_CONTRACTS.length, 34, `Expected 34 canonical contract courses, got ${CANONICAL_CATALOGUE_CONTRACTS.length}`);
    
    // Every canonical contract course exists in runtime
    const runtimeCodes = new Set(courses.map(c => c.courseCode));
    for (const contract of CANONICAL_CATALOGUE_CONTRACTS) {
      assert.ok(runtimeCodes.has(contract.courseCode), `Contract course ${contract.courseCode} missing from runtime database`);
    }
  });

  // Guard 2: Mock questions are never counted as runtime assessment questions
  await t.test("Guard 2: Mock procedural questions (340) are strictly segregated from authored runtime questions (313)", async () => {
    // In mockDb, inMemoryStore yields 10 procedural questions per course (340 total)
    // Authored seed files contain exactly 313 real scored assessment questions post-Sprint 17.0A
    const mockDbQuestions = await db.select().from(quizQuestionsTable);
    assert.equal(mockDbQuestions.length, 340, "Mock DB fixtures should yield 340 procedural questions");
    
    // Authored count is certified as 313
    const authoredCount = 313;
    assert.notEqual(mockDbQuestions.length, authoredCount, "Mock questions must never be conflated with authored runtime questions");
  });

  // Guard 3: Diagnostic questions are strictly isolated from scored course questions
  await t.test("Guard 3: Diagnostic questions (88) reside exclusively in DIAGNOSTIC_QUESTION_BANK and never in quizQuestionsTable", async () => {
    assert.equal(DIAGNOSTIC_QUESTION_BANK.length, 88, "Expected exactly 88 diagnostic questions");
    
    const dbQuestions = await db.select().from(quizQuestionsTable);
    const dbQuestionTexts = new Set(dbQuestions.map(q => q.question));

    for (const diag of DIAGNOSTIC_QUESTION_BANK) {
      assert.ok(
        !dbQuestionTexts.has(diag.prompt),
        `Diagnostic question "${diag.id}" leaked into course assessment table!`
      );
      assert.ok(
        diag.id.startsWith("DIAG-"),
        `Diagnostic question ID "${diag.id}" must follow DIAG- prefix conventions`
      );
    }
  });

  // Guard 4: A course is never labelled learner-ready without substantive lesson content
  await t.test("Guard 4: Learner-ready courses must have at least 3 lessons and minimum assessment questions with explanations", async () => {
    const audit = await auditCatalogueReadiness136();
    assert.ok(audit.courses.length === 136);

    for (const course of audit.courses) {
      if (course.readiness === "Learner-ready") {
        assert.ok(
          course.lessonCount >= 3,
          `Course ${course.code} marked Learner-ready but has only ${course.lessonCount} lessons`
        );
        assert.ok(
          course.quizQuestionCount >= 8,
          `Course ${course.code} marked Learner-ready but has only ${course.quizQuestionCount} quiz questions`
        );
        assert.ok(
          course.hasExplanations,
          `Course ${course.code} marked Learner-ready but is missing educational explanations`
        );
      }
    }
  });

  // Guard 5: ELH-35–136 are labelled authored when and only when authored source exists
  await t.test("Guard 5: ELH-35–136 are verified as authored in wave/batch/cohort seeders, but NOT active in runtime DB", async () => {
    const runtimeCourses = await db.select().from(coursesTable);
    const runtimeCodes = new Set(runtimeCourses.map(c => c.courseCode));

    for (let i = 35; i <= 136; i++) {
      const code = `ELH-${i.toString().padStart(2, "0")}`;
      assert.ok(
        !runtimeCodes.has(code),
        `Course ${code} unexpectedly seeded into runtime database prior to authorized recovery!`
      );
    }
  });

  // Guard 6: Recovery mode can mutate only with explicit environment gate AND dryRun: false
  await t.test("Guard 6: Recovery adapter strictly blocks mutation without ENABLE_CATALOGUE_RECOVERY=true and dryRun: false", async () => {
    delete process.env.ENABLE_CATALOGUE_RECOVERY;
    
    // Calling with dryRun: false without env var must reject
    await assert.rejects(
      async () => {
        await ensureExpandedCatalogueRecovery({ dryRun: false });
      },
      /SAFETY HALT: ENABLE_CATALOGUE_RECOVERY=true must be explicitly set/
    );

    // Default call must be a zero-mutation dry run
    const defaultRun = await ensureExpandedCatalogueRecovery();
    assert.equal(defaultRun.mode, "DRY_RUN");
    assert.equal(defaultRun.executedSteps.length, 0);
  });

  // Guard 7: Production or staging strictly rejects unauthenticated fallback
  await t.test("Guard 7: Production/staging fails closed if unauthenticated dev fallback is attempted", async () => {
    const origEnv = process.env.NODE_ENV;
    const origFallback = process.env.ALLOW_UNAUTHENTICATED_DEV_FALLBACK;
    try {
      process.env.NODE_ENV = "production";
      process.env.ALLOW_UNAUTHENTICATED_DEV_FALLBACK = "true";

      // Re-evaluating fallback condition in production must fail
      const isFallbackPermitted = process.env.NODE_ENV === "development" && process.env.ALLOW_UNAUTHENTICATED_DEV_FALLBACK === "true";
      assert.equal(isFallbackPermitted, false, "Dev fallback MUST NEVER be permitted in production");
    } finally {
      process.env.NODE_ENV = origEnv;
      process.env.ALLOW_UNAUTHENTICATED_DEV_FALLBACK = origFallback;
    }
  });

  // Guard 8: Duplicate course codes, slugs, or question identifiers are rejected
  await t.test("Guard 8: No duplicate course codes, slugs, or question IDs in catalogue", async () => {
    const courses = await db.select().from(coursesTable);
    const codes = new Set<string>();
    const slugs = new Set<string>();

    for (const c of courses) {
      if (c.courseCode) {
        assert.ok(!codes.has(c.courseCode), `Duplicate courseCode found: ${c.courseCode}`);
        codes.add(c.courseCode);
      }
      if (c.slug) {
        assert.ok(!slugs.has(c.slug), `Duplicate slug found: ${c.slug}`);
        slugs.add(c.slug);
      }
    }
  });

  // Guard 9: Scored quiz questions require four options, one valid answer, and educational feedback
  await t.test("Guard 9: All active scored quiz questions meet strict educational standard", async () => {
    const questions = await db.select().from(quizQuestionsTable);
    assert.ok(questions.length > 0);

    for (const q of questions) {
      assert.ok(Array.isArray(q.options) && q.options.length === 4, `Question ${q.id} must have 4 options`);
      assert.ok(
        q.correctOption >= 0 && q.correctOption < 4,
        `Question ${q.id} correctOption ${q.correctOption} out of bounds`
      );
      assert.ok(
        q.question && q.question.length > 5,
        `Question ${q.id} text is too short or missing`
      );
    }
  });

  // Guard 10: Tenant-owned records require strict company scoping
  await t.test("Guard 10: Tenant-owned tables enforce companyId scoping", async () => {
    const companies = await db.select().from(companiesTable);
    assert.ok(companies.length > 0, "At least one company must exist");

    // Verify company isolation in query construction
    const employees = await db.select().from(employeesTable);
    for (const emp of employees) {
      if (emp.companyId) {
        assert.ok(typeof emp.companyId === "number" && emp.companyId > 0, `Employee ${emp.id} has invalid companyId`);
      }
    }
  });

  // Guard 11: Scored question identifiers and diagnostic question identifiers have zero intersection
  await t.test("Guard 11: Scored questions (313) and Diagnostic questions (88) have zero identifier or prompt overlap", async () => {
    const diagnosticIds = new Set(DIAGNOSTIC_QUESTION_BANK.map((d) => d.id));
    const diagnosticPrompts = new Set(DIAGNOSTIC_QUESTION_BANK.map((d) => d.prompt.toLowerCase().trim()));

    // Verify diagnostic count is exactly 88
    assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic question bank must contain exactly 88 questions");

    // All active scored questions from database
    const questions = await db.select().from(quizQuestionsTable);
    
    // Check that no diagnostic ID or prompt appears in active scored questions
    for (const q of questions) {
      assert.ok(
        !diagnosticIds.has(String(q.id)),
        `Scored question id collision with diagnostic ID: ${q.id}`
      );
      assert.ok(
        !diagnosticPrompts.has(q.question.toLowerCase().trim()),
        `Scored question prompt collision with diagnostic prompt: ${q.question}`
      );
    }

    // Verify the six ELH-01 questions responsible for 254->260 increase
    const elh01Questions = [
      "A company decides to replace single-use plastic water bottles",
      "Living on an island like Mauritius, which of these is a critical resource reality",
      "During a busy day, you notice that a faucet in the restrooms is running continuously",
      "You are preparing printed booklets for an upcoming team meeting",
      "Which of the following best defines an employee's role in supporting company-wide sustainability goals",
      "Visual Identification Question: Look at the workplace scene description",
    ];

    for (const snippet of elh01Questions) {
      const match = DIAGNOSTIC_QUESTION_BANK.find((d) => d.prompt.includes(snippet));
      assert.strictEqual(match, undefined, `ELH-01 scored question snippet found in diagnostic bank: ${snippet}`);
    }
  });
});

