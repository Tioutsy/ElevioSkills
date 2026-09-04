import { RemediatedCourseDataBatch3E } from "./batch3e_part1";

export const BATCH3E_DATA_C: RemediatedCourseDataBatch3E[] = [
  // 15. ELH-123
  {
    courseCode: "ELH-123",
    title: "Managing Capital Expenditure (CapEx) for Energy Retrofits",
    slug: "managing-capex-energy-retrofits",
    description: "Master financial modeling for energy efficiency CapEx, Net Present Value (NPV), Internal Rate of Return (IRR), Marginal Abatement Cost Curves (MACC), Energy Performance Contracting (EPC / ESCO models), and green bond financing.",
    fullDescription: "This advanced financial and engineering course equips corporate finance directors, energy managers, and sustainability leaders to build bankable investment cases for commercial and industrial energy retrofits. It covers capital budgeting methodologies, sensitivity modeling, carbon shadow pricing, Energy Service Company (ESCO) shared-savings contracts, and green debt instruments under international climate finance taxonomies.",
    categoryId: 12,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_FINANCE",
    secondaryCompetencies: ["COMP_ENERGY_EFFICIENCY", "COMP_STRATEGY"],
    learningObjectives: [
      "Construct detailed Discounted Cash Flow (DCF), NPV, IRR, and Simple/Discounted Payback models for multi-technology energy retrofits.",
      "Develop Marginal Abatement Cost Curves (MACC) to rank and prioritize decarbonization capital investments by cost-effectiveness ($/tCO2e).",
      "Structure Energy Performance Contracts (EPC) with guaranteed vs. shared savings models and Measurement & Verification (IPMVP) protocols.",
      "Integrate internal carbon shadow pricing into corporate capital budgeting hurdle rate calculations.",
      "Formulate a 30-day bankable CapEx investment memorandum and C-suite funding pitch."
    ],
    intendedRoles: [
      "Chief Financial Officers & Finance Directors",
      "Energy & Facilities Capital Planners",
      "Sustainability Investment Managers",
      "Commercial Real Estate Asset Managers"
    ],
    badgeName: "Energy Retrofit Capital & Finance Specialist",
    badgeDescription: "Demonstrates applied mastery in energy efficiency financial modeling, MACC prioritization, ESCO contract structuring, and CapEx justification.",
    completionMessage: "Congratulations! You have completed Managing Capital Expenditure (CapEx) for Energy Retrofits. You are equipped to structure and finance high-yield energy efficiency investments.",
    recommendedNextCourseCode: "ELH-126",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: The Rejected Chiller Retrofit Proposal in Ebène",
        durationMinutes: 4,
        content: "A facilities manager in Cybercity Ébène submits a $450,000 CapEx request to replace three failing, 18-year-old R22 chillers with magnetic-bearing variable speed chillers that will cut building electricity by 40%. The CFO rejects the request within 10 minutes because the memo only contained a simple 1-paragraph summary stating a '4.2-year payback,' with zero Net Present Value (NPV) modeling, no lifecycle cash flow discount rates, and no risk sensitivity analysis. The building continues wasting $110,000 annually in excess power. Energy leaders must master financial modeling to win executive capital approvals.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Technical energy savings must be translated into rigorous financial metrics (NPV, IRR, cash flow projections) that speak the exact language of the CFO and Investment Committee."
          },
          {
            type: "callout",
            style: "warning",
            title: "The Simple Payback Fallacy",
            content: "Simple payback ignores the time value of money, equipment operational lifespan (15–25 years), escalating utility tariffs, and post-payback cash flow generation, leading to the rejection of highly profitable long-term assets."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: DCF, NPV, IRR & Marginal Abatement Cost Curves (MACC)",
        durationMinutes: 4,
        content: "Calculate Net Present Value (NPV = ∑ [Ct / (1 + r)^t] - C0) using the corporate Weighted Average Cost of Capital (WACC) as the discount rate. Construct Marginal Abatement Cost Curves (MACC): calculate the net cost per metric ton of carbon abated: MAC ($/tCO2e) = (Annualized CapEx + Annual OpEx - Annual Energy Cost Savings) ÷ Annual GHG Reduced (tCO2e). Negative MAC projects generate net financial profits while slashing emissions.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "MACC curves visually rank energy retrofit projects from most financially profitable (negative cost per ton abated) to high-cost strategic investments."
          },
          {
            type: "table",
            title: "Energy Retrofit Financial Decision Matrix",
            headers: ["Metric", "Formula / Concept", "Target Benchmark", "CFO Decision Role"],
            rows: [
              ["Net Present Value (NPV)", "Discounted lifetime cash flows minus CapEx", "NPV > 0 (Maximize $)", "Primary capital allocation metric"],
              ["Internal Rate of Return (IRR)", "Discount rate where NPV = 0", "IRR > WACC + Hurdle Rate (e.g. >15%)", "Measures investment return percentage"],
              ["Marginal Abatement Cost (MAC)", "Net annualized cost per ton CO2e reduced", "< $0 / tCO2e (Net profitable)", "Prioritizes decarbonization capital"],
              ["Discounted Payback", "Years until cumulative discounted cash flow ≥ 0", "< 5 to 7 years", "Measures capital liquidity risk"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: ESCO Models, IPMVP & Internal Carbon Shadow Pricing",
        durationMinutes: 4,
        content: "Overcome balance sheet CapEx constraints through Energy Performance Contracts (EPC) with Energy Service Companies (ESCOs): 1. Guaranteed Savings (client funds CapEx, ESCO guarantees performance); 2. Shared Savings (ESCO funds 100% of CapEx off-balance sheet and splits verified savings). Implement the International Performance Measurement and Verification Protocol (IPMVP) to calibrate baseline weather-normalized energy adjustments. Apply an internal carbon shadow price ($50–$100/tCO2e) to credit carbon savings directly in project NPV models.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "IPMVP Option B and Option C protocols ensure that utility savings are mathematically proven against weather and occupancy variations, preventing contract disputes."
          },
          {
            type: "callout",
            style: "tip",
            title: "Off-Balance Sheet ESCO Advantage",
            content: "Shared-savings ESCO financing allows corporations with constrained capital budgets to execute massive energy retrofits immediately with zero upfront cash outlay."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Industrial Chiller & Heat Recovery Financing Strategy",
        durationMinutes: 4,
        content: "A pharmaceutical manufacturing plant in Plaine Magnien must upgrade its industrial central refrigeration and boiler plant ($1.2M CapEx). The project delivers $280,000 in annual energy savings (IRR 21%, NPV $820,000 at 8% WACC). However, corporate executive management has capped internal capital budgets due to expansion investments elsewhere. The energy director must choose a funding pathway. How should the team proceed?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A high-ROI energy retrofit project is blocked by internal corporate capital budget caps.",
            options: [
              {
                id: "A",
                text: "Structure a Shared-Savings Energy Performance Contract (EPC) with a certified ESCO, which funds 100% of the $1.2M CapEx off-balance sheet and splits verified energy savings 70/30 for 7 years.",
                outcome: "Optimal. Executes the critical retrofit immediately with zero internal CapEx, captures $84,000/yr in net cash flow from day one, and transfers equipment performance risk to the ESCO."
              },
              {
                id: "B",
                text: "Cancel the energy project and continue running failing, inefficient equipment that risks factory shutdown.",
                outcome: "Severe Operational Risk. Leads to sudden catastrophic chiller failure, stopping all pharmaceutical manufacturing."
              },
              {
                id: "C",
                text: "Take out an illegal loan from loan sharks at 80% monthly interest.",
                outcome: "Criminal & Financial Ruin. Destroys corporate solvency and creates severe legal liability."
              },
              {
                id: "D",
                text: "Turn off all cooling systems in the drug production cleanrooms.",
                outcome: "Catastrophic. Ruins millions of dollars in pharmaceutical products and loses GMP license."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Bankable CapEx Investment Memorandum",
        durationMinutes: 4,
        content: "Formulate a 30-day bankable energy retrofit investment proposal. Conduct an ASHRAE Level 2 technical energy audit, build a 15-year DCF model with Monte Carlo sensitivity analysis on electricity tariffs, calculate project Marginal Abatement Cost ($/tCO2e), and draft a formal Investment Memorandum for the Board of Directors. Earn the Energy Retrofit Capital & Finance Specialist badge and proceed to ELH-126.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "A bankable investment memorandum includes technical specifications, verified utility baselines, detailed sensitivity tables, and IPMVP measurement protocols."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Deepen your technical facilities execution with ELH-126: Facilities Energy Management for Specialists."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "Why is Net Present Value (NPV) superior to Simple Payback Period when evaluating energy efficiency capital investments?",
        options: [
          "NPV accounts for the time value of money, the full operational lifespan of the asset (e.g. 15–20 years), and post-payback cash flow generation, whereas simple payback ignores all cash flows after the payback cutoff.",
          "Simple payback requires complex quantum physics algorithms that computers cannot calculate.",
          "NPV is only used for purchasing office furniture.",
          "Simple payback is legally prohibited by the International Monetary Fund."
        ],
        correctOption: 0,
        correctExplanation: "Simple payback fails to distinguish between an asset that lasts 4 years vs. 20 years. NPV captures the full lifecycle cash flow value discounted at the corporate cost of capital.",
        incorrectExplanation: "NPV captures the full lifecycle cash flows discounted by the cost of capital, whereas simple payback ignores cash flows beyond the break-even date.",
        optionFeedback: [
          "Correct. NPV evaluates the true lifetime financial value created across the entire operating lifespan of the asset.",
          "Incorrect. Simple payback is elementary arithmetic, but flawed for capital allocation decisions.",
          "Incorrect. NPV is the universal standard for all corporate capital allocation and infrastructure investments.",
          "Incorrect. Simple payback is widely used, though financially incomplete."
        ],
        practicalTakeaway: "Use NPV and IRR as the primary financial metrics for energy retrofit capital allocation proposals.",
        learningOutcome: "Calculate and compare Net Present Value (NPV) and Simple Payback for energy investments.",
        competencyArea: "COMP_FINANCE"
      },
      {
        orderIndex: 2,
        question: "What does a negative Marginal Abatement Cost (e.g., -$45 / tCO2e) indicate on a corporate MACC curve?",
        options: [
          "The energy efficiency project is net profitable over its lifecycle, saving more money in operational utility costs than it costs to implement while reducing emissions.",
          "The project releases negative matter into the atmosphere.",
          "The company will be fined $45 per ton by the government.",
          "The project increases carbon emissions by 45 tons every month."
        ],
        correctOption: 0,
        correctExplanation: "Negative cost on a MACC curve means the net present value of energy savings exceeds the capital and operating costs of the intervention, representing a net financial gain per ton of carbon reduced.",
        incorrectExplanation: "Negative abatement cost indicates that the intervention generates positive net financial returns while abating carbon.",
        optionFeedback: [
          "Correct. Negative MACC projects are win-win: they reduce carbon emissions while generating net financial profits.",
          "Incorrect. MACC is an economic metric, not a physical particle physics phenomenon.",
          "Incorrect. Negative cost is an internal financial benefit, not a regulatory fine.",
          "Incorrect. MACC measures emissions reduction, not emissions increase."
        ],
        practicalTakeaway: "Prioritize projects with negative Marginal Abatement Costs to fund corporate decarbonization.",
        learningOutcome: "Construct and interpret Marginal Abatement Cost Curves (MACC) for capital prioritization.",
        competencyArea: "COMP_FINANCE"
      },
      {
        orderIndex: 3,
        question: "In an Energy Performance Contract (EPC) using the 'Shared Savings' model, who provides the upfront capital and how is the investment repaid?",
        options: [
          "The Energy Service Company (ESCO) funds 100% of the upfront CapEx and is repaid through a predetermined percentage split of verified energy cost savings over the contract term.",
          "The client's frontline employees pay for the equipment out of their personal savings.",
          "The municipal government donates the equipment for free without any contracts.",
          "The equipment manufacturer gives the machinery away in exchange for lottery tickets."
        ],
        correctOption: 0,
        correctExplanation: "Shared savings EPCs allow clients to implement major retrofits with zero upfront capital; the ESCO finances the project and recovers its investment plus return from verified energy bill savings.",
        incorrectExplanation: "Under shared savings, the ESCO finances the upfront capital and receives a share of verified savings.",
        optionFeedback: [
          "Correct. Shared savings transfers upfront capital funding and technical performance risk to the ESCO.",
          "Incorrect. Capital investments are corporate financings, not employee personal contributions.",
          "Incorrect. Municipalities do not provide free commercial HVAC equipment.",
          "Incorrect. ESCOs operate on commercial contracts, not games of chance."
        ],
        practicalTakeaway: "Leverage shared-savings ESCO models to execute large-scale energy retrofits with zero upfront CapEx.",
        learningOutcome: "Structure Energy Performance Contracts (EPC) under guaranteed and shared savings models.",
        competencyArea: "COMP_FINANCE"
      },
      {
        orderIndex: 4,
        question: "What is the primary role of the International Performance Measurement and Verification Protocol (IPMVP) in energy retrofit projects?",
        options: [
          "It provides standardized, internationally recognized methodologies for calculating and verifying baseline energy adjustments and post-retrofit savings.",
          "It measures the architectural beauty of building facades.",
          "It tracks the daily commute times of office workers.",
          "It sets statutory minimum wage rates for HVAC contractors."
        ],
        correctOption: 0,
        correctExplanation: "IPMVP (EVO standard) defines four M&V options (A, B, C, D) to adjust baseline energy for weather, occupancy, and operating hours, providing transparent proof of energy savings for ESCO billing.",
        incorrectExplanation: "IPMVP provides the global standard for measuring, calculating, and verifying energy retrofit savings.",
        optionFeedback: [
          "Correct. IPMVP provides transparent, standardized proof of energy savings, preventing contract disputes.",
          "Incorrect. IPMVP measures thermodynamic energy savings, not architectural aesthetics.",
          "Incorrect. Employee commuting is an HR/Scope 3 metric, not IPMVP building M&V.",
          "Incorrect. Wage rates are governed by labor law, not energy verification protocols."
        ],
        practicalTakeaway: "Include certified IPMVP Measurement & Verification protocols in all energy performance contracts.",
        learningOutcome: "Apply IPMVP protocols (Options A, B, C, D) to verify energy savings.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 5,
        question: "What is an Internal Carbon Shadow Price in corporate capital budgeting?",
        options: [
          "A theoretical financial cost assigned per metric ton of CO2e ($/tCO2e) added to project financial models to penalize carbon-intensive CapEx and favor low-carbon investments.",
          "A secret tax paid to offshore bank accounts in cash.",
          "The cost of buying black paint for office roofs.",
          "The price of electricity during nighttime hours."
        ],
        correctOption: 0,
        correctExplanation: "Internal shadow pricing embeds climate risk into DCF models. By adding e.g. $75/tCO2e to operational models, energy-efficient and renewable projects show higher NPV, winning capital allocation.",
        incorrectExplanation: "Internal carbon shadow pricing factors climate risk directly into investment decision hurdle rates.",
        optionFeedback: [
          "Correct. Shadow carbon pricing tilts capital allocation toward energy-efficient, low-carbon investments.",
          "Incorrect. Shadow pricing is an internal decision modeling tool, not an illegal offshore transaction.",
          "Incorrect. Shadow pricing relates to greenhouse gas emissions, not physical paint colors.",
          "Incorrect. Nighttime electricity is governed by time-of-use tariffs, not carbon shadow pricing."
        ],
        practicalTakeaway: "Incorporate an internal carbon shadow price ($50–$100/tCO2e) into capital budgeting models.",
        learningOutcome: "Apply internal carbon shadow pricing in corporate capital investment appraisals.",
        competencyArea: "COMP_STRATEGY"
      },
      {
        orderIndex: 6,
        question: "Why should Monte Carlo sensitivity analysis be applied to energy retrofit financial models?",
        options: [
          "To test project NPV and IRR resilience across hundreds of simulated variations in utility electricity tariffs, weather extremes, equipment degradation rates, and interest rates.",
          "To gamble company pension funds in casino games.",
          "To predict the exact stock market price of competitor firms 50 years in the future.",
          "To eliminate the need for engineering calculations."
        ],
        correctOption: 0,
        correctExplanation: "Monte Carlo simulation stress-tests financial models against uncertainty, giving the CFO probability distributions (e.g. 95% confidence that NPV exceeds $500k) rather than a single static guess.",
        incorrectExplanation: "Monte Carlo analysis models probability distributions across fluctuating economic and operating variables.",
        optionFeedback: [
          "Correct. Sensitivity simulations quantify investment risk and prove project financial robustness to CFOs.",
          "Incorrect. Monte Carlo is a statistical mathematical method, not gambling with corporate assets.",
          "Incorrect. Long-term individual stock prices cannot be deterministically predicted.",
          "Incorrect. Statistical simulations build upon rigorous thermodynamic engineering baselines."
        ],
        practicalTakeaway: "Include Monte Carlo sensitivity tables in capital proposals to prove financial resilience.",
        learningOutcome: "Perform financial risk and sensitivity analysis on energy retrofit cash flows.",
        competencyArea: "COMP_FINANCE"
      },
      {
        orderIndex: 7,
        question: "What is an ASHRAE Level 2 Energy Audit, and why is it required before approving major retrofit CapEx?",
        options: [
          "A detailed engineering audit providing quantified energy breakdowns by end-use, utility bill regression analysis, on-site measurements, and verified investment-grade CapEx/OpEx cost estimates.",
          "A quick 5-minute walk through the lobby looking at lightbulbs.",
          "A government inspection checking fire extinguisher inspection tags.",
          "An accounting audit of executive lunch expenses."
        ],
        correctOption: 0,
        correctExplanation: "ASHRAE Level 2 audits provide the detailed engineering data, sub-system measurements, and financial calculations required to establish a bankable baseline before committing capital.",
        incorrectExplanation: "ASHRAE Level 2 audits deliver detailed engineering analysis and investment-grade financial estimates.",
        optionFeedback: [
          "Correct. Level 2 audits deliver the empirical engineering rigour required to justify major capital expenditure.",
          "Incorrect. A 5-minute walk is a preliminary Level 1 walkthrough, insufficient for CapEx sign-off.",
          "Incorrect. Fire inspections verify life-safety codes, not thermal energy thermodynamics.",
          "Incorrect. Expense audits review financial receipts, not building mechanical energy flows."
        ],
        practicalTakeaway: "Commission an ASHRAE Level 2 audit to provide investment-grade data for CapEx proposals.",
        learningOutcome: "Evaluate energy audit scopes and investment-grade data requirements.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 8,
        question: "What is the primary deliverable of a 30-day energy retrofit CapEx approval sprint?",
        options: [
          "A comprehensive Bankable Investment Memorandum containing an ASHRAE Level 2 audit baseline, DCF/NPV/IRR models, MACC carbon abatement scoring, and an ESCO contracting options analysis.",
          "A signed memo canceling all energy maintenance for the next 20 years.",
          "A verbal hallway conversation with the CFO asking for $1,000,000 in cash without documentation.",
          "A proposal to convert all company offices into open-air tents."
        ],
        correctOption: 0,
        correctExplanation: "A bankable investment memorandum compiles empirical engineering audits, rigorous financial models, risk sensitivity analyses, and contracting options into an executive-ready proposal.",
        incorrectExplanation: "CapEx approval requires a comprehensive investment memorandum, DCF models, and risk analysis.",
        optionFeedback: [
          "Correct. A complete investment memorandum with DCF models and MACC scores secures board approval.",
          "Incorrect. Canceling maintenance causes catastrophic equipment failure and asset write-downs.",
          "Incorrect. Undocumented verbal requests are immediately rejected by corporate governance controls.",
          "Incorrect. Unrealistic proposals destroy executive credibility."
        ],
        practicalTakeaway: "Deliver a structured, bankable Investment Memorandum with DCF, NPV, and MACC models.",
        learningOutcome: "Formulate a bankable CapEx investment memorandum for energy efficiency retrofits.",
        competencyArea: "COMP_FINANCE"
      }
    ]
  },

  // 16. ELH-124
  {
    courseCode: "ELH-124",
    title: "Executive Climate Governance & Net-Zero Strategy",
    slug: "executive-climate-governance-net-zero-strategy",
    description: "Master board-level climate governance, TCFD / ISSB S2 disclosure, climate scenario analysis (1.5°C vs. 3°C physical and transition risks), Science Based Targets (SBTi), and net-zero corporate strategy.",
    fullDescription: "This executive-level course equips board directors, Chief Sustainability Officers, and C-suite leaders to govern climate risks and architect credible corporate net-zero transition plans. It covers fiduciary climate duties, Board committee oversight structures, ISSB S2 climate reporting, IPCC / NGFS climate scenario modeling, SBTi net-zero target setting, carbon pricing governance, and climate-linked executive remuneration.",
    categoryId: 12,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_GOVERNANCE_ETHICS",
    secondaryCompetencies: ["COMP_STRATEGY", "COMP_RISK_MANAGEMENT"],
    learningObjectives: [
      "Establish board-level climate governance structures, chartering Board Sustainability Committees and defining fiduciary oversight.",
      "Conduct 1.5°C and >3°C climate scenario analysis across Physical (chronic/acute) and Transition (policy, market, legal, tech) risks.",
      "Formulate corporate Science Based Targets (SBTi) with validated near-term (2030) and long-term (2050) net-zero decarbonization trajectories.",
      "Design climate-linked executive incentive compensation frameworks tied to verified GHG reduction milestones.",
      "Formulate a 30-day executive Climate Transition Plan (CTP) and Board governance roadmap."
    ],
    intendedRoles: [
      "Board Directors & Audit Committee Chairs",
      "Chief Sustainability Officers (CSO)",
      "Chief Executive Officers (CEO) & Chief Risk Officers (CRO)",
      "Corporate Strategy & Investor Relations Directors"
    ],
    badgeName: "Executive Climate Governance & Strategy Lead",
    badgeDescription: "Demonstrates applied mastery in board climate governance, TCFD/ISSB scenario analysis, SBTi transition planning, and executive net-zero strategy.",
    completionMessage: "Congratulations! You have completed Executive Climate Governance & Net-Zero Strategy. You are equipped to lead boardrooms and steer organizations toward climate-resilient net-zero prosperity.",
    recommendedNextCourseCode: "ELH-114",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: The Hostile Shareholder Climate Resolution in Port Louis",
        durationMinutes: 4,
        content: "At the Annual General Meeting (AGM) of a major diversified conglomerate in Port Louis, an alliance of international institutional investors files a hostile shareholder resolution. The resolution challenges the Board's lack of climate competence, points out that the company's 'Net-Zero 2050' claim has no interim 2030 targets and no scenario modeling under TCFD/ISSB standards, and votes against re-electing the Audit Committee Chair. The Board realizes that climate governance is no longer a corporate PR issue—it is a binding fiduciary duty directly tied to access to capital and director liability.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Institutional investors and global financial regulators increasingly view climate change as a core material risk that must be governed at the highest Board level."
          },
          {
            type: "callout",
            style: "danger",
            title: "Fiduciary Director Liability",
            content: "Board directors who fail to identify, manage, and disclose material climate risks face shareholder derivative lawsuits, proxy voting revolts, and regulatory sanctions."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: Fiduciary Climate Duties & TCFD / ISSB S2 Governance",
        durationMinutes: 4,
        content: "Evaluate board governance against the four core pillars of TCFD and ISSB S2: Governance (board oversight & management role), Strategy (climate resilience across short, medium, long terms), Risk Management (integration into enterprise risk management - ERM), and Metrics & Targets (Scope 1, 2, 3 emissions and transition milestones). Categorize climate risks into Physical Risks (acute cyclones/floods, chronic sea-level rise/heat) and Transition Risks (carbon taxes, policy bans, market shifts, stranded assets).",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Effective climate governance requires appointing climate-competent independent directors and embedding climate KPIs into executive remuneration."
          },
          {
            type: "table",
            title: "TCFD / ISSB S2 Climate Risk Taxonomy",
            headers: ["Risk Category", "Specific Risk Type", "Business Impact Example", "Board Mitigation Strategy"],
            rows: [
              ["Physical Risk", "Acute Extreme Weather", "Cyclone damage to coastal hotels/ports", "Infrastructure hardening, 72-hr autonomy"],
              ["Physical Risk", "Chronic Climate Shifts", "Prolonged agricultural drought & heat stress", "Water recycling, drought-resilient crops"],
              ["Transition Risk", "Policy & Legal (Carbon Tax)", "Introduction of national carbon price or CBAM", "Internal shadow carbon pricing, rapid energy efficiency"],
              ["Transition Risk", "Market & Technology", "Fossil fuel equipment becoming stranded assets", "SBTi transition plan, phasing out high-carbon assets"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: IPCC / NGFS Scenario Analysis & SBTi Net-Zero Architecture",
        durationMinutes: 4,
        content: "Execute 2-degree and 1.5-degree climate scenario analysis using Network for Greening the Financial System (NGFS) and IPCC SSP pathways: model financial stress tests across 'Orderly Net Zero 2050', 'Disorderly Late Transition', and 'Hot House World (>3°C)'. Formulate Science Based Targets under the SBTi Corporate Net-Zero Standard: commit to a minimum 4.2% annual Scope 1 & 2 reduction for near-term 2030 targets and >90% absolute decarbonization before neutralizing residual emissions with permanent carbon removals.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "SBTi explicitly prohibits using carbon offsets to meet near-term decarbonization targets; true net-zero requires direct, verifiable operational emission cuts."
          },
          {
            type: "callout",
            style: "tip",
            title: "Climate Remuneration Links",
            content: "Tie 15–25% of executive Long-Term Incentive Plans (LTIP) directly to audited Scope 1, 2, and 3 reduction targets to guarantee executive focus and strategic alignment."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Stranded Asset Write-Down vs. Fossil Fuel Investment",
        durationMinutes: 4,
        content: "An industrial group's energy division proposes investing $40M into expanding a heavy-fuel-oil (HFO) thermal power plant with a 25-year design life. Scenario analysis shows that expected regional carbon pricing ($60/tCO2e by 2030) and European Carbon Border Adjustment Mechanisms (CBAM) will make the plant uncompetitive within 6 years, turning it into a stranded asset. The Board of Directors must vote on the capital allocation proposal. How should the Board decide?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A 25-year fossil fuel capital expansion faces severe stranded asset risk under carbon pricing scenarios.",
            options: [
              {
                id: "A",
                text: "Reject the HFO plant expansion, reallocating the $40M into utility-scale solar PV, battery storage, and biomass co-generation aligned with SBTi 1.5°C pathways.",
                outcome: "Optimal. Protects shareholder capital from multi-million-dollar stranded asset write-downs, eliminates CBAM export penalties, and accelerates corporate net-zero leadership."
              },
              {
                id: "B",
                text: "Approve the HFO plant and hide the climate scenario analysis report from shareholders.",
                outcome: "Severe Breach of Fiduciary Duty. Exposes directors to personal lawsuits for fraudulent non-disclosure and locks the company into massive financial losses."
              },
              {
                id: "C",
                text: "Dissolve the company immediately and liquidate all corporate assets in a fire sale.",
                outcome: "Destructive. Destroys enterprise value and violates board duties to maximize sustainable shareholder prosperity."
              },
              {
                id: "D",
                text: "Ignore all climate data and operate the plant until the building catches fire.",
                outcome: "Catastrophic. Creates extreme physical and financial ruin."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Climate Transition Plan & Governance Roadmap",
        durationMinutes: 4,
        content: "Formulate a 30-day Executive Climate Governance & Transition Plan. Establish a formal Board Sustainability Committee Charter, execute a quantitative TCFD/ISSB scenario analysis workshop with the executive committee, submit a formal commitment letter to the Science Based Targets initiative (SBTi), and link executive LTIP compensation to verified carbon milestones. Earn the Executive Climate Governance & Strategy Lead badge and proceed to ELH-114.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "A published, board-approved Climate Transition Plan (CTP) provides institutional investors with the transparency required to maintain long-term equity and debt capital flows."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Ensure your ESG reporting and data controls meet audit standards with ELH-114: ESG Data Assurance & Audit Readiness."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "Under the ISSB S2 and TCFD frameworks, what are the four fundamental pillars of corporate climate disclosure?",
        options: [
          "Governance, Strategy, Risk Management, and Metrics & Targets.",
          "Marketing, Advertising, Sponsorship, and Public Relations.",
          "Purchasing, Invoicing, Billing, and Debt Collection.",
          "Design, Construction, Demolition, and Landfilling."
        ],
        correctOption: 0,
        correctExplanation: "TCFD and ISSB S2 organize climate reporting around Governance (board/management oversight), Strategy (scenario resilience), Risk Management (ERM integration), and Metrics & Targets (GHG accounting and net-zero goals).",
        incorrectExplanation: "The four core pillars of TCFD/ISSB S2 are Governance, Strategy, Risk Management, and Metrics & Targets.",
        optionFeedback: [
          "Correct. Governance, Strategy, Risk Management, and Metrics & Targets form the universal global climate reporting structure.",
          "Incorrect. PR and marketing are promotional activities, not institutional climate governance frameworks.",
          "Incorrect. Commercial billing is an operational accounting workflow.",
          "Incorrect. Construction/demolition is an engineering lifecycle, not a corporate governance framework."
        ],
        practicalTakeaway: "Structure corporate climate reports around the four core pillars: Governance, Strategy, Risk Management, and Metrics.",
        learningOutcome: "Structure executive climate governance and reporting under TCFD and ISSB S2 standards.",
        competencyArea: "COMP_GOVERNANCE_ETHICS"
      },
      {
        orderIndex: 2,
        question: "In corporate climate risk management, what constitutes a 'Transition Risk'?",
        options: [
          "Business and financial risks arising from the societal, policy, legal, technological, and market shifts required to transition to a low-carbon global economy (e.g. carbon pricing, fossil fuel phase-outs).",
          "The physical risk of floodwater entering a basement during a cyclone.",
          "The risk of an employee transitioning from one department to another.",
          "The risk of a computer operating system rebooting."
        ],
        correctOption: 0,
        correctExplanation: "Transition risks encompass regulatory changes (carbon taxes), technological shifts (renewables replacing fossil fuels), market demand shifts, and legal liabilities associated with decarbonization.",
        incorrectExplanation: "Transition risks stem from policy, market, legal, and technology changes during the shift to a low-carbon economy.",
        optionFeedback: [
          "Correct. Transition risks arise from carbon taxes, regulatory bans, market demand shifts, and stranded fossil assets.",
          "Incorrect. Cyclone flooding is a Physical Climate Risk (acute hazard).",
          "Incorrect. Internal HR departmental transfers are standard personnel workflows.",
          "Incorrect. IT rebooting is an operational software maintenance event."
        ],
        practicalTakeaway: "Evaluate transition risks (carbon pricing, regulatory bans) across corporate strategy scenarios.",
        learningOutcome: "Differentiate between physical and transition climate risks under international frameworks.",
        competencyArea: "COMP_RISK_MANAGEMENT"
      },
      {
        orderIndex: 3,
        question: "What is a 'Stranded Asset' in climate financial analysis?",
        options: [
          "An asset (e.g., fossil fuel power plant, uninsulated building) that suffers premature write-downs, devaluations, or liabilities due to regulatory changes, carbon pricing, or technological obsolescence.",
          "A ship that is temporarily anchored in a harbor during calm weather.",
          "A computer keyboard that has run out of battery power.",
          "A bank branch that is closed on Sunday."
        ],
        correctOption: 0,
        correctExplanation: "Stranded assets lose economic viability before the end of their anticipated physical design life due to the global low-carbon transition, creating massive balance sheet write-downs.",
        incorrectExplanation: "Stranded assets suffer unanticipated write-downs or devaluation due to climate transition factors.",
        optionFeedback: [
          "Correct. Stranded assets are high-carbon investments rendered economically obsolete by the net-zero transition.",
          "Incorrect. Anchored ships are operational maritime assets, not stranded financial investments.",
          "Incorrect. Battery depletion is a minor consumable maintenance issue.",
          "Incorrect. Standard weekend branch scheduling does not constitute asset stranding."
        ],
        practicalTakeaway: "Conduct scenario testing on long-lived capital assets to prevent multi-million-dollar stranded asset write-downs.",
        learningOutcome: "Identify and mitigate corporate stranded asset risks in capital allocation decisions.",
        competencyArea: "COMP_STRATEGY"
      },
      {
        orderIndex: 4,
        question: "Under the Science Based Targets initiative (SBTi) Corporate Net-Zero Standard, what is the rule regarding the use of carbon offsets for meeting near-term (2030) targets?",
        options: [
          "Carbon offsets cannot be counted toward achieving near-term emission reduction targets; companies must achieve direct operational decarbonization within their value chains.",
          "Companies can buy 100% cheap offsets and continue increasing their fossil fuel emissions indefinitely.",
          "Carbon offsets are mandatory for every employee each month.",
          "Offsets must be printed on physical paper and framed in the boardroom."
        ],
        correctOption: 0,
        correctExplanation: "SBTi requires companies to achieve deep direct emissions reductions (typically >4.2% annually for Scope 1 & 2) within their value chains. Offsets are only permitted to neutralize residual emissions (<10%) at the final net-zero date.",
        incorrectExplanation: "SBTi requires direct value-chain decarbonization; carbon offsets cannot replace near-term emission cuts.",
        optionFeedback: [
          "Correct. SBTi mandates direct operational emission reductions, prohibiting offsets as a substitute for real cuts.",
          "Incorrect. Using offsets while expanding fossil emissions violates SBTi standards and constitutes greenwashing.",
          "Incorrect. Offsets are voluntary market instruments, not individual mandatory employee requirements.",
          "Incorrect. Framing certificates does not fulfill science-based decarbonization criteria."
        ],
        practicalTakeaway: "Focus corporate climate strategy on direct value-chain decarbonization rather than offset purchasing.",
        learningOutcome: "Apply SBTi Corporate Net-Zero criteria to corporate emission reduction targets.",
        competencyArea: "COMP_STRATEGY"
      },
      {
        orderIndex: 5,
        question: "How does linking executive compensation (LTIP) to verified climate KPIs improve corporate governance?",
        options: [
          "It directly aligns executive personal financial incentives with long-term corporate decarbonization and climate risk mitigation, overcoming short-term quarterly profit bias.",
          "It guarantees that executives will receive double their salary regardless of corporate performance.",
          "It replaces all corporate financial accounting with social media followers.",
          "It allows executives to avoid paying national income taxes."
        ],
        correctOption: 0,
        correctExplanation: "Tying 15–25% of executive bonuses/LTIP to audited Scope 1, 2, and 3 reduction milestones ensures leadership prioritizes capital allocation toward sustainable, long-term resilience.",
        incorrectExplanation: "Climate-linked remuneration aligns executive incentives with multi-year sustainability and net-zero goals.",
        optionFeedback: [
          "Correct. Climate-linked LTIPs align leadership incentives with multi-year decarbonization milestones.",
          "Incorrect. Remuneration links require verified achievement of targets; they are not unconditional payouts.",
          "Incorrect. Financial accounting remains paramount alongside non-financial ESG metrics.",
          "Incorrect. Executive compensation remains fully subject to statutory national income taxation."
        ],
        practicalTakeaway: "Implement climate-linked KPIs (15–25% weighting) in executive Long-Term Incentive Plans.",
        learningOutcome: "Design executive remuneration frameworks aligned with corporate climate targets.",
        competencyArea: "COMP_GOVERNANCE_ETHICS"
      },
      {
        orderIndex: 6,
        question: "What is the purpose of conducting climate scenario analysis across both '1.5°C Orderly' and 'Hot House World (>3°C)' pathways?",
        options: [
          "To stress-test business model resilience against two distinct futures: one dominated by aggressive transition policies and carbon prices (1.5°C), and one dominated by catastrophic physical climate destruction (>3°C).",
          "To predict the exact weather on a specific Tuesday 30 years from now.",
          "To determine what color executives should paint their office walls.",
          "To prove that climate change has zero impact on financial profitability."
        ],
        correctOption: 0,
        correctExplanation: "Scenario analysis is not weather forecasting—it tests corporate resilience against structural transition risks (under 1.5°C rapid policy shifts) versus severe physical asset damage (under >3°C global warming).",
        incorrectExplanation: "Scenario analysis evaluates business model viability under varying policy, market, and physical climate futures.",
        optionFeedback: [
          "Correct. Scenario modeling stress-tests corporate balance sheets against divergent policy and physical climate futures.",
          "Incorrect. Scenario analysis models macro-economic and physical trends, not daily weather forecasts.",
          "Incorrect. Paint aesthetics have zero relevance to climate financial scenario analysis.",
          "Incorrect. Scenario testing exposes material financial vulnerabilities to physical and transition risks."
        ],
        practicalTakeaway: "Conduct scenario analysis across both 1.5°C transition and >3°C physical risk trajectories.",
        learningOutcome: "Execute quantitative and qualitative climate scenario analysis using NGFS and IPCC pathways.",
        competencyArea: "COMP_RISK_MANAGEMENT"
      },
      {
        orderIndex: 7,
        question: "What is the primary role of a Board Sustainability Committee in corporate governance?",
        options: [
          "To provide dedicated board-level oversight of sustainability strategy, climate risks, ESG reporting integrity, stakeholder engagement, and executive accountability.",
          "To organize company holiday parties and purchase birthday cakes.",
          "To personally clean company restrooms on weekends.",
          "To delete all public records of company environmental performance."
        ],
        correctOption: 0,
        correctExplanation: "A Board Sustainability Committee ensures that ESG and climate issues receive structured, dedicated oversight at the highest governance level, reporting directly to the full Board of Directors.",
        incorrectExplanation: "The Board Sustainability Committee provides dedicated strategic oversight of ESG and climate governance.",
        optionFeedback: [
          "Correct. Board committees provide rigorous oversight of sustainability strategy, climate risk, and reporting.",
          "Incorrect. Social party planning is an internal employee engagement activity, not a Board governance duty.",
          "Incorrect. Facilities operations manage building cleanliness, not Board directors.",
          "Incorrect. Deleting public records breaches corporate disclosure laws and destroys transparency."
        ],
        practicalTakeaway: "Establish a dedicated Board Sustainability Committee with an explicit charter and independent experts.",
        learningOutcome: "Draft Board Sustainability Committee charters and define governance oversight workflows.",
        competencyArea: "COMP_GOVERNANCE_ETHICS"
      },
      {
        orderIndex: 8,
        question: "What is the primary deliverable of a 30-day Executive Climate Governance and Transition Plan sprint?",
        options: [
          "A formal Board Sustainability Committee Charter, a documented TCFD/ISSB scenario analysis stress test, a signed SBTi commitment submission, and a climate-linked executive remuneration framework.",
          "A signed memo permanently banning all discussion of climate change in the company.",
          "An order to fire all corporate auditors and cancel annual financial reports.",
          "A public marketing campaign claiming net-zero without any Board approvals or data."
        ],
        correctOption: 0,
        correctExplanation: "An executive climate sprint establishes board governance charters, runs empirical scenario stress tests, commits to SBTi science-based targets, and embeds climate milestones into executive compensation.",
        incorrectExplanation: "Executive climate governance delivers formal charters, scenario modeling, SBTi commitments, and remuneration links.",
        optionFeedback: [
          "Correct. Formal charters, scenario models, SBTi targets, and executive remuneration links establish world-class governance.",
          "Incorrect. Banning climate discussions breaches fiduciary duty and guarantees regulatory penalties.",
          "Incorrect. Canceling audits violates stock exchange listing rules and corporate law.",
          "Incorrect. Public claims without board approval and empirical data constitute corporate greenwashing."
        ],
        practicalTakeaway: "Deliver an executive transition plan with board charters, scenario models, and SBTi targets.",
        learningOutcome: "Formulate and execute a structured 30-day executive Climate Transition Plan (CTP).",
        competencyArea: "COMP_GOVERNANCE_ETHICS"
      }
    ]
  },

  // 17. ELH-125
  {
    courseCode: "ELH-125",
    title: "Occupational Health, Safety & Environmental Systems",
    slug: "occupational-health-safety-environmental-systems",
    description: "Master integrated EHS management systems, ISO 45001 & ISO 14001 certification, Hierarchy of Hazard Controls, process safety management (HAZOP), workplace ergonomics, and safety culture maturity.",
    fullDescription: "This advanced course trains environmental health and safety (EHS) managers, industrial plant directors, and corporate compliance leads to build integrated EHS management systems conforming to ISO 45001 (Occupational Health & Safety) and ISO 14001 (Environmental Management). It covers Hazard Identification and Risk Assessment (HIRA), incident root cause analysis (RCA), chemical process safety, emergency response drills, and safety leadership culture.",
    categoryId: 12,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_HEALTH_SAFETY",
    secondaryCompetencies: ["COMP_COMPLIANCE", "COMP_RISK_MANAGEMENT"],
    learningObjectives: [
      "Design and operationalize an Integrated Management System (IMS) aligning ISO 45001 and ISO 14001 requirements.",
      "Apply the 5-step Hierarchy of Hazard Controls (Elimination, Substitution, Engineering, Administrative, PPE).",
      "Conduct rigorous Incident Root Cause Analysis (5-Why, Fishbone, TapRooT) to eliminate recurring workplace hazards.",
      "Perform Hazard Identification and Risk Assessments (HIRA / HAZOP) across industrial and commercial facilities.",
      "Formulate a 30-day EHS compliance audit, leading safety indicator dashboard, and emergency response plan."
    ],
    intendedRoles: [
      "EHS Directors & Safety Managers",
      "Industrial Plant & Operations Leaders",
      "Environmental Compliance Officers",
      "Facility & Risk Management Specialists"
    ],
    badgeName: "Integrated EHS Systems Specialist",
    badgeDescription: "Demonstrates applied mastery in ISO 45001/14001 integration, Hierarchy of Controls, incident root cause investigation, and EHS compliance governance.",
    completionMessage: "Congratulations! You have completed Occupational Health, Safety & Environmental Systems. You are equipped to safeguard workforce lives and lead world-class integrated EHS operations.",
    recommendedNextCourseCode: "ELH-129",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: The Confined Space Chemical Near-Miss in Port Louis",
        durationMinutes: 4,
        content: "During routine maintenance of an industrial wastewater storage tank in Port Louis, two contractors enter the confined space without atmospheric gas testing or a valid Permit to Work (PTW). Within minutes, toxic hydrogen sulfide (H2S) gas buildup overcomes the first worker; the second worker collapses while attempting an unequipped rescue. A passing safety supervisor activates emergency extraction fans and initiates rescue protocols, narrowly averting a double fatality. The factory faces a comprehensive safety shutdown. EHS leaders must implement uncompromising integrated safety systems.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Occupational safety and environmental protection are non-negotiable operational imperatives. Every workplace incident is preventable through systematic hazard control."
          },
          {
            type: "callout",
            style: "danger",
            title: "Permit to Work (PTW) Failure",
            content: "Bypassing confined space entry protocols, lockout/tagout (LOTO), or hot work permits creates immediate, catastrophic life-safety hazards and criminal liability."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: ISO 45001 & ISO 14001 Integrated Management Systems",
        durationMinutes: 4,
        content: "Integrate ISO 45001 (Occupational Health & Safety) and ISO 14001 (Environmental Management) using the High-Level Structure (Plan-Do-Check-Act). Apply the Hierarchy of Hazard Controls: 1. Elimination (physically remove hazard); 2. Substitution (replace with safer chemical/process); 3. Engineering Controls (isolate people from hazard via guards/ventilation); 4. Administrative Controls (change the way people work via training/procedures); 5. PPE (protect worker with personal equipment - least effective).",
        contentBlocks: [
          {
            type: "paragraph",
            content: "PPE is the last line of defense and should never be used as a substitute for elimination or engineering hazard controls."
          },
          {
            type: "table",
            title: "The Hierarchy of Hazard Controls",
            headers: ["Control Level", "Mechanism", "Workplace Example", "Reliability & Effectiveness"],
            rows: [
              ["1. Elimination", "Physically remove the hazard", "Eliminating manual lifting by automating pallet conveyance", "Highest (100% hazard removal)"],
              ["2. Substitution", "Replace with safer material/process", "Replacing solvent paints with water-based non-toxic coatings", "High (Removes toxicity risk)"],
              ["3. Engineering", "Isolate people from the hazard", "Installing machine interlocking guards and LEV extraction fans", "High (Controls hazard at source)"],
              ["4. Administrative", "Change work methods & policies", "Permit to Work (PTW) system, LOTO training, rotation schedules", "Moderate (Relies on human compliance)"],
              ["5. PPE", "Protect worker with equipment", "Safety glasses, respirators, steel-toe boots, earplugs", "Lowest (Fails if worn incorrectly)"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: Incident Root Cause Analysis (RCA) & Leading Indicators",
        durationMinutes: 4,
        content: "Shift from lagging indicators (Lost Time Injury Frequency Rate - LTIFR) to Leading Safety Indicators (EHS audits completed, near-miss reports resolved, safety observations logged). When incidents occur, conduct structured Root Cause Analysis (RCA) using the 5-Why method and Ishikawa (Fishbone) diagrams to uncover systemic management failures (e.g. lack of maintenance, inadequate training) rather than blaming operator error.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Blaming human error stops the investigation before finding the systemic management and engineering flaws that allowed the error to occur."
          },
          {
            type: "callout",
            style: "tip",
            title: "Near-Miss Reporting Culture",
            content: "Encourage a no-blame near-miss reporting culture. Investigating 100 near-misses prevents 10 minor injuries and 1 catastrophic fatality (Heinrich's Safety Triangle)."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Factory Machine Guarding Bypassed for Speed",
        durationMinutes: 4,
        content: "A high-speed metal stamping press in a manufacturing plant in Triolet has its optical light-curtain interlock deliberately bypassed with electrical tape by a shift supervisor to increase hourly production throughput by 15%. An EHS specialist discovers the bypass during a morning floor walk. The production supervisor argues that re-enabling the safety interlock will cause the shift to miss critical customer delivery deadlines. How should the EHS specialist respond?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A machine safety light-curtain interlock is bypassed to increase production output.",
            options: [
              {
                id: "A",
                text: "Immediately stop the machine using the emergency stop button, lock out the control panel, re-enable the safety interlock, and initiate a disciplinary safety investigation regarding deliberate bypass of safety controls.",
                outcome: "Optimal. Eliminates an imminent amputation/death hazard, reinforces zero-tolerance safety culture, and protects workers and management from criminal negligence."
              },
              {
                id: "B",
                text: "Allow the machine to run without guards until the end of the month to hit delivery targets.",
                outcome: "Severe Violation. Results in catastrophic worker hand amputation, severe criminal prosecution, and immediate factory closure."
              },
              {
                id: "C",
                text: "Instruct operators to close their eyes while operating the unguarded press.",
                outcome: "Absurd & Fatal. Multiplies accident severity and guarantees immediate catastrophic injury."
              },
              {
                id: "D",
                text: "Destroy the EHS audit report and pretend nothing was seen.",
                outcome: "Criminal Complicity. Makes the safety officer criminally liable for subsequent worker injuries."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Integrated EHS Audit & Action Plan",
        durationMinutes: 4,
        content: "Formulate a 30-day Integrated EHS Management action plan. Conduct an ISO 45001/14001 gap audit, build a high-risk task HIRA register with strict LOTO/PTW controls, deploy a digital leading-indicator safety dashboard, and conduct an unannounced evacuation and chemical spill drill. Earn the Integrated EHS Systems Specialist badge and proceed to ELH-129.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Proactive EHS management systems protect the organization's most valuable asset—its people—while guaranteeing legal environmental compliance."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Advance your environmental compliance mastery with ELH-129: Environmental Risk & Compliance Management."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "In the Hierarchy of Hazard Controls, which level of control is considered the MOST effective at protecting workers?",
        options: [
          "Elimination (physically removing the hazard completely from the workplace).",
          "Personal Protective Equipment (PPE) such as safety goggles and gloves.",
          "Administrative controls such as posting a warning sign.",
          "Giving workers an annual lecture on being careful."
        ],
        correctOption: 0,
        correctExplanation: "Elimination physically removes the hazard at the source, making accidents impossible. PPE is the lowest and least reliable control because it relies entirely on human behavior and equipment fit.",
        incorrectExplanation: "Elimination is the most effective hazard control; PPE is the last line of defense.",
        optionFeedback: [
          "Correct. Elimination removes the hazard completely, providing 100% foolproof protection.",
          "Incorrect. PPE is the least effective control, placed at the bottom of the hierarchy.",
          "Incorrect. Administrative warnings rely on human memory and compliance, which can fail.",
          "Incorrect. Verbal lectures do not remove physical hazards from the workplace."
        ],
        practicalTakeaway: "Always prioritize Elimination, Substitution, and Engineering controls over PPE.",
        learningOutcome: "Apply the 5-step Hierarchy of Hazard Controls to workplace health and safety hazards.",
        competencyArea: "COMP_HEALTH_SAFETY"
      },
      {
        orderIndex: 2,
        question: "What is the primary difference between ISO 45001 and ISO 14001 management systems?",
        options: [
          "ISO 45001 governs Occupational Health and Safety (protecting workers from injuries and illness), whereas ISO 14001 governs Environmental Management (protecting air, water, land, and ecosystems).",
          "ISO 45001 is for restaurants only, while ISO 14001 is for spaceships.",
          "ISO 45001 requires zero documentation, while ISO 14001 requires 50,000 pages.",
          "There is no difference; they are duplicate copies of the same standard."
        ],
        correctOption: 0,
        correctExplanation: "ISO 45001 focuses on workforce health and safety; ISO 14001 focuses on organizational environmental impact. Both share the same Annex SL High-Level Structure for seamless integration.",
        incorrectExplanation: "ISO 45001 focuses on occupational health and safety, while ISO 14001 governs environmental management.",
        optionFeedback: [
          "Correct. ISO 45001 protects human workers, while ISO 14001 protects the natural environment.",
          "Incorrect. Both standards apply across all industrial, commercial, and service sectors.",
          "Incorrect. Both standards require documented information and operational control procedures.",
          "Incorrect. They are distinct international standards addressing different risk domains."
        ],
        practicalTakeaway: "Integrate ISO 45001 and ISO 14001 into a unified EHS management system.",
        learningOutcome: "Differentiate and integrate ISO 45001 (OH&S) and ISO 14001 (Environmental) management systems.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 3,
        question: "What is a 'Leading Safety Indicator' in EHS performance management?",
        options: [
          "A proactive, predictive metric that tracks preventive activities (e.g. number of safety audits completed, hazard reports resolved, training hours) before an accident occurs.",
          "The number of workers hospitalized after a catastrophic explosion.",
          "The total financial cost of hospital bills paid this year.",
          "The speed of the ambulance responding to an emergency call."
        ],
        correctOption: 0,
        correctExplanation: "Leading indicators measure proactive preventive actions that eliminate hazards before accidents occur. Hospitalizations and injuries are Lagging indicators (measuring past failures).",
        incorrectExplanation: "Leading indicators measure proactive preventive actions taken to prevent future incidents.",
        optionFeedback: [
          "Correct. Leading indicators track proactive safety activities that prevent injuries before they happen.",
          "Incorrect. Hospitalizations are lagging indicators measuring after-the-fact trauma.",
          "Incorrect. Financial claims are lagging financial outcome metrics.",
          "Incorrect. Emergency response speed is an emergency response metric, not a leading preventive indicator."
        ],
        practicalTakeaway: "Manage safety performance primarily through proactive leading indicators rather than lagging injury rates.",
        learningOutcome: "Design and track leading vs. lagging EHS performance indicators.",
        competencyArea: "COMP_RISK_MANAGEMENT"
      },
      {
        orderIndex: 4,
        question: "What is the primary purpose of a Lockout/Tagout (LOTO) system in industrial machinery maintenance?",
        options: [
          "To physically isolate and lock all hazardous energy sources (electrical, pneumatic, hydraulic, thermal) with a padlock before servicing machinery, preventing accidental startup.",
          "To lock the factory doors so employees cannot go home.",
          "To label toolboxes with operator names.",
          "To turn off office computer screens during lunch breaks."
        ],
        correctOption: 0,
        correctExplanation: "LOTO ensures that machines cannot be energized while technicians are inside or working on moving parts, preventing electrocution, crushing, and amputation fatalities.",
        incorrectExplanation: "LOTO physically isolates and de-energizes hazardous energy sources during maintenance.",
        optionFeedback: [
          "Correct. LOTO is a life-critical standard preventing unexpected release of hazardous energy during servicing.",
          "Incorrect. LOTO locks machine energy isolators, never building emergency exit doors.",
          "Incorrect. Tool labeling is 5S organization, not hazardous energy isolation.",
          "Incorrect. Screen savers manage computer display sleep, not high-voltage industrial energy."
        ],
        practicalTakeaway: "Enforce zero-tolerance Lockout/Tagout (LOTO) protocols for all machine maintenance activities.",
        learningOutcome: "Specify and audit Lockout/Tagout (LOTO) hazardous energy control systems.",
        competencyArea: "COMP_HEALTH_SAFETY"
      },
      {
        orderIndex: 5,
        question: "During an Incident Root Cause Analysis (RCA), why is concluding that 'the accident was caused by operator carelessness' an unacceptable finding?",
        options: [
          "It fails to identify the underlying systemic root causes (e.g., poor machine design, missing physical interlocks, lack of training, fatigue, production pressure) that allowed the mistake to occur.",
          "Because human beings never make mistakes.",
          "Because operator carelessness is legally protected by the constitution.",
          "Because writing the word 'careless' causes computer printers to jam."
        ],
        correctOption: 0,
        correctExplanation: "Human error is a symptom of deeper systemic flaws. Effective RCA investigates why the system allowed human error to cause harm, fixing procedures, physical guards, and training.",
        incorrectExplanation: "Attributing incidents solely to human error ignores deeper management and engineering system failures.",
        optionFeedback: [
          "Correct. Blaming human error hides systemic design flaws and guarantees identical future accidents.",
          "Incorrect. Humans make mistakes; resilient safety systems design engineering controls that tolerate human error.",
          "Incorrect. Safety analysis focuses on system reliability and prevention, not constitutional law.",
          "Incorrect. Printer mechanics are completely unrelated to safety analysis methodology."
        ],
        practicalTakeaway: "Apply the 5-Why methodology to identify organizational and engineering root causes rather than blaming individuals.",
        learningOutcome: "Conduct incident root cause analysis using 5-Why and Fishbone diagrams.",
        competencyArea: "COMP_RISK_MANAGEMENT"
      },
      {
        orderIndex: 6,
        question: "What is mandatory before any worker enters a 'Confined Space' (e.g. storage tank, sewer vault, boiler)?",
        options: [
          "A formal Confined Space Permit to Work (PTW), continuous atmospheric gas testing (O2, LEL, H2S, CO), forced mechanical ventilation, a designated external standby attendant, and rescue equipment.",
          "Taking a deep breath and running in as fast as possible without telling anyone.",
          "Wearing sunglasses and leather shoes.",
          "Signing an agreement waving all human rights."
        ],
        correctOption: 0,
        correctExplanation: "Confined spaces are deadly due to oxygen deficiency or toxic gas accumulation. Strict PTW, multi-gas detection, forced ventilation, and external standby observers are mandatory life-safety rules.",
        incorrectExplanation: "Confined space entry strictly requires formal PTW, atmospheric testing, forced ventilation, and standby watchers.",
        optionFeedback: [
          "Correct. Atmospheric testing, PTW, forced ventilation, and standby rescue watchers are mandatory for confined spaces.",
          "Incorrect. Unmonitored entry into confined spaces is the leading cause of multiple workplace asphyxiation fatalities.",
          "Incorrect. Sunglasses and leather shoes provide zero respiratory protection against toxic gases.",
          "Incorrect. Safety rights and statutory protections cannot be waived under labor law."
        ],
        practicalTakeaway: "Enforce strict Confined Space Permit to Work, multi-gas testing, and standby watcher protocols.",
        learningOutcome: "Audit and enforce confined space entry and high-risk Permit to Work (PTW) protocols.",
        competencyArea: "COMP_HEALTH_SAFETY"
      },
      {
        orderIndex: 7,
        question: "What does Heinrich's Safety Triangle demonstrate regarding workplace accident frequency?",
        options: [
          "For every 1 major catastrophic injury or fatality, there are approximately 29 minor injuries and 300 near-miss unsafe acts/hazards; reporting and eliminating near-misses prevents fatalities.",
          "Triangles are the only legal architectural shape for factory buildings.",
          "Accidents are entirely random and cannot be prevented by any human action.",
          "Only three people in any company are allowed to report safety hazards."
        ],
        correctOption: 0,
        correctExplanation: "Heinrich's Triangle establishes that major fatalities are preceded by hundreds of minor near-misses. Proactively capturing and resolving near-misses eliminates the base of the triangle, preventing fatal events.",
        incorrectExplanation: "Heinrich's Triangle demonstrates that resolving frequent near-misses prevents rare major catastrophic injuries.",
        optionFeedback: [
          "Correct. Eliminating near-misses and unsafe conditions prevents major injuries and fatalities.",
          "Incorrect. Heinrich's model is a statistical safety pyramid, not a building construction geometry rule.",
          "Incorrect. Accidents follow predictable root causes and are preventable through hazard controls.",
          "Incorrect. All employees must be empowered and encouraged to report hazards."
        ],
        practicalTakeaway: "Encourage universal near-miss reporting to eliminate hazards before they escalate into injuries.",
        learningOutcome: "Analyze safety incident statistical distributions and Heinrich's triangle principles.",
        competencyArea: "COMP_HEALTH_SAFETY"
      },
      {
        orderIndex: 8,
        question: "What is the primary deliverable of a 30-day Integrated EHS operational improvement sprint?",
        options: [
          "A completed ISO 45001/14001 gap audit, an updated High-Risk Task HIRA Register, a live Leading Safety Indicator Dashboard, and a documented emergency drill report.",
          "A signed memo permanently banning all safety inspections in the plant.",
          "A marketing press release declaring zero accidents without conducting any safety audits.",
          "An order to destroy all chemical safety data sheets (SDS)."
        ],
        correctOption: 0,
        correctExplanation: "An EHS operational sprint delivers verified management system gap audits, quantified hazard registers (HIRA), real-time leading indicator dashboards, and practical emergency response drill records.",
        incorrectExplanation: "EHS improvement requires empirical gap audits, HIRA registers, leading indicator tracking, and drills.",
        optionFeedback: [
          "Correct. Gap audits, HIRA registers, leading dashboards, and emergency drills establish robust EHS systems.",
          "Incorrect. Banning inspections violates labor laws and creates extreme accident hazards.",
          "Incorrect. PR claims without underlying audits constitute dangerous corporate greenwashing.",
          "Incorrect. Destroying Safety Data Sheets (SDS) is an illegal hazardous materials violation."
        ],
        practicalTakeaway: "Deliver an integrated EHS gap audit, HIRA register, leading indicator dashboard, and emergency drill.",
        learningOutcome: "Formulate and execute a structured 30-day integrated EHS operational improvement plan.",
        competencyArea: "COMP_COMPLIANCE"
      }
    ]
  },

  // 18. ELH-126
  {
    courseCode: "ELH-126",
    title: "Facilities Energy Management for Specialists",
    slug: "facilities-energy-management-specialists",
    description: "Master commercial facility energy management, ISO 50001 Energy Management Systems (EnMS), Building Management System (BMS) optimization, HVAC chiller plant efficiency (kW/RT), compressed air leak audits, and peak load shaving.",
    fullDescription: "This advanced technical engineering course trains facility managers, building services engineers, and energy auditors to optimize energy performance in commercial buildings and industrial estates. It covers ISO 50001 Energy Management Systems, chilled water plant coefficient of performance (COP / kW/RT), variable primary pumping, compressed air ultrasonic leak audits, motor VFD optimization, and automated demand response.",
    categoryId: 12,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_ENERGY_EFFICIENCY",
    secondaryCompetencies: ["COMP_OPERATIONS", "COMP_FINANCE"],
    learningObjectives: [
      "Implement an ISO 50001 certified Energy Management System (EnMS) with validated Energy Baselines (EnB) and Energy Performance Indicators (EnPI).",
      "Audit and optimize centralized chilled water plants to achieve world-class efficiency (<0.65 kW/RT or COP > 5.4).",
      "Conduct ultrasonic compressed air leak audits, quantifying wasted kWh and CFM losses across industrial distribution manifolds.",
      "Optimize Building Management System (BMS) control algorithms: static pressure reset, chilled water supply temp reset, and enthalpy economizer cycles.",
      "Formulate a 30-day facility energy efficiency audit and continuous optimization roadmap."
    ],
    intendedRoles: [
      "Commercial Facility Managers",
      "Building Services & MEP Engineers",
      "Certified Energy Managers (CEM)",
      "Industrial Utility Plant Supervisors"
    ],
    badgeName: "Facilities Energy Management Specialist",
    badgeDescription: "Demonstrates applied mastery in ISO 50001 EnMS, chiller plant efficiency (<0.65 kW/RT), BMS control optimization, and industrial utility auditing.",
    completionMessage: "Congratulations! You have completed Facilities Energy Management for Specialists. You are equipped to optimize facility utilities and achieve world-class building energy efficiency.",
    recommendedNextCourseCode: "ELH-123",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: The Degraded Chiller Plant in Cybercity",
        durationMinutes: 4,
        content: "A 15,000 m² office complex in Cybercity Ébène consumes $35,000 monthly in electricity. An energy audit reveals that the central chilled water plant is operating at an efficiency of 1.15 kW per Refrigeration Ton (kW/RT)—nearly double the modern high-performance benchmark of 0.60 kW/RT. The primary pumps run at constant full speed, condenser water approach temperatures are 6°C above design due to bio-fouled cooling towers, and chilled water bypass valves leak 25% of chilled flow. The facility wastes $120,000 annually. Facility engineers must systematically optimize plant controls and heat transfer.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Centralized HVAC chiller plants represent 50–70% of total commercial building electrical consumption; optimizing plant efficiency yields the single largest energy savings opportunity."
          },
          {
            type: "callout",
            style: "warning",
            title: "The kW/RT Efficiency Metric",
            content: "Lower kW/RT indicates higher efficiency. Improving plant efficiency from 1.10 kW/RT to 0.65 kW/RT slashes chiller electricity bills by over 40% immediately."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: ISO 50001 EnMS, EnB & Energy Performance Indicators (EnPI)",
        durationMinutes: 4,
        content: "Deploy ISO 50001 Energy Management Systems: establish an Energy Baseline (EnB) using multivariable regression modeling weather (Cooling Degree Days - CDD) and building occupancy. Track normalized Energy Performance Indicators (EnPIs: kWh/m²/CDD, kW/RT, kWh/ton of product). Identify Significant Energy Uses (SEUs): typically centralized chillers, air compressors, boiler feed pumps, and high-intensity lighting circuits.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Weather normalization ensures that energy efficiency improvements are separated from random weather fluctuations or changes in tenant occupancy."
          },
          {
            type: "table",
            title: "Facility Energy Performance Benchmarks",
            headers: ["Sub-System", "Inefficient Benchmark", "Good Practice", "World-Class Benchmark"],
            rows: [
              ["Water-Cooled Chiller Plant", ">1.05 kW/RT (COP < 3.3)", "0.75–0.85 kW/RT (COP 4.2)", "<0.60 kW/RT (COP > 5.8)"],
              ["Compressed Air System Leakage", ">30% of total CFM capacity", "15–20% leakage rate", "<5% monitored with ultrasound"],
              ["Lighting Power Density (LPD)", ">12 W/m² (Fluorescent T8)", "6–8 W/m² (Standard LED)", "<4.0 W/m² (Smart DALI LED + daylight)"],
              ["Electric Motor Efficiency", "IE1 / IE2 Standard", "IE3 Premium Efficiency", "IE4 Super Premium / IE5 SynRM"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: BMS Dynamic Optimization & Compressed Air Leak Audits",
        durationMinutes: 4,
        content: "Implement advanced BMS optimization strategies: 1. Chilled Water Supply Temperature Reset (raise CHW temp from 6.5°C to 8.5°C during low outdoor load, saving 2% chiller energy per °C); 2. Duct Static Pressure Reset (modulate supply fan VFDs based on terminal VAV damper positions); 3. Cooling Tower Approach Control. In industrial areas, perform ultrasonic leak surveys on 7-bar compressed air lines: a single 3mm leak wastes $2,400 annually in electricity.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Compressed air is the most expensive industrial utility; only 10–15% of electrical energy input becomes useful mechanical air power, the rest is rejected as heat."
          },
          {
            type: "callout",
            style: "tip",
            title: "Variable Primary Pumping (VPF)",
            content: "Converting primary-secondary pumping loops to Variable Primary Flow (VPF) with smart differential pressure controls eliminates redundant secondary pump energy and lowers piping losses."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Chiller Plant Sequencing and VFD Retrofit",
        durationMinutes: 4,
        content: "A commercial hospital in Flacq operates two 300 RT centrifugal chillers with constant-speed motors. The plant currently runs both chillers at 40% part-load simultaneously, causing low-efficiency surge conditions and consuming 1.18 kW/RT. The facility director must choose whether to install variable frequency drives (VFDs) on the chiller compressors paired with smart staging controls or continue manual staging. How should the team proceed?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A hospital chiller plant runs inefficiently at part-load with constant-speed compressors.",
            options: [
              {
                id: "A",
                text: "Install VFDs on the centrifugal compressors and implement automated BMS staging: run one chiller at optimal 75–85% load and only stage the second chiller when load exceeds 90%, dropping plant efficiency to 0.62 kW/RT with an 18-month payback.",
                outcome: "Optimal. Eliminates low-load surge, optimizes part-load lift, slashes hospital electricity bills by $72,000/yr, and extends compressor asset lifespan."
              },
              {
                id: "B",
                text: "Turn off all hospital cooling completely and open windows in patient operating rooms.",
                outcome: "Severe Health Hazard. Violates infection control standards, allows airborne contamination into sterile suites, and endangers patients."
              },
              {
                id: "C",
                text: "Keep running both chillers at 35% load without maintenance until compressors burn out.",
                outcome: "Severe Financial Waste. Causes premature mechanical catastrophic failure and locks in massive utility overcharges."
              },
              {
                id: "D",
                text: "Replace chilled water with motor oil.",
                outcome: "Catastrophic Failure. Destroys all heat exchangers, clogs pumps, and causes major environmental fire hazards."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Facility Energy Optimization Plan",
        durationMinutes: 4,
        content: "Formulate a 30-day Facility Energy Management action plan. Install smart sub-meters on the central chiller plant to measure real-time kW/RT, conduct an ultrasonic compressed air leak audit, program static pressure resets in the BMS, and establish an ISO 50001 energy baseline. Earn the Facilities Energy Management Specialist badge and proceed to ELH-123.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Real-time sub-metering and continuous EnPI monitoring transform facilities from passive utility consumers into proactive centers of energy efficiency excellence."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Learn how to finance and secure approvals for major energy retrofits with ELH-123: Managing Capital Expenditure (CapEx) for Energy Retrofits."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "In commercial chiller plant engineering, what does an efficiency metric of 0.60 kW/RT represent?",
        options: [
          "World-class high efficiency: the plant consumes 0.60 kilowatts of electricity to produce one Refrigeration Ton (3.517 kW) of cooling (COP > 5.8).",
          "Extreme inefficiency: the plant is broken and should be demolished.",
          "The speed of cooling water in meters per second.",
          "The weight of the chiller in metric tons."
        ],
        correctOption: 0,
        correctExplanation: "kW/RT measures electrical input power per unit of cooling output. 0.60 kW/RT represents top-tier world-class chiller plant performance (equivalent to a COP of 5.86).",
        incorrectExplanation: "0.60 kW/RT represents excellent world-class chiller plant energy efficiency.",
        optionFeedback: [
          "Correct. 0.60 kW/RT is the international benchmark for high-performance water-cooled chilled water plants.",
          "Incorrect. Lower kW/RT numbers indicate higher efficiency; >1.0 kW/RT is inefficient.",
          "Incorrect. Water flow velocity is measured in m/s, not kW/RT.",
          "Incorrect. Equipment mass is measured in kilograms or metric tons."
        ],
        practicalTakeaway: "Target a total chilled water plant efficiency of <0.65 kW/RT (including chillers, pumps, and towers).",
        learningOutcome: "Calculate and evaluate chilled water plant efficiency in kW/RT and Coefficient of Performance (COP).",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 2,
        question: "How does raising the Chilled Water Supply Temperature setpoint (e.g. from 6.5°C to 8.5°C) during mild weather reduce chiller energy consumption?",
        options: [
          "It reduces the thermodynamic compressor lift (pressure differential between evaporator and condenser), saving approximately 2% to 3% electrical energy per °C increase.",
          "It causes the chiller compressor to freeze into solid ice.",
          "It turns off the building's electrical lighting automatically.",
          "It increases the chemical hardness of the chilled water."
        ],
        correctOption: 0,
        correctExplanation: "Thermodynamic lift determines compressor workload. Raising evaporator saturation temperature reduces lift, decreasing compressor motor work by 2–3% per °C of temperature reset.",
        incorrectExplanation: "Higher chilled water setpoints reduce compressor lift, directly lowering electrical power consumption.",
        optionFeedback: [
          "Correct. Raising chilled water setpoints lowers compressor lift, yielding 2–3% energy savings per degree Celsius.",
          "Incorrect. Raising temperature moves further away from the freezing point of water.",
          "Incorrect. Chilled water temperature reset is an HVAC control strategy, unrelated to lighting circuits.",
          "Incorrect. Water temperature reset does not alter the chemical mineral content of closed loops."
        ],
        practicalTakeaway: "Program automated BMS chilled water supply temperature resets based on ambient outdoor temperature.",
        learningOutcome: "Implement dynamic BMS temperature and pressure reset control strategies.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 3,
        question: "Why is compressed air considered the most expensive industrial utility?",
        options: [
          "Only 10% to 15% of the electrical energy supplied to an air compressor is converted into usable pneumatic mechanical power; the remaining 85% to 90% is converted into waste heat.",
          "Compressed air requires imported diamonds to operate.",
          "Air compressors are legally taxed at 500% by international governments.",
          "Compressed air is heavier than solid lead."
        ],
        correctOption: 0,
        correctExplanation: "Thermodynamic compression losses mean that generating compressed air consumes massive electricity, with ~90% rejected as heat. Fixing air leaks provides immediate, high-ROI electricity savings.",
        incorrectExplanation: "Compressed air has a low thermodynamic efficiency of 10–15%, making leak reduction extremely profitable.",
        optionFeedback: [
          "Correct. Only 10–15% of electrical energy becomes useful pneumatic power; the rest is lost as heat.",
          "Incorrect. Compressors use steel rotors and lubricants, not diamonds.",
          "Incorrect. Utility electricity is taxed under standard commercial tariffs.",
          "Incorrect. Atmospheric air is a gas with low density."
        ],
        practicalTakeaway: "Conduct regular ultrasonic compressed air leak audits to eliminate expensive energy waste.",
        learningOutcome: "Audit and optimize industrial compressed air generation, storage, and distribution systems.",
        competencyArea: "COMP_OPERATIONS"
      },
      {
        orderIndex: 4,
        question: "What is an Energy Baseline (EnB) under the ISO 50001 standard?",
        options: [
          "A quantitative reference period reflecting a specified time period against which energy performance and improvements are measured and compared, accounting for relevant variables like weather and production.",
          "The physical concrete slab beneath a power transformer.",
          "The lowest electricity price offered by a utility in 1950.",
          "A line drawn on the floor of the boiler room."
        ],
        correctOption: 0,
        correctExplanation: "An ISO 50001 EnB establishes the normalized historical benchmark against which post-retrofit energy savings are empirically quantified using Energy Performance Indicators (EnPIs).",
        incorrectExplanation: "An Energy Baseline provides the normalized statistical reference point for measuring energy efficiency gains.",
        optionFeedback: [
          "Correct. EnB establishes the normalized mathematical reference baseline for measuring true energy improvements.",
          "Incorrect. Concrete slabs are civil structural elements, not ISO 50001 statistical baselines.",
          "Incorrect. Historical unadjusted tariffs do not account for normalized operational variables.",
          "Incorrect. Floor markings are 5S visual cues, not energy management baselines."
        ],
        practicalTakeaway: "Establish normalized Energy Baselines (EnB) using multivariable regression modeling.",
        learningOutcome: "Establish ISO 50001 Energy Baselines (EnB) and Energy Performance Indicators (EnPI).",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 5,
        question: "How does bio-fouling or mineral scaling on cooling tower fill and chiller condenser tubes degrade plant efficiency?",
        options: [
          "It creates thermal insulation on heat transfer surfaces, raising condenser refrigerant saturation temperatures and forcing the compressor to work harder, increasing kW/RT by 10% to 30%.",
          "It makes the water taste like peppermint.",
          "It causes the cooling tower fans to spin in reverse.",
          "It turns the chiller into a solar panel."
        ],
        correctOption: 0,
        correctExplanation: "Even a 0.5mm layer of scale or biofilm insulates copper condenser tubes, inhibiting heat rejection and raising condensing pressure, drastically degrading chiller efficiency.",
        incorrectExplanation: "Fouling creates thermal resistance, forcing compressors to operate at higher condensing pressures.",
        optionFeedback: [
          "Correct. Mineral scale and biofilm insulate condenser tubes, increasing compressor workload and energy burn.",
          "Incorrect. Cooling tower water is non-potable industrial water, not beverage flavoring.",
          "Incorrect. Fan rotation direction is controlled by electrical phase wiring, not mineral scale.",
          "Incorrect. Fouling degrades thermodynamic heat rejection and has no relation to photovoltaic generation."
        ],
        practicalTakeaway: "Maintain strict cooling tower water treatment and brush-clean condenser tubes annually.",
        learningOutcome: "Manage cooling tower water chemistry and condenser heat transfer optimization.",
        competencyArea: "COMP_OPERATIONS"
      },
      {
        orderIndex: 6,
        question: "What is the function of a Variable Frequency Drive (VFD) installed on a centrifugal HVAC pump motor?",
        options: [
          "It modulates motor rotational speed to match varying hydraulic flow demands, exploiting the Affinity Laws where power reduces with the cube of speed (e.g. 80% speed consumes ~50% power).",
          "It converts the motor into a diesel engine.",
          "It prevents the pump from ever moving water.",
          "It increases electricity consumption by 500% to test building circuits."
        ],
        correctOption: 0,
        correctExplanation: "Pump Affinity Laws dictate that Power is proportional to (Speed)³. Reducing pump speed by just 20% slashes electrical power consumption by approximately 50%, eliminating throttling losses.",
        incorrectExplanation: "VFDs leverage affinity laws (P ∝ N³) to yield massive energy savings at reduced flow rates.",
        optionFeedback: [
          "Correct. The cube-law relationship means modest speed reductions yield dramatic electrical energy savings.",
          "Incorrect. VFDs are electronic power converters controlling AC electric induction motors.",
          "Incorrect. VFDs modulate flow dynamically to meet exact building cooling requirements.",
          "Incorrect. VFDs drastically reduce electrical consumption rather than increasing it."
        ],
        practicalTakeaway: "Equip all variable-flow chilled water and condenser water pumps with VFDs and differential pressure controls.",
        learningOutcome: "Apply Pump Affinity Laws to calculate energy savings from VFD modulation.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 7,
        question: "What is 'Duct Static Pressure Reset' in commercial VAV air handling systems?",
        options: [
          "A BMS control algorithm that monitors all VAV terminal damper positions and dynamically resets the supply fan static pressure setpoint to the minimum level required to satisfy the most open damper.",
          "A method of pressurizing building ducts to 100 bar to test for explosive strength.",
          "A procedure for removing all air filters from ventilation ducts.",
          "A manual switch turned on only during fire alarms."
        ],
        correctOption: 0,
        correctExplanation: "Static pressure reset ensures supply fans generate only the exact pressure needed. When zone dampers are partially closed, the BMS lowers duct pressure, saving 20–40% in fan energy.",
        incorrectExplanation: "Static pressure reset trims supply fan speed to the lowest pressure that satisfies the most open VAV zone damper.",
        optionFeedback: [
          "Correct. Static pressure reset minimizes fan energy by trimming static pressure based on real-time zone damper needs.",
          "Incorrect. Commercial HVAC ducts operate at low pressures (250–750 Pa); 100 bar would rupture ducts instantly.",
          "Incorrect. Air filters must always remain installed to protect air quality and cooling coils.",
          "Incorrect. Static pressure reset is a continuous automated energy-saving control algorithm."
        ],
        practicalTakeaway: "Implement BMS static pressure reset algorithms across all Variable Air Volume (VAV) air handlers.",
        learningOutcome: "Program dynamic BMS static pressure reset algorithms for VAV air distribution systems.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 8,
        question: "What is the primary deliverable of a 30-day facility energy management optimization roadmap?",
        options: [
          "A comprehensive sub-metered facility energy audit, an ISO 50001 Energy Baseline (EnB) model, a chiller plant kW/RT optimization plan, and a compressed air leak repair log.",
          "A signed contract to permanently disconnect the facility from the municipal electricity grid.",
          "An order purchasing 10,000 incandescent lightbulbs.",
          "A memo forbidding all employees from using air conditioning in the summer."
        ],
        correctOption: 0,
        correctExplanation: "A 30-day facility energy sprint delivers empirical sub-metered telemetry, normalized EnB regression models, chiller kW/RT optimization controls, and quantified leak repairs.",
        incorrectExplanation: "Energy management delivery requires empirical audits, normalized baseline models, and HVAC optimization plans.",
        optionFeedback: [
          "Correct. Empirical audits, EnB baselines, chiller controls, and leak repairs deliver verified energy reductions.",
          "Incorrect. Disconnecting the grid without backup causes immediate blackout and business collapse.",
          "Incorrect. Incandescent bulbs are obsolete, energy-wasting technology.",
          "Incorrect. Eliminating AC harms occupant health, productivity, and delicate electronics."
        ],
        practicalTakeaway: "Deliver an empirical energy audit, ISO 50001 baseline model, and chiller optimization plan.",
        learningOutcome: "Formulate a structured 30-day facility energy management and optimization roadmap.",
        competencyArea: "COMP_OPERATIONS"
      }
    ]
  },

  // 19. ELH-127
  {
    courseCode: "ELH-127",
    title: "Sustainable Supply Chain Management for Procurement",
    slug: "sustainable-supply-chain-management-procurement",
    description: "Master sustainable procurement, supplier ESG auditing, Scope 3 supply chain decarbonization, human rights due diligence (CSDDD), supplier scorecards, and green contract clauses.",
    fullDescription: "This advanced procurement and supply chain course trains chief procurement officers, category managers, and supply chain directors to integrate sustainability into strategic sourcing. It covers ISO 20400 Sustainable Procurement standards, the EU Corporate Sustainability Due Diligence Directive (CSDDD), supplier ESG code of conduct integration, Scope 3 supplier engagement, tier-1/tier-2 ESG audits, and supplier incentive mechanisms.",
    categoryId: 12,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_SUPPLY_CHAIN",
    secondaryCompetencies: ["COMP_GOVERNANCE_ETHICS", "COMP_DECARBONIZATION"],
    learningObjectives: [
      "Operationalize ISO 20400 Sustainable Procurement principles across supplier qualification, RFP evaluation, and contracting.",
      "Conduct supplier ESG risk tiering and on-site audit verification under Sedex SMETA / EcoVadis frameworks.",
      "Comply with international supply chain due diligence regulations (EU CSDDD, German LkSG, Modern Slavery Acts).",
      "Design Scope 3 supplier decarbonization engagement programs and primary carbon data collection workflows.",
      "Formulate a 30-day sustainable procurement policy, supplier code of conduct, and vendor ESG scorecard."
    ],
    intendedRoles: [
      "Chief Procurement Officers (CPO)",
      "Strategic Category & Sourcing Managers",
      "Supply Chain Sustainability Directors",
      "Vendor Management & ESG Compliance Officers"
    ],
    badgeName: "Sustainable Supply Chain Procurement Lead",
    badgeDescription: "Demonstrates applied competence in ISO 20400 sustainable procurement, CSDDD human rights due diligence, Scope 3 supplier engagement, and ESG auditing.",
    completionMessage: "Congratulations! You have completed Sustainable Supply Chain Management for Procurement. You are equipped to build ethical, low-carbon, and resilient supply chains.",
    recommendedNextCourseCode: "ELH-113",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: The Child Labor Scandal in Tier-2 Textile Sourcing",
        durationMinutes: 4,
        content: "A luxury hotel and corporate uniform brand in Grand Baie discovers via an investigative NGO report that its tier-2 spinning mill supplier utilizes forced labor and unpermitted child labor. The brand's procurement team only audited the tier-1 apparel assembler, with zero visibility into upstream textile mills. International travel operators suspend bookings, corporate clients freeze contracts, and the company faces legal liability under international supply chain due diligence laws. Procurement leadership must urgently establish end-to-end multi-tier supply chain traceability and human rights due diligence.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Over 80% of a typical company's environmental footprint and social risks reside in its upstream supply chain, outside direct corporate boundary walls."
          },
          {
            type: "callout",
            style: "danger",
            title: "Multi-Tier Supply Chain Blindspots",
            content: "Auditing only tier-1 direct suppliers leaves massive ethical, environmental, and legal vulnerabilities in tier-2 and tier-3 raw material tiers."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: ISO 20400 & The EU Corporate Sustainability Due Diligence Directive (CSDDD)",
        durationMinutes: 4,
        content: "Apply the ISO 20400 Sustainable Procurement guidance framework: integrate sustainability criteria into the procurement policy, category strategies, RFP weighting (minimum 15–20% ESG scoring), and standard contract clauses. Comply with the EU CSDDD and global Modern Slavery legislation: map multi-tier supply chains, identify high-risk geographies and commodities, conduct verified third-party audits (Sedex SMETA, EcoVadis), and establish whistleblower grievance mechanisms.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Under CSDDD, companies face fines up to 5% of global net turnover and civil liability for failing to prevent environmental damage or human rights abuses in their supply chains."
          },
          {
            type: "table",
            title: "Sustainable Sourcing & Supplier ESG Evaluation Matrix",
            headers: ["Procurement Stage", "Sustainable Action", "Assessment Tool", "Verification Standard"],
            rows: [
              ["1. Prequalification", "Mandatory Supplier Code of Conduct acceptance", "Pre-screening questionnaire", "Zero-tolerance red lines (forced labor, corruption)"],
              ["2. RFP & Tender Evaluation", "Allocate 15–25% scoring weight to ESG criteria", "Total Cost of Ownership (TCO) + LCA", "ISO 14001, ISO 45001, FSC/Fairtrade certifications"],
              ["3. Contracting", "Include binding ESG clauses and audit rights", "Master Services Agreement (MSA)", "Contractual right to terminate for ESG breach"],
              ["4. Ongoing Management", "Annual supplier audits & continuous improvement", "Sedex SMETA / EcoVadis scorecard", "CAPA (Corrective Action Plan) within 60 days"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: Scope 3 Supplier Decarbonization & Primary Data Ingestion",
        durationMinutes: 4,
        content: "Decarbonize Category 1 (Purchased Goods and Services): transition from spend-based carbon estimates to supplier-specific primary activity data. Segment your supply base using the 80/20 Pareto principle: target the top 50 suppliers responsible for 80% of upstream emissions. Mandate that key suppliers establish SBTi-aligned science-based decarbonization targets, switch to renewable electricity, and provide third-party verified Product Carbon Footprints (PCF) under ISO 14067.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Spend-based Scope 3 calculations only track money spent, not actual decarbonization; obtaining supplier-specific primary emission data is essential to prove real carbon cuts."
          },
          {
            type: "callout",
            style: "tip",
            title: "Supplier Incentive Mechanisms",
            content: "Offer preferential payment terms (e.g. 15-day early payment discounts) or multi-year contract renewals to suppliers that achieve top-tier EcoVadis Gold/Platinum ratings."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: High-Risk Supplier Disqualification Dilemma",
        durationMinutes: 4,
        content: "An annual Sedex SMETA audit of a primary packaging supplier in Triolet reveals chronic occupational safety violations, blocked emergency exits, and unlawful wastewater discharges into a local canal. The supplier is the lowest-cost producer and provides 40% of the company's corrugated boxes. The procurement category manager must decide between immediately firing the supplier or establishing a strict 60-day Corrective and Preventive Action (CAPA) plan with unannounced re-audits. How should procurement respond?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A key packaging supplier fails a third-party ESG audit with severe safety and environmental infractions.",
            options: [
              {
                id: "A",
                text: "Issue a formal Corrective Action Plan (CAPA) with a mandatory 60-day remediation timeline, unannounced on-site re-audits, and temporary volume redirection; if the supplier fails to remediate, execute contract termination.",
                outcome: "Optimal. Enforces accountability, drives genuine supplier remediation, maintains supply chain continuity, and upholds ethical compliance standards."
              },
              {
                id: "B",
                text: "Ignore the audit report completely and increase order volumes to get a bigger price discount.",
                outcome: "Severe Violation. Exposes the company to massive legal liability under CSDDD, public brand boycott, and regulatory sanctions."
              },
              {
                id: "C",
                text: "Cancel all packaging supply contracts immediately and shut down company operations.",
                outcome: "Operational Disaster. Halts production and causes severe financial loss without solving supply chain capability."
              },
              {
                id: "D",
                text: "Bribe the auditor to change the audit score to 100%.",
                outcome: "Criminal Offense. Constitutes criminal bribery and fraud, leading to immediate executive arrest and imprisonment."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Sustainable Procurement Policy & Scorecard Plan",
        durationMinutes: 4,
        content: "Formulate a 30-day Sustainable Procurement execution plan. Author a binding corporate Sustainable Procurement Policy based on ISO 20400, publish an updated Supplier Code of Conduct, integrate a 20% ESG evaluation weighting into standard RFP templates, and launch an EcoVadis / Sedex assessment for your top 50 suppliers. Earn the Sustainable Supply Chain Procurement Lead badge and proceed to ELH-113.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Sustainable procurement transforms purchasing power into a catalytic force for global environmental and ethical supply chain transformation."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Apply sustainable procurement directly to logistics with ELH-113: Sustainable Packaging Procurement for Logistics."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "Under the ISO 20400 Sustainable Procurement standard, what weighting should typically be assigned to ESG and sustainability criteria in standard RFP tender evaluations?",
        options: [
          "15% to 25% of the total tender evaluation score.",
          "0% (price must always be the only evaluation criteria).",
          "100% with zero consideration for price, quality, or delivery times.",
          "Weighting is decided by a random dice roll during the bidder meeting."
        ],
        correctOption: 0,
        correctExplanation: "ISO 20400 recommends allocating 15–25% of tender evaluation weighting to ESG performance, ensuring sustainability is a decisive factor alongside commercial price and technical quality.",
        incorrectExplanation: "Sustainable procurement allocates a significant 15–25% weighting to ESG criteria in competitive RFPs.",
        optionFeedback: [
          "Correct. A 15–25% ESG weighting makes sustainability a decisive commercial tender factor.",
          "Incorrect. 0% weighting ignores supply chain ESG risks and reinforces unsustainable procurement.",
          "Incorrect. Commercial viability, quality, and delivery reliability remain essential alongside ESG.",
          "Incorrect. Tender evaluations require documented, transparent, and objective scoring matrices."
        ],
        practicalTakeaway: "Incorporate a 15–25% ESG evaluation weighting into all strategic procurement RFP scorecards.",
        learningOutcome: "Integrate sustainability scoring criteria into procurement tender evaluations under ISO 20400.",
        competencyArea: "COMP_SUPPLY_CHAIN"
      },
      {
        orderIndex: 2,
        question: "What is the primary mandate of the European Corporate Sustainability Due Diligence Directive (CSDDD)?",
        options: [
          "To legally require large companies to conduct human rights and environmental due diligence across their own operations and upstream/downstream value chains, with severe fines for violations.",
          "To force all companies to relocate their headquarters to Europe.",
          "To ban all international trade between continents.",
          "To require all products to be delivered by sailing ships."
        ],
        correctOption: 0,
        correctExplanation: "CSDDD makes supply chain due diligence mandatory, holding companies legally accountable (with fines up to 5% of global turnover) for child labor, forced labor, pollution, and deforestation in their supply chains.",
        incorrectExplanation: "CSDDD legally mandates corporate human rights and environmental due diligence across global supply chains.",
        optionFeedback: [
          "Correct. CSDDD enforces mandatory legal accountability for human rights and environmental harms across value chains.",
          "Incorrect. CSDDD applies to global companies operating in or trading with EU markets.",
          "Incorrect. CSDDD promotes ethical, sustainable international trade, not trade bans.",
          "Incorrect. Logistics modes are chosen based on efficiency, decarbonization, and operational feasibility."
        ],
        practicalTakeaway: "Map supply chains and execute due diligence audits to ensure compliance with CSDDD mandates.",
        learningOutcome: "Analyze legal compliance requirements under CSDDD and global supply chain due diligence laws.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 3,
        question: "Why is calculating Scope 3 Category 1 emissions using primary supplier-specific data superior to spend-based estimation methods?",
        options: [
          "Primary supplier data reflects actual factory energy use, renewables, and verified Product Carbon Footprints (PCF), whereas spend-based estimates only multiply dollars spent by generic industry averages.",
          "Spend-based data requires counting paper cash by hand.",
          "Primary data makes corporate emissions disappear completely.",
          "Spend-based calculations are illegal under international accounting law."
        ],
        correctOption: 0,
        correctExplanation: "Spend-based methods cannot track decarbonization: if you pay a supplier more for green goods, spend-based emissions falsely go up. Primary data captures actual supplier emissions reductions.",
        incorrectExplanation: "Primary supplier data accurately captures real decarbonization efforts and verified energy use.",
        optionFeedback: [
          "Correct. Primary data reflects real emissions performance, allowing companies to prove and track Scope 3 reductions.",
          "Incorrect. Spend-based accounting uses financial ledger data, not physical cash counting.",
          "Incorrect. Primary data provides accurate emissions reporting, not data erasure.",
          "Incorrect. Spend-based estimation is permitted as an initial screening tool, but insufficient for target tracking."
        ],
        practicalTakeaway: "Transition high-impact Scope 3 suppliers from spend-based estimates to verified primary carbon data.",
        learningOutcome: "Implement primary supplier Scope 3 carbon accounting workflows.",
        competencyArea: "COMP_DECARBONIZATION"
      },
      {
        orderIndex: 4,
        question: "What is Sedex SMETA in the context of ethical supply chain auditing?",
        options: [
          "A standardized, internationally recognized social audit methodology assessing Labor Standards, Health & Safety, Environmental Management, and Business Ethics.",
          "A software program that generates automated marketing emails.",
          "A chemical test measuring the sugar content of fruit juice.",
          "A financial system for trading cryptocurrency."
        ],
        correctOption: 0,
        correctExplanation: "Sedex SMETA (Sedex Members Ethical Trade Audit) is the global benchmark for ethical auditing, evaluating factory labor conditions, worker safety, environmental compliance, and business ethics.",
        incorrectExplanation: "Sedex SMETA is a globally recognized social and ethical audit methodology for supply chains.",
        optionFeedback: [
          "Correct. SMETA provides comprehensive on-site ethical audit verification of labor and environmental conditions.",
          "Incorrect. SMETA is an audit standard, not an email marketing tool.",
          "Incorrect. Food sugar testing uses refractometry, not ethical auditing frameworks.",
          "Incorrect. SMETA is unrelated to digital cryptocurrencies."
        ],
        practicalTakeaway: "Utilize Sedex SMETA 4-Pillar audits to verify tier-1 and tier-2 supplier ethical compliance.",
        learningOutcome: "Evaluate supplier compliance using Sedex SMETA and EcoVadis audit frameworks.",
        competencyArea: "COMP_GOVERNANCE_ETHICS"
      },
      {
        orderIndex: 5,
        question: "What is a Corrective and Preventive Action (CAPA) plan following a failed supplier ESG audit?",
        options: [
          "A formal, time-bound remediation agreement where the supplier must correct identified non-conformances (e.g. unblocking exits, providing PPE, stopping effluent) within a set deadline (e.g. 60 days).",
          "A financial penalty where the supplier pays the auditor a personal bonus.",
          "A document stating that the audit findings were imaginary.",
          "A contract requiring the supplier to shut down all manufacturing permanently."
        ],
        correctOption: 0,
        correctExplanation: "CAPA plans focus on capacity building and remediation, giving suppliers a structured timeline (30–90 days) to eliminate root causes of non-compliance before follow-up verification audits.",
        incorrectExplanation: "CAPA establishes structured, time-bound remediation milestones to correct audit non-conformances.",
        optionFeedback: [
          "Correct. CAPA establishes binding corrective actions and timelines to fix verified audit non-conformances.",
          "Incorrect. Auditors cannot accept financial bonuses, which constitutes illegal bribery.",
          "Incorrect. Audit findings represent empirical physical evidence that must be formally addressed.",
          "Incorrect. CAPA aims to remediate and improve supplier practices while maintaining business operations."
        ],
        practicalTakeaway: "Enforce strict 60-day CAPA remediation plans with mandatory on-site re-audit verification.",
        learningOutcome: "Design and manage supplier Corrective and Preventive Action (CAPA) programs.",
        competencyArea: "COMP_SUPPLY_CHAIN"
      },
      {
        orderIndex: 6,
        question: "How can procurement organizations incentivize suppliers to achieve higher ESG performance?",
        options: [
          "By offering preferential payment terms (e.g. early payment discounts), multi-year contract renewals, preferred supplier status, and joint innovation funding to top ESG performers.",
          "By publicly insulting suppliers in newspaper advertisements.",
          "By refusing to pay suppliers for delivered goods.",
          "By banning suppliers from speaking during contract negotiations."
        ],
        correctOption: 0,
        correctExplanation: "Incentive mechanisms reward high-performing sustainable suppliers with commercial benefits, motivating the entire supply base to invest in decarbonization and ethical compliance.",
        incorrectExplanation: "Commercial incentives (early payments, longer contracts) motivate suppliers to improve ESG performance.",
        optionFeedback: [
          "Correct. Commercial incentives motivate suppliers to proactively invest in sustainability and decarbonization.",
          "Incorrect. Public insults destroy commercial partnerships and supplier relationships.",
          "Incorrect. Non-payment breaches commercial contract law and leads to legal litigation.",
          "Incorrect. Collaborative dialogue is essential for sustainable supply chain partnership."
        ],
        practicalTakeaway: "Implement supplier ESG incentive programs linking high ratings to commercial contract advantages.",
        learningOutcome: "Design commercial supplier incentive mechanisms for sustainability performance.",
        competencyArea: "COMP_SUPPLY_CHAIN"
      },
      {
        orderIndex: 7,
        question: "What is the primary function of a Supplier Code of Conduct in sustainable procurement?",
        options: [
          "A binding contract appendix defining minimum mandatory standards on human rights, labor laws, environmental compliance, anti-corruption, and audit rights that all suppliers must sign.",
          "A list of recommended holiday destinations for supplier staff.",
          "A technical manual on how to program industrial computer chips.",
          "A document that transfers all supplier financial profits to the buyer."
        ],
        correctOption: 0,
        correctExplanation: "A Supplier Code of Conduct sets clear, legally enforceable ethical and environmental baselines, providing the contractual foundation to audit, penalize, or terminate non-compliant vendors.",
        incorrectExplanation: "The Supplier Code of Conduct establishes binding ethical, labor, and environmental baselines for all vendors.",
        optionFeedback: [
          "Correct. A binding Supplier Code of Conduct establishes mandatory ethical and environmental compliance terms.",
          "Incorrect. Vacation recommendations are unrelated to procurement governance.",
          "Incorrect. Technical chip manuals are engineering specifications, not ethical conduct policies.",
          "Incorrect. Codes of conduct govern operational and ethical standards, not commercial profit confiscation."
        ],
        practicalTakeaway: "Mandate signature and compliance with the Supplier Code of Conduct for 100% of active vendors.",
        learningOutcome: "Author and implement an enforceable corporate Supplier Code of Conduct.",
        competencyArea: "COMP_GOVERNANCE_ETHICS"
      },
      {
        orderIndex: 8,
        question: "What is the primary deliverable of a 30-day sustainable supply chain procurement roadmap?",
        options: [
          "An ISO 20400 aligned Sustainable Procurement Policy, an updated Supplier Code of Conduct with audit rights, an RFP ESG evaluation matrix, and an initial tier-1 supplier ESG risk mapping.",
          "A signed memo firing 100% of all company suppliers regardless of performance.",
          "A press release announcing a sustainable supply chain without changing any procurement contracts.",
          "An order to stop purchasing all raw materials and goods permanently."
        ],
        correctOption: 0,
        correctExplanation: "A sustainable procurement sprint delivers formalized policies, enforceable codes of conduct, updated RFP scoring matrices, and multi-tier supplier risk mappings.",
        incorrectExplanation: "Sustainable procurement delivery requires formal policies, binding codes of conduct, and vendor risk mappings.",
        optionFeedback: [
          "Correct. Formal policies, enforceable codes of conduct, and vendor risk maps institutionalize sustainable sourcing.",
          "Incorrect. Firing all suppliers halts production and collapses the business.",
          "Incorrect. Marketing claims without contractual procurement updates constitute corporate greenwashing.",
          "Incorrect. Procurement ensures ethical, resilient supply continuity, not business cessation."
        ],
        practicalTakeaway: "Deliver an ISO 20400 procurement policy, Supplier Code of Conduct, and vendor risk map.",
        learningOutcome: "Formulate and execute a structured 30-day sustainable procurement transformation plan.",
        competencyArea: "COMP_SUPPLY_CHAIN"
      }
    ]
  },

  // 20. ELH-129
  {
    courseCode: "ELH-129",
    title: "Environmental Risk & Compliance Management",
    slug: "environmental-risk-compliance-management",
    description: "Master environmental legal compliance registers, ISO 14001 legal registers, EPA effluent and air emission standards, hazardous waste containment (EPA/CLP), environmental risk registers, and regulatory inspection readiness.",
    fullDescription: "This advanced legal and environmental management course trains environmental compliance officers, legal counsels, and industrial operations directors to manage environmental risk and ensure 100% regulatory compliance. It covers national environmental legislation, EPA discharge permits, ambient air/water standards, hazardous waste cradle-to-grave tracking, environmental liability insurance, and regulatory audit defense.",
    categoryId: 12,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_COMPLIANCE",
    secondaryCompetencies: ["COMP_RISK_MANAGEMENT", "COMP_GOVERNANCE_ETHICS"],
    learningObjectives: [
      "Construct and maintain an ISO 14001 Legal & Regulatory Compliance Register for multi-site commercial/industrial operations.",
      "Audit industrial effluent wastewater discharge parameters (COD, BOD5, TSS, Heavy Metals) against national EPA standards.",
      "Implement secondary containment, bunding, and cradle-to-grave manifest tracking for hazardous chemicals and toxic waste.",
      "Conduct environmental risk assessments (Aspects & Impacts) quantifying probability and severity in an Environmental Risk Register.",
      "Formulate a 30-day environmental compliance audit, regulatory permit dashboard, and agency inspection readiness plan."
    ],
    intendedRoles: [
      "Environmental Compliance Officers",
      "Corporate Legal & Regulatory Counsels",
      "Industrial Plant Operations Managers",
      "EHS & Risk Management Directors"
    ],
    badgeName: "Environmental Compliance & Risk Specialist",
    badgeDescription: "Demonstrates applied mastery in ISO 14001 legal registers, EPA discharge compliance, hazardous chemical management, and environmental risk governance.",
    completionMessage: "Congratulations! You have completed Environmental Risk & Compliance Management. You are equipped to protect your organization from environmental liabilities and ensure regulatory compliance.",
    recommendedNextCourseCode: "ELH-124",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: The Chemical Spill and Underground Aquifer Threat in Plaine Magnien",
        durationMinutes: 4,
        content: "An unbunded 10,000-liter storage tank of industrial solvent at a manufacturing facility in Plaine Magnien ruptures overnight. The chemical permeates through unsealed porous soil, contaminating a shallow groundwater aquifer that feeds local agricultural boreholes. The national Environment Protection Authority (EPA) issues an immediate emergency Stop-Order, slaps the facility with heavy non-compliance fines, and threatens criminal prosecution against the company directors under the polluter-pays principle. Environmental compliance officers must establish rigorous risk registers, secondary containment, and compliance auditing.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Environmental non-compliance creates existential corporate risks: regulatory shutdowns, multi-million-dollar remediation costs, and personal criminal liability for executive officers."
          },
          {
            type: "callout",
            style: "danger",
            title: "Polluter-Pays Legal Liability",
            content: "Under modern environmental protection acts, companies and individual directors are strictly liable for all environmental cleanup costs, natural resource damages, and third-party health claims."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: ISO 14001 Legal Register & Environmental Aspect-Impact Scoring",
        durationMinutes: 4,
        content: "Construct an ISO 14001 Environmental Legal Register: identify all applicable national and municipal laws, EIA licenses, discharge permits, and air emission limits. Conduct an Aspects & Impacts Assessment: identify every organizational activity that interacts with the environment (Aspect) and its resulting consequence (Impact). Score significance: Risk Priority Number (RPN) = Severity × Likelihood × Detectability. All high-RPN aspects require formal Operational Controls and Objectives.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "A legal register must be reviewed and updated quarterly to track emerging environmental legislation, updated discharge standards, and permit renewal deadlines."
          },
          {
            type: "table",
            title: "Environmental Aspect vs. Impact Scoring Matrix",
            headers: ["Operational Activity", "Environmental Aspect", "Environmental Impact", "Operational Control / Permit"],
            rows: [
              ["Fuel Oil Storage", "Accidental tank rupture/leak", "Soil and groundwater contamination", "110% capacity concrete bunding + leak alarms"],
              ["Boiler Operation", "Flue gas combustion exhaust (SOx, NOx, Particulates)", "Air pollution, respiratory illness, acid rain", "Stack opacity meter + EPA Air Discharge License"],
              ["Textile Dyeing", "High-COD effluent discharge", "Eutrophication of public river ecosystems", "On-site WWTP + Continuous pH/COD telemetry"],
              ["Transformer Maintenance", "PCB oil leakage / hazardous disposal", "Persistent bioaccumulation toxicity in food chain", "Certified hazardous waste manifest + licensed disposal"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: Hazardous Chemical Containment & Cradle-to-Grave Tracking",
        durationMinutes: 4,
        content: "Enforce secondary containment: all liquid chemical and oil storage tanks must reside within impermeable concrete bunds sized for 110% of the largest tank volume (or 25% of aggregate volume). Implement Cradle-to-Grave Hazardous Waste Manifests: track hazardous waste from generation through storage, licensed transport, and certified final destruction (incineration/encapsulation) with signed chain-of-custody documentation.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Secondary containment bunds must feature blind sump valves that remain locked closed to prevent contaminated spills from discharging into municipal storm drains."
          },
          {
            type: "callout",
            style: "tip",
            title: "Spill Kit Readiness",
            content: "Deploy chemical spill response kits (absorbent booms, neutralizers, non-sparking shovels, PPE) within 15 meters of every chemical transfer and storage zone."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Industrial Wastewater Exceedance Dilemma",
        durationMinutes: 4,
        content: "A beverage bottling plant in Saint Pierre experiences an aeration pump failure in its biological wastewater treatment plant (WWTP), causing effluent Chemical Oxygen Demand (COD) to spike to 850 mg/L—far above the legal EPA discharge permit limit of 250 mg/L. The plant manager considers whether to quietly discharge the untreated wastewater into the municipal storm drain at night or shut down production lines until backup aeration pumps are installed. How should the environmental compliance manager decide?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A WWTP breakdown causes effluent COD to spike to 850 mg/L, exceeding legal discharge limits.",
            options: [
              {
                id: "A",
                text: "Immediately stop wastewater discharge, divert untreated effluent into the emergency retention holding pond, throttle production, rent emergency mobile aeration pumps, and formally notify the EPA of the temporary breakdown.",
                outcome: "Optimal. Prevents illegal environmental contamination, maintains transparent regulatory compliance, avoids severe criminal fines, and protects corporate reputation."
              },
              {
                id: "B",
                text: "Open the storm drain bypass valve and illegally discharge the toxic wastewater into the river under cover of darkness.",
                outcome: "Criminal Environmental Offense. Causes massive fish kills, contaminates drinking water, triggers criminal EPA prosecution, and leads to plant closure."
              },
              {
                id: "C",
                text: "Pump the wastewater into the factory drinking water tanks.",
                outcome: "Catastrophic. Poisons factory employees and creates extreme public health emergencies."
              },
              {
                id: "D",
                text: "Destroy all water testing sensors so no data is recorded.",
                outcome: "Fraud & Obstruction of Justice. Leads to mandatory corporate license revocation and director imprisonment."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Environmental Compliance Action Plan",
        durationMinutes: 4,
        content: "Formulate a 30-day Environmental Compliance & Risk roadmap. Audit your corporate ISO 14001 Legal Register, inspect all chemical secondary containment bunds and spill kits, verify EPA environmental licenses and effluent discharge monitoring logs, and conduct an unannounced chemical spill containment drill. Earn the Environmental Compliance & Risk Specialist badge and proceed to ELH-124.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Proactive compliance auditing and comprehensive legal registers provide the ultimate legal shield against environmental prosecution and operational disruption."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Elevate your strategic climate leadership with ELH-124: Executive Climate Governance & Net-Zero Strategy."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "Under the ISO 14001 Environmental Management standard, what is the fundamental difference between an 'Environmental Aspect' and an 'Environmental Impact'?",
        options: [
          "An Aspect is the operational activity/cause that interacts with the environment (e.g. burning fuel, storing chemicals), whereas an Impact is the resulting change/consequence to the environment (e.g. air pollution, groundwater contamination).",
          "An Aspect is an environmental law, while an Impact is an employee's salary.",
          "An Aspect is an architectural window, while an Impact is a hammer hitting a wall.",
          "There is no difference; they are interchangeable English synonyms."
        ],
        correctOption: 0,
        correctExplanation: "Cause and Effect: Aspects are organizational activities, products, or services that interact with the environment; Impacts are the resulting positive or adverse changes to ecosystems.",
        incorrectExplanation: "Aspects are the operational causes; Impacts are the resulting environmental consequences.",
        optionFeedback: [
          "Correct. Aspect = Cause (interaction with environment); Impact = Effect (environmental change).",
          "Incorrect. Legal requirements are compliance obligations, not environmental aspects.",
          "Incorrect. Architectural windows are building components, not environmental management concepts.",
          "Incorrect. Aspect and Impact are distinct, rigorous concepts defined in ISO 14001."
        ],
        practicalTakeaway: "Map organizational operations as Environmental Aspects to evaluate their Environmental Impacts.",
        learningOutcome: "Identify and evaluate Environmental Aspects and Impacts under ISO 14001.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 2,
        question: "What is the standard engineering capacity requirement for secondary containment bunds surrounding liquid chemical or oil storage tanks?",
        options: [
          "Minimum 110% of the volume of the largest tank within the bund, or 25% of the total aggregate volume of all tanks, whichever is greater.",
          "5% of the tank volume, provided the bund is made of untreated wood.",
          "Zero containment required if the tank is painted blue.",
          "1,000,000 liters regardless of tank size."
        ],
        correctOption: 0,
        correctExplanation: "Secondary containment bunds must hold 110% of the single largest tank to capture a complete catastrophic tank failure plus rainfall buffer, preventing soil and groundwater contamination.",
        incorrectExplanation: "Secondary bunding must hold at least 110% of the largest tank volume or 25% of aggregate volume.",
        optionFeedback: [
          "Correct. 110% bund capacity captures catastrophic tank failures and prevents environmental contamination.",
          "Incorrect. 5% capacity is completely inadequate to contain tank ruptures.",
          "Incorrect. Tank paint color provides zero physical liquid containment.",
          "Incorrect. Bund capacity is engineered proportionally to the stored chemical volume."
        ],
        practicalTakeaway: "Ensure all chemical and oil storage facilities meet the 110% secondary containment bunding rule.",
        learningOutcome: "Specify and inspect secondary containment bunding for hazardous chemical storage.",
        competencyArea: "COMP_RISK_MANAGEMENT"
      },
      {
        orderIndex: 3,
        question: "Under the international 'Polluter-Pays Principle' embedded in environmental protection acts, who bears financial liability for environmental contamination?",
        options: [
          "The company and executive directors responsible for causing the pollution must pay the full costs of environmental remediation, ecosystem restoration, and third-party damages.",
          "Local taxpayers must pay for all corporate pollution cleanups.",
          "The clean-up cost is legally forgiven if the company issues a polite apology.",
          "The government pays the polluter a cash reward."
        ],
        correctOption: 0,
        correctExplanation: "The Polluter-Pays Principle legally mandates that the polluting entity bears full strict financial liability for all containment, cleanup, environmental remediation, and civil damages.",
        incorrectExplanation: "The polluter pays principle enforces strict financial liability on the polluter for environmental cleanup.",
        optionFeedback: [
          "Correct. Polluters bear strict legal and financial liability for all environmental contamination cleanup costs.",
          "Incorrect. Taxpayers are protected; polluters must pay for their own environmental damage.",
          "Incorrect. Apologies do not waive statutory financial liability or cleanup orders.",
          "Incorrect. Polluters face fines and remediation orders, never cash rewards."
        ],
        practicalTakeaway: "Maintain rigorous environmental controls to avoid catastrophic polluter-pays financial liabilities.",
        learningOutcome: "Analyze legal liabilities and financial risks under the Polluter-Pays Principle.",
        competencyArea: "COMP_GOVERNANCE_ETHICS"
      },
      {
        orderIndex: 4,
        question: "What is a 'Cradle-to-Grave' Hazardous Waste Manifest system?",
        options: [
          "A chain-of-custody tracking document that accompanies hazardous waste from the point of generation, through licensed transport, to certified final disposal or treatment.",
          "A birth certificate issued to new hospital patients.",
          "A shipping manifest for transporting agricultural grains.",
          "A software file that tracks company computer mouse movements."
        ],
        correctOption: 0,
        correctExplanation: "Hazardous waste manifests ensure cradle-to-grave traceability, proving that toxic waste was not illegally dumped and was received by a certified, licensed treatment facility.",
        incorrectExplanation: "Hazardous waste manifests provide legally verifiable chain of custody from creation to disposal.",
        optionFeedback: [
          "Correct. Manifests provide legally binding proof of compliant hazardous waste transport and certified disposal.",
          "Incorrect. Manifests track industrial hazardous chemical wastes, not human birth records.",
          "Incorrect. Grain shipping uses agricultural bills of lading, not hazardous waste manifests.",
          "Incorrect. IT tracking software is unrelated to hazardous waste compliance."
        ],
        practicalTakeaway: "Maintain signed cradle-to-grave manifests for 100% of off-site hazardous waste shipments.",
        learningOutcome: "Establish cradle-to-grave hazardous waste tracking and manifest documentation.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 5,
        question: "What parameters are typically monitored in an industrial wastewater effluent discharge compliance permit?",
        options: [
          "pH, Chemical Oxygen Demand (COD), Biochemical Oxygen Demand (BOD5), Total Suspended Solids (TSS), Oil & Grease, and Heavy Metals.",
          "The musical pitch of the wastewater pumps in Hertz.",
          "The stock market price of the beverage company.",
          "The color of the laboratory technician's lab coat."
        ],
        correctOption: 0,
        correctExplanation: "Environmental discharge licenses set strict numerical thresholds for pH (6.0–9.0), COD, BOD, TSS, and toxic metals to prevent aquatic oxygen depletion and waterway toxicity.",
        incorrectExplanation: "Wastewater permits regulate chemical and physical parameters (pH, COD, BOD, TSS, heavy metals).",
        optionFeedback: [
          "Correct. pH, COD, BOD, TSS, and heavy metals are the standard statutory water quality compliance parameters.",
          "Incorrect. Acoustic frequency of pumps is an MEP mechanical metric, not a water quality standard.",
          "Incorrect. Stock prices are market financial indicators.",
          "Incorrect. Lab coat coloration has zero chemical relevance to effluent water quality."
        ],
        practicalTakeaway: "Conduct continuous pH/COD monitoring and certified lab testing on all wastewater effluent discharges.",
        learningOutcome: "Audit industrial wastewater discharge parameters against statutory environmental standards.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 6,
        question: "What is an ISO 14001 Legal & Compliance Register?",
        options: [
          "A centralized, regularly updated database identifying all statutory environmental laws, regulations, permits, standards, and compliance obligations applicable to the organization's operations.",
          "A list of the company's favorite law firms.",
          "A collection of expired parking tickets.",
          "A document recording employee vacation leave balances."
        ],
        correctOption: 0,
        correctExplanation: "An ISO 14001 Legal Register links specific operational activities to exact statutory requirements, tracking compliance status, permit renewal dates, and regulatory changes.",
        incorrectExplanation: "A legal register compiles and tracks all statutory environmental compliance obligations.",
        optionFeedback: [
          "Correct. A Legal Register provides the structured baseline for tracking all environmental regulatory compliance.",
          "Incorrect. Vendor law firm directories are commercial contact lists, not statutory legal registers.",
          "Incorrect. Parking tickets are personal traffic infractions.",
          "Incorrect. Employee leave is tracked via HR payroll systems."
        ],
        practicalTakeaway: "Update the corporate Environmental Legal Register quarterly and review with executive leadership.",
        learningOutcome: "Construct and maintain an ISO 14001 Environmental Legal & Compliance Register.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 7,
        question: "Why should chemical spill response kits be located within 15 meters of all hazardous chemical transfer areas?",
        options: [
          "To enable immediate containment and neutralization of accidental chemical releases within seconds, preventing spills from reaching floor drains, soil, or waterways.",
          "To serve as decorative furniture in the warehouse.",
          "To provide emergency drinking water for workers.",
          "To test if workers can run fast in an obstacle course."
        ],
        correctOption: 0,
        correctExplanation: "Chemical spills migrate rapidly. Immediate access to absorbent booms, pillows, and neutralizers allows operators to contain spills at the source before toxic liquids enter drainage systems.",
        incorrectExplanation: "Spill kits must be immediately accessible to contain and neutralize chemical spills within seconds.",
        optionFeedback: [
          "Correct. Immediate access to spill kits prevents localized chemical spills from escalating into major disasters.",
          "Incorrect. Spill kits are life-safety emergency equipment, not decorative furniture.",
          "Incorrect. Spill kit absorbents and chemicals are non-drinkable industrial safety materials.",
          "Incorrect. Emergency readiness is a safety control, not a recreational race."
        ],
        practicalTakeaway: "Deploy and inspect chemical spill kits within 15 meters of all hazardous material transfer zones.",
        learningOutcome: "Specify and position chemical spill response infrastructure for rapid containment.",
        competencyArea: "COMP_RISK_MANAGEMENT"
      },
      {
        orderIndex: 8,
        question: "What is the primary deliverable of a 30-day Environmental Risk and Compliance audit sprint?",
        options: [
          "An updated ISO 14001 Legal Compliance Register, an Environmental Aspects & Impacts Risk Matrix, a physical inspection report of chemical bunds and spill kits, and a regulatory audit readiness plan.",
          "A signed memo declaring that the company is immune to all national environmental laws.",
          "A proposal to dump all industrial waste into public municipal parks.",
          "An order to destroy all wastewater testing records."
        ],
        correctOption: 0,
        correctExplanation: "A 30-day compliance sprint delivers verified legal registers, updated Aspects/Impacts risk matrices, physical containment inspection logs, and agency inspection protocols.",
        incorrectExplanation: "Compliance delivery requires updated legal registers, risk matrices, and physical containment verification.",
        optionFeedback: [
          "Correct. Legal registers, risk matrices, physical inspection logs, and audit plans ensure total compliance.",
          "Incorrect. No corporate entity is immune to statutory national environmental laws.",
          "Incorrect. Dumping waste in public parks is an illegal environmental crime.",
          "Incorrect. Destroying environmental records constitutes criminal obstruction of justice."
        ],
        practicalTakeaway: "Deliver an ISO 14001 Legal Register, Aspects & Impacts matrix, and physical containment audit.",
        learningOutcome: "Formulate and execute a structured 30-day environmental compliance and risk management plan.",
        competencyArea: "COMP_COMPLIANCE"
      }
    ]
  },

  // 21. ELH-133
  {
    courseCode: "ELH-133",
    title: "Advanced GHG Accounting: Scope 1, 2 & 3 Emissions",
    slug: "advanced-ghg-accounting-scope-1-2-3-emissions",
    description: "Master GHG Protocol Corporate Standard, ISO 14064-1 greenhouse gas accounting, Scope 1 direct fuels/refrigerants, Scope 2 location vs. market-based dual reporting (EACs/I-RECs), and all 15 Scope 3 upstream/downstream categories.",
    fullDescription: "This master-level greenhouse gas accounting course equips corporate carbon accountants, sustainability controllers, and climate analysts to build institutional-grade corporate GHG inventories. It covers organizational boundary setting (Operational Control vs. Equity Share), Scope 1 stationary/mobile/fugitive calculation methodologies, Scope 2 dual reporting under the GHG Protocol Scope 2 Guidance, all 15 Scope 3 value chain categories, emission factor databases (IPCC, DEFRA, eGRID, IEA), and ISO 14064-1 audit readiness.",
    categoryId: 13,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_REPORTING_DISCLOSURE",
    secondaryCompetencies: ["COMP_DECARBONIZATION", "COMP_COMPLIANCE"],
    learningObjectives: [
      "Define corporate organizational and operational boundaries under the GHG Protocol (Operational Control, Financial Control, Equity Share).",
      "Calculate Scope 1 direct emissions across stationary combustion, mobile fleets, industrial process emissions, and fugitive refrigerant losses.",
      "Execute Scope 2 dual reporting: calculate Location-Based (grid emission factors) vs. Market-Based (EACs, I-RECs, PPAs) accounting.",
      "Screen, map, and calculate emissions across all 15 Scope 3 categories using primary supplier data and hybrid emission factor modeling.",
      "Formulate a 30-day corporate GHG inventory, Carbon Accounting Manual, and ISO 14064-1 verification dossier."
    ],
    intendedRoles: [
      "Corporate Carbon Accountants",
      "Sustainability Controllers & ESG Reporting Leads",
      "GHG Auditors & Assurance Practitioners",
      "Chief Sustainability Officers & Climate Strategists"
    ],
    badgeName: "Master GHG Carbon Accounting Specialist",
    badgeDescription: "Demonstrates master-level competence in GHG Protocol accounting, Scope 1/2/3 calculations, Scope 2 dual reporting, and ISO 14064-1 audit verification.",
    completionMessage: "Congratulations! You have completed Advanced GHG Accounting: Scope 1, 2 & 3 Emissions. You are equipped to author institutional-grade, audit-ready corporate greenhouse gas inventories.",
    recommendedNextCourseCode: "ELH-114",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: The Rejected Scope 3 Carbon Audit in Port Louis",
        durationMinutes: 4,
        content: "A commercial banking and investment group in Port Louis publishes its annual carbon footprint, claiming total emissions of 4,200 tCO2e. An external assurance auditor under ISAE 3410 rejects the greenhouse gas report because the company completely excluded Scope 3 Category 15 (Financed Emissions from commercial loans and investments) and Scope 2 Market-Based dual reporting, understating true organizational carbon impact by over 92%. The bank is forced to withdraw its disclosure. Carbon accounting leads must master the full depth of the GHG Protocol Corporate and Value Chain Standards.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Greenhouse gas accounting is the foundational quantitative language of corporate climate action; errors, omissions, or boundary misstatements undermine corporate credibility."
          },
          {
            type: "callout",
            style: "danger",
            title: "Material Boundary Omissions",
            content: "Excluding material Scope 3 categories (e.g. financed emissions, purchased goods, capital goods) distorts corporate climate risk and fails international ESG reporting standards."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: Organizational Boundaries & Scope 1 Direct Emissions",
        durationMinutes: 4,
        content: "Select organizational consolidation approach: Operational Control (100% of emissions from entities where the company has authority to introduce operating policies), Financial Control, or Equity Share (proportional to economic interest). Calculate Scope 1: 1. Stationary Combustion (Boiler fuel liters × Net Calorific Value × Emission Factor); 2. Mobile Combustion (Fleet diesel/petrol); 3. Fugitive Emissions (Refrigerant charge top-up in kg × Refrigerant 100-yr GWP).",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Fugitive refrigerant leaks (e.g. R410A, R134a, R404A) have GWPs ranging from 1,430 to 3,922 and must be calculated using empirical maintenance top-up logs."
          },
          {
            type: "table",
            title: "GHG Protocol Three Scopes Breakdown",
            headers: ["Emission Scope", "Boundary Definition", "Typical Sources", "Calculation Method"],
            rows: [
              ["Scope 1 (Direct)", "Emissions from operations owned or controlled by company", "Boilers, company vehicles, fugitive refrigerant leaks", "Activity data (liters fuel, kg gas) × Specific Emission Factor"],
              ["Scope 2 (Indirect Energy)", "Emissions from purchased electricity, steam, heating, cooling", "Grid electricity consumed by facilities", "Dual Reporting: Location-Based (Grid avg) vs. Market-Based (EAC/PPA)"],
              ["Scope 3 (Value Chain)", "All other indirect emissions across value chain (15 categories)", "Purchased goods, capital goods, freight, business travel, investments", "Spend-based, hybrid, or primary supplier activity data"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: Scope 2 Dual Reporting & The 15 Scope 3 Categories",
        durationMinutes: 4,
        content: "Execute mandatory Scope 2 Dual Reporting: 1. Location-Based Method (reflects average grid emission factor of regional grid where electricity is consumed, e.g. CEB Mauritius factor 0.85–0.92 kg CO2e/kWh); 2. Market-Based Method (reflects contractual instruments like Energy Attribute Certificates - EACs, I-RECs, or Power Purchase Agreements - PPAs). Map all 15 Scope 3 categories: 8 upstream (Purchased Goods, Capital Goods, Fuel/Energy activities, Upstream Freight, Waste, Travel, Commuting, Leased Assets) and 7 downstream (Downstream Freight, Processing, Use of Sold Products, End-of-Life, Franchises, Investments).",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Under the GHG Protocol Scope 2 Guidance, companies must disclose both Location-Based and Market-Based Scope 2 totals in their audited emissions tables."
          },
          {
            type: "callout",
            style: "tip",
            title: "Scope 3 Category 15: Financed Emissions",
            content: "For financial institutions, Category 15 (PCAF standard) accounts for >95% of total carbon footprint, calculated by attributing borrower emissions proportional to loan outstanding value divided by enterprise value."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Renewable Energy Credit (I-REC) Scope 2 Accounting",
        durationMinutes: 4,
        content: "A data center in Ebène consumes 12,000 MWh of grid electricity annually. The facility purchases 12,000 MWh of unbundled International Renewable Energy Certificates (I-RECs) generated by a certified solar farm in the Indian Ocean region. The sustainability analyst proposes reporting 0 tCO2e for both Location-Based and Market-Based Scope 2 emissions in the annual CSRD report. How should the carbon accounting lead correct the methodology?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A company purchases unbundled I-RECs and attempts to report zero emissions for both Scope 2 methods.",
            options: [
              {
                id: "A",
                text: "Report Location-Based Scope 2 using the national grid factor (12,000 MWh × 0.88 tCO2e/MWh = 10,560 tCO2e) AND report Market-Based Scope 2 as 0 tCO2e backed by verified I-REC retirement certificates with full dual disclosure.",
                outcome: "Optimal. Strictly complies with GHG Protocol Scope 2 Dual Reporting guidelines, ensuring complete audit transparency and investor assurance compliance."
              },
              {
                id: "B",
                text: "Report 0 tCO2e for Location-Based and delete the Market-Based column completely.",
                outcome: "Severe Violation. Breaches GHG Protocol rules, misrepresents physical grid consumption, and fails external assurance audits."
              },
              {
                id: "C",
                text: "Multiply emissions by zero and delete the data center from corporate records.",
                outcome: "Gross Fraud. Constitutes fraudulent non-disclosure and regulatory misconduct."
              },
              {
                id: "D",
                text: "Claim electricity consumption does not produce greenhouse gases.",
                outcome: "Absurd. Fails fundamental physics and accounting standards."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Corporate GHG Inventory & Carbon Manual",
        durationMinutes: 4,
        content: "Formulate a 30-day Corporate GHG Inventory action plan. Define corporate operational control boundaries, build automated data pipelines for Scope 1 fuels and fugitive refrigerants, calculate Scope 2 Dual Reporting tables, screen and quantify all 15 Scope 3 categories, and draft the corporate GHG Accounting Methodology Manual ready for ISO 14064-1 third-party assurance. Earn the Master GHG Carbon Accounting Specialist badge and proceed to ELH-114.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "A comprehensive Carbon Accounting Manual standardizes emission factors, global warming potentials (GWP from IPCC AR6), and data sources across all corporate subsidiaries."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Prepare your carbon inventory for external third-party assurance with ELH-114: ESG Data Assurance & Audit Readiness."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "Under the GHG Protocol Corporate Standard, what does 'Operational Control' mean when setting corporate organizational boundaries?",
        options: [
          "The company accounts for 100% of GHG emissions from operations over which it (or one of its subsidiaries) has the full authority to introduce and implement operating policies.",
          "The company only accounts for emissions from the CEO's personal home.",
          "The company accounts for emissions proportional to its percentage of equity share only.",
          "The company accounts for zero emissions if the building is leased from a landlord."
        ],
        correctOption: 0,
        correctExplanation: "Under the Operational Control consolidation approach, an organization accounts for 100% of emissions from any facility where it has authority to introduce and implement its operating policies.",
        incorrectExplanation: "Operational Control accounts for 100% of emissions from entities where the organization has operating authority.",
        optionFeedback: [
          "Correct. Operational Control requires reporting 100% of emissions from facilities where operating authority exists.",
          "Incorrect. Corporate boundaries cover commercial operations, not executive personal residences.",
          "Incorrect. Proportional accounting is the Equity Share approach, distinct from Operational Control.",
          "Incorrect. Leased buildings under operational control are included in corporate Scope 1 and Scope 2 inventories."
        ],
        practicalTakeaway: "Select and consistently apply either the Operational Control or Equity Share consolidation approach.",
        learningOutcome: "Define corporate organizational boundaries under GHG Protocol consolidation approaches.",
        competencyArea: "COMP_REPORTING_DISCLOSURE"
      },
      {
        orderIndex: 2,
        question: "What is mandatory under the GHG Protocol Scope 2 Guidance regarding corporate electricity emissions reporting?",
        options: [
          "Dual Reporting: companies must calculate and disclose both Location-Based (grid average) and Market-Based (contractual instruments like EACs/I-RECs/PPAs) Scope 2 emissions.",
          "Companies must only report electricity consumed by battery-powered flashlights.",
          "Electricity emissions are classified as Scope 1 direct fuel combustion.",
          "Companies are forbidden from reporting electricity consumption."
        ],
        correctOption: 0,
        correctExplanation: "The GHG Protocol Scope 2 Guidance mandates Dual Reporting. Disclosing both Location-Based and Market-Based figures provides full transparency on physical grid impact and contractual renewable purchases.",
        incorrectExplanation: "Scope 2 requires dual reporting of both location-based and market-based totals.",
        optionFeedback: [
          "Correct. Dual Reporting (Location-Based AND Market-Based) is mandatory under the GHG Protocol Scope 2 standard.",
          "Incorrect. Scope 2 encompasses all purchased grid electricity, steam, heating, and cooling across facilities.",
          "Incorrect. Purchased grid electricity is Scope 2 indirect energy, not Scope 1 direct combustion.",
          "Incorrect. Electricity disclosure is a foundational requirement of all carbon accounting frameworks."
        ],
        practicalTakeaway: "Report both Location-Based and Market-Based Scope 2 emissions in all corporate carbon disclosures.",
        learningOutcome: "Execute Scope 2 Dual Reporting under the GHG Protocol Scope 2 Guidance.",
        competencyArea: "COMP_REPORTING_DISCLOSURE"
      },
      {
        orderIndex: 3,
        question: "How are fugitive greenhouse gas emissions from commercial HVAC chiller refrigerant leaks classified and calculated under Scope 1?",
        options: [
          "Kilograms of refrigerant gas added during maintenance top-ups multiplied by the chemical's 100-year Global Warming Potential (GWP) from IPCC Assessment Reports.",
          "The weight of the chiller compressor divided by the room temperature.",
          "Fugitive emissions are legally classified as Scope 3 commuting.",
          "Refrigerant leaks produce zero greenhouse warming impact."
        ],
        correctOption: 0,
        correctExplanation: "Fugitive emissions = Refrigerant Mass Lost (kg top-up) × 100-yr GWP (e.g. R410A GWP = 2,088; R134a GWP = 1,430). Because GWPs are thousands of times higher than CO2, leaks contribute heavily to Scope 1.",
        incorrectExplanation: "Fugitive emissions are calculated using empirical refrigerant mass loss (kg) multiplied by the chemical GWP.",
        optionFeedback: [
          "Correct. Refrigerant top-up mass (kg) × chemical GWP yields Scope 1 fugitive CO2-equivalent emissions.",
          "Incorrect. Equipment physical weight is unrelated to chemical fugitive gas leakage.",
          "Incorrect. Fugitive refrigerant leaks from owned HVAC equipment are Scope 1 direct emissions.",
          "Incorrect. Synthetic fluorinated refrigerants have extreme global warming potentials (GWPs > 1,000–3,900)."
        ],
        practicalTakeaway: "Track HVAC maintenance refrigerant top-up logs to calculate Scope 1 fugitive emissions accurately.",
        learningOutcome: "Calculate Scope 1 direct fugitive refrigerant emissions using IPCC GWP values.",
        competencyArea: "COMP_DECARBONIZATION"
      },
      {
        orderIndex: 4,
        question: "Under the GHG Protocol Corporate Value Chain (Scope 3) Standard, how many distinct Scope 3 categories exist?",
        options: [
          "15 categories (8 Upstream categories and 7 Downstream categories).",
          "Only 1 single category for paper envelopes.",
          "500 categories covering every individual molecule in the factory.",
          "Zero categories (Scope 3 does not exist in greenhouse gas accounting)."
        ],
        correctOption: 0,
        correctExplanation: "The GHG Protocol defines exactly 15 Scope 3 categories: Upstream Categories 1–8 (Purchased Goods, Capital Goods, Fuel activities, Upstream Freight, Waste, Travel, Commuting, Leased Assets) and Downstream Categories 9–15.",
        incorrectExplanation: "The GHG Protocol establishes 15 standardized Scope 3 categories (8 upstream, 7 downstream).",
        optionFeedback: [
          "Correct. Exactly 15 standardized categories structure all upstream and downstream Scope 3 emissions.",
          "Incorrect. Scope 3 covers 15 comprehensive value chain categories, not a single item.",
          "Incorrect. The framework standardizes value chain emissions into 15 structured categories.",
          "Incorrect. Scope 3 represents the largest portion of most corporate carbon footprints."
        ],
        practicalTakeaway: "Screen and evaluate all 15 Scope 3 categories to identify material value-chain emission hotspots.",
        learningOutcome: "Categorize value chain activities across the 15 GHG Protocol Scope 3 categories.",
        competencyArea: "COMP_REPORTING_DISCLOSURE"
      },
      {
        orderIndex: 5,
        question: "In financial institution carbon accounting (PCAF standard), what is 'Scope 3 Category 15: Financed Emissions'?",
        options: [
          "Emissions generated by the commercial borrowers, investee companies, and projects financed by the bank's loans, mortgages, and equity investments.",
          "The cost of printing paper currency notes.",
          "The electricity consumed by office coffee machines.",
          "The emissions from the bank's company cars."
        ],
        correctOption: 0,
        correctExplanation: "For banks, asset managers, and insurers, Financed Emissions (Category 15) represent >95% of total carbon impact, calculating the climate impact of capital allocated into the economy.",
        incorrectExplanation: "Financed emissions attribute real-economy emissions from borrowers and investees to the financing institution.",
        optionFeedback: [
          "Correct. Financed emissions capture the real-world climate impact of capital allocated through loans and investments.",
          "Incorrect. Currency printing is a minor supply chain cost, not financed portfolio emissions.",
          "Incorrect. Coffee machines contribute to Scope 2 facility electricity.",
          "Incorrect. Company vehicle fuel is Scope 1 mobile combustion."
        ],
        practicalTakeaway: "Calculate Category 15 Financed Emissions using the PCAF attribution methodology for financial portfolios.",
        learningOutcome: "Apply the PCAF standard to calculate Scope 3 Category 15 Financed Emissions.",
        competencyArea: "COMP_REPORTING_DISCLOSURE"
      },
      {
        orderIndex: 6,
        question: "What is the primary role of emission factor databases (e.g., IPCC, DEFRA/DESNZ, IEA, eGRID) in carbon accounting?",
        options: [
          "To provide scientifically validated conversion factors that convert physical activity data (liters of fuel, kWh of electricity, passenger-kilometers) into CO2-equivalent greenhouse gas emissions.",
          "To provide daily retail prices for commercial airline tickets.",
          "To list the telephone numbers of government ministers.",
          "To calculate corporate income tax rates."
        ],
        correctOption: 0,
        correctExplanation: "Emission factors (e.g. 2.68 kg CO2e per liter of diesel) translate operational activity data into standardized greenhouse gas metric tons (tCO2e).",
        incorrectExplanation: "Emission factors convert physical activity metrics into standardized carbon dioxide equivalent (CO2e) figures.",
        optionFeedback: [
          "Correct. Emission factor databases provide validated conversion factors to calculate CO2-equivalent emissions.",
          "Incorrect. Airline ticket prices are commercial fare tariffs, not carbon emission factors.",
          "Incorrect. Government contact directories are public administrative records.",
          "Incorrect. Tax calculation uses statutory national revenue codes."
        ],
        practicalTakeaway: "Utilize updated, region-specific emission factors (IPCC, DEFRA, IEA) and document sources in workpapers.",
        learningOutcome: "Select and apply appropriate greenhouse gas emission factors from international databases.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 7,
        question: "What is the standard metric used in international carbon accounting to normalize and aggregate different greenhouse gases (CO2, CH4, N2O, HFCs) into a single unified figure?",
        options: [
          "Carbon Dioxide Equivalent (CO2e), calculated by multiplying each gas's mass by its 100-year Global Warming Potential (GWP).",
          "Liters of liquid nitrogen.",
          "The speed of light in vacuum.",
          "Degrees Fahrenheit."
        ],
        correctOption: 0,
        correctExplanation: "CO2e aggregates all greenhouse gases by weighting their radiative forcing against CO2 over a 100-year time horizon using IPCC Global Warming Potentials (e.g. Methane GWP = 28; Nitrous Oxide GWP = 273).",
        incorrectExplanation: "CO2e normalizes all greenhouse gases based on their 100-year Global Warming Potential (GWP).",
        optionFeedback: [
          "Correct. CO2e normalizes all greenhouse gases into a single universal metric using 100-year GWP values.",
          "Incorrect. Liquid nitrogen is a cryogenic fluid, not a greenhouse gas accounting metric.",
          "Incorrect. The speed of light is a physical constant in physics.",
          "Incorrect. Fahrenheit is a thermodynamic temperature scale, not a carbon emissions metric."
        ],
        practicalTakeaway: "Express all corporate greenhouse gas inventories in standardized metric tons of CO2-equivalent (tCO2e).",
        learningOutcome: "Calculate Carbon Dioxide Equivalent (CO2e) using IPCC 100-year Global Warming Potentials.",
        competencyArea: "COMP_REPORTING_DISCLOSURE"
      },
      {
        orderIndex: 8,
        question: "What is the primary deliverable of a 30-day comprehensive corporate GHG accounting inventory sprint?",
        options: [
          "A verified corporate GHG inventory covering Scope 1, Scope 2 Dual Reporting, and all material Scope 3 categories, backed by an institutional Carbon Accounting Methodology Manual ready for ISO 14064-1 assurance.",
          "A memo stating that all carbon emissions have been deleted from the spreadsheet.",
          "A contract purchasing 50,000 barrels of crude oil to burn in parking lots.",
          "A press release declaring zero emissions without measuring any fuel or electricity data."
        ],
        correctOption: 0,
        correctExplanation: "A 30-day GHG accounting sprint delivers complete Scope 1, Scope 2 Dual Reporting, and Scope 3 calculations, documented in a formalized Carbon Accounting Manual with primary evidence for third-party assurance.",
        incorrectExplanation: "GHG accounting delivery requires a verified Scope 1/2/3 inventory and an ISO 14064-1 methodology manual.",
        optionFeedback: [
          "Correct. Verified Scope 1/2/3 calculations, dual reporting tables, and methodology manuals ensure audit readiness.",
          "Incorrect. Deleting spreadsheet data constitutes fraudulent reporting and audit failure.",
          "Incorrect. Burning crude oil in parking lots is an illegal and hazardous pollution event.",
          "Incorrect. Unsubstantiated claims without measurement constitute corporate greenwashing."
        ],
        practicalTakeaway: "Deliver an audit-ready GHG inventory with Scope 2 Dual Reporting and a Carbon Accounting Manual.",
        learningOutcome: "Formulate a comprehensive, audit-ready corporate GHG emissions inventory under ISO 14064-1.",
        competencyArea: "COMP_REPORTING_DISCLOSURE"
      }
    ]
  }
];

console.log("BATCH3E_DATA_C successfully constructed with 7 courses (ELH-123 to ELH-133).");
