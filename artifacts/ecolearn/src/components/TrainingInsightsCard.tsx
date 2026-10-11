import React, { useState } from "react";
import { useCompanyTrainingInsights, useCompanyTrainingActions } from "@/lib/lms-api";
import {
  TrainingActionConfirmationModal,
  ActionModalConfig,
} from "./TrainingActionConfirmationModal";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  BarChart2,
  Users,
  BookOpen,
  HelpCircle,
  Clock,
  ChevronRight,
  ShieldAlert,
  Building2,
  X,
  FileText,
  Mail,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function TrainingInsightsCard() {
  const [forceRefresh, setForceRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ActionModalConfig | null>(null);

  const { data: insights, isLoading, isError, refetch, isFetching } = useCompanyTrainingInsights(forceRefresh);
  const { data: actionsData } = useCompanyTrainingActions();

  const handleRefresh = () => {
    setForceRefresh(true);
    refetch().finally(() => setForceRefresh(false));
  };

  if (isLoading) {
    return (
      <Card className="border rounded-xl shadow-sm mb-8 animate-pulse">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="h-6 w-48 bg-muted rounded mb-2"></div>
          <div className="h-4 w-80 bg-muted/70 rounded"></div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="h-20 bg-muted/40 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-muted/40 rounded-lg"></div>
            <div className="h-32 bg-muted/40 rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !insights) {
    return (
      <Card className="border border-amber-200 bg-amber-50/50 rounded-xl shadow-sm mb-8 p-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
          <div className="flex-1 text-sm text-amber-800">
            <p className="font-medium">Training Insights Unavailable</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Unable to load organization training insights right now. Your standard LMS reporting remains fully active.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="text-xs border-amber-300">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Retry
          </Button>
        </div>
      </Card>
    );
  }

  const {
    summary,
    needsAttention,
    positiveSignals,
    recommendedNextAction,
    organisationSummary,
    coursePerformance,
    departmentPerformance,
    learnerRiskSummary,
    isFallback,
  } = insights;

  const hasNoData = organisationSummary.totalActiveLearners === 0;

  return (
    <Card className="border rounded-xl shadow-sm mb-8 overflow-hidden bg-card">
      {/* Header */}
      <CardHeader className="bg-muted/40 border-b p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-lg font-bold">Training Insights</CardTitle>
              <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                AI Analysis Engine v1
              </Badge>
              {isFallback && (
                <Badge variant="secondary" className="text-[10px] bg-muted text-muted-foreground">
                  Deterministic
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              AI-assisted interpretation of your organisation's real learning and assessment activity.
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isFetching}
            className="text-xs h-8 text-muted-foreground hover:text-foreground"
            title="Refresh Insights"
          >
            <RefreshCw className={cn("h-3.5 w-3.5 mr-1.5", isFetching && "animate-spin")} />
            Refresh
          </Button>

          {/* View Insights Dialog Trigger */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 gap-1.5">
                <BarChart2 className="h-3.5 w-3.5" />
                View Detailed Insights
              </Button>
            </DialogTrigger>

            {/* Detailed Insights Modal */}
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-bold">
                      {insights.companyName} — Training Insights Report
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                      Comprehensive organizational analysis of learning, course performance, and department metrics.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 my-2 text-sm">
                {/* 1. Organisation High-Level Summary Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/30 rounded-xl border">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Active Learners</p>
                    <p className="text-xl font-bold text-foreground mt-0.5">{organisationSummary.totalActiveLearners}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Overall Completion</p>
                    <p className="text-xl font-bold text-emerald-600 mt-0.5">{organisationSummary.overallCompletionPct}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Overdue Learners</p>
                    <p
                      className={cn(
                        "text-xl font-bold mt-0.5",
                        organisationSummary.overdueLearnersCount > 0 ? "text-amber-600" : "text-emerald-600"
                      )}
                    >
                      {organisationSummary.overdueLearnersCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Quiz Retries Risk</p>
                    <p
                      className={cn(
                        "text-xl font-bold mt-0.5",
                        learnerRiskSummary.repeatQuizFailuresCount > 0 ? "text-amber-600" : "text-foreground"
                      )}
                    >
                      {learnerRiskSummary.repeatQuizFailuresCount}
                    </p>
                  </div>
                </div>

                {/* 2. Executive Summary */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl text-emerald-900 leading-relaxed">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Executive AI Finding
                  </p>
                  <p className="text-sm font-medium">{summary}</p>
                </div>

                {/* 3. Course Performance Table */}
                <div>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-emerald-600" /> Course Performance Breakdown
                  </h4>
                  {coursePerformance.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic p-4 bg-muted/20 rounded-lg">
                      No course assignments recorded for this organization yet.
                    </p>
                  ) : (
                    <div className="border rounded-lg overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-muted/50 border-b text-muted-foreground font-medium">
                          <tr>
                            <th className="p-3">Course</th>
                            <th className="p-3">Assigned</th>
                            <th className="p-3">Completed</th>
                            <th className="p-3">Completion %</th>
                            <th className="p-3">Failure Rate</th>
                            <th className="p-3">Overdue</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {coursePerformance.map((course) => (
                            <tr key={course.courseId} className="hover:bg-muted/30">
                              <td className="p-3 font-medium">
                                <span className="font-mono text-emerald-700 font-bold mr-1.5">
                                  {course.courseCode}
                                </span>
                                {course.title}
                              </td>
                              <td className="p-3">{course.assignedCount}</td>
                              <td className="p-3">{course.completedCount}</td>
                              <td className="p-3 font-semibold">{course.completionRatePct}%</td>
                              <td className="p-3">
                                {course.failureRatePct > 0 ? (
                                  <span
                                    className={cn(
                                      "px-1.5 py-0.5 rounded font-medium",
                                      course.failureRatePct >= 30
                                        ? "bg-destructive/10 text-destructive"
                                        : "bg-amber-100 text-amber-800"
                                    )}
                                  >
                                    {course.failureRatePct}%
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">0%</span>
                                )}
                              </td>
                              <td className="p-3">
                                {course.overdueAssignmentsCount > 0 ? (
                                  <span className="text-amber-600 font-medium">{course.overdueAssignmentsCount}</span>
                                ) : (
                                  <span className="text-muted-foreground">0</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* 4. Department Performance Breakdown */}
                {departmentPerformance.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-emerald-600" /> Department Performance Breakdown
                    </h4>
                    <div className="border rounded-lg overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-muted/50 border-b text-muted-foreground font-medium">
                          <tr>
                            <th className="p-3">Department</th>
                            <th className="p-3">Employees</th>
                            <th className="p-3">Completion %</th>
                            <th className="p-3">Avg Quiz Score</th>
                            <th className="p-3">Overdue Count</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {departmentPerformance.map((dept, idx) => (
                            <tr key={idx} className="hover:bg-muted/30">
                              <td className="p-3 font-medium">{dept.departmentName}</td>
                              <td className="p-3">{dept.employeeCount}</td>
                              <td className="p-3 font-semibold">{dept.completionRatePct}%</td>
                              <td className="p-3">{dept.avgQuizScore}%</td>
                              <td className="p-3">
                                {dept.overdueCount > 0 ? (
                                  <span className="text-amber-600 font-medium">{dept.overdueCount}</span>
                                ) : (
                                  <span className="text-muted-foreground">0</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {hasNoData ? (
          <div className="py-8 text-center text-muted-foreground space-y-2">
            <HelpCircle className="h-10 w-10 text-muted-foreground/50 mx-auto" />
            <p className="font-medium text-sm">No Active Learning Activity Yet</p>
            <p className="text-xs max-w-sm mx-auto text-muted-foreground">
              Training insights will appear once your organisation assigns courses and employees begin learning.
            </p>
            <Button
              asChild
              size="sm"
              className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5"
            >
              <a href="/company/assignments">
                Assign Courses Now <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        ) : (
          <>
            {/* Executive AI Summary Banner */}
            <div className="p-4 bg-muted/30 border rounded-xl flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed text-foreground">
                <span className="font-semibold text-emerald-800 mr-1.5">Executive Summary:</span>
                {summary}
              </div>
            </div>

            {/* Needs Attention Section */}
            {needsAttention.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" /> Areas Needing Attention ({needsAttention.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {needsAttention.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-background border rounded-xl shadow-2xs hover:border-emerald-200 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                            {item.title}
                          </h5>
                          <Badge
                            variant={item.priority === "high" ? "destructive" : "secondary"}
                            className="text-[10px] uppercase shrink-0"
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.explanation}</p>
                      </div>

                      <div className="pt-2 border-t flex items-center justify-between gap-2">
                        <span className="text-[11px] text-muted-foreground font-medium truncate">
                          {item.recommendedAction}
                        </span>
                        <a
                          href={item.targetUrl}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 shrink-0"
                        >
                          Action <ChevronRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Positive Signals Section */}
            {positiveSignals.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Positive Progress Signals
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {positiveSignals.map((signal) => (
                    <div
                      key={signal.id}
                      className="p-3.5 bg-emerald-50/40 border border-emerald-200/60 rounded-xl flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-xs text-emerald-950">{signal.title}</h5>
                        <p className="text-xs text-emerald-800/90 mt-0.5 leading-relaxed">{signal.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Next Action Banner */}
            {recommendedNextAction && (
              <div className="p-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-800/80 text-emerald-200 border-emerald-700 text-[10px]">
                      Recommended Priority Action
                    </Badge>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base">{recommendedNextAction.title}</h4>
                  <p className="text-xs text-emerald-100/90 max-w-xl leading-relaxed">
                    {recommendedNextAction.description}
                  </p>
                </div>
                <Button
                  asChild
                  className="bg-white hover:bg-emerald-50 text-emerald-950 font-semibold text-xs h-9 px-4 shrink-0 shadow-2xs"
                >
                  <a href={recommendedNextAction.actionUrl}>
                    {recommendedNextAction.actionLabel} <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </a>
                </Button>
              </div>
            )}
          </>
        )}

        {/* Confirmation Modal for Quick Actions */}
        <TrainingActionConfirmationModal
          isOpen={!!modalConfig}
          onClose={() => setModalConfig(null)}
          config={modalConfig}
          onSuccess={handleRefresh}
        />
      </CardContent>
    </Card>
  );
}
