#!/usr/bin/env python3
import json
import os
import sys

# Import our 4 modules
from batch3b_module_1 import get_courses_1_to_5
from batch3b_module_2 import get_courses_6_to_9
from batch3b_module_3 import get_courses_10_to_14
from batch3b_module_4 import get_courses_15_to_18

EXPECTED_CANONICAL_TITLES = {
    "ELH-17": "Tracking Sustainability Actions and Progress",
    "ELH-19": "Reviewing Sustainability Performance and Taking Corrective Action",
    "ELH-20": "Sustainability Roles, Responsibilities and Accountability",
    "ELH-23": "Planning and Delivering Workplace Sustainability Initiatives",
    "ELH-35": "Sustainable Housekeeping Operations",
    "ELH-36": "Sustainable Commercial Kitchens & Culinary",
    "ELH-39": "Hotel Engineering: Central Plant & HVAC Optimization",
    "ELH-43": "Energy-Efficient Hotel Guest Rooms & Smart Controls",
    "ELH-45": "Sustainable Hospitality Sourcing & Local Purchasing",
    "ELH-47": "Green Leases & Tenant Sustainability Engagement",
    "ELH-48": "Smart Building Automation & BMS Optimization",
    "ELH-49": "Construction Site Environmental Controls",
    "ELH-50": "Sustainable Building Materials & Low-Carbon Concrete",
    "ELH-52": "Sustainable Property Facility Operations",
    "ELH-53": "Green Building Retrofits & Decarbonization Pathways",
    "ELH-54": "Sustainable Property HVAC & Chiller Optimization",
    "ELH-55": "Legionella & Water System Safety in Facilities",
    "ELH-56": "Sustainable Building Certifications (LEED/BREEAM)"
}

def main():
    courses = []
    courses.extend(get_courses_1_to_5())
    courses.extend(get_courses_6_to_9())
    courses.extend(get_courses_10_to_14())
    courses.extend(get_courses_15_to_18())

    print(f"Total courses gathered: {len(courses)}")
    assert len(courses) == 18, f"Expected exactly 18 courses, got {len(courses)}"

    # Validate each course
    for i, c in enumerate(courses):
        code = c["courseCode"]
        assert code in EXPECTED_CANONICAL_TITLES, f"Unexpected course code {code}"
        expected_title = EXPECTED_CANONICAL_TITLES[code]
        assert c["title"] == expected_title, f"Title mismatch for {code}: expected '{expected_title}', got '{c['title']}'"
        assert c["durationMinutes"] == 20, f"Duration mismatch for {code}: {c['durationMinutes']}"
        assert c["passingScore"] == 75, f"Passing score mismatch for {code}: {c['passingScore']}"
        assert c["level"] == "D3 Applied", f"Level mismatch for {code}: {c['level']}"
        assert len(c["lessons"]) == 5, f"Lesson count mismatch for {code}: {len(c['lessons'])}"
        
        # Validate Lesson 4 scenarios
        l4 = c["lessons"][3]
        scenarios = [b for b in l4["contentBlocks"] if b.get("type") == "interactive_scenario"]
        assert len(scenarios) >= 2, f"Lesson 4 for {code} must have at least 2 scenarios, got {len(scenarios)}"
        for s in scenarios:
            assert len(s["options"]) == 4, f"Scenario in {code} must have 4 options"
            correct_opts = [opt for opt in s["options"] if opt.get("isCorrect") is True]
            assert len(correct_opts) == 1, f"Scenario in {code} must have exactly 1 correct option"
            for opt in s["options"]:
                assert "feedback" in opt and len(opt["feedback"]) > 10, f"Option missing feedback in {code}"
                if "consequence" not in opt:
                    opt["consequence"] = opt["feedback"]
                if "score" not in opt:
                    opt["score"] = 10 if opt["isCorrect"] else 0

        # Validate Lesson 5 action callout
        l5 = c["lessons"][4]
        action_blocks = [b for b in l5["contentBlocks"] if b.get("type") == "callout" and (b.get("variant") == "action" or "Action" in b.get("title", ""))]
        assert len(action_blocks) >= 1, f"Lesson 5 for {code} must have an action callout"

        # Validate Quiz Questions
        quizzes = c["quizQuestions"]
        assert len(quizzes) == 8, f"Quiz question count for {code} must be 8, got {len(quizzes)}"
        for q_idx, q in enumerate(quizzes):
            assert q["orderIndex"] == q_idx, f"Quiz orderIndex mismatch in {code} question {q_idx}"
            assert len(q["options"]) == 4, f"Quiz question {q_idx} in {code} must have 4 options"
            assert q["correctOption"] in [0, 1, 2, 3], f"Invalid correctOption in {code} question {q_idx}"
            assert "optionFeedback" in q and len(q["optionFeedback"]) == 4, f"optionFeedback in {code} question {q_idx} must have 4 items"
            assert len(q["practicalTakeaway"]) > 5, f"Missing practicalTakeaway in {code} question {q_idx}"
            assert len(q["learningOutcome"]) > 5, f"Missing learningOutcome in {code} question {q_idx}"
            assert len(q["competencyArea"]) > 5, f"Missing competencyArea in {code} question {q_idx}"

    print("All 18 courses passed 100% structural and pedagogical validation!")

    json_data = json.dumps(courses, indent=2)

    ts_content = f"""import {{
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  enrollmentsTable,
  lessonProgressTable,
}} from "@workspace/db";
import {{ eq, inArray }} from "drizzle-orm";
import {{ logger }} from "./logger";

export interface RemediatedCourseDataBatch3B {{
  courseCode: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  categoryId: number;
  durationMinutes: number;
  priceUsd: string;
  level: string;
  passingScore: number;
  primaryCompetency: string;
  secondaryCompetencies: string[];
  learningObjectives: string[];
  intendedRoles: string[];
  badgeName: string;
  badgeDescription: string;
  completionMessage: string;
  recommendedNextCourseCode: string;
  lessons: Array<{{
    title: string;
    orderIndex: number;
    durationMinutes: number;
    content: string;
    contentBlocks: any[];
  }}>;
  quizQuestions: Array<{{
    question: string;
    options: string[];
    correctOption: number;
    orderIndex: number;
    correctExplanation: string;
    incorrectExplanation: string;
    optionFeedback: string[];
    practicalTakeaway: string;
    learningOutcome: string;
    competencyArea: string;
  }}>;
}}

export const BATCH_3B_COURSES: RemediatedCourseDataBatch3B[] = {json_data};

export async function ensureBatch3BRemediation(): Promise<void> {{
  logger.info("[Batch3B] Starting Wave 3B course remediation (18 courses)...");

  for (const courseData of BATCH_3B_COURSES) {{
    const [existingCourse] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, courseData.courseCode))
      .limit(1);

    if (!existingCourse) {{
      logger.warn(`[Batch3B] Course with code ${{courseData.courseCode}} not found in database.`);
      continue;
    }}

    // Check existing lessons and quizzes
    const existingLessons = await db
      .select()
      .from(lessonsTable)
      .where(eq(lessonsTable.courseId, existingCourse.id));

    const existingQuizzes = await db
      .select()
      .from(quizQuestionsTable)
      .where(eq(quizQuestionsTable.courseId, existingCourse.id));

    // Idempotency check: if version >= 2 and counts match exactly, skip
    if (
      (existingCourse.version ?? 1) >= 2 &&
      existingLessons.length === courseData.lessons.length &&
      existingQuizzes.length === courseData.quizQuestions.length
    ) {{
      logger.info(`[Batch3B] Course ${{courseData.courseCode}} already remediated at v${{existingCourse.version}}, skipping.`);
      continue;
    }}

    // Resolve recommended next course ID
    let nextCourseId: number | null = null;
    if (courseData.recommendedNextCourseCode) {{
      const [nextCourse] = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, courseData.recommendedNextCourseCode))
        .limit(1);
      if (nextCourse) {{
        nextCourseId = nextCourse.id;
      }}
    }}

    logger.info(`[Batch3B] Upgrading course ${{courseData.courseCode}} (ID: ${{existingCourse.id}}) to version 2...`);

    // 1. Update Course record (Version Bump v1 -> v2)
    await db
      .update(coursesTable)
      .set({{
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        fullDescription: courseData.fullDescription,
        categoryId: courseData.categoryId,
        durationMinutes: courseData.durationMinutes,
        priceUsd: courseData.priceUsd,
        level: courseData.level,
        passingScore: courseData.passingScore,
        primaryCompetency: courseData.primaryCompetency,
        secondaryCompetencies: courseData.secondaryCompetencies,
        learningObjectives: courseData.learningObjectives,
        intendedRoles: courseData.intendedRoles,
        badgeName: courseData.badgeName,
        badgeDescription: courseData.badgeDescription,
        completionMessage: courseData.completionMessage,
        recommendedNextCourseId: nextCourseId,
        version: 2,
        isPublished: true,
        status: "published",
        updatedAt: new Date(),
      }})
      .where(eq(coursesTable.id, existingCourse.id));

    // 2. Fetch existing lessons before cleanup for lesson progress safety
    const oldLessons = await db
      .select()
      .from(lessonsTable)
      .where(eq(lessonsTable.courseId, existingCourse.id));

    const oldLessonIds = oldLessons.map((l) => l.id);
    if (oldLessonIds.length > 0) {{
      await db
        .delete(lessonProgressTable)
        .where(inArray(lessonProgressTable.lessonId, oldLessonIds));
    }}

    // Clean up old lessons and quizzes
    await db
      .delete(lessonsTable)
      .where(eq(lessonsTable.courseId, existingCourse.id));

    await db
      .delete(quizQuestionsTable)
      .where(eq(quizQuestionsTable.courseId, existingCourse.id));

    // 3. Insert 5 new chunked lessons
    for (const lesson of courseData.lessons) {{
      await db.insert(lessonsTable).values({{
        courseId: existingCourse.id,
        title: lesson.title,
        orderIndex: lesson.orderIndex,
        durationMinutes: lesson.durationMinutes,
        content: lesson.content,
        contentBlocks: lesson.contentBlocks,
      }});
    }}

    // 4. Insert 8 new scored quiz questions with feedback
    for (const q of courseData.quizQuestions) {{
      await db.insert(quizQuestionsTable).values({{
        courseId: existingCourse.id,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        orderIndex: q.orderIndex,
        correctExplanation: q.correctExplanation,
        incorrectExplanation: q.incorrectExplanation,
        optionFeedback: q.optionFeedback,
        practicalTakeaway: q.practicalTakeaway,
        learningOutcome: q.learningOutcome,
        competencyArea: q.competencyArea,
      }});
    }}

    logger.info(
      {{ code: courseData.courseCode, courseId: existingCourse.id, version: 2, lessonsCount: courseData.lessons.length, quizCount: courseData.quizQuestions.length }},
      "[Batch3B] Successfully remediated course with 5 lessons and 8 scored quiz items."
    );
  }}

  logger.info("[Batch3B] Wave 3B remediation completed successfully for all 18 courses.");
}}

// Forward-only version-safe rollback engine for Batch 3B
export async function executeVersionSafeRollbackBatch3B(
  courseCode: string,
  snapshotContent: {{
    title?: string;
    description?: string;
    lessons?: any[];
    quizQuestions?: any[];
  }}
): Promise<number> {{
  const [course] = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.courseCode, courseCode))
    .limit(1);

  if (!course) {{
    throw new Error(`Course ${{courseCode}} not found for rollback`);
  }}

  const currentVersion = course.version ?? 1;
  const nextVersion = currentVersion + 1; // Strict monotonic forward increment (e.g. v2 -> v3)

  await db
    .update(coursesTable)
    .set({{
      title: snapshotContent.title || course.title,
      description: snapshotContent.description || course.description,
      version: nextVersion,
      updatedAt: new Date(),
    }})
    .where(eq(coursesTable.id, course.id));

  if (snapshotContent.lessons && snapshotContent.lessons.length > 0) {{
    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, course.id));
    for (const l of snapshotContent.lessons) {{
      await db.insert(lessonsTable).values({{
        courseId: course.id,
        title: l.title,
        orderIndex: l.orderIndex,
        durationMinutes: l.durationMinutes || 10,
        content: l.content || "",
        contentBlocks: l.contentBlocks || [],
      }});
    }}
  }}

  if (snapshotContent.quizQuestions && snapshotContent.quizQuestions.length > 0) {{
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, course.id));
    for (const q of snapshotContent.quizQuestions) {{
      await db.insert(quizQuestionsTable).values({{
        courseId: course.id,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        orderIndex: q.orderIndex,
        correctExplanation: q.correctExplanation || "",
        incorrectExplanation: q.incorrectExplanation || "",
        optionFeedback: q.optionFeedback || [],
        practicalTakeaway: q.practicalTakeaway || "",
      }});
    }}
  }}

  logger.info({{ code: courseCode, previousVersion: currentVersion, rolledBackToNewVersion: nextVersion }}, "Batch 3B forward rollback executed successfully.");
  return nextVersion;
}}
"""

    out_path = "/Users/sharonlennon/Desktop/Elearn-Hub copy/artifacts/api-server/src/lib/ensureBatch3BRemediation.ts"
    with open(out_path, "w") as f:
        f.write(ts_content)

    print(f"Successfully generated {out_path} ({len(ts_content)} bytes)")

if __name__ == "__main__":
    main()
