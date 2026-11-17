import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  learningPathsTable,
  learningPathCoursesTable,
  WASTE_SORTING_PATHWAY_SLUG,
  WASTE_SORTING_PATHWAY_TITLE,
  WASTE_SORTING_CHALLENGES,
} from "@workspace/db";
import { eq, inArray, sql } from "drizzle-orm";
import { evaluateCourseAccess } from "./lib/courseAccessService";
import {
  FREE_FOUNDATIONAL_CHALLENGES,
  isFreeFoundationalChallenge,
  TOPIC_PAID_RECOMMENDATIONS,
} from "./config/freePathway";
import { ensureWasteSortingPathway } from "./lib/ensureWasteSortingPathway";
import type { CompanyAccess } from "./lib/access";

describe("Morieva Skills Sprint — Waste Sorting & Recycling in Mauritius", () => {
  it("1. Verifies the 8 new challenges exist with correct codes, order, and metadata", async () => {
    // Run the idempotent seeder first to ensure everything is initialized in test database
    await ensureWasteSortingPathway();

    assert.equal(WASTE_SORTING_CHALLENGES.length, 8, "Must contain exactly 8 sprint challenges");

    const expectedTitles = [
      "The Right Bin at Work",
      "Paper and Cardboard",
      "Plastic Bottles and Packaging",
      "Glass and Metal",
      "Food Scraps and Soiled Packaging",
      "Batteries, Bulbs and Small Electronics",
      "Tricky Takeaway Packaging",
      "The Final Sorting Challenge",
    ];

    for (let i = 0; i < 8; i++) {
      const challengeDef = WASTE_SORTING_CHALLENGES[i];
      assert.equal(challengeDef.order, i + 1, `Order must be ${i + 1}`);
      assert.equal(challengeDef.courseCode, `ELH-${36 + i}`, `Code must be ELH-${36 + i}`);
      assert.equal(challengeDef.title, expectedTitles[i], `Title must match expected scenario title`);

      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, challengeDef.courseCode));

      assert.ok(course, `Challenge ${challengeDef.courseCode} must exist in coursesTable`);
      assert.equal(course.isPublished, true, `Challenge ${challengeDef.courseCode} must be published`);
      assert.equal(course.status, "published", `Challenge ${challengeDef.courseCode} status must be published`);
      assert.equal(course.passingScore, 80, "Passing score must be 80%");
      assert.ok(course.durationMinutes >= 5 && course.durationMinutes <= 8, "Duration must be 5-8 minutes on mobile");

      // Verify lessons count
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, course.id));

      assert.ok(lessons.length >= 3, `Challenge ${challengeDef.courseCode} must have at least 3 lessons`);
    }
  });

  it("2. Verifies each challenge has exactly 6 scored questions (total 48) with full explanations and options", async () => {
    let totalQuestionsCount = 0;

    for (const challengeDef of WASTE_SORTING_CHALLENGES) {
      assert.equal(challengeDef.questions.length, 6, `Challenge ${challengeDef.courseCode} must have exactly 6 authored questions`);

      const [course] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, challengeDef.courseCode));

      const questions = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, course.id));

      assert.equal(questions.length, 6, `Challenge ${challengeDef.courseCode} in DB must have exactly 6 scored questions`);
      totalQuestionsCount += questions.length;

      // Verify question composition: 4 sorting decisions, 1 uncertainty, 1 contamination
      const sortingDecisions = challengeDef.questions.filter((q) => q.questionType === "sorting_decision");
      const uncertainties = challengeDef.questions.filter((q) => q.questionType === "uncertainty");
      const contaminations = challengeDef.questions.filter((q) => q.questionType === "contamination");

      assert.equal(sortingDecisions.length, 4, `Challenge ${challengeDef.courseCode} must have 4 sorting decisions`);
      assert.equal(uncertainties.length, 1, `Challenge ${challengeDef.courseCode} must have 1 uncertainty question`);
      assert.equal(contaminations.length, 1, `Challenge ${challengeDef.courseCode} must have 1 contamination question`);

      for (const q of questions) {
        assert.ok(q.question && q.question.length > 10, "Question prompt must be substantive");
        assert.equal(q.options.length, 4, "Must have exactly 4 multiple choice options");
        assert.ok(q.correctOption >= 0 && q.correctOption <= 3, "correctOption must be valid index 0..3");
        assert.ok(q.correctExplanation && q.correctExplanation.length > 5, "Must have correct explanation");
        assert.ok(q.optionFeedback && q.optionFeedback.length === 4, "Must have feedback explaining each of the 4 options");
        assert.ok(q.practicalTakeaway && q.practicalTakeaway.length > 5, "Must provide clear practical workplace takeaway");
      }
    }

    assert.equal(totalQuestionsCount, 48, "Total scored questions across the 8 challenges must be exactly 48");
  });

  it("3. Verifies the Waste Sorting learning pathway exists and links all 8 challenges in order", async () => {
    const [path] = await db
      .select()
      .from(learningPathsTable)
      .where(eq(learningPathsTable.slug, WASTE_SORTING_PATHWAY_SLUG));

    assert.ok(path, "Waste Sorting pathway must exist in learningPathsTable");
    assert.equal(path.title, WASTE_SORTING_PATHWAY_TITLE, "Title must match");
    assert.equal(path.status, "active", "Pathway must be active");
    assert.equal(path.isSystemManaged, true, "Pathway must be system-managed");

    const links = await db
      .select({
        position: learningPathCoursesTable.position,
        courseId: learningPathCoursesTable.courseId,
        courseCode: coursesTable.courseCode,
        title: coursesTable.title,
      })
      .from(learningPathCoursesTable)
      .innerJoin(coursesTable, eq(learningPathCoursesTable.courseId, coursesTable.id))
      .where(eq(learningPathCoursesTable.pathId, path.id))
      .orderBy(learningPathCoursesTable.position);

    assert.equal(links.length, 8, "Pathway must link exactly 8 challenges");

    for (let pos = 1; pos <= 8; pos++) {
      const link = links[pos - 1];
      assert.equal(link.position, pos, `Position ${pos} must match`);
      assert.equal(link.courseCode, `ELH-${35 + pos}`, `Position ${pos} must have course code ELH-${35 + pos}`);
    }
  });

  it("4. Verifies Challenge 1 (The Right Bin at Work) is free entry, while Challenges 2-8 are gated for free learners", async () => {
    const freeEmployeeAccess: CompanyAccess = {
      userId: "user_free_test_01",
      email: "free.user@testcompany.mu",
      companyId: 99991,
      role: "employee",
      employee: {
        id: 9991,
        companyId: 99991,
        userId: "user_free_test_01",
        email: "free.user@testcompany.mu",
        name: "Test Free User",
        role: "employee",
        status: "active",
        profileCompleted: true,
      } as any,
      isDemo: false,
    };

    // Challenge 1 (ELH-36, courseId 36): Free entry
    const [challenge1] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, "ELH-36"));

    assert.ok(challenge1, "Challenge 1 must exist");
    assert.equal(challenge1.priceUsd, "0.00", "Challenge 1 price must be 0.00");

    const decisionCh1 = await evaluateCourseAccess(challenge1.id, freeEmployeeAccess);
    assert.equal(decisionCh1.allowed, true, "Free employee must have access to Challenge 1 without payment");
    assert.equal(decisionCh1.isFree, true, "Challenge 1 must be marked as isFree");

    // Challenge 2 (ELH-37, courseId 37): Gated for free employee
    const [challenge2] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, "ELH-37"));

    assert.ok(challenge2, "Challenge 2 must exist");
    const decisionCh2 = await evaluateCourseAccess(challenge2.id, freeEmployeeAccess);
    assert.equal(decisionCh2.allowed, false, "Free employee must be gated from Challenge 2");

    // Subscribed user has access to Challenge 2
    const subscribedAccess: CompanyAccess = {
      userId: "user_subscribed_01",
      email: "subscribed@paidcompany.mu",
      companyId: 1, // Eco Enterprise 1 has active COMPLETE subscription in mockDb
      role: "employee",
      employee: {
        id: 101,
        companyId: 1,
        userId: "user_subscribed_01",
        email: "subscribed@paidcompany.mu",
        name: "Subscribed Learner",
        role: "employee",
        status: "active",
        profileCompleted: true,
      } as any,
      isDemo: false,
    };

    const decisionCh2Subscribed = await evaluateCourseAccess(challenge2.id, subscribedAccess);
    assert.equal(decisionCh2Subscribed.allowed, true, "Subscribed employee must be able to open Challenge 2");
  });

  it("5. Verifies starter foundational selection remains at exactly 10 challenges", () => {
    assert.equal(FREE_FOUNDATIONAL_CHALLENGES.length, 10, "Foundational starter selection must remain at exactly 10 challenges");
    assert.ok(isFreeFoundationalChallenge(1), "ELH-01 must be in starter selection");
    assert.ok(isFreeFoundationalChallenge(2), "ELH-02 Waste Sorting & Mauritian Bin System must be in starter selection");
    assert.ok(isFreeFoundationalChallenge(9), "ELH-09 ESG Basics must be in starter selection");
  });

  it("6. Verifies recommendation rule maps waste sorting weakness to Tricky Takeaway Packaging (ELH-42)", () => {
    const wasteRule = TOPIC_PAID_RECOMMENDATIONS.find(
      (r) => r.competencyArea === "Workplace Waste Sorting & Contamination Control"
    );

    assert.ok(wasteRule, "Must have recommendation rule for waste sorting");
    assert.equal(wasteRule.recommendedCourseCode, "ELH-42", "Must recommend ELH-42 (Tricky Takeaway Packaging)");
    assert.equal(wasteRule.recommendedTitle, "Tricky Takeaway Packaging", "Title must match");
  });

  it("7. Verifies ensureWasteSortingPathway is idempotent and creates no duplicates on re-run", async () => {
    const sprintCodes = WASTE_SORTING_CHALLENGES.map((c) => c.courseCode);
    const coursesBefore = await db
      .select({ id: coursesTable.id })
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, sprintCodes));

    // Re-run
    await ensureWasteSortingPathway();

    const coursesAfter = await db
      .select({ id: coursesTable.id })
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, sprintCodes));

    assert.equal(coursesAfter.length, coursesBefore.length, "Re-running must not create duplicate courses");
    assert.equal(coursesAfter.length, 8, "Exactly 8 sprint courses must exist");
  });
});
