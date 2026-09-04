#!/usr/bin/env python3
import json
import os

def get_courses_6_to_9():
    return [
      # 6. ELH-36: Sustainable Commercial Kitchens & Culinary (D3)
      {
        "courseCode": "ELH-36",
        "title": "Sustainable Commercial Kitchens & Culinary",
        "slug": "sustainable-commercial-kitchens-and-culinary",
        "description": "Master commercial kitchen energy efficiency, smart prep scheduling, food waste prevention, induction cooking conversion, and grease trap management in hospitality.",
        "fullDescription": "Sustainable Commercial Kitchens & Culinary equips Executive Chefs, Food & Beverage Directors, and kitchen supervisors to transform culinary operations into models of resource efficiency and low-waste gastronomy. Learn how to optimize equipment startup/shutdown schedules to eliminate idle energy waste, implement smart kitchen food waste measurement, transition to high-efficiency induction cooktops and demand-controlled exhaust hoods, manage kitchen grease traps responsibly, and design climate-conscious, plant-forward menus that delight guests.",
        "categoryId": 2,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_CIRCULARITY",
        "secondaryCompetencies": ["COMP_ENERGY", "COMP_SUPPLY_CHAIN"],
        "learningObjectives": [
          "Implement structured kitchen equipment startup and shutdown schedules to eliminate idle power burn.",
          "Deploy smart food waste segregation and daily kitchen scale tracking (prep waste, spoilage, plate waste).",
          "Evaluate energy and thermal ventilation savings from induction cooktops and Demand-Controlled Kitchen Ventilation (DCKV).",
          "Ensure compliance with grease trap maintenance, used cooking oil (UCO) biofuel recycling, and local wastewater standards."
        ],
        "intendedRoles": ["Executive Chefs", "Sous Chefs", "F&B Directors", "Kitchen Stewards", "Hospitality Operations Leads"],
        "badgeName": "Sustainable Culinary Specialist",
        "badgeDescription": "Demonstrated competence in commercial kitchen energy management, culinary waste reduction, and sustainable kitchen operations.",
        "completionMessage": "Congratulations! You have completed Sustainable Commercial Kitchens & Culinary and are prepared to lead an eco-efficient culinary team.",
        "recommendedNextCourseCode": "ELH-39",
        "lessons": [
          {
            "title": "1. Commercial Kitchen Energy Footprint & Equipment Scheduling",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why commercial kitchens are the most energy-dense commercial spaces and how staggered scheduling eliminates idle waste.",
            "contentBlocks": [
              { "id": "elh36-h1", "type": "heading", "level": 3, "text": "The Anatomy of Kitchen Energy Waste" },
              { "id": "elh36-t1", "type": "short_text", "position": 1, "bodyText": "Commercial kitchens consume approximately five times more energy per square meter than standard office spaces. A major portion of this energy is wasted through 'morning startup burn': morning shift staff turning on all ovens, fryers, salamanders, and steamers simultaneously at 6:00 AM, leaving equipment idling at full power for hours before food prep begins. Implementing a phased equipment startup schedule aligned with actual prep times reduces kitchen electricity and gas bills by 15% to 25% with zero capital investment." },
              { "id": "elh36-c1", "type": "callout", "variant": "info", "title": "Scheduling Standard", "bodyText": "Create a visual, color-coded equipment startup matrix posted above each kitchen cooking line indicating exact pre-heat start times." }
            ]
          },
          {
            "title": "2. Food Waste Tracking & Low-Waste Culinary Design",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Implementing the 3-stream kitchen food waste audit (Spoilage, Prep, Plate waste) and menu re-engineering.",
            "contentBlocks": [
              { "id": "elh36-h2", "type": "heading", "level": 3, "text": "Measuring and Preventing Culinary Waste" },
              { "id": "elh36-t2", "type": "short_text", "position": 1, "bodyText": "Food waste occurs in three distinct streams: (1) **Storage & Spoilage Waste** (poor FIFO inventory rotation, over-ordering); (2) **Preparation Waste** (inefficient vegetable trimming, over-peeling, butchery offcuts); and (3) **Plate / Buffet Waste** (oversized portions, unmonitored buffet replenishment). Installing digital scales at prep and dishwashing stations allows chefs to identify exact waste categories. Applying 'nose-to-tail' and 'root-to-stem' culinary techniques (e.g. vegetable peel stocks, herb stem oils) dramatically cuts raw food procurement costs." },
              { "id": "elh36-c2", "type": "callout", "variant": "tip", "title": "Buffet Replenishment Rule", "bodyText": "Transition buffet lines to smaller serving platters and cook-to-order live stations during the final 45 minutes of meal service to prevent massive buffet discards." }
            ]
          },
          {
            "title": "3. Kitchen Ventilation, Induction & Grease Management",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Optimizing hood exhaust fans, induction cooking benefits, and certified grease trap management.",
            "contentBlocks": [
              { "id": "elh36-h3", "type": "heading", "level": 3, "text": "Ventilation, Induction & Grease Traps" },
              { "id": "elh36-t3", "type": "short_text", "position": 1, "bodyText": "Kitchen exhaust hoods running constantly at 100% speed exhaust enormous volumes of expensive conditioned air. **Demand-Controlled Kitchen Ventilation (DCKV)** uses optic and thermal sensors to modulate fan speeds based on real-time cooking heat and smoke, saving 30% to 50% in fan and makeup air energy. Additionally, transitioning from gas to induction cooktops delivers 85-90% thermal efficiency (vs 35-40% for gas), reducing ambient kitchen heat. Finally, grease traps must be pumped monthly by licensed biofuel recyclers to prevent sewer blockages and convert Used Cooking Oil (UCO) into biodiesel." },
              { "id": "elh36-c3", "type": "callout", "variant": "action", "title": "Grease Trap Compliance", "bodyText": "Maintain a certified grease trap cleaning logbook and UCO consignment receipts for every collection by licensed biofuel recyclers." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Kitchen Operational Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate operational prep scheduling, buffet management, and equipment efficiency trade-offs.",
            "contentBlocks": [
              {
                "id": "elh36-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Managing End-of-Evening Buffet Waste",
                "prompt": "It is 9:30 PM and dinner buffet service ends at 10:00 PM. Only 12 guests remain in the dining room, but several premium meat and seafood buffet warmers are nearly empty. The dining room manager demands the hot line cooks prepare fresh full-sized 5kg trays of grilled tiger prawns and beef tenderloin. How should the Sous Chef respond?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Cook full 5kg trays of both dishes immediately and throw away the 4.5kg remaining at 10:05 PM.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Cooking full trays for 12 guests results in massive food waste and substantial financial loss."
                  },
                  {
                    "id": "opt_b",
                    "text": "Offer the remaining dining guests freshly cooked, made-to-order individual portions directly from the hot kitchen, while transitioning buffet display trays to smaller garnishing presentations.",
                    "isCorrect": True,
                    "feedback": "Correct! Made-to-order portions during late service deliver superior food quality and VIP service while eliminating buffet surplus waste."
                  },
                  {
                    "id": "opt_c",
                    "text": "Close the buffet abruptly and tell the remaining guests the kitchen has run out of food.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Denying service to paying guests destroys guest satisfaction and brand reputation."
                  },
                  {
                    "id": "opt_d",
                    "text": "Mix leftover seafood with raw chicken for tomorrow's lunch salad.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Cross-contaminating raw poultry with cooked seafood is a catastrophic food hygiene and safety violation."
                  }
                ]
              },
              {
                "id": "elh36-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Kitchen Hood Fan Left Running 24/7",
                "prompt": "An energy audit shows that the main kitchen exhaust hood fan (15 kW) runs continuously 24 hours a day, 7 days a week, even when the kitchen is completely dark and closed between midnight and 5:30 AM. The night cleaning team says they leave it on 'to clear the smell'. What corrective action do you implement?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Allow the fan to run 24/7 because 15 kW is insignificant.",
                    "isCorrect": False,
                    "feedback": "Incorrect. A 15 kW fan running 5.5 unnecessary hours every night wastes over 30,000 kWh and tens of thousands of rupees annually."
                  },
                  {
                    "id": "opt_b",
                    "text": "Install an automated BMS timer schedule that shuts down main exhaust hoods 30 minutes after kitchen closing, provides a 30-minute timed boost button for cleaning staff, and deep cleans the grease filters to remove odor sources.",
                    "isCorrect": True,
                    "feedback": "Correct! Automated scheduling with a timed manual override for cleaners stops baseload energy waste while deep cleaning addresses the odor root cause."
                  },
                  {
                    "id": "opt_c",
                    "text": "Cut the electrical wiring to the exhaust fan permanently.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Disabling kitchen exhaust causes hazardous smoke and carbon monoxide buildup during cooking operations."
                  },
                  {
                    "id": "opt_d",
                    "text": "Open all kitchen windows and exterior doors during heavy rains.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Opening exterior doors introduces humidity, pests, and dust into food preparation areas."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Culinary Governance & 30-Day Sustainable Kitchen Action Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Establishing culinary shift checklists and executing your 30-day kitchen action plan.",
            "contentBlocks": [
              { "id": "elh36-h4", "type": "heading", "level": 3, "text": "Institutionalizing Sustainable Kitchen Checklists" },
              { "id": "elh36-t4", "type": "short_text", "position": 1, "bodyText": "Embed sustainability into daily chef opening and closing checklists: (1) Equipment staggered startup adherence; (2) Daily food waste bucket weighing and logging; (3) Walk-in chiller temperature and door gasket seals check; and (4) UCO barrel locking and grease trap inspection. Weekly culinary reviews celebrate low-waste recipe innovations and reward kitchen teams achieving waste reduction milestones." },
              { "id": "elh36-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Post a visual equipment startup/shutdown schedule on all kitchen cooking lines; (2) Deploy dedicated food waste weighing scales in preparation and wash-up areas; and (3) Audit Used Cooking Oil collection records and grease trap service contracts." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary operational benefit of implementing a staggered equipment startup schedule in a commercial kitchen?",
            "options": [
              "It guarantees that chefs arrive two hours late for their shifts.",
              "It prevents massive idle power and gas consumption by heating equipment only when needed for actual food preparation.",
              "It lowers the temperature of walk-in freezers to 0°C.",
              "It eliminates the need for daily kitchen cleaning."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Staggered startup ensures high-energy appliances (ovens, fryers, steamers) are powered on only when required, eliminating hours of wasteful idle power burn.",
            "incorrectExplanation": "Staggered scheduling aligns equipment heating with actual prep timelines to eliminate idle energy waste.",
            "optionFeedback": [
              "Incorrect. Staggered startup manages equipment heating schedules, not employee tardiness.",
              "Correct! Heating equipment only when required eliminates idle power burn and cuts utility costs by 15-25%.",
              "Incorrect. Walk-in freezers must maintain -18°C to -20°C for food safety.",
              "Incorrect. Daily sanitation and cleaning remains mandatory."
            ],
            "practicalTakeaway": "Post visual startup schedules on cooking lines to ensure equipment is turned on only when needed for prep.",
            "learningOutcome": "Implement kitchen equipment startup and shutdown scheduling",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What are the three distinct categories of food waste that should be measured during a kitchen waste audit?",
            "options": [
              "Morning, Afternoon, and Night waste.",
              "Storage/Spoilage Waste, Preparation Waste (trimmings), and Plate/Buffet Waste.",
              "Plastic waste, Metal waste, and Glass waste.",
              "Chef waste, Manager waste, and Guest waste."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Separating food waste into Spoilage, Preparation, and Plate/Buffet streams identifies the exact operational root causes (purchasing, trimming, or portioning).",
            "incorrectExplanation": "Categorizing by Spoilage, Prep trimmings, and Plate/Buffet waste enables targeted culinary and purchasing interventions.",
            "optionFeedback": [
              "Incorrect. Time of day alone does not reveal whether waste came from spoilage, prep, or guest plates.",
              "Correct! Spoilage, Preparation, and Plate/Buffet waste tracking pinpoints operational waste drivers.",
              "Incorrect. Plastic, metal, and glass are dry recyclables, not food waste streams.",
              "Incorrect. Waste streams are categorized by operational process stage, not job title."
            ],
            "practicalTakeaway": "Use 3 distinct color-coded buckets (Spoilage, Prep, Plate) to weigh kitchen food waste daily.",
            "learningOutcome": "Conduct commercial kitchen food waste audits",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "How does Demand-Controlled Kitchen Ventilation (DCKV) save energy compared to conventional exhaust hoods?",
            "options": [
              "It shuts off kitchen exhaust completely whenever food is being cooked.",
              "It uses optic and thermal sensors to modulate fan speeds based on real-time cooking activity, reducing exhaust airflow and conditioned air loss during slow periods.",
              "It heats the exhaust air to 100°C before releasing it outdoors.",
              "It blows outside exhaust air back into the dining room."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "DCKV adjusts exhaust and makeup fan speeds dynamically based on heat and smoke levels, saving 30–50% in fan power and building cooling load.",
            "incorrectExplanation": "DCKV automatically modulates fan speeds to match actual cooking heat and smoke, avoiding constant full-speed operation.",
            "optionFeedback": [
              "Incorrect. DCKV operates whenever cooking occurs, varying airflow to match the load.",
              "Correct! Dynamic sensor-controlled fan modulation cuts exhaust and conditioned makeup air loss by 30-50%.",
              "Incorrect. Exhaust air is discharged safely, not heated.",
              "Incorrect. Exhaust air contains grease and smoke and must be discharged outdoors through filtration."
            ],
            "practicalTakeaway": "Install DCKV systems to prevent exhaust hoods from exhausting expensive air-conditioned building air at 100% full power.",
            "learningOutcome": "Evaluate Demand-Controlled Kitchen Ventilation (DCKV) systems",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is the thermal efficiency advantage of induction cooktops over conventional commercial gas burners?",
            "options": [
              "Gas burners are 95% efficient, while induction is only 20% efficient.",
              "Induction cooktops deliver 85–90% thermal efficiency directly to the cookware, compared to only 35–40% efficiency for commercial open gas burners.",
              "Induction cooktops require no electrical connection.",
              "Gas burners cool down the commercial kitchen environment."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Induction transfers electromagnetic energy directly to the pan (85-90% efficiency), while gas loses 60-65% of its heat into the kitchen ambient air.",
            "incorrectExplanation": "Induction is over twice as thermally efficient as gas, drastically reducing energy use and kitchen cooling loads.",
            "optionFeedback": [
              "Incorrect. Gas burners lose the vast majority of their energy as ambient waste heat.",
              "Correct! Induction achieves 85-90% thermal efficiency, drastically reducing energy waste and kitchen ambient heat.",
              "Incorrect. Induction cooktops run on electrical power.",
              "Incorrect. Gas burners emit massive waste heat that heavily burdens kitchen air conditioning."
            ],
            "practicalTakeaway": "Transition to induction cooktops to cut cooking energy by 50% and lower kitchen air conditioning demand.",
            "learningOutcome": "Compare induction and gas culinary thermal performance",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is the proper environmental and statutory management practice for Used Cooking Oil (UCO) in hospitality facilities?",
            "options": [
              "Pour it down the kitchen floor drains with boiling water and dishwashing liquid.",
              "Store it in sealed, labeled, bunded drums and hand it over exclusively to licensed collectors for conversion into certified biodiesel.",
              "Mix it with garden soil around guest villas as fertilizer.",
              "Dump it into municipal rainwater stormwater canals."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "UCO must be collected in secure containers and consigned to licensed recyclers for biodiesel production, preventing sewer blockages and pollution.",
            "incorrectExplanation": "Discharging oil into drains or stormwater violates environmental law; UCO must be recycled into biofuel.",
            "optionFeedback": [
              "Incorrect. Pouring grease into drains causes severe sewer fatbergs and violates environmental wastewater laws.",
              "Correct! Storing UCO in bunded drums for licensed biodiesel conversion satisfies statutory and circular economy standards.",
              "Incorrect. Cooking oil suffocates soil microbiomes and attracts vermin.",
              "Incorrect. Discharging grease into stormwater canals is an illegal polluting act subject to heavy statutory fines."
            ],
            "practicalTakeaway": "Ensure all Used Cooking Oil is logged and collected by certified biofuel recyclers with documented transfer receipts.",
            "learningOutcome": "Manage Used Cooking Oil (UCO) and grease trap compliance",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "How can culinary teams reduce buffet food waste during the final hour of meal service without impacting guest experience?",
            "options": [
              "Turn off the lights in the restaurant to force guests to leave early.",
              "Transition to smaller, beautifully garnished presentation platters and prepare popular hot items fresh to order from live action stations.",
              "Refill every 10kg chafing dish to maximum capacity right up until closing time.",
              "Serve cold canned rations during the last hour."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Downsizing display trays and offering live cook-to-order portions late in the service prevents massive unconsumed buffet waste while enhancing food quality.",
            "incorrectExplanation": "Smaller display platters and live cook-to-order stations maintain high presentation quality while eliminating surplus discards.",
            "optionFeedback": [
              "Incorrect. Turning off lights damages guest satisfaction and hospitality service reputation.",
              "Correct! Right-sizing buffet platters and offering live cook-to-order options prevents surplus waste while boosting food freshness.",
              "Incorrect. Refilling massive trays right before closing guarantees heavy food waste and financial loss.",
              "Incorrect. Canned rations violate hospitality luxury and culinary quality standards."
            ],
            "practicalTakeaway": "Right-size buffet presentation platters during the last 45 minutes of meal periods to prevent surplus food waste.",
            "learningOutcome": "Deploy low-waste buffet management strategies",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "What is the primary operational cause of premature grease trap failure and sewer backups in commercial resort kitchens?",
            "options": [
              "Using hot water in the kitchen handwashing sinks.",
              "Lack of routine pumping maintenance, grease overloading from poor dry-wiping of cookware, and illegal chemical grease emulsifier dosing.",
              "Installing stainless steel prep tables in the bakery.",
              "Using LED lighting above the dishwashing area."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Grease traps fail when staff wash grease directly into sinks without dry-wiping, use chemical degreasers that emulsify oil into city sewers, or skip monthly pumping.",
            "incorrectExplanation": "Grease trap failures stem from lack of dry-wiping, chemical emulsifiers, and missed maintenance schedules.",
            "optionFeedback": [
              "Incorrect. Handwashing water has negligible grease content.",
              "Correct! Failing to dry-wipe pots, using illegal chemical emulsifiers, and irregular pumping cause trap blockages and sewer overflows.",
              "Incorrect. Stainless steel surfaces are standard hygienic culinary fixtures.",
              "Incorrect. LED lighting has zero interaction with plumbing systems."
            ],
            "practicalTakeaway": "Mandate dry-wiping of all greasy pans with paper towels before washing to keep 80% of grease out of the drainage system.",
            "learningOutcome": "Prevent grease trap failures and maintain drainage integrity",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Which action should an Executive Chef execute within the first 30 days of a sustainable kitchen rollout?",
            "options": [
              "Eliminate all fresh cooking and serve only pre-packaged frozen meals.",
              "Post visual equipment startup/shutdown schedules, install food waste scales in prep areas, and audit UCO collection records.",
              "Order a complete kitchen demolition without management approval.",
              "Stop washing kitchen floors to save water."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "A disciplined 30-day kickoff focuses on posting equipment schedules, setting up food waste measurement, and auditing UCO recycling.",
            "incorrectExplanation": "Prioritize operational startup scheduling, food waste weighing, and grease management during initial implementation.",
            "optionFeedback": [
              "Incorrect. Pre-packaged meals degrade culinary quality and increase packaging waste.",
              "Correct! Visual startup schedules, waste scales, and UCO audit logs establish immediate operational and environmental control.",
              "Incorrect. Unapproved demolition destroys operations and creates immense financial liability.",
              "Incorrect. Floor sanitation is essential for food safety and workplace slip prevention."
            ],
            "practicalTakeaway": "Establish equipment schedules and daily food waste weighing within the first month of sustainable kitchen management.",
            "learningOutcome": "Execute a 30-day sustainable kitchen action roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 7. ELH-39: Hotel Engineering: Central Plant & HVAC Optimization (D3)
      {
        "courseCode": "ELH-39",
        "title": "Hotel Engineering: Central Plant & HVAC Optimization",
        "slug": "hotel-engineering-central-plant-and-hvac-optimization",
        "description": "Master central chiller plant optimization, chilled water delta-T management, cooling tower water treatment, heat recovery systems, and preventive BMS controls in hotels.",
        "fullDescription": "Hotel Engineering: Central Plant & HVAC Optimization equips Chief Engineers, MEP supervisors, and facility technicians to maximize the energy and thermal efficiency of large commercial central cooling plants. Learn how to sequence centrifugal and screw chillers for peak Coefficient of Performance (COP), overcome Low Delta-T Syndrome, optimize condenser water approach temperatures in cooling towers, integrate desuperheater hot water heat recovery, and configure automated Building Management System (BMS) reset algorithms.",
        "categoryId": 2,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_ENERGY",
        "secondaryCompetencies": ["COMP_GHG", "COMP_WATER"],
        "learningObjectives": [
          "Sequence multi-chiller plants to operate chillers within their peak COP efficiency curve (60% to 80% load).",
          "Diagnose and rectify Low Delta-T Syndrome across air handling units and primary/secondary pumping loops.",
          "Optimize cooling tower fan speeds and condenser water setpoint reset algorithms based on ambient wet-bulb temperatures.",
          "Implement chiller waste heat recovery systems (desuperheaters) to generate free domestic hot water for guest rooms and laundry."
        ],
        "intendedRoles": ["Chief Engineers", "MEP Supervisors", "HVAC Technicians", "Facility Maintenance Leads"],
        "badgeName": "Central Plant HVAC Specialist",
        "badgeDescription": "Demonstrated competence in central chiller plant efficiency, delta-T diagnostics, heat recovery, and cooling tower optimization.",
        "completionMessage": "Congratulations! You have completed Hotel Engineering: Central Plant & HVAC Optimization and are equipped to operate high-efficiency central thermal plants.",
        "recommendedNextCourseCode": "ELH-43",
        "lessons": [
          {
            "title": "1. Central Chiller Plant Operating Principles & COP Optimization",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Understanding chiller Coefficient of Performance (COP) curves, part-load efficiency, and staging controls.",
            "contentBlocks": [
              { "id": "elh39-h1", "type": "heading", "level": 3, "text": "Maximizing Chiller Coefficient of Performance" },
              { "id": "elh39-t1", "type": "short_text", "position": 1, "bodyText": "HVAC central chiller plants account for 40% to 60% of total electrical energy in tropical hotels. Chiller efficiency is measured by Coefficient of Performance (COP) or kW per ton of refrigeration (kW/TR). Most modern water-cooled centrifugal and screw chillers operate at peak efficiency (COP 5.5 to 7.0; 0.50 to 0.65 kW/TR) between 60% and 80% part-load capacity. Running three chillers at 30% load instead of two chillers at 70% load causes massive electrical penalty. Automated BMS staging algorithms must stage chillers based on real-time kW/TR plant efficiency rather than fixed time schedules." },
              { "id": "elh39-c1", "type": "callout", "variant": "info", "title": "Efficiency Metric", "bodyText": "Target a plant-wide central chiller efficiency of < 0.70 kW/TR (including chillers, primary/secondary pumps, and cooling tower fans)." }
            ]
          },
          {
            "title": "2. Eliminating Low Delta-T Syndrome in Chilled Water Loops",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Diagnosing why return chilled water temperature drops and how to restore 5.5°C to 6.0°C temperature differentials.",
            "contentBlocks": [
              { "id": "elh39-h2", "type": "heading", "level": 3, "text": "Diagnosing and Curing Low Delta-T Syndrome" },
              { "id": "elh39-t2", "type": "short_text", "position": 1, "bodyText": "Low Delta-T Syndrome occurs when chilled water returns to the plant at 9°C or 10°C instead of the design 12.5°C or 13°C (with 7°C supply). This forces the plant to run extra chillers and pumps simply to move water, even when total cooling capacity is unmet. Common causes include: (1) Passing 3-way bypass valves; (2) Fouled Air Handling Unit (AHU) cooling coils; (3) Improperly balanced balancing valves; and (4) Oversized control valves hunting for position. Installing Pressure Independent Control Valves (PICVs) and implementing coil cleaning schedules restores design delta-T and saves 20% in pumping energy." },
              { "id": "elh39-c2", "type": "callout", "variant": "tip", "title": "Delta-T Rule", "bodyText": "Every 1.0°C increase in chilled water return temperature increases effective chiller plant capacity by approximately 15%." }
            ]
          },
          {
            "title": "3. Cooling Towers, Heat Recovery & Desuperheaters",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Cooling tower wet-bulb approach management and capturing chiller waste heat for domestic hot water.",
            "contentBlocks": [
              { "id": "elh39-h3", "type": "heading", "level": 3, "text": "Cooling Tower Optimization & Free Hot Water Recovery" },
              { "id": "elh39-t3", "type": "short_text", "position": 1, "bodyText": "For every 1°C reduction in condenser water temperature entering the chiller from the cooling tower, chiller power consumption drops by 2.0% to 2.5%. Use Variable Frequency Drives (VFDs) on cooling tower fans to maintain an approach temperature of 2.5°C to 3.5°C above ambient wet-bulb temperature. Furthermore, installing **Desuperheaters (Heat Recovery Exchangers)** on the chiller compressor discharge line captures 15% to 20% of rejected heat, heating domestic water to 55–60°C for guest rooms and laundry, eliminating costly diesel or electric boiler operation." },
              { "id": "elh39-c3", "type": "callout", "variant": "action", "title": "Heat Recovery Invariant", "bodyText": "Capture chiller condensing heat to pre-heat domestic hot water before activating backup electric or fuel boilers." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Central Plant Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate central plant staging, delta-T diagnostics, and cooling tower maintenance decisions.",
            "contentBlocks": [
              {
                "id": "elh39-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Resolving Low Delta-T Chiller Staging Crisis",
                "prompt": "On a warm afternoon, your hotel chiller plant is running 3 chillers (300 TR each) at only 40% load. The supply temperature is 7.0°C, but the return chilled water is 8.8°C (Delta-T = 1.8°C instead of design 5.5°C). Chiller 3 was started automatically by the legacy BMS due to high flow rate, despite the plant needing only 360 TR total cooling. What is your engineering intervention?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Start a 4th chiller to cool down the return water even further.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Starting more chillers worsens low delta-T syndrome, increases parasitic pump power, and runs chillers at abysmal part-load efficiency."
                  },
                  {
                    "id": "opt_b",
                    "text": "Override the legacy flow-based staging to load-based (kW) staging, shut down Chiller 3, inspect secondary loop 3-way bypass valves, and modulate secondary pump VFDs to restore a 5.5°C delta-T across operating coils.",
                    "isCorrect": True,
                    "feedback": "Correct! Transitioning to load-based staging, shutting down the redundant chiller, and fixing bypass valve leakage cures low delta-T and saves immense electrical energy."
                  },
                  {
                    "id": "opt_c",
                    "text": "Turn off all cooling tower fans to save fan electricity.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Stopping tower fans causes condenser water temperatures to skyrocket, tripping chillers on high-pressure alarms."
                  },
                  {
                    "id": "opt_d",
                    "text": "Increase chilled water supply setpoint to 18°C.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Supplying 18°C water fails to dehumidify guest rooms, causing mold growth and guest complaints."
                  }
                ]
              },
              {
                "id": "elh39-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Cooling Tower Fouling & Chemical Scaling",
                "prompt": "During monthly plant inspection, you observe that cooling tower fill packs are heavily fouled with calcium carbonate scale and biological slime. The condenser water temperature entering Chiller 1 is 34°C when design is 29.5°C. What is the correct remediation?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Ignore the scale and increase chiller motor horsepower.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Scaling insulates tubes, increases compressor lift, and wastes up to 15-20% in extra electricity."
                  },
                  {
                    "id": "opt_b",
                    "text": "Execute chemical descaling and biocidal shock dosing of the tower fill, clean the chiller condenser tube bundles, calibrate the automated blowdown conductivity controller, and maintain cycles of concentration at 4.0 to 5.0.",
                    "isCorrect": True,
                    "feedback": "Correct! Thorough descaling, condenser tube cleaning, and automated conductivity blowdown control restores heat transfer and stops electrical waste."
                  },
                  {
                    "id": "opt_c",
                    "text": "Drain all water and run the cooling tower dry with no water circulation.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Running water-cooled chillers without condenser water causes immediate high-pressure compressor shutdown."
                  },
                  {
                    "id": "opt_d",
                    "text": "Pour engine oil into the cooling tower basin.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Introducing oil destroys heat transfer, fouls packing, and creates severe environmental and safety hazards."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Central Plant Governance & 30-Day Plant Action Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Implementing continuous plant logging, sensor calibration, and executing your 30-day HVAC optimization plan.",
            "contentBlocks": [
              { "id": "elh39-h4", "type": "heading", "level": 3, "text": "Institutionalizing Central Plant Logging Rhythms" },
              { "id": "elh39-t4", "type": "short_text", "position": 1, "bodyText": "Maintain hourly digital logging of plant operating parameters: (1) Chilled water supply/return temperatures and Delta-T; (2) Condenser water entering/leaving temperatures and Approach; (3) Total plant electrical kW and real-time kW/TR efficiency; and (4) Compressor suction/discharge pressures. Calibrate temperature sensors annually; a 0.5°C sensor calibration drift can trigger thousands of rupees in unneeded chiller staging." },
              { "id": "elh39-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Calculate your plant's real-time average kW/TR efficiency; (2) Audit chilled water return temperatures across all secondary loops to diagnose Low Delta-T Syndrome; and (3) Verify cooling tower approach temperatures and water conductivity blowdown controls." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is considered an excellent full-plant central chiller efficiency benchmark (including chillers, pumps, and cooling tower fans) for a tropical hotel?",
            "options": [
              "2.50 to 3.00 kW/TR",
              "Less than 0.70 kW/TR (or COP >= 5.0)",
              "0.00 kW/TR (zero electricity consumption)",
              "15.0 kW/TR"
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "A high-performance water-cooled chiller plant operates at an overall plant efficiency of < 0.70 kW/TR (including auxiliary pumps and cooling tower fans).",
            "incorrectExplanation": "Modern high-efficiency central chiller plants operate at under 0.70 kW per Ton of Refrigeration overall.",
            "optionFeedback": [
              "Incorrect. 2.50 kW/TR represents extremely inefficient, degraded equipment.",
              "Correct! < 0.70 kW/TR represents a modern, optimized water-cooled central chiller plant benchmark.",
              "Incorrect. Vapor compression chillers require electrical power to operate.",
              "Incorrect. 15.0 kW/TR is absurdly high and represents catastrophic failure."
            ],
            "practicalTakeaway": "Monitor total plant kW/TR (total plant power / cooling tons delivered) as your core central plant efficiency KPI.",
            "learningOutcome": "Evaluate central chiller plant efficiency benchmarks",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is 'Low Delta-T Syndrome' in a chilled water system and what is its primary operational consequence?",
            "options": [
              "When water freezes inside the pipes, stopping all water flow.",
              "When chilled water returns to the plant at a lower temperature than design (e.g. 9°C instead of 13°C), causing excessive pump and chiller staging without meeting cooling loads.",
              "When the cooling tower basin runs completely out of water.",
              "When hotel guests leave their room keys in the elevator."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Low Delta-T Syndrome occurs when return water is too cold, forcing unnecessary chillers and pumps to run just to meet flow requirements, degrading plant COP.",
            "incorrectExplanation": "Low Delta-T Syndrome means return water temperature is too low, wasting pumping energy and forcing extra chillers online.",
            "optionFeedback": [
              "Incorrect. Freezing is pipe freeze-up, not Low Delta-T Syndrome.",
              "Correct! Low Delta-T forces extra pumps and chillers online to move excess water, causing massive energy waste.",
              "Incorrect. Low basin level is a cooling tower water supply issue.",
              "Incorrect. Keycards have no connection to hydronic chilled water loops."
            ],
            "practicalTakeaway": "Fix bypass valve leakage and fouled AHU coils to restore 5.5°C design delta-T and cut pumping power.",
            "learningOutcome": "Diagnose and rectify Low Delta-T Syndrome",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "For every 1.0°C reduction in condenser water temperature entering the chiller from the cooling tower, how much does chiller energy consumption typically drop?",
            "options": [
              "0.0% (no effect)",
              "Approximately 2.0% to 2.5% reduction in chiller compressor power",
              "50.0% reduction",
              "100.0% reduction"
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Lower condenser water temperature reduces compressor discharge head pressure (lift), cutting compressor electrical consumption by ~2.0–2.5% per °C.",
            "incorrectExplanation": "Lower condenser water temperature reduces compressor lift, saving ~2.0–2.5% in chiller power per °C reduction.",
            "optionFeedback": [
              "Incorrect. Condenser water temperature has a major thermodynamic impact on compressor lift.",
              "Correct! Lowering condenser water temperature reduces compressor lift, cutting power by 2.0–2.5% per °C.",
              "Incorrect. A 50% drop from 1°C is thermodynamically impossible.",
              "Incorrect. Complete power elimination cannot occur while chillers run."
            ],
            "practicalTakeaway": "Optimize cooling tower fan VFDs to supply the lowest possible condenser water temperature above ambient wet-bulb.",
            "learningOutcome": "Optimize cooling tower condenser water temperatures",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "How does a Chiller Desuperheater / Heat Recovery Exchanger generate free domestic hot water for hotel guest rooms?",
            "options": [
              "By burning extra diesel fuel inside the chiller compressor motor.",
              "By capturing superheated refrigerant gas from the compressor discharge before it reaches the condenser, transferring heat to domestic water.",
              "By running electric immersion heaters inside the cooling tower basin.",
              "By circulating chilled water directly through guest showers."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Desuperheaters capture high-temperature rejected heat from compressor discharge gas, heating water to 55–60°C without additional fuel.",
            "incorrectExplanation": "Desuperheaters recover waste heat from compressor discharge refrigerant gas to pre-heat domestic water.",
            "optionFeedback": [
              "Incorrect. Chillers run on electricity and do not burn diesel internally.",
              "Correct! Capturing superheated refrigerant discharge heat produces free 55-60°C hot water for guest rooms and laundry.",
              "Incorrect. Immersion heaters in cooling towers waste energy and defeat tower cooling purpose.",
              "Incorrect. Chilled water is for air conditioning, not domestic hot water supply."
            ],
            "practicalTakeaway": "Install desuperheaters to capture chiller waste heat and eliminate fuel boiler costs for domestic hot water.",
            "learningOutcome": "Implement chiller waste heat recovery systems",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What happens when automated cooling tower blowdown conductivity controllers fail and mineral scale accumulates on chiller condenser tubes?",
            "options": [
              "The chiller produces colder air while using 50% less power.",
              "Mineral scale acts as a thermal insulator, increasing compressor discharge pressure and increasing electricity consumption by 10% to 20%.",
              "The cooling tower turns into a solar panel.",
              "Chilled water turns into drinking milk."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Scale insulates condenser tube walls, impairing heat rejection and forcing the compressor to work against higher condensing pressures, wasting massive electricity.",
            "incorrectExplanation": "Condenser scale impairs heat transfer, driving up condensing pressure and wasting 10-20% extra electrical power.",
            "optionFeedback": [
              "Incorrect. Scaling always degrades efficiency and increases power consumption.",
              "Correct! Mineral scale insulates heat transfer surfaces, increasing compressor head pressure and wasting 10-20% electricity.",
              "Incorrect. Cooling towers are evaporative heat rejection devices, not photovoltaic panels.",
              "Incorrect. Condenser water is an industrial circulating fluid, unrelated to dairy products."
            ],
            "practicalTakeaway": "Calibrate automated blowdown conductivity controllers and clean condenser tubes to prevent scale buildup.",
            "learningOutcome": "Maintain cooling tower water chemistry and condenser heat transfer",
            "competencyArea": "COMP_WATER"
          },
          {
            "question": "Why should chiller plant staging controls be based on real-time total cooling load (kW / TR) rather than water flow rates or fixed time schedules?",
            "options": [
              "Because load-based staging ensures chillers operate within their peak efficiency sweet spot (60-80% load) and prevents unnecessary chiller startup during Low Delta-T conditions.",
              "Because time schedules allow chillers to sleep during the day.",
              "Because water flow rates are impossible to measure with physical sensors.",
              "Because load-based staging allows the hotel to disconnect from the electrical grid permanently."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Load-based staging matches operating capacity to real thermal demand, preventing premature staging caused by high flow/low delta-T conditions.",
            "incorrectExplanation": "Load-based staging keeps chillers loaded in their optimal efficiency range and stops false staging from flow anomalies.",
            "optionFeedback": [
              "Correct! Load-based staging maintains chillers in their 60-80% peak COP sweet spot and prevents false starts during low delta-T.",
              "Incorrect. Chillers must operate continuously to maintain guest room comfort.",
              "Incorrect. Electromagnetic and ultrasonic flow meters measure water flow accurately.",
              "Incorrect. Central chillers remain connected to grid electrical power."
            ],
            "practicalTakeaway": "Program your BMS to stage chillers based on actual thermal load (kW of cooling) rather than water flow rate.",
            "learningOutcome": "Configure intelligent load-based chiller plant staging",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "How does sensor calibration drift affect central chiller plant efficiency?",
            "options": [
              "Sensor drift has zero impact on plant operations.",
              "A drift of just 0.5°C in chilled water temperature sensors can trigger false chiller staging or excessive subcooling, wasting tens of thousands of kWh annually.",
              "Sensor drift automatically turns off the hotel WiFi network.",
              "Sensor drift makes cooling tower fans spin backwards."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "BMS automation relies on precise telemetry; even minor temperature sensor calibration drift distorts staging logic and wastes significant energy.",
            "incorrectExplanation": "Small temperature sensor errors cause false staging, over-pumping, and substantial energy waste.",
            "optionFeedback": [
              "Incorrect. Telemetry precision is the foundation of automated plant efficiency.",
              "Correct! A 0.5°C sensor error causes false chiller staging and improper setpoints, wasting significant electricity.",
              "Incorrect. Temperature telemetry is isolated from guest IT networks.",
              "Incorrect. Fan rotation direction is determined by motor phase wiring, not sensor drift."
            ],
            "practicalTakeaway": "Calibrate chilled and condenser water temperature sensors annually using certified precision thermometers.",
            "learningOutcome": "Maintain sensor calibration and telemetry accuracy in BMS systems",
            "competencyArea": "COMP_DATA_ANALYTICS"
          },
          {
            "question": "Which action should a Chief Engineer prioritize within the first 30 days of a central plant optimization program?",
            "options": [
              "Replace all chillers immediately without analyzing current operational data.",
              "Calculate baseline plant kW/TR efficiency, audit secondary loop Delta-T, and verify cooling tower approach and blowdown controls.",
              "Disconnect all BMS automation and switch to manual toggle switches.",
              "Paint the cooling tower pipes purple for branding purposes."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The first 30 days must focus on establishing baseline kW/TR efficiency, diagnosing Low Delta-T Syndrome, and optimizing cooling tower approach.",
            "incorrectExplanation": "Prioritize baseline efficiency logging, delta-T diagnostics, and cooling tower water treatment during kickoff.",
            "optionFeedback": [
              "Incorrect. Replacing chillers without baseline data leads to severe capital misallocation.",
              "Correct! Logging plant kW/TR, auditing loop delta-T, and checking cooling towers establishes immediate operational control.",
              "Incorrect. Disabling BMS automation degrades plant control and increases human error.",
              "Incorrect. Pipe aesthetics provide zero thermodynamic or efficiency benefit."
            ],
            "practicalTakeaway": "Audit your central plant's kW/TR efficiency and chilled water Delta-T during your first month of optimization.",
            "learningOutcome": "Execute a 30-day central plant HVAC optimization roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 8. ELH-43: Energy-Efficient Hotel Guest Rooms & Smart Controls (D3)
      {
        "courseCode": "ELH-43",
        "title": "Energy-Efficient Hotel Guest Rooms & Smart Controls",
        "slug": "energy-efficient-hotel-guest-rooms-and-smart-controls",
        "description": "Master guest room energy management systems (EMS), smart occupancy sensing, balcony door HVAC interlocks, LED lighting design, and plug load management in hotels.",
        "fullDescription": "Energy-Efficient Hotel Guest Rooms & Smart Controls equips hotel engineering supervisors, room operations leads, and IT/BMS technicians to optimize guest room energy consumption while elevating guest comfort. Learn how to deploy networked Energy Management Systems (EMS) with Passive Infrared (PIR) and thermal occupancy sensing, integrate magnetic balcony door HVAC cut-off interlocks, manage standby phantom plug loads, calibrate smart setback temperature algorithms, and configure PMS-integrated check-in temperature welcomes.",
        "categoryId": 2,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_ENERGY",
        "secondaryCompetencies": ["COMP_TECHNOLOGY", "COMP_BEHAVIORAL_CHANGE"],
        "learningObjectives": [
          "Deploy networked Guest Room Energy Management Systems (EMS) integrated with Property Management Systems (PMS).",
          "Configure multi-tier temperature setback algorithms (Sold/Unoccupied vs Sold/Occupied vs Unsold).",
          "Install and maintain magnetic balcony door interlocks to prevent open-door HVAC cooling waste.",
          "Eliminate room vampire standby loads and optimize warm-dim LED architectural lighting layouts."
        ],
        "intendedRoles": ["Hotel Engineers", "Room Operations Managers", "BMS Technicians", "Resort Operations Leads"],
        "badgeName": "Smart Guest Room Specialist",
        "badgeDescription": "Demonstrated competence in deploying guest room energy management systems, smart sensors, and HVAC interlocks.",
        "completionMessage": "Congratulations! You have completed Energy-Efficient Hotel Guest Rooms & Smart Controls and are prepared to deploy smart room efficiency.",
        "recommendedNextCourseCode": "ELH-45",
        "lessons": [
          {
            "title": "1. Guest Room Energy Profile & Smart EMS Architecture",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Analyzing room energy breakdown and transitioning from dumb keycard slots to networked smart EMS.",
            "contentBlocks": [
              { "id": "elh43-h1", "type": "heading", "level": 3, "text": "The Anatomy of Guest Room Energy Consumption" },
              { "id": "elh43-t1", "type": "short_text", "position": 1, "bodyText": "Guest rooms represent 70% to 80% of a resort's total built area. Air conditioning represents 65% to 75% of room energy, lighting accounts for 15%, and mini-bars/electronics account for 10%. Traditional mechanical keycard switches are easily defeated by guests inserting business cards or dummy keys, leaving air conditioners running at 18°C 24 hours a day while guests spend the entire day on the beach. Modern networked **Energy Management Systems (EMS)** use wireless door contacts and dual-technology Passive Infrared (PIR) + thermal occupancy sensors to accurately determine room occupancy without relying on keycard insertion." },
              { "id": "elh43-c1", "type": "callout", "variant": "info", "title": "Networked EMS Invariant", "bodyText": "Networked EMS integrated with PMS saves 25% to 35% in room cooling energy compared to traditional keycard slots." }
            ]
          },
          {
            "title": "2. Multi-Tier Temperature Setback Algorithms & PMS Integration",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Configuring Unsold, Sold/Unoccupied, and Sold/Occupied temperature setback curves.",
            "contentBlocks": [
              { "id": "elh43-h2", "type": "heading", "level": 3, "text": "Smart Dynamic Temperature Setbacks" },
              { "id": "elh43-t2", "type": "short_text", "position": 1, "bodyText": "Networked EMS operates with three automated operational states: (1) **Unsold Vacant**: Thermostat setback to 26°C with minimum airflow to maintain mold-free humidity (< 60% RH); (2) **Sold / Check-In Pending**: Upon PMS guest check-in at front desk, EMS pre-cools the room to a welcoming 22°C before guest arrival; and (3) **Sold / Unoccupied**: When guest leaves the room for > 15 minutes, thermostat drifts dynamically by 2.0°C to 2.5°C above guest setpoint. Upon guest re-entry, the room rapidly recovers to the preferred temperature within 3 minutes, preserving guest delight while eliminating waste." },
              { "id": "elh43-c2", "type": "callout", "variant": "tip", "title": "Setback Rule", "bodyText": "Setbacks must allow fast recovery (< 3 minutes) so returning guests never experience a stuffy or overheated room." }
            ]
          },
          {
            "title": "3. Balcony Door Interlocks & Plug Load Governance",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Installing magnetic door interlocks and eliminating mini-bar/entertainment vampire standby power.",
            "contentBlocks": [
              { "id": "elh43-h3", "type": "heading", "level": 3, "text": "Balcony Door Interlocks & Vampire Load Elimination" },
              { "id": "elh43-t3", "type": "short_text", "position": 1, "bodyText": "In coastal resorts, guests frequently open balcony doors to enjoy the ocean breeze while leaving the air conditioner running. This introduces hot, humid ambient air, causing severe condensation, mold growth on ceilings, and massive refrigeration compressor load. Magnetic balcony door switches automatically pause the Fan Coil Unit (FCU) after the door remains open for > 60 seconds. Furthermore, installing master switched outlets de-energizes smart TVs, coffee machines, and desk lamps upon room vacancy, eliminating phantom standby loads." },
              { "id": "elh43-c3", "type": "callout", "variant": "action", "title": "Balcony Interlock Standard", "bodyText": "Configure a 60-second delay on balcony door switches to prevent annoying HVAC shutdowns during brief step-outs." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Smart Room Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate EMS setback programming, guest comfort trade-offs, and interlock maintenance.",
            "contentBlocks": [
              {
                "id": "elh43-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Balancing Guest Comfort with Deep Energy Setbacks",
                "prompt": "Your resort installed a new smart EMS. The energy consultant set the unoccupied setback temperature to 28°C. Guests returning from the beach complain that rooms feel hot and humid, and room attendants report condensation on mirrors. What is your engineering adjustment?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Disable the entire smart EMS system and let chillers run at 18°C permanently.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Abandoning the EMS forfeits 30% in potential energy savings and locks in high operational costs."
                  },
                  {
                    "id": "opt_b",
                    "text": "Calibrate the unoccupied setback to 24.5°C with active humidity control (dehumidification cycle), ensuring maximum recovery time under 3 minutes upon guest re-entry while preventing room condensation.",
                    "isCorrect": True,
                    "feedback": "Correct! Tightening the setback to 24.5°C and maintaining active humidity control eliminates condensation and ensures rapid thermal recovery when guests return."
                  },
                  {
                    "id": "opt_c",
                    "text": "Remove all air conditioning thermostats from guest rooms.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Denying guests thermal control violates luxury hospitality standards and causes severe guest dissatisfaction."
                  },
                  {
                    "id": "opt_d",
                    "text": "Tell Front Desk staff to advise guests that sweating is healthy.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Dismissing guest comfort concerns ruins brand reputation and online guest review scores."
                  }
                ]
              },
              {
                "id": "elh43-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Bypassed Balcony Door Magnetic Switches",
                "prompt": "During a floor audit, you discover that room attendants have taped rare-earth magnets to the door contact sensors in 25 guest rooms so that the air conditioner continues running with the balcony door wide open during 4-hour morning cleaning sessions. What do you do?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Ignore the tape and let attendants cool the outdoor ocean air.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Cooling outdoor ocean air causes massive energy waste, condensation on ducts, and severe mold hazards."
                  },
                  {
                    "id": "opt_b",
                    "text": "Remove all taped magnets immediately, conduct a hands-on training session with housekeeping explaining why open-door cooling causes ceiling mold and water damage, and install tamper-proof recessed sensors.",
                    "isCorrect": True,
                    "feedback": "Correct! Removing physical bypasses, educating staff on mold risks, and upgrading to recessed tamper-proof sensors solves the root operational problem."
                  },
                  {
                    "id": "opt_c",
                    "text": "Nail all balcony doors shut permanently.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Sealing balcony doors violates life safety fire codes and ruins the resort guest experience."
                  },
                  {
                    "id": "opt_d",
                    "text": "Cut the power to the entire guest floor switchboard.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Cutting floor power shuts down guest Wi-Fi, lighting, and life safety systems."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Smart Room Governance & 30-Day Room Efficiency Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Establishing preventative room EMS testing routines and executing your 30-day room action plan.",
            "contentBlocks": [
              { "id": "elh43-h4", "type": "heading", "level": 3, "text": "Institutionalizing Preventative Room Checks" },
              { "id": "elh43-t4", "type": "short_text", "position": 1, "bodyText": "Include 3 smart EMS checkpoints in monthly preventative maintenance (PM) room audits: (1) Balcony door 60-second FCU cut-off test; (2) Occupancy sensor trigger verification; and (3) Thermostat temperature calibration check. Regular testing ensures sensor failures or bypasses are caught before they generate months of utility waste." },
              { "id": "elh43-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Test balcony door interlocks in a 20-room sample; (2) Review and tighten unoccupied setback temperatures in your EMS software; and (3) Train housekeeping supervisors on identifying sensor tampering." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary operational weakness of traditional mechanical keycard slots compared to smart networked Energy Management Systems (EMS)?",
            "options": [
              "Keycard slots use too much electrical power to hold the card.",
              "Guests easily bypass keycard slots by inserting business cards or dummy cards, keeping air conditioning running 24/7 in empty rooms.",
              "Keycard slots permanently erase guest credit card data.",
              "Keycard slots prevent room lights from functioning."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Dummy cards or business cards easily defeat traditional slots; smart EMS uses true occupancy sensing (PIR + thermal) to eliminate empty-room waste.",
            "incorrectExplanation": "Traditional keycard slots are easily bypassed by guests leaving dummy cards in slots while away from rooms.",
            "optionFeedback": [
              "Incorrect. Keycard slots consume negligible power themselves.",
              "Correct! Dummy cards easily defeat mechanical slots, whereas smart EMS detects actual human occupancy.",
              "Incorrect. Keycard slots do not interface with banking credit cards.",
              "Incorrect. Keycard slots turn on lights when a card is inserted."
            ],
            "practicalTakeaway": "Upgrade to networked smart EMS with PIR/thermal sensing to prevent dummy-card bypass waste.",
            "learningOutcome": "Compare traditional keycard slots with smart networked EMS",
            "competencyArea": "COMP_TECHNOLOGY"
          },
          {
            "question": "In a smart EMS, what is the purpose of the 'Sold / Check-In Pending' temperature state?",
            "options": [
              "To keep the room at 35°C to kill bacteria.",
              "To pre-cool the guest room to a comfortable welcome temperature (e.g. 22°C) upon PMS check-in so the guest arrives to an inviting room without 24/7 pre-cooling waste.",
              "To turn off all electricity permanently in the room.",
              "To broadcast loud music into the hallway."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "PMS integration pre-cools the room only when the guest physically checks in at the front desk, ensuring arrival comfort while saving energy while unsold.",
            "incorrectExplanation": "PMS integration enables just-in-time welcome cooling when a guest checks in, avoiding days of cooling empty unsold rooms.",
            "optionFeedback": [
              "Incorrect. Excessive heat causes discomfort and damages interior finishes.",
              "Correct! Pre-cooling upon front desk check-in provides a perfect guest arrival experience without cooling empty rooms for days.",
              "Incorrect. Check-in pending activates systems just in time for arrival.",
              "Incorrect. EMS controls thermal HVAC and lighting, not hallway audio."
            ],
            "practicalTakeaway": "Integrate your EMS with the hotel PMS to enable just-in-time welcome pre-cooling.",
            "learningOutcome": "Configure PMS-integrated temperature setback workflows",
            "competencyArea": "COMP_TECHNOLOGY"
          },
          {
            "question": "Why is a 60-second time delay recommended for magnetic balcony door HVAC cut-off switches?",
            "options": [
              "To give guests time to escape in an emergency.",
              "To prevent annoying compressor cycling and air conditioner shutoffs when a guest briefly steps onto the balcony to look at the view.",
              "To allow hot air to warm up the room completely.",
              "To save electrical battery life on the door sensor."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "A 60-second buffer accommodates brief balcony step-outs without cycling equipment, while shutting down HVAC if doors are left open long-term.",
            "incorrectExplanation": "A short 60-second delay avoids nuisance shutdowns during brief step-outs while preventing open-door cooling waste.",
            "optionFeedback": [
              "Incorrect. Life safety egress is independent of HVAC door interlock delays.",
              "Correct! A 60-second buffer prevents annoying short-cycling while stopping massive open-door cooling waste.",
              "Incorrect. The objective is to conserve energy, not overheat rooms.",
              "Incorrect. Hardwired or low-power wireless sensors operate reliably regardless of delay timers."
            ],
            "practicalTakeaway": "Configure a 60-second delay on balcony door switches to maintain high guest satisfaction while preventing open-door cooling.",
            "learningOutcome": "Configure balcony door HVAC interlock parameters",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is the primary risk of running air conditioning in a coastal resort guest room while balcony doors remain wide open?",
            "options": [
              "The air conditioner will transform into an ice machine.",
              "Warm humid ambient air enters, causing severe condensation, moisture damage, mold growth on ceilings, and massive refrigeration compressor load.",
              "The television will automatically change channels.",
              "The room carpet will instantly evaporate."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Hot humid air entering an air-conditioned room causes immediate condensation on cold supply grilles and ceilings, leading to destructive mold growth.",
            "incorrectExplanation": "Open doors in humid climates cause severe moisture condensation, mold outbreaks, and heavy HVAC energy penalties.",
            "optionFeedback": [
              "Incorrect. Chilled water coils cool air but do not produce ice cubes.",
              "Correct! High humidity causes severe duct and ceiling condensation, leading to costly mold remediation and equipment overload.",
              "Incorrect. TV channels are controlled by guest remotes, not humidity.",
              "Incorrect. Moisture causes carpet dampness and mold, not evaporation."
            ],
            "practicalTakeaway": "Enforce balcony door interlocks to prevent destructive moisture condensation and mold in coastal resort rooms.",
            "learningOutcome": "Identify condensation and mold risks from open-door HVAC operation",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is 'Vampire / Phantom Load' in guest rooms and how can it be mitigated?",
            "options": [
              "Blood-sucking insects in the bed.",
              "Standby electrical power consumed by TVs, coffee machines, and electronics when turned off, mitigated by master switched relay circuits connected to the EMS.",
              "High utility rates charged by electricity companies at night.",
              "Excessive water pressure in the bathroom shower."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Vampire load is standby electrical consumption by appliances; master switched circuits cut power to non-essential loads when the room is vacant.",
            "incorrectExplanation": "Vampire loads are standby electrical drains from plugged-in appliances, eliminated via master relay shutoffs upon vacancy.",
            "optionFeedback": [
              "Incorrect. Vampire load is an electrical engineering term for standby power.",
              "Correct! Master switched relays de-energize standby electronics when rooms are vacant, eliminating phantom power waste.",
              "Incorrect. Electricity tariffs are utility rate structures, not phantom loads.",
              "Incorrect. Water pressure is a plumbing metric, unrelated to electrical standby power."
            ],
            "practicalTakeaway": "Wire non-essential guest room outlets through master EMS relays to eliminate phantom standby power when rooms are vacant.",
            "learningOutcome": "Mitigate standby phantom electrical loads in guest rooms",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "When designing guest room lighting retrofits, why is warm-dim LED technology (2700K–2200K) preferred over standard commercial cool-white LEDs (4000K–6500K)?",
            "options": [
              "Because cool-white lighting is strictly illegal in all hotel rooms worldwide.",
              "Because warm-dim LEDs replicate traditional incandescent ambience, enhance relaxation and circadian sleep quality, and deliver 80%+ energy savings.",
              "Because cool-white LEDs consume five times more electricity than warm LEDs.",
              "Because warm-dim LEDs produce zero heat whatsoever."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Warm-dim LEDs provide the relaxing, cozy residential lighting atmosphere expected in luxury hospitality while delivering modern LED energy efficiency.",
            "incorrectExplanation": "Warm-dim LEDs deliver cozy hospitality aesthetics and circadian comfort while cutting lighting energy by over 80%.",
            "optionFeedback": [
              "Incorrect. Cool-white LEDs are legal but create a sterile, clinical atmosphere unsuitable for luxury bedrooms.",
              "Correct! Warm-dim LEDs provide relaxing residential warmth, support circadian sleep rhythms, and cut energy by > 80%.",
              "Incorrect. Both LED color temperatures have similar luminous efficacy.",
              "Incorrect. All LEDs produce minor heat at the semiconductor junction."
            ],
            "practicalTakeaway": "Specify warm-dim 2700K–2200K LEDs in guest rooms to deliver luxury aesthetic comfort and 80% energy savings.",
            "learningOutcome": "Design energy-efficient hospitality lighting schemes",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is the recommended temperature drift setting for a Sold/Unoccupied guest room during daytime hours?",
            "options": [
              "Drift by 15°C above guest setpoint (reaching 37°C).",
              "Drift by 2.0°C to 2.5°C above guest setpoint (maintaining maximum 24.5°C–25°C), allowing recovery in under 3 minutes upon return.",
              "Turn off the air conditioning completely until the guest calls front desk.",
              "Lock the room temperature at 15°C all day."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "A 2.0–2.5°C drift saves significant cooling energy while ensuring the room can quickly recover to the guest's setpoint within 3 minutes of re-entry.",
            "incorrectExplanation": "A 2.0-2.5°C setback balances deep energy savings with rapid 3-minute thermal recovery when the guest returns.",
            "optionFeedback": [
              "Incorrect. Excessive drift causes severe overheating and long, frustrating recovery times.",
              "Correct! A 2.0–2.5°C drift delivers major energy savings while ensuring fast < 3 minute recovery upon guest return.",
              "Incorrect. Complete shutdown causes stuffiness and high guest complaints.",
              "Incorrect. Chilling empty rooms to 15°C causes massive energy waste."
            ],
            "practicalTakeaway": "Program unoccupied setbacks to drift no more than 2.0–2.5°C above guest setpoints to ensure fast thermal recovery.",
            "learningOutcome": "Program optimal dynamic room temperature setbacks",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "Which action should be completed within the first 30 days of guest room EMS optimization?",
            "options": [
              "Audit balcony door interlocks across a sample of guest rooms, calibrate unoccupied setback temperatures, and check for sensor bypass tampering.",
              "Remove all windows and doors from guest suites.",
              "Increase electricity rates billed directly to guest personal credit cards.",
              "Replace all room air conditioners with manual ceiling fans only."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The first 30 days should focus on sampling door interlocks, fine-tuning setback algorithms, and eliminating sensor bypasses.",
            "incorrectExplanation": "Prioritize interlock testing, setback calibration, and tamper checks during early implementation.",
            "optionFeedback": [
              "Correct! Auditing interlocks, calibrating setbacks, and checking for bypasses establishes immediate room energy control.",
              "Incorrect. Removing windows and doors destroys guest security and comfort.",
              "Incorrect. Surcharging guests for standard electricity destroys hospitality guest satisfaction.",
              "Incorrect. Removing AC in luxury tropical resorts causes immediate guest walkouts."
            ],
            "practicalTakeaway": "Test balcony door switches and calibrate unoccupied setback temperatures during your first 30 days.",
            "learningOutcome": "Execute a 30-day guest room energy optimization roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 9. ELH-45: Sustainable Hospitality Sourcing & Local Purchasing (D3)
      {
        "courseCode": "ELH-45",
        "title": "Sustainable Hospitality Sourcing & Local Purchasing",
        "slug": "sustainable-hospitality-sourcing-and-local-purchasing",
        "description": "Master sustainable procurement in hospitality, local grower partnerships, seafood sustainability standards, packaging reduction, and supplier ESG audits in island economies.",
        "fullDescription": "Sustainable Hospitality Sourcing & Local Purchasing equips procurement managers, executive chefs, F&B directors, and supply chain leads to build resilient, low-carbon supply chains in island hospitality markets. Learn how to establish farm-to-table grower cooperatives, enforce sustainable seafood sourcing (MSC/WWF guidelines), eliminate single-use supplier packaging through reusable crates, conduct supplier ESG compliance audits, and calculate Scope 3 supply chain carbon reductions.",
        "categoryId": 2,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_SUPPLY_CHAIN",
        "secondaryCompetencies": ["COMP_SOCIAL_COMMUNITY", "COMP_CIRCULARITY"],
        "learningObjectives": [
          "Establish direct local purchasing partnerships with Mauritian agricultural and artisanal producers.",
          "Implement sustainable seafood procurement policies adhering to sustainable catch and seasonal ban criteria.",
          "Eliminate single-use supplier packaging through closed-loop returnable crate systems.",
          "Conduct formal Supplier ESG Code of Conduct audits across top hospitality vendors."
        ],
        "intendedRoles": ["Procurement Managers", "Purchasing Officers", "Executive Chefs", "F&B Directors", "Supply Chain Leads"],
        "badgeName": "Sustainable Procurement Specialist",
        "badgeDescription": "Demonstrated competence in sustainable hospitality sourcing, local supplier partnerships, and circular packaging.",
        "completionMessage": "Congratulations! You have completed Sustainable Hospitality Sourcing & Local Purchasing and are prepared to build resilient green supply chains.",
        "recommendedNextCourseCode": "ELH-47",
        "lessons": [
          {
            "title": "1. Island Supply Chain Realities & Local Sourcing Strategy",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why food miles and import reliance create supply vulnerabilities and how local sourcing builds resilience.",
            "contentBlocks": [
              { "id": "elh45-h1", "type": "heading", "level": 3, "text": "Overcoming Island Import Vulnerabilities" },
              { "id": "elh45-t1", "type": "short_text", "position": 1, "bodyText": "Island economies like Mauritius often import up to 70% of luxury hotel food and consumables, generating heavy Scope 3 air/maritime freight emissions, packaging waste, and vulnerability to shipping disruptions. Transitioning to strategic local sourcing strengthens community economic development, guarantees fresh culinary ingredients, and cuts carbon footprint. Leading resorts establish annual volume commitments with local agricultural cooperatives and smallholder hydro-farms, providing predictable cash flow to growers while securing reliable culinary supply." },
              { "id": "elh45-c1", "type": "callout", "variant": "info", "title": "Local Sourcing Principle", "bodyText": "Prioritize local suppliers within a 50km radius for fresh herbs, vegetables, fruits, and dairy to minimize freight and refrigeration loss." }
            ]
          },
          {
            "title": "2. Sustainable Seafood Procurement & Certification Standards",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Navigating Marine Stewardship Council (MSC), WWF Red Lists, and seasonal fishing bans in Indian Ocean waters.",
            "contentBlocks": [
              { "id": "elh45-h2", "type": "heading", "level": 3, "text": "Enforcing Marine Conservation Standards" },
              { "id": "elh45-t2", "type": "short_text", "position": 1, "bodyText": "Serving overfished or illegally caught marine species damages hotel brand reputation and devastates local lagoon ecosystems. An audit-compliant Sustainable Seafood Policy requires: (1) 100% elimination of endangered species (e.g. sharks, rays, bluefin tuna, juvenile reef fish); (2) Strict adherence to local seasonal fishing bans (e.g. octopus seasonal closures); and (3) Preference for certified sustainable fisheries (MSC, ASC) or registered local artisanal pole-and-line fishers who practice selective harvesting." },
              { "id": "elh45-c2", "type": "callout", "variant": "tip", "title": "Seafood Sourcing Rule", "bodyText": "Never purchase undersized fish or species during statutory lagoon breeding ban periods." }
            ]
          },
          {
            "title": "3. Closed-Loop Packaging & Supplier ESG Audits",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Mandating reusable collapsible delivery crates and auditing tier-1 vendor labor and environmental practices.",
            "contentBlocks": [
              { "id": "elh45-h3", "type": "heading", "level": 3, "text": "Eliminating Single-Use Delivery Packaging" },
              { "id": "elh45-t3", "type": "short_text", "position": 1, "bodyText": "Every morning, hotel receiving docks receive thousands of single-use cardboard boxes, plastic wrap, and styrofoam containers that immediately enter the waste stream. Implement a **Returnable Transport Packaging (RTP)** system where suppliers deliver produce in sanitized, collapsible plastic crates that are exchanged on a 1-for-1 basis at the loading bay. Furthermore, mandate that all top 20 suppliers sign and adhere to the Supplier Sustainability Code of Conduct, backed by annual on-site audits." },
              { "id": "elh45-c3", "type": "callout", "variant": "action", "title": "Supplier Code Policy", "bodyText": "Incorporate ESG audit compliance clauses into all multi-year vendor master supply contracts." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Procurement Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate price vs sustainability trade-offs, packaging mandates, and seafood verification.",
            "contentBlocks": [
              {
                "id": "elh45-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Resolving Price Spikes in Local Organic Vegetables",
                "prompt": "Due to heavy cyclone rainfall, local smallholder organic farmers increase their tomato and lettuce prices by 25% for 3 weeks. A broadline multinational food distributor offers imported air-freighted produce from Europe in plastic clamshells at a 15% discount. How should the Purchasing Manager and Executive Chef respond?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Immediately terminate all contracts with local farmers and switch 100% to imported air-freighted produce.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Abandoning local farmers during climatic emergencies destroys community trust, increases Scope 3 air freight emissions, and leaves your resort vulnerable to global supply shocks."
                  },
                  {
                    "id": "opt_b",
                    "text": "Maintain partnerships with local growers by adapting the seasonal menu (highlighting resilient root vegetables and local greens) while temporarily absorbing partial price variance to preserve long-term supply resilience.",
                    "isCorrect": True,
                    "feedback": "Correct! Menu flexibility and supporting local agricultural partners through climate disruptions builds resilient, low-carbon supply ecosystems."
                  },
                  {
                    "id": "opt_c",
                    "text": "Stop serving any vegetables in the hotel restaurants.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Eliminating fresh vegetables violates culinary nutrition and hospitality quality standards."
                  },
                  {
                    "id": "opt_d",
                    "text": "Force local farmers to sell below their production cost under threat of legal action.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Predatory purchasing practices bankrupt local growers and violate corporate ethical procurement standards."
                  }
                ]
              },
              {
                "id": "elh45-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Supplier Delivering in Single-Use Styrofoam Boxes",
                "prompt": "Your seafood vendor arrives at the receiving dock delivering fresh fish packed in 40 non-recyclable expanded polystyrene (styrofoam) cooler boxes, despite a contractual agreement mandating returnable sanitized insulated food-grade plastic bins. What is the correct dock procedure?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Accept the delivery and pay a waste contractor to throw the styrofoam into the local landfill.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Accepting non-compliant packaging undermines corporate zero-waste policies and incurs extra landfill disposal costs."
                  },
                  {
                    "id": "opt_b",
                    "text": "Accept the fresh fish after immediate temperature verification, decant the fish into the hotel's sanitized receiving bins, hand the styrofoam boxes back to the delivery driver on the spot, and issue a formal non-conformance warning to the supplier.",
                    "isCorrect": True,
                    "feedback": "Correct! Preserving food safety while returning non-compliant packaging immediately to the vendor enforces contractual zero-waste standards."
                  },
                  {
                    "id": "opt_c",
                    "text": "Burn the styrofoam boxes on the resort beach.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Burning styrofoam releases toxic styrene gas and dioxins, posing extreme health and legal hazards."
                  },
                  {
                    "id": "opt_d",
                    "text": "Throw the fresh fish into the ocean because of the packaging.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Wasting edible food is ethically unacceptable and incurs financial loss."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Sustainable Sourcing Governance & 30-Day Procurement Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Establishing vendor scorecards and executing your 30-day sustainable purchasing plan.",
            "contentBlocks": [
              { "id": "elh45-h4", "type": "heading", "level": 3, "text": "Institutionalizing Vendor ESG Scorecards" },
              { "id": "elh45-t4", "type": "short_text", "position": 1, "bodyText": "Incorporate a 15% ESG scoring weighting into all annual vendor tender evaluations. Track four core supplier KPIs: (1) Delivery packaging returnability rate (target >= 95%); (2) Local origin percentage (target >= 60% for fresh produce); (3) Code of Conduct audit compliance; and (4) Timely invoice and fair wage verification. Review vendor scorecards quarterly to reward leading sustainable suppliers with multi-year preferred volume commitments." },
              { "id": "elh45-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Audit your top 10 F&B suppliers for returnable crate adoption; (2) Implement a formal Sustainable Seafood Procurement Policy with kitchen teams; and (3) Send the Supplier Sustainability Code of Conduct to all tier-1 vendors for signature." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary operational and environmental benefit of replacing single-use cardboard and styrofoam boxes with Returnable Transport Packaging (RTP) crates?",
            "options": [
              "It makes the receiving dock smell like gasoline.",
              "It eliminates hundreds of thousands of disposable packaging units, cuts dock waste handling labor, and protects fresh produce from transport crushing.",
              "It increases the weight of cardboard in landfills by 500%.",
              "It requires suppliers to fly produce on private planes."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Reusable returnable crates eliminate single-use packaging waste, streamline dock handling, and protect food quality during transport.",
            "incorrectExplanation": "Returnable plastic crates eliminate packaging waste, reduce dock labor, and improve produce protection.",
            "optionFeedback": [
              "Incorrect. Food-grade plastic crates are odorless and sanitized.",
              "Correct! Returnable crates eliminate disposable packaging waste, lower handling labor, and prevent product damage.",
              "Incorrect. Reusable crates eliminate cardboard from entering landfills.",
              "Incorrect. Reusable packaging is optimized for ground and marine freight, not private planes."
            ],
            "practicalTakeaway": "Implement returnable plastic crate exchange systems at loading docks to eliminate single-use delivery packaging.",
            "learningOutcome": "Deploy Returnable Transport Packaging (RTP) systems",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "What is a mandatory requirement for an audit-compliant Sustainable Seafood Policy in Indian Ocean hospitality operations?",
            "options": [
              "Purchasing exclusively frozen imported fish sticks.",
              "100% elimination of endangered/IUCN red-listed marine species and strict adherence to statutory seasonal fishing bans (e.g. octopus bans).",
              "Permitting chefs to buy undersized juvenile fish if offered at a 50% discount.",
              "Allowing spearfishing in marine protected reserves."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Sustainable seafood policies strictly prohibit endangered species and require compliance with seasonal breeding bans to protect marine ecosystems.",
            "incorrectExplanation": "Sustainable seafood requires eliminating endangered species and respecting statutory seasonal breeding bans.",
            "optionFeedback": [
              "Incorrect. Frozen fish sticks do not represent sustainable local culinary procurement.",
              "Correct! Eliminating endangered species and honoring seasonal breeding closures is mandatory for marine conservation compliance.",
              "Incorrect. Purchasing undersized juvenile fish destroys marine breeding stock.",
              "Incorrect. Fishing in marine protected reserves is an illegal act that violates environmental law."
            ],
            "practicalTakeaway": "Audit kitchen seafood purchasing against IUCN red lists and statutory seasonal fishing bans.",
            "learningOutcome": "Implement sustainable seafood procurement standards",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Why is partnering directly with local agricultural cooperatives advantageous for hotel supply chain resilience?",
            "options": [
              "Because local growers can produce heavy machinery on demand.",
              "It reduces vulnerability to maritime shipping disruptions, lowers Scope 3 freight emissions, and guarantees fresher produce while supporting community economies.",
              "It allows hotels to avoid paying for food entirely.",
              "It eliminates the need for refrigeration in hotel kitchens."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Direct local farming partnerships buffer island resorts against shipping delays, deliver fresh culinary quality, and reduce supply chain carbon.",
            "incorrectExplanation": "Local grower partnerships build resilience against import shocks and support local economic development.",
            "optionFeedback": [
              "Incorrect. Agricultural cooperatives specialize in food production, not heavy equipment.",
              "Correct! Local grower partnerships reduce shipping vulnerability, cut carbon footprint, and ensure culinary freshness.",
              "Incorrect. Food procurement involves fair financial compensation for growers.",
              "Incorrect. Food safety refrigeration remains essential for all fresh ingredients."
            ],
            "practicalTakeaway": "Establish multi-season forward volume contracts with local agricultural cooperatives to secure fresh culinary supply.",
            "learningOutcome": "Build resilient local agricultural supplier partnerships",
            "competencyArea": "COMP_SUPPLY_CHAIN"
          },
          {
            "question": "What is the recommended weighting for ESG and sustainability criteria in annual hospitality vendor tender scorecards?",
            "options": [
              "0% (price must be the only selection factor).",
              "10% to 15% of total evaluation scoring weighting.",
              "100% (pricing and food quality should be completely ignored).",
              "500%."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Allocating 10% to 15% of tender weighting to ESG ensures sustainability meaningfully influences vendor selection alongside price and quality.",
            "incorrectExplanation": "A 10–15% weighting embeds ESG standards into purchasing decisions without compromising quality or financial viability.",
            "optionFeedback": [
              "Incorrect. A 0% weighting ignores supply chain ESG risks and packaging waste.",
              "Correct! A 10-15% ESG tender weighting drives vendor sustainability compliance while maintaining competitive commercial terms.",
              "Incorrect. 100% weighting ignores culinary quality and financial viability.",
              "Incorrect. 500% is mathematically invalid."
            ],
            "practicalTakeaway": "Assign 10-15% of tender scoring to vendor ESG compliance and packaging returnability.",
            "learningOutcome": "Incorporate ESG criteria into vendor tender scorecards",
            "competencyArea": "COMP_SUPPLY_CHAIN"
          },
          {
            "question": "How should a procurement team respond when a tier-1 supplier refuses to sign the corporate Supplier Sustainability Code of Conduct?",
            "options": [
              "Award them a 10-year exclusive monopoly contract.",
              "Engage with the vendor to address specific concerns, provide guidance on compliance, and establish a time-bound phase-in period or transition to a compliant alternative supplier.",
              "Immediately delete all historical purchasing records.",
              "Ignore the refusal and pretend the document was signed."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Procurement should engage constructively with suppliers to explain expectations, offering a transition runway before replacing non-compliant vendors.",
            "incorrectExplanation": "Constructive vendor engagement combined with clear compliance deadlines ensures supply chain standard enforcement.",
            "optionFeedback": [
              "Incorrect. Rewarding non-compliance destroys supply chain governance.",
              "Correct! Explaining standards, providing phase-in support, and holding firm on compliance maintains supply integrity.",
              "Incorrect. Deleting purchasing records violates financial accounting laws.",
              "Incorrect. Falsifying compliance signatures violates corporate governance and audit standards."
            ],
            "practicalTakeaway": "Work with suppliers to build sustainability capacity while maintaining firm deadlines for Code of Conduct compliance.",
            "learningOutcome": "Manage supplier ESG non-compliance and onboarding",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "What is the primary environmental drawback of importing bottled drinking water from Europe to tropical island resorts?",
            "options": [
              "European water freezes instantly in the tropics.",
              "It generates massive Scope 3 maritime/air freight carbon emissions and creates vast quantities of non-recyclable glass and plastic waste compared to on-site filtration and bottling.",
              "European water has no minerals.",
              "Imported water causes hotel elevators to stop functioning."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Importing heavy water over thousands of miles generates huge freight emissions and packaging waste; on-site glass bottling provides an eco-friendly alternative.",
            "incorrectExplanation": "Long-distance water transport generates massive freight emissions and packaging waste compared to on-site filtration systems.",
            "optionFeedback": [
              "Incorrect. Water does not freeze in tropical ambient temperatures.",
              "Correct! Long-distance freight emissions and packaging waste make imported water ecologically unsustainable compared to on-site bottling.",
              "Incorrect. Mineral content varies by source, but freight carbon remains the primary impact.",
              "Incorrect. Water imports have zero interaction with elevator machinery."
            ],
            "practicalTakeaway": "Install on-site micro-filtration and reusable glass bottling plants to eliminate imported bottled water freight emissions.",
            "learningOutcome": "Eliminate freight emissions through on-site water bottling",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "When conducting a physical on-site audit of a local agricultural supplier, which condition indicates good environmental practice?",
            "options": [
              "Uncontrolled chemical pesticide spraying directly adjacent to natural freshwater streams.",
              "Drip irrigation systems, integrated pest management (IPM), compost enrichment, and proper PPE for agricultural workers.",
              "Piles of burning plastic pesticide containers behind the greenhouse.",
              "Empty chemical barrels discarded into local irrigation canals."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Drip irrigation, Integrated Pest Management (IPM), soil composting, and worker safety gear reflect responsible, sustainable farming standards.",
            "incorrectExplanation": "Drip irrigation, IPM biological controls, and worker PPE demonstrate audit-compliant sustainable farming.",
            "optionFeedback": [
              "Incorrect. Spraying pesticides near waterways is a severe pollution and regulatory violation.",
              "Correct! Drip irrigation, IPM biological controls, soil composting, and worker PPE reflect exemplary agricultural standards.",
              "Incorrect. Burning plastic releases carcinogenic dioxins and violates environmental laws.",
              "Incorrect. Dumping chemical barrels into canals is an illegal act of water contamination."
            ],
            "practicalTakeaway": "Audit farm partners for drip irrigation, integrated pest management, and worker health and safety compliance.",
            "learningOutcome": "Conduct on-site agricultural supplier environmental audits",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Which action should a Procurement Manager prioritize during their first 30 days of sustainable sourcing rollout?",
            "options": [
              "Cancel all food purchasing and order guests to fast.",
              "Audit top 10 suppliers for returnable crate adoption, implement a Sustainable Seafood Policy with chefs, and issue the Supplier Code of Conduct.",
              "Switch all purchasing exclusively to unvetted overseas internet vendors.",
              "Allow suppliers to deliver produce in single-use styrofoam without inspection."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The 30-day focus prioritizes returnable crate systems, sustainable seafood policies, and distributing the Supplier Code of Conduct.",
            "incorrectExplanation": "Initial focus should center on returnable packaging, seafood policies, and supplier code distribution.",
            "optionFeedback": [
              "Incorrect. Denying food violates hospitality business continuity.",
              "Correct! Auditing returnable crates, establishing seafood policies, and rolling out the Supplier Code establishes immediate control.",
              "Incorrect. Unvetted overseas vendors increase freight emissions and supply risks.",
              "Incorrect. Accepting uninspected styrofoam violates zero-waste standards."
            ],
            "practicalTakeaway": "Prioritize returnable crate adoption and sustainable seafood policies during your first month.",
            "learningOutcome": "Execute a 30-day sustainable procurement action roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      }
    ]

if __name__ == "__main__":
    courses = get_courses_6_to_9()
    print(f"Loaded {len(courses)} courses from Module 2.")
