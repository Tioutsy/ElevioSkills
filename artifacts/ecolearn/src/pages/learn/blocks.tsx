import { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2,
  XCircle,
  Circle,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Check,
  RotateCcw,
  Sparkles,
  Target,
  ArrowRight,
  Shield,
  HelpCircle,
  ChevronRight,
  Award,
  Layers,
  ListOrdered,
  Workflow,
  CheckSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { customFetch } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

// ==========================================
// STATIC / TEXT BLOCKS
// ==========================================

export type TextBlock = { type: "text"; heading?: string; body: string };
export type CalloutBlock = { type: "callout"; title: string; body: string };

export function TextView({ block }: { block: TextBlock }) {
  return (
    <div className="space-y-2">
      {block.heading ? (
        <h3 className="text-lg font-bold text-foreground font-serif">{block.heading}</h3>
      ) : null}
      <p className="text-base leading-relaxed text-muted-foreground">{block.body}</p>
    </div>
  );
}

export function CalloutView({ block }: { block: CalloutBlock }) {
  return (
    <Card className="border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
      <div className="flex gap-3">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <div className="space-y-1">
          <p className="font-semibold text-emerald-950 dark:text-emerald-200">{block.title}</p>
          <p className="text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-300/90">{block.body}</p>
        </div>
      </div>
    </Card>
  );
}

// ==========================================
// 1. WORKPLACE DECISION SCENARIO
// ==========================================

export interface DecisionChoice {
  id?: string | number;
  label: string;
  feedback: string;
  consequences?: string;
  correct?: boolean;
  ideal?: boolean;
}

export interface DecisionScenarioBlock {
  type: "decision_scenario" | "scenario";
  id?: string;
  prompt: string;
  intro?: string;
  takeaway?: string;
  choices: DecisionChoice[];
  required?: boolean;
}

export function WorkplaceDecisionView({
  block,
  courseId,
  lessonId,
  savedState,
  onResolved,
}: {
  block: DecisionScenarioBlock;
  courseId?: number;
  lessonId?: number;
  savedState?: any;
  onResolved: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(() => {
    return savedState?.selectedOptionId ?? null;
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => !!savedState);
  const [submitting, setSubmitting] = useState(false);

  const interactionId = block.id || `decision_${block.prompt.slice(0, 24).replace(/\s+/g, "_")}`;

  async function handleSelect(idx: number) {
    if (isSubmitted) return;
    setPicked(idx);
    setIsSubmitted(true);
    onResolved();

    if (courseId) {
      setSubmitting(true);
      try {
        await customFetch("/api/interactions/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            lessonId,
            interactionId,
            interactionType: "DECISION_SCENARIO",
            submissionPayload: { selectedOptionId: idx },
            interactionConfig: { choices: block.choices, takeaway: block.takeaway },
          }),
        });
      } catch (e) {
        // Non-blocking UI recovery
      } finally {
        setSubmitting(false);
      }
    }
  }

  const selectedChoice = picked !== null ? block.choices[picked] : null;
  const isOptimal = selectedChoice?.correct || selectedChoice?.ideal;

  return (
    <Card className="p-5 border-border/80 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <Target className="w-4 h-4" />
        Workplace Decision Scenario
      </div>

      {block.intro && (
        <p className="text-xs text-muted-foreground italic">{block.intro}</p>
      )}

      <p className="text-base font-semibold text-foreground leading-snug">{block.prompt}</p>

      <div className="space-y-2.5 pt-1">
        {block.choices.map((choice, i) => {
          const isPicked = picked === i;
          return (
            <button
              key={i}
              type="button"
              disabled={isSubmitted}
              onClick={() => handleSelect(i)}
              className={cn(
                "w-full text-left p-3.5 rounded-xl border transition-all text-sm flex items-start gap-3 outline-none",
                !isSubmitted && "hover:border-primary/50 hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isPicked && isOptimal && "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100",
                isPicked && !isOptimal && "border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100",
                !isPicked && isSubmitted && "opacity-60 border-border/40"
              )}
            >
              <div className="mt-0.5">
                {isPicked ? (
                  isOptimal ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  )
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground/40" />
                )}
              </div>
              <span className="flex-1 font-medium">{choice.label}</span>
            </button>
          );
        })}
      </div>

      {isSubmitted && selectedChoice && (
        <div
          className={cn(
            "p-4 rounded-xl text-xs space-y-3 border",
            isOptimal
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
              : "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
          )}
        >
          <div className="flex items-center gap-1.5 font-bold text-sm">
            {isOptimal ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                Best Response
              </>
            ) : (
              <>
                <HelpCircle className="w-4 h-4 text-amber-600" />
                Consider This Approach
              </>
            )}
          </div>
          <p className="leading-relaxed">{selectedChoice.feedback}</p>

          {selectedChoice.consequences && (
            <div className="pt-1 border-t border-current/10">
              <span className="font-semibold">Workplace Consequence: </span>
              <span>{selectedChoice.consequences}</span>
            </div>
          )}

          {block.takeaway && (
            <div className="pt-1 border-t border-current/10 italic text-[11px]">
              <span className="font-semibold not-italic">Key Takeaway: </span>
              {block.takeaway}
            </div>
          )}

          {!isOptimal && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPicked(null);
                  setIsSubmitted(false);
                }}
                className="flex items-center gap-1.5 text-xs bg-background/80"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Explore Another Response
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

// ==========================================
// 2. SORTING INTERACTION
// ==========================================

export interface SortingItem {
  id: string;
  label: string;
  expectedCategoryId: string;
  hint?: string;
}

export interface SortingCategory {
  id: string;
  name: string;
  description?: string;
  badgeClass?: string;
}

export interface SortingBlock {
  type: "sorting_activity" | "sorting";
  id?: string;
  title: string;
  instruction: string;
  categories: SortingCategory[];
  items: SortingItem[];
  takeaway?: string;
}

export function SortingView({
  block,
  courseId,
  lessonId,
  savedState,
  onResolved,
}: {
  block: SortingBlock;
  courseId?: number;
  lessonId?: number;
  savedState?: any;
  onResolved: () => void;
}) {
  // assignments: { [itemId]: categoryId }
  const [assignments, setAssignments] = useState<Record<string, string>>(() => {
    return savedState?.assignments || {};
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(() => !!savedState);

  const interactionId = block.id || `sorting_${block.title.slice(0, 24).replace(/\s+/g, "_")}`;

  const unassignedItems = block.items.filter((item) => !assignments[item.id]);

  function handleAssign(itemId: string, categoryId: string) {
    if (checked) return;
    setAssignments((prev) => ({ ...prev, [itemId]: categoryId }));
    setSelectedItemId(null);
  }

  function handleUnassign(itemId: string) {
    if (checked) return;
    setAssignments((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  }

  async function handleCheck() {
    setChecked(true);
    onResolved();

    if (courseId) {
      try {
        await customFetch("/api/interactions/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            lessonId,
            interactionId,
            interactionType: "SORTING",
            submissionPayload: { assignments },
            interactionConfig: { items: block.items, takeaway: block.takeaway },
          }),
        });
      } catch (e) {
        // Non-blocking
      }
    }
  }

  function handleReset() {
    setAssignments({});
    setChecked(false);
    setSelectedItemId(null);
  }

  const allAssigned = unassignedItems.length === 0;
  const correctCount = block.items.filter(
    (item) => assignments[item.id] === item.expectedCategoryId
  ).length;
  const isPerfect = correctCount === block.items.length;

  return (
    <Card className="p-5 border-border/80 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <Layers className="w-4 h-4" />
          Sorting Activity
        </div>
        {checked && (
          <Badge variant={isPerfect ? "default" : "outline"} className="text-xs">
            {correctCount} / {block.items.length} Correct
          </Badge>
        )}
      </div>

      <div>
        <h4 className="font-bold text-base text-foreground font-serif">{block.title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{block.instruction}</p>
      </div>

      {/* Items Pool (Unassigned) */}
      {!checked && (
        <div className="bg-muted/40 border border-border/60 p-3.5 rounded-xl space-y-2">
          <div className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Items to Sort ({unassignedItems.length} remaining)</span>
            <span className="text-[11px] text-muted-foreground font-normal">
              Tap an item, then tap a category below
            </span>
          </div>

          {unassignedItems.length === 0 ? (
            <p className="text-xs text-emerald-600 font-medium py-1">
              ✓ All items assigned. Click "Check Sorting" below to verify.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {unassignedItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedItemId(isSelected ? null : item.id)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs font-medium border transition-all shadow-sm",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/30"
                        : "bg-card hover:bg-muted text-foreground border-border/80"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {block.categories.map((cat) => {
          const categoryItems = block.items.filter((item) => assignments[item.id] === cat.id);

          return (
            <div
              key={cat.id}
              role="region"
              aria-label={`${cat.name} category`}
              tabIndex={!checked ? 0 : undefined}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && selectedItemId && !checked) {
                  e.preventDefault();
                  handleAssign(selectedItemId, cat.id);
                }
              }}
              onClick={() => selectedItemId && handleAssign(selectedItemId, cat.id)}
              className={cn(
                "border rounded-xl p-3.5 bg-card/60 flex flex-col justify-between transition-all min-h-[120px] outline-none",
                selectedItemId && !checked && "cursor-pointer hover:border-primary hover:bg-primary/5 ring-1 ring-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                !selectedItemId && !checked && "focus-visible:ring-2 focus-visible:ring-primary/40",
                checked && "border-border/60"
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground">{cat.name}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {categoryItems.length} items
                  </span>
                </div>
                {cat.description && (
                  <p className="text-[11px] text-muted-foreground line-clamp-1">{cat.description}</p>
                )}
              </div>

              {/* Items assigned into this category */}
              <div className="flex flex-wrap gap-1.5 pt-3">
                {categoryItems.length === 0 ? (
                  <span className="text-[11px] text-muted-foreground/60 italic">Drop or tap items here</span>
                ) : (
                  categoryItems.map((item) => {
                    const isItemCorrect = item.expectedCategoryId === cat.id;

                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "px-2.5 py-1 rounded-md text-xs font-medium border flex items-center gap-1.5",
                          !checked && "bg-card border-border shadow-xs",
                          checked && isItemCorrect && "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300",
                          checked && !isItemCorrect && "bg-destructive/10 border-destructive/30 text-destructive line-through"
                        )}
                      >
                        <span>{item.label}</span>
                        {!checked && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnassign(item.id);
                            }}
                            className="text-muted-foreground hover:text-foreground text-xs ml-0.5"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Verification Feedback / Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        {!checked ? (
          <Button
            size="sm"
            disabled={!allAssigned}
            onClick={handleCheck}
            className="ml-auto"
          >
            Check Sorting
          </Button>
        ) : (
          <div className="w-full space-y-3">
            <div
              className={cn(
                "p-3.5 rounded-xl text-xs space-y-1 border",
                isPerfect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
              )}
            >
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {isPerfect ? <Check className="w-4 h-4 text-emerald-600" /> : <HelpCircle className="w-4 h-4 text-amber-600" />}
                {isPerfect ? "All Items Correctly Sorted" : "Sorting Review"}
              </div>
              <p>
                {isPerfect
                  ? "Excellent! You distinguished acceptable recyclables from contaminated or landfill items."
                  : `You sorted ${correctCount} of ${block.items.length} items correctly. Contaminated food packaging or unsuitable items cannot enter clean recycling streams.`}
              </p>
              {block.takeaway && (
                <p className="text-[11px] font-semibold pt-1 border-t border-current/10">{block.takeaway}</p>
              )}
            </div>

            <Button variant="outline" size="sm" onClick={handleReset} className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              Try Sorting Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

// ==========================================
// 3. MATCHING INTERACTION
// ==========================================

export interface MatchPairItem {
  id?: string;
  term: string;
  match: string;
  explanation?: string;
}

export interface MatchingBlock {
  type: "matching_exercise" | "matching";
  id?: string;
  title?: string;
  instruction: string;
  pairs: MatchPairItem[];
}

export function MatchingView({
  block,
  courseId,
  lessonId,
  savedState,
  onResolved,
}: {
  block: MatchingBlock;
  courseId?: number;
  lessonId?: number;
  savedState?: any;
  onResolved: () => void;
}) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>(() => {
    return savedState?.pairs ? Object.fromEntries(savedState.pairs.map((p: any) => [p.term, p.match])) : {};
  });
  const [checked, setChecked] = useState<boolean>(() => !!savedState);

  const interactionId = block.id || `matching_${block.instruction.slice(0, 24).replace(/\s+/g, "_")}`;

  const shuffledMatches = useMemo(() => {
    const list = [...block.pairs.map((p) => p.match)];
    return list.sort(() => (block.pairs.length > 2 ? 0.5 - Math.random() : 0));
  }, [block.pairs]);

  function handleTermClick(term: string) {
    if (checked) return;
    setSelectedTerm((prev) => (prev === term ? null : term));
  }

  function handleMatchClick(match: string) {
    if (checked || !selectedTerm) return;
    setMatchedPairs((prev) => ({ ...prev, [selectedTerm]: match }));
    setSelectedTerm(null);
  }

  function handleRemovePair(term: string) {
    if (checked) return;
    setMatchedPairs((prev) => {
      const copy = { ...prev };
      delete copy[term];
      return copy;
    });
  }

  async function handleVerify() {
    setChecked(true);
    onResolved();

    if (courseId) {
      const formattedPairs = Object.entries(matchedPairs).map(([term, match]) => ({ term, match }));
      try {
        await customFetch("/api/interactions/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            lessonId,
            interactionId,
            interactionType: "MATCHING",
            submissionPayload: { pairs: formattedPairs },
            interactionConfig: { pairs: block.pairs },
          }),
        });
      } catch (e) {
        // Non-blocking
      }
    }
  }

  const allMatched = Object.keys(matchedPairs).length === block.pairs.length;
  const correctCount = block.pairs.filter((p) => matchedPairs[p.term] === p.match).length;
  const isPerfect = correctCount === block.pairs.length;

  return (
    <Card className="p-5 border-border/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <Sparkles className="w-4 h-4" />
          Matching Exercise
        </div>
        {checked && (
          <Badge variant={isPerfect ? "default" : "outline"} className="text-xs">
            {correctCount} / {block.pairs.length} Correct
          </Badge>
        )}
      </div>

      <p className="text-sm font-semibold text-foreground">{block.instruction}</p>

      {/* Match Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Left Column: Terms */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase">Concept / Term</div>
          {block.pairs.map((p) => {
            const isSelected = selectedTerm === p.term;
            const currentMatch = matchedPairs[p.term];
            const isCorrect = checked && currentMatch === p.match;

            return (
              <div
                key={p.term}
                role="button"
                tabIndex={!checked ? 0 : undefined}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !checked) {
                    e.preventDefault();
                    handleTermClick(p.term);
                  }
                }}
                onClick={() => handleTermClick(p.term)}
                className={cn(
                  "p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between outline-none",
                  isSelected && "border-primary bg-primary/10 ring-2 ring-primary/30",
                  !isSelected && !currentMatch && "bg-card border-border/80 hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary",
                  currentMatch && !checked && "bg-muted/40 border-primary/40 focus-visible:ring-2 focus-visible:ring-primary",
                  checked && isCorrect && "bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-200",
                  checked && !isCorrect && "bg-destructive/10 border-destructive/40 text-destructive"
                )}
              >
                <span>{p.term}</span>
                {currentMatch && !checked && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePair(p.term);
                    }}
                    className="text-[10px] text-muted-foreground hover:text-foreground underline ml-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Definitions */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase">Matching Definition</div>
          {shuffledMatches.map((matchText, idx) => {
            const isAssigned = Object.values(matchedPairs).includes(matchText);

            return (
              <div
                key={idx}
                role="button"
                tabIndex={selectedTerm && !isAssigned ? 0 : undefined}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && selectedTerm && !isAssigned) {
                    e.preventDefault();
                    handleMatchClick(matchText);
                  }
                }}
                onClick={() => selectedTerm && handleMatchClick(matchText)}
                className={cn(
                  "p-3 rounded-xl border text-xs font-medium transition-all outline-none",
                  selectedTerm && !isAssigned && "cursor-pointer hover:border-primary hover:bg-primary/5 border-dashed focus-visible:ring-2 focus-visible:ring-primary",
                  isAssigned && "bg-muted/60 text-muted-foreground border-border/40",
                  !isAssigned && !selectedTerm && "bg-card border-border/80"
                )}
              >
                <span>{matchText}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-border/40">
        {!checked ? (
          <Button
            size="sm"
            disabled={!allMatched}
            onClick={handleVerify}
            className="ml-auto"
          >
            Verify Matching
          </Button>
        ) : (
          <div className="w-full space-y-2">
            <div
              className={cn(
                "p-3 rounded-xl text-xs border",
                isPerfect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
              )}
            >
              {isPerfect
                ? "✓ All terms matched accurately with their correct definitions."
                : `Matched ${correctCount} of ${block.pairs.length} pairs correctly. Click Retry to re-attempt.`}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMatchedPairs({});
                setChecked(false);
                setSelectedTerm(null);
              }}
              className="flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Matching Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

// ==========================================
// 4. SEQUENCING INTERACTION
// ==========================================

export interface SequencingStep {
  id: string;
  label: string;
  order: number;
}

export interface SequencingBlock {
  type: "sequencing_exercise" | "sequencing";
  id?: string;
  title: string;
  instruction: string;
  steps: SequencingStep[];
  takeaway?: string;
}

export function SequencingView({
  block,
  courseId,
  lessonId,
  savedState,
  onResolved,
}: {
  block: SequencingBlock;
  courseId?: number;
  lessonId?: number;
  savedState?: any;
  onResolved: () => void;
}) {
  const [items, setItems] = useState<SequencingStep[]>(() => {
    if (savedState?.orderedIds) {
      const idMap = new Map(block.steps.map((s) => [s.id, s]));
      return savedState.orderedIds.map((id: string) => idMap.get(id)!).filter(Boolean);
    }
    // Randomize initial order for learners
    return [...block.steps].sort(() => 0.5 - Math.random());
  });
  const [checked, setChecked] = useState<boolean>(() => !!savedState);

  const interactionId = block.id || `sequencing_${block.title.slice(0, 24).replace(/\s+/g, "_")}`;

  function moveUp(index: number) {
    if (index === 0 || checked) return;
    const copy = [...items];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    setItems(copy);
  }

  function moveDown(index: number) {
    if (index === items.length - 1 || checked) return;
    const copy = [...items];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    setItems(copy);
  }

  async function handleVerify() {
    setChecked(true);
    onResolved();

    if (courseId) {
      const orderedIds = items.map((s) => s.id);
      try {
        await customFetch("/api/interactions/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            lessonId,
            interactionId,
            interactionType: "SEQUENCING",
            submissionPayload: { orderedIds },
            interactionConfig: { steps: block.steps, takeaway: block.takeaway },
          }),
        });
      } catch (e) {
        // Non-blocking
      }
    }
  }

  const expectedOrder = [...block.steps].sort((a, b) => a.order - b.order);
  const correctCount = items.filter((item, idx) => item.id === expectedOrder[idx]?.id).length;
  const isPerfect = correctCount === block.steps.length;

  return (
    <Card className="p-5 border-border/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <ListOrdered className="w-4 h-4" />
          Sequencing Exercise
        </div>
        {checked && (
          <Badge variant={isPerfect ? "default" : "outline"} className="text-xs">
            {correctCount} / {block.steps.length} Correct Position
          </Badge>
        )}
      </div>

      <div>
        <h4 className="font-bold text-base text-foreground font-serif">{block.title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{block.instruction}</p>
      </div>

      {/* Steps List */}
      <div className="space-y-2 pt-1">
        {items.map((step, idx) => {
          const isCorrectPosition = checked && step.id === expectedOrder[idx]?.id;

          return (
            <div
              key={step.id}
              className={cn(
                "p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium transition-all",
                !checked && "bg-card border-border/80",
                checked && isCorrectPosition && "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200",
                checked && !isCorrectPosition && "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground shrink-0">
                  {idx + 1}
                </span>
                <span>{step.label}</span>
              </div>

              {!checked && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveUp(idx)}
                    className="p-1 rounded hover:bg-muted disabled:opacity-30"
                    title="Move Step Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={() => moveDown(idx)}
                    className="p-1 rounded hover:bg-muted disabled:opacity-30"
                    title="Move Step Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls / Feedback */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        {!checked ? (
          <Button size="sm" onClick={handleVerify} className="ml-auto">
            Verify Sequence
          </Button>
        ) : (
          <div className="w-full space-y-2">
            <div
              className={cn(
                "p-3.5 rounded-xl text-xs space-y-1 border",
                isPerfect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
              )}
            >
              <p className="font-bold">
                {isPerfect
                  ? "✓ Excellent! Steps arranged in the correct operational order."
                  : "The sequence order needs adjustment. Prioritize immediate containment and internal reporting before escalation."}
              </p>
              {block.takeaway && <p className="text-[11px] pt-1">{block.takeaway}</p>}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setItems([...block.steps].sort(() => 0.5 - Math.random()));
                setChecked(false);
              }}
              className="flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Sequence Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

// ==========================================
// 5. PRIORITISATION CHALLENGE
// ==========================================

export interface PriorityOption {
  id: string;
  label: string;
  impactDescription?: string;
  isOptimal?: boolean;
}

export interface PrioritisationBlock {
  type: "prioritisation_challenge" | "prioritisation";
  id?: string;
  title: string;
  prompt: string;
  maxSelect?: number;
  options: PriorityOption[];
  consequences?: string;
}

export function PrioritisationView({
  block,
  courseId,
  lessonId,
  savedState,
  onResolved,
}: {
  block: PrioritisationBlock;
  courseId?: number;
  lessonId?: number;
  savedState?: any;
  onResolved: () => void;
}) {
  const maxSelect = block.maxSelect || 2;
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    return savedState?.selectedIds || [];
  });
  const [checked, setChecked] = useState<boolean>(() => !!savedState);

  const interactionId = block.id || `priority_${block.title.slice(0, 24).replace(/\s+/g, "_")}`;

  function toggleSelect(id: string) {
    if (checked) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < maxSelect) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  }

  async function handleVerify() {
    setChecked(true);
    onResolved();

    if (courseId) {
      const optimalIds = block.options.filter((o) => o.isOptimal).map((o) => o.id);
      try {
        await customFetch("/api/interactions/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            lessonId,
            interactionId,
            interactionType: "PRIORITISATION",
            submissionPayload: { selectedIds },
            interactionConfig: { optimalPriorityIds: optimalIds, maxSelect, consequences: block.consequences },
          }),
        });
      } catch (e) {
        // Non-blocking
      }
    }
  }

  const optimalCount = block.options.filter((o) => o.isOptimal && selectedIds.includes(o.id)).length;
  const totalOptimal = block.options.filter((o) => o.isOptimal).length || maxSelect;
  const isPerfect = optimalCount === totalOptimal;

  return (
    <Card className="p-5 border-border/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <CheckSquare className="w-4 h-4" />
          Prioritisation Challenge
        </div>
        <Badge variant={selectedIds.length === maxSelect ? "default" : "outline"} className="text-xs">
          Selected {selectedIds.length} of {maxSelect}
        </Badge>
      </div>

      <div>
        <h4 className="font-bold text-base text-foreground font-serif">{block.title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{block.prompt}</p>
      </div>

      {/* Options */}
      <div className="space-y-2.5 pt-1">
        {block.options.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);

          return (
            <div
              key={opt.id}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={!checked ? 0 : undefined}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !checked) {
                  e.preventDefault();
                  toggleSelect(opt.id);
                }
              }}
              onClick={() => toggleSelect(opt.id)}
              className={cn(
                "p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 outline-none",
                isSelected && !checked && "bg-primary/10 border-primary ring-2 ring-primary/20 text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                !isSelected && !checked && "bg-card border-border/80 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary",
                checked && isSelected && opt.isOptimal && "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200",
                checked && isSelected && !opt.isOptimal && "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200",
                checked && !isSelected && "opacity-60 border-border/40"
              )}
            >
              <div className="mt-0.5">
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex-1 space-y-0.5">
                <span className="font-medium">{opt.label}</span>
                {checked && opt.impactDescription && (
                  <p className="text-[11px] opacity-80 pt-1">{opt.impactDescription}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        {!checked ? (
          <Button
            size="sm"
            disabled={selectedIds.length !== maxSelect}
            onClick={handleVerify}
            className="ml-auto"
          >
            Submit Priorities
          </Button>
        ) : (
          <div className="w-full space-y-2">
            <div
              className={cn(
                "p-3.5 rounded-xl text-xs space-y-1 border",
                isPerfect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
              )}
            >
              <p className="font-bold">
                {isPerfect
                  ? "✓ Optimal Priorities Selected"
                  : `You selected ${optimalCount} of ${totalOptimal} top operational priorities.`}
              </p>
              {block.consequences && <p>{block.consequences}</p>}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedIds([]);
                setChecked(false);
              }}
              className="flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Choices
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

// ==========================================
// 6. MULTI-STEP BRANCHING SCENARIO
// ==========================================

export interface MultiStepStage {
  id: string;
  prompt: string;
  options: {
    id: string;
    label: string;
    nextNodeId: string;
    feedback?: string;
  }[];
}

export interface MultiStepOutcome {
  id: string;
  title: string;
  summary: string;
  consequences?: string;
  isOptimal?: boolean;
}

export interface MultiStepScenarioBlock {
  type: "multi_step_scenario";
  id?: string;
  title: string;
  stages: MultiStepStage[];
  outcomes: Record<string, MultiStepOutcome>;
}

export function MultiStepScenarioView({
  block,
  courseId,
  lessonId,
  savedState,
  onResolved,
}: {
  block: MultiStepScenarioBlock;
  courseId?: number;
  lessonId?: number;
  savedState?: any;
  onResolved: () => void;
}) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [stepResponses, setStepResponses] = useState<Record<string, string>>(() => {
    return savedState?.stepResponses || {};
  });
  const [finalNodeId, setFinalNodeId] = useState<string | null>(() => {
    return savedState?.finalNodeId || null;
  });

  const interactionId = block.id || `multistep_${block.title.slice(0, 24).replace(/\s+/g, "_")}`;

  const currentStage = block.stages[currentStageIndex];
  const outcome = finalNodeId ? block.outcomes[finalNodeId] : null;

  async function handleOptionSelect(stageId: string, optionId: string, nextNodeId: string) {
    const updatedResponses = { ...stepResponses, [stageId]: optionId };
    setStepResponses(updatedResponses);

    const nextStageIdx = block.stages.findIndex((s) => s.id === nextNodeId);

    if (nextStageIdx !== -1) {
      setCurrentStageIndex(nextStageIdx);
    } else {
      // Reached an outcome node
      setFinalNodeId(nextNodeId);
      onResolved();

      if (courseId) {
        try {
          await customFetch("/api/interactions/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseId,
              lessonId,
              interactionId,
              interactionType: "MULTI_STEP_SCENARIO",
              submissionPayload: { stepResponses: updatedResponses, finalNodeId: nextNodeId },
              interactionConfig: { outcomes: block.outcomes },
            }),
          });
        } catch (e) {
          // Non-blocking
        }
      }
    }
  }

  function handleRestart() {
    setCurrentStageIndex(0);
    setStepResponses({});
    setFinalNodeId(null);
  }

  return (
    <Card className="p-5 border-border/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <Workflow className="w-4 h-4" />
          Branching Workplace Scenario
        </div>
        {!outcome && (
          <Badge variant="outline" className="text-xs">
            Stage {currentStageIndex + 1} of {block.stages.length}
          </Badge>
        )}
      </div>

      <h4 className="font-bold text-base text-foreground font-serif">{block.title}</h4>

      {!outcome ? (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground">{currentStage?.prompt}</p>

          <div className="space-y-2.5">
            {currentStage?.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleOptionSelect(currentStage.id, opt.id, opt.nextNodeId)}
                className="w-full text-left p-3.5 rounded-xl border border-border/80 bg-card hover:bg-muted/40 hover:border-primary/50 text-xs font-medium transition-all flex items-center justify-between gap-3"
              >
                <span>{opt.label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            className={cn(
              "p-4 rounded-xl text-xs space-y-2 border",
              outcome.isOptimal !== false
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                : "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
            )}
          >
            <div className="font-bold text-sm flex items-center gap-1.5">
              {outcome.isOptimal !== false ? <Check className="w-4 h-4 text-emerald-600" /> : <HelpCircle className="w-4 h-4 text-amber-600" />}
              {outcome.title}
            </div>
            <p className="leading-relaxed">{outcome.summary}</p>
            {outcome.consequences && (
              <p className="pt-1 border-t border-current/10 font-medium">
                Workplace Outcome: {outcome.consequences}
              </p>
            )}
          </div>

          <Button variant="outline" size="sm" onClick={handleRestart} className="flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Scenario
          </Button>
        </div>
      )}
    </Card>
  );
}

// ==========================================
// 7. CHALLENGE-SPECIFIC ASSESSMENT
// ==========================================

export interface ChallengeAssessmentQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface ChallengeAssessmentBlock {
  type: "challenge_assessment";
  id?: string;
  title: string;
  description: string;
  passThreshold?: number; // default e.g. 4
  questions: ChallengeAssessmentQuestion[];
}

export function ChallengeAssessmentView({
  block,
  courseId,
  lessonId,
  savedState,
  onResolved,
}: {
  block: ChallengeAssessmentBlock;
  courseId?: number;
  lessonId?: number;
  savedState?: any;
  onResolved: () => void;
}) {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string | number, number>>(() => {
    return savedState?.answers || {};
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => !!savedState);
  const [submitting, setSubmitting] = useState(false);

  const interactionId = block.id || `challenge_assessment_${block.title.slice(0, 24).replace(/\s+/g, "_")}`;
  const passThreshold = block.passThreshold || Math.ceil(block.questions.length * 0.8);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === block.questions.length;

  const correctCount = block.questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const hasPassed = correctCount >= passThreshold;

  async function handleSubmit() {
    setIsSubmitted(true);
    setSubmitting(true);
    onResolved();

    if (courseId) {
      try {
        const res: any = await customFetch("/api/interactions/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            lessonId,
            interactionId,
            interactionType: "CHALLENGE_ASSESSMENT",
            submissionPayload: { answers },
            interactionConfig: { questions: block.questions, passThreshold },
          }),
        });

        if (res?.challengeProgressUpdated) {
          toast({
            title: "Challenge Mission Advanced!",
            description: "Your challenge assessment pass has updated your active company challenge progress.",
          });
        }
      } catch (e) {
        // Non-blocking
      } finally {
        setSubmitting(false);
      }
    }
  }

  return (
    <Card className="p-6 border-emerald-500/20 bg-emerald-500/[0.02] shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Award className="w-4 h-4" />
          Challenge Mission Assessment
        </div>
        <Badge variant={isSubmitted ? (hasPassed ? "default" : "destructive") : "outline"} className="text-xs">
          {isSubmitted ? `${correctCount} / ${block.questions.length} Correct` : `Need ${passThreshold} / ${block.questions.length} to pass`}
        </Badge>
      </div>

      <div>
        <h3 className="font-bold text-lg text-foreground font-serif">{block.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{block.description}</p>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {block.questions.map((q, qIdx) => {
          const selectedAns = answers[q.id];
          const isCorrect = isSubmitted && selectedAns === q.correctIndex;

          return (
            <div key={q.id || qIdx} className="space-y-3 bg-card border border-border/60 p-4 rounded-xl">
              <div className="text-xs font-bold text-foreground flex items-start gap-2">
                <span className="text-muted-foreground">{qIdx + 1}.</span>
                <span>{q.question}</span>
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isPicked = selectedAns === optIdx;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => setAnswers({ ...answers, [q.id]: optIdx })}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border text-xs font-medium transition-all flex items-center gap-2.5",
                        !isSubmitted && isPicked && "border-primary bg-primary/10 ring-1 ring-primary/30",
                        !isSubmitted && !isPicked && "bg-background border-border/60 hover:bg-muted/40",
                        isSubmitted && optIdx === q.correctIndex && "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
                        isSubmitted && isPicked && !isCorrect && "border-destructive bg-destructive/10 text-destructive line-through",
                        isSubmitted && !isPicked && optIdx !== q.correctIndex && "opacity-50"
                      )}
                    >
                      <Circle className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isSubmitted && q.explanation && (
                <p className="text-[11px] text-muted-foreground pt-1 italic">
                  Rationale: {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="pt-2 border-t border-border/40 flex items-center justify-between">
        {!isSubmitted ? (
          <Button
            size="sm"
            disabled={!allAnswered || submitting}
            onClick={handleSubmit}
            className="ml-auto flex items-center gap-1.5"
          >
            Submit Assessment
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span
              className={cn(
                "text-xs font-bold",
                hasPassed ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
              )}
            >
              {hasPassed ? "✓ Challenge Criteria Satisfied" : "Assessment incomplete. Review answers and retry."}
            </span>
            {!hasPassed && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAnswers({});
                  setIsSubmitted(false);
                }}
              >
                Retry Assessment
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

// ==========================================
// LEGACY COMPATIBILITY EXPORTS
// ==========================================

export type KnowledgeCheck = {
  type: "check";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export function CheckView({
  block,
  onResolved,
}: {
  block: KnowledgeCheck;
  onResolved: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card className="p-5 border-border/80 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <Lightbulb className="w-4 h-4" />
        Knowledge Check
      </div>
      <p className="text-sm font-semibold text-foreground">{block.question}</p>
      <div className="space-y-2">
        {block.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            disabled={submitted}
            onClick={() => {
              setSelected(i);
              setSubmitted(true);
              onResolved();
            }}
            className={cn(
              "w-full text-left p-3 rounded-lg border text-xs font-medium transition-all flex items-center gap-2.5",
              submitted && i === block.correctIndex && "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
              submitted && selected === i && i !== block.correctIndex && "border-destructive bg-destructive/10 text-destructive line-through",
              !submitted && "hover:bg-muted/40 border-border/60"
            )}
          >
            <Circle className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
            <span>{opt}</span>
          </button>
        ))}
      </div>
      {submitted && (
        <p className="text-xs text-muted-foreground pt-1 border-t border-border/40">{block.explanation}</p>
      )}
    </Card>
  );
}

export function ScenarioView({
  block,
  onResolved,
}: {
  block: any;
  onResolved: () => void;
}) {
  return <WorkplaceDecisionView block={block} onResolved={onResolved} />;
}

export function CommitmentView({
  block,
  selected,
  onToggle,
}: {
  block: any;
  selected: Set<string>;
  onToggle: (val: string) => void;
}) {
  return (
    <Card className="p-5 border-border/80 space-y-3">
      <h4 className="text-sm font-bold text-foreground">{block.instruction || "Choose Your Workplace Commitments"}</h4>
      <div className="space-y-2">
        {(block.options || []).map((opt: any) => {
          const val = opt.value || opt.id || opt.slug || opt.label;
          const isSelected = selected.has(val);
          return (
            <div
              key={val}
              onClick={() => onToggle(val)}
              className={cn(
                "p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2.5",
                isSelected ? "border-primary bg-primary/10" : "border-border/60 hover:bg-muted/40"
              )}
            >
              <CheckCircle2 className={cn("w-4 h-4 mt-0.5", isSelected ? "text-primary" : "text-muted-foreground/30")} />
              <div>
                <div className="font-semibold text-foreground">{opt.label}</div>
                {opt.description && <div className="text-muted-foreground text-[11px]">{opt.description}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
