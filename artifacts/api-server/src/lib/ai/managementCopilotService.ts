import { CompanyAccess, HttpError } from "../access";
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { generateCompanyWorkforceIntelligence } from "./companyWorkforceIntelligenceService";
import { getOrComputeWorkforceReadiness } from "./workforceReadinessService";
import { getMonthlyManagementBrief } from "./monthlyManagementBriefService";
import { generateCompanyActionPlan } from "./companyActionPlanService";

export interface CopilotActionCta {
  label: string;
  actionId?: string;
  courseCode?: string;
  link?: string;
}

export interface ManagementCopilotResponse {
  answer: string;
  sources: string[];
  evidencePeriod: string;
  confidence: "grounded" | "insufficient_evidence";
  suggestedActions?: CopilotActionCta[];
}

export interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Ask Morieva AI, the secure company-administrator workforce learning intelligence assistant for Morieva Skills.

Your sole purpose is to answer company administrators' questions about workforce learning activity, assessment evidence, skills gaps, ESG readiness, management briefs, action plans, and training priorities.

STRICT GUARDRAILS:
1. GROUNDED DATA ONLY: Rely strictly on data returned by tool function calls. Never invent or assume metrics, department names, course codes, or scores.
2. INSUFFICIENT EVIDENCE: If a department/topic has insufficient sample size or no evidence, explicitly state that platform evidence is insufficient or unavailable.
3. PROHIBITED CLAIMS: Never claim legal compliance, formal ESG certification, employee performance evaluations, or workplace competence guarantees.
4. PRIVACY: Never display employee names or emails. Refer to departments, roles, and aggregated counts.
5. TONE: Professional, concise, management-oriented, and objective.`;

const copilotTools: FunctionDeclaration[] = [
  {
    name: "getCompanyWorkforceIntelligence",
    description: "Fetch overall company workforce intelligence including strengths, gaps, evidence coverage, department summaries, and recommendations.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getWorkforceReadiness",
    description: "Fetch the company workforce ESG readiness score, subscores (Environmental, Social, Governance), readiness band, and trends.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        period: { type: Type.STRING, description: "Reporting period YYYY-MM (optional)" },
      },
    },
  },
  {
    name: "getManagementBrief",
    description: "Fetch the executive monthly management brief summarizing key achievements, areas needing attention, and strategic horizon.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        period: { type: Type.STRING, description: "Reporting period YYYY-MM (optional)" },
      },
    },
  },
  {
    name: "getCompanyActionPlan",
    description: "Fetch the actionable, prioritized training and learning plan for company administrators.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getDepartmentIntelligence",
    description: "Fetch intelligence details for a specific department (e.g., Marketing, Engineering, Procurement, Operations).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        departmentName: { type: Type.STRING, description: "Name of the department to query" },
      },
      required: ["departmentName"],
    },
  },
  {
    name: "getCourseDetails",
    description: "Fetch course details for a course code (e.g. ELH-01, ELH-03) or course ID.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        courseIdentifier: { type: Type.STRING, description: "Course ID or course code (e.g., ELH-01)" },
      },
      required: ["courseIdentifier"],
    },
  },
  {
    name: "getCompanyTrainingPriorities",
    description: "Fetch the company's declared ESG training priorities and target areas.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getTrainingInsights",
    description: "Fetch AI training insights including items needing attention, overdue training analysis, course failure rates, learner risk indicators, positive signals, and recommended next management action.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getManagementActions",
    description: "Fetch controlled, allowlisted training management follow-up actions (e.g. view overdue learners, send training reminders, view unstarted learners, assign refresher training, view course performance).",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
];

const VALID_TOOL_NAMES = new Set(copilotTools.map((t) => t.name));

/**
 * Executes registered backend tool functions securely using server-side access context.
 */
export async function executeCopilotTool(
  toolName: string,
  args: Record<string, any>,
  access: CompanyAccess
): Promise<{ result: any; sourceTag: string }> {
  if (!VALID_TOOL_NAMES.has(toolName)) {
    throw new Error(`Rejected unknown or unauthorized tool call: ${toolName}`);
  }

  // Enforce company admin access
  if (access.role !== "company_admin" && access.role !== "platform_admin") {
    throw new HttpError(403, "Company administrator access required");
  }

  const currentPeriod = new Date().toISOString().slice(0, 7);

  switch (toolName) {
    case "getCompanyWorkforceIntelligence": {
      const intel = await generateCompanyWorkforceIntelligence(access);
      return { result: intel, sourceTag: "workforce_intelligence" };
    }
    case "getWorkforceReadiness": {
      const period = args?.period || currentPeriod;
      const readiness = await getOrComputeWorkforceReadiness(access, period);
      return { result: readiness, sourceTag: "workforce_readiness" };
    }
    case "getManagementBrief": {
      const period = args?.period || currentPeriod;
      const brief = await getMonthlyManagementBrief(access, period);
      return { result: brief, sourceTag: "management_brief" };
    }
    case "getCompanyActionPlan": {
      const plan = await generateCompanyActionPlan(access);
      return { result: plan, sourceTag: "action_plan" };
    }
    case "getTrainingInsights": {
      const { getCompanyTrainingInsights } = await import("./trainingInsightsService");
      const insights = await getCompanyTrainingInsights(access);
      return { result: insights, sourceTag: "training_insights" };
    }
    case "getDepartmentIntelligence": {
      const deptName = String(args?.departmentName || "").trim().toLowerCase();
      const intel = await generateCompanyWorkforceIntelligence(access);
      const match = intel.departmentBreakdown.find(
        (d) => d.department.toLowerCase() === deptName
      );

      if (match) {
        return { result: match, sourceTag: "department_intelligence" };
      }

      const availableDepts = intel.departmentBreakdown.map((d) => d.department);
      return {
        result: {
          status: "not_found",
          message: `Department '${args?.departmentName}' not found. Available departments: ${availableDepts.join(", ") || "None"}`,
          availableDepartments: availableDepts,
        },
        sourceTag: "department_intelligence",
      };
    }
    case "getCourseDetails": {
      const identifier = String(args?.courseIdentifier || "").trim();
      let courseDetails: any = null;

      try {
        const { db, coursesTable } = await import("@workspace/db");
        const { eq, sql } = await import("drizzle-orm");

        const courses = await db.select().from(coursesTable);
        courseDetails = courses.find(
          (c: any) =>
            String(c.id) === identifier ||
            c.code?.toLowerCase() === identifier.toLowerCase()
        );
      } catch {
        // Catalogue fallback lookup
      }

      if (!courseDetails) {
        // Fallback default course catalog lookup
        const catalog: Record<string, any> = {
          "1": { id: 1, code: "ELH-01", title: "Sustainability Foundations", department: "General", level: "Foundational" },
          "2": { id: 2, code: "ELH-02", title: "Carbon Footprint & Emissions Measurement", department: "Operations", level: "Intermediate" },
          "3": { id: 3, code: "ELH-03", title: "Business Ethics & Anti-Corruption", department: "Governance", level: "Intermediate" },
          "4": { id: 4, code: "ELH-04", title: "Waste Management & Circular Economy", department: "Facilities", level: "Intermediate" },
          "ELH-01": { id: 1, code: "ELH-01", title: "Sustainability Foundations", department: "General", level: "Foundational" },
          "ELH-02": { id: 2, code: "ELH-02", title: "Carbon Footprint & Emissions Measurement", department: "Operations", level: "Intermediate" },
          "ELH-03": { id: 3, code: "ELH-03", title: "Business Ethics & Anti-Corruption", department: "Governance", level: "Intermediate" },
          "ELH-04": { id: 4, code: "ELH-04", title: "Waste Management & Circular Economy", department: "Facilities", level: "Intermediate" },
        };
        courseDetails = catalog[identifier] || catalog[identifier.toUpperCase()] || {
          code: identifier,
          title: `Course ${identifier}`,
          status: "published",
        };
      }

      return { result: courseDetails, sourceTag: "course_catalog" };
    }
    case "getCompanyTrainingPriorities": {
      const intel = await generateCompanyWorkforceIntelligence(access);
      return {
        result: {
          companyId: access.companyId,
          trainingPriorities: intel.companyPriorities,
        },
        sourceTag: "training_priorities",
      };
    }
    case "getManagementActions": {
      const { resolveCompanyManagementActions } = await import("./trainingActionResolverService");
      const actions = await resolveCompanyManagementActions(access);
      return { result: actions, sourceTag: "management_actions" };
    }
    default:
      throw new Error(`Unsupported tool: ${toolName}`);
  }
}

/**
 * Deterministic Fallback Copilot Response Generator when Gemini API is unavailable or fails.
 */
async function generateDeterministicCopilotFallback(
  question: string,
  access: CompanyAccess
): Promise<ManagementCopilotResponse> {
  const currentPeriod = new Date().toISOString().slice(0, 7);
  const qLower = question.toLowerCase();

  const sources: string[] = [];
  let answer = "";
  let confidence: "grounded" | "insufficient_evidence" = "grounded";
  const suggestedActions: CopilotActionCta[] = [];

  if (qLower.includes("action") || qLower.includes("prioritis") || qLower.includes("prioritiz") || qLower.includes("next")) {
    const plan = await generateCompanyActionPlan(access);
    sources.push("action_plan");
    const topActions = plan.actions.slice(0, 3);
    answer = `Here are your top recommended actions for ${plan.reportingPeriod}:\n\n` +
      topActions.map((a, i) => `${i + 1}. **${a.who.label}**: ${a.why} (Priority: ${a.priority.toUpperCase()})`).join("\n");
    
    topActions.forEach(a => {
      suggestedActions.push({ label: `View action: ${a.who.label}`, actionId: a.id });
    });
  } else if (qLower.includes("governance") || qLower.includes("weakest") || qLower.includes("readiness") || qLower.includes("score")) {
    const readiness = await getOrComputeWorkforceReadiness(access, currentPeriod);
    sources.push("workforce_readiness");
    answer = `Your organization's current ESG Workforce Readiness Score is **${readiness.overall.score}/100** (${readiness.overall.band.replace("_", " ").toUpperCase()}).\n\n` +
      `- Environmental: ${readiness.domains.environmental.score}/100\n` +
      `- Social: ${readiness.domains.social.score}/100\n` +
      `- Governance: ${readiness.domains.governance.score}/100\n\n` +
      `The Governance subscore reflects governance policy training and ethics module coverage across teams.`;

    if (readiness.domains.governance.score < 60) {
      suggestedActions.push({ label: "View Governance Actions", courseCode: "ELH-03" });
    }
  } else if (qLower.includes("gap") || qLower.includes("support") || qLower.includes("department") || qLower.includes("insufficient")) {
    const intel = await generateCompanyWorkforceIntelligence(access);
    sources.push("workforce_intelligence");

    const deptNeedingSupport = intel.departmentBreakdown.find(d => !d.hasSufficientSample || d.topGaps.length > 0);
    if (deptNeedingSupport) {
      if (!deptNeedingSupport.hasSufficientSample) {
        answer = `Department **${deptNeedingSupport.department}** currently has insufficient evaluation sample size (${deptNeedingSupport.learnersWithEvidenceCount} learners with evidence). We recommend increasing assessment coverage before mandating targeted training.`;
        confidence = "insufficient_evidence";
      } else {
        answer = `Department **${deptNeedingSupport.department}** shows key learning gaps in: ${deptNeedingSupport.topGaps.join(", ")}. Strongest areas include: ${deptNeedingSupport.topStrengths.join(", ") || "None identified yet"}.`;
      }
    } else {
      const topGaps = (intel.companyTopGaps || intel.topCompanyGaps?.map((g: any) => g.topicLabel) || []);
      const cov = (intel.overallCoverage ?? intel.evidenceCoverageRate ?? 0);
      answer = `Across all evaluated departments, average evidence coverage is ${(cov * 100).toFixed(0)}%. Key gaps company-wide include: ${topGaps.join(", ") || "None identified"}.`;
    }
    suggestedActions.push({ label: "View Recommended Actions" });
  } else if (qLower.includes("brief") || qLower.includes("month") || qLower.includes("improved")) {
    const brief = await getMonthlyManagementBrief(access, currentPeriod);
    sources.push("management_brief");
    answer = `**Executive Management Brief Summary (${brief.reportingMonth})**:\n\n` +
      `**Summary**: ${brief.aiExecutiveSummary?.executiveSummary || brief.trends?.summaryText || "Monthly training brief"}\n\n` +
      `**Key Improvements**:\n${brief.aiExecutiveSummary?.whatImproved || "Consistent training participation across teams."}\n\n` +
      `**Areas Needing Attention**:\n${brief.aiExecutiveSummary?.whatNeedsAttention || "Focus on completing outstanding modules."}`;
  } else {
    const intel = await generateCompanyWorkforceIntelligence(access);
    const readiness = await getOrComputeWorkforceReadiness(access, currentPeriod);
    sources.push("workforce_intelligence", "workforce_readiness");
    const topStrengths = (intel.companyTopStrengths || intel.topCompanyStrengths?.map((s: any) => s.topicLabel) || []);
    const priorities = (Array.isArray(intel.companyPriorities)
      ? intel.companyPriorities.map((p: any) => typeof p === "string" ? p : p.priority || p.topicLabel || "Sustainability Foundations")
      : []);
    const cov = (intel.overallCoverage ?? intel.evidenceCoverageRate ?? 0);
    answer = `**Company Workforce Intelligence Overview**:\n\n` +
      `Overall ESG Readiness Score is **${readiness.overall.score}/100** with ${(cov * 100).toFixed(0)}% evidence coverage across active learners.\n\n` +
      `Key strengths: ${topStrengths.join(", ") || "Baseline ongoing"}.\n` +
      `Key training priorities: ${priorities.join(", ") || "Sustainability Foundations"}.`;
  }

  return {
    answer: "AI interpretation is temporarily unavailable. Your company intelligence dashboards and action plans remain available.\n\n" + answer,
    sources,
    evidencePeriod: currentPeriod,
    confidence,
    suggestedActions,
  };
}

/**
 * Main Copilot Entrypoint: Ask Morieva AI / Management Copilot v1
 */
export async function askManagementCopilot(
  access: CompanyAccess,
  question: string,
  history: ConversationTurn[] = []
): Promise<ManagementCopilotResponse> {
  // Enforce company admin or platform admin access
  if (access.role !== "company_admin" && access.role !== "platform_admin") {
    throw new HttpError(403, "Company administrator access required");
  }

  const cleanQuestion = String(question || "").trim();
  if (!cleanQuestion) {
    throw new HttpError(400, "Please provide a valid question");
  }

  const currentPeriod = new Date().toISOString().slice(0, 7);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return generateDeterministicCopilotFallback(cleanQuestion, access);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // Build chat/contents payload with safety context
    const maxHistory = history.slice(-5);
    const contents: any[] = [];

    for (const turn of maxHistory) {
      contents.push({
        role: turn.role === "user" ? "user" : "model",
        parts: [{ text: turn.content }],
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: cleanQuestion }],
    });

    // First model generation with tools
    const response1 = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ functionDeclarations: copilotTools }],
      },
    });

    const sourcesSet = new Set<string>();
    const functionCalls = response1.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const toolResultsParts: any[] = [];

      for (const fc of functionCalls) {
        try {
          const { result, sourceTag } = await executeCopilotTool(
            fc.name,
            (fc.args as Record<string, any>) || {},
            access
          );
          sourcesSet.add(sourceTag);

          toolResultsParts.push({
            functionResponse: {
              name: fc.name,
              response: { result },
            },
          });
        } catch (toolErr: any) {
          toolResultsParts.push({
            functionResponse: {
              name: fc.name,
              response: { error: toolErr?.message || "Tool execution failed" },
            },
          });
        }
      }

      // Append model call and tool execution result turns for second pass
      const modelContent = response1.candidates?.[0]?.content;
      const followUpContents = [...contents];
      if (modelContent) followUpContents.push(modelContent);
      followUpContents.push({ parts: toolResultsParts });

      const response2 = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: followUpContents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          tools: [{ functionDeclarations: copilotTools }],
        },
      });

      const textAnswer = response2.text?.trim() || "I have analyzed your request based on platform intelligence.";
      const sources = Array.from(sourcesSet);
      if (sources.length === 0) sources.push("workforce_intelligence");

      const isInsufficient =
        textAnswer.toLowerCase().includes("insufficient evidence") ||
        textAnswer.toLowerCase().includes("don't currently have enough") ||
        textAnswer.toLowerCase().includes("insufficient sample");

      return {
        answer: textAnswer,
        sources,
        evidencePeriod: currentPeriod,
        confidence: isInsufficient ? "insufficient_evidence" : "grounded",
        suggestedActions: [
          { label: "View Recommended Actions" },
        ],
      };
    } else {
      // Direct answer from Gemini without tool calling (or model selected no tool)
      const textAnswer = response1.text?.trim() || "Information processed from company intelligence context.";
      return {
        answer: textAnswer,
        sources: ["workforce_intelligence"],
        evidencePeriod: currentPeriod,
        confidence: "grounded",
      };
    }
  } catch (err: any) {
    // Graceful fallback on Gemini API failure or error
    return generateDeterministicCopilotFallback(cleanQuestion, access);
  }
}
