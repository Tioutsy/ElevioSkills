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

  // 2. ELH-36: Sustainable Commercial Kitchens & Culinary
  {
    id: 36,
    courseCode: "ELH-36",
    slug: "sustainable-commercial-kitchens-and-culinary",
    title: "Sustainable Commercial Kitchens & Culinary",
    description: "Induction cooking efficiency, equipment startup and shutdown scheduling, demand-controlled exhaust hoods, and kitchen heat load reduction.",
    fullDescription: "Commercial resort and restaurant kitchens are intensive energy consumers. This course equips head chefs, line cooks, and kitchen stewards with operational protocols for induction cooking, exhaust hood modulation, equipment staging, and kitchen waste heat reduction.",
    categoryId: 2,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Applied Workplace Practice",
    isFeatured: false,
    thumbnailUrl: "/images/courses/sustainable-commercial-kitchens.jpg",
    intendedRoles: ["Chefs", "Line Cooks", "Kitchen Stewards", "F&B Supervisors"],
    learningObjectives: [
      "Implement equipment start-up and shut-down schedules to avoid peak morning electrical demand surges.",
      "Operate commercial induction cooktops and combi-steamers at optimal thermal efficiency settings.",
      "Coordinate with stewarding and maintenance on demand-controlled kitchen ventilation (DCKV) hood sensors.",
      "Maintain clean grease filters and refrigeration door gaskets to prevent compressor overwork.",
      "Apply low-energy hot-holding and blast-chilling temperature management SOPs.",
      "Complete 8 scenario-based assessment questions on commercial culinary energy stewardship."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Sustainable Commercial Kitchens & Culinary.",
    badgeName: "Sustainable Culinary Specialist",
    badgeDescription: "Awarded for demonstrating operational excellence in commercial kitchen energy efficiency and sustainable food service operations.",
    badgeSlug: "sustainable-culinary-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_WATER", "COMP_CIRCULARITY"],
    applicableSectors: ["SEC_HOSPITALITY"],
    applicableDepartments: ["DEP_FOOD_BEVERAGE"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR", "JF_PROFESSIONAL"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Reduce peak electrical draw, water consumption, and thermal kitchen load during prep shifts.",
    lessons: [
      {
        order: 0,
        title: "Commercial Kitchen Energy Profiles",
        minutes: 3,
        content: "Understanding high-intensity energy zones in commercial food production.",
        blocks: [
          { id: "kit1-h1", type: "heading", position: 1, headingText: "High Thermal Intensity" },
          { id: "kit1-t1", type: "short_text", position: 2, bodyText: "Commercial kitchens consume roughly 2.5 times more energy per square metre than other commercial hospitality spaces. Unstaged equipment startup creates massive peak electrical spikes." },
          {
            id: "kit1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Morning kitchen prep dilemma:",
            decisionPrompt: "The breakfast prep shift arrives at 5:30 AM. The prep cook wants to turn on all fryers, combi-ovens, salamanders, and exhaust hoods at once. What should be done?",
            decisionChoices: [
              { label: "Stagger equipment startup according to actual production schedules; fire ovens 15 minutes before needed and leave holding equipment off until service", correct: true, feedback: "Spot on! Staggered startup eliminates peak power demand surcharges and prevents idle thermal waste." },
              { label: "Turn everything on at maximum temperature immediately to warm the kitchen", correct: false, feedback: "Incorrect. Full simultaneous startup causes severe power spikes and wastes substantial energy." },
              { label: "Turn off all walk-in chillers to save power during cooking", correct: false, feedback: "Dangerous! Disabling refrigeration violates HACCP food safety boundaries." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Induction Cooking & Combi-Steamer Optimization",
        minutes: 4,
        content: "Maximizing electromagnetic transfer efficiency and combi steam staging.",
        blocks: [
          { id: "kit2-h1", type: "heading", position: 1, headingText: "Thermal Efficiency Transfer" },
          { id: "kit2-t1", type: "short_text", position: 2, bodyText: "Induction cooktops deliver over 85% thermal efficiency compared to less than 40% for open gas burners, drastically cutting ambient kitchen heat and ventilation requirements." }
        ]
      },
      {
        order: 2,
        title: "Demand-Controlled Kitchen Ventilation (DCKV)",
        minutes: 3,
        content: "Optical smoke and thermal sensors modulating exhaust hood fan speeds.",
        blocks: [
          { id: "kit3-h1", type: "heading", position: 1, headingText: "Smart Exhaust Hoods" },
          { id: "kit3-t1", type: "short_text", position: 2, bodyText: "DCKV systems adjust exhaust fan speeds from 100% during heavy searing down to 50% during light simmering, cutting makeup air conditioning loads." }
        ]
      },
      {
        order: 3,
        title: "Refrigeration & Cold-Holding Integrity",
        minutes: 3,
        content: "Condenser airflow, gasket sealing, and defrost management.",
        blocks: [
          {
            id: "kit4-d1",
            type: "decision_scenario",
            position: 1,
            decisionIntro: "Walk-in freezer inspection:",
            decisionPrompt: "During busy lunch service, staff frequently prop the walk-in freezer door open with a crate to speed up ingredient retrieval. What action is required?",
            decisionChoices: [
              { label: "Enforce strict door-closure discipline and install heavy-duty PVC strip curtains to prevent warm humid air infiltration and ice buildup on evaporator coils", correct: true, feedback: "Spot on! Propping freezer doors open causes severe coil icing, compressor strain, and rapid temperature loss." },
              { label: "Leave the door open all day to air out the freezer", correct: false, feedback: "Incorrect. Open freezer doors cause severe energy waste and risk food spoilage." },
              { label: "Turn the freezer thermostat down to -40°C to compensate", correct: false, feedback: "Incorrect. Over-chilling doubles compressor power draw without solving humidity infiltration." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Dishwashing & Stewarding Water Conservation",
        minutes: 3,
        content: "Flight-type dishwashers, pre-rinse spray valves, and rack staging.",
        blocks: [
          { id: "kit5-h1", type: "heading", position: 1, headingText: "High-Efficiency Stewarding" },
          { id: "kit5-t1", type: "short_text", position: 2, bodyText: "Only operate rack-conveyor dishwashers with full loads, and use high-velocity low-flow pre-rinse spray nozzles (under 4.5 L/min)." }
        ]
      },
      {
        order: 5,
        title: "Culinary Energy Action Checklist",
        minutes: 4,
        content: "Establish shift closing protocols and kitchen maintenance requests.",
        blocks: [
          { id: "kit6-h1", type: "heading", position: 1, headingText: "Shift Handover SOP" },
          { id: "kit6-t1", type: "short_text", position: 2, bodyText: "Verify all non-essential equipment, heated pass-through lamps, and exhaust hoods are switched off at close." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Why should commercial kitchen equipment startup be staggered rather than switched on all at once at the start of a shift?",
        options: [
          "It prevents massive electrical peak demand spikes and reduces idle heating energy before food prep begins",
          "It allows chefs to listen to the radio",
          "It cools down the dining room",
          "It makes gas burners produce ozone"
        ],
        correct: 0,
        correctExplanation: "Staggered startup flattens peak electrical demand surges and saves power by heating units only when needed.",
        incorrectExplanation: "Incorrect. Staggering startup avoids maximum demand utility surcharges and eliminates pre-shift idle waste."
      },
      {
        order: 2,
        question: "What is the primary energy advantage of commercial induction hobs over traditional open-flame gas ranges?",
        options: [
          "Induction transfers over 85% of electrical energy directly into the pan, minimizing ambient kitchen heat and exhaust requirements",
          "Induction cooktops make food cook with radiation",
          "Induction eliminates the need for pots and pans",
          "Induction operates without electrical power"
        ],
        correct: 0,
        correctExplanation: "Induction hobs heat the cookware directly with magnetic fields, transferring 85%+ of thermal energy with minimal waste heat.",
        incorrectExplanation: "Incorrect. Induction hobs achieve 85%+ thermal efficiency compared to under 40% for open gas flames."
      },
      {
        order: 3,
        question: "How does Demand-Controlled Kitchen Ventilation (DCKV) save electrical and thermal energy?",
        options: [
          "It uses optical and temperature sensors to modulate exhaust fan speeds according to actual cooking intensity rather than running at 100% constantly",
          "It replaces kitchen exhaust hoods with open windows",
          "It turns off kitchen lighting when pans are hot",
          "It exhausts smoke into the dining room"
        ],
        correct: 0,
        correctExplanation: "DCKV reduces hood exhaust and tempered make-up air volume when appliances are idle or lightly simmering.",
        incorrectExplanation: "Incorrect. DCKV automatically modulates hood fan speeds based on real-time heat and vapor production."
      },
      {
        order: 4,
        question: "What is the operational consequence of leaving walk-in cold room and freezer doors propped open during service?",
        options: [
          "Warm humid air enters, causing heavy frost on evaporator coils, compressor overwork, increased power draw, and food safety risk",
          "It improves the air conditioning of the hot kitchen line",
          "It keeps the walk-in floor dry and clean",
          "It increases the shelf life of dairy products"
        ],
        correct: 0,
        correctExplanation: "Propped doors allow tropical humidity to ice over evaporator coils, drastically degrading cooling efficiency.",
        incorrectExplanation: "Incorrect. Leaving cold room doors open introduces moisture, forms ice on coils, and increases energy use by up to 50%."
      },
      {
        order: 5,
        question: "Which stewarding practice delivers the greatest water and thermal energy savings in commercial dishwashing?",
        options: [
          "Washing only completely full dishracks and using low-flow high-velocity pre-rinse trigger spray valves",
          "Running single plates through the machine as soon as they arrive",
          "Washing dishes under continuous hot running water taps in open sinks",
          "Using cold ocean seawater to wash glassware"
        ],
        correct: 0,
        correctExplanation: "Full-rack staging ensures every litre of heated wash and rinse water is utilized at maximum capacity.",
        incorrectExplanation: "Incorrect. Running full dishracks and using high-velocity pre-rinse nozzles cuts stewarding water and heating costs dramatically."
      },
      {
        order: 6,
        question: "Why should kitchen refrigeration condenser coils and door gaskets be inspected and cleaned monthly?",
        options: [
          "Dust-choked coils and torn gaskets force compressors to run continuously, inflating electricity use and triggering premature mechanical failure",
          "It makes the stainless steel shiny for dining guests",
          "It stops ice cream from melting into liquid nitrogen",
          "It changes the refrigerant gas into clean oxygen"
        ],
        correct: 0,
        correctExplanation: "Clean condenser coils and airtight magnetic gaskets ensure efficient heat rejection and temperature retention.",
        incorrectExplanation: "Incorrect. Dirty coils and leaky gaskets restrict heat exchange, raising compressor run-time and energy use."
      },
      {
        order: 7,
        question: "What is the best practice for managing heated pass-through holding cabinets during lull periods between meal services?",
        options: [
          "Power them off or set to standby holding modes when empty between shift meal periods",
          "Keep all holding cabinets at 95°C empty 24 hours a day",
          "Use them to dry wet kitchen aprons and towels",
          "Store ice cream tubs inside them"
        ],
        correct: 0,
        correctExplanation: "Powering down empty hot-holding units between peak services prevents thousands of kWh of wasted thermal standby energy.",
        incorrectExplanation: "Incorrect. Empty hot-holding cabinets should be switched off between services to eliminate parasitic standby load."
      },
      {
        order: 8,
        question: "How do sustainable kitchen standard operating procedures (SOPs) benefit commercial culinary operations?",
        options: [
          "They reduce utility operating overheads, create cooler and safer kitchen working conditions, and uphold high culinary and hygiene standards",
          "They eliminate the need to cook hot food",
          "They double the food preparation time for guests",
          "They require kitchens to operate without electricity"
        ],
        correct: 0,
        correctExplanation: "Efficient culinary SOPs reduce energy overheads, lower kitchen ambient heat stress, and preserve food quality.",
        incorrectExplanation: "Incorrect. Energy-efficient culinary SOPs optimize working comfort, lower utility bills, and support operational excellence."
      }
    ]
  },

  // 3. ELH-37: Hotel Food Waste Prevention & Composting
  {
    id: 37,
    courseCode: "ELH-37",
    slug: "hotel-food-waste-prevention-and-composting",
    title: "Hotel Food Waste Prevention & Composting",
    description: "Buffet portioning, prep trim reduction, surplus food donation protocols, and on-site commercial composting.",
    fullDescription: "Food waste represents a major financial loss and environmental impact in hotel and resort operations. This course trains F&B teams, banquet staff, chefs, and stewards on food waste measurement, menu trim optimization, buffet replenishment pacing, and aerobic composting systems.",
    categoryId: 2,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Applied Workplace Practice",
    isFeatured: false,
    thumbnailUrl: "/images/courses/hotel-food-waste-prevention.jpg",
    intendedRoles: ["Chefs", "F&B Staff", "Stewards", "Banquet Supervisors"],
    learningObjectives: [
      "Track and categorize kitchen prep trim, plate waste, and buffet overproduction using daily waste logs.",
      "Execute dynamic buffet replenishment pacing to minimize end-of-service surplus.",
      "Implement safe surplus food storage and donation protocols complying with food safety standards.",
      "Operate on-site organic composters and manage carbon-to-nitrogen ratios with resort landscaping teams.",
      "Engage guests constructively on food portioning without degrading hospitality experience.",
      "Complete 8 scenario-based assessment questions on food waste prevention."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Hotel Food Waste Prevention & Composting.",
    badgeName: "Food Waste Reduction Specialist",
    badgeDescription: "Awarded for demonstrating excellence in hotel kitchen waste tracking, buffet pacing, and organic recycling.",
    badgeSlug: "food-waste-reduction-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_CIRCULARITY",
    secondaryCompetencies: ["COMP_GHG", "COMP_COMPLIANCE"],
    applicableSectors: ["SEC_HOSPITALITY", "SEC_RETAIL"],
    applicableDepartments: ["DEP_FOOD_BEVERAGE"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR", "JF_PROFESSIONAL"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Cut organic waste volume going to landfill from banquet and restaurant buffets.",
    lessons: [
      {
        order: 0,
        title: "The Scale and Cost of Resort Food Waste",
        minutes: 3,
        content: "Understanding prep waste, buffet overproduction, and post-consumer plate waste.",
        blocks: [
          { id: "fw1-h1", type: "heading", position: 1, headingText: "Where Waste Occurs" },
          { id: "fw1-t1", type: "short_text", position: 2, bodyText: "In Mauritian resort buffets, over 40% of discarded food originates from unconsumed buffet chafing dishes. Preventing overproduction saves both food purchasing costs and landfill methane emissions." },
          {
            id: "fw1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Dinner buffet final hour dilemma:",
            decisionPrompt: "It is 9:15 PM and dinner buffet service ends at 10:00 PM. Guest footfall is slowing down, but three luxury meat and seafood platters are half-empty. What should the chef do?",
            decisionChoices: [
              { label: "Switch to small-dish replenishment or cook-to-order live cooking stations for the final 45 minutes rather than filling deep full-size chafing pans", correct: true, feedback: "Spot on! Shallow pans and live cooking ensure freshness for late-dining guests while preventing massive end-of-night scrap waste." },
              { label: "Cook full 10-kg batch trays to ensure the buffet looks overflowing until the last minute", correct: false, feedback: "Incorrect. Full batch refills at the end of service inevitably result in massive food waste." },
              { label: "Immediately remove all food and turn off lights 45 minutes early", correct: false, feedback: "Incorrect. Turning away paying guests harms service reputation." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Kitchen Preparation Waste & Nose-to-Tail Yield",
        minutes: 4,
        content: "Vegetable peel stock stocks, carcass butchery yield, and precision prep.",
        blocks: [
          { id: "fw2-h1", type: "heading", position: 1, headingText: "Maximizing Ingredient Yield" },
          { id: "fw2-t1", type: "short_text", position: 2, bodyText: "Clean vegetable trimmings and bones should be channeled into stocks and reductions rather than discarded into general waste bins." }
        ]
      },
      {
        order: 2,
        title: "Buffet Presentation & Dish Pacing Strategies",
        minutes: 3,
        content: "Using shallow inserts, individual ramekins, and dynamic pan sizing.",
        blocks: [
          { id: "fw3-h1", type: "heading", position: 1, headingText: "Visual Abundance Without Waste" },
          { id: "fw3-t1", type: "short_text", position: 2, bodyText: "Shallow buffet inserts create the visual illusion of abundant generosity while holding 50% less volume, enabling faster food turnover and fresher meals." }
        ]
      },
      {
        order: 3,
        title: "Safe Surplus Food Recovery & Donation",
        minutes: 3,
        content: "HACCP temperature logs, blast chilling, and community redistribution.",
        blocks: [
          {
            id: "fw4-d1",
            type: "decision_scenario",
            position: 1,
            decisionIntro: "Banquet surplus handling:",
            decisionPrompt: "A conference banquet has 50 unserved portions of cooked chicken breast maintained strictly above 63°C in holding ovens. How should this surplus be handled?",
            decisionChoices: [
              { label: "Rapidly blast chill down to below 4°C within 90 minutes, label with date and allergen codes, and store in dedicated food-bank donation chillers under approved sanitary protocol", correct: true, feedback: "Spot on! Following HACCP blast-chilling and documentation standards enables safe food donation without health risks." },
              { label: "Leave it on the kitchen counter at room temperature overnight for staff lunch tomorrow", correct: false, feedback: "Severe food safety hazard! Danger zone temperatures promote bacterial proliferation." },
              { label: "Throw all unserved food into the municipal trash compactor immediately", correct: false, feedback: "Incorrect. Edible unserved food should be safely recovered and redistributed." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "On-Site Commercial Composting & Bokashi",
        minutes: 3,
        content: "Organic waste segregation, tumbler aeration, and resort garden mulch.",
        blocks: [
          { id: "fw5-h1", type: "heading", position: 1, headingText: "Closing the Nutrient Loop" },
          { id: "fw5-t1", type: "short_text", position: 2, bodyText: "Segregated plate scraps and coffee grounds fed into on-site aerobic composters produce rich soil conditioner for resort landscaping, diverting tonnes from Mare Chicose landfill." }
        ]
      },
      {
        order: 5,
        title: "Daily Waste Tracking & Team Engagement",
        minutes: 4,
        content: "Transparent waste weighing scales and kitchen waste reduction targets.",
        blocks: [
          { id: "fw6-h1", type: "heading", position: 1, headingText: "Measure to Manage" },
          { id: "fw6-t1", type: "short_text", position: 2, bodyText: "Weighing waste bins per section (prep, buffet, plate) daily gives chefs the data required to adjust menu prep sheets." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "What is the most effective operational strategy to minimize food waste during the final hour of a hotel buffet service?",
        options: [
          "Switch from large deep chafing pans to shallow inserts or live cook-to-order preparation",
          "Cook double portions so the buffet looks full when closing",
          "Turn off all warmers and lock the restaurant doors early",
          "Mix raw ingredients into cooked buffet dishes"
        ],
        correct: 0,
        correctExplanation: "Shallow pans maintain visual appeal while minimizing surplus food discarded at closing time.",
        incorrectExplanation: "Incorrect. Using shallow inserts and cook-to-order prep prevents massive late-service food waste."
      },
      {
        order: 2,
        question: "Why is diverting organic food waste away from landfills an urgent environmental priority in Mauritius?",
        options: [
          "Organic waste decomposing in anaerobic landfills releases potent methane (CH4) greenhouse gas and generates toxic leachate that threatens groundwater",
          "Landfills require food waste to grow trees",
          "Food waste makes landfill trucks drive faster",
          "Organic waste turns into gold under sunlight"
        ],
        correct: 0,
        correctExplanation: "Food rotting in landfills creates methane (28x more potent than CO2) and produces polluting leachate.",
        incorrectExplanation: "Incorrect. Landfilled organics generate potent methane emissions and hazardous groundwater leachate."
      },
      {
        order: 3,
        question: "What is the role of visual portion control (such as using smaller plates and shallow buffet pans) in sustainable F&B operations?",
        options: [
          "It reduces post-consumer plate waste and buffet scrap while ensuring guests can take second helpings if desired",
          "It prevents guests from eating any food",
          "It forces guests to pay extra for dessert",
          "It replaces cooked meals with vitamin pills"
        ],
        correct: 0,
        correctExplanation: "Right-sized presentation curbs plate overfill while preserving guest dining freedom and luxury perception.",
        incorrectExplanation: "Incorrect. Thoughtful plating and shallow pans reduce unnecessary plate waste without restricting guest satisfaction."
      },
      {
        order: 4,
        question: "Under HACCP standards, how must hot surplus food from untouched banquet holding cabinets be processed for safe donation?",
        options: [
          "Rapidly blast-chilled to below 4°C within 90 minutes, labelled with production date/allergens, and held in sanitary cold storage",
          "Left on the kitchen counter at room temperature overnight",
          "Placed in open cardboard boxes under the sun",
          "Reheated to 200°C in an open fire pit"
        ],
        correct: 0,
        correctExplanation: "Rapid blast chilling and temperature logging ensures safe redistribution without bacterial danger zone exposure.",
        incorrectExplanation: "Incorrect. Surplus food must be blast-chilled to <4°C within 90 minutes and documented for safe donation."
      },
      {
        order: 5,
        question: "How can clean kitchen prep trim (such as vegetable peels and herb stems) be upcycled into culinary value?",
        options: [
          "Simmered into rich stocks, broths, and reductions, or dried into seasoning powders",
          "Dumped into the ocean behind the resort",
          "Flushed down toilet drains",
          "Burned in kitchen garbage bins"
        ],
        correct: 0,
        correctExplanation: "Clean vegetable trimmings and carcasses provide the base for stocks and sauces, extracting 100% of ingredient value.",
        incorrectExplanation: "Incorrect. Trimmings can be repurposed into stocks, sauces, and culinary powders to extract maximum yield."
      },
      {
        order: 6,
        question: "What is the critical operating requirement for maintaining an odor-free on-site aerobic composting system at a resort?",
        options: [
          "Maintaining a proper balance of nitrogen-rich food scraps ('greens') and carbon-rich dry leaves/wood chips ('browns') with adequate aeration",
          "Pouring full-strength chlorine bleach into the composter daily",
          "Sealing the composter airtight with no oxygen",
          "Adding plastic cutlery to absorb moisture"
        ],
        correct: 0,
        correctExplanation: "Aerobic composting requires oxygen and a ~30:1 carbon-to-nitrogen ratio to decompose organics without foul odors.",
        incorrectExplanation: "Incorrect. Aerobic decomposition requires regular turning/aeration and balanced carbon (browns) and nitrogen (greens)."
      },
      {
        order: 7,
        question: "Why should commercial kitchens implement separate color-coded waste bins for organic prep scraps vs general waste?",
        options: [
          "It prevents organic contamination of recyclables and ensures clean feedstock for composting or bio-digestion",
          "It makes the kitchen floor look colorful",
          "It is required to change kitchen music stations",
          "It stops cooks from tasting sauces"
        ],
        correct: 0,
        correctExplanation: "Dedicated organic bins prevent contamination with plastics and packaging, enabling 100% organic recycling.",
        incorrectExplanation: "Incorrect. Segregated bins keep organic streams uncontaminated for composting and livestock feed."
      },
      {
        order: 8,
        question: "What is the primary business benefit of daily kitchen food waste logging and tracking?",
        options: [
          "It identifies exact overproduction areas, enabling head chefs to adjust purchasing orders and prep pars to cut F&B costs",
          "It gives stewards extra paperwork to do after shifts",
          "It allows the hotel to eliminate the kitchen team",
          "It increases food storage inventory to maximum limits"
        ],
        correct: 0,
        correctExplanation: "Accurate waste measurement directly informs prep sheet adjustments, cutting resort food purchasing costs by 5-15%.",
        incorrectExplanation: "Incorrect. Daily waste tracking gives culinary management the data needed to trim food purchasing budgets."
      }
    ]
  },

  // 4. ELH-39: Hotel Engineering: Central Plant & HVAC Optimization
  {
    id: 39,
    courseCode: "ELH-39",
    slug: "hotel-engineering-central-plant-and-hvac-optimization",
    title: "Hotel Engineering: Central Plant & HVAC Optimization",
    description: "Central chiller plant staging, condenser water cooling tower delta-T, boiler heat recovery for domestic hot water, and BMS chiller sequencing.",
    fullDescription: "Central HVAC and hot water plants account for over 60% of total energy consumption in Mauritian resorts and commercial properties. This course provides chief engineers, HVAC technicians, and facility operators with rigorous operational protocols for chiller sequencing, variable primary flow control, heat recovery desuperheaters, and cooling tower chemical treatment.",
    categoryId: 2,
    durationMinutes: 30,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/hotel-engineering-central-plant.jpg",
    intendedRoles: ["Hotel Engineers", "Chief Engineers", "HVAC Technicians", "Maintenance Supervisors"],
    learningObjectives: [
      "Calculate and optimize chiller coefficient of performance (COP) across varying wet-bulb temperatures.",
      "Implement automated chiller staging and chilled water supply temperature reset algorithms.",
      "Maintain condenser cooling tower approach temperatures and automated blowdown conductivity controls.",
      "Operate waste heat recovery exchangers to preheat domestic hot water from chiller condenser loops.",
      "Detect and eliminate low delta-T syndrome across air handling units and secondary distribution loops.",
      "Complete 8 scenario-based assessment questions on central plant HVAC engineering."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Hotel Engineering: Central Plant & HVAC Optimization.",
    badgeName: "Central Plant Optimization Specialist",
    badgeDescription: "Awarded for technical expertise in resort chiller plant staging, heat recovery, and cooling tower efficiency.",
    badgeSlug: "central-plant-optimization-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_WATER", "COMP_GHG"],
    applicableSectors: ["SEC_HOSPITALITY", "SEC_PROPERTY"],
    applicableDepartments: ["DEP_ENGINEERING", "DEP_FACILITIES"],
    applicableJobFamilies: ["JF_TECHNICAL", "JF_SUPERVISOR", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Align resort central chiller and boiler systems with seasonal occupancy to eliminate low delta-T losses.",
    lessons: [
      {
        order: 0,
        title: "Central Plant Architecture in Tropical Resorts",
        minutes: 5,
        content: "Water-cooled chillers, cooling towers, and variable flow primary pumps.",
        blocks: [
          { id: "plant1-h1", type: "heading", position: 1, headingText: "The Core Energy Engine" },
          { id: "plant1-t1", type: "short_text", position: 2, bodyText: "Chillers, pumps, and cooling towers account for the lion's share of commercial property electricity bills. Running an extra chiller at 30% partial load instead of staging one at 85% causes severe efficiency degradation." },
          {
            id: "plant1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Resort shoulder-season chiller staging:",
            decisionPrompt: "During the Mauritian winter (low thermal load), the plant operator runs two 300-TR chillers simultaneously at 35% load to 'share the wear'. What should the chief engineer do?",
            decisionChoices: [
              { label: "Stage off one chiller immediately and run a single 300-TR chiller at 70% load; centrifugal chillers operate at peak COP between 65-85% load and running an unnecessary machine wastes pump and tower power", correct: true, feedback: "Spot on! Centrifugal chillers operating at low partial loads suffer severe COP penalties, and running twin condenser and chilled water pumps doubles auxiliary parasitic power." },
              { label: "Turn on a third chiller to reduce the load on each to 20%", correct: false, feedback: "Incorrect. Running chillers at 20% load destroys plant efficiency and creates extreme parasitic pumping overhead." },
              { label: "Switch off all cooling towers and let chillers overheat", correct: false, feedback: "Dangerous! Disabling cooling towers causes high-pressure chiller safety trips." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Chilled Water Supply Temperature Reset",
        minutes: 5,
        content: "Dynamic reset curves based on outdoor wet-bulb temperature and valve demand.",
        blocks: [
          { id: "plant2-h1", type: "heading", position: 1, headingText: "Resetting Chilled Water Setpoints" },
          { id: "plant2-t1", type: "short_text", position: 2, bodyText: "Every 1°C increase in chilled water supply temperature yields a 2-3% improvement in chiller compressor efficiency without sacrificing indoor comfort." }
        ]
      },
      {
        order: 2,
        title: "Cooling Tower Approach & Condenser Loop Delta-T",
        minutes: 5,
        content: "VFD cooling tower fans, scale prevention, and wet-bulb approach.",
        blocks: [
          { id: "plant3-h1", type: "heading", position: 1, headingText: "Condenser Heat Rejection" },
          { id: "plant3-t1", type: "short_text", position: 2, bodyText: "Lowering condenser water temperature entering the chiller reduces compressor lift, saving significant power. Cooling tower VFDs modulate fan speeds to track wet-bulb approach." }
        ]
      },
      {
        order: 3,
        title: "Desuperheaters & Waste Heat Domestic Hot Water",
        minutes: 5,
        content: "Harnessing chiller condenser heat to eliminate diesel boiler operation.",
        blocks: [
          {
            id: "plant4-d1",
            type: "decision_scenario",
            position: 1,
            decisionIntro: "Resort hot water supply dilemma:",
            decisionPrompt: "The resort burns 200 litres of diesel daily in boilers to generate 55°C guest hot water while chillers reject massive amounts of 35°C heat to cooling towers. What is the optimal engineering solution?",
            decisionChoices: [
              { label: "Install a refrigerant desuperheater heat recovery exchanger on the chiller compressor discharge to preheat boiler feed water from 25°C to 50°C using free waste heat", correct: true, feedback: "Spot on! Chiller heat recovery captures rejected thermal energy, cutting resort boiler diesel consumption by up to 70%." },
              { label: "Turn off guest hot water heaters completely to save diesel", correct: false, feedback: "Incorrect. Depriving guests of hot water violates basic hotel hospitality standards." },
              { label: "Vent boiling steam into the air handling units", correct: false, feedback: "Dangerous! Venting steam causes building mold and energy catastrophe." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Diagnosing & Curing Low Delta-T Syndrome",
        minutes: 5,
        content: "2-way modulating control valves, balancing coils, and VFD pump tracking.",
        blocks: [
          { id: "plant5-h1", type: "heading", position: 1, headingText: "Fighting Low Delta-T" },
          { id: "plant5-t1", type: "short_text", position: 2, bodyText: "When chilled water returns at 9°C instead of the design 12°C, chillers cannot load fully despite excessive water flow, forcing extra pumps and chillers online unnecessarily." }
        ]
      },
      {
        order: 5,
        title: "Central Plant Daily Log & Maintenance SOPs",
        minutes: 5,
        content: "Approach temperature logs, water chemical conductivity, and refrigerant leak checks.",
        blocks: [
          { id: "plant6-h1", type: "heading", position: 1, headingText: "Daily Log Verification" },
          { id: "plant6-t1", type: "short_text", position: 2, bodyText: "Log evaporator/condenser approach temperatures daily to detect tube fouling before scale builds up." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "Why is running one 400-TR chiller at 80% load significantly more energy efficient than running two 400-TR chillers at 40% load each?",
        options: [
          "Centrifugal chillers operate at optimal COP at higher partial loads, and running a single machine eliminates the electrical power draw of a second condenser pump, chilled water pump, and cooling tower fan",
          "Two chillers consume zero electricity when sharing loads",
          "Chillers can only cool water when running above 90°C",
          "Running two chillers produces pure hydrogen fuel"
        ],
        correct: 0,
        correctExplanation: "Staging a single chiller at high COP eliminates the massive auxiliary pump and fan loads of running twin machines.",
        incorrectExplanation: "Incorrect. Staging chillers to operate near peak COP (70-85%) and de-energizing redundant auxiliary pumps saves massive energy."
      },
      {
        order: 2,
        question: "What efficiency benefit is achieved by implementing Chilled Water Supply Temperature Reset during low-demand periods?",
        options: [
          "Raising chilled water temperature from 6°C to 8°C reduces compressor lift, saving approximately 2-3% of chiller energy per degree Celsius",
          "It freezes all air conditioning pipes to preserve cold air",
          "It eliminates the need for air handling units",
          "It converts chilled water into boiler steam"
        ],
        correct: 0,
        correctExplanation: "Increasing chilled water setpoint lowers compressor pressure differential, directly reducing electricity consumption.",
        incorrectExplanation: "Incorrect. Every 1°C increase in chilled water temperature reduces chiller compressor work by 2-3%."
      },
      {
        order: 3,
        question: "What is 'Low Delta-T Syndrome' in central chilled water distribution systems?",
        options: [
          "A condition where chilled water returns to the plant with a temperature difference much lower than design (e.g. 3°C instead of 6°C), starving the plant of thermal load and forcing extra pumps online",
          "When water in cooling towers turns into ice during summer",
          "When air conditioners blow warm steam into offices",
          "A medical condition affecting building occupants"
        ],
        correct: 0,
        correctExplanation: "Low delta-T occurs when return water is too cold due to 3-way bypass valves or oversized coils, overloading distribution pumps.",
        incorrectExplanation: "Incorrect. Low delta-T syndrome causes chillers to under-load while pumps run at maximum flow, wasting energy."
      },
      {
        order: 4,
        question: "How does a refrigerant desuperheater heat recovery system reduce resort operating expenses?",
        options: [
          "It captures high-temperature heat rejected by chiller compressors and transfers it to preheat domestic hot water for guestrooms, slashing boiler fuel consumption",
          "It cools the resort swimming pool with ice cubes",
          "It generates electricity from solar panels on the roof",
          "It eliminates the need for guest showers"
        ],
        correct: 0,
        correctExplanation: "Desuperheaters capture waste heat from compressor discharge to heat domestic water, cutting diesel/gas boiler costs by up to 70%.",
        incorrectExplanation: "Incorrect. Desuperheaters harness rejected chiller heat to preheat domestic hot water, slashing boiler fuel bills."
      },
      {
        order: 5,
        question: "What is the consequence of allowing mineral scale to accumulate inside water-cooled chiller condenser tubes?",
        options: [
          "Scale acts as thermal insulation, raising condensing temperature, degrading COP, and increasing compressor electrical power consumption by 10-25%",
          "Scale makes chiller condenser water taste sweet",
          "Scale eliminates the need for cooling tower fans",
          "Scale increases chiller cooling capacity by 50%"
        ],
        correct: 0,
        correctExplanation: "Mineral scale insulates condenser tubes, hindering heat transfer and forcing the compressor to work harder.",
        incorrectExplanation: "Incorrect. Even a 0.5 mm layer of scale degrades heat transfer, causing a 10%+ penalty on chiller efficiency."
      },
      {
        order: 6,
        question: "How should cooling tower variable frequency drives (VFDs) be controlled for optimal plant efficiency?",
        options: [
          "Modulate all tower fan speeds together to maintain the optimum condenser water temperature based on ambient wet-bulb temperature approach",
          "Run one tower fan at 100% speed while leaving the rest turned off",
          "Run all tower fans in reverse to blow air upwards into clouds",
          "Turn off all tower fans during the hottest hours of the day"
        ],
        correct: 0,
        correctExplanation: "Operating multiple tower fans at reduced speeds takes advantage of the fan affinity laws, cutting fan power consumption drastically.",
        incorrectExplanation: "Incorrect. Modulating multiple tower fans via VFDs lowers fan power exponentially while maintaining target approach temperatures."
      },
      {
        order: 7,
        question: "Why must automated cooling tower water blowdown systems be calibrated using electrical conductivity sensors?",
        options: [
          "To control cycles of concentration, preventing both scale accumulation and excessive freshwater/chemical wastage",
          "To electrify the cooling tower water to repel birds",
          "To convert mineral salts into clean drinking water",
          "To test whether the cooling tower is grounded"
        ],
        correct: 0,
        correctExplanation: "Conductivity blowdown control maintains optimal cycles of concentration, preventing mineral scale while saving water and chemicals.",
        incorrectExplanation: "Incorrect. Automated conductivity control maintains balanced cycles of concentration, stopping scale and saving water."
      },
      {
        order: 8,
        question: "What daily parameter should a facility engineer compare to detect tube fouling in chiller evaporators and condensers?",
        options: [
          "The Approach Temperature (the difference between leaving fluid temperature and refrigerant saturation temperature)",
          "The color of the exterior paint on the chiller shell",
          "The volume of the maintenance room radio",
          "The height of the cooling tower above sea level"
        ],
        correct: 0,
        correctExplanation: "Rising approach temperature is the definitive early indicator of heat exchanger tube fouling or micro-scaling.",
        incorrectExplanation: "Incorrect. Tracking approach temperature deviations alerts engineers to tube fouling before efficiency collapses."
      }
    ]
  },

  // 5. ELH-47: Green Leases & Tenant Sustainability Engagement
  {
    id: 47,
    courseCode: "ELH-47",
    slug: "green-leases-and-tenant-sustainability-engagement",
    title: "Green Leases & Tenant Sustainability Engagement",
    description: "Drafting enforceable green lease clauses, tenant utility data sharing, sub-meter billing transparency, and collaborative building setback rules.",
    fullDescription: "The split-incentive dilemma in commercial real estate frequently hinders sustainability investments. This course equips commercial property managers, asset managers, and leasing executives with legal frameworks, data-sharing protocols, and fit-out standards to align landlord and tenant ESG objectives.",
    categoryId: 2,
    durationMinutes: 25,
    priceUsd: "1400.00",
    level: "Role Specialist",
    isFeatured: false,
    thumbnailUrl: "/images/courses/green-leases-tenant-engagement.jpg",
    intendedRoles: ["Property Managers", "Asset Managers", "Leasing Executives", "Legal Counsel"],
    learningObjectives: [
      "Structure green lease schedules covering energy data disclosure, sub-metering, and waste reporting.",
      "Resolve split-incentive barriers by establishing capital cost recovery mechanisms for energy retrofits.",
      "Develop sustainable tenant fit-out guides mandating LED lighting and high-efficiency HVAC equipment.",
      "Establish building management committee (BMC) sustainability meetings with major anchor tenants.",
      "Enforce common area and tenanted space environmental operating hours and thermostat boundaries.",
      "Complete 8 scenario-based assessment questions on green lease governance and tenant engagement."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Green Leases & Tenant Sustainability Engagement.",
    badgeName: "Green Lease Specialist",
    badgeDescription: "Awarded for competency in commercial real estate green lease administration, landlord-tenant ESG alignment, and shared utility management.",
    badgeSlug: "green-lease-specialist",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_GOVERNANCE",
    secondaryCompetencies: ["COMP_ENERGY", "COMP_ESG_DATA"],
    applicableSectors: ["SEC_PROPERTY", "SEC_PROF_SERVICES"],
    applicableDepartments: ["DEP_FACILITIES", "DEP_LEGAL_COMPLIANCE", "DEP_OPERATIONS"],
    applicableJobFamilies: ["JF_PROFESSIONAL", "JF_MANAGER"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER", "SEN_HEAD"],
    productionPriority: "p0",
    learningPathPurpose: "Align commercial landlord and tenant incentives for energy, water, and waste reduction.",
    lessons: [
      {
        order: 0,
        title: "The Split-Incentive Barrier in Real Estate",
        minutes: 4,
        content: "Why traditional commercial leases discourage landlord energy investments.",
        blocks: [
          { id: "gl1-h1", type: "heading", position: 1, headingText: "The Landlord-Tenant Friction" },
          { id: "gl1-t1", type: "short_text", position: 2, bodyText: "Under triple-net commercial leases, landlords pay for capital efficiency improvements while tenants reap the lower utility bills. Green lease schedules bridge this divide through amortized cost-sharing clauses." },
          {
            id: "gl1-d1",
            type: "decision_scenario",
            position: 3,
            decisionIntro: "Commercial lease renewal negotiation:",
            decisionPrompt: "An anchor tenant occupying three floors in a Cybercity tower wants to renew their 5-year lease but refuses to share their sub-metered electricity consumption data for building ESG reporting. What should the asset manager do?",
            decisionChoices: [
              { label: "Incorporate a standard green lease data-sharing clause providing mutual confidentiality, explaining that anonymized aggregate utility data is required for national building energy certifications and Scope 3 reporting", correct: true, feedback: "Spot on! Green lease data-sharing provisions protect confidentiality while enabling comprehensive building ESG disclosure." },
              { label: "Threaten to disconnect the tenant's electricity immediately", correct: false, feedback: "Severe legal breach! Disconnecting power violates tenant rights and lease contracts." },
              { label: "Fabricate fake utility numbers for the tenant in the annual report", correct: false, feedback: "Illegal! Falsifying ESG data constitutes reporting fraud." }
            ]
          }
        ]
      },
      {
        order: 1,
        title: "Key Green Lease Clauses & Drafting Standards",
        minutes: 4,
        content: "Data sharing, setback temperature rules, and fit-out environmental standards.",
        blocks: [
          { id: "gl2-h1", type: "heading", position: 1, headingText: "Essential Green Lease Provisions" },
          { id: "gl2-t1", type: "short_text", position: 2, bodyText: "Key clauses include: automated energy data sharing, 24°C thermostat operating bands, sub-meter billing accuracy, and mandatory LED fit-outs." }
        ]
      },
      {
        order: 2,
        title: "Capital Cost Recovery Mechanisms",
        minutes: 4,
        content: "Structuring energy-efficiency amortizations into commercial service charges.",
        blocks: [
          { id: "gl3-h1", type: "heading", position: 1, headingText: "Shared Capital Savings" },
          { id: "gl3-t1", type: "short_text", position: 2, bodyText: "Cost recovery clauses allow landlords to recover energy-saving CapEx through service charges, capped strictly at the tenant's demonstrated utility cost reduction." }
        ]
      },
      {
        order: 3,
        title: "Sustainable Fit-Out & De-Fit Guides",
        minutes: 4,
        content: "Low-VOC materials, smart sub-meters, and construction waste diversion.",
        blocks: [
          {
            id: "gl4-d1",
            type: "decision_scenario",
            position: 1,
            decisionIntro: "Tenant fit-out contractor review:",
            decisionPrompt: "A new corporate tenant's interior designer submits plans specifying halogen spotlights and solvent-based paints with high VOC content. What action is required?",
            decisionChoices: [
              { label: "Reject the specifications and refer the tenant to the Building Sustainable Fit-Out Guide, requiring 100% LED lighting, sub-metered lighting/plug power circuits, and zero/low-VOC certified paints", correct: true, feedback: "Spot on! Enforcing the Sustainable Fit-Out Guide protects indoor air quality and ensures high tenant energy performance." },
              { label: "Approve the halogen lights because they make the office look vintage", correct: false, feedback: "Incorrect. Halogen fixtures consume 5x more power and generate massive cooling loads." },
              { label: "Prohibit the tenant from doing any interior decoration", correct: false, feedback: "Incorrect. Reasonable fit-outs are permitted under established green guidelines." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Building Sustainability Committees & Joint Initiatives",
        minutes: 4,
        content: "Quarterly meetings with tenant ESG reps, recycling drives, and EV charging.",
        blocks: [
          { id: "gl5-h1", type: "heading", position: 1, headingText: "Collaborative Governance" },
          { id: "gl5-t1", type: "short_text", position: 2, bodyText: "Quarterly sustainability committees foster collaboration on shared EV charging infrastructure, e-waste amnesties, and after-hours HVAC shutdown." }
        ]
      },
      {
        order: 5,
        title: "Green Lease Compliance & Dispute Resolution",
        minutes: 5,
        content: "Auditing green covenants, continuous sub-metering, and collaborative resolution.",
        blocks: [
          { id: "gl6-h1", type: "heading", position: 1, headingText: "Verifying Commitments" },
          { id: "gl6-t1", type: "short_text", position: 2, bodyText: "Conduct annual sustainability walk-throughs and review sub-meter anomalies collaboratively before escalating contractual issues." }
        ]
      }
    ],
    quiz: [
      {
        order: 1,
        question: "What is the 'split-incentive' problem in commercial real estate leasing?",
        options: [
          "A situation where the building owner pays for energy efficiency upgrades, but the financial benefits of lower utility bills accrue entirely to the tenant",
          "When tenants divide office desks with cardboard boxes",
          "When a lease is signed by two people at the same time",
          "When rent is paid in two different currencies"
        ],
        correct: 0,
        correctExplanation: "Split incentives occur when landlords lack financial motivation to invest in CapEx because tenants reap the utility savings.",
        incorrectExplanation: "Incorrect. The split incentive occurs when the party investing in efficiency (landlord) does not receive the utility bill savings (tenant)."
      },
      {
        order: 2,
        question: "How does a well-drafted Green Lease overcome the split-incentive barrier for energy efficiency retrofits?",
        options: [
          "By including capital cost recovery clauses that allow landlords to amortize retrofit costs through service charges, capped at the tenant's utility savings",
          "By doubling the base rent every year without explanation",
          "By turning off power to the building on weekends",
          "By prohibiting tenants from using air conditioning"
        ],
        correct: 0,
        correctExplanation: "Cost recovery clauses allow landlords to recoup CapEx while guaranteeing that the tenant's total occupancy cost decreases.",
        incorrectExplanation: "Incorrect. Green lease cost recovery clauses permit landlords to amortize CapEx through service fees up to the amount of utility savings."
      },
      {
        order: 3,
        question: "Why is a mutual utility data-sharing clause essential in modern commercial green leases?",
        options: [
          "It enables landlords and tenants to measure aggregate energy/water footprints for statutory ESG reporting, carbon accounting, and green building certifications",
          "It allows building managers to sell tenant financial data online",
          "It lets building security read tenant emails",
          "It prevents tenants from using computers"
        ],
        correct: 0,
        correctExplanation: "Data sharing provides the baseline metrics needed for Scope 1, 2, and 3 GHG reporting and green building certifications (e.g. LEED, BREEAM).",
        incorrectExplanation: "Incorrect. Transparent utility data sharing is necessary for GHG carbon accounting and building environmental ratings."
      },
      {
        order: 4,
        question: "What standard environmental requirement should be included in a commercial building Sustainable Fit-Out Guide?",
        options: [
          "Mandatory 100% LED lighting, dedicated sub-metering for HVAC and plug loads, and low-VOC paints and adhesives",
          "Permitting high-consumption halogen and incandescent lighting throughout",
          "Allowing solvent-based toxic chemicals to be used in unventilated areas",
          "Banning all furniture made from recycled materials"
        ],
        correct: 0,
        correctExplanation: "Fit-out guides mandate energy-efficient equipment, sub-meters, and non-toxic materials to protect IAQ and reduce load.",
        incorrectExplanation: "Incorrect. Fit-out guides mandate LED lighting, sub-metering, and low-VOC materials to ensure high efficiency and healthy air."
      },
      {
        order: 5,
        question: "What is the recommended indoor temperature operating band specified in commercial green leases during cooling hours?",
        options: [
          "23°C to 25°C (with 24°C as the optimal baseline)",
          "15°C to 17°C",
          "30°C to 35°C",
          "0°C to 5°C"
        ],
        correct: 0,
        correctExplanation: "Setting thermostats to 24°C provides optimal thermal comfort while preventing massive energy waste from over-cooling.",
        incorrectExplanation: "Incorrect. The standard green lease comfort band is 23°C–25°C, preventing severe over-cooling in tropical climates."
      },
      {
        order: 6,
        question: "What is the primary objective of establishing a Building Management Committee (BMC) with major tenants?",
        options: [
          "To provide a collaborative forum for reviewing monthly building utility data, coordinating waste reduction initiatives, and resolving operational bottlenecks",
          "To organize weekly tenant poker games",
          "To eliminate all cleaning services in tenanted areas",
          "To manage tenant hiring and firing decisions"
        ],
        correct: 0,
        correctExplanation: "BMC sustainability meetings facilitate mutual problem-solving on after-hours HVAC scheduling, recycling, and energy targets.",
        incorrectExplanation: "Incorrect. Building sustainability committees coordinate joint energy targets, e-waste amnesties, and common-area operating schedules."
      },
      {
        order: 7,
        question: "How does individual tenant sub-metering improve energy conservation compared to prorating utility bills by square footage?",
        options: [
          "It bill tenants for their actual consumption, incentivizing them to turn off after-hours lighting, computers, and secondary equipment",
          "It forces tenants to guess their power bills each month",
          "It charges all tenants an identical flat fee regardless of use",
          "It eliminates the need for electric utility connections"
        ],
        correct: 0,
        correctExplanation: "Direct sub-meter billing links behavior to cost, eliminating the 'free-rider' effect of square-footage prorating.",
        incorrectExplanation: "Incorrect. Sub-metering rewards energy-efficient tenant behavior by charging directly for actual consumption."
      },
      {
        order: 8,
        question: "What is a 'de-fit' or 'make-good' green clause in commercial tenancy termination agreements?",
        options: [
          "A requirement to salvage, reuse, or recycle fit-out partitions, carpets, and fixtures rather than sending all demolition materials to landfill",
          "A requirement for the tenant to demolish the entire building exterior",
          "A clause allowing tenants to abandon trash in the building corridors",
          "A penalty requiring tenants to repaint the building black"
        ],
        correct: 0,
        correctExplanation: "Sustainable make-good clauses mandate diversion of interior fit-out materials away from landfills through material reclamation.",
        incorrectExplanation: "Incorrect. Green make-good clauses require contractors to salvage and recycle interior partitions, cables, and carpet tiles."
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
          if ((existing.version ?? 1) < 2) {
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
          }
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
        }

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
