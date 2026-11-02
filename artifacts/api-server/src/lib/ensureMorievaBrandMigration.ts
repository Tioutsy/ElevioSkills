import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  learningPathsTable,
  badgeDefinitionsTable,
  blogPostsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

function replaceBrandText(input: string | null | undefined): string {
  if (!input) return input ?? "";
  return input
    .replace(/The Elevio Action-Planning Framework/g, "The Morieva Action-Planning Framework")
    .replace(/Elevio Action-Planning Framework/g, "Morieva Action-Planning Framework")
    .replace(/Elevio Client/g, "Morieva Client")
    .replace(/Elevio's/g, "Morieva Skills'")
    .replace(/Elevio Recommended/g, "Morieva Skills Recommended")
    .replace(/Elevio Editorial/g, "Morieva Skills Editorial")
    .replace(/Elevio Core Sustainability Certificate/g, "Morieva Skills Core Sustainability Certificate")
    .replace(/Elevio Sustainability Certificate/g, "Morieva Skills Sustainability Certificate")
    .replace(/Elevio sustainability certification/g, "Morieva Skills sustainability certification")
    .replace(/Elevio (curriculum|catalogue|action register)/g, "Morieva Skills $1")
    .replace(/\b(ELEVIO Skills|Elevio Skills|ELEVIO SKILLS|EcoLearnHub|Eco Learn Hub)\b/g, "Morieva Skills");
}

function hasLegacyBrandText(input: string | null | undefined): boolean {
  if (!input) return false;
  return /elevio|ecolearnhub|eco learn hub/i.test(input);
}

export interface MorievaBrandMigrationSummary {
  coursesUpdated: number;
  lessonsUpdated: number;
  quizQuestionsUpdated: number;
  learningPathsUpdated: number;
  badgeDefinitionsUpdated: number;
  blogPostsUpdated: number;
}

/**
 * Idempotent, non-destructive database content migration that replaces
 * legacy "Elevio" / "EcoLearnHub" pedagogical and metadata brand mentions
 * with "Morieva Skills" while preserving all primary keys, course codes,
 * slugs, foreign keys, enrollments, attempts, and issued certificates.
 */
export async function ensureMorievaBrandMigration(): Promise<MorievaBrandMigrationSummary> {
  const summary: MorievaBrandMigrationSummary = {
    coursesUpdated: 0,
    lessonsUpdated: 0,
    quizQuestionsUpdated: 0,
    learningPathsUpdated: 0,
    badgeDefinitionsUpdated: 0,
    blogPostsUpdated: 0,
  };

  try {
    // 1. Courses
    const courses = await db.select().from(coursesTable);
    for (const c of courses) {
      const nextDesc = replaceBrandText(c.description);
      const nextFullDesc = c.fullDescription ? replaceBrandText(c.fullDescription) : c.fullDescription;
      const nextBadgeName = c.badgeName ? replaceBrandText(c.badgeName) : c.badgeName;
      const nextBadgeDesc = c.badgeDescription ? replaceBrandText(c.badgeDescription) : c.badgeDescription;

      if (
        nextDesc !== c.description ||
        nextFullDesc !== c.fullDescription ||
        nextBadgeName !== c.badgeName ||
        nextBadgeDesc !== c.badgeDescription
      ) {
        await db
          .update(coursesTable)
          .set({
            description: nextDesc,
            fullDescription: nextFullDesc,
            badgeName: nextBadgeName,
            badgeDescription: nextBadgeDesc,
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, c.id));
        summary.coursesUpdated++;
      }
    }

    // 2. Lessons
    const lessons = await db.select().from(lessonsTable);
    for (const l of lessons) {
      const blocksJson = l.contentBlocks ? JSON.stringify(l.contentBlocks) : "";
      if (
        hasLegacyBrandText(l.title) ||
        hasLegacyBrandText(l.content) ||
        hasLegacyBrandText(blocksJson)
      ) {
        const nextTitle = replaceBrandText(l.title);
        const nextContent = replaceBrandText(l.content);
        const nextBlocksJson = blocksJson ? replaceBrandText(blocksJson) : "";

        if (
          nextTitle !== l.title ||
          nextContent !== l.content ||
          nextBlocksJson !== blocksJson
        ) {
          await db
            .update(lessonsTable)
            .set({
              title: nextTitle,
              content: nextContent,
              contentBlocks: nextBlocksJson ? JSON.parse(nextBlocksJson) : l.contentBlocks,
            })
            .where(eq(lessonsTable.id, l.id));
          summary.lessonsUpdated++;
        }
      }
    }

    // 3. Quiz Questions
    const questions = await db.select().from(quizQuestionsTable);
    for (const q of questions) {
      const optionsJson = q.options ? JSON.stringify(q.options) : "";
      const feedbackJson = q.optionFeedback ? JSON.stringify(q.optionFeedback) : "";
      if (
        hasLegacyBrandText(q.question) ||
        hasLegacyBrandText(optionsJson) ||
        hasLegacyBrandText(q.explanation) ||
        hasLegacyBrandText(feedbackJson)
      ) {
        const nextQuestion = replaceBrandText(q.question);
        const nextOptionsJson = optionsJson ? replaceBrandText(optionsJson) : "";
        const nextExplanation = q.explanation ? replaceBrandText(q.explanation) : q.explanation;
        const nextFeedbackJson = feedbackJson ? replaceBrandText(feedbackJson) : "";

        if (
          nextQuestion !== q.question ||
          nextOptionsJson !== optionsJson ||
          nextExplanation !== q.explanation ||
          nextFeedbackJson !== feedbackJson
        ) {
          await db
            .update(quizQuestionsTable)
            .set({
              question: nextQuestion,
              options: nextOptionsJson ? JSON.parse(nextOptionsJson) : q.options,
              explanation: nextExplanation,
              optionFeedback: nextFeedbackJson ? JSON.parse(nextFeedbackJson) : q.optionFeedback,
            })
            .where(eq(quizQuestionsTable.id, q.id));
          summary.quizQuestionsUpdated++;
        }
      }
    }

    // 4. Learning Paths
    const paths = await db.select().from(learningPathsTable);
    for (const p of paths) {
      let nextProvider = p.providerLabel ? replaceBrandText(p.providerLabel) : p.providerLabel;
      if (nextProvider === "Elevio") nextProvider = "Morieva Skills";
      const nextDesc = replaceBrandText(p.description);
      if (nextProvider !== p.providerLabel || nextDesc !== p.description) {
        await db
          .update(learningPathsTable)
          .set({
            providerLabel: nextProvider,
            description: nextDesc,
            updatedAt: new Date(),
          })
          .where(eq(learningPathsTable.id, p.id));
        summary.learningPathsUpdated++;
      }
    }

    // 5. Badge Definitions
    const badges = await db.select().from(badgeDefinitionsTable);
    for (const b of badges) {
      const nextName = replaceBrandText(b.name);
      const nextDesc = replaceBrandText(b.description);
      if (nextName !== b.name || nextDesc !== b.description) {
        await db
          .update(badgeDefinitionsTable)
          .set({
            name: nextName,
            description: nextDesc,
          })
          .where(eq(badgeDefinitionsTable.id, b.id));
        summary.badgeDefinitionsUpdated++;
      }
    }

    // 6. Blog Posts
    const posts = await db.select().from(blogPostsTable);
    for (const post of posts) {
      const nextAuthor = replaceBrandText(post.authorName);
      if (nextAuthor !== post.authorName) {
        await db
          .update(blogPostsTable)
          .set({
            authorName: nextAuthor,
            updatedAt: new Date(),
          })
          .where(eq(blogPostsTable.id, post.id));
        summary.blogPostsUpdated++;
      }
    }

    const totalUpdated =
      summary.coursesUpdated +
      summary.lessonsUpdated +
      summary.quizQuestionsUpdated +
      summary.learningPathsUpdated +
      summary.badgeDefinitionsUpdated +
      summary.blogPostsUpdated;

    if (totalUpdated > 0) {
      logger.info({ summary }, "Completed Morieva Skills database brand migration");
    }
  } catch (err) {
    logger.error({ err }, "Error running Morieva Skills database brand migration");
  }

  return summary;
}
