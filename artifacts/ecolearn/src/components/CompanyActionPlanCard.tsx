import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ListTodo,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
  XCircle,
  Clock,
  RotateCw,
} from "lucide-react";

export function CompanyActionPlanCard() {
  const queryClient = useQueryClient();
  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  const queryUrl = `/api/company/action-plan`;

  const { data: plan, isLoading, isError, refetch, isFetching } = useQuery<any>({
    queryKey: [queryUrl],
    queryFn: () => customFetch<any>(queryUrl),
  });

  const acceptMutation = useMutation({
    mutationFn: (actionId: string) => customFetch<any>(`/api/company/action-plan/${actionId}/accept`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryUrl] }),
  });

  const dismissMutation = useMutation({
    mutationFn: (actionId: string) => customFetch<any>(`/api/company/action-plan/${actionId}/dismiss`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryUrl] }),
  });

  const completeMutation = useMutation({
    mutationFn: (actionId: string) => customFetch<any>(`/api/company/action-plan/${actionId}/complete`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryUrl] }),
  });

  if (isLoading) {
    return (
      <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4 mb-8">
        <Skeleton className="h-6 w-80" />
        <div className="grid gap-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !plan || !plan.actions || plan.actions.length === 0) {
    return null;
  }

  const toggleExpand = (actionId: string) => {
    setExpandedAction(expandedAction === actionId ? null : actionId);
  };

  // Sort actions by priority: high > medium > low
  const activeActions = plan.actions.filter((a: any) => a.status !== "dismissed");
  const sortedActions = [...activeActions].sort((a: any, b: any) => {
    const pRank: Record<string, number> = { high: 1, medium: 2, low: 3 };
    return (pRank[a.priority] || 2) - (pRank[b.priority] || 2);
  });

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm mb-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
            <ListTodo className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold font-serif">AI Recommended Action Plan</h2>
              <Badge variant="secondary" className="text-xs font-semibold gap-1 bg-primary/10 text-primary">
                <Sparkles className="h-3 w-3" /> Grounded Roadmap
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Prioritised, evidence-backed workforce learning actions for company administrators
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 gap-1.5"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RotateCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            <span>Refresh Plan</span>
          </Button>
          <Badge variant="outline" className="text-xs font-mono w-fit">
            {sortedActions.length} Active Actions
          </Badge>
        </div>
      </div>

      {/* Executive Overview Summary */}
      {plan.summary && (
        <div className="p-4 bg-muted/20 border rounded-xl text-xs leading-relaxed text-foreground flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Executive Summary: </span>
            <span className="text-muted-foreground">{plan.summary}</span>
          </div>
        </div>
      )}

      {/* Actions List */}
      <div className="space-y-3">
        {sortedActions.map((act: any) => {
          const isExpanded = expandedAction === act.id;
          const isAccepted = act.status === "accepted" || act.status === "in_progress";
          const isCompleted = act.status === "completed";

          return (
            <div
              key={act.id}
              className={`p-4 border rounded-xl transition-all ${
                isCompleted
                  ? "bg-emerald-500/5 border-emerald-300 dark:border-emerald-800"
                  : isAccepted
                  ? "bg-blue-500/5 border-blue-300 dark:border-blue-800"
                  : act.priority === "high"
                  ? "bg-card border-amber-300/80 dark:border-amber-900/50"
                  : "bg-card border-border"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold ${
                        act.priority === "high"
                          ? "border-amber-400 text-amber-800 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-300"
                          : "border-slate-300 text-slate-800 bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {act.priority.toUpperCase()} PRIORITY
                    </Badge>

                    <Badge variant="secondary" className="text-[11px] font-medium flex items-center gap-1">
                      <UserCheck className="h-3 w-3" />
                      WHO: {act.who.label}
                    </Badge>

                    <Badge variant="outline" className="text-[10px] uppercase font-mono">
                      WHAT: {act.what.type.replace(/_/g, " ")}
                    </Badge>

                    {act.status && (
                      <Badge
                        variant="secondary"
                        className={`text-[10px] font-bold ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-800"
                            : isAccepted
                            ? "bg-blue-100 text-blue-800"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        STATUS: {act.status.toUpperCase()}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary shrink-0" />
                    <span>
                      {act.what.courseCode ? `${act.what.courseCode}: ` : ""}
                      {act.what.courseTitle || act.what.type}
                    </span>
                  </h3>

                  <div>
                    <span className="text-xs font-semibold text-foreground">WHY: </span>
                    <span className="text-xs text-muted-foreground leading-relaxed">{act.why}</span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-foreground">EXPECTED OUTCOME: </span>
                    <span className="text-xs text-muted-foreground leading-relaxed">{act.expectedLearningOutcome}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-8 text-muted-foreground gap-1"
                    onClick={() => toggleExpand(act.id)}
                  >
                    <Info className="h-3.5 w-3.5" />
                    <span>Evidence</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </Button>

                  {isCompleted ? (
                    <Button size="sm" variant="outline" disabled className="text-xs h-8 gap-1.5 border-emerald-300 text-emerald-700 bg-emerald-50">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </Button>
                  ) : isAccepted ? (
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8 gap-1.5 border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                        onClick={() => completeMutation.mutate(act.id)}
                        disabled={completeMutation.isPending}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Mark Complete
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="default"
                        className="text-xs h-8 gap-1.5"
                        onClick={() => acceptMutation.mutate(act.id)}
                        disabled={acceptMutation.isPending}
                      >
                        <span>Accept & Assign</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs h-8 text-muted-foreground hover:text-destructive gap-1"
                        onClick={() => dismissMutation.mutate(act.id)}
                        disabled={dismissMutation.isPending}
                      >
                        <XCircle className="h-3.5 w-3.5" /> Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Collapsible Evidence & Progress Drawer */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t text-xs space-y-2 bg-muted/20 p-3 rounded-lg">
                  {act.evidence && act.evidence.length > 0 && (
                    <div>
                      <span className="font-bold text-foreground">Supporting Platform Evidence:</span>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-muted-foreground">
                        {act.evidence.map((ev: string, idx: number) => (
                          <li key={idx}>{ev}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {act.outcomes && (
                    <div className="pt-2 border-t border-border/50">
                      <span className="font-bold text-foreground">Observable Progression:</span>
                      <div className="flex items-center gap-3 mt-1 text-emerald-700 dark:text-emerald-400 font-medium">
                        {act.outcomes.progressObserved && <span>✓ Progress Observed</span>}
                        {act.outcomes.assessmentCoverageIncreased && <span>✓ Assessment Coverage Increased</span>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-muted/20 p-2.5 rounded-lg border border-border/50">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
        <span>{plan.disclaimer}</span>
      </div>
    </div>
  );
}
