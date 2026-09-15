/**
 * Course Assessment Cohort 15.2.10D Definition & Metadata
 * 
 * Scope: 12 Canonical Courses (ELH-36 through ELH-47) covering Technical Operations,
 * Kitchens, Food Waste, Laundry, HVAC & Central Plant, Guest Engagement,
 * Banqueting, Spa & Wellness, Smart Guest Rooms, Plastic Elimination, Sourcing,
 * Marine Biodiversity, and Green Leases.
 */

export interface CohortCourseMetadata15_2_10D {
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
  qualityClassification: "DEFICIENT_FEEDBACK" | "UNSTANDARDIZED_THRESHOLD" | "BOILERPLATE_OPTIONS" | "ENTERPRISE_READY";
  proposedRemediation: string;
}

export const SPRINT_15_2_10D_COHORT: CohortCourseMetadata15_2_10D[] = [
  {
    courseCode: "ELH-36",
    courseId: 808,
    title: "Sustainable Commercial Kitchens & Culinary",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["All questions default to correct_option index 1", "Passing score non-standard at 75%", "Needs deeper culinary operations scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with distributed correct answers, comprehensive 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-37",
    courseId: 809,
    title: "Hotel Food Waste Prevention & Composting",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 80,
    expectedPassingScore: 80,
    identifiedDefects: ["Missing 4-element option feedback", "Boilerplate distractors", "Needs practical composting and waste measurement scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with detailed 4-element option feedback, Bloom level application/analysis, and advance course version to 2."
  },
  {
    courseCode: "ELH-38",
    courseId: 724,
    title: "Hotel Laundry & Water Stewardship",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: ["Missing 4-element option feedback", "Passing score at 70%", "Needs commercial laundry water recycling and chemical dosing scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with high-fidelity operational scenarios, complete 4-element option feedback, standardize passing score to 80%, and advance version to 2."
  },
  {
    courseCode: "ELH-39",
    courseId: 810,
    title: "Hotel Engineering: Central Plant & HVAC Optimization",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["All questions default to correct_option index 1", "Passing score non-standard at 75%", "Needs chiller plant delta-T and VAV control scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with varied answer distributions, chiller/HVAC engineering scenarios, complete 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-40",
    courseId: 725,
    title: "Resort Guest Engagement & Green Nudges",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: ["Missing 4-element option feedback", "Passing score at 70%", "Needs behavioral nudge and guest communication scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with behavioral choice architecture scenarios, 4-element feedback, standardize passing score to 80%, and advance version to 2."
  },
  {
    courseCode: "ELH-41",
    courseId: 726,
    title: "Sustainable Event & Banquet Management",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: ["Missing 4-element option feedback", "Passing score at 70%", "Needs ISO 20121 and zero-waste event planning scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with banquet portioning and sustainable decor scenarios, complete 4-element feedback, standardize passing score to 80%, and advance version to 2."
  },
  {
    courseCode: "ELH-42",
    courseId: 744,
    title: "Eco-Friendly Pool, Spa & Wellness Operations",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: ["Missing 4-element option feedback", "Generic boilerplate questions", "Passing score at 70%"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with pool filtration, water chemistry, and spa eco-linen scenarios, 4-element feedback, standardize passing score to 80%, and advance version to 2."
  },
  {
    courseCode: "ELH-43",
    courseId: 745,
    title: "Energy-Efficient Hotel Guest Rooms & Smart Controls",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["All questions default to correct_option index 1", "Passing score non-standard at 75%", "Needs smart EMS and setback algorithm scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with varied answer indexes, smart EMS/interlock scenarios, 4-element feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-44",
    courseId: 772,
    title: "Sustainable Single-Use Plastic Elimination in Resorts",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: ["Missing 4-element option feedback", "Generic boilerplate distractors", "Passing score at 70%"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with refillable dispenser logistics, glass bottling plant workflows, 4-element feedback, standardize passing score to 80%, and advance version to 2."
  },
  {
    courseCode: "ELH-45",
    courseId: 727,
    title: "Sustainable Hospitality Sourcing & Local Purchasing",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["All questions default to correct_option index 1", "Passing score non-standard at 75%", "Needs supplier audit and local farming contract scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with balanced answer distributions, sustainable seafood (MSC/ASC) and closed-loop packaging scenarios, 4-element feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-46",
    courseId: 746,
    title: "Eco-Tourism & Marine Biodiversity Protection",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: ["Missing 4-element option feedback", "Generic boilerplate questions", "Passing score at 70%"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with coral reef protection, water sports eco-briefings, wildlife viewing guidelines, 4-element feedback, standardize passing score to 80%, and advance version to 2."
  },
  {
    courseCode: "ELH-47",
    courseId: 811,
    title: "Green Leases & Tenant Sustainability Engagement",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["All questions default to correct_option index 1", "Passing score non-standard at 75%", "Needs split-incentive clause and fit-out governance scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with balanced answer keys, sub-metering data sharing, capital cost recovery clauses, 4-element feedback, and standardize passing score to 80%."
  }
];

export const SPRINT_15_2_10D_COHORT_COURSE_CODES = SPRINT_15_2_10D_COHORT.map(c => c.courseCode);
export const SPRINT_15_2_10D_COHORT_COURSE_IDS = SPRINT_15_2_10D_COHORT.map(c => c.courseId);
