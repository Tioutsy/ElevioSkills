/**
 * Sprint 15.2.10B — Controlled Course Assessment Remediation Cohort Manifest
 * 
 * Defines the 12 selected priority courses for Sprint 15.2.10B instructional
 * quality remediation, scenario enhancement, option-level feedback completion,
 * and 80% passing-score standardisation.
 */

export interface AssessmentCohortItem15_2_10B {
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

export const SPRINT_15_2_10B_COHORT: AssessmentCohortItem15_2_10B[] = [
  {
    databaseId: 12,
    courseCode: "ELH-12",
    title: "Final Sustainability Certification",
    version: 1,
    passingScore: 80,
    targetQuestionCount: 15,
    optionsPerQuestion: 4,
    isCapstone: true,
    priorityReason: "Capstone credential assessment requiring full 4-option educational feedback and scenario grounding.",
  },
  {
    databaseId: 13,
    courseCode: "ELH-13",
    title: "Sustainability Action Planning",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Remediates 10 questions with missing option-level feedback and elevates scenario depth.",
  },
  {
    databaseId: 14,
    courseCode: "ELH-14",
    title: "Setting Departmental Sustainability Goals",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Aligns departmental KPI setting with 4-option feedback and workplace decision scenarios.",
  },
  {
    databaseId: 162,
    courseCode: "ELH-15",
    title: "Building a Workplace Sustainability Team",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Completes team structuring questions with distractor explanations and role scenarios.",
  },
  {
    databaseId: 114,
    courseCode: "ELH-16",
    title: "Communicating Sustainability at Work",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Replaces recall questions with authentic stakeholder messaging and anti-greenwashing scenarios.",
  },
  {
    databaseId: 163,
    courseCode: "ELH-17",
    title: "Tracking Sustainability Actions and Progress",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Enriches audit-readiness, variance tracking, and progress metrics with 4-option feedback.",
  },
  {
    databaseId: 120,
    courseCode: "ELH-18",
    title: "Sustainability Data Collection and Evidence",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Focuses on utility data logging, verification protocols, and verifiable evidence standards.",
  },
  {
    databaseId: 161,
    courseCode: "ELH-19",
    title: "Conducting a Sustainability Performance Review",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 8,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Standardises passing score to 80% and equips all 8 questions with comprehensive option feedback.",
  },
  {
    databaseId: 164,
    courseCode: "ELH-20",
    title: "Sustainability Roles, Responsibilities and Accountability",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Grounds governance, escalation, and team accountability in realistic workplace dilemmas.",
  },
  {
    databaseId: 102,
    courseCode: "ELH-21",
    title: "Building Employee Engagement in Sustainability",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Replaces abstract theory with high-impact employee motivation and campaign scenarios.",
  },
  {
    databaseId: 143,
    courseCode: "ELH-22",
    title: "Creating and Running Effective Green Teams",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 10,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Enriches charter development, meeting management, and project execution questions.",
  },
  {
    databaseId: 944,
    courseCode: "ELH-23",
    title: "Planning and Delivering Workplace Sustainability Initiatives",
    version: 2,
    passingScore: 80,
    targetQuestionCount: 8,
    optionsPerQuestion: 4,
    isCapstone: false,
    priorityReason: "Standardises passing score from 75% to 80% and provides option-level feedback for all 8 questions.",
  },
];

export const SPRINT_15_2_10B_COHORT_COURSE_IDS = SPRINT_15_2_10B_COHORT.map(c => c.databaseId);
export const SPRINT_15_2_10B_COHORT_COURSE_CODES = SPRINT_15_2_10B_COHORT.map(c => c.courseCode);
