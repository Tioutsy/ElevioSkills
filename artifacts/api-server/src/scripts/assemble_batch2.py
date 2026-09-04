#!/usr/bin/env python3
import json
import os
import sys

# Import the 3 modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from batch2_module_1 import get_courses_1_to_4
from batch2_module_2 import get_courses_5_to_8
from batch2_module_3 import get_courses_9_to_12

def assemble_all_batch2():
    c1 = get_courses_1_to_4()
    c2 = get_courses_5_to_8()
    c3 = get_courses_9_to_12()
    
    all_courses = c1 + c2 + c3
    print(f"Total courses assembled: {len(all_courses)}")
    
    expected_codes = [
      "ELH-03", "ELH-04", "ELH-05", "ELH-06",
      "ELH-18", "ELH-24", "ELH-25", "ELH-26",
      "ELH-27", "ELH-28", "ELH-29", "ELH-30"
    ]
    
    actual_codes = [c["courseCode"] for c in all_courses]
    print(f"Actual codes: {actual_codes}")
    
    assert len(all_courses) == 12, f"Expected 12 courses, got {len(all_courses)}"
    assert actual_codes == expected_codes, f"Course codes mismatch: {actual_codes} vs {expected_codes}"
    
    for c in all_courses:
        assert len(c["lessons"]) == 5, f"{c['courseCode']} has {len(c['lessons'])} lessons, expected 5"
        assert len(c["quizQuestions"]) == 8, f"{c['courseCode']} has {len(c['quizQuestions'])} questions, expected 8"
        for q in c["quizQuestions"]:
            assert len(q["options"]) == 4, f"{c['courseCode']} Q '{q['question']}' has {len(q['options'])} options"
            assert len(q["optionFeedback"]) == 4, f"{c['courseCode']} Q '{q['question']}' has {len(q['optionFeedback'])} feedback items"
            assert 0 <= q["correctOption"] <= 3, f"{c['courseCode']} Q correctOption out of range"

    ts_content = f"""import {{
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  enrollmentsTable,
  lessonProgressTable,
}} from "@workspace/db";
import {{ eq, inArray }} from "drizzle-orm";
import {{ logger }} from "./logger";

export interface RemediatedCourseDefinition {{
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
  learningObjectives: string[];
  intendedRoles: string[];
  primaryCompetency: string;
  secondaryCompetencies: string[];
  badgeName: string;
  badgeDescription: string;
  completionMessage: string;
  recommendedNextCourseCode?: string;
  lessons: {{
    title: string;
    orderIndex: number;
    durationMinutes: number;
    content: string;
    contentBlocks: any[];
  }}[];
  quizQuestions: {{
    question: string;
    options: string[];
    correctOption: number;
    orderIndex: number;
    correctExplanation: string;
    incorrectExplanation: string;
    optionFeedback: string[];
    practicalTakeaway: string;
    learningOutcome?: string;
    competencyArea?: string;
  }}[];
}}

export const BATCH_2_REMEDIATED_COURSES: RemediatedCourseDefinition[] = {json.dumps(all_courses, indent=2)};

// Helper to execute Batch 2 remediation
export async function ensureBatch2Remediation(): Promise<void> {{
  logger.info("Starting Sprint 15.2.4 Batch 2 controlled course remediation...");

  for (const def of BATCH_2_REMEDIATED_COURSES) {{
    const [existingCourse] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, def.courseCode))
      .limit(1);

    if (!existingCourse) {{
      logger.warn({{ code: def.courseCode }}, "Course not found in database; skipping.");
      continue;
    }}

    const nextVersion = 2;

    // 1. Update course metadata and bump version to 2
    await db
      .update(coursesTable)
      .set({{
        title: def.title,
        description: def.description,
        fullDescription: def.fullDescription,
        durationMinutes: def.durationMinutes,
        priceUsd: def.priceUsd,
        level: def.level,
        passingScore: def.passingScore,
        learningObjectives: def.learningObjectives,
        intendedRoles: def.intendedRoles,
        primaryCompetency: def.primaryCompetency,
        secondaryCompetencies: def.secondaryCompetencies,
        badgeName: def.badgeName,
        badgeDescription: def.badgeDescription,
        completionMessage: def.completionMessage,
        version: nextVersion,
        isPublished: true,
        status: "published",
        updatedAt: new Date(),
      }})
      .where(eq(coursesTable.id, existingCourse.id));

    // 2. Remove previous lessons and quiz questions for this course
    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, existingCourse.id));
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, existingCourse.id));

    // 3. Insert new Version 2 structured lessons
    for (const l of def.lessons) {{
      await db.insert(lessonsTable).values({{
        courseId: existingCourse.id,
        title: l.title,
        orderIndex: l.orderIndex,
        durationMinutes: l.durationMinutes,
        content: l.content,
        contentBlocks: l.contentBlocks,
      }});
    }}

    // 4. Insert new Version 2 assessment questions
    for (const q of def.quizQuestions) {{
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
      {{ code: def.courseCode, courseId: existingCourse.id, version: nextVersion, lessonsCount: def.lessons.length, quizCount: def.quizQuestions.length }},
      "Remediated Batch 2 course successfully."
    );
  }}

  logger.info("Sprint 15.2.4 Batch 2 remediation completed.");
}}

// Forward-only version-safe rollback engine for Batch 2
export async function executeVersionSafeRollbackBatch2(
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

  logger.info({{ code: courseCode, previousVersion: currentVersion, rolledBackToNewVersion: nextVersion }}, "Batch 2 forward rollback executed successfully.");
  return nextVersion;
}}
"""
    
    out_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../lib/ensureBatch2Remediation.ts"))
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Successfully written Batch 2 remediation engine to {out_path}")

if __name__ == "__main__":
    assemble_all_batch2()
