export interface Cohort15_2_10JCourseMeta {
  courseCode: string;
  courseId: number;
  title: string;
  currentVersion: number;
  expectedVersion: number;
  currentQuestionCount: number;
  expectedQuestionCount: number;
  currentPassingScore: number;
  expectedPassingScore: number;
  identifiedDefects: string[];
  historicalEnrollments: number;
  historicalAttempts: number;
  qualityClassification: "DEFICIENT_FEEDBACK" | "UNSTANDARDIZED_THRESHOLD" | "ENTERPRISE_READY";
  proposedRemediation: string;
}

export const SPRINT_15_2_10J_COHORT: Cohort15_2_10JCourseMeta[] = [
  {
    courseCode: "ELH-108",
    courseId: 790,
    title: "Renewable Energy: Rooftop Solar PV & Storage",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs authentic technical scenarios on solar PV clipping, BESS peak shaving, C-rate, DOD, rapid shutdown (NEC 690.12), inverter power factor, and net-metering interconnection"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with rooftop solar and storage engineering scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-109",
    courseId: 791,
    title: "Industrial Heat Recovery & Combined Heat and Power",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs authentic industrial thermal scenarios on economizers, heat-to-power Organic Rankine Cycles (ORC), pinch analysis, heat recovery steam generators (HRSG), reciprocating CHP spark-spread, and flue-gas condensing"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with industrial thermal engineering and CHP scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-110",
    courseId: 792,
    title: "Closed-Loop Water Recycling in Commercial Real Estate",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs commercial water engineering scenarios on membrane bioreactors (MBR), dual-pipe purple plumbing, cooling tower cycles of concentration (CoC), rainwater harvesting first-flush divergence, and Legionella disinfection"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with closed-loop commercial water recycling scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-111",
    courseId: 793,
    title: "Zero Waste to Landfill Certification in Manufacturing",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs manufacturing zero-waste scenarios on TRUE / UL 2799 certification standards, 90%+ diversion thresholds, thermal waste-to-energy limits, closed-loop foundry/swarf reclamation, mass-balance waste audits, and chain-of-custody documentation"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with manufacturing zero-waste certification scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-112",
    courseId: 794,
    title: "Green Cold Chain Logistics & Refrigerated Transport",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs cold chain engineering scenarios on natural refrigerants (CO2 R-744, Propane R-290, Ammonia R-717), transport refrigeration units (TRUs) electric shore power, phase-change materials (PCM), telematics temperature tracking, and cryogenic transport"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with cold chain logistics and low-GWP refrigeration scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-113",
    courseId: 795,
    title: "Sustainable Packaging Procurement for Logistics",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs packaging procurement scenarios on void-fill volume reduction, FSC-certified corrugate, post-consumer recycled (PCR) resin content, mono-material PE/PP design for recyclability, reusable dunnage/totes, and ISTA 3A transit testing"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with sustainable packaging and logistics procurement scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-114",
    courseId: 796,
    title: "ESG Data Assurance & Audit Readiness",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs ESG assurance scenarios on ISAE 3000 / ISSA 5000, limited vs reasonable assurance, internal controls over sustainability reporting (ICSR), GHG protocol boundary reconciliation, audit trails, and materiality threshold testing"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with ESG data assurance and audit readiness scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-115",
    courseId: 797,
    title: "Biodiversity Impact Assessment (BIA) for Projects",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs ecological impact assessment scenarios on mitigation hierarchy (Avoid, Minimize, Restore, Offset), Biodiversity Net Gain (BNG) metrics, TNFD LEAP framework, eDNA sampling, IUCN Red List species buffer zones, and ecological corridors"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with biodiversity impact assessment and BNG scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-116",
    courseId: 798,
    title: "Circular Economy Business Models & Product-as-a-Service",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs circular business model scenarios on Product-as-a-Service (PaaS) contract structuring, reverse logistics optimization, remanufacturing vs refurbishment vs recycling hierarchies, residual value management, and digital product passports (DPP)"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with circular business model and PaaS scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-117",
    courseId: 719,
    title: "Setting SMART Departmental Sustainability Targets",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs departmental target-setting scenarios on top-down vs bottom-up baselining, SBTi corporate target alignment, intensity vs absolute metrics, leading vs lagging KPIs, departmental accountability frameworks, and milestone scheduling"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with SMART target setting and SBTi alignment scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-118",
    courseId: 720,
    title: "Managing Sustainability Performance & KPIs",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs performance management scenarios on automated ESG dashboard data pipelines, root-cause variance analysis, corrective action plans (CAPA), quarterly management reviews, executive scorecard weighting, and verification protocols"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with KPI management, variance analysis, and governance scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-119",
    courseId: 768,
    title: "Engaging Frontline Employees in Green Initiatives",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs frontline employee engagement scenarios on Kaizen / Gemba green walks, idea capture & recognition schemes, gamified micro-learning nudges, Green Team charter facilitation, psychological safety, and shift-based sustainability handovers"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with frontline employee engagement and green workplace culture scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  }
];

export const SPRINT_15_2_10J_COHORT_COURSE_IDS = SPRINT_15_2_10J_COHORT.map(c => c.courseId);
export const SPRINT_15_2_10J_COHORT_COURSE_CODES = SPRINT_15_2_10J_COHORT.map(c => c.courseCode);
