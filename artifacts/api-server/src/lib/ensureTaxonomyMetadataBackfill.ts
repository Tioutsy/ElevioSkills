import { db, coursesTable, systemSeedsTable } from "@workspace/db";
import { sql, eq } from "drizzle-orm";
import { logger } from "./logger";

const SEED_NAME = "sprint-14-12-taxonomy-metadata-backfill-v1";

interface CourseMetadataRecord {
  courseCode: string;
  relevanceLayer: string;
  primaryClassification: string;
  isEssentialUniversal: boolean;
  primaryCompetency: string;
  secondaryCompetencies: string[];
  applicableSectors: string[];
  applicableDepartments: string[];
  applicableJobFamilies: string[];
  applicableSeniorityTiers: string[];
  productionPriority: string;
  learningPathPurpose: string;
}

const CANONICAL_34_METADATA: Record<string, CourseMetadataRecord> = {
  "ELH-01": {
    courseCode: "ELH-01",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_CIRCULARITY", "COMP_WATER", "COMP_GHG"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_ADMIN", "JF_TECHNICAL", "JF_PROFESSIONAL", "JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Foundational baseline on workplace resource efficiency and climate connection."
  },
  "ELH-02": {
    courseCode: "ELH-02",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_CIRCULARITY",
    secondaryCompetencies: ["COMP_COMPLIANCE"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_ADMIN", "JF_TECHNICAL", "JF_PROFESSIONAL", "JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Color-coded waste segregation and contamination avoidance."
  },
  "ELH-03": {
    courseCode: "ELH-03",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_GHG"],
    applicableSectors: [],
    applicableDepartments: ["DEP_OPERATIONS", "DEP_FACILITIES", "DEP_ADMIN"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_ADMIN", "JF_TECHNICAL", "JF_PROFESSIONAL", "JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "24°C central setpoints, envelope sealing, and idle parasitic power shutdown."
  },
  "ELH-04": {
    courseCode: "ELH-04",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_WATER",
    secondaryCompetencies: ["COMP_COMPLIANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_OPERATIONS", "DEP_FACILITIES", "DEP_HOUSEKEEPING", "DEP_FOOD_BEVERAGE"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_ADMIN", "JF_TECHNICAL", "JF_PROFESSIONAL", "JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Tap leak reporting, washdown trigger nozzles, and hygiene boundaries."
  },
  "ELH-05": {
    courseCode: "ELH-05",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_PROCUREMENT",
    secondaryCompetencies: ["COMP_CIRCULARITY", "COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_ADMIN", "DEP_OPERATIONS", "DEP_FACILITIES", "DEP_MARKETING"],
    applicableJobFamilies: ["JF_ADMIN", "JF_PROFESSIONAL", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Need vs want filter, whole-life value (TCO), and supplier evidence questions."
  },
  "ELH-06": {
    courseCode: "ELH-06",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_CIRCULARITY",
    secondaryCompetencies: ["COMP_ENERGY"],
    applicableSectors: ["SEC_PROF_SERVICES", "SEC_FINANCE"],
    applicableDepartments: ["DEP_ADMIN", "DEP_HR", "DEP_FINANCE", "DEP_LEGAL_COMPLIANCE"],
    applicableJobFamilies: ["JF_ADMIN", "JF_PROFESSIONAL", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Office admin systems, stationery amnesties, pull-printing, low-waste catering."
  },
  "ELH-07": {
    courseCode: "ELH-07",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_GHG",
    secondaryCompetencies: ["COMP_ENERGY", "COMP_ESG_DATA"],
    applicableSectors: [],
    applicableDepartments: ["DEP_OPERATIONS", "DEP_LOGISTICS", "DEP_FACILITIES", "DEP_SUSTAINABILITY"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_TECHNICAL", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Activity Data x Emission Factors, Scope 1-3 boundaries, refrigerant leak logs."
  },
  "ELH-08": {
    courseCode: "ELH-08",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_BIODIVERSITY",
    secondaryCompetencies: ["COMP_COMPLIANCE"],
    applicableSectors: ["SEC_HOSPITALITY", "SEC_AGRICULTURE", "SEC_PROPERTY"],
    applicableDepartments: ["DEP_OPERATIONS", "DEP_FACILITIES", "DEP_HOUSEKEEPING"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Native/endemic/invasive species, lagoon runoff, bird-friendly lighting, Pause-Protect."
  },
  "ELH-09": {
    courseCode: "ELH-09",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ESG_DATA",
    secondaryCompetencies: ["COMP_STRATEGY", "COMP_GOVERNANCE", "COMP_SOCIAL"],
    applicableSectors: ["SEC_FINANCE", "SEC_PROF_SERVICES"],
    applicableDepartments: ["DEP_FINANCE", "DEP_HR", "DEP_LEGAL_COMPLIANCE", "DEP_SUSTAINABILITY", "DEP_EXECUTIVE"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "E, S, and G pillar literacy, capital markets context, and daily contribution."
  },
  "ELH-10": {
    courseCode: "ELH-10",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_COMPLIANCE",
    secondaryCompetencies: ["COMP_SOCIAL"],
    applicableSectors: ["SEC_MANUFACTURING", "SEC_PROPERTY", "SEC_CONSTRUCTION", "SEC_LOGISTICS"],
    applicableDepartments: ["DEP_OPERATIONS", "DEP_FACILITIES", "DEP_ENGINEERING", "DEP_HSE"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_TECHNICAL", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD"],
    productionPriority: "p0",
    learningPathPurpose: "EPA Mauritius, permit conditions, STOP-CHECK-CONTROL, chemical spill containment."
  },
  "ELH-11": {
    courseCode: "ELH-11",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_CIRCULARITY",
    secondaryCompetencies: ["COMP_PROCUREMENT"],
    applicableSectors: ["SEC_MANUFACTURING", "SEC_RETAIL", "SEC_LOGISTICS"],
    applicableDepartments: ["DEP_OPERATIONS", "DEP_PROCUREMENT", "DEP_FACILITIES", "DEP_WAREHOUSE"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_TECHNICAL", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "9-step circular value hierarchy, closed-loop packaging, e-waste data wiping."
  },
  "ELH-12": {
    courseCode: "ELH-12",
    relevanceLayer: "capstone_certification",
    primaryClassification: "CAPSTONE_CERTIFICATION",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_ENERGY", "COMP_WATER", "COMP_CIRCULARITY", "COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_ADMIN", "JF_TECHNICAL", "JF_PROFESSIONAL", "JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Multi-domain capstone assessment for foundational certification."
  },
  "ELH-13": {
    courseCode: "ELH-13",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_STRATEGY"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Translating corporate policy into practical departmental action roadmaps."
  },
  "ELH-14": {
    courseCode: "ELH-14",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_STRATEGY"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Establishing measurable, realistic departmental resource reduction targets."
  },
  "ELH-15": {
    courseCode: "ELH-15",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_SOCIAL"],
    applicableSectors: [],
    applicableDepartments: ["DEP_SUSTAINABILITY", "DEP_HR", "DEP_OPERATIONS"],
    applicableJobFamilies: ["JF_SUPERVISOR", "JF_MANAGER", "JF_PROFESSIONAL"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Structuring and running cross-functional green champion committees."
  },
  "ELH-16": {
    courseCode: "ELH-16",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_SOCIAL"],
    applicableSectors: [],
    applicableDepartments: ["DEP_HR", "DEP_MARKETING", "DEP_OPERATIONS"],
    applicableJobFamilies: ["JF_SUPERVISOR", "JF_MANAGER", "JF_PROFESSIONAL"],
    applicableSeniorityTiers: ["SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD"],
    productionPriority: "p0",
    learningPathPurpose: "Driving internal team engagement without jargon or coercive shaming."
  },
  "ELH-17": {
    courseCode: "ELH-17",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_ESG_DATA"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Visual tracking boards, action logs, and milestone verification."
  },
  "ELH-18": {
    courseCode: "ELH-18",
    relevanceLayer: "department_specific",
    primaryClassification: "DEPARTMENT_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ESG_DATA",
    secondaryCompetencies: ["COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_FACILITIES", "DEP_OPERATIONS", "DEP_FINANCE", "DEP_SUSTAINABILITY"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_TECHNICAL", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "SOURCE framework, primary meter logs, unit validation, zero vs missing data."
  },
  "ELH-19": {
    courseCode: "ELH-19",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_ESG_DATA", "COMP_STRATEGY"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Evaluating quarterly variance data against baseline targets and corrective loops."
  },
  "ELH-20": {
    courseCode: "ELH-20",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_HR", "DEP_OPERATIONS"],
    applicableJobFamilies: ["JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Defining role boundaries, accountability matrices, and delegation limits."
  },
  "ELH-21": {
    courseCode: "ELH-21",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_SOCIAL"],
    applicableSectors: [],
    applicableDepartments: ["DEP_HR", "DEP_OPERATIONS"],
    applicableJobFamilies: ["JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD"],
    productionPriority: "p0",
    learningPathPurpose: "Psychological safety, positive reinforcement, and overcoming operational friction."
  },
  "ELH-22": {
    courseCode: "ELH-22",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_SOCIAL"],
    applicableSectors: [],
    applicableDepartments: ["DEP_SUSTAINABILITY", "DEP_HR"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Project scoping, meeting cadence, executive sponsorship, and celebration."
  },
  "ELH-23": {
    courseCode: "ELH-23",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_STRATEGY", "COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_EXECUTIVE"],
    applicableJobFamilies: ["JF_EXECUTIVE", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Strategic change leadership, cultural embedding, and resource allocation."
  },
  "ELH-24": {
    courseCode: "ELH-24",
    relevanceLayer: "department_specific",
    primaryClassification: "DEPARTMENT_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_SOCIAL",
    secondaryCompetencies: ["COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_HR"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD"],
    productionPriority: "p0",
    learningPathPurpose: "Onboarding integration, training evidence custody, fair shift access, engagement."
  },
  "ELH-25": {
    courseCode: "ELH-25",
    relevanceLayer: "department_specific",
    primaryClassification: "DEPARTMENT_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_STRATEGY",
    secondaryCompetencies: ["COMP_ESG_DATA", "COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_FINANCE"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "TCO modeling, budget coding, CAPEX/OPEX solar review, invoice verification."
  },
  "ELH-26": {
    courseCode: "ELH-26",
    relevanceLayer: "role_specialist",
    primaryClassification: "ROLE_SPECIALIST",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_PROCUREMENT",
    secondaryCompetencies: ["COMP_SUPPLY_CHAIN", "COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_PROCUREMENT"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "ISO 20400, supplier ESG auditing, modern slavery due diligence, tender specs."
  },
  "ELH-27": {
    courseCode: "ELH-27",
    relevanceLayer: "department_specific",
    primaryClassification: "DEPARTMENT_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_WATER", "COMP_COMPLIANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_FACILITIES", "DEP_ENGINEERING"],
    applicableJobFamilies: ["JF_TECHNICAL", "JF_PROFESSIONAL", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD"],
    productionPriority: "p0",
    learningPathPurpose: "Contractor sign-off proof, 24°C setpoint air balancing, sub-meter anomalies."
  },
  "ELH-28": {
    courseCode: "ELH-28",
    relevanceLayer: "department_specific",
    primaryClassification: "DEPARTMENT_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_GOVERNANCE",
    secondaryCompetencies: ["COMP_STRATEGY"],
    applicableSectors: [],
    applicableDepartments: ["DEP_SALES", "DEP_MARKETING"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD"],
    productionPriority: "p0",
    learningPathPurpose: "ISO 14021 green claims, RFP response library, scope qualification, greenwashing defense."
  },
  "ELH-29": {
    courseCode: "ELH-29",
    relevanceLayer: "role_specialist",
    primaryClassification: "ROLE_SPECIALIST",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_COMPLIANCE",
    secondaryCompetencies: ["COMP_ENERGY", "COMP_CIRCULARITY"],
    applicableSectors: ["SEC_MANUFACTURING", "SEC_LOGISTICS", "SEC_PROPERTY"],
    applicableDepartments: ["DEP_OPERATIONS", "DEP_PRODUCTION", "DEP_WAREHOUSE"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_TECHNICAL", "JF_SUPERVISOR"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR"],
    productionPriority: "p0",
    learningPathPurpose: "Shift handover SOPs, equipment shutdown protocols, spill containment."
  },
  "ELH-30": {
    courseCode: "ELH-30",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_CLIMATE_RISK",
    secondaryCompetencies: ["COMP_COMPLIANCE"],
    applicableSectors: ["SEC_PROPERTY", "SEC_HOSPITALITY", "SEC_FINANCE"],
    applicableDepartments: ["DEP_FACILITIES", "DEP_OPERATIONS", "DEP_EXECUTIVE"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_TECHNICAL", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Tropical cyclone/flash flood site preparedness, heat stress, business continuity."
  },
  "ELH-31": {
    courseCode: "ELH-31",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_SOCIAL",
    secondaryCompetencies: ["COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_HR", "DEP_OPERATIONS"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_ADMIN", "JF_PROFESSIONAL", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Core operations vs charity, worker fatigue, contractor welfare, psychological safety."
  },
  "ELH-32": {
    courseCode: "ELH-32",
    relevanceLayer: "cross_sector_core",
    primaryClassification: "CROSS_SECTOR_CORE",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_GOVERNANCE",
    secondaryCompetencies: ["COMP_COMPLIANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_LEGAL_COMPLIANCE", "DEP_FINANCE", "DEP_EXECUTIVE"],
    applicableJobFamilies: ["JF_ADMIN", "JF_PROFESSIONAL", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Conflict registers, anti-bribery thresholds, backdating prevention, whistleblowing."
  },
  "ELH-33": {
    courseCode: "ELH-33",
    relevanceLayer: "department_specific",
    primaryClassification: "DEPARTMENT_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ESG_REPORTING",
    secondaryCompetencies: ["COMP_ESG_DATA", "COMP_GOVERNANCE"],
    applicableSectors: ["SEC_FINANCE", "SEC_PROF_SERVICES"],
    applicableDepartments: ["DEP_FINANCE", "DEP_SUSTAINABILITY", "DEP_EXECUTIVE"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Financial vs double materiality, GRI, ISSB (IFRS S1/S2), audit assurance."
  },
  "ELH-34": {
    courseCode: "ELH-34",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_ENERGY", "COMP_WATER", "COMP_SOCIAL", "COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_ADMIN", "JF_TECHNICAL", "JF_PROFESSIONAL", "JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "4-Action Framework, daily shift micro-habits, constructive speaking up."
  }
};

export async function ensureTaxonomyMetadataBackfill(): Promise<void> {
  try {
    // 1. Ensure columns exist on courses table safely
    await db.execute(sql.raw(`
      ALTER TABLE "courses" 
        ADD COLUMN IF NOT EXISTS "relevance_layer" text NOT NULL DEFAULT 'universal_core',
        ADD COLUMN IF NOT EXISTS "primary_classification" text NOT NULL DEFAULT 'UNIVERSAL_CORE',
        ADD COLUMN IF NOT EXISTS "is_essential_universal" boolean NOT NULL DEFAULT false,
        ADD COLUMN IF NOT EXISTS "primary_competency" text,
        ADD COLUMN IF NOT EXISTS "secondary_competencies" text[] NOT NULL DEFAULT '{}',
        ADD COLUMN IF NOT EXISTS "applicable_sectors" text[] NOT NULL DEFAULT '{}',
        ADD COLUMN IF NOT EXISTS "applicable_departments" text[] NOT NULL DEFAULT '{}',
        ADD COLUMN IF NOT EXISTS "applicable_job_families" text[] NOT NULL DEFAULT '{}',
        ADD COLUMN IF NOT EXISTS "applicable_seniority_tiers" text[] NOT NULL DEFAULT '{}',
        ADD COLUMN IF NOT EXISTS "production_priority" text NOT NULL DEFAULT 'p0',
        ADD COLUMN IF NOT EXISTS "learning_path_purpose" text;
    `));

    // 2. Ensure company configuration tables exist
    await db.execute(sql.raw(`
      CREATE TABLE IF NOT EXISTS "company_strategic_priorities" (
        "id" serial PRIMARY KEY,
        "company_id" integer NOT NULL REFERENCES "companies"("id") ON DELETE CASCADE,
        "priority_competency" text NOT NULL,
        "boost_weight" integer NOT NULL DEFAULT 20,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "company_priority_unique" UNIQUE("company_id", "priority_competency")
      );

      CREATE TABLE IF NOT EXISTS "company_mandatory_courses" (
        "id" serial PRIMARY KEY,
        "company_id" integer NOT NULL REFERENCES "companies"("id") ON DELETE CASCADE,
        "course_id" integer NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
        "target_department" text,
        "target_seniority" text,
        "deadline_days" integer DEFAULT 30,
        "created_at" timestamp with time zone NOT NULL DEFAULT now()
      );
    `));

    // 3. Backfill metadata for ELH-01 through ELH-34
    for (const [code, meta] of Object.entries(CANONICAL_34_METADATA)) {
      await db
        .update(coursesTable)
        .set({
          relevanceLayer: meta.relevanceLayer,
          primaryClassification: meta.primaryClassification,
          isEssentialUniversal: meta.isEssentialUniversal,
          primaryCompetency: meta.primaryCompetency,
          secondaryCompetencies: meta.secondaryCompetencies,
          applicableSectors: meta.applicableSectors,
          applicableDepartments: meta.applicableDepartments,
          applicableJobFamilies: meta.applicableJobFamilies,
          applicableSeniorityTiers: meta.applicableSeniorityTiers,
          productionPriority: meta.productionPriority,
          learningPathPurpose: meta.learningPathPurpose,
        })
        .where(eq(coursesTable.courseCode, code));
    }

    // 4. Update seed marker
    await db
      .insert(systemSeedsTable)
      .values({ name: SEED_NAME, version: 1 })
      .onConflictDoNothing();

    logger.info("Sprint 14.12 Taxonomy metadata backfill completed successfully for ELH-01..ELH-34.");
  } catch (err) {
    logger.error({ err }, "Failed to execute taxonomy metadata backfill");
    throw err;
  }
}
