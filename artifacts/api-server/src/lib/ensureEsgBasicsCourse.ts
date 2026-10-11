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
  description:
    "Master Environmental, Social, and Governance (ESG) basics, understand the E, S, and G pillars with practical workplace examples, and learn how individual actions contribute to organizational goals.",
  fullDescription:
    "Designed specifically for employees with zero prior ESG knowledge, this course provides a clear, practical introduction to Environmental, Social, and Governance (ESG) principles. Learn what each pillar represents, understand how ESG relates to sustainability, explore realistic Mauritius workplace scenarios, and discover how everyday workplace decisions support responsible business practices.",
  categoryId: 1,
  durationMinutes: 18,
  priceUsd: "1400.00",
  level: "ESG and Compliance",
  isFeatured: false,
  thumbnailUrl: "/images/courses/esg-basics.jpg",
  learningObjectives: [
    "Explain what ESG stands for and define Environmental, Social, and Governance in plain workplace language.",
    "Distinguish Environmental (E), Social (S), and Governance (G) pillars using practical, real-world examples.",
    "Understand the relationship between Sustainability (the goal) and ESG (the framework for management and reporting).",
    "Identify how daily employee actions across various roles contribute to corporate ESG objectives.",
    "Recognize that leadership holds ultimate oversight while all employees support ESG through daily decisions.",
    "Select one practical workplace ESG commitment to practice in your daily work routine."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "Congratulations on completing ESG Basics! Remember the core formula: Environmental = impact on planet, Social = impact on people, Governance = how responsibly the company is run. ESG becomes real through the decisions you and your colleagues make every day.",
  badgeName: "ESG Foundations",
  badgeDescription:
    "Awarded for demonstrating practical workplace ESG awareness, understanding the E, S, G pillars, and supporting responsible corporate practices.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "What is ESG & Why Does It Matter?",
    minutes: 3,
    content: "Understand what ESG stands for, why businesses care about it, and how ESG relates to sustainability.",
    blocks: [
      { id: "esg1-h1", type: "heading", position: 1, headingText: "Welcome to ESG Basics" },
      { id: "esg1-t1", type: "short_text", position: 2, bodyText: "Imagine arriving at work in the morning. Your company switchboard handles client calls, staff prepare reports, facilities manage air conditioning and waste, and HR introduces new team members. Behind every single one of these daily operations lie decisions that affect the environment, people, and how the company is governed. These three areas form ESG." },
      {
        id: "esg1-k1",
        type: "key_message",
        position: 3,
        headingText: "What Does ESG Stand For?",
        bodyText: "• Environmental (E): How a company affects and interacts with the natural planet (energy, water, waste, emissions, resources, biodiversity).\n• Social (S): How a company treats and values people (employee health & safety, fair working conditions, equal treatment, training, customers, communities).\n• Governance (G): How a company is directed, managed, and controlled with ethics, transparency, policies, compliance, and accountability."
      },
      {
        id: "esg1-t2",
        type: "short_text",
        position: 4,
        bodyText: "ESG vs. Sustainability: What is the Difference?\n• Sustainability is the broader goal: creating long-term environmental, social, and economic value responsibly.\n• ESG is the practical framework: the specific categories companies use to measure, manage, and report their environmental, social, and governance performance."
      },
      {
        id: "esg1-d1",
        type: "decision_scenario",
        position: 5,
        decisionIntro: "First Impression Scenario:",
        decisionPrompt: "A colleague says: 'ESG is just another word for tree-planting and recycling.' How should you explain ESG in simple terms?",
        decisionChoices: [
          { label: "Explain that ESG is broader than environmental issues alone—it includes how we treat people (Social) and how responsibly the business is managed (Governance).", correct: true, feedback: "Exactly right! ESG covers Environmental, Social, and Governance factors together." },
          { label: "Agree with your colleague that ESG strictly measures solar panels and recycling bins.", correct: false, feedback: "Incorrect. Environmental sustainability is only one pillar of ESG; Social and Governance are equally essential." },
          { label: "Say that ESG is a complex tax audit that only corporate lawyers need to understand.", correct: false, feedback: "Incorrect. ESG applies to everyday operations across all workplace roles." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Environmental (E): Impact on the Planet",
    minutes: 4,
    content: "Explore how companies affect the natural world and how employees reduce environmental footprints.",
    blocks: [
      { id: "esg2-h1", type: "heading", position: 1, headingText: "The Environmental Pillar (E)" },
      { id: "esg2-t1", type: "short_text", position: 2, bodyText: "The Environmental pillar evaluates how a business impacts the natural environment and manages natural resources. Environmental factors affect every industry, from tech offices to manufacturing and hospitality." },
      {
        id: "esg2-k1",
        type: "key_message",
        position: 3,
        headingText: "Key Environmental Areas & Workplace Examples",
        bodyText: "• Energy: Switching off equipment, optimizing air conditioning, using LED lighting.\n• Water: Fixing leaks promptly, installing efficient taps, avoiding water waste.\n• Waste & Materials: Sorting recyclables, reducing paper printing, eliminating single-use plastics.\n• Emissions & Transport: Optimizing logistics, encouraging remote meetings or shared transport.\n• Resources & Biodiversity: Protecting local ecosystems, choosing eco-certified paper or supplies."
      },
      {
        id: "esg2-w1",
        type: "workplace_example",
        position: 4,
        headingText: "Office & Operations Example",
        bodyText: "An office manager notices monthly energy bills spiking. By adjusting thermostat settings by 2°C, setting computer displays to auto-sleep, and replacing old fixtures with LEDs, the facility reduces power consumption by 15% without impacting comfort."
      }
    ]
  },
  {
    order: 2,
    title: "Social (S): Impact on People",
    minutes: 4,
    content: "Learn how the Social pillar focuses on employee safety, fair treatment, training, and community care.",
    blocks: [
      { id: "esg3-h1", type: "heading", position: 1, headingText: "The Social Pillar (S)" },
      { id: "esg3-t1", type: "short_text", position: 2, bodyText: "The Social pillar focuses on people—how an organization treats its employees, customers, suppliers, and the broader community. A business cannot thrive long-term if its workforce is unsafe, mistreated, or ignored." },
      {
        id: "esg3-k1",
        type: "key_message",
        position: 3,
        headingText: "Key Social Areas & Workplace Examples",
        bodyText: "• Health & Safety: Wearing required protective equipment, reporting workplace hazards, fire safety drills.\n• Working Conditions & Fair Treatment: Equal opportunity, preventing harassment, fair compensation.\n• Training & Growth: Developing employee skills, onboarding new hires fairly, supporting advancement.\n• Customer Care & Privacy: Protecting personal customer data, communicating transparently.\n• Community Engagement: Supporting local community initiatives, fair local vendor sourcing."
      },
      {
        id: "esg3-f1",
        type: "memorable_fact",
        position: 4,
        headingText: "Did You Know? (Worth Knowing)",
        bodyText: "According to international workplace studies, companies with high employee safety and fair treatment ratings experience 40% lower staff turnover and significantly higher productivity! Social responsibility directly strengthens workforce well-being."
      }
    ]
  },
  {
    order: 3,
    title: "Governance (G): Running Business Responsibly",
    minutes: 4,
    content: "Understand how Governance ensures ethical decision-making, policy adherence, and transparent reporting.",
    blocks: [
      { id: "esg4-h1", type: "heading", position: 1, headingText: "The Governance Pillar (G)" },
      { id: "esg4-t1", type: "short_text", position: 2, bodyText: "Governance covers how a company is directed, managed, and held accountable. It sets the rules, ethics, and oversight that ensure the business acts honestly, complies with policies, and protects stakeholder trust." },
      {
        id: "esg4-k1",
        type: "key_message",
        position: 3,
        headingText: "Key Governance Areas & Workplace Examples",
        bodyText: "• Business Ethics & Honesty: Refusing bribes, reporting improper gifts, avoiding deceptive claims.\n• Policies & Procedures: Following company guidelines, updating safety protocols, respecting compliance rules.\n• Accurate Recordkeeping: Recording work hours, financial logs, and operational reports truthfully.\n• Transparency & Accountability: Clear reporting to leadership, admitting errors or data gaps honestly.\n• Conflicts of Interest: Declaring personal relationships or connections that might influence business decisions."
      },
      {
        id: "esg4-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Governance Decision Scenario:",
        decisionPrompt: "An employee discovers a typo in a log sheet that understates departmental expenses. A coworker suggests ignoring it because 'nobody will notice.' What is the most responsible action?",
        decisionChoices: [
          { label: "Report the error to your supervisor so records remain 100% accurate and transparent.", correct: true, feedback: "Outstanding! Truthful, accurate recordkeeping is a core requirement of Governance." },
          { label: "Ignore the typo so the departmental budget appears under budget.", correct: false, feedback: "Incorrect. Concealing data errors violates governance policies and compromises corporate integrity." },
          { label: "Delete the log sheet entirely so no records remain.", correct: false, feedback: "Incorrect. Destroying operational records is a severe compliance violation." }
        ]
      }
    ]
  },
  {
    order: 4,
    title: "ESG in Real Life: Mauritius Workplace Scenario",
    minutes: 3,
    content: "Examine a realistic Mauritius business situation and classify issues into Environmental, Social, and Governance pillars.",
    blocks: [
      { id: "esg5-h1", type: "heading", position: 1, headingText: "Real-Life Application: Beach Resort & Corporate Office in Mauritius" },
      { id: "esg5-t1", type: "short_text", position: 2, bodyText: "At a commercial company operating in Grand Baie, Mauritius, the operational team conducts a quarterly review. They inspect four real-world situations happening across departments." },
      {
        id: "esg5-img1",
        type: "visual_question",
        position: 3,
        imageUrl: "/images/courses/visual-esg-evidence-review.png",
        caption: "Mauritius Workplace Review: Assessing Energy/Water (E), Health/Safety (S), and Policy Compliance (G).",
        imageAlt: "Illustration of a Mauritian office desk showing energy bills, staff safety logs, policy manuals, and supplier declarations."
      },
      {
        id: "esg5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Multi-Pillar Classification Challenge:",
        decisionPrompt: "The resort manager reviews 3 ongoing workplace items:\nItem A: Installing solar water heaters and rainwater harvesting on guest villas.\nItem B: Conducting mandatory ergonomics and first-aid safety workshops for kitchen staff.\nItem C: Establishing a transparent whistleblowing policy and fraud reporting hotline.\nHow are these three items classified across ESG?",
        decisionChoices: [
          { label: "Item A = Environmental (E), Item B = Social (S), Item C = Governance (G)", correct: true, feedback: "Spot on! Energy/water = E, health & safety = S, whistleblowing & anti-fraud policy = G. All three pillars work together for total business responsibility." },
          { label: "All three items belong strictly to Environmental (E)", correct: false, feedback: "Incorrect. Safety workshops are Social (S) and anti-fraud policies are Governance (G). ESG is far broader than environmental topics alone!" },
          { label: "Item A = Governance, Item B = Environmental, Item C = Social", correct: false, feedback: "Incorrect. Water/solar heaters impact the natural planet (E), safety workshops protect people (S), and ethics policies govern conduct (G)." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Role in ESG & Personal Commitment",
    minutes: 3,
    content: "Discover how individual actions contribute to company goals and commit to a daily ESG habit.",
    blocks: [
      { id: "esg6-h1", type: "heading", position: 1, headingText: "Employee Role vs. Leadership Oversight" },
      { id: "esg6-t1", type: "short_text", position: 2, bodyText: "A common misconception is that ESG is only the responsibility of senior managers or compliance directors. In reality, leadership sets policies and strategy, while everyday employees bring ESG to life through daily choices." },
      {
        id: "esg6-k1",
        type: "key_message",
        position: 3,
        headingText: "How You Support ESG Every Day",
        bodyText: "• Environmental (E): Turn off unused equipment, report water leaks, minimize waste.\n• Social (S): Wear required safety gear, treat all coworkers fairly, support new team members.\n• Governance (G): Follow company policies, protect confidential data, record information accurately."
      },
      {
        id: "esg6-c1",
        type: "commitment",
        position: 4,
        commitmentInstruction: "Select your daily workplace ESG commitment (choose at least one):",
        commitmentOptions: [
          { value: "practice-3-pillars", label: "Recognize E, S, and G factors in daily work decisions", description: "Remember that ESG includes planet, people, and governance." },
          { value: "conserve-resources", label: "Save energy, water, and reduce waste in my workspace", description: "Contribute to company Environmental objectives." },
          { value: "prioritize-safety-fairness", label: "Follow safety rules and treat colleagues fairly and respectfully", description: "Contribute to company Social objectives." },
          { value: "ensure-policy-accuracy", label: "Follow company policies and record workplace data accurately", description: "Contribute to company Governance objectives." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What does ESG stand for in plain workplace language?",
    options: [
      "Electrical, Solar, and Gas",
      "Environmental, Social, and Governance",
      "Executive Salary Guidelines",
      "Emergency Safety Gear"
],
    correct: 1,
    correctExplanation: "ESG stands for Environmental, Social, and Governance\u2014the three foundational pillars of responsible, sustainable corporate practice.",
    incorrectExplanation: "Incorrect. ESG stands for Environmental, Social, and Governance.",
    optionFeedback: [
      "Incorrect. Energy sources are only one component within the Environmental pillar.",
      "Correct. Environmental (planet stewardship), Social (people and community relationships), and Governance (ethical corporate conduct and oversight).",
      "Incorrect. ESG is an overarching organizational framework, not executive compensation rules.",
      "Incorrect. While safety is vital under the Social pillar, ESG represents the broader management framework."
]
  },
  {
    order: 2,
    question: "Which of the following actions is a practical workplace example of the Environmental (E) pillar?",
    options: [
      "Conducting energy audits to eliminate wasteful lighting and diverting packaging waste away from landfills",
      "Hosting an annual sports gala for executive managers only",
      "Auditing customer invoices to ensure correct bank account numbers",
      "Purchasing expensive office art to decorate the corporate boardroom"
],
    correct: 0,
    correctExplanation: "The Environmental pillar focuses on managing and reducing an organisation's impact on the natural world, including energy and waste.",
    incorrectExplanation: "Incorrect. Reducing energy consumption and diverting waste are core Environmental pillar actions.",
    optionFeedback: [
      "Correct. Energy efficiency, water conservation, greenhouse gas reduction, and waste diversion are core Environmental operational responsibilities.",
      "Incorrect. Exclusive social events do not advance environmental stewardship or broad employee wellbeing.",
      "Incorrect. Invoice auditing falls under standard financial Governance, not environmental management.",
      "Incorrect. Aesthetic office decor is an interior design expense, not an environmental initiative."
]
  },
  {
    order: 3,
    question: "Which workplace situation represents a Social (S) pillar issue in an organisation?",
    options: [
      "Checking the refrigerant pressure gauges on an outdoor chiller unit",
      "Installing photovoltaic solar panels on the facility roof",
      "Ensuring fair working hours, workplace health and safety protections, and equal opportunity for all staff",
      "Filing annual corporate financial tax statements with the revenue authority"
],
    correct: 2,
    correctExplanation: "The Social pillar addresses how a company treats people\u2014employees, contractors, customers, and local communities.",
    incorrectExplanation: "Incorrect. Fair labor practices, occupational safety, and employee equity belong to the Social pillar.",
    optionFeedback: [
      "Incorrect. Chiller maintenance addresses equipment performance under the Environmental pillar.",
      "Incorrect. Solar energy installation is an Environmental pillar initiative.",
      "Correct. Workforce wellbeing, occupational health and safety, non-discrimination, training, and fair pay are central Social responsibilities.",
      "Incorrect. Tax compliance and financial reporting belong to the Governance pillar."
]
  },
  {
    order: 4,
    question: "How does an everyday employee contribute directly to the Governance (G) pillar in their daily work?",
    options: [
      "By ignoring company financial procedures whenever deadlines are tight",
      "By accepting cash gifts from prospective suppliers without telling anyone",
      "By writing fictional operational data in logbooks to make departments look good",
      "By adhering to company policies, recording operational and safety data honestly, and reporting conflicts of interest"
],
    correct: 3,
    correctExplanation: "Governance depends on honest data recording, following internal controls, and operating with transparent integrity.",
    incorrectExplanation: "Incorrect. Honest reporting, following ethical standards, and adhering to procedures support Governance.",
    optionFeedback: [
      "Incorrect. Bypassing financial controls violates corporate governance and creates compliance exposure.",
      "Incorrect. Secretly accepting gifts breaches anti-bribery policies and fiduciary duties.",
      "Incorrect. Falsifying records corrupts audit trails and exposes the company to severe regulatory penalties.",
      "Correct. Governance is lived through everyday adherence to approved processes, truthful reporting, and transparent escalation of risks."
]
  },
  {
    order: 5,
    question: "What is the relationship between individual employee actions and a company's published corporate ESG report?",
    options: [
      "Published ESG reports are written entirely by artificial intelligence with zero connection to real workplace data",
      "Aggregate daily employee decisions and accurate data logging generate the verified operational evidence that underpins corporate ESG disclosures",
      "Employees are legally forbidden from reading their company's published ESG reports",
      "Individual employees have zero influence because ESG is managed exclusively by external public relations firms"
],
    correct: 1,
    correctExplanation: "Corporate ESG disclosures are only as credible as the underlying operational data collected from daily employee activities.",
    incorrectExplanation: "Incorrect. Company ESG reports rely directly on the aggregate operational data logged by employees.",
    optionFeedback: [
      "Incorrect. Legitimate ESG disclosures require auditable operational records from physical facilities.",
      "Correct. Real corporate ESG performance is built from daily sorting, energy habits, safety logs, and ethical purchasing recorded by staff on the ground.",
      "Incorrect. Transparency requires making sustainability reports accessible to employees, investors, and the public.",
      "Incorrect. While PR teams format communications, the underlying facts and figures derive entirely from workplace operations."
]
  },
  {
    order: 6,
    question: "Why is ESG not simply corporate philanthropy or occasional charitable donations?",
    options: [
      "ESG embeds sustainability and ethical accountability directly into core business strategies, operational processes, and risk management",
      "Charity is strictly illegal under commercial law in Mauritius",
      "ESG means companies are never permitted to make a financial profit",
      "Philanthropy is managed by the police while ESG is managed by firefighters"
],
    correct: 0,
    correctExplanation: "Philanthropy donates surplus funds, whereas ESG governs how the company makes its money and manages operational impacts every day.",
    incorrectExplanation: "Incorrect. ESG integrates environmental and social risk management into daily core business operations.",
    optionFeedback: [
      "Correct. Philanthropy focuses on giving money away; ESG focuses on how responsibly the company operates, treats workers, and manages environmental risks daily.",
      "Incorrect. Corporate Social Responsibility (CSR) and charitable donations are standard, legal practices in Mauritius.",
      "Incorrect. Sustainable businesses must remain commercially viable and profitable over the long term.",
      "Incorrect. Corporate governance and sustainability are management functions, not emergency services."
]
  },
  {
    order: 7,
    question: "Under the Social (S) pillar, why is occupational health and safety (OHS) considered a foundational responsibility rather than an optional perk?",
    options: [
      "Because ensuring every worker returns home safely every day is a primary moral, legal, and operational obligation of every business",
      "Because safety helmets make employees look more fashionable on corporate social media",
      "Because occupational safety is only relevant on construction scaffolding above 50 meters",
      "Because accidents have zero financial cost to commercial employers"
],
    correct: 2,
    correctExplanation: "Workplace safety protects human life and dignity, forming the bedrock of the Social pillar under statutory laws like OSHA 2005.",
    incorrectExplanation: "Incorrect. Occupational safety is a fundamental legal, moral, and operational duty under the Social pillar.",
    optionFeedback: [
      "Incorrect. Safety is grounded in human protection and legal duty, not public relations imagery.",
      "Incorrect. Health and safety applies across all office, warehouse, retail, hospitality, and industrial environments.",
      "Correct. Under the Occupational Safety and Health Act 2005 and ESG standards, protecting worker physical and mental integrity is an essential corporate duty.",
      "Incorrect. Workplace injuries cause immense human suffering, lost productivity, medical costs, and severe legal liability."
]
  },
  {
    order: 8,
    question: "How does a robust whistleblower and grievance mechanism support the Governance (G) pillar?",
    options: [
      "It encourages employees to spread unsubstantiated gossip about colleagues during lunch breaks",
      "It allows companies to delete all internal audit records without government oversight",
      "It requires managers to approve all personal social media posts by employees",
      "It provides a secure, confidential channel for employees to report ethical breaches, fraud, or safety hazards without fear of retaliation"
],
    correct: 3,
    correctExplanation: "Confidential reporting channels allow organisations to identify and correct compliance failures before they cause severe damage.",
    incorrectExplanation: "Incorrect. Whistleblower channels provide confidential, safe avenues to report genuine misconduct and safety risks.",
    optionFeedback: [
      "Incorrect. Whistleblower protections are serious legal compliance mechanisms for genuine misconduct, not workplace gossip.",
      "Incorrect. Deleting audit records violates company laws and accounting standards.",
      "Incorrect. Whistleblowing focuses on internal operational misconduct, not personal private communications.",
      "Correct. Effective whistleblower policies protect integrity by enabling early detection of fraud, safety breaches, or environmental violations without fear of reprisal."
]
  },
  {
    order: 9,
    question: "In what way does supply chain due diligence connect the Environmental (E) and Governance (G) pillars?",
    options: [
      "By requiring management to verify that contractors and suppliers comply with environmental permits, labor laws, and ethical standards",
      "By forcing all suppliers to relocate their factories to the same street",
      "By refusing to pay supplier invoices for twelve months to boost company cash flow",
      "By ordering goods exclusively from foreign websites that have no registered contact address"
],
    correct: 0,
    correctExplanation: "Governance controls (audits, contracts, due diligence) enforce environmental and social standards across the supply chain.",
    incorrectExplanation: "Incorrect. Supply chain due diligence uses governance procedures to ensure suppliers operate responsibly.",
    optionFeedback: [
      "Correct. Governance provides the oversight policies and contractual checks that ensure third-party vendors meet environmental compliance and ethical standards.",
      "Incorrect. Supply chains are geographically distributed; governance audits their operational practices.",
      "Incorrect. Unethical payment withholding damages supplier relationships and violates fair business conduct.",
      "Incorrect. Untraceable suppliers create immense governance, counterfeit, and regulatory risks."
]
  },
  {
    order: 10,
    question: "How do honest, verifiable activity logs protect an organisation against accusations of greenwashing?",
    options: [
      "They prove that the company owns expensive luxury delivery vans",
      "They eliminate the need to maintain employee payroll records",
      "They provide auditable, empirical evidence that substantiates public sustainability claims and demonstrates genuine progress",
      "They guarantee that the company will never be inspected by environmental authorities"
],
    correct: 2,
    correctExplanation: "Auditable data trails prove that public environmental statements are backed by real operational facts rather than marketing exaggerations.",
    incorrectExplanation: "Incorrect. Verifiable activity data substantiates claims with empirical evidence, preventing greenwashing.",
    optionFeedback: [
      "Incorrect. Asset displays do not prove environmental performance.",
      "Incorrect. Payroll compliance is a distinct statutory obligation.",
      "Correct. Transparent data trails allow independent auditors, customers, and regulators to verify that published green metrics reflect real operational reality.",
      "Incorrect. Regulatory authorities retain the statutory right to inspect facilities regardless of records."
]
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
        throw new Error("Course ELH-09 / esg-basics not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "ESG Basics course content and v3 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v3 seed detected for Course ELH-09. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "environmental-compliance-mauritius"))
        .limit(1);
      const nextCourseId = nextCourse?.id ?? null;

      // 5. Update course record slug, title, and metadata
      await tx
        .update(coursesTable)
        .set({
          title: COURSE_TITLE,
          slug: COURSE_SLUG,
          courseCode: "ELH-09",
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
          version: 2,
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
          icon: "award",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 14,
        })
        .onConflictDoUpdate({
          target: badgeDefinitionsTable.slug,
          set: {
            name: COURSE_META.badgeName,
            description: COURSE_META.badgeDescription,
            courseIds: [courseId],
          },
        });

      // 9. Save seed marker version idempotently
      await tx
        .insert(systemSeedsTable)
        .values({
          name: SEED_NAME,
          version: 3,
        })
        .onConflictDoUpdate({
          target: systemSeedsTable.name,
          set: { version: 3 },
        });

      logger.info({ courseId, slug: COURSE_SLUG }, "ESG Basics course v3 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute idempotent seeding/repair of ESG Basics course");
  }
}

