import {
  db,
  coursesTable,
  quizQuestionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger.js";
import { SPRINT_15_2_10G_COHORT, SPRINT_15_2_10G_COHORT_COURSE_IDS } from "./courseAssessmentCohort15_2_10G.js";

export interface CohortQuestionDefinition {
  order: number;
  question: string;
  options: [string, string, string, string];
  correct: number;
  correctExplanation: string;
  incorrectExplanation: string;
  optionFeedback: [string, string, string, string];
  competencyArea?: string;
  sourceCourseId?: number;
}

export interface CohortCourseRemediationData {
  courseId: number;
  courseCode: string;
  passingScore: number;
  questions: CohortQuestionDefinition[];
}

export const COHORT_15_2_10G_DATA: CohortCourseRemediationData[] = [
  // 1. ELH-72 (ID: 753) - Green eCommerce, Last-Mile Delivery & Packaging (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 753,
    courseCode: "ELH-72",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "An e-commerce fulfillment center is redesigning its parcel packaging workflow to eliminate void fill waste and excess dimensional weight shipping charges. Which intervention provides the greatest lifecycle carbon and material efficiency?",
        options: [
          "Implementing on-demand automated right-size box-making machinery that cuts corrugated cardboard to match exact product dimensions, paired with unbleached FSC-certified paper tape.",
          "Standardizing on three extra-large box sizes filled with virgin expanded polystyrene (EPS) loose-fill chips to ensure universal cushioning.",
          "Switching exclusively to oxo-degradable plastic mailer bags that fragment into microplastics under ambient warehouse lighting.",
          "Enclosing every individual item in multi-layer foil-laminated pouches before packing into standard heavy double-wall cardboard boxes."
        ],
        correct: 0,
        correctExplanation: "Automated right-sizing eliminates void space, drastically reduces corrugated sheet area, cuts dimensional freight emissions, and avoids plastic void-fill entirely.",
        incorrectExplanation: "Standardizing on oversized boxes or deploying non-recyclable multi-layer plastics increases material waste, dimensional freight fees, and microplastic pollution.",
        optionFeedback: [
          "Correct. On-demand right-sizing eliminates void volume, cuts corrugated cardboard consumption, minimizes dimensional freight penalties, and removes plastic fill.",
          "Incorrect. Standardizing on oversized boxes wastes immense corrugated cardboard and requires substantial virgin plastic loose fill.",
          "Incorrect. Oxo-degradable plastics are prohibited in many jurisdictions because they merely fragment into persistent environmental microplastics without degrading.",
          "Incorrect. Multi-layer foil pouches are non-recyclable in standard municipal streams and add unnecessary packaging mass."
        ]
      },
      {
        order: 2,
        question: "An urban last-mile delivery fleet manager is evaluating routes to reduce delivery van idling and urban particulate emissions in dense metropolitan corridors. Which operational strategy achieves the greatest environmental and cost benefit?",
        options: [
          "Allowing drivers to choose individual routes freely based on historical intuition and personal preference without GPS telemetry.",
          "Deploying dynamic AI-assisted route optimization software with integrated delivery density clustering, paired with micro-hub staging for electric cargo bikes and EVs in downtown zones.",
          "Scheduling all delivery vans to make single-item express trips immediately as orders are placed rather than batching deliveries.",
          "Increasing vehicle engine idling during curbside drop-offs to prevent alternator and battery wear on cold mornings."
        ],
        correct: 1,
        correctExplanation: "Combining route density optimization algorithms with urban micro-consolidation hubs and zero-emission delivery vehicles eliminates redundant vehicle kilometres and localized urban tailpipe pollutants.",
        incorrectExplanation: "Disorganized routing, single-item on-demand dispatching, or prolonged idling increases fuel consumption, traffic congestion, and fleet operating costs.",
        optionFeedback: [
          "Incorrect. Uncoordinated driver routing increases vehicle miles traveled, route overlaps, and fuel waste.",
          "Correct. Dynamic density clustering and urban micro-hubs with e-cargo bikes and EVs eliminate diesel vehicle miles and urban air pollutants.",
          "Incorrect. Dispatched single-item point-to-point trips cause extreme route fragmentation and multiply fleet emissions.",
          "Incorrect. Idling burns approximately 1.5 to 3.5 liters of fuel per hour with zero progress, increasing localized urban air pollution and engine wear."
        ]
      },
      {
        order: 3,
        question: "An online apparel retailer experiences a 30% return rate and wants to reduce the carbon and packaging footprint of its reverse logistics operations. Which measure is most effective?",
        options: [
          "Routing all customer returns directly to municipal incineration facilities to avoid domestic shipping and handling overhead.",
          "Requiring customers to ship returns via single-parcel air freight to overseas manufacturing centers for re-inspection.",
          "Establishing regional return consolidation hubs with reusable returnable polybags and localized quality grading, restocking, or refurbishment channels.",
          "Mandating that customers discard returned items in domestic household waste and issuing refunds without physical inspection."
        ],
        correct: 2,
        correctExplanation: "Localized consolidation hubs equipped with reusable packaging and local grading prevent long-distance return shipping, minimize packaging waste, and restore resale value.",
        incorrectExplanation: "Incinerating returns, overseas air freighting, or unmanaged domestic disposal wastes valuable product resources and violates circular economy principles.",
        optionFeedback: [
          "Incorrect. Destroying usable consumer goods produces unnecessary landfill emissions and destroys embedded material value.",
          "Incorrect. Overseas air freight reverse logistics generates extreme Scope 3 transport emissions and excessive transit costs.",
          "Correct. Regional return hubs with reusable packaging, local grading, cleaning, and rapid restocking maximize asset recovery while minimizing transport emissions.",
          "Incorrect. Blind refund policies without return verification cause severe commercial inventory shrinkage and domestic waste generation."
        ]
      },
      {
        order: 4,
        question: "A warehouse manager wants to replace petroleum-based plastic stretch film used for pallet stabilization in outbound freight distribution. Which sustainable load containment solution should be deployed?",
        options: [
          "Spraying chemical aerosol adhesive across pallet surfaces to permanently glue stacked boxes together.",
          "Discontinuing all pallet wrapping and relying solely on gravity during forklift transport and road transit.",
          "Wrapping pallets in five layers of non-recyclable multi-polymer metallized thermal insulation sheets.",
          "Transitioning to reusable pallet strapping bands/wraps with mechanical buckles, or certified high-stretch post-consumer recycled (PCR) machine film applied with calibrated pre-stretch rollers."
        ],
        correct: 3,
        correctExplanation: "Calibrated pre-stretch machines with PCR film or durable reusable pallet wraps provide certified load stability while dramatically reducing virgin plastic usage.",
        incorrectExplanation: "Adhesive sprays ruin corrugated outer layers, uncontained pallets cause catastrophic transit collapses, and metallized films are non-recyclable.",
        optionFeedback: [
          "Incorrect. Aerosol adhesives tear and contaminate corrugated boxes during depalletization, preventing cardboard recycling.",
          "Incorrect. Unsecured pallet loads will topple during transport, creating severe workplace safety hazards and damaged freight.",
          "Incorrect. Metallized thermal sheets are non-recyclable composite materials that multiply plastic waste volume.",
          "Correct. Reusable strapping wraps and high-performance PCR stretch film with high pre-stretch ratios deliver load security while minimizing single-use virgin plastic."
        ]
      },
      {
        order: 5,
        question: "When offering customer-facing checkout delivery options, an e-commerce platform wants to incentivize lower-emission fulfillment choices without increasing cart abandonment. Which delivery option structure aligns best with sustainable logistics?",
        options: [
          "Defaulting checkout options to 'Eco-Consolidated Shipping' (batching multiple items into a single parcel with localized locker pickup) while clearly displaying the estimated carbon savings.",
          "Hiding delivery dates entirely and forcing all customers to pay premium surcharges for single-item expedited air freight.",
          "Automatically splitting multi-item orders across multiple separate air courier shipments without customer consent.",
          "Promising unconditional 30-minute delivery via single-occupancy diesel passenger vehicles for all standard household goods."
        ],
        correct: 0,
        correctExplanation: "Green default nudges that bundle items into single parcels and leverage parcel lockers significantly reduce failed delivery attempts, vehicle miles, and packaging materials.",
        incorrectExplanation: "Forced surcharges, non-consensual parcel splitting, and hyper-expedited single-occupancy deliveries escalate freight emissions and customer churn.",
        optionFeedback: [
          "Correct. Defaulting to consolidated batch shipping with locker pickup optimizes delivery density, eliminates failed home delivery attempts, and lowers transport carbon.",
          "Incorrect. Hiding delivery timeframes and forcing air freight surcharges alienates consumers and increases checkout abandonment.",
          "Incorrect. Splitting orders across multiple individual air shipments multiplies packaging and transport emissions.",
          "Incorrect. Unrealistic 30-minute single-drop promises cause extreme fleet traffic congestion and inefficient fuel burn."
        ]
      },
      {
        order: 6,
        question: "A sustainability auditor is evaluating an e-commerce company's packaging claims regarding '100% biodegradable mailers'. What compliance verification is required to substantiate this claim and prevent greenwashing?",
        options: [
          "Accepting the supplier's verbal marketing claim without demanding third-party laboratory test certificates.",
          "Verifying accredited certification against standards such as EN 13432 / ASTM D6400 (industrial composting) or TÜV OK Compost HOME, ensuring clear end-of-life disposal instructions are printed on the mailer.",
          "Assuming that any plastic mailer containing 5% cornstarch will naturally dissolve in municipal ocean stormwater runoff within 48 hours.",
          "Claiming the mailers are infinitely recyclable through curbside paper collection bins without removing waterproof bio-polymer liners."
        ],
        correct: 1,
        correctExplanation: "Unsubstantiated compostability/biodegradability claims constitute deceptive greenwashing. Verified certification against EN 13432 / ASTM D6400 / TÜV OK Compost standards is required.",
        incorrectExplanation: "Verbal claims, starch-additive microplastic myths, and misrepresenting bioplastics as curbside paper recyclable create regulatory non-compliance and contaminate recycling streams.",
        optionFeedback: [
          "Incorrect. Verbal supplier claims without accredited third-party test certificates expose the company to regulatory greenwashing enforcement.",
          "Correct. Recognized international standards (EN 13432, ASTM D6400, TÜV OK Compost) verify genuine biodegradability and degradation timeframes under controlled conditions.",
          "Incorrect. Starch-filled conventional polyolefin plastics do not biodegrade safely in nature; they fragment into harmful microplastics.",
          "Incorrect. Biopolymer-lined mailers contaminate mechanical paper pulp mills and must not be designated for curbside paper recycling."
        ]
      },
      {
        order: 7,
        question: "A logistics operations team is transitioning its last-mile fleet from diesel vans to battery electric commercial vehicles (BEVs). What critical charging infrastructure protocol ensures operational readiness while avoiding peak grid utility surcharges?",
        options: [
          "Connecting all vehicle chargers simultaneously to run at full capacity during early evening peak-demand grid hours (17:00–20:00).",
          "Relying exclusively on mobile diesel generators parked inside the warehouse bay to charge vehicles during driver shift changes.",
          "Installing smart depot energy management systems (EMS) that schedule automated off-peak overnight sequential charging, load-balancing across available depot electrical capacity.",
          "Discharging traction batteries to 0% state of charge every night before initiating rapid DC ultra-fast charging at maximum voltage."
        ],
        correct: 2,
        correctExplanation: "Depot smart charging systems dynamically distribute electrical power overnight during off-peak tariff periods, preventing grid transformer overload and expensive peak demand charges.",
        incorrectExplanation: "Uncontrolled peak-hour charging causes grid overload, diesel generators defeat the environmental purpose of EVs, and deep zero discharges degrade lithium battery lifespan.",
        optionFeedback: [
          "Incorrect. Simultaneous unmanaged charging during evening peak hours triggers extreme peak-demand electrical utility surcharges and grid stress.",
          "Incorrect. Diesel generators emit localized exhaust fumes inside depots, creating severe occupational health risks and negating carbon benefits.",
          "Correct. Smart depot Energy Management Systems balance electrical loads and schedule charging during low-cost, off-peak overnight hours.",
          "Incorrect. Deep discharging to 0% combined with daily high-temperature ultra-fast charging accelerates lithium-ion battery cell degradation."
        ]
      },
      {
        order: 8,
        question: "An e-commerce brand wants to calculate and report Scope 3 Category 4 (Upstream transportation and distribution) and Category 9 (Downstream transportation and distribution) emissions under the GHG Protocol. What primary data collection method yields the most accurate carbon accounting?",
        options: [
          "Multiplying total company gross merchandise value (GMV) by a generic national consumer price index conversion factor.",
          "Guessing standard fuel consumption based on vehicle license plate numbers without route or payload information.",
          "Estimating emissions based on average employee commute times rather than freight logistics data.",
          "Collecting primary tonne-kilometre (tkm) freight data, carrier-specific fuel consumption telemetry, and verified emission factors adhering to the Global Logistics Emissions Council (GLEC) Framework."
        ],
        correct: 3,
        correctExplanation: "Activity-based primary data using tonne-kilometres (tkm) and verified GLEC Framework emission factors provides the highest accuracy tier for freight logistics carbon accounting.",
        incorrectExplanation: "Spend-based revenue proxies, vehicle license plate guesses, or commuter data lack physical activity accuracy and cannot guide decarbonization decisions.",
        optionFeedback: [
          "Incorrect. Spend-based financial proxies are highly inaccurate and fail to reflect route efficiencies, modal shifts, or vehicle electrification.",
          "Incorrect. License plate guessing provides zero data on actual payload weight, route distances, or fuel efficiency.",
          "Incorrect. Employee commuting belongs under Scope 3 Category 7, not freight transportation (Categories 4 and 9).",
          "Correct. Primary freight activity data (tonne-km) calculated via the GLEC Framework delivers rigorous, audit-ready Scope 3 logistics carbon disclosures."
        ]
      }
    ]
  },

  // 2. ELH-73 (ID: 777) - Sustainable Quick-Service Restaurant (QSR) Operations (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 777,
    courseCode: "ELH-73",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "A quick-service restaurant (QSR) kitchen manager notices high electricity bills and excessive ambient heat in the cooking area. Which kitchen ventilation strategy provides the highest energy savings while maintaining occupational health and air quality?",
        options: [
          "Installing Demand-Controlled Kitchen Ventilation (DCKV) that modulates exhaust and makeup air fan speeds based on real-time temperature and optical smoke/vapor sensors.",
          "Running all heavy hood exhaust fans continuously at 100% speed 24 hours a day regardless of cooking appliance usage.",
          "Turning off all kitchen exhaust hoods entirely during busy frying hours to retain indoor heat and reduce fan noise.",
          "Replacing commercial exhaust hoods with standard residential ceiling paddle fans mounted directly above deep-fat fryers."
        ],
        correct: 0,
        correctExplanation: "DCKV systems reduce ventilation airflow by 30%–50% during idle cooking periods, cutting both fan electrical power and HVAC conditioned air replacement energy.",
        incorrectExplanation: "Running exhaust fans constantly at 100% wastes conditioned indoor air, while turning off hoods or using residential ceiling fans creates severe fire and carbon monoxide hazards.",
        optionFeedback: [
          "Correct. Demand-Controlled Kitchen Ventilation (DCKV) automatically ramps fan speeds up during cooking and down during idle periods, saving substantial fan and HVAC heating/cooling energy.",
          "Incorrect. Constant 100% fan operation exhausts vast amounts of expensive heated/cooled indoor air, driving up utility bills.",
          "Incorrect. Turning off exhaust hoods causes dangerous buildup of heat, grease vapors, and toxic combustion byproducts.",
          "Incorrect. Residential paddle fans cannot capture grease aerosols or combustion gases and violate commercial building fire codes."
        ]
      },
      {
        order: 2,
        question: "A QSR chain generates 200 liters of used cooking oil (UCO) per store each week. What is the most environmentally responsible and compliant waste management procedure for this grease stream?",
        options: [
          "Flushing the warm cooking oil down kitchen floor drains mixed with dishwashing detergent and hot boiling water.",
          "Storing UCO in dedicated leak-proof drums and partnering with a licensed waste collector that recycles UCO into certified hydrotreated vegetable oil (HVO) / biodiesel.",
          "Pouring used fryer oil into municipal stormwater catch basins behind the restaurant parking lot after closing hours.",
          "Spreading used cooking oil across landscaped garden beds to act as an unverified organic weed suppressant."
        ],
        correct: 1,
        correctExplanation: "Collecting UCO in secure storage for licensed recycling into certified biofuels prevents sewer fatbergs, water contamination, and turns waste into low-carbon transport fuel.",
        incorrectExplanation: "Dumping oil into drains, sewers, stormwater basins, or garden soil violates environmental regulations, clogs municipal infrastructure, and contaminates groundwater.",
        optionFeedback: [
          "Incorrect. Dumping oil into drains causes massive sewer fatbergs, sewer backups, and severe municipal fines.",
          "Correct. Licensed UCO collectors refine used cooking oil into high-grade biodiesel/HVO, replacing fossil diesel while preventing environmental contamination.",
          "Incorrect. Discharging oil into stormwater drains directly pollutes local waterways, aquatic ecosystems, and violates clean water statutes.",
          "Incorrect. Pouring cooking oil on soil suffocates root systems, creates foul rancid odors, attracts vermin, and pollutes runoff."
        ]
      },
      {
        order: 3,
        question: "A fast-food restaurant chain seeks to eliminate single-use plastic takeaway cutlery, straws, and sauce ramekins across its drive-thru and dine-in operations. Which transition approach minimizes operational disruption and waste generation?",
        options: [
          "Giving customers double plastic utensils in advance with every drive-thru order regardless of menu items ordered.",
          "Replacing plastic items with heavy multi-layer foil laminates that cannot be recycled or industrially composted.",
          "Shifting to durable reusable serviceware for dine-in meals, adopting certified unbleached paper/FSC-wood fiber cutlery, and implementing an 'opt-in only' utensil policy at drive-thru and online checkout.",
          "Eliminating all cups, wrappers, and containers completely and serving hot liquids directly into customer hands."
        ],
        correct: 2,
        correctExplanation: "Pairing reusable dine-in serviceware with certified compostable/wood fiber take-out packaging and an opt-in distribution policy slashes single-use packaging volumes.",
        incorrectExplanation: "Automatic double-bagging multiplies plastic waste, multi-layer foil laminates are unrecyclable, and eliminating food containers completely violates health and safety.",
        optionFeedback: [
          "Incorrect. Defaulting to automatic distribution of extra single-use plastic increases packaging procurement costs and plastic waste.",
          "Incorrect. Multi-layer foil laminates are non-recyclable in standard municipal streams and increase packaging carbon intensity.",
          "Correct. Reusables for dine-in, certified unbleached fiber items for takeout, and an opt-in policy for drive-thru cutlery achieve dramatic waste reductions.",
          "Incorrect. Eliminating essential beverage containers creates severe burn and food contamination hazards."
        ]
      },
      {
        order: 4,
        question: "What refrigeration maintenance practice is essential in a high-volume QSR to maintain food safety, prevent compressor failure, and minimize fugitive refrigerant emissions?",
        options: [
          "Allowing frost to accumulate to over 50 mm thickness on evaporator coils before attempting manual chip-outs with metal screwdrivers.",
          "Leaving walk-in freezer doors permanently wedged open with beverage crates during busy afternoon service peaks.",
          "Painting over all temperature gauges and disabling digital temperature data loggers to avoid alarm notifications.",
          "Performing quarterly condenser coil cleaning, replacing worn magnetic door gaskets, installing strip curtains, and conducting proactive electronic leak detection checks."
        ],
        correct: 3,
        correctExplanation: "Routine coil cleaning, gasket maintenance, strip curtains, and electronic refrigerant leak testing maintain compressor efficiency, protect food safety, and prevent potent HFC greenhouse gas leaks.",
        incorrectExplanation: "Frost buildup insulates coils, propping doors open causes thermal overload, and disabling alarms risks food spoilage and health department closures.",
        optionFeedback: [
          "Incorrect. Thick frost insulates evaporator coils, drastically reducing cooling efficiency and risking coil puncture during manual scraping.",
          "Incorrect. Propping freezer doors open causes severe moisture ingress, ice buildup, compressor burnout, and huge electricity spikes.",
          "Incorrect. Disabling temperature monitors violates food safety regulations (HACCP) and risks serving spoiled perishable food.",
          "Correct. Clean condenser coils, intact door seals, PVC strip curtains, and electronic leak inspections optimize refrigeration efficiency and prevent HFC emissions."
        ]
      },
      {
        order: 5,
        question: "A QSR shift manager wants to minimize commercial food waste during prep, holding, and closing shifts. Which operational procedure delivers the most immediate reduction in discarded cooked food?",
        options: [
          "Implementing digital kitchen production forecasting that dynamically adjusts batch cooking quantities based on real-time historical sales data, weather, and time of day.",
          "Batch-cooking maximum capacity quantities of all proteins 4 hours before closing to ensure heated display cabinets remain completely full.",
          "Extending hold times for perishable cooked meats past local food safety limits to avoid recording kitchen food shrinkage.",
          "Ordering double the required fresh produce inventory each week without checking walk-in cold room stock levels."
        ],
        correct: 0,
        correctExplanation: "Digital kitchen production forecasting matches cooked food production to actual customer traffic patterns, preventing excess holding cabinet expiration and food waste.",
        incorrectExplanation: "Mass batch-cooking before close creates massive end-of-day waste, extending holding times causes food poisoning, and over-ordering leads to produce spoilage.",
        optionFeedback: [
          "Correct. Dynamic production forecasting aligns kitchen batch cooking with expected customer demand, drastically reducing expired hot-holding food waste.",
          "Incorrect. Cooking full batches right before closing guarantees large volumes of unsold food being thrown away at shift end.",
          "Incorrect. Exceeding safe holding time thresholds creates critical foodborne illness risks and violates health safety standards.",
          "Incorrect. Ordering excess unneeded inventory causes walk-in spoilage and high inventory shrinkage costs."
        ]
      },
      {
        order: 6,
        question: "How should a commercial restaurant manage its under-sink and external grease traps (grease interceptors) to prevent municipal sewer blockages and maintain environmental compliance?",
        options: [
          "Adding industrial drain-unblocking caustic soda every night to liquefy fats, oils, and grease (FOG) into the municipal water main.",
          "Inspecting grease trap levels weekly, scheduling routine pump-outs before grease and solids reach 25% of the trap's operational capacity, and maintaining certified disposal manifests.",
          "Pumping grease trap contents into the restaurant's outdoor rainwater harvesting barrels.",
          "Removing the grease trap baffling plates permanently to allow unimpeded water flow during heavy dishwashing cycles."
        ],
        correct: 1,
        correctExplanation: "Following the industry standard '25% rule' for grease trap pumping ensures fats, oils, and grease (FOG) are captured effectively before discharging into the municipal sewer.",
        incorrectExplanation: "Caustic soda temporarily emulsifies grease which resolidifies downpipe into sewer fatbergs, while dumping into rainwater or removing baffles causes direct environmental contamination.",
        optionFeedback: [
          "Incorrect. Caustic chemicals merely wash grease further into municipal pipes where it cools and forms massive sewer fatbergs.",
          "Correct. Adhering to the 25% FOG rule and maintaining licensed grease pump-out logs prevents sewer backups and regulatory non-compliance.",
          "Incorrect. Discharging grease trap waste into rainwater harvesting tanks ruins water quality and spreads pathogens.",
          "Incorrect. Removing baffles allows grease and food solids to bypass the interceptor entirely, entering the municipal sewer system."
        ]
      },
      {
        order: 7,
        question: "A QSR franchisee is upgrading hot beverage equipment to cut energy and water consumption. Which technical specification provides the highest efficiency and temperature stability?",
        options: [
          "Installing an uninsulated single-boiler espresso and hot water tank that maintains continuous boiling 24/7 without a timer.",
          "Using electric immersion heaters placed inside open buckets of standing tap water.",
          "Installing high-efficiency on-demand flash water heaters or vacuum-insulated commercial boilers with programmable sleep modes and low-flow aerators.",
          "Disconnecting all thermostatic safety shutoff switches to increase heating speed."
        ],
        correct: 2,
        correctExplanation: "Vacuum-insulated boilers and on-demand flash heaters eliminate standby thermal standby losses, while programmable timers and flow aerators conserve power and water.",
        incorrectExplanation: "Uninsulated 24/7 boilers lose constant radiant heat, immersion buckets are unsafe, and disabling thermal limiters risks catastrophic boiler explosions.",
        optionFeedback: [
          "Incorrect. Uninsulated water boilers constantly lose radiant heat to the room, wasting significant electricity 24 hours a day.",
          "Incorrect. Open immersion heaters pose severe electrical shock and scalding burn hazards in commercial food preparation environments.",
          "Correct. Vacuum insulation, on-demand instantaneous heating, and programmable overnight standby modes eliminate thermal waste.",
          "Incorrect. Disabling thermal safety switches creates severe explosion and fire hazards from unchecked steam pressure."
        ]
      },
      {
        order: 8,
        question: "When implementing a front-of-house waste sorting station for dine-in QSR customers, what behavioral design element achieves the highest sorting accuracy and lowest landfill contamination?",
        options: [
          "Providing a single unlabeled black bin without text or images for all trash, recycling, and food scraps.",
          "Placing five identical unmarked bins in a hidden corner behind the restroom corridor.",
          "Writing long 500-word regulatory compliance paragraphs in small font across bin lids.",
          "Installing color-coded, shaped bin apertures (e.g., round for cans, slots for paper) with clear photographic visual icons and dedicated liquid disposal sinks."
        ],
        correct: 3,
        correctExplanation: "Color-coded stations with shaped openings, visual photo icons of actual restaurant packaging items, and liquid disposal funnels minimize cross-contamination and maximize recycling rates.",
        incorrectExplanation: "Unlabeled bins force commingled waste, hidden bins discourage use, and dense text walls are ignored by fast-moving customers.",
        optionFeedback: [
          "Incorrect. Unlabeled single bins guarantee 100% of recyclable and compostable packaging is sent directly to landfills.",
          "Incorrect. Inconvenient and unmarked bins lead to customer confusion and littering.",
          "Incorrect. Customers will not read long text blocks during quick dining visits; visual design is essential.",
          "Correct. Distinct color coding, shaped openings, visual packaging photos, and liquid pour drains prevent contamination of recycling and organics streams."
        ]
      }
    ]
  },

  // 3. ELH-74 (ID: 778) - Circular Textiles & Sustainable Fashion Retailing (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 778,
    courseCode: "ELH-74",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "A fashion retail brand is transitioning from blended polyester-cotton (polycotton) fabrics to circular mono-material garment design. Why does mono-materiality substantially improve end-of-life textile recycling viability?",
        options: [
          "Mono-material garments (e.g., 100% cotton or 100% polyester) can be processed through mechanical or chemical fiber-to-fiber recycling streams without costly and destructive chemical separation of disparate polymer chains.",
          "Mono-material garments are legally exempt from all national retail sales taxes and international customs duties.",
          "Mono-material fibers automatically repel all stains, sweat, and odors without laundering.",
          "Mono-material fabrics cannot be cut or sewn using standard commercial textile sewing machinery."
        ],
        correct: 0,
        correctExplanation: "Inter-spun fiber blends cannot be mechanically shredded or chemically dissolved without destroying fiber strength. Mono-materials feed cleanly into closed-loop fiber-to-fiber recycling.",
        incorrectExplanation: "Mono-materials enjoy no tax exemptions, require normal laundering, and are sewn on standard commercial apparel manufacturing equipment.",
        optionFeedback: [
          "Correct. Pure mono-materials avoid the complex chemical stripping required to separate blended synthetic and natural fibers, enabling high-quality fiber-to-fiber recycling.",
          "Incorrect. Mono-material garments are subject to standard national tax and customs duties.",
          "Incorrect. Stain and odor resistance depend on fiber properties and finishes, not mono-material composition.",
          "Incorrect. Mono-material fabrics are completely compatible with conventional cutting and sewing production lines."
        ]
      },
      {
        order: 2,
        question: "An apparel brand is reviewing its product engineering to incorporate 'Design for Disassembly' (DfD) principles into denim outerwear. Which design choice best exemplifies DfD?",
        options: [
          "Permanently welding metal rivets, plastic snaps, and composite zippers directly into the denim weave using polyurethane epoxy glue.",
          "Using screw-on removable metal buttons, unstitched bar-tacks instead of copper rivets, and cellulosic sewing thread that breaks down during garment deconstruction.",
          "Stitching five layers of synthetic lining into the denim jacket with indelible thermoplastic adhesive.",
          "Embedding non-removable electronic LED lighting and lithium coin batteries directly into pocket seams."
        ],
        correct: 1,
        correctExplanation: "Design for Disassembly uses unriveted bar-tacks, removable screw buttons, and compatible threads to allow rapid non-destructive removal of hardware before recycling fabric panels.",
        incorrectExplanation: "Epoxy adhesives, glued synthetic linings, and embedded batteries permanently contaminate fabric streams and create hazardous waste during textile shredding.",
        optionFeedback: [
          "Incorrect. Gluing metal hardware with epoxy makes non-destructive dismantling impossible and ruins recycling machinery.",
          "Correct. Removable screw buttons, unriveted bar-tacks, and dissolvable/cellulosic stitching allow rapid removal of hardware prior to fiber shredding.",
          "Incorrect. Glued thermoplastic synthetic linings contaminate cotton denim recycling streams.",
          "Incorrect. Embedded lithium batteries in clothing create severe fire hazards in shredders and contaminate textile waste."
        ]
      },
      {
        order: 3,
        question: "A fashion retailer wants to verify that incoming recycled polyester (rPET) activewear contains certified post-consumer plastic waste rather than virgin resin. Which chain-of-custody standard provides third-party verification?",
        options: [
          "International Standardization Organization (ISO) 9001 Quality Management certificate alone.",
          "An unverified self-declaration letter printed on the garment supplier's marketing brochure.",
          "The Global Recycled Standard (GRS) or Recycled Claim Standard (RCS) with accompanying Transaction Certificates (TCs) across each processing tier.",
          "The Codex Alimentarius international food safety guidelines."
        ],
        correct: 2,
        correctExplanation: "GRS and RCS track recycled material provenance from the recycling facility through yarn spinning, fabric knitting, and garment assembly using serialized Transaction Certificates (TCs).",
        incorrectExplanation: "ISO 9001 tracks generic quality management, self-declarations lack independent verification, and Codex Alimentarius governs international food safety.",
        optionFeedback: [
          "Incorrect. ISO 9001 certifies corporate quality management systems, not the chain of custody or verified content of recycled textile fibers.",
          "Incorrect. Self-declarations on marketing brochures lack independent third-party audit verification and risk greenwashing.",
          "Correct. GRS and RCS provide audited chain-of-custody verification with mandatory Transaction Certificates (TCs) at every stage of the supply chain.",
          "Incorrect. Codex Alimentarius is the UN food safety standard and has no applicability to textile fiber verification."
        ]
      },
      {
        order: 4,
        question: "What severe environmental and human health hazard is associated with conventional Per- and Polyfluoroalkyl Substances (PFAS) historically applied in Durable Water Repellent (DWR) weatherproofing treatments?",
        options: [
          "They accelerate natural biodegradation of wool fibers into harmless nitrogen gas within 24 hours.",
          "They increase the elasticity of elastane fibers by over 500%.",
          "They convert atmospheric carbon dioxide directly into crystallized sucrose.",
          "They are highly persistent synthetic chemicals that bioaccumulate in humans and wildlife, resist environmental breakdown, and contaminate drinking water aquifers."
        ],
        correct: 3,
        correctExplanation: "PFAS ('forever chemicals') contain extremely strong carbon-fluorine bonds that resist environmental degradation, causing bioaccumulation in drinking water, wildlife, and human tissues with severe toxicological risks.",
        incorrectExplanation: "PFAS do not biodegrade wool, do not alter elastane elasticity, and have no chemical interaction with carbon dioxide to form sugar.",
        optionFeedback: [
          "Incorrect. PFAS are synthetic fluorochemicals that resist degradation; they do not biodegrade wool fibers.",
          "Incorrect. PFAS are surface water/oil repellency treatments and do not alter yarn elasticity.",
          "Incorrect. PFAS have no chemical mechanism for converting carbon dioxide into sugar.",
          "Correct. PFAS are persistent 'forever chemicals' that bioaccumulate, resist natural degradation, and pose severe endocrine, liver, and carcinogenic health risks."
        ]
      },
      {
        order: 5,
        question: "A retail clothing brand wants to reduce the freshwater footprint and toxic chemical discharge of its denim finishing and dyeing operations. Which technology delivers the greatest reduction in water and chemical usage?",
        options: [
          "Adopting ozone finishing, laser distressing, and low-liquor / supercritical CO2 dyeing, replacing traditional pumice stone washing, potassium permanganate spray, and water-intensive vat rinsing.",
          "Increasing traditional chemical bleach washing cycles from three rinses to ten rinses per denim batch.",
          "Dumping untreated dye effluent directly into local municipal drainage channels to speed up garment drying.",
          "Using heavy synthetic solvent rinses without vapor recovery or closed-loop wastewater recycling."
        ],
        correct: 0,
        correctExplanation: "Ozone gas bleaching and laser distressing replace harsh potassium permanganate and stone washes, while supercritical CO2 dyeing eliminates process water consumption entirely.",
        incorrectExplanation: "Increasing rinse cycles wastes immense clean water, dumping untreated effluent is illegal, and unrecovered synthetic solvents cause extreme toxic air and water pollution.",
        optionFeedback: [
          "Correct. Laser distressing, ozone finishing, and waterless/low-liquor dyeing eliminate up to 90% of process water and remove toxic chemical sprays.",
          "Incorrect. Increasing water rinse cycles multiplies clean freshwater consumption and wastewater treatment burdens.",
          "Incorrect. Discharging untreated dye effluent into storm drains severely pollutes waterways and violates environmental discharge laws.",
          "Incorrect. Unrecovered solvent washing emits hazardous volatile organic compounds (VOCs) and toxic waste."
        ]
      },
      {
        order: 6,
        question: "A sustainable fashion brand launches a customer garment take-back and resale program. Which operational hierarchy ensures the highest resource and economic value retention under circular economy principles?",
        options: [
          "Shredding all collected garments immediately into low-grade automotive acoustic insulation padding regardless of condition.",
          "Inspection, cleaning, and direct resale/repair of high-grade garments first, followed by upcycling/remanufacturing, and fiber-to-fiber recycling for unwearable items as a final loop.",
          "Transporting all collected used clothing to overseas landfill sites via air freight.",
          "Burning all trade-in garments in on-site incinerators to generate steam heat for retail store fitting rooms."
        ],
        correct: 1,
        correctExplanation: "The circular hierarchy prioritizes reuse, repair, and resale first to maintain highest utility and value, down-cycling or recycling only when garments cannot be repaired or remanufactured.",
        incorrectExplanation: "Immediate downcycling to insulation destroys garment value prematurely, while landfill export and incineration represent linear disposal models.",
        optionFeedback: [
          "Incorrect. Immediate mechanical shredding (downcycling) destroys intact wearable clothing value prematurely.",
          "Correct. Prioritizing reuse/resale first, followed by repair, remanufacturing, and finally fiber recycling preserves the highest embedded material and economic value.",
          "Incorrect. Exporting used clothing to overseas landfills creates international waste dumping and high transport carbon emissions.",
          "Incorrect. Incinerating trade-in clothing destroys circular textile loops and generates combustion emissions."
        ]
      },
      {
        order: 7,
        question: "When procuring viscose, rayon, or modal cellulosic fibers, what forestry certification standard prevents sourcing from ancient and endangered forests associated with illegal deforestation?",
        options: [
          "The International Electrotechnical Commission (IEC) standard.",
          "The Good Laboratory Practice (GLP) pharmaceutical certification.",
          "CanopyStyle audit verification paired with FSC (Forest Stewardship Council) or PEFC (Programme for the Endorsement of Forest Certification) chain-of-custody.",
          "The Universal Postal Union tracking designation."
        ],
        correct: 2,
        correctExplanation: "CanopyStyle audits and FSC/PEFC forestry certifications verify that dissolving wood pulp used in man-made cellulosic fibers (MMCF) does not originate from ancient, endangered, or deforested primary forests.",
        incorrectExplanation: "IEC governs electrical equipment, GLP governs laboratory pharmaceuticals, and the Universal Postal Union governs international mail systems.",
        optionFeedback: [
          "Incorrect. IEC standards govern electrical and electronic equipment safety, not forestry management.",
          "Incorrect. GLP certification applies to non-clinical health and environmental laboratory safety studies.",
          "Correct. CanopyStyle audits combined with FSC/PEFC certifications guarantee that wood pulp for viscose/rayon is sourced from responsibly managed plantations, not ancient endangered forests.",
          "Incorrect. Universal Postal Union standards regulate international postal services."
        ]
      },
      {
        order: 8,
        question: "An apparel compliance manager is auditing supplier factories against the ZDHC (Zero Discharge of Hazardous Chemicals) Manufacturing Restricted Substances List (MRSL). What is the primary purpose of an MRSL compared to a Product RSL (PRSL)?",
        options: [
          "An MRSL regulates retail store window display lighting intensity rather than factory chemistry.",
          "An MRSL only applies to office stationery used in corporate headquarters.",
          "An MRSL limits worker overtime hours without addressing chemical handling.",
          "An MRSL bans and restricts hazardous chemicals in the chemical formulations used throughout manufacturing processes, protecting factory workers and local water basins, whereas a PRSL only limits chemical residues on the finished garment."
        ],
        correct: 3,
        correctExplanation: "An MRSL regulates raw chemical formulations entering the factory gate to prevent worker exposure and toxic wastewater discharge, whereas a PRSL only tests for chemical residues left on the final finished retail garment.",
        incorrectExplanation: "MRSL has nothing to do with store window lighting, office stationary, or labor overtime hours.",
        optionFeedback: [
          "Incorrect. MRSL is an industrial chemical safety framework and has no relation to store display lighting.",
          "Incorrect. MRSL applies to wet-processing dyehouses and textile manufacturing chemical formulations, not office supplies.",
          "Incorrect. MRSL focuses on eliminating hazardous chemical inputs, not regulating labor shift hours.",
          "Correct. An MRSL controls chemicals used during factory processing to protect workers and aquatic ecosystems, while a PRSL only measures residual chemistry on the final consumer garment."
        ]
      }
    ]
  },

  // 4. ELH-75 (ID: 736) - Sustainable Lending & Green Credit Underwriting (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 736,
    courseCode: "ELH-75",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Under the LMA (Loan Market Association) Green Loan Principles (GLP), what is the core requirement governing the 'Use of Proceeds' for a facility to qualify as a certified Green Loan?",
        options: [
          "Loan proceeds must be exclusively credited to a dedicated sub-account or tracked against clearly documented eligible Green Projects that provide clear environmental benefits assessed against established criteria.",
          "Loan proceeds may be used for general corporate working capital, dividend payouts, or fossil fuel exploration at the borrower's discretion.",
          "Loan proceeds must be immediately converted into speculative cryptocurrency tokens without expenditure reporting.",
          "Loan proceeds must be distributed as unconditional cash bonuses to executive management without project verification."
        ],
        correct: 0,
        correctExplanation: "The foundational pillar of the Green Loan Principles is that 100% of proceeds must be earmarked and tracked exclusively for eligible Green Projects with measurable environmental benefits.",
        incorrectExplanation: "General corporate purposes, unconstrained fossil exploration, crypto speculation, or executive bonuses do not meet the strict Use of Proceeds criteria.",
        optionFeedback: [
          "Correct. Green Loan Principles require dedicated allocation and transparent tracking of 100% of proceeds toward certified eligible green projects.",
          "Incorrect. General corporate working capital and fossil fuel exploration violate the Use of Proceeds requirement of the GLP.",
          "Incorrect. Converting proceeds to speculative crypto assets violates credit covenants and green framework rules.",
          "Incorrect. Executive cash bonuses are an ineligible use of green loan proceeds."
        ]
      },
      {
        order: 2,
        question: "In a Sustainability-Linked Loan (SLL), how is the interest margin mechanism structurally tied to the borrower's environmental performance?",
        options: [
          "The interest rate remains permanently fixed regardless of any environmental or social developments.",
          "The loan margin steps down (or steps up) based on the borrower's audited performance against predefined, ambitious, and material Sustainability Performance Targets (SPTs) linked to Key Performance Indicators (KPIs).",
          "The borrower is charged a 50% interest penalty if their stock market share price drops during any financial quarter.",
          "The bank guarantees to forgive 100% of the principal loan balance if the borrower plants ten trees in front of their headquarters."
        ],
        correct: 1,
        correctExplanation: "SLLs use a dynamic margin grid where the interest spread adjusts based on third-party verified achievement of ambitious, material SPTs (e.g., carbon intensity reduction, renewable energy adoption).",
        incorrectExplanation: "SLLs do not use static interest rates, are not tied to quarterly equity share prices, and never forgive principal balances for superficial actions.",
        optionFeedback: [
          "Incorrect. SLLs feature two-way or one-way margin pricing adjustments directly tied to sustainability performance, not static fixed pricing.",
          "Correct. SLL interest margins adjust dynamically based on verified attainment of material Sustainability Performance Targets (SPTs).",
          "Incorrect. Margin ratchets are tied to audited environmental/social KPIs, not equity market share price fluctuations.",
          "Incorrect. SLLs modify interest margins by basis points; they do not forgive loan principal for symbolic gestures."
        ]
      },
      {
        order: 3,
        question: "A credit risk officer is evaluating a commercial real estate loan application seeking green financing. Which criteria substantiate the property's eligibility under recognized green building standards?",
        options: [
          "The property developer displays artist renderings of rooftop gardens without architectural or engineering plans.",
          "The building is located within 500 meters of a golf course regardless of building energy performance.",
          "The asset achieves verified certification under LEED Gold/Platinum, BREEAM Excellent/Outstanding, or Energy Star top decile, with an audited Energy Performance Certificate (EPC) rating in the top 15% of national building stock.",
          "The building landlord agrees to turn off indoor lighting for one hour during Earth Day annually."
        ],
        correct: 2,
        correctExplanation: "Recognized green building standards (LEED, BREEAM, Energy Star) and top 15% EPC performance provide verifiable proof of primary energy efficiency and climate resilience.",
        incorrectExplanation: "Unsubstantiated architectural drawings, golf course proximity, or symbolic one-hour Earth Day lights-off do not provide technical evidence of green asset performance.",
        optionFeedback: [
          "Incorrect. Marketing sketches and unverified drawings cannot substitute for technical engineering energy audits.",
          "Incorrect. Proximity to a golf course is not a recognized green building performance metric.",
          "Correct. Accredited third-party certifications (LEED Gold/Platinum, BREEAM Excellent, top 15% EPC) substantiate green building loan eligibility.",
          "Incorrect. Symbolic annual gestures do not meet the permanent structural energy performance criteria required for green real estate underwriting."
        ]
      },
      {
        order: 4,
        question: "When structuring a green loan facility, what ongoing reporting obligation must the borrower fulfill post-disbursement under the Green Loan Principles?",
        options: [
          "The borrower is exempt from all financial and operational reporting until final loan maturity.",
          "The borrower must publish daily social media marketing videos showcasing their green credentials.",
          "The borrower only needs to report expenditures if requested by municipal tax authorities during an audit.",
          "The borrower must provide annual allocation and impact reports detailing the specific deployment of funds and quantified environmental metrics (e.g., GHG emissions avoided, MWh renewable energy generated)."
        ],
        correct: 3,
        correctExplanation: "Under the GLP Reporting pillar, borrowers must provide annual reports showing the allocation of proceeds to eligible projects and quantified environmental impact metrics.",
        incorrectExplanation: "Exemptions from reporting violate GLP, social media posts lack audit validity, and tax audit inquiries do not satisfy lender contractual covenants.",
        optionFeedback: [
          "Incorrect. Ongoing annual reporting is a mandatory core pillar of the Green Loan Principles.",
          "Incorrect. Social media marketing is not a recognized technical reporting format under green loan covenants.",
          "Incorrect. Green loan reporting is a contractual requirement owed directly to lenders, independent of tax audits.",
          "Correct. Borrowers must submit annual allocation reports and impact assessments with quantified environmental metrics."
        ]
      },
      {
        order: 5,
        question: "A corporate bank is calculating its Green Asset Ratio (GAR) under regulatory sustainable finance taxonomies. What does the GAR metric measure on the bank's balance sheet?",
        options: [
          "The proportion of the bank's total eligible assets, loans, and investments that are taxonomy-aligned and finance environmentally sustainable economic activities.",
          "The ratio of paper recycled in corporate bank branch offices compared to digital email volume.",
          "The percentage of bank employees who commute to work using electric bicycles.",
          "The total dollar value of physical gold bullion stored in the bank's central vault reserves."
        ],
        correct: 0,
        correctExplanation: "The Green Asset Ratio (GAR) represents the percentage of a credit institution's total covered assets and financing that align with official sustainable taxonomy criteria (e.g., EU Taxonomy).",
        incorrectExplanation: "GAR is a balance sheet financing metric, not an internal office paper metric, employee commute statistic, or vault gold reserve ratio.",
        optionFeedback: [
          "Correct. GAR quantifies the proportion of a bank's lending and investment balance sheet allocated to taxonomy-aligned sustainable economic activities.",
          "Incorrect. GAR measures credit portfolio financing alignment, not branch office waste recycling.",
          "Incorrect. Employee commuting is an internal HR/Scope 3 metric, not the balance-sheet GAR ratio.",
          "Incorrect. Physical gold reserves have no relation to the Green Asset Ratio calculation."
        ]
      },
      {
        order: 6,
        question: "A credit committee is assessing a transition finance facility for an industrial steel manufacturer investing in hydrogen-based direct reduced iron (DRI). What risk governance feature ensures the loan remains credible transition finance rather than greenwashing?",
        options: [
          "Allowing the steel company to self-certify emissions reductions without independent technical engineering milestones.",
          "Requiring a science-based transition plan aligned with a 1.5°C pathway, time-bound capital expenditure milestones, third-party technical verification, and mandatory clawback covenants if transition milestones are abandoned.",
          "Permitting the borrower to allocate 90% of the funds to expanding traditional coal-fired blast furnaces while labeling the project 'eco-efficient'.",
          "Structuring the loan without any covenants, repayment schedule, or carbon accounting requirements."
        ],
        correct: 1,
        correctExplanation: "Credible transition finance requires alignment with science-based pathways (e.g., SBTi), verifiable engineering capex milestones, and contractual covenants enforcing decarbonization delivery.",
        incorrectExplanation: "Self-certification without oversight, expanding coal blast furnaces, or covenant-free lending constitutes severe transition greenwashing.",
        optionFeedback: [
          "Incorrect. Unverified self-certification lacks institutional credibility and creates greenwashing risk.",
          "Correct. A 1.5°C-aligned transition plan with verified capex milestones and contractual covenants ensures credible decarbonization financing.",
          "Incorrect. Financing new coal-fired blast furnaces locks in long-term emissions and violates transition finance principles.",
          "Incorrect. Loans without covenants or carbon accounting lack credit risk protection and transition credibility."
        ]
      },
      {
        order: 7,
        question: "What role does an independent Second-Party Opinion (SPO) play in the underwriting and syndication of green and sustainability-linked credit facilities?",
        options: [
          "It replaces all internal credit risk modeling, KYC, and anti-money laundering legal checks.",
          "It acts as an unconditional legal guarantee that the borrower will never default on their debt obligations.",
          "It provides an independent expert assessment verifying that the borrower's green financing framework aligns with international market standards (GLP/SLLP) and that chosen KPIs/SPTs are ambitious and robust.",
          "It serves as marketing copy published exclusively on consumer retail banking billboards."
        ],
        correct: 2,
        correctExplanation: "An SPO from an accredited ESG rating/audit firm independently evaluates whether the borrower's framework conforms to GLP/SLLP standards and assesses the materiality and ambition of targets.",
        incorrectExplanation: "SPOs do not replace credit/KYC checks, do not guarantee against financial default, and are not promotional billboard advertisements.",
        optionFeedback: [
          "Incorrect. SPOs evaluate sustainability frameworks; they do not replace standard KYC, AML, or credit underwriting due diligence.",
          "Incorrect. An SPO does not guarantee credit solvency or provide debt insurance.",
          "Correct. An SPO independently validates alignment with international green loan principles and assesses the robustness of sustainability targets.",
          "Incorrect. SPOs are technical institutional audit documents, not consumer marketing slogans."
        ]
      },
      {
        order: 8,
        question: "In green project finance, what is the 'additionality' criterion when evaluating financing for new utility-scale renewable energy infrastructure?",
        options: [
          "Adding redundant financial management fees to the syndicated loan documentation.",
          "Requiring that all electrical cables be painted bright green.",
          "Adding extra legal contracts after loan closing without informing the borrower.",
          "Demonstrating that the renewable energy project creates net new clean generation capacity that would not have been constructed without the specific financing intervention."
        ],
        correct: 3,
        correctExplanation: "Additionality ensures that the credit facility results in new, incremental clean generation capacity displacing fossil fuels, rather than refinancing existing mature generation without new environmental impact.",
        incorrectExplanation: "Additionality refers to net new physical environmental capacity, not extra banking fees, colored cables, or unauthorized post-closing contracts.",
        optionFeedback: [
          "Incorrect. Additionality is an environmental impact criterion, not extra bank fee structuring.",
          "Incorrect. Cable color is an irrelevant aesthetic feature.",
          "Incorrect. Adding contracts without borrower knowledge is illegal and breaches loan syndication rules.",
          "Correct. Additionality proves that the financing enables genuine net-new clean energy capacity that would not have otherwise materialized."
        ]
      }
    ]
  },

  // 5. ELH-76 (ID: 737) - ESG Risk Integration in Commercial Credit (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 737,
    courseCode: "ELH-76",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "In commercial credit risk assessment, how does a bank distinguish between 'physical climate risk' and 'transition climate risk' for a borrowing corporate client?",
        options: [
          "Physical risks stem from acute weather events (floods, cyclones) and chronic climatic shifts (sea-level rise, heat stress) damaging assets, whereas transition risks arise from policy shifts, carbon pricing, technological disruption, and shifting market demand.",
          "Physical risks only affect human body fitness, while transition risks refer exclusively to computer software updates.",
          "Physical risks refer to paper bank statements getting wet, while transition risks refer to moving between bank branches.",
          "Physical and transition risks are identical terms that carry zero financial or operational relevance to credit default probability."
        ],
        correct: 0,
        correctExplanation: "Physical risks involve direct asset damage and supply disruption from weather/climate, while transition risks stem from economic and regulatory adjustments toward a low-carbon economy.",
        incorrectExplanation: "Physical/transition risks are core financial risk categories defined by the TCFD and central banks, not human fitness, software updates, or branch relocations.",
        optionFeedback: [
          "Correct. Physical risk encompasses direct damage from acute and chronic climate hazards, whereas transition risk involves economic impacts from policy, technology, and carbon market shifts.",
          "Incorrect. Physical climate risks refer to financial asset damage, not personal physical fitness.",
          "Incorrect. Physical and transition risks are macroeconomic and credit risk categories, not administrative paperwork issues.",
          "Incorrect. Both physical and transition climate risks directly impact asset valuations, cash flows, and default probabilities."
        ]
      },
      {
        order: 2,
        question: "Under the Equator Principles (EP4), what obligation applies to financial institutions financing large-scale infrastructure and industrial projects?",
        options: [
          "Financial institutions are prohibited from lending to any project that creates construction employment.",
          "Financial institutions must conduct categorized environmental and social risk due diligence, evaluate climate physical/transition risks, require Human Rights Due Diligence, and ensure Free, Prior, and Informed Consent (FPIC) for indigenous communities.",
          "Financial institutions must demand that all project workers sign non-disclosure agreements waiving health and safety rights.",
          "Financial institutions must waive all environmental impact assessments if the project promises high financial returns."
        ],
        correct: 1,
        correctExplanation: "Equator Principles (EP4) establish global benchmarks for assessing environmental, social, human rights, and climate risks, including mandatory FPIC compliance for indigenous peoples.",
        incorrectExplanation: "EP4 does not prohibit employment, prohibits waiving worker safety rights, and strictly forbids bypassing environmental assessments for financial gain.",
        optionFeedback: [
          "Incorrect. Equator Principles encourage sustainable economic development and responsible project employment.",
          "Correct. EP4 mandates rigorous environmental and social categorization, climate risk assessments, human rights due diligence, and FPIC compliance.",
          "Incorrect. EP4 requires robust worker health, safety, and grievance mechanisms; waiving safety rights violates the standard.",
          "Incorrect. Environmental impact assessments are mandatory under EP4 and cannot be waived regardless of profitability."
        ]
      },
      {
        order: 3,
        question: "A credit analyst is assessing a 10-year term loan for an agricultural agribusiness. Which environmental risk factor presents the most direct threat to the borrower's Debt Service Coverage Ratio (DSCR)?",
        options: [
          "The borrower's corporate website using outdated color schemes.",
          "Minor seasonal fluctuations in international postal stamp prices.",
          "Severe regional groundwater depletion and chronic drought conditions reducing crop yields, requiring costly irrigation infrastructure and lowering operating cash flows.",
          "Routine annual office painting at the agribusiness administrative headquarters."
        ],
        correct: 2,
        correctExplanation: "Groundwater depletion and chronic drought directly impair crop yields, increase input costs for emergency irrigation, compress EBITDA margins, and compromise debt service capacity.",
        incorrectExplanation: "Website colors, postal stamp prices, and office paint have negligible impact on agribusiness cash flows and debt service coverage.",
        optionFeedback: [
          "Incorrect. Website aesthetics do not impact agricultural harvest yields or debt service capacity.",
          "Incorrect. Postal price changes have immaterial financial impact on commercial farming cash flows.",
          "Correct. Chronic water stress and drought reduce crop yields and require heavy capital expenditure, directly threatening cash flows and debt service coverage.",
          "Incorrect. Administrative office maintenance is a routine operating cost with no systemic risk to credit solvency."
        ]
      },
      {
        order: 4,
        question: "How should a credit committee incorporate an unhedged high carbon price exposure (e.g., $100/tCO2e under an expanding emissions trading system) into an industrial borrower's credit rating?",
        options: [
          "By artificially increasing the borrower's credit rating because carbon prices are considered non-binding theoretical concepts.",
          "By deleting all Scope 1 and Scope 2 emissions data from the credit file to keep the loan application simple.",
          "By assuming that the borrower can pass 100% of all future regulatory compliance penalties onto consumers without losing market share.",
          "By stress-testing the borrower's EBITDA and interest coverage metrics under escalating carbon pricing scenarios, potentially downgrading internal rating grades if margins compress significantly."
        ],
        correct: 3,
        correctExplanation: "Credit analysis must stress-test cash flows and interest coverage against projected carbon price trajectories to evaluate whether margin compression triggers default risk.",
        incorrectExplanation: "Ignoring carbon pricing, deleting emissions data, or assuming full cost pass-through without customer elasticity underestimates credit risk.",
        optionFeedback: [
          "Incorrect. Carbon pricing represents real financial liability under compliance schemes; it is not a theoretical benefit.",
          "Incorrect. Deleting emissions data breaches credit risk due diligence and regulatory supervisory expectations.",
          "Incorrect. Price elasticity prevents heavy emitters from passing 100% of carbon costs to customers without losing volume.",
          "Correct. Stress-testing EBITDA and debt coverage under carbon price scenarios identifies financial vulnerability and informs internal rating adjustments."
        ]
      },
      {
        order: 5,
        question: "What constitutes 'stranded asset risk' when evaluating collateral valuations for thermal power generation or heavy fossil fuel extraction assets?",
        options: [
          "The risk that regulatory bans, carbon taxation, or competitive clean technologies render capital assets economically non-viable and devalued well before the end of their anticipated operational lifespan.",
          "The risk that a cargo ship gets physically stuck in a shallow harbor for more than 48 hours.",
          "The risk that an office building loses internet connection during a storm.",
          "The risk that gold coins are buried in an unknown desert location."
        ],
        correct: 0,
        correctExplanation: "Stranded asset risk refers to assets that suffer premature write-downs, devaluations, or liabilities due to regulatory shifts, market evolution, and competitive low-carbon alternatives.",
        incorrectExplanation: "Stranded assets refer to economic/technological obsolescence, not temporary ship groundings, internet outages, or hidden gold.",
        optionFeedback: [
          "Correct. Stranded assets suffer premature economic obsolescence, severe valuation write-downs, and unrecoverable capital costs due to the clean energy transition.",
          "Incorrect. Temporary vessel grounding is an operational maritime event, not the financial concept of stranded assets.",
          "Incorrect. Short-term utility outages do not represent asset stranding.",
          "Incorrect. Stranded asset risk is a structural credit risk concept, not lost physical treasure."
        ]
      },
      {
        order: 6,
        question: "During commercial credit onboarding, what is the primary function of a sector-specific ESG risk exclusion list?",
        options: [
          "To prevent bank staff from taking annual vacation leave during high-volume lending periods.",
          "To define non-negotiable red lines that prohibit financing for activities that cause severe, unmitigatable harm (e.g., controversial weapons, illegal logging, mountaintop removal mining).",
          "To exclude small businesses from applying for standard checking and savings accounts.",
          "To guarantee that all bank loans receive triple-A credit ratings from external agencies."
        ],
        correct: 1,
        correctExplanation: "Exclusion lists establish non-negotiable risk boundaries that bar lending to sectors carrying catastrophic environmental, social, or legal harm, protecting bank reputation and capital.",
        incorrectExplanation: "Exclusion lists do not govern staff leave, do not discriminate against small businesses, and do not manipulate external credit ratings.",
        optionFeedback: [
          "Incorrect. Exclusion lists govern credit portfolio risk appetite, not employee HR vacation policies.",
          "Correct. ESG exclusion lists establish clear red lines prohibiting capital allocation to activities causing severe, irremediable environmental or human harm.",
          "Incorrect. Exclusion lists target harmful high-risk industrial activities, not legitimate small enterprise retail banking.",
          "Incorrect. Exclusion lists establish ethical/risk boundaries; they do not dictate external rating agency scores."
        ]
      },
      {
        order: 7,
        question: "When underwriting commercial real estate collateral located in coastal flood zones, which risk mitigant should the credit officer make a mandatory condition precedent?",
        options: [
          "Verbal assurance from the seller that historical high-tide floodwaters were minor.",
          "Planting decorative palm trees around the perimeter of the parking garage.",
          "Verified independent flood elevation survey, proof of comprehensive flood and storm surge insurance coverage, and building-level flood defense infrastructure.",
          "A written agreement that tenants will clean up water damage themselves using household mops."
        ],
        correct: 2,
        correctExplanation: "Physical climate resilience in flood zones requires rigorous elevation modeling, comprehensive commercial flood insurance with adequate coverage limits, and physical flood defense barriers.",
        incorrectExplanation: "Verbal assurances, decorative palm trees, and tenant cleaning promises offer zero legal or physical protection against catastrophic storm surges.",
        optionFeedback: [
          "Incorrect. Verbal seller assurances provide zero legal enforceability or engineering verification against sea-level rise.",
          "Incorrect. Decorative landscaping does not provide engineered flood defense or storm surge barrier protection.",
          "Correct. Independent flood elevation surveys, comprehensive insurance covenants, and engineered flood defenses protect collateral value.",
          "Incorrect. Tenant mop agreements are unviable in catastrophic storm surge events and fail credit underwriting standards."
        ]
      },
      {
        order: 8,
        question: "How does severe corporate governance failure (such as executive fraud, lack of independent board oversight, or bribery) typically manifest in commercial credit default risk?",
        options: [
          "It increases the borrower's creditworthiness by demonstrating executive ruthlessness.",
          "It has zero correlation with credit risk because governance is purely an HR matter.",
          "It immediately results in the bank forgiving all outstanding loan principal.",
          "It leads to regulatory sanctions, severe financial misstatement restatements, catastrophic loss of market reputation, and sudden liquidity crises that precipitate debt default."
        ],
        correct: 3,
        correctExplanation: "Governance failures trigger accounting scandals, regulatory fines, customer defection, access-to-capital cutoffs, and rapid liquidity depletion, directly causing credit defaults.",
        incorrectExplanation: "Governance failure destroys creditworthiness, correlates strongly with default rates, and triggers debt acceleration rather than loan forgiveness.",
        optionFeedback: [
          "Incorrect. Fraud and corruption destroy credit standing and lead to swift credit rating downgrades.",
          "Incorrect. Governance failure is one of the leading direct causes of sudden corporate bankruptcy and credit default.",
          "Incorrect. Banks accelerate debt demand and declare events of default when fraud is uncovered, rather than forgiving loans.",
          "Correct. Governance breakdown results in regulatory penalties, financial restatements, loss of bank and supplier credit lines, and rapid insolvency."
        ]
      }
    ]
  },

  // 6. ELH-77 (ID: 754) - TCFD & Climate Financial Risk Disclosures (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 754,
    courseCode: "ELH-77",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Under the Task Force on Climate-related Financial Disclosures (TCFD) framework, which four core thematic pillars structure an organization's climate disclosure?",
        options: [
          "Governance, Strategy, Risk Management, and Metrics & Targets.",
          "Advertising, Sales, Logistics, and Human Resources.",
          "Legal, Accounting, Procurement, and Tax Minimization.",
          "Public Relations, Philanthropy, Sponsorship, and Corporate Branding."
        ],
        correct: 0,
        correctExplanation: "The TCFD framework is organized into four foundational pillars: Governance, Strategy, Risk Management, and Metrics & Targets.",
        incorrectExplanation: "Advertising/sales, legal/tax, and PR/philanthropy are not the recognized TCFD climate disclosure pillars.",
        optionFeedback: [
          "Correct. Governance, Strategy, Risk Management, and Metrics & Targets constitute the four core pillars of the TCFD framework.",
          "Incorrect. Advertising and sales are operational commercial functions, not TCFD disclosure pillars.",
          "Incorrect. General accounting and procurement are standard corporate functions, not the TCFD climate architecture.",
          "Incorrect. PR and philanthropy represent marketing/CSR, whereas TCFD focuses on material financial climate risks."
        ]
      },
      {
        order: 2,
        question: "Under the TCFD Strategy pillar, what is the primary purpose of conducting forward-looking 'climate scenario analysis' (e.g., modeling 1.5°C and 4°C warming pathways)?",
        options: [
          "To make exact, immutable predictions of daily stock prices over the next 50 years.",
          "To evaluate the strategic resilience and financial vulnerability of the organization's business model under plausible future physical and transition climate pathways.",
          "To create artistic climate infographics for corporate reception areas.",
          "To eliminate the requirement for measuring current-year greenhouse gas emissions."
        ],
        correct: 1,
        correctExplanation: "Scenario analysis tests how resilient an organization's strategy and financial position are under different plausible future climate pathways (e.g., rapid policy transition vs severe physical warming).",
        incorrectExplanation: "Scenario analysis is not a stock price forecasting tool, an art design exercise, or an exemption from GHG accounting.",
        optionFeedback: [
          "Incorrect. Scenario analysis is not designed for day-to-day stock price forecasting.",
          "Correct. Scenario analysis evaluates strategic resilience and identifies financial vulnerabilities across divergent future climate states.",
          "Incorrect. Scenarios are quantitative and qualitative strategic planning tools, not reception art.",
          "Incorrect. Scenario analysis complements but never replaces baseline Scope 1, 2, and 3 emissions measurement."
        ]
      },
      {
        order: 3,
        question: "When a financial institution discloses its Scope 3 Category 15 emissions under the TCFD and PCAF (Partnership for Carbon Accounting Financials) standards, what is it reporting?",
        options: [
          "The electricity used by ATMs and physical retail bank branches.",
          "The fuel burned by company executive fleet cars during business travel.",
          "The 'financed emissions' associated with the bank's lending and investment portfolios across corporate, project, and retail asset classes.",
          "The weight of paper bank statements mailed to retail banking customers."
        ],
        correct: 2,
        correctExplanation: "Scope 3 Category 15 represents 'financed emissions'—the greenhouse gas emissions generated by the corporate borrowers and investee companies funded by the bank's capital.",
        incorrectExplanation: "Branch electricity is Scope 2, fleet fuel is Scope 1/3 Cat 6, and paper statements are Scope 3 Cat 1, whereas Category 15 covers financed portfolio emissions.",
        optionFeedback: [
          "Incorrect. Branch electricity consumption is reported under Scope 2 purchased electricity.",
          "Incorrect. Executive vehicle fuel is classified under Scope 1 direct emissions or Scope 3 business travel.",
          "Correct. Scope 3 Category 15 captures 'financed emissions' generated by the borrowers, projects, and companies financed by the bank.",
          "Incorrect. Paper mailings fall under Scope 3 purchased goods and services, not Category 15 investments."
        ]
      },
      {
        order: 4,
        question: "Under the TCFD Governance pillar, what specific oversight role must be disclosed regarding the board of directors?",
        options: [
          "How many board members drive electric vehicles to annual shareholder meetings.",
          "The board's favorite environmental charities and personal philanthropic donations.",
          "Proof that board members have passed external meteorology and climate science degrees.",
          "The board's explicit processes and committee structures for overseeing climate-related risks and opportunities, including review of capital expenditures and strategic plans."
        ],
        correct: 3,
        correctExplanation: "TCFD Governance requires disclosure of board oversight structures, frequency of climate risk reviews, committee mandates, and how climate factors integrate into capital allocation and strategy.",
        incorrectExplanation: "Personal EV choices, charitable donations, and meteorology degrees do not satisfy governance disclosure requirements.",
        optionFeedback: [
          "Incorrect. Personal vehicle choices of directors are irrelevant to corporate governance oversight reporting.",
          "Incorrect. Personal philanthropic preferences do not demonstrate institutional risk management governance.",
          "Incorrect. Board members require relevant risk oversight competence, not mandatory academic meteorology degrees.",
          "Correct. Organizations must disclose how the board and its committees oversee, monitor, and integrate climate risks and opportunities into business plans."
        ]
      },
      {
        order: 5,
        question: "How has the International Sustainability Standards Board (ISSB) integrated the TCFD recommendations into global corporate reporting standards?",
        options: [
          "ISSB fully incorporated the four TCFD pillars (Governance, Strategy, Risk Management, Metrics & Targets) into IFRS S1 (General Requirements) and IFRS S2 (Climate-related Disclosures) as the global baseline.",
          "ISSB permanently banned all climate-related reporting in corporate financial statements.",
          "ISSB replaced climate disclosures with a single optional customer satisfaction score.",
          "ISSB declared that only non-profit charities need to report climate and environmental metrics."
        ],
        correct: 0,
        correctExplanation: "The IFRS Foundation and ISSB adopted the TCFD architecture as the core foundation for IFRS S1 and IFRS S2, establishing an authoritative global baseline for climate and sustainability financial disclosures.",
        incorrectExplanation: "ISSB did not ban climate disclosures, did not substitute satisfaction scores, and applies standards to commercial corporate entities worldwide.",
        optionFeedback: [
          "Correct. ISSB adopted the four-pillar TCFD structure as the foundation of IFRS S1 and IFRS S2 standards.",
          "Incorrect. ISSB was created specifically to standardize and enforce capital market sustainability reporting.",
          "Incorrect. Customer satisfaction scores do not replace financial climate risk disclosures.",
          "Incorrect. ISSB standards are designed primarily for commercial listed enterprises and financial institutions."
        ]
      },
      {
        order: 6,
        question: "In climate scenario analysis, what is the key characteristic of the Network for Greening the Financial System (NGFS) 'Orderly Transition' scenario compared to a 'Disorderly Transition'?",
        options: [
          "Orderly transition involves no climate policies being enacted until after the year 2080.",
          "An Orderly transition introduces climate policies early and ratchets carbon prices smoothly, minimizing disruptive economic costs, whereas a Disorderly transition delays action and requires abrupt, severe adjustments.",
          "Orderly transition assumes fossil fuel consumption will increase by 300% over the next decade.",
          "Disorderly transition guarantees zero financial impact on capital markets and banking portfolios."
        ],
        correct: 1,
        correctExplanation: "An Orderly scenario assumes early, anticipated, and gradual policy implementation, whereas Disorderly scenarios feature delayed, sudden, and unanticipated policies that spike transition costs.",
        incorrectExplanation: "Orderly scenarios feature proactive policy enactment, declining fossil fuel demand, and lower macroeconomic disruption than sudden disorderly transitions.",
        optionFeedback: [
          "Incorrect. Delaying policy until 2080 characterizes a 'Hot House World' scenario, not an Orderly transition.",
          "Correct. Orderly scenarios model early and progressive climate policy adoption, minimizing sudden economic shocks and transition risks.",
          "Incorrect. Orderly 1.5°C/2°C transitions model substantial reductions in fossil fuel demand.",
          "Incorrect. Disorderly transitions produce severe market volatility, sudden stranded assets, and heightened credit default rates."
        ]
      },
      {
        order: 7,
        question: "What is an 'Internal Carbon Price' (ICP), and how does a corporation use it to manage transition risk under TCFD Strategy guidance?",
        options: [
          "A penalty fee deducted from employee salaries for leaving office lights on overnight.",
          "A municipal tax rate charged on commercial building square footage.",
          "A monetary value per metric ton of CO2e assigned internally to evaluate the financial feasibility of capital investments, stress-test high-carbon projects, and incentivize decarbonization.",
          "The price of voluntary carbon credits sold to retail airline passengers."
        ],
        correct: 2,
        correctExplanation: "An Internal Carbon Price (shadow price or internal carbon fee) embeds a cost per ton of CO2e into capital expenditure appraisals, guiding capital toward low-carbon assets.",
        incorrectExplanation: "ICPs are corporate capital planning tools, not employee salary deductions, municipal property taxes, or retail passenger carbon credit prices.",
        optionFeedback: [
          "Incorrect. Internal carbon pricing is a strategic capex tool, not an HR salary penalty.",
          "Incorrect. ICP is an internal corporate valuation metric, not a municipal property tax.",
          "Correct. ICP assigns a theoretical or fee-based monetary value per ton of CO2e to stress-test capex decisions and redirect capital toward clean investments.",
          "Incorrect. ICP is an internal corporate accounting tool, distinct from voluntary retail offset purchases."
        ]
      },
      {
        order: 8,
        question: "Under TCFD Metrics & Targets, why is Weighted Average Carbon Intensity (WACI) widely used as the primary portfolio emissions metric by asset managers?",
        options: [
          "It measures only the weight of plastic garbage generated by portfolio companies.",
          "It is completely immune to company revenue changes and requires no carbon data.",
          "It calculates carbon emissions solely based on the total number of corporate board members.",
          "It normalizes a portfolio's carbon exposure by portfolio weight and company revenue ($M), allowing fair comparisons across different asset managers and portfolios regardless of total fund size."
        ],
        correct: 3,
        correctExplanation: "WACI measures a portfolio's exposure to carbon-intensive companies (tCO2e / $M revenue), weighted by asset allocation, enabling standardized benchmarking across funds of any size.",
        incorrectExplanation: "WACI measures greenhouse gas intensity per unit revenue, not plastic waste, board headcount, or revenue-free metrics.",
        optionFeedback: [
          "Incorrect. WACI measures greenhouse gas emissions (tCO2e), not physical solid plastic waste.",
          "Incorrect. WACI relies directly on investee company carbon emissions data and revenue metrics.",
          "Incorrect. Board size is irrelevant to carbon intensity calculations.",
          "Correct. WACI normalizes portfolio emissions by revenue and weighting, enabling standardized comparisons across funds of varying sizes and asset classes."
        ]
      }
    ]
  },

  // 7. ELH-78 (ID: 755) - Carbon Markets, Offsets & Credit Verification (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 755,
    courseCode: "ELH-78",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "In carbon accounting and offset credit verification, what is the definition and test of 'Additionality'?",
        options: [
          "Demonstrating that the greenhouse gas reduction or removal project would not have occurred under a business-as-usual scenario in the absence of the carbon market revenue incentive.",
          "Adding additional administrative management fees to every carbon credit transaction.",
          "Planting two trees for every one tree that naturally grows in an unmanaged forest.",
          "Ensuring that a company purchases carbon credits in addition to paying standard municipal tax rates."
        ],
        correct: 0,
        correctExplanation: "Additionality requires proving that the project would not have been financially or technically viable without carbon credit revenues, ensuring real net emission reductions.",
        incorrectExplanation: "Additionality is a core carbon verification principle, not administrative transaction fees, natural tree counts, or municipal tax payments.",
        optionFeedback: [
          "Correct. Additionality proves that the project's emissions reductions would not have occurred without the financial catalyst of carbon credit sales.",
          "Incorrect. Additionality refers to greenhouse gas reduction impact, not financial broker markup fees.",
          "Incorrect. Natural tree regeneration in unmanaged forests does not meet project additionality requirements.",
          "Incorrect. Tax compliance is an independent legal obligation and does not define carbon additionality."
        ]
      },
      {
        order: 2,
        question: "What constitutes the risk of 'Permanence' (or 'Reversal Risk') in nature-based carbon removal projects (e.g., forestry and soil carbon sequestration)?",
        options: [
          "The risk that carbon credit prices remain permanently fixed on international trading exchanges.",
          "The risk that sequestered carbon is released back into the atmosphere due to wildfires, pest infestation, disease, or illegal logging before the end of the project commitment period.",
          "The risk that trees absorb too much oxygen during nighttime photosynthesis.",
          "The guarantee that a carbon credit project will operate for exactly 1,000 years without monitoring."
        ],
        correct: 1,
        correctExplanation: "Permanence risk (reversal) is the possibility that stored biological carbon is re-emitted to the atmosphere via natural disturbances or human activity, requiring buffer pool reserves.",
        incorrectExplanation: "Permanence refers to carbon storage durability, not financial credit pricing, nighttime oxygen absorption, or unmonitored longevity guarantees.",
        optionFeedback: [
          "Incorrect. Permanence relates to the physical durability of carbon storage, not market price volatility.",
          "Correct. Reversal risk represents the premature release of stored carbon through events like forest fires, pest outbreaks, or deforestation.",
          "Incorrect. Trees release minimal CO2 during respiration, but net sequestration is positive; this is not permanence risk.",
          "Incorrect. Nature-based projects require active monitoring and buffer pools to manage reversal risks."
        ]
      },
      {
        order: 3,
        question: "Under Article 6.2 and 6.4 of the Paris Agreement, what mechanism prevents 'Double Counting' of carbon emission reductions transferred between nations?",
        options: [
          "Printing duplicate paper carbon certificates for both the buying and selling nation.",
          "Ignoring international carbon transfers in national GHG inventories.",
          "A 'Corresponding Adjustment' (CA) where the host country adds the transferred mitigation amount back into its national emission balance, ensuring only the acquiring entity claims the reduction.",
          "Banning all cross-border carbon credit sales permanently."
        ],
        correct: 2,
        correctExplanation: "Corresponding Adjustments (CAs) prevent double counting by requiring the host nation to un-count the transferred mitigation outcome (ITMO) from its own Nationally Determined Contribution (NDC).",
        incorrectExplanation: "Duplicate certificates encourage double counting, ignoring transfers corrupts national accounting, and Article 6 explicitly authorizes structured cross-border transfers.",
        optionFeedback: [
          "Incorrect. Issuing duplicate certificates creates direct double counting and invalidates climate claims.",
          "Incorrect. Ignoring international transfers undermines the integrity of national GHG accounting.",
          "Correct. Corresponding Adjustments ensure the host country adjusts its national inventory upward so that only the buying entity claims the emissions reduction.",
          "Incorrect. Article 6 establishes international cooperative mechanisms for cross-border carbon trading with proper adjustments."
        ]
      },
      {
        order: 4,
        question: "What role do major independent carbon crediting standards and registries (e.g., Verra VCS, Gold Standard, American Carbon Registry) perform in voluntary carbon markets?",
        options: [
          "They issue physical cash banknotes backed by sovereign central bank reserves.",
          "They manufacture industrial air filter masks for distribution to retail consumers.",
          "They act as corporate public relations agencies writing advertising slogans for fossil fuel producers.",
          "They establish rigorous methodologies, oversee accredited third-party validation and verification (VVB audits), issue serialized credits, and manage public registries to prevent double selling and track retirement."
        ],
        correct: 3,
        correctExplanation: "Carbon crediting programs maintain approved accounting methodologies, oversee accredited auditor (VVB) reviews, serialize credits, and host transparent public registries.",
        incorrectExplanation: "Carbon registries do not issue sovereign fiat currency, manufacture physical hardware, or function as PR agencies for oil companies.",
        optionFeedback: [
          "Incorrect. Carbon registries issue digital environmental attributes, not sovereign cash currency.",
          "Incorrect. Standards bodies develop carbon accounting protocols, not physical consumer products.",
          "Incorrect. Standards registries are independent governance and certification bodies, not corporate PR firms.",
          "Correct. Crediting standards set methodologies, govern third-party verification, issue serialized credits, and manage public tracking registries."
        ]
      },
      {
        order: 5,
        question: "In carbon market terminology, what is the critical operational difference between an 'Emissions Reduction / Avoidance Credit' and an 'Emissions Removal Credit'?",
        options: [
          "Avoidance credits represent preventing emissions that would have occurred (e.g., renewable energy displacing coal, avoided deforestation), whereas Removal credits physically capture CO2 from the atmosphere and store it durably (e.g., DACCS, biochar, afforestation).",
          "Avoidance credits can only be bought by government agencies, while Removal credits can only be bought by private individuals.",
          "Avoidance credits expire within 24 hours of issuance, while Removal credits never expire.",
          "There is no operational difference; both terms describe generic financial currency derivatives."
        ],
        correct: 0,
        correctExplanation: "Avoidance credits prevent emissions from entering the atmosphere, while Removal credits physically extract atmospheric CO2 and sequester it in biological or geological sinks.",
        incorrectExplanation: "Both credit types can be purchased by corporations and governments, do not expire in 24 hours, and represent distinct physical climate mechanisms.",
        optionFeedback: [
          "Correct. Avoidance credits prevent emissions that would have occurred under baseline scenarios, whereas Removal credits physically extract and sequester atmospheric CO2.",
          "Incorrect. Both credit types are accessible to corporations, governments, and institutional investors.",
          "Incorrect. Carbon credits remain valid on registries until retired or cancelled; they do not expire in 24 hours.",
          "Incorrect. Avoidance and removal represent fundamentally different physical and accounting climate mechanisms."
        ]
      },
      {
        order: 6,
        question: "What is 'Carbon Leakage' in the context of a forest conservation (REDD+) or industrial carbon reduction project?",
        options: [
          "Liquid carbon dioxide leaking from underground geological storage pipelines.",
          "The displacement of deforestation or greenhouse-gas-emitting activities outside the project's monitored boundary as an indirect consequence of project implementation.",
          "A computer database error causing digital carbon tokens to be lost.",
          "Minor exhaust emissions emitted by forest rangers driving inspection quad bikes.",
          ],
        correct: 1,
        correctExplanation: "Leakage occurs when protecting a specific forest parcel causes timber harvesters or agricultural deforesters to simply move their destructive activities to an adjacent unprotected area.",
        incorrectExplanation: "Leakage in carbon markets refers to activity displacement, not pipeline ruptures, database bugs, or ranger patrol vehicle emissions.",
        optionFeedback: [
          "Incorrect. Physical pipeline leaks represent technical storage containment failure, not carbon market leakage.",
          "Correct. Carbon leakage is the displacement of greenhouse gas emissions outside project boundaries as a result of project activities.",
          "Incorrect. Data losses are registry IT issues, not carbon accounting leakage.",
          "Incorrect. Ranger vehicle emissions are direct project implementation emissions, accounted for in net carbon balance calculations."
        ]
      },
      {
        order: 7,
        question: "Under the Integrity Council for the Voluntary Carbon Market (ICVCM) Core Carbon Principles (CCPs), what benchmark ensures that carbon credits uphold robust social safeguards?",
        options: [
          "The project guarantees to double the stock market valuation of the corporate credit buyer.",
          "The project must distribute 100% of all revenues to international brokerage hedge funds.",
          "The project must respect human rights, secure Free, Prior, and Informed Consent (FPIC) for local Indigenous Peoples and Local Communities (IPLCs), and provide transparent benefit-sharing mechanisms.",
          "The project must operate without any local stakeholder consultations or public meetings."
        ],
        correct: 2,
        correctExplanation: "The ICVCM CCPs mandate strong social safeguards, including FPIC, human rights compliance, and equitable benefit-sharing with local communities.",
        incorrectExplanation: "CCPs prioritize environmental integrity and social equity, not buyer equity valuations, hedge fund payouts, or bypassing stakeholder consultations.",
        optionFeedback: [
          "Incorrect. CCP standards govern environmental and social integrity, not corporate buyer equity valuations.",
          "Incorrect. Revenue must support local project development and community benefits, not financial speculators.",
          "Correct. CCP social safeguards require human rights compliance, Free Prior and Informed Consent (FPIC), and transparent local community benefit-sharing.",
          "Incorrect. Omitting stakeholder consultations directly violates international carbon integrity standards."
        ]
      },
      {
        order: 8,
        question: "Why is the 'Retirement' of a serialized carbon credit on an official public registry an essential step in corporate carbon footprint offsetting?",
        options: [
          "It converts the carbon credit into an interest-bearing government sovereign bond.",
          "It allows the credit to be resold multiple times on secondary speculative derivative markets.",
          "It deletes the credit serial number from all international climate databases permanently.",
          "It permanently cancels the credit from circulation, ensuring that the environmental benefit is claimed only once by the retiring entity and cannot be traded, transferred, or double-claimed."
        ],
        correct: 3,
        correctExplanation: "Retirement permanently takes the serialized credit off the market, ensuring that the buyer exclusively claims the environmental benefit and preventing resale or double claiming.",
        incorrectExplanation: "Retirement does not create sovereign bonds, prohibits further resale, and preserves the serial record in the public retirement ledger.",
        optionFeedback: [
          "Incorrect. Carbon credits do not convert into interest-bearing government bonds upon retirement.",
          "Incorrect. Retired credits are permanently locked and cannot be traded, resold, or used for derivative speculation.",
          "Incorrect. Serial numbers remain permanently visible in public retirement registries as an immutable audit trail.",
          "Correct. Registry retirement permanently cancels the serialized unit from circulation, securing an exclusive, non-transferable climate claim."
        ]
      }
    ]
  },

  // 8. ELH-79 (ID: 738) - Anti-Greenwashing in Financial Products (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 738,
    courseCode: "ELH-79",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Under the EU Sustainable Finance Disclosure Regulation (SFDR), what distinguishes an 'Article 8' fund from an 'Article 9' fund?",
        options: [
          "Article 8 funds promote environmental or social characteristics ('light green'), whereas Article 9 funds have sustainable investment or carbon reduction as their core binding objective ('dark green').",
          "Article 8 funds invest exclusively in tobacco and firearms, while Article 9 funds invest in commercial real estate.",
          "Article 8 funds are exempt from all disclosure rules, while Article 9 funds are prohibited from investing in European stocks.",
          "Article 8 and Article 9 are identical classifications with zero legal, regulatory, or reporting distinctions."
        ],
        correct: 0,
        correctExplanation: "Article 8 funds promote environmental/social characteristics alongside other financial goals, whereas Article 9 funds are dedicated to sustainable investment objectives with 100% sustainable asset mandates.",
        incorrectExplanation: "SFDR classifications carry strict legal definitions under European law, not arbitrary sector exclusions or disclosure exemptions.",
        optionFeedback: [
          "Correct. Article 8 covers funds promoting environmental/social characteristics, while Article 9 covers funds with a core sustainable investment objective.",
          "Incorrect. Article 8 and Article 9 are sustainable finance classifications, not controversial weapons or tobacco allocations.",
          "Incorrect. Both Article 8 and Article 9 funds are subject to rigorous mandatory disclosure requirements under SFDR RTS.",
          "Incorrect. Article 8 and Article 9 carry fundamentally different legal, allocation, and reporting obligations."
        ]
      },
      {
        order: 2,
        question: "What regulatory enforcement action occurs when a fund manager markets an investment product using the term 'Sustainable Climate Leader' but holds significant unhedged investments in coal mining without ESG screening?",
        options: [
          "The fund manager is awarded an industry innovation grant for marketing creativity.",
          "Regulators (e.g., SEC, ESMA, FCA) can initiate civil enforcement actions, impose substantial monetary fines, order mandatory fund re-labeling, and demand restitution for misleading investors.",
          "The regulatory agency deletes all fund investor accounts and seizes client assets permanently.",
          "The regulatory agency forces the company to shut down all internet websites worldwide."
        ],
        correct: 1,
        correctExplanation: "Misleading ESG marketing claims trigger enforcement actions from securities regulators, resulting in multi-million dollar penalties, mandatory name changes, and remediation orders.",
        incorrectExplanation: "Misleading marketing is penalized, not rewarded with grants, and does not result in arbitrary asset seizures or global website bans.",
        optionFeedback: [
          "Incorrect. Misleading sustainability marketing is considered fraudulent misrepresentation, not rewarded innovation.",
          "Correct. Financial regulators actively penalize misleading green claims with enforcement actions, financial penalties, and mandatory re-labeling.",
          "Incorrect. Regulators protect investor assets rather than arbitrarily seizing client capital.",
          "Incorrect. Regulatory sanctions apply to fund marketing, registration, and management licenses, not arbitrary worldwide website takedowns."
        ]
      },
      {
        order: 3,
        question: "Under ESMA's (European Securities and Markets Authority) fund naming guidelines, what minimum proportion of investments must be taxonomy-aligned or meet sustainable investment criteria if a fund uses the word 'Sustainable' in its name?",
        options: [
          "At least 5% of total portfolio assets.",
          "Exactly 0%, as fund names are considered non-binding marketing art.",
          "At least 80% of investments used to meet the sustainability characteristics or objectives, paired with strict exclusions against fossil fuels and controversial activities.",
          "Exactly 100% of all fund assets must be physical renewable energy solar panels."
        ],
        correct: 2,
        correctExplanation: "ESMA guidelines mandate an 80% investment threshold in assets meeting the fund's sustainability characteristics/objectives, alongside Paris-Aligned Benchmark (PAB) exclusion rules.",
        incorrectExplanation: "A 5% threshold is insufficient, fund names are legally regulated, and portfolio assets are not restricted solely to physical solar panels.",
        optionFeedback: [
          "Incorrect. A 5% allocation is far below the mandatory threshold required by fund naming regulations.",
          "Incorrect. Fund naming is legally regulated under consumer protection and securities transparency mandates.",
          "Correct. ESMA rules require at least an 80% sustainability asset threshold and strict fossil fuel exclusion baselines for funds using sustainability-related terms.",
          "Incorrect. Sustainable funds can hold diverse equities, green bonds, and transition assets, not solely physical solar assets."
        ]
      },
      {
        order: 4,
        question: "What constitutes 'Greenwashing' in sustainable asset management marketing and client disclosures?",
        options: [
          "Painting corporate headquarters building exteriors with water-based green paint.",
          "Investing in companies that manufacture biodegradable household soap and cleaning products.",
          "Publishing annual audited financial reports on recycled FSC-certified paper stock.",
          "Making unsubstantiated, exaggerated, or misleading claims regarding the environmental credentials, sustainability impact, or ESG integration of an investment strategy or product."
        ],
        correct: 3,
        correctExplanation: "Greenwashing in financial services refers to the practice of misrepresenting an investment strategy or fund's sustainability profile, impact, or ESG integration to attract investors.",
        incorrectExplanation: "Greenwashing is a deceptive communications practice, not physical building painting, legitimate soap manufacturing, or using recycled report paper.",
        optionFeedback: [
          "Incorrect. Physical building paint is not the financial regulatory definition of greenwashing.",
          "Incorrect. Investing in genuine sustainable product manufacturers is legitimate sustainable investment.",
          "Incorrect. Using recycled paper for corporate reporting is good operational practice, not greenwashing.",
          "Correct. Financial greenwashing is the practice of presenting misleading, unsubstantiated, or exaggerated sustainability claims regarding an investment product."
        ]
      },
      {
        order: 5,
        question: "Under the UK FCA's Sustainability Disclosure Requirements (SDR), which four consumer-facing investment labels were established to eliminate greenwashing?",
        options: [
          "Sustainability Focus, Sustainability Improvers, Sustainability Impact, and Sustainability Mixed Goals.",
          "Basic Green, Intermediate Green, Advanced Green, and Ultra Green.",
          "Eco-Bronze, Eco-Silver, Eco-Gold, and Eco-Platinum.",
          "Clean Tech, Clean Transport, Clean Energy, and Clean Industry."
        ],
        correct: 0,
        correctExplanation: "The UK FCA SDR framework introduced four official consumer-facing labels: Sustainability Focus, Sustainability Improvers, Sustainability Impact, and Sustainability Mixed Goals.",
        incorrectExplanation: "Basic/Ultra green, bronze/platinum tiers, and sector labels are not the statutory SDR investment labels.",
        optionFeedback: [
          "Correct. The FCA SDR framework established Sustainability Focus, Sustainability Improvers, Sustainability Impact, and Sustainability Mixed Goals.",
          "Incorrect. Basic to Ultra Green are fabricated names not present in the FCA SDR rules.",
          "Incorrect. Medal tiers are not part of the UK statutory sustainability labelling regime.",
          "Incorrect. Clean technology sector categories do not represent the four official FCA SDR fund labels."
        ]
      },
      {
        order: 6,
        question: "When an investment manager claims that its ESG fund 'delivers a 40% reduction in real-world carbon emissions', what data verification is required to prevent misleading impact claims?",
        options: [
          "Citing stock market price appreciation as direct proof of atmospheric carbon removal.",
          "Providing audited portfolio attribution showing whether emissions reductions were driven by real-world decarbonization of investee companies rather than merely re-weighting or selling high-emitting stocks to other investors.",
          "Showing photographs of wind turbines in marketing brochures without portfolio data.",
          "Claiming that holding shares in a company automatically forces its factory chimneys to stop smoking."
        ],
        correct: 1,
        correctExplanation: "Impact claims must distinguish between 'portfolio decarbonization' (selling high emitters to someone else) and 'real-world decarbonization' (investee companies cutting absolute emissions).",
        incorrectExplanation: "Stock price gains, stock photos of wind turbines, and passive share ownership claims do not prove real-world emissions reductions.",
        optionFeedback: [
          "Incorrect. Equity price movements reflect market valuation, not physical greenhouse gas reductions.",
          "Correct. Credible impact verification requires proving that portfolio emission drops stem from genuine operational decarbonization by investee firms, not paper divestment.",
          "Incorrect. Generic marketing photos without underlying portfolio attribution constitute greenwashing.",
          "Incorrect. Secondary market equity ownership alone does not directly reduce physical industrial emissions without active engagement."
        ]
      },
      {
        order: 7,
        question: "In proxy voting and active stewardship, how can asset managers demonstrate genuine engagement and avoid accusations of 'empty stewardship' greenwashing?",
        options: [
          "Voting automatically with corporate management 100% of the time without reading shareholder resolutions.",
          "Attending annual general meetings solely to consume corporate hospitality catering.",
          "Maintaining transparent, time-bound engagement milestones, publishing complete voting records, filing shareholder resolutions, and escalating voting against directors when climate targets fail.",
          "Refusing to engage with company boards and communicating exclusively through anonymous online chat rooms."
        ],
        correct: 2,
        correctExplanation: "Effective stewardship requires published escalation frameworks, transparent voting records, filing resolutions, and voting against directors when companies fail climate milestones.",
        incorrectExplanation: "Rubber-stamping management votes, attending for free food, or anonymous chat room posts represent empty or absent stewardship.",
        optionFeedback: [
          "Incorrect. Blindly rubber-stamping management proposals demonstrates absent stewardship and creates greenwashing vulnerability.",
          "Incorrect. Hospitality attendance is not active stewardship.",
          "Correct. Robust stewardship requires documented engagement objectives, public voting transparency, resolution filing, and director voting escalation.",
          "Incorrect. Anonymous internet posting is unprofessional and ineffective for corporate engagement."
        ]
      },
      {
        order: 8,
        question: "What is the 'Principal Adverse Impacts' (PAI) reporting requirement under the EU SFDR framework?",
        options: [
          "Reporting the impact of bad weather on portfolio manager commute times.",
          "Disclosing the number of times a fund's mobile trading app crashed during market volatility.",
          "Estimating how many employees were hired by third-party recruitment agencies.",
          "Mandatory disclosure of how investment decisions cause negative externalities on sustainability factors (e.g., carbon footprint, water emissions, hazardous waste, human rights violations)."
        ],
        correct: 3,
        correctExplanation: "PAI indicators disclose the negative externalities of investments on the environment and society (e.g., GHG intensity, biodiversity impacts, gender pay gap, UN Global Compact violations).",
        incorrectExplanation: "PAI does not track manager commute times, trading app software crashes, or agency recruitment headcounts.",
        optionFeedback: [
          "Incorrect. PAI measures portfolio sustainability impacts, not employee commute weather.",
          "Incorrect. App uptime is an IT operational metric, not an SFDR sustainability indicator.",
          "Incorrect. Recruitment agency headcounts do not represent the SFDR Principal Adverse Impact framework.",
          "Correct. PAI mandates transparent reporting on how investment portfolios impact climate, water, waste, social issues, and human rights."
        ]
      }
    ]
  },

  // 9. ELH-80 (ID: 756) - Sustainable Wealth Management & ESG Advisory (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 756,
    courseCode: "ELH-80",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Under MiFID II sustainability preference rules, when must a wealth manager or financial advisor assess a private client's sustainability preferences?",
        options: [
          "During the formal client onboarding and suitability assessment process, asking structured questions regarding the client's preferences for Taxonomy-aligned investments, SFDR sustainable investments, and consideration of Principal Adverse Impacts (PAIs).",
          "Only after the client has experienced substantial investment losses in conventional portfolios.",
          "Exclusively on Earth Day if the client specifically requests an in-person meeting.",
          "Wealth managers are legally prohibited from discussing environmental or social preferences with clients."
        ],
        correct: 0,
        correctExplanation: "MiFID II mandates that advisors must assess sustainability preferences during the suitability assessment prior to providing investment advice or portfolio management.",
        incorrectExplanation: "Assessing sustainability preferences is a mandatory regulatory requirement during onboarding, not an Earth Day option or illegal discussion.",
        optionFeedback: [
          "Correct. MiFID II requires mandatory integration of sustainability preference questioning into the client suitability assessment process.",
          "Incorrect. Sustainability profiling must occur prior to investing, not as a reaction to portfolio losses.",
          "Incorrect. Suitability assessments are ongoing regulatory compliance duties, not annual Earth Day novelties.",
          "Incorrect. Advisors are legally required under European regulations to actively assess client sustainability preferences."
        ]
      },
      {
        order: 2,
        question: "How does a wealth advisor distinguish between 'Negative Screening / Exclusions', 'ESG Integration', and 'Impact Investing' for an advisory client?",
        options: [
          "They are three identical marketing labels that all lead to buying standard unhedged equity index trackers.",
          "Negative screening excludes specific sectors (e.g., weapons, tobacco); ESG integration systematically incorporates ESG risks into financial valuation; Impact investing seeks to generate measurable positive real-world environmental/social outcomes alongside financial returns.",
          "Negative screening is illegal, ESG integration is optional, and Impact investing requires donating 100% of portfolio capital to charities.",
          "Negative screening only applies to bond investments, while ESG integration and Impact investing apply only to real estate."
        ],
        correct: 1,
        correctExplanation: "Negative screening applies values-based exclusions, ESG integration manages financially material risks, and impact investing targets intentional, measurable positive real-world solutions.",
        incorrectExplanation: "The three approaches have distinct investment mechanics, asset classes, and risk-return expectations across equity, debt, and private markets.",
        optionFeedback: [
          "Incorrect. The three strategies have distinct objectives, portfolio construction methodologies, and risk profiles.",
          "Correct. Negative screening filters out objectionable sectors, ESG integration evaluates material risks, and impact investing targets measurable positive solutions.",
          "Incorrect. Negative screening is widely used, and impact investing targets financial returns alongside positive impact, distinct from philanthropy.",
          "Incorrect. All three strategies apply across equities, fixed income, private equity, and real assets."
        ]
      },
      {
        order: 3,
        question: "When constructing a high-net-worth client portfolio, what constitutes a 'Positive Tilt / Best-in-Class' ESG investment strategy?",
        options: [
          "Excluding all companies whose stock ticker symbols start with vowels.",
          "Investing 100% of the client's wealth into cash savings accounts in offshore bank branches.",
          "Overweighting companies that score highest on ESG criteria relative to their industry sector peers, maintaining broad sector diversification while incentivizing top sustainability performers.",
          "Purchasing shares only in companies that produce green consumer clothing and footwear."
        ],
        correct: 2,
        correctExplanation: "A best-in-class strategy selects and overweights industry leaders with superior ESG performance within each sector, avoiding the structural sector concentration of pure exclusionary strategies.",
        incorrectExplanation: "Ticker symbol filtering, offshore cash hoarding, or apparel-only investing are absurd strategies with no relation to best-in-class ESG construction.",
        optionFeedback: [
          "Incorrect. Ticker symbol letters have zero relation to ESG analysis or investment strategy.",
          "Incorrect. 100% cash holding does not provide portfolio growth or best-in-class ESG allocation.",
          "Correct. Best-in-class strategies overweight top ESG performers within each sector, maintaining diversification while tilting capital toward leaders.",
          "Incorrect. Best-in-class investing spans all economic sectors (tech, health, industrials, utilities), not just green apparel."
        ]
      },
      {
        order: 4,
        question: "Under common law and civil legal traditions, how does a wealth manager reconcile their fiduciary duty with incorporating ESG factors into client investment mandates?",
        options: [
          "Fiduciary duty requires wealth managers to completely ignore climate change, fraud risks, and regulatory fines.",
          "Fiduciary duty mandates that advisors must prioritize their own advisory commission fees above client financial interests.",
          "Fiduciary duty prevents wealth managers from investing in any company that uses digital computing technology.",
          "Integrating financially material ESG risks and opportunities is fully aligned with fiduciary duty, as evaluating environmental and governance risks protects long-term risk-adjusted investment returns."
        ],
        correct: 3,
        correctExplanation: "Legal consensus (e.g., UNEP FI / PRI Fiduciary Duty in the 21st Century) affirms that failing to consider financially material ESG risks violates fiduciary duty by exposing client assets to unmanaged risks.",
        incorrectExplanation: "Fiduciary duty requires managing material risks for the client's benefit, not ignoring climate threats or prioritizing advisor commissions.",
        optionFeedback: [
          "Incorrect. Ignoring material climate and fraud risks exposes clients to losses and breaches fiduciary obligations.",
          "Incorrect. Prioritizing advisor fees over client interests is a direct breach of fiduciary duty and securities law.",
          "Incorrect. Fiduciary duty has no restriction against digital technology.",
          "Correct. Assessing material ESG risks is fully consistent with and required by fiduciary duty to protect long-term risk-adjusted returns."
        ]
      },
      {
        order: 5,
        question: "A private wealth client expresses strong interest in 'Thematic Sustainable Investing'. Which portfolio asset allocation best exemplifies a thematic strategy?",
        options: [
          "Allocating capital to dedicated funds targeting specific secular sustainability themes, such as clean water infrastructure, renewable energy transition, circular packaging, and agricultural agtech.",
          "Buying equal shares of every publicly listed stock in the domestic national stock exchange.",
          "Investing entirely in physical gold bars stored in a Swiss safety deposit box.",
          "Purchasing commercial airliner leasing debt with high carbon emissions intensity."
        ],
        correct: 0,
        correctExplanation: "Thematic investing directs capital to companies addressing specific structural sustainability challenges (e.g., water scarcity, renewable energy, clean transport, circular economy).",
        incorrectExplanation: "Equal-weighted index buying, gold bullion storage, or high-carbon airline leasing do not represent thematic sustainability investing.",
        optionFeedback: [
          "Correct. Thematic investing targets structural environmental and social solution themes like water security, clean energy, and agtech.",
          "Incorrect. Broad equal-weighted index investing is an unconstrained passive strategy, not thematic ESG.",
          "Incorrect. Physical gold is a precious metal commodity hedge, not a sustainability theme.",
          "Incorrect. Unscreened aircraft leasing debt represents high-carbon asset exposure rather than sustainable theme allocation."
        ]
      },
      {
        order: 6,
        question: "What is 'Greenwashing Risk' from a private wealth advisory perspective, and what liability does an advisor face if an unsuitable fund is recommended?",
        options: [
          "The risk that bank statement paper is dyed light green by a printer error.",
          "Recommending a fund marketed as sustainable that fails to meet the client's stated sustainability preferences or regulatory standards, exposing the advisory firm to client mis-selling complaints, regulatory sanctions, and reputational damage.",
          "The risk that private clients will refuse to pay standard brokerage commissions.",
          "The risk that sustainable investments automatically outperform all conventional asset classes in every calendar quarter."
        ],
        correct: 1,
        correctExplanation: "Recommending greenwashed funds exposes wealth managers to client mis-selling claims under suitability rules, regulatory enforcement fines, and brand destruction.",
        incorrectExplanation: "Greenwashing is not printer paper tinting, fee refusal, or a guarantee of quarterly investment outperformance.",
        optionFeedback: [
          "Incorrect. Greenwashing is a regulatory and fiduciary risk, not a printer paper issue.",
          "Correct. Recommending greenwashed products breaches client suitability rules, risking regulatory fines, mis-selling lawsuits, and loss of client trust.",
          "Incorrect. Commission disputes are commercial contracting matters, not the definition of greenwashing risk.",
          "Incorrect. No investment strategy guarantees outperformance in every market cycle."
        ]
      },
      {
        order: 7,
        question: "In philanthropic advisory and blended finance, how can wealth managers advise family offices to structure concessionary catalytic capital?",
        options: [
          "By investing only in short-term speculative currency options without social impact measurement.",
          "By paying 100% of family office capital to commercial advertising agencies.",
          "Deploying first-loss equity or subordinate debt in blended finance structures, de-risking high-impact environmental projects (e.g., emerging market grid infrastructure) to crowd in commercial private sector capital.",
          "Requiring all non-profit charities to repay donations with 25% annual compound interest."
        ],
        correct: 2,
        correctExplanation: "Catalytic capital uses concessionary terms (first-loss capital, guarantees) to absorb early risk, unlocking large-scale commercial private capital for high-impact climate solutions.",
        incorrectExplanation: "Currency speculation, advertising payments, or usurious interest on charitable grants violate blended finance and philanthropic principles.",
        optionFeedback: [
          "Incorrect. Short-term currency speculation is high-risk trading without developmental impact.",
          "Incorrect. Advertising expenditure does not constitute catalytic impact investing.",
          "Correct. First-loss catalytic capital de-risks critical climate and social projects, unlocking multiples of commercial institutional co-investment.",
          "Incorrect. Demanding predatory interest on charitable gifts contradicts philanthropic mission and law."
        ]
      },
      {
        order: 8,
        question: "When evaluating an ESG Rating Agency report for an investee company, why must a wealth advisor look beyond the headline composite ESG letter score (e.g., 'AAA' vs 'BBB')?",
        options: [
          "Because all ESG rating agencies use identical algorithms and produce 100% identical correlation across all stocks.",
          "Because headline ESG letter scores are legally binding criminal background checks on company CEOs.",
          "Because ESG rating scores are updated every three seconds by automated artificial intelligence bots.",
          "Because different rating agencies exhibit low correlation and differing methodologies; advisors must analyze underlying sub-pillar metrics (carbon intensity, worker safety, board independence) relevant to the client's specific risk and values mandate."
        ],
        correct: 3,
        correctExplanation: "ESG rating agencies show low pairwise correlation (~0.5–0.6); analyzing granular underlying metrics ensures the investment aligns with specific client values and material financial risks.",
        incorrectExplanation: "ESG ratings have low correlation (not identical), are not criminal background checks, and are not updated every three seconds.",
        optionFeedback: [
          "Incorrect. ESG rating agencies exhibit low correlation (~0.54) due to divergent methodologies, weightings, and indicators.",
          "Incorrect. ESG scores evaluate corporate sustainability risks, not personal criminal records of executives.",
          "Incorrect. Corporate ESG ratings are typically updated annually or semi-annually, not every few seconds.",
          "Correct. Due to divergent rating agency methodologies, advisors must evaluate underlying operational sub-metrics to match specific client mandates."
        ]
      }
    ]
  },

  // 10. ELH-81 (ID: 757) - Green Freight & Multimodal Cargo Optimization (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 757,
    courseCode: "ELH-81",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "In freight transportation logistics, what is the primary environmental and carbon efficiency advantage of shifting long-distance cargo from heavy road diesel trucking to electrified rail or inland waterway barge (Modal Shift)?",
        options: [
          "Rail and maritime/inland barge freight achieve substantially lower grams of CO2e per tonne-kilometre (gCO2e/tkm) compared to road freight, reducing energy consumption and highway congestion.",
          "Electrified rail cargo is legally exempt from all national customs inspections and border safety controls.",
          "Rail transport eliminates the need for any packaging or pallet containment during transit.",
          "Moving freight by barge makes shipping containers travel faster than air freight."
        ],
        correct: 0,
        correctExplanation: "Rail and water transport achieve significant energy efficiency per unit of payload, cutting emissions by 60%–80% per tonne-kilometre compared to long-haul road freight.",
        incorrectExplanation: "Rail is not exempt from customs, requires secure packaging, and barges move significantly slower than air freight.",
        optionFeedback: [
          "Correct. Shifting freight from road to rail or barge dramatically reduces energy intensity and carbon emissions per tonne-kilometre.",
          "Incorrect. All freight modes remain subject to national customs, border controls, and safety regulations.",
          "Incorrect. Rail cargo requires rigorous load blocking, bracing, and pallet securement to withstand dynamic shunting forces.",
          "Incorrect. Water barge transport is the slowest freight mode and cannot match the speed of air freight."
        ]
      },
      {
        order: 2,
        question: "Under the Global Logistics Emissions Council (GLEC) Framework, what is the standard formula for calculating freight transportation greenhouse gas emissions?",
        options: [
          "Total Freight Emissions = Vehicle Color Index × Driver Age × Number of Wheels.",
          "Total Freight Emissions = Cargo Weight (tonnes) × Transport Distance (km) × Mode-Specific Emission Factor (gCO2e/tkm) + Transshipment Hub Emissions.",
          "Total Freight Emissions = Total Cargo Value ($) / Local Temperature (°C).",
          "Total Freight Emissions = Total Fuel Tank Capacity (liters) × 100% without distance tracking."
        ],
        correct: 1,
        correctExplanation: "The GLEC Framework calculates freight carbon as tonne-kilometres multiplied by verified mode/vehicle-specific emission factors, plus hub transshipment emissions.",
        incorrectExplanation: "Vehicle color, driver age, cargo dollar value, and fuel tank size are irrelevant or flawed metrics for freight emission calculation.",
        optionFeedback: [
          "Incorrect. Vehicle color and driver age have zero relation to freight carbon emissions.",
          "Correct. The GLEC standard multiplies cargo mass (tonnes) by distance (km) and specific emission factors (gCO2e/tkm) plus hub operations.",
          "Incorrect. Cargo monetary value does not correlate with physical freight mass or transport carbon.",
          "Incorrect. Fuel tank capacity without distance or fuel consumption data cannot calculate trip emissions."
        ]
      },
      {
        order: 3,
        question: "A logistics fleet manager seeks to optimize 'Load Factor' (utilization rate) across a network of long-haul trailers. Why does increasing payload volume and weight utilization directly reduce freight carbon intensity?",
        options: [
          "Higher load factors allow trucks to exceed legal highway speed limits without penalty.",
          "Full trucks automatically run on hydrogen fuel without engine modifications.",
          "Maximizing cubic and weight capacity reduces the total number of vehicle trips required to move the same aggregate cargo volume, thereby minimizing fuel consumption and emissions per transported unit.",
          "Overloading trucks eliminates all tire rolling resistance and aerodynamic drag."
        ],
        correct: 2,
        correctExplanation: "High payload utilization spreads vehicle operating energy over more units of cargo, reducing the number of total trips and cutting emissions per delivered unit.",
        incorrectExplanation: "Load factors do not grant speed exemptions, do not convert fuel types, and overloading increases rolling resistance and damages highways.",
        optionFeedback: [
          "Incorrect. Vehicle weight has no bearing on legal highway speed limits.",
          "Incorrect. Payload utilization does not alter engine fuel injection systems.",
          "Correct. Higher vehicle fill rates reduce total required truck trips, dramatically lowering fuel consumption and emissions per transported item.",
          "Incorrect. Overloading increases tire rolling resistance, causes tire blowouts, and damages road pavement."
        ]
      },
      {
        order: 4,
        question: "What aerodynamic and mechanical equipment retrofit yields measurable fuel and emission savings on long-haul class-8 heavy-duty trucks operating at highway speeds?",
        options: [
          "Installing oversized roof-mounted loudspeakers and decorative chrome exhaust stacks.",
          "Removing all vehicle rear-view mirrors and replacing headlights with candles.",
          "Disconnecting electronic transmission speed governors and operating in the lowest possible gear.",
          "Installing trailer side skirts, tail fairings (boat tails), low-rolling-resistance (LRR) tires, and automated tire inflation systems (ATIS)."
        ],
        correct: 3,
        correctExplanation: "Trailer skirts, boat tails, and LRR tires reduce aerodynamic drag and rolling resistance, cutting highway fuel consumption by 5%–12%.",
        incorrectExplanation: "Chrome stacks add aerodynamic drag, removing safety mirrors is dangerous, and disabling speed governors multiplies fuel waste.",
        optionFeedback: [
          "Incorrect. Decorative chrome accessories increase vehicle weight and aerodynamic turbulence.",
          "Incorrect. Removing essential safety mirrors and lighting violates commercial vehicle safety statutes.",
          "Incorrect. Operating in low gear at high speed severely spikes engine RPM and fuel burn.",
          "Correct. Aerodynamic trailer side skirts, boat tails, LRR tires, and automatic tire inflation deliver proven fuel and emissions reductions."
        ]
      },
      {
        order: 5,
        question: "How does 'Intermodal Freight Transport' combine multiple modes (e.g., road, rail, sea) without handling the freight itself when changing modes?",
        options: [
          "By using standardized ISO intermodal shipping containers or swap bodies that transfer seamlessly between trucks, rail flatcars, and container vessels via gantry cranes.",
          "By unpacking every individual cardboard box manually by hand at every railway station.",
          "By pouring loose bulk goods directly onto the highway and sweeping them into trains.",
          "By attaching wings to commercial semi-trailers to allow temporary air travel over rivers."
        ],
        correct: 0,
        correctExplanation: "Intermodal freight relies on standardized ISO containers that transfer between ship, rail, and truck without unpacking cargo, maximizing speed and efficiency.",
        incorrectExplanation: "Manual unpack/repack is slow and costly, dumping bulk goods on highways is absurd, and flying semi-trailers do not exist.",
        optionFeedback: [
          "Correct. Standardized ISO containers and swap bodies transfer across rail, ship, and road via cranes without touching the enclosed cargo.",
          "Incorrect. Manual unloading at transshipment points is break-bulk cargo handling, not intermodal containerization.",
          "Incorrect. Dumping goods on highways causes total cargo loss and severe road hazards.",
          "Incorrect. Semi-trailers cannot fly; river crossings utilize bridges, ferries, or rail tunnels."
        ]
      },
      {
        order: 6,
        question: "When a freight forwarder optimizes supply chain routes using dynamic freight consolidation and cross-docking, what is the primary operational mechanism that cuts emissions?",
        options: [
          "Storing inventory in unheated open fields for 12 months before dispatch.",
          "Sorting and consolidating less-than-truckload (LTL) shipments from multiple suppliers into full-truckload (FTL) line-haul movements, drastically reducing empty backhauls and redundant vehicle kilometres.",
          "Splitting full truckloads into 50 separate passenger cars for delivery.",
          "Operating trucks only during heavy rush-hour traffic jams in city centers."
        ],
        correct: 1,
        correctExplanation: "Cross-docking consolidates multiple LTL freight flows into full truckloads, eliminating empty miles, reducing fleet trips, and streamlining transport.",
        incorrectExplanation: "Outdoor inventory storage damages goods, passenger car splitting multiplies emissions, and driving in rush-hour traffic maximizes fuel waste.",
        optionFeedback: [
          "Incorrect. Unprotected open storage damages cargo and creates supply chain paralysis.",
          "Correct. Cross-docking consolidates LTL freight into full truckloads, eliminating empty backhauls and reducing total vehicle miles.",
          "Incorrect. Disaggregating freight into passenger cars multiplies vehicle trips, traffic congestion, and emissions.",
          "Incorrect. Operating in heavy traffic jams maximizes vehicle idling and diesel emissions."
        ]
      },
      {
        order: 7,
        question: "A heavy logistics fleet is evaluating low-carbon drop-in alternative fuels for its existing long-haul diesel truck fleet. Which fuel provides immediate lifecycle greenhouse gas reductions without requiring engine or fueling infrastructure replacements?",
        options: [
          "Untreated crude petroleum oil pumped directly from drilling wells.",
          "Coal-tar liquid slurry mixed with commercial tap water.",
          "Hydrotreated Vegetable Oil (HVO / Renewable Diesel meeting EN 15940), which delivers up to 80%–90% lifecycle GHG reductions and is chemically compatible with standard diesel engines.",
          "Pure high-proof ethanol which causes severe engine knock and fuel system corrosion in diesel injection systems."
        ],
        correct: 2,
        correctExplanation: "HVO (hydrotreated vegetable oil) is a drop-in paraffinic diesel fuel meeting EN 15940 that cuts lifecycle emissions by up to 90% with zero modifications to existing diesel engines or fuel tanks.",
        incorrectExplanation: "Crude oil destroys injectors, coal-tar slurry ruins pumps, and pure ethanol cannot combust properly in compression-ignition diesel engines.",
        optionFeedback: [
          "Incorrect. Raw unrefined crude oil will immediately clog fuel injectors and destroy diesel engines.",
          "Incorrect. Coal-tar slurry is a hazardous industrial waste, not an approved vehicle fuel.",
          "Correct. HVO (renewable diesel) is a direct drop-in replacement fuel that reduces lifecycle GHG emissions by up to 90% without engine modifications.",
          "Incorrect. Pure ethanol lacks lubricity and cetane rating for compression-ignition diesel engines, causing severe mechanical damage."
        ]
      },
      {
        order: 8,
        question: "What is the primary purpose of applying Telematics and IoT tracking devices to multimodal refrigerated containers (Reefers) during international cold chain cargo transit?",
        options: [
          "To play music to perishable agricultural cargo during ocean transport.",
          "To allow container crane operators to play video games during loading.",
          "To permanently lock container doors so they can never be opened at destination ports.",
          "To monitor real-time temperature, humidity, GPS location, and genset power consumption, preventing cargo spoilage, optimizing energy use, and rapidly detecting cooling system faults."
        ],
        correct: 3,
        correctExplanation: "IoT telematics on refrigerated containers provide continuous monitoring of temperature setpoints, power consumption, and equipment diagnostics, preventing food loss and unnecessary cooling energy.",
        incorrectExplanation: "IoT telematics monitor critical temperature and energy parameters, not music playback, crane games, or permanent door lockouts.",
        optionFeedback: [
          "Incorrect. Perishable produce does not benefit from audio playback.",
          "Incorrect. Telematics are industrial IoT monitoring systems, not gaming devices.",
          "Incorrect. Containers must be opened for customs inspection and customer unloading.",
          "Correct. IoT telematics track temperature, humidity, and power draw, preventing cargo spoilage and optimizing refrigeration energy efficiency."
        ]
      }
    ]
  },

  // 11. ELH-82 (ID: 779) - Maritime Port & Shipping Sustainability Practices (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 779,
    courseCode: "ELH-82",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "What is 'Cold Ironing' (Onshore Power Supply - OPS) in sustainable seaport operations, and what is its primary environmental benefit?",
        options: [
          "Connecting berthed maritime vessels to the shoreside municipal electrical grid, allowing ships to shut down auxiliary diesel generators and eliminate local air pollutant emissions (NOx, SOx, PM) and noise in port.",
          "Freezing cargo containers with liquid nitrogen before loading onto container ships.",
          "Applying heavy coats of ice-repellent paint to the ship's exterior steel hull.",
          "Cooling maritime crane operator cabins using uninsulated dry ice blocks."
        ],
        correct: 0,
        correctExplanation: "Cold ironing plugs berthed vessels into shoreside electricity, eliminating auxiliary engine exhaust (SOx, NOx, particulate matter) and noise in coastal port communities.",
        incorrectExplanation: "Cold ironing refers to shoreside electrical connection, not freezing containers, ice-repellent paint, or dry ice in crane cabs.",
        optionFeedback: [
          "Correct. Cold ironing (Onshore Power Supply) powers berthed vessels from the shore grid, eliminating auxiliary diesel emissions in port cities.",
          "Incorrect. Freezing containers with liquid nitrogen is not cold ironing.",
          "Incorrect. Hull paint coatings are anti-fouling or hydrodynamic coatings, not cold ironing.",
          "Incorrect. Dry ice crane cooling is an unsafe practice unrelated to maritime port electrification."
        ]
      },
      {
        order: 2,
        question: "Under the International Maritime Organization (IMO) MARPOL Annex VI regulations, what is the mandatory global sulfur cap for marine fuel oil used on ships operating outside designated Emission Control Areas (ECAs)?",
        options: [
          "Exactly 15.0% m/m (mass by mass) sulfur content.",
          "A maximum of 0.50% m/m sulfur content (and 0.10% m/m within designated Sulfur Emission Control Areas - SECAs), requiring low-sulfur fuel oils (VLSFO) or exhaust gas cleaning systems (scrubbers).",
          "50.0% sulfur content for all commercial cargo vessels.",
          "There is no legal restriction on marine sulfur emissions anywhere in international waters."
        ],
        correct: 1,
        correctExplanation: "The IMO 2020 global sulfur limit is 0.50% m/m (0.10% in ECAs), achieved through Very Low Sulfur Fuel Oil (VLSFO), LNG, or approved exhaust scrubbers.",
        incorrectExplanation: "High sulfur contents of 15%–50% are illegal, and international marine sulfur emissions are strictly regulated under MARPOL Annex VI.",
        optionFeedback: [
          "Incorrect. 15% sulfur is an illegal high-polluting concentration.",
          "Correct. IMO MARPOL Annex VI mandates a global 0.50% sulfur limit (0.10% in ECAs) to reduce sulfur oxide (SOx) air pollution.",
          "Incorrect. 50% sulfur fuel is completely prohibited under international maritime law.",
          "Incorrect. MARPOL Annex VI is a legally binding international treaty regulating marine air emissions globally."
        ]
      },
      {
        order: 3,
        question: "What does the IMO Carbon Intensity Indicator (CII) measure for commercial vessels over 5,000 gross tonnage, and how is operational performance graded?",
        options: [
          "It measures the amount of plastic cutlery used by the ship's navigation crew.",
          "It measures the total speed of the ship during extreme hurricane weather conditions.",
          "It measures the vessel's operational carbon intensity per capacity and nautical mile (gCO2/dwt-nm), assigning an annual operational energy efficiency rating from A (major superior) to E (inferior).",
          "It calculates the weight of the anchor compared to the rudder surface area."
        ],
        correct: 2,
        correctExplanation: "CII measures the annual operational carbon intensity of ships per deadweight-tonne nautical mile, rating vessels from A to E, requiring corrective plans for D and E ratings.",
        incorrectExplanation: "CII is an operational greenhouse gas efficiency metric, not crew cutlery tracking, hurricane speed measurement, or anchor-to-rudder ratios.",
        optionFeedback: [
          "Incorrect. CII measures operational fuel and carbon efficiency, not onboard galley cutlery.",
          "Incorrect. Storm navigation speed is an operational safety issue, not the annual CII rating.",
          "Correct. The IMO CII measures operational grams of CO2 per deadweight-tonne nautical mile, grading vessels annually from A through E.",
          "Incorrect. Anchor and rudder dimensions are structural design specifications, not operational carbon intensity metrics."
        ]
      },
      {
        order: 4,
        question: "What maritime sustainability practice involves reducing vessel cruising speed by 10% to 20% on ocean transit routes to achieve non-linear fuel and emissions reductions?",
        options: [
          "High-Speed Sprinting.",
          "Continuous Deadweight Ballasting.",
          "Anchor Dragging.",
          "Slow Steaming (operating marine propulsion engines at optimized, reduced RPM to exploit the cubic power-to-speed hydrodynamic relationship)."
        ],
        correct: 3,
        correctExplanation: "Because propulsion power varies with roughly the cube of speed, 'Slow Steaming' (reducing speed by 10%–20%) cuts fuel consumption and emissions by up to 20%–40%.",
        incorrectExplanation: "High-speed sprinting increases fuel consumption exponentially, ballasting manages stability, and dragging anchors is an emergency maneuver that damages equipment.",
        optionFeedback: [
          "Incorrect. High-speed sailing exponentially increases fuel burn due to hydrodynamic drag.",
          "Incorrect. Ballasting manages vessel stability, not speed-related fuel optimization.",
          "Incorrect. Dragging an anchor damages the seabed and destroys maritime propulsion gear.",
          "Correct. Slow steaming leverages the cubic power-to-speed law, significantly cutting fuel consumption and emissions with minor transit time adjustments."
        ]
      },
      {
        order: 5,
        question: "Why is managing vessel hull 'Biofouling' (accumulation of barnacles, algae, and marine organisms) critical for maritime energy efficiency and decarbonization?",
        options: [
          "Severe hull fouling creates significant hydrodynamic frictional drag, forcing marine engines to consume up to 20%–30% more fuel to maintain speed, while posing severe invasive aquatic species biosecurity risks.",
          "Marine organisms on ship hulls convert steel plates into pure gold over time.",
          "Barnacles on the hull cause ship compasses to reverse magnetic orientation.",
          "Biofouling makes ships float too high above the water surface to load containers."
        ],
        correct: 0,
        correctExplanation: "Biofouling increases hydrodynamic surface roughness and frictional resistance, drastically increasing fuel burn and greenhouse gas emissions while transporting invasive marine species.",
        incorrectExplanation: "Biofouling does not create gold, does not alter magnetic compasses, and does not alter empty ship buoyancy levels.",
        optionFeedback: [
          "Correct. Hull biofouling increases hydrodynamic drag, increasing fuel consumption by up to 30% and spreading invasive aquatic species.",
          "Incorrect. Marine fouling organisms cause bio-corrosion of steel plates, not alchemical transformation.",
          "Incorrect. Barnacles are biological calcium-carbonate shells that do not produce magnetic fields.",
          "Incorrect. Biofouling adds microscopic weight, not excessive buoyancy."
        ]
      },
      {
        order: 6,
        question: "Under the IMO Ballast Water Management Convention (BWMC), why must ships treat or exchange ballast water prior to discharge in coastal port waters?",
        options: [
          "To ensure port water is warm enough for recreational swimming.",
          "To prevent the global transfer, introduction, and proliferation of harmful aquatic invasive species, pathogens, and toxic organisms between different marine ecosystems.",
          "To make ballast water drinkable for port cargo terminal staff.",
          "To extract dissolved sea salt for commercial grocery distribution."
        ],
        correct: 1,
        correctExplanation: "Ballast water treatment systems (BWTS) neutralize invasive species, microscopic algae, and pathogens in ballast water to prevent ecological destruction in recipient port waters.",
        incorrectExplanation: "Ballast water treatment is an ecological biosecurity measure, not port pool heating, potable drinking water production, or grocery salt harvesting.",
        optionFeedback: [
          "Incorrect. Ballast water treatment does not heat harbor waters for swimming.",
          "Correct. The BWMC convention requires ballast water treatment to stop the spread of destructive invasive aquatic species and pathogens.",
          "Incorrect. Treated ballast water is non-potable and not intended for human consumption.",
          "Incorrect. Seaport terminals do not harvest grocery salt from vessel ballast tanks."
        ]
      },
      {
        order: 7,
        question: "Which zero-to-low carbon marine alternative fuel provides a scalable pathway for deep-sea container shipping when produced via renewable electricity (e-fuels)?",
        options: [
          "Refined coal slurry mixed with automotive leaded gasoline.",
          "Pure pressurized gaseous acetylene which is highly unstable and explosive.",
          "Green Methanol (e-methanol) or Green Ammonia produced from green hydrogen and captured biogenic CO2/nitrogen, supported by dual-fuel marine engine designs.",
          "Untreated palm oil containing high fatty acids that solidify in fuel lines."
        ],
        correct: 2,
        correctExplanation: "E-methanol and green ammonia synthesized from renewable hydrogen offer scalable energy-dense maritime alternative fuels capable of powering large dual-fuel commercial vessels.",
        incorrectExplanation: "Coal slurry with leaded gasoline is highly polluting, gaseous acetylene is dangerously unstable, and raw palm oil solidifies and clogs marine engines.",
        optionFeedback: [
          "Incorrect. Leaded gasoline and coal slurry produce toxic emissions and are prohibited as marine bunker fuels.",
          "Incorrect. Gaseous acetylene is dangerously explosive and unsuited for maritime bulk fuel bunkering.",
          "Correct. Green methanol and green ammonia produced from renewable power provide viable, energy-dense deep-sea alternative marine fuels.",
          "Incorrect. Raw unrefined high-fatty-acid oils solidify at ambient ocean temperatures and ruin injection systems."
        ]
      },
      {
        order: 8,
        question: "In green port terminal design, which equipment electrification initiative eliminates direct tailpipe emissions from container handling operations?",
        options: [
          "Replacing electric container cranes with old coal-fired steam shovels.",
          "Operating all diesel yard tractors at high idling speed during driver shift changes.",
          "Using wood-burning stoves to generate electricity inside harbor master towers.",
          "Deploying Electric Automated Guided Vehicles (e-AGVs), battery-electric Rubber-Tired Gantry (e-RTG) cranes, and electrified rail-mounted gantry (RMG) container handlers."
        ],
        correct: 3,
        correctExplanation: "Electrifying yard equipment with e-AGVs, e-RTGs, and electrified RMG gantry cranes removes diesel combustion engines from port terminal container handling.",
        incorrectExplanation: "Steam shovels, continuous diesel tractor idling, and wood stoves create severe air pollution and defeat terminal decarbonization goals.",
        optionFeedback: [
          "Incorrect. Coal-fired steam shovels are obsolete and generate severe air and particulate pollution.",
          "Incorrect. Constant diesel idling multiplies terminal particulate matter and greenhouse gas emissions.",
          "Incorrect. Wood stoves are inefficient heating sources with zero applicability to port equipment electrification.",
          "Correct. Electrifying yard trucks (e-AGVs), rubber-tired cranes (e-RTGs), and rail gantries (RMGs) eliminates direct terminal tailpipe emissions."
        ]
      }
    ]
  },

  // 12. ELH-83 (ID: 717) - Eco-Driving & Fleet Fuel Efficiency (Keys: 0, 1, 2, 3, 0, 1, 2, 3 -> 2/2/2/2)
  {
    courseId: 717,
    courseCode: "ELH-83",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "In commercial fleet operations, what is the single most effective driving technique for reducing vehicle fuel consumption and tailpipe carbon emissions?",
        options: [
          "Smooth, progressive acceleration, maintaining steady cruising speeds, utilizing engine momentum, and anticipating traffic flow to minimize aggressive hard braking and rapid acceleration cycles.",
          "Flooring the accelerator pedal aggressively up to the rev limiter in every gear to reach cruising speed faster.",
          "Pumping the brake pedal continuously while driving at highway speeds.",
          "Weaving between traffic lanes rapidly to maintain maximum forward velocity."
        ],
        correct: 0,
        correctExplanation: "Anticipatory smooth driving, steady speeds, and minimizing aggressive acceleration/braking cycles cut commercial fleet fuel consumption by 10%–20%.",
        incorrectExplanation: "Revving to the redline, continuous braking, and aggressive lane weaving spike fuel consumption, tire wear, and collision risks.",
        optionFeedback: [
          "Correct. Smooth acceleration, predictive driving, and maintaining momentum eliminate wasteful fuel spikes from aggressive braking and acceleration.",
          "Incorrect. Full-throttle acceleration to the rev limiter burns extreme quantities of uncombusted fuel.",
          "Incorrect. Continuous braking converts kinetic energy into wasted brake pad friction heat.",
          "Incorrect. Aggressive lane weaving creates dangerous traffic turbulence and increases fuel consumption."
        ]
      },
      {
        order: 2,
        question: "How does vehicle engine idling during curbside deliveries, staging, or rest breaks affect commercial fleet fuel efficiency and operational costs?",
        options: [
          "Idling cleans the vehicle exhaust system and increases fuel economy by 25%.",
          "Extended idling burns approximately 1.5 to 3.5 liters of fuel per hour with zero distance traveled, increases engine wear and maintenance costs, and generates unnecessary localized emissions.",
          "Engine idling cools down the cabin faster than running dedicated air conditioning units.",
          "Idling is legally required by all international road transport treaties in urban zones."
        ],
        correct: 1,
        correctExplanation: "Unnecessary idling wastes 1.5–3.5 L/hr of diesel, accelerates engine soot buildup and oil degradation, and generates localized air pollutants without moving the vehicle.",
        incorrectExplanation: "Idling does not clean exhausts, does not improve fuel economy, and is frequently restricted or banned under urban anti-idling laws.",
        optionFeedback: [
          "Incorrect. Idling causes carbon and soot buildup in engines and exhaust filters, worsening fuel economy.",
          "Correct. Idling consumes 1.5 to 3.5 liters of fuel per hour with zero mileage, increasing fuel expense, engine wear, and emissions.",
          "Incorrect. Idling without driving load causes poor compressor performance and wastes fuel.",
          "Incorrect. Most urban jurisdictions enforce strict anti-idling bylaws that penalize unnecessary stationary vehicle idling."
        ]
      },
      {
        order: 3,
        question: "Why is maintaining correct manufacturer-specified Tire Pressure (PSI) essential for heavy vehicle fleet fuel efficiency and road safety?",
        options: [
          "Over-inflated tires make commercial trucks immune to tire punctures from sharp metal debris.",
          "Deflated tires increase vehicle fuel economy by creating a smoother ride on highways.",
          "Under-inflated tires significantly increase rolling resistance, causing higher fuel consumption (approx. 1% fuel penalty per 10 PSI under-inflation), excessive tread wear, and severe blowout risks.",
          "Tire pressure has zero correlation with rolling resistance or vehicle energy use."
        ],
        correct: 2,
        correctExplanation: "Under-inflation increases tire contact patch deformation and rolling resistance, wasting fuel and generating excessive heat that leads to dangerous tire blowouts.",
        incorrectExplanation: "Over-inflation does not prevent punctures, under-inflation worsens fuel economy, and tire pressure is one of the most critical factors in rolling resistance.",
        optionFeedback: [
          "Incorrect. Over-inflation reduces tire grip, causes harsh ride quality, and accelerates center tread wear.",
          "Incorrect. Deflated tires dramatically increase rolling resistance and drag, severely worsening fuel economy.",
          "Correct. Proper tire pressure minimizes rolling resistance, prevents premature tire wear, improves braking distance, and saves fuel.",
          "Incorrect. Tire pressure directly governs rolling resistance, which accounts for up to 30% of heavy truck fuel consumption."
        ]
      },
      {
        order: 4,
        question: "When driving heavy commercial diesel vehicles equipped with manual or automated manual transmissions (AMT), what gear selection practice optimizes thermal and fuel efficiency?",
        options: [
          "Driving permanently in first gear at maximum engine RPM on highway sections.",
          "Shifting into neutral and coasting downhill with the engine turned off.",
          "Redlining the tachometer into the extreme warning zone before every gear shift.",
          "Shifting early and operating within the engine's optimal 'Green Band' (low RPM torque sweet spot, typically 1,100–1,500 RPM) while leveraging high gear ratios."
        ],
        correct: 3,
        correctExplanation: "Operating in the manufacturer's low-RPM 'Green Band' (high torque, low engine speed) delivers maximum mechanical efficiency and lowest brake-specific fuel consumption (BSFC).",
        incorrectExplanation: "Driving in first gear, freewheeling in neutral (which loses power steering and engine braking), or redlining engine RPM wastes vast fuel and compromises vehicle safety.",
        optionFeedback: [
          "Incorrect. First gear at highway speed will destroy the transmission and engine.",
          "Incorrect. Coasting in neutral downhill disables engine braking and risks loss of air brake pressure and steering control.",
          "Incorrect. Redlining the engine wastes fuel and causes severe valve and cylinder wear.",
          "Correct. Shifting early to keep the engine in its optimal torque 'Green Band' (1,100–1,500 RPM) achieves lowest fuel consumption and lowest emissions."
        ]
      },
      {
        order: 5,
        question: "In electric and hybrid commercial vehicle fleets, how should drivers optimize Regenerative Braking to maximize vehicle driving range?",
        options: [
          "Anticipating stops early, releasing the accelerator pedal progressively, and allowing the regenerative braking system to recapture vehicle kinetic energy back into the high-voltage traction battery.",
          "Slamming on the friction mechanical emergency handbrake at full speed at every stop sign.",
          "Disabling regenerative braking completely through dashboard override switches.",
          "Accelerating hard while simultaneously holding down the footbrake pedal."
        ],
        correct: 0,
        correctExplanation: "Anticipatory driving allows regenerative braking to convert vehicle kinetic energy back into stored electrical battery energy, extending driving range by up to 20%–30%.",
        incorrectExplanation: "Emergency handbraking causes skidding, disabling regeneration wastes energy as friction heat, and pressing accelerator and brake simultaneously destroys motors.",
        optionFeedback: [
          "Correct. Progressive deceleration enables the electric motor to act as a generator, capturing kinetic energy and recharging the battery.",
          "Incorrect. Handbraking locks rear wheels, causes dangerous skidding, and captures zero regenerative energy.",
          "Incorrect. Disabling regenerative braking forces the vehicle to rely on friction brakes, wasting all deceleration energy as heat.",
          "Incorrect. Pressing throttle and brake together causes extreme electrical and mechanical stress."
        ]
      },
      {
        order: 6,
        question: "How do modern telematics fleet management systems utilize Driver Scorecards to achieve sustained 10%–15% fuel reductions across commercial operations?",
        options: [
          "By publicly firing the lowest-scoring driver each week without providing coaching.",
          "By tracking real-time vehicle CAN-bus data on hard acceleration, harsh braking, excess idling, speeding, and RPM adherence, providing automated feedback and driver coaching.",
          "By monitoring only driver personal mobile phone text messages while off-duty.",
          "By guessing driver performance based on the color and cleanliness of the vehicle exterior."
        ],
        correct: 1,
        correctExplanation: "Telematics capture CAN-bus engine data on harsh events, idling, and speed, enabling targeted driver coaching, gamified incentives, and sustained fuel reductions.",
        incorrectExplanation: "Punitive firing destroys driver morale, personal off-duty monitoring is illegal, and exterior vehicle cleanliness does not reflect driver fuel efficiency.",
        optionFeedback: [
          "Incorrect. Punitive termination policies cause driver turnover; coaching and positive incentive programs deliver sustained fuel savings.",
          "Correct. Telematics scorecards analyze objective vehicle telemetry (idling, braking, speeding, RPM) to support constructive driver coaching.",
          "Incorrect. Off-duty personal mobile monitoring violates privacy laws and provides no vehicle driving data.",
          "Incorrect. Exterior truck cleanliness has no direct correlation with driver throttle and braking behavior."
        ]
      },
      {
        order: 7,
        question: "How does aerodynamic drag impact commercial vehicle fuel consumption at highway speeds (above 80 km/h), and how should drivers manage vehicle configuration?",
        options: [
          "Aerodynamic drag decreases to zero as vehicle speed exceeds 80 km/h.",
          "Aerodynamic drag only affects aircraft, having zero impact on road commercial trucks.",
          "Aerodynamic drag increases exponentially with speed; drivers should ensure trailer roof tarpaulins are taut, cab roof deflectors are aligned with trailer height, and cab windows are kept closed at highway speeds.",
          "Drivers should drive with all side doors and windows wide open to let wind pass through the cab."
        ],
        correct: 2,
        correctExplanation: "At highway speeds, aerodynamic drag accounts for over 50% of engine power demand. Keeping deflectors aligned, tarpaulins taut, and windows closed minimizes drag.",
        incorrectExplanation: "Aerodynamic drag increases with the square of speed, impacts heavy trucks substantially, and opening windows/doors increases cabin turbulence and drag.",
        optionFeedback: [
          "Incorrect. Aerodynamic drag increases with the square of velocity; it increases substantially at higher speeds.",
          "Incorrect. Over 50% of total truck energy consumption at highway speeds is used to overcome aerodynamic air resistance.",
          "Correct. Properly aligned roof deflectors, taut curtain tarpaulins, and closed cab windows at high speeds significantly reduce aerodynamic drag and fuel burn.",
          "Incorrect. Open windows create air turbulence inside the cab, increasing drag and cabin noise."
        ]
      },
      {
        order: 8,
        question: "What is the most effective approach for planning delivery routes to minimize fuel consumption in urban multi-stop commercial distribution?",
        options: [
          "Letting individual drivers pick routes based on personal whim without route planning software.",
          "Visiting customer stops in alphabetical order by customer surname regardless of geographical location.",
          "Scheduling all deliveries to crisscross the city multiple times during peak morning traffic congestion.",
          "Utilizing GPS route optimization software that sequences deliveries by proximity, minimizes left turns against oncoming traffic, avoids peak congestion corridors, and consolidates multi-parcel drops."
        ],
        correct: 3,
        correctExplanation: "Route optimization software clusters stops, minimizes intersection idle delays (e.g., avoiding difficult turns across oncoming traffic), and circumvents rush-hour bottlenecks to reduce fleet mileage and fuel.",
        incorrectExplanation: "Unplanned routing, alphabetical sequencing, and crisscrossing congested traffic grids multiply vehicle mileage, idling delays, and fuel waste.",
        optionFeedback: [
          "Incorrect. Uncoordinated driver routing results in circuitous paths, backtracking, and excessive fuel waste.",
          "Incorrect. Alphabetical customer sequencing ignores physical geography, creating massive redundant mileage.",
          "Incorrect. Crisscrossing traffic grids during peak hours maximizes vehicle idling and diesel exhaust emissions.",
          "Correct. Algorithmic route planning sequences stops geographically, avoids congestion chokepoints, and minimizes traffic intersection delays."
        ]
      }
    ]
  }
];

export async function ensureCohort15_2_10GRemediation(): Promise<void> {
  try {
    const [existingSeed] = await db
      .select()
      .from(systemSeedsTable)
      .where(eq(systemSeedsTable.name, "sprint-15-2-10g-assessment-remediation"))
      .limit(1);

    if (existingSeed) {
      logger.info("Sprint 15.2.10G Controlled Assessment Quality Remediation already applied. Skipping runtime rewrite.");
      return;
    }

    const cohortCourses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.id, SPRINT_15_2_10G_COHORT_COURSE_IDS));

    if (cohortCourses.length !== 12) {
      logger.warn(
        { found: cohortCourses.length, expected: 12 },
        "Cohort 15.2.10G courses not fully present in DB yet. Skipping assessment remediation until seeded."
      );
      return;
    }

    await db.transaction(async (tx) => {
      for (const courseData of COHORT_15_2_10G_DATA) {
        const { courseId, courseCode, passingScore, questions } = courseData;

        // 1. Ensure passing score is 80 and version is at least 2
        const existingCourse = cohortCourses.find((c) => c.id === courseId);
        const newVersion = Math.max(2, existingCourse?.version ?? 2);

        await tx
          .update(coursesTable)
          .set({
            passingScore,
            version: newVersion,
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, courseId));

        // 2. Re-seed questions with complete optionFeedback, balanced 2/2/2/2 keys, and scenario depth
        await tx.delete(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, courseId));
        await tx.insert(quizQuestionsTable).values(
          questions.map((q) => ({
            courseId,
            question: q.question,
            options: q.options,
            correctOption: q.correct,
            orderIndex: q.order,
            correctExplanation: q.correctExplanation,
            incorrectExplanation: q.incorrectExplanation,
            optionFeedback: q.optionFeedback,
            competencyArea: q.competencyArea ?? null,
            sourceCourseId: q.sourceCourseId ?? null,
            isArchived: false,
          }))
        );

        logger.info({ courseId, courseCode, count: questions.length }, "Remediated course assessment with complete option-level feedback and scenarios.");
      }

      // Record seed version
      await tx
        .insert(systemSeedsTable)
        .values({
          name: "sprint-15-2-10g-assessment-remediation",
          version: 1,
        })
        .onConflictDoUpdate({
          target: systemSeedsTable.name,
          set: { version: 1, runAt: new Date() },
        });

      logger.info("Sprint 15.2.10G Controlled Assessment Quality Remediation transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute Sprint 15.2.10G assessment remediation");
    throw err;
  }
}
