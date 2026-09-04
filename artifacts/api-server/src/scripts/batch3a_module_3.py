#!/usr/bin/env python3
import json
import os

def get_courses_9_to_12():
    return [
      # 9. ELH-121: Building Business Cases for Sustainability Projects (D3)
      {
        "courseCode": "ELH-121",
        "title": "Building Business Cases for Sustainability Projects",
        "slug": "building-business-cases-for-sustainability-projects",
        "description": "Master financial appraisal of clean tech investments, Discounted Cash Flow (DCF), Net Present Value (NPV), Internal Rate of Return (IRR), and multi-criteria executive pitches.",
        "fullDescription": "Building Business Cases for Sustainability Projects equips project leads, facility managers, and operational planners to secure executive capital approval for green investments. Master the financial modeling of energy efficiency, solar PV, and circular technology projects using Discounted Cash Flow (DCF), Net Present Value (NPV), Internal Rate of Return (IRR), and electricity tariff escalation. Learn to quantify non-energy co-benefits (maintenance savings, carbon hedge, tenant retention), structure 1-page CFO executive summaries, and overcome simple payback hurdle traps.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_STRATEGY",
        "secondaryCompetencies": ["COMP_REPORTING", "COMP_LEADERSHIP"],
        "learningObjectives": [
          "Construct comprehensive Discounted Cash Flow (DCF) models with utility escalation and tax depreciation for clean tech assets.",
          "Calculate and interpret Net Present Value (NPV), Internal Rate of Return (IRR), and Levelized Cost of Energy (LCOE).",
          "Quantify and monetize indirect operational co-benefits (reduced maintenance, water security, asset longevity).",
          "Structure persuasive 1-page executive investment proposals tailored to CFO hurdle criteria."
        ],
        "intendedRoles": ["Project Managers", "Financial Analysts", "Operations Heads", "Facility Engineers"],
        "badgeName": "Sustainability Business Case Architect",
        "badgeDescription": "Demonstrated capability in financial modeling, DCF valuation, and executive pitching for sustainability capital investments.",
        "completionMessage": "Congratulations! You have completed Building Business Cases for Sustainability Projects and are prepared to win capital funding.",
        "recommendedNextCourseCode": "ELH-122",
        "lessons": [
          {
            "title": "1. Why Simple Payback Destroys Clean Tech Value",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why traditional 2-year simple payback rules kill high-return clean energy investments and how DCF reveals true economic value.",
            "contentBlocks": [
              { "id": "elh121-h1", "type": "heading", "level": 3, "text": "The Financial Blindspot of Simple Payback" },
              { "id": "elh121-t1", "type": "short_text", "position": 1, "bodyText": "Corporate capital allocation rules often require projects to achieve a '3-year simple payback' (Payback = Initial Capital / Annual Savings). While useful for short-lived software, this rule severely undervalues durable clean technologies (rooftop solar PV, magnetic-bearing chillers, heat pumps) that operate for 20 to 25 years. A solar PV project with a 5.5-year simple payback will generate guaranteed positive cash flows for another 19.5 years, delivering an Internal Rate of Return (IRR) exceeding 18% — far higher than standard corporate weighted average cost of capital (WACC)." },
              { "id": "elh121-c1", "type": "callout", "variant": "info", "title": "Valuation Invariant", "bodyText": "Always evaluate long-life sustainability assets using multi-year Discounted Cash Flow (NPV and IRR) rather than truncated simple payback." }
            ]
          },
          {
            "title": "2. Discounted Cash Flow Modeling & Utility Escalation",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Building 10-to-20 year financial cash flows with electricity inflation, O&M costs, and salvage value.",
            "contentBlocks": [
              { "id": "elh121-h2", "type": "heading", "level": 3, "text": "Constructing an Audit-Grade Financial Model" },
              { "id": "elh121-t2", "type": "short_text", "position": 1, "bodyText": "A complete clean tech DCF model incorporates five essential cash flow variables: (1) **Initial Capex** (turnkey equipment, installation, grid connection); (2) **Annual Operating Savings** (kWh or m3 saved × commercial tariff rate); (3) **Utility Tariff Escalation** (modeling historical 3%–5% annual CEB utility tariff inflation); (4) **Ongoing O&M Expenses** (inverter maintenance, panel cleaning, filter replacement); and (5) **Discount Rate / WACC** (discounting future cash flows to Net Present Value)." },
              { "id": "elh121-c2", "type": "callout", "variant": "tip", "title": "Modeling Formula", "bodyText": "NPV = Sum [Net Cash Flow_t / (1 + Discount Rate)^t] - Initial Capex. A positive NPV indicates the project adds net shareholder value above the hurdle rate." }
            ]
          },
          {
            "title": "3. Monetizing Non-Energy Co-Benefits",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Quantifying maintenance labor reductions, water security insurance, and green lease premiums.",
            "contentBlocks": [
              { "id": "elh121-h3", "type": "heading", "level": 3, "text": "Beyond Direct Utility Savings" },
              { "id": "elh121-t3", "type": "short_text", "position": 1, "bodyText": "Sustainability investments deliver significant operational co-benefits that traditional proposals omit: (1) **Maintenance Labor Reduction** (LED retrofits eliminate 80% of lamp replacement labor and scaffolding rental); (2) **Asset Protection & Reliability** (power-factor correction capacitors extend transformer lifespan); and (3) **Business Continuity Insurance** (rainwater harvesting and backup solar buffer against municipal water rationing and grid load-shedding). Monetizing these co-benefits strengthens project NPV by 15% to 30%." },
              { "id": "elh121-c3", "type": "callout", "variant": "action", "title": "Proposal Rule", "bodyText": "Always itemize quantified maintenance and risk-mitigation co-benefits in your investment proposal." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Business Case Pitching",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Defend a multi-million-rupee capital proposal against financial and operational executive scrutiny.",
            "contentBlocks": [
              {
                "id": "elh121-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Appraising a Commercial Heat Pump Investment",
                "prompt": "You are the Chief Engineer at a 150-room hotel. The resort currently burns diesel fuel in two boilers to heat domestic guest water (costing Rs 2.8M/year in fuel). You propose installing a centralized air-source heat pump system costing Rs 4.2 million. The simple payback is 4.8 years, but corporate policy has a 3-year hurdle. How do you structure the CFO proposal?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Accept the 3-year simple payback rejection and continue burning diesel in the boilers indefinitely.",
                    "consequence": "Severe financial and carbon loss. Leaves the resort exposed to rising diesel prices, burning 70,000 liters of diesel annually, and emitting 188 tonnes of Scope 1 CO2e.",
                    "feedback": "Accepting simple payback without DCF modeling locks the business into continuous high operating costs and emissions.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Present a 15-year DCF model: with 4% diesel inflation, the heat pump yields an NPV of +Rs 6.4 million, an IRR of 21.3%, and eliminates boiler chemical descaling costs (Rs 120,000/yr), while cutting corporate Scope 1 emissions by 188 tonnes CO2e/year.",
                    "consequence": "Optimal financial defense. You prove overwhelming multi-year shareholder value creation, hedge against fossil fuel inflation, quantify maintenance co-benefits, and secure unanimous ExCo approval.",
                    "feedback": "Correct! Multi-year DCF modeling with fuel inflation and maintenance savings clearly demonstrates superior project economic value.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Tell the CFO that financial numbers do not matter because the hotel has a moral obligation to protect nature.",
                    "consequence": "Executive rejection. Fails to satisfy fiduciary governance standards and results in immediate funding denial.",
                    "feedback": "Fiduciary governance requires rigorous economic valuation; moral appeals do not substitute for financial models.",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh121-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Addressing Executive Risk Concerns in Rooftop Solar",
                "prompt": "During your 100 kWp rooftop solar PV presentation (Rs 4.5M Capex, 22% IRR), the Risk Director asks: 'What happens if a Category 4 cyclone destroys the solar panels in Year 2?' How do you defend the proposal?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "State that cyclones will never hit the building because the roof faces north.",
                    "consequence": "Disastrous technical credibility failure. Demonstrates ignorance of Mauritian tropical cyclonic risks.",
                    "feedback": "Ignoring documented physical climate risks destroys executive credibility.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Present a multi-layered risk mitigation strategy: (1) Certified mounting hardware rated to 250 km/h wind shear; (2) Comprehensive commercial property insurance covering cyclone wind damage and business interruption; and (3) 25-year manufacturer linear output warranties, factored directly into the financial sensitivity model.",
                    "consequence": "Optimal risk governance. You demonstrate thorough engineering due diligence, financial risk transfer, and robust downside protection, securing immediate risk sign-off.",
                    "feedback": "Excellent! Addressing physical risks with certified engineering standards, insurance transfer, and warranty covenants provides complete executive assurance.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: 1-Page Investment Memo",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Structure an executive-grade 1-page capital proposal memo.",
            "contentBlocks": [
              { "id": "elh121-h4", "type": "heading", "level": 3, "text": "Drafting Your 1-Page Business Case Memo" },
              { "id": "elh121-t4", "type": "short_text", "position": 1, "bodyText": "Draft a 1-page CFO Investment Proposal: (1) Project Summary & Problem Statement; (2) Financial Metrics (Initial Capex, 10-year NPV, IRR, Payback with utility escalation); (3) Operational & Non-Energy Co-Benefits; and (4) Downside Risk Mitigation Matrix." },
              { "id": "elh121-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Draft your 1-page Sustainability Investment Memo this month and review the financial assumptions with your finance controller." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "Why does evaluating durable clean technology assets (e.g. 25-year solar PV or chillers) using simple payback period lead to poor capital allocation decisions?",
            "options": [
              "Simple payback only works in Leap Years.",
              "Simple payback truncates project evaluation at the breakeven point, completely ignoring 15 to 20 years of lucrative positive cash flows and failing to account for the time value of money and utility inflation.",
              "Simple payback calculations require supercomputers.",
              "Simple payback is strictly illegal under accounting law."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Simple payback discards all multi-decade cash flows generated after the payback year, causing organizations to reject high-IRR projects that create massive long-term shareholder value.",
            "incorrectExplanation": "Simple payback ignores post-payback cash flows, the time value of money, and future utility tariff inflation.",
            "optionFeedback": [
              "Incorrect. Simple payback is a calendar-agnostic mathematical formula.",
              "Correct! Simple payback ignores the multi-decade positive cash flows generated across the asset's operating life, leading to under-investment in high-yield clean technologies.",
              "Incorrect. Simple payback is a basic arithmetic division.",
              "Incorrect. Simple payback is legally permitted but financially inferior to DCF for long-life assets."
            ],
            "practicalTakeaway": "Always use Discounted Cash Flow (NPV and IRR) to evaluate long-life sustainability assets.",
            "learningOutcome": "Distinguish DCF valuation from simple payback limitations",
            "competencyArea": "COMP_STRATEGY"
          },
          {
            "question": "What does a positive Net Present Value (NPV > 0) signify when evaluating a sustainability capital expenditure proposal?",
            "options": [
              "The project will consume more electricity than it saves.",
              "The present value of projected future cash inflows exceeds the initial capital cost, generating net financial value for the business above its required hurdle rate (discount rate).",
              "The company must immediately borrow money from foreign banks.",
              "The equipment will never require maintenance."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "A positive NPV confirms that discounted cash flows exceed the initial investment, creating measurable economic value for the organization.",
            "incorrectExplanation": "Positive NPV indicates the project generates financial returns in excess of the company's cost of capital.",
            "optionFeedback": [
              "Incorrect. Positive NPV denotes positive financial returns and resource savings.",
              "Correct! Positive NPV confirms that the discounted lifetime savings exceed the upfront capital investment, adding net economic value above the hurdle rate.",
              "Incorrect. Project financing can utilize existing capital or debt reserves.",
              "Incorrect. Equipment maintenance is factored into the net cash flow model."
            ],
            "practicalTakeaway": "Approve sustainability capital projects that deliver positive Net Present Value at the corporate hurdle rate.",
            "learningOutcome": "Interpret Net Present Value (NPV) in sustainability investment proposals",
            "competencyArea": "COMP_STRATEGY"
          },
          {
            "question": "Why is incorporating a reasonable annual utility tariff escalation rate (e.g. 3%–5%) essential in long-term energy and water business cases?",
            "options": [
              "To make the spreadsheet look more complex.",
              "Grid electricity and municipal water tariffs historically rise over time; incorporating conservative inflation reflects the true increasing value of avoided utility purchases over a 15-to-25 year asset life.",
              "Because utility tariffs in Mauritius are legally guaranteed to double every year.",
              "To reduce the lifespan of the equipment."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Energy savings become more valuable each year as utility rates rise; omitting escalation significantly underestimates the project's true long-term financial yield.",
            "incorrectExplanation": "Modeling utility inflation captures the increasing monetary value of avoided resource purchases over multi-year horizons.",
            "optionFeedback": [
              "Incorrect. Financial modeling reflects economic reality rather than artificial complexity.",
              "Correct! Incorporating historical utility tariff inflation accurately models the growing financial value of avoided energy and water purchases over time.",
              "Incorrect. Tariffs are regulated by statutory utility commissions.",
              "Incorrect. Economic inflation modeling has no impact on physical hardware wear."
            ],
            "practicalTakeaway": "Incorporate conservative utility tariff inflation in multi-year clean energy DCF models.",
            "learningOutcome": "Model utility tariff escalation in financial appraisals",
            "competencyArea": "COMP_STRATEGY"
          },
          {
            "question": "Which of the following represents a quantifiable 'Non-Energy Co-Benefit' that should be monetized in an LED lighting retrofit business case?",
            "options": [
              "The color of the lighting technician's uniform.",
              "Avoided maintenance labor and scaffolding rental costs due to LED lifespans (50,000 hours) being 5 to 10 times longer than fluorescent tubes.",
              "The increase in employee social media followers.",
              "A reduction in corporate income tax rates to 0%."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "LED fixtures last 50,000+ hours, eliminating hundreds of maintenance bulb-replacement work orders and expensive high-ceiling scaffolding rentals.",
            "incorrectExplanation": "Drastically reduced replacement labor and scaffolding rental represents a material, monetizable operational co-benefit.",
            "optionFeedback": [
              "Incorrect. Uniforms are standard operational supplies.",
              "Correct! Avoided maintenance labor and eliminated scaffolding hire represent substantial, verifiable operational cost reductions that enhance project NPV.",
              "Incorrect. Social media follower counts are unrelated to internal maintenance expenses.",
              "Incorrect. Standard corporate tax legislation applies to statutory profits."
            ],
            "practicalTakeaway": "Monetize avoided maintenance labor and equipment rental in lighting and machinery proposals.",
            "learningOutcome": "Quantify and monetize non-energy operational co-benefits",
            "competencyArea": "COMP_STRATEGY"
          },
          {
            "question": "What is the 'Internal Rate of Return' (IRR) of an investment project?",
            "options": [
              "The speed at which employees return to the office after lunch.",
              "The annualized effective compound return rate that makes the Net Present Value (NPV) of all project cash flows equal to exactly zero.",
              "The percentage of tax paid on imported machinery.",
              "The interest rate charged by loan sharks."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "IRR represents the project's internal yield; if the IRR exceeds the company's cost of capital (WACC), the project is financially attractive.",
            "incorrectExplanation": "IRR is the discount rate that equates the present value of future cash inflows to the initial capital outlay.",
            "optionFeedback": [
              "Incorrect. IRR is a core financial capital budgeting metric.",
              "Correct! IRR represents the annualized compound yield of the project, allowing direct comparison against corporate hurdle rates and alternative capital investments.",
              "Incorrect. Customs tariffs are fiscal duties, not investment returns.",
              "Incorrect. IRR evaluates internal project return, distinct from predatory debt rates."
            ],
            "practicalTakeaway": "Compare project IRR directly against the corporate cost of capital (WACC) to demonstrate financial superiority.",
            "learningOutcome": "Calculate and evaluate Internal Rate of Return (IRR)",
            "competencyArea": "COMP_STRATEGY"
          },
          {
            "question": "How should a project manager address physical cyclonic wind-load risks when pitching a rooftop solar PV project to executive directors in Mauritius?",
            "options": [
              "Deny that cyclones ever happen in the Indian Ocean.",
              "Present structural engineering certifications rated to cyclonic wind shear (e.g. 250 km/h), property insurance risk-transfer agreements, and linear warranty covenants.",
              "Promise to unscrew all solar panels by hand whenever a storm approaches.",
              "Cancel the project and burn coal instead."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Rigorous engineering standards (250 km/h wind-load rating) combined with commercial property insurance transfer and supplier warranties provide complete risk assurance.",
            "incorrectExplanation": "Wind-load engineering certification, property insurance transfer, and warranty covenants provide comprehensive downside protection.",
            "optionFeedback": [
              "Incorrect. Denying tropical climate reality destroys executive trust.",
              "Correct! Providing wind-load engineering certificates, insurance risk transfer, and manufacturer warranties provides robust, professional risk mitigation.",
              "Incorrect. Manual dismantling during storm warnings is hazardous and operationally infeasible.",
              "Incorrect. Clean tech adoption with proper engineering provides superior long-term resilience."
            ],
            "practicalTakeaway": "Include wind-load engineering certificates and insurance risk transfer in renewable energy business cases.",
            "learningOutcome": "Mitigate physical climate and operational risks in business proposals",
            "competencyArea": "COMP_STRATEGY"
          },
          {
            "question": "What is the primary structure of an effective 1-page CFO Investment Memo for a sustainability project?",
            "options": [
              "A long poem about green trees and endangered birds.",
              "A concise 4-section executive summary: (1) Problem & Technical Solution; (2) Financial Metrics (Capex, NPV, IRR, Payback); (3) Operational Co-Benefits; and (4) Downside Risk Mitigation.",
              "A 50-page printout of raw equipment manufacturer manuals.",
              "A list of company employees who like solar power."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "A 1-page executive memo delivers immediate financial, operational, and risk clarity tailored directly to the CFO's decision criteria.",
            "incorrectExplanation": "A 4-section executive memo delivers concise technical, financial, operational, and risk clarity for executive approval.",
            "optionFeedback": [
              "Incorrect. Executive memos require commercial rigor rather than artistic poetry.",
              "Correct! The 4-part structure (Problem/Solution, Financial Metrics, Co-Benefits, Risk Mitigation) delivers the exact data decision-makers require to approve capital.",
              "Incorrect. Raw technical manuals should be relegated to technical appendices.",
              "Incorrect. Fiduciary investment decisions rely on financial economics and operational risk controls."
            ],
            "practicalTakeaway": "Structure capital requests into a concise 1-page executive memo covering financials, co-benefits, and risk mitigation.",
            "learningOutcome": "Author executive-grade 1-page investment proposals",
            "competencyArea": "COMP_STRATEGY"
          },
          {
            "question": "Which of the following represents an effective 30-day workplace action commitment for a project manager seeking sustainability capital funding?",
            "options": [
              "Asking the CFO for Rs 5 million in an informal hallway conversation with no numbers.",
              "Building a 10-year DCF model with utility escalation, monetizing maintenance co-benefits, and drafting a 1-page executive investment proposal for the top departmental efficiency project.",
              "Refusing to evaluate project financial returns.",
              "Deleting the engineering quote from the supplier."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Building a robust DCF model and packaging the proposal into an executive-grade 1-page memo establishes a compelling, fundable business case.",
            "incorrectExplanation": "Constructing a 10-year DCF model with utility escalation and drafting a 1-page memo creates an audit-ready capital proposal.",
            "optionFeedback": [
              "Incorrect. Unsubstantiated verbal requests are rejected by executive committees.",
              "Correct! Building a 10-year DCF model, monetizing maintenance savings, and summarizing the case in a 1-page executive memo creates a fundable capital proposal.",
              "Incorrect. Financial valuation is mandatory for corporate capital expenditure.",
              "Incorrect. Preserving supplier technical quotes is essential for auditable cost estimation."
            ],
            "practicalTakeaway": "Build a 10-year DCF model and draft a 1-page CFO proposal memo for your top project this month.",
            "learningOutcome": "Execute 30-day business case development commitment",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 10. ELH-122: Managing Subcontractor Sustainability Compliance (D3)
      {
        "courseCode": "ELH-122",
        "title": "Managing Subcontractor Sustainability Compliance",
        "slug": "managing-subcontractor-sustainability-compliance",
        "description": "Enforce contractor environmental, labor, and safety compliance under OSHA 2005 Section 5, execute on-site audits, draft contractual ESG covenants, and govern corrective action plans.",
        "fullDescription": "Managing Subcontractor Sustainability Compliance trains site supervisors, procurement managers, and facility coordinators to govern third-party contractors and service providers. Master the legal statutory duty of care under Section 5 of the Occupational Safety and Health Act 2005 (OSHA 2005), draft enforceable Master Service Agreement (MSA) sustainability covenants, conduct risk-based on-site audits, handle environmental non-compliances (effluent, hazardous waste, refrigerant venting), and manage time-bound Corrective Action Plans (CAP).",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_COMPLIANCE",
        "secondaryCompetencies": ["COMP_GOVERNANCE_ETHICS", "COMP_SUPPLY_CHAIN"],
        "learningObjectives": [
          "Apply statutory employer duty of care under Section 5 of OSHA 2005 extending to outsourced contractors.",
          "Draft legally enforceable contractual ESG clauses, right-to-audit rights, and breach penalties in vendor Master Service Agreements.",
          "Execute structured, risk-based on-site vendor environmental and safety audits.",
          "Govern 30-day Corrective Action Plans (CAP) for contractor non-compliances and maintain defensible audit trails."
        ],
        "intendedRoles": ["Site Supervisors", "Contract Managers", "HSE Coordinators", "Procurement Leads"],
        "badgeName": "Subcontractor Compliance Auditor",
        "badgeDescription": "Demonstrated competence in contractor ESG auditing, OSHA 2005 statutory compliance, and contractual covenant enforcement.",
        "completionMessage": "Congratulations! You have completed Managing Subcontractor Sustainability Compliance and are certified to govern third-party compliance.",
        "recommendedNextCourseCode": "ELH-128",
        "lessons": [
          {
            "title": "1. Legal Foundations: Statutory Duty of Care (OSHA 2005 Section 5)",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why premises operators are legally liable for contractor safety and environmental violations on site.",
            "contentBlocks": [
              { "id": "elh122-h1", "type": "heading", "level": 3, "text": "The Legal Scope of Contractor Accountability" },
              { "id": "elh122-t1", "type": "short_text", "position": 1, "bodyText": "A dangerous commercial misconception is that hiring a third-party subcontractor transfers all legal liability away from the host enterprise. Under Section 5 of the Mauritius Occupational Safety and Health Act 2005 (OSHA 2005), employers carry a statutory duty to ensure that non-employees (contractors, agency workers, visitors) are not exposed to health and safety hazards on company premises. Furthermore, under national environmental legislation, illegal chemical dumping or refrigerant venting by a contractor on your premises exposes the premises occupier to statutory penalties and reputational ruin." },
              { "id": "elh122-c1", "type": "callout", "variant": "info", "title": "Legal Invariant", "bodyText": "OSHA 2005 Section 5 holds premises operators legally accountable for ensuring safe systems of work for all on-site contractors and third-party personnel." }
            ]
          },
          {
            "title": "2. Contractual Architecture: MSAs, Right-to-Audit & Breach Clauses",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Drafting enforceable ESG covenants, inspection rights, and withholding penalties in Master Service Agreements.",
            "contentBlocks": [
              { "id": "elh122-h2", "type": "heading", "level": 3, "text": "Embedding Accountability into Vendor Contracts" },
              { "id": "elh122-t2", "type": "short_text", "position": 1, "bodyText": "Informal contractor promises are unenforceable during disputes. Master Service Agreements (MSAs) must contain four non-negotiable clauses: (1) **Mandatory Compliance with Corporate Supplier Code of Conduct**; (2) **Right-to-Audit**: Unannounced physical inspection rights for facilities, waste manifests, and PPE compliance; (3) **Stop-Work Authority**: Immediate halting of work without contractor financial compensation if imminent environmental or safety hazards occur; and (4) **Payment Withholding & Indemnification**: Financial withholding until environmental non-compliances are cured." },
              { "id": "elh122-c2", "type": "callout", "variant": "tip", "title": "Contract Rule", "bodyText": "Never issue a high-risk purchase order without signed Master Service Agreement ESG covenants and verified worker insurance." }
            ]
          },
          {
            "title": "3. The On-Site Audit & Corrective Action Plan (CAP) Workflow",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Conducting physical inspections, logging non-conformances, and managing time-bound remedial roadmaps.",
            "contentBlocks": [
              { "id": "elh122-h3", "type": "heading", "level": 3, "text": "Executing Risk-Based Contractor Audits" },
              { "id": "elh122-t3", "type": "short_text", "position": 1, "bodyText": "Execute regular, structured contractor audits: (1) **Pre-Qualification**: Verify valid insurance, OSHA compliance history, and environmental licenses; (2) **Daily Permit-to-Work (PTW)**: Review risk assessments for hazardous tasks (hot work, chemical handling, confined space); (3) **Physical Inspection**: Inspect PPE usage, chemical secondary containment bunds, and waste segregation; and (4) **30-Day CAP Governance**: When non-conformances are identified, issue a formal Corrective Action Plan requiring containment within 24h, engineering fixes in 14 days, and re-audit verification at Day 30." },
              { "id": "elh122-c3", "type": "callout", "variant": "action", "title": "Audit Standard", "bodyText": "Document all on-site contractor non-conformances with timestamped photographs and maintain records in the centralized compliance register." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Contractor Compliance",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Resolve critical on-site dilemmas involving contractor safety breaches and hazardous waste disposal.",
            "contentBlocks": [
              {
                "id": "elh122-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Hazardous Paint Waste Disposal on Construction Site",
                "prompt": "During a routine afternoon site sweep, you discover painting subcontractors washing industrial solvent-based epoxy paint brushes and chemical thinners directly into a stormwater drainage pit that empties into a nearby lagoon. The subcontractor foreman says: 'We always rinse tools here, it saves time and the chemical evaporates quickly.' What is your immediate compliance action?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Accept the foreman's explanation and let them finish their shift without interruption.",
                    "consequence": "Catastrophic environmental crime. Toxic epoxy solvents contaminate the coastal lagoon, killing marine life and triggering severe prosecution and criminal fines under national environmental protection laws.",
                    "feedback": "Ignoring chemical discharge into storm drains breaches statutory environmental laws and corporate duty of care.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Exercise Stop-Work Authority immediately: halt all painting operations, deploy drain-blocking socks from the site spill kit to contain the discharge, mandate removal of contaminated sludge by a certified hazardous waste handler at the subcontractor's expense, and issue a formal Breach Notice with a 30-day Corrective Action Plan.",
                    "consequence": "Optimal compliance enforcement. You prevent ecological contamination of public waterways, enforce statutory environmental compliance, ensure the contractor absorbs the financial cleanup cost, and establish strict future controls.",
                    "feedback": "Correct! Immediate Stop-Work Authority, physical drain containment, contractor-funded hazardous remediation, and contractual breach issuance protects ecosystems and organizational integrity.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Tell the contractor to pour water into the drain to dilute the paint chemical so no one notices.",
                    "consequence": "Illegal complicity. Flushing toxic chemicals accelerates contaminant dispersion into the lagoon and constitutes deliberate environmental crime.",
                    "feedback": "Dilution does not eliminate toxicity and makes the host organization criminally complicit in illegal pollution.",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh122-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Managing Repeated PPE Non-Compliance",
                "prompt": "An HVAC maintenance subcontractor's technicians are servicing rooftop chillers without wearing required safety harnesses and eye protection, despite receiving two previous verbal warnings. What is your supervisory response?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Issue a third verbal warning and leave them to finish the job.",
                    "consequence": "Severe safety failure. A technician slips from the wet rooftop edge, resulting in a fatal fall. The company faces prosecution under OSHA 2005 Section 5 for failure to enforce safe systems of work.",
                    "feedback": "Repetitive verbal warnings without formal enforcement fail to protect worker lives and create severe legal liability under OSHA 2005.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Halt the rooftop work immediately, revoke the technicians' site access permits, issue a formal Contractual Non-Compliance Notice to the vendor's Managing Director with commercial invoice withholding, and mandate full certified height-safety retraining before permits are re-issued.",
                    "consequence": "Optimal safety enforcement. You eliminate imminent life-safety fall hazards, enforce legal duty of care under OSHA 2005, and compel the vendor to overhaul safety discipline.",
                    "feedback": "Excellent! Revoking site access, escalating formally to vendor executive management, and withholding commercial billing enforces compliance and saves lives.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Contractor Compliance Audit Checklist",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Deploy an operational on-site contractor audit checklist in your department.",
            "contentBlocks": [
              { "id": "elh122-h4", "type": "heading", "level": 3, "text": "Your Subcontractor Audit Toolkit" },
              { "id": "elh122-t4", "type": "short_text", "position": 1, "bodyText": "Deploy a 4-part Contractor Compliance Protocol: (1) Pre-work Permit-to-Work verification; (2) Daily physical inspection checklist (PPE, secondary containment, waste manifests); (3) Standardized Breach Notice template; and (4) 30-day Corrective Action Plan log." },
              { "id": "elh122-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Execute an on-site sustainability and safety compliance audit on your primary maintenance or service contractor within the next 30 days." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "Under Section 5 of the Mauritius Occupational Safety and Health Act 2005 (OSHA 2005), what is an employer's legal duty toward third-party subcontractors working on company premises?",
            "options": [
              "Employers have zero responsibility for contractor safety under any circumstances.",
              "Employers must ensure, so far as is reasonably practicable, that persons not in their employment (including subcontractors and agency workers) who may be affected are not exposed to risks to their safety or health.",
              "Employers are only responsible for contractors if the contract value exceeds Rs 100 million.",
              "Employers must pay contractor personal income taxes directly to the MRA."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "OSHA 2005 Section 5 establishes an explicit statutory duty of care requiring premises operators to maintain safe working environments for non-employees, including all contractors.",
            "incorrectExplanation": "OSHA 2005 Section 5 legally obligates employers to protect all non-employees, including subcontractors, from workplace safety and health hazards.",
            "optionFeedback": [
              "Incorrect. Employers carry clear statutory safety responsibilities under OSHA 2005.",
              "Correct! OSHA 2005 Section 5 legally mandates that employers protect non-employees (contractors, agency workers, visitors) from risks to their safety and health on company premises.",
              "Incorrect. Safety legislation applies universally regardless of contract financial value.",
              "Incorrect. Tax administration is separate from workplace safety statutory duties."
            ],
            "practicalTakeaway": "Enforce identical safety and environmental standards for on-site contractors as for permanent staff.",
            "learningOutcome": "Apply statutory employer duties under OSHA 2005 Section 5",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "What is 'Stop-Work Authority' in contractor environmental and safety governance?",
            "options": [
              "The power of a contractor to stop working whenever they want a break.",
              "The contractual and operational authority granted to site supervisors and employees to immediately halt any contractor activity that poses an imminent danger to human life, safety, or the environment without financial penalty.",
              "A legal order issued by a judge to close a business permanently.",
              "A clause that forbids contractors from using mobile phones."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Stop-Work Authority empowers on-site personnel to intervene immediately when imminent safety or pollution hazards occur, preventing disasters before they unfold.",
            "incorrectExplanation": "Stop-Work Authority empowers personnel to immediately halt operations presenting imminent safety or environmental hazards without penalty.",
            "optionFeedback": [
              "Incorrect. Stop-Work Authority is a safety intervention protocol, not break management.",
              "Correct! Stop-Work Authority empowers staff to immediately halt unsafe or polluting contractor operations without incurring commercial delay penalties.",
              "Incorrect. Stop-Work Authority is an operational site governance mechanism.",
              "Incorrect. Mobile phone rules are governed by site safety policies."
            ],
            "practicalTakeaway": "Exercise Stop-Work Authority immediately whenever contractors create imminent safety or environmental hazards.",
            "learningOutcome": "Execute Stop-Work Authority protocols",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Why is a 'Right-to-Audit' clause essential in a Master Service Agreement (MSA) with an industrial waste management contractor?",
            "options": [
              "To allow the buyer to take office furniture from the contractor's headquarters.",
              "To grant the host organization the legal right to inspect the contractor's downstream recycling facilities, transport weighbridge records, and disposal manifests to verify that waste is not illegally dumped at Mare Chicose.",
              "To change the contract price unilaterally every week.",
              "Because audit clauses are required to purchase stationery."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Right-to-audit clauses allow organizations to verify that contractors actually recycle waste as claimed, protecting against illegal dumping and Scope 3 reporting fraud.",
            "incorrectExplanation": "Right-to-audit clauses allow organizations to physically inspect contractor processing facilities and manifests to prevent illegal dumping.",
            "optionFeedback": [
              "Incorrect. Auditing is a compliance verification procedure, not asset seizure.",
              "Correct! Right-to-audit clauses ensure the host company can verify downstream physical waste processing and eliminate illegal dumping liability.",
              "Incorrect. Commercial pricing terms follow formal contractual amendment procedures.",
              "Incorrect. Right-to-audit is a critical risk-governance clause for high-impact suppliers."
            ],
            "practicalTakeaway": "Mandate Right-to-Audit covenants in all waste, cleaning, and maintenance vendor contracts.",
            "learningOutcome": "Draft and enforce contractual Right-to-Audit covenants",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "What is the proper management protocol when a third-party cleaning subcontractor is caught washing chemical stripper into a stormwater drain on your premises?",
            "options": [
              "Help them wash the chemical faster before anyone takes a photograph.",
              "Halt the activity immediately, deploy spill containment booms to block the drain, mandate removal of contaminated sludge by a certified hazardous waste handler at the contractor's expense, and issue a formal Breach Notice with a 30-day Corrective Action Plan.",
              "Ignore the incident because the cleaning company has insurance.",
              "Pour scented detergent down the drain to hide the smell."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Immediate drain containment stops pollution; contractor-funded hazardous remediation enforces financial accountability; and a formal CAP prevents recurrence.",
            "incorrectExplanation": "Immediate drain containment, contractor-funded hazardous cleanup, and formal breach issuance ensures environmental protection and legal compliance.",
            "optionFeedback": [
              "Incorrect. Assisting in chemical dumping constitutes active participation in an environmental crime.",
              "Correct! Immediately blocking the drain, mandating contractor-funded hazardous remediation, and issuing a formal Breach Notice upholds statutory compliance and environmental protection.",
              "Incorrect. Commercial insurance does not exempt organizations from statutory environmental prosecution.",
              "Incorrect. Masking chemical discharge is illegal and compounds contamination."
            ],
            "practicalTakeaway": "Block drains immediately and mandate contractor-funded hazardous remediation for chemical spills.",
            "learningOutcome": "Manage emergency contractor environmental non-compliances",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "What are the four essential stages of a 30-day contractor Corrective Action Plan (CAP) following an environmental audit non-conformance?",
            "options": [
              "Denial, Delay, Deflection, and Dismissal.",
              "Immediate Containment (within 24h), Root Cause Analysis (within 72h), Permanent Engineering/Procedural Fix (within 14 days), and Re-Audit Verification (at Day 30).",
              "Writing a social media apology, hiring an influencer, buying new uniforms, and closing the case.",
              "Ignoring the contractor for 30 days."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "A disciplined CAP framework stops immediate damage within 24h, identifies root causes in 72h, implements permanent fixes in 14 days, and audits data at Day 30.",
            "incorrectExplanation": "The 4-stage CAP framework encompasses 24h containment, 72h root cause analysis, 14-day permanent remediation, and Day-30 audit verification.",
            "optionFeedback": [
              "Incorrect. Governance requires structured, objective compliance remediation.",
              "Correct! Systematic 24h containment, 72h root cause analysis, 14-day permanent corrective fix, and Day-30 re-audit ensures permanent compliance resolution.",
              "Incorrect. Social media PR does not cure physical on-site non-compliances.",
              "Incorrect. Unmonitored non-compliances lead to recurring environmental and legal violations."
            ],
            "practicalTakeaway": "Govern contractor non-compliances using the 4-stage 30-day CAP framework.",
            "learningOutcome": "Govern contractor Corrective Action Plans",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Why must contractors provide verified weighbridge slips and certified recycling transfer notes rather than handwritten summary invoices for waste disposal?",
            "options": [
              "Because weighbridge slips are printed in color.",
              "Calibrated weighbridge receipts provide legal, auditable proof of exact physical tonnage diverted from Mare Chicose landfill, preventing fraudulent recycling claims.",
              "Handwritten notes are illegal under all circumstances in Mauritius.",
              "Weighbridge tickets give contractors free parking."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Calibrated weighbridge receipts provide legal, auditable mass measurements required for third-party ESG assurance and regulatory compliance.",
            "incorrectExplanation": "Calibrated weighbridge receipts provide legal, auditable physical evidence of waste diversion.",
            "optionFeedback": [
              "Incorrect. Paper aesthetics do not establish legal certification.",
              "Correct! Calibrated weighbridge tickets provide legal, auditable proof of physical waste mass, preventing fraudulent diversion claims.",
              "Incorrect. Handwritten invoices exist, but calibrated weighbridge slips are required for auditable environmental assurance.",
              "Incorrect. Weighbridge tickets are legal commercial transport manifests."
            ],
            "practicalTakeaway": "Mandate calibrated weighbridge receipts as a condition of contractor invoice approval.",
            "learningOutcome": "Verify contractor waste diversion manifests",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "How does a 'Permit-to-Work' (PTW) system mitigate environmental and safety risks for high-risk contractor operations (e.g. chemical handling, hot work, confined space)?",
            "options": [
              "It acts as a ticket to enter the staff cafeteria.",
              "It enforces a formal pre-work risk assessment, verifies safety equipment and secondary containment are in place, assigns emergency procedures, and requires authorized sign-off before work commences.",
              "It eliminates the need for contractor insurance.",
              "It allows contractors to work without wearing PPE."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "A Permit-to-Work system ensures hazards are systematically identified and controlled before high-risk activities begin, preventing accidents and spills.",
            "incorrectExplanation": "Permits-to-Work mandate pre-work hazard identification, control verification, and authorized sign-off for high-risk activities.",
            "optionFeedback": [
              "Incorrect. PTW is a critical operational safety and environmental control system.",
              "Correct! The PTW system enforces pre-work hazard assessment, verifies containment and safety controls, and mandates formal management authorization before high-risk work begins.",
              "Incorrect. Valid insurance remains mandatory for all contractor operations.",
              "Incorrect. PTW systems enforce strict PPE compliance."
            ],
            "practicalTakeaway": "Enforce strict Permit-to-Work authorization for all high-risk contractor operations.",
            "learningOutcome": "Implement Permit-to-Work risk governance",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Which of the following represents an effective 30-day workplace action commitment for a contract manager overseeing service vendors?",
            "options": [
              "Approving all vendor invoices without checking on-site compliance.",
              "Conducting a comprehensive on-site environmental and OSHA 2005 safety audit on primary service contractors, logging non-conformances, and establishing 30-day Corrective Action Plans.",
              "Canceling all contractor safety briefings to save time.",
              "Deleting vendor safety inspection files."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Executing structured on-site audits, documenting non-conformances, and enforcing 30-day CAPs establishes rigorous, legally defensible vendor governance.",
            "incorrectExplanation": "Conducting on-site audits and enforcing 30-day CAPs institutionalizes rigorous contractor compliance governance.",
            "optionFeedback": [
              "Incorrect. Unverified invoice approval creates severe financial and compliance vulnerabilities.",
              "Correct! Conducting systematic on-site audits and enforcing 30-day Corrective Action Plans ensures legal compliance under OSHA 2005 and protects organizational integrity.",
              "Incorrect. Canceling safety briefings violates statutory duty of care.",
              "Incorrect. Preserving inspection records is essential for audit assurance."
            ],
            "practicalTakeaway": "Execute an on-site sustainability and safety compliance audit on your primary contractors this month.",
            "learningOutcome": "Execute 30-day contractor compliance action plan",
            "competencyArea": "COMP_COMPLIANCE"
          }
        ]
      },

      # 11. ELH-128: Sustainability for Health & Safety (HSE) Officers (D3)
      {
        "courseCode": "ELH-128",
        "title": "Sustainability for Health & Safety (HSE) Officers",
        "slug": "sustainability-for-hse-officers",
        "description": "Bridge occupational safety with environmental stewardship: chemical management under GHS, OSHA 2005 statutory compliance, heat stress adaptation, and integrated HSE audits.",
        "fullDescription": "Sustainability for Health & Safety (HSE) Officers provides safety managers, environmental officers, and compliance leads with practical methodologies to integrate environmental sustainability into traditional OHS frameworks. Master Globally Harmonized System (GHS) chemical classification and secondary containment, statutory employer compliance under the Occupational Safety and Health Act 2005 (OSHA 2005), workplace heat stress adaptation in tropical island climates, and unified HSE incident reporting.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_COMPLIANCE",
        "secondaryCompetencies": ["COMP_HEALTH_SAFETY", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Integrate environmental hazard identification into traditional Occupational Health & Safety (OHS) risk assessments.",
          "Apply Globally Harmonized System (GHS) standards for hazardous chemical labeling, SDS accessibility, and secondary containment bunding.",
          "Implement statutory compliance protocols under OSHA 2005 extending to environmental health and contractor safety.",
          "Design occupational heat stress and extreme weather resilience protocols for frontline and outdoor personnel."
        ],
        "intendedRoles": ["HSE Officers", "Safety Managers", "Environmental Coordinators", "Facility Supervisors"],
        "badgeName": "Integrated HSE Leader",
        "badgeDescription": "Demonstrated capability in unifying occupational safety, GHS chemical stewardship, and environmental compliance.",
        "completionMessage": "Congratulations! You have completed Sustainability for Health & Safety Officers and are certified in integrated HSE leadership.",
        "recommendedNextCourseCode": "ELH-130",
        "lessons": [
          {
            "title": "1. Unifying Safety and Environmental Risk Management",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why isolating safety from environmental management creates operational blindspots and how integrated HSE risk matrices work.",
            "contentBlocks": [
              { "id": "elh128-h1", "type": "heading", "level": 3, "text": "The Convergence of Safety and Environmental Protection" },
              { "id": "elh128-t1", "type": "short_text", "position": 1, "bodyText": "Historically, organizations managed Occupational Health and Safety (OHS) separately from Environmental Management. However, operational hazards are deeply interconnected: a leaking chemical pipe is simultaneously a worker slip/toxic inhalation hazard (OHS) and a soil/groundwater contamination hazard (Environmental). Integrated HSE combines both domains into unified **Hierarchy of Controls** assessments: (1) Elimination; (2) Substitution (replacing toxic solvents with bio-based cleaners); (3) Engineering Controls (secondary containment bunding, local exhaust ventilation); (4) Administrative Controls (SOPs, permit-to-work); and (5) PPE." },
              { "id": "elh128-c1", "type": "callout", "variant": "info", "title": "Hierarchy Invariant", "bodyText": "Always prioritize chemical substitution and engineering containment above personal protective equipment (PPE)." }
            ]
          },
          {
            "title": "2. GHS Chemical Stewardship & Secondary Containment",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Mastering Globally Harmonized System (GHS) labeling, Safety Data Sheets (SDS), and secondary containment sizing principles.",
            "contentBlocks": [
              { "id": "elh128-h2", "type": "heading", "level": 3, "text": "Chemical Storage, Handling, and Spill Prevention" },
              { "id": "elh128-t2", "type": "short_text", "position": 1, "bodyText": "Under statutory hazardous materials standards and OSHA 2005, chemical management requires: (1) **GHS Pictogram Labeling**: Every container (including decanted spray bottles) must display standardized GHS hazard pictograms, signal words, and hazard statements; (2) **Safety Data Sheets (SDS)**: 16-section SDS must be accessible within 30 seconds at point-of-use locations; (3) **Secondary Containment Sizing**: Secondary containment should be sized according to the substance, container capacity, site risk assessment, applicable legal requirements and approved technical guidance. A 110% capacity rule is commonly used in some standards and policies, but it must not be presented as a universal Mauritian statutory requirement without a directly applicable provision; and (4) **Spill Kit Placement**: Neutralizing absorbent kits stationed within 10 meters of chemical storage." },
              { "id": "elh128-c2", "type": "callout", "variant": "tip", "title": "Secondary Containment Guidance", "bodyText": "Secondary containment should be sized according to the substance, container capacity, site risk assessment, applicable legal requirements and approved technical guidance. A 110% capacity rule is commonly used in some standards and policies, but it must not be presented as a universal Mauritian statutory requirement without a directly applicable provision." }
            ]
          },
          {
            "title": "3. Workplace Heat Stress & Climate Adaptation",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Managing thermal strain, Wet Bulb Globe Temperature (WBGT), and hydration protocols for frontline workers.",
            "contentBlocks": [
              { "id": "elh128-h3", "type": "heading", "level": 3, "text": "Protecting Frontline Workers in a Warming Climate" },
              { "id": "elh128-t3", "type": "short_text", "position": 1, "bodyText": "In tropical island climates like Mauritius, accelerating ambient temperatures combined with high relative humidity severely impair the human body's evaporative cooling. When workplace conditions exceed 32°C with >75% humidity, HSE officers must enforce the **Extreme Heat Protocol**: (1) Mandatory 15-minute shaded rest breaks every hour for heavy physical labor; (2) Free access to cool potable water with electrolyte replenishment; (3) Rescheduling heavy outdoor maintenance tasks to early morning (06:00–10:00); and (4) Training supervisors to recognize early heat exhaustion symptoms (dizziness, nausea, rapid pulse)." },
              { "id": "elh128-c3", "type": "callout", "variant": "action", "title": "Heat Safety Standard", "bodyText": "Mandate hourly shaded rest and hydration breaks for all outdoor and warehouse personnel during summer peak hours." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Integrated HSE Management",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate real-world emergencies involving uncontained chemical spills and extreme workplace thermal stress.",
            "contentBlocks": [
              {
                "id": "elh128-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Industrial Solvent Drum Leak Near Surface Drain",
                "prompt": "During a routine plant walkthrough, you discover a forklift punctured a 200-liter drum of industrial trichloroethylene degreaser in the warehouse yard. 80 liters of solvent have spilled onto the tarmac and are flowing toward a stormwater drain 5 meters away. Workers are standing nearby without respirators. What is your immediate HSE response?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Tell the workers to wash the solvent into the drain with a fire hose before management sees it.",
                    "consequence": "Catastrophic environmental and criminal disaster. Hosing toxic solvent into the stormwater network poisons municipal waterways, creates explosive vapor clouds, and leads to immediate criminal prosecution.",
                    "feedback": "Hosing toxic chemicals into drains is an environmental crime that severely contaminates public waterways.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Evacuate the immediate downwind area (toxic vapor hazard), deploy non-sparking drain-blocking covers and chemical absorbent booms from the emergency spill kit to seal the drain, don organic vapor respirators, upright the punctured drum into an overpack recovery drum, and log the incident in the OSHA register.",
                    "consequence": "Optimal integrated HSE response. You eliminate toxic inhalation risk to workers, prevent public water contamination, safely contain the chemical, and ensure statutory regulatory compliance.",
                    "feedback": "Correct! Immediate downwind evacuation, physical drain isolation with absorbent booms, PPE-equipped containment, and overpack salvage prevents worker injury and environmental pollution.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Go to your office to write a 10-page report about the incident before taking any physical action.",
                    "consequence": "Severe escalation. While you write the report, 80 liters of toxic solvent flow into the public storm drain, causing widespread environmental contamination.",
                    "feedback": "Emergency physical containment and life safety must always precede administrative paperwork.",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh128-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Heat Exhaustion on the Construction Site",
                "prompt": "It is 13:30 in February. Ambient temperatures reach 34°C with 82% humidity on an unshaded construction project in Grand Baie. Two steel-fixers are staggering with slurred speech, heavy sweating, and dizziness. The site contractor wants them to finish pouring concrete. What is your decision?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Allow the workers to continue if they drink a cup of coffee.",
                    "consequence": "Fatal medical emergency. Caffeine worsens dehydration; one worker suffers severe heat stroke, collapses into a coma, and is hospitalized in critical condition.",
                    "feedback": "Ignoring heat exhaustion symptoms leads to lethal heat stroke emergencies.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Exercise Stop-Work Authority immediately: move the workers to an air-conditioned site office, loosen tight clothing, apply cool damp towels and cold water misting, administer electrolyte hydration, and mandate a site-wide work stoppage until temperature conditions moderate.",
                    "consequence": "Optimal life-safety intervention. You prevent lethal heat stroke, stabilize the affected workers, enforce statutory employer duty of care under OSHA 2005, and institute mandatory shaded work-rest rotations.",
                    "feedback": "Excellent! Immediate active cooling, electrolyte hydration, and enforcing mandatory shaded work-rest cycles protects human life and complies with occupational health standards.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Integrated HSE Audit Protocol",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Deploy an integrated health, safety, and environmental risk inspection in your facility.",
            "contentBlocks": [
              { "id": "elh128-h4", "type": "heading", "level": 3, "text": "Your Integrated HSE Audit Toolkit" },
              { "id": "elh128-t4", "type": "short_text", "position": 1, "bodyText": "Execute an integrated HSE audit covering: (1) GHS chemical labeling and SDS accessibility; (2) Secondary containment sizing and bund integrity based on risk assessments and technical guidance; (3) Emergency spill kit locations and drain seals; and (4) Workplace heat stress shaded hydration zones." },
              { "id": "elh128-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Conduct an integrated HSE chemical and heat stress audit across your facility within the next 30 days." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the core principle of the 'Hierarchy of Controls' when managing hazardous workplace chemicals and environmental risks?",
            "options": [
              "Always buy the cheapest personal protective equipment (PPE) available.",
              "Elimination and Substitution (replacing toxic substances with safer alternatives) and Engineering Controls (bunding, ventilation) must be prioritized before relying on administrative procedures or PPE.",
              "PPE is the only control method recognized by safety law.",
              "Chemical hazards should be hidden from safety inspectors."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "The Hierarchy of Controls prioritizes eliminating or substituting hazards and implementing physical engineering containment, as PPE is the least effective barrier against human exposure.",
            "incorrectExplanation": "Elimination, substitution, and engineering controls provide permanent, systemic protection compared to administrative rules or PPE.",
            "optionFeedback": [
              "Incorrect. PPE is the lowest and least reliable tier in the hierarchy.",
              "Correct! Prioritizing elimination, chemical substitution, and engineering containment creates permanent safety barriers rather than relying on individual PPE compliance.",
              "Incorrect. Safety legislation requires engineering and substitution controls before PPE.",
              "Incorrect. Transparent hazard management is mandatory under OSHA 2005."
            ],
            "practicalTakeaway": "Prioritize chemical substitution and engineering containment over personal protective equipment.",
            "learningOutcome": "Apply Hierarchy of Controls to chemical and environmental hazards",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "How should secondary containment capacity for hazardous liquids and chemicals be determined in Mauritian workplaces?",
            "options": [
              "Bunding is only required for domestic water containers.",
              "Secondary containment should be sized according to the substance, container capacity, site risk assessment, applicable legal requirements and approved technical guidance. A 110% capacity rule is commonly used in some standards and policies, but it must not be presented as a universal Mauritian statutory requirement without a directly applicable provision.",
              "Bunding capacity must equal exactly 10% of container volume under all circumstances.",
              "Chemical drums can be stored directly on open bare soil."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Secondary containment should be sized according to the substance, container capacity, site risk assessment, applicable legal requirements and approved technical guidance. While 110% is common in international standards and site policies, it is not a blanket universal statutory mandate in Mauritian law.",
            "incorrectExplanation": "Secondary containment sizing depends on substance characteristics, risk assessment, and applicable technical standards rather than an assumed universal statutory percentage.",
            "optionFeedback": [
              "Incorrect. Containment is required for hazardous chemicals, fuels, and oils based on risk assessments and safety standards.",
              "Correct! Secondary containment should be sized according to the substance, container capacity, site risk assessment, applicable legal requirements and approved technical guidance. A 110% capacity rule is commonly used in some standards and policies, but it must not be presented as a universal Mauritian statutory requirement without a directly applicable provision.",
              "Incorrect. Arbitrary low percentages do not provide adequate risk-assessed containment.",
              "Incorrect. Storing chemicals on bare soil violates basic environmental duty of care."
            ],
            "practicalTakeaway": "Size secondary containment based on substance risk assessments, site container capacity, and approved technical guidance.",
            "learningOutcome": "Apply secondary containment sizing and compliance standards",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Why is a 16-section Safety Data Sheet (SDS) required to be accessible within 30 seconds at chemical point-of-use workstations?",
            "options": [
              "To give workers reading material during lunch breaks.",
              "Emergency response, medical treatment, fire extinguishing media, and personal protective equipment requirements must be immediately available during chemical spills or worker contamination incidents.",
              "Because SDS documents are used as paper towels to clean spills.",
              "To satisfy international customs export taxes."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "In chemical emergency medical incidents or toxic spills, immediate access to Section 4 (First Aid) and Section 6 (Accidental Release) is life-critical.",
            "incorrectExplanation": "Immediate SDS availability ensures life-saving first aid and emergency spill response protocols are deployed without delay.",
            "optionFeedback": [
              "Incorrect. SDS documents are critical emergency technical reference guides.",
              "Correct! Immediate access to first-aid instructions, toxicological data, and spill response procedures saves lives during chemical emergencies.",
              "Incorrect. Absorbent spill pads must be used for chemical cleanup.",
              "Incorrect. SDS compliance is an occupational safety mandate, not a customs tax."
            ],
            "practicalTakeaway": "Ensure 16-section GHS Safety Data Sheets are accessible at all chemical workstations.",
            "learningOutcome": "Manage chemical Safety Data Sheets (SDS) compliance",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "What is the primary physiological risk of workplace heat strain in tropical island climates when ambient conditions exceed 32°C with high relative humidity (>75%)?",
            "options": [
              "Workers will feel too cold and need winter coats.",
              "High atmospheric humidity prevents sweat from evaporating, disabling the human body's primary cooling mechanism and rapidly elevating core body temperature toward life-threatening heat stroke.",
              "High humidity makes computers run too fast.",
              "Workers will become immune to all physical hazards."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Sweat evaporation is the body's primary mechanism to shed heat; when air is saturated with moisture, evaporative cooling fails, leading to rapid core overheating and heat stroke.",
            "incorrectExplanation": "High humidity prevents sweat evaporation, causing rapid core body temperature elevation toward lethal heat stroke.",
            "optionFeedback": [
              "Incorrect. High ambient temperatures produce severe heat strain, not hypothermia.",
              "Correct! Saturated humidity halts sweat evaporation, causing rapid internal core temperature spikes that trigger heat exhaustion and fatal heat stroke without mandatory shade and hydration.",
              "Incorrect. Electronic equipment requires active cooling, but human biology is paramount.",
              "Incorrect. Heat strain severely impairs physical coordination and cognitive judgment."
            ],
            "practicalTakeaway": "Implement mandatory shaded rest and electrolyte hydration schedules during high-humidity heat conditions.",
            "learningOutcome": "Diagnose occupational heat stress physiology and climate risks",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "What is the first operational action an HSE officer should take when an outdoor worker exhibits signs of heat exhaustion (dizziness, nausea, pale clammy skin, rapid pulse)?",
            "options": [
              "Force the worker to run around the building to cool down.",
              "Move the worker immediately to a cool, shaded or air-conditioned area, loosen tight clothing, apply active cooling (cold damp towels/water misting), and administer cool electrolyte fluids.",
              "Give the worker a double shot of hot espresso.",
              "Leave the worker in the direct sun to rest."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Immediate transfer to shade, active external cooling, and electrolyte rehydration halts progression toward medical emergency heat stroke.",
            "incorrectExplanation": "Immediate relocation to shade, active external cooling, and electrolyte rehydration prevents fatal heat stroke.",
            "optionFeedback": [
              "Incorrect. Physical exertion accelerates heat stroke and cardiovascular collapse.",
              "Correct! Immediate relocation to a cool shaded area, active cooling with damp towels, and electrolyte fluid administration stabilizes the worker and prevents fatal heat stroke.",
              "Incorrect. Caffeine is a diuretic that exacerbates severe dehydration.",
              "Incorrect. Direct sun exposure accelerates core temperature elevation."
            ],
            "practicalTakeaway": "Move heat-exhausted workers to cool shade, apply active cooling, and provide electrolyte hydration immediately.",
            "learningOutcome": "Execute heat exhaustion emergency response protocols",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Why should every decanted chemical spray bottle or secondary container in a workplace have a GHS-compliant label?",
            "options": [
              "To make the spray bottles look uniform on the shelf.",
              "To ensure workers and emergency responders immediately know the chemical identity, hazard class (toxic, corrosive, flammable), and necessary handling precautions, preventing accidental chemical poisoning or dangerous mixing.",
              "Because unlabeled bottles are legally classified as pure drinking water.",
              "To prevent cleaners from using cleaning supplies."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Unlabeled secondary containers cause severe accidents (e.g. mistaking bleach for water or mixing acid and ammonia, producing lethal chloramine gas).",
            "incorrectExplanation": "GHS labeling on secondary containers prevents accidental chemical poisoning, hazardous mixing, and improper emergency response.",
            "optionFeedback": [
              "Incorrect. Labeling is a life-safety requirement, not aesthetic standardization.",
              "Correct! Clear secondary container labeling prevents catastrophic accidental poisoning, chemical burns, or toxic gas generation from incompatible mixing.",
              "Incorrect. Unlabeled bottles remain hazardous chemical substances.",
              "Incorrect. Labels guide safe, proper chemical usage."
            ],
            "practicalTakeaway": "Label all secondary decanted chemical containers with GHS pictograms and hazard statements.",
            "learningOutcome": "Enforce GHS secondary container labeling standards",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "How does an integrated HSE audit benefit organizational risk governance compared to separate safety and environmental inspections?",
            "options": [
              "It eliminates the need to follow any health and safety laws.",
              "It identifies compound hazards (e.g. chemical leaks that threaten worker safety and contaminate soil), streamlines corrective action tracking, and ensures holistic operational compliance.",
              "It requires zero staff time to conduct.",
              "It allows the organization to stop conducting fire drills."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Integrated audits eliminate organizational silos, recognizing that environmental releases almost always originate from physical safety and maintenance failures.",
            "incorrectExplanation": "Integrated HSE audits identify compound hazards, eliminate departmental silos, and provide holistic risk governance.",
            "optionFeedback": [
              "Incorrect. Integrated governance strengthens adherence to all statutory standards.",
              "Correct! Unifying safety and environmental inspections eliminates operational blindspots and resolves compound hazards through integrated corrective actions.",
              "Incorrect. Audits require structured, dedicated inspection time.",
              "Incorrect. Life-safety emergency evacuation drills remain legally mandatory."
            ],
            "practicalTakeaway": "Conduct unified HSE audits to capture compound safety and environmental risks.",
            "learningOutcome": "Execute integrated HSE risk and compliance audits",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Which of the following represents an effective 30-day action commitment for an HSE officer?",
            "options": [
              "Removing all Safety Data Sheets from factory floor workstations.",
              "Conducting an integrated chemical storage and heat stress audit across all operational areas, verifying GHS secondary labeling and risk-assessed secondary containment integrity.",
              "Banning employees from drinking water during working hours.",
              "Disabling all emergency fire alarms."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Auditing chemical labeling, secondary containment sizing, and heat stress hydration zones establishes comprehensive, legally compliant HSE governance.",
            "incorrectExplanation": "Conducting an integrated chemical and heat stress audit establishes robust operational safety and environmental governance.",
            "optionFeedback": [
              "Incorrect. Removing SDS sheets violates OSHA 2005 statutory regulations.",
              "Correct! Auditing chemical storage, risk-assessed secondary containment, and heat stress hydration stations establishes comprehensive, compliant HSE governance.",
              "Incorrect. Restricting water access in tropical workplaces is dangerous and unlawful.",
              "Incorrect. Disabling fire alarms is a critical criminal life-safety breach."
            ],
            "practicalTakeaway": "Conduct an integrated chemical secondary containment and heat stress audit this month.",
            "learningOutcome": "Execute 30-day integrated HSE action commitment",
            "competencyArea": "COMP_COMPLIANCE"
          }
        ]
      },

      # 12. ELH-130: Sustainability Communications & Green Claims (D3)
      {
        "courseCode": "ELH-130",
        "title": "Sustainability Communications & Green Claims",
        "slug": "sustainability-communications-green-claims",
        "description": "Master ethical environmental marketing, anti-greenwashing claim substantiation, lifecycle data verification, ICC Code compliance, and customer ESG disclosures.",
        "fullDescription": "Sustainability Communications & Green Claims trains marketing managers, PR directors, and corporate communications officers to craft legally sound, authentic environmental narratives. Learn how to substantiate product and corporate claims with primary lifecycle assessment (LCA) data and third-party certifications, navigate the International Chamber of Commerce (ICC) Advertising and Marketing Communications Code (Chapter D), align with national consumer protection legislation, avoid misleading greenwashing traps, and build enduring brand reputation.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_GOVERNANCE_ETHICS",
        "secondaryCompetencies": ["COMP_REPORTING", "COMP_LEADERSHIP"],
        "learningObjectives": [
          "Differentiate substantiated environmental claims from deceptive greenwashing under the self-regulatory ICC Code and consumer protection baselines.",
          "Substantiate environmental claims using primary activity data, lifecycle assessments (LCA), and verified third-party certifications.",
          "Structure clear, transparent consumer communications regarding product recyclability, carbon footprint, and circular materials.",
          "Establish internal cross-functional review gates to verify technical evidence before public marketing releases."
        ],
        "intendedRoles": ["Marketing Directors", "Brand Managers", "Corporate Communications Officers", "PR Executives"],
        "badgeName": "Ethical Communications Leader",
        "badgeDescription": "Demonstrated capability in substantiating environmental claims, anti-greenwashing governance, and authentic ESG marketing.",
        "completionMessage": "Congratulations! You have completed Sustainability Communications & Green Claims and are certified in ethical brand governance.",
        "recommendedNextCourseCode": "ELH-131",
        "lessons": [
          {
            "title": "1. The Anti-Greenwashing Governance Framework (ICC Code)",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Understanding the commercial, reputational, and legal risks of unverified environmental claims.",
            "contentBlocks": [
              { "id": "elh130-h1", "type": "heading", "level": 3, "text": "The Legal and Ethical Reality of Green Marketing" },
              { "id": "elh130-t1", "type": "short_text", "position": 1, "bodyText": "Greenwashing — making false, vague, or exaggerated environmental claims — destroys brand trust and exposes organizations to severe commercial and regulatory backlash. The International Chamber of Commerce (ICC) Advertising and Marketing Communications Code (Chapter D) provides a globally recognized self-regulatory framework establishing that all environmental claims must be truthful, non-misleading, and backed by robust scientific evidence. Furthermore, national consumer protection and fair trading laws increasingly prosecute deceptive environmental claims with heavy civil fines and mandatory public retractions." },
              { "id": "elh130-c1", "type": "callout", "variant": "info", "title": "Substantiation Invariant", "bodyText": "Every public environmental claim must be supported by verifiable primary data, registered third-party audit certificates, or peer-reviewed lifecycle analysis before publication." }
            ]
          },
          {
            "title": "2. The Anatomy of Deceptive Claims: Seven Sins of Greenwashing",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Identifying common marketing traps: hidden trade-offs, vague buzzwords, irrelevant certifications, and false neutrality.",
            "contentBlocks": [
              { "id": "elh130-h2", "type": "heading", "level": 3, "text": "Recognizing and Eliminating Misleading Marketing Traps" },
              { "id": "elh130-t2", "type": "short_text", "position": 1, "bodyText": "Marketing teams must audit campaigns against the common traps of greenwashing: (1) **Vagueness**: using broad, undefined buzzwords ('100% Eco-Friendly', 'Pure & Natural', 'Green Choice'); (2) **Hidden Trade-Off**: highlighting one narrow green attribute while concealing massive pollution elsewhere; (3) **No Proof**: claims lacking auditable evidence or independent verification; (4) **False Certifications**: creating custom green logo stickers that mimic official third-party eco-labels; and (5) **Irrelevant Claims**: advertising compliance with standard laws as a voluntary green achievement." },
              { "id": "elh130-c2", "type": "callout", "variant": "tip", "title": "Precision Rule", "bodyText": "Replace vague superlatives with precise factual specifications (e.g. replace '100% Green' with 'Manufactured with 85% solar-generated electricity and 100% FSC-certified recycled paper')." }
            ]
          },
          {
            "title": "3. The 4-Gate Internal Green Claim Verification Workflow",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Instituting technical, legal, and operational review gates before marketing campaign launches.",
            "contentBlocks": [
              { "id": "elh130-h3", "type": "heading", "level": 3, "text": "Bulletproofing Claims Before Public Release" },
              { "id": "elh128-t3", "type": "short_text", "position": 1, "bodyText": "To eliminate greenwashing risks, organizations implement a 4-Gate Claim Sign-Off Process: (1) **Gate 1: Marketing Draft** (defines proposed copy and visual assets); (2) **Gate 2: Technical/Operations Verification** (Facilities, HSE, or Engineering validates that numerical metrics match primary physical metering data); (3) **Gate 3: Legal & Compliance Review** (confirms claim satisfies ICC Code self-regulatory principles and consumer protection statutes); and (4) **Gate 4: Evidence Archiving** (preserves supporting certificates and audit reports in the permanent compliance repository)." },
              { "id": "elh130-c3", "type": "callout", "variant": "action", "title": "Sign-Off Standard", "bodyText": "Never publish sustainability claims without written technical and legal sign-off in your corporate marketing evidence archive." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Green Claims Governance",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate real-world marketing campaign proposals for greenwashing exposure and brand risk.",
            "contentBlocks": [
              {
                "id": "elh130-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Reviewing a Hotel Resort's 'Zero Carbon' Campaign",
                "prompt": "Your marketing agency submits a billboard campaign for your resort featuring the headline: 'Mauritius's First 100% Zero-Carbon, Eco-Paradise Resort' with photos of pristine beaches. The resort installed 50 kWp of solar PV (meeting 8% of site power) and buys uncertified tree-planting promises from an unverified social media group. What is your decision as Brand Director?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Approve the billboard campaign immediately because bold green headlines drive luxury tourism bookings.",
                    "consequence": "Catastrophic greenwashing failure. Investigative journalists and consumer protection watchdogs expose that 92% of resort energy is fossil-fuel grid power, resulting in viral social media exposure, advertising bans, and severe brand boycott.",
                    "feedback": "Claiming '100% Zero Carbon' without verified full-scope net-zero data is blatant deceptive greenwashing.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Reject the headline and rewrite the campaign around verified, factual achievements: 'Our Journey to Sustainability: Powered by 50 kWp On-Site Solar, 100% Solar-Assisted Water Heating, and Zero Single-Use Guest Plastics — Audited by SEMSI Standards'.",
                    "consequence": "Optimal authentic marketing. You deliver a truthful, compelling narrative that highlights real investments, protects brand integrity, and satisfies both ICC ethical codes and consumer protection laws.",
                    "feedback": "Correct! Transparent, fact-based storytelling backed by verified operational data builds enduring brand credibility.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Cancel all marketing and never talk about sustainability again.",
                    "consequence": "Greenhushing failure. Hides genuine sustainability investments and fails to communicate real value to eco-conscious consumers.",
                    "feedback": "Authentic marketing shares verified progress transparently rather than resorting to silence (greenhushing).",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh130-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Packaging Recyclability Claims on Consumer Goods",
                "prompt": "Your consumer packaging team proposes printing a green logo claiming: '100% Recyclable Bottle' on a multi-layer composite pouch that cannot be processed by municipal recycling facilities in Mauritius. What is your governance action?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Approve the label because the pouch is technically recyclable in specialized industrial laboratories in Germany.",
                    "consequence": "Misleading advertising failure. Local consumers cannot recycle the pouch; it ends up in Mare Chicose landfill, triggering complaints to consumer protection authorities for deceptive labeling.",
                    "feedback": "Claiming recyclability when local collection and recycling infrastructure does not exist is a recognized form of misleading greenwash.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Reject the label. Mandate that packaging either transitions to mono-material PET (which is locally recyclable in Mauritius) or clearly states current disposal instructions without deceptive '100% Recyclable' claims.",
                    "consequence": "Optimal packaging governance. You prevent deceptive consumer messaging, ensure compliance with truth-in-advertising guidelines, and drive real engineering transition to recyclable materials.",
                    "feedback": "Excellent! Ensuring claims reflect actual local recycling reality protects consumers and drives authentic circular packaging design.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Marketing Green Claims Audit",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Audit active commercial marketing materials against the ICC Code and anti-greenwashing checklist.",
            "contentBlocks": [
              { "id": "elh130-h4", "type": "heading", "level": 3, "text": "Your Anti-Greenwashing Audit Toolkit" },
              { "id": "elh130-t4", "type": "short_text", "position": 1, "bodyText": "Audit your active commercial collateral: (1) Identify vague superlatives ('green', 'pure', 'zero carbon'); (2) Match every environmental statement against a primary verification certificate; and (3) Establish the 4-Gate Sign-Off Workflow for all upcoming campaigns." },
              { "id": "elh130-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Audit your company's primary website sustainability page and commercial brochure against the 4-Gate Claim Checklist within the next 30 days." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary nature of the ICC Advertising and Marketing Communications Code (Chapter D), and how does it relate to statutory consumer protection law?",
            "options": [
              "The ICC Code is an international criminal statute enforced by the United Nations.",
              "The ICC Code serves as a globally recognized self-regulatory framework establishing ethical standards for truthfulness and evidence; statutory enforcement, fines, and advertising bans operate under national consumer protection and fair trading legislation.",
              "The ICC Code allows companies to make any claims they want without proof.",
              "The ICC Code only applies to television commercials in the United States."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "The ICC Code is an international self-regulatory benchmark for ethical marketing, while legally binding consumer protection regulations and civil penalties operate under national statutory laws.",
            "incorrectExplanation": "The ICC Code is an international self-regulatory framework setting ethical baselines, distinct from national statutory consumer protection legislation.",
            "optionFeedback": [
              "Incorrect. The ICC Code is a voluntary self-regulatory framework, not a criminal statute.",
              "Correct! The ICC Code establishes self-regulatory ethical baselines for marketing substantiation, while statutory penalties are enforced under national consumer protection legislation.",
              "Incorrect. The ICC Code strictly mandates that all claims must be substantiated with sound evidence.",
              "Incorrect. The ICC Code applies globally across all marketing media and communications."
            ],
            "practicalTakeaway": "Align marketing communications with both ICC self-regulatory ethical principles and statutory consumer protection laws.",
            "learningOutcome": "Distinguish ICC self-regulatory codes from statutory consumer protection law",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "Which of the following environmental claims represents classic 'greenwashing' under international marketing standards?",
            "options": [
              "A packaging label stating: 'Manufactured with 70% post-consumer recycled paper, FSC certified (License #12345)'.",
              "A car advertisement claiming a luxury SUV is '100% Eco-Friendly, Pure Green, and Zero-Impact' without any lifecycle data, emissions testing, or third-party verification.",
              "An office printer certified to Energy Star Tier 2 efficiency standards.",
              "A hotel stating it uses 40% solar thermal water heating based on verified sub-meter logs."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Vague, absolute superlatives ('100% Eco-Friendly', 'Zero-Impact') lacking third-party verification or lifecycle data represent blatant greenwashing.",
            "incorrectExplanation": "Unsubstantiated, absolute marketing claims lacking scientific proof constitute greenwashing.",
            "optionFeedback": [
              "Incorrect. Verified FSC claims with license codes are specific and auditable.",
              "Correct! Absolute, vague buzzwords without empirical lifecycle evidence represent classic misleading greenwashing.",
              "Incorrect. Energy Star is an audited, independent efficiency standard.",
              "Incorrect. Factual statements backed by sub-meter logs are authentic and compliant."
            ],
            "practicalTakeaway": "Reject vague buzzwords; substantiate every claim with verified primary metrics.",
            "learningOutcome": "Identify deceptive greenwashing buzzwords and traps",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "Why is claiming a consumer product is '100% Recyclable' considered misleading if local municipal recycling facilities cannot process the material?",
            "options": [
              "Because recycling is illegal in Mauritius.",
              "Truth-in-advertising guidelines require recyclability claims to reflect practical, accessible local recycling infrastructure, rather than theoretical laboratory recyclability in foreign countries.",
              "Because products must be made of pure wood to be recyclable.",
              "Recycling labels are only permitted on glass bottles."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "If local collection and processing infrastructure is inaccessible to the consumer, claiming recyclability misleads the public and leads to municipal landfilling.",
            "incorrectExplanation": "Recyclability claims must reflect practically accessible local recycling infrastructure where the product is sold.",
            "optionFeedback": [
              "Incorrect. Recycling is actively promoted and practiced across Mauritius.",
              "Correct! Recyclability claims must reflect real-world local recycling availability where the consumer purchases and disposes of the product.",
              "Incorrect. Plastics, metals, and paper are recyclable when local facilities exist.",
              "Incorrect. Recyclability claims apply across all qualifying material streams."
            ],
            "practicalTakeaway": "Ensure product recyclability claims match accessible local recycling infrastructure.",
            "learningOutcome": "Evaluate recyclability claims against local infrastructure reality",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "What is 'Greenhushing' in corporate sustainability communications?",
            "options": [
              "Whispering when talking about the environment.",
              "The practice where organizations deliberately conceal or under-report genuine sustainability achievements out of fear of public scrutiny, criticism, or greenwashing allegations.",
              "A corporate policy banning all marketing completely.",
              "A technique used to make air conditioners run quietly."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Greenhushing occurs when companies stay silent about real progress due to fear of criticism, which deprives consumers of factual data and slows industry-wide learning.",
            "incorrectExplanation": "Greenhushing is the deliberate under-communication of real ESG progress due to fear of greenwashing scrutiny.",
            "optionFeedback": [
              "Incorrect. Greenhushing is a recognized corporate communication strategy term.",
              "Correct! Greenhushing refers to organizations concealing authentic ESG progress out of fear of criticism, which hinders transparent market progress.",
              "Incorrect. Greenhushing refers specifically to environmental disclosure silence.",
              "Incorrect. Acoustic dampening is a mechanical engineering discipline."
            ],
            "practicalTakeaway": "Avoid greenhushing: communicate verified, authentic progress transparently with backing evidence.",
            "learningOutcome": "Understand the risks and definition of greenhushing",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "What are the four gates of the 'Internal Green Claim Verification Workflow' before public marketing release?",
            "options": [
              "Drafting, Posting, Deleting, and Apologizing.",
              "Gate 1: Marketing Draft, Gate 2: Technical/Operations Verification, Gate 3: Legal & Compliance Review, and Gate 4: Permanent Evidence Archiving.",
              "Gate 1: Facebook, Gate 2: Instagram, Gate 3: TikTok, and Gate 4: LinkedIn.",
              "There are zero gates required for marketing releases."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "A 4-Gate review ensures marketing copy is technically verified by engineering, legally vetted against advertising standards, and supported by archived evidence.",
            "incorrectExplanation": "The 4-Gate framework (Draft, Technical Verification, Legal Review, Evidence Archiving) bulletproofs public claims against greenwashing.",
            "optionFeedback": [
              "Incorrect. Professional governance prevents deceptive claims before publication.",
              "Correct! Moving through marketing draft, technical verification, legal review, and evidence archiving ensures zero greenwashing exposure.",
              "Incorrect. Social media channels are publishing outputs, not verification gates.",
              "Incorrect. Rigorous verification is mandatory to protect corporate brand equity."
            ],
            "practicalTakeaway": "Institute the 4-Gate Claim Verification Workflow for all public marketing campaigns.",
            "learningOutcome": "Apply 4-Gate Green Claim Verification Workflows",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "Why is claiming 'Carbon Neutrality' based solely on unverified, cheap tree-planting certificates a high brand risk?",
            "options": [
              "Because trees do not absorb carbon dioxide.",
              "Unverified offsets frequently suffer from lack of additionality, double-counting, or premature tree mortality; regulatory bodies and consumer watchdogs penalize unverified neutrality claims as deceptive greenwash.",
              "Because carbon offsets are strictly illegal in all countries.",
              "Trees grow too fast to be counted."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "High-integrity carbon claims require prioritized operational decarbonization paired exclusively with certified, third-party verified carbon credit retirements (e.g. Gold Standard, Verra).",
            "incorrectExplanation": "Unverified offsets lack permanence and additionality, exposing organizations to regulatory sanctions and public greenwashing scandals.",
            "optionFeedback": [
              "Incorrect. Forests absorb carbon, but offset credits require rigorous verification of permanence and additionality.",
              "Correct! Unverified carbon offsets frequently fail additionality audits, exposing organizations to devastating greenwashing investigations and reputational loss.",
              "Incorrect. Verified carbon credits are recognized under international compliance frameworks.",
              "Incorrect. Forestry carbon accounting uses standardized biometric growth curves."
            ],
            "practicalTakeaway": "Never claim carbon neutrality without primary operational reduction and certified, retired carbon credits.",
            "learningOutcome": "Evaluate risks of unverified carbon neutrality claims",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "How should a commercial marketing campaign describe a product's environmental improvements truthfully without exaggerating?",
            "options": [
              "Claim the product has saved planet Earth from destruction.",
              "State exact factual metrics and comparative baselines (e.g. 'Reduces packaging plastic by 35% compared to our 2025 container, verified by weight telemetry').",
              "Add pictures of cute animals to the product label without explanatory text.",
              "Use green leaf clipart on all marketing materials."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Factual, comparative metrics specifying exact percentage reductions and verified baselines inform consumers truthfully without hyperbole.",
            "incorrectExplanation": "Factual specifications with clear baseline comparisons communicate authentic value without deceptive exaggeration.",
            "optionFeedback": [
              "Incorrect. Exaggerated claims destroy consumer trust.",
              "Correct! Factual statements with exact percentages and explicit baselines provide transparent, legally compliant product information.",
              "Incorrect. Animal imagery without evidence is classic emotional greenwashing.",
              "Incorrect. Visual green imagery without substance misleads consumers."
            ],
            "practicalTakeaway": "State exact percentage improvements against explicit, documented baselines.",
            "learningOutcome": "Craft precise, substantiated product claims",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "Which of the following represents an effective 30-day workplace action commitment for a marketing communications manager?",
            "options": [
              "Publishing an advertising campaign with unverified green claims.",
              "Auditing current website and sales collateral against the ICC Anti-Greenwashing checklist and establishing a mandatory 4-Gate technical sign-off procedure with operations.",
              "Refusing to communicate with customers about company products.",
              "Deleting all corporate marketing archives."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Auditing active collateral and establishing a formal 4-Gate technical sign-off workflow institutes lasting ethical marketing governance.",
            "incorrectExplanation": "Auditing marketing collateral and implementing a 4-Gate technical sign-off procedure establishes robust brand governance.",
            "optionFeedback": [
              "Incorrect. Unverified campaigns create severe regulatory and brand risk.",
              "Correct! Auditing active sales collateral and implementing the 4-Gate sign-off procedure establishes bulletproof, ethical marketing governance.",
              "Incorrect. Transparent customer communication is essential for business growth.",
              "Incorrect. Preserving marketing archives is necessary for evidence traceability."
            ],
            "practicalTakeaway": "Audit your active marketing collateral and institute the 4-Gate sign-off procedure this month.",
            "learningOutcome": "Execute 30-day green communications action plan",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          }
        ]
      }
    ]

print("Wave 3A Module 3 ready.")
