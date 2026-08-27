import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Award,
  BookOpen,
  Zap,
  Star,
  Target,
  CheckSquare,
  Briefcase,
  Calendar,
  Medal,
  Trophy,
  Crown,
  Lock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface AchievementItem {
  id: number;
  code: string;
  name: string;
  description: string;
  icon: string;
  category: "Learning" | "Knowledge" | "Action" | "Consistency" | "Competition";
  isSeasonal: boolean;
  tier: string | null;
  earned: boolean;
  earnedAt: string | null;
  seasonId: number | null;
  metadata: any | null;
  progressCurrent: number;
  progressTarget: number;
  progressLabel: string;
  unlockInstruction: string | null;
  orderIndex: number;
}

interface AchievementSummary {
  totalEarned: number;
  inProgressCount: number;
  categories: {
    category: "Learning" | "Knowledge" | "Action" | "Consistency" | "Competition";
    earnedCount: number;
    totalCount: number;
  }[];
  recentEarned: AchievementItem | null;
  achievements: AchievementItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  award: Award,
  zap: Zap,
  star: Star,
  target: Target,
  "check-square": CheckSquare,
  briefcase: Briefcase,
  calendar: Calendar,
  medal: Medal,
  trophy: Trophy,
  crown: Crown,
};

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  const { data, isLoading } = useQuery<AchievementSummary>({
    queryKey: ["/api/me/achievements"],
    queryFn: () => customFetch<AchievementSummary>("/api/me/achievements"),
  });

  const achievements = data?.achievements ?? [];
  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const earnedList = filteredAchievements.filter((a) => a.earned);
  const inProgressList = filteredAchievements.filter((a) => !a.earned);

  const SelectedIcon = selectedAchievement ? ICON_MAP[selectedAchievement.icon] || Award : Award;
  const selectedPct = selectedAchievement
    ? Math.min(100, Math.round((selectedAchievement.progressCurrent / (selectedAchievement.progressTarget || 1)) * 100))
    : 0;

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50/50 pb-16">
        {/* Header Banner */}
        <div className="bg-white border-b py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 mb-1">
                  <Award className="h-4 w-4" />
                  <span>Professional Milestones & Recognition</span>
                </div>
                <h1 className="text-3xl font-bold font-serif text-slate-900">
                  Your Achievements
                </h1>
                <p className="text-muted-foreground text-sm max-w-2xl mt-1">
                  Meaningful recognition for completing pathways, applying workplace actions, and maintaining learning consistency. Click on any achievement to view full milestone requirements and unlock details.
                </p>
              </div>

              {/* Top Overview KPI Chips */}
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/80 rounded-xl p-4 shrink-0 shadow-xs">
                <div className="text-center px-3">
                  <span className="text-2xl font-bold font-serif text-emerald-900">
                    {data?.totalEarned ?? 0}
                  </span>
                  <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    Earned
                  </p>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-center px-3">
                  <span className="text-2xl font-bold font-serif text-slate-700">
                    {data?.inProgressCount ?? 0}
                  </span>
                  <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    In Progress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mt-8">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-full max-w-md rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-48 rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Category Filter Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="bg-slate-100/80 p-1 border border-slate-200/60 rounded-xl flex flex-wrap h-auto gap-1">
                  <TabsTrigger
                    value="all"
                    className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-lg px-3 py-1.5"
                  >
                    All ({achievements.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="learning"
                    className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-lg px-3 py-1.5"
                  >
                    Learning ({achievements.filter((a) => a.category === "Learning").length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="knowledge"
                    className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-lg px-3 py-1.5"
                  >
                    Knowledge ({achievements.filter((a) => a.category === "Knowledge").length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="action"
                    className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-lg px-3 py-1.5"
                  >
                    Action ({achievements.filter((a) => a.category === "Action").length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="consistency"
                    className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-lg px-3 py-1.5"
                  >
                    Consistency ({achievements.filter((a) => a.category === "Consistency").length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="competition"
                    className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-xs rounded-lg px-3 py-1.5"
                  >
                    Competition ({achievements.filter((a) => a.category === "Competition").length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Earned Milestones Section */}
              {earnedList.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <h2 className="text-lg font-bold font-serif text-slate-900">
                      Earned Milestones ({earnedList.length})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {earnedList.map((item) => {
                      const IconComponent = ICON_MAP[item.icon] || Award;
                      return (
                        <Card
                          key={item.id + (item.seasonId ? `_${item.seasonId}` : "")}
                          onClick={() => setSelectedAchievement(item)}
                          className="border-emerald-200/80 bg-white shadow-xs hover:shadow-md hover:border-emerald-400 relative overflow-hidden flex flex-col justify-between cursor-pointer transition-all group"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full pointer-events-none -mr-4 -mt-4 opacity-50 group-hover:opacity-80 transition-opacity" />
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="h-11 w-11 rounded-xl bg-emerald-100/70 border border-emerald-300/60 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <Badge
                                variant="outline"
                                className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200 shrink-0 font-medium"
                              >
                                {item.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-base font-bold font-serif text-slate-900 mt-2 group-hover:text-emerald-900 transition-colors">
                              {item.name}
                            </CardTitle>
                            <CardDescription className="text-xs text-slate-600 line-clamp-2 mt-1">
                              {item.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="pt-0">
                            {item.metadata?.placeLabel && (
                              <div className="mb-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-0.5 inline-block">
                                {item.metadata.placeLabel}
                              </div>
                            )}
                            {item.metadata?.seasonTitle && !item.metadata?.placeLabel && (
                              <div className="mb-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5 inline-block">
                                {item.metadata.label || item.metadata.seasonTitle}
                              </div>
                            )}

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-muted-foreground">
                              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5 inline" /> Earned
                              </span>
                              {item.earnedAt && (
                                <span>
                                  {new Date(item.earnedAt).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* In Progress Milestones Section */}
              {inProgressList.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-slate-600" />
                    <h2 className="text-lg font-bold font-serif text-slate-900">
                      In Progress ({inProgressList.length})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inProgressList.map((item) => {
                      const IconComponent = ICON_MAP[item.icon] || Lock;
                      const pct = Math.min(
                        100,
                        Math.round((item.progressCurrent / (item.progressTarget || 1)) * 100)
                      );

                      return (
                        <Card
                          key={item.id}
                          onClick={() => setSelectedAchievement(item)}
                          className="border-slate-200 bg-white/70 shadow-xs hover:shadow-md hover:border-slate-300 flex flex-col justify-between cursor-pointer transition-all group"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="h-11 w-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <IconComponent className="h-5 w-5 opacity-70" />
                              </div>
                              <Badge
                                variant="outline"
                                className="text-[10px] bg-slate-100 text-slate-600 border-slate-200 shrink-0 font-medium"
                              >
                                {item.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-base font-semibold text-slate-800 mt-2 group-hover:text-slate-900 transition-colors">
                              {item.name}
                            </CardTitle>
                            <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {item.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="pt-0 space-y-3">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[11px] font-medium text-slate-700">
                                <span>Progress</span>
                                <span className="font-mono">{item.progressLabel}</span>
                              </div>
                              <Progress value={pct} className="h-2 bg-slate-100" />
                            </div>

                            {item.unlockInstruction && (
                              <p className="text-[11px] text-muted-foreground bg-slate-50 border border-slate-200/60 rounded-md p-2 line-clamp-2">
                                {item.unlockInstruction}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Achievement Detail Dialog Modal */}
        <Dialog open={!!selectedAchievement} onOpenChange={(open) => !open && setSelectedAchievement(null)}>
          <DialogContent className="sm:max-w-lg">
            {selectedAchievement && (
              <>
                <DialogHeader className="text-left space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`h-14 w-14 rounded-2xl flex items-center justify-center border shadow-xs ${
                        selectedAchievement.earned
                          ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                          : "bg-slate-100 border-slate-200 text-slate-600"
                      }`}
                    >
                      <SelectedIcon className="h-7 w-7" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-semibold">
                        {selectedAchievement.category}
                      </Badge>
                      {selectedAchievement.isSeasonal && (
                        <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-900 border-amber-200">
                          Seasonal
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <DialogTitle className="text-xl font-bold font-serif text-slate-900">
                      {selectedAchievement.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-slate-600 mt-1">
                      {selectedAchievement.description}
                    </DialogDescription>
                  </div>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  {/* Status Banner */}
                  <div
                    className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                      selectedAchievement.earned
                        ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-medium">
                      {selectedAchievement.earned ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>Achievement Unlocked & Verified</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 text-slate-500 shrink-0" />
                          <span>In Progress — Locked</span>
                        </>
                      )}
                    </div>

                    {selectedAchievement.earned && selectedAchievement.earnedAt && (
                      <span className="text-emerald-700 font-mono text-[11px]">
                        {new Date(selectedAchievement.earnedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Progress Tracker */}
                  <div className="bg-white border rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                      <span>Milestone Progress</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {selectedAchievement.progressLabel} ({selectedPct}%)
                      </span>
                    </div>
                    <Progress
                      value={selectedPct}
                      className={`h-2.5 ${selectedAchievement.earned ? "bg-emerald-100" : "bg-slate-100"}`}
                    />
                  </div>

                  {/* Unlock Instructions / How to Earn */}
                  {selectedAchievement.unlockInstruction && (
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                        <Info className="h-4 w-4 text-amber-700" />
                        <span>How to Unlock</span>
                      </div>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        {selectedAchievement.unlockInstruction}
                      </p>
                    </div>
                  )}

                  {/* Seasonal or Tournament Details */}
                  {selectedAchievement.metadata?.placeLabel && (
                    <div className="bg-slate-50 border rounded-xl p-3 text-xs flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Tournament Result</span>
                      <span className="font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md">
                        {selectedAchievement.metadata.placeLabel}
                      </span>
                    </div>
                  )}
                  {selectedAchievement.metadata?.seasonTitle && (
                    <div className="bg-slate-50 border rounded-xl p-3 text-xs flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Competition Period</span>
                      <span className="font-semibold text-slate-800">
                        {selectedAchievement.metadata.seasonTitle}
                      </span>
                    </div>
                  )}
                </div>

                <DialogFooter className="flex flex-row items-center justify-between sm:justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedAchievement(null)}>
                    Close
                  </Button>
                  {!selectedAchievement.earned && (
                    <div className="flex items-center gap-2">
                      {selectedAchievement.category === "Learning" || selectedAchievement.category === "Knowledge" ? (
                        <Link href="/courses">
                          <Button size="sm" className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800">
                            <span>Browse Courses</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      ) : selectedAchievement.category === "Competition" ? (
                        <Link href="/challenges">
                          <Button size="sm" className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800">
                            <span>View Challenges</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/dashboard">
                          <Button size="sm" className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800">
                            <span>Go to Dashboard</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}

