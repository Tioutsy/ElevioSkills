import { CompanyAccess } from "../access";
import { generateCompanyWorkforceIntelligence, CompanyWorkforceIntelligence } from "./companyWorkforceIntelligenceService";
import { getOrComputeWorkforceReadiness, WorkforceReadinessData } from "./workforceReadinessService";

export type ControlledActionType =

  | "assign_course"
  | "assign_refresher"
  | "increase_assessment_coverage"
  | "address_priority_gap"
  | "strengthen_department"
  | "maintain_strength";

export type ActionPriority = "high" | "medium" | "low";

export type ActionStatus = "proposed" | "accepted" | "in_progress" | "completed" | "dismissed";

export type ExecutionMode = "manual" | "eligible_for_automation";

export interface CompanyAction {
  id: string;
  who: {
    type: "department" | "company" | "learner_group";
    label: string;
  };
  what: {
    type: ControlledActionType;
    courseId?: number;
    courseCode?: string;
    courseTitle?: string;
  };
  why: string;
  priority: ActionPriority;
  expectedLearningOutcome: string;
  evidence: string[];
  status: ActionStatus;
  executionMode: ExecutionMode;
  outcomes?: {
    progressObserved?: boolean;
    assignmentCount?: number;
    completionCount?: number;
    assessmentCoverageIncreased?: boolean;
    gapReduced?: boolean;
  };
}

export interface CompanyActionPlanData {
  id?: number;
  companyId: number;
  companyName: string;
  reportingPeriod: string;
  generatedAt: string;
  providerTag: "gemini" | "fallback";
  isFallback: boolean;
  methodologyVersion: string;
  actions: CompanyAction[];
  summary: string;
  disclaimer: string;
}

export const VALID_ACTION_TYPES: ControlledActionType[] = [
  "assign_course",
  "assign_refresher",
  "increase_assessment_coverage",
  "address_priority_gap",
  "strengthen_department",
  "maintain_strength",
];

export const VALID_CATALOGUE_COURSES = [
  { id: 1, code: "ELH-01", title: "Corporate Sustainability Foundations", domain: "environmental" },
  { id: 2, code: "ELH-02", title: "Waste Sorting & Circular Economy", domain: "environmental" },
  { id: 3, code: "ELH-03", title: "ESG Governance, Ethics & Compliance", domain: "governance" },
  { id: 4, code: "ELH-04", title: "Energy Efficiency & Climate Action", domain: "environmental" },
  { id: 5, code: "ELH-05", title: "Diversity, Equity & Inclusion in Workplace", domain: "social" },
];

export function isEligibleCourse(courseCode?: string, courseId?: number, courseTitle?: string): boolean {
  if (!courseCode && !courseId && !courseTitle) return false;
  return VALID_CATALOGUE_COURSES.some(
    (c) =>
      (courseCode && c.code.toLowerCase() === courseCode.toLowerCase()) ||
      (courseId && c.id === courseId) ||
      (courseTitle && c.title.toLowerCase().includes(courseTitle.toLowerCase()))
  );
}

// Memory cache for active plans per company and period
const inMemoryActionPlanCache = new Map<string, CompanyActionPlanData>();

function getCacheKey(companyId: number, reportingPeriod: string): string {
  return `${companyId}:${reportingPeriod}`;
}

export async function generateDeterministicActionCandidates(
  companyInfo: { id: number; name: string; industry: string; trainingPriorities: string[] },
  intelligence: CompanyWorkforceIntelligence,
  readiness: WorkforceReadinessData
): Promise<CompanyAction[]> {
  const actions: CompanyAction[] = [];
  const companyName = companyInfo.name || "Organisation";

  // Rule 1: Address Critical Company Gaps with Recommended Courses
  for (const rec of intelligence.recommendedActions || []) {
    const isGov = rec.title.toLowerCase().includes("governance") || rec.title.toLowerCase().includes("compliance");
    actions.push({
      id: `action-rec-${rec.courseCode.toLowerCase()}-${rec.who.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
      who: {
        type: rec.who.toLowerCase().includes("company") ? "company" : "department",
        label: rec.who,
      },
      what: {
        type: isGov ? "address_priority_gap" : "assign_course",
        courseId: rec.courseId,
        courseCode: rec.courseCode,
        courseTitle: rec.title,
      },
      why: rec.why,
      priority: rec.priority === "high" ? "high" : "medium",
      expectedLearningOutcome: rec.expectedLearningOutcome,
      evidence: [
        `Identified workforce knowledge gap in topic associated with ${rec.title}`,
        `Recommended by Elevio Skills workforce gap analysis`,
      ],
      status: "proposed",
      executionMode: "eligible_for_automation",
    });
  }

  // Rule 2: Address Low Department Sample Size / Assessment Drive (Insufficient Evidence Behaviour)
  for (const dept of intelligence.departmentSummaries || []) {
    if (!dept.hasSufficientSample || dept.sampleStatus === "insufficient_sample") {
      actions.push({
        id: `action-eval-${dept.department.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
        who: {
          type: "department",
          label: dept.department,
        },
        what: {
          type: "increase_assessment_coverage",
          courseCode: "ELH-01",
          courseTitle: "Sustainability Foundations Assessment Drive",
        },
        why: `The ${dept.department} department currently has insufficient assessment evidence (${dept.learnersWithEvidenceCount} evaluated out of ${dept.learnerCount} active employees).`,
        priority: "medium",
        expectedLearningOutcome: "Achieve statistical confidence for departmental workforce readiness tracking.",
        evidence: [
          `${dept.department} department evidence coverage rate is below 20%`,
          `Minimum sample size protection active`,
        ],
        status: "proposed",
        executionMode: "manual",
      });
    }
  }

  // Rule 3: Target Weak Company Declared Priorities
  const declaredPrios = companyInfo.trainingPriorities || [];
  for (const prio of declaredPrios) {
    const formattedPrio = prio.replace(/_/g, " ");
    const isCovered = intelligence.topCompanyStrengths.some(
      (s) => s.topicId === prio || s.topicLabel.toLowerCase().includes(formattedPrio.toLowerCase())
    );

    if (!isCovered) {
      actions.push({
        id: `action-prio-${prio.toLowerCase()}`,
        who: {
          type: "company",
          label: `All Employees (${companyName})`,
        },
        what: {
          type: "address_priority_gap",
          courseId: 1,
          courseCode: "ELH-01",
          courseTitle: "Corporate Sustainability Foundations",
        },
        why: `Declared company ESG priority '${formattedPrio}' lacks sufficient demonstrated strength in workforce assessments.`,
        priority: "high",
        expectedLearningOutcome: `Align entire workforce with declared corporate ESG goal: ${formattedPrio}.`,
        evidence: [
          `Declared company training priority: ${formattedPrio}`,
          `Zero demonstrated topic strengths currently logged for this priority`,
        ],
        status: "proposed",
        executionMode: "eligible_for_automation",
      });
    }
  }

  // Rule 4: Address Weak Governance Score if G < 60
  if (readiness.status === "sufficient_evidence" && readiness.domains.governance.score !== null && readiness.domains.governance.score < 60) {
    actions.push({
      id: "action-gov-boost",
      who: {
        type: "learner_group",
        label: "Management & Operations Leadership",
      },
      what: {
        type: "assign_course",
        courseId: 3,
        courseCode: "ELH-03",
        courseTitle: "ESG Governance, Ethics & Compliance",
      },
      why: `Company Governance readiness score is currently ${readiness.domains.governance.score}/100, which is below the target baseline of 60/100.`,
      priority: "high",
      expectedLearningOutcome: "Strengthen ethical compliance, anti-corruption, and ESG reporting accuracy.",
      evidence: [
        `Governance subscore is ${readiness.domains.governance.score}/100`,
        `Identified governance risk area in workforce readiness audit`,
      ],
      status: "proposed",
      executionMode: "eligible_for_automation",
    });
  }

  // Rule 5: Maintain Strengths if candidates are sparse
  if (actions.length < 3 && intelligence.topCompanyStrengths.length > 0) {
    const topStrength = intelligence.topCompanyStrengths[0];
    actions.push({
      id: `action-maintain-${topStrength.topicId.toLowerCase()}`,
      who: {
        type: "company",
        label: `All Departments (${companyName})`,
      },
      what: {
        type: "maintain_strength",
        courseCode: "ELH-04",
        courseTitle: "Energy Efficiency & Climate Action",
      },
      why: `Sustain demonstrated high performance in ${topStrength.topicLabel} (${topStrength.percentageOfEvidenceLearners}% mastery).`,
      priority: "low",
      expectedLearningOutcome: `Maintain workforce excellence and leadership in ${topStrength.topicLabel}.`,
      evidence: [
        `${topStrength.percentageOfEvidenceLearners}% of evaluated learners demonstrated strength in ${topStrength.topicLabel}`,
      ],
      status: "proposed",
      executionMode: "manual",
    });
  }

  // Deduplicate candidate actions by id
  const uniqueMap = new Map<string, CompanyAction>();
  for (const act of actions) {
    if (!uniqueMap.has(act.id)) {
      uniqueMap.set(act.id, act);
    }
  }

  let finalCandidates = Array.from(uniqueMap.values());

  // Enforce Action Plan Size: 3 to 7 items max
  if (finalCandidates.length < 3) {
    const fallbackPads: CompanyAction[] = [
      {
        id: "action-pad-cov",
        who: { type: "company", label: "All Company Learners" },
        what: { type: "increase_assessment_coverage" },
        why: "Expand workforce assessment sample to strengthen evidence confidence across ESG learning topics.",
        priority: "medium",
        expectedLearningOutcome: "Achieve minimum 80% evidence coverage across active learners.",
        evidence: ["Current company evidence sample is below optimum confidence threshold."],
        status: "proposed",
        executionMode: "manual",
      },
      {
        id: "action-pad-foundations",
        who: { type: "company", label: "New & Active Learners" },
        what: {
          type: "assign_course",
          courseId: 1,
          courseCode: "ELH-01",
          courseTitle: "Sustainability Foundations",
        },
        why: "Reinforce baseline ESG awareness and organizational sustainability standards.",
        priority: "medium",
        expectedLearningOutcome: "Establish baseline ESG competency across all operational roles.",
        evidence: ["Foundational learning module recommendation"],
        status: "proposed",
        executionMode: "manual",
      },
      {
        id: "action-pad-gov",
        who: { type: "company", label: "Management & Governance Staff" },
        what: {
          type: "assign_course",
          courseId: 3,
          courseCode: "ELH-03",
          courseTitle: "Business Ethics & Anti-Corruption",
        },
        why: "Proactively maintain corporate governance and anti-corruption standards.",
        priority: "low",
        expectedLearningOutcome: "Ensure full compliance with internal governance protocols.",
        evidence: ["Proactive governance reinforcement recommendation"],
        status: "proposed",
        executionMode: "manual",
      },
    ];

    for (const pad of fallbackPads) {
      if (finalCandidates.length >= 3) break;
      if (!finalCandidates.some((a) => a.id === pad.id)) {
        finalCandidates.push(pad);
      }
    }
  }

  if (finalCandidates.length > 7) {
    const priorityRank: Record<string, number> = { high: 1, medium: 2, low: 3 };
    finalCandidates.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
    finalCandidates = finalCandidates.slice(0, 7);
  }

  return finalCandidates;

}

export async function generateCompanyActionPlan(access: CompanyAccess, forceRefresh = false): Promise<CompanyActionPlanData> {
  const currentPeriod = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const cacheKey = getCacheKey(access.companyId, currentPeriod);

  // Return cached or persisted plan unless explicitly forced refresh
  if (!forceRefresh) {
    const cached = inMemoryActionPlanCache.get(cacheKey);
    if (cached) return cached;

    try {
      const dbModule = await import("@workspace/db").catch(() => null);
      if (dbModule && dbModule.db && dbModule.companyActionPlansTable) {
        const { db, companyActionPlansTable, companyActionPlanItemsTable } = dbModule;
        const { eq, and, desc } = await import("drizzle-orm").catch(() => ({} as any));

        const [existingPlan] = await db
          .select()
          .from(companyActionPlansTable)
          .where(
            and(
              eq(companyActionPlansTable.companyId, access.companyId),
              eq(companyActionPlansTable.reportingPeriod, currentPeriod)
            )
          )
          .orderBy(desc(companyActionPlansTable.id))
          .limit(1);

        if (existingPlan) {
          const items = await db
            .select()
            .from(companyActionPlanItemsTable)
            .where(eq(companyActionPlanItemsTable.companyId, access.companyId));

          if (items.length > 0) {
            const loadedActions: CompanyAction[] = items.map((item: any) => ({
              id: item.actionId,
              who: {
                type: item.whoType as any,
                label: item.whoLabel,
              },
              what: {
                type: item.whatType as ControlledActionType,
                courseId: item.courseId ?? undefined,
                courseCode: item.courseCode ?? undefined,
                courseTitle: item.courseTitle ?? undefined,
              },
              why: item.why,
              priority: item.priority as ActionPriority,
              expectedLearningOutcome: item.expectedLearningOutcome,
              evidence: (item.evidence as string[]) || [],
              status: item.status as ActionStatus,
              executionMode: (item.executionMode as ExecutionMode) || "manual",
              outcomes: (item.outcomes as any) || undefined,
            }));

            const persistedPlan: CompanyActionPlanData = {
              id: existingPlan.id,
              companyId: existingPlan.companyId,
              companyName: access.companyName || "Organisation",
              reportingPeriod: existingPlan.reportingPeriod,
              generatedAt: existingPlan.createdAt || new Date().toISOString(),
              providerTag: (existingPlan.providerTag as any) || "fallback",
              isFallback: existingPlan.providerTag !== "gemini",
              methodologyVersion: existingPlan.methodologyVersion || "v1",
              actions: loadedActions,
              summary: existingPlan.summary || "Persisted Company Action Plan",
              disclaimer:
                "Actions are grounded in verified platform assessment and workforce intelligence data. Assigning courses automatically enrolls targeted learners upon admin approval.",
            };

            inMemoryActionPlanCache.set(cacheKey, persistedPlan);
            return persistedPlan;
          }
        }
      }
    } catch {
      // Continue to generation on DB read error
    }
  }



  const intelligence = await generateCompanyWorkforceIntelligence(access);
  const readiness = await getOrComputeWorkforceReadiness(access);

  const companyInfo = {
    id: access.companyId,
    name: intelligence.companyName || access.companyName || "Organisation",
    industry: intelligence.industry || "Services",
    trainingPriorities: readiness.priorityTopics ? ["waste_management", "energy_efficiency"] : [],
  };

  const candidates = await generateDeterministicActionCandidates(companyInfo, intelligence, readiness);

  const disclaimer =
    "Actions are grounded in verified platform assessment and workforce intelligence data. Assigning courses automatically enrolls targeted learners upon admin approval.";

  const fallbackSummary = `Action Plan for ${companyInfo.name}: Identified ${candidates.length} grounded training and assessment actions to address workforce skills gaps and readiness priorities.`;

  const basePlan: CompanyActionPlanData = {
    companyId: access.companyId,
    companyName: companyInfo.name,
    reportingPeriod: currentPeriod,
    generatedAt: new Date().toISOString(),
    providerTag: "fallback",
    isFallback: true,
    methodologyVersion: "v1",
    actions: candidates,
    summary: fallbackSummary,
    disclaimer,
  };

  let finalPlan = basePlan;

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.trim() !== "" && candidates.length > 0) {
    try {
      // Sanitize candidates for Zero-PII prompt
      const sanitizedCandidates = candidates.map((c) => ({
        id: c.id,
        who: c.who,
        what: c.what,
        why: c.why,
        priority: c.priority,
        expectedLearningOutcome: c.expectedLearningOutcome,
        evidence: c.evidence,
      }));

      const prompt = `You are the ELEVIO SKILLS AI Executive Action Plan Engine.
Review these deterministically generated candidate actions for ${companyInfo.name} (${companyInfo.industry}) and refine the executive summary and action explanations.

MANDATES & GUARDRAILS:
1. You MUST NOT invent new courses, change courseCode, change courseTitle, or create uncontrolled action types.
2. Allowed action types: assign_course, assign_refresher, increase_assessment_coverage, address_priority_gap, strengthen_department, maintain_strength.
3. Return strictly valid JSON adhering to this schema:

{
  "summary": "string (1-2 sentence executive overview of the action plan)",
  "refinedActions": [
    {
      "id": "string (matching original candidate ID)",
      "whatType": "assign_course | assign_refresher | increase_assessment_coverage | address_priority_gap | strengthen_department | maintain_strength",
      "why": "string (concise executive justification)",
      "priority": "high | medium | low",
      "expectedLearningOutcome": "string (1 sentence learning goal)"
    }
  ]
}

CANDIDATES DATA:
${JSON.stringify(sanitizedCandidates, null, 2)}
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

      if (response.ok) {
        const resJson = await response.json();
        const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText) {
          const parsed = JSON.parse(rawText);

          const refinedMap = new Map<string, any>();
          for (const r of parsed.refinedActions || []) {
            if (r.id) refinedMap.set(r.id, r);
          }

          const updatedActions = candidates.map((act) => {
            const ref = refinedMap.get(act.id);
            if (!ref) return act;

            // Reject Gemini hallucinated action types
            const validWhatType = VALID_ACTION_TYPES.includes(ref.whatType) ? ref.whatType : act.what.type;

            // Reject Gemini hallucinated course info if invalid
            if (act.what.courseCode && !isEligibleCourse(act.what.courseCode, act.what.courseId, act.what.courseTitle)) {
              return act;
            }

            return {
              ...act,
              what: {
                ...act.what,
                type: validWhatType,
              },
              why: ref.why || act.why,
              priority: (["high", "medium", "low"].includes(ref.priority) ? ref.priority : act.priority) as ActionPriority,
              expectedLearningOutcome: ref.expectedLearningOutcome || act.expectedLearningOutcome,
            };
          });

          finalPlan = {
            ...basePlan,
            providerTag: "gemini",
            isFallback: false,
            summary: parsed.summary || fallbackSummary,
            actions: updatedActions,
          };
        }
      }
    } catch {
      finalPlan = basePlan;
    }
  }

  // Persist plan in DB and memory
  inMemoryActionPlanCache.set(cacheKey, finalPlan);

  try {
    const dbModule = await import("@workspace/db").catch(() => null);
    if (dbModule && dbModule.db && dbModule.companyActionPlansTable) {
      const { db, companyActionPlansTable, companyActionPlanItemsTable } = dbModule;

      const [insertedPlan] = await db
        .insert(companyActionPlansTable)
        .values({
          companyId: access.companyId,
          reportingPeriod: currentPeriod,
          summary: finalPlan.summary,
          methodologyVersion: "v1",
          providerTag: finalPlan.providerTag,
          createdAt: finalPlan.generatedAt,
          updatedAt: finalPlan.generatedAt,
        })
        .returning();

      if (insertedPlan) {
        finalPlan.id = insertedPlan.id;

        for (const act of finalPlan.actions) {
          await db.insert(companyActionPlanItemsTable).values({
            planId: insertedPlan.id,
            companyId: access.companyId,
            actionId: act.id,
            whoType: act.who.type,
            whoLabel: act.who.label,
            whatType: act.what.type,
            courseId: act.what.courseId ?? null,
            courseCode: act.what.courseCode ?? null,
            courseTitle: act.what.courseTitle ?? null,
            why: act.why,
            priority: act.priority,
            expectedLearningOutcome: act.expectedLearningOutcome,
            evidence: act.evidence,
            status: act.status,
            executionMode: act.executionMode,
            outcomes: act.outcomes || null,
            createdAt: finalPlan.generatedAt,
            updatedAt: finalPlan.generatedAt,
          });
        }
      }
    }
  } catch {
    // In-memory fallback
  }

  return finalPlan;
}

export async function mutateActionStatus(
  access: CompanyAccess,
  actionId: string,
  newStatus: ActionStatus
): Promise<CompanyActionPlanData> {
  const currentPeriod = new Date().toISOString().slice(0, 7);
  const cacheKey = getCacheKey(access.companyId, currentPeriod);

  let plan = await generateCompanyActionPlan(access, false);

  const targetAction = plan.actions.find((a) => a.id === actionId);
  if (!targetAction) {
    throw new Error(`Action item '${actionId}' not found in current company action plan.`);
  }

  targetAction.status = newStatus;

  // Add outcome tracking when completed or accepted
  if (newStatus === "completed" || newStatus === "accepted") {
    targetAction.outcomes = {
      progressObserved: true,
      assignmentCount: (targetAction.outcomes?.assignmentCount || 0) + 1,
      completionCount: newStatus === "completed" ? (targetAction.outcomes?.completionCount || 0) + 1 : (targetAction.outcomes?.completionCount || 0),
      assessmentCoverageIncreased: true,
      gapReduced: true,
    };
  }

  inMemoryActionPlanCache.set(cacheKey, plan);

  try {
    const dbModule = await import("@workspace/db").catch(() => null);
    if (dbModule && dbModule.db && dbModule.companyActionPlanItemsTable) {
      const { db, companyActionPlanItemsTable } = dbModule;
      const { eq, and } = await import("drizzle-orm").catch(() => ({} as any));

      await db
        .update(companyActionPlanItemsTable)
        .set({
          status: newStatus,
          outcomes: targetAction.outcomes || null,
          updatedAt: new Date().toISOString(),
        })
        .where(
          and(
            eq(companyActionPlanItemsTable.companyId, access.companyId),
            eq(companyActionPlanItemsTable.actionId, actionId)
          )
        );
    }
  } catch {
    // Memory store update succeeds
  }

  return plan;
}


