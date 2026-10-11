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

const COURSE_ID = 4;
const COURSE_SLUG = "water-conservation";
const COURSE_TITLE = "Water Conservation";
const BADGE_SLUG = "water-wise-at-work";
const SEED_NAME = "water-conservation-v3";

const COURSE_META = {
  description:
    "Learn how daily workplace habits, early leak reporting, and sensible conservation boundaries eliminate water waste without compromising hygiene, safety, or operational standards.",
  fullDescription:
    "This course covers practical water efficiency routines across Mauritian commercial facilities. It teaches employees how to identify hidden leaks, eliminate unnecessary running water, distinguish direct employee actions from technical escalation, and ensure that water conservation never compromises essential handwashing, sanitation, food safety, or operational safety.",
  categoryId: 1,
  durationMinutes: 18,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/water-conservation.png",
  learningObjectives: [
    "Explain why responsible water use matters to employees, businesses, and the Mauritian environment.",
    "Identify common forms of avoidable water waste in commercial and service workplaces.",
    "Take safe, practical actions to reduce water waste within employee authority.",
    "Distinguish between direct actions, site-procedure checks, and issues requiring technical escalation.",
    "Respond appropriately to realistic workplace water-use and leak scenarios.",
    "Select one practical workplace commitment to support responsible water stewardship."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Water Conservation. You can now recognise common water waste, practice sensible water stewardship during daily work, and escalate plumbing faults safely.",
  badgeName: "Workplace Water Steward",
  badgeDescription:
    "Awarded for demonstrating practical workplace water-conservation awareness, safe escalation, and responsible water stewardship.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "The Leak Everyone Walks Past",
    minutes: 3,
    content: "Understand why reporting minor leaks and water waste matters in Mauritian workplaces.",
    blocks: [
      { id: "wc1-h1", type: "heading", position: 1, headingText: "Arriving at a Service Area" },
      { id: "wc1-t1", type: "short_text", position: 2, bodyText: "Imagine walking into a workplace service area. A washroom tap is dripping continuously into a filled sink, an outdoor hose is running water onto hard pavement, and a toilet cistern keeps refilling in the background. Several staff members have walked past, assuming someone else reported it. Nobody did." },
      { id: "wc1-k1", type: "key_message", position: 3, headingText: "Do Not Assume Someone Else Has Reported It", bodyText: "Never assume another colleague or cleaner has reported a leak. Reporting a small dripping tap or running cistern takes less than a minute, preventing thousands of litres of wasted treated water and avoiding major pipe bursts." },
      {
        id: "wc1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Morning arrival decision scenario:",
        decisionPrompt: "You notice a washroom tap dripping continuously after use. It has been like this for two days. What should you do?",
        decisionChoices: [
          { label: "Report the exact location and dripping issue to facilities or management promptly", correct: true, feedback: "Perfect! Prompt reporting through approved channels prevents cumulative water waste and larger plumbing damage." },
          { label: "Ignore it, assuming maintenance will notice it during regular checks", correct: false, feedback: "Incorrect. Assuming others will report it allows minor leaks to waste thousands of litres over time." },
          { label: "Attempt to dismantle the tap fixture with personal tools to fix it yourself", correct: false, feedback: "Never attempt unauthorized plumbing repairs! General employees should report faults to qualified facilities staff." }
        ]
      },
      {
        id: "wc1-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "Why should employees report minor dripping taps or refilling cisterns immediately?",
        mcqOptions: [
          "Small persistent leaks add up to thousands of litres of wasted water over time and may indicate worsening pipe faults",
          "Dripping taps are required by building regulations to remain unreported",
          "Building management pays employees a cash bonus for every leak reported",
          "Water meters stop running when leaks are small"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Persistent drips waste massive volumes of treated water and signal underlying valve or pipe wear.",
        mcqIncorrectExplanation: "Incorrect. Minor leaks cause significant cumulative loss and require early reporting."
      }
    ]
  },
  {
    order: 1,
    title: "Why Water Conservation Matters in Mauritius",
    minutes: 3,
    content: "Connect responsible water use to community, business continuity, and island ecosystems.",
    blocks: [
      { id: "wc2-h1", type: "heading", position: 1, headingText: "Three Water Conservation Perspectives" },
      { id: "wc2-t1", type: "short_text", position: 2, bodyText: "In Mauritius, treated fresh water is a vital shared resource. Efficient water management in commercial premises supports island resilience across three key areas:" },
      {
        id: "wc2-k1",
        type: "key_message",
        position: 3,
        headingText: "Community, Business & Environment",
        bodyText: "• Community Impact: Responsible commercial water use ensures steady supply for local healthcare, domestic, and municipal needs.\n• Business Continuity: Eliminating leaks prevents structural water damage, avoids high utility surcharges, and ensures uninterrupted operational service.\n• Environmental Protection: Reducing unnecessary pumping and treatment lowers grid electricity load and protects coastal ecosystems."
      },
      {
        id: "wc2-w1",
        type: "workplace_example",
        position: 4,
        headingText: "Hygiene & Safety Protection Rule",
        bodyText: "CRITICAL PRINCIPLE: Water conservation must NEVER compromise handwashing, surface sanitization, food safety, or medical infection control. Always use necessary water for thorough hygiene—conservation targets avoidable waste, not essential sanitation."
      }
    ]
  },
  {
    order: 2,
    title: "Common Sources of Waste & Sourced Facts",
    minutes: 4,
    content: "Identify frequent sources of workplace water loss and learn sourced conservation facts.",
    blocks: [
      { id: "wc3-h1", type: "heading", position: 1, headingText: "Recognising Avoidable Water Waste" },
      { id: "wc3-t1", type: "short_text", position: 2, bodyText: "Avoidable water waste frequently occurs during routine cleaning, washroom use, landscaping, and kitchen operations." },
      {
        id: "wc3-f1",
        type: "memorable_fact",
        position: 3,
        headingText: "Did You Know? (Worth Knowing)",
        bodyText: "According to United Nations Environment Programme (UNEP) and WHO technical guidelines, a single commercial tap dripping at just 1 drip per second wastes over 11,000 litres of clean treated water per year! Promptly closing taps fully and reporting worn washers eliminates this massive hidden loss."
      },
      {
        id: "wc3-w1",
        type: "workplace_example",
        position: 4,
        headingText: "Misconception: Hose Down vs Broom Cleaning",
        bodyText: "Myth: 'Hosing down outdoor hardstanding and walkways is the fastest way to clean.' Fact: Sweeping hard surfaces with a broom before spot-cleaning uses up to 90% less water and prevents silt runoff into storm drains."
      },
      {
        id: "wc3-d1",
        type: "decision_scenario",
        position: 5,
        title: "Outdoor Cleaning Water Practice",
        situation: "A contractor is preparing to clean a 50-metre paved delivery bay using a high-pressure open hose, leaving water running into the stormwater grate.",
        options: [
          {
            id: "opt-1",
            text: "Request the team sweep loose debris with brooms first and use trigger-nozzle washdown only where necessary.",
            isCorrect: true,
            feedback: "Correct! Sweeping dry debris saves thousands of litres and prevents sediment discharge into local waterways.",
            explanation: "Dry sweeping before targeted washing is standard water-saving practice."
          },
          {
            id: "opt-2",
            text: "Let the open hose run continuously across the entire bay until all debris washes into the drain.",
            isCorrect: false,
            feedback: "Incorrect. Continuous open-hose washdown wastes massive amounts of treated water and risks overloading drainage.",
            explanation: "Continuous open hoses should never be used for pavement cleaning."
          }
        ]
      },
      {
        id: "wc3-m1",
        type: "multiple_choice",
        position: 6,
        mcqQuestion: "Which practice represents avoidable workplace water waste?",
        mcqOptions: [
          "Leaving a garden hose running continuously on hard pavement while taking a break",
          "Washing hands thoroughly with soap for 20 seconds as required by hygiene guidelines",
          "Sanitizing food-prep surfaces using required water concentrations",
          "Operating a commercial dishwasher only when fully loaded"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Leaving hoses running on hard pavement is pure waste. Handwashing and food safety sanitation are essential needs.",
        mcqIncorrectExplanation: "Incorrect. Running hoses unattended on pavement wastes water; handwashing and food sanitation are non-negotiable."
      }
    ]
  },
  {
    order: 3,
    title: "Inspecting Workplace Water Boundaries",
    minutes: 4,
    content: "Practice identifying water waste, safety hazards near electricity, and escalation rules.",
    blocks: [
      { id: "wc4-h1", type: "heading", position: 1, headingText: "Workplace Service Area Inspection" },
      { id: "wc4-t1", type: "short_text", position: 2, bodyText: "Examine a real Mauritian workplace service area. Observe the dripping sink tap, the outdoor hose running on pavement, and the electrical safety warning sign." },
      {
        id: "wc4-img1",
        type: "visual_question",
        position: 3,
        imageUrl: "/images/courses/visual-workplace-water-waste.png",
        caption: "Workplace Service Area Inspection: Stainless steel sink with dripping tap, outdoor running hose, and safety sign: 'CAUTION: KEEP ELECTRICAL EQUIPMENT DRY - REPORT LEAKS IMMEDIATELY'.",
        imageAlt: "Realistic photograph of a modern Mauritian workplace service area featuring a stainless steel sink with a dripping commercial tap, an open doorway showing a hose running on hard pavement, and a prominent warning sign: CAUTION: KEEP ELECTRICAL EQUIPMENT DRY - REPORT LEAKS IMMEDIATELY."
      },
      {
        id: "wc4-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "In the workplace inspection scene above, what must you do if you observe water pooling near an electrical appliance or wall outlet?",
        mcqOptions: [
          "Escalate the hazard immediately to facilities/safety officers without touching electrical equipment or stepping into pooled water",
          "Mop up the water while holding active power cords with bare hands",
          "Ignore the water because electricity and water naturally mix",
          "Attempt to repair the electrical outlet using a metal screwdriver"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Water near electrical equipment presents severe electrocution hazards. Never touch electrical gear in wet conditions—escalate to safety staff immediately.",
        mcqIncorrectExplanation: "Incorrect. Water near electrical equipment is a life-safety hazard requiring immediate professional escalation."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Act, Check & Escalate",
    minutes: 3,
    content: "Categorize water actions into direct employee habits, site checks, and technical escalation.",
    blocks: [
      { id: "wc5-h1", type: "heading", position: 1, headingText: "Three Levels of Action" },
      { id: "wc5-t1", type: "short_text", position: 2, bodyText: "Group your daily workplace water actions into three distinct safety levels:" },
      {
        id: "wc5-k1",
        type: "key_message",
        position: 3,
        headingText: "Act, Check & Escalate Framework",
        bodyText: "1. ACT DIRECTLY: Turn off running taps fully, sweep hard surfaces before washing, report visible drips.\n2. CHECK SITE PROCEDURE: Scheduled landscape watering, commercial dishwashing load rules, authorized water reuse.\n3. ESCALATE TO FACILITIES: Persistent leaks, running toilet cisterns, burst pipes, water near electrical gear, or concealed wall dampness."
      },
      {
        id: "wc5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "End-of-shift persistent leak scenario:",
        decisionPrompt: "At 5:30 PM on a Friday, you discover a slow leak under a kitchen sink. Water is dripping into a bucket, but the bucket will overflow by morning. The main maintenance technician has left. What should you do?",
        decisionChoices: [
          { label: "Place a larger temporary basin and notify the emergency facilities/after-hours contact with the exact location", correct: true, feedback: "Outstanding! Combining temporary containment with official after-hours escalation prevents weekend flooding." },
          { label: "Leave the small bucket as is and go home without telling anyone", correct: false, feedback: "Incorrect! The bucket will overflow overnight, causing floor damage." },
          { label: "Turn off random main water valves in the building basement without authorization", correct: false, feedback: "Never turn main building valves without training! Doing so may cut off fire suppression or essential hygiene lines." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Water Stewardship Commitment",
    minutes: 3,
    content: "Select practical daily water-saving commitments for your work routine.",
    blocks: [
      { id: "wc6-h1", type: "heading", position: 1, headingText: "Pledge to Act" },
      { id: "wc6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing the lessons! Select the water stewardship habits you commit to practice in your daily work routine." },
      {
        id: "wc6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your daily workplace water commitments (choose at least one):",
        commitmentOptions: [
          { value: "report-drips", label: "Report dripping taps or running toilet cisterns promptly", description: "Prevent hidden water loss by notifying facilities immediately." },
          { value: "close-taps-fully", label: "Ensure washroom and kitchen taps are fully closed after use", description: "Eliminate avoidable drip waste during routine work." },
          { value: "sweep-before-wash", label: "Sweep walkways and hardstanding before spot-cleaning", description: "Replace excessive hose washing with efficient broom sweeping." },
          { value: "protect-hygiene", label: "Maintain essential handwashing and hygiene standards", description: "Ensure water conservation never compromises health or sanitation." },
          { value: "escalate-electrical-hazards", label: "Escalate leaks near electrical gear or concealed pipes", description: "Prioritize workplace safety by reporting complex leaks safely." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "Why should employees report minor dripping taps or refilling cisterns promptly?",
    options: [
      "A dripping tap causes zero water loss over an entire year",
      "Water in commercial buildings is completely free and unlimited in Mauritius",
      "Even a slow drip can waste thousands of litres of fresh water over time and strains island storage reservoirs",
      "Dripping taps are required by building regulations to remain unreported"
],
    correct: 2,
    correctExplanation: "Slow leaks accumulate into significant losses over days and weeks, wasting treated drinking water.",
    incorrectExplanation: "Incorrect. Even minor leaks waste substantial volumes of treated water.",
    optionFeedback: [
      "Incorrect. A tap dripping at one drop per second wastes over 10,000 litres of water annually.",
      "Incorrect. Commercial water is metered and treated, and Mauritius experiences seasonal reservoir constraints.",
      "Correct. Prompt leak reporting prevents cumulative water waste and protects island water resources like Mare aux Vacoas.",
      "Incorrect. Building standards prioritize water efficiency and leak prevention."
]
  },
  {
    order: 2,
    question: "What is the relationship between water conservation and workplace hygiene?",
    options: [
      "Handwashing and sanitisation must never be compromised while avoiding running taps continuously when lathering",
      "Employees should stop washing their hands to save water",
      "Hygiene rules only apply to hospital operating theatres",
      "Using soap without water is the recommended commercial practice"
],
    correct: 0,
    correctExplanation: "Effective water conservation maintains complete hygiene and health standards by eliminating waste, not cleanliness.",
    incorrectExplanation: "Incorrect. Water conservation never compromises health, sanitation, or handwashing.",
    optionFeedback: [
      "Correct. Thorough handwashing with soap protects health; turn off taps while lathering or use sensor taps to prevent waste.",
      "Incorrect. Sacrificing handwashing violates health regulations and spreads workplace illness.",
      "Incorrect. Hand hygiene is essential across all offices, hospitality, retail, and manufacturing workplaces.",
      "Incorrect. Proper hand hygiene requires clean rinsing water."
]
  },
  {
    order: 3,
    question: "Which of the following actions should be classified under 'TECHNICAL ESCALATION' rather than general employee action?",
    options: [
      "Turning off a sink tap tightly after washing hands",
      "Repairing an underground water main rupture or adjusting mechanical booster pump pressure valves",
      "Wiping down a dining table with a damp cloth instead of hosing the floor",
      "Reporting a running toilet cistern to the maintenance desk"
],
    correct: 1,
    correctExplanation: "Major plumbing repairs, pressure regulation, and underground lines require licensed plumbers and specialized equipment.",
    incorrectExplanation: "Incorrect. Complex piping, pumps, and underground repairs must be escalated to qualified technicians.",
    optionFeedback: [
      "Incorrect. Closing taps tightly is a basic everyday responsibility for all employees.",
      "Correct. High-pressure valves, booster pumps, and buried pipelines involve safety hazards and require qualified engineering technicians.",
      "Incorrect. Wiping surfaces with a damp microfiber cloth is a standard daily cleaning practice.",
      "Incorrect. Logging a maintenance report is an everyday reporting action for all staff."
]
  },
  {
    order: 4,
    question: "What is a water-efficient alternative to hosing down outdoor driveways, loading docks, or hardstands?",
    options: [
      "Using an open high-pressure fire hose for two hours",
      "Leaving running garden hoses unattended overnight",
      "Pumping sea water directly onto office carpets",
      "Sweeping with a stiff outdoor broom and using spot cleaning with a mop and bucket for stubborn marks"
],
    correct: 3,
    correctExplanation: "Dry sweeping removes leaves and dust effectively without consuming hundreds of litres of potable water.",
    incorrectExplanation: "Incorrect. Dry sweeping with brooms replaces wasteful outdoor hose washing.",
    optionFeedback: [
      "Incorrect. Using fire hoses for routine cleaning wastes thousands of litres and violates fire safety equipment protocols.",
      "Incorrect. Leaving hoses running unattended causes massive water loss and soil erosion.",
      "Incorrect. Sea water damages interior flooring and introduces corrosive salt crystals.",
      "Correct. Sweeping dry debris with a broom and spot-cleaning stains saves hundreds of litres of potable water per clean."
]
  },
  {
    order: 5,
    question: "At the end of your shift, you notice water pooling under a staff kitchenette sink. What is the most appropriate first action?",
    options: [
      "Walk away because your shift has ended",
      "Check if safe, close the local mini-ball isolation valve under the sink, and report the leak immediately to maintenance",
      "Cover the puddle with paper towels and hope it evaporates by morning",
      "Pour dishwashing liquid into the puddle to make it smell fresh"
],
    correct: 1,
    correctExplanation: "Isolating the local supply stops the leak immediately, while logging a ticket ensures a permanent repair before overnight flooding.",
    incorrectExplanation: "Incorrect. Isolating the local valve if safe and notifying maintenance prevents flooding.",
    optionFeedback: [
      "Incorrect. Ignoring leaks can lead to overnight flooding, structural damage, and severe water loss.",
      "Correct. Turning the local isolation valve stops the flow safely, and logging a maintenance ticket ensures rapid morning repair.",
      "Incorrect. Paper towels cannot absorb a continuous pipe leak and create unhygienic pulp waste.",
      "Incorrect. Soap in water creates an extreme slip-and-fall hazard for colleagues and cleaning crews."
]
  },
  {
    order: 6,
    question: "How should employees use dual-flush toilet cisterns to achieve intended water savings?",
    options: [
      "Use the half-flush button for liquid waste and the full-flush button only when necessary for solid waste",
      "Press both buttons simultaneously with maximum force every time",
      "Hold down the full-flush button for three minutes",
      "Never flush toilets during the working day"
],
    correct: 0,
    correctExplanation: "Dual-flush toilets save 3 to 5 litres per use when employees correctly choose the half-flush button for liquid waste.",
    incorrectExplanation: "Incorrect. Use the smaller button for liquid waste and the full flush only when needed.",
    optionFeedback: [
      "Correct. Half-flush uses approximately 3 litres compared to 6\u20139 litres for full flush, saving thousands of litres across a busy workforce.",
      "Incorrect. Pressing both buttons can jam the internal valve mechanism and cause continuous refilling leaks.",
      "Incorrect. Holding buttons down does not increase effectiveness and wastes water.",
      "Incorrect. Proper sanitary flushing is essential for hygiene; use the appropriate flush volume."
]
  },
  {
    order: 7,
    question: "In commercial kitchen and canteen operations, what dishwashing habit conserves the most water?",
    options: [
      "Letting kitchen taps run at full blast for three hours during vegetable prep",
      "Thawing frozen poultry and seafood under continuous warm running water",
      "Hosing down clean floor tiles with hot drinking water",
      "Scraping food residues into compost/waste bins and washing dishes in filled wash/rinse basins rather than under continuous flowing taps"
],
    correct: 3,
    correctExplanation: "Pre-scraping plates and washing in filled multi-compartment sinks uses a fraction of the water compared to continuous tap flow.",
    incorrectExplanation: "Incorrect. Pre-scraping and using filled sinks conserves substantial kitchen water.",
    optionFeedback: [
      "Incorrect. Continuous running taps during food prep can waste over 1,000 litres of treated water per shift.",
      "Incorrect. Running water thawing wastes huge volumes; thaw items in refrigerated chillers overnight instead.",
      "Incorrect. Floor hosing wastes water; use mops and buckets with appropriate sanitation cleaning solutions.",
      "Correct. Scrape food waste into bins dry, then use filled wash and rinse basins to maximize cleaning efficiency per litre."
]
  },
  {
    order: 8,
    question: "When watering workplace gardens or potted landscaped areas in Mauritius, what is the best schedule to minimize evaporation?",
    options: [
      "Water at midday between 12 PM and 2 PM under direct tropical sunshine",
      "Leave automated sprinklers running during tropical downpours",
      "Water early in the morning before 8 AM or in the evening after 5 PM",
      "Pour boiling water on decorative shrub roots twice daily"
],
    correct: 2,
    correctExplanation: "Watering during cooler morning or evening hours allows moisture to penetrate soil roots before the tropical sun evaporates it.",
    incorrectExplanation: "Incorrect. Watering early morning or late afternoon prevents evaporative water loss.",
    optionFeedback: [
      "Incorrect. Midday watering causes up to 40% of applied water to evaporate immediately into the atmosphere.",
      "Incorrect. Running irrigation during heavy rain is wasteful and causes soil waterlogging.",
      "Correct. Morning and evening watering gives roots time to absorb water without intense solar evaporation.",
      "Incorrect. Boiling water kills beneficial soil organisms and destroys plant root systems."
]
  },
  {
    order: 9,
    question: "What is the primary benefit of installing water aerators on commercial handwashing taps?",
    options: [
      "They mix air into the water stream, reducing flow volume by up to 50% while maintaining strong wash pressure",
      "They heat tap water to 90\u00b0C instantly without using electricity",
      "They turn tap water into sparkling mineral water for office staff",
      "They completely stop water from flowing out of the faucet"
],
    correct: 0,
    correctExplanation: "Aerators introduce micro-bubbles into the water stream, cutting volume while maintaining effective washing velocity.",
    incorrectExplanation: "Incorrect. Tap aerators mix air into water to reduce consumption without losing pressure.",
    optionFeedback: [
      "Correct. Aerators maintain high perceived stream pressure and coverage while reducing flow from 10 L/min to 4\u20135 L/min.",
      "Incorrect. Aerators are passive mesh screens; they do not heat water.",
      "Incorrect. Aerators do not carbonize water into sparkling beverage streams.",
      "Incorrect. Aerators maintain smooth water flow; they do not block faucets."
]
  },
  {
    order: 10,
    question: "Why must commercial organisations in Mauritius practice year-round water conservation, even during rainy cyclone periods?",
    options: [
      "Because water pipes are dismantled by the water authority every winter",
      "Because rainwater cannot enter island rivers or dams",
      "Because commercial buildings are legally prohibited from connecting to water grids",
      "Because island reservoirs have finite storage capacity, and dry season deficits can quickly threaten national water security"
],
    correct: 3,
    correctExplanation: "Mauritius relies on seasonal storage in reservoirs and aquifers; heavy cyclone runoff passes quickly to the sea, making year-round conservation essential.",
    incorrectExplanation: "Incorrect. Finite reservoir storage and seasonal dry periods require consistent year-round conservation.",
    optionFeedback: [
      "Incorrect. Water networks operate throughout the year across all districts.",
      "Incorrect. Rainwater feeds surface dams and aquifers, but excess runoff drains to the ocean.",
      "Incorrect. Commercial buildings connect to the Central Water Authority (CWA) grid and private licensed boreholes.",
      "Correct. Storage dams (like La Nicoli\u00e8re, Piton du Milieu, Mare aux Vacoas) fill quickly but deplete during dry months; steady commercial habits protect resilience."
]
  }
];

export async function ensureWaterConservationCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 4 by ID 4 or slug
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
        throw new Error("Course 4 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Water Conservation course content and v2 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course 4. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "carbon-footprint-awareness"))
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
          icon: "droplet",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 9,
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

      logger.info({ courseId, slug: COURSE_SLUG }, "Water Conservation course v2 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute idempotent seeding/repair of Water Conservation course");
  }
}
