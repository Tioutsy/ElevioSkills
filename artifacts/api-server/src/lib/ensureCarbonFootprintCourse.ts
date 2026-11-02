import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { logger } from "./logger";

const COURSE_ID = 7;
const COURSE_SLUG = "carbon-footprint-awareness";
const COURSE_TITLE = "Carbon Footprint Awareness";
const BADGE_SLUG = "carbon-aware";
const SEED_NAME = "carbon-footprint-awareness-v4";
const SKELETON_BADGE_SLUG = "carbon-aware"; // catalogue skeleton slug — do not delete

const COURSE_META = {
  description:
    "Gain a plain-language understanding of greenhouse gas emissions, Scope 1–3 boundaries, activity data versus emission factors, and workplace decisions without turning into a specialist carbon accountant.",
  fullDescription:
    "This course helps employees across all roles understand what a carbon footprint represents, how daily workplace activities connect to greenhouse gas emissions, how Scope 1, Scope 2, and Scope 3 emissions differ, how activity data is gathered, and how to avoid unsupported greenwashing claims in Mauritian facilities.",
  categoryId: 1,
  durationMinutes: 18,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/carbon-footprint-awareness.jpg",
  learningObjectives: [
    "Explain a carbon footprint and greenhouse gas emissions in plain workplace language.",
    "Distinguish direct emissions (Scope 1), purchased energy (Scope 2), and value-chain emissions (Scope 3).",
    "Distinguish measurable activity data (litres, kWh, km) from emission factors and final carbon calculations.",
    "Map major emissions sources across workplace energy, transport, goods, waste, and refrigerants.",
    "Avoid unsupported carbon claims, guessed figures, and misleading 'carbon-neutral' greenwashing slogans.",
    "Distinguish employee direct actions from data verification, accounting methodology, and management escalation.",
    "Select one practical workplace carbon commitment to support reliable data and emissions awareness."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Carbon Footprint Awareness. You can now recognise how workplace decisions connect to greenhouse gas emissions, understand Scope 1–3 boundaries, and support reliable carbon data collection safely.",
  badgeName: "Carbon Awareness Contributor",
  badgeDescription:
    "Awarded for demonstrating plain-language carbon awareness, understanding Scope 1–3 emissions, and supporting reliable workplace activity data.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Understanding Workplace Carbon Footprints",
    minutes: 3,
    content: "Learn what a carbon footprint represents and why data verification matters.",
    blocks: [
      { id: "cfa1-h1", type: "heading", position: 1, headingText: "Why Emissions Data Requires Evidence" },
      { id: "cfa1-t1", type: "short_text", position: 2, bodyText: "At a management meeting, a team asks why the company's annual carbon footprint increased despite employees printing less paper. Staff offer guesses: 'It must be the delivery trucks,' or 'We switched power suppliers, so our footprint should be zero.' The sustainability lead points to the data: generator diesel fuel increased and a major refrigerant leak occurred." },
      { id: "cfa1-k1", type: "key_message", position: 3, headingText: "Emissions Require Measurement, Not Guesses", bodyText: "A carbon footprint is an estimate of total greenhouse gas emissions caused directly and indirectly by an activity or organization. Visible habits (like paper) are important, but energy, fuel, and refrigerants often create far greater emissions." },
      {
        id: "cfa1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Evaluating carbon claims scenario:",
        decisionPrompt: "A vendor claims their service is '100% Carbon Neutral' but provides no data, reporting boundary, or verification sheet. What should you do?",
        decisionChoices: [
          { label: "Treat the claim as unverified marketing and request official methodology or reporting evidence before repeating it", correct: true, feedback: "Perfect! Public carbon claims require defined boundaries, recognized methodologies, and verifiable evidence." },
          { label: "Publish the 'Carbon Neutral' claim on the company website immediately", correct: false, feedback: "Incorrect! Repeating unverified carbon slogans exposes the company to greenwashing risks." },
          { label: "Assume all carbon calculations are fake and refuse to collect energy records", correct: false, feedback: "Incorrect. Operational energy and fuel data must be collected accurately." }
        ]
      },
      {
        id: "cfa1-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "What is a carbon footprint in simple workplace terms?",
        mcqOptions: [
          "An estimate of total greenhouse gas emissions caused directly and indirectly by an activity, expressed as CO2 equivalent (CO2e)",
          "The physical dirt left on office floors by employee shoes",
          "A tax paid exclusively on paper printing invoices",
          "A guarantee that a company produces zero pollution"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "A carbon footprint estimates direct and indirect greenhouse gas emissions in CO2 equivalent units.",
        mcqIncorrectExplanation: "Incorrect. A carbon footprint measures greenhouse gas emissions associated with activities."
      }
    ]
  },
  {
    order: 1,
    title: "Carbon Terminology: GHGs, CO2e & Activity Data",
    minutes: 4,
    content: "Master core carbon terms in plain English without technical accounting confusion.",
    blocks: [
      { id: "cfa2-h1", type: "heading", position: 1, headingText: "Plain-Language Carbon Vocabulary" },
      { id: "cfa2-t1", type: "short_text", position: 2, bodyText: "To participate intelligently in workplace sustainability, understand four fundamental terms:" },
      {
        id: "cfa2-k1",
        type: "key_message",
        position: 3,
        headingText: "Core Vocabulary",
        bodyText: "• Greenhouse Gases (GHGs): Heat-trapping gases including Carbon Dioxide (CO2), Methane (CH4), Nitrous Oxide (N2O), and Refrigerants.\n• CO2 Equivalent (CO2e): A standard unit that expresses the warming effect of different GHGs in one comparable measure.\n• Activity Data: Measurable operational quantities (litres of diesel, kWh of electricity, km driven, kg of refrigerant refilled).\n• Emission Factor: An authorized multiplier used to convert raw activity data into estimated GHG emissions."
      },
      {
        id: "cfa2-w1",
        type: "workplace_example",
        position: 4,
        headingText: "Data Rule: Measure Activity, Do Not Guess Factors",
        bodyText: "CRITICAL DATA PRINCIPLE: Employees should collect exact, verifiable activity data (invoices, meter logs, fuel receipts). Never invent missing figures or search randomly online for emission factors—authorized reporting leads apply official factors."
      }
    ]
  },
  {
    order: 2,
    title: "Scope 1, Scope 2 & Scope 3 Emissions & Sourced Facts",
    minutes: 4,
    content: "Understand direct, energy, and value-chain emissions scopes and learn sourced GHG facts.",
    blocks: [
      { id: "cfa3-h1", type: "heading", position: 1, headingText: "The Three Greenhouse Gas Scopes" },
      { id: "cfa3-t1", type: "short_text", position: 2, bodyText: "Greenhouse gas reporting categorizes emissions into three distinct scopes based on operational control:" },
      {
        id: "cfa3-k1",
        type: "key_message",
        position: 3,
        headingText: "Scope 1, Scope 2 & Scope 3",
        bodyText: "• Scope 1 (Direct Emissions): Fuel burned in company vehicles/generators, and direct AC/refrigerant gas leaks.\n• Scope 2 (Purchased Energy): Indirect emissions from purchased electricity or chilled water used in facilities.\n• Scope 3 (Value Chain): Indirect emissions from purchased goods, business travel, employee commuting, freight, and waste."
      },
      {
        id: "cfa3-f1",
        type: "memorable_fact",
        position: 4,
        headingText: "Did You Know? (Worth Knowing)",
        bodyText: "According to the Intergovernmental Panel on Climate Change (IPCC) and GHG Protocol standards, fluorinated refrigerant gas leaks (Scope 1) trap heat in the atmosphere up to 2,000 times more effectively than CO2 per kilogram! Promptly repairing leaking air conditioners and cooling units is one of the highest-impact carbon reductions a facility can make."
      },
      {
        id: "cfa3-d1",
        type: "decision_scenario",
        position: 5,
        title: "Emissions Scope Categorisation Decision",
        situation: "A team is preparing the annual carbon inventory. A colleague asks whether company generator diesel consumption should be excluded because the generator only runs during occasional grid outages.",
        options: [
          {
            id: "opt-1",
            text: "Record all generator diesel litres in Scope 1 activity data regardless of whether run-hours were routine or emergency.",
            isCorrect: true,
            feedback: "Correct! All on-site stationary combustion of fuel constitutes direct Scope 1 greenhouse gas emissions and must be fully accounted for.",
            explanation: "Onsite fuel burning is direct Scope 1 combustion regardless of schedule."
          },
          {
            id: "opt-2",
            text: "Omit the diesel fuel since generator use was unexpected and occasional.",
            isCorrect: false,
            feedback: "Incorrect. Excluding fuel usage compromises data integrity and leads to non-compliant emissions reporting.",
            explanation: "All fuel used on-site must be recorded in Scope 1."
          }
        ]
      },
      {
        id: "cfa3-m1",
        type: "multiple_choice",
        position: 6,
        mcqQuestion: "Which emissions source represents Scope 1 (Direct Emissions) for a Mauritian commercial company?",
        mcqOptions: [
          "Diesel fuel burned in company-owned delivery vans and refrigerant leaks from facility AC units",
          "Purchased electricity drawn from the central utility power grid",
          "Flights taken by third-party overseas consultants",
          "Emissions created during the manufacturing of imported paper"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Fuel burned in company-owned vehicles and direct refrigerant leaks are direct Scope 1 emissions.",
        mcqIncorrectExplanation: "Incorrect. Company vehicle fuel and direct AC leaks are Scope 1 direct emissions."
      }
    ]
  },
  {
    order: 3,
    title: "The Workplace Carbon Map & Data Verification",
    minutes: 4,
    content: "Inspect operational carbon data sources, activity records, and greenwashing risks.",
    blocks: [
      { id: "cfa4-h1", type: "heading", position: 1, headingText: "Operations Desk Carbon Data Inspection" },
      { id: "cfa4-t1", type: "short_text", position: 2, bodyText: "Examine a real Mauritian workplace operations desk. Observe the CEB electricity bill, generator fuel receipt, vehicle logbook, AC refrigerant report, handwritten guessed estimate, and '100% Zero-Carbon Office' poster." },
      {
        id: "cfa4-img1",
        type: "visual_question",
        position: 3,
        imageUrl: "/images/courses/visual-workplace-carbon-data.png",
        caption: "Operations Desk Inspection: Electricity invoice, generator fuel receipt, fleet logbook, refrigerant repair sheet, guessed estimate note, and '100% ZERO-CARBON OFFICE' poster.",
        imageAlt: "Realistic photograph of a Mauritian operations desk showing a CEB electricity invoice, generator fuel receipt, fleet vehicle logbook, AC maintenance report noting 0.5kg refrigerant added, a handwritten note reading 'Estimated travel emissions: 0.1 tons (guessed)', and a wall poster claiming '100% ZERO-CARBON OFFICE'."
      },
      {
        id: "cfa4-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "In the operations desk inspection scene above, how should a responsible employee treat the handwritten note reading 'Estimated travel emissions: 0.1 tons (guessed)'?",
        mcqOptions: [
          "Reject guessed figures and locate verifiable activity data (exact fuel receipts, odometer logs, or travel invoices)",
          "Accept the guessed figure as final carbon accounting data",
          "Multiply the guessed figure by 10 to be safe",
          "Erase the note and claim travel emissions are zero"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Never rely on guessed figures for carbon data. Always track exact activity data like fuel receipts and vehicle logs.",
        mcqIncorrectExplanation: "Incorrect. Guessed carbon data is unreliable; accurate activity logs are required."
      }
    ]
  },
  {
    order: 4,
    title: "Action & Authority Boundaries",
    minutes: 3,
    content: "Structure carbon actions into direct habits, site data checks, and specialist escalation.",
    blocks: [
      { id: "cfa5-h1", type: "heading", position: 1, headingText: "Three Levels of Carbon Action" },
      { id: "cfa5-t1", type: "short_text", position: 2, bodyText: "Group your daily carbon-related workplace actions into three distinct authority levels:" },
      {
        id: "cfa5-k1",
        type: "key_message",
        position: 3,
        headingText: "Act, Check & Escalate Framework",
        bodyText: "1. ACT DIRECTLY: Avoid unnecessary equipment run-time, report refrigerant leaks, log vehicle mileage accurately.\n2. CHECK SITE PROCEDURE: Collecting monthly utility invoices, logging fuel receipts, submitting commuting survey data.\n3. ESCALATE TO MANAGEMENT: Unexplained spikes in fuel/power data, major refrigerant leaks, public carbon-neutrality claims, selecting emission factors, or buying carbon offsets."
      },
      {
        id: "cfa5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Carbon reporting scenario:",
        decisionPrompt: "A company's annual electricity consumption dropped by 10%, but total reported carbon emissions rose by 5% because diesel generator use increased during grid outages. A marketing colleague wants to announce '10% Carbon Reduction' publicly based solely on electricity. What should you do?",
        decisionChoices: [
          { label: "Escalate to the reporting lead and ensure public statements accurately reflect the total footprint across all fuel sources", correct: true, feedback: "Outstanding! Preventing misleading public claims protects the company from severe greenwashing liability." },
          { label: "Approve the marketing announcement because lowering electricity sounds good", correct: false, feedback: "Incorrect! Omitting generator fuel emissions creates false, misleading carbon reporting." },
          { label: "Delete generator fuel receipts from company records so the numbers match", correct: false, feedback: "NEVER falsify or delete activity data records! Falsifying records violates legal and corporate governance rules." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Carbon Awareness Commitment",
    minutes: 3,
    content: "Select practical daily carbon awareness commitments for your workplace role.",
    blocks: [
      { id: "cfa6-h1", type: "heading", position: 1, headingText: "Pledge to Act" },
      { id: "cfa6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing the lessons! Select the carbon awareness habits you commit to practice in your daily work routine." },
      {
        id: "cfa6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your daily workplace carbon commitments (choose at least one):",
        commitmentOptions: [
          { value: "log-accurate-data", label: "Provide exact fuel, electricity, and activity data without guessing", description: "Support accurate carbon accounting with verifiable receipts and logs." },
          { value: "report-refrigerant-leaks", label: "Report AC refrigerant leaks and cooling faults immediately", description: "Prevent high-impact Scope 1 fluorinated gas emissions." },
          { value: "avoid-unsupported-claims", label: "Avoid repeating unverified 'zero-carbon' or 'carbon-neutral' marketing claims", description: "Protect company credibility against greenwashing risks." },
          { value: "optimize-facility-energy", label: "Reduce unnecessary equipment run-time and travel where practical", description: "Lower operational energy draw and Scope 1 & 2 emissions." },
          { value: "escalate-data-anomalies", label: "Escalate unexplained energy spikes or missing records to management", description: "Ensure operational carbon data integrity." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the relationship between activity data and emission factors in calculating carbon footprints?",
    options: [
      "Activity data is multiplied by employee headcounts to predict next year's office rent",
      "Emission factors are added to bank statements to determine corporate tax liabilities",
      "Multiplying measurable activity data (litres of fuel, kWh of electricity) by an established emission factor calculates greenhouse gas emissions (CO2e)",
      "Activity data and emission factors are identical terms that can be used interchangeably"
],
    correct: 2,
    correctExplanation: "Carbon calculations multiply verifiable resource use (activity data) by scientific emissions intensity factors to determine total carbon dioxide equivalent (CO2e).",
    incorrectExplanation: "Incorrect. Multiplying activity data by an emission factor yields total CO2 equivalent emissions.",
    optionFeedback: [
      "Incorrect. Activity data measures physical resource consumption, not headcounts or rental rates.",
      "Incorrect. Emission factors quantify greenhouse gas intensity, not financial tax liabilities.",
      "Correct. Activity Data (e.g. 1,000 litres of diesel) \u00d7 Emission Factor (e.g. 2.68 kg CO2e/L) = Total Greenhouse Gas Emissions.",
      "Incorrect. Activity data is physical volume consumed, while an emission factor is the carbon intensity per unit."
]
  },
  {
    order: 2,
    question: "Which option represents a Scope 1 (Direct) greenhouse gas emission for a commercial facility in Mauritius?",
    options: [
      "Diesel fuel combusted inside company delivery vans or on-site backup generators",
      "Purchased electricity consumed by office fluorescent lamps and air conditioning units",
      "An employee taking an international commercial airline flight for a overseas conference",
      "Paper discarded by an accounting firm into a municipal waste transfer station"
],
    correct: 0,
    correctExplanation: "Scope 1 covers direct greenhouse gas emissions from fuel combustion in owned or controlled assets like vehicles and boilers.",
    incorrectExplanation: "Incorrect. Scope 1 encompasses direct emissions from fuel burned in company-owned assets.",
    optionFeedback: [
      "Correct. Burning diesel fuel in company-owned trucks or backup generator sets directly produces greenhouse gas emissions on-site.",
      "Incorrect. Purchased grid electricity is categorized as Scope 2 (Indirect Emissions from Purchased Energy).",
      "Incorrect. Commercial flights operated by airlines are categorized under Scope 3 (Value Chain Emissions).",
      "Incorrect. Third-party waste disposal and decomposition are categorized under Scope 3."
]
  },
  {
    order: 3,
    question: "Why are AC refrigerant gas leaks considered a high-priority carbon issue in commercial buildings?",
    options: [
      "Refrigerant gases improve indoor air quality and eliminate dust",
      "Common fluorinated refrigerants (HFCs) have Global Warming Potentials hundreds to thousands of times higher than carbon dioxide",
      "Refrigerant leaks are required by law in commercial offices",
      "Leaking refrigerant gas makes computer screens operate faster"
],
    correct: 1,
    correctExplanation: "Hydrofluorocarbons (HFCs) are super-pollutants; even small leaks of fluorinated gases create substantial global warming impact.",
    incorrectExplanation: "Incorrect. Fluorinated refrigerants have extreme global warming potentials compared to carbon dioxide.",
    optionFeedback: [
      "Incorrect. Escaping refrigerant gases do not purify indoor air; some pose asphyxiation or health risks in enclosed spaces.",
      "Correct. Escaping gases like R-410A or R-134a have Global Warming Potentials over 1,400 to 2,000 times that of CO2, making leak repair vital.",
      "Incorrect. Environmental regulations strictly require equipment leak inspections and containment.",
      "Incorrect. Refrigerant has zero connection to computer display processing speeds."
]
  },
  {
    order: 4,
    question: "How should a company evaluate a supplier claiming a product is '100% Carbon Neutral' without providing any verification?",
    options: [
      "Accept the statement immediately because green labels are always legally certified",
      "Reward the supplier with an exclusive five-year purchasing monopoly",
      "Assume the supplier has planted ten million indigenous trees on private land",
      "Request audited greenhouse gas calculation data, boundary disclosures, and verified carbon offset registry credits"
],
    correct: 3,
    correctExplanation: "Unverified neutrality claims require scrutiny; companies must verify transparent emissions boundaries and accredited offset standards.",
    incorrectExplanation: "Incorrect. Unverified carbon neutral claims require transparent data and recognized registry verification.",
    optionFeedback: [
      "Incorrect. Unregulated carbon neutrality claims often mask partial accounting or dubious unverified offsets.",
      "Incorrect. Contracts should be awarded on verified performance, not unsubstantiated marketing statements.",
      "Incorrect. Tree-planting claims require verified registry tracking, permanence guarantees, and independent auditing.",
      "Correct. Credible carbon neutrality requires clear scope accounting (Cradle-to-Gate), emissions reduction evidence, and Gold Standard or Verra offsets."
]
  },
  {
    order: 5,
    question: "At the end of the year, a facility's purchased electricity fell by 10%, but total operational carbon emissions rose. What could explain this?",
    options: [
      "Staff switched to writing with fountain pens instead of ballpoint pens",
      "Frequent national grid outages led to running on-site diesel backup generators for hundreds of hours",
      "The office cleaning team changed the brand of bathroom air freshener spray",
      "Solar panels absorbed moonlight during night shifts"
],
    correct: 1,
    correctExplanation: "Diesel generators produce significantly more greenhouse gas emissions per kilowatt-hour than grid power, increasing net carbon footprint.",
    incorrectExplanation: "Incorrect. Heavy generator runtime during grid disruptions increases carbon intensity.",
    optionFeedback: [
      "Incorrect. Minor pen changes have no material effect on corporate carbon accounts.",
      "Correct. Diesel backup generators produce approximately 0.8\u20131.0 kg CO2e per kWh, often exceeding grid average intensity and spiking Scope 1 emissions.",
      "Incorrect. Air freshener sprays do not alter Scope 1 or Scope 2 energy footprints.",
      "Incorrect. Solar photovoltaic panels do not generate power from moonlight."
]
  },
  {
    order: 6,
    question: "What do Scope 2 greenhouse gas emissions represent in a Mauritian corporate carbon inventory?",
    options: [
      "Indirect emissions generated from the production of purchased electricity consumed by the company from the Central Electricity Board (CEB)",
      "Exhaust emissions from employee personal bicycles",
      "Direct combustion of liquefied petroleum gas (LPG) inside the staff cafeteria stoves",
      "Methane gas released by ocean waves along public beaches"
],
    correct: 0,
    correctExplanation: "Scope 2 accounts for indirect emissions associated with the generation of electricity, steam, or cooling purchased from a utility.",
    incorrectExplanation: "Incorrect. Scope 2 accounts for indirect emissions from purchased grid electricity.",
    optionFeedback: [
      "Correct. Scope 2 measures emissions emitted at CEB thermal power stations to generate the electrical energy consumed by the business.",
      "Incorrect. Bicycles do not produce direct fossil exhaust emissions.",
      "Incorrect. Burning LPG in kitchen stoves on-site is a direct Scope 1 combustion emission.",
      "Incorrect. Natural ocean waves are not part of an organisation's corporate greenhouse gas inventory."
]
  },
  {
    order: 7,
    question: "Which of the following activities falls under Scope 3 (Value Chain) greenhouse gas emissions?",
    options: [
      "Fuel combusted in an emergency backup generator owned by the facility",
      "Gasoline consumed by company-owned delivery motorcycles",
      "Commercial airline business travel and third-party transport of raw materials",
      "Refrigerant top-ups in the company's server room air conditioner"
],
    correct: 2,
    correctExplanation: "Scope 3 covers all other indirect emissions across the upstream and downstream value chain, including outsourced travel and transport.",
    incorrectExplanation: "Incorrect. Scope 3 encompasses indirect value chain activities like business flights and third-party logistics.",
    optionFeedback: [
      "Incorrect. Fuel burned in company-owned generators is direct Scope 1.",
      "Incorrect. Fuel burned in company-owned vehicles is direct Scope 1.",
      "Correct. Flights on commercial airlines and freight carried by third-party logistics providers are classic Scope 3 indirect emissions.",
      "Incorrect. Fugitive refrigerant gas losses from owned AC systems are direct Scope 1 emissions."
]
  },
  {
    order: 8,
    question: "Why is collecting accurate, verifiable activity data (such as actual utility invoices and fuel receipts) critical for employee carbon reporting?",
    options: [
      "Government regulations require carbon reports to be handwritten in blue ink",
      "Carbon reporting software automatically deletes accounts if estimates are entered",
      "Utility companies give a 50% discount to companies that produce carbon spreadsheets",
      "Credible carbon accounting and climate disclosures require verifiable data trails that withstand internal and external audit scrutiny"
],
    correct: 3,
    correctExplanation: "Auditable activity data ensures carbon inventories reflect genuine operational changes and meet regulatory and investor standards.",
    incorrectExplanation: "Incorrect. Auditable activity data provides the foundation for credible climate disclosures and audits.",
    optionFeedback: [
      "Incorrect. Data can be stored in digital accounting formats; accuracy matters, not ink color.",
      "Incorrect. Software systems accept inputs; accuracy depends on the validity of source data.",
      "Incorrect. Utilities bill based on measured meter consumption, not reporting outputs.",
      "Correct. Regulators, bank financiers, and carbon auditors require primary invoices and fuel receipts to verify reported greenhouse gas reductions."
]
  },
  {
    order: 9,
    question: "What everyday habit by company fleet drivers can immediately reduce operational carbon emissions without any financial investment?",
    options: [
      "Eliminating unnecessary engine idling while parked or waiting for deliveries, and planning efficient route sequences",
      "Accelerating rapidly at every green traffic light to finish delivery routes early",
      "Overinflating vehicle tyres to twice their manufacturer recommended pressure rating",
      "Driving delivery vans in first gear continuously on public highways"
],
    correct: 0,
    correctExplanation: "Eco-driving practices like shutting off idling engines and smoothing driving habits immediately cut vehicle fuel burn by 5\u201315%.",
    incorrectExplanation: "Incorrect. Turning off idling engines and smooth route planning cut vehicle fuel consumption immediately.",
    optionFeedback: [
      "Correct. Idling engines burn fuel without moving; turning off engines during unloading and planning multi-stop routes cuts fuel burn instantly.",
      "Incorrect. Aggressive acceleration significantly increases fuel consumption and wear on brake pads.",
      "Incorrect. Overinflating tyres creates dangerous blowout risks and reduces vehicle road grip.",
      "Incorrect. Driving in low gear at high RPM wastes fuel and risks engine overheating."
]
  },
  {
    order: 10,
    question: "How does regular preventative maintenance of commercial air conditioning units and industrial chillers lower carbon emissions?",
    options: [
      "It repaints external metal casings so they reflect moonlight",
      "It converts air conditioners into solar energy generators",
      "Clean heat-exchanger coils and correct refrigerant levels allow compressors to run at peak efficiency, consuming less grid electricity",
      "Maintenance permanently eliminates the need for grid power"
],
    correct: 2,
    correctExplanation: "Clean condenser coils and calibrated refrigerant charges reduce compressor workload, saving substantial electricity over operational hours.",
    incorrectExplanation: "Incorrect. Maintained equipment operates at design efficiency, consuming significantly less electrical energy.",
    optionFeedback: [
      "Incorrect. Paint colors on outdoor chassis do not influence refrigeration cycle thermodynamics.",
      "Incorrect. Air conditioning units consume power; they do not generate solar electricity.",
      "Correct. Dirty coils force compressors to work 20\u201330% harder to transfer heat, consuming more CEB grid electricity and driving Scope 2 emissions.",
      "Incorrect. Electrical equipment always requires energy to operate."
]
  }
];

export async function ensureCarbonFootprintCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Carbon Footprint Awareness by canonical slug or title first so we never overwrite a repurposed ELH-07 row (e.g. "Resource Efficiency")
      let course = null;

      const [bySlug] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.slug, COURSE_SLUG))
        .limit(1);

      const [byCode] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, "ELH-07"))
        .limit(1);

      if (bySlug) {
        course = bySlug;
      } else {
        const [byTitle] = await tx
          .select()
          .from(coursesTable)
          .where(eq(coursesTable.title, COURSE_TITLE))
          .limit(1);
        if (byTitle) {
          course = byTitle;
        } else if (byCode && !byCode.title.toLowerCase().includes("resource efficiency")) {
          course = byCode;
        } else {
          const [byId] = await tx
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.id, COURSE_ID))
            .limit(1);
          if (byId && !byId.title.toLowerCase().includes("resource efficiency")) {
            course = byId;
          }
        }
      }

      if (!course) {
        throw new Error("Course ELH-07 / carbon-footprint-awareness not seeded by catalogue skeletons bootstrap!");
      }

      const courseId = course.id;
      const hasCodeCollision = Boolean(byCode && byCode.id !== courseId);
      const targetCourseCode = hasCodeCollision ? (course.courseCode || "ELH-07-CFA") : "ELH-07";

      // 2. Fetch seed marker and existing database content
      const [existingSeed] = await tx
        .select()
        .from(systemSeedsTable)
        .where(eq(systemSeedsTable.name, SEED_NAME))
        .limit(1);

      const existingLessons = await tx
        .select()
        .from(lessonsTable)
        .where(eq(lessonsTable.courseId, courseId));

      const existingQuizQuestions = await tx
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.courseId, courseId));

      // 3. Evaluate integrity violations
      const hasMissingLessons = existingLessons.length !== 6;
      const hasEmptyBlocks = existingLessons.some(
        (l) => !l.contentBlocks || !Array.isArray(l.contentBlocks) || l.contentBlocks.length === 0
      );
      const hasMissingQuiz = existingQuizQuestions.length !== 10;
      const hasIncorrectSlug = course.slug !== COURSE_SLUG;

      const needsRepair = !existingSeed ||
                          hasMissingLessons ||
                          hasEmptyBlocks ||
                          hasMissingQuiz ||
                          hasIncorrectSlug;

      if (!needsRepair) {
        logger.info({ courseId, slug: COURSE_SLUG }, "Carbon Footprint Awareness course content and v4 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG, hasCodeCollision }, "Integrity mismatch or missing v4 seed detected for Carbon Footprint Awareness. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "climate-change-mauritian-context"))
        .limit(1);
      const nextCourseId = nextCourse?.id ?? null;

      // Preserve draft status when another published course already holds ELH-07 unless explicitly overridden
      const shouldPublish = hasCodeCollision
        ? process.env.PUBLISH_REMEDIATED_DRAFTS === "true"
        : true;

      // 5. Update course record slug, title, and metadata
      await tx
        .update(coursesTable)
        .set({
          title: COURSE_TITLE,
          slug: COURSE_SLUG,
          courseCode: targetCourseCode,
          description: COURSE_META.description,
          fullDescription: COURSE_META.fullDescription,
          categoryId: COURSE_META.categoryId,
          durationMinutes: COURSE_META.durationMinutes,
          priceUsd: COURSE_META.priceUsd,
          level: COURSE_META.level,
          isFeatured: COURSE_META.isFeatured,
          thumbnailUrl: COURSE_META.thumbnailUrl,
          learningObjectives: COURSE_META.learningObjectives,
          includesCertificate: COURSE_META.includesCertificate,
          passingScore: COURSE_META.passingScore,
          completionMessage: COURSE_META.completionMessage,
          badgeName: COURSE_META.badgeName,
          badgeDescription: COURSE_META.badgeDescription,
          recommendedNextCourseId: nextCourseId,
          version: 2,
          isPublished: shouldPublish,
          status: shouldPublish ? "published" : "draft",
        })
        .where(eq(coursesTable.id, courseId));

      // 6. Seed/re-seed lessons with exact position block arrays
      await tx.delete(lessonsTable).where(eq(lessonsTable.courseId, courseId));
      for (const newLesson of NEW_LESSONS) {
        await tx.insert(lessonsTable).values({
          courseId,
          title: newLesson.title,
          orderIndex: newLesson.order,
          durationMinutes: newLesson.minutes,
          content: newLesson.content,
          contentBlocks: newLesson.blocks,
          isArchived: false,
        });
      }

      // 7. Seed/re-seed quiz questions
      await tx.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
      await tx.insert(quizQuestionsTable).values(
        NEW_QUIZ.map((q) => ({
          courseId,
          question: q.question,
          options: q.options,
          correctOption: q.correct,
          orderIndex: q.order,
          correctExplanation: q.correctExplanation,
          incorrectExplanation: q.incorrectExplanation,
          optionFeedback: q.optionFeedback,
          isArchived: false,
        }))
      );

      // 8. Idempotently seed/update badge definition
      await tx
        .insert(badgeDefinitionsTable)
        .values({
          slug: BADGE_SLUG,
          name: COURSE_META.badgeName,
          description: COURSE_META.badgeDescription,
          icon: "cloud",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 12,
        })
        .onConflictDoUpdate({
          target: badgeDefinitionsTable.slug,
          set: {
            name: COURSE_META.badgeName,
            description: COURSE_META.badgeDescription,
            courseIds: [courseId],
          },
        });

      // 9. Save seed marker version
      if (!existingSeed) {
        await tx.insert(systemSeedsTable).values({
          name: SEED_NAME,
          version: 3,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 3 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Carbon Footprint Awareness course v3 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute idempotent seeding/repair of Carbon Footprint Awareness course");
  }
}
