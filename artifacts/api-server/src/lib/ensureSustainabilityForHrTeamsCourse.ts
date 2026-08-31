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

const COURSE_SLUG = "sustainability-for-hr-teams";
const COURSE_TITLE = "Sustainability for HR Teams";
const BADGE_SLUG = "sustainability-enabled-hr-practitioner";
const BADGE_CODE = "COURSE_ELH_24_COMPLETE";
const SEED_NAME = "sustainability-for-hr-teams-v3";

const COURSE_META = {
  courseCode: "ELH-24",
  description: "A practical course for HR professionals and managers on integrating sustainability into onboarding, learning, employee communication, engagement, performance support and training evidence.",
  fullDescription: "A practical course for HR professionals and managers on integrating sustainability into onboarding, learning, employee communication, engagement, performance support and training evidence without presenting HR as the sole owner of technical environmental controls.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "0.00",
  level: "Applied Workplace Practice",
  isFeatured: false,
  thumbnailUrl: "/images/courses/sustainability-for-hr-teams.jpg",
  intendedRoles: ["employees", "supervisors", "managers", "sustainability coordinators", "green-team members", "HR professionals", "people managers"],
  learningObjectives: [
    "Clarify HR's role as an enabler, coordinator, and evidence custodian across the employee lifecycle.",
    "Distinguish between HR responsibilities and matters owned by managers, operations, facilities, procurement, or ESG specialists.",
    "Design role-based, accessible, and inclusive learning assignments across diverse workforce groups.",
    "Integrate practical sustainability expectations into onboarding and role clarity without generic slogans.",
    "Foster employee participation without coercion, public naming, pressure, or unsupported environmental claims.",
    "Maintain reliable, audit-ready training evidence distinct from operational performance metrics."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage: "You have completed Sustainability for HR Teams. You can now support practical sustainability learning, role clarity, employee participation and reliable training records across the employee lifecycle.",
  badgeName: "Sustainability-Enabled HR Practitioner",
  badgeDescription: "Awarded for demonstrating practical understanding of how to integrate sustainability into onboarding, learning, employee communication, participation and training records.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Opening Workplace Hook: The Email Policy Trap",
    minutes: 3,
    content: "Understand why sending a sustainability policy by email is not enough to create role clarity, accessible learning, or reliable training evidence across a diverse workforce.",
    blocks: [
      {
        id: "c24-l1-b1",
        type: "heading",
        headingText: "Opening Workplace Hook: The Email Policy Trap"
      },
      {
        id: "c24-l1-b2",
        type: "short_text",
        bodyText: "A growing hospitality and logistics enterprise in Mauritius introduces a new workplace sustainability policy and sends it as a PDF email attachment to all employees.\n\nThree months later, HR reports a 98% email delivery rate as proof that the workforce understands sustainability. However, an internal operational review reveals:\n• New hires recruited last month never received the policy.\n• Frontline kitchen, maintenance, and warehouse staff with limited computer access were omitted.\n• Department managers give conflicting instructions on waste sorting and water leak reporting.\n• Training records consist of an incomplete Excel spreadsheet.\n• Employees report that they do not know which specific sustainability expectations apply to their daily roles."
      },
      {
        id: "c24-l1-b3",
        type: "key_message",
        headingText: "The Learning Insight",
        bodyText: "Sending an email attachment is an administrative delivery action. It does not prove role clarity, accessible learning, manager alignment, or operational understanding."
      },
      {
        id: "c24-l1-d1",
        type: "decision_scenario",
        decisionIntro: "Recruitment sustainability claim dilemma:",
        decisionPrompt: "A recruitment specialist wants to include the sentence 'Our company is 100% carbon neutral and eco-friendly' on all job vacancy advertisements to attract young talent. The company has carbon reduction initiatives underway, but has not completed Scope 1–3 audits or third-party carbon neutrality certification. How should the HR lead respond?",
        decisionChoices: [
          { label: "Refuse the unverified claim and describe verified initiatives accurately (e.g., 'committed to workplace sustainability with on-site solar energy and formal waste reduction programmes')", correct: true, feedback: "Correct! Employer branding must be truthful and grounded in verified policy. Unsubstantiated claims in recruitment create greenwashing risk and erode candidate trust." },
          { label: "Approve the claim because job advertisements are just marketing and do not require factual evidence", correct: false, feedback: "Incorrect. Employer recruitment statements must be factually defensible and compliant with advertising standards." },
          { label: "Delete all references to sustainability from company careers pages permanently", correct: false, feedback: "Incorrect. Promoting genuine, verified sustainability practices is great for talent acquisition—the key is factual accuracy." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Why HR Matters: Employee, Business and Environmental Relevance",
    minutes: 3,
    content: "Examine how HR acts as an enabler, coordinator, and evidence custodian across three key organizational levels.",
    blocks: [
      {
        id: "c24-l2-b1",
        type: "heading",
        headingText: "Why HR Matters for Workplace Sustainability"
      },
      {
        id: "c24-l2-b2",
        type: "short_text",
        bodyText: "HR enables workplace sustainability by embedding clear expectations from day one, ensuring accessible learning, supporting managers, and maintaining reliable training evidence.\n\n• Employee Relevance: Employees gain clear expectations from onboarding, receive accessible learning in protected working hours, and know how to report operational barriers without fear of penalty.\n• Business Relevance: Reliable training records protect company credibility, streamline internal and external audits, and prevent cross-departmental confusion.\n• Environmental Relevance: Workforce training directly supports operational controls (e.g., proper waste sorting, energy shutoff SOPs) rather than remaining an isolated academic exercise."
      }
    ]
  },
  {
    order: 2,
    title: "HR Role Boundaries: Enabler vs Technical Owner",
    minutes: 3,
    content: "Define strict functional boundaries between HR responsibilities and operational, facilities, ESG, legal, or health and safety ownership.",
    blocks: [
      {
        id: "c24-l3-b1",
        type: "heading",
        headingText: "HR Role Boundaries & Responsibility Matrix"
      },
      {
        id: "c24-l3-b2",
        type: "short_text",
        bodyText: "HR is an enabler and custodian—not the final technical decision-maker or environmental engineer. HR must never unilaterally interpret environmental laws, calculate carbon emissions, approve green claims, or select technical waste contractors.\n\nResponsibility Matrix:\n• Onboarding & Learning: HR coordinates and logs; Manager/ESG lead approves content.\n• Technical SOPs: Operations/Facilities owns; HR supports role documentation.\n• Environmental Claims: Marketing/Technical lead verifies; HR ensures recruitment materials match evidence.\n• Health & Safety Risks: HSE Lead owns; HR documents employee reports and escalates immediately."
      },
      {
        id: "c24-l3-d1",
        type: "decision_scenario",
        decisionIntro: "Competency matrix and shift training dilemma:",
        decisionPrompt: "A hotel operations manager insists that night-shift stewarding staff do not have time for sustainability training during working hours, and suggests having them sign the attendance register without completing the module. How should HR handle this?",
        decisionChoices: [
          { label: "Refuse sign-off without real training; work with the manager to schedule 15-minute micro-learning blocks during protected shift changeover times", correct: true, feedback: "Spot on! Signing off training that never occurred is fraudulent record-keeping (ISO 14001 Clause 7.2 failure). HR must enable accessible learning within paid working hours." },
          { label: "Allow the manager to sign off everyone to maintain a 100% training completion metric on paper", correct: false, feedback: "Severe governance failure! Falsified training records destroy audit integrity and leave frontline workers untrained on critical waste/chemical safety." },
          { label: "Tell the stewarding staff they must complete the training at home on their personal phones without pay", correct: false, feedback: "Unacceptable. Mandatory job training must occur during paid working hours with appropriate access." }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "Sourced Fact: From Awareness to Technical Competence",
    minutes: 3,
    content: "Distinguish between general awareness, understanding, technical capability, and decision authority using international standard principles.",
    blocks: [
      {
        id: "c24-l4-b1",
        type: "heading",
        headingText: "Sourced Fact: Awareness vs Technical Competence"
      },
      {
        id: "c24-l4-b2",
        type: "short_text",
        bodyText: "According to ISO 14001:2015 Clause 7.2 (Competence) and Clause 7.3 (Awareness):\n• Awareness means an employee recognizes the environmental policy, understands how their work affects outcomes, and knows the consequences of non-conformance.\n• Competence requires demonstrated capability based on education, training, or experience to perform specific tasks affecting environmental performance.\n\nHR must recognize that general awareness training is not a substitute for technical competence certification (e.g. hazardous chemical handling or refrigerant recovery)."
      }
    ]
  },
  {
    order: 4,
    title: "Six Key HR Responsibilities Across the Employee Lifecycle",
    minutes: 3,
    content: "Explore the six practical areas where HR supports workplace sustainability.",
    blocks: [
      {
        id: "c24-l5-b1",
        type: "heading",
        headingText: "The Six HR Operational Pillars"
      },
      {
        id: "c24-l5-b2",
        type: "short_text",
        bodyText: "1. Onboarding Integration: Introduce practical workplace habits and reporting channels from Day 1.\n2. Role Clarity: Clarify sustainability boundaries within job descriptions.\n3. Accessible Learning: Provide training during paid working hours in relevant languages and formats.\n4. Performance Support: Enable constructive feedback without coercive naming or punitive shaming.\n5. Training Evidence: Maintain auditable completion records with timestamps, versions, and assessment scores.\n6. Inclusive Participation: Foster voluntary green team engagement and recognition."
      },
      {
        id: "c24-l5-d1",
        type: "decision_scenario",
        decisionIntro: "Employee participation dilemma:",
        decisionPrompt: "To boost employee engagement, an enthusiastic committee chair proposes creating a public 'Wall of Shame' displaying names of staff who missed monthly recycling targets. What is HR's role?",
        decisionChoices: [
          { label: "Intervene immediately and redirect the approach toward positive recognition, removing operational friction, and constructive manager coaching", correct: true, feedback: "Outstanding! Public shaming damages psychological safety, creates resentment, and violates HR principles. Sustainable engagement relies on removing barriers and positive recognition." },
          { label: "Support the Wall of Shame because peer pressure is the fastest way to change behavior", correct: false, feedback: "Incorrect. Coercive shaming destroys team morale and leads to hidden waste rather than genuine compliance." },
          { label: "Institute salary deductions for any employee whose name appears on the wall", correct: false, feedback: "Illegal and unethical. Unauthorized punitive salary deductions violate labor standards." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Step-by-Step Implementation: The HR Roadmap",
    minutes: 3,
    content: "Walk through the four-step roadmap to integrate sustainability into HR workflows.",
    blocks: [
      {
        id: "c24-l6-b1",
        type: "heading",
        headingText: "Four-Step HR Implementation Roadmap"
      },
      {
        id: "c24-l6-b2",
        type: "short_text",
        bodyText: "• Step 1: Baseline Assessment: Audit existing onboarding modules, job descriptions, and training records.\n• Step 2: Role-Based Learning Paths: Map relevant ELEVIO courses to job functions (Foundation for all, Role-Specific for specialists).\n• Step 3: Manager Alignment: Equip line supervisors to reinforce habits and provide protected learning time.\n• Step 4: Audit-Ready Governance: Maintain synchronized records connecting learner IDs, course versions, and completion timestamps."
      }
    ]
  }
];

const NEW_QUIZ_QUESTIONS = [
  {
    question: "What is the primary boundary of HR's role in workplace sustainability?",
    options: [
      { text: "HR is an enabler, coordinator, and evidence custodian across the employee lifecycle, but does not own technical environmental engineering or compliance decisions.", isCorrect: true },
      { text: "HR is the sole decision-maker for all facility emissions calculations and hazardous waste permits.", isCorrect: false },
      { text: "HR has no role in sustainability because sustainability only concerns facilities engineering.", isCorrect: false },
      { text: "HR's role is strictly limited to organizing annual corporate social responsibility tree-planting events.", isCorrect: false }
    ],
    correctExplanation: "HR enables training, onboarding, and evidence custody, while technical environmental controls remain with operational and facilities teams.",
    incorrectExplanation: "Incorrect. HR enables people processes and records, but does not replace technical environmental engineering."
  },
  {
    question: "A company sends a PDF sustainability policy attachment by email to all employees and reports a 98% email delivery rate as proof of workforce competence. Why is this insufficient?",
    options: [
      { text: "Email delivery proves transmission, but does not verify accessible learning, operational comprehension, frontline access, or role clarity.", isCorrect: true },
      { text: "Email attachments are legally prohibited in corporate communication under Mauritian labor law.", isCorrect: false },
      { text: "Delivery rates must always exceed 99.9% before a policy can be considered valid.", isCorrect: false },
      { text: "Policies must always be hand-written on recycled parchment paper to be valid.", isCorrect: false }
    ],
    correctExplanation: "Transmission is not comprehension. Effective training requires accessible instruction, time to learn, and verification of understanding.",
    incorrectExplanation: "Incorrect. Email delivery does not prove comprehension or operational implementation."
  },
  {
    question: "According to ISO 14001:2015 Clauses 7.2 and 7.3 principles, what is the relationship between general awareness and technical competence?",
    options: [
      { text: "General awareness ensures employees understand policy and reporting, while technical competence requires specific training and demonstrated capability for tasks with significant environmental impact.", isCorrect: true },
      { text: "General awareness and technical competence are identical and interchangeable.", isCorrect: false },
      { text: "Awareness is required only for board directors, while competence applies only to interns.", isCorrect: false },
      { text: "Competence eliminates the need for any workplace awareness training.", isCorrect: false }
    ],
    correctExplanation: "Awareness builds foundational understanding across the workforce; technical tasks require demonstrated, verifiable competence.",
    incorrectExplanation: "Incorrect. General awareness does not substitute for task-specific technical competence certification."
  },
  {
    question: "What is the most effective and ethical way for HR to support employee engagement in sustainability initiatives?",
    options: [
      { text: "Create accessible learning opportunities, foster psychological safety, recognize positive contributions, and remove operational friction.", isCorrect: true },
      { text: "Publicly post names of employees who miss recycling targets on a 'Wall of Shame'.", isCorrect: false },
      { text: "Deduct money from monthly salaries if departmental energy targets are not met.", isCorrect: false },
      { text: "Force employees to complete training during unpaid personal leave.", isCorrect: false }
    ],
    correctExplanation: "Positive recognition, psychological safety, and removing friction build genuine engagement; punitive shaming backfires.",
    incorrectExplanation: "Incorrect. Coercion and public shaming destroy trust and undermine sustainable workplace culture."
  },
  {
    question: "When drafting job descriptions and recruitment advertisements, what standard must HR uphold regarding sustainability?",
    options: [
      { text: "Ensure environmental claims are factual, verified by policy evidence, and clearly describe actual role-based responsibilities.", isCorrect: true },
      { text: "Use unverified terms like '100% Eco-Friendly' and 'Zero Carbon' on all job posts to attract candidates.", isCorrect: false },
      { text: "Never mention sustainability because candidates are uninterested in corporate values.", isCorrect: false },
      { text: "Copy another company's recruitment brochure word-for-word.", isCorrect: false }
    ],
    correctExplanation: "Recruitment statements must be truthful and grounded in evidence to protect employer credibility and prevent greenwashing.",
    incorrectExplanation: "Incorrect. Unsubstantiated claims in recruitment risk greenwashing and damage employer brand trust."
  },
  {
    question: "Why must employee sustainability training be conducted during paid working hours rather than personal time?",
    options: [
      { text: "It treats sustainability as a legitimate core operational job expectation, complies with fair labor standards, and ensures equal access for all shift workers.", isCorrect: true },
      { text: "It is legally mandatory only for executive directors earning over a certain salary threshold.", isCorrect: false },
      { text: "Employees are not allowed to think about sustainability outside of office buildings.", isCorrect: false },
      { text: "It allows the company to deduct training hours from statutory annual leave.", isCorrect: false }
    ],
    correctExplanation: "Providing training during paid working hours reinforces that sustainability is a core operational duty and complies with labor standards.",
    incorrectExplanation: "Incorrect. Mandatory workplace training must be integrated into paid working schedules."
  },
  {
    question: "What constitutes an audit-ready training evidence record maintained by HR?",
    options: [
      { text: "Verifiable digital records tracking learner identification, course version, completion timestamps, and assessment scores.", isCorrect: true },
      { text: "An unsigned, undated bullet list of departmental staff names.", isCorrect: false },
      { text: "A verbal confirmation from a manager during a lunch break.", isCorrect: false },
      { text: "A photo of employees sitting in an auditorium without an attendance register.", isCorrect: false }
    ],
    correctExplanation: "Audit readiness requires individual learner traceability, timestamped completion records, and assessment verification.",
    incorrectExplanation: "Incorrect. Informal verbal notes or undated lists fail compliance audits."
  },
  {
    question: "How should HR collaborate with line managers when an employee identifies an operational barrier to sustainability (e.g. broken sorting bins or missing PPE)?",
    options: [
      { text: "Facilitate constructive communication between the employee, manager, and facilities to resolve the barrier without blaming the reporting employee.", isCorrect: true },
      { text: "Discipline the reporting employee for causing unnecessary administrative work.", isCorrect: false },
      { text: "Ignore the report because physical equipment issues are outside HR's jurisdiction.", isCorrect: false },
      { text: "Instruct the employee to purchase replacement equipment with their personal money.", isCorrect: false }
    ],
    correctExplanation: "HR supports open feedback loops and psychological safety, enabling cross-departmental resolution of operational obstacles.",
    incorrectExplanation: "Incorrect. Supporting workers who report operational barriers is vital for workplace health, safety, and continuous improvement."
  }
];

export async function ensureSustainabilityForHrTeamsCourse(): Promise<void> {
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
          icon: "users",
          criteriaType: "course_completion",
          threshold: 1,
          courseIds: [actualCourseId],
          orderIndex: 24,
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

      logger.info({ courseId: actualCourseId, slug: COURSE_SLUG }, "Sustainability for HR Teams course v3 seed transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, slug: COURSE_SLUG }, "Failed to ensure Sustainability for HR Teams course seeding");
    throw err;
  }
}
