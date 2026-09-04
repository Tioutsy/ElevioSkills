#!/usr/bin/env python3
import json
import os

def get_courses_1_to_4():
    return [
      # 1. ELH-13: Sustainability Action Planning (D3)
      {
        "courseCode": "ELH-13",
        "title": "Sustainability Action Planning",
        "slug": "sustainability-action-planning",
        "description": "Master applied departmental sustainability action planning, priority matrices, resource budgeting, risk mitigation, and milestone governance in Mauritian workplaces.",
        "fullDescription": "Sustainability Action Planning equips operational team leads, project managers, and department heads to transform broad corporate ESG aspirations into rigorous, time-bound departmental roadmaps. Learn how to conduct operational baseline assessments, prioritize initiatives using Effort-vs-Impact matrices, allocate capital and operational budgets, assign single-point operational accountability (RACI), identify regulatory and supply constraints, and institute quarterly milestone review rhythms.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_LEADERSHIP",
        "secondaryCompetencies": ["COMP_STRATEGY", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Conduct an operational sustainability baseline audit across departmental energy, water, waste, and procurement workflows.",
          "Prioritize sustainability initiatives using an Effort-versus-Impact prioritization matrix.",
          "Construct a defensible 12-month Action Plan with RACI accountability, Capex/Opex allocations, and intermediate milestones.",
          "Establish quarterly variance review mechanisms and adaptive risk-management protocols for operational roadblocks."
        ],
        "intendedRoles": ["Department Managers", "Team Leads", "Project Managers", "Operations Supervisors"],
        "badgeName": "Sustainability Action Planner",
        "badgeDescription": "Demonstrated capability in formulating and governing operational departmental sustainability action plans.",
        "completionMessage": "Congratulations! You have completed Sustainability Action Planning and are prepared to lead structured operational ESG execution.",
        "recommendedNextCourseCode": "ELH-14",
        "lessons": [
          {
            "title": "1. The Operational Planning Gap & Departmental Ownership",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why corporate sustainability strategies fail without departmental translation and how to establish baseline reality.",
            "contentBlocks": [
              { "id": "elh13-h1", "type": "heading", "level": 3, "text": "From Corporate Pledges to Operational Execution" },
              { "id": "elh13-t1", "type": "short_text", "position": 1, "bodyText": "Corporate sustainability strategies frequently stall because executive pledges are never translated into departmental work routines. An Action Plan bridges high-level ambitions (such as 'Reduce carbon intensity by 20% by 2028') with weekly operational tasks. Effective planning starts with an honest departmental baseline audit: measuring current resource consumption, identifying waste hotspots, and cataloguing operational constraints before selecting projects." },
              { "id": "elh13-c1", "type": "callout", "variant": "info", "title": "Planning Baseline Invariant", "bodyText": "An action plan without a quantified baseline and named single-point owner is merely an aspiration. Every action line must specify baseline data, targets, budgets, deadlines, and a single accountable lead." }
            ]
          },
          {
            "title": "2. Prioritization Tools: Effort vs Impact Matrix",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Filtering and sequencing sustainability initiatives based on capital cost, disruption, and environmental yield.",
            "contentBlocks": [
              { "id": "elh13-h2", "type": "heading", "level": 3, "text": "Selecting High-Yield Departmental Initiatives" },
              { "id": "elh13-t2", "type": "short_text", "position": 1, "bodyText": "Teams often overwhelm themselves by launching 15 minor initiatives simultaneously, leading to execution fatigue. Using an Effort-vs-Impact Matrix, departmental teams categorize opportunities into four quadrants: (1) **Quick Wins** (Low Effort, High Impact: e.g. chiller setback scheduling, default duplex printing); (2) **Major Projects** (High Effort, High Impact: e.g. rooftop solar PV installation, boiler heat recovery); (3) **Fill-Ins** (Low Effort, Low Impact: e.g. pantry posters); and (4) **Thankless Tasks** (High Effort, Low Impact: e.g. redesigning custom reusable coffee cups). Focus your first 90 days on Quick Wins to build momentum and self-fund larger capital projects." },
              { "id": "elh13-c2", "type": "callout", "variant": "tip", "title": "Sequencing Rule", "bodyText": "Always sequence no-cost behavioral and operational optimization before investing capital in new hardware." }
            ]
          },
          {
            "title": "3. The 12-Month Departmental Action Plan Template",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Structuring deliverables, RACI assignments, budget lines, and variance tracking.",
            "contentBlocks": [
              { "id": "elh13-h3", "type": "heading", "level": 3, "text": "Constructing an Audit-Ready Action Schedule" },
              { "id": "elh13-t3", "type": "short_text", "position": 1, "bodyText": "A robust Action Plan requires five mandatory columns: (1) **Action Description & Objective**; (2) **Baseline & Quantified Target Metric**; (3) **RACI Ownership** (one Responsible owner); (4) **Budget Allocation** (Capex/Opex); and (5) **Quarterly Milestones & Verification Evidence**. Monthly departmental meetings review milestone progress against budget, immediately flagging off-track actions for executive escalation." },
              { "id": "elh13-c3", "type": "callout", "variant": "action", "title": "Governance Standard", "bodyText": "Conduct a 20-minute monthly action review with your team to verify milestone evidence before reporting to corporate sustainability steering committees." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Action Plan Trade-Offs",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate competing resource allocation dilemmas during annual departmental planning.",
            "contentBlocks": [
              {
                "id": "elh13-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Budget Allocation Dilemma in Logistics Operations",
                "prompt": "You are the Operations Manager finalizing your department's annual sustainability roadmap. You have a budget of Rs 500,000. Project A involves installing IoT sub-meters and automated variable speed drive controls on your 5 primary refrigeration units (cost: Rs 450,000, projected electricity savings: Rs 220,000/year, payback: 2.0 years). Project B proposes printing glossy sustainability handbooks for all 200 warehouse staff and organizing a lavish one-day beach clean-up event (cost: Rs 400,000, zero permanent energy savings). How do you allocate the budget?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Fund Project B to maximize immediate PR visibility and social media employee photos.",
                    "consequence": "Poor strategic choice. Consumes 80% of budget on ephemeral marketing without creating recurring utility savings or reducing direct Scope 2 emissions.",
                    "feedback": "PR activities without underlying operational improvements do not deliver lasting decarbonization or financial return.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Fund Project A, dedicating remaining funds (Rs 50,000) to internal tool-box briefings that train technicians to interpret sub-meter telemetry.",
                    "consequence": "Optimal strategic outcome. You lock in Rs 220,000 in recurring annual utility savings while upskilling technical staff to sustain long-term efficiency.",
                    "feedback": "Correct! Prioritizing high-yield capital efficiency paired with technical workforce enablement generates compounding operational and financial returns.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Split the budget evenly: spend Rs 250,000 on handbooks and install sub-meters on only 2 refrigeration units.",
                    "consequence": "Sub-optimal compromise. Underfunds the sub-metering deployment, leaving 60% of refrigeration unmonitored while still wasting money on printed handbooks.",
                    "feedback": "Compromising core engineering investments to fund non-essential collateral dilutes project impact.",
                    "score": 40
                  }
                ]
              },
              {
                "id": "elh13-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Managing an Off-Track Q2 Milestone",
                "prompt": "At the Q2 review, you discover that the departmental LED lighting retrofit is 8 weeks behind schedule because the electrical contractor faced supply chain shipping delays for industrial fixtures. What is your managerial response?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Mark the milestone as completed in the corporate tracker to avoid difficult questions from the executive committee.",
                    "consequence": "Ethical and governance failure. Falsifying project progress destroys management credibility, distorts reporting metrics, and violates internal audit controls.",
                    "feedback": "Never falsify milestone status; transparency is essential for effective risk management.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Cancel the LED retrofit entirely and declare that supplier issues make the project impossible.",
                    "consequence": "Premature abandonment. Forfeits significant future energy savings over temporary supply chain logistics hurdles.",
                    "feedback": "Abandoning viable projects without exploring alternative logistics or backup vendors hurts long-term targets.",
                    "score": 0
                  },
                  {
                    "id": "opt_c",
                    "text": "Log an official variance note, request expediting options with the procurement team for local alternative stock, and temporarily shift focus to accelerate the department's zero-cost HVAC setback protocol.",
                    "consequence": "Optimal operational management. You maintain transparent reporting, explore pragmatic procurement alternatives, and accelerate secondary initiatives to preserve annual energy reduction targets.",
                    "feedback": "Excellent! Transparent variance logging combined with proactive alternative sourcing and compensatory efficiency actions keeps annual goals on track.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Departmental Action Plan Draft",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Synthesize learning into an applied 30-day departmental sustainability roadmap.",
            "contentBlocks": [
              { "id": "elh13-h4", "type": "heading", "level": 3, "text": "Your 30-Day Planning Commitment" },
              { "id": "elh13-t4", "type": "short_text", "position": 1, "bodyText": "Develop a draft 3-point Departmental Sustainability Action Plan: (1) Identify one Quick Win (no cost, immediate execution); (2) Identify one Capital Project (with projected payback and Capex estimate); and (3) Assign explicit RACI roles and monthly review dates." },
              { "id": "elh13-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Draft your team's 3-point Sustainability Action Plan this month and schedule a 30-minute review session with your department head." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary reason why corporate sustainability strategies frequently fail during departmental rollout?",
            "options": [
              "Employees refuse to read corporate annual reports.",
              "Broad executive goals are not broken down into specific departmental action lines with quantified baselines, budgets, and named individual owners.",
              "Sustainability software is too expensive for department leads to purchase.",
              "Environmental targets only apply to manufacturing factories."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Without translating corporate-level pledges into granular, department-specific tasks with assigned RACI ownership and dedicated resources, initiatives lose momentum.",
            "incorrectExplanation": "Strategies fail when high-level targets lack departmental translation, baseline metrics, and individual accountability.",
            "optionFeedback": [
              "Incorrect. Readership of annual reports is secondary to operational task assignment.",
              "Correct! Translating broad ambitions into departmental action lines with single-point owners and verifiable baselines is essential for execution.",
              "Incorrect. Planning requires structured operational discipline rather than expensive software.",
              "Incorrect. Sustainability applies across all service, administrative, and operational business units."
            ],
            "practicalTakeaway": "Always assign a single accountable owner and baseline metric to every sustainability action item.",
            "learningOutcome": "Diagnose causes of sustainability strategy breakdown at department levels",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "In an Effort-versus-Impact prioritization matrix, which category of projects should a department sequence in its first 90 days?",
            "options": [
              "High Effort, Low Impact ('Thankless Tasks') to prove team endurance.",
              "Low Effort, High Impact ('Quick Wins') such as operational setback schedules, building immediate momentum and credibility.",
              "High Effort, High Impact projects requiring 3 years of capital budgeting before taking any action.",
              "Low Effort, Low Impact activities that require zero follow-up."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Quick Wins deliver immediate, measurable utility and resource savings with minimal capital, establishing departmental credibility and momentum.",
            "incorrectExplanation": "Prioritizing Low Effort, High Impact quick wins generates early cost savings and builds stakeholder confidence.",
            "optionFeedback": [
              "Incorrect. High Effort, Low Impact tasks drain staff morale and deliver poor ROI.",
              "Correct! Quick Wins generate immediate savings, prove feasibility, and build organizational enthusiasm for larger future investments.",
              "Incorrect. Major capital projects should be planned systematically while quick wins are harvested immediately.",
              "Incorrect. Low Impact tasks do not move material sustainability needles."
            ],
            "practicalTakeaway": "Harvest Low Effort, High Impact quick wins in the first 90 days of your roadmap.",
            "learningOutcome": "Sequence departmental initiatives using Effort-vs-Impact criteria",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why is assigning a single 'Accountable' lead (under RACI framework) critical in a departmental sustainability action plan?",
            "options": [
              "To ensure that person does all the physical work alone without help.",
              "To prevent diffusion of responsibility, ensuring clear ownership for milestone delivery, barrier escalation, and budget management.",
              "To make sure only one person receives performance bonuses.",
              "Because RACI guidelines forbid having team members."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "When multiple people share accountability without a designated lead, tasks fall through the cracks; RACI establishes unambiguous decision authority.",
            "incorrectExplanation": "Single-point accountability eliminates ambiguity and ensures dedicated oversight of milestone execution.",
            "optionFeedback": [
              "Incorrect. The Accountable lead oversees delivery, while Responsible team members execute specific tasks.",
              "Correct! Unambiguous accountability prevents diffusion of responsibility and ensures projects have a dedicated owner driving progress.",
              "Incorrect. Governance frameworks structure accountability, not compensation distribution.",
              "Incorrect. RACI structures cross-functional team collaboration."
            ],
            "practicalTakeaway": "Assign exactly one 'Accountable' owner to each action line in your roadmap.",
            "learningOutcome": "Apply RACI governance to sustainability action plans",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Your department plans to reduce paper consumption by 50%. Which operational metric represents the most defensible baseline for tracking progress?",
            "options": [
              "The number of trees in the office courtyard.",
              "Monthly reams of copy paper purchased and digital print-counter volume records averaged over the previous 12 months.",
              "A verbal survey asking staff if they think they print too much.",
              "The price of paper quoted by a new supplier in France."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "A robust baseline relies on 12-month historical procurement invoices and networked printer telemetry to account for seasonal variations.",
            "incorrectExplanation": "Defensible baselines require multi-month historical activity data from purchase records and meter telemetry.",
            "optionFeedback": [
              "Incorrect. Courtyard landscaping is unrelated to administrative paper consumption.",
              "Correct! Historical 12-month purchase records combined with automated printer log data establish an objective, auditable baseline.",
              "Incorrect. Subjective verbal impressions lack audit validity.",
              "Incorrect. Foreign supplier quotes do not measure internal operational consumption."
            ],
            "practicalTakeaway": "Ground target baselines in 12-month primary activity and purchasing data.",
            "learningOutcome": "Establish defensible operational baselines for departmental targets",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "During a monthly action plan review, what is the proper management procedure when an action milestone is delayed due to an external vendor bottleneck?",
            "options": [
              "Change the project completion date in the database without informing management.",
              "Document the variance transparently in the progress log, engage procurement to explore local backup options, and accelerate alternative planned actions.",
              "Delete the action item from the plan to keep the dashboard green.",
              "Shut down departmental operations until the vendor delivers."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Professional project governance requires transparent variance reporting, contingency mitigation, and compensatory action adjustments.",
            "incorrectExplanation": "Documenting variances transparently while executing backup procurement preserves governance integrity.",
            "optionFeedback": [
              "Incorrect. Undocumented target shifts violate basic governance controls.",
              "Correct! Transparent variance logging and proactive contingency sourcing protect overall annual roadmap delivery.",
              "Incorrect. Deleting off-track items hides operational bottlenecks and distorts management reporting.",
              "Incorrect. Shutting down operations causes severe business interruption."
            ],
            "practicalTakeaway": "Log milestone variances transparently and execute contingency mitigations.",
            "learningOutcome": "Manage milestone variances and operational contingencies",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following budget allocation structures reflects best practice for an operational department's annual sustainability roadmap?",
            "options": [
              "Allocating 100% of funds to annual staff celebration lunches.",
              "Balancing Capex for efficiency hardware (sub-metering, LED retrofits) with targeted Opex for technical staff training and maintenance verification.",
              "Refusing to allocate any budget and expecting suppliers to donate equipment for free.",
              "Allocating funds exclusively to marketing billboard advertisements."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Successful sustainability roadmaps pair physical capital upgrades with operational enablement, ensuring staff know how to operate and maintain new technologies.",
            "incorrectExplanation": "Balancing physical efficiency investments with operational training and maintenance ensures sustained performance.",
            "optionFeedback": [
              "Incorrect. Hospitality events do not generate operational resource savings.",
              "Correct! Pairing capital investments with technical workforce training ensures hardware delivers its projected lifecycle savings.",
              "Incorrect. Sustainable operations require structured budgetary planning.",
              "Incorrect. External advertising does not resolve internal departmental operational waste."
            ],
            "practicalTakeaway": "Pair capital hardware investments with operational training and maintenance funding.",
            "learningOutcome": "Structure departmental Capex and Opex allocations for sustainability",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "How does establishing a 90-day review cadence improve the execution rate of departmental sustainability plans?",
            "options": [
              "It gives staff 90 days of complete vacation.",
              "It creates regular accountability checkpoints to evaluate quantitative metrics, unblock operational friction, and recalibrate resources before year-end.",
              "It ensures the plan is rewritten from scratch every 3 months.",
              "It eliminates the need for financial accounting."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Quarterly reviews provide regular opportunities to assess data, unblock operational hurdles, and adjust resource allocations before year-end deadlines.",
            "incorrectExplanation": "Quarterly reviews ensure timely problem-solving, accountability tracking, and operational course correction.",
            "optionFeedback": [
              "Incorrect. Reviews support active ongoing operations.",
              "Correct! Structured quarterly reviews maintain organizational focus, highlight early variances, and allow timely corrective action.",
              "Incorrect. Roadmaps are governed and updated, not discarded quarterly.",
              "Incorrect. Financial reconciliation remains standard operating practice."
            ],
            "practicalTakeaway": "Institute a mandatory 90-day milestone and variance review for all departmental action items.",
            "learningOutcome": "Establish effective periodic governance review rhythms",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following represents an effective 30-day workplace action commitment for a department manager?",
            "options": [
              "Promising that the department will become 100% solar powered by tomorrow without a budget.",
              "Auditing current departmental energy and waste baseline data and drafting a prioritized 3-point action plan with designated RACI owners.",
              "Banning all employees from entering the building on Mondays.",
              "Throwing away all departmental computers."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Gathering baseline data and drafting a prioritized, RACI-governed 3-point plan establishes structured, credible operational leadership.",
            "incorrectExplanation": "Establishing baseline metrics and drafting a RACI-governed action plan creates lasting operational momentum.",
            "optionFeedback": [
              "Incorrect. Unbudgeted, unrealistic promises undermine leadership credibility.",
              "Correct! Baseline data collection and structured 3-point action planning establish a defensible, achievable foundation.",
              "Incorrect. Arbitrary building closures disrupt normal operations.",
              "Incorrect. Asset destruction violates basic corporate management rules."
            ],
            "practicalTakeaway": "Draft a prioritized 3-point sustainability action plan with named owners this month.",
            "learningOutcome": "Execute 30-day departmental planning commitment",
            "competencyArea": "COMP_LEADERSHIP"
          }
        ]
      },

      # 2. ELH-14: Setting Departmental Sustainability Goals (D3)
      {
        "courseCode": "ELH-14",
        "title": "Setting Departmental Sustainability Goals",
        "slug": "setting-departmental-sustainability-goals",
        "description": "Align departmental KPIs with corporate ESG strategy, establish auditable baseline metrics, set science-based reduction targets, and avoid unachievable quotas.",
        "fullDescription": "Setting Departmental Sustainability Goals teaches operational managers, unit heads, and team leads to design quantitative, realistic, and motivating sustainability performance targets. Learn how to translate corporate GHG, water, and circularity goals into granular departmental Key Performance Indicators (KPIs), establish normalization intensity metrics (e.g. kWh per guest night, liters per production unit), and structure accountability frameworks that drive real operational change.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_LEADERSHIP",
        "secondaryCompetencies": ["COMP_STRATEGY", "COMP_REPORTING"],
        "learningObjectives": [
          "Translate corporate sustainability commitments into departmental quantitative KPIs.",
          "Distinguish absolute metrics from normalized intensity metrics (e.g. per employee, per occupied room, per tonne manufactured).",
          "Apply the SMART framework (Specific, Measurable, Achievable, Relevant, Time-bound) to workplace sustainability goals.",
          "Establish monthly progress telemetry and performance appraisal alignment."
        ],
        "intendedRoles": ["Operations Managers", "Department Supervisors", "HSE Leads", "Finance Business Partners"],
        "badgeName": "Sustainability Goal Architect",
        "badgeDescription": "Demonstrated competence in establishing normalized, auditable departmental sustainability performance goals.",
        "completionMessage": "Congratulations! You have completed Setting Departmental Sustainability Goals and are prepared to establish rigorous operational targets.",
        "recommendedNextCourseCode": "ELH-117",
        "lessons": [
          {
            "title": "1. Corporate Strategy to Departmental KPI Cascade",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "How enterprise ESG pledges break down into functional departmental responsibilities.",
            "contentBlocks": [
              { "id": "elh14-h1", "type": "heading", "level": 3, "text": "The Strategic Goal Cascade" },
              { "id": "elh14-t1", "type": "short_text", "position": 1, "bodyText": "When an enterprise commits to a corporate net-zero or zero-waste target, every operating unit must identify its direct contribution. Finance controls capital hurdle rates and paperless invoicing; Facilities manages chiller COP and HVAC setpoints; HR leads commuting incentives and onboarding; and Operations drives scrap reduction and machine shutdown discipline. Departmental goals must be directly linked to operational levers under the team's direct span of control." },
              { "id": "elh14-c1", "type": "callout", "variant": "info", "title": "Span of Control Rule", "bodyText": "Never assign a department a target for an outcome it cannot directly measure or influence through daily operations." }
            ]
          },
          {
            "title": "2. Absolute vs Normalized Intensity Metrics",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Why business growth distorts absolute numbers and how intensity metrics reveal true efficiency.",
            "contentBlocks": [
              { "id": "elh14-h2", "type": "heading", "level": 3, "text": "Measuring True Operational Efficiency" },
              { "id": "elh14-t2", "type": "short_text", "position": 1, "bodyText": "An **absolute target** measures total physical volume (e.g. 'Reduce total electricity by 50,000 kWh'). However, if business production doubles, absolute electricity will naturally rise even if machines operate more efficiently. A **normalized intensity metric** divides consumption by an operational business driver (e.g. 'kWh per guest night', 'Liters of water per tonne of textile dyed', 'Paper reams per full-time employee'). Intensity metrics allow departments to prove authentic eco-efficiency regardless of business volume growth." },
              { "id": "elh14-c2", "type": "callout", "variant": "tip", "title": "Intensity Formula", "bodyText": "Intensity KPI = Total Resource Consumption (kWh, Liters, Kg) / Operational Output Unit (Occupied Rooms, Product Units, Revenue)." }
            ]
          },
          {
            "title": "3. The SMART Goal Calibration Matrix",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Calibrating targets to be ambitious yet operationally achievable without demoralizing teams.",
            "contentBlocks": [
              { "id": "elh14-h3", "type": "heading", "level": 3, "text": "Designing Robust SMART Sustainability KPIs" },
              { "id": "elh14-t3", "type": "short_text", "position": 1, "bodyText": "Applying the SMART framework to sustainability: (1) **Specific**: Define the exact resource and boundary (e.g. 'Logistics fleet diesel consumption'); (2) **Measurable**: Specify the unit and data source (e.g. 'Liters per 100 km verified by fuel card reports'); (3) **Achievable**: Ground target in technical engineering feasibility (e.g. 8% reduction via route optimization); (4) **Relevant**: Directly supports corporate Scope 1 decarbonization; and (5) **Time-bound**: Set quarterly milestone checkpoints with a 12-month completion date." },
              { "id": "elh14-c3", "type": "callout", "variant": "action", "title": "Calibration Tip", "bodyText": "Avoid unachievable '100% reduction in 30 days' slogans; calibrated 5% to 15% annual efficiency improvements build lasting operational habits." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Setting Departmental Targets",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Resolve realistic target-setting dilemmas across operational and commercial departments.",
            "contentBlocks": [
              {
                "id": "elh14-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Setting Hotel Housekeeping Laundry Water Targets",
                "prompt": "You are the Executive Housekeeper at a 200-room resort. Management asks you to establish a 2027 water conservation goal. Occupancy is projected to increase from 65% to 85% next year. Which target structure is the most defensible and motivating?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Set an absolute target: 'Cut total laundry water consumption by 20% compared to 2026'.",
                    "consequence": "Flawed goal structure. Because occupancy is increasing by 30%, cutting total absolute water by 20% would require refusing to wash sheets for paying guests, guaranteeing target failure and team frustration.",
                    "feedback": "Absolute targets fail during periods of volume growth; intensity metrics are required.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Set a normalized intensity target: 'Reduce laundry water intensity from 14.5 liters per occupied room to 11.8 liters per occupied room (-18.6%) through full-load washing policies and rinse-water recycling'.",
                    "consequence": "Optimal goal architecture. The target measures true operational washing efficiency independent of guest occupancy fluctuations, providing a clear operational benchmark for laundry staff.",
                    "feedback": "Correct! Normalized intensity metrics isolate operational performance from business volume changes.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Set an unmeasurable goal: 'Make our housekeeping team the greenest laundry in the Indian Ocean'.",
                    "consequence": "Vague slogan. Lacks baseline data, numerical targets, verification methodology, and audit accountability.",
                    "feedback": "Qualitative slogans without numerical metrics cannot be measured, audited, or managed.",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh14-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Aligning Departmental Goals with Employee Appraisals",
                "prompt": "You manage a customer support call center. How do you embed the department's energy conservation target (-15% after-hours workstation baseload) into team performance incentives?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Deduct 10% of team salary if the entire building's master electricity bill increases.",
                    "consequence": "Unfair and unlawful. Punishes call center staff for building-wide electrical factors (e.g. central chiller faults) outside their operational control.",
                    "feedback": "Holding staff financially liable for metrics outside their direct span of control destroys morale and violates labor practices.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Incorporate a specific operational behavior KPI into quarterly team lead reviews: '100% compliance with shift-end PC display sleep profiles and Friday shutdown verification', recognized in monthly team awards.",
                    "consequence": "Optimal alignment. Directly ties appraisal recognition to specific, controllable behaviors that eliminate after-hours workstation energy draw.",
                    "feedback": "Excellent! Aligning performance reviews with controllable operational behaviors ensures accountability and positive engagement.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Departmental Goal Calibration Worksheet",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Formulate two SMART normalized sustainability goals for your operating team.",
            "contentBlocks": [
              { "id": "elh14-h4", "type": "heading", "level": 3, "text": "Drafting Your Departmental Goals" },
              { "id": "elh14-t4", "type": "short_text", "position": 1, "bodyText": "Draft two normalized SMART goals for your department: (1) Goal A (Energy or Resource Intensity per unit); (2) Goal B (Waste Diversion or Process Efficiency %). Define baseline, target metric, data verification source, and quarterly milestones." },
              { "id": "elh14-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Complete your Departmental Goal Calibration Worksheet this week and present the proposed targets at your next departmental team meeting." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "Why is a normalized intensity metric (e.g. kWh per guest night, liters per unit produced) superior to an absolute volume metric when setting departmental efficiency goals during business growth?",
            "options": [
              "Because intensity metrics use smaller numbers that look prettier on PowerPoint slides.",
              "Intensity metrics isolate true operational efficiency from business volume fluctuations, preventing increased sales from masking genuine resource conservation gains.",
              "Absolute metrics are strictly banned by corporate accounting laws.",
              "Intensity metrics allow organizations to stop paying for utility water."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Intensity normalization divides consumption by output, demonstrating whether operations are becoming more efficient even when total business activity expands.",
            "incorrectExplanation": "Intensity metrics isolate operational efficiency from volume changes, enabling fair performance measurement during business growth.",
            "optionFeedback": [
              "Incorrect. Metric selection is governed by analytical accuracy, not visual aesthetics.",
              "Correct! Normalized intensity metrics isolate operational performance from business volume fluctuations, measuring true resource efficiency.",
              "Incorrect. Both metric types are valid, but intensity metrics provide meaningful operational benchmarks during expansion.",
              "Incorrect. Utility billing reflects metered consumption regardless of metric reporting."
            ],
            "practicalTakeaway": "Use normalized intensity metrics to evaluate departmental eco-efficiency during business growth.",
            "learningOutcome": "Distinguish absolute from normalized intensity metrics",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following sustainability targets satisfies all five criteria of the SMART framework?",
            "options": [
              "We will do our best to love nature more this year.",
              "Reduce logistics fleet diesel consumption from 34.2 L/100km to 30.5 L/100km (-10.8%) by 31 December 2027 through GPS route optimization and driver eco-training, verified monthly via fuel telemetry.",
              "Eliminate 100% of carbon emissions worldwide by next Friday.",
              "Tell all employees to stop using electricity forever."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Option 2 defines a Specific metric (fleet diesel L/100km), Measurable baseline and target, Achievable reduction rate (10.8%), Relevant decarbonization mechanism, and Time-bound deadline.",
            "incorrectExplanation": "A SMART goal must be Specific, Measurable, Achievable, Relevant, and Time-bound with clear verification sources.",
            "optionFeedback": [
              "Incorrect. Vague qualitative aspirations lack measurability, timelines, and auditability.",
              "Correct! The goal is Specific, Measurable, Achievable, Relevant to Scope 1 emissions, and Time-bound with verification data.",
              "Incorrect. 100% decarbonization in one week is physically unachievable.",
              "Incorrect. Banning electricity is operationally infeasible and disrupts business continuity."
            ],
            "practicalTakeaway": "Construct targets with precise baseline numbers, target percentages, timelines, and verification data sources.",
            "learningOutcome": "Construct SMART sustainability goals",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the 'Span of Control' principle in departmental sustainability goal governance?",
            "options": [
              "Managers must control the personal lives of all employees.",
              "Departments should only be assigned accountability for sustainability metrics they have direct operational authority and tools to measure, influence, and improve.",
              "Every department must have exactly 50 employees.",
              "Managers must control the corporate stock price."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Holding teams accountable for metrics outside their operational influence (e.g. penalizing marketing for plant chiller efficiency) destroys motivation and accountability.",
            "incorrectExplanation": "The span of control rule ensures targets align strictly with the operational levers available to that specific department.",
            "optionFeedback": [
              "Incorrect. Governance applies to professional operational workflows.",
              "Correct! Aligning goals with a department's direct operational levers ensures fair accountability and effective employee engagement.",
              "Incorrect. Organizational headcount does not dictate target governance.",
              "Incorrect. Market stock valuation is an external capital market phenomenon."
            ],
            "practicalTakeaway": "Ensure departmental goals align directly with operational levers within the team's control.",
            "learningOutcome": "Apply span-of-control principles in goal design",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "A warehouse logistics department wants to establish a waste reduction goal. Which of the following represents the most appropriate baseline calculation method?",
            "options": [
              "Guessing a number based on how clean the warehouse floor looks on Monday morning.",
              "Aggregating 12 consecutive months of weighbridge landfill receipts and certified recycling transfer notes to calculate the baseline diversion rate (e.g. 42% diverted in 2026).",
              "Using the waste statistics of a warehouse in Tokyo.",
              "Assuming the baseline is 0% because previous records were kept in paper files."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "12 months of primary weighbridge and recycler manifests provide an auditable, seasonalized baseline percentage for subsequent reduction tracking.",
            "incorrectExplanation": "A credible baseline requires aggregating 12 months of historical waste manifests and weighbridge tickets.",
            "optionFeedback": [
              "Incorrect. Visual guesswork fails audit and assurance standards.",
              "Correct! Utilizing 12 months of certified weighbridge tickets and recycling manifests establishes an auditable historical baseline.",
              "Incorrect. International benchmarks do not reflect local operational site reality.",
              "Incorrect. Paper records must be digitized to establish historical baseline metrics."
            ],
            "practicalTakeaway": "Compile 12 months of primary manifests to establish your departmental baseline.",
            "learningOutcome": "Calculate auditable historical departmental baselines",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "How should departmental sustainability targets be linked to annual employee performance appraisals?",
            "options": [
              "By firing the bottom 10% of employees every month.",
              "By defining clear, role-relevant behavioral and operational milestones (e.g. leading 5S clean-ups, logging leaks, shutting down equipment) tied to positive recognition and development reviews.",
              "By eliminating all performance bonuses completely.",
              "By evaluating employees based on their personal home electricity bills."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Tying appraisals to observable, role-specific workplace behaviors drives daily engagement without unfairly penalizing staff for site-wide utility anomalies.",
            "incorrectExplanation": "Role-relevant operational contributions and positive recognition effectively embed sustainability into performance management.",
            "optionFeedback": [
              "Incorrect. Arbitrary punitive firing destroys organizational trust.",
              "Correct! Linking performance reviews to specific, job-relevant operational sustainability behaviors drives authentic engagement.",
              "Incorrect. Fair incentive structures motivate high performance.",
              "Incorrect. Employee appraisals must remain strictly confined to workplace performance."
            ],
            "practicalTakeaway": "Link annual reviews to observable, role-relevant workplace sustainability behaviors.",
            "learningOutcome": "Integrate sustainability KPIs into performance appraisals",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the primary operational danger of setting unrealistically aggressive sustainability targets (e.g. 'Zero waste in 3 weeks')?",
            "options": [
              "The department will become too famous.",
              "It creates cynicism, employee burnout, execution paralysis, and encourages teams to hide waste rather than report and remediate it.",
              "It makes the company's computers run too fast.",
              "It reduces the price of raw materials."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Unattainable goals destroy psychological safety, causing staff to disengage or falsify data to avoid punishment.",
            "incorrectExplanation": "Unrealistic targets induce cynicism, burnout, and data concealment, undermining long-term progress.",
            "optionFeedback": [
              "Incorrect. Unrealistic targets damage organizational credibility.",
              "Correct! Setting impossible targets leads to employee cynicism, disengagement, and deceptive reporting.",
              "Incorrect. Target ambition does not alter computer processing speed.",
              "Incorrect. Commodity market pricing is independent of internal target setting."
            ],
            "practicalTakeaway": "Calibrate targets to be ambitious yet technically achievable (5–15% annual gains).",
            "learningOutcome": "Avoid risks of unachievable target calibration",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why should departmental sustainability goal dashboards be updated and shared with frontline teams on a monthly cadence?",
            "options": [
              "To keep printers running continuously.",
              "Frequent transparent telemetry allows teams to see the direct impact of their daily habits, catch negative consumption drift early, and celebrate incremental wins.",
              "To replace all email communication with wall charts.",
              "To make the office walls look decorated."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Monthly visual feedback reinforces positive operational behaviors, highlights maintenance drift before bills arrive, and maintains team engagement.",
            "incorrectExplanation": "Monthly performance telemetry reinforces positive habits, detects operational drift early, and celebrates wins.",
            "optionFeedback": [
              "Incorrect. Dashboards should be shared digitally to avoid paper waste.",
              "Correct! Frequent telemetry connects daily employee actions with tangible resource savings and flags equipment faults promptly.",
              "Incorrect. Visual dashboards complement multi-channel communication.",
              "Incorrect. Telemetry is a core operational management tool, not decoration."
            ],
            "practicalTakeaway": "Share monthly progress telemetry openly with frontline operational staff.",
            "learningOutcome": "Utilize visual telemetry to sustain team engagement",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following represents an effective 30-day departmental goal-setting commitment?",
            "options": [
              "Writing a memo declaring the department 100% green without establishing any metrics.",
              "Drafting two normalized SMART sustainability targets with 12-month baselines, designated data sources, and presenting them for team feedback.",
              "Refusing to participate in any corporate sustainability initiatives.",
              "Deleting all previous utility records."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Establishing normalized SMART targets backed by 12-month baselines and engaging the team creates a sound, defensible foundation.",
            "incorrectExplanation": "Drafting two normalized SMART targets with verifiable baselines establishes structured operational goal governance.",
            "optionFeedback": [
              "Incorrect. Unsubstantiated memos lack operational rigor.",
              "Correct! Formulating two normalized SMART targets with verified baselines and team review establishes solid operational governance.",
              "Incorrect. Disengagement breaches basic organizational leadership duties.",
              "Incorrect. Historical records must be preserved for compliance and baseline tracking."
            ],
            "practicalTakeaway": "Calibrate two normalized SMART departmental targets with verified baseline data this month.",
            "learningOutcome": "Execute 30-day goal calibration commitment",
            "competencyArea": "COMP_LEADERSHIP"
          }
        ]
      },

      # 3. ELH-15: Building a Workplace Sustainability Team (D3)
      {
        "courseCode": "ELH-15",
        "title": "Building a Workplace Sustainability Team",
        "slug": "building-workplace-sustainability-team",
        "description": "Recruit cross-functional sustainability champions, establish formal team charters, secure executive sponsorship, and govern impactful departmental taskforces.",
        "fullDescription": "Building a Workplace Sustainability Team equips aspiring leaders, HR professionals, and departmental coordinators to assemble, charter, and lead high-performing sustainability working groups. Learn how to identify enthusiastic cross-departmental champions, secure active C-suite executive sponsorship, establish clear team charters with defined decision rights, avoid volunteer burnout, and manage impactful workplace eco-projects that deliver verifiable operational and cultural returns.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_LEADERSHIP",
        "secondaryCompetencies": ["COMP_SOCIAL_COMMUNITY", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Recruit a balanced cross-functional sustainability team representing key operational, commercial, and administrative units.",
          "Draft a formal Team Charter defining mission, scope, decision authority, meeting cadence, and executive reporting lines.",
          "Secure and maintain active C-suite executive sponsorship and dedicated project seed funding.",
          "Manage volunteer workload distribution and recognition to prevent champion burnout and turnover."
        ],
        "intendedRoles": ["Green Team Leaders", "HR Specialists", "Department Coordinators", "Workplace Champions"],
        "badgeName": "Sustainability Team Builder",
        "badgeDescription": "Demonstrated capability in recruiting, chartering, and governing cross-functional workplace sustainability teams.",
        "completionMessage": "Congratulations! You have completed Building a Workplace Sustainability Team and are empowered to lead collaborative change.",
        "recommendedNextCourseCode": "ELH-22",
        "lessons": [
          {
            "title": "1. Why Cross-Functional Representation Is Essential",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why single-department green committees fail and how to recruit champions across key operational functions.",
            "contentBlocks": [
              { "id": "elh15-h1", "type": "heading", "level": 3, "text": "Assembling the Cross-Functional Coalition" },
              { "id": "elh15-t1", "type": "short_text", "position": 1, "bodyText": "Sustainability committees that consist solely of HR or Marketing personnel quickly fail because they lack the technical authority to change chiller schedules, alter procurement contracts, or reconfigure production workflows. A high-impact sustainability team requires representatives from four core pillars: (1) **Facilities / Engineering** (technical execution and energy/water telemetry); (2) **Procurement / Supply Chain** (vendor contracts and materials); (3) **Finance** (business case modeling and budget validation); and (4) **Communications / HR** (employee engagement, onboarding, and storytelling)." },
              { "id": "elh15-c1", "type": "callout", "variant": "info", "title": "Pillar Invariant", "bodyText": "Ensure your sustainability team includes representatives with direct access to physical plant controls, purchasing budgets, and internal communication channels." }
            ]
          },
          {
            "title": "2. The Sustainability Team Charter",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Formalizing purpose, meeting rhythms, decision boundaries, and executive sponsorship.",
            "contentBlocks": [
              { "id": "elh15-h2", "type": "heading", "level": 3, "text": "Drafting an Enforceable Working Group Charter" },
              { "id": "elh15-t2", "type": "short_text", "position": 1, "bodyText": "Without a formal charter, sustainability teams degenerate into unfocused talk-shops. A robust Team Charter defines: (1) **Purpose & Scope**; (2) **Executive Sponsor** (a C-suite executive who unblocks budget and policy roadblocks); (3) **Time Allocation** (formal agreement from line managers granting 2 to 4 hours per month for committee work); (4) **Meeting Rhythms** (monthly 45-minute focused agendas); and (5) **Decision Authority** (discretionary spending thresholds and escalation protocols)." },
              { "id": "elh15-c2", "type": "callout", "variant": "tip", "title": "Charter Rule", "bodyText": "Secure written sign-off from department heads approving champion time allocation before officially inducting members." }
            ]
          },
          {
            "title": "3. Preventing Volunteer Burnout & Sustaining Momentum",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Structuring manageable project workloads and formal organizational recognition.",
            "contentBlocks": [
              { "id": "elh15-h3", "type": "heading", "level": 3, "text": "Nurturing and Retaining Dedicated Champions" },
              { "id": "elh15-t3", "type": "short_text", "position": 1, "bodyText": "Sustainability champions often experience burnout when sustainability tasks are piled on top of full-time workloads without formal recognition. Sustain team momentum by: (1) Breaking large annual roadmaps into 30-day 'Sprint Tasks'; (2) Rotating project lead responsibilities; (3) Including sustainability committee service in annual performance appraisals; and (4) Celebrating completed milestones with executive visibility." },
              { "id": "elh15-c3", "type": "callout", "variant": "action", "title": "Recognition Standard", "bodyText": "Ensure committee leadership and delivered savings are highlighted in corporate town halls and reflected in champion performance reviews." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Team Governance Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Navigate common committee leadership challenges regarding participation, management support, and project selection.",
            "contentBlocks": [
              {
                "id": "elh15-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Overcoming Line Manager Pushback",
                "prompt": "An enthusiastic Senior Maintenance Technician wants to join the newly formed Sustainability Taskforce. Her direct department supervisor refuses permission, stating: 'Maintenance is too busy fixing broken equipment to waste 2 hours a month talking about recycling.' As Taskforce Chair, how do you handle this?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Tell the technician to join secretly during lunch breaks and hide her participation from her supervisor.",
                    "consequence": "Severe burnout and conflict. Fosters clandestine operations, creates employee stress, and damages departmental trust.",
                    "feedback": "Secret participation undermines organizational governance and causes champion burnout.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Schedule a brief meeting with the Maintenance Supervisor alongside the Executive Sponsor. Demonstrate that the technician's involvement will focus specifically on compressed air leak elimination and chiller preventative maintenance, directly reducing maintenance emergency breakdowns and utility costs.",
                    "consequence": "Optimal leadership outcome. You align committee objectives with the supervisor's direct operational priorities, winning formal approval and a key technical ally.",
                    "feedback": "Correct! Framing sustainability projects as operational solutions to departmental pain points secures managerial buy-in.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Give up and recruit another marketing intern instead.",
                    "consequence": "Weak technical coalition. Leaves the committee without maintenance technical expertise, making future mechanical energy projects impossible.",
                    "feedback": "Surrendering technical representation weakens the committee's ability to execute operational engineering projects.",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh15-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: The Unfocused Committee Agenda",
                "prompt": "Your sustainability committee has met 3 times, but each meeting descends into long complaints about cafeteria cutlery without deciding on any actions. Members are beginning to skip meetings. What governance intervention do you implement?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Cancel all future committee meetings permanently.",
                    "consequence": "Total leadership collapse. Forfeits cross-functional momentum and leaves corporate sustainability without operational champions.",
                    "feedback": "Abandoning the team fails to resolve the underlying structural governance issue.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Introduce a structured 45-minute agenda: (1) 10 min: Review previous Sprint deliverables; (2) 20 min: Focus on single high-yield Project (e.g. centralized waste sorting rollout); (3) 15 min: Assign named owners and 30-day deadlines in the Action Log.",
                    "consequence": "Optimal transformation. You restore professional discipline, eliminate unproductive complaining, establish clear accountability, and re-energize member engagement.",
                    "feedback": "Excellent! Action-oriented agendas with structured sprint logs convert talk-shops into high-performing project teams.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Team Charter Drafting",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Draft a structured founding charter for your organization's sustainability working group.",
            "contentBlocks": [
              { "id": "elh15-h4", "type": "heading", "level": 3, "text": "Drafting Your Sustainability Team Charter" },
              { "id": "elh15-t4", "type": "short_text", "position": 1, "bodyText": "Draft a 1-page Team Charter: (1) Define mission statement and 12-month focus area; (2) Identify target representatives across Facilities, Finance, Operations, and HR; (3) Specify 2-hour monthly time allocation; and (4) Nominate an Executive Sponsor." },
              { "id": "elh15-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Draft your workplace Sustainability Team Charter this month and review it with your HR Director or Executive Sponsor." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "Why is cross-functional representation (Facilities, Finance, Operations, HR, Procurement) essential for a successful workplace sustainability team?",
            "options": [
              "To ensure every department has to pay committee membership fees.",
              "Sustainability challenges span multiple operational domains; technical execution requires Facilities, budget approvals require Finance, and cultural change requires HR and Operations.",
              "To make committee meetings as crowded as possible.",
              "Because corporate law forbids single-department committees."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "No single department has the authority, budget, technical access, and communication channels to execute end-to-end sustainability initiatives alone.",
            "incorrectExplanation": "Cross-functional representation unites technical authority, financial appraisal, and cultural change levers.",
            "optionFeedback": [
              "Incorrect. Committee operations are funded through corporate operational budgets, not internal fees.",
              "Correct! Cross-functional representation ensures the team possesses the technical access, financial acumen, and people influence required for execution.",
              "Incorrect. Team size should be balanced and purposeful (6–12 members).",
              "Incorrect. Cross-functional assembly is an operational best practice rather than a statutory mandate."
            ],
            "practicalTakeaway": "Assemble a balanced committee with representatives from Facilities, Finance, Operations, and HR.",
            "learningOutcome": "Build cross-functional sustainability coalitions",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the primary role of an Executive Sponsor (C-suite executive) in a workplace sustainability committee?",
            "options": [
              "To attend every meeting and do all the committee's administrative paperwork.",
              "To provide strategic alignment, unblock cross-departmental policy hurdles, champion budget allocations at the Board/ExCo level, and grant official organizational authority to the team.",
              "To punish employees who do not attend committee events.",
              "To decide what color t-shirts the team should wear."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "An Executive Sponsor provides organizational backing, ensures strategic alignment, and removes high-level bureaucratic and budgetary obstacles.",
            "incorrectExplanation": "Executive Sponsors provide high-level advocacy, remove organizational roadblocks, and champion resources at executive tables.",
            "optionFeedback": [
              "Incorrect. Executive sponsors provide strategic leadership rather than routine administrative work.",
              "Correct! The Executive Sponsor unblocks high-level policy obstacles, secures capital budgets, and establishes official organizational authority.",
              "Incorrect. Committee participation is rooted in positive engagement and shared purpose.",
              "Incorrect. Operational details are handled by committee members."
            ],
            "practicalTakeaway": "Secure an active C-suite Executive Sponsor to champion your committee's initiatives.",
            "learningOutcome": "Engage executive sponsorship effectively",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why is securing written line-manager approval for member time allocation (e.g. 2–4 hours/month) critical before launching a sustainability team?",
            "options": [
              "To deduct committee hours from employee paychecks.",
              "It prevents conflict between daily departmental duties and committee tasks, ensuring champions can participate openly without fear of neglecting core responsibilities.",
              "Because line managers must write the meeting minutes.",
              "To register the employee with the Ministry of Environment."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Formal time allocation protects employees from workload conflict and ensures line managers support their staff's sustainability contributions.",
            "incorrectExplanation": "Formal line-manager sign-off protects champions from workload stress and legitimizes committee time.",
            "optionFeedback": [
              "Incorrect. Sustainability committee service is fully paid working time.",
              "Correct! Formal agreement on dedicated hours legitimizes committee work and prevents friction with line supervisors.",
              "Incorrect. Secretarial duties are shared within the committee.",
              "Incorrect. Internal working groups operate under corporate governance."
            ],
            "practicalTakeaway": "Secure written supervisor approval for 2–4 hours/month of dedicated champion time.",
            "learningOutcome": "Formalize champion workload allocations with line managers",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the most effective strategy to prevent volunteer champion burnout in a corporate green team?",
            "options": [
              "Assigning every member 20 hours of mandatory overtime weekly.",
              "Breaking long-term annual goals into manageable 30-day sprints, rotating project responsibilities, and ensuring contributions are formally recognized in annual performance reviews.",
              "Refusing to let members resign from the committee.",
              "Banning champions from taking annual vacation leave."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Bite-sized project sprints, shared task rotation, and formal appraisal recognition sustain energy and prevent volunteer exhaustion.",
            "incorrectExplanation": "Short project sprints, rotating leadership, and formal recognition prevent champion burnout.",
            "optionFeedback": [
              "Incorrect. Excessive overtime accelerates exhaustion and turnover.",
              "Correct! Dividing initiatives into focused 30-day sprints and integrating service into formal performance appraisals sustains motivation and prevents burnout.",
              "Incorrect. Forced participation destroys morale.",
              "Incorrect. Statutory leave entitlements must always be respected."
            ],
            "practicalTakeaway": "Structure committee initiatives into bite-sized 30-day sprints with rotated leadership.",
            "learningOutcome": "Mitigate volunteer champion burnout",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following elements is a mandatory component of an effective Sustainability Team Charter?",
            "options": [
              "A list of the members' favorite holiday destinations.",
              "A defined mission statement, clear scope boundaries, meeting cadence, decision-making authority, and formal executive reporting lines.",
              "A requirement that all meetings must be conducted in Latin.",
              "A prohibition against ever inviting guest speakers."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "A formal charter establishes purpose, operational boundaries, governance cadence, and decision rights, preventing the team from drifting into an unfocused talk-shop.",
            "incorrectExplanation": "A Team Charter defines mission, scope, cadence, decision authority, and reporting hierarchy.",
            "optionFeedback": [
              "Incorrect. Charters are formal governance instruments.",
              "Correct! Clearly defined mission, scope, cadence, decision rights, and executive escalation lines provide the foundation for high team performance.",
              "Incorrect. Charters use standard corporate business language.",
              "Incorrect. External experts and suppliers are valuable contributors to committee learning."
            ],
            "practicalTakeaway": "Formulate a clear Team Charter defining mission, scope, decision rights, and cadence.",
            "learningOutcome": "Draft comprehensive sustainability team charters",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "How should a sustainability committee chair handle a meeting that risks turning into a complaint session about minor office irritations?",
            "options": [
              "Join in the complaining for the full 60 minutes.",
              "Acknowledge the concerns briefly, steer discussion back to the structured agenda, and redirect focus toward measurable project deliverables in the Action Log.",
              "Yell at the participants and storm out of the room.",
              "Order expensive snacks to distract everyone."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Effective chairing acknowledges employee feedback while maintaining disciplined focus on pre-agreed agenda items and action commitments.",
            "incorrectExplanation": "Structured facilitation redirects focus back to strategic priorities and measurable action items.",
            "optionFeedback": [
              "Incorrect. Allowing unstructured complaining wastes meeting time and demoralizes participants.",
              "Correct! A skilled chair validates input while firmly redirecting group energy toward strategic, measurable roadmap items.",
              "Incorrect. Aggressive behavior destroys psychological safety and team trust.",
              "Incorrect. Refreshments do not solve meeting governance deficiencies."
            ],
            "practicalTakeaway": "Maintain disciplined meeting agendas centered on measurable action items.",
            "learningOutcome": "Facilitate action-oriented sustainability meetings",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the primary benefit of rotating project lead roles among different sustainability team members for specific initiatives?",
            "options": [
              "It confuses everyone about who is in charge.",
              "It builds leadership capacity across multiple departments, fosters personal ownership, and prevents single-person dependency if a champion changes roles.",
              "It eliminates the need for an executive sponsor.",
              "It ensures no project is ever finished."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Distributing project leadership develops talent, increases team resilience, and avoids collapse if a single key individual departs the company.",
            "incorrectExplanation": "Rotating project leadership develops institutional capacity and builds resilient team succession.",
            "optionFeedback": [
              "Incorrect. Clear project assignment maintains clarity while building skills.",
              "Correct! Rotating project leads develops leadership talent across departments and ensures team continuity when personnel change.",
              "Incorrect. Executive sponsorship remains vital across all project lifecycles.",
              "Incorrect. Focused sprint ownership accelerates completion."
            ],
            "practicalTakeaway": "Rotate project lead responsibilities to develop broad leadership bench strength.",
            "learningOutcome": "Develop distributed sustainability leadership capacity",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following represents an effective 30-day workplace action commitment for an aspiring sustainability team leader?",
            "options": [
              "Announcing a team without defining its purpose or consulting department managers.",
              "Drafting a 1-page Sustainability Team Charter, securing representation from Facilities, Finance, and HR, and identifying an Executive Sponsor.",
              "Ordering 500 plastic promotional badges before recruiting members.",
              "Writing a complaint email to the CEO about office air conditioning."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Drafting a formal charter, recruiting core cross-functional representatives, and securing executive sponsorship creates a legitimate, high-impact team.",
            "incorrectExplanation": "Drafting a charter and securing cross-functional representatives and executive sponsorship establishes a credible foundation.",
            "optionFeedback": [
              "Incorrect. Unchartered teams without managerial buy-in quickly disintegrate.",
              "Correct! Formulating a clear charter, securing cross-functional champions, and identifying an executive sponsor establishes a durable, effective team.",
              "Incorrect. Promotional merchandise without organizational structure is wasteful.",
              "Incorrect. Professional business cases achieve executive support, not unconstructive complaints."
            ],
            "practicalTakeaway": "Draft a formal 1-page Team Charter and secure cross-functional champions this month.",
            "learningOutcome": "Execute 30-day team building action plan",
            "competencyArea": "COMP_LEADERSHIP"
          }
        ]
      },

      # 4. ELH-16: Communicating Sustainability at Work (D3)
      {
        "courseCode": "ELH-16",
        "title": "Communicating Sustainability at Work",
        "slug": "communicating-sustainability-at-work",
        "description": "Master internal sustainability messaging, tailor communication for distinct employee personas, combat green fatigue, and build authentic feedback loops.",
        "fullDescription": "Communicating Sustainability at Work equips team leads, internal communicators, and environmental champions to craft compelling, evidence-based workplace messaging. Learn how to tailor sustainability communications for diverse employee personas (from skeptical executives to busy frontline workers), eliminate confusing jargon, combat green fatigue, utilize multi-channel campaigns (digital signage, team standups, Slack/Teams, intranet), and construct two-way feedback channels that turn passive employees into active problem solvers.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_LEADERSHIP",
        "secondaryCompetencies": ["COMP_SOCIAL_COMMUNITY", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Segment workplace audiences and tailor sustainability messaging to specific operational personas.",
          "Translate complex technical environmental data (kWh, Scope 1/2/3, carbon intensity) into relatable operational impact stories.",
          "Design multi-channel internal communication campaigns that drive verifiable behavioral change.",
          "Establish two-way feedback channels to capture frontline efficiency ideas and resolve employee concerns."
        ],
        "intendedRoles": ["Internal Communications Leads", "HR Managers", "Department Supervisors", "Green Champions"],
        "badgeName": "Sustainability Communications Specialist",
        "badgeDescription": "Demonstrated capability in designing and delivering impactful internal workplace sustainability communications.",
        "completionMessage": "Congratulations! You have completed Communicating Sustainability at Work and are equipped to inspire authentic engagement across your organization.",
        "recommendedNextCourseCode": "ELH-21",
        "lessons": [
          {
            "title": "1. Audience Segmentation & Workplace Personas",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why one-size-fits-all sustainability messaging fails and how to tailor communication for distinct employee motivations.",
            "contentBlocks": [
              { "id": "elh16-h1", "type": "heading", "level": 3, "text": "Speaking the Language of Every Department" },
              { "id": "elh16-t1", "type": "short_text", "position": 1, "bodyText": "Broad, generic sustainability broadcasts ('Let's all save the planet together!') fail because different employee groups have vastly different operational priorities and daily constraints. Effective communicators segment workplace audiences into four distinct personas: (1) **Executive Leadership** (motivated by risk reduction, cost savings, compliance, and investor reputation); (2) **Middle Managers** (motivated by operational efficiency, team productivity, and hitting KPI targets); (3) **Frontline Operators** (motivated by workplace safety, clear procedures, and peer recognition); and (4) **Passionate Advocates** (motivated by community impact and ethical purpose)." },
              { "id": "elh16-c1", "type": "callout", "variant": "info", "title": "Segmentation Invariant", "bodyText": "Always frame sustainability messages around what the specific audience cares about: cost and risk for leadership, productivity for managers, and ease of work for frontline staff." }
            ]
          },
          {
            "title": "2. Eliminating Jargon: From Tonnes of CO2 to Real Impact",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Translating technical carbon and environmental data into tangible, relatable workplace concepts.",
            "contentBlocks": [
              { "id": "elh16-h2", "type": "heading", "level": 3, "text": "Making Invisible Metrics Visible and Relatable" },
              { "id": "elh16-t2", "type": "short_text", "position": 1, "bodyText": "Telling employees that the office emitted '45 tonnes of Scope 2 CO2e last month' creates zero emotional connection because abstract scientific metrics lack physical meaning in daily life. Translate technical numbers into tangible equivalents: (1) 'We saved 12,000 kWh this month — that is enough electricity to power 40 Mauritian households for a full month!'; (2) 'Eliminating single-use cups saved Rs 180,000 — funds that were redirected to upgrade our staff wellness gym!' Pairing tangible physical metaphors with direct employee benefits drives genuine engagement." },
              { "id": "elh16-c2", "type": "callout", "variant": "tip", "title": "Translation Rule", "bodyText": "Never publish raw carbon or technical metrics without providing a relatable physical equivalent and stating the local benefit." }
            ]
          },
          {
            "title": "3. Multi-Channel Campaigns & Two-Way Feedback Loops",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Utilizing digital signage, standups, and structured suggestion channels to avoid email broadcast fatigue.",
            "contentBlocks": [
              { "id": "elh16-h3", "type": "heading", "level": 3, "text": "Designing Interactive Communication Channels" },
              { "id": "elh16-t3", "type": "short_text", "position": 1, "bodyText": "Relying strictly on long all-staff broadcast emails creates 'green fatigue' and message blindness. Implement a multi-channel campaign mix: (1) **Point-of-Action Nudges** (concise visual prompts at coffee stations, printer bays, and light switches); (2) **Digital Signage & Dashboards** in cafeterias showing weekly energy savings; (3) **2-Minute Standup Injections** at shift start; and (4) **Two-Way Kaizen Feedback Channels** (a digital idea box or physical suggestion board where employees submit waste-reduction ideas and receive public recognition)." },
              { "id": "elh16-c3", "type": "callout", "variant": "action", "title": "Feedback Rule", "bodyText": "Acknowledge every employee sustainability suggestion within 48 hours and provide feedback on whether it will be piloted." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Communication Challenges",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Navigate real-world communication dilemmas involving employee skepticism and message design.",
            "contentBlocks": [
              {
                "id": "elh16-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Addressing Skepticism Around Office Waste Bin Removal",
                "prompt": "Facilities removes under-desk trash bins to roll out central 4-stream recycling hubs. An anonymous post on the company intranet claims: 'Management is just being cheap and trying to cut cleaning staff.' How does internal communications respond?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Delete the anonymous post immediately and threaten to discipline anyone who complains publicly.",
                    "consequence": "Censorship failure. Breeds intense resentment, fuels conspiracy theories, and guarantees employee resistance to recycling.",
                    "feedback": "Suppressing employee concerns destroys trust and guarantees project failure.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Ignore the post and hope people stop complaining after a few weeks.",
                    "consequence": "Communication vacuum. The negative rumor spreads across departments, leading to deliberate contamination of recycling bins.",
                    "feedback": "Silence allows misinformed rumors to define the project narrative.",
                    "score": 0
                  },
                  {
                    "id": "opt_c",
                    "text": "Post a transparent, friendly video featuring a Facilities team lead and a cleaning team member explaining the real facts: central stations eliminate rotting food odours at desks, eliminate 20,000 plastic bin liners/year, and allow cleaners to focus on deep sanitization rather than emptying desk bins.",
                    "consequence": "Optimal communication response. You humanize the operational change, validate cleaning staff value, debunk false rumors with facts, and build widespread empathy and compliance.",
                    "feedback": "Correct! Transparent, peer-led communication addressing specific rumors with operational facts converts resistance into collaboration.",
                    "score": 100
                  }
                ]
              },
              {
                "id": "elh16-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Crafting a Monthly Energy Campaign Pitch",
                "prompt": "You need to launch a campaign encouraging IT and finance employees to shut down workstations over weekends. Which headline and campaign format will achieve the highest compliance?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Send a 6-page PDF email attachment containing technical CEB tariff schedules and formulas.",
                    "consequence": "Message ignored. Less than 2% of staff open the attachment; weekend shutdown rates remain completely unchanged.",
                    "feedback": "Dense technical attachments create cognitive overload and fail to prompt action.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Launch a 'Friday 17:30 Power-Down Challenge' featuring concise Slack/Teams GIF reminders, a 1-click PC sleep setting tutorial, and a monthly inter-departmental leaderboard celebrating the lowest weekend baseload.",
                    "consequence": "Optimal campaign architecture. Engaging, visual, actionable nudges combined with healthy gamified competition increase weekend power-downs by over 60%.",
                    "feedback": "Excellent! Actionable nudges, clear tutorials, and positive social recognition drive significant behavioral change.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Departmental Communication Sprint",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Design and execute an applied workplace sustainability communication campaign.",
            "contentBlocks": [
              { "id": "elh16-h4", "type": "heading", "level": 3, "text": "Your 30-Day Communication Campaign" },
              { "id": "elh16-t4", "type": "short_text", "position": 1, "bodyText": "Design a focused 3-part communication sprint for your team: (1) Create one Point-of-Action visual prompt (e.g. at light switch or printer); (2) Deliver a 2-minute sustainability insight at an upcoming team meeting; and (3) Establish a digital suggestion channel to collect frontline ideas." },
              { "id": "elh16-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Deploy your Point-of-Action visual prompt and deliver your 2-minute team meeting briefing within the next 30 days." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "Why is audience segmentation critical when designing internal workplace sustainability communications?",
            "options": [
              "Because different departments speak completely different foreign languages.",
              "Different employee groups are driven by distinct operational motivations (e.g. executives care about risk and ROI, managers care about productivity, frontline staff care about safety and ease).",
              "To ensure only senior managers receive environmental emails.",
              "Audience segmentation is mandatory under the Mauritius Data Protection Act."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Tailoring messages to the specific priorities and constraints of distinct workplace personas dramatically increases relevance and behavioral compliance.",
            "incorrectExplanation": "Audience segmentation ensures messaging addresses the specific motivations and concerns of different employee groups.",
            "optionFeedback": [
              "Incorrect. Segmentation is based on functional roles and motivations, not language barriers.",
              "Correct! Framing communications around role-specific motivations (ROI for leaders, efficiency for managers, safety for frontline) drives authentic engagement.",
              "Incorrect. Sustainability messaging should reach all employees in appropriate, relevant formats.",
              "Incorrect. Segmentation is an internal communication best practice, not a data privacy regulation."
            ],
            "practicalTakeaway": "Tailor sustainability messaging to the specific operational priorities of each target persona.",
            "learningOutcome": "Segment internal audiences for tailored sustainability communications",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the most effective way to communicate a technical environmental achievement (e.g. saving 15,000 kWh of electricity) to general employees?",
            "options": [
              "Publishing a 20-page scientific calculus report on thermodynamics.",
              "Translating the metric into a relatable physical equivalent and direct employee benefit (e.g. 'Enough energy to power 50 homes for a month, with savings reinvested into staff amenities').",
              "Posting the raw CEB utility meter serial numbers.",
              "Keeping the data secret to avoid distracting staff."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Relatable physical equivalents and clear connections to employee wellbeing convert abstract technical metrics into meaningful community achievements.",
            "incorrectExplanation": "Translating technical data into relatable equivalents and tangible workplace benefits fosters pride and understanding.",
            "optionFeedback": [
              "Incorrect. Academic calculus causes message abandonment.",
              "Correct! Tangible equivalents (homes powered, cars off the road) paired with direct organizational benefits make invisible metrics meaningful.",
              "Incorrect. Raw technical hardware identifiers provide no cognitive meaning to general staff.",
              "Incorrect. Transparent communication is essential for cultural engagement."
            ],
            "practicalTakeaway": "Translate technical metrics into relatable everyday equivalents and tangible benefits.",
            "learningOutcome": "Translate technical sustainability metrics into relatable language",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What causes 'Green Fatigue' (sustainability message blindness) among corporate employees?",
            "options": [
              "Spending too much time outdoors in nature.",
              "Continuous barrages of dense, repetitive, all-staff broadcast emails filled with abstract slogans and zero actionable guidance or tangible progress updates.",
              "Eating too many green vegetables in the cafeteria.",
              "Turning off computers at the end of the day."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Repetitive, text-heavy broadcasts without clear personal relevance or visible progress cause employees to ignore sustainability messaging.",
            "incorrectExplanation": "Green fatigue occurs when employees are inundated with abstract slogans lacking actionable guidance or visible progress.",
            "optionFeedback": [
              "Incorrect. Nature exposure enhances cognitive focus and wellbeing.",
              "Correct! Constant abstract broadcasts without practical actions or progress telemetry lead to cognitive overload and message blindness.",
              "Incorrect. Nutrition is unrelated to communication psychology.",
              "Incorrect. Workstation shutdowns represent positive operational efficiency."
            ],
            "practicalTakeaway": "Combat green fatigue with concise, visual, actionable nudges and celebration of real wins.",
            "learningOutcome": "Identify causes of green fatigue and message blindness",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is a 'Point-of-Action Nudge' in workplace behavioral communications?",
            "options": [
              "A security guard pushing employees toward the exit.",
              "A concise, visual cue placed exactly where an operational decision occurs (e.g. a prompt at a light switch, printer, or bin) guiding immediate sustainable behavior.",
              "An automated email sent at 3:00 AM on Sunday.",
              "A long policy document stored in a physical filing cabinet."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Point-of-action prompts intercept habitual automatic behaviors right at the decision point, making the sustainable choice effortless and top-of-mind.",
            "incorrectExplanation": "Point-of-action nudges provide timely visual prompts right where decisions occur to encourage sustainable habits.",
            "optionFeedback": [
              "Incorrect. Nudges are psychological behavioral cues, not physical force.",
              "Correct! Strategically placed prompts at light switches, printers, and sinks influence real-time operational decisions effectively.",
              "Incorrect. After-hours emails are rarely read at the point of action.",
              "Incorrect. Archived documents do not influence real-time behavior."
            ],
            "practicalTakeaway": "Deploy visual point-of-action prompts at printers, switches, and disposal hubs.",
            "learningOutcome": "Design effective behavioral point-of-action nudges",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why are two-way feedback loops (such as a frontline Kaizen suggestion system) essential for internal sustainability communications?",
            "options": [
              "To let managers spy on employee personal opinions.",
              "Frontline employees have the deepest direct insight into operational waste and bottlenecks; capturing their ideas and acknowledging them drives continuous improvement and authentic engagement.",
              "To eliminate the need for corporate leadership.",
              "To replace all formal environmental audits."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Two-way communication empowers frontline workers to contribute real operational solutions, transforming passive listeners into active co-creators of sustainability.",
            "incorrectExplanation": "Two-way feedback harnesses frontline operational expertise and fosters deep employee ownership.",
            "optionFeedback": [
              "Incorrect. Feedback systems focus on operational waste elimination, not surveillance.",
              "Correct! Frontline workers observe daily waste directly; structured suggestion channels harness their expertise to drive real-world improvements.",
              "Incorrect. Feedback channels support and inform executive leadership.",
              "Incorrect. Grassroots feedback complements formal audits and compliance reviews."
            ],
            "practicalTakeaway": "Establish two-way feedback channels and acknowledge employee ideas within 48 hours.",
            "learningOutcome": "Construct two-way employee feedback mechanisms",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "When addressing employee resistance to a major green policy change (e.g. replacing disposable paper cups with reusable ceramic mugs), what is the most effective communication approach?",
            "options": [
              "Mocking employees who complain on social media.",
              "Communicating transparently about the operational reasons, addressing hygiene and convenience concerns proactively, and providing dedicated dishwashing amenities.",
              "Canceling the policy immediately and purchasing 100,000 plastic cups.",
              "Blaming the government for forcing the company to make the change."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Transparently explaining the rationale, addressing practical friction (like washing facilities), and leading with empathy overcomes behavioral resistance.",
            "incorrectExplanation": "Addressing practical convenience concerns transparently and providing supporting amenities dissolves resistance.",
            "optionFeedback": [
              "Incorrect. Mocking staff creates hostile workplace relations and destroys morale.",
              "Correct! Proactively resolving convenience concerns and providing proper washing infrastructure eliminates practical resistance.",
              "Incorrect. Retreating to single-use plastics increases waste and financial expense.",
              "Incorrect. Passing blame undermines leadership credibility and corporate purpose."
            ],
            "practicalTakeaway": "Proactively address convenience and hygiene concerns when introducing reusable workplace systems.",
            "learningOutcome": "Manage change communication and overcome employee resistance",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "How can internal communications leverage positive social proof to accelerate workplace sustainability adoption?",
            "options": [
              "By publishing a list of the worst-performing employees on the intranet.",
              "By highlighting departments and teams that have successfully adopted green habits (e.g. 'Finance achieved 95% weekend shutdown this month!'), creating positive peer norms.",
              "By telling everyone that no one in the company cares about sustainability.",
              "By banning departments from talking to each other."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Highlighting positive peer adoption signals that sustainable behavior is the normal, valued workplace standard, encouraging others to follow.",
            "incorrectExplanation": "Celebrating team successes and high adoption rates creates positive social norms that encourage wider participation.",
            "optionFeedback": [
              "Incorrect. Public shaming triggers hostility, resentment, and disengagement.",
              "Correct! Celebrating peer milestones and sharing success stories establishes positive social norms across the organization.",
              "Incorrect. Negative generalizations normalize non-compliance.",
              "Incorrect. Cross-departmental communication is vital for organizational learning."
            ],
            "practicalTakeaway": "Celebrate positive team milestones to establish normative peer standards.",
            "learningOutcome": "Apply positive social proof in internal campaigns",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following represents an effective 30-day workplace action commitment for an internal sustainability communicator?",
            "options": [
              "Sending 50 broadcast emails every day with no clear call to action.",
              "Deploying one targeted point-of-action nudge at a key decision point and delivering a 2-minute relatable sustainability briefing at a team standup.",
              "Banning all internal communications completely.",
              "Deleting the company intranet sustainability section."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Deploying a physical point-of-action nudge and sharing a brief, relatable verbal update delivers immediate, focused behavioral impact.",
            "incorrectExplanation": "Deploying point-of-action nudges and delivering verbal briefings creates actionable, high-impact engagement.",
            "optionFeedback": [
              "Incorrect. Email spam causes message blindness and frustration.",
              "Correct! Pairing a physical point-of-action nudge with a concise team verbal update delivers high-impact, actionable engagement.",
              "Incorrect. Communication is fundamental to organizational alignment.",
              "Incorrect. Transparent digital resources should be expanded, not deleted."
            ],
            "practicalTakeaway": "Deploy a point-of-action nudge and deliver a 2-minute team briefing this month.",
            "learningOutcome": "Execute 30-day communication action plan",
            "competencyArea": "COMP_LEADERSHIP"
          }
        ]
      }
    ]

print("Wave 3A Module 1 ready.")
