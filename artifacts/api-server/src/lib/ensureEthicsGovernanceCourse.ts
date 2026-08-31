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

const COURSE_ID = 32;
const COURSE_SLUG = "ethics-governance-and-responsible-business";
const COURSE_TITLE = "Ethics, Governance & Responsible Business";
const BADGE_SLUG = "responsible-business-practitioner";
const SEED_NAME = "ethics-governance-and-responsible-business-v2";

const COURSE_META = {
  courseCode: "ELH-32",
  description:
    "Learn how an organisation makes responsible decisions, manages conflicts of interest, prevents bribery and greenwashing, maintains audit-ready records, and upholds corporate governance.",
  fullDescription:
    "This course provides employees, managers, and corporate officers with a comprehensive, practical guide to the Governance (G) pillar of ESG. Explore the mechanics of accountable decision-making, master conflict-of-interest declaration registers, implement anti-bribery and gift thresholds, maintain audit-ready financial and operational records, prevent fraudulent record alterations, protect confidential data, and utilize safe whistleblower escalation channels.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Applied Workplace Practice",
  isFeatured: false,
  thumbnailUrl: "/images/courses/ethics-and-governance.jpg",
  intendedRoles: [
    "All employees",
    "Department managers, supervisors, and team leads",
    "Finance, accounting, and internal audit staff",
    "Procurement, purchasing, and sales teams",
    "Executive assistants, legal, and compliance liaisons"
  ],
  learningObjectives: [
    "Define the Governance (G) pillar of ESG in plain workplace language, connecting high-level oversight to daily operational integrity.",
    "Identify personal and commercial conflicts of interest and execute transparent disclosure and recusal procedures.",
    "Apply anti-bribery and hospitality thresholds, distinguishing lawful courtesy from improper inducement.",
    "Maintain audit-ready operational, financial, and environmental records, rejecting document alteration shortcuts.",
    "Navigate confidential information boundaries and proprietary business data protection.",
    "Utilize structured whistleblower protection channels to report serious non-compliance safely."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "Congratulations on completing Ethics, Governance & Responsible Business! You are now prepared to uphold transparent business conduct, manage conflicts of interest, protect data integrity, and lead with ethical accountability.",
  badgeName: "Responsible Business Practitioner",
  badgeDescription:
    "Awarded for demonstrating practical understanding of workplace ethics, governance controls, conflict-of-interest disclosure, and transparent business conduct."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "The Pressure to Cut Corners: Governance in Daily Decisions",
    minutes: 4,
    content: "Understand why corporate governance lives in everyday operational integrity and record-keeping.",
    blocks: [
      { id: "eg1-h1", type: "heading", position: 1, headingText: "Governance: How Responsible Organisations Make Decisions" },
      { id: "eg1-t1", type: "short_text", position: 2, bodyText: "At a commercial facilities management hub, an internal ISO audit is scheduled for tomorrow. A team member discovers that a mandatory environmental inspection certificate expired last week and suggests: 'Just change the expiry date on the PDF to next month—nobody is going to call the lab to check.' While framed as a quick fix to save the team from an audit finding, altering the document is forgery, breaches company ethics, and creates severe legal liability." },
      {
        id: "eg1-k1",
        type: "key_message",
        position: 3,
        headingText: "Governance Lives in Daily Choices",
        bodyText: "• Environmental: What is our impact on the planet?\n• Social: How do we treat and impact people?\n• Governance: How do we make decisions, follow rules, maintain honest records, and ensure the business is run with accountability and transparency?"
      },
      {
        id: "eg1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Audit shortcut scenario:",
        decisionPrompt: "A colleague asks you to sign off on a completed safety equipment inspection log that you did not personally witness, saying: 'We know the machines are fine and we need the paperwork signed for the auditor today.' What should you do?",
        decisionChoices: [
          { label: "Refuse to sign unverified records; arrange for an immediate inspection or report the pending status transparently to the auditor", correct: true, feedback: "Correct! Falsifying inspection records is a severe compliance violation that destroys trust and exposes the organisation to catastrophic safety and legal penalties." },
          { label: "Sign the log immediately to make the audit go smoothly", correct: false, feedback: "Incorrect and illegal! Never sign off on unperformed safety checks." },
          { label: "Delete the entire inspection record database to hide the issue", correct: false, feedback: "Severe misconduct! Destroying evidence violates corporate governance and criminal law." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Conflict of Interest: Recognition & Disclosure Protocols",
    minutes: 4,
    content: "Identify personal, financial, and family conflicts of interest and apply transparent disclosure and recusal.",
    blocks: [
      { id: "eg2-h1", type: "heading", position: 1, headingText: "What Is a Conflict of Interest?" },
      { id: "eg2-t1", type: "short_text", position: 2, bodyText: "A conflict of interest occurs when an employee's personal, family, or financial interests could compromise—or appear to compromise—their professional judgement and loyalty to the business." },
      {
        id: "eg2-k1",
        type: "key_message",
        position: 3,
        headingText: "Having a Conflict Is Not a Crime; Hiding It Is",
        bodyText: "Having a family member bid on a contract or owning shares in a supplier is not automatically illegal. The ethical violation occurs when the relationship is concealed. Transparent disclosure allows management to manage the conflict and recuse the employee from decision-making."
      },
      {
        id: "eg2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Vendor selection conflict scenario:",
        decisionPrompt: "You are on a 3-person committee evaluating commercial catering tenders for the corporate cafeteria. You realize one of the bidding companies is owned by your first cousin. What is the required governance action?",
        decisionChoices: [
          { label: "Declare the family relationship immediately in writing in the conflict of interest register and recuse yourself from evaluating and scoring that tender", correct: true, feedback: "Spot on! Formal disclosure and recusal protect both your personal professional reputation and the legal validity of the tender process." },
          { label: "Say nothing and secretly score your cousin's company with the highest possible marks", correct: false, feedback: "Severe ethical breach! Undisclosed bias in procurement constitutes commercial favoritism and fraud." },
          { label: "Disqualify your cousin's company immediately without telling anyone why", correct: false, feedback: "Incorrect. You must disclose the connection to the committee; fair evaluation can proceed with an independent replacement evaluator." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Anti-Bribery, Gifts & Hospitality Thresholds",
    minutes: 4,
    content: "Distinguish legitimate commercial hospitality from improper inducements, kickbacks, and corruption.",
    blocks: [
      { id: "eg3-h1", type: "heading", position: 1, headingText: "Gifts, Favors & Bribery Prevention" },
      { id: "eg3-t1", type: "short_text", position: 2, bodyText: "Bribery is the offering, giving, receiving, or soliciting of anything of value to improperly influence a business decision. Gifts and entertainment must never create an obligation or appear to influence commercial outcomes." },
      {
        id: "eg3-k1",
        type: "key_message",
        position: 3,
        headingText: "Three Rules for Gifts and Hospitality",
        bodyText: "1. Nominal Value Only: Modest promotional items (pens, calendars) or routine working lunches are acceptable if permitted by company policy.\n2. No Gifts During Active Tenders: Absolutely zero gifts, entertainment, or sponsorships may be accepted from vendors participating in an open bid or contract renewal.\n3. Gift Register Logging: All gifts exceeding the policy threshold (e.g., luxury hampers, event tickets) must be logged in the company gift register and either shared or declined."
      }
    ]
  },
  {
    order: 3,
    title: "Record Integrity, Audit Trails & Whistleblower Safety",
    minutes: 4,
    content: "Maintain auditable records, protect company confidentiality, and navigate protected whistleblower channels.",
    blocks: [
      { id: "eg4-h1", type: "heading", position: 1, headingText: "Transparent Record-Keeping and Speaking Up" },
      { id: "eg4-t1", type: "short_text", position: 2, bodyText: "Accurate financial entries, meter logs, waste transfer notes, and HR records are the backbone of corporate governance. Falsifying figures undermines investor confidence and invites statutory fines." },
      {
        id: "eg4-k1",
        type: "key_message",
        position: 3,
        headingText: "Whistleblower Protection",
        bodyText: "When an employee witnesses systemic financial fraud, safety cover-ups, or executive corruption that cannot be resolved through line management, they have access to protected, confidential whistleblower reporting channels without fear of termination or career retaliation."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Personal Integrity vs Board Oversight",
    minutes: 4,
    content: "Differentiate personal compliance responsibilities from board-level governance oversight.",
    blocks: [
      { id: "eg5-h1", type: "heading", position: 1, headingText: "Governance Roles and Boundaries" },
      { id: "eg5-t1", type: "short_text", position: 2, bodyText: "Effective corporate governance requires alignment between top-level board structures and frontline employee actions." },
      {
        id: "eg5-k1",
        type: "key_message",
        position: 3,
        headingText: "Who Does What?",
        bodyText: "• Board & Executive: Set ethical codes, establish internal control frameworks, provide independent audit oversight, and ensure legal compliance.\n• Individual Employees: Accurately log operational data, disclose conflicts of interest, decline improper gifts, protect confidential business records, and speak up about non-compliance."
      }
    ]
  },
  {
    order: 5,
    title: "Your Workplace Ethics & Governance Commitment",
    minutes: 3,
    content: "Select practical commitments to maintain integrity, transparency, and accountability in your daily role.",
    blocks: [
      { id: "eg6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "eg6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Ethics, Governance & Responsible Business! Select the commitments below relevant to your role." },
      {
        id: "eg6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your workplace ethics commitments (choose at least one):",
        commitmentOptions: [
          { value: "maintain-record-integrity", label: "Never alter, backdate, or falsify operational, financial, or safety records", description: "Preserve truthfulness and audit-ready data." },
          { value: "disclose-conflicts", label: "Promptly disclose personal, family, or financial connections in the conflict register", description: "Ensure transparent, fair commercial decisions." },
          { value: "refuse-improper-gifts", label: "Decline or log gifts and hospitality according to company thresholds", description: "Prevent conflicts of interest and perceived bias." },
          { value: "protect-confidentiality", label: "Protect proprietary business data, customer records, and employee information", description: "Prevent data breaches and maintain stakeholder trust." },
          { value: "speak-up-on-misconduct", label: "Use appropriate escalation or whistleblower channels when witnessing severe ethical violations", description: "Protect organizational integrity and legal compliance." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the primary role of the Governance (G) pillar of ESG in corporate management?",
    options: [
      "Ensuring the organisation makes decisions transparently, adheres to ethical standards, maintains accurate records, and enforces accountability controls",
      "Ensuring that the company pays zero taxes to municipal and national governments",
      "Designing decorative logos for the company's annual calendar",
      "Managing the temperature settings of the office air conditioning units"
    ],
    correct: 0,
    correctExplanation: "Governance establishes the rules, leadership accountability, internal controls, and ethical standards that guide an organization.",
    incorrectExplanation: "Incorrect. Governance defines decision-making integrity, oversight systems, and legal/ethical accountability."
  },
  {
    order: 2,
    question: "An employee is evaluating vendor bids for a major software contract and realizes that one bidding company is owned by their brother. What is the required governance action?",
    options: [
      "Disclose the relationship in writing in the company conflict of interest register and recuse themselves from scoring or deciding that tender",
      "Say nothing and award the contract to the brother to keep business in the family",
      "Disqualify the brother's company without explanation to avoid questions",
      "Ask the brother to pay them a private cash bonus if they win the contract"
    ],
    correct: 0,
    correctExplanation: "Conflicts of interest must be disclosed transparently; recusal ensures the tender is evaluated fairly and objectively.",
    incorrectExplanation: "Incorrect. Undisclosed conflicts violate procurement ethics. Written disclosure and recusal are mandatory."
  },
  {
    order: 3,
    question: "A contractor bidding for a lucrative multi-year maintenance contract sends an expensive luxury smartphone and weekend resort vouchers to the procurement manager during the tender evaluation period. What should the manager do?",
    options: [
      "Refuse and return the gifts immediately, log the incident in the company gift register, and notify the compliance officer",
      "Accept the gifts quietly and give the contractor the tender scoring sheet in advance",
      "Keep the smartphone but decline the resort vouchers",
      "Raffle the smartphone off among family members without telling anyone"
    ],
    correct: 0,
    correctExplanation: "Accepting luxury gifts during an active procurement process is an improper inducement (bribery). Gifts must be refused and logged.",
    incorrectExplanation: "Incorrect. Accepting gifts during tenders breaches anti-bribery policies and compromises tender integrity."
  },
  {
    order: 4,
    question: "Prior to an annual external financial audit, a manager discovers an invoicing typo that made last month's operational expenses appear 10% lower. What is the correct ethical response?",
    options: [
      "Correct the calculation transparently in the ledger and provide the documented correction to accounting and the auditor",
      "Leave the typo uncorrected because it makes the department look more profitable",
      "Delete the entire expense ledger file to avoid showing the mistake",
      "Blame the error on an intern who left the company six months ago"
    ],
    correct: 0,
    correctExplanation: "Record integrity requires honest, transparent corrections with clear audit trails rather than concealing errors.",
    incorrectExplanation: "Incorrect. Honest corrections preserve financial integrity; hiding known errors constitutes fraudulent reporting."
  },
  {
    order: 5,
    question: "Why is 'backdating' or altering the date on an expired safety or environmental compliance certificate a serious legal violation?",
    options: [
      "It constitutes document forgery, misleads regulators and auditors, and hides real operational safety risks from management",
      "It is perfectly legal as long as the supervisor approves it verbally",
      "It improves the visual aesthetics of the company archive file",
      "It reduces the paper consumption of the facilities department"
    ],
    correct: 0,
    correctExplanation: "Altering dates on regulatory records is document fraud that creates severe legal liabilities and jeopardizes safety.",
    incorrectExplanation: "Incorrect. Falsifying or backdating compliance documents is illegal and severely damages corporate credibility."
  },
  {
    order: 6,
    question: "What is the primary function of an enterprise whistleblower reporting channel?",
    options: [
      "To allow employees to report serious misconduct, fraud, or safety violations confidentially without fear of retaliation",
      "To submit anonymous complaints about colleagues' lunch food choices",
      "To bypass all internal managers for routine daily vacation requests",
      "To publish internal salary lists on public social media websites"
    ],
    correct: 0,
    correctExplanation: "Whistleblower mechanisms protect workers who report illegal, dangerous, or unethical practices from employer retaliation.",
    incorrectExplanation: "Incorrect. Whistleblower channels exist to investigate severe misconduct while safeguarding the reporting individual."
  },
  {
    order: 7,
    question: "How should an employee handle sensitive commercial information, such as upcoming tender pricing or unannounced product launches?",
    options: [
      "Maintain strict confidentiality, share it only with authorized colleagues on a need-to-know basis, and store files securely",
      "Post the tender pricing on public online forums to get feedback from strangers",
      "Email the file to competitor companies to see if they can match the price",
      "Print 50 copies and leave them on the reception coffee table"
    ],
    correct: 0,
    correctExplanation: "Confidentiality protects competitive advantage, intellectual property, and compliance with non-disclosure obligations.",
    incorrectExplanation: "Incorrect. Proprietary business data must be kept confidential and shared only with authorized personnel."
  },
  {
    order: 8,
    question: "Which of the following describes an ethical workplace shortcut that is actually an unacceptable governance failure?",
    options: [
      "Bypassing dual-authorization financial payment sign-offs to pay an unverified supplier faster",
      "Using keyboard shortcuts to format an Excel financial spreadsheet faster",
      "Switching off your computer screen before leaving for lunch",
      "Walking up the stairs instead of waiting for the elevator"
    ],
    correct: 0,
    correctExplanation: "Bypassing financial and operational internal controls removes essential fraud protections, exposing the firm to theft and errors.",
    incorrectExplanation: "Incorrect. Bypassing mandatory sign-offs compromises internal financial controls and risk governance."
  },
  {
    order: 9,
    question: "What is the difference between individual ethical responsibility and board-level governance oversight?",
    options: [
      "The Board sets codes, policies, and independent audit oversight; individual employees apply honesty, accurate record-keeping, and policy adherence in daily tasks",
      "The Board is responsible for all ethics, meaning individual employees have zero personal accountability",
      "Individual employees make all national laws, while the Board executes marketing campaigns",
      "There is no difference; only board directors are legally required to be honest"
    ],
    correct: 0,
    correctExplanation: "Governance requires both top-down structural oversight and bottom-up individual compliance and integrity.",
    incorrectExplanation: "Incorrect. Effective governance connects board-level frameworks with daily frontline employee adherence."
  },
  {
    order: 10,
    question: "Why does strong corporate governance protect an organization from catastrophic business failure?",
    options: [
      "It prevents fraud and corruption, ensures regulatory compliance, builds investor trust, and creates an open culture where risks are caught early",
      "It eliminates the need for the company to have paying customers",
      "It guarantees that the company will never face market competition",
      "It makes the business exempt from all international trade tariffs"
    ],
    correct: 0,
    correctExplanation: "Sound governance systems detect operational risks, prevent legal penalties, safeguard shareholder assets, and sustain long-term resilience.",
    incorrectExplanation: "Incorrect. Governance systems prevent fraud, protect reputation, and ensure transparent, resilient operations."
  }
];

export async function ensureEthicsGovernanceCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 32 by ID 32 or slug
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
        throw new Error("Course 32 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Ethics Governance course content and v2 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course 32. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "esg-data-measurement-and-reporting-basics"))
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
          icon: "shield",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 32,
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

      logger.info({ courseId, slug: COURSE_SLUG }, "Ethics, Governance & Responsible Business course v2 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Ethics, Governance & Responsible Business course seeding");
    throw err;
  }
}
