import { Course } from "@workspace/db";
import { LearnerProfile, CompanyLearningContext, AssignedCourse, ScoredCandidate, getPedagogicalWeight } from "./learningPathEngine";

export type ProficiencyLevel = 0 | 1 | 2 | 3 | 4;

export const PROFICIENCY_LABELS: Record<ProficiencyLevel, string> = {
  0: "Not Yet Evidenced",
  1: "Awareness",
  2: "Working Knowledge",
  3: "Applied",
  4: "Advanced",
};

export type ConfidenceLevel = "LOW" | "MODERATE" | "HIGH" | "NONE";

export type GapStatus = "STRONG" | "ON_TRACK" | "DEVELOPING" | "PRIORITY_GAP" | "INSUFFICIENT_EVIDENCE";

export type ReasonCode =
  | "ROLE_RELEVANCE"
  | "SECTOR_RELEVANCE"
  | "DEPARTMENT_RELEVANCE"
  | "COMPANY_PRIORITY"
  | "MANDATORY_ASSIGNMENT"
  | "COMPETENCY_GAP"
  | "PREREQUISITE"
  | "ASSESSMENT_EVIDENCE"
  | "CAREER_PROGRESSION";

export interface CompetencyEvidenceItem {
  courseCode: string;
  courseTitle: string;
  level: string;
  archetype: "FOUNDATION" | "APPLIED" | "SPECIALIST" | "STRATEGIC" | "CAPSTONE";
  assessmentScore?: number;
  evidenceType: "COURSE_COMPLETION" | "ASSESSMENT_SCORE" | "HISTORICAL_COMPLETION";
}

export interface CompetencyProficiencyRecord {
  competency: string;
  competencyName: string;
  currentProficiency: ProficiencyLevel;
  targetProficiency: ProficiencyLevel;
  confidence: ConfidenceLevel;
  gapStatus: GapStatus;
  gapSize: number;
  evidenceList: CompetencyEvidenceItem[];
  explanation: string;
  recommendedCourseCodes: string[];
}

export interface LearnerSkillsProfile {
  learnerId?: number;
  overallHealth: "DEVELOPING" | "ON_TRACK" | "STRONG";
  totalEvidencedCompetencies: number;
  priorityGapsCount: number;
  competencies: CompetencyProficiencyRecord[];
}

export interface TrainingNeedItem {
  competency: string;
  competencyName: string;
  confirmedGapCount: number;
  insufficientEvidenceCount: number;
  priorityLevel: "HIGH" | "MEDIUM" | "LOW";
  affectedDepartments: string[];
  rationale: string;
  recommendedCourses: Array<{ courseCode: string; title: string }>;
  suggestedAction: string;
}

export interface CompanySkillsIntelligence {
  companyId: number;
  totalActiveLearners: number;
  topCompetencies: Array<{ competency: string; name: string; averageLevel: number }>;
  topGaps: TrainingNeedItem[];
  departmentCoverage: Array<{
    department: string;
    totalLearners: number;
    averageProficiency: number;
    priorityGapCount: number;
    insufficientEvidenceCount: number;
  }>;
}

export const CANONICAL_COMPETENCIES: Record<string, string> = {
  COMP_ENERGY: "Energy Efficiency & Decarbonization",
  COMP_WATER: "Water Stewardship & Conservation",
  COMP_CIRCULARITY: "Circular Economy & Waste Elimination",
  COMP_GHG: "GHG Accounting & Carbon Management",
  COMP_BIODIVERSITY: "Biodiversity & Nature Protection",
  COMP_RISK: "Climate & Environmental Risk Management",
  COMP_GOVERNANCE: "ESG Governance, Ethics & Reporting",
  COMP_SOCIAL: "Social Responsibility & Workforce Engagement",
  COMP_PROCUREMENT: "Sustainable Supply Chain & Sourcing",
  COMP_HEALTH_SAFETY: "Workplace Health, Safety & Environment",
  COMP_STRATEGY: "Sustainability Strategy & Action Planning",
};

/**
 * Determines course archetype and maximum defensible proficiency cap.
 */
export function getCourseEvidenceMetadata(course: Course): {
  archetype: CompetencyEvidenceItem["archetype"];
  maxProficiencyContribution: ProficiencyLevel;
} {
  const level = (course.level || "").toLowerCase();
  const code = course.courseCode || "";

  if (level.includes("universal") || code === "ELH-01" || code === "ELH-02" || code === "ELH-03" || code === "ELH-04" || code === "ELH-34") {
    return { archetype: "FOUNDATION", maxProficiencyContribution: 1 };
  }
  if (level.includes("applied") || (course.primaryClassification === "SECTOR_SPECIFIC" && !level.includes("specialist"))) {
    return { archetype: "APPLIED", maxProficiencyContribution: 2 };
  }
  if (level.includes("specialist") || level.includes("management") || course.primaryClassification === "ROLE_SPECIALIST") {
    return { archetype: "SPECIALIST", maxProficiencyContribution: 3 };
  }
  if (level.includes("strategic") || code === "ELH-12" || level.includes("executive")) {
    return { archetype: "STRATEGIC", maxProficiencyContribution: 4 };
  }

  return { archetype: "APPLIED", maxProficiencyContribution: 2 };
}

/**
 * Calculates pure occupational target proficiency (0-4) based on role, department, and seniority.
 * Note: Company priorities do NOT artificially inflate occupational target proficiency; they affect recommendation weight and TNA urgency.
 */
export function calculateTargetProficiency(
  competency: string,
  profile: LearnerProfile
): ProficiencyLevel {
  let target: ProficiencyLevel = 1; // Baseline awareness

  // Departmental requirements
  if (
    (profile.department === "DEP_FACILITIES" || profile.department === "DEP_ENGINEERING") &&
    (competency === "COMP_ENERGY" || competency === "COMP_WATER" || competency === "COMP_HEALTH_SAFETY")
  ) {
    target = Math.max(target, 3) as ProficiencyLevel;
  } else if (
    profile.department === "DEP_PROCUREMENT" &&
    (competency === "COMP_PROCUREMENT" || competency === "COMP_CIRCULARITY")
  ) {
    target = Math.max(target, 3) as ProficiencyLevel;
  } else if (
    profile.department === "DEP_FINANCE" &&
    (competency === "COMP_GOVERNANCE" || competency === "COMP_GHG" || competency === "COMP_STRATEGY")
  ) {
    target = Math.max(target, 3) as ProficiencyLevel;
  } else if (profile.department === "DEP_SUSTAINABILITY") {
    target = 4; // Full mastery for sustainability team
  }

  // Seniority elevations
  if (profile.seniority === "SEN_MANAGER" || profile.seniority === "SEN_HEAD") {
    if (competency === "COMP_STRATEGY" || competency === "COMP_GOVERNANCE") {
      target = Math.max(target, 3) as ProficiencyLevel;
    }
  } else if (profile.seniority === "SEN_EXECUTIVE") {
    if (competency === "COMP_GOVERNANCE" || competency === "COMP_STRATEGY" || competency === "COMP_RISK") {
      target = 4;
    }
  }

  return target;
}

/**
 * Computes evidenced proficiency (0-4) and evidence confidence (LOW, MODERATE, HIGH, NONE).
 */
export function calculateEvidencedProficiency(
  competency: string,
  completedCodes: Set<string>,
  allCourses: Course[],
  assessmentScores?: Record<string, number>,
  isHistoricalOnly = false
): { level: ProficiencyLevel; confidence: ConfidenceLevel; evidence: CompetencyEvidenceItem[] } {
  const matchingCourses = allCourses.filter(
    (c) => c.primaryCompetency === competency && completedCodes.has(c.courseCode || "")
  );

  if (matchingCourses.length === 0) {
    return { level: 0, confidence: "NONE", evidence: [] };
  }

  const evidence: CompetencyEvidenceItem[] = matchingCourses.map((c) => {
    const code = c.courseCode || "";
    const score = assessmentScores ? assessmentScores[code] || 85 : 85;
    const { archetype } = getCourseEvidenceMetadata(c);
    return {
      courseCode: code,
      courseTitle: c.title,
      level: c.level,
      archetype,
      assessmentScore: score,
      evidenceType: isHistoricalOnly ? "HISTORICAL_COMPLETION" : "COURSE_COMPLETION",
    };
  });

  // Calculate highest defensible proficiency
  let maxLevel: ProficiencyLevel = 0;
  for (const c of matchingCourses) {
    const { maxProficiencyContribution } = getCourseEvidenceMetadata(c);
    maxLevel = Math.max(maxLevel, maxProficiencyContribution) as ProficiencyLevel;
  }

  // Calculate confidence
  let confidence: ConfidenceLevel = "LOW";
  if (isHistoricalOnly) {
    confidence = "LOW"; // Historical data without granular question telemetry
  } else if (evidence.length >= 2) {
    confidence = "HIGH";
  } else if (evidence.length === 1) {
    const single = evidence[0];
    if (single.archetype === "SPECIALIST" || single.archetype === "STRATEGIC") {
      confidence = "MODERATE";
    } else {
      confidence = "LOW";
    }
  }

  return { level: maxLevel, confidence, evidence };
}

/**
 * Evaluates the gap status and human-readable explanation considering confidence and company priority.
 */
export function evaluateCompetencyGap(
  competency: string,
  current: ProficiencyLevel,
  target: ProficiencyLevel,
  confidence: ConfidenceLevel,
  profile: LearnerProfile,
  company?: CompanyLearningContext
): { gapStatus: GapStatus; gapSize: number; explanation: string } {
  const gapSize = Math.max(0, target - current);
  const compName = CANONICAL_COMPETENCIES[competency] || competency;
  const isCompanyPriority = Boolean(company?.strategicPriorityCompetencies?.includes(competency));

  if (current === 0) {
    return {
      gapStatus: "INSUFFICIENT_EVIDENCE",
      gapSize: target,
      explanation: `No learning evidence recorded yet for ${compName}. Your role target is ${PROFICIENCY_LABELS[target]}${isCompanyPriority ? " (designated as a company strategic priority)" : ""}.`,
    };
  }

  if (current >= target) {
    if (confidence === "LOW") {
      return {
        gapStatus: "ON_TRACK",
        gapSize: 0,
        explanation: `Demonstrated ${PROFICIENCY_LABELS[current]} proficiency in ${compName}, but additional practical evidence is recommended to consolidate this capability.`,
      };
    }
    return {
      gapStatus: "STRONG",
      gapSize: 0,
      explanation: `You have successfully demonstrated ${PROFICIENCY_LABELS[current]} proficiency in ${compName} with ${confidence} evidence confidence, meeting your role requirement.`,
    };
  }

  if (gapSize === 1) {
    return {
      gapStatus: isCompanyPriority ? "PRIORITY_GAP" : "ON_TRACK",
      gapSize: 1,
      explanation: `You have demonstrated ${PROFICIENCY_LABELS[current]} in ${compName}. Complete the next recommended module to achieve ${PROFICIENCY_LABELS[target]}${isCompanyPriority ? " (High Company Priority)" : ""}.`,
    };
  }

  return {
    gapStatus: isCompanyPriority || target >= 3 ? "PRIORITY_GAP" : "DEVELOPING",
    gapSize,
    explanation: `Development needed: You are currently at ${PROFICIENCY_LABELS[current]} (${confidence} confidence), while your role target is ${PROFICIENCY_LABELS[target]}${isCompanyPriority ? " (Company Priority)" : ""}.`,
  };
}

/**
 * Builds the comprehensive Learner Skills Profile across all competencies.
 */
export function generateLearnerSkillsProfile(
  profile: LearnerProfile,
  allCourses: Course[],
  company?: CompanyLearningContext,
  assessmentScores?: Record<string, number>,
  isHistoricalOnly = false
): LearnerSkillsProfile {
  const completedCodes = new Set(profile.completedCourseCodes || []);
  const records: CompetencyProficiencyRecord[] = [];

  for (const [code, name] of Object.entries(CANONICAL_COMPETENCIES)) {
    const target = calculateTargetProficiency(code, profile);
    const { level: current, confidence, evidence } = calculateEvidencedProficiency(
      code,
      completedCodes,
      allCourses,
      assessmentScores,
      isHistoricalOnly
    );
    const { gapStatus, gapSize, explanation } = evaluateCompetencyGap(
      code,
      current,
      target,
      confidence,
      profile,
      company
    );

    const recommendedCourses = allCourses
      .filter((c) => c.primaryCompetency === code && !completedCodes.has(c.courseCode || ""))
      .map((c) => c.courseCode || "");

    records.push({
      competency: code,
      competencyName: name,
      currentProficiency: current,
      targetProficiency: target,
      confidence,
      gapStatus,
      gapSize,
      evidenceList: evidence,
      explanation,
      recommendedCourseCodes: recommendedCourses,
    });
  }

  const priorityGaps = records.filter((r) => r.gapStatus === "PRIORITY_GAP").length;
  const evidenced = records.filter((r) => r.currentProficiency > 0).length;

  let overallHealth: LearnerSkillsProfile["overallHealth"] = "DEVELOPING";
  if (priorityGaps === 0 && evidenced >= 5) overallHealth = "STRONG";
  else if (priorityGaps <= 2 && evidenced >= 3) overallHealth = "ON_TRACK";

  return {
    learnerId: profile.id,
    overallHealth,
    totalEvidencedCompetencies: evidenced,
    priorityGapsCount: priorityGaps,
    competencies: records,
  };
}

/**
 * Generates an Automated Training Needs Analysis (TNA) for an entire organization,
 * explicitly distinguishing Confirmed Gaps from Insufficient Evidence.
 */
export function generateCompanySkillsIntelligence(
  companyId: number,
  learnerProfiles: LearnerProfile[],
  allCourses: Course[],
  companyContext?: CompanyLearningContext
): CompanySkillsIntelligence {
  const totalLearners = learnerProfiles.length;
  const gapCounts: Record<string, { confirmed: number; insufficient: number; depts: Set<string> }> = {};
  const proficiencySums: Record<string, number> = {};

  for (const [code] of Object.entries(CANONICAL_COMPETENCIES)) {
    gapCounts[code] = { confirmed: 0, insufficient: 0, depts: new Set() };
    proficiencySums[code] = 0;
  }

  for (const learner of learnerProfiles) {
    const skills = generateLearnerSkillsProfile(learner, allCourses, companyContext);
    for (const comp of skills.competencies) {
      proficiencySums[comp.competency] += comp.currentProficiency;
      if (comp.gapStatus === "PRIORITY_GAP" || comp.gapStatus === "DEVELOPING") {
        gapCounts[comp.competency].confirmed++;
        if (learner.department) gapCounts[comp.competency].depts.add(learner.department);
      } else if (comp.gapStatus === "INSUFFICIENT_EVIDENCE") {
        gapCounts[comp.competency].insufficient++;
        if (learner.department) gapCounts[comp.competency].depts.add(learner.department);
      }
    }
  }

  const topGaps: TrainingNeedItem[] = Object.entries(gapCounts)
    .filter(([_, data]) => data.confirmed > 0 || data.insufficient > 0)
    .sort((a, b) => (b[1].confirmed * 2 + b[1].insufficient) - (a[1].confirmed * 2 + a[1].insufficient))
    .slice(0, 5)
    .map(([code, data]) => {
      const recCourses = allCourses
        .filter((c) => c.primaryCompetency === code)
        .slice(0, 3)
        .map((c) => ({ courseCode: c.courseCode || "", title: c.title }));

      const compName = CANONICAL_COMPETENCIES[code] || code;
      const deptList = Array.from(data.depts);
      const isCoPriority = Boolean(companyContext?.strategicPriorityCompetencies?.includes(code));

      return {
        competency: code,
        competencyName: compName,
        confirmedGapCount: data.confirmed,
        insufficientEvidenceCount: data.insufficient,
        priorityLevel: isCoPriority || data.confirmed >= totalLearners * 0.3 ? "HIGH" : "MEDIUM",
        affectedDepartments: deptList,
        rationale: `${data.confirmed} learners exhibit a confirmed development gap in ${compName}, while ${data.insufficient} learners currently have insufficient learning evidence for confident assessment.`,
        recommendedCourses: recCourses,
        suggestedAction: isCoPriority
          ? `High Company Priority: Assign ${recCourses[0]?.courseCode || "foundational course"} to teams in ${deptList[0] || "operations"}.`
          : `Recommend targeted modules to close development gaps across ${deptList[0] || "operations"}.`,
      };
    });

  const topCompetencies = Object.entries(proficiencySums)
    .map(([code, sum]) => ({
      competency: code,
      name: CANONICAL_COMPETENCIES[code] || code,
      averageLevel: totalLearners > 0 ? Number((sum / totalLearners).toFixed(2)) : 0,
    }))
    .sort((a, b) => b.averageLevel - a.averageLevel)
    .slice(0, 5);

  const deptMap: Record<string, { count: number; profSum: number; priorityGaps: number; insufficientCount: number }> = {};
  for (const learner of learnerProfiles) {
    const dept = learner.department || "General";
    if (!deptMap[dept]) deptMap[dept] = { count: 0, profSum: 0, priorityGaps: 0, insufficientCount: 0 };
    deptMap[dept].count++;

    const skills = generateLearnerSkillsProfile(learner, allCourses, companyContext);
    deptMap[dept].priorityGaps += skills.priorityGapsCount;
    deptMap[dept].insufficientCount += skills.competencies.filter((c) => c.gapStatus === "INSUFFICIENT_EVIDENCE").length;
    const avgProf = skills.competencies.reduce((acc, c) => acc + c.currentProficiency, 0) / skills.competencies.length;
    deptMap[dept].profSum += avgProf;
  }

  const departmentCoverage = Object.entries(deptMap).map(([dept, d]) => ({
    department: dept,
    totalLearners: d.count,
    averageProficiency: Number((d.profSum / d.count).toFixed(2)),
    priorityGapCount: d.priorityGaps,
    insufficientEvidenceCount: d.insufficientCount,
  }));

  return {
    companyId,
    totalActiveLearners: totalLearners,
    topCompetencies,
    topGaps,
    departmentCoverage,
  };
}

/**
 * Competency-Aware Next Best Course Recommender (Next Best Course 2.0).
 * Prevents redundant overtraining when proficiency is already met with HIGH confidence.
 */
export function getAdaptiveNextBestCourse(
  requiredCourses: AssignedCourse[],
  recommendedCourses: AssignedCourse[],
  profile: LearnerProfile,
  allCourses: Course[],
  company?: CompanyLearningContext
): { course: AssignedCourse; reasonCode: ReasonCode; structuredExplanation: string } | null {
  const completedCodes = new Set(profile.completedCourseCodes || []);

  // 1. Incomplete Required Courses in strict sequence
  for (const req of requiredCourses) {
    if (!completedCodes.has(req.courseCode)) {
      const reasonCode: ReasonCode = req.isEssentialUniversal ? "MANDATORY_ASSIGNMENT" : "ROLE_RELEVANCE";
      return {
        course: { ...req, isNextBestCourse: true },
        reasonCode,
        structuredExplanation: req.assignmentReason,
      };
    }
  }

  // 2. Adaptive Priority Competency Gap Targeting (checks confidence and avoid overtraining)
  const skills = generateLearnerSkillsProfile(profile, allCourses, company);
  const priorityGap = skills.competencies.find(
    (c) => (c.gapStatus === "PRIORITY_GAP" || (c.gapStatus === "ON_TRACK" && c.confidence === "LOW")) &&
           c.recommendedCourseCodes.length > 0
  );

  if (priorityGap && priorityGap.recommendedCourseCodes.length > 0) {
    const targetCode = priorityGap.recommendedCourseCodes[0];
    const candidateCourse = allCourses.find((c) => c.courseCode === targetCode);
    if (candidateCourse) {
      const { order, section } = getPedagogicalWeight(candidateCourse);
      return {
        course: {
          courseCode: candidateCourse.courseCode || "",
          title: candidateCourse.title,
          relevanceScore: 90,
          tier: "RECOMMENDED",
          assignmentReason: `Targeted to close your capability gap in ${priorityGap.competencyName}.`,
          isEssentialUniversal: false,
          level: candidateCourse.level,
          primaryClassification: candidateCourse.primaryClassification || "ROLE_SPECIALIST",
          primaryCompetency: candidateCourse.primaryCompetency || priorityGap.competency,
          estimatedMinutes: candidateCourse.durationMinutes || 25,
          pedagogicalOrder: order,
          section,
          isNextBestCourse: true,
        },
        reasonCode: "COMPETENCY_GAP",
        structuredExplanation: `Targets your priority gap in ${priorityGap.competencyName}, advancing your evidenced capability to ${PROFICIENCY_LABELS[priorityGap.targetProficiency]}.`,
      };
    }
  }

  // 3. Fallback to top uncompleted recommended course
  for (const rec of recommendedCourses) {
    if (!completedCodes.has(rec.courseCode)) {
      return {
        course: { ...rec, isNextBestCourse: true },
        reasonCode: "ROLE_RELEVANCE",
        structuredExplanation: rec.assignmentReason,
      };
    }
  }

  return null;
}
