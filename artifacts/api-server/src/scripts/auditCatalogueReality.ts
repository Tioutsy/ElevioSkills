import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  coursePrerequisitesTable
} from "@workspace/db";
import { eq, inArray, and } from "drizzle-orm";
import { ensureCatalogueSkeletons } from "../lib/ensureCatalogueSkeletons";
import { ensureHybridSubscriptions } from "../lib/ensureHybridSubscriptions";
import { ensureFoundationsCourse } from "../lib/ensureFoundationsCourse";
import { ensureWasteSortingCourse } from "../lib/ensureWasteSortingCourse";
import { ensureEnergyEfficiencyCourse } from "../lib/ensureEnergyEfficiencyCourse";
import { ensureWaterConservationCourse } from "../lib/ensureWaterConservationCourse";
import { ensureSustainableProcurementCourse } from "../lib/ensureSustainableProcurementCourse";
import { ensureGreenOfficePracticesCourse } from "../lib/ensureGreenOfficePracticesCourse";
import { ensureCarbonFootprintCourse } from "../lib/ensureCarbonFootprintCourse";
import { ensureBiodiversityCourse } from "../lib/ensureBiodiversityCourse";
import { ensureEsgBasicsCourse } from "../lib/ensureEsgBasicsCourse";
import { ensureEnvironmentalComplianceCourse } from "../lib/ensureEnvironmentalComplianceCourse";
import { ensureCircularEconomyCourse } from "../lib/ensureCircularEconomyCourse";
import { ensureFinalSustainabilityCertificationCourse } from "../lib/ensureFinalSustainabilityCertificationCourse";
import { ensureActionPlanningCourse } from "../lib/ensureActionPlanningCourse";
import { ensureDepartmentalSustainabilityGoalsCourse } from "../lib/ensureDepartmentalSustainabilityGoalsCourse";
import { ensureWorkplaceSustainabilityTeamCourse } from "../lib/ensureWorkplaceSustainabilityTeamCourse";
import { ensureCommunicatingSustainabilityAtWorkCourse } from "../lib/ensureCommunicatingSustainabilityAtWorkCourse";
import { ensureTrackingSustainabilityActionsCourse } from "../lib/ensureTrackingSustainabilityActionsCourse";
import { ensureSustainabilityDataCollectionCourse } from "../lib/ensureSustainabilityDataCollectionCourse";
import { ensureSustainabilityPerformanceReviewCourse } from "../lib/ensureSustainabilityPerformanceReviewCourse";
import { ensureSustainabilityRolesAccountabilityCourse } from "../lib/ensureSustainabilityRolesAccountabilityCourse";
import { ensureEmployeeSustainabilityEngagementCourse } from "../lib/ensureEmployeeSustainabilityEngagementCourse";
import { ensureEffectiveGreenTeamsCourse } from "../lib/ensureEffectiveGreenTeamsCourse";
import { ensureWorkplaceSustainabilityInitiativesCourse } from "../lib/ensureWorkplaceSustainabilityInitiativesCourse";
import { ensureSustainabilityForFinanceTeamsCourse } from "../lib/ensureSustainabilityForFinanceTeamsCourse";
import { ensureSustainabilityForHrTeamsCourse } from "../lib/ensureSustainabilityForHrTeamsCourse";
import { ensureSustainabilityForProcurementAndPurchasingTeamsCourse } from "../lib/ensureSustainabilityForProcurementAndPurchasingTeamsCourse";
import { ensureSustainabilityForFacilitiesAndPropertyTeamsCourse } from "../lib/ensureSustainabilityForFacilitiesAndPropertyTeamsCourse";
import { ensureSustainabilityForSalesAndMarketingTeamsCourse } from "../lib/ensureSustainabilityForSalesAndMarketingTeamsCourse";
import { ensureSustainabilityForOperationsAndFrontlineTeamsCourse } from "../lib/ensureSustainabilityForOperationsAndFrontlineTeamsCourse";
import { ensureClimateRiskCourse } from "../lib/ensureClimateRiskCourse";
import { ensureSocialResponsibilityAtWorkCourse } from "../lib/ensureSocialResponsibilityAtWorkCourse";
import { ensureEthicsGovernanceCourse } from "../lib/ensureEthicsGovernanceCourse";
import { ensureEsgDataCourse } from "../lib/ensureEsgDataCourse";
import { ensureEsgInMyJobCourse } from "../lib/ensureEsgInMyJobCourse";
import * as fs from "fs";
import * as path from "path";

export interface CourseAuditEntry {
  code: string;
  id: number | null;
  slug: string | null;
  title: string | null;
  level: string | null;
  category: string | null;
  actualLessonCount: number;
  wordCount: number;
  estimatedMinutes: number;
  emptyOrPlaceholderModules: number;
  placeholderSummary: string;
  interactiveScenarioCount: number;
  quizQuestionCount: number;
  quizHasExplanations: boolean;
  quizAnswerDistribution: Record<string, number>;
  mauritianContextKeywords: string[];
  mauritianContextScore: "Rich" | "Moderate" | "Minimal" | "None";
  practicalActionFrameworks: string[];
  hasLearnerCommitment: boolean;
  completionMessage: string | null;
  badgeName: string | null;
  badgeSlug: string | null;
  includesCertificate: boolean;
  existingVisualAssets: string[];
  requiredInstructionalIllustrations: string[];
  readiness: "Complete" | "Partial" | "Skeleton" | "Missing";
  readinessRationale: string;
}

const MAURITIAN_KEYWORDS = [
  "mauritius", "mauritian", "ebène", "ebene", "port louis", "plaines wilhems",
  "grand baie", "pamplemousses", "ferney", "tamarin", "flic en flac", "bagatelle",
  "ceb", "cwa", "epa 2024", "epa", "solid waste management division",
  "beach authority", "ministry of environment", "mef", "mqa", "hrdc", "mur", "rs."
];

const PRACTICAL_FRAMEWORKS = [
  "check–record–report", "stop–check–control", "check–use–care–share–recover",
  "audit", "checklist", "sop", "protocol", "action plan", "register",
  "root-cause", "escalat", "spill kit", "sorting", "hierarchy"
];

export async function runFullCatalogueAudit(): Promise<CourseAuditEntry[]> {
  console.log("Seeding all course migrations and skeleton catalogs...");
  await ensureCatalogueSkeletons();
  await ensureHybridSubscriptions();

  // Run all course-specific seeders
  const seeders = [
    ensureFoundationsCourse,
    ensureWasteSortingCourse,
    ensureEnergyEfficiencyCourse,
    ensureWaterConservationCourse,
    ensureSustainableProcurementCourse,
    ensureGreenOfficePracticesCourse,
    ensureCarbonFootprintCourse,
    ensureBiodiversityCourse,
    ensureEsgBasicsCourse,
    ensureEnvironmentalComplianceCourse,
    ensureCircularEconomyCourse,
    ensureFinalSustainabilityCertificationCourse,
    ensureActionPlanningCourse,
    ensureDepartmentalSustainabilityGoalsCourse,
    ensureWorkplaceSustainabilityTeamCourse,
    ensureCommunicatingSustainabilityAtWorkCourse,
    ensureTrackingSustainabilityActionsCourse,
    ensureSustainabilityDataCollectionCourse,
    ensureSustainabilityPerformanceReviewCourse,
    ensureSustainabilityRolesAccountabilityCourse,
    ensureEmployeeSustainabilityEngagementCourse,
    ensureEffectiveGreenTeamsCourse,
    ensureWorkplaceSustainabilityInitiativesCourse,
    ensureSustainabilityForFinanceTeamsCourse,
    ensureSustainabilityForHrTeamsCourse,
    ensureSustainabilityForProcurementAndPurchasingTeamsCourse,
    ensureSustainabilityForFacilitiesAndPropertyTeamsCourse,
    ensureSustainabilityForSalesAndMarketingTeamsCourse,
    ensureSustainabilityForOperationsAndFrontlineTeamsCourse,
    ensureClimateRiskCourse,
    ensureSocialResponsibilityAtWorkCourse,
    ensureEthicsGovernanceCourse,
    ensureEsgDataCourse,
    ensureEsgInMyJobCourse,
  ];

  for (const seeder of seeders) {
    try {
      await seeder();
    } catch (e: any) {
      console.warn(`Seeder warning: ${e.message}`);
    }
  }

  const allCourses = await db.select().from(coursesTable);
  const allLessons = await db.select().from(lessonsTable);
  const allQuizQuestions = await db.select().from(quizQuestionsTable);
  const allBadges = await db.select().from(badgeDefinitionsTable);

  const results: CourseAuditEntry[] = [];

  for (let i = 1; i <= 136; i++) {
    const code = `ELH-${String(i).padStart(2, "0")}`;
    const course = allCourses.find((c: any) => c.courseCode === code || c.code === code || c.id === i);

    if (!course) {
      results.push({
        code,
        id: null,
        slug: null,
        title: null,
        level: null,
        category: null,
        actualLessonCount: 0,
        wordCount: 0,
        estimatedMinutes: 0,
        emptyOrPlaceholderModules: 0,
        placeholderSummary: "Course not seeded or stored in database",
        interactiveScenarioCount: 0,
        quizQuestionCount: 0,
        quizHasExplanations: false,
        quizAnswerDistribution: {},
        mauritianContextKeywords: [],
        mauritianContextScore: "None",
        practicalActionFrameworks: [],
        hasLearnerCommitment: false,
        completionMessage: null,
        badgeName: null,
        badgeSlug: null,
        includesCertificate: false,
        existingVisualAssets: [],
        requiredInstructionalIllustrations: ["Course identity illustration", "Lesson diagrams", "Quiz visual reference"],
        readiness: "Missing",
        readinessRationale: `Course ${code} is not defined in any migration, seed file or database table.`
      });
      continue;
    }

    const courseLessons = allLessons.filter((l: any) => l.courseId === course.id);
    const courseQuiz = allQuizQuestions.filter((q: any) => q.courseId === course.id);
    const courseBadge = allBadges.find((b: any) => b.id === (course as any).badgeId || b.code === course.courseCode || b.slug?.includes(course.slug));

    let totalWords = 0;
    let interactiveScenarios = 0;
    let placeholderLessons = 0;
    const foundMauritianKeywords = new Set<string>();
    const foundFrameworks = new Set<string>();
    let hasCommitment = false;

    // Analyze description
    const fullTextSearch = `${course.title || ""} ${course.description || ""} ${course.fullDescription || ""}`;
    const descWords = fullTextSearch.split(/\s+/).filter(Boolean).length;
    totalWords += descWords;

    // Scan for keywords in metadata
    for (const kw of MAURITIAN_KEYWORDS) {
      if (fullTextSearch.toLowerCase().includes(kw)) {
        foundMauritianKeywords.add(kw);
      }
    }
    for (const fw of PRACTICAL_FRAMEWORKS) {
      if (fullTextSearch.toLowerCase().includes(fw)) {
        foundFrameworks.add(fw);
      }
    }

    // Inspect lessons
    for (const lesson of courseLessons) {
      const lessonText = `${lesson.title || ""} ${lesson.content || ""}`;
      let blocksText = "";
      const blocks = Array.isArray(lesson.contentBlocks) ? lesson.contentBlocks : [];

      let hasDecisionBlock = false;
      let hasRealContent = false;

      for (const block of blocks) {
        if (block.type === "decision_scenario") {
          interactiveScenarios++;
          hasDecisionBlock = true;
          blocksText += ` ${block.decisionIntro || ""} ${block.decisionPrompt || ""}`;
          if (Array.isArray(block.decisionChoices)) {
            for (const ch of block.decisionChoices) {
              blocksText += ` ${ch.label || ""} ${ch.feedback || ""}`;
            }
          }
        } else if (block.type === "heading") {
          blocksText += ` ${block.headingText || ""}`;
        } else if (block.type === "short_text" || block.type === "text") {
          blocksText += ` ${block.bodyText || block.text || ""}`;
        } else if (block.type === "key_message") {
          blocksText += ` ${block.headingText || ""} ${block.bodyText || ""}`;
        } else if (block.type === "callout_quote") {
          blocksText += ` ${block.quoteText || ""} ${block.authorTitle || ""}`;
        } else if (block.type === "step_list") {
          blocksText += ` ${block.headingText || ""}`;
          if (Array.isArray(block.steps)) {
            blocksText += ` ${block.steps.join(" ")}`;
          }
        }
      }

      const combinedLessonStr = `${lessonText} ${blocksText}`;
      const lWords = combinedLessonStr.split(/\s+/).filter(Boolean).length;
      totalWords += lWords;

      // Check placeholder indicators
      if (
        combinedLessonStr.includes("Comprehensive learning module content for ELH-") ||
        combinedLessonStr.includes("Placeholder") ||
        (blocks.length <= 3 && lWords < 40 && !hasDecisionBlock) ||
        (lesson.title?.startsWith("Lesson ") && lWords < 30)
      ) {
        placeholderLessons++;
      } else {
        hasRealContent = true;
      }

      // Check keywords
      for (const kw of MAURITIAN_KEYWORDS) {
        if (combinedLessonStr.toLowerCase().includes(kw)) {
          foundMauritianKeywords.add(kw);
        }
      }
      for (const fw of PRACTICAL_FRAMEWORKS) {
        if (combinedLessonStr.toLowerCase().includes(fw)) {
          foundFrameworks.add(fw);
        }
      }

      if (combinedLessonStr.toLowerCase().includes("commitment") || combinedLessonStr.toLowerCase().includes("pledge")) {
        hasCommitment = true;
      }
    }

    // Inspect Quiz
    const distribution: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    let quizExplanationsCount = 0;

    for (const q of courseQuiz) {
      const qAny = q as any;
      const optIdx = q.correctOption !== undefined ? q.correctOption : qAny.correctAnswer;
      const letter = optIdx === 0 ? "A" : optIdx === 1 ? "B" : optIdx === 2 ? "C" : optIdx === 3 ? "D" : "Other";
      distribution[letter] = (distribution[letter] || 0) + 1;

      const explanation = qAny.explanation || q.correctExplanation || "";
      if (explanation && explanation.length > 10 && !explanation.startsWith("Explanation for question")) {
        quizExplanationsCount++;
      }

      const qText = `${q.question || ""} ${explanation}`;
      totalWords += qText.split(/\s+/).filter(Boolean).length;
      for (const kw of MAURITIAN_KEYWORDS) {
        if (qText.toLowerCase().includes(kw)) {
          foundMauritianKeywords.add(kw);
        }
      }
    }

    const quizHasGoodExplanations = courseQuiz.length > 0 && quizExplanationsCount >= Math.min(courseQuiz.length, 8);

    // Mauritian score
    let mauritianScore: "Rich" | "Moderate" | "Minimal" | "None" = "None";
    if (foundMauritianKeywords.size >= 4) mauritianScore = "Rich";
    else if (foundMauritianKeywords.size >= 2) mauritianScore = "Moderate";
    else if (foundMauritianKeywords.size >= 1) mauritianScore = "Minimal";

    // Visual assets
    const visualAssets: string[] = [];
    const courseAny = course as any;
    if (course.thumbnailUrl) visualAssets.push(course.thumbnailUrl);
    if (courseAny.coverImageUrl) visualAssets.push(courseAny.coverImageUrl);
    if (courseAny.badgeImageUrl) visualAssets.push(courseAny.badgeImageUrl);

    // Estimate minutes
    const readingMinutes = Math.ceil(totalWords / 130);
    const scenarioMinutes = interactiveScenarios * 2;
    const quizMinutes = Math.ceil(courseQuiz.length * 0.8);
    const estDuration = Math.max(course.durationMinutes || courseAny.estimatedMinutes || 15, readingMinutes + scenarioMinutes + quizMinutes);

    // Required illustrations
    const requiredIllustrations: string[] = [];
    if (!course.thumbnailUrl || course.thumbnailUrl.includes("placeholder")) {
      requiredIllustrations.push("Hero thumbnail visual");
    }
    if (interactiveScenarios > 0) {
      requiredIllustrations.push("Workplace scenario decision diagram");
    }
    if (foundFrameworks.size > 0) {
      requiredIllustrations.push("Operational procedure checklist / flow infographic");
    }
    if (mauritianScore === "Rich" || mauritianScore === "Moderate") {
      requiredIllustrations.push("Mauritian institutional & compliance reference guide");
    }

    // Determine readiness
    let readiness: "Complete" | "Partial" | "Skeleton" | "Missing" = "Skeleton";
    let readinessRationale = "";

    const isSkeleton = placeholderLessons > 0 || (courseLessons.length === 3 && totalWords < 300 && interactiveScenarios === 0);

    if (isSkeleton) {
      readiness = "Skeleton";
      readinessRationale = `Contains ${placeholderLessons} placeholder lesson(s) or low word count (${totalWords} words) with zero interactive decision blocks.`;
    } else if (
      courseLessons.length >= 3 &&
      totalWords >= 800 &&
      interactiveScenarios >= 2 &&
      courseQuiz.length >= 8 &&
      quizHasGoodExplanations &&
      (mauritianScore === "Rich" || mauritianScore === "Moderate")
    ) {
      readiness = "Complete";
      readinessRationale = `Full interactive curriculum: ${courseLessons.length} lessons, ${totalWords} words, ${interactiveScenarios} decision scenarios, ${courseQuiz.length} quiz questions with explanations, and ${mauritianScore} Mauritian context.`;
    } else {
      readiness = "Partial";
      const missingParts: string[] = [];
      if (totalWords < 800) missingParts.push(`low word count (${totalWords})`);
      if (interactiveScenarios < 2) missingParts.push(`few interactive scenarios (${interactiveScenarios})`);
      if (courseQuiz.length < 8) missingParts.push(`insufficient quiz questions (${courseQuiz.length})`);
      if (!quizHasGoodExplanations) missingParts.push("generic quiz explanations");
      if (mauritianScore === "Minimal" || mauritianScore === "None") missingParts.push("weak Mauritian localization");
      readinessRationale = `Partially learner-ready: requires remediation for ${missingParts.join(", ")}.`;
    }

    results.push({
      code,
      id: course.id,
      slug: course.slug,
      title: course.title,
      level: course.level || "Foundational",
      category: (course as any).category || String(course.categoryId) || "Sustainability",
      actualLessonCount: courseLessons.length,
      wordCount: totalWords,
      estimatedMinutes: estDuration,
      emptyOrPlaceholderModules: placeholderLessons,
      placeholderSummary: placeholderLessons > 0 ? `${placeholderLessons} lesson(s) require full instructional drafting` : "None",
      interactiveScenarioCount: interactiveScenarios,
      quizQuestionCount: courseQuiz.length,
      quizHasExplanations: quizHasGoodExplanations,
      quizAnswerDistribution: distribution,
      mauritianContextKeywords: Array.from(foundMauritianKeywords),
      mauritianContextScore: mauritianScore,
      practicalActionFrameworks: Array.from(foundFrameworks),
      hasLearnerCommitment: hasCommitment,
      completionMessage: course.completionMessage || "Congratulations on completing this course!",
      badgeName: course.badgeName || courseBadge?.name || null,
      badgeSlug: courseBadge?.slug || null,
      includesCertificate: Boolean(course.includesCertificate),
      existingVisualAssets: visualAssets,
      requiredInstructionalIllustrations: requiredIllustrations,
      readiness,
      readinessRationale
    });
  }

  return results;
}

async function main() {
  const audit = await runFullCatalogueAudit();

  const summary = {
    totalAudited: audit.length,
    completeCount: audit.filter(a => a.readiness === "Complete").length,
    partialCount: audit.filter(a => a.readiness === "Partial").length,
    skeletonCount: audit.filter(a => a.readiness === "Skeleton").length,
    missingCount: audit.filter(a => a.readiness === "Missing").length,
  };

  console.log("=== CATALOGUE AUDIT SUMMARY ===");
  console.log(JSON.stringify(summary, null, 2));

  const outputPath = path.resolve(process.cwd(), "catalogue_reality_audit.json");
  fs.writeFileSync(outputPath, JSON.stringify(audit, null, 2));
  console.log(`Saved detailed audit to ${outputPath}`);
}

if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes("auditCatalogueReality")) {
  main().catch(err => {
    console.error("Audit failed:", err);
    process.exit(1);
  });
}
