import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  badgeDefinitionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { logger } from "./logger";

const COURSE_ID = 10;
const COURSE_SLUG = "environmental-compliance";
const COURSE_TITLE = "Environmental Compliance";
const BADGE_SLUG = "compliance-aware";
const SEED_NAME = "environmental-compliance-v3";
const SKELETON_BADGE_SLUG = "environmental-responsibility"; // catalogue skeleton slug — do not delete

const COURSE_META = {
  description:
    "Learn how environmental laws, permit conditions, company procedures, and operational records work together, and apply STOP–CHECK–CONTROL–RECORD–ESCALATE protocols safely.",
  fullDescription:
    "This course provides employees across all roles with a practical introduction to environmental compliance in Mauritian workplaces. Learn how statutory requirements, licence conditions, and site procedures connect to daily work, distinguish compliance tiers, preserve evidence, handle spills and contractor risks, and apply the STOP–CHECK–CONTROL–RECORD–ESCALATE protocol safely.",
  categoryId: 1,
  durationMinutes: 18,
  priceUsd: "1400.00",
  level: "ESG and Compliance",
  isFeatured: false,
  thumbnailUrl: "/images/courses/environmental-compliance.jpg",
  learningObjectives: [
    "Explain environmental compliance in plain workplace language.",
    "Distinguish between Legal Requirements, Permit Conditions, Company Procedures, and Good Practice.",
    "Identify common workplace situations that create environmental compliance obligations or runoff risks.",
    "Apply the 5-step STOP–CHECK–CONTROL–RECORD–ESCALATE operational protocol.",
    "Avoid high-risk mistakes such as backdating forms, inventing missing logs, or washing spills into storm drains.",
    "Evaluate role-based micro-decisions across general staff, facilities, procurement, operations, sales, managers, and contractors.",
    "Select one practical workplace compliance commitment to support accurate records and timely escalation."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Environmental Compliance. You can now recognise environmental obligations, distinguish permit conditions from procedures, and apply STOP–CHECK–CONTROL–RECORD–ESCALATE protocols safely.",
  badgeName: "Environmental Compliance Awareness",
  badgeDescription:
    "Awarded for demonstrating practical workplace environmental compliance awareness, understanding permit conditions, preserving evidence, and escalating concerns correctly.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Understanding Workplace Environmental Obligations",
    minutes: 3,
    content: "Learn how environmental obligations apply to daily site operations and why guessing compliance data is dangerous.",
    blocks: [
      { id: "ec1-h1", type: "heading", position: 1, headingText: "Compliance Beyond Legal Jargon" },
      { id: "esg1-t1", type: "short_text", position: 2, bodyText: "On a Monday morning at a Mauritian commercial loading yard, a site worker notices an unlabelled blue chemical drum leaking fluid near an open storm drain cover, a contractor washing machinery into the drain, an incomplete waste transfer form, and a supervisor asking staff to 'copy last month's figures' for an upcoming inspection." },
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
      },
      {
        id: "ec1-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "What is the scope and purpose of this Environmental Compliance course?",
        mcqOptions: [
          "To provide practical workplace awareness on following procedures, preserving evidence, and escalating concerns safely",
          "To certify employees as statutory environmental lawyers qualified to issue government court warrants",
          "To replace all company environmental permits with an online badge",
          "To guarantee that a company will never be inspected by local authorities"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "This course provides general workplace awareness for following procedures, preserving evidence, and escalating concerns safely.",
        mcqIncorrectExplanation: "Incorrect. General compliance training builds practical workplace awareness and reporting habits."
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
        bodyText: "1. Legal Requirements: Statutory laws and national regulations (e.g. Environment Act 2024, Act 3 of 2024, repealing the revoked Environment Protection Act 2002, bans unpermitted toxic discharges).\n2. Permit or Licence Conditions: Specific binding terms issued to a facility (e.g. EIA / PER licence specifying maximum wastewater discharge volumes).\n3. Company Procedures: Approved internal operational rules (e.g. mandatory chemical drum secondary containment and spill kit protocols).\n4. Good Practice: Voluntary actions exceeding minimum rules to improve environmental resilience."
      },
      {
        id: "ec2-f1",
        type: "memorable_fact",
        position: 4,
        headingText: "Did You Know? (Worth Knowing)",
        bodyText: "Under the Environment Act 2024 (Act 3 of 2024, repealing the revoked EPA 2002) and local effluent discharge regulations, Environmental Impact Assessment (EIA) licences contain legally binding self-monitoring conditions. Failing to log required water, waste, or emissions data can trigger statutory stop-notices and severe corporate penalties!"
      }
    ]
  },
  {
    order: 2,
    title: "The STOP–CHECK–CONTROL–RECORD–ESCALATE Protocol",
    minutes: 4,
    content: "Inspect loading yard compliance risks and apply the 5-step operational protocol.",
    blocks: [
      { id: "ec3-h1", type: "heading", position: 1, headingText: "The 5-Step Operational Protocol" },
      { id: "ec3-t1", type: "short_text", position: 2, bodyText: "When encountering an environmental hazard, spill, or contractor risk, apply this 5-step protocol:" },
      {
        id: "ec3-k1",
        type: "key_message",
        position: 3,
        headingText: "STOP–CHECK–CONTROL–RECORD–ESCALATE",
        bodyText: "1. STOP: Pause an unsafe or non-compliant action safely.\n2. CHECK: Review labels, work permits, safety data sheets, or approved site procedures.\n3. CONTROL: Prevent pollution from spreading (e.g. deploy spill kit booms around drains) without taking personal safety risks.\n4. RECORD: Log exact facts, time, place, photos, and container labels accurately.\n5. ESCALATE: Inform the facility lead, environmental coordinator, or supervisor immediately."
      },
      {
        id: "ec3-img1",
        type: "visual_question",
        position: 4,
        imageUrl: "/images/courses/visual-environmental-compliance.png",
        caption: "Service Yard Inspection: Labelled hazardous waste drum on spill pallet (compliant), unlabelled blue drum on pavement leaking fluid near open storm drain (major risk), work permit clipboard, and worker logging photos.",
        imageAlt: "Realistic photograph of a Mauritian commercial service loading yard displaying a yellow hazardous waste drum on a spill pallet, an unlabelled blue drum leaking fluid on bare pavement near an open storm drain, a work permit clipboard, and a facility worker photographing the site to log evidence."
      },
      {
        id: "ec3-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "In the service yard inspection above, what is the most critical immediate action for the leaking blue drum?",
        mcqOptions: [
          "Deploy spill kit absorbent materials to block fluid from entering the open storm drain, log photos, and escalate to the facility lead",
          "Hose down the pavement so the leaking fluid disappears into the storm drain quickly",
          "Kick the drum over to empty it faster before an inspector arrives",
          "Ignore the drum because it has no label"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Preventing fluid from entering storm drains protecting aquatic habitats is top priority, followed by photo logging and escalation.",
        mcqIncorrectExplanation: "Incorrect. Block drains and control spills; never wash chemical leaks into stormwater drains."
      }
    ]
  },
  {
    order: 3,
    title: "Worked Scenario & Inspection Evidence",
    minutes: 4,
    content: "Analyze a worked Mauritian facility scenario and learn how to handle missing data before inspections.",
    blocks: [
      { id: "ec4-h1", type: "heading", position: 1, headingText: "Inspection Readiness & Record Integrity" },
      { id: "ec4-t1", type: "short_text", position: 2, bodyText: "Examine how a Mauritian manufacturing facility prepares for an environmental review:" },
      {
        id: "ec4-w1",
        type: "workplace_example",
        position: 3,
        headingText: "Worked Scenario: Pre-Inspection Audit Request",
        bodyText: "An environmental officer visits a site in 20 minutes. A supervisor asks a staff member to 'copy last month's waste transfer log numbers' because Q4 logs are missing.\n• WRONG ACTION: Copying old figures or backdating forms (Falsification breach).\n• CORRECT ACTION: Search approved archives for missing forms, present verified Q1–Q3 records honestly, declare the Q4 gap, and notify the environmental lead. Honesty preserves legal credibility!"
      },
      {
        id: "ec4-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Handling missing logs scenario:",
        decisionPrompt: "A contractor completes maintenance but forgets to sign the hazardous waste transfer receipt. How should the facility coordinator handle the document?",
        decisionChoices: [
          { label: "Contact the contractor supervisor to obtain the authorized signature and retain the unsigned form in a pending file with an explanatory note", correct: true, feedback: "Correct! Retaining an explanatory note preserves audit trail integrity without falsifying signatures." },
          { label: "Sign the contractor's name yourself so the file looks complete", correct: false, feedback: "NEVER forge or fake signatures on compliance documents! Forging signatures is illegal." },
          { label: "Throw the waste transfer form away so no one sees it was unsigned", correct: false, feedback: "NEVER destroy compliance paperwork! Destroying records violates waste transfer regulations." }
        ]
      }
    ]
  },
  {
    order: 4,
    title: "High-Risk Mistakes & Role-Based Micro-Decisions",
    minutes: 3,
    content: "Avoid prohibited compliance actions and practice role-based decisions across operational departments.",
    blocks: [
      { id: "ec5-h1", type: "heading", position: 1, headingText: "Prohibited Compliance Actions" },
      { id: "ec5-t1", type: "short_text", position: 2, bodyText: "NEVER engage in these four high-risk operational behaviors:" },
      {
        id: "ec5-k1",
        type: "key_message",
        position: 3,
        headingText: "Prohibited Actions",
        bodyText: "• DO NOT invent figures, backdate forms, or falsify environmental logs.\n• DO NOT wash chemical spills, oil, or contaminated washwater into storm drains or soil.\n• DO NOT hide near-miss incidents, unlabelled containers, or contractor breaches.\n• DO NOT make absolute public claims like '100% Legally Compliant' without authorized legal verification."
      },
      {
        id: "ec5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Facilities & Maintenance Micro-Decision:",
        decisionPrompt: "A maintenance technician replaces an AC cooling unit compressor and notices a small refrigerant gas leak, but the site supervisor says 'it is too small to report.' What should the technician do?",
        decisionChoices: [
          { label: "Log the exact leak location and quantity on the maintenance work order and report it to the environmental lead", correct: true, feedback: "Outstanding! Accurate logging and escalation ensure high-impact fluorinated refrigerant leaks are repaired promptly." },
          { label: "Ignore the leak because the supervisor told you it is small", correct: false, feedback: "Incorrect! Fluorinated refrigerants have extreme warming impacts and must be logged and repaired." },
          { label: "Cover the leaking pipe with duct tape and claim the repair is complete", correct: false, feedback: "Duct tape is not an approved refrigerant repair! Report and repair leaks properly." }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Compliance Awareness Commitment & Disclaimer",
    minutes: 3,
    content: "Select practical daily workplace commitments and review the legal compliance awareness disclaimer.",
    blocks: [
      { id: "ec6-h1", type: "heading", position: 1, headingText: "Pledge to Act" },
      { id: "ec6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing the lessons! Select the compliance habits you commit to practice in your daily work routine." },
      {
        id: "ec6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select at least one compliance commitment to adopt in your daily workplace routine:",
        commitmentOptions: [
          { value: "report-spills", label: "Report spills and leaks immediately using the STOP–CHECK–CONTROL–RECORD–ESCALATE protocol", description: "Report all chemical and oil leaks promptly without delay." },
          { value: "protect-drains", label: "Never pour chemicals, oils, or contaminated washwater into stormwater drains", description: "Keep untreated contaminants out of island stormwater drains." },
          { value: "verify-containment", label: "Ensure chemical drums have closed lids and secondary containment pallets", description: "Verify secondary containment for liquid chemicals." },
          { value: "honest-records", label: "Maintain honest, factual records and never falsify or backdate compliance data", description: "Commit to transparency and truthful record keeping." }
        ]
      },
      {
        id: "ec6-t2",
        type: "short_text",
        position: 4,
        bodyText: "DISCLAIMER: This course provides general workplace awareness. Specific legal and permit requirements depend on your facility's operational licences, sector regulations, and official guidance. Consult designated facility managers or legal counsel for formal compliance advice."
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the difference between a Legal Requirement and a Company Procedure?",
    options: [
      "Legal Requirements only apply to police officers; Company Procedures only apply to hotel guests",
      "Company Procedures override national laws whenever a deadline is near",
      "Legal Requirements are binding statutory laws (e.g. Environment Act 2024); Company Procedures are internal operational rules set by management to meet those laws and standards",
      "There is no difference; both are optional suggestions for office workers"
    ],
    correct: 2,
    correctExplanation: "Legal requirements are binding statutory obligations; company procedures are internal controls established to ensure ongoing compliance.",
    incorrectExplanation: "Incorrect. Laws are statutory rules enacted by government; company procedures are internal operational controls.",
    optionFeedback: [
      "Incorrect. Environmental statutes apply to all corporate organisations, managers, and employees.",
      "Incorrect. Internal procedures can never legalize actions prohibited by national law.",
      "Correct. Statutory laws (e.g. Environment Act 2024, Occupational Safety and Health Act 2005) are legally binding; company procedures translate these laws into day-to-day workplace instructions.",
      "Incorrect. Neither laws nor mandatory company procedures are optional suggestions."
    ]
  },
  {
    order: 2,
    question: "What is the first step in the STOP–CHECK–CONTROL–RECORD–ESCALATE protocol when observing an unapproved chemical spill near a drain?",
    options: [
      "STOP: Pause the unsafe or non-compliant activity safely to prevent further spill generation",
      "RECORD: Take 50 photos before telling anyone about the leak",
      "CONTROL: Wash the spill into the drain with a high-pressure hose",
      "ESCALATE: Post a public video online before talking to the site supervisor"
    ],
    correct: 0,
    correctExplanation: "The immediate priority is to pause the activity safely so that no additional volume of pollutant escapes into the environment.",
    incorrectExplanation: "Incorrect. The first step is STOP—pause the activity safely to stop additional pollution.",
    optionFeedback: [
      "Correct. Safely stopping the source (e.g. turning off a pump, setting an upright drum) prevents the spill from growing larger.",
      "Incorrect. While documentation is important later, stopping the active leak comes first.",
      "Incorrect. Hosing chemical spills into drains causes severe environmental pollution and is illegal.",
      "Incorrect. Public broadcasting delays physical containment and bypasses internal emergency response."
    ]
  },
  {
    order: 3,
    question: "Why should chemical spills or contaminated washwater NEVER be hosed into stormwater drains?",
    options: [
      "Hosing water into drains makes the pavement too clean for delivery trucks",
      "Stormwater drains discharge directly into rivers, groundwater, and coastal lagoons without water treatment, causing severe environmental contamination",
      "Stormwater drains are reserved exclusively for drinking water storage",
      "Chemicals in storm drains automatically destroy solar panels"
    ],
    correct: 1,
    correctExplanation: "Unlike municipal sewers, storm drains flow untreated into natural water bodies; hosing chemicals into drains poisons aquatic ecosystems.",
    incorrectExplanation: "Incorrect. Storm drains flow untreated into natural waterways, lagoons, and groundwater.",
    optionFeedback: [
      "Incorrect. Cleanliness is not the issue; toxic runoff destroys ecosystems.",
      "Correct. In Mauritius, storm drains discharge directly into canals, rivers, and coastal lagoons; hosing toxic chemicals down them causes severe environmental destruction.",
      "Incorrect. Storm drains carry untreated surface runoff, not potable drinking water.",
      "Incorrect. Solar panels operate on roofs and have no contact with underground stormwater drains."
    ]
  },
  {
    order: 4,
    question: "An environmental inspector arrives for an unannounced inspection, but the hazardous waste collection log is missing two recent entries. What should the facility team do?",
    options: [
      "Refuse entry to the inspector and lock all facility gates",
      "Quickly backdate fictional numbers into the logbook with a fresh pen",
      "Shred the entire logbook and claim the company opened yesterday",
      "Present existing verified records honestly, explain the administrative gap transparently, and commit to immediate corrective reconciliation"
    ],
    correct: 3,
    correctExplanation: "Integrity and transparency are paramount; falsifying or backdating compliance records is a serious statutory offense.",
    incorrectExplanation: "Incorrect. Present existing records honestly, disclose gaps transparently, and never falsify compliance logs.",
    optionFeedback: [
      "Incorrect. Obstructing an authorized environmental inspector is a statutory offense under the Environment Act 2024.",
      "Incorrect. Falsifying or backdating records constitutes criminal fraud during an official inspection.",
      "Incorrect. Destroying compliance records violates waste tracking regulations and triggers severe penalties.",
      "Correct. Transparent disclosure demonstrates good faith, while immediate corrective reconciliation resolves the administrative documentation gap lawfully."
    ]
  },
  {
    order: 5,
    question: "How does third-party contractor management connect to a company's environmental compliance obligations?",
    options: [
      "Companies carry zero responsibility for anything contractors do on their premises",
      "Companies share legal and operational duty of care for environmental activities, hazardous waste, and discharges occurring on their site",
      "Contractors are legally allowed to dump chemical waste anywhere in Mauritius",
      "Contractors are supervised exclusively by the Ministry of Tourism"
    ],
    correct: 1,
    correctExplanation: "Organisations remain responsible for ensuring third-party contractors follow environmental permits and site safety procedures on their property.",
    incorrectExplanation: "Incorrect. Companies share legal responsibility for contractor activities and environmental compliance on their site.",
    optionFeedback: [
      "Incorrect. Delegating work to a contractor does not eliminate site environmental duty of care.",
      "Correct. Employers must ensure contractors follow site work permits, spill containment rules, and approved waste disposal pathways under the Environment Act 2024 and Waste Management and Resource Recovery Act 2023.",
      "Incorrect. Illegal dumping by contractors exposes both the contractor and the site owner to severe legal prosecution.",
      "Incorrect. Environmental enforcement is governed by the Ministry of Environment and local authorities."
    ]
  },
  {
    order: 6,
    question: "What is the operational purpose of installing secondary containment spill pallets underneath liquid chemical storage drums?",
    options: [
      "To capture leaks, punctures, or valve drips before hazardous liquids reach bare ground, concrete, or stormwater drains",
      "To make the chemical drums look more elevated and decorative for visitors",
      "To allow employees to mix different waste chemicals together in the open air",
      "To prevent chemical drums from being photographed by safety auditors"
    ],
    correct: 0,
    correctExplanation: "Secondary containment bunds capture leaks and failures, preventing chemicals from escaping into permeable soil or surface drains.",
    incorrectExplanation: "Incorrect. Secondary containment captures drips and catastrophic leaks before they reach the ground or drains.",
    optionFeedback: [
      "Correct. Spill pallets provide a secondary containment barrier capable of holding at least 110% of the largest stored container.",
      "Incorrect. Containment is an engineered environmental safeguard, not decorative furniture.",
      "Incorrect. Mixing uncharacterized waste chemicals in open pallets can cause violent chemical reactions and toxic gas release.",
      "Incorrect. Containment facilities should be clearly visible and accessible for routine safety audits."
    ]
  },
  {
    order: 7,
    question: "What distinguishes specific conditions in an Environmental Impact Assessment (EIA) or Preliminary Environmental Report (PER) licence from general environmental guidelines?",
    options: [
      "EIA licence conditions are purely suggestions that companies can ignore without consequence",
      "EIA conditions are written exclusively in Latin and cannot be understood by technicians",
      "EIA and PER conditions are legally binding statutory obligations tailored to that specific facility, and violating them triggers formal notices or closure orders",
      "EIA licences expire automatically every afternoon at 5 PM"
    ],
    correct: 2,
    correctExplanation: "EIA and PER licences grant statutory operating authority under the Environment Act 2024 and contain binding, enforceable conditions.",
    incorrectExplanation: "Incorrect. EIA licence conditions are legally binding statutory terms specific to that licensed facility.",
    optionFeedback: [
      "Incorrect. Violating EIA conditions constitutes a direct violation of the Environment Act 2024.",
      "Incorrect. Licence conditions specify clear operational parameters (e.g. effluent limits, stack emissions, discharge thresholds).",
      "Correct. An EIA/PER licence establishes mandatory operational constraints (e.g. maximum wastewater discharge volume, stack emission limits); breaches trigger stop notices.",
      "Incorrect. Licences remain in force across project lifecycles subject to ongoing compliance and periodic review."
    ]
  },
  {
    order: 8,
    question: "When logging an unexpected environmental incident (such as a diesel spill in a vehicle yard), what evidence should the responder record?",
    options: [
      "Vague rumours heard in the cafeteria three days later",
      "A fictional creative story about how clean the yard was last year",
      "The responder's personal political opinions on climate change",
      "Accurate facts including timestamped photographs, exact physical location, estimated volume, container labels, and containment steps taken"
],
    correct: 3,
    correctExplanation: "Accurate factual evidence supports rapid emergency response, corrective action, and credible statutory reporting.",
    incorrectExplanation: "Incorrect. Log exact facts, timestamped photos, exact location, estimated volume, and containment actions taken.",
    optionFeedback: [
      "Incorrect. Second-hand rumors are unreliable and compromise incident investigation.",
      "Incorrect. Incident reports must state verified facts, not fictionalized statements.",
      "Incorrect. Political opinions are irrelevant to operational incident logs.",
      "Correct. Factual, contemporaneous documentation (photos, time, coordinates, labels, actions) enables technicians to evaluate root causes and prove containment."
    ]
  },
  {
    order: 9,
    question: "Under Section 14 of the Occupational Safety and Health Act 2005 (Act 28 of 2005), what is an employee's statutory duty when discovering an imminent workplace danger?",
    options: [
      "To report forthwith to the employer, supervisor, or safety and health officer any situation presenting an imminent and serious danger to safety and health",
      "To keep the hazard secret so that company insurance premiums do not increase",
      "To resign immediately and seek employment in another country",
      "To attempt dangerous technical repairs without personal protective equipment"
    ],
    correct: 0,
    correctExplanation: "Under Section 14(1)(d) of the Occupational Safety and Health Act 2005 (Act 28 of 2005), employees must report forthwith to their employer, supervisor, or safety and health officer any situation presenting an imminent and serious danger to safety and health.",
    incorrectExplanation: "Incorrect. Section 14(1)(d) of the Occupational Safety and Health Act 2005 mandates that employees report serious and imminent hazards to supervisors or safety officers forthwith.",
    optionFeedback: [
      "Correct. Section 14(1)(d) of OSHA 2005 (Act 28 of 2005) establishes a clear statutory duty for employees to report serious and imminent safety and health hazards forthwith.",
      "Incorrect. Concealing hazards breaches statutory employee obligations under Section 14 of OSHA 2005.",
      "Incorrect. The law protects employees who report safety and health hazards internally through proper channels.",
      "Incorrect. Employees must take reasonable care and wear required PPE, never undertaking reckless repairs."
    ]
  },
  {
    order: 10,
    question: "What are the operational consequences of attempting to conceal an environmental spill or falsify waste manifests compared to prompt reporting?",
    options: [
      "Concealment leads to immediate promotion and financial bonuses",
      "Concealment eliminates all chemical pollution through magic",
      "There is no difference in consequence between honesty and falsification",
      "Concealment allows pollution to spread deeper into groundwater, multiplies cleanup costs, and transforms an accidental spill into serious criminal prosecution"
],
    correct: 3,
    correctExplanation: "Hiding an incident allows contaminants to migrate, turning a manageable local cleanup into an ecological catastrophe with severe legal liabilities.",
    incorrectExplanation: "Incorrect. Concealment turns an accidental spill into criminal prosecution and allows pollution to spread uncontrollably.",
    optionFeedback: [
      "Incorrect. Concealment is grounds for gross misconduct, termination, and statutory prosecution.",
      "Incorrect. Toxic contaminants migrate through soil and groundwater; they do not disappear.",
      "Incorrect. Regulators and courts treat accidental reporting cooperatively, but penalize deliberate concealment with maximum severity.",
      "Correct. Immediate reporting allows rapid containment before pollutants reach aquifers or lagoons; hiding it compounds damage and incurs severe criminal liability."
]
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
        throw new Error("Course ELH-10 / environmental-compliance not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Environmental Compliance course content and v2 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course ELH-10. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "circular-economy-principles"))
        .limit(1);
      const nextCourseId = nextCourse?.id ?? null;

      // 5. Update course record slug, title, and metadata
      await tx
        .update(coursesTable)
        .set({
          title: COURSE_TITLE,
          slug: COURSE_SLUG,
          courseCode: "ELH-10",
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
          icon: "shield-check",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 15,
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

      logger.info({ courseId, slug: COURSE_SLUG }, "Environmental Compliance course v2 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute idempotent seeding/repair of Environmental Compliance course");
  }
}
