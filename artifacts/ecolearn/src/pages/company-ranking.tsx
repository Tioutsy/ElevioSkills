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
  Medal,
  Award,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  Sparkles,
  Shield,
  Clock,
  ChevronRight,
  TrendingUp,
  User,
  Info,
  AlertCircle,
} from "lucide-react";
import { Link } from "wouter";

interface LeaderboardEntry {
  rank: number;
  displayName: string;
  department: string | null;
  seasonalScore: number;
  lifetimeScore: number;
  isCurrentUser: boolean;
  movement: {
    direction: "up" | "down" | "same" | "new";
    delta: number;
    text: string;
  };
}

interface CurrentUserPosition {
  rank: number | null;
  seasonalScore: number;
  lifetimeScore: number;
  totalParticipants: number;
  movement: {
    direction: "up" | "down" | "same" | "new";
    delta: number;
    text: string;
  };
  pointsToNextRank: number | null;
  nextRankTarget: number | null;
  targetMessage: string;
  isEligible: boolean;
}

interface LeaderboardData {
  enabled: boolean;
  companyName?: string;
  privacyMode?: "full_name" | "initial" | "anonymous";
  season?: {
    id: number;
    title: string;
    seasonType: string;
    startDate: string;
    endDate: string;
    daysRemaining: number;
    status: string;
  };
  totalParticipants?: number;
  currentUser?: CurrentUserPosition;
  topPerformers?: LeaderboardEntry[];
  userRow?: LeaderboardEntry | null;
  message?: string;
}

interface SeasonHistoryEntry {
  id: number;
  title: string;
  seasonType: string;
  startDate: string;
  endDate: string;
  totalParticipants: number;
  topScore: number;
  userRank: number | null;
  userScore: number;
}

export default function CompanyRankingPage() {
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");

  const { data: leaderboard, isLoading: isLoadingLeaderboard, isError: isErrorLeaderboard, refetch: refetchLeaderboard } = useQuery<LeaderboardData>({
    queryKey: ["/api/leaderboards/current"],
    queryFn: () => customFetch<LeaderboardData>("/api/leaderboards/current"),
  });

  const { data: historyData, isLoading: isLoadingHistory } = useQuery<{ history: SeasonHistoryEntry[] }>({
    queryKey: ["/api/leaderboards/history"],
    queryFn: () => customFetch<{ history: SeasonHistoryEntry[] }>("/api/leaderboards/history"),
    enabled: leaderboard?.enabled === true,
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300 shadow-sm text-sm">
          <Trophy className="h-4 w-4" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-300 shadow-sm text-sm">
          <Medal className="h-4 w-4" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-800 font-bold border border-orange-300 shadow-sm text-sm">
          <Award className="h-4 w-4" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-50 text-slate-600 font-semibold border text-sm font-mono">
        #{rank}
      </div>
    );
  };

  const getMovementIndicator = (movement?: { direction: string; delta: number; text: string }) => {
    if (!movement) return null;
    if (movement.direction === "up") {
      return (
        <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
          <ArrowUp className="h-3 w-3 mr-0.5" />
          {movement.delta}
        </span>
      );
    }
    if (movement.direction === "down") {
      return (
        <span className="inline-flex items-center text-xs font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
          <ArrowDown className="h-3 w-3 mr-0.5" />
          {movement.delta}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-xs text-muted-foreground bg-slate-100 px-1.5 py-0.5 rounded">
        <Minus className="h-3 w-3 mr-0.5" /> 0
      </span>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50/50 pb-16">
        {/* Header Header */}
        <div className="bg-white border-b py-8 shadow-xs">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-800 mb-1">
                  <Trophy className="h-4 w-4" />
                  <span>{leaderboard?.companyName ? `${leaderboard.companyName} Leaderboard` : "Company Competition"}</span>
                </div>
                <h1 className="text-3xl font-bold font-serif text-slate-900">Company Ranking</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Earn points through course completion, quiz performance, and practical workplace actions.
                </p>
              </div>

              {leaderboard?.enabled && leaderboard?.season && (
                <div className="flex items-center gap-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl px-4 py-2.5">
                  <Calendar className="h-5 w-5 text-emerald-700 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                      {leaderboard.season.title}
                    </div>
                    <div className="text-xs text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                      <Clock className="h-3.5 w-3.5" />
                      {leaderboard.season.daysRemaining === 1
                        ? "1 day remaining"
                        : `${leaderboard.season.daysRemaining} days remaining`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl mt-8">
          {isLoadingLeaderboard ? (
            <div className="space-y-6">
              <Skeleton className="h-36 w-full rounded-xl" />
              <Skeleton className="h-96 w-full rounded-xl" />
            </div>
          ) : isErrorLeaderboard ? (
            <Card className="border-slate-200 shadow-sm text-center py-12 px-6">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-serif text-slate-800 mb-2">Unable to Load Leaderboard</CardTitle>
              <CardDescription className="max-w-md mx-auto text-sm text-muted-foreground mb-6">
                An error occurred while loading the company leaderboard. Please check your network connection and try again.
              </CardDescription>
              <button
                onClick={() => refetchLeaderboard()}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-800 text-white text-sm font-medium hover:bg-emerald-900 transition-colors shadow-xs"
              >
                Retry Request
              </button>
            </Card>
          ) : !leaderboard?.enabled ? (
            /* Competition Disabled State */
            <Card className="border-slate-200 shadow-sm text-center py-12 px-6">
              <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-serif text-slate-800 mb-2">Company Ranking Inactive</CardTitle>
              <CardDescription className="max-w-md mx-auto text-sm text-muted-foreground mb-6">
                Your ELEVIO Score reflects your personal learning achievements and workplace actions. Company ranking is currently disabled by your organisation.
              </CardDescription>
              <Link href="/dashboard">
                <button className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-800 text-white text-sm font-medium hover:bg-emerald-900 transition-colors shadow-xs">
                  Return to Dashboard
                </button>
              </Link>
            </Card>
          ) : (
            /* Competition Active View */
            <div className="space-y-6">
              {/* User Standing Hero Card */}
              {leaderboard.currentUser && (
                <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="h-16 w-16 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs uppercase text-emerald-300 font-medium">Rank</span>
                        <span className="text-2xl font-bold font-serif text-white">
                          {leaderboard.currentUser.rank ? `#${leaderboard.currentUser.rank}` : "—"}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold font-serif text-white">Your Standing</h2>
                          {getMovementIndicator(leaderboard.currentUser.movement)}
                        </div>
                        <p className="text-xs text-emerald-200/90 font-medium">
                          {leaderboard.currentUser.rank
                            ? `Ranked #${leaderboard.currentUser.rank} of ${leaderboard.currentUser.totalParticipants} active colleagues`
                            : "Complete qualifying courses to earn your monthly ranking"}
                        </p>
                        <div className="mt-2 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{leaderboard.currentUser.targetMessage}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                      <div>
                        <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">This Month</div>
                        <div className="text-2xl font-bold font-serif text-white mt-0.5">
                          {leaderboard.currentUser.seasonalScore.toLocaleString()}{" "}
                          <span className="text-xs font-sans text-emerald-300 font-normal">pts</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Lifetime Score</div>
                        <div className="text-2xl font-bold font-serif text-white mt-0.5">
                          {leaderboard.currentUser.lifetimeScore.toLocaleString()}{" "}
                          <span className="text-xs font-sans text-emerald-300 font-normal">pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tabs: Current Month vs Previous Seasons */}
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                <TabsList className="bg-slate-200/70 p-1 rounded-xl">
                  <TabsTrigger value="current" className="rounded-lg text-xs font-medium">
                    {leaderboard.season?.title ?? "Current Month"}
                  </TabsTrigger>
                  <TabsTrigger value="history" className="rounded-lg text-xs font-medium">
                    Previous Seasons
                  </TabsTrigger>
                </TabsList>

                {/* CURRENT STANDINGS TAB */}
                <TabsContent value="current" className="mt-4 space-y-4">
                  <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50/70 border-b py-4 px-6 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-semibold text-slate-900">Leaderboard Standings</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                          {leaderboard.privacyMode === "anonymous"
                            ? "Anonymous Competitor Mode is active."
                            : leaderboard.privacyMode === "initial"
                            ? "Displaying first names and surname initials."
                            : "Displaying full employee names."}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs font-mono bg-white">
                        {leaderboard.totalParticipants ?? 0} participants
                      </Badge>
                    </CardHeader>

                    <div className="divide-y divide-slate-100">
                      {leaderboard.topPerformers && leaderboard.topPerformers.length > 0 ? (
                        leaderboard.topPerformers.map((entry) => (
                          <div
                            key={entry.rank + entry.displayName}
                            className={`flex items-center justify-between py-3.5 px-6 transition-colors ${
                              entry.isCurrentUser
                                ? "bg-emerald-50/80 border-l-4 border-l-emerald-600 font-medium"
                                : "hover:bg-slate-50/80"
                            }`}
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              {getRankBadge(entry.rank)}
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm truncate ${entry.isCurrentUser ? "font-bold text-emerald-950" : "text-slate-800"}`}>
                                    {entry.displayName}
                                  </span>
                                  {entry.isCurrentUser && (
                                    <Badge className="bg-emerald-700 text-white text-[10px] px-1.5 py-0">
                                      You
                                    </Badge>
                                  )}
                                </div>
                                {entry.department && (
                                  <div className="text-xs text-muted-foreground truncate">{entry.department}</div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-6 shrink-0">
                              <div className="hidden sm:block">{getMovementIndicator(entry.movement)}</div>
                              <div className="text-right">
                                <div className="text-sm font-bold font-serif text-slate-900">
                                  {entry.seasonalScore.toLocaleString()}{" "}
                                  <span className="text-[10px] font-sans font-normal text-muted-foreground">pts</span>
                                </div>
                                <div className="text-[10px] text-muted-foreground">
                                  Lifetime: {entry.lifetimeScore.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 text-center text-sm text-muted-foreground">
                          No qualifying scores recorded yet this season.
                        </div>
                      )}

                      {/* Out of top 10 current user row */}
                      {leaderboard.userRow && (
                        <div className="bg-emerald-100/70 border-t-2 border-emerald-300 py-3.5 px-6 flex items-center justify-between">
                          <div className="flex items-center gap-4 min-w-0">
                            {getRankBadge(leaderboard.userRow.rank)}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-emerald-950">
                                  {leaderboard.userRow.displayName}
                                </span>
                                <Badge className="bg-emerald-700 text-white text-[10px] px-1.5 py-0">You</Badge>
                              </div>
                              {leaderboard.userRow.department && (
                                <div className="text-xs text-muted-foreground">{leaderboard.userRow.department}</div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-6 shrink-0">
                            {getMovementIndicator(leaderboard.userRow.movement)}
                            <div className="text-right">
                              <div className="text-sm font-bold font-serif text-emerald-950">
                                {leaderboard.userRow.seasonalScore.toLocaleString()} pts
                              </div>
                              <div className="text-[10px] text-muted-foreground">
                                Lifetime: {leaderboard.userRow.lifetimeScore.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>

                {/* PREVIOUS SEASONS TAB */}
                <TabsContent value="history" className="mt-4">
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="bg-slate-50/70 border-b py-4 px-6">
                      <CardTitle className="text-base font-semibold text-slate-900">Historical Season Results</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Verified standings from past monthly competition seasons.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      {isLoadingHistory ? (
                        <div className="space-y-3">
                          <Skeleton className="h-16 w-full" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                      ) : !historyData?.history || historyData.history.length === 0 ? (
                        <div className="text-center py-8 text-sm text-muted-foreground">
                          <Clock className="h-8 w-8 mx-auto mb-2 opacity-40" />
                          No closed previous seasons recorded yet.
                        </div>
                      ) : (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {historyData.history.map((s) => (
                            <div
                              key={s.id}
                              className="p-4 rounded-xl border bg-white shadow-xs flex items-center justify-between"
                            >
                              <div>
                                <div className="text-sm font-bold text-slate-900">{s.title}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {s.totalParticipants} participants · Top: {s.topScore} pts
                                </div>
                              </div>
                              <div className="text-right">
                                {s.userRank ? (
                                  <>
                                    <div className="text-sm font-bold font-serif text-emerald-800">
                                      #{s.userRank}
                                    </div>
                                    <div className="text-xs text-muted-foreground">{s.userScore} pts</div>
                                  </>
                                ) : (
                                  <div className="text-xs text-muted-foreground">Not ranked</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
