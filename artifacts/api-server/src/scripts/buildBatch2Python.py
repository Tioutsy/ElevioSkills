#!/usr/bin/env python3
import json
import os

courses = [
  # 1. ELH-03: Energy Efficiency at Work (D1)
  {
    "courseCode": "ELH-03",
    "title": "Energy Efficiency at Work",
    "slug": "energy-efficiency-at-work",
    "description": "Learn practical, zero-cost operational habits to eliminate workplace energy waste, understand peak demand tariffs, and optimize HVAC and office equipment.",
    "fullDescription": "Energy Efficiency at Work provides employees across all departments with practical, actionable knowledge to reduce electricity waste in commercial buildings. You will discover how daily operational habits directly lower utility costs and reduce thermal generation emissions on the national grid.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D1 Awareness",
    "passingScore": 75,
    "primaryCompetency": "COMP_ENERGY",
    "secondaryCompetencies": ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_GHG"],
    "learningObjectives": [
      "Identify the major sources of electricity waste in commercial office and facility environments.",
      "Apply the 24°C standard thermostat guideline and understand zone conditioning principles.",
      "Execute effective computer, screen, and standby power management protocols.",
      "Recognize the financial and environmental implications of peak demand electricity tariffs in Mauritius."
    ],
    "intendedRoles": ["All Employees", "Office Administrators", "Department Coordinators", "Team Leads"],
    "badgeName": "Workplace Energy Champion",
    "badgeDescription": "Demonstrated awareness of operational energy conservation and peak demand management.",
    "completionMessage": "Congratulations! You have mastered workplace energy efficiency fundamentals and can now champion smart consumption habits across your department.",
    "recommendedNextCourseCode": "ELH-27",
    "lessons": [
      {
        "title": "1. The True Cost of Invisible Energy Waste",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Understanding how standby power, unmanaged lighting, and excessive cooling quietly drain operating budgets and drive thermal power generation.",
        "contentBlocks": [
          { "id": "elh03-h1", "type": "heading", "level": 3, "text": "The Invisible Energy Leak in Everyday Operations" },
          { "id": "elh03-t1", "type": "short_text", "position": 1, "bodyText": "In most commercial buildings, 15% to 30% of total electricity consumption occurs when spaces are completely unoccupied. Standby power from unused monitors, desktop printers, decorative lighting, and poorly scheduled air conditioning units runs continuously through nights and weekends. Because electricity is invisible, employees rarely notice the cumulative cost of leaving workstations powered on." },
          { "id": "elh03-c1", "type": "callout", "variant": "info", "title": "Mauritian Grid Reality", "bodyText": "Electricity purchased from the Central Electricity Board (CEB) grid is predominantly generated from thermal power stations using imported heavy fuel oil and coal. Every kilowatt-hour (kWh) wasted in your office translates directly into fossil fuel combustion and atmospheric emissions." }
        ]
      },
      {
        "title": "2. HVAC Optimization: The 24°C Comfort Standard",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Mastering air conditioning temperature setpoints, door sealing, and solar heat gain control.",
        "contentBlocks": [
          { "id": "elh03-h2", "type": "heading", "level": 3, "text": "Air Conditioning Efficiency Without Sacrificing Comfort" },
          { "id": "elh03-t2", "type": "short_text", "position": 1, "bodyText": "Air conditioning accounts for 50% to 70% of total electrical energy in tropical commercial buildings. A widespread misconception is that setting the thermostat to 18°C cools an office faster. In reality, the AC compressor works at full capacity regardless; setting it excessively low simply causes overcooling, thermal discomfort, and massive energy waste. Each 1°C increase in the setpoint saves approximately 5% to 7% in cooling energy." },
          { "id": "elh03-c2", "type": "callout", "variant": "tip", "title": "Operational Rule", "bodyText": "Maintain thermostats at 24°C. Ensure all exterior windows and doors remain closed while AC units operate, and draw blinds on sun-facing facades during afternoon peak heat." }
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
            "prompt": "It is 17:45 on a Friday. You notice that the central open-plan office AC is still humming at 19°C, two conference room lights are on, and several desktop workstations are left running with screensavers active. The team has left for a long weekend. What is the most effective operational action?",
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
            "title": "Scenario: Scheduling High-Power Maintenance Tasks",
            "prompt": "Your facility needs to run heavy industrial carpet cleaners and thermal sterilizing equipment. Your commercial utility contract incurs significant Maximum Demand (kVA) surcharges during peak hours (18:00 to 21:00 on weekdays). When should you schedule this operation?",
            "options": [
              {
                "id": "opt_a",
                "text": "Run the equipment between 18:30 and 20:30 during the evening shift change to avoid daytime office staff.",
                "consequence": "Severe cost penalty. Running high-draw inductive equipment during peak grid hours spikes the building's maximum demand tariff for the entire billing month.",
                "feedback": "Peak tariff hours carry heavy demand surcharges; avoid running optional heavy loads during this window.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Schedule the deep cleaning during off-peak morning hours (06:00 to 08:00) or on weekend mornings when facility base load is low.",
                "consequence": "Optimal outcome. You avoid peak demand charges, lower utility bills, and utilize off-peak grid capacity.",
                "feedback": "Correct! Shifting discretionary energy-intensive tasks to off-peak periods optimizes operational load and protects budget margins.",
                "score": 100
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: 30-Day Plug Load Audit",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Establish an operational plug-load checklist and personal energy-saving commitment for your department.",
        "contentBlocks": [
          { "id": "elh03-h3", "type": "heading", "level": 3, "text": "Departmental Energy Action Checklist" },
          { "id": "elh03-t3", "type": "short_text", "position": 1, "bodyText": "Transforming energy awareness into habit requires clear daily routines. Commit to these three non-negotiable workplace actions: (1) Configure your laptop/PC display sleep timer to 5 minutes of inactivity; (2) Verify that shared departmental appliances (microwave displays, water dispensers with heaters) are connected to timer switches; and (3) Report faulty door seals or rattling AC filters to facilities maintenance immediately." },
          { "id": "elh03-c3", "type": "callout", "variant": "action", "title": "30-Day Commitment", "bodyText": "Conduct an end-of-day walkthrough in your immediate work area for two consecutive weeks, logging and powering off unneeded equipment before departure." }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the recommended standard thermostat setpoint for commercial office air conditioning to balance employee comfort and energy efficiency?",
        "options": ["18°C", "21°C", "24°C", "28°C"],
        "correctOption": 2,
        "orderIndex": 0,
        "correctExplanation": "24°C is the internationally recognized standard for commercial office comfort in tropical climates, optimizing cooling performance while preventing excessive compressor energy consumption.",
        "incorrectExplanation": "Lower temperatures (such as 18°C or 21°C) increase energy consumption by 5% to 7% per degree without speeding up the cooling process.",
        "optionFeedback": [
          "Incorrect. 18°C causes overcooling, thermal discomfort, and up to 35% higher AC electricity consumption.",
          "Incorrect. 21°C is unnecessarily low for typical office clothing and increases compressor workload.",
          "Correct! 24°C maintains comfortable indoor thermal conditions while minimizing avoidable grid electricity draw.",
          "Incorrect. 28°C may lead to heat discomfort and reduced cognitive productivity in closed office environments."
        ],
        "practicalTakeaway": "Keep thermostats set to 24°C rather than dropping them to lowest extremes.",
        "learningOutcome": "Apply standard thermostat guidelines",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "How does setting an office thermostat to 18°C impact the time required to cool down a warm conference room?",
        "options": [
          "It cools the room twice as fast because the air conditioner runs at higher cooling velocity.",
          "It does not cool the room faster; the AC cools at the same rate but continues running longer, wasting electricity.",
          "It immediately triggers emergency cooling mode on modern inverter split units.",
          "It halves the total electrical energy consumed by reaching target temperatures quickly."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Standard air conditioners output air at the same design temperature regardless of the thermostat setpoint. Lowering the number does not accelerate cooling; it only forces the unit to run continuously past comfortable levels.",
        "incorrectExplanation": "Thermostats control when the compressor stops, not the speed or intensity of cold air delivery.",
        "optionFeedback": [
          "Incorrect. Thermostats do not increase cooling speed; they only define the target shutoff temperature.",
          "Correct! The cooling rate is constant; setting an extreme low setpoint simply ensures the unit overcools and wastes energy.",
          "Incorrect. Commercial AC systems do not have accelerated emergency cooling triggered by low thermostat inputs.",
          "Incorrect. Extreme low settings significantly increase total energy consumption."
        ],
        "practicalTakeaway": "Thermostat setpoints determine target temperature, not cooling speed.",
        "learningOutcome": "Understand cooling mechanics and setpoint behaviors",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "What is 'vampire power' (phantom load) in a commercial workplace setting?",
        "options": [
          "Electricity illegally tapped from external municipal power lines.",
          "Power consumed by electronic devices and appliances while in standby or turned off but plugged in.",
          "The surge in power draw that occurs when large electric motors start up.",
          "Solar power generated during night-time moonlight reflection."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "Vampire power refers to the continuous electric current drawn by transformers, displays, power bricks, and standby circuits even when the host device is powered down.",
        "incorrectExplanation": "Vampire load is standard standby electricity loss across plugged-in electronics.",
        "optionFeedback": [
          "Incorrect. That describes illegal utility theft, not phantom load.",
          "Correct! Standby electronics and power supplies consume continuous electricity 24/7 unless switched off at the wall or power strip.",
          "Incorrect. That describes inrush current, not phantom load.",
          "Incorrect. Moonlight cannot generate solar power."
        ],
        "practicalTakeaway": "Use switchable power strips to eliminate phantom load from workstation peripherals overnight.",
        "learningOutcome": "Identify major sources of standby electricity waste",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "An employee leaves their computer monitor on with an animated 3D screensaver every night. What is the impact compared to enabling display sleep mode?",
        "options": [
          "The screensaver consumes virtually zero power because modern LCD pixels do not use electricity.",
          "The screensaver keeps the monitor and graphics card at full operating power, consuming up to 30–50W continuously for 14+ hours nightly.",
          "The screensaver extends monitor lifespan by preventing power-cycling wear.",
          "The screensaver generates credit with the grid operator by maintaining constant network activity."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Animated screensavers prevent graphics cards and monitors from entering low-power sleep mode, wasting hundreds of kWh over the course of a year across an enterprise.",
        "incorrectExplanation": "Display sleep mode reduces power draw to under 1W; screensavers keep active rendering circuits powered.",
        "optionFeedback": [
          "Incorrect. LCD backlights and active rendering consume full operational wattage while displaying screensavers.",
          "Correct! Display sleep mode drops monitor power to <1W, whereas screensavers keep full display and rendering power active all night.",
          "Incorrect. Modern LCD and LED displays do not suffer from cathode-ray burn-in and benefit from powering down.",
          "Incorrect. Screensavers generate no grid credits."
        ],
        "practicalTakeaway": "Enable automated 5-minute display sleep in operating system power preferences.",
        "learningOutcome": "Execute effective computer and display power management",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "Which of the following represents the most energy-efficient lighting practice in an office with abundant natural daylight?",
        "options": [
          "Keeping all overhead fluorescent fixtures on full brightness to maintain uniform aesthetic appearance.",
          "Utilizing daylight harvesting by switching off perimeter row lighting and relying on natural light.",
          "Closing all window blinds tightly and using artificial desk halogen lamps.",
          "Replacing LED lights with high-intensity discharge lamps."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Daylight harvesting utilizes natural perimeter sunlight to illuminate workspaces, enabling perimeter electrical fixtures to be switched off or dimmed.",
        "incorrectExplanation": "Artificial lighting should supplement daylight, not duplicate it when natural light is adequate.",
        "optionFeedback": [
          "Incorrect. Burning artificial lights in brightly daylighted areas is pure electricity waste.",
          "Correct! Turning off perimeter lights when natural daylight is sufficient saves up to 40% of daytime lighting energy.",
          "Incorrect. Blocking daylight in order to run artificial lamps doubles energy consumption.",
          "Incorrect. High-intensity discharge lamps use significantly more power than modern LEDs."
        ],
        "practicalTakeaway": "Turn off perimeter lighting banks when sunlight provides sufficient working illumination.",
        "learningOutcome": "Apply zone lighting and daylight harvesting practices",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "What is the primary commercial reason for avoiding heavy discretionary electricity usage during peak tariff hours (e.g., 18:00–21:00)?",
        "options": [
          "Electricity grid frequencies drop to dangerous levels that damage light bulbs.",
          "Commercial electricity tariffs charge premium rates and kVA maximum demand penalties during peak periods.",
          "Mauritian labour regulations prohibit equipment operation after sunset.",
          "Electricity meters cannot record energy consumption during evening hours."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "Commercial tariffs enforce higher rates and maximum demand penalties during peak hours to discourage grid overload; shifting loads saves substantial money.",
        "incorrectExplanation": "Tariff structures penalize peak-period maximum power draw to incentivize load shifting.",
        "optionFeedback": [
          "Incorrect. Grid voltage and frequency are regulated to prevent appliance damage.",
          "Correct! Utility tariffs apply peak kVA surcharges; spikes during these windows inflate commercial electricity bills for the whole month.",
          "Incorrect. Labour laws regulate shift rest and safety, not electrical equipment operation schedules.",
          "Incorrect. Digital smart meters record hourly interval data continuously."
        ],
        "practicalTakeaway": "Shift non-urgent energy-intensive operations (charging, heavy cleaning) outside peak tariff hours.",
        "learningOutcome": "Recognize peak demand tariffs and commercial implications",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "You notice that the main entrance glass double doors of your air-conditioned office building do not close fully, leaving a 10cm gap. What is the operational impact?",
        "options": [
          "It improves indoor air quality by providing free natural ventilation alongside mechanical cooling.",
          "It forces the AC system to constantly cool warm, humid outdoor air, significantly increasing compressor workload and electricity costs.",
          "It has no measurable impact because cooled air is heavier and stays inside.",
          "It reduces HVAC maintenance requirements by relieving interior static air pressure."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Unsealed doors in tropical environments allow massive infiltration of warm, humid air, forcing AC chillers to work continuously to extract heat and moisture.",
        "incorrectExplanation": "Conditioned air escapes while hot ambient air rushes in, dramatically driving up chiller power consumption.",
        "optionFeedback": [
          "Incorrect. Controlled ventilation requires dedicated filters, not uncontrolled warm air leaks through doors.",
          "Correct! Thermal infiltration through unsealed doors creates continuous heat load and moisture buildup, spiking cooling bills.",
          "Incorrect. Air exchange occurs rapidly through pressure differentials and air turbulence.",
          "Incorrect. Air leaks increase wear and tear on cooling coils and compressors."
        ],
        "practicalTakeaway": "Ensure automatic door closers are adjusted and report broken seals promptly.",
        "learningOutcome": "Identify building envelope leaks and thermal infiltration",
        "competencyArea": "COMP_ENERGY"
      },
      {
        "question": "Which of the following actions represents an effective personal 30-day workplace energy commitment?",
        "options": [
          "Purchasing a personal diesel generator for your desk.",
          "Configuring PC display sleep to 5 minutes, powering down peripherals at night, and verifying meeting room AC is switched off after use.",
          "Refusing to use computers or email for all business correspondence.",
          "Replacing building electrical meters with uncalibrated bypass devices."
        ],
        "correctOption": 1,
        "orderIndex": 7,
        "correctExplanation": "Practical personal commitments focus on consistent daily habits: sleep timers, plug load shutdowns, and verifying space conditioning upon leaving.",
        "incorrectExplanation": "Effective energy efficiency balances productivity with disciplined elimination of unneeded load.",
        "optionFeedback": [
          "Incorrect. Diesel generators increase emissions and cost.",
          "Correct! Disciplined workstation plug management and shared space shutdown form the foundation of corporate energy culture.",
          "Incorrect. Discontinuing digital communication cripples commercial operations.",
          "Incorrect. Bypassing utility meters is illegal and dangerous."
        ],
        "practicalTakeaway": "Build daily habits around power strip shutdown and room departure checks.",
        "learningOutcome": "Execute workplace action commitment",
        "competencyArea": "COMP_ENERGY"
      }
    ]
  },

  # 2. ELH-04: Water Conservation in the Workplace (D1)
  {
    "courseCode": "ELH-04",
    "title": "Water Conservation in the Workplace",
    "slug": "water-conservation-workplace",
    "description": "Discover practical operational techniques to detect silent plumbing leaks, optimize commercial washroom efficiency, and build workplace water stewardship.",
    "fullDescription": "Water Conservation in the Workplace equips employees with the knowledge needed to protect precious freshwater resources in commercial and industrial settings. Learn how to identify silent cistern leaks, report plumbing faults effectively, utilize aeration controls, and foster a workplace culture of water stewardship in island environments.",
    "categoryId": 1,
    "durationMinutes": 20,
    "priceUsd": "0.00",
    "level": "D1 Awareness",
    "passingScore": 75,
    "primaryCompetency": "COMP_WATER",
    "secondaryCompetencies": ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_CIRCULARITY"],
    "learningObjectives": [
      "Understand the island water cycle, reservoir vulnerability, and municipal supply dynamics in Mauritius.",
      "Identify and perform simple diagnostic checks for silent toilet cistern and valve leaks.",
      "Recognize the efficiency gains of low-flow tap aerators, dual-flush controls, and sensor taps.",
      "Implement everyday water conservation behaviors in staff cafeterias, pantries, and washrooms."
    ],
    "intendedRoles": ["All Employees", "Facility Staff", "Office Managers", "Hospitality Frontline"],
    "badgeName": "Water Stewardship Champion",
    "badgeDescription": "Demonstrated competence in workplace leak detection and water conservation practices.",
    "completionMessage": "Congratulations! You have completed the Water Conservation course and are equipped to safeguard vital water resources in your workplace.",
    "recommendedNextCourseCode": "ELH-33",
    "lessons": [
      {
        "title": "1. The Vulnerability of Island Freshwater Systems",
        "orderIndex": 0,
        "durationMinutes": 4,
        "content": "Understanding reservoir capacity constraints, rainfall seasonality, and the commercial impact of municipal water tariffs.",
        "contentBlocks": [
          { "id": "elh04-h1", "type": "heading", "level": 3, "text": "Why Every Drop Counts in a Closed Island System" },
          { "id": "elh04-t1", "type": "short_text", "position": 1, "bodyText": "Mauritius relies primarily on surface reservoirs and groundwater aquifers replenished by seasonal rainfall. During dry summer periods and prolonged droughts, municipal reservoir levels decline rapidly, leading to strict water rationing across commercial and residential sectors. In business operations, water is required for sanitation, cooling towers, kitchen hygiene, and landscape maintenance. When supply is disrupted, companies face steep costs for emergency water tanker deliveries." },
          { "id": "elh04-c1", "type": "callout", "variant": "info", "title": "Commercial Impact", "bodyText": "Treating and pumping potable water consumes substantial energy. Conserving water directly reduces both municipal utility expenses and Scope 2 energy emissions associated with pumping and filtration systems." }
        ]
      },
      {
        "title": "2. Detecting Silent Leaks & Washroom Inefficiencies",
        "orderIndex": 1,
        "durationMinutes": 4,
        "content": "Mastering the food coloring drop test for cisterns, identifying dripping taps, and reporting plumbing issues.",
        "contentBlocks": [
          { "id": "elh04-h2", "type": "heading", "level": 3, "text": "The Anatomy of Silent Water Waste" },
          { "id": "elh04-t2", "type": "short_text", "position": 1, "bodyText": "A toilet cistern with a faulty flapper valve can leak between 200 and 1,000 liters of treated potable water directly into the drain every single day without making an audible sound. Over a month, a single unnoticed leaking toilet wastes up to 30,000 liters—enough to supply a typical household for three months. A dripping tap leaking at one drop per second wastes approximately 10,000 liters annually." },
          { "id": "elh04-c2", "type": "callout", "variant": "tip", "title": "The 15-Minute Drop Test", "bodyText": "Place a few drops of food coloring or testing dye into the toilet cistern tank without flushing. Wait 15 minutes. If color appears in the toilet bowl, the flapper valve is leaking and must be serviced." }
        ]
      },
      {
        "title": "3. Interactive Decision Scenario: Responding to a Washroom Leak",
        "orderIndex": 2,
        "durationMinutes": 4,
        "content": "Evaluate an operational scenario regarding plumbing maintenance prioritization.",
        "contentBlocks": [
          {
            "id": "elh04-s1",
            "type": "interactive_scenario",
            "title": "Scenario: The Continuous Cistern Trickle",
            "prompt": "While visiting the 3rd-floor staff washroom at 10:00 AM, you notice water continuously trickling down the back of the toilet bowl. The toilet still flushes normally. What is your best course of action?",
            "options": [
              {
                "id": "opt_a",
                "text": "Ignore it because the toilet still works and routine maintenance will inspect the washroom in two months.",
                "consequence": "Unacceptable water loss. The leak will waste over 15,000 liters of potable water before the next scheduled inspection.",
                "feedback": "Never assume silent leaks are harmless. Prompt reporting prevents massive cumulative water loss.",
                "score": 0
              },
              {
                "id": "opt_b",
                "text": "Submit an immediate maintenance work order with exact location details (3rd Floor, cubicle 2) and notify the facilities coordinator.",
                "consequence": "Optimal outcome. Maintenance can replace a simple 200-rupee silicone flapper valve within hours, saving tens of thousands of liters.",
                "feedback": "Correct! Quick reporting with precise location details allows facilities to fix minor leaks before they become major expenses.",
                "score": 100
              },
              {
                "id": "opt_c",
                "text": "Turn off the main municipal water valve for the entire building without informing anyone.",
                "consequence": "Disruptive action. Shutting off the entire building's water supply halts all operations, kitchens, and fire suppression systems.",
                "feedback": "Isolate individual fixtures using angle stop valves if trained; do not shut down building mains without authorization.",
                "score": 0
              }
            ]
          }
        ]
      },
      {
        "title": "4. Interactive Decision Scenario: Staff Pantry & Cleaning Practices",
        "orderIndex": 3,
        "durationMinutes": 4,
        "content": "Address dishwashing and cleaning procedures in common pantry areas.",
        "contentBlocks": [
          {
            "id": "elh04-s2",
            "type": "interactive_scenario",
            "title": "Scenario: Staff Kitchen Dishwashing Practices",
            "prompt": "In the office pantry, colleagues frequently wash their lunch containers under a wide-open running tap for 3 to 4 minutes per container. What operational change should be introduced?",
            "options": [
              {
                "id": "opt_a",
                "text": "Install low-flow tap aerators to reduce flow rate from 12 L/min to 4 L/min, and introduce a twin-basin wash/rinse protocol.",
                "consequence": "Optimal outcome. Aerators maintain high-pressure rinsing while cutting water volume by over 60%.",
                "feedback": "Excellent! Aerators mix air into the water stream, maintaining effective cleaning power while drastically reducing volumetric flow.",
                "score": 100
              },
              {
                "id": "opt_b",
                "text": "Ban all employees from bringing reusable lunch containers and mandate single-use disposable plastic cutlery.",
                "consequence": "Severe environmental failure. Replacing water use with single-use plastic waste contradicts corporate circularity and generates landfill pollution.",
                "feedback": "Never replace water conservation efforts with single-use plastic waste generation.",
                "score": 0
              }
            ]
          }
        ]
      },
      {
        "title": "5. Workplace Action: Departmental Water Audit",
        "orderIndex": 4,
        "durationMinutes": 4,
        "content": "Implement practical washroom checks and behavioral prompts across your team.",
        "contentBlocks": [
          { "id": "elh04-h3", "type": "heading", "level": 3, "text": "Practical Daily Water Conservation Measures" },
          { "id": "elh04-t3", "type": "short_text", "position": 1, "bodyText": "Implement these three everyday workplace habits: (1) Ensure taps are fully turned off after handwashing—do not leave them dripping; (2) Use the half-flush button on dual-flush toilets for liquid waste; and (3) Report any damp walls, running cisterns, or leaking pantry sink hoses immediately." },
          { "id": "elh04-c3", "type": "callout", "variant": "action", "title": "Workplace Commitment", "bodyText": "Inspect your floor's washrooms and kitchenettes once a week for the next month, performing the drop test on suspected cistern leaks." }
        ]
      }
    ],
    "quizQuestions": [
      {
        "question": "How much potable water can a single silent toilet cistern leak waste in 24 hours?",
        "options": ["1 to 2 liters", "5 to 10 liters", "200 to 1,000 liters", "5,000 to 10,000 liters"],
        "correctOption": 2,
        "orderIndex": 0,
        "correctExplanation": "A silent flapper valve leak typically allows 200 to 1,000 liters of clean water to slip directly into the sewer drain every day without visible overflow.",
        "incorrectExplanation": "Cistern leaks are continuous, causing hundreds of liters of daily waste.",
        "optionFeedback": [
          "Incorrect. 1 to 2 liters is negligible; toilet cistern leaks are continuous and far larger.",
          "Incorrect. 5 to 10 liters is typical of a slow tap drip, whereas toilet leaks flow constantly.",
          "Correct! A faulty internal seal can silently discharge 200 to 1,000 liters per day down the drain.",
          "Incorrect. 5,000+ liters would indicate a burst main pipe rather than a single toilet seal."
        ],
        "practicalTakeaway": "Perform regular cistern dye checks to catch silent leaks early.",
        "learningOutcome": "Identify silent toilet cistern leaks",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "What is the primary function of a low-flow tap aerator installed on a workplace washroom sink?",
        "options": [
          "It completely turns off the water supply after 3 seconds.",
          "It mixes air into the water stream, maintaining rinsing pressure while reducing water flow volume by 50% or more.",
          "It heats the water electrically inside the spout.",
          "It filters out mineral salts to create distilled drinking water."
        ],
        "correctOption": 1,
        "orderIndex": 1,
        "correctExplanation": "Aerators introduce micro-bubbles of air into the water flow, creating a full, splash-free spray stream that cleans effectively while using a fraction of the water volume.",
        "incorrectExplanation": "Aerators optimize flow dynamics by incorporating air into the stream.",
        "optionFeedback": [
          "Incorrect. Aerators regulate flow rate; auto-shutoff timers are a separate sensor valve mechanism.",
          "Correct! Aerators mix air with water to maintain effective wetting velocity while cutting flow from ~12 L/min down to 4–6 L/min.",
          "Incorrect. Aerators do not contain heating elements.",
          "Incorrect. Aerators do not perform reverse osmosis or distillation."
        ],
        "practicalTakeaway": "Retrofitting taps with quality aerators is a low-cost, high-return water conservation measure.",
        "learningOutcome": "Recognize efficiency gains of tap aerators",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "How should an employee test a toilet cistern for a suspected silent leak using simple workplace items?",
        "options": [
          "Disassemble the entire porcelain tank using a wrench.",
          "Add a few drops of food coloring into the cistern tank and observe if color appears in the bowl without flushing.",
          "Turn on all the sink taps simultaneously to test water pressure.",
          "Measure the temperature of the water with an infrared thermometer."
        ],
        "correctOption": 1,
        "orderIndex": 2,
        "correctExplanation": "The dye test is non-destructive and definitive: if colored water enters the bowl before any flush is triggered, the flush valve seal is leaking.",
        "incorrectExplanation": "Dye added to the cistern tank will seep into the bowl within 15 minutes if the flapper valve has degraded.",
        "optionFeedback": [
          "Incorrect. Disassembling porcelain fixtures risks cracking the tank and causing major flooding.",
          "Correct! Food coloring placed in the tank will seep into the bowl within 10–15 minutes if the internal seal is worn.",
          "Incorrect. Running taps does not test toilet tank seals.",
          "Incorrect. Water temperature does not indicate internal mechanical leakage."
        ],
        "practicalTakeaway": "Use the food coloring drop test as a quick, non-destructive leak diagnosis.",
        "learningOutcome": "Perform diagnostic drop tests",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "On a dual-flush toilet system, what is the intended purpose of the smaller flush button?",
        "options": [
          "It is an emergency flush for heavy clogs.",
          "It delivers a reduced volume flush (typically 3–4 liters) designed for liquid waste.",
          "It cleans the toilet seat automatically with disinfectant.",
          "It flushes the municipal sewer line outside the building."
        ],
        "correctOption": 1,
        "orderIndex": 3,
        "correctExplanation": "Dual-flush systems provide a half-flush (3–4L) for liquid waste and a full flush (6L) for solid waste, saving thousands of liters annually when used properly.",
        "incorrectExplanation": "The smaller button provides a low-volume flush for liquid waste.",
        "optionFeedback": [
          "Incorrect. The large button provides the higher volume for solid waste.",
          "Correct! The half-flush button uses approximately half the water volume, perfectly tailored for liquid waste.",
          "Incorrect. Dual-flush mechanisms only control water discharge volume.",
          "Incorrect. Dual-flush controls operate strictly within the individual fixture."
        ],
        "practicalTakeaway": "Promote correct dual-flush habits across all workplace washrooms.",
        "learningOutcome": "Understand dual-flush mechanisms",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "Why is water conservation particularly critical for island nations like Mauritius during dry seasonal months?",
        "options": [
          "Desalination plants consume all the island's imported gasoline.",
          "Surface reservoirs and aquifers have finite storage and depend entirely on seasonal rainfall for replenishment.",
          "Water pipes contract in the sun and cannot hold water pressure.",
          "Mauritian tap water evaporates instantaneously during daytime office hours."
        ],
        "correctOption": 1,
        "orderIndex": 4,
        "correctExplanation": "Island hydrologic cycles are closed and dependent on seasonal rainfall. When reservoirs drop below critical capacity, water cuts disrupt business continuity and healthcare services.",
        "incorrectExplanation": "Reservoir storage capacity is limited and vulnerable to rainfall deficits.",
        "optionFeedback": [
          "Incorrect. Mauritius does not rely on island-wide gasoline-powered desalination.",
          "Correct! Island reservoirs have limited capacity; drought conditions lead to municipal rationing, impacting business continuity.",
          "Incorrect. Modern municipal pipes operate under regulated thermal tolerances.",
          "Incorrect. Enclosed piping prevents evaporation."
        ],
        "practicalTakeaway": "Recognize that freshwater is a constrained natural asset in island ecosystems.",
        "learningOutcome": "Understand island water cycle dynamics",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "When washing coffee cups or utensils in a staff pantry without an automated dishwasher, which practice consumes the least water?",
        "options": [
          "Leaving the hot water tap running continuously at full flow for 5 minutes while scrubbing each item individually.",
          "Using a wash basin with soapy water to scrub items, followed by a quick clean water basin rinse.",
          "Throwing away porcelain mugs and purchasing single-use plastic cups for every drink.",
          "Washing mugs in the washroom handwashing basin."
        ],
        "correctOption": 1,
        "orderIndex": 5,
        "correctExplanation": "The two-basin method (wash basin + rinse basin) uses a fraction of the water required by continuous running taps, while avoiding the pollution of single-use disposables.",
        "incorrectExplanation": "Running taps can discharge 10–15 liters per minute; basin washing uses a fixed small volume.",
        "optionFeedback": [
          "Incorrect. Continuous running taps waste dozens of liters per wash cycle.",
          "Correct! The two-basin wash and rinse method reduces water consumption by up to 70% compared to running taps.",
          "Incorrect. Disposable cups create massive plastic pollution and defeat corporate sustainability.",
          "Incorrect. Handwashing basins are not designed for food hygiene or pantry dishwashing."
        ],
        "practicalTakeaway": "Adopt basin washing practices in office kitchenettes and pantries.",
        "learningOutcome": "Implement water-efficient pantry habits",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "What information should you always include when logging a plumbing leak work order with the facilities team?",
        "options": [
          "Only your personal employee ID number.",
          "Exact location (building, floor, room/cubicle number), nature of the leak (dripping tap, running cistern, pipe burst), and severity.",
          "A request to replace all plumbing pipes in the entire city.",
          "A prediction of next week's weather forecast."
        ],
        "correctOption": 1,
        "orderIndex": 6,
        "correctExplanation": "Clear diagnostic details enable maintenance technicians to bring the correct replacement components (e.g. gaskets, cartridges, flappers) and resolve the fault on the first visit.",
        "incorrectExplanation": "Specific location and leak description prevent wasted investigation time.",
        "optionFeedback": [
          "Incorrect. Without location and fault descriptions, technicians cannot locate or prioritize the problem.",
          "Correct! Precise fixture identification, location, and leak severity allow rapid dispatch and first-time resolution.",
          "Incorrect. Work orders must address specific on-site maintenance needs.",
          "Incorrect. Weather predictions are irrelevant to plumbing work orders."
        ],
        "practicalTakeaway": "Provide actionable, detailed descriptions when submitting maintenance work orders.",
        "learningOutcome": "Report plumbing faults effectively",
        "competencyArea": "COMP_WATER"
      },
      {
        "question": "Which of the following represents an effective workplace water stewardship initiative for employees?",
        "options": [
          "Organizing a monthly washroom leak sweep and reporting dripping fixtures promptly.",
          "Banning employees from drinking water during office working hours.",
          "Pouring leftover coffee and chemicals directly into outdoor garden beds.",
          "Disconnecting fire sprinkler valves to conserve reservoir water."
        ],
        "correctOption": 0,
        "orderIndex": 7,
        "correctExplanation": "Active stewardship involves proactive monitoring, leak identification, and prompt escalation to maintain building efficiency.",
        "incorrectExplanation": "Effective stewardship ensures water is used efficiently and infrastructure is well maintained.",
        "optionFeedback": [
          "Correct! Regular inspection walkthroughs and proactive fault reporting prevent continuous water waste across commercial buildings.",
          "Incorrect. Restricting hydration violates workplace health and safety laws.",
          "Incorrect. Chemicals and concentrated liquids damage soil health and contaminate groundwater.",
          "Incorrect. Disconnecting fire safety systems is illegal and creates catastrophic life safety risks."
        ],
        "practicalTakeaway": "Establish proactive leak detection routines within your green team.",
        "learningOutcome": "Execute water stewardship commitment",
        "competencyArea": "COMP_WATER"
      }
    ]
  }
]

print(f"Loaded {len(courses)} base courses...")
