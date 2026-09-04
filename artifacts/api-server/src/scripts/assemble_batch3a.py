#!/usr/bin/env python3
import json
import os
import sys

from batch3a_module_1 import get_courses_1_to_4
from batch3a_module_2 import get_courses_5_to_8
from batch3a_module_3 import get_courses_9_to_12

def main():
    c1 = get_courses_1_to_4()
    c2 = get_courses_5_to_8()
    c3 = get_courses_9_to_12()
    
    all_courses = c1 + c2 + c3
    print(f"Total courses loaded: {len(all_courses)}")
    
    expected_codes = [
        "ELH-13", "ELH-14", "ELH-15", "ELH-16",
        "ELH-21", "ELH-22", "ELH-117", "ELH-118",
        "ELH-121", "ELH-122", "ELH-128", "ELH-130"
    ]
    
    loaded_codes = [c["courseCode"] for c in all_courses]
    print(f"Loaded codes: {loaded_codes}")
    assert loaded_codes == expected_codes, f"Codes mismatch! Expected {expected_codes}, got {loaded_codes}"
    
    # Validate structure for each course
    for idx, c in enumerate(all_courses):
        code = c["courseCode"]
        assert c["level"] == "D3 Applied", f"{code} level is {c['level']}, expected 'D3 Applied'"
        assert c["passingScore"] == 75, f"{code} passingScore is {c['passingScore']}, expected 75"
        assert len(c["learningObjectives"]) >= 4, f"{code} learningObjectives count < 4"
        assert len(c["lessons"]) == 5, f"{code} lessons count {len(c['lessons'])}, expected 5"
        assert len(c["quizQuestions"]) == 8, f"{code} quizQuestions count {len(c['quizQuestions'])}, expected 8"
        
        # Check scenario in Lesson 4
        l4 = c["lessons"][3]
        scenarios = [b for b in l4["contentBlocks"] if b.get("type") == "interactive_scenario"]
        assert len(scenarios) >= 2, f"{code} Lesson 4 has {len(scenarios)} scenarios, expected at least 2"
        
        # Check quiz feedback for all 4 options
        for q_idx, q in enumerate(c["quizQuestions"]):
            assert len(q["options"]) == 4, f"{code} Q{q_idx+1} has {len(q['options'])} options, expected 4"
            assert len(q["optionFeedback"]) == 4, f"{code} Q{q_idx+1} has {len(q['optionFeedback'])} feedbacks, expected 4"
            assert q["orderIndex"] == q_idx, f"{code} Q{q_idx+1} orderIndex is {q['orderIndex']}, expected {q_idx}"
            assert q["correctOption"] in [0, 1, 2, 3], f"{code} Q{q_idx+1} correctOption {q['correctOption']} out of bounds"
            
        print(f"Course {code} validated successfully.")
        
    # Generate TypeScript file
    courses_json_str = json.dumps(all_courses, indent=2)
    
    ts_code = f"""import {{ db, coursesTable, lessonsTable, quizQuestionsTable, enrollmentsTable, lessonProgressTable }} from "@workspace/db";
import {{ eq, inArray }} from "drizzle-orm";
import {{ logger }} from "./logger";

export interface RemediatedCourseData {{
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

export const BATCH_3A_COURSES: RemediatedCourseData[] = {courses_json_str};

export async function ensureBatch3ARemediation() {{
  logger.info("[Batch3A] Starting remediation for 12 D3 Applied Workplace courses (Wave 3A)...");

  for (const courseData of BATCH_3A_COURSES) {{
    const [existingCourse] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, courseData.courseCode))
      .limit(1);

    if (!existingCourse) {{
      logger.warn(`[Batch3A] Course ${{courseData.courseCode}} not found in database; skipping.`);
      continue;
    }}

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

    logger.info(`[Batch3A] Upgrading course ${{courseData.courseCode}} (ID: ${{existingCourse.id}}) to version 2...`);

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
      "[Batch3A] Successfully remediated course with 5 lessons and 8 scored quiz items."
    );
  }}

  logger.info("[Batch3A] Wave 3A remediation completed successfully for all 12 courses.");
}}

// Forward-only version-safe rollback engine for Batch 3A
export async function executeVersionSafeRollbackBatch3A(
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

  const currentVersion = course.version;
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

  logger.info({{ code: courseCode, previousVersion: currentVersion, rolledBackToNewVersion: nextVersion }}, "Batch 3A forward rollback executed successfully.");
  return nextVersion;
}}
"""

    output_path = os.path.join(os.path.dirname(__file__), "../lib/ensureBatch3ARemediation.ts")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(ts_code)
        
    print(f"ensureBatch3ARemediation.ts written successfully to {output_path}")

if __name__ == "__main__":
    main()
