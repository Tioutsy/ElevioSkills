import React from "react";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldAlert, Sparkles, Brain } from "lucide-react";

interface DemonstratedStrength {
  topicId: string;
  topicLabel: string;
  domain: string;
  evidenceText: string;
  scoreOrMetric?: string;
  trajectory?: string;
}

interface InferredGap {
  topicId: string;
  topicLabel: string;
  domain: string;
  severity: "critical" | "moderate" | "low";
  reason: string;
  evidence: string;
}

interface RecommendedAction {
  courseId: number;
  courseCode: string;
  title: string;
  priority: "high" | "medium" | "optional";
  rationale: string;
  targetGapTopicId: string;
}

interface SkillsProfileData {
  employeeId: number | string;
  hasSufficientEvidence: boolean;
  insufficientEvidenceMessage?: string;
  demonstratedStrengths: DemonstratedStrength[];
  inferredKnowledgeGaps: InferredGap[];
  recommendedInterventions: RecommendedAction[];
  disclaimer: string;
  providerTag: string;
  modelUsed: string;
}

export function LearnerSkillsProfileCard() {
  const { data: profile, isLoading, isError } = useQuery<SkillsProfileData>({
    queryKey: ["/api/learning/skills-profile"],
    queryFn: () => customFetch<SkillsProfileData>("/api/learning/skills-profile"),
  });

  if (isLoading) {
    return (
      <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4 mb-8">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError || !profile) {
    return null;
  }

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm mb-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif">Your Learning Profile</h2>
            <p className="text-xs text-muted-foreground">
              Evidence-based AI knowledge strengths & skill-gap assessment
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs font-mono bg-muted/50">
          <Sparkles className="h-3 w-3 mr-1 text-primary" />
          {profile.providerTag === "gemini" ? "Gemini AI Engine" : "Rule Engine v1"}
        </Badge>
      </div>

      {!profile.hasSufficientEvidence ? (
        <div className="p-4 bg-muted/40 rounded-lg border border-border text-center space-y-2">
          <p className="text-sm text-muted-foreground font-medium">
            {profile.insufficientEvidenceMessage || "More learning and assessment data is needed to identify a reliable pattern."}
          </p>
          <p className="text-xs text-muted-foreground">
            Complete assigned courses and attempt knowledge checks to unlock detailed skills profiling.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Demonstrated Strengths */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>Demonstrated Strengths</span>
            </div>
            {profile.demonstratedStrengths.length === 0 ? (
              <p className="text-xs text-muted-foreground italic bg-muted/30 p-3 rounded-lg">
                No demonstrated strength metrics recorded yet. Complete quizzes with high scores to display strengths.
              </p>
            ) : (
              <div className="space-y-2">
                {profile.demonstratedStrengths.map((str, idx) => (
                  <div key={idx} className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between font-medium text-slate-800">
                      <span>{str.topicLabel}</span>
                      {str.scoreOrMetric && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-[10px]">
                          {str.scoreOrMetric}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-[11px] line-clamp-2">{str.evidenceText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Areas to Strengthen (Gaps) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Areas to Strengthen</span>
            </div>
            {profile.inferredKnowledgeGaps.length === 0 ? (
              <p className="text-xs text-muted-foreground italic bg-muted/30 p-3 rounded-lg">
                No critical knowledge gaps detected across completed assessment modules.
              </p>
            ) : (
              <div className="space-y-2">
                {profile.inferredKnowledgeGaps.map((gap, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs space-y-1 ${
                      gap.severity === "critical"
                        ? "bg-red-500/5 border-red-500/30"
                        : "bg-amber-500/5 border-amber-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium text-slate-800">
                      <span>{gap.topicLabel}</span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase font-semibold ${
                          gap.severity === "critical"
                            ? "border-red-300 text-red-700 bg-red-50"
                            : "border-amber-300 text-amber-700 bg-amber-50"
                        }`}
                      >
                        {gap.severity}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-[11px]">{gap.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommended Next Step */}
      {profile.recommendedInterventions.length > 0 && (
        <div className="pt-4 border-t space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-1.5 text-primary">
            <ArrowRight className="h-4 w-4" /> Recommended Next Step
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {profile.recommendedInterventions.slice(0, 2).map((rec) => (
              <div key={rec.courseId} className="p-3 bg-primary/5 border rounded-lg flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-xs text-foreground">{rec.title}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {rec.courseCode}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{rec.rationale}</p>
                </div>
                <Link href={`/courses/detail?id=${rec.courseId}`}>
                  <Button size="sm" variant="default" className="w-full text-xs h-8">
                    View Recommended Course
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div className="pt-2 flex items-start gap-2 text-[11px] text-muted-foreground/80 bg-muted/20 p-2.5 rounded-md border border-border/50">
        <ShieldAlert className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
        <span>{profile.disclaimer}</span>
      </div>
    </div>
  );
}
