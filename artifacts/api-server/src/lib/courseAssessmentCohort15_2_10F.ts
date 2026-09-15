export interface Cohort15_2_10FCourseMeta {
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

export const SPRINT_15_2_10F_COHORT: Cohort15_2_10FCourseMeta[] = [
  {
    courseCode: "ELH-60",
    courseId: 749,
    title: "Industrial Energy Audit & Motor Systems Optimization",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Questions default to correct_option index 1",
      "Needs IE3/IE4 premium efficiency motor replacement and VFD affinity law scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with industrial motor/VFD operational scenarios, 4-element option feedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-61",
    courseId: 731,
    title: "Lean Green Manufacturing: Waste Elimination",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Version 1 requires upgrade to version 2",
      "Missing complete 4-element option feedback",
      "Needs Value Stream Mapping (VSM) and Muda/environmental waste integration scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with lean-green manufacturing scenarios, comprehensive 4-element option feedback, advance version to 2, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-62",
    courseId: 716,
    title: "Industrial Chemical Management & GHS",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 80,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Questions lack balanced answer key distribution",
      "Needs chemical secondary containment, SDS pictograms, and spill escalation protocols"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with rigorous GHS hazardous chemical containment scenarios, complete 4-element option feedback, and balanced 2/2/2/2 answer keys."
  },
  {
    courseCode: "ELH-63",
    courseId: 732,
    title: "Sustainable Packaging Design in Manufacturing",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Questions default to correct_option index 1",
      "Needs mono-material recyclability and packaging volume/headspace reduction scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with sustainable packaging engineering scenarios, complete 4-element option feedback, balanced keys, and 80% passing score."
  },
  {
    courseCode: "ELH-64",
    courseId: 750,
    title: "Circular Raw Material Substitution in Industry",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Questions default to correct_option index 1",
      "Needs post-consumer recycled (PCR) resin qualification and industrial byproduct symbiosis scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with circular material substitution trade-off scenarios, complete 4-element option feedback, balanced keys, and 80% passing score."
  },
  {
    courseCode: "ELH-65",
    courseId: 775,
    title: "Industrial Air Quality, VOC Controls & Scrubbers",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Questions default to correct_option index 1",
      "Needs Regenerative Thermal Oxidizer (RTO), carbon adsorption, and wet scrubber operational scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with industrial emission control and scrubber safety scenarios, complete 4-element option feedback, balanced keys, and 80% passing score."
  },
  {
    courseCode: "ELH-66",
    courseId: 776,
    title: "Sustainable Supply Chain Traceability in Manufacturing",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Questions default to correct_option index 1",
      "Needs Chain of Custody (CoC), Tier-2 supplier auditing, and Scope 3 supplier primary data collection scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with supply chain traceability verification scenarios, complete 4-element option feedback, balanced keys, and 80% passing score."
  },
  {
    courseCode: "ELH-67",
    courseId: 733,
    title: "Supermarket Cold Chain & Refrigeration Efficiency",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Questions default to correct_option index 1",
      "Needs display case glass doors, floating head pressure, and transcritical CO2 (R-744) safety scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with retail commercial refrigeration efficiency and natural refrigerant scenarios, complete 4-element option feedback, balanced keys, and 80% passing score."
  },
  {
    courseCode: "ELH-68",
    courseId: 734,
    title: "Retail Food Waste & Dynamic Markdown Management",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Version 1 requires upgrade to version 2",
      "Missing complete 4-element option feedback",
      "Needs dynamic markdown algorithm, cold-chain food donation, and bakery waste diversion scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with retail perishable markdown and food rescue safety scenarios, advance version to 2, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-69",
    courseId: 751,
    title: "Sustainable Retail Store Lighting & HVAC Design",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Questions default to correct_option index 1",
      "Needs retail Lighting Power Density (LPD), vestibule air curtains, and DCV occupancy sensing scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with retail building services efficiency scenarios, complete 4-element option feedback, balanced keys, and 80% passing score."
  },
  {
    courseCode: "ELH-70",
    courseId: 752,
    title: "Sustainable Retail Sourcing & Supplier ESG Code",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Questions default to correct_option index 1",
      "Needs private-label ESG supplier scorecards, Fair Trade auditing, and corrective action plan (CAP) enforcement scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with retail supplier ESG auditing and compliance scenarios, complete 4-element option feedback, balanced keys, and 80% passing score."
  },
  {
    courseCode: "ELH-71",
    courseId: 735,
    title: "Eliminating Single-Use Plastics in Retail",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Version 1 requires upgrade to version 2",
      "Missing complete 4-element option feedback",
      "Needs checkout bag phaseouts, loose produce reusables, and customer nudge scenarios"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with retail plastic phaseout operational scenarios, complete 4-element option feedback, advance version to 2, and standardize passing score to 80%."
  }
];

export const SPRINT_15_2_10F_COHORT_COURSE_CODES = SPRINT_15_2_10F_COHORT.map(c => c.courseCode);
export const SPRINT_15_2_10F_COHORT_COURSE_IDS = SPRINT_15_2_10F_COHORT.map(c => c.courseId);
