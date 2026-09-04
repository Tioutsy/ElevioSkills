import { Course } from "@workspace/db";

export interface LearnerProfile {
  id?: number;
  sector?: string;          // e.g. "SEC_HOSPITALITY", "SEC_MANUFACTURING", "SEC_FINANCE"
  department?: string;      // e.g. "DEP_HOUSEKEEPING", "DEP_FINANCE", "DEP_FACILITIES"
  secondaryDepartment?: string; // Multi-role secondary dept
  jobFamily?: string;       // e.g. "JF_FRONTLINE", "JF_PROFESSIONAL", "JF_MANAGER", "JF_EXECUTIVE"
  secondaryJobFamily?: string;  // Multi-role secondary job family
  seniority?: string;       // e.g. "SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_EXECUTIVE"
  jobTitle?: string;
  completedCourseCodes?: string[];
  incompleteProfile?: boolean;
}

export interface CompanyLearningContext {
  companyId: number;
  strategicPriorityCompetencies?: string[]; // e.g. ["COMP_WATER", "COMP_ENERGY"]
  mandatoryCourseCodes?: string[];          // e.g. ["ELH-32"]
}

export interface AssignedCourse {
  courseCode: string;
  title: string;
  relevanceScore: number;
  tier: "REQUIRED" | "RECOMMENDED" | "OPTIONAL";
  assignmentReason: string;
  adminReasonDetails?: string;
  isEssentialUniversal: boolean;
  level: string;
  primaryClassification: string;
  primaryCompetency: string;
  estimatedMinutes: number;
  pedagogicalOrder: number;
  section: "CORE SUSTAINABILITY" | "YOUR SECTOR" | "YOUR ROLE" | "MANAGEMENT & LEADERSHIP" | "ADVANCED DEVELOPMENT";
  isNextBestCourse?: boolean;
}

export interface SectionProgress {
  section: AssignedCourse["section"];
  totalCourses: number;
  completedCourses: number;
  completionPercentage: number;
}

export interface GeneratedLearningJourney {
  learnerProfile: LearnerProfile;
  requiredCourses: AssignedCourse[];
  recommendedCourses: AssignedCourse[];
  optionalCourses: AssignedCourse[];
  totalRequiredCount: number;
  totalEstimatedMinutes: number;
  nextBestCourse: AssignedCourse | null;
  sectionProgress: SectionProgress[];
  isProfileIncomplete?: boolean;
  incompleteProfileWarning?: string;
}

export interface ScoredCandidate {
  course: Course;
  score: number;
  assignmentReason: string;
  adminReasonDetails: string;
  isEssentialUniversal: boolean;
  isMandatoryOverride: boolean;
  pedagogicalOrder: number;
  section: AssignedCourse["section"];
}

/**
 * Normalizes ambiguous real-world job titles into canonical taxonomy profiles.
 */
export function normalizeAmbiguousJobTitle(rawTitle: string, currentProfile: Partial<LearnerProfile> = {}): LearnerProfile {
  const title = (rawTitle || "").toLowerCase().trim();
  const normalized: LearnerProfile = { ...currentProfile, jobTitle: rawTitle };

  if (!normalized.jobFamily) {
    if (title.includes("partner") || title.includes("officer") || title.includes("associate") || title.includes("specialist") || title.includes("accountant")) {
      normalized.jobFamily = "JF_PROFESSIONAL";
    } else if (title.includes("team leader") || title.includes("supervisor") || title.includes("in-charge") || title.includes("foreman")) {
      normalized.jobFamily = "JF_SUPERVISOR";
    } else if (title.includes("manager") || title.includes("director") || title.includes("head of") || title.includes("lead")) {
      normalized.jobFamily = "JF_MANAGER";
    } else if (title.includes("executive") && (title.includes("chief") || title.includes("ceo") || title.includes("gm") || title.includes("general manager"))) {
      normalized.jobFamily = "JF_EXECUTIVE";
    } else if (title.includes("technician") || title.includes("engineer") || title.includes("mechanic")) {
      normalized.jobFamily = "JF_TECHNICAL";
    } else if (title.includes("operator") || title.includes("attendant") || title.includes("driver") || title.includes("picker") || title.includes("cashier")) {
      normalized.jobFamily = "JF_FRONTLINE";
    } else if (title.includes("executive")) {
      normalized.jobFamily = "JF_PROFESSIONAL";
    }
  }

  if (!normalized.seniority) {
    if (title.includes("chief") || title.includes("ceo") || title.includes("general manager") || title.includes("managing director")) {
      normalized.seniority = "SEN_EXECUTIVE";
    } else if (title.includes("manager") || title.includes("director") || title.includes("head of")) {
      normalized.seniority = "SEN_MANAGER";
    } else if (title.includes("supervisor") || title.includes("team leader") || title.includes("in-charge") || title.includes("assistant manager")) {
      normalized.seniority = "SEN_SUPERVISOR";
    } else {
      normalized.seniority = "SEN_INDIVIDUAL";
    }
  }

  if (!normalized.department) {
    if (title.includes("people") || title.includes("hr") || title.includes("talent")) {
      normalized.department = "DEP_HR";
    } else if (title.includes("guest") || title.includes("experience") || title.includes("reception")) {
      normalized.department = "DEP_FRONT_OFFICE";
    } else if (title.includes("operations") || title.includes("plant") || title.includes("production")) {
      normalized.department = "DEP_OPERATIONS";
    } else if (title.includes("support") || title.includes("admin")) {
      normalized.department = "DEP_ADMIN";
    } else if (title.includes("finance") || title.includes("account")) {
      normalized.department = "DEP_FINANCE";
    } else if (title.includes("procurement") || title.includes("buyer") || title.includes("sourcing")) {
      normalized.department = "DEP_PROCUREMENT";
    } else if (title.includes("facilities") || title.includes("maintenance") || title.includes("property")) {
      normalized.department = "DEP_FACILITIES";
    } else if (title.includes("sustainability") || title.includes("esg") || title.includes("environment")) {
      normalized.department = "DEP_SUSTAINABILITY";
    }
  }

  return normalized;
}

/**
 * Maps course classification and level to pedagogical sequence order.
 */
export function getPedagogicalWeight(course: Course): { order: number; section: AssignedCourse["section"] } {
  const code = course.courseCode || "";
  const primary = course.primaryClassification || "CROSS_SECTOR_CORE";
  const level = course.level || "Applied Workplace Practice";

  if (course.isEssentialUniversal) {
    const sequenceMap: Record<string, number> = {
      "ELH-01": 10,
      "ELH-02": 20,
      "ELH-03": 30,
      "ELH-04": 40,
      "ELH-34": 50,
    };
    return { order: sequenceMap[code] || 50, section: "CORE SUSTAINABILITY" };
  }

  if (primary === "CROSS_SECTOR_CORE") {
    return { order: 100 + (course.durationMinutes || 20), section: "CORE SUSTAINABILITY" };
  }

  if (primary === "SECTOR_SPECIFIC") {
    return { order: 200 + (course.durationMinutes || 20), section: "YOUR SECTOR" };
  }

  if (primary === "DEPARTMENT_SPECIFIC" || primary === "ROLE_SPECIALIST") {
    return { order: 300 + (course.durationMinutes || 20), section: "YOUR ROLE" };
  }

  if (primary === "MANAGEMENT_LEADERSHIP") {
    return { order: 400 + (course.durationMinutes || 25), section: "MANAGEMENT & LEADERSHIP" };
  }

  if (primary === "ADVANCED_ESG_PROFESSIONAL" || level === "Strategic" || level === "Specialist") {
    return { order: 500 + (course.durationMinutes || 30), section: "ADVANCED DEVELOPMENT" };
  }

  if (code === "ELH-12" || primary === "CAPSTONE_CERTIFICATION") {
    return { order: 999, section: "CORE SUSTAINABILITY" };
  }

  return { order: 250, section: "YOUR ROLE" };
}

/**
 * Deterministic Human-Friendly Relevance Scoring & Explainability Engine.
 */
export function calculateRelevance(
  learner: LearnerProfile,
  course: Course,
  company?: CompanyLearningContext
): {
  score: number;
  reason: string;
  adminReason: string;
  isEssentialUniversal: boolean;
  isMandatoryOverride: boolean;
} {
  const code = course.courseCode || "";
  let score = 0;
  const isEssentialUniversal = Boolean(course.isEssentialUniversal);

  // Incomplete profile safety check
  const hasProfile = Boolean(learner.sector && learner.department && learner.jobFamily && learner.seniority);

  // 1. Mandatory Company Override (+200 pts)
  const isMandatoryOverride = Boolean(
    company?.mandatoryCourseCodes && company.mandatoryCourseCodes.includes(code)
  );
  if (isMandatoryOverride) {
    return {
      score: 200,
      reason: "Required as designated mandatory training by your company.",
      adminReason: `Mandatory company override active for tenant ${company?.companyId || 1}.`,
      isEssentialUniversal,
      isMandatoryOverride: true,
    };
  }

  // 2. Incomplete Profile Handling: only assign universal core safely
  if (!hasProfile) {
    if (isEssentialUniversal) {
      return {
        score: 100,
        reason: "Required as foundational workplace sustainability training for all employees.",
        adminReason: "Incomplete profile: assigned via Essential Universal Core baseline.",
        isEssentialUniversal: true,
        isMandatoryOverride: false,
      };
    }
    return {
      score: 10,
      reason: "Available as an elective course once your employee profile is completed.",
      adminReason: "Incomplete profile: non-universal course deferred.",
      isEssentialUniversal: false,
      isMandatoryOverride: false,
    };
  }

  // Multi-factor evaluation for complete profiles
  const learnerReasons: string[] = [];
  const adminDetails: string[] = [];

  // Essential Universal Core
  if (isEssentialUniversal) {
    score += 100;
    learnerReasons.push("Required foundational sustainability training for all employees");
    adminDetails.push("Essential Universal Core (+100)");
  }

  // Sector Match (+35 pts)
  const sectors = course.applicableSectors || [];
  if (sectors.length > 0 && learner.sector && sectors.includes(learner.sector)) {
    score += 35;
    const sectorName = learner.sector.replace("SEC_", "").toLowerCase();
    learnerReasons.push(`Tailored for the ${sectorName} industry`);
    adminDetails.push(`Sector match: ${learner.sector} (+35)`);
  }

  // Primary Department Match (+45 pts)
  const departments = course.applicableDepartments || [];
  if (departments.length > 0 && learner.department && departments.includes(learner.department)) {
    score += 45;
    const deptName = learner.department.replace("DEP_", "").toLowerCase();
    learnerReasons.push(`Directly applies to your ${deptName} department`);
    adminDetails.push(`Dept match: ${learner.department} (+45)`);
  }

  // Secondary Department Match (+25 pts for multi-role cross-functional profiles)
  if (departments.length > 0 && learner.secondaryDepartment && departments.includes(learner.secondaryDepartment)) {
    score += 25;
    const secDeptName = learner.secondaryDepartment.replace("DEP_", "").toLowerCase();
    learnerReasons.push(`Supports your secondary responsibilities in ${secDeptName}`);
    adminDetails.push(`Secondary Dept match: ${learner.secondaryDepartment} (+25)`);
  }

  // Primary Role / Job Family Match (+45 pts)
  const jobFamilies = course.applicableJobFamilies || [];
  if (jobFamilies.length > 0 && learner.jobFamily && jobFamilies.includes(learner.jobFamily)) {
    score += 45;
    const roleName = learner.jobFamily.replace("JF_", "").toLowerCase();
    learnerReasons.push(`Designed for ${roleName} roles`);
    adminDetails.push(`Job Family match: ${learner.jobFamily} (+45)`);
  }

  // Secondary Role Match (+25 pts)
  if (jobFamilies.length > 0 && learner.secondaryJobFamily && jobFamilies.includes(learner.secondaryJobFamily)) {
    score += 25;
    adminDetails.push(`Secondary Job Family match: ${learner.secondaryJobFamily} (+25)`);
  }

  // Seniority Match (+30 pts)
  const seniorities = course.applicableSeniorityTiers || [];
  if (seniorities.length > 0 && learner.seniority && seniorities.includes(learner.seniority)) {
    score += 30;
    if (learner.seniority === "SEN_SUPERVISOR") {
      learnerReasons.push("Builds team supervision and operational oversight skills");
    } else if (learner.seniority === "SEN_MANAGER" || learner.seniority === "SEN_HEAD") {
      learnerReasons.push("Covers managerial KPI oversight and resource governance");
    } else if (learner.seniority === "SEN_EXECUTIVE") {
      learnerReasons.push("Addresses strategic enterprise governance and board oversight");
    }
    adminDetails.push(`Seniority match: ${learner.seniority} (+30)`);
  }

  // Management Leadership Alignment (+25 pts for managers/supervisors taking management courses)
  if (
    (learner.seniority === "SEN_MANAGER" || learner.seniority === "SEN_SUPERVISOR" || learner.seniority === "SEN_HEAD") &&
    course.primaryClassification === "MANAGEMENT_LEADERSHIP" &&
    (jobFamilies.length === 0 || (learner.jobFamily && jobFamilies.includes(learner.jobFamily)))
  ) {
    score += 25;
    adminDetails.push("Managerial Leadership Alignment (+25)");
  }

  // ESG Specialist Focus (+60 pts for sustainability department on ESG reporting/data)
  if (
    learner.department === "DEP_SUSTAINABILITY" &&
    (course.primaryClassification === "ADVANCED_ESG_PROFESSIONAL" ||
      code === "ELH-33" ||
      code === "ELH-18" ||
      code === "ELH-07" ||
      code === "ELH-11" ||
      code === "ELH-133")
  ) {
    score += 60;
    learnerReasons.push("Core ESG data and reporting competency");
    adminDetails.push("ESG Specialist Core Track (+60)");
  }

  // Company Priority Competency (+20 pts, bounded to avoid priority flooding)
  if (company?.strategicPriorityCompetencies && course.primaryCompetency) {
    if (company.strategicPriorityCompetencies.includes(course.primaryCompetency)) {
      score += 20;
      const compName = course.primaryCompetency.replace("COMP_", "").replace("_", " ").toLowerCase();
      learnerReasons.push(`Supports your company's strategic focus on ${compName}`);
      adminDetails.push(`Company priority match: ${course.primaryCompetency} (+20)`);
    }
  }

  // Role & Seniority Conflict Penalties
  if (
    learner.jobFamily === "JF_FRONTLINE" &&
    (course.primaryClassification === "MANAGEMENT_LEADERSHIP" ||
      course.primaryClassification === "ADVANCED_ESG_PROFESSIONAL" ||
      course.level === "Strategic")
  ) {
    score -= 60;
    adminDetails.push("Penalty: Frontline role conflict with strategic/management content (-60)");
  }

  if (
    learner.seniority === "SEN_EXECUTIVE" &&
    course.primaryClassification === "ROLE_SPECIALIST" &&
    !isEssentialUniversal
  ) {
    score -= 40;
    adminDetails.push("Penalty: Executive role conflict with frontline task content (-40)");
  }

  if (sectors.length > 0 && learner.sector && !sectors.includes(learner.sector)) {
    score -= 50;
    adminDetails.push(`Penalty: Sector mismatch (${learner.sector} not in ${sectors.join(",")}) (-50)`);
  }

  if (
    departments.length > 0 &&
    learner.department &&
    !departments.includes(learner.department) &&
    (!learner.secondaryDepartment || !departments.includes(learner.secondaryDepartment)) &&
    !isEssentialUniversal
  ) {
    score -= 35;
    adminDetails.push(`Penalty: Department mismatch (-35)`);
  }

  let humanReason = "";
  if (isEssentialUniversal) {
    humanReason = "Required as part of your core sustainability training.";
  } else if (learnerReasons.length > 0) {
    humanReason = learnerReasons.slice(0, 2).join(" and ") + ".";
  } else {
    humanReason = "Recommended as a cross-functional elective for professional development.";
  }

  return {
    score,
    reason: humanReason,
    adminReason: adminDetails.join("; "),
    isEssentialUniversal,
    isMandatoryOverride,
  };
}

/**
 * Calculates Section Progress Breakdown.
 */
export function calculateSectionProgress(
  assignedCourses: AssignedCourse[],
  completedCodes: Set<string>
): SectionProgress[] {
  const sections: AssignedCourse["section"][] = [
    "CORE SUSTAINABILITY",
    "YOUR SECTOR",
    "YOUR ROLE",
    "MANAGEMENT & LEADERSHIP",
    "ADVANCED DEVELOPMENT",
  ];

  return sections
    .map((sec) => {
      const coursesInSec = assignedCourses.filter((c) => c.section === sec);
      if (coursesInSec.length === 0) return null;
      const completed = coursesInSec.filter((c) => completedCodes.has(c.courseCode)).length;
      return {
        section: sec,
        totalCourses: coursesInSec.length,
        completedCourses: completed,
        completionPercentage: Math.round((completed / coursesInSec.length) * 100),
      };
    })
    .filter((s): s is SectionProgress => s !== null);
}

/**
 * Deterministic Next Best Course Recommendation Logic.
 */
export function getNextBestCourse(
  requiredCourses: AssignedCourse[],
  recommendedCourses: AssignedCourse[],
  completedCodes: Set<string>
): AssignedCourse | null {
  // 1. Next uncompleted course from Required path in strict pedagogical order
  for (const course of requiredCourses) {
    if (!completedCodes.has(course.courseCode)) {
      return { ...course, isNextBestCourse: true };
    }
  }

  // 2. If all required courses are completed, pick top recommended course
  for (const course of recommendedCourses) {
    if (!completedCodes.has(course.courseCode)) {
      return { ...course, isNextBestCourse: true };
    }
  }

  return null;
}

/**
 * Generates an intelligent, bounded learning journey with pedagogical ordering and section grouping.
 */
export function generateLearningJourney(
  learner: LearnerProfile,
  allCourses: Course[],
  company?: CompanyLearningContext
): GeneratedLearningJourney {
  const completedCodes = new Set(learner.completedCourseCodes || []);
  const scoredCandidates: ScoredCandidate[] = [];

  const hasProfile = Boolean(learner.sector && learner.department && learner.jobFamily && learner.seniority);

  for (const course of allCourses) {
    const code = course.courseCode || "";
    // Note: Scored candidates include all courses; completed status will be tracked for progress
    const { score, reason, adminReason, isEssentialUniversal, isMandatoryOverride } = calculateRelevance(
      learner,
      course,
      company
    );

    const { order, section } = getPedagogicalWeight(course);

    scoredCandidates.push({
      course,
      score,
      assignmentReason: reason,
      adminReasonDetails: adminReason,
      isEssentialUniversal,
      isMandatoryOverride,
      pedagogicalOrder: order,
      section,
    });
  }

  // Incomplete profile path
  if (!hasProfile) {
    const universalRequired: AssignedCourse[] = scoredCandidates
      .filter((c) => c.isEssentialUniversal)
      .sort((a, b) => a.pedagogicalOrder - b.pedagogicalOrder)
      .map((c) => ({
        courseCode: c.course.courseCode || "",
        title: c.course.title,
        relevanceScore: c.score,
        tier: "REQUIRED",
        assignmentReason: c.assignmentReason,
        adminReasonDetails: c.adminReasonDetails,
        isEssentialUniversal: true,
        level: c.course.level,
        primaryClassification: c.course.primaryClassification || "UNIVERSAL_CORE",
        primaryCompetency: c.course.primaryCompetency || "COMP_SUSTAINABILITY_FOUNDATIONS",
        estimatedMinutes: c.course.durationMinutes || 20,
        pedagogicalOrder: c.pedagogicalOrder,
        section: c.section,
      }));

    const nextCourse = getNextBestCourse(universalRequired, [], completedCodes);
    const progress = calculateSectionProgress(universalRequired, completedCodes);

    return {
      learnerProfile: learner,
      requiredCourses: universalRequired,
      recommendedCourses: [],
      optionalCourses: [],
      totalRequiredCount: universalRequired.length,
      totalEstimatedMinutes: universalRequired.reduce((sum, c) => sum + c.estimatedMinutes, 0),
      nextBestCourse: nextCourse,
      sectionProgress: progress,
      isProfileIncomplete: true,
      incompleteProfileWarning:
        "Your profile is incomplete (missing sector, department, or job title). Please complete your profile in Account Settings to unlock tailored role and sector learning paths.",
    };
  }

  // Path length caps by job family and seniority
  let maxRequired = 8;
  if (learner.jobFamily === "JF_FRONTLINE") maxRequired = 6;
  else if (learner.jobFamily === "JF_ADMIN") maxRequired = 7;
  else if (learner.jobFamily === "JF_SUPERVISOR") maxRequired = 9;
  else if (learner.jobFamily === "JF_MANAGER") maxRequired = 10;
  else if (learner.seniority === "SEN_EXECUTIVE") maxRequired = 8;
  else if (learner.department === "DEP_SUSTAINABILITY") maxRequired = 13;

  // Split candidates by score
  const requiredCandidates: ScoredCandidate[] = [];
  const recommendedCandidates: ScoredCandidate[] = [];
  const optionalCandidates: ScoredCandidate[] = [];

  // Sort initially by score descending to pick top candidates
  scoredCandidates.sort((a, b) => b.score - a.score);

  for (const c of scoredCandidates) {
    if (
      (c.isMandatoryOverride || c.isEssentialUniversal || c.score >= 80) &&
      requiredCandidates.length < maxRequired
    ) {
      requiredCandidates.push(c);
    } else if (c.score >= 50 && recommendedCandidates.length < 8) {
      recommendedCandidates.push(c);
    } else {
      optionalCandidates.push(c);
    }
  }

  // Add Capstone ELH-12 to Required if not already present
  const capstone = allCourses.find((c) => c.courseCode === "ELH-12");
  if (capstone) {
    const hasCap = requiredCandidates.some((c) => c.course.courseCode === "ELH-12");
    if (!hasCap) {
      requiredCandidates.push({
        course: capstone,
        score: 100,
        assignmentReason: "Final multi-domain sustainability certification capstone.",
        adminReasonDetails: "Mandatory curriculum capstone.",
        isEssentialUniversal: false,
        isMandatoryOverride: false,
        pedagogicalOrder: 999,
        section: "CORE SUSTAINABILITY",
      });
    }
  }

  // Pedagogical sequence sorting
  requiredCandidates.sort((a, b) => a.pedagogicalOrder - b.pedagogicalOrder);
  recommendedCandidates.sort((a, b) => a.pedagogicalOrder - b.pedagogicalOrder);
  optionalCandidates.sort((a, b) => a.pedagogicalOrder - b.pedagogicalOrder);

  const mapToAssigned = (candidates: ScoredCandidate[], tier: AssignedCourse["tier"]): AssignedCourse[] =>
    candidates.map((c) => ({
      courseCode: c.course.courseCode || "",
      title: c.course.title,
      relevanceScore: c.score,
      tier,
      assignmentReason: c.assignmentReason,
      adminReasonDetails: c.adminReasonDetails,
      isEssentialUniversal: c.isEssentialUniversal,
      level: c.course.level,
      primaryClassification: c.course.primaryClassification || "CROSS_SECTOR_CORE",
      primaryCompetency: c.course.primaryCompetency || "COMP_SUSTAINABILITY_FOUNDATIONS",
      estimatedMinutes: c.course.durationMinutes || 20,
      pedagogicalOrder: c.pedagogicalOrder,
      section: c.section,
    }));

  const requiredCourses = mapToAssigned(requiredCandidates, "REQUIRED");
  const recommendedCourses = mapToAssigned(recommendedCandidates, "RECOMMENDED");
  const optionalCourses = mapToAssigned(optionalCandidates, "OPTIONAL");

  const totalMinutes = requiredCourses.reduce((sum, c) => sum + c.estimatedMinutes, 0);
  const nextCourse = getNextBestCourse(requiredCourses, recommendedCourses, completedCodes);
  const progress = calculateSectionProgress(requiredCourses, completedCodes);

  return {
    learnerProfile: learner,
    requiredCourses,
    recommendedCourses,
    optionalCourses,
    totalRequiredCount: requiredCourses.length,
    totalEstimatedMinutes: totalMinutes,
    nextBestCourse: nextCourse,
    sectionProgress: progress,
    isProfileIncomplete: false,
  };
}

/**
 * Calculates Pairwise Path Differentiation Index (0.0 to 1.0).
 */
export function calculatePairwisePathDifferentiation(
  pathA: AssignedCourse[],
  pathB: AssignedCourse[]
): number {
  const setA = new Set(pathA.map((c) => c.courseCode));
  const setB = new Set(pathB.map((c) => c.courseCode));

  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  if (union.size === 0) return 0;
  const jaccardSimilarity = intersection.size / union.size;
  return Number((1 - jaccardSimilarity).toFixed(3));
}
