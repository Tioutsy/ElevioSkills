import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  learningPathsTable,
  learningPathCoursesTable,
  planCourseEntitlementsTable,
  WASTE_SORTING_PATHWAY_SLUG,
  WASTE_SORTING_PATHWAY_TITLE,
  WASTE_SORTING_CHALLENGES,
} from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { logger } from "./logger";

export {
  WASTE_SORTING_PATHWAY_SLUG,
  WASTE_SORTING_PATHWAY_TITLE,
  WASTE_SORTING_CHALLENGES,
};

export async function ensureWasteSortingPathway(): Promise<void> {
  logger.info("Ensuring Waste Sorting & Recycling in Mauritius learning pathway and challenges...");

  try {
    // 1. Ensure the 8 courses exist in coursesTable
    for (const data of WASTE_SORTING_CHALLENGES) {
      const existing = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, data.courseCode))
        .limit(1)
        .then((r) => r[0]);

      let courseId: number;

      const coursePayload = {
        title: data.title,
        slug: data.slug,
        description: data.scenario,
        fullDescription: `${data.scenario}\n\nLearning Objective: ${data.learningObjective}\n\nWorkplace Action: ${data.workplaceActionTakeaway}`,
        categoryId: 1, // Core / Sustainability
        durationMinutes: data.durationMinutes,
        priceUsd: data.isFreeEntry ? "0.00" : "1400.00",
        level: data.order === 8 ? "Practical Capstone" : "Practical",
        isFeatured: data.isFreeEntry,
        isPublished: true,
        status: "published",
        passingScore: 80,
        includesCertificate: true,
        learningObjectives: [
          data.learningObjective,
          "Distinguish recyclable materials from moisture and food grease contamination",
          "Navigate site-specific instructions and verify accepted collector specifications",
          data.workplaceActionTakeaway
        ],
        badgeName: `${data.title} Specialist`,
        badgeDescription: `Demonstrated practical competency in ${data.title} for Mauritian workplaces.`,
        completionMessage: `Well done! You have completed ${data.title}. Put your workplace action into practice today!`,
        thumbnailUrl: `/images/courses/waste-sorting-${data.slug}.jpg`,
      };

      if (existing) {
        courseId = existing.id;
        await db
          .update(coursesTable)
          .set({
            ...coursePayload,
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, courseId));
        logger.info(`Updated existing challenge ${data.courseCode} (ID: ${courseId})`);
      } else {
        const inserted = await db
          .insert(coursesTable)
          .values({
            courseCode: data.courseCode,
            ...coursePayload,
          })
          .returning({ id: coursesTable.id });
        courseId = inserted[0]!.id;
        logger.info(`Inserted new challenge ${data.courseCode} (ID: ${courseId})`);
      }

      // 2. Ensure lessons in lessonsTable
      for (const lessonData of data.lessons) {
        const existingLesson = await db
          .select()
          .from(lessonsTable)
          .where(
            sql`${lessonsTable.courseId} = ${courseId} AND ${lessonsTable.orderIndex} = ${lessonData.orderIndex}`
          )
          .limit(1)
          .then((r) => r[0]);

        if (existingLesson) {
          await db
            .update(lessonsTable)
            .set({
              title: lessonData.title,
              content: lessonData.content,
              durationMinutes: lessonData.durationMinutes,
              contentBlocks: lessonData.contentBlocks,
            })
            .where(eq(lessonsTable.id, existingLesson.id));
        } else {
          await db.insert(lessonsTable).values({
            courseId,
            title: lessonData.title,
            orderIndex: lessonData.orderIndex,
            durationMinutes: lessonData.durationMinutes,
            content: lessonData.content,
            contentBlocks: lessonData.contentBlocks,
          });
        }
      }

      // 3. Ensure 6 scored questions in quizQuestionsTable
      for (const q of data.questions) {
        const existingQ = await db
          .select()
          .from(quizQuestionsTable)
          .where(
            sql`${quizQuestionsTable.courseId} = ${courseId} AND ${quizQuestionsTable.orderIndex} = ${q.orderIndex}`
          )
          .limit(1)
          .then((r) => r[0]);

        const questionPayload = {
          question: q.question,
          options: q.options,
          correctOption: q.correctOption,
          optionFeedback: q.optionFeedback,
          correctExplanation: q.correctExplanation,
          incorrectExplanation: q.incorrectExplanation,
          practicalTakeaway: q.practicalTakeaway,
          competencyArea: q.competencyArea,
          learningOutcome: data.learningObjective,
          isArchived: false,
        };

        if (existingQ) {
          await db
            .update(quizQuestionsTable)
            .set(questionPayload)
            .where(eq(quizQuestionsTable.id, existingQ.id));
        } else {
          await db.insert(quizQuestionsTable).values({
            courseId,
            orderIndex: q.orderIndex,
            ...questionPayload,
          });
        }
      }

      // 4. Ensure plan entitlements
      // Plan IDs: 1 (ESSENTIAL), 2 (PROFESSIONAL), 3 (COMPLETE)
      const plansToEntitle = data.isFreeEntry ? [1, 2, 3] : [2, 3];
      for (const planId of plansToEntitle) {
        const existingEntitlement = await db
          .select()
          .from(planCourseEntitlementsTable)
          .where(
            sql`${planCourseEntitlementsTable.subscriptionPlanId} = ${planId} AND ${planCourseEntitlementsTable.courseId} = ${courseId}`
          )
          .limit(1)
          .then((r) => r[0]);

        if (!existingEntitlement) {
          await db.insert(planCourseEntitlementsTable).values({
            subscriptionPlanId: planId,
            courseId,
            accessType: "INCLUDED",
          });
        }
      }
    }

    // 5. Ensure the Learning Path in learningPathsTable
    const totalDuration = WASTE_SORTING_CHALLENGES.reduce((sum, c) => sum + c.durationMinutes, 0);

    const existingPath = await db
      .select()
      .from(learningPathsTable)
      .where(eq(learningPathsTable.slug, WASTE_SORTING_PATHWAY_SLUG))
      .limit(1)
      .then((r) => r[0]);

    let pathId: number;

    const pathPayload = {
      slug: WASTE_SORTING_PATHWAY_SLUG,
      title: WASTE_SORTING_PATHWAY_TITLE,
      description: "A practical workplace learning pathway designed for Mauritian businesses. Master waste sorting decisions across paper, plastics, glass, metals, food scraps, electronic waste, and tricky takeaway packaging to prevent landfill contamination and support local circular collectors.",
      audience: "All employees, hospitality teams, retail staff, and office workers across Mauritius",
      level: "Practical Workflow",
      providerLabel: "Morieva Skills Practical Pathways",
      isSystemManaged: true,
      status: "active",
      companyId: null,
      icon: "recycle",
      estimatedDurationMinutes: totalDuration,
      certificateEligibility: true,
      version: 1,
    };

    if (existingPath) {
      pathId = existingPath.id;
      await db
        .update(learningPathsTable)
        .set({
          ...pathPayload,
          updatedAt: new Date(),
        })
        .where(eq(learningPathsTable.id, pathId));
      logger.info(`Updated existing learning path ${WASTE_SORTING_PATHWAY_SLUG} (ID: ${pathId})`);
    } else {
      const inserted = await db
        .insert(learningPathsTable)
        .values(pathPayload)
        .returning({ id: learningPathsTable.id });
      pathId = inserted[0]!.id;
      logger.info(`Created learning path ${WASTE_SORTING_PATHWAY_SLUG} (ID: ${pathId})`);
    }

    // 6. Link all 8 challenges into learningPathCoursesTable in exact order (position 1 to 8)
    for (const challengeData of WASTE_SORTING_CHALLENGES) {
      const [course] = await db
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, challengeData.courseCode))
        .limit(1);

      if (!course) continue;

      const existingLink = await db
        .select()
        .from(learningPathCoursesTable)
        .where(
          and(
            eq(learningPathCoursesTable.pathId, pathId),
            eq(learningPathCoursesTable.courseId, course.id)
          )
        )
        .limit(1)
        .then((r) => r[0]);

      if (existingLink) {
        await db
          .update(learningPathCoursesTable)
          .set({
            position: challengeData.order,
            orderIndex: challengeData.order,
            isRequired: true,
          })
          .where(eq(learningPathCoursesTable.id, existingLink.id));
      } else {
        await db.insert(learningPathCoursesTable).values({
          pathId,
          courseId: course.id,
          position: challengeData.order,
          orderIndex: challengeData.order,
          isRequired: true,
        });
      }
    }

    logger.info("Successfully ensured Waste Sorting & Recycling in Mauritius learning pathway and 8 challenges!");
  } catch (err) {
    logger.error({ err }, "Failed to ensure Waste Sorting & Recycling in Mauritius learning pathway");
    throw err;
  }
}
