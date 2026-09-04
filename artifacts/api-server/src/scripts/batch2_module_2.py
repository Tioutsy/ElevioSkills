#!/usr/bin/env python3
import json
import os

def get_courses_5_to_8():
    return [
      # 5. ELH-18: Sustainability Data Collection and Evidence (D2)
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
        "secondaryCompetencies": ["COMP_GHG", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Differentiate primary activity data (invoices, meter logs, weighbridge slips) from secondary estimations.",
          "Collect, validate, and document Scope 1, Scope 2, and initial Scope 3 activity data across business units.",
          "Establish robust data governance protocols, calibration schedules, and internal audit evidence trails.",
          "Prepare compliance documentation satisfying Stock Exchange of Mauritius (SEM/SEMSI) and GRI assurance requirements."
        ],
        "intendedRoles": ["Sustainability Officers", "HSE Coordinators", "ESG Data Analysts", "Finance & Compliance Leads"],
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
              { "id": "elh18-h1", "type": "heading", "level": 3, "text": "Building the Foundation of Audit-Ready ESG Data" },
              { "id": "elh18-t1", "type": "short_text", "position": 1, "bodyText": "In sustainability reporting, an assertion without primary source documentation is treated by auditors as non-existent. External auditors and stock exchange regulators (such as SEM under SEMSI guidelines) require primary evidence: calibrated utility meter photographs, official CEB/CWA invoices, certified weighbridge slips for waste, and itemized fuel receipts. While secondary financial estimations (e.g. spend-based carbon modeling) are acceptable for screening, only primary activity data provides the defensibility required for third-party limited or reasonable assurance." },
              { "id": "elh18-c1", "type": "callout", "variant": "info", "title": "Golden Rule of ESG Data", "bodyText": "Every data point entered into an ESG reporting software or spreadsheet must link directly to a timestamped, primary source attachment in the evidence repository." }
            ]
          },
          {
            "title": "2. Scope 1, 2 & 3 Data Extraction Protocols",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Systematic collection workflows for stationary combustion, fleet transport, purchased electricity, and waste streams.",
            "contentBlocks": [
              { "id": "elh18-h2", "type": "heading", "level": 3, "text": "Structuring Cross-Departmental Data Pipelines" },
              { "id": "elh18-t2", "type": "short_text", "position": 1, "bodyText": "Capturing enterprise emissions requires cross-functional data pipelines: (1) **Scope 1**: Diesel fuel logs for backup generators, company vehicle fleet fuel cards, and HVAC technician refrigerant top-up logs (tracking gas type and mass in kg); (2) **Scope 2**: Central Electricity Board (CEB) utility invoices and solar inverter generation exports in kWh; and (3) **Scope 3**: Waste disposal manifests with certified transfer notes and monthly HR commuting surveys." },
              { "id": "elh18-c2", "type": "callout", "variant": "tip", "title": "Refrigerant Warning", "bodyText": "Refrigerant fugitive emissions (e.g. R-410A, R-134a) carry global warming potentials (GWPs) thousands of times higher than CO2; logging every kilogram added during maintenance is legally essential." }
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
              { "id": "elh18-h3", "type": "heading", "level": 3, "text": "Standardizing the Monthly Evidence Capture" },
              { "id": "elh18-t3", "type": "short_text", "position": 1, "bodyText": "Establish a cloud folder hierarchy: `/ESG_Evidence_2026/[Month]/[Scope1_Scope2_Scope3]`. Mandate monthly upload of: (1) CEB electric and CWA water bills; (2) Fuel fleet transaction reports; (3) HVAC maintenance logs; and (4) Waste contractor weighbridge slips. Reconcile numerical entries against attachments before month-end close." },
              { "id": "elh18-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Set up your department's standardized ESG digital evidence folder this week and upload last month's utility and fuel documentation." }
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

      # 6. ELH-24: Sustainability for Human Resources Teams (D2)
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
        "secondaryCompetencies": ["COMP_GOVERNANCE_ETHICS", "COMP_GHG"],
        "learningObjectives": [
          "Integrate sustainability into employee onboarding, performance appraisals, and career development.",
          "Design multimodal sustainable commuting policies to reduce employee Scope 3 transportation carbon footprint.",
          "Ensure compliance with statutory employer duties under Section 5 of OSHA 2005 extending to on-site contractors.",
          "Implement occupational heat stress and extreme weather safety protocols for frontline personnel."
        ],
        "intendedRoles": ["HR Directors", "Talent Acquisition Leads", "People Operations Specialists", "HSE Managers"],
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
              { "id": "elh24-h1", "type": "heading", "level": 3, "text": "Aligning People Operations with Corporate Purpose" },
              { "id": "elh24-t1", "type": "short_text", "position": 1, "bodyText": "Top talent increasingly chooses employers with authentic ESG commitments. Modern HR teams integrate sustainability into the entire employee lifecycle: (1) Showcasing verified sustainability achievements in recruitment branding; (2) Including a mandatory 30-minute sustainability module in Day-1 onboarding; and (3) Embedding specific, measurable sustainability KPIs into annual departmental performance appraisals." },
              { "id": "elh24-c1", "type": "callout", "variant": "info", "title": "Employee Retention", "bodyText": "Companies with strong ESG culture experience up to 25% lower voluntary employee turnover and higher cross-functional collaboration." }
            ]
          },
          {
            "title": "2. Contractor Safety & OSHA 2005 Statutory Duty of Care",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Ensuring legal compliance and health safety protections for outsourced workers under Mauritian labor law.",
            "contentBlocks": [
              { "id": "elh24-h2", "type": "heading", "level": 3, "text": "Statutory Duty of Care for Outsourced Personnel" },
              { "id": "elh24-t2", "type": "short_text", "position": 1, "bodyText": "Under Section 5 of the Mauritius Occupational Safety and Health Act 2005 (OSHA 2005), an employer's statutory duty of care extends to all persons on the premises, including outsourced security, cleaning, and maintenance contractors. HR and safety teams must ensure that third-party workers receive identical personal protective equipment (PPE), safety briefings, sanitary facilities, and emergency evacuation training as permanent employees." },
              { "id": "elh24-c2", "type": "callout", "variant": "tip", "title": "Legal Mandate", "bodyText": "Never treat outsourced personnel as second-tier workers; OSHA 2005 legally holds premises operators accountable for contractor health and safety." }
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
                "prompt": "Ambient temperatures reach 34°C with 80% relative humidity in an un-airconditioned logistics warehouse. Two forklift drivers report dizziness and severe fatigue. The operations manager wants them to continue working overtime to meet container export deadlines. What is your HR decision?",
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
              { "id": "elh24-h3", "type": "heading", "level": 3, "text": "Your HR Sustainability Roadmap" },
              { "id": "elh24-t3", "type": "short_text", "position": 1, "bodyText": "Execute three key initiatives: (1) Conduct an annual employee commuting survey to calculate Scope 3 transport emissions; (2) Implement a Heat Stress Protocol (mandatory hydration breaks, shaded rest zones) for outdoor and warehouse personnel during summer peak temperatures; and (3) Introduce green volunteering leave days to support local community restoration." },
              { "id": "elh24-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Review your company's new-hire onboarding deck and incorporate a mandatory 15-minute sustainability orientation module this month." }
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
            "practicalTakeaway": "Establish a policy offering 1–2 paid CSR volunteering days annually per employee.",
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

      # 7. ELH-25: Sustainability for Finance & Accounting Teams (D2)
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
        "secondaryCompetencies": ["COMP_REPORTING", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Differentiate and account for Green Capital Expenditure (CAPEX) vs Green Operational Expenditure (OPEX).",
          "Apply Discounted Cash Flow (DCF) and net present value (NPV) modeling to renewable energy and efficiency investments with utility escalation.",
          "Navigate eligibility criteria and use of proceeds under the Bank of Mauritius Guide for the Issue of Sustainable Bonds (June 2021).",
          "Assess financial exposure to carbon pricing, transition risks, and climate insurance liabilities."
        ],
        "intendedRoles": ["Financial Controllers", "Management Accountants", "Investment Analysts", "CFOs", "Finance Managers"],
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
              { "id": "elh25-h1", "type": "heading", "level": 3, "text": "Capital Allocation for the Low-Carbon Transition" },
              { "id": "elh25-t1", "type": "short_text", "position": 1, "bodyText": "Investors and regulators require precise disclosure of how much capital is deployed toward environmental transformation. Finance teams must categorize expenditures into: (1) **Green CAPEX**: long-term capitalized investments (rooftop solar PV arrays, high-efficiency magnetic-bearing chillers, electric delivery vans, rainwater harvesting tanks); and (2) **Green OPEX**: operational expenses supporting sustainability (solar maintenance contracts, waste recycling processing fees, ESG audit fees, sustainability training)." },
              { "id": "elh25-c1", "type": "callout", "variant": "info", "title": "GL Tagging", "bodyText": "Tagging green accounts in ERP systems enables instant export of EU Taxonomy-aligned or SEMSI sustainability financial metrics." }
            ]
          },
          {
            "title": "2. Bank of Mauritius Sustainable Bond Framework & Green Financing",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Accessing preferential green capital and issuing sustainable debt instruments in Mauritius.",
            "contentBlocks": [
              { "id": "elh25-h2", "type": "heading", "level": 3, "text": "Unlocking Green Financing and Bond Issuance" },
              { "id": "elh25-t2", "type": "short_text", "position": 1, "bodyText": "The Bank of Mauritius Guide for the Issue of Sustainable Bonds in Mauritius (June 2021) establishes clear eligibility criteria for green financing: renewable energy generation, energy efficiency retrofits, green buildings, circular economy projects, and sustainable water management. Issuers must establish a transparent Green Bond Framework, maintain ring-fenced escrow accounts for use of proceeds, provide independent Second-Party Opinions (SPO), and publish annual allocation and impact reports." },
              { "id": "elh25-c2", "type": "callout", "variant": "tip", "title": "Financing Advantage", "bodyText": "Sustainable bonds and sustainability-linked loans (SLLs) frequently offer margin discounts (5–15 bps) when audited ESG milestones are achieved." }
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
              { "id": "elh25-h3", "type": "heading", "level": 3, "text": "Modernizing Corporate Capital Appraisal" },
              { "id": "elh25-t3", "type": "short_text", "position": 1, "bodyText": "Revise the company's standard CAPEX requisition template: (1) Replace simple payback with 10-to-20 year DCF and NPV analysis; (2) Incorporate standard 4% annual utility tariff inflation for energy/water projects; (3) Include internal carbon shadow pricing (e.g. $40/tonne CO2e); and (4) Add Green CAPEX tracking codes to chart-of-accounts." },
              { "id": "elh25-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Update your department's standard CAPEX financial approval template to require DCF and utility escalation modeling this month." }
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
              "Correct! Simple payback ignores the time value of money and discards all long-term cash flows generated across the asset's 20–25 year operating life.",
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
              "A theoretical monetary cost per tonne of CO2e (e.g. $40–$75/tonne) assigned to a project's projected carbon footprint to evaluate transition risk and incentivize low-carbon alternatives.",
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

      # 8. ELH-26: Sustainability for Procurement and Purchasing Teams (D2)
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
        "secondaryCompetencies": ["COMP_GOVERNANCE_ETHICS", "COMP_CIRCULARITY"],
        "learningObjectives": [
          "Integrate structured sustainability evaluation criteria into supplier Request for Proposals (RFPs) aligned with ISO 20400 guidance.",
          "Draft legally enforceable ESG clauses, audit inspection rights, and corrective action covenants in Master Service Agreements.",
          "Assess supply chain Scope 3 emissions, human rights risks, and environmental compliance across tier-1 suppliers.",
          "Establish circular returnable packaging and material take-back programs with strategic distributors."
        ],
        "intendedRoles": ["Procurement Managers", "Category Buyers", "Supply Chain Directors", "Vendor Relationship Leads"],
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
              { "id": "elh26-h1", "type": "heading", "level": 3, "text": "The Power of the Corporate Purchasing Budget" },
              { "id": "elh26-t1", "type": "short_text", "position": 1, "bodyText": "For most enterprises, upstream supply chain emissions (Scope 3 Category 1: Purchased Goods and Services) are 5 to 10 times larger than direct operational emissions (Scope 1 and 2). Traditional procurement focused narrowly on unit price, delivery speed, and payment terms. Modern sustainable procurement transforms purchasing power into a strategic lever to mandate supplier decarbonization, ethical labor standards, and circular product design." },
              { "id": "elh26-c1", "type": "callout", "variant": "info", "title": "Scope 3 Leverage", "bodyText": "You cannot achieve net-zero carbon or genuine ESG compliance without actively decarbonizing and auditing your upstream vendor supply base." }
            ]
          },
          {
            "title": "2. RFP Scorecards, Supplier Audits & Contractual ESG Clauses",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Embedding weighted sustainability criteria in tenders and securing legally binding audit rights in vendor contracts.",
            "contentBlocks": [
              { "id": "elh26-h2", "type": "heading", "level": 3, "text": "From Informal Questionnaires to Contractual Accountability" },
              { "id": "elh26-t2", "type": "short_text", "position": 1, "bodyText": "Under ISO 20400 (Sustainable Procurement — Guidance), sustainability considerations are integrated across procurement stages and evaluation criteria. While ISO 20400 provides guidance rather than prescribing mandatory fixed percentage thresholds, organizations establish proportional evaluation weighting (such as 10% to 20% depending on category risk and spend) alongside total cost of ownership and technical performance. Master Service Agreements (MSAs) must incorporate legally binding clauses: (1) Mandatory adherence to the Corporate Supplier Code of Conduct; (2) Right-to-audit physical premises and payroll records; and (3) Corrective Action Plans (CAP) with 30-day cure periods for non-compliance." },
              { "id": "elh26-c2", "type": "callout", "variant": "tip", "title": "Procurement Rule", "bodyText": "Never rely on self-declared supplier survey checkmarks; mandate independent third-party audit certificates (ISO 14001, OSHA compliance, SEDEX SMETA)." }
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
              { "id": "elh26-h3", "type": "heading", "level": 3, "text": "Your Sustainable Procurement Roadmap" },
              { "id": "elh26-t3", "type": "short_text", "position": 1, "bodyText": "Execute three key actions: (1) Update standard commercial tender templates to include structured sustainability scorecard criteria; (2) Require top 20 suppliers by spend to submit verified carbon and safety metrics; and (3) Incorporate right-to-audit ESG covenants into all expiring Master Service Agreements." },
              { "id": "elh26-c3", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Incorporate a structured sustainability evaluation section into your department's standard RFP template this month." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "Under ISO 20400 (Sustainable Procurement — Guidance), how should organizations approach sustainability criteria in commercial procurement and tender evaluations?",
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
      }
    ]

print("Module 2 ready.")
