import { CompanyAccess } from "../access";
import {
  generateCompanyWorkforceIntelligence,
  CompanyWorkforceIntelligence,
} from "./companyWorkforceIntelligenceService";

export interface WorkforceReadinessData {
  status: "sufficient_evidence" | "insufficient_evidence";
  companyId: number;
  companyName: string;
  reportingPeriod: string; // "YYYY-MM"
  generatedAt: string;
  methodologyVersion: "v1";
  providerTag: "gemini" | "fallback";
  isFallback: boolean;

  overall: {
    score: number; // 0 - 100, whole integer
    band: "Early" | "Developing" | "Established" | "Strong";
    evidenceConfidence: "LOW" | "MODERATE" | "STRONG";
    insufficientEvidenceMessage?: string;
  };

  domains: {
    environmental: {
      score: number | null;
      status: "sufficient" | "insufficient_evidence";
    };
    social: {
      score: number | null;
      status: "sufficient" | "insufficient_evidence";
    };
    governance: {
      score: number | null;
      status: "sufficient" | "insufficient_evidence";
    };
  };

  priorityTopics: {
    declaredPrioritiesCount: number;
    coveredPrioritiesCount: number;
    priorityCoverageRate: number; // 0.0 - 1.0
  };

  departmentReadiness: Array<{
    department: string;
    learnerCount: number;
    score: number | null;
    sampleStatus: "evaluated" | "insufficient_sample";
  }>;

  trend: {
    hasPriorPeriod: boolean;
    previousScore?: number;
    change?: number; // e.g. +5 or -3
    direction?: "improving" | "stable" | "declining";
    summaryText: string;
  };

  interpretation: {
    strongestArea: string;
    priorityArea: string;
    summary: string;
  };

  recommendedActions: Array<{
    who: string;
    courseId: number;
    courseCode: string;
    title: string;
    why: string;
    priority: "high" | "medium" | "optional";
    expectedLearningOutcome: string;
  }>;

  disclaimer: string;
}

// In-memory snapshot cache for fast retrieval & fallback
const inMemorySnapshotStore = new Map<string, WorkforceReadinessData>();

function getSnapshotKey(companyId: number, period: string): string {
  return `${companyId}:${period}`;
}

export function getCurrentReportingPeriod(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function getPreviousReportingPeriod(period: string): string {
  const [yearStr, monthStr] = period.split("-");
  let year = parseInt(yearStr || "2026", 10);
  let m = parseInt(monthStr || "08", 10) - 1;

  if (m < 1) {
    m = 12;
    year -= 1;
  }

  return `${year}-${String(m).padStart(2, "0")}`;
}

export function deriveReadinessBand(score: number): "Early" | "Developing" | "Established" | "Strong" {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Established";
  if (score >= 40) return "Developing";
  return "Early";
}

export function deriveEvidenceConfidence(
  evalLearners: number,
  coverageRate: number
): "LOW" | "MODERATE" | "STRONG" {
  if (evalLearners < 3 || coverageRate < 0.2) return "LOW";
  if (evalLearners < 10 || coverageRate < 0.5) return "MODERATE";
  return "STRONG";
}

export async function computeWorkforceReadiness(
  companyInfo: { id: number; name: string; industry: string; trainingPriorities: string[] },
  reportingPeriod: string,
  intelligence: CompanyWorkforceIntelligence,
  priorSnapshot: WorkforceReadinessData | null
): Promise<WorkforceReadinessData> {
  const companyId = companyInfo.id;
  const companyName = companyInfo.name || "Organisation";

  const totalEmployees = intelligence.totalEmployees || 1;
  const evalLearners = intelligence.learnersWithEvidenceCount || 0;
  const coverageRate = intelligence.evidenceCoverageRate || 0.0;
  const hasSufficient = intelligence.hasSufficientEvidence && evalLearners >= 3;

  const disclaimer =
    "The ELEVIO SKILLS Workforce Readiness Indicator is an evidence-backed benchmark based on platform learning and assessment records. It does not constitute formal ESG regulatory compliance or an external ESG rating.";

  if (!hasSufficient) {
    return {
      status: "insufficient_evidence",
      companyId,
      companyName,
      reportingPeriod,
      generatedAt: new Date().toISOString(),
      methodologyVersion: "v1",
      providerTag: "fallback",
      isFallback: true,
      overall: {
        score: 0,
        band: "Early",
        evidenceConfidence: "LOW",
        insufficientEvidenceMessage:
          "More employee learning and assessment data is required before a reliable workforce readiness indicator can be calculated.",
      },
      domains: {
        environmental: { score: null, status: "insufficient_evidence" },
        social: { score: null, status: "insufficient_evidence" },
        governance: { score: null, status: "insufficient_evidence" },
      },
      priorityTopics: {
        declaredPrioritiesCount: companyInfo.trainingPriorities?.length || 0,
        coveredPrioritiesCount: 0,
        priorityCoverageRate: 0.0,
      },
      departmentReadiness: intelligence.departmentSummaries.map((d) => ({
        department: d.department,
        learnerCount: d.learnerCount,
        score: null,
        sampleStatus: "insufficient_sample",
      })),
      trend: {
        hasPriorPeriod: false,
        summaryText: "Insufficient evidence volume to establish readiness baseline.",
      },
      interpretation: {
        strongestArea: "None identified",
        priorityArea: "Increase employee quiz participation",
        summary: `${companyName} has insufficient assessment evidence in ${reportingPeriod}. Encourage employees across departments to complete course quizzes.`,
      },
      recommendedActions: intelligence.recommendedActions,
      disclaimer,
    };
  }

  // 1. Deterministic Factor Computations
  // A. Evidence Coverage Score (0 - 100)
  const covScore = Math.min(100, Math.round(coverageRate * 100));

  // B. Demonstrated Knowledge Score (0 - 100)
  const strengthCount = intelligence.topCompanyStrengths.length;
  const gapCount = intelligence.topCompanyGaps.length;
  const totalTopicsEvaluated = Math.max(1, strengthCount + gapCount);
  const knowScore = Math.min(100, Math.max(20, Math.round((strengthCount / totalTopicsEvaluated) * 100)));

  // C. Priority Topic Coverage Score (0 - 100)
  const declaredPrios = companyInfo.trainingPriorities || [];
  let coveredPriosCount = 0;
  if (declaredPrios.length > 0) {
    for (const prio of declaredPrios) {
      if (intelligence.topCompanyStrengths.some((s) => s.topicId === prio || s.topicLabel.toLowerCase().includes(prio.replace(/_/g, " ")))) {
        coveredPriosCount++;
      }
    }
  }
  const prioCoverageRate = declaredPrios.length > 0 ? coveredPriosCount / declaredPrios.length : 0.75;
  const prioScore = Math.round(prioCoverageRate * 100);

  // D. Department Coverage Score (0 - 100)
  const depts = intelligence.departmentSummaries || [];
  const evalDepts = depts.filter((d) => d.hasSufficientSample).length;
  const deptCoverageRate = depts.length > 0 ? evalDepts / depts.length : 0.5;
  const deptScore = Math.round(deptCoverageRate * 100);

  // E. Critical Gap Penalty (0 - 15 deduction)
  const totalCriticalGaps = intelligence.topCompanyGaps.reduce((acc, g) => acc + (g.criticalCount || 0), 0);
  const gapPenalty = Math.min(15, totalCriticalGaps * 5);

  // Raw Weighted Score Formula (25% cov, 30% know, 25% prio, 20% dept - penalty)
  const rawScore = 0.25 * covScore + 0.30 * knowScore + 0.25 * prioScore + 0.20 * deptScore - gapPenalty;
  const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  const band = deriveReadinessBand(finalScore);
  const evidenceConfidence = deriveEvidenceConfidence(evalLearners, coverageRate);

  // 2. Domain Subscores (Environmental, Social, Governance)
  const envDist = intelligence.domainDistribution.environmental;
  const socDist = intelligence.domainDistribution.social;
  const govDist = intelligence.domainDistribution.governance;

  const envTotal = envDist.strengthCount + envDist.gapCount;
  const socTotal = socDist.strengthCount + socDist.gapCount;
  const govTotal = govDist.strengthCount + govDist.gapCount;

  const envScore = envTotal >= 1 ? Math.min(100, Math.max(0, Math.round((envDist.strengthCount / envTotal) * 100))) : null;
  const socScore = socTotal >= 1 ? Math.min(100, Math.max(0, Math.round((socDist.strengthCount / socTotal) * 100))) : null;
  const govScore = govTotal >= 1 ? Math.min(100, Math.max(0, Math.round((govDist.strengthCount / govTotal) * 100))) : null;

  // 3. Department Readiness Breakdown
  const departmentReadiness = depts.map((d) => {
    let dScore: number | null = null;
    if (d.hasSufficientSample) {
      const dStrengths = d.topStrengths.length;
      const dGaps = d.topGaps.length;
      const dTot = Math.max(1, dStrengths + dGaps);
      dScore = Math.min(100, Math.max(30, Math.round((dStrengths / dTot) * 100)));
    }

    return {
      department: d.department,
      learnerCount: d.learnerCount,
      score: dScore,
      sampleStatus: d.sampleStatus,
    };
  });

  // 4. Trend Calculation
  let trend: WorkforceReadinessData["trend"] = {
    hasPriorPeriod: false,
    summaryText: "Baseline readiness indicator established.",
  };

  if (priorSnapshot && priorSnapshot.status === "sufficient_evidence") {
    const prevScore = priorSnapshot.overall.score;
    const change = finalScore - prevScore;
    const direction = change > 0 ? "improving" : change < 0 ? "declining" : "stable";

    trend = {
      hasPriorPeriod: true,
      previousScore: prevScore,
      change,
      direction,
      summaryText: `Workforce readiness score shifted by ${change > 0 ? `+${change}` : change} points (${direction}) compared to ${priorSnapshot.reportingPeriod}.`,
    };
  }

  // 5. Default Fallback Interpretation
  const strongestTopic = intelligence.topCompanyStrengths[0]?.topicLabel || "General Sustainability";
  const priorityTopic = intelligence.topCompanyGaps[0]?.topicLabel || "ESG Foundations";

  const fallbackInterpretation = {
    strongestArea: strongestTopic,
    priorityArea: priorityTopic,
    summary: `${companyName} achieved an ESG Workforce Readiness score of ${finalScore}/100 (${band} band) in ${reportingPeriod}. Strongest knowledge evidence demonstrated in ${strongestTopic}, with primary training focus required in ${priorityTopic}.`,
  };

  const baseReadiness: WorkforceReadinessData = {
    status: "sufficient_evidence",
    companyId,
    companyName,
    reportingPeriod,
    generatedAt: new Date().toISOString(),
    methodologyVersion: "v1",
    providerTag: "fallback",
    isFallback: true,
    overall: {
      score: finalScore,
      band,
      evidenceConfidence,
    },
    domains: {
      environmental: {
        score: envScore,
        status: envScore !== null ? "sufficient" : "insufficient_evidence",
      },
      social: {
        score: socScore,
        status: socScore !== null ? "sufficient" : "insufficient_evidence",
      },
      governance: {
        score: govScore,
        status: govScore !== null ? "sufficient" : "insufficient_evidence",
      },
    },
    priorityTopics: {
      declaredPrioritiesCount: declaredPrios.length,
      coveredPrioritiesCount: coveredPriosCount,
      priorityCoverageRate: prioCoverageRate,
    },
    departmentReadiness,
    trend,
    interpretation: fallbackInterpretation,
    recommendedActions: intelligence.recommendedActions,
    disclaimer,
  };

  // 6. Gemini Executive Narrative Interpretation Layer
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return baseReadiness;
  }

  try {
    const prompt = `You are the ELEVIO SKILLS ESG Workforce Readiness AI Engine.
Generate a concise 2-sentence executive interpretation explaining the deterministic workforce readiness score.

CRITICAL SAFETY MANDATES:
1. Do NOT alter or recalculate the numerical score (${finalScore}/100).
2. Do NOT claim external ESG certification or regulatory compliance.
3. Return valid JSON matching this schema EXACTLY:

{
  "strongestArea": "string (1-3 words topic name)",
  "priorityArea": "string (1-3 words topic name)",
  "summary": "string (2 concise executive sentences explaining why the score is ${finalScore}/100 and key next steps)"
}

SCORES CONTEXT:
Company: ${companyName} (${companyInfo.industry})
Reporting Period: ${reportingPeriod}
Overall Readiness Score: ${finalScore} / 100 (Band: ${band}, Confidence: ${evidenceConfidence})
Environmental Subscore: ${envScore !== null ? `${envScore}/100` : "Insufficient"}
Social Subscore: ${socScore !== null ? `${socScore}/100` : "Insufficient"}
Governance Subscore: ${govScore !== null ? `${govScore}/100` : "Insufficient"}
Strongest Demonstrated Topic: ${strongestTopic}
Priority Knowledge Gap: ${priorityTopic}
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

    if (!response.ok) return baseReadiness;

    const resJson = await response.json();
    const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return baseReadiness;

    const parsed = JSON.parse(rawText);

    return {
      ...baseReadiness,
      providerTag: "gemini",
      isFallback: false,
      interpretation: {
        strongestArea: parsed.strongestArea || fallbackInterpretation.strongestArea,
        priorityArea: parsed.priorityArea || fallbackInterpretation.priorityArea,
        summary: parsed.summary || fallbackInterpretation.summary,
      },
    };
  } catch {
    return baseReadiness;
  }
}

export async function getOrComputeWorkforceReadiness(
  access: CompanyAccess,
  requestedPeriod?: string,
  forceRefresh: boolean = false
): Promise<WorkforceReadinessData> {
  const companyId = access.companyId;
  const reportingPeriod = requestedPeriod ? requestedPeriod.trim() : getCurrentReportingPeriod();

  const storeKey = getSnapshotKey(companyId, reportingPeriod);

  if (!forceRefresh && inMemorySnapshotStore.has(storeKey)) {
    return inMemorySnapshotStore.get(storeKey)!;
  }

  try {
    const dbModule = await import("@workspace/db").catch(() => null);
    if (dbModule && dbModule.db && dbModule.workforceReadinessSnapshotsTable) {
      const { db, workforceReadinessSnapshotsTable, companiesTable } = dbModule;
      const { eq, and } = await import("drizzle-orm").catch(() => ({} as any));

      if (!forceRefresh) {
        const [existingSnapshot] = await db
          .select()
          .from(workforceReadinessSnapshotsTable)
          .where(
            and(
              eq(workforceReadinessSnapshotsTable.companyId, companyId),
              eq(workforceReadinessSnapshotsTable.reportingPeriod, reportingPeriod)
            )
          );

        if (existingSnapshot && existingSnapshot.snapshotData) {
          const snapshotFromDb: WorkforceReadinessData = existingSnapshot.snapshotData as any;
          inMemorySnapshotStore.set(storeKey, snapshotFromDb);
          return snapshotFromDb;
        }
      }

      // Fetch company info
      const [company] = await db
        .select()
        .from(companiesTable)
        .where(eq(companiesTable.id, companyId));

      const companyInfo = {
        id: companyId,
        name: company?.name || "Organisation",
        industry: company?.industry || "Services",
        trainingPriorities: company?.trainingPriorities || [],
      };

      // Fetch prior snapshot for trend analysis
      const priorPeriod = getPreviousReportingPeriod(reportingPeriod);
      let priorSnapshot: WorkforceReadinessData | null = inMemorySnapshotStore.get(getSnapshotKey(companyId, priorPeriod)) || null;

      if (!priorSnapshot) {
        try {
          const [priorRecord] = await db
            .select()
            .from(workforceReadinessSnapshotsTable)
            .where(
              and(
                eq(workforceReadinessSnapshotsTable.companyId, companyId),
                eq(workforceReadinessSnapshotsTable.reportingPeriod, priorPeriod)
              )
            );

          if (priorRecord && priorRecord.snapshotData) {
            priorSnapshot = priorRecord.snapshotData as any;
          }
        } catch {
          // Continue without prior snapshot
        }
      }

      // Generate Company Workforce Intelligence using Sprint 10V engine
      const intelligence = await generateCompanyWorkforceIntelligence(access);

      // Compute Readiness Indicator
      const readiness = await computeWorkforceReadiness(companyInfo, reportingPeriod, intelligence, priorSnapshot);

      // Save in memory cache
      inMemorySnapshotStore.set(storeKey, readiness);

      // Save in DB
      try {
        await db.insert(workforceReadinessSnapshotsTable).values({
          companyId,
          reportingPeriod,
          overallScore: readiness.overall.score,
          readinessBand: readiness.overall.band,
          evidenceConfidence: readiness.overall.evidenceConfidence,
          environmentalScore: readiness.domains.environmental.score,
          socialScore: readiness.domains.social.score,
          governanceScore: readiness.domains.governance.score,
          methodologyVersion: "v1",
          snapshotData: readiness,
          generatedAt: readiness.generatedAt,
        });
      } catch {
        // Memory store remains active
      }

      return readiness;
    }
  } catch {
    // Continue to fallback on DB import or query failure
  }

  const fallbackIntel = await generateCompanyWorkforceIntelligence(access);
  return computeWorkforceReadiness(
    { id: companyId, name: "Organisation", industry: "Services", trainingPriorities: [] },
    reportingPeriod,
    fallbackIntel,
    null
  );
}

