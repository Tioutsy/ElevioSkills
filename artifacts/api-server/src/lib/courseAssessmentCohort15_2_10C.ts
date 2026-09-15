export interface CourseAssessmentCohort15_2_10CEntry {
  courseCode: string;
  courseId: number;
  title: string;
  currentVersion: number;
  currentQuestionCount: number;
  currentPassingScore: number;
  qualityClassification: "ENTERPRISE_READY" | "MINOR_POLISH" | "SUBSTANTIAL_REWORK";
  identifiedDefects: string[];
  historicalAttemptCount: number;
  historicalEnrollmentCount: number;
  proposedRemediation: string;
  expectedResultingVersion: number;
  targetQuestionCount: number;
  targetPassingScore: number;
}

export const SPRINT_15_2_10C_COHORT: CourseAssessmentCohort15_2_10CEntry[] = [
  {
    courseCode: "ELH-24",
    courseId: 945,
    title: "Sustainability for Human Resources Teams",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 75,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback for some distractor choices",
      "Lacks workplace scenario depth distinguishing competence vs awareness and engagement vs coercion",
      "Passing score at 75% requires standardization to 80%"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with realistic HR workplace scenarios (onboarding, appraisal, Green HR competencies), 4 distinct options, full 4-element optionFeedback, and standardize passing score to 80%.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-25",
    courseId: 946,
    title: "Sustainability for Finance & Accounting Teams",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 75,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Insufficient focus on TCO, CAPEX/OPEX distinctions, and financial audit trails",
      "Passing score at 75% requires standardization to 80%"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with realistic financial decisions (discounted cash flows, TCO, green CAPEX approval, ESG audit trails), 4 distinct options, full 4-element optionFeedback, and standardize passing score to 80%.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-26",
    courseId: 947,
    title: "Sustainability for Procurement and Purchasing Teams",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 75,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Needs explicit verification of ISO 20400 sustainable procurement principles and supplier claim audits",
      "Passing score at 75% requires standardization to 80%"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Preserve benchmark procurement questions while adding rigorous ISO 20400 scenarios, supplier verification criteria, 4 distinct options, full 4-element optionFeedback, and standardizing passing score to 80%.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-27",
    courseId: 949,
    title: "Sustainability for Facilities and Property Teams",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 75,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Needs realistic maintenance scenarios (HVAC, chiller optimization, leak escalation, contractor SLA)",
      "Passing score at 75% requires standardization to 80%"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with facility maintenance scenarios (chiller COP, preventative maintenance, smart sub-meters, contractor controls), 4 distinct options, full 4-element optionFeedback, and standardize passing score to 80%.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-28",
    courseId: 950,
    title: "Sustainability for Sales and Marketing Teams",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 75,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Requires deeper focus on ISO 14021 green claim verification, anti-greenwashing rules, and client tender questionnaires",
      "Passing score at 75% requires standardization to 80%"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with marketing/sales compliance scenarios (ISO 14021 environmental claims, RFP disclosures, greenwash prevention), 4 distinct options, full 4-element optionFeedback, and standardize passing score to 80%.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-29",
    courseId: 948,
    title: "Sustainability for Operations and Frontline Teams",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 75,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Needs accessible frontline workplace contexts (warehouses, retail, hospitality, operations) without specialist jargon",
      "Passing score at 75% requires standardization to 80%"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with accessible operational scenarios (spill containment, daily waste segregation, idling reduction, SOP compliance), 4 distinct options, full 4-element optionFeedback, and standardize passing score to 80%.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-30",
    courseId: 195,
    title: "Climate Risk & Workplace Resilience",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 75,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Needs clear distinction between physical vs transition risks and workplace emergency response protocols",
      "Passing score at 75% requires standardization to 80%"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with climate resilience and adaptation scenarios (flood protection, heat stress, business continuity, cyclone preparedness), 4 distinct options, full 4-element optionFeedback, and standardize passing score to 80%.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-31",
    courseId: 197,
    title: "Sustainable Tourism Foundations",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 80,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Needs deeper GSTC (Global Sustainable Tourism Council) alignment and local ecosystem stewardship scenarios"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with sustainable tourism hospitality decisions (community benefits, cultural heritage, coastal conservation, eco-certifications), 4 distinct options, and full 4-element optionFeedback.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-32",
    courseId: 212,
    title: "Energy Management for Frontline Hospitality Teams",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 80,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Needs frontline hotel department scenarios (kitchen exhaust, guestroom HVAC, laundry loads)"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with frontline hotel energy scenarios (kitchen prep schedules, guestroom thermostat drift, laundry equipment loading), 4 distinct options, and full 4-element optionFeedback.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-33",
    courseId: 221,
    title: "Water Conservation & Stewardship in Hotels",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 80,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Needs hotel water operational decisions (cooling towers, laundry rinse recycling, guest linen reuse protocols)"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 1,
    proposedRemediation: "Enrich all 8 questions with hotel water stewardship scenarios (flow restrictors, kitchen pre-rinse valves, rainwater collection, leak detection), 4 distinct options, full 4-element optionFeedback, preserving historical enrollment.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-34",
    courseId: 225,
    title: "Waste Minimisation & Single-Use Reduction in Hospitality",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 80,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Needs hotel F&B and amenities waste reduction scenarios (buffet food waste, bulk amenities, supplier packaging)"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with hospitality waste reduction scenarios (buffet portion control, organic composting, refillable amenity dispensers), 4 distinct options, and full 4-element optionFeedback.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  },
  {
    courseCode: "ELH-35",
    courseId: 710,
    title: "Sustainable Housekeeping Operations",
    currentVersion: 2,
    currentQuestionCount: 8,
    currentPassingScore: 75,
    qualityClassification: "MINOR_POLISH",
    identifiedDefects: [
      "Incomplete option-level educational feedback",
      "Needs eco-friendly chemical dosing, microfiber usage, guestroom energy-saving checklists",
      "Passing score at 75% requires standardization to 80%"
    ],
    historicalAttemptCount: 0,
    historicalEnrollmentCount: 0,
    proposedRemediation: "Enrich all 8 questions with housekeeping operational scenarios (chemical dilution dispensers, microfiber color coding, linen replacement rules, turn-down HVAC settings), 4 distinct options, full 4-element optionFeedback, and standardize passing score to 80%.",
    expectedResultingVersion: 2,
    targetQuestionCount: 8,
    targetPassingScore: 80
  }
];

export const SPRINT_15_2_10C_COHORT_COURSE_IDS = SPRINT_15_2_10C_COHORT.map((c) => c.courseId);
export const SPRINT_15_2_10C_COHORT_COURSE_CODES = SPRINT_15_2_10C_COHORT.map((c) => c.courseCode);
