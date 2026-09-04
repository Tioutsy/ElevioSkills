#!/usr/bin/env python3
import json
import os

def get_courses_1_to_4():
    return [
      # 1. ELH-03: Energy Efficiency at Work (D1)
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
        "secondaryCompetencies": ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_GHG"],
        "learningObjectives": [
          "Identify major sources of electricity waste in commercial office and facility environments.",
          "Understand how thermal comfort depends on environmental and personal factors (ASHRAE Standard 55) and apply moderate thermostat management.",
          "Execute effective computer, screen, and standby power management protocols.",
          "Recognize the financial and environmental implications of commercial peak demand tariffs and national generation reality."
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
            "content": "Understanding how standby power, unmanaged lighting, and excessive cooling quietly drain operating budgets and drive fossil-fuel power generation.",
            "contentBlocks": [
              { "id": "elh03-h1", "type": "heading", "level": 3, "text": "The Invisible Energy Leak in Everyday Operations" },
              { "id": "elh03-t1", "type": "short_text", "position": 1, "bodyText": "In most commercial buildings, 15% to 30% of total electricity consumption occurs when spaces are completely unoccupied. Standby power from unused monitors, desktop printers, decorative lighting, and poorly scheduled air conditioning units runs continuously through nights and weekends. Because electricity is invisible, employees rarely notice the cumulative cost of leaving workstations powered on." },
              { "id": "elh03-c1", "type": "callout", "variant": "info", "title": "Mauritian Electricity Generation Reality (Official 2023 Statistics)", "bodyText": "According to Statistics Mauritius (Energy and Water Statistics - 2023, Table 2.2 / 2.3), total electricity generated in the Island of Mauritius in 2023 was 3,251.8 GWh. Non-renewable thermal generation from imported fossil fuels (heavy fuel oil, diesel, and coal) accounted for 81.3% (2,642.1 GWh), while renewable sources accounted for 18.7% (609.7 GWh, comprising 9.6% bagasse, 5.1% solar PV, 3.3% hydro, 0.4% wind, and 0.2% landfill gas). Thermal power plants produced 90.9% of electricity because bagasse is also burned thermally. Every kilowatt-hour saved in the office directly cuts imported fossil fuel combustion and emissions." }
            ]
          },
          {
            "title": "2. HVAC Optimization: Thermal Comfort & Operational Setpoints",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Mastering air conditioning temperature setpoints, door sealing, and solar heat gain control.",
            "contentBlocks": [
              { "id": "elh03-h2", "type": "heading", "level": 3, "text": "Air Conditioning Efficiency and Thermal Comfort" },
              { "id": "elh03-t2", "type": "short_text", "position": 1, "bodyText": "Air conditioning accounts for 50% to 70% of total electrical energy in tropical commercial buildings. A widespread misconception is that setting the thermostat to 18°C cools an office faster. In reality, standard AC units cool at a constant compressor rate; setting excessively low temperatures causes overcooling, thermal discomfort, and severe energy waste. According to ANSI/ASHRAE Standard 55 (Thermal Environmental Conditions for Human Occupancy), indoor thermal comfort is not determined by a single universal temperature setpoint, but depends on six fundamental factors: four environmental variables (air temperature, radiant temperature, air speed, and relative humidity) and two personal variables (clothing insulation and metabolic activity). In commercial office environments, maintaining moderate thermostat settings (often calibrated around 24°C depending on ambient humidity and air circulation) prevents excessive cooling energy waste while accommodating typical workplace clothing and sedentary office tasks." },
              { "id": "elh03-c2", "type": "callout", "variant": "tip", "title": "Operational Rule", "bodyText": "Maintain moderate thermostat settings around 24°C. Ensure all exterior windows and doors remain closed while AC units operate, and draw blinds on sun-facing facades during afternoon peak heat." }
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
              { "id": "elh03-h3", "type": "heading", "level": 3, "text": "Your 30-Day Energy Conservation Plan" },
              { "id": "elh03-t3", "type": "short_text", "position": 1, "bodyText": "Take personal ownership of energy efficiency: (1) Configure your computer display sleep timer to 5 minutes; (2) Switch off meeting room lights and AC when leaving; (3) Report overcooled spaces or leaking window seals to Facilities; and (4) Conduct a quick Friday-afternoon sweep of your immediate team area." },
              { "id": "elh03-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Audit your personal workstation power settings today and agree on a last-person-out shutdown checklist with your department this week." }
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
            "question": "Why does setting an AC thermostat to 18°C fail to cool a hot room any faster than setting it to 24°C?",
            "options": [
              "Thermostats only respond to changes made in the morning.",
              "Standard AC systems deliver cooling at a fixed compressor rate; setting a lower target merely causes the unit to run longer and overcool the space.",
              "The thermostat automatically inverts the temperature when set below 20°C.",
              "Modern air conditioners only cool rooms when set to exactly 30°C."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Thermostats are switches, not throttles. The system cools at maximum designed heat exchange rate until the target is reached; a lower target simply causes overcooling.",
            "incorrectExplanation": "Thermostats control when the compressor stops, not the speed of cooling.",
            "optionFeedback": [
              "Incorrect. Thermostats respond continuously to temperature sensors regardless of time of day.",
              "Correct! The cooling rate is constant; setting an excessively low setpoint does not speed up initial cooling but guarantees continuous compressor overcooling.",
              "Incorrect. Thermostats do not invert temperature settings.",
              "Incorrect. Setting 30°C would provide no cooling in a warm room."
            ],
            "practicalTakeaway": "Never drop thermostats to 18°C to 'hurry' cooling; set the target directly to a moderate setpoint.",
            "learningOutcome": "Understand thermostat mechanics and operational behavior",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "In commercial electricity billing in Mauritius, what is the primary financial risk of running high-power equipment during peak hours (18:00–21:00)?",
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
            "practicalTakeaway": "Shift high-power maintenance and charging operations outside the 18:00–21:00 peak window.",
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
              "Setting all office air conditioners to 16°C and opening external windows.",
              "Replacing all energy-efficient LED light bulbs with incandescent bulbs."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Simple personal habits (PC sleep modes and Friday shutdown routines) eliminate baseload power waste with zero capital expense.",
            "incorrectExplanation": "Configuring display sleep and verifying weekend shutdown provides immediate, measurable energy savings.",
            "optionFeedback": [
              "Incorrect. Leaving appliances running unattended is unsafe and wasteful.",
              "Correct! Establishing automated display sleep profiles and routine Friday shutdowns creates lasting, zero-cost energy savings.",
              "Incorrect. Setting 16°C with open windows causes catastrophic energy waste.",
              "Incorrect. Incandescent bulbs waste up to 85% of power as heat."
            ],
            "practicalTakeaway": "Commit to daily workstation power management and Friday team area shutdown checks.",
            "learningOutcome": "Execute personal 30-day energy action commitment",
            "competencyArea": "COMP_ENERGY"
          }
        ]
      },

      # 2. ELH-04: Water Conservation in the Workplace (D1)
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
        "secondaryCompetencies": ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_CIRCULARITY"],
        "learningObjectives": [
          "Understand the hydrology, seasonal rainfall vulnerability, and municipal supply reality of Mauritius.",
          "Identify and diagnose silent toilet cistern flapper leaks using the 15-minute food coloring drop test.",
          "Adopt high-efficiency pantry, kitchen, and washroom water conservation practices.",
          "Implement structured reporting protocols for facility plumbing maintenance and leak elimination."
        ],
        "intendedRoles": ["All Employees", "Facilities Staff", "Pantry and Cleaning Teams", "Office Administrators"],
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
              { "id": "elh04-h1", "type": "heading", "level": 3, "text": "Every Drop Counts: Freshwater in an Island Ecosystem" },
              { "id": "elh04-t1", "type": "short_text", "position": 1, "bodyText": "Despite tropical rainfall, Mauritius experiences severe dry seasons with reservoir storage levels dropping below 40% during drought periods. Commercial buildings, offices, and hotels consume millions of cubic meters of potable water treated by the Central Water Authority (CWA). Water wasted through leaking fixtures, running pantry taps, and unmonitored washrooms accelerates municipal water rationing, impacting communities and industrial operations alike." },
              { "id": "elh04-c1", "type": "callout", "variant": "info", "title": "CWA Water Reality", "bodyText": "Potable water requires extensive chemical treatment, pumping energy, and distribution infrastructure. Treating wastewater and producing tap water carries a substantial carbon footprint." }
            ]
          },
          {
            "title": "2. Silent Leaks: The Toilet Cistern Drop Test",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Detecting hidden plumbing leaks that silently waste large volumes of treated water.",
            "contentBlocks": [
              { "id": "elh04-h2", "type": "heading", "level": 3, "text": "Hunting the Invisible Leak: Flappers and Valves" },
              { "id": "elh04-t2", "type": "short_text", "position": 1, "bodyText": "According to US EPA WaterSense commercial facility guidance, leaking toilet cistern flapper valves are among the most common sources of silent, unmetered water waste in commercial buildings. Because a worn rubber flapper or misaligned lift chain allows water to trickle continuously from the cistern tank into the bowl without creating an audible alarm, leaks can persist undetected for months, multiplying utility bills and straining municipal reservoir supplies." },
              { "id": "elh04-c2", "type": "callout", "variant": "tip", "title": "The 15-Minute Drop Test", "bodyText": "Place 4 drops of food coloring into the toilet cistern tank (do not flush). Wait 15 minutes. If colored water appears in the toilet bowl, the flapper valve is leaking and must be replaced immediately." }
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
              { "id": "elh04-h3", "type": "heading", "level": 3, "text": "Conducting Your Departmental Water Sweep" },
              { "id": "elh04-t3", "type": "short_text", "position": 1, "bodyText": "Execute a 10-minute water audit: (1) Check that all pantry taps are fitted with aerators; (2) Perform food coloring drop tests on representative toilet cisterns; (3) Verify sensor taps shut off within 2 seconds of hands leaving; and (4) Report external irrigation sprinklers watering sidewalks or operating during rain." },
              { "id": "elh04-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Perform the 15-minute food coloring drop test on your office washroom cisterns this week and report any passing flappers to Facilities." }
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
              "Correct! Aerators reduce water flow from ~12 L/min to 3–4 L/min by mixing air into the stream without sacrificing rinsing effectiveness.",
              "Incorrect. Aerators decrease volumetric flow rate to conserve water.",
              "Incorrect. Aerators are mechanical diffusion nozzles without heating elements."
            ],
            "practicalTakeaway": "Fit high-efficiency aerator nozzles (3.8–5.0 L/min) on all handwashing and pantry taps.",
            "learningOutcome": "Apply low-flow aerator technologies in commercial fixtures",
            "competencyArea": "COMP_WATER"
          },
          {
            "question": "Why is washing pantry dishes using a 'Two-Basin Method' (one soapy wash, one clean rinse) significantly more water-efficient than washing under a continuous running tap?",
            "options": [
              "Because it uses cold water only.",
              "A continuous running tap can discharge 10–12 liters per minute of treated water down the drain, whereas two basins use a fixed volume of ~10 liters for an entire batch of dishes.",
              "Because two basins require special dish soap from France.",
              "It takes 5 hours to fill two basins."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Batch washing uses a static pool of water, cutting consumption by up to 70% compared to washing each plate under an open running tap.",
            "incorrectExplanation": "Static batch washing uses a fraction of the water volume consumed by continuous running taps.",
            "optionFeedback": [
              "Incorrect. Water temperature does not determine the volumetric efficiency of the two-basin method.",
              "Correct! Batch washing in two basins uses a small fixed volume, avoiding continuous 10–12 L/min tap discharge during individual item scrubbing.",
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
              "They provide a reduced volume flush (3–4 liters) for liquid waste and a full flush (6 liters) for solid waste, cutting flush water demand by 30% to 50%.",
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

      # 3. ELH-05: Sustainable Purchasing for Non-Specialists (D1)
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
        "secondaryCompetencies": ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_CIRCULARITY"],
        "learningObjectives": [
          "Differentiate credible, third-party verified eco-labels from misleading commercial greenwashing.",
          "Calculate Total Cost of Ownership (TCO) including energy, consumables, maintenance, and end-of-life disposal.",
          "Select sustainable alternatives for everyday office consumables, paper products, and cleaning supplies.",
          "Evaluate local Mauritian suppliers ('Made in Moris') to reduce supply chain Scope 3 freight emissions."
        ],
        "intendedRoles": ["Office Administrators", "Department Buyers", "Executive Assistants", "Team Coordinators"],
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
              { "id": "elh05-h1", "type": "heading", "level": 3, "text": "Total Cost of Ownership: The Hidden Iceberg" },
              { "id": "elh05-t1", "type": "short_text", "position": 1, "bodyText": "When purchasing office equipment, appliances, or consumables, the upfront invoice price represents only the visible tip of an economic iceberg. Total Cost of Ownership (TCO) calculates all lifecycle expenses: purchase price + electricity consumption + proprietary replacement consumables (e.g. expensive ink cartridges) + maintenance + end-of-life recycling. An inefficient printer that costs 20% less upfront often consumes 3 times more power and generates double the cartridge waste over 3 years." },
              { "id": "elh05-c1", "type": "callout", "variant": "info", "title": "TCO Formula", "bodyText": "TCO = Initial Purchase Price + Lifetime Operating Energy + Lifetime Consumables & Maintenance - Residual Value. Always evaluate TCO before selecting equipment." }
            ]
          },
          {
            "title": "2. Navigating Eco-Labels & Spotting Greenwash",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "How to verify genuine third-party certifications and avoid self-declared marketing greenwashing.",
            "contentBlocks": [
              { "id": "elh05-h2", "type": "heading", "level": 3, "text": "Decoding Environmental Certifications" },
              { "id": "elh05-t2", "type": "short_text", "position": 1, "bodyText": "Marketers frequently invent green-sounding terms like '100% Eco-Friendly' or 'Earth Choice' without independent verification. Authentic sustainable purchasing relies on Type I third-party verified eco-labels: (1) **FSC (Forest Stewardship Council)**: FSC certification confirms that forest products are harvested sustainably, protecting biodiversity, water resources, and indigenous community rights, tracked through certified chain-of-custody supply chains; (2) **Energy Star**: independent energy efficiency testing; (3) **Made in Moris**: verified local Mauritian manufacturing and value-addition; and (4) **EPEAT**: comprehensive electronic lifecycle criteria." },
              { "id": "elh05-c2", "type": "callout", "variant": "tip", "title": "Rule of Thumb", "bodyText": "If a product claims to be 'green' but does not display a registered third-party certification number or audit standard, treat it as unverified marketing." }
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
              { "id": "elh05-h3", "type": "heading", "level": 3, "text": "Your Sustainable Purchasing Checklist" },
              { "id": "elh05-t3", "type": "short_text", "position": 1, "bodyText": "Apply four questions before issuing any purchase order: (1) Is this purchase truly necessary, or can we share/repair existing equipment? (2) Does the item carry a verified eco-label (FSC, Energy Star, Made in Moris)? (3) What is the Total Cost of Ownership including power and refills? and (4) Can packaging be returned to the supplier?" },
              { "id": "elh05-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Audit your department's recurring stationery orders this month and substitute uncertified paper and single-use plastic pens with certified eco-alternatives." }
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

      # 4. ELH-06: Green Office Practices & Resource Efficiency (D1)
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
        "secondaryCompetencies": ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_SOCIAL_COMMUNITY"],
        "learningObjectives": [
          "Implement high-purity 4-stream office waste segregation (Paper, Plastics, E-Waste, Organic/General).",
          "Digitize paper-heavy administrative, approval, and document retention workflows.",
          "Eliminate single-use plastics across office pantries, events, and client meetings.",
          "Organize and lead grassroots workplace Green Teams to drive continuous eco-improvements."
        ],
        "intendedRoles": ["All Office Personnel", "Administrative Staff", "Office Managers", "Green Committee Members"],
        "badgeName": "Green Office Champion",
        "badgeDescription": "Demonstrated competence in waste segregation, paperless workflows, and workplace circularity.",
        "completionMessage": "Congratulations! You have completed Green Office Practices & Resource Efficiency and are empowered to lead sustainable workplace transformations.",
        "recommendedNextCourseCode": "ELH-29",
        "lessons": [
          {
            "title": "1. The Anatomy of Office Waste",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Understanding the composition of corporate office waste and why unsegregated waste ends up in landfills.",
            "contentBlocks": [
              { "id": "elh06-h1", "type": "heading", "level": 3, "text": "What Really Goes into Corporate Trash Bins?" },
              { "id": "elh06-t1", "type": "short_text", "position": 1, "bodyText": "An audit of typical commercial office waste reveals: 50% paper and cardboard, 20% plastic and packaging, 15% food and organic waste, and 15% miscellaneous/e-waste. When desk-side trash bins are used without segregation, food scraps contaminate clean paper and plastics, turning potentially valuable recyclable materials into unrecyclable municipal solid waste destined for Mare Chicose landfill." },
              { "id": "elh06-c1", "type": "callout", "variant": "info", "title": "Contamination Factor", "bodyText": "A single half-full coffee cup thrown into a paper recycling bin can ruin an entire 50 kg batch of clean paper, making it unrecyclable." }
            ]
          },
          {
            "title": "2. Centralized 4-Stream Waste Segregation",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Replacing desk-side trash cans with standardized central recycling hubs.",
            "contentBlocks": [
              { "id": "elh06-h2", "type": "heading", "level": 3, "text": "Centralized Stations: High Purity, Zero Confusion" },
              { "id": "elh06-t2", "type": "short_text", "position": 1, "bodyText": "Leading organizations remove individual desk-side trash bins and introduce centralized 4-stream sorting stations in corridors and pantries: (1) **Clean Paper & Cardboard**; (2) **Plastic Bottles & Cans**; (3) **Electronic Waste & Batteries**; and (4) **General Landfill / Food Waste**. According to Statistics Mauritius (Digest of Environment Statistics 2023, Table 4.1), over 500,000 tonnes of solid waste are sent annually to Mare Chicose landfill; high-purity office segregation is essential to divert clean materials into local recycling streams." },
              { "id": "elh06-c2", "type": "callout", "variant": "tip", "title": "Signage Rule", "bodyText": "Use clear visual photo signage with English, French, and Mauritian Creole on every recycling bin to eliminate sorting confusion." }
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
              { "id": "elh06-h3", "type": "heading", "level": 3, "text": "Building a Thriving Workplace Green Culture" },
              { "id": "elh06-t3", "type": "short_text", "position": 1, "bodyText": "Lasting behavioral change happens when employees lead from within. Establish an informal workplace Green Team: (1) Host a monthly 30-minute sustainability lunch & learn; (2) Organize an annual e-waste drop-off drive for employee home electronics; (3) Track and display monthly paper and waste diversion metrics in the cafeteria; and (4) Reward departments that achieve zero-landfill milestones." },
              { "id": "elh06-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Nominate yourself or a colleague to join your organization's workplace Green Team this month and implement one paperless workflow reform." }
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
      }
    ]

print("Module 1 ready.")
