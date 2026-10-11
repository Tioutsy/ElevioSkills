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

const COURSE_ID = 11;
const COURSE_SLUG = "circular-economy";
const COURSE_TITLE = "Circular Economy";
const BADGE_SLUG = "circular-economy-practitioner";
const SEED_NAME = "circular-economy-v3";
const SKELETON_BADGE_SLUG = "circular-economy-badge"; // catalogue skeleton slug — do not delete

const COURSE_META = {
  description:
    "Learn how workplaces can prevent waste, extend product useful life, retain material value, and make circular operational decisions beyond basic recycling.",
  fullDescription:
    "This course provides employees across all roles with a practical, workplace-focused introduction to circular economy principles. Learn how organizations transition from linear 'take-make-dispose' habits to value-retention practices, apply the 9-step Circular Value Hierarchy, execute the CHECK–USE–CARE–SHARE–RECOVER protocol, and protect product safety and data security.",
  categoryId: 1,
  durationMinutes: 18,
  priceUsd: "1400.00",
  level: "ESG and Compliance",
  isFeatured: false,
  thumbnailUrl: "/images/courses/circular-economy.jpg",
  learningObjectives: [
    "Explain the difference between a linear economy and a circular economy in plain workplace language.",
    "Distinguish high-value circular actions (repair, reuse, refurbishment) from lower-value material recycling.",
    "Apply the 9-step Circular Value Hierarchy across purchasing, maintenance, operations, and asset disposal.",
    "Execute the 5-step CHECK–USE–CARE–SHARE–RECOVER operational protocol.",
    "Avoid high-risk mistakes such as ordering duplicates without checking stock, discarding repairable equipment, or donating IT devices without data wipes.",
    "Evaluate role-based micro-decisions across general staff, facilities, procurement, finance, HR, IT, operations, sales, managers, and contractors.",
    "Select one practical workplace circular commitment to prevent waste and retain product value."
  ],
  includesCertificate: true,
  passingScore: 80,
  completionMessage:
    "You have completed Circular Economy. You can now recognize where workplace products retain value, prioritize repair and reuse over disposal, and apply CHECK–USE–CARE–SHARE–RECOVER protocols safely.",
  badgeName: "Circular Workplace Practitioner",
  badgeDescription:
    "Awarded for demonstrating practical awareness of circular economy principles, value retention, equipment maintenance, and responsible material recovery.",
};

const NEW_LESSONS = [
  {
    order: 0,
    title: "Linear vs. Circular: Retaining Workplace Value",
    minutes: 3,
    content: "Learn how linear habits destroy value and why circular thinking prevents waste before it is created.",
    blocks: [
      { id: "ce1-h1", type: "heading", position: 1, headingText: "Where Does Workplace Value Go?" },
      { id: "ce1-t1", type: "short_text", position: 2, bodyText: "A commercial company storeroom contains functional office chairs scheduled for dumping due to minor armrest scratches, unopened cleaning chemicals nearing expiry, unassessed electronic equipment, and discarded single-use cardboard delivery boxes. Simultaneously, procurement receives urgent requests to order brand-new chairs and chemicals." },
      { id: "ce1-k1", type: "key_message", position: 3, headingText: "Linear vs. Circular Economy", bodyText: "• Linear Economy ('Take–Make–Dispose'): Raw materials are extracted, manufactured into products, used briefly, and thrown away as waste.\n• Circular Economy ('Prevent–Use–Care–Share–Recover'): Workplace systems keep products, components, and materials at their highest utility and value for as long as possible through repair, reuse, refurbishment, and responsible recovery." },
      {
        id: "ce1-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Evaluating office chair disposal scenario:",
        decisionPrompt: "A company plans to replace 30 office chairs. Inspection shows 20 are fully functional, 5 need minor bolt tightening, and 5 are severely broken. What is the most circular response?",
        decisionChoices: [
          { label: "Inspect and clean the 20 good chairs, repair the 5 minor defects, and order replacement parts or new units only for the 5 broken ones", correct: true, feedback: "Outstanding! This preserves maximum financial and material value while preventing unnecessary expenditure and landfill waste." },
          { label: "Dispose of all 30 chairs in a landfill skip to ensure matching new furniture", correct: false, feedback: "Incorrect! Throwing away functioning assets destroys embodied material value and wastes company capital." },
          { label: "Send all 30 chairs directly to a plastic recycler without assessing repair", correct: false, feedback: "Incorrect. Recycling shreds materials and loses manufacturing value; repair and reuse must come first!" }
        ]
      },
      {
        id: "ce1-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "Why is material recycling considered a lower-value option than repair or reuse in a circular economy?",
        mcqOptions: [
          "Recycling breaks down products into raw materials, losing the embodied labor, manufacturing energy, and functional value retained by repair or reuse",
          "Recycling is strictly illegal in all commercial workplaces",
          "Recycling requires all employees to hold engineering degrees",
          "Recycling automatically creates toxic air pollution in office canteens"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Recycling shreds products into raw materials, destroying the manufacturing and functional value preserved by repair or reuse.",
        mcqIncorrectExplanation: "Incorrect. Repair and reuse preserve functional utility and manufacturing energy far better than recycling."
      }
    ]
  },
  {
    order: 1,
    title: "The 9-Step Circular Value Hierarchy",
    minutes: 4,
    content: "Master the 9-level circular value hierarchy to guide operational purchasing and asset decisions.",
    blocks: [
      { id: "ce2-h1", type: "heading", position: 1, headingText: "The Value Retention Order" },
      { id: "ce2-t1", type: "short_text", position: 2, bodyText: "When evaluating workplace products, equipment, and packaging, follow the 9-step value retention hierarchy:" },
      {
        id: "ce2-k1",
        type: "key_message",
        position: 3,
        headingText: "The 9-Step Circular Hierarchy",
        bodyText: "1. Question the Need: Avoid unnecessary purchases.\n2. Reduce: Minimize material use per operation.\n3. Choose Durable: Purchase long-lasting, repairable items.\n4. Maintain: Conduct routine preventative maintenance.\n5. Repair: Fix broken components promptly.\n6. Reuse / Redistribute: Share usable items across departments.\n7. Refurbish: Restore worn assets to original condition.\n8. Recover Materials (Recycle): Process materials responsibly when reuse ends.\n9. Safe Disposal: Landfill or incinerate only as an absolute last resort."
      },
      {
        id: "ce2-f1",
        type: "memorable_fact",
        position: 4,
        headingText: "Did You Know? (Worth Knowing)",
        bodyText: "According to the United Nations Environment Programme (UNEP) and the European Commission Circular Economy Action Plan, over 80% of a product's environmental impacts across its lifecycle are determined during the initial design and procurement phase! Extending product useful life by just 1–2 years reduces emissions and resource demand far more than recycling alone."
      }
    ]
  },
  {
    order: 2,
    title: "The CHECK–USE–CARE–SHARE–RECOVER Protocol",
    minutes: 4,
    content: "Inspect facility asset assessment areas and apply the 5-step operational protocol.",
    blocks: [
      { id: "ce3-h1", type: "heading", position: 1, headingText: "The 5-Step Operational Protocol" },
      { id: "ce3-t1", type: "short_text", position: 2, bodyText: "Apply the 5-step CHECK–USE–CARE–SHARE–RECOVER framework across daily workplace activities:" },
      {
        id: "ce3-k1",
        type: "key_message",
        position: 3,
        headingText: "CHECK–USE–CARE–SHARE–RECOVER",
        bodyText: "• CHECK: Check existing stock and internal availability before ordering new items.\n• USE: Use equipment, chemicals, and supplies efficiently without wasteful excess.\n• CARE: Maintain equipment and store items properly to prevent premature damage.\n• SHARE: Redistribute surplus functional items or return reusable transport packaging.\n• RECOVER: Send genuine end-of-life materials to authorized recovery partners."
      },
      {
        id: "ce3-img1",
        type: "visual_question",
        position: 4,
        imageUrl: "/images/courses/visual-circular-economy.png",
        caption: "Facility Asset Assessment Area: Repair & refurbishing workbench (left), reusable delivery crates & stock shelves by expiry (center), locked IT data sanitization cage (right), and logistics manager logging asset tags.",
        imageAlt: "Realistic photograph of a Mauritian commercial facility storeroom showing a labelled repair workbench with tools and chairs, stacked reusable delivery crates, shelves with expiry dates, a lockable wire cage holding IT computer hardware, and a facility manager inspecting asset tags on a tablet."
      },
      {
        id: "ce3-m1",
        type: "multiple_choice",
        position: 5,
        mcqQuestion: "In the facility asset assessment scene above, why is computer hardware kept in a lockable wire cage marked for data sanitization before reuse or recycling?",
        mcqOptions: [
          "To protect confidential company and client data through certified data wiping before computers are redistributed or recycled",
          "To hide old computers so inspectors think the facility owns no electronics",
          "Because computers generate magnetic radiation that ruins wooden pallets",
          "To prevent employees from playing video games during lunch breaks"
        ],
        mcqCorrectIndex: 0,
        mcqCorrectExplanation: "Data-bearing electronics require certified data sanitization and physical security to prevent confidential data breaches during circular reuse or recycling.",
        mcqIncorrectExplanation: "Incorrect. Data-bearing hardware requires secure storage and certified data wiping before reuse or recovery."
      }
    ]
  },
  {
    order: 3,
    title: "Worked Resort Scenario & Material Safeguards",
    minutes: 4,
    content: "Analyze a worked Mauritian resort scenario and review safety, hygiene, and data protection safeguards.",
    blocks: [
      { id: "ce4-h1", type: "heading", position: 1, headingText: "Hotel Asset Refurbishment Worked Example" },
      { id: "ce4-t1", type: "short_text", position: 2, bodyText: "Examine how a Mauritian beach resort manages room refurbishment:" },
      {
        id: "ce4-w1",
        type: "workplace_example",
        position: 3,
        headingText: "Worked Example: Resort Refurbishment & Reusable Crates",
        bodyText: "A resort updates 50 guest rooms:\n• Wooden Furniture: Inspected and re-varnished on-site by maintenance (Refurbishment).\n• Linens & Towels: Cleaned, graded, and repurposed as kitchen cleaning rags (Repurposing).\n• Supplier Deliveries: Drinks and dry goods delivered in heavy-duty reusable plastic crates returned to vendors (Circular Packaging).\n• Mattresses: Unusable worn mattresses sent to licensed foam recyclers (Responsible Recovery)."
      },
      {
        id: "ce4-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "Urgent room clearance scenario:",
        decisionPrompt: "A manager orders an employee to 'dump everything in the storeroom into a waste skip immediately' because a VIP client is arriving in 30 minutes. The storeroom contains spare furniture, unopened lightbulbs, and old laptops. What is the correct response?",
        decisionChoices: [
          { label: "Secure the storeroom door, move items neatly to designated asset zones (repair, stock, IT lockup), and explain the asset preservation steps to the manager", correct: true, feedback: "Correct! Securing and organizing assets prevents valuable stock destruction and protects IT data security." },
          { label: "Throw all items, including laptops and unopened stock, into the outdoor trash skip", correct: false, feedback: "NEVER destroy valuable stock or data-bearing IT equipment for quick appearance!" },
          { label: "Give the laptops away to strangers on the street without wiping hard drives", correct: false, feedback: "NEVER distribute data-bearing IT devices without certified data sanitization!" }
        ]
      }
    ]
  },
  {
    order: 4,
    title: "High-Risk Mistakes & Role-Based Micro-Decisions",
    minutes: 3,
    content: "Avoid prohibited circular mistakes and practice role-based decisions across corporate departments.",
    blocks: [
      { id: "ce5-h1", type: "heading", position: 1, headingText: "Prohibited Circular Mistakes" },
      { id: "ce5-t1", type: "short_text", position: 2, bodyText: "NEVER engage in these high-risk operational behaviors:" },
      {
        id: "ce5-k1",
        type: "key_message",
        position: 3,
        headingText: "Prohibited Actions",
        bodyText: "• DO NOT order new equipment or supplies without checking existing stock or internal asset registries.\n• DO NOT discard repairable furniture, tools, or appliances without technical assessment.\n• DO NOT donate or transfer data-bearing electronics without certified data sanitization.\n• DO NOT perform unapproved repairs on safety-critical equipment (electrical panels, pressure vessels, lifting gear).\n• DO NOT label single-use plastic items as 'fully circular' merely because they are theoretically recyclable."
      },
      {
        id: "ce5-d1",
        type: "decision_scenario",
        position: 4,
        decisionIntro: "IT & Facilities Micro-Decision:",
        decisionPrompt: "An IT department is replacing 15 desktop monitors. The old monitors work perfectly but are 3 years old. What is the most circular IT action?",
        decisionChoices: [
          { label: "Wipe data logs, test electrical safety, and reallocate the working monitors to training rooms or branch offices needing upgrades", correct: true, feedback: "Outstanding! Internal redistribution extends asset life, saves capital, and avoids electronic waste." },
          { label: "Smash the monitors with a hammer and dump them in a general waste bin", correct: false, feedback: "Incorrect! Smashing working monitors causes electronic waste pollution and hazardous glass breakage." },
          { label: "Store the monitors in a wet outdoor shed until they rust and break", correct: false, feedback: "Incorrect. Improper storage damages usable assets; reallocate or store them properly!" }
        ]
      }
    ]
  },
  {
    order: 5,
    title: "Your Circular Economy Commitment & Disclaimer",
    minutes: 3,
    content: "Select practical daily workplace commitments and review the circular economy disclaimer.",
    blocks: [
      { id: "ce6-h1", type: "heading", position: 1, headingText: "Pledge to Act" },
      { id: "ce6-t1", type: "short_text", position: 2, bodyText: "Congratulations on completing the lessons! Select the circular habits you commit to practice in your daily work routine." },
      {
        id: "ce6-c1",
        type: "commitment",
        position: 3,
        commitmentInstruction: "Select your daily workplace circular economy commitments (choose at least one):",
        commitmentOptions: [
          { value: "apply-check-use-care", label: "Apply the CHECK–USE–CARE–SHARE–RECOVER protocol before requesting new purchases", description: "Verify existing stock and asset availability before buying new items." },
          { value: "prioritize-repair-refurbishment", label: "Prioritize equipment maintenance, repair, and refurbishment over immediate replacement", description: "Extend product useful life and retain material value." },
          { value: "protect-data-security", label: "Ensure data-bearing IT devices undergo certified data wiping before reuse or recycling", description: "Safeguard company and customer data privacy." },
          { value: "return-reusable-packaging", label: "Return reusable delivery crates, pallets, and containers to suppliers promptly", description: "Support circular supply-chain packaging loops." },
          { value: "report-circular-opportunities", label: "Report idle, surplus, or repairable assets to department leads for internal redistribution", description: "Prevent unnecessary waste and reduce corporate expenditure." }
        ]
      },
      {
        id: "ce6-w1",
        type: "workplace_example",
        position: 4,
        headingText: "Course Disclaimer",
        bodyText: "DISCLAIMER: This course provides general workplace awareness. Specific technical, safety, data security, and waste regulations vary by facility and sector. Employees must follow their organisation's approved procedures and obtain appropriate technical or safety authorization before modifying or transferring equipment."
      }
    ]
  }
];

const NEW_QUIZ = [
  {
    order: 1,
    question: "What is the fundamental difference between a Linear Economy and a Circular Economy?",
    options: [
      "Linear uses square boxes while Circular uses round barrels",
      "Linear economy is completely free while Circular economy requires payment in gold",
      "A Linear Economy follows a 'Take\u2013Make\u2013Waste' extractive model, whereas a Circular Economy designs out waste and keeps materials in productive use at highest value",
      "There is no difference; circular economy is a marketing slogan for landfill operations"
],
    correct: 2,
    correctExplanation: "Circular economy shifts away from the resource-depleting take-make-dispose model to closed loops that retain value through reuse, repair, and recovery.",
    incorrectExplanation: "Incorrect. Linear is 'take-make-waste', whereas circular designs out waste and keeps resources circulating.",
    optionFeedback: [
      "Incorrect. The terms refer to resource flow models, not the geometric shape of packaging.",
      "Incorrect. Both operate within commercial economies; circular models often improve resource profitability.",
      "Correct. Linear models extract resources, produce goods, and discard them; Circular systems retain maximum material and energy value over multiple cycles.",
      "Incorrect. Circular principles actively divert materials from landfill through redesign, refurbishment, and recovery."
]
  },
  {
    order: 2,
    question: "In the 9-Step Circular Value Hierarchy (9R), which priority action should be taken BEFORE considering recycling?",
    options: [
      "Refusing unnecessary single-use items, reducing consumption, and reusing or repairing existing assets",
      "Sending all surplus items straight to the Mare Chicose landfill",
      "Incinerating all plastics in an open backyard fire",
      "Purchasing double the quantity of products each quarter"
],
    correct: 0,
    correctExplanation: "Refuse, rethink, reduce, reuse, and repair retain far more value and energy than recycling, which should only be considered after higher loops are exhausted.",
    incorrectExplanation: "Incorrect. Prevention, reuse, and repair always take precedence over recycling.",
    optionFeedback: [
      "Correct. Higher-tier circular strategies (Refuse, Reduce, Reuse, Repair) preserve the manufactured integrity and embedded energy of products.",
      "Incorrect. Landfill disposal is the lowest endpoint of linear waste, not a circular strategy.",
      "Incorrect. Open burning is hazardous, toxic, and illegal under Mauritian environmental law.",
      "Incorrect. Over-purchasing accelerates linear resource depletion and waste generation."
]
  },
  {
    order: 3,
    question: "What essential operational safeguard MUST be completed before surplus company computers or laptops are donated or refurbished for secondary use?",
    options: [
      "Painting the laptop screens with green enamel paint",
      "Conducting certified data sanitisation (cryptographic wiping) to protect sensitive company records and verifying electrical battery safety",
      "Deleting the desktop wallpaper and hoping no one finds confidential files",
      "Submerging the laptops in salt water to disinfect them"
],
    correct: 1,
    correctExplanation: "Asset refurbishment must ensure rigorous data protection compliance and electrical safety before secondary transfer.",
    incorrectExplanation: "Incorrect. Certified data wiping and battery safety checks must precede hardware donation or reuse.",
    optionFeedback: [
      "Incorrect. Painting screens destroys electronic display hardware.",
      "Correct. Secure, certified data erasure complies with Data Protection regulations while battery health checks ensure user safety.",
      "Incorrect. Simply deleting wallpaper leaves confidential company and client data completely recoverable.",
      "Incorrect. Salt water causes short-circuits and permanent corrosive destruction of electronics."
]
  },
  {
    order: 4,
    question: "A commercial logistics facility receives weekly shipments of components. Which packaging approach best demonstrates circular principles?",
    options: [
      "Ordering single-use thin plastic film that tears upon opening and must be discarded",
      "Wrapping each shipment in four layers of wax-coated paper that cannot be recycled",
      "Burning delivery boxes in the facility yard every Friday afternoon",
      "Using durable, standardized reusable plastic transit totes on a deposit-and-return system with the supplier"
],
    correct: 3,
    correctExplanation: "Reusable standardized transit packaging circulates hundreds of times between suppliers and buyers, eliminating single-use packaging waste.",
    incorrectExplanation: "Incorrect. Standardized reusable return crates eliminate recurring single-use packaging waste.",
    optionFeedback: [
      "Incorrect. Single-use plastic wrap is discarded after one use, embodying linear waste.",
      "Incorrect. Wax coatings prevent paper repulping and render cardboard unrecyclable.",
      "Incorrect. Open burning of waste violates environmental and fire safety laws.",
      "Correct. Standardized returnable totes circulate over hundreds of delivery cycles, cutting packaging costs and eliminating cardboard waste."
]
  },
  {
    order: 5,
    question: "What is the first step in the CHECK\u2013USE\u2013CARE\u2013SHARE\u2013RECOVER operational protocol when an employee needs office equipment?",
    options: [
      "Submit an urgent external purchase order for the most expensive new model",
      "CHECK: Determine whether functional equipment already exists within the company, in storage, or can be shared across departments",
      "Throw away existing equipment to justify buying new models",
      "Borrow equipment from a competitor without permission"
],
    correct: 1,
    correctExplanation: "Before purchasing new goods, checking internal inventory and asset availability prevents redundant purchasing and keeps existing assets in use.",
    incorrectExplanation: "Incorrect. Step 1 is CHECK\u2014verify whether existing equipment can be repurposed, shared, or retrieved from storage.",
    optionFeedback: [
      "Incorrect. Purchasing without checking existing inventory drives unnecessary capital expenditure.",
      "Correct. Checking internal storage, asset registries, or neighbouring departments often resolves needs without spending new resources.",
      "Incorrect. Discarding functional equipment is the epitome of linear waste.",
      "Incorrect. Unauthorized appropriation of external property violates ethical and legal standards."
]
  },
  {
    order: 6,
    question: "How does repairing and reupholstering ergonomic office chairs rather than discarding them illustrate circular value retention?",
    options: [
      "It retains the high-value steel frame, mechanism, and embedded manufacturing energy while restoring comfort at a fraction of the cost of new chairs",
      "It forces employees to work on uncomfortable broken furniture to save money",
      "It guarantees that office chairs will become antique collector items in two months",
      "It is a ceremonial exercise that has zero economic or environmental benefit"
],
    correct: 0,
    correctExplanation: "Repairing mechanical components and replacing upholstery preserves the structural steel and aluminium, saving 70\u201380% of costs and carbon.",
    incorrectExplanation: "Incorrect. Repair and refurbishment preserve the embedded materials and energy of structural frames.",
    optionFeedback: [
      "Correct. The heavy steel chassis and lift cylinder remain intact; repairing worn fabric retains 80% of the chair's value and prevents landfill disposal.",
      "Incorrect. Professional refurbishment restores full ergonomic function and comfort.",
      "Incorrect. Commercial office furniture is maintained for utility and comfort, not antique trading.",
      "Incorrect. Refurbishment delivers measurable financial savings and avoids substantial embodied carbon emissions."
]
  },
  {
    order: 7,
    question: "Why is recycling alone insufficient to solve global resource depletion without aggressive waste prevention and reuse?",
    options: [
      "Recycling is legally prohibited in all developing island states",
      "Recycled materials can never be touched by human hands safely",
      "Recycling requires energy, degrades material fibers over successive cycles (downcycling), and does not stop continuous virgin resource extraction",
      "Recycling machines produce more toxic greenhouse gases than coal power stations"
],
    correct: 2,
    correctExplanation: "Recycling is an energy-intensive industrial process that downcycles materials; eliminating waste at the source remains the superior ecological priority.",
    incorrectExplanation: "Incorrect. Recycling consumes energy and downcycles materials; waste prevention and reuse must take precedence.",
    optionFeedback: [
      "Incorrect. Recycling is active and encouraged across Mauritius and globally.",
      "Incorrect. Recycled materials are processed and manufactured into safe commercial products every day.",
      "Correct. Recycling paper or plastics degrades polymer lengths over cycles (downcycling); preventing waste and reusing items avoids extraction entirely.",
      "Incorrect. Modern recycling uses far less energy than virgin refining, but prevention remains far superior."
]
  },
  {
    order: 8,
    question: "What is a 'Product-as-a-Service' (PaaS) commercial model in a circular office environment?",
    options: [
      "Buying 1,000 lightbulbs and throwing them in a dumpster when they burn out",
      "Requiring employees to build their own desk furniture from scrap wood",
      "Selling corporate office buildings to overseas investors every week",
      "Leasing services (such as lighting or printing) where the provider retains equipment ownership, manages maintenance, and takes back hardware for remanufacturing"
],
    correct: 3,
    correctExplanation: "Product-as-a-Service incentivizes manufacturers to build durable, upgradeable equipment because they remain responsible for maintenance and end-of-life recovery.",
    incorrectExplanation: "Incorrect. Product-as-a-Service leases performance while the manufacturer manages maintenance and end-of-life takeback.",
    optionFeedback: [
      "Incorrect. Discarding lamps is a linear throwaway model.",
      "Incorrect. PaaS utilizes professional commercial equipment designed for long-term service contracts.",
      "Incorrect. Real estate sales are property transactions, not circular product service systems.",
      "Correct. When suppliers sell 'illumination' or 'printed pages' rather than hardware, they design durable, modular machines that are easy to repair and refurbish."
]
  },
  {
    order: 9,
    question: "How can a warehouse or retail store in Mauritius repurpose clean, unsoiled cardboard shipping cartons internally?",
    options: [
      "Shred or perforate clean cardboard on-site to create protective void-fill packaging for outgoing customer orders, replacing plastic bubble wrap",
      "Soak the cardboard in diesel fuel to make outdoor fire starters",
      "Bury the cardboard in public beaches to fertilize ocean coral",
      "Throw clean boxes into general waste dumpsters every morning"
],
    correct: 0,
    correctExplanation: "Repurposing clean cardboard as packaging void-fill keeps materials circulating productively on-site and eliminates purchasing plastic packaging.",
    incorrectExplanation: "Incorrect. Repurposing clean cardboard as packaging void-fill avoids purchasing virgin plastic bubble wrap.",
    optionFeedback: [
      "Correct. On-site cardboard perforators turn scrap boxes into shock-absorbing packaging mesh, eliminating plastic bubble wrap costs and waste.",
      "Incorrect. Soaking cardboard in fuel is an extreme fire hazard and causes toxic air pollution.",
      "Incorrect. Discarding waste on beaches is illegal and causes severe coastal contamination.",
      "Incorrect. Discarding clean cardboard into general waste sends valuable fibers to Mare Chicose landfill."
]
  },
  {
    order: 10,
    question: "What is a core circular principle to follow when designing new corporate uniforms, promotional merchandise, or workwear?",
    options: [
      "Using blended synthetic fabrics with glued metallic badges that can never be separated or recycled",
      "Manufacturing clothing designed to fall apart after three washes so staff order new clothes regularly",
      "Selecting durable, mono-material natural or recyclable fabrics designed for easy disassembly, repair, and end-of-life textile recycling",
      "Spraying uniforms with permanent fluorescent chemicals"
],
    correct: 2,
    correctExplanation: "Designing with mono-materials and durable construction allows textiles to be repaired, disassembled, and recycled into high-value fibers at end-of-life.",
    incorrectExplanation: "Incorrect. Selecting durable, mono-material textiles enables easy repair and end-of-life fiber recycling.",
    optionFeedback: [
      "Incorrect. Multi-material blends (like cotton-poly-elastane with glued foils) cannot be mechanically or chemically recycled.",
      "Incorrect. Planned obsolescence is the hallmark of linear waste.",
      "Correct. Mono-material garments (e.g. 100% organic cotton or 100% recycled polyester) without glued composite badges enable straightforward mechanical textile recycling.",
      "Incorrect. Permanent fluorescent chemical treatments complicate textile recycling and wastewater safety."
]
  }
];

export async function ensureCircularEconomyCourse(): Promise<void> {
  try {
    await db.transaction(async (tx) => {
      // 1. Resolve Course 11 by courseCode "ELH-11", slug, or ID
      let course = null;
      
      const [byCode] = await tx
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseCode, "ELH-11"))
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
        throw new Error("Course ELH-11 / circular-economy not seeded by catalogue skeletons bootstrap!");
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
        logger.info({ courseId, slug: COURSE_SLUG }, "Circular Economy course content and v2 integrity verified. Skipping repair to preserve administrator edits...");
        return;
      }

      logger.info({ courseId, slug: COURSE_SLUG }, "Integrity mismatch or missing v2 seed detected for Course ELH-11. Re-seeding course content and lessons transactionally...");

      // 4. Resolve next recommended course dynamically by slug
      const [nextCourse] = await tx
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(eq(coursesTable.slug, "industrial-symbiosis-mauritius"))
        .limit(1);
      const nextCourseId = nextCourse?.id ?? null;

      // 5. Update course record slug, title, and metadata
      await tx
        .update(coursesTable)
        .set({
          title: COURSE_TITLE,
          slug: COURSE_SLUG,
          courseCode: "ELH-11",
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
          icon: "refresh-cw",
          criteriaType: "all_courses",
          threshold: 0,
          courseIds: [courseId],
          orderIndex: 16,
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

      logger.info({ courseId, slug: COURSE_SLUG }, "Circular Economy course v2 seed / repair transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute idempotent seeding/repair of Circular Economy course");
  }
}
