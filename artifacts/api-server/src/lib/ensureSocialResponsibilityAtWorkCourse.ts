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

const COURSE_ID = 31;
const COURSE_SLUG = "social-responsibility-at-work";
const COURSE_TITLE = "Social Responsibility at Work";
const BADGE_SLUG = "social-responsibility-practitioner";
const SEED_NAME = "social-responsibility-at-work-v2";

const COURSE_META = {
  courseCode: "ELH-31",
  description:
    "Learn how organizational decisions and daily workplace behaviors affect employees, customers, contractors, and local communities under the Social (S) pillar of ESG.",
  fullDescription:
    "This course provides employees, team leads, and managers across all operational roles with a practical, human-centered guide to the Social (S) pillar of ESG. Explore how business decisions impact internal workforce health, psychological safety, and fatigue management, understand human rights and modern slavery due diligence across outsourced contractor chains, safeguard customer privacy and accessibility, and navigate grievance escalation and speaking-up protocols safely.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Applied Workplace Practice",
  isFeatured: false,
  thumbnailUrl: "/images/courses/social-responsibility.jpg",
  intendedRoles: [
    "All employees",
    "Team leads, supervisors, and line managers",
    "HR, health & safety, and administration staff",
    "Customer service and frontline operations staff",
    "Procurement and vendor management teams"
  ],
  learningObjectives: [
    "Explain the Social (S) pillar of ESG in clear workplace language, distinguishing core business ethics from discretionary charity.",
    "Recognise internal workforce priorities: occupational health and safety, psychological safety, reasonable working hours, and inclusion.",
    "Identify human rights due diligence and modern slavery indicators across supply chains and outsourced frontline contractors (security, cleaning, catering).",
    "Safeguard customer privacy, data protection, and accessible non-discriminatory service delivery.",
    "Navigate workplace speaking-up, whistleblower protection, and structured grievance channels safely.",
    "Complete 10 scenario-based assessment questions requiring defensible human-centered workplace decisions."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "Congratulations on completing Social Responsibility at Work! You are now prepared to recognize human impacts in daily operational choices, uphold workplace safety and respect, and champion fair stakeholder practices.",
  badgeName: "Social Responsibility Practitioner",
  badgeDescription:
    "Awarded for demonstrating practical understanding of workplace social responsibility, human-centric decision-making, and stakeholder care."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Who Does This Decision Affect? The 'S' in ESG",
    minutes: 4,
    content: "Understand how everyday operational choices affect people and why social responsibility starts inside core operations.",
    blocks: [
      { id: "sr1-h1", type: "heading", position: 1, headingText: "Everyday Decisions Have Human Consequences" },
      { id: "sr1-t1", type: "short_text", position: 2, bodyText: "At a commercial logistics and service facility, an urgent client order arrives late on a Friday. To hit the delivery bonus, a supervisor considers cancelling mandatory rest breaks and forcing staff to work double shifts across the weekend without safety briefings. What seems like an operational speed decision directly impacts worker fatigue, road safety, error rates, and employee dignity." },
      {
        id: "sr1-k1",
        type: "key_message",
        position: 3,
        headingText: "Core Business Conduct vs Discretionary Charity",
        bodyText: "Social responsibility is NOT about annual charity galas or marketing PR donations. It is about how an organization conducts its core business operations every single day: how it treats workers, protects health, respects customers, manages supply chain labor, and impacts host communities."
      },
      {
        id: "sr1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Social responsibility definition scenario:",
        decisionPrompt: "A colleague remarks: 'Our company donates footballs to local youth clubs every Christmas, so our Social pillar score is completely covered.' How should you respond?",
        decisionChoices: [
          { label: "Explain that the Social pillar evaluates core internal and external operational conduct—worker safety, fair wages, contractor welfare, and customer privacy—which cannot be offset by charity donations", correct: true, feedback: "Correct! Philanthropy does not compensate for unsafe working conditions, forced overtime, or supplier mistreatment in core operations." },
          { label: "Agree that community donations are the only metric evaluated by ESG investors and regulators", correct: false, feedback: "Incorrect. ESG rating frameworks focus primarily on core operational workplace standards and human capital management." },
          { label: "Tell the colleague that companies are legally prohibited from supporting charities", correct: false, feedback: "Incorrect. Charitable giving is positive, but it is distinct from core operational social responsibility." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Internal Workforce: Safety, Fatigue & Psychological Well-being",
    minutes: 4,
    content: "Examine physical safety, manageable workloads, anti-harassment standards, and psychological safety.",
    blocks: [
      { id: "sr2-h1", type: "heading", position: 1, headingText: "Protecting the Workforce" },
      { id: "sr2-t1", type: "short_text", position: 2, bodyText: "A socially responsible employer ensures every employee returns home safely at the end of each shift, works in an environment free from discrimination and harassment, and feels empowered to speak up about safety hazards." },
      {
        id: "sr2-k1",
        type: "key_message",
        position: 3,
        headingText: "Four Pillars of Internal Social Health",
        bodyText: "1. Physical Safety & PPE: Strict adherence to safety protocols, machine guarding, ergonomic workstations, and incident reporting.\n2. Fair Hours & Fatigue Management: Respecting statutory rest periods, overtime limits, and monitoring burnout.\n3. Psychological Safety: An organizational culture where workers can raise errors, near-misses, or concerns without fear of retaliation or humiliation.\n4. Inclusion & Non-Discrimination: Equal opportunity in hiring, promotions, and training regardless of gender, race, age, religion, or disability."
      },
      {
        id: "sr2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Fatigue and safety dilemma:",
        decisionPrompt: "A machine operator has been working continuously for 14 hours due to shift absenteeism and is showing visible signs of severe physical exhaustion while operating heavy hydraulic press machinery. The team is 20 units away from their daily target. What should the shift supervisor do?",
        decisionChoices: [
          { label: "Relieve the operator immediately, assign a fresh qualified colleague or pause the line; worker life and physical safety must never be risked for a production target", correct: true, feedback: "Spot on! Operator fatigue is a leading cause of catastrophic workplace amputations and fatalities. Safety and human well-being take absolute priority over daily quotas." },
          { label: "Give the operator a cup of coffee and demand they push through until the target is hit", correct: false, feedback: "Severe hazard! Caffeine does not cure severe physical fatigue; forcing exhausted staff to run dangerous machines violates occupational safety laws." },
          { label: "Falsify the timecard to hide the 14-hour shift from HR records", correct: false, feedback: "Illegal! Falsifying safety and labor records is a serious governance and regulatory violation." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Contractor Welfare & Modern Slavery Due Diligence",
    minutes: 4,
    content: "Ensure third-party outsourced workers (cleaning, security, catering, construction) receive fair treatment and safe conditions.",
    blocks: [
      { id: "sr3-h1", type: "heading", position: 1, headingText: "Social Responsibility Across the Extended Workforce" },
      { id: "sr3-t1", type: "short_text", position: 2, bodyText: "Many commercial facilities rely on outsourced service providers for cleaning, security guarding, catering, and maintenance. Organizations are responsible for ensuring contractor staff on their premises are treated with dignity and work in safe, legal conditions." },
      {
        id: "sr3-k1",
        type: "key_message",
        position: 3,
        headingText: "Modern Slavery and Fair Labor Red Flags",
        bodyText: "• Wage Deductions & Retained Passports: Subcontractors withholding identity documents or making unauthorized deductions from low-wage workers.\n• Excessive Shifts: Security guards or cleaners working 18-hour continuous shifts without access to drinking water, seating, or hygienic rest amenities.\n• Substandard PPE: Contractors denying their frontline workers basic safety shoes, gloves, or respiratory protection."
      },
      {
        id: "sr3-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "What should a facilities manager do upon noticing that outsourced cleaning staff on site are working with hazardous chemical strippers without basic gloves or eye protection?",
        mcqOptions: [
          "Stop the hazardous task immediately and require the contractor supervisor to provide certified PPE before work resumes",
          "Ignore the situation because contracted cleaners are not direct employees on the company payroll",
          "Deduct money from the cleaning contractor's invoice without addressing the safety hazard",
          "Tell the cleaners to work faster so they are exposed to chemicals for a shorter time"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Host organizations have a legal and ethical duty of care for all workers on their premises. Unsafe work must be stopped immediately.",
        mcqIncorrectExplanation: "Incorrect. Duty of care applies to all workers on site regardless of employment contract structure."
      }
    ]
  },
  {
    order: 3,
    title: "Customer Welfare, Accessibility & Data Privacy",
    minutes: 4,
    content: "Protect customer data rights, prevent misleading marketing, and ensure accessible service delivery.",
    blocks: [
      { id: "sr4-h1", type: "heading", position: 1, headingText: "External People: Customers and Service Users" },
      { id: "sr4-t1", type: "short_text", position: 2, bodyText: "The Social pillar also governs an organization's relationship with its customers and community. Fair treatment, truthful communication, accessibility, and strict privacy protection are core social responsibilities." },
      {
        id: "sr4-k1",
        type: "key_message",
        position: 3,
        headingText: "Customer Social Priorities",
        bodyText: "• Data Privacy & Consent: Strict adherence to data protection acts; customer records must never be sold or shared without clear authorization.\n• Accessible Services: Providing physical access ramps, accessible digital platforms, and supportive assistance for individuals with disabilities.\n• Truthful Commercial Communication: Transparent product terms, fair pricing, and zero deceptive fine print."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Speaking Up & Whistleblower Safety",
    minutes: 4,
    content: "Understand how to report safety hazards, harassment, or labor violations through protected channels.",
    blocks: [
      { id: "sr5-h1", type: "heading", position: 1, headingText: "The Speaking-Up Culture" },
      { id: "sr5-t1", type: "short_text", position: 2, bodyText: "A socially responsible company provides transparent, confidential channels for employees and contractors to report safety risks, bullying, discrimination, or ethical breaches without fear of retaliation." },
      {
        id: "sr5-k1",
        type: "key_message",
        position: 3,
        headingText: "Structured Reporting Channels",
        bodyText: "1. LINE MANAGEMENT: Raise immediate operational safety and workload concerns directly with supervisors.\n2. HR & HEALTH/SAFETY OFFICERS: Escalate workplace conflicts, harassment, or chronic ergonomic hazards.\n3. CONFIDENTIAL ETHICS HELPLINES: Use anonymous whistleblower channels for severe misconduct, retaliation, or senior leadership violations."
      }
    ]
  },
  {
    order: 5,
    title: "Your Workplace Social Responsibility Commitment",
    minutes: 3,
    content: "Select practical commitments to foster safety, dignity, and respect in your daily work routine.",
    blocks: [
      { id: "sr6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "sr6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Social Responsibility at Work! Select the commitments below relevant to your daily role." },
      {
        id: "sr6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your workplace social responsibility commitments (choose at least one):",
        commitmentOptions: [
          { value: "prioritize-physical-safety", label: "Never compromise physical safety or PPE standards for speed or production quotas", description: "Protect yourself and teammates from injury." },
          { value: "foster-respect-inclusion", label: "Treat all colleagues, contractors, and customers with dignity, fairness, and respect", description: "Uphold an inclusive, harassment-free workplace." },
          { value: "speak-up-on-hazards", label: "Report near-misses, fatigue hazards, and safety violations promptly through designated channels", description: "Build a proactive, transparent safety culture." },
          { value: "protect-contractor-welfare", label: "Ensure outsourced workers on site have access to safe conditions, PPE, and basic amenities", description: "Demonstrate due diligence across the extended workforce." },
          { value: "safeguard-customer-privacy", label: "Handle customer and employee personal data securely and strictly according to privacy regulations", description: "Protect stakeholder trust and confidential records." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the core focus of the Social (S) pillar of ESG in plain workplace language?",
    options: [
      "How an organization's core operations treat and impact people—including employees, contractors, customers, and local communities",
      "The amount of money spent on marketing billboards and corporate sports sponsorships",
      "Ensuring that all employees attend mandatory social cocktail parties every Friday",
      "Tracking the total volume of paper recycled in administrative offices"
    ],
    correct: 0,
    correctExplanation: "The Social pillar examines human capital, labor standards, workplace health and safety, contractor welfare, customer rights, and community relations.",
    incorrectExplanation: "Incorrect. The Social pillar evaluates human relationships, safety, fairness, and stakeholder impact across operations."
  },
  {
    order: 2,
    question: "Why can discretionary charitable donations never replace responsible operational labor standards under ESG criteria?",
    options: [
      "Because public charity does not eliminate or offset internal health hazards, worker exploitation, or unfair labor practices in core operations",
      "Because corporate donations to charity are illegal under international trade law",
      "Because investors only care about marketing logos on football jerseys",
      "Because charities refuse to accept funds from profitable businesses"
    ],
    correct: 0,
    correctExplanation: "ESG criteria evaluate how profits are made (fair wages, safe conditions, dignity), not whether a fraction of profit is donated to charity.",
    incorrectExplanation: "Incorrect. Charity cannot compensate for unsafe or exploitative operational working conditions."
  },
  {
    order: 3,
    question: "What is 'psychological safety' in a commercial workplace setting?",
    options: [
      "A culture where employees feel safe to speak up about errors, safety hazards, near-misses, or ethical concerns without fear of humiliation or retaliation",
      "Installing locks on all office doors so nobody can enter",
      "Providing free video games in the employee breakroom",
      "Eliminating all performance targets and deadlines permanently"
    ],
    correct: 0,
    correctExplanation: "Psychological safety empowers employees to raise safety concerns and admit mistakes early, preventing catastrophic accidents.",
    incorrectExplanation: "Incorrect. Psychological safety enables transparent reporting of hazards and near-misses without fear of blame."
  },
  {
    order: 4,
    question: "A line supervisor observes a frontline machine operator who has worked 15 consecutive hours and is visibly nodding off at the controls. What is the correct response?",
    options: [
      "Relieve the operator immediately and ensure a rested qualified team member takes over; physical life and safety must never be sacrificed for quotas",
      "Offer the operator an energy drink and demand they complete the final 50 units",
      "Tell the operator to close their eyes while operating the machine to rest their eyelids",
      "Falsify the shift timecard to hide the 15-hour duration from senior management"
    ],
    correct: 0,
    correctExplanation: "Severe worker fatigue causes severe industrial amputations and fatalities. Operational quotas must never override life safety.",
    incorrectExplanation: "Incorrect. Forcing an exhausted worker to operate dangerous machinery is a severe safety violation."
  },
  {
    order: 5,
    question: "How should an organization treat third-party contracted staff (such as outsourced security guards, cleaners, or canteen workers) operating on its premises?",
    options: [
      "With full duty of care, ensuring they have access to safe working conditions, certified PPE, drinking water, fair rest periods, and clean amenities",
      "As completely disposable labor with zero rights or safety protections",
      "By forbidding them from using staff washrooms or drinking clean water",
      "By confiscating their passports and national identity cards at the security gate"
    ],
    correct: 0,
    correctExplanation: "Due diligence and social responsibility extend to all workers operating on an organization's premises regardless of employment contracts.",
    incorrectExplanation: "Incorrect. Organizations have a duty of care to ensure safe, humane conditions for all contracted workers on site."
  },
  {
    order: 6,
    question: "Which of the following is a major red flag indicating potential modern slavery or labor exploitation in a supplier's contracted workforce?",
    options: [
      "The contractor retains workers' original passports and makes unauthorized deductions that trap workers in continuous debt",
      "Workers are provided with certified safety footwear and paid according to statutory wage rates",
      "Employees receive comprehensive on-the-job safety training in their native language",
      "Workers have access to a clean staff cafeteria and scheduled rest breaks"
    ],
    correct: 0,
    correctExplanation: "Retaining passports, debt bondage, and restricted freedom of movement are definitive indicators of modern slavery and forced labor.",
    incorrectExplanation: "Incorrect. Document retention and debt bondage are clear red flags of forced labor."
  },
  {
    order: 7,
    question: "How does responsible customer data privacy relate to the Social (S) pillar of ESG?",
    options: [
      "Customer personal and financial records are sensitive assets; safeguarding privacy prevents identity theft, fraud, and violations of human rights",
      "Data privacy is purely an IT software issue with no social or ethical relevance",
      "Customer data should be published on public message boards to promote transparency",
      "Selling customer email lists without consent is a recommended way to increase green revenue"
    ],
    correct: 0,
    correctExplanation: "Protecting consumer data, securing confidential records, and obtaining transparent consent are fundamental social responsibility standards.",
    incorrectExplanation: "Incorrect. Safeguarding personal customer data is a core ethical and legal component of stakeholder responsibility."
  },
  {
    order: 8,
    question: "What is the purpose of a confidential whistleblower or grievance mechanism in an enterprise?",
    options: [
      "To provide a secure, protected avenue for workers to report illegal conduct, severe harassment, or safety violations without fear of retaliation",
      "To encourage employees to spread malicious gossip about colleagues' personal lives",
      "To publicly broadcast internal company complaints on television",
      "To replace the national judicial court system entirely"
    ],
    correct: 0,
    correctExplanation: "Whistleblower channels allow organizations to detect and resolve severe misconduct internally while protecting reporting individuals.",
    incorrectExplanation: "Incorrect. Whistleblower mechanisms protect workers who report ethical and safety breaches from retaliation."
  },
  {
    order: 9,
    question: "An employee notices that a coworker with a mobility disability cannot access the team's new second-floor meeting room because the elevator is broken. What should they do?",
    options: [
      "Advocate to relocate the meeting to an accessible ground-floor room and log an urgent repair ticket for the elevator with facilities",
      "Tell the coworker that people with disabilities are not allowed in team meetings",
      "Ignore the issue and hold the meeting without the coworker",
      "Carry the coworker up the stairs by their arms without permission"
    ],
    correct: 0,
    correctExplanation: "Accessible workspaces and inclusive operational adjustments ensure all team members participate fully with dignity and safety.",
    incorrectExplanation: "Incorrect. Relocating meetings to accessible spaces and fixing physical barriers upholds inclusion and dignity."
  },
  {
    order: 10,
    question: "Why does investing in employee well-being, fair compensation, and transparent career progression strengthen long-term business performance?",
    options: [
      "It reduces costly turnover, attracts top talent, boosts productivity, minimizes accident rates, and builds stakeholder trust",
      "It eliminates the need for companies to make a financial profit",
      "It guarantees that no competitor will ever enter the market",
      "It makes physical equipment run without electricity"
    ],
    correct: 0,
    correctExplanation: "Human capital investment drives operational excellence, lowers recruitment costs, fosters innovation, and underpins sustainable growth.",
    incorrectExplanation: "Incorrect. Strong social standards directly improve talent retention, operational safety, and long-term enterprise resilience."
  }
];

export async function ensureSocialResponsibilityAtWorkCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 31 by ID 31 or slug
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
        throw new Error("Course 31 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Social Responsibility course content and v2 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course 31. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "ethics-governance-and-responsible-business"))
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
          icon: "users",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 31,
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

      logger.info({ courseId, slug: COURSE_SLUG }, "Social Responsibility at Work course v2 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Social Responsibility at Work course seeding");
    throw err;
  }
}
