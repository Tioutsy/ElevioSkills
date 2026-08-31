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

const COURSE_ID = 11;
const COURSE_SLUG = "circular-economy";
const COURSE_TITLE = "Circular Economy";
const BADGE_SLUG = "circular-economy-practitioner";
const SEED_NAME = "circular-economy-v3";
const SKELETON_BADGE_SLUG = "circular-economy-badge";

const COURSE_META = {
  courseCode: "ELH-11",
  description:
    "Learn how workplaces can prevent waste, extend product useful life, retain material value, and make circular operational decisions beyond basic recycling.",
  fullDescription:
    "This foundation course provides employees, managers, and operational teams with a comprehensive guide to circular economy practices in commercial workplaces. Learn how organizations transition from linear 'take-make-dispose' models to value-retention ecosystems, apply the 9-step Circular Value Hierarchy, execute the CHECK–USE–CARE–SHARE–RECOVER operational protocol, manage closed-loop packaging, and safeguard data privacy and safety during electronics decommissioning.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "ESG and Compliance",
  isFeatured: false,
  thumbnailUrl: "/images/courses/circular-economy.jpg",
  intendedRoles: [
    "All employees",
    "Office administrators, facilities, and maintenance staff",
    "Procurement, purchasing, and warehouse managers",
    "IT support and asset management coordinators",
    "Sustainability leads and green team champions"
  ],
  learningObjectives: [
    "Explain the core differences between a linear economy and a circular economy in clear workplace language.",
    "Distinguish high-value circular actions (reduce, repair, reuse, refurbish) from lower-value material recycling and downcycling.",
    "Apply the 9-step Circular Value Hierarchy across equipment procurement, maintenance, and asset lifecycle management.",
    "Execute the 5-step CHECK–USE–CARE–SHARE–RECOVER protocol in daily workplace operations.",
    "Manage closed-loop supplier packaging systems (reusable crates, pallets, returnable containers).",
    "Complete 10 scenario-based assessment questions balancing operational requirements with circular value retention."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Circular Economy. You can now recognize where workplace products retain value, prioritize repair and reuse over disposal, and apply CHECK–USE–CARE–SHARE–RECOVER protocols safely.",
  badgeName: "Circular Workplace Practitioner",
  badgeDescription:
    "Awarded for demonstrating practical awareness of circular economy principles, value retention, equipment maintenance, and responsible material recovery."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Linear vs. Circular: Retaining Workplace Value",
    minutes: 4,
    content: "Learn how linear habits destroy financial value and why circular thinking eliminates waste at the source.",
    blocks: [
      { id: "ce1-h1", type: "heading", position: 1, headingText: "Where Does Workplace Value Go?" },
      { id: "ce1-t1", type: "short_text", position: 2, bodyText: "In a typical commercial facility storeroom, one finds functional office chairs scheduled for the dumpster due to minor caster wheel wear, unopened chemical bottles near expiry, surplus IT monitors, and heaps of single-use cardboard boxes. At the same time, purchasing receives requisitions to buy new replacements." },
      { id: "ce1-k1", type: "key_message", position: 3, headingText: "Linear vs. Circular Economy", bodyText: "• Linear Economy ('Take–Make–Dispose'): Raw materials are extracted, manufactured into products, used briefly, and thrown away as waste.\n• Circular Economy ('Prevent–Use–Care–Share–Recover'): Workplace systems keep products, components, and materials at their highest utility and value for as long as possible through preventative maintenance, repair, reuse, refurbishment, and responsible recovery." },
      {
        id: "ce1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Evaluating office chair disposal scenario:",
        decisionPrompt: "A company plans to replace 30 office chairs. Inspection shows 20 are fully functional, 5 need minor bolt tightening, and 5 have broken hydraulics. What is the most circular response?",
        decisionChoices: [
          { label: "Inspect and clean the 20 good chairs, repair the 5 minor defects, order replacement parts for the 5 hydraulic units, and keep existing assets in service", correct: true, feedback: "Outstanding! This preserves maximum financial and material value while preventing unnecessary capital expenditure and landfill waste." },
          { label: "Dispose of all 30 chairs in a landfill skip to ensure matching new furniture", correct: false, feedback: "Incorrect! Throwing away functioning assets destroys embodied material value and wastes company capital." },
          { label: "Send all 30 chairs directly to a plastic shredder without assessing repair", correct: false, feedback: "Incorrect. Recycling shreds materials and loses manufacturing value; repair and reuse must come first!" }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "The 9-Step Circular Value Hierarchy",
    minutes: 4,
    content: "Master the 9-level circular value hierarchy to guide operational purchasing and asset decisions.",
    blocks: [
      { id: "ce2-h1", type: "heading", position: 1, headingText: "The Value Retention Order" },
      { id: "ce2-t1", type: "short_text", position: 2, bodyText: "When evaluating workplace products, equipment, and packaging, follow the 9-step value retention hierarchy:" },
      {
        id: "ce2-k1",
        type: "key_message",
        position: 3,
        headingText: "The 9-Step Circular Hierarchy",
        bodyText: "1. Question the Need: Avoid unnecessary purchases.\n2. Reduce: Minimize material use per operation.\n3. Choose Durable: Purchase long-lasting, repairable items with warranties.\n4. Maintain: Conduct routine preventative maintenance.\n5. Repair: Fix broken components promptly.\n6. Reuse / Redistribute: Share usable items across departments.\n7. Refurbish: Restore worn assets to original condition.\n8. Recover Materials (Recycle): Process materials responsibly when reuse ends.\n9. Safe Disposal: Landfill or incinerate only as an absolute last resort."
      },
      {
        id: "ce2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Electronics decommissioning dilemma:",
        decisionPrompt: "The IT department has 15 older laptop computers being replaced during a hardware upgrade cycle. They still function well for standard administrative tasks. How should IT handle them under circular economy guidelines?",
        decisionChoices: [
          { label: "Perform certified NIST/DoD data sanitization, test electrical safety, and reallocate them to training rooms or donate to accredited educational non-profits", correct: true, feedback: "Spot on! Extending the operating lifespan of electronics through data-wiped reuse saves massive embodied carbon and electronic waste while protecting confidential corporate data." },
          { label: "Throw the laptops into the municipal garbage dumpster with customer data intact", correct: false, feedback: "Severe data privacy and environmental disaster! Never discard data-bearing electronics in general trash." },
          { label: "Smash them with a hammer and bury the pieces behind the building", correct: false, feedback: "Prohibited! Toxic heavy metals in e-waste poison soil and groundwater." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Closed-Loop Packaging & Supply Chain Systems",
    minutes: 4,
    content: "Eliminate single-use packaging through reusable crates, bulk dispensing, and supplier return agreements.",
    blocks: [
      { id: "ce3-h1", type: "heading", position: 1, headingText: "Circular Supply Chains" },
      { id: "ce3-t1", type: "short_text", position: 2, bodyText: "Single-use cardboard boxes and shrink wrap represent significant operational waste in warehousing and hospitality." },
      {
        id: "ce3-k1",
        type: "key_message",
        position: 3,
        headingText: "Closed-Loop Packaging Practices",
        bodyText: "• Returnable Delivery Crates: Standardize durable plastic or wooden delivery totes that suppliers retrieve on subsequent delivery runs.\n• Pallet Pooling: Partner with standardized pallet exchange networks (e.g. CHEP/LPR) to eliminate single-use wooden pallet disposal.\n• Bulk Refill Systems: Replace single-use 500ml chemical bottles with bulk 20L dispensers and reusable dilution spray bottles."
      }
    ]
  },
  {
    order: 3,
    title: "The 5-Step Protocol: CHECK–USE–CARE–SHARE–RECOVER",
    minutes: 4,
    content: "Master the daily operational protocol for managing workplace consumables and physical assets.",
    blocks: [
      { id: "ce4-h1", type: "heading", position: 1, headingText: "Daily Circular Protocol" },
      { id: "ce4-t1", type: "short_text", position: 2, bodyText: "Follow the 5-step checklist in everyday departmental routines:" },
      {
        id: "ce4-k1",
        type: "key_message",
        position: 3,
        headingText: "The 5 Steps",
        bodyText: "1. CHECK: Verify existing storeroom inventory or surplus assets before raising any new purchase request.\n2. USE: Use products efficiently according to manufacturer dosing/usage guidelines without over-consumption.\n3. CARE: Clean, service, and store tools and equipment properly to prevent premature wear and rust.\n4. SHARE: Post unneeded surplus items to the internal asset register for reallocation to other departments.\n5. RECOVER: Ensure worn-out items are segregated into verified recycling streams with certified recyclers."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Departmental Roles in Circularity",
    minutes: 4,
    content: "Understand how facilities, procurement, IT, and operations collaborate to eliminate waste.",
    blocks: [
      { id: "ce5-h1", type: "heading", position: 1, headingText: "Cross-Departmental Circular Stewardship" },
      { id: "ce5-t1", type: "short_text", position: 2, bodyText: "Circularity requires collaboration across multiple departments:" },
      {
        id: "ce5-k1",
        type: "key_message",
        position: 3,
        headingText: "Departmental Responsibilities",
        bodyText: "• Procurement: Contracts with suppliers for returnable packaging and repairable equipment with warranties.\n• Facilities & Maintenance: Performs preventative maintenance, valve repairs, and furniture refurbishment.\n• IT: Oversees certified data wiping, hardware life extension, and e-waste recycling.\n• Operations & Hospitality: Enforces bulk dispensing, food surplus donation, and waste stream segregation."
      }
    ]
  },
  {
    order: 5,
    title: "Your Workplace Circular Economy Commitment",
    minutes: 3,
    content: "Select practical commitments to prevent waste and retain product value in your daily work.",
    blocks: [
      { id: "ce6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "ce6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Circular Economy! Select the commitments below relevant to your role." },
      {
        id: "ce6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your workplace circular economy commitments (choose at least one):",
        commitmentOptions: [
          { value: "check-before-buying", label: "Apply the CHECK–USE–CARE–SHARE–RECOVER protocol before requesting new purchases", description: "Verify existing stock and surplus assets before buying." },
          { value: "prioritize-repair", label: "Prioritize maintenance, repair, and refurbishment over discarding worn equipment", description: "Extend asset lifespan and retain material value." },
          { value: "secure-e-waste", label: "Ensure data-bearing electronics undergo certified data sanitization before reuse or recycling", description: "Protect confidentiality and enable safe electronics reuse." },
          { value: "support-reusable-packaging", label: "Return reusable delivery crates, pallets, and containers to vendors promptly", description: "Enable closed-loop supply chain logistics." },
          { value: "redistribute-surplus", label: "Report surplus equipment and supplies for internal department redistribution", description: "Prevent unnecessary waste and reduce corporate spend." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the core difference between a Linear Economy and a Circular Economy in a commercial workplace?",
    options: [
      "A Linear Economy follows a 'Take–Make–Dispose' model that generates waste; a Circular Economy keeps materials, products, and components at their highest utility and value through maintenance, repair, reuse, and recovery",
      "A Linear Economy only operates in round buildings, while a Circular Economy operates in square warehouses",
      "A Linear Economy bans all computer technology, while a Circular Economy bans all electricity",
      "There is no difference; both terms describe municipal landfill dumping"
    ],
    correct: 0,
    correctExplanation: "Linear models dispose of assets after single cycles; Circular models maintain, repair, and recover assets to preserve embodied value.",
    incorrectExplanation: "Incorrect. Circular economies prioritize value retention, repair, and reuse over rapid disposal."
  },
  {
    order: 2,
    question: "Why is material recycling considered lower down the Circular Value Hierarchy than equipment repair or reuse?",
    options: [
      "Recycling breaks down products into raw material fractions, destroying the embodied engineering, manufacturing labor, and operational utility that repair preserves",
      "Recycling is legally prohibited in all commercial facilities in Mauritius",
      "Recycling requires all office employees to hold advanced chemistry degrees",
      "Recycling makes office computers run slower"
    ],
    correct: 0,
    correctExplanation: "Repair and reuse preserve complete functional assets; recycling degrades materials and consumes significant energy to reprocess.",
    incorrectExplanation: "Incorrect. Repair and reuse preserve functional utility and manufacturing energy far better than recycling."
  },
  {
    order: 3,
    question: "What mandatory security protocol MUST be completed before surplus workplace computers or mobile devices are donated or recycled?",
    options: [
      "Certified data sanitization (data wiping) to protect proprietary business and customer personal information, followed by electrical safety testing",
      "Painting the laptop case green with spray paint",
      "Deleting the desktop shortcut icons from the computer screen",
      "Submerging the computers in sea water to wash off dust"
    ],
    correct: 0,
    correctExplanation: "Data sanitization is mandatory to prevent confidential data breaches and comply with data privacy regulations before electronics change hands.",
    incorrectExplanation: "Incorrect. Certified data wiping is essential to protect confidential information before electronics reuse or recycling."
  },
  {
    order: 4,
    question: "Which of the following delivery setups represents a closed-loop circular packaging practice between a supplier and a buyer?",
    options: [
      "Using standardized, durable plastic delivery crates that the supplier collects, cleans, and refills on every delivery run",
      "Wrapping every individual item in three layers of non-recyclable plastic shrink wrap and throwing it in a skip",
      "Burning single-use cardboard boxes behind the loading dock every Friday",
      "Requiring the supplier to deliver goods in unsealed paper bags during rainy weather"
    ],
    correct: 0,
    correctExplanation: "Returnable crates that are collected and refilled by suppliers create an efficient, waste-free closed-loop packaging cycle.",
    incorrectExplanation: "Incorrect. Reusable delivery crates refilled by suppliers represent circular closed-loop packaging."
  },
  {
    order: 5,
    question: "What is the first action in the CHECK–USE–CARE–SHARE–RECOVER operational protocol when an employee needs workplace supplies?",
    options: [
      "CHECK: Check existing storeroom inventory, stationery amnesties, and surplus asset registers before raising a new purchase requisition",
      "RECOVER: Throw existing supplies into the garbage dumpster to make room for new boxes",
      "SHARE: Take supplies from a neighboring business without asking permission",
      "CARE: Hide supplies in a private drawer so colleagues cannot use them"
    ],
    correct: 0,
    correctExplanation: "Checking existing stock and internal surplus prevents duplicate purchasing and eliminates unnecessary capital spend.",
    incorrectExplanation: "Incorrect. The first step is CHECK existing stock before placing new purchase orders."
  },
  {
    order: 6,
    question: "A company's executive meeting room chairs have worn fabric upholstery, but the solid wood frames and metal swivel mechanisms are in perfect structural condition. What is the most circular solution?",
    options: [
      "Re-upholster the chairs with durable commercial fabric through a local artisan, extending asset life by another 7–10 years for a fraction of replacement cost",
      "Throw all chairs into a general landfill skip and buy 20 brand-new imported chairs",
      "Burn the chairs in the parking lot to keep employees warm",
      "Force meeting attendees to sit on the floor"
    ],
    correct: 0,
    correctExplanation: "Re-upholstery refurbishes the asset, preserving the durable structural frame and avoiding the cost and carbon of buying new furniture.",
    incorrectExplanation: "Incorrect. Re-upholstering and refurbishing worn furniture retains embodied value and extends asset lifespan."
  },
  {
    order: 7,
    question: "How does implementing preventative maintenance on commercial HVAC and refrigeration systems support the circular economy?",
    options: [
      "It prevents premature compressor failure, maintains optimal energy efficiency, and extends the operating lifespan of the equipment by years",
      "It makes the equipment run without any electricity",
      "It ensures that equipment will spontaneously turn into solar panels",
      "It eliminates the need for maintenance technicians"
    ],
    correct: 0,
    correctExplanation: "Routine maintenance prevents mechanical breakdowns and premature disposal, keeping heavy capital assets in active service longer.",
    incorrectExplanation: "Incorrect. Preventative maintenance prevents premature equipment failure and maximizes asset lifespan."
  },
  {
    order: 8,
    question: "What is 'Downcycling' in waste and materials management?",
    options: [
      "Recycling a material into a product of lower quality and functionality (e.g. converting high-grade office paper into low-grade cardboard egg cartons) which cannot be recycled indefinitely",
      "Riding a bicycle downhill to save commute energy",
      "Throwing waste into deep ocean trenches",
      "Decreasing the price of new products during holiday sales"
    ],
    correct: 0,
    correctExplanation: "Downcycling breaks down materials into lower-grade applications, losing material purity with each cycle until eventual disposal.",
    incorrectExplanation: "Incorrect. Downcycling converts materials into lower-grade, less recyclable products over successive lifecycles."
  },
  {
    order: 9,
    question: "What should a procurement coordinator include in contracts with commercial equipment vendors to ensure circularity?",
    options: [
      "Requirements for long warranties, guaranteed availability of spare parts for at least 7 years, and vendor end-of-life take-back or buy-back clauses",
      "A clause stating that the vendor must never answer telephone calls",
      "A requirement that equipment must be made of single-use glued plastics that cannot be opened",
      "A penalty if the vendor delivers equipment with an instruction manual"
    ],
    correct: 0,
    correctExplanation: "Contracting for spare parts availability, modular repairability, and take-back agreements ensures assets can be maintained and recovered.",
    incorrectExplanation: "Incorrect. Specifying warranties, spare parts availability, and take-back terms enables ongoing maintenance and circular recovery."
  },
  {
    order: 10,
    question: "How does creating an internal 'Workplace Asset Reallocation Register' benefit an organization?",
    options: [
      "It allows departments with surplus desks, monitors, or filing cabinets to transfer them to departments that need them, avoiding duplicate purchases",
      "It forces employees to give their personal belongings to company executives",
      "It automatically deletes all corporate email accounts every Friday",
      "It makes physical office buildings invisible from the street"
    ],
    correct: 0,
    correctExplanation: "Internal asset sharing networks match surplus equipment with existing demand, eliminating unnecessary procurement spending.",
    incorrectExplanation: "Incorrect. Asset reallocation registers enable internal sharing of surplus items, preventing duplicate purchasing and waste."
  }
];

export async function ensureCircularEconomyCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 11 by courseCode "ELH-11", slug, or ID
      let course = null;
      
      const [byCode] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, "ELH-11"))
        .limit(1);

      if (byCode) {
        course = byCode;
      } else {
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
      }

      if (!course) {
        throw new Error("Course 11 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Circular Economy course content and v3 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v3 seed detected for Course 11. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "workplace-sustainability-leadership"))
        .limit(1);
      const nextCourseId = nextCourse?.id ?? null;

      // 5. Update course record slug, title, and metadata
      await tx
        .update(coursesTable)
        .set({
          title: COURSE_TITLE,
          slug: COURSE_SLUG,
          courseCode: COURSE_META.courseCode,
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
          icon: "refresh-cw",
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
          version: 3,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 3 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Circular Economy course v3 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Circular Economy course seeding");
    throw err;
  }
}
