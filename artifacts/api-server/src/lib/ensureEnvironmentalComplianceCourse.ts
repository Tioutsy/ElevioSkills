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

const COURSE_ID = 10;
const COURSE_SLUG = "environmental-compliance";
const COURSE_TITLE = "Environmental Compliance";
const BADGE_SLUG = "compliance-aware";
const SEED_NAME = "environmental-compliance-v3";
const SKELETON_BADGE_SLUG = "environmental-responsibility";

const COURSE_META = {
  courseCode: "ELH-10",
  description:
    "Learn how environmental laws, permit conditions, company procedures, and operational records work together, and apply STOP–CHECK–CONTROL–RECORD–ESCALATE protocols safely.",
  fullDescription:
    "This foundation course provides employees, supervisors, and operations teams with a practical guide to environmental compliance in Mauritian commercial workplaces. Learn how national environmental protection acts, EIA/PER permit conditions, and internal standard operating procedures connect to daily work, distinguish compliance tiers, preserve audit-ready records, oversee contractor activities, and execute the STOP–CHECK–CONTROL–RECORD–ESCALATE emergency protocol safely.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "ESG and Compliance",
  isFeatured: false,
  thumbnailUrl: "/images/courses/environmental-compliance.jpg",
  intendedRoles: [
    "All employees and operations staff",
    "Facilities, maintenance, and site supervisors",
    "Procurement and contractor management teams",
    "HSE and sustainability working group members"
  ],
  learningObjectives: [
    "Define environmental compliance in plain workplace terms and understand why it protects organizations from legal shutdown.",
    "Distinguish between Statutory Laws, Permit Conditions, Company Procedures, and Voluntary Good Practice.",
    "Identify high-risk workplace situations: uncontained chemical drums, hazardous runoff, missing waste transfer notes, and illegal drain washing.",
    "Apply the 5-step STOP–CHECK–CONTROL–RECORD–ESCALATE operational protocol during environmental incidents.",
    "Maintain audit-ready compliance registers without backdating, guessing, or falsifying inspection logs.",
    "Complete 10 scenario-based assessment questions testing practical compliance dilemmas and contractor oversight."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Environmental Compliance. You can now recognise environmental obligations, distinguish permit conditions from procedures, and apply STOP–CHECK–CONTROL–RECORD–ESCALATE protocols safely.",
  badgeName: "Environmental Compliance Awareness",
  badgeDescription:
    "Awarded for demonstrating practical workplace environmental compliance awareness, understanding permit conditions, preserving evidence, and escalating concerns correctly."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Understanding Workplace Environmental Obligations",
    minutes: 4,
    content: "Learn how environmental obligations apply to daily site operations and why guessing compliance data is dangerous.",
    blocks: [
      { id: "ec1-h1", type: "heading", position: 1, headingText: "Compliance Beyond Legal Jargon" },
      { id: "ec1-t1", type: "short_text", position: 2, bodyText: "On a Monday morning at a commercial loading yard, a site worker notices an unlabelled blue chemical drum leaking fluid near an open storm drain cover, a contractor washing machinery into the drain, an incomplete waste transfer form, and a supervisor asking staff to 'copy last month's figures' for an upcoming inspection. What happens on the ground represents legal risk." },
      { id: "ec1-k1", type: "key_message", position: 3, headingText: "Compliance Is Operational Procedure, Not Guesswork", bodyText: "Environmental compliance means ensuring workplace activities meet established legal laws, site licence conditions, and internal company procedures. Employees do not need to be lawyers, but they must follow approved procedures, log exact facts, and escalate uncertainty." },
      {
        id: "ec1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Evaluating contractor drain scenario:",
        decisionPrompt: "A contractor is preparing to wash oily equipment into an external storm drain behind a facility, claiming 'the water will evaporate in minutes.' What is the correct response?",
        decisionChoices: [
          { label: "Ask the contractor to pause immediately if safe, protect the drain from runoff, and report the concern to the site supervisor", correct: true, feedback: "Correct! Pausing unapproved drain discharges prevents illegal chemical runoff into public waterways and coastal lagoons." },
          { label: "Allow the washing to continue because contractors are solely responsible for their own work", correct: false, feedback: "Incorrect! Companies share site responsibility for contractor activities occurring on their property." },
          { label: "Help the contractor wash the equipment faster so the drain clears before managers arrive", correct: false, feedback: "NEVER assist in illegal effluent discharge into public drains!" }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "The 4 Tiers of Compliance Responsibility",
    minutes: 4,
    content: "Master the distinctions between Legal Requirements, Permit Conditions, Company Procedures, and Good Practice.",
    blocks: [
      { id: "ec2-h1", type: "heading", position: 1, headingText: "Four Levels of Compliance Expectations" },
      { id: "ec2-t1", type: "short_text", position: 2, bodyText: "Environmental compliance expectations fall into four distinct operational tiers:" },
      {
        id: "ec2-k1",
        type: "key_message",
        position: 3,
        headingText: "The Four Tiers",
        bodyText: "1. Legal Requirements: Statutory laws and national regulations (e.g. Environment Protection Act Mauritius bans unpermitted toxic discharges).\n2. Permit or Licence Conditions: Specific binding terms issued to a facility (e.g. EIA / PER licence specifying maximum wastewater discharge volumes).\n3. Company Procedures: Approved internal operational rules (e.g. mandatory chemical drum secondary containment and spill kit protocols).\n4. Good Practice: Voluntary actions exceeding minimum rules to improve environmental resilience."
      },
      {
        id: "ec2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Permit limit dilemma:",
        decisionPrompt: "A facility's environmental permit sets a maximum daily generator run-time limit of 4 hours during normal grid supply. Due to a production rush, a supervisor suggests running the diesel generator for 12 hours. What should the operator do?",
        decisionChoices: [
          { label: "Inform the supervisor of the binding permit condition, refuse unauthorized non-compliant run-times, and escalate to the environmental compliance officer", correct: true, feedback: "Spot on! Permit conditions are legally binding. Breaching operating hours risks statutory enforcement notices, heavy fines, and permit revocation." },
          { label: "Run the generator for 12 hours and disconnect the hour meter so nobody knows", correct: false, feedback: "Severe legal fraud! Tampering with compliance meters is a criminal offense." },
          { label: "Pour water into the diesel tank to make the engine run quieter", correct: false, feedback: "Dangerous and destructive! Always adhere to operating procedures and permit conditions." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Chemical Storage, Spills & Drain Protection",
    minutes: 4,
    content: "Implement secondary containment, spill kits, and hazardous waste storage standards.",
    blocks: [
      { id: "ec3-h1", type: "heading", position: 1, headingText: "Preventing Runoff and Ground Contamination" },
      { id: "ec3-t1", type: "short_text", position: 2, bodyText: "Chemical drums and oils stored without secondary bunding risk catastrophic soil and waterway pollution during tropical rains." },
      {
        id: "ec3-k1",
        type: "key_message",
        position: 3,
        headingText: "Storage & Spills Non-Negotiables",
        bodyText: "• Secondary Containment: All liquid chemicals must sit on bunded spill pallets holding at least 110% of the largest container volume.\n• Clear Labelling & SDS: Every container must have an intact GHS hazard label and Safety Data Sheet accessible nearby.\n• Dedicated Spill Kits: Spill absorbent pads and booms must be stocked and positioned within 10 metres of chemical storage areas."
      }
    ]
  },
  {
    order: 3,
    title: "The 5-Step Incident Protocol: STOP–CHECK–CONTROL–RECORD–ESCALATE",
    minutes: 4,
    content: "Master the standard emergency procedure during an environmental spill or non-compliance discovery.",
    blocks: [
      { id: "ec4-h1", type: "heading", position: 1, headingText: "Emergency Response Protocol" },
      { id: "ec4-t1", type: "short_text", position: 2, bodyText: "When an environmental hazard or leak occurs on site, execute the 5 steps immediately:" },
      {
        id: "ec4-k1",
        type: "key_message",
        position: 3,
        headingText: "The 5 Steps",
        bodyText: "1. STOP: Pause the unsafe activity or isolate the source of the leak safely.\n2. CHECK: Assess safety hazards (toxic fumes, fire risk, PPE required) before approaching.\n3. CONTROL: Deploy spill booms or absorbent pads to protect stormwater drains and unpaved soil.\n4. RECORD: Document the exact time, location, chemical type, estimated volume, and photos.\n5. ESCALATE: Notify the designated site environmental officer and facilities lead immediately."
      }
    ]
  },
  {
    order: 4,
    title: "Contractor Oversight & Audit Evidence Integrity",
    minutes: 4,
    content: "Ensure third-party contractor compliance and preserve auditable environmental logs.",
    blocks: [
      { id: "ec5-h1", type: "heading", position: 1, headingText: "Audit Readiness and Contractor Due Diligence" },
      { id: "ec5-t1", type: "short_text", position: 2, bodyText: "Organizations remain legally responsible for environmental breaches committed by contractors on their premises." },
      {
        id: "ec5-k1",
        type: "key_message",
        position: 3,
        headingText: "Contractor Rules & Evidence Records",
        bodyText: "• Site Induction: Brief contractors on drain protection, waste sorting, and spill reporting before work begins.\n• Waste Transfer Notes: Obtain signed consignment notes from certified waste haulers for all hazardous waste collections.\n• Never Backdate: Falsifying inspection logs or backdating calibration certificates destroys legal credibility and violates compliance."
      }
    ]
  },
  {
    order: 5,
    title: "Your Workplace Environmental Compliance Commitment",
    minutes: 3,
    content: "Select practical commitments to maintain legal compliance and environmental protection in your daily work.",
    blocks: [
      { id: "ec6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "ec6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Environmental Compliance! Select the commitments below relevant to your role." },
      {
        id: "ec6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your workplace compliance commitments (choose at least one):",
        commitmentOptions: [
          { value: "apply-stop-check-control", label: "Apply the STOP–CHECK–CONTROL–RECORD–ESCALATE protocol during spills or environmental risks", description: "Prevent chemical contamination and protect public drains." },
          { value: "never-falsify-logs", label: "Never alter, backdate, or falsify environmental logs or inspection records", description: "Preserve corporate integrity and audit compliance." },
          { value: "protect-storm-drains", label: "Ensure chemicals, oils, and equipment washwater never enter outdoor storm drains", description: "Safeguard local rivers and coral lagoons." },
          { value: "verify-contractor-compliance", label: "Ensure third-party contractors follow site environmental controls and waste procedures", description: "Maintain site due diligence across operations." },
          { value: "maintain-spill-kits", label: "Ensure chemical storage has secondary bunding and stocked spill kits nearby", description: "Be prepared for accidental leaks." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the primary difference between a statutory Legal Requirement and an internal Company Procedure?",
    options: [
      "Legal Requirements are binding national laws (e.g. Environment Protection Act); Company Procedures are internal operational rules established by management to achieve compliance",
      "Legal Requirements apply only to government officials, while Company Procedures apply only to customers",
      "Company Procedures override national laws whenever a production deadline is approaching",
      "There is no difference; both are optional suggestions"
    ],
    correct: 0,
    correctExplanation: "Statutory laws are legally mandated regulations; internal procedures are the specific operational steps created to adhere to those laws.",
    incorrectExplanation: "Incorrect. Laws are statutory mandates; company procedures are internal management controls designed to satisfy legal standards."
  },
  {
    order: 2,
    question: "What is the very first step in the STOP–CHECK–CONTROL–RECORD–ESCALATE protocol when an uncontained chemical leak is discovered?",
    options: [
      "STOP: Safely pause the hazardous activity or isolate the source of the leak to prevent further volume escaping",
      "ESCALATE: Post a video of the spill on social media before telling the supervisor",
      "CONTROL: Wash the spill into the nearest stormwater drain with a high-pressure hose",
      "RECORD: Take 50 photos while allowing the chemical to continue flowing into the soil"
    ],
    correct: 0,
    correctExplanation: "The first action is to STOP the flow safely to prevent expanding the contamination footprint.",
    incorrectExplanation: "Incorrect. The first step is STOP—halt the leak or activity safely before taking further action."
  },
  {
    order: 3,
    question: "Why must chemical spills, oily washwater, or paint residues NEVER be hosed into outdoor stormwater drains?",
    options: [
      "Stormwater drains lead directly into local rivers, wetlands, and coral lagoons without municipal treatment, causing severe toxic pollution",
      "Stormwater drains are reserved exclusively for storing emergency drinking water",
      "Chemicals in drains make the road asphalt too clean for vehicle tires",
      "Hosing chemicals into drains causes solar panels to lose efficiency"
    ],
    correct: 0,
    correctExplanation: "Storm drains discharge untreated surface runoff into waterways. Discharging chemicals into drains is an environmental crime.",
    incorrectExplanation: "Incorrect. Storm drains bypass sewage treatment and flow directly into aquatic ecosystems; never wash chemicals into drains."
  },
  {
    order: 4,
    question: "An environmental auditor arrives, and the Q3 hazardous waste disposal forms are missing. A supervisor tells an employee to 'make up the disposal weights and sign for the contractor.' What should the employee do?",
    options: [
      "Refuse to invent figures or forge signatures; present available verified records, declare the data gap honestly, and notify the environmental manager",
      "Quickly invent numbers and forge the contractor's signature so the folder looks complete",
      "Delete all historical waste files so the auditor has nothing to inspect",
      "Lock the office door and pretend the building is closed"
    ],
    correct: 0,
    correctExplanation: "Falsifying records or forging signatures is criminal document fraud. Data gaps must be declared honestly and investigated.",
    incorrectExplanation: "Incorrect. Never forge signatures or invent compliance data; present verified records and declare gaps transparently."
  },
  {
    order: 5,
    question: "How does third-party contractor management connect to a company's environmental compliance obligations?",
    options: [
      "Organizations maintain site oversight and share legal liability for environmental spills or unlawful dumping committed by contractors on their property",
      "Contractors can do whatever they want on site with zero rules or liability for the host company",
      "Contractors automatically absorb all legal responsibility so host companies never need site controls",
      "Contractors are legally exempt from all environmental legislation in Mauritius"
    ],
    correct: 0,
    correctExplanation: "Host organizations are accountable for site operations and must ensure third-party contractors adhere to environmental permits and procedures.",
    incorrectExplanation: "Incorrect. Host companies share site liability and must supervise contractor environmental compliance."
  },
  {
    order: 6,
    question: "What is the purpose of 'Secondary Containment' (such as bunded spill pallets) under liquid chemical storage regulations?",
    options: [
      "To capture and contain leaks, ruptures, or overflows before hazardous chemicals reach unpaved soil, concrete cracks, or storm drains",
      "To make chemical drums look more colorful in the warehouse",
      "To double the storage capacity of the chemical warehouse",
      "To prevent employees from ever touching the chemicals"
    ],
    correct: 0,
    correctExplanation: "Secondary containment bunds capture liquid leaks from primary containers, preventing soil and water contamination.",
    incorrectExplanation: "Incorrect. Secondary bunds prevent chemical leaks from escaping into soil, groundwater, or drainage networks."
  },
  {
    order: 7,
    question: "A site supervisor discovers that a diesel storage tank's annual pressure integrity test is overdue by two months. What is the required compliance action?",
    options: [
      "Log the non-conformance immediately, schedule an urgent certified inspection, and apply interim risk controls",
      "Change the date on the old inspection certificate to yesterday using a PDF editor",
      "Ignore it because diesel fuel never leaks",
      "Drain all the diesel onto the parking lot gravel to test if the tank is empty"
    ],
    correct: 0,
    correctExplanation: "Overdue inspections must be logged and expedited; altering certificate dates constitutes illegal document forgery.",
    incorrectExplanation: "Incorrect. Overdue compliance checks must be logged and scheduled immediately; altering dates is illegal."
  },
  {
    order: 8,
    question: "What is a 'Waste Transfer Note' (or hazardous consignment manifest) in environmental compliance governance?",
    options: [
      "An official legally binding document tracking the type, quantity, origin, transporter, and authorized disposal destination of hazardous waste",
      "A casual text message sent to a scrap metal dealer",
      "A receipt for buying office coffee supplies",
      "A document that is discarded immediately after printing"
    ],
    correct: 0,
    correctExplanation: "Waste Transfer Notes establish the auditable chain of custody proving hazardous waste was handled and disposed of legally.",
    incorrectExplanation: "Incorrect. Waste Transfer Notes provide verifiable proof of authorized, legal waste transport and disposal."
  },
  {
    order: 9,
    question: "Why must Safety Data Sheets (SDS / MSDS) and GHS hazard labels be accessible at chemical storage locations?",
    options: [
      "They provide essential first-aid, PPE requirements, flammability hazards, and spill neutralization instructions for first responders and workers",
      "They are decorative posters designed to improve warehouse aesthetics",
      "They are written in secret codes only understood by software engineers",
      "They guarantee that chemicals will never evaporate"
    ],
    correct: 0,
    correctExplanation: "Safety Data Sheets provide vital life-safety, PPE, and spill response instructions in the event of worker exposure or leaks.",
    incorrectExplanation: "Incorrect. Safety Data Sheets detail critical hazard information, emergency PPE, and spill control measures."
  },
  {
    order: 10,
    question: "What should an employee do if they observe an ongoing environmental breach that their direct supervisor refuses to correct?",
    options: [
      "Escalate the concern through designated internal HSE compliance channels, the company whistleblower helpline, or legal compliance officers",
      "Help the supervisor conceal the breach from executive management",
      "Resign immediately without telling anyone what happened",
      "Encourage coworkers to cause additional spills"
    ],
    correct: 0,
    correctExplanation: "When line management fails to address environmental non-compliance, employees should use protected compliance escalation or whistleblower channels.",
    incorrectExplanation: "Incorrect. Unresolved compliance breaches should be escalated through designated HSE, compliance, or whistleblower avenues."
  }
];

export async function ensureEnvironmentalComplianceCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 10 by courseCode "ELH-10", slug, or ID
      let course = null;
      
      const [byCode] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, "ELH-10"))
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
        throw new Error("Course 10 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Environmental Compliance course content and v3 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v3 seed detected for Course 10. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "circular-economy-at-work"))
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
          icon: "alert-triangle",
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

      logger.info({ courseId, slug: COURSE_SLUG }, "Environmental Compliance course v3 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Environmental Compliance course seeding");
    throw err;
  }
}
