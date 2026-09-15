export interface Cohort15_2_10ICourseMeta {
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

export const SPRINT_15_2_10I_COHORT: Cohort15_2_10ICourseMeta[] = [
  {
    courseCode: "ELH-96",
    courseId: 758,
    title: "Data Center Energy Efficiency & Cooling",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs datacenter facility scenarios on hot/cold aisle containment, direct liquid cooling (DLC), econometric air/water economizers, UPS double-conversion vs eco-mode, and ASHRAE TC 9.9 thermal envelopes"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with datacenter engineering scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-97",
    courseId: 759,
    title: "Sustainable IT Hardware Lifecycle & E-Waste",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Missing optionFeedback arrays (0/8 completed)",
      "Needs enterprise IT asset disposition (ITAD) scenarios on NIST SP 800-88 sanitization, R2v3 / e-Stewards recycling certifications, circular device refresh cycles, and WEEE compliance"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Upgrade from v1 to v2, author 8 scored questions with IT hardware lifecycle and e-waste scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-98",
    courseId: 760,
    title: "Green Office Systems for Professional Services",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Missing optionFeedback arrays (0/8 completed)",
      "Needs commercial office operations scenarios on smart plug load automation, circadian lighting controls, digital document workflows, sustainable procurement, and commuting trip reduction"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Upgrade from v1 to v2, author 8 scored questions with green office systems scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-99",
    courseId: 765,
    title: "Hospital & Clinic Medical Waste Segregation",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Missing optionFeedback arrays (0/8 completed)",
      "Needs healthcare clinical waste scenarios on color-coded waste streams (biohazard yellow, sharps, cytotoxic purple, general black), autoclaving vs incineration, and preventing non-infectious waste misclassification"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Upgrade from v1 to v2, author 8 scored questions with clinical waste segregation scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-100",
    courseId: 766,
    title: "Energy & Water Conservation in Healthcare Facilities",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs hospital facilities engineering scenarios on steam boiler condensate recovery, sterile processing water recycling, surgical suite setback airflow controls, and medical vacuum system optimization"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with healthcare facility energy/water conservation scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-101",
    courseId: 767,
    title: "Sustainable Healthcare Procurement & Single-Use Reductions",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs hospital procurement scenarios on reusable surgical textiles, single-use device (SUD) regulated reprocessing, PVC-free and DEHP-free IV tubing, and medical device circular takeback"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with sustainable medical procurement scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-102",
    courseId: 784,
    title: "Anesthetic Gas & Pharmaceutical Waste Management",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs operating room clinical scenarios on desflurane vs sevoflurane global warming potential (GWP), low-flow anesthesia practices, volatile anesthetic capture/destruction systems, and reverse distributor pharmaceutical disposal"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with anesthetic gas capture and pharmaceutical waste scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-103",
    courseId: 785,
    title: "Healthcare Indoor Air Quality & Infection Ventilation",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs clinical HVAC engineering scenarios on Airborne Infection Isolation Rooms (AIIR) negative pressure, Protective Environment (PE) positive pressure, HEPA filtration velocity, and ASHRAE Standard 170 compliance"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with hospital IAQ and infection control ventilation scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-104",
    courseId: 786,
    title: "Climate Resilience & Disaster Preparedness for Hospitals",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs hospital emergency preparedness scenarios on elevating critical infrastructure above 500-year flood levels, on-site microgrids with combined heat and power (CHP), 96-hour emergency potable water storage, and HVAC surge capacity during extreme heat"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with hospital climate resilience and disaster readiness scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-105",
    courseId: 787,
    title: "Sustainable Hotel Kitchen Energy & Equipment",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Missing optionFeedback arrays (0/8 completed)",
      "Needs commercial kitchen hospitality scenarios on demand-controlled kitchen ventilation (DCKV), commercial induction cooktops, ENERGY STAR commercial dishwashers and fryers, and heat recovery from walk-in refrigeration"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Upgrade from v1 to v2, author 8 scored questions with commercial hotel kitchen energy scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-106",
    courseId: 788,
    title: "Low-Impact Coastal Resort Landscaping & Native Flora",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Missing optionFeedback arrays (0/8 completed)",
      "Needs coastal resort landscape scenarios on xeriscaping with indigenous halophytes, greywater and RO brine management, coastal dune stabilization, eliminating chemical runoff into reef lagoons, and turtle-friendly low-kelvin lighting"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Upgrade from v1 to v2, author 8 scored questions with sustainable coastal resort landscaping scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-107",
    courseId: 789,
    title: "Net-Zero Energy Building Design & Passive Architecture",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs architectural engineering scenarios on window-to-wall ratios (WWR), thermal bridge mitigation, Passivhaus airtightness (0.6 ACH50), solar heat gain coefficients (SHGC), and Energy Use Intensity (EUI) benchmarking"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with net-zero passive building design scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  }
];

export const SPRINT_15_2_10I_COHORT_COURSE_IDS = SPRINT_15_2_10I_COHORT.map(c => c.courseId);
export const SPRINT_15_2_10I_COHORT_COURSE_CODES = SPRINT_15_2_10I_COHORT.map(c => c.courseCode);
