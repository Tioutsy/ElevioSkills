export interface Cohort15_2_10HCourseMeta {
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

export const SPRINT_15_2_10H_COHORT: Cohort15_2_10HCourseMeta[] = [
  {
    courseCode: "ELH-84",
    courseId: 739,
    title: "Commercial Fleet Electrification & EV Charging",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs commercial fleet charging depot scenarios on peak shaving, smart load management, total cost of ownership (TCO), grid interconnection, and battery degradation prevention"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with fleet electrification scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-85",
    courseId: 718,
    title: "Sustainable Warehouse Operations",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs logistics warehouse scenarios on high-bay LED daylight harvesting, electric material handling equipment (MHE), rooftop solar PV integration, thermal insulation, and pallet recycling"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with green warehouse operations scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-86",
    courseId: 740,
    title: "Route Optimization & Logistics Efficiency",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs transport routing scenarios on dynamic multi-stop sequencing, empty backhaul elimination, telematics idle reduction, and urban delivery time window constraints"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with route optimization logistics scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-87",
    courseId: 761,
    title: "Regenerative Agriculture & Soil Health",
    currentVersion: 1,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 70,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 70%",
      "Missing optionFeedback arrays (0/8 completed)",
      "Needs agricultural field scenarios on no-till farming, multi-species cover cropping, soil organic matter (SOM) testing, mycorrhizal fungi preservation, and rotational grazing"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "DEFICIENT_FEEDBACK",
    proposedRemediation: "Upgrade from v1 to v2, author 8 scored questions with regenerative agriculture scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-88",
    courseId: 762,
    title: "Smart Irrigation & Agricultural Water Efficiency",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs irrigation engineering scenarios on soil moisture tensiometers, evapotranspiration (ET0) scheduling, precision drip irrigation, fertigation control, and saline water management"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with precision irrigation scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-89",
    courseId: 780,
    title: "Organic Fertilizers & Biological Pest Management",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs IPM and bio-input scenarios on beneficial predatory insects, compost tea maturation, pheromone mating disruption, biopesticide storage, and economic injury thresholds"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with biological pest management and organic fertilizer scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-90",
    courseId: 781,
    title: "Post-Harvest Loss Reduction & Cold Storage",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs post-harvest food supply chain scenarios on precooling methods, modified atmosphere packaging (MAP), ethylene scrubbers, relative humidity control, and sanitizing wash routines"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with post-harvest cold storage scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-91",
    courseId: 763,
    title: "Sustainable Aquaculture & Responsible Fish Farming",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs aquaculture farm management scenarios on recirculating aquaculture systems (RAS), feed conversion ratio (FCR), fish-in-fish-out (FIFO) ratio, dissolved oxygen monitoring, and ASC certification criteria"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with sustainable aquaculture management scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-92",
    courseId: 782,
    title: "Mangrove & Coastal Ecosystem Protection in Agriculture",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs coastal agro-ecosystem scenarios on mangrove riparian buffer zones, hypersaline drainage prevention, blue carbon sequestration, sediment traps, and coastal storm surge buffering"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with coastal ecosystem and mangrove protection scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-93",
    courseId: 764,
    title: "Agrochemical Safety & Runoff Prevention",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs farm chemical safety scenarios on triple-rinsing pesticide containers, secondary containment, buffer zones from surface water, drift-reduction nozzles, and personal protective equipment (PPE)"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with agrochemical safety and runoff prevention scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-94",
    courseId: 783,
    title: "Agri-Food Carbon Footprinting & Certification",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs farm carbon accounting scenarios on GHG Protocol FLAG guidance (forest, land, and agriculture), enteric fermentation emissions, N2O fertilizer emissions, and organic/GlobalG.A.P./Rainforest Alliance certification audits"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with agricultural carbon footprinting and certification scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  },
  {
    courseCode: "ELH-95",
    courseId: 741,
    title: "Green Software Engineering & Cloud Efficiency",
    currentVersion: 2,
    expectedVersion: 2,
    currentQuestionCount: 8,
    expectedQuestionCount: 8,
    currentPassingScore: 75,
    expectedPassingScore: 80,
    identifiedDefects: [
      "Passing score non-standard at 75%",
      "100% position 0 answer keys [8, 0, 0, 0]",
      "Needs software engineering scenarios on Software Carbon Intensity (SCI) specification, carbon-aware workload scheduling, serverless auto-scaling, cloud region grid carbon intensity, and algorithm time-space efficiency"
    ],
    historicalEnrollments: 0,
    historicalAttempts: 0,
    qualityClassification: "UNSTANDARDIZED_THRESHOLD",
    proposedRemediation: "Remediate 8 scored questions with green software and cloud optimization scenarios, 4-element optionFeedback, balanced answer keys (2/2/2/2), and standardize passing score to 80%."
  }
];

export const SPRINT_15_2_10H_COHORT_COURSE_IDS = SPRINT_15_2_10H_COHORT.map(c => c.courseId);
export const SPRINT_15_2_10H_COHORT_COURSE_CODES = SPRINT_15_2_10H_COHORT.map(c => c.courseCode);
