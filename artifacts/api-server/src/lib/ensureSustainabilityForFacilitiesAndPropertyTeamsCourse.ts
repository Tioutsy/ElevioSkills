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

const COURSE_SLUG = "sustainability-for-facilities-and-property-teams";
const COURSE_TITLE = "Sustainability for Facilities and Property Teams";
const BADGE_SLUG = "sustainable-facilities-practitioner";
const BADGE_CODE = "COURSE_ELH_27_COMPLETE";
const SEED_NAME = "sustainability-for-facilities-and-property-teams-v3";

const COURSE_META = {
  courseCode: "ELH-27",
  description: "Learn how facilities and property teams manage practical workplace sustainability through inspections, maintenance coordination, operational controls, contractor oversight, evidence capture and escalation.",
  fullDescription: "Learn how facilities and property teams manage practical workplace sustainability through inspections, maintenance coordination, operational controls, contractor oversight, evidence capture and escalation without replacing qualified engineers, electricians, plumbers, legal advisers, or fire-safety professionals.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "0.00",
  level: "Applied Workplace Practice",
  isFeatured: false,
  thumbnailUrl: "/images/courses/sustainability-for-facilities-and-property-teams.jpg",
  intendedRoles: [
    "Facilities officers",
    "Facilities managers",
    "Property managers",
    "Maintenance coordinators",
    "Site supervisors",
    "Building administrators",
    "Hotel engineering support employees",
    "Common-area and estate-management employees",
    "Employees coordinating utilities, equipment or contractors"
  ],
  learningObjectives: [
    "Explain how building systems, controls, and maintenance routines influence daily resource efficiency.",
    "Distinguish facilities operational coordination from work requiring qualified engineers, plumbers, electricians, or HSE specialists.",
    "Perform structured site inspections, log defect evidence with photographs, and track meter anomalies.",
    "Distinguish temporary emergency controls from verified corrective action that addresses root causes.",
    "Coordinate contractors effectively using clear scope, work orders, service reports, and completion evidence.",
    "Maintain audit-ready maintenance histories and escalate unresolved or high-risk site defects."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage: "You have completed Sustainability for Facilities and Property Teams. You can now reduce avoidable resource loss, coordinate maintenance and contractors, and keep reliable evidence of building performance.",
  badgeName: "Sustainable Facilities Practitioner",
  badgeDescription: "Awarded for demonstrating practical understanding of how to reduce avoidable resource loss, coordinate maintenance and contractors, and keep reliable evidence of building performance.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Opening Workplace Hook: The Unresolved Water Stain",
    minutes: 3,
    content: "Examine why closing a maintenance ticket without verified completion evidence leads to recurring water loss and unbudgeted repairs.",
    blocks: [
      {
        id: "c27-l1-b1",
        type: "heading",
        headingText: "Opening Workplace Hook: The Unresolved Water Stain"
      },
      {
        id: "c27-l1-b2",
        type: "short_text",
        bodyText: "A commercial mixed-use property in Mauritius experiences a recurring water stain beneath its main plant room and an 18% surge in monthly water bills.\n\nA plumbing contractor was called out, reported that the issue was 'fixed,' and submitted an invoice. However, an operational inspection reveals:\n• No photograph of the repaired pipe or replaced fitting was attached.\n• No post-repair water meter check was conducted.\n• A plastic bucket remains positioned beneath the leaking pipe.\n• The property manager is asked to sign off the maintenance request as 'Completed.'\n\nThis hook demonstrates that visible contractor attendance is not proof of verified problem resolution."
      },
      {
        id: "c27-l1-b3",
        type: "key_message",
        headingText: "Operational Insight",
        bodyText: "Facilities management adds value by verifying site conditions and completion evidence before closing maintenance records or approving contractor invoices."
      },
      {
        id: "c27-l1-d1",
        type: "decision_scenario",
        decisionIntro: "Maintenance contractor sign-off dilemma:",
        decisionPrompt: "A maintenance contractor asks you to sign the job completion sheet for a repaired cooling tower valve so they can catch their next flight. You walk to the plant room and see the floor is still wet and water is dripping at 1 drip every 3 seconds into a drain. What should you do?",
        decisionChoices: [
          { label: "Refuse to sign off the job completion; require the technician to isolate the valve, replace the worn gasket, and demonstrate zero leakage under operating pressure", correct: true, feedback: "Correct! Signing off unverified or leaking work leaves the facility with persistent water waste and waives warranty claims. Verified physical evidence is required before sign-off." },
          { label: "Sign off the completion sheet because the contractor is in a rush and promised to come back next month", correct: false, feedback: "Severe operational failure! Signing off incomplete work releases contractor liability and leaves leaks running." },
          { label: "Smash the cooling tower pipe with a wrench", correct: false, feedback: "Dangerous and destructive! Always require proper technician corrective action." }
        ]
      }
    ]
  },
  {
    order: 1,
    title: "Why Facilities & Property Teams Matter",
    minutes: 3,
    content: "Understand why facilities teams are central to resource efficiency, occupant safety, and asset longevity.",
    blocks: [
      {
        id: "c27-l2-b1",
        type: "heading",
        headingText: "Why Facilities Teams Matter for Sustainability"
      },
      {
        id: "c27-l2-b2",
        type: "short_text",
        bodyText: "Facilities and property teams manage physical site operations where energy, water, and waste occur daily:\n• Personal & Role Value: Clear operational routines protect staff safety and streamline daily maintenance workflows.\n• Business Value: Preventive maintenance prevents catastrophic equipment failure, unbudgeted emergency callouts, and property damage.\n• Environmental Value: Rapid leak repairs, optimized HVAC schedules, and waste area controls reduce environmental impact at scale."
      }
    ]
  },
  {
    order: 2,
    title: "Role Boundaries: Facilities Coordination vs Technical Specialists",
    minutes: 3,
    content: "Establish strict functional boundaries between facilities operational coordination and licensed specialist engineering.",
    blocks: [
      {
        id: "c27-l3-b1",
        type: "heading",
        headingText: "Facilities Role Responsibility & Boundary Matrix"
      },
      {
        id: "c27-l3-b2",
        type: "short_text",
        bodyText: "Facilities staff coordinate and inspect; they do not perform unlicensed technical repairs.\n\nBoundary Matrix:\n• Facilities Owns/Coordinates: Inspection schedules, defect logging, temporary authorized controls, contractor access, meter logs, and completion verification.\n• Facilities Supports: Energy/water reduction projects, contractor scope reviews, and maintenance budget preparation.\n• Qualified Specialist Required: High-voltage electrical work, structural assessments, pressure vessel repairs, refrigerant gas handling, and fire alarm certification."
      },
      {
        id: "c27-l3-d1",
        type: "decision_scenario",
        decisionIntro: "Thermal comfort vs efficiency setpoint dilemma:",
        decisionPrompt: "Two executive tenants in a multi-tenanted commercial office lodge competing complaints: Tenant A complains the office is 'too cold' and wants the AC set to 26°C, while Tenant B sits directly under a sunlit glass window and demands the AC be set to 18°C. How should facilities resolve this?",
        decisionChoices: [
          { label: "Maintain the building standard setpoint at 24°C, adjust airflow diffuser louvers away from Tenant A, and verify window solar film/shading integrity for Tenant B", correct: true, feedback: "Spot on! Lowering central thermostats to 18°C causes massive energy spikes and freezes out other occupants. Professional facilities management adjusts airflow distribution and solar shading while maintaining setpoint discipline." },
          { label: "Lower the central chiller setpoint to 16°C for the whole building to silence Tenant B", correct: false, feedback: "Incorrect. Freezing the building spikes energy bills by 30% and exacerbates Tenant A's discomfort." },
          { label: "Turn off all building air conditioning entirely and tell tenants to open windows on the 8th floor", correct: false, feedback: "Incorrect. Facilities must maintain healthy indoor environmental quality and thermal comfort standards." }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "Plain-Language Facilities Vocabulary",
    minutes: 3,
    content: "Master core facilities terms: preventive vs reactive maintenance, BMS, and root-cause resolution.",
    blocks: [
      {
        id: "c27-l4-b1",
        type: "heading",
        headingText: "Core Facilities Concepts"
      },
      {
        id: "c27-l4-b2",
        type: "short_text",
        bodyText: "• Preventive Maintenance: Scheduled servicing to keep equipment operating efficiently and prevent breakdowns (e.g. quarterly HVAC filter cleaning, belt tensioning).\n• Reactive Maintenance: Repairing equipment after it has already failed (costly, disruptive, high energy waste).\n• BMS (Building Management System): Computerized central controls for HVAC, lighting, and ventilation schedules.\n• Temporary Control vs Root Cause: A bucket catches leaking water (temporary); replacing the cracked copper valve fixes the root cause."
      }
    ]
  },
  {
    order: 4,
    title: "Six Key Facilities Responsibilities for Sustainability",
    minutes: 3,
    content: "Explore the six practical areas where facilities teams drive sustainable performance.",
    blocks: [
      {
        id: "c27-l5-b1",
        type: "heading",
        headingText: "The Six Facilities Operational Pillars"
      },
      {
        id: "c27-l5-b2",
        type: "short_text",
        bodyText: "1. Inspection Routines: Walk site perimeters, plant rooms, and shared amenities weekly with a structured checklist.\n2. Meter Tracking: Log main and sub-meter readings to catch uncharacteristic overnight baseline spikes.\n3. Contractor Scope: Provide precise written scopes and require before-and-after photographs on service sheets.\n4. Defect Prioritization: Prioritize leaks, thermal losses, and electrical faults based on safety and resource impact.\n5. Waste Area Governance: Ensure outdoor bins are clean, segregated, covered, and collected by licensed contractors.\n6. History & Evidence: Maintain digital maintenance logs supporting ISO 14001, ISO 50001, and ISO 55001 audits."
      },
      {
        id: "c27-l5-d1",
        type: "decision_scenario",
        decisionIntro: "Overnight sub-meter anomaly dilemma:",
        decisionPrompt: "During a Monday morning review, facilities discovers the main water sub-meter recorded 1,200 litres per hour continuously between 1:00 AM and 5:00 AM on Sunday when the building was locked. What is the immediate required protocol?",
        decisionChoices: [
          { label: "Initiate immediate leak isolation: walk the main distribution risers, check toilet flapper valves across all floors, inspect cooling tower makeup lines, and review pressure logs", correct: true, feedback: "Outstanding! An overnight baseline surge confirms continuous uncontrolled water loss. Rapid isolation identifies the failure before structural damage or massive utility bills occur." },
          { label: "Wait for the end of the month utility bill to see if the municipal water authority noticed anything", correct: false, feedback: "Severe failure! Waiting weeks allows millions of litres of potable water to be lost to leaks." },
          { label: "Assume the meter was spinning due to wind and ignore the data", correct: false, feedback: "Incorrect. Sub-meters record physical water volume; ignore baseline spikes at your peril." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Step-by-Step Facilities Implementation Roadmap",
    minutes: 3,
    content: "Walk through the four-step roadmap to integrate sustainability into facilities operations.",
    blocks: [
      {
        id: "c27-l6-b1",
        type: "heading",
        headingText: "Four-Step Facilities Implementation Roadmap"
      },
      {
        id: "c27-l6-b2",
        type: "short_text",
        bodyText: "• Step 1: Baseline Walkthrough: Conduct comprehensive energy, water, and waste inspection across all plant rooms and zones.\n• Step 2: Preventative Schedule: Establish calendar intervals for filter changes, coil cleaning, and valve tests.\n• Step 3: Contractor Verification Gate: Never approve invoices without signed service reports, photos, and post-repair checks.\n• Step 4: Continuous Optimization: Review BMS schedules quarterly to ensure heating/cooling timers match actual tenant working hours."
      }
    ]
  }
];

const NEW_QUIZ_QUESTIONS = [
  {
    question: "What is the primary boundary of the facilities team's role in workplace sustainability?",
    options: [
      { text: "Facilities teams manage site inspections, operational controls, contractor coordination, and evidence capture, but must escalate licensed engineering and structural tasks to certified specialists.", isCorrect: true },
      { text: "Facilities staff must personally perform high-voltage transformer wiring repairs without certified electricians.", isCorrect: false },
      { text: "Facilities has no role in sustainability because sustainability only involves marketing campaigns.", isCorrect: false },
      { text: "Facilities teams have the authority to unilaterally cancel municipal water supply contracts without management approval.", isCorrect: false }
    ],
    correctExplanation: "Facilities teams manage daily operational coordination and inspections while delegating specialized technical and structural repairs to certified specialists.",
    incorrectExplanation: "Incorrect. Facilities coordinates maintenance and operations, but licensed technical repairs require certified specialists."
  },
  {
    question: "A maintenance contractor reports that a plant room pipe leak was 'repaired', but a bucket remains underneath the dripping joint. Why must facilities withhold job sign-off?",
    options: [
      { text: "A bucket indicates an active leak and temporary containment, not verified corrective resolution; sign-off requires physical inspection under operating pressure.", isCorrect: true },
      { text: "Buckets are legally prohibited from being inside commercial plant rooms.", isCorrect: false },
      { text: "Sign-offs must always be delayed by exactly 30 days regardless of repair quality.", isCorrect: false },
      { text: "Plumbing repairs can only be approved if the pipe is painted bright green.", isCorrect: false }
    ],
    correctExplanation: "A bucket proves the leak is still active. Sign-off and invoice approval require verified, permanent resolution under operating pressure.",
    incorrectExplanation: "Incorrect. Temporary containment is not verified repair; facilities must confirm the root cause is resolved before signing."
  },
  {
    question: "According to ISO 14001:2015 Clause 8.1 and ISO 55001:2014 standards, what three evidence items must support contractor maintenance sign-off?",
    options: [
      { text: "A specific work order, verified before-and-after photographic evidence of the repair, and documented post-repair meter/pressure verification.", isCorrect: true },
      { text: "A verbal telephone call, a business card, and a handshake.", isCorrect: false },
      { text: "An unitemized invoice total with zero description of work performed.", isCorrect: false },
      { text: "A signed calendar page from the previous year.", isCorrect: false }
    ],
    correctExplanation: "Audit standards require work orders, physical before-and-after photographic evidence, and post-repair operational verification.",
    incorrectExplanation: "Incorrect. Audit-ready maintenance records require work orders, photographic evidence, and operational verification."
  },
  {
    question: "How should facilities handle conflicting tenant thermal comfort complaints while maintaining sustainable energy standards?",
    options: [
      { text: "Maintain the building benchmark setpoint at 24°C, adjust airflow diffuser louvers, inspect solar window shading, and resolve air balancing issues.", isCorrect: true },
      { text: "Lower the entire building thermostat to 16°C to satisfy the loudest occupant.", isCorrect: false },
      { text: "Turn off all building heating and cooling permanently.", isCorrect: false },
      { text: "Advise all complaining tenants to resign from their jobs.", isCorrect: false }
    ],
    correctExplanation: "Air distribution tuning, louver adjustments, and solar shading maintain comfort while preserving 24°C setpoint energy efficiency.",
    incorrectExplanation: "Incorrect. Dropping setpoints to 16°C wastes massive power; proper air balancing and diffuser adjustments solve localized comfort issues."
  },
  {
    question: "What does an unexpected overnight baseline water consumption reading on a Sunday during zero occupancy indicate to facilities?",
    options: [
      { text: "An active plumbing leak, stuck toilet flapper valve, or malfunctioning cooling tower float valve requiring immediate isolation and inspection.", isCorrect: true },
      { text: "Normal behavior because water pipes always breathe at night.", isCorrect: false },
      { text: "That solar panels are generating extra water pressure.", isCorrect: false },
      { text: "That the municipal utility is testing the water for sweetness.", isCorrect: false }
    ],
    correctExplanation: "Overnight baseline flow during unoccupied hours is definitive proof of an active leak or stuck valve in the building network.",
    incorrectExplanation: "Incorrect. Continuous flow during zero-occupancy periods confirms an active leak requiring immediate isolation."
  },
  {
    question: "Why is preventive maintenance (e.g. regular AC filter cleaning and coil servicing) superior to reactive maintenance?",
    options: [
      { text: "It prevents equipment efficiency degradation, avoids high-cost emergency breakdowns, extends asset life, and lowers monthly energy bills.", isCorrect: true },
      { text: "It requires zero labor or time from maintenance personnel.", isCorrect: false },
      { text: "It is legally required to be done only once every 20 years.", isCorrect: false },
      { text: "It guarantees that equipment will never require electricity.", isCorrect: false }
    ],
    correctExplanation: "Clean coils and filters maintain heat transfer efficiency, preventing compressors from overworking and lowering energy draw.",
    incorrectExplanation: "Incorrect. Preventative maintenance keeps equipment operating at peak efficiency, preventing breakdowns and high utility bills."
  },
  {
    question: "What is the role of a Building Management System (BMS) in sustainable facilities operations?",
    options: [
      { text: "It automates and optimizes schedules for HVAC, lighting, and ventilation to align with actual building occupancy and ambient weather conditions.", isCorrect: true },
      { text: "It automatically fires employees who leave lights on.", isCorrect: false },
      { text: "It replaces all physical plumbing pipes with digital cables.", isCorrect: false },
      { text: "It produces artificial clouds over the commercial property.", isCorrect: false }
    ],
    correctExplanation: "A BMS schedules and controls building systems, eliminating after-hours energy waste and optimizing environmental controls.",
    incorrectExplanation: "Incorrect. A BMS automates HVAC and lighting schedules to eliminate waste and match real occupancy patterns."
  },
  {
    question: "How should facilities teams manage outdoor waste storage areas to uphold environmental compliance and pest control?",
    options: [
      { text: "Ensure bins are clearly labelled, covered to prevent rainwater ingress, secured against scavenger pests, and collected by licensed waste operators.", isCorrect: true },
      { text: "Leave open dumpsters overflowing onto surrounding soil and drainage channels.", isCorrect: false },
      { text: "Burn all waste in an open metal drum behind the building every Friday.", isCorrect: false },
      { text: "Wash paint and chemical residues directly into the outdoor stormwater drain.", isCorrect: false }
    ],
    correctExplanation: "Covered, segregated, and secured waste areas prevent storm drain contamination, pest proliferation, and legal non-compliance.",
    incorrectExplanation: "Incorrect. Waste areas must be covered, segregated, and collected by licensed contractors to protect environmental health."
  }
];

export async function ensureSustainabilityForFacilitiesAndPropertyTeamsCourse(): Promise<void> {
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
          icon: "tool",
          criteriaType: "course_completion",
          threshold: 1,
          courseIds: [actualCourseId],
          orderIndex: 27,
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

      logger.info({ courseId: actualCourseId, slug: COURSE_SLUG }, "Sustainability for Facilities and Property Teams course v3 seed transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, slug: COURSE_SLUG }, "Failed to ensure Sustainability for Facilities and Property Teams course seeding");
    throw err;
  }
}
