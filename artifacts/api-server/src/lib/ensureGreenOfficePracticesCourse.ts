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

const COURSE_ID = 6;
const COURSE_SLUG = "green-office-practices";
const COURSE_TITLE = "Green Office Practices";
const BADGE_SLUG = "green-office-contributor";
const SEED_NAME = "green-office-practices-v5";
const SKELETON_BADGE_SLUG = "green-office-practitioner";

const COURSE_META = {
  courseCode: "ELH-06",
  description:
    "Master sustainable office administration, digital workflow hygiene, responsible consumables purchasing, low-waste meeting catering, hybrid working practices, and collaborative green workplace management.",
  fullDescription:
    "This course equips office managers, administrative coordinators, department leaders, and knowledge workers to establish sustainable workplace administration systems. Moving beyond generic environmental tips, it focuses on sustainable office supplies procurement, digital document hygiene, pull-printing and confidential data boundaries, catering and kitchen systems, hot-desking and hybrid working resource management, landlord-tenant green lease coordination, and constructive culture change without policing colleagues.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/green-office-practices.jpg",
  intendedRoles: [
    "Office managers and administrators",
    "Executive assistants and departmental coordinators",
    "HR and operations support staff",
    "All office-based and hybrid employees",
    "Team leads and facilities liaisons"
  ],
  learningObjectives: [
    "Establish sustainable office consumables management, inventory control, and supplier return systems.",
    "Implement digital document workflows and secure pull-printing practices while safeguarding data confidentiality.",
    "Plan low-waste, right-sized meeting catering and eliminate single-use items in shared kitchens.",
    "Manage hybrid workspace footprints, shared desk shutdown routines, and digital cloud storage hygiene.",
    "Navigate landlord-tenant green lease coordination and HVAC/lighting scheduling in leased premises.",
    "Foster a collaborative sustainability culture through positive behavioral defaults rather than confrontational policing."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Green Office Practices. You are now equipped to manage office supplies responsibly, streamline digital workflows, plan low-waste meetings, and foster sustainable administrative systems.",
  badgeName: "Green Office Administrator",
  badgeDescription:
    "Awarded for demonstrating practical competence in sustainable workplace administration, digital workflow hygiene, and green office systems."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "The Friction-Heavy Office: A Day in Administration",
    minutes: 4,
    content: "Examine resource waste across administration, consumables, meetings, and shared office amenities.",
    blocks: [
      { id: "gop1-h1", type: "heading", position: 1, headingText: "Morning Arrival in Administration" },
      { id: "gop1-t1", type: "short_text", position: 2, bodyText: "Imagine walking into a corporate office on a Monday morning. Uncollected print jobs from Friday are piled beside the printer, five opened boxes of different pen brands clutter the stationery cupboard, single-use plastic water bottles fill the meeting room bin, and confidential client documents are stacked dangerously close to an open recycling box. Office waste is rarely an individual failure—it is the result of missing administrative systems and unclear workplace defaults." },
      { id: "gop1-k1", type: "key_message", position: 3, headingText: "Systems Beat Slogans", bodyText: "Telling staff to 'use less' rarely creates lasting change. Sustainable office administration relies on frictionless systems: centralized supply inventories, secure pull-printing defaults, standardized meeting catering templates, and clear shared-space ownership." },
      {
        id: "gop1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Morning stationery requisition scenario:",
        decisionPrompt: "An employee submits a purchase request for a personal desktop printer and three separate desk fans for their team because 'the central printer is ten steps away and the central AC feels slightly breezy'. How should the office administrator respond?",
        decisionChoices: [
          { label: "Decline the personal printer request, explain the centralized network printer standard, and coordinate with facilities to adjust the diffuser louver for air comfort", correct: true, feedback: "Spot on! Proliferation of personal desktop printers multiplies cartridge waste, power draw, and maintenance costs. Addressing the root comfort issue and maintaining central infrastructure is best administrative practice." },
          { label: "Approve the personal printer and all fans immediately to keep the employee happy", correct: false, feedback: "Incorrect. Dispersed desktop printers drastically increase cartridge waste, standby energy, and procurement overhead." },
          { label: "Send a company-wide email shaming the employee for asking for a printer", correct: false, feedback: "Unprofessional! Address administrative requests constructively through clear policy explanations." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Consumables Management & Sustainable Office Purchasing",
    minutes: 4,
    content: "Streamline stationery inventory, eliminate redundant orders, and institute closed-loop return systems.",
    blocks: [
      { id: "gop2-h1", type: "heading", position: 1, headingText: "From Cluttered Cupboards to Rationalized Purchasing" },
      { id: "gop2-t1", type: "short_text", position: 2, bodyText: "Uncontrolled stationery ordering leads to duplicate supplies, dried-up marker pens, and wasted operational budget. Rationalized purchasing standardizes core office supplies." },
      {
        id: "gop2-k1",
        type: "key_message",
        position: 3,
        headingText: "Four Sustainable Supply Chain Practices",
        bodyText: "1. Standardized Product Catalogue: Select certified 100% recycled or FSC-certified copy paper, refillable whiteboard markers, and durable staples.\n2. Consolidated Monthly Ordering: Eliminate frequent small courier deliveries by grouping departmental orders into a single monthly delivery.\n3. Take-Back & Return Schemes: Partner with suppliers who collect empty toner cartridges and electronic e-waste for certified recycling.\n4. Central 'Stationery Amnesty': Host a quarterly internal collection where employees return unused items from their desk drawers to the central store."
      },
      {
        id: "gop2-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "What is the primary benefit of holding a quarterly 'Stationery Amnesty' in an office?",
        mcqOptions: [
          "It recovers hundreds of unused pens, folders, and notebooks hoarded in desk drawers, cutting new purchasing costs and reducing clutter",
          "It allows the company to fire employees who have more than two pens",
          "It legally exempts the organization from corporate tax requirements",
          "It eliminates the need for computer monitors in the office"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Stationery amnesties recover dormant inventory, prevent unnecessary duplicate purchases, and remind staff of shared resource stewardship.",
        mcqIncorrectExplanation: "Incorrect. Internal supply recovery saves procurement funds and organizes inventory."
      }
    ]
  },
  {
    order: 2,
    title: "Digital Document Workflows & Secure Print Boundaries",
    minutes: 4,
    content: "Implement secure pull-printing, digital signing, and navigate confidential data vs recycling requirements.",
    blocks: [
      { id: "gop3-h1", type: "heading", position: 1, headingText: "Smart Printing and Document Security" },
      { id: "gop3-t1", type: "short_text", position: 2, bodyText: "The average office worker prints thousands of pages annually, with up to 30% never being collected from the output tray. Furthermore, discarded paper containing client personal data presents severe privacy and regulatory compliance liabilities." },
      {
        id: "gop3-k1",
        type: "key_message",
        position: 3,
        headingText: "The Data Protection vs Recycling Rule",
        bodyText: "CRITICAL COMPLIANCE PRINCIPLE: Never place confidential records, payroll sheets, medical information, or client identity documents into standard open paper recycling bins. Confidential documents MUST go through secure locked shredding consoles. General unprinted scrap or non-confidential drafts go into blue recycling bins."
      },
      {
        id: "gop3-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Document disposal dilemma:",
        decisionPrompt: "You are clearing out an administrative archive and have three boxes of obsolete customer contract copies containing national identity numbers and financial bank details. What is the correct disposal method?",
        decisionChoices: [
          { label: "Deposit the contracts into the locked confidential shredding bin for certified destruction", correct: true, feedback: "Correct! Confidential customer data must be shredded according to Data Protection Act regulations. Standard open recycling exposes the organization to massive privacy breaches." },
          { label: "Dump the files into the general office paper recycling box to save time", correct: false, feedback: "Severe compliance violation! Never place personal customer data into unmonitored open recycling bins." },
          { label: "Throw the intact files into the outdoor general garbage dumpster", correct: false, feedback: "Unacceptable. Intact records in general waste can be intercepted and violate data privacy laws." }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "Meeting Practices, Low-Waste Catering & Shared Amenities",
    minutes: 4,
    content: "Eliminate disposable items in shared kitchens, right-size event catering, and manage digital meeting hygiene.",
    blocks: [
      { id: "gop4-h1", type: "heading", position: 1, headingText: "Event & Meeting Administration" },
      { id: "gop4-t1", type: "short_text", position: 2, bodyText: "Internal workshops, board meetings, and client sessions are frequent hotspots for single-use plastics, excessive printed decks, and wasted buffet catering." },
      {
        id: "gop4-k1",
        type: "key_message",
        position: 3,
        headingText: "Four Administrative Meeting Standards",
        bodyText: "1. Digital Agendas: Share slide decks and briefing packs via cloud links; print only when legally required or specifically requested by attendees with accessibility needs.\n2. Reusable Glassware & Filtered Water: Replace single-use 500ml plastic bottles with glass carafes and reusable cups.\n3. Headcount-Confirmed Catering: Confirm dietary restrictions and exact attendance 24 hours prior to prevent ordering 30 lunches for 12 participants.\n4. Food Redistribution Protocols: Partner with local charities or have clean takeaway packaging ready for staff to consume surplus catering safely."
      }
    ]
  },
  {
    order: 4,
    title: "Hybrid Work, Shared Desks & Landlord Green Leases",
    minutes: 4,
    content: "Manage hot-desking shutdown routines, digital cloud storage footprints, and leased facility coordination.",
    blocks: [
      { id: "gop5-h1", type: "heading", position: 1, headingText: "The Modern Hybrid Workplace" },
      { id: "gop5-t1", type: "short_text", position: 2, bodyText: "In hybrid work models with flexible desk sharing, employees often leave shared monitors and accessories on standby because 'it is not my personal desk'. Furthermore, in leased commercial buildings, tenants and landlords must coordinate operational hours." },
      {
        id: "gop5-k1",
        type: "key_message",
        position: 3,
        headingText: "Shared Desk Etiquette and Green Leases",
        bodyText: "• Clean Desk & Power-Down: When vacating a hot-desk, shut down the external monitor, unplug personal chargers, and wipe the workspace.\n• Cloud Storage Hygiene: Delete duplicate video recordings, unneeded backups, and massive email attachments—data centers consume enormous continuous energy.\n• Landlord Coordination (Green Lease): Ensure the building management system (BMS) aligns centralized cooling with your actual departmental working hours rather than running AC across unoccupied tenant floors on weekends."
      },
      {
        id: "gop5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Leased building scheduling dilemma:",
        decisionPrompt: "Your company occupies the 4th floor of a leased office tower. You discover the landlord's central chiller runs on full power every Saturday from 7:00 AM to 6:00 PM, even though your staff work 100% remotely on weekends. What should administration do?",
        decisionChoices: [
          { label: "Contact the building property manager to adjust the BMS timer schedule to shut off 4th-floor air handling units on weekends", correct: true, feedback: "Outstanding! Coordinating HVAC schedules with property management stops hundreds of hours of wasteful weekend cooling and lowers tenant service charges." },
          { label: "Ignore it because the landlord pays for the electricity anyway", correct: false, feedback: "Incorrect. Tenant service charges pass utility costs directly back to your company, and wasted energy harms the climate." },
          { label: "Tell employees they are forced to come into the office on Saturdays so the cooling isn't wasted", correct: false, feedback: "Incorrect. Adjust the technical schedule to match business reality." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Sustainable Office Administration Toolkit",
    minutes: 3,
    content: "Select practical administrative routines and commitments to establish an efficient, green office culture.",
    blocks: [
      { id: "gop6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Administrative Takeaways" },
      { id: "gop6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Green Office Practices! Select the commitments below relevant to your administrative and operational responsibilities." },
      {
        id: "gop6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your workplace administration commitments (choose at least one):",
        commitmentOptions: [
          { value: "rationalize-stationery", label: "Consolidate monthly supply orders and standardize on sustainable office products", description: "Eliminate excess inventory and reduce delivery emissions." },
          { value: "secure-shredding", label: "Enforce locked confidential shredding for sensitive data while recycling clean paper", description: "Protect customer privacy while maximizing material recycling." },
          { value: "low-waste-meetings", label: "Provide glass carafes and right-sized catering for meetings and events", description: "Eliminate single-use plastics and food waste." },
          { value: "hotdesk-shutdown", label: "Implement power-down and clean-desk routines for shared workstations", description: "Eliminate idle standby power on flexible desks." },
          { value: "landlord-coordination", label: "Coordinate with building management to ensure HVAC schedules match working hours", description: "Prevent weekend and after-hours energy waste in leased premises." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the fundamental difference between effective sustainable office administration and simply putting up 'use less' slogans?",
    options: [
      "Sustainable administration establishes effortless structural defaults (centralized purchasing, pull-printing, locked shredding) that make green habits the easiest choice",
      "Slogans are legally binding under commercial law, whereas administrative procedures are optional",
      "Sustainable administration requires firing all employees who consume paper",
      "Administrative procedures eliminate the need for corporate leadership"
    ],
    correct: 0,
    correctExplanation: "Clear administrative systems, sensible procurement defaults, and shared routines create permanent, frictionless operational efficiency.",
    incorrectExplanation: "Incorrect. Slogans without supportive systems fail; structural defaults create lasting workplace habits."
  },
  {
    order: 2,
    question: "How should an office manager handle confidential customer contracts and payroll records when archiving or disposing of old paperwork?",
    options: [
      "Deposit the documents into a locked, secure shredding console for certified destruction in compliance with data protection laws",
      "Toss the intact files into the open blue paper recycling bin in the hallway",
      "Throw the intact folders into the outdoor general waste dumpster",
      "Leave the folders on an unattended coffee table in the reception lounge"
    ],
    correct: 0,
    correctExplanation: "Sensitive personal and commercial records must never go into open recycling bins. They must be securely shredded to prevent data breaches.",
    incorrectExplanation: "Incorrect. Placing personal data in open recycling violates data protection laws and creates severe privacy liabilities."
  },
  {
    order: 3,
    question: "What is the primary benefit of consolidating stationery purchasing into a standardized catalogue with scheduled monthly ordering?",
    options: [
      "It eliminates duplicate stock, reduces courier delivery emissions, secures bulk discounts on eco-certified supplies, and prevents cluttered storage cupboards",
      "It allows employees to purchase luxury personal electronics on company expense",
      "It makes the office completely paper-free within 24 hours",
      "It eliminates the need for accounting and invoice audits"
    ],
    correct: 0,
    correctExplanation: "Consolidated, standardized purchasing cuts delivery transport, lowers procurement costs, and prevents hoarded, unused supplies.",
    incorrectExplanation: "Incorrect. Consolidated ordering optimizes inventory and eliminates wasteful ad-hoc deliveries."
  },
  {
    order: 4,
    question: "When organizing catering for a 20-person corporate training workshop, what is the best practice to prevent food waste and single-use plastic pollution?",
    options: [
      "Confirm attendee dietary preferences 24 hours prior, provide glass water carafes with reusable tableware, and prepare clean containers for surplus food redistribution",
      "Order 50 individual fast-food meal boxes with single-use plastic cutlery and 100 individual plastic water bottles",
      "Provide no food or water for the participants during an 8-hour workshop",
      "Throw all leftover food directly into the plastic recycling bin"
    ],
    correct: 0,
    correctExplanation: "Right-sizing catering, eliminating single-use plastic bottles, and planning for food redistribution prevents massive event waste.",
    incorrectExplanation: "Incorrect. Over-ordering individual plastics and discarding food creates massive avoidable waste."
  },
  {
    order: 5,
    question: "An administrative coordinator discovers that in their leased office building, the central air conditioning runs at full power on Saturdays when the office is 100% remote. What should they do?",
    options: [
      "Liaise with building property management to adjust the Building Management System (BMS) schedule so the floor is unconditioned on weekends",
      "Ignore it because tenant service charges cannot be changed",
      "Demand that all staff come into the office on Saturdays so the cooling is utilized",
      "Smash the building's main thermostat with a hammer"
    ],
    correct: 0,
    correctExplanation: "Coordinating HVAC schedules with building landlords aligns energy consumption with actual occupancy, saving significant utility costs.",
    incorrectExplanation: "Incorrect. Proactively coordinating with property managers eliminates wasteful after-hours and weekend cooling."
  },
  {
    order: 6,
    question: "What is 'pull-printing' (badge-authenticated printing) and why is it an essential sustainable office standard?",
    options: [
      "Print jobs are held on a secure server and released only when the user taps their ID badge at the printer, eliminating uncollected print waste and protecting privacy",
      "The printer physically pulls paper out of the recycling bin to re-use it",
      "Employees must physically pull the printer cable out of the wall every time they print",
      "It requires three managers to sign a physical paper form for every single page printed"
    ],
    correct: 0,
    correctExplanation: "Pull-printing prevents forgotten print jobs in the tray (up to 30% of office print volume) and ensures confidential documents are never left unattended.",
    incorrectExplanation: "Incorrect. Pull-printing holds jobs until the user arrives at the machine, eliminating abandoned prints and safeguarding privacy."
  },
  {
    order: 7,
    question: "What is the recommended administrative practice for hot-desking and shared workstations at the end of the working day?",
    options: [
      "Employees shut down external displays, unplug personal chargers, and leave the surface clean and ready for the next colleague",
      "Employees leave all screens on high brightness with personal files open on the desk",
      "Employees take the computer monitors home in their personal bag",
      "Employees tape their personal name tag to the desk to claim permanent ownership"
    ],
    correct: 0,
    correctExplanation: "Shared desk etiquette requires shutting down monitors to eliminate standby draw, removing personal items, and leaving a clean space.",
    incorrectExplanation: "Incorrect. Hot-desking etiquette prevents standby energy waste and supports agile team collaboration."
  },
  {
    order: 8,
    question: "How does digital data hygiene (e.g. deleting duplicate video recordings and cleaning unneeded cloud storage) contribute to sustainability?",
    options: [
      "Cloud servers and data centers consume substantial electricity and water for cooling; reducing redundant data lowers digital carbon footprints",
      "It prevents computer monitors from emitting radiation",
      "It makes the internet completely free for all users worldwide",
      "It eliminates the need for internet security firewalls"
    ],
    correct: 0,
    correctExplanation: "Data centers represent a rapidly growing share of global electricity and cooling demand. Digital hygiene reduces unnecessary cloud storage infrastructure.",
    incorrectExplanation: "Incorrect. Data centers consume immense power and cooling; managing digital storage minimizes cloud energy footprints."
  },
  {
    order: 9,
    question: "An employee notices a colleague occasionally printing single-sided documents. What is the most constructive way to encourage sustainable habits?",
    options: [
      "Politely remind them of the default double-sided printing setting or ask IT to make double-sided the automatic driver default, without public shaming",
      "Take a photo of the colleague and post it on social media with a mocking caption",
      "Steal the colleague's paper tray and hide it in the bathroom",
      "File an official police report for environmental vandalism"
    ],
    correct: 0,
    correctExplanation: "Constructive peer communication and setting helpful system defaults encourage positive change without creating workplace hostility.",
    incorrectExplanation: "Incorrect. Effective green culture relies on positive system defaults and respectful communication, not confrontation."
  },
  {
    order: 10,
    question: "What should an administrative team do with obsolete or broken electronics such as keyboards, cables, and laptops?",
    options: [
      "Consolidate items in a secure e-waste holding area and arrange collection with a certified e-waste recycling and data sanitization provider",
      "Toss all electronics into the municipal garden waste compost bin",
      "Bury them in the garden behind the office building",
      "Burn them in an open metal barrel in the parking lot"
    ],
    correct: 0,
    correctExplanation: "Electronic waste contains toxic heavy metals and valuable recyclable materials; it must be handled through certified e-waste recyclers.",
    incorrectExplanation: "Incorrect. E-waste must never be landfilled, composted, or incinerated; it requires certified electronic recycling."
  }
];

export async function ensureGreenOfficePracticesCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 6 by ID 6 or slug
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
        throw new Error("Course 6 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Green Office Practices course content and v5 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v5 seed detected for Course 6. Re-seeding course content and lessons transactionally...");

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
          icon: "briefcase",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 11,
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
          version: 5,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 5 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Green Office Practices course v5 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Green Office Practices course seeding");
    throw err;
  }
}
