import { useState } from "react";
import { PlatformAdminLayout } from "@/components/layout/PlatformAdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Activity,
  AlertTriangle,
  Award,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileSpreadsheet,
  Flame,
  HelpCircle,
  Play,
  RefreshCw,
  RotateCcw,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlatformHealthData {
  period: {
    startDate: string;
    endDate: string;
  };
  scoring: {
    scoreEventsThisMonth: number;
    activeScoringEmployees: number;
    totalPointsAwarded: number;
    totalPointsReversed: number;
    reversedTransactionsCount: number;
    challengeBonusPointsAwarded: number;
    averageSeasonalScore: number;
    unusualScoreFlagsCount: number;
  };
  competition: {
    companiesWithIndividualCompetition: number;
    companiesWithDepartmentCompetition: number;
    activeSeasonsCount: number;
    closedSeasonsCount: number;
    eligibleDepartmentCompetitionsCount: number;
    departmentsBelowThresholdCount: number;
  };
  challenges: {
    activeChallengesCount: number;
    overallCompletionRate: number;
    totalChallengePointsAwarded: number;
    expiredIncompleteChallengesCount: number;
    topChallengeTemplates: Array<{
      templateCode: string;
      title: string;
      activatedCount: number;
      completedCount: number;
      completionRate: number;
    }>;
  };
  interactions: {
    totalAttempts: number;
    completionRate: number;
    firstAttemptSuccessRate: number;
    abandonmentRate: number;
    difficultInteractionsCount: number;
    highestFailureInteractions: Array<{
      interactionId: string;
      courseId: number;
      courseTitle?: string;
      interactionType: string;
      attempts: number;
      firstAttemptSuccessRate: number;
      averageRetries: number;
      abandonmentRate: number;
    }>;
  };
  achievements: {
    totalAwarded: number;
    seasonalAwarded: number;
    unearnedBadgeDefinitionsCount: number;
    mostCommonAchievements: Array<{
      badgeCode: string;
      name: string;
      category: string;
      earnedCount: number;
    }>;
  };
  anomaliesSummary: {
    openCount: number;
    reviewedCount: number;
    highSeverityCount: number;
  };
}

interface AnomalyRow {
  id: number;
  companyId: number;
  companyName: string;
  employeeId: number | null;
  employeeName: string | null;
  anomalyType: string;
  severity: "INFO" | "REVIEW" | "HIGH";
  description: string;
  status: "OPEN" | "REVIEWED" | "DISMISSED" | "RESOLVED";
  detectedAt: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  resolutionNote: string | null;
}

export default function GamificationHealthPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Anomaly review dialog state
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyRow | null>(null);
  const [reviewStatus, setReviewStatus] = useState<"REVIEWED" | "DISMISSED" | "RESOLVED">("REVIEWED");
  const [resolutionNote, setResolutionNote] = useState("");

  // Score recalculation dialog state
  const [recalcEmpId, setRecalcEmpId] = useState<number | null>(null);
  const [recalcReason, setRecalcReason] = useState("");

  // Queries
  const { data: health, isLoading: loadingHealth, refetch: refetchHealth } = useQuery<PlatformHealthData>({
    queryKey: ["/api/platform-admin/gamification/health"],
    queryFn: () => customFetch<PlatformHealthData>("/api/platform-admin/gamification/health"),
  });

  const { data: anomaliesData, isLoading: loadingAnomalies, refetch: refetchAnomalies } = useQuery<{
    total: number;
    anomalies: AnomalyRow[];
  }>({
    queryKey: ["/api/platform-admin/gamification/anomalies"],
    queryFn: () => customFetch<{ total: number; anomalies: AnomalyRow[] }>("/api/platform-admin/gamification/anomalies"),
  });

  // Diagnostics mutation
  const runDiagnostics = useMutation({
    mutationFn: () =>
      customFetch("/api/platform-admin/gamification/anomalies/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/platform-admin/gamification/health"] });
      queryClient.invalidateQueries({ queryKey: ["/api/platform-admin/gamification/anomalies"] });
      toast({
        title: "Diagnostics Completed",
        description: `Found ${data.anomaliesDetectedCount || 0} active anomaly items.`,
      });
    },
    onError: (err: any) => {
      toast({
        title: "Diagnostics Failed",
        description: err.message || "Failed to run diagnostics",
        variant: "destructive",
      });
    },
  });

  // Review Anomaly mutation
  const reviewMutation = useMutation({
    mutationFn: ({ id, status, note }: { id: number; status: string; note?: string }) =>
      customFetch(`/api/platform-admin/gamification/anomalies/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, resolutionNote: note }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/platform-admin/gamification/anomalies"] });
      queryClient.invalidateQueries({ queryKey: ["/api/platform-admin/gamification/health"] });
      setSelectedAnomaly(null);
      setResolutionNote("");
      toast({ title: "Anomaly Status Updated" });
    },
    onError: (err: any) => {
      toast({ title: "Update Failed", description: err.message, variant: "destructive" });
    },
  });

  // Recalculate score mutation
  const recalcMutation = useMutation({
    mutationFn: ({ empId, reason }: { empId: number; reason: string }) =>
      customFetch(`/api/platform-admin/scores/recalculate/${empId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/platform-admin/gamification/anomalies"] });
      queryClient.invalidateQueries({ queryKey: ["/api/platform-admin/gamification/health"] });
      setRecalcEmpId(null);
      setRecalcReason("");
      toast({
        title: "Score Recalculated",
        description: `Score synchronized from ${data.beforeScore} to ${data.afterScore} pts.`,
      });
    },
    onError: (err: any) => {
      toast({ title: "Recalculation Failed", description: err.message, variant: "destructive" });
    },
  });

  const handleExportAuditCsv = () => {
    window.open("/api/platform-admin/gamification/export", "_blank");
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return <Badge className="bg-rose-100 text-rose-800 border-rose-200">High</Badge>;
      case "REVIEW":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Review</Badge>;
      default:
        return <Badge variant="outline" className="text-slate-600">Info</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return <Badge className="bg-rose-600 text-white">Open</Badge>;
      case "REVIEWED":
        return <Badge className="bg-blue-600 text-white">Reviewed</Badge>;
      case "RESOLVED":
        return <Badge className="bg-emerald-600 text-white">Resolved</Badge>;
      case "DISMISSED":
        return <Badge variant="secondary">Dismissed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <PlatformAdminLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 mb-1">
              <Activity className="h-4 w-4" />
              <span>ELEVIO Skills Governance & Monitoring</span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-slate-900">Gamification Health & Fairness</h1>
            <p className="text-slate-500 text-sm mt-1 max-w-2xl">
              Real-time monitoring of scoring integrity, fairness diagnostics, competition health, and operational anomaly review.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => runDiagnostics.mutate()}
              disabled={runDiagnostics.isPending}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${runDiagnostics.isPending ? "animate-spin" : ""}`} />
              Run Diagnostics
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleExportAuditCsv}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800"
            >
              <Download className="h-4 w-4" />
              Export Audit CSV
            </Button>
          </div>
        </div>

        {/* Top KPI Cards */}
        {loadingHealth ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </div>
        ) : health ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-slate-200 shadow-xs">
              <CardHeader className="pb-1">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Points Awarded (Monthly)
                </CardDescription>
                <CardTitle className="text-2xl font-bold font-serif text-slate-900 flex items-center justify-between">
                  <span>{health.scoring.totalPointsAwarded.toLocaleString()}</span>
                  <Trophy className="h-5 w-5 text-emerald-600" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-xs text-muted-foreground">
                {health.scoring.scoreEventsThisMonth.toLocaleString()} events across {health.scoring.activeScoringEmployees} learners
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-xs">
              <CardHeader className="pb-1">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Reversed Points
                </CardDescription>
                <CardTitle className="text-2xl font-bold font-serif text-slate-900 flex items-center justify-between">
                  <span>{health.scoring.totalPointsReversed.toLocaleString()}</span>
                  <RotateCcw className="h-5 w-5 text-amber-600" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-xs text-muted-foreground">
                {health.scoring.reversedTransactionsCount} reversed transactions (non-destructive audit)
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-xs">
              <CardHeader className="pb-1">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Interaction Pass Rate
                </CardDescription>
                <CardTitle className="text-2xl font-bold font-serif text-slate-900 flex items-center justify-between">
                  <span>{health.interactions.firstAttemptSuccessRate}%</span>
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-xs text-muted-foreground">
                {health.interactions.totalAttempts.toLocaleString()} attempts · {health.interactions.completionRate}% completed
              </CardContent>
            </Card>

            <Card className={`shadow-xs ${health.anomaliesSummary.openCount > 0 ? "border-rose-300 bg-rose-50/40" : "border-slate-200"}`}>
              <CardHeader className="pb-1">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Open Anomaly Flags
                </CardDescription>
                <CardTitle className="text-2xl font-bold font-serif text-slate-900 flex items-center justify-between">
                  <span className={health.anomaliesSummary.openCount > 0 ? "text-rose-700" : "text-slate-900"}>
                    {health.anomaliesSummary.openCount}
                  </span>
                  <ShieldAlert className={`h-5 w-5 ${health.anomaliesSummary.openCount > 0 ? "text-rose-600" : "text-slate-400"}`} />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-xs text-muted-foreground">
                {health.anomaliesSummary.highSeverityCount} high severity · {health.anomaliesSummary.reviewedCount} reviewed
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Tabbed Analytics */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white border p-1 rounded-xl">
            <TabsTrigger value="overview">Scoring & Reversals</TabsTrigger>
            <TabsTrigger value="competition">Competition & Seasons</TabsTrigger>
            <TabsTrigger value="challenges">Challenges & Interactions</TabsTrigger>
            <TabsTrigger value="anomalies" className="flex items-center gap-1.5">
              <span>Anomaly Queue</span>
              {health?.anomaliesSummary.openCount ? (
                <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                  {health.anomaliesSummary.openCount}
                </Badge>
              ) : null}
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Scoring & Reversals */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold">Scoring Volume & Averages</CardTitle>
                  <CardDescription>Aggregate point distribution and participation metrics for {health?.period.startDate} to {health?.period.endDate}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Active Scoring Employees</span>
                    <span className="font-semibold text-slate-900">{health?.scoring.activeScoringEmployees}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Average Seasonal Score</span>
                    <span className="font-semibold text-slate-900">{health?.scoring.averageSeasonalScore} pts</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Challenge Bonus Points Awarded</span>
                    <span className="font-semibold text-slate-900">{health?.scoring.challengeBonusPointsAwarded.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Unusual Velocity Flags</span>
                    <span className="font-semibold text-slate-900">{health?.scoring.unusualScoreFlagsCount}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold">Achievements & Recognition</CardTitle>
                  <CardDescription>Earned badge definitions and progression across organisations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Total Achievements Earned</span>
                    <span className="font-semibold text-slate-900">{health?.achievements.totalAwarded}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Seasonal Badges Earned</span>
                    <span className="font-semibold text-slate-900">{health?.achievements.seasonalAwarded}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Unearned Badge Definitions</span>
                    <span className="font-semibold text-slate-900">{health?.achievements.unearnedBadgeDefinitionsCount}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Most Common Badges</p>
                    <div className="space-y-1.5">
                      {health?.achievements.mostCommonAchievements.map((b) => (
                        <div key={b.badgeCode} className="flex justify-between text-xs">
                          <span className="text-slate-700 font-medium">{b.name}</span>
                          <span className="text-slate-500">{b.earnedCount} earned</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 2: Competition & Seasons */}
          <TabsContent value="competition" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold">Organisation Participation</CardTitle>
                  <CardDescription>Adoption of individual and department competition modes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Companies with Individual Leaderboards</span>
                    <span className="font-semibold text-slate-900">{health?.competition.companiesWithIndividualCompetition}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Companies with Department Competitions</span>
                    <span className="font-semibold text-slate-900">{health?.competition.companiesWithDepartmentCompetition}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Eligible Department Standings Snapshot</span>
                    <span className="font-semibold text-slate-900">{health?.competition.eligibleDepartmentCompetitionsCount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Departments Below Participation Threshold</span>
                    <span className="font-semibold text-amber-700">{health?.competition.departmentsBelowThresholdCount}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold">Seasons & Historical Closure</CardTitle>
                  <CardDescription>Status of monthly competition cycles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Active Monthly Seasons</span>
                    <span className="font-semibold text-emerald-700">{health?.competition.activeSeasonsCount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Closed Historical Seasons</span>
                    <span className="font-semibold text-slate-900">{health?.competition.closedSeasonsCount}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border text-xs text-slate-600 mt-4">
                    <p className="font-medium text-slate-900 mb-1">Formula & Snapshot Guarantee:</p>
                    All closed seasons are immutably locked using <code className="text-emerald-700 font-mono">TEAM_SCORE_V1</code> snapshots. Historical point attribution never changes upon employee department transfers.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 3: Challenges & Interactions */}
          <TabsContent value="challenges" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold">Challenge Effectiveness</CardTitle>
                  <CardDescription>Participation and completion across company challenge templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Active Company Challenges</span>
                    <span className="font-semibold text-slate-900">{health?.challenges.activeChallengesCount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Overall Challenge Completion Rate</span>
                    <span className="font-semibold text-slate-900">{health?.challenges.overallCompletionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-slate-600">Total Challenge Points Awarded</span>
                    <span className="font-semibold text-slate-900">{health?.challenges.totalChallengePointsAwarded.toLocaleString()} pts</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Top Challenge Templates</p>
                    <div className="space-y-2">
                      {health?.challenges.topChallengeTemplates.map((t) => (
                        <div key={t.templateCode} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-slate-900">{t.title}</p>
                            <p className="text-slate-500">{t.completedCount} completed of {t.activatedCount} activated</p>
                          </div>
                          <Badge variant="outline" className="font-mono">{t.completionRate}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold">Difficult Interactions & Drop-Off</CardTitle>
                  <CardDescription>Interactions with low first-attempt success or high abandonment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {health?.interactions.highestFailureInteractions.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-6">No difficult interaction anomalies detected.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {health?.interactions.highestFailureInteractions.map((int) => (
                        <div key={int.interactionId} className="p-3 bg-slate-50 rounded-xl border text-xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                              {int.courseTitle || `Course #${int.courseId}`}
                            </span>
                            <Badge variant="secondary">{int.interactionType}</Badge>
                          </div>
                          <p className="text-slate-500">Interaction: <span className="font-mono text-slate-700">{int.interactionId}</span></p>
                          <div className="flex gap-4 text-slate-600 pt-1">
                            <span>1st Pass: <strong className="text-slate-900">{int.firstAttemptSuccessRate}%</strong></span>
                            <span>Avg Retries: <strong className="text-slate-900">{int.averageRetries}</strong></span>
                            <span>Abandon: <strong className="text-amber-700">{int.abandonmentRate}%</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 4: Anomaly Queue */}
          <TabsContent value="anomalies" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-bold">Operational Anomaly Review Queue</CardTitle>
                  <CardDescription>Deterministic rules detect scoring mismatches, velocity anomalies, and season integrity issues without automatic punishment.</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetchAnomalies()}
                  className="flex items-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                {loadingAnomalies ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : anomaliesData?.anomalies.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                    <p className="text-base font-semibold text-slate-900">All Systems Healthy</p>
                    <p className="text-sm text-slate-500 mt-1">No open fairness anomalies or score reconciliation mismatches found.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Employee</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {anomaliesData?.anomalies.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell className="font-mono text-xs font-semibold">{a.anomalyType}</TableCell>
                          <TableCell>{getSeverityBadge(a.severity)}</TableCell>
                          <TableCell className="text-xs font-medium">{a.companyName}</TableCell>
                          <TableCell className="text-xs">{a.employeeName || "—"}</TableCell>
                          <TableCell className="text-xs text-slate-600 max-w-xs truncate" title={a.description}>
                            {a.description}
                          </TableCell>
                          <TableCell>{getStatusBadge(a.status)}</TableCell>
                          <TableCell className="text-right space-x-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAnomaly(a);
                                setReviewStatus(a.status === "OPEN" ? "REVIEWED" : a.status);
                                setResolutionNote(a.resolutionNote || "");
                              }}
                              className="h-7 text-xs"
                            >
                              Review
                            </Button>
                            {a.anomalyType === "SCORE_MISMATCH" && a.employeeId && a.status === "OPEN" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setRecalcEmpId(a.employeeId);
                                  setRecalcReason("Repair materialized score to match ledger source of truth");
                                }}
                                className="h-7 text-xs bg-slate-800 hover:bg-slate-900"
                              >
                                Recalculate
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Anomaly Review Dialog */}
        <Dialog open={!!selectedAnomaly} onOpenChange={(open) => !open && setSelectedAnomaly(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Review Anomaly #{selectedAnomaly?.id}</DialogTitle>
              <DialogDescription>
                {selectedAnomaly?.anomalyType} on {selectedAnomaly?.companyName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-sm">
              <div className="p-3 bg-slate-50 rounded-xl border text-xs space-y-1">
                <p className="font-semibold text-slate-900">{selectedAnomaly?.description}</p>
                {selectedAnomaly?.employeeName && (
                  <p className="text-slate-500">Employee: {selectedAnomaly.employeeName}</p>
                )}
                <p className="text-slate-400">Detected: {selectedAnomaly?.detectedAt ? new Date(selectedAnomaly.detectedAt).toLocaleString() : ""}</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Set Status</label>
                <div className="flex gap-2">
                  {(["REVIEWED", "DISMISSED", "RESOLVED"] as const).map((st) => (
                    <Button
                      key={st}
                      type="button"
                      variant={reviewStatus === st ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReviewStatus(st)}
                      className="text-xs flex-1"
                    >
                      {st}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Resolution Note</label>
                <Input
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="e.g., Verified learner speed; no abuse detected."
                  className="text-xs"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" size="sm" onClick={() => setSelectedAnomaly(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  selectedAnomaly &&
                  reviewMutation.mutate({
                    id: selectedAnomaly.id,
                    status: reviewStatus,
                    note: resolutionNote,
                  })
                }
                disabled={reviewMutation.isPending}
              >
                Save Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Score Recalculate Dialog */}
        <Dialog open={!!recalcEmpId} onOpenChange={(open) => !open && setRecalcEmpId(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Recalculate Materialized Score</DialogTitle>
              <DialogDescription>
                Synchronizes the cached elevio_score column on employees with the SUM of active non-reversed transactions.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                <p className="font-semibold">Safe Repair Guarantee:</p>
                This operation will NOT create new points or delete ledger transactions. It re-computes the cached total and logs an audit trail event.
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Audit Reason (Required)</label>
                <Input
                  value={recalcReason}
                  onChange={(e) => setRecalcReason(e.target.value)}
                  placeholder="e.g., Resolving materialized score discrepancy from ledger audit"
                  className="text-xs"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" size="sm" onClick={() => setRecalcEmpId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  recalcEmpId && recalcMutation.mutate({ empId: recalcEmpId, reason: recalcReason })
                }
                disabled={recalcMutation.isPending || recalcReason.trim().length < 5}
              >
                Execute Recalculation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PlatformAdminLayout>
  );
}
