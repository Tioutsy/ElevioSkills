import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Users,
  TrendingUp,
  Info,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Award,
} from "lucide-react";
import { Link } from "wouter";

interface DepartmentStandingItem {
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
  eligibilityStatus: "RANKED" | "NOT_ENOUGH_PARTICIPANTS" | "BELOW_MIN_PARTICIPATION";
  neededToQualify?: {
    moreEmployeesNeeded: number;
    moreParticipantsNeeded: number;
    message: string;
  };
}

interface DepartmentRankingData {
  enabled: boolean;
  companyName?: string;
  season?: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    daysRemaining: number;
    status: string;
  };
  userTeam?: {
    departmentId: number;
    departmentName: string;
    rank: number | null;
    teamScore: number;
    participationRate: number;
    isEligible: boolean;
    eligibilityStatus: string;
    userSeasonalPoints: number;
    neededToQualify?: {
      moreEmployeesNeeded: number;
      moreParticipantsNeeded: number;
      message: string;
    };
  } | null;
  rankings?: DepartmentStandingItem[];
  formulaSummary?: {
    version: string;
    performanceWeight: string;
    participationWeight: string;
    description: string;
  };
  message?: string;
}

interface HistoryEntry {
  seasonId: number;
  seasonTitle: string;
  startDate: string;
  endDate: string;
  standings: {
    departmentId: number;
    departmentName: string;
    rank: number;
    teamScore: number;
    participationRate: number;
    averageSeasonalScore: number;
    isEligible: boolean;
    eligibilityStatus: string;
  }[];
}

function getRankMedal(rank: number) {
  if (rank === 1) return { icon: "🥇", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" };
  if (rank === 2) return { icon: "🥈", color: "text-slate-400", bg: "bg-slate-50 dark:bg-slate-800/30" };
  if (rank === 3) return { icon: "🥉", color: "text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20" };
  return { icon: null, color: "text-slate-600", bg: "" };
}

function TeamScoreBar({ score, max = 1000 }: { score: number; max?: number }) {
  const pct = Math.min(100, Math.round((score / max) * 100));
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ParticipationBadge({ rate }: { rate: number }) {
  const rounded = Math.round(rate);
  const color =
    rounded >= 80
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      : rounded >= 50
      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{rounded}% participation</span>
  );
}

export default function DepartmentRankingPage() {
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");

  const { data: rankingData, isLoading, isError, refetch } = useQuery<DepartmentRankingData>({
    queryKey: ["/api/leaderboards/department/current"],
    queryFn: () => customFetch<DepartmentRankingData>("/api/leaderboards/department/current"),
  });

  const { data: historyData, isLoading: isLoadingHistory } = useQuery<{ history: HistoryEntry[] }>({
    queryKey: ["/api/leaderboards/department/history"],
    queryFn: () => customFetch<{ history: HistoryEntry[] }>("/api/leaderboards/department/history"),
    enabled: activeTab === "history" && rankingData?.enabled === true,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Unable to Load Department Standings</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto text-sm">
            We were unable to load the department competition standings at this time. Please check your network connection and try again.
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors shadow-xs"
          >
            Retry Loading
          </button>
        </div>
      </Layout>
    );
  }

  if (!rankingData?.enabled) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Department Competition</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Department competition is not yet enabled for your company. Your Company Admin can activate it from the
            company settings.
          </p>
          <Link
            href="/company-ranking"
            className="inline-flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
          >
            View individual rankings <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </Layout>
    );
  }

  const { season, userTeam, rankings = [], formulaSummary } = rankingData;
  const rankedDepts = rankings.filter((d) => d.isEligible && d.rank !== null);
  const unrankedDepts = rankings.filter((d) => !d.isEligible);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Department Ranking</h1>
            {season && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {season.title}
                {season.daysRemaining > 0 && (
                  <span className="ml-2 inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <Clock className="w-3.5 h-3.5" />
                    {season.daysRemaining} day{season.daysRemaining !== 1 ? "s" : ""} remaining
                  </span>
                )}
              </p>
            )}
          </div>
          <Link href="/company-ranking">
            <span className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              Individual ranking <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Your Team Card */}
        {userTeam ? (
          <Card className="mb-6 border-0 bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wide mb-1">Your Team</p>
                  <h2 className="text-xl font-bold">{userTeam.departmentName}</h2>
                  {userTeam.isEligible && userTeam.rank ? (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-4xl font-black">#{userTeam.rank}</span>
                      <div className="ml-1">
                        <div className="text-lg font-semibold">{userTeam.teamScore.toLocaleString()} pts</div>
                        <div className="text-emerald-100 text-xs">{Math.round(userTeam.participationRate)}% participation</div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <Badge className="bg-white/20 text-white border-0 text-xs">
                        {userTeam.eligibilityStatus === "NOT_ENOUGH_PARTICIPANTS"
                          ? "Not enough participants"
                          : "Not yet eligible"}
                      </Badge>
                      {userTeam.neededToQualify && (
                        <p className="text-emerald-100 text-xs mt-1.5">{userTeam.neededToQualify.message}</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-emerald-100 text-xs mb-1">Your contribution</p>
                  <p className="text-2xl font-bold">{userTeam.userSeasonalPoints.toLocaleString()}</p>
                  <p className="text-emerald-100 text-xs">seasonal points</p>
                </div>
              </div>
              <p className="text-emerald-100 text-xs mt-3">
                Your learning activity contributes to {userTeam.departmentName}'s performance score.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-6 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-700 dark:text-amber-300">
                You are not assigned to a department. Contact your Company Admin to be assigned so you can contribute
                to a team.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Formula Explanation */}
        {formulaSummary && (
          <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3 mb-5">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>How Team Score works:</strong> {formulaSummary.description}{" "}
              <span className="font-medium">{formulaSummary.performanceWeight} performance</span>,{" "}
              <span className="font-medium">{formulaSummary.participationWeight} participation</span>. Max 1,000 pts.
            </p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "current" | "history")}>
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Season</TabsTrigger>
            <TabsTrigger value="history">Past Results</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-3">
            {rankedDepts.length === 0 && unrankedDepts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">
                    No departments have qualified yet this season. Keep learning!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Ranked Departments */}
            {rankedDepts.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1">
                  Ranked
                </h3>
                {rankedDepts.map((dept, idx) => {
                  const medal = getRankMedal(dept.rank!);
                  const isUserTeam = userTeam?.departmentId === dept.departmentId;
                  return (
                    <Card
                      key={dept.departmentId}
                      className={`border transition-shadow hover:shadow-md ${
                        isUserTeam ? "border-emerald-400 dark:border-emerald-600 ring-1 ring-emerald-400/30" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Rank */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${medal.bg}`}>
                            {medal.icon ? (
                              <span className="text-xl">{medal.icon}</span>
                            ) : (
                              <span className={`font-bold ${medal.color}`}>{dept.rank}</span>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-slate-900 dark:text-white truncate">
                                {dept.departmentName}
                              </span>
                              {isUserTeam && (
                                <Badge className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                                  Your team
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <TeamScoreBar score={dept.teamScore} />
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 w-16 text-right flex-shrink-0">
                                {dept.teamScore.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <ParticipationBadge rate={dept.participationRate} />
                              <span className="text-xs text-slate-400">
                                {dept.activeParticipantsCount}/{dept.eligibleEmployeesCount} active
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Unranked / Not Eligible Departments */}
            {unrankedDepts.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1">
                  Not yet eligible
                </h3>
                {unrankedDepts.map((dept) => {
                  const isUserTeam = userTeam?.departmentId === dept.departmentId;
                  return (
                    <Card
                      key={dept.departmentId}
                      className={`border border-dashed opacity-80 ${
                        isUserTeam ? "border-emerald-400 dark:border-emerald-600 opacity-100" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-slate-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                                {dept.departmentName}
                              </span>
                              {isUserTeam && (
                                <Badge className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                                  Your team
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              {dept.eligibilityStatus === "NOT_ENOUGH_PARTICIPANTS"
                                ? "Not enough participants for ranking"
                                : "Not yet eligible — participation threshold not met"}
                            </p>
                            {dept.neededToQualify && (
                              <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                                {dept.neededToQualify.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {isLoadingHistory ? (
              <div className="space-y-3">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            ) : !historyData?.history?.length ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">No previous department competition results yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {historyData.history.map((period) => {
                  const userPeriodStanding = userTeam
                    ? period.standings.find((s) => s.departmentId === userTeam.departmentId)
                    : null;
                  return (
                    <Card key={period.seasonId}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold">{period.seasonTitle}</CardTitle>
                        {userPeriodStanding?.isEligible && (
                          <CardDescription className="text-emerald-600 dark:text-emerald-400 font-medium">
                            {userTeam?.departmentName} finished #{userPeriodStanding.rank} with{" "}
                            {userPeriodStanding.teamScore.toLocaleString()} pts
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-1.5">
                          {period.standings
                            .filter((s) => s.isEligible)
                            .map((standing) => (
                              <div key={standing.departmentId} className="flex items-center gap-2 text-sm">
                                <span className="text-slate-400 w-6 text-right flex-shrink-0">
                                  #{standing.rank}
                                </span>
                                <span className="flex-1 text-slate-700 dark:text-slate-200 truncate">
                                  {standing.departmentName}
                                </span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                  {standing.teamScore.toLocaleString()}
                                </span>
                                <ParticipationBadge rate={standing.participationRate} />
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
