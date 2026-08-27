import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuthRole } from "@/lib/authHelpers";
import {
  Target,
  Recycle,
  Zap,
  Droplets,
  Shield,
  Award,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  Trophy,
  Flame,
  Check,
  Calendar,
  AlertCircle,
  HelpCircle,
  Plus,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";

const ICONS: Record<string, LucideIcon> = {
  recycle: Recycle,
  zap: Zap,
  droplets: Droplets,
  shield: Shield,
  award: Award,
  target: Target,
};

const THEME: Record<string, { bg: string; text: string; border: string; badge: string; ring: string }> = {
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-500/20",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    ring: "ring-emerald-500/30",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500/20",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    ring: "ring-amber-500/30",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-500/20",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    ring: "ring-blue-500/30",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-500/20",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    ring: "ring-purple-500/30",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-500/20",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    ring: "ring-emerald-500/30",
  },
};

interface ChallengeCriterion {
  id: number;
  criterionType: "COURSE_COMPLETION" | "QUIZ_PASS" | "WORKPLACE_ACTION_COMPLETION";
  title: string;
  description: string;
  courseSlug?: string;
  courseTitle?: string;
  assessmentThreshold?: number;
  allowPriorCompletion?: boolean;
}

interface ChallengeItem {
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
  daysRemaining: number;
  progress: {
    status: "IN_PROGRESS" | "COMPLETED";
    completedCriteriaCount: number;
    totalCriteriaCount: number;
    progressPct: number;
    completedAt: string | null;
    pointsAwarded: number;
  };
  criteria: ChallengeCriterion[];
}

interface ChallengesResponse {
  active: ChallengeItem[];
  upcoming: ChallengeItem[];
  completed: ChallengeItem[];
}

export default function ChallengesPage() {
  const authRole = useAuthRole();
  const isAdmin = authRole.isCompanyAdmin || authRole.isPlatformAdmin;
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "completed">("active");

  const { data, isLoading, error, refetch } = useQuery<ChallengesResponse>({
    queryKey: ["/api/company-challenges"],
    queryFn: async () => {
      const res = await customFetch("/api/company-challenges");
      return res as ChallengesResponse;
    },
  });

  const activeList = data?.active || [];
  const upcomingList = data?.upcoming || [];
  const completedList = data?.completed || [];

  const totalPointsAvailable = activeList.reduce((sum, ch) => sum + ch.rewardPoints, 0);

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold tracking-wide uppercase">
              <Flame className="w-4 h-4" />
              Company Missions
            </div>
            <h1 className="text-3xl font-bold tracking-tight mt-1 text-foreground">
              ELEVIO Challenges
            </h1>
            <p className="text-muted-foreground mt-1 text-sm max-w-2xl">
              Time-bound learning missions and workplace sustainability actions. Complete criteria to earn challenge bonus points that contribute directly to your company ranking.
            </p>
          </div>

          {/* Quick Metrics & Admin CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-card border border-border rounded-xl p-3.5 px-4 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">Available Bonus</div>
                <div className="text-lg font-bold text-foreground">+{totalPointsAvailable} pts</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-3.5 px-4 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">Active Missions</div>
                <div className="text-lg font-bold text-foreground">{activeList.length}</div>
              </div>
            </div>

            {isAdmin && (
              <Link href="/company/challenges">
                <Button className="flex items-center gap-1.5 shadow-sm bg-emerald-700 hover:bg-emerald-800 text-white">
                  <Plus className="w-4 h-4" />
                  <span>Launch Challenges</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-border/60 pb-1">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "active"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Flame className="w-4 h-4" />
            Active ({activeList.length})
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "upcoming"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Clock className="w-4 h-4" />
            Upcoming ({upcomingList.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "completed"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Completed / Past ({completedList.length})
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="border border-border/60 rounded-2xl p-6 bg-card space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto" />
            <p className="text-sm text-destructive font-medium">Failed to load company challenges.</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Try Again
            </Button>
          </div>
        )}

        {/* Content Tabs */}
        {!isLoading && !error && (
          <div>
            {activeTab === "active" && (
              <div className="space-y-6">
                {activeList.length === 0 ? (
                  <div className="bg-card border border-border/60 rounded-2xl p-12 text-center space-y-3">
                    <Target className="w-10 h-10 text-muted-foreground/60 mx-auto" />
                    <h3 className="text-base font-semibold text-foreground">No Active Company Challenges</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      {isAdmin
                        ? "No missions are currently active for your organization. Launch an approved challenge template below to engage your team."
                        : "Your company administrator has not activated any missions for this period. Check back soon or explore course pathways in the catalogue."}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      {isAdmin && (
                        <Link href="/company/challenges">
                          <Button size="sm" className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800">
                            <Plus className="w-4 h-4" />
                            <span>Activate Challenge from Templates</span>
                          </Button>
                        </Link>
                      )}
                      <Link href="/courses">
                        <Button variant="outline" size="sm">
                          Browse Course Catalogue
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeList.map((ch) => (
                      <ChallengeCard key={ch.id} challenge={ch} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "upcoming" && (
              <div className="space-y-6">
                {upcomingList.length === 0 ? (
                  <div className="bg-card border border-border/60 rounded-2xl p-12 text-center space-y-3">
                    <Clock className="w-10 h-10 text-muted-foreground/60 mx-auto" />
                    <h3 className="text-base font-semibold text-foreground">No Upcoming Challenges Scheduled</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      There are no scheduled future missions at this time.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingList.map((ch) => (
                      <ChallengeCard key={ch.id} challenge={ch} isUpcoming />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "completed" && (
              <div className="space-y-6">
                {completedList.length === 0 ? (
                  <div className="bg-card border border-border/60 rounded-2xl p-12 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-muted-foreground/60 mx-auto" />
                    <h3 className="text-base font-semibold text-foreground">No Completed Missions Yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Complete active company missions to earn bonus score points and record permanent achievements.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {completedList.map((ch) => (
                      <ChallengeCard key={ch.id} challenge={ch} isCompleted />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

function ChallengeCard({
  challenge,
  isUpcoming = false,
  isCompleted = false,
}: {
  challenge: ChallengeItem;
  isUpcoming?: boolean;
  isCompleted?: boolean;
}) {
  const IconComponent = ICONS[challenge.icon] || Target;
  const theme = THEME[challenge.theme] || THEME.green;

  const isFullyDone = challenge.progress.status === "COMPLETED";

  return (
    <div
      className={`border rounded-2xl p-6 bg-card transition-all flex flex-col justify-between shadow-sm relative overflow-hidden ${
        isFullyDone
          ? "border-emerald-500/30 bg-emerald-500/[0.02]"
          : "border-border/60 hover:border-border"
      }`}
    >
      {/* Top Banner / Tags */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme.bg} ${theme.text}`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badge}`}>
                  {challenge.category}
                </span>
                {isFullyDone && (
                  <span className="text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> Completed
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-foreground mt-1 leading-snug">
                {challenge.title}
              </h3>
            </div>
          </div>

          {/* Reward Pill */}
          <div className="flex flex-col items-end">
            <div className="text-sm font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
              +{challenge.rewardPoints} pts
            </div>
            <span className="text-[10px] text-muted-foreground mt-0.5">Bonus Reward</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {challenge.description}
        </p>

        {/* Countdown / Duration Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-xl border border-border/40">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            {isUpcoming ? (
              <span>Starts {new Date(challenge.startDate).toLocaleDateString()}</span>
            ) : isFullyDone ? (
              <span className="text-emerald-600 font-semibold">Completed</span>
            ) : (
              <span>{challenge.daysRemaining} days remaining</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Until {new Date(challenge.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Criteria Checklist */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Mission Requirements</span>
            <span className="text-muted-foreground font-normal">
              {challenge.progress.completedCriteriaCount} of {challenge.criteria.length} completed
            </span>
          </div>

          <div className="space-y-1.5">
            {challenge.criteria.map((crit, idx) => {
              const isCritMet = idx < challenge.progress.completedCriteriaCount || isFullyDone;

              return (
                <div
                  key={crit.id || idx}
                  className={`flex items-start gap-2.5 p-2 rounded-lg text-xs transition-colors border ${
                    isCritMet
                      ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                      : "bg-background border-border/40 text-muted-foreground"
                  }`}
                >
                  <div className={`mt-0.5 rounded-full p-0.5 ${isCritMet ? "text-emerald-600" : "text-muted-foreground/40"}`}>
                    {isCritMet ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-current" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{crit.title}</div>
                    <div className="text-[11px] text-muted-foreground">{crit.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Challenge Progress</span>
            <span className="font-bold text-foreground">{challenge.progress.progressPct}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isFullyDone ? "bg-emerald-500" : "bg-primary"
              }`}
              style={{ width: `${challenge.progress.progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-5 mt-2 border-t border-border/40 flex items-center justify-between">
        {isFullyDone ? (
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Awarded +{challenge.rewardPoints} points to your ELEVIO score
          </div>
        ) : isUpcoming ? (
          <div className="text-xs text-muted-foreground">
            Mission will open on {new Date(challenge.startDate).toLocaleDateString()}
          </div>
        ) : (
          <Link href="/courses">
            <Button size="sm" className="w-full flex items-center justify-center gap-2 shadow-sm">
              <span>Continue Mission</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
