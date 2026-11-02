import {
  db,
  coursesTable,
  quizQuestionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger.js";
import { SPRINT_15_2_10C_COHORT, SPRINT_15_2_10C_COHORT_COURSE_IDS } from "./courseAssessmentCohort15_2_10C.js";

export interface CohortQuestionDefinition {
  order: number;
  question: string;
  options: [string, string, string, string];
  correct: number;
  correctExplanation: string;
  incorrectExplanation: string;
  optionFeedback: [string, string, string, string];
  competencyArea?: string;
  sourceCourseId?: number;
}

export interface CohortCourseRemediationData {
  courseId: number;
  courseCode: string;
  passingScore: number;
  questions: CohortQuestionDefinition[];
}

export const COHORT_15_2_10C_DATA: CohortCourseRemediationData[] = [
  // 1. ELH-24 (ID: 945) - Sustainability for Human Resources Teams (8 Questions)
  {
    courseId: 945,
    courseCode: "ELH-24",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Green Competencies vs. Awareness): When designing a job description for a new logistics operations manager, how should the HR team embed genuine sustainability competence?",
        options: [
          "Define specific, verifiable operational competencies such as route fuel optimization, fleet emissions tracking, and hazardous spill protocol management",
          "Include a vague generic bullet point asking applicants to 'have a spiritual love for nature'",
          "Require applicants to sign an agreement promising never to drive a private car to work",
          "Omit sustainability entirely to avoid intimidating qualified applicants"
        ],
        correct: 0,
        correctExplanation: "Embedding explicit, role-specific operational competencies ensures candidates possess verifiable technical skills required for sustainable execution.",
        incorrectExplanation: "Incorrect. Vague spiritual affinity or coercive personal pledges do not test professional competence.",
        optionFeedback: [
          "Correct! Role-specific technical competencies (fuel optimization, spill protocols) allow objective evaluation during recruitment.",
          "Incorrect. Vague personal sentiments cannot be objectively assessed or tied to operational KPIs.",
          "Incorrect. Unreasonable personal commute mandates infringe on workers' personal lives and violate HR ethics.",
          "Incorrect. Omitting green requirements misses the opportunity to hire operationally capable talent."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Onboarding Integration): What is the most effective way for HR to integrate sustainability into new employee induction during their first week?",
        options: [
          "Hand new hires a 200-page UN treaty and test them on international environmental diplomacy on day two",
          "Introduce practical workplace eco-habits (site-specific bin sorting, digital printing defaults, energy shutdown checklists) and introduce the local Green Team",
          "Conduct a surprise inspection of new employees' personal luggage for non-recyclable items",
          "Tell new employees that sustainability is solely the cleaning crew's responsibility"
        ],
        correct: 1,
        correctExplanation: "Practical, daily habit onboarding provides immediate behavioral clarity and empowers new hires to participate in company culture from day one.",
        incorrectExplanation: "Incorrect. Overly dense academic treaties or invasive surveillance alienate new hires without building practical habits.",
        optionFeedback: [
          "Incorrect. Academic international treaties provide zero practical guidance on office sorting or daily operations.",
          "Correct! Practical daily habit training and Green Team connections foster immediate cultural engagement.",
          "Incorrect. Invasive personal luggage searches violate employee privacy and destroy psychological safety.",
          "Incorrect. Sustainability is a shared workforce responsibility, not just the custodial team's duty."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Performance Appraisals & Incentives): How should an HR department incorporate sustainability into annual performance scorecards without causing resentment?",
        options: [
          "Publicly list the names of employees who printed the most documents on a hallway wall of shame",
          "Deduct 10% from employee salaries whenever national weather temperatures rise",
          "Incorporate role-relevant, measurable eco-efficiency KPIs (e.g. paperless adoption, travel optimization) aligned with standard merit recognition",
          "Require employees to complete 40 hours of unpaid weekend manual labor if departmental recycling goals are missed"
        ],
        correct: 2,
        correctExplanation: "Aligning measurable, role-relevant KPIs with recognized merit awards establishes legitimate professional accountability and motivation.",
        incorrectExplanation: "Incorrect. Arbitrary wage deductions, public shaming, or unpaid overtime violate labor standards and destroy employee engagement.",
        optionFeedback: [
          "Incorrect. Public shaming destroys psychological safety, morale, and collaborative culture.",
          "Incorrect. Penalizing employees for external climatic factors violates basic fair employment principles.",
          "Correct! Role-aligned KPIs tied to standard performance incentives legitimize sustainability as core professional work.",
          "Incorrect. Mandatory unpaid labor violates statutory employment legislation."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Engagement vs. Coercion): When launching an internal Green Champions network, how should HR structure employee participation?",
        options: [
          "Secretly monitor employee lunch conversations to identify who to appoint",
          "Force all employees to join under threat of formal disciplinary letters",
          "Require champions to work unpaid late nights while maintaining 100% of their daily core duties",
          "Encourage voluntary participation, secure agreed protected time allocations (5–10%) with line managers, and provide structured toolkits"
        ],
        correct: 3,
        correctExplanation: "Voluntary participation supported by agreed workload allocations ensures authentic enthusiasm and prevents employee burnout.",
        incorrectExplanation: "Incorrect. Coercion and unmanaged workloads breed cynicism, resentment, and rapid burnout.",
        optionFeedback: [
          "Incorrect. Covert surveillance destroys trust and violates workplace privacy standards.",
          "Incorrect. Forced participation produces passive resistance and toxic workplace dynamics.",
          "Incorrect. Overloading volunteers with unpaid overtime causes burnout and attrition.",
          "Correct! Voluntary sign-up with protected work hours approved by managers creates sustainable, enthusiastic advocacy."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Employer Branding & Greenwashing): Marketing asks HR to publish social media posts claiming the company is 'Mauritius’s Greenest Employer'. How should HR respond?",
        options: [
          "Approve the slogan immediately because employer branding does not require factual substantiation",
          "Verify that all published claims are backed by empirical internal data, verified employee initiatives, and third-party workplace certifications",
          "Invent fake employee testimonials and publish them under stock photography names",
          "Delete all company recruitment social media pages to avoid any potential scrutiny"
        ],
        correct: 1,
        correctExplanation: "Employer brand claims must be substantiated with verified empirical evidence and authentic employee experiences to avoid greenwashing.",
        incorrectExplanation: "Incorrect. Unsubstantiated claims expose the company to regulatory scrutiny and severe reputational damage.",
        optionFeedback: [
          "Incorrect. False employer branding damages candidate trust and violates fair advertising standards.",
          "Correct! Substantiating employer brand claims with verified workplace certifications protects credibility and talent trust.",
          "Incorrect. Fabricating testimonials constitutes deceptive marketing fraud.",
          "Incorrect. Transparent, factual communication is superior to total disengagement."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Green Training Needs Analysis): How should HR determine which sustainability training modules to deploy across different business units?",
        options: [
          "Purchase the cheapest generic training CD-ROM from 1998 and mandate that all staff watch it",
          "Send the exact same chemical spill management video to corporate accountants and graphic designers",
          "Conduct a Training Needs Analysis (TNA) mapping operational job functions to specific environmental impacts and compliance requirements",
          "Assume employees already know all international environmental laws without training"
        ],
        correct: 2,
        correctExplanation: "A targeted Training Needs Analysis aligns specialized environmental modules with the distinct operational duties of each department.",
        incorrectExplanation: "Incorrect. Blanket generic training wastes employee time on irrelevant material while missing critical role-specific risks.",
        optionFeedback: [
          "Incorrect. Obsolete generic materials fail to reflect modern regulations or company-specific SOPs.",
          "Incorrect. Accountants do not manage chemical drums; role-specific training allocation is essential.",
          "Correct! Tailoring training to departmental operational realities ensures high learning relevance and practical application.",
          "Incorrect. Relying on assumptions introduces severe legal compliance and environmental hazards."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Employee Well-Being & Eco-Practices): How does HR align environmental sustainability initiatives with employee physical well-being?",
        options: [
          "Banning all employee meal breaks to reduce food packaging waste",
          "Turning off all drinking water coolers to force employees to drink from outdoor garden hoses",
          "Replacing office chairs with hard concrete blocks to eliminate upholstery waste",
          "Promoting active commuting (secure bike racks, shower facilities), improving indoor air quality/daylighting, and offering healthy local cafeteria options"
        ],
        correct: 3,
        correctExplanation: "Integrating active transit, daylighting, and nutritious catering creates dual benefits for human health and environmental sustainability.",
        incorrectExplanation: "Incorrect. Degrading basic workplace amenities harms employee health, morale, and safety.",
        optionFeedback: [
          "Incorrect. Depriving employees of meal breaks violates statutory labor legislation.",
          "Incorrect. Cutting potable drinking water violates basic occupational health and sanitation standards.",
          "Incorrect. Poor ergonomics causes chronic musculoskeletal injuries.",
          "Correct! Active commuting infrastructure, natural daylighting, and healthy catering enhance both well-being and sustainability."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (HR Operational Ownership): When operational departments complain that employees do not sort waste properly, what is HR's appropriate role?",
        options: [
          "Collaborate with Facilities and Operations to provide clear visual micro-learning, incorporate habits into onboarding, and recognize compliant teams",
          "Personally stand next to every bin in the company 8 hours a day to sort employee trash",
          "Issue immediate termination letters to all staff members in the building",
          "Declare that waste sorting is completely unrelated to Human Resources and refuse to discuss it"
        ],
        correct: 0,
        correctExplanation: "HR enables culture change through onboarding, micro-learning, and recognition, while partnering with operational teams for facility controls.",
        incorrectExplanation: "Incorrect. HR facilitates capability and behavioral change rather than acting as manual waste sorters or punitive enforcers.",
        optionFeedback: [
          "Correct! HR leverages learning, communication, and recognition systems to support operational behavior change.",
          "Incorrect. HR professionals drive systemic culture and training rather than manual bin guarding.",
          "Incorrect. Mass termination is disproportionate, unlawful, and ignores the root training issue.",
          "Incorrect. Cross-functional collaboration is vital for organization-wide sustainability success."
        ]
      }
    ]
  },

  // 2. ELH-25 (ID: 946) - Sustainability for Finance & Accounting Teams (8 Questions)
  {
    courseId: 946,
    courseCode: "ELH-25",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (CAPEX vs. OPEX in Green Investments): When reviewing a proposal for a $50,000 rooftop solar PV system that reduces monthly grid electricity by $1,200, how should Finance categorize the expenditure?",
        options: [
          "Classify the initial purchase and installation as Capital Expenditure (CAPEX) depreciated over its asset life, with ongoing maintenance as Operational Expenditure (OPEX)",
          "Write off the entire $50,000 as miscellaneous entertainment expenses in month one",
          "Record the solar panels as short-term consumable office stationery",
          "Hide the invoice from external auditors to avoid reporting company assets"
        ],
        correct: 0,
        correctExplanation: "Long-term revenue-generating and cost-saving assets are capitalized as CAPEX and depreciated, with recurring servicing recorded as OPEX.",
        incorrectExplanation: "Incorrect. Misclassifying long-term physical assets breaches financial accounting standards (IFRS/GAAP).",
        optionFeedback: [
          "Correct! Solar infrastructure is a long-term capital asset (CAPEX) whose yield offsets ongoing operating power expenses (OPEX).",
          "Incorrect. Expensing long-term infrastructure as entertainment violates financial accounting principles.",
          "Incorrect. Solar panels are capital infrastructure, not consumable stationery supplies.",
          "Incorrect. Concealing assets from auditors constitutes unlawful financial fraud."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Total Cost of Ownership - TCO): Why should Finance mandate Total Cost of Ownership (TCO) evaluation rather than lowest initial invoice price when approving equipment purchases?",
        options: [
          "TCO is used solely to delay purchasing decisions so the company can hold cash longer",
          "TCO incorporates acquisition cost, multi-year electrical/water consumption, maintenance contracts, and end-of-life residual or disposal expenses",
          "TCO guarantees that the most expensive supplier is always selected automatically",
          "TCO eliminates the need for procurement contracts or vendor warranties"
        ],
        correct: 1,
        correctExplanation: "TCO captures whole-life operating energy and maintenance costs, proving that energy-efficient assets deliver superior long-term net savings.",
        incorrectExplanation: "Incorrect. Focusing exclusively on upfront price often leads to acquiring inefficient equipment with high ongoing utility bills.",
        optionFeedback: [
          "Incorrect. TCO is an analytical evaluation framework, not a delaying tactic.",
          "Correct! Whole-life modeling ensures that energy-efficient equipment with lower lifetime operating costs is properly valued.",
          "Incorrect. TCO identifies the most cost-effective whole-life asset, which is often not the highest sticker price.",
          "Incorrect. Contracts and warranty covenants remain essential to enforce projected operating costs."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Discounted Cash Flows - NPV & IRR): Why should Finance evaluate Net Present Value (NPV) and Internal Rate of Return (IRR) alongside Simple Payback for energy retrofits?",
        options: [
          "NPV and IRR always generate negative numbers to discourage green investments",
          "Simple payback is the only calculation allowed by international banking laws",
          "NPV and IRR account for the time value of money, annual electricity price inflation, and full multi-year asset lifespans beyond the payback cutoff",
          "Discounted cash flows allow accountants to avoid collecting actual utility bills"
        ],
        correct: 2,
        correctExplanation: "Discounted cash flow models (NPV/IRR) recognize the compounding value of energy savings over 10–25 year asset horizons.",
        incorrectExplanation: "Incorrect. Simple payback ignores all cash flows after break-even, undervaluing high-performing long-term assets.",
        optionFeedback: [
          "Incorrect. High-efficiency energy retrofits typically yield strongly positive NPV and robust IRR.",
          "Incorrect. Corporate finance standardly utilizes NPV, IRR, and LCOE for capital appraisal.",
          "Correct! Discounted cash flow metrics capture the full lifetime financial returns and time value of money for corporate capital allocations.",
          "Incorrect. Accurate utility data is essential to establish baseline cash flow models."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Substantiating Environmental Cost Savings): When an operations team claims an LED retrofit saved $15,000 in power bills, what verification evidence should Finance require before booking the savings?",
        options: [
          "An assumption that savings occurred because office lighting looks brighter",
          "A handwritten note on a napkin from the electrical contractor",
          "A marketing brochure from the lighting manufacturer showing theoretical laboratory savings",
          "Sub-meter interval telemetry and pre/post utility bills normalized for operating hours, occupancy, and tariff rate adjustments"
        ],
        correct: 3,
        correctExplanation: "Booking financial savings requires empirical utility reconciliation normalized for weather, hours, and tariff fluctuations under IPMVP principles.",
        incorrectExplanation: "Incorrect. Manufacturer marketing claims or informal notes lack audit rigor and empirical verification.",
        optionFeedback: [
          "Incorrect. Subjective visual brightness does not verify kilowatt-hour reduction.",
          "Incorrect. Informal notes lack audit validity and internal control compliance.",
          "Incorrect. Laboratory theoretical claims do not account for facility operating schedules or installation variations.",
          "Correct! Normalized utility reconciliation and interval sub-meter data substantiate genuine financial cost avoidance."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (ESG Data Lineage & Audit Trails): When preparing sustainability expenditure disclosures for annual financial reporting, what audit trail is required?",
        options: [
          "A verbal statement from the CEO confirming that all spending was green",
          "A documented chain linking general ledger journal entries to approved purchase orders, vendor invoices, delivery receipts, and verified environmental credentials",
          "Deleting all underlying supplier receipts once the total sum is calculated",
          "An estimated figure generated by multiplying company revenue by an arbitrary 2%"
        ],
        correct: 1,
        correctExplanation: "Robust financial audit trails require complete source document lineage linking general ledger entries to verified procurement evidence.",
        incorrectExplanation: "Incorrect. Verbal assertions or arbitrary percentage estimates fail financial audit standards and regulatory reviews.",
        optionFeedback: [
          "Incorrect. Fiduciary reporting requires verifiable documentary proof, not unverified verbal assurances.",
          "Correct! Documented linkage between ledger entries, purchase orders, and verified invoices ensures full audit compliance.",
          "Incorrect. Destroying source documentation prevents verification and fails statutory financial audits.",
          "Incorrect. Estimating expenditures by arbitrary percentages constitutes deceptive reporting."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Internal Carbon Pricing - ICP): How can a corporate Finance department use an Internal Carbon Price (Shadow Price) to guide capital allocation?",
        options: [
          "Pay $40 directly to external internet bloggers to write positive corporate reviews",
          "Deduct $40 in cash from employee salaries every time they turn on a computer monitor",
          "Apply a theoretical cost per metric ton of CO2e (e.g. $40/tCO2e) in project cash flow models to prioritize low-carbon capital investments and future-proof against carbon taxes",
          "Use shadow pricing to hide fossil fuel purchases from tax authorities"
        ],
        correct: 2,
        correctExplanation: "Shadow carbon pricing factors climate risk into investment models, favoring low-emission assets and hedging against future regulatory carbon pricing.",
        incorrectExplanation: "Incorrect. Internal carbon pricing is an investment appraisal tool, not a payroll deduction or tax evasion mechanism.",
        optionFeedback: [
          "Incorrect. Paying bloggers has zero connection to financial carbon risk management.",
          "Incorrect. Shadow pricing is an investment valuation metric, not a punitive employee payroll charge.",
          "Correct! Shadow carbon pricing internalizes emissions risk in CapEx modeling to favor long-term decarbonization.",
          "Incorrect. Carbon pricing is a transparent governance tool, not a tax concealment scheme."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Green Revolving Funds - GRF): How does a corporate Green Revolving Fund operate within financial budgeting?",
        options: [
          "Finance sets up an offshore account with unmonitored spending permissions",
          "Money is borrowed from loan sharks at 50% interest to buy unverified carbon offsets",
          "The company takes funds from employee pension reserves to pay for executive travel",
          "Utility cost savings generated by completed sustainability projects are tracked and partially re-routed into a dedicated fund to finance future green initiatives"
        ],
        correct: 3,
        correctExplanation: "Green Revolving Funds create a self-sustaining financial cycle where documented utility savings reinvest into subsequent efficiency projects.",
        incorrectExplanation: "Incorrect. GRFs are disciplined internal capital reallocation mechanisms that fund efficiency through demonstrated operational savings.",
        optionFeedback: [
          "Incorrect. GRFs operate under strict internal financial governance and audit controls.",
          "Incorrect. High-interest borrowing for offsets destroys enterprise value.",
          "Incorrect. Raiding pension funds violates fiduciary and statutory laws.",
          "Correct! Reinvesting proven utility savings into future efficiency projects creates self-sustaining capital momentum."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Paperless Accounting & Digital Controls): What is the primary financial and governance benefit of transitioning to automated digital accounts payable (AP)?",
        options: [
          "Eliminating paper invoice storage and mailing costs, reducing manual data entry errors, accelerating payment cycles, and strengthening digital audit trails",
          "Allowing vendors to alter invoice amounts without approval after submission",
          "Eliminating the need to reconcile bank statements with accounting ledgers",
          "Ensuring that the company never has to pay taxes again"
        ],
        correct: 0,
        correctExplanation: "Automated AP reduces consumable costs, streamlines approvals, eliminates processing errors, and creates tamper-evident digital audit trails.",
        incorrectExplanation: "Incorrect. Digital AP enforces strict three-way matching and internal controls; it does not bypass reconciliation or tax duties.",
        optionFeedback: [
          "Correct! Digital AP streamlines workflows, reduces paper/storage costs, and enhances internal fraud controls.",
          "Incorrect. Digital AP enforces automated validation against purchase orders, preventing unauthorized vendor changes.",
          "Incorrect. Bank reconciliation remains a foundational mandatory financial control.",
          "Incorrect. Digital invoicing enhances tax compliance and reporting transparency."
        ]
      }
    ]
  },

  // 3. ELH-26 (ID: 947) - Sustainability for Procurement and Purchasing Teams (8 Questions)
  {
    courseId: 947,
    courseCode: "ELH-26",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (ISO 20400 Sustainable Procurement Principles): Under ISO 20400 standards, how should a procurement team embed sustainability into an RFP for corporate uniforms?",
        options: [
          "Specify certified sustainable fibers (e.g. GOTS organic cotton, OEKO-TEX non-toxic dyes), demand verified fair-wage factory audits, and require supplier take-back recycling",
          "Select the cheapest synthetic polyester uniforms manufactured in unverified sweatshops with zero compliance checks",
          "Require uniform suppliers to manufacture all garments from discarded banana peels by tomorrow morning",
          "Refuse to buy uniforms and mandate that all employees work in their personal beachwear"
        ],
        correct: 0,
        correctExplanation: "ISO 20400 integrates whole-lifecycle environmental criteria (certified fibers, safe chemistry) and social accountability (fair labor audits) into RFPs.",
        incorrectExplanation: "Incorrect. Lowest-price sourcing without labor/environmental audits violates ISO 20400 sustainable procurement principles.",
        optionFeedback: [
          "Correct! Specifying recognized material standards, fair-labor verification, and circular take-back embodies ISO 20400 best practice.",
          "Incorrect. Sourcing from unverified sweatshops creates severe ethical, legal, and reputational supply chain liabilities.",
          "Incorrect. Mandating unproven materials with impossible 24-hour timelines disrupts operations.",
          "Incorrect. Professional workplace standards require appropriate uniform and safety attire."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Verifying Supplier Claims): A vendor submits an RFP proposal claiming their cleaning chemicals are '100% all-natural and zero chemical'. How should the buyer verify this claim?",
        options: [
          "Accept the vendor's marketing slogan as definitive proof without checking documentation",
          "Request full Safety Data Sheets (SDS), ingredient disclosures, and recognized third-party eco-certifications (e.g. EU Ecolabel, Green Seal, EcoCert)",
          "Taste the cleaning chemical to check if it tastes natural",
          "Disqualify the vendor and report them to the international maritime police"
        ],
        correct: 1,
        correctExplanation: "Legitimate procurement audits require formal Safety Data Sheets (SDS) and accredited third-party eco-certifications rather than marketing slogans.",
        incorrectExplanation: "Incorrect. Unverified marketing copy is unreliable; chemical ingestion is dangerous, and external certifications provide empirical proof.",
        optionFeedback: [
          "Incorrect. Accepting unverified marketing slogans exposes the workplace to toxic hazards and greenwashing.",
          "Correct! Reviewing SDS composition and verified eco-certifications confirms chemical safety and disproves misleading claims.",
          "Incorrect. Ingesting industrial cleaning chemicals causes severe poisoning and life-threatening injury.",
          "Incorrect. Standard procurement verification resolves supplier claims through documentation."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Supplier ESG Scorecards): How should procurement integrate an annual Supplier ESG Scorecard into vendor contract renewals?",
        options: [
          "Require suppliers to achieve net-zero emissions within 48 hours or face immediate contract termination",
          "Make ESG scorecards optional and throw them away before calculating final vendor scores",
          "Weight ESG metrics (carbon disclosure, waste recycling, health & safety, labor compliance) as 15–25% of overall supplier performance evaluation alongside cost and quality",
          "Use scorecards exclusively to demand free luxury gifts from supplier executives"
        ],
        correct: 2,
        correctExplanation: "Weighting ESG performance significantly within balanced scorecards incentivizes continuous supplier improvement and enforces contractual standards.",
        incorrectExplanation: "Incorrect. Ignoring ESG scorecards or making extreme 48-hour demands undermines supply chain partnerships and compliance.",
        optionFeedback: [
          "Incorrect. Unrealistic 48-hour ultimatums destroy supplier relationships without achieving real decarbonization.",
          "Incorrect. Discarding ESG metrics renders sustainability policies toothless and ineffective.",
          "Correct! Integrating ESG weighting into formal vendor scorecards drives accountability and supply chain decarbonization.",
          "Incorrect. Demanding personal gifts from vendors constitutes unlawful commercial bribery."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Packaging Reduction in Supply Contracts): When negotiating a bulk food supply agreement for a hotel, what contractual clause best drives packaging reduction?",
        options: [
          "Instruct the supplier to dump food waste directly into the hotel ocean lagoon",
          "Require every individual tomato to be packaged in an individual plastic clamshell container with a printed plastic label",
          "Demand that food be delivered loose in the open bed of a pickup truck without any protection",
          "Require bulk deliveries in sanitized reusable returnable crates with supplier take-back logistics, banning single-use plastic wrap"
        ],
        correct: 3,
        correctExplanation: "Mandating reusable returnable crates with closed-loop reverse logistics eliminates single-use packaging while protecting food hygiene.",
        incorrectExplanation: "Incorrect. Over-packaging creates massive waste; uncontained delivery compromises food safety; dumping waste violates environmental laws.",
        optionFeedback: [
          "Incorrect. Dumping organic or packaging waste into coastal waters violates national environmental legislation.",
          "Incorrect. Individually wrapping produce multiplies plastic waste and unpacking labor costs.",
          "Incorrect. Unprotected transport causes contamination, food spoilage, and health code violations.",
          "Correct! Reusable returnable crates with reverse logistics eliminate packaging waste while ensuring food hygiene."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Local Sourcing & Value Chain Resilience): Why does sustainable procurement prioritize qualified local Mauritian suppliers when sourcing perishable kitchen produce?",
        options: [
          "Local produce is legally required to be distributed completely free of charge",
          "It reduces Scope 3 freight transport emissions, ensures fresher produce with lower spoilage, and reinvests capital into the local regional economy",
          "Importing produce by air freight from Europe is always more carbon-neutral than local farming",
          "Local sourcing ensures that hotels never have to pay utility bills"
        ],
        correct: 1,
        correctExplanation: "Local sourcing cuts transport emissions, reduces food loss, improves freshness, and fosters resilient local economic development.",
        incorrectExplanation: "Incorrect. Long-distance air freight carries high embodied emissions, while local sourcing enhances freshness and community resilience.",
        optionFeedback: [
          "Incorrect. Commercial agriculture requires fair market payment for produce.",
          "Correct! Local sourcing minimizes transport emissions, shortens supply chains, and strengthens regional food security.",
          "Incorrect. Air-freighting perishable food generates enormous carbon emissions per kilogram.",
          "Incorrect. Food procurement does not eliminate physical facility electricity or water costs."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Managing Supplier Non-Compliance): An annual audit reveals that a contracted waste management vendor is dumping sorted recyclables into a general landfill. What is procurement's immediate action?",
        options: [
          "Pay the supplier a 50% bonus to thank them for saving sorting labor",
          "Ignore the breach because recycling is an informal public relations activity",
          "Issue a formal contractual breach notice, suspend payments for recycling services, conduct a mandatory corrective audit, and terminate the contract if non-compliance continues",
          "Conceal the audit report and delete all company waste records"
        ],
        correct: 2,
        correctExplanation: "Breach notices, payment withholding, and contract termination enforce legal chain-of-custody compliance and prevent greenwashing.",
        incorrectExplanation: "Incorrect. Ignoring waste dumping violates duty-of-care regulations and exposes the company to severe legal and reputational liability.",
        optionFeedback: [
          "Incorrect. Rewarding non-compliance incentivizes illegal dumping.",
          "Incorrect. Condoning landfill dumping exposes the enterprise to fraud and regulatory sanctions.",
          "Correct! Enforcing contractual breach protocols and auditing chain-of-custody maintains compliance and operational integrity.",
          "Incorrect. Hiding environmental audit findings breaches corporate governance and disclosure laws."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Proportionality in Small Supplier Engagements): When sourcing handicrafts from small local artisans, how should procurement apply sustainability criteria fairly?",
        options: [
          "Refuse to work with any small local business to simplify corporate paperwork",
          "Demand that 1-person artisan workshops submit $20,000 certified carbon audit reports before receiving a $200 order",
          "Exempt small suppliers from all child labor and toxicity safety standards",
          "Use proportional, simplified self-assessments focusing on material authenticity and fair wages, providing guidance rather than imposing complex 50-page corporate ESG audits"
        ],
        correct: 3,
        correctExplanation: "ISO 20400 emphasizes proportionality, ensuring small micro-enterprises are evaluated through accessible, fair, and supportive mechanisms.",
        incorrectExplanation: "Incorrect. Imposing expensive multinational audit burdens on micro-artisans excludes local communities, while waiving safety standards is dangerous.",
        optionFeedback: [
          "Incorrect. Excluding local businesses undermines corporate social responsibility and community economic development.",
          "Incorrect. Imposing prohibitive audit costs on micro-enterprises unfairly excludes local community businesses.",
          "Incorrect. Fundamental human rights and chemical safety standards must be maintained across all suppliers.",
          "Correct! Proportional evaluations ensure small suppliers can demonstrate ethical practices without excessive administrative hurdles."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Circular Procurement & Take-Back Clauses): When procuring 200 office computer monitors, what contractual clause guarantees circular end-of-life management?",
        options: [
          "A mandatory Supplier Take-Back & E-Waste Recycling Covenant requiring the manufacturer to collect and recycle retired units under certified e-waste standards",
          "A clause requiring employees to throw old monitors into the nearest river",
          "A requirement that monitors be crushed and buried under the office car park",
          "A clause stating that monitors become the personal property of the procurement officer after 1 year"
        ],
        correct: 0,
        correctExplanation: "Contractual take-back clauses hold manufacturers responsible for closed-loop recovery and certified e-waste recycling.",
        incorrectExplanation: "Incorrect. Dumping electronic waste in waterways or landfills violates hazardous waste laws and poisons groundwater.",
        optionFeedback: [
          "Correct! Take-back covenants ensure electronic hardware is recovered, refurbished, or recycled by certified handlers.",
          "Incorrect. Dumping electronics in rivers releases heavy metals (lead, cadmium, mercury) into aquatic ecosystems.",
          "Incorrect. Buried e-waste leaches hazardous toxins into soil and groundwater.",
          "Incorrect. Diverting corporate assets for private personal gain violates anti-corruption policies."
        ]
      }
    ]
  },

  // 4. ELH-27 (ID: 949) - Sustainability for Facilities and Property Teams (8 Questions)
  {
    courseId: 949,
    courseCode: "ELH-27",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Chiller Optimization & Energy Efficiency): During peak summer operations in a tropical facility, what maintenance practice maintains optimal HVAC chiller Coefficient of Performance (COP)?",
        options: [
          "Conducting regular condenser tube descaling, verifying refrigerant charge, cleaning cooling tower strainers, and optimizing chilled water supply setpoints",
          "Allowing 5 mm of calcium scale to build up on heat exchanger tubes to insulate the water",
          "Turning off all cooling tower water circulation while running compressors at 100% capacity",
          "Opening all facility windows and doors while running air conditioning at maximum blast"
        ],
        correct: 0,
        correctExplanation: "Descaling condenser tubes, managing water treatment, and calibrating setpoints maximizes thermal heat exchange and prevents compressor over-draw.",
        incorrectExplanation: "Incorrect. Scale buildup severely degrades heat transfer, causing compressors to consume up to 30% more power and risk breakdown.",
        optionFeedback: [
          "Correct! Clean condenser tubes and proper water chemistry maintain heat exchange efficiency and low kW/ton power draw.",
          "Incorrect. Scale accumulation acts as a thermal barrier, drastically inflating electricity consumption.",
          "Incorrect. Running chillers without cooling tower water causes immediate high-pressure safety trips.",
          "Incorrect. Open envelopes allow hot humid air in, continuously overloading cooling equipment."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Building Management System - BMS Scheduling): What is the most effective BMS automation strategy to eliminate unoccupied energy waste in an office building?",
        options: [
          "Keep all building ventilation, chillers, and lights running at maximum power 24 hours a day, 365 days a year",
          "Automate HVAC and lighting schedules aligned with actual occupancy hours, integrating 15-minute night setback modes and PIR motion sensor overrides",
          "Permanently disconnect the BMS software and operate all 500 circuit breakers by hand every hour",
          "Set building cooling to turn on only between 2:00 AM and 4:00 AM when the building is empty"
        ],
        correct: 1,
        correctExplanation: "Automated BMS scheduling with night setbacks and occupancy overrides ensures systems operate only when spaces are occupied.",
        incorrectExplanation: "Incorrect. Continuous 24/7 operation wastes massive kilowatt-hours during unoccupied nights and weekends.",
        optionFeedback: [
          "Incorrect. Running cooling and lighting continuously in empty buildings inflates utility bills and carbon footprints.",
          "Correct! Automated occupancy schedules and setback modes eliminate parasitic baseload waste during unoccupied periods.",
          "Incorrect. Manual breaker operation is inefficient, hazardous, and lacks intelligent control.",
          "Incorrect. Cooling empty buildings at night while shutting off daytime cooling causes occupant heat stress."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Sub-Meter Leak Detection): A facility sub-meter detects a continuous water flow of 15 litres per minute between 2:00 AM and 4:00 AM when the facility is closed. What is the immediate operational response?",
        options: [
          "Disable the water sub-meter to eliminate the warning alert from the dashboard",
          "Ignore the reading because water usage naturally increases when buildings are closed",
          "Deploy maintenance technicians immediately to inspect cooling tower makeup valves, irrigation lines, and toilet flush seals to isolate the leak",
          "Wait six months until the next scheduled annual building audit"
        ],
        correct: 2,
        correctExplanation: "Constant baseload water flow during unoccupied hours indicates active pipe leaks, stuck cistern valves, or cooling tower overflow requiring prompt isolation.",
        incorrectExplanation: "Incorrect. Ignoring nighttime water flows allows millions of litres of freshwater to be lost and causes structural water damage.",
        optionFeedback: [
          "Incorrect. Disabling sensors conceals active infrastructure failures and water loss.",
          "Incorrect. Unoccupied nighttime baseline water flow should approach zero in a closed facility.",
          "Correct! Immediate nighttime leak isolation prevents continuous water waste, high utility bills, and structural damage.",
          "Incorrect. Delaying leak repairs allows thousands of cubic metres of clean water to be lost."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Indoor Air Quality & Thermal Comfort): How should Facilities balance energy efficiency with occupant health and thermal comfort under international standards (ASHRAE 55)?",
        options: [
          "Allow room temperatures to reach 38°C to maximize company energy savings",
          "Set thermostats to 16°C and seal all fresh air dampers permanently to trap cold air",
          "Shut down all ventilation fans completely to reduce electrical power to zero",
          "Maintain thermostat setpoints at 24°C–25°C, ensure fresh air ventilation rates meet indoor air quality standards, and service particulate filters regularly"
        ],
        correct: 3,
        correctExplanation: "Calibrated thermostat setpoints (24°C–25°C) combined with adequate fresh air filtration optimize comfort, productivity, and energy savings.",
        incorrectExplanation: "Incorrect. Overcooling wastes massive energy, while sealing ventilation causes dangerous CO2 buildup and Sick Building Syndrome.",
        optionFeedback: [
          "Incorrect. Extreme indoor heat violates occupational health and safety regulations.",
          "Incorrect. Overcooling to 16°C causes occupant thermal distress and excessive compressor power draw.",
          "Incorrect. Eliminating ventilation causes stale air, high CO2 concentrations, and worker lethargy.",
          "Correct! 24°C–25°C setpoints with proper fresh air ventilation provide optimal thermal comfort and energy efficiency."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Preventative Maintenance - Filter Servicing): What happens to HVAC air handling unit (AHU) energy consumption when air filters are clogged with dust?",
        options: [
          "The AHU generates surplus electricity and feeds power back into the public electrical grid",
          "Fan static pressure increases and airflow drops, forcing supply fan motors to draw significantly more electrical power to deliver cooling",
          "Clogged filters make the air conditioning system operate 50% more efficiently",
          "Filter dust has zero physical or electrical impact on HVAC equipment"
        ],
        correct: 1,
        correctExplanation: "Clogged filters increase static resistance, forcing fan motors to work harder and consume more power while delivering degraded airflow.",
        incorrectExplanation: "Incorrect. Air restriction overworks fan motors, degrades cooling performance, and causes premature motor burnout.",
        optionFeedback: [
          "Incorrect. HVAC fans consume electricity; clogged filters never generate power.",
          "Correct! Dirty filters increase system resistance, driving up fan electricity use and reducing indoor air quality.",
          "Incorrect. Restricting airflow severely degrades cooling efficiency and strains mechanical components.",
          "Incorrect. Filter maintenance is critical for energy conservation and motor longevity."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Contractor Management & SLAs): When contracting external facility maintenance providers, how should environmental standards be enforced?",
        options: [
          "Require contractors to dump all old motor oil in the facility perimeter grass",
          "Allow contractors to operate with zero environmental rules to reduce contract pricing",
          "Include specific Key Performance Indicators (KPIs) in Service Level Agreements (SLAs) for refrigerant leak checks, chemical SDS compliance, and certified waste disposal",
          "Exempt external contractors from all facility safety and environmental policies"
        ],
        correct: 2,
        correctExplanation: "Embedding explicit environmental KPIs in SLAs ensures external contractors uphold corporate refrigerant, waste, and chemical standards.",
        incorrectExplanation: "Incorrect. Failing to govern contractors exposes the facility to statutory environmental fines and safety liabilities.",
        optionFeedback: [
          "Incorrect. Dumping hazardous motor oil into soil violates national environmental protection laws.",
          "Incorrect. Unregulated contractors introduce severe compliance, environmental, and safety risks.",
          "Correct! Contractual SLAs with clear environmental KPIs ensure outsourced services comply with corporate and statutory standards.",
          "Incorrect. All on-site personnel must adhere to mandatory workplace environmental and safety policies."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Refrigerant Management & F-Gas Compliance): During routine servicing of a central AC system, a technician identifies an R-410A refrigerant leak. What is the mandatory protocol?",
        options: [
          "Ignore the leak because refrigerant gases have zero impact on the global climate",
          "Top up the refrigerant charge continuously every week without repairing the physical leak",
          "Vent all refrigerant gas directly into the open office atmosphere to clear the pipes",
          "Isolate the circuit, recover remaining refrigerant into certified recovery cylinders, repair the brazed leak joint, pressure test with nitrogen, and log the incident"
        ],
        correct: 3,
        correctExplanation: "Refrigerant recovery, nitrogen pressure testing, joint repair, and formal logging prevent greenhouse gas emissions and maintain compliance.",
        incorrectExplanation: "Incorrect. Venting or continuously topping up leaking refrigerants releases potent greenhouse gases and violates environmental statutes.",
        optionFeedback: [
          "Incorrect. Fluorinated gases (F-gases) have global warming potentials thousands of times higher than CO2.",
          "Incorrect. Continuous topping up without repair wastes expensive gas and emits potent greenhouse gases.",
          "Incorrect. Intentional venting of refrigerants is illegal and carries severe statutory penalties.",
          "Correct! Professional recovery, nitrogen testing, joint repair, and leak logging prevent high-GWP gas emissions and ensure regulatory compliance."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Emergency Escalation & Spill Containment): What is the first operational priority when a diesel backup generator fuel line fractures during a facility test?",
        options: [
          "Shut down the emergency fuel isolation valve, deploy absorbent spill booms to block stormwater drain inlets, and alert the Safety Officer",
          "Wash the diesel fuel into the municipal street drainage system using high-pressure water hoses",
          "Light a flare near the spill to see how large the fuel puddle is",
          "Lock the generator room and leave the facility without reporting the incident"
        ],
        correct: 0,
        correctExplanation: "Emergency valve isolation and blocking storm drains prevents flammable diesel from entering public waterways, followed by rapid safety escalation.",
        incorrectExplanation: "Incorrect. Hosing fuel into drains causes waterway contamination; ignition sources create severe explosion and fire risks.",
        optionFeedback: [
          "Correct! Immediate valve shutoff and storm drain bunding prevents environmental contamination and fire hazards.",
          "Incorrect. Hosing fuel into stormwater drains pollutes municipal waterways and violates criminal environmental laws.",
          "Incorrect. Introducing open flames or flares to volatile fuel vapor creates an extreme explosion hazard.",
          "Incorrect. Concealing active fuel leaks creates severe fire, explosion, and toxic hazards."
        ]
      }
    ]
  },

  // 5. ELH-28 (ID: 950) - Sustainability for Sales and Marketing Teams (8 Questions)
  {
    courseId: 950,
    courseCode: "ELH-28",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (ISO 14021 Environmental Claims): When drafting a product brochure, which claim complies with ISO 14021 anti-greenwashing standards?",
        options: [
          "'Packaging contains 45% post-consumer recycled paperboard certified under FSC standard FSC-C123456'",
          "'Our product is 100% pure green, natural, and completely friend of the Earth'",
          "'Buying this product completely eliminates global warming instantly'",
          "'Certified eco-friendly by our internal marketing department with zero external proof'"
        ],
        correct: 0,
        correctExplanation: "ISO 14021 requires environmental claims to be specific, measurable, verifiable, and backed by recognized third-party certification standards.",
        incorrectExplanation: "Incorrect. Vague, absolute, or unprovable claims constitute greenwashing and breach consumer protection legislation.",
        optionFeedback: [
          "Correct! Specific percentages and accredited certification numbers provide verifiable proof compliant with ISO 14021.",
          "Incorrect. Broad, unsubstantiated buzzwords ('pure green', 'friend of the Earth') constitute misleading greenwashing.",
          "Incorrect. Absolute claims that a commercial product eliminates global warming are false and misleading.",
          "Incorrect. Self-awarded marketing eco-badges lack audit credibility and deceive consumers."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Responding to Enterprise ESG Tenders): When a major corporate client issues an RFP requiring verified Scope 1, 2, and 3 emissions data, how should the sales team respond?",
        options: [
          "Fabricate zero-carbon figures across all scopes to guarantee winning the contract",
          "Provide audited corporate sustainability reporting data, specify methodological boundaries, and transparently declare current baseline data",
          "Submit marketing brochures containing pictures of forests while omitting all numerical data",
          "Refuse to respond and accuse the client of being unreasonably demanding"
        ],
        correct: 1,
        correctExplanation: "Submitting audited data with transparent calculation methodologies establishes institutional credibility and satisfies procurement due diligence.",
        incorrectExplanation: "Incorrect. Fabricating numbers constitutes commercial fraud, while evasive responses disqualify the company from enterprise tenders.",
        optionFeedback: [
          "Incorrect. Falsifying emissions data in commercial tenders constitutes contractual fraud.",
          "Correct! Providing audited metrics and transparent baseline boundaries builds client trust and passes procurement scrutiny.",
          "Incorrect. Slogans and stock photos without data result in immediate RFP disqualification.",
          "Incorrect. Enterprise clients increasingly mandate verified ESG metrics as standard vendor qualification criteria."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Preventing Greenwashing in Advertising): A marketing agency proposes an advertising campaign featuring pristine rainforests and wild animals to promote a standard diesel transport service. What is the marketing manager's duty?",
        options: [
          "Add animated cartoon dolphins to make the diesel truck look even more ecological",
          "Approve the campaign because advertising imagery does not need to relate to actual product realities",
          "Reject the concept because misleading imagery that creates an exaggerated eco-friendly impression violates international advertising standards (ICC Framework)",
          "Claim that diesel exhaust cleans the outdoor air in city centers"
        ],
        correct: 2,
        correctExplanation: "International Chamber of Commerce (ICC) rules prohibit misleading visual imagery that creates false impressions about a product's environmental impact.",
        incorrectExplanation: "Incorrect. Misleading environmental imagery in advertising invites regulatory fines, consumer boycotts, and advertising authority sanctions.",
        optionFeedback: [
          "Incorrect. Exaggerating eco-imagery for fossil fuel services constitutes blatant greenwashing.",
          "Incorrect. Misleading advertising visuals breach consumer protection and fair marketing regulations.",
          "Correct! Rejecting deceptive imagery upholds advertising standards and protects brand integrity from greenwashing accusations.",
          "Incorrect. Claiming diesel exhaust cleans air is scientifically false and legally fraudulent."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Event Marketing Sustainability): When organizing a major corporate exhibition booth, how should the marketing team minimize environmental footprints?",
        options: [
          "Fly all booth staff in private helicopters to travel 5 kilometers",
          "Print 10,000 glossy non-recyclable brochures and hand out single-use plastic fidget spinners to all visitors",
          "Construct a custom single-use wooden booth that is destroyed and thrown into a skip after 48 hours",
          "Utilize modular reusable booth structures, digital QR collateral instead of single-use printed paper, energy-efficient LED display lighting, and local rented furniture"
        ],
        correct: 3,
        correctExplanation: "Modular reusable booths, digital collateral, and rental logistics minimize embodied waste and transport emissions for corporate events.",
        incorrectExplanation: "Incorrect. Single-use plastic merchandise, disposable booths, and mass paper printing generate massive waste and high carbon footprints.",
        optionFeedback: [
          "Incorrect. Helicopter travel for short distances produces extreme and unnecessary carbon emissions.",
          "Incorrect. Mass-printed flyers and cheap plastic giveaways generate immediate landfill waste.",
          "Incorrect. Single-use custom booth construction wastes substantial timber and manufacturing materials.",
          "Correct! Modular reusable structures, digital collateral, and local rentals embody circular event management best practices."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Eco-Label Integrity): What distinguishes a credible Type I Eco-Label (e.g. Blue Angel, EU Ecolabel) from a self-declared marketing symbol?",
        options: [
          "Type I eco-labels can be purchased for $5 on internet marketing websites without inspection",
          "Type I eco-labels are independently audited by accredited third parties against transparent, multi-criteria lifecycle standards",
          "There is no difference; all eco-labels are created by graphic designers",
          "Type I eco-labels are exclusively awarded to companies that pay the highest advertising fees"
        ],
        correct: 1,
        correctExplanation: "ISO 14024 Type I labels are voluntary, multi-criteria, third-party certified standards evaluating whole-lifecycle environmental impacts.",
        incorrectExplanation: "Incorrect. Unlike self-declared symbols, Type I eco-labels require independent laboratory testing and rigorous third-party auditing.",
        optionFeedback: [
          "Incorrect. Credible Type I labels require rigorous scientific verification and cannot be bought online.",
          "Correct! Independent third-party audits against multi-criteria lifecycle standards give Type I eco-labels high international credibility.",
          "Incorrect. Standardized labels follow strict ISO methodologies, unlike unverified graphic symbols.",
          "Incorrect. Certification is based on empirical performance, not advertising spend."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Sales Enablement & Value Proposition): How should sales teams communicate the business value of a sustainable product to a cost-sensitive client?",
        options: [
          "Threaten to report the client to environmental activists if they do not sign the contract",
          "Tell the client that money is evil and that they should not care about costs",
          "Demonstrate Total Cost of Ownership (TCO) savings, lower operating energy bills, reduced regulatory compliance risk, and enhanced brand reputation",
          "Conceal all product pricing until after the client signs a binding contract"
        ],
        correct: 2,
        correctExplanation: "Framing sustainability around lower operational expenses (TCO), risk mitigation, and brand value aligns environmental benefits with commercial priorities.",
        incorrectExplanation: "Incorrect. Sales enablement requires rigorous financial ROI cases rather than moral judgment or coercive threats.",
        optionFeedback: [
          "Incorrect. Coercive threats destroy commercial relationships and brand reputation.",
          "Incorrect. Dismissing commercial client financial realities undermines professional sales discussions.",
          "Correct! Translating sustainability into lifetime cost savings (TCO) and risk reduction provides a compelling commercial value proposition.",
          "Incorrect. Concealing pricing violates transparent commercial sales standards."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Internal Approval for Environmental Claims): What governance workflow must marketing follow before launching a public claim about carbon neutrality?",
        options: [
          "Assume carbon neutrality because the company planted three potted plants in the reception lobby",
          "Post the claim immediately on Twitter without consulting technical sustainability staff",
          "Ask an external social media influencer to guess whether the claim is true",
          "Submit emissions calculation methodologies, offset retirement serial numbers, and audit verifications to the Sustainability and Legal teams for formal sign-off"
        ],
        correct: 3,
        correctExplanation: "Legal and sustainability governance sign-off backed by verified GHG accounting and offset registries prevents regulatory non-compliance.",
        incorrectExplanation: "Incorrect. Publishing unverified carbon claims on social media exposes the enterprise to severe greenwashing litigation and regulatory fines.",
        optionFeedback: [
          "Incorrect. Decorative indoor plants do not offset industrial corporate greenhouse gas emissions.",
          "Incorrect. Unverified public claims risk severe regulatory enforcement and reputational collapse.",
          "Incorrect. Social media influencers lack technical auditing and compliance competence.",
          "Correct! Rigorous cross-functional verification by technical and legal teams prevents false carbon claims and protects corporate integrity."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Customer Feedback on Packaging): When customers complain on social media that online orders arrive with excessive plastic packaging, how should marketing respond?",
        options: [
          "Acknowledge the feedback constructively, explain current packaging transition roadmaps, and collaborate with Logistics to deploy right-sized recyclable materials",
          "Block and delete all customer comments to silence the feedback",
          "Publicly insult the customers and tell them to stop ordering products",
          "Deny that plastic was used and claim the bubble wrap is made of edible clouds"
        ],
        correct: 0,
        correctExplanation: "Transparent, constructive engagement paired with operational packaging improvements turns customer feedback into brand loyalty and positive change.",
        incorrectExplanation: "Incorrect. Deleting comments, insulting customers, or lying about materials intensifies public backlash and damages brand trust.",
        optionFeedback: [
          "Correct! Constructive transparency and operational coordination resolves packaging issues and strengthens customer trust.",
          "Incorrect. Censoring customer feedback provokes broader social media backlash and public distrust.",
          "Incorrect. Hostile customer communication destroys customer retention and brand equity.",
          "Incorrect. Deceptive claims regarding packaging materials invite false advertising investigations."
        ]
      }
    ]
  },

  // 6. ELH-29 (ID: 948) - Sustainability for Operations and Frontline Teams (8 Questions)
  {
    courseId: 948,
    courseCode: "ELH-29",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Fleet & Equipment Idling Reduction): In a warehouse and logistics yard, what operational practice best cuts fuel burn and localized air pollution?",
        options: [
          "Implement an automatic 3-minute engine shutdown rule for delivery trucks and forklifts when stationary during loading",
          "Keep all diesel truck engines running continuously throughout lunch breaks and shift handovers",
          "Remove vehicle mufflers to allow exhaust gases to escape faster",
          "Instruct drivers to accelerate at maximum speed between warehouse aisles"
        ],
        correct: 0,
        correctExplanation: "Automatic engine shutoff during loading and waiting reduces fuel consumption, carbon emissions, engine wear, and toxic particulate exposure.",
        incorrectExplanation: "Incorrect. Unnecessary vehicle idling wastes fuel, inflates operating costs, and generates toxic diesel exhaust.",
        optionFeedback: [
          "Correct! Enforcing anti-idling limits cuts fuel burn, maintenance costs, and harmful particulate emissions in loading bays.",
          "Incorrect. Continuous idling wastes substantial fuel and creates hazardous exhaust fumes in loading docks.",
          "Incorrect. Tampering with exhaust systems violates transport laws and creates severe noise/health hazards.",
          "Incorrect. Rapid acceleration increases fuel burn, brake wear, and collision risks."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Spill Response on Frontline Operations): When an employee accidentally punctures a 20-litre oil container on a warehouse concrete floor, what is the immediate response?",
        options: [
          "Hose down the oil spill into the outdoor municipal stormwater drain with clean water",
          "Deploy spill kit absorbent pads and containment booms to prevent oil reaching stormwater drains, notify the supervisor, and dispose of used absorbents as hazardous waste",
          "Cover the oil puddle with cardboard boxes and continue working around it",
          "Leave the spill unattended and wait for it to evaporate naturally"
        ],
        correct: 1,
        correctExplanation: "Immediate physical containment with absorbent booms protects stormwater drains from toxic contamination, followed by hazardous waste disposal.",
        incorrectExplanation: "Incorrect. Hosing oil into drains causes illegal waterway pollution; covering spills with cardboard creates extreme slip and fire hazards.",
        optionFeedback: [
          "Incorrect. Flushing oil into storm drains pollutes rivers/lagoons and violates environmental legislation.",
          "Correct! Deploying spill kits before drain entry prevents toxic contamination of waterways and fulfills statutory requirements.",
          "Incorrect. Concealing oil with cardboard creates severe slip, fall, and fire risks.",
          "Incorrect. Petroleum oils do not evaporate quickly and present continuous slip, fall, and contamination risks."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Waste Segregation in Operations): Why is it critical for frontline production staff to separate clean cardboard packaging from oily rags and chemical waste?",
        options: [
          "Recycling companies accept mixed hazardous and clean materials without sorting",
          "Cardboard and oil must be mixed together to make industrial cement",
          "Contaminating clean cardboard with oil ruins the entire recycling batch and forces recyclers to redirect the material to landfill",
          "Separating materials is done solely for physical exercise during shift work"
        ],
        correct: 2,
        correctExplanation: "Mixing hazardous contaminants (oils/solvents) into recyclable cardboard batches causes severe contamination, rendering materials unrecyclable.",
        incorrectExplanation: "Incorrect. Oil and chemical contamination destroys the recyclability of clean fiber streams and creates hazardous waste liabilities.",
        optionFeedback: [
          "Incorrect. Recyclers reject contaminated loads and charge penalty disposal fees.",
          "Incorrect. Mixing oil and cardboard destroys material value and creates hazardous waste.",
          "Correct! Preventing cross-contamination ensures paper/cardboard streams remain recyclable and prevents landfill diversion.",
          "Incorrect. Source segregation is a core operational process, not an exercise routine."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (End-of-Shift Energy Shutdown Checklist): What is the most effective operational routine to prevent overnight energy waste in a workshop or production line?",
        options: [
          "Rely on security guards to guess which industrial machines should be unplugged",
          "Leave all industrial machines running in standby mode with compressed air valves open 24/7",
          "Turn off building fire alarm systems to save standby electricity",
          "Execute a standardized end-of-shift shutdown checklist powering down idle machinery, compressed air lines, conveyor belts, and task lighting"
        ],
        correct: 3,
        correctExplanation: "Standardized shutdown checklists ensure compressed air isolation, motor power-down, and lighting shutoff, eliminating overnight energy waste.",
        incorrectExplanation: "Incorrect. Leaving machinery and compressed air lines pressurized overnight causes continuous leak losses and electrical waste.",
        optionFeedback: [
          "Incorrect. Operational shutdowns must be executed by trained machine operators, not untrained security guards.",
          "Incorrect. Unattended standby machines and pressurized air lines waste substantial electricity overnight.",
          "Incorrect. Disconnecting fire safety systems violates life-safety regulations and creates catastrophic risk.",
          "Correct! Standardized shutdown checklists eliminate overnight power draw and compressed air leak losses."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Compressed Air Leak Management): Frontline maintenance identifies a hissing compressed air line fitting in a manufacturing plant. Why should air leaks be reported and fixed immediately?",
        options: [
          "Compressed air leaks have zero financial cost because air is naturally free",
          "Compressed air is one of the most expensive utility forms; small leaks force compressors to run continuously, wasting significant electricity",
          "Air leaks make the workshop smell fresher and cleaner",
          "Hissing leaks improve compressor cooling and should be encouraged"
        ],
        correct: 1,
        correctExplanation: "Compressed air generation requires heavy electrical power (often 8:1 power-to-air energy ratios); leaks cause immense kilowatt-hour waste.",
        incorrectExplanation: "Incorrect. While ambient air is free, compressing air requires significant electricity; unaddressed leaks cost thousands in annual utility bills.",
        optionFeedback: [
          "Incorrect. Compressing air requires immense electrical energy; uncontained leaks waste thousands of dollars annually.",
          "Correct! Fixing compressed air leaks prevents compressors from cycling continuously and saves substantial electrical power.",
          "Incorrect. Industrial compressed air lines contain trace oils and moisture, not outdoor fresh air.",
          "Incorrect. Continuous leaks overload compressors, causing overheating and premature equipment failure."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Material Handling & Pallet Circularity): How can warehouse operations minimize wooden pallet waste and associated disposal costs?",
        options: [
          "Throw unbroken delivery pallets into general trash skips after a single use",
          "Burn all incoming wooden delivery pallets in an open bonfire behind the warehouse every Friday",
          "Implement a closed-loop pallet return programme with suppliers, repair damaged wooden slats in-house, and segregate scrap timber for chipping",
          "Export damaged pallets to neighboring countries on cargo ships as garbage"
        ],
        correct: 2,
        correctExplanation: "Pallet pooling, return agreements, and in-house repair preserve material value, extend pallet lifecycles, and reduce timber waste.",
        incorrectExplanation: "Incorrect. Burning treated wood creates toxic air pollution; discarding reusable pallets into general waste incurs high disposal fees.",
        optionFeedback: [
          "Incorrect. Single-use disposal of durable pallets wastes valuable company assets and inflates disposal costs.",
          "Incorrect. Open burning of treated timber releases toxic chemicals and violates environmental air quality laws.",
          "Correct! Supplier return loops, pallet repair, and timber recycling preserve material assets and eliminate waste fees.",
          "Incorrect. Exporting waste shifts burdens overseas and increases shipping emissions."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Chemical Dosing & Safe Handling): When operating parts-washing stations or floor scrubbers, what is the best practice for chemical dilution?",
        options: [
          "Store chemical concentrates in unlabelled plastic soft-drink bottles",
          "Pour unmetered chemical concentrates into water buckets by eye to make the mixture as strong as possible",
          "Mix industrial bleach and ammonia together in unlabelled open buckets",
          "Use automated, calibrated chemical dilution dispensers and wear designated Personal Protective Equipment (PPE)"
        ],
        correct: 3,
        correctExplanation: "Automated dilution dispensers ensure correct chemical dosing, preventing chemical waste, surface damage, and worker exposure.",
        incorrectExplanation: "Incorrect. Over-dosing wastes expensive chemicals; mixing bleach and ammonia produces deadly toxic chloramine gas.",
        optionFeedback: [
          "Incorrect. Storing chemicals in beverage containers is a major safety violation risking accidental ingestion.",
          "Incorrect. Manual over-dosing wastes expensive concentrates, damages surfaces, and increases chemical hazard risks.",
          "Incorrect. Mixing bleach and ammonia generates deadly, lethal chloramine gas and is strictly prohibited.",
          "Correct! Automated proportioners ensure optimal chemical cleaning efficacy while preventing waste and chemical exposure."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Frontline Eco-Suggestions): An assembly line worker notices that packaging boxes are twice as large as necessary for the component shipped. What is the proper procedure?",
        options: [
          "Submit a continuous improvement / green suggestion form with measurements to the supervisor, and test right-sized packaging with the packaging engineer",
          "Ignore the observation because assembly line workers should never suggest process improvements",
          "Rip the boxes in half with bare hands and tape them together irregularly",
          "Stop shipping products to clients completely until management redesigns all boxes"
        ],
        correct: 0,
        correctExplanation: "Empowering frontline staff to submit continuous improvement ideas optimizes packaging, saves cardboard costs, and improves transport packing density.",
        incorrectExplanation: "Incorrect. Frontline insights are vital for continuous waste elimination; irregular ad-hoc tearing compromises package structural integrity.",
        optionFeedback: [
          "Correct! Frontline suggestion workflows allow engineers to optimize box dimensions, saving packaging and shipping costs.",
          "Incorrect. Frontline operators observe daily inefficiencies firsthand and are vital drivers of continuous improvement.",
          "Incorrect. Irregular ad-hoc tearing damages box integrity and causes transit product damage.",
          "Incorrect. Halting customer shipments rather than following suggestion processes disrupts business operations."
        ]
      }
    ]
  },

  // 7. ELH-30 (ID: 195) - Climate Risk & Workplace Resilience (8 Questions)
  {
    courseId: 195,
    courseCode: "ELH-30",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Physical vs. Transition Climate Risks): In corporate risk management under TCFD/ISSB standards, which of the following represents a Transition Risk rather than a Physical Risk?",
        options: [
          "New statutory carbon tax regulations, rising grid electricity fossil-fuel surcharges, and shifting consumer demand toward low-carbon services",
          "A category 5 tropical cyclone damaging coastal facility rooftops and solar panel arrays",
          "Rising sea levels causing tidal flooding in facility parking structures during king tides",
          "Severe prolonged drought reducing municipal freshwater supply to commercial buildings"
        ],
        correct: 0,
        correctExplanation: "Transition risks arise from policy, legal, technology, and market shifts toward a low-carbon economy; physical risks stem from climatic events.",
        incorrectExplanation: "Incorrect. Cyclones, sea level rise, and droughts are physical climate impacts resulting from atmospheric and oceanic changes.",
        optionFeedback: [
          "Correct! Carbon taxes, regulatory mandates, and market shifts represent transition risks associated with the low-carbon transition.",
          "Incorrect. Cyclone roof damage is an acute physical climate risk.",
          "Incorrect. Tidal inundation and sea-level rise are chronic physical climate risks.",
          "Incorrect. Water supply disruption from drought is an acute physical climate hazard."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Tropical Cyclone Preparedness Protocol): When a Class III cyclone warning is issued in Mauritius, what is the mandatory facility resilience protocol?",
        options: [
          "Open all warehouse doors to let the cyclone wind blow straight through the building",
          "Secure exterior loose objects, deploy storm shutters/flood barriers, test backup generator fuel supplies, execute server backups, and ensure safe staff release",
          "Instruct employees to climb onto facility rooftops during the storm to hold down solar panels",
          "Ignore government meteorological warnings and mandate that staff continue normal outdoor operations"
        ],
        correct: 1,
        correctExplanation: "Standard cyclone preparedness secures building envelopes, establishes backup power/data resilience, and prioritizes employee life safety.",
        incorrectExplanation: "Incorrect. Opening doors causes internal building pressurization and roof failure; rooftop work during storms is life-threatening.",
        optionFeedback: [
          "Incorrect. Open doors allow extreme wind pressures inside, causing catastrophic structural roof failure.",
          "Correct! Enforcing envelope protection, flood barriers, generator checks, and safe employee release protects lives and assets.",
          "Incorrect. Sending personnel onto roofs during high winds creates extreme fall and mortality risks.",
          "Incorrect. Defying national meteorological cyclone warnings violates occupational health, safety, and labor laws."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Workplace Heat Stress & Adaptation): During extreme summer heatwaves with temperatures exceeding 34°C and high humidity, how should operations protect frontline workers?",
        options: [
          "Turn off all ventilation fans in the workshop to save electricity",
          "Prohibit employees from drinking water to build psychological toughness",
          "Implement mandatory hydration breaks, rotate heavy physical tasks, provide shaded cool-down zones, and adjust shift schedules to cooler morning hours",
          "Require workers to wear heavy non-breathable winter coats during outdoor physical work"
        ],
        correct: 2,
        correctExplanation: "Heat stress adaptation combines task rotation, scheduled hydration, shaded resting zones, and shift scheduling to prevent heatstroke.",
        incorrectExplanation: "Incorrect. Depriving workers of water or ventilation during high heat causes dangerous heat exhaustion and fatal heatstroke.",
        optionFeedback: [
          "Incorrect. Shutting off ventilation in hot spaces multiplies thermal stress and causes heat emergencies.",
          "Incorrect. Withholding water in extreme heat causes dehydration, organ failure, and fatal heatstroke.",
          "Correct! Hydration breaks, shaded resting areas, task rotation, and cooler shift timing prevent heat stress and maintain safety.",
          "Incorrect. Non-breathable heavy clothing prevents sweat evaporation and accelerates overheating."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Flooding & Stormwater Drainage Maintenance): How can a commercial facility prevent localized flash flooding during intense monsoon downpours?",
        options: [
          "Fill perimeter stormwater gutters with dry sand and concrete to keep them neat",
          "Pave over all natural garden soil with impermeable asphalt to prevent water soaking into the ground",
          "Connect facility sewer wastewater pipes directly into open office hallways",
          "Conduct pre-monsoon clearing of perimeter drainage channels, install non-return valves on sewer lines, and inspect sump pump float switches regularly"
        ],
        correct: 3,
        correctExplanation: "Unobstructed drainage channels, functional non-return valves, and operational sump pumps prevent catastrophic surface flood ingress.",
        incorrectExplanation: "Incorrect. Paving soil increases surface runoff; blocking gutters or pipes guarantees destructive localized flooding.",
        optionFeedback: [
          "Incorrect. Blocking gutters with sand destroys drainage capacity and guarantees flood damage.",
          "Incorrect. Increasing impermeable asphalt surfaces accelerates surface runoff and worsens downstream flooding.",
          "Incorrect. Routing sewage into hallways creates an immediate biohazard and health emergency.",
          "Correct! Clearing drainage paths, testing sump pumps, and maintaining backflow valves ensures resilient stormwater discharge."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Business Continuity & Supply Chain Redundancy): An island hotel relies on a single coastal road for food and fuel deliveries that becomes flooded during spring tides. What adaptation plan is required?",
        options: [
          "Assume that coastal roads will never flood again and eliminate all on-site food storage",
          "Establish minimum 7-day critical supply buffer stocks on-site and identify secondary inland transport routing agreements with logistics suppliers",
          "Cancel all hotel bookings permanently and abandon the property",
          "Order all food deliveries by supersonic commercial jets"
        ],
        correct: 1,
        correctExplanation: "Supply chain resilience for vulnerable island infrastructure requires on-site buffer stocks and diversified emergency transit routes.",
        incorrectExplanation: "Incorrect. Assuming roads won't flood ignores climate data; abandoning properties or supersonic delivery is operationally absurd.",
        optionFeedback: [
          "Incorrect. Eliminating buffer stocks leaves the facility completely vulnerable to supply cutoffs during storm surges.",
          "Correct! Maintaining strategic buffer inventory and pre-arranged alternate routes ensures operational continuity during climate disruptions.",
          "Incorrect. Resilient adaptation plans maintain business continuity rather than premature abandonment.",
          "Incorrect. Supersonic jets are not a commercially viable or sustainable logistics mechanism."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Infrastructure Adaptation - Rooftop Solar & High Winds): When installing rooftop solar PV in a cyclone-prone tropical island, what engineering specification is essential?",
        options: [
          "Resting solar panels loosely on the roof without any mechanical bolts or clamps",
          "Securing panels to rooftops using adhesive scotch tape and lightweight plastic twine",
          "Aerodynamic mounting frames engineered and certified for wind speeds up to Category 4/5 (250+ km/h) with stainless steel corrosion-resistant fixings",
          "Installing panels made of thin window glass that shatter in gentle breezes"
        ],
        correct: 2,
        correctExplanation: "Cyclone-resilient installations require aerodynamic structural engineering, robust mechanical bolting, and marine-grade corrosion resistance.",
        incorrectExplanation: "Incorrect. Inadequate clamping or adhesive tape causes panels to detach during high winds, becoming lethal airborne projectiles.",
        optionFeedback: [
          "Incorrect. Unclamped modules blow off rooftops in moderate wind, causing severe structural and bodily harm.",
          "Incorrect. Tape and twine fail instantly in high winds, turning solar modules into dangerous flying debris.",
          "Correct! Certified aerodynamic engineering and marine-grade stainless hardware prevent panel detachment during extreme cyclone gusts.",
          "Incorrect. Solar panels must use certified impact-resistant tempered glass."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Ecosystem-Based Adaptation - Coastal Protection): How can a beachfront resort in Mauritius naturally protect its shoreline from coastal erosion and storm surges?",
        options: [
          "Pour engine oil onto the beach sand to make it waterproof",
          "Dynamite offshore coral reefs to make water deeper for jet skis",
          "Remove all coastal trees and replace the beach with a vertical bare concrete seawall that reflects wave energy",
          "Restore and protect native coastal vegetation (e.g. Veloutier, Casuarina roots) and preserve healthy offshore coral reefs and seagrass beds"
        ],
        correct: 3,
        correctExplanation: "Ecosystem-based adaptation utilizes native coastal flora, coral reefs, and seagrasses to absorb wave energy and stabilize sand naturally.",
        incorrectExplanation: "Incorrect. Destroying reefs or replacing beaches with reflective seawalls accelerates beach scouring, erosion, and biodiversity loss.",
        optionFeedback: [
          "Incorrect. Pouring oil into sand poisons marine ecosystems, kills marine life, and violates environmental laws.",
          "Incorrect. Destroying coral reefs eliminates natural wave break barriers, accelerating catastrophic beach erosion.",
          "Incorrect. Vertical reflective seawalls reflect wave energy downward, scouring beach sand away.",
          "Correct! Native coastal vegetation, mangroves, and intact coral reefs provide natural wave attenuation and sand stabilization."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Climate Risk Disclosure & Governance): Why must an enterprise formally document its climate risk assessment within the corporate Risk Register?",
        options: [
          "To provide executive and board visibility over material risks, guide resilient capital investments, ensure insurability, and meet ESG disclosure standards",
          "To ensure that company insurance premiums double automatically every month",
          "To allow corporate lawyers to avoid paying vendor invoices",
          "To keep climate vulnerabilities secret from all internal engineers"
        ],
        correct: 0,
        correctExplanation: "Documenting climate risks in formal registers ensures strategic governance, maintains asset insurability, and satisfies TCFD/ISSB disclosures.",
        incorrectExplanation: "Incorrect. Risk registers ensure proactive mitigation and transparency; hiding risks threatens business viability and insurability.",
        optionFeedback: [
          "Correct! Formal risk register integration ensures board oversight, supports insurance underwriting, and guides resilient investments.",
          "Incorrect. Proactive risk mitigation helps contain and negotiate commercial insurance premiums.",
          "Incorrect. Risk management enhances governance and has no connection to avoiding lawful debts.",
          "Incorrect. Risk transparency empowers internal engineering and facilities teams to design robust physical protections."
        ]
      }
    ]
  },

  // 8. ELH-31 (ID: 197) - Sustainable Tourism Foundations (8 Questions)
  {
    courseId: 197,
    courseCode: "ELH-31",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (GSTC Sustainable Tourism Pillars): Under the Global Sustainable Tourism Council (GSTC) criteria, what are the core pillars of sustainable tourism management?",
        options: [
          "Sustainable Management, Socio-Economic Impacts, Cultural Heritage Preservation, and Environmental Conservation",
          "Maximizing Tourist Volumes, Exploiting Local Labor, Ignoring Local Culture, and Consuming Maximum Water",
          "Running Marketing Ads, Selling Plastic Souvenirs, Banning Local Residents, and Increasing Food Waste",
          "Replacing All Staff with Robots, Cutting Down Forests, Banning Swimming, and Raising Room Prices by 500%"
        ],
        correct: 0,
        correctExplanation: "GSTC criteria establish holistic sustainability across effective management, community socio-economics, cultural heritage, and ecological stewardship.",
        incorrectExplanation: "Incorrect. Unsustainable mass tourism focused exclusively on volume and exploitation destroys destination value and communities.",
        optionFeedback: [
          "Correct! The four GSTC pillars provide comprehensive guidance spanning management, community, culture, and environmental protection.",
          "Incorrect. Over-tourism and labor exploitation contradict fundamental sustainable tourism standards.",
          "Incorrect. Plastic souvenirs and excluding local communities undermine cultural and ecological sustainability.",
          "Incorrect. Sustainable tourism focuses on human connection, cultural preservation, and ecological harmony."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Local Community Economic Linkages): How can a luxury resort in Mauritius maximize local socio-economic benefits for surrounding villages?",
        options: [
          "Import 100% of food, furniture, and entertainment from overseas while prohibiting local villagers from entering the property",
          "Source produce from local farmers/fishermen, showcase local Mauritian artisans, offer fair-wage employment, and support community education projects",
          "Pay local workers significantly below national minimum wage to reduce resort operating costs",
          "Build high security walls around the village to prevent guests from ever seeing local culture"
        ],
        correct: 1,
        correctExplanation: "Direct local purchasing, fair employment, and artisan partnerships maximize the economic multiplier effect in surrounding communities.",
        incorrectExplanation: "Incorrect. Sourcing exclusively overseas and paying below minimum wage causes economic leakage and damages community relations.",
        optionFeedback: [
          "Incorrect. Total reliance on imported goods creates severe economic leakage and isolates the resort from its host community.",
          "Correct! Local supply chains, fair wages, and artisan showcases retain tourist spending within the host community.",
          "Incorrect. Paying below legal minimum wages is unlawful, unethical, and exploits local workers.",
          "Incorrect. Enclave tourism that walls off local culture creates social friction and degrades authentic guest experiences."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Cultural Heritage & Authentic Guest Experiences): When presenting Mauritian cultural heritage (such as traditional Sega music and cuisine) to international guests, what standard must be upheld?",
        options: [
          "Ban all local languages and mandate that all cultural songs be sung exclusively in ancient Greek",
          "Present caricatured, disrespectful stereotypes without paying the local performers",
          "Ensure cultural authenticity and respect, engage local artists and cultural custodians, and provide educational context regarding its historical origins",
          "Replace all traditional instruments with electronic siren synthesizers"
        ],
        correct: 2,
        correctExplanation: "Respectful, authentic cultural representation led by local custodians honors intangible heritage and enriches guest education.",
        incorrectExplanation: "Incorrect. Exploitative stereotypes or uncompensated performances disrespect host cultures and degrade guest satisfaction.",
        optionFeedback: [
          "Incorrect. Suppressing local languages and traditions destroys the essence of cultural exchange.",
          "Incorrect. Disrespectful caricatures exploit local traditions and violate cultural heritage ethics.",
          "Correct! Authentic cultural storytelling led by local custodians preserves heritage and delivers meaningful guest education.",
          "Incorrect. Preserving traditional acoustic instruments maintains the integrity of intangible cultural heritage."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Marine & Coastal Ecosystem Protection): What operational policy should a coastal resort enforce to protect fragile lagoon coral reefs and marine life?",
        options: [
          "Anchor heavy boats directly on living coral heads to ensure they do not drift",
          "Encourage guests to break off living coral branches to take home as bathroom decorations",
          "Discharge untreated laundry effluent directly into swimming lagoons to clean the ocean water",
          "Provide reef-safe mineral sunscreens, establish designated non-anchoring mooring buoys, ban motorized water sports near reef crests, and educate snorkelers"
        ],
        correct: 3,
        correctExplanation: "Reef-safe sunscreens, mooring buoys, swimmer education, and zone management prevent mechanical damage and chemical toxicity in lagoons.",
        incorrectExplanation: "Incorrect. Dropping anchors, breaking coral, or discharging wastewater destroys coral ecosystems and breaches marine conservation laws.",
        optionFeedback: [
          "Incorrect. Dropping anchor on coral heads smashes fragile reef structures into rubble.",
          "Incorrect. Breaking coral destroys living colonies that require decades to grow and violates marine protection laws.",
          "Incorrect. Discharging untreated laundry wastewater pollutes lagoons with phosphates and toxic surfactants.",
          "Correct! Mooring buoys, reef-safe mineral sunscreens, and no-touch guest education preserve living coral ecosystems."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Guest Engagement in Sustainability): How can resort front-office and concierge teams inspire guests to adopt sustainable habits during their stay?",
        options: [
          "Confront guests aggressively at breakfast and lecture them about their carbon footprint",
          "Frame green choices positively (e.g. linen reuse cards, guided endemic nature walks, local culinary stories), offering voluntary participation without preaching",
          "Lock guests inside their rooms and shut off power for 12 hours a day without warning",
          "Charge a surprise $100 penalty fine on the guest checkout bill for every towel used"
        ],
        correct: 1,
        correctExplanation: "Positive framing, experiential nature walks, and transparent storytelling create engaging, voluntary guest participation.",
        incorrectExplanation: "Incorrect. Aggressive lecturing or punitive surprise charges alienate guests and damage customer satisfaction.",
        optionFeedback: [
          "Incorrect. Confrontational preaching alienates guests and produces negative reviews.",
          "Correct! Positive, educational, and voluntary engagement enhances guest satisfaction while driving resource conservation.",
          "Incorrect. Unannounced power cutoffs severely degrade luxury service standards and comfort.",
          "Incorrect. Punitive surprise checkout fines destroy guest loyalty and violate hospitality service standards."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Destination Carrying Capacity & Over-Tourism): When managing excursions to sensitive nature reserves (e.g. Île aux Aigrettes), how should tour operators manage visitor impacts?",
        options: [
          "Allow tourists to feed fast food and bread to endangered endemic birds and giant tortoises",
          "Land 500 tourists simultaneously on the island with no guides and encourage off-trail running",
          "Limit group sizes, enforce designated trail walking, employ certified local eco-guides, and adhere strictly to island visitor carrying capacity limits",
          "Leave plastic picnic waste scattered across the nature reserve"
        ],
        correct: 2,
        correctExplanation: "Strict carrying capacity limits, trained eco-guides, and sticking to marked paths protect endangered island biodiversity from degradation.",
        incorrectExplanation: "Incorrect. Overcrowding, feeding wildlife, and off-trail trampling disrupts breeding habitats and endangers endemic species.",
        optionFeedback: [
          "Incorrect. Feeding human processed food to wildlife causes nutritional disease and behavioral disruption.",
          "Incorrect. Overcrowding and off-trail trampling destroys sensitive ground flora and bird nesting sites.",
          "Correct! Controlled group sizes and guided trail adherence protect fragile habitats and endemic species from disturbance.",
          "Incorrect. Leaving plastic litter introduces fatal ingestion hazards for native wildlife."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Eco-Certification & Credibility): Why should a hotel pursue an accredited third-party sustainability certification (e.g. Green Key, EarthCheck, Travelife)?",
        options: [
          "It gives the general manager automatic diplomatic immunity from local laws",
          "It allows the hotel to avoid paying for electricity and water permanently",
          "It guarantees that the hotel will never experience any rainy days",
          "It validates environmental and social performance through independent on-site audits, provides operational benchmarks, and enhances international tour operator credibility"
        ],
        correct: 3,
        correctExplanation: "Accredited third-party certifications validate genuine operational performance against rigorous standards, boosting global traveler and B2B partner trust.",
        incorrectExplanation: "Incorrect. Eco-certifications provide verified operational benchmarking and credibility; they do not alter utility bills or legal status.",
        optionFeedback: [
          "Incorrect. Environmental certifications are operational management standards, not diplomatic charters.",
          "Incorrect. Certifications drive efficiency but do not eliminate utility bills.",
          "Incorrect. Certifications cannot control weather or meteorological phenomena.",
          "Correct! Rigorous third-party certification builds B2B tour operator trust, benchmarks operations, and prevents greenwashing."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Sustainable Food & Beverage in Tourism): What menu design strategy best supports sustainable dining in an island resort?",
        options: [
          "Feature seasonal, locally harvested organic produce, sustainably caught seafood (avoiding overfished or juvenile species), and plant-forward dining options",
          "Serve exclusively imported endangered bluefin tuna flown in daily on long-distance commercial flights",
          "Offer only processed canned food shipped from across the globe with zero fresh ingredients",
          "Throw away 80% of all cooked buffet food into the general garbage skip before guests arrive"
        ],
        correct: 0,
        correctExplanation: "Local sourcing, sustainable seafood species selection, and plant-forward menus reduce food miles, protect fish stocks, and lower carbon footprints.",
        incorrectExplanation: "Incorrect. Serving endangered fish species or relying on long-distance air freight contradicts sustainable culinary principles.",
        optionFeedback: [
          "Correct! Celebrating local seasonal agriculture, sustainable fisheries, and plant-forward gastronomy minimizes ecological footprints.",
          "Incorrect. Sourcing endangered species violates marine conservation ethics and accelerates ocean stock collapse.",
          "Incorrect. Relying exclusively on imported canned food degrades culinary quality and generates transport emissions.",
          "Incorrect. Wasteful preparation practices multiply food costs and organic landfill methane emissions."
        ]
      }
    ]
  },

  // 9. ELH-32 (ID: 212) - Energy Management for Frontline Hospitality Teams (8 Questions)
  {
    courseId: 212,
    courseCode: "ELH-32",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Kitchen Exhaust Hood Optimization): In a commercial hotel kitchen, what is the most effective operational habit for managing high-powered exhaust hoods?",
        options: [
          "Turn on exhaust fans only when cooking equipment is active, utilize multi-speed controls matched to cooking loads, and turn hoods off during prep/cleanup",
          "Run all kitchen exhaust fans at 100% maximum power 24 hours a day even when the kitchen is closed",
          "Disconnect the exhaust hood completely and allow smoke to fill the dining room",
          "Block exhaust grease filters with plastic wrap to prevent air moving through the duct"
        ],
        correct: 0,
        correctExplanation: "Kitchen exhaust hoods extract conditioned indoor air; modulating speeds and turning them off during non-cooking periods saves massive fan and HVAC power.",
        incorrectExplanation: "Incorrect. Running exhaust hoods continuously when idle extracts expensive cooled air from the building, driving up HVAC loads.",
        optionFeedback: [
          "Correct! Speed modulation and shutting down idle exhaust hoods stops the massive extraction of conditioned indoor air.",
          "Incorrect. Running exhaust hoods 24/7 exhausts thousands of cubic meters of conditioned air, inflating HVAC power bills.",
          "Incorrect. Disabling exhaust hoods causes severe smoke, grease accumulation, and carbon monoxide hazards.",
          "Incorrect. Blocking grease filters with plastic is a severe fire and air restriction hazard."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Guestroom Housekeeping Turn-Down Settings): When servicing an unoccupied guestroom in a tropical hotel, what energy management checklist should housekeeping follow?",
        options: [
          "Leave air conditioning running at maximum cold (16°C) with balcony sliding doors open wide",
          "Close sheer and blackout curtains to block solar radiant heat gain, set thermostats to standby mode (24°C–25°C), and ensure all lights/TVs are switched off",
          "Turn on all room lights, lamps, and televisions to make the empty room look lively",
          "Unplug the guestroom minibar refrigerator and leave the minibar door open in hot humid air"
        ],
        correct: 1,
        correctExplanation: "Drawing curtains blocks solar radiant heat, and setting thermostats to 24°C–25°C prevents compressor over-run while keeping the room fresh.",
        incorrectExplanation: "Incorrect. Open balcony doors with active AC causes severe compressor overload, condensation damage, and massive energy waste.",
        optionFeedback: [
          "Incorrect. Running cooling at 16°C with open balcony doors causes continuous compressor overload and condensation mould.",
          "Correct! Closing blackout curtains blocks radiant solar heat while moderate thermostat setbacks maintain efficiency without humidity buildup.",
          "Incorrect. Leaving lights and displays on in unoccupied rooms wastes electrical power.",
          "Incorrect. Leaving open unpowered refrigerators in tropical humidity causes mould growth and food spoilage."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Commercial Laundry Loading & Water Temperature): How should a hotel laundry team operate commercial washing machines for maximum energy and water efficiency?",
        options: [
          "Double the drying time for dry towels to make them extra hot for guests",
          "Wash single towels individually in separate 50 kg industrial machines at boiling 95°C water",
          "Run machines only at full rated capacity loads, utilize modern low-temperature enzymatic wash cycles where appropriate, and optimize final spin cycles to reduce drying time",
          "Disconnect the electrical earth grounding wire from washing machines to save power"
        ],
        correct: 2,
        correctExplanation: "Operating washers at full rated capacity and using low-temperature chemistry maximizes throughput and cuts water heating and drying energy.",
        incorrectExplanation: "Incorrect. Running partial loads or excessive high temperatures wastes enormous thermal energy and water.",
        optionFeedback: [
          "Incorrect. Over-drying linens damages fabric fibers, creates static hazards, and wastes significant energy.",
          "Incorrect. Running single items in industrial machines multiplies water and energy use per kilogram of linen.",
          "Correct! Full capacity loading, low-temp chemistry, and high extraction spin speeds drastically cut water heating and gas/electric drying energy.",
          "Incorrect. Disconnecting safety grounding wires creates lethal electrical shock hazards."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Refrigeration Gasket Inspection & Defrosting): During weekly kitchen maintenance, what physical inspection ensures walk-in cold rooms do not waste electricity?",
        options: [
          "Store boiling pots of hot soup directly inside freezers next to temperature sensors",
          "Prop walk-in freezer doors wide open with wooden wedges during the entire 8-hour shift",
          "Allow 10 cm of solid ice frost to accumulate across cooling fan blades",
          "Check door magnetic gaskets for cracks/air leaks using the paper slip test, ensure auto-door closers seal tightly, and verify evaporator coils are free of thick ice"
        ],
        correct: 3,
        correctExplanation: "Sealed door gaskets, functional door closers, and defrosted evaporator coils maintain thermal insulation and compressor efficiency.",
        incorrectExplanation: "Incorrect. Propping freezer doors open allows humid ambient air inside, causing rapid ice buildup and continuous compressor overload.",
        optionFeedback: [
          "Incorrect. Placing boiling liquids in freezers raises ambient temperature and strains cooling compressors.",
          "Incorrect. Propping freezer doors open draws in warm humid air, overworking compressors and spoiling stored food.",
          "Incorrect. Heavy ice frost insulates evaporator coils, choking airflow and drastically increasing power consumption.",
          "Correct! Tight gasket seals and ice-free evaporator coils ensure optimal heat transfer and prevent continuous compressor running."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Front-of-House Restaurant Lighting Control): How should restaurant floor supervisors manage lighting across meal periods (breakfast, lunch, dinner)?",
        options: [
          "Turn on 1,000-watt halogen floodlights at maximum brightness during outdoor midday sunlight",
          "Utilize zoned dimmable LED lighting scenes, maximize natural daylighting during breakfast/lunch, and dim lights to intimate ambient levels for dinner",
          "Extinguish all emergency exit lights to create a dark romantic atmosphere",
          "Leave outdoor garden spotlights illuminated at full power throughout bright sunny afternoons"
        ],
        correct: 1,
        correctExplanation: "Zoned dimming and harvesting natural daylight saves power during daylight hours while creating tailored dining ambiances for evenings.",
        incorrectExplanation: "Incorrect. Daytime floodlighting wastes electricity; disabling emergency exit signage violates life-safety regulations.",
        optionFeedback: [
          "Incorrect. Illuminating powerful lights in direct sunlight wastes energy without improving visibility.",
          "Correct! Daylighting integration and zoned LED dimming optimizes guest dining ambiance while minimizing electrical consumption.",
          "Incorrect. Turning off emergency exit lighting violates statutory fire safety codes and endangers lives.",
          "Incorrect. Operating outdoor lighting during daylight hours represents pure unmetered energy waste."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Electric Golf Buggy & Fleet Charging): What charging practice optimizes battery longevity and energy efficiency for resort guest transport buggies?",
        options: [
          "Run buggy batteries until they are completely dead at 0% every single trip",
          "Leave buggy chargers running continuously in direct rain on bare muddy ground",
          "Charge buggies during off-peak nighttime hours, utilize smart multi-stage chargers, avoid deep discharges below 20%, and maintain battery water levels",
          "Connect buggy batteries directly to high-voltage industrial transmission lines"
        ],
        correct: 2,
        correctExplanation: "Nighttime off-peak charging with smart multi-stage controllers prevents battery thermal stress and extends asset lifespans.",
        incorrectExplanation: "Incorrect. Deep discharges below 20% shorten battery life; charging in rain creates severe electrocution risks.",
        optionFeedback: [
          "Incorrect. Complete discharges to 0% cause irreversible battery cell degradation and premature capacity loss.",
          "Incorrect. Exposing electrical chargers to rain creates severe short-circuit and electrocution hazards.",
          "Correct! Off-peak scheduled charging and avoiding deep discharges extends lead-acid and lithium battery lifecycle efficiency.",
          "Incorrect. Connecting low-voltage equipment to high-voltage lines causes catastrophic explosions and fires."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Buffet Warmers & Induction Cooking): How should food and beverage service teams operate buffet chafing dishes and plate warmers efficiently?",
        options: [
          "Use open gasoline fires under buffet tables instead of electric warmers",
          "Turn on all buffet heating lamps at 3:00 AM for a breakfast service that begins at 7:00 AM",
          "Leave electric soup warmers simmering at maximum temperature for three days continuously without food inside",
          "Power on induction warmers and heat lamps only 15 minutes before meal service begins, and shut them off immediately when service concludes"
        ],
        correct: 3,
        correctExplanation: "Turning on warmers shortly before service and shutting them off immediately at closing prevents hours of empty heating element power draw.",
        incorrectExplanation: "Incorrect. Preheating warmers hours in advance or running empty chafing dishes wastes energy and creates fire hazards.",
        optionFeedback: [
          "Incorrect. Open gasoline fires in dining areas create extreme explosion, toxic fume, and fire hazards.",
          "Incorrect. Preheating warmers 4 hours in advance wastes kilowatt-hours and dries out food pans.",
          "Incorrect. Running empty heating elements burns out electrical resistors and creates fire risks.",
          "Correct! Timed preheating and prompt post-service shutdown eliminates unnecessary electrical heating load."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Frontline Energy Idea Sharing): When a pool attendant discovers that pool filtration pumps run during peak tariff hours when the pool is closed, what action should they take?",
        options: [
          "Log an operational improvement ticket with Facilities to adjust pump timers to run during off-peak night hours when electricity rates are lower",
          "Smash the pool pump with a hammer to stop it from running",
          "Drain all water from the resort swimming pool into the ocean every night",
          "Keep quiet because pool attendants should never discuss energy issues"
        ],
        correct: 0,
        correctExplanation: "Shifting high-draw pump operations to off-peak night hours maintains water filtration standards while capturing lower electricity tariff rates.",
        incorrectExplanation: "Incorrect. Damaging equipment or draining pools disrupts operations; structured communication resolves timing efficiently.",
        optionFeedback: [
          "Correct! Re-scheduling pool filtration pumps to off-peak nighttime hours captures lower utility tariffs without compromising hygiene.",
          "Incorrect. Damaging mechanical equipment causes thousands of dollars in repairs and disrupts hotel amenities.",
          "Incorrect. Dumping treated swimming pool water wastes millions of litres of water and expensive sanitizing chemicals.",
          "Incorrect. Frontline employee observations are vital for uncovering timing optimizations across resort operations."
        ]
      }
    ]
  },

  // 10. ELH-33 (ID: 221) - Water Conservation & Stewardship in Hotels (8 Questions)
  {
    courseId: 221,
    courseCode: "ELH-33",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Low-Flow Fixtures & Guest Experience): How can hotel engineering install water-efficient showerheads and aerators without compromising guest shower pressure?",
        options: [
          "Install certified low-flow aerating showerheads (e.g. 7–9 litres/min) that mix air with water droplets to maintain strong sensory pressure while cutting volume",
          "Reduce water flow to a tiny trickle of 1 litre/min that takes 45 minutes to rinse soap off",
          "Remove showerheads completely and provide guests with an empty plastic cup",
          "Turn off all hot water boilers permanently to discourage guests from showering"
        ],
        correct: 0,
        correctExplanation: "Aerating low-flow fixtures inject air into the water stream, delivering a luxurious, full-pressure sensation while reducing flow by 40%.",
        incorrectExplanation: "Incorrect. Extreme restrictions frustrate guests and lead to longer showers, while aerated fixtures preserve comfort and save water.",
        optionFeedback: [
          "Correct! Aerating showerheads inject micro-air bubbles to maintain satisfying stream velocity while cutting water volume.",
          "Incorrect. Inadequate flow frustrates guests and causes them to take longer showers, eliminating water savings.",
          "Incorrect. Removing showerheads destroys luxury hospitality standards and invites customer complaints.",
          "Incorrect. Disabling hot water violates basic hospitality standards and health regulations."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Towel & Linen Reuse Program Execution): What is the most critical operational factor in making a guest towel and linen reuse program successful?",
        options: [
          "Housekeeping replaces all towels every morning regardless of whether the guest hung them up, rendering the card meaningless",
          "Housekeeping staff must strictly follow the guest's signal (e.g. replace only towels left on the floor; re-hang towels on rails), maintaining consistent guest trust",
          "Housekeeping removes all towels from the room and refuses to give them back",
          "The hotel charges a $50 fine every time a guest asks for a fresh towel"
        ],
        correct: 1,
        correctExplanation: "Strict adherence to guest signals builds trust; replacing towels that guests deliberately hung up destroys credibility and wastes water.",
        incorrectExplanation: "Incorrect. When staff ignore linen reuse cards and replace hung towels, guests feel the program is insincere greenwashing.",
        optionFeedback: [
          "Incorrect. Automatically replacing hung towels breaks trust and disincentivizes future guest participation.",
          "Correct! Respecting guest towel hanging signals preserves guest trust and achieves real laundry water and energy savings.",
          "Incorrect. Depriving guests of towels violates basic hygiene and guest service standards.",
          "Incorrect. Punitive charges for clean towels create severe guest frustration and negative reviews."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Commercial Kitchen Dishwashing Practices): In a high-volume resort kitchen, how should stewarding staff operate the dishwashing line to conserve water?",
        options: [
          "Wash every single teaspoon in a separate full dishwasher cycle",
          "Keep open high-flow hoses running continuously into empty sink basins for 8 hours",
          "Use high-efficiency pre-rinse spray valves (e.g. 4.5 L/min), scrape food solids into organic waste bins before rinsing, and run dishwashers only with full racks",
          "Rinse dishes using diesel fuel instead of clean water"
        ],
        correct: 2,
        correctExplanation: "High-efficiency trigger sprayers, dry scraping, and full rack washing minimize fresh water consumption and sewer discharge in commercial kitchens.",
        incorrectExplanation: "Incorrect. Continuously running hoses or washing partial racks wastes hundreds of litres of hot treated water per shift.",
        optionFeedback: [
          "Incorrect. Running partial dishwasher racks multiplies water, chemical, and electricity costs per dish.",
          "Incorrect. Continuous open running hoses waste thousands of litres of clean potable water every shift.",
          "Correct! High-efficiency spray valves, dry food scraping, and full-rack loading cut water consumption and water-heating energy.",
          "Incorrect. Using fuel on food-contact dishes causes deadly chemical poisoning and fire hazards."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Landscaping & Smart Irrigation): When watering resort tropical gardens, what practice prevents excessive evaporative water loss?",
        options: [
          "Pave over all trees with concrete to eliminate the need for water",
          "Run overhead spray sprinklers at 1:00 PM in blazing midday sun during 35°C heat and high wind",
          "Pour boiling chlorinated swimming pool water over all garden flowers",
          "Utilize drip irrigation systems, water during early morning or evening hours, apply organic mulch around plant roots, and use weather-sensor controllers"
        ],
        correct: 3,
        correctExplanation: "Drip irrigation, root mulching, and watering during early mornings/evenings minimizes evaporative loss and delivers water directly to root zones.",
        incorrectExplanation: "Incorrect. Midday spraying loses up to 50% of water to immediate evaporation before reaching plant roots.",
        optionFeedback: [
          "Incorrect. Paving gardens destroys biodiversity, creates heat islands, and degrades resort aesthetics.",
          "Incorrect. Midday overhead spraying causes massive evaporative loss and can scorch delicate foliage.",
          "Incorrect. Chlorinated water kills beneficial soil microbes and destroys plant root systems.",
          "Correct! Early morning drip irrigation and soil mulching delivers water directly to roots with minimal evaporative loss."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Cooling Tower Water Cycles of Concentration): How does an engineering team optimize water efficiency in HVAC cooling towers?",
        options: [
          "Drain and refill the entire cooling tower with freshwater every 10 minutes",
          "Maintain optimal water treatment chemistry to safely increase Cycles of Concentration (CoC) from 3 to 6+, reducing blowdown water discharge while preventing scale",
          "Add unmetered concentrated acid to cooling tower basins by hand",
          "Disconnect the cooling tower water supply line while keeping chillers running at full load"
        ],
        correct: 1,
        correctExplanation: "Increasing Cycles of Concentration (CoC) through automated water treatment reduces blowdown bleed-off, saving millions of litres of freshwater annually.",
        incorrectExplanation: "Incorrect. Frequent excessive draining wastes massive water, while running dry causes catastrophic chiller shutdowns.",
        optionFeedback: [
          "Incorrect. Rapid manual draining and refilling wastes massive quantities of clean water and chemical treatment.",
          "Correct! Increasing Cycles of Concentration through automated water treatment minimizes blowdown waste while protecting chiller tubes from scale.",
          "Incorrect. Uncontrolled acid dumping corrodes pipework and creates toxic effluent discharge violations.",
          "Incorrect. Running cooling towers without water causes immediate high-pressure chiller failure."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Rainwater Harvesting & Greywater Reuse): How can a hotel safely utilize recycled greywater (treated laundry/shower water)?",
        options: [
          "Store untreated raw greywater in open uncovered barrels in guest dining rooms",
          "Connect treated greywater pipes directly to guestroom drinking water taps",
          "Filter and disinfect greywater through a dedicated dual-plumbing system strictly for landscape irrigation and toilet flushing, with clear purple pipe identification",
          "Dump greywater directly onto guest dinner plates before washing"
        ],
        correct: 2,
        correctExplanation: "Treated greywater safely offsets non-potable demands (toilet flushing, irrigation) through dedicated, color-coded dual plumbing systems.",
        incorrectExplanation: "Incorrect. Greywater must never be cross-connected to potable drinking lines or stored untreated near dining spaces.",
        optionFeedback: [
          "Incorrect. Storing untreated greywater indoors creates foul odors, bacteria growth, and health hazards.",
          "Incorrect. Cross-connecting non-potable greywater to drinking taps introduces severe microbiological health risks.",
          "Correct! Dedicated purple-pipe distribution of treated greywater for toilet flushing and irrigation safely cuts potable water demand by up to 30%.",
          "Incorrect. Applying wastewater to food surfaces violates fundamental sanitation and hygiene standards."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Rapid Toilet Cistern Leak Detection): How can housekeeping room attendants quickly verify whether a silent toilet cistern flapper leak exists during daily room cleaning?",
        options: [
          "Smash the ceramic toilet cistern with a hammer during room cleaning",
          "Wait for the toilet bowl to completely overflow and flood the guestroom hallway",
          "Pour cement into the toilet bowl to seal all pipes permanently",
          "Perform the food coloring / dye tablet test in the cistern tank; if colored water appears in the toilet bowl without flushing, a flapper leak exists"
        ],
        correct: 3,
        correctExplanation: "The non-toxic dye test detects silent flapper leaks that lose up to 1,000 litres per day without making audible noise.",
        incorrectExplanation: "Incorrect. Waiting for floods allows massive continuous water waste; damaging ceramics creates expensive repairs.",
        optionFeedback: [
          "Incorrect. Breaking ceramic fixtures creates dangerous sharp debris and high replacement costs.",
          "Incorrect. Waiting for visible overflow allows hundreds of thousands of litres of water to be lost undetected.",
          "Incorrect. Cementing toilet bowls destroys sanitary plumbing and renders guestrooms unusable.",
          "Correct! The simple dye tablet test identifies silent flapper valve leaks instantly, allowing prompt maintenance replacement."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Water Stewardship & Community Water Basins): Why is corporate water stewardship in island tourism broader than just reducing hotel utility bills?",
        options: [
          "Hotels share finite municipal aquifers and coastal watersheds with local communities and ecosystems; responsible stewardship protects shared freshwater resilience",
          "Hotels own all rainfall that falls from the sky and have the right to deplete all local wells",
          "Community water access has zero connection to hotel operations or brand reputation",
          "Water stewardship is an optional public relations exercise that carries no operational significance"
        ],
        correct: 0,
        correctExplanation: "Water stewardship acknowledges shared watershed dependencies; conserving groundwater prevents aquifer depletion and saline intrusion in island communities.",
        incorrectExplanation: "Incorrect. Excessive commercial water draw in island environments threatens community drinking supplies and causes coastal aquifer salinization.",
        optionFeedback: [
          "Correct! Responsible water stewardship protects shared island groundwater from depletion and seawater intrusion, ensuring community and business resilience.",
          "Incorrect. Rainwater and groundwater are shared public resources governed by national water authorities.",
          "Incorrect. Depleting shared community water sources creates intense social conflict and reputational damage.",
          "Incorrect. Water security is a strategic operational risk critical to long-term hospitality viability."
        ]
      }
    ]
  },

  // 11. ELH-34 (ID: 225) - Waste Minimisation & Single-Use Reduction in Hospitality (8 Questions)
  {
    courseId: 225,
    courseCode: "ELH-34",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Eliminating Single-Use Plastic Guest Amenities): How can a luxury resort successfully eliminate miniature single-use plastic shampoo and shower gel bottles?",
        options: [
          "Install tamper-evident, high-quality refillable wall-mounted ceramic/stainless dispensers filled from bulk certified organic concentrates",
          "Eliminate all soap and shampoo completely and tell guests to wash with seawater",
          "Replace plastic miniature bottles with single-use plastic sachets that are twice as difficult to recycle",
          "Require guests to purchase expensive plastic bottles at the front desk upon arrival"
        ],
        correct: 0,
        correctExplanation: "Tamper-evident refillable bulk dispensers eliminate millions of miniature plastic bottles while maintaining luxury aesthetic and hygiene standards.",
        incorrectExplanation: "Incorrect. Removing amenities degrades luxury service, while plastic sachets increase non-recyclable waste.",
        optionFeedback: [
          "Correct! Elegant, refillable bulk dispensers eliminate tons of single-use plastic waste while preserving guest luxury and hygiene.",
          "Incorrect. Depriving luxury guests of basic hygiene amenities destroys customer satisfaction and brand reputation.",
          "Incorrect. Plastic sachets generate hard-to-recycle multi-layer foil and plastic litter.",
          "Incorrect. Forcing guests to buy basic amenities creates frustration and negative reviews."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Buffet Food Waste Reduction - Source Reduction): What kitchen production technique best prevents buffet over-production food waste in hotel dining?",
        options: [
          "Cook 500 kg of food for 20 guests and leave it standing uncovered under heat lamps for 10 hours",
          "Utilize live interactive cooking stations, smaller presentation platters replenished frequently, and dynamic forecasting based on real-time guest headcounts",
          "Serve raw unpeeled potatoes on buffets to force guests to cook their own food",
          "Mandate that guests eat all food left on the buffet before they are allowed to leave the restaurant"
        ],
        correct: 1,
        correctExplanation: "Small-batch frequent replenishment, live cooking, and precise headcount forecasting prevent excessive food preparation and waste.",
        incorrectExplanation: "Incorrect. Massive static buffet displays lead to unconsumed food disposal; coercive guest rules destroy hospitality.",
        optionFeedback: [
          "Incorrect. Massive over-preparation leads to unconsumed food spoilage and high organic waste disposal costs.",
          "Correct! Small presentation platters with frequent kitchen replenishment and live cooking drastically cut buffet prep waste.",
          "Incorrect. Expecting guests to prepare raw ingredients violates restaurant service standards.",
          "Incorrect. Forcing guests to consume excess food is disrespectful and violates hospitality standards."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Organic Food Waste Composting & Animal Feed): When implementing food waste segregation in kitchen prep areas, how should clean vegetable trimmings be managed?",
        options: [
          "Pour raw food waste into the guest swimming pool to feed small fish",
          "Mix vegetable scraps with broken glass, plastic wrap, and chemical cleaners in general waste bins",
          "Segregate clean prep trimmings into designated organic bins for on-site aerated composting or partnerships with licensed local livestock farmers",
          "Burn raw vegetable peels in an open indoor fireplace in the hotel lobby"
        ],
        correct: 2,
        correctExplanation: "Clean organic waste segregation enables circular nutrient recovery through composting for resort gardens or local agricultural feed.",
        incorrectExplanation: "Incorrect. Contaminating organics with glass or chemicals ruins composting and creates dangerous livestock hazards.",
        optionFeedback: [
          "Incorrect. Dumping food into swimming pools causes severe microbial contamination and biohazards.",
          "Incorrect. Mixing glass and toxic chemicals into food scraps prevents recycling and creates hazardous landfill waste.",
          "Correct! Source-segregated organics create nutrient-rich compost for resort landscaping and divert waste from landfills.",
          "Incorrect. Burning wet organic waste indoors produces toxic smoke, odour, and severe fire hazards."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Single-Use Drinking Straw & Cup Policy): What is the most sustainable approach to beverage service across resort pool and beach bars?",
        options: [
          "Instruct bartenders to throw empty plastic cups into the ocean after every drink",
          "Provide three plastic straws in every drink and wrap each cup in plastic shrink-wrap",
          "Ban all beverages completely across the resort property",
          "Eliminate disposable plastic cups and straws, serve drinks in durable reusable polycarbonate/glassware, and provide natural straws (e.g. paper/bamboo) only upon guest request"
        ],
        correct: 3,
        correctExplanation: "Reusable drinkware and an 'upon-request' straw policy eliminate thousands of single-use plastic items while maintaining beverage quality.",
        incorrectExplanation: "Incorrect. Multiplying single-use plastic or littering into marine environments causes severe ecological damage and regulatory violations.",
        optionFeedback: [
          "Incorrect. Discarding plastic into the ocean destroys marine life and violates maritime protection laws.",
          "Incorrect. Excessive plastic straws and plastic wrap multiplies avoidable single-use plastic waste.",
          "Incorrect. Banning beverages violates basic guest hospitality and refreshment expectations.",
          "Correct! Durable reusable cups with straw-on-demand policies drastically reduce single-use plastic consumption at beach bars."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Glass Bottle Circularity & Reverse Logistics): How can a hotel eliminate single-use plastic water bottles for guest drinking water?",
        options: [
          "Purchase 50,000 single-use plastic water bottles every week and discard them in general waste skips",
          "Install an on-site glass bottling plant with multi-stage water filtration, bottling chilled still and sparkling water in reusable, sanitized glass bottles",
          "Instruct guests to drink unfiltered water directly from bathroom garden hoses",
          "Require guests to carry empty water buckets to local mountain streams"
        ],
        correct: 1,
        correctExplanation: "On-site glass bottling systems provide pristine filtered still/sparkling water in reusable sanitized bottles, eliminating plastic completely.",
        incorrectExplanation: "Incorrect. Buying tens of thousands of disposable plastic bottles generates massive waste; unverified hose water introduces health risks.",
        optionFeedback: [
          "Incorrect. Single-use plastic bottles create immense landfill and ocean plastic pollution.",
          "Correct! On-site glass bottling plants eliminate hundreds of thousands of single-use plastic bottles annually while delivering premium water.",
          "Incorrect. Garden hoses are not food-grade and risk microbiological contamination.",
          "Incorrect. Luxury hospitality requires seamless on-site premium drinking water provision."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Hazardous Waste Segregation in Maintenance): Where should hotel engineering dispose of spent fluorescent lighting tubes, empty aerosol cans, and lithium batteries?",
        options: [
          "Throw lithium batteries into outdoor barbecue fire pits",
          "Crush fluorescent tubes with a hammer in general waste skips to save space",
          "Store in secure, labelled hazardous waste containment drums and transfer to a licensed, certified hazardous waste handler with signed consignment notes",
          "Bury aerosol cans in the sand on the guest public beach"
        ],
        correct: 2,
        correctExplanation: "Hazardous items require segregated storage and transfer to licensed handlers with chain-of-custody documentation to prevent toxic contamination.",
        incorrectExplanation: "Incorrect. Crushing fluorescent tubes releases toxic mercury vapor; throwing batteries in fire creates explosive chemical hazards.",
        optionFeedback: [
          "Incorrect. Heating lithium batteries causes thermal runaway, explosive combustion, and toxic gas release.",
          "Incorrect. Crushing fluorescent tubes releases toxic mercury gas, causing severe respiratory poisoning.",
          "Correct! Licensed hazardous waste handlers ensure safe recycling of mercury, lithium, and aerosol propellants under duty-of-care laws.",
          "Incorrect. Burying aerosol cans on beaches creates metal rust hazards, soil contamination, and injury risks."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Front-of-House Multi-Stream Waste Bins): What design ensures hotel guests and staff sort recyclables accurately in lobby and pool areas?",
        options: [
          "Writing 500-word academic essays on bin lids in tiny unreadable font",
          "Single unlabelled black bins with no signage or instructions",
          "Hiding waste bins in locked cabinets so guests cannot find them",
          "Clear colour-coded bins with intuitive iconography, shaped openings (e.g. round hole for bottles, slot for paper), and localized multilingual labels"
        ],
        correct: 3,
        correctExplanation: "Shaped apertures, distinct color coding, and simple iconography provide instant visual clarity and prevent recycling cross-contamination.",
        incorrectExplanation: "Incorrect. Unlabelled bins or hidden receptacles lead to mixed general waste dumping and high contamination rates.",
        optionFeedback: [
          "Incorrect. Dense text walls are ignored by passing guests and fail to guide correct sorting.",
          "Incorrect. Unlabelled bins result in 100% mixed garbage and zero recyclable recovery.",
          "Incorrect. Inaccessible bins lead to widespread littering in public hotel areas.",
          "Correct! Shaped openings, contrasting colours, and intuitive icons guide effortless, accurate source separation."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Engaging Suppliers in Circular Packaging): How should a resort procurement manager work with local F&B suppliers to cut secondary packaging waste?",
        options: [
          "Incorporate reusable returnable plastic/wooden crate agreements into contracts, requiring suppliers to take back delivery containers on subsequent trips",
          "Demand that suppliers wrap every delivery box in ten layers of disposable cling wrap",
          "Instruct warehouse staff to throw all supplier delivery crates into the ocean",
          "Cancel all supplier relationships and stop serving food to guests"
        ],
        correct: 0,
        correctExplanation: "Contractual returnable packaging agreements establish closed-loop reverse logistics, eliminating recurring single-use cardboard and plastic.",
        incorrectExplanation: "Incorrect. Single-use shrink wrap generates tons of plastic film waste; dumping crates into waterways violates environmental laws.",
        optionFeedback: [
          "Correct! Closed-loop returnable crates eliminate secondary packaging waste while reducing supplier packaging procurement costs.",
          "Incorrect. Excessive plastic wrap multiplies non-recyclable plastic film waste.",
          "Incorrect. Dumping delivery containers into the sea creates marine pollution and destroys valuable logistics assets.",
          "Incorrect. Collaborative supplier partnerships solve packaging challenges without disrupting hotel operations."
        ]
      }
    ]
  },

  // 12. ELH-35 (ID: 710) - Sustainable Housekeeping Operations (8 Questions)
  {
    courseId: 710,
    courseCode: "ELH-35",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Eco-Certified Cleaning Chemicals & Dilution): Why should housekeeping departments use automated chemical proportioners with eco-certified cleaning concentrates?",
        options: [
          "Automated dilution ensures accurate chemical ratios, prevents skin/respiratory irritation, protects surfaces, and reduces chemical runoff toxicity",
          "Automated dispensers allow staff to pour 100% raw undiluted acid onto marble bathroom counters",
          "Eco-certified chemicals require no water and can be wiped with dry hands without gloves",
          "Chemical proportioners eliminate the need to ever clean guestrooms again"
        ],
        correct: 0,
        correctExplanation: "Automated proportioners eliminate over-dosing, protect employee health, reduce plastic packaging waste, and lower aquatic toxicity.",
        incorrectExplanation: "Incorrect. Manual guesswork often results in dangerous chemical over-concentration that damages fixtures and harms staff.",
        optionFeedback: [
          "Correct! Automated dispensers prevent chemical over-dosing, protect worker respiratory health, and minimize aquatic toxicity.",
          "Incorrect. Pouring undiluted acid destroys polished marble surfaces and causes severe chemical burns.",
          "Incorrect. Eco-certified concentrates require specified water dilution and appropriate safety PPE.",
          "Incorrect. Chemical dilution systems assist effective cleaning; they do not replace physical sanitation."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Microfiber Cloth Color-Coding & Laundering): How does a standardized color-coded microfiber system prevent cross-contamination while saving water?",
        options: [
          "Using a single dirty rag to clean every toilet, drinking glass, and pillowcase in 30 guestrooms",
          "Designating specific colors for specific zones (e.g. Red for toilets, Yellow for washbasins, Blue for glass) prevents biological cross-contamination, while reusable microfiber traps dirt with minimal chemical water",
          "Throwing away microfiber cloths into general trash after a single 2-minute use",
          "Boiling microfiber cloths in industrial bleach until the fabric disintegrates"
        ],
        correct: 1,
        correctExplanation: "Color-coded microfibers ensure strict hygiene separation between sanitary and living areas, and their split-fiber structure traps dirt with less chemical water.",
        incorrectExplanation: "Incorrect. Cross-using cloths spreads fecal bacteria to food/glass surfaces; single-use discarding defeats the purpose of durable microfiber.",
        optionFeedback: [
          "Incorrect. Cross-using cloths between toilets and drinking glasses spreads dangerous pathogenic bacteria.",
          "Correct! Color coding ensures strict hygiene separation, while washable microfiber fibers trap bacteria with minimal water and chemicals.",
          "Incorrect. High-quality microfiber cloths are engineered to be washed and reused hundreds of times.",
          "Incorrect. Boiling microfiber in harsh bleach melts synthetic fibers and destroys their electrostatic dirt-trapping capability."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Guestroom Natural Lighting & Ventilation during Cleaning): What energy-saving habit should room attendants practice while cleaning guestrooms during daylight hours?",
        options: [
          "Leave balcony doors wide open for 3 hours while running the air conditioner at 16°C",
          "Turn on all lights, bedside lamps, and bathroom spotlights while keeping blackout curtains fully closed",
          "Open sheer curtains to work under natural daylight instead of switching on all room lighting, and keep balcony doors closed while air conditioning is running",
          "Turn on the room television at maximum volume while cleaning an empty room"
        ],
        correct: 2,
        correctExplanation: "Utilizing daylight avoids artificial lighting energy, and keeping balcony doors closed prevents hot humid air from overloading the AC compressor.",
        incorrectExplanation: "Incorrect. Running cooling with open doors causes continuous compressor overloading and creates severe condensation mould.",
        optionFeedback: [
          "Incorrect. Open balcony doors during air conditioning draws in humid tropical air, causing severe condensation and energy waste.",
          "Incorrect. Closing curtains to work under artificial spotlights wastes electricity unnecessarily.",
          "Correct! Working with natural daylight and keeping exterior doors closed prevents unnecessary lighting draw and AC compressor overload.",
          "Incorrect. Running televisions in unoccupied rooms wastes electrical power and creates disturbance."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Managing Unused Guest Amenities): When inspecting a departing guestroom, how should attendants handle unopened, pristine dry amenities (e.g. vanity kits, shower caps)?",
        options: [
          "Flush all unused plastic amenities down the guestroom toilet",
          "Tear open all sealed boxes and throw all unused items into general waste skips",
          "Take all guest amenities home in personal pockets without authorization",
          "Inspect sealed packaging for integrity and hygiene; if completely untouched and sealed, retain for the next guest to avoid unnecessary waste"
        ],
        correct: 3,
        correctExplanation: "Inspecting and preserving untouched, sealed dry amenities prevents discarding functional products while maintaining strict hygiene standards.",
        incorrectExplanation: "Incorrect. Throwing away pristine sealed items creates unnecessary waste; flushing plastic causes severe sewer blockages.",
        optionFeedback: [
          "Incorrect. Flushing solid amenities down toilets causes severe pipe blockages and sewer overflows.",
          "Incorrect. Automatically discarding untouched sealed amenities generates unnecessary landfill waste and costs.",
          "Incorrect. Unauthorized removal of company supplies violates internal workplace conduct policies.",
          "Correct! Preserving verified sealed, pristine dry amenities prevents unnecessary packaging waste while maintaining hygiene."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Ergonomics & Sustainable Housekeeping Trolleys): How does proper housekeeping trolley organization reduce physical strain and operational waste?",
        options: [
          "Overloading trolleys with 500 kg of supplies to avoid ever visiting the linen room",
          "Stocking organized trolleys with measured chemical dispensers, color-coded cloths, and ergonomic lightweight vacuums prevents repetitive strain injuries and extra trips",
          "Removing trolley wheels so attendants must drag heavy metal carts across carpeted floors",
          "Carrying all cleaning chemicals loose in glass bottles in apron pockets"
        ],
        correct: 1,
        correctExplanation: "Ergonomic, well-stocked trolleys optimize workflow, minimize fatigue and injury risks, and ensure proper equipment is immediately accessible.",
        incorrectExplanation: "Incorrect. Overloading or dragging carts causes severe musculoskeletal injuries and damages property.",
        optionFeedback: [
          "Incorrect. Overloading carts creates severe musculoskeletal strain and tipping hazards.",
          "Correct! Ergonomic trolley design and organized par-stocking reduces physical fatigue, prevents injuries, and streamlines cleaning cycles.",
          "Incorrect. Dragging wheelless carts damages carpet and causes debilitating back injuries.",
          "Incorrect. Carrying glass chemical bottles in clothing pockets risks shattering and severe acid/caustic burns."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Eco-Friendly Odour Management): Instead of spraying synthetic aerosol perfumes to mask room odours, what is the sustainable housekeeping solution?",
        options: [
          "Paint over wet mouldy walls with regular wall paint to hide the smell",
          "Spray an entire can of synthetic aerosol air freshener into the room to mask mould",
          "Identify and clean the root moisture/bacteria source, ventilate the space with fresh air, clean HVAC return filters, and use non-toxic enzymatic odour neutralizers",
          "Burn incense and scented candles inside guest wardrobes"
        ],
        correct: 2,
        correctExplanation: "Targeting root moisture sources and utilizing non-toxic enzymatic neutralizers eliminates odours permanently without polluting indoor air.",
        incorrectExplanation: "Incorrect. Aerosol sprays contain volatile organic compounds (VOCs) that mask symptoms while leaving harmful bacteria/mould active.",
        optionFeedback: [
          "Incorrect. Painting over active mould traps moisture, accelerating structural decay and spore proliferation.",
          "Incorrect. Heavy aerosol sprays release toxic VOCs that trigger guest allergies while leaving the underlying mould uncleaned.",
          "Correct! Eliminating the moisture/bacterial source and using enzymatic neutralizers solves odours without releasing harmful VOCs.",
          "Incorrect. Open flames and burning candles inside wardrobes present an extreme fire hazard."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Sustainable Vacuum Cleaner Maintenance): What maintenance step ensures commercial upright vacuum cleaners maintain high suction efficiency and low power draw?",
        options: [
          "Wash the electrical vacuum motor with water while it is plugged into the wall",
          "Allow vacuum bags to burst with compacted dirt inside the machine motor compartment",
          "Cut off the electrical ground pin from the vacuum plug to make the cord lighter",
          "Empty dust collection bags when 2/3 full, clean brush rollers of entangled hair, and inspect HEPA exhaust filters regularly"
        ],
        correct: 3,
        correctExplanation: "Emptying bags, clearing rollers, and servicing HEPA filters prevents motor overheating, extends equipment life, and maintains strong suction.",
        incorrectExplanation: "Incorrect. Overfilled bags choke motor airflow, causing motor burnout and blowing fine dust back into indoor air.",
        optionFeedback: [
          "Incorrect. Exposing live electrical motors to water causes catastrophic short circuits and lethal shocks.",
          "Incorrect. Overfilling vacuum bags chokes motor cooling airflow, causing motor burnouts and poor dust pickup.",
          "Incorrect. Removing electrical grounding pins creates severe electrical shock and electrocution hazards.",
          "Correct! Regular bag emptying, roller cleaning, and filter servicing prevents motor strain, extends lifespan, and protects indoor air quality."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Reporting Room Maintenance Deficiencies): When a room attendant notices a leaking bathroom basin pipe and a loose window latch during cleaning, what is the required standard operating procedure?",
        options: [
          "Log an immediate maintenance work order with specific room number and fault details in the digital housekeeping management system before releasing the room",
          "Ignore both issues and release the room as ready for arriving guests",
          "Wrap the leaking pipe with toilet paper and hope the guest does not notice",
          "Blame the arriving guest for breaking the pipe before they check in"
        ],
        correct: 0,
        correctExplanation: "Prompt digital work order logging ensures engineering repairs water leaks and structural latches before guest check-in, preventing water damage.",
        incorrectExplanation: "Incorrect. Ignoring leaks allows continuous water loss, structural damage, and severe guest complaints.",
        optionFeedback: [
          "Correct! Prompt work order logging triggers rapid engineering repair, preventing water waste and ensuring guest satisfaction.",
          "Incorrect. Releasing rooms with active leaks leads to guest dissatisfaction and continuous water loss.",
          "Incorrect. Toilet paper does not stop pressurized plumbing leaks and creates a messy, unprofessional appearance.",
          "Incorrect. Falsely blaming guests destroys hotel reputation and customer trust."
        ]
      }
    ]
  }
];

export async function ensureCohort15_2_10CRemediation(): Promise<void> {
  try {
    const [existingSeed] = await db
      .select()
      .from(systemSeedsTable)
      .where(eq(systemSeedsTable.name, "sprint-15-2-10c-assessment-remediation"))
      .limit(1);

    if (existingSeed && (existingSeed.version ?? 1) >= 2) {
      logger.info("Sprint 15.2.10C Controlled Assessment Quality Remediation (v2 balanced keys) already applied. Skipping runtime rewrite.");
      return;
    }

    await db.transaction(async (tx) => {
      logger.info("Executing Sprint 15.2.10C Controlled Assessment Quality Remediation...");

      for (const cohortData of COHORT_15_2_10C_DATA) {
        const { courseId, courseCode, passingScore, questions } = cohortData;

        // 1. Update course passing score to standardized 80%
        await tx
          .update(coursesTable)
          .set({
            passingScore,
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, courseId));

        // 2. Update questions in-place (preserving question IDs for historical attempts) or insert if count differs
        const existingQs = await tx
          .select()
          .from(quizQuestionsTable)
          .where(eq(quizQuestionsTable.courseId, courseId));
        const activeExisting = existingQs
          .filter((eqRow) => !eqRow.isArchived)
          .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0) || a.id - b.id);

        if (activeExisting.length === questions.length) {
          for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const targetRow = activeExisting[i];
            await tx
              .update(quizQuestionsTable)
              .set({
                question: q.question,
                options: q.options,
                correctOption: q.correct,
                orderIndex: q.order,
                correctExplanation: q.correctExplanation,
                incorrectExplanation: q.incorrectExplanation,
                optionFeedback: q.optionFeedback,
                competencyArea: q.competencyArea ?? null,
                sourceCourseId: q.sourceCourseId ?? null,
                isArchived: false,
              })
              .where(eq(quizQuestionsTable.id, targetRow.id));
          }
        } else {
          await tx.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
          await tx.insert(quizQuestionsTable).values(
            questions.map((q) => ({
              courseId,
              question: q.question,
              options: q.options,
              correctOption: q.correct,
              orderIndex: q.order,
              correctExplanation: q.correctExplanation,
              incorrectExplanation: q.incorrectExplanation,
              optionFeedback: q.optionFeedback,
              competencyArea: q.competencyArea ?? null,
              sourceCourseId: q.sourceCourseId ?? null,
              isArchived: false,
            }))
          );
        }

        logger.info({ courseId, courseCode, count: questions.length }, "Remediated course assessment with complete option-level feedback and scenarios.");
      }

      // Record seed version
      await tx
        .insert(systemSeedsTable)
        .values({
          name: "sprint-15-2-10c-assessment-remediation",
          version: 2,
        })
        .onConflictDoUpdate({
          target: systemSeedsTable.name,
          set: { version: 2, runAt: new Date() },
        });

      logger.info("Sprint 15.2.10C Controlled Assessment Quality Remediation transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute Sprint 15.2.10C assessment remediation");
    throw err;
  }
}
