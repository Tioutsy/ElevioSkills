import {
  db,
  coursesTable,
  quizQuestionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger.js";
import { SPRINT_15_2_10D_COHORT, SPRINT_15_2_10D_COHORT_COURSE_IDS } from "./courseAssessmentCohort15_2_10D.js";

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

export const COHORT_15_2_10D_DATA: CohortCourseRemediationData[] = [
  // 1. ELH-36 (ID: 808) - Sustainable Commercial Kitchens & Culinary (8 Questions)
  {
    courseId: 808,
    courseCode: "ELH-36",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Scenario (Equipment Staging & Idle Energy): An executive chef notices that line cooks turn on all gas ranges, salamanders, and fryers at 06:00, even though service starts at 11:30. What is the most effective operational protocol to reduce energy waste without impacting food prep?",
        options: [
          "Implement a phased equipment start-up schedule based on actual prep sequence and 15–20 minute manufacturer preheat times",
          "Leave equipment running continuously to avoid thermal shock to metal burners",
          "Disconnect the gas mains until 15 minutes before lunch service begins",
          "Eliminate all hot menu items and switch entirely to cold salads"
        ],
        correct: 0,
        correctExplanation: "Staged warm-up schedules aligned with manufacturer preheat specifications eliminate hours of idle kitchen energy while ensuring stations are ready on time.",
        incorrectExplanation: "Incorrect. 5.5 hours of idling is unnecessary and costly; abrupt gas disconnection creates safety hazards, and eliminating hot food harms guest offerings.",
        optionFeedback: [
          "Correct! A staged warm-up schedule aligned with preheat specifications eliminates idle cooking energy while ensuring stations are ready on time.",
          "Incorrect. Commercial cooking appliances do not require hours of idling to avoid thermal shock.",
          "Incorrect. Disconnecting main valves without controlled shutoff protocols introduces safety risks.",
          "Incorrect. Completely removing cooked items destroys core menu offerings rather than managing equipment efficiently."
        ]
      },
      {
        order: 2,
        question: "Technical Standard (Demand-Controlled Kitchen Ventilation): During a kitchen HVAC audit, the engineering team evaluates demand-controlled kitchen ventilation (DCKV). How does DCKV achieve primary energy savings?",
        options: [
          "By venting grease vapor directly into indoor dining areas when exhaust fans are idle",
          "By using temperature and optical sensors to modulate fan speeds to match real-time cooking loads",
          "By running exhaust fans at double speed only during overnight sanitation shifts",
          "By replacing commercial exhaust hoods with domestic ceiling exhaust fans"
        ],
        correct: 1,
        correctExplanation: "DCKV modulates hood exhaust and make-up air fans based on real-time heat and effluent sensors, reducing ventilation energy use by up to 50%.",
        incorrectExplanation: "Incorrect. DCKV maintains negative pressure and capture efficiency; it never discharges grease indoors, nor does it run at double speed overnight.",
        optionFeedback: [
          "Incorrect. DCKV maintains safe negative pressure and grease capture, never discharging into dining areas.",
          "Correct! Optical and thermal sensors modulate fan speed to match active cooking loads, slashing exhaust fan and conditioned make-up air energy.",
          "Incorrect. Running exhaust fans at double speed overnight increases energy waste.",
          "Incorrect. Domestic fans violate commercial fire safety and grease capture codes."
        ]
      },
      {
        order: 3,
        question: "Equipment Efficiency (Commercial Induction vs Gas): A resort kitchen upgrades its cookline from open gas burners to commercial induction cooktops. What is the primary thermodynamic and operational advantage?",
        options: [
          "Induction allows aluminum and copper pans to be used without magnetic bases",
          "Induction requires open flame pilots that warm the kitchen during cold mornings",
          "Induction transfers 85–90% of energy directly to magnetic cookware, drastically reducing ambient heat and kitchen cooling loads",
          "Induction eliminates the need for cookware washing"
        ],
        correct: 2,
        correctExplanation: "Commercial induction operates at 85–90% thermal efficiency compared to 35–40% for gas, significantly reducing fuel use and kitchen cooling loads.",
        incorrectExplanation: "Incorrect. Induction uses magnetic eddy currents with zero open flames, requires ferrous cookware, and maintains standard sanitation rules.",
        optionFeedback: [
          "Incorrect. Induction requires ferrous/magnetic cookware bases to generate eddy currents.",
          "Incorrect. Induction uses electromagnetic fields with zero open flames or pilot lights.",
          "Correct! Induction transfers 85–90% of energy directly to the pan, minimizing ambient heat load and reducing kitchen HVAC cooling demands.",
          "Incorrect. Cookware hygiene and sanitation requirements remain unchanged."
        ]
      },
      {
        order: 4,
        question: "Workplace Decision (Dishwashing Pre-Rinse Conservation): The stewarding team audits pre-rinse spray valves in the scullery. The current valve flows at 16 L/min. What is the best practice replacement?",
        options: [
          "Remove spray valves entirely and dump buckets of water on dish racks",
          "Connect hot water lines directly to garden hoses",
          "Drill extra holes in the spray face to widen water dispersion",
          "Install a certified low-flow pre-rinse spray valve delivering 4.5 to 5.5 L/min with high-velocity knife-spray pattern"
        ],
        correct: 3,
        correctExplanation: "High-efficiency pre-rinse valves (≤5.5 L/min) provide strong scraping force while reducing hot water and water heating energy by over 60%.",
        incorrectExplanation: "Incorrect. Bucket dumping is inefficient; drilling holes lowers velocity; garden hoses violate plumbing and sanitation codes.",
        optionFeedback: [
          "Incorrect. Bucket dumping is inefficient and risks cross-contamination.",
          "Incorrect. Garden hoses are not food-grade and violate commercial plumbing and sanitation standards.",
          "Incorrect. Drilling holes increases flow rate and drops spray velocity, degrading cleaning effectiveness.",
          "Correct! High-efficiency pre-rinse valves (≤5.5 L/min) provide strong scraping force while reducing hot water and water heating energy by over 60%."
        ]
      },
      {
        order: 5,
        question: "Workplace Scenario (Refrigeration Gaskets & Maintenance): A pastry chef reports that a walk-in freezer door seal is torn, and frost has accumulated heavily around the evaporator coils. What is the immediate risk and required action?",
        options: [
          "Frost buildup improves insulation; leave the door unsealed to increase cold air circulation",
          "Warm ambient air infiltration causes compressor overload and thermal fluctuation; repair the gasket and run a defrost cycle",
          "Turn off the freezer for 48 hours while keeping frozen seafood inside",
          "Set the thermostat 10°C colder to compensate for the air leak without fixing the seal"
        ],
        correct: 1,
        correctExplanation: "Refrigeration door gaskets prevent warm moist air infiltration that causes coil icing, compressor strain, and excessive energy consumption.",
        incorrectExplanation: "Incorrect. Frost insulates coils and chokes heat transfer; lowering setpoints worsens icing without resolving air leaks.",
        optionFeedback: [
          "Incorrect. Frost on evaporator coils insulates heat transfer surfaces, choking refrigeration efficiency.",
          "Correct! Compromised gaskets cause warm moist air infiltration, ice buildup on coils, compressor cycling strain, and food safety risks.",
          "Incorrect. Storing perishables in an unpowered unit breaches food safety regulations.",
          "Incorrect. Lowering the setpoint accelerates icing and compressor failure without resolving infiltration."
        ]
      },
      {
        order: 6,
        question: "Culinary Workflow (Blast Chilling & Food Safety): What is the primary food safety and sustainability benefit of adopting cook-chill and blast-chilling workflows in high-volume banqueting?",
        options: [
          "It allows cooked poultry to sit at room temperature for 12 hours before chilling",
          "It eliminates the need to record temperature logs during hot holding",
          "It rapidly passes food through the 60°C to 10°C danger zone, extending shelf life, reducing spoilage, and enabling precise portion staging",
          "It converts organic food waste into edible seasonings"
        ],
        correct: 2,
        correctExplanation: "Blast chilling moves hot food through the microbial danger zone in under 90 minutes, maintaining food safety and allowing accurate banquet portion control.",
        incorrectExplanation: "Incorrect. Room temperature holding breaches food safety laws; blast chillers preserve wholesome food and require HACCP logging.",
        optionFeedback: [
          "Incorrect. Leaving poultry at room temperature violates critical HACCP controls.",
          "Incorrect. HACCP and food safety standards mandate rigorous temperature logging.",
          "Correct! Blast chilling rapidly lowers core food temperature through the microbial danger zone, preserving nutritional quality and reducing food waste.",
          "Incorrect. Blast chillers preserve wholesome food; they do not convert waste."
        ]
      },
      {
        order: 7,
        question: "Environmental Compliance (Grease Trap & Used Oil Management): Which practice represents compliant and environmentally sound commercial grease interceptor governance?",
        options: [
          "Flushing concentrated chemical solvents and boiling water into drains to dissolve grease into the municipal sewer",
          "Emptying grease traps only once every five years when drains back up",
          "Draining fryers directly into exterior stormwater retention ponds at closing time",
          "Skimming grease regularly into certified containers for biodiesel recycling and maintaining a professional waste collection manifest"
        ],
        correct: 3,
        correctExplanation: "Used cooking oil and grease trap interceptor waste must be mechanically captured and hauled by licensed recyclers for biofuel or specialized processing.",
        incorrectExplanation: "Incorrect. Chemical flushing creates sewer fatbergs; stormwater dumping is illegal; infrequent cleaning causes severe back-ups.",
        optionFeedback: [
          "Incorrect. Chemical solvents and boiling water merely liquefy grease temporarily, causing fatbergs down-pipe in public infrastructure.",
          "Incorrect. Infrequent cleaning causes severe blockages, odor, and environmental penalties.",
          "Incorrect. Discharging grease to stormwater is illegal and causes catastrophic aquatic pollution.",
          "Correct! Regular mechanical skimming and certified waste carrier collection for biodiesel recovery ensures compliance and prevents sewer clogging."
        ]
      },
      {
        order: 8,
        question: "Sustainable Sourcing (Local Seasonal Menus): When designing a sustainable culinary purchasing policy, why is seasonality and local agro-ecological sourcing prioritized over long-distance imports?",
        options: [
          "Local seasonal produce reduces air-freight carbon intensity, supports regional farmers, and delivers higher nutrient retention and freshness",
          "Imported produce is legally prohibited in all Indian Ocean commercial kitchens",
          "Out-of-season produce is always toxic to hotel guests",
          "Local purchasing eliminates all kitchen inventory tracking requirements"
        ],
        correct: 0,
        correctExplanation: "Locally sourced seasonal ingredients reduce freight emissions, minimize supply chain delays, and reinforce destination culinary identity.",
        incorrectExplanation: "Incorrect. Imports are not banned; out-of-season food is edible but carries high transport emissions; inventory tracking is always mandatory.",
        optionFeedback: [
          "Correct! Prioritizing seasonal local produce cuts Scope 3 transportation emissions, strengthens community economic resilience, and provides superior product quality.",
          "Incorrect. Importation is regulated but not universally prohibited.",
          "Incorrect. Out-of-season produce is edible but carries high transport footprints and cold-chain costs.",
          "Incorrect. Rigorous inventory and quality controls apply to all incoming ingredients."
        ]
      }
    ]
  },

  // 2. ELH-37 (ID: 809) - Hotel Food Waste Prevention & Composting (8 Questions)
  {
    courseId: 809,
    courseCode: "ELH-37",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Workplace Framework (Food Recovery Hierarchy): A resort sustainability manager conducts a baseline food waste audit. Which level represents the highest-priority operational intervention?",
        options: [
          "Source reduction through menu rationalization, demand forecasting, and trim minimization",
          "Sending edible buffet surplus directly to an off-site landfill",
          "Incinerating organic waste to generate electricity for the staff village",
          "Converting all buffet food into industrial animal feed regardless of quality"
        ],
        correct: 0,
        correctExplanation: "The Food Recovery Hierarchy identifies source reduction (prevention) as the most impactful level, followed by human rescue, animal feed, and composting.",
        incorrectExplanation: "Incorrect. Landfill and incineration are the lowest tiers; source reduction prevents waste before resources are consumed.",
        optionFeedback: [
          "Correct! Source reduction prevents food waste from occurring in the first place and delivers the greatest economic and environmental benefit.",
          "Incorrect. Landfill disposal is the least preferred option at the bottom of the hierarchy.",
          "Incorrect. Thermal recovery is near the bottom of the food waste hierarchy.",
          "Incorrect. Feeding animals is appropriate for non-edible scraps, but source reduction takes precedence."
        ]
      },
      {
        order: 2,
        question: "Operational Diagnostics (Three-Stream Waste Tracking): The stewarding department categorizes kitchen waste into prep waste, buffet overproduction, and plate waste. Why is this categorization critical for reduction?",
        options: [
          "It determines whether cooks or service staff should be financially penalized on their paychecks",
          "It isolates root causes—such as knife skills (prep), forecasting accuracy (overproduction), and portion sizing (plate waste)—for targeted corrective actions",
          "It allows the hotel to conceal plate waste figures from environmental auditors",
          "It proves that buffet guests are solely responsible for all organic waste"
        ],
        correct: 1,
        correctExplanation: "Tracking waste by stream enables specific operational fixes: culinary training for prep waste, demand forecasting for overproduction, and portion design for plate waste.",
        incorrectExplanation: "Incorrect. Food audits are educational and operational tools, not punitive wage deductions or methods to hide data.",
        optionFeedback: [
          "Incorrect. Food waste audits are continuous improvement tools, not punitive wage mechanisms.",
          "Correct! Distinguishing prep waste, overproduction, and plate waste allows culinary and service teams to implement specific operational remedies.",
          "Incorrect. Sustainability auditing requires transparent, unmanipulated waste metrics.",
          "Incorrect. Overproduction and prep waste originate in the kitchen before guests are involved."
        ]
      },
      {
        order: 3,
        question: "Workplace Scenario (Buffet Batch Production & Replenishment): A resort buffet experiences 40 kg of overproduction waste daily from hot holding pans. What service adjustment best mitigates this without lowering guest perception of abundance?",
        options: [
          "Fill 5 kg chafing pans to maximum capacity right up until closing time",
          "Stop serving all food 2 hours before the scheduled closing time",
          "Transition to smaller display vessels with live cooking stations and batch replenishment during the final 90 minutes of service",
          "Serve only cold pre-packaged airline meals on the buffet line"
        ],
        correct: 2,
        correctExplanation: "Batch cooking and smaller display vessels maintained with active replenishment preserve visual freshness while drastically cutting buffet overproduction.",
        incorrectExplanation: "Incorrect. Overfilling pans late in service leads to guaranteed waste; premature closing or pre-packaged meals harm guest satisfaction.",
        optionFeedback: [
          "Incorrect. Deep full pans late in service lead to guaranteed overproduction disposal.",
          "Incorrect. Abruptly ending service violates guest service commitments.",
          "Correct! Using smaller shallow pans and live à la minute replenishment maintains visual abundance while curbing end-of-service surplus.",
          "Incorrect. Pre-packaged airline meals degrade luxury resort dining standards."
        ]
      },
      {
        order: 4,
        question: "Technical Standard (Aerobic Composting C:N Ratio): When establishing an on-site aerated composting program for landscape and vegetable scraps, what is the critical carbon-to-nitrogen (C:N) ratio needed for optimal decomposition?",
        options: [
          "1:1 (equal weights of wet meat scraps and plastic wrap)",
          "1:50 (pure wet fish trimmings without any dry browns)",
          "500:1 (pure bleached cardboard with zero moisture or nitrogen)",
          "Approximately 25:1 to 30:1 (balancing brown carbon-rich matter like dry leaves with green nitrogen-rich vegetable scraps)"
        ],
        correct: 3,
        correctExplanation: "Aerobic composting requires a balanced C:N ratio (~25:1–30:1), adequate moisture (40–60%), and regular aeration to maintain thermophilic temperatures (55–65°C).",
        incorrectExplanation: "Incorrect. Equal ratio with plastics causes contamination; extreme carbon starves microbes; excess nitrogen causes putrid anaerobic odors.",
        optionFeedback: [
          "Incorrect. Equal ratio with plastics and meat causes severe odor, vector attraction, and contamination.",
          "Incorrect. Excessive nitrogen causes putrefaction and strong ammonia/hydrogen sulfide odors.",
          "Incorrect. Excessive carbon starves microbes of nitrogen, halting decomposition.",
          "Correct! A 25:1 to 30:1 C:N ratio maintains aerobic microbial activity, regulates moisture, and prevents anaerobic foul odors."
        ]
      },
      {
        order: 5,
        question: "Staff Engagement (Smart Waste Scale Huddles): A green team installs an automated food waste tracking scale in the main kitchen. What is the most effective way to engage culinary staff with this tool?",
        options: [
          "Install the system secretly and discipline cooks who generate any waste",
          "Involve sous chefs in daily 3-minute huddles reviewing waste trends, celebrating reductions, and adjusting batch prep recipes",
          "Disable the scale whenever VIP functions occur to maintain artificially low averages",
          "Require each cook to write an essay after discarding vegetable peelings"
        ],
        correct: 1,
        correctExplanation: "Behavioral change in kitchens relies on actionable daily feedback loops, positive reinforcement, and collaborative recipe adjustment.",
        incorrectExplanation: "Incorrect. Covert surveillance and punitive essays breed resentment; manipulating data during VIP events defeats audit integrity.",
        optionFeedback: [
          "Incorrect. Covert surveillance fosters hostility and sabotage.",
          "Correct! Transparent data sharing, peer recognition, and daily brief huddles empower culinary teams to co-design reduction strategies.",
          "Incorrect. Excluding events falsifies data and hides high-impact waste sources.",
          "Incorrect. Bureaucratic punitive tasks alienate kitchen staff and slow production."
        ]
      },
      {
        order: 6,
        question: "Compliance & Safety (Surplus Food Donation Protocols): Which operational constraint must be verified before donating surplus prepared banquet food to a charitable food bank?",
        options: [
          "Ensure food has remained un-refrigerated for at least 6 hours",
          "Ensure guests have already eaten partially from the platters",
          "Ensure the food has been stored under unbroken cold/hot chain conditions, logged according to food safety protocols, and transported in certified containers",
          "Ensure all packaging labels are removed so the hotel cannot be identified"
        ],
        correct: 2,
        correctExplanation: "Food donation programs mandate strict cold/hot chain adherence, allergen identification, and verification that donated items were never exposed to guest touch.",
        incorrectExplanation: "Incorrect. Half-eaten food or temperature-abused items violate food safety laws; batch labeling is essential for allergen tracking.",
        optionFeedback: [
          "Incorrect. Extended time in the danger zone renders food unsafe for human consumption.",
          "Incorrect. Plate waste or food served onto guest tables cannot be donated under food safety regulations.",
          "Correct! Food rescue partnerships require rigorous temperature tracking, unserved batch integrity, and traceable safety standards.",
          "Incorrect. Full batch traceability and allergen labeling protect vulnerable recipients."
        ]
      },
      {
        order: 7,
        question: "Workplace Scenario (Compost Odor & Vector Troubleshooting): During hot weather, an on-site compost pile begins producing strong foul odors and attracting flies. What is the primary operational diagnosis and corrective action?",
        options: [
          "The pile is too dry; add 500 liters of sugary syrup",
          "Immediately dump the entire compost pile into the nearest ocean lagoon",
          "Spray the entire compost pile with synthetic chemical insecticides and seal it in plastic",
          "The pile has become anaerobic due to excessive moisture and lack of aeration; turn the pile to introduce oxygen and blend in dry brown carbon materials"
        ],
        correct: 3,
        correctExplanation: "Foul odor in compost indicates anaerobic conditions caused by excess moisture or compaction; mechanical turning and dry carbon addition restore aerobic decomposition.",
        incorrectExplanation: "Incorrect. Adding syrup accelerates fermentation; chemical spraying destroys beneficial microbes; ocean dumping is illegal.",
        optionFeedback: [
          "Incorrect. Adding syrup worsens anaerobic fermentation and pest issues.",
          "Incorrect. Dumping waste into the ocean violates environmental legislation and causes marine damage.",
          "Incorrect. Chemical insecticides destroy beneficial composting organisms and contaminate organic soil amendments.",
          "Correct! Anaerobic conditions cause foul sulfurous odors; turning the pile and adding dry structured browns restores oxygen and aerobic activity."
        ]
      },
      {
        order: 8,
        question: "Menu Engineering (Plate Waste Diagnostics): How does conducting regular plate-waste audits in a hotel dining room directly inform menu engineering and portion control?",
        options: [
          "It shows which garnishes, side dishes, or heavy carbohydrate portions are consistently discarded, allowing chefs to right-size portions or offer optional sides",
          "It forces waitstaff to scrape guest plates in front of seated diners",
          "It requires the restaurant to double all dessert portions",
          "It provides legal grounds to charge guests extra cleanup fees if they leave rice on their plate"
        ],
        correct: 0,
        correctExplanation: "Plate waste audits reveal unconsumed sides and oversized standard portions, allowing culinary teams to recalibrate dish presentation and reduce waste.",
        incorrectExplanation: "Incorrect. Audits happen back-of-house; arbitrary portion doubling increases waste; punitive guest fees destroy hospitality reputation.",
        optionFeedback: [
          "Correct! Consistent plate waste patterns highlight unwanted garnishes or oversized starches, enabling targeted portion refinement without sacrificing guest satisfaction.",
          "Incorrect. Plate scraping occurs discreetly in the dishwashing scullery.",
          "Incorrect. Doubling portions would increase food waste.",
          "Incorrect. Punitive dining surcharges damage guest satisfaction and destination reputation."
        ]
      }
    ]
  },

  // 3. ELH-38 (ID: 724) - Hotel Laundry & Water Stewardship (8 Questions)
  {
    courseId: 724,
    courseCode: "ELH-38",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Technology Benchmark (Continuous Batch Tunnel Washers): A resort commercial laundry processes 2,500 kg of linen daily. What is the primary operational advantage of installing a continuous batch tunnel washer over traditional washer-extractors?",
        options: [
          "Tunnel washers consume 50–70% less water per kg through counter-current internal water recycling and continuous automated processing",
          "Tunnel washers require staff to manually lift and wring wet sheets between cycles",
          "Tunnel washers consume four times more fresh potable water per wash load",
          "Tunnel washers eliminate the need to use laundry detergents or wash chemicals"
        ],
        correct: 0,
        correctExplanation: "Tunnel washers with counter-flow technology recycle rinse water internally to earlier wash stages, achieving industry-leading water efficiency of 4–6 liters per kilogram.",
        incorrectExplanation: "Incorrect. Tunnel washers are automated; they drastically cut water use compared to standalone units, while still utilizing precise chemical dosing.",
        optionFeedback: [
          "Correct! Continuous batch tunnel washers use counter-current technology where rinse water cascades back to pre-wash modules, reducing consumption to 4–6 L/kg compared to 14–18 L/kg in conventional units.",
          "Incorrect. Continuous batch washers are fully automated with hydraulic or membrane press extraction.",
          "Incorrect. Tunnel washers dramatically decrease water use compared to standalone extractors.",
          "Incorrect. Detergents, alkalis, and neutralizing agents are still dosed precisely by automated injection."
        ]
      },
      {
        order: 2,
        question: "Workplace Scenario (Washer-Extractor Loading Optimization): During a laundry audit, the chief engineer finds washer-extractors run with half-loads during mid-afternoon shifts. What standard operating procedure (SOP) should be enforced?",
        options: [
          "Run half-loads on rapid cycles with double chemical doses to clean linens faster",
          "Establish minimum load weigh-in protocols to ensure machines operate at 85–90% rated capacity before cycle initiation",
          "Overfill machines to 150% capacity by stomping linen into the wash drum",
          "Switch all washing to cold garden hoses in the outdoor parking area"
        ],
        correct: 1,
        correctExplanation: "Underloaded washers waste water, energy, and chemicals per kilogram of linen; operating at 85–90% of rated capacity optimizes mechanical agitation and resource efficiency.",
        incorrectExplanation: "Incorrect. Half-loads with double chemicals damage linen; overfilling halts mechanical agitation; garden hose washing fails sanitation.",
        optionFeedback: [
          "Incorrect. Half-loads waste water and thermal energy while excess chemical dosing causes fabric damage.",
          "Correct! Weighing linen carts to achieve 85–90% optimal loading maximizes mechanical action and prevents water/energy waste per kg of processed linen.",
          "Incorrect. Overloading prevents mechanical agitation, resulting in unwashed linen and motor strain.",
          "Incorrect. Manual garden hose washing fails sanitation standards and wastes water."
        ]
      },
      {
        order: 3,
        question: "Process Innovation (Ozone Laundry Disinfection): A laundry manager evaluates aqueous ozone (O3) injection systems for cold-water washing. How does ozone technology reduce laundry environmental footprint?",
        options: [
          "Ozone eliminates the need to dry towels in tumble dryers",
          "Ozone turns all colored uniforms pure white permanently",
          "Ozone acts as a powerful oxidant at lower water temperatures, reducing thermal water heating energy and shortening rinse cycles while disinfecting linen",
          "Ozone replaces water completely with pressurized toxic gas"
        ],
        correct: 2,
        correctExplanation: "Aqueous ozone allows effective sanitization and soil breakdown in 20–30°C water, cutting boiler water-heating energy by up to 75% and reducing cycle rinse times.",
        incorrectExplanation: "Incorrect. Ozone does not strip dyes when properly controlled; linens still require standard drying, and ozone is dissolved in water.",
        optionFeedback: [
          "Incorrect. Linens still require standard tumble drying or ironer finishing.",
          "Incorrect. Ozone does not strip color when dosed according to standard wash formulas.",
          "Correct! Ozone enhances chemical efficacy in cold water, cuts boiler fuel consumption, reduces wash cycle times, and lowers linen fiber wear.",
          "Incorrect. Ozone is injected directly into water as a dissolved aqueous oxidant."
        ]
      },
      {
        order: 4,
        question: "Environmental Compliance (Effluent Treatment & Lint Control): A commercial laundry discharges wash wastewater into municipal or on-site treatment. What wastewater parameters are of greatest concern and what treatment is standard?",
        options: [
          "Excessive carbon dioxide gas bubbles that float into the sky",
          "Excessive salt that turns surface drains into edible sea salt",
          "Zero environmental concern because laundry detergents are identical to drinking water",
          "High alkalinity (pH 10–12), thermal load, surfactants, and lint; requiring lint screening, heat recovery, and pH neutralization before discharge"
        ],
        correct: 3,
        correctExplanation: "Commercial laundry wastewater requires lint filtration, wastewater heat recovery, and pH neutralization to prevent sewer network damage and environmental degradation.",
        incorrectExplanation: "Incorrect. Laundry effluent contains high pH, suspended microfibers, surfactants, and heat that must be treated before discharge.",
        optionFeedback: [
          "Incorrect. The primary risks are pH shock, thermal pollution, chemical oxygen demand (COD), and microfibers.",
          "Incorrect. Laundry wastewater contains surfactants and alkaline chemicals, not edible sea salt.",
          "Incorrect. Untreated laundry effluent harms aquatic ecosystems and violates environmental standards.",
          "Correct! Commercial laundry effluent contains high pH, suspended lint, microfibers, surfactants, and residual heat that must be screened, neutralized, and treated."
        ]
      },
      {
        order: 5,
        question: "Thermal Energy Recovery (Wastewater Heat Exchangers): What is the primary operational benefit of installing a wastewater heat exchanger in a commercial laundry?",
        options: [
          "It cools the laundry floor to allow ice skating",
          "It captures thermal energy from hot drain effluent to pre-heat incoming cold fresh wash water, lowering boiler fuel consumption",
          "It converts wastewater into high-pressure steam for guest room saunas",
          "It increases electricity consumption to heat the outdoor air"
        ],
        correct: 1,
        correctExplanation: "Effluent heat recovery exchangers transfer thermal energy from discarded warm wash water to incoming cold feed water, significantly reducing boiler load.",
        incorrectExplanation: "Incorrect. Heat exchangers are thermodynamic process devices; they do not cool floors or create high-pressure steam from low-grade drain heat.",
        optionFeedback: [
          "Incorrect. Wastewater heat recovery systems are closed thermodynamic exchangers for process water.",
          "Correct! Shell-and-tube or plate heat exchangers capture heat from outgoing 50–60°C wash water to preheat incoming supply, saving 20–40% on water heating fuel.",
          "Incorrect. Laundry wastewater heat is low-grade heat (40–60°C) unsuitable for direct steam generation.",
          "Incorrect. The system reduces boiler energy demand, lowering overall operating costs."
        ]
      },
      {
        order: 6,
        question: "Workplace Safety & Efficiency (Dryer Lint Duct Maintenance): An engineer inspects commercial gas-fired tumble dryers and discovers heavy lint accumulation in exhaust ducts. What are the immediate risks?",
        options: [
          "Linen will dry 50% faster due to trapped air pressure",
          "The dryers will produce fresh fruit scents in the laundry room",
          "Severe combustion fire hazard, increased drying cycle times, restricted airflow, and excessive gas consumption",
          "Electricity consumption drops to zero automatically"
        ],
        correct: 2,
        correctExplanation: "Routine cleaning of dryer lint screens and ductwork is vital for fire prevention, airflow velocity, and thermal energy efficiency.",
        incorrectExplanation: "Incorrect. Lint accumulation restricts airflow, prolonging drying times and presenting an extreme fire risk.",
        optionFeedback: [
          "Incorrect. Restricted airflow chokes moisture removal, significantly extending cycle durations.",
          "Incorrect. Lint accumulation produces acrid heat smells and fire risks.",
          "Correct! Clogged lint screens and exhaust ducts restrict airflow, extending drying cycle times, wasting fuel, and presenting a severe combustion fire hazard.",
          "Incorrect. Dryer motors and burners continue consuming energy during elongated cycles."
        ]
      },
      {
        order: 7,
        question: "Operational Control (Moisture-Sensing Auto-Termination): How does implementing moisture-sensing automatic termination controls on commercial laundry dryers prevent linen damage and energy waste?",
        options: [
          "It converts the dryer into an automated dry cleaning solvent bath",
          "It keeps the dryer running for 90 minutes after linen is dry to sanitize the drum",
          "It drenches the linen with cold water inside the dryer at the end of every cycle",
          "It stops the dryer automatically when residual moisture reaches 3–5%, preventing fabric over-drying, fiber degradation, and unnecessary gas consumption"
        ],
        correct: 3,
        correctExplanation: "Auto-dry moisture sensors prevent linen over-drying, preserving textile tensile strength and saving substantial thermal fuel.",
        incorrectExplanation: "Incorrect. Over-drying ruins cotton fibers and wastes gas; dryers do not inject cold water or solvent baths at the end of cycles.",
        optionFeedback: [
          "Incorrect. Tumble dryers utilize heated airflow, not chemical solvent immersion.",
          "Incorrect. Running dryers on empty or dry linen damages cotton fibers and wastes gas.",
          "Incorrect. Dryers evaporate moisture; they do not drench dry linen.",
          "Correct! Moisture sensors terminate cycles when target dryness is reached, eliminating over-drying which damages fibers and wastes 15–20% of dryer energy."
        ]
      },
      {
        order: 8,
        question: "Quality Assurance (Chemical Dosing Pump Calibration): A hotel green team audits the chemical dosing accuracy of the automatic laundry injection pump system. What is the most reliable verification method?",
        options: [
          "Conduct volumetric draw-down calibration tests on chemical tubes and test rinse water pH and titration levels on finished loads",
          "Estimate chemical use by smelling towels when they come out of the dryer",
          "Disconnect the chemical pump and pour bleach by eye directly into the drum",
          "Assume factory calibration remains 100% accurate indefinitely without periodic checks"
        ],
        correct: 0,
        correctExplanation: "Periodic pump tube draw-down calibration and wash titration verify that precise chemical concentrations are delivered, avoiding over-consumption and fabric damage.",
        incorrectExplanation: "Incorrect. Olfactory checks cannot measure chemical concentrations; manual pouring causes chemical burns; pump tubes wear over time.",
        optionFeedback: [
          "Correct! Volumetric tube calibration and titration of wash liquor ensure accurate chemical dosing, preventing under-cleaning or chemical residue on textiles.",
          "Incorrect. Olfactory checks cannot measure chemical concentrations or wash chemistry safety.",
          "Incorrect. Manual unmetered pouring damages textiles and creates chemical burn hazards.",
          "Incorrect. Peristaltic pump tubes wear over time and require routine quarterly calibration."
        ]
      }
    ]
  },

  // 4. ELH-39 (ID: 810) - Hotel Engineering: Central Plant & HVAC Optimization (8 Questions)
  {
    courseId: 810,
    courseCode: "ELH-39",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Thermodynamic Diagnostics (Low Delta-T Syndrome): A hotel chilled water plant has a design supply/return delta-T of 6.0°C (6.5°C to 12.5°C). During peak hours, return temperature drops to 8.5°C (delta-T = 2.0°C). What is this phenomenon and its consequence?",
        options: [
          "Low Delta-T Syndrome; it forces excessive chiller and pump staging to meet volumetric flow demand despite chillers operating below rated tonnage capacity",
          "Supercooling efficiency; chillers operate at double efficiency when delta-T approaches zero",
          "Thermal expansion benefit; water flows faster without requiring electrical pump energy",
          "Compressor lockout; the plant automatically generates free cooling without refrigerant"
        ],
        correct: 0,
        correctExplanation: "Low Delta-T Syndrome wastes substantial pump and chiller energy by demanding high volumetric water flow for low thermal heat absorption.",
        incorrectExplanation: "Incorrect. Low delta-T degrades chiller efficiency and forces unneeded equipment online; it is not a supercooling or free-cooling benefit.",
        optionFeedback: [
          "Correct! Low Delta-T Syndrome occurs when chilled water bypasses coils or control valves are stuck open, forcing extra chillers and pumps online prematurely.",
          "Incorrect. Low Delta-T degrades plant coefficient of performance (COP) and increases pumping energy.",
          "Incorrect. Lower delta-T requires higher pumping volume to transfer the same thermal cooling tonnage.",
          "Incorrect. Low delta-T is a mechanical/hydraulic inefficiency, not a free-cooling mechanism."
        ]
      },
      {
        order: 2,
        question: "Engineering Principles (VFD Affinity Laws): An engineering team installs Variable Frequency Drives (VFDs) on secondary chilled water distribution pumps. According to the Affinity Laws, what happens to pump power consumption when flow rate is reduced to 80%?",
        options: [
          "Power consumption remains at exactly 100%",
          "Power consumption drops to approximately 51% of full load power (proportional to the cube of speed)",
          "Power consumption increases to 180% due to electrical resistance in the drive",
          "The pump stops pumping water and begins generating diesel fuel"
        ],
        correct: 1,
        correctExplanation: "The Affinity Laws dictate that centrifugal pump and fan shaft power varies with the cube of rotational speed, making VFD modulation exceptionally energy efficient.",
        incorrectExplanation: "Incorrect. Constant-speed throttling keeps power high; VFD modulation slashes power cubically (0.8^3 = 0.512), saving ~49% energy.",
        optionFeedback: [
          "Incorrect. Constant-speed throttling maintains high power; VFD modulation slashes power quadratically and cubically.",
          "Correct! By the pump affinity laws, power varies with the cube of shaft speed (0.8^3 = 0.512), yielding nearly 50% energy savings at 80% flow.",
          "Incorrect. VFDs modulate voltage and frequency efficiently without increasing load.",
          "Incorrect. VFDs are electric motor drives, not fuel generators."
        ]
      },
      {
        order: 3,
        question: "Cooling Tower Operations (Approach Temperature & Scale): During cooling tower inspection, the technician observes heavy biological slime and scale on the fill, causing a 4°C approach temperature increase. What is the thermodynamic consequence?",
        options: [
          "The cooling tower fill acts as a natural heater that eliminates boiler requirements",
          "The chiller uses less electricity because warm water is easier to compress",
          "Condenser water enters chillers hotter, increasing compressor head pressure and elevating chiller electrical kW/ton draw by 10–15%",
          "The approach temperature increase prevents Legionella bacteria growth"
        ],
        correct: 2,
        correctExplanation: "Fouled cooling tower fill elevates condenser water temperature entering chillers; each 1°C rise in condenser water increases chiller compressor energy consumption by 2–3%.",
        incorrectExplanation: "Incorrect. Higher condensing temperature increases compressor lift and kWh draw; warm stagnant water promotes Legionella colonization.",
        optionFeedback: [
          "Incorrect. Cooling towers reject waste heat; they cannot replace heating boilers.",
          "Incorrect. Higher condensing temperatures increase compressor head pressure and electrical draw.",
          "Correct! Scaled and fouled cooling towers cannot reject heat efficiently, raising condensing temperatures and increasing chiller compressor power consumption by ~3% per °C.",
          "Incorrect. Biological slime and warm stagnant water promote dangerous Legionella colonization."
        ]
      },
      {
        order: 4,
        question: "Building Automation (Air-Side Enthalpy Economizer): What is the primary function of a Building Management System (BMS) enthalpy economizer cycle on an air handling unit (AHU)?",
        options: [
          "It injects perfume into the ductwork to mask stale air",
          "It warms indoor air using hot exhaust from guest showers",
          "It turns off all building fresh air ventilation permanently to preserve indoor cold air",
          "It uses cool, dry outdoor air for free cooling when outdoor air enthalpy is lower than return air enthalpy, reducing mechanical chiller operation"
        ],
        correct: 3,
        correctExplanation: "Air-side economizers modulate outdoor air dampers to supply direct cooling when outside air enthalpy is lower than return air, reducing chiller runtime.",
        incorrectExplanation: "Incorrect. Shower exhaust contains moisture; shutting off fresh air violates ventilation standards; economizers control airflow thermodynamics.",
        optionFeedback: [
          "Incorrect. Economizers control motorized dampers for thermodynamic cooling, not fragrance injection.",
          "Incorrect. Shower exhaust contains high humidity and contaminants unsuitable for economizer supply.",
          "Incorrect. ASHRAE standards require continuous minimum outdoor air ventilation for indoor air quality.",
          "Correct! Enthalpy economizers compare total heat content (temperature and humidity) of outdoor vs return air to introduce 'free cooling' when outdoor conditions are favorable."
        ]
      },
      {
        order: 5,
        question: "HVAC Commissioning (VAV Reheat & Simultaneous Conditioning): An engineer audits guest floor Variable Air Volume (VAV) boxes. What operational defect causes simultaneous heating and cooling energy waste?",
        options: [
          "VAV boxes modulating smoothly between minimum ventilation and maximum cooling setpoints",
          "VAV terminal boxes stuck at maximum airflow damper position while electric or hot-water reheat coils are active to prevent overcooling",
          "Air filters replaced on schedule every 30 days",
          "Duct static pressure sensor calibrated accurately to reset fan speed"
        ],
        correct: 1,
        correctExplanation: "Simultaneous heating and cooling occurs when failed damper actuators or poor control logic cause reheat coils to heat air while the supply box is discharging maximum chilled air.",
        incorrectExplanation: "Incorrect. Modulating between minimum and maximum flow is proper design; clean filters and calibrated sensors maintain efficiency.",
        optionFeedback: [
          "Incorrect. Modulating between minimum and maximum airflow is the correct intended operation of VAV systems.",
          "Correct! When dampers stick open at full cooling flow, reheat coils fire continuously to avoid freezing room occupants, wasting both cooling and heating energy simultaneously.",
          "Incorrect. Clean air filters maintain proper static pressure and airflow.",
          "Incorrect. Calibrated static pressure sensors ensure proper fan VFD tracking."
        ]
      },
      {
        order: 6,
        question: "Chiller Plant Control (Chilled Water Supply Temperature Reset): Why is chilled water supply temperature reset (e.g., raising supply temperature from 6.0°C to 8.0°C during mild weather) an effective chiller optimization strategy?",
        options: [
          "It prevents water from freezing inside the cooling tower basin",
          "It turns off all guest room air conditioning units permanently",
          "Each 1°C increase in chilled water supply temperature improves chiller compressor efficiency by approximately 2–3% while meeting lower cooling loads",
          "It converts centrifugal chillers into absorption chillers"
        ],
        correct: 2,
        correctExplanation: "Raising chilled water supply setpoints during part-load conditions reduces compressor lift (the difference between evaporating and condensing pressure), saving substantial kWh.",
        incorrectExplanation: "Incorrect. Supply reset modulates water temperatures smoothly; it does not shut down room cooling or alter the mechanical chiller type.",
        optionFeedback: [
          "Incorrect. Cooling tower basins hold condenser water, not chilled water.",
          "Incorrect. Resetting setpoints modulates water temperature according to ambient load without terminating room comfort.",
          "Correct! Elevating chilled water setpoints during low-load conditions reduces compressor lift, boosting chiller efficiency by 2–3% per °C rise.",
          "Incorrect. Setpoint reset adjusts refrigeration cycle pressures; it does not change the physical chiller type."
        ]
      },
      {
        order: 7,
        question: "Thermal Integration (Heat Recovery Chillers): A hotel produces chilled water for HVAC and domestic hot water for guest showers using boilers. What heat recovery technology directly links these two thermal streams?",
        options: [
          "Connecting the chiller drainage hose directly to guest bathtubs",
          "A diesel generator running continuously to burn off excess refrigerant",
          "A fan blowing condenser air onto guest laundry carts",
          "A desuperheater or dedicated heat recovery chiller capturing compressor discharge heat from the chiller condenser loop to preheat domestic hot water to 50–55°C"
        ],
        correct: 3,
        correctExplanation: "Heat recovery chillers capture rejected heat from the refrigeration cycle to produce domestic hot water, effectively providing free water heating while assisting cooling.",
        incorrectExplanation: "Incorrect. Heat recovery utilizes refrigeration thermodynamics, not auxiliary diesel burning; drain effluent is non-potable.",
        optionFeedback: [
          "Incorrect. Wastewater from drains is non-potable and cannot enter guest bathing systems.",
          "Incorrect. Heat recovery utilizes refrigeration thermodynamics, not auxiliary diesel burning.",
          "Incorrect. Water-cooled chillers reject heat to water loops, not direct air fans.",
          "Correct! Heat recovery chillers capture high-temperature refrigerant rejection heat, producing simultaneous chilled water for HVAC and preheated hot water for domestic use."
        ]
      },
      {
        order: 8,
        question: "Plant Room Safety & Standards (ASHRAE 15 Refrigerant Governance): An environmental safety auditor inspects the central chiller plant room. Which safety and compliance protocol is mandatory for ASHRAE 15 / ISO 5149 compliance?",
        options: [
          "Refrigerant leak detection sensors connected to automatic emergency mechanical purge ventilation and external alarm beacons",
          "Keeping all chiller plant room doors open to the main guest lobby at all times",
          "Discharging leaking refrigerant into the central vacuum cleaning system",
          "Storing open propane cylinders next to electrical switchgear panels"
        ],
        correct: 0,
        correctExplanation: "Machinery rooms housing refrigeration equipment must feature automated refrigerant vapor monitoring, emergency ventilation, and containment procedures to protect personnel from asphyxiation and toxic exposure.",
        incorrectExplanation: "Incorrect. Plant rooms must remain isolated; refrigerants must be recovered with certified gear; gas cylinders near electrical panels breach fire codes.",
        optionFeedback: [
          "Correct! Refrigerant safety standards mandate leak sensors, dedicated emergency mechanical extract ventilation, and external visual/audible alarms.",
          "Incorrect. Mechanical plant rooms must remain isolated with fire-rated self-closing doors.",
          "Incorrect. Refrigerant must be recovered with certified recovery units, never vented into vacuum systems.",
          "Incorrect. Storing flammable gas cylinders near electrical gear violates fire safety codes."
        ]
      }
    ]
  },

  // 5. ELH-40 (ID: 725) - Resort Guest Engagement & Green Nudges (8 Questions)
  {
    courseId: 725,
    courseCode: "ELH-40",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Behavioral Economics (Social Proof Normative Messaging): A resort wants to increase guest participation in its towel reuse program. Based on behavioral economics research, which in-room card message achieves the highest compliance?",
        options: [
          "'75% of guests who stayed in this room participated in our towel conservation program by reusing their towels at least once.'",
          "'Please save the planet by reusing your towel.'",
          "'You will be fined $10 if you request fresh towels every day.'",
          "'Towels are washed in dirty lake water to save electricity.'"
        ],
        correct: 0,
        correctExplanation: "Goldstein et al.'s behavioral research proves that specific normative social prompts ('most guests in this room reuse towels') increase reuse rates by over 25% compared to generic appeals.",
        incorrectExplanation: "Incorrect. Generic environmental pleas produce significantly lower compliance; punitive threats or false hygiene claims provoke severe guest backlash.",
        optionFeedback: [
          "Correct! Localized descriptive social norms (e.g., '75% of guests in this room reuse towels') leverage peer behavior to dramatically boost conservation compliance.",
          "Incorrect. Generic environmental pleas produce significantly lower compliance than normative cues.",
          "Incorrect. Punitive financial threats damage guest satisfaction and provoke backlash.",
          "Incorrect. Fabricating claims about dirty wash water violates brand trust and hygiene standards."
        ]
      },
      {
        order: 2,
        question: "Choice Architecture (Delboeuf Illusion & Buffet Plates): In a luxury breakfast buffet, a hotel experiences high plate waste. Which choice architecture nudge effectively reduces guest over-portioning without restricting buffet access?",
        options: [
          "Having security guards inspect guest plates as they leave the buffet line",
          "Replacing large 28 cm dinner plates with attractive 23 cm plates and providing small tasting ramekins for specialty dishes",
          "Closing the buffet after 15 minutes to limit eating time",
          "Posting graphic photographs of landfill sites above the pastry station"
        ],
        correct: 1,
        correctExplanation: "Reducing plate diameter from 28 cm to 23 cm subtly alters visual portion perception, reducing food waste by up to 20% without perceived reduction in abundance.",
        incorrectExplanation: "Incorrect. Aggressive surveillance, premature closing, or unappealing photos destroy luxury dining atmosphere without addressing behavioral root causes.",
        optionFeedback: [
          "Incorrect. Intrusive surveillance creates an unpleasant guest dining atmosphere.",
          "Correct! Downsizing plate diameter utilizes the Delboeuf visual illusion, naturally encouraging smaller initial servings and cutting plate waste by 15–20% while allowing unlimited return trips.",
          "Incorrect. Limiting service time causes panic-loading of plates and increases waste.",
          "Incorrect. Aggressive negative imagery ruins dining experiences and alienates guests."
        ]
      },
      {
        order: 3,
        question: "Frontline Communication (Authentic Green Messaging vs Greenwashing): A resort concierge is asked by guests about local marine excursions. How should frontline staff communicate sustainability commitments authentically without greenwashing?",
        options: [
          "Promise that the resort's private speedboat tour never produces any carbon emissions",
          "Tell guests that coral reefs are indestructible and do not require care",
          "Recommend eco-certified operators who adhere to strict wildlife distancing, reef anchor bans, and marine conservation briefings",
          "Discourage guests from ever going outside the hotel boundary"
        ],
        correct: 2,
        correctExplanation: "Authentic sustainability communication connects guests with verified, certified community and eco-tourism partners who practice responsible stewardship.",
        incorrectExplanation: "Incorrect. False zero-emission claims constitute greenwashing; corals are highly fragile; confining guests harms community engagement.",
        optionFeedback: [
          "Incorrect. Falsely claiming zero emissions for fossil-fuel boats is greenwashing.",
          "Incorrect. Coral reefs are fragile ecosystems highly vulnerable to physical and chemical damage.",
          "Correct! Recommending verified eco-certified excursion partners with transparent conservation guidelines ensures genuine guest education and ecological protection.",
          "Incorrect. Isolating guests prevents positive community and conservation engagement."
        ]
      },
      {
        order: 4,
        question: "Behavioral Default (Opt-In vs Opt-Out Housekeeping): What is the primary mechanism of a 'default opt-in' green nudge for hotel housekeeping service?",
        options: [
          "Setting room cleaning as a daily automated service while charging guests secretly for each visit",
          "Cancelling room cleaning entirely without informing arriving guests",
          "Locking guest room doors so housekeeping cannot enter",
          "Setting eco-stay (linen change every 3rd day, optional light daily tidy) as the standard default, allowing guests to request daily full change if desired"
        ],
        correct: 3,
        correctExplanation: "Default architecture leverages status quo bias: when sustainable service schedules are the preset default with simple opt-outs, adoption rates exceed 70%.",
        incorrectExplanation: "Incorrect. Hidden charges or locking doors violate consumer protection and hospitality standards; transparent defaults are key.",
        optionFeedback: [
          "Incorrect. Hidden charges violate consumer protection laws and trust.",
          "Incorrect. Withholding information breaks service standards and creates guest dissatisfaction.",
          "Incorrect. Locking rooms prevents necessary maintenance and guest access.",
          "Correct! Defaulting to a 3-day linen change schedule with an easy opt-out mechanism achieves high compliance because people tend to stay with default settings."
        ]
      },
      {
        order: 5,
        question: "Gamification & Impact (Pro-Social Milestone Rewards): A resort introduces interactive digital kiosks where guests track their villa energy and water conservation, earning points for local coral restoration donations. What motivational driver is this?",
        options: [
          "Compulsory taxation on international tourists",
          "Gamification with pro-social purpose, transforming conservation into an engaging, tangible contribution to destination ecology",
          "A covert method to spy on guest shower duration",
          "A marketing ploy that does not involve actual conservation"
        ],
        correct: 1,
        correctExplanation: "Gamification with tangible pro-social rewards connects daily guest choices to observable local environmental restoration.",
        incorrectExplanation: "Incorrect. Voluntary engagement is distinct from taxation; aggregated data respects privacy; funding verified coral planting prevents greenwashing.",
        optionFeedback: [
          "Incorrect. Voluntary engagement is distinct from mandatory taxation.",
          "Correct! Gamification combined with altruistic impact (e.g., resort funds coral planting for guest conservation milestones) drives intrinsic guest participation.",
          "Incorrect. Aggregated anonymous tracking respects guest privacy.",
          "Incorrect. Linking tangible milestones to verified conservation funds prevents greenwashing."
        ]
      },
      {
        order: 6,
        question: "Visual Communication (Point-of-Decision Water Refill Signage): When designing point-of-decision signage to encourage guests to use resort glass water refill stations instead of purchasing plastic bottles, what design principle is most effective?",
        options: [
          "Put signs in only one rare dialect with no icons",
          "Hide the water dispensers in the engineering basement",
          "Place clear, positive signage at eye level next to chilled dispenser stations, highlighting water purity, temperature, and plastic bottles avoided",
          "Write a 50-page technical manual on water filtration and tape it to the tap"
        ],
        correct: 2,
        correctExplanation: "Effective point-of-decision prompts must be placed directly where the action occurs, visually intuitive, and framed with positive attributes like freshness and collective impact.",
        incorrectExplanation: "Incorrect. Concealed dispensers or dense unreadable text prevent guest adoption; visual accessibility and clarity drive action.",
        optionFeedback: [
          "Incorrect. Multilingual icons and universal symbols are essential in international resorts.",
          "Incorrect. Poor accessibility prevents guests from using refill infrastructure.",
          "Correct! Convenient placement, clear visual cues, and positive feedback (e.g., 'Pure Chilled Mountain Water — 1,200 bottles saved this week') drive adoption.",
          "Incorrect. Dense technical text is ignored by guests on vacation."
        ]
      },
      {
        order: 7,
        question: "Service Conflict Resolution (Balcony Door HVAC Interlocks): A guest complains at the front desk that their air conditioning pauses when they open the balcony sliding door. How should the guest service agent respond professionally?",
        options: [
          "Argue with the guest and accuse them of destroying the environment",
          "Bypass the electrical interlock with a wire jumper immediately for the entire building",
          "Call security to remove the guest from the hotel",
          "Politely explain that the smart door interlock protects the room from tropical humidity and mold while cooling resumes immediately upon closing the door"
        ],
        correct: 3,
        correctExplanation: "Frontline staff should reframe technical controls as comfort and humidity protection features, offering clear explanations that turn potential friction into positive sustainability awareness.",
        incorrectExplanation: "Incorrect. Confrontational responses damage hospitality service; bypassing interlocks causes room condensation and energy waste.",
        optionFeedback: [
          "Incorrect. Confrontational responses destroy guest rapport and hospitality standards.",
          "Incorrect. Disabling energy-saving interlocks degrades building operations and increases humidity risks.",
          "Incorrect. Escalating a standard inquiry to security is unprofessional.",
          "Correct! Courteously explaining how the sensor prevents moisture damage, mold, and energy loss while reassuring instant cooling resumption educates the guest effectively."
        ]
      },
      {
        order: 8,
        question: "KPI Governance (Balancing Environmental Metrics & Guest Satisfaction): How should a resort measure and evaluate the success of its guest sustainability engagement initiatives?",
        options: [
          "Track quantifiable KPIs (e.g., % linen reuse compliance, water refill volumes, plate waste per cover) combined with guest satisfaction scores (NPS/CSAT)",
          "Count how many times the general manager posts on personal social media",
          "Assume all guests love sustainability without collecting any data",
          "Survey only hotel employees and pretend they are resort guests"
        ],
        correct: 0,
        correctExplanation: "Robust evaluation pairs resource reduction data (towel reuse rates, water refill liters) with guest satisfaction scores to ensure initiatives achieve dual operational and service excellence.",
        incorrectExplanation: "Incorrect. Social media vanity metrics or employee-only surveys cannot replace empirical operational metrics and real guest sentiment.",
        optionFeedback: [
          "Correct! Combining empirical operational metrics (resource savings, participation rates) with guest feedback surveys validates that sustainability enhances rather than compromises guest experience.",
          "Incorrect. Social media posts do not measure operational efficacy.",
          "Incorrect. Data-driven governance requires continuous metric verification.",
          "Incorrect. Employee surveys cannot substitute for authentic guest sentiment."
        ]
      }
    ]
  },

  // 6. ELH-41 (ID: 726) - Sustainable Event & Banquet Management (8 Questions)
  {
    courseId: 726,
    courseCode: "ELH-41",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Standards & Scoping (ISO 20121 Event Sustainability Management): An event sales manager is planning a 300-delegate corporate conference under ISO 20121. What is the first step in the sustainability planning cycle?",
        options: [
          "Engage the client early to establish measurable sustainability objectives, including paperless ticketing, plant-forward catering, and waste diversion targets",
          "Order 500 plastic branded pens and single-use polyester lanyards",
          "Print a 100-page conference binder for every participant",
          "Ignore client preferences and serve only bread and tap water"
        ],
        correct: 0,
        correctExplanation: "ISO 20121 requires early engagement with clients to set sustainability baselines, scope material flows, and integrate low-carbon catering and zero-waste protocols into event contracts.",
        incorrectExplanation: "Incorrect. Single-use plastic giveaways and dense paper binders generate preventable waste; early collaborative scoping is key.",
        optionFeedback: [
          "Correct! ISO 20121 emphasizes early stakeholder engagement to define clear, measurable ESG criteria across catering, materials, energy, and waste management.",
          "Incorrect. Single-use plastic merchandise generates preventable event waste.",
          "Incorrect. Physical paper binders are obsolete and resource-intensive.",
          "Incorrect. Sustainable catering balances quality, dietary variety, and resource efficiency."
        ]
      },
      {
        order: 2,
        question: "Catering Carbon Intensity (Plant-Forward Banquet Design): In designing a banquet menu with low carbon intensity, which menu design strategy delivers the highest greenhouse gas emissions reduction?",
        options: [
          "Serving air-freighted beef tenderloin with imported out-of-season asparagus",
          "Featuring a plant-rich, locally sourced menu with pulses, seasonal island vegetables, and optional sustainably caught local fish",
          "Wrapping each individual canapé in three layers of plastic cling film",
          "Deep-frying all dishes in single-use palm oil"
        ],
        correct: 1,
        correctExplanation: "Transitioning menus toward plant-forward recipes featuring regional agricultural ingredients drastically reduces Scope 3 food procurement emissions.",
        incorrectExplanation: "Incorrect. Ruminant meat and air-freighted ingredients carry the highest carbon footprints in event catering.",
        optionFeedback: [
          "Incorrect. Ruminant meat and air-freighted produce carry the highest carbon footprint in banqueting.",
          "Correct! Plant-forward menus utilizing regional agriculture cut food-related carbon emissions by 40–60% compared to beef-heavy conventional menus.",
          "Incorrect. Excess plastic packaging increases solid waste.",
          "Incorrect. Palm oil frying does not address core food emissions and carries deforestation risks."
        ]
      },
      {
        order: 3,
        question: "Material Dematerialization (Paperless Digital Event Collaterals): A conference organizer insists on providing printed daily agendas, speaker bios, and handouts. What sustainable digital alternative should the banquet manager propose?",
        options: [
          "Telling delegates that agendas are confidential and will not be shared",
          "Writing the agenda by hand on the ballroom mirrors using lipstick",
          "A customized event mobile app or progressive web app with QR-code access on reusable digital display boards",
          "Carving the schedule into wooden slabs to be discarded after the event"
        ],
        correct: 2,
        correctExplanation: "Digital conference apps and dynamic QR code displays eliminate event paper waste, provide real-time updates, and streamline attendee communications.",
        incorrectExplanation: "Incorrect. Defacing property, withholding schedules, or carving disposable wood fails professional event standards.",
        optionFeedback: [
          "Incorrect. Withholding schedules disrupts conference operations.",
          "Incorrect. Defacing mirrors damages property and fails professional standards.",
          "Correct! Mobile event apps and digital QR signage eliminate thousands of printed pages while allowing real-time schedule updates and attendee networking.",
          "Incorrect. Single-use wooden carvings waste materials and increase logistics costs."
        ]
      },
      {
        order: 4,
        question: "Single-Use Elimination (Hydration Infrastructure): What is the most effective operational strategy to eliminate single-use plastic water bottles in large conference breakout sessions and gala banquets?",
        options: [
          "Require attendees to drink directly from restroom sink faucets",
          "Do not provide any water to attendees to save cleanup time",
          "Give each attendee ten 250 ml plastic bottles at the start of every session",
          "Provide refillable sanitized glass carafes and water dispensers with branded reusable bottles or glassware"
        ],
        correct: 3,
        correctExplanation: "High-capacity on-site filtered water bottling and reusable glassware replace thousands of single-use plastic bottles per banquet event.",
        incorrectExplanation: "Incorrect. Hydration is a basic health need; multiplying small plastic bottles worsens waste.",
        optionFeedback: [
          "Incorrect. Restroom sinks are inappropriate for conference catering.",
          "Incorrect. Hydration is an essential health and service standard.",
          "Incorrect. Small single-use bottles maximize plastic waste generation.",
          "Correct! Sanitized glass carafes, water stations, and reusable glassware completely eliminate single-use PET bottles in conference and banquet settings."
        ]
      },
      {
        order: 5,
        question: "Surplus Recovery (Pre-Arranged Banquet Food Rescue): A 500-person gala dinner concludes with 60 kg of prepared, unserved hot entrées that remained in temperature-controlled holding cabinets. How should this surplus be managed?",
        options: [
          "Immediately throw all food into the general waste dumpster",
          "Execute a pre-established food donation protocol with an accredited charity under certified cold-chain transfer conditions",
          "Leave food on outdoor tables overnight for wild birds",
          "Re-freeze the food and secretly re-serve it at a wedding three weeks later"
        ],
        correct: 1,
        correctExplanation: "Pre-arranged partnerships with certified food rescue charities allow safe, rapid donation of surplus prepared food adhering to food safety chain-of-custody.",
        incorrectExplanation: "Incorrect. Dumping wholesome food generates landfill methane; unverified re-serving violates HACCP food safety laws.",
        optionFeedback: [
          "Incorrect. Dumping wholesome food wastes resources and generates landfill methane.",
          "Correct! Pre-arranged food recovery partnerships allow rapid temperature logging and safe transfer to local community organizations.",
          "Incorrect. Uncontrolled outdoor dumping causes vector infestation and pollution.",
          "Incorrect. Improper storage and undocumented re-serving violates HACCP food safety laws."
        ]
      },
      {
        order: 6,
        question: "Circular Staging (Modular Exhibition & Decor): When designing ballroom staging and event exhibition decor, what circular economy practice should replace custom single-use foam core boards and printed PVC banners?",
        options: [
          "Constructing all stages out of fresh cut rainforest timber for every 2-hour event",
          "Burning the single-use PVC banners in the banquet parking lot after each event",
          "Modular aluminum frame systems with reusable tension fabric graphics, digital LED video walls, and rented living plants",
          "Painting the ballroom walls permanently with the logo of the current sponsor"
        ],
        correct: 2,
        correctExplanation: "Modular staging components, LED digital backdrops, and rented potted greenery create sophisticated event aesthetics with zero landfill waste.",
        incorrectExplanation: "Incorrect. Burning PVC releases toxic dioxins; single-use timber is destructive; permanent wall painting is impractical.",
        optionFeedback: [
          "Incorrect. Disposable timber staging is highly resource-destructive.",
          "Incorrect. Open burning of PVC releases toxic dioxins and hydrochloric acid fumes.",
          "Correct! Modular staging, LED displays, tension fabrics, and potted living plants eliminate tons of single-use exhibition waste.",
          "Incorrect. Painting permanent walls is impractical and destroys property."
        ]
      },
      {
        order: 7,
        question: "Waste Diversion (Multi-Stream Event Waste Stations): A banquet operations team sets up waste sorting stations for a 1,000-person outdoor festival on resort grounds. What station setup maximizes waste diversion from landfill?",
        options: [
          "Single unlabelled black bins placed 100 meters apart",
          "A large open burning pit where all waste is thrown together",
          "Bins hidden behind bushes so guests cannot see them",
          "Paired, color-coded, icon-based stations for food organics, clean recyclables (cans/glass/paper), and general waste, staffed by trained eco-ambassadors during peak periods"
        ],
        correct: 3,
        correctExplanation: "Multi-stream waste stations with clear visual signage and trained staff achieve diversion rates above 80%, preventing recyclables and organics from entering landfills.",
        incorrectExplanation: "Incorrect. Single unlabelled bins lead to 100% contamination; hidden bins cause littering; open burning is illegal.",
        optionFeedback: [
          "Incorrect. Unlabelled single bins guarantee 100% cross-contamination.",
          "Incorrect. Open burn pits violate environmental and public safety laws.",
          "Incorrect. Inaccessible bins lead to widespread littering.",
          "Correct! Co-locating distinct, visual waste streams with peer guidance prevents contamination and maximizes recycling and composting yields."
        ]
      },
      {
        order: 8,
        question: "ESG Assurance (Client Post-Event Sustainability Reports): After hosting a major 3-day sustainability summit, what post-event reporting should the banquet sales team provide to the corporate client?",
        options: [
          "A standardized Event Sustainability Report documenting diverted waste kg, carbon footprint breakdown, local food sourcing %, and plastic items avoided",
          "A handwritten note saying 'Thank you, we were very green.' with no numbers",
          "A bill with random surprise environmental penalty fees",
          "An email claiming the conference absorbed more carbon than the Amazon rainforest"
        ],
        correct: 0,
        correctExplanation: "Providing empirical post-event ESG metrics (waste diverted, local food sourcing ratio, water bottles avoided) strengthens client retention and supports corporate sustainability audits.",
        incorrectExplanation: "Incorrect. Anecdotal notes without verified data fail corporate ESG reporting; unsubstantiated carbon claims constitute greenwashing.",
        optionFeedback: [
          "Correct! Transparent post-event data reports allow clients to verify their Scope 3 event emissions and fulfill corporate ESG sustainability reporting requirements.",
          "Incorrect. Anecdotal claims without verified metrics fail corporate ESG audit standards.",
          "Incorrect. Uncontracted arbitrary fees breach commercial agreements.",
          "Incorrect. Exaggerated unsubstantiated carbon claims constitute greenwashing."
        ]
      }
    ]
  },

  // 7. ELH-42 (ID: 744) - Eco-Friendly Pool, Spa & Wellness Operations (8 Questions)
  {
    courseId: 744,
    courseCode: "ELH-42",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Thermal & Evaporation Control (Pool Thermal Blankets): A resort main swimming pool loses significant water and heating energy overnight. What is the most effective operational intervention to cut both evaporation losses and thermal energy demand?",
        options: [
          "Deploying thermal pool covers or automated liquid pool covers during overnight non-operating hours",
          "Emptying the pool completely every night and refilling it with municipal drinking water every morning",
          "Running the pool water heaters at 40°C overnight with maximum water fountain displays",
          "Adding motor oil to the water surface to block evaporation"
        ],
        correct: 0,
        correctExplanation: "Evaporation accounts for over 70% of pool heat loss; physical thermal blankets or automated monomolecular covers drastically reduce both water and heating fuel consumption.",
        incorrectExplanation: "Incorrect. Draining daily wastes massive water; fountains accelerate evaporative heat loss; motor oil is toxic and illegal.",
        optionFeedback: [
          "Correct! Pool covers reduce evaporative water loss by up to 90% and cut heating energy consumption by 50–70% overnight.",
          "Incorrect. Draining and refilling daily wastes hundreds of thousands of liters of treated water.",
          "Incorrect. Running heaters and fountains overnight accelerates evaporative cooling and energy waste.",
          "Incorrect. Adding motor oil is dangerous, toxic to swimmers, and violates all health codes."
        ]
      },
      {
        order: 2,
        question: "Filtration Media (Activated Recycled Glass Media AFM): An engineering team upgrades pool sand filtration. Which advanced filtration media reduces backwash water consumption by up to 50% while improving water clarity?",
        options: [
          "Crushed concrete blocks from building demolition",
          "Recycled activated glass media (AFM) or regenerative media filters",
          "Untreated soil and raw garden compost",
          "Plastic shredded shopping bags"
        ],
        correct: 1,
        correctExplanation: "Activated glass media (AFM) prevents bacterial biofouling within the filter bed, reducing backwash frequency and saving substantial treated pool water and chemicals.",
        incorrectExplanation: "Incorrect. Demolition rubble leaches heavy alkali; compost adds organic pathogens; plastic shreds shed microplastics.",
        optionFeedback: [
          "Incorrect. Demolition concrete leaches high alkalinity and clogs pumps.",
          "Correct! Activated glass filter media (AFM) resists biofouling, filters finer particles (down to 1–5 microns), and requires substantially less backwash water than silica sand.",
          "Incorrect. Garden compost introduces biological contamination and organic matter.",
          "Incorrect. Plastic bags do not filter water and release microplastics."
        ]
      },
      {
        order: 3,
        question: "Spa Amenities (Natural Biodegradable Wellness Materials): A spa director evaluates treatment amenities and single-use supplies. Which procurement choice best aligns with luxury wellness standards while eliminating persistent plastic waste?",
        options: [
          "Providing single-use plastic flip-flops that are discarded after a 10-minute sauna session",
          "Wrapping every massage table in three layers of disposable PVC plastic film",
          "Biodegradable natural fiber slippers (e.g., jute, cork, organic cotton) and refillable ceramic/glass product dispensers",
          "Using disposable chemical wipes for all facial treatments"
        ],
        correct: 2,
        correctExplanation: "Sustainable spa operations prioritize washable organic linens, natural fiber biodegradable amenities, and bulk-refillable aesthetic ceramic dispensers.",
        incorrectExplanation: "Incorrect. Excessive plastic wrapping cheapens spa luxury and creates persistent non-recyclable solid waste.",
        optionFeedback: [
          "Incorrect. Disposable plastic footwear is a major source of spa landfill waste.",
          "Incorrect. Excessive plastic wrapping cheapens spa luxury and creates large plastic waste volumes.",
          "Correct! Natural biodegradable materials and elegant refillable dispensers elevate spa aesthetics while eliminating single-use plastic waste.",
          "Incorrect. Reusable sanitized organic cotton compresses are superior for both skin health and sustainability."
        ]
      },
      {
        order: 4,
        question: "Disinfection Technology (Electrolytic Saltwater & UV Secondary Systems): When comparing saltwater electrolytic chlorination and secondary UV/ozone disinfection against traditional liquid chlorine drums, what are the primary benefits?",
        options: [
          "Traditional liquid chlorine drums are 100% risk-free and require no ventilation",
          "Saltwater pools convert pool water into pure drinking milk",
          "Ozone systems eliminate the need to test pool water chemistry",
          "On-site generation eliminates hazardous chemical transport and storage, reduces chloramines (eye/skin irritation), and improves bather comfort"
        ],
        correct: 3,
        correctExplanation: "Electrolytic chlorination and secondary UV/ozone systems provide superior disinfection, reduce chemical delivery logistics, and eliminate chloramine odor and eye irritation.",
        incorrectExplanation: "Incorrect. Salt pools are sanitized saline water; testing water chemistry is always mandatory; liquid chlorine carries severe hazardous handling risks.",
        optionFeedback: [
          "Incorrect. Liquid sodium hypochlorite and chlorine gas carry significant chemical burn, inhalation, and transport hazards.",
          "Incorrect. Saltwater chlorination generates sanitized saline pool water, not milk.",
          "Incorrect. Water chemistry (pH, ORP, free chlorine, total alkalinity) must still be monitored rigorously.",
          "Correct! On-site electrolytic generation and UV/ozone reduce bulk hazardous chemical handling, eliminate chlorine gas storage risks, and break down irritating chloramines."
        ]
      },
      {
        order: 5,
        question: "Thermal Demand Control (Sauna & Steam Room Standby Controls): A resort spa operates wet sauna and steam room facilities 14 hours daily. What automated control upgrade cuts energy consumption without compromising guest availability?",
        options: [
          "Keeping steam generators running at maximum output continuously with the glass doors propped open",
          "On-demand push-button or occupancy sensor standby controls that maintain a baseline temperature and rapidly heat to operating temperature when entered by a guest",
          "Turning off all spa lighting permanently",
          "Replacing steam generators with open campfires inside the spa"
        ],
        correct: 1,
        correctExplanation: "On-demand steam and sauna controls utilize smart setback temperatures during idle hours, delivering swift heat-up on entry while cutting baseline energy use by up to 50%.",
        incorrectExplanation: "Incorrect. Propping steam doors open wastes massive energy; open fires inside indoor facilities present fatal carbon monoxide hazards.",
        optionFeedback: [
          "Incorrect. Running steam generators with open doors wastes enormous electrical and water heating energy.",
          "Correct! On-demand sensor controls reduce energy use by 40–60% during unoccupied periods while providing rapid temperature ramp-up when guests enter.",
          "Incorrect. Lighting controls should be energy-efficient (LEDs), not eliminated to ensure safety.",
          "Incorrect. Open fires inside indoor facilities present fatal carbon monoxide and fire hazards."
        ]
      },
      {
        order: 6,
        question: "Ecological Risk (Backwash Discharge & Marine Lagoons): What is the primary ecological hazard of discharging backwash water from a conventionally chlorinated swimming pool directly into a natural mangrove lagoon or coral reef?",
        options: [
          "Backwash water is completely harmless and acts as organic fertilizer for coral",
          "Chlorinated water turns mangroves into tall pine trees",
          "Residual chlorine, high dissolved solids, and chemical shock destroy delicate coral polyps, mangrove flora, and juvenile fish populations",
          "The backwash water causes the ocean to freeze"
        ],
        correct: 2,
        correctExplanation: "Pool backwash contains active biocides (free chlorine, algaecides) and high salts that must be de-chlorinated and settled in holding basins before safe disposal or reuse.",
        incorrectExplanation: "Incorrect. Direct discharge of pool chemical backwash causes severe marine toxicity and violates environmental protection laws.",
        optionFeedback: [
          "Incorrect. Chlorine and pool chemicals are toxic biocides, not marine fertilizer.",
          "Incorrect. Chemical backwash damages mangrove roots and cannot transform plant species.",
          "Correct! Direct discharge of chlorinated backwash water causes severe chemical toxicity and osmotic shock to coastal marine organisms and violates environmental discharge laws.",
          "Incorrect. Pool backwash does not cause freezing in marine environments."
        ]
      },
      {
        order: 7,
        question: "Service Protocols (Mindful Spa Linen Replenishment): In a luxury wellness spa, laundry represents a major operating footprint. How does an 'eco-towel protocol' impact operations?",
        options: [
          "It violates local public health regulations",
          "It forces guests to dry themselves with paper napkins",
          "It increases laundry costs by 200%",
          "It reduces laundry water, chemical, and drying energy consumption by 30–40% while maintaining premium guest comfort through attentive on-request service"
        ],
        correct: 3,
        correctExplanation: "Educating spa guests and offering mindful towel replenishment reduces unnecessary wash loads by over a third without diminishing luxury service quality.",
        incorrectExplanation: "Incorrect. Luxurious reusable textiles remain standard; mindful replenishment lowers utility and linen replacement costs while complying fully with hygiene rules.",
        optionFeedback: [
          "Incorrect. Providing clean linens upon request is fully compliant with hygiene standards.",
          "Incorrect. Luxurious reusable textiles remain standard; wasteful automatic replacement is curbed.",
          "Incorrect. Reducing wash volumes directly lowers utility, labor, and linen replacement costs.",
          "Correct! Mindful linen protocols in spas curb excessive over-washing of barely-used towels while preserving bespoke guest service upon request."
        ]
      },
      {
        order: 8,
        question: "Chemical Safety & Storage (Acid-Chlorine Segregation): An environmental auditor checks the chemical dosing room for the resort main pool. Which safety control is mandatory to prevent toxic gas generation?",
        options: [
          "Strict physical segregation of sodium hypochlorite (chlorine) and hydrochloric/sulfuric acid with secondary containment bunds and separate ventilation",
          "Storing chlorine drums and acid carboys stacked on top of each other in the same open tub",
          "Pouring acid and chlorine together into a single bucket before pouring it into the pool",
          "Storing pool chemicals next to open diesel fuel containers"
        ],
        correct: 0,
        correctExplanation: "Chemical safety regulations mandate separate storage rooms or dedicated chemical containment bunds for acids and chlorine to prevent lethal gas generation from accidental cross-contact.",
        incorrectExplanation: "Incorrect. Direct mixing or unbunded co-storage of acid and chlorine releases lethal chlorine gas immediately; fuel co-storage creates explosion hazards.",
        optionFeedback: [
          "Correct! Mixing chlorine and acid produces lethal chlorine gas; strict physical separation, dedicated spill bunds, and separate exhaust ventilation are mandatory.",
          "Incorrect. Storing acids and hypochlorites together risks catastrophic toxic gas release in the event of a leak.",
          "Incorrect. Direct mixing of acid and chlorine generates lethal chlorine gas immediately.",
          "Incorrect. Storing strong oxidizers near combustible fuels creates severe fire and explosion hazards."
        ]
      }
    ]
  },

  // 8. ELH-43 (ID: 745) - Energy-Efficient Hotel Guest Rooms & Smart Controls (8 Questions)
  {
    courseId: 745,
    courseCode: "ELH-43",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Control Flaws (Mechanical Keycard Bypass): A resort replaces mechanical keycard slots with a smart Guest Room Energy Management System (EMS). Why are mechanical keycard slots easily bypassed and ineffective for deep energy savings?",
        options: [
          "Guests easily defeat mechanical slots using business cards or fake cards, leaving air conditioning running 24/7 in unoccupied rooms",
          "Mechanical slots consume too much electricity themselves",
          "Mechanical slots erase magnetic hotel keys upon contact",
          "Mechanical slots turn off the fire alarm system"
        ],
        correct: 0,
        correctExplanation: "Mechanical keycard slots are easily circumvented by inserting business cards; smart EMS systems use passive infrared (PIR) and door contact sensors to verify true human occupancy.",
        incorrectExplanation: "Incorrect. Mechanical slots consume no power; they are easily defeated by dummy cards, causing continuous HVAC waste in empty rooms.",
        optionFeedback: [
          "Correct! Mechanical slots respond to any physical card, allowing guests to leave dummy cards inserted so air conditioning runs continuously in empty rooms.",
          "Incorrect. Mechanical slots consume no electric power themselves.",
          "Incorrect. Keycard slots do not erase magnetic stripes.",
          "Incorrect. Life safety systems are independent of guest room convenience switches."
        ]
      },
      {
        order: 2,
        question: "PMS Integration (Multi-Tier Temperature Setbacks): How does a smart guest room EMS utilize multi-tier temperature setback algorithms when integrated with the hotel Property Management System (PMS)?",
        options: [
          "It turns off the electricity to the entire wing whenever a guest leaves their room",
          "It maintains 'Sold-Unoccupied' rooms at a moderate setback (e.g., 24°C) for quick recovery, and 'Unsold' rooms at a deeper setback (e.g., 27°C) to maximize savings",
          "It freezes all rooms to 14°C regardless of occupancy to preserve furniture",
          "It disables the hotel PMS whenever a guest opens the door"
        ],
        correct: 1,
        correctExplanation: "PMS integration enables intelligent tiering: Unsold (deep setback ~27°C), Sold/Unoccupied (mild setback ~24°C with rapid 5-minute recovery), and Occupied (guest selected temperature).",
        incorrectExplanation: "Incorrect. Smart setback modulates HVAC setpoints dynamically; it does not cut off total wing power or overcool empty spaces.",
        optionFeedback: [
          "Incorrect. Smart setback modulates HVAC setpoints; it does not cut off total wing power.",
          "Correct! Integrating EMS with PMS allows distinct thermal profiles: unrented rooms enter deep setback, while rented rooms use a shallow setback that quickly restores guest comfort upon entry.",
          "Incorrect. Overcooling empty rooms causes severe energy waste and moisture condensation.",
          "Incorrect. The EMS reads data from the PMS via API; it does not disable front desk software."
        ]
      },
      {
        order: 3,
        question: "Humidity & Energy Interlocks (Balcony Door Reed Switches): An engineer audits balcony door interlocks in guest villas. How does the magnetic door reed switch interface with the guest room Fan Coil Unit (FCU)?",
        options: [
          "The door interlock permanently locks the guest outside on the balcony",
          "Opening the balcony door turns the air conditioner to maximum freezing power",
          "When the balcony door remains open for >30 seconds, the interlock automatically turns off the FCU cooling valve and fan to prevent condensation and energy waste",
          "Opening the door sounds a loud police siren across the resort"
        ],
        correct: 2,
        correctExplanation: "Balcony door sensors prevent the continuous infiltration of warm, humid outside air into actively cooled spaces, eliminating condensation and cutting HVAC waste.",
        incorrectExplanation: "Incorrect. Running cooling with open doors draws in tropical humidity, causing mold and coil icing; interlocks operate silently and safely.",
        optionFeedback: [
          "Incorrect. Interlocks control HVAC relays, not emergency door escape latches.",
          "Incorrect. Running cooling with open doors draws in tropical humidity, causing mold and coil icing.",
          "Correct! Balcony interlocks pause HVAC cooling when doors are open, stopping energy waste and preventing warm humid outdoor air from causing indoor coil condensation.",
          "Incorrect. System functions smoothly and silently without disruptive sirens."
        ]
      },
      {
        order: 4,
        question: "Plug-Load Management (Smart Relays & Phantom Loads): A hotel guest room contains a mini-fridge, television, kettle, and multiple USB hubs. What operational control best addresses 'vampire' plug loads when unoccupied?",
        options: [
          "Requiring guests to bring their own diesel generators",
          "Unplugging all electrical equipment by hand every morning",
          "Shutting off the main municipal electrical grid connection to the resort",
          "Connecting non-essential circuits to smart EMS load-shedding relays that cut power to unneeded entertainment/charging devices while preserving mini-fridge power"
        ],
        correct: 3,
        correctExplanation: "Smart relay circuits disconnect non-essential standby power devices when rooms are vacant while keeping dedicated circuits (mini-bars, safes) energized.",
        incorrectExplanation: "Incorrect. Manual unplugging is labor-intensive and damages cords; smart EMS relays automate load disconnection seamlessly.",
        optionFeedback: [
          "Incorrect. Guest-provided generators are dangerous, noisy, and impractical.",
          "Incorrect. Manual unplugging is labor-intensive and damages cords and receptacles.",
          "Incorrect. Cutting municipal grid power disrupts all hotel operations.",
          "Correct! Smart EMS automated plug-load relays disconnect non-essential phantom loads (TV standby, desk lamps) during unrented periods while maintaining critical continuous circuits."
        ]
      },
      {
        order: 5,
        question: "Lighting Efficiency (Lighting Power Density Benchmarking): When upgrading guest room lighting to LED fixtures, why is calculating Lighting Power Density (LPD in W/m²) important for energy codes (e.g., ASHRAE 90.1)?",
        options: [
          "It determines how many light bulbs must be broken every week",
          "It verifies that total installed lighting wattage per square meter is within mandatory energy efficiency benchmarks while providing adequate lux levels for guest comfort",
          "It ensures the room is pitch black so guests cannot read books",
          "It measures the weight of light fixtures in kilograms"
        ],
        correct: 1,
        correctExplanation: "Lighting Power Density (W/m²) is a core energy efficiency metric ensuring lighting systems minimize power draw while maintaining optimal visual comfort.",
        incorrectExplanation: "Incorrect. LPD measures electrical power per floor area; modern LED design delivers warm, compliant lux levels without excess wattage.",
        optionFeedback: [
          "Incorrect. LPD evaluates power efficiency, not maintenance destruction.",
          "Correct! LPD benchmarking ensures lighting designs deliver sufficient illumination (lux) while keeping total electrical load below code thresholds (typically ≤6 W/m² for guest rooms).",
          "Incorrect. Modern LED design maintains warm, comfortable illumination levels (300–500 lux).",
          "Incorrect. LPD measures electrical power per floor area, not physical fixture mass."
        ]
      },
      {
        order: 6,
        question: "Plumbing Fixtures (Low-Flow Aerated Showerheads & Thermal Energy): A resort retrofits guest bathrooms with low-flow aerated showerheads flowing at 6.8 L/min. What is the dual impact on room utilities?",
        options: [
          "It increases water heating fuel costs by 300%",
          "It causes hot water pipes to freeze solid in summer",
          "It cuts shower water consumption by 30–40% and proportionally reduces domestic hot water heating energy (gas/electricity) without degrading spray sensation",
          "It eliminates the need for guests to shower during their stay"
        ],
        correct: 2,
        correctExplanation: "Reducing shower flow rate from 10+ L/min to ≤6.8 L/min reduces both freshwater consumption and the substantial boiler fuel needed to generate domestic hot water.",
        incorrectExplanation: "Incorrect. Low-flow aerated fixtures maintain spray velocity while cutting water and heating fuel costs by over a third.",
        optionFeedback: [
          "Incorrect. Reducing hot water flow directly lowers boiler fuel consumption.",
          "Incorrect. Water flow reduction in heated systems does not cause freezing.",
          "Correct! Low-flow aerated fixtures mix air into the water stream to maintain strong spray pressure while saving water and significant water heating fuel.",
          "Incorrect. Guest hygiene is maintained with high-performance spray patterns."
        ]
      },
      {
        order: 7,
        question: "Occupancy Sensing Logic (PIR & Door Contact State Tracking): During EMS commissioning, an engineer tests occupancy detection logic. Which sensor combination provides the most reliable tracking without false setbacks while guests sleep?",
        options: [
          "Vibration sensors placed only on the television remote control",
          "Sound sensors that require guests to shout loudly every 10 minutes",
          "Thermal cameras streaming live video to YouTube",
          "Dual-technology sensors combining Passive Infrared (PIR) motion detection with door contact switch logic (triggering motion scan only after a door event)"
        ],
        correct: 3,
        correctExplanation: "Door-supervised PIR occupancy algorithms check for motion only after an entry/exit door event, preventing false setbacks while occupants sleep or remain still.",
        incorrectExplanation: "Incorrect. Audio triggers disrupt sleep; video cameras severely violate privacy; door contact + PIR supervision is the industry standard.",
        optionFeedback: [
          "Incorrect. Remote control sensors fail when guests are resting or reading.",
          "Incorrect. Sound triggers create annoying false alarms and disrupt sleep.",
          "Incorrect. Video cameras inside guest bedrooms severely violate privacy and legal rights.",
          "Correct! Door contact + PIR logic determines occupancy with high accuracy: if no door event occurs, the system knows the guest is still inside (even when sleeping motionless)."
        ]
      },
      {
        order: 8,
        question: "Preventive Maintenance (Sensor Calibration & Actuator Verification): How should a hotel engineering team maintain smart guest room EMS hardware to prevent drift and guest complaints over time?",
        options: [
          "Perform quarterly preventive maintenance checks: verify door magnet alignment, test PIR sensor response, calibrate room temperature thermistors, and check motorized valve travel",
          "Wait until all guests check out in anger before checking any room equipment",
          "Disconnect the BMS network cables to prevent software updates",
          "Paint over all motion sensors with black oil paint"
        ],
        correct: 0,
        correctExplanation: "Routine preventive maintenance of sensors, door contacts, and actuator valves ensures EMS control loops function accurately and maintain guest satisfaction.",
        incorrectExplanation: "Incorrect. Reactive maintenance damages reputation; disconnecting network cables or painting over lenses blinds the system.",
        optionFeedback: [
          "Correct! Scheduled calibration of temperature sensors, door switches, and valve actuators ensures continued energy savings and prevents guest comfort issues.",
          "Incorrect. Reactive failure management harms guest reputation and satisfaction.",
          "Incorrect. BMS network connectivity is required for real-time fault alarms and PMS setpoint integration.",
          "Incorrect. Painting over sensors blinds the infrared lens, causing permanent system failure."
        ]
      }
    ]
  },

  // 9. ELH-44 (ID: 772) - Sustainable Single-Use Plastic Elimination in Resorts (8 Questions)
  {
    courseId: 772,
    courseCode: "ELH-44",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Circular Bottling (On-Premise Reverse Osmosis Glass Plant): A 250-room island resort launches a campaign to eliminate single-use plastic water bottles. What is the most reliable, closed-loop technical solution?",
        options: [
          "Install an on-site commercial reverse osmosis filtration and UV bottling plant utilizing reusable, sanitized glass bottles with automated capping",
          "Ship in 100,000 single-use plastic bottles from overseas every week by air freight",
          "Instruct guests to drink unpurified water from landscaping irrigation lines",
          "Replace plastic bottles with single-use unrecyclable multi-layer foil pouches"
        ],
        correct: 0,
        correctExplanation: "On-premise water purification and automated glass bottling create a circular, closed-loop hydration system that completely removes single-use PET bottles.",
        incorrectExplanation: "Incorrect. Air-freighting single-use bottles creates huge emissions; irrigation water is non-potable; multi-layer pouches cannot be recycled locally.",
        optionFeedback: [
          "Correct! On-site water bottling in reusable sanitized glass bottles eliminates hundreds of thousands of plastic bottles annually, slashing Scope 3 freight and waste.",
          "Incorrect. Air-freighting single-use bottles creates massive carbon emissions and plastic waste.",
          "Incorrect. Landscape irrigation is non-potable and unsafe for consumption.",
          "Incorrect. Multi-layer foil pouches cannot be recycled locally and generate persistent landfill waste."
        ]
      },
      {
        order: 2,
        question: "Bathroom Amenities (Bulk Dispensers vs Miniatures): Housekeeping audits show guest bathrooms consume 180,000 miniature 30 ml plastic bottles annually. What is the standard sustainable replacement?",
        options: [
          "Eliminate all soap and shampoo from guest rooms entirely",
          "Wall-mounted or freestanding tamper-resistant ceramic/stainless steel bulk refillable dispensers utilizing certified organic bulk liquid amenities",
          "Give each guest a 20-liter plastic drum of shampoo at check-in",
          "Replace 30 ml bottles with 10 ml disposable plastic sachets"
        ],
        correct: 1,
        correctExplanation: "Tamper-proof bulk dispensers eliminate miniature plastic bottle waste, reduce product cost per liter, and maintain high guest satisfaction.",
        incorrectExplanation: "Incorrect. Eliminating amenities violates hospitality standards; industrial drums are impractical; sachets increase plastic litter.",
        optionFeedback: [
          "Incorrect. Removing amenities entirely violates fundamental hospitality service standards.",
          "Correct! High-quality, tamper-resistant bulk dispensers eliminate millions of miniature plastic bottles while preserving luxury aesthetic and hygiene standards.",
          "Incorrect. Providing industrial drums is impractical and unsightly in guest rooms.",
          "Incorrect. Plastic sachets increase plastic fragmentation and litter risks."
        ]
      },
      {
        order: 3,
        question: "Bioplastics Reality (Industrial Composting Requirements for PLA): In F&B operations, a resort replaces plastic takeaway containers with bio-plastic (PLA). What critical waste reality must be verified before claiming sustainability?",
        options: [
          "PLA can be melted and eaten as organic food",
          "PLA dissolves instantly in ordinary cold sea water within 5 seconds",
          "PLA requires industrial composting facilities operating at >58°C with controlled humidity to degrade; in standard landfills or marine environments, it persists like conventional plastic",
          "PLA is 100% recyclable in standard curbside PET bottle recycling streams"
        ],
        correct: 2,
        correctExplanation: "Polylactic acid (PLA) requires commercial industrial composting facilities (58–60°C); without dedicated industrial composting infrastructure, PLA fails to degrade and contaminates PET recycling.",
        incorrectExplanation: "Incorrect. PLA does not dissolve in sea water, is not edible, and contaminates PET recycling streams.",
        optionFeedback: [
          "Incorrect. Bio-plastics are technical polymers and not edible.",
          "Incorrect. Bio-plastics do not dissolve in cold water and persist for decades in marine environments.",
          "Correct! PLA does not decompose in backyard compost, landfill, or marine conditions; without access to commercial industrial composting, it behaves like conventional plastic waste.",
          "Incorrect. PLA contaminates PET recycling streams, causing entire batches of recycled plastic to be rejected."
        ]
      },
      {
        order: 4,
        question: "Bar & Beverage Policy (Straw Reduction Hierarchy): A resort bar replaces single-use plastic cocktail straws and beverage stirrers. Which operational standard best implements the reduction hierarchy?",
        options: [
          "Use lead-coated metal rods as disposable stirrers",
          "Put four plastic straws into every glass automatically",
          "Stop serving cocktails or drinks of any kind",
          "Adopt a 'Straw upon request only' policy, offering reusable stainless steel/bamboo straws or certified home-compostable natural plant reed straws when requested"
        ],
        correct: 3,
        correctExplanation: "Combining a 'straw on request' policy with durable reusable stainless steel or natural reed alternatives eliminates plastic waste while educating guests.",
        incorrectExplanation: "Incorrect. Automatic straw distribution maximizes waste; banning drinks disrupts operations; lead is toxic.",
        optionFeedback: [
          "Incorrect. Lead is a severe neurotoxin and dangerous in food contact.",
          "Incorrect. Automatic straw distribution maximizes single-use waste.",
          "Incorrect. Banning beverages is incompatible with bar operations.",
          "Correct! An 'on-request' policy reduces straw usage by over 80%, while natural reusable or home-compostable alternatives eliminate plastic waste."
        ]
      },
      {
        order: 5,
        question: "Supply Chain Packaging (Returnable Transport Packaging RTP): A procurement manager finds suppliers deliver produce wrapped in single-use plastic wrap and polystyrene boxes. What is the corrective supplier protocol?",
        options: [
          "Accept all single-use packaging and bury it on the resort beach at night",
          "Implement a closed-loop returnable crate system with sanitized heavy-duty collapsible crates and mandate reusable pallet wraps in supplier contracts",
          "Cancel all food orders and let resort kitchens run out of food",
          "Burn polystyrene boxes in open bonfires behind the receiving dock"
        ],
        correct: 1,
        correctExplanation: "Closed-loop supplier agreements using returnable, washable crates and reusable pallet securing systems eliminate single-use plastic at the receiving dock.",
        incorrectExplanation: "Incorrect. Beach burial or open burning of polystyrene is toxic and illegal; supply agreements should mandate returnable crates.",
        optionFeedback: [
          "Incorrect. Burying waste on beaches causes severe environmental and legal violations.",
          "Correct! Contracting suppliers to use returnable plastic crates (RPCs) and reusable pallet bands eliminates tons of stretch film and polystyrene waste.",
          "Incorrect. Strategic procurement collaborates with vendors rather than shutting down supply lines.",
          "Incorrect. Burning polystyrene releases toxic styrene monomers and dense black soot."
        ]
      },
      {
        order: 6,
        question: "Material Hazard (Expanded Polystyrene EPS Ecological Impact): Why is Expanded Polystyrene (EPS / Styrofoam) one of the highest-priority plastic items targeted for total elimination in island resorts?",
        options: [
          "It makes hotel food taste too spicy",
          "It is made of pure diamonds that are too expensive for resorts",
          "It easily fragments into lightweight, indestructible micro-debris that blows into the ocean, harms marine life, absorbs toxins, and is virtually impossible to recycle locally",
          "It is illegal for humans to touch polystyrene with bare hands"
        ],
        correct: 2,
        correctExplanation: "Expanded polystyrene fragments easily into microplastics that contaminate marine food webs, prompting worldwide bans in hospitality.",
        incorrectExplanation: "Incorrect. Polystyrene is a cheap petroleum polymer that fragments into persistent microplastics; it has no diamond content or flavor altering properties.",
        optionFeedback: [
          "Incorrect. Polystyrene is odorless and chemically inert to taste, but ecologically devastating.",
          "Incorrect. Polystyrene is a cheap petroleum-derived polymer, not diamond.",
          "Correct! EPS is brittle, highly buoyant, easily ingested by marine animals, and has almost zero economic recycling value on isolated islands.",
          "Incorrect. Handling it is not physically toxic, but its environmental persistence is disastrous."
        ]
      },
      {
        order: 7,
        question: "Retail Operations (Reusable Cloth Bags & Paper Packaging): A resort retail boutique sells souvenirs and sundries. What packaging policy should be enforced at checkout?",
        options: [
          "Import plastic bags from countries that have no plastic regulations",
          "Wrap every item in five plastic shopping bags",
          "Require customers to carry items in their teeth",
          "Provide no single-use plastic bags; offer reusable certified organic cotton tote bags for purchase or borrow, or provide FSC-certified recycled paper bags upon request"
        ],
        correct: 3,
        correctExplanation: "Hospitality retail operations should eliminate single-use plastic carry bags in favor of branded reusable cloth bags and recycled paper alternatives.",
        incorrectExplanation: "Incorrect. Excessive plastic bagging generates preventable waste; circumvention undermines environmental integrity.",
        optionFeedback: [
          "Incorrect. Circumventing plastic bans undermines sustainability integrity.",
          "Incorrect. Excessive plastic bagging generates preventable waste.",
          "Incorrect. Unreasonable customer treatment damages guest experience.",
          "Correct! Retail bag elimination with reusable cloth or post-consumer recycled paper bags supports brand sustainability and eliminates retail plastic waste."
        ]
      },
      {
        order: 8,
        question: "Auditability (Single-Use Plastic Inventory & Certification Proof): How does a resort maintain an accurate Single-Use Plastic Inventory and audit trail for global eco-certifications (e.g., EarthCheck, Green Key)?",
        options: [
          "Maintain a central procurement SKU register tracking monthly purchased vs eliminated plastic items, verified by waste manifests and supplier invoices",
          "Estimate plastic numbers by guessing during the annual staff Christmas party",
          "Delete all purchasing records so auditors cannot find plastic purchases",
          "Claim that all plastic items purchased were actually trees"
        ],
        correct: 0,
        correctExplanation: "Third-party certifications require auditable procurement SKU registers documenting plastic unit reduction, vendor compliance, and verified diversion.",
        incorrectExplanation: "Incorrect. Unverified estimates fail third-party audits; deleting records breaches financial compliance; false claims constitute greenwashing.",
        optionFeedback: [
          "Correct! Rigorous SKU tracking linked to purchasing invoices and waste manifests provides verifiable proof of plastic reduction for international certifications.",
          "Incorrect. Unverified estimates fail third-party sustainability audits.",
          "Incorrect. Deleting records breaches financial and environmental audit standards.",
          "Incorrect. False claims constitute fraudulent greenwashing."
        ]
      }
    ]
  },

  // 10. ELH-45 (ID: 727) - Sustainable Hospitality Sourcing & Local Purchasing (8 Questions)
  {
    courseId: 727,
    courseCode: "ELH-45",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Supplier Due Diligence (ESG Audits & Third-Party Proof): A procurement director audits Tier 1 food and operating suppliers against ESG criteria. What is the most reliable method to verify supplier claims?",
        options: [
          "Conduct structured on-site supplier audits, review third-party certifications (e.g., Fairtrade, Organic, MSC), and establish enforceable ESG contractual terms",
          "Rely entirely on supplier verbal promises during sales lunches",
          "Assume all suppliers with colorful websites are 100% sustainable",
          "Hire an undercover detective to follow delivery drivers home"
        ],
        correct: 0,
        correctExplanation: "Supply chain ESG assurance requires verifiable third-party certifications, transparent documentation, and enforceable supplier codes of conduct.",
        incorrectExplanation: "Incorrect. Verbal promises or marketing copy lack legal or audit validity; formal audits and accredited certifications provide assurance.",
        optionFeedback: [
          "Correct! Formal on-site audits, recognized third-party certifications, and binding contractual ESG clauses provide verified assurance of supplier compliance.",
          "Incorrect. Verbal promises without documentation carry no legal or audit standing.",
          "Incorrect. Website marketing copy cannot substitute for accredited compliance audits.",
          "Incorrect. Covert surveillance of drivers is unethical and ineffective for supply chain audits."
        ]
      },
      {
        order: 2,
        question: "Local Agriculture Partnerships (Forward Contracts & Price Stability): A resort enters into a direct procurement partnership with local agricultural cooperatives. What commercial mechanism best ensures supply stability while supporting fair livelihoods?",
        options: [
          "Cancelling orders on 10 minutes notice whenever a cheaper imported container arrives at the port",
          "Long-term forward contracts with guaranteed minimum pricing, seasonal crop planning, and shared quality-standard agreements",
          "Demanding that farmers provide free produce for the first year",
          "Paying farmers only if hotel guests leave 5-star online reviews"
        ],
        correct: 1,
        correctExplanation: "Forward contracting with fair baseline pricing and joint crop planning fosters stable, mutually beneficial local agricultural partnerships.",
        incorrectExplanation: "Incorrect. Volatile cancellations destroy smallholder trust; exploitative terms violate ethical procurement standards.",
        optionFeedback: [
          "Incorrect. Volatile cancellations destroy smallholder trust and economic viability.",
          "Correct! Forward supply agreements with guaranteed floor prices reduce farmer market risk and ensure the hotel receives reliable, high-quality local harvests.",
          "Incorrect. Unfair commercial terms violate ethical procurement standards.",
          "Incorrect. Tying agricultural payment to subjective hotel reviews is exploitative."
        ]
      },
      {
        order: 3,
        question: "Seafood Traceability (MSC & ASC Certified Sourcing): When sourcing seafood for resort restaurants, which certification standards provide independent proof of sustainable fisheries and responsible aquaculture?",
        options: [
          "Seafood that has no catch date, species name, or origin label",
          "Any fish caught using dynamite in shallow coral reefs",
          "Marine Stewardship Council (MSC) for wild fisheries and Aquaculture Stewardship Council (ASC) / GlobalGAP for farmed seafood",
          "Seafood imported illegally from closed marine reserves"
        ],
        correct: 2,
        correctExplanation: "MSC (wild) and ASC (farmed) certifications are globally recognized benchmarks verifying sustainable harvest limits, habitat protection, and full supply traceability.",
        incorrectExplanation: "Incorrect. Blast fishing is illegal and destructive; unlabelled seafood risks endangered stocks; marine reserve poaching is a crime.",
        optionFeedback: [
          "Incorrect. Traceability and species verification are essential to avoid endangered fish stocks.",
          "Incorrect. Blast fishing is illegal, destructive, and devastating to marine ecosystems.",
          "Correct! MSC and ASC certifications verify that fisheries prevent overfishing, minimize bycatch, and operate with full traceability.",
          "Incorrect. Sourcing from marine protected zones violates international conservation laws."
        ]
      },
      {
        order: 4,
        question: "Logistics Optimization (Supplier Consolidation & Scope 3 Freight): How does consolidating supplier delivery schedules (e.g., reducing deliveries from 15 partial trucks per week to 3 consolidated full trucks) impact operations?",
        options: [
          "It requires the hotel to stop serving fresh food",
          "It causes delivery trucks to explode from being full",
          "It increases dock handling labor by 400%",
          "It reduces Scope 3 freight emissions, cuts receiving dock congestion, and lowers administrative processing labor"
        ],
        correct: 3,
        correctExplanation: "Vendor consolidation and scheduled delivery windows reduce transport emissions, decrease dock traffic, and improve receiving quality control.",
        incorrectExplanation: "Incorrect. Consolidated logistics streamline labor and inspection routines while lowering freight carbon emissions.",
        optionFeedback: [
          "Incorrect. Strategic ordering schedules maintain optimal fresh inventory rotations.",
          "Incorrect. Full truckload logistics are safe and standard commercial practice.",
          "Incorrect. Fewer scheduled deliveries streamline labor and inspection routines.",
          "Correct! Supplier consolidation optimizes delivery vehicle routing, slashes carbon emissions, and streamlines warehouse receiving operations."
        ]
      },
      {
        order: 5,
        question: "Chemical Standards (Biodegradability & Eco-Labels): A purchasing team evaluates cleaning chemical vendors. Which environmental standard indicates formulations are biodegradable and low in aquatic toxicity and VOCs?",
        options: [
          "Chemicals labeled with multiple skull-and-crossbones hazard warnings and no ingredient lists",
          "EU Ecolabel, Green Seal, or Cradle to Cradle certified formulations with automated precision dilution dispensers",
          "Untreated concentrated petroleum solvents poured from unlabelled metal drums",
          "Chemicals that have never been tested for human or environmental safety"
        ],
        correct: 1,
        correctExplanation: "Eco-certified cleaning chemicals (EU Ecolabel, Green Seal) guarantee rapid biodegradability, minimal aquatic toxicity, and low VOC emissions.",
        incorrectExplanation: "Incorrect. Unlabeled hazardous petroleum solvents violate safety regulations and pollute indoor air and wastewater.",
        optionFeedback: [
          "Incorrect. Unlabeled hazardous solvents present severe worker and environmental risks.",
          "Correct! Recognized eco-labels (EU Ecolabel, Green Seal) ensure chemicals meet strict biodegradability, low aquatic toxicity, and non-carcinogenic standards.",
          "Incorrect. Petroleum solvents damage wastewater systems and indoor air quality.",
          "Incorrect. Untested chemicals violate workplace safety regulations."
        ]
      },
      {
        order: 6,
        question: "Strategic Framework (Sustainable Sourcing Matrix): What is the primary operational objective of establishing a Sustainable Sourcing Matrix across all hotel purchasing categories?",
        options: [
          "To eliminate all supplier contracts and buy items randomly from retail supermarkets",
          "To force buyers to buy only the cheapest product available regardless of quality or ethics",
          "To categorize all spend by environmental and social risk, setting clear mandatory minimum criteria and preferred certifications for every product category",
          "To hide financial transactions from company auditors"
        ],
        correct: 2,
        correctExplanation: "A Sustainable Sourcing Matrix defines clear mandatory and preferred ESG standards across all purchasing categories (food, operating equipment, chemicals, textiles).",
        incorrectExplanation: "Incorrect. Lowest-price-only purchasing ignores lifecycle costs and ESG risks; retail ad-hoc purchasing lacks commercial governance.",
        optionFeedback: [
          "Incorrect. Random retail purchasing is inefficient and lacks commercial governance.",
          "Incorrect. Lowest-price-only purchasing ignores lifecycle costs, quality, and ESG risks.",
          "Correct! A sustainable sourcing matrix provides category-by-category ESG specifications, guiding buyers toward verified sustainable choices across all departments.",
          "Incorrect. Sourcing frameworks increase transparency and auditability."
        ]
      },
      {
        order: 7,
        question: "Textile Standards (GOTS & OEKO-TEX Verification): A hotel purchases bed linens and staff uniforms. Which textile certification guarantees organic cultivation without synthetic pesticides and manufacturing without hazardous azo dyes?",
        options: [
          "Fabrics dyed with lead and heavy metal pigments",
          "Any fabric that is 100% synthetic polyester with heavy chemical finishes",
          "Textiles produced in unmonitored sweatshops with no labor standards",
          "Global Organic Textile Standard (GOTS) or OEKO-TEX Standard 100 / Made in Green"
        ],
        correct: 3,
        correctExplanation: "GOTS and OEKO-TEX certifications ensure textiles meet rigorous organic farming, chemical safety, and ethical labor standards throughout the supply chain.",
        incorrectExplanation: "Incorrect. Virgin polyester sheds microplastics; unmonitored sweatshops violate human rights; heavy metal dyes are toxic.",
        optionFeedback: [
          "Incorrect. Heavy metal dyes are toxic to skin and pollute waterways.",
          "Incorrect. Virgin polyester is petroleum-derived and sheds persistent microplastics.",
          "Incorrect. Exploitative labor practices violate human rights and corporate procurement codes.",
          "Correct! GOTS and OEKO-TEX verify organic cultivation, fair labor standards, and strict chemical safety throughout textile manufacturing."
        ]
      },
      {
        order: 8,
        question: "Asset Lifecycle (Total Cost of Ownership TCO Analysis): How does implementing total cost of ownership (TCO) evaluation in procurement prevent the hidden long-term costs of cheap, inefficient equipment?",
        options: [
          "TCO evaluates purchase price plus lifetime energy, water, maintenance, and disposal costs, demonstrating that efficient equipment is cheaper over its operating lifecycle",
          "TCO focuses exclusively on the initial invoice discount and ignores all operating costs",
          "TCO requires companies to pay triple the price for low-quality equipment",
          "TCO prohibits purchasing any equipment that uses electricity"
        ],
        correct: 0,
        correctExplanation: "Total Cost of Ownership (TCO) includes purchase price, utility operating costs, maintenance, and end-of-life disposal, ensuring long-term financial and environmental optimization.",
        incorrectExplanation: "Incorrect. Focusing only on upfront invoice price ignores ongoing utility and repair expenses that dominate equipment lifecycle costs.",
        optionFeedback: [
          "Correct! TCO analysis factors in utility consumption, maintenance reliability, and lifespan, proving that energy-efficient equipment delivers superior financial return.",
          "Incorrect. Focusing only on upfront invoice price ignores ongoing utility and repair costs.",
          "Incorrect. TCO optimizes financial efficiency over the entire asset lifecycle.",
          "Incorrect. TCO applies to all asset types to identify the most cost-effective solution."
        ]
      }
    ]
  },

  // 11. ELH-46 (ID: 746) - Eco-Tourism & Marine Biodiversity Protection (8 Questions)
  {
    courseId: 746,
    courseCode: "ELH-46",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Mooring Protocols (Eco-Mooring Buoys vs Anchor Damage): A coastal resort operates boat excursions near sensitive coral reefs. What operational mooring practice is mandatory to prevent coral destruction?",
        options: [
          "Installing and using designated permanent eco-mooring buoys instead of dropping metal anchors onto live coral heads",
          "Dropping heavy iron claw anchors directly into dense branching coral gardens",
          "Dragging boat anchors across the reef to test anchor hold strength",
          "Tying boats to sea turtles and manta rays"
        ],
        correct: 0,
        correctExplanation: "Anchor damage is a leading cause of localized coral destruction; permanent eco-mooring buoys eliminate anchor dropping on live reefs.",
        incorrectExplanation: "Incorrect. Metal anchors and chains shatter delicate coral heads; harming marine wildlife violates international conservation treaties.",
        optionFeedback: [
          "Correct! Permanent mooring buoys anchored in sandy substrate prevent anchor chains from shattering centuries-old coral structures.",
          "Incorrect. Metal anchors cause devastating physical fragmentation to live coral colonies.",
          "Incorrect. Dragging anchors pulverizes coral reef habitats.",
          "Incorrect. Harming marine wildlife violates international conservation treaties."
        ]
      },
      {
        order: 2,
        question: "Wildlife Navigation (Marine Mammal Approach Guidelines): Resort marine guides conduct dolphin-watching excursions. According to international marine wildlife guidelines, what navigation protocol must boat captains follow?",
        options: [
          "Chase pods at maximum throttle to force dolphins to jump for guest photos",
          "Maintain a minimum distance of 50–100 meters, travel at slow no-wake speed, never cut across animal paths, and limit encounter duration to 20–30 minutes",
          "Surround a mother dolphin and calf with multiple speedboats to prevent them from diving",
          "Throw leftover banquet food into the water to attract apex sharks"
        ],
        correct: 1,
        correctExplanation: "Responsible marine wildlife viewing mandates minimum approach buffers, low speeds, and non-intrusive parallel navigation to prevent animal distress and injury.",
        incorrectExplanation: "Incorrect. Chasing animals or trapping pods causes severe distress and vessel strikes; feeding wild predators disrupts natural foraging.",
        optionFeedback: [
          "Incorrect. Chasing animals causes severe distress, disorientation, and vessel strike injuries.",
          "Correct! Responsible wildlife watching requires maintaining safe approach distances, parallel cruising, no-wake speeds, and strict time limits to avoid stressing marine mammals.",
          "Incorrect. Trapping or surrounding mothers and calves disrupts nursing and breathing.",
          "Incorrect. Feeding wild marine predators disrupts natural hunting behaviors and increases safety risks."
        ]
      },
      {
        order: 3,
        question: "Snorkel Briefings (Reef-Safe Sunscreens & No-Touch Codes): A resort dive center provides pre-snorkel briefings. Which behavioral rules are essential to protect the shallow lagoon ecosystem?",
        options: [
          "Advise guests to apply heavy chemical sunscreens containing oxybenzone and octinoxate right before jumping into the reef",
          "Encourage guests to break off coral branches as free souvenirs",
          "Never stand on, kick, or touch live coral; use reef-safe mineral sunscreen (non-nano zinc oxide/titanium dioxide); and do not feed fish or collect shells",
          "Instruct guests to throw plastic cups into the ocean to create artificial fish habitats"
        ],
        correct: 2,
        correctExplanation: "Pre-excursion briefings establish clear environmental codes: avoiding coral physical contact, using mineral-based sunscreens, and prohibiting wildlife feeding.",
        incorrectExplanation: "Incorrect. Breaking coral destroys living colonies; oxybenzone bleaches coral larvae; plastic waste causes severe marine toxicity.",
        optionFeedback: [
          "Incorrect. Oxybenzone and octinoxate bleach coral larvae and disrupt marine endocrine systems.",
          "Incorrect. Breaking coral destroys living organisms and violates environmental law.",
          "Correct! Snorkel briefings emphasizing no-touch protocols, reef-safe mineral sunscreens, and no feeding protect delicate reef structures and water quality.",
          "Incorrect. Plastic waste causes severe marine ingestion, entanglement, and toxicity."
        ]
      },
      {
        order: 4,
        question: "Coastal Lighting Management (Turtle Nesting Disorientation): An island resort conducts turtle nesting monitoring on its beachfront. What coastal lighting management protocol must be enforced during nesting season?",
        options: [
          "Build concrete seawalls across all natural nesting dunes",
          "Install high-powered stadium floodlights pointed directly at the water to illuminate turtles",
          "Set off fireworks every evening on the beach",
          "Shield, dim, or turn off exterior beachfront lights and use low-wavelength amber/red LED lighting to prevent disorienting nesting females and hatchlings"
        ],
        correct: 3,
        correctExplanation: "Turtle-friendly lighting utilizes low-glare, long-wavelength amber/red LEDs and fixture shielding to prevent nocturnal disorientation of nesting females and hatchlings.",
        incorrectExplanation: "Incorrect. White stadium lights and fireworks disorient and kill hatchlings; seawalls destroy natural nesting dunes.",
        optionFeedback: [
          "Incorrect. Concrete seawalls destroy natural sandy nesting habitats.",
          "Incorrect. Bright white floodlights cause severe disorientation and mortality in hatchlings.",
          "Incorrect. Fireworks create intense noise and light disturbance that drives away nesting females.",
          "Correct! Sea turtle hatchlings navigate toward the ocean using natural moonlight; artificial white light disorients them toward roads and predators."
        ]
      },
      {
        order: 5,
        question: "Marine Protected Areas (Spillover Effect & Biodiversity Recovery): What is the primary ecological benefit of a resort establishing a designated voluntary no-take marine reserve fronting its property?",
        options: [
          "It allows the hotel to charge fish for swimming in the lagoon",
          "It provides a nursery habitat where fish stocks and coral biomass recover and spill over into adjacent community fishing zones, enhancing regional biodiversity",
          "It makes the seawater turn into freshwater",
          "It eliminates all tides and ocean waves"
        ],
        correct: 1,
        correctExplanation: "Marine reserves protect breeding grounds, resulting in increased fish biomass, larger breeding adults, and spillover benefits for local coastal fisheries.",
        incorrectExplanation: "Incorrect. Marine reserves protect breeding biomass and foster spillover; they do not alter salinity or tidal mechanics.",
        optionFeedback: [
          "Incorrect. MPAs protect wildlife and ecosystems without commercial absurdity.",
          "Correct! No-take marine reserves allow depleted fish populations to mature and reproduce, creating a 'spillover effect' that replenishes neighboring artisanal fisheries.",
          "Incorrect. Marine reserves protect biodiversity; they do not alter ocean salinity.",
          "Incorrect. Marine reserves have no impact on celestial tidal cycles."
        ]
      },
      {
        order: 6,
        question: "Marine Construction Safeguards (EIA Silt Curtains & Pylon Siting): A resort plans overwater bungalows and a guest jetty. What environmental impact assessment (EIA) mitigation must be implemented during marine construction?",
        options: [
          "Dump wet concrete slurry directly into live coral gardens",
          "Dredge the entire lagoon with explosives to create a smooth swimming pool",
          "Deploy silt curtains to contain sediment plumes, schedule pile driving outside marine mammal breeding seasons, and avoid direct placement on seagrass or coral beds",
          "Conduct construction secretly at night without environmental permits"
        ],
        correct: 2,
        correctExplanation: "Marine construction requires stringent environmental safeguards, including turbidity curtains, acoustic buffers, and avoidance of critical benthic habitats.",
        incorrectExplanation: "Incorrect. Explosive dredging destroys reefs; dumping slurry smothers marine life; unpermitted work violates national laws.",
        optionFeedback: [
          "Incorrect. Concrete slurry raises pH and smothers benthic marine life.",
          "Incorrect. Explosive dredging destroys entire lagoon ecosystems and causes catastrophic erosion.",
          "Correct! Silt curtains prevent turbidity from smothering corals, while careful pylon positioning avoids sensitive seagrass and coral habitats.",
          "Incorrect. Unpermitted construction violates national environmental legislation."
        ]
      },
      {
        order: 7,
        question: "Blue Carbon Ecosystems (Mangroves & Seagrass Carbon Sequestration): Why are coastal mangrove forests and seagrass meadows considered vital 'blue carbon' ecosystems for island resorts?",
        options: [
          "They consume all oxygen from the atmosphere",
          "They produce toxic gases that drive away tourists",
          "They are invasive weeds that must be paved over with concrete",
          "They sequester carbon up to 10 times faster per hectare than terrestrial tropical forests, while providing storm surge protection, water filtration, and fish nursery habitats"
        ],
        correct: 3,
        correctExplanation: "Blue carbon coastal ecosystems sequester vast amounts of organic carbon in their soils and provide essential shoreline protection and marine biodiversity habitats.",
        incorrectExplanation: "Incorrect. Mangroves and seagrasses are vital native ecosystems that filter water, protect coasts from erosion, and sequester carbon.",
        optionFeedback: [
          "Incorrect. Marine plants are essential oxygen producers and carbon sinks.",
          "Incorrect. Mangroves and seagrasses support clean water, rich marine life, and coastal protection.",
          "Incorrect. Paving coastal wetlands destroys vital fish nurseries and accelerates beach erosion.",
          "Correct! Mangroves and seagrasses are potent blue carbon sinks, trap terrestrial sediments, filter runoff, and provide critical coastal barrier defense against cyclones."
        ]
      },
      {
        order: 8,
        question: "Scientific Coral Propagation (Corals of Opportunity & Resilient Nurseries): A resort partners with marine biologists on a coral nursery project. How should the resort ensure the project follows scientific best practices?",
        options: [
          "Use thermally resilient 'corals of opportunity' (naturally broken fragments), maintain scientific monitoring records, and avoid introducing non-native invasive species",
          "Buy plastic artificial corals and glue them onto living reefs",
          "Harvest healthy wild colonies from pristine reefs to populate the resort nursery",
          "Pour bleach into the nursery to keep the coral clean of algae"
        ],
        correct: 0,
        correctExplanation: "Scientifically robust coral restoration propagates resilient fragments of opportunity, monitors growth and survivorship, and avoids damaging wild donor colonies.",
        incorrectExplanation: "Incorrect. Plastic structures cannot replicate living biology; harvesting wild colonies damages donor reefs; bleach is a lethal biocide.",
        optionFeedback: [
          "Correct! Scientific coral restoration propagates naturally detached fragments exhibiting heat resilience and monitors genetic diversity and survival rates.",
          "Incorrect. Artificial plastic structures cannot replicate living biological reef functions.",
          "Incorrect. Harvesting healthy wild colonies damages pristine donor reefs.",
          "Incorrect. Bleach is a lethal biocide that kills corals and all marine organisms."
        ]
      }
    ]
  },

  // 12. ELH-47 (ID: 811) - Green Leases & Tenant Sustainability Engagement (8 Questions)
  {
    courseId: 811,
    courseCode: "ELH-47",
    passingScore: 80,
    questions: [
      {
        order: 1,
        question: "Commercial Leasing Dilemma (Split-Incentive Alignment): In commercial property management, what is the 'split-incentive' barrier and how does an enforceable Green Lease clause overcome it?",
        options: [
          "Landlords pay capital costs for energy retrofits while tenants receive utility savings; resolved by cost-recovery clauses where tenants share verified energy savings to amortize capital",
          "Tenants split their monthly rent in half without landlord authorization",
          "Elevators stop in between floors during power cuts",
          "Landlords charge tenants for outdoor sunshine"
        ],
        correct: 0,
        correctExplanation: "The split-incentive barrier occurs when the investor (landlord) does not receive the operational benefit (utility savings); green leases align incentives through capital cost-recovery mechanisms.",
        incorrectExplanation: "Incorrect. Unilateral rent reduction is a lease default; elevator failure is mechanical; green leases align financial capital with operational utility savings.",
        optionFeedback: [
          "Correct! Green leases resolve the split-incentive dilemma by allowing landlords to recover capital investments through verified utility bill savings achieved by the tenant.",
          "Incorrect. Unilateral rent reduction is a lease default, not the split-incentive barrier.",
          "Incorrect. Elevator failure is a mechanical building issue.",
          "Incorrect. Sunshine charges do not exist in commercial leasing."
        ]
      },
      {
        order: 2,
        question: "Data Transparency (Automated Utility Data Sharing Clauses): A commercial landlord drafts a Green Lease energy data sharing clause. What obligation does this clause establish for the tenant and landlord?",
        options: [
          "Tenants must give their bank login passwords to the landlord",
          "Mutual automated sharing of monthly utility consumption data (electricity, water, gas, waste) and sub-meter readings to benchmark building carbon emissions",
          "Landlords can spy on tenant employee emails",
          "Tenants must turn off their computer servers every afternoon at 14:00"
        ],
        correct: 1,
        correctExplanation: "Data sharing clauses mandate exchange of anonymized utility, sub-meter, and waste data essential for ESG reporting, carbon accounting, and efficiency benchmarking.",
        incorrectExplanation: "Incorrect. Banking passwords and employee emails are private; arbitrary operational shutdowns are not part of green leases.",
        optionFeedback: [
          "Incorrect. Financial passwords and banking details are private and excluded from green lease data.",
          "Correct! Data transparency clauses mandate sharing energy, water, and waste metrics to enable building benchmarking, GRESB/ESG reporting, and efficiency tracking.",
          "Incorrect. Employee communications are protected by privacy laws.",
          "Incorrect. Green leases do not impose arbitrary operational shutdowns on commercial tenants."
        ]
      },
      {
        order: 3,
        question: "Fit-Out Guidelines (Sustainable Materials & Lighting Power Limits): A retail tenant plans a store fit-out in a shopping center. What requirement in the Sustainable Fit-Out Guide ensures energy and indoor environmental quality (IEQ) compliance?",
        options: [
          "Forbidding the tenant from installing any lighting in the store",
          "Requiring the tenant to install incandescent spotlights and open solvent cans",
          "Mandatory sub-metering, high-efficiency LED lighting with low Lighting Power Density (LPD), low-VOC adhesives and paints, and FSC-certified timber",
          "Allowing tenants to dump construction demolition waste into the storm drain"
        ],
        correct: 2,
        correctExplanation: "Sustainable fit-out guides establish mandatory standards for sub-metering, LED lighting power limits, certified materials, and low-VOC paints and adhesives.",
        incorrectExplanation: "Incorrect. Incandescent spotlights and toxic solvents violate codes; dumping construction waste in storm drains is illegal.",
        optionFeedback: [
          "Incorrect. Fit-out guides regulate lighting efficiency, not lighting elimination.",
          "Incorrect. Incandescent spotlights and open toxic solvents violate energy and safety codes.",
          "Correct! Sustainable fit-out criteria mandate sub-metering, efficient LED lighting limits, non-toxic low-VOC materials, and certified sustainable timber.",
          "Incorrect. Dumping construction waste in storm drains is illegal."
        ]
      },
      {
        order: 4,
        question: "Joint Governance (Landlord-Tenant Green Committees): What is the primary function of a joint Landlord-Tenant Green Committee established under a commercial green lease?",
        options: [
          "A committee dedicated to blocking all building maintenance repairs",
          "A court where the landlord issues criminal fines to tenant employees",
          "A social club that organizes mandatory weekly golf tournaments",
          "A collaborative governance forum that meets quarterly to review building resource consumption, coordinate waste diversion, and plan joint energy efficiency initiatives"
        ],
        correct: 3,
        correctExplanation: "Landlord-Tenant Green Committees govern shared building resource targets, review sub-meter data, coordinate recycling streams, and plan joint sustainability campaigns.",
        incorrectExplanation: "Incorrect. Green committees are collaborative operational forums, not criminal courts or obstructive bodies.",
        optionFeedback: [
          "Incorrect. Green committees facilitate and optimize maintenance, not obstruct it.",
          "Incorrect. Green committees are collaborative operational forums, not criminal courts.",
          "Incorrect. Social entertainment is secondary to operational resource governance.",
          "Correct! Green Committees provide structured operational governance where building management and tenants review performance data and collaborate on shared ESG goals."
        ]
      },
      {
        order: 5,
        question: "Operational Scheduling (Zoned After-Hours HVAC Activation): An office tenant requests air conditioning on weekends. Under a Green Lease operational schedule clause, how should after-hours HVAC be billed and managed?",
        options: [
          "The landlord must run the 1,000-ton central plant to chill the entire empty 40-story building for one person",
          "After-hours HVAC is requested via digital tenant portal, zoned only to the specific occupied floor/suite, and billed at direct marginal utility and maintenance cost",
          "After-hours access is prohibited and violators are locked in the lobby",
          "The tenant must pay 100% of the entire building annual electric bill for 2 hours of overtime"
        ],
        correct: 1,
        correctExplanation: "Green lease after-hours clauses require digitized, zone-specific HVAC activation and fair cost-reflective billing, preventing wasteful whole-building cooling for small overtime needs.",
        incorrectExplanation: "Incorrect. Whole-building conditioning for one suite is extremely wasteful; excessive punitive billing breaches lease fairness.",
        optionFeedback: [
          "Incorrect. Chilling an entire unoccupied building for an isolated suite causes severe energy waste.",
          "Correct! Zoned after-hours HVAC controls with transparent marginal sub-metered billing prevent conditioning empty floors while accommodating tenant flexibility.",
          "Incorrect. Commercial leases must provide flexible access with fair operating terms.",
          "Incorrect. Billing must reflect reasonable, verified marginal energy and maintenance costs."
        ]
      },
      {
        order: 6,
        question: "Sub-Metering Accountability (Ending Pro-Rata Utility Free-Riders): How does installing dedicated electrical and water sub-meters for individual tenant demised premises support energy conservation?",
        options: [
          "It disconnects electricity randomly whenever tenants use computers",
          "It increases utility bills by 500% for all tenants automatically",
          "It replaces unfair pro-rata square-meter billing with actual usage billing, creating direct financial accountability and incentives for tenants to conserve resources",
          "It eliminates the need for the building to have a municipal utility meter"
        ],
        correct: 2,
        correctExplanation: "Sub-metering establishes direct operational and financial accountability, motivating tenants to reduce consumption since savings directly reduce their utility expenses.",
        incorrectExplanation: "Incorrect. Sub-metering measures actual consumption accurately without artificial markups or circuit interruptions.",
        optionFeedback: [
          "Incorrect. Sub-meters measure power without interrupting circuits.",
          "Incorrect. Sub-metering measures actual consumption accurately without artificial markups.",
          "Correct! Sub-metering ends the 'free-rider' problem of square-footage apportioned utility bills, empowering tenants to see the direct financial savings of their energy conservation.",
          "Incorrect. Master utility meters remain at the building grid boundary."
        ]
      },
      {
        order: 7,
        question: "Green Building Valuation (LEED/BREEAM Asset Benefits): A commercial landlord achieves an internationally recognized green building certification (e.g., LEED Platinum, BREEAM Outstanding). How does this benefit both landlord and tenants?",
        options: [
          "The landlord can double rent without providing maintenance services",
          "The building becomes immune to physical gravity",
          "Tenants are legally forbidden from using computers or lighting",
          "Lower operational utility costs, superior indoor air quality and occupant wellness, reduced vacancy rates, higher asset valuation, and verified corporate ESG alignment"
        ],
        correct: 3,
        correctExplanation: "Certified green buildings deliver measurable benefits: lower utility overheads, improved occupant cognitive performance and air quality, and strong ESG credentials.",
        incorrectExplanation: "Incorrect. Certified buildings operate under professional commissioning and maintenance standards, reducing overheads and enhancing indoor environment.",
        optionFeedback: [
          "Incorrect. Certified buildings operate under professional commissioning and maintenance standards.",
          "Incorrect. Green building certifications adhere to standard laws of physics.",
          "Incorrect. High-performance buildings support productive, healthy tenant operations.",
          "Correct! Green building certifications demonstrate lower operating costs, enhanced indoor environmental health, tenant talent retention, and institutional ESG asset value."
        ]
      },
      {
        order: 8,
        question: "Circular Decommissioning (Make-Good Fixture Reuse & Recycling): During a lease exit audit, a property manager inspects a tenant's vacated floor. What 'make-good' requirement under a circular green lease prevents demolition waste?",
        options: [
          "Encourage retention or modular reuse of high-quality architectural fixtures, glazed partitions, and raised floors, while mandating certified recycling of discarded materials",
          "Mandate that all reusable walls and pristine fixtures be smashed with sledgehammers and thrown into a landfill",
          "Leave construction hazardous waste piled in the elevator shafts",
          "Paint all walls with toxic lead paint before handing over keys"
        ],
        correct: 0,
        correctExplanation: "Circular decommissioning clauses promote the retention, resale, or recycling of reusable fit-out components, avoiding wasteful strip-to-shell demolitions.",
        incorrectExplanation: "Incorrect. Sledgehammer demolition of reusable fit-outs creates tons of waste; hazardous waste must be professionally remediated.",
        optionFeedback: [
          "Correct! Circular make-good clauses preserve sound architectural elements for incoming tenants and mandate high diversion rates for all stripped-out materials.",
          "Incorrect. Sledgehammer demolition of reusable fit-outs is a major source of commercial real estate waste.",
          "Incorrect. Hazardous waste must be professionally remediated and disposed of safely.",
          "Incorrect. Applying toxic lead paint violates health, safety, and lease handover rules."
        ]
      }
    ]
  }
];

export async function ensureCohort15_2_10DRemediation(): Promise<void> {
  try {
    const [existingSeed] = await db
      .select()
      .from(systemSeedsTable)
      .where(eq(systemSeedsTable.name, "sprint-15-2-10d-assessment-remediation"))
      .limit(1);

    if (existingSeed && (existingSeed.version ?? 1) >= 2) {
      logger.info("Sprint 15.2.10D Controlled Assessment Quality Remediation (v2 balanced keys) already applied. Skipping runtime rewrite.");
      return;
    }

    await db.transaction(async (tx) => {
      for (const courseData of COHORT_15_2_10D_DATA) {
        const { courseId, courseCode, passingScore, questions } = courseData;

        // 1. Update passing score and bump version if v1
        const course = await tx.query.coursesTable.findFirst({
          where: eq(coursesTable.id, courseId),
        });

        const newVersion = course && course.version < 2 ? 2 : (course?.version ?? 2);

        await tx
          .update(coursesTable)
          .set({
            passingScore,
            version: newVersion,
            updatedAt: new Date(),
          })
          .where(eq(coursesTable.id, courseId));

        // 2. Update questions in-place (preserving question IDs for historical attempts) or insert if count differs
        const existingQs = await tx
          .select()
          .from(quizQuestionsTable)
          .where(eq(quizQuestionsTable.courseId, courseId));
        const activeExisting = existingQs
          .filter((eqRow) => !eqRow.isArchived)
          .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0) || a.id - b.id);

        if (activeExisting.length === questions.length) {
          for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const targetRow = activeExisting[i];
            await tx
              .update(quizQuestionsTable)
              .set({
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
              })
              .where(eq(quizQuestionsTable.id, targetRow.id));
          }
        } else {
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
        }

        logger.info({ courseId, courseCode, count: questions.length }, "Remediated course assessment with complete option-level feedback and scenarios.");
      }

      // Record seed version
      await tx
        .insert(systemSeedsTable)
        .values({
          name: "sprint-15-2-10d-assessment-remediation",
          version: 2,
        })
        .onConflictDoUpdate({
          target: systemSeedsTable.name,
          set: { version: 2, runAt: new Date() },
        });

      logger.info("Sprint 15.2.10D Controlled Assessment Quality Remediation transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute Sprint 15.2.10D assessment remediation");
    throw err;
  }
}
