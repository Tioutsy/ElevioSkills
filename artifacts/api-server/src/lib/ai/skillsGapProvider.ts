import { logger } from "../logger";
import {
  KnowledgeDomain,
  KNOWLEDGE_TAXONOMY,
  getTopicById,
  mapCourseToTopics,
  mapCompanyPriorityToTopics,
} from "./skillsTaxonomy";

export interface SkillsGapInput {
  company: {
    sector: string;
    trainingPriorities: string[];
  };
  employee: {
    employeeId: number | string;
    companyId: number | string;
    name?: string;
    email?: string;
    department?: string;
    roleCategory?: string;
    jobTitle?: string;
    seniority?: string;
  };
  learningEvidence: {
    completedCourses: Array<{
      courseId: number;
      courseCode: string;
      title: string;
      completedAt?: string;
      score?: number;
    }>;
    assignedCourses: Array<{
      courseId: number;
      courseCode: string;
      title: string;
      dueDate?: string;
      status?: string;
    }>;
    quizPerformance: Array<{
      courseId: number;
      courseTitle: string;
      score: number;
      passed: boolean;
      attemptTimestamp?: string;
      incorrectQuestionIds?: number[];
    }>;
  };
  catalog: Array<{
    id: number;
    courseCode: string;
    title: string;
    description: string;
    level: string;
    topics: string[];
  }>;
}

export interface CompletedLearningItem {
  courseId: number;
  courseCode: string;
  title: string;
  completedAt?: string;
  score?: number;
  topicsAddressed: string[];
}

export interface DemonstratedStrength {
  topicId: string;
  topicLabel: string;
  domain: KnowledgeDomain;
  evidenceText: string;
  scoreOrMetric?: string;
  trajectory?: "sustained_mastery" | "improving_learner" | "standard";
}

export interface InferredGap {
  topicId: string;
  topicLabel: string;
  domain: KnowledgeDomain;
  severity: "critical" | "moderate" | "low";
  reason: string;
  evidence: string;
  trajectory?: "persistent_repeated_weakness" | "inconsistent_performance" | "single_initial_failure" | "uncompleted_priority";
}

export interface RecommendedAction {
  courseId: number;
  courseCode: string;
  title: string;
  priority: "high" | "medium" | "optional";
  rationale: string;
  targetGapTopicId: string;
}

export interface EmployeeSkillsProfile {
  employeeId: number | string;
  companyId: number | string;
  generatedAt: string;
  providerTag: "gemini" | "fallback";
  modelUsed: string;
  isFallback: boolean;

  hasSufficientEvidence: boolean;
  insufficientEvidenceMessage?: string;
  latestAssessmentDate?: string;

  completedLearning: CompletedLearningItem[];
  demonstratedStrengths: DemonstratedStrength[];
  inferredKnowledgeGaps: InferredGap[];
  recommendedInterventions: RecommendedAction[];

  knowledgeProfile: {
    strengths: string[];
    gaps: string[];
    criticalGaps: string[];
  };

  disclaimer: string;
}

export interface SkillsGapProvider {
  analyzeSkillsGap(input: SkillsGapInput): Promise<EmployeeSkillsProfile>;
}

export class FallbackSkillsGapProvider implements SkillsGapProvider {
  async analyzeSkillsGap(input: SkillsGapInput): Promise<EmployeeSkillsProfile> {
    const completedCount = input.learningEvidence.completedCourses.length;
    const quizCount = input.learningEvidence.quizPerformance.length;

    const hasSufficientEvidence = completedCount > 0 || quizCount > 0;
    const insufficientEvidenceMessage = hasSufficientEvidence
      ? undefined
      : "More learning and assessment data is needed to identify a reliable pattern.";

    const completedLearning: CompletedLearningItem[] = input.learningEvidence.completedCourses.map((c) => {
      const topics = mapCourseToTopics(c).map((t) => t.label);
      return {
        courseId: c.courseId,
        courseCode: c.courseCode,
        title: c.title,
        completedAt: c.completedAt,
        score: c.score,
        topicsAddressed: topics,
      };
    });

    const demonstratedStrengths: DemonstratedStrength[] = [];
    const inferredKnowledgeGaps: InferredGap[] = [];
    const recommendedInterventions: RecommendedAction[] = [];

    const completedIds = new Set(input.learningEvidence.completedCourses.map((c) => c.courseId));
    const assignedIds = new Set(input.learningEvidence.assignedCourses.map((c) => c.courseId));

    // Find latest assessment timestamp
    let latestAssessmentDate: string | undefined = undefined;
    for (const quiz of input.learningEvidence.quizPerformance) {
      if (quiz.attemptTimestamp) {
        if (!latestAssessmentDate || quiz.attemptTimestamp > latestAssessmentDate) {
          latestAssessmentDate = quiz.attemptTimestamp;
        }
      }
    }
    for (const comp of input.learningEvidence.completedCourses) {
      if (comp.completedAt) {
        if (!latestAssessmentDate || comp.completedAt > latestAssessmentDate) {
          latestAssessmentDate = comp.completedAt;
        }
      }
    }

    // Group Quiz Performance by courseId for Repeated Attempts Analysis
    const quizByCourse = new Map<number, typeof input.learningEvidence.quizPerformance>();
    for (const quiz of input.learningEvidence.quizPerformance) {
      const existing = quizByCourse.get(quiz.courseId) || [];
      existing.push(quiz);
      quizByCourse.set(quiz.courseId, existing);
    }

    for (const [courseId, attempts] of quizByCourse.entries()) {
      const catalogCourse = input.catalog.find((c) => c.id === courseId);
      const topics = catalogCourse ? mapCourseToTopics(catalogCourse) : mapCourseToTopics({ id: courseId, title: attempts[0].courseTitle });
      const mainTopic = topics[0];

      const scores = attempts.map((a) => a.score);
      const firstScore = scores[0];
      const latestAttempt = attempts[attempts.length - 1];
      const latestScore = latestAttempt.score;
      const bestScore = Math.max(...scores);
      const attemptCount = attempts.length;

      // Classify trajectory
      if (attemptCount >= 2 && firstScore < 70 && latestScore >= 80) {
        // Improving Learner
        demonstratedStrengths.push({
          topicId: mainTopic.id,
          topicLabel: mainTopic.label,
          domain: mainTopic.domain,
          evidenceText: `Improving learner pattern on ${latestAttempt.courseTitle}: scores progressed from ${firstScore}% to ${latestScore}% across ${attemptCount} attempts.`,
          scoreOrMetric: `${latestScore}% (progressed from ${firstScore}%)`,
          trajectory: "improving_learner",
        });
      } else if (latestScore >= 80) {
        // Sustained Mastery or High Performance
        demonstratedStrengths.push({
          topicId: mainTopic.id,
          topicLabel: mainTopic.label,
          domain: mainTopic.domain,
          evidenceText: `Demonstrated strong assessment knowledge on ${latestAttempt.courseTitle} with a score of ${latestScore}%.`,
          scoreOrMetric: `${latestScore}%`,
          trajectory: attemptCount > 1 ? "sustained_mastery" : "standard",
        });
      } else if (attemptCount >= 2 && bestScore < 70 && latestScore < 70) {
        // Persistent Repeated Weakness
        inferredKnowledgeGaps.push({
          topicId: mainTopic.id,
          topicLabel: mainTopic.label,
          domain: mainTopic.domain,
          severity: "critical",
          reason: `Persistent repeated weakness on ${latestAttempt.courseTitle}: multiple attempts (${scores.join("%, ")}%) remained below pass threshold.`,
          evidence: `Attempt history: ${scores.join("%, ")}% across ${attemptCount} attempts.`,
          trajectory: "persistent_repeated_weakness",
        });
      } else if (bestScore >= 70 && latestScore < 70) {
        // Inconsistent Performance
        inferredKnowledgeGaps.push({
          topicId: mainTopic.id,
          topicLabel: mainTopic.label,
          domain: mainTopic.domain,
          severity: "moderate",
          reason: `Inconsistent performance on ${latestAttempt.courseTitle}: previously achieved ${bestScore}%, but latest attempt score dropped to ${latestScore}%.`,
          evidence: `Best: ${bestScore}%, Latest: ${latestScore}%.`,
          trajectory: "inconsistent_performance",
        });
      } else {
        // Single Initial Failure
        inferredKnowledgeGaps.push({
          topicId: mainTopic.id,
          topicLabel: mainTopic.label,
          domain: mainTopic.domain,
          severity: latestScore < 50 ? "critical" : "moderate",
          reason: `Assessment score of ${latestScore}% on ${latestAttempt.courseTitle} indicates incomplete topic mastery.`,
          evidence: `Quiz attempt score: ${latestScore}% (Passed: ${latestAttempt.passed ? "Yes" : "No"}).`,
          trajectory: "single_initial_failure",
        });
      }
    }

    // Analyze Company Priorities & Unassigned Gaps
    for (const priority of input.company.trainingPriorities) {
      const topics = mapCompanyPriorityToTopics(priority);
      for (const topic of topics) {
        const hasCompleted = input.learningEvidence.completedCourses.some((c) =>
          mapCourseToTopics(c).some((t) => t.id === topic.id)
        );

        if (!hasCompleted) {
          const existsInGaps = inferredKnowledgeGaps.some((g) => g.topicId === topic.id);
          if (!existsInGaps) {
            inferredKnowledgeGaps.push({
              topicId: topic.id,
              topicLabel: topic.label,
              domain: topic.domain,
              severity: "moderate",
              reason: `Company priority '${priority}' aligns with role but training has not yet been completed.`,
              evidence: `Company ESG Training Priority: ${priority}`,
              trajectory: "uncompleted_priority",
            });
          }
        }
      }
    }

    // Generate Recommended Interventions from Available Catalog
    for (const gap of inferredKnowledgeGaps) {
      const candidateCourse = input.catalog.find(
        (c) =>
          !completedIds.has(c.id) &&
          !assignedIds.has(c.id) &&
          mapCourseToTopics(c).some((t) => t.id === gap.topicId)
      );

      if (candidateCourse) {
        recommendedInterventions.push({
          courseId: candidateCourse.id,
          courseCode: candidateCourse.courseCode,
          title: candidateCourse.title,
          priority: gap.severity === "critical" ? "high" : "medium",
          rationale: `Targeted course to bridge identified knowledge gap in ${gap.topicLabel}.`,
          targetGapTopicId: gap.topicId,
        });
      }
    }

    const strengthsList = Array.from(new Set(demonstratedStrengths.map((s) => s.topicId)));
    const gapsList = Array.from(new Set(inferredKnowledgeGaps.map((g) => g.topicId)));
    const criticalGapsList = Array.from(new Set(inferredKnowledgeGaps.filter((g) => g.severity === "critical").map((g) => g.topicId)));

    return {
      employeeId: input.employee.employeeId,
      companyId: input.employee.companyId,
      generatedAt: new Date().toISOString(),
      providerTag: "fallback",
      modelUsed: "rule-based-fallback",
      isFallback: true,
      hasSufficientEvidence,
      insufficientEvidenceMessage,
      latestAssessmentDate,
      completedLearning,
      demonstratedStrengths,
      inferredKnowledgeGaps,
      recommendedInterventions,
      knowledgeProfile: {
        strengths: strengthsList,
        gaps: gapsList,
        criticalGaps: criticalGapsList,
      },
      disclaimer:
        "Course completion and quiz results reflect training exposure and assessment scores, not verified on-the-job professional competence.",
    };
  }
}

export class GeminiSkillsGapProvider implements SkillsGapProvider {
  private fallbackProvider = new FallbackSkillsGapProvider();

  async analyzeSkillsGap(input: SkillsGapInput): Promise<EmployeeSkillsProfile> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      logger.info({ provider: "fallback" }, "GEMINI_API_KEY missing. Using FallbackSkillsGapProvider.");
      return this.fallbackProvider.analyzeSkillsGap(input);
    }

    try {
      const prompt = `You are a corporate ESG learning & skills-gap AI engine for Morieva Skills.
Analyze the provided employee learning evidence, company ESG training priorities, and course catalog to generate a structured Employee Skills Profile.

TAXONOMY DOMAINS & TOPICS:
${JSON.stringify(KNOWLEDGE_TAXONOMY, null, 2)}

EMPLOYEE CONTEXT:
${JSON.stringify(input.employee, null, 2)}

COMPANY CONTEXT:
${JSON.stringify(input.company, null, 2)}

LEARNING EVIDENCE:
${JSON.stringify(input.learningEvidence, null, 2)}

AVAILABLE CATALOG (ONLY RECOMMEND COURSES FROM THIS LIST):
${JSON.stringify(input.catalog, null, 2)}

CRITICAL GROUNDING CONSTRAINTS:
1. Do NOT invent employee facts, completed courses, or quiz scores not present in the input data.
2. Distinctly separate completed learning vs demonstrated strengths vs inferred knowledge gaps.
3. Course completion proves training exposure, NOT workplace professional competence. Include a disclaimer.
4. Recommend courses ONLY from the provided catalog. Exclude already completed or assigned courses.
5. Return JSON matching EXACTLY this schema:

{
  "demonstratedStrengths": [
    {
      "topicId": "string (valid topic ID from taxonomy)",
      "topicLabel": "string",
      "domain": "environmental | social | governance",
      "evidenceText": "string explaining score/evidence",
      "scoreOrMetric": "string (e.g. 90%)"
    }
  ],
  "inferredKnowledgeGaps": [
    {
      "topicId": "string (valid topic ID from taxonomy)",
      "topicLabel": "string",
      "domain": "environmental | social | governance",
      "severity": "critical | moderate | low",
      "reason": "string explaining why gap is inferred",
      "evidence": "string citing evidence"
    }
  ],
  "recommendedInterventions": [
    {
      "courseId": number (must match a valid catalog course id),
      "courseCode": "string",
      "title": "string",
      "priority": "high | medium | optional",
      "rationale": "string",
      "targetGapTopicId": "string"
    }
  ]
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          }),
        }
      );

      if (!response.ok) {
        logger.warn({ provider: "fallback", status: response.status }, "Gemini API error. Falling back.");
        return this.fallbackProvider.analyzeSkillsGap(input);
      }

      const json = await response.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        logger.warn({ provider: "fallback" }, "Empty response from Gemini API. Falling back.");
        return this.fallbackProvider.analyzeSkillsGap(input);
      }

      const parsed = JSON.parse(text);

      const fallbackBase = await this.fallbackProvider.analyzeSkillsGap(input);

      // Validate & Ground Gemini Output
      const validCatalogIds = new Set(input.catalog.map((c) => c.id));
      const completedIds = new Set(input.learningEvidence.completedCourses.map((c) => c.courseId));
      const assignedIds = new Set(input.learningEvidence.assignedCourses.map((c) => c.courseId));

      const validatedInterventions: RecommendedAction[] = (parsed.recommendedInterventions || [])
        .filter((r: any) => validCatalogIds.has(r.courseId) && !completedIds.has(r.courseId) && !assignedIds.has(r.courseId))
        .map((r: any) => {
          const cat = input.catalog.find((c) => c.id === r.courseId)!;
          return {
            courseId: cat.id,
            courseCode: cat.courseCode,
            title: cat.title,
            priority: r.priority || "medium",
            rationale: r.rationale || `Recommended course to support ${cat.title}`,
            targetGapTopicId: r.targetGapTopicId || "sustainability_foundations",
          };
        });

      return {
        employeeId: input.employee.employeeId,
        companyId: input.employee.companyId,
        generatedAt: new Date().toISOString(),
        providerTag: "gemini",
        modelUsed: "gemini-3.6-flash",
        isFallback: false,
        hasSufficientEvidence: fallbackBase.hasSufficientEvidence,
        insufficientEvidenceMessage: fallbackBase.insufficientEvidenceMessage,
        latestAssessmentDate: fallbackBase.latestAssessmentDate,
        completedLearning: fallbackBase.completedLearning,
        demonstratedStrengths: parsed.demonstratedStrengths || fallbackBase.demonstratedStrengths,
        inferredKnowledgeGaps: parsed.inferredKnowledgeGaps || fallbackBase.inferredKnowledgeGaps,
        recommendedInterventions: validatedInterventions.length > 0 ? validatedInterventions : fallbackBase.recommendedInterventions,
        knowledgeProfile: fallbackBase.knowledgeProfile,
        disclaimer:
          "Course completion and quiz results reflect training exposure and assessment scores, not verified on-the-job professional competence.",
      };
    } catch (err: any) {
      logger.warn({ provider: "fallback", error: err?.message }, "Gemini API exception. Falling back.");
      return this.fallbackProvider.analyzeSkillsGap(input);
    }
  }
}
