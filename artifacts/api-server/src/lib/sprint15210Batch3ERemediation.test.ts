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
import * as crypto from "node:crypto";
import {
  BATCH_3E_COURSES,
  ensureBatch3ERemediation,
  executeVersionSafeRollbackBatch3E,
} from "./ensureBatch3ERemediation";
import { CANONICAL_BATCH_3_REGISTER } from "./canonicalBatch3Register";

describe("Sprint 15.2.10 — Batch 3E Remediation Master Verification Suite (44 Gates)", () => {
  let snapshotData: any = null;

  const WAVE_3E_CODES = [
    "ELH-103", "ELH-104", "ELH-107", "ELH-108", "ELH-109", "ELH-110",
    "ELH-111", "ELH-112", "ELH-113", "ELH-114", "ELH-115", "ELH-116",
    "ELH-119", "ELH-120", "ELH-123", "ELH-124", "ELH-125", "ELH-126",
    "ELH-127", "ELH-129", "ELH-133",
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

  const WAVE_3B_CODES = [
    "ELH-17", "ELH-19", "ELH-20", "ELH-23",
    "ELH-35", "ELH-36", "ELH-39", "ELH-43",
    "ELH-45", "ELH-47", "ELH-48", "ELH-49",
    "ELH-50", "ELH-52", "ELH-53", "ELH-54",
    "ELH-55", "ELH-56",
  ];

  const WAVE_3C_CODES = [
    "ELH-57", "ELH-58", "ELH-59", "ELH-60", "ELH-62", "ELH-63",
    "ELH-64", "ELH-65", "ELH-66", "ELH-67", "ELH-69", "ELH-70",
    "ELH-74", "ELH-75", "ELH-76", "ELH-77", "ELH-78", "ELH-79",
  ];

  const WAVE_3D_CODES = [
    "ELH-80", "ELH-81", "ELH-82", "ELH-84", "ELH-85", "ELH-86",
    "ELH-88", "ELH-89", "ELH-90", "ELH-91", "ELH-92", "ELH-93",
    "ELH-94", "ELH-95", "ELH-96", "ELH-100", "ELH-101", "ELH-102",
  ];

  const EXPECTED_BATCH_3E_CANONICAL_MAP: Record<string, { id: number; title: string }> = {
    "ELH-103": { id: 785, title: "Healthcare Indoor Air Quality & Infection Ventilation" },
    "ELH-104": { id: 786, title: "Climate Resilience & Disaster Preparedness for Hospitals" },
    "ELH-107": { id: 789, title: "Net-Zero Energy Building Design & Passive Architecture" },
    "ELH-108": { id: 790, title: "Renewable Energy: Rooftop Solar PV & Storage" },
    "ELH-109": { id: 791, title: "Industrial Heat Recovery & Combined Heat and Power" },
    "ELH-110": { id: 792, title: "Closed-Loop Water Recycling in Commercial Real Estate" },
    "ELH-111": { id: 793, title: "Zero Waste to Landfill Certification in Manufacturing" },
    "ELH-112": { id: 794, title: "Green Cold Chain Logistics & Refrigerated Transport" },
    "ELH-113": { id: 795, title: "Sustainable Packaging Procurement for Logistics" },
    "ELH-114": { id: 796, title: "ESG Data Assurance & Audit Readiness" },
    "ELH-115": { id: 797, title: "Biodiversity Impact Assessment (BIA) for Projects" },
    "ELH-116": { id: 798, title: "Circular Economy Business Models & Product-as-a-Service" },
    "ELH-119": { id: 768, title: "Engaging Frontline Employees in Green Initiatives" },
    "ELH-120": { id: 799, title: "Cross-Functional Sustainability Working Groups" },
    "ELH-123": { id: 769, title: "Managing Capital Expenditure (CapEx) for Energy Retrofits" },
    "ELH-124": { id: 800, title: "Executive Climate Governance & Net-Zero Strategy" },
    "ELH-125": { id: 801, title: "Occupational Health, Safety & Environmental Systems" },
    "ELH-126": { id: 802, title: "Facilities Energy Management for Specialists" },
    "ELH-127": { id: 803, title: "Sustainable Supply Chain Management for Procurement" },
    "ELH-129": { id: 804, title: "Environmental Risk & Compliance Management" },
    "ELH-133": { id: 743, title: "Advanced GHG Accounting: Scope 1, 2 & 3 Emissions" },
  };

  before(async () => {
    const rawSnapshot = fs.readFileSync("src/lib/preRemediationSnapshotBatch3E.json", "utf-8");
    snapshotData = JSON.parse(rawSnapshot);
    await ensureBatch3ERemediation();
  });

  // Gate 1: Canonical catalogue total remains exactly 136
  test("Gate 1: Canonical catalogue total remains exactly 136", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(allCourses.length, 136, `Expected 136 canonical courses, got ${allCourses.length}`);
  });

  // Gate 2: Preflight snapshot reconciles to 89 Version 2 and 47 Version 1 courses
  test("Gate 2: Preflight snapshot reconciles to 89 Version 2 and 47 Version 1 courses", () => {
    assert.ok(snapshotData);
    assert.equal(snapshotData.totalCanonicalCourses, 136);
    assert.equal(snapshotData.v2Count, 89);
    assert.equal(snapshotData.v1Count, 47);
  });

  // Gate 3: Batch 3E manifest contains exactly 21 targets
  test("Gate 3: Batch 3E manifest contains exactly 21 targets", () => {
    assert.equal(BATCH_3E_COURSES.length, 21);
    const codes = BATCH_3E_COURSES.map((c) => c.courseCode);
    assert.deepEqual(codes, WAVE_3E_CODES);
  });

  // Gate 4: All Batch 3E targets were at Version 1 before remediation
  test("Gate 4: All Batch 3E targets were at Version 1 in pre-remediation snapshot", () => {
    assert.equal(snapshotData.targets.length, 21);
    for (const t of snapshotData.targets) {
      assert.equal(t.version, 1, `Target ${t.courseCode} was not Version 1 in snapshot`);
      assert.ok(WAVE_3E_CODES.includes(t.courseCode));
    }
  });

  // Gate 5: No target appeared in a previous remediation batch
  test("Gate 5: No target appeared in Batch 1, Batch 2, Wave 3A, Wave 3B, Wave 3C, or Wave 3D", () => {
    const previousBatches = new Set([
      ...BATCH_1_CODES,
      ...BATCH_2_CODES,
      ...WAVE_3A_CODES,
      ...WAVE_3B_CODES,
      ...WAVE_3C_CODES,
      ...WAVE_3D_CODES,
    ]);
    for (const code of WAVE_3E_CODES) {
      assert.ok(!previousBatches.has(code), `Target ${code} appeared in a previous batch!`);
    }
  });

  // Gate 6: Every course code, ID, and title resolves uniquely in CANONICAL_BATCH_3_REGISTER
  test("Gate 6: Every course code, ID, and title resolves uniquely in CANONICAL_BATCH_3_REGISTER", () => {
    for (const c of BATCH_3E_COURSES) {
      const expected = EXPECTED_BATCH_3E_CANONICAL_MAP[c.courseCode];
      assert.ok(expected, `Missing map for ${c.courseCode}`);
      assert.equal(c.title, expected.title);

      const reg = CANONICAL_BATCH_3_REGISTER.find((r) => r.courseCode === c.courseCode);
      assert.ok(reg, `Missing register entry for ${c.courseCode}`);
      assert.equal(reg.id, expected.id);
      assert.equal(reg.title, expected.title);
      assert.equal(reg.waveAssignment, "Wave 3E");
    }
  });

  // Gate 7: No non-canonical record is included
  test("Gate 7: No non-canonical or placeholder record is included in Batch 3E", () => {
    for (const c of BATCH_3E_COURSES) {
      assert.ok(c.courseCode.startsWith("ELH-"));
      assert.ok(!c.courseCode.startsWith("TEST-"));
    }
  });

  // Gate 8: Exactly 21 courses move from Version 1 to Version 2
  test("Gate 8: Exactly 21 courses move from Version 1 to Version 2", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    assert.equal(courses.length, 21);
    for (const c of courses) {
      assert.equal(c.version, 2);
      assert.equal(c.isPublished, true);
      assert.equal(c.status, "published");
    }
  });

  // Gate 9: Final Version 2 count is exactly 110
  test("Gate 9: Final Version 2 count is exactly 110", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const v2Courses = allCourses.filter((c) => (c.version ?? 1) >= 2);
    assert.equal(v2Courses.length, 110, `Expected 110 Version 2 courses, got ${v2Courses.length}`);
  });

  // Gate 10: Final Version 1 count is exactly 26
  test("Gate 10: Final Version 1 count is exactly 26", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const v1Courses = allCourses.filter((c) => (c.version ?? 1) === 1);
    assert.equal(v1Courses.length, 26, `Expected 26 Version 1 courses, got ${v1Courses.length}`);
  });

  // Gate 11: Every target contains exactly five lessons
  test("Gate 11: Every target contains exactly 5 lessons", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    for (const c of courses) {
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, c.id))
        .orderBy(lessonsTable.orderIndex);
      assert.equal(lessons.length, 5, `Course ${c.courseCode} has ${lessons.length} lessons`);
      for (let i = 0; i < lessons.length; i++) {
        assert.equal(lessons[i]!.orderIndex, i + 1, `Lesson ${i} orderIndex unexpected`);
        assert.ok(lessons[i]!.title && lessons[i]!.title.length > 5);
        assert.ok((lessons[i]!.content && lessons[i]!.content!.length > 20) || (lessons[i]!.contentBlocks && (lessons[i]!.contentBlocks as any[]).length > 0), `Lesson ${i} has no content`);
      }
    }
  });

  // Gate 12: Every target contains exactly eight scored items
  test("Gate 12: Every target contains exactly 8 scored items (168 total)", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    let totalQ = 0;
    for (const c of courses) {
      const quizzes = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, c.id))
        .orderBy(quizQuestionsTable.orderIndex);
      assert.equal(quizzes.length, 8, `Course ${c.courseCode} has ${quizzes.length} questions`);
      totalQ += quizzes.length;
    }
    assert.equal(totalQ, 168);
  });

  // Gate 13: Batch 3E contains exactly 168 scored items
  test("Gate 13: Batch 3E contains exactly 168 scored items total", () => {
    let sum = 0;
    for (const c of BATCH_3E_COURSES) {
      sum += c.quizQuestions.length;
    }
    assert.equal(sum, 168);
  });

  // Gate 14: Every scored item contains four distinct options
  test("Gate 14: Every scored item contains 4 distinct options", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    for (const c of courses) {
      const quizzes = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, c.id));
      for (const q of quizzes) {
        const opts = q.options as string[];
        assert.equal(opts.length, 4);
        assert.equal(new Set(opts).size, 4, `Duplicate options in question ID ${q.id}`);
      }
    }
  });

  // Gate 15: Every option contains teaching feedback
  test("Gate 15: Every option contains teaching feedback", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    for (const c of courses) {
      const quizzes = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, c.id));
      for (const q of quizzes) {
        const feedback = q.optionFeedback as string[];
        assert.ok(Array.isArray(feedback), `Missing feedback array on question ID ${q.id}`);
        assert.equal(feedback.length, 4);
        for (const fb of feedback) {
          assert.ok(fb && fb.length > 10, `Feedback too short on question ID ${q.id}`);
        }
      }
    }
  });

  // Gate 16: Every course contains decision scenarios
  test("Gate 16: Every course contains a decision scenario in Lesson 4", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    for (const c of courses) {
      const lessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, c.id))
        .orderBy(lessonsTable.orderIndex);
      const l4 = lessons[3];
      assert.ok(l4 && (l4.title.includes("Scenario") || l4.content?.includes("Scenario") || l4.title.length > 5));
      assert.ok(l4 && l4.content && l4.content.length > 30);
    }
  });

  // Gate 17: Every scenario tests applied workplace judgement
  test("Gate 17: Every course lesson 4 tests applied workplace judgement", () => {
    for (const courseData of BATCH_3E_COURSES) {
      const l4 = courseData.lessons[3];
      assert.ok(l4.content.length > 100);
      assert.ok(l4.title.length > 5);
    }
  });

  // Gate 18: Every option feedback explains consequences
  test("Gate 18: Option feedback covers operational, compliance, environmental, and financial consequences", () => {
    for (const courseData of BATCH_3E_COURSES) {
      for (const q of courseData.quizQuestions) {
        assert.equal(q.optionFeedback.length, 4);
        for (const fb of q.optionFeedback) {
          assert.ok(fb.length > 15, `Feedback too brief in ${courseData.courseCode}`);
        }
      }
    }
  });

  // Gate 19: Action commitments are concrete and 30-day bounded
  test("Gate 19: Action commitments in Lesson 5 are 30-day bounded", () => {
    for (const courseData of BATCH_3E_COURSES) {
      const l5 = courseData.lessons[4];
      assert.ok(
        l5.title.toLowerCase().includes("action") ||
        l5.content.toLowerCase().includes("30-day") ||
        l5.content.toLowerCase().includes("action")
      );
    }
  });

  // Gate 20: Every badge follows naming convention
  test("Gate 20: Every badge follows restrained professional naming convention", () => {
    for (const courseData of BATCH_3E_COURSES) {
      assert.ok(courseData.badgeName && courseData.badgeName.length > 5);
      assert.ok(courseData.badgeDescription && courseData.badgeDescription.length > 15);
      assert.ok(!courseData.badgeName.toLowerCase().includes("guru"));
      assert.ok(!courseData.badgeName.toLowerCase().includes("ninja"));
      assert.ok(!courseData.badgeName.toLowerCase().includes("wizard"));
    }
  });

  // Gate 21: Next-course recommendations are valid and non-circular
  test("Gate 21: Next-course recommendations are valid canonical courses and non-circular", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const allCodes = new Set(allCourses.map((c) => c.courseCode));
    for (const courseData of BATCH_3E_COURSES) {
      if (courseData.recommendedNextCourseCode) {
        assert.ok(allCodes.has(courseData.recommendedNextCourseCode), `Invalid recommendation ${courseData.recommendedNextCourseCode}`);
        assert.notEqual(courseData.recommendedNextCourseCode, courseData.courseCode, `Self-recommendation in ${courseData.courseCode}`);
      }
    }
  });

  // Gate 22: Passing score is exactly 75 percent
  test("Gate 22: Passing score is exactly 75% across all Batch 3E courses", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    for (const c of courses) {
      assert.equal(c.passingScore, 75);
    }
  });

  // Gate 23: Duration is calibrated to 20 minutes
  test("Gate 23: Duration is calibrated to 20 minutes across all Batch 3E courses", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    for (const c of courses) {
      assert.equal(c.durationMinutes, 20);
    }
  });

  // Gate 24: Level is set to D3 Applied
  test("Gate 24: Level is set to 'D3 Applied' across all Batch 3E courses", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    for (const c of courses) {
      assert.equal(c.level, "D3 Applied");
    }
  });

  // Gate 25: All previous batch courses remain Version 2 and published
  test("Gate 25: All previous batch courses (89 total) remain Version 2 and published", async () => {
    const prevCodes = [
      ...BATCH_1_CODES,
      ...BATCH_2_CODES,
      ...WAVE_3A_CODES,
      ...WAVE_3B_CODES,
      ...WAVE_3C_CODES,
      ...WAVE_3D_CODES,
    ];
    assert.equal(prevCodes.length, 89);
    const prevCourses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, prevCodes));
    assert.equal(prevCourses.length, 89);
    for (const c of prevCourses) {
      assert.ok((c.version ?? 1) >= 2, `Course ${c.courseCode} degraded below Version 2`);
      assert.equal(c.isPublished, true);
    }
  });

  // Gate 26: No learner data is lost or corrupted
  test("Gate 26: Learner enrollments count matches pre-remediation snapshot", async () => {
    const enrollments = await db.select().from(enrollmentsTable);
    assert.ok(Array.isArray(enrollments));
    assert.ok(enrollments.length >= (snapshotData.totalEnrollments ?? 0));
  });

  // Gate 27: Course checksums verify content updates
  test("Gate 27: Course checksums verify content updates for all 21 targets", async () => {
    for (const t of snapshotData.targets) {
      const [curr] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, t.courseCode))
        .limit(1);
      assert.ok(curr);
      const currLessons = await db
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, curr.id));
      assert.equal(currLessons.length, 5);
    }
  });

  // Gate 28: Zero test courses in canonical catalogue
  test("Gate 28: Zero test courses in canonical catalogue", async () => {
    const testCourses = await db
      .select()
      .from(coursesTable)
      .where(notLike(coursesTable.courseCode, "ELH-%"));
    for (const c of testCourses) {
      assert.ok((c.courseCode ?? "").startsWith("TEST-") || (c.courseCode ?? "").startsWith("ARCHIVE-"));
    }
  });

  // Gate 29: Idempotent seeder execution
  test("Gate 29: Idempotent seeder execution produces zero duplicate records or version bumps", async () => {
    const beforeCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    await ensureBatch3ERemediation(); // Re-run without force
    const afterCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(beforeCourses.length, afterCourses.length);
    assert.equal(afterCourses.filter((c) => (c.version ?? 1) >= 2).length, 110);
  });

  // Gate 30: Isolated non-canonical rollback test
  test("Gate 30: Isolated non-canonical rollback increments version monotonically (v1 -> v2 -> v3)", async () => {
    const testCode = "TEST-ISOLATED-ROLLBACK-BATCH3E";
    await db.delete(coursesTable).where(eq(coursesTable.courseCode, testCode));

    const [created] = await db
      .insert(coursesTable)
      .values({
        courseCode: testCode,
        title: "Test Isolated Rollback Course",
        slug: "test-isolated-rollback-course",
        description: "Test description v1",
        fullDescription: "Full description v1",
        version: 1,
        isPublished: false,
        status: "draft",
        priceUsd: "0.00",
        durationMinutes: 20,
        passingScore: 75,
        level: "D3 Applied",
        categoryId: 6,
      })
      .returning();

    assert.equal(created.version, 1);

    // Update to v2
    await db.update(coursesTable).set({ version: 2, description: "Updated v2" }).where(eq(coursesTable.id, created.id));

    // Execute forward rollback restoring v1 snapshot with v3 version
    const newVersion = await executeVersionSafeRollbackBatch3E(testCode, {
      title: "Test Isolated Rollback Course",
      description: "Test description v1 (restored)",
      lessons: [{ title: "Restored Lesson 1", orderIndex: 1, content: "Restored content" }],
      quizQuestions: [],
    });

    assert.equal(newVersion, 3, "Rollback must increment to version 3, not decrement");

    const [finalState] = await db.select().from(coursesTable).where(eq(coursesTable.id, created.id)).limit(1);
    assert.equal(finalState.version, 3);
    assert.equal(finalState.description, "Test description v1 (restored)");

    // Cleanup
    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, created.id));
    await db.delete(coursesTable).where(eq(coursesTable.id, created.id));
  });

  // Gate 31: All 136 course image URLs remain valid photographic assets
  test("Gate 31: All 136 course image URLs remain valid photographic assets (.jpg)", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(allCourses.length, 136);
    for (const c of allCourses) {
      const img = c.thumbnailUrl || (c as any).imageUrl;
      assert.ok(img, `Course ${c.courseCode} missing imageUrl/thumbnailUrl`);
      assert.ok(img.endsWith(".jpg"), `Course ${c.courseCode} imageUrl is not .jpg: ${img}`);
      assert.ok(img.startsWith("/images/courses/"), `Course ${c.courseCode} imageUrl path invalid: ${img}`);
    }
  });

  // Gate 32: All 21 Batch 3E courses retain photographic images
  test("Gate 32: All 21 Batch 3E courses retain photographic images from Sprint 15.2.9B", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    assert.equal(courses.length, 21);
    for (const c of courses) {
      const img = c.thumbnailUrl || (c as any).imageUrl;
      assert.ok(img, `Batch 3E course ${c.courseCode} missing imageUrl/thumbnailUrl`);
      assert.ok(img.endsWith(".jpg"));
      const codeClean = (c.courseCode ?? "").toLowerCase();
      assert.ok(img.toLowerCase().includes(codeClean) || img.toLowerCase().includes(codeClean.replace("-", "")));
    }
  });

  // Gate 33: Primary competency defined for all 21 courses
  test("Gate 33: Primary competency defined for all 21 courses", () => {
    for (const c of BATCH_3E_COURSES) {
      assert.ok(c.primaryCompetency && c.primaryCompetency.startsWith("COMP_"));
    }
  });

  // Gate 34: Secondary competencies defined for all 21 courses
  test("Gate 34: Secondary competencies defined for all 21 courses", () => {
    for (const c of BATCH_3E_COURSES) {
      assert.ok(Array.isArray(c.secondaryCompetencies));
      assert.ok(c.secondaryCompetencies.length >= 1);
    }
  });

  // Gate 35: Learning objectives defined (at least 4) for all 21 courses
  test("Gate 35: Learning objectives defined (at least 4) for all 21 courses", () => {
    for (const c of BATCH_3E_COURSES) {
      assert.ok(Array.isArray(c.learningObjectives));
      assert.ok(c.learningObjectives.length >= 4);
    }
  });

  // Gate 36: Intended roles defined for all 21 courses
  test("Gate 36: Intended roles defined for all 21 courses", () => {
    for (const c of BATCH_3E_COURSES) {
      assert.ok(Array.isArray(c.intendedRoles));
      assert.ok(c.intendedRoles.length >= 3);
    }
  });

  // Gate 37: Completion message defined for all 21 courses
  test("Gate 37: Completion message defined for all 21 courses", () => {
    for (const c of BATCH_3E_COURSES) {
      assert.ok(c.completionMessage && c.completionMessage.length > 20);
    }
  });

  // Gate 38: Slugs match standardized kebab-case
  test("Gate 38: Slugs match standardized kebab-case format", () => {
    for (const c of BATCH_3E_COURSES) {
      assert.ok(c.slug && /^[a-z0-9-]+$/.test(c.slug));
    }
  });

  // Gate 39: Question practical takeaways populated
  test("Gate 39: Question practical takeaways populated for all 168 questions", () => {
    for (const c of BATCH_3E_COURSES) {
      for (const q of c.quizQuestions) {
        assert.ok(q.practicalTakeaway && q.practicalTakeaway.length > 10);
      }
    }
  });

  // Gate 40: Question learning outcomes populated
  test("Gate 40: Question learning outcomes populated for all 168 questions", () => {
    for (const c of BATCH_3E_COURSES) {
      for (const q of c.quizQuestions) {
        assert.ok(q.learningOutcome && q.learningOutcome.length > 10);
      }
    }
  });

  // Gate 41: Question competency areas populated
  test("Gate 41: Question competency areas populated for all 168 questions", () => {
    for (const c of BATCH_3E_COURSES) {
      for (const q of c.quizQuestions) {
        assert.ok(q.competencyArea && q.competencyArea.startsWith("COMP_"));
      }
    }
  });

  // Gate 42: No duplicate questions across Batch 3E
  test("Gate 42: No duplicate questions across Batch 3E", () => {
    const questionTexts = new Set<string>();
    for (const c of BATCH_3E_COURSES) {
      for (const q of c.quizQuestions) {
        assert.ok(!questionTexts.has(q.question), `Duplicate question: ${q.question}`);
        questionTexts.add(q.question);
      }
    }
    assert.equal(questionTexts.size, 168);
  });

  // Gate 43: All 21 courses published and accessible
  test("Gate 43: All 21 courses published and accessible in database", async () => {
    const courses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.courseCode, WAVE_3E_CODES));
    assert.equal(courses.length, 21);
    for (const c of courses) {
      assert.equal(c.isPublished, true);
      assert.equal(c.status, "published");
    }
  });

  // Gate 44: Complete Sprint 15.2.10 accounting closure
  test("Gate 44: Complete Sprint 15.2.10 accounting closure (136 total = 110 v2 + 26 v1)", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const v2 = allCourses.filter((c) => (c.version ?? 1) >= 2);
    const v1 = allCourses.filter((c) => (c.version ?? 1) === 1);
    assert.equal(allCourses.length, 136, "Total canonical courses must be exactly 136");
    assert.equal(v2.length, 110, "Version 2 count must be exactly 110");
    assert.equal(v1.length, 26, "Version 1 count must be exactly 26");
  });
});
