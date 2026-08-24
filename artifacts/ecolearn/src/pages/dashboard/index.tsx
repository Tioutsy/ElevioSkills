import { Layout } from "@/components/layout/Layout";
import { useListEnrollments, useListAchievementBadges, useGetMyPoints, useListCertificates, useListCourses, customFetch } from "@workspace/api-client-react";
import type { Enrollment } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  PlayCircle,
  Sprout,
  Recycle,
  Leaf,
  Globe,
  Trophy,
  Lock,
  Star,
  CalendarDays,
  AlertTriangle,
  Zap,
  Target,
  BarChart3,
  Check,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { useLanguage } from "@/context/LanguageContext";

const BADGE_ICONS: Record<string, LucideIcon> = {
  sprout: Sprout,
  recycle: Recycle,
  leaf: Leaf,
  globe: Globe,
  trophy: Trophy,
  award: Award,
  zap: Zap,
  target: Target,
  "book-open": BookOpen,
  "bar-chart-3": BarChart3,
};

type LmsEnrollment = Enrollment & {
  dueDate?: string | null;
  assignmentStatus?: "not_started" | "in_progress" | "completed" | "overdue";
};

export default function Dashboard() {
  const { t } = useLanguage();
  const { data: enrollments, isLoading: isLoadingEnrollments } = useListEnrollments();
  const { data: certificates, isLoading: isLoadingCertificates } = useListCertificates();
  const { data: points, isLoading: isLoadingPoints } = useGetMyPoints();
  const { data: allCoursesData, isLoading: isLoadingCourses } = useListCourses();
  const { data: challengesData, isLoading: isLoadingChallenges } = useQuery({
    queryKey: ["/api/challenges"],
    queryFn: () => customFetch<{ challenges: any[]; count: number }>("/api/challenges"),
  });
  const { data: achievementsData, isLoading: isLoadingAchievements } = useQuery({
    queryKey: ["/api/me/achievements"],
    queryFn: () => customFetch<any>("/api/me/achievements"),
  });
  const { data: scoreData, isLoading: isLoadingScore } = useQuery({
    queryKey: ["/api/me/score"],
    queryFn: () => customFetch<{
      totalScore: number;
      breakdown: { learning: number; knowledge: number; workplaceActions: number; other: number };
      transactionsCount: number;
      recentTransactions: any[];
    }>("/api/me/score"),
  });
  const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useQuery({
    queryKey: ["/api/leaderboards/current"],
    queryFn: () => customFetch<any>("/api/leaderboards/current"),
  });
  const { data: companyChallengesData } = useQuery<{ active: any[]; upcoming: any[]; completed: any[] }>({
    queryKey: ["/api/company-challenges"],
    queryFn: () => customFetch<any>("/api/company-challenges"),
  });

  const currentChallenge = companyChallengesData?.active?.[0];

  const lmsEnrollments = (enrollments ?? []) as LmsEnrollment[];
  const activeEnrollments = lmsEnrollments.filter(e => e.status !== 'completed');
  const completedEnrollments = lmsEnrollments.filter(e => e.status === 'completed');
  const earnedBadgeCount = achievementsData?.earnedAchievementCount ?? 0;
  const averageProgress = lmsEnrollments.length
    ? Math.round(lmsEnrollments.reduce((total, item) => total + item.progressPct, 0) / lmsEnrollments.length)
    : 0;
  const completionRate = lmsEnrollments.length
    ? Math.round((completedEnrollments.length / lmsEnrollments.length) * 100)
    : 0;
  const nextRecommended = [...activeEnrollments].sort((a, b) => {
    const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
    const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
    return aDue - bDue || a.progressPct - b.progressPct;
  })[0];

  const statusMeta: Record<string, { label: string; className: string }> = {
    not_started: { label: t("dashboard.status_assigned"), className: "bg-slate-400/10 text-slate-700 border-slate-400/30" },
    in_progress: { label: t("dashboard.status_in_progress"), className: "bg-blue-500/10 text-blue-700 border-blue-500/30" },
    completed: { label: t("common.completed"), className: "bg-green-500/10 text-green-700 border-green-500/30" },
    overdue: { label: t("dashboard.status_overdue"), className: "bg-red-500/10 text-red-700 border-red-500/30" },
  };

  return (
    <Layout>
      <div className="bg-primary/5 border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-serif mb-2">{t("dashboard.my_learning_title")}</h1>
          <p className="text-muted-foreground">{t("dashboard.welcome_sub")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                {isLoadingEnrollments ? <Skeleton className="h-7 w-16 mt-1" /> : (
                  <h3 className="text-2xl font-bold">{activeEnrollments.length}</h3>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificates Earned</p>
                {isLoadingCertificates ? <Skeleton className="h-7 w-16 mt-1" /> : (
                  <h3 className="text-2xl font-bold">{certificates?.length || 0}</h3>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                {isLoadingEnrollments ? <Skeleton className="h-7 w-16 mt-1" /> : (
                  <h3 className="text-2xl font-bold">{averageProgress}%</h3>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                {isLoadingEnrollments ? <Skeleton className="h-7 w-16 mt-1" /> : (
                  <h3 className="text-2xl font-bold">{completionRate}%</h3>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-10 w-10 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">ELEVIO Score</p>
                  {leaderboardData?.enabled && leaderboardData?.currentUser?.rank && (
                    <Link href="/company-ranking">
                      <span className="text-[11px] font-semibold text-emerald-800 hover:underline cursor-pointer flex items-center gap-0.5">
                        #{leaderboardData.currentUser.rank} this month <ChevronRight className="h-3 w-3 inline" />
                      </span>
                    </Link>
                  )}
                </div>
                {isLoadingScore ? <Skeleton className="h-7 w-20 mt-1" /> : (
                  <h3 className="text-2xl font-bold text-slate-900 font-serif">
                    {scoreData?.totalScore?.toLocaleString() ?? 0} <span className="text-xs font-sans font-medium text-muted-foreground">pts</span>
                  </h3>
                )}
              </div>
            </div>
            {scoreData?.breakdown && (
              <div className="pt-2 border-t mt-2 flex flex-wrap items-center justify-between gap-1 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-medium" title="Course Completion Points">
                    Learn: {scoreData.breakdown.learning}
                  </span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-medium" title="Knowledge & Assessment Points">
                    Quiz: {scoreData.breakdown.knowledge}
                  </span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-medium" title="Workplace Actions Points">
                    Actions: {scoreData.breakdown.workplaceActions}
                  </span>
                </div>
                {leaderboardData?.enabled && (
                  <Link href="/company-ranking">
                    <span className="text-emerald-700 font-medium hover:underline cursor-pointer">
                      Leaderboard →
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {currentChallenge && (
          <div className="mb-8 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                    Active Mission
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentChallenge.daysRemaining} days remaining
                  </span>
                </div>
                <h3 className="font-bold text-base text-foreground mt-0.5">{currentChallenge.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {currentChallenge.progress.completedCriteriaCount} of {currentChallenge.criteria.length} requirements completed • +{currentChallenge.rewardPoints} pts available
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 hidden sm:block">
                <Progress value={currentChallenge.progress.progressPct} className="h-2" />
                <span className="text-[10px] text-muted-foreground mt-0.5 block text-right">{currentChallenge.progress.progressPct}%</span>
              </div>
              <Button asChild size="sm">
                <Link href="/challenges">View Mission &rarr;</Link>
              </Button>
            </div>
          </div>
        )}

        {nextRecommended && (
          <div className="mb-12 rounded-xl border bg-primary/5 p-5 flex flex-col md:flex-row md:items-center gap-4">
            <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              {nextRecommended.assignmentStatus === "overdue" ? (
                <AlertTriangle className="h-5 w-5" />
              ) : (
                <BookOpen className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary mb-1">Next recommended course</p>
              <h2 className="font-serif font-bold text-xl truncate">{nextRecommended.courseName}</h2>
              <p className="text-sm text-muted-foreground">
                {nextRecommended.dueDate
                  ? `Due ${new Date(nextRecommended.dueDate).toLocaleDateString()}`
                  : "No due date set"} • {nextRecommended.progressPct}% complete
              </p>
            </div>
            <Button asChild>
              <Link href={`/learn/${nextRecommended.id}`}>Continue</Link>
            </Button>
          </div>
        )}

        {/* Continue Learning */}
        <h2 className="text-2xl font-bold font-serif mb-6">Continue Learning</h2>
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {isLoadingEnrollments ? (
            Array(2).fill(0).map((_, i) => (
              <div key={i} className="flex gap-4 border rounded-xl p-4">
                <Skeleton className="h-24 w-32 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-2 w-full mt-4" />
                </div>
              </div>
            ))
          ) : activeEnrollments.length === 0 ? (
            <div className="col-span-full py-10 px-6 text-center border rounded-xl bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 dark:to-transparent border-emerald-200/60 dark:border-emerald-800/40">
              <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-serif mb-1">Ready to start learning?</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-5">
                Browse our complete catalogue of {allCoursesData?.length || 34} ESG & Sustainability courses and start building your skills today.
              </p>
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                <Link href="/courses" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Explore {allCoursesData?.length || 34} Sustainability Courses
                </Link>
              </Button>
            </div>
          ) : (
            activeEnrollments.map((enrollment) => (
              <Link key={enrollment.id} href={`/learn/${enrollment.id}`}>
                <div className="group bg-card border rounded-xl p-4 flex gap-4 items-center hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                  <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0 relative bg-muted">
                    {enrollment.courseThumbnail && (
                      <img src={enrollment.courseThumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate mb-1 group-hover:text-primary transition-colors">
                      {enrollment.courseName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="outline" className={statusMeta[enrollment.assignmentStatus ?? "not_started"]?.className}>
                        {statusMeta[enrollment.assignmentStatus ?? "not_started"]?.label}
                      </Badge>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {enrollment.dueDate ? `Due ${new Date(enrollment.dueDate).toLocaleDateString()}` : "No due date"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={enrollment.progressPct} className="flex-1 h-2" />
                      <span className="text-xs font-medium w-9">{Math.round(enrollment.progressPct)}%</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>


        {/* Featured Courses Catalogue Showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-serif flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-emerald-600" />
                Available Courses Catalogue
              </h2>
              <p className="text-muted-foreground text-sm">{allCoursesData?.length || 34} interactive ESG courses available to enroll & study</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/courses">View All {allCoursesData?.length || 34} Courses &rarr;</Link>
            </Button>
          </div>

          {isLoadingCourses ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(allCoursesData || []).slice(0, 6).map((course: any) => (
                <div key={course.id} className="bg-card border rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                        {course.courseCode || `ELH-${course.id}`}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.durationMinutes || 45} mins
                      </span>
                    </div>
                    <h3 className="font-bold text-base mb-2 line-clamp-1">{course.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                  </div>
                  <Button asChild size="sm" variant="secondary" className="w-full mt-auto">
                    <Link href={`/courses`}>Start Course &rarr;</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Workplace Micro-Challenges Showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-serif flex items-center gap-2">
                <Target className="h-6 w-6 text-emerald-600" />
                Workplace Micro-Challenges
              </h2>
              <p className="text-muted-foreground text-sm">Take practical micro-actions at work to earn points & badges</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/challenges">View All Challenges &rarr;</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(challengesData?.challenges || []).slice(0, 3).map((ch: any) => (
              <div key={ch.id} className="bg-card border rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {ch.code || `CHALLENGE-${ch.id}`}
                    </Badge>
                    <span className="text-xs font-semibold text-emerald-600">+{ch.points || 50} pts</span>
                  </div>
                  <h3 className="font-bold text-base mb-2 line-clamp-1">{ch.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{ch.summary || ch.description}</p>
                </div>
                <Button asChild size="sm" variant="outline" className="w-full mt-auto border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  <Link href="/challenges">Take Action &rarr;</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Recognition Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-700" />
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  Achievements & Recognition
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Meaningful recognition for pathway completions, assessment excellence, and workplace actions.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {achievementsData && (
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-emerald-800">
                    {achievementsData.totalEarned ?? 0}
                  </span>{" "}
                  earned ·{" "}
                  <span className="font-semibold text-slate-700">
                    {achievementsData.inProgressCount ?? 0}
                  </span>{" "}
                  in progress
                </div>
              )}
              <Link href="/achievements">
                <span className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer flex items-center gap-1">
                  View all achievements <ChevronRight className="h-3.5 w-3.5 inline" />
                </span>
              </Link>
            </div>
          </div>

          {isLoadingAchievements ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-36 rounded-xl" />
              ))}
            </div>
          ) : achievementsData?.achievements?.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievementsData.achievements.slice(0, 8).map((badge: any) => {
                const isEarned = badge.earned;
                return (
                  <div
                    key={badge.id + (badge.seasonId ? `_${badge.seasonId}` : "")}
                    className={`border rounded-xl p-4 flex flex-col justify-between transition-all ${
                      isEarned
                        ? "bg-white border-emerald-200/90 shadow-xs"
                        : "bg-slate-50/70 border-slate-200 opacity-80"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div
                          className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                            isEarned
                              ? "bg-emerald-100/70 text-emerald-800"
                              : "bg-slate-200/60 text-slate-500"
                          }`}
                        >
                          {isEarned ? (
                            <Award className="h-5 w-5" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[9px] px-1.5 py-0 ${
                            isEarned
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {badge.category}
                        </Badge>
                      </div>

                      <h4 className="font-semibold text-xs text-slate-900 line-clamp-1">
                        {badge.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                        {badge.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100">
                      {isEarned ? (
                        <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Earned
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>Progress</span>
                            <span className="font-mono">{badge.progressLabel}</span>
                          </div>
                          <Progress
                            value={Math.min(
                              100,
                              Math.round((badge.progressCurrent / (badge.progressTarget || 1)) * 100)
                            )}
                            className="h-1 bg-slate-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground text-xs">
              No achievements found.
            </div>
          )}
        </div>

        {/* Completed Courses */}
        {completedEnrollments.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-serif">Completed Courses</h2>
              <Link href="/certificates" className="text-sm font-medium text-primary hover:underline">
                View Certificates
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedEnrollments.map((enrollment) => (
                <div key={enrollment.id} className="bg-card border rounded-xl overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                  <div className="aspect-video relative bg-muted">
                    {enrollment.courseThumbnail && (
                      <img src={enrollment.courseThumbnail} alt="" className="w-full h-full object-cover grayscale-[50%]" />
                    )}
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">{enrollment.courseName}</h3>
                    <p className="text-xs text-muted-foreground">
                      Completed {enrollment.completedAt ? new Date(enrollment.completedAt).toLocaleDateString() : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
