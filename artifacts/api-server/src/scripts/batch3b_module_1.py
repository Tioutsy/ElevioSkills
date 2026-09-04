#!/usr/bin/env python3
import json
import os

def get_courses_1_to_5():
    return [
      # 1. ELH-17: Tracking Sustainability Actions and Progress (D3)
      {
        "courseCode": "ELH-17",
        "title": "Tracking Sustainability Actions and Progress",
        "slug": "tracking-sustainability-actions",
        "description": "Master operational sustainability tracking frameworks, KPI variance reporting, milestone audit protocols, and data dashboard governance in commercial facilities.",
        "fullDescription": "Tracking Sustainability Actions and Progress equips operational leaders, project managers, and ESG coordinators to establish rigorous, audit-ready tracking rhythms for workplace sustainability initiatives. Learn how to define quantitative leading and lagging indicators, implement weekly milestone verification checklists, calculate cost and carbon variance against initial baselines, configure automated digital progress dashboards, and run effective monthly operational review meetings that prevent project slippage.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_REPORTING_DISCLOSURE",
        "secondaryCompetencies": ["COMP_DATA_ANALYTICS", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Establish a standardized 5-point monthly progress tracking protocol across departmental sustainability initiatives.",
          "Distinguish between leading operational indicators and lagging sustainability disclosure metrics.",
          "Calculate schedule and budgetary variance using standardized Milestone Tracking Registers.",
          "Design and govern an executive-ready sustainability progress dashboard with automated exception flagging."
        ],
        "intendedRoles": ["Sustainability Coordinators", "Department Leads", "Operations Managers", "Project Management Officers"],
        "badgeName": "Sustainability Progress Tracker",
        "badgeDescription": "Demonstrated capability in governing operational sustainability progress tracking, KPI audits, and milestone variance management.",
        "completionMessage": "Congratulations! You have completed Tracking Sustainability Actions and Progress and are prepared to maintain audit-grade project governance.",
        "recommendedNextCourseCode": "ELH-19",
        "lessons": [
          {
            "title": "1. Operational Tracking Fundamentals & Leading Indicators",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why sustainability projects suffer from execution drift and how to establish proactive leading operational metrics.",
            "contentBlocks": [
              { "id": "elh17-h1", "type": "heading", "level": 3, "text": "Overcoming the Sustainability Execution Gap" },
              { "id": "elh17-t1", "type": "short_text", "position": 1, "bodyText": "Sustainability plans frequently fail not from poor strategic intent, but from inadequate operational tracking. Relying solely on lagging annual metrics (like total annual greenhouse gas emissions) provides feedback too late to take corrective action. Operational tracking requires monitoring leading indicators—such as weekly chiller operating hours, daily waste segregation purity rates, and completed preventive maintenance checks—allowing facilities teams to detect and rectify anomalies before monthly billing cycles close." },
              { "id": "elh17-c1", "type": "callout", "variant": "info", "title": "Leading vs Lagging Rule", "bodyText": "Lagging metrics inform your annual report; leading metrics inform your daily operations. A robust tracking system monitors at least two leading indicators for every lagging ESG goal." }
            ]
          },
          {
            "title": "2. Building the Milestone Tracking Register",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Constructing standardized milestone matrices with evidence requirements and variance triggers.",
            "contentBlocks": [
              { "id": "elh17-h2", "type": "heading", "level": 3, "text": "Standardizing Departmental Progress Evidence" },
              { "id": "elh17-t2", "type": "short_text", "position": 1, "bodyText": "A reliable Milestone Tracking Register requires four data columns: (1) Target Milestone Description with quantifiable completion criteria; (2) Assigned RACI Owner and verification auditor; (3) Planned vs Actual Delivery Dates with schedule variance calculation; and (4) Direct evidence documentation (e.g. calibration certificates, waste manifest weight tickets, commissioning reports). Without attached tangible evidence, self-reported completion percentages are unverified estimates." },
              { "id": "elh17-c2", "type": "callout", "variant": "tip", "title": "Evidence Verification Standard", "bodyText": "Never record a milestone as complete until independent physical or digital evidence has been attached and logged." }
            ]
          },
          {
            "title": "3. Progress Dashboard Architecture & Exception Reporting",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Automating RAG (Red-Amber-Green) alerts and managing operational exception escalation.",
            "contentBlocks": [
              { "id": "elh17-h3", "type": "heading", "level": 3, "text": "Configuring Automated Exception Escalations" },
              { "id": "elh17-t3", "type": "short_text", "position": 1, "bodyText": "Effective governance dashboards use automated threshold triggers: **Green** indicates progress within +/- 5% of target; **Amber** flags variance between 5% and 15% (requiring departmental action within 10 business days); and **Red** signifies variance exceeding 15% or a statutory compliance risk (triggering immediate escalation to the Executive Sustainability Steering Committee). Dashboard simplicity prevents executive alert fatigue." },
              { "id": "elh17-c3", "type": "callout", "variant": "action", "title": "Variance Response Policy", "bodyText": "Mandate written corrective action plans for any initiative flagged Amber for two consecutive reporting cycles." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Progress Governance Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate realistic project tracking and variance dilemmas in operating facilities.",
            "contentBlocks": [
              {
                "id": "elh17-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Dealing with Vendor Milestone Slippage",
                "prompt": "You are tracking the installation of a rooftop 250 kWp solar PV system for a manufacturing facility. The solar contractor reports that milestone 3 (inverter mounting and AC cabling) is '90% done', but the site supervisor discovers that key electrical components have not cleared customs and work has stopped for 14 days. The contractor asks you to mark the milestone as complete in the monthly steering committee report so they can receive their progress payment. What do you do?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Approve the completion in the system to maintain a good working relationship with the vendor.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Marking unverified milestones as complete violates financial governance, distorts executive reporting, and exposes your company to payment risk without deliverable transfer."
                  },
                  {
                    "id": "opt_b",
                    "text": "Log the milestone as 'Amber - Delayed by Customs' (60% physical progress), withhold the milestone sign-off, and request an expedited customs clearance plan.",
                    "isCorrect": True,
                    "feedback": "Correct! Transparent tracking requires matching reported status to physical evidence. Flagging the variance protects financial controls while triggering operational resolution."
                  },
                  {
                    "id": "opt_c",
                    "text": "Cancel the entire solar contract immediately without investigating the import bottleneck.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Contract termination without cure notices causes severe project delays, legal disputes, and unnecessary costs."
                  },
                  {
                    "id": "opt_d",
                    "text": "Delete the inverter milestone from the project tracking register entirely.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Altering the baseline schedule hides operational reality and compromises project auditability."
                  }
                ]
              },
              {
                "id": "elh17-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Reconciling Conflicting Water Sub-Meter Data",
                "prompt": "Your commercial property tracking system shows that overall building water consumption dropped by 12% following a restroom fixture retrofit. However, the cooling tower sub-meter data shows water consumption increased by 35% during the same month. The property manager wants to publish a press release celebrating a 12% overall water reduction. How do you respond?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Publish the press release immediately since the aggregate headline number meets the target.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Ignoring the cooling tower anomaly risks publishing misleading green claims while masking an active equipment leak or cooling tower drift issue."
                  },
                  {
                    "id": "opt_b",
                    "text": "Pause public claims, conduct an immediate physical audit of the cooling tower float valve and conductivity controls, and reconcile the mass balance before reporting.",
                    "isCorrect": True,
                    "feedback": "Correct! Rigorous tracking investigates departmental anomalies beneath aggregate metrics to identify hidden operational waste and prevent false public disclosures."
                  },
                  {
                    "id": "opt_c",
                    "text": "Disconnect the cooling tower sub-meter so it no longer interferes with the aggregate data.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Suppressing sub-metering data is a severe breach of data integrity and facility management standards."
                  },
                  {
                    "id": "opt_d",
                    "text": "Blame the laundry department without reviewing meter logs.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Fact-based progress tracking relies on telemetry calibration and systematic physical verification."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Sustaining Long-Term Action Governance & 30-Day Action Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Institutionalizing monthly tracking rituals and executing your immediate 30-day tracking setup.",
            "contentBlocks": [
              { "id": "elh17-h4", "type": "heading", "level": 3, "text": "Institutionalizing Monthly Review Rhythms" },
              { "id": "elh17-t4", "type": "short_text", "position": 1, "bodyText": "Long-term tracking success relies on consistent operational review cadences. Schedule a mandatory 30-minute monthly cross-departmental review where each project owner presents their 3 core leading metrics, evidence files, and variance mitigation actions. Document minutes and distribute an updated one-page summary to department heads within 24 hours." },
              { "id": "elh17-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Identify the top 3 sustainability initiatives in your department; (2) Create a Milestone Tracking Register with verified evidence criteria; and (3) Establish two leading operational indicators for monthly progress reporting." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary operational purpose of monitoring leading indicators alongside lagging ESG metrics?",
            "options": [
              "To satisfy external marketing agencies with preliminary promotional material.",
              "To detect operational inefficiencies and variance early enough to take corrective action before reporting periods close.",
              "To eliminate the need for annual utility bills and third-party financial audits.",
              "To reduce the number of employees needed to run facility operations."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Leading indicators provide real-time operational feedback, allowing facility teams to intervene and resolve anomalies before monthly or annual lagging metrics are finalized.",
            "incorrectExplanation": "Leading indicators are operational management tools used to drive timely intervention, not marketing assets or audit replacements.",
            "optionFeedback": [
              "Incorrect. Leading indicators are internal operational control mechanisms, not marketing material.",
              "Correct! Leading metrics provide actionable real-time data to prevent project slippage and billing surprises.",
              "Incorrect. Third-party audits and utility invoices remain essential statutory requirements.",
              "Incorrect. Leading metrics improve managerial visibility but do not aim to cut operational staff."
            ],
            "practicalTakeaway": "Track weekly operational leading metrics (like sub-metered hours and checklist completion) to catch anomalies early.",
            "learningOutcome": "Distinguish between leading and lagging sustainability metrics",
            "competencyArea": "COMP_DATA_ANALYTICS"
          },
          {
            "question": "Which set of fields is mandatory for an audit-ready Milestone Tracking Register?",
            "options": [
              "Project nickname, estimated completion month, and informal team chat transcript.",
              "Quantified deliverable description, single RACI owner, planned vs actual delivery dates, and attached verification evidence.",
              "Executive sponsor signature, budget total without line items, and social media hashtags.",
              "Annual carbon total, general departmental mission statement, and vendor advertising brochures."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Audit-grade tracking requires clear deliverable specs, named individual accountability, schedule tracking, and tangible evidence documentation.",
            "incorrectExplanation": "Informal notes and high-level summaries lack the rigor needed for verifiable project governance.",
            "optionFeedback": [
              "Incorrect. Informal chats and nicknames fail audit and operational governance standards.",
              "Correct! Deliverable specifics, single-point ownership, dates, and evidence form the core of audit-grade tracking.",
              "Incorrect. Unitemized budgets and hashtags lack operational tracking utility.",
              "Incorrect. Broad statements without milestone detail cannot support monthly project management."
            ],
            "practicalTakeaway": "Ensure every milestone line item includes a single accountable owner and specific verification proof.",
            "learningOutcome": "Construct audit-ready milestone tracking registers",
            "competencyArea": "COMP_REPORTING_DISCLOSURE"
          },
          {
            "question": "In a standard RAG progress dashboard, what operational condition typically triggers an 'Amber' alert?",
            "options": [
              "Project progress is exactly 100% on schedule and within budget.",
              "Variance between 5% and 15% against planned milestones, requiring a documented departmental recovery plan.",
              "Catastrophic equipment failure requiring immediate facility shutdown.",
              "Routine change in meeting room reservation software."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Amber alerts signify moderate variance (5–15%) that requires active departmental corrective action before escalating to Red.",
            "incorrectExplanation": "Amber denotes moderate off-track variance requiring recovery action, not perfect progress or immediate catastrophe.",
            "optionFeedback": [
              "Incorrect. On-track progress is designated as Green.",
              "Correct! Amber identifies moderate variance requiring structured departmental intervention.",
              "Incorrect. Critical failures and major compliance breaches trigger an immediate Red alert.",
              "Incorrect. Minor administrative software changes do not warrant dashboard variance alerts."
            ],
            "practicalTakeaway": "Define explicit variance percentage thresholds for Green, Amber, and Red to eliminate subjective status reporting.",
            "learningOutcome": "Configure dashboard variance thresholds and escalation triggers",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "A department reports that an energy-saving LED relamping project is '100% complete', but no recycling manifest for hazardous mercury-containing fluorescent tubes is provided. How should the tracking auditor record this status?",
            "options": [
              "Mark the project 100% complete and assume the tubes were disposed of legally.",
              "Hold the milestone status as incomplete until the hazardous waste consignment manifest and disposal certificate are verified.",
              "Delete the hazardous waste requirement to avoid delaying project closure.",
              "Pass the milestone and write a personal note to check the dumpster next month."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Project closure requires complete operational and environmental compliance verification, including hazardous waste chain of custody.",
            "incorrectExplanation": "Unverified hazardous waste disposal creates severe statutory liability and violates sustainability verification protocols.",
            "optionFeedback": [
              "Incorrect. Assuming compliance without documentation violates environmental due diligence.",
              "Correct! Physical disposal manifests are mandatory evidence before signing off on lighting retrofits.",
              "Incorrect. Deleting compliance criteria is a severe breach of environmental management standards.",
              "Incorrect. Informal checks do not satisfy regulatory or audit chain-of-custody requirements."
            ],
            "practicalTakeaway": "Never sign off on project completion without full statutory environmental disposal documentation.",
            "learningOutcome": "Verify evidence and regulatory compliance for project sign-off",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "What is the recommended response when a project remains flagged 'Amber' for two consecutive monthly review cycles?",
            "options": [
              "Change the dashboard threshold so the project displays as Green.",
              "Require the project lead to submit a formal root-cause analysis and time-bound corrective recovery plan.",
              "Abandon the project immediately and write off all invested capital.",
              "Stop holding monthly tracking meetings to reduce team pressure."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Persistent Amber status signals systemic execution obstacles that require structured root-cause analysis and an approved recovery plan.",
            "incorrectExplanation": "Masking variance or abandoning projects without investigation undermines operational accountability.",
            "optionFeedback": [
              "Incorrect. Manipulating thresholds to mask delays is a fraudulent reporting practice.",
              "Correct! Two consecutive Amber flags demand formal root-cause analysis and executive recovery oversight.",
              "Incorrect. Premature abandonment wastes capital before evaluating corrective adjustments.",
              "Incorrect. Cancelling reviews eliminates governance when it is most urgently needed."
            ],
            "practicalTakeaway": "Institute automatic escalation to formal recovery planning for recurring variance.",
            "learningOutcome": "Manage operational project recovery workflows",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "When presenting progress data to the Executive Sustainability Steering Committee, what format is most effective?",
            "options": [
              "A 60-page unformatted raw spreadsheet containing every daily sub-meter reading.",
              "A concise one-page dashboard highlighting key milestone RAG status, budget variance, and high-priority exception items.",
              "A collection of candid workplace photos with no quantitative performance data.",
              "A verbal presentation with zero written records or supporting metrics."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Executive steering committees require distilled, actionable reporting that focuses on milestone health, variances, and strategic decisions.",
            "incorrectExplanation": "Data dumps and unstructured narratives overwhelm executives and obscure key decision points.",
            "optionFeedback": [
              "Incorrect. Unfiltered raw data dumps overwhelm executives and obscure critical issues.",
              "Correct! Concise dashboards with clear exception reporting enable swift, informed executive decision-making.",
              "Incorrect. Photos without data provide no governance or accountability value.",
              "Incorrect. Verbal-only reports lack audit trail credibility and governance rigor."
            ],
            "practicalTakeaway": "Structure executive updates around clear RAG status, quantifiable variance, and required executive decisions.",
            "learningOutcome": "Deliver effective executive sustainability progress reporting",
            "competencyArea": "COMP_REPORTING_DISCLOSURE"
          },
          {
            "question": "Why should progress tracking registers maintain version control history whenever milestone target dates are revised?",
            "options": [
              "To increase the file size for cloud storage quotas.",
              "To preserve an auditable baseline history and prevent unrecorded deadline extensions.",
              "To allow any team member to overwrite previous manager approvals anonymously.",
              "To comply with graphic design branding guidelines."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Version control ensures that initial project baselines and approved change requests remain transparent, preventing stealth schedule creep.",
            "incorrectExplanation": "Version history is essential for accountability and change management, not file sizing or formatting.",
            "optionFeedback": [
              "Incorrect. Versioning is a governance control, not a storage optimization mechanism.",
              "Correct! Version control preserves the original baseline and tracks authorized change requests transparently.",
              "Incorrect. Approvals must be authenticated and traceable, never anonymous.",
              "Incorrect. Version control is a project management standard, unrelated to graphic design."
            ],
            "practicalTakeaway": "Always document change order justifications and maintain baseline version records when milestones shift.",
            "learningOutcome": "Maintain audit trails and baseline change governance",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "Which action should be completed within the first 30 days of establishing a departmental sustainability tracking system?",
            "options": [
              "Purchase expensive enterprise enterprise resource software without assessing departmental workflow requirements.",
              "Identify top departmental initiatives, create a Milestone Tracking Register with verification criteria, and establish 2 leading metrics.",
              "Announce 100% net-zero achievement to international certification bodies.",
              "Delegate all tracking responsibilities exclusively to external third-party interns."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "A pragmatic 30-day kickoff focuses on prioritizing core initiatives, building standard milestone registers, and activating leading operational metrics.",
            "incorrectExplanation": "Premature software purchases or unverified claims lead to wasted capital and reputational damage.",
            "optionFeedback": [
              "Incorrect. Buying complex software before establishing manual discipline leads to low adoption and wasted funds.",
              "Correct! Establishing core priorities, evidence-based registers, and leading metrics creates a solid foundation.",
              "Incorrect. Unsubstantiated net-zero claims constitute greenwashing.",
              "Incorrect. Departmental ownership requires internal operational leadership, not complete external delegation."
            ],
            "practicalTakeaway": "Start with practical, standardized milestone registers and reliable leading indicators before adding software layers.",
            "learningOutcome": "Implement a 30-day operational tracking rollout",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 2. ELH-19: Reviewing Sustainability Performance and Taking Corrective Action (D3)
      {
        "courseCode": "ELH-19",
        "title": "Reviewing Sustainability Performance and Taking Corrective Action",
        "slug": "sustainability-performance-review",
        "description": "Master structured sustainability performance audits, 5-Why root-cause analysis, CAPA (Corrective and Preventive Action) formulation, and executive review cycles in commercial operations.",
        "fullDescription": "Reviewing Sustainability Performance and Taking Corrective Action equips facility managers, department heads, and compliance officers to conduct rigorous sustainability reviews and resolve operational underperformance. Learn how to interpret energy, water, and waste variance reports, lead cross-functional 5-Why and Ishikawa root-cause investigations, formulate SMART Corrective and Preventive Action (CAPA) plans, assign operational ownership, and track remediation through to verified closure.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_GOVERNANCE_ETHICS",
        "secondaryCompetencies": ["COMP_LEADERSHIP", "COMP_DATA_ANALYTICS"],
        "learningObjectives": [
          "Conduct quarterly sustainability variance reviews across operational resource streams.",
          "Apply 5-Why and Fishbone (Ishikawa) root-cause methodologies to environmental non-conformances.",
          "Formulate audit-compliant Corrective and Preventive Action (CAPA) remediation plans.",
          "Establish systematic post-remediation verification audits to prevent recurring defects."
        ],
        "intendedRoles": ["Operations Managers", "EHS Officers", "Department Heads", "Quality Assurance Managers"],
        "badgeName": "CAPA Sustainability Practitioner",
        "badgeDescription": "Demonstrated competence in conducting sustainability performance reviews, root-cause investigations, and CAPA execution.",
        "completionMessage": "Congratulations! You have completed Reviewing Sustainability Performance and Taking Corrective Action and are prepared to resolve operational performance gaps.",
        "recommendedNextCourseCode": "ELH-20",
        "lessons": [
          {
            "title": "1. Performance Review Frameworks & Variance Diagnostics",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Structuring quarterly performance reviews and detecting operational performance drift.",
            "contentBlocks": [
              { "id": "elh19-h1", "type": "heading", "level": 3, "text": "Detecting Environmental Performance Drift" },
              { "id": "elh19-t1", "type": "short_text", "position": 1, "bodyText": "A sustainability performance review is not a passive data presentation; it is an active diagnostic mechanism. Operational drift occurs when equipment settings, shift behaviors, or maintenance routines gradually degrade over time. Comparing actual performance against weather-normalized baselines and production volume ratios reveals whether energy or water spikes stem from increased business output or genuine operational defects." },
              { "id": "elh19-c1", "type": "callout", "variant": "info", "title": "Normalization Principle", "bodyText": "Always normalize utility consumption against operational drivers (such as guest-nights, production tonnes, or degree days) before evaluating variance." }
            ]
          },
          {
            "title": "2. Root-Cause Analysis: 5-Why & Fishbone Methodologies",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Drilling down to underlying organizational and mechanical root causes rather than treating symptoms.",
            "contentBlocks": [
              { "id": "elh19-h2", "type": "heading", "level": 3, "text": "Uncovering the True Root Cause" },
              { "id": "elh19-t2", "type": "short_text", "position": 1, "bodyText": "When a facility exceeds its waste or energy target, treating the surface symptom (e.g. telling staff to 'work harder') never fixes the problem. Using the **5-Why methodology**, teams ask successive 'Why' questions to trace failures back to management systems, standard operating procedures (SOPs), or equipment design. Pairing this with a **Fishbone Diagram** (categorizing causes by People, Process, Equipment, Environment, and Materials) ensures no critical factor is overlooked." },
              { "id": "elh19-c2", "type": "callout", "variant": "tip", "title": "5-Why Golden Rule", "bodyText": "If your 5th Why ends in 'human error', you have not reached the root cause. Probe deeper into training, tooling, incentives, or system design." }
            ]
          },
          {
            "title": "3. Formulating Audit-Compliant CAPA Plans",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Designing specific corrective and preventive actions with measurable verification criteria.",
            "contentBlocks": [
              { "id": "elh19-h3", "type": "heading", "level": 3, "text": "Distinguishing Corrective vs Preventive Actions" },
              { "id": "elh19-t3", "type": "short_text", "position": 1, "bodyText": "A **Corrective Action** fixes the immediate defect (e.g. repairing a leaking underground pipe). A **Preventive Action** changes the system to prevent recurrence across the entire facility (e.g. installing acoustic leak detectors and quarterly pressure-testing SOPs). Every CAPA plan must specify: (1) Problem Statement; (2) Root Cause; (3) Immediate Correction; (4) Systemic Preventive Action; (5) Named Owner; (6) Implementation Deadline; and (7) 60-Day Verification Audit Date." },
              { "id": "elh19-c3", "type": "callout", "variant": "action", "title": "CAPA Closure Standard", "bodyText": "A CAPA cannot be signed off upon action completion; it requires a 60-day effectiveness audit proving that performance has stabilized." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Corrective Action Trade-Offs",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Analyze operational non-conformance scenarios and select robust corrective pathways.",
            "contentBlocks": [
              {
                "id": "elh19-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Organic Waste Contamination in Resort Operations",
                "prompt": "Your luxury beach resort has partnered with a local composting farm, but the farm rejects 3 consecutive truckloads of organic waste due to severe contamination with plastic wrap and aluminum cans. The general manager demands you fire the steward team. How do you lead the corrective action investigation?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Comply with the GM and replace the steward team immediately.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Blaming staff without investigating underlying causes ignores kitchen layout, bin color-coding, multilingual signage, and shift pressure."
                  },
                  {
                    "id": "opt_b",
                    "text": "Conduct a 5-Why investigation on the stewarding line: inspect prep station bin locations, introduce transparent bio-bags, install visual picture-based sorting guides, and verify with daily kitchen audits.",
                    "isCorrect": True,
                    "feedback": "Correct! Systemic root-cause remediation fixes the workflow, bin placement, and visual guidance, ensuring long-term sorting purity without scapegoating."
                  },
                  {
                    "id": "opt_c",
                    "text": "Cancel the composting program and send all kitchen waste back to the municipal landfill.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Abandoning the circular waste program causes your resort to fail sustainability commitments and increases landfill tipping fees."
                  },
                  {
                    "id": "opt_d",
                    "text": "Hide the contamination notices from the executive committee.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Suppressing non-conformance reports violates governance standards and destroys operational trust."
                  }
                ]
              },
              {
                "id": "elh19-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Unexplained Overnight Chiller Energy Spike",
                "prompt": "During the monthly energy review, you discover that the main commercial building's chiller energy consumption between midnight and 5:00 AM surged by 400% over the past 3 weeks, despite 0% building occupancy. The facility contractor claims 'the weather has been warmer'. What is your course of action?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Accept the contractor's weather explanation and close the review item.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Nighttime temperature variations in Mauritius cannot explain a 400% baseload surge during zero occupancy."
                  },
                  {
                    "id": "opt_b",
                    "text": "Audit the BMS override logs and physical time schedules, discover that a night cleaning crew manually overrode the chiller to 19°C, and implement automated BMS schedule locks with digital reset timers.",
                    "isCorrect": True,
                    "feedback": "Correct! Physical schedule auditing combined with automated software controls directly resolves the root cause and prevents future manual overrides."
                  },
                  {
                    "id": "opt_c",
                    "text": "Shut down the power supply to the entire building main switchboard every evening at 11:00 PM.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Cutting main building power disrupts critical server rooms, fire systems, security cameras, and essential ventilation."
                  },
                  {
                    "id": "opt_d",
                    "text": "Double the monthly electricity budget to accommodate the higher baseline.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Budget inflation legitimizes operational waste instead of enforcing energy efficiency discipline."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Performance Governance & 30-Day CAPA Implementation",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Institutionalizing closed-loop CAPA governance and executing your 30-day review plan.",
            "contentBlocks": [
              { "id": "elh19-h4", "type": "heading", "level": 3, "text": "Closing the Performance Review Loop" },
              { "id": "elh19-t4", "type": "short_text", "position": 1, "bodyText": "A performance review process is only as strong as its follow-through. Log all non-conformances in a central CAPA register accessible to operations, engineering, and finance. Review open CAPAs at weekly department meetings and mandate executive sign-off before closing any item. This closed-loop discipline transforms failures into permanent operational improvements." },
              { "id": "elh19-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Conduct a quarterly variance audit on your facility's top utility spend line; (2) Perform a 5-Why root-cause analysis on the largest identified deviation; and (3) Issue an audit-ready CAPA plan with a 60-day effectiveness verification date." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary difference between a Corrective Action and a Preventive Action in sustainability governance?",
            "options": [
              "Corrective actions cost money, whereas preventive actions are always free of charge.",
              "A corrective action resolves an existing failure, while a preventive action modifies systems or procedures to prevent recurrence.",
              "Corrective actions apply to office workers, while preventive actions apply to contractors.",
              "A corrective action is optional, whereas a preventive action is legally required."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Corrective action rectifies the immediate non-conformance; preventive action addresses the underlying systemic cause to eliminate future occurrences.",
            "incorrectExplanation": "Corrective and preventive actions are distinguished by their scope and intent (immediate fix vs systemic prevention), not cost or job role.",
            "optionFeedback": [
              "Incorrect. Both corrective and preventive actions may require capital or operational expenditure.",
              "Correct! Corrective actions fix immediate problems; preventive actions systematically eliminate the risk of recurrence.",
              "Incorrect. Both action types apply across all organizational tiers and contractor operations.",
              "Incorrect. Both actions are mandatory components of structured quality and environmental management systems."
            ],
            "practicalTakeaway": "Always pair immediate problem correction with systemic preventive action to ensure long-term stability.",
            "learningOutcome": "Distinguish between corrective and preventive actions",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "Why is normalizing utility data against operational drivers essential during a quarterly performance review?",
            "options": [
              "To make the quarterly report appear longer for management presentations.",
              "To determine whether consumption changes reflect operational efficiency shifts rather than fluctuations in business volume or weather.",
              "To eliminate the need for monthly sub-meter calibration checks.",
              "To avoid having to pay electricity bills during high-demand months."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Data normalization (e.g. kWh per guest-night or m3 per production unit) isolates operational efficiency from business volume fluctuations.",
            "incorrectExplanation": "Normalization isolates operational performance from external production or weather drivers.",
            "optionFeedback": [
              "Incorrect. Normalization is an analytical necessity, not report padding.",
              "Correct! Normalizing against production or occupancy separates true operational performance from volume changes.",
              "Incorrect. Sub-meter calibration remains an essential technical maintenance task.",
              "Incorrect. Normalization does not change utility billing obligations."
            ],
            "practicalTakeaway": "Always evaluate resource metrics as intensities (per guest, per unit, per m2) rather than relying solely on raw totals.",
            "learningOutcome": "Apply data normalization in performance variance reviews",
            "competencyArea": "COMP_DATA_ANALYTICS"
          },
          {
            "question": "When applying the 5-Why root-cause methodology to an environmental incident, what indicates an incomplete investigation?",
            "options": [
              "The root cause points to an absence of training, poor visual SOPs, or lack of maintenance tooling.",
              "The final identified cause is simply 'operator carelessness' without analyzing system design, incentives, or procedures.",
              "The investigation involves multiple departmental representatives.",
              "The findings are documented in a formal written CAPA register."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Stopping at 'human error' fails to uncover the organizational, procedural, or environmental system flaws that allowed the mistake to occur.",
            "incorrectExplanation": "Attributing failures to 'carelessness' ignores the systemic and environmental factors that drive behavior.",
            "optionFeedback": [
              "Incorrect. Identifying training or SOP gaps represents a healthy systemic root-cause finding.",
              "Correct! Stopping at 'human error' leaves underlying system, design, and procedural flaws unaddressed.",
              "Incorrect. Cross-functional participation is a best practice in root-cause investigations.",
              "Incorrect. Written documentation in a CAPA register is a governance requirement."
            ],
            "practicalTakeaway": "Never accept 'human error' as the final root cause; always investigate the procedures, tooling, and system design.",
            "learningOutcome": "Execute 5-Why root-cause analysis effectively",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which criterion must be satisfied before a sustainability CAPA item can be officially closed?",
            "options": [
              "The assigned technician states verbally that they ordered the replacement part.",
              "A post-implementation effectiveness audit confirms that performance metrics have stabilized over a defined observation window (e.g., 60 days).",
              "The project deadline expires on the project tracking spreadsheet.",
              "The department manager moves the row to an archived folder without verification."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Formal CAPA standards require post-remediation evidence showing sustained performance improvements before closure.",
            "incorrectExplanation": "CAPA closure requires verified operational effectiveness, not verbal promises or calendar expiration.",
            "optionFeedback": [
              "Incorrect. Ordering parts does not verify that the operational failure has been permanently resolved.",
              "Correct! Verified metric stabilization over a defined observation period is mandatory for CAPA closure.",
              "Incorrect. Milestone expiration without verified resolution leaves non-conformances active.",
              "Incorrect. Archiving items without verification violates audit and quality standards."
            ],
            "practicalTakeaway": "Schedule mandatory 60-day effectiveness verification audits before closing any CAPA record.",
            "learningOutcome": "Verify CAPA effectiveness before formal closure",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "A hotel laundry facility discovers its steam boiler efficiency dropped by 18%. An Ishikawa (Fishbone) diagram is organized around which standard categories?",
            "options": [
              "Cost, Marketing, Sales, PR, and Legal.",
              "People, Process (Methods), Equipment (Machinery), Materials, and Environment (Measurement).",
              "Breakfast, Lunch, Dinner, Room Service, and Banqueting.",
              "Executive, Manager, Supervisor, Frontline, and Guest."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "The classical Ishikawa/Fishbone framework categorizes potential causes across People, Process/Methods, Equipment, Materials, Measurement, and Environment.",
            "incorrectExplanation": "The standard industrial Fishbone categories examine operational dimensions: People, Process, Machinery, Materials, and Environment.",
            "optionFeedback": [
              "Incorrect. Marketing and sales categories do not address mechanical boiler efficiency.",
              "Correct! People, Process, Equipment, Materials, and Environment are the standard 5M/Ishikawa investigation categories.",
              "Incorrect. Meal periods are operational food & beverage terms, not root-cause categories.",
              "Incorrect. Organizational hierarchy does not provide structural categorization for technical root causes."
            ],
            "practicalTakeaway": "Use Fishbone categories to ensure technical investigations explore both mechanical and behavioral causes.",
            "learningOutcome": "Apply Fishbone (Ishikawa) root-cause frameworks",
            "competencyArea": "COMP_DATA_ANALYTICS"
          },
          {
            "question": "What is the primary risk of closing performance review items without executive-level sign-off?",
            "options": [
              "Departmental managers will spend too much time speaking with senior executives.",
              "Chronic operational defects become normalized and re-emerge, leading to systemic compliance and cost failures.",
              "The company will automatically lose its business operating license immediately.",
              "Utility companies will refuse to supply electricity to the site."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Without executive oversight and formal verification, temporary workarounds become permanent bad habits, causing recurring defects.",
            "incorrectExplanation": "Lack of executive review leads to normalization of deviance and recurring operational failure.",
            "optionFeedback": [
              "Incorrect. Executive review enhances strategic alignment rather than wasting time.",
              "Correct! Unmonitored non-conformances lead to normalization of deviance and chronic operational failure.",
              "Incorrect. License revocation is an extreme legal sanction, not the direct operational consequence of unreviewed internal CAPAs.",
              "Incorrect. Utility suppliers continue grid supply as long as bills are paid."
            ],
            "practicalTakeaway": "Require executive steering committee review for all major non-conformances and CAPA closures.",
            "learningOutcome": "Establish executive governance over corrective actions",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "In a commercial building, an audit reveals that BMS heating and cooling setpoints are constantly overridden by tenant floor wardens. What is the most effective preventive action?",
            "options": [
              "Send an angry all-staff email threatening disciplinary action.",
              "Calibrate temperature deadbands (22–24°C), implement password-protected BMS software restrictions with 60-minute automatic timeout overrides, and run tenant comfort awareness sessions.",
              "Remove all air conditioning units from the office building entirely.",
              "Ignore the overrides because tenant comfort is the only metric that matters."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Effective preventive actions combine robust physical/software controls (deadbands, auto-timeouts) with occupant education.",
            "incorrectExplanation": "Combative emails and extreme hardware removals fail to address comfort needs; balanced technical controls with training succeed.",
            "optionFeedback": [
              "Incorrect. Confrontational emails create resentment without addressing occupant thermal comfort needs.",
              "Correct! Combining technical deadbands and timed software locks with tenant communication prevents persistent overrides.",
              "Incorrect. Removing HVAC systems destroys workplace productivity and tenant leasing agreements.",
              "Incorrect. Uncontrolled overrides cause severe energy waste and equipment premature wear."
            ],
            "practicalTakeaway": "Pair automated technical guardrails (auto-reset timers) with proactive occupant education.",
            "learningOutcome": "Design systemic technical and behavioral preventive solutions",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What should be the first deliverable completed during a 30-day performance review kickoff?",
            "options": [
              "Launch an international television marketing campaign on sustainability.",
              "Conduct a baseline variance audit on the facility's largest utility line, execute a 5-Why investigation on the top variance, and log a formal CAPA.",
              "Replace the entire facility maintenance workforce.",
              "Sign a multi-million dollar contract for unproven proprietary AI energy software."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "A disciplined 30-day start focuses on analyzing utility variance, conducting 5-Why root-cause analysis on key gaps, and establishing formal CAPAs.",
            "incorrectExplanation": "Pragmatic performance reviews start with thorough data audits and structured root-cause investigation.",
            "optionFeedback": [
              "Incorrect. Marketing campaigns do nothing to resolve internal operational performance gaps.",
              "Correct! Auditing key utility lines, identifying root causes, and issuing CAPAs establishes operational control.",
              "Incorrect. Discharging staff without process investigation destroys institutional knowledge.",
              "Incorrect. Expensive software cannot solve unmanaged operational discipline problems."
            ],
            "practicalTakeaway": "Focus your first month on data audits and structured root-cause problem solving for your largest utility cost center.",
            "learningOutcome": "Execute a 30-day corrective action roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 3. ELH-20: Sustainability Roles, Responsibilities and Accountability (D3)
      {
        "courseCode": "ELH-20",
        "title": "Sustainability Roles, Responsibilities and Accountability",
        "slug": "sustainability-roles-and-accountability",
        "description": "Master cross-functional sustainability governance, RACI matrix operationalization, departmental KPI integration, and accountability mechanisms across Mauritian enterprises.",
        "fullDescription": "Sustainability Roles, Responsibilities and Accountability equips organizational leaders, HR professionals, and departmental heads to embed sustainability accountability across every job level. Learn how to construct operational RACI matrices, integrate ESG targets into standard job descriptions and performance appraisal scorecards, define steering committee governance charters, and align organizational incentives to drive cross-functional environmental results.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_GOVERNANCE_ETHICS",
        "secondaryCompetencies": ["COMP_LEADERSHIP", "COMP_SOCIAL_COMMUNITY"],
        "learningObjectives": [
          "Construct and operationalize a cross-functional Sustainability RACI matrix across corporate departments.",
          "Embed measurable environmental KPIs into job descriptions and annual performance reviews.",
          "Draft an effective Executive Sustainability Steering Committee governance charter.",
          "Design organizational incentive and accountability structures that reward sustainable operational practices."
        ],
        "intendedRoles": ["HR Directors", "Department Managers", "Corporate Governance Officers", "Operations Leads"],
        "badgeName": "Sustainability Governance Lead",
        "badgeDescription": "Demonstrated competence in establishing organizational sustainability accountability, RACI frameworks, and performance governance.",
        "completionMessage": "Congratulations! You have completed Sustainability Roles, Responsibilities and Accountability and are empowered to build robust governance systems.",
        "recommendedNextCourseCode": "ELH-23",
        "lessons": [
          {
            "title": "1. The Distributed Governance Model & Accountability Gaps",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why standalone sustainability departments fail and how to distribute accountability across operational functions.",
            "contentBlocks": [
              { "id": "elh20-h1", "type": "heading", "level": 3, "text": "Beyond the Isolated Sustainability Department" },
              { "id": "elh20-t1", "type": "short_text", "position": 1, "bodyText": "When sustainability is treated as the sole responsibility of an isolated ESG officer, operational departments view green initiatives as optional external burdens. High-performing organizations utilize a distributed governance model where line managers own their environmental footprint: Procurement owns supply chain carbon; Facilities owns energy and water efficiency; Housekeeping and Kitchen own waste segregation; and HR owns green onboarding and training. The Sustainability Lead acts as an internal advisor and governance auditor, not the sole implementer." },
              { "id": "elh20-c1", "type": "callout", "variant": "info", "title": "Accountability Rule", "bodyText": "Operational leaders must own the emissions and waste generated by their respective departmental processes." }
            ]
          },
          {
            "title": "2. Operationalizing the RACI Matrix for Sustainability",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Defining Responsible, Accountable, Consulted, and Informed roles across environmental workflows.",
            "contentBlocks": [
              { "id": "elh20-h2", "type": "heading", "level": 3, "text": "Structuring Cross-Functional Responsibilities" },
              { "id": "elh20-t2", "type": "short_text", "position": 1, "bodyText": "A RACI matrix eliminates ambiguity in cross-departmental initiatives: (1) **Responsible (R)**: The person who executes the work; (2) **Accountable (A)**: The single individual with ultimate decision-making authority and veto power (strictly one 'A' per activity); (3) **Consulted (C)**: Subject matter experts whose input is mandatory prior to action; and (4) **Informed (I)**: Stakeholders updated on progress. Multiple Accountable leads create confusion and stall implementation." },
              { "id": "elh20-c2", "type": "callout", "variant": "tip", "title": "Single-Point Accountability Invariant", "bodyText": "There must be exactly ONE Accountable ('A') person for every sustainability deliverable. Shared accountability is no accountability." }
            ]
          },
          {
            "title": "3. Embedding Sustainability into Job Descriptions & Appraisals",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Translating ESG goals into concrete performance appraisal metrics and bonus scorecards.",
            "contentBlocks": [
              { "id": "elh20-h3", "type": "heading", "level": 3, "text": "Aligning Appraisals with Corporate ESG Commitments" },
              { "id": "elh20-t3", "type": "short_text", "position": 1, "bodyText": "If sustainability is omitted from annual performance appraisals, employees naturally prioritize tasks tied to their bonuses. Progressive organizations allocate 10% to 15% of annual management appraisal weighting to departmental sustainability KPIs (e.g., energy intensity reduction for chief engineers, supplier ESG audit coverage for procurement managers, and zero single-use plastics compliance for food and beverage leads). This aligns daily decision-making with strategic goals." },
              { "id": "elh20-c3", "type": "callout", "variant": "action", "title": "KPI Integration Policy", "bodyText": "Require all department managers to include at least two quantifiable sustainability metrics in their annual performance compacts." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Governance & Ownership Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Navigate cross-departmental friction and establish clear accountability boundaries.",
            "contentBlocks": [
              {
                "id": "elh20-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Resolving the Single-Use Plastics Elimination Stalemate",
                "prompt": "Your corporate group mandated 100% elimination of single-use plastic water bottles across hotel properties by Q3. The Food & Beverage Director claims Procurement failed to source glass bottles; Procurement claims Finance refused to approve the higher initial glass deposit; and Finance claims the Sustainability Officer never provided a business case. As Governance Lead, how do you resolve this stalemate?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Tell the Sustainability Officer to purchase and deliver the glass bottles themselves.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Forcing the sustainability officer to execute departmental procurement and logistics breaks operational ownership and creates an unsustainable precedent."
                  },
                  {
                    "id": "opt_b",
                    "text": "Convene the leaders, establish a clear RACI matrix (F&B Accountable for menu rollout, Procurement Responsible for vendor contracting, Finance Consulted on bottle deposit ROI, Sustainability Consulted on life-cycle specs), and track progress weekly under the GM's authority.",
                    "isCorrect": True,
                    "feedback": "Correct! Re-establishing single-point departmental accountability (F&B Accountable) and defining cross-functional RACI roles resolves finger-pointing and drives execution."
                  },
                  {
                    "id": "opt_c",
                    "text": "Postpone the plastic elimination mandate for three years.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Delaying statutory and public commitments damages corporate reputation and signals that ESG policies are optional."
                  },
                  {
                    "id": "opt_d",
                    "text": "Issue disciplinary warnings to all department managers without clarifying role definitions.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Punishment without clear structural role clarity breeds resentment and worsens operational gridlock."
                  }
                ]
              },
              {
                "id": "elh20-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Departmental Resistance to Energy Sub-Metering Ownership",
                "prompt": "Engineering installed sub-meters across Kitchen, Laundry, and Spa. The Laundry Manager refuses to review monthly energy variance reports, stating: 'I am a laundry operator, not an electrician. Engineering should manage all energy bills.' How do you address this resistance?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Agree with the Laundry Manager and remove energy accountability from operations.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Equipment operators control machine loading, operating hours, and cycle temperatures; removing ownership guarantees continued energy waste."
                  },
                  {
                    "id": "opt_b",
                    "text": "Collaborate with HR and Engineering to train the Laundry team on specific operational levers (full wash loads, wash temperature optimization, end-of-shift shutdown), and incorporate laundry energy intensity (kWh/kg linen) into the manager's quarterly KPI review.",
                    "isCorrect": True,
                    "feedback": "Correct! Empowering operators with actionable operational metrics (kWh/kg) and linking them to performance reviews establishes practical departmental ownership."
                  },
                  {
                    "id": "opt_c",
                    "text": "Lock all laundry machines remotely from the BMS without informing laundry staff.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Arbitrary remote shutoffs disrupt hotel linen supply, cause operational panic, and ruin team collaboration."
                  },
                  {
                    "id": "opt_d",
                    "text": "Hire external contractors to run all washing machines.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Outsourcing routine core operations creates immense unnecessary cost without fixing internal governance."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Steering Committee Charters & 30-Day Governance Rollout",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Drafting steering committee charters and executing your immediate 30-day governance plan.",
            "contentBlocks": [
              { "id": "elh20-h4", "type": "heading", "level": 3, "text": "Chartering the Steering Committee" },
              { "id": "elh20-t4", "type": "short_text", "position": 1, "bodyText": "A Sustainability Steering Committee requires a formal charter defining: (1) Executive Chairmanship (Managing Director or CEO); (2) Mandatory Membership (all Key Department Heads); (3) Meeting Cadence (Monthly, 60 minutes max); (4) Decision-Making Powers (approval of Capex up to defined limits and policy sign-offs); and (5) Quorum rules. Clear charters prevent committees from devolving into purposeless talk-shops." },
              { "id": "elh20-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Map a cross-functional RACI matrix for your facility's top 3 ESG initiatives; (2) Draft a formal Sustainability Steering Committee charter; and (3) Introduce 2 standardized sustainability KPIs into upcoming department management appraisals." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "In a distributed sustainability governance model, what is the primary role of the central Sustainability Lead / Officer?",
            "options": [
              "To perform all manual waste sorting, equipment maintenance, and purchasing tasks personally.",
              "To act as an internal strategic advisor, governance facilitator, and data auditor while operational departments own execution.",
              "To approve all daily company invoices and manage payroll.",
              "To replace the Human Resources department during employee hiring."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "The Sustainability Lead facilitates strategy, provides technical guidance, and verifies compliance, while operational departments retain accountability for their own footprints.",
            "incorrectExplanation": "Sustainability Leads provide strategic and audit oversight, enabling operational departments to execute.",
            "optionFeedback": [
              "Incorrect. Expecting the sustainability officer to execute all physical tasks across the company causes immediate failure.",
              "Correct! The sustainability lead facilitates governance and audits, while departmental managers execute within their workflows.",
              "Incorrect. Financial invoices and payroll remain under Finance and HR control.",
              "Incorrect. HR retains full responsibility for hiring and employee lifecycle management."
            ],
            "practicalTakeaway": "Position sustainability leaders as internal strategic advisors and auditors, not sole task executors.",
            "learningOutcome": "Define the role of central sustainability leadership in distributed governance",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "In a RACI matrix, what is the critical rule regarding the 'Accountable' (A) designation for any specific activity?",
            "options": [
              "Every team member on the project must be designated as Accountable.",
              "There must be exactly ONE Accountable person who holds ultimate decision-making authority and veto power.",
              "The Accountable role is reserved exclusively for external third-party auditors.",
              "Accountability is shared anonymously across the entire organization."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "A single Accountable owner prevents diffuse responsibility and ensures clear decision-making authority.",
            "incorrectExplanation": "Multiple or shared 'A' assignments lead to finger-pointing and stalled execution.",
            "optionFeedback": [
              "Incorrect. Designating everyone as accountable leads to diffuse responsibility where no one takes action.",
              "Correct! Exactly ONE individual must be Accountable for each specific activity to ensure clear ownership.",
              "Incorrect. Internal organizational leaders must be Accountable, not external auditors.",
              "Incorrect. Anonymous shared accountability guarantees lack of execution."
            ],
            "practicalTakeaway": "Assign strictly one 'Accountable' lead per deliverable on your project RACI matrix.",
            "learningOutcome": "Construct and apply RACI accountability rules",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why is incorporating sustainability KPIs into annual performance appraisals essential for cultural change?",
            "options": [
              "It satisfies social media public relations requirements.",
              "It formally aligns personal incentives and managerial evaluation with the company's strategic environmental commitments.",
              "It allows the company to reduce base employee salaries automatically.",
              "It eliminates the need for written standard operating procedures."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "When sustainability is formally tied to performance evaluations and bonuses, managers actively prioritize resource efficiency in daily operations.",
            "incorrectExplanation": "Performance appraisals directly drive operational priorities and managerial time allocation.",
            "optionFeedback": [
              "Incorrect. Internal performance appraisals are confidential HR mechanisms, not PR tools.",
              "Correct! Linking KPIs to appraisals aligns individual daily priorities with corporate ESG commitments.",
              "Incorrect. Appraisals evaluate performance and reward achievement, not reduce base pay.",
              "Incorrect. Clear SOPs remain essential operational documentation."
            ],
            "practicalTakeaway": "Embed 10-15% sustainability KPI weighting into management performance compacts.",
            "learningOutcome": "Embed sustainability KPIs into performance appraisals",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "Which of the following represents an effective operational KPI for a Procurement Manager?",
            "options": [
              "Total number of office emails sent per week.",
              "Percentage of active suppliers audited against ESG criteria and compliant with the Supplier Code of Conduct (e.g. >= 85%).",
              "Personal electricity consumption in the executive boardroom.",
              "Number of social media likes on corporate sustainability posts."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Auditing suppliers against ESG standards directly measures sustainable procurement execution within the manager's control.",
            "incorrectExplanation": "Effective KPIs measure direct departmental levers, such as supplier compliance rates.",
            "optionFeedback": [
              "Incorrect. Email counts provide zero indication of sustainable procurement performance.",
              "Correct! Supplier ESG audit coverage directly measures sustainable supply chain governance.",
              "Incorrect. Boardroom electricity is controlled by Facilities and executive occupants, not Procurement.",
              "Incorrect. Social media engagement is a Marketing metric outside Procurement's operational scope."
            ],
            "practicalTakeaway": "Assign departmental managers KPIs directly tied to the operational levers they control.",
            "learningOutcome": "Formulate role-specific departmental sustainability KPIs",
            "competencyArea": "COMP_SUPPLY_CHAIN"
          },
          {
            "question": "What is a mandatory requirement for an effective Executive Sustainability Steering Committee charter?",
            "options": [
              "Meeting once every five years for an informal dinner.",
              "Chaired by executive leadership (CEO/MD), mandatory department head attendance, clear decision-making authority, and documented action minutes.",
              "Excluding all operational and engineering department managers from discussions.",
              "Allowing any attendee to cancel meetings without notice."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Executive steering committees require executive chairing, cross-functional department head presence, and decision-making authority to drive policy.",
            "incorrectExplanation": "Effective governance requires top executive leadership, structured cadence, and cross-functional representation.",
            "optionFeedback": [
              "Incorrect. A 5-year meeting cadence completely undermines operational governance.",
              "Correct! Executive sponsorship, cross-functional attendance, and decision authority ensure productive committee governance.",
              "Incorrect. Excluding operations and engineering removes the key teams responsible for resource consumption.",
              "Incorrect. Structured governance requires strict attendance quorum rules and committed schedules."
            ],
            "practicalTakeaway": "Ensure your steering committee is chaired by the CEO or Managing Director and meets monthly.",
            "learningOutcome": "Structure executive sustainability steering committee charters",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "When developing a RACI matrix for kitchen waste sorting, who is most appropriately designated as 'Accountable' (A)?",
            "options": [
              "The local municipal garbage truck driver.",
              "The Executive Chef / Food & Beverage Director.",
              "The external corporate graphic designer who designed the posters.",
              "The newest apprentice dishwasher on their first shift."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "The Executive Chef / F&B Director leads kitchen operations and holds the authority to enforce sorting standards across kitchen teams.",
            "incorrectExplanation": "Accountability must sit with the senior departmental leader who controls kitchen operations, staffing, and workflows.",
            "optionFeedback": [
              "Incorrect. External waste collectors provide transport services but do not control kitchen operations.",
              "Correct! The Executive Chef / F&B Director controls kitchen operations and holds ultimate accountability for sorting purity.",
              "Incorrect. Graphic designers provide visual collateral but have zero operational authority.",
              "Incorrect. Junior staff execute tasks (Responsible) but do not hold executive accountability."
            ],
            "practicalTakeaway": "Place the 'Accountable' designation with the departmental head who controls budgets and operational workflows.",
            "learningOutcome": "Assign operational RACI accountability accurately",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "How can Human Resources best support sustainability governance during employee onboarding?",
            "options": [
              "By printing 500-page paper employee manuals and handing them out without explanation.",
              "By integrating workplace sustainability policies, waste segregation protocols, and energy conservation standards into mandatory new-hire induction.",
              "By asking new hires to sign an agreement promising never to mention environmental issues at work.",
              "By omitting all environmental content to save 15 minutes of orientation time."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Embedding green practices into induction establishes positive sustainability habits and cultural expectations from an employee's first day.",
            "incorrectExplanation": "HR operationalizes sustainability culture by educating new hires on environmental policies from day one.",
            "optionFeedback": [
              "Incorrect. Massive unread paper manuals contradict sustainability principles.",
              "Correct! Mandatory green onboarding embeds organizational eco-standards and habits from day one.",
              "Incorrect. Silencing employees suppresses innovation and destroys sustainability culture.",
              "Incorrect. Omitting green induction signals to new hires that sustainability is unimportant."
            ],
            "practicalTakeaway": "Make sustainability standards and waste sorting practices a mandatory module in new employee induction.",
            "learningOutcome": "Integrate sustainability into HR onboarding and culture",
            "competencyArea": "COMP_SOCIAL_COMMUNITY"
          },
          {
            "question": "Which action should be executed within 30 days of completing a governance review?",
            "options": [
              "Wait until the next decade to review corporate governance documents.",
              "Map a cross-functional RACI matrix for top ESG initiatives, draft a Steering Committee charter, and introduce 2 sustainability KPIs into manager appraisals.",
              "Abolish all job descriptions and performance review systems.",
              "Issue public press releases claiming complete ESG perfection."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The 30-day kickoff focuses on establishing RACI matrices, drafting committee charters, and embedding KPIs into management appraisals.",
            "incorrectExplanation": "Pragmatic governance implementation starts with clear RACI mapping and appraisal KPI integration.",
            "optionFeedback": [
              "Incorrect. Governance requires immediate, active implementation rather than multi-year delays.",
              "Correct! RACI mapping, charter drafting, and appraisal KPI integration establish immediate operational governance.",
              "Incorrect. Eliminating job descriptions creates organizational chaos.",
              "Incorrect. Public claims without verified governance structures constitute greenwashing."
            ],
            "practicalTakeaway": "Implement RACI clarity and manager appraisal KPIs within 30 days to build immediate operational momentum.",
            "learningOutcome": "Implement a 30-day sustainability governance roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 4. ELH-23: Planning and Delivering Workplace Sustainability Initiatives (D3)
      {
        "courseCode": "ELH-23",
        "title": "Planning and Delivering Workplace Sustainability Initiatives",
        "slug": "planning-and-delivering-sustainability-initiatives",
        "description": "Master end-to-end workplace sustainability project management, stakeholder engagement, capital budgeting, risk mitigation, and launch execution in commercial facilities.",
        "fullDescription": "Planning and Delivering Workplace Sustainability Initiatives equips operational champions, facility leads, and project managers to successfully deliver high-impact green workplace projects on time and within budget. Learn how to formulate robust project charters, calculate Net Present Value (NPV) and simple payback periods, manage operational disruption during retrofits, run cross-departmental pilot tests, and execute communication campaigns that drive lasting employee adoption.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_LEADERSHIP",
        "secondaryCompetencies": ["COMP_STRATEGY", "COMP_SOCIAL_COMMUNITY"],
        "learningObjectives": [
          "Develop comprehensive project charters with clear scope boundaries and ROI metrics.",
          "Calculate financial metrics including Simple Payback, Net Present Value (NPV), and Internal Rate of Return (IRR) for green Capex proposals.",
          "Design and execute 30-day pilot trials to validate operational feasibility before full rollout.",
          "Manage change resistance and operational disruptions during physical facility retrofits."
        ],
        "intendedRoles": ["Sustainability Champions", "Project Managers", "Facility Supervisors", "Operations Leads"],
        "badgeName": "Workplace Project Delivery Specialist",
        "badgeDescription": "Demonstrated competence in planning, financially justifying, and executing workplace sustainability initiatives.",
        "completionMessage": "Congratulations! You have completed Planning and Delivering Workplace Sustainability Initiatives and are prepared to lead successful green projects.",
        "recommendedNextCourseCode": "ELH-35",
        "lessons": [
          {
            "title": "1. Project Initiation & The Business Case Charter",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Formulating bulletproof project charters that secure executive and financial approval.",
            "contentBlocks": [
              { "id": "elh23-h1", "type": "heading", "level": 3, "text": "Securing Executive Buy-In with Robust Charters" },
              { "id": "elh23-t1", "type": "short_text", "position": 1, "bodyText": "Sustainability initiatives often stall in finance committees because proposals emphasize broad environmental slogans rather than quantifiable financial and operational returns. A robust Project Charter defines: (1) Problem Statement & Baseline Metric; (2) Proposed Engineering/Operational Solution; (3) Capital Expenditure (Capex) and Operational Expenditure (Opex) requirements; (4) Financial Returns (Payback period, IRR, NPV); and (5) Non-financial co-benefits (guest satisfaction, brand equity, employee retention, regulatory de-risking)." },
              { "id": "elh23-c1", "type": "callout", "variant": "info", "title": "Charter Standard", "bodyText": "Every capital sustainability proposal must include a formal financial appraisal alongside environmental carbon and waste savings." }
            ]
          },
          {
            "title": "2. Financial Appraisal: Payback, NPV & Life-Cycle Costing",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Calculating Simple Payback, Net Present Value (NPV), and Life-Cycle Costing (LCC) for green investments.",
            "contentBlocks": [
              { "id": "elh23-h2", "type": "heading", "level": 3, "text": "Proving Financial Viability to CFOs" },
              { "id": "elh23-t2", "type": "short_text", "position": 1, "bodyText": "CFOs evaluate capital allocation across competing business priorities. Use three core financial metrics: (1) **Simple Payback Period** (Initial Investment divided by Annual Net Savings); (2) **Net Present Value (NPV)** (Discounted future cash flows minus initial investment, using corporate hurdle discount rates); and (3) **Life-Cycle Costing (LCC)** (Accounting for purchase price, annual energy/water costs, maintenance, and disposal costs over the equipment lifespan). Often, an energy-efficient asset with a 15% higher initial cost delivers a 50% lower total life-cycle cost." },
              { "id": "elh23-c2", "type": "callout", "variant": "tip", "title": "Life-Cycle Rule", "bodyText": "Over a 10-year lifespan, 80% to 90% of a motor or chiller's total cost is electricity, not the purchase price. Always present life-cycle savings." }
            ]
          },
          {
            "title": "3. Piloting, Risk Management & Phased Rollouts",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "De-risking large-scale rollouts through controlled pilot testing and risk mitigation.",
            "contentBlocks": [
              { "id": "elh23-h3", "type": "heading", "level": 3, "text": "De-Risking Capital Projects through Pilot Testing" },
              { "id": "elh23-t3", "type": "short_text", "position": 1, "bodyText": "Never roll out an unproven operational change across an entire multi-building facility simultaneously. Conduct a 30-day pilot in a controlled, representative zone (e.g. retrofitting smart guest room controls in 10 rooms or testing bio-degradable cleaning chemicals in one office wing). Measure user feedback, unexpected operational friction, and actual energy/water savings during the pilot before committing 100% of capital." },
              { "id": "elh23-c3", "type": "callout", "variant": "action", "title": "Pilot Protocol", "bodyText": "Document quantitative pilot performance criteria in advance; expand to full rollout only when pilot success metrics are verified." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Project Delivery Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Navigate budget cuts, vendor slippage, and operational resistance during project execution.",
            "contentBlocks": [
              {
                "id": "elh23-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Defending Green Capex during Budget Cuts",
                "prompt": "You proposed a Rs 1,200,000 investment in a Variable Refrigerant Flow (VRF) heat recovery system for your hotel laundry and kitchen hot water, delivering Rs 480,000 annual electricity savings (Payback: 2.5 years, NPV: Rs 1,850,000). Due to mid-year financial tightening, the Finance Director proposes slashing all sustainability projects. How do you defend the project?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Accept the cancellation and cancel all engineering work.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Passive acceptance leaves high-yield energy savings uncaptured and locks in ongoing utility cash burn."
                  },
                  {
                    "id": "opt_b",
                    "text": "Present the financial Life-Cycle Cost analysis showing that cancelling the project commits the company to wasting Rs 480,000 every year in electricity bills, and propose an Energy Performance Contracting (EPC) or equipment leasing model requiring zero upfront Capex.",
                    "isCorrect": True,
                    "feedback": "Correct! Demonstrating the financial cost of inaction (loss of Rs 480k/yr) and offering zero-Capex financing structures (like EPC leasing) resolves executive cash constraints while securing savings."
                  },
                  {
                    "id": "opt_c",
                    "text": "Threaten to report the CFO on social media for greenwashing.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Public confrontation destroys internal credibility, violates professional ethics, and guarantees career termination."
                  },
                  {
                    "id": "opt_d",
                    "text": "Purchase substandard secondhand equipment without engineering approvals.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Installing unapproved or substandard equipment creates immense safety, fire, and reliability hazards."
                  }
                ]
              },
              {
                "id": "elh23-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Managing Staff Resistance to Food Waste Weighing",
                "prompt": "You are rolling out a smart food waste tracking scale in the main kitchen. Kitchen cooks complain that weighing preparation waste and plate scrapings takes too much time during peak dinner service and refuse to use the system. How do you ensure project adoption?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Station security guards in the kitchen to force cooks to weigh every scrap.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Policing creates intense hostility, kitchen slowdowns, and deliberate data sabotage."
                  },
                  {
                    "id": "opt_b",
                    "text": "Work with the Head Chef to optimize scale placement next to existing scrap stations, integrate weighing into natural plating workflows (taking < 5 seconds per bin), run shift champion competitions, and share cost-savings data showing how food waste reductions fund new culinary equipment.",
                    "isCorrect": True,
                    "feedback": "Correct! Removing physical workflow friction, engaging culinary leadership, and linking savings to tangible team benefits secures lasting behavioral adoption."
                  },
                  {
                    "id": "opt_c",
                    "text": "Remove the food waste scale and allow unmonitored food disposal.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Abandoning tracking forfeits the 20-30% food cost savings achievable through kitchen waste analytics."
                  },
                  {
                    "id": "opt_d",
                    "text": "Fill out fake food waste numbers yourself from your office desk.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Fabricating compliance data is a fraudulent practice that destroys data integrity."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Project Handover & 30-Day Project Launch Blueprint",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Ensuring operational handover, preventive maintenance contracts, and executing your 30-day launch.",
            "contentBlocks": [
              { "id": "elh23-h4", "type": "heading", "level": 3, "text": "Executing Seamless Handover to Operations" },
              { "id": "elh23-t4", "type": "short_text", "position": 1, "bodyText": "A project is not complete upon equipment installation. Sustainable handover requires: (1) Standard Operating Procedures (SOPs) written in accessible language; (2) Hands-on training for all shift technicians; (3) Preventive Maintenance (PM) service contracts and spare parts catalogs; and (4) Establishing routine telemetry monitoring to ensure energy savings persist over the asset's full 15-year lifecycle." },
              { "id": "elh23-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Select a high-potential green project in your workplace; (2) Draft a complete Project Charter with Payback and NPV calculations; and (3) Design a 30-day pilot trial plan before full capital commitment." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the formula for calculating the Simple Payback Period of an energy-saving capital investment?",
            "options": [
              "Annual Carbon Savings divided by Total Project Hours.",
              "Initial Capital Investment divided by Annual Net Operating Cost Savings.",
              "Total Company Revenue divided by Equipment Weight in kilograms.",
              "Number of Employees multiplied by Electricity Tariff."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Simple Payback Period equals the initial upfront investment divided by the annual net cost savings generated by the project.",
            "incorrectExplanation": "Payback period measures financial capital recovery: Initial Investment / Annual Net Savings.",
            "optionFeedback": [
              "Incorrect. Carbon savings per hour does not compute financial return.",
              "Correct! Initial Capital Investment / Annual Net Savings gives the Simple Payback Period in years.",
              "Incorrect. Revenue and equipment weight are irrelevant to payback calculations.",
              "Incorrect. Employee counts do not define project capital recovery."
            ],
            "practicalTakeaway": "Use Simple Payback as an initial screening metric, followed by Net Present Value for detailed capital appraisal.",
            "learningOutcome": "Calculate simple payback periods for sustainability projects",
            "competencyArea": "COMP_STRATEGY"
          },
          {
            "question": "Why is Life-Cycle Costing (LCC) a superior evaluation tool compared to evaluating purchase price alone for industrial motors and chillers?",
            "options": [
              "Because purchase price is the only cost that accountants ever record.",
              "Because electricity and operational maintenance account for 80% to 90% of the total cost over the equipment lifespan, dwarfing initial purchase price.",
              "Because LCC makes all equipment look completely free of charge.",
              "Because manufacturers offer 100-year warranties on all commercial equipment."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Operating energy costs over 10-15 years represent the vast majority of an asset's total financial footprint, making energy efficiency far more valuable than cheap initial purchase prices.",
            "incorrectExplanation": "Operating electricity and maintenance over an asset's lifetime far exceed initial procurement costs.",
            "optionFeedback": [
              "Incorrect. Accounting standards track both capital and operating expenses.",
              "Correct! Operating electricity costs dominate total lifecycle expenses, making energy efficiency the primary driver of value.",
              "Incorrect. Life-cycle costing provides realistic total accounting, not free equipment.",
              "Incorrect. Commercial warranties typically range from 1 to 5 years."
            ],
            "practicalTakeaway": "Always present Life-Cycle Costing to demonstrate why higher-efficiency equipment saves money over its operating life.",
            "learningOutcome": "Apply Life-Cycle Costing in equipment procurement",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is the primary objective of running a 30-day pilot test prior to facility-wide rollout?",
            "options": [
              "To delay project implementation indefinitely until senior management leaves.",
              "To validate operational performance, uncover unexpected user friction, and verify actual savings in a controlled zone before committing full capital.",
              "To allow contractors to practice without any performance accountability.",
              "To create promotional videos before any physical work begins."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Pilot testing de-risks large investments by validating technical performance and addressing workflow issues in a controlled setting.",
            "incorrectExplanation": "Pilots test assumptions, refine workflows, and verify quantitative savings before full-scale investment.",
            "optionFeedback": [
              "Incorrect. Pilots are proactive de-risking mechanisms, not delay tactics.",
              "Correct! Pilot trials validate actual savings and identify operational friction before broad capital commitment.",
              "Incorrect. Contractors must adhere to strict performance standards during pilot phases.",
              "Incorrect. Pilots test physical engineering and user behavior, not promotional marketing."
            ],
            "practicalTakeaway": "Always test green initiatives in a single department or zone to refine SOPs before company-wide rollout.",
            "learningOutcome": "Design and evaluate pilot trials for sustainability projects",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "If a proposed heat recovery project has an initial cost of Rs 600,000 and generates Rs 200,000 in net annual energy savings, what is its Simple Payback Period?",
            "options": [
              "0.5 years (6 months)",
              "3.0 years",
              "6.0 years",
              "12.0 years"
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Payback = Rs 600,000 / Rs 200,000 per year = 3.0 years.",
            "incorrectExplanation": "Rs 600,000 divided by Rs 200,000/year equals exactly 3.0 years.",
            "optionFeedback": [
              "Incorrect. 0.5 years would require Rs 1,200,000 annual savings.",
              "Correct! Rs 600,000 / Rs 200,000 = 3.0 years Simple Payback.",
              "Incorrect. 6.0 years would result from only Rs 100,000 annual savings.",
              "Incorrect. 12.0 years is mathematically incorrect."
            ],
            "practicalTakeaway": "Quickly calculate payback periods to screen high-yield energy projects for executive review.",
            "learningOutcome": "Perform payback calculations for capital investments",
            "competencyArea": "COMP_STRATEGY"
          },
          {
            "question": "What is an Energy Performance Contract (EPC) and how does it help overcome internal capital budget constraints?",
            "options": [
              "An agreement where the company gives away free electricity to neighbors.",
              "A financing model where an Energy Service Company (ESCO) designs and funds energy retrofits, with costs paid back from guaranteed energy savings over time.",
              "A government fine imposed on facilities that consume diesel fuel.",
              "An insurance policy that pays out only during cyclonic damage."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "EPC contracts allow companies to implement energy-saving hardware with zero upfront capital, paying the vendor from guaranteed utility bill reductions.",
            "incorrectExplanation": "Energy Performance Contracting uses guaranteed utility cost savings to finance capital energy equipment.",
            "optionFeedback": [
              "Incorrect. EPC is a technical financing structure, not power distribution charity.",
              "Correct! EPCs allow zero-upfront capital retrofits financed entirely by guaranteed utility cost reductions.",
              "Incorrect. EPC is an investment financing mechanism, not a regulatory penalty.",
              "Incorrect. EPC is not property insurance."
            ],
            "practicalTakeaway": "Propose Energy Performance Contracting when executive capital budgets are constrained.",
            "learningOutcome": "Utilize alternative financing mechanisms such as EPCs",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "When operational staff resist a new green initiative due to perceived extra workload, what is the most effective leadership approach?",
            "options": [
              "Issue formal reprimands to everyone who raises concerns.",
              "Optimize the physical workflow to minimize friction, provide hands-on coaching, and demonstrate how savings benefit the team's operational resources.",
              "Cancel the project immediately to avoid management friction.",
              "Ignore staff feedback and assume they will eventually get used to it."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Reducing physical friction, coaching staff, and sharing positive operational impacts builds genuine employee ownership.",
            "incorrectExplanation": "Effective change management eliminates physical friction and engages staff rather than relying on penalties or surrender.",
            "optionFeedback": [
              "Incorrect. Reprimands breed resentment and deliberate procedural avoidance.",
              "Correct! Streamlining workflows, coaching, and connecting savings to team benefits drives sustainable adoption.",
              "Incorrect. Abandoning initiatives forfeits financial and environmental gains.",
              "Incorrect. Ignoring feedback leads to passive non-compliance and project failure."
            ],
            "practicalTakeaway": "Design green workflows that integrate seamlessly into existing tasks without creating administrative friction.",
            "learningOutcome": "Lead change management and overcome operational resistance",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What essential documentation must be completed before handing an upgraded mechanical system over to facility operations?",
            "options": [
              "A promotional glossy brochure for hotel guests.",
              "Operating SOPs, technician training logs, preventive maintenance contracts, and calibrated baseline telemetry monitoring.",
              "A verbal handshake with the installation contractor.",
              "A signed NDA forbidding staff from discussing machine settings."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Complete operational handover requires documented SOPs, trained technical staff, ongoing maintenance contracts, and telemetry monitoring.",
            "incorrectExplanation": "Handover requires formal technical documentation, staff training, and maintenance contracts.",
            "optionFeedback": [
              "Incorrect. Guest brochures do not provide engineering operating documentation.",
              "Correct! SOPs, technician training, service contracts, and telemetry ensure sustained operational efficiency.",
              "Incorrect. Handshakes provide zero technical or legal handover protection.",
              "Incorrect. Secrecy agreements prevent technicians from operating equipment effectively."
            ],
            "practicalTakeaway": "Never sign off on project completion until full operational SOPs and technician training are complete.",
            "learningOutcome": "Execute operational handover and maintenance governance",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "Which action should be prioritized within 30 days of initiating a workplace sustainability project?",
            "options": [
              "Install unvetted machinery across the entire site without baseline measurements.",
              "Formulate a complete Project Charter with ROI metrics and design a controlled 30-day pilot test.",
              "Apply for international green building awards before completing any physical work.",
              "Fire all maintenance contractors without replacement."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The first 30 days must focus on establishing the business charter, calculating financial payback, and planning a controlled pilot.",
            "incorrectExplanation": "Early project phases require rigorous chartering and controlled pilot design before full rollout.",
            "optionFeedback": [
              "Incorrect. Unvetted full installations create high financial and operational failure risks.",
              "Correct! Project charters with financial justification and structured pilot plans ensure successful execution.",
              "Incorrect. Applying for awards prior to project execution is premature and misleading.",
              "Incorrect. Terminating maintenance staff destroys operational continuity."
            ],
            "practicalTakeaway": "Build a solid foundation with financial charters and pilot test plans during your first month.",
            "learningOutcome": "Execute a 30-day project initiation roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 5. ELH-35: Sustainable Housekeeping Operations (D3)
      {
        "courseCode": "ELH-35",
        "title": "Sustainable Housekeeping Operations",
        "slug": "sustainable-housekeeping-operations",
        "description": "Master sustainable housekeeping systems, chemical-free micro-fiber cleaning, laundry thermal-wash optimization, towel reuse governance, and room resource conservation in resorts.",
        "fullDescription": "Sustainable Housekeeping Operations equips housekeeping managers, floor supervisors, and resort operational leads to implement high-purity sustainable housekeeping standards. Learn how to eliminate hazardous cleaning chemicals through eco-certified closed-loop dispensers, optimize laundry wash temperatures and load ratios, audit and enforce towel/linen reuse programs without compromising 5-star guest satisfaction, reduce guest room single-use plastics, and establish ergonomic room cleaning routines.",
        "categoryId": 2,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_WATER",
        "secondaryCompetencies": ["COMP_CIRCULARITY", "COMP_ENERGY"],
        "learningObjectives": [
          "Implement eco-certified, concentrated cleaning chemical dilution systems with zero single-use plastic bottles.",
          "Optimize hotel laundry wash cycle temperatures (reducing from 70°C to 40°C where bio-safe) and load capacities.",
          "Audit, track, and elevate guest participation in voluntary towel and linen reuse programs.",
          "Eliminate single-use plastic amenities across guest rooms, turndown services, and housekeeping carts."
        ],
        "intendedRoles": ["Executive Housekeepers", "Floor Supervisors", "Room Attendants", "Resort Operations Managers"],
        "badgeName": "Sustainable Housekeeping Lead",
        "badgeDescription": "Demonstrated competence in leading eco-housekeeping operations, laundry energy reduction, and single-use plastic elimination.",
        "completionMessage": "Congratulations! You have completed Sustainable Housekeeping Operations and are prepared to lead eco-efficient resort operations.",
        "recommendedNextCourseCode": "ELH-36",
        "lessons": [
          {
            "title": "1. Housekeeping Environmental Footprint & Chemical Systems",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Analyzing housekeeping resource flows and transitioning to safe, concentrated chemical dilution systems.",
            "contentBlocks": [
              { "id": "elh35-h1", "type": "heading", "level": 3, "text": "Eliminating Hazardous Cleaning Chemicals & Plastic Waste" },
              { "id": "elh35-t1", "type": "short_text", "position": 1, "bodyText": "Standard housekeeping operations consume massive quantities of synthetic chemicals, water, and ready-to-use plastic spray bottles. Transitioning to wall-mounted automated chemical dilution systems using EU Ecolabel or Green Seal certified concentrated formulas reduces plastic packaging waste by up to 95%, eliminates chemical over-dosing, and protects room attendants from hazardous volatile organic compounds (VOCs). Pair this with color-coded microfiber cloths to eliminate disposable paper towels." },
              { "id": "elh35-c1", "type": "callout", "variant": "info", "title": "Chemical Dilution Standard", "bodyText": "Never permit manual free-pour chemical mixing. Automated dilution dispensers guarantee safety, correct sanitization strength, and cost control." }
            ]
          },
          {
            "title": "2. Laundry Energy & Water Optimization",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Calibrating wash temperatures, water recycling, and extraction speeds in commercial resort laundries.",
            "contentBlocks": [
              { "id": "elh35-h2", "type": "heading", "level": 3, "text": "Optimizing Commercial Laundry Thermal Cycles" },
              { "id": "elh35-t2", "type": "short_text", "position": 1, "bodyText": "Commercial laundry is one of a resort's most energy- and water-intensive departments. Operating washing machines with enzymatic low-temperature detergents allows wash cycles to drop from 70°C to 40°C while achieving full sanitization compliance under international hospitality hygiene standards. Furthermore, ensuring washing machines operate strictly at 85% to 90% rated load capacity prevents half-empty wash cycles that waste thousands of liters of treated water daily." },
              { "id": "elh35-c2", "type": "callout", "variant": "tip", "title": "Thermal Laundry Rule", "bodyText": "Every 10°C reduction in wash water temperature cuts laundry thermal heating energy consumption by approximately 25%." }
            ]
          },
          {
            "title": "3. Guest Room Amenities, Towel Programs & Plastics Elimination",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Managing bulk dispenser systems, guest engagement, and zero-plastic housekeeping carts.",
            "contentBlocks": [
              { "id": "elh35-h3", "type": "heading", "level": 3, "text": "Transforming the Guest Room Footprint" },
              { "id": "elh35-t3", "type": "short_text", "position": 1, "bodyText": "Replacing individual 30ml miniature plastic shampoo and lotion bottles with tamper-proof, wall-mounted bulk dispensers eliminates hundreds of thousands of plastic bottles annually per resort. Additionally, voluntary towel and linen reuse programs succeed when room attendants are trained to respect guest signals (e.g. only replacing towels left in the bathtub or floor, leaving hanging towels untouched) and when housekeeping carts are audited to eliminate plastic laundry bags and disposable bin liners." },
              { "id": "elh35-c3", "type": "callout", "variant": "action", "title": "Linen Program Integrity", "bodyText": "Conduct weekly floor audits to verify that room attendants are not changing linen prematurely when guests have requested reuse." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Housekeeping Trade-Offs",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate operational quality, hygiene, and environmental trade-offs in resort housekeeping.",
            "contentBlocks": [
              {
                "id": "elh35-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Resolving Guest Complaints on Bulk Amenities",
                "prompt": "Your resort replaced individual miniature toiletries with luxury ceramic wall-mounted bulk dispensers in all 150 guest bathrooms. A VIP guest complains to the Front Desk that bulk dispensers feel 'less exclusive' and demands individual plastic bottles. How does the Executive Housekeeper handle this situation?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Immediately revert the entire resort back to single-use miniature plastic bottles.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Reverting the entire property forfeits significant environmental savings and violates corporate ESG commitments based on a single comment."
                  },
                  {
                    "id": "opt_b",
                    "text": "Have guest relations explain the resort's marine conservation commitment, highlight the bespoke local organic ingredients in the tamper-proof dispensers, and offer a complimentary reusable amenity gift set from a local artisan.",
                    "isCorrect": True,
                    "feedback": "Correct! Re-framing bulk dispensers around luxury conservation, product purity, and local authenticity resolves guest concerns without abandoning sustainable standards."
                  },
                  {
                    "id": "opt_c",
                    "text": "Ignore the guest and refuse to respond to their feedback.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Ignoring guest feedback damages hospitality review scores and creates customer dissatisfaction."
                  },
                  {
                    "id": "opt_d",
                    "text": "Blame the corporate sustainability team during guest conversations.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Publicly disparaging internal policies undermines resort brand integrity."
                  }
                ]
              },
              {
                "id": "elh35-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Overcoming Low Linen Reuse Compliance",
                "prompt": "An internal audit reveals that despite 65% of resort guests hanging their towels for reuse, room attendants are replacing 95% of all towels daily during morning room makeovers. Attendants state: 'We are afraid guests will give us bad ratings if towels are not brand new.' How do you correct this operational disconnect?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Deduct money from room attendants' paychecks whenever they replace a hanging towel.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Financial penalties create intense anxiety and fail to address the root fear of guest rating retaliation."
                  },
                  {
                    "id": "opt_b",
                    "text": "Update Housekeeping SOPs with clear visual card standards, run shift training explaining the water savings, align management rating policies so attendants are protected when following guest preferences, and recognize top eco-compliant teams monthly.",
                    "isCorrect": True,
                    "feedback": "Correct! Aligning SOPs, reassuring staff through management policy, and providing positive recognition directly fixes the behavioral driver."
                  },
                  {
                    "id": "opt_c",
                    "text": "Cancel the towel reuse program entirely.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Cancelling the program causes severe unnecessary water, energy, and detergent waste in the laundry."
                  },
                  {
                    "id": "opt_d",
                    "text": "Remove all clean replacement towels from housekeeping carts.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Depriving attendants of clean towels prevents them from replacing legitimately soiled linen, causing guest dissatisfaction."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Housekeeping Governance & 30-Day Eco-Housekeeping Action Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Establishing daily floor audit checklists and executing your 30-day sustainable housekeeping plan.",
            "contentBlocks": [
              { "id": "elh35-h4", "type": "heading", "level": 3, "text": "Institutionalizing Floor Audit Checklists" },
              { "id": "elh35-t4", "type": "short_text", "position": 1, "bodyText": "Daily housekeeping shift huddles and supervisor room spot-checks are where sustainability standards live. Include 4 standard checkpoints on every supervisor inspection sheet: (1) Bulk dispenser cleanliness and seal integrity; (2) Towel reuse alignment with guest placement; (3) Air conditioner thermostat reset to eco-mode (24°C) with curtains drawn during vacant hours; and (4) Proper waste and recyclable sorting in cart compartments." },
              { "id": "elh35-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Audit housekeeping chemical dispensers and eliminate ready-to-use spray bottles; (2) Verify laundry wash temperatures with chief engineering; and (3) Train all room attendants on standardized towel and linen reuse protocols." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary operational and environmental benefit of installing automated chemical dilution dispensers in housekeeping pantries?",
            "options": [
              "It eliminates the need for housekeeping staff to clean guest bathrooms.",
              "It reduces single-use plastic packaging by up to 95%, prevents chemical overdosing, and protects attendants from hazardous VOC exposure.",
              "It increases the total volume of chemical concentrate used by 300%.",
              "It allows housekeeping to mix bleach and ammonia together freely."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Automated dilution dispensers eliminate single-use plastic bottles, prevent costly chemical overdosing, and protect workers from hazardous vapors.",
            "incorrectExplanation": "Automated dilution systems provide precise dosage control, plastic reduction, and occupational safety.",
            "optionFeedback": [
              "Incorrect. Housekeeping staff still perform room cleaning; dispensers supply the cleaning solutions.",
              "Correct! Automated dilution cuts plastic waste, prevents overdosing, and enhances worker safety.",
              "Incorrect. Dispensers optimize and reduce total chemical concentrate consumption.",
              "Incorrect. Mixing bleach and ammonia creates lethal chloramine gas and is strictly prohibited."
            ],
            "practicalTakeaway": "Use closed-loop automated dilution dispensers to eliminate chemical waste and single-use plastic spray bottles.",
            "learningOutcome": "Implement sustainable housekeeping chemical management",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "How does lowering resort laundry wash temperatures from 70°C to 40°C (using bio-enzymatic detergents) affect energy consumption?",
            "options": [
              "It increases boiler electricity consumption by 50%.",
              "It reduces thermal water heating energy by approximately 50–60% while maintaining full sanitization standards.",
              "It has zero effect on thermal energy consumption.",
              "It permanently damages industrial washing machines."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Water heating constitutes the vast majority of laundry energy; lowering wash temperatures by 30°C cuts thermal heating energy by over 50%.",
            "incorrectExplanation": "Heating water is the primary energy driver in laundry; low-temperature enzymatic washing delivers massive thermal energy savings.",
            "optionFeedback": [
              "Incorrect. Lowering wash water temperature decreases energy demand, not increases it.",
              "Correct! Low-temperature wash cycles cut thermal heating energy by 50-60% while preserving hygienic sanitization.",
              "Incorrect. Heating water requires significant energy; temperature drops directly reduce fuel/electricity use.",
              "Incorrect. Modern washing machines are designed to run low-temperature wash cycles smoothly."
            ],
            "practicalTakeaway": "Switch to enzymatic low-temperature laundry wash cycles to cut thermal water heating costs.",
            "learningOutcome": "Optimize commercial laundry thermal energy efficiency",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "In an effective hotel towel and linen reuse program, how should a room attendant handle a towel neatly hanging on the bathroom towel rack?",
            "options": [
              "Strip the towel immediately and replace it with a new one.",
              "Leave the hanging towel in place, neatly refold or straighten it, and only replace towels left inside the bathtub or on the floor.",
              "Throw the towel into the general waste trash can.",
              "Spray the towel with heavy aerosol perfume."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Hanging towels indicate the guest wishes to reuse them. Attendants should respect this preference to conserve water, energy, and detergents.",
            "incorrectExplanation": "Respecting guest placement (hanging = reuse; floor/tub = replace) is the foundation of towel conservation.",
            "optionFeedback": [
              "Incorrect. Replacing hanging towels ignores the guest's conservation choice and wastes laundry resources.",
              "Correct! Leaving hanging towels in place and only replacing towels on the floor/tub respects guest reuse preferences.",
              "Incorrect. Towels must be laundered, never discarded in the trash.",
              "Incorrect. Perfume sprays cause allergic reactions and violate hospitality hygiene standards."
            ],
            "practicalTakeaway": "Train housekeeping staff to strictly follow guest placement cues for towel and linen reuse.",
            "learningOutcome": "Manage hotel towel and linen reuse programs",
            "competencyArea": "COMP_WATER"
          },
          {
            "question": "What is the primary environmental drawback of providing individual 30ml miniature plastic shampoo and lotion bottles in guest rooms?",
            "options": [
              "They are too large for guests to pack into suitcases.",
              "They generate millions of non-recyclable single-use plastic bottles and result in significant discarded product waste.",
              "They clean hair more effectively than bulk dispensers.",
              "They consume too much electricity in the guest room."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Miniature amenity bottles generate immense plastic waste and product discard (half-used bottles thrown away after a single night).",
            "incorrectExplanation": "Miniatures create massive plastic pollution and product waste; bulk dispensers eliminate this entirely.",
            "optionFeedback": [
              "Incorrect. Miniatures are designed to be portable, which encourages plastic discard.",
              "Correct! Miniature bottles create vast plastic waste and discard unspent product into landfills.",
              "Incorrect. The cosmetic formulation in bulk dispensers is identical or superior in quality.",
              "Incorrect. Miniature bottles do not consume electrical energy."
            ],
            "practicalTakeaway": "Install wall-mounted bulk dispensers to eliminate single-use miniature plastic amenity bottles.",
            "learningOutcome": "Eliminate single-use plastics in guest amenities",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "Why should housekeeping supervisors ensure that vacant guest room air conditioners are set to eco-mode (e.g. 24°C) with curtains drawn?",
            "options": [
              "To ensure room attendants feel hot while cleaning.",
              "To reduce solar heat gain and prevent excessive air conditioning electricity waste in unoccupied rooms.",
              "To encourage birds to enter through the balcony doors.",
              "To speed up paint drying on the walls."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Closing curtains blocks solar radiant heat and setting thermostats to 24°C prevents costly cooling waste in unoccupied rooms.",
            "incorrectExplanation": "Drawn curtains and moderate thermostat setbacks reduce HVAC loads significantly in vacant rooms.",
            "optionFeedback": [
              "Incorrect. Room setups are configured for energy conservation and guest arrival comfort.",
              "Correct! Closing curtains blocks solar heat gain and setting setbacks avoids cooling empty rooms.",
              "Incorrect. Balcony doors should remain tightly shut to prevent humidity and heat entry.",
              "Incorrect. Routine vacant room setups are designed for energy management, not paint curing."
            ],
            "practicalTakeaway": "Make curtain closing and AC thermostat reset to 24°C mandatory standard operating procedures upon room departure.",
            "learningOutcome": "Execute room energy conservation procedures",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "How do color-coded microfiber cleaning cloths improve housekeeping sustainability compared to disposable paper towels?",
            "options": [
              "They are thrown into the landfill after every single room clean.",
              "They are washable and reusable up to 300+ times, require less chemical agent, and prevent cross-contamination across room zones.",
              "They require hot bleach washes every 10 minutes.",
              "They are made from disposable single-use plastic wrap."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Microfiber cloths are durable and washable for hundreds of cycles, trap dirt with minimal chemicals, and color-coding prevents cross-contamination.",
            "incorrectExplanation": "High-quality microfiber cloths are washable, reusable, and eliminate disposable paper waste.",
            "optionFeedback": [
              "Incorrect. Microfiber cloths are washed and reused for hundreds of cycles, not thrown away.",
              "Correct! Reusable microfiber cloths eliminate paper waste, cut chemical usage, and prevent cross-contamination.",
              "Incorrect. Microfiber is laundered in standard commercial laundry cycles, not every 10 minutes.",
              "Incorrect. Microfiber is a woven reusable textile, not disposable plastic wrap."
            ],
            "practicalTakeaway": "Equip room attendants with color-coded reusable microfiber cloths to eliminate disposable paper towel waste.",
            "learningOutcome": "Deploy reusable microfiber systems in housekeeping",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "When auditing housekeeping trolleys, what is a key indicator of an eco-compliant operation?",
            "options": [
              "The trolley is loaded with hundreds of disposable plastic shopping bags for sorting linen.",
              "The trolley features segregated reusable fabric bags for laundry and recyclables, refillable spray bottles, and zero single-use plastic wrap.",
              "The trolley contains unlabelled free-poured bleach containers.",
              "The trolley has no waste sorting compartments whatsoever."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Eco-compliant carts feature built-in multi-stream sorting (linen, waste, recyclables), refillable dispensers, and zero single-use plastic liners.",
            "incorrectExplanation": "Sustainable carts use durable fabric bags, labeled refillable bottles, and segregated sorting bins.",
            "optionFeedback": [
              "Incorrect. Disposable shopping bags indicate poor plastic waste management.",
              "Correct! Reusable sorting bags, refillable bottles, and zero disposable plastics reflect sustainable cart setup.",
              "Incorrect. Unlabelled chemical containers are a severe occupational safety and regulatory violation.",
              "Incorrect. Lack of sorting compartments leads to mixed waste disposal in landfills."
            ],
            "practicalTakeaway": "Audit housekeeping trolleys weekly to ensure multi-stream source segregation and zero single-use plastics.",
            "learningOutcome": "Audit and maintain eco-compliant housekeeping trolleys",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "Which action should an Executive Housekeeper prioritize during their first 30 days of eco-remediation?",
            "options": [
              "Increase the concentration of bleach in all bathroom cleaning buckets.",
              "Audit chemical dilution dispensers, verify laundry wash temperatures with engineering, and train attendants on towel reuse protocols.",
              "Replace all organic cotton bedsheets with disposable synthetic paper sheets.",
              "Eliminate all daily room cleaning services without guest consent."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The 30-day focus targets auditing chemical dispensers, optimizing laundry wash temperatures, and training staff on towel reuse.",
            "incorrectExplanation": "Prioritize chemical safety, laundry thermal efficiency, and linen reuse training during initial rollout.",
            "optionFeedback": [
              "Incorrect. Increasing bleach creates toxic fumes and damages guest fixtures.",
              "Correct! Auditing chemical dispensers, optimizing laundry wash temps, and training on towel reuse establishes immediate control.",
              "Incorrect. Disposable sheets create massive landfill waste and destroy luxury guest satisfaction.",
              "Incorrect. Eliminating room cleaning without consent violates hospitality service standards."
            ],
            "practicalTakeaway": "Focus initial housekeeping efforts on chemical dispensers, laundry temperatures, and towel reuse training.",
            "learningOutcome": "Execute a 30-day sustainable housekeeping action plan",
            "competencyArea": "COMP_WATER"
          }
        ]
      }
    ]

if __name__ == "__main__":
    courses = get_courses_1_to_5()
    print(f"Loaded {len(courses)} courses from Module 1.")
