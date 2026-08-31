import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

export interface Wave1CourseDefinition {
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

// 14 Canonical Wave 1 Courses
export const WAVE_1_COURSES: Wave1CourseDefinition[] = [
  // 1. ELH-35: Sustainable Housekeeping Operations
  {
    id: 35,
    courseCode: "ELH-35",
    slug: "sustainable-housekeeping-operations",
    title: "Sustainable Housekeeping Operations",
    description: "Eco-friendly guestroom cleaning standard operating procedures, chemical dilution dispenser systems, microfibre linen care, and room energy shutdown routines.",
    fullDescription: "Designed specifically for hotel and resort accommodation teams, this course delivers practical, non-negotiable operational guidelines for sustainable housekeeping.",
    categoryId: 2,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Applied Workplace Practice",
    isFeatured: false,
    thumbnailUrl: "/images/courses/sustainable-housekeeping.jpg",
    intendedRoles: ["Housekeepers", "Room Attendants", "Housekeeping Supervisors"],
    learningObjectives: [
      "Operate chemical dilution wall dispensers safely without bypassing calibration limits.",
      "Apply colour-coded microfibre cleaning techniques to eliminate cross-contamination.",
      "Execute towel and linen reuse protocols while upholding luxury guest expectations.",
      "Execute standard guestroom energy shutdown checklists.",
      "Safely report plumbing leaks, toilet running valves, and moisture anomalies to maintenance.",
      "Complete 8 scenario-based assessment questions navigating real-world housekeeping dilemmas."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations on completing Sustainable Housekeeping Operations!",
    badgeName: "Sustainable Housekeeping Specialist",
    badgeDescription: "Awarded for demonstrating operational excellence in resort housekeeping eco-SOPs.",
    badgeSlug: "sustainable-housekeeping-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_WATER",
    secondaryCompetencies: ["COMP_CIRCULARITY", "COMP_ENERGY"],
    applicableSectors: ["SEC_HOSPITALITY"],
    applicableDepartments: ["DEP_HOUSEKEEPING"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR"],
    productionPriority: "p0",
    learningPathPurpose: "Eliminate chemical overdose and cut laundry cycles in guest accommodations.",
    lessons: [
      {
        order: 0,
        title: "Guest Accommodation Environmental Footprint",
        minutes: 3,
        content: "How room attendants directly influence water and energy in resorts.",
        blocks: [
          { id: "hsk1-h1", type: "heading", position: 1, headingText: "Small Actions, Massive Footprint" },
          { id: "hsk1-t1", type: "short_text", position: 2, bodyText: "In a 200-room resort in Mauritius, a single running toilet flapper wastes up to 800 litres of water daily. Reporting leaks promptly preserves precious island water supplies." },
          {
            id: "hsk1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Morning shift dilemma:",
            decisionPrompt: "You hear a faint trickling sound in a guestroom toilet cistern. The guest hasn't complained. What should you do?",
            decisionChoices: [
              { label: "Log a maintenance defect order immediately via the housekeeping portal", correct: true, feedback: "Spot on! Silent flapper leaks waste hundreds of litres daily if not fixed promptly." },
              { label: "Ignore it because the guest didn't complain", correct: false, feedback: "Incorrect. Silent leaks represent huge resource losses." },
              { label: "Pour full-strength bleach into the cistern", correct: false, feedback: "Incorrect and harmful! Bleach corrodes rubber seals." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Chemical Dilution Dispensers & Safety Dosing",
        minutes: 4,
        content: "Safe chemical mixing and microfibre color coding.",
        blocks: [
          { id: "hsk2-h1", type: "heading", position: 1, headingText: "Automated Dispensers" },
          { id: "hsk2-t1", type: "short_text", position: 2, bodyText: "Automated dispensers ensure exact chemical-to-water ratios, protecting worker health and preventing residue." }
        ]
      },
      {
        order: 2,
        title: "Linen & Towel Conservation Protocols",
        minutes: 3,
        content: "Respecting guest towel reuse choices.",
        blocks: [
          { id: "hsk3-h1", type: "heading", position: 1, headingText: "Towel Reuse Protocols" },
          { id: "hsk3-t1", type: "short_text", position: 2, bodyText: "Leave hung towels in place as requested by the guest and replace only towels left in the tub or on the floor." }
        ]
      },
      {
        order: 3,
        title: "Guestroom Energy Shutdown Routine",
        minutes: 3,
        content: "Thermostat setback and blackout curtains.",
        blocks: [
          { id: "hsk4-h1", type: "heading", position: 1, headingText: "Departure Routine" },
          { id: "hsk4-t1", type: "short_text", position: 2, bodyText: "Draw curtains, set AC to 24°C eco-standby, and remove master keycards upon exiting." }
        ]
      },
      {
        order: 4,
        title: "Preventing Ocean & Lagoon Pollution",
        minutes: 3,
        content: "Proper disposal of cleaning washwater.",
        blocks: [
          { id: "hsk5-h1", type: "heading", position: 1, headingText: "Protecting the Lagoon" },
          { id: "hsk5-t1", type: "short_text", position: 2, bodyText: "Always discard dirty washwater into utility sluice sinks, never down balcony or outdoor drains." }
        ]
      },
      {
        order: 5,
        title: "Housekeeping Action Commitment",
        minutes: 4,
        content: "Commit to daily sustainable housekeeping standards.",
        blocks: [
          { id: "hsk6-h1", type: "heading", position: 1, headingText: "Action Pledge" },
          { id: "hsk6-t1", type: "short_text", position: 2, bodyText: "Confirm your commitment to water conservation and energy setback checklists." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Why should housekeeping staff always use automated wall-mounted chemical dispensers?",
        options: [
          "They guarantee precise chemical dilution, preventing chemical overdosing, toxic fumes, and surface residue",
          "They make water smell like pine trees",
          "They are required to turn water into alcohol",
          "They prevent vacuum cleaners from breaking"
        ],
        correct: 0,
        correctExplanation: "Automated dispensers ensure safe dilution, protecting worker health and environmental discharge limits.",
        incorrectExplanation: "Incorrect. Dispensers ensure precise, safe chemical dilution ratios."
      },
      {
        order: 2,
        question: "In the 4-colour microfibre cleaning system, which colour is strictly designated for toilet bowls and urinals?",
        options: ["Red cloth", "Blue cloth", "Yellow cloth", "Green cloth"],
        correct: 0,
        correctExplanation: "Red cloths are reserved exclusively for high-pathogen surfaces to prevent cross-contamination.",
        incorrectExplanation: "Incorrect. Red is the standard colour code for toilet bowls and urinals."
      },
      {
        order: 3,
        question: "How should a room attendant handle towels hung neatly on the bathroom rack in accordance with resort environmental cards?",
        options: [
          "Leave the hung towels in place and replace only the towels left in the tub or on the floor",
          "Strip and replace all towels regardless of where they are placed",
          "Hang wet floor mats on the towel rail",
          "Charge the guest a fine for hanging towels"
        ],
        correct: 0,
        correctExplanation: "Respecting the guest's towel reuse choice saves significant water and energy in the laundry.",
        incorrectExplanation: "Incorrect. Replacing hung towels violates guest trust and causes unnecessary laundry cycles."
      },
      {
        order: 4,
        question: "What is the single most effective action upon finishing room turnover in a tropical climate to prevent heat buildup?",
        options: [
          "Draw blackout curtains and close balcony sliding doors tightly to block solar radiation",
          "Open all balcony doors and windows to let in tropical humidity",
          "Set the room AC to 16°C and leave keycards in the slot",
          "Leave all bathroom halogen lights burning"
        ],
        correct: 0,
        correctExplanation: "Closing doors and drawing curtains blocks solar heat gain, reducing subsequent cooling load.",
        incorrectExplanation: "Incorrect. Closed curtains and tight balcony seals block tropical heat."
      },
      {
        order: 5,
        question: "Where should dirty mop bucket washwater be discarded at the end of a shift?",
        options: [
          "Into the dedicated housekeeping utility sluice sink connected to wastewater treatment",
          "Down the guestroom balcony rainwater drain",
          "Directly onto the beach sand",
          "Into the outdoor swimming pool"
        ],
        correct: 0,
        correctExplanation: "Only designated sluice sinks route dirty water to treatment, protecting coastal lagoons.",
        incorrectExplanation: "Incorrect. Discarding washwater into outdoor drains pollutes coastal lagoons."
      },
      {
        order: 6,
        question: "What should you do if you notice a toilet continuously trickling in an occupied guestroom?",
        options: [
          "Report it immediately to maintenance via the housekeeping defect logging system",
          "Wait for the guest to check out next week",
          "Pour boiling water into the cistern",
          "Stuff toilet paper under the seal"
        ],
        correct: 0,
        correctExplanation: "Logging toilet leaks immediately prevents wasting up to 800 litres of water daily.",
        incorrectExplanation: "Incorrect. Toilet leaks must be logged immediately for repair."
      },
      {
        order: 7,
        question: "Why should room attendants avoid leaving keycard bypass cards in vacant rooms?",
        options: [
          "It wastes massive energy and can cause severe humidity condensation and mould",
          "It makes the TV explode",
          "It deletes the hotel website",
          "It turns off the resort wifi"
        ],
        correct: 0,
        correctExplanation: "Leaving AC running in unoccupied rooms wastes energy and promotes condensation damage.",
        incorrectExplanation: "Incorrect. Unmonitored AC running in empty rooms causes parasitic energy waste."
      },
      {
        order: 8,
        question: "How does sustainable housekeeping directly support resort profitability and guest satisfaction?",
        options: [
          "It delivers immaculate room hygiene, protects resort assets, and reduces utility overheads while satisfying eco-conscious guests",
          "It eliminates the need to clean guestrooms",
          "It shuts down the front desk",
          "It replaces all beds with sleeping bags"
        ],
        correct: 0,
        correctExplanation: "Sustainable housekeeping balances 5-star hygiene with resource stewardship and operating cost savings.",
        incorrectExplanation: "Incorrect. Eco-SOPs maintain pristine hygiene while reducing resource costs."
      }
    ]
  },

  // 6. ELH-48: Smart Building Automation & BMS Optimization
  {
    id: 48,
    courseCode: "ELH-48",
    slug: "smart-building-automation-and-bms-optimization",
    title: "Smart Building Automation & BMS Optimization",
    description: "Operate commercial Building Management Systems (BMS), sensor-driven HVAC scheduling, daylight harvesting, and automated fault detection.",
    fullDescription: "Modern commercial buildings in Mauritius possess advanced Building Management Systems (BMS), yet many run on manual overrides or outdated schedules. This course trains facility managers, building operators, and BMS technicians on sensor calibration, static pressure resets, optimal start algorithms, and automated fault detection.",
    categoryId: 2,
    durationMinutes: 30,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/smart-building-automation.jpg",
    intendedRoles: ["Facilities Managers", "BMS Operators", "Building Engineers", "Maintenance Technicians"],
    learningObjectives: [
      "Eliminate manual software overrides in commercial Building Management Systems.",
      "Implement occupancy-based and ambient-temperature HVAC scheduling algorithms.",
      "Calibrate CO2 demand-controlled ventilation (DCV) sensors to optimize fresh air intake.",
      "Configure duct static pressure reset and chilled water supply temperature reset curves.",
      "Deploy Automated Fault Detection & Diagnostics (AFDD) for simultaneous heating/cooling detection.",
      "Complete 8 scenario-based assessment questions on BMS optimization."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Smart Building Automation & BMS Optimization. Your BMS controls eliminate parasitic after-hours energy waste across commercial properties.",
    badgeName: "BMS Automation Specialist",
    badgeDescription: "Awarded for technical competency in Building Management System optimization, automated controls, and energy diagnostics.",
    badgeSlug: "bms-automation-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_GHG", "COMP_COMPLIANCE"],
    applicableSectors: ["SEC_PROPERTY", "SEC_HOSPITALITY"],
    applicableDepartments: ["DEP_FACILITIES", "DEP_ENGINEERING"],
    applicableJobFamilies: ["JF_TECHNICAL", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Eliminate after-hours energy waste through tuned BMS controls.",
    lessons: [
      {
        order: 0,
        title: "The Reality of BMS Operation",
        minutes: 5,
        content: "Why building management systems suffer from manual override drift.",
        blocks: [
          { id: "bms1-h1", type: "heading", position: 1, headingText: "The Manual Override Epidemic" },
          { id: "bms1-t1", type: "short_text", position: 2, bodyText: "Over 70% of commercial BMS systems operate with forgotten manual overrides. A technician sets an Air Handling Unit (AHU) to 'HAND' (manual ON) for a weekend event, and it runs 24/7 for the next 2 years unnoticed." },
          {
            id: "bms1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "BMS audit observation:",
            decisionPrompt: "During a monthly BMS review in an office tower in Cybercity, you find that 8 out of 12 AHUs are locked in 'MANUAL ON' operating at 100% speed overnight. What should you do?",
            decisionChoices: [
              { label: "Conduct a systematic override audit, restore all AHUs to automated time-of-day schedules with optimal start algorithms, and set automated alarm notifications for any future manual overrides exceeding 24 hours", correct: true, feedback: "Spot on! Returning AHUs to automated scheduling eliminates massive overnight parasitic energy waste." },
              { label: "Leave them in manual on so tenants never complain about air temperature", correct: false, feedback: "Incorrect. Running AHUs 24/7 inflates electricity bills and wears out fan belts prematurely." },
              { label: "Delete the BMS software completely", correct: false, feedback: "Incorrect. The BMS must be tuned, not removed." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Optimal Start & Time-of-Day Scheduling",
        minutes: 5,
        content: "Using outdoor temperature curves to calculate pre-cooling times.",
        blocks: [
          { id: "bms2-h1", type: "heading", position: 1, headingText: "Optimal Start Algorithms" },
          { id: "bms2-t1", type: "short_text", position: 2, bodyText: "Rather than turning on AHUs at a fixed 5:00 AM every morning, optimal start algorithms calculate the exact pre-cooling time required based on outdoor temperature, starting at 6:30 AM on mild days." }
        ]
      },
      {
        order: 2,
        title: "Demand-Controlled Ventilation (DCV) with CO2 Sensors",
        minutes: 5,
        content: "Modulating outside air dampers based on indoor occupant density.",
        blocks: [
          { id: "bms3-h1", type: "heading", position: 1, headingText: "Ventilating for Actual People" },
          { id: "bms3-t1", type: "short_text", position: 2, bodyText: "Traditional systems intake 100% fresh air continuously. DCV uses calibrated indoor CO2 sensors to modulate dampers, reducing hot humid outside air intake when meeting rooms are empty." }
        ]
      },
      {
        order: 3,
        title: "Dynamic Duct Static Pressure Reset",
        minutes: 5,
        content: "Trim-and-respond logic for variable air volume (VAV) air handlers.",
        blocks: [
          { id: "bms4-h1", type: "heading", position: 1, headingText: "Trim and Respond Logic" },
          { id: "bms4-t1", type: "short_text", position: 2, bodyText: "Instead of maintaining a constant high duct static pressure, trim-and-respond logic monitors VAV damper positions and reduces supply fan speed until the most open damper is at 90%." }
        ]
      },
      {
        order: 4,
        title: "Automated Fault Detection & Diagnostics (AFDD)",
        minutes: 5,
        content: "Detecting stuck valves and simultaneous heating and cooling.",
        blocks: [
          { id: "bms5-h1", type: "heading", position: 1, headingText: "Catching Hidden Energy Leaks" },
          { id: "bms5-t1", type: "short_text", position: 2, bodyText: "AFDD rules flag anomalous behaviour such as chilled water valves fighting electric reheat coils, or leaking cooling tower bypass valves." }
        ]
      },
      {
        order: 5,
        title: "BMS Optimization Action Checklist",
        minutes: 5,
        content: "Establish monthly BMS tune-up procedures.",
        blocks: [
          { id: "bms6-h1", type: "heading", position: 1, headingText: "Monthly Tune-Up Routine" },
          { id: "bms6-t1", type: "short_text", position: 2, bodyText: "Commit to monthly override clearing, sensor calibration audits, and VAV box stroke testing." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "What is the primary cause of energy waste in commercial Building Management Systems (BMS)?",
        options: [
          "Manual software overrides left active indefinitely, causing air handlers and pumps to run 24/7 regardless of building occupancy",
          "Computer monitors consuming too much battery",
          "BMS wires being painted blue",
          "The internet running out of data"
        ],
        correct: 0,
        correctExplanation: "Unchecked manual overrides are the leading cause of BMS energy drift, running fans and chillers through nights and weekends.",
        incorrectExplanation: "Incorrect. Forgotten manual overrides running equipment 24/7 drive severe BMS energy waste."
      },
      {
        order: 2,
        question: "How does an 'Optimal Start' algorithm save energy compared to fixed-time morning start schedules?",
        options: [
          "It dynamically calculates the latest possible start time required to reach comfort setpoints based on ambient temperature and building thermal mass",
          "It turns off the building power grid permanently",
          "It requires employees to start work at midnight",
          "It cools the building only with ice blocks"
        ],
        correct: 0,
        correctExplanation: "Optimal start algorithms avoid premature pre-cooling on mild mornings, saving 1 to 2 hours of equipment run time daily.",
        incorrectExplanation: "Incorrect. Optimal start calculates the minimum required pre-cooling time based on outdoor weather conditions."
      },
      {
        order: 3,
        question: "How does Demand-Controlled Ventilation (DCV) using indoor CO2 sensors reduce chiller energy consumption in tropical climates?",
        options: [
          "It modulates outside air dampers based on actual room occupancy, preventing excessive hot, humid ambient air from entering when rooms are empty",
          "It removes all oxygen from the building",
          "It converts carbon dioxide into electricity",
          "It requires all windows to be broken open"
        ],
        correct: 0,
        correctExplanation: "Cooling and dehumidifying tropical outside air is extremely energy-intensive; DCV minimizes fresh air intake when rooms are lightly occupied.",
        incorrectExplanation: "Incorrect. DCV restricts outside air intake to actual occupancy requirements, saving substantial cooling energy."
      },
      {
        order: 4,
        question: "What is 'Trim-and-Respond' logic in Variable Air Volume (VAV) supply air static pressure control?",
        options: [
          "The BMS gradually trims (lowers) supply fan pressure until at least one zone VAV damper opens to 90%, minimizing fan energy draw",
          "Cutting ductwork with hand scissors",
          "Turning off all ventilation fans every 5 minutes",
          "Setting all dampers to 0% permanently"
        ],
        correct: 0,
        correctExplanation: "Trim-and-respond lowers fan speed until the most demanding zone requires maximum airflow, eliminating over-pressurization.",
        incorrectExplanation: "Incorrect. Trim-and-respond dynamically minimizes duct static pressure to match real-time zone requirements."
      },
      {
        order: 5,
        question: "What major efficiency failure does Automated Fault Detection & Diagnostics (AFDD) routinely identify in AHUs?",
        options: [
          "Simultaneous heating and cooling caused by a stuck chilled water valve fighting an active heating/reheat coil",
          "Birds building nests inside the BMS mouse",
          "Computer cables carrying too many emails",
          "Water pipes turning into plastic"
        ],
        correct: 0,
        correctExplanation: "Stuck valves causing simultaneous heating and cooling represent huge hidden energy losses that AFDD automatically detects.",
        incorrectExplanation: "Incorrect. AFDD flags simultaneous heating and cooling from mechanical valve or control faults."
      },
      {
        order: 6,
        question: "Why should commercial building operators regularly re-calibrate indoor temperature and CO2 sensors?",
        options: [
          "Sensor drift over time causes false readings, leading to over-cooling or excessive fresh air intake that inflates energy bills",
          "Uncalibrated sensors turn into smoke alarms",
          "Sensors lose their serial numbers if not calibrated",
          "Calibration makes sensors change colour"
        ],
        correct: 0,
        correctExplanation: "Sensor drift of just 1°C or 100 ppm CO2 can trigger unnecessary chiller staging or excessive damper opening.",
        incorrectExplanation: "Incorrect. Sensor calibration prevents drift from causing false heating/cooling commands."
      },
      {
        order: 7,
        question: "What should a BMS operator do when a temporary manual override is required for a special weekend event?",
        options: [
          "Set a timed override with an automated expiration timer so the system automatically reverts to scheduled auto mode after the event",
          "Lock the system in permanent manual ON and leave for holiday",
          "Cut the control sensor wires",
          "Unplug the BMS computer entirely"
        ],
        correct: 0,
        correctExplanation: "Timed overrides guarantee that temporary manual commands automatically expire, preventing permanent 24/7 energy waste.",
        incorrectExplanation: "Incorrect. Timed overrides ensure equipment automatically reverts to schedule once the event concludes."
      },
      {
        order: 8,
        question: "How does integrating BMS energy sub-metering data into automated dashboards drive continuous building optimization?",
        options: [
          "It provides real-time energy intensity metrics (kWh/m²), exposing abnormal consumption spikes and verifying the impact of energy retrofits",
          "It generates automated tax refunds from the government",
          "It allows operators to turn off the national electrical utility",
          "It makes the building immune to power outages"
        ],
        correct: 0,
        correctExplanation: "Sub-meter visualization highlights operational anomalies immediately and validates efficiency investments.",
        incorrectExplanation: "Incorrect. Sub-meter dashboards pinpoint consumption anomalies and track continuous performance."
      }
    ]
  },

  // 7. ELH-49: Construction Site Environmental Controls
  {
    id: 49,
    courseCode: "ELH-49",
    slug: "construction-site-environmental-controls",
    title: "Construction Site Environmental Controls",
    description: "Manage sedimentation barriers, silt fences, dust suppression, concrete washout bins, and diesel generator efficiency on construction sites.",
    fullDescription: "Civil engineering and building construction sites in Mauritius face strict environmental regulations to protect groundwater, rivers, and coastal coral lagoons. This course equips site engineers, project managers, and foremen with standard operating procedures for erosion control, concrete washout containment, dust misting, and chemical storage.",
    categoryId: 2,
    durationMinutes: 25,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/construction-environmental-controls.jpg",
    intendedRoles: ["Site Engineers", "Construction Project Managers", "Site Foremen", "HSE Construction Officers"],
    learningObjectives: [
      "Install and maintain geotextile silt fences, sediment basins, and check dams.",
      "Manage dedicated lined concrete washout containers to prevent alkaline slurry runoff.",
      "Implement water-efficient dust suppression misting systems on earthwork haul roads.",
      "Maintain double-bunded fuel storage for site diesel generators and heavy machinery.",
      "Comply with EPA Mauritius construction environmental guidelines and stop-work thresholds.",
      "Complete 8 scenario-based assessment questions on construction site environmental management."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Construction Site Environmental Controls. Your on-site sediment barriers and chemical controls protect Mauritius streams and lagoons.",
    badgeName: "Construction Environmental Specialist",
    badgeDescription: "Awarded for demonstrating operational excellence in construction site erosion control, stormwater management, and pollution prevention.",
    badgeSlug: "construction-environmental-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_COMPLIANCE",
    secondaryCompetencies: ["COMP_WATER", "COMP_BIODIVERSITY", "COMP_CIRCULARITY"],
    applicableSectors: ["SEC_CONSTRUCTION", "SEC_PROPERTY"],
    applicableDepartments: ["DEP_OPERATIONS", "DEP_HSE", "DEP_ENGINEERING"],
    applicableJobFamilies: ["JF_TECHNICAL", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Prevent sediment runoff and dust pollution on construction sites.",
    lessons: [
      {
        order: 0,
        title: "Construction Runoff & Lagoon Vulnerability",
        minutes: 4,
        content: "How bare soil erosion smothers coral reefs during tropical rainfall.",
        blocks: [
          { id: "con1-h1", type: "heading", position: 1, headingText: "The Silt Threat" },
          { id: "con1-t1", type: "short_text", position: 2, bodyText: "During tropical downpours in Mauritius, uncontained construction earthworks release thousands of tonnes of red clay silt into drainage channels, flowing directly into coastal lagoons and suffocating living coral reefs." },
          {
            id: "con1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Active construction site dilemma:",
            decisionPrompt: "A ready-mix concrete truck driver finishes discharging a load on site and prepares to wash the chute out onto the bare ground near an open drainage ditch. What should the site foreman do?",
            decisionChoices: [
              { label: "Stop the driver immediately and direct the truck to the designated impervious, lined concrete washout pit; concrete slurry has a toxic pH > 12 and will severely contaminate groundwater and soil", correct: true, feedback: "Spot on! Concrete washout water is highly caustic (pH 12+) and must never be discharged onto open ground or into drains." },
              { label: "Let the driver wash onto the ground to speed up turnaround time", correct: false, feedback: "Severe environmental violation! Caustic concrete slurry pollutes groundwater and violates the EPA." },
              { label: "Wash the concrete chute into the site drinking water tank", correct: false, feedback: "Severe health hazard! Concrete washout is toxic." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Erosion & Sedimentation Controls",
        minutes: 4,
        content: "Silt fences, sediment retention basins, and straw check dams.",
        blocks: [
          { id: "con2-h1", type: "heading", position: 1, headingText: "Physical Silt Containment" },
          { id: "con2-t1", type: "short_text", position: 2, bodyText: "Install geotextile silt fences trenched 15 cm into the ground along site perimeters, backed by staked sediment retention basins to settle suspended particles before discharge." }
        ]
      },
      {
        order: 2,
        title: "Concrete Washout & Chemical Containment",
        minutes: 4,
        content: "Managing high-pH concrete slurry and fuel generator bunding.",
        blocks: [
          { id: "con3-h1", type: "heading", position: 1, headingText: "Hazardous Site Liquids" },
          { id: "con3-t1", type: "short_text", position: 2, bodyText: "All diesel generator fuel tanks must be housed inside 110% capacity impermeable secondary bunds. Concrete washout pits must be lined with heavy-duty geomembrane liners." }
        ]
      },
      {
        order: 3,
        title: "Dust Suppression & Haul Road Management",
        minutes: 4,
        content: "Water misting, tire wash stations, and gravel stabilization.",
        blocks: [
          { id: "con4-h1", type: "heading", position: 1, headingText: "Airborne Dust Controls" },
          { id: "con4-t1", type: "short_text", position: 2, bodyText: "Stabilize haul roads with crushed aggregate and deploy water misting trucks during dry windy periods. Install tire wash bays at site exits to prevent mud tracking onto public highways." }
        ]
      },
      {
        order: 4,
        title: "Site Waste Segregation & Timber Reuse",
        minutes: 4,
        content: "Scrap metal, formwork timber, and concrete rubble recycling.",
        blocks: [
          { id: "con5-h1", type: "heading", position: 1, headingText: "Construction Waste Segregation" },
          { id: "con5-t1", type: "short_text", position: 2, bodyText: "Provide separate skip containers for scrap metal, reusable timber formwork, and clean concrete rubble. Crush clean rubble on site for sub-base fill." }
        ]
      },
      {
        order: 5,
        title: "Construction Site Environmental Checklist",
        minutes: 5,
        content: "Execute daily site environmental audits and spill drills.",
        blocks: [
          { id: "con6-h1", type: "heading", position: 1, headingText: "Foreman's Daily Inspection" },
          { id: "con6-t1", type: "short_text", position: 2, bodyText: "Inspect silt fences after every heavy rain, check generator drip trays, and verify concrete washout capacity." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Why is ready-mix concrete chute washout water classified as a hazardous environmental pollutant on construction sites?",
        options: [
          "It is highly alkaline (caustic pH > 12) and contains toxic heavy metals that kill vegetation, contaminate groundwater, and destroy aquatic life",
          "It smells like fresh paint",
          "It turns into pure drinking water immediately",
          "It makes concrete trucks drive backwards"
        ],
        correct: 0,
        correctExplanation: "Concrete washout has a caustic pH of 12+ (similar to liquid bleach) and must be contained in impermeable lined pits.",
        incorrectExplanation: "Incorrect. Concrete washout is highly alkaline and toxic to soil, groundwater, and marine ecosystems."
      },
      {
        order: 2,
        question: "How must geotextile silt fences be installed along construction site boundaries to be effective during heavy tropical rains?",
        options: [
          "The bottom 15 cm of the fabric must be trenched into the soil and backfilled with compacted earth, supported by hardwood stakes on the downhill side",
          "Draped loosely over plastic garden chairs",
          "Nailed to nearby trees 2 metres above the ground",
          "Spread flat on the site entrance without stakes"
        ],
        correct: 0,
        correctExplanation: "Trenching the bottom edge prevents stormwater runoff from blowing out underneath the silt barrier.",
        incorrectExplanation: "Incorrect. Silt fences must be trenched 15 cm into the ground to prevent muddy runoff from undermining the barrier."
      },
      {
        order: 3,
        question: "What secondary containment standard is legally required for on-site diesel fuel storage tanks and generator skids?",
        options: [
          "An impermeable double-walled tank or secondary bunding structure capable of holding at least 110% of the tank's maximum liquid capacity",
          "Placing the fuel tank directly on bare dirt near a river",
          "Digging an open dirt hole under the tank",
          "Storing fuel in open plastic buckets"
        ],
        correct: 0,
        correctExplanation: "110% secondary bunding ensures complete capture in the event of a catastrophic tank puncture or connection failure.",
        incorrectExplanation: "Incorrect. Fuel tanks require 110% impermeable secondary containment to prevent catastrophic ground contamination."
      },
      {
        order: 4,
        question: "What is the most effective method for preventing construction haul trucks from depositing mud and dust onto public roads?",
        options: [
          "Installing a gravel rumble strip and pressurized tire wash bay at the site exit gate",
          "Driving trucks as fast as possible through public streets",
          "Washing truck tires directly onto public sidewalks",
          "Prohibiting trucks from using tires"
        ],
        correct: 0,
        correctExplanation: "Tire wash stations and crushed aggregate exit aprons knock off caked mud before trucks enter public roads.",
        incorrectExplanation: "Incorrect. Dedicated tire wash bays and aggregate aprons clean wheels before trucks enter public roads."
      },
      {
        order: 5,
        question: "How should clean concrete, brick, and masonry demolition rubble be managed on sustainable construction projects?",
        options: [
          "Segregated from general trash and crushed on site or sent to certified recyclers for use as road sub-base aggregate",
          "Dumped in coastal mangroves",
          "Buried under temporary site office buildings",
          "Burned in an open fire pit"
        ],
        correct: 0,
        correctExplanation: "Crushing masonry rubble into structural aggregate prevents landfill tipping and eliminates the need to quarry virgin gravel.",
        incorrectExplanation: "Incorrect. Clean concrete and masonry rubble should be crushed and repurposed as road sub-base fill."
      },
      {
        order: 6,
        question: "What immediate action must a site foreman take if a heavy excavator ruptures a hydraulic oil hose on bare soil?",
        options: [
          "Deploy the site emergency spill kit immediately: place oil-absorbent booms around the spill, apply absorbent pads/granules, and excavate contaminated soil into sealed hazardous waste drums",
          "Wash the hydraulic oil into the nearest storm drain with a fire hose",
          "Cover the spill with dry leaves and pretend nothing happened",
          "Wait for the next cyclone to wash it away"
        ],
        correct: 0,
        correctExplanation: "Immediate spill kit deployment contains hydrocarbons, and contaminated soil must be disposed of as certified hazardous waste.",
        incorrectExplanation: "Incorrect. Hydraulic spills must be contained immediately with spill kits and contaminated soil disposed of safely."
      },
      {
        order: 7,
        question: "Why should construction site earthwork stockpiles be covered with tarpaulins or hydromulched during prolonged work halts?",
        options: [
          "It prevents heavy wind from blowing fine dust into adjacent neighborhoods and stops rainfall from eroding slopes into silt runoff",
          "It makes the dirt piles look like camping tents",
          "It makes the soil grow into rock",
          "It prevents birds from landing on the site"
        ],
        correct: 0,
        correctExplanation: "Covering stockpiles prevents severe dust nuisance and stops rain from washing valuable fill into drainage channels.",
        incorrectExplanation: "Incorrect. Tarpaulins and hydromulch protect exposed dirt piles from wind erosion and torrential rain washouts."
      },
      {
        order: 8,
        question: "What is the role of an Environmental Management Plan (EMP) on commercial construction projects in Mauritius?",
        options: [
          "It establishes auditable environmental operating protocols, noise limits, dust control procedures, and waste disposal manifests required for statutory compliance",
          "It replaces the architectural structural building drawings",
          "It grants contractors immunity from national safety laws",
          "It allows construction to proceed without building permits"
        ],
        correct: 0,
        correctExplanation: "An approved EMP outlines statutory mitigation measures, monitoring schedules, and contractor responsibilities.",
        incorrectExplanation: "Incorrect. The EMP defines mandatory environmental mitigation measures and monitoring schedules on site."
      }
    ]
  }
];

export async function ensureWave1Catalogue(): Promise<void> {
  try {
    for (const courseDef of WAVE_1_COURSES) {
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

    logger.info("Sprint 14.12 Wave 1 Catalogue seeding completed successfully.");
  } catch (err) {
    logger.error({ err }, "Failed to seed Wave 1 Catalogue");
    throw err;
  }
}
