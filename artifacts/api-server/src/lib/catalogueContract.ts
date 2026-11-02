import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  coursePrerequisitesTable
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";

export type CourseReadinessTier = 
  | "registered"
  | "seeded"
  | "assessment_ready"
  | "content_complete"
  | "learner_ready";

export interface CanonicalCourseContract {
  courseCode: string; // e.g. ELH-01
  slug: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced" | "Foundational" | "Intermediate" | "Departmental" | "Specialized" | "Capstone";
  category: string;
  expectedMinLessons: number;
  expectedMinQuizQuestions: number; // Standard is 10 (15 for capstone)
  requiresDecisionScenarios: boolean;
  requiresLocalContext: boolean;
  requiresInfographic?: boolean; // Only true when visual materially improves understanding
  intendedSubscriptionTier: "ESSENTIAL" | "PROFESSIONAL" | "COMPLETE";
  hasBadge: boolean;
  hasCertificate: boolean;
  version: number;
}

export interface CourseReadinessEvaluation {
  courseCode: string;
  slug: string;
  title: string;
  status: CourseReadinessTier;
  isRegistered: boolean;
  isSeeded: boolean;
  isAssessmentReady: boolean;
  isContentComplete: boolean;
  isLearnerReady: boolean;
  lessonsFound: number;
  quizQuestionsFound: number;
  missingRequirements: string[];
}

export interface ContractValidationIssue {
  courseCode: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  category: "MISSING_RUNTIME_COURSE" | "ORPHANED_QUESTION" | "DUPLICATE_IDENTIFIER" | "INSUFFICIENT_CONTENT" | "TOTALS_MISMATCH";
  message: string;
}

export interface ContractAuditSummary {
  totalContractCourses: number;
  runtimeCoursesFound: number;
  missingRuntimeCourses: string[];
  orphanedQuestionsFound: number;
  duplicateIdentifiersFound: string[];
  courseEvaluations: CourseReadinessEvaluation[];
  issues: ContractValidationIssue[];
  isFullyValid: boolean;
}

export const CANONICAL_CATALOGUE_CONTRACTS: CanonicalCourseContract[] = [
  // 1-12 Foundational & Core (ELH-01..12)
  { courseCode: "ELH-01", slug: "sustainability-foundations", title: "Sustainability Foundations", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-02", slug: "waste-sorting-mauritian-bin-system", title: "Waste Sorting & Resource Recovery", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, requiresInfographic: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-03", slug: "energy-efficiency-at-work", title: "Energy Efficiency at Work", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-04", slug: "water-conservation", title: "Water Conservation & Effluent Management", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-05", slug: "sustainable-procurement", title: "Sustainable Procurement Fundamentals", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-06", slug: "green-office-practices", title: "Green Office Practices & Operations", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-07", slug: "carbon-footprint-awareness", title: "Carbon Footprint Awareness & Reduction", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-08", slug: "biodiversity-in-mauritius", title: "Biodiversity & Ecosystem Conservation in Mauritius", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-09", slug: "esg-basics", title: "ESG Fundamentals for Business", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-10", slug: "environmental-compliance", title: "Mauritian Environmental Laws & Compliance", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-11", slug: "circular-economy", title: "Circular Economy Business Models", level: "Foundational", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-12", slug: "final-sustainability-certification", title: "Corporate Sustainability Champion Certification", level: "Capstone", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 15, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "ESSENTIAL", hasBadge: true, hasCertificate: true, version: 2 },

  // 13-23 Applied Workplace Action (ELH-13..23)
  { courseCode: "ELH-13", slug: "sustainability-action-planning", title: "Sustainability Action Planning", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-14", slug: "setting-departmental-sustainability-goals", title: "Setting Departmental Sustainability Goals", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-15", slug: "building-workplace-sustainability-team", title: "Building Workplace Sustainability Teams", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-16", slug: "communicating-sustainability-at-work", title: "Communicating Sustainability at Work", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-17", slug: "tracking-sustainability-actions-and-progress", title: "Tracking Sustainability Actions & Progress", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-18", slug: "sustainability-data-collection-and-evidence", title: "Sustainability Data Collection & Evidence", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-19", slug: "reviewing-sustainability-performance-and-taking-corrective-action", title: "Reviewing Sustainability Performance and Taking Corrective Action", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-20", slug: "sustainability-roles-responsibilities-and-accountability", title: "Sustainability Roles, Responsibilities & Accountability", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-21", slug: "building-employee-engagement-in-sustainability", title: "Building Employee Engagement in Sustainability", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-22", slug: "creating-and-running-effective-green-teams", title: "Creating and Running Effective Green Teams", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-23", slug: "planning-and-delivering-workplace-sustainability-initiatives", title: "Planning and Delivering Workplace Sustainability Initiatives", level: "Intermediate", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },

  // 24-29 Departmental & Functional (ELH-24..29)
  { courseCode: "ELH-24", slug: "sustainability-for-hr-teams", title: "Sustainability for HR & People Teams", level: "Departmental", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 8, requiresDecisionScenarios: false, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-25", slug: "sustainability-for-finance-teams", title: "Sustainability for Finance Teams", level: "Departmental", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 8, requiresDecisionScenarios: false, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-26", slug: "sustainability-for-procurement-and-purchasing-teams", title: "Sustainability for Procurement and Purchasing Teams", level: "Departmental", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 8, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-27", slug: "sustainability-for-facilities-and-property-teams", title: "Sustainability for Facilities and Property Teams", level: "Departmental", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 8, requiresDecisionScenarios: false, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-28", slug: "sustainability-for-sales-and-marketing-teams", title: "Sustainability for Sales and Marketing Teams", level: "Departmental", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 8, requiresDecisionScenarios: false, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-29", slug: "sustainability-for-operations-and-frontline-teams", title: "Sustainability for Operations and Frontline Teams", level: "Departmental", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 8, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },

  // 30-34 Specialized & Applied Leadership (ELH-30..34)
  { courseCode: "ELH-30", slug: "climate-risk-and-workplace-resilience", title: "Climate Risk & Workplace Resilience", level: "Specialized", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "PROFESSIONAL", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-31", slug: "social-responsibility-at-work", title: "Social Responsibility at Work", level: "Specialized", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "COMPLETE", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-32", slug: "ethics-governance-and-responsible-business", title: "Ethics, Governance and Responsible Business", level: "Specialized", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "COMPLETE", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-33", slug: "esg-data-measurement-and-reporting-basics", title: "ESG Data, Measurement and Reporting Basics", level: "Specialized", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "COMPLETE", hasBadge: true, hasCertificate: true, version: 2 },
  { courseCode: "ELH-34", slug: "esg-in-my-job-from-policy-to-everyday-action", title: "ESG in My Job: From Policy to Everyday Action", level: "Specialized", category: "Sustainability", expectedMinLessons: 3, expectedMinQuizQuestions: 10, requiresDecisionScenarios: true, requiresLocalContext: true, intendedSubscriptionTier: "COMPLETE", hasBadge: true, hasCertificate: true, version: 2 },
];

export async function auditCatalogueContracts(): Promise<ContractAuditSummary> {
  const issues: ContractValidationIssue[] = [];
  const courseEvaluations: CourseReadinessEvaluation[] = [];

  const allCourses = await db.select().from(coursesTable);
  const allLessons = await db.select().from(lessonsTable);
  const allQuizQuestions = await db.select().from(quizQuestionsTable);

  const foundCodes = new Set<string>();
  const foundSlugs = new Set<string>();
  const foundIds = new Set<number>();
  const duplicates: string[] = [];

  for (const c of allCourses) {
    const code = c.courseCode ?? null;
    if (code) {
      if (foundCodes.has(code)) {
        duplicates.push(`Duplicate courseCode '${code}'`);
        issues.push({ courseCode: code, severity: "CRITICAL", category: "DUPLICATE_IDENTIFIER", message: `Duplicate course code '${code}' in courses table.` });
      }
      foundCodes.add(code);
    }
    if (c.slug) {
      if (foundSlugs.has(c.slug)) {
        duplicates.push(`Duplicate slug '${c.slug}'`);
        issues.push({ courseCode: code || "UNKNOWN", severity: "CRITICAL", category: "DUPLICATE_IDENTIFIER", message: `Duplicate slug '${c.slug}' in courses table.` });
      }
      foundSlugs.add(c.slug);
    }
    if (c.id) {
      if (foundIds.has(c.id)) {
        duplicates.push(`Duplicate id '${c.id}'`);
        issues.push({ courseCode: code || "UNKNOWN", severity: "CRITICAL", category: "DUPLICATE_IDENTIFIER", message: `Duplicate course id '${c.id}' in courses table.` });
      }
      foundIds.add(c.id);
    }
  }

  const missingCourses: string[] = [];
  for (const contract of CANONICAL_CATALOGUE_CONTRACTS) {
    const missingReqs: string[] = [];
    const matched = allCourses.find((c: any) => c.courseCode === contract.courseCode || c.code === contract.courseCode);
    
    const isRegistered = true;
    const isSeeded = Boolean(matched);

    if (!matched) {
      missingCourses.push(contract.courseCode);
      issues.push({
        courseCode: contract.courseCode,
        severity: "CRITICAL",
        category: "MISSING_RUNTIME_COURSE",
        message: `Canonical contract course '${contract.courseCode}' (${contract.title}) does not exist in runtime database.`
      });

      courseEvaluations.push({
        courseCode: contract.courseCode,
        slug: contract.slug,
        title: contract.title,
        status: "registered",
        isRegistered: true,
        isSeeded: false,
        isAssessmentReady: false,
        isContentComplete: false,
        isLearnerReady: false,
        lessonsFound: 0,
        quizQuestionsFound: 0,
        missingRequirements: ["Not seeded in database"],
      });
      continue;
    }

    const courseLessons = allLessons.filter((l: any) => l.courseId === matched.id);
    const courseQuiz = allQuizQuestions.filter((q: any) => q.courseId === matched.id);

    const isAssessmentReady = courseQuiz.length >= contract.expectedMinQuizQuestions;
    if (!isAssessmentReady) {
      missingReqs.push(`Quiz questions (${courseQuiz.length}) below required standard (${contract.expectedMinQuizQuestions})`);
      issues.push({
        courseCode: contract.courseCode,
        severity: "HIGH",
        category: "INSUFFICIENT_CONTENT",
        message: `Course '${contract.courseCode}' has ${courseQuiz.length} quiz questions; expected at least ${contract.expectedMinQuizQuestions} for assessment readiness.`
      });
    }

    const isContentComplete = courseLessons.length >= contract.expectedMinLessons;
    if (!isContentComplete) {
      missingReqs.push(`Lessons (${courseLessons.length}) below minimum (${contract.expectedMinLessons})`);
      issues.push({
        courseCode: contract.courseCode,
        severity: "HIGH",
        category: "INSUFFICIENT_CONTENT",
        message: `Course '${contract.courseCode}' has ${courseLessons.length} lessons; expected at least ${contract.expectedMinLessons}.`
      });
    }

    const isLearnerReady = isSeeded && isAssessmentReady && isContentComplete;

    let derivedStatus: CourseReadinessTier = "registered";
    if (isLearnerReady) derivedStatus = "learner_ready";
    else if (isContentComplete && isAssessmentReady) derivedStatus = "content_complete";
    else if (isAssessmentReady) derivedStatus = "assessment_ready";
    else if (isSeeded) derivedStatus = "seeded";

    courseEvaluations.push({
      courseCode: contract.courseCode,
      slug: contract.slug,
      title: contract.title,
      status: derivedStatus,
      isRegistered,
      isSeeded,
      isAssessmentReady,
      isContentComplete,
      isLearnerReady,
      lessonsFound: courseLessons.length,
      quizQuestionsFound: courseQuiz.length,
      missingRequirements: missingReqs,
    });
  }

  // Check for orphaned questions
  let orphanedCount = 0;
  for (const q of allQuizQuestions) {
    const parentCourse = allCourses.find((c: any) => c.id === q.courseId);
    if (!parentCourse) {
      orphanedCount++;
      issues.push({
        courseCode: `ID_${q.courseId}`,
        severity: "CRITICAL",
        category: "ORPHANED_QUESTION",
        message: `Quiz question id '${q.id}' references non-existent courseId '${q.courseId}'.`
      });
    }
  }

  return {
    totalContractCourses: CANONICAL_CATALOGUE_CONTRACTS.length,
    runtimeCoursesFound: allCourses.length,
    missingRuntimeCourses: missingCourses,
    orphanedQuestionsFound: orphanedCount,
    duplicateIdentifiersFound: duplicates,
    courseEvaluations,
    issues,
    isFullyValid: issues.filter(i => i.severity === "CRITICAL").length === 0
  };
}
