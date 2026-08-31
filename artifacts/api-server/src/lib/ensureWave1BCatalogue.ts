import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

export interface Wave1BCourseDefinition {
  id: number;
  courseCode: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  categoryId: number;
  durationMinutes: number;
  priceUsd: string;
  level: string;
  isFeatured: boolean;
  thumbnailUrl: string;
  intendedRoles: string[];
  learningObjectives: string[];
  includesCertificate: boolean;
  passingScore: number;
  completionMessage: string;
  badgeName: string;
  badgeDescription: string;
  badgeSlug: string;
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
  lessons: Array<{
    order: number;
    title: string;
    minutes: number;
    content: string;
    blocks: any[];
  }>;
  quiz: Array<{
    order: number;
    question: string;
    options: string[];
    correct: number;
    correctExplanation: string;
    incorrectExplanation: string;
  }>;
}

export const WAVE_1B_COURSES: Wave1BCourseDefinition[] = [
  // 1. ELH-55: Legionella & Water System Safety in Facilities
  {
    id: 55,
    courseCode: "ELH-55",
    slug: "legionella-and-water-system-safety-in-facilities",
    title: "Legionella & Water System Safety in Facilities",
    description: "Manage cooling tower biocide regimes, hot water storage thermal disinfection (>60°C), dead-leg elimination, and statutory water sampling in commercial facilities.",
    fullDescription: "Legionnaires' disease poses a severe statutory liability for hotels, commercial towers, and hospitals. This course trains facilities managers, chief engineers, and water treatment technicians on temperature control regimes, biocide dosing, microbiological testing, and risk assessment.",
    categoryId: 2,
    durationMinutes: 25,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/legionella-water-safety.jpg",
    intendedRoles: ["Facilities Managers", "Chief Engineers", "Maintenance Technicians", "HSE Officers", "Plumbing Supervisors"],
    learningObjectives: [
      "Maintain hot water storage at >=60°C and distribution >=50°C to inhibit Legionella pneumophila growth.",
      "Manage automated chemical biocide dosing and conductivity blowdown in cooling towers.",
      "Identify and eliminate dead-legs and stagnant pipework in commercial plumbing systems.",
      "Execute statutory quarterly Legionella sampling and UK HSE ACOP L8 compliance protocols.",
      "Complete 8 scenario-based assessment questions on facility water safety."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have mastered Legionella & Water System Safety in Facilities.",
    badgeName: "Water Safety & Legionella Control Specialist",
    badgeDescription: "Awarded for technical competency in building water safety, thermal disinfection, and Legionella risk mitigation.",
    badgeSlug: "water-safety-legionella-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_COMPLIANCE",
    secondaryCompetencies: ["COMP_WATER", "COMP_HEALTH_SAFETY"],
    applicableSectors: ["SEC_PROPERTY", "SEC_HOSPITALITY", "SEC_HEALTHCARE"],
    applicableDepartments: ["DEP_FACILITIES", "DEP_ENGINEERING", "DEP_HSE"],
    applicableJobFamilies: ["JF_TECHNICAL", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Prevent fatal Legionella outbreaks through rigorous thermal and chemical controls.",
    lessons: [
      {
        order: 0,
        title: "Legionella Biology & Growth Conditions",
        minutes: 4,
        content: "Understanding the proliferation range of Legionella pneumophila (20°C to 45°C).",
        blocks: [
          { id: "leg1-h1", type: "heading", position: 1, headingText: "The Proliferation Sweet Spot" },
          { id: "leg1-t1", type: "short_text", position: 2, bodyText: "Legionella bacteria multiply rapidly in stagnant water between 20°C and 45°C, especially in the presence of scale, sediment, and bio-film." },
          {
            id: "leg1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Resort maintenance dilemma:",
            decisionPrompt: "To save energy, a resort maintenance technician lowers the domestic hot water calorifier storage temperature from 62°C to 46°C. What is the consequence?",
            decisionChoices: [
              { label: "Immediately intervene and restore calorifier storage to at least 60°C; 46°C falls directly in the optimal rapid multiplication range for Legionella pneumophila", correct: true, feedback: "Spot on! Storing hot water below 60°C creates a fatal pathogen hazard." },
              { label: "Praise the technician for saving electricity", correct: false, feedback: "Dangerous! Energy savings must never compromise thermal disinfection." },
              { label: "Turn off water heating permanently", correct: false, feedback: "Incorrect. Hot water must be maintained at safe thermal levels." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Thermal Control Regimes & Calorifiers",
        minutes: 4,
        content: "Maintaining storage >=60°C and return >=50°C.",
        blocks: [
          { id: "leg2-h1", type: "heading", position: 1, headingText: "Thermal Disinfection Standards" },
          { id: "leg2-t1", type: "short_text", position: 2, bodyText: "Hot water must be stored at >=60°C and distributed such that every tap reaches >=50°C within 1 minute of opening." }
        ]
      },
      {
        order: 2,
        title: "Cooling Tower Biocide & Drift Eliminator Management",
        minutes: 4,
        content: "Oxidising and non-oxidising biocides, drift eliminators, and dip slides.",
        blocks: [
          { id: "leg3-h1", type: "heading", position: 1, headingText: "Cooling Tower Aerosol Risk" },
          { id: "leg3-t1", type: "short_text", position: 2, bodyText: "Cooling towers generate fine water aerosols. High-efficiency drift eliminators and automated biocide dosing prevent aerosolized Legionella transmission." }
        ]
      },
      {
        order: 3,
        title: "Dead-Leg Identification & Pipe Flushing",
        minutes: 4,
        content: "Eliminating stagnant pipe runs and weekly flushing of unused guestrooms.",
        blocks: [
          { id: "leg4-h1", type: "heading", position: 1, headingText: "Stagnant Water Risks" },
          { id: "leg4-t1", type: "short_text", position: 2, bodyText: "Pipes longer than twice their diameter with no flow are dead-legs. Unoccupied rooms must be flushed weekly for 3 minutes." }
        ]
      },
      {
        order: 4,
        title: "Statutory Sampling, Logging & Remediation",
        minutes: 4,
        content: "Quarterly lab testing and action limits for >1,000 CFU/L.",
        blocks: [
          { id: "leg5-h1", type: "heading", position: 1, headingText: "Action Thresholds" },
          { id: "leg5-t1", type: "short_text", position: 2, bodyText: "Counts >1,000 CFU/L require immediate chemical or thermal shock disinfection and root-cause investigation." }
        ]
      },
      {
        order: 5,
        title: "Water Safety Plan & Logbook Verification",
        minutes: 5,
        content: "Daily temperature logging and compliance audits.",
        blocks: [
          { id: "leg6-h1", type: "heading", position: 1, headingText: "Compliance Logbooks" },
          { id: "leg6-t1", type: "short_text", position: 2, bodyText: "Maintain complete digital records of daily sentinel tap temperatures and biocide levels." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "What is the critical temperature proliferation range for Legionella pneumophila bacteria in building water systems?",
        options: [
          "20°C to 45°C (with optimal multiplication occurring between 32°C and 42°C)",
          "-10°C to 0°C",
          "70°C to 90°C",
          "100°C to 120°C"
        ],
        correct: 0,
        correctExplanation: "Legionella multiplies rapidly between 20°C and 45°C; temperatures above 60°C kill the bacteria rapidly.",
        incorrectExplanation: "Incorrect. The dangerous proliferation zone is 20°C to 45°C."
      },
      {
        order: 2,
        question: "What is the international statutory temperature standard for central domestic hot water calorifier storage tanks?",
        options: [
          "Stored at a minimum of 60°C at all times and distributed to reach at least 50°C at taps within 1 minute",
          "Stored at 30°C to reduce electricity bills",
          "Stored at 15°C with added ice",
          "Water temperature does not matter"
        ],
        correct: 0,
        correctExplanation: "60°C storage ensures continuous thermal pasteurisation of the tank volume.",
        incorrectExplanation: "Incorrect. Storing hot water at >=60°C and circulating at >=50°C is the required safety standard."
      },
      {
        order: 3,
        question: "Why are cooling towers considered one of the highest risk sources for community Legionnaires' disease outbreaks?",
        options: [
          "They generate fine inhalable warm water aerosol mists that can be carried by wind for kilometres if drift eliminators or biocide regimes fail",
          "They attract wild birds",
          "They produce radioactive smoke",
          "They freeze municipal water pipes"
        ],
        correct: 0,
        correctExplanation: "Cooling towers create warm aerosols that, if infected, can transmit Legionella deep into human lungs via inhalation.",
        incorrectExplanation: "Incorrect. Cooling towers generate inhalable warm aerosol mists that can transmit the pathogen over distance."
      },
      {
        order: 4,
        question: "What is a 'dead-leg' in a facility plumbing system, and why is it dangerous?",
        options: [
          "A section of redundant pipework with zero or stagnant flow where water cools into the 20-45°C range and develops thick bacterial biofilm",
          "A broken metal table leg in the cafeteria",
          "A drain pipe that is completely empty",
          "A copper pipe painted yellow"
        ],
        correct: 0,
        correctExplanation: "Dead-legs create stagnant incubators for bacteria that continuously re-contaminate circulating hot and cold water.",
        incorrectExplanation: "Incorrect. Dead-legs are stagnant pipe sections where pathogen biofilm flourishes."
      },
      {
        order: 5,
        question: "How should hotel engineering teams manage plumbing fixtures in rooms that have remained unoccupied for over one week?",
        options: [
          "Execute a structured flushing routine: run hot and cold water through sink taps and showers for at least 3 minutes prior to guest arrival",
          "Tape the taps shut permanently",
          "Pour gasoline down the bathroom drain",
          "Disconnect the sinks completely"
        ],
        correct: 0,
        correctExplanation: "Regular flushing removes stagnant water and replenishes residual disinfectant in branch pipes.",
        incorrectExplanation: "Incorrect. Unused taps and showers must be flushed for 3 minutes weekly to purge stagnation."
      },
      {
        order: 6,
        question: "What laboratory test result for Legionella in a cooling tower water sample triggers mandatory immediate emergency decontamination?",
        options: [
          "Counts exceeding 1,000 Colony Forming Units per Litre (CFU/L)",
          "Counts of 0 CFU/L",
          "Water having a pH of 7.0",
          "Water containing dissolved oxygen"
        ],
        correct: 0,
        correctExplanation: "Counts >1,000 CFU/L indicate severe loss of microbial control requiring immediate biocidal shock and resanitization.",
        incorrectExplanation: "Incorrect. Legionella levels >1,000 CFU/L require immediate chemical shock disinfection."
      },
      {
        order: 7,
        question: "What physical device on a cooling tower prevents droplet plumes from escaping into ambient outdoor air?",
        options: [
          "High-efficiency drift eliminators",
          "Plastic garden netting",
          "A heavy metal padlock",
          "An exhaust chimney pipe"
        ],
        correct: 0,
        correctExplanation: "Drift eliminators capture escaping water droplets and return them to the cooling basin.",
        incorrectExplanation: "Incorrect. Drift eliminators strip water droplets from air exhaust."
      },
      {
        order: 8,
        question: "What documentation must be maintained in a statutory Building Water Safety Logbook?",
        options: [
          "Monthly sentinel tap temperatures, biocide dosing logs, cooling tower cleaning certificates, and laboratory micro-test reports",
          "Daily weather forecasts from local newspapers",
          "Employee vacation photos",
          "Hotel restaurant dinner menus"
        ],
        correct: 0,
        correctExplanation: "Auditable logbooks prove statutory compliance and defend the property against liability in legal audits.",
        incorrectExplanation: "Incorrect. Complete temperature logs and chemical test reports are legally required."
      }
    ]
  },

  // 2. ELH-57: Industrial Energy Efficiency & Compressed Air
  {
    id: 57,
    courseCode: "ELH-57",
    slug: "industrial-energy-efficiency-and-compressed-air",
    title: "Industrial Energy Efficiency & Compressed Air",
    description: "Detect compressed air leaks, optimize receiver storage, regulate system pressure, and optimize industrial motor efficiency in manufacturing plants.",
    fullDescription: "Compressed air is the most expensive utility in manufacturing plants, with only 10-15% of electrical input converted into useful pneumatic power. This course trains plant engineers, production supervisors, and maintenance technicians on ultrasonic leak detection, artificial demand reduction, compressor sequencing, and VFD motor control.",
    categoryId: 2,
    durationMinutes: 25,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/industrial-energy-compressed-air.jpg",
    intendedRoles: ["Plant Engineers", "Maintenance Technicians", "Production Supervisors", "Operations Managers"],
    learningObjectives: [
      "Quantify compressed air generation cost and electrical power conversion losses.",
      "Conduct ultrasonic leak surveys and establish tag-and-repair maintenance programs.",
      "Lower plant operating discharge pressure to reduce artificial demand and compressor power.",
      "Sequence multiple compressors using VFD trim units to eliminate unloaded idling power.",
      "Complete 8 scenario-based assessment questions on industrial compressed air efficiency."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Industrial Energy Efficiency & Compressed Air.",
    badgeName: "Compressed Air Energy Specialist",
    badgeDescription: "Awarded for demonstrating technical competence in industrial compressed air optimization and motor efficiency.",
    badgeSlug: "compressed-air-energy-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_GHG", "COMP_CIRCULARITY"],
    applicableSectors: ["SEC_MANUFACTURING", "SEC_LOGISTICS"],
    applicableDepartments: ["DEP_ENGINEERING", "DEP_OPERATIONS", "DEP_FACILITIES"],
    applicableJobFamilies: ["JF_TECHNICAL", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Eliminate compressed air leaks and optimize industrial compressor sequencing.",
    lessons: [
      {
        order: 0,
        title: "The True Cost of Industrial Compressed Air",
        minutes: 4,
        content: "Why compressed air represents the most expensive form of industrial energy.",
        blocks: [
          { id: "air1-h1", type: "heading", position: 1, headingText: "10% Useful Work, 90% Waste Heat" },
          { id: "air1-t1", type: "short_text", position: 2, bodyText: "Roughly 85-90% of electrical energy supplied to an air compressor is lost as low-grade heat." },
          {
            id: "air1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Factory floor challenge:",
            decisionPrompt: "During a night shutdown, the 75 kW rotary screw compressor is cycling continuously. The plant has zero production running. What does this indicate?",
            decisionChoices: [
              { label: "Massive distribution leaks in pipe fittings and quick-disconnect couplings; conduct an ultrasonic leak survey immediately", correct: true, feedback: "Spot on! In typical plants, 20-30% of compressed air is lost to leaks." },
              { label: "The compressor is recharging the national power grid", correct: false, feedback: "Incorrect and physically impossible." },
              { label: "The air pipes are expanding due to humidity", correct: false, feedback: "Incorrect. Continuous cycling during shutdown proves heavy air leaks." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Ultrasonic Leak Detection & Tagging",
        minutes: 4,
        content: "Locating inaudible high-frequency leaks and calculating ROI.",
        blocks: [
          { id: "air2-h1", type: "heading", position: 1, headingText: "Ultrasonic Detection" },
          { id: "air2-t1", type: "short_text", position: 2, bodyText: "Ultrasonic detectors isolate 40 kHz turbulent hiss from background factory noise." }
        ]
      },
      {
        order: 2,
        title: "System Pressure Reduction & Artificial Demand",
        minutes: 4,
        content: "Every 1 bar reduction cuts compressor energy draw by 7%.",
        blocks: [
          { id: "air3-h1", type: "heading", position: 1, headingText: "Pressure Optimization" },
          { id: "air3-t1", type: "short_text", position: 2, bodyText: "Operating at 8.5 bar when machines require only 6.0 bar wastes energy and multiplies leak rates through artificial demand." }
        ]
      },
      {
        order: 3,
        title: "Compressor Staging & VFD Trim Units",
        minutes: 4,
        content: "Base load fixed-speed machines paired with VFD variable trim.",
        blocks: [
          { id: "air4-h1", type: "heading", position: 1, headingText: "Smart Sequencing" },
          { id: "air4-t1", type: "short_text", position: 2, bodyText: "Unloaded rotary screw compressors consume 25-40% of full-load power while producing zero air." }
        ]
      },
      {
        order: 4,
        title: "Heat Recovery from Compressor Oil Coolers",
        minutes: 4,
        content: "Harvesting compressor heat for factory space heating or boiler feedwater.",
        blocks: [
          { id: "air5-h1", type: "heading", position: 1, headingText: "Compressor Heat Recovery" },
          { id: "air5-t1", type: "short_text", position: 2, bodyText: "Installing plate heat exchangers on compressor oil circuits recovers up to 80% of input electrical energy as hot water (70°C)." }
        ]
      },
      {
        order: 5,
        title: "Plant Air Audit & Maintenance Action Plan",
        minutes: 5,
        content: "Quarterly leak audits and air intake filtration.",
        blocks: [
          { id: "air6-h1", type: "heading", position: 1, headingText: "Continuous Air Management" },
          { id: "air6-t1", type: "short_text", position: 2, bodyText: "Commit to monthly leak tagging, pressure regulator checks, and automated off-hour isolation valves." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Approximately what percentage of the electrical energy fed into an industrial air compressor is converted into useful mechanical pneumatic work?",
        options: [
          "Only 10% to 15% (with 85% to 90% lost as low-grade waste heat)",
          "100% (zero energy is lost)",
          "75% useful mechanical power",
          "50% mechanical and 50% sound"
        ],
        correct: 0,
        correctExplanation: "Compressed air is an extremely inefficient energy vector; ~90% of electricity turns into heat during compression.",
        incorrectExplanation: "Incorrect. Compressed air is notoriously lossy, converting only 10–15% of electricity into useful work."
      },
      {
        order: 2,
        question: "How does reducing the main header discharge pressure of an industrial compressor affect compressor energy consumption?",
        options: [
          "Every 1 bar (14.5 psi) reduction in system operating pressure reduces compressor electricity consumption by approximately 7%",
          "It increases electricity draw by 50%",
          "It causes the motor to spin backwards",
          "Pressure reduction has zero effect on electrical consumption"
        ],
        correct: 0,
        correctExplanation: "Lowering operating pressure reduces the compression ratio and compressor motor work, saving ~7% power per bar.",
        incorrectExplanation: "Incorrect. Reducing system pressure saves approximately 7% electrical energy per bar reduction."
      },
      {
        order: 3,
        question: "Why are rotary screw compressors operating in 'unloaded / idle' mode a major source of factory energy waste?",
        options: [
          "An unloaded compressor consumes 25% to 40% of its full-load electrical power while delivering zero useful compressed air",
          "They convert lubricating oil into diesel fuel",
          "They draw electricity directly from lightning strikes",
          "They cause the plant water pipes to vibrate"
        ],
        correct: 0,
        correctExplanation: "Unloaded machines continue spinning against internal mechanical friction without doing useful work.",
        incorrectExplanation: "Incorrect. Unloaded screw compressors waste 25–40% of full-load power while producing zero air."
      },
      {
        order: 4,
        question: "What instrument is the industry benchmark for locating compressed air leaks during active factory production shifts?",
        options: [
          "Ultrasonic acoustic leak detector",
          "Infrared security camera",
          "Mercury glass thermometer",
          "Digital kitchen scale"
        ],
        correct: 0,
        correctExplanation: "Ultrasonic detectors isolate the high-frequency turbulence of escaping air even in noisy factory environments.",
        incorrectExplanation: "Incorrect. Ultrasonic detectors are the gold standard for pinpointing air leaks amid factory noise."
      },
      {
        order: 5,
        question: "What is 'artificial demand' in industrial compressed air systems?",
        options: [
          "Excess air volume consumed by unregulated production tools and leaks simply because the system is operated at higher pressure than needed",
          "Air purchased from foreign countries",
          "Air stored inside employee lockers",
          "Computer-generated air consumption"
        ],
        correct: 0,
        correctExplanation: "Higher pressure forces more air through every nozzle, tool, and leak, inflating air consumption without productive gain.",
        incorrectExplanation: "Incorrect. Artificial demand is the wasted excess flow forced through tools and leaks due to over-pressurization."
      },
      {
        order: 6,
        question: "How can manufacturing plants capture waste heat generated by large rotary screw air compressors?",
        options: [
          "By installing liquid-to-liquid plate heat exchangers on the compressor lubricant cooling circuit to generate hot water for boilers or cleaning",
          "By venting hot exhaust air directly into employee offices",
          "By pouring ice over the compressor motor",
          "By painting the compressor casing with black paint"
        ],
        correct: 0,
        correctExplanation: "Oil-circuit heat exchangers recover up to 80% of input electrical energy as useful hot water (up to 70°C).",
        incorrectExplanation: "Incorrect. Plate heat exchangers on the oil loop capture valuable thermal energy for boiler feedwater or sanitation."
      },
      {
        order: 7,
        question: "What is the recommended operational practice for non-production weekend periods in manufacturing facilities?",
        options: [
          "Install automated motorized isolation valves to isolate unused distribution headers and shut down non-essential compressors",
          "Leave all compressors running at maximum pressure 24/7",
          "Vent the entire compressed air storage tank into the parking lot",
          "Fill the air tanks with water"
        ],
        correct: 0,
        correctExplanation: "Header isolation prevents system leaks from draining storage tanks and triggering unneeded weekend compressor cycling.",
        incorrectExplanation: "Incorrect. Automated header isolation valves prevent overnight leak losses and compressor cycling."
      },
      {
        order: 8,
        question: "Why should compressed air intake filters be located in cool, dry outdoor ambient air rather than hot factory plant rooms?",
        options: [
          "Cold air is denser, requiring less mechanical energy to compress a given mass of air compared to hot plant room air",
          "Outdoor air is 100% pure nitrogen",
          "Compressors overheat if intake air is cold",
          "Cold air eliminates the need for lubricating oil"
        ],
        correct: 0,
        correctExplanation: "Every 3°C reduction in intake air temperature improves compressor thermodynamic efficiency by ~1%.",
        incorrectExplanation: "Incorrect. Denser, cooler intake air requires less compression energy per kg of air."
      }
    ]
  },

  // 3. ELH-58: Boiler & Steam System Optimization
  {
    id: 58,
    courseCode: "ELH-58",
    slug: "boiler-and-steam-system-optimization",
    title: "Boiler & Steam System Optimization",
    description: "Optimize heavy fuel oil / LPG combustion, steam trap failure testing, condensate heat recovery, and blowdown heat exchange in industrial steam systems.",
    fullDescription: "Industrial steam systems consume massive fossil fuel volumes in textile, sugar, food processing, and beverage plants. This course trains boiler operators, plant engineers, and maintenance teams on excess air tuning, ultrasound steam trap surveys, condensate return recovery (>80%), and automated boiler TDS blowdown controls.",
    categoryId: 2,
    durationMinutes: 30,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/boiler-steam-optimization.jpg",
    intendedRoles: ["Boiler Operators", "Plant Engineers", "Maintenance Supervisors", "Energy Managers"],
    learningObjectives: [
      "Tune burner air-to-fuel ratios to achieve optimal flue gas O2 (3-4%) without unburned CO.",
      "Conduct ultrasonic and thermal infrared steam trap surveys to identify leaking traps.",
      "Maximize condensate return volume and temperature to reduce boiler water treatment and fuel.",
      "Implement automated Total Dissolved Solids (TDS) blowdown control with flash steam recovery.",
      "Install economizers to capture waste flue gas heat for boiler feedwater pre-heating.",
      "Complete 8 scenario-based assessment questions on industrial steam efficiency."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Boiler & Steam System Optimization.",
    badgeName: "Steam System Optimization Specialist",
    badgeDescription: "Awarded for technical competency in industrial boiler combustion tuning, steam trap maintenance, and thermal heat recovery.",
    badgeSlug: "steam-system-optimization-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_GHG", "COMP_WATER"],
    applicableSectors: ["SEC_MANUFACTURING", "SEC_AGRICULTURE", "SEC_HOSPITALITY"],
    applicableDepartments: ["DEP_ENGINEERING", "DEP_OPERATIONS", "DEP_FACILITIES"],
    applicableJobFamilies: ["JF_TECHNICAL", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Reduce boiler fuel burn and optimize condensate recovery across industrial steam loops.",
    lessons: [
      {
        order: 0,
        title: "Thermodynamics of Industrial Steam",
        minutes: 5,
        content: "Understanding latent heat, enthalpy, and fuel combustion efficiency.",
        blocks: [
          { id: "stm1-h1", type: "heading", position: 1, headingText: "Steam as a Thermal Vector" },
          { id: "stm1-t1", type: "short_text", position: 2, bodyText: "Steam carries massive latent heat energy. However, boiler stack losses, faulty steam traps, and unreturned condensate often waste over 30% of total boiler fuel input." },
          {
            id: "stm1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Boiler room diagnostic:",
            decisionPrompt: "During a routine stack test on an industrial fire-tube boiler burning fuel oil, the flue gas analyzer shows 11% O2 and high stack temperature (260°C). What should the boiler engineer do?",
            decisionChoices: [
              { label: "Trim excess combustion air dampers to reduce stack O2 to 3-4%; high excess air carries massive heat directly out the chimney stack, wasting thousands of litres of fuel", correct: true, feedback: "Spot on! Excessive air cools the combustion chamber and carries valuable heat out the exhaust stack." },
              { label: "Double the fuel feed rate to heat up the excess air", correct: false, feedback: "Extremely dangerous! Over-fueling causes severe smoking, soot buildup, and explosion risk." },
              { label: "Turn off the water supply to the boiler", correct: false, feedback: "Catastrophic boiler explosion risk! Boiler water level must never be compromised." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Burner Combustion Tuning & Flue Gas Analysis",
        minutes: 5,
        content: "Targeting 3-4% O2, <50 ppm CO, and minimizing stack heat loss.",
        blocks: [
          { id: "stm2-h1", type: "heading", position: 1, headingText: "Combustion Optimization" },
          { id: "stm2-t1", type: "short_text", position: 2, bodyText: "Every 20°C drop in flue gas stack temperature increases boiler thermal efficiency by approximately 1%. Installing a stack economizer captures this waste heat to pre-heat boiler feed water." }
        ]
      },
      {
        order: 2,
        title: "Steam Trap Testing: Ultrasonic & Thermal Surveys",
        minutes: 5,
        content: "Detecting blow-through failures and blocked thermodynamic/float traps.",
        blocks: [
          { id: "stm3-h1", type: "heading", position: 1, headingText: "Steam Trap Inspection" },
          { id: "stm3-t1", type: "short_text", position: 2, bodyText: "A single failed-open steam trap blowing live steam directly into condensate lines can waste over MUR 150,000 in fuel annually. Annual ultrasonic trap audits pay for themselves in days." }
        ]
      },
      {
        order: 3,
        title: "Condensate Return & Hot Well Management",
        minutes: 5,
        content: "Maximizing return water volume and saving water treatment chemicals.",
        blocks: [
          { id: "stm4-h1", type: "heading", position: 1, headingText: "Liquid Gold: Clean Hot Condensate" },
          { id: "stm4-t1", type: "short_text", position: 2, bodyText: "Returning clean condensate at 85°C requires only a fraction of the energy needed to heat cold 20°C raw makeup water into steam, while saving expensive demineralization water treatment chemicals." }
        ]
      },
      {
        order: 4,
        title: "Automated TDS Blowdown & Flash Steam Recovery",
        minutes: 5,
        content: "Replacing manual bottom blowdown with automated conductivity probes.",
        blocks: [
          { id: "stm5-h1", type: "heading", position: 1, headingText: "Controlling Dissolved Solids" },
          { id: "stm5-t1", type: "short_text", position: 2, bodyText: "Continuous automated TDS blowdown valves prevent scaling without venting excess hot water. Routing blowdown through a flash vessel recovers low-pressure steam for feedwater deaeration." }
        ]
      },
      {
        order: 5,
        title: "Industrial Steam System Maintenance Plan",
        minutes: 5,
        content: "Daily boiler logbooks, water hardness testing, and pipe insulation.",
        blocks: [
          { id: "stm6-h1", type: "heading", position: 1, headingText: "Boilerhouse Standard Operating Procedures" },
          { id: "stm6-t1", type: "short_text", position: 2, bodyText: "Commit to daily chemical hardness testing, thermal insulation jacket audits on steam valves, and quarterly trap surveys." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Why does operating an industrial boiler with excessively high combustion air (e.g. stack O2 > 10%) waste substantial fuel?",
        options: [
          "Excess air cools the combustion chamber and carries valuable thermal energy directly out the exhaust chimney stack",
          "Excess air turns steam into ice cubes",
          "It makes the boiler grow larger physically",
          "Excess air eliminates the need for water"
        ],
        correct: 0,
        correctExplanation: "Excess air absorbs heat during combustion and dumps it into the atmosphere via the stack, lowering thermal efficiency.",
        incorrectExplanation: "Incorrect. High excess air carries thermal energy out the chimney, inflating fuel burn."
      },
      {
        order: 2,
        question: "What is the primary function of a steam trap in an industrial steam distribution loop?",
        options: [
          "To automatically discharge condensed water (condensate) and non-condensable gases while preventing live steam from escaping",
          "To add cold tap water into the steam pipe",
          "To trap mice and insects in the boilerhouse",
          "To decrease the pressure of steam to zero"
        ],
        correct: 0,
        correctExplanation: "Steam traps discharge condensate to prevent water hammer while sealing the pipe against live steam losses.",
        incorrectExplanation: "Incorrect. Steam traps purge condensate and air without allowing live steam to escape."
      },
      {
        order: 3,
        question: "Why is returning hot condensate (e.g. at 80°C to 90°C) to the boiler feedwater tank highly advantageous for plant efficiency?",
        options: [
          "It significantly reduces the fuel energy required to generate steam and reuses expensive treated, demineralized boiler water",
          "It eliminates the need for boiler operators",
          "It converts the boiler into a refrigeration chiller",
          "It allows the plant to run without fuel"
        ],
        correct: 0,
        correctExplanation: "Every 6°C increase in feedwater temperature saves ~1% boiler fuel, while returning pure condensate eliminates raw makeup water treatment.",
        incorrectExplanation: "Incorrect. Condensate return saves substantial fuel energy and reuses purified demineralized water."
      },
      {
        order: 4,
        question: "How does installing a flue gas economizer on an industrial boiler chimney improve energy efficiency?",
        options: [
          "It transfers waste heat from the hot exhaust gases into pre-heating incoming cold boiler feedwater",
          "It turns exhaust smoke into solid coal",
          "It generates solar electricity from the chimney",
          "It paints the boiler exterior automatically"
        ],
        correct: 0,
        correctExplanation: "Economizers recover waste heat from the stack gas, boosting overall boiler thermal efficiency by 4% to 6%.",
        incorrectExplanation: "Incorrect. Economizers pre-heat boiler feedwater using waste flue gas heat."
      },
      {
        order: 5,
        question: "What failure mode occurs when a mechanical thermodynamic or inverted bucket steam trap fails in the 'open' position?",
        options: [
          "It continuously blows live, high-pressure steam directly into the condensate return system, resulting in severe fuel waste and backpressure issues",
          "It causes the steam pipe to freeze",
          "It turns steam into liquid nitrogen",
          "It creates an electrical short circuit in the factory"
        ],
        correct: 0,
        correctExplanation: "Blow-through trap failures vent live steam into low-pressure condensate lines, wasting immense thermal energy.",
        incorrectExplanation: "Incorrect. Traps failing open blow live steam into condensate lines, wasting thousands in fuel."
      },
      {
        order: 6,
        question: "Why should bare, uninsulated steam valves, flanges, and piping headers be fitted with removable thermal insulation jackets?",
        options: [
          "Uninsulated steam surfaces radiate massive thermal heat into ambient air, and insulation jackets typically pay for themselves within 2 to 4 months",
          "Insulation jackets make pipes look colourful for visitors",
          "Uninsulated pipes attract electrical lightning",
          "Insulation jackets prevent steam from moving inside the pipe"
        ],
        correct: 0,
        correctExplanation: "A single uninsulated 4-inch steam valve can lose over 1,500 kWh of thermal energy annually to ambient air.",
        incorrectExplanation: "Incorrect. Removable jackets prevent immense radiant heat loss from bare steam valves and flanges."
      },
      {
        order: 7,
        question: "What is the benefit of installing an automated Total Dissolved Solids (TDS) boiler blowdown controller over manual bottom blowdown?",
        options: [
          "It continuously measures water electrical conductivity and bleeds only the exact amount of water needed to prevent scale, avoiding excess hot water waste",
          "It removes the need to treat boiler water with chemicals",
          "It increases steam pressure by 500%",
          "It turns boiler water into drinking mineral water"
        ],
        correct: 0,
        correctExplanation: "Automated TDS control maintains exact chemical limits without the large energy losses of intermittent manual dumping.",
        incorrectExplanation: "Incorrect. Automated conductivity blowdown avoids the energy and water waste of manual dump valves."
      },
      {
        order: 8,
        question: "What hazardous phenomenon in steam lines is prevented by proper condensate drainage through functional steam traps?",
        options: [
          "Water hammer (hydraulic shock waves caused by steam propelling slugs of condensed water at high velocity, which can rupture pipe fittings)",
          "Steam pipes turning into rubber",
          "Boilers floating into the air",
          "Water freezing into ice inside active steam pipes"
        ],
        correct: 0,
        correctExplanation: "Water hammer occurs when condensate slugs travel at steam velocity, creating catastrophic mechanical pipe shock.",
        incorrectExplanation: "Incorrect. Steam traps prevent lethal water hammer shockwaves by continuously removing condensate slugs."
      }
    ]
  },

  // 4. ELH-62: Industrial Chemical Management & GHS
  {
    id: 62,
    courseCode: "ELH-62",
    slug: "industrial-chemical-management-and-ghs",
    title: "Industrial Chemical Management & GHS",
    description: "Implement Globally Harmonized System (GHS) chemical labelling, Safety Data Sheets (SDS), secondary containment bunding, and hazardous spill response.",
    fullDescription: "Industrial chemicals pose severe occupational health, fire, and ecological contamination hazards if mismanaged. This course equips chemical handlers, warehouse storekeepers, production leads, and HSE officers with practical standard operating procedures for GHS pictograms, incompatible chemical segregation, 110% bunding, and emergency spill response.",
    categoryId: 2,
    durationMinutes: 25,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/industrial-chemical-management.jpg",
    intendedRoles: ["Chemical Handlers", "Warehouse Storekeepers", "HSE Officers", "Production Supervisors", "Maintenance Staff"],
    learningObjectives: [
      "Interpret GHS chemical hazard pictograms, signal words, and hazard statements on containers.",
      "Access and utilize 16-section Safety Data Sheets (SDS) for chemical risk mitigation.",
      "Segregate incompatible chemical classes (acids, bases, flammables, oxidizers) in storage.",
      "Maintain 110% capacity secondary containment bunds and IBC spill pallets.",
      "Deploy chemical emergency spill kits and execute statutory spill containment procedures.",
      "Complete 8 scenario-based assessment questions on chemical management and GHS."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Industrial Chemical Management & GHS.",
    badgeName: "Industrial Chemical Safety Specialist",
    badgeDescription: "Awarded for operational excellence in GHS chemical compliance, storage segregation, and hazardous spill containment.",
    badgeSlug: "industrial-chemical-safety-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_COMPLIANCE",
    secondaryCompetencies: ["COMP_HEALTH_SAFETY", "COMP_WATER"],
    applicableSectors: ["SEC_MANUFACTURING", "SEC_AGRICULTURE", "SEC_LOGISTICS"],
    applicableDepartments: ["DEP_HSE", "DEP_OPERATIONS", "DEP_FACILITIES"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_TECHNICAL", "JF_SUPERVISOR"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Enforce GHS compliance, chemical segregation, and secondary containment across factory sites.",
    lessons: [
      {
        order: 0,
        title: "GHS Standard & Chemical Hazard Pictograms",
        minutes: 4,
        content: "Understanding standardized pictograms, signal words (DANGER / WARNING), and container labeling.",
        blocks: [
          { id: "chm1-h1", type: "heading", position: 1, headingText: "Universal Hazard Communication" },
          { id: "chm1-t1", type: "short_text", position: 2, bodyText: "The Globally Harmonized System (GHS) provides universal diamond pictograms to communicate flammability, toxicity, corrosiveness, and aquatic hazards regardless of language barriers." },
          {
            id: "chm1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Factory store challenge:",
            decisionPrompt: "A maintenance operator decants concentrated hydrochloric acid from a 200L drum into an unlabelled plastic water bottle to carry across the plant. What should the supervisor do?",
            decisionChoices: [
              { label: "Stop the operator immediately, confiscate the bottle, and mandate decanting only into approved chemical containers with complete GHS secondary labels and SDS hazard warnings", correct: true, feedback: "Spot on! Decanting chemicals into unlabelled beverage bottles is a leading cause of fatal accidental poisonings." },
              { label: "Allow it as long as the operator remembers what is inside the bottle", correct: false, feedback: "Extremely dangerous! Unlabelled containers lead to catastrophic ingestion and skin burns." },
              { label: "Pour the acid down the nearest garden drain", correct: false, feedback: "Severe environmental crime! Acid destroys municipal drainage and kills aquatic life." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Decoding the 16-Section Safety Data Sheet (SDS)",
        minutes: 4,
        content: "Navigating Sections 4 (First Aid), 7 (Handling & Storage), and 8 (PPE Controls).",
        blocks: [
          { id: "chm2-h1", type: "heading", position: 1, headingText: "The SDS Master Document" },
          { id: "chm2-t1", type: "short_text", position: 2, bodyText: "Every chemical on site must have an active 16-section SDS within immediate reach of workers. Section 8 details mandatory respirator, glove, and eye protection requirements." }
        ]
      },
      {
        order: 2,
        title: "Incompatible Chemical Storage & Segregation",
        minutes: 4,
        content: "Preventing violent reactions between acids, bases, oxidizers, and flammables.",
        blocks: [
          { id: "chm3-h1", type: "heading", position: 1, headingText: "Chemical Incompatibility Rules" },
          { id: "chm3-t1", type: "short_text", position: 2, bodyText: "Never store strong acids (hydrochloric, sulfuric) adjacent to strong bases (sodium hydroxide) or cyanide compounds, which generate lethal toxic gases upon contact." }
        ]
      },
      {
        order: 3,
        title: "Secondary Containment Bunds & IBC Pallets",
        minutes: 4,
        content: "Enforcing 110% volume bunding and sumps for liquid bulk storage.",
        blocks: [
          { id: "chm4-h1", type: "heading", position: 1, headingText: "Containment Engineering" },
          { id: "chm4-t1", type: "short_text", position: 2, bodyText: "All chemical storage drums and Intermediate Bulk Containers (IBCs) must sit on secondary spill containment pallets holding at least 110% of the largest vessel volume." }
        ]
      },
      {
        order: 4,
        title: "Chemical Spill Kit Response Protocols",
        minutes: 4,
        content: "The 4-step spill drill: Protect, Contain, Absorb, Dispose.",
        blocks: [
          { id: "chm5-h1", type: "heading", position: 1, headingText: "Emergency Spill Response" },
          { id: "chm5-t1", type: "short_text", position: 2, bodyText: "1. Don PPE. 2. Place absorbent booms around the spill to protect drains. 3. Apply neutralizing granules. 4. Collect used absorbents in yellow hazardous waste bags for certified disposal." }
        ]
      },
      {
        order: 5,
        title: "Chemical Safety Audit & PPE Verification",
        minutes: 5,
        content: "Daily eyewash station checks, ventilation hoods, and chemical manifests.",
        blocks: [
          { id: "chm6-h1", type: "heading", position: 1, headingText: "Workplace Audit Checklist" },
          { id: "chm6-t1", type: "short_text", position: 2, bodyText: "Test emergency eyewash stations weekly, inspect nitrile gloves for micro-punctures, and maintain an up-to-date hazardous chemical registry." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Under the Globally Harmonized System (GHS), what is the difference between the signal words 'DANGER' and 'WARNING' on a chemical label?",
        options: [
          "'DANGER' is used for more severe hazard categories, whereas 'WARNING' is used for less severe hazards",
          "'DANGER' is for French speakers only and 'WARNING' is for English speakers",
          "'DANGER' means the container is empty",
          "There is zero difference between the two terms"
        ],
        correct: 0,
        correctExplanation: "'DANGER' indicates high-severity hazards (e.g. fatal if swallowed, highly flammable), while 'WARNING' indicates moderate hazards.",
        incorrectExplanation: "Incorrect. Under GHS, 'DANGER' indicates severe hazards and 'WARNING' indicates less severe hazards."
      },
      {
        order: 2,
        question: "Why is it strictly prohibited to decant industrial chemicals into unlabelled beverage bottles or food containers?",
        options: [
          "It is a leading cause of catastrophic accidental poisonings and severe chemical burns because containers can be mistaken for drinking water",
          "Beverage bottles make chemicals evaporate into gold",
          "It causes the chemical to turn into soda",
          "Beverage bottles are too heavy to carry"
        ],
        correct: 0,
        correctExplanation: "Decanting into drinking bottles frequently causes fatal ingestion accidents; all secondary containers must have complete GHS hazard labels.",
        incorrectExplanation: "Incorrect. Unlabelled beverage containers lead to fatal accidental poisonings and burns."
      },
      {
        order: 3,
        question: "Which section of a 16-section Safety Data Sheet (SDS) contains mandatory information regarding Personal Protective Equipment (PPE) and exposure limits?",
        options: [
          "Section 8: Exposure Controls / Personal Protection",
          "Section 1: Identification only",
          "Section 16: Other Information",
          "Section 12: Ecological Information"
        ],
        correct: 0,
        correctExplanation: "Section 8 explicitly specifies required respirator types, chemical glove materials (e.g. nitrile, butyl), and ventilation requirements.",
        incorrectExplanation: "Incorrect. Section 8 details mandatory exposure controls and PPE requirements."
      },
      {
        order: 4,
        question: "What hazardous chemical reaction occurs if strong industrial acids are stored in direct contact with strong cyanide or sulfide compounds?",
        options: [
          "They react violently to generate lethal, toxic hydrogen cyanide or hydrogen sulfide gases",
          "They turn into pure drinking milk",
          "They freeze into solid ice",
          "They produce harmless bubbles of oxygen"
        ],
        correct: 0,
        correctExplanation: "Acids reacting with cyanides release deadly hydrogen cyanide gas, which is fatal within seconds of inhalation.",
        incorrectExplanation: "Incorrect. Mixing acids with cyanides or sulfides produces lethal toxic gases."
      },
      {
        order: 5,
        question: "What is the standard capacity requirement for secondary containment bunds and spill pallets storing industrial chemical drums?",
        options: [
          "Capable of holding at least 110% of the volume of the largest single container stored within the bund",
          "Capable of holding 10% of the container volume",
          "Zero containment required if drums have lids",
          "A cardboard box placed underneath the drum"
        ],
        correct: 0,
        correctExplanation: "110% secondary containment guarantees that complete structural failure of the largest drum is captured entirely.",
        incorrectExplanation: "Incorrect. Secondary bunding must hold at least 110% of the largest stored container volume."
      },
      {
        order: 6,
        question: "What is the immediate first action a chemical handler must take upon discovering a major hazardous liquid chemical spill on the factory floor?",
        options: [
          "Alert nearby workers, evacuate the immediate danger zone, and ensure appropriate chemical PPE (gloves, goggles, respirator) is donned before attempting containment",
          "Wash the chemical into the floor drain with high-pressure tap water",
          "Taste the chemical to identify what it is",
          "Walk through the spill with bare feet"
        ],
        correct: 0,
        correctExplanation: "Worker safety and PPE donning take absolute precedence before executing spill containment procedures.",
        incorrectExplanation: "Incorrect. Alerting workers and donning proper PPE is the mandatory first step before containment."
      },
      {
        order: 7,
        question: "How should used chemical-absorbent pads, booms, and contaminated neutralization granules be disposed of after cleaning up a chemical spill?",
        options: [
          "Sealed in heavy-duty yellow hazardous waste bags, labelled with the chemical identity, and collected by licensed hazardous waste disposal contractors",
          "Thrown into the regular cafeteria compost bin",
          "Burned in an open fire pit behind the factory",
          "Flushed down employee toilets"
        ],
        correct: 0,
        correctExplanation: "Spent spill absorbents carry hazardous chemicals and must be managed under certified hazardous waste manifests.",
        incorrectExplanation: "Incorrect. Used chemical absorbents are classified as hazardous waste and require certified disposal."
      },
      {
        order: 8,
        question: "How frequently must emergency chemical eye wash stations and safety showers be inspected and flushed in industrial workplaces?",
        options: [
          "Weekly routine inspections and flushing to ensure unobstructed access, proper water pressure, and clear sediment-free water",
          "Once every 10 years",
          "Only after an employee gets acid in their eyes",
          "Eye wash stations never require testing"
        ],
        correct: 0,
        correctExplanation: "Weekly activation purges stagnant rust and confirms immediate functionality during life-threatening chemical exposure emergencies.",
        incorrectExplanation: "Incorrect. Emergency eyewash stations and safety showers must be inspected and flushed weekly."
      }
    ]
  },

  // 5. ELH-83: Eco-Driving & Fleet Fuel Efficiency
  {
    id: 83,
    courseCode: "ELH-83",
    slug: "eco-driving-and-fleet-fuel-efficiency",
    title: "Eco-Driving & Fleet Fuel Efficiency",
    description: "Master fuel-efficient commercial vehicle driving techniques: progressive shifting, momentum management, idle reduction, tire pressure, and telematics scoring.",
    fullDescription: "Vehicle fleets represent one of the largest direct fossil fuel expense and carbon emission categories in logistics, distribution, and commercial sales. This course trains professional drivers, couriers, and fleet supervisors on defensive eco-driving techniques that slash fuel consumption by 10-15%, reduce brake wear, and prevent road accidents.",
    categoryId: 2,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Applied Workplace Practice",
    isFeatured: false,
    thumbnailUrl: "/images/courses/eco-driving-fleet.jpg",
    intendedRoles: ["Fleet Drivers", "Delivery Couriers", "Transport Supervisors", "Logistics Coordinators"],
    learningObjectives: [
      "Apply progressive gear shifting and maintain engine RPM in the optimal green band (1,000-1,500 RPM).",
      "Anticipate traffic flow to maximize vehicle kinetic momentum and eliminate aggressive braking.",
      "Eliminate excessive vehicle idling (shutdown policy for stops >60 seconds).",
      "Maintain optimal tire pressure to prevent rolling resistance fuel penalties.",
      "Utilize in-cab telematics feedback scores to track smooth acceleration and cornering.",
      "Complete 8 scenario-based assessment questions on commercial fleet eco-driving."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Eco-Driving & Fleet Fuel Efficiency.",
    badgeName: "Professional Eco-Driver",
    badgeDescription: "Awarded for demonstrating mastery in commercial fleet eco-driving techniques, idle reduction, and fuel conservation.",
    badgeSlug: "professional-eco-driver",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_GHG", "COMP_HEALTH_SAFETY"],
    applicableSectors: ["SEC_LOGISTICS", "SEC_RETAIL", "SEC_HOSPITALITY"],
    applicableDepartments: ["DEP_LOGISTICS", "DEP_OPERATIONS"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR"],
    productionPriority: "p0",
    learningPathPurpose: "Reduce fleet fuel burn by 10-15% through defensive eco-driving and idle reduction.",
    lessons: [
      {
        order: 0,
        title: "The Physics of Vehicle Fuel Consumption",
        minutes: 3,
        content: "Understanding aerodynamic drag, rolling resistance, and kinetic momentum.",
        blocks: [
          { id: "eco1-h1", type: "heading", position: 1, headingText: "Where Fuel Energy Goes" },
          { id: "eco1-t1", type: "short_text", position: 2, bodyText: "In commercial transport, aggressive acceleration and high RPM burn excessive diesel. Driving smoothly with early shifting cuts fuel burn by 10-15% immediately." },
          {
            id: "eco1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Delivery route dilemma:",
            decisionPrompt: "A delivery driver waiting at a customer loading dock in Port Louis leaves the diesel engine idling for 25 minutes with the air conditioning running while waiting for cargo clearance. What should the driver do?",
            decisionChoices: [
              { label: "Turn off the engine during stationary waiting periods exceeding 60 seconds; heavy diesel idling burns 1.5-2.0 litres of fuel per hour with zero mileage", correct: true, feedback: "Spot on! Turning off the engine eliminates wasteful idling fuel burn and engine cylinder glazing." },
              { label: "Rev the engine continuously to keep the battery charged", correct: false, feedback: "Incorrect and highly wasteful." },
              { label: "Drive around the block in circles for 25 minutes", correct: false, feedback: "Incorrect. Stationary shutdown saves fuel." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Progressive Shifting & The RPM Green Band",
        minutes: 3,
        content: "Keeping diesel engines between 1,000 and 1,500 RPM for maximum torque.",
        blocks: [
          { id: "eco2-h1", type: "heading", position: 1, headingText: "Low RPM, High Torque" },
          { id: "eco2-t1", type: "short_text", position: 2, bodyText: "Modern commercial diesel engines produce maximum torque at low RPM (1,100-1,400 RPM). Shifting gears early (before 1,600 RPM) optimizes fuel delivery." }
        ]
      },
      {
        order: 2,
        title: "Anticipation & Momentum Management",
        minutes: 3,
        content: "Reading traffic 15 seconds ahead to eliminate harsh braking.",
        blocks: [
          { id: "eco3-h1", type: "heading", position: 1, headingText: "Smooth Momentum" },
          { id: "eco3-t1", type: "short_text", position: 2, bodyText: "Every time you brake hard, kinetic energy produced by fuel is wasted as brake rotor heat. Coasting in gear uses zero fuel via modern electronic fuel cutoff." }
        ]
      },
      {
        order: 3,
        title: "Tire Pressure & Aerodynamic Drag",
        minutes: 3,
        content: "Preventing rolling resistance and maintaining tire inflation specs.",
        blocks: [
          { id: "eco4-h1", type: "heading", position: 1, headingText: "Tires & Fuel Economy" },
          { id: "eco4-t1", type: "short_text", position: 2, bodyText: "Under-inflated tires by just 0.5 bar increase rolling resistance, increasing fuel consumption by 3% while accelerating tire tread wear." }
        ]
      },
      {
        order: 4,
        title: "Telematics Scoring & Driver Safety",
        minutes: 4,
        content: "Understanding G-force cornering, harsh braking alarms, and speed caps.",
        blocks: [
          { id: "eco5-h1", type: "heading", position: 1, headingText: "Telematics Feedback" },
          { id: "eco5-t1", type: "short_text", position: 2, bodyText: "In-cab telematics systems track harsh events. Eco-driving not only saves fuel but correlates with a 40% reduction in vehicle collision rates." }
        ]
      },
      {
        order: 5,
        title: "Professional Eco-Driver Action Pledge",
        minutes: 4,
        content: "Commit to daily pre-trip tire checks and zero unnecessary idling.",
        blocks: [
          { id: "eco6-h1", type: "heading", position: 1, headingText: "Driver Commitment" },
          { id: "eco6-t1", type: "short_text", position: 2, bodyText: "Commit to the 60-second idle shutdown rule, smooth progressive gear shifts, and daily tire pressure checks." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "What is the primary driving technique for maintaining optimal fuel efficiency in modern commercial diesel vehicles?",
        options: [
          "Progressive gear shifting to keep engine RPM in the optimal torque 'green band' (typically 1,100 to 1,500 RPM)",
          "Revving the engine to the redline before shifting gears",
          "Driving exclusively in neutral with the clutch depressed",
          "Accelerating at maximum throttle from every stop"
        ],
        correct: 0,
        correctExplanation: "Diesel engines deliver peak torque at low RPM; shifting early keeps the engine in its most efficient thermodynamic zone.",
        incorrectExplanation: "Incorrect. Shifting early to keep RPM in the 1,100–1,500 range optimizes diesel fuel efficiency."
      },
      {
        order: 2,
        question: "How does excessive vehicle idling impact commercial fleet operational costs and engine health?",
        options: [
          "Idling burns 1.5 to 2.0 litres of fuel per hour with zero distance covered, while accelerating carbon deposits and engine cylinder glazing",
          "Idling recharges the fuel tank with free diesel",
          "Idling repairs engine spark plugs automatically",
          "Idling has zero impact on fuel or engines"
        ],
        correct: 0,
        correctExplanation: "Idling wastes fuel, increases emissions, and causes incomplete combustion soot buildup inside diesel particulate filters (DPFs).",
        incorrectExplanation: "Incorrect. Heavy idling wastes 1.5–2.0 L/hr and accelerates engine cylinder wear."
      },
      {
        order: 3,
        question: "What happens to fuel consumption when an electronic fuel-injected commercial vehicle coasts in gear with the accelerator pedal released?",
        options: [
          "The engine ECU cuts fuel injection to zero (0.0 L/100km) while vehicle momentum keeps the engine spinning",
          "The vehicle consumes double fuel",
          "The engine turns off permanently",
          "The tires inflate with air"
        ],
        correct: 0,
        correctExplanation: "Modern vehicle ECUs cut fuel injection completely during decelerative coasting in gear, delivering zero fuel burn.",
        incorrectExplanation: "Incorrect. Decelerating in gear triggers automatic fuel cutoff (0.0 L/100km fuel consumption)."
      },
      {
        order: 4,
        question: "How does maintaining correct manufacturer tire inflation pressures directly reduce vehicle operating costs?",
        options: [
          "It minimizes rolling resistance, saving 2% to 4% in fuel consumption while extending tire tread life and preventing blowouts",
          "It makes the vehicle drive without tires",
          "It converts the vehicle into an airplane",
          "It removes the need to change engine oil"
        ],
        correct: 0,
        correctExplanation: "Properly inflated tires roll easily without excessive friction, cutting fuel burn and prolonging casing life.",
        incorrectExplanation: "Incorrect. Correct tire inflation cuts rolling resistance, saving 2–4% in fuel and extending tire life."
      },
      {
        order: 5,
        question: "What is the recommended operational rule regarding vehicle idling during commercial deliveries or waiting periods?",
        options: [
          "Turn off the engine if stationary waiting is expected to exceed 60 seconds (unless operating specialized PTO refrigeration equipment)",
          "Leave the engine running for at least 3 hours",
          "Rev the engine to maximum speed every 2 minutes",
          "Never turn off the engine during a working day"
        ],
        correct: 0,
        correctExplanation: "Restarting a warm commercial engine uses less fuel than 10 seconds of idling; the 60-second rule saves immense fuel.",
        incorrectExplanation: "Incorrect. The standard eco-driving policy mandates shutting off engines for stops >60 seconds."
      },
      {
        order: 6,
        question: "Why is driving with aggressive, rapid acceleration and late, harsh braking detrimental to fleet sustainability?",
        options: [
          "It increases fuel consumption by up to 30%, multiplies tire and brake pad wear, and significantly increases traffic accident risk",
          "It cleans the engine exhaust pipe",
          "It makes the vehicle lighter",
          "It cools down the braking rotors"
        ],
        correct: 0,
        correctExplanation: "Aggressive driving converts expensive chemical fuel into wasted brake friction heat and dramatically increases collision risk.",
        incorrectExplanation: "Incorrect. Aggressive driving spikes fuel burn by up to 30% and accelerates brake wear."
      },
      {
        order: 7,
        question: "How do fleet telematics scorecards (measuring harsh braking, speeding, and idle time) benefit drivers?",
        options: [
          "They provide objective feedback to support safe, smooth driving habits, reducing driving stress and qualifying drivers for eco-bonuses",
          "They secretly reduce driver salaries",
          "They lock the vehicle steering wheel during turns",
          "They disable vehicle headlights at night"
        ],
        correct: 0,
        correctExplanation: "Telematics scorecards gamify defensive eco-driving, rewarding drivers for safety, smoothness, and fuel efficiency.",
        incorrectExplanation: "Incorrect. Telematics provide objective feedback to promote driver safety and fuel conservation rewards."
      },
      {
        order: 8,
        question: "How does aerodynamic drag affect commercial vehicle fuel consumption at highway speeds (e.g. 80-90 km/h)?",
        options: [
          "Aerodynamic drag increases exponentially with speed, accounting for over 50% of total vehicle engine power requirement on highways",
          "Aerodynamic drag disappears on highways",
          "Vehicles produce electricity from air drag",
          "Speed has zero relationship to aerodynamic drag"
        ],
        correct: 0,
        correctExplanation: "Aerodynamic resistance increases with the square of vehicle speed, making moderate highway cruising speeds significantly more fuel-efficient.",
        incorrectExplanation: "Incorrect. Aerodynamic drag increases exponentially with speed, requiring >50% of engine power at highway speeds."
      }
    ]
  },

  // 6. ELH-85: Sustainable Warehouse Operations
  {
    id: 85,
    courseCode: "ELH-85",
    slug: "sustainable-warehouse-operations",
    title: "Sustainable Warehouse Operations",
    description: "Optimize high-bay LED lighting controls, electric material handling equipment (MHE) charging, thermal building envelope insulation, and pallet stretch-wrap reduction in distribution centres.",
    fullDescription: "Warehouses and logistics distribution centres in Mauritius consume significant electricity for high-bay lighting, cold storage staging, and electric forklift fleets. This course trains warehouse managers, logistics supervisors, and inventory leads on motion-sensor lighting zones, battery charging off-peak schedules, corrugated box right-sizing, and circular pallet stretch-wrap management.",
    categoryId: 2,
    durationMinutes: 25,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/sustainable-warehouse-operations.jpg",
    intendedRoles: ["Warehouse Managers", "Logistics Supervisors", "Inventory Leads", "Material Handling Operators", "Facilities Leads"],
    learningObjectives: [
      "Implement zoned high-bay LED lighting with aisle-level motion sensors.",
      "Manage electric forklift battery charging during off-peak CEB utility tariff windows.",
      "Optimize dock door seals to prevent thermal air conditioning loss in cold storage areas.",
      "Eliminate single-use plastic stretch wrap through high-yield pre-stretch dispensers and reusable pallet wraps.",
      "Implement packaging right-sizing to eliminate void-fill waste and reduce transport cube.",
      "Complete 8 scenario-based assessment questions on sustainable warehouse operations."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Sustainable Warehouse Operations.",
    badgeName: "Sustainable Logistics & Warehouse Specialist",
    badgeDescription: "Awarded for demonstrating operational excellence in distribution centre energy efficiency, packaging reduction, and circular warehousing.",
    badgeSlug: "sustainable-warehouse-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_CIRCULARITY", "COMP_GHG"],
    applicableSectors: ["SEC_LOGISTICS", "SEC_RETAIL", "SEC_MANUFACTURING"],
    applicableDepartments: ["DEP_LOGISTICS", "DEP_OPERATIONS", "DEP_FACILITIES"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Optimize lighting, forklift charging, and packaging in logistics distribution centres.",
    lessons: [
      {
        order: 0,
        title: "Energy & Material Flows in Distribution Centres",
        minutes: 4,
        content: "Understanding warehouse energy intensity across lighting, charging, and thermal storage.",
        blocks: [
          { id: "wh1-h1", type: "heading", position: 1, headingText: "High-Bay Energy Consumption" },
          { id: "wh1-t1", type: "short_text", position: 2, bodyText: "In distribution warehouses, continuous lighting of unoccupied aisles and uninsulated dock doors create massive utility overheads." },
          {
            id: "wh1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Distribution centre challenge:",
            decisionPrompt: "During busy afternoon loading, loading bay roll-up doors are left wide open for 4 hours while refrigerated goods are staged nearby. The ambient outdoor temperature is 32°C. What should the warehouse supervisor do?",
            decisionChoices: [
              { label: "Enforce strict dock door seal protocols and rapid roll-up door interlocks so doors open only when trucks are actively backed into airtight seals", correct: true, feedback: "Spot on! Leaving dock doors open allows massive tropical heat infiltration into cooled storage areas." },
              { label: "Leave doors open permanently to air out the warehouse", correct: false, feedback: "Incorrect. Infiltration destroys thermal efficiency and risks condensation spoilage." },
              { label: "Turn off warehouse cooling entirely", correct: false, feedback: "Incorrect. Temperature-sensitive inventory must be preserved." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Aisle-Level Motion Sensor LED Controls",
        minutes: 4,
        content: "Switching from constant high-bay discharge lamps to smart zoned LEDs.",
        blocks: [
          { id: "wh2-h1", type: "heading", position: 1, headingText: "Intelligent Aisle Lighting" },
          { id: "wh2-t1", type: "short_text", position: 2, bodyText: "Installing occupancy sensors on each racking aisle dims lighting to 10% standby when vacant, cutting lighting power draw by over 60%." }
        ]
      },
      {
        order: 2,
        title: "Electric Forklift & MHE Battery Management",
        minutes: 4,
        content: "Off-peak charging schedules, lithium-ion opportunity charging, and battery life.",
        blocks: [
          { id: "wh3-h1", type: "heading", position: 1, headingText: "Smart Charging Regimes" },
          { id: "wh3-t1", type: "short_text", position: 2, bodyText: "Schedule heavy forklift charging during off-peak night utility tariffs to avoid peak demand surcharges." }
        ]
      },
      {
        order: 3,
        title: "Packaging Right-Sizing & Plastic Stretch-Wrap Reduction",
        minutes: 4,
        content: "High-yield power pre-stretch dispensers and reusable strapping.",
        blocks: [
          { id: "wh4-h1", type: "heading", position: 1, headingText: "Circular Packaging Loops" },
          { id: "wh4-t1", type: "short_text", position: 2, bodyText: "High-yield pallet wrapping machines pre-stretch plastic film by 250-300%, halving film usage per pallet while securing cargo." }
        ]
      },
      {
        order: 4,
        title: "Warehouse Waste Segregation & Corrugated Baling",
        minutes: 4,
        content: "Compacting clean cardboard boxes and plastic film for certified recycling.",
        blocks: [
          { id: "wh5-h1", type: "heading", position: 1, headingText: "Cardboard & Plastic Baling" },
          { id: "wh5-t1", type: "short_text", position: 2, bodyText: "Baling corrugated cardboard on site creates dense recyclable commodities that generate revenue rather than waste hauling costs." }
        ]
      },
      {
        order: 5,
        title: "Sustainable Warehousing Operational Action Plan",
        minutes: 5,
        content: "Daily dock seal inspections, pallet recycling loops, and energy monitoring.",
        blocks: [
          { id: "wh6-h1", type: "heading", position: 1, headingText: "Warehouse Manager's Checklist" },
          { id: "wh6-t1", type: "short_text", position: 2, bodyText: "Commit to weekly dock door seal maintenance, stretch wrap yield checks, and off-peak charging enforcement." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "How does installing aisle-level occupancy motion sensors on warehouse high-bay LED fixtures save energy?",
        options: [
          "It automatically dims or turns off lighting in racking aisles when no forklift or worker is present, reducing lighting energy consumption by up to 60%",
          "It makes forklifts drive faster",
          "It turns warehouse lights into heating radiators",
          "It removes the need to have light bulbs"
        ],
        correct: 0,
        correctExplanation: "Warehouse aisles are typically occupied only 20-30% of the working shift; sensor controls eliminate empty aisle lighting waste.",
        incorrectExplanation: "Incorrect. Motion sensors dim empty aisles, cutting high-bay lighting energy by up to 60%."
      },
      {
        order: 2,
        question: "Why should warehouse managers schedule electric forklift and Material Handling Equipment (MHE) battery charging during night-time hours?",
        options: [
          "To take advantage of lower off-peak electricity tariffs and prevent expensive daytime peak power demand surcharges",
          "Because batteries only charge in darkness",
          "Because electricity is free on weekends",
          "To prevent forklifts from making noise during the day"
        ],
        correct: 0,
        correctExplanation: "Off-peak charging avoids peak demand kW surcharges and utilizes cheaper nocturnal electricity.",
        incorrectExplanation: "Incorrect. Off-peak night charging minimizes utility tariffs and peak demand penalties."
      },
      {
        order: 3,
        question: "What is the environmental and financial consequence of leaving warehouse loading dock doors open in tropical climates?",
        options: [
          "Massive infiltration of hot, humid outdoor air into cooled storage areas, causing extreme refrigeration energy spikes and moisture condensation on goods",
          "It cleans the warehouse floor with outside wind",
          "It creates free air conditioning for the trucks",
          "It turns humidity into electricity"
        ],
        correct: 0,
        correctExplanation: "Open dock doors allow immense thermal energy infiltration and create severe condensation risks on stored inventory.",
        incorrectExplanation: "Incorrect. Open dock doors cause massive refrigeration energy losses and condensation risks."
      },
      {
        order: 4,
        question: "How does installing automated high-yield power pre-stretch pallet wrapping machines reduce plastic waste?",
        options: [
          "They mechanically stretch plastic film by 250% to 300% prior to pallet application, cutting plastic stretch-wrap mass by more than half while maintaining load stability",
          "They eliminate the need to secure pallets during shipping",
          "They convert plastic film into wooden boards",
          "They wrap pallets using pure water"
        ],
        correct: 0,
        correctExplanation: "Power pre-stretching elongates film efficiently, securing loads with less than half the virgin plastic material.",
        incorrectExplanation: "Incorrect. High-yield pre-stretching cuts plastic film consumption by over 50% while securing pallets."
      },
      {
        order: 5,
        question: "What is 'box right-sizing' in e-commerce and retail distribution packaging?",
        options: [
          "Selecting or custom-cutting shipping cartons to closely match the product volume, minimizing void-fill plastic bubbles and maximizing truck cube utilization",
          "Using giant oversized boxes for every tiny item",
          "Shipping items without any box or label",
          "Painting all boxes green"
        ],
        correct: 0,
        correctExplanation: "Right-sizing cartons eliminates void-fill plastic waste and fits more packages onto delivery vehicles.",
        incorrectExplanation: "Incorrect. Box right-sizing eliminates void-fill waste and maximizes transport space efficiency."
      },
      {
        order: 6,
        question: "Why should distribution warehouses segregate and compact clean corrugated cardboard and clear LDPE plastic film in on-site balers?",
        options: [
          "Baled recyclables command premium commodity market prices, generate revenue, and eliminate expensive general waste hauling tipping fees",
          "Baled cardboard turns into concrete",
          "It makes garbage trucks look full",
          "Baling makes cardboard waterproof"
        ],
        correct: 0,
        correctExplanation: "Clean baled cardboard and plastic are high-value recycling commodities that generate revenue rather than disposal fees.",
        incorrectExplanation: "Incorrect. Baling clean cardboard and film turns waste into revenue and cuts hauling costs."
      },
      {
        order: 7,
        question: "How do High-Volume Low-Speed (HVLS) ceiling fans improve warehouse thermal efficiency?",
        options: [
          "They destratify hot air trapped at high ceilings, creating gentle evaporative cooling for workers in summer and reducing floor-to-ceiling thermal gradients",
          "They generate gale-force winds that blow dust onto products",
          "They consume more electricity than central air conditioning",
          "They freeze water pipes in the floor"
        ],
        correct: 0,
        correctExplanation: "HVLS fans mix stratified air layers, keeping floor-level workers comfortable with minimal electrical draw.",
        incorrectExplanation: "Incorrect. HVLS fans destratify warehouse air and provide cooling airflow with low energy power."
      },
      {
        order: 8,
        question: "What is a sustainable alternative to single-use plastic stretch wrap for internal closed-loop warehouse transfers?",
        options: [
          "Reusable pallet wraps with heavy-duty velcro straps and elasticized cargo nets",
          "Duct tape wrapped 50 times around each pallet",
          "Paper towels glued together",
          "Leaving boxes unstacked loosely on the floor"
        ],
        correct: 0,
        correctExplanation: "Reusable velcro pallet covers can be reused hundreds of times in closed loops, eliminating single-use plastic film entirely.",
        incorrectExplanation: "Incorrect. Reusable velcro wraps eliminate single-use plastic film in internal closed-loop distribution."
      }
    ]
  },

  // 7. ELH-117: Setting SMART Departmental Sustainability Targets
  {
    id: 117,
    courseCode: "ELH-117",
    slug: "setting-smart-departmental-sustainability-targets",
    title: "Setting SMART Departmental Sustainability Targets",
    description: "Formulate Specific, Measurable, Achievable, Relevant, and Time-bound sustainability KPIs across departmental operations.",
    fullDescription: "Corporate sustainability strategies often fail because high-level ESG commitments are not translated into operational departmental targets. This course equips department heads, line supervisors, and operations managers with practical frameworks to establish auditable resource baselines, define intensity metrics, assign accountable champions, and establish quarterly review cadences.",
    categoryId: 3,
    durationMinutes: 25,
    priceUsd: "1400.00",
    level: "Management & Leadership",
    isFeatured: false,
    thumbnailUrl: "/images/courses/smart-sustainability-targets.jpg",
    intendedRoles: ["Department Managers", "Line Supervisors", "Operations Leads", "Sustainability Champions"],
    learningObjectives: [
      "Translate high-level corporate ESG goals into departmental SMART targets.",
      "Establish accurate operational baselines and normalize resource use using intensity metrics.",
      "Assign single-point accountability for resource tracking within departmental teams.",
      "Establish quarterly KPI review cadences and variance analysis protocols.",
      "Complete 8 scenario-based assessment questions on departmental sustainability target setting."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Setting SMART Departmental Sustainability Targets.",
    badgeName: "Departmental Sustainability Target Lead",
    badgeDescription: "Awarded for demonstrating management competence in formulating SMART sustainability KPIs and operational baselines.",
    badgeSlug: "smart-sustainability-target-lead",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_ESG_DATA", "COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Equip managers to translate corporate ESG policy into departmental SMART operational targets.",
    lessons: [
      {
        order: 0,
        title: "From Corporate Policy to Departmental Reality",
        minutes: 4,
        content: "Why vague goals like 'be more green' fail to drive operational change.",
        blocks: [
          { id: "smt1-h1", type: "heading", position: 1, headingText: "The Need for Precision" },
          { id: "smt1-t1", type: "short_text", position: 2, bodyText: "Telling an operations team to 'save energy' produces zero measurable results. Setting a target to 'Reduce kilowatt-hours per production unit by 8% by Q4' creates clear operational focus." },
          {
            id: "smt1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Management target setting session:",
            decisionPrompt: "The Head of Logistics submits their annual goal: 'Improve environmental performance across our fleet this year.' How should the Operations Director respond?",
            decisionChoices: [
              { label: "Reject the goal as unmeasurable and work with the manager to formulate a SMART target: 'Reduce fleet diesel consumption from 34.2 L/100km to 30.5 L/100km (an 11% reduction) by December 31 through telematics driver coaching and route optimization'", correct: true, feedback: "Spot on! Specific, quantifiable metrics with deadlines enable accountability and performance tracking." },
              { label: "Approve the vague goal because it sounds positive", correct: false, feedback: "Incorrect. Vague goals cannot be tracked or audited." },
              { label: "Ban the logistics department from using vehicles", correct: false, feedback: "Unrealistic. Targets must balance operational continuity with efficiency." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Constructing the SMART Target Architecture",
        minutes: 4,
        content: "Defining Specific, Measurable, Achievable, Relevant, and Time-bound parameters.",
        blocks: [
          { id: "smt2-h1", type: "heading", position: 1, headingText: "The 5 SMART Pillars" },
          { id: "smt2-t1", type: "short_text", position: 2, bodyText: "Every target must define: 1. Specific resource, 2. Measurable unit, 3. Achievable benchmark, 4. Relevance to corporate ESG policy, 5. Fixed deadline." }
        ]
      },
      {
        order: 2,
        title: "Establishing Baselines & Normalization Metrics",
        minutes: 4,
        content: "Absolute metrics vs intensity metrics (per guest-night, per tonne produced, per m²).",
        blocks: [
          { id: "smt3-h1", type: "heading", position: 1, headingText: "Intensity Normalization" },
          { id: "smt3-t1", type: "short_text", position: 2, bodyText: "Absolute energy consumption rises when factory production increases. Intensity metrics (kWh per product unit) measure true underlying operational efficiency." }
        ]
      },
      {
        order: 3,
        title: "Assigning Single-Point Accountability",
        minutes: 4,
        content: "Naming individual process owners rather than vague departmental groups.",
        blocks: [
          { id: "smt4-h1", type: "heading", position: 1, headingText: "Clear Ownership" },
          { id: "smt4-t1", type: "short_text", position: 2, bodyText: "When 'everybody' is responsible for water savings, nobody is. Designate named process champions for weekly meter reading and valve audits." }
        ]
      },
      {
        order: 4,
        title: "Quarterly Review Cadence & Variance Diagnostics",
        minutes: 4,
        content: "Running structured monthly/quarterly variance reviews to correct target drift.",
        blocks: [
          { id: "smt5-h1", type: "heading", position: 1, headingText: "Variance Management" },
          { id: "smt5-t1", type: "short_text", position: 2, bodyText: "Reviewing metrics once a year guarantees failure. Monthly reviews identify anomalies within 30 days, enabling swift corrective engineering actions." }
        ]
      },
      {
        order: 5,
        title: "Departmental Target Setting Template & Rollout",
        minutes: 5,
        content: "Deploying standard KPI templates across departmental teams.",
        blocks: [
          { id: "smt6-h1", type: "heading", position: 1, headingText: "Departmental Rollout" },
          { id: "smt6-t1", type: "short_text", position: 2, bodyText: "Integrate SMART sustainability targets directly into annual management performance reviews and bonus structures." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "What is the fundamental reason why vague departmental goals such as 'Do our best to recycle more' routinely fail?",
        options: [
          "They lack specific measurable baselines, quantitative milestones, named owners, and deadlines, making accountability and audit verification impossible",
          "Recycling is physically impossible in offices",
          "Recycling causes computers to malfunction",
          "Vague goals always cost millions of dollars to write"
        ],
        correct: 0,
        correctExplanation: "Without quantifiable metrics and deadlines, staff lack clear operating parameters and managers cannot evaluate performance.",
        incorrectExplanation: "Incorrect. Vague goals lack measurable baselines and accountability, leading to zero action."
      },
      {
        order: 2,
        question: "In the SMART KPI framework, what does an 'Intensity Metric' (e.g. litres of water per guest-night or kWh per tonne of sugar) measure compared to an absolute metric?",
        options: [
          "It normalizes resource consumption against business activity volume, measuring true operational efficiency regardless of production increases or decreases",
          "It measures how intensely angry workers are about water",
          "It measures the weight of the water meter",
          "It eliminates the need to measure water at all"
        ],
        correct: 0,
        correctExplanation: "Intensity metrics isolate true operational efficiency from business volume fluctuations.",
        incorrectExplanation: "Incorrect. Intensity metrics normalize resource use against operational output (e.g. per guest-night, per unit)."
      },
      {
        order: 3,
        question: "Which of the following represents a fully formulated SMART departmental sustainability target?",
        options: [
          "Reduce office paper ream purchasing by 30% (from 500 reams to 350 reams per month) by Q3 2026 through digital document signing workflows, overseen by the Administration Lead",
          "Make the workplace greener sometime next year",
          "Stop using electricity permanently",
          "Ask employees to think about trees on Fridays"
        ],
        correct: 0,
        correctExplanation: "This target defines a specific resource, numerical baseline/target, clear deadline, implementation mechanism, and named owner.",
        incorrectExplanation: "Incorrect. The first option is the only specific, measurable, actionable, relevant, and time-bound target."
      },
      {
        order: 4,
        question: "Why is 'Single-Point Accountability' essential when assigning departmental sustainability targets?",
        options: [
          "When responsibility is vaguely shared among an entire group, no individual monitors the metric or takes corrective action when variance occurs",
          "It allows the company to fire everyone except one person",
          "Single-point accountability makes computers run faster",
          "It eliminates the need for team communication"
        ],
        correct: 0,
        correctExplanation: "Assigning a named process owner ensures regular tracking, problem reporting, and focused execution.",
        incorrectExplanation: "Incorrect. Named single-point accountability ensures dedicated tracking and timely escalation."
      },
      {
        order: 5,
        question: "What is the recommended frequency for departmental managers to review operational sustainability metrics against targets?",
        options: [
          "Monthly review cadences (with quarterly formal management scorecards) to identify consumption anomalies before they compound over time",
          "Once every 5 years",
          "Only when the government conducts a regulatory inspection",
          "Never review data after setting the target"
        ],
        correct: 0,
        correctExplanation: "Monthly reviews detect leaks, valve failures, or behavioural drift within weeks rather than discovering massive losses at year-end.",
        incorrectExplanation: "Incorrect. Monthly reviews allow timely corrective action before resource waste compounds."
      },
      {
        order: 6,
        question: "What should a department manager do during a quarterly review if a sustainability KPI is significantly off-track (e.g. energy use is +15% over target)?",
        options: [
          "Conduct a root-cause variance analysis, identify operational anomalies or equipment faults, and implement documented corrective action plans with follow-up milestones",
          "Delete the KPI report to hide the failure",
          "Blame the weather and cancel the sustainability program",
          "Double the annual target to make up for it"
        ],
        correct: 0,
        correctExplanation: "Root-cause analysis investigates whether the spike was caused by production volume, mechanical failure, or control drift.",
        incorrectExplanation: "Incorrect. Managers must conduct root-cause variance analysis and deploy corrective actions."
      },
      {
        order: 7,
        question: "How can executive leadership ensure departmental managers actively prioritize their sustainability targets alongside financial budgets?",
        options: [
          "Integrate departmental sustainability KPIs directly into balanced scorecards and management performance appraisals linked to annual bonuses",
          "Send motivational greeting cards once a year",
          "Prohibit managers from checking financial budgets",
          "Replace managers with automated chatbots"
        ],
        correct: 0,
        correctExplanation: "Linking sustainability targets to executive appraisals and bonus criteria makes environmental performance a core business priority.",
        incorrectExplanation: "Incorrect. Integrating KPIs into performance appraisals and bonuses aligns managerial priorities."
      },
      {
        order: 8,
        question: "What is an 'operational baseline' in sustainability target setting, and why is it necessary?",
        options: [
          "A verified, audited record of historical resource consumption over a representative period (e.g. 12 months) against which all future progress is measured",
          "A line painted on the factory floor",
          "The maximum amount of money a company can spend",
          "An estimate made without any utility bills"
        ],
        correct: 0,
        correctExplanation: "Accurate historical baselines provide the factual reference point required to calculate and audit true percentage reductions.",
        incorrectExplanation: "Incorrect. Baselines provide the verified historical benchmark required to measure future progress."
      }
    ]
  },

  // 8. ELH-118: Managing Sustainability Performance & KPIs
  {
    id: 118,
    courseCode: "ELH-118",
    slug: "managing-sustainability-performance-and-kpis",
    title: "Managing Sustainability Performance & KPIs",
    description: "Lead monthly sustainability variance reviews, calculate GHG emission factors, manage sub-meter data integrity, and lead corrective action plans.",
    fullDescription: "Tracking sustainability metrics is useless without active performance management. This course equips operational leaders and department heads with practical skills to run structured monthly variance reviews, calculate carbon intensity metrics, validate utility data integrity, and implement corrective action workflows when performance deviates.",
    categoryId: 3,
    durationMinutes: 25,
    priceUsd: "1400.00",
    level: "Management & Leadership",
    isFeatured: false,
    thumbnailUrl: "/images/courses/managing-sustainability-kpis.jpg",
    intendedRoles: ["Operations Managers", "Department Heads", "Facilities Managers", "ESG Coordinators"],
    learningObjectives: [
      "Structure and lead monthly departmental sustainability performance reviews.",
      "Conduct quantitative variance analysis on water, electricity, and waste metrics.",
      "Audit sub-meter data feeds and eliminate telemetry drift or missing data logs.",
      "Deploy 5-Why root-cause problem solving for environmental non-conformances.",
      "Complete 8 scenario-based assessment questions on sustainability KPI management."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Managing Sustainability Performance & KPIs.",
    badgeName: "Sustainability KPI & Performance Manager",
    badgeDescription: "Awarded for demonstrating management mastery in sustainability variance analysis, data governance, and operational problem solving.",
    badgeSlug: "sustainability-kpi-manager",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_LEADERSHIP",
    secondaryCompetencies: ["COMP_ESG_DATA", "COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: [],
    applicableJobFamilies: ["JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Lead monthly variance reviews and root-cause corrective action for sustainability KPIs.",
    lessons: [
      {
        order: 0,
        title: "The Anatomy of a Sustainability Variance Review",
        minutes: 4,
        content: "Running structured 30-minute monthly reviews with cross-functional leads.",
        blocks: [
          { id: "kpi1-h1", type: "heading", position: 1, headingText: "Data Without Action is Overhead" },
          { id: "kpi1-t1", type: "short_text", position: 2, bodyText: "A monthly KPI review should follow a rigorous agenda: 1. Target vs Actual Variance, 2. Root Cause of Outliers, 3. Corrective Action Ownership, 4. 30-day Follow-up." },
          {
            id: "kpi1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Monthly operations review:",
            decisionPrompt: "During the monthly review, water consumption in the laundry department shows a 28% spike over budget. The laundry lead claims 'we washed more linen.' What should the Operations Manager do?",
            decisionChoices: [
              { label: "Check the laundry water intensity metric (litres per kg of dry linen washed); if litres per kg jumped from 14 L/kg to 22 L/kg, this proves an operational leak or rinse valve malfunction rather than production growth", correct: true, feedback: "Spot on! Intensity metrics isolate equipment faults from production volume increases." },
              { label: "Accept the explanation without checking data and close the meeting", correct: false, feedback: "Incorrect. Managers must verify intensity metrics to catch hidden leaks." },
              { label: "Shut down the laundry permanently", correct: false, feedback: "Unacceptable operational disruption." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Variance Analysis & Outlier Detection",
        minutes: 4,
        content: "Distinguishing common cause variation from special cause mechanical faults.",
        blocks: [
          { id: "kpi2-h1", type: "heading", position: 1, headingText: "Detecting Spikes" },
          { id: "kpi2-t1", type: "short_text", position: 2, bodyText: "Use statistical control charts: any monthly metric exceeding 2 standard deviations from the mean represents an operational malfunction requiring mandatory investigation." }
        ]
      },
      {
        order: 2,
        title: "Sub-Meter Telemetry & Data Governance",
        minutes: 4,
        content: "Auditing IoT pulses, calibration certificates, and missing data imputation.",
        blocks: [
          { id: "kpi3-h1", type: "heading", position: 1, headingText: "Trusting the Numbers" },
          { id: "kpi3-t1", type: "short_text", position: 2, bodyText: "Sub-meters drift over time. Establish quarterly calibration checks and clear data validation rules before reporting to executive boards." }
        ]
      },
      {
        order: 3,
        title: "The 5-Why Root-Cause Corrective Workflow",
        minutes: 4,
        content: "Digging beneath superficial symptoms to fix underlying systemic failures.",
        blocks: [
          { id: "kpi4-h1", type: "heading", position: 1, headingText: "5-Why in Action" },
          { id: "kpi4-t1", type: "short_text", position: 2, bodyText: "Why did energy spike? AC ran 24/7. Why? BMS set to HAND. Why? Night event. Why left ON? No automated timer override SOP." }
        ]
      },
      {
        order: 4,
        title: "Escalation Thresholds & Executive Dashboards",
        minutes: 4,
        content: "When and how to escalate environmental non-compliance to the Executive Committee.",
        blocks: [
          { id: "kpi5-h1", type: "heading", position: 1, headingText: "Executive Visibility" },
          { id: "kpi5-t1", type: "short_text", position: 2, bodyText: "Provide concise Red/Amber/Green (RAG) dashboards showing financial impact, carbon footprint, and corrective action status." }
        ]
      },
      {
        order: 5,
        title: "Performance Management Standard Operating Procedure",
        minutes: 5,
        content: "Institutionalize the monthly KPI review cycle across all business units.",
        blocks: [
          { id: "kpi6-h1", type: "heading", position: 1, headingText: "Institutional Cadence" },
          { id: "kpi6-t1", type: "short_text", position: 2, bodyText: "Embed the 30-day KPI review into the mandatory operating cadence of every department." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "How does a manager distinguish whether a utility cost increase is due to business growth or operational waste?",
        options: [
          "By tracking normalized intensity metrics (e.g. kWh per unit produced, litres per guest-night) rather than relying solely on absolute utility totals",
          "By asking the utility company to reduce their bills",
          "By checking the weather forecast",
          "By guessing based on employee attendance"
        ],
        correct: 0,
        correctExplanation: "Intensity metrics divide total resource consumption by business activity, revealing whether underlying process efficiency improved or worsened.",
        incorrectExplanation: "Incorrect. Intensity metrics normalize resource consumption against production volume to isolate true efficiency."
      },
      {
        order: 2,
        question: "What is the primary objective of applying the '5-Why' problem-solving technique during a sustainability variance investigation?",
        options: [
          "To drill past superficial symptoms and identify the underlying systemic, procedural, or mechanical root cause of an environmental non-conformance",
          "To ask five different employees the same question",
          "To waste time during management meetings",
          "To find an employee to blame and punish"
        ],
        correct: 0,
        correctExplanation: "5-Why investigates successive causal layers until the core procedural or hardware deficiency is identified.",
        incorrectExplanation: "Incorrect. 5-Why uncovers the systemic root cause behind operational failures."
      },
      {
        order: 3,
        question: "What should a management team do if IoT sub-meter data displays continuous zero consumption for three consecutive days in an active factory zone?",
        options: [
          "Trigger an immediate telemetry data alert to inspect the sub-meter hardware, wiring, and network gateway for communication failure",
          "Celebrate having achieved zero energy consumption",
          "Delete the sub-meter from the software",
          "Turn off the factory power supply"
        ],
        correct: 0,
        correctExplanation: "Zero flatlines in active facilities represent hardware or network communication dropouts that must be resolved immediately.",
        incorrectExplanation: "Incorrect. Flatline data indicates a telemetry or hardware sensor failure that requires immediate technical maintenance."
      },
      {
        order: 4,
        question: "In executive sustainability dashboards, what does a 'Red' status typically indicate in a standard Red/Amber/Green (RAG) governance framework?",
        options: [
          "The KPI has breached tolerance thresholds (e.g. >10% off target) and requires an executive-approved corrective action plan with designated milestones",
          "The department has exceeded all expectations",
          "The data is confidential and cannot be viewed",
          "The company has run out of printer toner"
        ],
        correct: 0,
        correctExplanation: "Red status signifies material deviation requiring formal corrective action plans and executive oversight.",
        incorrectExplanation: "Incorrect. Red status flags material target breaches requiring formal corrective action."
      },
      {
        order: 5,
        question: "Why should monthly departmental sustainability reviews always conclude with a documented 'Action Log'?",
        options: [
          "To record specific corrective tasks, assigned individual owners, and firm 30-day completion deadlines that are reviewed at the next meeting",
          "To provide decorative reading material for the reception lobby",
          "To replace legal contracts",
          "Action logs are not recommended in modern management"
        ],
        correct: 0,
        correctExplanation: "Documented action logs ensure individual accountability and close the loop on corrective action implementation.",
        incorrectExplanation: "Incorrect. Action logs assign named owners and firm deadlines for all corrective tasks."
      },
      {
        order: 6,
        question: "How should a manager handle a situation where a line supervisor consistently fails to log monthly waste and water metrics?",
        options: [
          "Address the data omission in formal supervisory 1-on-1s, reinforce that data integrity is a core job responsibility, and provide refresher training on digital loggers",
          "Ignore it and invent fake numbers to fill the spreadsheet",
          "Cancel the waste recycling program",
          "Close the department"
        ],
        correct: 0,
        correctExplanation: "Data integrity must be treated as a mandatory operational duty with direct coaching and managerial reinforcement.",
        incorrectExplanation: "Incorrect. Data logging is a mandatory operational responsibility requiring formal managerial coaching."
      },
      {
        order: 7,
        question: "What statistical tool helps managers identify whether an electricity consumption spike represents an abnormal operational fault rather than normal fluctuation?",
        options: [
          "Statistical Process Control (SPC) charts with upper and lower control limits (e.g. 2 standard deviations from the baseline mean)",
          "A pie chart drawn with coloured pencils",
          "A random number generator",
          "Checking the company astrological horoscope"
        ],
        correct: 0,
        correctExplanation: "Control charts set mathematical upper limits that clearly differentiate random noise from true operational malfunctions.",
        incorrectExplanation: "Incorrect. Control charts provide statistical thresholds to flag true operational anomalies."
      },
      {
        order: 8,
        question: "How does effective sustainability KPI management contribute directly to enterprise ESG disclosure compliance (e.g. GRI, ISSB)?",
        options: [
          "It produces auditable, verified, and continuous operational data trails required by third-party assurance auditors and institutional investors",
          "It makes annual financial audits unnecessary",
          "It makes companies immune to national tax laws",
          "It eliminates the need for board oversight"
        ],
        correct: 0,
        correctExplanation: "Rigorous monthly KPI governance provides the verifiable primary data evidence required for institutional ESG assurance.",
        incorrectExplanation: "Incorrect. Monthly KPI governance ensures verifiable data trails for statutory ESG reporting."
      }
    ]
  },

  // 9. ELH-121: Building Business Cases for Sustainability Projects
  {
    id: 121,
    courseCode: "ELH-121",
    slug: "building-business-cases-for-sustainability-projects",
    title: "Building Business Cases for Sustainability Projects",
    description: "Structure capital expenditure (CapEx) proposals: Net Present Value (NPV), Internal Rate of Return (IRR), Simple Payback, and carbon risk monetization.",
    fullDescription: "Sustainability initiatives often stall in finance committees because technical proposals fail to speak the language of capital allocation. This course equips operations managers, engineers, and project leads with financial modeling skills to calculate Net Present Value (NPV), Internal Rate of Return (IRR), Life Cycle Costing (LCC), and carbon penalty avoidance to win CFO and Board approval.",
    categoryId: 3,
    durationMinutes: 30,
    priceUsd: "1400.00",
    level: "Management & Leadership",
    isFeatured: false,
    thumbnailUrl: "/images/courses/business-cases-sustainability.jpg",
    intendedRoles: ["Finance Managers", "Operations Directors", "Facilities Managers", "Project Engineers", "Sustainability Heads"],
    learningObjectives: [
      "Structure compelling capital expenditure (CapEx) investment proposals for green initiatives.",
      "Calculate Simple Payback, Net Present Value (NPV), and Internal Rate of Return (IRR) across asset lifespans.",
      "Incorporate Life Cycle Costing (LCC) including avoided maintenance, water tariffs, and carbon penalties.",
      "Monetize intangible ESG benefits (regulatory risk buffer, tenant retention, green bond eligibility).",
      "Complete 8 scenario-based assessment questions on sustainability financial business cases."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Building Business Cases for Sustainability Projects.",
    badgeName: "Sustainable Capital Investment Specialist",
    badgeDescription: "Awarded for demonstrating financial mastery in capital project valuation, NPV/IRR modeling, and green business case pitching.",
    badgeSlug: "sustainable-capital-specialist",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_STRATEGY",
    secondaryCompetencies: ["COMP_ESG_DATA", "COMP_LEADERSHIP"],
    applicableSectors: [],
    applicableDepartments: ["DEP_FINANCE", "DEP_FACILITIES", "DEP_OPERATIONS", "DEP_ENGINEERING"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Equip project leaders to calculate NPV, IRR, and payback to win CFO CapEx approval for sustainability upgrades.",
    lessons: [
      {
        order: 0,
        title: "Speaking the Language of the CFO",
        minutes: 5,
        content: "Why technical pitches like 'it saves the planet' fail in boardrooms.",
        blocks: [
          { id: "biz1-h1", type: "heading", position: 1, headingText: "Financial Translation" },
          { id: "biz1-t1", type: "short_text", position: 2, bodyText: "CFOs allocate scarce capital based on risk-adjusted financial returns. Framing green retrofits in terms of cash flows, NPV, IRR, and regulatory de-risking unlocks investment." },
          {
            id: "biz1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Board investment committee proposal:",
            decisionPrompt: "An engineering lead proposes a MUR 4,000,000 chiller retrofit. Option A pitches: 'It is a state-of-the-art green machine that reduces environmental impact.' Option B pitches: 'Investment of MUR 4.0M delivers MUR 1.4M annual utility savings, yielding a 2.8-year payback, an NPV of MUR 3.2M at 10% discount rate, and an IRR of 29%.' Which proposal wins approval?",
            decisionChoices: [
              { label: "Option B: It provides quantitative financial metrics (NPV, IRR, Payback) that satisfy executive fiduciary duties and prove clear shareholder return", correct: true, feedback: "Spot on! Financial committees require rigorous discounted cash flow metrics to approve capital outlays." },
              { label: "Option A: Emotional appeals without financial numbers are always preferred by CFOs", correct: false, feedback: "Incorrect. CFOs reject capital proposals that lack rigorous financial modeling." },
              { label: "Neither option: companies should never invest in infrastructure", correct: false, feedback: "Incorrect. Infrastructure retrofits drive core operational cost reductions." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Payback vs Net Present Value (NPV) vs IRR",
        minutes: 5,
        content: "Understanding why Simple Payback ignores cash flows beyond the payback cutoff.",
        blocks: [
          { id: "biz2-h1", type: "heading", position: 1, headingText: "Discounted Cash Flows" },
          { id: "biz2-t1", type: "short_text", position: 2, bodyText: "Simple Payback ignores the time value of money and asset lifespan. NPV discounts future annual energy savings back to present value using the corporate cost of capital (WACC)." }
        ]
      },
      {
        order: 2,
        title: "Life Cycle Costing (LCC) vs Initial CapEx",
        minutes: 5,
        content: "Factoring in 15-year operating energy, maintenance parts, and disposal costs.",
        blocks: [
          { id: "biz3-h1", type: "heading", position: 1, headingText: "Total Cost of Ownership" },
          { id: "biz3-t1", type: "short_text", position: 2, bodyText: "For an electric motor or chiller, initial purchase CapEx represents only 5-10% of total lifetime cost; electricity consumption accounts for 85-90%." }
        ]
      },
      {
        order: 3,
        title: "Monetizing Carbon Risk & Avoided Tariffs",
        minutes: 5,
        content: "Factoring rising fossil fuel taxes, CEB utility tariff hikes, and water surcharges.",
        blocks: [
          { id: "biz4-h1", type: "heading", position: 1, headingText: "Pricing Carbon Risk" },
          { id: "biz4-t1", type: "short_text", position: 2, bodyText: "Incorporate an internal shadow carbon price (e.g. $30-$50/tonne CO2) and conservative 5% annual utility escalation into cash flow models." }
        ]
      },
      {
        order: 4,
        title: "Structuring the Executive Business Case Dossier",
        minutes: 5,
        content: "One-page executive summary, sensitivity analysis, and implementation roadmap.",
        blocks: [
          { id: "biz5-h1", type: "heading", position: 1, headingText: "The 1-Page Executive Pitch" },
          { id: "biz5-t1", type: "short_text", position: 2, bodyText: "Structure proposals with a clear executive summary: Initial CapEx, Annual OpEx Savings, Net Cash Flow, NPV/IRR, Sensitivity Matrix, and Risk Mitigation." }
        ]
      },
      {
        order: 5,
        title: "Capital Proposal Action Template",
        minutes: 6,
        content: "Deploying standard CapEx financial templates across operational departments.",
        blocks: [
          { id: "biz6-h1", type: "heading", position: 1, headingText: "Proposal Template" },
          { id: "biz6-t1", type: "short_text", position: 2, bodyText: "Use the approved financial modeling template to pitch your next energy, water, or waste capital upgrade." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Why is Net Present Value (NPV) considered a superior financial metric to Simple Payback Period when evaluating commercial energy efficiency investments?",
        options: [
          "NPV accounts for the time value of money, discounts future cash flows over the entire operating lifespan of the asset, and reflects true enterprise value creation",
          "NPV is easier to calculate in your head without a computer",
          "Simple Payback is banned by international accounting standards",
          "NPV guarantees that equipment will never break down"
        ],
        correct: 0,
        correctExplanation: "Simple Payback ignores all cash savings generated after the payback cutoff and disregards the time value of money, whereas NPV reflects total value creation.",
        incorrectExplanation: "Incorrect. NPV incorporates the time value of money and full asset lifecycle cash flows."
      },
      {
        order: 2,
        question: "In Life Cycle Costing (LCC) analysis of large industrial equipment (e.g. chillers, air compressors, electric motors), what component typically accounts for 85% to 90% of Total Cost of Ownership?",
        options: [
          "Ongoing electrical energy consumption over the 15 to 20-year operational life of the machine",
          "The initial purchase CapEx price tag",
          "The cost of shipping the equipment from overseas",
          "The cost of the user manual"
        ],
        correct: 0,
        correctExplanation: "Initial purchase price represents only ~10% of total lifetime costs; electricity consumption dominates 85–90% of total lifecycle cost.",
        incorrectExplanation: "Incorrect. Lifetime electrical energy draw represents 85–90% of total equipment lifecycle costs."
      },
      {
        order: 3,
        question: "What is an 'Internal Shadow Carbon Price' in corporate capital expenditure evaluation?",
        options: [
          "A theoretical monetary fee (e.g. $40 per tonne of CO2e) assigned to greenhouse gas emissions in financial models to stress-test projects against future carbon taxes and regulations",
          "A secret tax paid to private carbon brokers",
          "The cost of buying black coal",
          "An illegal payment to avoid environmental audits"
        ],
        correct: 0,
        correctExplanation: "Shadow carbon pricing quantifies the financial risk of carbon emissions, making low-carbon capital projects more financially attractive in investment committees.",
        incorrectExplanation: "Incorrect. Shadow carbon pricing models future regulatory risk by adding an internal price to greenhouse gas emissions."
      },
      {
        order: 4,
        question: "What does an Internal Rate of Return (IRR) of 28% indicate for a proposed rooftop solar PV capital project?",
        options: [
          "The annual percentage return generated by the project's cash savings exceeds typical corporate hurdle rates (e.g. 10-12%), representing a highly profitable investment",
          "The solar panels will break down after 28 days",
          "The project will consume 28% more electricity than before",
          "The company will lose 28% of its revenue"
        ],
        correct: 0,
        correctExplanation: "An IRR well above the company's cost of capital proves strong financial profitability and rapid capital recovery.",
        incorrectExplanation: "Incorrect. An IRR of 28% represents a highly attractive annual return on invested capital."
      },
      {
        order: 5,
        question: "Why should a sustainability business case always include a 'Sensitivity Analysis' table?",
        options: [
          "It demonstrates project profitability under adverse scenarios, such as lower-than-expected utility price inflation or higher capital implementation costs",
          "It measures how emotionally sensitive employees are to changes",
          "It proves that financial forecasts are 100% guaranteed",
          "It replaces the need to conduct engineering audits"
        ],
        correct: 0,
        correctExplanation: "Sensitivity matrices test how project returns perform under adverse variations in energy tariffs, CapEx overruns, or operational hours.",
        incorrectExplanation: "Incorrect. Sensitivity analysis stress-tests financial returns against variable tariffs, costs, and operating hours."
      },
      {
        order: 6,
        question: "What indirect financial benefits should be quantified in a green building retrofit proposal for commercial real estate?",
        options: [
          "Higher tenant retention, lower vacancy risk, reduced service charge volatility, and potential eligibility for discounted green financing loans",
          "Free advertising on international television",
          "Elimination of municipal property tax permanently",
          "Automatic doubling of building height"
        ],
        correct: 0,
        correctExplanation: "Green retrofits enhance asset marketability, tenant lease renewals, and access to lower-interest green debt.",
        incorrectExplanation: "Incorrect. Green retrofits improve tenant retention, lower vacancy rates, and qualify assets for green loan discounts."
      },
      {
        order: 7,
        question: "What is the consequence of choosing a low-cost, low-efficiency machine based strictly on the lowest initial purchase price?",
        options: [
          "The company incurs significantly higher ongoing utility electricity bills every year, resulting in a much higher Total Cost of Ownership over the asset's life",
          "The machine produces free electricity",
          "The company receives an award from the Ministry of Finance",
          "The machine lasts twice as long as premium models"
        ],
        correct: 0,
        correctExplanation: "Cheap, inefficient equipment locks the organization into 10–15 years of inflated utility operating expenses.",
        incorrectExplanation: "Incorrect. Low-efficiency equipment inflates ongoing operating expenses, resulting in higher lifetime cost."
      },
      {
        order: 8,
        question: "What key document should accompany a multi-million Rupee sustainability CapEx proposal to the Board of Directors?",
        options: [
          "A concise 1-page Executive Summary containing the investment problem, CapEx, annual OpEx savings, NPV, IRR, Payback, and execution milestones",
          "A 500-page engineering textbook on thermodynamics",
          "A handwritten letter from local environmental groups",
          "A photograph of a rainforest"
        ],
        correct: 0,
        correctExplanation: "Executive committees demand concise, data-driven 1-page summaries outlining financial returns, risks, and implementation roadmaps.",
        incorrectExplanation: "Incorrect. A concise 1-page summary highlighting financial returns and implementation milestones is essential."
      }
    ]
  },

  // 10. ELH-122: Managing Subcontractor Sustainability Compliance
  {
    id: 122,
    courseCode: "ELH-122",
    slug: "managing-subcontractor-sustainability-compliance",
    title: "Managing Subcontractor Sustainability Compliance",
    description: "Enforce environmental compliance, contractor site codes of conduct, hazardous waste manifests, and worker welfare standards across outsourced service providers.",
    fullDescription: "Corporate sustainability is vulnerable to subcontractor non-compliance across construction, security, cleaning, logistics, and maintenance vendors. This course equips facilities managers, procurement leads, and contract managers with operational tools to pre-qualify vendors, embed mandatory green clauses in Service Level Agreements (SLAs), conduct unannounced site audits, and enforce penalty regimes.",
    categoryId: 3,
    durationMinutes: 25,
    priceUsd: "1400.00",
    level: "Management & Leadership",
    isFeatured: false,
    thumbnailUrl: "/images/courses/subcontractor-compliance.jpg",
    intendedRoles: ["Facilities Managers", "Contract Managers", "Procurement Leads", "HSE Officers", "Operations Leads"],
    learningObjectives: [
      "Embed mandatory environmental and safety clauses into subcontractor procurement tenders and SLAs.",
      "Pre-qualify third-party vendors using standardized ESG and statutory compliance scorecards.",
      "Audit contractor hazardous waste manifests, chemical storage, and worker PPE compliance on site.",
      "Enforce contractual non-compliance stop-work notices and financial penalty schedules.",
      "Complete 8 scenario-based assessment questions on subcontractor sustainability management."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Managing Subcontractor Sustainability Compliance.",
    badgeName: "Contractor ESG Compliance Lead",
    badgeDescription: "Awarded for demonstrating management mastery in subcontractor environmental governance, SLA enforcement, and site compliance auditing.",
    badgeSlug: "contractor-esg-compliance-lead",
    relevanceLayer: "management_leadership",
    primaryClassification: "MANAGEMENT_LEADERSHIP",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_COMPLIANCE",
    secondaryCompetencies: ["COMP_GOVERNANCE", "COMP_PROCUREMENT"],
    applicableSectors: [],
    applicableDepartments: ["DEP_FACILITIES", "DEP_PROCUREMENT", "DEP_OPERATIONS", "DEP_HSE"],
    applicableJobFamilies: ["JF_SUPERVISOR", "JF_MANAGER", "JF_EXECUTIVE"],
    applicableSeniorityTiers: ["SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD", "SEN_EXECUTIVE"],
    productionPriority: "p0",
    learningPathPurpose: "Embed ESG criteria in vendor SLAs and enforce site environmental compliance across third-party contractors.",
    lessons: [
      {
        order: 0,
        title: "The Third-Party Operational Risk Exposure",
        minutes: 4,
        content: "Why companies are legally and reputationally liable for contractor environmental crimes.",
        blocks: [
          { id: "sub1-h1", type: "heading", position: 1, headingText: "Outsourcing Does Not Outsource Liability" },
          { id: "sub1-t1", type: "short_text", position: 2, bodyText: "Under Mauritian environmental and occupational health legislation, principal employers bear vicarious liability if an outsourced contractor dumps hazardous waste or causes pollution on site." },
          {
            id: "sub1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Facility site management dilemma:",
            decisionPrompt: "An outsourced painting contractor is caught washing solvent brushes directly into a garden rainwater storm drain connected to the ocean lagoon. The contractor foreman argues: 'We are a private third-party company; you can't tell us how to clean our tools.' How must the Facilities Manager respond?",
            decisionChoices: [
              { label: "Issue an immediate Stop-Work Order, enforce mandatory hazardous solvent containment procedures, initiate contractual penalty clauses, and require certified hazardous waste disposal manifests", correct: true, feedback: "Spot on! Principal employers possess legal and contractual authority to stop illegal environmental actions on their premises." },
              { label: "Apologize to the contractor and let them continue pouring paint down the storm drain", correct: false, feedback: "Illegal and hazardous! Polluting storm drains violates national environmental legislation." },
              { label: "Ignore the incident because it was done by outsourced staff", correct: false, feedback: "Incorrect. The principal employer remains legally liable for site environmental breaches." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Mandatory Green SLA & Tender Clauses",
        minutes: 4,
        content: "Embedding statutory compliance, chemical approval, and waste diversion into contracts.",
        blocks: [
          { id: "sub2-h1", type: "heading", position: 1, headingText: "Contractual Enforcement" },
          { id: "sub2-t1", type: "short_text", position: 2, bodyText: "Standard vendor contracts must include: 1. Approved chemical lists, 2. Mandatory disposal manifests, 3. Stop-work rights for safety violations, 4. Penalty deductions for non-compliance." }
        ]
      },
      {
        order: 2,
        title: "Vendor Pre-Qualification ESG Scorecards",
        minutes: 4,
        content: "Screening contractors for labor welfare, safety records, and environmental certifications.",
        blocks: [
          { id: "sub3-h1", type: "heading", position: 1, headingText: "Prequalification Screening" },
          { id: "sub3-t1", type: "short_text", position: 2, bodyText: "Evaluate prospective contractors on historical safety records (LTIFR), worker fair wage compliance, and certified waste disposal channels before tender award." }
        ]
      },
      {
        order: 3,
        title: "Unannounced Site Inspections & Waste Audits",
        minutes: 4,
        content: "Executing random audits of contractor chemical storage, PPE, and waste skips.",
        blocks: [
          { id: "sub4-h1", type: "heading", position: 1, headingText: "Active Verification" },
          { id: "sub4-t1", type: "short_text", position: 2, bodyText: "Scheduled audits encourage staged compliance; unannounced physical inspections verify everyday site discipline and chemical containment." }
        ]
      },
      {
        order: 4,
        title: "Enforcing Penalties & Remediation Workflows",
        minutes: 4,
        content: "Managing corrective action notices (CARs), payment holdbacks, and contract termination.",
        blocks: [
          { id: "sub5-h1", type: "heading", position: 1, headingText: "Contractual Consequences" },
          { id: "sub5-t1", type: "short_text", position: 2, bodyText: "When breaches occur, issue formal Corrective Action Requests (CARs) with 48-hour cure periods, escalating to invoice withholdings and contract termination for repeat offenders." }
        ]
      },
      {
        order: 5,
        title: "Contractor Sustainability Governance Plan",
        minutes: 5,
        content: "Deploying quarterly contractor performance reviews and green partner awards.",
        blocks: [
          { id: "sub6-h1", type: "heading", position: 1, headingText: "Partnership & Accountability" },
          { id: "sub6-t1", type: "short_text", position: 2, bodyText: "Combine rigorous contractual enforcement with annual Green Contractor recognition to build lasting supply chain partnerships." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Why is a principal client company legally and reputationally exposed if an outsourced contractor causes environmental pollution on site?",
        options: [
          "Under national environmental and occupational safety legislation, principal employers bear vicarious liability for activities conducted on their property and face brand damage if contractors violate environmental laws",
          "Contractors are legally considered government employees",
          "Principal employers are exempt from all environmental laws",
          "Contractors have zero legal responsibilities"
        ],
        correct: 0,
        correctExplanation: "Principal employers maintain statutory duty-of-care obligations on their premises; outsourcing work does not eliminate environmental liability.",
        incorrectExplanation: "Incorrect. Principal employers remain legally and reputationally accountable for site activities."
      },
      {
        order: 2,
        question: "What mandatory requirement should client companies embed into Service Level Agreements (SLAs) regarding hazardous waste generated by contractors?",
        options: [
          "Contractors must provide official disposal manifests signed by certified, licensed waste facilities for every batch of hazardous waste removed from site",
          "Contractors are allowed to dump waste in nearby rivers",
          "Contractors must bury waste under company car parks",
          "Contractors are prohibited from generating waste"
        ],
        correct: 0,
        correctExplanation: "Signed disposal manifests provide legally binding proof that hazardous materials were processed at licensed facilities.",
        incorrectExplanation: "Incorrect. Signed manifests from certified waste processors are required to verify legal disposal."
      },
      {
        order: 3,
        question: "What immediate action should a facility or site manager take if a subcontractor is observed performing a high-risk environmental violation (e.g. discharging toxic solvent down a storm drain)?",
        options: [
          "Issue an immediate verbal and written Stop-Work Order, contain the pollutant, and initiate contractual non-conformance breach proceedings",
          "Wait until the contract expires in two years",
          "Provide the contractor with more toxic solvent",
          "Cover the drain with newspaper and pretend not to notice"
        ],
        correct: 0,
        correctExplanation: "Stop-Work authority is essential to halt active environmental contamination and enforce contractual compliance.",
        incorrectExplanation: "Incorrect. Stop-work orders must be issued immediately to halt pollution and enforce contract terms."
      },
      {
        order: 4,
        question: "How should client procurement teams evaluate prospective subcontractors during the pre-qualification tender stage?",
        options: [
          "Use a structured ESG scorecard evaluating safety track record (LTIFR), worker fair labor compliance, environmental management systems (ISO 14001), and disposal certifications",
          "Award contracts strictly to whoever submits the lowest bid without checking safety records",
          "Award contracts based on personal friendships",
          "Pick contractor names randomly out of a hat"
        ],
        correct: 0,
        correctExplanation: "Pre-qualification scorecards weed out high-risk, non-compliant vendors before tender award, protecting the organization.",
        incorrectExplanation: "Incorrect. Structured ESG and safety scorecards ensure only compliant, qualified vendors are awarded contracts."
      },
      {
        order: 5,
        question: "Why are unannounced random physical site audits of contractor work areas critical in addition to formal scheduled reviews?",
        options: [
          "They reveal everyday operational reality, such as chemical storage practices, PPE compliance, and waste segregation, which are often temporarily staged during announced visits",
          "They are used to scare contractor employees",
          "They allow the client to steal contractor tools",
          "Unannounced audits are prohibited by law"
        ],
        correct: 0,
        correctExplanation: "Unannounced audits verify genuine everyday operating discipline rather than artificial preparation.",
        incorrectExplanation: "Incorrect. Unannounced inspections verify everyday compliance rather than pre-staged conditions."
      },
      {
        order: 6,
        question: "What contractual mechanism ensures subcontractors take corrective action notices seriously when environmental deficiencies are identified?",
        options: [
          "Financial penalty clauses, invoice payment holdbacks until remediation is certified, and contractual termination rights for repeat non-compliance",
          "Sending polite reminder emails every 6 months",
          "Giving the contractor a financial bonus",
          "Apologizing to the contractor for pointing out the defect"
        ],
        correct: 0,
        correctExplanation: "Linking compliance directly to invoice clearance and financial penalties ensures rapid contractor remediation.",
        incorrectExplanation: "Incorrect. Payment holdbacks and contractual penalty clauses enforce rapid remediation."
      },
      {
        order: 7,
        question: "What worker welfare and social compliance requirement should principal employers verify for outsourced labor (e.g. cleaning, security staff)?",
        options: [
          "Compliance with national statutory minimum wage laws, mandatory rest breaks, provision of adequate drinking water, and appropriate personal protective equipment (PPE)",
          "Requiring workers to work 24-hour shifts without sleep",
          "Withholding worker passports",
          "Banning workers from eating food"
        ],
        correct: 0,
        correctExplanation: "Social ESG audits verify fair labor standards, statutory wages, and humane workplace conditions for all subcontracted personnel.",
        incorrectExplanation: "Incorrect. Principal employers must verify statutory wages, rest periods, drinking water, and PPE for all on-site personnel."
      },
      {
        order: 8,
        question: "How can principal employers promote long-term sustainability alignment with preferred strategic subcontractors?",
        options: [
          "Establish joint annual sustainability improvement goals, share technical best practices, and recognize top-performing green vendors with preferred partner status",
          "Threaten contractors with lawsuits every week",
          "Refuse to speak to contractor management",
          "Cancel all vendor contracts annually"
        ],
        correct: 0,
        correctExplanation: "Collaborative partnership and shared recognition build lasting supply chain capabilities and shared environmental value.",
        incorrectExplanation: "Incorrect. Collaborative goal-setting and green partner recognition foster sustainable supply chain partnerships."
      }
    ]
  },

  // 11. ELH-128: Sustainability for Health & Safety (HSE) Officers
  {
    id: 128,
    courseCode: "ELH-128",
    slug: "sustainability-for-health-and-safety-hse-officers",
    title: "Sustainability for Health & Safety (HSE) Officers",
    description: "Integrate environmental compliance, carbon emission monitoring, hazardous waste audits, and worker environmental health into daily HSE inspections.",
    fullDescription: "Health & Safety (HSE) Officers possess the inspection routines and site authority necessary to drive frontline environmental compliance. This course equips HSE Officers with practical frameworks to expand traditional safety walk-throughs to cover fugitive air emissions, stormwater pollution prevention, thermal heat stress management, and unified EHS audits.",
    categoryId: 2,
    durationMinutes: 30,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/hse-sustainability.jpg",
    intendedRoles: ["HSE Officers", "Safety Inspectors", "Environmental Coordinators", "Facilities HSE Leads"],
    learningObjectives: [
      "Integrate environmental hazard checkpoints directly into daily/weekly workplace safety inspections.",
      "Conduct statutory hazardous waste storage, secondary containment, and manifest audits.",
      "Manage employee occupational thermal heat stress and hydration protocols in warming climates.",
      "Investigate environmental non-conformance incidents and execute root-cause corrective workflows.",
      "Unify Occupational Health, Safety, and Environmental Management (ISO 14001 & ISO 45001).",
      "Complete 8 scenario-based assessment questions on HSE sustainability integration."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Sustainability for Health & Safety (HSE) Officers.",
    badgeName: "Integrated HSE & Sustainability Specialist",
    badgeDescription: "Awarded for demonstrating professional competency in unified occupational safety, environmental auditing, and regulatory compliance.",
    badgeSlug: "integrated-hse-specialist",
    relevanceLayer: "role_specialist",
    primaryClassification: "ROLE_SPECIALIST",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_COMPLIANCE",
    secondaryCompetencies: ["COMP_HEALTH_SAFETY", "COMP_GOVERNANCE"],
    applicableSectors: [],
    applicableDepartments: ["DEP_HSE", "DEP_OPERATIONS", "DEP_FACILITIES"],
    applicableJobFamilies: ["JF_TECHNICAL", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Empower HSE Officers to integrate environmental inspection and waste controls into daily safety rounds.",
    lessons: [
      {
        order: 0,
        title: "The Convergence of Health, Safety & Environment",
        minutes: 5,
        content: "Why environmental risks are inseparable from occupational safety risks.",
        blocks: [
          { id: "hse1-h1", type: "heading", position: 1, headingText: "Unified EHS Oversight" },
          { id: "hse1-t1", type: "short_text", position: 2, bodyText: "A chemical leak on the factory floor is simultaneously an immediate occupational inhalation/slip hazard and an environmental contamination risk. Unifying EHS inspection eliminates duplicate audits." },
          {
            id: "hse1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "HSE walk-through observation:",
            decisionPrompt: "During a routine weekly safety inspection, the HSE Officer notices several drums of hazardous machine lubricant stored on bare dirt outside the workshop without a spill pallet or rain cover. What should the HSE Officer do?",
            decisionChoices: [
              { label: "Issue a High-Priority Corrective Action Notice: order immediate relocation of drums onto certified 110% secondary containment spill pallets under a weatherproof canopy, and audit local soil for hydrocarbon staining", correct: true, feedback: "Spot on! Outdoor drum storage without secondary containment violates environmental law and creates severe groundwater contamination hazards." },
              { label: "Ignore it because nobody tripped over the drums", correct: false, feedback: "Incorrect. Environmental containment is a core HSE compliance duty." },
              { label: "Pour the oil into the garden lawn", correct: false, feedback: "Severe environmental crime! Hydrocarbons poison soil and groundwater." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Integrating Environmental Checkpoints into Safety Audits",
        minutes: 5,
        content: "Expanding inspection checklists: air vents, spill kits, bund valves, and waste segregation.",
        blocks: [
          { id: "hse2-h1", type: "heading", position: 1, headingText: "The Unified Inspection Checklist" },
          { id: "hse2-t1", type: "short_text", position: 2, bodyText: "Add 4 core environmental checkpoints to daily rounds: 1. Bund drainage valves closed, 2. Spill kits fully stocked, 3. Waste bins correctly colour-sorted, 4. Local exhaust ventilation (LEV) velocity verified." }
        ]
      },
      {
        order: 2,
        title: "Occupational Heat Stress in a Warming Climate",
        minutes: 5,
        content: "Wet Bulb Globe Temperature (WBGT) monitoring, mandatory rest-shade cycles, and worker hydration.",
        blocks: [
          { id: "hse3-h1", type: "heading", position: 1, headingText: "Climate & Worker Health" },
          { id: "hse3-t1", type: "short_text", position: 2, bodyText: "As ambient tropical temperatures rise, outdoor and factory floor workers face severe heat exhaustion risk. Implement automated WBGT monitoring and structured hydration intervals." }
        ]
      },
      {
        order: 3,
        title: "Hazardous Waste Manifesting & Chain of Custody",
        minutes: 5,
        content: "Statutory requirements for hazardous waste registers and carrier licensing.",
        blocks: [
          { id: "hse4-h1", type: "heading", position: 1, headingText: "Cradle-to-Grave Manifests" },
          { id: "hse4-t1", type: "short_text", position: 2, bodyText: "Every kilogram of chemical sludge, used oil, or biohazard waste leaving the facility must be tracked on a statutory triplicate manifest signed by the licensed hazardous waste carrier." }
        ]
      },
      {
        order: 4,
        title: "Root-Cause Investigation for Environmental Incidents",
        minutes: 5,
        content: "Applying incident investigation protocols to chemical spills and emissions breaches.",
        blocks: [
          { id: "hse5-h1", type: "heading", position: 1, headingText: "Incident Root-Cause Analysis" },
          { id: "hse5-t1", type: "short_text", position: 2, bodyText: "Treat environmental near-misses and spills with the same formal investigation rigor as lost-time injuries (LTIs), generating verifiable corrective actions." }
        ]
      },
      {
        order: 5,
        title: "Integrated HSE Officer Action Toolkit",
        minutes: 5,
        content: "Deploying standard integrated inspection checklists and emergency drills.",
        blocks: [
          { id: "hse6-h1", type: "heading", position: 1, headingText: "Action Toolkit" },
          { id: "hse6-t1", type: "short_text", position: 2, bodyText: "Download and deploy the unified EHS walk-through template to protect worker safety and environmental compliance." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Why is integrating environmental compliance into daily Health & Safety (HSE) inspections highly effective in commercial operations?",
        options: [
          "HSE officers already possess regular site access, hazard identification skills, and enforcement authority, allowing unified inspection of safety and environmental risks without duplicate overhead",
          "It allows the company to fire all facilities managers",
          "It eliminates the need to follow national safety laws",
          "Environmental inspections only require 5 seconds per year"
        ],
        correct: 0,
        correctExplanation: "HSE officers are already on the shop floor; adding environmental checkpoints creates comprehensive risk coverage efficiently.",
        incorrectExplanation: "Incorrect. Unified inspections leverage existing HSE walkthroughs to cover safety and environmental hazards efficiently."
      },
      {
        order: 2,
        question: "What physical condition should an HSE Officer verify regarding secondary containment bund drainage valves around outdoor chemical tanks?",
        options: [
          "Bund drainage valves must be kept locked in the 'CLOSED' position and opened only under active supervision to drain clean rainwater after verifying zero chemical sheen",
          "Valves must be left wide open 24/7",
          "Valves must be removed and thrown away",
          "Valves must be connected directly to employee drinking fountains"
        ],
        correct: 0,
        correctExplanation: "Leaving bund valves open defeats the entire purpose of secondary containment; valves must remain locked closed to trap spills.",
        incorrectExplanation: "Incorrect. Bund valves must remain locked closed to contain catastrophic spills."
      },
      {
        order: 3,
        question: "How should HSE Officers manage occupational heat stress risk for outdoor construction or agricultural workers during extreme summer heatwaves?",
        options: [
          "Implement Wet Bulb Globe Temperature (WBGT) monitoring, enforce mandatory shaded rest breaks, and provide continuous accessible cold drinking water with electrolytes",
          "Require workers to work faster in full sunlight to finish early",
          "Prohibit workers from drinking water during working hours",
          "Turn off all shaded rest shelters"
        ],
        correct: 0,
        correctExplanation: "WBGT monitoring and structured hydration/shade breaks protect workers from life-threatening heat stroke and organ damage.",
        incorrectExplanation: "Incorrect. WBGT monitoring, mandatory shade breaks, and hydration are statutory heat stress mitigations."
      },
      {
        order: 4,
        question: "What is 'Cradle-to-Grave' responsibility in industrial hazardous waste management?",
        options: [
          "The legal principle that the waste-generating company remains permanently responsible for hazardous waste from the moment it is produced until its final certified destruction",
          "Waste that is generated exclusively inside pediatric hospitals",
          "Throwing waste into open graves in cemeteries",
          "A waste policy that applies only to newborn infants"
        ],
        correct: 0,
        correctExplanation: "Generator liability does not end when waste leaves the site gate; companies remain liable if dishonest carriers illegally dump their waste.",
        incorrectExplanation: "Incorrect. Cradle-to-grave principles hold the generator liable for waste until final verified destruction."
      },
      {
        order: 5,
        question: "What is an 'Environmental Near-Miss', and why should HSE Officers log and investigate them?",
        options: [
          "An unplanned event that did not result in actual pollution but had the clear potential to cause severe contamination under slightly different circumstances (e.g. a leaking drum over an unsealed drain)",
          "An event that happened on another planet",
          "A near-miss is when an airplane flies low over the factory",
          "Near-misses should be ignored and never logged"
        ],
        correct: 0,
        correctExplanation: "Investigating near-misses resolves systemic vulnerabilities before catastrophic spills or regulatory fines occur.",
        incorrectExplanation: "Incorrect. Environmental near-misses expose vulnerabilities that must be remediated to prevent catastrophic spills."
      },
      {
        order: 6,
        question: "What equipment must be verified as fully stocked and unobstructed during monthly HSE audits of chemical storage areas?",
        options: [
          "Emergency chemical spill response kits, emergency eyewash stations, Safety Data Sheets (SDS), and appropriate chemical-resistant PPE",
          "Cardboard boxes filled with scrap metal",
          "Vending machines filled with candy",
          "A radio playing loud music"
        ],
        correct: 0,
        correctExplanation: "Spill kits, eyewash stations, and PPE must be immediately accessible and verified functional during every audit.",
        incorrectExplanation: "Incorrect. Audits must confirm spill kits, eyewash stations, SDS binders, and PPE are fully functional and accessible."
      },
      {
        order: 7,
        question: "How does conducting quarterly unannounced emergency spill drills improve facility resilience?",
        options: [
          "It tests worker response times, verifies spill kit deployment competency, and ensures staff know how to prevent chemicals from entering municipal drains under pressure",
          "It generates water bills for the company",
          "It is used to test the building fire alarm sirens",
          "Drills have zero training value"
        ],
        correct: 0,
        correctExplanation: "Realistic spill drills build muscle memory, ensuring workers react swiftly and correctly during real-world hazardous chemical spills.",
        incorrectExplanation: "Incorrect. Spill drills build practical muscle memory for rapid chemical containment during emergencies."
      },
      {
        order: 8,
        question: "How does integrating ISO 14001 (Environmental) with ISO 45001 (Occupational Health & Safety) benefit the organization?",
        options: [
          "It streamlines compliance documentation, eliminates duplicate audit overhead, and creates a unified culture of risk prevention across health, safety, and the environment",
          "It makes ISO certifications free of charge",
          "It eliminates the need to employ any safety staff",
          "It makes companies immune to all international regulations"
        ],
        correct: 0,
        correctExplanation: "Integrated management systems (IMS) align risk assessment, incident investigation, and audit workflows across safety and environmental domains.",
        incorrectExplanation: "Incorrect. Integrating ISO 14001 and 45001 streamlines risk governance and eliminates audit duplication."
      }
    ]
  }
];

export async function ensureWave1BCatalogue(): Promise<void> {
  try {
    for (const courseDef of WAVE_1B_COURSES) {
      await db.transaction(async (tx) => {
        let courseId: number;

        const [existing] = await tx
          .select()
          .from(coursesTable)
          .where(eq(coursesTable.courseCode, courseDef.courseCode))
          .limit(1);

        if (existing) {
          courseId = existing.id;
          await tx
            .update(coursesTable)
            .set({
              title: courseDef.title,
              slug: courseDef.slug,
              description: courseDef.description,
              fullDescription: courseDef.fullDescription,
              categoryId: courseDef.categoryId,
              durationMinutes: courseDef.durationMinutes,
              priceUsd: courseDef.priceUsd,
              level: courseDef.level,
              isFeatured: courseDef.isFeatured,
              thumbnailUrl: courseDef.thumbnailUrl,
              intendedRoles: courseDef.intendedRoles,
              learningObjectives: courseDef.learningObjectives,
              includesCertificate: courseDef.includesCertificate,
              passingScore: courseDef.passingScore,
              completionMessage: courseDef.completionMessage,
              badgeName: courseDef.badgeName,
              badgeDescription: courseDef.badgeDescription,
              relevanceLayer: courseDef.relevanceLayer,
              primaryClassification: courseDef.primaryClassification,
              isEssentialUniversal: courseDef.isEssentialUniversal,
              primaryCompetency: courseDef.primaryCompetency,
              secondaryCompetencies: courseDef.secondaryCompetencies,
              applicableSectors: courseDef.applicableSectors,
              applicableDepartments: courseDef.applicableDepartments,
              applicableJobFamilies: courseDef.applicableJobFamilies,
              applicableSeniorityTiers: courseDef.applicableSeniorityTiers,
              productionPriority: courseDef.productionPriority,
              learningPathPurpose: courseDef.learningPathPurpose,
              isPublished: true,
              status: "published",
              updatedAt: new Date(),
            })
            .where(eq(coursesTable.id, courseId));
        } else {
          const [inserted] = await tx
            .insert(coursesTable)
            .values({
              courseCode: courseDef.courseCode,
              slug: courseDef.slug,
              title: courseDef.title,
              description: courseDef.description,
              fullDescription: courseDef.fullDescription,
              categoryId: courseDef.categoryId,
              durationMinutes: courseDef.durationMinutes,
              priceUsd: courseDef.priceUsd,
              level: courseDef.level,
              isFeatured: courseDef.isFeatured,
              thumbnailUrl: courseDef.thumbnailUrl,
              intendedRoles: courseDef.intendedRoles,
              learningObjectives: courseDef.learningObjectives,
              includesCertificate: courseDef.includesCertificate,
              passingScore: courseDef.passingScore,
              completionMessage: courseDef.completionMessage,
              badgeName: courseDef.badgeName,
              badgeDescription: courseDef.badgeDescription,
              relevanceLayer: courseDef.relevanceLayer,
              primaryClassification: courseDef.primaryClassification,
              isEssentialUniversal: courseDef.isEssentialUniversal,
              primaryCompetency: courseDef.primaryCompetency,
              secondaryCompetencies: courseDef.secondaryCompetencies,
              applicableSectors: courseDef.applicableSectors,
              applicableDepartments: courseDef.applicableDepartments,
              applicableJobFamilies: courseDef.applicableJobFamilies,
              applicableSeniorityTiers: courseDef.applicableSeniorityTiers,
              productionPriority: courseDef.productionPriority,
              learningPathPurpose: courseDef.learningPathPurpose,
              isPublished: true,
              status: "published",
            })
            .returning({ id: coursesTable.id });
          courseId = inserted.id;
        }

        // Seed / Re-seed Lessons
        await tx.delete(lessonsTable).where(eq(lessonsTable.courseId, courseId));
        for (const l of courseDef.lessons) {
          await tx.insert(lessonsTable).values({
            courseId,
            title: l.title,
            orderIndex: l.order,
            durationMinutes: l.minutes,
            content: l.content,
            contentBlocks: l.blocks,
            isArchived: false,
          });
        }

        // Seed / Re-seed Quizzes
        await tx.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
        await tx.insert(quizQuestionsTable).values(
          courseDef.quiz.map((q) => ({
            courseId,
            question: q.question,
            options: q.options,
            correctOption: q.correct,
            orderIndex: q.order,
            correctExplanation: q.correctExplanation,
            incorrectExplanation: q.incorrectExplanation,
            optionFeedback: q.options.map((_, idx) =>
              idx === q.correct ? q.correctExplanation : q.incorrectExplanation
            ),
            isArchived: false,
          }))
        );

        // Badge definition
        await tx
          .insert(badgeDefinitionsTable)
          .values({
            slug: courseDef.badgeSlug,
            name: courseDef.badgeName,
            description: courseDef.badgeDescription,
            icon: "award",
            criteriaType: "all_courses",
            threshold: 0,
            courseIds: [courseId],
            orderIndex: courseDef.id,
          })
          .onConflictDoUpdate({
            target: badgeDefinitionsTable.slug,
            set: {
              name: courseDef.badgeName,
              description: courseDef.badgeDescription,
              courseIds: [courseId],
            },
          });
      });
    }

    logger.info("Sprint 14.13 Wave 1B Catalogue seeding completed successfully.");
  } catch (err) {
    logger.error({ err }, "Failed to seed Wave 1B Catalogue");
    throw err;
  }
}
