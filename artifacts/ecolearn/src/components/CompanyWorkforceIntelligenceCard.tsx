import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import {
  Brain,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  ArrowRight,
  BarChart3,
  Building,
  Target,
  BookOpen,
} from "lucide-react";

export function CompanyWorkforceIntelligenceCard() {
  const [selectedDept, setSelectedDept] = useState<string>("all");

  const queryUrl = selectedDept && selectedDept !== "all"
    ? `/api/company/workforce-intelligence?department=${encodeURIComponent(selectedDept)}`
    : "/api/company/workforce-intelligence";

  const { data: intelligence, isLoading, isError } = useQuery<any>({
    queryKey: [queryUrl],
    queryFn: () => customFetch<any>(queryUrl),
  });

  if (isLoading) {
    return (
      <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4 mb-8">
        <Skeleton className="h-6 w-64" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !intelligence) {
    return null;
  }

  const allDepts: string[] = intelligence.departmentSummaries?.map((d: any) => d.department) || [];

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm mb-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-serif">ESG Workforce Intelligence</h2>
              <Badge variant="outline" className="text-xs font-mono bg-muted/40">
                <Sparkles className="h-3 w-3 mr-1 text-primary" />
                {intelligence.providerTag === "gemini" ? "Gemini AI Engine" : "Deterministic Engine"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Aggregated organization-wide skills profiles, evidence coverage & department analytics
            </p>
          </div>
        </div>

        {/* Department Filter */}
        {allDepts.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium shrink-0">Filter Dept:</span>
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-[180px] h-9 text-xs">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Departments</SelectItem>
                {allDepts.map((d) => (
                  <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {!intelligence.hasSufficientEvidence ? (
        <div className="p-6 bg-muted/30 rounded-xl border border-dashed text-center space-y-3">
          <div className="p-3 bg-amber-500/10 text-amber-700 rounded-full w-fit mx-auto">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-sm">Insufficient Employee Assessment Evidence</h3>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            {intelligence.insufficientEvidenceMessage || "More employee learning and assessment data is required before reliable company-level patterns can be identified."}
          </p>
          <div className="pt-2">
            <Link href="/company/employees">
              <Button size="sm" variant="outline" className="text-xs">
                Assign Courses & Assessments
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Top 4 KPI Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/30 border rounded-xl space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>Learning Participation</span>
                <Users className="h-3.5 w-3.5 text-primary" />
              </p>
              <div className="text-2xl font-bold">
                {Math.round(intelligence.learningParticipationRate * 100)}%
              </div>
              <p className="text-[11px] text-muted-foreground">
                {intelligence.activeLearnersCount} of {intelligence.totalEmployees} active learners
              </p>
            </div>

            <div className="p-4 bg-muted/30 border rounded-xl space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>Evidence Coverage</span>
                <BarChart3 className="h-3.5 w-3.5 text-emerald-600" />
              </p>
              <div className="text-2xl font-bold">
                {Math.round(intelligence.evidenceCoverageRate * 100)}%
              </div>
              <p className="text-[11px] text-muted-foreground">
                {intelligence.learnersWithEvidenceCount} learners with assessment profiles
              </p>
            </div>

            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl space-y-1">
              <p className="text-xs font-semibold text-green-800 flex items-center justify-between">
                <span>Top Knowledge Area</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
              </p>
              <div className="text-base font-bold text-slate-800 truncate">
                {intelligence.topCompanyStrengths?.[0]?.topicLabel || "General Literacy"}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {intelligence.topCompanyStrengths?.[0]?.strengthCount || 0} learners demonstrated mastery
              </p>
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-1">
              <p className="text-xs font-semibold text-amber-800 flex items-center justify-between">
                <span>Priority Knowledge Gap</span>
                <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
              </p>
              <div className="text-base font-bold text-slate-800 truncate">
                {intelligence.topCompanyGaps?.[0]?.topicLabel || "None Flagged"}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {intelligence.topCompanyGaps?.[0]?.gapCount || 0} assessment gaps detected
              </p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Brain className="h-4 w-4" />
              <span>Executive Management Summary</span>
            </div>
            <p className="text-xs text-foreground leading-relaxed">
              {intelligence.executiveSummary}
            </p>
          </div>

          {/* Domain Distribution */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              ESG Domain Overview
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 bg-muted/20 border rounded-lg text-xs space-y-1">
                <span className="font-semibold text-emerald-800 block">Environmental</span>
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>Strengths: {intelligence.domainDistribution?.environmental?.strengthCount || 0}</span>
                  <span>Gaps: {intelligence.domainDistribution?.environmental?.gapCount || 0} ({intelligence.domainDistribution?.environmental?.criticalGapCount || 0} critical)</span>
                </div>
              </div>

              <div className="p-3 bg-muted/20 border rounded-lg text-xs space-y-1">
                <span className="font-semibold text-blue-800 block">Social Responsibility</span>
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>Strengths: {intelligence.domainDistribution?.social?.strengthCount || 0}</span>
                  <span>Gaps: {intelligence.domainDistribution?.social?.gapCount || 0} ({intelligence.domainDistribution?.social?.criticalGapCount || 0} critical)</span>
                </div>
              </div>

              <div className="p-3 bg-muted/20 border rounded-lg text-xs space-y-1">
                <span className="font-semibold text-amber-800 block">Governance & Ethics</span>
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>Strengths: {intelligence.domainDistribution?.governance?.strengthCount || 0}</span>
                  <span>Gaps: {intelligence.domainDistribution?.governance?.gapCount || 0} ({intelligence.domainDistribution?.governance?.criticalGapCount || 0} critical)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Insights Breakdown */}
          {intelligence.departmentSummaries?.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Department Insights & Sample Status
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {intelligence.departmentSummaries.map((dept: any) => (
                  <div key={dept.department} className="p-3.5 bg-card border rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-muted-foreground" />
                        {dept.department}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          dept.hasSufficientSample
                            ? "border-emerald-300 text-emerald-800 bg-emerald-50"
                            : "border-amber-300 text-amber-800 bg-amber-50"
                        }`}
                      >
                        {dept.hasSufficientSample ? "Evaluated" : "Insufficient Sample"}
                      </Badge>
                    </div>

                    <div className="text-[11px] text-muted-foreground flex justify-between">
                      <span>Learners: {dept.learnerCount}</span>
                      <span>Coverage: {Math.round(dept.evidenceCoverage * 100)}% ({dept.learnersWithEvidenceCount} tested)</span>
                    </div>

                    {dept.hasSufficientSample ? (
                      <div className="space-y-1 pt-1 border-t text-[11px]">
                        {dept.topStrengths?.length > 0 && (
                          <p className="text-emerald-700 truncate">
                            <span className="font-semibold">Strengths:</span> {dept.topStrengths.join(", ")}
                          </p>
                        )}
                        {dept.topGaps?.length > 0 && (
                          <p className="text-amber-700 truncate">
                            <span className="font-semibold">Growth Areas:</span> {dept.topGaps.join(", ")}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-[10px] text-muted-foreground italic pt-1 border-t">
                        Requires at least 2 tested learners to produce department-wide insights.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Priority Actions */}
          {intelligence.recommendedActions?.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Target className="h-4 w-4 text-primary" /> Recommended Priority Training Actions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {intelligence.recommendedActions.slice(0, 4).map((rec: any, idx: number) => (
                  <div key={idx} className="p-4 bg-muted/20 border rounded-xl space-y-2 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary font-semibold">
                          TARGET: {rec.who}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-[10px] uppercase font-semibold ${
                            rec.priority === "high"
                              ? "border-red-300 text-red-700 bg-red-50"
                              : "border-amber-300 text-amber-700 bg-amber-50"
                          }`}
                        >
                          {rec.priority} Priority
                        </Badge>
                      </div>
                      <div className="font-semibold text-xs text-foreground flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span>{rec.title} ({rec.courseCode})</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{rec.why}</p>
                      <p className="text-[11px] text-slate-700 italic">
                        <span className="font-semibold">Expected Outcome:</span> {rec.expectedLearningOutcome}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link href={`/courses/detail?id=${rec.courseId}`}>
                        <Button size="sm" variant="default" className="w-full text-xs h-8">
                          View Course Details & Assign
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Mandatory Disclaimer */}
      <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-muted/20 p-2.5 rounded-lg border border-border/50">
        <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
        <span>{intelligence.disclaimer}</span>
      </div>
    </div>
  );
}
