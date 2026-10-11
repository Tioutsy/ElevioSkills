import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { trackCommercialEvent, captureAndPersistAttribution } from "@/lib/commercialAnalytics";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building2,
  Users,
  Award,
  BarChart3,
  BookOpen,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  Clock,
  ChevronRight,
  Lightbulb,
  Layers,
  Briefcase,
  Zap,
  RotateCcw,
} from "lucide-react";

export default function ExperiencePage() {
  const [, setLocation] = useLocation();
  const [currentScreen, setCurrentScreen] = useState<number>(1);

  // Screen 2: Situation Observation Choice
  const [situationChoice, setSituationChoice] = useState<number | null>(null);

  // Screen 4: Decision Scenario Choice
  const [decisionChoice, setDecisionChoice] = useState<number | null>(null);

  const totalScreens = 8;
  const progressPercent = Math.round((currentScreen / totalScreens) * 100);

  // Capture UTM / source attribution and track experience start on mount
  useEffect(() => {
    captureAndPersistAttribution();
    trackCommercialEvent(
      "experience_started",
      {
        experienceStep: "screen_1_intro",
        source: "experience",
        authenticatedState: "anonymous",
      },
      { dedupKey: "elevio_exp_start_session" }
    );
  }, []);

  // Track step progression and completion
  useEffect(() => {
    const stepMap: Record<number, string> = {
      1: "screen_1_intro",
      2: "screen_2_situation",
      3: "screen_3_context",
      4: "screen_4_decision",
      5: "screen_5_feedback",
      6: "screen_6_completion",
      7: "screen_7_dashboard",
      8: "screen_8_commercial",
    };
    const stepKey = stepMap[currentScreen] || `screen_${currentScreen}`;

    trackCommercialEvent("experience_step_viewed", {
      experienceStep: stepKey,
      source: "experience",
      authenticatedState: "anonymous",
    });

    if (currentScreen === 8) {
      trackCommercialEvent(
        "experience_completed",
        {
          experienceStep: stepKey,
          source: "experience",
          authenticatedState: "anonymous",
        },
        { dedupKey: "elevio_exp_completed_session" }
      );
    }
  }, [currentScreen]);

  const handleNext = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentScreen > 1) {
      setCurrentScreen(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRestart = () => {
    setSituationChoice(null);
    setDecisionChoice(null);
    setCurrentScreen(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-background py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Top Control Bar & Progress Indicator */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-semibold px-2.5 py-0.5">
                  <Sparkles className="h-3 w-3 mr-1" /> Product Proof Preview
                </Badge>
                <span className="hidden sm:inline">No account required</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">Step {currentScreen} of {totalScreens}</span>
                {currentScreen > 1 && (
                  <button
                    onClick={handleRestart}
                    className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                    title="Restart experience"
                  >
                    <RotateCcw className="h-3 w-3" /> Restart
                  </button>
                )}
              </div>
            </div>
            
            <div className="relative">
              <Progress value={progressPercent} className="h-2 bg-muted rounded-full" />
            </div>

            {/* Stepper Dots (Desktop) */}
            <div className="hidden md:flex justify-between items-center px-1 text-[11px] text-muted-foreground">
              <span className={currentScreen >= 1 ? "text-emerald-700 dark:text-emerald-400 font-semibold" : ""}>1. Intro</span>
              <span className={currentScreen >= 2 ? "text-emerald-700 dark:text-emerald-400 font-semibold" : ""}>2. Situation</span>
              <span className={currentScreen >= 3 ? "text-emerald-700 dark:text-emerald-400 font-semibold" : ""}>3. Insight</span>
              <span className={currentScreen >= 4 ? "text-emerald-700 dark:text-emerald-400 font-semibold" : ""}>4. Decision</span>
              <span className={currentScreen >= 5 ? "text-emerald-700 dark:text-emerald-400 font-semibold" : ""}>5. Feedback</span>
              <span className={currentScreen >= 6 ? "text-emerald-700 dark:text-emerald-400 font-semibold" : ""}>6. Learner View</span>
              <span className={currentScreen >= 7 ? "text-emerald-700 dark:text-emerald-400 font-semibold" : ""}>7. Company View</span>
              <span className={currentScreen >= 8 ? "text-emerald-700 dark:text-emerald-400 font-semibold" : ""}>8. Summary</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SCREEN 1: Welcome & Introduction */}
          {/* ========================================================================= */}
          {currentScreen === 1 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="text-center max-w-2xl mx-auto space-y-4 pt-4 pb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                  <Lightbulb className="h-3.5 w-3.5" /> 3-Minute Interactive Walkthrough
                </div>
                <h1 className="text-3xl md:text-5xl font-bold font-serif text-foreground tracking-tight leading-[1.15]">
                  Sustainability at work starts with everyday decisions.
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Most corporate training focuses on memorising environmental definitions. ELEVIO Skills is built differently: we train teams to recognise practical workplace opportunities, exercise judgement, and take measurable operational action.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                <Card className="border-border/70 bg-card shadow-xs">
                  <CardContent className="p-5 space-y-2">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm">Workplace Scenarios</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Realistic Mauritian corporate settings (offices, hotels, logistics, branches).
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/70 bg-card shadow-xs">
                  <CardContent className="p-5 space-y-2">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Zap className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm">Immediate Feedback</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Instant explanations connect daily workplace habits to resource use and operational impact.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/70 bg-card shadow-xs">
                  <CardContent className="p-5 space-y-2">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm">Audit-Ready Training Records</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Verifiable completion records and auditable training evidence tracked in one company dashboard.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Navigation Action */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t">
                <div className="text-xs text-muted-foreground text-center sm:text-left">
                  Experience a live 3-step learning scenario followed by the manager reporting preview.
                </div>
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white gap-2 font-semibold h-12 px-8 shadow-sm"
                >
                  <span>Start the Experience</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 2: Workplace Situation (Observation) */}
          {/* ========================================================================= */}
          {currentScreen === 2 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <Badge variant="outline" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-500/30 mb-2">
                  Module 1 · Scenario Observation
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                  The Empty Meeting Room
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Examine the workplace setting below and select the observation you would address first.
                </p>
              </div>

              {/* 16:9 Realistic Scenario Visual */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border shadow-md bg-muted/30">
                <img
                  src="/images/experience-meeting-room.jpg"
                  alt="Empty modern corporate meeting room after a meeting with lights and presentation screen left on, and documents and beverage cups on the conference table"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>

              {/* Situation Narrative Card */}
              <Card className="border-border/80 bg-muted/20 shadow-xs">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="space-y-2 text-sm text-foreground leading-relaxed">
                      <p className="font-medium text-foreground">
                        It is 4:45 PM on a Friday in your Ebène office. A 2-hour strategic planning meeting has just concluded with external partners.
                      </p>
                      <p className="text-muted-foreground">
                        As the last employee walks out the door, you observe:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground pl-2">
                        <li>The split-unit air conditioner is blasting at 19°C with nobody inside.</li>
                        <li>Overhead fluorescent lighting and the presentation display remain powered on.</li>
                        <li>Eight single-use plastic water bottles and disposable coffee cups sit half-empty on the conference table.</li>
                        <li>Twenty pages of printed presentations with confidential financial slides remain uncollected by the whiteboard.</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interaction Question */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-emerald-600" />
                  What would you notice or prioritise first?
                </h3>

                <div className="grid gap-2.5">
                  {[
                    { id: 1, text: "The air conditioning and presentation display running in an unoccupied room over the weekend" },
                    { id: 2, text: "Single-use plastic cups and beverage containers destined for the general landfill waste bin" },
                    { id: 3, text: "Confidential printed slides left unattended, combining data risk and paper waste" },
                    { id: 4, text: "All of the above — this room presents multiple cumulative daily operational sustainability losses", isOptimal: true },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSituationChoice(option.id)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start justify-between gap-3 ${
                        situationChoice === option.id
                          ? "border-emerald-600 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-600/20 font-medium"
                          : "border-border bg-card hover:bg-muted/40 text-foreground"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="h-5 w-5 rounded-full border border-current flex items-center justify-center text-xs shrink-0 mt-0.5">
                          {String.fromCharCode(64 + option.id)}
                        </span>
                        <span>{option.text}</span>
                      </div>
                      {situationChoice === option.id && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-4 flex justify-between items-center border-t">
                <Button variant="outline" onClick={handleBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={situationChoice === null}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 font-semibold"
                >
                  <span>Continue to Learning Insight</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 3: Practical Learning (ELEVIO Methodology) */}
          {/* ========================================================================= */}
          {currentScreen === 3 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <Badge variant="outline" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-500/30 mb-2">
                  ELEVIO Micro-Lesson · Practical Workplace Insight
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                  The Cumulative Cost of Unoccupied Rooms
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  How ELEVIO connects daily employee habits to corporate operational performance.
                </p>
              </div>

              {/* Learning Content Card */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border/80 shadow-xs">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      Energy Consumption Reality
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Air conditioning, lighting, and office equipment left running in unoccupied spaces continue consuming electricity without providing business value.
                    </p>
                    <p>
                      When meeting spaces and workstations operate unattended over weekends and evenings, avoidable energy consumption accumulates directly into higher corporate utility overhead.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/80 shadow-xs">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      The "Last Out" Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
                    <p>
                      ELEVIO trains employees in simple 30-second closing routines:
                    </p>
                    <ul className="space-y-1.5 list-disc list-inside text-foreground font-medium">
                      <li>Adjust AC thermostat to standard eco settings or turn off</li>
                      <li>Power down projector displays and meeting room lights</li>
                      <li>Clear confidential papers into secure collection</li>
                      <li>Separate beverage recyclables from general waste</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Key Takeaway Callout */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-950 dark:text-emerald-200 text-xs md:text-sm flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>The Business Value:</strong> When teams across an organisation consistently adopt simple closing protocols, companies eliminate avoidable energy waste and reinforce responsible workplace habits with zero capital investment.
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-4 flex justify-between items-center border-t">
                <Button variant="outline" onClick={handleBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 font-semibold"
                >
                  <span>Test Your Decision Judgement</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 4: Decision Scenario */}
          {/* ========================================================================= */}
          {currentScreen === 4 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <Badge variant="outline" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-500/30 mb-2">
                  Interactive Assessment · Practical Decision Making
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                  The Department Workshop Dilemma
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  ELEVIO assessments test operational judgement rather than simple memorisation.
                </p>
              </div>

              {/* Decision Prompt */}
              <Card className="border-border/80 bg-muted/20 shadow-xs">
                <CardContent className="p-6 space-y-3">
                  <div className="text-xs uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                    Workplace Challenge
                  </div>
                  <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                    Your team is hosting a 2-day client training workshop for 35 corporate attendees. As the project coordinator, you are selecting catering, beverages, and session materials.
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Which approach best balances client hospitality, operational cost, and corporate sustainability?
                  </p>
                </CardContent>
              </Card>

              {/* Options */}
              <div className="grid gap-3">
                {[
                  {
                    id: 1,
                    title: "Individual Single-Use Packaging",
                    desc: "Order individual pre-packaged plastic lunch boxes with disposable cutlery to speed up cleanup and minimise staff handling.",
                  },
                  {
                    id: 2,
                    title: "Local Caterer with Reusable Service & Digital Materials",
                    desc: "Engage a local Mauritian caterer using washable tableware, glass water carafes, and distribute workshop handouts digitally via QR code.",
                    isOptimal: true,
                  },
                  {
                    id: 3,
                    title: "Imported Biodegradable Single-Use Utensils",
                    desc: "Purchase imported single-use compostable cutlery flown in by air freight at double the budget to display an eco-friendly label.",
                  },
                  {
                    id: 4,
                    title: "Eliminate Catering Entirely",
                    desc: "Cancel catering and require external executive clients to bring their own meals from home to achieve zero corporate footprint.",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDecisionChoice(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      decisionChoice === opt.id
                        ? "border-emerald-600 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-600/20"
                        : "border-border bg-card hover:bg-muted/40 text-foreground"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full border border-current flex items-center justify-center text-xs font-semibold shrink-0">
                          {String.fromCharCode(64 + opt.id)}
                        </span>
                        <span className="font-semibold text-sm">{opt.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-7">{opt.desc}</p>
                    </div>
                    {decisionChoice === opt.id && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-1" />
                    )}
                  </button>
                ))}
              </div>

              {/* Navigation Action */}
              <div className="pt-4 flex justify-between items-center border-t">
                <Button variant="outline" onClick={handleBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={decisionChoice === null}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 font-semibold"
                >
                  <span>Submit & View Explanatory Feedback</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 5: Immediate Explanatory Feedback */}
          {/* ========================================================================= */}
          {currentScreen === 5 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div>
                <Badge variant="outline" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-500/30 mb-2">
                  Immediate Explanatory Feedback
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                  {decisionChoice === 2 ? "Excellent Operational Judgement!" : "Insight & Constructive Feedback"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  ELEVIO explains the rationale behind every decision so employees understand why actions matter.
                </p>
              </div>

              {/* Evaluation Card */}
              <Card className={`border ${decisionChoice === 2 ? "border-emerald-500/40 bg-emerald-500/5" : "border-amber-500/40 bg-amber-500/5"}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    {decisionChoice === 2 ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                    )}
                    <CardTitle className="text-base font-semibold">
                      {decisionChoice === 2
                        ? "Option B is the optimal sustainable business decision"
                        : "Why Option B represents the superior workplace standard"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-xs md:text-sm leading-relaxed text-muted-foreground">
                  <div className="p-3 bg-background/80 rounded-lg border text-foreground space-y-2">
                    <div className="font-semibold text-xs text-primary uppercase tracking-wider">Key Principles Demonstrated:</div>
                    <ul className="space-y-1.5 list-disc list-inside text-xs">
                      <li><strong>Local Sourcing:</strong> Working with local suppliers strengthens community partnerships and simplifies delivery logistics while supporting the local economy.</li>
                      <li><strong>Waste Prevention:</strong> Choosing washable tableware and reusable water carafes prevents unnecessary single-use waste at the source rather than managing disposal later.</li>
                      <li><strong>Digital Distribution:</strong> Providing workshop slides digitally via QR code reduces unnecessary paper use and allows attendees to access live document updates.</li>
                      <li><strong>Professional Standard:</strong> High-quality presentation and client hospitality are preserved without compromising budget or practical workplace standards.</li>
                    </ul>
                  </div>

                  {decisionChoice === 3 && (
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                      Note on Option C: Disposable items often carry hidden procurement and supply-chain costs. Where practical, durable and reusable options are preferred over single-use alternatives.
                    </p>
                  )}
                  {decisionChoice === 4 && (
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                      Note on Option D: Sustainability must integrate with professional business hospitality, not undermine client relationships.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Navigation Action */}
              <div className="pt-4 flex justify-between items-center border-t">
                <Button variant="outline" onClick={handleBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 font-semibold"
                >
                  <span>See What Your Employees See</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 6: What the Employee Sees (Learner View) */}
          {/* ========================================================================= */}
          {currentScreen === 6 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <Badge variant="outline" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-500/30 mb-2">
                    Step 1 of Product Proof · Learner View
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                    This is what ELEVIO looks like for your employees.
                  </h2>
                </div>
                <Badge className="bg-muted text-muted-foreground border border-border text-xs px-2.5 py-1 shrink-0">
                  Sample Learner Interface
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Short, focused learning designed for the working day, accessible on mobile or desktop.
              </p>

              {/* Simulated Learner Experience Card */}
              <div className="border rounded-2xl p-5 md:p-6 bg-card shadow-sm space-y-6">
                {/* Learner Banner */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                      JR
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Jean-Luc R.</div>
                      <div className="text-xs text-muted-foreground">Operations Department · Rogers Group Ltd</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-xs">
                      12 / 12 Modules Completed
                    </Badge>
                  </div>
                </div>

                {/* Course Card Preview */}
                <div className="border rounded-xl p-4 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-700 text-white text-[10px]">ELH-01</Badge>
                      <span className="font-bold text-sm">Workplace Sustainability Foundations</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Core sustainability principles, waste reduction, energy efficiency & workplace standards.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Score: 96%</div>
                      <div className="text-[10px] text-muted-foreground">Passed assessment</div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs border-emerald-300 text-emerald-800 shrink-0" disabled>
                      Certificate Ready ✓
                    </Button>
                  </div>
                </div>

                {/* Simulated Certificate Preview Box */}
                <div className="p-4 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 text-center space-y-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="font-serif font-bold text-sm text-foreground">
                    Verifiable Certificate of Completion
                  </div>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    Every employee who passes the required assessment earns a verifiable certificate with a unique code for company training records.
                  </p>
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-4 flex justify-between items-center border-t">
                <Button variant="outline" onClick={handleBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 font-semibold"
                >
                  <span>See What Your Company Sees</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 7: Manager Perspective & Training Evidence Preview */}
          {/* ========================================================================= */}
          {currentScreen === 7 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <Badge variant="outline" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-500/30 mb-2">
                    Step 2 of Product Proof · Company Management View
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                    And this is what your company sees.
                  </h2>
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30 text-xs px-2.5 py-1 shrink-0">
                  Sample Company Data · Live Demonstration
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time tracking of employee participation, department completion rates, and training records.
              </p>

              {/* Company Dashboard Preview Card */}
              <div className="border rounded-2xl p-5 md:p-6 bg-card shadow-sm space-y-6">
                {/* 4 Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl border bg-muted/30 space-y-1">
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Total Learners</span>
                    <div className="text-2xl font-bold text-foreground">48</div>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400">All invited employees</span>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 space-y-1">
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-300 uppercase tracking-wider font-semibold">Completion Rate</span>
                    <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-200 font-serif">87.5%</div>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400">42 of 48 completed</span>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-muted/30 space-y-1">
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Overdue Learners</span>
                    <div className="text-2xl font-bold text-foreground">2</div>
                    <span className="text-[10px] text-muted-foreground">Automated nudge ready</span>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-muted/30 space-y-1">
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Certificates Issued</span>
                    <div className="text-2xl font-bold text-foreground">42</div>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Audit verifiable</span>
                  </div>
                </div>

                {/* Training Evidence Table Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                        Recent Training Records & Evidence (Sample Data)
                      </h4>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs h-8 gap-1" disabled>
                      <Download className="h-3 w-3" /> Export CSV / PDF
                    </Button>
                  </div>

                  <div className="border rounded-xl overflow-x-auto bg-background">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted/50 border-b text-muted-foreground">
                        <tr>
                          <th className="p-3 font-semibold">Employee</th>
                          <th className="p-3 font-semibold">Department</th>
                          <th className="p-3 font-semibold">Course</th>
                          <th className="p-3 font-semibold">Score</th>
                          <th className="p-3 font-semibold">Status</th>
                          <th className="p-3 font-semibold">Certificate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-foreground">
                        <tr>
                          <td className="p-3 font-medium">Jean-Luc R.</td>
                          <td className="p-3 text-muted-foreground">Operations</td>
                          <td className="p-3">ELH-01 Sustainability Foundations</td>
                          <td className="p-3 font-bold text-emerald-600">96%</td>
                          <td className="p-3"><Badge className="bg-emerald-600 text-white text-[10px]">Completed</Badge></td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground">ELV-2026-8821</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Ananya P.</td>
                          <td className="p-3 text-muted-foreground">Procurement</td>
                          <td className="p-3">ELH-05 Sustainable Procurement</td>
                          <td className="p-3 font-bold text-emerald-600">100%</td>
                          <td className="p-3"><Badge className="bg-emerald-600 text-white text-[10px]">Completed</Badge></td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground">ELV-2026-8845</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Kevin M.</td>
                          <td className="p-3 text-muted-foreground">Logistics</td>
                          <td className="p-3">ELH-01 Sustainability Foundations</td>
                          <td className="p-3 text-muted-foreground">—</td>
                          <td className="p-3"><Badge variant="outline" className="text-[10px] text-amber-700 border-amber-300">In Progress (75%)</Badge></td>
                          <td className="p-3 text-muted-foreground">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Evidence Callout */}
                <div className="p-4 rounded-xl border bg-muted/20 text-xs text-muted-foreground flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Why This Matters for B2B Buyers:</strong> Training your team is only part of the process. ELEVIO gives your company a verifiable audit trail of who completed what and when—ready for company sustainability reports, board scorecards, and internal reviews.
                  </div>
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-4 flex justify-between items-center border-t">
                <Button variant="outline" onClick={handleBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 font-semibold"
                >
                  <span>View Experience Summary</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 8: Completion Screen (Conversion) */}
          {/* ========================================================================= */}
          {currentScreen === 8 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="text-center max-w-2xl mx-auto space-y-4 pt-4 pb-2">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold font-serif text-foreground tracking-tight">
                  You've experienced ELEVIO.
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Your employees learn through short, practical workplace situations. Your company tracks participation, completion, and training records from one unified workspace.
                </p>
              </div>

              {/* 3 Summary Value Props */}
              <Card className="border-border/80 bg-card shadow-sm">
                <CardContent className="p-6 md:p-8 space-y-5">
                  <h3 className="font-bold text-base text-foreground font-serif">
                    Everything Included in Your Company Subscription:
                  </h3>
                  
                  <div className="grid sm:grid-cols-3 gap-4 text-xs md:text-sm">
                    <div className="space-y-1.5 p-3.5 rounded-xl border bg-muted/20">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        All Sustainability Courses
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Full access to core sustainability, ESG data, leadership, and departmental curriculums.
                      </p>
                    </div>

                    <div className="space-y-1.5 p-3.5 rounded-xl border bg-muted/20">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Zero Onboarding Friction
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        One-click CSV employee import, automated progress tracking, and verifiable certificates.
                      </p>
                    </div>

                    <div className="space-y-1.5 p-3.5 rounded-xl border bg-muted/20">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Company-Size Pricing
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Transparent monthly rates starting from MUR 3,000/mo. No feature gating or hidden fees.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Primary & Secondary Conversion Actions */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto h-12 px-8 text-md font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md gap-2"
                  onClick={() => {
                    trackCommercialEvent("experience_pricing_clicked", {
                      experienceStep: "screen_8_commercial",
                      source: "experience",
                      authenticatedState: "anonymous",
                    });
                  }}
                >
                  <Link href="/pricing?source=experience">
                    <span>Train Your Team — View Pricing</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto h-12 px-8 text-md font-medium border-border hover:bg-muted/40"
                  onClick={() => {
                    trackCommercialEvent("experience_catalogue_clicked", {
                      experienceStep: "screen_8_commercial",
                      source: "experience",
                      authenticatedState: "anonymous",
                    });
                  }}
                >
                  <Link href="/courses">
                    <span>Explore All Courses</span>
                  </Link>
                </Button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleRestart}
                  className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" /> Replay interactive preview
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
