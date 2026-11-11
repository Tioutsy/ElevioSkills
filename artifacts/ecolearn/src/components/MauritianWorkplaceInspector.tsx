import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  MapPin,
  Building,
  Waves,
  UtensilsCrossed,
  Droplets,
  Wind
} from "lucide-react";
import { GeckoTip } from "./GeckoTip";

export interface WorkplaceHotspot {
  id: string;
  name: string;
  locationLabel: string;
  issueDescription: string;
  options: {
    label: string;
    isCorrect: boolean;
    consequence: string;
    explanation: string;
  }[];
}

export interface WorkplaceScene {
  id: string;
  title: string;
  sectorTag: string;
  location: string;
  icon: typeof Building;
  description: string;
  islandContext: string;
  hotspots: WorkplaceHotspot[];
}

export const MAURITIAN_SCENES: WorkplaceScene[] = [
  {
    id: "hotel-buffet",
    title: "Hotel Service Area After Buffet",
    sectorTag: "Hospitality & Food Services",
    location: "Coastal Resort, Grand Baie",
    icon: UtensilsCrossed,
    description: "Inspect the back-of-house clearing station right after lunch service. High volumes of mixed organic and packaging waste arrive simultaneously.",
    islandContext: "Mauritian resorts produce substantial food waste. Diverting organics from Mare Chicose to local composting or livestock feed significantly lowers landfill burden.",
    hotspots: [
      {
        id: "hb-1",
        name: "Plates with Food Scraps & Paper Napkins",
        locationLabel: "Scraping Table",
        issueDescription: "Staff are clearing plates and scraping food scraps mixed with paper napkins directly into general waste bags.",
        options: [
          {
            label: "Scrape food into dedicated organic/compost bins; place napkins into paper recycling if clean, or general waste if oil-soaked.",
            isCorrect: true,
            consequence: "Zero contamination of organic composting streams.",
            explanation: "Accredited Mauritian composters reject batches containing napkins with plastic lining or bleach. Clear separation at the dishwashing station protects the compost feed."
          },
          {
            label: "Push everything into general waste to clear tables faster before the dinner shift.",
            isCorrect: false,
            consequence: "Sends high-moisture organic waste straight to Mare Chicose landfill.",
            explanation: "Organic waste decomposing in landfills generates high volumes of methane. Quick sorting during plate clearance is the single highest-impact habit in hotel kitchens."
          }
        ]
      },
      {
        id: "hb-2",
        name: "Surplus Untouched Bread Baskets & Whole Fruits",
        locationLabel: "Buffet Return Shelf",
        issueDescription: "Catering trays have untouched, unserved bread rolls and intact local bananas and pineapples.",
        options: [
          {
            label: "Follow hotel food safety protocols: separate untouched surplus for staff dining or certified NGO donation within safe temperature windows.",
            isCorrect: true,
            consequence: "Prevents edible food waste and supports local community distribution.",
            explanation: "Under Mauritian food safety standards, unserved buffet backups kept in regulated temperature holding can safely be repurposed internally or donated through verified food banks."
          },
          {
            label: "Leave out at room temperature until closing, then discard in outside skip.",
            isCorrect: false,
            consequence: "Spoils good food and incurs higher municipal collection disposal fees.",
            explanation: "Discarding unserved food wastes water, transport fuel, and agricultural effort used to produce island produce."
          }
        ]
      }
    ]
  },
  {
    id: "office-washroom",
    title: "Staff Washroom with Leaking Tap",
    sectorTag: "Corporate & Commercial Offices",
    location: "Cybercity Commercial Tower, Ébène",
    icon: Droplets,
    description: "Inspect the 4th-floor amenities. A persistent drip and overflowing towel bins indicate deferred maintenance and consumable waste.",
    islandContext: "Ébène commercial towers rely on pumped municipal water and rooftop reservoir tanks. A dripping tap wastes 15–20 litres daily and costs commercial tariffs.",
    hotspots: [
      {
        id: "ow-1",
        name: "Rapidly Dripping Basin Tap",
        locationLabel: "Basin 2",
        issueDescription: "A tap washer has failed, dripping constantly into the basin at approximately one drip per second.",
        options: [
          {
            label: "Report the exact floor and basin number via the facilities ticketing portal or building maintenance WhatsApp immediately.",
            isCorrect: true,
            consequence: "Saves ~5,000 litres of clean treated water annually per fixture.",
            explanation: "Reporting with precise fixture locations enables maintenance teams in Ébène to replace washers within hours rather than days."
          },
          {
            label: "Turn the tap handle harder with force until it stops.",
            isCorrect: false,
            consequence: "Strips the ceramic cartridge and worsens the leak overnight.",
            explanation: "Forcing a worn washer damages the fixture. Rapid maintenance reporting is always the correct workplace procedure."
          }
        ]
      },
      {
        id: "ow-2",
        name: "Paper Towel Waste Around Bins",
        locationLabel: "Drying Station",
        issueDescription: "Staff take 3-4 paper towels per handwash, causing the collection bin to overflow onto the floor.",
        options: [
          {
            label: "Shake hands 3 times before taking exactly 1 paper towel, and place it firmly in the bin.",
            isCorrect: true,
            consequence: "Reduces office paper towel consumption by 65%.",
            explanation: "Shaking excess water off hands before drying allows one sheet to dry completely. Less paper waste reduces janitorial bag usage."
          },
          {
            label: "Throw used towels on the counter next to the full bin.",
            isCorrect: false,
            consequence: "Creates hygiene issues and wet floor hazards for colleagues.",
            explanation: "Overflowing washroom waste creates slipping hazards and increases cleaning chemicals needed."
          }
        ]
      }
    ]
  },
  {
    id: "coastal-event",
    title: "Outdoor Event Near Coastal Storm Drain",
    sectorTag: "Events, Tourism & Corporate Gatherings",
    location: "Beachfront Event Lawn, Flic-en-Flac",
    icon: Waves,
    description: "Inspect the temporary stage and outdoor catering area during intermittent summer tropical downpours.",
    islandContext: "In coastal Mauritius, open roadside and lawn storm drains discharge directly into the lagoon without filtration. Litter washed in during storms suffocates coral and marine life.",
    hotspots: [
      {
        id: "ce-1",
        name: "Overflowing Trash Bag 2m from Storm Drain",
        locationLabel: "Lawn Perimeter Grate",
        issueDescription: "Plastic cups, drink cans, and cutlery are piled on an open bag right beside a concrete stormwater drain before a forecasted rain squall.",
        options: [
          {
            label: "Move the waste station at least 10m away from the drain into a covered marquee, and tie bags securely.",
            isCorrect: true,
            consequence: "Guarantees that rain runoff cannot carry plastics into the Flic-en-Flac coral lagoon.",
            explanation: "Stormwater in coastal zones flows rapidly during tropical downpours. Keeping waste away from drains is critical island stewardship."
          },
          {
            label: "Leave the bag as is since event cleaners will come tomorrow morning.",
            isCorrect: false,
            consequence: "Overnight rain washes dozens of plastic cups into the sea.",
            explanation: "Marine life easily mistakes degraded plastic fragments for food. Prevention at the source is the only reliable protection."
          }
        ]
      }
    ]
  }
];

export function MauritianWorkplaceInspector({
  className = "",
  onScenarioCompleted,
}: {
  className?: string;
  onScenarioCompleted?: (sceneId: string) => void;
}) {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [selectedHotspotIndex, setSelectedHotspotIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [completedHotspots, setCompletedHotspots] = useState<Set<string>>(new Set());

  const currentScene = MAURITIAN_SCENES[selectedSceneIndex];
  const currentHotspot = currentScene.hotspots[selectedHotspotIndex];
  const SceneIcon = currentScene.icon;

  const handleSelectScene = (index: number) => {
    setSelectedSceneIndex(index);
    setSelectedHotspotIndex(0);
    setSelectedChoice(null);
    setHasSubmitted(false);
  };

  const handleSelectHotspot = (index: number) => {
    setSelectedHotspotIndex(index);
    setSelectedChoice(null);
    setHasSubmitted(false);
  };

  const handleSubmitDecision = () => {
    if (selectedChoice === null) return;
    setHasSubmitted(true);
    const chosen = currentHotspot.options[selectedChoice];
    if (chosen.isCorrect) {
      setCompletedHotspots((prev) => {
        const next = new Set(prev);
        next.add(`${currentScene.id}-${currentHotspot.id}`);
        return next;
      });
      if (onScenarioCompleted) {
        onScenarioCompleted(currentScene.id);
      }
    }
  };

  const handleResetHotspot = () => {
    setSelectedChoice(null);
    setHasSubmitted(false);
  };

  return (
    <div
      className={`rounded-2xl border bg-card p-4 sm:p-6 shadow-sm transition-all ${className}`}
      role="region"
      aria-label="Mauritian Workplace Scene Inspector"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-600/10 text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3 w-3" /> Interactive Workplace Simulation
            </span>
            <Badge variant="outline" className="text-xs">
              Island Context
            </Badge>
          </div>
          <h3 className="text-xl font-bold font-serif text-foreground">
            Mauritian Workplace Decision Inspector
          </h3>
          <p className="text-sm text-muted-foreground">
            Explore authentic island workplace scenarios, choose your action, and see the consequences.
          </p>
        </div>
      </div>

      {/* Scene Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6" role="tablist" aria-label="Select workplace scene">
        {MAURITIAN_SCENES.map((scene, idx) => {
          const Icon = scene.icon;
          const isSelected = idx === selectedSceneIndex;
          return (
            <button
              key={scene.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleSelectScene(idx)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all text-xs font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                isSelected
                  ? "border-emerald-600 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 shadow-xs"
                  : "border-border bg-background hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  isSelected ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="truncate">
                <p className="font-semibold truncate">{scene.title}</p>
                <p className="text-[11px] text-muted-foreground truncate">{scene.location}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Scene Context Banner */}
      <div className="rounded-xl bg-muted/40 border p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-750 dark:text-emerald-400">
            <MapPin className="h-3.5 w-3.5" />
            <span>{currentScene.location}</span>
            <span className="text-muted-foreground">•</span>
            <span>{currentScene.sectorTag}</span>
          </div>
        </div>
        <p className="text-sm text-foreground/90 mb-2">{currentScene.description}</p>
        <p className="text-xs text-muted-foreground italic border-t pt-2">
          <strong>Mauritius Reality:</strong> {currentScene.islandContext}
        </p>
      </div>

      {/* Hotspots in this scene */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Step 1: Choose a Workplace Inspection Point ({currentScene.hotspots.length} issues identified)
        </p>
        <div className="flex flex-wrap gap-2">
          {currentScene.hotspots.map((hotspot, hIdx) => {
            const isSelected = hIdx === selectedHotspotIndex;
            const isCompleted = completedHotspots.has(`${currentScene.id}-${hotspot.id}`);
            return (
              <button
                key={hotspot.id}
                onClick={() => handleSelectHotspot(hIdx)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-xs font-semibold"
                    : isCompleted
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : "border-border bg-card hover:bg-muted text-foreground"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                )}
                <span>
                  {hotspot.locationLabel}: {hotspot.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Decision Card */}
      <div className="rounded-2xl border-2 border-emerald-100 bg-background p-5 dark:border-emerald-950 shadow-xs">
        <div className="mb-4">
          <Badge variant="secondary" className="mb-2 text-xs">
            {currentHotspot.locationLabel}
          </Badge>
          <h4 className="text-base sm:text-lg font-bold text-foreground">
            {currentHotspot.name}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {currentHotspot.issueDescription}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-5" role="radiogroup" aria-label="Workplace decision options">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Step 2: What is the correct workplace action?
          </p>
          {currentHotspot.options.map((opt, oIdx) => {
            const isSelected = selectedChoice === oIdx;
            return (
              <button
                key={oIdx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={hasSubmitted}
                onClick={() => setSelectedChoice(oIdx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 min-h-[48px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 text-foreground font-medium"
                    : "border-border bg-card hover:border-emerald-300 text-foreground/80 hover:text-foreground"
                } ${hasSubmitted ? "opacity-90 cursor-default" : "cursor-pointer"}`}
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 mt-0.5 ${
                    isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "border-muted-foreground/40"
                  }`}
                >
                  {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <span className="text-sm leading-relaxed">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action button */}
        {!hasSubmitted ? (
          <Button
            onClick={handleSubmitDecision}
            disabled={selectedChoice === null}
            className="w-full sm:w-auto h-11 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
          >
            Submit Workplace Action
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Outcome Feedback */}
            {selectedChoice !== null && (
              <div
                className={`p-4 rounded-xl border-2 ${
                  currentHotspot.options[selectedChoice].isCorrect
                    ? "border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100"
                    : "border-rose-300 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {currentHotspot.options[selectedChoice].isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span>Correct Workplace Decision</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                      <span>Suboptimal Action for Island Sustainability</span>
                    </>
                  )}
                </div>
                <p className="text-xs font-semibold mb-2">
                  Impact: {currentHotspot.options[selectedChoice].consequence}
                </p>
                <p className="text-xs leading-relaxed text-foreground/80 border-t pt-2 mt-2">
                  {currentHotspot.options[selectedChoice].explanation}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleResetHotspot}>
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Try Another Action
              </Button>
              {selectedHotspotIndex < currentScene.hotspots.length - 1 && (
                <Button
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white"
                  onClick={() => handleSelectHotspot(selectedHotspotIndex + 1)}
                >
                  Next Inspection Point
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Integrated Gecko Hint */}
      <div className="mt-5">
        <GeckoTip
          title="Gecko Tip: Frontline Verification"
          tip="In Mauritius, environmental regulations place responsibility on commercial waste producers. Never rely on oral hearsay about where items go; always check your site's designated waste station posters."
          islandFact="Mare Chicose Landfill opened in 1997 and remains Mauritius's only municipal solid waste disposal facility. High recycling contamination forces clean materials to be landfilled."
          defaultExpanded={false}
        />
      </div>
    </div>
  );
}
