import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Building2,
  Mail,
  ChevronRight,
  FileCheck2,
  GraduationCap
} from "lucide-react";
import { customFetch } from "@workspace/api-client-react";
import { PaidChallengePreviewModal } from "@/components/PaidChallengePreviewModal";
import { GeckoTip } from "@/components/GeckoTip";

export interface SkillsReviewData {
  isUnlocked: boolean;
  completedCount: number;
  totalRequired: number;
  progressPercentage: number;
  overallScore: number | null;
  performanceRating: "Exemplary" | "Proficient" | "Developing" | "Legacy Verified" | "Incomplete";
  performanceSummary: string;
  hasLegacyPartialEvidence: boolean;
  challengeRecords: {
    courseId: number;
    courseCode: string;
    title: string;
    order: number;
    competencyArea: string;
    isCompleted: boolean;
    score: number | null;
    hasLegacyPartialEvidence: boolean;
    completedAt: string | null;
  }[];
  remainingChallenges: {
    order: number;
    courseId: number;
    courseCode: string;
    title: string;
  }[];
  concreteStrength?: {
    topic: string;
    courseCode: string;
    courseTitle: string;
    headline: string;
    workplaceEvidence: string;
    achievableDecision: string;
  };
  skillToDevelop?: {
    topic: string;
    courseCode: string;
    courseTitle: string;
    headline: string;
    improvementArea: string;
    actionableNextStep: string;
  };
  recommendation?: {
    courseId: number;
    courseCode: string;
    title: string;
    reason: string;
    isPaid: boolean;
    previewAction: {
      type: "open_challenge" | "preview_paid" | "upgrade_company" | "request_access";
      targetHref: string;
      buttonLabel: string;
    };
  };
  userContext: {
    userId: string;
    role: string;
    companyId: number | null;
    companyName: string | null;
    isPaidCompany: boolean;
    canUpgradeCompany: boolean;
    adminContactEmail?: string | null;
  };
}

export default function SkillsReviewPage() {
  const [review, setReview] = useState<SkillsReviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewChallenge, setPreviewChallenge] = useState<any | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    customFetch<SkillsReviewData>("/api/skills-review/me")
      .then((data) => {
        if (isMounted) {
          setReview(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || "Failed to load Sustainability Skills Review");
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-36 rounded-2xl" />
            <Skeleton className="h-36 rounded-2xl" />
            <Skeleton className="h-36 rounded-2xl" />
          </div>
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </Layout>
    );
  }

  if (error || !review) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold font-serif">Sign in to View Your Review</h2>
          <p className="text-muted-foreground">
            {error || "Please sign in to your Morieva Skills account to access your personal Sustainability Skills Review."}
          </p>
          <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // State A: Incomplete (< 10 completed)
  if (!review.isUnlocked) {
    return (
      <Layout>
        <div className="bg-gradient-to-r from-emerald-900/10 via-teal-900/5 to-background py-10 border-b">
          <div className="container mx-auto px-4 max-w-4xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full mb-3">
              <Lock className="h-3.5 w-3.5" /> Progress Tracker
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
              Sustainability Skills Review
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Complete all 10 free foundational learning challenges to unlock your personalized workplace performance evaluation.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
          {/* Progress Card */}
          <Card className="p-6 md:p-8 rounded-2xl border-2 border-emerald-100 dark:border-emerald-950 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                  Foundational Pathway Progress
                </p>
                <h3 className="text-2xl font-bold font-serif text-foreground">
                  {review.completedCount} of {review.totalRequired} Challenges Completed
                </h3>
              </div>
              <Badge variant="outline" className="text-sm font-semibold px-3 py-1 self-start sm:self-auto">
                {review.progressPercentage}% Complete
              </Badge>
            </div>

            <Progress value={review.progressPercentage} className="h-3 mb-4" />
            <p className="text-sm text-muted-foreground">{review.performanceSummary}</p>
          </Card>

          {/* Remaining Challenges Checklist */}
          <div>
            <h3 className="text-lg font-bold font-serif mb-4 flex items-center gap-2">
              <span>Next Challenges in Your Pathway</span>
            </h3>
            <div className="grid gap-3">
              {review.challengeRecords.map((rec) => (
                <div
                  key={rec.courseId}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                    rec.isCompleted
                      ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900 text-foreground"
                      : "bg-card border-border hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                        rec.isCompleted
                          ? "bg-emerald-600 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {rec.isCompleted ? <CheckCircle2 className="h-4 w-4" /> : rec.order}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground font-semibold">
                          {rec.courseCode}
                        </span>
                        <h4 className="font-semibold text-sm">{rec.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{rec.competencyArea}</p>
                    </div>
                  </div>

                  <div>
                    {rec.isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed {rec.score !== null ? `(${rec.score}%)` : ""}
                      </span>
                    ) : (
                      <Button size="sm" asChild className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium">
                        <Link href={`/courses/${rec.courseId}`}>
                          Start Challenge
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <GeckoTip
            title="Gecko Tip: Unlocking Your Review"
            tip="Each challenge takes around 15–20 minutes and includes authentic workplace situations in Mauritius. Once all 10 are completed, your performance rating and personalized strengths unlock automatically."
          />
        </div>
      </Layout>
    );
  }

  // State B: Unlocked (10 of 10 completed)
  return (
    <Layout>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 text-white py-12 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Foundations Pathway Completed
            </span>
            <Badge variant="outline" className="text-white border-white/30 text-xs font-semibold">
              {review.performanceRating}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3 leading-tight">
            Sustainability Skills Review
          </h1>
          <p className="text-white/85 text-base md:text-lg max-w-2xl leading-relaxed">
            {review.performanceSummary}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Core Score & Rating Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          <Card className="p-5 rounded-2xl border text-center bg-card shadow-xs">
            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-1">
              Overall Performance
            </span>
            <p className="text-4xl font-extrabold text-foreground font-serif">
              {review.overallScore !== null ? `${review.overallScore}%` : "Verified"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {review.overallScore !== null
                ? "Average scored assessment across 10 challenges"
                : "Completion confirmed from historical records"}
            </p>
          </Card>

          <Card className="p-5 rounded-2xl border text-center bg-card shadow-xs">
            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-1">
              Rating
            </span>
            <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 font-serif">
              {review.performanceRating}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Foundational mastery status</p>
          </Card>

          <Card className="p-5 rounded-2xl border text-center bg-card shadow-xs">
            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block mb-1">
              Challenges Completed
            </span>
            <p className="text-4xl font-extrabold text-foreground font-serif">
              10 / 10
            </p>
            <p className="text-xs text-muted-foreground mt-1">100% of Free Pathway</p>
          </Card>
        </div>

        {/* Detailed Feedback: Concrete Strength & Skill to Develop */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Concrete Strength */}
          {review.concreteStrength && (
            <Card className="p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/20 dark:border-emerald-900 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shrink-0">
                  <Award className="h-4 w-4" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Concrete Workplace Strength
                  </span>
                  <p className="text-xs font-mono text-muted-foreground">
                    {review.concreteStrength.courseCode} — {review.concreteStrength.courseTitle}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-100 mb-2">
                {review.concreteStrength.headline}
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed mb-3">
                {review.concreteStrength.workplaceEvidence}
              </p>
              <div className="rounded-xl bg-white/70 dark:bg-card/60 p-3 text-xs text-foreground/80 border">
                <strong>Demonstrated Decision: </strong>
                {review.concreteStrength.achievableDecision}
              </div>
            </Card>
          )}

          {/* Skill to Develop */}
          {review.skillToDevelop && (
            <Card className="p-6 rounded-2xl border-2 border-amber-200 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-900 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600 text-white shrink-0">
                  <TrendingUp className="h-4 w-4" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    Specific Skill to Develop
                  </span>
                  <p className="text-xs font-mono text-muted-foreground">
                    {review.skillToDevelop.courseCode} — {review.skillToDevelop.courseTitle}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-amber-950 dark:text-amber-100 mb-2">
                {review.skillToDevelop.headline}
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed mb-3">
                {review.skillToDevelop.improvementArea}
              </p>
              <div className="rounded-xl bg-white/70 dark:bg-card/60 p-3 text-xs text-foreground/80 border">
                <strong>Achievable Next Step: </strong>
                {review.skillToDevelop.actionableNextStep}
              </div>
            </Card>
          )}
        </div>

        {/* Recommended Follow-On Paid Challenge */}
        {review.recommendation && (
          <Card className="overflow-hidden rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 bg-card shadow-md">
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  Recommended Next Step
                </span>
                <span className="font-mono text-xs font-semibold text-white/80">
                  {review.recommendation.courseCode}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-2">
                {review.recommendation.title}
              </h3>
              <p className="text-white/85 text-sm leading-relaxed">
                {review.recommendation.reason}
              </p>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/20">
              <div className="text-xs text-muted-foreground">
                {review.userContext.isPaidCompany
                  ? "Included in your company's active Morieva Skills subscription."
                  : review.userContext.canUpgradeCompany
                  ? "Available with the Professional and Complete company subscription plans."
                  : "Preview this challenge or request company access from your employer."}
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                {review.recommendation.previewAction.type === "open_challenge" ? (
                  <Button asChild className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold">
                    <Link href={review.recommendation.previewAction.targetHref}>
                      Start Challenge
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : review.recommendation.previewAction.type === "upgrade_company" ? (
                  <Button asChild className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold">
                    <Link href="/company/subscribe">
                      <Building2 className="mr-2 h-4 w-4" />
                      View Subscription Options
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setPreviewChallenge({
                        id: review.recommendation!.courseId,
                        courseCode: review.recommendation!.courseCode,
                        title: review.recommendation!.title,
                        description: review.recommendation!.reason,
                      });
                    }}
                    className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                  >
                    Preview Challenge
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Detailed Assessment Breakdown Table */}
        <Card className="p-6 rounded-2xl border shadow-xs">
          <h3 className="text-lg font-bold font-serif mb-4 flex items-center justify-between">
            <span>Completed Foundational Challenges ({review.challengeRecords.length})</span>
            <span className="text-xs font-normal text-muted-foreground">Scored Attempts Model</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b text-xs uppercase text-muted-foreground bg-muted/30">
                <tr>
                  <th className="p-3">Order</th>
                  <th className="p-3">Challenge</th>
                  <th className="p-3">Competency Area</th>
                  <th className="p-3 text-right">Score</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {review.challengeRecords.map((r) => (
                  <tr key={r.courseId} className="hover:bg-muted/20">
                    <td className="p-3 font-semibold text-muted-foreground">{r.order}</td>
                    <td className="p-3">
                      <Link href={`/courses/${r.courseId}`} className="font-semibold text-foreground hover:underline">
                        {r.title}
                      </Link>
                      <span className="block text-xs text-muted-foreground font-mono">{r.courseCode}</span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{r.competencyArea}</td>
                    <td className="p-3 text-right font-mono font-semibold">
                      {r.score !== null ? `${r.score}%` : r.hasLegacyPartialEvidence ? "Verified" : "--"}
                    </td>
                    <td className="p-3 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Gecko Tip */}
        <GeckoTip
          title="Gecko Tip: Taking Action at Work"
          tip="A performance review is most useful when turned into a physical workplace habit. Discuss your top strength with your team and pick one area to improve during your next shift."
        />
      </div>

      {/* Preview Modal for Paid Recommendations */}
      {previewChallenge && (
        <PaidChallengePreviewModal
          isOpen={Boolean(previewChallenge)}
          onClose={() => setPreviewChallenge(null)}
          challenge={previewChallenge}
        />
      )}
    </Layout>
  );
}
