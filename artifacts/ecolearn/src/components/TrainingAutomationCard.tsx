import React from "react";
import {
  useTrainingAutomationPolicy,
  usePauseTrainingAutomation,
  useResumeTrainingAutomation,
  useRunAutomationNow,
  useAutomationEffectiveness,
} from "@/lib/lms-api";
import {
  Bot,
  Play,
  Pause,
  Settings,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";

export function TrainingAutomationCard() {
  const queryClient = useQueryClient();
  const { data: policyData, isLoading } = useTrainingAutomationPolicy();
  const { data: effectiveness } = useAutomationEffectiveness();
  const pauseMutation = usePauseTrainingAutomation();
  const resumeMutation = useResumeTrainingAutomation();
  const runNowMutation = useRunAutomationNow();

  const policy = policyData?.policy;
  const preview = policyData?.preview || [];

  const handlePauseToggle = async () => {
    if (!policy) return;
    if (policy.paused) {
      await resumeMutation.mutateAsync();
    } else {
      await pauseMutation.mutateAsync();
    }
    queryClient.invalidateQueries({ queryKey: ["training-automation-policy"] });
  };

  const handleRunNow = async () => {
    await runNowMutation.mutateAsync();
    queryClient.invalidateQueries({ queryKey: ["training-automation-policy"] });
    queryClient.invalidateQueries({ queryKey: ["training-automation-effectiveness"] });
    queryClient.invalidateQueries({ queryKey: ["follow-up-audit-history"] });
  };

  if (isLoading) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-6 text-center text-sm text-slate-500">
          Loading training governance automation status...
        </CardContent>
      </Card>
    );
  }

  const isEnabled = policy?.enabled ?? false;
  const isPaused = policy?.paused ?? false;

  return (
    <Card className="border-emerald-200/80 shadow-sm bg-gradient-to-br from-emerald-50/40 via-white to-slate-50/50 overflow-hidden">
      <CardHeader className="pb-3 border-b border-emerald-100/60 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-800">
              <Bot className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Autonomous Training Governance
            </CardTitle>
            {isEnabled && !isPaused && (
              <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-xs px-2 py-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-200 animate-pulse" /> Active
              </Badge>
            )}
            {isEnabled && isPaused && (
              <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800 gap-1 text-xs">
                <Clock className="h-3 w-3" /> Paused
              </Badge>
            )}
            {!isEnabled && (
              <Badge variant="outline" className="border-slate-300 text-slate-600 text-xs">
                Disabled
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs text-slate-600">
            MORIEVA SKILLS handles routine reminders and admin escalations within your approved rules.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          {isEnabled && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePauseToggle}
                disabled={pauseMutation.isPending || resumeMutation.isPending}
                className="h-8 text-xs gap-1.5"
              >
                {isPaused ? (
                  <>
                    <Play className="h-3.5 w-3.5 text-emerald-600" /> Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5 text-amber-600" /> Pause
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunNow}
                disabled={runNowMutation.isPending}
                className="h-8 text-xs gap-1.5 border-emerald-200 hover:bg-emerald-50 text-emerald-800"
              >
                <Zap className="h-3.5 w-3.5 text-emerald-600" />
                {runNowMutation.isPending ? "Evaluating..." : "Run Check Now"}
              </Button>
            </>
          )}
          <Button asChild size="sm" variant="default" className="h-8 text-xs gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white">
            <Link href="/company/training-automation">
              <Settings className="h-3.5 w-3.5" />
              {isEnabled ? "Configure Rules" : "Enable Automation"}
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Active Rules Preview */}
        <div className="p-3.5 rounded-lg bg-white/80 border border-slate-200/80 text-xs text-slate-700 space-y-2">
          <div className="font-medium text-slate-900 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Current Policy Rules
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              Updated {policy?.updatedAt ? new Date(policy.updatedAt).toLocaleDateString() : "Just now"}
            </span>
          </div>
          <div className="space-y-1 text-slate-600 pl-1">
            {preview.map((line, idx) => (
              <p key={idx} className="leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Effectiveness Stats Bar */}
        {isEnabled && effectiveness && (
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-md bg-emerald-50/60 border border-emerald-100/80 text-center">
              <div className="text-lg font-bold text-emerald-900">{effectiveness.totalRemindersSent}</div>
              <div className="text-[11px] text-emerald-700 font-medium">Automated Reminders</div>
            </div>
            <div className="p-3 rounded-md bg-emerald-50/60 border border-emerald-100/80 text-center">
              <div className="text-lg font-bold text-emerald-900">{effectiveness.completionsPostReminder}</div>
              <div className="text-[11px] text-emerald-700 font-medium">Follow-Up Completions</div>
            </div>
            <div className="p-3 rounded-md bg-emerald-50/60 border border-emerald-100/80 text-center">
              <div className="text-lg font-bold text-emerald-900 flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                {effectiveness.completionRatePostReminder}%
              </div>
              <div className="text-[11px] text-emerald-700 font-medium">Follow-Up Success Rate</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
