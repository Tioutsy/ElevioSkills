import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Award,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronDown,
  ChevronUp,
  Leaf,
  Users,
  Building2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Target,
} from "lucide-react";

export function ESGWorkforceReadinessCard() {
  const [showMethodology, setShowMethodology] = useState<boolean>(false);

  const queryUrl = `/api/company/workforce-readiness`;

  const { data: readiness, isLoading, isError } = useQuery<any>({
    queryKey: [queryUrl],
    queryFn: () => customFetch<any>(queryUrl),
  });

  if (isLoading) {
    return (
      <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-80" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !readiness) {
    return null;
  }

  const overall = readiness.overall || {};
  const domains = readiness.domains || {};
  const trend = readiness.trend || {};
  const interpretation = readiness.interpretation || {};
  const depts = readiness.departmentReadiness || [];

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm mb-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-700 dark:text-emerald-400">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold font-serif">ESG Workforce Readiness Indicator</h2>
              <Badge
                variant="outline"
                className={`text-xs font-semibold ${
                  overall.band === "Strong"
                    ? "border-emerald-300 text-emerald-800 bg-emerald-50"
                    : overall.band === "Established"
                    ? "border-blue-300 text-blue-800 bg-blue-50"
                    : overall.band === "Developing"
                    ? "border-amber-300 text-amber-800 bg-amber-50"
                    : "border-slate-300 text-slate-800 bg-slate-50"
                }`}
              >
                {overall.band || "Early"} Band
              </Badge>
              <Badge variant="secondary" className="text-xs font-medium">
                {overall.evidenceConfidence || "LOW"} Confidence
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Evidence-based workforce learning readiness benchmark across ESG topics
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="text-xs gap-1.5 h-8 w-fit"
          onClick={() => setShowMethodology(!showMethodology)}
        >
          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          <span>How this score is calculated</span>
          {showMethodology ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* Methodology Explainer Collapse */}
      {showMethodology && (
        <div className="p-4 bg-muted/30 border rounded-xl space-y-3 text-xs leading-relaxed text-muted-foreground">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Info className="h-4 w-4 text-primary" />
            <span>Methodology & Weighting Model (v1)</span>
          </div>
          <p>
            The ESG Workforce Readiness score (0–100) is calculated deterministically from verified platform learning and quiz assessment records. It combines five key evidence weighted components:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
            <div className="p-2 bg-background border rounded-lg">
              <span className="font-bold text-foreground">25% Coverage Rate</span>
              <p className="text-[10px] text-muted-foreground">Ratio of evaluated employees</p>
            </div>
            <div className="p-2 bg-background border rounded-lg">
              <span className="font-bold text-foreground">30% Demonstrated Knowledge</span>
              <p className="text-[10px] text-muted-foreground">Quiz pass rate & mastery</p>
            </div>
            <div className="p-2 bg-background border rounded-lg">
              <span className="font-bold text-foreground">25% Priority Coverage</span>
              <p className="text-[10px] text-muted-foreground">Declared company priorities</p>
            </div>
            <div className="p-2 bg-background border rounded-lg">
              <span className="font-bold text-foreground">20% Department Spread</span>
              <p className="text-[10px] text-muted-foreground">Multi-unit participation</p>
            </div>
          </div>
          <p className="text-[11px] italic">
            * Subtractions up to -15 points apply for critical unaddressed assessment gaps across departments.
          </p>
        </div>
      )}

      {readiness.status === "insufficient_evidence" ? (
        <div className="p-6 bg-muted/20 border border-dashed rounded-xl text-center space-y-3">
          <div className="p-3 bg-amber-500/10 text-amber-700 rounded-full w-fit mx-auto">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-sm">Insufficient Assessment Evidence</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            {overall.insufficientEvidenceMessage || "More employee learning and assessment data is required before a reliable workforce readiness indicator can be calculated."}
          </p>
        </div>
      ) : (
        <>
          {/* Main Score & E / S / G Subscores */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Overall Score Box */}
            <div className="p-5 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-muted/20 border border-emerald-500/30 rounded-xl space-y-2 flex flex-col justify-between">
              <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center justify-between">
                <span>Overall Readiness</span>
                <Award className="h-4 w-4 text-emerald-600" />
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-foreground">{overall.score}</span>
                <span className="text-sm font-semibold text-muted-foreground">/ 100</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {trend.direction === "improving" ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" /> +{trend.change} pts
                  </span>
                ) : trend.direction === "declining" ? (
                  <span className="text-amber-600 font-bold flex items-center gap-1">
                    <TrendingDown className="h-3.5 w-3.5" /> {trend.change} pts
                  </span>
                ) : (
                  <span className="font-medium">Baseline</span>
                )}
                <span className="text-[11px]">vs prior period</span>
              </div>
            </div>

            {/* Environmental Subscore */}
            <div className="p-4 bg-muted/30 border rounded-xl space-y-1">
              <p className="text-xs font-semibold text-muted-foreground flex items-center justify-between">
                <span>Environmental (E)</span>
                <Leaf className="h-3.5 w-3.5 text-emerald-600" />
              </p>
              <div className="text-2xl font-bold">
                {domains.environmental?.score !== null ? `${domains.environmental.score} / 100` : "—"}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {domains.environmental?.status === "sufficient" ? "Waste, Energy, Carbon" : "Insufficient Sample"}
              </p>
            </div>

            {/* Social Subscore */}
            <div className="p-4 bg-muted/30 border rounded-xl space-y-1">
              <p className="text-xs font-semibold text-muted-foreground flex items-center justify-between">
                <span>Social (S)</span>
                <Users className="h-3.5 w-3.5 text-blue-600" />
              </p>
              <div className="text-2xl font-bold">
                {domains.social?.score !== null ? `${domains.social.score} / 100` : "—"}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {domains.social?.status === "sufficient" ? "DEI, Safety, Engagement" : "Insufficient Sample"}
              </p>
            </div>

            {/* Governance Subscore */}
            <div className="p-4 bg-muted/30 border rounded-xl space-y-1">
              <p className="text-xs font-semibold text-muted-foreground flex items-center justify-between">
                <span>Governance (G)</span>
                <Building2 className="h-3.5 w-3.5 text-purple-600" />
              </p>
              <div className="text-2xl font-bold">
                {domains.governance?.score !== null ? `${domains.governance.score} / 100` : "—"}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {domains.governance?.status === "sufficient" ? "Ethics, Data, Supply Chain" : "Insufficient Sample"}
              </p>
            </div>
          </div>

          {/* AI / Rule-based Interpretation Summary */}
          <div className="p-4 bg-muted/20 border rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Executive Readiness Narrative</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {interpretation.summary}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              <div>
                <span className="font-semibold text-foreground">Strongest Area: </span>
                <Badge variant="outline" className="text-[11px] border-emerald-300 text-emerald-800 bg-emerald-50">
                  {interpretation.strongestArea}
                </Badge>
              </div>
              <div>
                <span className="font-semibold text-foreground">Priority Gap Focus: </span>
                <Badge variant="outline" className="text-[11px] border-amber-300 text-amber-800 bg-amber-50">
                  {interpretation.priorityArea}
                </Badge>
              </div>
            </div>
          </div>

          {/* Department Readiness Breakdown */}
          {depts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Target className="h-4 w-4 text-primary" /> Department Readiness Scores
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {depts.map((d: any) => (
                  <div key={d.department} className="p-3 bg-card border rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-foreground">{d.department}</span>
                      <p className="text-[11px] text-muted-foreground">{d.learnerCount} active employees</p>
                    </div>
                    {d.score !== null ? (
                      <span className="text-base font-extrabold text-foreground">{d.score} / 100</span>
                    ) : (
                      <Badge variant="outline" className="text-[10px] border-amber-300 text-amber-800 bg-amber-50">
                        Insufficient Sample
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Mandatory Regulatory / Non-Certification Disclaimer */}
      <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-muted/20 p-2.5 rounded-lg border border-border/50">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
        <span>{readiness.disclaimer}</span>
      </div>
    </div>
  );
}
