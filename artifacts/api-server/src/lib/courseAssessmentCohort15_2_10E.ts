/**
 * Course Assessment Cohort 15.2.10E Definition & Metadata
 * 
 * Scope: 12 Canonical Courses (ELH-48 through ELH-59) covering Smart Building Automation & BMS,
 * Construction Environmental Controls, Low-Carbon Concrete & Sustainable Materials,
 * Indoor Environmental Quality & Well-Being, Property Facility Operations,
 * Green Building Retrofits & Decarbonization, Property HVAC & Chiller Optimization,
 * Legionella & Water System Safety, Building Certifications (LEED/BREEAM),
 * Industrial Compressed Air Efficiency, Boiler & Steam Optimization, and Industrial Wastewater Treatment.
 */

export interface CohortCourseMetadata15_2_10E {
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

export const SPRINT_15_2_10E_COHORT: CohortCourseMetadata15_2_10E[] = [
  {
    courseCode: "ELH-48",
    courseId: 711,
    title: "Smart Building Automation & BMS Optimization",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 75%", "Questions default to correct_option index 1", "Needs deeper BACnet/Modbus and sensor calibration scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with balanced answer distributions, complete 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-49",
    courseId: 712,
    title: "Construction Site Environmental Controls",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 75%", "Questions default to correct_option index 1", "Needs sediment basin and dust suppression operational scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with distributed correct answers, complete 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-50",
    courseId: 728,
    title: "Sustainable Building Materials & Low-Carbon Concrete",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 75%", "Questions default to correct_option index 1", "Needs EPD and supplementary cementitious materials (SCMs) scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with high-depth material lifecycle scenarios, complete 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-51",
    courseId: 729,
    title: "Indoor Environmental Quality & Well-Being",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 70%", "Missing 4-element option feedback", "Needs CO2 ventilation, acoustic, and low-VOC material scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with comprehensive 4-element option feedback, advance version to 2, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-52",
    courseId: 747,
    title: "Sustainable Property Facility Operations",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 75%", "Questions default to correct_option index 1", "Needs EUI benchmarking and green preventive maintenance scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with balanced answer distributions, complete 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-53",
    courseId: 773,
    title: "Green Building Retrofits & Decarbonization Pathways",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 75%", "Questions default to correct_option index 1", "Needs ASHRAE Level II auditing and heat pump electrification scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with deep retrofit scenarios, complete 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-54",
    courseId: 774,
    title: "Sustainable Property HVAC & Chiller Optimization",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 75%", "Questions default to correct_option index 1", "Needs Variable Primary Flow (VPF) and hydronic pumping scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with commercial HVAC hydronic optimization scenarios, complete 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-55",
    courseId: 713,
    title: "Legionella & Water System Safety in Facilities",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 75%", "Questions default to correct_option index 1", "Needs thermal regime control (60°C storage/50°C return) and dead-leg elimination scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with public health compliance scenarios, complete 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-56",
    courseId: 748,
    title: "Sustainable Building Certifications (LEED/BREEAM)",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 75%", "Questions default to correct_option index 1", "Needs LEED v4.1 prerequisite and enhanced commissioning (Cx) scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with green certification scorecard scenarios, complete 4-element option feedback, and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-57",
    courseId: 714,
    title: "Industrial Energy Efficiency & Compressed Air",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 80,
    expectedPassingScore: 80,
    identifiedDefects: ["Needs deeper ultrasonic leak tag-and-repair and VFD trim compressor staging scenarios", "Questions default to correct_option index 0"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with balanced answer distributions, compressor artificial demand scenarios, and complete 4-element option feedback."
  },
  {
    courseCode: "ELH-58",
    courseId: 715,
    title: "Boiler & Steam System Optimization",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 80,
    expectedPassingScore: 80,
    identifiedDefects: ["Needs combustion O2 tuning, steam trap ultrasonic testing, and automated TDS blowdown scenarios", "Questions default to correct_option index 0"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with industrial thermodynamic scenarios, complete 4-element option feedback, and balanced answer distributions."
  },
  {
    courseCode: "ELH-59",
    courseId: 730,
    title: "Industrial Wastewater & Effluent Treatment",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: ["Passing score non-standard at 75%", "Questions default to correct_option index 1", "Needs DAF coagulant dosing, MBR membrane fouling, and zero liquid discharge (ZLD) scenarios"],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with industrial effluent plant (ETP) scenarios, complete 4-element option feedback, and standardize passing score to 80%."
  }
];

export const SPRINT_15_2_10E_COHORT_COURSE_CODES = SPRINT_15_2_10E_COHORT.map(c => c.courseCode);
export const SPRINT_15_2_10E_COHORT_COURSE_IDS = SPRINT_15_2_10E_COHORT.map(c => c.courseId);
