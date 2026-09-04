#!/usr/bin/env python3
import json
import os

def get_courses_9_to_12():
    return [
      # 9. ELH-27: Sustainability for Facilities and Property Teams (D2)
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
        "secondaryCompetencies": ["COMP_WATER", "COMP_GHG"],
        "learningObjectives": [
          "Optimize centralized chiller plants, cooling towers, and condenser water temperature setpoints.",
          "Implement automated Building Management System (BMS) occupancy and night-setback schedules.",
          "Execute preventative maintenance protocols for HVAC air filters, evaporator coils, and pipe insulation.",
          "Manage refrigerant compliance: execute HCFC-22 phase-out under the Montreal Protocol and transition away from high-GWP HFCs under the Kigali Amendment."
        ],
        "intendedRoles": ["Facility Managers", "Property Supervisors", "MEP Engineers", "Maintenance Technicians"],
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
              { "id": "elh27-h1", "type": "heading", "level": 3, "text": "The Engine Room of Commercial Energy Consumption" },
              { "id": "elh27-t1", "type": "short_text", "position": 1, "bodyText": "In large tropical commercial properties, central chiller plants consume between 40% and 60% of total site electricity. Operating chillers efficiently requires tracking the system efficiency index (Kilowatts per Ton of Refrigeration, kW/TR). Modern water-cooled magnetic bearing chillers operate at 0.55 to 0.65 kW/TR, compared to older inefficient systems running at 1.1+ kW/TR. Resetting chilled water supply temperatures upwards during mild ambient conditions reduces compressor lift and cuts energy use by 2% to 3% per degree Celsius." },
              { "id": "elh27-c1", "type": "callout", "variant": "info", "title": "Condenser Optimization", "bodyText": "Keeping cooling tower fill packs clean and optimizing condenser water temperature delivers immediate, massive chiller compressor energy savings." }
            ]
          },
          {
            "title": "2. BMS Schedules, Sub-Metering & Preventative Maintenance",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Configuring occupancy setbacks, cleaning air handling unit (AHU) coils, and monitoring electrical sub-meters.",
            "contentBlocks": [
              { "id": "elh27-h2", "type": "heading", "level": 3, "text": "Smart Building Controls and Mechanical Hygiene" },
              { "id": "elh27-t2", "type": "short_text", "position": 1, "bodyText": "A Building Management System (BMS) is only as effective as its operating logic. Overridden time schedules and faulty temperature sensors frequently leave air handling units running 24/7 in empty zones. Furthermore, fouled AHU cooling coils and dirty air filters increase static air pressure resistance, forcing supply fans to consume up to 30% more power while reducing heat transfer. Regular coil chemical cleaning and filter replacement pay for themselves within weeks." },
              { "id": "elh27-c2", "type": "callout", "variant": "tip", "title": "Sub-Metering Rule", "bodyText": "Install electrical sub-meters on major mechanical loads (chillers, pumps, lighting, tenant power) to detect operational drift immediately." }
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
                "prompt": "Your facility's central chilled water system is suffering from 'Low Delta-T Syndrome' (return water temperature is only 2°C higher than supply, instead of design 5.5°C), forcing 3 chillers to run at low partial loads while office occupants complain of freezing 19°C temperatures. What is your engineering action?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Start a 4th chiller and lower the chilled water setpoint to 5°C to force more cold water through the building.",
                    "consequence": "Catastrophic energy waste. Increases electricity consumption by 35%, accelerates chiller wear, and worsens thermal discomfort across the building.",
                    "feedback": "Adding more chiller capacity worsens Low Delta-T syndrome and spikes power bills.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Inspect and recalibrate two-way control valves at AHUs, reset chilled water supply temperature from 6.5°C to 8°C, and balance zone thermostats to 24°C.",
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
              { "id": "elh27-h3", "type": "heading", "level": 3, "text": "The 22:00 Facility Walkthrough" },
              { "id": "elh27-t3", "type": "short_text", "position": 1, "bodyText": "Conduct an unannounced facility walkthrough between 22:00 and midnight. Verify: (1) AHUs and extract fans in unoccupied zones are shut down; (2) Chiller staging matches reduced night loads; (3) Non-essential facade and corridor lighting is switched off by timer; and (4) Sump pump and domestic booster pump pressure switches are not cycling rapidly due to hidden leaks." },
              { "id": "elh27-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Audit your building's BMS time schedules this week and eliminate manual overrides on all air handling units." }
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
              "When the temperature outside drops below 0°C.",
              "When chilled water returns from air handling units with a smaller temperature rise than design (e.g. 2°C instead of 5.5°C), forcing extra chillers and pumps to run at low efficiency.",
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
              "Configuring automated occupancy schedules, night-time temperature setbacks (28°C or OFF), and integrating PIR motion sensors in intermittently used zones.",
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
              "Correct! Systematic night walkthroughs and chilled water loop optimization deliver immediate 10–20% facility energy savings.",
              "Incorrect. Sub-meters are essential for energy management.",
              "Incorrect. Canceling maintenance leads to catastrophic equipment breakdown and high energy waste."
            ],
            "practicalTakeaway": "Perform regular after-hours energy sweeps and verify BMS schedule integrity.",
            "learningOutcome": "Execute facilities energy action plan",
            "competencyArea": "COMP_ENERGY"
          }
        ]
      },

      # 10. ELH-28: Sustainability for Sales and Marketing Teams (D2)
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
        "secondaryCompetencies": ["COMP_REPORTING", "COMP_SUSTAINABILITY_FOUNDATIONS"],
        "learningObjectives": [
          "Differentiate authentic evidence-based environmental marketing from misleading greenwashing using the self-regulatory ICC Code and consumer protection baselines.",
          "Substantiate product and corporate claims with primary data, lifecycle assessments, and verified certifications.",
          "Respond accurately and persuasively to enterprise client ESG Request for Proposals (RFPs).",
          "Ensure marketing campaigns comply with self-regulatory advertising guidelines and applicable consumer protection standards."
        ],
        "intendedRoles": ["Marketing Executives", "Sales Directors", "Brand Managers", "Commercial Account Leads"],
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
              { "id": "elh28-h1", "type": "heading", "level": 3, "text": "The High Cost of Misleading Sustainability Claims" },
              { "id": "elh28-t1", "type": "short_text", "position": 1, "bodyText": "The International Chamber of Commerce (ICC) Advertising and Marketing Communications Code (Chapter D) serves as a globally recognized self-regulatory framework establishing ethical standards for environmental marketing claims. It emphasizes that claims must be clear, truthful, and substantiated by sound scientific evidence. While the ICC Code is a self-regulatory benchmark applied by industry self-regulatory organizations (SROs), deceptive or unsubstantiated claims also expose businesses to formal statutory enforcement, civil penalties, and advertising bans under national consumer protection and trade practices legislation." },
              { "id": "elh28-c1", "type": "callout", "variant": "info", "title": "Golden Rule of Green Marketing", "bodyText": "If you cannot measure it with verified primary data or certified audit reports, do not claim it in your sales collateral." }
            ]
          },
          {
            "title": "2. Winning Enterprise Tenders with Robust ESG Credentials",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "How multinational corporate clients evaluate supplier sustainability in commercial RFPs.",
            "contentBlocks": [
              { "id": "elh28-h2", "type": "heading", "level": 3, "text": "Sustainability as a B2B Competitive Advantage" },
              { "id": "elh28-t2", "type": "short_text", "position": 1, "bodyText": "Corporate enterprise clients in hospitality, banking, telecommunications, and manufacturing are legally mandated to report their Scope 3 supply chain emissions. When bidding for major contracts, sales teams that provide verified carbon metrics, OSHA 2005 compliance certificates, and circular packaging options score significantly higher in procurement evaluations. Sustainability is no longer a PR footnote; it is a decisive revenue driver." },
              { "id": "elh28-c2", "type": "callout", "variant": "tip", "title": "Sales Enablement", "bodyText": "Maintain a standardized 'ESG Sales Factsheet' with verified carbon intensity, safety metrics, and certifications to respond rapidly to client RFPs." }
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
              { "id": "elh28-h3", "type": "heading", "level": 3, "text": "The Anti-Greenwashing Audit Checklist" },
              { "id": "elh28-t3", "type": "short_text", "position": 1, "bodyText": "Review all active sales brochures, pitch decks, and website pages against three questions: (1) Are terms like 'eco-friendly', 'green', or 'sustainable' accompanied by specific evidence? (2) Are third-party certification logos (FSC, ISO 14001, Made in Moris) valid and current? (3) Does the claim represent a meaningful environmental attribute rather than minor legal compliance?" },
              { "id": "elh28-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Audit your team's standard commercial pitch deck this month and update the sustainability slide with verified, current operational metrics." }
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

      # 11. ELH-29: Sustainability for Operations and Frontline Teams (D2)
      {
        "courseCode": "ELH-29",
        "title": "Sustainability for Operations and Frontline Teams",
        "slug": "sustainability-for-operations-and-frontline",
        "description": "Drive Lean Green frontline operational excellence, eliminate shift changeover energy waste, detect compressed air leaks, and ensure chemical spill safety.",
        "fullDescription": "Sustainability for Operations and Frontline Teams bridges daily industrial and service operations with environmental excellence. Learn how frontline supervisors, technicians, and shift workers eliminate scrap at the source, execute 5-minute end-of-shift equipment shutdowns, identify costly compressed air leaks (where 85–90% of energy is lost as heat), handle and store chemicals safely under GHS, and foster continuous green improvements (Kaizen).",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D2 Working Knowledge",
        "passingScore": 75,
        "primaryCompetency": "COMP_CIRCULARITY",
        "secondaryCompetencies": ["COMP_ENERGY", "COMP_SOCIAL_COMMUNITY"],
        "learningObjectives": [
          "Apply Lean Green principles to eliminate material scrap, idle machine run-time, and packaging waste.",
          "Execute standardized shift startup and shutdown checklists for industrial equipment and lighting.",
          "Identify and report compressed air leaks and distribution losses based on thermodynamic compressor efficiency data.",
          "Implement Globally Harmonized System (GHS) chemical handling, secondary containment, and spill response."
        ],
        "intendedRoles": ["Operations Supervisors", "Production Line Leads", "Warehouse Foremen", "Maintenance Technicians"],
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
              { "id": "elh29-h1", "type": "heading", "level": 3, "text": "Where Efficiency Meets Sustainability on the Shop Floor" },
              { "id": "elh29-t1", "type": "short_text", "position": 1, "bodyText": "In operational and manufacturing environments, environmental waste directly mirrors operational inefficiency. Material scrap, defective re-work, hydraulic leaks, and unoptimized cutting patterns represent wasted raw materials, embodied energy, and disposal costs. By integrating sustainability into daily 5S and Lean management routines, frontline operators become active problem solvers who eliminate waste at the exact point of generation." },
              { "id": "elh29-c1", "type": "callout", "variant": "info", "title": "The 8th Waste", "bodyText": "Traditional Lean targets 7 operational wastes; Lean Green adds the 8th waste: environmental waste (wasted energy, water, emissions, and scrap)." }
            ]
          },
          {
            "title": "2. Compressed Air & Shift Handover Discipline",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Tackling compressed air inefficiencies and establishing disciplined shift equipment shutdown protocols.",
            "contentBlocks": [
              { "id": "elh29-h2", "type": "heading", "level": 3, "text": "The High Cost of Escaping Air and Idling Motors" },
              { "id": "elh29-t2", "type": "short_text", "position": 1, "bodyText": "Compressed air is among the most expensive utilities in industry: according to US Department of Energy Advanced Manufacturing guidance, only 10% to 15% of electrical energy input becomes usable pneumatic work at the point of use; the remaining 85% to 90% is lost as heat. A single 3mm leak in a 7-bar compressed air line wastes thousands of kilowatt-hours annually in unnecessary electricity draw. Furthermore, when operators fail to shut down conveyors, heaters, and hydraulic power units during shift handovers or meal breaks, substantial idle power is wasted." },
              { "id": "elh29-c2", "type": "callout", "variant": "tip", "title": "Ultrasonic Audits", "bodyText": "Conduct regular ultrasonic leak detection walkthroughs and tag pneumatic joints for immediate repair during scheduled downtime." }
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
              { "id": "elh29-h3", "type": "heading", "level": 3, "text": "Standardized Shift Shutdown Discipline" },
              { "id": "elh29-t3", "type": "short_text", "position": 1, "bodyText": "Institutionalize a mandatory 5-minute end-of-shift checklist for every production cell: (1) Power down idle conveyor motors, glue heaters, and extraction fans; (2) Close main pneumatic isolation ball valves to eliminate overnight line pressure leaks; and (3) Segregate production scrap into designated recycling bins." },
              { "id": "elh29-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Post a laminated shift-end equipment power-down checklist at your cell's primary control panel this week." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "According to industrial energy efficiency benchmarks (e.g. US DOE Advanced Manufacturing data), why is compressed air considered one of the most expensive forms of energy in industrial operations?",
            "options": [
              "Air compressors run on liquid gold.",
              "Only 10% to 15% of electrical energy input is converted into usable pneumatic mechanical work at the point of use; the remaining 85%–90% is dissipated as waste heat.",
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

      # 12. ELH-30: Climate Risk & Workplace Resilience (D2)
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
        "secondaryCompetencies": ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Differentiate physical climate risks (cyclones, flash floods, sea level rise) from regulatory/market transition risks in Mauritius.",
          "Execute workplace Business Continuity Plans (BCP) aligned with Mauritius Meteorological Services (MMS) Class I to Class IV cyclone warning criteria.",
          "Implement physical flood defense measures (sump pumps, deployable flood barriers, drainage clearance).",
          "Ensure employee life safety, secure remote data backups, and plan post-event operational recovery."
        ],
        "intendedRoles": ["Risk Managers", "Facility Supervisors", "Operations Leads", "HSE Coordinators", "Department Heads"],
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
              { "id": "elh30-h1", "type": "heading", "level": 3, "text": "Climate Hazards Facing Small Island Economies" },
              { "id": "elh30-t1", "type": "short_text", "position": 1, "bodyText": "Mauritius is highly vulnerable to climate change. Under the Task Force on Climate-related Financial Disclosures (TCFD) framework, corporate climate risks are categorized into: (1) **Physical Risks**: acute events (intense Category 4/5 tropical cyclones, flash flooding from torrential cloudbursts, coastal storm surges) and chronic changes (sea level rise, groundwater salinization, rising ambient temperatures); and (2) **Transition Risks**: carbon taxes, shifting consumer expectations, and green building mandates." },
              { "id": "elh30-c1", "type": "callout", "variant": "info", "title": "Island Vulnerability", "bodyText": "Flash flooding from rapid convective storms can overwhelm urban stormwater channels in Port Louis, Ebene, and coastal zones within 30 minutes, necessitating rapid workplace response protocols." }
            ]
          },
          {
            "title": "2. Official MMS Cyclone Warning System & Business Continuity",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Step-by-step organizational actions across the Mauritius Meteorological Services (MMS) Class I to Class IV warning system.",
            "contentBlocks": [
              { "id": "elh30-h2", "type": "heading", "level": 3, "text": "Operating Across Official MMS Cyclone Alert Stages" },
              { "id": "elh30-t2", "type": "short_text", "position": 1, "bodyText": "Under the Mauritius Meteorological Services Tropical Cyclone Warning System (metservice.intnet.mu/tropical-cyclone/warning-system.php), warnings are issued as follows: **Class I**: Issued 36 to 48 hours before the occurrence of gusts of 120 km/h (verify backup generator fuel, test sump pumps, clear roof drains); **Class II**: Issued so as to allow, as far as practicable, 12 hours of daylight before the occurrence of gusts of 120 km/h (secure outdoor equipment, shutter windows, initiate cloud backups); **Class III**: Issued so as to allow, as far as practicable, 6 hours of daylight before the occurrence of gusts of 120 km/h (orderly shutdown and staff dismissal before public transport stops); and **Class IV**: Issued when gusts of 120 km/h are occurring in Mauritius and are expected to continue." },
              { "id": "elh30-c2", "type": "callout", "variant": "tip", "title": "Life Safety First", "bodyText": "Under national safety directives, employee dismissal must occur in daylight and well before severe weather closes public transit and roads." }
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
                    "consequence": "Catastrophic structural failure. High cyclonic wind gusts (>120–200 km/h) will rip the loose panels off the roof, creating lethal airborne projectiles and causing extensive building damage.",
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
              { "id": "elh30-h3", "type": "heading", "level": 3, "text": "The Workplace Climate Resilience Checklist" },
              { "id": "elh30-t3", "type": "short_text", "position": 1, "bodyText": "Establish an annual pre-cyclone season routine: (1) Verify that all employee emergency phone numbers and home district locations are updated in HR systems; (2) Test backup power generators under full load for 30 minutes; (3) Clean rooftop rainwater gutters and inspect basement sump pumps; and (4) Verify remote cloud data synchronization." },
              { "id": "elh30-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Conduct an emergency contact tree test with your team this week and verify that all members know their cyclone warning dismissal procedures." }
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
    ]

print("Module 3 ready.")
