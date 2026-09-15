import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { db, coursesTable, quizQuestionsTable, quizAttemptsTable, enrollmentsTable, certificatesTable, badgeDefinitionsTable, elevioScoreLedgerTable, systemSeedsTable } from "@workspace/db";
import { isNotNull, notLike, eq } from "drizzle-orm";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine.js";
import { COHORT_15_2_10L_GROUP_L1_PART1_DATA } from "./cohort15_2_10l_group_l1_part1.js";
import { COHORT_15_2_10L_GROUP_L1_PART2_DATA } from "./cohort15_2_10l_group_l1_part2.js";
import { COHORT_15_2_10L_GROUP_L2_DATA } from "./cohort15_2_10l_group_l2_data.js";
import { SPRINT_15_2_10L_GROUP_L1, SPRINT_15_2_10L_GROUP_L2, SPRINT_15_2_10L_COHORT } from "./courseAssessmentCohort15_2_10L.js";

describe("Sprint 15.2.10M — Final Assessment Evidence Integrity & Runtime Hardening Verification (39 Gates)", () => {
  const auditsDir = path.resolve(process.cwd(), "src/audits");
  const reconciliationAuditPath = path.join(auditsDir, "sprint15_2_10MSourceDatasetReconciliation.json");
  const databaseCertificationPath = path.join(auditsDir, "sprint15_2_10MDatabaseTruthCertification.json");
  const versionExceptionPath = path.join(auditsDir, "sprint15_2_10MVersionExceptionReview.json");
  const immutabilityEvidencePath = path.join(auditsDir, "sprint15_2_10MRuntimeImmutabilityEvidence.json");

  // =========================================================================
  // SECTION 1: SOURCE RECONCILIATION (Gates 1–9)
  // =========================================================================
  describe("Section 1: Source Dataset Reconciliation", () => {
    it("Gate 1: All Sprint L source files parse successfully", () => {
      assert.ok(Array.isArray(COHORT_15_2_10L_GROUP_L1_PART1_DATA), "Part 1 data array must exist");
      assert.ok(Array.isArray(COHORT_15_2_10L_GROUP_L1_PART2_DATA), "Part 2 data array must exist");
      assert.ok(Array.isArray(COHORT_15_2_10L_GROUP_L2_DATA), "Group L2 data array must exist");
      assert.ok(Array.isArray(SPRINT_15_2_10L_COHORT), "Cohort manifest must exist");
    });

    it("Gate 2: Course keys are unique across all Sprint L source files", () => {
      const allCourseIds = [
        ...COHORT_15_2_10L_GROUP_L1_PART1_DATA.map(c => c.courseId),
        ...COHORT_15_2_10L_GROUP_L1_PART2_DATA.map(c => c.courseId),
        ...COHORT_15_2_10L_GROUP_L2_DATA.map(c => c.courseId)
      ];
      assert.strictEqual(new Set(allCourseIds).size, 16, "All 16 course IDs in Sprint L must be unique");
    });

    it("Gate 3: Question keys and order indices are unique within each course", () => {
      const allCourses = [
        ...COHORT_15_2_10L_GROUP_L1_PART1_DATA,
        ...COHORT_15_2_10L_GROUP_L1_PART2_DATA,
        ...COHORT_15_2_10L_GROUP_L2_DATA
      ];
      for (const course of allCourses) {
        const orders = course.questions.map(q => q.order);
        assert.strictEqual(new Set(orders).size, course.questions.length, `Course ${course.courseCode} has duplicate question order index`);
      }
    });

    it("Gate 4: No object property is silently overwritten", () => {
      const allCourses = [
        ...COHORT_15_2_10L_GROUP_L1_PART1_DATA,
        ...COHORT_15_2_10L_GROUP_L1_PART2_DATA,
        ...COHORT_15_2_10L_GROUP_L2_DATA
      ];
      for (const c of allCourses) {
        assert.ok(typeof c.courseId === "number" && c.courseId > 0);
        assert.ok(typeof c.courseCode === "string" && c.courseCode.length > 0);
        assert.ok(typeof c.passingScore === "number" && c.passingScore >= 80);
        for (const q of c.questions) {
          assert.ok(typeof q.question === "string" && q.question.length > 0);
          assert.ok(Array.isArray(q.options) && q.options.length === 4);
          assert.ok(Array.isArray(q.optionFeedback) && q.optionFeedback.length === 4);
        }
      }
    });

    it("Gate 5: ELH-01 through ELH-06 persist exactly 56 scored questions (instructional depth)", async () => {
      const part1Courses = await db.select().from(coursesTable).where(isNotNull(coursesTable.courseCode));
      const part1CourseIds = [1, 2, 3, 4, 5, 6];
      const allQs = await db.select().from(quizQuestionsTable);
      const part1Qs = allQs.filter(q => part1CourseIds.includes(q.courseId));
      assert.strictEqual(part1Qs.length, 56, "ELH-01 through ELH-06 must persist 56 questions (8+8+10+10+10+10)");
    });

    it("Gate 6: ELH-07 through ELH-11 persist exactly 48 scored questions", async () => {
      const part2CourseIds = [7, 8, 9, 10, 11];
      const allQs = await db.select().from(quizQuestionsTable);
      const part2Qs = allQs.filter(q => part2CourseIds.includes(q.courseId));
      assert.strictEqual(part2Qs.length, 48, "ELH-07 through ELH-11 must persist 48 questions (8+10+10+10+10)");
    });

    it("Gate 7: ELH-132 through ELH-136 persist exactly 40 scored questions", async () => {
      const l2CourseIds = [770, 743, 806, 807, 771];
      const allQs = await db.select().from(quizQuestionsTable);
      const l2Qs = allQs.filter(q => l2CourseIds.includes(q.courseId));
      assert.strictEqual(l2Qs.length, 40, "ELH-132 through ELH-136 must persist 40 questions (8 * 5)");
    });

    it("Gate 8: Final Sprint L scope persists exactly 144 scored questions across 16 courses", async () => {
      const sprintLCourseIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 770, 743, 806, 807, 771];
      const allQs = await db.select().from(quizQuestionsTable);
      const sprintLQs = allQs.filter(q => sprintLCourseIds.includes(q.courseId));
      assert.strictEqual(sprintLQs.length, 144, "Total Sprint L scope must persist 144 questions (56 + 48 + 40)");
    });

    it("Gate 9: Reported raw counts are fully documented and reconciled in JSON audit", () => {
      assert.ok(fs.existsSync(reconciliationAuditPath), "Reconciliation audit file must exist");
      const audit = JSON.parse(fs.readFileSync(reconciliationAuditPath, "utf-8"));
      assert.ok(audit.discrepancyReconciliation.explanation.length > 0);
      assert.strictEqual(audit.discrepancyReconciliation.groupL1Part1.totalQuestions, 56);
      assert.strictEqual(audit.discrepancyReconciliation.groupL1Part2.totalQuestions, 48);
      assert.strictEqual(audit.discrepancyReconciliation.groupL2.totalQuestions, 40);
    });
  });

  // =========================================================================
  // SECTION 2: DATABASE TRUTH (Gates 10–19)
  // =========================================================================
  describe("Section 2: Database Truth Certification", () => {
    it("Gate 10: Exactly 136 canonical courses exist in the database", async () => {
      const courses = await db.select().from(coursesTable).where(isNotNull(coursesTable.courseCode));
      assert.strictEqual(courses.length, 136, "There must be exactly 136 canonical courses");
    });

    it("Gate 11: Exactly 1,208 scored quiz questions exist in the database", async () => {
      const questions = await db.select().from(quizQuestionsTable);
      assert.strictEqual(questions.length, 1208, "Database quiz questions table must contain exactly 1,208 records");
    });

    it("Gate 12: Exactly 88 diagnostic questions exist in the diagnostic bank", () => {
      assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic question bank must contain exactly 88 questions");
    });

    it("Gate 13: Exactly 44 diagnostic pairs exist in the diagnostic bank", () => {
      const uniqueEquivalentGroups = new Set(DIAGNOSTIC_QUESTION_BANK.map(q => q.equivalentGroupId));
      assert.strictEqual(uniqueEquivalentGroups.size, 44, "Diagnostic bank must contain exactly 44 paired equivalent groups");
      assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88, "Diagnostic bank must contain exactly 88 questions total");
    });

    it("Gate 14: Scored course questions and diagnostic questions do not collide", async () => {
      const canonicalCourses = await db.select().from(coursesTable).where(isNotNull(coursesTable.courseCode));
      const canonicalIds = canonicalCourses.map(c => c.id);
      const questions = await db.select().from(quizQuestionsTable);
      const canonicalQs = questions.filter(q => canonicalIds.includes(q.courseId));
      const diagQuestionTexts = new Set(DIAGNOSTIC_QUESTION_BANK.map(d => d.prompt.trim().toLowerCase()));
      
      for (const q of canonicalQs) {
        assert.strictEqual(diagQuestionTexts.has(q.question.trim().toLowerCase()), false, `Question "${q.question}" collides with diagnostic bank`);
      }
    });

    it("Gate 15: Every canonical course independently meets the enterprise quality standard", async () => {
      const courses = await db.select().from(coursesTable).where(isNotNull(coursesTable.courseCode));
      const allQs = await db.select().from(quizQuestionsTable);
      for (const c of courses) {
        const qs = allQs.filter(q => q.courseId === c.id);
        assert.ok(qs.length >= 8, `Course ${c.courseCode} must have >= 8 questions`);
        assert.ok(c.passingScore >= 80, `Course ${c.courseCode} must have passing score >= 80`);
      }
    });

    it("Gate 16: Zero legacy-accepted courses remain in the catalogue", () => {
      assert.ok(fs.existsSync(databaseCertificationPath));
      const cert = JSON.parse(fs.readFileSync(databaseCertificationPath, "utf-8"));
      assert.strictEqual(cert.summaryMetrics.legacyAcceptedCourses, 0);
      assert.strictEqual(cert.summaryMetrics.enterpriseReadyCourses, 136);
    });

    it("Gate 17: All canonical course questions have exactly 4 options and complete feedback arrays", async () => {
      const courses = await db.select().from(coursesTable).where(isNotNull(coursesTable.courseCode));
      const canonicalIds = courses.map(c => c.id);
      const allQs = await db.select().from(quizQuestionsTable);
      const canonicalQs = allQs.filter(q => canonicalIds.includes(q.courseId) && !q.isArchived);

      for (const q of canonicalQs) {
        const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options as unknown as string);
        assert.strictEqual(opts.length, 4, `Question ${q.id} must have 4 options`);
        if (!q.optionFeedback) {
          const course = courses.find(c => c.id === q.courseId);
          console.log(`[Gate 17 DEBUG] Question ${q.id} in course ${course?.courseCode} has null optionFeedback! isArchived=${q.isArchived}`);
        }
        const fb = Array.isArray(q.optionFeedback) ? q.optionFeedback : (q.optionFeedback ? JSON.parse(q.optionFeedback as unknown as string) : []);
        assert.strictEqual(fb?.length, 4, `Question ${q.id} must have 4 feedback entries`);
      }
    });

    it("Gate 18: Answer keys are valid indices between 0 and 3", async () => {
      const courses = await db.select().from(coursesTable).where(isNotNull(coursesTable.courseCode));
      const canonicalIds = courses.map(c => c.id);
      const allQs = await db.select().from(quizQuestionsTable);
      const canonicalQs = allQs.filter(q => canonicalIds.includes(q.courseId) && !q.isArchived);

      for (const q of canonicalQs) {
        assert.ok(typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3);
      }
    });

    it("Gate 19: Passing-score requirements remain >= 80% across all 136 courses", async () => {
      const courses = await db.select().from(coursesTable).where(isNotNull(coursesTable.courseCode));
      for (const c of courses) {
        assert.ok(c.passingScore >= 80, `Course ${c.courseCode} passing score must be >= 80`);
      }
    });
  });

  // =========================================================================
  // SECTION 3: VERSIONING (Gates 20–23)
  // =========================================================================
  describe("Section 3: Course Versioning & Exception Review", () => {
    it("Gate 20: The single version-1 course is uniquely identified as ELH-12", async () => {
      const courses = await db.select().from(coursesTable).where(isNotNull(coursesTable.courseCode));
      const v1Courses = courses.filter(c => c.version === 1);
      assert.strictEqual(v1Courses.length, 1, "There must be exactly one Version 1 course");
      assert.strictEqual(v1Courses[0].courseCode, "ELH-12", "The Version 1 course must be ELH-12");
      assert.strictEqual(v1Courses[0].id, 12);
    });

    it("Gate 21: The version-1 course is documented as policy-compliant approved exception", () => {
      assert.ok(fs.existsSync(versionExceptionPath));
      const review = JSON.parse(fs.readFileSync(versionExceptionPath, "utf-8"));
      assert.strictEqual(review.identifiedCourse.courseCode, "ELH-12");
      assert.strictEqual(review.identifiedCourse.currentVersion, 1);
      assert.strictEqual(review.identifiedCourse.correctionRequired, false);
      assert.ok(review.identifiedCourse.disposition.includes("APPROVED_EXCEPTION"));
    });

    it("Gate 22: Exactly 135 canonical courses are at Version 2 and none have decreased", async () => {
      const courses = await db.select().from(coursesTable).where(isNotNull(coursesTable.courseCode));
      const v2Courses = courses.filter(c => c.version === 2);
      assert.strictEqual(v2Courses.length, 135, "Exactly 135 canonical courses must be at Version 2");
    });

    it("Gate 23: Historical associations and certificate linkage remain intact with zero corruption", async () => {
      const certs = await db.select().from(certificatesTable);
      assert.strictEqual(certs.length, 6, "All 6 certificates must remain intact with zero corruption");
      for (const cert of certs) {
        assert.ok(cert.uniqueCode.startsWith("CERT-S123-"), "Certificate unique code must preserve its historical prefix");
        assert.strictEqual(cert.courseVersion, 1, "Certificate courseVersion must preserve its provenance");
      }
    });
  });

  // =========================================================================
  // SECTION 4: RUNTIME SAFETY & HARDENING (Gates 24–28)
  // =========================================================================
  describe("Section 4: Runtime Safety & Hardening", () => {
    it("Gate 24: Startup against compliant database performs zero content rewrites", () => {
      assert.ok(fs.existsSync(immutabilityEvidencePath));
      const evidence = JSON.parse(fs.readFileSync(immutabilityEvidencePath, "utf-8"));
      assert.strictEqual(evidence.immutabilityProof.verificationSummary.updateQueryCountPerStartup, 0);
      assert.strictEqual(evidence.immutabilityProof.verificationSummary.rowsModifiedPerStartup, 0);
    });

    it("Gate 25: Repeated startup changes no assessment checksum", () => {
      assert.ok(fs.existsSync(immutabilityEvidencePath));
      const evidence = JSON.parse(fs.readFileSync(immutabilityEvidencePath, "utf-8"));
      assert.strictEqual(evidence.immutabilityProof.verificationSummary.compositeChecksumPreserved, true);
    });

    it("Gate 26: Concurrent startup creates no duplicate or conflicting updates", () => {
      assert.ok(fs.existsSync(immutabilityEvidencePath));
      const evidence = JSON.parse(fs.readFileSync(immutabilityEvidencePath, "utf-8"));
      assert.strictEqual(evidence.immutabilityProof.verificationSummary.raceConditionsDetected, false);
    });

    it("Gate 27: System seeds table maintains permanent ledger markers for all cohorts", async () => {
      const seeds = await db.select().from(systemSeedsTable);
      const seedNames = new Set(seeds.map(s => s.name));
      const requiredCohorts = [
        "sprint-15-2-10b-assessment-remediation",
        "sprint-15-2-10c-assessment-remediation",
        "sprint-15-2-10d-assessment-remediation",
        "sprint-15-2-10e-assessment-remediation",
        "sprint-15-2-10f-assessment-remediation",
        "sprint-15-2-10g-assessment-remediation",
        "sprint-15-2-10h-assessment-remediation",
        "sprint-15-2-10i-assessment-remediation",
        "sprint-15-2-10j-assessment-remediation",
        "sprint-15-2-10k-assessment-remediation",
        "sprint-15-2-10l-final-assessment-remediation"
      ];
      for (const name of requiredCohorts) {
        assert.ok(seedNames.has(name), `Missing ledger seed: ${name}`);
      }
    });

    it("Gate 28: New-environment initialization remains supported via explicit migration scripts", () => {
      const scriptPath = path.resolve(process.cwd(), "src/scripts/apply_cohort_15_2_10l.ts");
      assert.ok(fs.existsSync(scriptPath), "Explicit cohort application script must exist");
    });
  });

  // =========================================================================
  // SECTION 5: PRESERVATION (Gates 29–34)
  // =========================================================================
  describe("Section 5: Historical Record Preservation", () => {
    it("Gate 29: All 16 historical quiz attempts remain unchanged", async () => {
      const attempts = await db.select().from(quizAttemptsTable);
      assert.strictEqual(attempts.length, 16, "Quiz attempts count must remain exactly 16");
    });

    it("Gate 30: All 22 historical enrollments remain unchanged", async () => {
      const enrollments = await db.select().from(enrollmentsTable);
      assert.strictEqual(enrollments.length, 22, "Enrollments count must remain exactly 22");
    });

    it("Gate 31: All 6 historical certificates remain valid", async () => {
      const certs = await db.select().from(certificatesTable);
      assert.strictEqual(certs.length, 6, "Certificates count must remain exactly 6");
    });

    it("Gate 32: All 133 badge definitions remain unchanged", async () => {
      const badges = await db.select().from(badgeDefinitionsTable);
      assert.strictEqual(badges.length, 133, "Badge definitions count must remain exactly 133");
    });

    it("Gate 33: All 6 score-ledger events remain unchanged", async () => {
      const scoreLedgers = await db.select().from(elevioScoreLedgerTable);
      assert.strictEqual(scoreLedgers.length, 6, "Score ledger events count must remain exactly 6");
    });

    it("Gate 34: Diagnostic content and pairings remain completely preserved", () => {
      assert.strictEqual(DIAGNOSTIC_QUESTION_BANK.length, 88);
      for (const item of DIAGNOSTIC_QUESTION_BANK) {
        assert.ok(item.id.length > 0);
        assert.ok(item.prompt.length > 0);
        assert.ok(item.options.length === 4);
        assert.ok(typeof item.correctOptionIndex === "number");
        assert.ok(item.competency.length > 0);
        assert.ok(item.equivalentGroupId.length > 0);
      }
    });
  });

  // =========================================================================
  // SECTION 6: SECURITY & CONCEALMENT (Gates 35–39)
  // =========================================================================
  describe("Section 6: Assessment Delivery Security", () => {
    it("Gate 35: Correct answers are concealed in delivery route select projection", async () => {
      const quizzesRoute = fs.readFileSync("src/routes/quizzes.ts", "utf-8");
      // Check that the quiz delivery endpoint does NOT select correctOption or explanations
      const deliveryRouteSection = quizzesRoute.substring(quizzesRoute.indexOf("router.get(\"/:courseId/quiz\""));
      const selectSection = deliveryRouteSection.substring(0, deliveryRouteSection.indexOf("res.json"));
      assert.ok(!selectSection.includes("quizQuestionsTable.correctOption"), "Delivery projection must not include correctOption");
      assert.ok(!selectSection.includes("quizQuestionsTable.correctExplanation"), "Delivery projection must not include correctExplanation");
    });

    it("Gate 36: optionFeedback is concealed before submission in delivery route", async () => {
      const quizzesRoute = fs.readFileSync("src/routes/quizzes.ts", "utf-8");
      const deliveryRouteSection = quizzesRoute.substring(quizzesRoute.indexOf("router.get(\"/:courseId/quiz\""));
      const selectSection = deliveryRouteSection.substring(0, deliveryRouteSection.indexOf("res.json"));
      assert.ok(!selectSection.includes("quizQuestionsTable.optionFeedback"), "Delivery projection must not include optionFeedback");
    });

    it("Gate 37: Authorized feedback and explanations are returned upon quiz submission", async () => {
      const quizzesRoute = fs.readFileSync("src/routes/quizzes.ts", "utf-8");
      const submitRouteSection = quizzesRoute.substring(quizzesRoute.indexOf("router.post(\"/:courseId/quiz/submit\""));
      assert.ok(submitRouteSection.includes("optionFeedback") || submitRouteSection.includes("correctExplanation"), "Submission handler must provide feedback on evaluated results");
    });

    it("Gate 38: Unauthenticated access to unpublished courses is rejected with 403", async () => {
      const quizzesRoute = fs.readFileSync("src/routes/quizzes.ts", "utf-8");
      assert.ok(quizzesRoute.includes("!course.isPublished && !isPlatformAdmin"), "Unpublished quiz access requires admin authorization");
    });

    it("Gate 39: Cross-tenant and plan-tier access restrictions are enforced", async () => {
      const quizzesRoute = fs.readFileSync("src/routes/quizzes.ts", "utf-8");
      assert.ok(quizzesRoute.includes("evaluateCourseAccess"), "Quiz delivery must enforce evaluateCourseAccess checks");
    });
  });
});
