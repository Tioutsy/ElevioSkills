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

const COURSE_ID = 4;
const COURSE_SLUG = "water-conservation";
const COURSE_TITLE = "Water Conservation";
const BADGE_SLUG = "water-wise-at-work";
const SEED_NAME = "water-conservation-v3";

const COURSE_META = {
  courseCode: "ELH-04",
  description:
    "Learn how daily workplace habits, early leak reporting, commercial cleaning efficiency, and sensible conservation boundaries eliminate water waste without compromising hygiene, safety, or operational standards.",
  fullDescription:
    "This foundation course provides comprehensive, practical water efficiency routines across commercial, hospitality, healthcare, retail, and industrial facilities. Learners discover how to identify visible and underground plumbing leaks, optimize cleaning and washdown water use, understand cooling tower and facility water loops, balance water stewardship with uncompromising hygiene and food safety standards, and execute clear escalation protocols.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/water-conservation.png",
  intendedRoles: [
    "All employees",
    "Housekeeping and cleaning staff",
    "Kitchen and catering staff",
    "Facilities and maintenance coordinators",
    "Department supervisors and shift managers"
  ],
  learningObjectives: [
    "Explain why water stewardship is critical for operational resilience, cost containment, and island freshwater ecosystems.",
    "Identify common forms of visible and hidden water waste in commercial washrooms, kitchens, cleaning, and groundskeeping.",
    "Apply water-saving cleaning methods (trigger nozzles, proper bucket ratios) without compromising hygiene or sanitation.",
    "Recognise cooling tower blowdown, condensate recovery, and sub-metering anomalies requiring facilities escalation.",
    "Execute the 'Act, Check, Escalate' protocol when spotting plumbing leaks or equipment faults.",
    "Complete 10 scenario-based assessment questions balancing conservation with hygiene and customer expectations."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Water Conservation. You can now recognise common water waste, practice sensible water stewardship during daily work, and escalate plumbing faults safely.",
  badgeName: "Workplace Water Steward",
  badgeDescription:
    "Awarded for demonstrating practical workplace water-conservation awareness, safe escalation, and responsible water stewardship."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "The Leak Everyone Walks Past",
    minutes: 4,
    content: "Understand why reporting minor leaks and water waste matters in commercial workplaces.",
    blocks: [
      { id: "wc1-h1", type: "heading", position: 1, headingText: "Arriving at a Workplace Service Area" },
      { id: "wc1-t1", type: "short_text", position: 2, bodyText: "Imagine walking into a staff washroom or kitchen area. A washroom tap is dripping steadily into a basin, an outdoor hose is running water onto hard asphalt, and a toilet cistern keeps refilling continuously with an audible hiss. Multiple employees have walked past throughout the morning, each assuming someone else must have reported it. Nobody did." },
      { id: "wc1-k1", type: "key_message", position: 3, headingText: "Rule 1: Never Assume Someone Else Has Reported It", bodyText: "A tap dripping at one drip per second wastes over 10,000 litres of treated water per year. A silent toilet flapper leak can waste 200–500 litres per day. Taking 30 seconds to report a leak through your organisation's maintenance ticketing channel prevents structural water damage and massive utility waste." },
      {
        id: "wc1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Morning arrival decision scenario:",
        decisionPrompt: "You notice a washroom tap dripping continuously after use. The sign beside it says 'Report maintenance issues to facilities'. What is the correct response?",
        decisionChoices: [
          { label: "Report the exact location and dripping issue to facilities or management promptly", correct: true, feedback: "Correct! Prompt reporting through approved channels ensures technicians replace the worn washer before thousands of litres are lost." },
          { label: "Ignore it, assuming the evening cleaning crew will handle it", correct: false, feedback: "Incorrect. Cleaners may assume day staff reported it, leaving the leak running for weeks." },
          { label: "Attempt to dismantle the tap fixture using a butter knife or personal pliers", correct: false, feedback: "Dangerous! Never attempt unauthorized plumbing modifications. Report faults to trained facilities personnel." }
        ]
      },
      {
        id: "wc1-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "Why should employees report minor dripping taps or refilling toilet cisterns immediately?",
        mcqOptions: [
          "Persistent minor leaks waste thousands of litres over time and often signal worsening valve or pipe degradation",
          "Dripping taps are required by building regulations to remain unreported",
          "Municipal water utilities automatically stop billing when small leaks occur",
          "Treated water becomes completely free when consumed by leaks"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Persistent drips waste massive volumes of treated municipal water and signal failing washers or pressure valves.",
        mcqIncorrectExplanation: "Incorrect. Minor leaks accumulate into major financial losses and physical building damage."
      }
    ]
  },
  {
    order: 1,
    title: "Water Stewardship & The Hygiene Non-Negotiable",
    minutes: 4,
    content: "Connect responsible water use to community resilience while establishing the non-negotiable priority of hygiene and safety.",
    blocks: [
      { id: "wc2-h1", type: "heading", position: 1, headingText: "Water Resilience in Island & Commercial Environments" },
      { id: "wc2-t1", type: "short_text", position: 2, bodyText: "Treated municipal fresh water requires extensive energy to pump, filter, and chemically disinfect. In island economies like Mauritius, ground aquifers and surface reservoirs are vulnerable to prolonged dry spells. Commercial conservation directly supports local community water security." },
      { id: "wc2-k1", type: "key_message", position: 3, headingText: "THE NON-NEGOTIABLE RULE: Hygiene and Safety Always Come First", bodyText: "Water conservation must NEVER compromise thorough handwashing, food contact surface sanitization, clinical infection control, or emergency eye-wash/safety shower availability. We eliminate avoidable waste (open hoses, unattended sinks, leaks), NOT essential hygiene." },
      {
        id: "wc2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Hygiene vs conservation dilemma:",
        decisionPrompt: "During a busy lunch rush in a commercial cafeteria, a kitchen assistant suggests 'saving water' by rinsing raw meat preparation knives in a shared bucket of standing cold water rather than washing and sanitizing them under running water at the wash station. What should the supervisor do?",
        decisionChoices: [
          { label: "Enforce full hot-water dishwashing and chemical sanitization protocols immediately; food safety and hygiene must never be sacrificed to save water", correct: true, feedback: "Spot on! Reusing dirty water for food preparation utensils causes severe bacterial cross-contamination. Hygiene and food safety standards are absolute." },
          { label: "Approve the suggestion to lower the kitchen's monthly water bill", correct: false, feedback: "Severe hazard! Never compromise public health or sanitation rules for conservation claims." },
          { label: "Tell the team to stop washing knives entirely until the end of the shift", correct: false, feedback: "Unacceptable. Food safety regulations require immediate sanitization between different food types." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Commercial Cleaning, Kitchens & Washdown Efficiency",
    minutes: 4,
    content: "Eliminate high-volume water waste in cleaning, dishwashing, groundskeeping, and outdoor washdown.",
    blocks: [
      { id: "wc3-h1", type: "heading", position: 1, headingText: "Best Practices for Cleaning & Operations" },
      { id: "wc3-t1", type: "short_text", position: 2, bodyText: "Frontline cleaning and groundskeeping operations can consume thousands of litres per shift if outdated methods are used. Simple equipment upgrades and behavioral shifts deliver immediate savings." },
      {
        id: "wc3-k1",
        type: "key_message",
        position: 3,
        headingText: "Four High-Impact Cleaning Habits",
        bodyText: "1. Automatic Shut-Off Trigger Nozzles: Never leave an open hose running on the ground. Fit self-closing trigger guns to every hose.\n2. Sweep Before You Wash: Use a broom or dry mop to remove solid debris from outdoor pathways, loading bays, and kitchen floors before applying water.\n3. Two-Bucket Mopping: Use proper dilution ratios rather than continuously running taps into overflow buckets.\n4. Full Dishwasher Racks: Run commercial dishwashers only with full loads unless an urgent operational standard requires a spot wash."
      },
      {
        id: "wc3-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Outdoor cleaning dilemma:",
        decisionPrompt: "You observe a contractor washing dust and fallen leaves off a wide concrete parking entrance using an open, high-volume fire hose with no nozzle attachment. The water has been running for 25 minutes. What is the correct standard procedure?",
        decisionChoices: [
          { label: "Instruct the contractor to turn off the hose, sweep dry debris with a broom, and use a trigger-nozzle hose or pressure washer only where wet cleaning is strictly necessary", correct: true, feedback: "Excellent! 'Water brooming' (using a hose to push leaves and dry dust) wastes hundreds of litres of potable water. Dry sweeping first is standard professional practice." },
          { label: "Let the contractor continue because high-pressure water clears dust faster than a broom", correct: false, feedback: "Incorrect. Using potable water as a broom is prohibited and highly wasteful." },
          { label: "Turn off the main municipal water valve for the entire commercial park", correct: false, feedback: "Incorrect. Address the contractor's practice directly and provide proper trigger nozzles." }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "Facilities Systems: Cooling Towers, Condensate & Sub-Meters",
    minutes: 4,
    content: "Understand central building water systems, HVAC condensate recovery, and sub-meter leak detection.",
    blocks: [
      { id: "wc4-h1", type: "heading", position: 1, headingText: "Behind the Walls: HVAC & Central Water Systems" },
      { id: "wc4-t1", type: "short_text", position: 2, bodyText: "In larger buildings, central water chillers, cooling towers, boiler makeup lines, and irrigation systems consume the bulk of utility water. Facilities teams track these through sub-meters." },
      {
        id: "wc4-f1",
        type: "memorable_fact",
        position: 3,
        headingText: "Hidden Leaks and Meter Creep",
        bodyText: "If a building's water meter continues spinning at 2:00 AM on a Sunday when no operations are active, an underground pipe rupture or stuck cooling tower float valve is dumping thousands of litres into the storm drain."
      },
      {
        id: "wc4-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "What does an active water meter reading at 2:00 AM on a non-operational Sunday indicate to a facilities team?",
        mcqOptions: [
          "A hidden leak, stuck toilet valve, or malfunctioning cooling tower makeup line that requires immediate investigation",
          "Normal behavior because municipal water pipes always circulate water backwards at night",
          "That the building's water filtration system is generating extra water automatically",
          "That solar water heaters are producing steam"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Overnight baseline consumption during zero-occupancy periods is a textbook sign of continuous leaks or stuck float valves.",
        mcqIncorrectExplanation: "Incorrect. Zero-occupancy baseline flow confirms an active leak in the plumbing network."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Act, Check & Escalate",
    minutes: 4,
    content: "Group water conservation actions into direct personal habits, site checks, and professional maintenance escalation.",
    blocks: [
      { id: "wc5-h1", type: "heading", position: 1, headingText: "Action Framework: Knowing Your Boundaries" },
      { id: "wc5-t1", type: "short_text", position: 2, bodyText: "Conserving water safely requires clear distinction between what every employee should do directly and what requires certified plumbing maintenance." },
      {
        id: "wc5-k1",
        type: "key_message",
        position: 3,
        headingText: "Act, Check & Escalate",
        bodyText: "1. ACT DIRECTLY: Turn taps off fully after washing hands, use trigger nozzles on hoses, sweep before washing floors, run full dishwasher racks.\n2. CHECK PROCEDURES: Verify irrigation timers are set for early morning/evening, inspect drip trays under commercial refrigerators, check cafeteria wash stations.\n3. ESCALATE TO FACILITIES: Report running toilet cisterns, damp patches on ceiling tiles, dripping pipe joints, water heater relief valve leaks, or sudden water pressure drops."
      },
      {
        id: "wc5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Facilities escalation scenario:",
        decisionPrompt: "You notice a dark, damp water stain expanding across ceiling tiles in a hallway directly beneath the upstairs restroom. What should you do?",
        decisionChoices: [
          { label: "Immediately notify the facilities team and building supervisor with the exact location so they can isolate the leak before ceiling collapse occurs", correct: true, feedback: "Outstanding! Overhead leaks pose severe structural and electrical hazards. Rapid escalation prevents catastrophic damage." },
          { label: "Poke a hole in the wet ceiling tile with a broom to drain the water into a trash can", correct: false, feedback: "Extremely dangerous! Poking wet ceiling tiles can trigger ceiling collapse and electrical shorts." },
          { label: "Wait a few days to see if the stain dries up on its own", correct: false, feedback: "Incorrect. Active water stains indicate continuous pressurized or drainage pipe failure." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Workplace Water Stewardship Commitment",
    minutes: 3,
    content: "Select practical daily water stewardship commitments for your role.",
    blocks: [
      { id: "wc6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "wc6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Water Conservation! Review the practical habits below and select the commitments relevant to your daily work." },
      {
        id: "wc6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your workplace water commitments (choose at least one):",
        commitmentOptions: [
          { value: "report-leaks-promptly", label: "Report dripping taps, running cisterns, and damp patches to facilities immediately", description: "Prevent thousands of litres of cumulative water loss." },
          { value: "turn-taps-off-fully", label: "Ensure taps are fully closed after handwashing or cleaning", description: "Avoid leaving taps dripping in shared washrooms and break areas." },
          { value: "sweep-before-washing", label: "Dry-sweep floors and paved areas before using wet cleaning methods", description: "Eliminate wasteful 'water brooming' habits." },
          { value: "use-trigger-nozzles", label: "Always fit self-closing trigger nozzles to hoses in cleaning and groundskeeping", description: "Prevent open hoses from running unattended." },
          { value: "protect-hygiene-standards", label: "Maintain full handwashing and sanitization standards without compromise", description: "Ensure conservation never compromises public health or food safety." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the primary rule regarding water conservation and workplace hygiene?",
    options: [
      "Water conservation must NEVER compromise essential handwashing, sanitization, food safety, or infection control",
      "Hygiene standards should be reduced during hot months to meet corporate water targets",
      "Employees should wash hands only once per day to save water",
      "Commercial kitchens should stop washing food contact surfaces to reduce sewage output"
    ],
    correct: 0,
    correctExplanation: "Health, hygiene, food safety, and sanitization standards are non-negotiable. Conservation targets avoidable waste, not necessary hygiene.",
    incorrectExplanation: "Incorrect. Water conservation must never compromise health, food safety, or infection control."
  },
  {
    order: 2,
    question: "Why is prompt reporting of a continuously dripping washroom tap or refilling toilet cistern critical?",
    options: [
      "Small persistent leaks waste thousands of litres over time, increase utility bills, and often signal worsening valve degradation",
      "Building regulations require water leaks to remain active for 30 days before repair",
      "Water meters automatically stop recording consumption when flow rates are low",
      "Dripping water improves the indoor air quality of commercial office buildings"
    ],
    correct: 0,
    correctExplanation: "A single dripping tap wastes over 10,000 litres per year, while a leaking toilet flapper can waste 500 litres per day.",
    incorrectExplanation: "Incorrect. Minor leaks accumulate into massive resource losses and structural damage if unreported."
  },
  {
    order: 3,
    question: "What is the most water-efficient practice when cleaning hard outdoor surfaces like parking bays or walkways?",
    options: [
      "Sweep dry leaves and debris with a broom first, and use a trigger-nozzle hose only for spot washing",
      "Use an open fire hose with no nozzle attachment to push dry leaves into the storm drain for 45 minutes",
      "Turn on decorative landscape sprinklers at mid-day to wash the pathways",
      "Pour buckets of clean drinking water across the entire asphalt driveway"
    ],
    correct: 0,
    correctExplanation: "Dry sweeping first removes bulk dirt without water. Trigger nozzles prevent continuous flow when wet cleaning is needed.",
    incorrectExplanation: "Incorrect. Using potable water as a broom is extremely wasteful and prohibited in sustainable facilities."
  },
  {
    order: 4,
    question: "Why should self-closing trigger nozzles be installed on all washdown hoses in kitchens, loading bays, and groundskeeping?",
    options: [
      "They immediately stop water flow as soon as the operator releases the handle, preventing unattended running water",
      "They increase the chemical toxicity of water used in groundskeeping",
      "They ensure hoses permanently spray water even when stored on the wall",
      "They allow employees to dismantle the building's main water meter"
    ],
    correct: 0,
    correctExplanation: "Trigger nozzles ensure water flows only when actively sprayed, eliminating open-hose runoff during pauses in work.",
    incorrectExplanation: "Incorrect. Trigger nozzles prevent continuous uncontrolled flow when hoses are dropped or unattended."
  },
  {
    order: 5,
    question: "A facilities manager observes that the commercial building's main water meter is registering continuous flow at 2:00 AM on Sunday during zero occupancy. What does this indicate?",
    options: [
      "An active hidden pipe leak, stuck toilet flapper valve, or malfunctioning cooling tower makeup line",
      "Normal behavior because municipal water always flows backwards into the grid overnight",
      "That the building's solar panels are generating extra water pressure",
      "That the municipal utility is testing the water for sweetness"
    ],
    correct: 0,
    correctExplanation: "Continuous water draw during zero-occupancy overnight periods is a definitive indicator of an active plumbing leak or stuck valve.",
    incorrectExplanation: "Incorrect. Flow during zero-occupancy periods proves water is being lost to leaks or stuck valves."
  },
  {
    order: 6,
    question: "An employee spots a growing damp water stain on a plaster ceiling tile directly below a second-floor washroom. What should they do?",
    options: [
      "Immediately report the exact location to facilities and management so technicians can isolate the pipe before ceiling collapse occurs",
      "Poke a hole through the wet tile with a broom to drain the water into a trash can",
      "Ignore it because ceiling stains are purely cosmetic and never contain leaks",
      "Turn off the electrical power to the entire neighbourhood"
    ],
    correct: 0,
    correctExplanation: "Water stains indicate active pressurized or drainage leaks that threaten ceiling collapse and electrical safety. Rapid reporting is essential.",
    incorrectExplanation: "Incorrect. Ceiling leaks pose structural and electrical hazards and require immediate facilities escalation."
  },
  {
    order: 7,
    question: "How should commercial dishwashers in hospitality and cafeteria environments be operated for maximum water and energy efficiency?",
    options: [
      "Run the machine only with full racks of dishes unless an emergency health requirement dictates a spot wash",
      "Run single plates through individual wash cycles to keep the machine clean",
      "Turn off the high-temperature sanitization cycle and wash dishes with cold water only",
      "Leave the pre-rinse spray nozzle locked open running into an empty drain continuously"
    ],
    correct: 0,
    correctExplanation: "Commercial dishwashers consume fixed volumes of water per cycle. Running full racks maximizes items cleaned per litre while maintaining sanitization.",
    incorrectExplanation: "Incorrect. Running partially loaded machines multiplies water and energy use per dish."
  },
  {
    order: 8,
    question: "Which of the following represents an appropriate DIRECT habit within an individual employee's control?",
    options: [
      "Turning taps off fully after washing hands and ensuring no basins are left running",
      "Dismantling high-pressure commercial water pumps in the plant room",
      "Digging up parking lot asphalt to search for underground utility pipes",
      "Altering the municipal water pressure regulator on the street main"
    ],
    correct: 0,
    correctExplanation: "Direct habits include tap discipline, avoiding running sinks, full dishwasher loads, and using trigger nozzles.",
    incorrectExplanation: "Incorrect. Municipal regulators, plant pumps, and civil plumbing are strictly reserved for certified specialists."
  },
  {
    order: 9,
    question: "In commercial landscaping and grounds maintenance, when is the most water-efficient time to irrigate plants and lawns?",
    options: [
      "Early morning or late afternoon/evening, when lower temperatures and wind minimize evaporative water loss",
      "Directly at mid-day under the hottest sun when water evaporates instantly",
      "Continuously for 24 hours every day regardless of rainfall",
      "Only during tropical cyclones"
    ],
    correct: 0,
    correctExplanation: "Irrigating during cooler early morning or evening hours allows water to soak into root zones rather than evaporating into hot air.",
    incorrectExplanation: "Incorrect. Mid-day watering loses up to 50% of water volume to immediate solar evaporation."
  },
  {
    order: 10,
    question: "Why is water efficiency vital for business continuity in island environments like Mauritius?",
    options: [
      "It reduces operational vulnerability to seasonal drought, lowers utility bills, prevents building water damage, and supports community water availability",
      "It eliminates the need for businesses to have plumbing systems",
      "It allows organisations to violate environmental protection acts without penalty",
      "It guarantees that commercial buildings will never require cleaning"
    ],
    correct: 0,
    correctExplanation: "Water efficiency builds resilience against supply disruptions, lowers overhead costs, prevents water damage, and demonstrates environmental leadership.",
    incorrectExplanation: "Incorrect. Efficient water management protects business operations and community supply while lowering operating costs."
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Water Conservation course content and v3 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v3 seed detected for Course 4. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "sustainable-procurement"))
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
          icon: "droplets",
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
          version: 3,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 3 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Water Conservation course v3 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Water Conservation course seeding");
    throw err;
  }
}
