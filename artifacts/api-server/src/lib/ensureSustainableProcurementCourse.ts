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

const COURSE_ID = 5;
const COURSE_SLUG = "sustainable-procurement";
const COURSE_TITLE = "Sustainable Procurement";
const BADGE_SLUG = "responsible-purchasing";
const SEED_NAME = "sustainable-procurement-v3";
const SKELETON_BADGE_SLUG = "sustainable-procurement-badge"; // catalogue skeleton slug — do not delete

const COURSE_META = {
  description:
    "Learn a practical, plain-language method for evaluating workplace purchases using whole-life value, verifying green claims evidence, and maintaining strict safety, quality, and anti-bribery standards.",
  fullDescription:
    "This course helps employees, requesters, buyers, and managers make responsible purchasing decisions. It teaches how to confirm actual need, compare operating costs and durability alongside initial price, evaluate green claims evidence, and establish clear authority and ethical boundaries in Mauritian commercial workplaces.",
  categoryId: 1,
  durationMinutes: 18,
  priceUsd: "1400.00",
  level: "Level 2",
  isFeatured: false,
  thumbnailUrl: "/images/courses/sustainable-procurement.png",
  learningObjectives: [
    "Explain sustainable procurement principles in plain workplace language.",
    "Confirm whether a purchase is necessary before comparing products or issuing quotes.",
    "Distinguish initial purchase price from total whole-life value across operating, maintenance, and disposal costs.",
    "Evaluate environmental and supplier claims using verifiable evidence rather than vague marketing buzzwords.",
    "Apply relevant sustainability criteria without compromising safety, hygiene, food safety, or technical quality.",
    "Recognise procurement authority boundaries, conflict-of-interest risks, and anti-bribery escalation rules.",
    "Select one practical workplace procurement commitment to support responsible purchasing."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Sustainable Procurement. You can now assess genuine purchase needs, compare whole-life value beyond purchase price, verify supplier evidence, and escalate procurement risks safely.",
  badgeName: "Responsible Purchasing Contributor",
  badgeDescription:
    "Awarded for applying balanced purchasing judgement across need, whole-life value, supplier evidence, safety, and ethical governance.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Cheapest Quote vs Whole-Life Value",
    minutes: 3,
    content: "Understand why purchase price alone is insufficient for evaluating workplace purchasing decisions.",
    blocks: [
      { id: "sp1-h1", type: "heading", position: 1, headingText: "Evaluating Supplier Quotes" },
      { id: "sp1-t1", type: "short_text", position: 2, bodyText: "Imagine your department needs replacement office equipment. Supplier A offers the lowest purchase price. Supplier B costs 15% more upfront but provides detailed energy consumption data, a 3-year warranty, and local spare parts. Supplier C claims its product is '100% eco-friendly' but offers no technical data sheet or evidence." },
      { id: "sp1-k1", type: "key_message", position: 3, headingText: "Cheapest Does Not Mean Best Value", bodyText: "A low initial purchase price can hide high energy bills, frequent breakdowns, short lifespan, and costly disposal. Sustainable procurement evaluates whole-life value—balancing purchase cost, operating performance, durability, repairability, and end-of-life impact." },
      {
        id: "sp1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "First step in evaluating supplier quotes:",
        decisionPrompt: "What should you do before recommending any supplier option?",
        decisionChoices: [
          { label: "Confirm the genuine operational need, compare whole-life data sheets, and ask for evidence supporting green claims", correct: true, feedback: "Perfect! Confirming need, technical performance, and verifiable evidence ensures true value and eliminates waste." },
          { label: "Select Supplier A immediately because it has the lowest upfront invoice price", correct: false, feedback: "Incorrect. The cheapest initial quote often leads to higher total costs through frequent replacements or high energy draw." },
          { label: "Choose Supplier C because '100% eco-friendly' marketing sounds sustainable", correct: false, feedback: "Incorrect! Vague marketing slogans are not evidence. Always request verifiable technical data." }
        ]
      },
      {
        id: "sp1-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "What is the core definition of whole-life value in sustainable procurement?",
        mcqOptions: [
          "Evaluating total cost and performance across purchase price, operating energy/water, maintenance, durability, and disposal",
          "Selecting whichever product has the most green logos on its packaging",
          "Buying the most expensive premium brand regardless of actual need",
          "Always choosing the cheapest available item to minimize initial budget spend"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Whole-life value assesses total ownership costs—including operating efficiency, maintenance, and lifespan—not just the initial price tag.",
        mcqIncorrectExplanation: "Incorrect. Whole-life value looks beyond initial purchase price to consider operating costs, durability, and maintenance."
      }
    ]
  },
  {
    order: 1,
    title: "Why Sustainable Procurement Matters",
    minutes: 3,
    content: "Connect responsible purchasing to operational reliability, financial value, and plain-language ESG goals.",
    blocks: [
      { id: "sp2-h1", type: "heading", position: 1, headingText: "Three Value Perspectives" },
      { id: "sp2-t1", type: "short_text", position: 2, bodyText: "Responsible procurement strengthens commercial organizations across three key pillars:" },
      {
        id: "sp2-k1",
        type: "key_message",
        position: 3,
        headingText: "Operational, Financial & ESG Value",
        bodyText: "• Operational Value: Reliable, durable products reduce downtime, equipment failures, and service interruptions.\n• Financial Value: Evaluating operating energy/water consumption and maintenance lowers total cost of ownership.\n• ESG Relevance: Environmental, Social, and Governance (ESG) considerations ensure ethical supply chains, reduced waste, and credible corporate reporting."
      },
      {
        id: "sp2-w1",
        type: "workplace_example",
        position: 4,
        headingText: "ESG Explained in Plain English",
        bodyText: "ESG stands for Environmental (resource use and waste), Social (fair treatment of workers and community safety), and Governance (ethical decision-making, anti-corruption, and compliance). Sustainable procurement puts ESG into daily workplace practice."
      }
    ]
  },
  {
    order: 2,
    title: "The 6-Step Decision Framework & Sourced Facts",
    minutes: 4,
    content: "Apply a structured 6-step purchasing framework and learn sourced life-cycle facts.",
    blocks: [
      { id: "sp3-h1", type: "heading", position: 1, headingText: "The 6-Step Sustainable Procurement Framework" },
      { id: "sp3-t1", type: "short_text", position: 2, bodyText: "Follow these 6 practical steps whenever requesting, comparing, or approving a workplace purchase:" },
      {
        id: "sp3-k1",
        type: "key_message",
        position: 3,
        headingText: "Step-by-Step Purchasing Method",
        bodyText: "Step 1: Confirm the Need (Is the purchase necessary? Can an existing item be repaired or redeployed?)\nStep 2: Define Performance (Safety, hygiene, quality, and operational fitness come first).\nStep 3: Identify Relevant Criteria (Energy efficiency, durability, spare parts, packaging).\nStep 4: Ask for Evidence (Data sheets, warranties, recognized certifications).\nStep 5: Compare Whole-Life Value (Purchase price + operating energy + maintenance + lifespan).\nStep 6: Follow Approval Procedure (Record comparison and obtain authorized sign-off)."
      },
      {
        id: "sp3-f1",
        type: "memorable_fact",
        position: 4,
        headingText: "Did You Know? (Worth Knowing)",
        bodyText: "According to ISO 20400 Sustainable Procurement Standards and UNEP Life Cycle Assessment studies, operating electricity, maintenance, and disposal costs for commercial appliances and machinery account for 60% to 80% of total life-cycle expenditure! Prioritizing energy efficiency and repairability yields massive long-term financial savings."
      },
      {
        id: "sp3-d1",
        type: "decision_scenario",
        position: 5,
        title: "Procurement Need Verification Decision",
        situation: "A department requests the purchase of 10 new high-capacity printers. An internal audit shows existing department printers operate at only 25% capacity and 4 spare units are stored in IT inventory.",
        options: [
          {
            id: "opt-1",
            text: "Redeploy the available spare units and optimise existing fleet utilisation instead of purchasing new hardware.",
            isCorrect: true,
            feedback: "Correct! Redeploying existing inventory saves capital budget and prevents unnecessary electronic hardware manufacturing footprint.",
            explanation: "Verifying and redeploying existing assets is the first principle of sustainable procurement."
          },
          {
            id: "opt-2",
            text: "Approve the purchase order immediately without checking stored inventory.",
            isCorrect: false,
            feedback: "Incorrect. Buying unnecessary assets wastes capital and increases lifecycle waste.",
            explanation: "Unnecessary purchases increase embodied carbon and waste."
          }
        ]
      },
      {
        id: "sp3-m1",
        type: "multiple_choice",
        position: 6,
        mcqQuestion: "What is Step 1 of the Sustainable Procurement Framework?",
        mcqOptions: [
          "Confirm whether the purchase is genuinely necessary before issuing quotes or buying new items",
          "Issue a purchase order to the nearest vendor without checking stock",
          "Demand a 50% discount from the supplier",
          "Select whichever product has green packaging"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "The first step is always confirming actual need—repairing, sharing, or redeploying existing equipment eliminates unnecessary spending entirely.",
        mcqIncorrectExplanation: "Incorrect. Confirming actual need is the foundational first step before comparing product options."
      }
    ]
  },
  {
    order: 3,
    title: "Inspecting Supplier Evidence & Green Claims",
    minutes: 4,
    content: "Evaluate supplier proposals, green claims evidence, and anti-bribery compliance.",
    blocks: [
      { id: "sp4-h1", type: "heading", position: 1, headingText: "Purchasing Desk Proposal Inspection" },
      { id: "sp4-t1", type: "short_text", position: 2, bodyText: "Examine a real Mauritian corporate purchasing desk. Compare Proposal A (vague '100% Eco' sticker), Proposal B (technical energy data sheet and 3-year warranty), and Proposal C (unverified symbol with an inappropriate gift box)." },
      {
        id: "sp4-img1",
        type: "visual_question",
        position: 3,
        imageUrl: "/images/courses/visual-sustainable-procurement-evidence.png",
        caption: "Purchasing Desk Inspection: Proposal A ('100% Eco' sticker without data), Proposal B (energy data sheet & 3-year warranty certificate), and Proposal C (unverified green symbol with personal gift box).",
        imageAlt: "Realistic photograph of a Mauritian corporate procurement desk with laptop comparison table and three paper proposals: Proposal A with a green 100% Eco-Friendly stamp, Proposal B with an energy efficiency chart and 3-year warranty certificate, and Proposal C with an unverified green symbol and a gift box labelled GIFT."
      },
      {
        id: "sp4-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "In the purchasing desk inspection scene above, how should you respond to Proposal C containing an inappropriate personal gift box alongside an unverified green claim?",
        mcqOptions: [
          "Refuse and report the personal gift offer to management/procurement ethics officers immediately, and reject the unverified proposal",
          "Accept the personal gift quietly and award Proposal C the supply contract",
          "Keep the gift box for yourself and select Proposal A",
          "Ignore company procurement rules because gifts are normal business etiquette"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Personal gifts or vendor favors violate anti-bribery policies and create severe conflicts of interest. Report gifts and require objective evidence.",
        mcqIncorrectExplanation: "Incorrect. Personal supplier gifts violate anti-bribery policies and must be reported immediately."
      }
    ]
  },
  {
    order: 4,
    title: "Authority Boundaries & Practical Actions",
    minutes: 3,
    content: "Categorize purchasing actions into direct tasks, site procedures, and mandatory escalation.",
    blocks: [
      { id: "sp5-h1", type: "heading", position: 1, headingText: "Three Levels of Purchasing Authority" },
      { id: "sp5-t1", type: "short_text", position: 2, bodyText: "To maintain commercial governance and safety standards, group your purchasing actions into three clear authority levels:" },
      {
        id: "sp5-k1",
        type: "key_message",
        position: 3,
        headingText: "Act, Check & Escalate Framework",
        bodyText: "1. ACT DIRECTLY: Confirm genuine need, request technical data sheets, compare energy ratings, flag unsupported claims.\n2. CHECK SITE PROCEDURE: Add sustainability criteria to requisitions, evaluate warranty terms, select from approved vendor lists.\n3. ESCALATE TO MANAGEMENT: Supplier contract changes, vendor gift/bribery offers, overriding safety/hygiene specs, purchases exceeding delegated financial authority."
      },
      {
        id: "sp5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Commercial equipment procurement scenario:",
        decisionPrompt: "A hotel or office is purchasing a commercial cleaning machine. Supplier B costs 15% more upfront but provides documented energy/water efficiency ratings, local replacement parts, and a 3-year warranty. What is the correct recommendation?",
        decisionChoices: [
          { label: "Document the whole-life value comparison (energy savings + warranty) and submit it for authorized approval according to financial limits", correct: true, feedback: "Outstanding! Documenting whole-life value and following financial approval limits ensures commercial rigor and compliance." },
          { label: "Sign a binding 5-year contract with Supplier B on your own authority without manager sign-off", correct: false, feedback: "Incorrect! Signing contracts outside delegated approval limits violates corporate governance." },
          { label: "Reject Supplier B and buy the cheapest unverified machine without warranty", correct: false, feedback: "Incorrect. Ignoring whole-life efficiency data leads to higher long-term operating costs." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Responsible Purchasing Commitment",
    minutes: 3,
    content: "Select practical daily procurement commitments for your workplace role.",
    blocks: [
      { id: "sp6-h1", type: "heading", position: 1, headingText: "Pledge to Act" },
      { id: "sp6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing the lessons! Select the purchasing commitments you will practice in your workplace role." },
      {
        id: "sp6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your daily workplace purchasing commitments (choose at least one):",
        commitmentOptions: [
          { value: "confirm-need", label: "Confirm genuine need before requesting or approving new purchases", description: "Prevent unnecessary spending by repairing or redeploying existing equipment." },
          { value: "compare-whole-life", label: "Compare operating costs and warranty terms alongside initial price", description: "Evaluate total ownership cost over product lifespan." },
          { value: "demand-evidence", label: "Request technical data sheets to verify vague green claims", description: "Eliminate greenwashing by requiring verifiable supplier evidence." },
          { value: "protect-safety", label: "Ensure sustainability criteria never compromise safety, hygiene, or quality", description: "Maintain mandatory operational and health safety standards." },
          { value: "report-conflicts", label: "Report vendor gifts, bribes, or conflicts of interest immediately", description: "Uphold strict anti-corruption and corporate governance rules." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the primary goal of sustainable procurement in commercial organisations?",
    options: [
      "To buy the cheapest available item regardless of quality, toxicity, or origin",
      "To cease all purchasing and manufacture every item internally",
      "To deliver whole-life value by meeting operational needs with minimal environmental and social impact",
      "To purchase luxury branded goods exclusively to impress prospective clients"
],
    correct: 2,
    correctExplanation: "Sustainable procurement evaluates whole-life cost, environmental impact, and supplier ethics rather than short-term purchase price alone.",
    incorrectExplanation: "Incorrect. Sustainable procurement balances whole-life cost, quality, and environmental impact.",
    optionFeedback: [
      "Incorrect. The cheapest upfront purchase often has higher maintenance, energy, and disposal costs.",
      "Incorrect. Organisations must purchase supplies and services to function; procurement focuses on responsible purchasing.",
      "Correct. Whole-life value integrates initial price, operating efficiency, durability, and responsible supplier practices.",
      "Incorrect. Procurement is based on objective operational requirements, not cosmetic prestige."
]
  },
  {
    order: 2,
    question: "What is Step 1 of the 6-Step Sustainable Procurement Framework?",
    options: [
      "Challenge and verify the actual operational need before ordering",
      "Send an immediate purchase order to the nearest hardware store",
      "Approve supplier invoices without checking delivery receipts",
      "Sign a 10-year exclusive contract without requesting competitive bids"
],
    correct: 0,
    correctExplanation: "The most sustainable purchase is the one not made; verifying need prevents duplicate and avoidable orders.",
    incorrectExplanation: "Incorrect. Step 1 is always to question and verify the operational need.",
    optionFeedback: [
      "Correct. Asking 'Do we truly need this, or can we share, repair, or repurpose existing equipment?' prevents wasteful spending.",
      "Incorrect. Sending orders before verifying need leads to unnecessary inventory accumulation.",
      "Incorrect. Invoice verification is a post-delivery governance control.",
      "Incorrect. Long-term exclusive contracts require rigorous supplier evaluation and approval."
]
  },
  {
    order: 3,
    question: "How should a workplace buyer evaluate a supplier quote claiming a product is '100% Eco-Friendly'?",
    options: [
      "Accept the claim immediately because marketing brochures are always legally accurate",
      "Request independent third-party certifications, technical data sheets, and verified standards (e.g. ISO, Energy Star)",
      "Reject the supplier automatically and report them to the police",
      "Pay double the requested price because the word 'Eco' is printed on the box"
],
    correct: 1,
    correctExplanation: "Vague claims require independent verification to prevent greenwashing and ensure compliance.",
    incorrectExplanation: "Incorrect. Environmental claims must be supported by verifiable third-party documentation.",
    optionFeedback: [
      "Incorrect. Unsubstantiated marketing claims frequently constitute greenwashing.",
      "Correct. Legitimate sustainable products provide recognized eco-labels, test results, or lifecycle evidence to prove claims.",
      "Incorrect. Buyers should request evidence through normal clarification channels before making judgments.",
      "Incorrect. Sustainable products should demonstrate fair market value, not unquestioned price premiums."
]
  },
  {
    order: 4,
    question: "What should an employee do if a prospective supplier offers a personal gift or luxury weekend stay in exchange for awarding a contract?",
    options: [
      "Accept the gift quietly and tell nobody in the office",
      "Ask for cash instead so that no physical items can be tracked",
      "Accept the gift on behalf of the entire procurement committee",
      "Politely decline and declare the offer immediately in writing in accordance with the company anti-bribery and ethics policy"
],
    correct: 3,
    correctExplanation: "Personal gifts create severe conflicts of interest and compromise procurement integrity.",
    incorrectExplanation: "Incorrect. Personal gifts must be declined and reported per company ethics policies.",
    optionFeedback: [
      "Incorrect. Secretly accepting gifts violates fiduciary duties and anti-corruption regulations.",
      "Incorrect. Cash kickbacks constitute criminal bribery.",
      "Incorrect. Committee members must remain impartial and refuse inducements.",
      "Correct. Immediate declination and transparent declaration protect corporate governance and procurement fairness."
]
  },
  {
    order: 5,
    question: "Which decision must be ESCALATED to senior management or procurement specialists?",
    options: [
      "Purchasing a pack of certified recycled printer paper within your departmental allowance",
      "Entering into a long-term supply contract that exceeds authorized financial limits or waives mandatory environmental criteria",
      "Requesting a supplier to deliver goods in reusable crates instead of single-use cardboard",
      "Replacing single-use plastic water bottles with ceramic glasses for a meeting"
],
    correct: 1,
    correctExplanation: "Contract commitments exceeding financial approval limits or altering compliance standards require executive sign-off.",
    incorrectExplanation: "Incorrect. Exceeding spending limits or waiving compliance rules requires formal escalation.",
    optionFeedback: [
      "Incorrect. Routine budgeted office supplies within threshold can be handled at operational level.",
      "Correct. Exceeding delegated approval authority or waiving environmental specifications exposes the company to contractual and audit risks.",
      "Incorrect. Requesting reusable packaging is an operational preference within routine vendor communications.",
      "Incorrect. Using ceramic glasses is a standard workplace habit within employee authority."
]
  },
  {
    order: 6,
    question: "What is Total Cost of Ownership (TCO) in commercial purchasing decisions?",
    options: [
      "Evaluating the complete cost across an asset's life, including purchase price, energy use, maintenance, and disposal",
      "The initial purchase price printed at the bottom of the first quote",
      "The total amount of cash stored in the company bank account",
      "The fee paid to delivery couriers for transport"
],
    correct: 0,
    correctExplanation: "TCO assesses the full expenditure of owning an asset, proving that energy-efficient, durable products often cost less overall.",
    incorrectExplanation: "Incorrect. TCO accounts for operational, energy, maintenance, and disposal costs across the asset lifecycle.",
    optionFeedback: [
      "Correct. Factoring in energy consumption, repair costs, and expected lifespan reveals the true economic value of equipment.",
      "Incorrect. Looking only at initial purchase price ignores ongoing electricity, consumable, and repair expenses.",
      "Incorrect. TCO is an asset evaluation methodology, not a measure of cash reserves.",
      "Incorrect. Delivery fees are only a minor component of initial acquisition."
]
  },
  {
    order: 7,
    question: "How can a procurement officer reduce supply chain packaging waste when ordering routine spare parts or bulk goods?",
    options: [
      "Request that each individual bolt and washer be wrapped in five layers of plastic bubble wrap",
      "Order items in daily single-unit packages to keep delivery trucks busy",
      "Specify reusable returnable transit crates and require suppliers to take back secondary transport packaging",
      "Throw all wooden delivery pallets into the sea after unloading"
],
    correct: 2,
    correctExplanation: "Contracting for reusable transit packaging eliminates single-use cardboard and plastic film across recurring deliveries.",
    incorrectExplanation: "Incorrect. Specifying reusable packaging and vendor take-back prevents supply chain packaging waste.",
    optionFeedback: [
      "Incorrect. Over-packaging small items generates massive avoidable plastic waste.",
      "Incorrect. Frequent micro-deliveries increase packaging volume and transport emissions.",
      "Correct. Reusable plastic containers and pallet return agreements eliminate tons of packaging waste over supply contracts.",
      "Incorrect. Discarding pallets into waterways is illegal and creates navigational and ecological hazards."
]
  },
  {
    order: 8,
    question: "When evaluating two commercial printer proposals, why is spare parts availability and repairability a critical sustainability factor?",
    options: [
      "It guarantees the machine will never need cleaning",
      "It allows employees to disassemble printers during lunch breaks for amusement",
      "It is a requirement created solely to increase service invoice fees",
      "It ensures the machine can be serviced locally for 5\u20137 years, avoiding premature replacement and electronic waste"
],
    correct: 3,
    correctExplanation: "Equipment that can be repaired locally extends operational lifespan and prevents functional machines from becoming e-waste.",
    incorrectExplanation: "Incorrect. Repairability ensures long operational life and prevents premature electronic waste.",
    optionFeedback: [
      "Incorrect. Regular cleaning and preventative maintenance remain essential for all office equipment.",
      "Incorrect. Equipment repairs must be performed by authorized service technicians.",
      "Incorrect. Serviceability protects investment value; it is not an arbitrary fee scheme.",
      "Correct. Ready access to replacement rollers, fusers, and local technician support keeps hardware operational for years."
]
  },
  {
    order: 9,
    question: "Which of the following is a classic indicator of 'greenwashing' in a vendor product catalog?",
    options: [
      "Using vague marketing phrases like 'all-natural' or 'eco-friendly' with no standard certification, testing data, or verifiable ingredients",
      "Providing an ISO 14001 certification certificate and third-party laboratory test report",
      "Listing the exact percentage of post-consumer recycled content in the product casing",
      "Displaying a valid Energy Star rating badge registered on the official database"
],
    correct: 0,
    correctExplanation: "Unsubstantiated green buzzwords without independent credentials or verifiable data are the hallmarks of greenwashing.",
    incorrectExplanation: "Incorrect. Vague unverified claims are typical greenwashing signs.",
    optionFeedback: [
      "Correct. Greenwashing relies on emotional, unsubstantiated claims rather than measurable technical standards.",
      "Incorrect. ISO 14001 and independent lab tests are credible evidence of environmental management.",
      "Incorrect. Specifying exact audited recycled content percentages provides transparent, verifiable data.",
      "Incorrect. Officially registered Energy Star ratings are verified performance standards."
]
  },
  {
    order: 10,
    question: "What is an environmental and operational advantage of prioritizing qualified local suppliers in Mauritius when quality and cost are comparable?",
    options: [
      "Local suppliers are legally exempt from all corporate taxation",
      "Local purchasing eliminates all company accounting audits",
      "Shorter delivery distances reduce international freight emissions, lower supply chain disruption risks, and support local circular value",
      "Goods manufactured locally are indestructible and never break"
],
    correct: 2,
    correctExplanation: "Local procurement shortens logistics routes, lowers transport carbon emissions, and enhances supply chain resilience.",
    incorrectExplanation: "Incorrect. Sourcing locally reduces maritime/air freight emissions and shortens supply lead times.",
    optionFeedback: [
      "Incorrect. Local businesses operate under standard national tax and corporate laws.",
      "Incorrect. All transactions require standard audit trails and purchase orders.",
      "Correct. Local sourcing avoids maritime freight delays, reduces scope 3 transport emissions, and strengthens domestic economic resilience.",
      "Incorrect. Local goods require standard quality assurance and maintenance."
]
  }
];

export async function ensureSustainableProcurementCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 5 by ID 5 or slug
      let course = null;
      
      const [byId] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.id, COURSE_ID))
        .limit(1);

      if (byId) {
        course = byId;
      } else {
        const [bySlug] = await tx
          .select()
          .from(coursesTable)
          .where(eq(coursesTable.slug, COURSE_SLUG))
          .limit(1);
        course = bySlug ?? null;
      }

      if (!course) {
        throw new Error("Course 5 not seeded by catalogue skeletons bootstrap!");
      }

      const courseId = course.id;

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
        logger.info({ courseId, slug: COURSE_SLUG }, "Sustainable Procurement course content and v2 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course 5. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "waste-minimisation-workplace"))
        .limit(1);
      const nextCourseId = nextCourse?.id ?? null;

      // 5. Update course record slug, title, and metadata
      await tx
        .update(coursesTable)
        .set({
          title: COURSE_TITLE,
          slug: COURSE_SLUG,
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
          isPublished: true,
          status: "published",
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
          icon: "shopping-bag",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 10,
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
          version: 2,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 2 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Sustainable Procurement course v2 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute idempotent seeding/repair of Sustainable Procurement course");
  }
}
