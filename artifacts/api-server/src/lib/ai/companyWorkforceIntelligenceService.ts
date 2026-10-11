import { CompanyAccess } from "../access";
import { KNOWLEDGE_TAXONOMY, KnowledgeDomain, mapCourseToTopics, mapCompanyPriorityToTopics } from "./skillsTaxonomy";
import { EmployeeSkillsProfile } from "./skillsGapProvider";

export interface DepartmentSummary {
  department: string;
  learnerCount: number;
  activeLearnersCount: number;
  learnersWithEvidenceCount: number;
  evidenceCoverage: number; // 0.0 to 1.0
  hasSufficientSample: boolean; // learnersWithEvidenceCount >= 2
  sampleStatus: "evaluated" | "insufficient_sample";
  topStrengths: string[];
  topGaps: string[];
  priorityTopics: string[];
}

export interface RecommendedCompanyAction {
  who: string;
  courseId: number;
  courseCode: string;
  title: string;
  why: string;
  priority: "high" | "medium" | "optional";
  expectedLearningOutcome: string;
}

export interface CompanyWorkforceIntelligence {
  companyId: number;
  companyName: string;
  industry: string;
  generatedAt: string;
  providerTag: "gemini" | "fallback";
  isFallback: boolean;

  // Overview Metrics
  totalEmployees: number;
  activeLearnersCount: number;
  learnersWithEvidenceCount: number;
  learningParticipationRate: number; // 0.0 to 1.0
  evidenceCoverageRate: number; // 0.0 to 1.0

  hasSufficientEvidence: boolean; // learnersWithEvidenceCount >= 3
  insufficientEvidenceMessage?: string;

  // Domain & Topic Aggregations
  domainDistribution: {
    environmental: { strengthCount: number; gapCount: number; criticalGapCount: number };
    social: { strengthCount: number; gapCount: number; criticalGapCount: number };
    governance: { strengthCount: number; gapCount: number; criticalGapCount: number };
  };

  topCompanyStrengths: Array<{
    topicId: string;
    topicLabel: string;
    domain: KnowledgeDomain;
    strengthCount: number;
    percentageOfEvidenceLearners: number;
  }>;

  topCompanyGaps: Array<{
    topicId: string;
    topicLabel: string;
    domain: KnowledgeDomain;
    severity: "critical" | "moderate" | "low";
    gapCount: number;
    criticalCount: number;
    percentageOfEvidenceLearners: number;
  }>;

  companyPriorityCoverage: Array<{
    priority: string;
    topicId: string;
    topicLabel: string;
    status: "covered" | "partially_covered" | "unaddressed";
    evidenceCount: number;
  }>;

  // Department Level Intelligence
  departmentSummaries: DepartmentSummary[];
  departmentBreakdown?: DepartmentSummary[];
  companyPriorities?: Array<{
    priority: string;
    topicId: string;
    topicLabel: string;
    status: "covered" | "partially_covered" | "unaddressed";
    evidenceCount: number;
  }>;
  overallCoverage?: number;
  companyTopGaps?: string[];
  companyTopStrengths?: string[];

  // Recommended Company Actions
  recommendedActions: RecommendedCompanyAction[];

  // AI Narrative Summary
  executiveSummary: string;
  aiCompanyStrengths: Array<{ topic: string; reason: string }>;
  aiPriorityGaps: Array<{ topic: string; severity: string; evidence: string }>;
  aiDepartmentInsights: Array<{ department: string; summary: string; priority: "high" | "medium" | "low" }>;

  disclaimer: string;
}

export interface EmployeeProfileInput {
  employee: {
    id: number;
    name: string;
    email: string;
    department?: string | null;
  };
  profile: EmployeeSkillsProfile;
}

export async function aggregateCompanyWorkforceIntelligence(
  companyInfo: { id: number; name: string; industry: string; trainingPriorities: string[] },
  employeeProfiles: EmployeeProfileInput[],
  publishedCourses: Array<{ id: number; courseCode: string; title: string; description?: string; level?: string }>
): Promise<CompanyWorkforceIntelligence> {
  const companyId = companyInfo.id;
  const companyName = companyInfo.name || "Organisation";
  const industry = companyInfo.industry || "Sustainability & Services";
  const priorities = companyInfo.trainingPriorities || [];

  const totalEmployees = employeeProfiles.length;

  if (totalEmployees === 0) {
    return buildInsufficientEvidenceResponse(companyId, companyName, industry, 0, 0, 0);
  }

  // Calculate evidence counters
  const activeLearners = employeeProfiles.filter(
    (ep) => ep.profile.completedLearning.length > 0 || ep.profile.demonstratedStrengths.length > 0 || ep.profile.inferredKnowledgeGaps.length > 0
  );
  const evidenceLearners = employeeProfiles.filter((ep) => ep.profile.hasSufficientEvidence);

  const activeLearnersCount = activeLearners.length;
  const learnersWithEvidenceCount = evidenceLearners.length;
  const learningParticipationRate = totalEmployees > 0 ? Number((activeLearnersCount / totalEmployees).toFixed(2)) : 0;
  const evidenceCoverageRate = totalEmployees > 0 ? Number((learnersWithEvidenceCount / totalEmployees).toFixed(2)) : 0;

  // Minimum sample protection: At least 3 learners with evidence required for full company-level AI analysis
  const hasSufficientEvidence = learnersWithEvidenceCount >= 3;

  if (!hasSufficientEvidence) {
    return buildInsufficientEvidenceResponse(
      companyId,
      companyName,
      industry,
      totalEmployees,
      activeLearnersCount,
      learnersWithEvidenceCount
    );
  }

  // Domain & Topic Distribution
  const domainDistribution = {
    environmental: { strengthCount: 0, gapCount: 0, criticalGapCount: 0 },
    social: { strengthCount: 0, gapCount: 0, criticalGapCount: 0 },
    governance: { strengthCount: 0, gapCount: 0, criticalGapCount: 0 },
  };

  const topicStrengthMap = new Map<string, { topicId: string; topicLabel: string; domain: KnowledgeDomain; count: number }>();
  const topicGapMap = new Map<string, { topicId: string; topicLabel: string; domain: KnowledgeDomain; gapCount: number; criticalCount: number }>();

  for (const { profile } of evidenceLearners) {
    // Strengths
    for (const str of profile.demonstratedStrengths) {
      const dom = (str.domain as KnowledgeDomain) || "environmental";
      if (domainDistribution[dom]) {
        domainDistribution[dom].strengthCount += 1;
      }

      const existing = topicStrengthMap.get(str.topicId) || {
        topicId: str.topicId,
        topicLabel: str.topicLabel,
        domain: dom,
        count: 0,
      };
      existing.count += 1;
      topicStrengthMap.set(str.topicId, existing);
    }

    // Gaps
    for (const gap of profile.inferredKnowledgeGaps) {
      const dom = (gap.domain as KnowledgeDomain) || "environmental";
      if (domainDistribution[dom]) {
        domainDistribution[dom].gapCount += 1;
        if (gap.severity === "critical") {
          domainDistribution[dom].criticalGapCount += 1;
        }
      }

      const existing = topicGapMap.get(gap.topicId) || {
        topicId: gap.topicId,
        topicLabel: gap.topicLabel,
        domain: dom,
        gapCount: 0,
        criticalCount: 0,
      };
      existing.gapCount += 1;
      if (gap.severity === "critical") {
        existing.criticalCount += 1;
      }
      topicGapMap.set(gap.topicId, existing);
    }
  }

  const topCompanyStrengths = Array.from(topicStrengthMap.values())
    .map((s) => ({
      topicId: s.topicId,
      topicLabel: s.topicLabel,
      domain: s.domain,
      strengthCount: s.count,
      percentageOfEvidenceLearners: Number(((s.count / learnersWithEvidenceCount) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.strengthCount - a.strengthCount)
    .slice(0, 5);

  const topCompanyGaps = Array.from(topicGapMap.values())
    .map((g) => ({
      topicId: g.topicId,
      topicLabel: g.topicLabel,
      domain: g.domain,
      severity: (g.criticalCount > 0 ? "critical" : "moderate") as "critical" | "moderate" | "low",
      gapCount: g.gapCount,
      criticalCount: g.criticalCount,
      percentageOfEvidenceLearners: Number(((g.gapCount / learnersWithEvidenceCount) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.criticalCount - a.criticalCount || b.gapCount - a.gapCount)
    .slice(0, 5);

  // Company Priorities Coverage
  const companyPriorityCoverage = priorities.map((p) => {
    const matchedTopics = mapCompanyPriorityToTopics(p);
    const primaryTopic = matchedTopics[0];
    const evidenceCount = topicStrengthMap.get(primaryTopic?.id || "")?.count || 0;
    const gapCount = topicGapMap.get(primaryTopic?.id || "")?.gapCount || 0;

    let status: "covered" | "partially_covered" | "unaddressed" = "unaddressed";
    if (evidenceCount >= 2 && gapCount === 0) status = "covered";
    else if (evidenceCount > 0 || gapCount > 0) status = "partially_covered";

    return {
      priority: p,
      topicId: primaryTopic?.id || "sustainability_foundations",
      topicLabel: primaryTopic?.label || p,
      status,
      evidenceCount,
    };
  });

  // Department Summaries (Sample protection: >= 2 learners with evidence)
  const deptMap = new Map<string, typeof employeeProfiles>();
  for (const ep of employeeProfiles) {
    const dept = ep.employee.department || "General Operations";
    const existing = deptMap.get(dept) || [];
    existing.push(ep);
    deptMap.set(dept, existing);
  }

  const departmentSummaries: DepartmentSummary[] = [];
  for (const [dept, epList] of deptMap.entries()) {
    const totalDept = epList.length;
    const activeDept = epList.filter((ep) => ep.profile.completedLearning.length > 0 || ep.profile.demonstratedStrengths.length > 0).length;
    const evidenceDept = epList.filter((ep) => ep.profile.hasSufficientEvidence);
    const evidenceDeptCount = evidenceDept.length;

    const hasSufficientSample = evidenceDeptCount >= 2;
    const sampleStatus = hasSufficientSample ? "evaluated" : "insufficient_sample";

    const deptStrengths: string[] = [];
    const deptGaps: string[] = [];

    if (hasSufficientSample) {
      const sCounts = new Map<string, number>();
      const gCounts = new Map<string, number>();

      for (const ep of evidenceDept) {
        for (const s of ep.profile.demonstratedStrengths) {
          sCounts.set(s.topicLabel, (sCounts.get(s.topicLabel) || 0) + 1);
        }
        for (const g of ep.profile.inferredKnowledgeGaps) {
          gCounts.set(g.topicLabel, (gCounts.get(g.topicLabel) || 0) + 1);
        }
      }

      deptStrengths.push(...Array.from(sCounts.keys()).slice(0, 3));
      deptGaps.push(...Array.from(gCounts.keys()).slice(0, 3));
    }

    departmentSummaries.push({
      department: dept,
      learnerCount: totalDept,
      activeLearnersCount: activeDept,
      learnersWithEvidenceCount: evidenceDeptCount,
      evidenceCoverage: totalDept > 0 ? Number((evidenceDeptCount / totalDept).toFixed(2)) : 0,
      hasSufficientSample,
      sampleStatus,
      topStrengths: deptStrengths,
      topGaps: deptGaps,
      priorityTopics: deptGaps.length > 0 ? deptGaps : priorities,
    });
  }

  // Grounded Recommended Company Actions
  const recommendedActions: RecommendedCompanyAction[] = [];

  for (const gap of topCompanyGaps) {
    const targetCourse = publishedCourses.find((c) =>
      mapCourseToTopics(c).some((t) => t.id === gap.topicId)
    );

    if (targetCourse) {
      const impactedDepts = departmentSummaries
        .filter((d) => d.topGaps.includes(gap.topicLabel) || d.priorityTopics.includes(gap.topicLabel))
        .map((d) => d.department);

      const targetDept = impactedDepts.length > 0 ? impactedDepts.join(", ") : "All Departments";

      recommendedActions.push({
        who: targetDept,
        courseId: targetCourse.id,
        courseCode: targetCourse.courseCode || `ELH-${String(targetCourse.id).padStart(2, "0")}`,
        title: targetCourse.title,
        why: `${gap.criticalCount > 0 ? "Critical" : "Moderate"} knowledge gap detected across ${gap.gapCount} employee assessment records in ${gap.topicLabel}.`,
        priority: gap.severity === "critical" ? "high" : "medium",
        expectedLearningOutcome: `Strengthen workforce knowledge in ${gap.topicLabel} and close identified assessment gaps.`,
      });
    }
  }

  // Gemini Narrative Interpretation (With Fallback)
  const baseResult: CompanyWorkforceIntelligence = {
    companyId,
    companyName,
    industry,
    generatedAt: new Date().toISOString(),
    providerTag: "fallback",
    isFallback: true,
    totalEmployees,
    activeLearnersCount,
    learnersWithEvidenceCount,
    learningParticipationRate,
    evidenceCoverageRate,
    hasSufficientEvidence: true,
    domainDistribution,
    topCompanyStrengths,
    topCompanyGaps,
    companyTopStrengths: topCompanyStrengths.map((s) => s.topicLabel),
    companyTopGaps: topCompanyGaps.map((g) => g.topicLabel),
    companyPriorityCoverage,
    departmentSummaries,
    departmentBreakdown: departmentSummaries,
    companyPriorities: companyPriorityCoverage,
    overallCoverage: evidenceCoverageRate,
    recommendedActions,
    executiveSummary: `${companyName} shows a learning participation rate of ${(learningParticipationRate * 100).toFixed(0)}% across ${totalEmployees} employees. Strongest knowledge area is ${topCompanyStrengths[0]?.topicLabel || "General Sustainability"}, while ${topCompanyGaps[0]?.topicLabel || "ESG Literacy"} represents the primary training priority.`,
    aiCompanyStrengths: topCompanyStrengths.map((s) => ({
      topic: s.topicLabel,
      reason: `Demonstrated by ${s.strengthCount} employees (${s.percentageOfEvidenceLearners}% of assessment sample).`,
    })),
    aiPriorityGaps: topCompanyGaps.map((g) => ({
      topic: g.topicLabel,
      severity: g.severity,
      evidence: `Identified across ${g.gapCount} assessment profiles (${g.criticalCount} critical).`,
    })),
    aiDepartmentInsights: departmentSummaries.map((d) => ({
      department: d.department,
      summary: d.hasSufficientSample
        ? `Evidence coverage at ${(d.evidenceCoverage * 100).toFixed(0)}%. Strengths: ${d.topStrengths.join(", ") || "In progress"}. Areas for growth: ${d.topGaps.join(", ") || "None flagged"}.`
        : `Insufficient evidence sample (${d.learnersWithEvidenceCount} learners). Additional assessments required before department-level pattern analysis.`,
      priority: d.topGaps.length > 0 ? "medium" : "low",
    })),
    disclaimer:
      "Course completion and quiz results reflect training exposure and assessment scores, not verified workplace professional competence or ESG regulatory compliance.",
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return baseResult;
  }

  try {
    const prompt = `You are the ELEVIO SKILLS Corporate ESG Workforce Intelligence AI Engine.
Analyze the provided aggregated, anonymized company workforce metrics to construct an executive management narrative.

STRICT GROUNDING & PRIVACY CONSTRAINTS:
1. Do NOT invent employee names, numbers, or facts not present in the input metrics.
2. Training data proves learning exposure and assessment scores, NOT workplace professional competence or ESG compliance.
3. Return valid JSON matching this schema EXACTLY:

{
  "executiveSummary": "string (2-3 sentences management overview)",
  "aiCompanyStrengths": [
    { "topic": "string", "reason": "string" }
  ],
  "aiPriorityGaps": [
    { "topic": "string", "severity": "high | medium | low", "evidence": "string" }
  ],
  "aiDepartmentInsights": [
    { "department": "string", "summary": "string", "priority": "high | medium | low" }
  ]
}

COMPANY CONTEXT:
Name: ${companyName}
Industry: ${industry}
Total Employees: ${totalEmployees}
Learners with Evidence: ${learnersWithEvidenceCount} (${(evidenceCoverageRate * 100).toFixed(0)}% coverage)

DOMAIN DISTRIBUTION:
${JSON.stringify(domainDistribution, null, 2)}

TOP DEMONSTRATED STRENGTHS:
${JSON.stringify(topCompanyStrengths, null, 2)}

TOP KNOWLEDGE GAPS:
${JSON.stringify(topCompanyGaps, null, 2)}

DEPARTMENT SUMMARIES:
${JSON.stringify(departmentSummaries, null, 2)}
`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) return baseResult;

    const resJson = await response.json();
    const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return baseResult;

    const parsed = JSON.parse(rawText);

    return {
      ...baseResult,
      providerTag: "gemini",
      isFallback: false,
      executiveSummary: parsed.executiveSummary || baseResult.executiveSummary,
      aiCompanyStrengths: parsed.aiCompanyStrengths || baseResult.aiCompanyStrengths,
      aiPriorityGaps: parsed.aiPriorityGaps || baseResult.aiPriorityGaps,
      aiDepartmentInsights: parsed.aiDepartmentInsights || baseResult.aiDepartmentInsights,
    };
  } catch {
    return baseResult;
  }
}

export async function generateCompanyWorkforceIntelligence(
  access: CompanyAccess,
  filterDept?: string
): Promise<CompanyWorkforceIntelligence> {
  const { db, employeesTable, companiesTable, coursesTable } = await import("@workspace/db");
  const { eq } = await import("drizzle-orm");
  const { generateEmployeeSkillsProfile } = await import("./aiSkillsGapService");

  const companyId = access.companyId;

  const [company] = await db
    .select()
    .from(companiesTable)
    .where(eq(companiesTable.id, companyId));

  const allEmployees = await db
    .select()
    .from(employeesTable)
    .where(eq(employeesTable.companyId, companyId));

  const filteredEmployees = filterDept
    ? allEmployees.filter((e) => (e.department || "").toLowerCase() === filterDept.toLowerCase())
    : allEmployees;

  const employeeProfiles: EmployeeProfileInput[] = [];
  for (const emp of filteredEmployees) {
    try {
      const profile = await generateEmployeeSkillsProfile(emp.id, access);
      employeeProfiles.push({ employee: emp, profile });
    } catch {
      // Continue aggregating other employees
    }
  }

  const publishedCourses = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.isPublished, true));

  return aggregateCompanyWorkforceIntelligence(
    {
      id: companyId,
      name: company?.name || "Organisation",
      industry: company?.industry || "Sustainability & Services",
      trainingPriorities: company?.trainingPriorities || [],
    },
    employeeProfiles,
    publishedCourses
  );
}

function buildInsufficientEvidenceResponse(
  companyId: number,
  companyName: string,
  industry: string,
  totalEmployees: number,
  activeLearnersCount: number,
  learnersWithEvidenceCount: number
): CompanyWorkforceIntelligence {
  return {
    companyId,
    companyName,
    industry,
    generatedAt: new Date().toISOString(),
    providerTag: "fallback",
    isFallback: true,
    totalEmployees,
    activeLearnersCount,
    learnersWithEvidenceCount,
    learningParticipationRate: totalEmployees > 0 ? Number((activeLearnersCount / totalEmployees).toFixed(2)) : 0,
    evidenceCoverageRate: totalEmployees > 0 ? Number((learnersWithEvidenceCount / totalEmployees).toFixed(2)) : 0,
    hasSufficientEvidence: false,
    insufficientEvidenceMessage:
      "More employee learning and assessment data is required before reliable company-level patterns can be identified.",
    domainDistribution: {
      environmental: { strengthCount: 0, gapCount: 0, criticalGapCount: 0 },
      social: { strengthCount: 0, gapCount: 0, criticalGapCount: 0 },
      governance: { strengthCount: 0, gapCount: 0, criticalGapCount: 0 },
    },
    topCompanyStrengths: [],
    topCompanyGaps: [],
    companyPriorityCoverage: [],
    companyPriorities: [],
    departmentSummaries: [],
    departmentBreakdown: [],
    overallCoverage: totalEmployees > 0 ? Number((learnersWithEvidenceCount / totalEmployees).toFixed(2)) : 0,
    recommendedActions: [],
    executiveSummary:
      "Insufficient employee assessment evidence available to construct an organization-wide intelligence profile. Assign courses and encourage quiz completions to unlock workforce insights.",
    aiCompanyStrengths: [],
    aiPriorityGaps: [],
    aiDepartmentInsights: [],
    disclaimer:
      "Course completion and quiz results reflect training exposure and assessment scores, not verified workplace professional competence or ESG regulatory compliance.",
  };
}
