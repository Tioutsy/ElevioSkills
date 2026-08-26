import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Activity,
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  Flame,
  Info,
  Layers,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Link } from "wouter";

interface CompanyAnalyticsData {
  companyId: number;
  companyName: string;
  season?: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  learningEngagement: {
    totalEligibleEmployees: number;
    activeLearnersCount: number;
    participationRate: number;
    averageSeasonalScore: number;
    completedCoursesCount: number;
    activeChallengeParticipantsCount: number;
    workplaceActionsCount: number;
  };
  individualCompetition: {
    enabled: boolean;
    privacyMode: string;
    activeCompetitorsCount: number;
    top10ScoreConcentrationPct: number;
    scoreDistribution: {
      zero: number;
      oneTo199: number;
      twoHundredTo499: number;
      fiveHundredTo999: number;
      oneThousandPlus: number;
    };
  };
  departmentCompetition: {
    enabled: boolean;
    totalDepartments: number;
    rankedDepartmentsCount: number;
    unrankedDepartmentsCount: number;
    averageTeamScore: number;
    departments: Array<{
      departmentId: number;
      departmentName: string;
      rank: number | null;
      teamScore: number;
      performanceScore: number;
      participationScore: number;
      participationRate: number;
      averageScore: number;
      eligibleEmployeesCount: number;
      activeParticipantsCount: number;
      isEligible: boolean;
      concentrationWarning?: string;
    }>;
  };
  challenges: {
    activeChallengesCount: number;
    completedChallengesCount: number;
    completionRate: number;
    totalPointsAwarded: number;
  };
  interactiveLearning: {
    interactionsAttemptedCount: number;
    interactionsCompletedCount: number;
    firstAttemptPassRate: number;
    difficultInteractions: Array<{
      interactionId: string;
      interactionType: string;
      attemptsCount: number;
      firstAttemptPassRate: number;
    }>;
  };
}

export default function EngagementCompetitionPage() {
  const [activeTab, setActiveTab] = useState("engagement");

  const { data, isLoading, isError, refetch } = useQuery<CompanyAnalyticsData>({
    queryKey: ["/api/company/gamification/analytics"],
    queryFn: () => customFetch<CompanyAnalyticsData>("/api/company/gamification/analytics"),
  });

  const handleExportCsv = () => {
    window.open("/api/company/gamification/export", "_blank");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50/50 pb-16">
        {/* Top Header */}
        <div className="bg-white border-b py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 mb-1">
                  <Activity className="h-4 w-4" />
                  <span>Organisation Learning & Recognition</span>
                </div>
                <h1 className="text-3xl font-bold font-serif text-slate-900">
                  Engagement & Competition Analytics
                </h1>
                <p className="text-muted-foreground text-sm max-w-2xl mt-1">
                  Comprehensive insights into learner engagement, team competition performance, score distribution, and challenge effectiveness.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportCsv}
                  className="flex items-center gap-2 bg-white"
                >
                  <Download className="h-4 w-4" />
                  Export Engagement CSV
                </Button>
                <Link href="/company/leaderboards">
                  <Button variant="default" size="sm" className="bg-emerald-700 hover:bg-emerald-800 flex items-center gap-1.5">
                    <Trophy className="h-4 w-4" />
                    Manage Leaderboards
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="container mx-auto px-4 max-w-6xl mt-8">
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Skeleton className="h-24 rounded-xl" />
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
              <CardTitle className="text-xl font-serif text-slate-800 mb-2">Unable to Load Engagement Analytics</CardTitle>
              <CardDescription className="max-w-md mx-auto text-sm text-muted-foreground mb-6">
                An error occurred while fetching company gamification analytics. Please verify your administrative permissions and network connection.
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
          ) : data ? (
            <div className="space-y-6">
              {/* KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-slate-200 shadow-xs">
                  <CardHeader className="pb-1">
                    <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Active Learners
                    </CardDescription>
                    <CardTitle className="text-2xl font-bold font-serif text-slate-900 flex items-center justify-between">
                      <span>{data.learningEngagement.activeLearnersCount}</span>
                      <Users className="h-5 w-5 text-emerald-600" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-xs text-muted-foreground">
                    {data.learningEngagement.participationRate}% of {data.learningEngagement.totalEligibleEmployees} eligible employees
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-xs">
                  <CardHeader className="pb-1">
                    <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Average Seasonal Score
                    </CardDescription>
                    <CardTitle className="text-2xl font-bold font-serif text-slate-900 flex items-center justify-between">
                      <span>{data.learningEngagement.averageSeasonalScore}</span>
                      <Trophy className="h-5 w-5 text-amber-600" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-xs text-muted-foreground">
                    ELEVIO Points per active competitor
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-xs">
                  <CardHeader className="pb-1">
                    <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Courses Completed
                    </CardDescription>
                    <CardTitle className="text-2xl font-bold font-serif text-slate-900 flex items-center justify-between">
                      <span>{data.learningEngagement.completedCoursesCount}</span>
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-xs text-muted-foreground">
                    {data.learningEngagement.workplaceActionsCount} workplace actions reported
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-xs">
                  <CardHeader className="pb-1">
                    <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Challenge Completion
                    </CardDescription>
                    <CardTitle className="text-2xl font-bold font-serif text-slate-900 flex items-center justify-between">
                      <span>{data.challenges.completionRate}%</span>
                      <Target className="h-5 w-5 text-emerald-600" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-xs text-muted-foreground">
                    {data.challenges.completedChallengesCount} completed of {data.challenges.activeChallengesCount} active
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="bg-white border p-1 rounded-xl">
                  <TabsTrigger value="engagement">Learning Engagement</TabsTrigger>
                  <TabsTrigger value="individual">Score Distribution & Concentration</TabsTrigger>
                  <TabsTrigger value="departments">Department Competition</TabsTrigger>
                  <TabsTrigger value="interactive">Interactive Learning</TabsTrigger>
                </TabsList>

                {/* TAB 1: Learning Engagement */}
                <TabsContent value="engagement" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base font-bold">Participation Breakdown</CardTitle>
                        <CardDescription>Activity across learning, actions, and challenges for {data.season?.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-slate-600">Total Enrolled Learners</span>
                          <span className="font-semibold text-slate-900">{data.learningEngagement.totalEligibleEmployees}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-slate-600">Active Learners in Current Season</span>
                          <span className="font-semibold text-slate-900">{data.learningEngagement.activeLearnersCount}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-slate-600">Challenge Competitors</span>
                          <span className="font-semibold text-slate-900">{data.learningEngagement.activeChallengeParticipantsCount}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-slate-600">Workplace Actions Verified</span>
                          <span className="font-semibold text-slate-900">{data.learningEngagement.workplaceActionsCount}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base font-bold">Challenge Achievements</CardTitle>
                        <CardDescription>Company challenge rewards earned this season</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-slate-600">Active Challenges</span>
                          <span className="font-semibold text-slate-900">{data.challenges.activeChallengesCount}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-slate-600">Completions</span>
                          <span className="font-semibold text-slate-900">{data.challenges.completedChallengesCount}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-slate-600">Completion Rate</span>
                          <span className="font-semibold text-slate-900">{data.challenges.completionRate}%</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-slate-600">Challenge Reward Points Awarded</span>
                          <span className="font-semibold text-emerald-700">{data.challenges.totalPointsAwarded.toLocaleString()} pts</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* TAB 2: Individual Distribution & Concentration */}
                <TabsContent value="individual" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base font-bold">Score Distribution Bands</CardTitle>
                        <CardDescription>Number of learners in each seasonal score tier</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2.5">
                        {[
                          { label: "1,000+ pts (Elite)", count: data.individualCompetition.scoreDistribution.oneThousandPlus, color: "bg-emerald-600" },
                          { label: "500–999 pts (Advanced)", count: data.individualCompetition.scoreDistribution.fiveHundredTo999, color: "bg-teal-600" },
                          { label: "200–499 pts (Active)", count: data.individualCompetition.scoreDistribution.twoHundredTo499, color: "bg-blue-600" },
                          { label: "1–199 pts (Developing)", count: data.individualCompetition.scoreDistribution.oneTo199, color: "bg-amber-500" },
                          { label: "0 pts (Not Yet Started)", count: data.individualCompetition.scoreDistribution.zero, color: "bg-slate-300" },
                        ].map((tier) => (
                          <div key={tier.label} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50">
                            <span className="font-medium text-slate-700">{tier.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{tier.count} learners</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base font-bold">Score Concentration</CardTitle>
                        <CardDescription>Share of seasonal points generated by the Top 10 learners</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-xl border text-center">
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Top 10 Point Concentration</p>
                          <p className="text-3xl font-bold font-serif text-slate-900">{data.individualCompetition.top10ScoreConcentrationPct}%</p>
                          <p className="text-xs text-muted-foreground mt-1">of all seasonal points earned by top 10 competitors</p>
                        </div>
                        <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-800">
                          <p className="font-semibold mb-1">Manager Note:</p>
                          A balanced score concentration indicates widespread adoption across all teams rather than reliance on a few enthusiastic learners.
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* TAB 3: Department Competition */}
                <TabsContent value="departments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-base font-bold">Department Score Breakdown & Explainability</CardTitle>
                          <CardDescription>
                            Normalized scoring via <code className="font-mono text-emerald-700">TEAM_SCORE_V1</code>: 70% Performance (Max 700) + 30% Participation (Max 300)
                          </CardDescription>
                        </div>
                        <Badge variant={data.departmentCompetition.enabled ? "default" : "outline"}>
                          {data.departmentCompetition.enabled ? "Competition Active" : "Disabled"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {data.departmentCompetition.departments.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-8">No departments configured yet.</p>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Rank</TableHead>
                              <TableHead>Department</TableHead>
                              <TableHead className="text-right">Team Score</TableHead>
                              <TableHead className="text-right">Performance Component</TableHead>
                              <TableHead className="text-right">Participation Component</TableHead>
                              <TableHead className="text-right">Participation Rate</TableHead>
                              <TableHead className="text-right">Active / Eligible</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data.departmentCompetition.departments.map((dept) => (
                              <TableRow key={dept.departmentId} className={!dept.isEligible ? "opacity-60" : ""}>
                                <TableCell className="font-bold text-slate-700">
                                  {dept.isEligible && dept.rank ? `#${dept.rank}` : "—"}
                                </TableCell>
                                <TableCell>
                                  <span className="font-medium text-slate-900">{dept.departmentName}</span>
                                  {dept.concentrationWarning && (
                                    <p className="text-xs text-amber-600 mt-0.5">{dept.concentrationWarning}</p>
                                  )}
                                </TableCell>
                                <TableCell className="text-right font-mono font-bold text-emerald-700">
                                  {dept.isEligible ? dept.teamScore.toLocaleString() : "—"}
                                </TableCell>
                                <TableCell className="text-right font-mono text-slate-600">
                                  {dept.isEligible ? `${Math.round(dept.performanceScore)} / 700` : "—"}
                                </TableCell>
                                <TableCell className="text-right font-mono text-slate-600">
                                  {dept.isEligible ? `${Math.round(dept.participationScore)} / 300` : "—"}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                  {Math.round(dept.participationRate)}%
                                </TableCell>
                                <TableCell className="text-right text-slate-500">
                                  {dept.activeParticipantsCount} / {dept.eligibleEmployeesCount}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* TAB 4: Interactive Learning */}
                <TabsContent value="interactive" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base font-bold">Interactive Learning Performance</CardTitle>
                        <CardDescription>Attempts, completion rates, and first-pass assessments</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-slate-600">Total Interactions Attempted</span>
                          <span className="font-semibold text-slate-900">{data.interactiveLearning.interactionsAttemptedCount}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-slate-600">Interactions Successfully Passed</span>
                          <span className="font-semibold text-slate-900">{data.interactiveLearning.interactionsCompletedCount}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-slate-600">First-Attempt Pass Rate</span>
                          <span className="font-semibold text-emerald-700">{data.interactiveLearning.firstAttemptPassRate}%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base font-bold">Challenging Interaction Blocks</CardTitle>
                        <CardDescription>Interactions where learners required multiple attempts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {data.interactiveLearning.difficultInteractions.length === 0 ? (
                          <p className="text-sm text-slate-400 text-center py-6">All interactive learning blocks performing within normal pass rates.</p>
                        ) : (
                          <div className="space-y-2">
                            {data.interactiveLearning.difficultInteractions.map((int) => (
                              <div key={int.interactionId} className="p-3 bg-slate-50 rounded-xl border text-xs flex justify-between items-center">
                                <div>
                                  <span className="font-semibold text-slate-900 font-mono">{int.interactionId}</span>
                                  <p className="text-slate-500">{int.interactionType}</p>
                                </div>
                                <div className="text-right">
                                  <span className="font-bold text-slate-900">{int.firstAttemptPassRate}% pass</span>
                                  <p className="text-slate-400">{int.attemptsCount} attempts</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
