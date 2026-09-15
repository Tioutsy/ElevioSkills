import fs from "fs";
import path from "path";

// Define the comprehensive dataset for Cohort 15.2.10B
const cohortData = [
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
  }
];

// Let us add courses 4 to 12 in the array
