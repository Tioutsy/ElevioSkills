import React, { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

interface GeckoTipProps {
  title?: string;
  tip: string;
  islandFact?: string;
  defaultExpanded?: boolean;
  className?: string;
}

export function GeckoIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stylized Mauritian Day Gecko (Phelsuma) */}
      <path
        d="M24 6C21.5 6 19.5 8 19.5 10.5C19.5 12.2 20.6 13.6 22 14.3V18C19 19.5 17 22.5 17 26C17 29 18.5 31.5 21 33V42C21 43.1 21.9 44 23 44C24.1 44 25 43.1 25 42V33C27.5 31.5 29 29 29 26C29 22.5 27 19.5 24 18V14.3C25.4 13.6 26.5 12.2 26.5 10.5C26.5 8 24.5 6 24 6Z"
        fill="#059669"
      />
      {/* Front Legs & Sucker Pads */}
      <path
        d="M20 19L14 15M14 15C13 14 11 14 10 15C9 16 9 18 10 19C11 20 13 20 14 19L14 15Z"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 19L32 15M32 15C33 14 35 14 36 15C37 16 37 18 36 19C35 20 33 20 32 19L32 15Z"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Back Legs & Sucker Pads */}
      <path
        d="M19 30L12 34M12 34C11 35 10 37 11 38C12 39 14 39 15 38C16 37 16 35 15 34L12 34Z"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M27 30L34 34M34 34C35 35 36 37 35 38C34 39 32 39 31 38C30 37 30 35 31 34L34 34Z"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Tropical Dots */}
      <circle cx="23" cy="9.5" r="1" fill="#022C22" />
      <circle cx="25" cy="9.5" r="1" fill="#022C22" />
      <circle cx="23" cy="23" r="1" fill="#F59E0B" />
      <circle cx="25" cy="27" r="1" fill="#F59E0B" />
    </svg>
  );
}

export function GeckoTip({
  title = "Gecko Tip for Mauritius",
  tip,
  islandFact,
  defaultExpanded = true,
  className = "",
}: GeckoTipProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <aside
      aria-label={title}
      className={`rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-[#FDFBF7] to-teal-50/50 p-4 shadow-sm dark:border-emerald-800/60 dark:from-emerald-950/30 dark:via-background dark:to-teal-950/20 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100/80 dark:bg-emerald-900/40">
            <GeckoIcon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              {title}
            </h4>
            <p className="text-xs text-muted-foreground">Practical Mauritian workplace context</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-emerald-100/50 hover:text-foreground dark:hover:bg-emerald-900/30"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse tip" : "Expand tip"}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-2 border-t border-emerald-100/80 pt-3 text-sm text-foreground/90 dark:border-emerald-800/40">
          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <p className="leading-relaxed">{tip}</p>
          </div>
          {islandFact && (
            <div className="rounded-xl bg-white/70 p-2.5 text-xs text-muted-foreground shadow-xs dark:bg-card/50">
              <strong className="text-emerald-850 dark:text-emerald-300">Island Reality: </strong>
              {islandFact}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
