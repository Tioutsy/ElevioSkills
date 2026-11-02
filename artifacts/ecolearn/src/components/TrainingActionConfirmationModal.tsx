import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle2, AlertTriangle, RefreshCw, Send, BookOpen, ShieldCheck } from "lucide-react";
import {
  useSendTrainingReminders,
  useAssignRefresherTraining,
  SendReminderBatchResult,
} from "@/lib/lms-api";
import { useToast } from "@/hooks/use-toast";

export interface ReminderModalConfig {
  type: "reminder";
  category: "overdue" | "not_started" | "manual";
  employeeIds?: number[];
  courseId?: number;
  courseTitle?: string;
  recipientCount: number;
  title: string;
  description: string;
}

export interface RefresherModalConfig {
  type: "refresher";
  employeeIds: number[];
  courseId: number;
  courseCode?: string;
  courseTitle?: string;
  recipientCount: number;
  title: string;
  description: string;
}

export type ActionModalConfig = ReminderModalConfig | RefresherModalConfig;

interface TrainingActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ActionModalConfig | null;
  onSuccess?: () => void;
}

export function TrainingActionConfirmationModal({
  isOpen,
  onClose,
  config,
  onSuccess,
}: TrainingActionConfirmationModalProps) {
  const { toast } = useToast();
  const sendReminderMutation = useSendTrainingReminders();
  const assignRefresherMutation = useAssignRefresherTraining();

  const [customNote, setCustomNote] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [resultSummary, setResultSummary] = useState<any | null>(null);

  if (!config) return null;

  const isReminder = config.type === "reminder";

  const handleClose = () => {
    setResultSummary(null);
    setCustomNote("");
    setDueDate("");
    onClose();
  };

  const handleConfirmAction = () => {
    if (isReminder) {
      sendReminderMutation.mutate(
        {
          employeeIds: config.employeeIds,
          courseId: config.courseId,
          category: config.category,
          customNote: customNote.trim() || undefined,
          source: "training-insight",
        },
        {
          onSuccess: (data: SendReminderBatchResult) => {
            setResultSummary(data);
            toast({
              title: "Training Reminders Processed",
              description: `Dispatched: ${data.deliveredCount}, Skipped: ${data.skippedCount}, Failed: ${data.failedCount}`,
            });
            if (onSuccess) onSuccess();
          },
          onError: (err: any) => {
            toast({
              title: "Reminder Action Failed",
              description: err?.message || "Failed to dispatch reminders.",
              variant: "destructive",
            });
          },
        }
      );
    } else {
      assignRefresherMutation.mutate(
        {
          employeeIds: config.employeeIds,
          courseId: config.courseId,
          dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
          source: "training-insight",
        },
        {
          onSuccess: (data: any) => {
            setResultSummary(data);
            toast({
              title: "Refresher Assigned",
              description: `Refresher training assigned to ${data.summary?.assignedCount || 0} employee(s). Previous completion evidence preserved.`,
            });
            if (onSuccess) onSuccess();
          },
          onError: (err: any) => {
            toast({
              title: "Refresher Assignment Failed",
              description: err?.message || "Failed to assign refresher course.",
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  const isPending = sendReminderMutation.isPending || assignRefresherMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div
              className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                isReminder ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {isReminder ? <Mail className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
            </div>
            <div>
              <DialogTitle className="text-base font-bold">{config.title}</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                {config.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {resultSummary ? (
          <div className="space-y-4 py-3">
            <div className="p-4 bg-muted/30 border rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                <CheckCircle2 className="h-5 w-5" />
                Action Completed Safely
              </div>

              {isReminder ? (
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <span className="font-bold text-emerald-700 text-base block">{resultSummary.deliveredCount}</span>
                    <span className="text-emerald-800 font-medium">Delivered</span>
                  </div>
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="font-bold text-amber-700 text-base block">{resultSummary.skippedCount}</span>
                    <span className="text-amber-800 font-medium">Skipped (Recent/Opt)</span>
                  </div>
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg">
                    <span className="font-bold text-rose-700 text-base block">{resultSummary.failedCount}</span>
                    <span className="text-rose-800 font-medium">Failed</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs space-y-1">
                  <p>
                    <strong>Course:</strong> {config.courseCode ? `${config.courseCode} — ` : ""}{config.courseTitle || "Refresher"}
                  </p>
                  <p>
                    <strong>Assigned Learners:</strong> {resultSummary.summary?.assignedCount || 0}
                  </p>
                  <p className="text-muted-foreground italic">
                    Historical completion evidence remains preserved in database records.
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button size="sm" onClick={handleClose} className="w-full bg-emerald-700 text-white">
                Done
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4 py-2 text-sm">
            {/* Target Details Badge */}
            <div className="p-3 bg-muted/40 border rounded-xl flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Affected Learners:</span>
              <Badge variant="secondary" className="font-bold text-xs bg-emerald-100 text-emerald-800">
                {config.recipientCount} Employee(s)
              </Badge>
            </div>

            {/* Template preview for reminder */}
            {isReminder && (
              <div className="space-y-3">
                <div className="p-3 bg-background border rounded-xl text-xs space-y-1.5 font-mono text-muted-foreground">
                  <p className="font-semibold text-foreground font-sans">Template Preview:</p>
                  <p>Subject: Training reminder — {config.courseTitle || "Assigned Course"}</p>
                  <p className="whitespace-pre-line text-[11px] bg-muted/30 p-2 rounded border font-sans text-foreground">
                    {`Hello [First Name],

This is a reminder that your assigned MORIEVA SKILLS course "${config.courseTitle || "Sustainability Course"}" is currently outstanding.

Please log in to your MORIEVA SKILLS account to continue your training.

Thank you.
MORIEVA SKILLS by Recyclean`}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="customNote" className="text-xs font-medium">
                    Optional Management Note (Appended to email)
                  </Label>
                  <Textarea
                    id="customNote"
                    placeholder="e.g. Please complete prior to end-of-quarter audit."
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    rows={2}
                    className="text-xs"
                  />
                </div>
              </div>
            )}

            {/* Refresher Due Date Picker */}
            {!isReminder && (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50/50 border border-emerald-200/60 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    Reassigning a course as a refresher creates a new training requirement. All past completions, certificate records, and quiz attempt histories are safely preserved.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dueDate" className="text-xs font-medium">
                    Set Refresher Completion Due Date (Optional)
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t">
              <Button variant="outline" size="sm" onClick={handleClose} disabled={isPending} className="text-xs">
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmAction}
                disabled={isPending}
                className={isReminder ? "bg-amber-600 hover:bg-amber-700 text-white text-xs gap-1.5" : "bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5"}
              >
                {isPending && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                {isReminder ? (
                  <>
                    <Send className="h-3.5 w-3.5" /> Send {config.recipientCount} Reminder(s)
                  </>
                ) : (
                  <>
                    <BookOpen className="h-3.5 w-3.5" /> Assign Refresher Course
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
