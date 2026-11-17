import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetEnrollment,
  useGetProgress,
  useUpdateProgress,
  useGetCommitments,
  useSaveCommitments,
  useGetCourseProgressSummary,
  useGetCourseQuiz,
  useSubmitQuiz,
  useGetCourse,
  useCreateEnrollment,
  usePlatformAdminListQuizQuestions,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { WorkplaceCommitmentModal } from "@/components/WorkplaceCommitmentModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Trophy,
  Download,
  GraduationCap,
  AlertCircle,
  Lock,
  BookOpen,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { trackCommercialEvent } from "@/lib/commercialAnalytics";
import {
  TextView,
  CalloutView,
  ScenarioView,
  CheckView,
  CommitmentView,
  WorkplaceDecisionView,
  SortingView,
  MatchingView,
  SequencingView,
  PrioritisationView,
  MultiStepScenarioView,
  ChallengeAssessmentView,
} from "./blocks";

function isDatabaseInteractive(block: any): boolean {
  return [
    "multiple_choice",
    "decision_scenario",
    "scenario",
    "interactive_scenario",
    "commitment",
    "workplace_action",
    "action_plan",
    "sorting",
    "sorting_activity",
    "matching",
    "matching_exercise",
    "sequencing",
    "sequencing_exercise",
    "prioritisation",
    "prioritisation_challenge",
    "multi_step_scenario",
    "challenge_assessment",
  ].includes(block.type);
}

type Phase = "modules" | "quiz" | "complete";

export default function DatabaseCoursePlayer({
  enrollmentId,
  isPreview = false,
  previewCourseId,
}: {
  enrollmentId?: number;
  isPreview?: boolean;
  previewCourseId?: number;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 1. Queries and Mutations (Conditional on preview mode)
  const { data: rawEnrollment, isLoading: isEnrollmentLoading } = useGetEnrollment(enrollmentId || 0, {
    query: { enabled: !!enrollmentId && !isPreview, queryKey: ["enrollment", enrollmentId], retry: 1 },
  });

  const { data: fallbackCourse, isLoading: isFallbackCourseLoading } = useGetCourse(enrollmentId || 0, {
    query: { enabled: !isPreview && !rawEnrollment && !!enrollmentId, queryKey: ["course", enrollmentId], retry: 1 },
  });

  const autoEnrollMutation = useCreateEnrollment();

  const { data: rawProgressRows } = useGetProgress(enrollmentId || 0, {
    query: { enabled: !!enrollmentId && !isPreview, queryKey: ["progress", enrollmentId] },
  });

  const { data: previewCourse, isLoading: isPreviewCourseLoading } = useGetCourse(previewCourseId || 0, {
    query: { enabled: isPreview && !!previewCourseId, queryKey: ["course", previewCourseId] },
  });

  const courseId = isPreview
    ? (previewCourseId ?? 0)
    : (rawEnrollment?.course?.id ?? fallbackCourse?.id ?? 0);

  // Track learner course progression signal
  useEffect(() => {
    if (courseId && !isPreview) {
      trackCommercialEvent(
        "learner_course_started",
        {
          courseId,
          courseCode: (rawEnrollment?.course as any)?.courseCode || (fallbackCourse as any)?.courseCode,
          authenticatedState: "employee",
          source: "course_player",
        },
        { dedupKey: `elevio_learner_course_${courseId}` }
      );
    }
  }, [courseId, isPreview, rawEnrollment, fallbackCourse]);

  // If user opened player via course ID and enrollment wasn't found, auto-enroll in background
  useEffect(() => {
    if (!isPreview && !rawEnrollment && fallbackCourse && !autoEnrollMutation.isPending && !autoEnrollMutation.isSuccess) {
      autoEnrollMutation.mutate(
        { data: { courseId: fallbackCourse.id } },
        {
          onSuccess: (created) => {
            queryClient.invalidateQueries({ queryKey: ["enrollment", created.id] });
            queryClient.invalidateQueries({ queryKey: ["enrollment", enrollmentId] });
            queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
          },
        }
      );
    }
  }, [isPreview, rawEnrollment, fallbackCourse]);

  const { data: rawExistingCommitments } = useGetCommitments(courseId, {
    query: { enabled: !!courseId && !isPreview, queryKey: ["commitments", courseId] },
  });

  const { data: savedInteractions = [] } = useQuery<any[]>({
    queryKey: ["interactionsProgress", courseId],
    queryFn: async () => {
      if (!courseId || isPreview) return [];
      try {
        return (await customFetch(`/api/interactions/progress?courseId=${courseId}`)) as any[];
      } catch {
        return [];
      }
    },
    enabled: !!courseId && !isPreview,
  });

  const interactionMap = useMemo(() => {
    const map = new Map<string, any>();
    for (const item of savedInteractions) {
      if (item.interactionId && item.statePayload) {
        map.set(item.interactionId, item.statePayload);
      }
    }
    return map;
  }, [savedInteractions]);

  const rawUpdateProgress = useUpdateProgress();
  const rawSaveCommitments = useSaveCommitments();

  // Mock States for Admin Preview
  const [mockCompletedIds, setMockCompletedIds] = useState<Set<number>>(new Set());
  const [mockCommitments, setMockCommitments] = useState<string[]>([]);

  // 2. Computed States
  const enrollment = useMemo(() => {
    if (isPreview) {
      return {
        course: previewCourse ? {
          ...previewCourse,
        } : null,
        progressPct: 0,
        status: "active",
      };
    }
    if (rawEnrollment) {
      return rawEnrollment;
    }
    if (fallbackCourse) {
      return {
        id: enrollmentId || 0,
        courseId: fallbackCourse.id,
        course: fallbackCourse,
        progressPct: 0,
        status: "active",
      };
    }
    return null;
  }, [isPreview, previewCourse, rawEnrollment, fallbackCourse, enrollmentId]);

  const lessons = useMemo(
    () => (enrollment?.course?.lessons ? [...enrollment.course.lessons].sort((a, b) => a.orderIndex - b.orderIndex) : []),
    [enrollment],
  );

  const completedIds = useMemo(
    () => isPreview ? mockCompletedIds : new Set((rawProgressRows || []).filter((p) => p.completed).map((p) => p.lessonId)),
    [isPreview, mockCompletedIds, rawProgressRows],
  );

  const existingCommitments = useMemo(() => {
    if (isPreview) {
      return { commitments: mockCommitments };
    }
    return rawExistingCommitments;
  }, [isPreview, mockCommitments, rawExistingCommitments]);

  // Mock mutations
  const updateProgress = useMemo(() => {
    if (isPreview) {
      return {
        isPending: false,
        mutate: (args: any, callbacks: any) => {
          setMockCompletedIds(prev => {
            const next = new Set(prev);
            next.add(args.data.lessonId);
            return next;
          });
          callbacks?.onSuccess?.();
        }
      };
    }
    return rawUpdateProgress;
  }, [isPreview, rawUpdateProgress]);

  const saveCommitments = useMemo(() => {
    if (isPreview) {
      return {
        isPending: false,
        mutate: (args: any, callbacks: any) => {
          setMockCommitments(args.data.commitments);
          callbacks?.onSuccess?.();
        }
      };
    }
    return rawSaveCommitments;
  }, [isPreview, rawSaveCommitments]);

  const [phase, setPhase] = useState<Phase>("modules");
  const [moduleIndex, setModuleIndex] = useState(0);
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const [commitmentSel, setCommitmentSel] = useState<Set<string>>(new Set());
  const [initialised, setInitialised] = useState(false);

  // Resume to first uncompleted module, or to the completion hub if all modules done.
  useEffect(() => {
    if (initialised || (!isPreview && !enrollment) || (isPreview && !previewCourse) || lessons.length === 0) return;
    const firstUncompleted = lessons.findIndex((l) => !completedIds.has(l.id));
    if (firstUncompleted === -1) {
      setPhase("complete");
      setModuleIndex(lessons.length - 1);
    } else {
      setModuleIndex(firstUncompleted);
    }
    setInitialised(true);
  }, [enrollment, previewCourse, lessons, completedIds, initialised, isPreview]);

  // Prefill saved commitments.
  useEffect(() => {
    if (existingCommitments?.commitments?.length) {
      setCommitmentSel(new Set(existingCommitments.commitments));
    }
  }, [existingCommitments]);

  // Reset per-module interaction state when the module changes.
  useEffect(() => {
    setResolved(new Set());
  }, [moduleIndex]);

  const isLoading = isPreview
    ? isPreviewCourseLoading
    : !enrollment && (isEnrollmentLoading || isFallbackCourseLoading);

  if (isLoading || (isPreview && !previewCourse) || (!isPreview && !enrollment)) {
    return (
      <div className="min-h-screen bg-background">
        <header className="h-16 border-b flex items-center px-4">
          <Skeleton className="h-6 w-40" />
        </header>
        <div className="max-w-3xl mx-auto p-6 space-y-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  // Check if course access is restricted by plan gating or missing company assignment
  const accessDecision = (enrollment?.course as any)?.accessDecision || (fallbackCourse as any)?.accessDecision;
  const isAccessBlocked = !isPreview && accessDecision && accessDecision.allowed === false;

  if (isAccessBlocked) {
    const courseTitle = fallbackCourse?.title || enrollment?.course?.title || "Sustainability Challenge";
    const requiredPlan = accessDecision.requiredPlanName || "Professional";
    const isCompanyNotAssigned = accessDecision.reason === "COMPANY_NOT_ASSIGNED";
    const isPrereqRequired = accessDecision.reason === "PREREQUISITE_REQUIRED";

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-4 shrink-0 bg-card sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="font-serif font-semibold text-base sm:text-lg truncate">
              {courseTitle}
            </div>
          </div>
          <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30">
            <Lock className="w-3 h-3 mr-1" />
            {requiredPlan} Plan
          </Badge>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-xl w-full mx-auto space-y-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                Morieva Skills • Paid Challenge
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                {courseTitle}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                {isPrereqRequired
                  ? "You must complete the prerequisite foundational challenges before taking this challenge."
                  : isCompanyNotAssigned
                  ? "This challenge is part of Morieva Skills enterprise corporate pathways. Link your account to an active company subscription or start with our Free Foundational Challenges."
                  : `This challenge is available with the ${requiredPlan} Plan. Upgrade your subscription to unlock all interactive modules, workplace decision scenarios, and accredited micro-credentials.`}
              </p>
            </div>

            <Card className="p-6 text-left border-border/80 bg-card/60 shadow-sm space-y-4">
              <h4 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">What's Included in This Challenge:</h4>
              <ul className="space-y-2.5 text-sm text-foreground">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>5 interactive workplace modules with Mauritian industry scenarios</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Practical decision exercises and operational commitment tools</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Rigorous accredited quiz assessment with explanatory feedback</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Official digital credential and verifiable Certificate of Completion</span>
                </li>
              </ul>
            </Card>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white gap-2">
                  <Sparkles className="w-4 h-4" />
                  View Subscription Plans
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  Browse Free Challenges
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-4 shrink-0 bg-card">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="font-serif font-semibold text-base sm:text-lg truncate">
              {enrollment?.course?.title || fallbackCourse?.title || "Challenge Player"}
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <BookOpen className="h-12 w-12 text-muted-foreground/60 mx-auto" />
            <h2 className="text-xl font-bold font-serif">Curriculum Finalization in Progress</h2>
            <p className="text-sm text-muted-foreground">
              The instructional lessons for this challenge are currently being scheduled and verified.
            </p>
            <Link href="/courses">
              <Button variant="outline" className="mt-2">Back to Challenges</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const module = lessons[moduleIndex];
  const blocks = module?.contentBlocks || [];
  const isCommitmentLesson = blocks.some((b: any) => b.type === "commitment" || b.type === "workplace_action" || b.type === "action_plan");
  const interactiveCount = blocks.filter(isDatabaseInteractive).length;
  const gatePassed = isCommitmentLesson ? commitmentSel.size > 0 : interactiveCount === 0 || resolved.size >= interactiveCount;
  const overallPct = Math.round((completedIds.size / Math.max(lessons.length, 1)) * 100);

  function markResolved(blockIndex: number) {
    setResolved((prev) => {
      if (prev.has(blockIndex)) return prev;
      const next = new Set(prev);
      next.add(blockIndex);
      return next;
    });
  }

  function invalidateProgress() {
    if (!isPreview) {
      if (enrollmentId) {
        queryClient.invalidateQueries({ queryKey: ["progress", enrollmentId] });
        queryClient.invalidateQueries({ queryKey: ["enrollment", enrollmentId] });
      }
      if (courseId) {
        queryClient.invalidateQueries({ queryKey: ["courseSummary", courseId] });
      }
    }
  }

  function advanceFromModule() {
    const lesson = lessons[moduleIndex];
    const isLast = moduleIndex === lessons.length - 1;

    const proceed = () => {
      invalidateProgress();
      if (isLast) {
        setPhase("quiz");
      } else {
        setModuleIndex((i) => i + 1);
      }
      window.scrollTo({ top: 0 });
    };

    if (lesson && !completedIds.has(lesson.id)) {
      updateProgress.mutate(
        { enrollmentId: enrollmentId || 0, data: { lessonId: lesson.id, completed: true } },
        {
          onSuccess: proceed,
          onError: () => toast({ title: "Could not save progress", variant: "destructive" }),
        },
      );
    } else {
      proceed();
    }
  }

  function handleModuleContinue() {
    if (isCommitmentLesson && commitmentSel.size > 0) {
      saveCommitments.mutate(
        { courseId, data: { commitments: Array.from(commitmentSel) } },
        {
          onSuccess: () => {
            if (!isPreview) {
              queryClient.invalidateQueries({ queryKey: ["commitments", courseId] });
            }
            toast({ title: "Commitment saved", description: "Well done for taking the first step." });
            advanceFromModule();
          },
          onError: () => {
            advanceFromModule();
          },
        },
      );
    } else {
      advanceFromModule();
    }
  }

  function renderDatabaseBlock(block: any, i: number) {
    switch (block.type) {
      case "heading":
        return <TextView key={i} block={{ type: "text", heading: block.headingText || block.heading, body: "" }} />;
      case "text":
      case "short_text":
      case "paragraph":
        return <TextView key={i} block={{ type: "text", heading: block.headingText || block.heading, body: block.bodyText || block.content || block.body || "" }} />;
      case "case_study":
      case "key_message":
      case "workplace_example":
      case "mauritian_example":
      case "practical_action":
        return <CalloutView key={i} block={{ type: "callout", title: block.headingText || block.title || "Key Concept", body: block.bodyText || block.content || block.body || "" }} />;
      case "checklist":
      case "bulleted-list":
      case "ordered-list":
      case "numbered-list":
      case "list": {
        const items = block.items || [];
        const isOrdered = block.type === "ordered-list" || block.type === "numbered-list";
        return (
          <div key={i} className="space-y-3 my-3">
            {block.headingText || block.title ? (
              <h4 className="font-semibold text-foreground text-base tracking-tight">{block.headingText || block.title}</h4>
            ) : null}
            {isOrdered ? (
              <ol className="space-y-2.5 list-none p-0 m-0">
                {items.map((item: any, idx: number) => {
                  const num = typeof item === "object" ? (item.number || item.num || idx + 1) : idx + 1;
                  const title = typeof item === "object" ? item.title : null;
                  const text = typeof item === "object" ? (item.text || item.desc || "") : String(item);
                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/70 bg-card/70 hover:bg-card hover:border-emerald-500/40 transition-all shadow-sm"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300 font-bold text-sm mt-0.5">
                        {num}
                      </span>
                      <div className="text-base leading-relaxed flex-1 min-w-0">
                        {title ? <strong className="font-semibold text-foreground mr-1.5">{title}:</strong> : null}
                        <span className="text-muted-foreground">{text}</span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <ul className="space-y-2.5 list-none p-0 m-0">
                {items.map((item: any, idx: number) => {
                  const title = typeof item === "object" ? item.title : null;
                  const text = typeof item === "object" ? (item.text || item.desc || "") : String(item);
                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/70 bg-card/70 hover:bg-card hover:border-emerald-500/40 transition-all shadow-sm"
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2.5 shrink-0" />
                      <div className="text-base leading-relaxed flex-1 min-w-0">
                        {title ? <strong className="font-semibold text-foreground mr-1.5">{title}:</strong> : null}
                        <span className="text-muted-foreground">{text}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      }
      case "scenario":
      case "decision_scenario":
      case "interactive_scenario": {
        const interactionId = block.id || `decision_${module?.id}_${i}`;
        const savedState = interactionMap.get(interactionId);
        return (
          <WorkplaceDecisionView
            key={i}
            courseId={courseId}
            lessonId={module?.id}
            savedState={savedState}
            block={{
              type: "decision_scenario",
              id: interactionId,
              intro: block.situation || block.decisionIntro,
              prompt: block.prompt || block.decisionPrompt || block.scenarioText || "",
              takeaway: block.takeaway,
              choices: (block.options || block.decisionChoices || block.choices || []).map((c: any) => ({
                label: c.text || c.label,
                feedback: c.feedback || "",
                consequences: c.consequences || c.consequence,
                correct: c.isCorrect ?? c.correct ?? c.ideal,
                ideal: c.isCorrect ?? c.ideal ?? c.correct,
              })),
            }}
            onResolved={() => markResolved(i)}
          />
        );
      }
      case "sorting":
      case "sorting_activity": {
        const interactionId = block.id || `sorting_${module?.id}_${i}`;
        const savedState = interactionMap.get(interactionId);
        return (
          <SortingView
            key={i}
            courseId={courseId}
            lessonId={module?.id}
            savedState={savedState}
            block={{
              type: "sorting_activity",
              id: interactionId,
              title: block.title || "Sorting Activity",
              instruction: block.instruction || "Sort each item into its correct workplace stream:",
              categories: block.categories || [],
              items: block.items || [],
              takeaway: block.takeaway,
            }}
            onResolved={() => markResolved(i)}
          />
        );
      }
      case "matching":
      case "matching_exercise": {
        const interactionId = block.id || `matching_${module?.id}_${i}`;
        const savedState = interactionMap.get(interactionId);
        return (
          <MatchingView
            key={i}
            courseId={courseId}
            lessonId={module?.id}
            savedState={savedState}
            block={{
              type: "matching_exercise",
              id: interactionId,
              title: block.title,
              instruction: block.instruction || "Match each concept with its correct definition or practice:",
              pairs: block.pairs || [],
            }}
            onResolved={() => markResolved(i)}
          />
        );
      }
      case "sequencing":
      case "sequencing_exercise": {
        const interactionId = block.id || `sequencing_${module?.id}_${i}`;
        const savedState = interactionMap.get(interactionId);
        return (
          <SequencingView
            key={i}
            courseId={courseId}
            lessonId={module?.id}
            savedState={savedState}
            block={{
              type: "sequencing_exercise",
              id: interactionId,
              title: block.title || "Operational Sequencing",
              instruction: block.instruction || "Arrange the steps into the correct operational sequence:",
              steps: block.steps || block.items || [],
              takeaway: block.takeaway,
            }}
            onResolved={() => markResolved(i)}
          />
        );
      }
      case "prioritisation":
      case "prioritisation_challenge": {
        const interactionId = block.id || `priority_${module?.id}_${i}`;
        const savedState = interactionMap.get(interactionId);
        return (
          <PrioritisationView
            key={i}
            courseId={courseId}
            lessonId={module?.id}
            savedState={savedState}
            block={{
              type: "prioritisation_challenge",
              id: interactionId,
              title: block.title || "Prioritisation Challenge",
              prompt: block.prompt || "Select the highest impact actions:",
              maxSelect: block.maxSelect || 2,
              options: block.options || [],
              consequences: block.consequences,
            }}
            onResolved={() => markResolved(i)}
          />
        );
      }
      case "multi_step_scenario": {
        const interactionId = block.id || `multistep_${module?.id}_${i}`;
        const savedState = interactionMap.get(interactionId);
        return (
          <MultiStepScenarioView
            key={i}
            courseId={courseId}
            lessonId={module?.id}
            savedState={savedState}
            block={{
              type: "multi_step_scenario",
              id: interactionId,
              title: block.title || "Workplace Branching Scenario",
              stages: block.stages || [],
              outcomes: block.outcomes || {},
            }}
            onResolved={() => markResolved(i)}
          />
        );
      }
      case "challenge_assessment": {
        const interactionId = block.id || `challenge_assessment_${module?.id}_${i}`;
        const savedState = interactionMap.get(interactionId);
        return (
          <ChallengeAssessmentView
            key={i}
            courseId={courseId}
            lessonId={module?.id}
            savedState={savedState}
            block={{
              type: "challenge_assessment",
              id: interactionId,
              title: block.title || "Challenge Mission Assessment",
              description: block.description || "Demonstrate practical competency to fulfill challenge criteria.",
              passThreshold: block.passThreshold,
              questions: block.questions || [],
            }}
            onResolved={() => markResolved(i)}
          />
        );
      }
      case "multiple_choice":
        return (
          <CheckView
            key={i}
            block={{
              type: "check",
              question: block.mcqQuestion || "Knowledge Check",
              options: block.mcqOptions || [],
              correctIndex: block.mcqCorrectIndex ?? 0,
              explanation: block.mcqCorrectExplanation || ""
            }}
            onResolved={() => markResolved(i)}
          />
        );
      case "workplace_action":
      case "action_plan":
      case "commitment": {
        const actionOptions = block.actionOptions || block.commitmentOptions || block.options || [];
        return (
          <div key={i} className="my-3">
            <CommitmentView
              block={{
                type: "commitment",
                instruction: block.commitmentInstruction || block.instruction || "",
                options: actionOptions,
              }}
              selected={commitmentSel}
              onToggle={(value) => {
                setCommitmentSel((prev) => {
                  const next = new Set(prev);
                  if (next.has(value)) next.delete(value);
                  else next.add(value);
                  return next;
                });
                markResolved(i);
              }}
            />
          </div>
        );
      }
      case "memorable_fact":
        return (
          <CalloutView
            key={i}
            block={{
              type: "callout",
              title: block.headingText || "Did You Know? (Worth Knowing)",
              body: block.bodyText || block.body || ""
            }}
          />
        );
      case "image":
      case "visual_question":
      case "visual_identification":
        return (
          <div key={i} className="my-6 overflow-hidden rounded-xl border bg-card shadow-sm">
            {block.imageUrl || block.url ? (
              <img
                src={block.imageUrl || block.url}
                alt={block.imageAlt || block.caption || "Course illustration"}
                className="w-full max-h-[450px] object-cover"
              />
            ) : null}
            {block.caption ? (
              <p className="p-3 text-center text-xs text-muted-foreground bg-muted/30 border-t">{block.caption}</p>
            ) : null}
          </div>
        );
      case "table": {
        const headers: string[] = block.headers || [];
        const rows: any[][] = block.rows || [];
        return (
          <div key={i} className="my-5 overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
            {block.title ? (
              <div className="bg-muted/40 px-4 py-3 border-b font-semibold text-foreground text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>{block.title}</span>
              </div>
            ) : null}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                {headers.length > 0 && (
                  <thead className="bg-muted/30 text-xs font-semibold uppercase text-muted-foreground border-b">
                    <tr>
                      {headers.map((h, idx) => (
                        <th key={idx} className="px-4 py-3 font-semibold text-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody className="divide-y divide-border/60">
                  {rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                      {Array.isArray(row)
                        ? row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3 text-muted-foreground text-sm leading-relaxed">{String(cell)}</td>
                          ))
                        : (
                            <td className="px-4 py-3 text-muted-foreground text-sm leading-relaxed">{String(row)}</td>
                          )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      default: {
        const title = block?.headingText || block?.heading || block?.title;
        const text = block?.bodyText || block?.body || block?.content || block?.text || block?.description;
        if (title || text) {
          return (
            <TextView
              key={i}
              block={{
                type: "text",
                heading: title,
                body: text || "",
              }}
            />
          );
        }
        return null;
      }
    }
  }

  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="h-16 border-b flex items-center justify-between px-4 shrink-0 bg-card sticky top-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={isPreview ? "/platform-admin/courses" : "/dashboard"} className="text-muted-foreground hover:text-foreground shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="font-serif font-semibold text-base sm:text-lg truncate">
            {enrollment?.course?.title || "Challenge Player"}
          </div>
        </div>
        <div className="text-sm font-medium text-muted-foreground shrink-0">{overallPct}% {t("common.completed")}</div>
      </header>

      <div className="border-b bg-card">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Progress value={phase === "modules" ? overallPct : 100} className="h-1.5" />
          {phase === "modules" ? (
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {lessons.map((l, i) => (
                <span
                  key={l.id}
                  className={
                    i === moduleIndex
                      ? "font-semibold text-primary"
                      : completedIds.has(lessons[i]?.id)
                        ? "text-emerald-600"
                        : ""
                  }
                >
                  {i + 1}. {l.title}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <main className="flex-1 w-full">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {phase === "modules" ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-primary">
                  {t("player.module")} {moduleIndex + 1} / {lessons.length}
                </p>
                <h1 className="text-3xl font-bold font-serif leading-tight">{module?.title}</h1>
              </div>

              {(() => {
                const renderedBlocks = blocks
                  .map((b: any, i: number) => renderDatabaseBlock(b, i))
                  .filter(Boolean);
                const hasVisibleBlocks = renderedBlocks.length > 0;

                return (
                  <div className="space-y-5" key={module?.id}>
                    {hasVisibleBlocks ? (
                      renderedBlocks
                    ) : module?.content && module.content.trim().length > 0 ? (
                      <div className="space-y-4">
                        <TextView
                          block={{
                            type: "text",
                            heading: module.title,
                            body: module.content,
                          }}
                        />
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-8 text-center space-y-3 my-6">
                        <BookOpen className="h-8 w-8 text-muted-foreground/60 mx-auto" />
                        <h3 className="font-semibold text-foreground text-base">Module Overview</h3>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          {module?.title ? `Practical guidelines for ${module.title}.` : "This module content is being prepared."}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {!gatePassed ? (
                <p className="text-sm text-muted-foreground">
                  {isCommitmentLesson
                    ? "Choose at least one commitment to finish the course."
                    : "Complete the activities above to continue."}
                </p>
              ) : null}

              <div className="flex items-center justify-between border-t pt-6">
                <Button
                  variant="ghost"
                  disabled={moduleIndex === 0}
                  onClick={() => {
                    setModuleIndex((i) => Math.max(0, i - 1));
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Previous
                </Button>
                <Button
                  size="lg"
                  disabled={!gatePassed || updateProgress.isPending || saveCommitments.isPending}
                  onClick={handleModuleContinue}
                >
                  {updateProgress.isPending || saveCommitments.isPending
                    ? "Saving..."
                    : moduleIndex === lessons.length - 1
                      ? "Finish and take the quiz"
                      : "Mark complete and continue"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}

          {phase === "quiz" ? (
            <FinalQuiz
              courseId={courseId}
              isPreview={isPreview}
              onPassed={() => {
                invalidateProgress();
                if (!isPreview) {
                  queryClient.invalidateQueries({ queryKey: ["courseSummary", courseId] });
                }
                setPhase("complete");
                window.scrollTo({ top: 0 });
              }}
              onBackToModules={() => {
                setPhase("modules");
                setModuleIndex(lessons.length - 1);
              }}
            />
          ) : null}

          {phase === "complete" ? (
            <CompletionScreen
              courseId={courseId}
              isPreview={isPreview}
              mockCompletedIds={mockCompletedIds}
              mockCommitments={mockCommitments}
              lessons={lessons}
              enrollment={enrollment}
              onTakeQuiz={() => setPhase("quiz")}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}

function FinalQuiz({
  courseId,
  isPreview,
  onPassed,
  onBackToModules,
}: {
  courseId: number;
  isPreview: boolean;
  onPassed: () => void;
  onBackToModules: () => void;
}) {
  const { toast } = useToast();
  const { data: rawQuiz, isLoading: isRawQuizLoading } = useGetCourseQuiz(courseId, {
    query: { enabled: !isPreview && !!courseId, queryKey: ["quiz", courseId] },
  });
  const { data: adminQuiz, isLoading: isAdminQuizLoading } = usePlatformAdminListQuizQuestions(courseId, {
    query: { enabled: isPreview && !!courseId, queryKey: ["adminQuiz", courseId] },
  });
  const { data: course } = useGetCourse(courseId, {
    query: { enabled: isPreview && !!courseId, queryKey: ["course", courseId] },
  });
  const rawSubmitQuiz = useSubmitQuiz();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{
    passed: boolean;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    competencyScores?: any;
    recommendations?: number[];
  } | null>(null);

  const passingScore = course?.passingScore ?? 80;

  const quiz = useMemo(() => {
    if (isPreview) {
      return {
        courseId,
        questions: adminQuiz || [],
      };
    }
    return rawQuiz;
  }, [isPreview, courseId, rawQuiz, adminQuiz]);

  const isLoading = isPreview ? isAdminQuizLoading : isRawQuizLoading;

  const submitQuiz = useMemo(() => {
    if (isPreview) {
      return {
        isPending: false,
        mutate: (args: any, callbacks: any) => {
          let correctAnswers = 0;
          const questions = (quiz?.questions || []) as any[];
          for (const answer of args.data.answers) {
            const question = questions.find((q: any) => q.id === answer.questionId);
            if (question && question.correctOption === answer.selectedOption) {
              correctAnswers++;
            }
          }
          const totalQuestions = questions.length;
          const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
          const passed = score >= passingScore;
          callbacks?.onSuccess?.({
            passed,
            score,
            correctAnswers,
            totalQuestions,
            certificateId: null
          });
        }
      };
    }
    return rawSubmitQuiz;
  }, [isPreview, quiz, passingScore, rawSubmitQuiz]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground mb-4">The quiz is not available right now.</p>
        <Button variant="outline" onClick={onBackToModules}>
          Back to modules
        </Button>
      </Card>
    );
  }

  if (result) {
    if ((result as any).competencyScores) {
      const passed = result.passed;
      return (
        <Card className="p-8 text-center max-w-2xl mx-auto">
          {passed ? (
            <>
              <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold font-serif mb-2">Certification Passed!</h2>
              <p className="text-muted-foreground mb-6">
                Overall Score: {result.score}% ({result.correctAnswers}/{result.totalQuestions})
              </p>
            </>
          ) : (
            <>
              <div className="h-20 w-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-5">
                <XCircle className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold font-serif mb-2">Certification Failed</h2>
              <p className="text-muted-foreground mb-6">
                Overall Score: {result.score}% (Requires {passingScore}%)
              </p>
            </>
          )}

          <div className="text-left space-y-4 mb-8">
            <h3 className="font-semibold text-lg border-b pb-2">Competency Breakdown (Requires 70% each)</h3>
            {Object.entries(result.competencyScores).map(([area, score]: [string, any]) => (
              <div key={area} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-medium capitalize">{area.replace(/_/g, ' ')}</span>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <span className="text-sm text-muted-foreground">{score.correct}/{score.total}</span>
                  <span className={`font-bold ${score.passed ? 'text-emerald-600' : 'text-destructive'}`}>
                    {score.percentage}% {score.passed ? '(Pass)' : '(Fail)'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {!passed && result.recommendations && result.recommendations.length > 0 && (
            <div className="text-left space-y-4 mb-8 bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900">
              <h3 className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Recommended Review
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-300">Based on your incorrect answers, we recommend reviewing these courses before trying again:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800 dark:text-amber-300">
                {result.recommendations.map((courseId: number) => (
                  <li key={courseId}>
                    <Link href={`/courses/${courseId}`} className="underline hover:text-amber-900">
                      Review Course {courseId}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 justify-center pt-4 border-t">
             {passed ? (
               <Button size="lg" onClick={onPassed}>
                 See your results
               </Button>
             ) : (
               <>
                 <Button
                   size="lg"
                   onClick={() => {
                     setResult(null);
                     setCurrent(0);
                     setAnswers({});
                   }}
                 >
                   Retry Certification
                 </Button>
                 <Button size="lg" variant="outline" onClick={onBackToModules}>
                   Back to Briefing
                 </Button>
               </>
             )}
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-8 text-center">
        {result.passed ? (
          <>
            <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold font-serif mb-2">You passed</h2>
            <p className="text-muted-foreground mb-1">
              Score: {result.score}% ({result.correctAnswers}/{result.totalQuestions})
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {isPreview ? "Preview complete. No certificate will be generated." : "Your certificate is ready."}
            </p>
            <Button size="lg" onClick={onPassed}>
              See your results
            </Button>
          </>
        ) : (
          <>
            <div className="h-20 w-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-5">
              <XCircle className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold font-serif mb-2">Not quite there yet</h2>
            <p className="text-muted-foreground mb-1">
              Score: {result.score}% ({result.correctAnswers}/{result.totalQuestions})
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              You need {passingScore}% to pass. Review the modules and try again.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  setResult(null);
                  setCurrent(0);
                  setAnswers({});
                }}
              >
                Retry quiz
              </Button>
              <Button size="lg" variant="outline" onClick={onBackToModules}>
                Review modules
              </Button>
            </div>
          </>
        )}
      </Card>
    );
  }

  const question = quiz.questions[current];
  const isLast = current === quiz.questions.length - 1;
  const answered = answers[question.id] !== undefined;
  const progress = (current / quiz.questions.length) * 100;

  function next() {
    if (!isLast) {
      setCurrent((i) => i + 1);
      return;
    }
    const formatted = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId: parseInt(questionId, 10),
      selectedOption,
    }));
    submitQuiz.mutate(
      { courseId, data: { answers: formatted } },
      {
        onSuccess: (res: any) => setResult(res),
        onError: () => toast({ title: "Error submitting quiz", variant: "destructive" }),
      },
    );
  }

  return (
    <div>
      <div className="mb-2">
        <p className="text-sm font-medium text-primary">Final quiz</p>
        <h1 className="text-2xl font-bold font-serif">Test what you have learned</h1>
      </div>
      <div className="mb-6 mt-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            Question {current + 1} of {quiz.questions.length}
          </span>
          <span>You need {passingScore}% to pass</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-medium leading-relaxed mb-4">{question.question}</h2>
        {(question as any).imageUrl && (
          <div className="mb-6 overflow-hidden rounded-xl border bg-card shadow-sm">
            <img
              src={(question as any).imageUrl}
              alt={(question as any).imageAltText || (question as any).imageAlt || "Visual question illustration"}
              className="w-full max-h-[420px] object-cover"
            />
          </div>
        )}
        <div className="space-y-3 mb-8">
          {question.options.map((option: string, index: number) => {
            const isSelected = answers[question.id] === index;
            return (
              <button
                key={index}
                onClick={() => setAnswers({ ...answers, [question.id]: index })}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  isSelected
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-muted bg-background hover:border-primary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? "border-primary" : "border-muted-foreground/30"
                  }`}
                >
                  {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                </div>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="ghost" disabled={current === 0} onClick={() => setCurrent((i) => i - 1)}>
            Previous
          </Button>
          <Button size="lg" disabled={!answered || submitQuiz.isPending} onClick={next}>
            {submitQuiz.isPending ? "Submitting..." : isLast ? "Submit quiz" : "Next question"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CompletionScreen({
  courseId,
  isPreview,
  mockCompletedIds,
  mockCommitments,
  lessons,
  enrollment,
  onTakeQuiz,
}: {
  courseId: number;
  isPreview: boolean;
  mockCompletedIds: Set<number>;
  mockCommitments: string[];
  lessons: any[];
  enrollment: any;
  onTakeQuiz: () => void;
}) {
  const [showCommitmentModal, setShowCommitmentModal] = useState(false);
  const { data: rawSummary, isLoading: isSummaryLoading } = useGetCourseProgressSummary(courseId, {
    query: { enabled: !!courseId && !isPreview, queryKey: ["courseSummary", courseId] },
  });

  const { data: rawCommitments } = useGetCommitments(courseId, {
    query: { enabled: !!courseId && !isPreview, queryKey: ["commitments", courseId] },
  });

  const summary = useMemo(() => {
    if (isPreview) {
      return {
        modulesCompleted: mockCompletedIds.size,
        totalModules: lessons.length,
        points: { totalPoints: mockCompletedIds.size * 50 + 100 },
        bestScore: 100,
        quizPassed: true,
        badgeEarned: true,
        badgeName: enrollment?.course?.badgeName || "Badge",
        certificateId: null,
      };
    }
    if (rawSummary) {
      const isCompletedOr100 = (enrollment?.progressPct ?? 0) >= 100 || enrollment?.status === "completed" || enrollment?.completedAt != null;
      const totalCount = rawSummary.totalModules || lessons.length || 1;
      const actualCompletedCount = isCompletedOr100
        ? totalCount
        : Math.max(
            rawSummary.modulesCompleted || 0,
            (enrollment?.progressPct ?? 0) > 0 ? Math.round(((enrollment?.progressPct ?? 0) / 100) * totalCount) : 0
          );
      const isQuizPassed = rawSummary.quizPassed || isCompletedOr100;
      const bestScore = rawSummary.bestScore ?? (isCompletedOr100 ? 100 : null);
      const points = actualCompletedCount * 50 + (isQuizPassed ? 100 : 0);
      return {
        ...rawSummary,
        modulesCompleted: actualCompletedCount,
        totalModules: totalCount,
        quizPassed: isQuizPassed,
        bestScore,
        points: { totalPoints: rawSummary.points?.totalPoints ? Math.max(rawSummary.points.totalPoints, points) : points },
      };
    }
    return rawSummary;
  }, [isPreview, mockCompletedIds, lessons, rawSummary, enrollment]);

  const selectedCommitmentList = useMemo(() => {
    if (isPreview) {
      return mockCommitments;
    }
    return rawCommitments?.commitments || [];
  }, [isPreview, mockCommitments, rawCommitments]);

  const nextCourseId = enrollment?.course?.recommendedNextCourseId;
  const { data: nextCourse } = useGetCourse(nextCourseId || 0, {
    query: { enabled: !!nextCourseId, queryKey: ["course", nextCourseId] }
  });

  if (isSummaryLoading || !summary) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  const completionMessage = enrollment?.course?.completionMessage ||
    `You have completed the course ${enrollment?.course?.title || ""}. You can now put your newly acquired knowledge into practice.`;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold font-serif">Well done</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          {completionMessage}
        </p>
      </div>

      {/* Continue with Waste Sorting & Recycling in Mauritius link for ELH-02 */}
      {(courseId === 2 || enrollment?.course?.courseCode === "ELH-02" || enrollment?.course?.slug?.includes("waste-sorting")) && (
        <Card className="p-6 border-2 border-emerald-400 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-900/40 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl text-left">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-600 text-white">
                Next Pathway Unlocked
              </span>
              <h3 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-100">
                Continue with Waste Sorting & Recycling in Mauritius
              </h3>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-200/80">
                Put your waste knowledge into action with 8 practical challenges across Ebène offices, Curepipe shops, Grand Baie kitchens, and corporate event clean-ups.
              </p>
            </div>
            <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium shrink-0 shadow-sm gap-2">
              <Link href="/learning-paths/waste-sorting-and-recycling-in-mauritius">
                <span>Continue with Waste Sorting Pathway</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {summary.modulesCompleted}/{summary.totalModules}
          </p>
          <p className="text-xs text-muted-foreground">Modules done</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{summary.points?.totalPoints || 0}</p>
          <p className="text-xs text-muted-foreground">Points earned</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {summary.bestScore != null ? `${summary.bestScore}%` : "--"}
          </p>
          <p className="text-xs text-muted-foreground">Best quiz score</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{summary.quizPassed ? "Pass" : "Pending"}</p>
          <p className="text-xs text-muted-foreground">Final quiz</p>
        </Card>
      </div>

      {summary.badgeEarned && summary.badgeName ? (
        <Card className="p-5 flex items-center gap-4 border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40">
          <div className="h-12 w-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-emerald-900 dark:text-emerald-200">Badge unlocked: {summary.badgeName}</p>
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              {enrollment?.course?.badgeDescription || "You earned this for completing the course."}
            </p>
          </div>
        </Card>
      ) : null}

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Your certificate</h3>
        </div>
        {summary.quizPassed && (summary.certificateId || isPreview) ? (
          <div className="flex flex-col sm:flex-row gap-3">
            {isPreview ? (
              <Button disabled variant="outline">
                Download certificate (Preview)
              </Button>
            ) : (
              <Button asChild>
                <a href={`/api/certificates/${summary.certificateId}/pdf`} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Download certificate
                </a>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/certificates">View all certificates</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Pass the final quiz with {enrollment?.course?.passingScore ?? 80}% or more to unlock your certificate.
            </p>
            <Button onClick={onTakeQuiz}>
              <GraduationCap className="mr-2 h-4 w-4" /> Take the final quiz
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-5">
        <h3 className="font-semibold mb-2">Your Commitments</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Here are the daily workplace actions you committed to practice:
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {selectedCommitmentList.length > 0 ? (
            selectedCommitmentList.map((cValue) => {
              // Dynamic lookup of commitment option label from lessons
              let label = cValue;
              for (const l of lessons) {
                const cBlock = (l.contentBlocks as any[])?.find((b: any) => b.type === "commitment");
                if (cBlock?.commitmentOptions) {
                  const opt = cBlock.commitmentOptions.find((o: any) => (o.value || o.slug || o.id || o.label) === cValue);
                  if (opt) {
                    label = opt.label;
                    break;
                  }
                }
              }
              return (
                <span
                  key={cValue}
                  className="rounded-full bg-emerald-100 text-emerald-850 dark:bg-emerald-950/40 dark:text-emerald-200 px-3 py-1.5 text-xs font-semibold"
                >
                  {label}
                </span>
              );
            })
          ) : (
            <span className="text-xs text-muted-foreground italic">No commitments registered yet.</span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={() => setShowCommitmentModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
          >
            Choose Workplace Action
          </Button>
          {nextCourseId && nextCourse && nextCourse.isPublished ? (
            <Button asChild>
              <Link href={`/courses/${nextCourse.id}`}>
                Next challenge: {nextCourse.title}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : null}
          <Button variant="outline" asChild className="border-emerald-300 text-emerald-850 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100">
            <Link href="/review">
              <Sparkles className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Sustainability Skills Review
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={isPreview ? "/platform-admin/courses" : "/dashboard"}>
              Back to dashboard
            </Link>
          </Button>
        </div>

        <WorkplaceCommitmentModal
          isOpen={showCommitmentModal}
          onClose={() => setShowCommitmentModal(false)}
          courseId={enrollment?.course?.id ?? 0}
          courseTitle={enrollment?.course?.title ?? "Course"}
        />
      </Card>
    </div>
  );
}
