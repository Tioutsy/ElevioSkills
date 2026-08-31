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

const COURSE_ID = 3;
const COURSE_SLUG = "energy-efficiency-at-work";
const COURSE_TITLE = "Energy Efficiency at Work";
const BADGE_SLUG = "energy-saver";
const SEED_NAME = "energy-efficiency-at-work-v3";

const COURSE_META = {
  courseCode: "ELH-03",
  description:
    "Help employees identify avoidable workplace energy waste, optimize air-conditioning and lighting habits, manage idle equipment load, and escalate technical issues safely.",
  fullDescription:
    "This comprehensive foundation course provides actionable daily habits and operational protocols to reduce electricity consumption, peak load demand, and utility costs in commercial, retail, hospitality, and light-industrial facilities. Learners discover how to balance thermal comfort with efficiency, eliminate standby and motor idling waste, navigate end-of-day shutdown protocols, and distinguish direct employee actions from technical issues requiring facilities escalation.",
  categoryId: 1,
  durationMinutes: 25,
  priceUsd: "1400.00",
  level: "Foundation",
  isFeatured: false,
  thumbnailUrl: "/images/courses/energy-efficiency.png",
  intendedRoles: [
    "All employees",
    "Office and administrative staff",
    "Retail and hospitality team members",
    "Frontline and facilities coordinators",
    "Team leaders and supervisors"
  ],
  learningObjectives: [
    "Identify common sources of avoidable workplace electricity waste in cooling, lighting, and powered equipment.",
    "Apply the 24°C thermal comfort benchmark and maintain building envelope containment.",
    "Recognise and eliminate standby ('vampire') power and motor idle waste during non-operational hours.",
    "Distinguish between direct employee actions, standard operating procedures, and professional maintenance escalation.",
    "Follow safe end-of-day shutdown checklists without disrupting critical systems or food/data safety.",
    "Execute realistic decision scenarios balancing occupant comfort, operational urgency, and energy stewardship."
  ],
  includesCertificate: true,
  passingScore: 80,
  badgeName: "Energy Smart at Work",
  badgeDescription: "Awarded for demonstrating practical understanding of workplace energy conservation, equipment efficiency, and safe escalation protocols."
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Workplace Energy: Where Does It Go?",
    minutes: 4,
    content: "Understand primary commercial energy consumers and establish the golden rule of operational safety.",
    blocks: [
      { id: "ee1-h1", type: "heading", position: 1, headingText: "Arriving at an Empty Facility" },
      { id: "ee1-t1", type: "short_text", position: 2, bodyText: "Imagine arriving at your workplace early in the morning. The main work areas are empty, yet overhead fixtures are fully illuminated, air-conditioning units are running at maximum capacity next to an open balcony or loading dock door, and several high-draw appliances are glowing in standby. Energy waste in commercial buildings is rarely intentional—it is the result of unexamined habits, lack of clear ownership, and missing shutdown routines." },
      { id: "ee1-k1", type: "key_message", position: 3, headingText: "Core Rule: Safety and Continuity Take Priority", bodyText: "Workplace energy efficiency means achieving full operational performance while eliminating waste. Safety lighting, cold-chain food refrigeration, IT server ventilation, and occupational health requirements MUST never be compromised to save power." },
      {
        id: "ee1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Morning arrival decision scenario:",
        decisionPrompt: "You enter an unoccupied meeting suite at 8:00 AM. Overhead recessed panel lights are on full brightness, but the room is not booked until 11:00 AM. What is the most appropriate action?",
        decisionChoices: [
          { label: "Switch off the room lights immediately using the wall switch", correct: true, feedback: "Correct! Switching off lighting in empty, unbooked meeting spaces is a safe, direct habit that immediately reduces unnecessary kilowatt-hour consumption." },
          { label: "Leave the lights on because someone might walk in before 11:00 AM", correct: false, feedback: "Incorrect. Leaving unoccupied rooms lit for hours creates continuous baseline waste. It takes seconds to switch lights back on when a meeting actually starts." },
          { label: "Locate the main electrical distribution panel and turn off the breaker", correct: false, feedback: "Prohibited! General employees must never open or switch electrical distribution panels. Always use standard wall switches." }
        ]
      },
      {
        id: "ee1-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "What is the true definition of workplace energy efficiency?",
        mcqOptions: [
          "Achieving required business output, comfort, and safety while eliminating avoidable energy waste",
          "Switching off all electrical equipment indiscriminately regardless of business continuity",
          "Setting air conditioning to the absolute lowest setting to cool rooms faster",
          "Disconnecting network routers and food storage refrigerators overnight"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Energy efficiency focuses on delivering business goals with minimum wasted energy while protecting safety, comfort, and productivity.",
        mcqIncorrectExplanation: "Incorrect. Efficiency is not about indiscriminate deprivation; it is about eliminating unneeded resource waste."
      }
    ]
  },
  {
    order: 1,
    title: "Air Conditioning, Ventilation & Envelope Control",
    minutes: 4,
    content: "Master cooling efficiency, thermostat setpoints, and thermal envelope discipline in tropical and warm climates.",
    blocks: [
      { id: "ee2-h1", type: "heading", position: 1, headingText: "The Single Largest Electricity Consumer" },
      { id: "ee2-t1", type: "short_text", position: 2, bodyText: "In commercial and office facilities across warm and island climates, HVAC (Heating, Ventilation, and Air Conditioning) represents between 45% and 65% of the total monthly electricity bill. Simple operational habits dramatically influence compressor run-time." },
      { id: "ee2-k1", type: "key_message", position: 3, headingText: "The 24°C Comfort Benchmark & The Cooling Myth", bodyText: "Setting thermostats to 24°C provides ideal indoor thermal comfort and healthy humidity control while preventing compressor overload. Myth: Setting an AC unit to 16°C or 18°C does NOT cool a warm room any faster—AC systems deliver air at a fixed temperature; setting a lower target merely forces the compressor to run continuously without cycling off, spiking power draw by up to 20–30%." },
      {
        id: "ee2-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Thermal envelope dilemma:",
        decisionPrompt: "You enter a customer service area where the split-unit AC is set to 20°C and blowing heavily, but the external double door has been propped open with a chair 'to let fresh air in'. The room feels humid and warm. What should you do?",
        decisionChoices: [
          { label: "Remove the door prop, close the door completely, and verify the AC is set to 24°C", correct: true, feedback: "Spot on! An open envelope allows hot, humid outdoor air to flood the space, forcing the compressor to run at 100% capacity continuously while failing to cool the room. Sealing the envelope restores comfort and efficiency." },
          { label: "Lower the AC remote setting to 16°C and increase fan speed to fight the outdoor heat", correct: false, feedback: "Incorrect. Lowering the setpoint with an open door guarantees compressor freeze-up or burnout while wasting massive amounts of power." },
          { label: "Leave the door open and turn off the AC entirely so people can sweat naturally", correct: false, feedback: "Incorrect. Professional workplace standards require providing reasonable thermal comfort for staff and clients through proper envelope management." }
        ]
      }
    ]
  },
  {
    order: 2,
    title: "Managing Equipment, Idling Load & Standby Waste",
    minutes: 4,
    content: "Tackle 'vampire' standby power, motor idling in operational areas, and equipment shutdown discipline.",
    blocks: [
      { id: "ee3-h1", type: "heading", position: 1, headingText: "Vampire Power and Idling Machines" },
      { id: "ee3-t1", type: "short_text", position: 2, bodyText: "Electricity waste is not limited to air conditioners and lighting. Office electronics, AV screens, commercial coffee machines, conveyor belts, air compressors, and workshop motors frequently draw power during hours when no productive work is occurring." },
      {
        id: "ee3-f1",
        type: "memorable_fact",
        position: 3,
        headingText: "Standby and Idling Facts",
        bodyText: "According to the International Energy Agency (IEA), standby power accounts for 8% to 15% of commercial plug load. In operational and warehouse settings, leaving electric forklifts on non-smart chargers or running extraction fans across empty shifts adds thousands of kilowatt-hours to the monthly bill."
      },
      {
        id: "ee3-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Operational equipment scenario:",
        decisionPrompt: "At 5:30 PM, a frontline team finishes packaging for the day. The electric heat-sealing machine and conveyor line are left powered on 'in case another small order comes in tomorrow morning at 8:00 AM'. What is the correct standard operating practice?",
        decisionChoices: [
          { label: "Follow the standard shutdown procedure and power down the sealer and conveyor at the end of the shift", correct: true, feedback: "Excellent! Thermal sealers and motorized conveyors consume substantial idle power and present unnecessary overnight fire and wear risks. Powering them off takes seconds and saves significant energy." },
          { label: "Leave them running overnight so they are hot and ready at 8:00 AM", correct: false, feedback: "Incorrect. Heating elements and idling motors should never run unattended overnight. Pre-heating takes only 5–10 minutes in the morning." },
          { label: "Unplug the facility's main electrical transformer", correct: false, feedback: "Incorrect and dangerous! Follow standard equipment switch-off procedures." }
        ]
      }
    ]
  },
  {
    order: 3,
    title: "Lighting Optimization & Natural Daylighting",
    minutes: 4,
    content: "Leverage natural daylighting, zone switching, and task lighting to cut lighting electricity by up to 50%.",
    blocks: [
      { id: "ee4-h1", type: "heading", position: 1, headingText: "Smart Lighting Principles" },
      { id: "ee4-t1", type: "short_text", position: 2, bodyText: "Modern commercial spaces often have banks of switches that control massive lighting zones. Employees frequently turn on all zones by default, even when bright sunlight is streaming through perimeter windows." },
      {
        id: "ee4-k1",
        type: "key_message",
        position: 3,
        headingText: "Daylight Harvesting and Zoned Control",
        bodyText: "1. Daylighting: If perimeter desks receive ample natural sunlight, keep the perimeter light bank switched off while illuminating interior zones.\n2. Task Lighting: Use focused task lights for detailed work rather than over-illuminating an entire floor.\n3. Shared Amenities: Washrooms, copy rooms, storage areas, and archives should only be illuminated while occupied."
      },
      {
        id: "ee4-m1",
        type: "multiple_choice",
        position: 4,
        mcqQuestion: "What is the most energy-efficient way to manage lighting in an open-plan office with large exterior windows?",
        mcqOptions: [
          "Utilize natural daylight for perimeter desks and only switch on interior zone lights as needed",
          "Keep blinds permanently shut and turn on 100% of ceiling panel lights all day",
          "Remove all light bulbs from the ceiling and work in complete darkness",
          "Leave corridor and storeroom lights on 24 hours a day including weekends"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Daylight harvesting utilizes free natural light while selectively illuminating only darker interior workstations.",
        mcqIncorrectExplanation: "Incorrect. Relying on daylighting for perimeter areas saves energy and improves employee visual comfort."
      }
    ]
  },
  {
    order: 4,
    title: "Action Boundaries: Act, Check & Escalate",
    minutes: 4,
    content: "Categorize energy actions into direct personal habits, procedural checks, and technical maintenance escalation.",
    blocks: [
      { id: "ee5-h1", type: "heading", position: 1, headingText: "Action Framework: Knowing Your Boundaries" },
      { id: "ee5-t1", type: "short_text", position: 2, bodyText: "Saving power requires knowing what you should do personally versus what requires checking standard procedures or reporting to facilities engineers." },
      {
        id: "ee5-k1",
        type: "key_message",
        position: 3,
        headingText: "The Three Action Boundaries",
        bodyText: "1. ACT DIRECTLY: Switch off lights in empty rooms, turn off personal monitors, close open windows/doors in AC zones, select 24°C on remotes.\n2. CHECK PROCEDURES: Verify shutdown protocols for shared departmental printers, network copiers, packaging lines, and showroom displays.\n3. ESCALATE TO FACILITIES: Report leaking AC condensate pipes, rattling blower motors, broken door weatherstrips, faulty occupancy sensors, or thermostat error codes."
      },
      {
        id: "ee5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "End-of-day shared workspace scenario:",
        decisionPrompt: "You are leaving work on a Friday evening. You notice: (1) your workstation monitor is glowing, (2) the shared department printer is idle, and (3) an AC unit in the hallway is vibrating loudly and dripping water onto the carpet. What is the correct combined response?",
        decisionChoices: [
          { label: "Turn off your personal monitor, follow site shutdown for the printer, and immediately log a maintenance ticket with facilities for the dripping AC unit", correct: true, feedback: "Outstanding! This perfectly executes personal action, procedural respect, and timely technical escalation before the weekend." },
          { label: "Unplug the dripping AC unit from the ceiling wiring and attempt to dismantle the water pump yourself", correct: false, feedback: "Dangerous! Never attempt electrical or mechanical repairs. Escalate technical faults to trained maintenance personnel." },
          { label: "Ignore the leak, leave your monitor on, and assume the Monday cleaners will deal with it", correct: false, feedback: "Incorrect. Unreported leaks cause property damage, mold, and severe equipment energy waste over the weekend." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Daily Workplace Energy Commitment",
    minutes: 3,
    content: "Select practical daily energy habits and establish an ongoing routine for your role.",
    blocks: [
      { id: "ee6-h1", type: "heading", position: 1, headingText: "Pledge to Act & Operational Takeaways" },
      { id: "ee6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing Energy Efficiency at Work! Review the practical workplace habits below and choose the commitments relevant to your daily role." },
      {
        id: "ee6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your workplace energy commitments (choose at least one):",
        commitmentOptions: [
          { value: "switch-empty-lights", label: "Switch off lights in unoccupied rooms, meeting spaces, and break areas", description: "Eliminate lighting waste when vacating shared rooms." },
          { value: "keep-windows-closed", label: "Keep windows and external doors closed while air conditioning is active", description: "Preserve building thermal envelope and protect compressors from overwork." },
          { value: "ac-24-degrees", label: "Maintain AC thermostat setpoints around 24°C", description: "Avoid excessively low temperature settings that spike energy use without speeding cooling." },
          { value: "shutdown-pc", label: "Shut down personal workstation monitors and idle accessories at end of day", description: "Eliminate overnight standby power draw on personal equipment." },
          { value: "report-faulty-controls", label: "Report leaking AC units, broken door seals, or faulty controls promptly", description: "Ensure facilities can resolve technical inefficiencies quickly." }
        ]
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the primary objective of workplace energy efficiency?",
    options: [
      "Achieving required business output, safety, and comfort while systematically eliminating avoidable energy waste",
      "Switching off all building power indiscriminately regardless of business continuity or data safety",
      "Setting thermostats to 16°C to cool spaces in half the time",
      "Disconnecting critical IT server racks and food storage refrigerators every evening"
    ],
    correct: 0,
    correctExplanation: "Energy efficiency focuses on delivering business goals with minimum wasted energy while protecting safety, comfort, and productivity.",
    incorrectExplanation: "Incorrect. Efficiency is about eliminating avoidable waste, not disrupting critical systems or compromising safety."
  },
  {
    order: 2,
    question: "Why does keeping windows and external doors closed matter when air conditioning is running?",
    options: [
      "It prevents conditioned cold air from escaping and warm humid outdoor air from overloading the cooling compressor",
      "It ensures the building is completely airtight and eliminates all internal ventilation",
      "It is required exclusively for municipal noise abatement regulations",
      "It increases the transmission speed of office computer networks"
    ],
    correct: 0,
    correctExplanation: "An open envelope allows warm, humid air into the space, forcing AC compressors to run continuously at 100% load without reaching the target temperature.",
    incorrectExplanation: "Incorrect. Open windows cause severe cooling leakage, humidity build-up, and compressor strain."
  },
  {
    order: 3,
    question: "What happens when an employee sets an air conditioner thermostat to 16°C on a hot afternoon instead of the standard 24°C benchmark?",
    options: [
      "The AC delivers air at the exact same cooling temperature, but the compressor is forced to run continuously without cycling off, spiking power consumption by 20–30%",
      "The AC unit blows air twice as fast and reaches a comfortable temperature in 3 minutes",
      "The building's electrical meters automatically disconnect from the grid",
      "The air conditioning system consumes less electricity because the fan operates at high pressure"
    ],
    correct: 0,
    correctExplanation: "AC units supply air at a constant output temperature. Setting a lower setpoint does not cool the room any faster; it only prevents the compressor from cycling off.",
    incorrectExplanation: "Incorrect. AC systems do not blow colder air when set to 16°C; they just run continuously, wasting massive amounts of electricity."
  },
  {
    order: 4,
    question: "What is standby or 'vampire' power draw in a commercial workplace?",
    options: [
      "Electricity continuously consumed by electronic appliances and displays while plugged in but sitting idle or in sleep mode",
      "Power drawn exclusively by industrial renewable solar generation facilities",
      "Electricity consumed by safety emergency lighting during power cuts",
      "Power delivered to commercial electric vehicle fast-chargers"
    ],
    correct: 0,
    correctExplanation: "Standby power refers to the continuous background electricity drawn by displays, converters, chargers, and appliances when not actively performing work.",
    incorrectExplanation: "Incorrect. Standby power is the continuous background draw of idle electronics and appliances."
  },
  {
    order: 5,
    question: "Which of the following equipment must NEVER be switched off or unplugged by general employees during end-of-day shut-downs?",
    options: [
      "Critical commercial food refrigerators, IT server racks, or equipment marked 'DO NOT UNPLUG'",
      "Individual desktop monitors at your personal workstation",
      "Overhead lighting in an unoccupied conference room",
      "Desk task lamps in an empty office"
    ],
    correct: 0,
    correctExplanation: "Refrigerators, server infrastructure, and safety equipment must remain powered continuously to prevent spoilage, data loss, and safety failures.",
    incorrectExplanation: "Incorrect. Critical refrigeration and server equipment must never be disconnected by general staff."
  },
  {
    order: 6,
    question: "A staff member notices an air conditioning unit in a shared hallway is dripping water onto the carpet and vibrating unusually. What is the correct response?",
    options: [
      "Report the technical fault and location immediately to the facilities/maintenance team through the official ticketing channel",
      "Open the unit's electrical wiring panel and attempt to clear the condensate pump with a screwdriver",
      "Ignore the issue and assume the building cleaners will resolve it next week",
      "Unplug the entire floor's main electrical breaker panel"
    ],
    correct: 0,
    correctExplanation: "Technical maintenance, mechanical vibration, and water leaks require trained facilities escalation—never DIY electrical repairs.",
    incorrectExplanation: "Incorrect. Technical faults must be escalated to facilities staff for safe professional repair."
  },
  {
    order: 7,
    question: "How should lighting be managed in an open-plan office where large perimeter windows provide abundant natural daylight?",
    options: [
      "Turn off the perimeter lighting bank and utilize natural daylighting, while keeping interior zone lights on as needed",
      "Keep window blinds closed and turn on all ceiling lights at maximum brightness all day",
      "Remove all light bulbs from the building and work in complete darkness",
      "Leave corridor and meeting room lights running 24 hours a day including weekends"
    ],
    correct: 0,
    correctExplanation: "Daylight harvesting utilizes natural light for perimeter desks while selectively illuminating only darker interior zones.",
    incorrectExplanation: "Incorrect. Utilizing daylight harvesting cuts lighting electricity by up to 50% without compromising visual comfort."
  },
  {
    order: 8,
    question: "At the end of a shift, an operational team has finished using an electric packaging sealer and conveyor line. What is the most energy-responsible action?",
    options: [
      "Follow the standard shutdown checklist to power off the machine and conveyor, eliminating idle energy waste and fire risk",
      "Leave both machines running overnight so they are pre-heated for tomorrow morning",
      "Disconnect the building's main incoming utility power cable",
      "Leave the conveyor running but increase the speed to maximum overnight"
    ],
    correct: 0,
    correctExplanation: "Operational equipment should be powered down according to standard procedures at shift end to eliminate idle power waste and overnight risks.",
    incorrectExplanation: "Incorrect. Idling machines waste substantial power overnight; pre-heating only takes minutes at start of shift."
  },
  {
    order: 9,
    question: "Which of the following actions represents an appropriate DIRECT habit for an individual employee?",
    options: [
      "Switching off personal workstation monitors and lights when leaving an empty meeting room",
      "Re-wiring building thermostats to bypass temperature limiters",
      "Purchasing industrial variable speed drives without procurement approval",
      "Adjusting the high-voltage chiller refrigerant pressure in the basement plant room"
    ],
    correct: 0,
    correctExplanation: "Direct employee actions include personal equipment shutdown, lighting controls in empty rooms, and closing doors/windows.",
    incorrectExplanation: "Incorrect. Plant room operations and electrical modifications are strictly restricted to certified facilities engineers."
  },
  {
    order: 10,
    question: "Why is an ongoing 'Act, Check, Escalate' routine more effective than an occasional one-off energy campaign?",
    options: [
      "It embeds daily habits into operational culture, clarifies role boundaries, and ensures maintenance issues are promptly fixed rather than ignored",
      "It eliminates the need for facilities engineers or building maintenance teams entirely",
      "It allows an organisation to operate with zero electricity consumption",
      "It replaces all legal compliance requirements under national energy acts"
    ],
    correct: 0,
    correctExplanation: "Continuous daily habits, procedural clarity, and timely maintenance escalation deliver sustained energy savings and prevent recurring waste.",
    incorrectExplanation: "Incorrect. Systematic habits create permanent operational improvements without disrupting necessary business functions."
  }
];

export async function ensureEnergyEfficiencyCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 3 by ID 3 or slug
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
        throw new Error("Course 3 not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Energy Efficiency course content and v3 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v3 seed detected for Course 3. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "water-conservation"))
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
          icon: "zap",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 8,
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

      logger.info({ courseId, slug: COURSE_SLUG }, "Energy Efficiency at Work course v3 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err, courseId: COURSE_ID }, "Failed to ensure Energy Efficiency at Work course seeding");
    throw err;
  }
}
