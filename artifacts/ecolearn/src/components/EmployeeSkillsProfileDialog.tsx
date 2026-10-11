import React from "react";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, ShieldAlert, Sparkles, Brain } from "lucide-react";

interface EmployeeSkillsProfileDialogProps {
  employeeId: number | null;
  employeeName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EmployeeSkillsProfileDialog({
  employeeId,
  employeeName,
  isOpen,
  onClose,
}: EmployeeSkillsProfileDialogProps) {
  const { data: profile, isLoading, isError } = useQuery<any>({
    queryKey: [`/api/companies/employees/${employeeId}/skills-profile`],
    queryFn: () => customFetch<any>(`/api/company/employees/${employeeId}/skills-profile`),
    enabled: isOpen && employeeId !== null,
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-serif">
                  {employeeName ? `${employeeName}'s Skills Profile` : "Employee Skills Profile"}
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  AI-powered skills gap & assessment analysis
                </p>
              </div>
            </div>
            {profile && (
              <Badge variant="outline" className="text-xs font-mono">
                <Sparkles className="h-3 w-3 mr-1 text-primary" />
                {profile.providerTag === "gemini" ? "Gemini AI" : "Rule Engine"}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4 py-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : isError || !profile ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Failed to load skills profile for this employee.
          </div>
        ) : (
          <div className="space-y-6 py-2">
            {!profile.hasSufficientEvidence ? (
              <div className="p-4 bg-muted/40 rounded-lg border text-center space-y-1">
                <p className="text-sm text-muted-foreground font-medium">
                  {profile.insufficientEvidenceMessage || "More learning and assessment data is needed to identify a reliable pattern."}
                </p>
                <p className="text-xs text-muted-foreground">
                  The employee has not yet completed sufficient quizzes or courses to establish a baseline profile.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-green-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Demonstrated Strengths
                  </h4>
                  {profile.demonstratedStrengths?.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic bg-muted/30 p-2.5 rounded-md">
                      No demonstrated strengths recorded yet.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {profile.demonstratedStrengths?.map((str: any, idx: number) => (
                        <div key={idx} className="p-2.5 bg-green-500/5 border border-green-500/20 rounded-md text-xs space-y-1">
                          <div className="flex items-center justify-between font-medium">
                            <span>{str.topicLabel}</span>
                            {str.scoreOrMetric && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-[10px]">
                                {str.scoreOrMetric}
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-[11px]">{str.evidenceText}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Inferred Knowledge Gaps */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-amber-700 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4" /> Inferred Knowledge Gaps
                  </h4>
                  {profile.inferredKnowledgeGaps?.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic bg-muted/30 p-2.5 rounded-md">
                      No critical knowledge gaps detected.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {profile.inferredKnowledgeGaps?.map((gap: any, idx: number) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-md border text-xs space-y-1 ${
                            gap.severity === "critical"
                              ? "bg-red-500/5 border-red-500/30"
                              : "bg-amber-500/5 border-amber-500/30"
                          }`}
                        >
                          <div className="flex items-center justify-between font-medium">
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

            {/* Recommended Next Interventions */}
            {profile.recommendedInterventions?.length > 0 && (
              <div className="space-y-2 pt-2 border-t">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Recommended Interventions
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {profile.recommendedInterventions.map((rec: any) => (
                    <div key={rec.courseId} className="p-2.5 bg-muted/30 border rounded-md text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{rec.title}</span>
                        <Badge variant="outline" className="text-[10px]">{rec.courseCode}</Badge>
                      </div>
                      <p className="text-muted-foreground text-[11px]">{rec.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-muted/20 p-2.5 rounded-md border">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>{profile.disclaimer}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
