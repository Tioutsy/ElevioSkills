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

const COURSE_SLUG = "sustainability-for-finance-teams";
const COURSE_TITLE = "Sustainability for Finance Teams";
const BADGE_SLUG = "sustainable-finance-supporter";
const BADGE_CODE = "COURSE_ELH_25_COMPLETE";
const SEED_NAME = "sustainability-for-finance-teams-v3";

const COURSE_META = {
  courseCode: "ELH-25",
  description: "A practical course for finance employees and managers on integrating sustainability into budgeting, expenditure review, financial controls, evidence management and management reporting.",
  fullDescription: "A practical course for finance employees and managers on integrating sustainability into budgeting, expenditure review, financial controls, evidence management and management reporting without presenting finance as the sole owner of technical environmental performance or calculations.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "0.00",
  level: "Applied Workplace Practice",
  isFeatured: false,
  thumbnailUrl: "/images/courses/sustainability-for-finance-teams.jpg",
  intendedRoles: [
    "Finance officers",
    "Accountants",
    "Finance administrators",
    "Payroll and accounts employees",
    "Finance managers",
    "Employees responsible for invoices, budgets or expenditure records",
    "Managers who work with finance teams on sustainability initiatives"
  ],
  learningObjectives: [
    "Clarify finance's role in evaluating financial visibility, budgeting, and controls for sustainability initiatives.",
    "Distinguish finance responsibilities from technical environmental, ESG, facilities, procurement, or legal ownership.",
    "Apply total cost of ownership (TCO) and lifecycle cost principles beyond initial purchase invoice prices.",
    "Incorporate approved sustainability actions into standard budget coding, expenditure tracking, and variance reviews.",
    "Request, review, and retain credible financial and supporting operational evidence before approving invoices.",
    "Detect and escalate unverified financial assumptions, greenwashing claims, or inaccurate savings reporting."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage: "You have completed Sustainability for Finance Teams. You can now support credible decisions through reliable cost comparisons, disciplined budgeting, verifiable records, and honest reviews of cost results.",
  badgeName: "Sustainable Finance Supporter",
  badgeDescription: "Awarded for demonstrating practical understanding of how to integrate sustainability into financial processes, budgeting, lifecycles, record-keeping, and cost controls.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Opening Workplace Hook: The Flawed Business Case",
    minutes: 3,
    content: "Examine a realistic commercial proposal where substantial savings are claimed without baseline data, maintenance costs, or verified assumptions.",
    blocks: [
      {
        id: "c25-l1-b1",
        type: "heading",
        headingText: "Opening Workplace Hook: The Flawed Business Case"
      },
      {
        id: "c25-l1-b2",
        type: "short_text",
        bodyText: "A commercial hotel and property enterprise in Mauritius considers a proposal to upgrade air-conditioning chillers and install LED lighting across three sites. The proposal states that the investment will 'pay for itself within 12 months' and reduce electricity costs by MUR 450,000 annually.\n\nHowever, an initial finance review reveals:\n• The baseline energy consumption uses one unusually high summer peak month as the annual baseline.\n• The quotation covers equipment supply but omits installation labor, electrical upgrades, and disposal fees.\n• Annual maintenance contract costs after year one are completely omitted.\n• The expected savings are presented as 100% guaranteed.\n• No operational lead has been assigned to verify meter readings after installation."
      },
      {
        id: "c25-l1-b3",
        type: "key_message",
        headingText: "The Financial Insight",
        bodyText: "Finance adds value by making assumptions, total costs, evidence gaps, and decision conditions visible before capital is committed."
      },
      {
        id: "c25-l1-d1",
        type: "decision_scenario",
        decisionIntro: "Financial payback evaluation dilemma:",
        decisionPrompt: "A vendor claims their smart HVAC control system has a 'guaranteed 6-month payback period' based on cutting total building electricity consumption by 40%. When you inspect the calculations, you find they assumed the HVAC system runs 24 hours a day at 100% capacity year-round. What is the correct financial analysis?",
        decisionChoices: [
          { label: "Challenge the 24/7 baseline assumption, model realistic seasonal operating hours, and request verifiable historical case study data before committing capital", correct: true, feedback: "Correct! Exaggerated baseline run-times artificially inflate projected savings. Finance must stress-test assumptions against real operational patterns." },
          { label: "Approve the CAPEX expenditure immediately because a 6-month payback is the fastest on record", correct: false, feedback: "Severe financial risk! Committing capital to flawed financial assumptions leads to massive ROI shortfalls." },
          { label: "Reject all energy efficiency proposals permanently because vendors always lie", correct: false, feedback: "Incorrect. Legitimate energy projects deliver strong ROI; the role of finance is rigorous validation, not arbitrary refusal." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Why Finance Matters: Personal, Business, and Environmental Value",
    minutes: 3,
    content: "Understand why finance involvement ensures affordable, accountable, and evidence-backed workplace sustainability.",
    blocks: [
      {
        id: "c25-l2-b1",
        type: "heading",
        headingText: "Why Finance Involvement Matters"
      },
      {
        id: "c25-l2-b2",
        type: "short_text",
        bodyText: "Finance involvement connects sustainability ideas to rigorous business discipline:\n• Employee & Personal Value: Finance staff gain clarity on how to review green proposals without acting as technical engineers.\n• Business Value: Credible financial controls protect against unbudgeted cost overruns, greenwashing risks, and unreliable vendor claims.\n• Environmental Value: Rigorous budgeting ensures approved environmental projects receive sustained funding rather than being cancelled mid-way."
      }
    ]
  },
  {
    order: 2,
    title: "Finance Role Boundary & Responsibility Matrix",
    minutes: 3,
    content: "Define functional boundaries between finance ownership, support duties, and technical environmental leads.",
    blocks: [
      {
        id: "c25-l3-b1",
        type: "heading",
        headingText: "Finance Role Responsibility Matrix"
      },
      {
        id: "c25-l3-b2",
        type: "short_text",
        bodyText: "Finance is a financial evaluator and control custodian—not a technical environmental engineer.\n\nResponsibility Boundaries:\n• Finance Owns: Budget coding, expenditure recording, invoice matching, variance tracking, and financial evidence retention.\n• Finance Supports: Business case evaluation, payback modeling, procurement reviews, and cost-benefit analysis.\n• Finance Does Not Own: Carbon calculations, technical energy engineering, legal permit compliance, or supplier environmental verification."
      },
      {
        id: "c25-l3-d1",
        type: "decision_scenario",
        decisionIntro: "Solar financing structure dilemma:",
        decisionPrompt: "A company wants to add rooftop solar to its logistics depot. Option A requires an upfront CAPEX of MUR 3,000,000 with a 4.5-year payback and company-owned maintenance liability. Option B is a 10-year Power Purchase Agreement (PPA) with zero upfront CAPEX, vendor-maintained panels, and an indexed electricity tariff 15% below current grid rates. How should finance evaluate this?",
        decisionChoices: [
          { label: "Conduct a lifecycle Net Present Value (NPV) and cash-flow sensitivity comparison factoring in tariff inflation, maintenance liabilities, tax incentives, and capital constraints", correct: true, feedback: "Spot on! Professional financial analysis evaluates total cost of ownership, cash liquidity, maintenance risk, and tax depreciation rather than looking solely at initial cash outlay." },
          { label: "Pick Option A automatically because owning physical assets is always superior regardless of cash flow", correct: false, feedback: "Incorrect. Upfront capital outlays may constrain core working capital and carry unmodeled inverter replacement risks." },
          { label: "Reject both options and continue paying 100% full grid rates forever", correct: false, feedback: "Incorrect. Renewable financing structures provide hedge protection against escalating fossil utility tariffs." }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "Plain-Language Financial Vocabulary",
    minutes: 3,
    content: "Master core financial terms relevant to workplace sustainability evaluation.",
    blocks: [
      {
        id: "c25-l4-b1",
        type: "heading",
        headingText: "Core Sustainable Finance Concepts"
      },
      {
        id: "c25-l4-b2",
        type: "short_text",
        bodyText: "• CAPEX (Capital Expenditure): Upfront investments in long-term assets (e.g. solar panels, variable speed chiller drives).\n• OPEX (Operational Expenditure): Ongoing running costs (e.g. monthly electricity bills, maintenance consumables, filter replacements).\n• Total Cost of Ownership (TCO): The complete sum of purchase price, installation, energy consumption, servicing, and end-of-life disposal.\n• Payback Period: The time required for operational cost savings to equal the initial net investment."
      }
    ]
  },
  {
    order: 4,
    title: "Six Key Financial Responsibilities for Sustainability",
    minutes: 3,
    content: "Explore the six practical areas where finance supports sustainable operations.",
    blocks: [
      {
        id: "c25-l5-b1",
        type: "heading",
        headingText: "The Six Finance Operational Pillars"
      },
      {
        id: "c25-l5-b2",
        type: "short_text",
        bodyText: "1. TCO Analysis: Evaluate full lifecycle costs rather than choosing the cheapest low-durability equipment.\n2. Budget Coding: Establish dedicated tracking codes for sustainability expenditure and utility savings.\n3. Variance Tracking: Monitor actual post-installation utility savings against projected business case targets.\n4. Invoice Matching: Require primary operational proof (meter readings, service sign-offs) before releasing vendor milestones.\n5. Audit Documentation: Maintain primary receipts and invoices supporting reported environmental metrics.\n6. Greenwashing Defense: Prevent unsubstantiated financial savings claims from being published."
      },
      {
        id: "c25-l5-d1",
        type: "decision_scenario",
        decisionIntro: "Vendor milestone payment dilemma:",
        decisionPrompt: "An energy efficiency contractor submits a final invoice for an MUR 100,000 performance bonus, claiming they achieved a '20% electricity reduction' in the first quarter. When finance checks utility records, total building electricity actually increased by 5% because a new cold room was added. What should finance do?",
        decisionChoices: [
          { label: "Withhold the performance bonus, require normalized sub-meter evidence isolating the specific retrofitted equipment from the new cold room, and review the contract terms", correct: true, feedback: "Outstanding! Financial controls require verifying normalized operational data before paying performance bonuses, ensuring payments match actual delivered performance." },
          { label: "Pay the bonus immediately because the contractor was polite on the phone", correct: false, feedback: "Severe financial control failure! Paying unverified bonuses wastes corporate funds." },
          { label: "Cancel all vendor contracts across the entire company immediately", correct: false, feedback: "Incorrect. Follow formal contractual dispute and verification procedures." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Step-by-Step Financial Implementation Roadmap",
    minutes: 3,
    content: "Walk through the four-step roadmap to integrate sustainability into finance workflows.",
    blocks: [
      {
        id: "c25-l6-b1",
        type: "heading",
        headingText: "Four-Step Finance Implementation Roadmap"
      },
      {
        id: "c25-l6-b2",
        type: "short_text",
        bodyText: "• Step 1: Baseline Verification: Require historical 12-month utility data before evaluating any project proposal.\n• Step 2: Total Cost Modeling: Include installation, consumables, preventative maintenance, and disposal in all comparisons.\n• Step 3: Performance Milestone Gates: Tie contractor payments to verified sub-meter operational performance.\n• Step 4: Post-Implementation Review: Conduct a 6-month variance audit to compare real cost savings against business case forecasts."
      }
    ]
  }
];

const NEW_QUIZ_QUESTIONS = [
  {
    question: "What is the primary boundary of finance's role in evaluating workplace sustainability initiatives?",
    options: [
      { text: "Finance provides financial modeling, budget coding, expenditure controls, and evidence verification, but does not own technical environmental engineering or compliance decisions.", isCorrect: true },
      { text: "Finance is solely responsible for calculating atmospheric carbon chemistry and designing electrical schematics.", isCorrect: false },
      { text: "Finance has no role in sustainability because sustainability only involves tree planting.", isCorrect: false },
      { text: "Finance's role is to automatically reject 100% of sustainability proposals to save cash.", isCorrect: false }
    ],
    correctExplanation: "Finance provides financial visibility, rigorous modeling, and expenditure controls without overstepping into technical engineering.",
    incorrectExplanation: "Incorrect. Finance evaluates budgets, TCO, and controls, but technical design remains with operational specialists."
  },
  {
    question: "A proposal claims a new solar lighting system will 'pay for itself in 12 months' based on peak summer energy consumption figures. Why must finance challenge this?",
    options: [
      { text: "Using a peak summer month as an annual average inflates projected savings; finance must require a full 12-month baseline and include installation/maintenance costs.", isCorrect: true },
      { text: "Solar lighting is illegal under Mauritian commercial building codes.", isCorrect: false },
      { text: "Payback periods are prohibited from ever being calculated in corporate finance.", isCorrect: false },
      { text: "Solar panels only function when connected to diesel generators.", isCorrect: false }
    ],
    correctExplanation: "Seasonally skewed baselines and omitted installation/maintenance costs create misleading payback estimates.",
    incorrectExplanation: "Incorrect. Flawed baselines inflate projected ROI; finance must validate assumptions against full-year data."
  },
  {
    question: "What is the concept of 'Total Cost of Ownership' (TCO) in sustainable procurement and financial evaluation?",
    options: [
      { text: "Evaluating the complete sum of purchase price, installation, ongoing energy/water use, maintenance consumables, and end-of-life disposal.", isCorrect: true },
      { text: "Looking exclusively at the lowest upfront purchase price on a vendor quotation.", isCorrect: false },
      { text: "The total amount of money spent on marketing launch parties.", isCorrect: false },
      { text: "A tax paid to corporate auditors at the end of the financial year.", isCorrect: false }
    ],
    correctExplanation: "TCO accounts for operating and maintenance costs across an asset's lifespan, preventing cheap but inefficient purchases.",
    incorrectExplanation: "Incorrect. TCO encompasses lifecycle operating and disposal costs, not just initial invoice price."
  },
  {
    question: "How should finance handle a vendor invoice requesting a performance bonus for 'achieved energy savings'?",
    options: [
      { text: "Verify normalized sub-meter utility data and operational sign-off before approving the performance payment.", isCorrect: true },
      { text: "Pay the invoice immediately without checking any supporting data.", isCorrect: false },
      { text: "Reject the invoice and refuse to ever pay vendor bills.", isCorrect: false },
      { text: "Forward the invoice to HR to pay out of the employee holiday party budget.", isCorrect: false }
    ],
    correctExplanation: "Financial control requires verified primary performance evidence before releasing milestone bonuses.",
    incorrectExplanation: "Incorrect. Performance bonuses must be validated against verified operational and meter data."
  },
  {
    question: "What is the primary difference between CAPEX and OPEX in sustainability investments?",
    options: [
      { text: "CAPEX represents upfront capital investment in durable long-term assets (e.g. solar panels), while OPEX represents ongoing operational expenses (e.g. utility bills, maintenance).", isCorrect: true },
      { text: "CAPEX is paid in cash, while OPEX is paid in gold bars.", isCorrect: false },
      { text: "CAPEX applies only to marketing, while OPEX applies only to taxes.", isCorrect: false },
      { text: "There is no difference; both terms mean employee salaries.", isCorrect: false }
    ],
    correctExplanation: "CAPEX funds long-term physical assets, whereas OPEX covers continuous operational and utility running costs.",
    incorrectExplanation: "Incorrect. CAPEX covers upfront long-term assets, while OPEX covers ongoing operational expenses."
  },
  {
    question: "Why should approved sustainability initiatives have dedicated budget codes within the enterprise financial accounting system?",
    options: [
      { text: "To enable transparent tracking of expenditures, evaluate actual ROI against business case forecasts, and provide audit-ready ESG financial records.", isCorrect: true },
      { text: "To hide environmental expenses from executive directors.", isCorrect: false },
      { text: "Because financial software crashes if sustainability expenses are recorded in general accounts.", isCorrect: false },
      { text: "To automatically double the departmental tax liability.", isCorrect: false }
    ],
    correctExplanation: "Dedicated budget codes provide granular financial visibility, variance tracking, and audit-ready expenditure reporting.",
    incorrectExplanation: "Incorrect. Dedicated budget coding allows precise tracking of sustainability investments and verified savings."
  },
  {
    question: "In evaluating a solar Power Purchase Agreement (PPA) versus an upfront capital purchase, what must finance analyze?",
    options: [
      { text: "Compare lifecycle NPV, cash liquidity constraints, indexed tariff inflation risk, and vendor maintenance commitments.", isCorrect: true },
      { text: "Choose whichever option has the prettiest logo on the contract cover.", isCorrect: false },
      { text: "Select the option that requires zero contracts or paperwork.", isCorrect: false },
      { text: "Refuse both options because renewable energy is a temporary fad.", isCorrect: false }
    ],
    correctExplanation: "Comparing PPAs and capital purchases requires multi-year cash flow, inflation, and risk allocation modeling.",
    incorrectExplanation: "Incorrect. Finance must model cash flow, tariff risk, maintenance liability, and capital availability."
  },
  {
    question: "What should finance do during a post-implementation review 6 months after an energy-saving retrofit?",
    options: [
      { text: "Conduct a variance audit comparing actual normalized utility bills against the original business case projections to confirm genuine savings.", isCorrect: true },
      { text: "Delete the original business case proposal so nobody remembers the initial projections.", isCorrect: false },
      { text: "Assume the project was 100% successful without checking any utility data.", isCorrect: false },
      { text: "Celebrate by turning all building lights on 24 hours a day.", isCorrect: false }
    ],
    correctExplanation: "Post-implementation variance reviews close the loop, verifying that projected financial returns materialized in reality.",
    incorrectExplanation: "Incorrect. Post-implementation audits verify whether forecast savings were achieved and inform future business cases."
  }
];

export async function ensureSustainabilityForFinanceTeamsCourse(): Promise<void> {
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
          icon: "dollar-sign",
          criteriaType: "course_completion",
          threshold: 1,
          courseIds: [actualCourseId],
          orderIndex: 25,
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

      logger.info({ courseId: actualCourseId, slug: COURSE_SLUG }, "Sustainability for Finance Teams course v3 seed transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, slug: COURSE_SLUG }, "Failed to ensure Sustainability for Finance Teams course seeding");
    throw err;
  }
}
