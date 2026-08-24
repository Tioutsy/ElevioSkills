import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Target,
  Plus,
  Flame,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Trophy,
  Users,
  Building,
  BarChart3,
  XCircle,
  Eye,
  Check,
  Shield,
  Loader2,
  Filter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TemplateItem {
  id: number;
  code: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  icon: string;
  theme: string;
  rewardPoints: number;
  defaultDurationDays: number;
  requiredCourseSlug?: string;
  isEligible: boolean;
  ineligibilityReason: string | null;
  criteriaConfig: any[];
}

interface CompanyChallengeAdminItem {
  id: number;
  code: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  theme: string;
  rewardPoints: number;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "UPCOMING" | "CLOSED" | "CANCELLED";
  createdBy: string;
  createdAt: string;
  cancelledAt: string | null;
  cancellationReason: string | null;
  criteria: any[];
}

export default function CompanyChallengesAdminPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<"all" | "active" | "upcoming" | "closed" | "cancelled">("all");
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });

  const [selectedAnalyticsChallengeId, setSelectedAnalyticsChallengeId] = useState<number | null>(null);
  const [cancelModalChallengeId, setCancelModalChallengeId] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Fetch Challenges
  const { data: challenges = [], isLoading: challengesLoading } = useQuery<CompanyChallengeAdminItem[]>({
    queryKey: ["/api/company/challenges"],
    queryFn: async () => {
      const res = await customFetch("/api/company/challenges");
      return res as CompanyChallengeAdminItem[];
    },
  });

  // Fetch Templates
  const { data: templates = [], isLoading: templatesLoading } = useQuery<TemplateItem[]>({
    queryKey: ["/api/company/challenges/templates"],
    queryFn: async () => {
      const res = await customFetch("/api/company/challenges/templates");
      return res as TemplateItem[];
    },
    enabled: isActivateOpen,
  });

  // Activate Mutation
  const activateMutation = useMutation({
    mutationFn: async () => {
      if (!selectedTemplate) return;
      return await customFetch("/api/company/challenges/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate + "T23:59:59Z").toISOString(),
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Challenge Activated",
        description: "The company challenge has been successfully scheduled and activated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/company/challenges"] });
      setIsActivateOpen(false);
      setSelectedTemplate(null);
    },
    onError: (err: any) => {
      toast({
        title: "Activation Failed",
        description: err?.message || "Failed to activate company challenge.",
        variant: "destructive",
      });
    },
  });

  // Cancel Mutation
  const cancelMutation = useMutation({
    mutationFn: async () => {
      if (!cancelModalChallengeId) return;
      return await customFetch(`/api/company/challenges/${cancelModalChallengeId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: cancelReason || "Cancelled by administrator" }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Challenge Cancelled",
        description: "The challenge has been cancelled. Previously earned employee points remain valid.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/company/challenges"] });
      setCancelModalChallengeId(null);
      setCancelReason("");
    },
    onError: (err: any) => {
      toast({
        title: "Cancellation Failed",
        description: err?.message || "Failed to cancel challenge.",
        variant: "destructive",
      });
    },
  });

  const filteredChallenges = challenges.filter((c) => {
    if (activeTab === "all") return true;
    return c.status.toLowerCase() === activeTab;
  });

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold tracking-wide uppercase">
              <Building className="w-4 h-4" />
              Company Administration
            </div>
            <h1 className="text-3xl font-bold tracking-tight mt-1 text-foreground">
              Company Challenges & Missions
            </h1>
            <p className="text-muted-foreground mt-1 text-sm max-w-2xl">
              Launch time-bound sustainability missions for your workforce. Track department participation, completion rates, and bonus points awarded.
            </p>
          </div>

          <Button
            onClick={() => setIsActivateOpen(true)}
            className="flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Activate New Challenge
          </Button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-border/60 pb-1">
          {(["all", "active", "upcoming", "closed", "cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {tab} ({tab === "all" ? challenges.length : challenges.filter((c) => c.status.toLowerCase() === tab).length})
            </button>
          ))}
        </div>

        {/* Loading */}
        {challengesLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border/60 rounded-2xl p-6 bg-card">
                <Skeleton className="h-6 w-1/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Challenges List */}
        {!challengesLoading && (
          <div className="space-y-4">
            {filteredChallenges.length === 0 ? (
              <div className="bg-card border border-border/60 rounded-2xl p-12 text-center space-y-3">
                <Target className="w-10 h-10 text-muted-foreground/60 mx-auto" />
                <h3 className="text-base font-semibold text-foreground">No Challenges Found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  No company challenges match the selected tab. Click Activate New Challenge to launch an approved ELEVIO template.
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsActivateOpen(true)} className="mt-2">
                  <Plus className="w-4 h-4 mr-1" />
                  Activate Challenge
                </Button>
              </div>
            ) : (
              filteredChallenges.map((ch) => (
                <div
                  key={ch.id}
                  className="bg-card border border-border/60 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:border-border transition-all"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          ch.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : ch.status === "UPCOMING"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : ch.status === "CLOSED"
                            ? "bg-muted text-muted-foreground"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {ch.status}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {ch.category}
                      </span>
                      <span className="text-xs font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        +{ch.rewardPoints} pts
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground">{ch.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{ch.description}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(ch.startDate).toLocaleDateString()} – {new Date(ch.endDate).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{ch.criteria.length} Requirements</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAnalyticsChallengeId(ch.id)}
                      className="flex items-center gap-1.5"
                    >
                      <BarChart3 className="w-4 h-4" />
                      View Analytics
                    </Button>

                    {(ch.status === "ACTIVE" || ch.status === "UPCOMING") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCancelModalChallengeId(ch.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Activate Challenge Modal */}
        <Dialog open={isActivateOpen} onOpenChange={setIsActivateOpen}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Activate Company Challenge
              </DialogTitle>
              <DialogDescription>
                Select an approved ELEVIO challenge template and configure start and end dates (3 to 90 days).
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Template Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">1. Select Approved Template</Label>
                {templatesLoading ? (
                  <Skeleton className="h-32 w-full" />
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {templates.map((tpl) => (
                      <div
                        key={tpl.id}
                        onClick={() => tpl.isEligible && setSelectedTemplate(tpl)}
                        className={`border rounded-xl p-4 transition-all cursor-pointer ${
                          !tpl.isEligible
                            ? "opacity-50 cursor-not-allowed bg-muted/30 border-border/40"
                            : selectedTemplate?.id === tpl.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border/60 hover:border-border bg-card"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-primary">{tpl.category}</span>
                              <span className="text-xs font-extrabold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                +{tpl.rewardPoints} pts
                              </span>
                              {!tpl.isEligible && (
                                <span className="text-[11px] text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                                  Course Entitlement Missing
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-foreground text-sm mt-1">{tpl.title}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">{tpl.summary}</p>
                          </div>
                          {selectedTemplate?.id === tpl.id && (
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Pickers */}
              {selectedTemplate && (
                <div className="space-y-4 border-t border-border/40 pt-4">
                  <Label className="text-sm font-semibold">2. Set Challenge Duration</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="start" className="text-xs text-muted-foreground">Start Date</Label>
                      <Input
                        id="start"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="end" className="text-xs text-muted-foreground">End Date</Label>
                      <Input
                        id="end"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Duration must be between 3 and 90 days. Reward points are fixed by policy at +{selectedTemplate.rewardPoints} points.
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsActivateOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={!selectedTemplate || activateMutation.isPending}
                onClick={() => activateMutation.mutate()}
                className="flex items-center gap-2"
              >
                {activateMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm & Activate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Analytics Modal */}
        {selectedAnalyticsChallengeId && (
          <ChallengeAnalyticsModal
            challengeId={selectedAnalyticsChallengeId}
            onClose={() => setSelectedAnalyticsChallengeId(null)}
          />
        )}

        {/* Cancel Confirmation Modal */}
        <Dialog open={!!cancelModalChallengeId} onOpenChange={() => setCancelModalChallengeId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Cancel Company Challenge
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this challenge? No new challenge bonus points will be awarded. Previously earned employee points will remain valid.
              </DialogDescription>
            </DialogHeader>
            <div className="py-2 space-y-2">
              <Label htmlFor="reason" className="text-xs">Optional Reason</Label>
              <Input
                id="reason"
                placeholder="e.g. Schedule adjustment or campaign reschedule"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelModalChallengeId(null)}>
                Keep Active
              </Button>
              <Button
                variant="destructive"
                disabled={cancelMutation.isPending}
                onClick={() => cancelMutation.mutate()}
              >
                {cancelMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}

function ChallengeAnalyticsModal({ challengeId, onClose }: { challengeId: number; onClose: () => void }) {
  const [selectedDeptId, setSelectedDeptId] = useState<number | undefined>(undefined);

  const { data: analytics, isLoading } = useQuery<any>({
    queryKey: [`/api/company/challenges/${challengeId}/analytics`, selectedDeptId],
    queryFn: async () => {
      const url = selectedDeptId
        ? `/api/company/challenges/${challengeId}/analytics?departmentId=${selectedDeptId}`
        : `/api/company/challenges/${challengeId}/analytics`;
      return await customFetch(url);
    },
  });

  const { data: progressList = [] } = useQuery<any[]>({
    queryKey: [`/api/company/challenges/${challengeId}/progress`],
    queryFn: async () => {
      return (await customFetch(`/api/company/challenges/${challengeId}/progress`)) as any[];
    },
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Challenge Participation Analytics
          </DialogTitle>
          <DialogDescription>
            {analytics?.challenge?.title} ({analytics?.challenge?.status})
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4 py-8">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border/60 rounded-xl p-4 space-y-1">
                <div className="text-xs text-muted-foreground">Eligible Workforce</div>
                <div className="text-2xl font-bold text-foreground">{analytics.metrics.totalEligibleEmployees}</div>
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-4 space-y-1">
                <div className="text-xs text-muted-foreground">Started / In Progress</div>
                <div className="text-2xl font-bold text-foreground">{analytics.metrics.startedCount}</div>
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-4 space-y-1">
                <div className="text-xs text-muted-foreground">Fully Completed</div>
                <div className="text-2xl font-bold text-emerald-600">{analytics.metrics.completedCount}</div>
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-4 space-y-1">
                <div className="text-xs text-muted-foreground">Points Awarded</div>
                <div className="text-2xl font-bold text-primary">+{analytics.metrics.totalChallengePointsAwarded} pts</div>
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                Department Breakdown
              </h4>
              <div className="border border-border/60 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/50 border-b border-border/60 text-muted-foreground">
                    <tr>
                      <th className="p-3 font-semibold">Department</th>
                      <th className="p-3 font-semibold">Eligible</th>
                      <th className="p-3 font-semibold">Completed</th>
                      <th className="p-3 font-semibold">Completion Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {analytics.departmentBreakdown.map((d: any, idx: number) => (
                      <tr key={idx} className="hover:bg-muted/20">
                        <td className="p-3 font-medium text-foreground">{d.departmentName}</td>
                        <td className="p-3">{d.totalEligible}</td>
                        <td className="p-3 font-semibold text-emerald-600">{d.completed}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${d.completionRatePct}%` }} />
                            </div>
                            <span className="font-bold">{d.completionRatePct}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Employee Progress List */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Employee Progress
              </h4>
              <div className="border border-border/60 rounded-xl max-h-60 overflow-y-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/50 border-b border-border/60 text-muted-foreground sticky top-0">
                    <tr>
                      <th className="p-3 font-semibold">Employee</th>
                      <th className="p-3 font-semibold">Department</th>
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold">Progress</th>
                      <th className="p-3 font-semibold">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {progressList.map((emp: any) => (
                      <tr key={emp.employeeId} className="hover:bg-muted/20">
                        <td className="p-3 font-medium text-foreground">{emp.employeeName}</td>
                        <td className="p-3 text-muted-foreground">{emp.departmentName}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full font-semibold ${
                              emp.status === "COMPLETED"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : emp.status === "IN_PROGRESS"
                                ? "bg-amber-500/10 text-amber-600"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                        <td className="p-3 font-semibold">{emp.progressPct}%</td>
                        <td className="p-3 font-bold text-primary">+{emp.pointsAwarded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
