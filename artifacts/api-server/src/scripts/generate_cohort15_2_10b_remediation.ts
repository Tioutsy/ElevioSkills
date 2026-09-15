import fs from "fs";
import path from "path";

const targetPath = path.resolve(process.cwd(), "src/lib/ensureCohort15_2_10BRemediation.ts");

const content = `import {
  db,
  coursesTable,
  quizQuestionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger.js";
import { SPRINT_15_2_10B_COHORT, SPRINT_15_2_10B_COHORT_COURSE_IDS } from "./courseAssessmentCohort15_2_10B.js";

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

export const COHORT_15_2_10B_DATA: CohortCourseRemediationData[] = [
  // 1. ELH-12 (ID: 12) - Final Sustainability Certification (15 Capstone Questions)
  {
    courseId: 12,
    courseCode: "ELH-12",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "ELH-01 (Sustainability Foundations): Which of the following best describes the core principle of corporate sustainability?",
        options: [
          "Meeting current operational needs without compromising the ability of future generations to meet theirs across environmental, social, and economic pillars",
          "Maximising short-term quarterly profits regardless of environmental externalities or community impact",
          "Focusing exclusively on marketing campaigns and annual CSR photo opportunities",
          "Replacing all operational staff with automated algorithms to cut operational costs"
        ],
        correct: 0,
        correctExplanation: "Corporate sustainability integrates environmental stewardship, social responsibility, and economic durability to ensure long-term viability.",
        incorrectExplanation: "Incorrect. Corporate sustainability balances economic prosperity with environmental and social protection.",
        optionFeedback: [
          "Correct! Sustainable business operations balance economic health, environmental integrity, and social equity.",
          "Incorrect. Short-term profit focus without resource stewardship leads to catastrophic depletion and regulatory risk.",
          "Incorrect. Superficial marketing without genuine operational change constitutes greenwashing.",
          "Incorrect. Automation alone does not address resource conservation or community stewardship."
        ],
        competencyArea: "sustainability_foundations",
        sourceCourseId: 1
      },
      {
        order: 2,
        question: "ELH-02 (Waste Sorting): In a Mauritian workplace, why must employees follow site-specific bin labels rather than assuming a universal colour code?",
        options: [
          "Different private waste contractors have distinct collection agreements, accepted streams, and sorting rules",
          "Mauritian workplaces do not actually recycle any collected waste materials",
          "All recycling trucks in Mauritius accept mixed unsorted garbage without penalty",
          "Bin colours are determined solely by interior decorating fashion trends"
        ],
        correct: 0,
        correctExplanation: "Commercial waste sorting rules depend on your employer's contracted waste service provider. Always follow local site instructions.",
        incorrectExplanation: "Incorrect. Waste collection arrangements and accepted commodities vary by contracted collector.",
        optionFeedback: [
          "Correct! Contracted recyclers define specific acceptance criteria; checking on-site bin labels prevents batch contamination.",
          "Incorrect. Commercial recyclers in Mauritius process paper, cardboard, plastics, and metals when clean.",
          "Incorrect. Unsorted mixed loads are rejected and redirected to Mare Chicose landfill.",
          "Incorrect. Bin labels represent functional segregation streams, not decorative choices."
        ],
        competencyArea: "waste_sorting",
        sourceCourseId: 2
      },
      {
        order: 3,
        question: "ELH-03 (Energy Efficiency): What is the most effective operational practice for reducing HVAC energy consumption in tropical offices?",
        options: [
          "Setting thermostats to 24°C–25°C, ensuring windows/doors remain closed, and servicing filters regularly",
          "Setting air conditioning to 16°C with office windows open to maximize outdoor airflow",
          "Running AC units continuously overnight and on weekends to keep walls cool",
          "Turning off all ventilation fans and sealing office rooms permanently"
        ],
        correct: 0,
        correctExplanation: "Maintaining thermostats at 24°C–25°C with sealed envelopes optimizes compressor efficiency while maintaining thermal comfort.",
        incorrectExplanation: "Incorrect. Setting AC to 16°C with open windows causes continuous compressor overload.",
        optionFeedback: [
          "Correct! Thermostats set at 24°C–25°C reduce cooling load by up to 15% without sacrificing comfort.",
          "Incorrect. Open windows allow hot humid ambient air inside, causing extreme energy waste and condensation.",
          "Incorrect. Cooling unoccupied buildings during nights and weekends wastes substantial kilowatt-hours.",
          "Incorrect. Sealing rooms without fresh air ventilation violates indoor air quality and health standards."
        ],
        competencyArea: "energy_efficiency",
        sourceCourseId: 3
      },
      {
        order: 4,
        question: "ELH-04 (Water Conservation): A facility manager identifies a leaking toilet cistern losing 20 litres per hour. What is the immediate operational response?",
        options: [
          "Log the maintenance ticket immediately, isolate the stop valve if feasible, and replace the faulty flapper valve",
          "Wait until the annual facility overhaul before inspecting the cistern",
          "Pour scented disinfectant into the cistern to mask the water sound",
          "Increase building water pressure to clear any mineral obstructions"
        ],
        correct: 0,
        correctExplanation: "Prompt repair of leaking fixtures prevents significant freshwater waste and reduces commercial utility bills.",
        incorrectExplanation: "Incorrect. Ignoring leaks wastes hundreds of cubic metres of municipal water annually.",
        optionFeedback: [
          "Correct! Immediate isolation and flapper replacement stops continuous freshwater loss.",
          "Incorrect. Delaying repairs allows over 175,000 litres of clean water to be wasted in a single year.",
          "Incorrect. Disinfectants do not fix mechanical valve seals or stop water loss.",
          "Incorrect. Increasing water pressure exacerbates leaks and stresses plumbing joints."
        ],
        competencyArea: "water_conservation",
        sourceCourseId: 4
      },
      {
        order: 5,
        question: "ELH-05 (Sustainable Procurement): When evaluating supplier proposals, why should procurement teams evaluate Total Cost of Ownership (TCO)?",
        options: [
          "TCO accounts for acquisition price plus operating energy, maintenance, consumable supplies, and end-of-life disposal costs",
          "TCO considers only the lowest initial invoice price regardless of lifespan or energy consumption",
          "TCO is an optional marketing metric used solely for corporate press releases",
          "TCO allows buyers to avoid checking supplier compliance with local labour laws"
        ],
        correct: 0,
        correctExplanation: "Total Cost of Ownership reveals the complete financial and environmental impact of assets across their entire lifecycle.",
        incorrectExplanation: "Incorrect. Lowest upfront purchase price often masks high energy consumption and frequent replacement costs.",
        optionFeedback: [
          "Correct! Evaluating whole-life costs ensures durable, energy-efficient equipment delivers superior financial and environmental returns.",
          "Incorrect. Lowest initial price often leads to expensive breakdowns and high power consumption.",
          "Incorrect. TCO is a rigorous financial and operational assessment methodology.",
          "Incorrect. Ethical and statutory compliance checks remain mandatory regardless of cost modeling."
        ],
        competencyArea: "sustainable_procurement",
        sourceCourseId: 5
      },
      {
        order: 6,
        question: "ELH-06 (Green Office): How can workplace teams reduce digital carbon footprints and cloud storage bloat?",
        options: [
          "Implement email retention policies, clean up redundant cloud file duplicates, and avoid unnecessary 'Reply All' attachments",
          "Send 50MB PDF brochures to all staff members every morning",
          "Store identical copies of large video files on five separate shared drives",
          "Print out all incoming digital emails and delete the computer inbox"
        ],
        correct: 0,
        correctExplanation: "Pruning redundant cloud storage and streamlining email transmission cuts data centre energy consumption and costs.",
        incorrectExplanation: "Incorrect. Excessive email broadcasting and redundant storage increase data centre server loads.",
        optionFeedback: [
          "Correct! Digital hygiene reduces cloud data centre processing energy and backup overhead.",
          "Incorrect. Broadcasting massive attachments wastes bandwidth, storage, and server energy.",
          "Incorrect. Duplicate large media files multiply cloud storage electricity consumption.",
          "Incorrect. Printing digital messages consumes paper, toner, and physical storage space."
        ],
        competencyArea: "green_office",
        sourceCourseId: 6
      },
      {
        order: 7,
        question: "ELH-07 (Carbon Footprint): What differentiates Scope 1 and Scope 2 greenhouse gas emissions under the GHG Protocol?",
        options: [
          "Scope 1 emissions arise from direct fuel combustion in owned assets (e.g. company vehicles); Scope 2 covers indirect emissions from purchased electricity",
          "Scope 1 covers air travel; Scope 2 covers employee commuting",
          "Scope 1 emissions are optional to report; Scope 2 emissions are illegal",
          "Scope 1 comes from solar panels; Scope 2 comes from composting food waste"
        ],
        correct: 0,
        correctExplanation: "Scope 1 covers direct fuel combustion in owned assets; Scope 2 covers indirect emissions from generation of purchased electricity.",
        incorrectExplanation: "Incorrect. Scope 1 is direct owned combustion; Scope 2 is purchased electricity and cooling.",
        optionFeedback: [
          "Correct! Scope 1 represents direct fuel combustion; Scope 2 represents consumed grid electricity.",
          "Incorrect. Air travel and commuting fall under Scope 3 value-chain emissions.",
          "Incorrect. Both Scope 1 and Scope 2 are core mandatory categories in standard carbon accounting.",
          "Incorrect. Solar panels and composting do not define the Scope 1/2 distinction."
        ],
        competencyArea: "carbon_footprint",
        sourceCourseId: 7
      },
      {
        order: 8,
        question: "ELH-08 (Biodiversity): How can commercial facilities protect local biodiversity and soil quality in Mauritius?",
        options: [
          "Plant native endemic landscaping, eliminate chemical pesticide runoff into storm drains, and shield exterior lighting",
          "Pour unused solvent paints into perimeter garden soil to prevent sewer disposal",
          "Replace all grass and trees with synthetic plastic turf to avoid mowing",
          "Install high-intensity unshielded searchlights pointing into neighbouring nature reserves"
        ],
        correct: 0,
        correctExplanation: "Endemic flora, non-toxic maintenance, and dark-sky lighting protect local pollinator and coastal ecosystems.",
        incorrectExplanation: "Incorrect. Chemical dumping and synthetic turf destroy native biodiversity.",
        optionFeedback: [
          "Correct! Native plantings support local fauna while shielded lighting prevents disorienting nocturnal pollinators.",
          "Incorrect. Pouring toxic solvents into soil poisons groundwater and destroys soil microbiomes.",
          "Incorrect. Artificial turf eliminates habitat, heats up microclimates, and sheds microplastics.",
          "Incorrect. Unshielded night lighting disrupts wildlife navigation, mating, and feeding patterns."
        ],
        competencyArea: "biodiversity",
        sourceCourseId: 8
      },
      {
        order: 9,
        question: "ELH-09 (ESG Basics): What is the most credible response when an enterprise tender requests verified ESG metrics that your company is currently developing?",
        options: [
          "Provide audited historical data, transparently declare current baseline gaps, and outline documented remediation roadmap milestones",
          "Fabricate estimated metrics to appear fully certified and complete",
          "Submit obsolete documents from a former parent company without disclosing dates",
          "Refuse to participate and delete all utility consumption logs"
        ],
        correct: 0,
        correctExplanation: "Honest disclosure of validated baselines with clear improvement milestones demonstrates credible governance and avoids greenwashing.",
        incorrectExplanation: "Incorrect. Fabricating metrics breaches procurement ethics and risks immediate disqualification.",
        optionFeedback: [
          "Correct! Transparent baseline disclosure coupled with structured action plans builds long-term commercial trust.",
          "Incorrect. Inventing numbers violates compliance covenants and leads to contract termination if audited.",
          "Incorrect. Misrepresenting historical parent company data constitutes tender fraud.",
          "Incorrect. Deleting consumption data undermines compliance and prevents tracking improvement."
        ],
        competencyArea: "esg_basics",
        sourceCourseId: 9
      },
      {
        order: 10,
        question: "ELH-10 (Compliance): What is the first priority when an employee discovers an unlabelled leaking chemical container in a logistics yard?",
        options: [
          "Secure the perimeter safely, check SDS emergency protocols, deploy absorbent booms before storm drain entry, and notify the safety officer",
          "Hose down the spill into the municipal storm drain to wash it away quickly",
          "Ignore the container because it belongs to an external transport contractor",
          "Tip the drum upright with bare hands without wearing chemical-resistant gloves"
        ],
        correct: 0,
        correctExplanation: "Containing runoff before storm drain entry and following Safety Data Sheet protocols prevents environmental poisoning and injury.",
        incorrectExplanation: "Incorrect. Hosing chemicals into storm drains causes environmental contamination and statutory penalties.",
        optionFeedback: [
          "Correct! Securing the area, deploying spill containment, and escalating prevents waterway pollution and ensures worker safety.",
          "Incorrect. Flushing chemicals into storm drains pollutes coastal lagoons and violates national environmental legislation.",
          "Incorrect. Uncontained spills on company premises pose immediate liability regardless of ownership.",
          "Incorrect. Handling unknown chemicals without PPE causes severe chemical burns and inhalation injuries."
        ],
        competencyArea: "environmental_compliance",
        sourceCourseId: 10
      },
      {
        order: 11,
        question: "ELH-11 (Circular Economy): According to the Circular Value Hierarchy (9R framework), which strategy should be prioritized before recycling broken office furniture?",
        options: [
          "Refurbish, repair, or remanufacture the furniture to preserve embedded material value and extend its useful lifespan",
          "Crush the furniture and send it straight to landfill",
          "Incinerate the furniture in an open backyard bonfire",
          "Export the broken furniture to another country as scrap waste"
        ],
        correct: 0,
        correctExplanation: "Repair and refurbishment maintain the highest value and lowest embodied energy compared to downcycling or disposal.",
        incorrectExplanation: "Incorrect. Repair and refurbishment precede recycling in the circular economy hierarchy.",
        optionFeedback: [
          "Correct! Repair and reuse retain original manufacturing value and avoid the high energy required for recycling.",
          "Incorrect. Landfilling destroys 100% of embodied resource value.",
          "Incorrect. Burning furniture releases toxic emissions from adhesives and finishes.",
          "Incorrect. Exporting waste shifts environmental burdens and wastes valuable local materials."
        ],
        competencyArea: "circular_economy",
        sourceCourseId: 11
      },
      {
        order: 12,
        question: "Cross-Domain (Energy & Water): During a facility audit, you discover an HVAC chiller running with scaled condenser tubes and leaking cooling tower bleed-off. What is the optimal integrated solution?",
        options: [
          "Descale condenser tubes to restore heat exchange efficiency, repair the bleed-off valve, and monitor water conductivity to optimize cooling cycles",
          "Increase chiller electrical power to compensate for reduced heat transfer without fixing the scale",
          "Turn off cooling tower water completely while keeping chillers running at maximum load",
          "Bypass the automated water treatment system and add unmetered chemical biocides"
        ],
        correct: 0,
        correctExplanation: "Descaling restores thermal efficiency, cutting kilowatt-hour consumption, while fixing bleed-off valves preserves freshwater.",
        incorrectExplanation: "Incorrect. Running scaled chillers wastes massive electrical power and risks catastrophic compressor failure.",
        optionFeedback: [
          "Correct! Integrated maintenance restores thermal efficiency (cutting power) and stops freshwater waste simultaneously.",
          "Incorrect. Overdriving scaled chillers drastically increases electricity bills and causes motor burnouts.",
          "Incorrect. Starving cooling towers of water causes immediate chiller shutdown on high-pressure alarms.",
          "Incorrect. Unmetered biocides corrode pipework and breach effluent discharge regulations."
        ],
        competencyArea: "integrated_operations",
        sourceCourseId: 3
      },
      {
        order: 13,
        question: "Cross-Domain (Procurement & IT): An enterprise plans to replace 100 desktop monitors. How should procurement integrate circular economy and energy criteria into the RFP?",
        options: [
          "Specify Energy Star / EPEAT Gold efficiency ratings, require minimum 5-year supplier warranty with take-back recycling, and evaluate TCO",
          "Purchase the cheapest unbranded monitors available online with no warranty or take-back provisions",
          "Order monitors with the largest external packaging boxes to protect against shipping dents",
          "Require monitors to be discarded in general waste skips upon the first sign of malfunction"
        ],
        correct: 0,
        correctExplanation: "EPEAT/Energy Star certifications ensure energy efficiency, while take-back clauses guarantee circular end-of-life recovery.",
        incorrectExplanation: "Incorrect. Low-cost uncertified monitors carry high failure rates, poor efficiency, and no recycling pathways.",
        optionFeedback: [
          "Correct! Certified energy efficiency reduces daily operating costs, while take-back covenants prevent e-waste.",
          "Incorrect. Cheap unbranded displays consume excess energy and create hazardous electronic waste.",
          "Incorrect. Bulky packaging increases freight emissions and cardboard disposal costs.",
          "Incorrect. General waste disposal of electronics violates hazardous waste rules and causes heavy metal pollution."
        ],
        competencyArea: "sustainable_procurement",
        sourceCourseId: 5
      },
      {
        order: 14,
        question: "Cross-Domain (ESG & Compliance): An internal audit reveals an unsigned hazardous waste manifest and an uncalibrated water effluent pH sensor. What corrective action plan is required?",
        options: [
          "Obtain certified duplicate manifest receipts from the licensed waste hauler, calibrate the pH sensor against standard buffers, and log the incident in the audit register",
          "Falsify technician signatures on the missing manifest and invent fictitious pH readings",
          "Destroy the effluent sensor to avoid recording non-compliant discharge events",
          "Dismiss the finding because environmental audits are advisory and carry no legal liability"
        ],
        correct: 0,
        correctExplanation: "Securing verified contractor chain-of-custody documentation and recalibrating compliance sensors ensures legal compliance.",
        incorrectExplanation: "Incorrect. Falsifying compliance documents constitutes criminal fraud under environmental protection laws.",
        optionFeedback: [
          "Correct! Validating chain-of-custody and recalibrating sensors establishes verifiable compliance and robust ESG governance.",
          "Incorrect. Forging signatures and falsifying environmental readings leads to regulatory prosecution and license revocation.",
          "Incorrect. Tampering with monitoring equipment invites severe statutory penalties and immediate facility shutdown.",
          "Incorrect. Environmental compliance records are legally binding documents reviewed by regulatory inspectors."
        ],
        competencyArea: "environmental_compliance",
        sourceCourseId: 10
      },
      {
        order: 15,
        question: "Visual Capstone (Integrated Workplace Inspection): When inspecting a facility loading bay, what primary environmental hazard requires immediate escalation?",
        options: [
          "An unlabelled, dented chemical drum stored outdoors on bare pavement adjacent to an unprotected stormwater drainage inlet",
          "A wooden delivery pallet stacked neatly against a designated dry warehouse wall",
          "A forklift operator wearing high-visibility reflective clothing and safety boots",
          "A clearly marked rainwater harvesting downpipe connected to a sealed storage tank"
        ],
        correct: 0,
        correctExplanation: "Unlabelled chemical containers stored near stormwater drains present severe chemical runoff and contamination risks requiring immediate spill bunding.",
        incorrectExplanation: "Incorrect. Chemical drums stored outdoors near storm drains without secondary containment pose severe pollution risks.",
        optionFeedback: [
          "Correct! Uncontained chemical storage adjacent to drainage inlets is a major compliance violation risking direct lagoon contamination.",
          "Incorrect. Neatly stacked dry pallets in designated storage areas represent orderly warehouse management.",
          "Incorrect. PPE compliance is a positive workplace safety standard.",
          "Incorrect. Rainwater harvesting tanks are sustainable water-conservation infrastructure."
        ],
        competencyArea: "integrated_operations",
        sourceCourseId: 10
      }
    ]
  },

  // 2. ELH-13 (ID: 13) - Sustainability Action Planning (10 Questions)
  {
    courseId: 13,
    courseCode: "ELH-13",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Baseline Assessment): A company wants to build its first Sustainability Action Plan. What is the essential first step before setting reduction targets?",
        options: [
          "Conduct a baseline audit of existing energy, water, waste, and material consumption to establish empirical starting metrics",
          "Publish aggressive net-zero commitments on social media without analyzing current utility bills",
          "Purchase expensive carbon credits to offset unmeasured emissions immediately",
          "Appoint an external spokesperson to handle media inquiries while delaying operational reviews"
        ],
        correct: 0,
        correctExplanation: "Establishing accurate consumption baselines provides the empirical data required to set realistic targets and measure ROI.",
        incorrectExplanation: "Incorrect. Setting targets without baseline data leads to unrealistic goals or greenwashing accusations.",
        optionFeedback: [
          "Correct! Accurate baseline data provides the foundational reference point for measuring progress and justifying investments.",
          "Incorrect. Public commitments without verified baselines lead to failed targets and reputational damage.",
          "Incorrect. Offsetting unmeasured emissions is financially wasteful and does not reduce operational waste.",
          "Incorrect. Action planning requires internal operational engagement, not external PR spin."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (SMART Goal Setting): Which of the following represents a properly formulated SMART sustainability target for an office building?",
        options: [
          "Reduce total grid electricity consumption by 15% across all facility floors within 12 months using LED upgrades and thermostat scheduling",
          "Make our company as green as possible whenever staff feel like participating",
          "Eliminate all carbon emissions permanently by the end of this week with zero budget",
          "Encourage everyone to think about nature during morning coffee breaks"
        ],
        correct: 0,
        correctExplanation: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound.",
        incorrectExplanation: "Incorrect. Vague aspirations lack measurability, assigned accountability, and deadlines.",
        optionFeedback: [
          "Correct! The target defines a specific metric (15%), clear scope (all floors), defined deadline (12 months), and explicit mechanisms.",
          "Incorrect. 'As green as possible' lacks specific metrics, deadlines, or measurable indicators.",
          "Incorrect. Zero emissions in one week with no budget is unachievable and operationally unrealistic.",
          "Incorrect. Thinking about nature is not a measurable operational performance metric."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Stakeholder Engagement): When drafting a company-wide sustainability plan, why must cross-functional departmental leaders be involved during planning?",
        options: [
          "Department heads understand operational realities, resource constraints, and practical feasibility within their workflows",
          "Department heads are required to fund all sustainability initiatives entirely out of their personal salaries",
          "Cross-functional consultation is only necessary if mandated by local police regulations",
          "Involving managers allows executive leadership to avoid reviewing the final sustainability policy"
        ],
        correct: 0,
        correctExplanation: "Engaging department leaders ensures operational alignment, realistic feasibility, and active managerial ownership.",
        incorrectExplanation: "Incorrect. Top-down mandates without department consultation face high operational resistance and failure.",
        optionFeedback: [
          "Correct! Departmental input ensures initiatives align with existing workflows and gain necessary operational buy-in.",
          "Incorrect. Sustainability projects are funded through approved corporate operational or capital budgets.",
          "Incorrect. Stakeholder engagement is an operational best practice, not a police matter.",
          "Incorrect. Executive leadership retains ultimate governance and oversight responsibility."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Prioritization Matrix): A green committee has 15 proposed sustainability ideas. Which framework best helps prioritize projects under limited budget?",
        options: [
          "An Impact vs. Effort Matrix to identify quick wins (high impact, low effort) and strategic capital projects",
          "Selecting whichever idea was submitted by the most vocal employee regardless of cost or impact",
          "Executing all 15 ideas simultaneously without budget allocation until cash runs out",
          "Delaying all initiatives until a full corporate merger takes place"
        ],
        correct: 0,
        correctExplanation: "An Impact vs. Effort matrix categorizes initiatives into quick wins, strategic projects, and low-priority tasks.",
        incorrectExplanation: "Incorrect. Prioritizing by loudest voice or unstructured execution leads to exhausted budgets and minimal impact.",
        optionFeedback: [
          "Correct! Impact vs. Effort matrices enable teams to deliver immediate visible progress while scheduling strategic investments.",
          "Incorrect. Loudest-voice selection ignores financial ROI and carbon abatement effectiveness.",
          "Incorrect. Spreading resources across too many projects simultaneously causes budget exhaustion and incomplete rollouts.",
          "Incorrect. Operational efficiencies should not be deferred indefinitely."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Resource Allocation): How should a sustainability action plan budget be structured to ensure long-term viability?",
        options: [
          "Include capital expenditure (CapEx), operational expenditure (OpEx), training/engagement costs, and expected utility savings payback timelines",
          "Rely entirely on unpaid employee volunteer hours on weekends with zero company funding",
          "Allocate 100% of the budget to external advertising awards and zero to energy-saving equipment",
          "Fund projects through unapproved petty cash withdrawals without finance department sign-off"
        ],
        correct: 0,
        correctExplanation: "Comprehensive budgets account for initial investment, ongoing maintenance, training, and financial payback timelines.",
        incorrectExplanation: "Incorrect. Relying on volunteer hours without capital funding guarantees initiative collapse.",
        optionFeedback: [
          "Correct! Transparent financial modeling with CapEx/OpEx and ROI timelines gains CFO approval and board support.",
          "Incorrect. Sustainable operational changes require dedicated capital, maintenance, and training resources.",
          "Incorrect. Prioritizing awards over equipment efficiency constitutes greenwashing and wastes capital.",
          "Incorrect. Unauthorised petty cash spending violates internal financial governance."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Milestone Tracking): What is the most effective frequency and method for reviewing sustainability action plan progress?",
        options: [
          "Monthly departmental KPI check-ins combined with quarterly executive reviews of verified utility data and milestone delivery",
          "A single meeting once every five years with no interim progress checks",
          "Sending an automated emoji poll to employees without analyzing utility meters or waste data",
          "Reviewing progress only after receiving a formal pollution fine from government authorities"
        ],
        correct: 0,
        correctExplanation: "Regular monthly check-ins and quarterly executive reviews allow early detection of variances and timely corrective action.",
        incorrectExplanation: "Incorrect. Infrequent reviews prevent teams from correcting off-track initiatives before deadlines pass.",
        optionFeedback: [
          "Correct! Structured monthly and quarterly reviews maintain momentum, track variances, and ensure accountability.",
          "Incorrect. Five-year intervals provide zero operational oversight or agility.",
          "Incorrect. Emoji polls do not measure kilowatt-hours, cubic metres of water, or waste diversion rates.",
          "Incorrect. Waiting for regulatory fines represents catastrophic compliance and governance failure."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Risk Management): What risk mitigation strategy should be built into a sustainability action plan to handle unexpected operational disruptions?",
        options: [
          "Identify critical dependency risks (e.g. supply delays, equipment maintenance bottlenecks) and establish contingency mitigation protocols",
          "Assume that all planned installations will proceed on schedule with 100% perfection",
          "Cancel the entire sustainability programme if a single shipment experiences a one-week delay",
          "Blame external regulatory agencies whenever internal deadlines are missed"
        ],
        correct: 0,
        correctExplanation: "Risk assessments anticipate equipment lead times, supplier delays, and operational bottlenecks, ensuring robust contingency plans.",
        incorrectExplanation: "Incorrect. Every operational programme requires contingency buffers and risk mitigation strategies.",
        optionFeedback: [
          "Correct! Proactive risk identification ensures supply delays or facility constraints do not derail the broader programme.",
          "Incorrect. Assuming zero disruption leads to project failure at the first minor obstacle.",
          "Incorrect. Resilient plans adapt through alternative suppliers or adjusted phasing.",
          "Incorrect. Accountability requires proactive internal problem-solving rather than external blame."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Policy Integration): How should an approved Sustainability Action Plan be embedded into ongoing corporate operations?",
        options: [
          "Incorporate sustainability targets into departmental KPIs, standard operating procedures (SOPs), and onboarding training modules",
          "Save the document in a restricted executive folder that regular staff cannot access",
          "Print a single copy, frame it in the CEO's office, and maintain business as usual",
          "Require employees to memorize the document verbatim under penalty of termination"
        ],
        correct: 0,
        correctExplanation: "Embedding sustainability into SOPs, job descriptions, and training ensures policy becomes routine daily practice.",
        incorrectExplanation: "Incorrect. Locking policies in executive folders prevents operational adoption by frontline staff.",
        optionFeedback: [
          "Correct! Integrating targets into daily SOPs and job descriptions converts strategy into routine organizational habits.",
          "Incorrect. Restricting access prevents staff from understanding and executing required actions.",
          "Incorrect. Framed documents without operational integration are purely decorative.",
          "Incorrect. Rote memorization does not foster genuine competence or practical application."
        ]
      },
      {
        order: 9,
        question: "Workplace Scenario (Continuous Improvement): What should a sustainability steering committee do when an initiative exceeds its 12-month energy reduction goal ahead of schedule?",
        options: [
          "Analyze the success factors, document best practices, communicate achievements to staff, and calibrate next-phase stretch targets",
          "Shut down the energy management system because the goal has already been achieved",
          "Reduce the department budget by the exact amount saved to punish their efficiency",
          "Keep the achievement secret to avoid other departments requesting similar upgrades"
        ],
        correct: 0,
        correctExplanation: "Celebrating success, analyzing drivers, and raising the bar embodies the Plan-Do-Check-Act continuous improvement cycle.",
        incorrectExplanation: "Incorrect. Achieving targets early is an opportunity to scale successes across other business units.",
        optionFeedback: [
          "Correct! Success analysis enables organizations to replicate effective strategies across other departments.",
          "Incorrect. Shutting down controls causes immediate regression to wasteful consumption habits.",
          "Incorrect. Penalizing efficiency destroys employee morale and discourages future innovation.",
          "Incorrect. Sharing successes builds organizational pride and cross-departmental motivation."
        ]
      },
      {
        order: 10,
        question: "Workplace Decision (Transparency & Reporting): When communicating action plan results to external stakeholders, what is the best practice for reporting metrics?",
        options: [
          "Report quantitative data with clear baseline comparisons, methodology explanations, and transparent disclosure of both successes and remaining challenges",
          "Publish only positive marketing slogans while omitting all actual consumption figures",
          "Present projected future savings as if they were already achieved historical results",
          "Purchase generic pre-written sustainability reports from internet templates"
        ],
        correct: 0,
        correctExplanation: "Transparent reporting with methodology context and honest variance analysis builds credibility and stakeholder trust.",
        incorrectExplanation: "Incorrect. Hiding consumption data or presenting future projections as past results constitutes greenwashing.",
        optionFeedback: [
          "Correct! Transparent, data-backed reporting establishes authentic stakeholder confidence and meets international ESG expectations.",
          "Incorrect. Slogans without data are dismissed by auditors, investors, and enterprise clients.",
          "Incorrect. Misrepresenting projections as actuals constitutes deceptive reporting.",
          "Incorrect. Generic templates fail to reflect real company performance and compliance."
        ]
      }
    ]
  },

  // 3. ELH-14 (ID: 14) - Setting Departmental Sustainability Goals (10 Questions)
  {
    courseId: 14,
    courseCode: "ELH-14",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Departmental Alignment): How should a Department Head align departmental targets with the overarching corporate sustainability strategy?",
        options: [
          "Cascade enterprise sustainability goals into specific departmental operational drivers that staff directly control in their daily routines",
          "Create departmental goals that contradict corporate targets to demonstrate independence",
          "Ignore corporate sustainability strategy completely and focus exclusively on short-term sales calls",
          "Copy the goals of a completely unrelated offshore mining conglomerate verbatim"
        ],
        correct: 0,
        correctExplanation: "Effective departmental goals translate high-level corporate sustainability ambitions into actionable daily workflows.",
        incorrectExplanation: "Incorrect. Departmental goals must align with and support corporate environmental objectives.",
        optionFeedback: [
          "Correct! Cascading goals connects high-level strategy to tangible operational levers managed by frontline teams.",
          "Incorrect. Contradictory goals fracture corporate alignment and waste organizational resources.",
          "Incorrect. Siloed disengagement undermines company-wide ESG commitments.",
          "Incorrect. Goals must reflect the actual operational realities of the specific department."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Finance Department Goals): Which sustainability KPI is most appropriate and impactful for a corporate Finance Department?",
        options: [
          "Integrate ESG risk evaluations into capital allocation decisions and transition 90% of vendor invoicing to automated paperless workflows",
          "Turn off financial audit servers during working hours to save 2 watts of power",
          "Refuse to process salary payments for employees who take public transport",
          "Invest 100% of corporate cash reserves into unverified cryptocurrency tokens"
        ],
        correct: 0,
        correctExplanation: "Finance departments drive sustainability through paperless invoicing, green CapEx screening, and ESG risk integration.",
        incorrectExplanation: "Incorrect. Turning off critical audit servers or punishing public transit violates operational governance.",
        optionFeedback: [
          "Correct! Green financing criteria and paperless accounting leverage the finance team's core operational capabilities.",
          "Incorrect. Disrupting core financial controls compromises governance and delivers negligible energy savings.",
          "Incorrect. Public transit should be incentivized, not penalized.",
          "Incorrect. High-risk unverified assets violate fiduciary governance."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (HR Department Targets): What is an impactful sustainability goal for a Human Resources department?",
        options: [
          "Integrate sustainability competencies into onboarding curricula, job descriptions, and employee performance appraisal scorecards",
          "Eliminate all employee training budgets to save office printing paper",
          "Force all employees to sign non-disclosure agreements regarding facility energy bills",
          "Mandate that all staff commute exclusively on foot regardless of distance or safety"
        ],
        correct: 0,
        correctExplanation: "HR drives sustainability culture by incorporating environmental competencies into onboarding, training, and performance reviews.",
        incorrectExplanation: "Incorrect. Eliminating training or forcing unrealistic commutes undermines workforce capability and safety.",
        optionFeedback: [
          "Correct! Embedding sustainability into recruitment, training, and reviews embeds eco-conscious culture across the entire workforce.",
          "Incorrect. Cutting training degrades workforce competence and long-term organizational value.",
          "Incorrect. Hiding utility data undermines transparency and staff engagement.",
          "Incorrect. Unrealistic or unsafe commute mandates violate duty-of-care obligations."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (IT Department Goals): Which target delivers substantial carbon reduction for an enterprise IT department?",
        options: [
          "Optimize server virtualization, migrate workloads to energy-efficient cloud regions, and mandate 5-year hardware lifecycle management with certified e-waste recycling",
          "Purchase 500 new high-power gaming laptops every six months to discard older working models",
          "Disable all firewall security software to reduce processor power consumption by 1%",
          "Keep all office screens running screensavers at maximum brightness 24 hours a day"
        ],
        correct: 0,
        correctExplanation: "IT decarbonization focuses on server efficiency, cloud optimization, extended device lifespans, and certified e-waste recycling.",
        incorrectExplanation: "Incorrect. Frequent device replacement and disabling firewalls create massive e-waste and severe cybersecurity vulnerabilities.",
        optionFeedback: [
          "Correct! Server efficiency, cloud optimization, and hardware longevity minimize Scope 2 power and Scope 3 embodied carbon.",
          "Incorrect. Excessive hardware turnover generates massive embodied carbon and hazardous e-waste.",
          "Incorrect. Disabling security controls invites catastrophic cybersecurity breaches.",
          "Incorrect. Continuous 24/7 screen illumination wastes significant electrical power."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Logistics & Fleet Goals): What is the most effective operational goal for a logistics department managing distribution fleets?",
        options: [
          "Implement route optimization software, conduct driver eco-driving training, and achieve a 12% reduction in fuel consumption per ton-kilometer",
          "Instruct drivers to exceed speed limits to finish delivery routes faster",
          "Remove catalytic converters from delivery trucks to reduce vehicle weight",
          "Switch all vehicle engine oil changes to cooking oil from the cafeteria"
        ],
        correct: 0,
        correctExplanation: "Route optimization and eco-driving directly cut fuel burn, fleet emissions, and operational transport costs.",
        incorrectExplanation: "Incorrect. Speeding and tampering with emission controls increase fuel consumption, pollution, and severe safety hazards.",
        optionFeedback: [
          "Correct! Route planning and smooth driving habits substantially reduce fleet emissions, brake wear, and fuel expenditure.",
          "Incorrect. Speeding increases aerodynamic drag, fuel consumption, and collision risks.",
          "Incorrect. Removing emission controls violates national transport laws and emits toxic particulates.",
          "Incorrect. Using improper lubricants destroys vehicle engines."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Baseline Calibration): Why must a department establish verifiable historical baselines before publishing annual reduction goals?",
        options: [
          "Baselines ensure targets are ambitious yet technically attainable, and provide a verified reference point to prove genuine progress",
          "Baselines are only needed if the company is facing imminent bankruptcy",
          "Baselines allow departments to claim credit for reductions that occurred ten years prior to the initiative",
          "Baselines prevent company accountants from tracking financial expenses"
        ],
        correct: 0,
        correctExplanation: "Accurate baselines ensure credibility, allow progress tracking, and prevent arbitrary or unachievable goal setting.",
        incorrectExplanation: "Incorrect. Without baseline measurements, claimed reductions cannot be validated by internal or external auditors.",
        optionFeedback: [
          "Correct! Establishing empirical baselines enables meaningful target setting and auditable progress verification.",
          "Incorrect. Baselines are fundamental to sound operational management in all financial conditions.",
          "Incorrect. Baselines must represent current pre-initiative operational parameters.",
          "Incorrect. Baselines enhance financial transparency and resource accountability."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Leading vs. Lagging Indicators): In departmental goal tracking, what is the key difference between leading and lagging indicators?",
        options: [
          "Leading indicators track proactive inputs/activities (e.g. staff training completion), while lagging indicators measure final outcomes (e.g. total kWh consumed)",
          "Leading indicators are financial, while lagging indicators are always environmental",
          "Leading indicators are measured once per decade, while lagging indicators are measured every second",
          "Leading indicators measure past historical errors, while lagging indicators predict the stock market"
        ],
        correct: 0,
        correctExplanation: "Leading indicators measure proactive efforts that drive performance; lagging indicators measure the resulting outcome.",
        incorrectExplanation: "Incorrect. Leading indicators guide ongoing actions, while lagging indicators confirm ultimate results.",
        optionFeedback: [
          "Correct! Leading indicators (training, audits) provide early operational feedback before lagging results (bills, emissions) materialize.",
          "Incorrect. Both leading and lagging indicators can span financial, environmental, and operational domains.",
          "Incorrect. Indicator type reflects causality and timing, not arbitrary measurement frequencies.",
          "Incorrect. Leading indicators are forward-looking drivers; lagging indicators reflect retrospective results."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Overcoming Resistance): When department employees express skepticism that sustainability goals will increase their daily workload, how should leadership respond?",
        options: [
          "Demonstrate how streamlined processes (e.g. digital workflows, waste reduction) eliminate friction, save time, and integrate naturally into daily duties",
          "Threaten immediate salary deductions for any employee who raises operational questions",
          "Abandon all departmental goals immediately and revert to outdated paper systems",
          "Delegate all sustainability tasks to an unpaid temporary intern"
        ],
        correct: 0,
        correctExplanation: "Framing sustainability as operational efficiency and workflow simplification builds engagement and dispels fears of extra work.",
        incorrectExplanation: "Incorrect. Punitive threats or abandoning goals destroys morale and stalls organizational modernization.",
        optionFeedback: [
          "Correct! Demonstrating that efficient workflows save time and reduce tedious friction secures lasting employee commitment.",
          "Incorrect. Coercion breeds resentment and passive non-compliance.",
          "Incorrect. Reverting to obsolete practices degrades organizational competitiveness.",
          "Incorrect. Dumping core responsibilities on temporary interns guarantees project failure."
        ]
      },
      {
        order: 9,
        question: "Workplace Scenario (Inter-Departmental Dependencies): The Marketing Department wants to switch to 100% recycled exhibition banners, but Procurement notes the supplier requires a 4-week lead time. What is the best collaborative solution?",
        options: [
          "Marketing and Procurement establish an integrated planning calendar with 6-week lead times to accommodate sustainable sourcing cycles",
          "Marketing purchases non-recyclable PVC banners from a local convenience store on the morning of the event",
          "Cancel all corporate events permanently to avoid ordering supplies",
          "Procurement refuses to speak with Marketing for the remainder of the fiscal year"
        ],
        correct: 0,
        correctExplanation: "Collaborative schedule adjustments allow organizations to meet sustainability criteria without sacrificing operational execution.",
        incorrectExplanation: "Incorrect. Last-minute compromises undermine sustainability goals when advance planning resolves the constraint.",
        optionFeedback: [
          "Correct! Shared timeline planning aligns marketing campaign schedules with sustainable procurement lead times.",
          "Incorrect. Reverting to toxic PVC banners defeats the departmental sustainability objective.",
          "Incorrect. Canceling business operations rather than planning ahead is unproductive.",
          "Incorrect. Siloed communication breakdowns cause operational failure."
        ]
      },
      {
        order: 10,
        question: "Workplace Decision (Performance Review Integration): How can departmental sustainability goals be made truly accountable at the individual employee level?",
        options: [
          "Include specific, measurable eco-efficiency objectives into annual employee performance appraisals tied to standard merit recognition",
          "Post a list of underperforming employees on a public hallway bulletin board",
          "Rely entirely on informal verbal reminders during office party toasts",
          "Require employees to work an extra unpaid weekend day if departmental recycling targets are missed"
        ],
        correct: 0,
        correctExplanation: "Aligning individual performance appraisals and merit recognition with sustainability goals creates tangible personal accountability.",
        incorrectExplanation: "Incorrect. Formal appraisal integration is professional and equitable; public shaming or unpaid labor is counterproductive and illegal.",
        optionFeedback: [
          "Correct! Formal KPI appraisal integration legitimizes sustainability as a core professional performance dimension.",
          "Incorrect. Public shaming destroys psychological safety and workplace culture.",
          "Incorrect. Informal reminders lack governance, measurement, and accountability.",
          "Incorrect. Mandatory unpaid labor violates statutory employment legislation."
        ]
      }
    ]
  },

  // 4. ELH-15 (ID: 162) - Building a Workplace Sustainability Team (10 Questions)
  {
    courseId: 162,
    courseCode: "ELH-15",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Team Composition): When establishing a high-performing Workplace Sustainability Committee, what cross-functional representation is essential?",
        options: [
          "Representatives across Facilities/Operations, Procurement, HR, Finance, IT, and frontline operational units",
          "Exclusively marketing staff who specialise in graphic design and social media",
          "Only external unpaid interns who have worked at the company for less than one month",
          "Solely executive board members who do not visit the physical workplace facilities"
        ],
        correct: 0,
        correctExplanation: "Cross-functional representation across core operational departments ensures realistic decision-making and seamless organizational execution.",
        incorrectExplanation: "Incorrect. Teams limited to a single silo lack operational breadth and execution capability.",
        optionFeedback: [
          "Correct! Diverse cross-functional members provide operational insights across facilities, finances, purchasing, and culture.",
          "Incorrect. Marketing-only committees produce promotional materials without operational impact.",
          "Incorrect. Temporary interns lack organizational influence, budget authority, and long-term continuity.",
          "Incorrect. Executive-only committees lack direct connection to day-to-day facility workflows."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Executive Sponsorship): Why is an active Executive Sponsor vital for a workplace sustainability team?",
        options: [
          "To secure necessary CapEx/OpEx budgets, unblock cross-departmental resistance, and provide strategic board alignment",
          "To micromanage the font size of waste bin signage during weekly team meetings",
          "To take personal legal liability for all employee traffic violations",
          "To prevent the committee from accessing corporate utility data"
        ],
        correct: 0,
        correctExplanation: "Executive sponsors provide strategic legitimacy, secure budget resources, and remove cross-departmental barriers.",
        incorrectExplanation: "Incorrect. Sponsors provide high-level leadership and resource backing, not micro-management or obstruction.",
        optionFeedback: [
          "Correct! Executive backing ensures sustainability initiatives receive appropriate capital funding and operational priority.",
          "Incorrect. Sponsors focus on governance and resourcing rather than minor design micromanagement.",
          "Incorrect. Corporate governance separates executive sponsorship from individual driver liabilities.",
          "Incorrect. Executive sponsors champion open data access to drive evidence-based improvements."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Team Charter): What is the primary purpose of drafting a formal Team Charter for a sustainability committee?",
        options: [
          "Define the committee mission, operational scope, meeting cadences, decision authority, and measurable annual deliverables",
          "Create a ceremonial scroll that requires no practical follow-up or operational responsibilities",
          "Exempt all committee members from their regular daily job duties",
          "Prohibit other employees outside the committee from adopting eco-friendly habits"
        ],
        correct: 0,
        correctExplanation: "A Team Charter clarifies roles, operational authority, governance cadences, and measurable deliverables.",
        incorrectExplanation: "Incorrect. Charters provide clear operational frameworks, not ceremonial excuses to abandon work.",
        optionFeedback: [
          "Correct! A clear charter establishes governance, accountability, meeting rhythms, and quantifiable objectives.",
          "Incorrect. Charters are living governance documents designed to drive accountability and action.",
          "Incorrect. Sustainability committee members balance committee work with their regular responsibilities.",
          "Incorrect. Sustainability committees empower and engage the wider workforce, not restrict them."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Role Definition): What are the core responsibilities of a Sustainability Team Lead / Chair?",
        options: [
          "Facilitate meetings, track action items, coordinate cross-departmental initiatives, and report progress to executive leadership",
          "Carry out every single operational physical repair personally without delegating",
          "Cancel all meetings whenever an initiative faces a minor challenge",
          "Make unilateral purchasing decisions without finance or procurement approval"
        ],
        correct: 0,
        correctExplanation: "The team lead facilitates collaboration, monitors milestones, drives cross-functional alignment, and communicates to leadership.",
        incorrectExplanation: "Incorrect. The lead orchestrates and facilitates, rather than working in isolation or bypassing governance.",
        optionFeedback: [
          "Correct! Effective team leadership coordinates diverse stakeholders and maintains accountability across workstreams.",
          "Incorrect. A leader coordinates and delegates rather than attempting solo execution of facility maintenance.",
          "Incorrect. Resilient leadership navigates obstacles through problem-solving and escalation.",
          "Incorrect. All capital and operational spending must comply with corporate procurement controls."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Green Champions Network): How should a corporate sustainability committee structure a frontline 'Green Champions' network across multi-site facilities?",
        options: [
          "Designate voluntary point-of-contact champions in each branch/floor with clear monthly engagement toolkits and feedback loops",
          "Require champions to police and report their coworkers anonymously to human resources",
          "Assign champion roles only to individuals who work from home 100% of the time",
          "Give champions total control over facility electrical circuit breakers without training"
        ],
        correct: 0,
        correctExplanation: "Green Champions act as local peer influencers and feedback conduits, supported by structured toolkits and guidance.",
        incorrectExplanation: "Incorrect. Champions foster peer engagement and positive culture, not policing or unsafe technical actions.",
        optionFeedback: [
          "Correct! Peer champions with structured toolkits drive grassroots adoption and provide vital frontline feedback.",
          "Incorrect. Punitive surveillance destroys trust, psychological safety, and employee enthusiasm.",
          "Incorrect. On-site physical champions are vital for physical facility observations and peer interactions.",
          "Incorrect. Unauthorised tampering with electrical switchgear creates severe electrical hazard risks."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Meeting Cadence & Accountability): What structure ensures sustainability committee meetings translate into concrete operational outcomes?",
        options: [
          "Maintain concise monthly meetings with timed agendas, documented minutes, assigned action owners, and deadline-tracked deliverables",
          "Hold open-ended 4-hour discussions without agendas, minutes, or assigned follow-up actions",
          "Meet only once a year for a catered lunch with no progress review",
          "Record meetings on video and delete the files immediately without notes"
        ],
        correct: 0,
        correctExplanation: "Action-oriented agendas with clear ownership and deadline tracking prevent meetings from degenerating into unproductive talk.",
        incorrectExplanation: "Incorrect. Unstructured meetings without assigned ownership produce zero operational progress.",
        optionFeedback: [
          "Correct! Structured agendas and clear accountability logs ensure committee ideas convert into executed initiatives.",
          "Incorrect. Unfocused discussions without assigned tasks waste employee time and stall progress.",
          "Incorrect. Annual-only cadences provide insufficient frequency to manage active projects.",
          "Incorrect. Documenting action items and tracking deadlines is essential for operational execution."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Managing Volunteer Burnout): When enthusiastic sustainability team members struggle to balance project tasks with heavy core workloads, how should leadership intervene?",
        options: [
          "Formalize sustainability duties into workload allocations (e.g. 5–10% dedicated time) agreed upon with direct line managers",
          "Demand that employees complete sustainability projects strictly during unpaid personal hours at night",
          "Disband the committee and reprimand members for showing environmental enthusiasm",
          "Double their daily core job targets to compensate for committee attendance"
        ],
        correct: 0,
        correctExplanation: "Formalizing time allocations with line manager approval prevents burnout and recognizes sustainability as legitimate work.",
        incorrectExplanation: "Incorrect. Overloading volunteers or penalizing initiative causes burnout, resentment, and team collapse.",
        optionFeedback: [
          "Correct! Formal agreement with line managers protects employees' time and legitimizes sustainability contributions.",
          "Incorrect. Expecting unpaid overtime for corporate initiatives breeds resentment and turnover.",
          "Incorrect. Disbanding teams destroys institutional momentum and damages culture.",
          "Incorrect. Penalizing committee volunteers discourages all future employee initiative."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Decision-Making Framework): How should a sustainability team handle conflicting opinions between Facilities and HR regarding office temperature setpoints?",
        options: [
          "Review empirical comfort standards (ASHRAE 55), test a calibrated setpoint (24°C), collect employee feedback data, and adjust iteratively",
          "Allow the loudest department head to decide without data or standards",
          "Set the thermostat to extreme cold (16°C) to end the argument instantly",
          "Disable the air conditioning system completely and remove all fans"
        ],
        correct: 0,
        correctExplanation: "Data-driven decisions using international comfort standards and structured employee feedback resolve conflicts objectively.",
        incorrectExplanation: "Incorrect. Arbitrary extremes or decisions based on loudest voice compromise thermal comfort and energy efficiency.",
        optionFeedback: [
          "Correct! Objective thermal comfort data and iterative pilot testing resolve inter-departmental disagreements effectively.",
          "Incorrect. Decisions based on volume rather than standards lead to poor energy and comfort outcomes.",
          "Incorrect. Extreme cooling wastes massive energy and causes severe occupant discomfort.",
          "Incorrect. Disabling cooling in tropical environments compromises workplace health and productivity."
        ]
      },
      {
        order: 9,
        question: "Workplace Scenario (Skills & Capability Building): How can an enterprise ensure sustainability committee members possess adequate knowledge to drive complex projects?",
        options: [
          "Provide structured modular training on carbon accounting, resource efficiency, and project management, supported by internal learning platforms",
          "Assume team members will guess technical environmental regulations accurately without guidance",
          "Prohibit team members from reading sustainability publications or industry reports",
          "Instruct team members to ask internet chatbots for legal compliance advice without verification"
        ],
        correct: 0,
        correctExplanation: "Structured training builds technical competence and organizational capability across core sustainability domains.",
        incorrectExplanation: "Incorrect. Guessing regulations or unverified advice introduces significant legal and environmental compliance risks.",
        optionFeedback: [
          "Correct! Investing in professional development empowers committee members to design compliant and effective initiatives.",
          "Incorrect. Relying on guesswork risks costly regulatory non-compliance and inefficient projects.",
          "Incorrect. Professional learning and industry benchmarking are vital for organizational growth.",
          "Incorrect. Legal compliance requires qualified professional review and validated regulatory frameworks."
        ]
      },
      {
        order: 10,
        question: "Workplace Decision (Recognition & Motivation): What is the most effective way to sustain team morale and motivation across multi-year sustainability programmes?",
        options: [
          "Publicly celebrate milestone achievements at company town halls, showcase team contributions, and integrate outcomes into annual recognition awards",
          "Treat sustainability work as completely invisible and never mention achievements publicly",
          "Deduct points from employee performance scores whenever energy prices fluctuate",
          "Claim that all sustainability achievements were accomplished exclusively by external consultants"
        ],
        correct: 0,
        correctExplanation: "Public recognition, leadership visibility, and rewarding contributions sustain high engagement and organizational momentum.",
        incorrectExplanation: "Incorrect. Ignoring contributions or attributing staff work to external parties destroys motivation and trust.",
        optionFeedback: [
          "Correct! Executive recognition and celebration of milestones reinforce positive culture and sustain long-term commitment.",
          "Incorrect. Lack of recognition leads to disengagement and committee attrition.",
          "Incorrect. Global energy price swings are outside employee control and should never be penalized.",
          "Incorrect. Failing to credit internal teams erodes trust and disincentivizes future efforts."
        ]
      }
    ]
  },

  // 5. ELH-16 (ID: 114) - Communicating Sustainability at Work (10 Questions)
  {
    courseId: 114,
    courseCode: "ELH-16",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Greenwashing Prevention): When drafting an external press release about a new packaging initiative, how should the communications team avoid greenwashing?",
        options: [
          "State verified factual metrics (e.g. '30% post-consumer recycled plastic'), declare certification standards, and avoid vague terms like '100% eco-friendly'",
          "Claim the entire company is '100% pure green and zero impact' because one product changed packaging",
          "Use dramatic nature photos of pristine waterfalls while concealing that the packaging is non-recyclable PVC",
          "Invent fictitious eco-labels with arbitrary green leaf icons to impress customers"
        ],
        correct: 0,
        correctExplanation: "Accurate, verifiable claims with specific data and third-party standards prevent greenwashing and protect brand integrity.",
        incorrectExplanation: "Incorrect. Vague eco-claims and misleading imagery risk regulatory fines and severe reputational backlash.",
        optionFeedback: [
          "Correct! Transparent, data-backed claims substantiated by certifications protect corporate credibility and build trust.",
          "Incorrect. Exaggerated claims for minor improvements constitute blatant greenwashing.",
          "Incorrect. Misleading visuals combined with hidden non-recyclable materials breach consumer protection laws.",
          "Incorrect. Creating fake eco-labels is fraudulent and invites regulatory prosecution."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Tailored Messaging): How should sustainability communications differ when addressing the Board of Directors versus frontline staff?",
        options: [
          "Present financial ROI, compliance risks, and strategic ESG metrics to the Board; provide practical, actionable operational tips and tangible wins to frontline staff",
          "Send the exact same 200-page technical GHG accounting spreadsheet to all staff members",
          "Tell the Board only emotional stories and tell frontline staff only complicated legal statutes",
          "Refuse to communicate with frontline staff because sustainability is strictly an executive matter"
        ],
        correct: 0,
        correctExplanation: "Tailoring message framing to audience needs ensures resonance, engagement, and actionable comprehension at every level.",
        incorrectExplanation: "Incorrect. Board members require strategic/financial context, while frontline staff need practical day-to-day guidance.",
        optionFeedback: [
          "Correct! Context-specific messaging aligns strategic business cases for executives with practical daily actions for employees.",
          "Incorrect. Dense technical accounting spreadsheets overwhelm general staff and fail to motivate behavior change.",
          "Incorrect. Executives need financial/governance rigor, while operational staff need practical instructions.",
          "Incorrect. Frontline employee participation is essential for organizational sustainability success."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Digital Signage & Engagement): How can workplace digital screens be used effectively to encourage energy conservation without causing 'message fatigue'?",
        options: [
          "Display dynamic, rotating bite-sized tips, real-time facility energy savings data, and celebrate monthly team achievements",
          "Display a static, wall-of-text legal policy continuously in 8-point font with no graphics",
          "Flash urgent siren animations and loud alarms every 10 minutes throughout the workday",
          "Turn off all digital signage permanently to save $0.50 of electricity per month"
        ],
        correct: 0,
        correctExplanation: "Dynamic, visual, and data-driven bite-sized content maintains interest and reinforces positive cultural norms.",
        incorrectExplanation: "Incorrect. Dense static text or alarmist warnings cause message fatigue, annoyance, and disengagement.",
        optionFeedback: [
          "Correct! Visual data stories, rotating tips, and team shoutouts keep content fresh, engaging, and motivating.",
          "Incorrect. Unreadable static text walls are universally ignored by passing employees.",
          "Incorrect. Constant alarms create stress, annoyance, and cognitive fatigue.",
          "Incorrect. Digital signage is a high-value communication channel when utilized effectively."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Handling Skepticism & Cynicism): When employees dismiss sustainability announcements as 'corporate PR spin', what is the most constructive response?",
        options: [
          "Share transparent before-and-after operational data, invite open Q&A sessions, and involve skeptics in testing new green initiatives",
          "Issue formal reprimands to any employee who expresses doubts about company policies",
          "Cancel all internal communications and conceal future environmental initiatives",
          "Hire external actors to pretend to be enthusiastic employees in internal videos"
        ],
        correct: 0,
        correctExplanation: "Transparency, open dialogue, and active participation build trust and convert cynical observers into engaged participants.",
        incorrectExplanation: "Incorrect. Suppressing feedback or staging fake testimonials deepens cynicism and damages workplace culture.",
        optionFeedback: [
          "Correct! Transparent data sharing and participatory pilot testing dismantle cynicism through tangible evidence.",
          "Incorrect. Silencing questions creates an atmosphere of fear and destroys authentic engagement.",
          "Incorrect. Halting communications forfeits the opportunity to build alignment and culture.",
          "Incorrect. Staged testimonials are easily detected and permanently destroy management credibility."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Crisis Communication): If an accidental diesel spill occurs at a logistics depot, how should corporate communications coordinate external disclosures?",
        options: [
          "Issue a prompt, factual statement detailing the incident, containment actions taken, regulatory notifications made, and remediation steps underway",
          "Deny that any spill occurred and blame local journalists for spreading rumors",
          "Delete all company social media accounts and refuse to answer regulatory phone calls",
          "Claim the spill was intentional as part of an experimental environmental test"
        ],
        correct: 0,
        correctExplanation: "Timely, transparent crisis communication detailing containment and regulatory compliance preserves stakeholder trust.",
        incorrectExplanation: "Incorrect. Denials and cover-ups exacerbate environmental crises and invite severe statutory and legal penalties.",
        optionFeedback: [
          "Correct! Factual transparency, containment confirmation, and proactive regulatory disclosure uphold credibility.",
          "Incorrect. Lying about environmental spills violates disclosure laws and destroys corporate reputation.",
          "Incorrect. Evading authorities and deleting channels worsens crisis severity and invites criminal scrutiny.",
          "Incorrect. Fabricating absurd explanations exposes the company to extreme ridicule and legal jeopardy."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Storytelling & Data Visualization): Why is storytelling combined with data more effective in sustainability campaigns than raw statistics alone?",
        options: [
          "Stories provide human context and emotional connection, while data provides empirical credibility and proof",
          "Stories allow companies to invent fictitious results without needing any actual data",
          "Data is completely useless in modern corporate communications",
          "Storytelling is only used for children's books, not commercial enterprises"
        ],
        correct: 0,
        correctExplanation: "Combining real human stories with validated data bridges emotional engagement and analytical credibility.",
        incorrectExplanation: "Incorrect. Stories without data lack proof, while data without stories fails to inspire human action.",
        optionFeedback: [
          "Correct! Pairing compelling human narratives with robust empirical metrics drives understanding and behavior change.",
          "Incorrect. Authentic storytelling must always be rooted in verified factual data.",
          "Incorrect. Empirical data is vital for proving environmental progress and avoiding greenwashing.",
          "Incorrect. Business storytelling is a powerful tool for strategic communication and culture change."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Inclusive Language & Accessibility): How should internal sustainability campaigns ensure accessibility for all employees in a multilingual workplace?",
        options: [
          "Use clear, jargon-free language with visual infographics, offer multilingual versions (e.g. English, French, Mauritian Creole), and ensure alt-text for screen readers",
          "Write exclusively in dense academic Latin to ensure elevated intellectual tone",
          "Publish communications only as low-resolution unreadable scanned images",
          "Exclude non-fluent employees from attending environmental awareness sessions"
        ],
        correct: 0,
        correctExplanation: "Accessible, multilingual, and visual communications ensure every employee can understand and participate in green initiatives.",
        incorrectExplanation: "Incorrect. Complex jargon and inaccessible formats exclude staff and depress participation rates.",
        optionFeedback: [
          "Correct! Multilingual access, visual iconography, and digital accessibility ensure universal workforce inclusion.",
          "Incorrect. Academic jargon alienates frontline staff and creates comprehension barriers.",
          "Incorrect. Inaccessible images prevent screen readers from working and frustrate users.",
          "Incorrect. Sustainability requires whole-of-workforce inclusion across all linguistic backgrounds."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Feedback Loops): Why is establishing bi-directional communication channels essential in a workplace sustainability strategy?",
        options: [
          "Employees on the ground often identify operational waste, leaks, and energy inefficiencies that management cannot see from an office",
          "Bi-directional channels allow management to assign blame to employees for rising utility costs",
          "Two-way feedback is a statutory requirement that must be filed with the Supreme Court",
          "Feedback channels are used exclusively to monitor employee personal social media posts"
        ],
        correct: 0,
        correctExplanation: "Frontline workers have firsthand visibility into day-to-day inefficiencies and practical improvement opportunities.",
        incorrectExplanation: "Incorrect. Feedback channels are collaborative innovation tools, not mechanisms for blame or surveillance.",
        optionFeedback: [
          "Correct! Frontline workers observe daily operational realities, making employee idea channels invaluable for waste reduction.",
          "Incorrect. Communication loops should foster problem-solving, not finger-pointing.",
          "Incorrect. Feedback systems are management best practices, not Supreme Court filings.",
          "Incorrect. Sustainability channels focus on facility and workflow improvements, not personal surveillance."
        ]
      },
      {
        order: 9,
        question: "Workplace Scenario (Social Media & Brand Advocacy): How can an enterprise safely empower employees to share genuine sustainability wins on professional networks (e.g. LinkedIn)?",
        options: [
          "Provide employee advocacy guidelines, pre-approved verified facts, and encourage authentic personal reflections on company initiatives",
          "Prohibit all employees from ever mentioning the company name on social media under penalty of termination",
          "Write fake posts from employees' personal accounts without their knowledge or consent",
          "Require employees to post promotional marketing slogans three times every day"
        ],
        correct: 0,
        correctExplanation: "Clear guidelines and verified facts allow employees to become credible brand ambassadors safely and authentically.",
        incorrectExplanation: "Incorrect. Forced posting or unauthorized account access violates privacy and creates fake advocacy.",
        optionFeedback: [
          "Correct! Empowering employees with factual toolkits fosters authentic brand advocacy and builds employer reputation.",
          "Incorrect. Draconian social media bans stifle natural brand pride and community connection.",
          "Incorrect. Accessing employee personal accounts without consent is illegal and a severe breach of trust.",
          "Incorrect. Mandatory promotional quotas produce robotic, inauthentic spam that harms the brand."
        ]
      },
      {
        order: 10,
        question: "Workplace Decision (Continuous Campaign Evaluation): How should a communications team evaluate the effectiveness of an internal sustainability campaign?",
        options: [
          "Track a combination of message reach, engagement rates, quiz completion, and observed behavioral change in facility metrics (e.g. reduced bin contamination)",
          "Assume the campaign was 100% successful if the marketing director liked the poster design",
          "Measure success solely by the number of printed flyers distributed, regardless of whether they were thrown in the trash",
          "Never evaluate campaigns because communications cannot be measured quantitatively"
        ],
        correct: 0,
        correctExplanation: "Evaluating campaigns through engagement metrics and operational outcome shifts measures true behavioral impact.",
        incorrectExplanation: "Incorrect. True effectiveness is measured by operational behavior change, not subjective poster aesthetics.",
        optionFeedback: [
          "Correct! Connecting communication metrics to actual facility behavioral changes validates true campaign ROI.",
          "Incorrect. Executive aesthetic preference is not a valid measure of workforce behavior change.",
          "Incorrect. Printed flyer volume often generates litter rather than real behavioral engagement.",
          "Incorrect. Modern communication impact is highly measurable through digital analytics and facility data."
        ]
      }
    ]
  },

  // 6. ELH-17 (ID: 163) - Tracking Sustainability Actions and Progress (10 Questions)
  {
    courseId: 163,
    courseCode: "ELH-17",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Tracking Framework): What is the most reliable method for an organization to track progress on 50 simultaneous sustainability actions across multiple sites?",
        options: [
          "A centralized digital action tracker with assigned owners, milestone deadlines, budget tracking, status tags, and evidence attachments",
          "Scattered handwritten sticky notes placed on individual employee monitors",
          "Relying on verbal memories during informal hallway chats once every few months",
          "Saving 50 different versions of a spreadsheet in separate unshared email inboxes"
        ],
        correct: 0,
        correctExplanation: "Centralized digital trackers provide single-source-of-truth visibility, clear accountability, and real-time status monitoring.",
        incorrectExplanation: "Incorrect. Scattered sticky notes or version-bloated spreadsheets lead to lost tasks and zero accountability.",
        optionFeedback: [
          "Correct! Centralized tracking with explicit ownership and evidence attachments ensures seamless multi-site visibility.",
          "Incorrect. Sticky notes easily detach, get lost, and offer zero organizational visibility.",
          "Incorrect. Verbal recollections cannot manage complex multi-facility initiatives.",
          "Incorrect. Email attachment versions create confusion and data discrepancies."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (KPI Normalization): Why should energy consumption metrics be normalized against business activity (e.g. kWh per guest-night or kWh per square meter)?",
        options: [
          "Normalization decouples energy efficiency from business volume fluctuations, showing true operational efficiency gains",
          "Normalization is done solely to confuse financial auditors during annual audits",
          "Normalization always makes total electricity bills disappear completely",
          "Normalization allows facilities to operate with uncalibrated electrical meters"
        ],
        correct: 0,
        correctExplanation: "Normalized KPIs account for production volume, occupancy, or floor area, revealing genuine efficiency performance.",
        incorrectExplanation: "Incorrect. Absolute consumption fluctuates with output; normalized KPIs show whether operations are fundamentally leaner.",
        optionFeedback: [
          "Correct! Activity-adjusted metrics (kWh/unit) distinguish genuine efficiency improvements from changes in facility output.",
          "Incorrect. Normalization enhances clarity and comparability for auditors and management.",
          "Incorrect. Normalization is a mathematical ratio; it does not eliminate utility expenses.",
          "Incorrect. Accurate metering remains essential for reliable normalization calculations."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Variance Analysis): During a monthly review, the Facility Manager notices water consumption jumped 40% while building occupancy remained flat. What is the immediate required action?",
        options: [
          "Initiate an immediate leak detection sweep, review sub-meter logs, inspect cooling towers and irrigation lines, and isolate faulty valves",
          "Ignore the anomaly and wait six months to see if water bills return to normal on their own",
          "Assume the municipal water utility made a permanent billing mistake and refuse to pay",
          "Blame the increase on humid weather without inspecting facility plumbing"
        ],
        correct: 0,
        correctExplanation: "Sudden consumption spikes without occupancy shifts indicate underground pipe bursts, stuck valves, or equipment failures requiring rapid isolation.",
        incorrectExplanation: "Incorrect. Delaying leak investigations causes massive water waste, structural damage, and soaring utility bills.",
        optionFeedback: [
          "Correct! Immediate sub-meter analysis and physical inspections catch concealed leaks and stuck valves before major losses accumulate.",
          "Incorrect. Unattended leaks can waste millions of litres and compromise building foundations.",
          "Incorrect. Utility bills should be audited, but physical leaks must be checked immediately.",
          "Incorrect. Weather variations cannot explain a 40% overnight jump in water use."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Milestone Status Definitions): In an action tracking dashboard, what is the best practice for defining the 'At Risk' (Amber) status for a project milestone?",
        options: [
          "The milestone has encountered a barrier (e.g. budget delay, supplier backlog) that will breach the deadline unless corrective intervention occurs within 14 days",
          "The project is 100% finished and fully certified",
          "The project has been permanently canceled and deleted from corporate records",
          "The project manager is on annual vacation"
        ],
        correct: 0,
        correctExplanation: "Amber/At Risk status signals an emerging roadblock that requires active management intervention before the deadline is missed.",
        incorrectExplanation: "Incorrect. Amber indicates an impending delay requiring corrective intervention, not completion or cancellation.",
        optionFeedback: [
          "Correct! Clear risk definitions trigger timely escalations to resolve bottlenecks before project failure occurs.",
          "Incorrect. Completed projects are designated 'Complete' (Green).",
          "Incorrect. Canceled initiatives are tagged as 'Canceled' with documented justification.",
          "Incorrect. Planned leave should be accommodated within scheduled project timelines."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Evidence Verification): When a department reports that its paper reduction initiative reached '100% Complete', what verification evidence should the sustainability manager request?",
        options: [
          "Procurement ream purchase invoices showing volume reduction and paperless workflow platform usage audit logs",
          "A verbal promise that everyone stopped printing documents last Tuesday",
          "A signed letter from a coffee shop confirming the department drinks green tea",
          "A photograph of an empty desk with no printer on top"
        ],
        correct: 0,
        correctExplanation: "Verifiable purchase records and digital platform audit logs provide empirical evidence of sustained paper reduction.",
        incorrectExplanation: "Incorrect. Verbal claims or staged photos lack auditable evidence required for credible ESG reporting.",
        optionFeedback: [
          "Correct! Sourcing invoices and system logs provide robust, verifiable proof of operational reduction.",
          "Incorrect. Verbal promises cannot be audited or verified by governance bodies.",
          "Incorrect. Unrelated personal habits do not substantiate corporate paper reduction.",
          "Incorrect. Staged photos do not prove systematic paperless operational transition."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Automated vs. Manual Data Tracking): What is the primary benefit of deploying automated IoT sub-metering over manual monthly clipboard logging?",
        options: [
          "High-frequency interval data (e.g. 15-minute intervals) detects nighttime baseload anomalies, equipment cycling issues, and immediate leaks in real time",
          "Automated systems eliminate the need for electricity entirely",
          "IoT meters make it impossible for facilities to ever experience equipment breakdowns",
          "Automated sensors allow facility managers to stop reviewing energy performance reports"
        ],
        correct: 0,
        correctExplanation: "High-frequency automated data captures baseload spikes, equipment faults, and anomalies that monthly manual reads miss completely.",
        incorrectExplanation: "Incorrect. IoT meters provide granular visibility and rapid detection, though active human review remains essential.",
        optionFeedback: [
          "Correct! Granular interval data uncovers hidden night loads, faulty timers, and sudden spikes immediately.",
          "Incorrect. Meters monitor electrical flow; they do not generate or eliminate power.",
          "Incorrect. Sensors diagnose equipment status; they do not prevent mechanical wear.",
          "Incorrect. Data automation enhances management decision-making; it does not replace it."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Corrective Action Planning): If a planned rooftop solar installation is delayed by 3 months due to grid utility interconnection permits, how should the tracking register be updated?",
        options: [
          "Document the regulatory delay, adjust forecast completion dates, log risk mitigation steps, and re-estimate annual carbon reduction projections for the fiscal year",
          "Falsify the system commissioning date to show it opened on time on paper",
          "Cancel the entire renewable energy programme and uninstall the solar panels",
          "Delete the solar project entry from the sustainability tracker so no one notices"
        ],
        correct: 0,
        correctExplanation: "Transparent schedule adjustments with recalibrated carbon and financial forecasts maintain integrity and governance.",
        incorrectExplanation: "Incorrect. Falsifying dates or hiding delays compromises governance and invalidates carbon accounting.",
        optionFeedback: [
          "Correct! Transparent variance logging and forecast adjustments maintain audit integrity and executive confidence.",
          "Incorrect. Falsifying commissioning records breaches corporate governance and carbon reporting regulations.",
          "Incorrect. External permitting delays do not justify abandoning high-ROI renewable assets.",
          "Incorrect. Deleting projects conceals vital capital project information from stakeholders."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Dashboard Design for Executives): Which visual format is most effective when presenting sustainability progress to the Executive Leadership Team?",
        options: [
          "A high-level KPI dashboard displaying progress against annual targets, traffic-light status summaries, financial payback, and top 3 critical escalations",
          "A 500-page unformatted text document containing raw sensor timestamps",
          "A slideshow consisting exclusively of animated gifs of polar bears",
          "A single pie chart with 85 unlabelled slices in varying shades of grey"
        ],
        correct: 0,
        correctExplanation: "Executive dashboards summarize target progress, financial metrics, and required decisions clearly at a strategic level.",
        incorrectExplanation: "Incorrect. Executives need succinct, decision-oriented summaries rather than raw logs or decorative slides.",
        optionFeedback: [
          "Correct! Clear KPI scorecards with RAG status and financial returns enable swift executive decisions and resource allocation.",
          "Incorrect. Unformatted raw logs overwhelm leaders and conceal actionable insights.",
          "Incorrect. Generic emotional imagery provides zero strategic or operational value.",
          "Incorrect. Complex, unlabelled charts create cognitive confusion and obscure performance trends."
        ]
      },
      {
        order: 9,
        question: "Workplace Scenario (Mid-Year Target Calibration): When is it appropriate to recalibrate an annual sustainability KPI target mid-year?",
        options: [
          "When significant structural business changes occur (e.g. facility expansion, divestment, major production shifts) that fundamentally alter the operational baseline",
          "Whenever the team falls behind schedule and wants to guarantee an automatic bonus",
          "Every Monday morning based on how optimistic the team feels",
          "Never, even if 50% of company factory buildings are sold or closed"
        ],
        correct: 0,
        correctExplanation: "Structural operational changes (acquisitions, site closures) necessitate baseline and target restatements under GHG Protocol standards.",
        incorrectExplanation: "Incorrect. Targets must only be adjusted for legitimate structural shifts, not to hide poor execution.",
        optionFeedback: [
          "Correct! Structural boundary changes require formalized baseline recalculations to maintain meaningful performance measurement.",
          "Incorrect. Lowering targets to mask poor execution undermines corporate integrity and accountability.",
          "Incorrect. Weekly target shifting destroys stability and auditability.",
          "Incorrect. Failing to restate baselines after major divestments produces meaningless distorted data."
        ]
      },
      {
        order: 10,
        question: "Workplace Decision (Post-Project Evaluation): What is the key objective of conducting a post-project review (Post-Mortem) upon completing a major sustainability project?",
        options: [
          "Capture lessons learned, verify realized financial/carbon savings against projections, and document scalable best practices for future projects",
          "Identify an individual to blame for minor budget variations during the rollout",
          "Archive all project documents in a secret shredding facility",
          "Celebrate with an expensive party while refusing to measure actual energy savings"
        ],
        correct: 0,
        correctExplanation: "Post-project reviews validate actual ROI against projections and capture institutional knowledge to improve future rollouts.",
        incorrectExplanation: "Incorrect. Post-project evaluations focus on continuous organizational learning and empirical ROI verification.",
        optionFeedback: [
          "Correct! Verifying real-world savings against models extracts institutional learnings and optimizes future investments.",
          "Incorrect. Blame cultures discourage innovation and transparent problem reporting.",
          "Incorrect. Preserving project documentation is essential for audits and organizational memory.",
          "Incorrect. Failing to measure post-installation performance prevents empirical verification of benefits."
        ]
      }
    ]
  },

  // 7. ELH-18 (ID: 120) - Sustainability Data Collection and Evidence (10 Questions)
  {
    courseId: 120,
    courseCode: "ELH-18",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Data Source Hierarchy): When calculating greenhouse gas emissions from facility electricity, which data source provides the highest level of audit certainty?",
        options: [
          "Direct fiscal utility invoices and smart meter telemetry logs with verified kWh consumption data",
          "A rough visual estimate made by security guards walking past the main electrical board",
          "Industry average benchmark estimates from an office building located in another country",
          "The building architect's theoretical design projection from 15 years ago"
        ],
        correct: 0,
        correctExplanation: "Primary utility invoices and calibrated smart meter telemetry provide empirical, verifiable primary activity data.",
        incorrectExplanation: "Incorrect. Rough visual estimates or obsolete design projections lack auditable validity for ESG reporting.",
        optionFeedback: [
          "Correct! Primary utility invoices and telemetry represent empirical primary data with the highest audit certainty.",
          "Incorrect. Visual guesswork provides zero auditable measurement rigor.",
          "Incorrect. Foreign benchmarks fail to reflect local facility operations and grid emissions.",
          "Incorrect. Historical theoretical models do not reflect real-world operating conditions."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Audit Trails & Data Lineage): What is meant by 'data lineage' and 'audit trail' in environmental accounting?",
        options: [
          "The documented, unbroken chain showing exactly where raw data originated, who recorded it, what conversion factors were applied, and where it was reported",
          "A list of websites that employees visited while calculating numbers on a lunch break",
          "Deleting all historical calculation spreadsheets once final numbers are compiled",
          "A decorative border drawn around the final corporate sustainability report"
        ],
        correct: 0,
        correctExplanation: "Data lineage documents the verifiable provenance, transformation methodology, and custody chain from raw source to final report.",
        incorrectExplanation: "Incorrect. Audit trails ensure calculations can be independently verified, re-calculated, and audited without gaps.",
        optionFeedback: [
          "Correct! Robust data lineage ensures third-party auditors can trace reported KPIs back to source invoices and calculation formulas.",
          "Incorrect. Web browsing histories do not constitute auditable accounting documentation.",
          "Incorrect. Deleting underlying calculation workpapers prevents verification and fails financial audits.",
          "Incorrect. Graphic borders are aesthetic and provide no evidential value."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Handling Missing Data): An enterprise is missing electricity bills for two months from a remote warehouse. What is the standard accounting protocol under the GHG Protocol?",
        options: [
          "Use a transparent, documented estimation methodology (e.g. pro-rata historical averaging or degree-day modeling) and disclose the estimation in the audit notes",
          "Enter '0 kWh' for those two months to make company energy consumption look lower",
          "Falsify utility receipts using graphic design software",
          "Exclude the entire warehouse from the corporate carbon footprint forever"
        ],
        correct: 0,
        correctExplanation: "When primary data is unavailable, conservative estimation methods with transparent methodology disclosure ensure completeness and integrity.",
        incorrectExplanation: "Incorrect. Entering zero or forging invoices violates accounting standards and constitutes compliance fraud.",
        optionFeedback: [
          "Correct! Documented estimation methods with full transparent disclosure maintain reporting completeness and compliance.",
          "Incorrect. Entering zero conceals real energy use and severely distorts emissions inventories.",
          "Incorrect. Forging invoices constitutes criminal fraud.",
          "Incorrect. Arbitrarily excluding operational facilities violates organizational boundary rules."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Emission Factor Selection): When converting grid electricity consumption (kWh) in Mauritius into CO2 equivalent emissions, which emission factor must be used?",
        options: [
          "The latest official grid emission factor published by the Central Electricity Board (CEB) or national energy authority of Mauritius",
          "The national grid emission factor of Iceland or Norway",
          "A random constant number chosen to achieve a net-zero calculation result",
          "The emission factor of a single diesel generator running in an offshore oil rig"
        ],
        correct: 0,
        correctExplanation: "Grid emission factors must correspond to the specific geographic electrical grid where power was consumed during that reporting period.",
        incorrectExplanation: "Incorrect. Applying foreign emission factors distorts carbon accounting and fails GHG Protocol standards.",
        optionFeedback: [
          "Correct! Using local grid emission factors published by official national utilities ensures accurate spatial carbon accounting.",
          "Incorrect. Using hydro/geothermal factors from Iceland grossly underestimates emissions from fossil-based island grids.",
          "Incorrect. Fabricating constants destroys reporting integrity.",
          "Incorrect. Emission factors must reflect the actual grid supply mix."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Waste Data Collection): How should a commercial hotel track waste generation when the municipal collector does not provide weighing scales on collection trucks?",
        options: [
          "Conduct periodic volumetric waste audits (e.g. quarterly container volume checks with standard material bulk density conversion factors) or install on-site luggage scales",
          "Guess the total weight by looking out the window as the garbage truck drives away",
          "Record that the hotel produces zero waste because the waste is taken off-site",
          "Ask guests to take all hotel garbage home in their personal luggage"
        ],
        correct: 0,
        correctExplanation: "Volumetric sampling combined with standard density conversion factors provides scientifically valid waste estimation when scales are absent.",
        incorrectExplanation: "Incorrect. Visual guessing or claiming zero waste creates inaccurate and unverified data.",
        optionFeedback: [
          "Correct! Periodic volume sampling with established density conversion factors produces reliable and defensible waste data.",
          "Incorrect. Casual visual estimation is too inaccurate for audit compliance.",
          "Incorrect. Transferring waste off-site does not eliminate the hotel's operational waste generation footprint.",
          "Incorrect. Dumping operational waste on guests is unethical and operationally absurd."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Data Storage & Security): Where should environmental baseline data, utility invoices, and sensor logs be stored to prevent data loss and unauthorized tampering?",
        options: [
          "In a centralized, cloud-backed enterprise repository with role-based access control, version histories, and automated daily backups",
          "On a single employee's personal laptop desktop without password protection or backup",
          "On a scrap piece of paper stored in a warehouse locker room",
          "In the browser cache of an unauthenticated public internet cafe computer"
        ],
        correct: 0,
        correctExplanation: "Secure centralized repositories with role-based permissions and backups protect data integrity, business continuity, and audit readiness.",
        incorrectExplanation: "Incorrect. Storing critical compliance data on personal devices or unsecured papers risks permanent data loss and security breaches.",
        optionFeedback: [
          "Correct! Centralized, role-controlled cloud storage with version histories ensures data integrity, disaster recovery, and audit access.",
          "Incorrect. Personal laptops are vulnerable to theft, hardware failure, and lack enterprise access controls.",
          "Incorrect. Physical paper scraps are easily destroyed, misplaced, or unreadable.",
          "Incorrect. Public cafe terminals present severe cybersecurity vulnerabilities."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Scope 3 Travel Data): How should a corporate travel team collect accurate emissions data for employee business flights?",
        options: [
          "Extract flight itineraries (origin, destination, cabin class) from the corporate travel management agency and apply DEFRA / ICAO flight carbon calculators",
          "Multiply the total ticket price by a flat 1 kg CO2 per dollar without checking distance traveled",
          "Ask employees to remember how many hours they slept during each flight",
          "Ignore all international flights because airplanes fly above national borders"
        ],
        correct: 0,
        correctExplanation: "Flight routing, distances, and cabin class (accounting for passenger spatial footprints) provide accurate Scope 3 flight carbon calculations.",
        incorrectExplanation: "Incorrect. Ticket prices fluctuate with demand and yield management, making spend-based proxies highly inaccurate compared to distance.",
        optionFeedback: [
          "Correct! Activity-based distance and cabin-class data from travel management systems provide precise Scope 3 carbon calculations.",
          "Incorrect. Spend-based proxies distort calculations because ticket prices vary drastically based on timing rather than fuel burn.",
          "Incorrect. Sleep duration has zero correlation with jet fuel consumption.",
          "Incorrect. Aviation emissions are a core Scope 3 Category 6 reporting requirement regardless of altitude."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Data Quality Assurance): What is the purpose of conducting automated 'sanity checks' (outlier detection) on incoming utility meter feeds?",
        options: [
          "To immediately flag erroneous readings (e.g. meter multiplier errors, telemetry transmission dropouts, or negative values) before data enters reporting tables",
          "To automatically alter high electricity bills to make the company look greener",
          "To delete any data that shows the company consumed more energy than last year",
          "To shut off the main water valve whenever a sensor records an even number"
        ],
        correct: 0,
        correctExplanation: "Outlier and sanity validation rules catch transmission glitches, multiplier errors, and faulty meters before corrupt data enters reporting systems.",
        incorrectExplanation: "Incorrect. QA sanity checks detect data corruption; they do not manipulate numbers or alter operational valves.",
        optionFeedback: [
          "Correct! Automated outlier checks identify transmission dropouts and faulty scaling factors before reporting errors occur.",
          "Incorrect. Sanity checks detect technical anomalies, not manipulate real utility costs.",
          "Incorrect. Deleting higher consumption records violates accounting integrity and constitutes data fraud.",
          "Incorrect. QA validation evaluates data quality, not mechanical valve closures on even numbers."
        ]
      },
      {
        order: 9,
        question: "Workplace Scenario (Chain of Custody in Waste Management): When disposing of hazardous e-waste (e.g. old fluorescent tubes, lithium batteries), what document proves legal compliance?",
        options: [
          "A signed Waste Consignment Note / Hazardous Waste Manifest from a licensed, certified hazardous waste disposal contractor",
          "A verbal confirmation from a scrap metal collector in an unmarked van",
          "A photograph of the items placed next to an outdoor municipal bin",
          "A sales receipt from the electronics store where the items were originally purchased 10 years ago"
        ],
        correct: 0,
        correctExplanation: "A signed Hazardous Waste Manifest from an authorized handler confirms legally compliant transfer, treatment, and chain of custody.",
        incorrectExplanation: "Incorrect. Informal verbal promises or receipts do not prove statutory hazardous waste compliance or safe disposal.",
        optionFeedback: [
          "Correct! Licensed consignment notes prove chain of custody and fulfill statutory duty-of-care obligations.",
          "Incorrect. Informal scrap collectors often dump toxic e-waste in illegal sites, creating severe liability for the company.",
          "Incorrect. Dumping hazardous items near general bins violates environmental protection laws.",
          "Incorrect. Purchase receipts prove historical acquisition, not lawful end-of-life disposal."
        ]
      },
      {
        order: 10,
        question: "Workplace Decision (Continuous Data Improvement): How can an enterprise systematically improve its sustainability data maturity from Tier 1 (spend-based) to Tier 3 (supplier-specific primary data)?",
        options: [
          "Partner with key strategic suppliers to collect verified primary product lifecycle assessments (EPDs), install sub-meters, and integrate direct API telemetry",
          "Cease collecting all data and wait for global artificial intelligence to solve data gaps automatically",
          "Hire external marketing writers to write fiction stories about supply chain emissions",
          "Threaten to terminate all suppliers who do not achieve net-zero within 24 hours"
        ],
        correct: 0,
        correctExplanation: "Transitioning to primary telemetry, sub-metering, and supplier EPDs elevates data maturity and accuracy over generic economic proxies.",
        incorrectExplanation: "Incorrect. Improving data maturity requires structured supplier engagement, sub-metering investments, and primary data capture.",
        optionFeedback: [
          "Correct! Engaging suppliers for EPDs and expanding direct telemetry shifts reporting from generic spend proxies to verified primary data.",
          "Incorrect. Passive waiting does not build organizational data capabilities.",
          "Incorrect. Fictional storytelling destroys auditability and investor trust.",
          "Incorrect. Unrealistic 24-hour ultimatums destroy supplier relationships without improving data accuracy."
        ]
      }
    ]
  },

  // 8. ELH-19 (ID: 161) - Reviewing Sustainability Performance and Taking Corrective Action (8 Questions)
  {
    courseId: 161,
    courseCode: "ELH-19",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Root Cause Analysis): When a commercial office facility exceeds its monthly electricity reduction target by 25%, what diagnostic tool best identifies the root cause?",
        options: [
          "A 5-Whys Analysis combined with sub-meter interval load profiling to isolate whether the excess was driven by HVAC schedule overrides, sensor faults, or extended occupancy",
          "Immediately issuing disciplinary warnings to all facility cleaning staff without reviewing meter logs",
          "Assuming electricity tariffs increased and ignoring the physical kilowatt-hour consumption",
          "Deleting the energy monitoring software to hide the target overshoot from executive management"
        ],
        correct: 0,
        correctExplanation: "Structured root cause analysis (5-Whys / Ishikawa) and interval data profiling pinpoint the exact technical driver behind energy variances.",
        incorrectExplanation: "Incorrect. Blaming staff or deleting data conceals mechanical faults and fails to resolve underlying energy waste.",
        optionFeedback: [
          "Correct! The 5-Whys methodology combined with interval load profiles isolates the exact mechanical or operational trigger.",
          "Incorrect. Blaming cleaners without investigating mechanical systems is unjust and leaves equipment issues unaddressed.",
          "Incorrect. Tariff changes affect monetary cost, but physical kWh consumption overshoots require operational investigation.",
          "Incorrect. Deleting logs is an ethical breach that conceals operational failure and prevents corrective maintenance."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Corrective vs. Preventive Action): What is the fundamental difference between a Corrective Action (CAPA) and a Preventive Action in sustainability management?",
        options: [
          "A corrective action fixes an existing non-conformance that has already occurred; a preventive action eliminates the systemic risk to stop future occurrences before they happen",
          "Corrective actions are carried out by accountants; preventive actions are carried out by external lawyers",
          "Corrective actions are illegal; preventive actions are mandatory",
          "There is no difference; both terms are interchangeable marketing slogans"
        ],
        correct: 0,
        correctExplanation: "Corrective actions remediate detected failures; preventive actions systematically eliminate underlying root causes to prevent recurrence.",
        incorrectExplanation: "Incorrect. Corrective addresses existing incidents, whereas preventive builds long-term institutional resilience.",
        optionFeedback: [
          "Correct! Corrective action resolves the immediate failure, while preventive action redesigns systems/processes to prevent recurrence.",
          "Incorrect. CAPA is an operational quality and environmental management process, not a profession-specific legal task.",
          "Incorrect. Corrective actions are standard, mandatory components of ISO 14001 compliance.",
          "Incorrect. The distinction between reactive correction and proactive prevention is foundational in management systems."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Management Review Meeting): Under ISO 14001 / ESG governance frameworks, what must be reviewed during formal executive Management Reviews?",
        options: [
          "Audit findings, target achievement status, stakeholder feedback, resource adequacy, and required changes to environmental policy and objectives",
          "Solely the catering menu for the upcoming executive annual retreat",
          "A list of employees who took the longest lunch breaks during the year",
          "Personal political opinions of external environmental journalists"
        ],
        correct: 0,
        correctExplanation: "Executive Management Reviews evaluate audit outcomes, KPI progress, resource allocation, and strategic policy updates.",
        incorrectExplanation: "Incorrect. Formal management reviews focus on system adequacy, performance data, and continuous improvement governance.",
        optionFeedback: [
          "Correct! ISO 14001 requires executive reviews to evaluate audit results, target delivery, compliance status, and resource needs.",
          "Incorrect. Management reviews are formal governance checkpoints, not social event planning sessions.",
          "Incorrect. Environmental management reviews evaluate systemic operational performance, not petty time-tracking.",
          "Incorrect. Objective data and regulatory alignment drive governance, not personal political commentary."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Escalation Pathways): When an internal environmental audit discovers an unbunded hazardous chemical storage area, what is the appropriate escalation pathway?",
        options: [
          "Issue an immediate Priority-1 non-conformance notification to the Facility Manager and Safety Officer, isolate the area, and deploy spill bunding within 24 hours",
          "Mention the issue casually in a hallway conversation three months later",
          "Wait for a major storm to wash the chemicals into the municipal drain",
          "Classify the issue as low priority because no spill has happened yet"
        ],
        correct: 0,
        correctExplanation: "High-risk containment breaches require immediate formal escalation, rapid physical containment, and prioritized corrective action.",
        incorrectExplanation: "Incorrect. Unbunded chemicals present catastrophic spill and legal risks requiring immediate Priority-1 containment.",
        optionFeedback: [
          "Correct! Immediate formal escalation and 24-hour secondary containment deployment prevents hazardous environmental contamination.",
          "Incorrect. Delayed casual communication allows severe environmental risks to persist unchecked.",
          "Incorrect. Allowing runoff into municipal drains causes illegal toxic contamination and severe fines.",
          "Incorrect. Secondary containment is a proactive compliance requirement; waiting for a spill is reckless negligence."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Tracking CAPA Effectiveness): How does an environmental manager verify that a corrective action (e.g. replacing a faulty HVAC timer) was genuinely effective?",
        options: [
          "Conduct a 30-day post-fix data verification review of interval nighttime power consumption to confirm baseload returned to expected levels",
          "Close the ticket immediately upon receiving the contractor's invoice without checking meter data",
          "Ask the contractor if they did a good job and accept their word without verification",
          "Assume the repair worked because nobody complained about office temperature"
        ],
        correct: 0,
        correctExplanation: "Effective CAPA processes require post-implementation empirical verification to ensure the underlying failure has been eliminated.",
        incorrectExplanation: "Incorrect. Paying an invoice or assuming success without reviewing data leaves undetected equipment failures unresolved.",
        optionFeedback: [
          "Correct! Post-implementation interval data verification proves whether the technical intervention actually restored energy efficiency.",
          "Incorrect. Invoices confirm billing, not operational efficacy or energy reduction.",
          "Incorrect. Objective data verification is required; contractor self-reporting lacks audit independence.",
          "Incorrect. Nighttime baseload waste occurs when the building is empty, so occupant complaints will not flag it."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Performance Benchmarking): When comparing sustainability performance across multiple retail branches, why should the review committee evaluate performance against both historical baselines and peer group averages?",
        options: [
          "Historical baselines measure internal progress over time, while peer benchmarks identify systemic facility anomalies or best-in-class operational practices",
          "Benchmarking is done solely to rank branches and punish the lowest scoring team",
          "Peer comparisons eliminate the need to collect utility data in future years",
          "Comparing facilities allows high-performing branches to take electricity from low-performing ones"
        ],
        correct: 0,
        correctExplanation: "Combining longitudinal baselines with cross-sectional peer benchmarking reveals both internal progress and best-practice operational gaps.",
        incorrectExplanation: "Incorrect. Benchmarking fosters organizational learning and identifies optimization opportunities across branch networks.",
        optionFeedback: [
          "Correct! Dual benchmarking reveals whether performance gains are internal progress or if structural inefficiencies persist relative to peers.",
          "Incorrect. The goal of benchmarking is continuous learning and scaling best practices, not punitive shaming.",
          "Incorrect. Benchmarking relies on ongoing, accurate utility data collection.",
          "Incorrect. Benchmarking is an analytical process, not physical power redirection."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Underperforming Supplier Intervention): A key waste management contractor consistently fails to provide recycling weighbridge certificates. What is the appropriate commercial corrective action?",
        options: [
          "Issue a formal contractual notice of non-conformance requiring audit compliance within 30 days, withhold service bonus payments, and initiate vendor replacement if unresolved",
          "Ignore the missing certificates and continue paying full contractor invoices indefinitely",
          "Terminate all workplace waste collection immediately and dump garbage on the street",
          "Fabricate fake weighbridge certificates in-house to pass the company audit"
        ],
        correct: 0,
        correctExplanation: "Enforcing contractual compliance through structured notice periods and performance withholding ensures supply chain accountability.",
        incorrectExplanation: "Incorrect. Ignoring contract breaches or forging certificates compromises compliance and violates waste regulations.",
        optionFeedback: [
          "Correct! Structured contractual escalation holds vendors accountable while establishing a clean pathway to re-tender if non-compliance continues.",
          "Incorrect. Paying non-compliant vendors subsidizes poor service and compromises audit credibility.",
          "Incorrect. Illegal dumping on public streets violates national environmental laws and creates health hazards.",
          "Incorrect. Forging weighbridge tickets is criminal fraud."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Continuous Improvement Cycle - PDCA): In the Plan-Do-Check-Act cycle, what does the 'Act' phase require when performance reviews reveal an initiative missed its target?",
        options: [
          "Adjust operational strategies, reallocate resources, update standard operating procedures, and implement revised corrective measures to achieve the goal",
          "Abandon the sustainability programme and declare that environmental goals are impossible",
          "Punish the entire workforce by removing workplace break rooms",
          "Change the company logo to a darker shade of green"
        ],
        correct: 0,
        correctExplanation: "The 'Act' phase takes corrective findings and updates processes, resources, and procedures to drive ongoing continuous improvement.",
        incorrectExplanation: "Incorrect. The PDCA cycle uses variances as feedback to refine methods, enhance training, and adjust resources.",
        optionFeedback: [
          "Correct! The 'Act' phase standardizes improvements, adjusts strategies, and recalibrates resources to achieve sustainable performance.",
          "Incorrect. Variances are opportunities for operational refinement, not reasons to abandon sustainability.",
          "Incorrect. Punitive actions damage morale and undermine employee collaboration.",
          "Incorrect. Changing logo colors is superficial cosmetic branding that delivers zero operational improvement."
        ]
      }
    ]
  },

  // 9. ELH-20 (ID: 164) - Sustainability Roles, Responsibilities and Accountability (10 Questions)
  {
    courseId: 164,
    courseCode: "ELH-20",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (RACI Matrix Implementation): In a corporate energy reduction project, what is the value of implementing a RACI Matrix (Responsible, Accountable, Consulted, Informed)?",
        options: [
          "It eliminates confusion by clarifying exactly who executes the task (R), who holds ultimate sign-off (A), who provides expert input (C), and who receives updates (I)",
          "It allows all employees to disclaim responsibility and blame other departments for delays",
          "It ensures that every single decision requires 100% unanimous approval from all 500 company employees",
          "It is a secret executive code used exclusively for overseas banking transactions"
        ],
        correct: 0,
        correctExplanation: "A RACI matrix establishes clear operational accountability, execution roles, communication channels, and decision authority.",
        incorrectExplanation: "Incorrect. RACI structures prevent diffusion of responsibility and streamline cross-functional project execution.",
        optionFeedback: [
          "Correct! RACI matrices remove ambiguity by defining singular accountability and clear cross-functional responsibilities.",
          "Incorrect. RACI establishes transparent accountability, preventing diffusion of responsibility.",
          "Incorrect. RACI designates singular accountability, avoiding the gridlock of unanimous consensus.",
          "Incorrect. RACI is a standard project management governance framework, not a financial code."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Facility Management Accountability): What core sustainability accountability belongs directly to the Facilities Manager?",
        options: [
          "Maintaining HVAC/lighting operating schedules, optimizing building envelope efficiency, managing utility sub-meters, and ensuring preventative maintenance",
          "Writing external corporate sustainability press releases for international fashion magazines",
          "Auditing employee personal tax returns",
          "Designing the packaging graphics for consumer retail products"
        ],
        correct: 0,
        correctExplanation: "Facility Managers hold operational accountability for building systems, equipment schedules, energy efficiency, and preventative maintenance.",
        incorrectExplanation: "Incorrect. Facility managers focus on physical infrastructure, utility performance, and building operations.",
        optionFeedback: [
          "Correct! Facility managers control the primary physical levers of building energy, water, HVAC, and maintenance efficiency.",
          "Incorrect. External press releases are managed by Communications/PR teams.",
          "Incorrect. Personal taxes are entirely unrelated to corporate facility sustainability.",
          "Incorrect. Product packaging graphics fall under Product Design and Marketing."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Procurement Role in ESG): What specific responsibility does a Procurement Officer hold in advancing corporate sustainability?",
        options: [
          "Embedding environmental and labour compliance criteria into vendor pre-qualification RFPs, evaluating TCO, and verifying supplier certifications",
          "Personally manufacturing every product purchased by the company from raw timber",
          "Refusing to order any spare parts to force employees to work without computers",
          "Approving all vendor invoices without verifying deliveries or contract terms"
        ],
        correct: 0,
        correctExplanation: "Procurement Officers enforce sustainable sourcing standards, whole-life costing, and ethical vendor compliance in the supply chain.",
        incorrectExplanation: "Incorrect. Procurement drives supply chain sustainability through structured RFP criteria and vendor evaluation.",
        optionFeedback: [
          "Correct! Procurement embeds sustainability into contract specifications, supplier scorecards, and purchasing decisions.",
          "Incorrect. Procurement sources from qualified commercial manufacturers; officers do not handcraft products.",
          "Incorrect. Withholding necessary equipment disrupts operations without advancing sustainability.",
          "Incorrect. Unverified invoice approvals violate fundamental financial governance controls."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Frontline Employee Responsibility): What is the primary daily responsibility of individual frontline employees toward corporate sustainability?",
        options: [
          "Practicing daily resource conservation (e.g. switching off idle equipment, sorting waste accurately), reporting leaks/hazards, and following SOPs",
          "Rewriting national environmental protection laws in their spare time",
          "Signing multi-million dollar solar panel contracts without executive approval",
          "Ignoring all workplace safety and environmental rules to finish work faster"
        ],
        correct: 0,
        correctExplanation: "Frontline employees drive sustainability by adopting daily conservation habits, sorting waste, following SOPs, and reporting issues.",
        incorrectExplanation: "Incorrect. Frontline stewardship centers on daily operational habits, hazard reporting, and adhering to company procedures.",
        optionFeedback: [
          "Correct! Everyday frontline actions—turning off idle equipment, waste sorting, and logging maintenance tickets—drive actual results.",
          "Incorrect. National legislation is enacted by parliament, not individual workplace employees.",
          "Incorrect. Major capital contracts require formal delegated financial authority.",
          "Incorrect. Bypassing safety and environmental SOPs causes injuries and compliance violations."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Sustainability Manager vs. Department Heads): When a departmental energy target is missed, who holds primary operational accountability for implementing the fix?",
        options: [
          "The Department Head holds primary operational accountability for their department's performance, supported by technical advisory from the Sustainability Manager",
          "The Sustainability Manager must personally enter the department and operate all machinery",
          "Nobody holds accountability because energy belongs to the electricity utility company",
          "The lowest-paid temporary intern in the department"
        ],
        correct: 0,
        correctExplanation: "Department Heads own operational execution and performance within their units; the Sustainability Manager acts as an internal advisor and enabler.",
        incorrectExplanation: "Incorrect. Line managers own operational performance; sustainability professionals provide expertise, metrics, and facilitation.",
        optionFeedback: [
          "Correct! Line managers own their team's operational results, while the sustainability manager provides technical guidance and metrics.",
          "Incorrect. Sustainability managers advise and facilitate rather than operating departmental machinery.",
          "Incorrect. Organizations own and control their internal consumption.",
          "Incorrect. Accountability rests with designated department leadership, not frontline interns."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Executive Board Governance): What is the fiduciary governance responsibility of the Board of Directors regarding corporate sustainability?",
        options: [
          "Overseeing ESG risks, approving corporate sustainability strategy, ensuring regulatory compliance, and aligning executive compensation with long-term value creation",
          "Personally inspecting every recycling bin in every office building every morning",
          "Ensuring that the company pays zero taxes by moving all operations to unmapped islands",
          "Blocking all environmental spending to maximize immediate dividend payouts for 90 days"
        ],
        correct: 0,
        correctExplanation: "The Board provides strategic oversight, monitors material climate/ESG risks, and ensures long-term corporate viability and compliance.",
        incorrectExplanation: "Incorrect. Boards maintain strategic governance and fiduciary oversight, rather than conducting daily physical bin inspections.",
        optionFeedback: [
          "Correct! Board governance ensures long-term resilience, regulatory compliance, ESG risk oversight, and strategic resource allocation.",
          "Incorrect. Operational bin checks are managed by facility teams, not the Board of Directors.",
          "Incorrect. Unlawful tax evasion violates fiduciary duties and statutory laws.",
          "Incorrect. Depleting long-term resilience for short-term dividends destroys sustainable enterprise value."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Human Resources Role in Sustainability): How does the HR Director embed sustainability accountability across the corporate workforce?",
        options: [
          "Incorporating sustainability performance metrics into job descriptions, onboarding programs, management KPIs, and annual performance appraisal systems",
          "Requiring all job applicants to sign pledges promising never to drive a car",
          "Deleting sustainability references from company policies to simplify employee contracts",
          "Conducting surprise searches of employees' personal lunchboxes for non-organic food"
        ],
        correct: 0,
        correctExplanation: "HR institutionalizes sustainability by embedding green competencies into recruitment, onboarding, KPIs, and appraisal systems.",
        incorrectExplanation: "Incorrect. Formal job descriptions and performance integration create legitimate professional accountability.",
        optionFeedback: [
          "Correct! Integrating sustainability into job competencies, onboarding, and appraisals institutionalizes eco-conscious culture.",
          "Incorrect. Unreasonable personal commute pledges violate labor conventions.",
          "Incorrect. Removing sustainability references degrades organizational alignment.",
          "Incorrect. Invasive personal surveillance violates employee privacy rights and damages trust."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Delegated Authority Limits): Why must delegated authority limits (DoA) for sustainability capital projects (CapEx) be clearly documented?",
        options: [
          "To ensure financial integrity, establish clear approval thresholds for green investments, and prevent unauthorized contractual commitments",
          "To ensure that no sustainability project under $100 can ever be approved",
          "To allow any employee to purchase industrial equipment using personal credit cards without reimbursement",
          "To hide financial transaction records from internal company auditors"
        ],
        correct: 0,
        correctExplanation: "Delegated authority frameworks ensure financial governance, transparency, and proper executive approval of capital investments.",
        incorrectExplanation: "Incorrect. Clear financial delegation frameworks prevent fraud and streamline project approval workflows.",
        optionFeedback: [
          "Correct! Documented authority limits establish transparent governance and streamline approvals for energy-efficiency CapEx.",
          "Incorrect. DoA frameworks establish practical thresholds to expedite small operational expenses while governing major capital.",
          "Incorrect. Uncontrolled personal purchasing bypasses procurement controls and creates financial risk.",
          "Incorrect. Financial delegation frameworks enhance auditability and transparency."
        ]
      },
      {
        order: 9,
        question: "Workplace Scenario (Cross-Functional Accountability Breakdown): When an energy-saving lighting schedule is repeatedly overridden by cleaning crews, how should the issue be resolved?",
        options: [
          "Convene a joint session between Facility Management and the Cleaning Operations supervisor to align shift cleaning schedules with lighting zones and sensor overrides",
          "Permanently cut the electrical power cables to the lights to force cleaning in the dark",
          "Terminate the cleaning contract immediately without investigating why the override occurred",
          "Ignore the issue and pay the resulting high electricity bills"
        ],
        correct: 0,
        correctExplanation: "Collaborative operational alignment between facilities and cleaning supervisors resolves scheduling conflicts safely and permanently.",
        incorrectExplanation: "Incorrect. Cutting wires or immediate firing without investigating creates severe safety hazards and fails to solve the root problem.",
        optionFeedback: [
          "Correct! Joint scheduling and zoned lighting controls enable cleaners to work safely while maintaining energy conservation.",
          "Incorrect. Forcing staff to clean in the dark violates occupational health and safety standards.",
          "Incorrect. Premature contract termination without root cause investigation causes service disruptions.",
          "Incorrect. Ignoring repeated overrides allows continuous electricity waste and budget inflation."
        ]
      },
      {
        order: 10,
        question: "Workplace Decision (Transparency in Accountability Reporting): What is the most credible way for an organization to report on accountability and governance in its annual sustainability report?",
        options: [
          "Publish a clear ESG governance organogram detailing Board oversight committees, executive steering groups, departmental responsibilities, and external audit verifications",
          "State that 'everyone and no one is in charge' to maintain mystery",
          "Claim that an external AI system makes all decisions with zero human oversight",
          "Omit the governance section completely to save space for decorative photographs"
        ],
        correct: 0,
        correctExplanation: "Clear governance structures detailing oversight committees, executive roles, and independent audit verifications prove institutional credibility.",
        incorrectExplanation: "Incorrect. Transparent governance reporting is a mandatory requirement under GRI, ISSB, and CSRD standards.",
        optionFeedback: [
          "Correct! Detailed governance organograms and clear accountability lines satisfy international investor and auditor reporting standards.",
          "Incorrect. Ambiguous leadership claims indicate severe governance failure and deter institutional investors.",
          "Incorrect. Fiduciary and legal accountability cannot be delegated to unmonitored artificial intelligence.",
          "Incorrect. Governance is a core mandatory pillar of comprehensive sustainability disclosure."
        ]
      }
    ]
  },

  // 10. ELH-21 (ID: 102) - Building Employee Engagement in Sustainability (10 Questions)
  {
    courseId: 102,
    courseCode: "ELH-21",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Engagement Strategy): When launching an employee sustainability engagement programme, which approach creates the highest long-term participation?",
        options: [
          "Combining interactive peer-led workshops, tangible workplace actions, gamified team challenges, and executive recognition of employee ideas",
          "Sending a mandatory 80-page legal document by email and threatening employees who do not read it",
          "Placing a single small poster in a locked basement storage room",
          "Banning all employees from speaking during working hours to save vocal energy"
        ],
        correct: 0,
        correctExplanation: "Multi-channel, participatory engagement combining peer leadership, gamification, and leadership recognition drives authentic culture change.",
        incorrectExplanation: "Incorrect. Threatening mandates or unread posters fail to engage employees or build collaborative momentum.",
        optionFeedback: [
          "Correct! Interactive, positive, and recognized participatory initiatives build lasting cultural commitment.",
          "Incorrect. Threatening emails create resentment, resistance, and minimal engagement.",
          "Incorrect. Inaccessible posters provide zero visibility or communication value.",
          "Incorrect. Suppressing communication destroys workplace morale and collaboration."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Incentive Design): What type of incentive structure is most effective for encouraging daily employee waste sorting and energy saving?",
        options: [
          "Team-based recognition awards, social celebrations, tree-planting rewards, and departmental eco-trophies",
          "Paying $0.01 in cash for every piece of paper recycled, creating an incentive to generate more waste paper",
          "Deducting employee paychecks whenever an outdoor street light turns on",
          "Giving individual employees single-use plastic trophies wrapped in three layers of cellophane"
        ],
        correct: 0,
        correctExplanation: "Team-based social recognition and mission-aligned rewards foster shared purpose without creating perverse incentives.",
        incorrectExplanation: "Incorrect. Poorly designed cash incentives can create perverse behaviors, while plastic trophies contradict the sustainability message.",
        optionFeedback: [
          "Correct! Shared team recognition and purpose-driven rewards reinforce collective pride and avoid perverse incentives.",
          "Incorrect. Flawed per-item financial incentives encourage staff to generate extra waste to earn payouts.",
          "Incorrect. Arbitrary wage deductions violate labor regulations and crush engagement.",
          "Incorrect. Gifting single-use plastic contradictions damages sustainability credibility."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Employee Suggestion Scheme): A company sets up a 'Green Ideas Suggestion Box'. How should management handle incoming employee proposals to maintain high engagement?",
        options: [
          "Review proposals monthly with the Green Team, acknowledge all submissions within 5 days, provide constructive feedback, and publicly celebrate adopted ideas",
          "Never open the suggestion box and dispose of all notes in the paper shredder annually",
          "Criticize and mock employees whose ideas cannot be immediately funded",
          "Require employees to pay a $50 administrative fee to submit a green idea"
        ],
        correct: 0,
        correctExplanation: "Prompt acknowledgment, constructive feedback, and public recognition of implemented ideas sustain employee enthusiasm and innovation.",
        incorrectExplanation: "Incorrect. Ignoring suggestions or mocking submissions destroys trust and kills workforce initiative.",
        optionFeedback: [
          "Correct! Timely feedback and celebrating implemented ideas demonstrate management respect and fuel continuous innovation.",
          "Incorrect. Shredding employee ideas destroys trust and discourages all future engagement.",
          "Incorrect. Ridicule creates psychological fear and shuts down employee creativity.",
          "Incorrect. Charging fees for employee suggestions suppresses innovation and damages morale."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Behavioral Nudges): Which behavioral 'nudge' is most effective at reducing office paper printing?",
        options: [
          "Setting all office network printers to double-sided (duplex) black-and-white printing by default with badge-tap authentication",
          "Removing all printer toner completely so no one can print urgent client contracts",
          "Placing warning signs written in all-caps threatening police investigation for printing",
          "Hiding office paper reams in an off-site warehouse 20 kilometers away"
        ],
        correct: 0,
        correctExplanation: "Default duplex printing and badge-tap release eliminate accidental and uncollected print jobs without disrupting legitimate business needs.",
        incorrectExplanation: "Incorrect. Default settings leverage behavioral economics; removing toner or extreme hurdles disrupts critical business operations.",
        optionFeedback: [
          "Correct! Default duplex settings and badge-tap collection reduce paper consumption by up to 30% effortlessly.",
          "Incorrect. Disabling printing completely halts essential commercial operations.",
          "Incorrect. Disproportionate warning signs create workplace cynicism and hostility.",
          "Incorrect. Impractical physical hurdles waste employee travel time and reduce operational productivity."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Overcoming 'Eco-Anxiety' & Cynicism): When employees express feelings of hopelessness that individual workplace actions cannot solve global climate change, how should leadership respond?",
        options: [
          "Frame workplace actions within collective collective collective impact, show local community co-benefits, and highlight how enterprise scale amplifies individual contributions",
          "Agree that everything is doomed and tell employees to give up all eco-friendly habits",
          "Order employees to ignore all environmental news permanently",
          "Mandate that employees work in complete darkness to experience extreme sacrifice"
        ],
        correct: 0,
        correctExplanation: "Connecting daily workplace actions to aggregated institutional scale and local community benefits transforms helplessness into empowering agency.",
        incorrectExplanation: "Incorrect. Fostering collective efficacy and showing tangible local progress counteracts feelings of despair.",
        optionFeedback: [
          "Correct! Demonstrating cumulative organizational impact and tangible local wins restores agency and purpose.",
          "Incorrect. Defeatist messaging paralyzes action and demoralizes the workforce.",
          "Incorrect. Mandating ignorance is counterproductive and impossible in modern workplaces.",
          "Incorrect. Imposing extreme misery alienates employees and distorts genuine sustainability principles."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Gamification Ethics): When designing an inter-departmental energy reduction competition, what rule ensures the game is fair and ethical?",
        options: [
          "Normalize energy savings against departmental headcount and baseline equipment loads to ensure fair comparison between office and operational units",
          "Compare raw electricity bills directly, guaranteeing the 2-person HR department always beats the 100-person manufacturing plant",
          "Encourage departments to secretly switch off safety exhaust fans in competitor departments",
          "Declare the executive floor the automatic winner every week regardless of data"
        ],
        correct: 0,
        correctExplanation: "Normalizing metrics against headcount and operational baselines ensures fair competition across departments with differing operational profiles.",
        incorrectExplanation: "Incorrect. Comparing unadjusted absolute consumption creates unfair contests, while tampering with safety equipment is dangerous.",
        optionFeedback: [
          "Correct! Baseline-normalized metrics ensure equitable competition between high-intensity operational areas and standard offices.",
          "Incorrect. Comparing raw kilowatt-hours between differing department sizes creates an unfair, demotivating competition.",
          "Incorrect. Tampering with safety equipment violates life-safety regulations and creates extreme hazards.",
          "Incorrect. Rigged outcomes destroy trust and ruin engagement programmes."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Onboarding New Hires): How should corporate sustainability culture be introduced to newly hired employees during their first week?",
        options: [
          "Include a dedicated sustainability module in onboarding covering waste sorting, energy habits, green team opportunities, and company ESG commitments",
          "Never mention sustainability during onboarding to avoid distracting new hires",
          "Require new hires to clean all facility windows by hand on their first morning",
          "Test new hires on 500 pages of environmental chemistry without any training"
        ],
        correct: 0,
        correctExplanation: "Integrating practical green practices and cultural values into new hire onboarding establishes eco-conscious habits from day one.",
        incorrectExplanation: "Incorrect. Early cultural immersion during onboarding sets clear behavioral norms and high engagement from the start.",
        optionFeedback: [
          "Correct! Day-one onboarding builds immediate cultural alignment, explains site-specific sorting rules, and invites participation.",
          "Incorrect. Omitting sustainability during onboarding misses the most receptive window for establishing good habits.",
          "Incorrect. Hazing new hires with manual labor violates professional HR ethics.",
          "Incorrect. Testing without instruction creates unnecessary anxiety and achieves zero educational value."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Lunch & Learn Sessions): What format makes a 'Lunch and Learn' sustainability session most engaging for office workers?",
        options: [
          "A 30-minute interactive workshop with practical lifestyle/workplace demonstrations, guest speakers, healthy refreshments, and open audience Q&A",
          "A 3-hour monotone lecture reading technical legal definitions of hazardous waste statutes without slides",
          "Forcing employees to stand outside in the rain while an executive delivers a speech",
          "Cancelling lunch breaks entirely and locking the cafeteria doors"
        ],
        correct: 0,
        correctExplanation: "Concise, interactive sessions with practical demonstrations, relatable takeaways, and open discussions maximize attendance and learning retention.",
        incorrectExplanation: "Incorrect. Long, dry lectures or harsh physical conditions alienate employees and depress voluntary participation.",
        optionFeedback: [
          "Correct! Bite-sized, interactive sessions with practical takeaways and open dialogue maximize engagement and attendance.",
          "Incorrect. Monotone legalistic lectures cause cognitive fatigue and disinterest.",
          "Incorrect. Uncomfortable physical conditions show disrespect and drive employees away.",
          "Incorrect. Eliminating meal breaks violates statutory labor regulations."
        ]
      },
      {
        order: 9,
        question: "Workplace Scenario (Volunteer Days & Community Impact): How can corporate volunteer days be structured to deliver genuine sustainability value rather than superficial photo-ops?",
        options: [
          "Partner with verified local conservation NGOs, provide meaningful hands-on restoration work (e.g. endemic tree planting), and measure long-term survival rates",
          "Drive 50 employees to a beach in luxury diesel buses, take a 5-minute photo holding one plastic bottle, and leave immediately",
          "Force employees to landscape the private residential garden of the company CEO",
          "Release 1,000 non-native invasive plants into a protected national park"
        ],
        correct: 0,
        correctExplanation: "Partnering with legitimate NGOs for structured conservation work with measured ecological outcomes delivers genuine, lasting impact.",
        incorrectExplanation: "Incorrect. Staged photo-ops or planting invasive species causes environmental damage and constitutes greenwashing.",
        optionFeedback: [
          "Correct! NGO partnerships with measurable ecological outcomes (e.g. tree survival tracking) ensure authentic conservation impact.",
          "Incorrect. Superficial photo-ops waste resources and generate cynical greenwashing accusations.",
          "Incorrect. Using corporate volunteer hours for private executive property is an unethical abuse of company resources.",
          "Incorrect. Introducing non-native invasive species destroys native island biodiversity."
        ]
      },
      {
        order: 10,
        question: "Workplace Decision (Sustaining Long-Term Engagement): What is the single most critical factor in sustaining employee engagement in sustainability across 3+ years?",
        options: [
          "Visible, authentic leadership commitment that backs employee initiatives with real budget, responsive feedback, and continuous transparent communication",
          "Changing the slogan of the sustainability programme every single week",
          "Threatening employees with disciplinary action if engagement survey scores drop",
          "Hiring an external celebrity to record a 10-second generic greeting video"
        ],
        correct: 0,
        correctExplanation: "Authentic, ongoing leadership support with budget backing and genuine two-way dialogue sustains cultural commitment over the long term.",
        incorrectExplanation: "Incorrect. Superficial celebrity endorsements or punitive surveys cannot replace authentic executive commitment and resource backing.",
        optionFeedback: [
          "Correct! Executive role modeling, resource allocation, and responsive feedback create an enduring, authentic sustainability culture.",
          "Incorrect. Constantly shifting slogans creates brand confusion and project fatigue.",
          "Incorrect. Punitive threats undermine authentic employee trust and participation.",
          "Incorrect. Superficial celebrity endorsements fail to drive daily operational habits or organizational change."
        ]
      }
    ]
  },

  // 11. ELH-22 (ID: 143) - Creating and Running Effective Green Teams (10 Questions)
  {
    courseId: 143,
    courseCode: "ELH-22",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Green Team Inception): When forming a new workplace Green Team, what is the most effective initial action to build momentum?",
        options: [
          "Identify an enthusiastic multi-departmental core group, secure executive sponsorship, and complete a high-visibility 'quick win' project within 60 days",
          "Attempt to solve all global climate challenges simultaneously in the first week with zero budget",
          "Draft a 400-page theoretical constitution before speaking to any coworkers",
          "Appoint only employees who have expressed vocal hatred for environmental initiatives"
        ],
        correct: 0,
        correctExplanation: "Securing an executive sponsor and executing a visible quick win builds credibility, confidence, and organizational enthusiasm early.",
        incorrectExplanation: "Incorrect. Overly ambitious scopes or theoretical paperwork without visible action leads to rapid team stagnation.",
        optionFeedback: [
          "Correct! Multi-departmental energy, executive backing, and an early quick win prove the Green Team's practical value immediately.",
          "Incorrect. Overreaching scopes without resources guarantee early burnout and project failure.",
          "Incorrect. Excessive theoretical drafting without practical action stalls team momentum.",
          "Incorrect. Hostile appointments without voluntary interest sabotage team collaboration."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Budget & Resource Management): How should a Green Team manage its annual micro-budget for maximum sustainability ROI?",
        options: [
          "Allocate funds toward initiatives that generate utility cost savings (which can be reinvested) or high-impact employee engagement toolkits",
          "Spend 100% of the budget on single-use printed flyers that are discarded within two hours",
          "Keep the funds in an unmonitored personal cryptocurrency wallet",
          "Spend the entire budget on gourmet imported snacks for committee members only"
        ],
        correct: 0,
        correctExplanation: "Reinvesting utility savings into green revolving funds creates a self-sustaining financial model for Green Team initiatives.",
        incorrectExplanation: "Incorrect. Wasteful spending on disposable flyers or private snacks destroys budget credibility and project viability.",
        optionFeedback: [
          "Correct! Revolving fund models and high-leverage engagement tools maximize financial returns and environmental impact.",
          "Incorrect. Single-use printed flyers generate litter and represent poor financial stewardship.",
          "Incorrect. Storing corporate funds in personal crypto wallets violates financial compliance.",
          "Incorrect. Misusing budgets for private member perks undermines organizational trust."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Setting Measurable Green Team Goals): Which of the following represents a high-quality annual goal for a workplace Green Team?",
        options: [
          "Achieve a 20% reduction in single-use cafeteria disposables and launch a certified composting stream for 500 kg/month of food waste within 6 months",
          "Make the entire office vibe feel more spiritual and harmonious by next Thursday",
          "Force every employee to commute on a skateboard regardless of age or physical ability",
          "Eliminate all workplace computers and return to handwritten ledgers"
        ],
        correct: 0,
        correctExplanation: "High-quality goals define quantifiable targets, clear mechanisms, and realistic operational delivery timeframes.",
        incorrectExplanation: "Incorrect. Vague aspirations or impractical mandates lack operational rigor and measurability.",
        optionFeedback: [
          "Correct! Quantified metrics (20% reduction, 500 kg/month) with defined timelines create clear accountability and measurable impact.",
          "Incorrect. Vague feelings lack quantifiable indicators and operational mechanisms.",
          "Incorrect. Impractical commute mandates violate diversity, inclusion, and safety standards.",
          "Incorrect. Abandoning digital systems degrades productivity and increases physical paper consumption."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Overcoming Mid-Year Slump): When a Green Team experiences declining attendance and project stagnation after 6 months, what is the best renewal strategy?",
        options: [
          "Re-align projects with core business priorities, rotate project leads to give fresh members ownership, and celebrate accomplishments with an executive showcase",
          "Threaten absent members with disciplinary letters from Human Resources",
          "Disband the Green Team permanently and declare that employees do not care about the planet",
          "Double the length of weekly meetings from 1 hour to 4 hours"
        ],
        correct: 0,
        correctExplanation: "Refreshing leadership roles, re-aligning priorities with business value, and celebrating milestones revitalizes team energy.",
        incorrectExplanation: "Incorrect. Coercion or longer meetings exacerbate fatigue and accelerate team collapse.",
        optionFeedback: [
          "Correct! Rotating responsibilities, sharpening priorities, and showcasing successes injects new momentum and leadership energy.",
          "Incorrect. Punitive threats destroy voluntary enthusiasm and alienate employees.",
          "Incorrect. Premature dissolution throws away existing institutional knowledge and progress.",
          "Incorrect. Longer meetings increase cognitive fatigue and worsen attendance dropouts."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Facility Collaboration): When the Green Team wants to introduce food waste composting, how should they engage the Facilities and Custodial team?",
        options: [
          "Co-design the collection workflow with custodial staff, ensure proper bin placement and odour control, and provide practical training and ergonomic equipment",
          "Place unlabelled buckets of rotting food in hallways without informing the cleaning staff",
          "Demand that cleaners work unpaid extra hours to sort food waste by hand",
          "Dump raw food waste directly into the facility air conditioning ducts"
        ],
        correct: 0,
        correctExplanation: "Collaborative workflow design with custodial staff ensures practical feasibility, hygiene, odour control, and mutual respect.",
        incorrectExplanation: "Incorrect. Unilateral actions without custodial coordination create hygiene hazards, pest infestations, and workplace friction.",
        optionFeedback: [
          "Correct! Engaging custodial teams as co-designers ensures operational ergonomics, hygiene, and lasting operational success.",
          "Incorrect. Unlabelled food bins cause pest infestations, foul odours, and custodial friction.",
          "Incorrect. Demanding unpaid labor violates employment contracts and statutory regulations.",
          "Incorrect. Dumping organic waste into HVAC systems causes severe biohazard contamination."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Effective Meeting Facilitation): What facilitation practice keeps Green Team meetings focused, productive, and respectful of members' time?",
        options: [
          "Circulate a clear agenda 48 hours in advance, timebox each discussion topic, document assigned action owners with deadlines, and end on time",
          "Allow the most talkative person to speak for 50 minutes about unrelated personal hobbies",
          "Never write down action items so no one can be held responsible for delivering results",
          "Start meetings 30 minutes late and run an hour over schedule every week"
        ],
        correct: 0,
        correctExplanation: "Structured agendas, strict timeboxing, documented action logs, and punctuality maintain high engagement and execution speed.",
        incorrectExplanation: "Incorrect. Unstructured, meandering meetings waste valuable employee time and depress future attendance.",
        optionFeedback: [
          "Correct! Professional meeting hygiene—agendas, timeboxing, and clear action logs—respects volunteer time and drives results.",
          "Incorrect. Unfocussed rambling derails project delivery and frustrates team members.",
          "Incorrect. Failing to document action items guarantees project inertia and forgotten commitments.",
          "Incorrect. Chronic unpunctuality signals disrespect for colleagues' schedules and degrades morale."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Expanding Green Team Reach across Shifts): How can a Green Team engage night-shift manufacturing or customer service employees who cannot attend daytime meetings?",
        options: [
          "Appoint dedicated night-shift Green Champions, hold asynchronous digital idea boards, and conduct brief shift-change handover briefings",
          "Exclude night-shift employees completely because only day-shift staff understand sustainability",
          "Force night-shift workers to stay awake during the day to attend 2:00 PM meetings without sleep",
          "Turn off all facility heating and ventilation during night shifts to save energy"
        ],
        correct: 0,
        correctExplanation: "Designating shift-specific champions and utilizing asynchronous channels ensures inclusive participation across all working schedules.",
        incorrectExplanation: "Incorrect. Excluding shift workers or depriving them of sleep causes fatigue, resentment, and severe safety hazards.",
        optionFeedback: [
          "Correct! Shift-specific champions and asynchronous digital channels ensure comprehensive 24/7 organizational engagement.",
          "Incorrect. Shift workers manage critical operational equipment and must be fully included in sustainability efforts.",
          "Incorrect. Depriving shift workers of rest causes dangerous industrial fatigue and safety violations.",
          "Incorrect. Cutting HVAC during night shifts violates occupational health and safety laws."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Communicating Green Team Wins): How should a Green Team communicate its annual achievements to the wider company?",
        options: [
          "Publish an engaging visual impact infographic highlighting verified utility savings, trees saved, employee volunteer hours, and recognition of key contributors",
          "Send a threatening email demanding that everyone thank the Green Team immediately",
          "Keep all achievements confidential to avoid making other departments jealous",
          "Post raw unformatted financial spreadsheets on the cafeteria refrigerator"
        ],
        correct: 0,
        correctExplanation: "Visual infographics highlighting verified metrics and contributor recognition celebrate successes and reinforce cultural buy-in.",
        incorrectExplanation: "Incorrect. Clear, visual impact reporting builds organizational pride; aggressive demands or confidentiality suppress engagement.",
        optionFeedback: [
          "Correct! Engaging infographics with verified metrics and peer recognition build company-wide pride and attract new volunteers.",
          "Incorrect. Demanding praise breeds resentment and alienates colleagues.",
          "Incorrect. Transparency is vital for inspiring wider participation across the organization.",
          "Incorrect. Dense raw financial sheets fail to communicate the human and environmental narrative."
        ]
      },
      {
        order: 9,
        question: "Workplace Scenario (Green Team Succession Planning): What ensures a Green Team survives and thrives when the founding Team Lead leaves the company?",
        options: [
          "Establish a Co-Chair leadership model, document standard operating procedures in a shared repository, and cultivate active vice-leads",
          "Ensure that only the founding lead holds all project passwords and contact lists in their personal head",
          "Disband the Green Team immediately upon the lead's departure and cancel all active projects",
          "Lock the Green Team office and instruct staff never to speak of the former lead"
        ],
        correct: 0,
        correctExplanation: "Co-chair models, documented repository SOPs, and distributed leadership ensure institutional continuity and seamless succession.",
        incorrectExplanation: "Incorrect. Centralizing knowledge in one person creates a single point of failure that jeopardizes programme longevity.",
        optionFeedback: [
          "Correct! Distributed leadership models and centralized institutional documentation guarantee long-term operational resilience.",
          "Incorrect. Single-person knowledge silos create severe risks of programme collapse upon departure.",
          "Incorrect. Disbanding teams destroys accumulated momentum, partnerships, and progress.",
          "Incorrect. Open transitions and continuous succession planning reflect mature governance."
        ]
      },
      {
        order: 10,
        question: "Workplace Decision (Strategic Alignment): How can a Green Team ensure its initiatives remain protected during corporate budget tightening?",
        options: [
          "Demonstrate direct operational cost reductions (e.g. avoided utility/waste expenses), compliance risk mitigation, and tangible employee retention benefits",
          "Argue that sustainability is purely spiritual and should never be measured in financial terms",
          "Conceal all project costs from the Chief Financial Officer",
          "Protest in the CEO's office until all corporate budgets are restored"
        ],
        correct: 0,
        correctExplanation: "Proving tangible financial returns, avoided utility costs, and risk mitigation ensures sustainability is viewed as a high-value business asset.",
        incorrectExplanation: "Incorrect. Demonstrating bottom-line savings and risk reduction protects programmes during corporate austerity cycles.",
        optionFeedback: [
          "Correct! Aligning green projects with hard bottom-line utility savings and risk mitigation protects budgets during economic downturns.",
          "Incorrect. Disregarding financial realities undermines executive credibility and invites immediate programme cancellation.",
          "Incorrect. Hiding costs breaches financial governance and leads to immediate disciplinary action.",
          "Incorrect. Disruption without business value cases fails to secure executive support."
        ]
      }
    ]
  },

  // 12. ELH-23 (ID: 944) - Planning and Delivering Workplace Sustainability Initiatives (8 Questions)
  {
    courseId: 944,
    courseCode: "ELH-23",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Project Lifecycle Phases): What are the essential chronological phases of delivering a workplace sustainability capital project?",
        options: [
          "Feasibility & Business Case -> Stakeholder Approval -> Detailed Design & Procurement -> Implementation & Commissioning -> Measurement & Verification (M&V)",
          "Purchase equipment -> Install immediately -> Write business case -> Ask for executive permission -> Discard project",
          "Celebrate project completion -> Purchase equipment -> Conduct feasibility audit -> Cancel project",
          "Complain about energy costs -> Wait 5 years -> Apply for bank loan -> Retire from company"
        ],
        correct: 0,
        correctExplanation: "Structured project lifecycles follow feasibility, approval, design/procurement, commissioning, and post-installation M&V.",
        incorrectExplanation: "Incorrect. Purchasing equipment before feasibility analysis or approvals violates capital governance and leads to project failure.",
        optionFeedback: [
          "Correct! Rigorous project stage-gating—from feasibility through M&V—ensures financial discipline and verified outcomes.",
          "Incorrect. Purchasing before approval breaches financial controls and risks buying improper equipment.",
          "Incorrect. Celebration must follow verified commissioning and post-installation measurement.",
          "Incorrect. Structured project management requires proactive execution rather than passive delay."
        ]
      },
      {
        order: 2,
        question: "Workplace Decision (Financial Modeling - Simple Payback vs. NPV): Why should a facility manager present Net Present Value (NPV) and Internal Rate of Return (IRR) alongside Simple Payback for a major solar PV project?",
        options: [
          "NPV and IRR account for the time value of money, multi-year energy price inflation, and full 25-year asset lifespan returns",
          "NPV and IRR are used solely to make financial spreadsheets look longer and more confusing",
          "Simple payback is the only financial metric recognized by corporate boards",
          "NPV guarantees that solar panels will generate electricity at night"
        ],
        correct: 0,
        correctExplanation: "NPV and IRR capture the full multi-decade financial yield, discounting future cash flows and reflecting rising utility tariffs.",
        incorrectExplanation: "Incorrect. Simple payback ignores post-payback cash flows and the time value of money, undervaluing long-life assets.",
        optionFeedback: [
          "Correct! NPV and IRR reflect whole-life financial returns, time value of money, and lifecycle cost savings.",
          "Incorrect. Discounted cash flow metrics provide rigorous, standard financial evaluation for corporate treasuries.",
          "Incorrect. Boards and CFOs rely heavily on NPV, IRR, and LCOE for multi-million capital allocations.",
          "Incorrect. Financial metrics model economics; they do not alter the physics of solar photovoltaics."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Vendor Scope of Work & RFP): When issuing a Request for Proposal (RFP) for a chiller retrofit, what critical performance guarantee clause must be included?",
        options: [
          "A guaranteed Coefficient of Performance (COP) or specific power consumption (kW/ton) with clear liquidated damages for performance shortfalls",
          "A clause requiring the contractor to paint the chiller in bright neon glitter paint",
          "A requirement that the contractor never measure or record the chiller's electrical consumption",
          "A waiver exempting the vendor from all equipment warranties and local electrical safety codes"
        ],
        correct: 0,
        correctExplanation: "Performance-guaranteed contracts tie vendor payments to verified efficiency ratings (COP/kW-per-ton), protecting investment ROI.",
        incorrectExplanation: "Incorrect. Efficiency guarantees ensure the asset delivers modeled energy savings, backed by contractual performance covenants.",
        optionFeedback: [
          "Correct! Contractual efficiency guarantees (kW/ton) and warranty covenants protect capital investments against underperforming assets.",
          "Incorrect. Aesthetic paint requirements provide zero thermodynamic efficiency or financial value.",
          "Incorrect. Verifying electrical consumption is essential for post-installation commissioning and M&V.",
          "Incorrect. Waiving safety codes and warranties exposes the enterprise to severe legal, financial, and safety liabilities."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Pilot Testing vs. Full Rollout): Why should an enterprise pilot a new smart thermostat system in a single building zone before rolling it out across 20 facilities?",
        options: [
          "Piloting validates occupant comfort, user interface usability, network stability, and actual energy savings in real conditions before committing full CapEx",
          "Piloting is done solely to delay project completion by five years",
          "Piloting allows the company to avoid paying the technology supplier for hardware",
          "Piloting eliminates the need for software licenses during full rollout"
        ],
        correct: 0,
        correctExplanation: "Piloting de-risks capital expenditure by testing technology integration, real-world savings, and occupant acceptance in live environments.",
        incorrectExplanation: "Incorrect. Pilot testing identifies technical integration glitches and calibrates savings models before scaling capital commitments.",
        optionFeedback: [
          "Correct! Controlled pilot testing validates savings claims, de-risks technical integration, and optimizes configuration before full rollout.",
          "Incorrect. Structured pilots are agile and timeboxed (30–90 days) to de-risk investments, not cause multi-year delays.",
          "Incorrect. Commercial pilots operate under formal pilot agreements with defined evaluation criteria.",
          "Incorrect. Scaled rollouts require proper enterprise software and hardware licensing."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Change Management & User Adoption): An enterprise installs high-efficiency sensor taps in office restrooms, but staff complain the flow duration is too short to wash soap off. What is the appropriate response?",
        options: [
          "Calibrate the sensor timer duration from 3 seconds to a comfortable 7–10 seconds and test water flow with staff representatives",
          "Permanently disable all water supply to the restrooms to force compliance",
          "Rip out all sensor taps and replace them with unvalved open pipes running 24/7",
          "Issue formal reprimands to employees who wash their hands"
        ],
        correct: 0,
        correctExplanation: "Calibrating flow duration balances water conservation with hygiene and user satisfaction, preventing frustration and bypass attempts.",
        incorrectExplanation: "Incorrect. Setting flow times too short compromises hygiene and leads to user frustration, while removing controls wastes water.",
        optionFeedback: [
          "Correct! Fine-tuning sensor timing balances water conservation with proper hand hygiene and user satisfaction.",
          "Incorrect. Cutting off water supply violates basic sanitation and occupational health standards.",
          "Incorrect. Continuous open running water causes massive waste and utility budget inflation.",
          "Incorrect. Punishing basic hygiene violates workplace health standards and common sense."
        ]
      },
      {
        order: 6,
        question: "Workplace Decision (Project Risk Register & Contingency): What critical risk must be documented in the risk register for a rainwater harvesting tank installation during monsoon season?",
        options: [
          "Heavy rainfall during excavation leading to trench collapse and foundation flooding, requiring dewatering pumps and reinforced shoring",
          "The risk that rainwater will permanently turn into solid gold",
          "The risk that clouds will disappear from the planet forever during the monsoon",
          "The risk that municipal water will become free of charge worldwide"
        ],
        correct: 0,
        correctExplanation: "Construction risk registers must identify severe weather, trench collapse, and waterlogging hazards, establishing proactive mitigation controls.",
        incorrectExplanation: "Incorrect. Construction risk management addresses practical geotechnical, weather, and physical excavation safety risks.",
        optionFeedback: [
          "Correct! Identifying excavation collapse and flood risks during rainy seasons allows proactive shoring and dewatering controls.",
          "Incorrect. Fanciful scenarios distract from genuine occupational safety and environmental engineering risks.",
          "Incorrect. Monsoons are characterized by heavy precipitation, making trench waterlogging the primary risk.",
          "Incorrect. Commercial utility pricing is subject to tariffs, not sudden worldwide free supply."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Measurement & Verification - IPMVP Standards): Under the International Performance Measurement and Verification Protocol (IPMVP), how are energy savings accurately determined?",
        options: [
          "Savings = (Baseline Period Energy ± Routine/Non-Routine Adjustments) - Reporting Period Energy",
          "Savings = Whatever number makes the project look most profitable to the Board",
          "Savings = Total electricity bill from 10 years ago multiplied by zero",
          "Savings cannot be measured and must always be guessed by the contractor"
        ],
        correct: 0,
        correctExplanation: "IPMVP establishes the mathematical standard for energy savings by adjusting baseline consumption for weather and production variables.",
        incorrectExplanation: "Incorrect. IPMVP standardizes rigorous baseline adjustment calculations to isolate true energy conservation from external variables.",
        optionFeedback: [
          "Correct! IPMVP methodology mathematically adjusts baseline data for variables (weather, occupancy) to isolate true savings.",
          "Incorrect. Fabricating savings numbers breaches accounting standards and invalidates ESG disclosures.",
          "Incorrect. Multiplying historical baselines by zero is mathematically meaningless.",
          "Incorrect. IPMVP is an internationally recognized empirical measurement protocol."
        ]
      },
      {
        order: 8,
        question: "Workplace Decision (Handover & Long-Term Asset Stewardship): What documentation must be formally handed over to the facilities maintenance team upon commissioning a new solar PV system?",
        options: [
          "As-built electrical single-line diagrams, manufacturer O&M manuals, warranty certificates, inverter commissioning test sheets, and cleaning SOPs",
          "A single handwritten note saying 'good luck' taped to the main gate",
          "No documentation is needed because solar panels operate forever with zero maintenance",
          "The contractor's personal holiday photo album"
        ],
        correct: 0,
        correctExplanation: "Complete handover packages—as-built drawings, O&M manuals, test logs, warranties, and cleaning SOPs—ensure safe, long-term asset operation.",
        incorrectExplanation: "Incorrect. Proper technical as-builts, commissioning test logs, and maintenance SOPs are mandatory for asset stewardship and safety.",
        optionFeedback: [
          "Correct! As-built electrical schematics, O&M manuals, test records, and cleaning protocols ensure safe, efficient 25-year asset lifecycle operation.",
          "Incorrect. Informal notes without technical drawings create extreme electrical hazard risks for future maintenance technicians.",
          "Incorrect. Solar arrays require regular module cleaning, thermal drone scans, and inverter servicing.",
          "Incorrect. Unrelated personal files provide zero technical or operational value."
        ]
      }
    ]
  }
];

export async function ensureCohort15_2_10BRemediation(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      logger.info("Executing Sprint 15.2.10B Controlled Assessment Quality Remediation...");

      for (const cohortData of COHORT_15_2_10B_DATA) {
        const { courseId, courseCode, passingScore, questions } = cohortData;

        // 1. Update course passing score to standardized 80%
        await tx
          .update(coursesTable)
          .set({
            passingScore,
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, courseId));

        // 2. Re-seed questions with complete optionFeedback and scenario depth
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

        logger.info({ courseId, courseCode, count: questions.length }, "Remediated course assessment with complete option-level feedback and scenarios.");
      }

      // Record seed version
      await tx
        .insert(systemSeedsTable)
        .values({
          name: "sprint-15-2-10b-assessment-remediation",
          version: 1,
        })
        .onConflictDoUpdate({
          target: systemSeedsTable.name,
          set: { version: 1, runAt: new Date() },
        });

      logger.info("Sprint 15.2.10B Controlled Assessment Quality Remediation transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute Sprint 15.2.10B assessment remediation");
    throw err;
  }
}
`;

fs.writeFileSync(targetPath, content, "utf8");
console.log("Successfully generated", targetPath);
