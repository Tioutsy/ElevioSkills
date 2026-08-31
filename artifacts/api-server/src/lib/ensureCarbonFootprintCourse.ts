import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

const COURSE_ID = 10;
const COURSE_SLUG = "carbon-footprint-awareness";
const COURSE_TITLE = "Carbon Footprint Awareness";
const BADGE_SLUG = "carbon-aware";
const SEED_NAME = "carbon-footprint-awareness-v4";
const SKELETON_BADGE_SLUG = "carbon-aware";

const COURSE_META = {
  courseCode: "ELH-07",
  description:
    "Gain a plain-language, practical understanding of greenhouse gas emissions, Scope 1–3 boundaries, activity data versus emission factors, refrigerant impacts, and authentic carbon claims.",
  fullDescription:
    "This foundation course demystifies corporate greenhouse gas accounting for non-specialist professionals and employees. Learners explore how everyday workplace decisions relate to carbon footprints, master the difference between Scope 1 (direct fuels), Scope 2 (purchased grid electricity), and Scope 3 (value chain supply and commuting), learn how raw activity data (litres, kWh, kg) is converted into CO2 equivalent (CO2e), recognise high-impact refrigerant leak risks, and evaluate commercial carbon claims to prevent greenwashing.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/carbon-footprint-awareness.jpg",
  intendedRoles: [
    "All employees",
    "Operations and fleet supervisors",
    "Facilities and maintenance coordinators",
    "Finance, administration, and procurement officers",
    "Sustainability committee members and team leads"
  ],
  learningObjectives: [
    "Define a carbon footprint and greenhouse gas emissions (GHGs) using plain workplace language.",
    "Categorize workplace emission sources accurately across Scope 1 (direct), Scope 2 (purchased power), and Scope 3 (value chain).",
    "Explain how raw activity data (litres of diesel, kWh of power, kg of gas) is multiplied by emission factors to calculate CO2e.",
    "Recognise the outsized global warming potential (GWP) of synthetic refrigerants and the necessity of leak log tracking.",
    "Evaluate vendor and marketing 'carbon neutral' statements to prevent deceptive greenwashing claims.",
    "Execute personal and departmental actions that reduce primary operational emissions at source."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Carbon Footprint Awareness. You can now recognise how workplace decisions connect to greenhouse gas emissions, understand Scope 1–3 boundaries, and support reliable carbon data collection safely.",
  badgeName: "Carbon Awareness Practitioner",
  badgeDescription:
    "Awarded for demonstrating plain-language carbon awareness, understanding Scope 1–3 emissions, and supporting reliable workplace activity data."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Understanding Workplace Carbon Footprints",
    minutes: 4,
    content: "Learn what a carbon footprint represents and why verifiable activity data matters.",
    blocks: [
      { id: "cfa1-h1", type: "heading", position: 1, headingText: "Why Emissions Data Requires Evidence" },
      { id: "cfa1-t1", type: "short_text", position: 2, bodyText: "At an annual management review, a company discovers its carbon footprint increased by 15% despite employees diligently turning off personal computer screens. Team members guess: 'It must be employee commuting,' or 'It's because we sent more emails.' The facilities lead reviews the invoices: backup diesel generator hours doubled during grid outages and a 15-kilogram refrigerant leak occurred in the central air handling unit." },
      { id: "cfa1-k1", type: "key_message", position: 3, headingText: "Emissions Require Measurement, Not Guesses", bodyText: "A corporate carbon footprint is an evidence-based calculation of total greenhouse gases emitted directly and indirectly by an organization's operations. Visible symbolic habits matter, but fuel combustion, grid electricity, and chemical refrigerants represent the vast majority of commercial emissions." },
      {
        id: "cfa1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Evaluating vendor carbon claims scenario:",
        decisionPrompt: "A freight delivery company offers your business '100% Zero-Carbon Delivery' at a premium rate. When asked for documentation, they reply: 'Our drivers plant trees on weekends, so it is officially zero carbon.' What should you do?",
        decisionChoices: [
          { label: "Treat the claim as unverified marketing and request certified Scope 1–3 calculation methodology and audited offset standards before paying a premium or citing it publicly", correct: true, feedback: "Correct! Informal tree-planting claims without certified carbon accounting, verified permanence, and third-party audit are classic greenwashing risks." },
          { label: "Immediately advertise on your company website that all your deliveries are 100% zero carbon", correct: false, feedback: "Dangerous! Publishing unverified third-party claims exposes your organization to severe regulatory and reputational penalties." },
          { label: "Assume all freight transport produces zero emissions by law", correct: false, feedback: "Incorrect. Transportation is one of the highest emission sources globally." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "The Carbon Equation: Activity Data & Emission Factors",
    minutes: 4,
    content: "Master the fundamental calculation: Activity Data × Emission Factor = Carbon Footprint (CO2e).",
    blocks: [
      { id: "cfa2-h1", type: "heading", position: 1, headingText: "How Carbon Footprints Are Actually Calculated" },
      { id: "cfa2-t1", type: "short_text", position: 2, bodyText: "You do not need to be an environmental chemist to understand carbon accounting. The calculation relies on a straightforward formula:" },
      {
        id: "cfa2-k1",
        type: "key_message",
        position: 3,
        headingText: "Activity Data × Emission Factor = Total CO2e",
        bodyText: "• Activity Data: The measurable quantity of an operational activity recorded from primary records (e.g. 5,000 litres of diesel from fuel receipts, 120,000 kWh from utility bills, 45,000 km from vehicle fleet logs).\n• Emission Factor: An authoritative multiplier established by international bodies (IPCC, GHG Protocol) or national utilities indicating how many kilograms of CO2e are released per unit of activity.\n• CO2 Equivalent (CO2e): A universal metric that converts the warming impact of different greenhouse gases (Methane, Nitrous Oxide, F-gases) into the equivalent quantity of Carbon Dioxide."
      },
      {
        id: "cfa2-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "In the carbon calculation formula, what constitutes reliable 'Activity Data' for a company vehicle fleet?",
        mcqOptions: [
          "Actual litres of fuel purchased recorded from fuel receipts and telematics odometer logs",
          "An employee's rough guess of how far colleagues drove last month",
          "The color and physical size of the vehicle fleet",
          "The total number of likes on the company's social media transport post"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Activity data must be grounded in verified, auditable operational records such as invoices, utility meter logs, and fuel receipts.",
        mcqIncorrectExplanation: "Incorrect. Carbon accounting requires auditable primary records, not subjective guesses."
      }
    ]
  },
  {
    order: 2,
    title: "Scope 1, Scope 2 & Scope 3 Boundaries",
    minutes: 4,
    content: "Classify greenhouse gas emissions into direct combustion, purchased electricity, and value chain categories.",
    blocks: [
      { id: "cfa3-h1", type: "heading", position: 1, headingText: "The Three Emission Scopes (GHG Protocol)" },
      { id: "cfa3-t1", type: "short_text", position: 2, bodyText: "The Greenhouse Gas Protocol divides an organization's emissions into three distinct boundaries to prevent double-counting and assign accountability:" },
      {
        id: "cfa3-k1",
        type: "key_message",
        position: 3,
        headingText: "Scope 1, 2, and 3 Definitions",
        bodyText: "• SCOPE 1 (Direct Emissions): Fuels burned on-site (diesel in backup generators, LPG in canteen kitchens, petrol in company-owned delivery vans) and fugitive refrigerant leaks from owned AC equipment.\n• SCOPE 2 (Indirect Energy Emissions): Purchased electricity, steam, or central chilled water bought from the municipal grid (e.g. CEB electricity in Mauritius).\n• SCOPE 3 (Value Chain Indirect Emissions): Everything else upstream and downstream—business flights, employee daily commuting, purchased office goods, waste sent to landfill, and third-party outsourced freight."
      },
      {
        id: "cfa3-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Scope classification scenario:",
        decisionPrompt: "An accounting firm operates in a leased office. During the year, they consumed: (1) 40,000 kWh of grid electricity, (2) 500 litres of diesel in their owned client-shuttle van, and (3) staff took 12 commercial airline flights for client audits. How are these classified?",
        decisionChoices: [
          { label: "Van diesel = Scope 1; Grid electricity = Scope 2; Commercial airline flights = Scope 3", correct: true, feedback: "Spot on! Direct fuel in owned vehicles is Scope 1; purchased utility electricity is Scope 2; third-party commercial flights are Scope 3." },
          { label: "All three are Scope 1 because the company paid money for them", correct: false, feedback: "Incorrect. Paying for a service does not make it Scope 1; Scope depends on direct operational control of the combustion source." },
          { label: "All three are Scope 3 because the firm is in a leased office", correct: false, feedback: "Incorrect. Purchased grid power is always Scope 2, and owned vehicle fuel is Scope 1." }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "Refrigerants & Fugitive Gases: The Hidden High-Impact Emitters",
    minutes: 4,
    content: "Understand Global Warming Potential (GWP) and why managing AC refrigerant leaks is critical.",
    blocks: [
      { id: "cfa4-h1", type: "heading", position: 1, headingText: "Why 1 kg of Refrigerant Can Equal 2,000 kg of CO2" },
      { id: "cfa4-t1", type: "short_text", position: 2, bodyText: "Many common fluorinated refrigerants (like R-410A or R-134a) used in commercial air conditioners, cold rooms, and chillers have a Global Warming Potential (GWP) between 1,400 and 2,100 times stronger than carbon dioxide over a 100-year timescale." },
      {
        id: "cfa4-f1",
        type: "memorable_fact",
        position: 3,
        headingText: "The Impact of a Single AC Top-Up",
        bodyText: "If an office HVAC system develops a leak and technicians top up 5 kg of R-410A refrigerant during an annual service, that single leak releases the carbon equivalent of driving a diesel vehicle for over 45,000 kilometres! Refrigerant gas leak tracking and preventative maintenance are among the highest-impact climate actions a facility can take."
      },
      {
        id: "cfa4-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "Why is tracking refrigerant gas top-up logs on commercial air conditioners vital for corporate carbon reporting?",
        mcqOptions: [
          "Synthetic refrigerants have global warming potentials thousands of times higher than CO2, so even minor leaks create massive Scope 1 emissions",
          "Refrigerants are completely non-toxic and have zero effect on global warming",
          "Refrigerant gas logs are used by municipal police to issue speeding tickets",
          "Refrigerant top-ups reduce a company's Scope 2 electricity consumption to zero"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Because hydrofluorocarbons (HFCs) have enormous GWP values, refrigerant leakage represents a major fugitive Scope 1 emission source.",
        mcqIncorrectExplanation: "Incorrect. High GWP refrigerants create substantial climate impact when leaked into the atmosphere."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Direct Reduction vs Reliable Reporting",
    minutes: 4,
    content: "Distinguish what employees can directly reduce from accounting and reporting governance.",
    blocks: [
      { id: "cfa5-h1", type: "heading", position: 1, headingText: "Action Framework: Knowing Your Role" },
      { id: "cfa5-t1", type: "short_text", position: 2, bodyText: "Decarbonization requires collective action: employees reduce energy and fuel waste, while administration ensures data traceability." },
      {
        id: "cfa5-k1",
        type: "key_message",
        position: 3,
        headingText: "Act, Record & Verify",
        bodyText: "1. ACT DIRECTLY: Eliminate avoidable electricity waste (AC containment, lighting), optimize delivery routes, avoid unnecessary business travel through videoconferencing.\n2. RECORD ACTIVITY DATA: Save fuel receipts, maintain monthly electricity bills with kWh figures, log vehicle odometer readings, and keep refrigerant contractor service sheets.\n3. AVOID GREENWASHING: Never claim a product or process is 'zero carbon' or 'climate neutral' without verified boundary reports and third-party assurance."
      }
    ]
  },
  {
    order: 5,
    title: "Your Workplace Carbon Literacy Commitment",
    minutes: 3,
    content: "Select practical workplace commitments to support carbon reduction and evidence accuracy.",
    blocks: [
      { id: "cfa6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "cfa6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Carbon Footprint Awareness! Select the commitments below relevant to your role." },
      {
        id: "cfa6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your workplace carbon commitments (choose at least one):",
        commitmentOptions: [
          { value: "reduce-operational-energy", label: "Actively reduce electricity consumption in daily work to cut Scope 2 grid emissions", description: "Maintain AC thermostat standards and shutdown routines." },
          { value: "optimize-business-travel", label: "Prioritize digital meetings over unnecessary flights and vehicle travel", description: "Reduce Scope 3 business travel emissions." },
          { value: "preserve-activity-evidence", label: "Ensure fuel invoices, utility bills, and maintenance records are archived with accurate units", description: "Support audit-ready greenhouse gas reporting." },
          { value: "track-refrigerant-leaks", label: "Ensure facilities service sheets record exact refrigerant top-up quantities (kg)", description: "Prevent unrecorded high-GWP fugitive Scope 1 emissions." },
          { value: "challenge-unverified-claims", label: "Question unverified 'carbon neutral' claims and promote authentic evidence-based communications", description: "Protect the organization from greenwashing risks." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is a corporate carbon footprint in plain workplace language?",
    options: [
      "An evidence-based calculation of total greenhouse gas emissions (in CO2 equivalent) caused directly and indirectly by an organization's activities",
      "The physical dust and dirt tracked onto building floors by employee footwear",
      "A mandatory tax paid exclusively on paper printing receipts",
      "A marketing certificate stating that a business produces zero environmental impact"
    ],
    correct: 0,
    correctExplanation: "A carbon footprint estimates the warming impact of all operational activities, measured in standard units of Carbon Dioxide equivalent (CO2e).",
    incorrectExplanation: "Incorrect. A carbon footprint measures greenhouse gas emissions resulting from operational and value-chain activities."
  },
  {
    order: 2,
    question: "Which of the following is the standard formula used to calculate greenhouse gas emissions from an operational activity?",
    options: [
      "Activity Data (e.g. litres of diesel, kWh of electricity) × Emission Factor = Total CO2e",
      "Total Revenue ÷ Number of Employees = Total Carbon Footprint",
      "Square Footage of Building × Air Temperature = Kilowatts of Carbon",
      "Number of Trees in Garden + Paper Recycled = Carbon Neutrality"
    ],
    correct: 0,
    correctExplanation: "Emissions are calculated by multiplying verified activity data (quantities consumed) by authoritative emission factors.",
    incorrectExplanation: "Incorrect. Carbon accounting multiplies primary activity data by standard emission factors."
  },
  {
    order: 3,
    question: "According to the GHG Protocol, what are 'Scope 1' emissions?",
    options: [
      "Direct greenhouse gas emissions from sources owned or controlled by the company, such as fuel burned in company vans, generator diesel, and refrigerant leaks",
      "Indirect emissions from grid electricity purchased from the municipal utility",
      "Emissions generated by third-party suppliers, employee commuting, and business flights",
      "Emissions produced exclusively by international space satellites"
    ],
    correct: 0,
    correctExplanation: "Scope 1 covers direct combustion of fuels on-site or in owned vehicles, plus fugitive chemical/refrigerant gas leaks.",
    incorrectExplanation: "Incorrect. Scope 1 specifically covers direct on-site combustion and owned vehicle emissions."
  },
  {
    order: 4,
    question: "A commercial business pays its monthly municipal electricity bill for 50,000 kWh of grid power. Under which greenhouse gas scope does this electricity fall?",
    options: [
      "Scope 2 (Indirect emissions from purchased electricity, heating, or cooling)",
      "Scope 1 (Direct on-site fuel combustion)",
      "Scope 3 (Value chain supplier emissions)",
      "It is completely exempt from carbon accounting"
    ],
    correct: 0,
    correctExplanation: "Purchased electricity, steam, or cooling generated off-site and delivered via the grid is the core definition of Scope 2 emissions.",
    incorrectExplanation: "Incorrect. Purchased grid electricity is classified as Scope 2."
  },
  {
    order: 5,
    question: "Which of the following activities falls under 'Scope 3' value chain emissions for a service company?",
    options: [
      "Employee daily commuting, commercial airline business travel, and purchased office supplies",
      "Diesel fuel pumped into the company's own on-site backup generator",
      "LPG gas burned in the company's own cafeteria kitchen stove",
      "Fugitive refrigerant gas escaping from the company's own central chiller"
    ],
    correct: 0,
    correctExplanation: "Scope 3 encompasses indirect upstream and downstream value chain activities, including commercial flights, supplier goods, and employee commuting.",
    incorrectExplanation: "Incorrect. Commuting and commercial airline flights are indirect value chain (Scope 3) emissions."
  },
  {
    order: 6,
    question: "Why do synthetic chemical refrigerants (like R-410A) represent a major climate risk when air conditioners leak?",
    options: [
      "They have Global Warming Potentials (GWP) thousands of times higher than CO2, meaning a 1 kg leak can equal over 2,000 kg of carbon emissions",
      "They are highly flammable and explode whenever exposed to room air",
      "They permanently increase the electricity voltage of the entire building",
      "They make the room colder than absolute zero"
    ],
    correct: 0,
    correctExplanation: "Fluorinated refrigerant gases trap enormous heat per kilogram (high GWP), making leak prevention a critical climate priority.",
    incorrectExplanation: "Incorrect. Synthetic refrigerants have GWPs thousands of times stronger than carbon dioxide."
  },
  {
    order: 7,
    question: "An equipment supplier claims their service is '100% Carbon Neutral' because their managing director volunteers on weekend environmental cleanups. What is the correct response?",
    options: [
      "Request third-party audited carbon accounting evidence and certified offset registries; volunteer work alone does not validate a carbon neutrality claim",
      "Immediately publish the supplier's claim in your corporate annual report as verified fact",
      "Refuse to work with the supplier because volunteer work is illegal",
      "Assume the claim is valid because company directors are always legally infallible"
    ],
    correct: 0,
    correctExplanation: "Carbon neutral claims require defined scopes, verified measurement methodologies, and certified standards to avoid greenwashing.",
    incorrectExplanation: "Incorrect. Claims of carbon neutrality must be supported by transparent accounting and verified evidence."
  },
  {
    order: 8,
    question: "Why is 'CO2 equivalent' (CO2e) used as the universal standard metric in carbon reporting?",
    options: [
      "It allows the different warming impacts of various greenhouse gases (Methane, Nitrous Oxide, F-gases) to be compared and added together on a common scale",
      "It represents the exact weight of solid charcoal burned in an engine",
      "It is the only unit allowed by computer spreadsheets",
      "It eliminates the need to measure electricity bills"
    ],
    correct: 0,
    correctExplanation: "CO2e standardizes the global warming potential of multiple greenhouse gases into a single comparable figure.",
    incorrectExplanation: "Incorrect. CO2e converts the warming potential of different gases into the equivalent impact of CO2."
  },
  {
    order: 9,
    question: "Which of the following actions represents a direct, measurable operational emissions reduction for a business?",
    options: [
      "Optimizing logistics delivery routes to reduce vehicle fleet diesel consumption by 15%",
      "Changing the font size of internal email signatures to 'eco-green'",
      "Purchasing 100 novelty carbon footprint pins for staff uniforms",
      "Renaming the company parking lot to 'The Climate Zone'"
    ],
    correct: 0,
    correctExplanation: "Route optimization cuts actual fuel burned (activity data), directly reducing Scope 1 tailpipe emissions.",
    incorrectExplanation: "Incorrect. Real decarbonization reduces physical fuel, electricity, or material consumption."
  },
  {
    order: 10,
    question: "Why must primary activity records (fuel receipts, utility invoices, refrigerant service sheets) be preserved with exact units and dates?",
    options: [
      "They provide the verifiable audit trail required for credible GHG calculations, regulatory compliance, and third-party verification",
      "They are required by the post office to deliver mail",
      "They automatically lower the corporate tax rate to zero",
      "They replace the need for financial balance sheets"
    ],
    correct: 0,
    correctExplanation: "Audit-ready carbon reporting depends entirely on verifiable primary source data with clear units of measurement and dates.",
    incorrectExplanation: "Incorrect. Verifiable primary documents establish the audit trail necessary for credible greenhouse gas reporting."
  }
];

export async function ensureCarbonFootprintCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 10 by ID 10 or slug
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
        throw new Error("Course 10 not seeded by catalogue skeletons bootstrap!");
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
      const hasMissingLessons = existingLessons.length !== NEW_LESSONS.length;
      const hasEmptyBlocks = existingLessons.some(
        (l) => !l.contentBlocks || !Array.isArray(l.contentBlocks) || l.contentBlocks.length === 0
      );
      const hasMissingQuiz = existingQuizQuestions.length !== NEW_QUIZ.length;
      const hasIncorrectSlug = course.slug !== COURSE_SLUG;

      const needsRepair = !existingSeed ||
                          hasMissingLessons ||
                          hasEmptyBlocks ||
                          hasMissingQuiz ||
                          hasIncorrectSlug;

      if (!needsRepair) {
        logger.info({ courseId, slug: COURSE_SLUG }, "Carbon Footprint course content and v4 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v4 seed detected for Course 10. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "biodiversity-in-mauritius"))
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
          intendedRoles: COURSE_META.intendedRoles,
          learningObjectives: COURSE_META.learningObjectives,
          includesCertificate: COURSE_META.includesCertificate,
          passingScore: COURSE_META.passingScore,
          badgeName: COURSE_META.badgeName,
          badgeDescription: COURSE_META.badgeDescription,
          recommendedNextCourseId: nextCourseId,
          isPublished: true,
          status: "published",
          updatedAt: new Date()
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
          optionFeedback: q.options.map((_, optIdx) => 
            optIdx === q.correct ? q.correctExplanation : q.incorrectExplanation
          ),
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
          icon: "activity",
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
          version: 4,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 4 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Carbon Footprint Awareness course v4 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Carbon Footprint Awareness course seeding");
    throw err;
  }
}
