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

const COURSE_ID = 8;
const COURSE_SLUG = "biodiversity-in-mauritius";
const COURSE_TITLE = "Biodiversity in Mauritius";
const BADGE_SLUG = "biodiversity-aware";
const SEED_NAME = "biodiversity-in-mauritius-v3";
const SKELETON_BADGE_SLUG = "biodiversity-aware"; // catalogue skeleton slug — do not delete

const COURSE_META = {
  description:
    "Learn how routine workplace activities affect Mauritian ecosystems, distinguish native vs. invasive species, and apply the Pause–Protect–Report–Record framework to prevent environmental harm.",
  fullDescription:
    "This course provides employees across all operational roles with a practical, workplace-focused introduction to Mauritian biodiversity. Learn why local ecosystems matter to business resilience, distinguish native, endemic, introduced, and invasive alien species, map workplace impacts across site disturbance, water, waste, lighting, and procurement, and master the Pause–Protect–Report–Record protocol.",
  categoryId: 1,
  durationMinutes: 18,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/biodiversity-in-mauritius.jpg",
  learningObjectives: [
    "Explain biodiversity and ecosystem services in plain workplace language.",
    "Distinguish native, endemic, introduced, and invasive alien species with Mauritian examples.",
    "Identify workplace activities that cause habitat disturbance, runoff pollution, or species disruption.",
    "Apply the 4-step Pause–Protect–Report–Record protocol when encountering environmental risks.",
    "Avoid high-risk actions such as wildlife handling, unauthorized vegetation clearing, or herbicide spraying.",
    "Evaluate role-based micro-decisions across facilities, hospitality, procurement, office, and landscaping.",
    "Select one practical workplace biodiversity commitment to support ecosystem protection."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Biodiversity in Mauritius. You can now recognise workplace impacts on local ecosystems, distinguish species concepts, and apply Pause–Protect–Report–Record safely.",
  badgeName: "Mauritius Biodiversity Aware",
  badgeDescription:
    "Awarded for demonstrating practical workplace biodiversity awareness, understanding Mauritian ecosystems, and applying Pause–Protect–Report–Record protocols.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Workplace Decisions & Ecosystem Impact",
    minutes: 3,
    content: "Learn how routine site operations connect directly to local Mauritian biodiversity.",
    blocks: [
      { id: "bio1-h1", type: "heading", position: 1, headingText: "Ecological Risks Beyond Site Boundaries" },
      { id: "bio1-t1", type: "short_text", position: 2, bodyText: "On a Monday morning at a Mauritian commercial facility near a coastal drainage channel, a site supervisor notices exterior lights left on in daylight, loose plastic litter clogging a storm drain cover, chemical drums stored beside the drain, and contractors preparing to clear shrubland near a marked native plant restoration zone." },
      { id: "bio1-k1", type: "key_message", position: 3, headingText: "Routine Decisions Have Direct Ecological Consequences", bodyText: "Biodiversity protection is not limited to national parks. Routine site activities—such as lighting draw, waste management, landscaping, and contractor oversight—directly influence surrounding terrestrial, wetland, and lagoon ecosystems." },
      {
        id: "bio1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Evaluating site disturbance scenario:",
        decisionPrompt: "A contractor suggests clearing shrubland near a coastal drainage boundary to store extra equipment, claiming 'it is just wild weeds.' What is the correct initial action?",
        decisionChoices: [
          { label: "Pause work in that area, protect the site boundary, and report to the facility environmental lead to verify habitat status", correct: true, feedback: "Excellent! Pausing and verifying protects sensitive native species and prevents illegal or damaging site clearing." },
          { label: "Allow the clearing to proceed immediately to avoid contractor schedule delays", correct: false, feedback: "Incorrect! Clearing unverified vegetation can destroy native habitats and violate environmental regulations." },
          { label: "Spray chemical herbicides over the shrubland to clear it faster", correct: false, feedback: "NEVER apply unapproved herbicides! Chemical runoff damages drainage soils and nearby aquatic ecosystems." }
        ]
      },
      {
        id: "bio1-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "What is biodiversity in simple workplace terms?",
        mcqOptions: [
          "The variety of living organisms, habitats, and ecological relationships that support ecosystem services",
          "The total number of potted indoor ornamental plants in an office building",
          "A tax paid exclusively by agricultural fruit exporters",
          "A guarantee that a property is free of wild animals and insects"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Biodiversity encompasses all living organisms, habitats, and ecological relationships that sustain essential ecosystem services.",
        mcqIncorrectExplanation: "Incorrect. Biodiversity represents the full variety of life, habitats, and natural systems."
      }
    ]
  },
  {
    order: 1,
    title: "Mauritian Ecosystems & Species Concepts",
    minutes: 4,
    content: "Master native, endemic, introduced, and invasive alien species concepts with local examples.",
    blocks: [
      { id: "bio2-h1", type: "heading", position: 1, headingText: "Four Key Species Classifications" },
      { id: "bio2-t1", type: "short_text", position: 2, bodyText: "Mauritius is an isolated oceanic island with high ecological sensitivity. Understand these four distinct species categories:" },
      {
        id: "bio2-k1",
        type: "key_message",
        position: 3,
        headingText: "Species Categories & Examples",
        bodyText: "• Native Species: Arrived naturally in Mauritius without human aid (e.g. coastal mangroves, seabirds).\n• Endemic Species: Native species found ONLY in Mauritius and nowhere else on Earth (e.g. Mauritius Kestrel, Pink Pigeon, Ebony tree).\n• Introduced Species: Brought to Mauritius by human activity, living in managed environments (e.g. agricultural crops, decorative garden flowers).\n• Invasive Alien Species: Introduced species that spread aggressively and damage native ecosystems (e.g. Strawberry Guava / Goyave de Chine, Privet, Rats, Mongoose)."
      },
      {
        id: "bio2-f1",
        type: "memorable_fact",
        position: 4,
        headingText: "Did You Know? (Worth Knowing)",
        bodyText: "According to the National Parks and Conservation Service (NPCS), Mauritius has over 670 native flowering plant species, of which approximately 45% are endemic! Because native forest remnants now cover less than 5% of the island, protecting remaining native habitats from invasive weeds and workplace disturbance is vital for island survival."
      }
    ]
  },
  {
    order: 2,
    title: "The Workplace Biodiversity Impact Map",
    minutes: 4,
    content: "Map operational activity risks across site disturbance, water, waste, lighting, and procurement.",
    blocks: [
      { id: "bio3-h1", type: "heading", position: 1, headingText: "Five Workplace Impact Categories" },
      { id: "bio3-t1", type: "short_text", position: 2, bodyText: "Examine how five core workplace activities connect directly to local ecological risks:" },
      {
        id: "bio3-k1",
        type: "key_message",
        position: 3,
        headingText: "Impact Categories & Mitigations",
        bodyText: "1. Site & Habitat Disturbance: Land clearing, unapproved storage, heavy equipment movement near vegetation.\n2. Water & Drainage Runoff: Chemical spills, oil leaks, or sediment washing into storm drains and lagoons.\n3. Waste & Plastics: Loose packaging or food waste attracting pests or entering marine environments.\n4. Lighting & Noise Disturbance: Unnecessary exterior night lighting disturbing nocturnal fauna and nesting birds.\n5. Landscaping & Procurement: Purchasing unverified timber/plants or introducing invasive ornamental species."
      },
      {
        id: "bio3-w1",
        type: "workplace_example",
        position: 4,
        headingText: "Lighting Rule: Switch Off Daylight Floodlights",
        bodyText: "CRITICAL OPERATIONAL PRINCIPLE: Ensure exterior security floodlights are switched off during daylight hours. Excessive night lighting near coastal or forest boundaries disrupts nocturnal pollinators and nesting wildlife."
      },
      {
        id: "bio3-d1",
        type: "decision_scenario",
        position: 5,
        title: "Site Lighting & Drainage Decision",
        situation: "During an afternoon site walkthrough, you notice high-intensity floodlights illuminated in full daylight and contractor vehicle oil leaking toward an unprotected perimeter drain.",
        options: [
          {
            id: "opt-1",
            text: "Switch off unnecessary daylight floodlights immediately and place spill absorbent mats around the drain before contacting the contractor supervisor.",
            isCorrect: true,
            feedback: "Correct! Immediate containment of runoff and energy reduction prevents immediate ecosystem disturbance and water contamination.",
            explanation: "Prompt containment and switching off unnecessary lighting eliminates pollution risks at source."
          },
          {
            id: "opt-2",
            text: "Leave the lights and leak until the scheduled monthly contractor review meeting next week.",
            isCorrect: false,
            feedback: "Incorrect. Delaying spill containment allows hazardous oils to contaminate local waterways and marine habitats.",
            explanation: "Spills and active hazards must be addressed promptly."
          }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "Pause–Protect–Report–Record & Visual Inspection",
    minutes: 4,
    content: "Apply the 4-step protocol and inspect a real Mauritian commercial facility site.",
    blocks: [
      { id: "bio4-h1", type: "heading", position: 1, headingText: "The 4-Step Action Protocol" },
      { id: "bio4-t1", type: "short_text", position: 2, bodyText: "When encountering an environmental hazard or unexpected wildlife on site, follow the Pause–Protect–Report–Record protocol:" },
      {
        id: "bio4-k1",
        type: "key_message",
        position: 3,
        headingText: "Pause–Protect–Report–Record",
        bodyText: "1. PAUSE: Stop or halt disturbance in the immediate area safely.\n2. PROTECT: Keep vehicles, waste, chemicals, and unauthorized staff away from the affected zone.\n3. REPORT: Inform the facility lead, environmental coordinator, or site manager immediately.\n4. RECORD: Log exact facts, time, location, and photos without disturbing wildlife or hazardous spills."
      },
      {
        id: "bio4-img1",
        type: "visual_question",
        position: 4,
        imageUrl: "/images/courses/visual-workplace-biodiversity-risk.png",
        caption: "Facility Site Inspection: Daylight floodlight active, chemical drums near drain, loose litter, marked native restoration zone, and worker photographing site hazards.",
        imageAlt: "Realistic photograph of a Mauritian commercial property compound showing an active daytime floodlight, chemical drums beside an open storm drain, loose plastic litter, a wooden sign reading 'NATIVE SPECIES RESTORATION ZONE - DO NOT DISTURB', and a facility staff member taking a photo to report site risks."
      },
      {
        id: "bio4-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "In the facility site inspection above, what is the best immediate response to the chemical drums stored beside the storm drain?",
        mcqOptions: [
          "Report the improper storage immediately and arrange for chemical drums to be moved to an approved bunded containment area away from drains",
          "Kick the chemical drums into the storm drain cover to clear the yard space",
          "Wash the drums with water so chemical residues flow into the coastal channel",
          "Ignore the drums because they belong to a third-party logistics supplier"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Chemicals stored near open drains present severe runoff risks to coastal ecosystems and must be relocated to secondary containment.",
        mcqIncorrectExplanation: "Incorrect. Storing chemicals near storm drains risks chemical runoff into aquatic environments; proper containment is required."
      }
    ]
  },
  {
    order: 4,
    title: "High-Risk Mistakes & Micro-Decisions",
    minutes: 3,
    content: "Avoid prohibited actions and practice role-based decisions across operational departments.",
    blocks: [
      { id: "bio5-h1", type: "heading", position: 1, headingText: "High-Risk Mistakes to Avoid" },
      { id: "bio5-t1", type: "short_text", position: 2, bodyText: "NEVER engage in these four high-risk operational behaviors:" },
      {
        id: "bio5-k1",
        type: "key_message",
        position: 3,
        headingText: "Prohibited Actions",
        bodyText: "• DO NOT capture, relocate, or handle wild animals, reptiles, or fruit bats yourself.\n• DO NOT feed wild birds or stray animals near food-service or staff eating areas.\n• DO NOT apply unapproved herbicides or pesticides without authorized procedures.\n• DO NOT clear trees, shrubs, or wetlands without written environmental clearance."
      },
      {
        id: "bio5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Hospitality & Food Service Scenario:",
        decisionPrompt: "Hotel guests and staff frequently leave accessible food waste near a coastal service terrace, attracting crows and rodents. What should the service team do?",
        decisionChoices: [
          { label: "Secure all waste containers with tight-fitting lids, clear tables promptly, and educate staff not to feed animals", correct: true, feedback: "Correct! Securing food waste removes artificial attractants and protects coastal ecological balance." },
          { label: "Leave extra food scraps outside so animals do not disturb guests indoors", correct: false, feedback: "Incorrect! Feeding animals creates pest dependency and damages ecosystem balance." },
          { label: "Spray chemical poison around outdoor dining tables without authorization", correct: false, feedback: "NEVER spray unapproved poisons near dining areas or coastal habitats!" }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Biodiversity Awareness Commitment",
    minutes: 3,
    content: "Select practical daily workplace commitments to protect Mauritian ecosystems.",
    blocks: [
      { id: "bio6-h1", type: "heading", position: 1, headingText: "Pledge to Act" },
      { id: "bio6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing the lessons! Select the biodiversity protection habits you commit to practice in your daily work routine." },
      {
        id: "bio6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your daily workplace biodiversity commitments (choose at least one):",
        commitmentOptions: [
          { value: "apply-pause-protect-report", label: "Apply the Pause–Protect–Report–Record protocol when encountering habitat risks", description: "Halt disturbance and report environmental concerns promptly." },
          { value: "keep-drains-clean", label: "Keep chemicals, oil, and loose litter away from storm drains and waterways", description: "Prevent harmful runoff from entering rivers and coastal lagoons." },
          { value: "avoid-wildlife-handling", label: "Never capture, relocate, or feed wild animals without specialist authorization", description: "Respect wildlife boundaries and report species sightings safely." },
          { value: "turn-off-daytime-lights", label: "Ensure exterior floodlights are turned off during daylight hours", description: "Reduce unnecessary energy draw and nocturnal wildlife disturbance." },
          { value: "verify-plant-sourcing", label: "Support native plant landscaping and avoid buying invasive alien species", description: "Protect local flora and prevent invasive plant spread." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the difference between a native species and an endemic species in the context of Mauritius?",
    options: [
      "Native species were introduced by humans in 1990; endemic species arrived by aeroplane",
      "There is no difference; both terms refer to common farm animals",
      "A native species arrived naturally in Mauritius; an endemic species evolved here and exists naturally nowhere else on Earth",
      "Endemic species are harmful pests that must be exterminated by law"
],
    correct: 2,
    correctExplanation: "Endemic species are uniquely native to Mauritius and cannot be found anywhere else in the world, making their conservation globally critical.",
    incorrectExplanation: "Incorrect. Endemic species evolved locally and occur naturally only in Mauritius.",
    optionFeedback: [
      "Incorrect. Species introduced by humans are exotic or alien, not native.",
      "Incorrect. Farm animals (like cattle and goats) are introduced domestic species.",
      "Correct. Native species arrived naturally without human aid; endemic species evolved here uniquely (e.g. Mauritius Kestrel, Pink Pigeon, native ebony trees).",
      "Incorrect. Endemic species are precious natural heritage, not pests."
]
  },
  {
    order: 2,
    question: "Why is Strawberry Guava (Goyave de Chine / Psidium cattleyanum) classified as an Invasive Alien Species in Mauritian forests?",
    options: [
      "It spreads aggressively, forms impenetrable thickets, and prevents indigenous forest seedlings from regenerating",
      "Its red fruit is poisonous to all human beings",
      "It absorbs all oxygen from the atmosphere within a ten-mile radius",
      "It was declared an illegal plant by the Central Electricity Board"
],
    correct: 0,
    correctExplanation: "Invasive alien plants like Goyave de Chine aggressively displace fragile native flora and disrupt native wildlife habitats.",
    incorrectExplanation: "Incorrect. Invasive species aggressively outcompete native plants and alter native ecosystems.",
    optionFeedback: [
      "Correct. Goyave de Chine forms dense monospecific thickets, shading out native seedlings and starving endemic birds that depend on indigenous trees.",
      "Incorrect. The fruit is edible for humans, but the plant's ecological invasiveness destroys native forest canopies.",
      "Incorrect. Plants release oxygen through photosynthesis; this claim is unscientific.",
      "Incorrect. Plant biosecurity is managed by the Ministry of Agro-Industry and National Parks and Conservation Service (NPCS), not the CEB."
]
  },
  {
    order: 3,
    question: "What should a maintenance employee do if an unfamiliar wild bird nest or native animal is discovered on commercial premises during site clearing?",
    options: [
      "Spray the nest with insect pesticide immediately",
      "Pause work in the immediate area, protect the site from disturbance, and inform the facility environmental lead or the National Parks and Conservation Service (NPCS)",
      "Remove the nest and throw it into the general waste dumpster",
      "Capture the animal and take it home as a family pet"
],
    correct: 1,
    correctExplanation: "Pausing work protects potentially protected or endangered native wildlife from accidental destruction.",
    incorrectExplanation: "Incorrect. Pause work, isolate the area, and escalate to environmental specialists or NPCS.",
    optionFeedback: [
      "Incorrect. Spraying wildlife with pesticides is cruel, hazardous, and illegal under wildlife protection legislation.",
      "Correct. Ceasing work prevents accidental harm to native fauna (like Echo Parakeets or native reptiles) and allows certified wildlife officers to assess the site.",
      "Incorrect. Destroying nests of protected native birds violates the Native Terrestrial Biodiversity and National Parks Act 2015.",
      "Incorrect. Capturing protected wild animals is illegal and threatens species survival."
]
  },
  {
    order: 4,
    question: "Why should chemical drums and loose plastic litter never be stored near unpaved ground or open storm drains?",
    options: [
      "Rainwater will cause chemical drums to rust into pure gold",
      "Chemical drums make the car park look too tidy",
      "Storm drains are reserved exclusively for swimming during lunch hours",
      "Runoff washes toxic chemicals and plastics into waterways, estuaries, and coastal coral reef lagoons, devastating marine life"
],
    correct: 3,
    correctExplanation: "Stormwater runoff flows untreated into aquatic ecosystems; chemical spills and plastic litter cause severe marine pollution.",
    incorrectExplanation: "Incorrect. Stormwater drains wash surface pollutants directly into rivers, coral reefs, and coastal lagoons.",
    optionFeedback: [
      "Incorrect. Rusted steel drums release hazardous leaks into soil; they do not transmute into precious metals.",
      "Incorrect. Improper chemical storage is a major regulatory and environmental violation.",
      "Incorrect. Storm drains are drainage infrastructure, not recreational swimming facilities.",
      "Correct. Mauritius' coastal lagoons and coral reefs are vulnerable to terrestrial runoff; industrial chemicals and plastics poison fish and destroy coral colonies."
]
  },
  {
    order: 5,
    question: "A landscaping contractor offers to sell 'fast-growing exotic groundcover' for the corporate garden. What is the most responsible response?",
    options: [
      "Accept the offer immediately because fast-growing plants require zero maintenance",
      "Verify that the plant is non-invasive and prioritize hardy native or pollinator-friendly species adapted to local Mauritian climate conditions",
      "Plant the exotic groundcover inside natural forest reserves nearby",
      "Pour motor oil on the ground to prevent any plants from growing"
],
    correct: 1,
    correctExplanation: "Selecting native or non-invasive plants prevents introducing new invasive weeds that escape into natural ecosystems.",
    incorrectExplanation: "Incorrect. Landscaping should prioritize non-invasive native flora and verify plant species before planting.",
    optionFeedback: [
      "Incorrect. Fast-growing exotic plants often escape cultivation and become devastating ecological weeds.",
      "Correct. Using native plants (such as endemic palms or coastal veloutier) supports local biodiversity without risking invasive spread into native ecosystems.",
      "Incorrect. Introducing non-native plants into forest reserves is strictly illegal and ecologically destructive.",
      "Incorrect. Pouring oil contaminates soil and groundwater and is a serious environmental offense."
]
  },
  {
    order: 6,
    question: "Why should outdoor facility security floodlights be fitted with down-shields or directed downward rather than beaming upward into the night sky?",
    options: [
      "To prevent disorienting and grounding nocturnal seabirds (such as Petrels and Shearwaters) during their fledging season",
      "To prevent satellites in outer space from seeing the office building",
      "To make the car park completely dark so employees cannot find their vehicles",
      "Because upward-facing light consumes three times more electricity than downward light"
],
    correct: 0,
    correctExplanation: "Light pollution disorients young native seabirds flying from inland mountain breeding burrows out to the Indian Ocean.",
    incorrectExplanation: "Incorrect. Down-shielded lighting prevents disorienting native seabirds while maintaining safe ground illumination.",
    optionFeedback: [
      "Correct. In Mauritius, fledging seabirds like the Round Island Petrel or Shearwaters get blinded by upward light spill, crash into buildings, and become prey to predators.",
      "Incorrect. Downward shielding is an ecological and light-spill mitigation measure, not related to space satellites.",
      "Incorrect. Properly directed down-lighting illuminates pathways and car parks with superior clarity and safety.",
      "Incorrect. Power draw is determined by bulb wattage, but shielding ensures the light illuminates ground areas where needed."
]
  },
  {
    order: 7,
    question: "How does incorporating indigenous and endemic Mauritian trees (like Bois d'Ebene or Bois de Chandelle) into commercial property landscaping support local biodiversity?",
    options: [
      "Endemic trees produce synthetic plastic pellets for office printers",
      "They require massive amounts of chemical fertilizers and daily pesticide spraying",
      "They provide natural habitat, food, and nesting shelter for local birds, geckos, and pollinators while conserving irrigation water",
      "They prevent all rain from falling on the commercial site"
],
    correct: 2,
    correctExplanation: "Endemic plants are adapted to local soil and rainfall, providing authentic ecological niches for indigenous Mauritian fauna.",
    incorrectExplanation: "Incorrect. Endemic trees support local fauna, require minimal inputs once established, and restore native ecology.",
    optionFeedback: [
      "Incorrect. Trees produce organic biomass, fruit, and oxygen; they do not manufacture synthetic plastics.",
      "Incorrect. Native species evolved in local soils and generally require fewer chemical fertilizers and pesticides than exotic ornamentals.",
      "Correct. Indigenous flora co-evolved with native fauna, providing optimal nectar, fruit, and nesting hollows for local birds and beneficial insects.",
      "Incorrect. Trees promote natural microclimates and soil moisture retention; they do not stop regional rainfall."
]
  },
  {
    order: 8,
    question: "Under the Native Terrestrial Biodiversity and National Parks Act 2015, what is the legal status of strictly protected endemic flora and fauna on state and private land?",
    options: [
      "Employees are allowed to chop down protected endemic trees if they need firewood for a beach picnic",
      "Protected species can be captured and sold at roadside market stalls without permits",
      "The law applies only on public holidays and does not cover commercial building sites",
      "It is a serious statutory offense to uproot, fell, damage, capture, or trade in protected wildlife and endangered native species without authorized government permits"
],
    correct: 3,
    correctExplanation: "The Native Terrestrial Biodiversity and National Parks Act 2015 provides strict legal protections and criminal penalties for harming endangered native wildlife.",
    incorrectExplanation: "Incorrect. The Native Terrestrial Biodiversity and National Parks Act 2015 strictly protects listed native flora and fauna.",
    optionFeedback: [
      "Incorrect. Damaging or felling protected endemic trees is a criminal statutory violation.",
      "Incorrect. Capturing or trading in protected native species is strictly prohibited under national biodiversity legislation.",
      "Incorrect. Environmental statutes apply 365 days a year across all commercial, industrial, and development land.",
      "Correct. The Act establishes strict legal protection, requiring Environmental Impact Assessments and permits before any site clearing affecting protected wildlife."
]
  },
  {
    order: 9,
    question: "How does securing outdoor facility waste dumpsters with tight-fitting lids protect native Mauritian wildlife?",
    options: [
      "It prevents pest animals (like black rats and feral cats) from scavenging food waste and multiplying into adjacent natural reserves",
      "It turns organic food waste into concrete blocks",
      "It makes the dumpster soundproof when people drop bottles inside",
      "It allows companies to keep waste inside bins for ten years without collection"
],
    correct: 0,
    correctExplanation: "Exposed food waste breeds invasive rodents and predators that raid native bird nests in nearby forest and coastal habitats.",
    incorrectExplanation: "Incorrect. Securing dumpsters stops invasive pests from proliferating and preying on native wildlife.",
    optionFeedback: [
      "Correct. Open dumpsters provide continuous food for rats and feral animals, which are the single greatest predatory threat to native Mauritian birds and reptiles.",
      "Incorrect. Organic waste decomposes biologically; lids simply contain odours and exclude scavenger pests.",
      "Incorrect. Dumpster lids provide containment and pest exclusion, not acoustic soundproofing.",
      "Incorrect. Waste must still be collected and emptied regularly by scheduled waste management contractors."
]
  },
  {
    order: 10,
    question: "What is Integrated Pest Management (IPM) in commercial facility grounds maintenance?",
    options: [
      "Spraying broad-spectrum chemical insecticides over every lawn every morning",
      "Pouring bleach into garden soil to kill all underground earthworms",
      "Introducing foreign poisonous snakes to control garden insects",
      "Combining preventative sanitation, mechanical controls, and biological measures to manage pests while minimizing toxic chemical applications"
],
    correct: 3,
    correctExplanation: "Integrated Pest Management uses multi-layered preventative techniques to control pests without indiscriminate chemical spraying that poisons local ecosystems.",
    incorrectExplanation: "Incorrect. Integrated Pest Management emphasizes prevention, mechanical controls, and targeted minimal chemical use.",
    optionFeedback: [
      "Incorrect. Blanket chemical spraying kills beneficial pollinators (like bees) and contaminates runoff into water bodies.",
      "Incorrect. Bleach sterilizes soil, kills essential soil microorganisms, and poisons groundwater.",
      "Incorrect. Introducing alien predators causes catastrophic ecological harm, as historical mongoose introductions in Mauritius proved.",
      "Correct. IPM emphasizes hygiene, removing standing water, physical barriers, and targeted treatments, protecting pollinators and aquatic biodiversity."
]
  }
];

export async function ensureBiodiversityCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 8 by courseCode "ELH-08", slug, or ID
      let course = null;
      
      const [byCode] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, "ELH-08"))
        .limit(1);

      if (byCode) {
        course = byCode;
      } else {
        const [bySlug] = await tx
          .select()
          .from(coursesTable)
          .where(eq(coursesTable.slug, COURSE_SLUG))
          .limit(1);
        if (bySlug) {
          course = bySlug;
        } else {
          const [byId] = await tx
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.id, COURSE_ID))
            .limit(1);
          course = byId ?? null;
        }
      }

      if (!course) {
        throw new Error("Course ELH-08 / biodiversity-in-mauritius not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Biodiversity in Mauritius course content and v2 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course ELH-08. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "esg-basics-for-mauritian-business"))
        .limit(1);
      const nextCourseId = nextCourse?.id ?? null;

      // 5. Update course record slug, title, and metadata
      await tx
        .update(coursesTable)
        .set({
          title: COURSE_TITLE,
          slug: COURSE_SLUG,
          courseCode: "ELH-08",
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
          icon: "leaf",
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
          version: 2,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 2 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Biodiversity in Mauritius course v2 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute idempotent seeding/repair of Biodiversity in Mauritius course");
  }
}
