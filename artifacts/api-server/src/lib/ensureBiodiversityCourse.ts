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

const COURSE_ID = 8;
const COURSE_SLUG = "biodiversity-in-mauritius";
const COURSE_TITLE = "Biodiversity in Mauritius";
const BADGE_SLUG = "biodiversity-aware";
const SEED_NAME = "biodiversity-in-mauritius-v3";
const SKELETON_BADGE_SLUG = "biodiversity-aware";

const COURSE_META = {
  courseCode: "ELH-08",
  description:
    "Learn how routine commercial, hospitality, and facilities activities affect Mauritian ecosystems, distinguish native vs. invasive species, prevent lagoon runoff, and apply the Pause–Protect–Report–Record protocol.",
  fullDescription:
    "This foundation course provides employees across all operational roles with a practical, workplace-focused introduction to biodiversity stewardship in Mauritius. Learners explore why island ecosystems underpin tourism, agriculture, and climate resilience, distinguish native, endemic, introduced, and invasive species, examine corporate impacts across stormwater runoff, artificial night lighting, groundskeeping, and supply chains, and master the 4-step Pause–Protect–Report–Record protocol when encountering environmental hazards or protected wildlife.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/biodiversity-in-mauritius.jpg",
  intendedRoles: [
    "All employees",
    "Facilities, property, and grounds maintenance staff",
    "Hospitality and resort operations teams",
    "Logistics, warehouse, and construction coordinators",
    "Sustainability leads and environmental champions"
  ],
  learningObjectives: [
    "Define biodiversity and ecosystem services in plain workplace language.",
    "Distinguish native, endemic, introduced, and invasive alien species using clear Mauritian examples.",
    "Identify corporate impact pathways: chemical/fertilizer runoff into lagoons, artificial night lighting, and land clearing.",
    "Apply the 4-step Pause–Protect–Report–Record protocol during site work or wildlife encounters.",
    "Implement sustainable groundskeeping practices (native planting, biosecurity, avoiding chemical herbicide drift).",
    "Complete 10 scenario-based assessment questions balancing operational requirements with biodiversity protection."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Biodiversity in Mauritius. You can now recognise workplace impacts on local ecosystems, distinguish species concepts, and apply Pause–Protect–Report–Record safely.",
  badgeName: "Mauritius Biodiversity Steward",
  badgeDescription:
    "Awarded for demonstrating practical workplace biodiversity awareness, understanding Mauritian ecosystems, and applying Pause–Protect–Report–Record protocols."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Workplace Decisions & Island Ecosystem Impact",
    minutes: 4,
    content: "Learn how routine site operations connect directly to local Mauritian biodiversity and lagoon health.",
    blocks: [
      { id: "bio1-h1", type: "heading", position: 1, headingText: "Ecological Risks Beyond Site Boundaries" },
      { id: "bio1-t1", type: "short_text", position: 2, bodyText: "On a commercial site near a coastal drainage reserve in Mauritius, a facilities supervisor notices chemical wash-water being hosed into a stormwater drain, bright unshielded floodlights glaring into a coastal tree canopy all night, and contractors preparing to bulldoze a vegetated buffer strip to create temporary vehicle parking. What happens on a workplace boundary directly impacts the surrounding terrestrial, freshwater, and coral lagoon ecosystems." },
      { id: "bio1-k1", type: "key_message", position: 3, headingText: "Workplace Operations Connect Directly to the Lagoon", bodyText: "Because Mauritius is an island with steep topography and short river catchments, stormwater and chemical runoff from parking lots, hotels, and industrial parks reaches the coral reef lagoon within hours. Protecting biodiversity is not just for national parks—it is an operational duty across every commercial site." },
      {
        id: "bio1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Site disturbance scenario:",
        decisionPrompt: "A contractor proposes clearing a natural vegetative buffer strip along a drainage canal to store shipping pallets, claiming 'it's just overgrown wild bush'. What should you do?",
        decisionChoices: [
          { label: "Pause the clearing immediately, protect the vegetative buffer zone, and report to facilities/environmental management to verify site boundaries and ecological status", correct: true, feedback: "Correct! Vegetative buffer strips filter sediment and chemical runoff before it reaches waterways. Clearing without authorization causes severe soil erosion and destroys wildlife corridors." },
          { label: "Let the contractor bulldoze the buffer to keep the delivery schedule on time", correct: false, feedback: "Incorrect! Unauthorized land clearing can destroy native habitats and violates environmental regulations." },
          { label: "Spray chemical defoliants across the canal banks to kill the vegetation faster", correct: false, feedback: "Prohibited! Chemical herbicides wash directly into public waterways, poisoning aquatic life." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Mauritian Ecosystems & Species Concepts",
    minutes: 4,
    content: "Master the critical distinctions between native, endemic, introduced, and invasive alien species.",
    blocks: [
      { id: "bio2-h1", type: "heading", position: 1, headingText: "Four Key Species Classifications" },
      { id: "bio2-t1", type: "short_text", position: 2, bodyText: "Mauritius is an isolated oceanic island with extraordinary levels of endemism and fragile ecological balances. Understand these four distinct classifications:" },
      {
        id: "bio2-k1",
        type: "key_message",
        position: 3,
        headingText: "Species Categories & Local Examples",
        bodyText: "• Native Species: Arrived in Mauritius naturally (by wind, ocean currents, or flight) without human assistance (e.g. coastal mangroves, seabirds).\n• Endemic Species: Native species found ONLY in Mauritius and nowhere else on Earth (e.g. Mauritius Kestrel, Pink Pigeon, Mauritian Flying Fox, Bois d'Ebène / Black Ebony tree).\n• Introduced Species: Brought to the island deliberately or accidentally by humans, living in managed balance (e.g. sugarcane, garden bougainvillea).\n• Invasive Alien Species: Non-native species that spread aggressively, outcompeting and choking native flora and fauna (e.g. Goyave de Chine / Strawberry Guava, Privet, Rats, Mongoose)."
      },
      {
        id: "bio2-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "What is an 'endemic' species in the context of Mauritius?",
        mcqOptions: [
          "A native species that naturally exists ONLY in Mauritius and nowhere else on Earth",
          "An invasive weed imported from another country last year",
          "Any animal living in a zoo or botanical garden",
          "A domesticated pet that has received veterinary vaccinations"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Endemic species are unique to a specific geographic location. If an endemic Mauritian species goes extinct locally, it is extinct globally.",
        mcqIncorrectExplanation: "Incorrect. Endemic means native and unique strictly to that specific island or territory."
      }
    ]
  },
  {
    order: 2,
    title: "Corporate Impact Pathways: Runoff, Lighting & Landscaping",
    minutes: 4,
    content: "Examine how commercial facilities affect wildlife through stormwater, night lighting, and grounds maintenance.",
    blocks: [
      { id: "bio3-h1", type: "heading", position: 1, headingText: "Three Common Workplace Impact Pathways" },
      { id: "bio3-t1", type: "short_text", position: 2, bodyText: "Commercial properties frequently disrupt local biodiversity through three primary operational pathways:" },
      {
        id: "bio3-k1",
        type: "key_message",
        position: 3,
        headingText: "Runoff, Light Pollution & Groundskeeping",
        bodyText: "1. Stormwater & Chemical Runoff: Washing vehicles, machinery, or greasy kitchen mats where washwater enters outdoor storm drains poisons river systems and smothers coral reefs with sediment and algae blooms.\n2. Artificial Light Pollution: High-intensity unshielded security spotlights disorient nocturnal seabirds (such as the Barau's Petrel or Wedge-tailed Shearwater) and disrupt bat foraging. Use downward-directed, warm-spectrum shielded LEDs.\n3. Invasive Landscaping: Planting aggressive non-native decorative shrubs allows seeds to escape into adjacent forests. Prioritize native and endemic coastal plants in corporate landscaping."
      },
      {
        id: "bio3-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Resort night lighting scenario:",
        decisionPrompt: "A hotel groundskeeper is replacing outdoor walkway lights. Bright upward-pointing halogen floodlights are proposed 'to illuminate the palm tree tops'. What is the sustainable, bird-friendly alternative?",
        decisionChoices: [
          { label: "Install downward-shielded, warm-spectrum (under 3000K) LED fixtures that illuminate only the walking path without skyward glare", correct: true, feedback: "Outstanding! Downward-shielded, warm lighting provides safe pathway visibility while preventing light pollution and protecting disoriented seabirds." },
          { label: "Install high-intensity blue laser beacons pointing into the night sky", correct: false, feedback: "Extremely harmful! Skyward beams severely disorient migratory and nesting seabirds." },
          { label: "Turn off all lights on the entire property including emergency exit lights", correct: false, feedback: "Unsafe! Safety lighting must always be maintained using shielded, directed fixtures." }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "The 4-Step Protocol: Pause, Protect, Report & Record",
    minutes: 4,
    content: "Master the standard operational procedure when encountering sensitive wildlife or environmental hazards.",
    blocks: [
      { id: "bio4-h1", type: "heading", position: 1, headingText: "The Pause–Protect–Report–Record Framework" },
      { id: "bio4-t1", type: "short_text", position: 2, bodyText: "When conducting outdoor maintenance, construction, or encountering injured native wildlife on site, follow the standard 4-step protocol:" },
      {
        id: "bio4-k1",
        type: "key_message",
        position: 3,
        headingText: "The 4 Steps in Detail",
        bodyText: "1. PAUSE: Immediately stop machinery or chemical activity in the immediate vicinity.\n2. PROTECT: Secure a safe perimeter around the wildlife, nesting site, or chemical spill to prevent disturbance or contamination. Never attempt to handle wild animals directly.\n3. REPORT: Contact site environmental coordinators, facilities management, or authorized wildlife rescue organizations (e.g. Mauritian Wildlife Foundation / National Parks and Conservation Service).\n4. RECORD: Log the date, exact site coordinates/location, species/incident observations, and actions taken in the site environmental register."
      },
      {
        id: "bio4-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "What is the first action an operational team should take upon discovering a disoriented seabird or sensitive nesting bird on an active work site?",
        mcqOptions: [
          "PAUSE work in the immediate area, maintain a safe distance, and protect the animal from vehicle traffic or pets while reporting to authorized handlers",
          "Chase the bird with a broom to force it to fly away",
          "Feed the bird kitchen scraps and keep it in a cardboard box as a company mascot",
          "Ignore the bird and continue operating heavy earthmoving machinery over the area"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Pausing activity and securing the area prevents animal injury while trained wildlife specialists are contacted.",
        mcqIncorrectExplanation: "Incorrect. Never handle or harass wildlife; secure the area and call trained conservation authorities."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Groundskeeping, Logistics & Procurement",
    minutes: 4,
    content: "Understand departmental boundaries in biodiversity stewardship across facilities, kitchens, and procurement.",
    blocks: [
      { id: "bio5-h1", type: "heading", position: 1, headingText: "Departmental Stewardship Roles" },
      { id: "bio5-t1", type: "short_text", position: 2, bodyText: "Biodiversity stewardship touches multiple corporate departments beyond groundskeeping:" },
      {
        id: "bio5-k1",
        type: "key_message",
        position: 3,
        headingText: "Cross-Departmental Actions",
        bodyText: "• Procurement: Source sustainably certified timber (FSC/PEFC), certified sustainable seafood (MSC/ASC), and avoid purchasing invasive plant species for landscaping.\n• Kitchens & Hospitality: Enforce zero single-use plastics near beaches/waterways and ensure grease trap waste is collected by certified contractors.\n• Facilities & Logistics: Inspect outdoor storage for standing water/pest harborage, maintain oil interceptors on car wash bays, and keep outdoor bins sealed against invasive scavengers (rats, mongoose)."
      }
    ]
  },
  {
    order: 5,
    title: "Your Workplace Biodiversity Stewardship Commitment",
    minutes: 3,
    content: "Select practical workplace commitments to protect Mauritian ecosystems.",
    blocks: [
      { id: "bio6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "bio6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Biodiversity in Mauritius! Select the commitments below relevant to your operational role." },
      {
        id: "bio6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your workplace biodiversity commitments (choose at least one):",
        commitmentOptions: [
          { value: "prevent-drain-pollution", label: "Ensure chemicals, oils, and washwater never enter outdoor stormwater drains", description: "Protect local river systems and coral reef lagoons." },
          { value: "apply-pause-protect", label: "Apply the Pause–Protect–Report–Record protocol during wildlife encounters", description: "Safeguard native fauna without unauthorized handling." },
          { value: "support-native-landscaping", label: "Advocate for native and endemic plant species in corporate groundskeeping", description: "Provide habitat for local pollinators and birds while avoiding invasive species." },
          { value: "shield-night-lighting", label: "Ensure exterior security and pathway lighting is downward-directed and warm-spectrum", description: "Prevent disorientation of nocturnal seabirds and bats." },
          { value: "secure-outdoor-waste", label: "Keep outdoor food waste bins sealed tightly", description: "Prevent proliferation of invasive pests like rats and mongoose." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the key ecological difference between a native species and an endemic species in Mauritius?",
    options: [
      "A native species arrived naturally in Mauritius, whereas an endemic species is native and found ONLY in Mauritius and nowhere else on Earth",
      "Native species are plants, whereas endemic species are only mammals",
      "Endemic species were imported on commercial ships last century",
      "There is no difference; both terms mean agricultural crops"
    ],
    correct: 0,
    correctExplanation: "Endemic species are unique to Mauritius. If their population is lost in Mauritius, the entire species is extinct worldwide.",
    incorrectExplanation: "Incorrect. Endemic means native and unique exclusively to that specific geographic location."
  },
  {
    order: 2,
    question: "Which of the following is an example of an aggressive invasive alien plant species that damages Mauritian native forests?",
    options: [
      "Strawberry Guava (Goyave de Chine / Psidium cattleyanum)",
      "Bois d'Ebène (Mauritian Black Ebony / Diospyros tessellaria)",
      "Trochetia boutoniana (Boucle d'Oreille / National Flower)",
      "Pink Pigeon (Nesoenas mayeri)"
    ],
    correct: 0,
    correctExplanation: "Goyave de Chine forms dense thickets that choke native tree regeneration and deplete indigenous soil moisture.",
    incorrectExplanation: "Incorrect. Goyave de Chine is an aggressive invasive alien plant in Mauritius; Ebony and Trochetia are endemic."
  },
  {
    order: 3,
    question: "Why is hosing oily kitchen mats, paint equipment, or chemical washwater into an outdoor parking lot storm drain unacceptable?",
    options: [
      "Stormwater drains lead directly into local rivers and coastal lagoons without municipal sewage treatment, poisoning aquatic life and coral reefs",
      "Storm drains are reserved exclusively for storing clean drinking water",
      "It causes the building's internet bandwidth to slow down",
      "It is acceptable as long as cleaning is done after sunset"
    ],
    correct: 0,
    correctExplanation: "Storm drains discharge untreated surface runoff directly into watercourses and the lagoon, causing severe chemical and sediment pollution.",
    incorrectExplanation: "Incorrect. Stormwater drains bypass sewage treatment plants and flow directly into rivers and the ocean."
  },
  {
    order: 4,
    question: "What is the primary danger that unshielded skyward exterior floodlights pose to native seabirds in coastal and island regions?",
    options: [
      "Nocturnal and fledgling seabirds become disoriented by upward glare, crashing into buildings or succumbing to ground predators from exhaustion",
      "Light pollution causes birds to grow twice as large as normal",
      "Floodlights make ocean fish swim backwards",
      "Seabirds are legally prohibited from flying at night"
    ],
    correct: 0,
    correctExplanation: "Fledgling seabirds navigate by starlight; bright upward artificial lighting blinds and grounds them, creating high mortality.",
    incorrectExplanation: "Incorrect. Skyward light pollution disorients seabirds and disrupts nocturnal navigation."
  },
  {
    order: 5,
    question: "What does the first step 'PAUSE' in the Pause–Protect–Report–Record framework require when sensitive wildlife or an unexpected ecological risk is spotted?",
    options: [
      "Immediately stop machine operations and disturbing activities in the immediate area to prevent harming the animal or worsening the hazard",
      "Continue operating heavy machinery at top speed to scare the animal away",
      "Capture the animal with work gloves and take it home",
      "Spray chemical repellent across the entire site"
    ],
    correct: 0,
    correctExplanation: "Pausing work halts potential physical harm immediately while a perimeter is secured and experts are notified.",
    incorrectExplanation: "Incorrect. Pausing operations prevents immediate physical injury or irreversible site destruction."
  },
  {
    order: 6,
    question: "An employee spots an injured native fruit bat (Mauritian Flying Fox) hanging low on a fence near an active construction area. What should they do?",
    options: [
      "Secure a perimeter to keep people and machinery away, do NOT touch or handle the animal, and contact authorized wildlife rescue authorities immediately",
      "Attempt to grab the bat with bare hands to examine its wings",
      "Poke the bat with a piece of rebar to see if it can fly",
      "Ignore it and direct forklift traffic underneath the fence"
    ],
    correct: 0,
    correctExplanation: "Untrained handling risks injury and disease transmission to both human and animal. Establish a safe perimeter and call professional conservation handlers.",
    incorrectExplanation: "Incorrect. Never handle wild bats or birds directly; protect the perimeter and contact authorized rescue bodies."
  },
  {
    order: 7,
    question: "Why should commercial facilities prioritize native and endemic plant species over invasive exotic ornamentals in site landscaping?",
    options: [
      "Native plants are adapted to local climate and soil, require less irrigation and pesticide, support native pollinators, and prevent the escape of invasive weeds",
      "Native plants produce pure gold instead of leaves",
      "Invasive exotic plants are legally required to be imported by all businesses",
      "Native plants make it impossible for rain to fall on the building"
    ],
    correct: 0,
    correctExplanation: "Native landscaping fosters local biodiversity, uses less water and chemicals, and prevents biological invasion of nearby reserves.",
    incorrectExplanation: "Incorrect. Indigenous landscaping supports native pollinators and reduces maintenance water/chemical demand."
  },
  {
    order: 8,
    question: "How does keeping outdoor food waste and organic kitchen bins tightly sealed support local biodiversity protection?",
    options: [
      "It prevents food subsidies that cause explosions in pest populations (rats, feral cats, mongoose) which prey heavily on native bird eggs and reptiles",
      "It causes food waste to turn into solid rock",
      "It stops birds from flying over the property",
      "It eliminates the need for waste collection trucks"
    ],
    correct: 0,
    correctExplanation: "Open garbage feeds invasive predators (rats, mongoose), enabling large populations that decimate native bird and lizard populations.",
    incorrectExplanation: "Incorrect. Sealing waste bins cuts off food supplies for invasive predators that threaten native wildlife."
  },
  {
    order: 9,
    question: "What is an effective sustainable procurement action that directly supports biodiversity conservation?",
    options: [
      "Sourcing certified sustainable timber (FSC/PEFC) and certified sustainable seafood (MSC/ASC) to ensure supply chains do not drive deforestation or overfishing",
      "Purchasing products made from endangered wildlife species",
      "Buying unregulated exotic plants from unverified overseas websites",
      "Ordering single-use plastic cups for all corporate events"
    ],
    correct: 0,
    correctExplanation: "Certified sourcing guarantees that raw materials originate from responsibly managed forests and fisheries that protect biodiversity.",
    incorrectExplanation: "Incorrect. Certified sustainable timber and seafood ensure corporate supply chains do not cause ecosystem destruction."
  },
  {
    order: 10,
    question: "Why is recording ecological incidents, wildlife encounters, and chemical spills in a site environmental register essential?",
    options: [
      "It creates an auditable historical record, identifies recurring risk areas, proves due diligence, and informs future site biodiversity management plans",
      "It replaces the need for municipal business licenses",
      "It guarantees that no animals will ever enter the property again",
      "It allows employees to avoid completing annual safety training"
    ],
    correct: 0,
    correctExplanation: "Accurate incident logging builds organizational knowledge, ensures corrective actions are verified, and supports regulatory environmental reporting.",
    incorrectExplanation: "Incorrect. Incident registers provide the audit trail necessary for continuous environmental improvement and legal compliance."
  }
];

export async function ensureBiodiversityCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 8 by ID 8 or slug
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
        throw new Error("Course 8 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Biodiversity course content and v3 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v3 seed detected for Course 8. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "esg-basics"))
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
          icon: "feather",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 13,
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

      logger.info({ courseId, slug: COURSE_SLUG }, "Biodiversity in Mauritius course v3 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Biodiversity in Mauritius course seeding");
    throw err;
  }
}
