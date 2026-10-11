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

const COURSE_ID = 3;
const COURSE_SLUG = "energy-efficiency-at-work";
const COURSE_TITLE = "Energy Efficiency at Work";
const BADGE_SLUG = "energy-saver";
const SEED_NAME = "energy-efficiency-at-work-v3";

const COURSE_META = {
  description:
    "Help employees identify avoidable workplace energy waste, optimize air-conditioning and lighting habits, follow end-of-day shutdown procedures, and escalate technical issues safely.",
  fullDescription:
    "This course covers simple daily habits and safe workplace practices that reduce electricity consumption and lower operating costs in Mauritian facilities. Tailored for office, retail, hospitality, and warehouse staff, it teaches learners how to optimize cooling, eliminate unnecessary standby power, and distinguish direct employee actions from technical issues requiring facilities escalation.",
  categoryId: 1,
  durationMinutes: 20,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/energy-efficiency.png",
  learningObjectives: [
    "Recognise common sources of avoidable workplace energy waste in Mauritian facilities.",
    "Distinguish between direct employee actions, site-procedure checks, and technical escalation.",
    "Apply appropriate energy-saving practices without affecting safety, comfort, or critical operations.",
    "Respond safely and effectively to realistic workplace energy-waste situations.",
    "Choose one practical energy-efficiency commitment relevant to your daily role."
  ],
  includesCertificate: true,
  passingScore: 80,
  badgeName: "Energy Saver",
  badgeDescription: "Awarded for completing Energy Efficiency at Work and committing to practical workplace energy-saving actions."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Workplace Energy: Where Does It Go?",
    minutes: 3,
    content: "Understand primary energy users and your role in safe energy efficiency.",
    blocks: [
      { id: "ee1-h1", type: "heading", position: 1, headingText: "Arriving at an Empty Office" },
      { id: "ee1-t1", type: "short_text", position: 2, bodyText: "Imagine arriving at work at 7:45 AM. The main office floor is still empty, yet overhead lights are fully lit, air-conditioning louvers are blasting cold air beside an open balcony window, and several computer displays are glowing. What should you touch, what requires checking, and what should be left alone?" },
      { id: "ee1-k1", type: "key_message", position: 3, headingText: "Safety and Operations Take Priority", bodyText: "Energy efficiency means achieving required workplace results without wasting power. However, operational safety, food safety, data integrity, and employee comfort ALWAYS take priority over switching off equipment indiscriminately." },
      {
        id: "ee1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Morning arrival decision scenario:",
        decisionPrompt: "You walk into an empty glass boardroom at 8:00 AM. Overhead panel lights are fully turned on, but no meetings are scheduled until 10:30 AM. What should you do?",
        decisionChoices: [
          { label: "Switch off the boardroom lights until the scheduled meeting time", correct: true, feedback: "Perfect! Switching off lighting in empty, unused meeting rooms is a safe, direct employee action." },
          { label: "Leave the lights on because someone might enter eventually", correct: false, feedback: "Incorrect. Lighting empty rooms for hours causes avoidable energy waste." },
          { label: "Locate the main electrical circuit breaker panel and flip the breaker", correct: false, feedback: "Never open or tamper with electrical panels! General employees must use normal wall switches only." }
        ]
      },
      {
        id: "ee1-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "What is the core definition of workplace energy efficiency?",
        mcqOptions: [
          "Achieving required business results while eliminating unnecessary energy waste",
          "Switching off all electrical equipment indiscriminately regardless of safety",
          "Setting air conditioning to the coldest possible temperature",
          "Disconnecting server racks and food storage refrigerators overnight"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Energy efficiency focuses on avoiding waste while preserving safety, comfort, and operational needs.",
        mcqIncorrectExplanation: "Incorrect. Indiscriminate shut-downs compromise safety and business operations."
      }
    ]
  },
  {
    order: 1,
    title: "Smarter Air Conditioning & Humidity Control",
    minutes: 3,
    content: "Optimize cooling settings and contain conditioned air in tropical environments.",
    blocks: [
      { id: "ee2-h1", type: "heading", position: 1, headingText: "Cooling in the Mauritian Climate" },
      { id: "ee2-t1", type: "short_text", position: 2, bodyText: "In tropical Mauritian weather, air-conditioning and ventilation systems are the largest single consumer of commercial electricity. Small habits have a significant cumulative impact on building load." },
      { id: "ee2-k1", type: "key_message", position: 3, headingText: "The 24°C Comfort Benchmark", bodyText: "Setting thermostats around 24°C provides a comfortable indoor working environment while preventing compressor overwork. Setting an AC unit to 16°C does NOT cool a warm room any faster—it only forces the compressor to run continuously." },
      {
        id: "ee2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "AC and window scenario:",
        decisionPrompt: "You enter a shared office where the wall-mounted AC unit is running on high cooling, but a large balcony window right beside it is open to the warm tropical garden outside. What is the correct response?",
        decisionChoices: [
          { label: "Close the open window immediately to contain the conditioned air", correct: true, feedback: "Excellent! Keeping windows and doors closed prevents heavy cooling leakage and compressor strain." },
          { label: "Lower the AC thermostat temperature to 16°C to fight the outside heat", correct: false, feedback: "Incorrect! Lowering the temperature while windows are open wastes massive amounts of electricity." },
          { label: "Unplug the AC unit's main wiring from the wall", correct: false, feedback: "Never tamper with hardwired electrical connections. Use remote/wall controls or close the window." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Standby Power & Sourced Energy Facts",
    minutes: 4,
    content: "Discover standby energy waste and learn sourced efficiency principles.",
    blocks: [
      { id: "ee3-h1", type: "heading", position: 1, headingText: "Vampire Power & Standby Waste" },
      { id: "ee3-t1", type: "short_text", position: 2, bodyText: "Many workplace devices—monitors, desktop printers, coffee machines, chargers, and AV systems—continue drawing power even when sitting idle in standby mode." },
      {
        id: "ee3-f1",
        type: "memorable_fact",
        position: 3,
        headingText: "Did You Know? (Worth Knowing)",
        bodyText: "According to the International Energy Agency (IEA), standby power consumption in commercial electronics accounts for up to 10% to 15% of total office appliance electricity use! Enabling automatic sleep modes and switching off non-essential displays at night eliminates this vampire load without affecting productivity."
      },
      {
        id: "ee3-w1",
        type: "workplace_example",
        position: 4,
        headingText: "Misconception: Lowest AC Setting Cools Faster",
        bodyText: "Myth: 'Setting the AC to 16°C cools down a hot office faster than setting it to 24°C.' Fact: AC units supply air at a constant output temperature. Setting a lower target temperature only delays when the compressor cycles off, wasting energy without speeding up cooling."
      },
      {
        id: "ee3-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "What is standby or 'vampire' power waste in a commercial workplace?",
        mcqOptions: [
          "Electricity drawn by electronic devices while sitting idle or turned off in standby mode",
          "Power consumed by solar panels during high daylight hours",
          "Electricity used exclusively by heavy industrial motors",
          "Power generated by backup diesel generators"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Standby power refers to idle energy drawn by displays, chargers, and appliances when not actively in use.",
        mcqIncorrectExplanation: "Incorrect. Standby power is the continuous background draw of idle electronics."
      }
    ]
  },
  {
    order: 3,
    title: "Inspecting Your Workplace Energy Boundaries",
    minutes: 4,
    content: "Identify energy waste and distinguish safe actions from critical equipment.",
    blocks: [
      { id: "ee4-h1", type: "heading", position: 1, headingText: "Workplace Energy Inspection" },
      { id: "ee4-t1", type: "short_text", position: 2, bodyText: "Examine a real Mauritian workplace interior. Observe the wall AC unit running beside an open window, the lit empty boardroom, an active workstation monitor, and a breakroom refrigerator." },
      {
        id: "ee4-img1",
        type: "visual_question",
        position: 3,
        imageUrl: "/images/courses/visual-workplace-energy-waste.png",
        caption: "Workplace Energy Inspection: Wall AC running near an open window, lit empty boardroom, active monitor, and a breakroom fridge labelled 'DO NOT UNPLUG'.",
        imageAlt: "Realistic photograph of a modern Mauritian workplace showing an active AC unit beside an open window, an unoccupied lit glass boardroom, an active computer monitor, and a breakroom mini-fridge with a prominent red 'DO NOT UNPLUG' safety label."
      },
      {
        id: "ee4-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "In the workplace inspection scene above, which action represents an UNSAFE or PROHIBITED action for general employees?",
        mcqOptions: [
          "Unplugging or turning off the breakroom refrigerator labelled 'DO NOT UNPLUG'",
          "Closing the open window beside the active air conditioning unit",
          "Switching off lights in the unoccupied glass boardroom",
          "Setting your own workstation computer display to automatic sleep mode"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Never disconnect critical appliances (like refrigerators, server equipment, or medical storage) marked 'DO NOT UNPLUG'. Disconnecting them ruins stored goods and violates operational safety rules.",
        mcqIncorrectExplanation: "Incorrect. Closing windows and switching off unneeded lights are safe direct actions. Disconnecting critical refrigerators is prohibited."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Act, Check & Escalate",
    minutes: 3,
    content: "Categorize energy actions into direct habits, site checks, and technical escalation.",
    blocks: [
      { id: "ee5-h1", type: "heading", position: 1, headingText: "Three Categories of Action" },
      { id: "ee5-t1", type: "short_text", position: 2, bodyText: "To maintain workplace safety while saving power, group your daily actions into three distinct categories:" },
      {
        id: "ee5-k1",
        type: "key_message",
        position: 3,
        headingText: "Act, Check & Escalate",
        bodyText: "1. ACT DIRECTLY: Switch off lights in empty rooms, turn off personal monitors, close windows near AC.\n2. CHECK SITE PROCEDURE: Shared printers, central AV equipment, or multi-user workstation hubs.\n3. ESCALATE TO FACILITIES: Faulty door seals, leaking AC units, broken thermostats, or electrical panel issues."
      },
      {
        id: "ee5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "End-of-day shared workspace scenario:",
        decisionPrompt: "You are leaving the office at 6:00 PM. A central desktop printer is connected to a shared network server, and a thermostat is showing an error code. What is the correct combination of actions?",
        decisionChoices: [
          { label: "Follow the site procedure for the shared printer, switch off your personal screen, and report the thermostat error code to facilities", correct: true, feedback: "Outstanding! This perfectly balances direct action, procedural compliance, and technical escalation." },
          { label: "Unplug every wire on the floor including network routers and server cords", correct: false, feedback: "Incorrect! Disconnecting shared network infrastructure disrupts overnight IT processes." },
          { label: "Do nothing and leave everything running all weekend", correct: false, feedback: "Incorrect. Personal equipment and unneeded lighting should be addressed." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Energy Efficiency Commitment",
    minutes: 3,
    content: "Select practical daily energy habits for your work routine.",
    blocks: [
      { id: "ee6-h1", type: "heading", position: 1, headingText: "Pledge to Act" },
      { id: "ee6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing the lessons! Choose the energy-saving commitments you will practice in your daily work routine." },
      {
        id: "ee6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your daily workplace energy commitments (choose at least one):",
        commitmentOptions: [
          { value: "switch-empty-lights", label: "Switch off lights in empty rooms and shared spaces", description: "Turn off lighting when leaving meeting rooms or break areas." },
          { value: "keep-windows-closed", label: "Keep windows and doors closed while air conditioning is running", description: "Contain conditioned air and prevent compressor overload." },
          { value: "ac-24-degrees", label: "Maintain AC thermostat settings around 24°C", description: "Avoid excessively low temperature settings." },
          { value: "shutdown-pc", label: "Shut down personal workstation displays at the end of the day", description: "Eliminate overnight standby power draw on personal devices." },
          { value: "report-faulty-controls", label: "Report leaking AC units, broken seals, or faulty controls to facilities", description: "Escalate technical maintenance issues promptly." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the primary goal of workplace energy efficiency?",
    options: [
      "To work in complete darkness and disable all computers",
      "To eliminate electricity completely by moving all operations outdoors",
      "To deliver the same or better operational productivity and comfort while using less energy",
      "To satisfy decorative corporate marketing goals without changing consumption"
],
    correct: 2,
    correctExplanation: "Energy efficiency focuses on eliminating waste while maintaining productive business operations and comfort.",
    incorrectExplanation: "Incorrect. Energy efficiency delivers productivity and comfort with less energy.",
    optionFeedback: [
      "Incorrect. Extreme privation damages business productivity and worker health.",
      "Incorrect. Operations require reliable power; efficiency optimizes rather than halts use.",
      "Correct. True efficiency maintains productive output, comfort, and service quality with reduced kilowatt-hours.",
      "Incorrect. Marketing claims without consumption reduction do not constitute energy efficiency."
]
  },
  {
    order: 2,
    question: "Why is keeping windows and doors closed essential when air conditioning is running in a Mauritian facility?",
    options: [
      "It prevents hot, humid outdoor air from entering, which reduces cooling load and energy waste",
      "It is a legal requirement enforced by the local police station",
      "It makes the indoor air temperature rise to 35\u00b0C immediately",
      "It increases the amount of dust inside the room"
],
    correct: 0,
    correctExplanation: "Open doors and windows allow hot humid air in, forcing air conditioners to work continuously at maximum power.",
    incorrectExplanation: "Incorrect. Keeping openings closed prevents external heat and moisture from overwhelming the cooling system.",
    optionFeedback: [
      "Correct. In Mauritius' tropical climate, outdoor humidity and heat force compressors to run continuously if openings are unsealed.",
      "Incorrect. This is an operational efficiency best practice rather than a police-enforced penal code.",
      "Incorrect. Closing windows retains cooled air inside the room.",
      "Incorrect. Closed windows reduce the ingress of outdoor dust and particulate matter."
]
  },
  {
    order: 3,
    question: "What is 'vampire' or standby power draw in commercial equipment?",
    options: [
      "Power consumed exclusively by horror movie production equipment",
      "Electricity drawn by electronic devices while plugged in but turned off or in idle mode",
      "A billing penalty charged when facilities consume electricity after midnight",
      "The energy needed to recharge high-voltage electric delivery trucks"
],
    correct: 1,
    correctExplanation: "Standby power refers to the continuous electricity drawn by appliances and chargers even when idle.",
    incorrectExplanation: "Incorrect. Standby power is the continuous background draw of devices when not in active use.",
    optionFeedback: [
      "Incorrect. Standby power is a universal electrical phenomenon affecting all electronic appliances.",
      "Correct. Devices with internal transformers, remote sensors, or LED displays draw continuous power when plugged in.",
      "Incorrect. Standby power is physical energy consumption, not a tariff penalty rate.",
      "Incorrect. Charging vehicle batteries is active high-power consumption, not standby draw."
]
  },
  {
    order: 4,
    question: "Which of the following equipment must NEVER be switched off or unplugged during a routine office energy sweep?",
    options: [
      "Individual desk phone chargers",
      "Electric water coolers in the staff pantry",
      "Unoccupied meeting room presentation monitors",
      "Core IT server racks, network switches, and emergency exit lighting"
],
    correct: 3,
    correctExplanation: "Critical network hardware, telecommunications, and safety systems must remain powered continuously.",
    incorrectExplanation: "Incorrect. Core IT, network, and life-safety systems must never be disconnected.",
    optionFeedback: [
      "Incorrect. Phone chargers can and should be safely unplugged when not in use.",
      "Incorrect. Pantry coolers can be put on timers or powered down during extended holiday shutdowns.",
      "Incorrect. Meeting room monitors should be powered down when rooms are vacant.",
      "Correct. Disrupting IT server infrastructure or safety emergency signs causes business downtime and safety risks."
]
  },
  {
    order: 5,
    question: "What is the correct action when you notice an office thermostat set to 18\u00b0C while occupants are shivering in sweaters?",
    options: [
      "Open all exterior windows to warm the room with outdoor air",
      "Adjust the thermostat to the recommended comfort range of 24\u00b0C and notify facilities if temperature fluctuates",
      "Bring in portable 2,000W electric space heaters to place under every desk",
      "Turn off the building main breaker without telling anyone"
],
    correct: 1,
    correctExplanation: "Setting air conditioning to 24\u00b0C provides optimal thermal comfort in tropical climates while saving substantial energy.",
    incorrectExplanation: "Incorrect. Setting thermostats to 24\u00b0C balances comfort and efficiency.",
    optionFeedback: [
      "Incorrect. Opening windows while running AC wastes energy and causes severe condensation.",
      "Correct. 24\u00b0C is the recognized energy-efficient comfort standard; every degree lower increases cooling consumption by 6\u20138%.",
      "Incorrect. Running electric space heaters against active cooling is an extreme waste of electrical energy.",
      "Incorrect. Switching off main breakers shuts down essential business IT systems and lighting."
]
  },
  {
    order: 6,
    question: "Why does setting an AC remote to 18\u00b0C NOT cool an office room down any faster than setting it to 24\u00b0C?",
    options: [
      "AC units deliver conditioned air at a constant design temperature; the setpoint only determines when the compressor cycles off",
      "Thermostats only respond to outdoor sunlight rather than indoor air temperature",
      "Modern air conditioning units are programmed to ignore temperature requests from remote controls",
      "The Central Electricity Board automatically caps indoor temperatures at 24\u00b0C from the grid"
],
    correct: 0,
    correctExplanation: "Air conditioners blow air at the same constant cold temperature regardless of remote setting; lower setpoints simply keep the compressor running longer.",
    incorrectExplanation: "Incorrect. ACs blow air at a fixed cooling rate; setting it lower does not accelerate initial cooling.",
    optionFeedback: [
      "Correct. The AC unit cools at a fixed rate; setting it to 18\u00b0C just ensures it overcools the space and runs continuously.",
      "Incorrect. Thermostat sensors measure the return air temperature from inside the room.",
      "Incorrect. Units respond directly to the setpoint by cycling the compressor on and off.",
      "Incorrect. The CEB supplies electricity; it does not control private building thermostat remote settings."
]
  },
  {
    order: 7,
    question: "You notice that the weatherstrip seal on the main exterior glass door of an air-conditioned reception area is torn and letting in a continuous hot draft. What should you do?",
    options: [
      "Prop the door open permanently with a doorstop",
      "Ignore it because small drafts do not affect building energy use",
      "Log a maintenance request to replace the weatherstripping and keep the door firmly closed in the meantime",
      "Spray perfume on the seal to mask the outdoor smell"
],
    correct: 2,
    correctExplanation: "Fixing broken door seals stops air infiltration, protecting indoor thermal comfort and preventing AC compressor overload.",
    incorrectExplanation: "Incorrect. Reporting damaged weatherstripping ensures thermal envelopes remain sealed.",
    optionFeedback: [
      "Incorrect. Propping the door open creates massive cooling loss and increases humidity.",
      "Incorrect. Continuous infiltration of humid island air significantly increases refrigeration compressor loads.",
      "Correct. Repairing door seals prevents hot draft infiltration, lowers cooling costs, and prevents indoor humidity issues.",
      "Incorrect. Perfume does not fix air leaks or thermal energy loss."
]
  },
  {
    order: 8,
    question: "At the end of Friday work, which routine best helps reduce unnecessary weekend electricity draw in a commercial office?",
    options: [
      "Leaving all desktop computers in active screensaver mode with monitors on",
      "Turning up all AC units to maximum fan speed for the weekend",
      "Switching off all hallway emergency exit battery luminaires",
      "Powering down non-critical monitors, desktop printers, laminators, and meeting room displays from power strips"
],
    correct: 3,
    correctExplanation: "Shutting down peripheral equipment and unneeded display devices eliminates two full days of weekend standby draw.",
    incorrectExplanation: "Incorrect. Powering down non-essential peripherals over the weekend saves significant standby electricity.",
    optionFeedback: [
      "Incorrect. Screensavers keep graphic cards and display monitors in active high-power states.",
      "Incorrect. Running cooling fans in empty buildings over the weekend wastes electricity.",
      "Incorrect. Emergency exit luminaires are mandatory safety devices and must never be disabled.",
      "Correct. Switching off multi-outlet surge protectors for peripherals eliminates standby consumption over 60 weekend hours."
]
  },
  {
    order: 9,
    question: "How can employees best utilize natural daylighting in perimeter offices during bright morning hours?",
    options: [
      "Open window blinds to illuminate desks and switch off electric light banks directly adjacent to the windows",
      "Keep heavy blackout curtains drawn and turn on all high-output ceiling halogen spotlights",
      "Place cardboard over all windows to prevent outdoor light from entering",
      "Replace window glass with opaque aluminium sheeting"
],
    correct: 0,
    correctExplanation: "Daylight harvesting utilizes free natural sunlight to replace electric overhead lighting in perimeter office zones.",
    incorrectExplanation: "Incorrect. Opening blinds and switching off perimeter lighting banks saves electricity.",
    optionFeedback: [
      "Correct. Natural daylight in Mauritius is abundant; switching off perimeter lights reduces electrical draw and internal heat gain.",
      "Incorrect. Blocking daylight forces unnecessary artificial lighting use and increases electricity costs.",
      "Incorrect. Cardboard creates fire hazards and blocks natural illumination.",
      "Incorrect. Opaque coverings eliminate natural views and daylighting benefits for occupants."
]
  },
  {
    order: 10,
    question: "In the context of the Mauritian national electricity grid, why does reducing commercial electricity waste during peak daytime hours matter environmentally?",
    options: [
      "Electricity is completely stored in underground batteries across the island",
      "Grid electricity has zero environmental impact in Mauritius",
      "Peak daytime demand often requires additional thermal generation from imported fossil fuels (heavy fuel oil and coal)",
      "The electricity grid automatically shuts down if offices use power between 9 AM and 4 PM"
],
    correct: 2,
    correctExplanation: "Reducing peak commercial demand lowers the requirement for fossil-fuel thermal peaking plants, cutting island carbon emissions.",
    incorrectExplanation: "Incorrect. The Mauritian electricity grid relies heavily on thermal generation; peak demand drives fossil fuel consumption.",
    optionFeedback: [
      "Incorrect. Mauritius does not have island-scale battery storage capable of powering the whole grid.",
      "Incorrect. Over 70% of Mauritian grid power has historically relied on imported fossil fuels (HFO and coal).",
      "Correct. Daytime commercial air conditioning and industrial peaks require dispatching fossil-fuel thermal generators; efficiency cuts these emissions directly.",
      "Incorrect. The CEB grid operates continuously 24/7."
]
  }
];

export async function ensureEnergyEfficiencyCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 3 by ID 3 or slug
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
        throw new Error("Course 3 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Energy Efficiency course content and v2 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course 3. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "water-conservation-workplace"))
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
          icon: "zap",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 8,
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

      logger.info({ courseId, slug: COURSE_SLUG }, "Energy Efficiency at Work course v2 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute idempotent seeding/repair of Energy Efficiency course");
  }
}
