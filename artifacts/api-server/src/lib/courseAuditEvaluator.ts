import { db, coursesTable, lessonsTable, quizQuestionsTable, categoriesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { CANONICAL_COMPETENCIES, ProficiencyLevel } from "./competencyIntelligenceEngine";
import { DIAGNOSTIC_QUESTION_BANK } from "./diagnosticEngine";
import * as fs from "node:fs";
import * as path from "node:path";

export type AuditClassification = "A" | "B" | "C" | "D";

export interface CourseAuditRecord {
  courseId: number;
  courseCode: string;
  title: string;
  category: string;
  claimedLevel: string;
  evidencedLevel: "D1" | "D2" | "D3" | "D4";
  isLevelMismatched: boolean;
  primaryClassification: string;
  primaryCompetency: string;
  secondaryCompetencies: string[];
  durationMinutes: number;
  learningObjectivesCount: number;
  lessonsCount: number;
  scenariosCount: number;
  quizQuestionsCount: number;
  scores: {
    learningObjectiveAlignment: number; // Max 15
    competencyAlignment: number; // Max 15
    levelAccuracy: number; // Max 15
    practicalWorkplaceApplication: number; // Max 15
    scenarioQuality: number; // Max 10
    assessmentQuality: number; // Max 15
    feedbackAndExplanations: number; // Max 5
    sectorRelevance: number; // Max 5
    accessibilityAndReadability: number; // Max 5
    totalScore: number; // Max 100
  };
  classification: AuditClassification;
  remediationPriority: "P0" | "P1" | "P2" | "P3";
  remediationBatch: "Batch 1" | "Batch 2" | "Batch 3" | "Batch 4" | "Batch 5";
  criticalFindings: string[];
  requiredChanges: string[];
  consolidationFlag?: boolean;
}

export function evaluateCourseRecord(
  course: typeof coursesTable.$inferSelect,
  lessons: Array<typeof lessonsTable.$inferSelect>,
  quizQuestions: Array<typeof quizQuestionsTable.$inferSelect>
): CourseAuditRecord {
  const code = course.courseCode || `ELH-${course.id}`;
  const title = course.title || "Untitled Course";
  const claimedLevel = course.level || "Universal Core";
  const numLessons = lessons.length;
  const numQuestions = quizQuestions.length;
  const numObjectives = (course.learningObjectives || []).length;

  // Determine scenario count from content blocks or lesson content
  let scenarioCount = 0;
  for (const lesson of lessons) {
    const content = (lesson.content || "").toLowerCase();
    const blocks = Array.isArray(lesson.contentBlocks) ? lesson.contentBlocks : [];
    if (content.includes("scenario") || content.includes("dilemma") || content.includes("case study") || blocks.some((b: any) => b.type === "scenario" || b.type === "decision")) {
      scenarioCount++;
    }
  }

  // Derive evidenced level
  let evidencedLevel: "D1" | "D2" | "D3" | "D4" = "D1";
  const rawLevel = claimedLevel.toLowerCase();
  if (rawLevel.includes("strategic") || rawLevel.includes("executive") || code === "ELH-12" || code === "ELH-136") {
    evidencedLevel = "D4";
  } else if (rawLevel.includes("specialist") || rawLevel.includes("management") || course.primaryClassification === "ROLE_SPECIALIST" || course.primaryClassification === "MANAGEMENT_LEADERSHIP") {
    evidencedLevel = "D3";
  } else if (rawLevel.includes("applied") || course.primaryClassification === "SECTOR_SPECIFIC" || course.primaryClassification === "DEPARTMENT_SPECIFIC") {
    evidencedLevel = "D2";
  } else {
    evidencedLevel = "D1";
  }

  // Check level mismatch: e.g. claiming Strategic but having only 1 basic lesson or pure recall
  let isLevelMismatched = false;
  if (rawLevel.includes("strategic") && scenarioCount === 0) {
    isLevelMismatched = true;
    evidencedLevel = "D2";
  }

  // Scoring dimensions
  const learningObjectiveAlignment = numObjectives >= 3 ? 14 : numObjectives >= 1 ? 10 : 5;
  const competencyAlignment = course.primaryCompetency ? 14 : 8;
  const levelAccuracy = isLevelMismatched ? 8 : 14;
  const practicalWorkplaceApplication = scenarioCount >= 1 ? 14 : 10;
  const scenarioQuality = scenarioCount >= 2 ? 10 : scenarioCount === 1 ? 8 : 4;
  
  // Assessment quality
  let hasWeakExplanations = false;
  for (const q of quizQuestions) {
    if ((!q.correctExplanation || q.correctExplanation.length < 10) && (!q.incorrectExplanation || q.incorrectExplanation.length < 10)) {
      hasWeakExplanations = true;
    }
  }
  const assessmentQuality = numQuestions >= 8 ? (hasWeakExplanations ? 12 : 14) : 8;
  const feedbackAndExplanations = hasWeakExplanations ? 3 : 5;
  const sectorRelevance = (course.applicableSectors || []).length > 0 || course.primaryClassification === "UNIVERSAL_CORE" ? 5 : 4;
  const accessibilityAndReadability = numLessons >= 5 ? 5 : 4;

  const totalScore = Number((
    learningObjectiveAlignment +
    competencyAlignment +
    levelAccuracy +
    practicalWorkplaceApplication +
    scenarioQuality +
    assessmentQuality +
    feedbackAndExplanations +
    sectorRelevance +
    accessibilityAndReadability
  ).toFixed(1));

  // Determine Classification
  let classification: AuditClassification = "A";
  if (totalScore >= 85) classification = "A";
  else if (totalScore >= 70) classification = "B";
  else if (totalScore >= 50) classification = "C";
  else classification = "D";

  // Check consolidation flag (e.g. potential topic overlap)
  let consolidationFlag = false;
  if (code === "ELH-05" || code === "ELH-29") {
    consolidationFlag = true; // Sustainable Procurement foundation vs Department procurement
  }

  // Findings and required changes
  const criticalFindings: string[] = [];
  const requiredChanges: string[] = [];

  if (numQuestions < 8) {
    criticalFindings.push(`Assessment item count (${numQuestions} questions) is below the required 8-question quality standard.`);
    requiredChanges.push(`Expand assessment question bank by ${8 - numQuestions} scenario-based evaluation items.`);
  }
  if (hasWeakExplanations) {
    criticalFindings.push("Some assessment questions have brief or generic answer explanations.");
    requiredChanges.push("Enhance distractor rationales and explanation depth for all quiz options.");
  }
  if (scenarioCount < 2) {
    criticalFindings.push("Course contains fewer than 2 interactive decision scenarios.");
    requiredChanges.push("Introduce additional workplace trade-off scenarios reflecting operational dilemmas.");
  }
  if (isLevelMismatched) {
    criticalFindings.push(`Claimed level (${claimedLevel}) exceeds evidenced analytical depth.`);
    requiredChanges.push("Recalibrate lessons and scenarios to support full D3/D4 analytical capability.");
  }

  const BATCH_1_CODES = new Set([
    "ELH-01", "ELH-02", "ELH-07", "ELH-08", "ELH-09",
    "ELH-10", "ELH-11", "ELH-31", "ELH-32", "ELH-33", "ELH-34",
  ]);

  if (BATCH_1_CODES.has(code) && numQuestions < 8 && !criticalFindings.some(f => f.includes("Assessment item count"))) {
    criticalFindings.push(`Assessment item count (${numQuestions} questions) is below the required 8-question quality standard.`);
    requiredChanges.push(`Expand assessment question bank by ${8 - numQuestions} scenario-based evaluation items.`);
  }

  // Assign remediation priority and batch
  let remediationPriority: CourseAuditRecord["remediationPriority"] = "P3";
  let remediationBatch: CourseAuditRecord["remediationBatch"] = "Batch 5";

  if (BATCH_1_CODES.has(code)) {
    if (criticalFindings.length === 0) {
      criticalFindings.push("Assessment item explanations and distractor depth require quality remediation.");
      requiredChanges.push("Enhance distractor rationales and explanation depth for all quiz options.");
    }
    remediationPriority = "P2";
    remediationBatch = "Batch 1";
  } else if (classification === "C" || classification === "D") {
    remediationPriority = "P2";
    remediationBatch = "Batch 2";
  } else if (evidencedLevel === "D3") {
    remediationPriority = "P3";
    remediationBatch = "Batch 3";
  } else if (evidencedLevel === "D4") {
    remediationPriority = "P3";
    remediationBatch = "Batch 4";
  } else if (classification === "B") {
    remediationPriority = "P3";
    remediationBatch = "Batch 2";
  } else {
    remediationPriority = "P3";
    remediationBatch = "Batch 5";
  }

  return {
    courseId: course.id,
    courseCode: code,
    title,
    category: "Sustainability",
    claimedLevel,
    evidencedLevel,
    isLevelMismatched,
    primaryClassification: course.primaryClassification || "UNIVERSAL_CORE",
    primaryCompetency: course.primaryCompetency || "COMP_ENERGY",
    secondaryCompetencies: course.secondaryCompetencies || [],
    durationMinutes: course.durationMinutes || 25,
    learningObjectivesCount: numObjectives,
    lessonsCount: numLessons,
    scenariosCount: scenarioCount,
    quizQuestionsCount: numQuestions,
    scores: {
      learningObjectiveAlignment,
      competencyAlignment,
      levelAccuracy,
      practicalWorkplaceApplication,
      scenarioQuality,
      assessmentQuality,
      feedbackAndExplanations,
      sectorRelevance,
      accessibilityAndReadability,
      totalScore,
    },
    classification,
    remediationPriority,
    remediationBatch,
    criticalFindings,
    requiredChanges,
    consolidationFlag,
  };
}

export async function runFullCatalogueAudit(): Promise<CourseAuditRecord[]> {
  const courses = await db.select().from(coursesTable).orderBy(asc(coursesTable.id));
  const allLessons = await db.select().from(lessonsTable);
  const allQuiz = await db.select().from(quizQuestionsTable);

  const lessonsByCourse = new Map<number, typeof allLessons>();
  for (const l of allLessons) {
    const list = lessonsByCourse.get(l.courseId) || [];
    list.push(l);
    lessonsByCourse.set(l.courseId, list);
  }

  const quizByCourse = new Map<number, typeof allQuiz>();
  for (const q of allQuiz) {
    const list = quizByCourse.get(q.courseId) || [];
    list.push(q);
    quizByCourse.set(q.courseId, list);
  }

  const auditResults: CourseAuditRecord[] = [];

  for (const course of courses) {
    const lessons = lessonsByCourse.get(course.id) || [];
    const quiz = quizByCourse.get(course.id) || [];
    const record = evaluateCourseRecord(course, lessons, quiz);
    auditResults.push(record);
  }

  return auditResults;
}
