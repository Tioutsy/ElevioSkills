import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  systemSeedsTable,
  coursePrerequisitesTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

const COURSE_ID = 34;
const COURSE_SLUG = "esg-in-my-job-from-policy-to-everyday-action";
const COURSE_TITLE = "ESG in My Job: From Policy to Everyday Action";
const BADGE_SLUG = "esg-action-practitioner";
const SEED_NAME = "esg-in-my-job-from-policy-to-everyday-action-v2";

const COURSE_META = {
  courseCode: "ELH-34",
  description:
    "Translate ESG policies into practical daily workplace decisions, understand your role-based responsibilities, apply direct actions vs escalation, and build habits that support a responsible organisation.",
  fullDescription:
    "Building directly on ELH-09 (ESG Basics), ELH-31 (Social Responsibility at Work), ELH-32 (Ethics, Governance & Responsible Business), and ELH-33 (ESG Data, Measurement & Reporting Basics), this course serves as the capstone integration point for everyday ESG practice. Discover how Environmental, Social, and Governance considerations appear in ordinary workplace tasks, master the 4-Action Framework (Direct Action, Report/Escalate, Ask for Clarification, Outside My Authority), navigate realistic workplace pressures, and build lasting, role-relevant ESG habits.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Applied Workplace Practice",
  isFeatured: false,
  thumbnailUrl: "/images/courses/esg-in-my-job.jpg",
  intendedRoles: [
    "All employees across all departments",
    "Frontline team members and operational staff",
    "Team leads, supervisors, and department managers",
    "Sustainability champions and green team liaisons"
  ],
  learningObjectives: [
    "Recognise Environmental, Social, and Governance considerations in ordinary daily workplace routines.",
    "Identify specific ESG opportunities and responsibilities relevant to your specific job function.",
    "Master the 4-Action Framework: Direct Action, Report/Escalate, Ask for Clarification, and Outside Authority.",
    "Make defensible, responsible workplace choices when ESG practices compete with time pressure or convenience.",
    "Maintain data and record integrity across operational forms, shift logs, and inventory registers.",
    "Complete 10 scenario-based assessment questions navigating real-world workplace dilemmas."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "Congratulations on completing ESG in My Job: From Policy to Everyday Action! Remember: Environmental = impact on planet, Social = impact on people, Governance = how responsibly the business is run. ESG becomes real when every employee acts within their influence, upholds data accuracy, and speaks up when something needs attention.",
  badgeName: "ESG Action Practitioner",
  badgeDescription:
    "Awarded for demonstrating practical understanding of workplace ESG application, role-based decision-making, and responsible operational habits."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Hook: What Does ESG Have to Do With My Job?",
    minutes: 4,
    content: "Discover how corporate ESG policies connect to everyday workplace choices across all roles.",
    blocks: [
      { id: "ej1-h1", type: "heading", position: 1, headingText: "Bringing ESG Down to Earth" },
      { id: "ej1-t1", type: "short_text", position: 2, bodyText: "At a commercial office and resort complex in Ebène, Mauritius, an employee receives an email announcing a new Corporate ESG Policy. The employee thinks: 'ESG is for executives and legal consultants—it has nothing to do with my daily shift.' Yet during the next hour, they encounter a leaking tap, a coworker dumping mixed trash into clean paper recycling, a request to record unverified numbers, and a safety hazard in a stairwell." },
      {
        id: "ej1-k1",
        type: "key_message",
        position: 3,
        headingText: "Where Does Responsibility Begin & End?",
        bodyText: "• Corporate Leadership: Sets targets, reporting frameworks, compliance programs, and investment budgets.\n• Individual Employees: Bring ESG to life within their daily sphere of influence—saving energy and water, treating coworkers and customers fairly, recording operational facts honestly, and escalating hazards."
      },
      {
        id: "ej1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "First impression challenge:",
        decisionPrompt: "A coworker says: 'Frontline staff shouldn't care about ESG because management owns all company policies.' How should you respond?",
        decisionChoices: [
          { label: "Explain that leadership sets policies, but ESG only becomes real when employees take responsible daily actions like saving resources, working safely, and recording data accurately", correct: true, feedback: "Spot on! Frontline operational choices determine whether corporate ESG commitments succeed in reality." },
          { label: "Agree that frontline staff have zero connection to company performance", correct: false, feedback: "Incorrect. Every employee directly influences energy, water, safety, and governance records." },
          { label: "Say that ESG means frontline staff are personally liable for corporate tax filings", correct: false, feedback: "Incorrect. Legal liability sits with leadership, while operational execution sits with staff." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "The 4-Action Framework for Daily Decisions",
    minutes: 4,
    content: "Master the 4 operational pathways: Direct Action, Report/Escalate, Clarify, or Outside Authority.",
    blocks: [
      { id: "ej2-h1", type: "heading", position: 1, headingText: "The 4-Action Operational Framework" },
      { id: "ej2-t1", type: "short_text", position: 2, bodyText: "When encountering an environmental, social, or governance issue at work, determine which of the four pathways applies:" },
      {
        id: "ej2-k1",
        type: "key_message",
        position: 3,
        headingText: "The 4 Pathways",
        bodyText: "1. DIRECT ACTION (Within My Control): Turn off unused lights/AC, wipe a small water spill on a walkway, sort waste correctly, wear required PPE.\n2. REPORT / ESCALATE (Requires Notification): Major pipe leak, broken machine guard, contractor safety violation, harassment incident, chemical drum leak.\n3. ASK FOR CLARIFICATION (Ambiguity): Conflicting instructions from two managers, unverified data request, unclear vendor specification.\n4. OUTSIDE MY AUTHORITY (Escalate to Specialist): Modifying electrical panels, signing legal contracts, calculating corporate carbon emissions, diagnosing high-voltage equipment."
      },
      {
        id: "ej2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Action framework decision:",
        decisionPrompt: "You discover a high-pressure steam valve hissing loudly with water dripping heavily onto an electrical switchboard in the basement plant room. Which action pathway applies?",
        decisionChoices: [
          { label: "REPORT / ESCALATE: Evacuate the immediate hazard area and notify facilities, maintenance, and the electrical team immediately; this is an imminent life-safety hazard outside general authority", correct: true, feedback: "Correct! High-pressure steam near electrical gear is an imminent life hazard requiring certified technician intervention." },
          { label: "DIRECT ACTION: Grab an adjustable wrench and try to tighten the live steam valve yourself without PPE", correct: false, feedback: "Severe hazard! Attempting unlicensed high-pressure steam repairs risks catastrophic burns and electrocution." },
          { label: "Ignore the hissing sound and hope the next shift notices it", correct: false, feedback: "Dangerous failure! Escalating known severe hazards is a fundamental safety duty." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Everyday Dilemmas: Urgency, Convenience & Policy",
    minutes: 4,
    content: "Navigate trade-offs when operational speed or convenience conflicts with safety and policy.",
    blocks: [
      { id: "ej3-h1", type: "heading", position: 1, headingText: "Handling Real Workplace Pressures" },
      { id: "ej3-t1", type: "short_text", position: 2, bodyText: "In busy operations, pressure to deliver fast often tempts staff to take shortcuts:" },
      {
        id: "ej3-k1",
        type: "key_message",
        position: 3,
        headingText: "Three Common Pressure Pitfalls",
        bodyText: "• Speed vs Safety: Skipping safety harnesses or gloves to finish 5 minutes faster. (Never compromise life safety for speed).\n• Convenience vs Waste Sorting: Dumping contaminated food into clean cardboard recycling because the bin is closer. (Contaminates entire truckloads).\n• Audit Pressure vs Data Falsification: Copying last month's numbers because a log was missed. (Falsification constitutes severe governance misconduct)."
      }
    ]
  },
  {
    order: 3,
    title: "Speaking Up & Psychological Safety",
    minutes: 4,
    content: "How to raise concerns, suggest operational improvements, and protect a culture of transparency.",
    blocks: [
      { id: "ej4-h1", type: "heading", position: 1, headingText: "The Value of Constructive Feedback" },
      { id: "ej4-t1", type: "short_text", position: 2, bodyText: "The best ideas for reducing energy, eliminating waste, and improving safety come from frontline employees who execute the work daily." },
      {
        id: "ej4-k1",
        type: "key_message",
        position: 3,
        headingText: "Constructive Escalation Channels",
        bodyText: "• Daily Stand-Ups & Shift Handovers: Share near-miss observations and resource-saving suggestions.\n• Digital Maintenance Portals: Log leaking fixtures, lighting defects, or temperature anomalies.\n• Confidential Reporting Lines: Escalate unresolved bullying, safety cover-ups, or financial fraud."
      }
    ]
  },
  {
    order: 4,
    title: "Building Lasting Daily Habits",
    minutes: 4,
    content: "Embed simple micro-habits into start-of-shift, mid-shift, and end-of-shift routines.",
    blocks: [
      { id: "ej5-h1", type: "heading", position: 1, headingText: "Micro-Habits for Daily ESG Excellence" },
      { id: "ej5-t1", type: "short_text", position: 2, bodyText: "Sustainability is not an extra task on top of your job—it is how you do your job every day:" },
      {
        id: "ej5-k1",
        type: "key_message",
        position: 3,
        headingText: "Shift Micro-Habits",
        bodyText: "• Shift Start: Inspect workspace PPE, verify clear walkways, check equipment condition.\n• Mid-Shift: Adhere to waste segregation, report meter or leak anomalies, treat teammates and customers with respect.\n• Shift End: Execute shutdown checklist (switch off idle computers, monitors, lights, and AC), secure confidential documents."
      }
    ]
  },
  {
    order: 5,
    title: "Your Personal Workplace ESG Action Plan",
    minutes: 3,
    content: "Select practical commitments to make ESG a reality in your daily work.",
    blocks: [
      { id: "ej6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "ej6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing ESG in My Job: From Policy to Everyday Action! Select the commitments below relevant to your role." },
      {
        id: "ej6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your daily workplace ESG commitments (choose at least one):",
        commitmentOptions: [
          { value: "apply-4-action-framework", label: "Apply the 4-Action Framework: act directly on simple tasks, escalate hazards promptly", description: "Take ownership within your authority." },
          { value: "uphold-safety-first", label: "Never compromise physical safety or PPE standards for speed or convenience", description: "Protect yourself and coworkers from injury." },
          { value: "maintain-record-integrity", label: "Record operational facts, shift logs, and metrics truthfully without guessing", description: "Preserve corporate integrity and data accuracy." },
          { value: "eliminate-resource-waste", label: "Execute end-of-shift shutdown checklists to eliminate idle energy and water waste", description: "Drive continuous environmental savings." },
          { value: "speak-up-constructively", label: "Raise safety concerns, operational barriers, and green ideas through designated channels", description: "Build a proactive, transparent workplace culture." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "How do corporate ESG policies connect to ordinary workplace employees across an enterprise?",
    options: [
      "Leadership sets corporate policies and goals, but ESG is brought to life through the daily operational choices, safety habits, resource conservation, and integrity of all employees",
      "ESG policies only apply to external lawyers and have zero relevance to workplace staff",
      "Employees are legally required to pay corporate fines out of their personal bank accounts",
      "ESG applies exclusively to employees who work on agricultural farms"
    ],
    correct: 0,
    correctExplanation: "Corporate sustainability policies rely directly on daily frontline implementation across all operational roles.",
    incorrectExplanation: "Incorrect. ESG strategy depends on everyday employee actions and responsible habits to succeed."
  },
  {
    order: 2,
    question: "In the 4-Action Framework (Direct Action, Report/Escalate, Clarify, Outside Authority), what is the correct response when encountering an unused conference room air conditioner running at 18°C in an empty room?",
    options: [
      "DIRECT ACTION: Turn off the air conditioner or adjust it to standard setback within your control",
      "OUTSIDE AUTHORITY: Call the national electrical utility emergency hotline",
      "CLARIFY: Convene an emergency all-hands company meeting to discuss room temperatures",
      "REPORT: File a lawsuit against the facility landlord"
    ],
    correct: 0,
    correctExplanation: "Turning off an unused room AC is a simple direct action within any employee's daily control.",
    incorrectExplanation: "Incorrect. Simple operational adjustments within your control should be handled directly."
  },
  {
    order: 3,
    question: "In the 4-Action Framework, how should an employee respond upon discovering an active chemical drum leak near an open drainage channel?",
    options: [
      "REPORT / ESCALATE: Deploy immediate spill containment if trained and safe, and notify the site environmental/facilities lead immediately; complex hazardous leaks require specialist containment",
      "DIRECT ACTION: Wipe the chemical with bare hands and throw it in the office trash",
      "CLARIFY: Post a poll on social media asking if the chemical looks dangerous",
      "OUTSIDE AUTHORITY: Ignore it because only the CEO is allowed to look at chemical drums"
    ],
    correct: 0,
    correctExplanation: "Chemical leaks represent environmental and health hazards requiring immediate containment and specialist escalation.",
    incorrectExplanation: "Incorrect. Complex hazardous chemical leaks must be escalated immediately to trained site specialists."
  },
  {
    order: 4,
    question: "During a busy rush shift, a coworker suggests throwing greasy oily pizza boxes into the clean office paper recycling bin to save a 10-metre walk. What should you do?",
    options: [
      "Intervene and explain that food grease contaminates clean paper recycling batches; place the oily box in general waste and clean paper in the recycling bin",
      "Agree and dump engine oil into the paper recycling bin as well",
      "Burn the pizza box in the middle of the office floor",
      "Hide the pizza box inside a computer printer"
    ],
    correct: 0,
    correctExplanation: "Food oil ruins paper recycling pulp batches, causing entire bins to be rejected and sent to landfills.",
    incorrectExplanation: "Incorrect. Greasy food containers contaminate paper recycling streams and belong in general waste."
  },
  {
    order: 5,
    question: "An employee filling out a daily machine temperature inspection log realizes they forgot to take the 2:00 PM reading yesterday. A colleague says: 'Just copy the 1:00 PM number.' What is the responsible action?",
    options: [
      "Declare the missed reading truthfully, log it as an uncollected data point, and notify the supervisor rather than falsifying records",
      "Copy yesterday's reading and forge the supervisor's initial so nobody notices",
      "Invent a fictional number that makes machine efficiency look 200% higher",
      "Delete the entire digital log database to hide the mistake"
    ],
    correct: 0,
    correctExplanation: "Falsifying records violates data integrity and safety compliance. Missing readings must be recorded transparently.",
    incorrectExplanation: "Incorrect. Falsifying compliance logs is a severe governance breach; declare data gaps honestly."
  },
  {
    order: 6,
    question: "A vendor offers to deliver urgent replacement supplies immediately if an employee bypasses the company's dual-authorization purchase order process. How should the employee handle this?",
    options: [
      "Follow the authorized emergency procurement procedure or secure the required managerial approval; never bypass financial internal controls",
      "Bypass the approval process because speed always overrides financial governance",
      "Pay the vendor with personal cash and conceal the transaction",
      "Cancel all department operations permanently"
    ],
    correct: 0,
    correctExplanation: "Internal financial controls protect the business from fraud; operational urgency must follow approved emergency sign-off paths.",
    incorrectExplanation: "Incorrect. Financial controls must be maintained; use authorized emergency approval channels."
  },
  {
    order: 7,
    question: "What is an effective end-of-shift operational micro-habit that directly supports the Environmental (E) pillar?",
    options: [
      "Executing an end-of-shift shutdown checklist: powering down idle equipment, switching off task lights, shutting workstation screens, and closing window blinds",
      "Leaving all plant machinery running at full throttle overnight",
      "Dumping chemical cleaning residues into the bathroom sink",
      "Throwing working computer monitors into the general trash bin"
    ],
    correct: 0,
    correctExplanation: "Systematic shutdown checklists eliminate unnecessary overnight parasitic energy waste and save operating costs.",
    incorrectExplanation: "Incorrect. End-of-shift shutdown habits eliminate overnight energy waste and ensure site safety."
  },
  {
    order: 8,
    question: "How does treating coworkers, contractors, and customers with dignity, fairness, and active listening relate to ESG?",
    options: [
      "It directly builds an inclusive, psychologically safe workplace under the Social (S) pillar, driving retention and operational excellence",
      "It is an Environmental topic that increases solar panel efficiency",
      "It is a legal tax deduction for corporate entities",
      "It has zero connection to ESG or business performance"
    ],
    correct: 0,
    correctExplanation: "Respectful treatment, inclusion, and psychological safety are core human capital components of the Social pillar.",
    incorrectExplanation: "Incorrect. Fair treatment, inclusion, and psychological safety are foundational Social pillar priorities."
  },
  {
    order: 9,
    question: "What should an employee do when they identify a recurring operational bottleneck that causes massive paper or packaging waste?",
    options: [
      "Raise the issue constructively during team stand-ups or submit a digital improvement proposal with a suggested solution",
      "Complain privately to friends while doing nothing to resolve the issue",
      "Sabotage the packaging machinery to stop production",
      "Shred 500 extra sheets of paper to make the problem worse"
    ],
    correct: 0,
    correctExplanation: "Constructive feedback empowers organizations to optimize workflows, eliminate waste, and reduce operating costs.",
    incorrectExplanation: "Incorrect. Frontline workers should propose practical solutions through constructive team and management channels."
  },
  {
    order: 10,
    question: "Why is 'acting within your sphere of influence' the golden rule of everyday workplace sustainability?",
    options: [
      "Because no single person can solve global climate change alone, but when thousands of employees take consistent responsible daily actions in their specific roles, collective impact is massive",
      "Because employees are legally barred from thinking about anything outside their cubicle",
      "Because only executive board members have spheres",
      "Because computers will automate all environmental tasks next month"
    ],
    correct: 0,
    correctExplanation: "Individual daily micro-actions across energy, water, safety, and governance accumulate into transformative organizational ESG performance.",
    incorrectExplanation: "Incorrect. Consistent responsible actions within each employee's role create massive collective organizational impact."
  }
];

export async function ensureEsgInMyJobCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      let courseId: number;

      const [existingCourse] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, "ELH-34"))
        .limit(1);

      if (existingCourse) {
        courseId = existingCourse.id;
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
            completionMessage: COURSE_META.completionMessage,
            badgeName: COURSE_META.badgeName,
            badgeDescription: COURSE_META.badgeDescription,
            isPublished: true,
            status: "published",
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, courseId));
      } else {
        const [inserted] = await tx
          .insert(coursesTable)
          .values({
            courseCode: COURSE_META.courseCode,
            slug: COURSE_SLUG,
            title: COURSE_TITLE,
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
          })
          .returning({ id: coursesTable.id });
        courseId = inserted.id;
      }

      // Check seed marker
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

      const needsRepair = !existingSeed ||
                          existingLessons.length !== NEW_LESSONS.length ||
                          existingQuizQuestions.length !== NEW_QUIZ.length;

      if (!needsRepair) {
        logger.info({ courseId, slug: COURSE_SLUG }, "ESG in My Job course v2 content integrity verified. Skipping repair...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course 34. Re-seeding course content...");

      // Seed/re-seed lessons with exact position block arrays
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

      // Seed/re-seed quiz questions
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

      // Idempotently seed/update badge definition
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
          orderIndex: 34,
        })
        .onConflictDoUpdate({
          target: badgeDefinitionsTable.slug,
          set: {
            name: COURSE_META.badgeName,
            description: COURSE_META.badgeDescription,
            courseIds: [courseId],
          },
        });

      // Update seed marker version
      if (!existingSeed) {
        await tx.insert(systemSeedsTable).values({
          name: SEED_NAME,
          version: 2,
        });
      } else {
        await tx.update(systemSeedsTable).set({ version: 2 }).where(eq(systemSeedsTable.name, SEED_NAME));
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "ESG in My Job course v2 seed transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure ESG in My Job course seeding");
    throw err;
  }
}
