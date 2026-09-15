/**
 * Sprint 15.2.10L — Final Canonical Assessment Remediation & Catalogue Closure Cohort Manifest
 * 
 * Defines the final 16 target courses required to achieve 100% (136/136) enterprise-ready catalogue status:
 * - Group L1 (11 Foundation Courses): ELH-01 through ELH-11
 * - Group L2 (5 Advanced Reporting & Transition Courses): ELH-132 through ELH-136
 */

export interface AssessmentCohortItem15_2_10L {
  databaseId: number;
  courseCode: string;
  title: string;
  group: "L1_FOUNDATION" | "L2_ADVANCED";
  preVersion: number;
  postVersion: number;
  prePassingScore: number;
  postPassingScore: number;
  questionCount: number;
  optionsPerQuestion: number;
  domain: string;
}

export const SPRINT_15_2_10L_GROUP_L1: AssessmentCohortItem15_2_10L[] = [
  {
    databaseId: 1,
    courseCode: "ELH-01",
    title: "Sustainability Foundations & ESG Core Principles",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 8,
    optionsPerQuestion: 4,
    domain: "Sustainability Foundations & ESG Principles"
  },
  {
    databaseId: 2,
    courseCode: "ELH-02",
    title: "Waste Sorting & the Mauritian Bin System",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 8,
    optionsPerQuestion: 4,
    domain: "Workplace Waste Management & Circular Sorting"
  },
  {
    databaseId: 3,
    courseCode: "ELH-03",
    title: "Energy Efficiency at Work",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 10,
    optionsPerQuestion: 4,
    domain: "Workplace Energy Conservation & HVAC Efficiency"
  },
  {
    databaseId: 4,
    courseCode: "ELH-04",
    title: "Water Conservation",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 10,
    optionsPerQuestion: 4,
    domain: "Commercial Water Efficiency & Fixture Maintenance"
  },
  {
    databaseId: 5,
    courseCode: "ELH-05",
    title: "Sustainable Purchasing for Non-Specialists",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 10,
    optionsPerQuestion: 4,
    domain: "Everyday Sustainable Purchasing & Eco-Labels"
  },
  {
    databaseId: 6,
    courseCode: "ELH-06",
    title: "Green Office Practices",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 10,
    optionsPerQuestion: 4,
    domain: "Administrative Sustainability & Digital Office Operations"
  },
  {
    databaseId: 7,
    courseCode: "ELH-07",
    title: "Resource Efficiency: Circular Economy & Zero-Waste Strategy",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 8,
    optionsPerQuestion: 4,
    domain: "5R Waste Hierarchy & Commercial Resource Efficiency"
  },
  {
    databaseId: 8,
    courseCode: "ELH-08",
    title: "Biodiversity in Mauritius",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 10,
    optionsPerQuestion: 4,
    domain: "Island Biodiversity, Endemic Flora/Fauna & Habitat Protection"
  },
  {
    databaseId: 9,
    courseCode: "ELH-09",
    title: "ESG Basics",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 10,
    optionsPerQuestion: 4,
    domain: "Universal ESG Principles & Commercial Risk Dimensions"
  },
  {
    databaseId: 10,
    courseCode: "ELH-10",
    title: "Environmental Compliance",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 10,
    optionsPerQuestion: 4,
    domain: "Statutory Environmental Compliance & Incident Containment"
  },
  {
    databaseId: 11,
    courseCode: "ELH-11",
    title: "Circular Economy",
    group: "L1_FOUNDATION",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 80,
    postPassingScore: 80,
    questionCount: 10,
    optionsPerQuestion: 4,
    domain: "Circular Business Models, Asset Reallocation & Take-Back"
  }
];

export const SPRINT_15_2_10L_GROUP_L2: AssessmentCohortItem15_2_10L[] = [
  {
    databaseId: 770,
    courseCode: "ELH-132",
    title: "CSRD & European Sustainability Reporting Standards (ESRS)",
    group: "L2_ADVANCED",
    preVersion: 1,
    postVersion: 2,
    prePassingScore: 70,
    postPassingScore: 80,
    questionCount: 8,
    optionsPerQuestion: 4,
    domain: "Corporate Sustainability Reporting Directive & ESRS Compliance"
  },
  {
    databaseId: 743,
    courseCode: "ELH-133",
    title: "Advanced GHG Accounting: Scope 1, 2 & 3 Emissions",
    group: "L2_ADVANCED",
    preVersion: 2,
    postVersion: 2,
    prePassingScore: 75,
    postPassingScore: 80,
    questionCount: 8,
    optionsPerQuestion: 4,
    domain: "GHG Protocol Scope 1, 2 Dual Reporting & Scope 3 Categories"
  },
  {
    databaseId: 806,
    courseCode: "ELH-134",
    title: "Biodiversity & Nature-Related Disclosures (TNFD)",
    group: "L2_ADVANCED",
    preVersion: 1,
    postVersion: 2,
    prePassingScore: 70,
    postPassingScore: 80,
    questionCount: 8,
    optionsPerQuestion: 4,
    domain: "TNFD LEAP Methodology & Nature-Related Risk Governance"
  },
  {
    databaseId: 807,
    courseCode: "ELH-135",
    title: "Internal Carbon Pricing & Carbon Budgeting",
    group: "L2_ADVANCED",
    preVersion: 1,
    postVersion: 2,
    prePassingScore: 70,
    postPassingScore: 80,
    questionCount: 8,
    optionsPerQuestion: 4,
    domain: "Shadow Carbon Pricing, Internal Carbon Fees & Budgeting"
  },
  {
    databaseId: 771,
    courseCode: "ELH-136",
    title: "Corporate Net-Zero Transition Planning & Science-Based Targets (SBTi)",
    group: "L2_ADVANCED",
    preVersion: 1,
    postVersion: 2,
    prePassingScore: 70,
    postPassingScore: 80,
    questionCount: 8,
    optionsPerQuestion: 4,
    domain: "SBTi Net-Zero Standard, 1.5°C Pathways & Transition Plans"
  }
];

export const SPRINT_15_2_10L_COHORT: AssessmentCohortItem15_2_10L[] = [
  ...SPRINT_15_2_10L_GROUP_L1,
  ...SPRINT_15_2_10L_GROUP_L2
];

export const SPRINT_15_2_10L_COHORT_COURSE_IDS = SPRINT_15_2_10L_COHORT.map(c => c.databaseId);
export const SPRINT_15_2_10L_COHORT_COURSE_CODES = SPRINT_15_2_10L_COHORT.map(c => c.courseCode);
export const SPRINT_15_2_10L_GROUP_L1_COURSE_IDS = SPRINT_15_2_10L_GROUP_L1.map(c => c.databaseId);
export const SPRINT_15_2_10L_GROUP_L1_COURSE_CODES = SPRINT_15_2_10L_GROUP_L1.map(c => c.courseCode);
export const SPRINT_15_2_10L_GROUP_L2_COURSE_IDS = SPRINT_15_2_10L_GROUP_L2.map(c => c.databaseId);
export const SPRINT_15_2_10L_GROUP_L2_COURSE_CODES = SPRINT_15_2_10L_GROUP_L2.map(c => c.courseCode);

