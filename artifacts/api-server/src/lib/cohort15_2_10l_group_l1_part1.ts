export interface CohortQuestionDefinition {
  order: number;
  question: string;
  options: string[];
  correct: number;
  correctExplanation: string;
  incorrectExplanation: string;
  optionFeedback: string[];
  competencyArea?: string;
}

export interface CohortCourseRemediationData {
  courseId: number;
  courseCode: string;
  title: string;
  passingScore: number;
  questions: CohortQuestionDefinition[];
}

export const COHORT_15_2_10L_GROUP_L1_PART1_DATA: CohortCourseRemediationData[] = [
  {
    "courseId": 1,
    "courseCode": "ELH-01",
    "title": "Sustainability Foundations & ESG Core Principles",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "A Mauritian commercial enterprise is aligning its operations with sustainable business principles. When defining operational sustainability in everyday business management, which approach accurately reflects this principle?",
        "options": [
          "Balancing current operational and commercial needs without compromising ecological integrity, social wellbeing, and economic resilience for future generations.",
          "Allocating surplus revenue exclusively to annual public relations galas while ignoring factory wastewater discharge.",
          "Replacing functional equipment every six months to display modern branding in client waiting areas.",
          "Canceling all employee professional development and health insurance to maximize immediate quarterly cash reserves."
        ],
        "correct": 0,
        "correctExplanation": "Operational sustainability integrates environmental stewardship, social responsibility, and economic durability to ensure long-term viability without depleting natural or human capital.",
        "incorrectExplanation": "PR marketing does not fix environmental pollution, cosmetic equipment replacement generates unnecessary e-waste, and stripping employee benefits damages social sustainability.",
        "optionFeedback": [
          "Correct. Sustainable business integrates environmental protection, social equity, and economic durability.",
          "Incorrect. Public relations philanthropy does not compensate for unaddressed operational pollution.",
          "Incorrect. Frequent premature equipment replacement causes excessive material waste and capital loss.",
          "Incorrect. Undermining workforce wellbeing violates the core social pillar of sustainability."
        ],
        "competencyArea": "Sustainability Foundations & ESG Core Principles"
      },
      {
        "order": 2,
        "question": "During a departmental planning meeting, a team evaluates a trade-off: switching from single-use plastic packaging to reusable crates involves higher upfront purchase costs but saves money after four months of reuse. How does this decision illustrate the Governance (G) and Environmental (E) intersection?",
        "options": [
          "It demonstrates that short-term convenience should always override long-term operational resilience.",
          "It shows how disciplined corporate decision-making and lifecycle analysis (Governance) achieve measurable material waste reduction (Environmental) with positive financial return.",
          "It proves that environmental initiatives always result in permanent operational financial losses.",
          "It indicates that packaging decisions should be made purely by random selection during staff meetings."
        ],
        "correct": 1,
        "correctExplanation": "The intersection of Governance and Environment occurs when structured management controls, budgeting, and lifecycle assessments are applied to reduce physical resource consumption while improving commercial value.",
        "incorrectExplanation": "Short-term convenience often creates long-term waste, lifecycle costing proves sustainability creates net financial savings, and random decision-making breaches fiduciary governance.",
        "optionFeedback": [
          "Incorrect. Prioritizing short-term convenience leads to continuous resource waste and escalating disposal costs.",
          "Correct. Structured governance and lifecycle evaluation enable profitable, waste-eliminating environmental choices.",
          "Incorrect. High-efficiency sustainable interventions frequently lower operating costs over time.",
          "Incorrect. Fiduciary governance requires structured cost-benefit analysis rather than arbitrary choices."
        ],
        "competencyArea": "Sustainability Foundations & ESG Core Principles"
      },
      {
        "order": 3,
        "question": "A company achieves excellent carbon reduction in its facilities but discovers that a contracted cleaning supplier is withholding overtime pay and denying sick leave to frontline cleaners. Under comprehensive ESG standards, why is this an urgent governance failure?",
        "options": [
          "Because environmental performance automatically legally excuses labor rights violations in commercial supply chains.",
          "Because labor standards only apply to executive board members rather than contracted workers.",
          "Because ESG requires holistic integrity across Environmental, Social, and Governance pillars simultaneously; strong carbon metrics cannot offset labor exploitation or human rights neglect.",
          "Because contracted workers are legally prohibited from entering commercial office buildings."
        ],
        "correct": 2,
        "correctExplanation": "ESG is an integrated, balanced framework. Excellent environmental performance in one area cannot compensate for labor abuses or ethical violations in the Social or Governance pillars.",
        "incorrectExplanation": "Environmental metrics do not excuse labor violations, labor protections apply to all on-site workers, and contracted staff provide essential commercial services.",
        "optionFeedback": [
          "Incorrect. Carbon reductions cannot be used to justify or obscure human rights and labor violations.",
          "Incorrect. Fair labor standards and duty of care protect all workers across the value chain.",
          "Correct. True ESG performance demands simultaneous integrity across environmental stewardship and ethical labor standards.",
          "Incorrect. Contracted cleaning and support teams are integral to commercial facility operations."
        ],
        "competencyArea": "Sustainability Foundations & ESG Core Principles"
      },
      {
        "order": 4,
        "question": "An administrative coordinator in an office building is establishing a 30-day verifiable workplace action commitment. Which action produces tangible, audit-ready sustainability progress?",
        "options": [
          "Posting inspirational environmental quotes on personal social media accounts once a week.",
          "Leaving all office lights and air conditioners running overnight so morning staff find the rooms cool.",
          "Throwing all recyclable cardboard into general waste bins to avoid taking an extra walk.",
          "Conducting an end-of-day shutdown audit across the department, tracking kilowatt-hour baselines, and implementing centralized paperless invoicing."
        ],
        "correct": 3,
        "correctExplanation": "Verifiable workplace action focuses on measurable operational change: establishing baseline metrics, eliminating unnecessary energy use through scheduled shutdown audits, and digitizing paper workflows.",
        "incorrectExplanation": "Social media quotes lack operational impact, overnight energy waste inflates emissions and utility bills, and mixing recyclables into general waste contaminates salvageable materials.",
        "optionFeedback": [
          "Incorrect. Passive social media posting does not alter physical workplace resource consumption.",
          "Incorrect. Running HVAC and lighting overnight in empty buildings creates massive utility and carbon waste.",
          "Incorrect. Discarding recyclables in general waste increases landfill disposal volume.",
          "Correct. Systematic shutdown audits, metric tracking, and paperless workflows deliver verifiable operational savings."
        ],
        "competencyArea": "Sustainability Foundations & ESG Core Principles"
      },
      {
        "order": 5,
        "question": "A hotel operator in Mauritius seeks to reduce its operational ecological footprint while maintaining premium guest satisfaction. What strategy represents authentic operational sustainability?",
        "options": [
          "Installing low-flow aerated showerheads, smart digital keycards that automate HVAC setbacks when rooms are unoccupied, and sourcing fresh produce from local agricultural cooperatives.",
          "Removing all electric lighting from guest rooms and requiring visitors to navigate corridors in total darkness.",
          "Dumping untreated swimming pool chlorination backwash directly onto public coastal beaches.",
          "Purchasing cheap imported plastic water bottles in bulk and burying empty bottles in the hotel garden."
        ],
        "correct": 0,
        "correctExplanation": "Authentic hospitality sustainability utilizes efficient engineering controls (aerators, smart occupancy setbacks) and local supply chain partnerships to eliminate waste and emissions without diminishing service quality.",
        "incorrectExplanation": "Removing lights harms guest safety and comfort, direct chemical discharge violates environmental law, and burying plastic causes soil contamination.",
        "optionFeedback": [
          "Correct. Aerated fixtures, automated energy setbacks, and local sourcing optimize resource use seamlessly.",
          "Incorrect. Eliminating essential guest amenities compromises safety and commercial viability.",
          "Incorrect. Discharging chemical effluent into coastal waters is illegal and damages marine ecosystems.",
          "Incorrect. Burying single-use plastics causes severe environmental pollution and violates waste legislation."
        ],
        "competencyArea": "Sustainability Foundations & ESG Core Principles"
      },
      {
        "order": 6,
        "question": "Why do institutional investors, commercial banks, and corporate clients increasingly evaluate an enterprise's ESG disclosures alongside traditional financial balance sheets?",
        "options": [
          "Because financial accounting is being permanently abolished worldwide by international decree.",
          "Because robust ESG management indicates superior risk control, operational efficiency, regulatory readiness, and resilience against climate and supply chain disruptions.",
          "Because banks are legally required to decline loans to any company with more than five employees.",
          "Because ESG reports replace the need for companies to generate sales revenue or manage cash flows."
        ],
        "correct": 1,
        "correctExplanation": "Lenders and investors use ESG performance as a proxy for proactive corporate risk management, recognizing that resource-efficient, ethically governed companies face lower regulatory, legal, and operational default risks.",
        "incorrectExplanation": "Financial accounting remains essential, loan eligibility is not tied to arbitrary employee headcount limits, and commercial revenue generation remains fundamental.",
        "optionFeedback": [
          "Incorrect. ESG reporting complements and enriches standard financial balance sheets rather than replacing them.",
          "Correct. Comprehensive ESG management demonstrates forward-looking risk mitigation and operational resilience.",
          "Incorrect. Commercial lending evaluates creditworthiness and enterprise risk, not arbitrary headcounts.",
          "Incorrect. Sound commercial financial performance and revenue management remain indispensable."
        ],
        "competencyArea": "Sustainability Foundations & ESG Core Principles"
      },
      {
        "order": 7,
        "question": "A department supervisor notices that team members leave computer monitors and printer hubs powered on throughout the weekend. Applying behavioral change and governance principles, what is the most effective intervention?",
        "options": [
          "Shouting at employees in public hallways to induce fear and compliance.",
          "Removing all computer hardware from the office permanently so work can only be done on paper.",
          "Appointing departmental green champions, setting visual reminder cues at exits, tracking weekend baseboard energy reductions, and sharing monthly progress transparently.",
          "Ignoring the issue completely because electricity costs are paid by the landlord."
        ],
        "correct": 2,
        "correctExplanation": "Sustainable behavioral change relies on positive enablement: empowered champions, clear environmental prompts, transparent data feedback, and team recognition for verified energy savings.",
        "incorrectExplanation": "Public reprimands create toxic workplaces, removing computers destroys productivity, and ignoring energy waste inflates operating costs and carbon footprint.",
        "optionFeedback": [
          "Incorrect. Hostile reprimands undermine morale and fail to build lasting sustainable habits.",
          "Incorrect. Eliminating digital tools paralyzes business operations and increases paper waste.",
          "Correct. Green champions, visual cues, metric tracking, and team transparency foster durable sustainability culture.",
          "Incorrect. Unchecked energy waste inflates organizational carbon footprints regardless of lease structure."
        ],
        "competencyArea": "Sustainability Foundations & ESG Core Principles"
      },
      {
        "order": 8,
        "question": "How does adhering to clear ethical principles (such as anti-bribery, transparent procurement, and accurate data logging) in the Governance (G) pillar protect an organization's long-term commercial success?",
        "options": [
          "It guarantees that the company will never have to pay commercial taxes or utility bills.",
          "It forces the company to disclose proprietary client trade secrets on public billboards.",
          "It ensures that all corporate decisions are made exclusively by foreign government officials.",
          "It prevents corruption, maintains regulatory compliance, protects brand reputation, and builds durable trust with customers, investors, and community stakeholders."
        ],
        "correct": 3,
        "correctExplanation": "Strong corporate governance underpins organizational integrity: mitigating legal and reputational risks, ensuring fair procurement competition, and establishing stakeholder trust that attracts capital and loyal customers.",
        "incorrectExplanation": "Governance does not exempt companies from taxes, does not require leaking proprietary secrets, and maintains internal corporate control rather than foreign government takeover.",
        "optionFeedback": [
          "Incorrect. Governance ensures lawful compliance with tax and commercial obligations rather than avoiding them.",
          "Incorrect. Governance protects proprietary data security and confidentiality under legal standards.",
          "Incorrect. Corporate governance strengthens internal board oversight and executive accountability.",
          "Correct. Transparent ethics, anti-corruption controls, and accurate recordkeeping safeguard brand reputation and trust."
        ],
        "competencyArea": "Sustainability Foundations & ESG Core Principles"
      }
    ]
  },
  {
    "courseId": 2,
    "courseCode": "ELH-02",
    "title": "Waste Sorting & the Mauritian Bin System",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "An employee at a corporate office in Ébène finishes lunch and has an oily plastic takeout container with leftover curry sauce. What is the correct waste sorting protocol before placing the container in the plastic recycling bin?",
        "options": [
          "Emptying food scraps into the organic/general bin and rinsing the plastic container with water so oil and residue do not contaminate entire batches of dry recyclables.",
          "Tossing the unrinsed container with leftover gravy directly into the paper recycling bin.",
          "Hiding the greasy food container under a stack of clean office printer paper.",
          "Burning the plastic container in the office parking lot."
        ],
        "correct": 0,
        "correctExplanation": "Food residue and oil contaminate clean recyclables (especially paper and plastic flakes), causing entire collection batches to be rejected and sent to landfill. Rinsing containers preserves material recycling value.",
        "incorrectExplanation": "Unrinsed containers ruin paper bales, hiding waste is unprofessional and unhygienic, and open burning of plastic is hazardous, illegal, and highly toxic.",
        "optionFeedback": [
          "Correct. Scraping food waste and rinsing plastic prevents contamination of downstream recycling batches.",
          "Incorrect. Greasy containers severely contaminate dry paper fibers, rendering the entire bale unrecyclable.",
          "Incorrect. Concealing organic waste among office stationery attracts pests and ruins clean paper.",
          "Incorrect. Open burning of plastics produces toxic dioxins and violates environmental legislation."
        ],
        "competencyArea": "Workplace Waste Management & Circular Sorting"
      },
      {
        "order": 2,
        "question": "In a Mauritian commercial workplace, why should employees verify site-specific bin labels and pictograms rather than relying exclusively on bin lid colors?",
        "options": [
          "Because all recycling trucks in Mauritius automatically shred all waste types together without sorting.",
          "Because different contracted private waste haulers in Mauritius use varying bin color conventions, making text labels and visual pictograms the definitive guide to avoid stream contamination.",
          "Because bin colors in Mauritius change automatically depending on the time of day.",
          "Because commercial offices are legally prohibited from displaying written labels on waste bins."
        ],
        "correct": 1,
        "correctExplanation": "In Mauritius, private waste collection contractors may use different color conventions (e.g., green for glass vs green for organic). Reading site-specific labels and icons ensures proper segregation according to the facility's contracted streams.",
        "incorrectExplanation": "Contracted recyclers sort materials separately when uncontaminated, bin colors are static physical objects, and clear signage is recommended by environmental best practices.",
        "optionFeedback": [
          "Incorrect. Dedicated recycling contractors maintain segregated processing streams for uncontaminated materials.",
          "Correct. Contracted waste haulers have diverse color schemes; verified site labels prevent cross-contamination.",
          "Incorrect. Bin colors are fixed physical coatings unaffected by the clock.",
          "Incorrect. Clear labeling and visual sorting guides are standard best practices for workplace compliance."
        ],
        "competencyArea": "Workplace Waste Management & Circular Sorting"
      },
      {
        "order": 3,
        "question": "An IT department is clearing out broken fluorescent tube lights and swollen lithium-ion laptop batteries. Which disposal method complies with hazardous waste handling protocols?",
        "options": [
          "Smashing the fluorescent tubes with a hammer in an indoor meeting room.",
          "Throwing swollen batteries into standard municipal waste bins alongside daily office food scraps.",
          "Segregating hazardous items, placing batteries in insulated non-conductive containers to prevent thermal runaway fires, and scheduling pickup with an authorized hazardous e-waste recycler.",
          "Throwing electronic batteries into the nearest outdoor river or coastal mangrove."
        ],
        "correct": 2,
        "correctExplanation": "Fluorescent tubes contain toxic mercury vapor, and damaged lithium batteries present severe fire and explosion risks. They must be stored in secure, insulated containers and collected by licensed specialized e-waste handlers.",
        "incorrectExplanation": "Smashing tubes releases hazardous mercury vapor, tossing lithium batteries in general waste causes landfill fires, and water disposal causes severe ecotoxicity.",
        "optionFeedback": [
          "Incorrect. Breaking fluorescent tubes releases neurotoxic mercury vapor into indoor air.",
          "Incorrect. Damaged lithium batteries in general bins can short-circuit and ignite catastrophic truck or landfill fires.",
          "Correct. Secure isolation, terminal taping, and certified e-waste handler collection protect health and safety.",
          "Incorrect. Dumping toxic electronic waste in waterways causes severe aquatic poisoning and is illegal."
        ],
        "competencyArea": "Workplace Waste Management & Circular Sorting"
      },
      {
        "order": 4,
        "question": "Why does maximizing clean waste segregation at the office source directly support national solid waste management in Mauritius?",
        "options": [
          "Because Mauritius has unlimited free land area to establish dozens of new open landfills every year.",
          "Because recycling generates radioactive energy that powers the national electrical grid.",
          "Because landfill diversion is only relevant in countries with freezing arctic climates.",
          "Because the national landfill at Mare Chicose operates near maximum capacity; diverting paper, plastics, metals, and organics extends landfill lifespan and conserves island ecosystems."
        ],
        "correct": 3,
        "correctExplanation": "As a small island developing state, Mauritius has finite landfill capacity (principally Mare Chicose). Source segregation diverts valuable recyclables and compostable organics, significantly extending landfill longevity.",
        "incorrectExplanation": "Mauritius has limited island land, recycling does not generate nuclear radiation, and island waste management is acutely critical due to geographical constraints.",
        "optionFeedback": [
          "Incorrect. Island land availability is strictly finite, making landfill expansion economically and ecologically difficult.",
          "Incorrect. Recycling is mechanical and chemical material reprocessing, unrelated to nuclear physics.",
          "Incorrect. Island nations face acute waste constraints, making diversion and circularity vital.",
          "Correct. Segregation diverts tonnage from Mare Chicose, preserving limited landfill capacity and reducing leachate."
        ],
        "competencyArea": "Workplace Waste Management & Circular Sorting"
      },
      {
        "order": 5,
        "question": "A facility manager discovers that employees frequently throw clean corrugated cardboard boxes into the general waste dumpster instead of flattening them for the paper recycling cage. What operational problem does this create?",
        "options": [
          "Unflattened boxes fill dumpster volume with empty air, triggering premature, costly waste collection hauls while sending valuable recyclable fiber to landfill.",
          "Cardboard boxes explode when exposed to normal atmospheric office air.",
          "Flattening cardboard is strictly illegal under local labor legislation.",
          "Unflattened cardboard boxes transform into hazardous industrial chemical waste within 24 hours."
        ],
        "correct": 0,
        "correctExplanation": "Unflattened cardboard consumes immense dumpster space (transporting mostly air), driving up collection frequency and municipal haulage costs while wasting clean recyclable cellulose fiber.",
        "incorrectExplanation": "Cardboard is chemically stable, flattening boxes is standard facility practice, and clean cardboard is non-hazardous recyclable dry waste.",
        "optionFeedback": [
          "Correct. Uncollapsed boxes waste dumpster capacity, increase haulage fees, and divert recyclable fiber to landfill.",
          "Incorrect. Dry cardboard is structurally stable and presents no explosive risk under ambient conditions.",
          "Incorrect. Flattening cardboard boxes is standard, safe warehouse and office waste management practice.",
          "Incorrect. Paper packaging is non-hazardous dry recyclable material."
        ],
        "competencyArea": "Workplace Waste Management & Circular Sorting"
      },
      {
        "order": 6,
        "question": "During a warehouse audit, a logistics supervisor finds that clear polyethylene (PE) stretch pallet wrap is being mixed with dirty floor sweepings and greasy machinery rags. What is the best corrective action?",
        "options": [
          "Burning the pile of plastic wrap and rags behind the loading dock.",
          "Installing dedicated, labeled hanging collection sacks for clean PE stretch film, training workers to keep film free from oil and dust to maintain high commercial recycling resale value.",
          "Ordering workers to mix wet kitchen food waste into the stretch wrap bags.",
          "Banning all packaging materials from entering the warehouse premises."
        ],
        "correct": 1,
        "correctExplanation": "Clean, clear PE film is a high-grade plastic with excellent commercial recycling value. Dedicated point-of-use collection frames prevent contamination from floor grit and grease, preserving recycling revenue.",
        "incorrectExplanation": "Open burning of plastics produces toxic smoke and violates law, mixing food waste ruins plastic recyclability, and banning packaging disrupts logistics operations.",
        "optionFeedback": [
          "Incorrect. Open burning of plastic and oily rags is illegal, hazardous, and produces toxic emissions.",
          "Correct. Dedicated collection sacks maintain clean PE film purity, maximizing recycling quality and commercial value.",
          "Incorrect. Introducing food waste degrades plastic polymer quality and causes foul odors.",
          "Incorrect. Packaging is necessary for product protection; managing it cleanly is the sustainable solution."
        ],
        "competencyArea": "Workplace Waste Management & Circular Sorting"
      },
      {
        "order": 7,
        "question": "What is the primary operational consequence when an entire 240-liter recycling bin of clean white office paper is contaminated by a single cup of half-full discarded coffee?",
        "options": [
          "The coffee improves the paper's fiber strength and makes it more valuable.",
          "The paper instantly vaporizes into thin air.",
          "Liquid seeps through the paper stack, causing fiber breakdown, mold growth, and discoloration, which forces the waste contractor to reject the entire batch and divert it to landfill.",
          "The recycling contractor provides a cash bonus to the office for adding moisture."
        ],
        "correct": 2,
        "correctExplanation": "Liquid spills ruin paper recycling: moisture degrades fiber integrity, breeds mold, and causes paper sorting machinery to jam, leading contractors to classify the entire load as contaminated general waste.",
        "incorrectExplanation": "Coffee damages paper fibers, paper does not vaporize, and contaminated paper loads incur disposal penalty charges rather than cash bonuses.",
        "optionFeedback": [
          "Incorrect. Liquids weaken cellulose fibers and cause mold, ruining paper recycling batches.",
          "Incorrect. Wet paper becomes heavy, soggy pulp rather than vaporizing.",
          "Correct. Liquid contamination ruins paper recyclability, turning an entire batch of clean fiber into landfill waste.",
          "Incorrect. Haulers reject contaminated recycling loads or impose contamination surcharge penalties."
        ],
        "competencyArea": "Workplace Waste Management & Circular Sorting"
      },
      {
        "order": 8,
        "question": "A company green team is designing a 30-day campaign to eliminate desk-side single-use waste bins and establish central multi-stream sorting stations. What implementation step ensures high employee adoption?",
        "options": [
          "Removing bins overnight without explanation and punishing employees who ask questions.",
          "Placing central stations in inaccessible locked basements.",
          "Requiring employees to take all personal office waste home in their pockets.",
          "Providing clear signage with localized pictograms, placing bins in convenient high-traffic break areas, and hosting a short interactive kickoff briefing explaining the 'why' and 'how'."
        ],
        "correct": 3,
        "correctExplanation": "Successful transition to central sorting stations requires accessible placement (near printing and kitchen areas), intuitive photo-based signage, and positive employee education to build collective ownership.",
        "incorrectExplanation": "Punitive actions breed resentment, inaccessible bins lead to floor littering, and forcing waste into pockets is impractical and unprofessional.",
        "optionFeedback": [
          "Incorrect. Unexplained abrupt mandates create employee resistance and non-compliance.",
          "Incorrect. Inconvenient placement guarantees that waste will be improperly discarded.",
          "Incorrect. Workplace facilities must provide functional, hygienic on-site waste management infrastructure.",
          "Correct. Accessible station placement, visual signage, and engaging education drive lasting habit transformation."
        ],
        "competencyArea": "Workplace Waste Management & Circular Sorting"
      }
    ]
  },
  {
    "courseId": 3,
    "courseCode": "ELH-03",
    "title": "Energy Efficiency at Work",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "In a tropical commercial office building in Mauritius, what is the most energy-efficient and comfortable practice for operating split-unit and central air conditioning systems?",
        "options": [
          "Maintaining thermostats at 24°C–25°C, ensuring exterior doors and windows remain closed, and cleaning air filters on a monthly schedule.",
          "Setting the thermostat to 16°C with open windows to allow sea breezes inside while running the compressor at maximum speed.",
          "Turning air conditioners on full blast all weekend in empty offices so the walls stay cold.",
          "Disconnecting all ventilation fans and sealing all supply ducts permanently."
        ],
        "correct": 0,
        "correctExplanation": "Thermostats maintained at 24°C–25°C provide optimal human comfort in tropical climates while reducing compressor power consumption by up to 15%–20% compared to lower setpoints. Closed windows prevent humid air infiltration.",
        "incorrectExplanation": "Setting AC to 16°C with open windows overloads compressors and causes severe condensation, cooling empty spaces wastes energy, and sealing ducts violates indoor air quality codes.",
        "optionFeedback": [
          "Correct. 24°C–25°C setpoints with sealed building envelopes optimize cooling comfort and prevent compressor overload.",
          "Incorrect. Open windows allow hot, humid air to enter, causing extreme energy waste and coil freezing.",
          "Incorrect. Cooling unoccupied spaces during weekends wastes substantial electricity without benefit.",
          "Incorrect. Cutting off ventilation air violates basic occupational health and safety standards."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      },
      {
        "order": 2,
        "question": "An administrative coordinator notices that high-performance desktop computers and photocopiers remain in active mode overnight across five departments. What automated policy delivers immediate electricity savings?",
        "options": [
          "Unplugging all electrical cables by pulling the power cords violently from the wall.",
          "Configuring standardized power-management profiles that transition monitors to sleep after 10 minutes of inactivity and schedule automated overnight deep-sleep shutdowns.",
          "Installing electric space heaters next to computer towers to keep components warm.",
          "Leaving computers permanently displaying bright 3D animated screensavers 24/7."
        ],
        "correct": 1,
        "correctExplanation": "Automated power management schedules (display sleep after 10 minutes, system sleep after 30 minutes, and automated overnight hibernation) eliminate standby 'vampire' power draw across hundreds of office workstations.",
        "incorrectExplanation": "Yanking cords damages sockets and cables, space heaters waste immense energy and pose fire hazards, and 3D screensavers prevent computers from entering low-power sleep.",
        "optionFeedback": [
          "Incorrect. Pulling power cords damages equipment terminals and creates electrical hazards.",
          "Correct. Automated sleep timers and network power-down policies eliminate phantom energy waste effortlessly.",
          "Incorrect. Supplemental heaters waste electricity and risk overheating electronic circuitry.",
          "Incorrect. Animated screensavers keep graphics cards and processors running at high power draw."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      },
      {
        "order": 3,
        "question": "When upgrading lighting in a retail showroom or office floor from legacy fluorescent tubes to commercial LED luminaires, which combination of benefits delivers superior return on investment?",
        "options": [
          "LEDs consume more electricity but produce higher amounts of radiant heat.",
          "LEDs require manual replacement every 30 days by certified electrical engineers.",
          "LEDs reduce lighting electricity consumption by 50%–70%, last 5 to 10 times longer (reducing maintenance labor), and emit significantly less heat, lowering air conditioning cooling loads.",
          "LEDs can only operate when connected to diesel backup generators."
        ],
        "correct": 2,
        "correctExplanation": "LED retrofits deliver multi-dimensional savings: 50%–70% lower wattage per lumen, 50,000-hour lifespan that slashes replacement labor/parts, and reduced thermal heat rejection that lowers facility air conditioning demand.",
        "incorrectExplanation": "LEDs use far less power and emit minimal heat, have multi-year lifespans, and run on standard utility grid power.",
        "optionFeedback": [
          "Incorrect. LEDs generate significantly less waste heat than incandescent or fluorescent bulbs.",
          "Incorrect. Commercial LEDs last 50,000+ operating hours, dramatically reducing replacement frequency.",
          "Correct. 50-70% electrical savings, extended durability, and reduced HVAC thermal loads maximize ROI.",
          "Incorrect. LEDs operate efficiently on standard electrical circuits and renewable power systems."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      },
      {
        "order": 4,
        "question": "During an energy audit of a commercial kitchen or staff cafeteria, which operational behavior eliminates major unnecessary electrical baselines?",
        "options": [
          "Leaving commercial induction cooktops on high heat with empty pans all day.",
          "Preheating baking ovens four hours before cooking begins and leaving refrigerator doors propped open.",
          "Disconnecting all water filtration and refrigeration systems permanently.",
          "Defrosting freezer coils regularly, ensuring door magnetic gaskets seal tightly, and turning on high-powered extract fans only during active cooking shifts."
        ],
        "correct": 3,
        "correctExplanation": "Refrigeration efficiency requires intact door seals (preventing cold air leakage) and clean defrost cycles. Staging cooking equipment and kitchen extraction fans to operate only when needed prevents major kilowatt-hour waste.",
        "incorrectExplanation": "Heating empty pans damages cookware and wastes power, propped doors cause rapid compressor failure, and disconnecting fridges leads to food spoilage and health code breaches.",
        "optionFeedback": [
          "Incorrect. Heating empty cookware wastes energy and creates severe kitchen fire hazards.",
          "Incorrect. Propping refrigerator doors open overworks compressors and causes food spoilage.",
          "Incorrect. Disabling refrigeration violates food safety regulations and causes inventory loss.",
          "Correct. Gasket maintenance, coil defrosting, and demand-based ventilation optimize kitchen energy."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      },
      {
        "order": 5,
        "question": "An industrial plant operates multiple compressed air lines for pneumatic tools. Why is fixing audible hissing leaks in compressed air fittings considered one of the highest-priority energy conservation measures?",
        "options": [
          "Because air compressors consume immense electrical energy (often requiring 7–8 kW of electricity to generate 1 kW of pneumatic power), meaning unrepaired leaks represent pure, expensive electricity loss.",
          "Because compressed air leaks emit poisonous ozone gases that destroy factory roofs.",
          "Because air leaks are required by government health inspectors to ventilate factory floors.",
          "Because repairing air leaks causes pneumatic tools to lose all physical pressure."
        ],
        "correct": 0,
        "correctExplanation": "Compressed air systems have low thermodynamic efficiency (~10%–15%), making compressed air one of the most expensive energy carriers in manufacturing. Eliminating leaks saves substantial electricity with minimal maintenance cost.",
        "incorrectExplanation": "Compressed air is normal ambient air, leaks are wasteful rather than legal ventilation, and repairing leaks stabilizes and improves system air pressure.",
        "optionFeedback": [
          "Correct. Given the high energy cost of compressing air, repairing leaks yields immediate, high-value electrical savings.",
          "Incorrect. Compressed air is clean ambient air, not toxic ozone gas.",
          "Incorrect. Air leaks represent pure energy waste, not planned environmental ventilation.",
          "Incorrect. Sealing leaks restores and stabilizes operating pressure for pneumatic tools."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      },
      {
        "order": 6,
        "question": "How does installing occupancy and daylight-harvesting motion sensors in restrooms, meeting rooms, and perimeter office corridors reduce workplace energy waste?",
        "options": [
          "By permanently blinding room occupants with high-intensity flashing strobe lights.",
          "By automatically shutting off or dimming lights when spaces are unoccupied or when natural daylight provides adequate illumination, eliminating human forgetfulness.",
          "By locking occupants inside meeting rooms until they complete energy quizzes.",
          "By converting room sound waves into flammable propane gas."
        ],
        "correct": 1,
        "correctExplanation": "Occupancy sensors and daylight harvesting automate lighting control: turning fixtures off when rooms are empty and dimming perimeter zones when natural sunlight is sufficient, saving 30%–50% of lighting electricity.",
        "incorrectExplanation": "Sensors provide gentle automated dimming rather than strobes, do not lock doors, and are electronic sensors with no relation to propane synthesis.",
        "optionFeedback": [
          "Incorrect. Modern lighting controls provide comfortable, seamless illumination transitions.",
          "Correct. Automated occupancy and daylight sensing eliminates lighting waste in intermittently used areas.",
          "Incorrect. Automated controls govern lighting circuits without interfering with egress or door locks.",
          "Incorrect. Electronic sensors measure infrared motion and light levels, not gas generation."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      },
      {
        "order": 7,
        "question": "When evaluating thermal heat gain through large glass windows in a sunny office facade, which passive architectural measure reduces air conditioning cooling demand without increasing electricity usage?",
        "options": [
          "Painting the outside glass windows with dark black oil paint to attract maximum sunlight.",
          "Installing diesel jet engines on the window sills to blow the sun away.",
          "Applying solar control window films or exterior louvers/shading screens to block solar infrared heat before it enters the building.",
          "Removing all window glass permanently and leaving open holes during rainstorms."
        ],
        "correct": 2,
        "correctExplanation": "Solar control films and exterior shading louvers block solar heat gain (infrared radiation) from penetrating the glass envelope, substantially reducing indoor temperatures and chiller cooling loads passively.",
        "incorrectExplanation": "Black paint absorbs heat and darkens interiors, jet engines are absurd, and removing glass allows rain, humidity, and insects inside.",
        "optionFeedback": [
          "Incorrect. Dark paint absorbs heat and destroys natural daylighting.",
          "Incorrect. Solar shading utilizes passive architectural geometry, not mechanical propulsion.",
          "Correct. Solar control films and shading block solar thermal radiation, passively reducing cooling load.",
          "Incorrect. Removing glazing destroys building envelope weatherproofing and indoor climate control."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      },
      {
        "order": 8,
        "question": "A manufacturing plant has several large electric motors driving conveyor belts and pumps. Why does installing Variable Frequency Drives (VFDs) on motors with varying load requirements save significant energy?",
        "options": [
          "VFDs make motors rotate backwards to generate free electricity for the entire town.",
          "VFDs are decorative plastic badges that have no electrical connection to the motor.",
          "VFDs increase motor electricity consumption by 300% to test electrical breaker strength.",
          "VFDs allow motors to run at reduced rotational speed during partial load conditions; because pump and fan power scales with the cube of speed (Affinity Laws), minor speed reductions yield massive power savings."
        ],
        "correct": 3,
        "correctExplanation": "Under pump and fan affinity laws, power consumption is proportional to the cube of rotational speed (P ∝ N^3). Slowing a motor by just 20% can reduce power consumption by nearly 50%, making VFDs highly effective.",
        "incorrectExplanation": "VFDs control operating frequency and speed safely rather than spinning backwards, are functional electronic power converters, and save rather than waste power.",
        "optionFeedback": [
          "Incorrect. VFDs regulate motor speed and torque safely, not reverse grid generation.",
          "Incorrect. VFDs are advanced solid-state electrical power control equipment.",
          "Incorrect. VFDs reduce motor energy consumption substantially during partial-load operation.",
          "Correct. VFDs modulate motor speed to match actual demand, leveraging cubic affinity laws for dramatic savings."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      },
      {
        "order": 9,
        "question": "What simple behavioral step should office workers take before leaving for long holiday weekends to eliminate 'phantom load' electricity consumption?",
        "options": [
          "Turning on all water heaters and oven burners to maximum heat.",
          "Switching off power strips, unplugging non-essential countertop appliances (microwaves, water kettles, display screens), and ensuring all localized AC units are powered down.",
          "Leaving all photocopiers in continuous high-speed test printing mode.",
          "Disconnecting the main municipal electrical grid transformer with a metal pole."
        ],
        "correct": 1,
        "correctExplanation": "Switching off power bars and unplugging peripheral electronics prevents phantom power draw (standby power consumed by transformers and circuitry) while offices are vacant over weekends.",
        "incorrectExplanation": "Leaving appliances running on high is wasteful and dangerous, continuous printing wastes paper and energy, and tampering with grid transformers is illegal and lethal.",
        "optionFeedback": [
          "Incorrect. Leaving heating appliances running unattended creates extreme fire hazards and power waste.",
          "Correct. Powering down power strips and unplugging idle appliances eliminates phantom standby loads.",
          "Incorrect. Unattended continuous printing wastes immense paper, toner, and electrical power.",
          "Incorrect. Tampering with electrical utility infrastructure is extremely dangerous, illegal, and life-threatening."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      },
      {
        "order": 10,
        "question": "A workplace green team wants to launch a 30-day energy conservation challenge among departments. Which key performance metric provides transparent, motivating feedback to staff?",
        "options": [
          "Guessing energy use by observing the weather outside without looking at electric meters.",
          "Fining individual employees cash penalties for turning on desk task lamps.",
          "Tracking daily/weekly kilowatt-hour (kWh) submeter consumption, calculating percentage reductions against a historical baseline, and celebrating the winning department with team recognition.",
          "Keeping electricity data strictly confidential so employees cannot know if progress is occurring."
        ],
        "correct": 2,
        "correctExplanation": "Transparent energy data tracking (kWh sub-metering compared to a verified baseline) paired with positive recognition and goal-setting drives collective employee engagement and sustained habit formation.",
        "incorrectExplanation": "Guessing lacks credibility, punitive fines demotivate staff, and concealing data prevents feedback and learning.",
        "optionFeedback": [
          "Incorrect. Objective data from meters is essential for measuring and verifying real energy savings.",
          "Incorrect. Punitive financial penalties create resentment and undermine positive sustainability culture.",
          "Correct. Sub-metered kWh tracking, baseline comparisons, and team recognition drive engaged conservation.",
          "Incorrect. Transparent data sharing is fundamental to empowering employee action and accountability."
        ],
        "competencyArea": "Workplace Energy Conservation & HVAC Efficiency"
      }
    ]
  },
  {
    "courseId": 4,
    "courseCode": "ELH-04",
    "title": "Water Conservation",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "An administrative officer in a commercial office building notices a continuous trickle of water in a staff restroom toilet bowl. Why should this be reported and repaired immediately?",
        "options": [
          "A single running toilet flapper valve can silently waste 500 to 1,000 liters of potable water every day, resulting in thousands of rupees in avoidable utility water charges every month.",
          "Running toilets generate toxic radiation that corrupts office computer servers.",
          "Toilet flappers are legally required to run continuously under municipal plumbing codes.",
          "Running toilets convert freshwater into flammable natural gas."
        ],
        "correct": 0,
        "correctExplanation": "A degraded toilet flapper or fill valve is a major source of silent water loss, leaking hundreds of liters per day. Rapid reporting and seal replacement eliminate substantial utility losses.",
        "incorrectExplanation": "Toilets do not emit radiation, continuous leaking breaches water conservation standards, and plumbing systems do not generate natural gas.",
        "optionFeedback": [
          "Correct. Prompt flapper valve repair prevents the loss of hundreds of liters of clean municipal water daily.",
          "Incorrect. Leaking plumbing fixtures present financial and environmental waste, not radiological hazards.",
          "Incorrect. Plumbing standards mandate leak-free, water-efficient sanitary installations.",
          "Incorrect. Domestic water leaks represent pure resource waste without chemical gas generation."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      },
      {
        "order": 2,
        "question": "When retrofitting standard commercial bathroom faucets with low-flow aerators, how do aerators reduce water consumption without degrading the user handwashing experience?",
        "options": [
          "Aerators permanently shut off water flow so employees must wash hands with rubbing alcohol.",
          "Aerators entrain air into the water stream, maintaining high perceived pressure and spray coverage while cutting actual volumetric water flow from 9–12 L/min down to 2–4 L/min.",
          "Aerators boil the water to steam before it exits the faucet.",
          "Aerators increase water flow by 400% to clean hands faster."
        ],
        "correct": 1,
        "correctExplanation": "Aerators mix ambient air into the water flow, creating a soft, voluminous stream that maintains effective rinsing sensation while reducing water volume by 50%–70%.",
        "incorrectExplanation": "Aerators maintain water flow rather than shutting it off, do not boil water, and reduce rather than increase flow rates.",
        "optionFeedback": [
          "Incorrect. Aerators maintain continuous running water while reducing flow volume efficiently.",
          "Correct. Air entrainment preserves effective handwashing sensation while slashing flow by 50%–70%.",
          "Incorrect. Faucet aerators are mechanical flow restrictors that do not alter water temperature.",
          "Incorrect. Aerators restrict flow down to water-saving levels (e.g., 2–4 liters per minute)."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      },
      {
        "order": 3,
        "question": "A hotel or commercial facility in Mauritius maintains extensive decorative tropical gardens. What irrigation schedule minimizes water loss from solar evaporation and wind drift?",
        "options": [
          "Watering lawns continuously at 1:00 PM during maximum midday tropical sun.",
          "Irrigating lawns with boiling hot water to eliminate weeds.",
          "Irrigating in the early morning (before 7:00 AM) or late evening using drip irrigation emitters at root level rather than overhead sprayers during midday heat.",
          "Flooding garden pathways and parking lots with potable water every two hours."
        ],
        "correct": 2,
        "correctExplanation": "Early morning or late evening drip irrigation delivers water directly to root zones when ambient temperatures and winds are lowest, minimizing evaporative loss by up to 50% compared to midday overhead spraying.",
        "incorrectExplanation": "Midday watering loses immense water to rapid evaporation, boiling water kills landscaping plants, and flooding pavements is pure water waste.",
        "optionFeedback": [
          "Incorrect. Midday watering loses up to 50% of water directly to solar evaporation.",
          "Incorrect. Boiling water damages root systems and destroys decorative landscaping.",
          "Correct. Early morning drip irrigation delivers water directly to soil roots with minimal evaporative loss.",
          "Incorrect. Spraying hard surfaces like pavements and parking lots constitutes pure utility waste."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      },
      {
        "order": 4,
        "question": "During periods of seasonal water restriction or drought in Mauritius, how does installing rainwater harvesting tanks for landscape irrigation and toilet flushing strengthen business resilience?",
        "options": [
          "Rainwater harvesting tanks cause building roofs to collapse under normal weather.",
          "Rainwater harvesting eliminates the need for companies to ever pay employee wages.",
          "Harvested rainwater can only be legally used to extinguish electrical fires.",
          "It captures free storm runoff, reduces reliance on treated municipal potable water for non-potable needs, and ensures backup water security during network supply cuts."
        ],
        "correct": 3,
        "correctExplanation": "Rainwater harvesting offsets municipal potable water demand for secondary uses (cooling tower makeup, landscaping, toilet flushing) and provides on-site storage buffers during utility water cuts.",
        "incorrectExplanation": "Properly engineered roof gutters and tanks are structurally safe, rainwater collection is unrelated to payroll, and rainwater is unsuitable for electrical fires.",
        "optionFeedback": [
          "Incorrect. Engineered rainwater harvesting systems operate safely with standard drainage infrastructure.",
          "Incorrect. Facility utility management is independent of employee compensation obligations.",
          "Incorrect. Water should never be applied to energized electrical fires due to electrocution risks.",
          "Correct. Rainwater harvesting provides non-potable water independence and buffers against drought shortages."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      },
      {
        "order": 5,
        "question": "A commercial laundry or hospitality facility is evaluating water conservation measures. How does installing an ozone-assisted laundry wash system reduce both water and energy consumption?",
        "options": [
          "Ozone (O3) acts as a powerful low-temperature oxidizing disinfectant, allowing effective soil removal in cold water with fewer rinse cycles, cutting water use by 30%–40% and heating energy by 70%–80%.",
          "Ozone systems replace all laundry water with heavy motor oil.",
          "Ozone laundry requires heating water to 500°C under extreme nuclear pressure.",
          "Ozone laundry dissolves all clothing into liquid within five minutes."
        ],
        "correct": 0,
        "correctExplanation": "Ozone dissolves in cold water to break down organic stains and sanitize fabrics, eliminating the need for thermal hot water washing and reducing the number of rinse cycles required to clear detergent.",
        "incorrectExplanation": "Ozone uses water rather than motor oil, operates in cold ambient temperatures, and preserves rather than dissolves textile fibers.",
        "optionFeedback": [
          "Correct. Ozone laundry cleans effectively in cold water with fewer rinses, saving immense water and heating gas.",
          "Incorrect. Commercial laundry uses aqueous wash chemistry, never petroleum lubricants.",
          "Incorrect. Ozone operates at ambient cold water temperatures, eliminating thermal heating demand.",
          "Incorrect. Ozone wash cycles protect textile tensile strength and extend linen lifespan."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      },
      {
        "order": 6,
        "question": "In a manufacturing facility operating a large central evaporative cooling tower, what does 'Cycles of Concentration' (CoC) measure and how does increasing CoC conserve water?",
        "options": [
          "CoC measures the number of times workers circle the cooling tower on foot every shift.",
          "Increasing CoC means the recirculating cooling water is reused more times before mineral buildup requires blowdown drainage and fresh makeup water, directly saving millions of liters annually.",
          "CoC measures the volume of gasoline added to cooling water tanks.",
          "Increasing CoC causes cooling towers to generate radioactive steam."
        ],
        "correct": 1,
        "correctExplanation": "Cycles of Concentration (CoC) compares dissolved solids in recirculating water to makeup water. Raising CoC from 2 to 5 reduces blowdown bleed-off and makeup water demand significantly.",
        "incorrectExplanation": "CoC is a water chemistry parameter rather than walking laps, gasoline is never added to cooling water, and cooling towers emit harmless water vapor.",
        "optionFeedback": [
          "Incorrect. Cycles of Concentration is a thermodynamic and water chemistry metric, not human footsteps.",
          "Correct. Higher CoC optimizes water reuse before blowdown bleed, substantially reducing freshwater makeup needs.",
          "Incorrect. Cooling towers circulate water, never flammable hydrocarbons.",
          "Incorrect. Evaporative cooling towers emit clean water vapor, with zero radiological contamination."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      },
      {
        "order": 7,
        "question": "An employee notices a dripping outdoor hose bib at a delivery loading dock that loses approximately two drops per second. Over the course of a full year, approximately how much treated water is wasted if left unaddressed?",
        "options": [
          "Less than one thimble of water over the entire year.",
          "Exactly zero water because drops evaporate before touching the ground.",
          "Approximately 4,000 to 8,000 liters of treated potable water, representing thousands of liters of preventable resource loss.",
          "Over 500 million liters, enough to submerge the entire island of Mauritius."
        ],
        "correct": 2,
        "correctExplanation": "A slow drip of two drops per second loses approximately 15–20 liters per day, compounding to over 6,000 liters of wasted treated water annually from a single unmaintained faucet.",
        "incorrectExplanation": "Drips accumulate rapidly beyond a thimble, evaporation does not prevent loss from the utility line, and 500 million liters is vastly overstated for a single tap.",
        "optionFeedback": [
          "Incorrect. Even slow drips accumulate into thousands of liters of cumulative annual loss.",
          "Incorrect. Water escaping the tap registers on the utility meter regardless of surface evaporation.",
          "Correct. Continuous dripping leaks thousands of liters of treated potable water annually.",
          "Incorrect. Physical flow rates from a dripping tap are in the thousands of liters annually, not millions."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      },
      {
        "order": 8,
        "question": "When installing dual-flush toilet retrofit valves across an office building, how should the flush mechanisms be operated to achieve intended water conservation?",
        "options": [
          "Pushing both buttons simultaneously with a screwdriver on every flush.",
          "Holding the handle down for 10 minutes to drain the municipal water reservoir.",
          "Pouring laundry detergent powder into the cistern tank before every flush.",
          "Using the half-flush button (3–4 liters) for liquid waste and the full-flush button (6 liters) only for solid waste, cutting flush water demand by up to 40% compared to legacy 9-liter single flush tanks."
        ],
        "correct": 3,
        "correctExplanation": "Dual-flush systems provide appropriate volumetric flushing: smaller volume for liquid waste and standard volume for solids, saving millions of liters across commercial office populations.",
        "incorrectExplanation": "Dual buttons are pressed individually, holding handles wastes water, and detergent in cisterns can degrade rubber flapper seals.",
        "optionFeedback": [
          "Incorrect. Dual flush buttons are designed for simple single-finger selection.",
          "Incorrect. Prolonged holding of flush levers defeats water-saving valve design.",
          "Incorrect. Harsh chemical powders can corrode internal rubber valve seals and cause leaks.",
          "Correct. Using the half-flush for liquids and full-flush for solids cuts sanitary water consumption by ~40%."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      },
      {
        "order": 9,
        "question": "Why should commercial facilities in coastal areas of Mauritius conduct periodic testing for groundwater salinity when operating on-site borehole water extraction?",
        "options": [
          "To ensure that seawater tastes sweeter when mixed with coffee in the cafeteria.",
          "Because excessive groundwater pumping can cause seawater intrusion into coastal aquifers, permanently contaminating freshwater reserves with saline intrusion.",
          "Because saline water is required by law to clean office carpets.",
          "To convert borehole wells into commercial table salt mines."
        ],
        "correct": 1,
        "correctExplanation": "Over-extraction of groundwater near coastlines lowers the freshwater table, pulling seawater into the aquifer (saltwater intrusion) and permanently degrading local freshwater resources.",
        "incorrectExplanation": "Saltwater is unpalatable, saline water corrodes pipes and damages fabrics, and coastal boreholes are meant for sustainable water extraction rather than salt mining.",
        "optionFeedback": [
          "Incorrect. Saline water is unpalatable and damages beverage preparation equipment.",
          "Correct. Regular salinity testing prevents aquifer over-drafting and protects coastal freshwater tables from saline intrusion.",
          "Incorrect. Saline water leaves corrosive mineral crusts and ruins textiles and machinery.",
          "Incorrect. Sustainable borehole management preserves freshwater aquifers for ongoing operations."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      },
      {
        "order": 10,
        "question": "A facility team is executing a 30-day Water Stewardship initiative across an industrial complex. Which four-step action plan delivers verified water conservation?",
        "options": [
          "Leaving all faucets open overnight to test municipal water pressure.",
          "Canceling all plumbing maintenance to reduce operating budgets.",
          "Conducting a facility water audit to log submeter baselines, repairing all identified leaks within 48 hours, retrofitting faucets with 2 L/min aerators, and installing submeters on high-use cooling/laundry equipment.",
          "Prohibiting employees from drinking water during working hours."
        ],
        "correct": 2,
        "correctExplanation": "A comprehensive water stewardship plan integrates empirical metering, rapid leak remediation, fixture efficiency upgrades (aerators/dual flush), and continuous monitoring of major water-consuming assets.",
        "incorrectExplanation": "Leaving taps open causes immense water loss, canceling maintenance guarantees severe leaks, and withholding drinking water violates basic human rights and labor laws.",
        "optionFeedback": [
          "Incorrect. Leaving taps running unattended creates catastrophic water waste and flooding risks.",
          "Incorrect. Neglecting plumbing maintenance accelerates leak losses and infrastructure degradation.",
          "Correct. Auditing baselines, prompt leak repair, aerator retrofits, and high-use submetering drive verified savings.",
          "Incorrect. Providing clean drinking water to employees is a mandatory health, safety, and legal requirement."
        ],
        "competencyArea": "Commercial Water Efficiency & Fixture Maintenance"
      }
    ]
  },
  {
    "courseId": 5,
    "courseCode": "ELH-05",
    "title": "Sustainable Purchasing for Non-Specialists",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "An administrative assistant is ordering 50 reams of copy paper for the office. How does evaluating Total Cost of Ownership (TCO) and certified sustainability differ from buying purely on lowest unit purchase price?",
        "options": [
          "Purchasing FSC or PEFC certified 100% recycled paper ensures deforestation-free fiber, while evaluating printer jam rates and double-sided print capability lowers total operational paper waste and cost over time.",
          "Buying the cheapest paper from unknown suppliers guarantees that trees are planted on Mars.",
          "Sustainable purchasing means never purchasing paper and writing all commercial contracts on sand.",
          "Certified paper is required by international law to be decorated with real gold leaf."
        ],
        "correct": 0,
        "correctExplanation": "Sustainable purchasing looks beyond initial invoice cost: verifying credible eco-labels (FSC/PEFC) to protect forests, while ensuring high technical runnability (preventing printer jams and waste).",
        "incorrectExplanation": "Cheapest unverified paper often causes printer jams and deforestation, paper remains necessary for certain legal records, and eco-labels certify sustainability, not gold leaf.",
        "optionFeedback": [
          "Correct. FSC/PEFC certification guarantees responsible forestry while reliable paper runnability prevents waste.",
          "Incorrect. Uncertified low-grade paper frequently causes printer jams and originates from deforestation.",
          "Incorrect. Digital workflows reduce paper, but essential records require sustainable, certified paper.",
          "Incorrect. Eco-labels verify ethical environmental and social supply chain standards."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      },
      {
        "order": 2,
        "question": "A department lead is procuring new computer monitors and office appliances. Which recognized international energy eco-label confirms that the electronics meet stringent energy-efficiency and standby-power standards?",
        "options": [
          "A handwritten label from the delivery truck driver stating 'very good screen'.",
          "ENERGY STAR, EPEAT (Electronic Product Environmental Assessment Tool), or EU Energy Label ratings (A/B/C class).",
          "A colorful cartoon sticker showing a smiling polar bear with zero certified test metrics.",
          "An encrypted cryptocurrency token proving ownership of a digital image."
        ],
        "correct": 1,
        "correctExplanation": "ENERGY STAR and EPEAT are globally recognized third-party certifications verifying that electronics consume minimal active and standby power, contain reduced hazardous substances, and are designed for disassembly and recycling.",
        "incorrectExplanation": "Handwritten notes carry no engineering validity, cartoon stickers are unverified marketing (greenwashing), and cryptocurrency tokens do not test hardware energy draw.",
        "optionFeedback": [
          "Incorrect. Informal handwritten notes carry zero technical or environmental certification validity.",
          "Correct. ENERGY STAR and EPEAT provide accredited, verified proof of high energy efficiency and durability.",
          "Incorrect. Unverified marketing illustrations without testing standards represent greenwashing.",
          "Incorrect. Digital crypto tokens have zero bearing on the physical energy efficiency of electronics."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      },
      {
        "order": 3,
        "question": "When ordering commercial cleaning supplies for office kitchens and restrooms, why should non-specialist buyers look for third-party eco-certifications (e.g., EU Ecolabel, Green Seal, or Cradle to Cradle) rather than vague terms like 'eco-friendly'?",
        "options": [
          "Because 'eco-friendly' is a legally binding guarantee protected by the United Nations.",
          "Because uncertified chemicals can be dumped into municipal drinking water reservoirs safely.",
          "Because certified products are tested to ensure they avoid caustic chemicals, carcinogens, and persistent aquatic toxins while maintaining effective cleaning performance, whereas 'eco-friendly' is unregulated marketing.",
          "Because certified cleaning products are required to turn drinking water into wine."
        ],
        "correct": 2,
        "correctExplanation": "Third-party eco-labels verify that cleaning formulas are biodegradable, non-toxic to aquatic life, free from volatile organic compounds (VOCs), and packaged in recycled plastic. Vague marketing claims lack independent verification.",
        "incorrectExplanation": "Chemicals must never enter water reservoirs, 'eco-friendly' is unregulated greenwashing, and cleaning products are commercial detergents.",
        "optionFeedback": [
          "Incorrect. Vague terms like 'eco-friendly' or 'natural' are unregulated marketing assertions.",
          "Incorrect. Discharging cleaning chemicals into drinking water sources is illegal and hazardous.",
          "Correct. Accredited eco-labels verify non-toxic chemistry, biodegradability, and safe occupational exposure.",
          "Incorrect. Certified cleaners are standard, professional, biodegradable chemical formulations."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      },
      {
        "order": 4,
        "question": "An office manager needs to order catering for a 30-person departmental training workshop. Which purchasing strategy minimizes food waste and single-use packaging?",
        "options": [
          "Ordering 150 individually plastic-wrapped snack boxes and 200 single-use plastic water bottles.",
          "Banning food completely so employees fast during the entire 8-hour workday.",
          "Throwing all untouched leftover food into general waste dumpsters immediately after lunch.",
          "Confirming exact attendee counts in advance, requesting buffet-style locally sourced finger foods served on reusable ceramic platters with refillable water carafes, and arranging safe donation of surplus."
        ],
        "correct": 3,
        "correctExplanation": "Sustainable catering relies on accurate headcount planning, reusable serviceware (eliminating single-use disposables), local seasonal menu items, and structured surplus food management.",
        "incorrectExplanation": "Individual plastic wrapping generates immense plastic waste, food deprivation is inhumane and unproductive, and throwing edible food away is wasteful.",
        "optionFeedback": [
          "Incorrect. Excessive ordering and individual plastic wrapping maximize waste and disposal costs.",
          "Incorrect. Providing healthy refreshments maintains employee wellbeing and productivity.",
          "Incorrect. Discarding edible food waste contributes to organic landfill decomposition and methane emissions.",
          "Correct. Accurate headcount planning, reusable serviceware, and local food reduce waste and carbon footprint."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      },
      {
        "order": 5,
        "question": "When purchasing office furniture (desks, ergonomic chairs), how does evaluating modularity and repairability support circular economy principles?",
        "options": [
          "Modular furniture allows worn armrests, fabric cushions, or gas cylinders to be replaced individually, extending total asset life by 10+ years instead of discarding the entire chair when one part wears out.",
          "Modular furniture must be crushed in an industrial shredder every six months.",
          "Repairable furniture is strictly illegal in all corporate commercial offices.",
          "Buying repairable furniture requires hiring 500 full-time carpentry staff on site."
        ],
        "correct": 0,
        "correctExplanation": "Modularity and available spare parts enable component-level repair (replacing worn fabric or wheels), extending asset lifespan and avoiding premature landfill disposal of heavy metal and plastic structures.",
        "incorrectExplanation": "Shredding functional furniture destroys value, modularity is a circular best practice, and modular repairs require standard maintenance tools rather than 500 carpenters.",
        "optionFeedback": [
          "Correct. Replaceable components and modular design extend furniture lifespan and prevent unnecessary disposal.",
          "Incorrect. Premature destruction of functional assets destroys capital and generates unnecessary waste.",
          "Incorrect. Modular, repairable procurement is actively encouraged by corporate circular economy standards.",
          "Incorrect. Modular furniture components are easily serviced by standard facility maintenance personnel."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      },
      {
        "order": 6,
        "question": "A company procurement coordinator is reviewing quotations from local transport and courier providers. Which evaluation criterion favors sustainable logistics?",
        "options": [
          "Selecting the carrier that uses 30-year-old diesel trucks emitting thick black exhaust smoke.",
          "Evaluating fleet fuel efficiency, use of electric delivery vans or route-optimization software, consolidated delivery scheduling, and verified safety records.",
          "Requiring courier packages to be wrapped in 10 layers of single-use plastic bubble wrap.",
          "Insisting that couriers deliver one envelope per individual truck trip regardless of destination."
        ],
        "correct": 1,
        "correctExplanation": "Sustainable logistics evaluates route optimization, consolidated multi-drop scheduling, and modern fuel-efficient/EV fleet technology, reducing Scope 3 transportation emissions and localized particulate pollution.",
        "incorrectExplanation": "Old polluting trucks increase emissions and health risks, excessive bubble wrap generates plastic waste, and single-envelope trips multiply transport emissions.",
        "optionFeedback": [
          "Incorrect. High-emission diesel fleets increase localized air pollution and corporate Scope 3 footprint.",
          "Correct. Fleet modernization, EV adoption, and route consolidation reduce transport emissions substantially.",
          "Incorrect. Excessive plastic wrapping inflates packaging waste and disposal costs.",
          "Incorrect. Fragmented delivery trips multiply fuel consumption and urban traffic congestion."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      },
      {
        "order": 7,
        "question": "What is 'Greenwashing' in vendor product marketing and how can non-specialist buyers protect their organization from it?",
        "options": [
          "Greenwashing is the physical process of washing green fruits with garden hoses.",
          "Greenwashing is mandatory under international consumer protection treaties.",
          "Greenwashing is the deceptive practice of making exaggerated or unsubstantiated environmental claims; buyers protect themselves by requiring verified third-party certifications and independent test data.",
          "Greenwashing means painting all purchased office equipment with green acrylic paint."
        ],
        "correct": 2,
        "correctExplanation": "Greenwashing involves misleading marketing that claims products are 'green' without evidence. Buyers mitigate this risk by demanding credible third-party verification (e.g., ISO 14024 Type I eco-labels, FSC, GOTS).",
        "incorrectExplanation": "Greenwashing is a term for deceptive marketing, not washing fruits or painting equipment, and is prohibited or penalized under consumer protection laws.",
        "optionFeedback": [
          "Incorrect. Greenwashing refers to deceptive commercial environmental marketing, not cleaning produce.",
          "Incorrect. Consumer protection agencies actively penalize misleading green claims and greenwashing.",
          "Correct. Demanding accredited third-party certifications protects against false or unsubstantiated green claims.",
          "Incorrect. Superficial color branding carries zero environmental or technical performance value."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      },
      {
        "order": 8,
        "question": "When ordering branded corporate merchandise or client promotional gifts, which selection aligns best with responsible sustainable procurement?",
        "options": [
          "Cheap plastic novelty trinkets that break within minutes and end up in the landfill immediately.",
          "Promotional gifts made of toxic lead-contaminated plastic from uninspected factories.",
          "Single-use plastic pens that cannot be refilled and dry out after two uses.",
          "High-utility, durable items made from certified recycled or organic materials (e.g., refillable metal pens, organic cotton tote bags, stainless steel thermal flasks) designed for multi-year daily use."
        ],
        "correct": 3,
        "correctExplanation": "Sustainable corporate merchandise emphasizes utility, durability, and recycled/organic material provenance, ensuring items are valued and used repeatedly rather than discarded as immediate waste.",
        "incorrectExplanation": "Cheap plastic trinkets and disposable items generate instant landfill waste, damage brand reputation, and waste marketing budgets.",
        "optionFeedback": [
          "Incorrect. Disposable plastic novelties create immediate waste and convey low brand value.",
          "Incorrect. Hazardous or uncertified promotional products present severe liability and reputational risks.",
          "Incorrect. Low-durability disposable pens represent unnecessary single-use plastic consumption.",
          "Correct. Durable, high-utility recycled/organic merchandise reinforces sustainability values and long-term utility."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      },
      {
        "order": 9,
        "question": "Why is asking suppliers about packaging return programs or bulk packaging consolidation an effective sustainable procurement practice?",
        "options": [
          "Because suppliers are legally required to burn all returned packaging in public parks.",
          "Because returning reusable pallets, totes, and drums eliminates single-use packaging waste at the source and frequently lowers total product unit purchase pricing.",
          "Because single-use packaging is required to be made of endangered hardwood timber.",
          "Because reusable totes cause products inside them to vanish into alternate dimensions."
        ],
        "correct": 1,
        "correctExplanation": "Closed-loop packaging agreements (reusable plastic totes, standard wooden pallet return loops) eliminate thousands of single-use cardboard boxes and plastic wraps, lowering waste handling and procurement costs.",
        "incorrectExplanation": "Suppliers clean and reuse returned packaging rather than burning it, packaging should avoid endangered timber, and reusable containers protect physical products securely.",
        "optionFeedback": [
          "Incorrect. Returnable packaging systems are designed for closed-loop cleaning, reuse, and remanufacturing.",
          "Correct. Closed-loop returnable totes and pallets eliminate single-use packaging and cut supply chain costs.",
          "Incorrect. Sustainable packaging uses certified recycled fiber and avoids deforestation.",
          "Incorrect. Reusable containers provide durable physical protection during transit and storage."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      },
      {
        "order": 10,
        "question": "A non-specialist buyer is establishing a 30-day Sustainable Purchasing Checklist for general office supplies. Which four-step sequence should guide purchasing decisions?",
        "options": [
          "1) Order maximum quantities of single-use items, 2) Throw away invoices, 3) Refuse to inspect deliveries, 4) Ban recycling.",
          "1) Purchase immediately from first search result, 2) Ignore certifications, 3) Select express air freight, 4) Discard excess items.",
          "1) Question if purchase is truly necessary, 2) Specify durable/reusable/recycled criteria, 3) Verify accredited third-party eco-labels, 4) Evaluate total lifecycle cost rather than upfront price alone.",
          "1) Pay cash under the table, 2) Conceal supplier names, 3) Delete procurement records, 4) Discard packaging in rivers."
        ],
        "correct": 2,
        "correctExplanation": "A structured sustainable purchasing checklist begins with demand challenge (is it needed?), defines eco-criteria (reusable/recycled), verifies credible certifications, and calculates total lifecycle value.",
        "incorrectExplanation": "Impulsive buying without criteria leads to waste, ordering single-use items inflates landfill disposal, and concealing records breaches basic procurement ethics.",
        "optionFeedback": [
          "Incorrect. Bulk ordering unneeded single-use items wastes financial resources and creates disposal burdens.",
          "Incorrect. Unscreened impulsive purchasing leads to poor quality, high carbon emissions, and excessive waste.",
          "Correct. Demand evaluation, sustainability specifications, eco-label verification, and lifecycle costing ensure responsible purchasing.",
          "Incorrect. Unethical procurement breaches anti-corruption laws and violates corporate governance standards."
        ],
        "competencyArea": "Everyday Sustainable Purchasing & Eco-Labels"
      }
    ]
  },
  {
    "courseId": 6,
    "courseCode": "ELH-06",
    "title": "Green Office Practices",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "An administrative coordinator is transitioning an office from paper-based file storage to digital cloud workflows. Beyond direct paper savings, what secondary environmental and operational benefit does digital archiving provide?",
        "options": [
          "Digital archiving reduces physical office floor space needed for heavy metal filing cabinets, eliminates courier transit emissions for physical signatures, and enables instant searchability.",
          "Digital archiving converts all computer servers into solar-powered electric cars.",
          "Digital workflows permanently eliminate the need for electricity in the building.",
          "Digital files are legally required to be printed out on paper every 15 minutes."
        ],
        "correct": 0,
        "correctExplanation": "Digitizing documentation eliminates square footage needed for storage archives, removes transport emissions from physical document couriers, accelerates business processes, and cuts printing consumables (toner, paper).",
        "incorrectExplanation": "Cloud servers do not become cars, digital systems consume modest data center electricity, and constant reprinting defeats digital workflow benefits.",
        "optionFeedback": [
          "Correct. Digital documentation reduces archive footprint, courier transport, paper/toner use, and retrieval time.",
          "Incorrect. Digital document systems streamline data management, unrelated to automotive manufacturing.",
          "Incorrect. Digital infrastructure requires reliable, efficient electrical power.",
          "Incorrect. Digital workflows aim to eliminate routine paper printing, retaining paper only when strictly mandated."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      },
      {
        "order": 2,
        "question": "When operating multi-function network printers in an office environment, which default print configuration significantly cuts paper and consumable consumption across the entire workforce?",
        "options": [
          "Setting the driver default to single-sided, high-gloss full-color mode for all print jobs.",
          "Configuring 'Follow-Me / Badge-Authenticated' printing with mandatory Double-Sided (Duplex) and Draft Greyscale default settings.",
          "Programming printers to print five extra blank pages after every document.",
          "Removing all toner cartridges so printers only make loud mechanical noises."
        ],
        "correct": 1,
        "correctExplanation": "Badge-authenticated 'Follow-Me' printing eliminates unclaimed print jobs left in output trays (up to 15%–30% of total print volume), while defaulting to duplex greyscale cuts paper usage by up to 50% and preserves expensive color toner.",
        "incorrectExplanation": "Single-sided color maximizes waste, printing extra blank pages wastes paper, and removing toner renders printers useless.",
        "optionFeedback": [
          "Incorrect. Single-sided color defaults double paper usage and consume expensive color toner unnecessarily.",
          "Correct. Badge authentication and duplex greyscale defaults prevent abandoned print jobs and halve paper volume.",
          "Incorrect. Generating blank separator sheets wastes clean paper and fills disposal bins.",
          "Incorrect. Printers must function cleanly and efficiently for necessary business documentation."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      },
      {
        "order": 3,
        "question": "An office manager wants to improve indoor air quality and employee cognitive wellbeing in an urban office in Mauritius. Which workplace intervention delivers proven environmental and wellness benefits?",
        "options": [
          "Spraying heavy synthetic aerosol air fresheners every 10 minutes in meeting rooms.",
          "Sealing all doors with duct tape to prevent fresh outdoor oxygen from entering.",
          "Introducing non-toxic, indoor air-purifying potted plants (e.g., Peace Lily, Snake Plant, Areca Palm), optimizing fresh air ventilation rates, and using low-VOC paints and cleaning agents.",
          "Banning all indoor lighting and requiring staff to work in pitch black rooms."
        ],
        "correct": 2,
        "correctExplanation": "Indoor air quality is enhanced through natural biophilic greenery, low-VOC material selection (paints/sealants), and adequate mechanical fresh air exchange, reducing CO2 buildup, headaches, and fatigue.",
        "incorrectExplanation": "Synthetic aerosols release harmful VOCs and phthalates, sealing doors causes dangerous CO2 buildup, and total darkness strains vision and harms mental health.",
        "optionFeedback": [
          "Incorrect. Aerosol sprays introduce volatile organic compounds and synthetic fragrances that trigger allergies.",
          "Incorrect. Sealing rooms causes suffocating CO2 accumulation and degrades cognitive performance.",
          "Correct. Biophilic greenery, low-VOC materials, and adequate fresh air ventilation improve cognitive focus and wellness.",
          "Incorrect. Adequate, glare-free illumination is essential for visual ergonomics and occupational health."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      },
      {
        "order": 4,
        "question": "During an office kitchen audit, a green team finds that employees discard 200 single-use paper coffee cups, plastic stirrers, and plastic cutlery every day. What is the most effective circular replacement strategy?",
        "options": [
          "Banning all tea, coffee, and water consumption on company property.",
          "Requiring employees to drink hot coffee directly from their cupped hands.",
          "Ordering double the volume of single-use plastic cups and burying them in the parking lot.",
          "Replacing single-use items with washable ceramic mugs, stainless steel teaspoons, and durable cutlery sets, paired with an energy-efficient dishwasher."
        ],
        "correct": 3,
        "correctExplanation": "Providing durable, washable kitchenware (ceramic mugs, glasses, metal cutlery) and an efficient sanitizing dishwasher permanently eliminates thousands of single-use disposable items each month.",
        "incorrectExplanation": "Drinking hot coffee from bare hands causes severe burns, burying plastic is illegal and polluting, and banning beverages violates basic employee welfare standards.",
        "optionFeedback": [
          "Incorrect. Hydration and refreshment amenities are fundamental to employee health and workplace productivity.",
          "Incorrect. Safe sanitary drinking vessels are necessary to prevent severe thermal burn injuries.",
          "Incorrect. Burying single-use plastic creates environmental pollution and violates waste laws.",
          "Correct. Reusable mugs and cutlery eliminate thousands of single-use items, reducing waste and procurement expense."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      },
      {
        "order": 5,
        "question": "How does conducting quarterly 'Digital Data Hygiene' campaigns (encouraging employees to delete obsolete video recordings, duplicate drafts, and empty email spam folders) reduce corporate carbon emissions?",
        "options": [
          "Storing useless digital data consumes continuous electricity for data center servers, cloud backup cooling, and storage drives; cleaning digital clutter lowers unnecessary cloud energy demand.",
          "Digital data deletion physically makes computer monitors lighter in weight.",
          "Deleting emails causes computer keyboards to turn into solid silver.",
          "Digital storage uses zero energy and has no environmental footprint whatsoever."
        ],
        "correct": 0,
        "correctExplanation": "Cloud storage relies on physical data centers that consume immense electricity 24/7 for server computing and precision cooling. Deleting dark/obsolete data reduces storage footprints and associated Scope 3 cloud energy demand.",
        "incorrectExplanation": "Data weight is subatomic and does not affect monitor weight, keyboards do not turn into silver, and digital storage accounts for significant global electrical consumption.",
        "optionFeedback": [
          "Correct. Cleaning obsolete cloud storage reduces server processing, backup redundancy, and data center energy draw.",
          "Incorrect. Digital files are stored as magnetic/electronic bits with no perceptible physical weight.",
          "Incorrect. Digital hygiene optimizes IT resource efficiency, unrelated to precious metal alchemy.",
          "Incorrect. Global data centers and cloud networks consume significant electrical power and generate real carbon emissions."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      },
      {
        "order": 6,
        "question": "When organizing a hybrid corporate meeting where some participants are remote and others are in the office, what protocol balances collaboration with environmental efficiency?",
        "options": [
          "Flying all overseas participants in private jets for a 30-minute introductory meeting.",
          "Using high-definition video conferencing equipment in dedicated meeting rooms with digital screen sharing, avoiding unnecessary flights and local vehicle travel while providing digital transcripts.",
          "Prohibiting remote workers from speaking during meetings.",
          "Requiring all attendees to send hand-delivered telegrams via horse carriage."
        ],
        "correct": 1,
        "correctExplanation": "Effective hybrid meeting technology eliminates extensive business travel emissions (air and road transport) while maintaining high collaboration through screen sharing, interactive digital whiteboards, and cloud notes.",
        "incorrectExplanation": "Private jet travel generates massive carbon footprints for short meetings, silencing remote staff defeats meeting purpose, and telegram carriages are absurd historical trivia.",
        "optionFeedback": [
          "Incorrect. Short in-person international travel for routine meetings generates excessive carbon emissions.",
          "Correct. High-quality video collaboration avoids travel emissions while ensuring equitable participation.",
          "Incorrect. Inclusive collaboration tools ensure all remote and on-site team members participate equally.",
          "Incorrect. Modern digital telecommunications provide instant, low-carbon collaborative connectivity."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      },
      {
        "order": 7,
        "question": "An administrative team is responsible for managing office stationery supplies. Which practice prevents over-purchasing and reduces consumable waste?",
        "options": [
          "Allowing every employee to order individual stationery packs on personal credit cards without central tracking.",
          "Throwing away all existing pens and notepads at the end of every week.",
          "Establishing a centralized, organized 'Stationery Reallocation Cabinet' where unused folders, binders, and pens from departing staff or completed projects are returned and reused before ordering new items.",
          "Banning all writing materials and forbidding employees from taking meeting notes."
        ],
        "correct": 2,
        "correctExplanation": "A stationery reuse cabinet captures surplus binders, clips, and writing tools, making them available for colleagues and preventing unnecessary duplicate re-ordering of office supplies.",
        "incorrectExplanation": "Uncoordinated purchasing leads to stock hoarding and duplicate spend, weekly disposal wastes functional materials, and banning notes hurts productivity.",
        "optionFeedback": [
          "Incorrect. Decentralized unmonitored purchasing causes inventory hoarding and unnecessary duplicate spending.",
          "Incorrect. Discarding functional stationery generates needless material waste and inflates office budgets.",
          "Correct. Centralized stationery reuse hubs circulate surplus supplies, cutting new procurement costs and waste.",
          "Incorrect. Note-taking and documentation are essential for operational workflow and knowledge management."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      },
      {
        "order": 8,
        "question": "When selecting cleaning chemicals and restroom soaps for an office facility, why are foaming soap dispensers and bulk concentrated refill systems superior to single-use liquid soap cartridges?",
        "options": [
          "Foaming soap requires heating hands with propane blowtorches before washing.",
          "Foaming soap causes hands to turn bright blue permanently.",
          "Liquid soap dispensers are strictly prohibited by international maritime law.",
          "Foaming dispensers mix liquid soap with air at the nozzle, reducing soap consumption per handwash by up to 50%, while bulk 5-liter concentrate refills eliminate dozens of small single-use plastic bottles."
        ],
        "correct": 3,
        "correctExplanation": "Foaming soap aerates the solution at the pump, delivering effective lather with half the chemical volume and less water required for rinsing, while bulk refills eliminate single-use plastic bottle waste.",
        "incorrectExplanation": "Foam soap does not stain skin, liquid dispensers are common in facilities, and washing uses water rather than blowtorches.",
        "optionFeedback": [
          "Incorrect. Handwashing utilizes standard ambient or warm water and safe sanitary dispensers.",
          "Incorrect. Quality commercial hand soaps rinse cleanly without causing skin discoloration.",
          "Incorrect. Hand hygiene dispensers are standard commercial fixtures regulated by health guidelines.",
          "Correct. Foaming pumps reduce soap and rinse water volume, while bulk refills minimize plastic packaging waste."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      },
      {
        "order": 9,
        "question": "What simple behavioral practice should meeting organizers adopt at the end of every conference room booking?",
        "options": [
          "Leaving all lights, projectors, and air conditioners powered on in case someone uses the room tomorrow.",
          "Executing a 30-second room reset: turning off the projector, switching off display screens, adjusting the AC thermostat or turning it off if no immediate booking follows, and erasing whiteboards.",
          "Throwing all chairs and tables out of the window into the courtyard.",
          "Locking the room doors permanently so no one can ever enter again."
        ],
        "correct": 1,
        "correctExplanation": "A rapid meeting room reset ensures AV gear and air conditioning do not run in empty rooms between bookings, saving electricity while leaving the space orderly for the next team.",
        "incorrectExplanation": "Leaving equipment running wastes energy throughout the day, throwing furniture damages assets and endangers people, and locking rooms permanently destroys facility utility.",
        "optionFeedback": [
          "Incorrect. Leaving AV projectors and cooling running in unoccupied rooms causes continuous phantom energy waste.",
          "Correct. Resetting controls, shutting down AV displays, and adjusting thermostats eliminates unoccupied room waste.",
          "Incorrect. Damaging furniture and fixtures violates workplace safety, property, and conduct rules.",
          "Incorrect. Meeting rooms must remain accessible and functional for scheduled collaborative use."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      },
      {
        "order": 10,
        "question": "An administrative department is launching a 30-day Green Office Action Plan. Which balanced program drives measurable sustainability improvements across the workplace?",
        "options": [
          "1) Printing every email on glossy paper, 2) Leaving windows open with AC at 16°C, 3) Throwing all waste in general bins, and 4) Deleting security firewalls.",
          "1) Forbidding employees from eating lunch, 2) Canceling internet connectivity, 3) Banning mobile phones, and 4) Turning off running water.",
          "1) Implementing default duplex greyscale printing, 2) Establishing a centralized stationery reuse hub, 3) Conducting an email/cloud data cleanup campaign, and 4) Replacing single-use kitchen plastics with reusable dishware.",
          "1) Operating diesel generators indoors, 2) Burning paper in wastebaskets, 3) Banning recycling, and 4) Fining staff for walking."
        ],
        "correct": 2,
        "correctExplanation": "A comprehensive green office action plan addresses print management, material reuse, digital cloud efficiency, and kitchen waste reduction, engaging employees across practical operational areas.",
        "incorrectExplanation": "Depriving staff of necessities is illegal and harmful, wasteful printing and energy maximize emissions, and burning paper indoors violates fire safety and environmental law.",
        "optionFeedback": [
          "Incorrect. Excessive printing and wasteful cooling contradict core environmental management principles.",
          "Incorrect. Depriving workers of food, water, and connectivity violates labor standards and cripples business operations.",
          "Correct. Duplex printing, stationery reuse, cloud data hygiene, and reusable kitchenware deliver holistic office sustainability.",
          "Incorrect. Indoor combustion and burning waste create lethal air quality and fire hazards."
        ],
        "competencyArea": "Administrative Sustainability & Digital Office Operations"
      }
    ]
  }
];
