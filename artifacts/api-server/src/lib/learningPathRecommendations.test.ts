import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { db, coursesTable } from "@workspace/db";
import { eq, notLike } from "drizzle-orm";
import { resolveNextCourseRecommendation } from "./recommendationService";
import { BATCH_3A_COURSES, ensureBatch3ARemediation } from "./ensureBatch3ARemediation";

describe("Learning Path Recommendations & Cycle Detection Suite", () => {
  before(async () => {
    await ensureBatch3ARemediation();
  });

  // 1. No unconditional recommendation cycles across Wave 3A
  test("1. No unconditional recommendation cycles in Wave 3A course definitions", () => {
    const codeMap = new Map(BATCH_3A_COURSES.map(c => [c.courseCode, c]));
    
    for (const course of BATCH_3A_COURSES) {
      const visited: string[] = [];
      let currCode: string | undefined = course.courseCode;

      while (currCode) {
        if (visited.includes(currCode)) {
          const cycleIdx = visited.indexOf(currCode);
          const cyclePath = visited.slice(cycleIdx).concat([currCode]).join(" -> ");
          assert.fail(`Unconditional recommendation cycle detected: ${cyclePath}`);
        }
        visited.push(currCode);
        const nextCourse = codeMap.get(currCode);
        currCode = nextCourse?.recommendedNextCourseCode;
      }
    }
  });

  // 2. Specific fix verification: ELH-15 -> ELH-22 -> ELH-117 (no ELH-22 -> ELH-15 cycle)
  test("2. ELH-15 -> ELH-22 does not cycle back to ELH-15", () => {
    const elh15 = BATCH_3A_COURSES.find(c => c.courseCode === "ELH-15");
    const elh22 = BATCH_3A_COURSES.find(c => c.courseCode === "ELH-22");

    assert.equal(elh15?.recommendedNextCourseCode, "ELH-22");
    assert.equal(elh22?.recommendedNextCourseCode, "ELH-117");
    assert.notEqual(elh22?.recommendedNextCourseCode, "ELH-15", "ELH-22 must not loop back to ELH-15");
  });

  // 3. Specific progression verification: ELH-121 (D3) and ELH-130 (D3)
  test("3. D3 courses ELH-121 and ELH-130 recommend coherent progressive courses by default", () => {
    const elh121 = BATCH_3A_COURSES.find(c => c.courseCode === "ELH-121");
    const elh130 = BATCH_3A_COURSES.find(c => c.courseCode === "ELH-130");

    assert.equal(elh121?.recommendedNextCourseCode, "ELH-122", "ELH-121 should advance to ELH-122 (D3 Applied)");
    assert.equal(elh130?.recommendedNextCourseCode, "ELH-131", "ELH-130 should advance to ELH-131 (Strategic D4)");
  });

  // 4. No self-recommendations across all canonical courses
  test("4. No course in canonical catalogue recommends itself", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    for (const c of allCourses) {
      if (c.recommendedNextCourseId) {
        assert.notEqual(
          c.recommendedNextCourseId,
          c.id,
          `Course ${c.courseCode} must not recommend itself as next course`
        );
      }
    }
  });

  // 5. Completed-course suppression: Learner who completed target course is routed to next uncompleted step
  test("5. Completed-course suppression advances learner past already-completed courses", async () => {
    const [c15] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-15"));
    const [c22] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-22"));
    const [c117] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-117"));

    assert.ok(c15 && c22 && c117);

    // Case A: User has not completed ELH-22 -> Recommendation is ELH-22 (DIRECT_PROGRESSION)
    const recA = await resolveNextCourseRecommendation({
      currentCourseId: c15.id,
      completedCourseIds: [c15.id],
    });
    assert.equal(recA.recommendedCourse?.courseCode, "ELH-22");
    assert.equal(recA.reason, "DIRECT_PROGRESSION");

    // Case B: User has already completed ELH-22 -> Recommendation suppresses ELH-22 and advances to ELH-117
    const recB = await resolveNextCourseRecommendation({
      currentCourseId: c15.id,
      completedCourseIds: [c15.id, c22.id],
    });
    assert.equal(recB.recommendedCourse?.courseCode, "ELH-117");
    assert.equal(recB.reason, "SUPPRESSED_COMPLETED_FOLLOW_CHAIN");
  });

  // 6. Conditional remedial recommendations on demonstrated competency gap
  test("6. Conditional remedial recommendations trigger only when competency gap is demonstrated", async () => {
    const [c121] = await db.select().from(coursesTable).where(eq(coursesTable.courseCode, "ELH-121"));
    assert.ok(c121);

    // Case A: Normal completion without gap -> Recommends D3 progression (ELH-122)
    const normalRec = await resolveNextCourseRecommendation({
      currentCourseId: c121.id,
      completedCourseIds: [c121.id],
    });
    assert.equal(normalRec.recommendedCourse?.courseCode, "ELH-122");
    assert.equal(normalRec.isRemedial, false);

    // Case B: Demonstrated competency gap in COMP_ENERGY -> Routes to appropriate remedial course (ELH-03 or ELH-27)
    const remedialRec = await resolveNextCourseRecommendation({
      currentCourseId: c121.id,
      completedCourseIds: [c121.id],
      demonstratedCompetencyGaps: ["COMP_ENERGY"],
    });
    assert.ok(remedialRec.recommendedCourse);
    assert.equal(remedialRec.isRemedial, true);
    assert.equal(remedialRec.reason, "CONDITIONAL_REMEDIAL");
  });

  // 7. Recommendation target existence and publication status
  test("7. Recommendation targets must exist in database and be published", async () => {
    const allCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const courseMap = new Map(allCourses.map(c => [c.id, c]));

    for (const c of allCourses) {
      if (c.recommendedNextCourseId) {
        const target = courseMap.get(c.recommendedNextCourseId);
        assert.ok(target, `Target course ID ${c.recommendedNextCourseId} for ${c.courseCode} must exist in database`);
        assert.equal(target.isPublished, true, `Target course ${target.courseCode} must have isPublished = true`);
      }
    }
  });
});
