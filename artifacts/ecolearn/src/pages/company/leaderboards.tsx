import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trophy,
  Users,
  Search,
  Calendar,
  Shield,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StandingRow {
  rank: number;
  employeeId: number;
  name: string;
  email: string;
  department: string | null;
  jobTitle: string | null;
  role: string;
  status: string;
  lifetimeScore: number;
  seasonalScore: number;
}

interface CompanyLeaderboardData {
  enabled: boolean;
  privacyMode: "full_name" | "initial" | "anonymous";
  season?: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    daysRemaining: number;
    status: string;
  };
  totalEmployees: number;
  participatingCount: number;
  standings: StandingRow[];
}

export default function CompanyLeaderboards() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const { data, isLoading, isError, refetch } = useQuery<CompanyLeaderboardData>({
    queryKey: ["/api/company/leaderboard"],
    queryFn: () => customFetch<CompanyLeaderboardData>("/api/company/leaderboard"),
  });

  const updateSettings = useMutation({
    mutationFn: (newSettings: { enabled: boolean; privacyMode?: string }) =>
      customFetch("/api/company/settings/competition", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/company/leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/leaderboards/current"] });
      toast({
        title: "Settings Saved",
        description: "Company competition preferences updated successfully.",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Update Failed",
        description: err.message || "Failed to update competition settings.",
        variant: "destructive",
      });
    },
  });

  const handleToggle = (checked: boolean) => {
    updateSettings.mutate({
      enabled: checked,
      privacyMode: data?.privacyMode ?? "initial",
    });
  };

  const handlePrivacyChange = (mode: string) => {
    updateSettings.mutate({
      enabled: data?.enabled ?? false,
      privacyMode: mode,
    });
  };

  const departments = Array.from(
    new Set(data?.standings.map((s) => s.department).filter(Boolean) as string[])
  );

  const filteredStandings = (data?.standings ?? []).filter((row) => {
    const matchesSearch =
      !search ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept =
      departmentFilter === "all" || row.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const enabled = data?.enabled ?? false;
  const privacyMode = data?.privacyMode ?? "initial";

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50/50 pb-16">
        {/* Header Header */}
        <div className="bg-white border-b py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 mb-1">
                  <Trophy className="h-4 w-4" />
                  <span>Organisation Competition & Recognition</span>
                </div>
                <h1 className="text-3xl font-bold font-serif text-slate-900">
                  Company Leaderboard Management
                </h1>
                <p className="text-muted-foreground text-sm max-w-2xl mt-1">
                  Enable friendly internal competition and celebrate high achievers. Rankings are strictly internal to your company.
                </p>
              </div>

              {/* Competition Activation Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 border border-slate-200/80 rounded-xl p-4 shrink-0 shadow-xs">
                <div className="flex items-center gap-3">
                  <Switch
                    id="competition-toggle"
                    checked={enabled}
                    onCheckedChange={handleToggle}
                    disabled={updateSettings.isPending}
                  />
                  <Label
                    htmlFor="competition-toggle"
                    className="cursor-pointer text-sm font-medium text-slate-800"
                  >
                    {enabled ? "Competition Active" : "Competition Disabled"}
                  </Label>
                </div>

                <div className="border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4 pt-3 sm:pt-0 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <Select
                    value={privacyMode}
                    onValueChange={handlePrivacyChange}
                    disabled={updateSettings.isPending}
                  >
                    <SelectTrigger className="w-[180px] h-9 text-xs bg-white">
                      <SelectValue placeholder="Privacy Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initial">First Name + Initial (Sarah R.)</SelectItem>
                      <SelectItem value="full_name">Full Name (Sarah Ramdin)</SelectItem>
                      <SelectItem value="anonymous">Anonymous (Learner 14)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mt-8">
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
              </div>
              <Skeleton className="h-96 rounded-xl" />
            </div>
          ) : isError ? (
            <Card className="border-slate-200 shadow-sm text-center py-12 px-6">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-serif text-slate-800 mb-2">Unable to Load Leaderboard Management</CardTitle>
              <CardDescription className="max-w-md mx-auto text-sm text-muted-foreground mb-6">
                An error occurred while loading the company leaderboard management view. Please check your administrative permissions and try again.
              </CardDescription>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="bg-white border-slate-300"
              >
                Retry Request
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Active Season & Participation KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border-slate-200 shadow-xs">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-medium uppercase tracking-wider">
                      Current Season
                    </CardDescription>
                    <CardTitle className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-emerald-700" />
                      {data?.season?.title ?? "No Active Season"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {data?.season?.daysRemaining
                        ? `${data.season.daysRemaining} days remaining`
                        : "Competition period active"}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-xs">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-medium uppercase tracking-wider">
                      Active Participants
                    </CardDescription>
                    <CardTitle className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                      <Users className="h-5 w-5 text-emerald-700" />
                      {data?.participatingCount ?? 0}{" "}
                      <span className="text-sm font-sans font-normal text-muted-foreground">
                        / {data?.totalEmployees ?? 0} employees
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      {data?.totalEmployees
                        ? `${Math.round(((data.participatingCount || 0) / data.totalEmployees) * 100)}% active this month`
                        : "0% active"}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-xs">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-medium uppercase tracking-wider">
                      Privacy & Display Policy
                    </CardDescription>
                    <CardTitle className="text-base font-semibold text-slate-900 capitalize flex items-center gap-2">
                      <Shield className="h-4 w-4 text-emerald-700" />
                      {privacyMode.replace("_", " ")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      {privacyMode === "anonymous"
                        ? "Competitor names masked as pseudonyms (Learner #)."
                        : privacyMode === "initial"
                        ? "Displaying first names and surname initials."
                        : "Displaying full employee names."}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Standings Table Card */}
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/70 border-b pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900">
                        Employee Standings
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Real-time scores derived from the authoritative ELEVIO score ledger.
                      </CardDescription>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="relative w-full sm:w-56">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search employee..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="pl-8 h-9 text-xs bg-white"
                        />
                      </div>

                      {departments.length > 0 && (
                        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                          <SelectTrigger className="w-full sm:w-44 h-9 text-xs bg-white">
                            <SelectValue placeholder="Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="w-16 text-center">Rank</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead className="text-right">Monthly Score</TableHead>
                      <TableHead className="text-right">Lifetime Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStandings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                          {search ? "No employees found matching search." : "No active employees found."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStandings.map((employee) => (
                        <TableRow key={employee.employeeId} className="hover:bg-slate-50/70">
                          <TableCell className="text-center font-bold font-serif text-slate-700">
                            {employee.rank <= 3 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-xs">
                                #{employee.rank}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground font-mono">
                                #{employee.rank}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-slate-900 text-sm">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">{employee.email}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">
                            {employee.department || "—"}
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">
                            {employee.jobTitle || "—"}
                          </TableCell>
                          <TableCell className="text-right font-mono font-semibold text-emerald-900 text-sm">
                            {employee.seasonalScore.toLocaleString()} pts
                          </TableCell>
                          <TableCell className="text-right font-mono text-slate-600 text-sm">
                            {employee.lifetimeScore.toLocaleString()} pts
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
              <DepartmentCompetitionAdmin />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

// ============================================================
// Department Competition Admin Component (inline)
// ============================================================

interface DeptStandingRow {
  departmentId: number;
  departmentName: string;
  rank: number | null;
  teamScore: number;
  performanceScore: number;
  participationScore: number;
  participationRate: number;
  averageSeasonalScore: number;
  eligibleEmployeesCount: number;
  activeParticipantsCount: number;
  isEligible: boolean;
  eligibilityStatus: string;
  neededToQualify?: { moreEmployeesNeeded: number; moreParticipantsNeeded: number; message: string };
}

interface AdminDeptPerf {
  enabled: boolean;
  season: { id: number; title: string; startDate: string; endDate: string; status: string };
  departments: DeptStandingRow[];
  summary: {
    totalDepartments: number;
    rankedDepartments: number;
    totalEligibleEmployees: number;
    totalActiveParticipants: number;
    overallParticipationRate: number;
    topTeamScore: number;
  };
}

interface DeptSettings { enabled: boolean; activatedAt: string | null; }

function DepartmentCompetitionAdmin() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: settings, isLoading: loadingSettings } = useQuery<DeptSettings>({
    queryKey: ["/api/company/department-competition/settings"],
    queryFn: () => customFetch<DeptSettings>("/api/company/department-competition/settings"),
  });

  const { data: perfData, isLoading: loadingPerf } = useQuery<AdminDeptPerf>({
    queryKey: ["/api/company/department-competition/performance"],
    queryFn: () => customFetch<AdminDeptPerf>("/api/company/department-competition/performance"),
  });

  const toggleMutation = useMutation({
    mutationFn: (enabled: boolean) =>
      customFetch("/api/company/department-competition/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/company/department-competition/settings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/company/department-competition/performance"] });
      toast({ title: "Department competition updated successfully." });
    },
    onError: (err: any) => {
      toast({ title: "Update failed", description: err.message || "Could not update department competition.", variant: "destructive" });
    },
  });

  const deptEnabled = settings?.enabled ?? false;

  return (
    <Card className="border-slate-200 shadow-xs mt-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <CardTitle className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-700" />
              Department Competition
            </CardTitle>
            <CardDescription className="mt-0.5 text-sm">
              Normalize team performance so departments of any size compete fairly.{" "}
              <span className="text-slate-600 font-medium">70% performance · 30% participation</span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {loadingSettings ? (
              <Skeleton className="h-8 w-28" />
            ) : (
              <>
                <Switch
                  id="dept-competition-toggle"
                  checked={deptEnabled}
                  onCheckedChange={(v) => toggleMutation.mutate(v)}
                  disabled={toggleMutation.isPending}
                />
                <Label htmlFor="dept-competition-toggle" className="text-sm font-medium text-slate-700 cursor-pointer">
                  {deptEnabled ? "Enabled" : "Disabled"}
                </Label>
              </>
            )}
          </div>
        </div>
        {!deptEnabled && (
          <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              Department competition is disabled. Employees see individual rankings only. Enable it to show department
              team standings.
            </span>
          </div>
        )}
      </CardHeader>

      {deptEnabled && (
        <CardContent>
          {loadingPerf ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : perfData ? (
            <>
              {/* Summary row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Total Departments", value: perfData.summary.totalDepartments },
                  { label: "Ranked", value: perfData.summary.rankedDepartments },
                  { label: "Overall Participation", value: `${Math.round(perfData.summary.overallParticipationRate)}%` },
                  { label: "Top Team Score", value: perfData.summary.topTeamScore.toLocaleString() },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-0.5">{kpi.label}</p>
                    <p className="text-lg font-bold text-slate-900">{kpi.value}</p>
                  </div>
                ))}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Team Score</TableHead>
                    <TableHead className="text-right">Participation</TableHead>
                    <TableHead className="text-right">Avg Score</TableHead>
                    <TableHead className="text-right">Active</TableHead>
                    <TableHead className="text-right">Eligible</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perfData.departments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-slate-400 py-8">
                        No departments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    perfData.departments.map((dept) => (
                      <TableRow key={dept.departmentId} className={!dept.isEligible ? "opacity-60" : ""}>
                        <TableCell className="font-bold text-slate-700">
                          {dept.isEligible && dept.rank ? `#${dept.rank}` : "—"}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-slate-800">{dept.departmentName}</span>
                          {!dept.isEligible && dept.neededToQualify && (
                            <p className="text-xs text-amber-600 mt-0.5">{dept.neededToQualify.message}</p>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold text-emerald-700">
                          {dept.isEligible ? dept.teamScore.toLocaleString() : "—"}
                        </TableCell>
                        <TableCell className="text-right">{Math.round(dept.participationRate)}%</TableCell>
                        <TableCell className="text-right">{Number(dept.averageSeasonalScore).toFixed(0)}</TableCell>
                        <TableCell className="text-right">{dept.activeParticipantsCount}</TableCell>
                        <TableCell className="text-right">{dept.eligibleEmployeesCount}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </>
          ) : (
            <p className="text-sm text-slate-400 py-4 text-center">No performance data available yet.</p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
