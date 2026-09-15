export interface Cohort15_2_10KCourseMeta {
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

export const SPRINT_15_2_10K_COHORT: Cohort15_2_10KCourseMeta[] = [
  {
    courseCode: "ELH-120",
    courseId: 799,
    title: "Cross-Functional Sustainability Working Groups",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs authentic workplace scenarios on cross-functional charters, RACI accountability matrices, agile sprint cadences, trade-off resolution (CapEx vs LCA), and steering committee escalation"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with cross-functional governance and agile PMO scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-121",
    courseId: 721,
    title: "Building Business Cases for Sustainability Projects",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 1 answer keys [0, 8, 0, 0]",
      "Needs financial modeling scenarios on Discounted Cash Flow (DCF), NPV, IRR, utility tariff escalation modeling, non-energy co-benefits monetization, and 1-page CFO investment memos"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with financial capital budgeting and business case scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-122",
    courseId: 722,
    title: "Managing Subcontractor Sustainability Compliance",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 1 answer keys [0, 8, 0, 0]",
      "Needs subcontractor compliance scenarios on statutory duty of care (OSHA 2005 Section 5), right-to-audit MSA clauses, Permit-to-Work (PTW) protocols, Stop-Work Authority, and 30-day Corrective Action Plans (CAP)"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with contractor sustainability and safety compliance scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-123",
    courseId: 769,
    title: "Managing Capital Expenditure (CapEx) for Energy Retrofits",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs CapEx energy retrofit scenarios on Marginal Abatement Cost Curves (MACC), Energy Performance Contracting (EPC) shared vs guaranteed savings, IPMVP M&V protocols, and carbon shadow pricing hurdle rates"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with energy retrofit CapEx and EPC contracting scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-124",
    courseId: 800,
    title: "Executive Climate Governance & Net-Zero Strategy",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs executive climate governance scenarios on TCFD / ISSB S2 disclosure pillars, SBTi Corporate Net-Zero Standard, physical vs transition risk modeling, carbon pricing, and board oversight committee structures"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with executive climate governance and net-zero strategy scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-125",
    courseId: 801,
    title: "Occupational Health, Safety & Environmental Systems",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs integrated HSE scenarios on ISO 14001 and ISO 45001 alignment, Hierarchy of Controls, hazard identification and risk assessment (HIRA), incident root cause investigation, and environmental aspect-impact evaluation"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with integrated HSE and ISO 14001/45001 management scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-126",
    courseId: 802,
    title: "Facilities Energy Management for Specialists",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs facilities energy management scenarios on Building Management Systems (BMS) optimization, chiller plant coefficient of performance (COP), VAV air distribution, power factor correction, and demand peak shaving"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with facilities HVAC/BMS energy engineering scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-127",
    courseId: 803,
    title: "Sustainable Supply Chain Management for Procurement",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs sustainable supply chain scenarios on Scope 3 Category 1 supplier engagement, supplier ESG scorecards, multi-tier traceability, human rights due diligence (CSDDD), and sustainable procurement policy integration (ISO 20400)"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with sustainable supply chain procurement and ISO 20400 scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-128",
    courseId: 723,
    title: "Sustainability for Health & Safety (HSE) Officers",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 1 answer keys [0, 8, 0, 0]",
      "Needs HSE sustainability scenarios on chemical substitution, dangerous substance spill containment, hazardous waste manifests, heat stress in changing climates, and leading vs lagging safety/environmental KPIs"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with HSE officer sustainability integration scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-129",
    courseId: 804,
    title: "Environmental Risk & Compliance Management",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs compliance management scenarios on legal register maintenance, EIA/EPA license compliance monitoring, statutory breach reporting protocols, root cause CAPA remediation, and compliance risk auditing"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with environmental compliance and regulatory risk scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-130",
    courseId: 805,
    title: "Sustainability Communications & Green Claims",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 1 answer keys [0, 8, 0, 0]",
      "Needs green claims and communications scenarios on EU Green Claims Directive, substantiation of environmental claims, life-cycle carbon footprint evidence, avoiding greenwashing vs greenhushing, and multi-stakeholder messaging"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with green claims substantiation and sustainability communications scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-131",
    courseId: 742,
    title: "Executive ESG Strategy & Board Oversight",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Legacy version 1 course awaiting remediation",
      "Passing score non-standard at 70%",
      "Missing complete option-level feedback arrays",
      "Needs board governance scenarios on double materiality, fiduciary duty & ESG integration, board committee structures (Audit/Risk vs Sustainability), executive ESG remuneration linkage, and ISSB/CSRD strategic oversight"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Remediate 8 scored questions with executive board ESG strategy scenarios, 4-element optionFeedback, strictly balanced answer keys (2/2/2/2), advance version from v1 to v2, and standardize passing score to 80%."
  }
];

export const SPRINT_15_2_10K_COHORT_COURSE_IDS = SPRINT_15_2_10K_COHORT.map(c => c.courseId);
export const SPRINT_15_2_10K_COHORT_COURSE_CODES = SPRINT_15_2_10K_COHORT.map(c => c.courseCode);
