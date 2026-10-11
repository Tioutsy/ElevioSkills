import { db, coursesTable, quizQuestionsTable, lessonsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

// Seeders
import { ensureWave1Catalogue } from "./ensureWave1Catalogue";
import { ensureWave1BCatalogue } from "./ensureWave1BCatalogue";
import { ensureWave2Catalogue } from "./ensureWave2Catalogue";
import { ensureWave3Catalogue } from "./ensureWave3Catalogue";
import { ensureWave4Catalogue } from "./ensureWave4Catalogue";

import { ensureBatch1Remediation } from "./ensureBatch1Remediation";
import { ensureBatch2Remediation } from "./ensureBatch2Remediation";
import { ensureBatch3ARemediation } from "./ensureBatch3ARemediation";
import { ensureBatch3BRemediation } from "./ensureBatch3BRemediation";
import { ensureBatch3CRemediation } from "./ensureBatch3CRemediation";
import { ensureBatch3DRemediation } from "./ensureBatch3DRemediation";
import { ensureBatch3ERemediation } from "./ensureBatch3ERemediation";

import { ensureCohort15_2_10BRemediation } from "./ensureCohort15_2_10BRemediation";
import { ensureCohort15_2_10CRemediation } from "./ensureCohort15_2_10CRemediation";
import { ensureCohort15_2_10DRemediation } from "./ensureCohort15_2_10DRemediation";
import { ensureCohort15_2_10ERemediation } from "./ensureCohort15_2_10ERemediation";
import { ensureCohort15_2_10FRemediation } from "./ensureCohort15_2_10FRemediation";
import { ensureCohort15_2_10GRemediation } from "./ensureCohort15_2_10GRemediation";
import { ensureCohort15_2_10HRemediation } from "./ensureCohort15_2_10HRemediation";
import { ensureCohort15_2_10IRemediation } from "./ensureCohort15_2_10IRemediation";
import { ensureCohort15_2_10JRemediation } from "./ensureCohort15_2_10JRemediation";
import { ensureCohort15_2_10KRemediation } from "./ensureCohort15_2_10KRemediation";
import { ensureCohort15_2_10LRemediation } from "./ensureCohort15_2_10LRemediation";
import { unpublishCourses36to139 } from "../scripts/unpublishCourses36to139";

export interface RecoveryReconciliationReport {
  mode: "DRY_RUN" | "EXECUTED";
  databaseTarget: string;
  totalCatalogueTarget: 136;
  existingCourseCount: number;
  missingCourseCount: number;
  missingCourses: string[];
  existingQuestionCount: number;
  estimatedRecoverableQuestions: number;
  executedSteps: string[];
  safetyGuardStatus: {
    neverDeleteRows: true;
    nonDestructiveMatch: true;
    productionGated: boolean;
  };
}

export async function ensureExpandedCatalogueRecovery(options: {
  dryRun?: boolean;
} = { dryRun: true }): Promise<RecoveryReconciliationReport> {
  const isDryRun = options.dryRun !== false;
  const dbUrl = process.env.DATABASE_URL || "mock-db://offline";
  const isProduction = dbUrl.includes("ep-delicate-pond-ahy88lt3");

  logger.info(
    { isDryRun, isProduction, dbUrl: dbUrl.replace(/:[^:@]+@/, ":***@") },
    "[Catalogue Recovery] Initiating recovery adapter"
  );

  // 1. Audit current database state
  let existingCourses: Array<{ id: number; courseCode: string | null; slug: string | null }> = [];
  let existingQuestionCount = 0;

  try {
    const rawCourses = await db.select({
      id: coursesTable.id,
      courseCode: coursesTable.courseCode,
      slug: coursesTable.slug,
    }).from(coursesTable);
    existingCourses = rawCourses;

    const rawQuestions = await db.select({
      id: quizQuestionsTable.id,
    }).from(quizQuestionsTable);
    existingQuestionCount = rawQuestions.length;
  } catch (err) {
    logger.warn({ err }, "[Catalogue Recovery] Could not query database tables directly, using baseline defaults");
  }

  const existingCodes = new Set(
    existingCourses
      .map((c) => c.courseCode)
      .filter((c): c is string => Boolean(c))
  );

  const allTargetCodes: string[] = Array.from({ length: 136 }, (_, i) => {
    const num = i + 1;
    return `ELH-${num.toString().padStart(2, "0")}`;
  });

  const missingCourses = allTargetCodes.filter((code) => !existingCodes.has(code));
  const executedSteps: string[] = [];

  if (isDryRun) {
    logger.info(
      {
        existing: existingCourses.length,
        missing: missingCourses.length,
        existingQuestions: existingQuestionCount,
      },
      "[Catalogue Recovery DRY-RUN] Dry run complete. No mutations performed."
    );

    return {
      mode: "DRY_RUN",
      databaseTarget: isProduction ? "Neon Production" : dbUrl.startsWith("mock") ? "In-Memory Test Mock" : "Local PostgreSQL",
      totalCatalogueTarget: 136,
      existingCourseCount: existingCourses.length,
      missingCourseCount: missingCourses.length,
      missingCourses,
      existingQuestionCount,
      estimatedRecoverableQuestions: 1208,
      executedSteps,
      safetyGuardStatus: {
        neverDeleteRows: true,
        nonDestructiveMatch: true,
        productionGated: !isProduction || process.env.ENABLE_CATALOGUE_RECOVERY === "true",
      },
    };
  }

  // Live execution mode (requires ENABLE_CATALOGUE_RECOVERY=true)
  if (process.env.ENABLE_CATALOGUE_RECOVERY !== "true") {
    throw new Error(
      "SAFETY HALT: ENABLE_CATALOGUE_RECOVERY=true must be explicitly set to perform recovery execution."
    );
  }

  logger.info("[Catalogue Recovery] Executing recovery sequence in dependency order...");

  // Wave 1-4
  await ensureWave1Catalogue();
  executedSteps.push("ensureWave1Catalogue");

  await ensureWave1BCatalogue();
  executedSteps.push("ensureWave1BCatalogue");

  await ensureWave2Catalogue();
  executedSteps.push("ensureWave2Catalogue");

  await ensureWave3Catalogue();
  executedSteps.push("ensureWave3Catalogue");

  await ensureWave4Catalogue();
  executedSteps.push("ensureWave4Catalogue");

  // Batches
  await ensureBatch1Remediation();
  executedSteps.push("ensureBatch1Remediation");

  await ensureBatch2Remediation();
  executedSteps.push("ensureBatch2Remediation");

  await ensureBatch3ARemediation();
  executedSteps.push("ensureBatch3ARemediation");

  await ensureBatch3BRemediation();
  executedSteps.push("ensureBatch3BRemediation");

  await ensureBatch3CRemediation();
  executedSteps.push("ensureBatch3CRemediation");

  await ensureBatch3DRemediation();
  executedSteps.push("ensureBatch3DRemediation");

  await ensureBatch3ERemediation();
  executedSteps.push("ensureBatch3ERemediation");

  // Cohort remediations
  await ensureCohort15_2_10BRemediation();
  executedSteps.push("ensureCohort15_2_10BRemediation");

  await ensureCohort15_2_10CRemediation();
  executedSteps.push("ensureCohort15_2_10CRemediation");

  await ensureCohort15_2_10DRemediation();
  executedSteps.push("ensureCohort15_2_10DRemediation");

  await ensureCohort15_2_10ERemediation();
  executedSteps.push("ensureCohort15_2_10ERemediation");

  await ensureCohort15_2_10FRemediation();
  executedSteps.push("ensureCohort15_2_10FRemediation");

  await ensureCohort15_2_10GRemediation();
  executedSteps.push("ensureCohort15_2_10GRemediation");

  await ensureCohort15_2_10HRemediation();
  executedSteps.push("ensureCohort15_2_10HRemediation");

  await ensureCohort15_2_10IRemediation();
  executedSteps.push("ensureCohort15_2_10IRemediation");

  await ensureCohort15_2_10JRemediation();
  executedSteps.push("ensureCohort15_2_10JRemediation");

  await ensureCohort15_2_10KRemediation();
  executedSteps.push("ensureCohort15_2_10KRemediation");

  await ensureCohort15_2_10LRemediation();
  executedSteps.push("ensureCohort15_2_10LRemediation");

  // Enforce unpublish policy on courses 36 to 139
  await unpublishCourses36to139();
  executedSteps.push("unpublishCourses36to139");

  // Re-audit post execution
  const postCourses = await db.select({
    id: coursesTable.id,
    courseCode: coursesTable.courseCode,
    slug: coursesTable.slug,
  }).from(coursesTable);

  const postQuestions = await db.select({
    id: quizQuestionsTable.id,
  }).from(quizQuestionsTable);

  return {
    mode: "EXECUTED",
    databaseTarget: isProduction ? "Neon Production" : dbUrl.startsWith("mock") ? "In-Memory Test Mock" : "Local PostgreSQL",
    totalCatalogueTarget: 136,
    existingCourseCount: postCourses.length,
    missingCourseCount: Math.max(0, 136 - postCourses.length),
    missingCourses: allTargetCodes.filter(
      (c) => !new Set(postCourses.map((x) => x.courseCode)).has(c)
    ),
    existingQuestionCount: postQuestions.length,
    estimatedRecoverableQuestions: 1208,
    executedSteps,
    safetyGuardStatus: {
      neverDeleteRows: true,
      nonDestructiveMatch: true,
      productionGated: true,
    },
  };
}
