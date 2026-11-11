import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateCourseAccess } from "./lib/courseAccessService";
import { calculateSustainabilitySkillsReview } from "./lib/skillsReviewService";
import { FREE_FOUNDATIONAL_CHALLENGES, FREE_CHALLENGE_COURSE_IDS, isFreeFoundationalChallenge } from "./config/freePathway";
import { db, enrollmentsTable, quizAttemptsTable, companiesTable, employeesTable, companySubscriptionsTable, subscriptionPlansTable, employeeBandsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import type { CompanyAccess } from "./lib/access";

describe("Freemium Learning Experience & Sustainability Skills Review", () => {
  it("1. FREE_FOUNDATIONAL_CHALLENGES contains exactly 10 ordered challenges", () => {
    assert.equal(FREE_FOUNDATIONAL_CHALLENGES.length, 10, "Must contain exactly 10 free challenges");
    assert.equal(FREE_CHALLENGE_COURSE_IDS.length, 10, "Must map to 10 course IDs");
    
    // Check sequential ordering 1..10
    const orders = FREE_FOUNDATIONAL_CHALLENGES.map((c) => c.order);
    assert.deepEqual(orders, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    // Check specific required IDs
    assert.ok(isFreeFoundationalChallenge(1), "ELH-01 Sustainability Foundations must be free");
    assert.ok(isFreeFoundationalChallenge(2), "ELH-02 Waste Sorting must be free");
    assert.ok(isFreeFoundationalChallenge(3), "ELH-03 Energy Efficiency must be free");
    assert.ok(isFreeFoundationalChallenge(4), "ELH-04 Water Conservation must be free");
    assert.ok(isFreeFoundationalChallenge(6), "ELH-06 Green Office Practices must be free");
    assert.ok(isFreeFoundationalChallenge(5), "ELH-05 Sustainable Purchasing must be free");
    assert.ok(isFreeFoundationalChallenge(7), "ELH-07 Carbon Footprint must be free");
    assert.ok(isFreeFoundationalChallenge(8), "ELH-08 Biodiversity must be free");
    assert.ok(isFreeFoundationalChallenge(11), "ELH-11 Circular Economy must be free");
    assert.ok(isFreeFoundationalChallenge(9), "ELH-09 ESG Basics must be free");

    // Check that paid courses are NOT in free tier
    assert.equal(isFreeFoundationalChallenge(12), false, "ELH-12 Final Certification must be paid");
    assert.equal(isFreeFoundationalChallenge(13), false, "ELH-13 Action Planning must be paid");
    assert.equal(isFreeFoundationalChallenge(27), false, "ELH-27 Facilities must be paid");
  });

  it("2. Free company employee has open access to all 10 free challenges", async () => {
    const freeEmployeeAccess: CompanyAccess = {
      userId: "user_free_emp_01",
      email: "free.emp@testcompany.mu",
      companyId: 99991, // Company with NO active subscription
      role: "employee",
      employee: {
        id: 9991,
        companyId: 99991,
        userId: "user_free_emp_01",
        email: "free.emp@testcompany.mu",
        name: "Test Free Employee",
        role: "employee",
        status: "active",
        profileCompleted: true,
      } as any,
      isDemo: false,
    };

    for (const courseId of FREE_CHALLENGE_COURSE_IDS) {
      const decision = await evaluateCourseAccess(courseId, freeEmployeeAccess);
      assert.equal(decision.allowed, true, `Free employee must have access to free challenge ${courseId}`);
      assert.equal(decision.isFree, true, `Challenge ${courseId} must be flagged isFree`);
    }
  });

  it("3. Free company employee is gated from paid challenges with upgrade requirement", async () => {
    const freeEmployeeAccess: CompanyAccess = {
      userId: "user_free_emp_02",
      email: "free.emp2@testcompany.mu",
      companyId: 99992,
      role: "employee",
      employee: {
        id: 9992,
        companyId: 99992,
        userId: "user_free_emp_02",
        email: "free.emp2@testcompany.mu",
        name: "Test Free Employee 2",
        role: "employee",
        status: "active",
        profileCompleted: true,
      } as any,
      isDemo: false,
    };

    // Paid course 13 (Sustainability Action Planning)
    const decision13 = await evaluateCourseAccess(13, freeEmployeeAccess);
    assert.equal(decision13.allowed, false, "Paid course 13 must be restricted for free employee");
    assert.equal(decision13.reason, "SUBSCRIPTION_INACTIVE", "Must require subscription");

    // Paid course 12 (Final Certification)
    const decision12 = await evaluateCourseAccess(12, freeEmployeeAccess);
    assert.equal(decision12.allowed, false, "Paid course 12 must be restricted for free employee");
  });

  it("4. Paid company employee retains access to paid and free challenges", async () => {
    // Seed paid company and subscription in mock db
    const paidCompanyId = 88881;
    await db.insert(companiesTable).values({
      id: paidCompanyId,
      name: "Paid Test Enterprise Ltd",
      slug: "paid-test-enterprise",
    } as any).onConflictDoNothing();

    await db.insert(companySubscriptionsTable).values({
      id: 7771,
      companyId: paidCompanyId,
      subscriptionPlanId: 3, // COMPLETE plan
      employeeBandId: 1,
      status: "ACTIVE",
    } as any).onConflictDoNothing();

    const paidEmployeeAccess: CompanyAccess = {
      userId: "user_paid_emp_01",
      email: "paid.emp@enterprise.mu",
      companyId: paidCompanyId,
      role: "employee",
      employee: {
        id: 8881,
        companyId: paidCompanyId,
        userId: "user_paid_emp_01",
        email: "paid.emp@enterprise.mu",
        name: "Paid Employee",
        role: "employee",
        status: "active",
        profileCompleted: true,
      } as any,
      isDemo: false,
    };

    // Access to free challenge
    const freeDecision = await evaluateCourseAccess(1, paidEmployeeAccess);
    assert.equal(freeDecision.allowed, true, "Paid employee can access free challenges");

    // Access to paid challenge
    const paidDecision = await evaluateCourseAccess(13, paidEmployeeAccess);
    assert.equal(paidDecision.allowed, true, "Paid employee on COMPLETE plan can access paid challenge 13");
  });

  it("5. Sustainability Skills Review is locked before all 10 free challenges are completed", async () => {
    const learnerAccess: CompanyAccess = {
      userId: "learner_review_partial",
      email: "partial@test.mu",
      companyId: 99993,
      role: "employee",
      employee: { id: 9993, companyId: 99993, role: "employee" } as any,
      isDemo: false,
    };

    // Complete only 5 challenges
    for (let i = 0; i < 5; i++) {
      const courseId = FREE_CHALLENGE_COURSE_IDS[i];
      await db.insert(enrollmentsTable).values({
        userId: "learner_review_partial",
        courseId,
        status: "completed",
        progressPct: 100,
      } as any);
      await db.insert(quizAttemptsTable).values({
        userId: "learner_review_partial",
        courseId,
        courseVersion: 1,
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        passed: true,
      } as any);
    }

    const review = await calculateSustainabilitySkillsReview(learnerAccess);
    assert.equal(review.isUnlocked, false, "Must be locked when completed count is less than 10");
    assert.equal(review.completedCount, 5);
    assert.equal(review.totalRequired, 10);
    assert.equal(review.progressPercentage, 50);
    assert.equal(review.remainingChallenges.length, 5, "Must list 5 remaining challenges");
  });

  it("6. Completing the 10th challenge unlocks the Sustainability Skills Review with scored feedback", async () => {
    const highScorerAccess: CompanyAccess = {
      userId: "learner_review_high",
      email: "high@test.mu",
      companyId: 99994,
      role: "employee",
      employee: { id: 9994, companyId: 99994, role: "employee" } as any,
      isDemo: false,
    };

    // Complete all 10 challenges with high scores (90-100%)
    for (let i = 0; i < 10; i++) {
      const courseId = FREE_CHALLENGE_COURSE_IDS[i];
      const score = i === 1 ? 100 : (i === 6 ? 80 : 90); // ELH-02 (Waste sorting) highest at 100, ELH-07 (Carbon) lowest at 80
      await db.insert(enrollmentsTable).values({
        userId: "learner_review_high",
        courseId,
        status: "completed",
        progressPct: 100,
      } as any);
      await db.insert(quizAttemptsTable).values({
        userId: "learner_review_high",
        courseId,
        courseVersion: 1,
        score,
        totalQuestions: 10,
        correctAnswers: Math.round(score / 10),
        passed: true,
      } as any);
    }

    const review = await calculateSustainabilitySkillsReview(highScorerAccess);
    assert.equal(review.isUnlocked, true, "Must be unlocked at 10 completions");
    assert.equal(review.completedCount, 10);
    assert.equal(review.progressPercentage, 100);
    assert.ok(review.overallScore !== null && review.overallScore >= 85, "Overall score should be high");
    assert.equal(review.performanceRating, "Exemplary");

    // Concrete strength should identify Waste Sorting (100%)
    assert.ok(review.concreteStrength, "Must include concrete strength");
    assert.equal(review.concreteStrength?.courseCode, "ELH-02");
    assert.equal(review.concreteStrength?.topic, "Workplace Waste Sorting & Contamination Control");

    // Skill to develop should identify Carbon Footprint (80%)
    assert.ok(review.skillToDevelop, "Must include skill to develop");
    assert.equal(review.skillToDevelop?.courseCode, "ELH-07");
    assert.equal(review.skillToDevelop?.topic, "Carbon Footprint Calculation & Commute Decarbonisation");

    // High scorer recommendation should guide to Capstone Certification (Course 12)
    assert.ok(review.recommendation, "Must include recommendation");
    assert.equal(review.recommendation?.courseId, 12, "High score guides to Course 12 capstone");
    assert.equal(review.recommendation?.previewAction.type, "preview_paid");
  });

  it("7. Legacy completions without quiz attempt rows are acknowledged honestly", async () => {
    const legacyLearnerAccess: CompanyAccess = {
      userId: "learner_review_legacy",
      email: "legacy@test.mu",
      companyId: 99995,
      role: "employee",
      employee: { id: 9995, companyId: 99995, role: "employee" } as any,
      isDemo: false,
    };

    // Complete all 10 via enrollment records only (historical legacy records without quiz attempts)
    for (let i = 0; i < 10; i++) {
      const courseId = FREE_CHALLENGE_COURSE_IDS[i];
      await db.insert(enrollmentsTable).values({
        userId: "learner_review_legacy",
        courseId,
        status: "completed",
        progressPct: 100,
      } as any);
    }

    const review = await calculateSustainabilitySkillsReview(legacyLearnerAccess);
    assert.equal(review.isUnlocked, true, "Must be unlocked for 10 legacy completions");
    assert.equal(review.completedCount, 10);
    assert.equal(review.hasLegacyPartialEvidence, true, "Must clearly flag partial legacy evidence");
    assert.equal(review.overallScore, null, "Must NOT fabricate a fake numerical percentage for legacy data");
    assert.equal(review.performanceRating, "Legacy Verified");
    assert.ok(review.recommendation, "Must provide catalogue recommendation");
  });

  it("8. Company admin next action routes to subscription upgrade", async () => {
    const adminAccess: CompanyAccess = {
      userId: "admin_user_01",
      email: "admin@freecompany.mu",
      companyId: 99996,
      role: "company_admin",
      employee: { id: 9996, companyId: 99996, role: "admin" } as any,
      isDemo: false,
    };

    // Complete all 10
    for (let i = 0; i < 10; i++) {
      const courseId = FREE_CHALLENGE_COURSE_IDS[i];
      await db.insert(enrollmentsTable).values({
        userId: "admin_user_01",
        courseId,
        status: "completed",
        progressPct: 100,
      } as any);
      await db.insert(quizAttemptsTable).values({
        userId: "admin_user_01",
        courseId,
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        passed: true,
      } as any);
    }

    const review = await calculateSustainabilitySkillsReview(adminAccess);
    assert.equal(review.isUnlocked, true);
    assert.equal(review.recommendation?.previewAction.type, "upgrade_company", "Admin preview action should route to upgrade_company");
    assert.equal(review.recommendation?.previewAction.targetHref, "/company/subscribe");
  });
});
