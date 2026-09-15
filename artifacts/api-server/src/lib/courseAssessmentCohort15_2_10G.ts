export interface Cohort15_2_10GCourseMeta {
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

export const SPRINT_15_2_10G_COHORT: Cohort15_2_10GCourseMeta[] = [
  {
    courseCode: "ELH-72",
    courseId: 753,
    title: "Green eCommerce, Last-Mile Delivery & Packaging",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Missing optionFeedback arrays (0/8 completed)",
      "Needs substantive workplace scenarios on right-sized packaging, route consolidation, electric last-mile delivery, and reverse logistics"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Upgrade from v1 to v2, author 8 scored questions with e-commerce logistics scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-73",
    courseId: 777,
    title: "Sustainable Quick-Service Restaurant (QSR) Operations",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Missing optionFeedback arrays (0/8 completed)",
      "Needs QSR workplace scenarios on fry oil recycling, kitchen demand-controlled ventilation, smart holding cabinets, composting, and packaging elimination"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Upgrade from v1 to v2, author 8 scored questions with QSR commercial kitchen scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-74",
    courseId: 778,
    title: "Circular Textiles & Sustainable Fashion Retailing",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Severely skewed answer key distribution [2, 6, 0, 0]",
      "Needs textile lifecycle scenarios on mono-material design, garment take-back, chemical dyeing effluent, and fiber-to-fiber recycling"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with textile circularity scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-75",
    courseId: 736,
    title: "Sustainable Lending & Green Credit Underwriting",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 1 answer keys [0, 8, 0, 0]",
      "Needs green banking scenarios on LMA Green Loan Principles, transition covenants, energy efficiency capex margin step-downs, and green asset ratio (GAR)"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with credit underwriting scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-76",
    courseId: 737,
    title: "ESG Risk Integration in Commercial Credit",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 1 answer keys [0, 8, 0, 0]",
      "Needs commercial credit scenarios on physical vs transition risk stress testing, Equator Principles, sector-specific ESG risk matrices, and default probability impact"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with commercial credit risk scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-77",
    courseId: 754,
    title: "TCFD & Climate Financial Risk Disclosures",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Severely skewed answer key distribution [1, 7, 0, 0]",
      "Needs TCFD/IFRS S2 scenarios covering Governance, Strategy, Risk Management, and Metrics & Targets (Scope 1/2/3 financed emissions, 1.5C/2C scenario analysis)"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with TCFD disclosure scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-78",
    courseId: 755,
    title: "Carbon Markets, Offsets & Credit Verification",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 1 answer keys [0, 8, 0, 0]",
      "Needs voluntary and compliance carbon market scenarios on additionality, permanence, MRV, Verra/Gold Standard registry retirement, and avoiding double counting (Article 6)"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with carbon offset verification scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-79",
    courseId: 738,
    title: "Anti-Greenwashing in Financial Products",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "Severely skewed answer key distribution [1, 6, 0, 1]",
      "Needs financial compliance scenarios on SFDR Article 8/9 classification, naming rules, substantiation of sustainability claims, and regulatory enforcement cases"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with anti-greenwashing fund compliance scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-80",
    courseId: 756,
    title: "Sustainable Wealth Management & ESG Advisory",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs wealth advisory scenarios on client ESG preference profiling (MiFID II ESG suitability), negative screening vs positive tilt vs impact investing, and fiduciary duty"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with wealth management client advisory scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-81",
    courseId: 757,
    title: "Green Freight & Multimodal Cargo Optimization",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs freight logistics scenarios on modal shifting (road to rail/sea), GLEC framework emissions calculation, load factor optimization, and aerodynamic/intermodal equipment"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with green freight and multimodal logistics scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-82",
    courseId: 779,
    title: "Maritime Port & Shipping Sustainability Practices",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs port and shipping scenarios on cold ironing (onshore power supply - OPS), IMO CII/EEXI ratings, hull biofouling management, low-carbon marine fuels (methanol/LNG), and ballast water management"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with maritime shipping and port sustainability scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-83",
    courseId: 717,
    title: "Eco-Driving & Fleet Fuel Efficiency",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 80,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Version 1 requires upgrade to v2 upon comprehensive instructional remediation",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs commercial fleet eco-driving scenarios on telematics RPM/idling alerts, tire pressure rolling resistance, regenerative braking, route planning, and driver coaching"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Upgrade from v1 to v2, author 8 scored questions with commercial fleet eco-driving scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  }
];

export const SPRINT_15_2_10G_COHORT_COURSE_IDS = SPRINT_15_2_10G_COHORT.map(c => c.courseId);
export const SPRINT_15_2_10G_COHORT_COURSE_CODES = SPRINT_15_2_10G_COHORT.map(c => c.courseCode);
