/**
 * Sprint 15.2.10A — Controlled Course Assessment Cohort Manifest
 * 
 * Defines the authoritative 12-course foundational cohort for Sprint 15.2.10A
 * assessment truth audit, delivery hardening, and end-to-end activation.
 */

export interface AssessmentCohortItem {
  databaseId: number;
  courseCode: string;
  title: string;
  version: number;
  passingScore: number;
  targetQuestionCount: number;
  optionsPerQuestion: number;
  isCapstone: boolean;
  priorityReason: string;
}

export const SPRINT_15_2_10A_COHORT: AssessmentCohortItem[] = [
  {
    databaseId: 1,
    courseCode: "ELH-01",
    title: "Sustainability Foundations",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 8,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Universal foundational prerequisite for all learning paths in Morieva Skills.",
  },
  {
    databaseId: 2,
    courseCode: "ELH-02",
    title: "Waste Sorting & the Mauritian Bin System",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 8,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Core workplace operational course requiring standardisation from 5 to 8 scenario questions.",
  },
  {
    databaseId: 3,
    courseCode: "ELH-03",
    title: "Energy Efficiency",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Key resource efficiency competency in Universal Core Learning Path.",
  },
  {
    databaseId: 4,
    courseCode: "ELH-04",
    title: "Water Conservation",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Island freshwater protection and efficiency competency.",
  },
  {
    databaseId: 5,
    courseCode: "ELH-05",
    title: "Sustainable Procurement",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Commercial supply-chain and whole-life-cost decision competency.",
  },
  {
    databaseId: 6,
    courseCode: "ELH-06",
    title: "Green Office Practices",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Daily workplace habits, digital decluttering, and paper reduction.",
  },
  {
    databaseId: 7,
    courseCode: "ELH-07",
    title: "Carbon Footprint",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 8,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Scope 1, 2, and 3 emissions understanding and emission reduction.",
  },
  {
    databaseId: 8,
    courseCode: "ELH-08",
    title: "Biodiversity in Mauritius",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Ecosystem stewardship and local flora/fauna protection for commercial sites.",
  },
  {
    databaseId: 9,
    courseCode: "ELH-09",
    title: "ESG Basics",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Corporate ESG governance, tender requirements, and verifiable metrics.",
  },
  {
    databaseId: 10,
    courseCode: "ELH-10",
    title: "Environmental Compliance",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Incident reporting, hazardous chemical control, and spill protocols.",
  },
  {
    databaseId: 11,
    courseCode: "ELH-11",
    title: "Circular Economy",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "9R circular value hierarchy and asset lifetime extension.",
  },
  {
    databaseId: 12,
    courseCode: "ELH-12",
    title: "Final Sustainability Certification",
    version: 1,
    passingScore: 80,
    targetQuestionCount: 15,
    optionsPerQuestion: 4,
    isCapstone: true,
    priorityReason: "Comprehensive multi-domain capstone assessment unlocking enterprise certificate.",
  },
];

export const SPRINT_15_2_10A_COHORT_COURSE_IDS = SPRINT_15_2_10A_COHORT.map(c => c.databaseId);
export const SPRINT_15_2_10A_COHORT_COURSE_CODES = SPRINT_15_2_10A_COHORT.map(c => c.courseCode);
