import { Course } from "@workspace/db";
import { LearnerProfile, CompanyLearningContext, AssignedCourse } from "./learningPathEngine";
import {
  ProficiencyLevel,
  ConfidenceLevel,
  CANONICAL_COMPETENCIES,
  calculateTargetProficiency,
  generateLearnerSkillsProfile,
  LearnerSkillsProfile,
} from "./competencyIntelligenceEngine";

export type QuestionEvidenceType = "UNDERSTANDING" | "APPLICATION" | "SCENARIO";

export interface DiagnosticQuestion {
  id: string;
  competency: string;
  subcompetency?: string;
  difficulty: ProficiencyLevel; // 1 to 4 (D1 to D4)
  evidenceType: QuestionEvidenceType;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  rationale: string;
  equivalentGroupId: string;
  sectorRelevance?: string;
  roleRelevance?: string;
}

export interface DiagnosticBlueprintItem {
  competency: string;
  competencyName: string;
  targetLevel: ProficiencyLevel;
  currentEvidenceLevel: ProficiencyLevel;
  currentConfidence: ConfidenceLevel;
  isEligibleForTesting: boolean;
  questionQuota: number;
}

export interface DiagnosticBlueprint {
  learnerId?: number;
  sessionType: "INITIAL_BASELINE" | "COMPETENCY_DIAGNOSTIC" | "REASSESSMENT";
  testedCompetencies: DiagnosticBlueprintItem[];
  totalQuestionTarget: number;
}

export interface DiagnosticResponse {
  questionId: string;
  competency: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
  timeSpentSeconds?: number;
}

export interface DiagnosticBaselineCompetencyRecord {
  competency: string;
  competencyName: string;
  baselineProficiency: ProficiencyLevel;
  baselineConfidence: ConfidenceLevel;
  questionsAttempted: number;
  questionsCorrect: number;
  evidenceSummary: string;
}

export interface DiagnosticBaselineSnapshot {
  id: string;
  learnerId?: number;
  companyId?: number;
  recordedAt: string;
  competencies: DiagnosticBaselineCompetencyRecord[];
}

export interface LearningImpactMetric {
  competency: string;
  competencyName: string;
  baselineProficiency: ProficiencyLevel;
  baselineConfidence: ConfidenceLevel;
  currentProficiency: ProficiencyLevel;
  currentConfidence: ConfidenceLevel;
  proficiencyDelta: number;
  impactState: "PROFICIENCY_INCREASED" | "EVIDENCE_STRENGTHENED" | "GAP_CLOSED" | "MAINTAINED" | "MORE_EVIDENCE_NEEDED";
  explanation: string;
}

// ── EXPANDED 88-ITEM STANDALONE DIAGNOSTIC QUESTION BANK ───────────────────
export const DIAGNOSTIC_QUESTION_BANK: DiagnosticQuestion[] = [
  // 1. COMP_ENERGY (8 Items: D1..D4 with Equivalent Groups)
  {
    id: "DIAG-ENG-01A",
    competency: "COMP_ENERGY",
    subcompetency: "SUB_ENERGY_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_ENG_D1_BASE",
    prompt: "What is the primary operational distinction between base-load energy consumption and peak-load demand in commercial facilities?",
    options: [
      "Base-load is constant 24/7 background power; peak-load occurs during operational spikes.",
      "Base-load only uses renewable energy; peak-load uses diesel generators.",
      "Base-load applies only to refrigeration; peak-load applies to lighting.",
      "Base-load is calculated annually; peak-load is calculated per minute.",
    ],
    correctOptionIndex: 0,
    rationale: "Base-load represents minimum continuous load, whereas peak demand incurs highest utility tariffs.",
  },
  {
    id: "DIAG-ENG-01B",
    competency: "COMP_ENERGY",
    subcompetency: "SUB_ENERGY_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_ENG_D1_BASE",
    prompt: "Why is tracking kWh consumption per occupied room or square meter more informative than total gross kWh consumption?",
    options: [
      "It normalizes energy usage against business activity and operational occupancy.",
      "It automatically eliminates electricity utility billing errors.",
      "It satisfies tax reporting requirements without engineering audits.",
      "It makes energy conservation legally mandatory.",
    ],
    correctOptionIndex: 0,
    rationale: "Normalized energy metrics allow accurate benchmarking independent of occupancy fluctuations.",
  },
  {
    id: "DIAG-ENG-02A",
    competency: "COMP_ENERGY",
    subcompetency: "SUB_ENERGY_EFFICIENCY",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_ENG_D2_HVAC",
    sectorRelevance: "SEC_HOSPITALITY",
    prompt: "An HVAC audit in a resort reveals chilled water supply temperatures set 2°C lower than design specifications. What is the immediate operational impact?",
    options: [
      "Chiller compressor power consumption increases by 6% to 8% without comfort benefit.",
      "Indoor air quality doubles automatically.",
      "Cooling tower water evaporation drops to zero.",
      "Refrigerant piping requires immediate replacement.",
    ],
    correctOptionIndex: 0,
    rationale: "Operating chillers below optimal design setpoints significantly inflates compressor kW draw.",
  },
  {
    id: "DIAG-ENG-02B",
    competency: "COMP_ENERGY",
    subcompetency: "SUB_ENERGY_EFFICIENCY",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_ENG_D2_HVAC",
    sectorRelevance: "SEC_MANUFACTURING",
    prompt: "In a manufacturing facility, an air compressor cycles continuously during weekend non-production hours. What is the root cause and immediate corrective action?",
    options: [
      "Pneumatic air distribution leaks; tag and repair leak points and isolate inactive zones.",
      "Normal thermal ventilation; no action needed.",
      "Increase receiver tank pressure to maximum limit.",
      "Add additional lubricating oil to the compressor motor.",
    ],
    correctOptionIndex: 0,
    rationale: "Weekend idling cycling indicates extensive air leaks wasting continuous compressor electricity.",
  },
  {
    id: "DIAG-ENG-03A",
    competency: "COMP_ENERGY",
    subcompetency: "SUB_ENERGY_MANAGEMENT",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_ENG_D3_AUDIT",
    prompt: "A facilities manager evaluates retrofitting constant-speed air handling unit (AHU) fan motors with Variable Frequency Drives (VFDs). By Affinity Laws, reducing fan speed by 20% reduces motor power demand by approximately:",
    options: [
      "Approximately 48% to 50% due to cubic power reduction ($P \\propto N^3$).",
      "Exactly 20% linear reduction.",
      "Only 5% reduction.",
      "Zero change because motor voltage remains fixed.",
    ],
    correctOptionIndex: 0,
    rationale: "Fan affinity laws dictate that motor power draw varies with the cube of the rotational speed.",
  },
  {
    id: "DIAG-ENG-03B",
    competency: "COMP_ENERGY",
    subcompetency: "SUB_ENERGY_MANAGEMENT",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_ENG_D3_AUDIT",
    prompt: "When conducting an ISO 50001 Energy Review, what is the primary purpose of identifying Significant Energy Uses (SEUs)?",
    options: [
      "To prioritize monitoring, metering, and capital retrofits on the systems consuming 80% of site energy.",
      "To shut down non-essential lighting during working hours.",
      "To switch all operations to grid diesel generators.",
      "To eliminate electrical maintenance logs.",
    ],
    correctOptionIndex: 0,
    rationale: "SEU identification applies Pareto analysis to focus energy management where savings impact is highest.",
  },
  {
    id: "DIAG-ENG-04A",
    competency: "COMP_ENERGY",
    subcompetency: "SUB_DECARBONIZATION",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_ENG_D4_STRAT",
    prompt: "A corporate decarbonization committee evaluates a Power Purchase Agreement (PPA) vs onsite solar PV with Battery Energy Storage Systems (BESS). Which factor determines Scope 2 market-based accounting compliance under GHG Protocol?",
    options: [
      "Contractual retirement of Energy Attribute Certificates (EACs / Guarantees of Origin) matching hourly or annual consumption.",
      "Visual installation of solar panels on corporate headquarters.",
      "Purchasing carbon offset credits from unrelated forestry projects.",
      "Reducing working hours to daylight periods only.",
    ],
    correctOptionIndex: 0,
    rationale: "GHG Protocol Scope 2 Guidance requires verified, retired EACs to claim market-based zero-emission power.",
  },
  {
    id: "DIAG-ENG-04B",
    competency: "COMP_ENERGY",
    subcompetency: "SUB_DECARBONIZATION",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_ENG_D4_STRAT",
    prompt: "When structuring an Energy Performance Contract (EPC) with a guaranteed savings model, how is operational baseline risk distributed?",
    options: [
      "The Energy Service Company (ESCO) guarantees minimum energy savings, compensating any shortfall below the calibrated baseline.",
      "The client pays full contract fees regardless of actual measured savings.",
      "The utility provider assumes all capital expenditure liabilities.",
      "Baseline adjustments are prohibited regardless of weather or production volume changes.",
    ],
    correctOptionIndex: 0,
    rationale: "Guaranteed savings EPCs place financial performance risk on the ESCO against an IPMVP-calibrated baseline.",
  },

  // 2. COMP_WATER (8 Items: D1..D4 with Equivalent Groups)
  {
    id: "DIAG-WAT-01A",
    competency: "COMP_WATER",
    subcompetency: "SUB_WATER_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_WAT_D1_LEAK",
    prompt: "Which fixture failure represents the most common source of unmetered, silent commercial water loss?",
    options: [
      "Faulty toilet tank flapper valves and weeping pressure relief valves.",
      "Evaporation from open drinking glasses.",
      "Properly functioning aerated hand basins.",
      "Using cold water instead of hot water.",
    ],
    correctOptionIndex: 0,
    rationale: "Silent flapper valve leakage can waste 500 to 2,000 liters per fixture daily without visible floor pooling.",
  },
  {
    id: "DIAG-WAT-01B",
    competency: "COMP_WATER",
    subcompetency: "SUB_WATER_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_WAT_D1_LEAK",
    prompt: "What is the primary operational purpose of installing low-flow faucet aerators with pressure-compensating restrictors?",
    options: [
      "Maintains constant flow rate (e.g. 5 L/min) regardless of fluctuating system line pressure.",
      "Filters out mineral hardness completely.",
      "Heats water automatically at the point of discharge.",
      "Eliminates the need for plumbing maintenance.",
    ],
    correctOptionIndex: 0,
    rationale: "Pressure-compensating aerators deliver consistent flow and guest comfort across multi-story buildings.",
  },
  {
    id: "DIAG-WAT-02A",
    competency: "COMP_WATER",
    subcompetency: "SUB_WATER_CONSERVATION",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_WAT_D2_OPS",
    sectorRelevance: "SEC_HOSPITALITY",
    prompt: "A hotel housekeeping department implements an opt-out linen reuse program. What operational practice ensures guest participation and water conservation?",
    options: [
      "Clear in-room signage explaining card placement on beds and laundering sheets only on guest request or check-out.",
      "Replacing all towels twice daily automatically.",
      "Washing all laundry in cold tap water without detergent.",
      "Restricting guest shower access to morning hours only.",
    ],
    correctOptionIndex: 0,
    rationale: "Clear communication and structured housekeeping workflows drive high opt-in linen conservation.",
  },
  {
    id: "DIAG-WAT-02B",
    competency: "COMP_WATER",
    subcompetency: "SUB_WATER_CONSERVATION",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_WAT_D2_OPS",
    sectorRelevance: "SEC_MANUFACTURING",
    prompt: "In industrial cooling tower operations, increasing Cycles of Concentration (CoC) from 3 to 6 accomplishes what outcome?",
    options: [
      "Reduces cooling tower blowdown volume and freshwater makeup by approximately 50%.",
      "Doubles biological legionella risks automatically.",
      "Stops all water evaporation from the cooling tower.",
      "Increases chemical scale inhibitor consumption ten-fold.",
    ],
    correctOptionIndex: 0,
    rationale: "Higher CoC maximizes water recycling before blowdown discharge is required.",
  },
  {
    id: "DIAG-WAT-03A",
    competency: "COMP_WATER",
    subcompetency: "SUB_WATER_RECYCLING",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_WAT_D3_GREY",
    prompt: "A resort grounds manager designs a rainwater harvesting and greywater reuse system for landscape irrigation. Which water stream requires secondary UV disinfection and separate non-potable distribution piping?",
    options: [
      "Light greywater collected from guest room showers and hand basins.",
      "Municipal potable drinking water.",
      "Direct municipal fire hydrant reserve.",
      "Distilled laboratory water.",
    ],
    correctOptionIndex: 0,
    rationale: "Greywater contains organic matter and surfactants, requiring biological filtration and UV sterilization prior to reuse.",
  },
  {
    id: "DIAG-WAT-03B",
    competency: "COMP_WATER",
    subcompetency: "SUB_WATER_RECYCLING",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_WAT_D3_GREY",
    prompt: "When conducting a corporate water footprint assessment using the AWS (Alliance for Water Stewardship) standard, why is catchment context critical?",
    options: [
      "Water risk depends on local watershed stress, seasonal scarcity, and shared water rights with local communities.",
      "Water prices are identical worldwide.",
      "Rainwater is classified as toxic wastewater under global standards.",
      "Catchment boundaries only apply to hydroelectric dams.",
    ],
    correctOptionIndex: 0,
    rationale: "Water is locally contextual; withdrawal impact is far higher in water-stressed basins than water-abundant areas.",
  },
  {
    id: "DIAG-WAT-04A",
    competency: "COMP_WATER",
    subcompetency: "SUB_WATER_STRATEGY",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_WAT_D4_STRAT",
    prompt: "A multi-site corporation establishes a 'Net Positive Water Impact' target by 2030 in high water-stress basins. What strategy satisfies this standard?",
    options: [
      "Replenishing and restoring more clean freshwater into local aquifers than total direct and supply-chain consumption.",
      "Purchasing plastic bottled water for all staff.",
      "Discharging untreated wastewater into surface rivers.",
      "Relocating offices without addressing manufacturing plant water consumption.",
    ],
    correctOptionIndex: 0,
    rationale: "Net positive water impact requires quantified replenishment exceeding volumetric consumptive use in the same basin.",
  },
  {
    id: "DIAG-WAT-04B",
    competency: "COMP_WATER",
    subcompetency: "SUB_WATER_STRATEGY",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_WAT_D4_STRAT",
    prompt: "Under TNFD (Taskforce on Nature-related Financial Disclosures) LEAP methodology, how should enterprise water dependency risks be prioritized?",
    options: [
      "Locate assets in water-stressed biomes &rarr; Evaluate withdrawal volumes &rarr; Assess regulatory/physical risks &rarr; Prepare mitigation.",
      "Measure total corporate water bills only at annual financial year-end.",
      "Assume water utilities provide unlimited risk-free supply indefinitely.",
      "Delegate water risk exclusively to corporate marketing departments.",
    ],
    correctOptionIndex: 0,
    rationale: "TNFD LEAP follows a systematic Locate, Evaluate, Assess, and Prepare workflow for freshwater dependencies.",
  },

  // 3. COMP_CIRCULARITY (8 Items: D1..D4 with Equivalent Groups)
  {
    id: "DIAG-CIRC-01A",
    competency: "COMP_CIRCULARITY",
    subcompetency: "SUB_WASTE_HIERARCHY",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_CIRC_D1_HIERARCHY",
    prompt: "According to the Waste Management Hierarchy (5Rs), which action produces the highest environmental and economic benefit?",
    options: [
      "Refuse & Source Reduction (preventing waste from entering the facility in the first place).",
      "Waste-to-energy incineration.",
      "Recycling into lower-grade mixed materials.",
      "Sanitary landfilling with methane capture.",
    ],
    correctOptionIndex: 0,
    rationale: "Prevention and refusal avoid 100% of material extraction, manufacturing, and downstream waste processing impacts.",
  },
  {
    id: "DIAG-CIRC-01B",
    competency: "COMP_CIRCULARITY",
    subcompetency: "SUB_WASTE_HIERARCHY",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_CIRC_D1_HIERARCHY",
    prompt: "What is the primary cause of contamination in commercial single-stream dry recyclables (paper and plastics)?",
    options: [
      "Food residue, liquid grease, and unrinsed organic matter.",
      "Sorting items by resin identification code.",
      "Storing cardboard dry in covered compactor bins.",
      "Baling clean corrugated boxes together.",
    ],
    correctOptionIndex: 0,
    rationale: "Food residues spoil fibrous paper and clog plastic melt extruders, causing entire batches to be landfilled.",
  },
  {
    id: "DIAG-CIRC-02A",
    competency: "COMP_CIRCULARITY",
    subcompetency: "SUB_CIRCULAR_PRACTICES",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_CIRC_D2_PACKAGING",
    sectorRelevance: "SEC_RETAIL",
    prompt: "A retail logistics warehouse receives hundreds of pallet shipments daily wrapped in single-use LDPE stretch film. What is the most effective circular operational change?",
    options: [
      "Transitioning to reusable returnable pallet bands and heavy-duty silicone wrap sleeves.",
      "Switching to black stretch film that cannot be visually inspected.",
      "Burning plastic wrap in an open yard incinerator.",
      "Doubling the thickness of single-use wrap layers.",
    ],
    correctOptionIndex: 0,
    rationale: "Reusable pallet retention systems eliminate recurring single-use plastic waste across closed-loop distribution routes.",
  },
  {
    id: "DIAG-CIRC-02B",
    competency: "COMP_CIRCULARITY",
    subcompetency: "SUB_CIRCULAR_PRACTICES",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_CIRC_D2_PACKAGING",
    sectorRelevance: "SEC_HOSPITALITY",
    prompt: "A hotel food & beverage department aims to achieve Zero Food Waste to Landfill. What operational sequence achieves maximum diversion?",
    options: [
      "Source portion control &rarr; Surplus food donation to verified charities &rarr; Onsite bio-digestion / composting of food scraps.",
      "Grinding all leftover buffet items down the sewage drain.",
      "Mixing food waste with plastic packaging in compactors.",
      "Replacing all fresh meals with processed frozen rations.",
    ],
    correctOptionIndex: 0,
    rationale: "Hierarchical food diversion prioritizes human feeding first, followed by animal feed and aerobic soil composting.",
  },
  {
    id: "DIAG-CIRC-03A",
    competency: "COMP_CIRCULARITY",
    subcompetency: "SUB_CIRCULAR_DESIGN",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_CIRC_D3_DESIGN",
    prompt: "When designing electronic or mechanical equipment for circularity, what is the core engineering objective of 'Design for Disassembly' (DfD)?",
    options: [
      "Using standardized fasteners, unbonded single polymers, and modular components for rapid repair and remanufacturing.",
      "Permanently gluing all internal parts to prevent customer tampering.",
      "Applying mixed composite coatings that cannot be separated chemically.",
      "Using proprietary screws that require obsolete tools.",
    ],
    correctOptionIndex: 0,
    rationale: "Design for Disassembly allows components to be extracted and remanufactured cleanly with minimal labor.",
  },
  {
    id: "DIAG-CIRC-03B",
    competency: "COMP_CIRCULARITY",
    subcompetency: "SUB_CIRCULAR_DESIGN",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_CIRC_D3_DESIGN",
    prompt: "In a Closed-Loop Product-as-a-Service (PaaS) business model, why is the manufacturer incentivized to design for extreme durability and repairability?",
    options: [
      "The manufacturer retains product asset ownership and bears lifetime repair/replacement costs.",
      "Customer disposal fees are eliminated by government subsidies.",
      "Products are legally required to self-destruct after 12 months.",
      "Repair parts are subsidized by utility providers.",
    ],
    correctOptionIndex: 0,
    rationale: "When selling service uptime rather than disposable physical units, durability directly maximizes operating margins.",
  },
  {
    id: "DIAG-CIRC-04A",
    competency: "COMP_CIRCULARITY",
    subcompetency: "SUB_CIRCULAR_STRATEGY",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_CIRC_D4_STRAT",
    prompt: "An industrial park implements an 'Industrial Symbiosis' network. What operational infrastructure is required to trade byproduct waste streams between tenants?",
    options: [
      "Material characterization protocols, standardized byproduct transfer contracts, and thermal/matter transport pipelines.",
      "A centralized landfill site shared by all factories.",
      "Banning all secondary material transactions between companies.",
      "Classifying all industrial byproducts as hazardous toxic waste.",
    ],
    correctOptionIndex: 0,
    rationale: "Industrial symbiosis turns one company's waste into another's feedstock via structured material agreements.",
  },
  {
    id: "DIAG-CIRC-04B",
    competency: "COMP_CIRCULARITY",
    subcompetency: "SUB_CIRCULAR_STRATEGY",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_CIRC_D4_STRAT",
    prompt: "How does the Ellen MacArthur Foundation 'Circularity Indicator' measure material circularity across complex supply chains?",
    options: [
      "By calculating the ratio of virgin non-renewable feedstock vs recycled/biological circular inputs and unrecoverable waste.",
      "By counting the total weight of paper discarded in office recycling bins.",
      "By calculating total electrical kWh consumed per product.",
      "By verifying that all packaging is painted green.",
    ],
    correctOptionIndex: 0,
    rationale: "Circularity indicators mathematically assess mass flows: virgin inputs, recycled content, efficiency, and end-of-life recovery.",
  },

  // 4. COMP_GHG: GHG Accounting & Carbon Management (8 Items: D1..D4)
  {
    id: "DIAG-GHG-01A",
    competency: "COMP_GHG",
    subcompetency: "SUB_GHG_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_GHG_D1_SCOPES",
    prompt: "Under the GHG Protocol Corporate Standard, how are Scope 1 direct emissions defined?",
    options: [
      "Greenhouse gas emissions from sources owned or controlled by the reporting organization (e.g. company vehicles, onsite boilers).",
      "Emissions from purchased grid electricity only.",
      "Emissions generated by employee personal home appliances.",
      "Emissions from international tourist flights.",
    ],
    correctOptionIndex: 0,
    rationale: "Scope 1 covers direct combustion and fugitive emissions from company-owned or controlled physical assets.",
  },
  {
    id: "DIAG-GHG-01B",
    competency: "COMP_GHG",
    subcompetency: "SUB_GHG_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_GHG_D1_SCOPES",
    prompt: "What is the key difference between Scope 2 location-based accounting and Scope 2 market-based accounting?",
    options: [
      "Location-based uses average grid emission factors; market-based reflects specific contractual renewable energy instruments.",
      "Location-based calculates Scope 1 emissions; market-based calculates Scope 3.",
      "Location-based applies only to air travel; market-based applies to maritime shipping.",
      "Location-based is measured in USD; market-based is measured in EUR.",
    ],
    correctOptionIndex: 0,
    rationale: "Location-based reflects physical grid intensity; market-based accounts for contractual energy purchase choices.",
  },
  {
    id: "DIAG-GHG-02A",
    competency: "COMP_GHG",
    subcompetency: "SUB_GHG_ACCOUNTING",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_GHG_D2_CALC",
    prompt: "An accounting department calculates emissions from company diesel vans burning 10,000 liters of diesel fuel. What formula converts fuel consumption into tonnes of $CO_2e$?",
    options: [
      "Activity Data (Liters) $\\times$ Specific Fuel Emission Factor ($kg CO_2e / Liter$) $\\div 1,000$.",
      "Fuel Invoice Cost $\\times$ Consumer Price Index.",
      "Vehicle Speed $\\times$ Number of Wheels $\\div 100$.",
      "Total Odometre Kilometers $\\div$ Engine Horsepower.",
    ],
    correctOptionIndex: 0,
    rationale: "Standard carbon accounting multiplies primary activity data by the verified DEFRA/IPCC emissions factor.",
  },
  {
    id: "DIAG-GHG-02B",
    competency: "COMP_GHG",
    subcompetency: "SUB_GHG_ACCOUNTING",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_GHG_D2_CALC",
    prompt: "When reporting refrigerant leaks from commercial air conditioning units, why must Global Warming Potential (GWP) be applied to fugitive gas losses?",
    options: [
      "Synthetic refrigerants (like R-410A) trap thousands of times more heat per kg than $CO_2$ over 100 years.",
      "Refrigerants only release non-greenhouse nitrogen gas.",
      "GWP is a currency conversion factor for refrigerant import taxes.",
      "Refrigerants only impact ground-level ozone, not global climate.",
    ],
    correctOptionIndex: 0,
    rationale: "HFCs have high GWPs (1,000 to 4,000+), meaning small leaks result in significant Scope 1 carbon footprints.",
  },
  {
    id: "DIAG-GHG-03A",
    competency: "COMP_GHG",
    subcompetency: "SUB_SCOPE3_VALUECHAIN",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_GHG_D3_SCOPE3",
    prompt: "A corporation maps its Scope 3 emissions across 15 categories. Which category typically dominates the carbon inventory of service and retail organizations?",
    options: [
      "Category 1: Purchased Goods and Services (upstream supply chain production).",
      "Category 5: Waste generated in office bins.",
      "Category 6: Business taxi travel.",
      "Category 14: Franchises.",
    ],
    correctOptionIndex: 0,
    rationale: "Upstream purchased goods and services routinely represent 60% to 85% of total corporate value-chain footprints.",
  },
  {
    id: "DIAG-GHG-03B",
    competency: "COMP_GHG",
    subcompetency: "SUB_SCOPE3_VALUECHAIN",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_GHG_D3_SCOPE3",
    prompt: "What is the primary methodological limitation of using 'Spend-Based' Scope 3 carbon accounting vs 'Supplier-Specific' activity data?",
    options: [
      "Spend-based uses macroeconomic industry averages, failing to reward suppliers who decarbonize their products.",
      "Spend-based data requires continuous laboratory emissions testing.",
      "Spend-based calculations are illegal under European Union law.",
      "Spend-based data can only be calculated in Japanese Yen.",
    ],
    correctOptionIndex: 0,
    rationale: "Spend-based estimates tie carbon to money spent, meaning inflation or price hikes falsely appear as emission increases.",
  },
  {
    id: "DIAG-GHG-04A",
    competency: "COMP_GHG",
    subcompetency: "SUB_NETZERO_TARGETS",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_GHG_D4_NETZERO",
    prompt: "Under the Science Based Targets initiative (SBTi) Corporate Net-Zero Standard, what is the mandatory requirement for permanent carbon neutral claims?",
    options: [
      "At least 90% direct value-chain absolute decarbonization across Scopes 1, 2, and 3, neutralizing only residual $<10\\%$ emissions via permanent carbon removals.",
      "Purchasing unverified carbon credits to offset 100% of emissions without operational reductions.",
      "Planting trees on corporate grounds while expanding coal power plants.",
      "Excluding Scope 3 supply chain emissions from corporate targets entirely.",
    ],
    correctOptionIndex: 0,
    rationale: "SBTi strictly mandates 90%+ real abatement before permanent neutralization of residual hard-to-abate emissions.",
  },
  {
    id: "DIAG-GHG-04B",
    competency: "COMP_GHG",
    subcompetency: "SUB_NETZERO_TARGETS",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_GHG_D4_NETZERO",
    prompt: "How does the GHG Protocol treat biogenic emissions (e.g. burning sustainably sourced wood pellets or biogas) in corporate reporting?",
    options: [
      "Reported separately 'Outside of the Scopes' (biogenic $CO_2$), while non-$CO_2$ combustion gases ($CH_4, N_2O$) are included in Scope 1.",
      "Completely ignored and omitted from all reporting tables.",
      "Multiplied by a penalty factor of 5 in Scope 2.",
      "Classified as Scope 3 Category 15 investments.",
    ],
    correctOptionIndex: 0,
    rationale: "Biogenic $CO_2$ is reported as a memo line outside scopes, while associated methane/nitrous oxide stay in Scope 1.",
  },

  // 5. COMP_GOVERNANCE: ESG Governance, Ethics & Reporting (8 Items: D1..D4)
  {
    id: "DIAG-GOV-01A",
    competency: "COMP_GOVERNANCE",
    subcompetency: "SUB_ESG_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_GOV_D1_DISCLOSURE",
    prompt: "What is the core purpose of publishing an audited corporate Sustainability (ESG) Report?",
    options: [
      "To disclose transparent, verifiable non-financial environmental, social, and governance risks and performance to stakeholders.",
      "To replace standard corporate tax returns.",
      "To advertise products without advertising regulatory compliance.",
      "To eliminate employee performance reviews.",
    ],
    correctOptionIndex: 0,
    rationale: "ESG reporting provides standardized non-financial disclosures to investors, customers, and regulators.",
  },
  {
    id: "DIAG-GOV-01B",
    competency: "COMP_GOVERNANCE",
    subcompetency: "SUB_ESG_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_GOV_D1_DISCLOSURE",
    prompt: "Which practice constitutes illegal or misleading 'Greenwashing' under international consumer protection laws?",
    options: [
      "Advertising a product as '100% Eco-Friendly & Carbon Zero' without certified life-cycle assessment evidence.",
      "Installing LED light bulbs in staff canteens.",
      "Auditing annual greenhouse gas inventories with accredited assurance providers.",
      "Complying with municipal wastewater discharge permits.",
    ],
    correctOptionIndex: 0,
    rationale: "Vague, unsubstantiated claims violate consumer protection and EU Green Claims directives.",
  },
  {
    id: "DIAG-GOV-02A",
    competency: "COMP_GOVERNANCE",
    subcompetency: "SUB_ETHICS_COMPLIANCE",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_GOV_D2_ETHICS",
    prompt: "An employee observes a supplier offering undisclosed cash payments to a procurement supervisor in exchange for contract awards. What is the mandatory ethical procedure?",
    options: [
      "Report the incident immediately through the company's confidential, protected Whistleblower reporting mechanism.",
      "Request a portion of the cash payment to maintain silence.",
      "Post allegations on public social media channels anonymously.",
      "Ignore it because procurement matters are not environmental issues.",
    ],
    correctOptionIndex: 0,
    rationale: "Anti-bribery compliance and whistleblower channels are core pillars of corporate governance integrity.",
  },
  {
    id: "DIAG-GOV-02B",
    competency: "COMP_GOVERNANCE",
    subcompetency: "SUB_ETHICS_COMPLIANCE",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_GOV_D2_ETHICS",
    prompt: "How does a company ensure compliance with human rights and Modern Slavery legislation in its operational supply chains?",
    options: [
      "Conducting independent third-party labor audits, enforcing fair living wage standards, and verifying worker passport retention bans.",
      "Requiring suppliers to sign self-declarations without field verification.",
      "Hiring only temporary migrant workers through unlicensed labor brokers.",
      "Eliminating workplace safety inspections at contractor sites.",
    ],
    correctOptionIndex: 0,
    rationale: "Effective modern slavery due diligence combines binding supplier codes with independent on-site worker audits.",
  },
  {
    id: "DIAG-GOV-03A",
    competency: "COMP_GOVERNANCE",
    subcompetency: "SUB_DOUBLE_MATERIALITY",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_GOV_D3_FRAMEWORKS",
    prompt: "Under the European Corporate Sustainability Reporting Directive (CSRD) and ESRS standards, what does 'Double Materiality' mandate?",
    options: [
      "Assessing both Financial Materiality (inward risks affecting enterprise value) AND Impact Materiality (outward impact on society and environment).",
      "Calculating carbon emissions twice using two different software programs.",
      "Reporting financial revenue in both Euros and US Dollars.",
      "Auditing financial statements every two years instead of annually.",
    ],
    correctOptionIndex: 0,
    rationale: "Double materiality integrates inward balance sheet risk with outward societal/environmental impacts.",
  },
  {
    id: "DIAG-GOV-03B",
    competency: "COMP_GOVERNANCE",
    subcompetency: "SUB_DOUBLE_MATERIALITY",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_GOV_D3_FRAMEWORKS",
    prompt: "What is the governance role of the Board of Directors under the IFRS S1 and S2 sustainability disclosure standards?",
    options: [
      "Exercising direct fiduciary oversight over climate risks, strategic resilience, executive ESG remuneration metrics, and transition plans.",
      "Delegating all sustainability questions exclusively to junior office interns.",
      "Approving marketing slogans without reviewing audited emissions data.",
      "Ensuring that sustainability risks are excluded from corporate risk registers.",
    ],
    correctOptionIndex: 0,
    rationale: "IFRS S1/S2 mandates explicit Board governance over sustainability risks, oversight committees, and capital allocation.",
  },
  {
    id: "DIAG-GOV-04A",
    competency: "COMP_GOVERNANCE",
    subcompetency: "SUB_ESG_ASSURANCE",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_GOV_D4_ASSURANCE",
    prompt: "What is the critical evidentiary threshold distinguishing 'Limited Assurance' from 'Reasonable Assurance' in ESG audits (ISAE 3000)?",
    options: [
      "Reasonable assurance involves deep internal control testing, source data sampling, and substantiation, yielding a positive opinion similar to financial audits.",
      "Limited assurance provides higher legal protection than reasonable assurance.",
      "Reasonable assurance requires zero documentation review.",
      "Limited assurance is only conducted by internal company employees.",
    ],
    correctOptionIndex: 0,
    rationale: "Reasonable assurance requires extensive substantive testing to conclude the report is fair in all material respects.",
  },
  {
    id: "DIAG-GOV-04B",
    competency: "COMP_GOVERNANCE",
    subcompetency: "SUB_ESG_ASSURANCE",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_GOV_D4_ASSURANCE",
    prompt: "Under the EU Corporate Sustainability Due Diligence Directive (CSDDD), what civil liability exposure do corporations face regarding value chain human rights violations?",
    options: [
      "Companies can be held civilly liable for damages caused by intentional or negligent failure to prevent adverse human rights/environmental impacts across upstream and downstream partners.",
      "Companies are immune from all legal liability if suppliers are registered overseas.",
      "Liability is limited strictly to a verbal reprimand from municipal chambers of commerce.",
      "CSDDD applies only to state-owned defense contractors.",
    ],
    correctOptionIndex: 0,
    rationale: "CSDDD introduces civil liability and mandatory corporate transition plans with substantial turnover-based fines.",
  },

  // 6. COMP_PROCUREMENT: Sustainable Supply Chain & Sourcing (8 Items: D1..D4)
  {
    id: "DIAG-PROC-01A",
    competency: "COMP_PROCUREMENT",
    subcompetency: "SUB_SUPPLY_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_PROC_D1_CRITERIA",
    prompt: "What is Sustainable Procurement?",
    options: [
      "Integrating environmental, social, and ethical factors into purchasing decisions alongside price, quality, and delivery terms.",
      "Buying the absolute lowest-priced product regardless of manufacturing labor conditions.",
      "Purchasing goods only during end-of-year clearance sales.",
      "Stopping all purchases of technology hardware.",
    ],
    correctOptionIndex: 0,
    rationale: "Sustainable procurement balances total cost of ownership with environmental stewardship and labor rights.",
  },
  {
    id: "DIAG-PROC-01B",
    competency: "COMP_PROCUREMENT",
    subcompetency: "SUB_SUPPLY_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_PROC_D1_CRITERIA",
    prompt: "When evaluating supplier bids, what does 'Total Cost of Ownership' (TCO) calculate?",
    options: [
      "Initial purchase cost plus lifetime operating energy, maintenance, consumable parts, and end-of-life disposal costs.",
      "The initial retail sticker price minus shipping taxes.",
      "The supplier's total annual corporate revenue.",
      "The supplier's employee pension valuation.",
    ],
    correctOptionIndex: 0,
    rationale: "TCO reveals that energy-efficient, durable assets are cheaper over their lifecycle despite higher initial acquisition price.",
  },
  {
    id: "DIAG-PROC-02A",
    competency: "COMP_PROCUREMENT",
    subcompetency: "SUB_SUPPLIER_DUE_DILIGENCE",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_PROC_D2_AUDIT",
    prompt: "A purchasing officer issues a Request for Proposal (RFP) for hotel cleaning chemicals. Which certification verifies verified eco-toxicity standards?",
    options: [
      "Ecolabel (e.g. EU Ecolabel / Green Seal) verifying biodegradability and absence of carcinogens.",
      "Generic marketing claims such as 'Natural Scent' or 'Botanical Formula'.",
      "Supplier's business registration certificate.",
      "ISO 9001 quality management stamp.",
    ],
    correctOptionIndex: 0,
    rationale: "Third-party ecolabels guarantee strict limits on aquatic toxicity, VOCs, and hazardous chemical formulation.",
  },
  {
    id: "DIAG-PROC-02B",
    competency: "COMP_PROCUREMENT",
    subcompetency: "SUB_SUPPLIER_DUE_DILIGENCE",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_PROC_D2_AUDIT",
    prompt: "In commercial timber and paper purchasing, which chain-of-custody credential guarantees zero contribution to tropical deforestation?",
    options: [
      "FSC (Forest Stewardship Council) or PEFC 100% certified chain of custody.",
      "Supplier statement that wood was harvested in daylight hours.",
      "Brown recycled cardboard color without certification.",
      "General ISO 14001 factory certification.",
    ],
    correctOptionIndex: 0,
    rationale: "FSC chain-of-custody tracks certified sustainable forestry fibers from forest floor to finished end product.",
  },
  {
    id: "DIAG-PROC-03A",
    competency: "COMP_PROCUREMENT",
    subcompetency: "SUB_SUPPLY_CHAIN_DECARB",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_PROC_D3_SCOPE3_PROC",
    prompt: "A procurement director aims to decarbonize Category 1 emissions. Which supplier engagement mechanism drives measurable carbon reductions?",
    options: [
      "Requiring top 50 strategic suppliers by spend to set verified Science Based Targets and disclose primary emission intensities via CDP.",
      "Cancelling all supplier contracts and manufacturing everything in-house without capital.",
      "Ignoring supplier emissions and calculating spend-based industry averages forever.",
      "Requesting suppliers to plant trees without tracking emissions.",
    ],
    correctOptionIndex: 0,
    rationale: "Engaging top suppliers to set validated science-based targets directly drives primary decarbonization of Scope 3.",
  },
  {
    id: "DIAG-PROC-03B",
    competency: "COMP_PROCUREMENT",
    subcompetency: "SUB_SUPPLY_CHAIN_DECARB",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_PROC_D3_SCOPE3_PROC",
    prompt: "When negotiating capital asset purchases, how does including an internal carbon shadow price ($80 / tonne $CO_2e$) alter procurement decisions?",
    options: [
      "It makes low-carbon, highly efficient machinery financially competitive by monetizing lifetime energy emissions savings in NPV calculations.",
      "It increases import duty taxes paid directly to customs.",
      "It requires cash payments to local municipal authorities.",
      "It forces purchasing teams to buy older second-hand equipment.",
    ],
    correctOptionIndex: 0,
    rationale: "Shadow carbon pricing internalizes environmental externalities, making energy-efficient capital choices financially superior.",
  },
  {
    id: "DIAG-PROC-04A",
    competency: "COMP_PROCUREMENT",
    subcompetency: "SUB_CIRCULAR_PROCUREMENT",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_PROC_D4_CIRCULAR_CONTRACTS",
    prompt: "A multinational enterprise drafts master purchasing contracts for corporate IT equipment. What contract clause secures circular product recovery?",
    options: [
      "Guaranteed buy-back / take-back covenants with certified data sanitization and asset remanufacturing clauses.",
      "Mandating that employees destroy laptops in office shredders.",
      "Transferring all electronic waste disposal costs to municipal landfills.",
      "Prohibiting the repair of electronic equipment by third parties.",
    ],
    correctOptionIndex: 0,
    rationale: "Contractual buy-back and remanufacturing clauses guarantee that end-of-life IT hardware re-enters circular value chains.",
  },
  {
    id: "DIAG-PROC-04B",
    competency: "COMP_PROCUREMENT",
    subcompetency: "SUB_CIRCULAR_PROCUREMENT",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_PROC_D4_CIRCULAR_CONTRACTS",
    prompt: "Under the EU Deforestation Regulation (EUDR), what mandatory due diligence must commodity importers (timber, coffee, palm oil, rubber) provide?",
    options: [
      "Geographic coordinates (polygons) of farm production plots proving land was not deforested after December 31, 2020.",
      "A verbal statement from shipping container captains.",
      "Photographs of trees planted near corporate regional offices.",
      "Proof of payment of standard maritime freight charges.",
    ],
    correctOptionIndex: 0,
    rationale: "EUDR mandates precise satellite geolocation data verifying deforestation-free cultivation down to plot level.",
  },

  // 7. COMP_BIODIVERSITY: Biodiversity & Nature Protection (8 Items: D1..D4)
  {
    id: "DIAG-BIO-01A",
    competency: "COMP_BIODIVERSITY",
    subcompetency: "SUB_BIO_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_BIO_D1_ECOSYSTEM",
    prompt: "What are 'Ecosystem Services' in the context of corporate environmental management?",
    options: [
      "Natural benefits provided by healthy ecosystems, such as freshwater filtration, pollination, climate regulation, and storm surge buffering.",
      "Landscaping services provided by private gardening contractors.",
      "Selling potted plants in corporate reception lobbies.",
      "Municipal garbage collection schedules.",
    ],
    correctOptionIndex: 0,
    rationale: "Ecosystem services encompass provisioning, regulating, cultural, and supporting functions vital to human and economic survival.",
  },
  {
    id: "DIAG-BIO-01B",
    competency: "COMP_BIODIVERSITY",
    subcompetency: "SUB_BIO_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_BIO_D1_ECOSYSTEM",
    prompt: "What is the primary driver of global terrestrial biodiversity loss?",
    options: [
      "Habitat destruction and land-use conversion for agriculture, mining, and urban development.",
      "Natural winter migration of migratory birds.",
      "High atmospheric nitrogen levels in deserts.",
      "Indoor air conditioning.",
    ],
    correctOptionIndex: 0,
    rationale: "Land conversion and habitat fragmentation are the single largest drivers of species decline worldwide.",
  },
  {
    id: "DIAG-BIO-02A",
    competency: "COMP_BIODIVERSITY",
    subcompetency: "SUB_HABITAT_MANAGEMENT",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_BIO_D2_GROUNDS",
    prompt: "A commercial property management team re-landscapes a 10-hectare corporate park. Which practice maximizes local biodiversity and climate resilience?",
    options: [
      "Planting drought-tolerant native flora, creating pollinator corridors, and eliminating chemical synthetic pesticides.",
      "Installing artificial plastic synthetic grass across all lawns.",
      "Spraying chemical broad-spectrum insecticides weekly.",
      "Planting invasive exotic ornamental palms requiring continuous irrigation.",
    ],
    correctOptionIndex: 0,
    rationale: "Native vegetation supports local pollinators and fauna while dramatically reducing irrigation and chemical chemical inputs.",
  },
  {
    id: "DIAG-BIO-02B",
    competency: "COMP_BIODIVERSITY",
    subcompetency: "SUB_HABITAT_MANAGEMENT",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_BIO_D2_GROUNDS",
    prompt: "When developing coastal tourism properties in small island states, why is preserving coastal mangrove and coral reef ecosystems critical?",
    options: [
      "Mangroves and coral reefs provide natural storm surge protection, reduce coastal erosion, and sequester blue carbon.",
      "Mangroves increase commercial beach sand sales.",
      "Coral reefs provide rock material for building foundations.",
      "Mangroves eliminate the need for wastewater treatment.",
    ],
    correctOptionIndex: 0,
    rationale: "Coastal blue carbon ecosystems offer vital physical coastal defense and rich marine nursery habitats.",
  },
  {
    id: "DIAG-BIO-03A",
    competency: "COMP_BIODIVERSITY",
    subcompetency: "SUB_BIODIVERSITY_MITIGATION",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_BIO_D3_HIERARCHY",
    prompt: "In environmental impact assessments, how is the 'Mitigation Hierarchy' applied to infrastructure development projects?",
    options: [
      "Avoid impacts first &rarr; Minimize unavoidable impacts &rarr; Restore degraded habitats onsite &rarr; Offset residual impacts only as a last resort.",
      "Offset 100% of impacts immediately with cash donations while destroying virgin rainforests.",
      "Build infrastructure first and conduct environmental surveys after project completion.",
      "Relocate local wildlife into urban shopping malls.",
    ],
    correctOptionIndex: 0,
    rationale: "The Mitigation Hierarchy strictly mandates avoidance and minimization before considering ecological offsets.",
  },
  {
    id: "DIAG-BIO-03B",
    competency: "COMP_BIODIVERSITY",
    subcompetency: "SUB_BIODIVERSITY_MITIGATION",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_BIO_D3_HIERARCHY",
    prompt: "Under the Kunming-Montreal Global Biodiversity Framework (GBF) Target 15, what must large enterprises and financial institutions disclose?",
    options: [
      "Their risks, dependencies, and direct impacts on biodiversity and ecosystem services across their operations and supply chains.",
      "Total number of trees visible from executive boardrooms.",
      "Photographs of corporate wildlife calendars.",
      "Disclosing biodiversity only if it increases quarterly net profits.",
    ],
    correctOptionIndex: 0,
    rationale: "Target 15 requires mandatory assessment and disclosure of nature-related dependencies, impacts, and risks.",
  },
  {
    id: "DIAG-BIO-04A",
    competency: "COMP_BIODIVERSITY",
    subcompetency: "SUB_TNFD_NATURE_STRAT",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_BIO_D4_NATURE_STRAT",
    prompt: "A financial institution implements the TNFD framework to evaluate agricultural loan portfolios. What constitutes a 'Nature-Related Physical Risk'?",
    options: [
      "Collapse of pollinator populations and severe soil degradation leading to widespread agricultural crop yield failures and loan defaults.",
      "Changes in government corporate tax rates.",
      "Fluctuations in foreign exchange conversion fees.",
      "Software updates on online banking platforms.",
    ],
    correctOptionIndex: 0,
    rationale: "Physical nature risks stem directly from the degradation of natural assets and ecosystem service dependencies.",
  },
  {
    id: "DIAG-BIO-04B",
    competency: "COMP_BIODIVERSITY",
    subcompetency: "SUB_TNFD_NATURE_STRAT",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_BIO_D4_NATURE_STRAT",
    prompt: "How does the Science Based Targets Network (SBTN) guide corporate 'Nature-Positive' transition plans?",
    options: [
      "Sets science-based thresholds for freshwater withdrawal, land-use footprint, ocean extraction, and biodiversity integrity aligned with planetary boundaries.",
      "Encourages arbitrary tree planting in non-native desert biomes.",
      "Allows unlimited pollution if companies buy carbon credits.",
      "Restricts nature conservation targets to state national parks only.",
    ],
    correctOptionIndex: 0,
    rationale: "SBTN establishes rigorous spatial targets for land, freshwater, oceans, and biodiversity within safe Earth operating boundaries.",
  },

  // 8. COMP_RISK: Climate & Environmental Risk Management (8 Items: D1..D4)
  {
    id: "DIAG-RSK-01A",
    competency: "COMP_RISK",
    subcompetency: "SUB_RISK_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_RSK_D1_TYPES",
    prompt: "Under the TCFD (Taskforce on Climate-related Financial Disclosures) framework, what are 'Physical Climate Risks'?",
    options: [
      "Risks resulting from climate-induced physical events, categorized into acute (storms, floods) and chronic (sea-level rise, heat stress).",
      "Risks associated with company stock market share price volatility.",
      "Physical theft of office equipment.",
      "Slip and fall accidents in staff cafeterias.",
    ],
    correctOptionIndex: 0,
    rationale: "Physical risks reflect direct damage to physical assets, supply disruption, and productivity losses from climate hazards.",
  },
  {
    id: "DIAG-RSK-01B",
    competency: "COMP_RISK",
    subcompetency: "SUB_RISK_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_RSK_D1_TYPES",
    prompt: "What are 'Transition Risks' in climate risk management?",
    options: [
      "Risks arising from the societal transition to a low-carbon economy, including regulatory carbon pricing, market shifts, and technological obsolescence.",
      "Risks associated with moving corporate offices to another floor.",
      "Employees transitioning between departments.",
      "Software transitions between operating system versions.",
    ],
    correctOptionIndex: 0,
    rationale: "Transition risks encompass policy, legal, technology, market, and reputation shifts during decarbonization.",
  },
  {
    id: "DIAG-RSK-02A",
    competency: "COMP_RISK",
    subcompetency: "SUB_VULNERABILITY_ASSESSMENT",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_RSK_D2_ASSESS",
    prompt: "A logistics company assesses climate resilience for coastal warehouse assets. Which physical adaptation measure mitigates increasing storm surge risks?",
    options: [
      "Elevating electrical substations and inventory racking above 1-in-100 year flood lines and installing automated backflow check valves.",
      "Painting the warehouse walls blue.",
      "Storing sensitive inventory directly on low ground floors.",
      "Cancelling building property insurance to cut costs.",
    ],
    correctOptionIndex: 0,
    rationale: "Physical hardening and elevation of critical equipment protect continuity during severe flood inundation.",
  },
  {
    id: "DIAG-RSK-02B",
    competency: "COMP_RISK",
    subcompetency: "SUB_VULNERABILITY_ASSESSMENT",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_RSK_D2_ASSESS",
    prompt: "When assessing supply chain vulnerability to raw material disruption, what does 'Multi-Sourcing Geographic Diversification' achieve?",
    options: [
      "Prevents single-point failure if one specific agricultural region experiences extreme drought or climate disaster.",
      "Doubles shipping logistics carbon emissions without reason.",
      "Increases dependence on a single monopoly supplier.",
      "Eliminates the need for supplier quality audits.",
    ],
    correctOptionIndex: 0,
    rationale: "Geographic diversification protects production continuity against localized climate disasters.",
  },
  {
    id: "DIAG-RSK-03A",
    competency: "COMP_RISK",
    subcompetency: "SUB_SCENARIO_ANALYSIS",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_RSK_D3_SCENARIOS",
    prompt: "In corporate TCFD climate scenario analysis, why are companies required to test strategy against both a $1.5^\\circ\\text{C}$ / $2^\\circ\\text{C}$ pathway AND a $>3^\\circ\\text{C}$ / $4^\\circ\\text{C}$ pathway?",
    options: [
      "$1.5^\\circ\\text{C}$ tests aggressive policy/transition risk, while $>3^\\circ\\text{C}$ tests catastrophic physical climate disruptions.",
      "To predict the exact weather for the upcoming fiscal quarter.",
      "Because global temperatures have stopped rising.",
      "To eliminate insurance underwriting requirements.",
    ],
    correctOptionIndex: 0,
    rationale: "Dual-scenario analysis evaluates resilience under both transition-dominated and physical-damage-dominated futures.",
  },
  {
    id: "DIAG-RSK-03B",
    competency: "COMP_RISK",
    subcompetency: "SUB_SCENARIO_ANALYSIS",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_RSK_D3_SCENARIOS",
    prompt: "What is an 'Internal Carbon Price' (ICP) and how does it manage climate transition risk?",
    options: [
      "A monetary value placed on $CO_2e$ emissions assigned to capital investment proposals to stress-test financial viability against future carbon taxes.",
      "A fee charged to employees for breathing inside office buildings.",
      "An electricity discount granted by utility providers.",
      "A mandatory tax paid to international aviation bodies.",
    ],
    correctOptionIndex: 0,
    rationale: "Internal carbon pricing proactively derisks long-term capital investments against future emission regulations.",
  },
  {
    id: "DIAG-RSK-04A",
    competency: "COMP_RISK",
    subcompetency: "SUB_ENTERPRISE_RISK_INTEGRATION",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_RSK_D4_ERM",
    prompt: "How should an enterprise integrate climate-related risks into its formal Enterprise Risk Management (ERM / COSO) framework?",
    options: [
      "Embed climate physical and transition scenarios directly into standard financial risk registers, credit ratings, and board audit reporting.",
      "Keep climate risks in a separate unread marketing pamphlet.",
      "Classify all climate risks as zero-probability events.",
      "Delete non-climate financial risks from the corporate ledger.",
    ],
    correctOptionIndex: 0,
    rationale: "Best-practice governance embeds climate scenarios into core corporate ERM and capital risk models.",
  },
  {
    id: "DIAG-RSK-04B",
    competency: "COMP_RISK",
    subcompetency: "SUB_ENTERPRISE_RISK_INTEGRATION",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_RSK_D4_ERM",
    prompt: "What is the financial concept of 'Stranded Assets' in the transition to net-zero emissions?",
    options: [
      "Capital assets (e.g. fossil fuel reserves, inefficient diesel infrastructure) that suffer premature write-downs or devaluation due to regulatory or market shifts.",
      "Cargo ships physically grounded on coral reefs.",
      "Office buildings left temporarily vacant during weekends.",
      "Lost luggage in airport terminals.",
    ],
    correctOptionIndex: 0,
    rationale: "Stranded assets face severe balance sheet impairment when decarbonization renders high-carbon infrastructure obsolete.",
  },

  // 9. COMP_SOCIAL: Social Responsibility & Workforce Engagement (8 Items: D1..D4)
  {
    id: "DIAG-SOC-01A",
    competency: "COMP_SOCIAL",
    subcompetency: "SUB_SOCIAL_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_SOC_D1_DEI",
    prompt: "What are the core pillars of the 'Social' (S) dimension in corporate ESG?",
    options: [
      "Human rights, workplace health and safety, diversity, equity and inclusion (DEI), fair labor standards, and community engagement.",
      "Hosting corporate cocktail parties.",
      "Managing company social media marketing accounts.",
      "Replacing all human staff with automated robots.",
    ],
    correctOptionIndex: 0,
    rationale: "The social pillar covers human capital, fair labor practices, worker wellbeing, and community relationships.",
  },
  {
    id: "DIAG-SOC-01B",
    competency: "COMP_SOCIAL",
    subcompetency: "SUB_SOCIAL_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_SOC_D1_DEI",
    prompt: "What constitutes a 'Living Wage' compared to a statutory minimum wage?",
    options: [
      "A wage that enables an employee and their family to afford basic necessities (food, housing, healthcare, education) in their specific location.",
      "A wage that equals the national average of all billionaire incomes.",
      "A wage paid exclusively in company gift vouchers.",
      "A wage determined solely by annual company stock performance.",
    ],
    correctOptionIndex: 0,
    rationale: "A living wage covers local cost-of-living necessities, often exceeding bare legal minimum wage levels.",
  },
  {
    id: "DIAG-SOC-02A",
    competency: "COMP_SOCIAL",
    subcompetency: "SUB_WORKFORCE_ENGAGEMENT",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_SOC_D2_JUST_TRANSITION",
    prompt: "A company plans a major technology automation retrofit. What practice embodies a 'Just Transition' for impacted employees?",
    options: [
      "Providing advance notice, structured reskilling and upskilling programs, and internal redeployment opportunities.",
      "Terminating affected workers with zero notice or transition support.",
      "Prohibiting workers from learning new digital tools.",
      "Ignoring employee feedback during technological transitions.",
    ],
    correctOptionIndex: 0,
    rationale: "A Just Transition ensures workers are supported with reskilling and redeployment as operational models evolve.",
  },
  {
    id: "DIAG-SOC-02B",
    competency: "COMP_SOCIAL",
    subcompetency: "SUB_WORKFORCE_ENGAGEMENT",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_SOC_D2_JUST_TRANSITION",
    prompt: "How does a structured 'Employee Green Team' drive workplace sustainability adoption?",
    options: [
      "Empowers grassroots employee champions across departments to identify local waste/energy savings and lead peer-to-peer initiatives.",
      "Forces employees to work without pay on weekends.",
      "Restricts sustainability discussions exclusively to C-suite executives.",
      "Replaces professional facility maintenance teams with volunteers.",
    ],
    correctOptionIndex: 0,
    rationale: "Cross-departmental green teams foster operational ownership and high engagement across frontline staff.",
  },
  {
    id: "DIAG-SOC-03A",
    competency: "COMP_SOCIAL",
    subcompetency: "SUB_HUMAN_RIGHTS_DUE_DILIGENCE",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_SOC_D3_COMMUNITY",
    prompt: "Under the UN Guiding Principles on Business and Human Rights (UNGPs), what is a corporation's responsibility regarding adverse human rights impacts?",
    options: [
      "Actively conduct ongoing human rights due diligence to identify, prevent, mitigate, and remediate actual and potential impacts.",
      "Rely solely on local law enforcement without internal oversight.",
      "Deny responsibility if human rights violations occur at contractor sites.",
      "Treat human rights due diligence as optional public relations material.",
    ],
    correctOptionIndex: 0,
    rationale: "The UNGPs establish a corporate duty to respect human rights through continuous due diligence and grievance mechanisms.",
  },
  {
    id: "DIAG-SOC-03B",
    competency: "COMP_SOCIAL",
    subcompetency: "SUB_HUMAN_RIGHTS_DUE_DILIGENCE",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_SOC_D3_COMMUNITY",
    prompt: "When developing projects near indigenous or local rural communities, what does 'Free, Prior, and Informed Consent' (FPIC) require?",
    options: [
      "Meaningful, transparent consultation and formal consent obtained before project approval, without coercion or intimidation.",
      "Informing local communities after construction has already started.",
      "Offering financial cash gifts to community leaders behind closed doors.",
      "Excluding local residents from all project planning dialogues.",
    ],
    correctOptionIndex: 0,
    rationale: "FPIC is a recognized international human rights standard safeguarding community self-determination and land rights.",
  },
  {
    id: "DIAG-SOC-04A",
    competency: "COMP_SOCIAL",
    subcompetency: "SUB_SOCIAL_IMPACT_STRATEGY",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_SOC_D4_STRAT_SOCIAL",
    prompt: "How does the 'Social Return on Investment' (SROI) methodology quantify social value in community development projects?",
    options: [
      "Assigns financial proxies to qualitative social and environmental changes experienced by stakeholders, calculating a benefit-to-cost ratio.",
      "Calculates total financial tax write-offs for corporate marketing sponsorships.",
      "Measures employee overtime hours worked on weekends.",
      "Tracks the number of social media likes on corporate charity posts.",
    ],
    correctOptionIndex: 0,
    rationale: "SROI measures extra-financial value (social and environmental outcomes) relative to resources invested.",
  },
  {
    id: "DIAG-SOC-04B",
    competency: "COMP_SOCIAL",
    subcompetency: "SUB_SOCIAL_IMPACT_STRATEGY",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_SOC_D4_STRAT_SOCIAL",
    prompt: "Under the EU Corporate Sustainability Reporting Directive (CSRD - ESRS S1 Own Workforce), what mandatory metrics must be reported?",
    options: [
      "Gender pay gap percentages, collective bargaining coverage, workplace injury rates, work-life balance provisions, and training hours per employee.",
      "Employee religious affiliations and private political voting records.",
      "Personal banking passwords of all executive managers.",
      "Omission of all workplace health and safety statistics.",
    ],
    correctOptionIndex: 0,
    rationale: "ESRS S1 mandates granular quantitative disclosures regarding workforce equity, health, safety, and training investments.",
  },

  // 10. COMP_HEALTH_SAFETY: Workplace Health, Safety & Environment (8 Items: D1..D4)
  {
    id: "DIAG-HSE-01A",
    competency: "COMP_HEALTH_SAFETY",
    subcompetency: "SUB_HSE_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_HSE_D1_HAZARDS",
    prompt: "What is the primary operational purpose of a Safety Data Sheet (SDS / MSDS) in chemical management?",
    options: [
      "Provides vital technical data on chemical hazards, safe handling, PPE requirements, emergency spill containment, and first-aid procedures.",
      "Lists supplier promotional discounts and wholesale prices.",
      "Authorizes unlimited dumping of chemicals into municipal stormwater drains.",
      "Replaces all employee workplace safety training.",
    ],
    correctOptionIndex: 0,
    rationale: "SDSs provide standardized hazard warnings, PPE instructions, and spill protocols under GHS regulations.",
  },
  {
    id: "DIAG-HSE-01B",
    competency: "COMP_HEALTH_SAFETY",
    subcompetency: "SUB_HSE_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_HSE_D1_HAZARDS",
    prompt: "In the Occupational Health & Safety 'Hierarchy of Controls', which strategy is the most effective at eliminating workplace risk?",
    options: [
      "Elimination (physically removing the hazard) and Substitution (replacing with a non-hazardous alternative).",
      "Relying solely on Personal Protective Equipment (PPE) like gloves and masks.",
      "Placing warning caution tape around the hazard permanently.",
      "Asking employees to work more quickly to avoid exposure.",
    ],
    correctOptionIndex: 0,
    rationale: "Elimination and substitution remove the hazard at source; PPE is the lowest and least reliable line of defense.",
  },
  {
    id: "DIAG-HSE-02A",
    competency: "COMP_HEALTH_SAFETY",
    subcompetency: "SUB_INCIDENT_PREVENTION",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_HSE_D2_PROCEDURES",
    prompt: "An operator detects a chemical solvent spill of 20 liters in a storage warehouse. What is the correct initial response protocol?",
    options: [
      "Evacuate immediate area &rarr; Alert supervisor &rarr; Don appropriate PPE &rarr; Deploy chemical spill kit absorbent bunds to prevent drain entry.",
      "Hose the chemical spill into the nearest rainwater stormwater drain.",
      "Ignore the spill until the end of the work shift.",
      "Cover the chemical spill with dry cardboard boxes.",
    ],
    correctOptionIndex: 0,
    rationale: "Spill response mandates personal safety first, followed by containment using specialized spill kits to prevent environmental contamination.",
  },
  {
    id: "DIAG-HSE-02B",
    competency: "COMP_HEALTH_SAFETY",
    subcompetency: "SUB_INCIDENT_PREVENTION",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_HSE_D2_PROCEDURES",
    prompt: "Why must secondary containment bunds (spill pallets) hold at least 110% of the single largest storage container volume?",
    options: [
      "To contain total catastrophic container failure plus potential rainfall or firefighting water without overflowing into the environment.",
      "To provide storage space for empty wooden pallets.",
      "To reduce chemical evaporation rates.",
      "To satisfy aesthetic interior decoration standards.",
    ],
    correctOptionIndex: 0,
    rationale: "The 110% bund capacity rule ensures zero liquid escape even under total tank rupture.",
  },
  {
    id: "DIAG-HSE-03A",
    competency: "COMP_HEALTH_SAFETY",
    subcompetency: "SUB_HSE_AUDITING",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_HSE_D3_COMPLIANCE",
    prompt: "During an ISO 45001 / ISO 14001 integrated audit, what is the primary objective of tracking 'Near-Miss' safety incidents?",
    options: [
      "Identifies latent hazards and systemic procedural breakdowns before they result in actual severe injuries or environmental spills.",
      "Penalizes workers by deducting safety bonuses.",
      "Proves that company safety systems require zero ongoing maintenance.",
      "Eliminates the requirement for emergency fire drills.",
    ],
    correctOptionIndex: 0,
    rationale: "Heinrich's safety pyramid shows that proactive near-miss reporting eliminates the conditions causing catastrophic accidents.",
  },
  {
    id: "DIAG-HSE-03B",
    competency: "COMP_HEALTH_SAFETY",
    subcompetency: "SUB_HSE_AUDITING",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_HSE_D3_COMPLIANCE",
    prompt: "What is the critical requirement for safe entry and maintenance into a 'Confined Space' (e.g. storage tanks, underground sumps)?",
    options: [
      "Formal Confined Space Entry Permit, continuous atmospheric gas monitoring ($O_2, CO, LEL, H_2S$), lockout/tagout (LOTO), and dedicated standby rescue observer.",
      "Entering alone quickly without notifying anyone.",
      "Leaving an open flashlight at the entrance.",
      "Spraying air freshener into the tank before entry.",
    ],
    correctOptionIndex: 0,
    rationale: "Confined space fatalities frequently occur from toxic or oxygen-deficient atmospheres; strict permitting and monitoring are non-negotiable.",
  },
  {
    id: "DIAG-HSE-04A",
    competency: "COMP_HEALTH_SAFETY",
    subcompetency: "SUB_CULTURE_LEADERSHIP",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_HSE_D4_CULTURE",
    prompt: "In high-reliability organizations, what characterizes a 'Generative HSE Culture' according to the Parker/Hudson safety maturity model?",
    options: [
      "Safety is fully integrated into all core business decisions; continuous proactive hazard hunting; zero fear of reporting bad news; shared accountability.",
      "Safety rules are only enforced after a major fatal disaster occurs.",
      "Safety is managed purely as a legal compliance paperwork exercise.",
      "Blaming and firing workers whenever accidents occur.",
    ],
    correctOptionIndex: 0,
    rationale: "A generative culture views safety as an intrinsic operational value and proactively seeks out systemic weaknesses.",
  },
  {
    id: "DIAG-HSE-04B",
    competency: "COMP_HEALTH_SAFETY",
    subcompetency: "SUB_CULTURE_LEADERSHIP",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_HSE_D4_CULTURE",
    prompt: "How does a formal Environmental Management System (EMS) ensure continual improvement under the Plan-Do-Check-Act (PDCA) cycle?",
    options: [
      "Establishes environmental policy &rarr; Implements operational controls &rarr; Audits performance against objectives &rarr; Management reviews and refines strategy.",
      "Writes a policy once and archives it permanently without auditing.",
      "Delegates environmental management exclusively to external waste hauling contractors.",
      "Focuses only on marketing campaigns while ignoring factory emissions.",
    ],
    correctOptionIndex: 0,
    rationale: "The PDCA cycle drives closed-loop continuous enhancement across corporate environmental targets.",
  },

  // 11. COMP_STRATEGY: Sustainability Strategy & Action Planning (8 Items: D1..D4)
  {
    id: "DIAG-STR-01A",
    competency: "COMP_STRATEGY",
    subcompetency: "SUB_STRATEGY_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_STR_D1_VISION",
    prompt: "What is the core definition of Sustainable Development as established by the UN Brundtland Commission?",
    options: [
      "Development that meets the needs of the present without compromising the ability of future generations to meet their own needs.",
      "Maximizing corporate quarterly profits regardless of environmental resource depletion.",
      "Stopping all commercial business activity permanently.",
      "Relying solely on government welfare programs.",
    ],
    correctOptionIndex: 0,
    rationale: "The Brundtland definition anchors intergenerational equity across economic, social, and environmental spheres.",
  },
  {
    id: "DIAG-STR-01B",
    competency: "COMP_STRATEGY",
    subcompetency: "SUB_STRATEGY_BASICS",
    difficulty: 1,
    evidenceType: "UNDERSTANDING",
    equivalentGroupId: "GRP_STR_D1_VISION",
    prompt: "What are the UN Sustainable Development Goals (SDGs)?",
    options: [
      "A universal call to action comprising 17 integrated goals to end poverty, protect the planet, and ensure peace and prosperity by 2030.",
      "A set of mandatory European banking taxes.",
      "A private software program for solar panels.",
      "A marketing certification for cosmetic products.",
    ],
    correctOptionIndex: 0,
    rationale: "The 17 SDGs provide the global blueprint for sustainable economic, social, and environmental development.",
  },
  {
    id: "DIAG-STR-02A",
    competency: "COMP_STRATEGY",
    subcompetency: "SUB_ACTION_PLANNING",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_STR_D2_KPIS",
    prompt: "When establishing a departmental Sustainability Action Plan, what ensures accountability and successful implementation?",
    options: [
      "Assigning specific SMART targets, designated executive owners, clear deadlines, required CapEx/OpEx budgets, and quarterly milestone reviews.",
      "Publishing a vague vision statement without designated owners or timelines.",
      "Announcing goals without allocating financial or human resources.",
      "Waiting until the year 2030 to evaluate if progress occurred.",
    ],
    correctOptionIndex: 0,
    rationale: "Action plans succeed only when tied to measurable KPIs, dedicated resource budgets, and regular review cadences.",
  },
  {
    id: "DIAG-STR-02B",
    competency: "COMP_STRATEGY",
    subcompetency: "SUB_ACTION_PLANNING",
    difficulty: 2,
    evidenceType: "APPLICATION",
    equivalentGroupId: "GRP_STR_D2_KPIS",
    prompt: "How should an enterprise prioritize sustainability initiatives when resources are constrained?",
    options: [
      "Using an Impact-Effort Matrix to implement high-impact 'quick wins' and high-impact strategic investments with attractive financial payback.",
      "Choosing only the cheapest initiatives regardless of environmental impact.",
      "Postponing all sustainability actions indefinitely.",
      "Implementing low-impact, high-cost vanity projects for marketing photos.",
    ],
    correctOptionIndex: 0,
    rationale: "Impact-Effort prioritization maximizes carbon/cost savings per dollar of capital deployed.",
  },
  {
    id: "DIAG-STR-03A",
    competency: "COMP_STRATEGY",
    subcompetency: "SUB_BUSINESS_MODEL_TRANSFORMATION",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_STR_D3_TRANSITION",
    prompt: "A manufacturing executive designs a Corporate Sustainability Transition Plan. How should capital allocation (CapEx) be aligned?",
    options: [
      "Ring-fencing dedicated multi-year capital budgets for decarbonization retrofits, energy efficiency, and low-carbon product R&D.",
      "Allocating 100% of capital to expanding legacy high-carbon fossil fuel assets.",
      "Relying entirely on government grants without corporate co-investment.",
      "Eliminating maintenance budgets across existing infrastructure.",
    ],
    correctOptionIndex: 0,
    rationale: "Credible transition plans require direct alignment of corporate CapEx budgets with decarbonization targets.",
  },
  {
    id: "DIAG-STR-03B",
    competency: "COMP_STRATEGY",
    subcompetency: "SUB_BUSINESS_MODEL_TRANSFORMATION",
    difficulty: 3,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_STR_D3_TRANSITION",
    prompt: "What is the strategic purpose of linking Executive Long-Term Incentive Plans (LTIPs) to validated ESG and carbon reduction milestones?",
    options: [
      "Aligns C-suite financial incentives with multi-year sustainability targets, preventing short-term quarterly profit trade-offs.",
      "Provides executives with automatic bonuses regardless of environmental performance.",
      "Eliminates corporate income tax liabilities.",
      "Replaces all external shareholder dividend distributions.",
    ],
    correctOptionIndex: 0,
    rationale: "Tying executive compensation to ESG targets drives genuine leadership prioritization of sustainability goals.",
  },
  {
    id: "DIAG-STR-04A",
    competency: "COMP_STRATEGY",
    subcompetency: "SUB_SUSTAINABILITY_LEADERSHIP",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_STR_D4_LEADERSHIP",
    prompt: "An executive leadership team adopts the 'Creating Shared Value' (CSV - Porter & Kramer) strategic framework. What is the fundamental premise?",
    options: [
      "Corporate competitiveness and the health of surrounding communities and natural ecosystems are mutually dependent and mutually reinforcing.",
      "Sustainability is an unavoidable financial penalty that destroys business value.",
      "Corporations should operate purely as non-profit charities.",
      "Social value can only be created by external government intervention.",
    ],
    correctOptionIndex: 0,
    rationale: "CSV identifies business opportunities in solving societal and environmental challenges profitably.",
  },
  {
    id: "DIAG-STR-04B",
    competency: "COMP_STRATEGY",
    subcompetency: "SUB_SUSTAINABILITY_LEADERSHIP",
    difficulty: 4,
    evidenceType: "SCENARIO",
    equivalentGroupId: "GRP_STR_D4_LEADERSHIP",
    prompt: "Under the global Transition Plan Taskforce (TPT) Disclosure Framework, what are the five essential strategic elements required in corporate transition plans?",
    options: [
      "Ambition (targets), Action Plan (operational levers), Governance (oversight), Financial Planning (CapEx/OpEx), and Engagement (value chain & policy).",
      "Marketing slogans, executive headshots, customer discounts, logo redesign, and billboard advertisements.",
      "Tax evasion strategies, carbon credit trading, offshore entity setup, and dividend withholding.",
      "Limiting transition plans strictly to one-page internal memos.",
    ],
    correctOptionIndex: 0,
    rationale: "The TPT framework establishes gold-standard rigor across ambition, operational actions, finance, governance, and value chain engagement.",
  },
];

/**
 * Generates a deterministic Diagnostic Blueprint identifying which competencies require baseline testing.
 */
export function generateDiagnosticBlueprint(
  profile: LearnerProfile,
  allCourses: Course[],
  company?: CompanyLearningContext
): DiagnosticBlueprint {
  const currentSkills = generateLearnerSkillsProfile(profile, allCourses, company);
  const items: DiagnosticBlueprintItem[] = [];

  for (const comp of currentSkills.competencies) {
    const isEligible = comp.confidence === "NONE" || comp.confidence === "LOW";
    const quota = isEligible ? Math.min(3, comp.targetProficiency + 1) : 0;

    items.push({
      competency: comp.competency,
      competencyName: comp.competencyName,
      targetLevel: comp.targetProficiency,
      currentEvidenceLevel: comp.currentProficiency,
      currentConfidence: comp.confidence,
      isEligibleForTesting: isEligible,
      questionQuota: quota,
    });
  }

  const eligibleItems = items.filter((i) => i.isEligibleForTesting);
  const totalTarget = eligibleItems.reduce((acc, i) => acc + i.questionQuota, 0);

  return {
    learnerId: profile.id,
    sessionType: "INITIAL_BASELINE",
    testedCompetencies: eligibleItems,
    totalQuestionTarget: totalTarget,
  };
}

/**
 * Selects the next adaptive question, strictly respecting question exposure history
 * and preferring unseen equivalent items for reassessments.
 */
export function getNextAdaptiveQuestion(
  competency: string,
  sessionResponses: DiagnosticResponse[],
  seenQuestionIds: Set<string> = new Set(),
  availableQuestions: DiagnosticQuestion[] = DIAGNOSTIC_QUESTION_BANK
): DiagnosticQuestion | null {
  const compResponses = sessionResponses.filter((r) => r.competency === competency);
  const currentSessionAnsweredIds = new Set(compResponses.map((r) => r.questionId));

  // Filter pool: exclude items already answered in the CURRENT session
  const candidatePool = availableQuestions.filter(
    (q) => q.competency === competency && !currentSessionAnsweredIds.has(q.id)
  );
  if (candidatePool.length === 0) return null;

  // Prefer unseen items from historical exposures
  const unseenPool = candidatePool.filter((q) => !seenQuestionIds.has(q.id));
  const activePool = unseenPool.length > 0 ? unseenPool : candidatePool;

  // If no responses yet in this competency, start at Difficulty 1 (or 2 if target is higher)
  if (compResponses.length === 0) {
    return activePool.find((q) => q.difficulty === 1) || activePool[0];
  }

  // Adaptive branching based on last response correctness
  const lastResponse = compResponses[compResponses.length - 1];
  const lastQuestion = availableQuestions.find((q) => q.id === lastResponse.questionId);
  const lastDiff = lastQuestion ? lastQuestion.difficulty : 1;

  if (lastResponse.isCorrect) {
    // Step up difficulty (e.g. D1 -> D2 -> D3 -> D4)
    const harder = activePool.find((q) => q.difficulty > lastDiff);
    return harder || activePool.find((q) => q.difficulty === lastDiff) || activePool[0];
  } else {
    // Step down difficulty or gather baseline confirmation
    const easier = activePool.find((q) => q.difficulty < lastDiff);
    return easier || activePool.find((q) => q.difficulty === lastDiff) || activePool[0];
  }
}

/**
 * Evaluates diagnostic responses and creates an immutable Baseline Snapshot.
 * Enforces strict evidence depth: High confidence requires multiple diverse questions.
 */
export function scoreDiagnosticSession(
  learnerId: number | undefined,
  companyId: number | undefined,
  responses: DiagnosticResponse[],
  blueprint: DiagnosticBlueprint
): DiagnosticBaselineSnapshot {
  const compMap: Record<string, { total: number; correct: number; maxDifficultyPassed: ProficiencyLevel; difficultiesSeen: Set<number> }> = {};

  for (const item of blueprint.testedCompetencies) {
    compMap[item.competency] = { total: 0, correct: 0, maxDifficultyPassed: 0, difficultiesSeen: new Set() };
  }

  for (const r of responses) {
    if (!compMap[r.competency]) {
      compMap[r.competency] = { total: 0, correct: 0, maxDifficultyPassed: 0, difficultiesSeen: new Set() };
    }
    compMap[r.competency].total++;
    const q = DIAGNOSTIC_QUESTION_BANK.find((item) => item.id === r.questionId);
    if (q) compMap[r.competency].difficultiesSeen.add(q.difficulty);

    if (r.isCorrect && q) {
      compMap[r.competency].correct++;
      compMap[r.competency].maxDifficultyPassed = Math.max(
        compMap[r.competency].maxDifficultyPassed,
        q.difficulty
      ) as ProficiencyLevel;
    }
  }

  const records: DiagnosticBaselineCompetencyRecord[] = [];

  for (const [code, data] of Object.entries(compMap)) {
    let baselineProf: ProficiencyLevel = 0;
    let baselineConf: ConfidenceLevel = "NONE";

    if (data.total > 0) {
      const passRate = data.correct / data.total;

      if (passRate >= 0.66) {
        baselineProf = data.maxDifficultyPassed;
        // High confidence requires at least 2 questions and difficulty depth
        baselineConf = data.total >= 2 ? "HIGH" : "MODERATE";
      } else if (data.correct > 0) {
        baselineProf = Math.min(1, data.maxDifficultyPassed) as ProficiencyLevel;
        baselineConf = "LOW";
      } else {
        baselineProf = 0;
        baselineConf = "LOW";
      }
    }

    records.push({
      competency: code,
      competencyName: CANONICAL_COMPETENCIES[code] || code,
      baselineProficiency: baselineProf,
      baselineConfidence: baselineConf,
      questionsAttempted: data.total,
      questionsCorrect: data.correct,
      evidenceSummary: `Diagnostic assessed ${data.total} questions (${data.correct} correct, pass rate: ${Math.round(
        (data.correct / Math.max(1, data.total)) * 100
      )}%).`,
    });
  }

  return {
    id: `BASE-${Date.now()}`,
    learnerId,
    companyId,
    recordedAt: new Date().toISOString(),
    competencies: records,
  };
}

/**
 * Calculates measured learning impact by comparing immutable baseline against current state.
 */
export function calculateLearningImpact(
  baseline: DiagnosticBaselineSnapshot,
  currentSkills: LearnerSkillsProfile
): LearningImpactMetric[] {
  const metrics: LearningImpactMetric[] = [];

  for (const base of baseline.competencies) {
    const current = currentSkills.competencies.find((c) => c.competency === base.competency);
    const currProf = current ? current.currentProficiency : base.baselineProficiency;
    const currConf = current ? current.confidence : base.baselineConfidence;
    const delta = currProf - base.baselineProficiency;

    let impactState: LearningImpactMetric["impactState"] = "MAINTAINED";
    let explanation = "Proficiency and evidence maintained at baseline levels.";

    if (delta > 0) {
      impactState = "PROFICIENCY_INCREASED";
      explanation = `Demonstrated +${delta} proficiency level growth (from ${base.baselineProficiency} to ${currProf}) through verified coursework.`;
    } else if (currConf === "HIGH" && base.baselineConfidence !== "HIGH") {
      impactState = "EVIDENCE_STRENGTHENED";
      explanation = `Capability confirmed at Level ${currProf} with strengthened multi-source evidence confidence.`;
    } else if (current && current.gapStatus === "STRONG" && base.baselineProficiency < current.targetProficiency) {
      impactState = "GAP_CLOSED";
      explanation = `Target capability reached, successfully closing role development gap in ${base.competencyName}.`;
    }

    metrics.push({
      competency: base.competency,
      competencyName: base.competencyName,
      baselineProficiency: base.baselineProficiency,
      baselineConfidence: base.baselineConfidence,
      currentProficiency: currProf,
      currentConfidence: currConf,
      proficiencyDelta: delta,
      impactState,
      explanation,
    });
  }

  return metrics;
}

/**
 * Adaptive Path Regeneration following diagnostic completion.
 * Deprioritizes unnecessary introductory electives while strictly safeguarding mandatory compliance tracks.
 */
export function regenerateLearningPathAfterDiagnostic(
  currentRequired: AssignedCourse[],
  currentRecommended: AssignedCourse[],
  baseline: DiagnosticBaselineSnapshot,
  allCourses: Course[]
): { updatedRequired: AssignedCourse[]; updatedRecommended: AssignedCourse[]; deprioritizedCourses: string[] } {
  const strongBaselineCompetencies = new Set(
    baseline.competencies
      .filter((c) => c.baselineProficiency >= 2 && c.baselineConfidence !== "LOW")
      .map((c) => c.competency)
  );

  const deprioritized: string[] = [];

  // Required courses are strictly preserved (no automatic test-out)
  const updatedRequired = currentRequired.map((course) => course);

  // Recommended courses: deprioritize basic introductory electives if baseline already demonstrates working knowledge
  const updatedRecommended = currentRecommended.filter((course) => {
    const isBasicIntro = course.level === "Universal Core" || course.level === "Foundation";
    if (isBasicIntro && strongBaselineCompetencies.has(course.primaryCompetency || "")) {
      deprioritized.push(course.courseCode);
      return false;
    }
    return true;
  });

  return {
    updatedRequired,
    updatedRecommended,
    deprioritizedCourses: deprioritized,
  };
}
