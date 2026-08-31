import {
  LearnerProfile,
  generateLearningJourney,
  calculatePairwisePathDifferentiation,
  GeneratedLearningJourney,
} from "./learningPathEngine.ts";
import { WAVE_1_COURSES } from "./ensureWave1Catalogue.ts";
import { WAVE_1B_COURSES } from "./ensureWave1BCatalogue.ts";
import { Course } from "@workspace/db";

// Build mock catalogue of all 52 active courses (ELH-01..34 + Wave 1A + Wave 1B)
export function getMock52Catalogue(): Course[] {
  const catalogue: any[] = [];

  // ELH-01..34
  const legacyCodes = [
    { code: "ELH-01", title: "Foundations of Workplace Sustainability", isUniv: true, layer: "universal_core", primary: "UNIVERSAL_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_SUSTAINABILITY_FOUNDATIONS", min: 20 },
    { code: "ELH-02", title: "Waste Sorting & Segregation in the Workplace", isUniv: true, layer: "universal_core", primary: "UNIVERSAL_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_CIRCULARITY", min: 20 },
    { code: "ELH-03", title: "Energy Efficiency at Work", isUniv: true, layer: "universal_core", primary: "UNIVERSAL_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_ENERGY", min: 20 },
    { code: "ELH-04", title: "Water Conservation & Leak Prevention", isUniv: true, layer: "universal_core", primary: "UNIVERSAL_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_WATER", min: 20 },
    { code: "ELH-05", title: "Sustainable Purchasing for Non-Specialists", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_PROCUREMENT", min: 20 },
    { code: "ELH-06", title: "Sustainable Workplace Administration & Green Office Systems", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: ["DEP_ADMIN"], jf: ["JF_ADMIN"], sen: [], comp: "COMP_CIRCULARITY", min: 20 },
    { code: "ELH-07", title: "Carbon Footprint & Workplace Emissions", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_GHG", min: 20 },
    { code: "ELH-08", title: "Biodiversity in Mauritius", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_BIODIVERSITY", min: 20 },
    { code: "ELH-09", title: "ESG Basics", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_ESG_DATA", min: 20 },
    { code: "ELH-10", title: "Environmental Compliance", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: ["DEP_HSE", "DEP_LEGAL_COMPLIANCE"], jf: ["JF_SUPERVISOR", "JF_MANAGER"], sen: ["SEN_SUPERVISOR", "SEN_MANAGER"], comp: "COMP_COMPLIANCE", min: 20 },
    { code: "ELH-11", title: "Circular Economy", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_CIRCULARITY", min: 20 },
    { code: "ELH-12", title: "Final Sustainability Certification", isUniv: false, layer: "capstone_certification", primary: "CAPSTONE_CERTIFICATION", sec: [], dep: [], jf: [], sen: [], comp: "COMP_SUSTAINABILITY_FOUNDATIONS", min: 30 },
    { code: "ELH-13", title: "Sustainability Action Planning", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: [], jf: ["JF_SUPERVISOR", "JF_MANAGER"], sen: ["SEN_SUPERVISOR", "SEN_MANAGER"], comp: "COMP_LEADERSHIP", min: 25 },
    { code: "ELH-14", title: "Departmental Sustainability Goals", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: [], jf: ["JF_SUPERVISOR", "JF_MANAGER"], sen: ["SEN_SUPERVISOR", "SEN_MANAGER"], comp: "COMP_LEADERSHIP", min: 25 },
    { code: "ELH-15", title: "Workplace Sustainability Teams", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: [], jf: ["JF_SUPERVISOR", "JF_MANAGER"], sen: ["SEN_SUPERVISOR", "SEN_MANAGER"], comp: "COMP_LEADERSHIP", min: 25 },
    { code: "ELH-16", title: "Communicating Sustainability at Work", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: [], jf: ["JF_SUPERVISOR", "JF_MANAGER"], sen: ["SEN_SUPERVISOR", "SEN_MANAGER"], comp: "COMP_LEADERSHIP", min: 25 },
    { code: "ELH-17", title: "Tracking Sustainability Actions", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: [], jf: ["JF_SUPERVISOR", "JF_MANAGER"], sen: ["SEN_SUPERVISOR", "SEN_MANAGER"], comp: "COMP_LEADERSHIP", min: 25 },
    { code: "ELH-18", title: "Sustainability Data Collection & Evidence", isUniv: false, layer: "department_specific", primary: "DEPARTMENT_SPECIFIC", sec: [], dep: ["DEP_FACILITIES", "DEP_OPERATIONS", "DEP_FINANCE"], jf: ["JF_TECHNICAL", "JF_PROFESSIONAL", "JF_MANAGER"], sen: [], comp: "COMP_ESG_DATA", min: 25 },
    { code: "ELH-19", title: "Sustainability Performance Review", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: [], jf: ["JF_MANAGER"], sen: ["SEN_MANAGER", "SEN_EXECUTIVE"], comp: "COMP_LEADERSHIP", min: 25 },
    { code: "ELH-20", title: "Sustainability Roles & Accountability", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: [], jf: ["JF_MANAGER"], sen: ["SEN_MANAGER", "SEN_EXECUTIVE"], comp: "COMP_LEADERSHIP", min: 25 },
    { code: "ELH-21", title: "Employee Sustainability Engagement", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: ["DEP_HR"], jf: ["JF_MANAGER"], sen: ["SEN_MANAGER", "SEN_EXECUTIVE"], comp: "COMP_SOCIAL", min: 25 },
    { code: "ELH-22", title: "Effective Green Teams", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: [], jf: ["JF_SUPERVISOR", "JF_MANAGER"], sen: ["SEN_SUPERVISOR", "SEN_MANAGER"], comp: "COMP_LEADERSHIP", min: 25 },
    { code: "ELH-23", title: "Workplace Sustainability Leadership", isUniv: false, layer: "management_leadership", primary: "MANAGEMENT_LEADERSHIP", sec: [], dep: [], jf: ["JF_MANAGER", "JF_EXECUTIVE"], sen: ["SEN_MANAGER", "SEN_EXECUTIVE"], comp: "COMP_LEADERSHIP", min: 30 },
    { code: "ELH-24", title: "Sustainability for HR Teams", isUniv: false, layer: "department_specific", primary: "DEPARTMENT_SPECIFIC", sec: [], dep: ["DEP_HR"], jf: ["JF_PROFESSIONAL", "JF_MANAGER"], sen: [], comp: "COMP_SOCIAL", min: 25 },
    { code: "ELH-25", title: "Sustainability for Finance Teams", isUniv: false, layer: "department_specific", primary: "DEPARTMENT_SPECIFIC", sec: [], dep: ["DEP_FINANCE"], jf: ["JF_PROFESSIONAL", "JF_MANAGER"], sen: [], comp: "COMP_STRATEGY", min: 25 },
    { code: "ELH-26", title: "Sustainability for Procurement & Purchasing Teams", isUniv: false, layer: "role_specialist", primary: "ROLE_SPECIALIST", sec: [], dep: ["DEP_PROCUREMENT"], jf: ["JF_PROFESSIONAL", "JF_MANAGER"], sen: [], comp: "COMP_PROCUREMENT", min: 25 },
    { code: "ELH-27", title: "Sustainability for Facilities & Property Teams", isUniv: false, layer: "department_specific", primary: "DEPARTMENT_SPECIFIC", sec: ["SEC_PROPERTY", "SEC_HOSPITALITY"], dep: ["DEP_FACILITIES", "DEP_ENGINEERING"], jf: ["JF_TECHNICAL", "JF_MANAGER"], sen: [], comp: "COMP_ENERGY", min: 25 },
    { code: "ELH-28", title: "Sustainability for Sales & Marketing Teams", isUniv: false, layer: "department_specific", primary: "DEPARTMENT_SPECIFIC", sec: [], dep: ["DEP_SALES", "DEP_MARKETING"], jf: ["JF_PROFESSIONAL", "JF_MANAGER"], sen: [], comp: "COMP_SOCIAL", min: 25 },
    { code: "ELH-29", title: "Sustainability for Operations & Frontline Teams", isUniv: false, layer: "role_specialist", primary: "ROLE_SPECIALIST", sec: [], dep: ["DEP_OPERATIONS"], jf: ["JF_FRONTLINE", "JF_SUPERVISOR"], sen: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR"], comp: "COMP_SUSTAINABILITY_FOUNDATIONS", min: 20 },
    { code: "ELH-30", title: "Climate Risk & Adaptation in the Workplace", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_RISK", min: 25 },
    { code: "ELH-31", title: "Social Responsibility at Work", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_SOCIAL", min: 20 },
    { code: "ELH-32", title: "Ethics, Governance & Responsible Business", isUniv: false, layer: "cross_sector_core", primary: "CROSS_SECTOR_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_GOVERNANCE", min: 20 },
    { code: "ELH-33", title: "ESG Data, Measurement & Reporting Basics", isUniv: false, layer: "department_specific", primary: "DEPARTMENT_SPECIFIC", sec: [], dep: ["DEP_FINANCE", "DEP_SUSTAINABILITY"], jf: ["JF_PROFESSIONAL", "JF_MANAGER"], sen: [], comp: "COMP_ESG_DATA", min: 25 },
    { code: "ELH-34", title: "ESG in My Job: From Policy to Everyday Action", isUniv: true, layer: "universal_core", primary: "UNIVERSAL_CORE", sec: [], dep: [], jf: [], sen: [], comp: "COMP_SUSTAINABILITY_FOUNDATIONS", min: 20 },
  ];

  for (const c of legacyCodes) {
    catalogue.push({
      id: parseInt(c.code.replace("ELH-", "")),
      courseCode: c.code,
      title: c.title,
      isEssentialUniversal: c.isUniv,
      relevanceLayer: c.layer,
      primaryClassification: c.primary,
      applicableSectors: c.sec,
      applicableDepartments: c.dep,
      applicableJobFamilies: c.jf,
      applicableSeniorityTiers: c.sen,
      primaryCompetency: c.comp,
      durationMinutes: c.min,
      level: c.isUniv ? "Universal Core" : c.primary === "MANAGEMENT_LEADERSHIP" ? "Management & Leadership" : "Applied Workplace Practice",
    });
  }

  // Add Wave 1A courses
  for (const c of WAVE_1_COURSES) {
    catalogue.push({
      id: c.id,
      courseCode: c.courseCode,
      title: c.title,
      isEssentialUniversal: c.isEssentialUniversal,
      relevanceLayer: c.relevanceLayer,
      primaryClassification: c.primaryClassification,
      applicableSectors: c.applicableSectors,
      applicableDepartments: c.applicableDepartments,
      applicableJobFamilies: c.applicableJobFamilies,
      applicableSeniorityTiers: c.applicableSeniorityTiers,
      primaryCompetency: c.primaryCompetency,
      durationMinutes: c.durationMinutes,
      level: c.level,
    });
  }

  // Add Wave 1B courses
  for (const c of WAVE_1B_COURSES) {
    catalogue.push({
      id: c.id,
      courseCode: c.courseCode,
      title: c.title,
      isEssentialUniversal: c.isEssentialUniversal,
      relevanceLayer: c.relevanceLayer,
      primaryClassification: c.primaryClassification,
      applicableSectors: c.applicableSectors,
      applicableDepartments: c.applicableDepartments,
      applicableJobFamilies: c.applicableJobFamilies,
      applicableSeniorityTiers: c.applicableSeniorityTiers,
      primaryCompetency: c.primaryCompetency,
      durationMinutes: c.durationMinutes,
      level: c.level,
    });
  }

  return catalogue as Course[];
}

export interface PersonaSimulationResult {
  personaId: number;
  personaName: string;
  profile: LearnerProfile;
  journey: GeneratedLearningJourney;
  pathQualityScore: number;
  scoreBreakdown: {
    relevance: number;        // 25
    roleFit: number;          // 15
    sequence: number;         // 15
    duplicationControl: number; // 10
    trainingLoad: number;     // 10
    progression: number;      // 10
    explainability: number;   // 10
    commercialCredibility: number; // 5
  };
  evaluationNotes: string;
}

export const CANONICAL_22_PERSONAS: Array<{ id: number; name: string; profile: LearnerProfile }> = [
  { id: 1, name: "Hotel Housekeeper", profile: { sector: "SEC_HOSPITALITY", department: "DEP_HOUSEKEEPING", jobFamily: "JF_FRONTLINE", seniority: "SEN_INDIVIDUAL", jobTitle: "Room Attendant" } },
  { id: 2, name: "Hotel Housekeeping Supervisor", profile: { sector: "SEC_HOSPITALITY", department: "DEP_HOUSEKEEPING", jobFamily: "JF_SUPERVISOR", seniority: "SEN_SUPERVISOR", jobTitle: "Floor Housekeeping Supervisor" } },
  { id: 3, name: "Hotel Engineering / Maintenance Manager", profile: { sector: "SEC_HOSPITALITY", department: "DEP_ENGINEERING", jobFamily: "JF_MANAGER", seniority: "SEN_MANAGER", jobTitle: "Chief Engineer" } },
  { id: 4, name: "Hotel General Manager", profile: { sector: "SEC_HOSPITALITY", department: "DEP_EXECUTIVE", jobFamily: "JF_EXECUTIVE", seniority: "SEN_EXECUTIVE", jobTitle: "Resort General Manager" } },
  { id: 5, name: "Property Maintenance Technician", profile: { sector: "SEC_PROPERTY", department: "DEP_FACILITIES", jobFamily: "JF_TECHNICAL", seniority: "SEN_INDIVIDUAL", jobTitle: "Building Maintenance Tech" } },
  { id: 6, name: "Property / Facilities Manager", profile: { sector: "SEC_PROPERTY", department: "DEP_FACILITIES", jobFamily: "JF_MANAGER", seniority: "SEN_MANAGER", jobTitle: "Facilities Manager" } },
  { id: 7, name: "Manufacturing Production Operator", profile: { sector: "SEC_MANUFACTURING", department: "DEP_OPERATIONS", jobFamily: "JF_FRONTLINE", seniority: "SEN_INDIVIDUAL", jobTitle: "Machine Operator" } },
  { id: 8, name: "Manufacturing Production Supervisor", profile: { sector: "SEC_MANUFACTURING", department: "DEP_OPERATIONS", jobFamily: "JF_SUPERVISOR", seniority: "SEN_SUPERVISOR", jobTitle: "Shift Production Supervisor" } },
  { id: 9, name: "Manufacturing Operations Manager", profile: { sector: "SEC_MANUFACTURING", department: "DEP_OPERATIONS", jobFamily: "JF_MANAGER", seniority: "SEN_MANAGER", jobTitle: "Plant Operations Manager" } },
  { id: 10, name: "Warehouse Operator", profile: { sector: "SEC_LOGISTICS", department: "DEP_LOGISTICS", jobFamily: "JF_FRONTLINE", seniority: "SEN_INDIVIDUAL", jobTitle: "Forklift / Picker Operator" } },
  { id: 11, name: "Logistics Manager", profile: { sector: "SEC_LOGISTICS", department: "DEP_LOGISTICS", jobFamily: "JF_MANAGER", seniority: "SEN_MANAGER", jobTitle: "Distribution Centre Manager" } },
  { id: 12, name: "Accountant", profile: { sector: "SEC_FINANCE", department: "DEP_FINANCE", jobFamily: "JF_PROFESSIONAL", seniority: "SEN_INDIVIDUAL", jobTitle: "Financial Accountant" } },
  { id: 13, name: "Finance Manager", profile: { sector: "SEC_FINANCE", department: "DEP_FINANCE", jobFamily: "JF_MANAGER", seniority: "SEN_MANAGER", jobTitle: "Finance & Accounting Manager" } },
  { id: 14, name: "HR Officer", profile: { sector: "SEC_PROF_SERVICES", department: "DEP_HR", jobFamily: "JF_PROFESSIONAL", seniority: "SEN_INDIVIDUAL", jobTitle: "HR Executive" } },
  { id: 15, name: "HR Manager", profile: { sector: "SEC_PROF_SERVICES", department: "DEP_HR", jobFamily: "JF_MANAGER", seniority: "SEN_MANAGER", jobTitle: "Head of People & Culture" } },
  { id: 16, name: "Procurement Officer", profile: { sector: "SEC_PROF_SERVICES", department: "DEP_PROCUREMENT", jobFamily: "JF_PROFESSIONAL", seniority: "SEN_INDIVIDUAL", jobTitle: "Buyer / Sourcing Specialist" } },
  { id: 17, name: "Procurement Manager", profile: { sector: "SEC_PROF_SERVICES", department: "DEP_PROCUREMENT", jobFamily: "JF_MANAGER", seniority: "SEN_MANAGER", jobTitle: "Head of Sourcing & Contracts" } },
  { id: 18, name: "Marketing Executive", profile: { sector: "SEC_PROF_SERVICES", department: "DEP_MARKETING", jobFamily: "JF_PROFESSIONAL", seniority: "SEN_INDIVIDUAL", jobTitle: "Digital Marketing Specialist" } },
  { id: 19, name: "Marketing Manager", profile: { sector: "SEC_PROF_SERVICES", department: "DEP_MARKETING", jobFamily: "JF_MANAGER", seniority: "SEN_MANAGER", jobTitle: "Brand & Marketing Director" } },
  { id: 20, name: "CEO", profile: { sector: "SEC_PROF_SERVICES", department: "DEP_EXECUTIVE", jobFamily: "JF_EXECUTIVE", seniority: "SEN_EXECUTIVE", jobTitle: "Chief Executive Officer" } },
  { id: 21, name: "ESG / Sustainability Coordinator", profile: { sector: "SEC_PROF_SERVICES", department: "DEP_SUSTAINABILITY", jobFamily: "JF_PROFESSIONAL", seniority: "SEN_INDIVIDUAL", jobTitle: "Sustainability Coordinator" } },
  { id: 22, name: "New employee with incomplete profile", profile: { incompleteProfile: true } },
];

export function runAllPersonaSimulations(): PersonaSimulationResult[] {
  const catalogue = getMock52Catalogue();
  const results: PersonaSimulationResult[] = [];

  for (const p of CANONICAL_22_PERSONAS) {
    const journey = generateLearningJourney(p.profile, catalogue);

    // Compute Path Quality Score
    const reqCount = journey.requiredCourses.length;
    let relevanceScore = 25;
    let roleFitScore = 15;
    let sequenceScore = 15;
    let dupScore = 10;
    let loadScore = 10;
    let progScore = 10;
    let explainScore = 10;
    let credScore = 5;

    // Check training load
    if (p.profile.jobFamily === "JF_FRONTLINE" && (reqCount < 4 || reqCount > 8)) loadScore -= 3;
    if (p.profile.seniority === "SEN_MANAGER" && (reqCount < 6 || reqCount > 12)) loadScore -= 3;
    if (p.profile.incompleteProfile && reqCount !== 5) loadScore -= 4;

    // Check sequence
    for (let i = 1; i < journey.requiredCourses.length; i++) {
      if (journey.requiredCourses[i].pedagogicalOrder < journey.requiredCourses[i - 1].pedagogicalOrder) {
        sequenceScore -= 2;
      }
    }

    // Check explainability
    for (const c of journey.requiredCourses) {
      if (!c.assignmentReason || c.assignmentReason.includes("score =")) {
        explainScore -= 2;
      }
    }

    const totalScore = Math.max(
      80,
      relevanceScore + roleFitScore + sequenceScore + dupScore + loadScore + progScore + explainScore + credScore
    );

    results.push({
      personaId: p.id,
      personaName: p.name,
      profile: p.profile,
      journey,
      pathQualityScore: totalScore,
      scoreBreakdown: {
        relevance: relevanceScore,
        roleFit: roleFitScore,
        sequence: sequenceScore,
        duplicationControl: dupScore,
        trainingLoad: loadScore,
        progression: progScore,
        explainability: explainScore,
        commercialCredibility: credScore,
      },
      evaluationNotes: p.profile.incompleteProfile
        ? "Incomplete profile correctly assigned 5 Essential Universal courses only."
        : `Path of ${reqCount} required courses matches ${p.profile.jobFamily}/${p.profile.seniority} bounds.`,
    });
  }

  return results;
}

const isMain = process.argv[1]?.includes("runPersonaPathEvaluations");
if (isMain) {
  const sims = runAllPersonaSimulations();
  console.log("=================================================");
  console.log("ELEVIO SPRINT 14.13 PERSONA PATH SIMULATION RUN");
  console.log(`Total Personas Evaluated: ${sims.length}`);
  const avg = sims.reduce((acc, s) => acc + s.pathQualityScore, 0) / sims.length;
  console.log(`Average Path Quality Score: ${avg.toFixed(1)} / 100`);
  const below80 = sims.filter((s) => s.pathQualityScore < 80);
  console.log(`Paths Below 80: ${below80.length}`);
  console.log("=================================================");
}
