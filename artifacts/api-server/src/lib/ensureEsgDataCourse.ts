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

const COURSE_ID = 33;
const COURSE_SLUG = "esg-data-measurement-and-reporting-basics";
const COURSE_TITLE = "ESG Data, Measurement & Reporting Basics";
const BADGE_SLUG = "esg-data-awareness";
const SEED_NAME = "esg-data-measurement-and-reporting-basics-v2";

const COURSE_META = {
  courseCode: "ELH-33",
  description:
    "Understand how organisations measure ESG performance, determine material topics, navigate external reporting standards (GRI, ISSB), and produce audit-ready sustainability disclosures.",
  fullDescription:
    "Building on foundational ESG literacy, this course introduces the principles of corporate ESG measurement, external reporting frameworks, and public disclosure governance. Designed for professionals across finance, administration, operations, and compliance, it covers financial vs. double materiality, reporting boundaries, core frameworks (GRI standards, IFRS S1/S2 sustainability and climate disclosures), assurance levels, and the critical link between internal evidence and published sustainability statements.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Applied Workplace Practice",
  isFeatured: false,
  thumbnailUrl: "/images/courses/esg-data-measurement.jpg",
  intendedRoles: [
    "All employees",
    "Finance, accounting, and reporting analysts",
    "Sustainability coordinators and ESG working group members",
    "Operations, HR, and compliance managers",
    "Executive assistants and departmental liaisons"
  ],
  learningObjectives: [
    "Define corporate ESG reporting and explain why investors, banks, and regulators require standardized disclosures.",
    "Explain the concept of materiality, distinguishing financial materiality from impact (double) materiality.",
    "Identify major international ESG reporting frameworks, including the Global Reporting Initiative (GRI) and ISSB (IFRS S1 and S2).",
    "Define reporting boundaries (equity share, operational control) and understand how data consolidation occurs.",
    "Differentiate internal operational data collection from external verified disclosure with third-party assurance.",
    "Complete 10 scenario-based assessment questions evaluating reporting boundaries, materiality, and published evidence."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "Congratulations on completing ESG Data, Measurement & Reporting Basics! You now understand the frameworks, materiality principles, and evidence standards that underpin credible corporate sustainability disclosures.",
  badgeName: "ESG Reporting Practitioner",
  badgeDescription:
    "Awarded for demonstrating practical understanding of corporate ESG measurement, materiality principles, reporting frameworks, and disclosure governance."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "From Raw Data to External Trust: Why ESG Reporting Matters",
    minutes: 4,
    content: "Understand why investors, lenders, and regulators demand standardized corporate ESG disclosures.",
    blocks: [
      { id: "ed1-h1", type: "heading", position: 1, headingText: "The Rise of Corporate ESG Disclosures" },
      { id: "ed1-t1", type: "short_text", position: 2, bodyText: "In modern corporate governance, a company's financial balance sheet tells only part of its story. Commercial banks evaluating loan risk, institutional investors allocating capital, enterprise customers issuing supply chain tenders, and regulatory authorities all require transparent, standardized disclosures on how an organization manages environmental risks, treats its workforce, and governs its operations." },
      {
        id: "ed1-k1",
        type: "key_message",
        position: 3,
        headingText: "Why Standardization is Essential",
        bodyText: "Without standardized reporting rules, companies could selectively highlight positive stories while concealing toxic waste, high accident rates, or executive conflicts of interest. Standardized ESG frameworks ensure performance metrics are comparable, verifiable, and complete across industries."
      },
      {
        id: "ed1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Investor ESG disclosure scenario:",
        decisionPrompt: "A commercial bank asks an enterprise loan applicant for its verified Scope 1 and Scope 2 emissions data. The marketing manager drafts a response stating: 'We are an eco-friendly green leader with a deep love for nature.' How should the finance and reporting lead respond?",
        decisionChoices: [
          { label: "Reject the marketing statement and provide the verified GHG calculation report showing audited kWh consumption, generator fuel litres, and calculated metric tonnes of CO2e", correct: true, feedback: "Correct! Financial institutions and rating agencies require structured, quantified, audit-ready data backed by primary evidence, not vague marketing slogans." },
          { label: "Approve the marketing statement because positive emotional words inspire banker confidence", correct: false, feedback: "Incorrect. Vague unquantified statements are rejected by financial analysts and flag potential greenwashing." },
          { label: "Refuse to answer because corporate banks have no right to ask about electricity use", correct: false, feedback: "Incorrect. Climate and resource metrics are standard components of modern credit risk underwriting." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Materiality: Financial vs Double Materiality",
    minutes: 4,
    content: "Learn how companies determine which ESG topics are significant enough to measure and report.",
    blocks: [
      { id: "ed2-h1", type: "heading", position: 1, headingText: "What Is 'Materiality' in ESG?" },
      { id: "ed2-t1", type: "short_text", position: 2, bodyText: "An organization cannot report on every single detail of its operations. Materiality is the filtering process used to identify the environmental, social, and governance issues that matter most to the business and its stakeholders." },
      {
        id: "ed2-k1",
        type: "key_message",
        position: 3,
        headingText: "Financial Materiality vs Double Materiality",
        bodyText: "• Financial Materiality (Single Materiality / ISSB): Focuses on how sustainability risks (e.g. rising sea levels flooding coastal resorts, carbon taxes on fuel) affect the company's financial cash flow and enterprise value.\n• Impact Materiality (GRI): Focuses on how the company's operations impact the external environment, economy, and society (e.g. factory effluent polluting local coral reefs).\n• Double Materiality (CSRD / Modern Standards): Integrates both perspectives—reporting both how external sustainability trends affect the company financially AND how the company impacts the wider world."
      },
      {
        id: "ed2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Materiality assessment scenario:",
        decisionPrompt: "A software development firm with 50 office employees is conducting an ESG materiality assessment. The committee is deciding whether to focus primarily on data privacy/security and employee well-being, versus industrial chemical effluent management. What is the correct priority?",
        decisionChoices: [
          { label: "Prioritize customer data privacy, cybersecurity, and tech workforce retention, as these represent the software firm's most material operational risks and impacts", correct: true, feedback: "Spot on! Materiality requires reporting on topics where the specific business has significant impacts or dependencies. Software firms have high data privacy risks and virtually zero industrial chemical effluent." },
          { label: "Focus 100% of their ESG report on heavy chemical effluent to look like a manufacturing plant", correct: false, feedback: "Incorrect. Reporting on immaterial topics while ignoring core sector risks (data security) violates reporting standards." },
          { label: "Pick the easiest 3 topics from an internet search at random", correct: false, feedback: "Incorrect. Materiality must be based on structured stakeholder and operational impact analysis." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Major ESG Reporting Frameworks: GRI & ISSB Standards",
    minutes: 4,
    content: "Demystify the leading global disclosure standards and understand their core objectives.",
    blocks: [
      { id: "ed3-h1", type: "heading", position: 1, headingText: "Navigating Global Reporting Standards" },
      { id: "ed3-t1", type: "short_text", position: 2, bodyText: "Two dominant international framework systems shape modern corporate ESG disclosures:" },
      {
        id: "ed3-k1",
        type: "key_message",
        position: 3,
        headingText: "GRI and ISSB Overview",
        bodyText: "• Global Reporting Initiative (GRI): The world's most widely adopted multi-stakeholder standard for sustainability reporting. Focuses on broad stakeholder impact across environmental, social, and economic topics.\n• International Sustainability Standards Board (ISSB / IFRS): Established by the IFRS Foundation to create a global baseline for capital markets:\n  - IFRS S1: General Requirements for Disclosure of Sustainability-related Financial Information.\n  - IFRS S2: Climate-related Disclosures (governance, strategy, risk management, Scope 1–3 emissions metrics and targets)."
      }
    ]
  },
  {
    order: 3,
    title: "Reporting Boundaries, Consolidation & Audit Assurance",
    minutes: 4,
    content: "Understand organisational boundaries, baseline years, and the difference between limited and reasonable assurance.",
    blocks: [
      { id: "ed4-h1", type: "heading", position: 1, headingText: "Establishing the Reporting Boundary" },
      { id: "ed4-t1", type: "short_text", position: 2, bodyText: "Before publishing data, an organization must define its organizational boundary (e.g., operational control: do we report emissions for all facilities where we control daily operations, or only properties we 100% own?)." },
      {
        id: "ed4-k1",
        type: "key_message",
        position: 3,
        headingText: "Third-Party Audit Assurance",
        bodyText: "Just as financial statements are audited by certified accounting firms, corporate sustainability reports undergo independent third-party assurance to verify that published metrics are supported by verifiable primary evidence."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Internal Data Collection vs External Disclosure",
    minutes: 4,
    content: "Differentiate operational data logging (ELH-18) from external corporate reporting governance (ELH-33).",
    blocks: [
      { id: "ed5-h1", type: "heading", position: 1, headingText: "Connecting Daily Data to the Annual Report" },
      { id: "ed5-t1", type: "short_text", position: 2, bodyText: "A credible annual ESG report is only as strong as the day-to-day records collected across departments." },
      {
        id: "ed5-k1",
        type: "key_message",
        position: 3,
        headingText: "The Evidence Chain",
        bodyText: "1. Operational Level (ELH-18): Frontline teams log utility meters, save fuel invoices, record safety incident logs, and maintain exact units.\n2. Management Level (ELH-33): ESG and finance teams consolidate departmental data, apply approved emission factors, conduct materiality reviews, and prepare disclosures aligned with GRI or IFRS S1/S2.\n3. Governance Level: The Board of Directors reviews and approves the published report, and external auditors verify the underlying evidence trail."
      }
    ]
  },
  {
    order: 5,
    title: "Your Workplace ESG Reporting Literacy Commitment",
    minutes: 3,
    content: "Select practical commitments to support transparent, auditable corporate sustainability reporting.",
    blocks: [
      { id: "ed6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "ed6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing ESG Data, Measurement & Reporting Basics! Select the commitments below relevant to your role." },
      {
        id: "ed6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your ESG reporting commitments (choose at least one):",
        commitmentOptions: [
          { value: "support-evidence-trails", label: "Ensure all departmental data submitted for ESG reporting is supported by verifiable primary records", description: "Maintain audit readiness across operational records." },
          { value: "understand-materiality", label: "Focus departmental sustainability initiatives on high-materiality operational risks", description: "Drive resources toward high-impact priorities." },
          { value: "align-with-standards", label: "Promote alignment with recognized frameworks (GRI, ISSB) in corporate disclosures", description: "Ensure credibility and international comparability." },
          { value: "prevent-greenwashing", label: "Ensure public sustainability statements are backed by audited evidence before publication", description: "Protect corporate reputation and investor trust." },
          { value: "champion-data-accuracy", label: "Treat non-financial ESG metrics with the same accuracy and rigor as financial accounting data", description: "Elevate sustainability governance across the enterprise." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the primary purpose of standardized corporate ESG reporting?",
    options: [
      "To provide transparent, comparable, and verifiable data on an organization's sustainability risks, impacts, and governance for investors, lenders, and regulators",
      "To generate decorative marketing brochures that distract from financial losses",
      "To replace all financial accounting and corporate tax filings with environmental essays",
      "To guarantee that a company will never face regulatory scrutiny"
    ],
    correct: 0,
    correctExplanation: "Standardized ESG disclosures ensure sustainability metrics are credible, audit-ready, and comparable across industries for investors and stakeholders.",
    incorrectExplanation: "Incorrect. ESG reporting provides standardized, verifiable performance data for capital markets and stakeholders."
  },
  {
    order: 2,
    question: "In ESG reporting terminology, what is 'Financial Materiality' (as emphasized by the ISSB / IFRS sustainability standards)?",
    options: [
      "Sustainability topics and climate risks that could reasonably be expected to affect an enterprise's cash flows, cost of capital, and financial valuation",
      "The amount of cash an organization spends on office recycling bins",
      "A rule stating that only profitable companies are required to have safety policies",
      "The total market value of decorative gold certificates awarded to staff"
    ],
    correct: 0,
    correctExplanation: "Financial materiality examines how outside environmental and social risks impact the organization's enterprise value and financial viability.",
    incorrectExplanation: "Incorrect. Financial materiality focuses on sustainability risks and opportunities that impact enterprise cash flows and valuation."
  },
  {
    order: 3,
    question: "What is 'Double Materiality' in contemporary sustainability frameworks (such as the European CSRD)?",
    options: [
      "Evaluating both how sustainability issues financially impact the company (outside-in) AND how the company's activities impact society and the planet (inside-out)",
      "Reporting every single operational metric twice in the same report",
      "Doubling the size of the font on all corporate environmental statements",
      "Paying double salaries to employees who work in the sustainability department"
    ],
    correct: 0,
    correctExplanation: "Double materiality combines financial materiality (financial risk to company) with impact materiality (company impact on environment and people).",
    incorrectExplanation: "Incorrect. Double materiality integrates both financial impact on the firm and operational impact on the wider world."
  },
  {
    order: 4,
    question: "What is the primary role of the Global Reporting Initiative (GRI) standards?",
    options: [
      "To provide the world's most widely used multi-stakeholder standard for reporting an organization's material impacts on the economy, environment, and society",
      "To provide legal defense lawyers for corporations facing environmental fines",
      "To manage municipal water filtration infrastructure in Europe",
      "To issue speeding tickets to commercial delivery drivers"
    ],
    correct: 0,
    correctExplanation: "GRI is the leading global standard focused on transparent multi-stakeholder disclosure of corporate environmental and social impacts.",
    incorrectExplanation: "Incorrect. GRI provides standardized multi-stakeholder reporting guidelines for corporate sustainability impacts."
  },
  {
    order: 5,
    question: "What is the core focus of the IFRS S2 standard issued by the International Sustainability Standards Board (ISSB)?",
    options: [
      "Climate-related financial disclosures across governance, strategy, risk management, and metrics/targets (including Scope 1–3 emissions)",
      "Standardizing the physical dimensions of office copy paper",
      "Regulating international air traffic flight routes",
      "Setting mandatory retail prices for solar panels"
    ],
    correct: 0,
    correctExplanation: "IFRS S2 establishes a global baseline for capital markets to evaluate corporate climate resilience, risks, and greenhouse gas metrics.",
    incorrectExplanation: "Incorrect. IFRS S2 governs climate-related financial disclosures and emissions metric reporting for capital markets."
  },
  {
    order: 6,
    question: "Why must a company clearly define its 'Organizational Reporting Boundary' (e.g. operational control vs equity share) before publishing ESG data?",
    options: [
      "To establish exactly which subsidiaries, leased facilities, and joint ventures are included in consolidated metrics, preventing double-counting or selective cherry-picking",
      "To draw physical boundary fences around all company parking lots",
      "To prevent employees from viewing the company's website from home",
      "To ensure that competitors are legally prohibited from measuring their own emissions"
    ],
    correct: 0,
    correctExplanation: "Clear boundary definitions ensure consolidated sustainability figures are mathematically consistent, transparent, and auditable.",
    incorrectExplanation: "Incorrect. Organizational boundaries establish which entities and facilities are covered by the reported metrics."
  },
  {
    order: 7,
    question: "What does 'Third-Party Assurance' mean for a published corporate sustainability report?",
    options: [
      "An independent, qualified auditing firm reviews the underlying primary evidence, calculation methodologies, and internal controls to verify that published metrics are accurate",
      "The company's CEO promises on social media that all numbers are completely real",
      "The marketing agency guarantees that the report cover design looks attractive",
      "A government official stamps the report without reading the numbers"
    ],
    correct: 0,
    correctExplanation: "Third-party assurance provides independent verification that reported non-financial data is accurate, auditable, and free from material misstatement.",
    incorrectExplanation: "Incorrect. Third-party assurance is independent professional verification of data accuracy and reporting evidence."
  },
  {
    order: 8,
    question: "What is the fundamental connection between frontline operational data collection (ELH-18) and executive ESG disclosures (ELH-33)?",
    options: [
      "Frontline primary records (meter logs, fuel bills, accident reports) form the verifiable evidence base that roll up into published board disclosures",
      "Frontline workers write the annual report by hand, while executives take utility meter readings",
      "There is zero connection; published reports use fictional numbers while operations uses real numbers",
      "Frontline workers are legally prohibited from knowing what ESG stands for"
    ],
    correct: 0,
    correctExplanation: "Corporate disclosure integrity depends directly on the accuracy and provenance of primary operational records collected across daily business units.",
    incorrectExplanation: "Incorrect. Published ESG disclosures are consolidated directly from underlying operational evidence and primary data."
  },
  {
    order: 9,
    question: "A company publishes an ESG report claiming a '40% reduction in workplace carbon emissions', but audit testing reveals they achieved this simply by excluding three major manufacturing factories from this year's boundary. What is this practice called?",
    options: [
      "Deceptive boundary manipulation and greenwashing, which violates international reporting standards and invites regulatory sanctions",
      "An innovative accounting technique recommended by international banks",
      "A legal tax minimization strategy",
      "Standard best practice for corporate annual reporting"
    ],
    correct: 0,
    correctExplanation: "Manipulating reporting boundaries to make performance look better without operational reduction is misleading greenwashing.",
    incorrectExplanation: "Incorrect. Changing boundaries to artificially mask emissions violates disclosure integrity and constitutes greenwashing."
  },
  {
    order: 10,
    question: "Why are non-financial ESG metrics increasingly treated with the same governance rigor and internal controls as financial balance sheets?",
    options: [
      "Because ESG performance directly influences credit ratings, borrowing costs, regulatory compliance, investor capital, and brand reputation",
      "Because environmental metrics are legally required to be written in gold ink",
      "Because financial accounting will be completely abolished worldwide next year",
      "Because computers can only calculate environmental numbers"
    ],
    correct: 0,
    correctExplanation: "Non-financial ESG metrics represent material business risks and opportunities that capital markets, insurers, and regulators scrutinize alongside financial returns.",
    incorrectExplanation: "Incorrect. ESG metrics are critical to valuation, credit risk, regulatory compliance, and long-term enterprise survival."
  }
];

export async function ensureEsgDataCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 33 by ID 33 or slug
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
        throw new Error("Course 33 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "ESG Data & Reporting course content and v2 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course 33. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "esg-in-my-job-from-policy-to-everyday-action"))
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
          icon: "database",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 33,
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

      logger.info({ courseId, slug: COURSE_SLUG }, "ESG Data, Measurement & Reporting Basics course v2 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure ESG Data, Measurement & Reporting Basics course seeding");
    throw err;
  }
}
