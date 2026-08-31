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

const COURSE_ID = 5;
const COURSE_SLUG = "sustainable-procurement";
const COURSE_TITLE = "Sustainable Purchasing for Non-Specialists";
const BADGE_SLUG = "responsible-purchasing";
const SEED_NAME = "sustainable-procurement-v3";
const SKELETON_BADGE_SLUG = "sustainable-procurement-badge";

const COURSE_META = {
  courseCode: "ELH-05",
  description:
    "A practical guide for non-procurement employees and team leaders on evaluating purchase needs, comparing whole-life value beyond invoice prices, questioning supplier claims, and making responsible requisitions.",
  fullDescription:
    "Designed specifically for general employees, administrative staff, department coordinators, and supervisors who request, select, or approve workplace purchases, this foundation course teaches how to avoid unnecessary requisitions, apply Total Cost of Ownership (TCO) and durability thinking, ask vendors straightforward evidence-based questions, identify unverified green claims, and follow internal approval and ethical governance boundaries.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/sustainable-procurement.png",
  intendedRoles: [
    "All employees who request or purchase workplace goods",
    "Office administrators and department coordinators",
    "Team leads, supervisors, and budget holders",
    "Project coordinators and site leads"
  ],
  learningObjectives: [
    "Apply the 'Need vs. Want' test to challenge whether a new purchase is necessary before requesting quotes.",
    "Evaluate total whole-life value (operating power, durability, maintenance, consumables) beyond the initial price tag.",
    "Ask suppliers three basic, verifiable questions about product lifespan, energy efficiency, and packaging returnability.",
    "Identify unverified greenwashing buzzwords ('100% green', 'eco-friendly') and request technical data sheets.",
    "Follow procurement approval limits, conflict-of-interest disclosures, and ethical purchasing rules.",
    "Complete 10 scenario-based assessment questions balancing operational urgency, cost, and sustainability."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Sustainable Purchasing for Non-Specialists. You are now equipped to evaluate purchase needs critically, compare whole-life value, ask the right vendor questions, and make responsible requisitions.",
  badgeName: "Responsible Purchasing Contributor",
  badgeDescription:
    "Awarded for applying balanced purchasing judgement across need, whole-life value, supplier evidence, safety, and ethical governance."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Cheapest Quote vs Whole-Life Value",
    minutes: 4,
    content: "Understand why purchase price alone is misleading when requisitioning workplace equipment and supplies.",
    blocks: [
      { id: "sp1-h1", type: "heading", position: 1, headingText: "Evaluating Supplier Quotes" },
      { id: "sp1-t1", type: "short_text", position: 2, bodyText: "Imagine your department needs five replacement office chairs and an electric kettle. Supplier A offers the lowest purchase price. Supplier B costs 15% more upfront but provides certified 5-year commercial warranties, local replacement parts, and repairable mechanical components. Supplier C claims its product is '100% eco-friendly' but offers no technical data sheet or warranty." },
      { id: "sp1-k1", type: "key_message", position: 3, headingText: "Cheapest Upfront Does Not Mean Best Value", bodyText: "A low initial price tag often conceals high operating electricity, rapid breakage, short lifespan, expensive proprietary consumables, and costly disposal. Sustainable purchasing evaluates whole-life value: purchase price + operating costs + lifespan durability + disposal." },
      {
        id: "sp1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "First step in evaluating supplier quotes:",
        decisionPrompt: "What should an employee do before submitting a requisition for new equipment?",
        decisionChoices: [
          { label: "Verify genuine operational need, check if surplus equipment is available internally, and compare whole-life durability and warranty data", correct: true, feedback: "Correct! Confirming need and checking internal inventory prevents redundant purchases and saves budget." },
          { label: "Select Supplier A immediately because it has the lowest upfront invoice price", correct: false, feedback: "Incorrect. The cheapest initial quote often leads to higher total costs through frequent replacements or high energy draw." },
          { label: "Choose Supplier C because '100% eco-friendly' marketing sounds sustainable", correct: false, feedback: "Incorrect! Vague marketing slogans are not evidence. Always request verifiable technical data." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "The Requisition Filter: Need, Reuse & Refurbish",
    minutes: 4,
    content: "Apply the 'Need vs. Want' filter to eliminate unneeded purchases before quotes are even requested.",
    blocks: [
      { id: "sp2-h1", type: "heading", position: 1, headingText: "Starting with Need, Not the Product" },
      { id: "sp2-t1", type: "short_text", position: 2, bodyText: "The most sustainable product is the one you do not need to buy. Before raising a purchase requisition, apply the 4-step filter:" },
      {
        id: "sp2-k1",
        type: "key_message",
        position: 3,
        headingText: "The 4-Step Requisition Filter",
        bodyText: "1. ELIMINATE: Is the purchase genuinely essential for core business tasks, or can the process be done digitally/differently?\n2. RE-DEPLOY: Does another department or storage room have unused surplus equipment that can be transferred?\n3. REPAIR: Can the existing item be serviced or repaired by authorized maintenance for a fraction of the cost?\n4. PURCHASE RESPONSIBLY: If buying is necessary, specify durability, energy efficiency, and low packaging."
      },
      {
        id: "sp2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Office equipment requisition scenario:",
        decisionPrompt: "A team leader wants to buy 10 new desktop monitors because 'some old ones look slightly dusty'. What is the responsible purchasing action?",
        decisionChoices: [
          { label: "Inspect the monitors: clean them, test screen performance, and only replace units that are technically defective or unrepairable", correct: true, feedback: "Spot on! Replacing working equipment for cosmetic reasons creates unnecessary e-waste and wastes capital." },
          { label: "Approve 10 brand-new monitors and throw the working old ones into the dumpster", correct: false, feedback: "Severe waste! Discarding functional electronic equipment violates sustainable asset management." },
          { label: "Confiscate all computer screens from the team permanently", correct: false, feedback: "Unacceptable. Business productivity and ergonomic standards must be maintained." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Asking Suppliers the Right Questions",
    minutes: 4,
    content: "Equip non-specialist buyers to ask clear, practical supplier questions about lifespan, energy, and packaging.",
    blocks: [
      { id: "sp3-h1", type: "heading", position: 1, headingText: "Simple, Powerful Supplier Inquiries" },
      { id: "sp3-t1", type: "short_text", position: 2, bodyText: "You do not need to be a certified procurement specialist to ask suppliers useful sustainability questions. Focus on practical performance:" },
      {
        id: "sp3-k1",
        type: "key_message",
        position: 3,
        headingText: "Three Core Vendor Questions",
        bodyText: "• Lifespan & Warranty: 'What is the expected operating life, and do you supply spare parts and local maintenance support in Mauritius?'\n• Energy/Resource Efficiency: 'What is the certified energy rating (e.g. Energy Star) or power draw in active vs standby mode?'\n• Packaging & Returnability: 'Can you deliver with minimal bulk packaging and take back pallets/empty containers upon delivery?'"
      }
    ]
  },
  {
    order: 3,
    title: "Spotting Greenwashing in Product Quotes",
    minutes: 4,
    content: "Recognize vague environmental buzzwords and insist on verifiable technical documentation.",
    blocks: [
      { id: "sp4-h1", type: "heading", position: 1, headingText: "Buzzwords vs Technical Evidence" },
      { id: "sp4-t1", type: "short_text", position: 2, bodyText: "Suppliers frequently use unregulated marketing buzzwords like 'eco-friendly', 'green technology', or 'earth-safe'. Non-specialist buyers must look past the buzzwords." },
      {
        id: "sp4-k1",
        type: "key_message",
        position: 3,
        headingText: "Evidence Checklist",
        bodyText: "• VAGUE (Reject): 'Eco-friendly cleaning solution', 'green computer monitor', 'environmentally safe plastic'.\n• VERIFIED (Accept): 'Formula certified 95% readily biodegradable under OECD 301B test standards', 'EPEAT Gold certified monitor', '100% post-consumer recycled paper with FSC certification'."
      }
    ]
  },
  {
    order: 4,
    title: "Authority Limits, Conflicts of Interest & Ethics",
    minutes: 4,
    content: "Navigate financial delegation limits, vendor gifts, and transparent conflict disclosures.",
    blocks: [
      { id: "sp5-h1", type: "heading", position: 1, headingText: "Purchasing Ethics for Requesters" },
      { id: "sp5-t1", type: "short_text", position: 2, bodyText: "When requesting or approving purchases on company funds, strict ethical standards apply:" },
      {
        id: "sp5-k1",
        type: "key_message",
        position: 3,
        headingText: "Key Ethical Rules",
        bodyText: "• Follow Approval Limits: Never split a single large purchase into multiple smaller invoices to bypass manager approval thresholds.\n• Zero Supplier Gifts: Never accept personal gifts, cash discounts, or favors from suppliers in exchange for awarding business.\n• Declare Connections: If a bidding supplier is owned by a family member or friend, declare it immediately and recuse yourself from the purchase decision."
      }
    ]
  },
  {
    order: 5,
    title: "Your Responsible Purchasing Commitment",
    minutes: 3,
    content: "Select practical commitments to practice responsible purchasing in your daily work.",
    blocks: [
      { id: "sp6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "sp6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Sustainable Purchasing for Non-Specialists! Select the commitments below relevant to your role." },
      {
        id: "sp6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your responsible purchasing commitments (choose at least one):",
        commitmentOptions: [
          { value: "check-need-first", label: "Always verify genuine need and check internal surplus before requesting new purchases", description: "Avoid unnecessary material consumption and budget waste." },
          { value: "compare-whole-life", label: "Evaluate energy efficiency, warranty, and durability alongside invoice price", description: "Lower total cost of ownership across the product lifespan." },
          { value: "ask-supplier-evidence", label: "Request technical data sheets and certifications for green marketing claims", description: "Ensure the organization buys genuinely sustainable products." },
          { value: "request-minimal-packaging", label: "Ask suppliers for minimal, recyclable, or returnable delivery packaging", description: "Cut packaging waste at the source." },
          { value: "uphold-purchasing-ethics", label: "Follow approval limits and declare conflicts of interest transparently", description: "Preserve corporate integrity and procurement compliance." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the primary difference between evaluating a purchase solely on 'invoice price' versus 'whole-life value'?",
    options: [
      "Whole-life value evaluates initial purchase price PLUS operating energy/water costs, durability, maintenance, consumables, and disposal over the product's lifespan",
      "Invoice price includes all future electricity bills for the next 50 years",
      "Whole-life value applies only to buying residential houses, not workplace supplies",
      "There is no difference; lowest purchase price is always the most sustainable option"
    ],
    correct: 0,
    correctExplanation: "Whole-life value accounts for operational running costs, durability, and maintenance, preventing cheap but inefficient purchases.",
    incorrectExplanation: "Incorrect. Whole-life value evaluates total ownership costs across an item's operational life, not just initial invoice price."
  },
  {
    order: 2,
    question: "What is the very first step an employee should take before raising a purchase requisition for new office equipment?",
    options: [
      "Apply the 'Need vs. Want' filter: verify genuine operational need, check if surplus items exist internally, and consider repair of existing assets",
      "Order 50 units immediately from the first website found online",
      "Ask the supplier to deliver a free sample to their personal home address",
      "Throw all existing equipment into the garbage bin"
    ],
    correct: 0,
    correctExplanation: "Verifying actual operational necessity and redeploying internal surplus prevents unneeded purchases and saves capital.",
    incorrectExplanation: "Incorrect. Checking genuine need and internal surplus is the foundational first step before buying."
  },
  {
    order: 3,
    question: "A supplier quotation describes an industrial cleaning product as '100% Natural, Green & Eco-Friendly' but includes no technical data sheet or ingredient list. What should the buyer do?",
    options: [
      "Request the formal Safety Data Sheet (SDS) and independent laboratory biodegradable certification before evaluating the product",
      "Approve the purchase immediately because '100% natural' is legally certified everywhere",
      "Refuse to clean the facility ever again",
      "Pour the cleaning product into the ocean to test if fish like it"
    ],
    correct: 0,
    correctExplanation: "Vague marketing slogans are not proof. Responsible purchasing requires technical data sheets and verified test standards.",
    incorrectExplanation: "Incorrect. Vague green claims must be substantiated with verified technical documentation and safety sheets."
  },
  {
    order: 4,
    question: "Which of the following is a practical, verifiable question to ask an electronics supplier during a purchasing inquiry?",
    options: [
      "'What is the certified energy rating (e.g. Energy Star), expected operating lifespan, and local warranty/spare parts availability in Mauritius?'",
      "'Can you guarantee that this computer was made with magic dust?'",
      "'Will this monitor make our employees work 24 hours a day without sleeping?'",
      "'Is this product completely free of any physical matter?'"
    ],
    correct: 0,
    correctExplanation: "Asking about certified energy ratings, lifespan, and local spare parts verifies durability and operating efficiency.",
    incorrectExplanation: "Incorrect. Specific questions about energy ratings, warranties, and spare parts provide actionable comparison data."
  },
  {
    order: 5,
    question: "Why is 'splitting' a large purchase requisition into four smaller purchase orders to stay under a manager's approval limit a severe governance violation?",
    options: [
      "It intentionally bypasses dual-authorization financial internal controls and constitutes fraudulent procurement circumvention",
      "It creates four separate paper invoices that look aesthetically pleasing",
      "It is recommended by international procurement standards to speed up delivery",
      "It reduces the supplier's corporate tax rate automatically"
    ],
    correct: 0,
    correctExplanation: "Splitting purchase orders to evade authorization thresholds violates financial controls and is a serious compliance breach.",
    incorrectExplanation: "Incorrect. Order splitting intentionally evades internal financial controls and is strictly prohibited."
  },
  {
    order: 6,
    question: "A supplier offering office furniture promises to deliver an expensive luxury coffee machine directly to the requester's home address as a 'thank you gift' if their quote is selected. What must the requester do?",
    options: [
      "Refuse the personal gift immediately, log the incident in the company gift register, and notify procurement/management",
      "Accept the coffee machine quietly and award the contract to that supplier",
      "Ask for a matching microwave and toaster before signing the contract",
      "Take the coffee machine to work and hide it in their personal locker"
    ],
    correct: 0,
    correctExplanation: "Personal gifts offered in exchange for commercial business are improper inducements (bribes). They must be rejected and reported.",
    incorrectExplanation: "Incorrect. Accepting personal gifts in exchange for purchasing decisions violates anti-bribery laws and corporate ethics."
  },
  {
    order: 7,
    question: "When purchasing packaged items or bulk consumables, what packaging instruction should the requester specify to the vendor?",
    options: [
      "Request bulk packaging in reusable or returnable crates/pallets with minimal single-use plastic wrap",
      "Demand that every individual pencil be wrapped in three layers of plastic bubble wrap",
      "Require the vendor to deliver products in single-use styrofoam boxes",
      "Insist that packaging be burned in the company parking lot upon delivery"
    ],
    correct: 0,
    correctExplanation: "Specifying bulk, recyclable, or vendor-returnable packaging eliminates secondary waste before it enters the facility.",
    incorrectExplanation: "Incorrect. Requesting minimal or returnable packaging prevents massive secondary waste generation."
  },
  {
    order: 8,
    question: "What is the primary difference between this course (ELH-05: Sustainable Purchasing for Non-Specialists) and ELH-26 (Sustainability for Procurement Teams)?",
    options: [
      "ELH-05 teaches general employees how to make responsible daily requisitions and ask basic vendor questions; ELH-26 teaches procurement specialists advanced supplier auditing, tenders, and ISO 20400 contract governance",
      "ELH-05 applies only to buying food, while ELH-26 applies only to buying vehicles",
      "There is no difference; both courses contain the exact same text",
      "ELH-05 is written in French while ELH-26 is written in Spanish"
    ],
    correct: 0,
    correctExplanation: "ELH-05 focuses on responsible requisitioning for all staff; ELH-26 provides specialized commercial governance for professional buyers.",
    incorrectExplanation: "Incorrect. ELH-05 targets general employee requisitioning, while ELH-26 governs specialist procurement processes and supplier audits."
  },
  {
    order: 9,
    question: "How does purchasing energy-efficient appliances with automatic sleep modes benefit an organisation's operational budget?",
    options: [
      "It lowers monthly electricity utility bills continuously over the entire 5–10 year operating life of the equipment, far outweighing minor upfront price differences",
      "It eliminates the need for the organisation to pay employee salaries",
      "It generates free gasoline for company delivery vans",
      "It allows computers to run without being connected to any power source"
    ],
    correct: 0,
    correctExplanation: "Energy savings accumulate over thousands of operating hours, typically saving multiples of the initial purchase price difference.",
    incorrectExplanation: "Incorrect. Ongoing energy efficiency delivers continuous operational savings that dwarf minor initial price differences."
  },
  {
    order: 10,
    question: "What should an employee do if they realize a bidding supplier is owned by their spouse or close relative?",
    options: [
      "Disclose the relationship in writing in the company conflict of interest register and recuse themselves from evaluating or approving the purchase",
      "Keep the relationship secret and approve the quote immediately",
      "Demand a 50% discount from the relative and approve the invoice",
      "Delete all purchase records from the company accounting software"
    ],
    correct: 0,
    correctExplanation: "Transparent disclosure and recusal protect procurement integrity and prevent accusations of financial favoritism.",
    incorrectExplanation: "Incorrect. Undisclosed conflicts violate corporate governance. Transparent disclosure and recusal are mandatory."
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Sustainable Procurement course content and v3 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v3 seed detected for Course 5. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "green-office-practices"))
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
          version: 3,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 3 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Sustainable Procurement course v3 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Sustainable Procurement course seeding");
    throw err;
  }
}
