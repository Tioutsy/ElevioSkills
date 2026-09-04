import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  enrollmentsTable,
  lessonProgressTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger";

export interface RemediatedCourseDefinition {
  courseCode: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  categoryId: number;
  durationMinutes: number;
  priceUsd: string;
  level: string;
  passingScore: number;
  learningObjectives: string[];
  intendedRoles: string[];
  primaryCompetency: string;
  secondaryCompetencies: string[];
  badgeName: string;
  badgeDescription: string;
  completionMessage: string;
  recommendedNextCourseCode?: string;
  lessons: {
    title: string;
    orderIndex: number;
    durationMinutes: number;
    content: string;
    contentBlocks: any[];
  }[];
  quizQuestions: {
    question: string;
    options: string[];
    correctOption: number;
    orderIndex: number;
    correctExplanation: string;
    incorrectExplanation: string;
    optionFeedback: string[];
    practicalTakeaway: string;
    learningOutcome?: string;
    competencyArea?: string;
  }[];
}

export const BATCH_2_REMEDIATED_COURSES: RemediatedCourseDefinition[] = [
  {
    "courseCode": "ELH-03",
    "title": "Energy Efficiency at Work",
    "slug": "energy-efficiency-at-work",
    "description": "Learn practical, zero-cost operational habits to eliminate workplace energy waste, understand peak demand tariffs, and optimize HVAC and office equipment.",
    "fullDescription": "Energy Efficiency at Work provides employees across all departments with practical, actionable knowledge to reduce electricity waste in commercial buildings. You will discover how daily operational habits directly lower utility costs and reduce fossil-fuel generation demand on the national grid.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D1 Awareness",
    "passingScore": 75,
    "primaryCompetency": "COMP_ENERGY",
    "secondaryCompetencies": [
      "COMP_SUSTAINABILITY_FOUNDATIONS",
      "COMP_GHG"
    ],
    "learningObjectives": [
      "Identify major sources of electricity waste in commercial office and facility environments.",
      "Understand how thermal comfort depends on environmental and personal factors (ASHRAE Standard 55) and apply moderate thermostat management.",
      "Execute effective computer, screen, and standby power management protocols.",
      "Recognize the financial and environmental implications of commercial peak demand tariffs and national generation reality."
    ],
    "intendedRoles": [
      "All Employees",
      "Office Administrators",
      "Department Coordinators",
      "Team Leads"
    ],
    "badgeName": "Workplace Energy Champion",
    "badgeDescription": "Demonstrated awareness of operational energy conservation and peak demand management.",
    "completionMessage": "Congratulations! You have mastered workplace energy efficiency fundamentals and can now champion smart consumption habits across your department.",
    "recommendedNextCourseCode": "ELH-27",
    "lessons": [
      {
        "title": "1. The True Cost of Invisible Energy Waste",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Understanding how standby power, unmanaged lighting, and excessive cooling quietly drain operating budgets and drive fossil-fuel power generation.",
        "contentBlocks": [
          {
            "id": "elh03-h1",
            "type": "heading",
            "level": 3,
            "text": "The Invisible Energy Leak in Everyday Operations"
          },
          {
            "id": "elh03-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "In most commercial buildings, 15% to 30% of total electricity consumption occurs when spaces are completely unoccupied. Standby power from unused monitors, desktop printers, decorative lighting, and poorly scheduled air conditioning units runs continuously through nights and weekends. Because electricity is invisible, employees rarely notice the cumulative cost of leaving workstations powered on."
          },
          {
            "id": "elh03-c1",
            "type": "callout",
            "variant": "info",
            "title": "Mauritian Electricity Generation Reality (Official 2023 Statistics)",
            "bodyText": "According to Statistics Mauritius (Energy and Water Statistics - 2023, Table 2.2 / 2.3), total electricity generated in the Island of Mauritius in 2023 was 3,251.8 GWh. Non-renewable thermal generation from imported fossil fuels (heavy fuel oil, diesel, and coal) accounted for 81.3% (2,642.1 GWh), while renewable sources accounted for 18.7% (609.7 GWh, comprising 9.6% bagasse, 5.1% solar PV, 3.3% hydro, 0.4% wind, and 0.2% landfill gas). Thermal power plants produced 90.9% of electricity because bagasse is also burned thermally. Every kilowatt-hour saved in the office directly cuts imported fossil fuel combustion and emissions."
          }
        ]
      },
      {
        "title": "2. HVAC Optimization: Thermal Comfort & Operational Setpoints",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Mastering air conditioning temperature setpoints, door sealing, and solar heat gain control.",
        "contentBlocks": [
          {
            "id": "elh03-h2",
            "type": "heading",
            "level": 3,
            "text": "Air Conditioning Efficiency and Thermal Comfort"
          },
          {
            "id": "elh03-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "Air conditioning accounts for 50% to 70% of total electrical energy in tropical commercial buildings. A widespread misconception is that setting the thermostat to 18\u00b0C cools an office faster. In reality, standard AC units cool at a constant compressor rate; setting excessively low temperatures causes overcooling, thermal discomfort, and severe energy waste. According to ANSI/ASHRAE Standard 55 (Thermal Environmental Conditions for Human Occupancy), indoor thermal comfort is not determined by a single universal temperature setpoint, but depends on six fundamental factors: four environmental variables (air temperature, radiant temperature, air speed, and relative humidity) and two personal variables (clothing insulation and metabolic activity). In commercial office environments, maintaining moderate thermostat settings (often calibrated around 24\u00b0C depending on ambient humidity and air circulation) prevents excessive cooling energy waste while accommodating typical workplace clothing and sedentary office tasks."
          },
          {
            "id": "elh03-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Operational Rule",
            "bodyText": "Maintain moderate thermostat settings around 24\u00b0C. Ensure all exterior windows and doors remain closed while AC units operate, and draw blinds on sun-facing facades during afternoon peak heat."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: The Weekend Shutdown Protocol",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Evaluate an operational dilemma involving conflicting departmental priorities during an office shutdown.",
        "contentBlocks": [
          {
            "id": "elh03-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Friday Evening Office Closure",
            "prompt": "It is 17:45 on a Friday. You notice that the central open-plan office AC is still humming at 19\u00b0C, two conference room lights are on, and several desktop workstations are left running with screensavers active. The team has left for a long weekend. What is the most effective operational action?",
            "options": [
              {
                "id": "opt_a",
                "text": "Leave the equipment as it is because facilities cleaners will handle everything during their Monday morning shift.",
                "consequence": "Poor outcome. Equipment will run continuously for 64 unoccupied hours, consuming hundreds of kilowatt-hours and generating unnecessary utility costs.",
                "feedback": "Leaving equipment on over weekends creates massive vampire load and increases fire risk.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Switch off the conference room lights, adjust the main AC control to OFF or scheduled weekend mode, and enable power-strip master switches for shared workstations.",
                "consequence": "Optimal outcome. You eliminate unoccupied baseload consumption over the entire weekend while protecting equipment.",
                "feedback": "Excellent! Systematic shutdown before unoccupied periods produces immediate, zero-cost energy reductions.",
                "score": 100
              },
              {
                "id": "opt_c",
                "text": "Unplug the central network servers and building security systems to maximize electricity savings.",
                "consequence": "Dangerous action. Critical IT infrastructure, backup routines, and security monitoring must remain permanently powered.",
                "feedback": "Never power down shared server rooms or security infrastructure without explicit IT protocol.",
                "score": 0
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Peak Demand & Tariff Awareness",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Address high-power equipment scheduling to mitigate commercial maximum demand charges.",
        "contentBlocks": [
          {
            "id": "elh03-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Scheduling High-Power Maintenance Equipment",
            "prompt": "The facility maintenance team plans to run heavy carpet extraction machines and industrial vacuum cleaners on a Thursday at 18:30 (during the commercial peak demand window of 18:00 to 21:00). What is your recommendation?",
            "options": [
              {
                "id": "opt_a",
                "text": "Approve the schedule immediately without checking commercial tariff structures.",
                "consequence": "Costly outcome. Running inductive motor loads simultaneously during peak hours spikes the facility's maximum kVA demand peak, triggering heavy penalty surcharges for the entire billing cycle.",
                "feedback": "Operating high-power discretionary loads during national peak hours drives up peak demand charges significantly.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Reschedule the heavy cleaning to off-peak hours (e.g. after 21:00 or Saturday morning), staggering high-power equipment startup.",
                "consequence": "Optimal outcome. You avoid creating a new maximum demand peak on the commercial utility meter, saving substantial tariff costs.",
                "feedback": "Correct! Load-shifting high-power equipment away from peak tariff windows flattens the electrical demand profile and avoids maximum demand penalties.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Departmental Energy Sweep",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Plan and execute a 30-day personal and departmental energy conservation routine.",
        "contentBlocks": [
          {
            "id": "elh03-h3",
            "type": "heading",
            "level": 3,
            "text": "Your 30-Day Energy Conservation Plan"
          },
          {
            "id": "elh03-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Take personal ownership of energy efficiency: (1) Configure your computer display sleep timer to 5 minutes; (2) Switch off meeting room lights and AC when leaving; (3) Report overcooled spaces or leaking window seals to Facilities; and (4) Conduct a quick Friday-afternoon sweep of your immediate team area."
          },
          {
            "id": "elh03-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Audit your personal workstation power settings today and agree on a last-person-out shutdown checklist with your department this week."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "According to official 2023 Statistics Mauritius electricity generation data, what proportion of electricity in Mauritius was generated from non-renewable fossil fuels (fuel oil, diesel, and coal)?",
        "options": [
          "Approximately 10.0%.",
          "81.3% (with the remaining 18.7% generated from renewable sources including bagasse, solar PV, hydro, wind, and landfill gas).",
          "100.0% nuclear energy.",
          "50.0% geothermal energy."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "Statistics Mauritius (Energy and Water Statistics - 2023, Table 2.2 / 2.3) reports that 81.3% of electricity generated in 2023 was from non-renewable fossil fuels (fuel oil, diesel, coal), while 18.7% came from renewable sources (including 9.6% bagasse). Note that thermal generation as a whole was 90.9% because bagasse is also burned thermally.",
        "incorrectExplanation": "Statistics Mauritius official digests document that 81.3% of 2023 electricity generation was from non-renewable fossil fuels and 18.7% from renewables.",
        "optionFeedback": [
          "Incorrect. Non-renewable fossil fuel generation accounted for 81.3% of the grid mix in 2023, not 10%.",
          "Correct! Official Statistics Mauritius 2023 data confirms 81.3% non-renewable fossil generation (coal and oil) and 18.7% renewable generation (bagasse, solar, hydro, wind, landfill gas).",
          "Incorrect. Mauritius does not possess nuclear generation infrastructure.",
          "Incorrect. Mauritius has zero geothermal electricity generation in its national grid."
        ],
        "practicalTakeaway": "Because over 80% of grid power is fossil-fuel based, eliminating office electricity waste directly reduces national carbon emissions.",
        "learningOutcome": "Understand national electricity generation reality and environmental impact",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "According to ANSI/ASHRAE Standard 55, which factors determine human thermal comfort in an occupied indoor environment?",
        "options": [
          "Only the outdoor barometric pressure.",
          "Six environmental and personal factors: air temperature, mean radiant temperature, air speed, relative humidity, clothing insulation, and metabolic activity.",
          "Only the color of the office walls.",
          "The brand of the central air conditioning compressor."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "ASHRAE Standard 55 specifies that thermal comfort is multidimensional, depending on four environmental variables (air temperature, radiant temperature, air velocity, humidity) and two personal variables (metabolic rate and clothing insulation).",
        "incorrectExplanation": "Thermal comfort depends on six interrelated environmental and personal variables defined in ASHRAE Standard 55.",
        "optionFeedback": [
          "Incorrect. Outdoor pressure alone does not govern indoor thermal comfort.",
          "Correct! ASHRAE Standard 55 establishes that thermal comfort depends on 4 environmental factors (air temperature, radiant heat, air speed, humidity) and 2 personal factors (clothing and metabolic rate).",
          "Incorrect. Wall color has no direct thermodynamic effect on thermal comfort.",
          "Incorrect. Equipment branding does not dictate thermodynamic comfort criteria."
        ],
        "practicalTakeaway": "Recognize that comfort depends on airflow, humidity, and clothing alongside thermostat settings.",
        "learningOutcome": "Understand multidimensional thermal comfort factors under ASHRAE 55",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "What is 'phantom load' or 'standby power' in an office environment?",
        "options": [
          "Electricity stolen by unauthorized software programs.",
          "Electricity continuously drawn by electronic appliances (monitors, printers, coffee machines) even when turned off or left in standby mode.",
          "Power generated by rooftop wind turbines.",
          "The electrical charge in emergency exit signs."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Standby power refers to the continuous baseload drawn by power supplies and internal circuitry when devices are plugged in but not actively operating.",
        "incorrectExplanation": "Standby power is the continuous background electricity consumed by plugged-in devices when idle.",
        "optionFeedback": [
          "Incorrect. Phantom load is a hardware electrical phenomenon, not a software bug.",
          "Correct! Standby power represents the cumulative electricity consumed by plugged-in devices while idle or powered off.",
          "Incorrect. Rooftop wind is renewable generation, not parasitic load.",
          "Incorrect. Emergency exit signage is required life-safety lighting."
        ],
        "practicalTakeaway": "Use switchable master power strips to cut standby power completely over weekends.",
        "learningOutcome": "Identify and mitigate office standby power loads",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "Why does setting an AC thermostat to 18\u00b0C fail to cool a hot room any faster than setting it to 24\u00b0C?",
        "options": [
          "Thermostats only respond to changes made in the morning.",
          "Standard AC systems deliver cooling at a fixed compressor rate; setting a lower target merely causes the unit to run longer and overcool the space.",
          "The thermostat automatically inverts the temperature when set below 20\u00b0C.",
          "Modern air conditioners only cool rooms when set to exactly 30\u00b0C."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Thermostats are switches, not throttles. The system cools at maximum designed heat exchange rate until the target is reached; a lower target simply causes overcooling.",
        "incorrectExplanation": "Thermostats control when the compressor stops, not the speed of cooling.",
        "optionFeedback": [
          "Incorrect. Thermostats respond continuously to temperature sensors regardless of time of day.",
          "Correct! The cooling rate is constant; setting an excessively low setpoint does not speed up initial cooling but guarantees continuous compressor overcooling.",
          "Incorrect. Thermostats do not invert temperature settings.",
          "Incorrect. Setting 30\u00b0C would provide no cooling in a warm room."
        ],
        "practicalTakeaway": "Never drop thermostats to 18\u00b0C to 'hurry' cooling; set the target directly to a moderate setpoint.",
        "learningOutcome": "Understand thermostat mechanics and operational behavior",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "In commercial electricity billing in Mauritius, what is the primary financial risk of running high-power equipment during peak hours (18:00\u201321:00)?",
        "options": [
          "The electricity company will disconnect the building permanently.",
          "Creating a new maximum demand (kVA) peak during peak hours significantly inflates monthly capacity and maximum demand tariff charges.",
          "The equipment will instantly catch fire.",
          "Office computers will lose all saved files."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Commercial electricity tariffs include maximum demand charges based on the highest kVA recorded during peak windows, which penalize sudden simultaneous load spikes.",
        "incorrectExplanation": "Peak demand surcharges heavily penalize peak kVA spikes on commercial utility bills.",
        "optionFeedback": [
          "Incorrect. Peak power draw is metered and billed under standard tariff formulas, not disconnection.",
          "Correct! Stacking heavy electrical loads during peak hours sets a high maximum demand peak (kVA), substantially increasing demand charges for the entire month.",
          "Incorrect. Modern electrical infrastructure is sized for load, but tariff costs escalate.",
          "Incorrect. Demand charges affect utility billing, not local file storage."
        ],
        "practicalTakeaway": "Shift high-power maintenance and charging operations outside the 18:00\u201321:00 peak window.",
        "learningOutcome": "Manage commercial maximum demand and peak tariff exposure",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "Which of the following office equipment settings is the most effective zero-cost energy saver for computer monitors?",
        "options": [
          "Using a bright white animated 3D screensaver.",
          "Configuring the display to automatically enter low-power sleep mode after 5 to 10 minutes of inactivity.",
          "Turning the monitor brightness to 100% permanently.",
          "Leaving monitors on full brightness overnight so they stay warm."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Animated screensavers keep the graphics card and display fully powered. Display sleep mode cuts monitor power consumption from ~30W down to less than 0.5W.",
        "incorrectExplanation": "Display sleep modes drop power consumption to near zero, whereas animated screensavers consume full active power.",
        "optionFeedback": [
          "Incorrect. Animated 3D screensavers force the GPU and screen to consume maximum active power.",
          "Correct! Display sleep mode reduces screen power draw by over 95% during short breaks and meetings.",
          "Incorrect. Maximum brightness accelerates display wear and increases energy consumption.",
          "Incorrect. Electronics perform better when kept cool, not heated unnecessarily."
        ],
        "practicalTakeaway": "Enable automatic display sleep mode across all company workstations.",
        "learningOutcome": "Configure IT power management profiles",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "How does drawing blinds or curtains on sun-facing office windows during peak afternoon hours reduce energy consumption?",
        "options": [
          "It blocks cellular signals from entering the office.",
          "It blocks direct solar infrared radiation (solar heat gain), reducing the thermal cooling load on the air conditioning system.",
          "It makes the office walls structurally stronger.",
          "It turns the window glass into solar electricity."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Solar radiation penetrating glass windows significantly increases indoor ambient temperatures; shading blocks radiant heat before it enters the conditioned space.",
        "incorrectExplanation": "Internal and external window shading blocks radiant solar heat gain, decreasing cooling load.",
        "optionFeedback": [
          "Incorrect. Fabric blinds do not block telecommunication frequencies.",
          "Correct! Shading prevents radiant solar infrared heat from entering the room, directly lowering the air conditioner's thermal cooling burden.",
          "Incorrect. Blinds do not affect building structural integrity.",
          "Incorrect. Standard window blinds do not generate photovoltaic current."
        ],
        "practicalTakeaway": "Close window blinds on east- and west-facing windows during peak sunshine hours.",
        "learningOutcome": "Mitigate solar heat gain and envelope thermal loads",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "Which of the following represents an effective 30-day personal workplace energy action commitment?",
        "options": [
          "Leaving the pantry microwave running with the door open all night.",
          "Configuring personal PC power settings to sleep after 5 minutes and conducting a Friday 17:30 departmental shutdown check.",
          "Setting all office air conditioners to 16\u00b0C and opening external windows.",
          "Replacing all energy-efficient LED light bulbs with incandescent bulbs."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Simple personal habits (PC sleep modes and Friday shutdown routines) eliminate baseload power waste with zero capital expense.",
        "incorrectExplanation": "Configuring display sleep and verifying weekend shutdown provides immediate, measurable energy savings.",
        "optionFeedback": [
          "Incorrect. Leaving appliances running unattended is unsafe and wasteful.",
          "Correct! Establishing automated display sleep profiles and routine Friday shutdowns creates lasting, zero-cost energy savings.",
          "Incorrect. Setting 16\u00b0C with open windows causes catastrophic energy waste.",
          "Incorrect. Incandescent bulbs waste up to 85% of power as heat."
        ],
        "practicalTakeaway": "Commit to daily workstation power management and Friday team area shutdown checks.",
        "learningOutcome": "Execute personal 30-day energy action commitment",
        "competencyArea": "COMP_ENERGY"
      }
    ]
  },
  {
    "courseCode": "ELH-04",
    "title": "Water Conservation in the Workplace",
    "slug": "water-conservation-in-the-workplace",
    "description": "Master workplace water conservation, detect hidden leaks, optimize washroom and pantry usage, and protect island water resources.",
    "fullDescription": "Water Conservation in the Workplace trains employees across corporate offices, hotels, and facilities to eliminate potable water waste. Learn practical diagnostic drop-test techniques for silent leaks, implement low-flow fixture awareness, and understand how workplace conservation safeguards municipal reservoirs during seasonal dry periods.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D1 Awareness",
    "passingScore": 75,
    "primaryCompetency": "COMP_WATER",
    "secondaryCompetencies": [
      "COMP_SUSTAINABILITY_FOUNDATIONS",
      "COMP_CIRCULARITY"
    ],
    "learningObjectives": [
      "Understand the hydrology, seasonal rainfall vulnerability, and municipal supply reality of Mauritius.",
      "Identify and diagnose silent toilet cistern flapper leaks using the 15-minute food coloring drop test.",
      "Adopt high-efficiency pantry, kitchen, and washroom water conservation practices.",
      "Implement structured reporting protocols for facility plumbing maintenance and leak elimination."
    ],
    "intendedRoles": [
      "All Employees",
      "Facilities Staff",
      "Pantry and Cleaning Teams",
      "Office Administrators"
    ],
    "badgeName": "Water Stewardship Ambassador",
    "badgeDescription": "Demonstrated competence in leak detection, fixture optimization, and commercial water stewardship.",
    "completionMessage": "Congratulations! You have completed Water Conservation in the Workplace and are now equipped to protect our precious freshwater resources.",
    "recommendedNextCourseCode": "ELH-27",
    "lessons": [
      {
        "title": "1. Island Hydrology & The Value of Water",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Why freshwater scarcity is a critical strategic risk in island ecosystems and how commercial facilities impact municipal reserves.",
        "contentBlocks": [
          {
            "id": "elh04-h1",
            "type": "heading",
            "level": 3,
            "text": "Every Drop Counts: Freshwater in an Island Ecosystem"
          },
          {
            "id": "elh04-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "Despite tropical rainfall, Mauritius experiences severe dry seasons with reservoir storage levels dropping below 40% during drought periods. Commercial buildings, offices, and hotels consume millions of cubic meters of potable water treated by the Central Water Authority (CWA). Water wasted through leaking fixtures, running pantry taps, and unmonitored washrooms accelerates municipal water rationing, impacting communities and industrial operations alike."
          },
          {
            "id": "elh04-c1",
            "type": "callout",
            "variant": "info",
            "title": "CWA Water Reality",
            "bodyText": "Potable water requires extensive chemical treatment, pumping energy, and distribution infrastructure. Treating wastewater and producing tap water carries a substantial carbon footprint."
          }
        ]
      },
      {
        "title": "2. Silent Leaks: The Toilet Cistern Drop Test",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Detecting hidden plumbing leaks that silently waste large volumes of treated water.",
        "contentBlocks": [
          {
            "id": "elh04-h2",
            "type": "heading",
            "level": 3,
            "text": "Hunting the Invisible Leak: Flappers and Valves"
          },
          {
            "id": "elh04-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "According to US EPA WaterSense commercial facility guidance, leaking toilet cistern flapper valves are among the most common sources of silent, unmetered water waste in commercial buildings. Because a worn rubber flapper or misaligned lift chain allows water to trickle continuously from the cistern tank into the bowl without creating an audible alarm, leaks can persist undetected for months, multiplying utility bills and straining municipal reservoir supplies."
          },
          {
            "id": "elh04-c2",
            "type": "callout",
            "variant": "tip",
            "title": "The 15-Minute Drop Test",
            "bodyText": "Place 4 drops of food coloring into the toilet cistern tank (do not flush). Wait 15 minutes. If colored water appears in the toilet bowl, the flapper valve is leaking and must be replaced immediately."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Managing Washroom Leak Reports",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Resolve an operational scenario regarding recurring washroom fixture leaks.",
        "contentBlocks": [
          {
            "id": "elh04-s1",
            "type": "interactive_scenario",
            "title": "Scenario: The 2nd Floor Executive Washroom Trickle",
            "prompt": "You notice a continuous thin trickle of water running down the bowl of the 2nd-floor accessible washroom toilet. A colleague says: 'It's just a tiny trickle, the maintenance team will notice it on their monthly rounds.' What is your operational response?",
            "options": [
              {
                "id": "opt_a",
                "text": "Ignore the trickle and assume someone else will log a maintenance ticket eventually.",
                "consequence": "Severe waste. The unaddressed leak will continue running 24/7 before the next scheduled inspection, wasting substantial volumes of treated water.",
                "feedback": "Failing to log leaks leads to massive cumulative water loss and high water utility bills.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Submit an immediate maintenance service request via the facilities helpdesk with the exact washroom location and cubicle number.",
                "consequence": "Optimal outcome. Maintenance replaces the faulty rubber seal within 2 hours, saving hundreds of liters of water daily.",
                "feedback": "Correct! Immediate reporting with precise location details ensures swift repair and prevents continuous water waste.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Office Pantry Dishwashing Habits",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Evaluate water-efficient practices for corporate kitchens and pantries.",
        "contentBlocks": [
          {
            "id": "elh04-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Pantry Lunchtime Cleaning Rush",
            "prompt": "During the 13:00 lunch rush in the office pantry, staff leave the hot-water tap running continuously at full blast (12 liters/min) while soaping coffee mugs and lunch containers one by one. What operational improvement do you implement?",
            "options": [
              {
                "id": "opt_a",
                "text": "Switch the entire office to disposable single-use plastic cups and styrofoam plates to eliminate dishwashing.",
                "consequence": "Terrible environmental trade-off. Generates massive solid waste destined for Mare Chicose landfill and increases ongoing purchasing expenses.",
                "feedback": "Replacing water washing with single-use plastic creates severe environmental pollution.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Introduce the 'Two-Basin Method' (one soapy wash basin, one rinse basin) and install a low-flow aerator nozzle (reducing tap flow to 4 L/min).",
                "consequence": "Optimal outcome. Cuts pantry dishwashing water consumption by over 65% while keeping reusable ceramic mugs and cutlery.",
                "feedback": "Excellent! Two-basin washing combined with low-flow aerator nozzles minimizes water consumption without generating plastic waste.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Restroom & Pantry Water Audit",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Conduct a structured water conservation inspection across your department's facilities.",
        "contentBlocks": [
          {
            "id": "elh04-h3",
            "type": "heading",
            "level": 3,
            "text": "Conducting Your Departmental Water Sweep"
          },
          {
            "id": "elh04-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Execute a 10-minute water audit: (1) Check that all pantry taps are fitted with aerators; (2) Perform food coloring drop tests on representative toilet cisterns; (3) Verify sensor taps shut off within 2 seconds of hands leaving; and (4) Report external irrigation sprinklers watering sidewalks or operating during rain."
          },
          {
            "id": "elh04-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Perform the 15-minute food coloring drop test on your office washroom cisterns this week and report any passing flappers to Facilities."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "Why are toilet cistern flapper leaks considered one of the most insidious sources of water waste in commercial facilities according to US EPA WaterSense guidance?",
        "options": [
          "Because flappers make a loud siren sound whenever they leak.",
          "Worn rubber flappers or misaligned lift chains allow treated water to trickle silently and continuously from the tank into the bowl without an audible alarm, escaping casual notice.",
          "Because toilet cisterns only leak during thunderstorms.",
          "Flapper leaks only happen in residential apartments, never in commercial offices."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "EPA WaterSense guidance notes that flapper leaks are silent and continuous, allowing treated potable water to escape unnoticed unless actively tested with dye or flow monitoring.",
        "incorrectExplanation": "Flapper leaks are silent and continuous, making routine dye testing essential for detection.",
        "optionFeedback": [
          "Incorrect. Flapper leaks are characteristically silent and produce no alarm.",
          "Correct! Silent flapper leaks trickle continuously without audible alarms, making visual dye testing essential for detection.",
          "Incorrect. Leaks occur continuously regardless of outdoor weather.",
          "Incorrect. Commercial gravity-tank toilets are equally prone to flapper wear."
        ],
        "practicalTakeaway": "Conduct regular 15-minute food coloring drop tests on commercial restroom cisterns to catch silent flapper leaks.",
        "learningOutcome": "Diagnose silent toilet flapper leaks via dye testing",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "How does the '15-minute food coloring drop test' detect silent toilet cistern leaks?",
        "options": [
          "It changes the color of the bathroom lights.",
          "Placing food coloring in the cistern tank without flushing reveals flapper seal degradation if dye appears in the toilet bowl within 15 minutes.",
          "It measures water temperature in degrees Celsius.",
          "It cleans the toilet bowl automatically."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "If the rubber flapper does not seal tightly against the valve seat, colored water seeps past the seal and shows up in the bowl without flushing.",
        "incorrectExplanation": "Dye appearing in the bowl without flushing confirms water is leaking past the tank flapper valve.",
        "optionFeedback": [
          "Incorrect. Food coloring interacts with water chemistry, not electrical lighting.",
          "Correct! If dye migrates into the bowl without flushing, the rubber flapper valve is failing and must be replaced.",
          "Incorrect. Dye indicates fluid bypass, not thermal temperature.",
          "Incorrect. Food coloring is an inspection diagnostic tool, not a detergent."
        ],
        "practicalTakeaway": "Use non-toxic dye tablets or food coloring to audit toilet tank flapper integrity.",
        "learningOutcome": "Perform toilet cistern diagnostic drop test",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "What is the primary water conservation advantage of installing low-flow faucet aerators in office pantries and washrooms?",
        "options": [
          "They turn tap water into sparkling mineral water.",
          "They entrain air into the water stream, maintaining high perceived rinsing pressure while reducing water volume flow by 50% to 70%.",
          "They make water flow twice as fast.",
          "They heat water using solar radiation."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Aerators introduce micro-bubbles into the stream, delivering a soft, non-splashing spray with effective wetting action at a fraction of standard tap flow.",
        "incorrectExplanation": "Aerators mix air into the flow stream to maintain pressure sensations while cutting volumetric water flow.",
        "optionFeedback": [
          "Incorrect. Aerators mix ambient air into the water stream, not carbonation.",
          "Correct! Aerators reduce water flow from ~12 L/min to 3\u20134 L/min by mixing air into the stream without sacrificing rinsing effectiveness.",
          "Incorrect. Aerators decrease volumetric flow rate to conserve water.",
          "Incorrect. Aerators are mechanical diffusion nozzles without heating elements."
        ],
        "practicalTakeaway": "Fit high-efficiency aerator nozzles (3.8\u20135.0 L/min) on all handwashing and pantry taps.",
        "learningOutcome": "Apply low-flow aerator technologies in commercial fixtures",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "Why is washing pantry dishes using a 'Two-Basin Method' (one soapy wash, one clean rinse) significantly more water-efficient than washing under a continuous running tap?",
        "options": [
          "Because it uses cold water only.",
          "A continuous running tap can discharge 10\u201312 liters per minute of treated water down the drain, whereas two basins use a fixed volume of ~10 liters for an entire batch of dishes.",
          "Because two basins require special dish soap from France.",
          "It takes 5 hours to fill two basins."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Batch washing uses a static pool of water, cutting consumption by up to 70% compared to washing each plate under an open running tap.",
        "incorrectExplanation": "Static batch washing uses a fraction of the water volume consumed by continuous running taps.",
        "optionFeedback": [
          "Incorrect. Water temperature does not determine the volumetric efficiency of the two-basin method.",
          "Correct! Batch washing in two basins uses a small fixed volume, avoiding continuous 10\u201312 L/min tap discharge during individual item scrubbing.",
          "Incorrect. Standard biodegradable dishwashing liquid works perfectly in batch basins.",
          "Incorrect. Filling standard pantry basins takes less than 60 seconds."
        ],
        "practicalTakeaway": "Adopt the two-basin dishwashing method in all staff kitchenettes and pantries.",
        "learningOutcome": "Implement water-efficient pantry cleaning protocols",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "During severe drought or low reservoir levels in Mauritius, what operational measure should corporate facilities implement regarding landscape irrigation?",
        "options": [
          "Watering lawns with treated potable Central Water Authority (CWA) tap water at 12:00 noon.",
          "Suspending potable water lawn irrigation, utilizing harvested rainwater or greywater, and scheduling any essential watering during cool evening hours to minimize evaporation.",
          "Leaving sprinklers on 24 hours a day to keep grass green.",
          "Paving over all green areas with black asphalt immediately."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Irrigating during peak midday heat causes up to 50% evaporation loss. Drought protocols prioritize potable water for sanitation and switch landscape irrigation to non-potable sources.",
        "incorrectExplanation": "Midday watering with potable water during droughts wastes critical municipal reserves through rapid evaporation.",
        "optionFeedback": [
          "Incorrect. Irrigating with potable water at noon violates drought advisories and wastes water through evaporation.",
          "Correct! Halting potable landscape watering and shifting essential irrigation to night/evening hours using harvested non-potable water protects reservoir reserves.",
          "Incorrect. 24-hour sprinkler operation depletes municipal storage rapidly.",
          "Incorrect. Removing soil permeability worsens urban heat island effects and stormwater runoff."
        ],
        "practicalTakeaway": "Shift irrigation to evening hours and prioritize rainwater or condensate recycling for landscape use.",
        "learningOutcome": "Execute drought response and landscape water conservation",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "What is the primary sustainability benefit of installing dual-flush toilet mechanisms in commercial restrooms?",
        "options": [
          "They play musical chimes when flushed.",
          "They provide a reduced volume flush (3\u20134 liters) for liquid waste and a full flush (6 liters) for solid waste, cutting flush water demand by 30% to 50%.",
          "They eliminate the need for sewer plumbing.",
          "They require zero water under all conditions."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Because liquid flushes account for ~80% of restroom visits, the reduced volume button dramatically lowers annual water throughput.",
        "incorrectExplanation": "Dual-flush systems provide calibrated small flushes for liquid waste, cutting overall sanitary water use.",
        "optionFeedback": [
          "Incorrect. Sanitary fixtures are designed for hydraulic hygiene, not acoustic entertainment.",
          "Correct! Providing a low-volume option for liquid waste saves 3 to 5 liters on every light flush, reducing aggregate restroom water demand substantially.",
          "Incorrect. Dual-flush toilets connect to standard sanitary drainage pipes.",
          "Incorrect. Dual-flush systems use water, but in calibrated, efficient volumes."
        ],
        "practicalTakeaway": "Ensure dual-flush buttons are clearly labeled for staff and guests.",
        "learningOutcome": "Utilize dual-flush sanitary fixtures effectively",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "Why should employees immediately report dripping faucets and weeping pipe joints to the facilities maintenance department?",
        "options": [
          "To get the maintenance supervisor into trouble.",
          "Even a slow drip of 1 drop per second accumulates to thousands of liters of treated potable water wasted annually, while unattended leaks can cause structural and mould damage.",
          "Dripping water attracts wild animals into the building.",
          "Plumbing leaks increase water pressure in the building."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "A single slow drip wastes thousands of liters per year, and persistent moisture damages cabinetry, drywall, and breeds indoor mould.",
        "incorrectExplanation": "Prompt reporting prevents cumulative volume loss and avoids building water damage.",
        "optionFeedback": [
          "Incorrect. Helpdesk reporting supports maintenance teams in proactive asset stewardship.",
          "Correct! A steady drip waste accumulates to thousands of liters over time, while unaddressed leaks cause moisture damage and indoor mould.",
          "Incorrect. Domestic drips do not attract wildlife into commercial buildings.",
          "Incorrect. Leaks cause pressure loss, not pressure increases."
        ],
        "practicalTakeaway": "Log a helpdesk maintenance ticket immediately whenever you observe a dripping tap or leaking pipe.",
        "learningOutcome": "Establish workplace leak reporting discipline",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "Which of the following represents an effective 30-day workplace water conservation action commitment?",
        "options": [
          "Leaving the pantry faucet running continuously all day.",
          "Performing a 15-minute food coloring drop test on department washroom cisterns, reporting passing flappers, and adopting two-basin pantry dishwashing.",
          "Disconnecting all water pipes in the building.",
          "Washing company delivery vans daily with high-pressure potable fire hoses."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Conducting washroom cistern dye tests and practicing two-basin dishwashing delivers immediate, measurable water savings.",
        "incorrectExplanation": "Dye testing cisterns and optimizing pantry washing creates enduring water conservation habits.",
        "optionFeedback": [
          "Incorrect. Running taps continuously wastes thousands of liters daily.",
          "Correct! Systematic cistern drop testing and two-basin pantry cleaning establish high-impact, zero-cost water stewardship habits.",
          "Incorrect. Disconnecting supply breaches basic workplace sanitary codes.",
          "Incorrect. Using potable fire hoses for vehicle washing is an illegal waste of water."
        ],
        "practicalTakeaway": "Perform washroom cistern dye tests and practice two-basin dishwashing in your department.",
        "learningOutcome": "Execute personal 30-day water stewardship action commitment",
        "competencyArea": "COMP_WATER"
      }
    ]
  },
  {
    "courseCode": "ELH-05",
    "title": "Sustainable Purchasing for Non-Specialists",
    "slug": "sustainable-purchasing-non-specialists",
    "description": "Learn to evaluate eco-labels, calculate total cost of ownership (TCO), avoid greenwashed supplies, and choose sustainable office consumables.",
    "fullDescription": "Sustainable Purchasing for Non-Specialists empowers office administrators, department coordinators, and team leads to make environmentally responsible buying choices. Learn how to look beyond the initial purchase price by evaluating Total Cost of Ownership (TCO), navigate verified environmental certifications (such as FSC, Energy Star, Made in Moris, and ISO 14001), and eliminate single-use plastic office consumables.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D1 Awareness",
    "passingScore": 75,
    "primaryCompetency": "COMP_SUPPLY_CHAIN",
    "secondaryCompetencies": [
      "COMP_SUSTAINABILITY_FOUNDATIONS",
      "COMP_CIRCULARITY"
    ],
    "learningObjectives": [
      "Differentiate credible, third-party verified eco-labels from misleading commercial greenwashing.",
      "Calculate Total Cost of Ownership (TCO) including energy, consumables, maintenance, and end-of-life disposal.",
      "Select sustainable alternatives for everyday office consumables, paper products, and cleaning supplies.",
      "Evaluate local Mauritian suppliers ('Made in Moris') to reduce supply chain Scope 3 freight emissions."
    ],
    "intendedRoles": [
      "Office Administrators",
      "Department Buyers",
      "Executive Assistants",
      "Team Coordinators"
    ],
    "badgeName": "Sustainable Purchasing Practitioner",
    "badgeDescription": "Demonstrated competence in total cost of ownership analysis, eco-label verification, and sustainable purchasing.",
    "completionMessage": "Congratulations! You have completed Sustainable Purchasing for Non-Specialists and are now ready to make ethical, cost-effective procurement choices.",
    "recommendedNextCourseCode": "ELH-26",
    "lessons": [
      {
        "title": "1. Looking Beyond the Initial Price Tag (TCO)",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Why the cheapest initial purchase price frequently becomes the most expensive and wasteful option over product lifecycles.",
        "contentBlocks": [
          {
            "id": "elh05-h1",
            "type": "heading",
            "level": 3,
            "text": "Total Cost of Ownership: The Hidden Iceberg"
          },
          {
            "id": "elh05-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "When purchasing office equipment, appliances, or consumables, the upfront invoice price represents only the visible tip of an economic iceberg. Total Cost of Ownership (TCO) calculates all lifecycle expenses: purchase price + electricity consumption + proprietary replacement consumables (e.g. expensive ink cartridges) + maintenance + end-of-life recycling. An inefficient printer that costs 20% less upfront often consumes 3 times more power and generates double the cartridge waste over 3 years."
          },
          {
            "id": "elh05-c1",
            "type": "callout",
            "variant": "info",
            "title": "TCO Formula",
            "bodyText": "TCO = Initial Purchase Price + Lifetime Operating Energy + Lifetime Consumables & Maintenance - Residual Value. Always evaluate TCO before selecting equipment."
          }
        ]
      },
      {
        "title": "2. Navigating Eco-Labels & Spotting Greenwash",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "How to verify genuine third-party certifications and avoid self-declared marketing greenwashing.",
        "contentBlocks": [
          {
            "id": "elh05-h2",
            "type": "heading",
            "level": 3,
            "text": "Decoding Environmental Certifications"
          },
          {
            "id": "elh05-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "Marketers frequently invent green-sounding terms like '100% Eco-Friendly' or 'Earth Choice' without independent verification. Authentic sustainable purchasing relies on Type I third-party verified eco-labels: (1) **FSC (Forest Stewardship Council)**: FSC certification confirms that forest products are harvested sustainably, protecting biodiversity, water resources, and indigenous community rights, tracked through certified chain-of-custody supply chains; (2) **Energy Star**: independent energy efficiency testing; (3) **Made in Moris**: verified local Mauritian manufacturing and value-addition; and (4) **EPEAT**: comprehensive electronic lifecycle criteria."
          },
          {
            "id": "elh05-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Rule of Thumb",
            "bodyText": "If a product claims to be 'green' but does not display a registered third-party certification number or audit standard, treat it as unverified marketing."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Selecting Office Paper Supplies",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Evaluate competing supplier quotes for corporate paper procurement.",
        "contentBlocks": [
          {
            "id": "elh05-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Annual Office Copy Paper Tender",
            "prompt": "You are procuring 500 reams of A4 copy paper for the company. Supplier A offers uncertified virgin pulp paper at Rs 180 per ream. Supplier B offers FSC-certified 100% post-consumer recycled chlorine-free paper at Rs 195 per ream (an extra Rs 15 per ream, totaling Rs 7,500 difference annually). How do you decide?",
            "options": [
              {
                "id": "opt_a",
                "text": "Select Supplier A strictly because the purchase order price is Rs 15 cheaper per ream.",
                "consequence": "Poor outcome. Saves minor budget but drives deforestation, uses virgin pulp with high chemical bleaching, and breaches corporate sustainability commitments.",
                "feedback": "Choosing uncertified virgin paper to save minor upfront funds ignores deforestation impacts and corporate environmental policy.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Select Supplier B, verifying the FSC certification logo and chain-of-custody code, while implementing default duplex printing to reduce overall paper consumption by 40%.",
                "consequence": "Optimal outcome. Duplex printing cuts paper spend by 40% (saving Rs 39,000 net), while 100% FSC recycled paper ensures ethical forest management.",
                "feedback": "Correct! Pairing certified sustainable materials with operational demand reduction saves money while eliminating deforestation footprint.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Evaluating Catering Supplies",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Select catering supplies for a 150-person corporate client seminar.",
        "contentBlocks": [
          {
            "id": "elh05-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Seminar Catering Service Disposables",
            "prompt": "You are organizing lunch catering for a 150-person client workshop. The caterer offers disposable plastic cups, styrofoam food containers, and single-use plastic water bottles for Rs 250/head, or reusable ceramic tableware and water carafes for Rs 280/head. What is your purchasing choice?",
            "options": [
              {
                "id": "opt_a",
                "text": "Choose the disposable plastic option to save Rs 30 per participant and avoid washing dishes.",
                "consequence": "High-waste outcome. Generates over 600 single-use plastic items destined for Mare Chicose landfill, damaging corporate brand image in front of enterprise clients.",
                "feedback": "Single-use plastic catering generates substantial waste and projects an unprofessional, non-sustainable brand image.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Select the reusable ceramic tableware package with filtered water carafes, highlighting the company's zero-single-use-plastic policy in event communications.",
                "consequence": "Optimal outcome. Eliminates 100% of single-use plastic waste, elevates client dining experience, and reinforces authentic brand leadership.",
                "feedback": "Excellent! Reusable catering elevates corporate reputation, eliminates landfill waste, and demonstrates authentic sustainability in practice.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Office Purchasing Sustainability Checklist",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Implement sustainable procurement criteria into everyday department requisitions.",
        "contentBlocks": [
          {
            "id": "elh05-h3",
            "type": "heading",
            "level": 3,
            "text": "Your Sustainable Purchasing Checklist"
          },
          {
            "id": "elh05-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Apply four questions before issuing any purchase order: (1) Is this purchase truly necessary, or can we share/repair existing equipment? (2) Does the item carry a verified eco-label (FSC, Energy Star, Made in Moris)? (3) What is the Total Cost of Ownership including power and refills? and (4) Can packaging be returned to the supplier?"
          },
          {
            "id": "elh05-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Audit your department's recurring stationery orders this month and substitute uncertified paper and single-use plastic pens with certified eco-alternatives."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "What does 'Total Cost of Ownership' (TCO) evaluate when comparing purchasing options for office equipment?",
        "options": [
          "Only the physical weight of the product in kilograms.",
          "All direct and indirect lifecycle costs: initial purchase price, electricity and consumables during operation, maintenance expenses, and disposal/recycling costs.",
          "The salary of the salesperson selling the equipment.",
          "The cost of shipping the item by luxury cruise ship."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "TCO considers the complete lifecycle financial footprint, ensuring buyers avoid cheap upfront items that carry exorbitant running costs.",
        "incorrectExplanation": "Total Cost of Ownership includes purchase price, operating energy, maintenance, consumables, and end-of-life disposal.",
        "optionFeedback": [
          "Incorrect. Physical weight does not reflect economic lifecycle cost.",
          "Correct! TCO calculates purchase price + lifetime energy + ongoing refills/maintenance + disposal, revealing the true economic cost.",
          "Incorrect. Sales commissions are internal vendor matters, not buyer TCO.",
          "Incorrect. Shipping mode is only one minor component of initial freight."
        ],
        "practicalTakeaway": "Always evaluate multi-year operating energy and consumable costs alongside initial purchase price.",
        "learningOutcome": "Calculate and apply Total Cost of Ownership (TCO)",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "What does the Forest Stewardship Council (FSC) certification on paper and timber products guarantee?",
        "options": [
          "The trees were cut down in an urban city park.",
          "The wood fiber originates from responsibly managed forests that preserve biodiversity, protect indigenous rights, prevent deforestation, and are tracked through certified chain-of-custody.",
          "The paper was manufactured without using any wood fiber.",
          "The paper is edible for human consumption."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "FSC is a globally recognized independent standard ensuring responsible forest management, social welfare for forestry workers, and complete chain-of-custody tracking.",
        "incorrectExplanation": "FSC certification guarantees ethical, environmentally responsible forest management and traceable supply chains.",
        "optionFeedback": [
          "Incorrect. FSC certifies commercial forest stewardship, not urban tree felling.",
          "Correct! FSC certification guarantees that forest products are harvested under strict ecological, social, and chain-of-custody standards.",
          "Incorrect. FSC applies specifically to forest wood fiber and timber products.",
          "Incorrect. Office paper is manufactured for documentation, not nutrition."
        ],
        "practicalTakeaway": "Specify 100% FSC-certified or FSC-recycled copy paper in all corporate purchasing requisitions.",
        "learningOutcome": "Identify authentic third-party certifications like FSC",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "Which of the following environmental claims represents classic 'greenwashing'?",
        "options": [
          "A computer monitor displaying an official EPEAT Gold certification registration number.",
          "A cleaning spray claiming to be '100% Pure, Green, and Chemical-Free' without any third-party certification, chemical ingredient list, or audit evidence.",
          "Paper packaging bearing a verified FSC Mix logo and license code.",
          "An appliance certified to Energy Star Tier 2 efficiency standards."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Vague superlatives ('Chemical-Free', '100% Pure') without ingredient transparency or independent third-party verification represent misleading greenwashing.",
        "incorrectExplanation": "Unsubstantiated, absolute marketing claims lacking third-party verification constitute greenwashing.",
        "optionFeedback": [
          "Incorrect. EPEAT Gold is an audited, independent electronic lifecycle standard.",
          "Correct! Vague buzzwords like 'Chemical-Free' and '100% Green' without verified data or standards represent classic misleading greenwash.",
          "Incorrect. FSC logos with license codes are auditable and genuine.",
          "Incorrect. Energy Star is an internationally recognized government-backed efficiency standard."
        ],
        "practicalTakeaway": "Reject vague buzzwords; demand verified certification numbers on vendor product sheets.",
        "learningOutcome": "Detect and reject misleading greenwashing in procurement",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "Why does prioritizing local Mauritian suppliers ('Made in Moris' certified) support corporate sustainability?",
        "options": [
          "Local products never require any electricity to make.",
          "It significantly reduces maritime and air freight carbon emissions (Scope 3 upstream transport), shortens delivery lead times, and stimulates local employment and economic resilience.",
          "It makes office computers run faster.",
          "Local products are exempt from all health and safety laws."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Sourcing locally cuts long-distance logistics emissions, strengthens supply chain resilience, and fosters domestic economic circularity.",
        "incorrectExplanation": "Local procurement slashes Scope 3 freight emissions and builds domestic economic resilience.",
        "optionFeedback": [
          "Incorrect. Local manufacturing utilizes standard industrial energy.",
          "Correct! Local purchasing cuts long-distance freight carbon emissions, enhances supply security, and supports the domestic economy.",
          "Incorrect. Supplier location does not impact computer processing speed.",
          "Incorrect. All Mauritian goods must comply with national safety standards."
        ],
        "practicalTakeaway": "Incorporate local sourcing preference in procurement scorecards to lower freight emissions.",
        "learningOutcome": "Evaluate local sourcing benefits for Scope 3 emissions reduction",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "What is the most sustainable approach when a department requests new office furniture?",
        "options": [
          "Throw away all existing desks and buy brand new furniture from abroad every 6 months.",
          "First audit existing corporate inventory, explore reupholstering or refurbishing current modular furniture, and purchase durable, modular pieces with recyclable materials only if necessary.",
          "Burn old furniture in the office parking lot.",
          "Order furniture made from endangered tropical hardwoods."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "The waste hierarchy dictates: Refuse -> Reduce -> Reuse -> Repair -> Recycle. Reusing and refurbishing preserves embodied carbon and capital.",
        "incorrectExplanation": "Auditing existing inventory and refurbishing durable modular furniture avoids unnecessary consumption.",
        "optionFeedback": [
          "Incorrect. Premature disposal causes immense landfill waste and capital loss.",
          "Correct! Prioritizing refurbishment, reuse, and modular repairability minimizes raw material consumption and lifecycle costs.",
          "Incorrect. Open burning generates toxic smoke and violates environmental laws.",
          "Incorrect. Endangered hardwoods cause catastrophic biodiversity destruction."
        ],
        "practicalTakeaway": "Always explore reuse, repair, and modular refurbishment before buying new assets.",
        "learningOutcome": "Apply circular hierarchy in asset procurement",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "When procuring corporate promotional gifts (swag) for client events, which option represents best-practice sustainable purchasing?",
        "options": [
          "Cheap single-use plastic keychains wrapped in three layers of plastic film.",
          "High-quality, durable, useful items made from recycled or organic materials (e.g. Made in Moris organic cotton totes, stainless steel reusable water bottles) with minimal packaging.",
          "Disposable novelty plastic whistles that break after one use.",
          "Gifts with zero utility that will immediately be thrown into trash bins."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Sustainable corporate gifting focuses on durability, high utility, circular materials, and minimal packaging, enhancing brand reputation.",
        "incorrectExplanation": "Durable, high-utility gifts made from sustainable materials avoid immediate landfill disposal.",
        "optionFeedback": [
          "Incorrect. Disposable plastic novelties damage brand image and generate instant waste.",
          "Correct! High-utility items made from organic or recycled materials provide long-term brand visibility without creating throwaway plastic waste.",
          "Incorrect. Cheap novelty items are discarded immediately.",
          "Incorrect. Gifts lacking utility are an economic and environmental waste."
        ],
        "practicalTakeaway": "Choose durable, reusable, ethically sourced promotional gifts with minimal packaging.",
        "learningOutcome": "Select sustainable corporate promotional products",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "How can buyers reduce single-use plastic packaging waste when ordering bulk pantry and cleaning supplies?",
        "options": [
          "Requesting each bottle to be packaged in an individual plastic bag.",
          "Partnering with suppliers who provide concentrated refills in bulk returnable containers, eliminating hundreds of single-use plastic spray bottles.",
          "Throwing plastic bottles into municipal stormwater drains.",
          "Switching to single-serving plastic sachets for all products."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Bulk concentrated refills cut packaging volume by over 80% and allow dispenser bottles to be reused for years.",
        "incorrectExplanation": "Bulk concentrates in returnable containers eliminate repetitive single-use packaging waste.",
        "optionFeedback": [
          "Incorrect. Individual wrapping exponentially increases plastic waste.",
          "Correct! Bulk concentrated refills in closed-loop returnable containers eliminate massive single-use container waste.",
          "Incorrect. Dumping plastics in drains causes severe flooding and marine pollution.",
          "Incorrect. Single-serving sachets represent one of the worst forms of non-recyclable plastic pollution."
        ],
        "practicalTakeaway": "Procure cleaning chemicals in concentrated bulk containers with reusable spray dispensers.",
        "learningOutcome": "Eliminate single-use packaging via bulk purchasing",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "Which of the following represents an effective 30-day personal sustainable purchasing commitment?",
        "options": [
          "Ordering 1,000 plastic water bottles for weekly office meetings.",
          "Updating stationery purchase orders to specify 100% FSC-certified recycled paper and establishing a returnable packaging agreement with our primary office supplier.",
          "Banning all office supplies completely.",
          "Deleting the procurement vendor database."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Switching paper specs to FSC recycled and requiring returnable packaging creates immediate, lasting supply chain impact.",
        "incorrectExplanation": "Specifying FSC recycled paper and returnable packaging institutionalizes sustainable purchasing habits.",
        "optionFeedback": [
          "Incorrect. Bottled water produces severe plastic waste; filtered water carafes should be used.",
          "Correct! Specifying FSC recycled paper and returnable packaging embeds sustainable purchasing into daily operations.",
          "Incorrect. Necessary supplies must be maintained sustainably.",
          "Incorrect. Vendor management systems are vital for commercial governance."
        ],
        "practicalTakeaway": "Switch recurring paper orders to FSC recycled and mandate returnable packaging with top vendors.",
        "learningOutcome": "Execute sustainable purchasing 30-day action plan",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      }
    ]
  },
  {
    "courseCode": "ELH-06",
    "title": "Green Office Practices & Resource Efficiency",
    "slug": "green-office-practices-resource-efficiency",
    "description": "Drive zero-waste office routines, high-purity waste segregation, digital paperless workflows, and a thriving workplace green culture.",
    "fullDescription": "Green Office Practices & Resource Efficiency transforms standard commercial workplaces into models of resource conservation. Learn how to implement high-purity waste segregation streams, digitize paper-heavy administrative processes, eliminate single-use plastics from breakrooms, and lead departmental green champion committees.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D1 Awareness",
    "passingScore": 75,
    "primaryCompetency": "COMP_CIRCULARITY",
    "secondaryCompetencies": [
      "COMP_SUSTAINABILITY_FOUNDATIONS",
      "COMP_SOCIAL_COMMUNITY"
    ],
    "learningObjectives": [
      "Implement high-purity 4-stream office waste segregation (Paper, Plastics, E-Waste, Organic/General).",
      "Digitize paper-heavy administrative, approval, and document retention workflows.",
      "Eliminate single-use plastics across office pantries, events, and client meetings.",
      "Organize and lead grassroots workplace Green Teams to drive continuous eco-improvements."
    ],
    "intendedRoles": [
      "All Office Personnel",
      "Administrative Staff",
      "Office Managers",
      "Green Committee Members"
    ],
    "badgeName": "Green Office Champion",
    "badgeDescription": "Demonstrated competence in waste segregation, paperless workflows, and workplace circularity.",
    "completionMessage": "Congratulations! You have completed Green Office Practices & Resource Efficiency and are empowered to lead sustainable workplace transformations.",
    "recommendedNextCourseCode": "ELH-07",
    "lessons": [
      {
        "title": "1. The Anatomy of Office Waste",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Understanding the composition of corporate office waste and why unsegregated waste ends up in landfills.",
        "contentBlocks": [
          {
            "id": "elh06-h1",
            "type": "heading",
            "level": 3,
            "text": "What Really Goes into Corporate Trash Bins?"
          },
          {
            "id": "elh06-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "An audit of typical commercial office waste reveals: 50% paper and cardboard, 20% plastic and packaging, 15% food and organic waste, and 15% miscellaneous/e-waste. When desk-side trash bins are used without segregation, food scraps contaminate clean paper and plastics, turning potentially valuable recyclable materials into unrecyclable municipal solid waste destined for Mare Chicose landfill."
          },
          {
            "id": "elh06-c1",
            "type": "callout",
            "variant": "info",
            "title": "Contamination Factor",
            "bodyText": "A single half-full coffee cup thrown into a paper recycling bin can ruin an entire 50 kg batch of clean paper, making it unrecyclable."
          }
        ]
      },
      {
        "title": "2. Centralized 4-Stream Waste Segregation",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Replacing desk-side trash cans with standardized central recycling hubs.",
        "contentBlocks": [
          {
            "id": "elh06-h2",
            "type": "heading",
            "level": 3,
            "text": "Centralized Stations: High Purity, Zero Confusion"
          },
          {
            "id": "elh06-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "Leading organizations remove individual desk-side trash bins and introduce centralized 4-stream sorting stations in corridors and pantries: (1) **Clean Paper & Cardboard**; (2) **Plastic Bottles & Cans**; (3) **Electronic Waste & Batteries**; and (4) **General Landfill / Food Waste**. According to Statistics Mauritius (Digest of Environment Statistics 2023, Table 4.1), over 500,000 tonnes of solid waste are sent annually to Mare Chicose landfill; high-purity office segregation is essential to divert clean materials into local recycling streams."
          },
          {
            "id": "elh06-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Signage Rule",
            "bodyText": "Use clear visual photo signage with English, French, and Mauritian Creole on every recycling bin to eliminate sorting confusion."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Managing Desk-Side Bin Removal",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Overcome employee pushback when transitioning to centralized recycling stations.",
        "contentBlocks": [
          {
            "id": "elh06-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Transitioning to Centralized Recycling Hubs",
            "prompt": "Facilities announces the removal of individual under-desk plastic trash cans to implement central 4-stream recycling hubs. A vocal manager complains: 'Walking 15 meters to throw away an apple core wastes my billable time! I want my private bin back.' How do you address this?",
            "options": [
              {
                "id": "opt_a",
                "text": "Immediately return private under-desk bins to anyone who complains.",
                "consequence": "Project failure. Destroys waste segregation purity, maintains 100% landfill disposal, and continues consuming 20,000 plastic bin-liners annually.",
                "feedback": "Compromising on private bins defeats centralized sorting and perpetuates landfill contamination.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Explain the operational and health benefits: central stations eliminate rotting food odours at desks, encourage healthy micro-movement breaks, and allow 80% waste diversion from Mare Chicose.",
                "consequence": "Optimal outcome. You achieve 95% employee buy-in, eliminate 20,000 single-use plastic bin liners annually, and achieve high-purity recycling.",
                "feedback": "Correct! Transparent communication highlighting health, active movement, and environmental impact builds lasting employee engagement.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Paperless Document Workflows",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Transitioning traditional paper-based document signing and archiving to cloud digital signatures.",
        "contentBlocks": [
          {
            "id": "elh06-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Reforming the Monthly Expense Voucher Signing",
            "prompt": "Finance currently requires 40 departments to print physical expense reports, sign them with ink, scan them, and file paper copies in physical archive folders (consuming 10,000 sheets/month). How do you modernize this workflow?",
            "options": [
              {
                "id": "opt_a",
                "text": "Purchase faster color printers and additional metal filing cabinets.",
                "consequence": "Wasteful and obsolete. Locks the company into continuous paper, toner, and physical storage costs.",
                "feedback": "Buying more storage hardware perpetuates outdated, paper-intensive processes.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Implement a cloud-based digital signature and PDF approval workflow, creating secure encrypted digital archives.",
                "consequence": "Optimal outcome. Eliminates 120,000 sheets of printed paper annually, speeds up expense approval turnaround from 5 days to 2 hours, and cuts storage costs.",
                "feedback": "Excellent! Digital signature workflows save immense paper resources, improve audit trails, and drastically accelerate turnaround times.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Office Green Team Launch",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Form a volunteer workplace Green Team to sustain environmental initiatives.",
        "contentBlocks": [
          {
            "id": "elh06-h3",
            "type": "heading",
            "level": 3,
            "text": "Building a Thriving Workplace Green Culture"
          },
          {
            "id": "elh06-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Lasting behavioral change happens when employees lead from within. Establish an informal workplace Green Team: (1) Host a monthly 30-minute sustainability lunch & learn; (2) Organize an annual e-waste drop-off drive for employee home electronics; (3) Track and display monthly paper and waste diversion metrics in the cafeteria; and (4) Reward departments that achieve zero-landfill milestones."
          },
          {
            "id": "elh06-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Nominate yourself or a colleague to join your organization's workplace Green Team this month and implement one paperless workflow reform."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "Why is food and beverage contamination in paper recycling bins a major operational problem?",
        "options": [
          "It makes the paper heavier to lift.",
          "Liquids and oils grease paper fibers, degrading fiber bonding and causing entire batches of clean recyclable paper to be rejected and sent to landfill.",
          "It attracts paper-eating birds into the recycling plant.",
          "Recycling machines can only process paper that smells like coffee."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "Paper recycling depends on clean wood pulp slurry; oil, grease, and food liquids prevent fiber re-bonding, destroying the commercial recyclability of the entire bin.",
        "incorrectExplanation": "Organic liquids and oils ruin the hydrogen bonding of paper pulp fibers, contaminating recyclable batches.",
        "optionFeedback": [
          "Incorrect. Weight is not the primary reason for batch rejection.",
          "Correct! Food oils and sugary liquids contaminate paper fibers, causing recyclers to discard entire collected loads into the landfill.",
          "Incorrect. Industrial recycling plants are enclosed sorting facilities.",
          "Incorrect. Food odors indicate contamination, which recyclers actively reject."
        ],
        "practicalTakeaway": "Always empty and rinse containers before recycling; keep all food waste strictly in general/organic bins.",
        "learningOutcome": "Prevent waste stream contamination in office recycling",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "What is the primary operational reason leading corporations replace individual desk-side trash cans with centralized 4-stream recycling hubs?",
        "options": [
          "To save money on buying desks.",
          "Centralized hubs enforce deliberate sorting, drastically improve waste stream purity, eliminate rotting food odors at workstations, and eliminate tens of thousands of single-use plastic bin liners.",
          "To make the office look completely empty.",
          "Because under-desk trash cans violate fire sprinkler codes."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Desk-side bins encourage mindless co-mingling of food and recyclables. Centralized hubs require conscious sorting and eliminate plastic liner consumption.",
        "incorrectExplanation": "Centralized stations force conscious waste segregation, prevent contamination, and eliminate thousands of plastic bin liners.",
        "optionFeedback": [
          "Incorrect. Desk-side bin removal is an operational waste policy, not furniture downsizing.",
          "Correct! Centralized hubs drive conscious sorting, protect recyclable purity, and eliminate thousands of disposable plastic bin liners annually.",
          "Incorrect. Centralized stations improve office hygiene and aesthetic order.",
          "Incorrect. Trash bins are not prohibited by sprinkler regulations, but central sorting improves hygiene."
        ],
        "practicalTakeaway": "Embrace centralized 4-stream recycling stations and eliminate private under-desk waste bins.",
        "learningOutcome": "Implement centralized waste sorting systems",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "How do digital signature and cloud PDF approval workflows improve organizational resource efficiency?",
        "options": [
          "They require everyone to buy a new smartphone every month.",
          "They eliminate physical printing, ink toner consumption, scanning, courier transport, and physical archive cabinet storage while accelerating turnaround times.",
          "They make documents confidential only to people named 'Paul'.",
          "They allow computers to operate without electricity."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "End-to-end digital workflows replace physical paper, toner, shipping, and storage space with secure, instant electronic verification.",
        "incorrectExplanation": "Digital document workflows eliminate millions of sheets of paper, ink cartridges, and physical storage costs.",
        "optionFeedback": [
          "Incorrect. Digital signing works on standard existing computers and tablets.",
          "Correct! Transitioning to cloud signatures eliminates paper, toner, physical mailing, and archive room rental while slashing turnaround times.",
          "Incorrect. Digital signatures use cryptographic access control, not first names.",
          "Incorrect. Electronic devices require standard low computing power."
        ],
        "practicalTakeaway": "Transition departmental approval and contract workflows to authenticated digital signatures.",
        "learningOutcome": "Digitize administrative workflows to eliminate paper waste",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "Why should electronic waste (dead batteries, old laptops, power cables) NEVER be thrown into general office trash bins?",
        "options": [
          "Because e-waste makes the trash bag too heavy.",
          "E-waste contains hazardous heavy metals (lead, cadmium, mercury, lithium) that leach into soil and groundwater at Mare Chicose landfill, while containing valuable recoverable metals (copper, gold).",
          "Because old cables will come to life and wrap around other trash.",
          "E-waste is made of pure sugar."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Electronics contain toxic chemicals that contaminate water tables when landfilled, alongside critical minerals that should be recycled through certified e-waste handlers.",
        "incorrectExplanation": "E-waste contains hazardous heavy metals that leach into groundwater and scarce precious metals that must be reclaimed.",
        "optionFeedback": [
          "Incorrect. Weight is secondary to toxic environmental contamination.",
          "Correct! Electronic waste contains hazardous toxins (lead, cadmium, mercury) that poison ecosystems, alongside valuable precious metals that must be recycled.",
          "Incorrect. Cables are inert synthetic materials.",
          "Incorrect. Electronics consist of metals, silicon, and polymers."
        ],
        "practicalTakeaway": "Deposit all old electronics, chargers, and batteries into certified corporate e-waste collection bins.",
        "learningOutcome": "Manage electronic waste responsibly via specialized recycling",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "What is the most effective way to eliminate single-use plastic water bottle waste during internal and client corporate meetings?",
        "options": [
          "Serving water in single-use plastic cups instead.",
          "Providing chilled filtered water stations, elegant glass carafes, and washable glassware in all meeting rooms and conference areas.",
          "Banning people from drinking water during meetings.",
          "Importing bottled water from Antarctica."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Glass carafes and reusable glassware provide a premium client experience while eliminating 100% of single-use plastic bottle procurement and disposal.",
        "incorrectExplanation": "Filtered water carafes and glassware provide elegant hospitality while eliminating disposable plastic bottles.",
        "optionFeedback": [
          "Incorrect. Disposable cups merely replace one single-use plastic item with another.",
          "Correct! Premium glass carafes and washable glasses eliminate plastic bottles, save significant purchasing funds, and elevate boardroom hospitality.",
          "Incorrect. Hydration is essential for cognitive performance and wellbeing.",
          "Incorrect. Long-distance imported bottled water carries an extreme carbon footprint."
        ],
        "practicalTakeaway": "Furnish meeting rooms with filtered water carafes and washable glassware.",
        "learningOutcome": "Eliminate single-use plastic bottles in corporate hospitality",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "What is the primary role of a workplace 'Green Team' committee?",
        "options": [
          "To punish colleagues who forget to turn off lights.",
          "To champion grassroots sustainability initiatives, organize educational activities, identify resource conservation opportunities, and foster an engaging culture of environmental stewardship.",
          "To replace the corporate board of directors.",
          "To paint the office building green."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Green Teams empower passionate employees across departments to drive collaborative eco-innovations, track metrics, and celebrate team milestones.",
        "incorrectExplanation": "Workplace Green Teams drive positive grassroots engagement, waste audits, and educational campaigns across departments.",
        "optionFeedback": [
          "Incorrect. Green teams focus on positive reinforcement, education, and cultural change.",
          "Correct! A workplace Green Team inspires cross-departmental engagement, identifies practical waste reductions, and builds a sustainable corporate culture.",
          "Incorrect. Green teams operate as cross-functional internal working groups.",
          "Incorrect. Green teams focus on operational habits, not paint colors."
        ],
        "practicalTakeaway": "Join or establish a volunteer Green Team to spearhead sustainability projects in your workplace.",
        "learningOutcome": "Establish and lead workplace Green Teams",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "How does setting office printers to 'Default Duplex' (double-sided printing) impact corporate resource efficiency?",
        "options": [
          "It doubles the amount of paper used.",
          "It immediately cuts office copy paper consumption and associated purchasing costs by up to 30% to 45% without requiring new equipment.",
          "It breaks the printer ink cartridges.",
          "It prints documents in mirror text that cannot be read."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Default duplexing halves paper requirements for multi-page documents, delivering immediate cost and tree conservation benefits.",
        "incorrectExplanation": "Default duplex printing cuts paper consumption and storage requirements by 30% to 45%.",
        "optionFeedback": [
          "Incorrect. Duplexing prints on both sides of a single sheet, halving paper volume.",
          "Correct! Configuring IT print servers to default duplex cuts paper consumption by 30% to 45% immediately at zero capital cost.",
          "Incorrect. Duplexing utilizes standard paper feed mechanics without damaging cartridges.",
          "Incorrect. Duplexing prints standard readable text on front and back sides."
        ],
        "practicalTakeaway": "Mandate default duplex printing across all company print drivers.",
        "learningOutcome": "Optimize IT print policies to cut paper consumption",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "Which of the following represents an effective 30-day personal green office action commitment?",
        "options": [
          "Printing all emails and filing them in paper folders.",
          "Eliminating personal single-use coffee cups by using a reusable mug, using central 4-stream recycling stations, and converting one paper form into a digital PDF.",
          "Throwing leftover food into the paper recycling bin.",
          "Leaving the office air conditioning and lights running overnight."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Using reusable drinkware, sorting waste accurately, and digitizing paper forms creates tangible daily circularity improvements.",
        "incorrectExplanation": "Adopting reusable mugs, sorting waste at central hubs, and digitizing paper workflows embeds sustainable habits.",
        "optionFeedback": [
          "Incorrect. Printing emails creates massive unnecessary paper waste.",
          "Correct! Adopting reusable mugs, sorting waste at centralized hubs, and digitizing one manual workflow delivers immediate resource savings.",
          "Incorrect. Food waste ruins recyclable paper batches.",
          "Incorrect. Leaving AC and lighting on overnight wastes substantial electrical energy."
        ],
        "practicalTakeaway": "Adopt reusable drinkware, sort waste at central hubs, and champion paperless workflows.",
        "learningOutcome": "Execute 30-day green office action commitment",
        "competencyArea": "COMP_CIRCULARITY"
      }
    ]
  },
  {
    "courseCode": "ELH-18",
    "title": "Sustainability Data Collection and Evidence",
    "slug": "sustainability-data-collection-evidence",
    "description": "Master auditable ESG metrics, Scope 1, 2 & 3 data gathering, utility calibration, waste manifests, and audit trail preparation under GRI, ISSB, and SEM guidelines.",
    "fullDescription": "Sustainability Data Collection and Evidence trains corporate sustainability coordinators, environmental officers, and compliance leads to establish airtight, audit-ready data pipelines. Master primary activity data collection for Scope 1 (fuel, refrigerants), Scope 2 (grid electricity), and Scope 3 (waste, business travel, commuting) emissions. Learn how to maintain calibrated meter logs, archive certified waste weighbridge certificates, reconcile utility invoices, and construct defensible audit trails aligned with GRI, ISSB, and Stock Exchange of Mauritius (SEM) reporting standards.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D2 Working Knowledge",
    "passingScore": 75,
    "primaryCompetency": "COMP_REPORTING",
    "secondaryCompetencies": [
      "COMP_GHG",
      "COMP_GOVERNANCE_ETHICS"
    ],
    "learningObjectives": [
      "Differentiate primary activity data (invoices, meter logs, weighbridge slips) from secondary estimations.",
      "Collect, validate, and document Scope 1, Scope 2, and initial Scope 3 activity data across business units.",
      "Establish robust data governance protocols, calibration schedules, and internal audit evidence trails.",
      "Prepare compliance documentation satisfying Stock Exchange of Mauritius (SEM/SEMSI) and GRI assurance requirements."
    ],
    "intendedRoles": [
      "Sustainability Officers",
      "HSE Coordinators",
      "ESG Data Analysts",
      "Finance & Compliance Leads"
    ],
    "badgeName": "ESG Data Auditor",
    "badgeDescription": "Demonstrated competence in auditable ESG data collection, meter calibration, and assurance trail governance.",
    "completionMessage": "Congratulations! You have completed Sustainability Data Collection and Evidence and are now qualified to build defensible, audit-grade ESG data systems.",
    "recommendedNextCourseCode": "ELH-25",
    "lessons": [
      {
        "title": "1. Primary Data vs Estimations & Assurance Standards",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Why external sustainability assurance demands primary source documentation and how to build verifiable data registries.",
        "contentBlocks": [
          {
            "id": "elh18-h1",
            "type": "heading",
            "level": 3,
            "text": "Building the Foundation of Audit-Ready ESG Data"
          },
          {
            "id": "elh18-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "In sustainability reporting, an assertion without primary source documentation is treated by auditors as non-existent. External auditors and stock exchange regulators (such as SEM under SEMSI guidelines) require primary evidence: calibrated utility meter photographs, official CEB/CWA invoices, certified weighbridge slips for waste, and itemized fuel receipts. While secondary financial estimations (e.g. spend-based carbon modeling) are acceptable for screening, only primary activity data provides the defensibility required for third-party limited or reasonable assurance."
          },
          {
            "id": "elh18-c1",
            "type": "callout",
            "variant": "info",
            "title": "Golden Rule of ESG Data",
            "bodyText": "Every data point entered into an ESG reporting software or spreadsheet must link directly to a timestamped, primary source attachment in the evidence repository."
          }
        ]
      },
      {
        "title": "2. Scope 1, 2 & 3 Data Extraction Protocols",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Systematic collection workflows for stationary combustion, fleet transport, purchased electricity, and waste streams.",
        "contentBlocks": [
          {
            "id": "elh18-h2",
            "type": "heading",
            "level": 3,
            "text": "Structuring Cross-Departmental Data Pipelines"
          },
          {
            "id": "elh18-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "Capturing enterprise emissions requires cross-functional data pipelines: (1) **Scope 1**: Diesel fuel logs for backup generators, company vehicle fleet fuel cards, and HVAC technician refrigerant top-up logs (tracking gas type and mass in kg); (2) **Scope 2**: Central Electricity Board (CEB) utility invoices and solar inverter generation exports in kWh; and (3) **Scope 3**: Waste disposal manifests with certified transfer notes and monthly HR commuting surveys."
          },
          {
            "id": "elh18-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Refrigerant Warning",
            "bodyText": "Refrigerant fugitive emissions (e.g. R-410A, R-134a) carry global warming potentials (GWPs) thousands of times higher than CO2; logging every kilogram added during maintenance is legally essential."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Resolving Incomplete Energy Data",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Handle a data gap where a branch office failed to record utility meter readings for two consecutive months.",
        "contentBlocks": [
          {
            "id": "elh18-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Missing Branch Office Utility Invoices",
            "prompt": "During the annual ESG data compilation, you discover that the Grand Baie regional branch office is missing electricity bills and meter logs for October and November. The annual report submission deadline is in 4 days. How do you resolve this data gap?",
            "options": [
              {
                "id": "opt_a",
                "text": "Invent approximate numbers based on pure guesswork and submit them without documenting the estimation method.",
                "consequence": "Catastrophic audit failure. Fabricating data violates assurance standards and leads to audit qualification, reputational damage, and potential regulatory sanctions.",
                "feedback": "Guessing numbers without an audited, documented estimation methodology destroys data integrity.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Contact CEB customer portal to retrieve duplicate official billing statements immediately; if unobtainable in time, use a documented, transparent proxy estimation (e.g. average of adjacent months adjusted for degree-days) and disclose the estimation methodology transparently in the audit trail.",
                "consequence": "Optimal outcome. You either obtain primary utility records or apply a rigorous, transparently disclosed estimation methodology that satisfies external assurance auditors.",
                "feedback": "Correct! Transparent proxy methodology with clear audit documentation satisfies assurance standards when primary data recovery is underway.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Validating Contractor Waste Manifests",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Verify whether a third-party recycling contractor's claims meet auditable standards.",
        "contentBlocks": [
          {
            "id": "elh18-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Unverified Contractor Recycling Claims",
            "prompt": "A new waste management contractor submits an invoice stating they diverted 15 tonnes of paper and plastics from landfill, but only provides a single handwritten summary sheet without weighbridge tickets or recycling facility delivery receipts. What is your data governance action?",
            "options": [
              {
                "id": "opt_a",
                "text": "Accept the handwritten sheet and report 15 tonnes of diverted waste in the annual sustainability report.",
                "consequence": "Audit failure. External assurance will reject unverified claims, exposing the company to accusations of greenwashing if waste was dumped at Mare Chicose.",
                "feedback": "Handwritten self-declarations without weighbridge certificates fail external assurance audits.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Withhold ESG reporting sign-off and mandate that the contractor provide timestamped weighbridge tickets and official recycling facility gate receipts before recording the diversion in the ESG database.",
                "consequence": "Optimal outcome. You establish strict evidence integrity, ensure the contractor is genuinely recycling materials, and maintain a bulletproof audit trail.",
                "feedback": "Excellent! Insisting on certified weighbridge tickets and downstream processing receipts protects data credibility.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Departmental ESG Evidence Repository Setup",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Create a standardized monthly evidence filing structure for your department.",
        "contentBlocks": [
          {
            "id": "elh18-h3",
            "type": "heading",
            "level": 3,
            "text": "Standardizing the Monthly Evidence Capture"
          },
          {
            "id": "elh18-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Establish a cloud folder hierarchy: `/ESG_Evidence_2026/[Month]/[Scope1_Scope2_Scope3]`. Mandate monthly upload of: (1) CEB electric and CWA water bills; (2) Fuel fleet transaction reports; (3) HVAC maintenance logs; and (4) Waste contractor weighbridge slips. Reconcile numerical entries against attachments before month-end close."
          },
          {
            "id": "elh18-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Set up your department's standardized ESG digital evidence folder this week and upload last month's utility and fuel documentation."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary difference between 'primary activity data' and 'secondary estimated data' in corporate greenhouse gas accounting?",
        "options": [
          "Primary data is written in pencil; secondary data is written in pen.",
          "Primary data is directly measured consumption from invoices, calibrated meters, and weighbridge slips; secondary data is calculated using industry spend proxies or generalized averages.",
          "Primary data only comes from government websites.",
          "There is no difference in credibility between the two."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "Primary data reflects actual physical units consumed (kWh, liters, kg) verified by primary records, making it the gold standard for external audit assurance.",
        "incorrectExplanation": "Primary data represents directly measured physical units, whereas secondary data relies on modeled estimations.",
        "optionFeedback": [
          "Incorrect. Media format does not define data classification.",
          "Correct! Primary data comes directly from metered consumption, invoices, and weighbridge slips, providing verified physical evidence for external audits.",
          "Incorrect. Primary data originates from operational enterprise records.",
          "Incorrect. Assurance standards heavily favor primary physical activity data over secondary estimations."
        ],
        "practicalTakeaway": "Always prioritize primary physical consumption records over financial spend approximations.",
        "learningOutcome": "Distinguish primary activity data from secondary estimations",
        "competencyArea": "COMP_REPORTING"
      },
      {
        "question": "Why is it essential to record the exact chemical refrigerant type and mass (in kg) added during HVAC system servicing?",
        "options": [
          "Because air conditioners cannot operate without filling out paperwork.",
          "Refrigerants (such as R-410A, R-134a) have high Global Warming Potentials (GWPs) that multiply minor physical leaks into tonnes of Scope 1 CO2-equivalent emissions.",
          "To change the color of the cooling gas.",
          "Refrigerants are considered non-toxic fruit juices."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Fugitive refrigerant leaks represent high-potency Scope 1 greenhouse gas emissions. Calculating their impact requires exact gas species (for correct GWP multiplier) and mass.",
        "incorrectExplanation": "Refrigerants possess high GWP values; accurate mass and chemical species data are required to calculate Scope 1 carbon equivalents.",
        "optionFeedback": [
          "Incorrect. Documentation is driven by environmental impact, not bureaucratic formality.",
          "Correct! Because refrigerants have Global Warming Potentials thousands of times higher than CO2, even small leaks in kilograms represent massive CO2e emissions.",
          "Incorrect. Refrigerant gases are clear and classified by chemical composition.",
          "Incorrect. Refrigerants are industrial fluorochemicals requiring strict containment."
        ],
        "practicalTakeaway": "Require HVAC service contractors to log exact refrigerant species and top-up mass in kilograms.",
        "learningOutcome": "Quantify Scope 1 fugitive refrigerant emissions accurately",
        "competencyArea": "COMP_REPORTING"
      },
      {
        "question": "When collecting Scope 2 electricity data from multiple facility sites, what is the primary source document required for third-party assurance?",
        "options": [
          "A verbal estimate given over a phone call.",
          "Official Central Electricity Board (CEB) monthly utility billing invoices showing metered kilowatt-hour (kWh) consumption and account identifiers.",
          "The weather forecast for the previous month.",
          "A handwritten sticky note."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Official CEB utility bills provide metered consumption, billing periods, account numbers, and meter identifiers required to prove Scope 2 emissions integrity.",
        "incorrectExplanation": "Official monthly utility invoices provide verifiable metered kWh data required for assurance.",
        "optionFeedback": [
          "Incorrect. Verbal statements fail all external assurance audit criteria.",
          "Correct! Official monthly utility invoices provide verifiable, third-party metered kWh data linked to specific physical assets.",
          "Incorrect. Weather data does not prove building electricity consumption.",
          "Incorrect. Informal notes lack audit validity and verifiable pedigree."
        ],
        "practicalTakeaway": "Archive original PDF utility bills in monthly evidence folders for all active accounts.",
        "learningOutcome": "Validate Scope 2 purchased electricity records",
        "competencyArea": "COMP_REPORTING"
      },
      {
        "question": "Under Stock Exchange of Mauritius (SEM) sustainability reporting guidelines, what data governance practice is mandatory for environmental disclosures?",
        "options": [
          "Publishing only qualitative marketing stories without numbers.",
          "Maintaining verifiable primary evidence trails, documented calculation methodologies, and clear internal sign-off workflows.",
          "Deleting all operational logs after 30 days.",
          "Reporting sustainability metrics only once every 10 years."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "SEM/SEMSI reporting frameworks require listed companies to substantiate all ESG claims with auditable documentation and transparent calculation methodology.",
        "incorrectExplanation": "SEMSI reporting requires auditable evidence trails, transparent formulas, and governance sign-offs.",
        "optionFeedback": [
          "Incorrect. SEM reporting requires rigorous quantitative and qualitative indicators.",
          "Correct! Regulators require robust evidence trails, standard calculation formulas, and clear organizational accountability for reported data.",
          "Incorrect. Retention policies require preserving records for multiple annual audit cycles.",
          "Incorrect. Sustainability disclosures must align with annual financial reporting cycles."
        ],
        "practicalTakeaway": "Establish documented calculation methodologies and audit trails for all SEM disclosures.",
        "learningOutcome": "Align corporate data governance with SEMSI reporting requirements",
        "competencyArea": "COMP_REPORTING"
      },
      {
        "question": "What is the role of an 'activity data evidence repository' in corporate ESG compliance?",
        "options": [
          "A place to hide invoices from the finance team.",
          "A centralized, structured digital storage system where primary source documents (bills, weighbridge receipts, calibration certificates) are permanently archived to support reported numbers.",
          "A public social media page for employee photos.",
          "A trash bin for recycling paper."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "A structured evidence repository allows internal reviewers and external auditors to trace any aggregated annual ESG metric back to its underlying primary document.",
        "incorrectExplanation": "An evidence repository preserves and links primary documents to reported metrics for audit verification.",
        "optionFeedback": [
          "Incorrect. Repositories enhance transparency, not concealment.",
          "Correct! A centralized evidence repository ensures that every reported number can be independently verified against original source documents.",
          "Incorrect. ESG repositories are secure enterprise compliance archives.",
          "Incorrect. Repositories are digital document systems."
        ],
        "practicalTakeaway": "Maintain an organized, secure cloud folder structure for all sustainability source evidence.",
        "learningOutcome": "Construct and maintain ESG evidence repositories",
        "competencyArea": "COMP_REPORTING"
      },
      {
        "question": "If an organization cannot obtain primary utility invoices for a specific month before an assurance deadline, what is the correct protocol?",
        "options": [
          "Make up a random low number to look more sustainable.",
          "Apply an approved, documented proxy estimation method (e.g. historical seasonal average), transparently disclose the estimation in the audit trail, and update with actuals when bills arrive.",
          "Omit the building entirely from the corporate GHG inventory.",
          "Refuse to complete the sustainability report."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Assurance standards permit proxy estimations provided the methodology is mathematically sound, documented, transparently disclosed, and later reconciled.",
        "incorrectExplanation": "Documented proxy estimations with full disclosure preserve reporting transparency when primary data is delayed.",
        "optionFeedback": [
          "Incorrect. Data fabrication is fraudulent and triggers immediate audit failure.",
          "Correct! Utilizing a transparent, documented estimation methodology and disclosing it openly satisfies external assurance requirements.",
          "Incorrect. Omitting assets creates an incomplete, non-compliant inventory boundary.",
          "Incorrect. Established estimation protocols allow reports to proceed with full transparency."
        ],
        "practicalTakeaway": "Document and disclose all proxy estimation methodologies clearly in your audit trail.",
        "learningOutcome": "Apply transparent proxy estimation protocols for data gaps",
        "competencyArea": "COMP_REPORTING"
      },
      {
        "question": "Why must waste management contractors provide certified weighbridge tickets rather than estimated truckload counts for landfill diversion metrics?",
        "options": [
          "Weighbridge tickets are printed on heavier paper.",
          "Weighbridge tickets provide legal, calibrated physical weight measurements (in metric tonnes), proving exact material volumes diverted from Mare Chicose landfill.",
          "Truckload counts are always 100% accurate.",
          "Weighbridge tickets are free lottery entries."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Truckload volume estimations vary wildly based on packing density; calibrated weighbridge tickets provide auditable mass measurements required for compliance.",
        "incorrectExplanation": "Calibrated weighbridge tickets provide legal, auditable proof of physical waste mass diverted from landfill.",
        "optionFeedback": [
          "Incorrect. Paper weight is irrelevant to legal certification.",
          "Correct! Calibrated weighbridge tickets prove exact physical mass, eliminating guesswork and providing verifiable proof of landfill diversion.",
          "Incorrect. Truck volumes vary heavily depending on compaction and density.",
          "Incorrect. Weighbridge tickets are legal commercial transport records."
        ],
        "practicalTakeaway": "Mandate certified weighbridge tickets as a contractual condition for all waste management invoices.",
        "learningOutcome": "Verify waste and circularity metrics with primary manifests",
        "competencyArea": "COMP_REPORTING"
      },
      {
        "question": "Which of the following represents an effective 30-day action commitment for an ESG data coordinator?",
        "options": [
          "Deleting the last 3 years of electricity records to save server disk space.",
          "Establishing a standardized monthly ESG evidence folder structure and conducting a primary data verification audit on top utility and fuel accounts.",
          "Ignoring contractor fuel logs until next year.",
          "Manually multiplying all carbon emissions by zero."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Setting up structured monthly evidence repositories and auditing high-impact data streams institutionalizes reliable data governance.",
        "incorrectExplanation": "Standardizing evidence storage and auditing utility data streams ensures continuous audit readiness.",
        "optionFeedback": [
          "Incorrect. Historical records must be preserved for baseline recalculations.",
          "Correct! Implementing standard evidence filing and auditing utility accounts ensures robust, audit-ready data governance across the enterprise.",
          "Incorrect. Delaying collection causes severe data gaps during annual assurance.",
          "Incorrect. Emissions factors must strictly follow IPCC and GHG Protocol standards."
        ],
        "practicalTakeaway": "Build standardized monthly evidence capture workflows and audit high-impact utility accounts.",
        "learningOutcome": "Execute 30-day ESG data governance action plan",
        "competencyArea": "COMP_REPORTING"
      }
    ]
  },
  {
    "courseCode": "ELH-24",
    "title": "Sustainability for Human Resources Teams",
    "slug": "sustainability-for-hr-teams",
    "description": "Drive green onboarding, sustainable commuting policies, OSHA 2005 contractor safety duties, workplace heat stress adaptation, and employee ESG engagement.",
    "fullDescription": "Sustainability for Human Resources Teams bridges people operations with corporate ESG strategy. Learn how HR professionals design green employee value propositions, implement sustainable commuting incentives to reduce Scope 3 transport emissions, comply with statutory employer duty of care for contractors under OSHA 2005 Section 5, safeguard frontline workers against climate heat stress, and foster a purpose-driven workplace culture that attracts top talent.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D2 Working Knowledge",
    "passingScore": 75,
    "primaryCompetency": "COMP_SOCIAL_COMMUNITY",
    "secondaryCompetencies": [
      "COMP_GOVERNANCE_ETHICS",
      "COMP_GHG"
    ],
    "learningObjectives": [
      "Integrate sustainability into employee onboarding, performance appraisals, and career development.",
      "Design multimodal sustainable commuting policies to reduce employee Scope 3 transportation carbon footprint.",
      "Ensure compliance with statutory employer duties under Section 5 of OSHA 2005 extending to on-site contractors.",
      "Implement occupational heat stress and extreme weather safety protocols for frontline personnel."
    ],
    "intendedRoles": [
      "HR Directors",
      "Talent Acquisition Leads",
      "People Operations Specialists",
      "HSE Managers"
    ],
    "badgeName": "Sustainable People Leader",
    "badgeDescription": "Demonstrated competence in green talent management, OSHA 2005 contractor safety, and workplace climate adaptation.",
    "completionMessage": "Congratulations! You have completed Sustainability for Human Resources Teams and are prepared to champion people-centric ESG excellence.",
    "recommendedNextCourseCode": "ELH-28",
    "lessons": [
      {
        "title": "1. Green Talent Management & Onboarding",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Embedding sustainability values into recruitment, employee onboarding, and performance metrics.",
        "contentBlocks": [
          {
            "id": "elh24-h1",
            "type": "heading",
            "level": 3,
            "text": "Aligning People Operations with Corporate Purpose"
          },
          {
            "id": "elh24-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "Top talent increasingly chooses employers with authentic ESG commitments. Modern HR teams integrate sustainability into the entire employee lifecycle: (1) Showcasing verified sustainability achievements in recruitment branding; (2) Including a mandatory 30-minute sustainability module in Day-1 onboarding; and (3) Embedding specific, measurable sustainability KPIs into annual departmental performance appraisals."
          },
          {
            "id": "elh24-c1",
            "type": "callout",
            "variant": "info",
            "title": "Employee Retention",
            "bodyText": "Companies with strong ESG culture experience up to 25% lower voluntary employee turnover and higher cross-functional collaboration."
          }
        ]
      },
      {
        "title": "2. Contractor Safety & OSHA 2005 Statutory Duty of Care",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Ensuring legal compliance and health safety protections for outsourced workers under Mauritian labor law.",
        "contentBlocks": [
          {
            "id": "elh24-h2",
            "type": "heading",
            "level": 3,
            "text": "Statutory Duty of Care for Outsourced Personnel"
          },
          {
            "id": "elh24-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "Under Section 5 of the Mauritius Occupational Safety and Health Act 2005 (OSHA 2005), an employer's statutory duty of care extends to all persons on the premises, including outsourced security, cleaning, and maintenance contractors. HR and safety teams must ensure that third-party workers receive identical personal protective equipment (PPE), safety briefings, sanitary facilities, and emergency evacuation training as permanent employees."
          },
          {
            "id": "elh24-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Legal Mandate",
            "bodyText": "Never treat outsourced personnel as second-tier workers; OSHA 2005 legally holds premises operators accountable for contractor health and safety."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Managing Extreme Workplace Heat Stress",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Protect frontline warehouse and outdoor maintenance workers during extreme summer temperature spikes.",
        "contentBlocks": [
          {
            "id": "elh24-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Summer Heat Wave in the Logistics Yard",
            "prompt": "Ambient temperatures reach 34\u00b0C with 80% relative humidity in an un-airconditioned logistics warehouse. Two forklift drivers report dizziness and severe fatigue. The operations manager wants them to continue working overtime to meet container export deadlines. What is your HR decision?",
            "options": [
              {
                "id": "opt_a",
                "text": "Tell the workers to drink an energy drink and push through the shift to ensure the export deadline is met.",
                "consequence": "Dangerous failure. A worker suffers severe heat stroke, collapses, and is hospitalized. The company faces immediate investigation and prosecution under OSHA 2005 for gross negligence.",
                "feedback": "Ignoring heat stress symptoms leads to medical emergencies and severe legal liability under OSHA 2005.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Trigger the Extreme Heat Protocol immediately: mandate 15-minute shaded rest breaks every hour, provide electrolyte hydration, adjust shift hours to early morning, and deploy high-volume industrial misting fans.",
                "consequence": "Optimal outcome. You prevent heat-related illness, protect worker life safety, ensure legal compliance, and maintain productive operations without incidents.",
                "feedback": "Correct! Prioritizing worker safety through hydration, shaded breaks, and shift rescheduling is legally required and operationally sound.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Designing a Sustainable Commuting Policy",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Structure employee commuting incentives to cut Scope 3 transport emissions and ease congestion.",
        "contentBlocks": [
          {
            "id": "elh24-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Managing Office Parking Congestion & Scope 3 Emissions",
            "prompt": "Your corporate headquarters in Ebene suffers from severe parking shortages, with 85% of employees driving solo in private cars. Management plans to spend Rs 4 million leasing additional tarmac parking spaces. As HR Director, what alternative do you propose?",
            "options": [
              {
                "id": "opt_a",
                "text": "Approve leasing the additional tarmac parking spaces and subsidize private car fuel for all staff.",
                "consequence": "High cost and high emissions. Encourages more single-occupancy driving, increases corporate Scope 3 carbon footprint, and worsens traffic congestion.",
                "feedback": "Subsidizing private car travel increases carbon emissions and locks the company into recurring parking lease costs.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Reallocate the budget to fund monthly Metro Express / public bus transit passes, provide priority reserved parking for registered carpools, and install secure bicycle racks and EV chargers.",
                "consequence": "Optimal outcome. Cuts solo car trips by 35%, lowers employee commuting stress, slashes Scope 3 transport emissions, and saves significant corporate capital.",
                "feedback": "Excellent! Multimodal transit incentives and carpool support provide cost-effective mobility while drastically lowering carbon emissions.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Sustainable Workplace Policy Audit",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Integrate green practices into employee handbooks and health wellness programs.",
        "contentBlocks": [
          {
            "id": "elh24-h3",
            "type": "heading",
            "level": 3,
            "text": "Your HR Sustainability Roadmap"
          },
          {
            "id": "elh24-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Execute three key initiatives: (1) Conduct an annual employee commuting survey to calculate Scope 3 transport emissions; (2) Implement a Heat Stress Protocol (mandatory hydration breaks, shaded rest zones) for outdoor and warehouse personnel during summer peak temperatures; and (3) Introduce green volunteering leave days to support local community restoration."
          },
          {
            "id": "elh24-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Review your company's new-hire onboarding deck and incorporate a mandatory 15-minute sustainability orientation module this month."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "Under Section 5 of the Mauritius Occupational Safety and Health Act 2005 (OSHA 2005), what is an employer's legal duty toward third-party contractors working on company premises?",
        "options": [
          "Employers have zero responsibility for contractor safety under any circumstances.",
          "Employers must ensure, so far as is reasonably practicable, that persons not in their employment (including contractors and visitors) who may be affected are not exposed to risks to their safety or health.",
          "Employers are only responsible for contractors if they speak French.",
          "Employers must pay contractor income taxes directly."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "OSHA 2005 Section 5 mandates that premises operators maintain safe systems of work and protect non-employees (contractors, maintenance crews, visitors) from health and safety hazards.",
        "incorrectExplanation": "OSHA 2005 establishes a clear statutory duty of care extending to all contractors, visitors, and non-employees on the premises.",
        "optionFeedback": [
          "Incorrect. Employers carry clear statutory safety responsibilities for everyone on their premises under OSHA 2005.",
          "Correct! OSHA 2005 Section 5 explicitly obligates employers to protect non-employees (contractors, visitors) from safety and health risks on company premises.",
          "Incorrect. Safety legislation applies universally regardless of language.",
          "Incorrect. Tax administration is governed by the Mauritius Revenue Authority (MRA), not OSHA 2005."
        ],
        "practicalTakeaway": "Audit contractor safety compliance and ensure all on-site vendors adhere to OSHA 2005 standards.",
        "learningOutcome": "Apply statutory employer duty of care under OSHA 2005",
        "competencyArea": "COMP_SOCIAL_COMMUNITY"
      },
      {
        "question": "How does integrating sustainability into employee onboarding benefit corporate culture and talent retention?",
        "options": [
          "It discourages new employees from asking questions.",
          "It establishes clear organizational values from Day 1, aligns new hires with ESG goals, and boosts engagement, particularly among modern purpose-driven professionals.",
          "It increases the length of the probationary period by 6 months.",
          "It eliminates the need to pay competitive salaries."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Green onboarding instills sustainable behaviors immediately, fosters employee pride, and improves long-term retention by demonstrating genuine corporate values.",
        "incorrectExplanation": "Green onboarding establishes clear cultural expectations and strengthens employee engagement and retention.",
        "optionFeedback": [
          "Incorrect. Orientation programs encourage collaboration and proactive communication.",
          "Correct! Day-1 sustainability orientation aligns employees with corporate ESG commitments and significantly enhances workplace engagement.",
          "Incorrect. Onboarding covers cultural alignment without extending legal probation terms.",
          "Incorrect. Sustainability complements, rather than replaces, fair remuneration."
        ],
        "practicalTakeaway": "Include a dedicated green orientation module in all new-hire training programs.",
        "learningOutcome": "Integrate sustainability principles into employee onboarding",
        "competencyArea": "COMP_SOCIAL_COMMUNITY"
      },
      {
        "question": "What is the most effective corporate HR strategy to reduce Scope 3 employee commuting carbon emissions?",
        "options": [
          "Purchasing private sports cars for all employees.",
          "Implementing a multimodal commuting policy: subsidizing public transit (Metro Express/bus), offering priority carpool parking, providing secure bike storage, and facilitating remote/hybrid work.",
          "Mandating that all employees live inside the office building.",
          "Banning employees from leaving their desks."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Multimodal transit programs reduce solo driving trips, lowering employee transportation emissions while reducing company parking infrastructure expenses.",
        "incorrectExplanation": "Multimodal commuting incentives and hybrid work directly reduce employee transport carbon footprint.",
        "optionFeedback": [
          "Incorrect. Encouraging private combustion vehicles increases transport emissions.",
          "Correct! Combining public transit subsidies, carpooling incentives, cycling amenities, and hybrid work drastically lowers commuting emissions.",
          "Incorrect. Coercive residential mandates violate labor rights.",
          "Incorrect. Restricting movement is unethical and unlawful."
        ],
        "practicalTakeaway": "Survey employee commuting patterns annually and offer public transit and carpool incentives.",
        "learningOutcome": "Design sustainable commuting and mobility programs",
        "competencyArea": "COMP_SOCIAL_COMMUNITY"
      },
      {
        "question": "Why are workplace heat stress protocols essential for occupational health in Mauritius during summer peak months?",
        "options": [
          "Because heat makes computers run too cold.",
          "High ambient temperatures combined with high tropical humidity impair the human body's evaporative cooling, leading to heat exhaustion, heat stroke, and severe safety incidents if unmanaged.",
          "Because winter coats look fashionable in summer.",
          "Heat stress only affects polar bears."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Tropical humidity severely limits sweat evaporation; structured hydration breaks, shaded recovery zones, and ventilation are life-critical for outdoor and warehouse staff.",
        "incorrectExplanation": "High temperature and humidity create severe heat illness risks requiring mandatory hydration and rest protocols.",
        "optionFeedback": [
          "Incorrect. Electronic hardware requires cooling, but human biological safety is paramount.",
          "Correct! High heat and humidity prevent sweat evaporation, creating lethal heat stroke risks for frontline workers without mandatory shade and hydration breaks.",
          "Incorrect. Inappropriate clothing accelerates heat exhaustion.",
          "Incorrect. Human physiology is highly vulnerable to thermal heat strain."
        ],
        "practicalTakeaway": "Implement mandatory shaded rest and electrolyte hydration schedules for outdoor teams in summer.",
        "learningOutcome": "Implement occupational heat stress safety protocols",
        "competencyArea": "COMP_SOCIAL_COMMUNITY"
      },
      {
        "question": "How can HR integrate sustainability into annual employee performance appraisals?",
        "options": [
          "By deducting salary if an employee prints a single page.",
          "By establishing clear, job-relevant ESG goals (e.g. reducing scrap, organizing carpools, leading green projects) and tying achievements to formal recognition and development.",
          "By replacing performance reviews with tree planting.",
          "By ignoring sustainability entirely."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Embedding relevant ESG targets into standard appraisals aligns personal accountability with corporate environmental and social commitments.",
        "incorrectExplanation": "Role-specific ESG performance objectives align individual accountability with organizational sustainability goals.",
        "optionFeedback": [
          "Incorrect. Punitive financial penalties destroy morale and engagement.",
          "Correct! Role-specific, achievable ESG goals linked to recognition ensure employees actively contribute to corporate sustainability objectives.",
          "Incorrect. Structured performance appraisals remain vital for career governance.",
          "Incorrect. Omitting ESG targets disconnects employees from corporate strategy."
        ],
        "practicalTakeaway": "Include at least one job-relevant sustainability objective in every employee's annual performance plan.",
        "learningOutcome": "Embed sustainability KPIs into employee performance management",
        "competencyArea": "COMP_SOCIAL_COMMUNITY"
      },
      {
        "question": "What is 'Green Volunteering Leave' in corporate social responsibility (CSR) programs?",
        "options": [
          "Forced unpaid labor on weekends.",
          "Paid leave granted to employees to participate in verified community environmental projects (e.g. mangrove restoration, beach clean-ups, educational outreach).",
          "Vacation time taken to play golf.",
          "Sick leave taken without a doctor's certificate."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Paid volunteering leave empowers employees to give back to local ecosystems, strengthening community relations and boosting internal engagement.",
        "incorrectExplanation": "Paid volunteer leave allows employees to dedicate company-supported time to environmental restoration.",
        "optionFeedback": [
          "Incorrect. CSR volunteering is voluntary and paid by the employer.",
          "Correct! Providing paid volunteer time encourages employees to actively restore local ecosystems and engage with community stakeholders.",
          "Incorrect. CSR leave is reserved for verified social and environmental contributions.",
          "Incorrect. Medical leave follows statutory health certification rules."
        ],
        "practicalTakeaway": "Establish a policy offering 1\u20132 paid CSR volunteering days annually per employee.",
        "learningOutcome": "Structure corporate community environmental engagement",
        "competencyArea": "COMP_SOCIAL_COMMUNITY"
      },
      {
        "question": "Why should HR collaborate closely with Facilities and HSE teams on corporate sustainability?",
        "options": [
          "To combine departmental holiday party budgets.",
          "Because human behavior, workplace environmental conditions, and safety compliance are deeply interconnected; successful sustainability requires unified policy, training, and physical infrastructure.",
          "To eliminate the HR department entirely.",
          "To prevent employees from reporting maintenance issues."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Cross-functional synergy ensures that policies created by HR are enabled by physical facility infrastructure and enforced through HSE safety standards.",
        "incorrectExplanation": "Interdisciplinary alignment between HR, Facilities, and HSE creates cohesive policies and safe work environments.",
        "optionFeedback": [
          "Incorrect. Collaboration focuses on operational and cultural alignment.",
          "Correct! Integrating people policies (HR), physical infrastructure (Facilities), and safety governance (HSE) ensures seamless sustainability execution.",
          "Incorrect. Cross-functional collaboration strengthens all involved departments.",
          "Incorrect. Transparent reporting is essential for risk management."
        ],
        "practicalTakeaway": "Form a joint HR-Facilities-HSE working group to coordinate workplace sustainability and wellbeing.",
        "learningOutcome": "Foster cross-functional collaboration across HR, HSE, and Facilities",
        "competencyArea": "COMP_SOCIAL_COMMUNITY"
      },
      {
        "question": "Which of the following represents an effective 30-day action commitment for an HR professional?",
        "options": [
          "Banning all employees from using public transportation.",
          "Auditing new-hire orientation to embed a dedicated sustainability module and establishing an OSHA 2005 contractor safety review process with HSE.",
          "Canceling employee health and safety training.",
          "Refusing to track employee commuting emissions."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Updating onboarding and auditing contractor safety practices embeds sustainability and legal compliance into core HR routines.",
        "incorrectExplanation": "Upgrading onboarding and reviewing contractor safety embeds sustainable human resource governance.",
        "optionFeedback": [
          "Incorrect. Public transit should be actively encouraged and subsidized.",
          "Correct! Embedding sustainability into new-hire onboarding and verifying contractor safety under OSHA 2005 establishes immediate, lasting impact.",
          "Incorrect. Canceling training violates statutory safety regulations.",
          "Incorrect. Commuting data is essential for Scope 3 emissions reporting."
        ],
        "practicalTakeaway": "Incorporate sustainability into onboarding decks and audit contractor safety protocols this month.",
        "learningOutcome": "Execute 30-day HR sustainability action plan",
        "competencyArea": "COMP_SOCIAL_COMMUNITY"
      }
    ]
  },
  {
    "courseCode": "ELH-25",
    "title": "Sustainability for Finance & Accounting Teams",
    "slug": "sustainability-for-finance-teams",
    "description": "Master Green CAPEX vs OPEX accounting, Discounted Cash Flow with carbon and utility escalation, Bank of Mauritius Sustainable Bond guidelines, and ESG risk valuation.",
    "fullDescription": "Sustainability for Finance & Accounting Teams equips financial controllers, management accountants, and investment analysts to integrate environmental criteria into capital allocation and financial governance. Master the financial appraisal of energy efficiency and solar PV projects using Discounted Cash Flow (DCF), Internal Rate of Return (IRR), and utility price escalation. Learn to navigate the Bank of Mauritius Guide for the Issue of Sustainable Bonds (June 2021), tag Green CAPEX vs Green OPEX in the general ledger, and calculate carbon pricing liabilities.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D2 Working Knowledge",
    "passingScore": 75,
    "primaryCompetency": "COMP_SUSTAINABILITY_FOUNDATIONS",
    "secondaryCompetencies": [
      "COMP_REPORTING",
      "COMP_GOVERNANCE_ETHICS"
    ],
    "learningObjectives": [
      "Differentiate and account for Green Capital Expenditure (CAPEX) vs Green Operational Expenditure (OPEX).",
      "Apply Discounted Cash Flow (DCF) and net present value (NPV) modeling to renewable energy and efficiency investments with utility escalation.",
      "Navigate eligibility criteria and use of proceeds under the Bank of Mauritius Guide for the Issue of Sustainable Bonds (June 2021).",
      "Assess financial exposure to carbon pricing, transition risks, and climate insurance liabilities."
    ],
    "intendedRoles": [
      "Financial Controllers",
      "Management Accountants",
      "Investment Analysts",
      "CFOs",
      "Finance Managers"
    ],
    "badgeName": "Sustainable Finance Specialist",
    "badgeDescription": "Demonstrated competence in green capital budgeting, DCF valuation, and sustainable bond compliance.",
    "completionMessage": "Congratulations! You have completed Sustainability for Finance & Accounting Teams and are equipped to drive sustainable capital allocation.",
    "recommendedNextCourseCode": "ELH-18",
    "lessons": [
      {
        "title": "1. Green CAPEX vs Green OPEX & Taxonomy Tagging",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Structuring chart-of-accounts and general ledger tagging to capture sustainable investments transparently.",
        "contentBlocks": [
          {
            "id": "elh25-h1",
            "type": "heading",
            "level": 3,
            "text": "Capital Allocation for the Low-Carbon Transition"
          },
          {
            "id": "elh25-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "Investors and regulators require precise disclosure of how much capital is deployed toward environmental transformation. Finance teams must categorize expenditures into: (1) **Green CAPEX**: long-term capitalized investments (rooftop solar PV arrays, high-efficiency magnetic-bearing chillers, electric delivery vans, rainwater harvesting tanks); and (2) **Green OPEX**: operational expenses supporting sustainability (solar maintenance contracts, waste recycling processing fees, ESG audit fees, sustainability training)."
          },
          {
            "id": "elh25-c1",
            "type": "callout",
            "variant": "info",
            "title": "GL Tagging",
            "bodyText": "Tagging green accounts in ERP systems enables instant export of EU Taxonomy-aligned or SEMSI sustainability financial metrics."
          }
        ]
      },
      {
        "title": "2. Bank of Mauritius Sustainable Bond Framework & Green Financing",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Accessing preferential green capital and issuing sustainable debt instruments in Mauritius.",
        "contentBlocks": [
          {
            "id": "elh25-h2",
            "type": "heading",
            "level": 3,
            "text": "Unlocking Green Financing and Bond Issuance"
          },
          {
            "id": "elh25-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "The Bank of Mauritius Guide for the Issue of Sustainable Bonds in Mauritius (June 2021) establishes clear eligibility criteria for green financing: renewable energy generation, energy efficiency retrofits, green buildings, circular economy projects, and sustainable water management. Issuers must establish a transparent Green Bond Framework, maintain ring-fenced escrow accounts for use of proceeds, provide independent Second-Party Opinions (SPO), and publish annual allocation and impact reports."
          },
          {
            "id": "elh25-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Financing Advantage",
            "bodyText": "Sustainable bonds and sustainability-linked loans (SLLs) frequently offer margin discounts (5\u201315 bps) when audited ESG milestones are achieved."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Evaluating a Rooftop Solar PV Business Case",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Evaluate a 100 kWp solar PV capital expenditure proposal using Discounted Cash Flow and electricity escalation modeling.",
        "contentBlocks": [
          {
            "id": "elh25-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Appraising a Rs 4.5M Rooftop Solar Investment",
            "prompt": "Engineering proposes a 100 kWp rooftop solar PV array costing Rs 4.5 million. The simple payback is 5.2 years. A junior accountant recommends rejecting it because the company's hurdle rate requires a 3-year payback for general capital. How do you evaluate the project?",
            "options": [
              {
                "id": "opt_a",
                "text": "Reject the project strictly based on the arbitrary 3-year simple payback threshold.",
                "consequence": "Missed financial opportunity. Leaves the company exposed to rising commercial electricity tariffs and misses guaranteed 25-year cash flows with an IRR exceeding 18%.",
                "feedback": "Using simple payback ignores the multi-decade cash flows and hedge against electricity tariff escalation.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Model a comprehensive 20-year Discounted Cash Flow (DCF) with a conservative 4% annual CEB utility tariff escalation and green tax depreciation benefits.",
                "consequence": "Optimal outcome. DCF reveals a Net Present Value (NPV) of +Rs 6.2 million and an IRR of 19.4%, proving the project creates massive shareholder value and hedging power.",
                "feedback": "Correct! DCF modeling with utility escalation and tax depreciation reflects true project economic value.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Structuring a Sustainability-Linked Loan (SLL)",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Negotiate ESG Key Performance Indicators in a commercial banking credit facility.",
        "contentBlocks": [
          {
            "id": "elh25-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Refinancing Corporate Debt with an SLL Facility",
            "prompt": "Your bank offers a 10-basis-point interest discount on a Rs 100 million credit facility if the company commits to two sustainability KPIs. Which KPI package do you agree to embed in the loan covenant?",
            "options": [
              {
                "id": "opt_a",
                "text": "Commit to vague qualitative promises like 'improving eco-friendliness' without measurable metrics or third-party audit requirements.",
                "consequence": "Loan rejection. Commercial banks reject unquantifiable promises under the LMA/APLMA Sustainability-Linked Loan Principles.",
                "feedback": "Sustainability-Linked Loans require audited, quantitative, science-based performance targets.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Agree to two auditable, core operational targets: (1) Reduce Scope 1 & 2 carbon intensity per revenue unit by 25% over 3 years; and (2) Achieve 70% landfill waste diversion verified by annual third-party assurance.",
                "consequence": "Optimal outcome. You secure the 10 bps margin discount (saving Rs 100,000/yr in interest), align finance with operational decarbonization, and build credit reputation.",
                "feedback": "Excellent! Clear, audited, and material KPIs satisfy international loan standards and reduce borrowing costs.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Capital Appraisal Policy Modernization",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Update your corporate CAPEX evaluation template to include DCF and sustainability criteria.",
        "contentBlocks": [
          {
            "id": "elh25-h3",
            "type": "heading",
            "level": 3,
            "text": "Modernizing Corporate Capital Appraisal"
          },
          {
            "id": "elh25-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Revise the company's standard CAPEX requisition template: (1) Replace simple payback with 10-to-20 year DCF and NPV analysis; (2) Incorporate standard 4% annual utility tariff inflation for energy/water projects; (3) Include internal carbon shadow pricing (e.g. $40/tonne CO2e); and (4) Add Green CAPEX tracking codes to chart-of-accounts."
          },
          {
            "id": "elh25-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Update your department's standard CAPEX financial approval template to require DCF and utility escalation modeling this month."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "Why is simple payback period considered an inadequate financial appraisal method for long-life sustainability investments like solar PV or chiller retrofits?",
        "options": [
          "Simple payback only works in Leap Years.",
          "Simple payback ignores all cash flows generated after the payback year, fails to account for the time value of money (discount rate), and ignores future utility tariff escalation.",
          "Simple payback requires calculating the speed of light.",
          "Payback calculations are illegal under accounting law."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "Simple payback truncates project evaluation at the breakeven year, completely missing 15 to 20 years of lucrative positive cash flows from durable clean energy assets.",
        "incorrectExplanation": "Simple payback ignores the time value of money, post-payback cash flows, and utility tariff inflation.",
        "optionFeedback": [
          "Incorrect. Simple payback is a calendar-agnostic mathematical formula.",
          "Correct! Simple payback ignores the time value of money and discards all long-term cash flows generated across the asset's 20\u201325 year operating life.",
          "Incorrect. Financial appraisal models economic cash flows, not physics constants.",
          "Incorrect. Simple payback is legally permitted but pedagogically and financially inferior to DCF."
        ],
        "practicalTakeaway": "Always use Discounted Cash Flow (NPV and IRR) rather than simple payback to appraise long-term clean tech assets.",
        "learningOutcome": "Apply Discounted Cash Flow over simple payback for clean tech",
        "competencyArea": "COMP_SUSTAINABILITY_FOUNDATIONS"
      },
      {
        "question": "What is 'Green Capital Expenditure' (Green CAPEX) in corporate financial accounting?",
        "options": [
          "Money spent on buying green pens and green sticky notes.",
          "Capitalized investments in long-term physical assets that contribute materially to environmental sustainability, climate mitigation, or resource efficiency (e.g. solar panels, electric vehicles, wastewater treatment plants).",
          "Bribes paid to environmental inspectors.",
          "The cost of printing annual financial statements on green paper."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Green CAPEX represents balance-sheet asset additions that decarbonize operations or build physical climate resilience over multi-year depreciation schedules.",
        "incorrectExplanation": "Green CAPEX represents capitalized physical balance-sheet investments that drive environmental transformation.",
        "optionFeedback": [
          "Incorrect. Minor office stationery is recorded under operational expenses.",
          "Correct! Green CAPEX represents balance-sheet capital investments in physical assets (solar arrays, EV fleets, high-efficiency equipment) that decarbonize the business.",
          "Incorrect. Bribes are illegal under the Financial Crimes Commission Act 2023.",
          "Incorrect. Printing costs are operational administrative overheads."
        ],
        "practicalTakeaway": "Create dedicated Green CAPEX asset classes in your ERP fixed asset register.",
        "learningOutcome": "Classify and account for Green CAPEX in financial ledgers",
        "competencyArea": "COMP_SUSTAINABILITY_FOUNDATIONS"
      },
      {
        "question": "Under the Bank of Mauritius Guide for the Issue of Sustainable Bonds (June 2021), what is a mandatory requirement regarding the use of proceeds?",
        "options": [
          "Proceeds must be used to purchase lottery tickets.",
          "Proceeds must be credited to a dedicated sub-account or tracked in a formal register, and exclusively allocated to eligible green or social project categories verified by transparent reporting.",
          "Proceeds can be used for general unallocated corporate overhead without tracking.",
          "Proceeds must be spent entirely within 24 hours of issuance."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "The Bank of Mauritius framework requires strict ring-fencing, dedicated sub-account tracking, and external verification to ensure green bond funds are deployed solely to eligible projects.",
        "incorrectExplanation": "The Bank of Mauritius framework mandates ring-fenced tracking and exclusive allocation to verified eligible green/social categories.",
        "optionFeedback": [
          "Incorrect. Central bank guidelines prohibit speculative gambling.",
          "Correct! The Bank of Mauritius framework mandates ring-fenced escrow tracking, exclusive allocation to eligible green/social categories, and audited impact reporting.",
          "Incorrect. Commingling bond proceeds with general unallocated overhead breaches bond covenants.",
          "Incorrect. Allocation occurs over structured multi-year project deployment schedules."
        ],
        "practicalTakeaway": "Establish ring-fenced sub-accounts and clear audit trails for sustainable bond proceeds.",
        "learningOutcome": "Comply with Bank of Mauritius Sustainable Bond guidelines",
        "competencyArea": "COMP_SUSTAINABILITY_FOUNDATIONS"
      },
      {
        "question": "What is an 'Internal Shadow Carbon Price' in corporate capital budgeting?",
        "options": [
          "A secret tax paid to criminals at night.",
          "A theoretical monetary cost per tonne of CO2e (e.g. $40\u2013$75/tonne) assigned to a project's projected carbon footprint to evaluate transition risk and incentivize low-carbon alternatives.",
          "The price of charcoal sold in supermarkets.",
          "A discount applied to dirty diesel fuel."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Shadow carbon pricing acts as a financial stress-test, penalizing carbon-intensive projects in investment models ahead of statutory carbon taxation.",
        "incorrectExplanation": "Shadow carbon pricing assigns a financial cost to carbon emissions in DCF models to favor low-carbon investments.",
        "optionFeedback": [
          "Incorrect. Shadow pricing is a recognized corporate financial risk management methodology.",
          "Correct! Shadow carbon pricing incorporates a hypothetical dollar cost per tonne of emissions into financial models, rewarding low-carbon assets before carbon taxes become mandatory.",
          "Incorrect. Shadow pricing evaluates greenhouse gas emissions, not physical fuel commodities.",
          "Incorrect. Shadow pricing penalizes high-carbon fuels, not subsidizes them."
        ],
        "practicalTakeaway": "Incorporate a shadow carbon price into major project DCF models to future-proof investments.",
        "learningOutcome": "Apply internal shadow carbon pricing in financial appraisals",
        "competencyArea": "COMP_SUSTAINABILITY_FOUNDATIONS"
      },
      {
        "question": "How does a 'Sustainability-Linked Loan' (SLL) differ from a traditional green loan?",
        "options": [
          "SLLs can only be borrowed by organic farms.",
          "Traditional green loans fund specific ring-fenced eligible assets; SLLs are general corporate purpose loans where the interest rate margin fluctuates based on whether the company achieves predefined corporate-wide ESG KPIs.",
          "SLLs do not require repayment of the principal amount.",
          "There is no difference between the two instruments."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Green loans are activity-based (asset-specific), whereas Sustainability-Linked Loans are entity-based, tying interest pricing to broad corporate ESG targets.",
        "incorrectExplanation": "SLLs tie interest rate margins to corporate ESG performance targets, whereas green loans finance specific assets.",
        "optionFeedback": [
          "Incorrect. SLLs are used across all commercial sectors, including banking, hospitality, and manufacturing.",
          "Correct! Unlike asset-specific green loans, SLLs provide general funding where borrowing margins decrease as the company meets pre-agreed corporate ESG milestones.",
          "Incorrect. SLLs are formal debt instruments requiring full principal and interest servicing.",
          "Incorrect. Distinguishing use-of-proceeds vs sustainability-linked debt is fundamental to modern finance."
        ],
        "practicalTakeaway": "Evaluate Sustainability-Linked Loan options to reduce borrowing costs through corporate ESG achievement.",
        "learningOutcome": "Distinguish Green Loans from Sustainability-Linked Loans (SLLs)",
        "competencyArea": "COMP_SUSTAINABILITY_FOUNDATIONS"
      },
      {
        "question": "What is the difference between 'Green CAPEX' and 'Green OPEX' in corporate sustainability financial reporting?",
        "options": [
          "Green CAPEX is fake; Green OPEX is real.",
          "Green CAPEX represents capitalized physical balance sheet investments in long-term decarbonization assets; Green OPEX represents operational expenditure supporting daily environmental management, audits, and maintenance.",
          "Green CAPEX only applies to government departments.",
          "Green OPEX is always zero."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "CAPEX funds long-term depreciable balance-sheet assets; OPEX represents profit-and-loss expenses supporting operational resource efficiency.",
        "incorrectExplanation": "Green CAPEX represents capitalized assets, while Green OPEX covers operational resource management costs.",
        "optionFeedback": [
          "Incorrect. Both terms refer to rigorous capital and operational accounting classifications.",
          "Correct! Green CAPEX funds long-term depreciable physical sustainability assets; Green OPEX covers ongoing operational resource management expenses.",
          "Incorrect. Both classifications are standard corporate accounting practices.",
          "Incorrect. Distinguishing capital from operational expenditure is fundamental to accounting standards."
        ],
        "practicalTakeaway": "Tag sustainability expenditures accurately in the general ledger as either Green CAPEX or Green OPEX.",
        "learningOutcome": "Distinguish and categorize Green CAPEX vs Green OPEX",
        "competencyArea": "COMP_SUSTAINABILITY_FOUNDATIONS"
      },
      {
        "question": "How does improving corporate sustainability performance impact a company's Cost of Capital (WACC)?",
        "options": [
          "It automatically doubles the cost of borrowing money.",
          "Robust ESG management reduces operational and regulatory risk, allowing companies to negotiate lower interest rates on debt and attract ESG-mandated equity investors.",
          "Banks refuse to lend money to sustainable companies.",
          "Sustainability has zero impact on financial markets."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Lower ESG risk profiles translate to lower perceived default risk by banks and credit agencies, unlocking green bond discounts and lower cost of equity.",
        "incorrectExplanation": "Lower ESG risk enables cheaper debt financing and attracts a broader pool of capital, reducing WACC.",
        "optionFeedback": [
          "Incorrect. Lower risk profiles decrease borrowing costs, not increase them.",
          "Correct! Strong ESG risk controls lower credit risk premiums, unlocking preferential interest rates and lowering overall Weighted Average Cost of Capital (WACC).",
          "Incorrect. Global and local banks actively incentivize verified sustainable borrowers.",
          "Incorrect. Capital markets increasingly tie financing terms directly to ESG metrics."
        ],
        "practicalTakeaway": "Leverage corporate ESG credentials to negotiate preferential sustainability-linked loan margins.",
        "learningOutcome": "Explain ESG impact on corporate cost of capital",
        "competencyArea": "COMP_SUSTAINABILITY_FOUNDATIONS"
      },
      {
        "question": "Which of the following represents an effective 30-day action commitment for a finance manager?",
        "options": [
          "Deleting all electricity and water cost centers from the accounting system.",
          "Setting up dedicated Green CAPEX/OPEX general ledger tracking codes and requiring DCF/NPV modeling with utility escalation for all major equipment proposals.",
          "Refusing to approve any capital expenditure under any circumstances.",
          "Ignoring utility bills until service is disconnected."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Establishing green ledger tracking and modernizing capital appraisal policies institutionalizes sustainable financial decision-making.",
        "incorrectExplanation": "Setting up green ledger codes and mandating DCF models establishes sound sustainable financial governance.",
        "optionFeedback": [
          "Incorrect. Utility cost tracking is vital for financial control.",
          "Correct! Implementing green GL tracking codes and upgrading capital appraisal to include DCF and utility escalation embeds sustainable financial leadership.",
          "Incorrect. Productive capital investment is necessary for business continuity and efficiency.",
          "Incorrect. Ignoring utility bills causes severe operational disruption."
        ],
        "practicalTakeaway": "Upgrade your department's capital expenditure appraisal guidelines to include DCF and green classification.",
        "learningOutcome": "Execute 30-day sustainable finance action plan",
        "competencyArea": "COMP_SUSTAINABILITY_FOUNDATIONS"
      }
    ]
  },
  {
    "courseCode": "ELH-26",
    "title": "Sustainability for Procurement and Purchasing Teams",
    "slug": "sustainability-for-procurement-teams",
    "description": "Master supplier ESG scorecards, RFP weighting, ISO 20400 sustainable procurement guidance, contractual audit covenants, and supply chain decarbonization.",
    "fullDescription": "Sustainability for Procurement and Purchasing Teams equips procurement managers, category buyers, and supply chain professionals to transform corporate purchasing into a powerful ESG lever. Master the integration of structured sustainability evaluation criteria into commercial RFP scorecards aligned with ISO 20400 sustainable procurement guidance, draft enforceable ESG contractual covenants, conduct risk-based supplier audits, and establish closed-loop circular packaging with major vendors.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D2 Working Knowledge",
    "passingScore": 75,
    "primaryCompetency": "COMP_SUPPLY_CHAIN",
    "secondaryCompetencies": [
      "COMP_GOVERNANCE_ETHICS",
      "COMP_CIRCULARITY"
    ],
    "learningObjectives": [
      "Integrate structured sustainability evaluation criteria into supplier Request for Proposals (RFPs) aligned with ISO 20400 guidance.",
      "Draft legally enforceable ESG clauses, audit inspection rights, and corrective action covenants in Master Service Agreements.",
      "Assess supply chain Scope 3 emissions, human rights risks, and environmental compliance across tier-1 suppliers.",
      "Establish circular returnable packaging and material take-back programs with strategic distributors."
    ],
    "intendedRoles": [
      "Procurement Managers",
      "Category Buyers",
      "Supply Chain Directors",
      "Vendor Relationship Leads"
    ],
    "badgeName": "Sustainable Procurement Leader",
    "badgeDescription": "Demonstrated competence in supplier ESG qualification, RFP scorecard weighting, and supply chain decarbonization.",
    "completionMessage": "Congratulations! You have completed Sustainability for Procurement and Purchasing Teams and are now certified to lead strategic sustainable supply chain management.",
    "recommendedNextCourseCode": "ELH-05",
    "lessons": [
      {
        "title": "1. Strategic Supply Chain Impact & Scope 3 Decarbonization",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Why upstream supply chains represent over 70% of corporate carbon footprints and how procurement controls Scope 3 emissions.",
        "contentBlocks": [
          {
            "id": "elh26-h1",
            "type": "heading",
            "level": 3,
            "text": "The Power of the Corporate Purchasing Budget"
          },
          {
            "id": "elh26-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "For most enterprises, upstream supply chain emissions (Scope 3 Category 1: Purchased Goods and Services) are 5 to 10 times larger than direct operational emissions (Scope 1 and 2). Traditional procurement focused narrowly on unit price, delivery speed, and payment terms. Modern sustainable procurement transforms purchasing power into a strategic lever to mandate supplier decarbonization, ethical labor standards, and circular product design."
          },
          {
            "id": "elh26-c1",
            "type": "callout",
            "variant": "info",
            "title": "Scope 3 Leverage",
            "bodyText": "You cannot achieve net-zero carbon or genuine ESG compliance without actively decarbonizing and auditing your upstream vendor supply base."
          }
        ]
      },
      {
        "title": "2. RFP Scorecards, Supplier Audits & Contractual ESG Clauses",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Embedding weighted sustainability criteria in tenders and securing legally binding audit rights in vendor contracts.",
        "contentBlocks": [
          {
            "id": "elh26-h2",
            "type": "heading",
            "level": 3,
            "text": "From Informal Questionnaires to Contractual Accountability"
          },
          {
            "id": "elh26-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "Under ISO 20400 (Sustainable Procurement \u2014 Guidance), sustainability considerations are integrated across procurement stages and evaluation criteria. While ISO 20400 provides guidance rather than prescribing mandatory fixed percentage thresholds, organizations establish proportional evaluation weighting (such as 10% to 20% depending on category risk and spend) alongside total cost of ownership and technical performance. Master Service Agreements (MSAs) must incorporate legally binding clauses: (1) Mandatory adherence to the Corporate Supplier Code of Conduct; (2) Right-to-audit physical premises and payroll records; and (3) Corrective Action Plans (CAP) with 30-day cure periods for non-compliance."
          },
          {
            "id": "elh26-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Procurement Rule",
            "bodyText": "Never rely on self-declared supplier survey checkmarks; mandate independent third-party audit certificates (ISO 14001, OSHA compliance, SEDEX SMETA)."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Managing an Environmental Breach at a Key Vendor",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Handle a serious environmental non-compliance discovered at your primary industrial supplier.",
        "contentBlocks": [
          {
            "id": "elh26-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Hazardous Effluent Runoff at Primary Packaging Supplier",
            "prompt": "During a routine vendor quality audit, your team discovers that your primary corrugated packaging supplier is discharging untreated chemical dye effluent directly into a nearby river canal. The vendor is your lowest-cost supplier. How do you respond?",
            "options": [
              {
                "id": "opt_a",
                "text": "Ignore the violation because the vendor's price is 15% lower than competitors and the pollution occurs outside your premises.",
                "consequence": "Catastrophic compliance and brand failure. Regulators and investigative journalists trace the toxic packaging supply chain to your brand, resulting in legal boycotts and severe reputation destruction.",
                "feedback": "Ignoring severe environmental violations by key suppliers breaches corporate duty of care and creates massive supply chain liability.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Issue an immediate Formal Breach Notice, trigger the 30-day Corrective Action Plan (CAP) requiring installation of certified effluent treatment, and reallocate volume to a compliant backup vendor if not cured.",
                "consequence": "Optimal outcome. You enforce contractual ESG covenants, drive physical environmental remediation, and insulate your enterprise from illicit supply chain pollution.",
                "feedback": "Correct! Strict contractual enforcement through Corrective Action Plans combined with backup supplier readiness protects corporate integrity and drives real-world remediation.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Returnable Transit Packaging (RTP)",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Negotiate a closed-loop reusable crate program with major logistics distributors.",
        "contentBlocks": [
          {
            "id": "elh26-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Eliminating Single-Use Pallet Stretch Wrap",
            "prompt": "Your central distribution warehouse consumes 5,000 kg of single-use plastic pallet shrink-wrap annually (costing Rs 450,000/yr). Your primary freight carrier proposes switching to heavy-duty reusable pallet straps and returnable collapsible plastic totes on a closed-loop deposit system. What is your commercial decision?",
            "options": [
              {
                "id": "opt_a",
                "text": "Reject the proposal because single-use plastic wrap is easy and requires no inventory tracking of returnable totes.",
                "consequence": "Wasteful and costly. Leaves the business paying Rs 450,000 annually for single-use plastic film destined for Mare Chicose landfill.",
                "feedback": "Failing to adopt returnable transit packaging locks the business into continuous plastic disposal costs.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Approve the Returnable Transit Packaging (RTP) agreement with a deposit system, integrating crate return tracking into standard shipping manifests.",
                "consequence": "Optimal outcome. Eliminates 5 tonnes of plastic film waste annually, reduces packaging procurement costs by 70% after Year 1, and establishes closed-loop logistics.",
                "feedback": "Excellent! Returnable transit packaging delivers massive circularity gains and significant multi-year financial savings.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Supplier ESG Scorecard Rollout",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Implement standard supplier sustainability evaluation across top spend categories.",
        "contentBlocks": [
          {
            "id": "elh26-h3",
            "type": "heading",
            "level": 3,
            "text": "Your Sustainable Procurement Roadmap"
          },
          {
            "id": "elh26-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Execute three key actions: (1) Update standard commercial tender templates to include structured sustainability scorecard criteria; (2) Require top 20 suppliers by spend to submit verified carbon and safety metrics; and (3) Incorporate right-to-audit ESG covenants into all expiring Master Service Agreements."
          },
          {
            "id": "elh26-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Incorporate a structured sustainability evaluation section into your department's standard RFP template this month."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "Under ISO 20400 (Sustainable Procurement \u2014 Guidance), how should organizations approach sustainability criteria in commercial procurement and tender evaluations?",
        "options": [
          "ISO 20400 strictly bans evaluating environmental criteria in commercial tenders.",
          "ISO 20400 provides guidance on integrating sustainability criteria into tender evaluations, where organizations determine appropriate scorecard weighting based on category risks, impacts, and total cost of ownership rather than a single universal mandatory percentage.",
          "ISO 20400 mandates that price and technical quality must be 100% ignored.",
          "ISO 20400 requires buyers to flip a coin to select suppliers."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "ISO 20400 is an international guidance standard that outlines how to integrate sustainability into procurement processes and scorecards proportionally, without imposing rigid universal percentage mandates.",
        "incorrectExplanation": "ISO 20400 provides flexible guidance on integrating sustainability into scorecards based on organizational context and category risk.",
        "optionFeedback": [
          "Incorrect. ISO 20400 explicitly guides organizations on embedding sustainability into procurement.",
          "Correct! ISO 20400 provides non-prescriptive guidance, enabling organizations to establish contextual scorecard weightings based on category risk, spend, and sustainability impacts.",
          "Incorrect. Total procurement evaluation balances sustainability, quality, and commercial cost.",
          "Incorrect. Supplier evaluation relies on structured objective evaluation criteria."
        ],
        "practicalTakeaway": "Use ISO 20400 guidance to tailor sustainability criteria and scorecards to your specific supply risk categories.",
        "learningOutcome": "Apply ISO 20400 sustainable procurement guidance in tenders",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "What is the purpose of a 'Right-to-Audit' clause in a Master Service Agreement (MSA) with a supplier?",
        "options": [
          "To let the buyer steal inventory from the supplier's warehouse.",
          "To grant the buyer the legal right to inspect supplier facilities, environmental controls, and payroll records to verify compliance with ESG and safety standards.",
          "To change the contract payment currency without consent.",
          "To require the supplier to work 24 hours a day."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Right-to-audit clauses enable buyers to verify compliance physically and legally, preventing suppliers from making unverified paper claims.",
        "incorrectExplanation": "Right-to-audit clauses allow buyers to inspect supplier facilities and records to verify ESG compliance.",
        "optionFeedback": [
          "Incorrect. Audits are formal inspection procedures, not inventory seizure.",
          "Correct! Right-to-audit clauses empower buyers to physically verify on-site environmental, labor, and safety compliance.",
          "Incorrect. Payment terms are governed by commercial billing clauses.",
          "Incorrect. Working hours must comply with statutory labor laws."
        ],
        "practicalTakeaway": "Include mandatory ESG Right-to-Audit covenants in all Master Service Agreements.",
        "learningOutcome": "Draft and enforce contractual ESG right-to-audit covenants",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "What is a 'Corrective Action Plan' (CAP) when a supplier fails an environmental or labor audit?",
        "options": [
          "An immediate permanent cancellation of all supplier contracts worldwide.",
          "A formal, time-bound remedial roadmap (typically 30 to 90 days) agreed between buyer and supplier to rectify specific audit non-conformances.",
          "A monetary fine paid directly to the procurement officer.",
          "A document stating that the violation never happened."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "CAPs focus on capacity-building and real-world remediation, giving suppliers a structured opportunity to fix violations before commercial disengagement.",
        "incorrectExplanation": "A Corrective Action Plan establishes a structured, time-bound remedial roadmap to cure audit non-conformances.",
        "optionFeedback": [
          "Incorrect. Instant termination without cure opportunity disrupts supply continuity.",
          "Correct! A CAP establishes clear milestones and timelines for suppliers to correct non-compliances under formal monitoring.",
          "Incorrect. Direct payments to individuals violate anti-bribery laws.",
          "Incorrect. CAPs document and resolve real non-compliances transparently."
        ],
        "practicalTakeaway": "Use time-bound Corrective Action Plans to remediate supplier ESG non-conformances.",
        "learningOutcome": "Implement supplier Corrective Action Plans and remediation",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "How does 'Returnable Transit Packaging' (RTP) reduce supply chain costs and environmental footprint?",
        "options": [
          "By throwing packaging into the ocean after delivery.",
          "By replacing single-use wooden pallets, cardboard boxes, and plastic stretch film with durable reusable totes and straps designed for hundreds of delivery loops.",
          "By eliminating packaging entirely so goods are shipped loose in open trucks.",
          "By burning packaging in the warehouse yard."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "RTP creates a closed-loop logistics loop where heavy-duty containers are reused indefinitely, eliminating single-use packaging procurement and landfill disposal costs.",
        "incorrectExplanation": "Returnable packaging replaces disposable transit materials with multi-trip containers, cutting waste and recurring costs.",
        "optionFeedback": [
          "Incorrect. Marine dumping causes ecological disaster and severe legal penalties.",
          "Correct! Reusable totes and straps eliminate continuous expenditure on disposable cardboard and plastic film while keeping materials out of Mare Chicose.",
          "Incorrect. Goods require physical protection during transit.",
          "Incorrect. Open burning produces toxic pollution and is illegal."
        ],
        "practicalTakeaway": "Negotiate returnable packaging protocols with high-volume local distributors.",
        "learningOutcome": "Implement Returnable Transit Packaging in supply chains",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "Why is supplier Scope 3 greenhouse gas data collection critical for large corporate procurement departments?",
        "options": [
          "To make supplier registration forms unnecessarily long.",
          "Purchased goods and services represent the vast majority of an enterprise's total carbon footprint; calculating and reducing Scope 3 emissions requires primary supplier emissions data.",
          "Scope 3 data is used to calculate property taxes.",
          "It eliminates the need for financial accounting."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Upstream supply chains typically represent 70% to 90% of corporate emissions; engaging suppliers on primary data is the only route to meaningful decarbonization.",
        "incorrectExplanation": "Scope 3 Purchased Goods and Services represent the majority of corporate footprint, requiring supplier data engagement.",
        "optionFeedback": [
          "Incorrect. Data collection serves essential regulatory and climate reduction goals.",
          "Correct! Because upstream supply chains account for over 70% of total corporate emissions, procuring lower-carbon goods and collecting supplier data is essential for net-zero goals.",
          "Incorrect. Carbon accounting is distinct from municipal property tax.",
          "Incorrect. Carbon accounting complements financial reporting."
        ],
        "practicalTakeaway": "Survey top 20 suppliers by spend to obtain Scope 1 and 2 emissions data.",
        "learningOutcome": "Collect and evaluate supplier Scope 3 emissions data",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "What is the primary commercial risk of selecting a supplier solely on the lowest initial purchase price without evaluating ESG compliance?",
        "options": [
          "The supplier will send too many thank-you emails.",
          "High vulnerability to supply disruption from regulatory shutdowns, child or forced labor scandals, illegal pollution fines, and severe corporate brand damage.",
          "The company's bank accounts will instantly freeze.",
          "Lowest-price suppliers are always 100% risk-free."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Cheap suppliers frequently cut corners on safety, environmental controls, and labor standards, creating severe supply chain interruption and brand reputation risks.",
        "incorrectExplanation": "Unvetted low-cost suppliers create severe legal, reputational, and operational disruption risks.",
        "optionFeedback": [
          "Incorrect. Communication frequency is unrelated to compliance risk.",
          "Correct! Neglecting ESG due diligence exposes the buyer to factory shutdowns, legal liability, child labor scandals, and devastating brand reputational loss.",
          "Incorrect. Bank operations continue, but commercial and legal liabilities escalate.",
          "Incorrect. Lowest-bid procurement without ESG criteria is inherently high-risk."
        ],
        "practicalTakeaway": "Mandate ESG pre-qualification before allowing vendors into commercial tender bidding.",
        "learningOutcome": "Mitigate supply chain ESG compliance and reputational risks",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "What is a 'Supplier Code of Conduct' in sustainable procurement governance?",
        "options": [
          "A list of restaurant recommendations for business lunches.",
          "A binding corporate policy establishing non-negotiable minimum standards for labor rights, health and safety, anti-corruption, environmental management, and legal compliance that suppliers must sign.",
          "A secret internal document that suppliers never see.",
          "A document that allows suppliers to bypass all national laws."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "The Supplier Code of Conduct sets clear, enforceable ethical baselines that vendors must contractually accept to do business with the company.",
        "incorrectExplanation": "A Supplier Code of Conduct establishes mandatory ethical, labor, environmental, and safety standards for all vendors.",
        "optionFeedback": [
          "Incorrect. Dining guides are informal administrative recommendations.",
          "Correct! The Supplier Code of Conduct contractually binds vendors to minimum standards on labor rights, safety, environmental compliance, and anti-bribery.",
          "Incorrect. The Code must be formally signed and integrated into contracts.",
          "Incorrect. The Code reinforces and often exceeds national legal baselines."
        ],
        "practicalTakeaway": "Ensure all active vendor contracts include a signed Corporate Supplier Code of Conduct.",
        "learningOutcome": "Implement and enforce Supplier Codes of Conduct",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      },
      {
        "question": "Which of the following represents an effective 30-day action commitment for a procurement specialist?",
        "options": [
          "Removing all environmental questions from supplier questionnaires.",
          "Updating standard tender templates with structured sustainability evaluation criteria aligned with ISO 20400 guidance and requiring top suppliers to sign the Supplier Code of Conduct.",
          "Refusing to purchase any supplies for the company.",
          "Deleting all vendor contact records."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Embedding structured sustainability criteria and mandating signed Codes of Conduct establishes systemic supply chain governance.",
        "incorrectExplanation": "Integrating sustainability criteria and enforcing Codes of Conduct institutionalizes sustainable procurement.",
        "optionFeedback": [
          "Incorrect. Removing ESG questions increases supply chain blind spots.",
          "Correct! Updating RFP templates with structured sustainability criteria and rolling out the Supplier Code of Conduct embeds sustainable procurement into core purchasing operations.",
          "Incorrect. Purchasing operations must proceed with sustainable criteria.",
          "Incorrect. Supplier databases are critical commercial assets."
        ],
        "practicalTakeaway": "Embed structured sustainability criteria into your RFP templates and roll out the Supplier Code of Conduct.",
        "learningOutcome": "Execute 30-day sustainable procurement action plan",
        "competencyArea": "COMP_SUPPLY_CHAIN"
      }
    ]
  },
  {
    "courseCode": "ELH-27",
    "title": "Sustainability for Facilities and Property Teams",
    "slug": "sustainability-for-facilities-teams",
    "description": "Master building management systems (BMS), chiller plant optimization, preventative HVAC maintenance, sensor lighting, and Montreal Protocol refrigerant compliance.",
    "fullDescription": "Sustainability for Facilities and Property Teams provides building managers, maintenance supervisors, and MEP technicians with practical engineering strategies to decarbonize commercial real estate. Master BMS setback scheduling, chiller efficiency (kW/TR), condenser water temperature optimization, preventative coil cleaning, Montreal Protocol HCFC-22 phase-out compliance, Kigali Amendment HFC phase-down awareness, and building envelope thermal insulation.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D2 Working Knowledge",
    "passingScore": 75,
    "primaryCompetency": "COMP_ENERGY",
    "secondaryCompetencies": [
      "COMP_WATER",
      "COMP_GHG"
    ],
    "learningObjectives": [
      "Optimize centralized chiller plants, cooling towers, and condenser water temperature setpoints.",
      "Implement automated Building Management System (BMS) occupancy and night-setback schedules.",
      "Execute preventative maintenance protocols for HVAC air filters, evaporator coils, and pipe insulation.",
      "Manage refrigerant compliance: execute HCFC-22 phase-out under the Montreal Protocol and transition away from high-GWP HFCs under the Kigali Amendment."
    ],
    "intendedRoles": [
      "Facility Managers",
      "Property Supervisors",
      "MEP Engineers",
      "Maintenance Technicians"
    ],
    "badgeName": "Sustainable Facility Engineer",
    "badgeDescription": "Demonstrated competence in HVAC chiller optimization, BMS scheduling, and green building operations.",
    "completionMessage": "Congratulations! You have completed Sustainability for Facilities and Property Teams and are now equipped to lead high-efficiency commercial building operations.",
    "recommendedNextCourseCode": "ELH-48",
    "lessons": [
      {
        "title": "1. Centralized Chiller Plant Optimization",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Mastering chiller performance metrics (kW/TR), variable primary flow, and cooling tower approach temperatures.",
        "contentBlocks": [
          {
            "id": "elh27-h1",
            "type": "heading",
            "level": 3,
            "text": "The Engine Room of Commercial Energy Consumption"
          },
          {
            "id": "elh27-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "In large tropical commercial properties, central chiller plants consume between 40% and 60% of total site electricity. Operating chillers efficiently requires tracking the system efficiency index (Kilowatts per Ton of Refrigeration, kW/TR). Modern water-cooled magnetic bearing chillers operate at 0.55 to 0.65 kW/TR, compared to older inefficient systems running at 1.1+ kW/TR. Resetting chilled water supply temperatures upwards during mild ambient conditions reduces compressor lift and cuts energy use by 2% to 3% per degree Celsius."
          },
          {
            "id": "elh27-c1",
            "type": "callout",
            "variant": "info",
            "title": "Condenser Optimization",
            "bodyText": "Keeping cooling tower fill packs clean and optimizing condenser water temperature delivers immediate, massive chiller compressor energy savings."
          }
        ]
      },
      {
        "title": "2. BMS Schedules, Sub-Metering & Preventative Maintenance",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Configuring occupancy setbacks, cleaning air handling unit (AHU) coils, and monitoring electrical sub-meters.",
        "contentBlocks": [
          {
            "id": "elh27-h2",
            "type": "heading",
            "level": 3,
            "text": "Smart Building Controls and Mechanical Hygiene"
          },
          {
            "id": "elh27-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "A Building Management System (BMS) is only as effective as its operating logic. Overridden time schedules and faulty temperature sensors frequently leave air handling units running 24/7 in empty zones. Furthermore, fouled AHU cooling coils and dirty air filters increase static air pressure resistance, forcing supply fans to consume up to 30% more power while reducing heat transfer. Regular coil chemical cleaning and filter replacement pay for themselves within weeks."
          },
          {
            "id": "elh27-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Sub-Metering Rule",
            "bodyText": "Install electrical sub-meters on major mechanical loads (chillers, pumps, lighting, tenant power) to detect operational drift immediately."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Resolving Chiller Plant Overcooling",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Troubleshoot low delta-T syndrome and overcooling across commercial office floors.",
        "contentBlocks": [
          {
            "id": "elh27-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Managing Low Delta-T Syndrome",
            "prompt": "Your facility's central chilled water system is suffering from 'Low Delta-T Syndrome' (return water temperature is only 2\u00b0C higher than supply, instead of design 5.5\u00b0C), forcing 3 chillers to run at low partial loads while office occupants complain of freezing 19\u00b0C temperatures. What is your engineering action?",
            "options": [
              {
                "id": "opt_a",
                "text": "Start a 4th chiller and lower the chilled water setpoint to 5\u00b0C to force more cold water through the building.",
                "consequence": "Catastrophic energy waste. Increases electricity consumption by 35%, accelerates chiller wear, and worsens thermal discomfort across the building.",
                "feedback": "Adding more chiller capacity worsens Low Delta-T syndrome and spikes power bills.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Inspect and recalibrate two-way control valves at AHUs, reset chilled water supply temperature from 6.5\u00b0C to 8\u00b0C, and balance zone thermostats to 24\u00b0C.",
                "consequence": "Optimal outcome. You restore design delta-T, stage off two unneeded chillers, cut plant power by 40%, and achieve optimal tenant comfort.",
                "feedback": "Correct! Fixing valve bypasses and raising chilled water setpoints resolves Low Delta-T syndrome and achieves massive efficiency.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Refrigerant Leak Detection & Phase-Out",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Manage an older R-22 system with a recurring low-refrigerant alarm under international environmental treaty frameworks.",
        "contentBlocks": [
          {
            "id": "elh27-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Handling a Leaking R-22 Split System",
            "prompt": "A 12-year-old ducted split system serving the executive wing triggers a low-pressure refrigerant alarm for the third time in 4 months. The technician suggests adding 5 kg of R-22 gas again without looking for the leak. What is your facility decision?",
            "options": [
              {
                "id": "opt_a",
                "text": "Approve topping up the R-22 gas to quickly restore cooling without opening walls or checking pipes.",
                "consequence": "Illegal and environmentally harmful. HCFC-22 (R-22) is an ozone-depleting substance whose phase-out is governed by the Montreal Protocol; repeatedly venting refrigerant breaches environmental compliance.",
                "feedback": "Topping up leaking systems without repairing leaks violates refrigerant regulations and harms the ozone layer.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Conduct immediate electronic leak detection and pressure testing to repair the leak, while presenting a capital business case to replace the obsolete HCFC-22 unit with a modern, energy-efficient lower-GWP system.",
                "consequence": "Optimal outcome. You stop atmospheric refrigerant release, ensure regulatory compliance under the Montreal Protocol, and upgrade to high-efficiency cooling.",
                "feedback": "Excellent! Rigorous leak repair combined with planned transition away from obsolete HCFCs ensures environmental compliance and energy savings.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Night-Time Facility Energy Audit",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Execute a comprehensive after-hours building shutdown inspection and BMS schedule review.",
        "contentBlocks": [
          {
            "id": "elh27-h3",
            "type": "heading",
            "level": 3,
            "text": "The 22:00 Facility Walkthrough"
          },
          {
            "id": "elh27-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Conduct an unannounced facility walkthrough between 22:00 and midnight. Verify: (1) AHUs and extract fans in unoccupied zones are shut down; (2) Chiller staging matches reduced night loads; (3) Non-essential facade and corridor lighting is switched off by timer; and (4) Sump pump and domestic booster pump pressure switches are not cycling rapidly due to hidden leaks."
          },
          {
            "id": "elh27-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Audit your building's BMS time schedules this week and eliminate manual overrides on all air handling units."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary indicator of central chiller plant energy efficiency in commercial facilities?",
        "options": [
          "The physical weight of the chiller in metric tons.",
          "Kilowatts per Ton of Refrigeration (kW/TR) or Coefficient of Performance (COP).",
          "The color of the paint on the compressor housing.",
          "The number of technicians employed in the plant room."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "kW/TR measures the electrical power (kW) consumed to produce one ton of cooling effect (3.517 kW thermal). Lower kW/TR numbers indicate higher plant efficiency.",
        "incorrectExplanation": "kW/TR and COP are the standard thermodynamic efficiency metrics for chiller plants.",
        "optionFeedback": [
          "Incorrect. Physical weight does not reflect thermodynamic operating efficiency.",
          "Correct! kW/TR measures electrical energy input per unit of cooling delivered; lower values denote superior plant efficiency.",
          "Incorrect. Paint finish is purely aesthetic.",
          "Incorrect. Staffing levels do not measure mechanical plant efficiency."
        ],
        "practicalTakeaway": "Monitor chiller plant kW/TR continuously to identify operational degradation.",
        "learningOutcome": "Measure chiller plant efficiency via kW/TR",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "What is 'Low Delta-T Syndrome' in a centralized chilled water building distribution system?",
        "options": [
          "When the temperature outside drops below 0\u00b0C.",
          "When chilled water returns from air handling units with a smaller temperature rise than design (e.g. 2\u00b0C instead of 5.5\u00b0C), forcing extra chillers and pumps to run at low efficiency.",
          "When the building's elevators move too slowly.",
          "When domestic hot water boilers overheat."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Low Delta-T occurs when water bypasses coils without absorbing heat (due to faulty valves or oversized coils), forcing plant rooms to pump massive water volumes and stage extra chillers.",
        "incorrectExplanation": "Low Delta-T syndrome forces excess chiller and pump staging due to inadequate coil heat exchange.",
        "optionFeedback": [
          "Incorrect. Low Delta-T refers to internal hydraulic temperature differentials, not outdoor freezing.",
          "Correct! Inadequate coil temperature rise forces unnecessary chiller staging and excess pumping energy.",
          "Incorrect. Elevator velocity is completely unrelated to chilled water hydraulics.",
          "Incorrect. Low Delta-T pertains strictly to cooling water loops."
        ],
        "practicalTakeaway": "Calibrate AHU control valves and balance chilled water flow to maintain design delta-T.",
        "learningOutcome": "Diagnose and resolve Low Delta-T syndrome",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "Why is regular preventative chemical cleaning of air handling unit (AHU) cooling coils essential for energy efficiency?",
        "options": [
          "To make the coils smell like pine trees.",
          "Dust and biofilm on coil fins act as thermal insulation and increase airflow resistance, forcing fans and chillers to consume significantly more electricity.",
          "Coil cleaning increases building static water pressure.",
          "Cleaning coils converts copper metal into aluminum."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Dirty coils impede convective heat transfer between air and chilled water while increasing static fan pressure drop, driving up chiller and fan power by 15% to 30%.",
        "incorrectExplanation": "Clean cooling coils maintain efficient heat transfer and lower supply fan static pressure.",
        "optionFeedback": [
          "Incorrect. Scented deodorizers do not restore thermodynamic heat transfer.",
          "Correct! Biofilm and particulate fouling degrade heat transfer and increase fan static resistance, wasting substantial electrical power.",
          "Incorrect. Air handling coils interact with air, not static domestic water pressure.",
          "Incorrect. Chemical cleaning removes fouling without altering the base metallurgy."
        ],
        "practicalTakeaway": "Schedule quarterly inspection and chemical cleaning of AHU cooling coils.",
        "learningOutcome": "Maintain HVAC heat transfer surfaces",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "Under the Montreal Protocol, what is the regulatory status of HCFC-22 (R-22) refrigerant, and how does it differ from the Kigali Amendment scope?",
        "options": [
          "R-22 is mandatory for all new building installations.",
          "HCFC-22 (R-22) is an ozone-depleting hydrochlorofluorocarbon subject to a mandatory global phase-out under the Montreal Protocol's HCFC schedule; in contrast, the Kigali Amendment specifically controls the phase-down of non-ozone depleting hydrofluorocarbons (HFCs) with high global warming potential.",
          "R-22 can be freely vented into the atmosphere without restrictions.",
          "R-22 is classified as non-hazardous drinking water."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "HCFC-22 (R-22) depletes stratospheric ozone and is controlled under the Montreal Protocol's HCFC phase-out schedules. The 2016 Kigali Amendment separately controls the phase-down of potent greenhouse gas HFCs (such as R-410A and R-134a).",
        "incorrectExplanation": "HCFC-22 is an ozone-depleting substance phased out under the Montreal Protocol, whereas the Kigali Amendment governs the phase-down of high-GWP HFCs.",
        "optionFeedback": [
          "Incorrect. Installing new R-22 equipment is strictly prohibited under ozone protection regulations.",
          "Correct! The Montreal Protocol governs the phase-out of ozone-depleting HCFCs like R-22, while the Kigali Amendment governs the phase-down of high-GWP HFCs.",
          "Incorrect. Venting refrigerants to the atmosphere is illegal under environmental protection laws.",
          "Incorrect. Refrigerants are chemical fluorocarbons, not potable liquids."
        ],
        "practicalTakeaway": "Develop a phased replacement plan for legacy R-22 equipment, ensuring full compliance with the Montreal Protocol HCFC phase-out.",
        "learningOutcome": "Distinguish Montreal Protocol HCFC phase-out from Kigali Amendment HFC phase-down",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "What is the most effective operational strategy for Building Management System (BMS) lighting and HVAC control in an office building?",
        "options": [
          "Setting all mechanical systems to permanent manual ON mode.",
          "Configuring automated occupancy schedules, night-time temperature setbacks (28\u00b0C or OFF), and integrating PIR motion sensors in intermittently used zones.",
          "Turning off emergency stairwell safety exit lighting during work hours.",
          "Disabling the BMS computer completely."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Automated setback scheduling and occupancy sensors eliminate unoccupied baseload operations without compromising comfort during active tenant hours.",
        "incorrectExplanation": "Occupancy scheduling and motion sensors eliminate energy waste in unoccupied spaces.",
        "optionFeedback": [
          "Incorrect. Permanent manual ON modes cause severe continuous energy waste.",
          "Correct! Automated occupancy scheduling and motion sensors ensure systems operate only when spaces are actually populated.",
          "Incorrect. Emergency egress lighting must remain operational at all times under life safety codes.",
          "Incorrect. Disabling building automation prevents automated energy management."
        ],
        "practicalTakeaway": "Program automated night setbacks and occupancy controls into the central BMS.",
        "learningOutcome": "Configure BMS scheduling and occupancy controls",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "Why is solar heat gain control (e.g. low-e window films, external shading louvers) critical for building envelope efficiency in Mauritius?",
        "options": [
          "It turns window glass completely black so nobody can see out.",
          "It blocks infrared solar radiation from penetrating the building interior, reducing solar thermal heat load and downsizing chiller cooling demand.",
          "It attracts lightning strikes to generate free electricity.",
          "It makes office buildings completely airtight with zero oxygen."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Solar radiation entering through glass facades accounts for up to 40% of building cooling load. Shading and low-e coatings prevent solar heat from entering the conditioned space.",
        "incorrectExplanation": "Solar heat gain reduction directly lowers the thermal cooling load on air conditioning chillers.",
        "optionFeedback": [
          "Incorrect. Modern low-e films maintain high visible light transmission while rejecting infrared heat.",
          "Correct! Rejecting solar infrared radiation reduces interior heat buildup, lowering chiller energy demand significantly.",
          "Incorrect. Window films do not alter lightning conductivity.",
          "Incorrect. Solar shading controls radiant heat, not ventilation oxygen levels."
        ],
        "practicalTakeaway": "Install solar control films or external shading on east- and west-facing glass facades.",
        "learningOutcome": "Apply building envelope thermal controls",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "When monitoring water conservation in commercial facilities, what does rapid cycling of a domestic booster pump during midnight hours indicate?",
        "options": [
          "The booster pump is cleaning itself automatically.",
          "An active hidden water leak, continuous cistern overflow, or broken underground pipe maintaining artificial water demand.",
          "The municipal water utility is sending free water.",
          "The electrical grid frequency has doubled."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "When buildings are unoccupied at night, booster pumps should remain dormant. Frequent pressure drops and pump starts reveal continuous underground or fixture water leakage.",
        "incorrectExplanation": "Night-time pump cycling in unoccupied buildings indicates hidden plumbing leaks.",
        "optionFeedback": [
          "Incorrect. Booster pumps do not have self-cleaning pump cycles.",
          "Correct! Unscheduled night-time pump cycling indicates pressure loss caused by hidden pipe bursts or leaking toilet valves.",
          "Incorrect. Water utilities do not activate private building booster pumps.",
          "Incorrect. Grid frequency variations do not trigger domestic pressure switches."
        ],
        "practicalTakeaway": "Audit midnight booster pump run-logs to detect silent facility water leaks.",
        "learningOutcome": "Diagnose facility water leaks via pressure telemetry",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "Which of the following represents an effective personal 30-day action commitment for a facility manager?",
        "options": [
          "Overriding all BMS schedules to permanent manual ON.",
          "Conducting a comprehensive 22:00 night walkthrough to eliminate unneeded baseloads and balancing chilled water supply temperatures to design setpoints.",
          "Removing all electrical sub-meters from plant rooms.",
          "Canceling HVAC preventative maintenance contracts."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Night walkthroughs and chilled water temperature optimization deliver immediate, verifiable operational energy reductions.",
        "incorrectExplanation": "Night audits and chiller setpoint balancing eliminate substantial unoccupied baseload power.",
        "optionFeedback": [
          "Incorrect. Manual overrides destroy building energy efficiency.",
          "Correct! Systematic night walkthroughs and chilled water loop optimization deliver immediate 10\u201320% facility energy savings.",
          "Incorrect. Sub-meters are essential for energy management.",
          "Incorrect. Canceling maintenance leads to catastrophic equipment breakdown and high energy waste."
        ],
        "practicalTakeaway": "Perform regular after-hours energy sweeps and verify BMS schedule integrity.",
        "learningOutcome": "Execute facilities energy action plan",
        "competencyArea": "COMP_ENERGY"
      }
    ]
  },
  {
    "courseCode": "ELH-28",
    "title": "Sustainability for Sales and Marketing Teams",
    "slug": "sustainability-for-sales-and-marketing",
    "description": "Master authentic sustainability storytelling, anti-greenwashing principles under the self-regulatory ICC Code and applicable law, customer ESG RFP responses, and third-party certified messaging.",
    "fullDescription": "Sustainability for Sales and Marketing Teams trains commercial, marketing, and client-facing professionals to communicate corporate sustainability with authenticity and legal rigor. Learn to avoid deceptive greenwashing traps under the ICC Advertising and Marketing Communications Code, substantiate environmental claims with primary data and verified certifications, align with applicable consumer protection laws, win corporate enterprise clients by answering complex ESG tender questionnaires, and build trust-based brand reputation.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D2 Working Knowledge",
    "passingScore": 75,
    "primaryCompetency": "COMP_GOVERNANCE_ETHICS",
    "secondaryCompetencies": [
      "COMP_REPORTING",
      "COMP_SUSTAINABILITY_FOUNDATIONS"
    ],
    "learningObjectives": [
      "Differentiate authentic evidence-based environmental marketing from misleading greenwashing using the self-regulatory ICC Code and consumer protection baselines.",
      "Substantiate product and corporate claims with primary data, lifecycle assessments, and verified certifications.",
      "Respond accurately and persuasively to enterprise client ESG Request for Proposals (RFPs).",
      "Ensure marketing campaigns comply with self-regulatory advertising guidelines and applicable consumer protection standards."
    ],
    "intendedRoles": [
      "Marketing Executives",
      "Sales Directors",
      "Brand Managers",
      "Commercial Account Leads"
    ],
    "badgeName": "Ethical Brand Ambassador",
    "badgeDescription": "Demonstrated competence in authentic sustainability communications, ESG RFP responses, and anti-greenwashing compliance.",
    "completionMessage": "Congratulations! You have completed Sustainability for Sales and Marketing Teams and are prepared to represent your company's ESG achievements with credibility and commercial impact.",
    "recommendedNextCourseCode": "ELH-130",
    "lessons": [
      {
        "title": "1. Anti-Greenwashing & Self-Regulatory Standards (ICC Code)",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Understanding the commercial, reputational, and legal implications of unsubstantiated environmental claims.",
        "contentBlocks": [
          {
            "id": "elh28-h1",
            "type": "heading",
            "level": 3,
            "text": "The High Cost of Misleading Sustainability Claims"
          },
          {
            "id": "elh28-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "The International Chamber of Commerce (ICC) Advertising and Marketing Communications Code (Chapter D) serves as a globally recognized self-regulatory framework establishing ethical standards for environmental marketing claims. It emphasizes that claims must be clear, truthful, and substantiated by sound scientific evidence. While the ICC Code is a self-regulatory benchmark applied by industry self-regulatory organizations (SROs), deceptive or unsubstantiated claims also expose businesses to formal statutory enforcement, civil penalties, and advertising bans under national consumer protection and trade practices legislation."
          },
          {
            "id": "elh28-c1",
            "type": "callout",
            "variant": "info",
            "title": "Golden Rule of Green Marketing",
            "bodyText": "If you cannot measure it with verified primary data or certified audit reports, do not claim it in your sales collateral."
          }
        ]
      },
      {
        "title": "2. Winning Enterprise Tenders with Robust ESG Credentials",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "How multinational corporate clients evaluate supplier sustainability in commercial RFPs.",
        "contentBlocks": [
          {
            "id": "elh28-h2",
            "type": "heading",
            "level": 3,
            "text": "Sustainability as a B2B Competitive Advantage"
          },
          {
            "id": "elh28-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "Corporate enterprise clients in hospitality, banking, telecommunications, and manufacturing are legally mandated to report their Scope 3 supply chain emissions. When bidding for major contracts, sales teams that provide verified carbon metrics, OSHA 2005 compliance certificates, and circular packaging options score significantly higher in procurement evaluations. Sustainability is no longer a PR footnote; it is a decisive revenue driver."
          },
          {
            "id": "elh28-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Sales Enablement",
            "bodyText": "Maintain a standardized 'ESG Sales Factsheet' with verified carbon intensity, safety metrics, and certifications to respond rapidly to client RFPs."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Reviewing a Questionable Ad Campaign",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Evaluate a proposed corporate advertising campaign for potential greenwashing risks.",
        "contentBlocks": [
          {
            "id": "elh28-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Launching the '100% Pure Green' Product Campaign",
            "prompt": "Your marketing agency presents a draft campaign for your new hotel resort or product line featuring the headline: '100% Eco-Friendly, Zero Carbon, Natural Luxury' alongside images of pristine rainforests. The company planted 50 trees last month but has not conducted a carbon footprint audit. What is your commercial decision?",
            "options": [
              {
                "id": "opt_a",
                "text": "Approve the campaign as presented because emotional nature imagery drives customer bookings and sales conversions.",
                "consequence": "Severe greenwashing failure. The campaign triggers immediate consumer complaints, reputational backlash through advertising standards bodies, and potential investigation under statutory consumer protection laws.",
                "feedback": "Broad, unverified claims ('100% Eco-Friendly', 'Zero Carbon') without scientific lifecycle evidence constitute blatant greenwashing.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Reject the headline and refocus the campaign on verified, specific achievements: 'Featuring 40% Solar Water Heating, Local Mauritian Organic Produce, and Zero Single-Use Guest Plastics'.",
                "consequence": "Optimal outcome. You deliver an authentic, legally compliant campaign that builds trust, highlights genuine sustainability features, and protects corporate brand equity.",
                "feedback": "Correct! Specific, factual, and verified claims build enduring customer trust while eliminating legal greenwashing risks.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Responding to an International Client ESG RFP",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Answer complex supply chain carbon and labor questions in a multi-million-rupee tender.",
        "contentBlocks": [
          {
            "id": "elh28-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Multinational Bank Supply Chain Questionnaire",
            "prompt": "A major corporate client issues an RFP requiring proof of your Scope 1 and Scope 2 GHG emissions, worker health and safety incident rates, and waste diversion percentages. Your sales team has 5 days to respond. How do you prepare the submission?",
            "options": [
              {
                "id": "opt_a",
                "text": "Write generalized marketing paragraphs about how much your company loves the environment, leaving numerical data tables blank.",
                "consequence": "Tender rejection. Enterprise procurement scorecards award 0 points for qualitative fluff when audited numerical metrics are required.",
                "feedback": "Enterprise buyers require hard data and audit evidence, not qualitative slogans.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Collaborate immediately with Facilities, HSE, and Finance to pull verified utility billing data, OSHA 2005 safety statistics, and waste manifests, attaching official documentation.",
                "consequence": "Optimal outcome. You provide transparent, verified primary metrics, achieving maximum ESG evaluation points and positioning your company as the preferred supplier.",
                "feedback": "Excellent! Providing verified data backed by primary documentation gives enterprise clients confidence in your supply chain reliability.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Marketing Collateral Anti-Greenwashing Sweep",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Audit current sales collateral, product sheets, and website copy for compliance and clarity.",
        "contentBlocks": [
          {
            "id": "elh28-h3",
            "type": "heading",
            "level": 3,
            "text": "The Anti-Greenwashing Audit Checklist"
          },
          {
            "id": "elh28-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Review all active sales brochures, pitch decks, and website pages against three questions: (1) Are terms like 'eco-friendly', 'green', or 'sustainable' accompanied by specific evidence? (2) Are third-party certification logos (FSC, ISO 14001, Made in Moris) valid and current? (3) Does the claim represent a meaningful environmental attribute rather than minor legal compliance?"
          },
          {
            "id": "elh28-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Audit your team's standard commercial pitch deck this month and update the sustainability slide with verified, current operational metrics."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary nature of the ICC Advertising and Marketing Communications Code regarding environmental claims, and how does it relate to statutory law?",
        "options": [
          "The ICC Code is an international criminal statute enforced by Interpol.",
          "The ICC Code is a globally recognized self-regulatory framework establishing ethical standards for truthfulness and substantiation; statutory enforcement and legal sanctions are governed separately by national consumer protection and trade practices legislation.",
          "The ICC Code replaces all national laws automatically.",
          "The ICC Code only applies to social media influencers."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "The ICC Advertising Code (Chapter D) is a self-regulatory benchmark for ethical marketing, while statutory legal penalties and consumer protection enforcement operate under national legislation.",
        "incorrectExplanation": "The ICC Code is an international self-regulatory code setting ethical baselines, distinct from statutory consumer protection law.",
        "optionFeedback": [
          "Incorrect. The ICC Code is a voluntary self-regulatory framework, not a criminal treaty.",
          "Correct! The ICC Code serves as an international self-regulatory standard for ethical marketing, while legally binding consumer protection regulations are enforced under national statutory laws.",
          "Incorrect. Self-regulatory codes complement national legal frameworks rather than replacing them.",
          "Incorrect. The ICC Code applies broadly across all marketing communications and channels."
        ],
        "practicalTakeaway": "Align marketing collateral with both ICC self-regulatory ethical principles and applicable consumer protection statutes.",
        "learningOutcome": "Distinguish ICC self-regulatory principles from statutory consumer protection law",
        "competencyArea": "COMP_GOVERNANCE_ETHICS"
      },
      {
        "question": "What is the primary commercial reason enterprise B2B corporate clients require detailed ESG data from their suppliers?",
        "options": [
          "To make their tender documents look as long as possible.",
          "Enterprise clients are legally required to calculate and disclose their Scope 3 supply chain emissions and ensure human rights compliance across their supply base.",
          "Corporate clients want to steal trade secrets.",
          "Procurement officers are required to collect photographs of supplier factories for art competitions."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Enterprise clients face mandatory ESG disclosure regulations (GRI, ISSB, CSRD, SEM) requiring verified Scope 3 supply chain carbon and labor data.",
        "incorrectExplanation": "Corporate clients require audited supplier data to fulfill their statutory Scope 3 reporting obligations.",
        "optionFeedback": [
          "Incorrect. Procurement processes prioritize essential compliance data.",
          "Correct! Enterprise buyers must report their Scope 3 footprint and audit supply chain risks to satisfy regulators, investors, and stock exchanges.",
          "Incorrect. Standard ESG questionnaires assess compliance, not proprietary trade secrets.",
          "Incorrect. Supplier data collection is a formal regulatory and risk governance process."
        ],
        "practicalTakeaway": "Prepare structured ESG metrics to win lucrative enterprise supply contracts.",
        "learningOutcome": "Understand client Scope 3 data requirements in B2B sales",
        "competencyArea": "COMP_GOVERNANCE_ETHICS"
      },
      {
        "question": "What is the risk of using unverified environmental claims like 'Carbon Neutral' in advertising without certified carbon offset retirement records?",
        "options": [
          "The company will receive an award for creativity.",
          "Advertising standards bodies and statutory consumer protection authorities can order retractions, issue penalties, and inflict severe brand reputational damage.",
          "Search engines will block the company's website permanently.",
          "The price of electricity will double."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Unsubstantiated carbon claims violate advertising standards and consumer protection laws, resulting in regulatory scrutiny, mandatory retractions, and brand degradation.",
        "incorrectExplanation": "Unsubstantiated claims expose the enterprise to legal enforcement and severe reputational damage.",
        "optionFeedback": [
          "Incorrect. Greenwashing attracts regulatory penalties, not awards.",
          "Correct! Self-regulatory bodies and statutory authorities penalize unverified carbon claims with advertising bans, fines, and brand reputational damage.",
          "Incorrect. Enforcement is conducted by courts, statutory authorities, and advertising watchdogs.",
          "Incorrect. Advertising claims do not dictate utility tariffs."
        ],
        "practicalTakeaway": "Never claim carbon neutrality without verified emissions inventories and certified carbon credit retirements.",
        "learningOutcome": "Identify legal and reputational risks of unverified environmental claims",
        "competencyArea": "COMP_GOVERNANCE_ETHICS"
      },
      {
        "question": "Which of the following practices represents ethical sales behavior when responding to a client's ESG questionnaire?",
        "options": [
          "Checking 'Yes' to every question even if the company has never implemented the policy.",
          "Providing accurate, verified data with supporting policy attachments, and transparently acknowledging areas currently under development.",
          "Refusing to participate in tenders that ask about safety or environment.",
          "Forging an ISO 14001 certificate using graphic design software."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Honest disclosures backed by real evidence and transparent transition roadmaps build long-term commercial trust and survive client vendor audits.",
        "incorrectExplanation": "Transparent, accurate reporting backed by genuine evidence is the only ethical and sustainable sales practice.",
        "optionFeedback": [
          "Incorrect. False declarations in commercial tenders constitute fraudulent misrepresentation.",
          "Correct! Accurate data, valid attachments, and honest roadmap disclosures build durable client trust and pass compliance audits.",
          "Incorrect. Opting out of ESG questionnaires disqualifies companies from major corporate tenders.",
          "Incorrect. Forging certification documents is a serious criminal offense."
        ],
        "practicalTakeaway": "Always answer client ESG tenders with verified data and authentic policy evidence.",
        "learningOutcome": "Execute ethical RFP response practices",
        "competencyArea": "COMP_GOVERNANCE_ETHICS"
      },
      {
        "question": "How can marketing teams effectively highlight a product's circular attributes without greenwashing?",
        "options": [
          "Claiming the product will save the Earth from destruction.",
          "Stating exact factual attributes, such as 'Manufactured with 80% post-consumer recycled PET plastic, 100% recyclable in standard municipal recycling facilities'.",
          "Adding green leaf clipart to the product label without explanatory text.",
          "Calling the product 'Bio-Magic'."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Specifying precise recycled content percentages and verified end-of-life recyclability provides actionable, truthful information to consumers.",
        "incorrectExplanation": "Precise material breakdowns and verifiable recyclability statements prevent misleading claims.",
        "optionFeedback": [
          "Incorrect. Exaggerated claims destroy marketing credibility.",
          "Correct! Clear technical specifications (percentage of recycled content, specific recyclability stream) inform consumers accurately.",
          "Incorrect. Visual green imagery without explanation is classic misleading greenwashing.",
          "Incorrect. Invented buzzwords mislead consumers regarding true product composition."
        ],
        "practicalTakeaway": "State exact percentages of recycled material and specific recyclability conditions.",
        "learningOutcome": "Communicate circular product features accurately",
        "competencyArea": "COMP_GOVERNANCE_ETHICS"
      },
      {
        "question": "What is the role of an 'ESG Sales Enablement Factsheet' in commercial operations?",
        "options": [
          "A secret internal document that should never be shown to customers.",
          "A consolidated, approved repository of verified environmental metrics, certifications, safety records, and case studies that sales teams can draw upon for client proposals.",
          "A list of sales commissions paid to brokers.",
          "A collection of jokes for client meetings."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "A central factsheet ensures all sales executives use consistent, accurate, and pre-approved sustainability data across all client presentations and RFPs.",
        "incorrectExplanation": "A verified factsheet ensures consistent, compliant, and pre-approved messaging across sales channels.",
        "optionFeedback": [
          "Incorrect. Sales enablement collateral is designed specifically for customer-facing communication.",
          "Correct! A centralized, pre-approved ESG factsheet ensures sales teams deliver accurate, compliant, and persuasive responses to enterprise buyers.",
          "Incorrect. Commission schedules are internal HR finance records.",
          "Incorrect. Commercial factsheets provide technical and operational business evidence."
        ],
        "practicalTakeaway": "Arm your sales team with a centralized, verified ESG data factsheet.",
        "learningOutcome": "Utilize ESG sales enablement repositories",
        "competencyArea": "COMP_GOVERNANCE_ETHICS"
      },
      {
        "question": "Why should sales and marketing teams collaborate with internal HSE, Operations, and Facilities teams when drafting sustainability campaigns?",
        "options": [
          "To get advice on what graphic design fonts to use.",
          "To ensure all marketing claims are technically accurate, operationally verified, and backed by primary physical evidence before publication.",
          "To transfer marketing budget to the maintenance department.",
          "To delay campaign launches indefinitely."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Cross-functional review ensures technical claims reflect operational reality, eliminating the risk of marketing overpromising or stating inaccurate facts.",
        "incorrectExplanation": "Technical review by operational teams validates marketing claims against physical evidence.",
        "optionFeedback": [
          "Incorrect. Graphic design typography is the domain of creative professionals.",
          "Correct! Technical operational review verifies that environmental claims align strictly with actual site performance data.",
          "Incorrect. Budget allocation follows corporate strategic planning.",
          "Incorrect. Collaboration improves quality and credibility, accelerating commercial success."
        ],
        "practicalTakeaway": "Mandate technical operational sign-off for all public sustainability claims.",
        "learningOutcome": "Collaborate cross-functionally for claim substantiation",
        "competencyArea": "COMP_GOVERNANCE_ETHICS"
      },
      {
        "question": "Which of the following represents an effective 30-day action commitment for a sales or marketing specialist?",
        "options": [
          "Printing 50,000 glossy brochures claiming the company is 100% green without data.",
          "Auditing current sales collateral to remove unsubstantiated green buzzwords and creating a verified ESG tender response factsheet with operational teams.",
          "Refusing to communicate with corporate clients.",
          "Deleting the corporate sustainability webpage."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Auditing sales materials and building a verified factsheet institutionalizes ethical marketing and drives commercial tender success.",
        "incorrectExplanation": "Cleaning collateral of greenwashing and formalizing verified RFP factsheets delivers enduring value.",
        "optionFeedback": [
          "Incorrect. Unsubstantiated print campaigns generate waste and severe greenwashing risk.",
          "Correct! Auditing sales collateral and establishing an auditable ESG factsheet enhances brand credibility and wins enterprise tenders.",
          "Incorrect. Client communication is fundamental to commercial operations.",
          "Incorrect. Transparent public disclosure is expected by modern investors and consumers."
        ],
        "practicalTakeaway": "Audit your sales presentations and establish a verified ESG RFP factsheet.",
        "learningOutcome": "Execute ethical marketing action commitment",
        "competencyArea": "COMP_GOVERNANCE_ETHICS"
      }
    ]
  },
  {
    "courseCode": "ELH-29",
    "title": "Sustainability for Operations and Frontline Teams",
    "slug": "sustainability-for-operations-and-frontline",
    "description": "Drive Lean Green frontline operational excellence, eliminate shift changeover energy waste, detect compressed air leaks, and ensure chemical spill safety.",
    "fullDescription": "Sustainability for Operations and Frontline Teams bridges daily industrial and service operations with environmental excellence. Learn how frontline supervisors, technicians, and shift workers eliminate scrap at the source, execute 5-minute end-of-shift equipment shutdowns, identify costly compressed air leaks (where 85\u201390% of energy is lost as heat), handle and store chemicals safely under GHS, and foster continuous green improvements (Kaizen).",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D2 Working Knowledge",
    "passingScore": 75,
    "primaryCompetency": "COMP_CIRCULARITY",
    "secondaryCompetencies": [
      "COMP_ENERGY",
      "COMP_SOCIAL_COMMUNITY"
    ],
    "learningObjectives": [
      "Apply Lean Green principles to eliminate material scrap, idle machine run-time, and packaging waste.",
      "Execute standardized shift startup and shutdown checklists for industrial equipment and lighting.",
      "Identify and report compressed air leaks and distribution losses based on thermodynamic compressor efficiency data.",
      "Implement Globally Harmonized System (GHS) chemical handling, secondary containment, and spill response."
    ],
    "intendedRoles": [
      "Operations Supervisors",
      "Production Line Leads",
      "Warehouse Foremen",
      "Maintenance Technicians"
    ],
    "badgeName": "Lean Green Operations Leader",
    "badgeDescription": "Demonstrated competence in frontline waste elimination, equipment shutdown discipline, and chemical safety.",
    "completionMessage": "Congratulations! You have completed Sustainability for Operations and Frontline Teams and are now equipped to champion Lean Green excellence on the shop floor.",
    "recommendedNextCourseCode": "ELH-119",
    "lessons": [
      {
        "title": "1. Lean Green: Waste Elimination at the Source",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Merging Lean manufacturing waste reduction (Muda) with environmental resource conservation.",
        "contentBlocks": [
          {
            "id": "elh29-h1",
            "type": "heading",
            "level": 3,
            "text": "Where Efficiency Meets Sustainability on the Shop Floor"
          },
          {
            "id": "elh29-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "In operational and manufacturing environments, environmental waste directly mirrors operational inefficiency. Material scrap, defective re-work, hydraulic leaks, and unoptimized cutting patterns represent wasted raw materials, embodied energy, and disposal costs. By integrating sustainability into daily 5S and Lean management routines, frontline operators become active problem solvers who eliminate waste at the exact point of generation."
          },
          {
            "id": "elh29-c1",
            "type": "callout",
            "variant": "info",
            "title": "The 8th Waste",
            "bodyText": "Traditional Lean targets 7 operational wastes; Lean Green adds the 8th waste: environmental waste (wasted energy, water, emissions, and scrap)."
          }
        ]
      },
      {
        "title": "2. Compressed Air & Shift Handover Discipline",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Tackling compressed air inefficiencies and establishing disciplined shift equipment shutdown protocols.",
        "contentBlocks": [
          {
            "id": "elh29-h2",
            "type": "heading",
            "level": 3,
            "text": "The High Cost of Escaping Air and Idling Motors"
          },
          {
            "id": "elh29-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "Compressed air is among the most expensive utilities in industry: according to US Department of Energy Advanced Manufacturing guidance, only 10% to 15% of electrical energy input becomes usable pneumatic work at the point of use; the remaining 85% to 90% is lost as heat. A single 3mm leak in a 7-bar compressed air line wastes thousands of kilowatt-hours annually in unnecessary electricity draw. Furthermore, when operators fail to shut down conveyors, heaters, and hydraulic power units during shift handovers or meal breaks, substantial idle power is wasted."
          },
          {
            "id": "elh29-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Ultrasonic Audits",
            "bodyText": "Conduct regular ultrasonic leak detection walkthroughs and tag pneumatic joints for immediate repair during scheduled downtime."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Addressing Shop Floor Compressed Air Leaks",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Resolve an operational dilemma involving air line pressure drops and compressor staging.",
        "contentBlocks": [
          {
            "id": "elh29-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Line Pressure Drops on the Packaging Line",
            "prompt": "During peak packaging, pneumatic cylinders are moving sluggishly due to line pressure dropping from 7 bar to 5.5 bar. Audible hissing is heard from 4 hose couplings. The shift supervisor wants to crank up the main air compressor pressure to 9 bar to compensate. What is your operational action?",
            "options": [
              {
                "id": "opt_a",
                "text": "Increase compressor pressure to 9 bar to maintain cylinder speed without stopping the line.",
                "consequence": "Dangerous and expensive. Increasing compressor pressure by 2 bar increases plant electricity draw by 15%, accelerates leak rates through worn hoses, and risks blowing fittings.",
                "feedback": "Raising compressor pressure to compensate for leaks exponentially increases energy waste and equipment failure risk.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Keep compressor pressure at design 7 bar, execute a 15-minute line stop to replace worn quick-connect fittings and O-rings, and restore full pneumatic pressure.",
                "consequence": "Optimal outcome. You eliminate air leaks, restore stable 7-bar pressure to cylinders, protect compressor longevity, and save tens of thousands of rupees in power.",
                "feedback": "Correct! Repairing pneumatic leaks at the source restores operating pressure without inflating compressor energy draw.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Chemical Storage and Spill Containment",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Manage hazardous chemical handling and secondary containment on the factory floor.",
        "contentBlocks": [
          {
            "id": "elh29-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Uncontained Solvent Drum Storage",
            "prompt": "You notice two 200-liter drums of industrial degreasing solvent stored on bare concrete near a stormwater drain without secondary containment bunding. A worker says: 'It's easier to pump from here, and they've never leaked before.' What is your safety and environmental action?",
            "options": [
              {
                "id": "opt_a",
                "text": "Leave the drums in place to avoid disrupting the maintenance team's daily workflow.",
                "consequence": "Severe compliance and environmental hazard. A puncture or valve leak will discharge 400 liters of toxic solvent into the municipal storm drain, causing ecological disaster and heavy prosecution under EPA and OSHA 2005.",
                "feedback": "Storing hazardous liquids without bunding near storm drains is an unacceptable legal and environmental hazard.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Move the drums immediately onto a certified secondary containment spill pallet located away from drains, verify GHS hazard labels, and ensure a spill response kit is stationed nearby.",
                "consequence": "Optimal outcome. You prevent potential chemical discharge into stormwater waterways, ensure OSHA 2005 and EPA compliance, and maintain a safe workspace.",
                "feedback": "Excellent! Secondary containment bunding (110% capacity) and drain isolation prevent catastrophic environmental pollution.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: 5-Minute Shift Handover Checklist",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Implement standard operating procedures for shift changeover equipment shutdown.",
        "contentBlocks": [
          {
            "id": "elh29-h3",
            "type": "heading",
            "level": 3,
            "text": "Standardized Shift Shutdown Discipline"
          },
          {
            "id": "elh29-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Institutionalize a mandatory 5-minute end-of-shift checklist for every production cell: (1) Power down idle conveyor motors, glue heaters, and extraction fans; (2) Close main pneumatic isolation ball valves to eliminate overnight line pressure leaks; and (3) Segregate production scrap into designated recycling bins."
          },
          {
            "id": "elh29-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Post a laminated shift-end equipment power-down checklist at your cell's primary control panel this week."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "According to industrial energy efficiency benchmarks (e.g. US DOE Advanced Manufacturing data), why is compressed air considered one of the most expensive forms of energy in industrial operations?",
        "options": [
          "Air compressors run on liquid gold.",
          "Only 10% to 15% of electrical energy input is converted into usable pneumatic mechanical work at the point of use; the remaining 85%\u201390% is dissipated as waste heat.",
          "Compressed air is heavily taxed by the Ministry of Finance.",
          "Pneumatic tools cannot be turned off."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "Thermodynamic compression losses convert the vast majority of electrical power into heat, making compressed air an expensive energy carrier requiring strict leak management.",
        "incorrectExplanation": "Low thermodynamic efficiency means ~85-90% of electricity input is lost as heat, making every pneumatic leak exceptionally costly.",
        "optionFeedback": [
          "Incorrect. Air compressors use standard grid electricity.",
          "Correct! The thermodynamic reality of compression means 85-90% of electricity is lost as heat, making every pneumatic leak exceptionally costly.",
          "Incorrect. Compressed air generation is subject to standard commercial utility rates.",
          "Incorrect. Modern pneumatic systems feature isolation valves and regulators."
        ],
        "practicalTakeaway": "Treat compressed air as an expensive utility: isolate air lines during downtime and repair leaks immediately.",
        "learningOutcome": "Understand compressed air energy economics and thermodynamic losses",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "What is the recommended operational action when a machine line is scheduled for a 45-minute lunch break?",
        "options": [
          "Leave all motors, hydraulic pumps, heating elements, and exhaust fans running to avoid the effort of pressing start buttons.",
          "Execute a standardized mid-shift shutdown protocol, powering down auxiliary heaters, extraction fans, and conveyors to eliminate idling power draw.",
          "Increase the machine operating speed to 200%.",
          "Unbolt the machine from the concrete floor."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Powering down non-essential equipment during planned operational pauses eliminates significant cumulative idle power draw over annual operating cycles.",
        "incorrectExplanation": "Powering off idling machinery during breaks eliminates substantial energy waste.",
        "optionFeedback": [
          "Incorrect. Leaving machinery idling during breaks wastes thousands of kWh annually.",
          "Correct! Shutting down motors, heating tunnels, and extraction fans during breaks eliminates unnecessary idle baseload power.",
          "Incorrect. Increasing speed during unoccupied breaks is dangerous and wasteful.",
          "Incorrect. Structural anchoring must remain intact for mechanical safety."
        ],
        "practicalTakeaway": "Implement standardized equipment shutdown protocols for breaks and shift changes.",
        "learningOutcome": "Execute operational break and shift shutdown protocols",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "What is the primary purpose of 'secondary containment bunding' (spill pallets) under chemical and oil drums?",
        "options": [
          "To make the drums look taller for ergonomic reach.",
          "To capture and contain any leaks, spills, or ruptures (holding at least 110% of drum volume), preventing hazardous liquids from reaching floors, soil, or stormwater drains.",
          "To absorb sound vibrations from the factory floor.",
          "To store dirty cleaning rags."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Secondary containment bunds prevent chemical spills from escaping into municipal sewers, soil, or waterways, ensuring environmental compliance and worker safety.",
        "incorrectExplanation": "Secondary containment holds spilled liquid to prevent soil and stormwater contamination.",
        "optionFeedback": [
          "Incorrect. Spill pallets are designed for environmental containment, not height adjustment.",
          "Correct! Secondary containment bunds retain 110% of liquid volume, preventing hazardous leaks from contaminating drains and ecosystems.",
          "Incorrect. Spill pallets are containment reservoirs, not acoustic dampeners.",
          "Incorrect. Oily rags must be stored in dedicated fire-rated flammable waste bins."
        ],
        "practicalTakeaway": "Store all liquid chemical drums on certified secondary containment bund pallets.",
        "learningOutcome": "Implement chemical secondary containment standards",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "How does visual 5S + Safety & Sustainability (6S) management improve operational resource efficiency on the shop floor?",
        "options": [
          "By painting all tools gold.",
          "By clearly labeling storage locations, designating waste segregation bins, marking emergency drain shutoffs, and keeping work cells free of clutter and leaks.",
          "By banning frontline workers from asking questions.",
          "By removing all safety signage."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Visual management creates organized, standardized workstations where material scrap is minimized, leaks are detected immediately, and waste sorting is seamless.",
        "incorrectExplanation": "Visual 5S/6S standards standardize waste segregation, hazard identification, and scrap elimination.",
        "optionFeedback": [
          "Incorrect. Tool coding uses standard functional colors, not decorative paint.",
          "Correct! Clear visual marking, shadow boards, and segregated scrap bins streamline operations and eliminate material waste.",
          "Incorrect. Frontline feedback is essential for continuous improvement.",
          "Incorrect. Safety signage is legally mandated under OSHA 2005."
        ],
        "practicalTakeaway": "Maintain standardized visual labeling and segregated scrap bins across all workstations.",
        "learningOutcome": "Apply 5S and visual sustainability management",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "What is the first action an operator should take in the event of a 50-liter chemical or oil spill near a factory drain?",
        "options": [
          "Wash the spill down the drain with a high-pressure water hose.",
          "Immediately deploy drain covers / containment socks from the spill kit to block the drain, alert the area supervisor, and use absorbent pads to contain the fluid.",
          "Leave the area without telling anyone.",
          "Wait 24 hours to see if the chemical evaporates."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Blocking storm and sewer drains prevents catastrophic off-site water pollution; absorbent booms contain and neutralize the spill on site.",
        "incorrectExplanation": "Immediate drain protection and containment with spill kits prevents environmental contamination.",
        "optionFeedback": [
          "Incorrect. Hosing chemicals into drains causes severe environmental crime and water pollution.",
          "Correct! Blocking the drain with spill socks and applying absorbent materials prevents toxic runoff into public waterways.",
          "Incorrect. Unreported spills escalate in severity and endanger colleagues.",
          "Incorrect. Delaying response allows chemicals to spread and penetrate soils."
        ],
        "practicalTakeaway": "Block storm drains first when containing liquid chemical spills.",
        "learningOutcome": "Execute emergency spill response protocols",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "Why should pneumatic isolation ball valves be closed at the end of every operating shift?",
        "options": [
          "To trap compressed air forever inside the pipes.",
          "To isolate production cells from the main air loop, preventing air leaks in hoses and fittings from bleeding the central compressor tank dry overnight.",
          "To increase the speed of the morning shift workers.",
          "To change the chemical composition of air."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Isolating branch air lines prevents continuous overnight leakage through pneumatic cylinders and fittings, allowing central compressors to shut down completely.",
        "incorrectExplanation": "Branch isolation stops overnight leakage and prevents central air compressors from short-cycling.",
        "optionFeedback": [
          "Incorrect. Valves isolate distribution sections for operational efficiency.",
          "Correct! Closing cell isolation valves stops overnight air bleed, allowing central compressors to stay powered down during non-production hours.",
          "Incorrect. Isolation valves control pneumatic fluid, not worker speed.",
          "Incorrect. Valves regulate physical pressure, not atmospheric chemistry."
        ],
        "practicalTakeaway": "Close pneumatic branch isolation valves at the end of every shift.",
        "learningOutcome": "Operate pneumatic isolation controls",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "What is a 'Kaizen' continuous improvement suggestion system in frontline operations?",
        "options": [
          "A system where managers punish workers for making suggestions.",
          "A structured mechanism where frontline operators identify small, everyday operational improvements to eliminate waste, save energy, and improve workplace safety.",
          "A computer game played during lunch breaks.",
          "A mandatory overtime assignment."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Frontline workers have the deepest insight into daily waste; Kaizen suggestion programs empower them to eliminate inefficiencies and share best practices.",
        "incorrectExplanation": "Kaizen suggestion systems engage frontline workers in continuous waste elimination and process improvement.",
        "optionFeedback": [
          "Incorrect. Kaizen empowers and rewards worker contributions.",
          "Correct! Kaizen harnesses frontline expertise to identify practical energy, material, and safety improvements across daily operations.",
          "Incorrect. Kaizen is an established operational excellence methodology.",
          "Incorrect. Kaizen is integrated into standard shift operating routines."
        ],
        "practicalTakeaway": "Encourage and implement frontline suggestions for material scrap and energy reduction.",
        "learningOutcome": "Foster frontline Kaizen continuous improvement",
        "competencyArea": "COMP_CIRCULARITY"
      },
      {
        "question": "Which of the following represents an effective 30-day action commitment for an operations supervisor?",
        "options": [
          "Disabling all safety emergency stop buttons.",
          "Implementing a standardized 5-minute shift-end equipment power-down checklist and organizing an ultrasonic air leak audit on the main line.",
          "Throwing all chemical containers into general trash.",
          "Banning maintenance technicians from entering the floor."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Standardizing shift power-downs and repairing air leaks delivers immediate frontline operational and energy gains.",
        "incorrectExplanation": "Establishing shift-end shutdown checklists and auditing air leaks creates sustainable frontline habits.",
        "optionFeedback": [
          "Incorrect. Disabling emergency stops is a critical life safety violation.",
          "Correct! Institutionalizing shift-end shutdown routines and fixing compressed air leaks drives measurable cost and carbon reductions.",
          "Incorrect. Chemical containers require hazardous waste disposal.",
          "Incorrect. Collaborative maintenance is vital for machine reliability."
        ],
        "practicalTakeaway": "Post shift-end power-down checklists and repair compressed air leaks systematically.",
        "learningOutcome": "Execute operations sustainability action plan",
        "competencyArea": "COMP_CIRCULARITY"
      }
    ]
  },
  {
    "courseCode": "ELH-30",
    "title": "Climate Risk & Workplace Resilience",
    "slug": "climate-risk-workplace-resilience",
    "description": "Prepare for extreme weather, flash floods, tropical cyclones under official MMS warning criteria, and business resilience in Mauritian operations.",
    "fullDescription": "Climate Risk & Workplace Resilience equips managers, safety coordinators, and team leaders to protect employees, physical assets, and business continuity against accelerating climate hazards. Master Mauritius Meteorological Services (MMS) Class I to Class IV cyclone warning criteria, National Disaster Risk Reduction and Management Centre (NDRRMC) protocols, torrential rain flood mitigation, supply chain redundancy, and climate infrastructure adaptation in Small Island Developing States (SIDS).",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D2 Working Knowledge",
    "passingScore": 75,
    "primaryCompetency": "COMP_GHG",
    "secondaryCompetencies": [
      "COMP_SUSTAINABILITY_FOUNDATIONS",
      "COMP_GOVERNANCE_ETHICS"
    ],
    "learningObjectives": [
      "Differentiate physical climate risks (cyclones, flash floods, sea level rise) from regulatory/market transition risks in Mauritius.",
      "Execute workplace Business Continuity Plans (BCP) aligned with Mauritius Meteorological Services (MMS) Class I to Class IV cyclone warning criteria.",
      "Implement physical flood defense measures (sump pumps, deployable flood barriers, drainage clearance).",
      "Ensure employee life safety, secure remote data backups, and plan post-event operational recovery."
    ],
    "intendedRoles": [
      "Risk Managers",
      "Facility Supervisors",
      "Operations Leads",
      "HSE Coordinators",
      "Department Heads"
    ],
    "badgeName": "Climate Resilience Champion",
    "badgeDescription": "Demonstrated competence in physical climate risk assessment, MMS cyclone emergency protocols, and business continuity planning.",
    "completionMessage": "Congratulations! You have completed Climate Risk & Workplace Resilience and are prepared to safeguard your organization against climate disruptions.",
    "recommendedNextCourseCode": "ELH-129",
    "lessons": [
      {
        "title": "1. Physical vs Transition Climate Risks in Mauritius",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Understanding island climate vulnerability, extreme weather trends, and TCFD risk classifications.",
        "contentBlocks": [
          {
            "id": "elh30-h1",
            "type": "heading",
            "level": 3,
            "text": "Climate Hazards Facing Small Island Economies"
          },
          {
            "id": "elh30-t1",
            "type": "short_text",
            "position": 1,
            "bodyText": "Mauritius is highly vulnerable to climate change. Under the Task Force on Climate-related Financial Disclosures (TCFD) framework, corporate climate risks are categorized into: (1) **Physical Risks**: acute events (intense Category 4/5 tropical cyclones, flash flooding from torrential cloudbursts, coastal storm surges) and chronic changes (sea level rise, groundwater salinization, rising ambient temperatures); and (2) **Transition Risks**: carbon taxes, shifting consumer expectations, and green building mandates."
          },
          {
            "id": "elh30-c1",
            "type": "callout",
            "variant": "info",
            "title": "Island Vulnerability",
            "bodyText": "Flash flooding from rapid convective storms can overwhelm urban stormwater channels in Port Louis, Ebene, and coastal zones within 30 minutes, necessitating rapid workplace response protocols."
          }
        ]
      },
      {
        "title": "2. Official MMS Cyclone Warning System & Business Continuity",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Step-by-step organizational actions across the Mauritius Meteorological Services (MMS) Class I to Class IV warning system.",
        "contentBlocks": [
          {
            "id": "elh30-h2",
            "type": "heading",
            "level": 3,
            "text": "Operating Across Official MMS Cyclone Alert Stages"
          },
          {
            "id": "elh30-t2",
            "type": "short_text",
            "position": 1,
            "bodyText": "Under the Mauritius Meteorological Services Tropical Cyclone Warning System (metservice.intnet.mu/tropical-cyclone/warning-system.php), warnings are issued as follows: **Class I**: Issued 36 to 48 hours before the occurrence of gusts of 120 km/h (verify backup generator fuel, test sump pumps, clear roof drains); **Class II**: Issued so as to allow, as far as practicable, 12 hours of daylight before the occurrence of gusts of 120 km/h (secure outdoor equipment, shutter windows, initiate cloud backups); **Class III**: Issued so as to allow, as far as practicable, 6 hours of daylight before the occurrence of gusts of 120 km/h (orderly shutdown and staff dismissal before public transport stops); and **Class IV**: Issued when gusts of 120 km/h are occurring in Mauritius and are expected to continue."
          },
          {
            "id": "elh30-c2",
            "type": "callout",
            "variant": "tip",
            "title": "Life Safety First",
            "bodyText": "Under national safety directives, employee dismissal must occur in daylight and well before severe weather closes public transit and roads."
          }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Responding to a Torrential Rain Warning",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Manage emergency response when sudden flash flood warnings hit during standard office hours.",
        "contentBlocks": [
          {
            "id": "elh30-s1",
            "type": "interactive_scenario",
            "title": "Scenario: Flash Flood Emergency at 11:30 AM",
            "prompt": "The Mauritius Meteorological Services issues a Torrential Rain Warning with immediate effect at 11:30 AM. Stormwater is already rising rapidly in the parking lot near a low-lying commercial park, and access roads are beginning to submerge. What is the management decision?",
            "options": [
              {
                "id": "opt_a",
                "text": "Instruct employees to stay at their desks and complete their normal shift until 17:00 to meet client delivery deadlines.",
                "consequence": "Catastrophic safety failure. Staff become trapped by flooded roads, vehicles are submerged in the parking lot, and employees face extreme life-threatening hazards trying to return home after dark.",
                "feedback": "Delaying employee release during torrential flood warnings traps workers and exposes them to severe life safety risks.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Initiate the Torrential Rain Protocol immediately: activate flood barriers at basement entrances, secure server failovers, and organize orderly, phased staff dismissal before arterial roads become impassable.",
                "consequence": "Optimal outcome. All employees reach home safely, critical physical assets and basements are secured against flood ingress, and operations transition to secure remote mode.",
                "feedback": "Correct! Prioritizing human life safety and executing physical flood protection protects both people and assets.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Infrastructure Hardening for Solar Panels",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Evaluate structural resilience for rooftop solar photovoltaic installations before cyclone season.",
        "contentBlocks": [
          {
            "id": "elh30-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Rooftop Solar Mounting Integrity",
            "prompt": "Ahead of the summer cyclone season, a structural inspection reveals that 20% of mounting clamps on your building's 50 kWp rooftop solar PV array have loose fasteners and minor corrosion. What is your resilience action?",
            "options": [
              {
                "id": "opt_a",
                "text": "Ignore the loose clamps because the panels survived minor winter storms without falling off.",
                "consequence": "Catastrophic structural failure. High cyclonic wind gusts (>120\u2013200 km/h) will rip the loose panels off the roof, creating lethal airborne projectiles and causing extensive building damage.",
                "feedback": "Cyclonic wind shear exploits any loose mounting; unsecured panels become deadly flying debris.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Schedule an immediate engineering retrofit with marine-grade stainless steel fasteners, torque-verify all clamps to cyclonic wind-load standards (250 km/h rating), and update the pre-cyclone inspection log.",
                "consequence": "Optimal outcome. The solar installation is fully secured against extreme cyclone gusts, protecting the renewable energy asset and surrounding building structures.",
                "feedback": "Excellent! Pre-season structural hardening and wind-load verification prevent catastrophic asset destruction and liability.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Departmental Climate Emergency Plan",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Review and update your department's emergency contact tree and physical asset shutdown checklist.",
        "contentBlocks": [
          {
            "id": "elh30-h3",
            "type": "heading",
            "level": 3,
            "text": "The Workplace Climate Resilience Checklist"
          },
          {
            "id": "elh30-t3",
            "type": "short_text",
            "position": 1,
            "bodyText": "Establish an annual pre-cyclone season routine: (1) Verify that all employee emergency phone numbers and home district locations are updated in HR systems; (2) Test backup power generators under full load for 30 minutes; (3) Clean rooftop rainwater gutters and inspect basement sump pumps; and (4) Verify remote cloud data synchronization."
          },
          {
            "id": "elh30-c3",
            "type": "callout",
            "variant": "action",
            "title": "Workplace Action",
            "bodyText": "Conduct an emergency contact tree test with your team this week and verify that all members know their cyclone warning dismissal procedures."
          }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the difference between 'Physical Climate Risks' and 'Transition Climate Risks' under the TCFD framework?",
        "options": [
          "Physical risks are imaginary; transition risks are real.",
          "Physical risks relate to direct weather and climate impacts (cyclones, floods, sea level rise); transition risks relate to policy, legal, market, and technology shifts during the transition to a low-carbon economy.",
          "Physical risks only affect athletes; transition risks affect teachers.",
          "There is no difference between the two terms."
        ],
        "correctOption": 1,
        "orderIndex": 0,
        "correctExplanation": "Physical risks encompass direct climate damage to assets and supply chains; transition risks encompass carbon pricing, regulatory changes, and market shifts.",
        "incorrectExplanation": "Physical risks refer to acute and chronic weather impacts; transition risks refer to societal and economic shifts toward low-carbon operations.",
        "optionFeedback": [
          "Incorrect. Both risk categories represent material financial and operational risks.",
          "Correct! Physical risks cover direct extreme weather and climate damage; transition risks cover carbon taxes, regulatory mandates, and changing market demand.",
          "Incorrect. Climate risks impact all commercial and industrial sectors.",
          "Incorrect. Distinguishing physical from transition risk is fundamental to corporate climate governance."
        ],
        "practicalTakeaway": "Assess both physical weather vulnerability and regulatory transition risks in your annual risk register.",
        "learningOutcome": "Differentiate physical from transition climate risks",
        "competencyArea": "COMP_GHG"
      },
      {
        "question": "Under the official Mauritius Meteorological Services (MMS) Tropical Cyclone Warning System, what is the specific criteria for issuing a Cyclone Warning Class II?",
        "options": [
          "Issued when the cyclone has completely dissipated.",
          "Issued so as to allow, as far as practicable, 12 hours of daylight before the occurrence of gusts of 120 km/h.",
          "Issued when all roads are permanently closed.",
          "Issued when sea waves reach 100 meters in height."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "According to the Mauritius Meteorological Services (metservice.intnet.mu/tropical-cyclone/warning-system.php), a Class II warning is issued so as to allow, as far as practicable, 12 hours of daylight before the occurrence of gusts of 120 km/h, providing the essential operational window to secure physical assets and prepare staff transport.",
        "incorrectExplanation": "Class II is issued so as to allow, as far as practicable, 12 hours of daylight before gusts reach 120 km/h.",
        "optionFeedback": [
          "Incorrect. A cyclone termination bulletin is issued after the threat dissipates.",
          "Correct! MMS defines Class II as being issued so as to allow, as far as practicable, 12 hours of daylight before the occurrence of gusts of 120 km/h.",
          "Incorrect. Road closures typically occur during Class III/IV.",
          "Incorrect. Wave heights are tracked via marine bulletins, not the Class II definition criteria."
        ],
        "practicalTakeaway": "Use the Class II daylight window to secure rooftop assets, test backup generators, and finalize employee transport plans.",
        "learningOutcome": "Execute Cyclone Class II preparedness protocols under official MMS criteria",
        "competencyArea": "COMP_GHG"
      },
      {
        "question": "Why is clearing rooftop rainwater drainage gutters and inspection pits an essential pre-cyclone task?",
        "options": [
          "To find lost coins on the roof.",
          "Blocked drains cause massive rainwater ponding on flat roofs, leading to roof collapses, ceiling leaks, electrical short-circuits, and interior flooding.",
          "To improve cell phone reception.",
          "Rooftop drains should always be blocked to conserve water."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Torrential cyclonic rain dumps hundreds of millimeters of water in hours. Blocked gutters create extreme hydraulic weight and severe interior flood damage.",
        "incorrectExplanation": "Clearing gutters prevents structural roof ponding, ceiling collapse, and electrical short circuits.",
        "optionFeedback": [
          "Incorrect. Gutter cleaning is a critical structural maintenance task.",
          "Correct! Torrential rain on blocked roofs creates dangerous hydraulic load, causing structural damage, ceiling collapses, and electrical fires.",
          "Incorrect. Roof drainage is unrelated to telecommunication signals.",
          "Incorrect. Blocking drains during extreme storms causes catastrophic flooding."
        ],
        "practicalTakeaway": "Clear all roof drains and stormwater grates before every cyclone season.",
        "learningOutcome": "Maintain storm drainage infrastructure",
        "competencyArea": "COMP_GHG"
      },
      {
        "question": "What is the primary objective of a workplace Business Continuity Plan (BCP) during an extreme weather emergency?",
        "options": [
          "Ensuring human life safety first, safeguarding critical physical assets and data, and enabling rapid operational recovery after the hazard passes.",
          "Maximizing sales revenue during the peak of the hurricane.",
          "Canceling employee contracts immediately.",
          "Preventing employees from contacting their families."
        ],
        "correctOption": 0,
        "orderIndex": 3,
        "correctExplanation": "A robust BCP prioritizes human safety, protects physical infrastructure and data integrity, and establishes protocols for rapid resumption of operations.",
        "incorrectExplanation": "Life safety, asset protection, and rapid recovery form the foundation of business continuity planning.",
        "optionFeedback": [
          "Correct! BCP protocols place human life safety first, followed by asset protection and structured operational resumption.",
          "Incorrect. Commercial sales are secondary to employee safety during natural disasters.",
          "Incorrect. Emergency protocols protect employment relationships and continuity.",
          "Incorrect. Family communication and emergency contact are essential during disasters."
        ],
        "practicalTakeaway": "Regularly test and update your departmental Business Continuity Plan.",
        "learningOutcome": "Execute Business Continuity Plans during climate emergencies",
        "competencyArea": "COMP_GHG"
      },
      {
        "question": "Why are basement parking garages and sub-grade utility rooms particularly vulnerable during flash flood events in urban Mauritius?",
        "options": [
          "Basements are closer to the Earth's magma core.",
          "Stormwater runoff naturally flows to the lowest topographic point; without automatic sump pumps, check valves, and deployed flood gates, water rapidly floods electrical switchgear and vehicles.",
          "Basements do not have walls.",
          "Water never enters basement areas."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Basement areas accumulate surface runoff rapidly during flash floods. Critical electrical panels and pumps located below ground level face severe submersion risk.",
        "incorrectExplanation": "Sub-grade infrastructure is highly vulnerable to rapid stormwater accumulation and requires active flood barriers.",
        "optionFeedback": [
          "Incorrect. Flood risk is driven by surface topography and gravity, not geothermal heat.",
          "Correct! Surface runoff gravitates to low basement ramps; flood gates and reliable sump pumps are essential to protect critical electrical assets.",
          "Incorrect. Structural basements have concrete walls but open access ramps.",
          "Incorrect. Basements are among the most flood-prone areas in commercial real estate."
        ],
        "practicalTakeaway": "Install automatic sump pumps and deployable flood barriers at all basement entrance ramps.",
        "learningOutcome": "Protect sub-grade and basement assets from flood ingress",
        "competencyArea": "COMP_GHG"
      },
      {
        "question": "How can companies build resilience against climate-induced supply chain disruptions (e.g. port closures due to heavy sea swells)?",
        "options": [
          "Maintaining zero inventory and relying on instant same-day delivery during hurricanes.",
          "Maintaining safety buffer stocks of critical components, qualifying alternative local suppliers, and diversifying logistics routes.",
          "Banning all shipping vessels from entering the country.",
          "Selling all company delivery vehicles."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Island supply chains depend on sea and air ports. Buffer inventory and local supplier diversification insulate operations against extended port closures.",
        "incorrectExplanation": "Buffer stocks and supplier diversification protect operations against weather-related transport shutdowns.",
        "optionFeedback": [
          "Incorrect. Zero-inventory (pure JIT) collapses immediately during storm port closures.",
          "Correct! Strategic buffer stocks of critical supplies and dual-sourcing with local vendors build resilience against maritime logistics delays.",
          "Incorrect. Port trade is vital for island commerce.",
          "Incorrect. Selling transport fleets eliminates delivery capability."
        ],
        "practicalTakeaway": "Identify single-point-of-failure supplies and maintain strategic safety buffers.",
        "learningOutcome": "Mitigate supply chain climate vulnerabilities",
        "competencyArea": "COMP_GHG"
      },
      {
        "question": "What safety protocol should be followed before re-occupying a workplace building after a severe Class IV cyclone has passed?",
        "options": [
          "Immediately turn on all electrical equipment and touch downed outdoor cables.",
          "A formal facility inspection must verify structural integrity, ensure no live fallen power lines exist, test water potability, and verify that flooded areas are safe before allowing staff entry.",
          "Force employees to climb damaged roofs immediately.",
          "Ignore all government safety advisories."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Post-disaster recovery requires systematic safety sweeps: verifying electrical safety, checking structural damage, and ensuring safe road access before re-entry.",
        "incorrectExplanation": "Systematic inspection of electrical, structural, and sanitary conditions is mandatory before building re-entry.",
        "optionFeedback": [
          "Incorrect. Touching downed cables carries fatal electrocution risk.",
          "Correct! Qualified facility safety inspections must verify electrical safety, structural stability, and water sanitation before normal occupancy resumes.",
          "Incorrect. Climbing damaged roofs without fall protection causes fatal falls.",
          "Incorrect. Re-entry must comply with official NDRRMC safety clearance directives."
        ],
        "practicalTakeaway": "Conduct a structured safety walkthrough before re-opening facilities post-cyclone.",
        "learningOutcome": "Execute safe post-disaster facility recovery",
        "competencyArea": "COMP_GHG"
      },
      {
        "question": "Which of the following represents an effective 30-day workplace climate resilience action commitment?",
        "options": [
          "Deleting all employee emergency contact information.",
          "Conducting a facility flood and cyclone risk audit, clearing roof drains, testing backup generator transfer switches, and updating staff emergency notification trees.",
          "Leaving outdoor construction scaffolding unsecured during summer.",
          "Canceling commercial property insurance."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Proactive facility audits, drainage clearing, backup power testing, and communication verification build robust operational climate resilience.",
        "incorrectExplanation": "Comprehensive pre-season audits, drain clearing, and generator testing ensure emergency readiness.",
        "optionFeedback": [
          "Incorrect. Emergency contact records are essential for disaster communication.",
          "Correct! Pre-season risk audits, drain clearing, backup power testing, and updated emergency trees build comprehensive climate readiness.",
          "Incorrect. Unsecured scaffolding becomes lethal cyclonic debris.",
          "Incorrect. Property insurance is critical for financial climate risk transfer."
        ],
        "practicalTakeaway": "Audit your facility's physical storm defenses and update employee emergency contact trees.",
        "learningOutcome": "Execute climate resilience action commitment",
        "competencyArea": "COMP_GHG"
      }
    ]
  }
];

// Helper to execute Batch 2 remediation
export async function ensureBatch2Remediation(): Promise<void> {
  logger.info("Starting Sprint 15.2.4 Batch 2 controlled course remediation...");

  for (const def of BATCH_2_REMEDIATED_COURSES) {
    const [existingCourse] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, def.courseCode))
      .limit(1);

    if (!existingCourse) {
      logger.warn({ code: def.courseCode }, "Course not found in database; skipping.");
      continue;
    }

    const nextVersion = 2;

    // 1. Update course metadata and bump version to 2
    await db
      .update(coursesTable)
      .set({
        title: def.title,
        description: def.description,
        fullDescription: def.fullDescription,
        durationMinutes: def.durationMinutes,
        priceUsd: def.priceUsd,
        level: def.level,
        passingScore: def.passingScore,
        learningObjectives: def.learningObjectives,
        intendedRoles: def.intendedRoles,
        primaryCompetency: def.primaryCompetency,
        secondaryCompetencies: def.secondaryCompetencies,
        badgeName: def.badgeName,
        badgeDescription: def.badgeDescription,
        completionMessage: def.completionMessage,
        version: nextVersion,
        isPublished: true,
        status: "published",
        updatedAt: new Date(),
      })
      .where(eq(coursesTable.id, existingCourse.id));

    // 2. Remove previous lessons and quiz questions for this course
    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, existingCourse.id));
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, existingCourse.id));

    // 3. Insert new Version 2 structured lessons
    for (const l of def.lessons) {
      await db.insert(lessonsTable).values({
        courseId: existingCourse.id,
        title: l.title,
        orderIndex: l.orderIndex,
        durationMinutes: l.durationMinutes,
        content: l.content,
        contentBlocks: l.contentBlocks,
      });
    }

    // 4. Insert new Version 2 assessment questions
    for (const q of def.quizQuestions) {
      await db.insert(quizQuestionsTable).values({
        courseId: existingCourse.id,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        orderIndex: q.orderIndex,
        correctExplanation: q.correctExplanation,
        incorrectExplanation: q.incorrectExplanation,
        optionFeedback: q.optionFeedback,
        practicalTakeaway: q.practicalTakeaway,
        learningOutcome: q.learningOutcome,
        competencyArea: q.competencyArea,
      });
    }

    logger.info(
      { code: def.courseCode, courseId: existingCourse.id, version: nextVersion, lessonsCount: def.lessons.length, quizCount: def.quizQuestions.length },
      "Remediated Batch 2 course successfully."
    );
  }

  logger.info("Sprint 15.2.4 Batch 2 remediation completed.");
}

// Forward-only version-safe rollback engine for Batch 2
export async function executeVersionSafeRollbackBatch2(
  courseCode: string,
  snapshotContent: {
    title?: string;
    description?: string;
    lessons?: any[];
    quizQuestions?: any[];
  }
): Promise<number> {
  const [course] = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.courseCode, courseCode))
    .limit(1);

  if (!course) {
    throw new Error(`Course ${courseCode} not found for rollback`);
  }

  const currentVersion = course.version;
  const nextVersion = currentVersion + 1; // Strict monotonic forward increment (e.g. v2 -> v3)

  await db
    .update(coursesTable)
    .set({
      title: snapshotContent.title || course.title,
      description: snapshotContent.description || course.description,
      version: nextVersion,
      updatedAt: new Date(),
    })
    .where(eq(coursesTable.id, course.id));

  if (snapshotContent.lessons && snapshotContent.lessons.length > 0) {
    await db.delete(lessonsTable).where(eq(lessonsTable.courseId, course.id));
    for (const l of snapshotContent.lessons) {
      await db.insert(lessonsTable).values({
        courseId: course.id,
        title: l.title,
        orderIndex: l.orderIndex,
        durationMinutes: l.durationMinutes || 10,
        content: l.content || "",
        contentBlocks: l.contentBlocks || [],
      });
    }
  }

  if (snapshotContent.quizQuestions && snapshotContent.quizQuestions.length > 0) {
    await db.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, course.id));
    for (const q of snapshotContent.quizQuestions) {
      await db.insert(quizQuestionsTable).values({
        courseId: course.id,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        orderIndex: q.orderIndex,
        correctExplanation: q.correctExplanation || "",
        incorrectExplanation: q.incorrectExplanation || "",
        optionFeedback: q.optionFeedback || [],
        practicalTakeaway: q.practicalTakeaway || "",
      });
    }
  }

  logger.info({ code: courseCode, previousVersion: currentVersion, rolledBackToNewVersion: nextVersion }, "Batch 2 forward rollback executed successfully.");
  return nextVersion;
}
