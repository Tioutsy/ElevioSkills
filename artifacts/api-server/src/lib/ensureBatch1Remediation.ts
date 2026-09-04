import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  enrollmentsTable,
  lessonProgressTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger";

export interface RemediatedCourseDefinition {
  courseCode: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  categoryId: number;
  durationMinutes: number;
  priceUsd: string;
  level: string;
  isFeatured: boolean;
  thumbnailUrl: string;
  intendedRoles: string[];
  learningObjectives: string[];
  includesCertificate: boolean;
  passingScore: number;
  completionMessage: string;
  badgeName: string;
  badgeDescription: string;
  badgeSlug: string;
  relevanceLayer: string;
  primaryClassification: string;
  isEssentialUniversal: boolean;
  primaryCompetency: string;
  secondaryCompetencies: string[];
  applicableSectors: string[];
  applicableDepartments: string[];
  applicableJobFamilies: string[];
  applicableSeniorityTiers: string[];
  productionPriority: string;
  learningPathPurpose: string;
  lessons: Array<{
    order: number;
    title: string;
    minutes: number;
    content: string;
    blocks: any[];
  }>;
  quiz: Array<{
    question: string;
    options: string[];
    correct: number;
    order: number;
    correctExplanation: string;
    incorrectExplanation: string;
    optionFeedback?: string[];
  }>;
}

export const BATCH_1_REMEDIATED_COURSES: RemediatedCourseDefinition[] = [
  // =========================================================================
  // 1. ELH-01: Sustainability Foundations & ESG Core Principles (D1 Awareness)
  // =========================================================================
  {
    courseCode: "ELH-01",
    title: "Sustainability Foundations & ESG Core Principles",
    slug: "sustainability-foundations-and-esg-core-principles",
    description: "Connect environmental, social and governance dimensions to everyday workplace choices, verifiable actions and credible commitments.",
    fullDescription: "Sustainability in modern enterprise is far more than an environmental buzzword. This foundational course unpacks how Environmental, Social, and Governance (ESG) principles intersect with daily commercial operations. Learners explore how individual choices influence resource use, workplace dignity, transparency, and organizational resilience in Mauritius.",
    categoryId: 1,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Foundational Awareness",
    isFeatured: true,
    thumbnailUrl: "/images/courses/sustainability-foundations.jpg",
    intendedRoles: ["All Employees", "Team Leads", "Department Champions", "New Hires"],
    learningObjectives: [
      "Explain the interconnected Environmental, Social, and Governance (ESG) pillars in simple commercial language.",
      "Distinguish between passive awareness, tangible operational action, and verifiable ESG evidence.",
      "Identify high-impact everyday decisions within standard administrative, operational, and customer-facing roles.",
      "Evaluate workplace trade-offs between short-term convenience and long-term sustainability outcomes.",
      "Complete 8 scenario-based evaluation questions analyzing workplace sustainability decisions.",
      "Select and commit to one verifiable workplace sustainability action."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Sustainability Foundations & ESG Core Principles.",
    badgeName: "Sustainability Practitioner",
    badgeDescription: "Awarded for demonstrating foundational mastery of ESG principles, trade-off evaluation, and verifiable workplace action.",
    badgeSlug: "sustainability-practitioner",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_SUSTAINABILITY_FOUNDATIONS",
    secondaryCompetencies: ["COMP_GOVERNANCE", "COMP_CIRCULARITY"],
    applicableSectors: ["SEC_ALL"],
    applicableDepartments: ["DEP_ALL"],
    applicableJobFamilies: ["JF_ALL"],
    applicableSeniorityTiers: ["SEN_ALL"],
    productionPriority: "p0",
    learningPathPurpose: "Build universal corporate baseline literacy in environmental stewardship, social responsibility, and governance integrity.",
    lessons: [
      {
        order: 0,
        title: "The Reality of Modern Workplace Sustainability",
        minutes: 4,
        content: "Understanding how daily enterprise decisions impact local ecosystems and business viability.",
        blocks: [
          { id: "elh01-h1", type: "heading", position: 1, headingText: "Beyond Generic Promises" },
          { id: "elh01-t1", type: "short_text", position: 2, bodyText: "Corporate sustainability is not about vague aspirations or marketing slogans. It is the disciplined management of environmental impacts, human wellbeing, and ethical governance to ensure long-term commercial survival." },
          { id: "elh01-c1", type: "callout", position: 3, calloutType: "info", bodyText: "In island environments like Mauritius, physical resources (water aquifers, landfill capacity, and import supply lines) have strict boundaries. Inefficient operations directly inflate municipal costs and ecological risk." },
          { id: "elh01-k1", type: "key_message", position: 4, headingText: "The Core Principle", bodyText: "Every operational process either consumes finite capital or builds systemic resilience. True sustainability starts with eliminating avoidable waste before consumption occurs." }
        ]
      },
      {
        order: 1,
        title: "The Three Connected ESG Pillars",
        minutes: 4,
        content: "Examining the synergy between Environmental, Social, and Governance pillars.",
        blocks: [
          { id: "elh01-h2", type: "heading", position: 1, headingText: "E, S, and G in Daily Practice" },
          { id: "elh01-t2", type: "short_text", position: 2, bodyText: "The three ESG pillars do not operate in silos. A decision made in one dimension invariably ripples across the others:" },
          { id: "elh01-t3", type: "short_text", position: 3, bodyText: "• Environmental (E): Energy efficiency, water conservation, material circularity, and direct emission reduction.\n• Social (S): Workplace health, non-discrimination, fair labor standards, and constructive community relations.\n• Governance (G): Transparent record-keeping, anti-corruption, conflict-of-interest disclosures, and accountability." },
          { id: "elh01-c2", type: "callout", position: 4, calloutType: "warning", bodyText: "An organization that cuts electricity emissions while exploiting subcontractors or masking financial records fails holistic ESG compliance." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: The Green Packaging Dilemma",
        minutes: 4,
        content: "Evaluating commercial trade-offs in operational procurement.",
        blocks: [
          { id: "elh01-h3", type: "heading", position: 1, headingText: "Scenario: Supplier Selection Trade-off" },
          {
            id: "elh01-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Evaluating Supplier Environmental Claims",
            situation: "Your department must purchase 5,000 corporate amenity containers. Supplier X offers generic plastic containers at lowest cost with no documentation. Supplier Y offers containers labelled '100% Eco-Friendly' at 20% premium, but provides no third-party audit or material data sheet. Supplier Z provides recyclable aluminum containers at a 10% premium with ISO 14001 certification and a certified local recycling take-back agreement.",
            prompt: "Which procurement decision represents defensible, evidence-based sustainability?",
            options: [
              { id: "opt1", text: "Select Supplier Y because the 'Eco-Friendly' label protects the brand reputation without needing further paperwork.", isCorrect: false, feedback: "Unverified marketing claims constitute greenwashing and expose the company to regulatory and reputational risk." },
              { id: "opt2", text: "Select Supplier Z because certified material specifications and verifiable local take-back agreements ensure genuine circularity.", isCorrect: true, feedback: "Correct. Credible sustainability requires third-party verification and closed-loop material disposal rather than unevidenced marketing labels." },
              { id: "opt3", text: "Select Supplier X because cost minimization is the only fiduciary duty of procurement.", isCorrect: false, feedback: "Ignoring whole-life disposal costs and environmental compliance increases operational and regulatory risks." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Workplace Safety vs Schedule Pressure",
        minutes: 4,
        content: "Navigating operational dilemmas under project deadlines.",
        blocks: [
          { id: "elh01-h4", type: "heading", position: 1, headingText: "Scenario: Social Pillar in Action" },
          {
            id: "elh01-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Contractor Safety Under Project Deadlines",
            situation: "A major client site launch is 24 hours away. A third-party electrical contractor arrives without certified personal protective equipment (PPE) and proposes completing high-voltage wiring without standard lock-out/tag-out isolation to meet the opening deadline.",
            prompt: "How must a supervisor respond in accordance with core ESG governance?",
            options: [
              { id: "opt1", text: "Halt the electrical work immediately until proper PPE and safety isolation protocols are verified, escalating the schedule delay transparently.", isCorrect: true, feedback: "Correct. Human safety and labor rights (Social/Governance) strictly supersede commercial schedule pressures." },
              { id: "opt2", text: "Allow the contractor to proceed since third-party safety liability sits solely with their external employer.", isCorrect: false, feedback: "Organizations maintain duty of care on their premises. Delegating safety liability is illegal and violates social governance." },
              { id: "opt3", text: "Instruct the contractor to work quickly and quietly so health inspectors do not notice.", isCorrect: false, feedback: "Concealing safety hazards constitutes deliberate governance failure and endangers human life." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action & Commitment",
        minutes: 4,
        content: "Selecting an actionable sustainability commitment for daily execution.",
        blocks: [
          { id: "elh01-h5", type: "heading", position: 1, headingText: "Your Personal Workplace Action" },
          { id: "elh01-t4", type: "short_text", position: 2, bodyText: "Select one practical commitment from the standard register to execute over the next 30 days:" },
          {
            id: "elh01-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Audit departmental energy use at end-of-day shift (shutting down standby monitors, printers, and localized AC).",
              "Enforce clean waste segregation at desk stations by removing single-use plastic cups and utilizing central sorting bins.",
              "Conduct monthly review of departmental supplier invoices to identify packaging reduction opportunities."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "What is the core definition of operational sustainability in enterprise management?",
        options: [
          "Meeting organizational needs without compromising the capacity of future generations and ecosystems.",
          "Investing surplus profits exclusively in external philanthropic donations.",
          "Replacing all business equipment with digital subscriptions regardless of cost.",
          "Eliminating all corporate travel and customer meetings."
        ],
        correct: 0,
        correctExplanation: "Operational sustainability balances present operational needs with long-term ecological, social, and economic viability.",
        incorrectExplanation: "Sustainability is not limited to philanthropy or arbitrary operational bans; it is systemic resource and impact management.",
        optionFeedback: [
          "Correct. Operational sustainability balances present operational needs with long-term ecological, social, and economic viability.",
          "Philanthropy is charitable giving, but does not address direct operational environmental or labor impacts.",
          "Arbitrary equipment changes without life-cycle analysis do not constitute sustainability.",
          "Eliminating essential business functions is commercially unsustainable and unnecessary."
        ]
      },
      {
        order: 1,
        question: "Which option correctly identifies the three pillars of ESG?",
        options: [
          "Environmental integrity, Social responsibility, and Corporate Governance.",
          "Economic growth, Shareholder dividends, and Government subsidies.",
          "External marketing, Staff recruitment, and Global expansion.",
          "Energy efficiency, Solar panels, and Green certificates."
        ],
        correct: 0,
        correctExplanation: "ESG represents Environmental impact, Social responsibility, and Corporate Governance.",
        incorrectExplanation: "ESG is the established three-pillar framework for holistic sustainability and risk management.",
        optionFeedback: [
          "Correct. ESG covers Environmental stewardship, Social responsibility, and Governance integrity.",
          "Pure financial metrics represent traditional accounting, not ESG pillars.",
          "Marketing and expansion are commercial functions, not the ESG framework.",
          "Energy and solar are specific environmental components, not the full three-pillar framework."
        ]
      },
      {
        order: 2,
        question: "Why is a company that only focuses on carbon reduction while mistreating staff considered non-compliant with ESG principles?",
        options: [
          "Because ESG requires balanced performance across environmental, social, and governance pillars simultaneously.",
          "Because carbon emissions are less important than public relations.",
          "Because environmental legislation in Mauritius does not permit carbon accounting.",
          "Because social initiatives generate higher tax deductions than environmental programs."
        ],
        correct: 0,
        correctExplanation: "Holistic sustainability requires ethical labor standards and governance alongside environmental management.",
        incorrectExplanation: "ESG is a multi-dimensional framework; strong performance in one pillar cannot compensate for abuses in another.",
        optionFeedback: [
          "Correct. Holistic sustainability requires ethical labor standards and governance alongside environmental management.",
          "Carbon emissions are critical, but cannot be used to justify human rights or labor neglect.",
          "Mauritius actively encourages carbon accounting; the issue is balanced ESG integrity.",
          "Tax incentives do not define the structural integrity of the ESG standard."
        ]
      },
      {
        order: 3,
        question: "What distinguishes a verifiable sustainability action from a greenwashing claim?",
        options: [
          "Verifiable actions are supported by documented data, baseline metrics, and audit trails.",
          "Verifiable actions use colorful nature imagery in marketing brochures.",
          "Verifiable actions cost more than standard commercial procedures.",
          "Verifiable actions are always published on social media platforms."
        ],
        correct: 0,
        correctExplanation: "Credible sustainability relies on measured activity data, transparent records, and traceable outcomes.",
        incorrectExplanation: "Marketing imagery and unverified claims do not constitute evidence-based sustainability.",
        optionFeedback: [
          "Correct. Credible sustainability relies on measured activity data, transparent records, and traceable outcomes.",
          "Marketing imagery without supporting evidence is a classic hallmark of greenwashing.",
          "Higher cost does not indicate environmental efficacy; many efficiency actions reduce costs.",
          "Social media posting without underlying operational verification is promotional, not verifiable."
        ]
      },
      {
        order: 4,
        question: "During daily office operations, which behavior directly supports environmental sustainability at zero financial cost?",
        options: [
          "Configuring multi-function printers to double-sided printing by default and powering off non-essential equipment after hours.",
          "Purchasing carbon offset tokens from unregulated foreign brokers.",
          "Replacing functional furniture with newly manufactured recycled plastic chairs.",
          "Printing all emails to file them in dedicated paper archive binders."
        ],
        correct: 0,
        correctExplanation: "Defaulting to double-sided printing and shutting down idle machines immediately reduces paper and energy waste.",
        incorrectExplanation: "Preventing waste through simple operational defaults is immediate, effective, and cost-free.",
        optionFeedback: [
          "Correct. Defaulting to double-sided printing and shutting down idle machines immediately reduces paper and energy waste.",
          "Purchasing unverified offsets does not reduce direct workplace waste and incurs unnecessary expense.",
          "Prematurely replacing functional furniture consumes new embodied materials and creates unnecessary waste.",
          "Printing emails directly contradicts waste reduction and paper conservation principles."
        ]
      },
      {
        order: 5,
        question: "How should an employee respond if asked by a manager to delete records of an accidental hazardous chemical spill to avoid an inspection fine?",
        options: [
          "Refuse to falsify records and report the environmental incident through the designated governance/speak-up channel.",
          "Comply with the request to preserve departmental budget and avoid team conflict.",
          "Post details of the incident anonymously on public internet forums without informing management.",
          "Relocate the leaked chemical containers to a neighbor's property."
        ],
        correct: 0,
        correctExplanation: "Governance integrity requires transparent reporting and accurate environmental spill management.",
        incorrectExplanation: "Falsifying environmental records violates corporate governance, safety laws, and ethics policies.",
        optionFeedback: [
          "Correct. Governance integrity requires transparent reporting and accurate environmental spill management.",
          "Falsifying records creates severe legal liability and endangers workplace safety.",
          "Internal governance channels must be used to ensure immediate containment and legal compliance.",
          "Illegal dumping is a criminal environmental violation with severe ecological consequences."
        ]
      },
      {
        order: 6,
        question: "What is the primary benefit of conducting a life-cycle review before procuring new operational assets?",
        options: [
          "It calculates the Total Cost of Ownership, including maintenance, energy consumption, and disposal costs.",
          "It guarantees that the cheapest purchase price will always be chosen.",
          "It eliminates the need for written supplier contracts.",
          "It ensures the company never has to replace equipment in the future."
        ],
        correct: 0,
        correctExplanation: "Life-cycle evaluation assesses operating efficiency, reliability, and end-of-life handling alongside initial acquisition cost.",
        incorrectExplanation: "Initial price alone often conceals high operating energy costs and premature failure rates.",
        optionFeedback: [
          "Correct. Life-cycle evaluation assesses operating efficiency, reliability, and end-of-life handling alongside initial acquisition cost.",
          "Life-cycle analysis often demonstrates that the cheapest upfront item is the most expensive over time.",
          "Supplier contracts remain essential for setting quality and sustainability expectations.",
          "All physical equipment eventually requires maintenance or replacement; life-cycle analysis manages that timeline efficiently."
        ]
      },
      {
        order: 7,
        question: "When communicating sustainability achievements to clients or stakeholders, what standard must be maintained?",
        options: [
          "All claims must be factual, accurate, and backed by verifiable operational data.",
          "Claims should exaggerate potential savings to attract international investors.",
          "Only positive achievements should be shared while concealing all non-compliance issues.",
          "Technical details should be omitted and replaced with vague statements like '100% pure green'."
        ],
        correct: 0,
        correctExplanation: "Transparent stakeholder communication requires factual, verified data without misleading overstatements.",
        incorrectExplanation: "Exaggerating claims or omitting material facts undermines organizational credibility and breaches governance standards.",
        optionFeedback: [
          "Correct. Transparent stakeholder communication requires factual, verified data without misleading overstatements.",
          "Exaggerating claims constitutes greenwashing and damages commercial reputation.",
          "Selective reporting misleads stakeholders and violates governance reporting standards.",
          "Vague slogans mislead consumers and fail regulatory transparency requirements."
        ]
      }
    ]
  },

  // =========================================================================
  // 2. ELH-02: Climate Change Science & Carbon Accounting Essentials (D1 Awareness)
  // =========================================================================
  {
    courseCode: "ELH-02",
    title: "Climate Change Science & Carbon Accounting Essentials",
    slug: "climate-change-science-and-carbon-accounting-essentials",
    description: "Understand greenhouse gas fundamentals, emissions sources in daily operations, Scopes 1, 2 and 3, and data-backed carbon reduction.",
    fullDescription: "Greenhouse gas emissions from fossil-fuel combustion, electricity generation, and supply chains drive global climate disruption. This course provides operational teams with an accessible, rigorous foundation in greenhouse gas science, the three emission Scopes, and how everyday energy choices directly determine organizational carbon footprints in Mauritius.",
    categoryId: 1,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Foundational Awareness",
    isFeatured: true,
    thumbnailUrl: "/images/courses/carbon-accounting.jpg",
    intendedRoles: ["Operations Staff", "Facility Coordinators", "Finance Officers", "Shift Supervisors"],
    learningObjectives: [
      "Explain the fundamental greenhouse gas mechanism and why carbon dioxide equivalent (CO2e) is the universal metric.",
      "Categorize organizational emissions accurately into Scope 1 (Direct), Scope 2 (Purchased Electricity), and Scope 3 (Value Chain).",
      "Differentiate raw activity data (liters of fuel, kWh of electricity) from calculated emission figures.",
      "Identify high-impact operational decisions that reduce grid electricity and fleet fuel consumption.",
      "Complete 8 scenario-based evaluation questions on carbon accounting and energy trade-offs.",
      "Record an energy or fuel reduction action within your operational shift routine."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Climate Change Science & Carbon Accounting Essentials.",
    badgeName: "Carbon Literacy Specialist",
    badgeDescription: "Awarded for demonstrating working knowledge of greenhouse gas scopes, activity data accounting, and emissions reduction.",
    badgeSlug: "carbon-literacy-specialist",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_GHG",
    secondaryCompetencies: ["COMP_ENERGY", "COMP_REPORTING"],
    applicableSectors: ["SEC_ALL"],
    applicableDepartments: ["DEP_ALL"],
    applicableJobFamilies: ["JF_ALL"],
    applicableSeniorityTiers: ["SEN_ALL"],
    productionPriority: "p0",
    learningPathPurpose: "Equip frontline and supervisory teams to understand carbon accounting scopes and identify emissions reduction in operations.",
    lessons: [
      {
        order: 0,
        title: "The Physics of Climate and Carbon",
        minutes: 4,
        content: "Understanding greenhouse gas concentration and the global carbon cycle.",
        blocks: [
          { id: "elh02-h1", type: "heading", position: 1, headingText: "How Greenhouse Gases Trap Heat" },
          { id: "elh02-t1", type: "short_text", position: 2, bodyText: "When fossil fuels (diesel, coal, heavy fuel oil, petrol) are burned for electricity, transport, or heating, carbon dioxide (CO2) and other greenhouse gases enter the atmosphere, trapping infrared radiation." },
          { id: "elh02-k1", type: "key_message", position: 3, headingText: "CO2e (Carbon Dioxide Equivalent)", bodyText: "Different gases have different warming potentials (e.g., methane traps over 28 times more heat than CO2). Scientists and accountants convert all gases into a standardized metric: tonnes of CO2 equivalent (tCO2e)." }
        ]
      },
      {
        order: 1,
        title: "Understanding Emissions Scopes: 1, 2, and 3",
        minutes: 4,
        content: "Classifying operational emissions into standardized accounting scopes.",
        blocks: [
          { id: "elh02-h2", type: "heading", position: 1, headingText: "The Three Greenhouse Gas Protocol Scopes" },
          { id: "elh02-t2", type: "short_text", position: 2, bodyText: "Under the global Greenhouse Gas Protocol, organizational emissions are divided into three boundaries:" },
          { id: "elh02-t3", type: "short_text", position: 3, bodyText: "• Scope 1 (Direct Emissions): Combustion in company-owned assets (diesel generators, fleet vehicles, on-site boilers, refrigerant leaks).\n• Scope 2 (Indirect - Purchased Electricity): Emissions generated at power plants to supply the electricity consumed by your facility.\n• Scope 3 (Indirect - Value Chain): All other upstream and downstream emissions (purchased goods, business travel, waste disposal, staff commuting)." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: Generator Scheduling vs Grid Tariff",
        minutes: 4,
        content: "Evaluating direct emissions and grid electricity trade-offs.",
        blocks: [
          { id: "elh02-h3", type: "heading", position: 1, headingText: "Scenario: Facility Power Management" },
          {
            id: "elh02-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Backup Generator Usage vs Energy Conservation",
            situation: "During peak tariff hours, a facility coordinator considers running the backup diesel generator continuously to avoid peak electricity charges. The diesel generator consumes 45 liters of diesel per hour without selective catalytic reduction.",
            prompt: "What is the environmental and carbon accounting consequence of this decision?",
            options: [
              { id: "opt1", text: "It substantially increases Scope 1 direct emissions and localized particulate pollution compared to implementing load-shedding and HVAC set-point adjustments.", isCorrect: true, feedback: "Correct. Diesel combustion produces high Scope 1 emissions per kWh compared to disciplined energy efficiency measures." },
              { id: "opt2", text: "It reduces corporate Scope 1 emissions because diesel fuel is classified as a renewable biofuel.", isCorrect: false, feedback: "Standard diesel is a fossil fuel; combustion generates substantial Scope 1 greenhouse gases." },
              { id: "opt3", text: "It eliminates all Scope 2 emissions without any overall carbon penalty.", isCorrect: false, feedback: "While Scope 2 purchased electricity drops, Scope 1 direct fossil fuel emissions increase dramatically." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Freight & Delivery Route Consolidation",
        minutes: 4,
        content: "Optimizing logistics to reduce transportation emissions.",
        blocks: [
          { id: "elh02-h4", type: "heading", position: 1, headingText: "Scenario: Delivery Scheduling" },
          {
            id: "elh02-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Ad-hoc Dispatch vs Route Optimization",
            situation: "A commercial warehouse dispatches three delivery vans each morning on overlapping routes to satisfy urgent ad-hoc client requests. Fleet telematics show 40% empty-mile driving.",
            prompt: "How should the dispatch supervisor optimize operations to reduce transport carbon footprint?",
            options: [
              { id: "opt1", text: "Consolidate morning orders into zone-based delivery runs and establish scheduled cutoff times, cutting total fleet distance by 30%.", isCorrect: true, feedback: "Correct. Route consolidation directly cuts fuel consumption and Scope 1 transportation emissions." },
              { id: "opt2", text: "Keep dispatching individual vans but purchase adhesive 'Clean Green' stickers for the bumpers.", isCorrect: false, feedback: "Superficial branding does not reduce fuel burn or greenhouse gas emissions." },
              { id: "opt3", text: "Instruct drivers to speed between destinations so engines run for fewer minutes.", isCorrect: false, feedback: "High-speed driving and aggressive acceleration significantly increase fuel consumption and accident risk." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Energy Activity Tracking",
        minutes: 4,
        content: "Recording raw energy consumption data to support accurate carbon accounting.",
        blocks: [
          { id: "elh02-h5", type: "heading", position: 1, headingText: "Activity Data in Action" },
          { id: "elh02-t4", type: "short_text", position: 2, bodyText: "Carbon accounting begins with accurate activity data. Commit to tracking one operational data stream this month:" },
          {
            id: "elh02-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Log weekly electricity meter readings for your floor or section to identify non-operational baseline baseloads.",
              "Track vehicle fleet fuel receipts and mileage to calculate average fuel efficiency (liters per 100km).",
              "Audit air conditioning thermostat settings across shift changes to maintain standardized 24°C setpoints."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "What does the standardized metric 'tCO2e' stand for in carbon accounting?",
        options: [
          "Metric tonnes of carbon dioxide equivalent.",
          "Total carbon output per employee.",
          "Thermal energy coefficient in electrical units.",
          "Targeted compliance of ecological efficiency."
        ],
        correct: 0,
        correctExplanation: "tCO2e standardizes the global warming effect of various greenhouse gases into equivalent metric tonnes of CO2.",
        incorrectExplanation: "tCO2e specifically denotes 'tonnes of carbon dioxide equivalent'.",
        optionFeedback: [
          "Correct. tCO2e standardizes the global warming effect of various greenhouse gases into equivalent metric tonnes of CO2.",
          "tCO2e is an absolute mass metric, not a per-employee ratio.",
          "Thermal coefficients are engineering terms, not the carbon accounting unit.",
          "Targeted compliance is a governance concept, not a measurement unit."
        ]
      },
      {
        order: 1,
        question: "Under the GHG Protocol, which source constitutes Scope 1 direct emissions for a business in Mauritius?",
        options: [
          "Diesel fuel burned in on-site backup power generators and company-owned transport vans.",
          "Electricity purchased from the Central Electricity Board (CEB) grid.",
          "Paper reams purchased from an office stationery supplier.",
          "Commuting flights taken by international tourists."
        ],
        correct: 0,
        correctExplanation: "Scope 1 covers direct combustion from assets owned or controlled by the company.",
        incorrectExplanation: "Purchased electricity is Scope 2, while purchased supplies and international flights are Scope 3.",
        optionFeedback: [
          "Correct. Scope 1 covers direct combustion from assets owned or controlled by the company.",
          "Purchased grid electricity is classified under Scope 2 indirect emissions.",
          "Purchased office goods fall under Scope 3 upstream value chain emissions.",
          "Tourist flights fall under Scope 3 customer travel emissions."
        ]
      },
      {
        order: 2,
        question: "How are Scope 2 emissions generated by an enterprise facility?",
        options: [
          "Through the generation of electricity at utility power stations that the facility purchases and consumes.",
          "Through direct chemical reactions occurring inside the office kitchen refrigerator.",
          "Through water evaporating from landscaped swimming pools.",
          "Through employee conversations about climate change."
        ],
        correct: 0,
        correctExplanation: "Scope 2 represents the indirect emissions caused by generating the grid electricity purchased by the organization.",
        incorrectExplanation: "Scope 2 specifically accounts for purchased electricity, steam, heating, and cooling.",
        optionFeedback: [
          "Correct. Scope 2 represents the indirect emissions caused by generating the grid electricity purchased by the organization.",
          "Refrigerant gas leaks from chillers are Scope 1 fugitive emissions, not Scope 2.",
          "Water evaporation is part of the hydrological cycle, not Scope 2 emissions.",
          "Internal discussions carry no physical greenhouse gas emission."
        ]
      },
      {
        order: 3,
        question: "What is the relationship between 'activity data' and 'calculated emissions'?",
        options: [
          "Activity data (e.g., kWh of electricity or liters of diesel) is multiplied by an emission factor to calculate tCO2e.",
          "Calculated emissions are measured using a physical kitchen scale, while activity data is estimated.",
          "Activity data only applies to government buildings, whereas emissions calculations apply to private firms.",
          "Activity data and calculated emissions are identical numbers with different names."
        ],
        correct: 0,
        correctExplanation: "Carbon accounting multiplies measurable operational activity data by verified emission factors.",
        incorrectExplanation: "Activity data represents the physical consumption volume (liters, kWh, kg) required for calculation.",
        optionFeedback: [
          "Correct. Carbon accounting multiplies measurable operational activity data by verified emission factors.",
          "Emissions are calculated mathematical models based on physical activity data.",
          "Activity data is required for all carbon accounting regardless of public or private ownership.",
          "Activity data is measured in physical units (liters/kWh); emissions are expressed in tCO2e."
        ]
      },
      {
        order: 4,
        question: "Why is an air conditioning thermostat setpoint of 24°C recommended over 19°C in commercial offices?",
        options: [
          "Each degree increase reduces cooling energy demand by approximately 5–8%, substantially cutting Scope 2 emissions.",
          "It completely prevents air conditioning compressors from running.",
          "It allows the office to legally claim 100% zero-carbon status without carbon accounting.",
          "It satisfies municipal noise ordinances regarding fan speeds."
        ],
        correct: 0,
        correctExplanation: "Moderate cooling setpoints reduce thermal compressor load and avoid excessive grid electricity consumption.",
        incorrectExplanation: "Setting AC to 24°C provides comfort while preventing continuous high-energy compressor cycling.",
        optionFeedback: [
          "Correct. Each degree increase reduces cooling energy demand by approximately 5–8%, substantially cutting Scope 2 emissions.",
          "Compressors still cycle to regulate temperature and humidity, but with lower overall energy consumption.",
          "Thermostat adjustments reduce energy but do not eliminate emissions entirely.",
          "Thermostat setpoints govern temperature regulation rather than acoustic ordinances."
        ]
      },
      {
        order: 5,
        question: "A company claims on social media to be '100% Carbon Neutral' because it planted 50 tree seedlings, despite burning 20,000 liters of diesel per month. What is the primary defect in this claim?",
        options: [
          "It represents unsupported greenwashing by offsetting unmeasured fossil emissions with unverified sapling survival rates.",
          "Tree planting is illegal under Mauritian environmental law.",
          "Diesel fuel produces no carbon emissions when used during daylight hours.",
          "Carbon neutrality can only be achieved by purchasing nuclear power."
        ],
        correct: 0,
        correctExplanation: "True carbon reduction requires measured operational avoidance before relying on unverified external offsets.",
        incorrectExplanation: "Unverified tree planting does not immediately neutralize large-scale fossil fuel combustion.",
        optionFeedback: [
          "Correct. It represents unsupported greenwashing by offsetting unmeasured fossil emissions with unverified sapling survival rates.",
          "Tree planting is encouraged, but cannot be mathematically claimed as instant carbon neutrality against high fossil emissions.",
          "Diesel generates significant greenhouse gases regardless of time of use.",
          "Carbon neutrality is achieved through reduction, efficiency, and verified high-integrity offsets."
        ]
      },
      {
        order: 6,
        question: "Which of the following actions directly addresses Scope 3 supply chain emissions?",
        options: [
          "Procuring locally manufactured supplies from verified low-carbon producers rather than air-freighting heavy goods.",
          "Installing LED light bulbs in the office reception hallway.",
          "Replacing worn tires on the CEO's personal electric bicycle.",
          "Painting exterior parking bay lines with yellow paint."
        ],
        correct: 0,
        correctExplanation: "Upstream freight mode and supplier selection directly reduce Scope 3 value chain emissions.",
        incorrectExplanation: "LED lighting addresses Scope 2 electricity, while local procurement reduces Scope 3 freight and embodied emissions.",
        optionFeedback: [
          "Correct. Upstream freight mode and supplier selection directly reduce Scope 3 value chain emissions.",
          "LED lighting in company facilities reduces Scope 2 purchased electricity consumption.",
          "Personal bicycles do not address corporate procurement supply chain footprints.",
          "Parking lot painting is basic facility maintenance with no carbon mitigation effect."
        ]
      },
      {
        order: 7,
        question: "Why must vehicle fleet tire pressures and regular servicing be maintained as part of an emissions reduction program?",
        options: [
          "Under-inflated tires increase rolling resistance, causing engines to consume up to 3–5% more fuel per kilometer.",
          "Tire pressure checks convert combustion engines into hybrid electric vehicles.",
          "Servicing eliminates the need for vehicles to use diesel or petrol.",
          "Tire pressure has no measurable impact on fuel efficiency or carbon output."
        ],
        correct: 0,
        correctExplanation: "Optimal mechanical maintenance and tire inflation maximize engine efficiency and minimize fuel burn.",
        incorrectExplanation: "Poor vehicle maintenance increases friction and fuel consumption, directly inflating Scope 1 emissions.",
        optionFeedback: [
          "Correct. Under-inflated tires increase rolling resistance, causing engines to consume up to 3–5% more fuel per kilometer.",
          "Mechanical maintenance optimizes fuel economy but does not alter engine propulsion type.",
          "Combustion engines still consume fossil fuel; maintenance ensures they do not waste fuel.",
          "Extensive engineering tests prove that rolling resistance directly drives fuel burn rates."
        ]
      }
    ]
  },

  // =========================================================================
  // 3. ELH-07: Resource Efficiency: Circular Economy & Zero-Waste Strategy (D1 Awareness)
  // =========================================================================
  {
    courseCode: "ELH-07",
    title: "Resource Efficiency: Circular Economy & Zero-Waste Strategy",
    slug: "resource-efficiency-circular-economy-and-zero-waste-strategy",
    description: "Apply waste hierarchy principles, material flow thinking, repair/reuse trade-offs and practical contamination prevention in the workplace.",
    fullDescription: "Linear consumption models—'take, make, dispose'—deplete natural resources and overwhelm municipal landfills. This course teaches frontline and operational staff how to apply circular economy principles, prioritize waste prevention over recycling, prevent bin contamination, and implement realistic reuse solutions in Mauritian commercial facilities.",
    categoryId: 1,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Foundational Awareness",
    isFeatured: true,
    thumbnailUrl: "/images/courses/resource-efficiency.jpg",
    intendedRoles: ["All Employees", "Facility Officers", "Procurement Assistants", "Operations Leads"],
    learningObjectives: [
      "Apply the waste hierarchy (Refuse, Reduce, Reuse, Repurpose, Recycle) to daily operational decisions.",
      "Explain the fundamental difference between linear 'take-make-waste' and circular closed-loop material flows.",
      "Identify common workplace waste contamination points that ruin recyclability.",
      "Evaluate realistic operational trade-offs between disposable convenience and reusable systems.",
      "Complete 8 scenario-based evaluation questions analyzing resource efficiency dilemmas.",
      "Implement one concrete waste prevention action in your immediate workspace."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Resource Efficiency: Circular Economy & Zero-Waste Strategy.",
    badgeName: "Circular Economy Champion",
    badgeDescription: "Awarded for demonstrating proficiency in waste hierarchy application, circular resource management, and source segregation.",
    badgeSlug: "circular-economy-champion",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_CIRCULARITY",
    secondaryCompetencies: ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_SUPPLY_CHAIN"],
    applicableSectors: ["SEC_ALL"],
    applicableDepartments: ["DEP_ALL"],
    applicableJobFamilies: ["JF_ALL"],
    applicableSeniorityTiers: ["SEN_ALL"],
    productionPriority: "p0",
    learningPathPurpose: "Transform workplace material consumption from linear disposal to closed-loop circular efficiency and waste prevention.",
    lessons: [
      {
        order: 0,
        title: "The Limits of the Linear Economy",
        minutes: 4,
        content: "Understanding resource depletion and landfill realities in Mauritius.",
        blocks: [
          { id: "elh07-h1", type: "heading", position: 1, headingText: "Why Landfill-First Models Fail" },
          { id: "elh07-t1", type: "short_text", position: 2, bodyText: "In a linear economy, materials are extracted, manufactured into single-use items, and buried in landfills. In Mauritius, with limited land space at Mare Chicose, waste generation directly strains municipal infrastructure and leaches valuable economic resources." },
          { id: "elh07-c1", type: "callout", position: 3, calloutType: "info", bodyText: "Recycling alone cannot solve the waste crisis. Collecting, transporting, and reprocessing materials consumes substantial energy. The highest economic and environmental value lies in preventing waste entirely." }
        ]
      },
      {
        order: 1,
        title: "The Waste Hierarchy: Prevention Over Disposal",
        minutes: 4,
        content: "Mastering the order of priority: Refuse, Reduce, Reuse, Recycle.",
        blocks: [
          { id: "elh07-h2", type: "heading", position: 1, headingText: "The 5R Hierarchy in Daily Operations" },
          { id: "elh07-t2", type: "short_text", position: 2, bodyText: "1. Refuse: Avoid purchasing non-essential single-use packaging and items.\n2. Reduce: Optimize usage volumes and eliminate operational excess.\n3. Reuse & Repair: Maintain equipment, repair broken fixtures, and use durable containers.\n4. Repurpose: Adapt surplus materials for alternative internal uses.\n5. Recycle: Clean and segregate genuine recyclable materials for industrial reprocessing." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: Single-Use Coffee Cups vs Reusable Mugs",
        minutes: 4,
        content: "Navigating cost, hygiene, and convenience trade-offs in office pantries.",
        blocks: [
          { id: "elh07-h3", type: "heading", position: 1, headingText: "Scenario: Staff Kitchen Waste Reduction" },
          {
            id: "elh07-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Eliminating Disposable Pantry Items",
            situation: "An office of 100 employees discards 4,000 single-use plastic-lined paper coffee cups every month. The office manager proposes eliminating disposable cups and providing ceramic mugs with a dedicated commercial dishwasher rack.",
            prompt: "How should the facility team implement this change successfully?",
            options: [
              { id: "opt1", text: "Provide durable branded ceramic mugs, assign clear hygiene washing routines, and remove disposable cups completely from pantry supply orders.", isCorrect: true, feedback: "Correct. Removing the disposable purchasing stream while providing durable infrastructure creates sustainable circular behavior." },
              { id: "opt2", text: "Keep ordering single-use cups but place a sign asking employees to 'think twice before drinking coffee'.", isCorrect: false, feedback: "Passive signs without changing the procurement stream fail to eliminate waste generation." },
              { id: "opt3", text: "Replace paper cups with single-use plastic cups because plastic is supposedly easier to discard.", isCorrect: false, feedback: "Switching from one single-use disposable to another maintains linear waste and increases plastic pollution." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Preventing Recycling Bin Contamination",
        minutes: 4,
        content: "Maintaining material purity during waste collection.",
        blocks: [
          { id: "elh07-h4", type: "heading", position: 1, headingText: "Scenario: The Contaminated Paper Bin" },
          {
            id: "elh07-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Food Contamination in Dry Paper Recycling",
            situation: "During cleaning rounds, a janitorial supervisor notices half-empty oily takeout curry containers thrown into the dry paper and cardboard recycling wheelie bin.",
            prompt: "What immediate and systemic action must be taken?",
            options: [
              { id: "opt1", text: "Remove the soiled food containers from the paper bin, ensure clear visual signage is posted above sorting stations, and brief team members on food contamination risks.", isCorrect: true, feedback: "Correct. Oil and food residues ruin entire batches of paper recycling, sending the whole load to landfill." },
              { id: "opt2", text: "Ignore the food waste because paper recycling machines can wash out cooking oil without issue.", isCorrect: false, feedback: "Grease and food oils bond with paper fibers and cannot be filtered out during pulping, ruining the batch." },
              { id: "opt3", text: "Lock all recycling bins and force employees to throw everything into general waste.", isCorrect: false, feedback: "Abandoning recycling entirely increases landfill fees and violates environmental commitments." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Circular Material Audit",
        minutes: 4,
        content: "Selecting an actionable material reduction step for your department.",
        blocks: [
          { id: "elh07-h5", type: "heading", position: 1, headingText: "Commit to Waste Elimination" },
          { id: "elh07-t3", type: "short_text", position: 2, bodyText: "Select one practical circular economy initiative for your immediate workspace:" },
          {
            id: "elh07-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Conduct a 1-day waste bin audit in your section to identify the top 3 disposable items being discarded.",
              "Establish an internal surplus stationery and folder exchange station to prevent buying new plastic files.",
              "Request supplier bulk packaging (reusable delivery crates) for routine operational deliveries."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "In the 5R waste hierarchy, which tier provides the greatest environmental and economic value?",
        options: [
          "Refuse / Prevention: avoiding the creation of waste at the point of procurement.",
          "Recycling: collecting and reprocessing materials after disposal.",
          "Incineration: burning discarded items for thermal recovery.",
          "Landfill containment: burying waste in lined municipal trenches."
        ],
        correct: 0,
        correctExplanation: "Preventing waste eliminates the upstream extraction, manufacturing, transport, and disposal footprints entirely.",
        incorrectExplanation: "Recycling and disposal occur after resources have already been consumed and processed.",
        optionFeedback: [
          "Correct. Preventing waste eliminates the upstream extraction, manufacturing, transport, and disposal footprints entirely.",
          "Recycling is valuable, but energy is still consumed in collection, transport, and remanufacturing.",
          "Incineration destroys embodied material value and generates emissions.",
          "Landfilling is the lowest and least desirable tier in waste management."
        ]
      },
      {
        order: 1,
        question: "Why does food waste (like leftover lunch or greasy containers) ruin dry paper and cardboard recycling?",
        options: [
          "Oil and food residues contaminate paper fibers during pulping, rendering the recycled pulp unusable.",
          "Paper recycling plants only accept items that have been submerged in water for 48 hours.",
          "Food waste makes cardboard bins too heavy for collection trucks to lift.",
          "Food waste causes paper recycling machinery to turn into plastic."
        ],
        correct: 0,
        correctExplanation: "Oil cannot be separated from cellulose fibers during standard paper recycling, spoiling the entire pulping batch.",
        incorrectExplanation: "Grease and food oils coat paper fibers, preventing them from bonding into new paper products.",
        optionFeedback: [
          "Correct. Oil cannot be separated from cellulose fibers during standard paper recycling, spoiling the entire pulping batch.",
          "Paper must remain dry and clean prior to industrial recycling.",
          "Weight is manageable; contamination is chemical and physical.",
          "Food waste cannot chemically convert organic paper into synthetic polymers."
        ]
      },
      {
        order: 2,
        question: "What defines a circular economy model compared to a linear economy model?",
        options: [
          "Materials and products are designed for durability, reuse, repair, and closed-loop remanufacturing.",
          "Products are manufactured to break quickly so consumers purchase newer models each year.",
          "All items are made exclusively of wood and glass without using electricity.",
          "Products are exported overseas so waste disposal occurs outside local borders."
        ],
        correct: 0,
        correctExplanation: "Circular models preserve value by keeping materials cycling in high-utility loops for as long as possible.",
        incorrectExplanation: "Linear models rely on rapid disposal; circular models design out waste through reuse and repair.",
        optionFeedback: [
          "Correct. Circular models preserve value by keeping materials cycling in high-utility loops for as long as possible.",
          "Planned obsolescence is the defining characteristic of wasteful linear models.",
          "Circular design applies to all materials (metals, polymers, electronics), not just natural wood.",
          "Exporting waste shifts the burden geographically without solving the material loss."
        ]
      },
      {
        order: 3,
        question: "When replacing single-use plastic water bottles in an organization, which approach represents genuine circular design?",
        options: [
          "Installing centralized water filtration stations and providing employees with refillable stainless-steel bottles.",
          "Replacing plastic bottles with single-use carton boxes lined with plastic film.",
          "Distributing two plastic bottles per employee instead of one.",
          "Prohibiting employees from drinking water during working hours."
        ],
        correct: 0,
        correctExplanation: "Centralized filtration with durable reusable vessels eliminates continuous packaging waste at the source.",
        incorrectExplanation: "Replacing one single-use container with another disposable format preserves the linear waste cycle.",
        optionFeedback: [
          "Correct. Centralized filtration with durable reusable vessels eliminates continuous packaging waste at the source.",
          "Single-use cartons still generate substantial packaging waste and require energy-intensive recycling.",
          "Increasing single-use bottle allocation doubles plastic waste.",
          "Denying drinking water violates essential occupational health and safety standards."
        ]
      },
      {
        order: 4,
        question: "What is an operational prerequisite before introducing separated waste bins (organic, paper, plastic, general)?",
        options: [
          "Clear visual labeling, staff briefing, and ensuring downstream collection services keep the sorted streams separated.",
          "Ordering identical unlabelled black bins for all waste types.",
          "Instructing janitorial staff to mix all bins together in the compactor at the end of each shift.",
          "Banning all office equipment that uses electricity."
        ],
        correct: 0,
        correctExplanation: "Clear signage, staff education, and verified separate collection prevent contamination and maintain public trust.",
        incorrectExplanation: "Without clear labeling and dedicated collection, separated waste is mixed together and sent to landfill.",
        optionFeedback: [
          "Correct. Clear visual labeling, staff briefing, and ensuring downstream collection services keep the sorted streams separated.",
          "Unlabelled bins cause immediate cross-contamination and defeat sorting efforts.",
          "Mixing sorted waste together destroys employee trust and sends recyclables to landfill.",
          "Office equipment usage is unrelated to waste bin segregation protocols."
        ]
      },
      {
        order: 5,
        question: "A company has 20 functional office laptops that are scheduled for routine 3-year replacement. What is the most circular disposal route?",
        options: [
          "Refurbish, upgrade memory/storage, and redeploy internally or donate to local schools before considering recycling.",
          "Throw all laptops into the general waste dumpster immediately.",
          "Smash the laptops with hammers to prevent anyone from using them.",
          "Hide the laptops in the basement archive room indefinitely."
        ],
        correct: 0,
        correctExplanation: "Extending product lifespan through refurbishment and donation maximizes embodied electronic component value.",
        incorrectExplanation: "E-waste contains hazardous materials and should never be sent to landfill or hoarded unusable.",
        optionFeedback: [
          "Correct. Extends product lifespan through refurbishment and donation, maximizing embodied material value.",
          "E-waste contains heavy metals that contaminate soil and groundwater when landfilled.",
          "Physical destruction destroys valuable components and prevents safe material recovery.",
          "Indefinite hoarding allows batteries to degrade without providing any functional or economic utility."
        ]
      },
      {
        order: 6,
        question: "Why should single-use plastic stretch wrap in warehouse logistics be minimized or replaced with reusable pallet straps?",
        options: [
          "Plastic film is difficult to recycle locally, lightweight, and generates massive recurring disposal volumes.",
          "Plastic stretch wrap makes pallets weigh three times more than standard loads.",
          "Reusable pallet straps prevent transport trucks from burning fuel.",
          "Stretch wrap is prohibited on all commercial roads in Mauritius."
        ],
        correct: 0,
        correctExplanation: "Thin plastic wrap is rarely recycled cost-effectively and creates high-volume landfill waste upon arrival.",
        incorrectExplanation: "Reusable pallet bands or durable nets eliminate thousands of meters of single-use plastic film annually.",
        optionFeedback: [
          "Correct. Plastic film is difficult to recycle locally, lightweight, and generates massive recurring disposal volumes.",
          "Plastic film is lightweight; the issue is volume and persistent environmental pollution.",
          "Reusable straps eliminate plastic waste, but truck fuel burn is governed by vehicle mechanics and mass.",
          "Stretch wrap is not banned from roads, but responsible enterprises eliminate it to cut waste."
        ]
      },
      {
        order: 7,
        question: "What is the primary indicator of a successful departmental waste reduction campaign?",
        options: [
          "A sustained measurable drop in total kilograms of waste generated and sent to landfill per employee.",
          "The number of colored posters pinned to noticeboards.",
          "Purchasing expensive waste sorting bins without tracking what goes inside them.",
          "An increase in overall stationery purchasing expenditure."
        ],
        correct: 0,
        correctExplanation: "Genuine circular success is proven by reductions in raw waste tonnage and landfill diversion metrics.",
        incorrectExplanation: "Promotional posters and equipment purchases mean nothing if waste generation volumes remain unchanged.",
        optionFeedback: [
          "Correct. Genuine circular success is proven by reductions in raw waste tonnage and landfill diversion metrics.",
          "Posters are communication tools, not evidence of actual waste reduction.",
          "Purchasing bins without measuring diversion does not prove operational change.",
          "Increased expenditure often indicates over-purchasing rather than material efficiency."
        ]
      }
    ]
  },

  // =========================================================================
  // 4. ELH-08: Social Impact, Human Rights & Community Engagement (D1 Awareness)
  // =========================================================================
  {
    courseCode: "ELH-08",
    title: "Social Impact, Human Rights & Community Engagement",
    slug: "social-impact-human-rights-and-community-engagement",
    description: "Foster respectful workplaces, identify supply chain labor risks, utilize confidential grievance pathways, and build genuine community partnerships.",
    fullDescription: "The Social pillar of ESG ensures human dignity, fair treatment, health and safety, and constructive stakeholder relations. This course equips employees and supervisors with practical skills to identify modern labor risks, prevent workplace discrimination, access non-retaliation reporting channels, and engage local Mauritian communities with genuine respect.",
    categoryId: 1,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Foundational Awareness",
    isFeatured: true,
    thumbnailUrl: "/images/courses/social-impact.jpg",
    intendedRoles: ["All Employees", "HR Officers", "Supervisors", "Community Liaisons"],
    learningObjectives: [
      "Define core workplace human rights, equal opportunity, and non-discrimination principles in commercial operations.",
      "Identify subtle social, labor, and safety risks among on-site subcontractors and vulnerable workers.",
      "Utilize formal grievance mechanisms and speak-up channels protected by anti-retaliation policies.",
      "Distinguish authentic, collaborative community engagement from superficial public relations gestures.",
      "Complete 8 scenario-based evaluation questions on workplace ethics, labor dignity, and community consultation.",
      "Select and record a personal workplace commitment supporting inclusive, respectful team practices."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Social Impact, Human Rights & Community Engagement.",
    badgeName: "Social Impact Advocate",
    badgeDescription: "Awarded for demonstrating commitment to workplace dignity, fair labor standards, and authentic community engagement.",
    badgeSlug: "social-impact-advocate",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_HUMAN_RIGHTS",
    secondaryCompetencies: ["COMP_GOVERNANCE", "COMP_SUSTAINABILITY_FOUNDATIONS"],
    applicableSectors: ["SEC_ALL"],
    applicableDepartments: ["DEP_ALL"],
    applicableJobFamilies: ["JF_ALL"],
    applicableSeniorityTiers: ["SEN_ALL"],
    productionPriority: "p0",
    learningPathPurpose: "Embed foundational human rights, anti-harassment standards, and community engagement in daily operational culture.",
    lessons: [
      {
        order: 0,
        title: "Dignity and Human Rights in the Workplace",
        minutes: 4,
        content: "Understanding social sustainability and fair treatment across all enterprise tiers.",
        blocks: [
          { id: "elh08-h1", type: "heading", position: 1, headingText: "People at the Center of ESG" },
          { id: "elh08-t1", type: "short_text", position: 2, bodyText: "The Social pillar is grounded in universal human dignity: every worker is entitled to a safe, healthy environment free from harassment, discrimination, and exploitation. This obligation applies equally to direct staff, agency contractors, and migrant laborers." },
          { id: "elh08-k1", type: "key_message", position: 3, headingText: "Duty of Care", bodyText: "An organization's social responsibility extends beyond full-time employees to include on-site cleaning crews, security guards, and construction contractors." }
        ]
      },
      {
        order: 1,
        title: "Grievance Channels & Non-Retaliation Protections",
        minutes: 4,
        content: "How transparent escalation pathways safeguard workers and organizational integrity.",
        blocks: [
          { id: "elh08-h2", type: "heading", position: 1, headingText: "Safe and Confidential Reporting" },
          { id: "elh08-t2", type: "short_text", position: 2, bodyText: "A credible social governance framework provides accessible, confidential grievance channels where workers can raise concerns without fear of dismissal, penalty, or harassment." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: Subcontractor Working Conditions",
        minutes: 4,
        content: "Addressing labor risks in outsourced service contracts.",
        blocks: [
          { id: "elh08-h3", type: "heading", position: 1, headingText: "Scenario: Facility Cleaning Crew Hours" },
          {
            id: "elh08-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Monitoring Subcontractor Fatigue & Safety",
            situation: "A night-shift supervisor observes that a third-party janitorial team is working consecutive 16-hour shifts across two client facilities with no rest breaks. Several workers appear visibly exhausted while operating floor buffing machinery.",
            prompt: "What is the supervisor's correct operational response?",
            options: [
              { id: "opt1", text: "Escalate the excessive shift hours to HR and procurement immediately to enforce contract labor standards and prevent severe fatigue-related injuries.", isCorrect: true, feedback: "Correct. Organizations have a moral and legal duty of care to ensure safe, lawful working hours for all on-site personnel." },
              { id: "opt2", text: "Ignore the situation because third-party agency scheduling is strictly the subcontractor's internal affair.", isCorrect: false, feedback: "Turning a blind eye to obvious labor abuses on company premises exposes the organization to legal liability and severe social risk." },
              { id: "opt3", text: "Offer the workers energy drinks and ask them to finish cleaning faster.", isCorrect: false, feedback: "Providing stimulants does not resolve systemic overtime violations or workplace fatigue hazards." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Community Grievance Regarding Logistics Noise",
        minutes: 4,
        content: "Navigating local neighborhood relations constructively.",
        blocks: [
          { id: "elh08-h4", type: "heading", position: 1, headingText: "Scenario: Community Impact" },
          {
            id: "elh08-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Early Morning Logistics Noise Complaints",
            situation: "Residents in the village adjacent to a logistics distribution center complain that heavy diesel trucks idle their engines with loud refrigeration units at 4:30 AM outside their residential gates.",
            prompt: "How should the logistics manager address this community concern?",
            options: [
              { id: "opt1", text: "Meet with resident representatives, adjust dispatch arrival windows to avoid pre-dawn neighborhood idling, and enforce a strict engine shut-off protocol.", isCorrect: true, feedback: "Correct. Authentic community engagement involves listening, verifying root causes, and implementing operational compromises." },
              { id: "opt2", text: "Issue a press release claiming the company loves the community while keeping truck dispatch schedules unchanged.", isCorrect: false, feedback: "Public relations gestures that ignore tangible operational grievances damage community trust." },
              { id: "opt3", text: "Threaten to sue the residents for defaming the commercial distribution center.", isCorrect: false, feedback: "Aggressive retaliation against legitimate community concerns inflames conflict and violates social governance standards." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Inclusive Team Culture",
        minutes: 4,
        content: "Committing to supportive, respectful workplace behaviors.",
        blocks: [
          { id: "elh08-h5", type: "heading", position: 1, headingText: "Personal Action in Social Responsibility" },
          { id: "elh08-t3", type: "short_text", position: 2, bodyText: "Select one practical commitment to strengthen social sustainability in your team:" },
          {
            id: "elh08-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Review departmental onboarding materials to ensure language accessibility for employees of diverse educational backgrounds.",
              "Conduct a safety walkabout with contractor representatives to inspect welfare and break-room facilities.",
              "Participate in a structured quarterly community dialogue session representing your operational unit."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "What is the primary objective of the Social pillar within the ESG framework?",
        options: [
          "Safeguarding human dignity, workplace equity, fair labor standards, and positive community relationships.",
          "Funding lavish annual corporate parties for senior executives.",
          "Eliminating all external contractors in favor of unpaid volunteers.",
          "Replacing human customer service teams with automated voice robots."
        ],
        correct: 0,
        correctExplanation: "The Social pillar focuses on people: workforce safety, human rights, diversity, fair wages, and stakeholder engagement.",
        incorrectExplanation: "Executive parties and automation are not the core intent of social sustainability.",
        optionFeedback: [
          "Correct. The Social pillar focuses on people: workforce safety, human rights, diversity, fair wages, and stakeholder engagement.",
          "Executive perks do not constitute workforce equity or social responsibility.",
          "Unpaid labor violates fundamental employment standards and fair compensation rights.",
          "Automation is a technology strategy, not the definition of social sustainability."
        ]
      },
      {
        order: 1,
        question: "Why must anti-retaliation protections be strictly enforced when workers raise ethical or safety concerns?",
        options: [
          "Because employees will not report dangerous hazards or illegal abuses if they fear termination or punishment.",
          "Because anti-retaliation policies prevent employees from ever making mistakes.",
          "Because reporting concerns automatically qualifies an employee for an immediate promotion.",
          "Because anti-retaliation rules only apply to senior executive directors."
        ],
        correct: 0,
        correctExplanation: "Psychological safety and confidential, protected channels ensure critical operational risks are surfaced and resolved early.",
        incorrectExplanation: "Without guaranteed protection from reprisals, workforce safety and ethical reporting break down completely.",
        optionFeedback: [
          "Correct. Psychological safety and confidential, protected channels ensure critical operational risks are surfaced and resolved early.",
          "Anti-retaliation protects whistleblowers; it does not eliminate human error.",
          "Reporting is a compliance right, not an automatic promotional fast-track.",
          "Anti-retaliation protections apply universally across all employee and contractor tiers."
        ]
      },
      {
        order: 2,
        question: "If an on-site subcontractor is observed working on scaffolding without fall protection harnesses, what is the duty of the host company's floor manager?",
        options: [
          "Intervene immediately to stop the unsafe work and verify compliant safety controls before allowing work to resume.",
          "Walk away because host companies have zero safety obligations toward outsourced personnel.",
          "Film the workers on a smartphone and post it to social media for public amusement.",
          "Tell the workers to jump down if they feel scared."
        ],
        correct: 0,
        correctExplanation: "Host organizations maintain an active duty of care for anyone operating on their premises.",
        incorrectExplanation: "Workplace safety is non-negotiable and applies across all direct and third-party contractor personnel.",
        optionFeedback: [
          "Correct. Intervene immediately to stop the unsafe work and verify compliant safety controls before allowing work to resume.",
          "Host enterprises maintain shared legal and moral responsibility for on-site safety compliance.",
          "Mocking safety hazards on social media breaches corporate conduct and ignores life-threatening risks.",
          "Flippant instructions endanger life and violate occupational health standards."
        ]
      },
      {
        order: 3,
        question: "What distinguishes authentic community engagement from superficial tokenism?",
        options: [
          "Authentic engagement involves active listening, two-way dialogue, and addressing legitimate local operational impacts.",
          "Authentic engagement involves handing out branded keychains to villagers once every five years.",
          "Authentic engagement requires ignoring community complaints and building taller boundary fences.",
          "Authentic engagement means having the marketing team write fictional blog posts about happy neighbors."
        ],
        correct: 0,
        correctExplanation: "Genuine community stewardship addresses mutual concerns (traffic, noise, water access, local jobs) transparently.",
        incorrectExplanation: "Promotional giveaways and fictional marketing do not resolve real community impacts.",
        optionFeedback: [
          "Correct. Authentic engagement involves active listening, two-way dialogue, and addressing legitimate local operational impacts.",
          "Superficial promotional items do not address structural environmental or economic concerns.",
          "Erecting walls and ignoring neighbors escalates social conflict.",
          "Fabricating stories is dishonest greenwashing and damages institutional trust."
        ]
      },
      {
        order: 4,
        question: "How does promoting diversity, equity, and inclusion (DEI) strengthen organizational resilience in Mauritius?",
        options: [
          "It widens the talent pool, fosters innovative problem-solving, and ensures fair treatment across all backgrounds.",
          "It requires all staff to have identical opinions on all business decisions.",
          "It eliminates the need for written job descriptions and performance appraisals.",
          "It guarantees that every product developed will have zero manufacturing defects."
        ],
        correct: 0,
        correctExplanation: "Inclusive workplaces benefit from broader perspectives, higher retention, and a culture of mutual respect.",
        incorrectExplanation: "DEI strengthens culture and capability; it does not enforce conformity or remove performance standards.",
        optionFeedback: [
          "Correct. It widens the talent pool, fosters innovative problem-solving, and ensures fair treatment across all backgrounds.",
          "Diversity values different perspectives rather than forced ideological conformity.",
          "Clear job descriptions and fair appraisals remain essential for equitable management.",
          "Inclusion improves organizational culture, but quality assurance processes remain necessary for manufacturing."
        ]
      },
      {
        order: 5,
        question: "When evaluating a supplier's human rights performance, which finding represents a critical red flag?",
        options: [
          "Withholding worker identity passports, charging excessive recruitment fees, or restricting freedom of movement.",
          "Providing employees with free drinking water and clean dining facilities.",
          "Conducting annual fire evacuation drills during working hours.",
          "Offering voluntary paid overtime in full compliance with local labor legislation."
        ],
        correct: 0,
        correctExplanation: "Passport retention, debt bondage, and movement restrictions are severe indicators of modern forced labor.",
        incorrectExplanation: "Clean amenities, emergency drills, and compliant voluntary overtime are positive labor practices.",
        optionFeedback: [
          "Correct. Withholding worker identity passports, charging excessive recruitment fees, or restricting freedom of movement indicate forced labor.",
          "Providing clean amenities is standard human dignity.",
          "Safety drills are mandatory compliance practices.",
          "Voluntary paid overtime complying with labor law is lawful."
        ]
      },
      {
        order: 6,
        question: "Why should corporate social responsibility (CSR) programs align with actual community needs rather than arbitrary corporate preferences?",
        options: [
          "Because community-identified priorities solve real local challenges and create enduring shared value.",
          "Because foreign consultants know community needs better than the residents themselves.",
          "Because CSR is only designed to provide photo opportunities for corporate annual reports.",
          "Because local communities are legally prohibited from managing their own schools and clinics."
        ],
        correct: 0,
        correctExplanation: "Consultative, needs-based community investments ensure resources address actual social deficits effectively.",
        incorrectExplanation: "Top-down charitable gestures often fail to provide long-term utility or build community trust.",
        optionFeedback: [
          "Correct. Because community-identified priorities solve real local challenges and create enduring shared value.",
          "Local stakeholders understand their community dynamics and needs best.",
          "CSR must produce verifiable social impact, not just superficial photo opportunities.",
          "Community consultation respects local leadership and collaborative governance."
        ]
      },
      {
        order: 7,
        question: "An employee experiences persistent offensive verbal comments regarding their background from a colleague. What is the appropriate course of action?",
        options: [
          "Utilize the company's anti-harassment policy to report the conduct through HR or the confidential grievance procedure.",
          "Endure the abuse silently because junior employees have no workplace rights.",
          "Retaliate with physical violence in the company parking lot.",
          "Immediately resign without notifying anyone of the underlying cause."
        ],
        correct: 0,
        correctExplanation: "Formal grievance and anti-harassment channels exist to stop abusive behavior and enforce respectful workplace standards.",
        incorrectExplanation: "Silent endurance and physical retaliation are destructive; structured governance pathways must be utilized.",
        optionFeedback: [
          "Correct. Formal anti-harassment channels protect employee dignity and hold offenders accountable.",
          "All employees regardless of seniority are entitled to a safe, respectful working environment.",
          "Physical violence is dangerous, illegal, and causes instant summary dismissal.",
          "Reporting the behavior allows the company to investigate and rectify toxic workplace conduct."
        ]
      }
    ]
  },

  // =========================================================================
  // 5. ELH-09: Corporate Governance, Ethics & Anti-Corruption (D1 Awareness)
  // =========================================================================
  {
    courseCode: "ELH-09",
    title: "Corporate Governance, Ethics & Anti-Corruption",
    slug: "corporate-governance-ethics-and-anti-corruption",
    description: "Navigate conflicts of interest, gifts and hospitality thresholds, accurate record keeping, procurement integrity, and non-retaliation reporting.",
    fullDescription: "Ethical governance forms the foundation of corporate trust, investor confidence, and organizational survival. This course provides practical guidance on identifying and declaring conflicts of interest, establishing proportional gifts/hospitality boundaries, maintaining uncompromised operational and financial records, and utilizing protected speak-up pathways in Mauritian commerce.",
    categoryId: 1,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Foundational Awareness",
    isFeatured: true,
    thumbnailUrl: "/images/courses/corporate-governance.jpg",
    intendedRoles: ["All Employees", "Procurement Staff", "Finance Officers", "Managers"],
    learningObjectives: [
      "Identify personal and commercial situations that constitute real, potential, or perceived conflicts of interest.",
      "Apply company gifts and hospitality thresholds to maintain unbiased commercial relationships.",
      "Recognize the critical importance of accurate, un-falsified records in financial and operational audits.",
      "Utilize confidential speak-up and whistleblowing channels protected by strict non-retaliation rules.",
      "Complete 8 scenario-based evaluation questions on ethical dilemmas and anti-corruption standards.",
      "Complete an annual Conflict of Interest check and record your personal integrity commitment."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Corporate Governance, Ethics & Anti-Corruption.",
    badgeName: "Governance & Ethics Practitioner",
    badgeDescription: "Awarded for demonstrating proficiency in conflict management, anti-corruption controls, and ethical decision-making.",
    badgeSlug: "governance-and-ethics-practitioner",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_GOVERNANCE",
    secondaryCompetencies: ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_SUPPLY_CHAIN"],
    applicableSectors: ["SEC_ALL"],
    applicableDepartments: ["DEP_ALL"],
    applicableJobFamilies: ["JF_ALL"],
    applicableSeniorityTiers: ["SEN_ALL"],
    productionPriority: "p0",
    learningPathPurpose: "Establish uncompromised ethical standards, anti-corruption compliance, and governance transparency across the enterprise.",
    lessons: [
      {
        order: 0,
        title: "The Pillars of Ethical Governance",
        minutes: 4,
        content: "Understanding accountability, transparency, and fiduciary duty.",
        blocks: [
          { id: "elh09-h1", type: "heading", position: 1, headingText: "Why Governance Protects Everyone" },
          { id: "elh09-t1", type: "short_text", position: 2, bodyText: "Governance is the system of rules, practices, and processes by which an enterprise is directed and controlled. It prevents fraud, ensures fair treatment of shareholders and employees, and protects organizational reputation." }
        ]
      },
      {
        order: 1,
        title: "Conflicts of Interest, Gifts and Hospitality",
        minutes: 4,
        content: "Setting clear boundaries to avoid biased commercial decision-making.",
        blocks: [
          { id: "elh09-h2", type: "heading", position: 1, headingText: "Maintaining Objective Decision-Making" },
          { id: "elh09-t2", type: "short_text", position: 2, bodyText: "A conflict of interest occurs when personal relationships, outside investments, or secondary business interests could influence an employee's professional judgment on behalf of the company. Transparency through early declaration is mandatory." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: Luxury Gift During Tender Evaluation",
        minutes: 4,
        content: "Navigating supplier gift dilemmas during active bids.",
        blocks: [
          { id: "elh09-h3", type: "heading", position: 1, headingText: "Scenario: Supplier Hospitality" },
          {
            id: "elh09-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Accepting Gifts During a Commercial Tender",
            situation: "A procurement evaluation committee member receives an expensive designer wristwatch and an invitation to a private weekend yacht excursion from a technology vendor competing in an active MUR 5,000,000 software contract tender.",
            prompt: "What is the mandatory ethical and governance procedure?",
            options: [
              { id: "opt1", text: "Refuse the gift immediately, return the item with a formal letter, and disclose the contact to the compliance officer and procurement committee.", isCorrect: true, feedback: "Correct. Accepting high-value gifts during active tenders creates an acute conflict of interest and compromises procurement integrity." },
              { id: "opt2", text: "Accept the watch secretly and promise to give the vendor a slightly higher score on the technical evaluation.", isCorrect: false, feedback: "This is bribery and illegal corruption, resulting in immediate criminal prosecution and dismissal." },
              { id: "opt3", text: "Accept the watch but do not tell colleagues, assuming it will not influence your objective evaluation.", isCorrect: false, feedback: "Failing to disclose gifts during tenders creates an undeniable perception of corruption and violates governance policies." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Pressure to Alter Maintenance Inspection Logs",
        minutes: 4,
        content: "Protecting record integrity against executive pressure.",
        blocks: [
          { id: "elh09-h4", type: "heading", position: 1, headingText: "Scenario: Record Keeping Under Audit Pressure" },
          {
            id: "elh09-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Falsifying Boiler Inspection Records",
            situation: "An internal safety auditor is scheduled to arrive tomorrow. A department head instructs the technician to backdate a skipped monthly boiler safety inspection log to avoid an audit non-conformance finding.",
            prompt: "How must the technician act?",
            options: [
              { id: "opt1", text: "Refuse to backdate or falsify the log, record the true status accurately, and report the request through the internal compliance/speak-up channel.", isCorrect: true, feedback: "Correct. Accurate records are vital for safety and legal compliance. Falsifying records creates severe physical and legal liability." },
              { id: "opt2", text: "Sign the false inspection log because junior technicians must always obey any verbal request from a superior.", isCorrect: false, feedback: "No manager has authority to instruct staff to falsify safety or legal compliance records." },
              { id: "opt3", text: "Tear out the entire page from the logbook and throw the binder into the sea.", isCorrect: false, feedback: "Destroying audit evidence is a serious compliance breach and deliberate obstruction." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Integrity Declaration",
        minutes: 4,
        content: "Reaffirming your personal commitment to ethical workplace governance.",
        blocks: [
          { id: "elh09-h5", type: "heading", position: 1, headingText: "Commitment to Ethical Practice" },
          { id: "elh09-t3", type: "short_text", position: 2, bodyText: "Select one practical governance action to execute this quarter:" },
          {
            id: "elh09-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Submit an updated annual declaration of any outside business interests or family connections with company suppliers.",
              "Review departmental gifts and hospitality logs to ensure all received items above threshold are logged transparently.",
              "Brief team members on the organization's confidential whistleblowing hotline and non-retaliation policy."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "What constitutes a 'conflict of interest' in a commercial business setting?",
        options: [
          "A situation where personal interests or outside relationships could improperly influence professional judgment or duties.",
          "Having an argument with a colleague about the company football tournament.",
          "A disagreement between two suppliers regarding who makes better quality cardboard.",
          "Working overtime during an inventory stock-take."
        ],
        correct: 0,
        correctExplanation: "Conflicts of interest arise when personal gain or family ties clash with an employee's professional duty to the company.",
        incorrectExplanation: "Personal conflicts or sports debates do not constitute commercial governance conflicts of interest.",
        optionFeedback: [
          "Correct. A situation where personal interests or outside relationships could improperly influence professional judgment or duties.",
          "Workplace debates are interpersonal matters, not financial governance conflicts.",
          "Supplier competition is market dynamics, not an employee conflict of interest.",
          "Scheduled overtime is standard operational work."
        ]
      },
      {
        order: 1,
        question: "What is the primary rule when an employee's close relative owns a business that is bidding for a company contract?",
        options: [
          "The employee must disclose the relationship immediately and recuse themselves completely from the tender and evaluation process.",
          "The employee should secretly ensure their relative's bid is approved without informing management.",
          "The employee must resign from the company immediately.",
          "The relative's company must be awarded the contract at double the market price."
        ],
        correct: 0,
        correctExplanation: "Full disclosure and recusal eliminate bias and protect the integrity of the procurement decision.",
        incorrectExplanation: "Disclosure allows the organization to manage the process transparently; secrecy constitutes corruption.",
        optionFeedback: [
          "Correct. The employee must disclose the relationship immediately and recuse themselves completely from the tender and evaluation process.",
          "Secretly influencing bids constitutes nepotism and procurement fraud.",
          "Resignation is unnecessary if the relationship is disclosed and the employee is removed from the decision process.",
          "Awarding inflated contracts to family members is illegal embezzlement."
        ]
      },
      {
        order: 2,
        question: "Under corporate ethics policies, when is accepting a gift from a supplier generally considered unacceptable?",
        options: [
          "When it is of high monetary value, offered as cash/equivalents, or received during an active contract tender or negotiation.",
          "When it is a low-value promotional desk calendar at New Year with corporate branding.",
          "When it is a glass of tap water offered during an on-site business meeting.",
          "When it is a digital email newsletter containing industry updates."
        ],
        correct: 0,
        correctExplanation: "High-value gifts, cash, or hospitality during tenders create severe risks of bribery and compromised objectivity.",
        incorrectExplanation: "Low-value promotional items (pens, calendars) within established policy thresholds are standard courtesies.",
        optionFeedback: [
          "Correct. When it is of high monetary value, offered as cash/equivalents, or received during an active contract tender or negotiation.",
          "Modest branded stationary within policy thresholds is acceptable promotional material.",
          "Basic meeting hospitality is standard professional courtesy.",
          "Information newsletters carry zero monetary value or conflict risk."
        ]
      },
      {
        order: 3,
        question: "Why is the falsification or backdating of operational logs and safety records considered a severe disciplinary offense?",
        options: [
          "It undermines truth, conceals critical safety risks, misleads auditors, and creates catastrophic legal liability.",
          "It wastes black ink in the maintenance office printers.",
          "It makes the logbook look untidy.",
          "It causes computers to run out of hard drive storage space."
        ],
        correct: 0,
        correctExplanation: "Record integrity is the cornerstone of safety, regulatory compliance, and governance accountability.",
        incorrectExplanation: "Falsifying records can lead to mechanical disasters, safety failures, and criminal fraud charges.",
        optionFeedback: [
          "Correct. It undermines truth, conceals critical safety risks, misleads auditors, and creates catastrophic legal liability.",
          "Ink usage is trivial compared to the legal and safety disaster of falsified records.",
          "Neatness is irrelevant; factual accuracy and honesty are mandatory.",
          "Storage capacity has no bearing on record integrity principles."
        ]
      },
      {
        order: 4,
        question: "What is the purpose of an organizational 'Speak-Up' or Whistleblowing policy?",
        options: [
          "To provide a confidential, secure channel for employees to report suspected misconduct without fear of retaliation.",
          "To allow employees to gossip anonymously about colleagues' personal lives.",
          "To publicly broadcast internal company passwords on the internet.",
          "To force every employee to make daily complaints about the office cafeteria."
        ],
        correct: 0,
        correctExplanation: "Whistleblowing channels protect integrity by allowing genuine concerns regarding fraud, safety, or illegality to be addressed safely.",
        incorrectExplanation: "Whistleblowing channels are dedicated to serious compliance and ethical breaches, protected by anti-retaliation rules.",
        optionFeedback: [
          "Correct. To provide a confidential, secure channel for employees to report suspected misconduct without fear of retaliation.",
          "Whistleblower channels are strictly for compliance and illegalities, not personal gossip.",
          "Broadcasting passwords is a catastrophic security breach.",
          "Routine facility feedback belongs in standard operations, not compliance whistleblowing."
        ]
      },
      {
        order: 5,
        question: "A finance clerk is asked by a director to approve an invoice for consulting services without any supporting documentation or deliverables. What should the clerk do?",
        options: [
          "Withhold approval until proper supporting evidence is provided, and escalate to the compliance/internal audit lead if pressured.",
          "Approve the payment immediately because directors are exempt from financial controls.",
          "Pay the invoice using cash from their personal wallet.",
          "Delete the invoice and pretend it was never received."
        ],
        correct: 0,
        correctExplanation: "Financial controls require verified delivery of goods or services before disbursing corporate funds.",
        incorrectExplanation: "Internal financial controls apply universally; no executive has authority to bypass audit documentation.",
        optionFeedback: [
          "Correct. Withhold approval until proper supporting evidence is provided, and escalate to the compliance/internal audit lead if pressured.",
          "Senior executives are bound by financial controls; bypassing controls constitutes embezzlement risk.",
          "Employees must never use personal cash to circumvent corporate disbursement controls.",
          "Deleting records conceals potential fraud rather than addressing it transparently."
        ]
      },
      {
        order: 6,
        question: "What is 'facilitation payment' (sometimes called speed money or grease payment) in anti-corruption law?",
        options: [
          "An unofficial payment made to a public official to secure or expedite the performance of a routine government action.",
          "The standard municipal fee paid with an official receipt at the post office.",
          "An employee's monthly overtime salary paid via direct bank transfer.",
          "A discount offered to bulk purchasers during a commercial sale."
        ],
        correct: 0,
        correctExplanation: "Facilitation payments are forms of bribery and are strictly prohibited under modern anti-corruption standards.",
        incorrectExplanation: "Official statutory fees with published receipts are lawful; unofficial payments to officials are illegal bribes.",
        optionFeedback: [
          "Correct. An unofficial payment made to a public official to secure or expedite the performance of a routine government action.",
          "Official published fees with receipts are legal statutory payments.",
          "Contracted salaries paid through payroll are legal remuneration.",
          "Commercial discounts are standard business pricing."
        ]
      },
      {
        order: 7,
        question: "How does strong ethical governance benefit a company's commercial reputation in Mauritius and internationally?",
        options: [
          "It attracts ethical investors, reduces legal risks, enhances customer loyalty, and fosters employee pride and retention.",
          "It enables the company to operate without paying taxes.",
          "It guarantees that the company will never face market competition.",
          "It allows the company to double the price of all its products overnight."
        ],
        correct: 0,
        correctExplanation: "Integrity lowers risk premiums, builds enduring trust with banking partners, and protects corporate longevity.",
        incorrectExplanation: "Ethical governance builds long-term enterprise value; it does not grant tax evasion or market monopoly.",
        optionFeedback: [
          "Correct. It attracts ethical investors, reduces legal risks, enhances customer loyalty, and fosters employee pride and retention.",
          "Tax compliance is a core governance duty, not an exemption.",
          "Competition is an external market condition unaffected by internal compliance.",
          "Pricing is determined by market dynamics and value propositions."
        ]
      }
    ]
  },

  // =========================================================================
  // 6. ELH-10: Sustainable Supply Chain & Responsible Procurement (D1 Awareness)
  // =========================================================================
  {
    courseCode: "ELH-10",
    title: "Sustainable Supply Chain & Responsible Procurement",
    slug: "sustainable-supply-chain-and-responsible-procurement",
    description: "Screen suppliers on environmental and social performance, apply Total Cost of Ownership (TCO), verify green claims, and monitor contract compliance.",
    fullDescription: "An organization's sustainability impact is largely determined by the products and services it purchases. This course equips procurement officers, department buyers, and operations leads with practical methodologies for proportionate supplier screening, Total Cost of Ownership (TCO) evaluation, verifying third-party green certifications, and escalating supply chain labor risks in Mauritius.",
    categoryId: 1,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Foundational Awareness",
    isFeatured: true,
    thumbnailUrl: "/images/courses/sustainable-supply-chain.jpg",
    intendedRoles: ["Procurement Officers", "Department Buyers", "Finance Staff", "Operations Managers"],
    learningObjectives: [
      "Explain the concept of Scope 3 upstream supply chain impact and why purchasing decisions drive corporate sustainability.",
      "Conduct proportionate ESG supplier screening covering environmental, labor, and safety compliance.",
      "Calculate Total Cost of Ownership (TCO) incorporating energy efficiency, durability, and end-of-life disposal.",
      "Verify supplier eco-labels and third-party certifications against greenwashing.",
      "Complete 8 scenario-based evaluation questions on procurement trade-offs and contract monitoring.",
      "Incorporate one sustainable purchasing criterion into your next departmental supply request."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Sustainable Supply Chain & Responsible Procurement.",
    badgeName: "Responsible Procurement Specialist",
    badgeDescription: "Awarded for demonstrating proficiency in supplier ESG screening, whole-life cost analysis, and supply chain integrity.",
    badgeSlug: "responsible-procurement-specialist",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_SUPPLY_CHAIN",
    secondaryCompetencies: ["COMP_CIRCULARITY", "COMP_GOVERNANCE"],
    applicableSectors: ["SEC_ALL"],
    applicableDepartments: ["DEP_ALL"],
    applicableJobFamilies: ["JF_ALL"],
    applicableSeniorityTiers: ["SEN_ALL"],
    productionPriority: "p0",
    learningPathPurpose: "Transform corporate purchasing by integrating life-cycle costing, supplier screening, and verified ethical standards.",
    lessons: [
      {
        order: 0,
        title: "The Upstream Footprint of Enterprise Purchasing",
        minutes: 4,
        content: "Understanding how supply chains represent the largest share of corporate impact.",
        blocks: [
          { id: "elh10-h1", type: "heading", position: 1, headingText: "Purchasing Power as a Catalyst for Change" },
          { id: "elh10-t1", type: "short_text", position: 2, bodyText: "For most enterprises, over 70% of total environmental and social footprint sits within purchased goods, freight logistics, and outsourced services. Every purchase order is a direct choice to reward responsible manufacturing or subsidize exploitative practices." }
        ]
      },
      {
        order: 1,
        title: "Total Cost of Ownership vs Initial Purchase Price",
        minutes: 4,
        content: "Evaluating operating electricity, maintenance, replacement cycles, and disposal costs.",
        blocks: [
          { id: "elh10-h2", type: "heading", position: 1, headingText: "The Total Cost of Ownership (TCO) Equation" },
          { id: "elh10-t2", type: "short_text", position: 2, bodyText: "A low-cost electrical appliance with poor energy efficiency or high failure rates costs significantly more over its life cycle than a premium certified energy-efficient unit. TCO = Acquisition Cost + Operating Energy Cost + Maintenance + Disposal Cost." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: Commercial Cleaning Chemical Procurement",
        minutes: 4,
        content: "Balancing chemical safety, packaging waste, and unit cost.",
        blocks: [
          { id: "elh10-h3", type: "heading", position: 1, headingText: "Scenario: Facility Cleaning Supplies" },
          {
            id: "elh10-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Low-Cost Bulk Chemical vs Eco-Certified Concentrate",
            situation: "A facility buyer must procure 1,000 liters of multi-surface floor cleaner. Supplier A offers uncertified harsh solvent in 1-liter single-use plastic bottles at MUR 100/L. Supplier B offers EU Ecolabel-certified super-concentrate in returnable 20-liter drums at MUR 140/L, which dilutes 1:20 with water (yielding actual in-use cost of MUR 7/L) with zero worker respiratory toxicity.",
            prompt: "Which procurement decision delivers superior financial and environmental value?",
            options: [
              { id: "opt1", text: "Procure Supplier B's super-concentrate because life-cycle dilution yields massive cost savings, eliminates single-use bottles, and protects janitorial health.", isCorrect: true, feedback: "Correct. Super-concentrates reduce packaging, transport freight, in-use cost, and occupational health hazards." },
              { id: "opt2", text: "Procure Supplier A because MUR 100 is numerically lower on the invoice line item than MUR 140.", isCorrect: false, feedback: "Failing to calculate in-use dilution ratios leads to paying over 14 times more per usable liter of cleaner." },
              { id: "opt3", text: "Mix laundry detergent with bleach in the mop bucket to avoid buying specialized cleaners.", isCorrect: false, feedback: "Mixing bleach with other chemicals generates lethal toxic chlorine gas and breaches safety regulations." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Delivery Partner Safety & Emission Non-Compliance",
        minutes: 4,
        content: "Enforcing supplier code of conduct in transport operations.",
        blocks: [
          { id: "elh10-h4", type: "heading", position: 1, headingText: "Scenario: Transport Partner Audit" },
          {
            id: "elh10-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Contracted Logistics Fleet Violations",
            situation: "A routine supplier audit reveals that your primary contracted transport carrier is operating trucks with bald tires, heavy black exhaust smoke emissions, and requires drivers to exceed statutory maximum driving hours without rest.",
            prompt: "What is the procurement lead's correct response?",
            options: [
              { id: "opt1", text: "Issue a formal corrective action notice with a 14-day compliance deadline, require immediate vehicle maintenance and shift adherence, and prepare alternate logistics if uncorrected.", isCorrect: true, feedback: "Correct. Responsible procurement requires active contract compliance enforcement and escalation of severe safety/labor breaches." },
              { id: "opt2", text: "Ignore the finding as long as goods are delivered on time and below market rate.", isCorrect: false, feedback: "Complicity in contractor labor abuses and dangerous fleet operations exposes the company to severe legal liability." },
              { id: "opt3", text: "Immediately terminate the contract with zero notice without reviewing contractual cure clauses.", isCorrect: false, feedback: "Proper contract governance requires formal corrective action processes while safeguarding supply continuity." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Sustainable Purchase Specification",
        minutes: 4,
        content: "Embedding sustainability criteria into your next department purchase.",
        blocks: [
          { id: "elh10-h5", type: "heading", position: 1, headingText: "Take Action in Procurement" },
          { id: "elh10-t3", type: "short_text", position: 2, bodyText: "Select one practical procurement criteria update to apply this month:" },
          {
            id: "elh10-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Include mandatory 100% recycled paper (FSC-certified) specification on all stationery purchase orders.",
              "Require minimum 4-star energy efficiency ratings on any new departmental office electronics or appliances.",
              "Request supplier bulk delivery scheduling to reduce weekly delivery vehicle trips by 50%."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "What is the core principle of Total Cost of Ownership (TCO) in sustainable procurement?",
        options: [
          "Evaluating acquisition price, operating energy/water consumption, maintenance costs, and end-of-life disposal expenses over an asset's full lifespan.",
          "Choosing whatever item is advertised on television most frequently.",
          "Buying exclusively from overseas websites to avoid local value-added taxes.",
          "Focusing strictly on the lowest initial purchase invoice price without considering operating costs."
        ],
        correct: 0,
        correctExplanation: "TCO provides the true financial picture by incorporating operational efficiency and longevity alongside initial purchase price.",
        incorrectExplanation: "Initial price alone often conceals high operating electricity consumption and rapid replacement costs.",
        optionFeedback: [
          "Correct. Evaluating acquisition price, operating energy/water consumption, maintenance costs, and end-of-life disposal expenses over an asset's full lifespan.",
          "Advertising volume has no connection to life-cycle cost or sustainability.",
          "Tax avoidance is not a sustainable procurement methodology.",
          "Focusing solely on upfront price often leads to procuring high-maintenance, energy-wasting equipment."
        ]
      },
      {
        order: 1,
        question: "Why are third-party certifications (such as FSC for paper, ISO 14001 for facilities, or Energy Star for appliances) critical during supplier screening?",
        options: [
          "They provide independent, verifiable proof that environmental and quality standards have been audited and met.",
          "They are colorful stickers that make supplier catalogs look more attractive.",
          "They allow suppliers to charge ten times more than competitors without justification.",
          "They guarantee that equipment will never consume electricity."
        ],
        correct: 0,
        correctExplanation: "Independent certifications protect buyers from greenwashing by requiring rigorous third-party auditing.",
        incorrectExplanation: "Self-declared claims lack credibility; third-party standards ensure technical verification.",
        optionFeedback: [
          "Correct. They provide independent, verifiable proof that environmental and quality standards have been audited and met.",
          "Certifications are audited compliance credentials, not marketing decorations.",
          "Certifications should justify fair value through verified efficiency, not arbitrary price gouging.",
          "All electrical equipment consumes power; certified equipment uses significantly less energy."
        ]
      },
      {
        order: 2,
        question: "How does procuring super-concentrated cleaning solutions with dilution dispensers save both money and carbon emissions?",
        options: [
          "It reduces shipping weight, eliminates thousands of single-use plastic bottles, and delivers a much lower cost per in-use liter.",
          "It requires cleaning staff to mop floors ten times more frequently.",
          "It turns water into gasoline inside the cleaning closet.",
          "It is required only during heavy monsoon rain periods."
        ],
        correct: 0,
        correctExplanation: "Concentrates avoid transporting heavy water volumes and eliminate disposable plastic container waste.",
        incorrectExplanation: "Diluting super-concentrate on-site cuts freight emissions, packaging waste, and operational cost.",
        optionFeedback: [
          "Correct. It reduces shipping weight, eliminates thousands of single-use plastic bottles, and delivers a much lower cost per in-use liter.",
          "Dilution ratios maintain standard cleaning frequency while cutting material costs.",
          "Chemical dilution creates cleaning solutions, not petroleum fuels.",
          "Concentrates are standard year-round best practice."
        ]
      },
      {
        order: 3,
        question: "What is the primary risk of relying on single-source suppliers with poor ESG and safety compliance?",
        options: [
          "Operational disruptions due to regulatory shutdowns, safety accidents, labor strikes, or severe reputational damage.",
          "The supplier will send too many free sample gifts to your office.",
          "The supplier will force your company to build a solar farm.",
          "There is zero risk in using non-compliant suppliers."
        ],
        correct: 0,
        correctExplanation: "Non-compliant suppliers create severe vulnerability to sudden regulatory shutdowns, product contamination, and scandals.",
        incorrectExplanation: "Supply chain risk directly jeopardizes business continuity and brand value.",
        optionFeedback: [
          "Correct. Operational disruptions due to regulatory shutdowns, safety accidents, labor strikes, or severe reputational damage.",
          "Gifts during commercial tenders are governance violations, not supply chain risk mitigations.",
          "Suppliers cannot force infrastructure changes on clients.",
          "Unmonitored suppliers represent massive financial, legal, and operational risks."
        ]
      },
      {
        order: 4,
        question: "When evaluating quotes for 50 office desktop monitors, Quote A costs MUR 5,000 each and consumes 65W, while Quote B costs MUR 5,600 each and consumes 18W (Energy Star certified). Over a 5-year operating life, which is more cost-effective?",
        options: [
          "Quote B, because the 72% electricity savings over 5 years significantly outweigh the small initial price difference.",
          "Quote A, because the initial capital expenditure is always the only metric that matters.",
          "Both options cost exactly the same because electricity is free in commercial office buildings.",
          "Neither, because monitors do not use electricity."
        ],
        correct: 0,
        correctExplanation: "The 47W continuous power difference across 50 monitors running 2,000 hours per year saves substantial electricity costs, far exceeding the initial price premium.",
        incorrectExplanation: "Electricity is a major recurring operational cost; high-efficiency equipment pays back its premium quickly.",
        optionFeedback: [
          "Correct. The 72% electricity savings over 5 years significantly outweigh the small initial price difference.",
          "Ignoring operational electricity bills leads to higher total expenditure.",
          "Commercial electricity tariffs represent a substantial operating expense.",
          "Electronic monitors draw continuous electrical wattage during all working hours."
        ]
      },
      {
        order: 5,
        question: "What should a procurement policy require regarding single-use packaging from local suppliers?",
        options: [
          "Suppliers must minimize outer packaging, use 100% recyclable/compostable materials, or adopt reusable delivery crates.",
          "Suppliers must wrap every item in at least four layers of plastic bubble wrap.",
          "Suppliers must burn all discarded packaging behind their factory.",
          "Packaging requirements should be left completely unmentioned in contracts."
        ],
        correct: 0,
        correctExplanation: "Clear packaging specifications in supplier contracts eliminate unnecessary waste before it enters your facility.",
        incorrectExplanation: "Reusable crates and take-back systems prevent thousands of kilograms of packaging waste annually.",
        optionFeedback: [
          "Correct. Suppliers must minimize outer packaging, use 100% recyclable/compostable materials, or adopt reusable delivery crates.",
          "Excessive bubble wrap creates massive, avoidable landfill volume.",
          "Open burning of waste is illegal and releases toxic pollutants.",
          "Omitting packaging clauses results in suppliers using the cheapest, most wasteful packaging formats."
        ]
      },
      {
        order: 6,
        question: "Why is local supplier development in Mauritius an important component of sustainable procurement?",
        options: [
          "It reduces long-distance shipping emissions, builds local economic resilience, and allows for direct on-site quality and ESG audits.",
          "It guarantees that local goods will never require quality inspections.",
          "It eliminates the need to pay invoices.",
          "It is done purely for decorative marketing purposes."
        ],
        correct: 0,
        correctExplanation: "Local sourcing shortens supply chains, cuts freight emissions, supports community employment, and enables easy inspection.",
        incorrectExplanation: "Local sourcing builds resilience; quality standards and commercial terms still apply rigorously.",
        optionFeedback: [
          "Correct. It reduces long-distance shipping emissions, builds local economic resilience, and allows for direct on-site quality and ESG audits.",
          "Local suppliers must meet strict quality and safety specifications.",
          "All commercial transactions require timely invoice settlement.",
          "Supply chain localization is a strategic risk and carbon reduction measure."
        ]
      },
      {
        order: 7,
        question: "What is the recommended procedure if an existing key supplier fails a mandatory environmental compliance audit?",
        options: [
          "Issue a formal Corrective Action Plan (CAP) with clear milestones and timeframes, providing support while holding them accountable.",
          "Immediately hide the audit report in a drawer and forget about it.",
          "Pay the supplier a bonus so they feel better.",
          "Publicly insult the supplier's CEO on the internet."
        ],
        correct: 0,
        correctExplanation: "Constructive engagement through Corrective Action Plans drives real improvement while maintaining supply continuity.",
        incorrectExplanation: "Hiding failures preserves risk; immediate constructive remediation creates lasting supply chain improvements.",
        optionFeedback: [
          "Correct. Issue a formal Corrective Action Plan (CAP) with clear milestones and timeframes, providing support while holding them accountable.",
          "Concealing audit non-compliance perpetuates supply chain failure and legal risk.",
          "Financial rewards must never be given for failing compliance audits.",
          "Unprofessional public attacks damage business relationships and fail to rectify operational defects."
        ]
      }
    ]
  },

  // =========================================================================
  // 7. ELH-11: ESG Data Management, Metrics & Target Setting (D1 Awareness)
  // =========================================================================
  {
    courseCode: "ELH-11",
    title: "ESG Data Management, Metrics & Target Setting",
    slug: "esg-data-management-metrics-and-target-setting",
    description: "Establish verifiable data ownership, audit trails, baselines, anomaly detection, intensity metrics and non-selective sustainability reporting.",
    fullDescription: "Reliable sustainability management requires accurate, traceable, and audited operational data. This course trains administrative, operational, and financial teams on defining reporting boundaries, gathering primary evidence from meters and utility invoices, setting science-aligned baselines and intensity metrics, and detecting data anomalies without selective reporting.",
    categoryId: 1,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Foundational Awareness",
    isFeatured: true,
    thumbnailUrl: "/images/courses/esg-data.jpg",
    intendedRoles: ["Finance Officers", "Operations Leads", "Data Administrators", "ESG Coordinators"],
    learningObjectives: [
      "Define operational boundaries, reporting periods, and standardized measurement units for environmental data.",
      "Establish primary evidence audit trails linking utility bills and physical meter readings to final ESG metrics.",
      "Distinguish between absolute consumption metrics and intensity ratios (e.g., kWh per occupied room or per employee).",
      "Identify data anomalies, seasonal variance, and missing receipts without fabricating or smoothing data.",
      "Complete 8 scenario-based evaluation questions on data integrity and target calibration.",
      "Audit and document one primary utility or waste data source in your department."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed ESG Data Management, Metrics & Target Setting.",
    badgeName: "ESG Data Specialist",
    badgeDescription: "Awarded for demonstrating proficiency in primary data collection, audit trail maintenance, and emissions metrics calibration.",
    badgeSlug: "esg-data-specialist",
    relevanceLayer: "universal_core",
    primaryClassification: "UNIVERSAL_CORE",
    isEssentialUniversal: true,
    primaryCompetency: "COMP_REPORTING",
    secondaryCompetencies: ["COMP_GHG", "COMP_GOVERNANCE"],
    applicableSectors: ["SEC_ALL"],
    applicableDepartments: ["DEP_ALL"],
    applicableJobFamilies: ["JF_ALL"],
    applicableSeniorityTiers: ["SEN_ALL"],
    productionPriority: "p0",
    learningPathPurpose: "Build institutional capability in robust, verifiable ESG data gathering, metrics tracking, and audit-ready disclosure.",
    lessons: [
      {
        order: 0,
        title: "The Foundation of Trusted ESG Data",
        minutes: 4,
        content: "Why accurate data ownership and primary source documentation are essential.",
        blocks: [
          { id: "elh11-h1", type: "heading", position: 1, headingText: "Data Integrity as Governance" },
          { id: "elh11-t1", type: "short_text", position: 2, bodyText: "Sustainability metrics are increasingly subject to executive review, banking covenants, and regulatory disclosure. Unsubstantiated estimates or selective reporting create severe governance and legal risks. Every reported metric must link back to primary evidence." }
        ]
      },
      {
        order: 1,
        title: "Absolute vs Intensity Metrics & Baseline Setting",
        minutes: 4,
        content: "Measuring total impact versus operational efficiency ratios.",
        blocks: [
          { id: "elh11-h2", type: "heading", position: 1, headingText: "Absolute vs Intensity Ratios" },
          { id: "elh11-t2", type: "short_text", position: 2, bodyText: "• Absolute Metrics: Total volume consumed (e.g., total kWh of electricity or total m3 of water). Essential for assessing planetary boundaries.\n• Intensity Metrics: Resource use normalized by business activity (e.g., kWh per guest night, m3 per tonne produced, liters of fuel per km). Essential for evaluating operational efficiency independent of business volume growth." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: Investigating Electricity Sub-meter Spikes",
        minutes: 4,
        content: "Resolving anomalous energy readings through root-cause analysis.",
        blocks: [
          { id: "elh11-h3", type: "heading", position: 1, headingText: "Scenario: The 35% Electricity Anomaly" },
          {
            id: "elh11-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Reconciling Sub-Meter Data Spikes",
            situation: "A data administrator reviewing July electricity data notices that Building B logged a 35% surge in kilowatt-hours compared to June, despite occupancy remaining flat. The submission deadline for the executive ESG report is in 4 hours.",
            prompt: "How should the data coordinator handle this discrepancy?",
            options: [
              { id: "opt1", text: "Contact facility engineering immediately to cross-check physical sub-meter logs and inspect chiller schedules, noting the pending verification in the draft report.", isCorrect: true, feedback: "Correct. Data integrity requires verifying root causes (such as faulty baseload chillers or meter calibration errors) rather than guessing or altering figures." },
              { id: "opt2", text: "Manually change the July reading to match June so the monthly graph looks smooth and pleasant.", isCorrect: false, feedback: "Falsifying data to smooth graphs violates governance ethics and conceals real operational malfunctions." },
              { id: "opt3", text: "Delete Building B entirely from the corporate report.", isCorrect: false, feedback: "Omitting entire facilities from corporate reporting constitutes selective disclosure and breaches reporting boundaries." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Missing Fuel Receipts from Regional Fleet",
        minutes: 4,
        content: "Handling missing activity data transparently without fabrication.",
        blocks: [
          { id: "elh11-h4", type: "heading", position: 1, headingText: "Scenario: Incomplete Fleet Activity Data" },
          {
            id: "elh11-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Missing Transport Fuel Receipts",
            situation: "Two remote delivery vans did not submit fuel pump receipts for the third week of the month. GPS telematics logs confirm both vehicles operated standard 250km daily routes.",
            prompt: "What is the standard accounting protocol for estimating and documenting missing activity data?",
            options: [
              { id: "opt1", text: "Estimate consumption using verified vehicle historical fuel efficiency (liters/km) and GPS distance, transparently documenting the estimation methodology and assumptions in the audit log.", isCorrect: true, feedback: "Correct. Documented proxy estimation based on verified historical activity is standard, provided assumptions are explicitly disclosed." },
              { id: "opt2", text: "Record zero fuel consumption for that week to make total corporate emissions appear lower.", isCorrect: false, feedback: "Recording zero consumption when operations occurred is false accounting and distorts emissions reporting." },
              { id: "opt3", text: "Create fake fuel receipts with a pen to pass the internal audit.", isCorrect: false, feedback: "Fabricating financial receipts is criminal forgery and fraudulent reporting." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Data Source Verification",
        minutes: 4,
        content: "Auditing a primary data source in your work area.",
        blocks: [
          { id: "elh11-h5", type: "heading", position: 1, headingText: "Take Action in ESG Data" },
          { id: "elh11-t3", type: "short_text", position: 2, bodyText: "Select one data stewardship action for your departmental operations:" },
          {
            id: "elh11-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Create a digital repository folder linking monthly utility bills to your departmental spreadsheet entries.",
              "Conduct physical cross-checks of electrical sub-meter numbers against billing identifier tags.",
              "Establish a standardized weekly log sheet for recording generator run-hours and fuel top-ups."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "Why is establishing an unbroken 'audit trail' essential in ESG data management?",
        options: [
          "It allows independent auditors to verify final reported metrics directly back to primary evidence (bills, meter photos, weighbridge tickets).",
          "It automatically reduces the company's electricity consumption by 50%.",
          "It eliminates the need to measure water or fuel.",
          "It is only necessary if a company is losing money."
        ],
        correct: 0,
        correctExplanation: "Audit trails provide verifiable proof of data authenticity and prevent estimation errors or fraudulent claims.",
        incorrectExplanation: "Audit trails ensure governance and credibility; they are required for all transparent corporate reporting.",
        optionFeedback: [
          "Correct. It allows independent auditors to verify final reported metrics directly back to primary evidence (bills, meter photos, weighbridge tickets).",
          "Audit trails track data accuracy; physical energy reduction requires operational efficiency measures.",
          "Accurate measurement of water and fuel remains the core foundation of the audit trail.",
          "Audit trails are required for all responsible enterprises regardless of financial profitability."
        ]
      },
      {
        order: 1,
        question: "What is the difference between an 'absolute emissions metric' and an 'emissions intensity metric'?",
        options: [
          "Absolute metrics measure total gross emissions (tCO2e), while intensity metrics measure emissions per unit of output (e.g., kg CO2e per guest night or per unit produced).",
          "Absolute metrics are always estimated, while intensity metrics are measured with a thermometer.",
          "Absolute metrics apply to solar panels, while intensity metrics apply to coal.",
          "There is no difference between absolute and intensity metrics."
        ],
        correct: 0,
        correctExplanation: "Absolute metrics show total atmospheric burden; intensity metrics show operational efficiency per unit of activity.",
        incorrectExplanation: "Both metrics are essential: absolute shows total ecological impact, while intensity tracks efficiency gains.",
        optionFeedback: [
          "Correct. Absolute metrics measure total gross emissions (tCO2e), while intensity metrics measure emissions per unit of output.",
          "Both metrics use mathematical accounting based on verified activity data.",
          "Both metrics apply across all energy and fuel sources.",
          "Understanding the difference is fundamental to evaluating whether business growth is decoupling from emissions."
        ]
      },
      {
        order: 2,
        question: "Why must reporting boundaries (e.g., which facilities, vehicles, and subsidiaries are included) remain consistent year-over-year?",
        options: [
          "To ensure performance trends reflect genuine operational progress rather than arbitrary additions or exclusions of buildings.",
          "Because corporate buildings are legally forbidden from being sold.",
          "To prevent the need for calculating math in future years.",
          "Because reporting boundaries only apply to government ministries."
        ],
        correct: 0,
        correctExplanation: "Consistent boundaries ensure comparative integrity across reporting years, preventing misleading data shifts.",
        incorrectExplanation: "Changing boundaries without re-baselining creates false impressions of emissions reductions.",
        optionFeedback: [
          "Correct. To ensure performance trends reflect genuine operational progress rather than arbitrary additions or exclusions of buildings.",
          "Companies acquire and sell assets; standard protocols require re-baselining when structural changes occur.",
          "Calculations must be maintained accurately each year.",
          "Boundary definitions apply to all private and public reporting organizations."
        ]
      },
      {
        order: 3,
        question: "An operations lead notices that water consumption was not logged for two weeks due to a broken pulse meter. What is the correct data handling procedure?",
        options: [
          "Calculate a documented proxy estimate based on average daily occupancy and historical baseline, explicitly disclosing the estimate in the audit log.",
          "Enter zero for those two weeks to make corporate water use appear very low.",
          "Guess a random number and claim it was measured by satellite.",
          "Permanently delete the water reporting section from the company annual report."
        ],
        correct: 0,
        correctExplanation: "Documented proxy estimation with transparent disclosure maintains audit credibility when primary meters fail temporarily.",
        incorrectExplanation: "Entering zero or making wild guesses constitutes false reporting and ruins data integrity.",
        optionFeedback: [
          "Correct. Calculate a documented proxy estimate based on average daily occupancy and historical baseline, explicitly disclosing the estimate in the audit log.",
          "Entering zero when water was actively consumed is fraudulent reporting.",
          "Fictional claims destroy audit credibility.",
          "Deleting data sections conceals material resource use from stakeholders."
        ]
      },
      {
        order: 4,
        question: "What constitutes 'selective reporting' (also known as cherry-picking data) in sustainability disclosures?",
        options: [
          "Highlighting minor positive achievements while deliberately concealing major increases in energy consumption or environmental fines.",
          "Reporting all environmental and social metrics accurately according to international standards.",
          "Translating a sustainability report into French and English.",
          "Publishing the corporate report on the company's official website."
        ],
        correct: 0,
        correctExplanation: "Selective disclosure misleads stakeholders by presenting an unrepresentative, overly favorable picture of performance.",
        incorrectExplanation: "Honest ESG reporting includes both achievements and areas requiring remediation and improvement.",
        optionFeedback: [
          "Correct. Highlighting minor positive achievements while deliberately concealing major increases in energy consumption or environmental fines.",
          "Comprehensive reporting following standards is the exact opposite of cherry-picking.",
          "Language translation supports stakeholder accessibility.",
          "Public web disclosure is standard corporate transparency."
        ]
      },
      {
        order: 5,
        question: "When setting an operational energy reduction target (e.g., 'reduce electricity intensity by 15% over 3 years'), what is required for the target to be credible?",
        options: [
          "A clearly defined baseline year, measurable activity metrics, specific action milestones, and designated departmental owners.",
          "A vague promise to 'do our best when we have extra time'.",
          "Hiring an advertising agency to design a catchy slogan with no operational budget.",
          "Setting an impossible 100% reduction target within 30 days without any technical plan."
        ],
        correct: 0,
        correctExplanation: "Credible targets require a baseline, tangible engineering/behavioral actions, and assigned accountability.",
        incorrectExplanation: "Unrealistic targets or vague promises without funding and plans fail credibility tests.",
        optionFeedback: [
          "Correct. A clearly defined baseline year, measurable activity metrics, specific action milestones, and designated departmental owners.",
          "Vague promises lack accountability and fail to drive operational changes.",
          "Marketing slogans without operational engineering do not save kilowatt-hours.",
          "Unachievable targets without technical plans demotivate teams and undermine governance credibility."
        ]
      },
      {
        order: 6,
        question: "Why should raw utility invoices (electricity, water, fuel receipts) be retained for at least 5 to 7 years in digital archives?",
        options: [
          "To support historical baseline recalculations, external assurance audits, and regulatory compliance verifications.",
          "To fill up digital hard drives so IT has to buy new servers.",
          "Because utility invoices automatically convert into cryptocurrency after 5 years.",
          "There is no reason to retain invoices once payment has cleared."
        ],
        correct: 0,
        correctExplanation: "Primary utility records prove historical baselines during multi-year audits and assurance reviews.",
        incorrectExplanation: "Document retention is a core legal and financial governance requirement.",
        optionFeedback: [
          "Correct. To support historical baseline recalculations, external assurance audits, and regulatory compliance verifications.",
          "Document retention is about legal compliance and audit verification, not server sales.",
          "Invoices have no monetary conversion mechanics.",
          "Destroying primary source records makes historical ESG validation impossible."
        ]
      },
      {
        order: 7,
        question: "How should an enterprise respond if an internal data audit discovers an unintentional mathematical formula error that under-reported last year's carbon emissions by 10%?",
        options: [
          "Issue a transparent restatement and correction in the next reporting cycle, explaining the formula revision clearly.",
          "Conceal the error and threaten employees who point it out with dismissal.",
          "Change the current year's numbers to hide the difference without documenting why.",
          "Blame the error on the computer operating system."
        ],
        correct: 0,
        correctExplanation: "Transparent restatements demonstrate governance maturity and maintain stakeholder trust when errors are identified.",
        incorrectExplanation: "Concealing errors or falsifying current data compounds the governance failure and destroys institutional trust.",
        optionFeedback: [
          "Correct. Issue a transparent restatement and correction in the next reporting cycle, explaining the formula revision clearly.",
          "Concealing errors and threatening staff violates core governance ethics and whistleblower protections.",
          "Arbitrarily altering subsequent numbers corrupts multi-year data trends.",
          "Blaming software evades accountability; data owners must take responsibility and correct formulas."
        ]
      }
    ]
  },

  // =========================================================================
  // 8. ELH-31: Sustainable Tourism Foundations (D2 Working Knowledge)
  // =========================================================================
  {
    courseCode: "ELH-31",
    title: "Sustainable Tourism Foundations",
    slug: "sustainable-tourism-foundations",
    description: "Connect hospitality operations with island ecosystems, authentic guest communication, cross-department coordination and resource stewardship.",
    fullDescription: "Tourism is a vital economic engine for Mauritius, but intensive resort operations consume substantial energy, fresh water, and coastal resources. This course trains hospitality professionals, frontline guest-service staff, and department supervisors on the principles of sustainable tourism, authentic guest engagement without greenwashing, and cross-departmental eco-SOPs.",
    categoryId: 2,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Working Knowledge",
    isFeatured: true,
    thumbnailUrl: "/images/courses/sustainable-tourism.jpg",
    intendedRoles: ["Front Office Staff", "Guest Relations", "Department Supervisors", "Hospitality Leads"],
    learningObjectives: [
      "Explain the ecological and community footprint of resort operations in Mauritius (lagoon health, freshwater aquifers, waste).",
      "Communicate hotel sustainability initiatives to international and local guests authentically without exaggeration.",
      "Coordinate cross-departmental sustainability actions across Front Office, Housekeeping, F&B, and Engineering.",
      "Apply daily standard operating procedures that conserve resources while elevating the guest experience.",
      "Complete 8 scenario-based evaluation questions analyzing realistic hospitality operational dilemmas.",
      "Commit to one departmental cross-functional sustainability action in your hotel."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Sustainable Tourism Foundations.",
    badgeName: "Sustainable Hospitality Ambassador",
    badgeDescription: "Awarded for demonstrating working knowledge of sustainable resort operations, authentic guest communication, and eco-SOPs.",
    badgeSlug: "sustainable-hospitality-ambassador",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_SUSTAINABILITY_FOUNDATIONS",
    secondaryCompetencies: ["COMP_WATER", "COMP_ENERGY"],
    applicableSectors: ["SEC_HOSPITALITY", "SEC_TOURISM"],
    applicableDepartments: ["DEP_FRONT_OFFICE", "DEP_HOUSEKEEPING", "DEP_FOOD_BEVERAGE", "DEP_ENGINEERING"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR", "JF_PROFESSIONAL"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR", "SEN_MANAGER"],
    productionPriority: "p0",
    learningPathPurpose: "Equip hospitality teams to protect island natural capital while delivering world-class, authentic guest experiences.",
    lessons: [
      {
        order: 0,
        title: "Island Tourism and the Natural Capital of Mauritius",
        minutes: 4,
        content: "Understanding how lagoon preservation, coral reefs, and freshwater aquifers sustain hospitality.",
        blocks: [
          { id: "elh31-h1", type: "heading", position: 1, headingText: "Tourism Depends on Intact Nature" },
          { id: "elh31-t1", type: "short_text", position: 2, bodyText: "Travelers visit Mauritius for its pristine beaches, crystal lagoons, and vibrant culture. If hotel operations pollute lagoons with untreated wastewater, over-consume groundwater, or generate mountains of plastic litter, the very foundation of the tourism economy is eroded." }
        ]
      },
      {
        order: 1,
        title: "Authentic Guest Engagement vs Greenwashing",
        minutes: 4,
        content: "Engaging conscious travelers with genuine facts and seamless participation.",
        blocks: [
          { id: "elh31-h2", type: "heading", position: 1, headingText: "Inviting Guests to Partner in Sustainability" },
          { id: "elh31-t2", type: "short_text", position: 2, bodyText: "Modern travelers appreciate genuine environmental efforts (linen reuse programs, coral restoration, locally sourced organic produce), but quickly detect insincere cost-cutting disguised as eco-initiatives. Communication must be warm, transparent, and optional." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: Guest Complaint on Linen Re-use Policy",
        minutes: 4,
        content: "Handling guest feedback with empathy, professionalism, and environmental clarity.",
        blocks: [
          { id: "elh31-h3", type: "heading", position: 1, headingText: "Scenario: Front Desk Guest Interaction" },
          {
            id: "elh31-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Responding to Linen Replacement Demands",
            situation: "A high-tier resort guest approaches the Front Desk visibly irritated because their bed sheets were not changed on day two of their stay, despite leaving the 'Protect Our Island' linen card on the nightstand. The guest states: 'I am paying luxury rates; I expect daily fresh linen.'",
            prompt: "How should the Front Desk agent resolve this situation?",
            options: [
              { id: "opt1", text: "Apologize courteously for the misunderstanding, explain the eco-card system gently, and immediately dispatch housekeeping to provide fresh sheets while noting the guest's daily change preference.", isCorrect: true, feedback: "Correct. Luxury hospitality requires voluntary guest participation; forcing eco-policies against guest wishes damages satisfaction and creates backlash." },
              { id: "opt2", text: "Argue with the guest and lecture them about global warming and coral bleaching in Mauritius.", isCorrect: false, feedback: "Lecturing guests alienates them and harms the hotel reputation." },
              { id: "opt3", text: "Tell the guest that luxury hotels in Mauritius are legally forbidden from washing bed sheets daily.", isCorrect: false, feedback: "Lying about legal regulations is unprofessional and destroys credibility." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Cross-Department Buffet Overproduction",
        minutes: 4,
        content: "Aligning F&B, Front Office, and Stewarding on food waste prevention.",
        blocks: [
          { id: "elh31-h4", type: "heading", position: 1, headingText: "Scenario: F&B and Kitchen Coordination" },
          {
            id: "elh31-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Buffet Replenishment Pacing at 9:30 PM",
            situation: "At 9:30 PM (30 minutes before dinner buffet closing), the hot food chafing dishes are running low. The kitchen supervisor wants to cook full 50-portion trays of grilled lobster and beef curry to keep the buffet looking completely overflowing until the last minute.",
            prompt: "What is the sustainable culinary and stewarding SOP?",
            options: [
              { id: "opt1", text: "Transition to cook-to-order small portions and display smaller presentation platters, ensuring late diners receive fresh hot food without generating massive surplus waste.", isCorrect: true, feedback: "Correct. Dynamic replenishment pacing and smaller presentation dishes preserve guest elegance while cutting food waste by over 40%." },
              { id: "opt2", text: "Cook massive 50-portion batches and throw all unconsumed food directly into the sea after 10:00 PM.", isCorrect: false, feedback: "Dumping massive food waste into lagoons causes eutrophication and severe marine pollution." },
              { id: "opt3", text: "Turn off the buffet lights at 9:30 PM and tell remaining guests that the food is finished.", isCorrect: false, feedback: "Refusing service to paying guests within operating hours violates hospitality standards." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Cross-Department Eco-SOP",
        minutes: 4,
        content: "Implementing a cross-departmental sustainability procedure in your resort.",
        blocks: [
          { id: "elh31-h5", type: "heading", position: 1, headingText: "Hospitality Action Commitment" },
          { id: "elh31-t3", type: "short_text", position: 2, bodyText: "Select one practical inter-departmental action for your property:" },
          {
            id: "elh31-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Coordinate with Front Office to share accurate meal occupancy forecasts with the Executive Chef 4 hours before service.",
              "Partner with Housekeeping to audit room balcony door magnetic sensors to ensure AC automatically cuts off when doors open.",
              "Work with Stewarding to weigh and record daily buffet surplus waste to establish weekly reduction baselines."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "Why is freshwater conservation particularly vital for coastal resort hotels in Mauritius?",
        options: [
          "Groundwater aquifers are finite, and over-extraction can cause saltwater intrusion, ruining drinking water quality.",
          "Hotels are legally required to use salt water for guest showers.",
          "Fresh water is imported on cargo planes from Antarctica at great expense.",
          "Fresh water has no ecological connection to island lagoons."
        ],
        correct: 0,
        correctExplanation: "Over-pumping coastal freshwater aquifers allows sea water to infiltrate groundwater reserves, causing permanent salinization.",
        incorrectExplanation: "Mauritian coastal aquifers are sensitive natural systems; excessive pumping degrades groundwater quality.",
        optionFeedback: [
          "Correct. Groundwater aquifers are finite, and over-extraction can cause saltwater intrusion, ruining drinking water quality.",
          "Guest showers utilize treated fresh potable water.",
          "Mauritius relies on local rainfall, surface reservoirs, and groundwater aquifers, not airborne water imports.",
          "Freshwater runoff and wastewater discharge directly impact lagoon water quality and coral reef ecosystems."
        ]
      },
      {
        order: 1,
        question: "How should hotel staff communicate the resort's towel and linen reuse program to guests?",
        options: [
          "As an empowering invitation to help protect island resources, while honoring the guest's personal preference at all times.",
          "As a mandatory penalty where guests who request fresh towels are fined MUR 1,000.",
          "By hiding all clean towels so guests are forced to reuse dirty ones.",
          "By pretending that the hotel has no laundry machines on the island."
        ],
        correct: 0,
        correctExplanation: "Empowering, respectful communication invites guest participation without degrading luxury service standards.",
        incorrectExplanation: "Sustainability in hospitality succeeds through voluntary guest collaboration, not punitive enforcement.",
        optionFeedback: [
          "Correct. As an empowering invitation to help protect island resources, while honoring the guest's personal preference at all times.",
          "Imposing fines on standard service requests destroys guest loyalty and creates severe dissatisfaction.",
          "Depriving guests of basic linen violates core hospitality standards.",
          "Misleading guests about operational capability damages professional trust."
        ]
      },
      {
        order: 2,
        question: "What is the primary ecological hazard of discharging untreated or poorly treated kitchen and sewage wastewater into coastal lagoons?",
        options: [
          "Excess nutrients (nitrogen and phosphorus) trigger massive algae blooms, suffocating living coral reefs and clouding water.",
          "It makes sea water turn into fresh drinking water.",
          "It causes ocean waves to stop moving entirely.",
          "It has zero impact on coral reefs or fish populations."
        ],
        correct: 0,
        correctExplanation: "Eutrophication from nutrient-rich wastewater stimulates algal overgrowth that kills coral reefs and destroys lagoon biodiversity.",
        incorrectExplanation: "Lagoon water quality requires high-standard on-site wastewater treatment and nutrient removal before recycling or discharge.",
        optionFeedback: [
          "Correct. Excess nutrients (nitrogen and phosphorus) trigger massive algae blooms, suffocating living coral reefs and clouding water.",
          "Wastewater contains organic contaminants and nutrients, not desalination properties.",
          "Ocean currents and tides are driven by wind and lunar gravity, not wastewater volume.",
          "Corals are extremely sensitive to organic pollution and nutrient spikes."
        ]
      },
      {
        order: 3,
        question: "Which operational strategy effectively reduces buffet food waste during the final hour of dinner service?",
        options: [
          "Switching to smaller display dishes and preparing fresh items to order rather than cooking full commercial pans.",
          "Keeping all buffet stations piled three feet high until after midnight.",
          "Forcing guests to eat everything remaining on the buffet before they can leave.",
          "Shutting down the restaurant one hour before the advertised closing time."
        ],
        correct: 0,
        correctExplanation: "Smaller presentation platters maintain aesthetic elegance while preventing massive end-of-night food discard.",
        incorrectExplanation: "Cooking massive batches at closing time leads directly to high waste volumes going to landfill.",
        optionFeedback: [
          "Correct. Switching to smaller display dishes and preparing fresh items to order rather than cooking full commercial pans.",
          "Overfilling display pans at closing time guarantees high food waste.",
          "Coercing guests violates fundamental hospitality service ethics.",
          "Prematurely closing the restaurant breaches guest contract commitments."
        ]
      },
      {
        order: 4,
        question: "How can the Front Office and Housekeeping departments collaborate to reduce energy consumption in unoccupied guest rooms?",
        options: [
          "Front Office communicates real-time check-out/check-in status so Housekeeping sets AC thermostats to eco-mode (25°C) and closes blackout drapes.",
          "Housekeeping leaves all guest room lights and televisions turned on 24/7.",
          "Front Office tells guests they are not allowed to use air conditioning.",
          "Housekeeping removes all lightbulbs from guest rooms upon departure."
        ],
        correct: 0,
        correctExplanation: "Coordinated occupancy communication ensures unoccupied rooms are maintained in energy-saving standby mode with closed curtains.",
        incorrectExplanation: "Leaving rooms in high-cooling mode with open drapes wastes massive electricity during sunny island afternoons.",
        optionFeedback: [
          "Correct. Front Office communicates real-time check-out/check-in status so Housekeeping sets AC thermostats to eco-mode (25°C) and closes blackout drapes.",
          "Leaving lights and TV on in vacant rooms wastes substantial kilowatt-hours.",
          "Guests must have control of their room comfort during occupancy.",
          "Removing light fixtures is unacceptable and breaches room preparation SOPs."
        ]
      },
      {
        order: 5,
        question: "Why should resorts prioritize locally grown Mauritian produce (vegetables, fruit, sustainable seafood) over air-freighted imports?",
        options: [
          "It drastically cuts Scope 3 aviation freight emissions, guarantees fresher culinary quality, and supports local farmer livelihoods.",
          "Air freight is completely free of charge for luxury hotels.",
          "Imported vegetables never spoil or go bad.",
          "Local food contains zero vitamins compared to imported food."
        ],
        correct: 0,
        correctExplanation: "Local sourcing reduces long-distance flight emissions, enhances farm-to-table freshness, and circulates tourist revenue locally.",
        incorrectExplanation: "Air-freighted produce carries a massive carbon footprint compared to locally harvested island crops.",
        optionFeedback: [
          "Correct. It drastically cuts Scope 3 aviation freight emissions, guarantees fresher culinary quality, and supports local farmer livelihoods.",
          "Aviation freight is among the most expensive and carbon-intensive logistics modes.",
          "All fresh produce degrades over time; long transit times increase spoilage risk.",
          "Freshly harvested local produce retains superior nutritional and flavor profiles."
        ]
      },
      {
        order: 6,
        question: "What is an effective way for resorts to eliminate single-use miniature shampoo and lotion bottles from guest bathrooms?",
        options: [
          "Install elegant, tamper-proof, wall-mounted bulk refillable dispensers containing high-quality certified biodegradable amenities.",
          "Stop providing any soap or shampoo to guests.",
          "Ask guests to bring their own bar of soap from home in their luggage.",
          "Give guests five miniature plastic bottles every morning regardless of whether they use them."
        ],
        correct: 0,
        correctExplanation: "Tamper-proof wall dispensers maintain luxury aesthetics and hygiene while eliminating hundreds of thousands of plastic miniatures.",
        incorrectExplanation: "Modern refillable dispensers deliver luxury amenities while preventing tons of plastic waste.",
        optionFeedback: [
          "Correct. Install elegant, tamper-proof, wall-mounted bulk refillable dispensers containing high-quality certified biodegradable amenities.",
          "Eliminating essential bathroom amenities damages resort ratings and luxury standards.",
          "Expecting travelers to pack bulky toiletries undermines resort service hospitality.",
          "Distributing surplus miniatures directly accelerates plastic waste generation."
        ]
      },
      {
        order: 7,
        question: "When organizing motorized water sports (speedboats, jet skis) in resort lagoons, what environmental protocol must be enforced?",
        options: [
          "Strict designated navigation channels outside coral zones, speed limits, and 4-stroke/electric low-emission propulsion.",
          "Encouraging drivers to anchor directly onto living coral reef heads.",
          "Refueling boat engines directly in the swimming lagoon without spill containment trays.",
          "Allowing boats to discharge engine bilge oil into swimming areas."
        ],
        correct: 0,
        correctExplanation: "Restricted boating channels and clean engine technology prevent physical reef destruction and toxic fuel contamination.",
        incorrectExplanation: "Anchoring on corals and fuel spills cause irreversible ecological damage to marine habitats.",
        optionFeedback: [
          "Correct. Strict designated navigation channels outside coral zones, speed limits, and 4-stroke/electric low-emission propulsion.",
          "Dropping anchors on coral reefs pulverizes fragile colonies that take decades to grow.",
          "Refueling without spill protection causes toxic petroleum slicks in guest swimming zones.",
          "Discharging bilge oil is illegal under maritime environmental law and destroys marine life."
        ]
      }
    ]
  },

  // =========================================================================
  // 9. ELH-32: Energy Management for Frontline Hospitality Teams (D2 Working Knowledge)
  // =========================================================================
  {
    courseCode: "ELH-32",
    title: "Energy Management for Frontline Hospitality Teams",
    slug: "energy-management-for-frontline-hospitality-teams",
    description: "Eliminate avoidable energy waste across guest rooms, housekeeping, commercial kitchens, laundry and back-of-house shift routines.",
    fullDescription: "Energy represents one of the largest operational costs and carbon drivers in the hospitality industry. This course provides frontline hotel staff, room attendants, culinary teams, and facility supervisors with practical shift protocols to eliminate energy waste, manage thermal HVAC loads, optimize laundry and kitchen equipment, and escalate mechanical faults promptly.",
    categoryId: 2,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Working Knowledge",
    isFeatured: true,
    thumbnailUrl: "/images/courses/hotel-energy.jpg",
    intendedRoles: ["Housekeeping Staff", "Kitchen Stewards", "F&B Staff", "Maintenance Coordinators"],
    learningObjectives: [
      "Identify common sources of avoidable energy waste across guest rooms, commercial kitchens, and laundry operations.",
      "Execute standard guest room turn-down and departure energy procedures (HVAC setpoints, blackout curtains, lighting).",
      "Apply kitchen equipment pre-heat scheduling to eliminate idle cooking appliances and excessive thermal kitchen loads.",
      "Distinguish routine operational energy adjustments from certified engineering interventions, maintaining strict electrical safety.",
      "Complete 8 scenario-based evaluation questions analyzing frontline energy decisions.",
      "Incorporate one daily energy shut-off check into your shift handover routine."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Energy Management for Frontline Hospitality Teams.",
    badgeName: "Hospitality Energy Steward",
    badgeDescription: "Awarded for demonstrating working knowledge of resort energy conservation, equipment scheduling, and thermal efficiency.",
    badgeSlug: "hospitality-energy-steward",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_ENERGY",
    secondaryCompetencies: ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_GHG"],
    applicableSectors: ["SEC_HOSPITALITY", "SEC_TOURISM"],
    applicableDepartments: ["DEP_HOUSEKEEPING", "DEP_FOOD_BEVERAGE", "DEP_ENGINEERING"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR"],
    productionPriority: "p0",
    learningPathPurpose: "Empower frontline resort staff to reduce electricity and gas consumption through disciplined shift procedures.",
    lessons: [
      {
        order: 0,
        title: "The Energy Footprint of a Resort Shift",
        minutes: 4,
        content: "Understanding where kilowatt-hours are consumed in hospitality operations.",
        blocks: [
          { id: "elh32-h1", type: "heading", position: 1, headingText: "Where Does the Energy Go?" },
          { id: "elh32-t1", type: "short_text", position: 2, bodyText: "In Mauritian resorts, air conditioning (HVAC) accounts for up to 55% of total electricity consumption, followed by kitchen cooking equipment, hot water boilers, laundry dryers, and lighting. Small daily oversights across hundreds of guest rooms multiply into enormous power bills and carbon emissions." }
        ]
      },
      {
        order: 1,
        title: "Guest Room Energy Protocols for Housekeeping",
        minutes: 4,
        content: "Turnover, servicing, and turn-down energy standards.",
        blocks: [
          { id: "elh32-h2", type: "heading", position: 1, headingText: "Housekeeping Shift Standards" },
          { id: "elh32-t2", type: "short_text", position: 2, bodyText: "1. Departure Rooms: Immediately set AC to 25°C eco-standby, ensure balcony sliding doors are fully latched, and close blackout sheer curtains to block tropical solar heat gain.\n2. In-Stay Servicing: Respect guest settings, but ensure balcony doors are closed during cleaning and turn off vanity spotlights and TV displays upon leaving." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: Kitchen Equipment Morning Startup",
        minutes: 4,
        content: "Scheduling kitchen appliances to prevent idle energy draw and peak surges.",
        blocks: [
          { id: "elh32-h3", type: "heading", position: 1, headingText: "Scenario: Kitchen Opening Routine" },
          {
            id: "elh32-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Commercial Kitchen Appliance Scheduling",
            situation: "A line cook arrives at 6:00 AM for an 8:00 AM breakfast service and immediately powers on all 6 deep fryers, 4 gas salamanders, 2 combi-ovens, and full extraction hood fans to maximum output.",
            prompt: "What is the operational problem and how should this be corrected?",
            options: [
              { id: "opt1", text: "Stagger appliance startup according to a timed preheat schedule (e.g., ovens 20 mins before cooking, fryers 15 mins before), avoiding 2 hours of idle heating and massive electrical peak demand spikes.", isCorrect: true, feedback: "Correct. Turning on cooking equipment hours before use wastes massive electricity/gas and overheats the kitchen, forcing exhaust fans and AC to work twice as hard." },
              { id: "opt2", text: "Keep turning everything on at 6:00 AM because cooking appliances require at least 3 hours to warm up.", isCorrect: false, feedback: "Modern commercial ovens and fryers reach working temperatures in 15–20 minutes." },
              { id: "opt3", text: "Never turn on the extraction hoods even when cooking hot food.", isCorrect: false, feedback: "Operating without exhaust hoods violates kitchen health and fire safety standards." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Laundry Dryer Loading & Lint Filter Maintenance",
        minutes: 4,
        content: "Optimizing industrial laundry efficiency.",
        blocks: [
          { id: "elh32-h4", type: "heading", position: 1, headingText: "Scenario: Resort Laundry Operations" },
          {
            id: "elh32-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Dryer Cycle Times and Airflow Efficiency",
            situation: "A laundry operator notices that commercial tumble dryers are taking 65 minutes per towel load instead of the standard 40 minutes. The lint screens have not been cleaned for two days.",
            prompt: "What must the operator do to restore energy efficiency and prevent fire hazards?",
            options: [
              { id: "opt1", text: "Clean all dryer lint screens immediately and enforce mandatory cleaning after every shift, restoring proper hot airflow and cutting cycle times by 35%.", isCorrect: true, feedback: "Correct. Blocked lint filters restrict airflow, dramatically prolonging drying cycles and creating severe spontaneous combustion fire risks." },
              { id: "opt2", text: "Increase the drying temperature to maximum 120°C and let the machine run longer.", isCorrect: false, feedback: "Increasing temperature without airflow scorches linens, damages fabric fibers, and accelerates fire hazard." },
              { id: "opt3", text: "Hang all 2,000 resort pool towels on palm trees along the guest beach.", isCorrect: false, feedback: "Hanging commercial laundry across guest beaches disrupts resort elegance and service standards." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Shift Handover Energy Checklist",
        minutes: 4,
        content: "Executing end-of-shift energy shut-off checks.",
        blocks: [
          { id: "elh32-h5", type: "heading", position: 1, headingText: "Frontline Energy Commitment" },
          { id: "elh32-t3", type: "short_text", position: 2, bodyText: "Select one practical energy habit to integrate into your daily shift routine:" },
          {
            id: "elh32-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Conduct a 5-minute closing walk-through of your kitchen/service area to ensure hot-holding cabinets, salamanders, and display warmers are powered off.",
              "Ensure all back-of-house corridor and linen store lighting is switched off when exiting.",
              "Report leaking walk-in freezer door magnetic gaskets to Engineering via the maintenance ticket system."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "Which operational system typically represents the largest portion of electricity consumption in a Mauritian beach resort?",
        options: [
          "Air conditioning (HVAC) and refrigeration chillers.",
          "Guest room bedside alarm clocks.",
          "Front desk computer monitors.",
          "The executive chef's electric pepper grinder."
        ],
        correct: 0,
        correctExplanation: "Cooling and thermal comfort systems account for over 50% of total electrical load in tropical island hotels.",
        incorrectExplanation: "HVAC and cooling chillers dominate resort power draw; small electronics consume negligible power in comparison.",
        optionFeedback: [
          "Correct. Air conditioning (HVAC) and refrigeration chillers consume over half of total resort electricity.",
          "Small bedside electronics draw very low wattage.",
          "Office monitors consume minimal power compared to heavy mechanical chillers.",
          "Small kitchen hand-tools use negligible energy compared to HVAC and refrigeration."
        ]
      },
      {
        order: 1,
        question: "Why should room attendants close blackout sheer curtains in vacant guest rooms during tropical daylight hours?",
        options: [
          "It blocks direct solar radiation, reducing heat buildup and lowering air conditioning workload by up to 20%.",
          "It makes the room completely pitch black so ghosts feel welcome.",
          "It is done purely to hide the view from the window.",
          "Curtains have no effect on room temperature."
        ],
        correct: 0,
        correctExplanation: "Closing drapes prevents solar radiant heat gain through glass windows, reducing the energy needed to cool the room.",
        incorrectExplanation: "Sunlight passing through large glass windows significantly heats unoccupied rooms, forcing AC units to run continuously.",
        optionFeedback: [
          "Correct. It blocks direct solar radiation, reducing heat buildup and lowering air conditioning workload by up to 20%.",
          "Closing curtains is an engineering thermal heat-gain mitigation strategy.",
          "The objective is solar shading and energy efficiency.",
          "Glass allows intense infrared radiant heat to enter; curtains provide an essential thermal barrier."
        ]
      },
      {
        order: 2,
        question: "What is the recommended energy-efficient practice when preheating commercial kitchen ovens before meal service?",
        options: [
          "Turn on ovens 15–20 minutes before cooking begins, according to a timed kitchen preheat schedule.",
          "Turn on all ovens at 5:00 AM at maximum temperature even if food prep starts at 11:00 AM.",
          "Leave oven doors wide open with burners running to warm the kitchen floor.",
          "Never turn on ovens and serve all hot meals raw."
        ],
        correct: 0,
        correctExplanation: "Modern commercial ovens reach set cooking temperatures rapidly; prolonged idle running wastes energy and overheats kitchens.",
        incorrectExplanation: "Preheating hours in advance wastes substantial gas/electricity and overburdens kitchen air conditioning.",
        optionFeedback: [
          "Correct. Turn on ovens 15–20 minutes before cooking begins, according to a timed kitchen preheat schedule.",
          "Running empty ovens for hours wastes substantial energy and creates unnecessary kitchen heat.",
          "Leaving oven doors open is dangerous, wasteful, and ruins thermostat controls.",
          "Cooked food must reach safe internal temperatures to meet food safety standards."
        ]
      },
      {
        order: 3,
        question: "Why does accumulated lint on industrial laundry dryer filter screens increase electricity and steam consumption?",
        options: [
          "It blocks exhaust airflow, trapping moisture and forcing dryers to run significantly longer to dry towels.",
          "Lint filters convert electricity into water droplets.",
          "Lint makes the dryer drum spin ten times faster.",
          "Lint filters have no effect on drying cycle duration."
        ],
        correct: 0,
        correctExplanation: "Clogged filters choke airflow, extending drying cycles from 40 to 65+ minutes and creating a severe fire hazard.",
        incorrectExplanation: "Restricted airflow prevents moisture extraction, doubling energy consumption per laundry batch.",
        optionFeedback: [
          "Correct. It blocks exhaust airflow, trapping moisture and forcing dryers to run significantly longer to dry towels.",
          "Lint filters trap physical fibers; they do not convert energy forms.",
          "Drum rotation speed is fixed by motor gearing.",
          "Clean airflow is the primary factor determining moisture evaporation efficiency in commercial dryers."
        ]
      },
      {
        order: 4,
        question: "If a walk-in freezer door gasket is torn, allowing cold air to leak out and frost to build up around the frame, what should the culinary team do?",
        options: [
          "Report the defective gasket to Engineering immediately and ensure the door latch is firmly closed after every entry.",
          "Prop the freezer door open with a wooden crate to let the kitchen cool down.",
          "Ignore the leak because cold air escaping is pleasant for the chefs.",
          "Cover the leak with cardboard and tape without telling anyone."
        ],
        correct: 0,
        correctExplanation: "Damaged gaskets cause compressor overload, ice buildup, food spoilage, and massive continuous power waste.",
        incorrectExplanation: "Escaping cold air forces refrigeration compressors to run continuously without reaching set temperatures.",
        optionFeedback: [
          "Correct. Report the defective gasket to Engineering immediately and ensure the door latch is firmly closed after every entry.",
          "Propping freezer doors open causes catastrophic compressor failure and food spoilage.",
          "Freezer air leakage dramatically inflates electricity bills and risks food safety.",
          "Makeshift cardboard patches fail to seal thermal leaks and hide maintenance defects."
        ]
      },
      {
        order: 5,
        question: "What is the safety boundary for frontline housekeeping and F&B staff regarding electrical and mechanical equipment?",
        options: [
          "Staff should operate controls according to SOPs, power off idle equipment, and report faults to certified Engineering technicians.",
          "Staff should open electrical distribution panels and rewire circuit breakers with metal wire.",
          "Staff should repair broken high-voltage plugs using wet towels.",
          "Staff should disassemble commercial dishwashers while plugged into the live mains."
        ],
        correct: 0,
        correctExplanation: "Frontline staff manage operational switches and reporting; all electrical, mechanical, and wiring repairs must be performed by qualified engineers.",
        incorrectExplanation: "Unlicensed electrical or mechanical tampering is illegal, causes fatal electrocutions, and voids insurance.",
        optionFeedback: [
          "Correct. Staff should operate controls according to SOPs, power off idle equipment, and report faults to certified Engineering technicians.",
          "Opening live electrical panels carries fatal shock and arc-flash hazards.",
          "Using wet materials near electrical circuits creates lethal electrocution risks.",
          "Disassembling live equipment violates occupational safety regulations."
        ]
      },
      {
        order: 6,
        question: "Why should restaurant buffet hot-holding food warmers (bain-marie) be covered with insulated lids during pre-service preparation?",
        options: [
          "Lids retain thermal heat, keeping food at safe temperatures while cutting electrical heating energy by up to 40%.",
          "Lids make the food turn cold immediately.",
          "Lids are only used to prevent chefs from looking at the food.",
          "Lids increase the weight of the water bath."
        ],
        correct: 0,
        correctExplanation: "Covering hot water baths prevents evaporative heat loss, keeping food hot with much lower heating element draw.",
        incorrectExplanation: "Open bain-marie warmers lose heat rapidly through steam evaporation, consuming maximum continuous electricity.",
        optionFeedback: [
          "Correct. Lids retain thermal heat, keeping food at safe temperatures while cutting electrical heating energy by up to 40%.",
          "Insulated lids trap steam and heat, keeping food hotter.",
          "Lids maintain hygiene and thermal containment.",
          "Lids are lightweight and provide immense thermal insulation benefits."
        ]
      },
      {
        order: 7,
        question: "During a room attendant's morning cleaning routine in an occupied room where the guest is out, what is the best practice for air conditioning?",
        options: [
          "Keep balcony doors closed while cleaning, maintain a comfortable moderate setting (23–24°C), and ensure lights are off upon exit.",
          "Set the AC to minimum 16°C with balcony doors wide open to air out the room.",
          "Disconnect the main electrical circuit breaker to the whole floor.",
          "Leave the television running at maximum volume on the sports channel."
        ],
        correct: 0,
        correctExplanation: "Keeping balcony doors closed prevents warm humid air from rushing in, avoiding severe condensation and cooling load spikes.",
        incorrectExplanation: "Running AC with balcony doors open causes moisture condensation on walls and wastes massive cooling power.",
        optionFeedback: [
          "Correct. Keep balcony doors closed while cleaning, maintain a comfortable moderate setting (23–24°C), and ensure lights are off upon exit.",
          "Running AC with open balcony doors creates wall mold, condensation, and extreme energy waste.",
          "Disconnecting floor breakers cuts power to other guest rooms.",
          "Leaving electronics running in empty rooms wastes electricity."
        ]
      }
    ]
  },

  // =========================================================================
  // 10. ELH-33: Water Conservation & Stewardship in Hotels (D2 Working Knowledge)
  // =========================================================================
  {
    courseCode: "ELH-33",
    title: "Water Conservation & Stewardship in Hotels",
    slug: "water-conservation-and-stewardship-in-hotels",
    description: "Detect leaks early, optimize housekeeping, laundry, kitchen and irrigation routines, protect water hygiene, and practice responsible reuse.",
    fullDescription: "Fresh water is a precious, vulnerable resource in Mauritius. Hotel operations use significant volumes of water across guest bathrooms, swimming pools, laundry washing, commercial kitchens, and tropical landscaping. This course trains hospitality staff to detect fixture leaks, implement water-saving operational SOPs, safeguard potable water hygiene, and manage treated greywater responsibly.",
    categoryId: 2,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Working Knowledge",
    isFeatured: true,
    thumbnailUrl: "/images/courses/hotel-water.jpg",
    intendedRoles: ["Housekeeping Staff", "Kitchen Stewards", "Landscape Teams", "Maintenance Staff"],
    learningObjectives: [
      "Identify common sources of hidden water waste and silent toilet cistern leaks in guest and back-of-house areas.",
      "Execute water-efficient housekeeping cleaning and laundry load optimization standards.",
      "Apply kitchen thawing, dishwashing pre-rinse, and stewarding water conservation best practices.",
      "Balance water conservation with uncompromising potable water hygiene and guest comfort standards.",
      "Complete 8 scenario-based evaluation questions analyzing hospitality water stewardship decisions.",
      "Conduct a fixture leak audit in your work section and report findings."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Water Conservation & Stewardship in Hotels.",
    badgeName: "Water Stewardship Champion",
    badgeDescription: "Awarded for demonstrating working knowledge of resort water conservation, leak detection, and hygiene protection.",
    badgeSlug: "water-stewardship-champion",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_WATER",
    secondaryCompetencies: ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_CIRCULARITY"],
    applicableSectors: ["SEC_HOSPITALITY", "SEC_TOURISM"],
    applicableDepartments: ["DEP_HOUSEKEEPING", "DEP_FOOD_BEVERAGE", "DEP_ENGINEERING"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR"],
    productionPriority: "p0",
    learningPathPurpose: "Equip resort operational teams to reduce freshwater consumption, detect leaks, and protect island water resources.",
    lessons: [
      {
        order: 0,
        title: "Island Water Realities and Hotel Stewardship",
        minutes: 4,
        content: "Understanding groundwater vulnerability and the scale of hotel water use.",
        blocks: [
          { id: "elh33-h1", type: "heading", position: 1, headingText: "Water: Our Most Precious Island Resource" },
          { id: "elh33-t1", type: "short_text", position: 2, bodyText: "In Mauritius, a luxury resort can consume between 400 to 800 liters of water per guest night across guest bathrooms, laundry, kitchens, swimming pools, and extensive tropical gardens. Conserving water protects local community supplies and reduces energy consumed in pumping and wastewater treatment." }
        ]
      },
      {
        order: 1,
        title: "Early Leak Detection: Silent Cisterns & Dripping Fixtures",
        minutes: 4,
        content: "Identifying leaks that waste thousands of liters daily.",
        blocks: [
          { id: "elh33-h2", type: "heading", position: 1, headingText: "The Cost of Silent Leaks" },
          { id: "elh33-t2", type: "short_text", position: 2, bodyText: "A single silently leaking toilet cistern flush flapper can waste over 300 liters of potable water per day without making noticeable noise. A dripping faucet wastes up to 30 liters daily. Room attendants and maintenance teams are the first line of defense in detecting and logging leaks." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: Food Thawing in Commercial Kitchens",
        minutes: 4,
        content: "Eliminating continuous tap running while upholding food safety.",
        blocks: [
          { id: "elh33-h3", type: "heading", position: 1, headingText: "Scenario: Kitchen Thawing Best Practice" },
          {
            id: "elh33-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Running Tap Thawing vs Controlled Refrigeration",
            situation: "A prep cook needs to thaw 20kg of frozen calamari for evening dinner service and places the frozen block in a prep sink under a continuously running hot water tap for 3 hours, wasting approximately 1,800 liters of potable water.",
            prompt: "What is the food-safe, water-efficient standard operating procedure?",
            options: [
              { id: "opt1", text: "Plan thawing 24 hours in advance by transferring frozen items to dedicated defrosting refrigeration racks (2–4°C), saving 100% of running tap water while maintaining HACCP food safety.", isCorrect: true, feedback: "Correct. Planned refrigeration thawing preserves food cell structure, guarantees microbiological safety, and uses zero water." },
              { id: "opt2", text: "Turn the running tap to cold water instead of hot water and let it run for 6 hours.", isCorrect: false, feedback: "Running continuous cold water still wastes thousands of liters of clean potable water." },
              { id: "opt3", text: "Leave the raw seafood outside in direct sunlight on the loading dock.", isCorrect: false, feedback: "Sun thawing creates rapid bacterial growth and causes severe food poisoning outbreaks." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Resort Landscape Irrigation Scheduling",
        minutes: 4,
        content: "Optimizing watering times to minimize evaporation loss.",
        blocks: [
          { id: "elh33-h4", type: "heading", position: 1, headingText: "Scenario: Garden Watering Timing" },
          {
            id: "elh33-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Midday Sprinklers vs Early Morning Drip Irrigation",
            situation: "A groundskeeper runs rotary turf sprinklers across resort lawns at 1:00 PM under blazing direct tropical sunshine (32°C). Over 45% of the sprayed water evaporates in the air before reaching plant roots.",
            prompt: "How should the landscaping supervisor adjust the watering schedule?",
            options: [
              { id: "opt1", text: "Schedule automated irrigation exclusively during cool pre-dawn hours (4:00 AM – 6:30 AM) and utilize drip irrigation in garden beds to maximize root absorption and eliminate evaporation.", isCorrect: true, feedback: "Correct. Pre-dawn watering allows deep soil absorption with near-zero evaporation, cutting landscape water consumption by up to 50%." },
              { id: "opt2", text: "Double the sprinkler flow rate at midday so grass gets wet faster.", isCorrect: false, feedback: "Increasing midday watering accelerates evaporation and can scorch delicate turf blades." },
              { id: "opt3", text: "Replace all resort grass with green concrete.", isCorrect: false, feedback: "Paving over resort gardens destroys natural rainwater infiltration and damages tropical resort aesthetics." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Daily Water Audit",
        minutes: 4,
        content: "Committing to proactive leak reporting in your department.",
        blocks: [
          { id: "elh33-h5", type: "heading", position: 1, headingText: "Water Stewardship in Action" },
          { id: "elh33-t3", type: "short_text", position: 2, bodyText: "Select one practical water stewardship action for your shift routine:" },
          {
            id: "elh33-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Perform a drop-test inspection on 10 guest toilet cisterns during room cleaning to verify zero silent flapper leakage.",
              "Ensure kitchen pre-rinse dishwashing spray valves have functioning shut-off triggers and flow restrictors.",
              "Inspect landscaped garden irrigation zones for broken or misaligned sprinkler heads spraying onto concrete paths."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "What is a 'silent toilet leak' and why is it so damaging to hotel water conservation?",
        options: [
          "A worn flapper valve inside the cistern allows water to trickle continuously into the bowl without noise, wasting hundreds of liters daily.",
          "A leak that only occurs when the bathroom light is turned off.",
          "A pipe that makes music when water flows through it.",
          "A leak that evaporates before touching the floor."
        ],
        correct: 0,
        correctExplanation: "Defective flapper valves allow continuous, unnoticed leakage down the back of the toilet pan, wasting 300+ liters per day per toilet.",
        incorrectExplanation: "Silent flapper leaks are common and invisible unless actively inspected with food dye or touch tests.",
        optionFeedback: [
          "Correct. A worn flapper valve inside the cistern allows water to trickle continuously into the bowl without noise, wasting hundreds of liters daily.",
          "Toilet cistern leaks operate continuously under hydraulic gravity regardless of lighting.",
          "Leaks do not generate music; they waste precious potable water silently.",
          "Water trickles directly down the internal sewer drain without touching bathroom floors."
        ]
      },
      {
        order: 1,
        question: "Why is thawing frozen meat and seafood under a continuously running tap considered bad practice in commercial kitchens?",
        options: [
          "It wastes thousands of liters of clean water and risks bacterial growth compared to planned refrigeration thawing.",
          "It makes the fish turn into chicken.",
          "It causes kitchen knives to become dull.",
          "It is completely acceptable in all situations."
        ],
        correct: 0,
        correctExplanation: "Running taps waste immense water volumes and can create surface bacterial growth; defrosting in refrigerators (2–4°C) is safe and water-free.",
        incorrectExplanation: "Running tap thawing wastes up to 600 liters per hour and violates modern culinary eco-standards.",
        optionFeedback: [
          "Correct. It wastes thousands of liters of clean water and risks bacterial growth compared to planned refrigeration thawing.",
          "Water temperature does not alter biological animal species.",
          "Water flow does not affect cutting tool hardness.",
          "Continuous running tap thawing is wasteful and discouraged in professional kitchens."
        ]
      },
      {
        order: 2,
        question: "When is the most water-efficient time of day to irrigate resort tropical gardens and lawns?",
        options: [
          "Early morning (pre-dawn, 4:00 AM – 6:30 AM), when cool air and low winds minimize evaporative loss.",
          "Midday at 1:00 PM during maximum solar heat.",
          "Late afternoon during peak guest cocktail hours on the lawn.",
          "Irrigation should never be performed on living plants."
        ],
        correct: 0,
        correctExplanation: "Pre-dawn watering minimizes wind drift and evaporation, ensuring maximum water penetrates down to root zones.",
        incorrectExplanation: "Midday watering loses up to 50% of water directly to atmospheric evaporation before reaching roots.",
        optionFeedback: [
          "Correct. Early morning (pre-dawn, 4:00 AM – 6:30 AM), when cool air and low winds minimize evaporative loss.",
          "Midday heat evaporates water rapidly, wasting immense irrigation volume.",
          "Watering during guest cocktail hours disrupts guest relaxation.",
          "Landscaped gardens require controlled irrigation to thrive in tropical climates."
        ]
      },
      {
        order: 3,
        question: "How do low-flow aerators on bathroom basin faucets save water without reducing guest comfort?",
        options: [
          "They mix air into the water stream, maintaining strong pressure and voluminous feel while cutting water flow by up to 50%.",
          "They completely turn off the water supply after 3 seconds.",
          "They make water temperature boiling hot.",
          "They add perfume to the water."
        ],
        correct: 0,
        correctExplanation: "Faucet aerators introduce micro-air bubbles into the stream, creating a soft, full, splash-free spray using half the water volume.",
        incorrectExplanation: "Aerators optimize fluid dynamics to preserve tactile sensation while slashing water flow from 12L/min down to 5–6L/min.",
        optionFeedback: [
          "Correct. They mix air into the water stream, maintaining strong pressure and voluminous feel while cutting water flow by up to 50%.",
          "Aerators provide continuous water flow with optimized volume.",
          "Aerators regulate fluid flow without altering thermodynamic temperature.",
          "Aerators are mechanical flow devices; they do not introduce chemical scents."
        ]
      },
      {
        order: 4,
        question: "Why must treated wastewater (effluent from on-site sewage treatment plants) undergo rigorous testing before being used for garden irrigation?",
        options: [
          "To verify that pathogens, bacteria, and excessive nutrients meet health standards to protect guest safety and avoid groundwater contamination.",
          "To ensure the water tastes like sparkling mineral water.",
          "To check if the water has turned into blue swimming pool paint.",
          "Treated wastewater requires no testing before spraying onto guest lawns."
        ],
        correct: 0,
        correctExplanation: "Recycled irrigation water must comply with strict microbiological and chemical safety standards to safeguard human health and aquifers.",
        incorrectExplanation: "Untreated or poorly treated effluent poses severe public health risks from E. coli and pathogen exposure.",
        optionFeedback: [
          "Correct. To verify that pathogens, bacteria, and excessive nutrients meet health standards to protect guest safety and avoid groundwater contamination.",
          "Irrigation water is for landscaping, not human culinary consumption.",
          "Effluent testing measures biological and chemical purity, not pigmentation.",
          "Unregulated effluent spraying violates environmental and public health laws."
        ]
      },
      {
        order: 5,
        question: "During commercial dishwashing in the stewarding department, which practice conserves water and energy?",
        options: [
          "Only running conveyor dishwashers with full dish racks and using trigger-operated pre-rinse spray valves.",
          "Running the machine continuously with one fork per rack.",
          "Leaving the pre-rinse hose running full blast into the floor drain all day.",
          "Washing all 5,000 banquet plates in a bucket with no soap."
        ],
        correct: 0,
        correctExplanation: "Full rack loading and shut-off trigger valves maximize washing efficiency and prevent immense water and electricity waste.",
        incorrectExplanation: "Partial rack loading wastes full wash cycle water, chemical detergent, and heating electricity.",
        optionFeedback: [
          "Correct. Only running conveyor dishwashers with full dish racks and using trigger-operated pre-rinse spray valves.",
          "Running single items through commercial dishwashers wastes dozens of liters per cycle.",
          "Leaving open hoses running wastes thousands of liters of hot treated water.",
          "Inadequate washing without sanitizing agents breaches food safety standards."
        ]
      },
      {
        order: 6,
        question: "What is the primary indicator of a major hidden underground pipe leak on a hotel property?",
        options: [
          "Unexplained surges in main water meter readings during 2:00 AM – 4:00 AM when hotel operational water use is at baseline zero.",
          "A sudden drop in restaurant dessert sales.",
          "The hotel wifi speed becomes slightly faster.",
          "Guest room televisions turn off automatically."
        ],
        correct: 0,
        correctExplanation: "Overnight baseline minimum flow monitoring reveals continuous underground leaks when human consumption is minimal.",
        incorrectExplanation: "Underground pipe bursts are detected through 2:00 AM night flow meter analysis and localized pressure drops.",
        optionFeedback: [
          "Correct. Unexplained surges in main water meter readings during 2:00 AM – 4:00 AM when hotel operational water use is at baseline zero.",
          "Food and beverage sales are unrelated to underground plumbing integrity.",
          "Network telemetry is completely separate from hydraulic pipe systems.",
          "Electrical entertainment circuits operate independently of water mains."
        ]
      },
      {
        order: 7,
        question: "How should housekeeping room attendants handle guest bathroom water conservation during morning room cleaning?",
        options: [
          "Turn off taps immediately when scrubbing basins, use microfiber cloths with trigger sprays, and report any leaking showerheads promptly.",
          "Let the shower run on hot full blast for 20 minutes to create steam while making the bed.",
          "Flush the toilet six times in a row for fun.",
          "Pour dirty cleaning bucket water into the guest swimming pool."
        ],
        correct: 0,
        correctExplanation: "Disciplined cleaning habits and instant leak logging conserve water while maintaining immaculate guest room standards.",
        incorrectExplanation: "Leaving showers running empty wastes hundreds of liters of heated potable water and creates unnecessary humidity.",
        optionFeedback: [
          "Correct. Turn off taps immediately when scrubbing basins, use microfiber cloths with trigger sprays, and report any leaking showerheads promptly.",
          "Running showers empty wastes immense volumes of hot water and creates wall condensation.",
          "Repeated unnecessary flushes waste clean municipal water.",
          "Contaminating guest swimming pools with chemical wash water is dangerous and strictly prohibited."
        ]
      }
    ]
  },

  // =========================================================================
  // 11. ELH-34: Waste Minimisation & Single-Use Reduction in Hospitality (D2 Working Knowledge)
  // =========================================================================
  {
    courseCode: "ELH-34",
    title: "Waste Minimisation & Single-Use Reduction in Hospitality",
    slug: "waste-minimisation-and-single-use-reduction-in-hospitality",
    description: "Phase out single-use plastics, prevent buffet and kitchen overproduction, segregate waste streams cleanly, and track diverted materials.",
    fullDescription: "Hospitality operations generate diverse waste streams from guest room packaging and miniature amenities to banquet food trim, glass bottles, and service disposables. This course trains hotel teams on eliminating single-use plastics, managing food waste at prep and service stages, avoiding recycling contamination, and measuring material diversion in Mauritian hotels.",
    categoryId: 2,
    durationMinutes: 20,
    priceUsd: "1400.00",
    level: "Working Knowledge",
    isFeatured: true,
    thumbnailUrl: "/images/courses/waste-minimisation.jpg",
    intendedRoles: ["F&B Staff", "Housekeeping Attendants", "Stewarding Leads", "Purchasing Officers"],
    learningObjectives: [
      "Identify the top single-use plastic items in hotel operations and evaluate durable, reusable alternatives.",
      "Execute kitchen prep trim optimization and buffet replenishment pacing to minimize organic waste.",
      "Implement source-segregation across 4 clean waste streams: Organics, Clean Glass, Dry Recyclables, and Residual.",
      "Communicate plastic-free and zero-waste initiatives to guests in a manner that enhances the luxury experience.",
      "Complete 8 scenario-based evaluation questions analyzing hospitality waste reduction trade-offs.",
      "Eliminate or replace one single-use plastic item in your immediate operational department."
    ],
    includesCertificate: true,
    passingScore: 80,
    completionMessage: "Congratulations! You have completed Waste Minimisation & Single-Use Reduction in Hospitality.",
    badgeName: "Zero-Waste Hospitality Leader",
    badgeDescription: "Awarded for demonstrating working knowledge of single-use elimination, food waste prevention, and circular sorting in hotels.",
    badgeSlug: "zero-waste-hospitality-leader",
    relevanceLayer: "sector_specific",
    primaryClassification: "SECTOR_SPECIFIC",
    isEssentialUniversal: false,
    primaryCompetency: "COMP_CIRCULARITY",
    secondaryCompetencies: ["COMP_SUSTAINABILITY_FOUNDATIONS", "COMP_SUPPLY_CHAIN"],
    applicableSectors: ["SEC_HOSPITALITY", "SEC_TOURISM"],
    applicableDepartments: ["DEP_FOOD_BEVERAGE", "DEP_HOUSEKEEPING", "DEP_STEWARDING"],
    applicableJobFamilies: ["JF_FRONTLINE", "JF_SUPERVISOR"],
    applicableSeniorityTiers: ["SEN_INDIVIDUAL", "SEN_SUPERVISOR"],
    productionPriority: "p0",
    learningPathPurpose: "Transform hotel material flows by eliminating single-use plastics, cutting food surplus, and maximizing clean recycling.",
    lessons: [
      {
        order: 0,
        title: "The Single-Use Challenge in Island Hospitality",
        minutes: 4,
        content: "Understanding plastic pollution, landfill limits, and the luxury opportunity of reuse.",
        blocks: [
          { id: "elh34-h1", type: "heading", position: 1, headingText: "Luxury Without Waste" },
          { id: "elh34-t1", type: "short_text", position: 2, bodyText: "Single-use plastics—straws, water bottles, miniature bathroom amenities, cling film, cocktail stirrers—create millions of discarded plastic pieces across Mauritian resorts every year. Discarded plastics pollute coastal lagoons, harm marine wildlife, and overwhelm the Mare Chicose landfill." },
          { id: "elh34-k1", type: "key_message", position: 3, headingText: "The Modern Luxury Standard", bodyText: "Discerning global travelers increasingly associate luxury with authentic, sustainable, plastic-free experiences: glass water carafes, ceramic refillable dispensers, and organic farm-to-table cuisine." }
        ]
      },
      {
        order: 1,
        title: "Four Clean Sorting Streams in Operations",
        minutes: 4,
        content: "Establishing source-segregation for high recycling diversion.",
        blocks: [
          { id: "elh34-h2", type: "heading", position: 1, headingText: "Source-Segregation Streams" },
          { id: "elh34-t2", type: "short_text", position: 2, bodyText: "1. Organics (Kitchen Prep & Plate Waste): Sent to on-site aerobic composting or local pig farm feeds.\n2. Clean Glass Bottles & Jars: Collected for local beverage bottle deposit-return and cullet recycling.\n3. Dry Recyclables (Clean Cardboard, Paper, Aluminum Cans, PET Plastic): Baled for industrial recycling.\n4. Residual Waste: Non-recyclable general waste directed to municipal landfill." }
        ]
      },
      {
        order: 2,
        title: "Decision Scenario: High-Volume Wedding Bar Single-Use Cups",
        minutes: 4,
        content: "Navigating glassware breakages, safety, and single-use alternatives.",
        blocks: [
          { id: "elh34-h3", type: "heading", position: 1, headingText: "Scenario: Poolside Wedding Event" },
          {
            id: "elh34-sc1",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Poolside Beverage Service Trade-off",
            situation: "A banquet event manager organizing a 250-guest beachside pool party wants to avoid glass breakage near the swimming pool. The assistant proposes ordering 2,000 disposable thin plastic cocktail cups.",
            prompt: "What is the sustainable, luxury-compliant operational alternative?",
            options: [
              { id: "opt1", text: "Utilize reusable, shatter-proof premium polycarbonate/tritan glassware that is collected, washed in commercial bar dishwashers, and reused hundreds of times.", isCorrect: true, feedback: "Correct. High-quality reusable polycarbonate drinkware guarantees poolside safety, preserves luxury cocktail presentation, and produces zero plastic waste." },
              { id: "opt2", text: "Order 2,000 disposable plastic cups and throw them all into the ocean at the end of the party.", isCorrect: false, feedback: "Dumping plastic cups into the ocean is illegal, causes severe marine toxicity, and destroys hotel reputation." },
              { id: "opt3", text: "Ban all beverages and serve only dry biscuits to wedding guests.", isCorrect: false, feedback: "Depriving guests of event services violates commercial banquet contracts." }
            ]
          }
        ]
      },
      {
        order: 3,
        title: "Decision Scenario: Stewarding Food Waste Sorting During Peak Rush",
        minutes: 4,
        content: "Preventing cross-contamination of food waste and recyclables during dishwashing breakdown.",
        blocks: [
          { id: "elh34-h4", type: "heading", position: 1, headingText: "Scenario: Stewarding Dishwashing Breakdown" },
          {
            id: "elh34-sc2",
            type: "interactive_scenario",
            position: 2,
            scenarioTitle: "Managing Dish Return Sorting Under Pressure",
            situation: "During Sunday brunch service, 300 dirty plate trays arrive at the stewarding wash area simultaneously. A new steward starts dumping paper napkins, plastic cocktail picks, and leftover food waste into the organic composting bin to clear the counter quickly.",
            prompt: "How must the stewarding supervisor intervene?",
            options: [
              { id: "opt1", text: "Stop the line briefly, realign the scrape-station bins so food waste is scraped into organics while picks and napkins go into residual, and guide the steward on contamination rules.", isCorrect: true, feedback: "Correct. Contaminating organic compost with plastics and synthetic picks ruins the entire batch of fertilizer, sending it to landfill." },
              { id: "opt2", text: "Encourage the steward to keep throwing plastic picks into the organic bin to maintain speed.", isCorrect: false, feedback: "Plastic contamination destroys organic compost quality and damages composting machinery." },
              { id: "opt3", text: "Throw all dirty ceramic plates into the trash dumpster to avoid washing them.", isCorrect: false, feedback: "Discarding hotel assets causes immense financial loss and extreme material waste." }
            ]
          }
        ]
      },
      {
        order: 4,
        title: "Workplace Action: Single-Use Elimination Audit",
        minutes: 4,
        content: "Identifying and phasing out one disposable plastic item in your team.",
        blocks: [
          { id: "elh34-h5", type: "heading", position: 1, headingText: "Take Action Against Single-Use" },
          { id: "elh34-t3", type: "short_text", position: 2, bodyText: "Select one practical single-use elimination target for your department:" },
          {
            id: "elh34-wa1",
            type: "workplace_action",
            position: 3,
            actionOptions: [
              "Replace single-use plastic cocktail straws and stirrers with certified biodegradable reed or metal reusable options upon request only.",
              "Transition from plastic portion butter/jam tubs to bulk ceramic ramekin presentation in breakfast service.",
              "Replace single-use plastic laundry delivery bags with reusable cotton garment covers."
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        order: 0,
        question: "Why are single-use plastic straws, stirrers, and miniature bottles targeted for elimination in sustainable resort standards?",
        options: [
          "They are used for only a few minutes, rarely recycled locally, persist in nature for centuries, and threaten marine life in lagoons.",
          "They are too heavy for planes to transport.",
          "They make cocktails taste salty.",
          "They absorb all sunlight on the island."
        ],
        correct: 0,
        correctExplanation: "Short-lived disposables generate massive microplastic pollution and persistent marine ecosystem damage.",
        incorrectExplanation: "Single-use items have minimal utility compared to the centuries of environmental degradation they cause.",
        optionFeedback: [
          "Correct. They are used for only a few minutes, rarely recycled locally, persist in nature for centuries, and threaten marine life in lagoons.",
          "Single-use plastics are lightweight; the issue is massive persistent pollution volume.",
          "Plastic stirrers do not alter beverage salinity.",
          "Plastics do not alter solar radiation physics on island landmasses."
        ]
      },
      {
        order: 1,
        question: "What is the primary benefit of replacing miniature bathroom amenity bottles with tamper-proof wall dispensers?",
        options: [
          "It eliminates tens of thousands of plastic bottles per hotel annually while reducing chemical product waste and procurement cost.",
          "It makes hotel bathrooms smaller.",
          "It forces guests to shower with cold water.",
          "It prevents guests from using soap."
        ],
        correct: 0,
        correctExplanation: "Bulk refillable dispensers eliminate millions of miniature single-use plastic containers while delivering premium guest amenities.",
        incorrectExplanation: "Wall dispensers maintain luxury standards, reduce plastic tonnage by up to 90%, and prevent half-used soap discard.",
        optionFeedback: [
          "Correct. It eliminates tens of thousands of plastic bottles per hotel annually while reducing chemical product waste and procurement cost.",
          "Wall dispensers occupy minimal wall space and declutter vanity countertops.",
          "Dispenser format has no effect on water temperature plumbing.",
          "Dispensers provide convenient, continuous access to premium body wash and shampoo."
        ]
      },
      {
        order: 2,
        question: "Why must organic food waste (prep trim, buffet surplus, plate scrapings) be segregated cleanly from plastics and glass?",
        options: [
          "Clean organic waste can be converted into rich soil compost or animal feed, but plastic/glass contamination makes it toxic and unusable.",
          "Organic waste can only be stored in glass jars.",
          "Plastics make organic compost grow five times faster.",
          "Organic waste dissolves all glass bottles on contact."
        ],
        correct: 0,
        correctExplanation: "Clean organic waste produces valuable agricultural compost; plastic and glass contamination ruins compost batches and harms livestock.",
        incorrectExplanation: "Source segregation keeps organics pure for composting and recyclables clean for industrial processing.",
        optionFeedback: [
          "Correct. Clean organic waste can be converted into rich soil compost or animal feed, but plastic/glass contamination makes it toxic and unusable.",
          "Organic waste is collected in dedicated compost bins, not decorative jars.",
          "Synthetic plastics do not biodegrade and ruin soil fertility.",
          "Organic food waste has no chemical ability to dissolve solid silica glass."
        ]
      },
      {
        order: 3,
        question: "How can resort food and beverage teams prevent plate waste in guest dining outlets?",
        options: [
          "Offer flexible portion sizes (e.g., half-portions, sharing platters) and guide guests on dish volumes during ordering.",
          "Serve enormous 5-kilogram portions to every guest automatically.",
          "Prohibit guests from leaving the dining table until all food is swallowed.",
          "Remove all food from the resort menu."
        ],
        correct: 0,
        correctExplanation: "Portion flexibility and thoughtful menu engineering give guests choice while dramatically curbing plate scrapings.",
        incorrectExplanation: "Over-sized default portions force guests to leave unconsumed food that must be discarded.",
        optionFeedback: [
          "Correct. Offer flexible portion sizes (e.g., half-portions, sharing platters) and guide guests on dish volumes during ordering.",
          "Excessive portion sizes directly generate heavy plate waste discard.",
          "Coercing guests violates hospitality dignity and service excellence.",
          "Hotels must serve delicious, satisfying cuisine with disciplined portion sizing."
        ]
      },
      {
        order: 4,
        question: "When delivering clean guest laundry or dry-cleaned garments, what is the sustainable alternative to single-use thin plastic garment bags?",
        options: [
          "Reusable breathable cotton or canvas garment covers that are collected and washed after use.",
          "Wrapping garments in three layers of aluminum foil.",
          "Dropping clean suits onto the wet floor in the hallway.",
          "Burning garments after wearing them once."
        ],
        correct: 0,
        correctExplanation: "Durable fabric garment bags protect clean clothes during delivery, look elegant, and can be laundered and reused hundreds of times.",
        incorrectExplanation: "Reusable fabric covers eliminate thousands of single-use polythene bags without compromising garment cleanliness.",
        optionFeedback: [
          "Correct. Reusable breathable cotton or canvas garment covers that are collected and washed after use.",
          "Aluminum foil is resource-intensive and unsuitable for garment care.",
          "Soiling clean clothes breaches basic laundry delivery standards.",
          "Destroying clothing is absurd and wasteful."
        ]
      },
      {
        order: 5,
        question: "Why is glass bottle deposit-return and recycling highly effective in Mauritius?",
        options: [
          "Glass bottles can be sanitized and refilled up to 30+ times, or melted infinitely into new bottles without quality loss.",
          "Glass is made of plastic and dissolves in rainwater.",
          "Glass bottles can only be used once before turning into sand.",
          "Glass has no recycling value on the island."
        ],
        correct: 0,
        correctExplanation: "Closed-loop glass bottle reuse (returnable beer/soft drink bottles) is a proven, highly circular model with immense energy and material savings.",
        incorrectExplanation: "Glass is 100% recyclable and infinitely reusable, making deposit-return systems extraordinarily effective.",
        optionFeedback: [
          "Correct. Glass bottles can be sanitized and refilled up to 30+ times, or melted infinitely into new bottles without quality loss.",
          "Glass is composed of silica sand and minerals, not synthetic polymers.",
          "Returnable glass bottles withstand decades of washing and refilling cycles.",
          "Glass is a highly valued recyclable material with established local collection infrastructure."
        ]
      },
      {
        order: 6,
        question: "What is the recommended practice for kitchen cling film (PVC wrap) reduction in cold food prep?",
        options: [
          "Utilize reusable airtight gastronorm container lids, silicone stretch covers, and stainless-steel storage pans.",
          "Wrap food containers in 15 layers of plastic wrap to be safe.",
          "Leave all raw food completely uncovered in open warm hallways.",
          "Ban all food storage in the hotel."
        ],
        correct: 0,
        correctExplanation: "Durable clip-lock lids and silicone covers eliminate thousands of meters of single-use PVC plastic film while sealing freshness.",
        incorrectExplanation: "Reusable lids provide airtight, hygienic food protection without generating plastic film waste.",
        optionFeedback: [
          "Correct. Utilize reusable airtight gastronorm container lids, silicone stretch covers, and stainless-steel storage pans.",
          "Excessive plastic wrapping accelerates waste generation without improving food preservation.",
          "Uncovered food violates food hygiene and cross-contamination rules.",
          "Food storage is essential; reusable covers make it sustainable."
        ]
      },
      {
        order: 7,
        question: "How does measuring and tracking monthly waste diversion rates (percentage of total waste diverted from landfill to recycling/composting) benefit the hotel?",
        options: [
          "It provides verifiable ESG performance data, lowers municipal landfill haulage costs, and motivates team pride.",
          "It forces the hotel to increase its municipal waste tax bills.",
          "It proves that the hotel should stop recycling entirely.",
          "It has zero operational or financial benefit."
        ],
        correct: 0,
        correctExplanation: "Measuring diversion proves tangible ROI, reduces waste hauling fees, supports eco-certifications, and drives team engagement.",
        incorrectExplanation: "Tracking metrics turns sustainability into verifiable operational management and highlights continuous savings.",
        optionFeedback: [
          "Correct. It provides verifiable ESG performance data, lowers municipal landfill haulage costs, and motivates team pride.",
          "Higher diversion rates reduce municipal landfill disposal fees.",
          "Tracking proves the environmental and financial value of recycling programs.",
          "Waste measurement provides crucial data for eco-certifications and ESG investor disclosures."
        ]
      }
    ]
  }
];

// Transactional executor for Batch 1 course remediation
export async function ensureBatch1Remediation(): Promise<void> {
  logger.info("Starting Sprint 15.2.3 Batch 1 Controlled Course Remediation (11 Courses)...");

  for (const courseDef of BATCH_1_REMEDIATED_COURSES) {
    const existingCourse = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, courseDef.courseCode))
      .limit(1);

    if (existingCourse.length === 0) {
      logger.warn({ code: courseDef.courseCode }, "Course not found in database. Skipping...");
      continue;
    }

    const courseId = existingCourse[0].id;
    const targetVersion = 2;

    await db.transaction(async (tx) => {
      // 1. Update Course Metadata and set version to 2
      await tx
        .update(coursesTable)
        .set({
          title: courseDef.title,
          slug: courseDef.slug,
          description: courseDef.description,
          fullDescription: courseDef.fullDescription,
          categoryId: courseDef.categoryId,
          durationMinutes: courseDef.durationMinutes,
          priceUsd: courseDef.priceUsd,
          level: courseDef.level,
          isFeatured: courseDef.isFeatured,
          thumbnailUrl: courseDef.thumbnailUrl,
          intendedRoles: courseDef.intendedRoles,
          learningObjectives: courseDef.learningObjectives,
          includesCertificate: courseDef.includesCertificate,
          passingScore: courseDef.passingScore,
          completionMessage: courseDef.completionMessage,
          badgeName: courseDef.badgeName,
          badgeDescription: courseDef.badgeDescription,
          relevanceLayer: courseDef.relevanceLayer,
          primaryClassification: courseDef.primaryClassification,
          isEssentialUniversal: courseDef.isEssentialUniversal,
          primaryCompetency: courseDef.primaryCompetency,
          secondaryCompetencies: courseDef.secondaryCompetencies,
          applicableSectors: courseDef.applicableSectors,
          applicableDepartments: courseDef.applicableDepartments,
          applicableJobFamilies: courseDef.applicableJobFamilies,
          applicableSeniorityTiers: courseDef.applicableSeniorityTiers,
          productionPriority: courseDef.productionPriority,
          learningPathPurpose: courseDef.learningPathPurpose,
          isPublished: true,
          version: targetVersion,
        })
        .where(eq(coursesTable.id, courseId));

      // 2. Re-seed Lessons with rich structured interactive blocks
      await tx.delete(lessonsTable).where(eq(lessonsTable.courseId, courseId));
      for (const l of courseDef.lessons) {
        await tx.insert(lessonsTable).values({
          courseId,
          title: l.title,
          orderIndex: l.order,
          durationMinutes: l.minutes,
          content: l.content,
          contentBlocks: l.blocks,
          isArchived: false,
        });
      }

      // 3. Re-seed Quizzes with complete 8 scenario-based items & option teaching feedback
      await tx.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      await tx.insert(quizQuestionsTable).values(
        courseDef.quiz.map((q) => ({
          courseId,
          question: q.question,
          options: q.options,
          correctOption: q.correct,
          orderIndex: q.order,
          correctExplanation: q.correctExplanation,
          incorrectExplanation: q.incorrectExplanation,
          optionFeedback: q.optionFeedback || q.options.map((_, idx) =>
            idx === q.correct ? q.correctExplanation : q.incorrectExplanation
          ),
          isArchived: false,
        }))
      );

      // 4. Update Badge Definition
      await tx
        .insert(badgeDefinitionsTable)
        .values({
          slug: courseDef.badgeSlug,
          name: courseDef.badgeName,
          description: courseDef.badgeDescription,
          icon: "award",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: courseId,
        })
        .onConflictDoUpdate({
          target: badgeDefinitionsTable.slug,
          set: {
            name: courseDef.badgeName,
            description: courseDef.badgeDescription,
            courseIds: [courseId],
          },
        });
    });

    logger.info({ code: courseDef.courseCode, version: targetVersion }, "Course successfully remediated and bumped to version 2.");
  }

  logger.info("Sprint 15.2.3 Batch 1 remediation successfully completed.");
}

// Immutable forward-only version-safe rollback
export async function executeVersionSafeRollback(
  courseCode: string,
  snapshotContent: {
    title: string;
    description?: string;
    fullDescription?: string;
    lessons: Array<{ title: string; orderIndex: number; durationMinutes: number; content: string; contentBlocks?: any }>;
    quizQuestions: Array<{ question: string; options: string[]; correctOption: number; orderIndex: number; correctExplanation: string; incorrectExplanation: string; optionFeedback?: string[] }>;
  }
): Promise<number> {
  const [existingCourse] = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.courseCode, courseCode))
    .limit(1);

  if (!existingCourse) {
    throw new Error(`Course with code ${courseCode} not found for rollback`);
  }

  const courseId = existingCourse.id;
  const currentVersion = existingCourse.version || 1;
  const nextVersion = currentVersion + 1; // Always increment forward: v2 -> v3

  await db.transaction(async (tx) => {
    // 1. Bump version forward to nextVersion (never decrement)
    await tx
      .update(coursesTable)
      .set({
        version: nextVersion,
        title: snapshotContent.title,
        description: snapshotContent.description || existingCourse.description,
        fullDescription: snapshotContent.fullDescription || existingCourse.fullDescription,
        isPublished: true,
      })
      .where(eq(coursesTable.id, courseId));

    // 2. Restore lessons
    await tx.delete(lessonsTable).where(eq(lessonsTable.courseId, courseId));
    for (const l of snapshotContent.lessons) {
      await tx.insert(lessonsTable).values({
        courseId,
        title: l.title,
        orderIndex: l.orderIndex,
        durationMinutes: l.durationMinutes || 10,
        content: l.content || "",
        contentBlocks: l.contentBlocks || [],
        isArchived: false,
      });
    }

    // 3. Restore quiz questions
    await tx.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
    await tx.insert(quizQuestionsTable).values(
      snapshotContent.quizQuestions.map((q) => ({
        courseId,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        orderIndex: q.orderIndex,
        correctExplanation: q.correctExplanation || "",
        incorrectExplanation: q.incorrectExplanation || "",
        optionFeedback: q.optionFeedback || q.options.map((_, idx) =>
          idx === q.correctOption ? q.correctExplanation : q.incorrectExplanation
        ),
        isArchived: false,
      }))
    );
  });

  logger.info({ code: courseCode, previousVersion: currentVersion, rolledBackToNewVersion: nextVersion }, "Version-safe forward rollback executed successfully.");
  return nextVersion;
}

// Explicit, audited enrollment version migration
export async function migrateEnrollmentVersion(params: {
  enrollmentId: number;
  targetVersion: number;
  resetProgress: boolean;
  operatorUserId?: string;
  reason?: string;
}): Promise<{ success: boolean; previousVersion: number; newVersion: number }> {
  const [enrollment] = await db
    .select()
    .from(enrollmentsTable)
    .where(eq(enrollmentsTable.id, params.enrollmentId))
    .limit(1);

  if (!enrollment) {
    throw new Error(`Enrollment ${params.enrollmentId} not found`);
  }

  const prevVersion = enrollment.enrolledVersion || 1;

  await db.transaction(async (tx) => {
    if (params.resetProgress) {
      await tx
        .delete(lessonProgressTable)
        .where(eq(lessonProgressTable.enrollmentId, params.enrollmentId));
      await tx
        .update(enrollmentsTable)
        .set({
          enrolledVersion: params.targetVersion,
          progressPct: 0,
          status: "active",
          completedAt: null,
          completedVersion: null,
        })
        .where(eq(enrollmentsTable.id, params.enrollmentId));
    } else {
      await tx
        .update(enrollmentsTable)
        .set({
          enrolledVersion: params.targetVersion,
        })
        .where(eq(enrollmentsTable.id, params.enrollmentId));
    }
  });

  logger.info(
    {
      enrollmentId: params.enrollmentId,
      previousVersion: prevVersion,
      newVersion: params.targetVersion,
      resetProgress: params.resetProgress,
      operatorUserId: params.operatorUserId,
      reason: params.reason,
    },
    "Audited enrollment version migration executed successfully."
  );

  return { success: true, previousVersion: prevVersion, newVersion: params.targetVersion };
}
