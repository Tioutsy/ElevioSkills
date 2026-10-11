import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  useTrainingAutomationPolicy,
  useUpdateTrainingAutomationPolicy,
  usePauseTrainingAutomation,
  useResumeTrainingAutomation,
  useRunAutomationNow,
  CompanyTrainingAutomationPolicy,
} from "@/lib/lms-api";
import {
  Bot,
  Settings,
  ShieldCheck,
  Play,
  Pause,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Info,
  ArrowLeft,
  Calendar,
  Bell,
  Mail,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";

export default function CompanyTrainingAutomationPage() {
  const queryClient = useQueryClient();
  const { data: policyData, isLoading } = useTrainingAutomationPolicy();
  const updatePolicyMutation = useUpdateTrainingAutomationPolicy();
  const pauseMutation = usePauseTrainingAutomation();
  const resumeMutation = useResumeTrainingAutomation();
  const runNowMutation = useRunAutomationNow();

  const [formState, setFormState] = useState<Partial<CompanyTrainingAutomationPolicy>>({
    enabled: false,
    paused: false,
    preDueReminderEnabled: true,
    preDueReminderDays: 3,
    overdueReminderEnabled: true,
    overdueReminderDays: 1,
    secondOverdueReminderEnabled: true,
    secondOverdueReminderDays: 7,
    adminEscalationEnabled: true,
    adminEscalationDays: 14,
    managerEscalationEnabled: false,
    managerEscalationDays: 14,
    weeklySummaryEnabled: false,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [runResult, setRunResult] = useState<any | null>(null);

  useEffect(() => {
    if (policyData?.policy) {
      setFormState(policyData.policy);
    }
  }, [policyData]);

  const handleSave = async () => {
    setErrorMessage(null);
    setSaveSuccess(false);
    try {
      await updatePolicyMutation.mutateAsync(formState);
      setSaveSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["training-automation-policy"] });
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update training governance rules.");
    }
  };

  const handlePauseToggle = async () => {
    if (!formState.enabled) return;
    try {
      if (formState.paused) {
        await resumeMutation.mutateAsync();
      } else {
        await pauseMutation.mutateAsync();
      }
      queryClient.invalidateQueries({ queryKey: ["training-automation-policy"] });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to toggle pause status.");
    }
  };

  const handleRunNow = async () => {
    try {
      const res = await runNowMutation.mutateAsync();
      setRunResult(res);
      queryClient.invalidateQueries({ queryKey: ["training-automation-policy"] });
      queryClient.invalidateQueries({ queryKey: ["training-automation-effectiveness"] });
      queryClient.invalidateQueries({ queryKey: ["follow-up-audit-history"] });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to run evaluation cycle.");
    }
  };

  // Live preview builder
  const buildLivePreview = () => {
    if (!formState.enabled) {
      return ["Training automation is currently disabled. Toggle 'Enable automatic training follow-up' below to activate."];
    }
    if (formState.paused) {
      return ["Training automation is currently paused. Resume to execute routine rules."];
    }
    const lines: string[] = [];
    if (formState.preDueReminderEnabled) {
      lines.push(`• Employees receive an automated reminder ${formState.preDueReminderDays} day(s) before training is due.`);
    }
    if (formState.overdueReminderEnabled) {
      lines.push(`• Overdue employees receive an initial reminder ${formState.overdueReminderDays} day(s) after due date.`);
    }
    if (formState.secondOverdueReminderEnabled) {
      lines.push(`• A second follow-up reminder is sent if training remains overdue after ${formState.secondOverdueReminderDays} day(s).`);
    }
    if (formState.adminEscalationEnabled) {
      lines.push(`• Company Administrators are alerted if training remains overdue after ${formState.adminEscalationDays} day(s).`);
    }
    if (formState.weeklySummaryEnabled) {
      lines.push(`• Weekly training executive summaries are dispatched every Monday morning.`);
    }
    return lines.length > 0 ? lines : ["No specific reminder rules selected."];
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="-ml-2 text-slate-600 hover:text-slate-900">
                <Link href="/company/training-follow-up">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Training Follow-Up Hub
                </Link>
              </Button>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Bot className="h-6 w-6 text-emerald-600" />
              Training Follow-Up Automation
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl">
              Let ELEVIO SKILLS handle routine training reminders automatically. You remain in control of the rules and can change or disable them at any time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRunNow}
              disabled={runNowMutation.isPending || !formState.enabled || formState.paused}
              className="gap-1.5 text-xs border-emerald-200 hover:bg-emerald-50 text-emerald-800"
            >
              <Zap className="h-3.5 w-3.5 text-emerald-600" />
              {runNowMutation.isPending ? "Evaluating..." : "Run Check Now"}
            </Button>
          </div>
        </div>

        {/* Success/Error Alerts */}
        {saveSuccess && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Training automation policy updated successfully!
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            {errorMessage}
          </div>
        )}

        {runResult && (
          <div className="p-4 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Manual Rule Check Complete
            </div>
            <p>
              Evaluated {runResult.evaluatedCount} active assignments.
              Pre-due sent: {runResult.preDueDispatched}, Overdue sent: {runResult.overdueFirstDispatched}, Second overdue sent: {runResult.overdueSecondDispatched}, Admin escalations: {runResult.adminEscalationsDispatched}, Skipped: {runResult.skippedCount}.
            </p>
          </div>
        )}

        {/* Live Automation Preview Box */}
        <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50/50 via-white to-slate-50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-emerald-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                Live Rule Preview
              </CardTitle>
              {formState.enabled ? (
                formState.paused ? (
                  <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800 text-xs">
                    Paused
                  </Badge>
                ) : (
                  <Badge className="bg-emerald-600 text-white text-xs">Active</Badge>
                )
              ) : (
                <Badge variant="outline" className="border-slate-300 text-slate-600 text-xs">
                  Disabled
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs text-slate-600">
              Summary of routine actions ELEVIO SKILLS will execute based on your settings:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5 text-xs text-slate-800 font-medium bg-white/80 p-3.5 rounded-md border border-emerald-100">
              {buildLivePreview().map((line, idx) => (
                <div key={idx} className="leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Master Switch Card */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle className="text-base font-bold text-slate-900">
                  Enable Automatic Training Follow-Up
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Master switch to activate or deactivate deterministic training governance automation.
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                {formState.enabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePauseToggle}
                    className="gap-1.5 text-xs h-8"
                  >
                    {formState.paused ? (
                      <>
                        <Play className="h-3.5 w-3.5 text-emerald-600" /> Resume Automation
                      </>
                    ) : (
                      <>
                        <Pause className="h-3.5 w-3.5 text-amber-600" /> Pause Automation
                      </>
                    )}
                  </Button>
                )}
                <Switch
                  checked={formState.enabled}
                  onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, enabled: checked }))}
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Detailed Configuration Sections */}
        <div className={`space-y-6 transition-opacity ${formState.enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
          {/* Section 1: Reminder Rules */}
          <Card className="border-slate-200">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Bell className="h-4 w-4 text-emerald-600" />
                Employee Reminder Rules
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Configure timing windows for pre-due and overdue employee notifications.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4 space-y-5">
              {/* Pre-due reminder */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="preDueEnabled"
                    checked={formState.preDueReminderEnabled}
                    onCheckedChange={(checked) =>
                      setFormState((prev) => ({ ...prev, preDueReminderEnabled: !!checked }))
                    }
                    className="mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="preDueEnabled" className="text-xs font-semibold text-slate-900 cursor-pointer">
                      Pre-Due Deadline Reminder
                    </Label>
                    <p className="text-[11px] text-slate-500">
                      Send a friendly reminder to learners before their course assignment becomes due.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Input
                    type="number"
                    min={1}
                    max={30}
                    value={formState.preDueReminderDays}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, preDueReminderDays: parseInt(e.target.value) || 3 }))
                    }
                    disabled={!formState.preDueReminderEnabled}
                    className="w-16 h-8 text-xs text-center"
                  />
                  <span className="text-xs text-slate-600 font-medium">day(s) before due date</span>
                </div>
              </div>

              {/* Overdue first reminder */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="overdueEnabled"
                    checked={formState.overdueReminderEnabled}
                    onCheckedChange={(checked) =>
                      setFormState((prev) => ({ ...prev, overdueReminderEnabled: !!checked }))
                    }
                    className="mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="overdueEnabled" className="text-xs font-semibold text-slate-900 cursor-pointer">
                      Initial Overdue Reminder
                    </Label>
                    <p className="text-[11px] text-slate-500">
                      Send an overdue notification shortly after a course deadline passes.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Input
                    type="number"
                    min={1}
                    max={30}
                    value={formState.overdueReminderDays}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, overdueReminderDays: parseInt(e.target.value) || 1 }))
                    }
                    disabled={!formState.overdueReminderEnabled}
                    className="w-16 h-8 text-xs text-center"
                  />
                  <span className="text-xs text-slate-600 font-medium">day(s) after due date</span>
                </div>
              </div>

              {/* Second overdue reminder */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="secondOverdueEnabled"
                    checked={formState.secondOverdueReminderEnabled}
                    onCheckedChange={(checked) =>
                      setFormState((prev) => ({ ...prev, secondOverdueReminderEnabled: !!checked }))
                    }
                    className="mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="secondOverdueEnabled" className="text-xs font-semibold text-slate-900 cursor-pointer">
                      Second Overdue Follow-Up
                    </Label>
                    <p className="text-[11px] text-slate-500">
                      Send a polite follow-up reminder if training remains uncompleted.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Input
                    type="number"
                    min={1}
                    max={60}
                    value={formState.secondOverdueReminderDays}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, secondOverdueReminderDays: parseInt(e.target.value) || 7 }))
                    }
                    disabled={!formState.secondOverdueReminderEnabled}
                    className="w-16 h-8 text-xs text-center"
                  />
                  <span className="text-xs text-slate-600 font-medium">day(s) after due date</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Escalation & Summaries */}
          <Card className="border-slate-200">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Escalation & Executive Reporting
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Notify administrators when compliance obligations remain unfulfilled.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4 space-y-5">
              {/* Admin Escalation */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="adminEscalationEnabled"
                    checked={formState.adminEscalationEnabled}
                    onCheckedChange={(checked) =>
                      setFormState((prev) => ({ ...prev, adminEscalationEnabled: !!checked }))
                    }
                    className="mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="adminEscalationEnabled" className="text-xs font-semibold text-slate-900 cursor-pointer">
                      Escalate to Company Administrators
                    </Label>
                    <p className="text-[11px] text-slate-500">
                      Notify company administrators if an employee is significantly overdue.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Input
                    type="number"
                    min={1}
                    max={90}
                    value={formState.adminEscalationDays}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, adminEscalationDays: parseInt(e.target.value) || 14 }))
                    }
                    disabled={!formState.adminEscalationEnabled}
                    className="w-16 h-8 text-xs text-center"
                  />
                  <span className="text-xs text-slate-600 font-medium">day(s) overdue</span>
                </div>
              </div>

              {/* Manager Escalation Notice */}
              <div className="p-3.5 rounded-lg border border-amber-200/80 bg-amber-50/40 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold text-amber-950">Manager Escalation Withheld</span>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Manager escalation is withheld because employee-manager scope relationships are not yet configured for this organization. Administrator escalation remains active.
                  </p>
                </div>
              </div>

              {/* Weekly Executive Summary */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="weeklySummaryEnabled"
                    checked={formState.weeklySummaryEnabled}
                    onCheckedChange={(checked) =>
                      setFormState((prev) => ({ ...prev, weeklySummaryEnabled: !!checked }))
                    }
                    className="mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <Label htmlFor="weeklySummaryEnabled" className="text-xs font-semibold text-slate-900 cursor-pointer">
                      Weekly Executive Training Brief
                    </Label>
                    <p className="text-[11px] text-slate-500">
                      Receive a weekly email summary of completions, in-progress learners, and automated reminders sent.
                    </p>
                  </div>
                </div>

                <Badge variant="outline" className="border-emerald-200 text-emerald-800 text-[11px]">
                  Opt-In
                </Badge>
              </div>
            </CardContent>

            <CardFooter className="border-t border-slate-100 pt-4 flex justify-end">
              <Button
                onClick={handleSave}
                disabled={updatePolicyMutation.isPending}
                className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 text-xs"
              >
                {updatePolicyMutation.isPending ? "Saving Rules..." : "Save Governance Policy"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
