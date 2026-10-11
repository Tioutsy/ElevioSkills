import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import {
  FileText,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Users,
  BarChart2,
  Building,
  Target,
  BookOpen,
  Printer,
  ShieldCheck,
  Calendar,
  Zap,
} from "lucide-react";

export function MonthlyManagementBriefCard() {
  // Generate list of available reporting months (e.g. current month + last 3 months)
  const today = new Date();
  const months: string[] = [];
  for (let i = 0; i < 4; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    months.push(`${yr}-${mo}`);
  }

  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);

  const queryUrl = `/api/company/management-brief?month=${selectedMonth}`;

  const { data: brief, isLoading, isError, refetch } = useQuery<any>({
    queryKey: [queryUrl],
    queryFn: () => customFetch<any>(queryUrl),
  });

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-72" />
          <Skeleton className="h-9 w-36" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (isError || !brief) {
    return null;
  }

  const overview = brief.overview || {};
  const trends = brief.trends || {};
  const aiSummary = brief.aiExecutiveSummary || {};

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm mb-8 space-y-6 print:p-0 print:border-none print:shadow-none">
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-700 dark:text-emerald-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold font-serif">AI Monthly Management Brief</h2>
              <Badge variant="outline" className="text-xs font-mono bg-muted/40">
                <Sparkles className="h-3 w-3 mr-1 text-emerald-600" />
                {brief.providerTag === "gemini" ? "Gemini AI Engine" : "Deterministic Engine"}
              </Badge>
              <Badge variant="secondary" className="text-xs font-medium">
                {brief.reportingMonth} ({brief.periodStart} to {brief.periodEnd})
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Automated executive workforce synthesis for C-Suite, HR & ESG leadership
            </p>
          </div>
        </div>

        {/* Controls: Month Selector & Print Button */}
        <div className="flex items-center gap-2.5 print:hidden">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[140px] h-9 text-xs">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m} className="text-xs font-mono">
                    {m} {m === months[0] ? "(Current)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button size="sm" variant="outline" className="h-9 text-xs gap-1.5" onClick={handlePrint}>
            <Printer className="h-3.5 w-3.5" />
            <span>Export / Print</span>
          </Button>
        </div>
      </div>

      {!overview.hasSufficientEvidence ? (
        <div className="p-6 bg-muted/30 rounded-xl border border-dashed text-center space-y-3">
          <div className="p-3 bg-amber-500/10 text-amber-700 rounded-full w-fit mx-auto">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-sm">Insufficient Monthly Assessment Data</h3>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            {overview.insufficientEvidenceMessage || "More employee learning and assessment data is required before reliable company-level patterns can be identified."}
          </p>
          <div className="pt-2">
            <Link href="/company/employees">
              <Button size="sm" variant="outline" className="text-xs">
                Assign Courses & Quizzes
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Top KPI Summary Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/30 border rounded-xl space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>Active Learners</span>
                <Users className="h-3.5 w-3.5 text-primary" />
              </p>
              <div className="text-2xl font-bold flex items-baseline gap-2">
                <span>{overview.activeLearners}</span>
                <span className="text-xs font-normal text-muted-foreground">/ {overview.totalEmployees}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {Math.round((overview.completionRate || 0) * 100)}% learning participation
              </p>
            </div>

            <div className="p-4 bg-muted/30 border rounded-xl space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>Evidence Coverage</span>
                <BarChart2 className="h-3.5 w-3.5 text-emerald-600" />
              </p>
              <div className="text-2xl font-bold">
                {Math.round((overview.evidenceCoverageRate || 0) * 100)}%
              </div>
              <p className="text-[11px] text-muted-foreground">
                Evaluated quiz assessment records
              </p>
            </div>

            <div className="p-4 bg-muted/30 border rounded-xl space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>Assessment Pass Rate</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
              </p>
              <div className="text-2xl font-bold">
                {Math.round((overview.assessmentPassRate || 0) * 100)}%
              </div>
              <p className="text-[11px] text-muted-foreground">
                Across {overview.assessmentAttempts || 0} quiz attempts
              </p>
            </div>

            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-1">
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <span>Month-over-Month Trend</span>
                {trends.activeLearnersChange === "increased" ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                ) : trends.activeLearnersChange === "decreased" ? (
                  <TrendingDown className="h-3.5 w-3.5 text-amber-600" />
                ) : (
                  <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </p>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">
                {trends.hasPriorMonthData ? `Participation ${trends.activeLearnersChange}` : "Baseline Period"}
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {trends.summaryText || "Initial monthly tracking"}
              </p>
            </div>
          </div>

          {/* AI Executive Management Synthesis */}
          <div className="p-5 bg-gradient-to-br from-emerald-500/5 via-primary/5 to-muted/20 border border-emerald-500/20 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Executive Management Summary — {brief.reportingMonth}</span>
            </div>

            <p className="text-xs text-foreground font-medium leading-relaxed">
              {aiSummary.executiveSummary}
            </p>

            <div className="grid md:grid-cols-2 gap-3 pt-2 text-xs border-t border-emerald-500/10">
              <div className="space-y-1">
                <span className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> What Improved:
                </span>
                <p className="text-muted-foreground leading-snug">{aiSummary.whatImproved}</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-amber-800 dark:text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" /> What Needs Attention:
                </span>
                <p className="text-muted-foreground leading-snug">{aiSummary.whatNeedsAttention}</p>
              </div>
            </div>
          </div>

          {/* Emerging Gaps & Priority Knowledge Focus */}
          {brief.emergingGaps?.length > 0 && (
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>Emerging Knowledge Gap Alert</span>
              </div>
              <div className="space-y-2">
                {brief.emergingGaps.map((eg: any, idx: number) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 bg-amber-500/10 p-2.5 rounded-lg">
                    <div>
                      <span className="font-semibold text-foreground">{eg.topicLabel}</span>
                      <span className="text-muted-foreground"> ({eg.impactedDepartment}): </span>
                      <span className="text-muted-foreground">{eg.reason}</span>
                    </div>
                    <Badge variant="outline" className="w-fit text-[10px] border-amber-300 text-amber-800 bg-amber-50 shrink-0">
                      Emerging Gap
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Department Highlights */}
          {brief.departmentHighlights?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Building className="h-4 w-4 text-primary" /> Department Highlights
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {brief.departmentHighlights.map((dept: any) => (
                  <div key={dept.department} className="p-3.5 bg-card border rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{dept.department}</span>
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
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {dept.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Priority Actions */}
          {brief.recommendedActions?.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Target className="h-4 w-4 text-primary" /> Recommended Priority Actions for Next Month
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {brief.recommendedActions.slice(0, 4).map((rec: any, idx: number) => (
                  <div key={idx} className="p-4 bg-muted/20 border rounded-xl space-y-2 flex flex-col justify-between text-xs">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary font-semibold">
                          WHO: {rec.who}
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
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 italic">
                        <span className="font-semibold">Outcome:</span> {rec.expectedLearningOutcome}
                      </p>
                    </div>

                    <div className="pt-2 print:hidden">
                      <Link href={`/courses/detail?id=${rec.courseId}`}>
                        <Button size="sm" variant="default" className="w-full text-xs h-8">
                          View Course & Assign
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

      {/* Mandatory Management Disclaimer */}
      <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-muted/20 p-2.5 rounded-lg border border-border/50">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
        <span>{brief.managementNote}</span>
      </div>
    </div>
  );
}
