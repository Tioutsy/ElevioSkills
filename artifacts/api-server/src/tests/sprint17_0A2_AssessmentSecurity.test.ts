import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import app from "../app";
import {
  db,
  coursesTable,
  quizQuestionsTable,
  quizAttemptsTable,
  certificatesTable,
  enrollmentsTable,
  employeesTable,
  companiesTable,
  companySubscriptionsTable,
} from "@workspace/db";
import { eq, and } from "drizzle-orm";

const BRAIN_DIR = "/Users/sharonlennon/.gemini/antigravity-ide/brain/75567789-3312-42f9-8945-ad365293292a";

test("Sprint 17.0A2 — Adversarial Assessment & Anti-Tampering Security Suite", async (t) => {
  // Start test HTTP server on ephemeral port on 127.0.0.1
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as { address: string; port: number };
  const baseUrl = `http://127.0.0.1:${address.port}`;

  // Synthetic Test Fixtures
  const COMPANY_ALPHA = 8801;
  const COMPANY_BETA = 8802;
  const USER_ALPHA = "synth-learner-alpha-17a2";
  const USER_BETA = "synth-learner-beta-17a2";
  const COURSE_ID = 1; // ELH-01 (10 questions, Version 2)

  // Seed Companies
  await db
    .insert(companiesTable)
    .values({
      id: COMPANY_ALPHA,
      name: "Adversarial Test Tenant Alpha",
      slug: "adversarial-alpha-17a2",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any)
    .onConflictDoNothing();

  await db
    .insert(companiesTable)
    .values({
      id: COMPANY_BETA,
      name: "Adversarial Test Tenant Beta",
      slug: "adversarial-beta-17a2",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any)
    .onConflictDoNothing();

  // Seed Subscriptions for Company Alpha
  await db
    .insert(companySubscriptionsTable)
    .values({
      companyId: COMPANY_ALPHA,
      subscriptionPlanId: 3, // Complete plan
      status: "ACTIVE",
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any)
    .onConflictDoNothing();

  // Seed Employees
  await db
    .insert(employeesTable)
    .values({
      id: 8811,
      companyId: COMPANY_ALPHA,
      clerkUserId: USER_ALPHA,
      name: "Alpha Learner",
      email: "alpha.learner@security.elevio.mu",
      role: "employee",
      status: "active",
      createdAt: new Date(),
    } as any)
    .onConflictDoNothing();

  await db
    .insert(employeesTable)
    .values({
      id: 8812,
      companyId: COMPANY_BETA,
      clerkUserId: USER_BETA,
      name: "Beta Learner",
      email: "beta.learner@security.elevio.mu",
      role: "employee",
      status: "active",
      createdAt: new Date(),
    } as any)
    .onConflictDoNothing();

  // Seed Enrollment for Alpha in Course 1
  await db
    .insert(enrollmentsTable)
    .values({
      userId: USER_ALPHA,
      companyId: COMPANY_ALPHA,
      employeeId: 8811,
      courseId: COURSE_ID,
      enrolledVersion: 2,
      status: "active",
      progressPct: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any)
    .onConflictDoNothing();

  // Fetch authorized questions for Course 1
  const authorizedQuestions = await db
    .select()
    .from(quizQuestionsTable)
    .where(and(eq(quizQuestionsTable.courseId, COURSE_ID), eq(quizQuestionsTable.isArchived, false)))
    .orderBy(quizQuestionsTable.orderIndex);

  assert.strictEqual(authorizedQuestions.length, 10, "ELH-01 must have exactly 10 authorized questions");

  // Fetch another course questions for alien test (Course 2)
  const alienQuestions = await db
    .select()
    .from(quizQuestionsTable)
    .where(and(eq(quizQuestionsTable.courseId, 2), eq(quizQuestionsTable.isArchived, false)))
    .orderBy(quizQuestionsTable.orderIndex);

  const testResults: Array<{ vector: number; description: string; expectedStatus: number; actualStatus: number; passed: boolean; details: string }> = [];

  const headersAlpha = {
    "Content-Type": "application/json",
    "x-test-user-id": USER_ALPHA,
    "x-test-user-email": "alpha.learner@security.elevio.mu",
    "x-test-user-role": "employee",
  };

  const headersBeta = {
    "Content-Type": "application/json",
    "x-test-user-id": USER_BETA,
    "x-test-user-email": "beta.learner@security.elevio.mu",
    "x-test-user-role": "employee",
  };

  // Helper to count awarded items
  const countState = async (userId: string) => {
    const attempts = await db.select().from(quizAttemptsTable).where(eq(quizAttemptsTable.userId, userId));
    const certs = await db.select().from(certificatesTable).where(eq(certificatesTable.userId, userId));
    const enr = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.userId, userId));
    const completedCount = enr.filter((e) => e.status === "completed").length;
    return { attempts: attempts.length, certs: certs.length, completedEnrollments: completedCount };
  };

  const baselineState = await countState(USER_ALPHA);

  // Vector 1: One correct answer submitted with totalQuestions: 1
  await t.test("Vector 1: One correct answer submitted with totalQuestions: 1", async () => {
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({
        totalQuestions: 1,
        answers: [{ questionId: authorizedQuestions[0].id, selectedOption: authorizedQuestions[0].correctOption }],
      }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject single answer exploit with 400");
    testResults.push({ vector: 1, description: "One correct answer with totalQuestions: 1", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Rejected answer count mismatch" });
  });

  // Vector 2: Five answers submitted while claiming legacy version 1 without persisted legacy attempt
  await t.test("Vector 2: Five answers submitted while claiming legacy version 1 without persisted legacy attempt", async () => {
    const fiveAnswers = authorizedQuestions.slice(0, 5).map((q) => ({ questionId: q.id, selectedOption: q.correctOption }));
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({
        courseVersion: 1,
        isLegacyAttempt: true,
        answers: fiveAnswers,
      }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject shortened legacy submission without persisted attempt with 400");
    testResults.push({ vector: 2, description: "Five answers claiming legacy v1 without persisted attempt", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Rejected shortened legacy submission" });
  });

  // Vector 3: Client claiming version 1 for a version-2 enrolment
  await t.test("Vector 3: Client claiming version 1 for a version-2 enrolment", async () => {
    const fiveAnswers = authorizedQuestions.slice(0, 5).map((q) => ({ questionId: q.id, selectedOption: q.correctOption }));
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({
        courseVersion: 1,
        answers: fiveAnswers,
      }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject client claiming v1 on v2 enrollment");
    testResults.push({ vector: 3, description: "Client claiming v1 on v2 enrollment", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Server enforced v2 requirement of 10 questions" });
  });

  // Vector 4: Client claiming version 2 for a legacy persisted attempt (with mismatched answer count)
  await t.test("Vector 4: Client claiming version 2 for shortened answer set", async () => {
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({
        courseVersion: 2,
        answers: authorizedQuestions.slice(0, 7).map((q) => ({ questionId: q.id, selectedOption: 0 })),
      }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject mismatched answer count even when claiming v2");
    testResults.push({ vector: 4, description: "Shortened submission claiming v2", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Rejected answer count 7 != 10" });
  });

  // Vector 5: Duplicate question IDs
  await t.test("Vector 5: Duplicate question IDs", async () => {
    // 10 answers but with question 0 duplicated and question 9 omitted
    const dupAnswers = authorizedQuestions.slice(0, 9).map((q) => ({ questionId: q.id, selectedOption: 0 }));
    dupAnswers.push({ questionId: authorizedQuestions[0].id, selectedOption: 0 }); // duplicate
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({ answers: dupAnswers }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject duplicate question IDs with 400");
    testResults.push({ vector: 5, description: "Duplicate question IDs in submission", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Detected and rejected duplicate questionId" });
  });

  // Vector 6: Unknown question IDs
  await t.test("Vector 6: Unknown question IDs", async () => {
    const unknownAnswers = authorizedQuestions.slice(0, 9).map((q) => ({ questionId: q.id, selectedOption: 0 }));
    unknownAnswers.push({ questionId: 999999, selectedOption: 0 }); // non-existent
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({ answers: unknownAnswers }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject unknown question IDs with 400");
    testResults.push({ vector: 6, description: "Unknown question ID 999999", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Rejected unknown questionId" });
  });

  // Vector 7: Questions belonging to another course
  await t.test("Vector 7: Questions belonging to another course", async () => {
    const alienAnswers = authorizedQuestions.slice(0, 9).map((q) => ({ questionId: q.id, selectedOption: 0 }));
    alienAnswers.push({ questionId: alienQuestions[0].id, selectedOption: 0 }); // from Course 2
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({ answers: alienAnswers }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject alien question belonging to another course");
    testResults.push({ vector: 7, description: "Question belonging to another course (Course 2)", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Rejected alien questionId" });
  });

  // Vector 8: Mixed-version question IDs
  await t.test("Vector 8: Mixed-version question IDs", async () => {
    const mixedAnswers = authorizedQuestions.slice(0, 9).map((q) => ({ questionId: q.id, selectedOption: 0 }));
    mixedAnswers.push({ questionId: 77777, selectedOption: 0 }); // simulated mixed legacy ID
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({ answers: mixedAnswers }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject mixed-version question IDs with 400");
    testResults.push({ vector: 8, description: "Mixed-version question IDs", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Rejected non-v2 questionId" });
  });

  // Vector 9: Tampered correct-answer values
  await t.test("Vector 9: Tampered correct-answer values", async () => {
    // Submit 10 answers with wrong selected options but inject `correct: true`, `isCorrect: true`
    const wrongAnswers = authorizedQuestions.map((q) => ({
      questionId: q.id,
      selectedOption: (q.correctOption + 1) % 4, // deliberately incorrect option
      correct: true,
      isCorrect: true,
      correctOption: (q.correctOption + 1) % 4, // attempt to overwrite key
    }));
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({ answers: wrongAnswers }),
    });
    assert.strictEqual(res.status, 200, "Submission is processed but graded fairly");
    const data = await res.json();
    assert.strictEqual(data.score, 0, "Tampered correct flags must be ignored; score must be 0%");
    assert.strictEqual(data.passed, false, "Must fail test when answers are incorrect");
    testResults.push({ vector: 9, description: "Tampered correct-answer values in payload", expectedStatus: 200, actualStatus: res.status, passed: data.score === 0 && !data.passed, details: "Server ignored client correct flags and graded score=0%" });
  });

  // Vector 10: Tampered score or pass status
  await t.test("Vector 10: Tampered score or pass status", async () => {
    const wrongAnswers = authorizedQuestions.map((q) => ({
      questionId: q.id,
      selectedOption: (q.correctOption + 2) % 4,
    }));
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({
        score: 100,
        passed: true,
        answers: wrongAnswers,
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.score, 0, "Server must ignore client-injected score: 100");
    assert.strictEqual(data.passed, false, "Server must ignore client-injected passed: true");
    testResults.push({ vector: 10, description: "Tampered score: 100 / passed: true in payload", expectedStatus: 200, actualStatus: res.status, passed: data.score === 0 && !data.passed, details: "Server computed score independently as 0%" });
  });

  // Vector 11: Submission omitting required questions
  await t.test("Vector 11: Submission omitting required questions", async () => {
    const incompleteAnswers = authorizedQuestions.slice(0, 8).map((q) => ({ questionId: q.id, selectedOption: 0 }));
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({ answers: incompleteAnswers }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject submission omitting required questions");
    testResults.push({ vector: 11, description: "Submission omitting required questions (8 of 10)", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Rejected answer count mismatch" });
  });

  // Vector 12: Submission adding unexpected questions
  await t.test("Vector 12: Submission adding unexpected questions", async () => {
    const extraAnswers = authorizedQuestions.map((q) => ({ questionId: q.id, selectedOption: 0 }));
    extraAnswers.push({ questionId: alienQuestions[0].id, selectedOption: 0 }); // 11 answers
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({ answers: extraAnswers }),
    });
    const status = res.status;
    assert.strictEqual(status, 400, "Must reject submission adding unexpected questions (11 of 10)");
    testResults.push({ vector: 12, description: "Submission adding unexpected questions (11 of 10)", expectedStatus: 400, actualStatus: status, passed: status === 400, details: "Rejected answer count mismatch" });
  });

  // Vector 13: Cross-tenant attempt submission
  await t.test("Vector 13: Cross-tenant attempt submission", async () => {
    // User Beta is in Company Beta and is NOT enrolled in Company Alpha's course 1
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersBeta,
      body: JSON.stringify({
        answers: authorizedQuestions.map((q) => ({ questionId: q.id, selectedOption: q.correctOption })),
      }),
    });
    const status = res.status;
    assert.strictEqual(status, 403, "Must reject unassigned cross-tenant submission with 403");
    testResults.push({ vector: 13, description: "Cross-tenant attempt submission", expectedStatus: 403, actualStatus: status, passed: status === 403, details: "Rejected with 403 Forbidden" });
  });

  // Vector 14: Unauthenticated submission
  await t.test("Vector 14: Unauthenticated submission", async () => {
    const res = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // No auth headers
      body: JSON.stringify({
        answers: authorizedQuestions.map((q) => ({ questionId: q.id, selectedOption: q.correctOption })),
      }),
    });
    const status = res.status;
    assert.strictEqual(status, 401, "Must reject unauthenticated submission with 401");
    testResults.push({ vector: 14, description: "Unauthenticated submission", expectedStatus: 401, actualStatus: status, passed: status === 401, details: "Rejected with 401 Unauthorized" });
  });

  // Vector 15: Reuse of an already-finalised attempt where retake is not authorised
  await t.test("Vector 15: Reuse of an already-finalised attempt where retake is not authorised", async () => {
    // First, complete a valid 10/10 submission to pass and obtain certificate
    const validPassedAnswers = authorizedQuestions.map((q) => ({ questionId: q.id, selectedOption: q.correctOption }));
    const firstRes = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({ answers: validPassedAnswers }),
    });
    assert.strictEqual(firstRes.status, 200, "First valid submission passes");
    const firstData = await firstRes.json();
    assert.strictEqual(firstData.passed, true, "First submission passed");
    assert.ok(firstData.certificateId, "Certificate was issued");

    // Second, attempt to re-submit without authorization
    const replayRes = await fetch(`${baseUrl}/api/courses/${COURSE_ID}/quiz/submit`, {
      method: "POST",
      headers: headersAlpha,
      body: JSON.stringify({ answers: validPassedAnswers }),
    });
    const status = replayRes.status;
    assert.strictEqual(status, 409, "Must reject reuse of already-finalized attempt with 409 Conflict");
    testResults.push({ vector: 15, description: "Reuse of already-finalised attempt without retake auth", expectedStatus: 409, actualStatus: status, passed: status === 409, details: "Rejected with 409 Conflict" });
  });

  // Post-test state verification: Ensure rejected attempts awarded NO fraudulent certificates
  const finalState = await countState(USER_ALPHA);
  assert.strictEqual(finalState.certs, 1, "Exactly ONE legitimate certificate was issued (from Vector 15 valid pass), zero from hostile vectors");

  server.close();

  // Write results JSON artifact
  const outPath = `${BRAIN_DIR}/assessment_adversarial_test_results.json`;
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        sprint: "17.0A2",
        suite: "Sprint 17.0A2 Adversarial Assessment Security Suite",
        totalVectorsTested: testResults.length,
        allPassed: testResults.every((r) => r.passed),
        results: testResults,
      },
      null,
      2
    )
  );
  console.log("Wrote adversarial test results to:", outPath);
});
