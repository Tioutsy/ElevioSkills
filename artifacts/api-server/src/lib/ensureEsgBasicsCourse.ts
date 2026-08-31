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

const COURSE_ID = 9;
const COURSE_SLUG = "esg-basics";
const COURSE_TITLE = "ESG Basics";
const BADGE_SLUG = "esg-fundamentals";
const SEED_NAME = "esg-basics-v4";

const COURSE_META = {
  courseCode: "ELH-09",
  description:
    "Master Environmental, Social, and Governance (ESG) fundamentals, understand the E, S, and G pillars with practical workplace scenarios, and learn how everyday actions contribute to responsible business performance.",
  fullDescription:
    "Designed for employees across all departments with zero prior ESG knowledge, this foundation course demystifies Environmental, Social, and Governance (ESG) principles. Discover why investors, customers, and regulators evaluate ESG performance, distinguish how E, S, and G manifest in everyday operations, navigate realistic Mauritian commercial workplace scenarios, and understand the connection between corporate strategy and daily individual responsibility.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/esg-basics.jpg",
  intendedRoles: [
    "All employees across all departments",
    "New hires during onboarding",
    "Team leads, supervisors, and department managers",
    "Green team members and sustainability champions"
  ],
  learningObjectives: [
    "Explain what ESG stands for and define Environmental, Social, and Governance in plain workplace language.",
    "Distinguish Environmental (E), Social (S), and Governance (G) pillars using realistic workplace examples.",
    "Understand why banks, investors, clients, and regulators evaluate ESG performance alongside financial profits.",
    "Differentiate broader Sustainability (the overarching vision) from ESG (the structured management and reporting framework).",
    "Recognize how individual employee decisions in daily routines support corporate ESG performance.",
    "Complete 10 scenario-based assessment questions requiring practical ESG classification and ethical decisions."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "Congratulations on completing ESG Basics! Remember the core formula: Environmental = impact on planet, Social = impact on people, Governance = how responsibly the company is run. ESG becomes real through the decisions you and your colleagues make every day.",
  badgeName: "ESG Foundations",
  badgeDescription:
    "Awarded for demonstrating practical workplace ESG awareness, understanding the E, S, G pillars, and supporting responsible corporate practices."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "What Is ESG & Why Does It Matter?",
    minutes: 4,
    content: "Understand what ESG stands for, why modern businesses prioritize it, and how ESG relates to sustainability.",
    blocks: [
      { id: "esg1-h1", type: "heading", position: 1, headingText: "Welcome to ESG Basics" },
      { id: "esg1-t1", type: "short_text", position: 2, bodyText: "Imagine a busy Monday morning at work. The lights and air conditioning turn on, deliveries arrive at reception, staff collaborate on projects, customer orders are processed, and financial invoices are approved. Behind every single one of these routine operations lie decisions that impact the natural environment, human well-being, and corporate integrity. These three interconnected pillars form ESG." },
      {
        id: "esg1-k1",
        type: "key_message",
        position: 3,
        headingText: "What Does ESG Stand For?",
        bodyText: "• Environmental (E): How an organization impacts the natural planet (energy consumption, water efficiency, carbon emissions, waste recycling, biodiversity, pollution prevention).\n• Social (S): How an organization treats and values people (workplace health & safety, fair wages, training, diversity, customer privacy, contractor welfare, community relations).\n• Governance (G): How an organization makes decisions, maintains accountability, and ensures integrity (anti-bribery, ethics, accurate record-keeping, conflict of interest disclosure, board oversight)."
      },
      {
        id: "esg1-t2",
        type: "short_text",
        position: 4,
        bodyText: "Sustainability vs. ESG:\n• Sustainability is the ultimate goal: meeting the needs of the present without compromising future generations.\n• ESG is the operational and reporting framework: the measurable criteria used by banks, investors, and regulators to assess how responsibly a business operates."
      },
      {
        id: "esg1-d1",
        type: "decision_scenario",
        position: 5,
        decisionIntro: "First impression challenge:",
        decisionPrompt: "A coworker says: 'ESG is just marketing jargon for tree planting and picking up beach litter.' How should you respond?",
        decisionChoices: [
          { label: "Explain that ESG is a comprehensive operational framework covering planet (Environmental), people and safety (Social), and corporate ethics and record-keeping (Governance)", correct: true, feedback: "Spot on! Environmental issues are only one third of ESG; treating people fairly and running the company with integrity are equally critical." },
          { label: "Agree that ESG only applies to tree planting events", correct: false, feedback: "Incorrect. Tree planting is a minor activity; ESG evaluates core business operations across all three pillars." },
          { label: "Say that ESG is a tax penalty that only banks have to pay", correct: false, feedback: "Incorrect. ESG is an operational and management framework for all organizations." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "The Environmental Pillar (E): Impact on the Planet",
    minutes: 4,
    content: "Explore how workplace operations affect natural resources and how employees reduce environmental footprints.",
    blocks: [
      { id: "esg2-h1", type: "heading", position: 1, headingText: "The Environmental Pillar (E)" },
      { id: "esg2-t1", type: "short_text", position: 2, bodyText: "The Environmental pillar evaluates how an enterprise uses natural resources and manages waste and emissions." },
      {
        id: "esg2-k1",
        type: "key_message",
        position: 3,
        headingText: "Everyday Environmental Areas",
        bodyText: "• Energy & Climate: Turning off idle equipment, maintaining 24°C AC setpoints, using renewable energy.\n• Water Stewardship: Reporting leaks immediately, installing aerators, avoiding chemical discharge into storm drains.\n• Waste & Circularity: Segregating paper, cardboard, and plastics, eliminating single-use plastics, donating surplus food.\n• Biodiversity: Protecting coastal mangroves and lagoons, choosing native landscaping, shielding exterior night lights."
      },
      {
        id: "esg2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Environmental action scenario:",
        decisionPrompt: "You walk past a staff washroom at 4:30 PM and see water streaming continuously from a cracked sink pipe onto the floor. What is the correct Environmental action?",
        decisionChoices: [
          { label: "Log an urgent maintenance ticket with facilities immediately or notify the building supervisor so the valve can be isolated before gallons of potable water are wasted", correct: true, feedback: "Correct! Prompt reporting prevents continuous resource loss and water damage." },
          { label: "Ignore it because water belongs to the municipal utility, not the company", correct: false, feedback: "Severe waste! Potable water is a scarce island resource; employees must report leaks promptly." },
          { label: "Close the washroom door and wait until next week to see if it fixes itself", correct: false, feedback: "Incorrect. Leaks worsen over time and cause severe structural damage and resource waste." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "The Social Pillar (S): Impact on People",
    minutes: 4,
    content: "Understand workplace safety, fair treatment, inclusion, customer care, and community relationships.",
    blocks: [
      { id: "esg3-h1", type: "heading", position: 1, headingText: "The Social Pillar (S)" },
      { id: "esg3-t1", type: "short_text", position: 2, bodyText: "The Social pillar evaluates how an organization impacts human beings—inside the company and in the wider community." },
      {
        id: "esg3-k1",
        type: "key_message",
        position: 3,
        headingText: "Everyday Social Areas",
        bodyText: "• Health & Safety: Wearing PPE, adhering to safety protocols, managing worker fatigue, maintaining psychological safety.\n• Fair Treatment & Inclusion: Equal opportunity, zero tolerance for harassment, fair wages, accessible workspaces.\n• Customer Rights & Privacy: Transparent pricing, protecting personal customer data, delivering safe products.\n• Extended Workforce: Ensuring contracted cleaners, security guards, and canteen workers have safe, humane conditions."
      }
    ]
  },
  {
    order: 3,
    title: "The Governance Pillar (G): Accountability & Ethics",
    minutes: 4,
    content: "Examine decision-making integrity, honest record-keeping, anti-bribery, and conflict of interest disclosures.",
    blocks: [
      { id: "esg4-h1", type: "heading", position: 1, headingText: "The Governance Pillar (G)" },
      { id: "esg4-t1", type: "short_text", position: 2, bodyText: "The Governance pillar ensures that an organization is managed responsibly, legally, and ethically." },
      {
        id: "esg4-k1",
        type: "key_message",
        position: 3,
        headingText: "Everyday Governance Areas",
        bodyText: "• Record Integrity: Accurately logging meter readings, hours, and invoices without falsifying or backdating records.\n• Conflicts of Interest: Disclosing personal or family connections with suppliers transparently.\n• Anti-Bribery: Declining improper gifts or inducements from vendors during contract evaluations.\n• Whistleblower Channels: Reporting serious safety, financial, or ethical misconduct through protected escalation channels."
      }
    ]
  },
  {
    order: 4,
    title: "Why ESG Matters to Business: Investors, Customers & Talent",
    minutes: 4,
    content: "Understand why strong ESG performance drives competitive advantage, lower borrowing costs, and talent retention.",
    blocks: [
      { id: "esg5-h1", type: "heading", position: 1, headingText: "The Commercial Value of ESG" },
      { id: "esg5-t1", type: "short_text", position: 2, bodyText: "ESG is not a charitable expense—it is a core business driver that directly impacts corporate resilience:" },
      {
        id: "esg5-k1",
        type: "key_message",
        position: 3,
        headingText: "Four Commercial Benefits",
        bodyText: "1. Access to Capital: Commercial banks offer lower interest rates and favorable financing for companies with strong ESG ratings.\n2. Winning Enterprise Tenders: Major corporate and government clients require verified ESG data from suppliers in RFP bids.\n3. Attracting Top Talent: Professionals choose employers committed to human well-being, equality, and environmental responsibility.\n4. Risk Reduction: Robust governance and safety systems prevent costly industrial accidents, legal penalties, and reputation damage."
      }
    ]
  },
  {
    order: 5,
    title: "Your Daily Workplace ESG Commitment",
    minutes: 3,
    content: "Select practical commitments to support Environmental, Social, and Governance goals in your daily role.",
    blocks: [
      { id: "esg6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "esg6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing ESG Basics! Select the commitments below relevant to your daily routine." },
      {
        id: "esg6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your daily workplace ESG commitments (choose at least one):",
        commitmentOptions: [
          { value: "environmental-habits", label: "Save energy and water, sort waste properly, and report leaks promptly", description: "Support the Environmental (E) pillar." },
          { value: "social-respect-safety", label: "Follow safety rules, wear required PPE, and treat all colleagues with respect", description: "Support the Social (S) pillar." },
          { value: "governance-record-accuracy", label: "Follow policies, record workplace data honestly, and protect confidential information", description: "Support the Governance (G) pillar." },
          { value: "connect-daily-choices", label: "Recognize that everyday operational choices shape our organization's ESG performance", description: "Champion sustainable culture across departments." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What does the acronym 'ESG' stand for in plain workplace language?",
    options: [
      "Environmental, Social, and Governance",
      "Emergency Safety Group for corporate offices",
      "Energy Saving Guarantee for municipal utilities",
      "Executive Strategy Governance for board members only"
    ],
    correct: 0,
    correctExplanation: "ESG stands for Environmental, Social, and Governance—three key dimensions used to measure corporate responsibility.",
    incorrectExplanation: "Incorrect. ESG stands for Environmental, Social, and Governance."
  },
  {
    order: 2,
    question: "Which of the following actions is a direct workplace example of the Environmental (E) pillar?",
    options: [
      "Switching off unused conference room air conditioning and reporting a leaking pipe to facilities",
      "Conducting annual performance appraisals for marketing staff",
      "Drafting an anti-bribery policy for third-party suppliers",
      "Filing corporate tax declarations with national authorities"
    ],
    correct: 0,
    correctExplanation: "Conserving electricity and eliminating water waste directly reduce natural resource consumption under the Environmental pillar.",
    incorrectExplanation: "Incorrect. Energy conservation and water leak reporting belong to the Environmental pillar."
  },
  {
    order: 3,
    question: "Which workplace priority is evaluated under the Social (S) pillar of ESG?",
    options: [
      "Providing certified safety gear (PPE), enforcing rest breaks, and ensuring fair, non-discriminatory treatment for all employees",
      "Calculating the thermal insulation thickness of the roof",
      "Purchasing certified high-voltage circuit breakers",
      "Installing solar water heaters on the cafeteria roof"
    ],
    correct: 0,
    correctExplanation: "Workplace health, safety, employee well-being, fair compensation, and non-discrimination are fundamental Social pillar topics.",
    incorrectExplanation: "Incorrect. Employee safety, fair treatment, and working conditions fall under the Social pillar."
  },
  {
    order: 4,
    question: "How does an individual employee support the Governance (G) pillar in daily work?",
    options: [
      "By recording operational data truthfully, protecting confidential customer information, and disclosing conflicts of interest",
      "By decorating their desk with artificial plastic plants",
      "By turning off the office WiFi network during meetings",
      "By walking to work instead of taking the bus"
    ],
    correct: 0,
    correctExplanation: "Governance relies on honest record-keeping, adherence to policies, confidential data protection, and ethical integrity.",
    incorrectExplanation: "Incorrect. Truthful record-keeping, policy compliance, and ethical conduct support the Governance pillar."
  },
  {
    order: 5,
    question: "What is the key difference between the overarching concept of 'Sustainability' and the framework of 'ESG'?",
    options: [
      "Sustainability is the broad long-term goal of balancing economic, social, and ecological health; ESG is the specific operational and reporting framework used to measure performance",
      "Sustainability applies only to agriculture, while ESG applies only to banks",
      "There is no difference; both terms were invented by social media influencers",
      "Sustainability means spending money, while ESG means saving money"
    ],
    correct: 0,
    correctExplanation: "Sustainability is the long-term vision; ESG provides the structured categories and metrics used to manage and disclose progress.",
    incorrectExplanation: "Incorrect. Sustainability is the overarching goal, while ESG is the practical framework used to measure and evaluate performance."
  },
  {
    order: 6,
    question: "Why do commercial banks and institutional investors evaluate a company's ESG score before approving major loans or investments?",
    options: [
      "Because strong ESG performance indicates lower operational, legal, and environmental risk, protecting the financial viability of the investment",
      "Because international law requires all banks to donate their profits to charity",
      "Because ESG scores determine the physical color of the bank's credit cards",
      "Because companies with high ESG scores are legally exempt from repaying loans"
    ],
    correct: 0,
    correctExplanation: "ESG ratings provide insight into operational risk management, climate resilience, labor stability, and regulatory compliance.",
    incorrectExplanation: "Incorrect. Lenders examine ESG factors to gauge risk management and long-term financial resilience."
  },
  {
    order: 7,
    question: "How does responsible management of third-party contracted workers (like outsourced security guards and cleaners) relate to the Social pillar?",
    options: [
      "Organizations have a duty of care to ensure all workers on their premises have safe conditions, fair rest periods, and access to basic amenities",
      "Contracted workers have zero legal or human rights on commercial premises",
      "Outsourced staff should be forbidden from using company washrooms",
      "Social responsibility applies exclusively to executive directors"
    ],
    correct: 0,
    correctExplanation: "Social responsibility and human rights due diligence extend across the entire extended workforce operating on an organization's site.",
    incorrectExplanation: "Incorrect. Due diligence requires ensuring safe, humane working conditions for all workers on site regardless of contract type."
  },
  {
    order: 8,
    question: "A supervisor tells an employee to falsify the date on an expired safety inspection log to prepare for an auditor visit. Under Governance standards, what should the employee do?",
    options: [
      "Refuse to falsify records; arrange for an immediate genuine inspection and report the true status transparently",
      "Alter the date immediately to ensure the audit report looks perfect",
      "Delete the entire computer file to hide the expired certificate",
      "Blame a former colleague for the expired document"
    ],
    correct: 0,
    correctExplanation: "Governance prohibits document falsification. Maintaining record integrity and transparency preserves corporate legal standing.",
    incorrectExplanation: "Incorrect. Falsifying compliance documents is illegal and a severe governance breach; honest correction is required."
  },
  {
    order: 9,
    question: "Why is ESG not just the responsibility of senior executive leadership?",
    options: [
      "While leadership sets strategic policies, day-to-day ESG performance is realized through the operational actions, safety habits, and integrity of every employee",
      "Executive leaders are legally prohibited from making sustainability decisions",
      "Only frontline employees are allowed to read company policies",
      "Leadership is responsible only for marketing, while employees handle all legal affairs"
    ],
    correct: 0,
    correctExplanation: "ESG policies succeed or fail based on daily frontline implementation: energy conservation, safety compliance, and honest data entry.",
    incorrectExplanation: "Incorrect. Strategy is set by leadership, but ESG outcomes depend on daily choices across the entire workforce."
  },
  {
    order: 10,
    question: "How does robust ESG performance help a commercial enterprise win major client tenders?",
    options: [
      "Major enterprise and multinational clients require verified ESG data from suppliers to meet their own Scope 3 emissions and sustainable supply chain commitments",
      "Clients only award contracts to companies that have the highest number of social media followers",
      "Tenders are decided purely by lucky draw lottery systems",
      "Clients prefer suppliers who refuse to measure their resource consumption"
    ],
    correct: 0,
    correctExplanation: "Enterprise buyers increasingly mandate verified ESG compliance and carbon transparency as baseline qualifying criteria in tenders.",
    incorrectExplanation: "Incorrect. Large buyers require verified supplier ESG data to satisfy their own regulatory and supply chain commitments."
  }
];

export async function ensureEsgBasicsCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 9 by courseCode "ELH-09", slug, or ID
      let course = null;
      
      const [byCode] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, "ELH-09"))
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
        throw new Error("Course 9 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "ESG Basics course content and v4 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v4 seed detected for Course 9. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "environmental-compliance-at-work"))
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
          icon: "layers",
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
          version: 4,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 4 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "ESG Basics course v4 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure ESG Basics course seeding");
    throw err;
  }
}
