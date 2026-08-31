import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  systemSeedsTable,
  coursePrerequisitesTable,
  quizAttemptsTable,
  lessonProgressTable,
} from "@workspace/db";
import { eq, and, inArray } from "drizzle-orm";
import { logger } from "./logger";

const COURSE_SLUG = "sustainability-for-sales-and-marketing-teams";
const COURSE_TITLE = "Sustainability for Sales and Marketing Teams";
const BADGE_SLUG = "credible-sustainability-communicator";
const BADGE_CODE = "COURSE_ELH_28_COMPLETE";
const SEED_NAME = "sustainability-for-sales-and-marketing-teams-v3";

const COURSE_META = {
  courseCode: "ELH-28",
  description: "Learn how to communicate sustainability accurately, use approved evidence, avoid misleading green claims, and escalate claims requiring specialist or legal review.",
  fullDescription: "Learn how to communicate sustainability accurately, use approved evidence, avoid misleading green claims, and escalate claims requiring specialist or legal review without independently inventing, calculating, or approving technical environmental claims.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "0.00",
  level: "Applied Workplace Practice",
  isFeatured: false,
  thumbnailUrl: "/images/courses/sustainability-for-sales-and-marketing-teams.jpg",
  intendedRoles: [
    "Sales employees",
    "Marketing employees",
    "Communications employees",
    "Business-development employees",
    "Customer-service employees",
    "Social-media coordinators",
    "Brand and content employees",
    "Account managers",
    "Managers approving customer-facing sustainability messages"
  ],
  learningObjectives: [
    "Distinguish approved environmental facts from vague, absolute, or unverified marketing claims.",
    "Clarify sales & marketing boundaries vs technical data owners, legal counsel, and executive approvers.",
    "Apply the 7-stage Credible Claim Development Framework from evidence verification to publication.",
    "Structure claims with visible qualifications, material scope limits, and appropriate evidence dates.",
    "Respond accurately to customer sustainability questionnaires and tender inquiries using approved source registers.",
    "Manage claim updates, version control, and rapid correction/withdrawal when operational facts change."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage: "You have completed Sustainability for Sales and Marketing Teams. You can now communicate sustainability accurately, use approved evidence, and maintain customer trust through credible claim management.",
  badgeName: "Credible Sustainability Communicator",
  badgeDescription: "Awarded for demonstrating practical understanding of how to communicate sustainability accurately, use approved evidence, and maintain customer trust through credible claim management.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Opening Workplace Hook: The Overstated Tender Claim",
    minutes: 3,
    content: "Examine a sales tender proposal claiming '100% eco-friendly services' and 'zero-waste operations' based on incomplete evidence.",
    blocks: [
      {
        id: "c28-l1-b1",
        type: "heading",
        headingText: "Opening Workplace Hook: The Overstated Tender Claim"
      },
      {
        id: "c28-l1-b2",
        type: "short_text",
        bodyText: "A sales team prepares a commercial proposal for a major enterprise client. The draft proposal headline states:\n• '100% Eco-Friendly Commercial Services'\n• 'Zero-Waste Operations'\n• 'Carbon-Neutral Delivery Fleet'\n• 'Fully Sustainable Materials'\n\nHowever, a marketing compliance review reveals:\n• Only 1 packaging box is made of recyclable material.\n• The 'carbon-neutral' claim relies on 1 month of unverified fuel logs.\n• The 'zero-waste' claim is a future 2030 target, not an achieved reality.\n• The proposal deadline is in 3 hours.\n\nThis hook demonstrates that attractive sales copy cannot replace verified evidence and formal sign-off."
      },
      {
        id: "c28-l1-b3",
        type: "key_message",
        headingText: "Commercial Insight",
        bodyText: "Sales and marketing add value by translating approved technical evidence into clear messages—never by converting future targets into current guarantees."
      },
      {
        id: "c28-l1-d1",
        type: "decision_scenario",
        decisionIntro: "Tender deadline green claim dilemma:",
        decisionPrompt: "With 2 hours before an enterprise RFP submission deadline, an account executive wants to claim: 'Our entire delivery fleet is 100% green and zero-emission.' In reality, the company has 2 electric vans out of a fleet of 20 diesel vehicles. How should marketing adjust the proposal?",
        decisionChoices: [
          { label: "Revise the claim to state the exact verified fact: 'Operating 2 electric delivery vans in urban routes, with a phased fleet transition plan aiming for 50% electrification by 2028'", correct: true, feedback: "Correct! Stating exact verified facts with clear scope limits protects credibility, complies with advertising standards, and demonstrates authentic progress without misleading evaluators." },
          { label: "Keep the '100% zero-emission' claim because the client will never audit vehicle registrations", correct: false, feedback: "Severe legal and reputational risk! Misrepresenting fleet emissions in commercial bids invites contract termination and disqualification." },
          { label: "Delete the entire proposal and withdraw from the tender", correct: false, feedback: "Incorrect. Accurate, transparent claims win tenders without needing exaggerated slogans." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Why Credible Claims Matter: Personal, Business, and Trust Value",
    minutes: 3,
    content: "Understand why accurate sustainability claims build customer trust, protect brand reputation, and win commercial tenders.",
    blocks: [
      {
        id: "c28-l2-b1",
        type: "heading",
        headingText: "Why Credible Claims Matter"
      },
      {
        id: "c28-l2-b2",
        type: "short_text",
        bodyText: "Accurate communication protects both commercial success and brand integrity:\n• Personal & Role Value: Sales staff gain confidence answering customer inquiries without guessing or risking credibility.\n• Business Value: Evidence-backed proposals win commercial tenders and protect against greenwashing lawsuits or brand damage.\n• Environmental Value: Honest communication directs customer purchasing toward genuinely superior environmental products."
      }
    ]
  },
  {
    order: 2,
    title: "Role Boundaries: Sales/Marketing vs Technical & Legal Owners",
    minutes: 3,
    content: "Define functional boundaries between marketing copy drafting, technical verification, and legal sign-off.",
    blocks: [
      {
        id: "c28-l3-b1",
        type: "heading",
        headingText: "Sales & Marketing Boundary Matrix"
      },
      {
        id: "c28-l3-b2",
        type: "short_text",
        bodyText: "Sales and marketing communicate approved facts; they do not calculate or certify technical claims.\n\nBoundary Matrix:\n• Sales/Marketing Owns: Copy drafting from approved registers, channel selection, qualifications visibility, and version control.\n• Technical/HSE Owns: Carbon calculations, energy metrics, waste data verification, and product ingredient testing.\n• Legal/Compliance Owns: Certification mark usage, regulatory risk review, and comparative advertising approvals."
      },
      {
        id: "c28-l3-d1",
        type: "decision_scenario",
        decisionIntro: "Marketing brochure claim review dilemma:",
        decisionPrompt: "A graphic designer creates a product brochure with a prominent green leaf banner stating: '100% Natural & Chemical-Free Cleaner'. When you check with the technical chemist, the product contains standard biodegradable surfactants and water. What should marketing do under ISO 14021 standards?",
        decisionChoices: [
          { label: "Remove 'Chemical-Free' (water is a chemical) and replace the vague claim with specific, verified attributes (e.g., 'Plant-derived surfactants, 98% biodegradable formula, zero added artificial phosphates')", correct: true, feedback: "Spot on! ISO 14021 prohibits vague, non-specific claims like 'chemical-free' or '100% natural'. Specific, substantiated ingredient characteristics are legally compliant and credible." },
          { label: "Publish the brochure unchanged because the green leaf logo looks attractive", correct: false, feedback: "Severe regulatory risk! 'Chemical-free' is scientifically impossible and considered deceptive advertising by consumer protection bodies." },
          { label: "Claim the cleaning product cures illnesses", correct: false, feedback: "Severe legal breach! Commercial marketing must never make fraudulent claims." }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "Plain-Language Green Claims Vocabulary",
    minutes: 3,
    content: "Master core terms: Greenwashing, ISO 14021, Substantiation, and Life-Cycle Scope.",
    blocks: [
      {
        id: "c28-l4-b1",
        type: "heading",
        headingText: "Core Green Claims Concepts"
      },
      {
        id: "c28-l4-b2",
        type: "short_text",
        bodyText: "• Greenwashing: Making misleading, unsubstantiated, or exaggerated environmental claims about a product, service, or company.\n• ISO 14021: International standard governing self-declared environmental claims (prohibits non-specific terms like 'green', 'environmentally friendly', or 'sustainable' without clear qualification).\n• Substantiation: Verifiable primary evidence (lab reports, meter data, third-party certificates) supporting a public statement.\n• Scope Qualification: Stating clearly whether a claim applies to the product, the packaging, or the entire manufacturing process."
      }
    ]
  },
  {
    order: 4,
    title: "The 7-Stage Credible Claim Framework",
    minutes: 3,
    content: "Walk through the seven steps from evidence intake to publication and version maintenance.",
    blocks: [
      {
        id: "c28-l5-b1",
        type: "heading",
        headingText: "The 7-Stage Framework"
      },
      {
        id: "c28-l5-b2",
        type: "short_text",
        bodyText: "1. Intake: Identify the specific product/service attribute.\n2. Evidence Verification: Obtain primary documentation from technical/HSE leads.\n3. Scope Definition: Define exact boundaries (e.g. 'packaging only').\n4. Draft Qualification: Write clear, non-absolute language with dates.\n5. Formal Approvals: Secure sign-off from technical and legal/compliance.\n6. Publication & Linking: Publish claim with visible QR code/link to methodology.\n7. Version Control: Archive obsolete claims and update when operational metrics change."
      },
      {
        id: "c28-l5-d1",
        type: "decision_scenario",
        decisionIntro: "Client sustainability RFP questionnaire dilemma:",
        decisionPrompt: "An enterprise client sends a 50-question ESG tender questionnaire. Question 24 asks: 'What percentage of your packaging is certified compostable in municipal facilities?' The sales representative is unsure. What is the required protocol?",
        decisionChoices: [
          { label: "Consult the approved company ESG Source Register or request verified packaging specifications from procurement before answering", correct: true, feedback: "Outstanding! Sales teams must never guess answers on binding commercial questionnaires. Using verified source registers protects commercial integrity." },
          { label: "Answer '100% compostable everywhere' to ensure the company gets the highest tender score", correct: false, feedback: "Severe commercial fraud! Misrepresenting specifications on tender questionnaires leads to contract cancellation and legal liability." },
          { label: "Leave the entire questionnaire blank and refuse to submit the tender", correct: false, feedback: "Incorrect. Coordinate with internal specialists to provide accurate, verified responses." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Step-by-Step Sales & Marketing Roadmap",
    minutes: 3,
    content: "Implement practical tools: the Green Claims Register, RFP response library, and version update routines.",
    blocks: [
      {
        id: "c28-l6-b1",
        type: "heading",
        headingText: "Four-Step Commercial Implementation Roadmap"
      },
      {
        id: "c28-l6-b2",
        type: "short_text",
        bodyText: "• Step 1: Approved Claims Library: Create a centralized database of pre-approved, evidence-backed statements for sales pitches.\n• Step 2: Mandatory Qualification Review: Ensure every marketing deck includes scope boundaries and date baselines.\n• Step 3: Fast-Track Escalation: Establish a 24-hour SLA with technical leads for tender questionnaires.\n• Step 4: Annual Audit: Review all active brochures, websites, and sales decks to retire outdated claims."
      }
    ]
  }
];

const NEW_QUIZ_QUESTIONS = [
  {
    question: "What is the primary boundary of sales and marketing teams regarding workplace sustainability?",
    options: [
      { text: "Sales and marketing communicate approved facts accurately using verifiable evidence registers, but do not independently calculate, invent, or certify technical claims.", isCorrect: true },
      { text: "Sales and marketing have full legal authority to invent any environmental claim needed to win a contract.", isCorrect: false },
      { text: "Sales and marketing are prohibited from ever speaking with customers about environmental matters.", isCorrect: false },
      { text: "Marketing teams must personally perform laboratory chemical analysis on all products.", isCorrect: false }
    ],
    correctExplanation: "Marketing translates approved, verified evidence into clear messaging; technical calculation and certification remain with specialist teams.",
    incorrectExplanation: "Incorrect. Sales and marketing communicate approved evidence, but technical verification belongs to specialized leads."
  },
  {
    question: "A hotel replaces single-use plastic toiletry bottles with refillable dispensers in guest bathrooms. Which marketing statement is factually accurate and compliant with ISO 14021?",
    options: [
      { text: "'Refillable ceramic bathroom amenities installed, reducing single-use plastic bottle consumption across guest rooms.'", isCorrect: true },
      { text: "'Our hotel is now 100% Eco-Friendly and produces zero environmental footprint.'", isCorrect: false },
      { text: "'Completely Carbon-Free Luxury Vacation Guaranteed.'", isCorrect: false },
      { text: "'The world's first totally pollution-free hotel.'", isCorrect: false }
    ],
    correctExplanation: "Specific, qualified statements describing exact operational improvements are truthful and compliant; absolute claims ('100% Eco-Friendly') are misleading greenwashing.",
    incorrectExplanation: "Incorrect. Vague, absolute claims violate ISO 14021 standards; specific factual descriptions are required."
  },
  {
    question: "According to ISO 14021:2016 and ICC advertising standards, why is a vague claim like 'eco-friendly' or 'green product' unacceptable without qualification?",
    options: [
      { text: "Broad, unqualified claims are non-specific, convey an unsubstantiated absolute benefit, and mislead consumers by concealing material trade-offs.", isCorrect: true },
      { text: "The color green is copyrighted by the international forestry commission.", isCorrect: false },
      { text: "Advertising standards require all marketing copy to be written in Latin.", isCorrect: false },
      { text: "Environmental terms are allowed only in private personal emails.", isCorrect: false }
    ],
    correctExplanation: "Unqualified claims mislead consumers into believing a product has zero environmental impact across its entire lifecycle.",
    incorrectExplanation: "Incorrect. Vague slogans mislead consumers; claims must be specific, qualified, and substantiated."
  },
  {
    question: "When completing an enterprise client's sustainability RFP questionnaire, what must the sales team do if an answer is not in the approved company register?",
    options: [
      { text: "Escalate the question to the technical, procurement, or ESG lead to obtain verified data before responding.", isCorrect: true },
      { text: "Guess an optimistic answer so the company achieves a high evaluation score.", isCorrect: false },
      { text: "Copy the response from a competitor's public marketing brochure.", isCorrect: false },
      { text: "Answer 'Yes to everything' and delete the client's question log.", isCorrect: false }
    ],
    correctExplanation: "Tender questionnaires form binding contract representations; unverified guesses expose the company to contract cancellation and fraud claims.",
    incorrectExplanation: "Incorrect. Sales teams must never guess on binding commercial tender documents; internal escalation is required."
  },
  {
    question: "What is the critical difference between an achieved sustainability performance metric and an aspirational future target?",
    options: [
      { text: "An achieved metric is supported by verified historical data; an aspirational target is a future goal that must be clearly labelled as 'Target for 2030'.", isCorrect: true },
      { text: "Future targets can be advertised as current achievements as long as the CEO has signed the target document.", isCorrect: false },
      { text: "Achieved metrics apply only to competitors, while targets apply to your company.", isCorrect: false },
      { text: "There is no difference; all targets become facts as soon as they are announced on social media.", isCorrect: false }
    ],
    correctExplanation: "Presenting a future aspirational target as a currently achieved reality is a textbook form of greenwashing.",
    incorrectExplanation: "Incorrect. Future targets must be clearly distinguished from verified past achievements."
  },
  {
    question: "What is 'Scope Qualification' when drafting an environmental marketing claim for a packaged consumer good?",
    options: [
      { text: "Clearly specifying whether the claim applies to the product formula, the packaging container, or the manufacturing facility.", isCorrect: true },
      { text: "Printing the claim in the largest possible font on the back of the box.", isCorrect: false },
      { text: "Ensuring the product is sold exclusively in tropical countries.", isCorrect: false },
      { text: "Limiting product sales to customers who have university degrees.", isCorrect: false }
    ],
    correctExplanation: "Scope qualification clarifies boundaries (e.g. '100% recycled bottle, excluding cap') so consumers are not misled about the whole product.",
    incorrectExplanation: "Incorrect. Scope qualification defines exactly which component of the product or packaging the claim covers."
  },
  {
    question: "Why should marketing and sales materials reference verifiable source links or QR codes leading to published methodologies?",
    options: [
      { text: "It provides transparency, allows stakeholders to review underlying calculation evidence, and builds commercial credibility.", isCorrect: true },
      { text: "QR codes are legally required to replace all company telephone numbers.", isCorrect: false },
      { text: "It prevents competitors from reading the marketing brochure.", isCorrect: false },
      { text: "It guarantees that the product will never be returned by customers.", isCorrect: false }
    ],
    correctExplanation: "Transparent access to methodology and evidence validates marketing integrity and withstands regulatory scrutiny.",
    incorrectExplanation: "Incorrect. Providing direct links to evidence methodologies builds trust and prevents greenwashing accusations."
  },
  {
    question: "What should a marketing team do if an operational change means a previously published sustainability claim is no longer accurate?",
    options: [
      { text: "Promptly retire and update marketing materials across digital and print channels to reflect current operational reality.", isCorrect: true },
      { text: "Continue distributing the outdated materials until all 50,000 printed copies are exhausted.", isCorrect: false },
      { text: "Deny that the operational change ever occurred.", isCorrect: false },
      { text: "Sue the operational team for ruining the marketing campaign.", isCorrect: false }
    ],
    correctExplanation: "Version control and rapid withdrawal of obsolete claims are essential to protect brand integrity and prevent deceptive marketing.",
    incorrectExplanation: "Incorrect. Continuing to distribute false or outdated claims constitutes deceptive advertising."
  }
];

export async function ensureSustainabilityForSalesAndMarketingTeamsCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      let [course] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.slug, COURSE_SLUG))
        .limit(1);

      if (!course) {
        const [byId] = await tx
          .select()
          .from(coursesTable)
          .where(eq(coursesTable.courseCode, COURSE_META.courseCode))
          .limit(1);
        course = byId ?? null;
      }

      if (!course) {
        logger.info({ slug: COURSE_SLUG }, "Course not found. Seeding course...");
        const [newCourse] = await tx
          .insert(coursesTable)
          .values({
            courseCode: COURSE_META.courseCode,
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
            completionMessage: COURSE_META.completionMessage,
            badgeName: COURSE_META.badgeName,
            badgeDescription: COURSE_META.badgeDescription,
            isPublished: true,
            status: "published",
            updatedAt: new Date()
          })
          .returning();
        course = newCourse;
      } else {
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
            completionMessage: COURSE_META.completionMessage,
            badgeName: COURSE_META.badgeName,
            badgeDescription: COURSE_META.badgeDescription,
            isPublished: true,
            status: "published",
            updatedAt: new Date()
          })
          .where(eq(coursesTable.id, course.id));
      }

      const actualCourseId = course.id;

      // Seed/re-seed lessons with exact position block arrays
      await tx.delete(lessonsTable).where(eq(lessonsTable.courseId, actualCourseId));
      for (const newLesson of NEW_LESSONS) {
        await tx.insert(lessonsTable).values({
          courseId: actualCourseId,
          title: newLesson.title,
          orderIndex: newLesson.order,
          durationMinutes: newLesson.minutes,
          content: newLesson.content,
          contentBlocks: newLesson.blocks,
          isArchived: false,
        });
      }

      // Seed/re-seed quiz questions
      await tx.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, actualCourseId));
      for (const [index, q] of NEW_QUIZ_QUESTIONS.entries()) {
        const correctOptionIndex = q.options.findIndex((o) => o.isCorrect);
        await tx.insert(quizQuestionsTable).values({
          courseId: actualCourseId,
          question: q.question,
          options: q.options.map((o) => o.text),
          correctOption: correctOptionIndex >= 0 ? correctOptionIndex : 0,
          orderIndex: index,
          correctExplanation: q.correctExplanation,
          incorrectExplanation: q.incorrectExplanation,
          optionFeedback: q.options.map((o) =>
            o.isCorrect ? q.correctExplanation : q.incorrectExplanation
          ),
          isArchived: false,
        });
      }

      // Idempotently seed badge
      await tx
        .insert(badgeDefinitionsTable)
        .values({
          slug: BADGE_SLUG,
          code: BADGE_CODE,
          name: COURSE_META.badgeName,
          description: COURSE_META.badgeDescription,
          icon: "bullhorn",
          criteriaType: "course_completion",
          threshold: 1,
          courseIds: [actualCourseId],
          orderIndex: 28,
        })
        .onConflictDoUpdate({
          target: badgeDefinitionsTable.slug,
          set: {
            name: COURSE_META.badgeName,
            description: COURSE_META.badgeDescription,
            courseIds: [actualCourseId],
          },
        });

      // Update seed marker
      const [existingSeed] = await tx
        .select()
        .from(systemSeedsTable)
        .where(eq(systemSeedsTable.name, SEED_NAME))
        .limit(1);

      if (!existingSeed) {
        await tx.insert(systemSeedsTable).values({
          name: SEED_NAME,
          version: 3,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 3 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId: actualCourseId, slug: COURSE_SLUG }, "Sustainability for Sales and Marketing Teams course v3 seed transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, slug: COURSE_SLUG }, "Failed to ensure Sustainability for Sales and Marketing Teams course seeding");
    throw err;
  }
}
