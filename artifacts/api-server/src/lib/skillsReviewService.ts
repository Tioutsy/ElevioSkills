/**
 * Sustainability Skills Review Engine
 * Calculates the personal Sustainability Skills Review upon completing the 10 Free Foundational Challenges.
 */

import { db, enrollmentsTable, quizAttemptsTable, coursesTable, employeesTable, companiesTable, companySubscriptionsTable } from "@workspace/db";
import { eq, and, or, inArray, desc } from "drizzle-orm";
import {
  FREE_FOUNDATIONAL_CHALLENGES,
  FREE_CHALLENGE_COURSE_IDS,
  TOPIC_PAID_RECOMMENDATIONS,
  CAPSTONE_RECOMMENDATION,
  DETERMINISTIC_FALLBACK_RECOMMENDATION,
  type FreeChallengeDefinition,
} from "../config/freePathway";
import { CompanyAccess } from "./access";

export interface ChallengeCompletionRecord {
  courseId: number;
  courseCode: string;
  title: string;
  order: number;
  competencyArea: string;
  isCompleted: boolean;
  score: number | null; // percentage 0-100, or null if legacy completion without score record
  hasLegacyPartialEvidence: boolean;
  attemptId: number | null;
  completedAt: Date | null;
}

export interface SustainabilitySkillsReviewResult {
  isUnlocked: boolean;
  completedCount: number;
  totalRequired: number;
  progressPercentage: number;
  overallScore: number | null; // percentage 0-100, or null if 100% legacy
  performanceRating: "Exemplary" | "Proficient" | "Developing" | "Legacy Verified" | "Incomplete";
  performanceSummary: string;
  hasLegacyPartialEvidence: boolean;
  challengeRecords: ChallengeCompletionRecord[];
  remainingChallenges: {
    order: number;
    courseId: number;
    courseCode: string;
    title: string;
  }[];
  concreteStrength?: {
    topic: string;
    courseCode: string;
    courseTitle: string;
    headline: string;
    workplaceEvidence: string;
    achievableDecision: string;
  };
  skillToDevelop?: {
    topic: string;
    courseCode: string;
    courseTitle: string;
    headline: string;
    improvementArea: string;
    actionableNextStep: string;
  };
  recommendation?: {
    courseId: number;
    courseCode: string;
    title: string;
    reason: string;
    isPaid: boolean;
    previewAction: {
      type: "open_challenge" | "preview_paid" | "upgrade_company" | "request_access";
      targetHref: string;
      buttonLabel: string;
    };
  };
  userContext: {
    userId: string;
    role: string;
    companyId: number | null;
    companyName: string | null;
    isPaidCompany: boolean;
    canUpgradeCompany: boolean;
    adminContactEmail?: string | null;
  };
}

const STRENGTH_TEMPLATES: Record<string, { headline: string; evidence: string; decision: string }> = {
  "Foundational Sustainability Principles": {
    headline: "Systemic Sustainability Thinking",
    evidence: "You demonstrated clear understanding of how economic, environmental, and social priorities align in business.",
    decision: "You made sound workplace decisions connecting daily resource efficiency to organizational longevity."
  },
  "Workplace Waste Sorting & Contamination Control": {
    headline: "Rigorous Waste Segregation & Island Protection",
    evidence: "You correctly separated clean recyclables and strictly followed workplace bin labels rather than guessing.",
    decision: "Your sorting choices actively prevent contamination batches and divert non-degradable waste from Mare Chicose."
  },
  "Workplace Energy Efficiency & HVAC Management": {
    headline: "Proactive Energy Stewardship",
    evidence: "You mastered temperature regulation guidelines (24°C–25°C) and reliable end-of-day equipment shutdowns.",
    decision: "Your actions reduce peak kilowatt demand and lower office electricity costs."
  },
  "Freshwater Stewardship & Leak Detection": {
    headline: "Vigilant Island Water Stewardship",
    evidence: "You identified the freshwater vulnerabilities of Mauritius and the critical importance of immediate leak escalation.",
    decision: "You handled washroom amenities and leak-reporting scenarios with prompt facility communication."
  },
  "Green Office Administration & Daily Eco-Habits": {
    headline: "Digital & Resource Efficiency",
    evidence: "You prioritized paperless administrative workflows and proper workstation power-down routines.",
    decision: "Your daily office habits avoid unnecessary consumable waste and extend electronic hardware lifespan."
  },
  "Sustainable Sourcing & Single-Use Plastic Elimination": {
    headline: "Low-Impact Procurement Decisions",
    evidence: "You chose reusable catering alternatives and vetted local suppliers on recyclable packaging.",
    decision: "You eliminated single-use plastics from team ordering decisions and supported local sustainable vendors."
  },
  "Carbon Footprint Calculation & Commute Decarbonisation": {
    headline: "Emissions Awareness & Commuter Optimization",
    evidence: "You distinguished between Scope 1, 2, and 3 emissions and evaluated low-carbon transport alternatives.",
    decision: "You identified high-impact travel reductions, carpooling opportunities, and public transit adoption."
  },
  "Mauritian Biodiversity & Lagoon Protection": {
    headline: "Coastal Ecosystem & Flora Safeguarding",
    evidence: "You recognized the fragility of Mauritian coral lagoons and endemic wildlife habitats.",
    decision: "You prevented outdoor chemical runoff from entering storm drains and protected native vegetation."
  },
  "Circular Economy & Material Life-Cycle Extension": {
    headline: "Circular Resource Thinking",
    evidence: "You prioritized reuse, repair, and closed-loop material cycles over disposal.",
    decision: "You identified practical packaging return loops with certified local recycling partners."
  },
  "ESG Governance & Workplace Policy Application": {
    headline: "Corporate Governance & Ethical Responsibility",
    evidence: "You synthesized workplace actions with corporate ESG accountability and compliance standards.",
    decision: "You connected everyday frontline procedures to credible non-financial disclosures."
  }
};

const SKILL_DEVELOPMENT_TEMPLATES: Record<string, { headline: string; improvementArea: string; nextStep: string }> = {
  "Foundational Sustainability Principles": {
    headline: "Broadening Sustainability Impact Beyond Direct Tasks",
    improvementArea: "Connecting your personal role to company-wide sustainability goals and supplier relationships.",
    nextStep: "Review your department's annual environmental goals and identify one collaborative initiative."
  },
  "Workplace Waste Sorting & Contamination Control": {
    headline: "Handling Complex Packaging & Hazardous Waste Escalation",
    improvementArea: "Identifying composite packaging and specialized e-waste requiring designated disposal routes.",
    nextStep: "Inspect your team's common packaging waste and consult your facility's contracted collector guide."
  },
  "Workplace Energy Efficiency & HVAC Management": {
    headline: "Optimizing Off-Peak Loads & Equipment Power Profiles",
    improvementArea: "Deepening your understanding of baseline phantom energy consumption and central plant scheduling.",
    nextStep: "Conduct an end-of-week power sweep of shared workstations and report standby power drains."
  },
  "Freshwater Stewardship & Leak Detection": {
    headline: "Advanced Water Auditing & Fixture Maintenance",
    improvementArea: "Recognizing subtle flow anomalies and greywater recovery opportunities in commercial facilities.",
    nextStep: "Work with your facilities team to audit staff washroom flow aerators and monitor daily meter trends."
  },
  "Green Office Administration & Daily Eco-Habits": {
    headline: "Institutionalizing Paperless Process Governance",
    improvementArea: "Replacing remaining manual paper approval chains with automated digital signature workflows.",
    nextStep: "Map one recurring multi-copy paper process in your team and draft a digital transition proposal."
  },
  "Sustainable Sourcing & Single-Use Plastic Elimination": {
    headline: "Structured Supplier ESG Evaluation & Criteria",
    improvementArea: "Standardizing sustainability criteria in vendor requests for proposals and catering contracts.",
    nextStep: "Add a mandatory minimum recyclable packaging question to your next team supplier inquiry."
  },
  "Carbon Footprint Calculation & Commute Decarbonisation": {
    headline: "Scope 3 Value Chain & Commuter Data Gathering",
    improvementArea: "Calculating employee commute emissions accurately and planning corporate carpool logistics.",
    nextStep: "Log your weekly commute mileage and explore Metro Express or carpool routes with colleagues."
  },
  "Mauritian Biodiversity & Lagoon Protection": {
    headline: "Stormwater Runoff & Hazardous Chemical Management",
    improvementArea: "Controlling outdoor washing runoff and eliminating toxic detergents near coastal drains.",
    nextStep: "Verify that all outdoor cleaning solutions in your workplace use biodegradable, eco-certified formulas."
  },
  "Circular Economy & Material Life-Cycle Extension": {
    headline: "End-of-Life Asset Recovery & Supplier Take-Back",
    improvementArea: "Setting up contractual take-back clauses with equipment and pallet suppliers.",
    nextStep: "Identify the top 3 discarded items in your area and inquire if suppliers offer returnable packaging."
  },
  "ESG Governance & Workplace Policy Application": {
    headline: "Translating ESG Policies into Daily Standard Operating Procedures",
    improvementArea: "Embedding sustainability checkpoints into routine team handovers and performance metrics.",
    nextStep: "Incorporate a 2-minute sustainability safety check into your weekly team operational meeting."
  }
};

export async function calculateSustainabilitySkillsReview(
  access: CompanyAccess
): Promise<SustainabilitySkillsReviewResult> {
  const userId = access.userId;
  const employeeId = access.employee?.id ?? null;
  const companyId = access.companyId ?? null;

  // 1. Check company subscription status
  let isPaidCompany = false;
  let canUpgradeCompany = access.role === "company_admin" || access.role === "platform_admin";
  let adminContactEmail: string | null = null;

  if (companyId) {
    const [sub] = await db
      .select({ status: companySubscriptionsTable.status })
      .from(companySubscriptionsTable)
      .where(eq(companySubscriptionsTable.companyId, companyId))
      .limit(1);

    if (sub && sub.status === "ACTIVE") {
      isPaidCompany = true;
    }

    // Resolve company admin email for employee request access route
    if (!canUpgradeCompany) {
      const [adminEmp] = await db
        .select({ email: employeesTable.email, name: employeesTable.name })
        .from(employeesTable)
        .where(and(eq(employeesTable.companyId, companyId), eq(employeesTable.role, "admin")))
        .limit(1);

      if (adminEmp) {
        adminContactEmail = adminEmp.email;
      }
    }
  }

  // 2. Fetch all enrollments for this user/employee across the 10 free challenges
  const enrollmentClauses = [eq(enrollmentsTable.userId, userId)];
  if (employeeId) {
    enrollmentClauses.push(eq(enrollmentsTable.employeeId, employeeId));
  }
  if (access.email) {
    enrollmentClauses.push(eq(enrollmentsTable.userId, access.email));
  }

  const enrollments = await db
    .select()
    .from(enrollmentsTable)
    .where(
      and(
        inArray(enrollmentsTable.courseId, FREE_CHALLENGE_COURSE_IDS),
        or(...enrollmentClauses)
      )
    );

  const enrollmentMap = new Map<number, typeof enrollments[0]>();
  for (const e of enrollments) {
    enrollmentMap.set(e.courseId, e);
  }

  // 3. Fetch all quiz attempts for this user across the 10 free challenges
  const attemptClauses = [eq(quizAttemptsTable.userId, userId)];
  if (access.email) {
    attemptClauses.push(eq(quizAttemptsTable.userId, access.email));
  }

  const allAttempts = await db
    .select()
    .from(quizAttemptsTable)
    .where(
      and(
        inArray(quizAttemptsTable.courseId, FREE_CHALLENGE_COURSE_IDS),
        or(...attemptClauses)
      )
    )
    .orderBy(desc(quizAttemptsTable.score), desc(quizAttemptsTable.id));

  // Canonical attempt selection: Highest score per course, deterministic latest on tie
  const bestAttemptMap = new Map<number, typeof allAttempts[0]>();
  for (const att of allAttempts) {
    if (!bestAttemptMap.has(att.courseId)) {
      bestAttemptMap.set(att.courseId, att);
    }
  }

  // 4. Build records for all 10 free challenges
  const challengeRecords: ChallengeCompletionRecord[] = [];
  let completedCount = 0;
  let totalScoreSum = 0;
  let scoredCount = 0;
  let hasAnyLegacyPartialEvidence = false;

  for (const def of FREE_FOUNDATIONAL_CHALLENGES) {
    const enr = enrollmentMap.get(def.courseId);
    const bestAttempt = bestAttemptMap.get(def.courseId);

    const isEnrollmentCompleted = enr && (enr.status === "completed" || (enr.progressPct !== null && enr.progressPct >= 100));
    const isAttemptPassed = bestAttempt && bestAttempt.passed;
    const isCompleted = Boolean(isEnrollmentCompleted || isAttemptPassed);

    let score: number | null = null;
    let hasLegacyPartialEvidence = false;
    let attemptId: number | null = null;
    let completedAt: Date | null = null;

    if (bestAttempt) {
      score = bestAttempt.score;
      attemptId = bestAttempt.id;
      completedAt = bestAttempt.createdAt;
      totalScoreSum += bestAttempt.score;
      scoredCount++;
    } else if (isCompleted) {
      // Completed enrollment without quiz attempt row (legacy completion)
      hasLegacyPartialEvidence = true;
      hasAnyLegacyPartialEvidence = true;
      completedAt = enr?.completedAt ?? enr?.updatedAt ?? null;
    }

    if (isCompleted) {
      completedCount++;
    }

    challengeRecords.push({
      courseId: def.courseId,
      courseCode: def.courseCode,
      title: def.title,
      order: def.order,
      competencyArea: def.competencyArea,
      isCompleted,
      score,
      hasLegacyPartialEvidence,
      attemptId,
      completedAt,
    });
  }

  const totalRequired = FREE_FOUNDATIONAL_CHALLENGES.length; // Exactly 10
  const isUnlocked = completedCount >= totalRequired;
  const progressPercentage = Math.round((completedCount / totalRequired) * 100);

  const remainingChallenges = challengeRecords
    .filter((r) => !r.isCompleted)
    .map((r) => ({
      order: r.order,
      courseId: r.courseId,
      courseCode: r.courseCode,
      title: r.title,
    }));

  const userContext = {
    userId,
    role: access.role,
    companyId,
    companyName: access.companyName ?? null,
    isPaidCompany,
    canUpgradeCompany,
    adminContactEmail,
  };

  if (!isUnlocked) {
    return {
      isUnlocked: false,
      completedCount,
      totalRequired,
      progressPercentage,
      overallScore: null,
      performanceRating: "Incomplete",
      performanceSummary: `You have completed ${completedCount} of ${totalRequired} foundational challenges. Complete all 10 challenges to unlock your comprehensive personal Sustainability Skills Review.`,
      hasLegacyPartialEvidence: hasAnyLegacyPartialEvidence,
      challengeRecords,
      remainingChallenges,
      userContext,
    };
  }

  // Calculate Overall Performance Rating
  let overallScore: number | null = null;
  let performanceRating: "Exemplary" | "Proficient" | "Developing" | "Legacy Verified" = "Proficient";
  let performanceSummary = "";

  if (scoredCount > 0) {
    overallScore = Math.round(totalScoreSum / scoredCount);
    if (overallScore >= 90) {
      performanceRating = "Exemplary";
      performanceSummary = "Outstanding mastery across workplace sustainability practices in Mauritius. You consistently apply environmental stewardship, resource conservation, and compliant workplace procedures.";
    } else if (overallScore >= 75) {
      performanceRating = "Proficient";
      performanceSummary = "Solid, dependable practical sustainability skills. You demonstrate good judgment in waste separation, energy habits, and daily workplace resource efficiency.";
    } else {
      performanceRating = "Developing";
      performanceSummary = "Foundational understanding established. Continued practice in daily sorting and energy conservation will reinforce long-term workplace sustainability.";
    }
  } else {
    // 100% legacy records without score rows: honest acknowledgement without inventing fake percentages
    performanceRating = "Legacy Verified";
    performanceSummary = "All 10 foundational learning challenges verified as completed through historical training records.";
  }

  // Determine Concrete Strength & Skill to Develop
  // Filter records that have scores
  const scoredRecords = challengeRecords.filter((r) => r.score !== null);

  let concreteStrength: SustainabilitySkillsReviewResult["concreteStrength"] = undefined;
  let skillToDevelop: SustainabilitySkillsReviewResult["skillToDevelop"] = undefined;

  if (scoredRecords.length > 0) {
    // Sort by score descending to find highest
    const sortedDesc = [...scoredRecords].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    const bestRecord = sortedDesc[0];
    const template = STRENGTH_TEMPLATES[bestRecord.competencyArea] || STRENGTH_TEMPLATES["Foundational Sustainability Principles"];

    concreteStrength = {
      topic: bestRecord.competencyArea,
      courseCode: bestRecord.courseCode,
      courseTitle: bestRecord.title,
      headline: template.headline,
      workplaceEvidence: template.evidence,
      achievableDecision: template.decision,
    };

    // Sort by score ascending to find lowest
    const sortedAsc = [...scoredRecords].sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
    // Pick the lowest that is different from best if possible
    const lowestRecord = sortedAsc.find((r) => r.courseId !== bestRecord.courseId) || sortedAsc[0];
    const devTemplate = SKILL_DEVELOPMENT_TEMPLATES[lowestRecord.competencyArea] || SKILL_DEVELOPMENT_TEMPLATES["Foundational Sustainability Principles"];

    skillToDevelop = {
      topic: lowestRecord.competencyArea,
      courseCode: lowestRecord.courseCode,
      courseTitle: lowestRecord.title,
      headline: devTemplate.headline,
      improvementArea: devTemplate.improvementArea,
      actionableNextStep: devTemplate.nextStep,
    };
  } else {
    // Legacy fallback without fake numerical scores
    concreteStrength = {
      topic: "Core Workplace Habits",
      courseCode: "ELH-01",
      courseTitle: "Sustainability Foundations",
      headline: "Comprehensive Foundational Completion",
      workplaceEvidence: "Verified completion of all 10 core sustainability challenges in Mauritius.",
      achievableDecision: "Consistent engagement across essential environmental and workplace topics.",
    };
    skillToDevelop = {
      topic: "Cross-Functional Application",
      courseCode: "ELH-13",
      courseTitle: "Sustainability Action Planning",
      headline: "Team Action Planning & Measurement",
      improvementArea: "Moving from individual habits to departmental sustainability goals.",
      actionableNextStep: "Participate in or initiate workplace sustainability initiatives with your team.",
    };
  }

  // Determine Recommendation based on performance and topic mapping
  let recommendedCourseId = DETERMINISTIC_FALLBACK_RECOMMENDATION.courseId;
  let recommendedCourseCode = DETERMINISTIC_FALLBACK_RECOMMENDATION.courseCode;
  let recommendedTitle = DETERMINISTIC_FALLBACK_RECOMMENDATION.title;
  let recommendationReason = DETERMINISTIC_FALLBACK_RECOMMENDATION.reason;

  if (overallScore !== null && overallScore >= 88) {
    // High score: guide to advanced application / formal certification
    recommendedCourseId = CAPSTONE_RECOMMENDATION.courseId;
    recommendedCourseCode = CAPSTONE_RECOMMENDATION.courseCode;
    recommendedTitle = CAPSTONE_RECOMMENDATION.title;
    recommendationReason = CAPSTONE_RECOMMENDATION.reason;
  } else if (skillToDevelop) {
    // Match to the specific topic needing reinforcement
    const topicRule = TOPIC_PAID_RECOMMENDATIONS.find((r) => r.competencyArea === skillToDevelop?.topic);
    if (topicRule) {
      recommendedCourseId = topicRule.recommendedCourseId;
      recommendedCourseCode = topicRule.recommendedCourseCode;
      recommendedTitle = topicRule.recommendedTitle;
      recommendationReason = topicRule.reason;
    }
  }

  // Determine Preview Action based on role and company entitlement
  let previewAction: SustainabilitySkillsReviewResult["recommendation"]["previewAction"];

  if (isPaidCompany) {
    previewAction = {
      type: "open_challenge",
      targetHref: `/courses/${recommendedCourseId}`,
      buttonLabel: "Start Next Challenge",
    };
  } else if (canUpgradeCompany) {
    previewAction = {
      type: "upgrade_company",
      targetHref: "/company/subscribe",
      buttonLabel: "Upgrade Company Plan",
    };
  } else {
    previewAction = {
      type: "preview_paid",
      targetHref: `/courses/${recommendedCourseId}`,
      buttonLabel: "Preview Challenge",
    };
  }

  return {
    isUnlocked: true,
    completedCount,
    totalRequired,
    progressPercentage: 100,
    overallScore,
    performanceRating,
    performanceSummary,
    hasLegacyPartialEvidence: hasAnyLegacyPartialEvidence,
    challengeRecords,
    remainingChallenges: [],
    concreteStrength,
    skillToDevelop,
    recommendation: {
      courseId: recommendedCourseId,
      courseCode: recommendedCourseCode,
      title: recommendedTitle,
      reason: recommendationReason,
      isPaid: true,
      previewAction,
    },
    userContext,
  };
}
