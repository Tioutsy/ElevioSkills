import {
  db,
  coursesTable,
  quizQuestionsTable,
  systemSeedsTable,
} from "@workspace/db";
import { eq, inArray } from "drizzle-orm";
import { logger } from "./logger.js";
import { SPRINT_15_2_10F_COHORT, SPRINT_15_2_10F_COHORT_COURSE_IDS } from "./courseAssessmentCohort15_2_10F.js";

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

export const COHORT_15_2_10F_DATA: CohortCourseRemediationData[] = [
  {
    "courseId": 749,
    "courseCode": "ELH-60",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Workplace Scenario (Industrial Motor Sizing & Load Factor): An energy engineer audits an industrial manufacturing plant and notes a 75 kW induction motor operating continuously at a 28% load factor to drive a wastewater slurry pump. Electrical measurements confirm high reactive power consumption and poor power factor. What is the most energy-efficient long-term engineering solution?",
        "options": [
          "Downsize the motor to an appropriately sized 22 kW or 30 kW IE4 Super Premium efficiency motor matched to the actual operational load profile",
          "Rewind the existing 75 kW motor repeatedly to reduce capital procurement expenditure",
          "Install a massive resistive heating load in parallel with the motor to burn off excess voltage",
          "Run the 75 kW motor at double the rated utility frequency to increase mechanical loading"
        ],
        "correct": 0,
        "correctExplanation": "Electric motors operating severely under-loaded (<40% load factor) suffer dramatic efficiency and power factor drops. Downsizing to a correctly sized IE4 motor optimizes operating efficiency and power factor.",
        "incorrectExplanation": "Incorrect. Severely oversized motors waste substantial electrical energy and degrade power factor. Downsizing to a right-sized premium efficiency unit is required.",
        "optionFeedback": [
          "Correct! Downsizing to a right-sized IE4 motor operates near optimal peak efficiency (75-90% load factor) while reducing electrical losses.",
          "Incorrect. Rewinding degraded motors often reduces electrical efficiency by 1-2% per cycle.",
          "Incorrect. Resistive loads waste electrical power as useless heat and increase utility bills.",
          "Incorrect. Over-frequency operation exceeds motor mechanical limits and accelerates winding failure."
        ]
      },
      {
        "order": 2,
        "question": "Engineering Calculation (Variable Frequency Drive Affinity Laws): A plant operates a centrifugal process cooling pump with mechanical throttling valves to restrict flow to 70% of nominal design capacity. If the mechanical throttle is removed and a VFD is installed to reduce motor speed to 70%, what is the expected theoretical power consumption according to the affinity laws?",
        "options": [
          "Power consumption drops by exactly 30% linearly proportional to pump speed",
          "Power consumption drops to approximately 34.3% (0.70 cubed) of nominal baseline power",
          "Power consumption remains completely unchanged because pump impeller diameter is constant",
          "Power consumption increases due to electrical inverter switching losses"
        ],
        "correct": 1,
        "correctExplanation": "According to the pump affinity laws, brake horsepower is proportional to the cube of rotational speed (P2 = P1 * (N2/N1)^3). At 70% speed, power drops to 0.7^3 = 0.343 (approx. 34.3% of full load).",
        "incorrectExplanation": "Incorrect. Throttling creates artificial frictional head loss, whereas VFD speed control reduces pump power consumption by the cube of the speed ratio.",
        "optionFeedback": [
          "Incorrect. Linear reduction applies only to pump flow rate, not power consumption.",
          "Correct! The cubic affinity law for centrifugal pumps demonstrates that reducing speed to 70% drops required theoretical power to 34.3%, saving over 65% energy.",
          "Incorrect. Speed reduction significantly diminishes hydronic head and fluid power requirements.",
          "Incorrect. While inverter harmonics create 2-3% parasitic losses, net pump electrical consumption decreases dramatically."
        ]
      },
      {
        "order": 3,
        "question": "Maintenance Practice (Transmission Belt Alignment & Tensioning): During an energy audit of industrial conveyor systems, an auditor observes standard wrapped V-belts operating with visible slack and dust buildup. What operational upgrade delivers the fastest energy payback?",
        "options": [
          "Lubricate the rubber V-belt surfaces with machine grease to reduce frictional resistance",
          "Tighten the belts past manufacturer ratings until the motor shaft bends",
          "Replace standard V-belts with precision cogged/synchronous belts and laser-align pulleys to eliminate slippage and friction losses",
          "Remove all belts and connect conveyor rollers directly to utility electrical wires"
        ],
        "correct": 2,
        "correctExplanation": "Standard V-belts experience continuous slip and frictional heat loss (up to 5-8% efficiency loss). Cogged and synchronous belts maintain positive engagement and laser alignment, recovering 2-4% in energy efficiency.",
        "incorrectExplanation": "Incorrect. Slipping V-belts waste electrical energy as friction and heat. Precision cogged belts and laser alignment eliminate belt slip.",
        "optionFeedback": [
          "Incorrect. Greasing belts destroys rubber polymers and causes catastrophic drive slippage.",
          "Incorrect. Overtensioning causes severe bearing overheating and catastrophic shaft shear.",
          "Correct! Cogged belts flex easily around pulleys with minimal internal friction, and laser alignment prevents 2-4% drive energy losses.",
          "Incorrect. Mechanical conveyors require physical torque transmission components, not electrical contact."
        ]
      },
      {
        "order": 4,
        "question": "Energy Audit Methodology (ISO 50002 / EN 16247 Scope): When conducting a Type II / Level 2 industrial motor systems energy audit, what data collection step is mandatory before recommending capital replacements?",
        "options": [
          "Estimate operating hours solely by interviewing security guards at the main entrance gate",
          "Assume all facility motors run at 100% full nameplate load 8,760 hours per year without logging",
          "Rely entirely on equipment manufacturer brochures printed ten years ago",
          "Install calibrated multi-channel power data loggers to measure true RMS voltage, current, power factor, and operating duty cycles over representative production cycles"
        ],
        "correct": 3,
        "correctExplanation": "Industrial energy audits require measured empirical operational data (kW, kVA, power factor, operating hours) over representative production shifts to evaluate actual loading profiles and accurate investment payback.",
        "incorrectExplanation": "Incorrect. Audits must establish empirical baselines using calibrated data loggers rather than unsupported estimates or nameplate assumptions.",
        "optionFeedback": [
          "Incorrect. Subjective estimates fail to meet ISO 50002 audit measurement and verification criteria.",
          "Incorrect. Motors rarely operate at 100% full nameplate load continuously; logging is essential.",
          "Incorrect. Historical brochures do not reflect actual on-site mechanical wear or operational duty cycles.",
          "Correct! Calibrated true RMS power logging captures peak demand, cycling, and operating duty cycles essential for financial business cases."
        ]
      },
      {
        "order": 5,
        "question": "Operational Optimization (Power Factor Correction): An industrial manufacturing facility incurs heavy utility financial penalties for a measured plant-wide power factor of 0.78 lagging caused by dozens of induction motors. What is the most cost-effective corrective action?",
        "options": [
          "Install automatic switched capacitor banks or active harmonic power factor correction units near main switchboards to bring power factor above 0.95 lagging",
          "Replace the utility billing meter with an uncalibrated private sub-meter",
          "Disconnect all ground wires from electrical distribution panels",
          "Switch all three-phase industrial machinery to single-phase household generators"
        ],
        "correct": 0,
        "correctExplanation": "Induction motors draw reactive magnetizing current (kVAR). Automatic capacitor banks supply local reactive power, raising plant power factor above 0.95 and eliminating utility low-power-factor penalties.",
        "incorrectExplanation": "Incorrect. Reactive magnetizing current must be compensated using capacitor banks or active harmonic filters rather than tampering with utility equipment.",
        "optionFeedback": [
          "Correct! Switched capacitor banks provide local reactive kVAR compensation, unloading transformers and eliminating utility penalties.",
          "Incorrect. Tampering with utility metering is fraudulent and illegal.",
          "Incorrect. Disconnecting grounding creates lethal electrical shock and catastrophic fire hazards.",
          "Incorrect. Single-phase generation is wildly inefficient and incapable of running heavy three-phase industrial loads."
        ]
      },
      {
        "order": 6,
        "question": "Predictive Maintenance (Vibration Analysis & Thermography): During quarterly predictive maintenance, thermographic scanning of an 110 kW extruder drive reveals bearing housing temperatures 35°C above adjacent baseline units, and vibration spectrum analysis detects severe 1X rotational harmonics. What should the maintenance supervisor do?",
        "options": [
          "Wait for the bearing to seize completely during peak production before inspecting",
          "Schedule immediate maintenance to check shaft alignment, lubrication quality, and bearing wear during the next planned downtime window",
          "Spray water directly into the electrical motor junction box to cool the casing",
          "Increase motor speed by 50% to force the bearing to smooth out mechanical burrs"
        ],
        "correct": 1,
        "correctExplanation": "High bearing temperatures and 1X vibration harmonics indicate mechanical misalignment, unbalance, or lubrication failure. Scheduling planned corrective maintenance prevents catastrophic bearing seizure and unmanaged downtime.",
        "incorrectExplanation": "Incorrect. Thermographic and vibration anomalies signify imminent mechanical failure requiring immediate scheduled intervention.",
        "optionFeedback": [
          "Incorrect. Waiting for catastrophic seizure causes severe secondary rotor/stator damage and unmanaged production stoppages.",
          "Correct! Addressing thermal and vibration anomalies during planned downtime prevents motor burnout and saves substantial replacement costs.",
          "Incorrect. Spraying water onto energized electrical enclosures causes lethal arc flash and short-circuits.",
          "Incorrect. Increasing speed accelerates catastrophic bearing destruction."
        ]
      },
      {
        "order": 7,
        "question": "Compressed Air / Motor Integration (Intelligent Staging & Receiver Storage): An industrial plant operates three 55 kW fixed-speed rotary screw air compressors. The pressure band fluctuates erratically between 6.5 and 8.0 bar, causing frequent compressor unloaded idling. How can energy consumption be immediately minimized?",
        "options": [
          "Widen the pressure band to 10.0 bar so compressors stay pressurized indefinitely",
          "Vent all compressed air directly to the atmosphere to cool the compressor room",
          "Install a master sequencing controller and adequate wet/dry air receiver storage to match generation to demand, and convert the trim unit to variable speed (VSD)",
          "Disconnect all pressure sensors and operate all three compressors at continuous full load"
        ],
        "correct": 2,
        "correctExplanation": "Unloaded fixed-speed screw compressors still consume 25-40% of full-load electrical power while producing zero air. Master sequencing with a dedicated VSD trim compressor and proper receiver volume minimizes unloaded idling losses.",
        "incorrectExplanation": "Incorrect. Unloaded compressor idling is a major source of electrical waste; master sequencing and VSD trim modulation eliminate this loss.",
        "optionFeedback": [
          "Incorrect. Increasing pressure by 1 bar increases compressor electrical power consumption by approximately 7%.",
          "Incorrect. Venting compressed air wastes expensive generated pneumatic energy.",
          "Correct! Master sequencing with a VSD trim compressor prevents wasteful unloaded idling and maintains a narrow, efficient pressure band.",
          "Incorrect. Continuous unmodulated full-load operation wastes enormous amounts of electricity."
        ]
      },
      {
        "order": 8,
        "question": "Energy Performance Indicators (ISO 50001 EnPI Tracking): What is the most appropriate Energy Performance Indicator (EnPI) for evaluating motor systems efficiency in a plastics blow-molding manufacturing plant?",
        "options": [
          "Total facility utility bill cost divided by the number of employee parking spaces",
          "Number of maintenance work orders closed per calendar quarter",
          "Specific electrical energy consumption expressed as kilowatt-hours per ton of saleable plastic output (kWh/ton), normalized for ambient temperature and production volume",
          "Total nameplate horsepower of all installed electrical motors on site"
        ],
        "correct": 3,
        "correctExplanation": "Normalizing electrical consumption against production volume (e.g., kWh per ton of good product) provides an objective, regression-adjusted metric to track energy intensity improvements under ISO 50001.",
        "incorrectExplanation": "Incorrect. Valid EnPIs must correlate actual energy consumption to primary production drivers (e.g., kWh per ton of output).",
        "optionFeedback": [
          "Incorrect. Parking spaces bear zero thermodynamic or operational relationship to plant energy performance.",
          "Incorrect. Maintenance ticket volume does not measure kilowatt-hour energy efficiency.",
          "Incorrect. Total installed nameplate capacity is a static inventory number, not an operational performance metric.",
          "Correct! Specific energy consumption (kWh/ton) normalized for production variables provides a robust ISO 50001 performance baseline."
        ]
      }
    ]
  },
  {
    "courseId": 731,
    "courseCode": "ELH-61",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Lean-Green Integration (Environmental Value Stream Mapping - EVSM): How does an Environmental Value Stream Map differ from a traditional Lean Value Stream Map on an industrial production line?",
        "options": [
          "EVSM explicitly tracks material mass balances, water consumption, energy inputs, scrap generation, and hazardous emissions alongside cycle times and work-in-progress (WIP)",
          "EVSM only records financial executive travel expenses across international airline routes",
          "EVSM replaces all engineering drawings with decorative landscape photographs",
          "EVSM eliminates all production time measurements to focus exclusively on tree planting"
        ],
        "correct": 0,
        "correctExplanation": "Environmental Value Stream Mapping (EVSM) overlays resource use, scrap generation, emissions, and energy footprints onto process lead times, highlighting both operational bottlenecks and environmental waste (Muda).",
        "incorrectExplanation": "Incorrect. EVSM integrates resource flows, energy, and emissions tracking directly into the lean manufacturing value stream.",
        "optionFeedback": [
          "Correct! EVSM quantifies material loss, energy intensity, and emissions at each process step alongside traditional lean operational metrics.",
          "Incorrect. EVSM is a shop-floor and plant-level operational mapping tool, not an executive travel ledger.",
          "Incorrect. EVSM utilizes standardized lean engineering symbols and material balance data.",
          "Incorrect. Lead time and takt time remain critical core metrics in lean-green manufacturing."
        ]
      },
      {
        "order": 2,
        "question": "Workplace Scenario (The 7 Mudas + Environmental Waste): In an automotive component factory, operators overproduce stamped metal brackets, creating large buffer inventories that sit in warehouse aisles for weeks, requiring double-handling by diesel forklifts and generating surface rust that must be re-cleaned. What combination of Lean and Green wastes is occurring?",
        "options": [
          "No waste is occurring because high warehouse inventory guarantees customer safety",
          "Overproduction and Transportation waste, driving excessive forklift diesel emissions, floor space utilization, and energy/chemical waste for rust remediation",
          "Motion waste only, with zero impact on energy or materials",
          "Defect waste caused solely by employee absenteeism"
        ],
        "correct": 1,
        "correctExplanation": "Overproduction is the worst Lean Muda because it multiplies subsequent wastes: unnecessary transport (forklift diesel/emissions), excess storage, and defects/scrap from corrosion requiring rework energy.",
        "incorrectExplanation": "Incorrect. Overproduction drives downstream transportation, storage, material degradation, and rework emissions.",
        "optionFeedback": [
          "Incorrect. Excess inventory ties up working capital and causes material degradation and handling emissions.",
          "Correct! Overproduction creates downstream transportation emissions, floor space waste, and material rework chemicals.",
          "Incorrect. Multiple severe environmental and operational wastes are compounding beyond simple motion.",
          "Incorrect. The root cause is a push production schedule generating excess buffer inventory."
        ]
      },
      {
        "order": 3,
        "question": "Operational Practice (5S for Environmental Risk & Chemical Safety): How does the 'Shine / Sweep' (Seiso) pillar of 5S contribute directly to environmental compliance and pollution prevention in a manufacturing workshop?",
        "options": [
          "By painting over toxic oil leaks with white paint so environmental regulators cannot see them",
          "By sweeping all metal chips and solvent rags into the municipal storm drain at the end of the shift",
          "By cleaning equipment thoroughly to inspect for early hydraulic leaks, air line weeping, and chemical drips before they cause ground contamination or energy loss",
          "By discarding all safety data sheets to keep workbench drawers empty"
        ],
        "correct": 2,
        "correctExplanation": "In Lean-Green 5S, 'Shine' is an inspection methodology. Clean machines make hydraulic leaks, pneumatic leaks, and chemical weeping immediately visible before they create ground pollution or severe energy waste.",
        "incorrectExplanation": "Incorrect. Cleaning serves as an active inspection process to identify fluid leaks and abnormal wear before contamination occurs.",
        "optionFeedback": [
          "Incorrect. Concealing leaks violates environmental law and accelerates machine failure.",
          "Incorrect. Sweeping hazardous debris into storm drains causes illegal water contamination.",
          "Correct! Cleaning reveals hydraulic leaks, pneumatic leaks, and containment failures during early stages.",
          "Incorrect. Safety Data Sheets (SDS) are legally mandatory hazard communication documents."
        ]
      },
      {
        "order": 4,
        "question": "Kaizen Methodology (Rapid Improvement Events for Resource Efficiency): A cross-functional Kaizen team aims to reduce solvent wash waste on a commercial paint line. What is the most effective problem-solving sequence under the PDCA (Plan-Do-Check-Act) cycle?",
        "options": [
          "Immediately purchase a multi-million-dollar automated solvent reclamation plant without measuring baseline usage",
          "Ban all painting operations permanently to eliminate solvent requirements",
          "Blame operators for using solvent and issue financial penalties",
          "Measure baseline solvent consumption per batch, map root causes of over-spraying using 5-Whys, pilot standardized flush volume nozzles, and standardize the procedure if data proves waste reduction"
        ],
        "correct": 3,
        "correctExplanation": "PDCA requires empirical baseline measurement (Plan), testing root-cause countermeasures on a pilot scale (Do), verifying data-backed waste reduction (Check), and institutionalizing standard operating procedures (Act).",
        "incorrectExplanation": "Incorrect. Lean problem-solving requires structured root-cause analysis, pilot testing, and data verification (PDCA).",
        "optionFeedback": [
          "Incorrect. Capital expenditure without process understanding frequently automates and hard-codes waste.",
          "Incorrect. Halting operations fails business viability requirements.",
          "Incorrect. Punitive culture suppresses frontline ideas and root-cause identification.",
          "Correct! Systematic PDCA establishes empirical baselines, tests nozzle standards, verifies solvent savings, and updates standard work."
        ]
      },
      {
        "order": 5,
        "question": "Poka-Yoke (Mistake-Proofing for Environmental Controls): A manufacturing plant experiences periodic toxic overflows because operators forget to close the manual transfer valve on an industrial wastewater neutralization tank. What is the best Poka-Yoke countermeasure?",
        "options": [
          "Install an automated high-level liquid sensor interlocked with a spring-return fail-closed solenoid valve and audible strobe alarm",
          "Place a handwritten paper sticky note on the tank wall reminding staff to pay attention",
          "Hire a second operator to stand next to the valve 24 hours a day with a whistle",
          "Remove the wastewater neutralization tank and discharge untreated effluent directly to the river"
        ],
        "correct": 0,
        "correctExplanation": "Poka-Yoke mistake-proofing physically prevents human errors. An automated high-level interlock switch mechanically shuts off fluid transfer before an overflow can physically happen.",
        "incorrectExplanation": "Incorrect. Poka-Yoke relies on engineered interlocks and automatic fail-safes rather than fallible human memory or warning signs.",
        "optionFeedback": [
          "Correct! Hardwired level sensors and fail-closed interlocks physically prevent overflow mistakes from occurring.",
          "Incorrect. Sticky notes and signs rely on human memory and fail to prevent inadvertent oversights.",
          "Incorrect. Adding manual inspection is costly, non-robust, and fails true mistake-proofing principles.",
          "Incorrect. Discharging untreated hazardous wastewater is illegal and causes catastrophic ecological harm."
        ]
      },
      {
        "order": 6,
        "question": "Setup Time Reduction (SMED - Single-Minute Exchange of Die for Scrap Reduction): How does reducing machine changeover time using SMED principles directly eliminate environmental waste on an extrusion line?",
        "options": [
          "By eliminating all quality quality inspection checks during machine changeovers",
          "By pre-heating dies externally and standardizing raw material changeover sequences, dramatically minimizing off-spec purge scrap generated during start-up",
          "By running machines continuously with broken tooling to avoid changeovers entirely",
          "By dumping startup purge polymers directly into the municipal sewer system"
        ],
        "correct": 1,
        "correctExplanation": "SMED separates internal and external setup tasks. Preheating dies and standardizing startup parameters allows machines to reach thermal stability rapidly, eliminating hundreds of kilograms of defective startup scrap.",
        "incorrectExplanation": "Incorrect. SMED achieves rapid process stabilization, directly minimizing off-spec startup scrap and purge material waste.",
        "optionFeedback": [
          "Incorrect. Quality checks remain critical to ensure customer specifications and avoid scrap batches.",
          "Correct! External die preheating and dialed-in startup parameters minimize plastic/metal purge waste generated during thermal transitions.",
          "Incorrect. Running worn tooling generates massive volumes of non-conforming scrap products.",
          "Incorrect. Industrial polymers jam sewers and violate environmental protection statutes."
        ]
      },
      {
        "order": 7,
        "question": "Total Productive Maintenance (TPM & OEE Environmental Losses): What is the direct relationship between Overall Equipment Effectiveness (OEE) and industrial energy/resource productivity?",
        "options": [
          "Higher OEE has no relationship with energy because machines draw identical power whether running or broken",
          "Higher OEE always increases environmental waste by speeding up machinery wear",
          "Improving OEE by eliminating minor stops, speed losses, and rework scrap maximizes saleable product output per kilowatt-hour of baseline energy consumed",
          "OEE measures only employee attendance and is unrelated to equipment or energy"
        ],
        "correct": 2,
        "correctExplanation": "When equipment suffers idling, speed losses, or defective output, baseline energy (pumps, hydraulics, lighting, compressed air) is consumed without producing saleable goods. High OEE maximizes energy productivity (output per kWh).",
        "incorrectExplanation": "Incorrect. High OEE minimizes non-productive idling and defective scrap, maximizing resource and energy efficiency per unit output.",
        "optionFeedback": [
          "Incorrect. Idling machines consume significant fixed baseline power without generating useful product.",
          "Incorrect. Smooth, well-maintained equipment operates more efficiently with lower friction and less scrap.",
          "Correct! Maximizing OEE eliminates fixed baseline energy waste and defect generation, optimizing specific energy intensity.",
          "Incorrect. OEE is the core TPM metric combining Availability, Performance, and Quality."
        ]
      },
      {
        "order": 8,
        "question": "Standardized Work (Standard Operating Procedures for Sustainability): How should energy and environmental operating setpoints be incorporated into frontline Standard Operating Procedures (SOPs)?",
        "options": [
          "Leave all temperature, pressure, and shutdown setpoints to individual operator personal preference",
          "Document environmental parameters in a secret manual stored in the executive boardroom",
          "Exclude all operational setpoints to prevent operators from feeling micromanaged",
          "Incorporate visual standard work charts at the workstation specifying exact process temperatures, optimal feed rates, shutdown checklists for breaks, and segregated scrap bins"
        ],
        "correct": 3,
        "correctExplanation": "Standardized work embeds sustainability into daily operations by clearly documenting optimal machine setpoints, equipment shutdown protocols during breaks, and waste segregation rules directly at the point of use.",
        "incorrectExplanation": "Incorrect. Frontline standard work must visually specify operational setpoints, shutdown sequences, and waste segregation guidelines at the workstation.",
        "optionFeedback": [
          "Incorrect. Operator discretion leads to wide variations in energy use and product quality defects.",
          "Incorrect. Standard work must be visible and accessible to the frontline operators running the equipment.",
          "Incorrect. Clear technical parameters are essential for operational consistency and energy conservation.",
          "Correct! Visual standard work instructions ensure every shift operates machinery at verified optimal energy setpoints and follows shutdown hygiene."
        ]
      }
    ]
  },
  {
    "courseId": 716,
    "courseCode": "ELH-62",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Workplace Scenario (GHS Secondary Container Labeling): An operator decants concentrated sulfuric acid from a 200-liter drum into a 5-liter plastic jug for local cleaning. What is the mandatory GHS regulatory compliance requirement for this secondary container?",
        "options": [
          "Affix a compliant GHS label displaying the exact chemical product identifier, signal word ('DANGER'), hazard statements, GHS pictograms (Corrosion), and precautionary statements",
          "Write the word 'ACID' in pencil on a piece of masking tape without any hazard pictograms",
          "Leave the container unlabeled if it will be used within the same 8-hour shift",
          "Label the jug as 'WATER' to prevent other workers from panicking"
        ],
        "correct": 0,
        "correctExplanation": "GHS and OSHA/EU hazard communication standards mandate that all secondary transfer containers be labeled with the product name, GHS pictograms, signal words, and hazard statements unless used immediately and entirely by the person who transferred it.",
        "incorrectExplanation": "Incorrect. Secondary chemical containers must have full GHS-compliant labeling including pictograms, signal words, and hazard statements.",
        "optionFeedback": [
          "Correct! Proper GHS secondary labeling ensures all handlers recognize acute corrosive hazards, required PPE, and first aid responses.",
          "Incorrect. Masking tape with vague text fails GHS regulatory requirements and emergency communication standards.",
          "Incorrect. Leaving hazardous chemicals unlabeled in common work areas creates extreme chemical burn and poisoning risks.",
          "Incorrect. Mislabeling hazardous acid as water is an illegal, lethal safety violation."
        ]
      },
      {
        "order": 2,
        "question": "Chemical Storage & Incompatible Segregation: In a chemical storage room, which of the following chemical pairs presents an extreme catastrophic reaction hazard (toxic gas generation or explosion) if stored together without physical separation or secondary bunding?",
        "options": [
          "Distilled water and sodium chloride table salt",
          "Sodium hypochlorite (bleach/chlorine) and concentrated hydrochloric acid (muriatic acid)",
          "Pure nitrogen gas cylinders and argon gas cylinders",
          "Granular sand and concrete mixing gravel"
        ],
        "correct": 1,
        "correctExplanation": "Mixing sodium hypochlorite (oxidizer/base) with hydrochloric acid causes an immediate violent reaction releasing lethal chlorine gas (Cl2). Incompatible chemical classes must be segregated in dedicated bunded storage.",
        "incorrectExplanation": "Incorrect. Acids and hypochlorites/bases must never be co-located; contact generates lethal toxic chlorine gas.",
        "optionFeedback": [
          "Incorrect. Salt and water are non-hazardous, fully compatible materials.",
          "Correct! Mixing hypochlorite bleach with acid immediately produces lethal chlorine gas; strict physical segregation is mandatory.",
          "Incorrect. Nitrogen and argon are inert compressed gases with no reactive chemical incompatibility.",
          "Incorrect. Sand and gravel are inert aggregate construction minerals."
        ]
      },
      {
        "order": 3,
        "question": "Environmental Protection (Secondary Containment & Bund Sizing Standards): According to international environmental engineering standards (e.g., EPA 40 CFR / CIRIA C736), what is the minimum required containment capacity for an outdoor drum storage bund housing four 200-liter oil drums?",
        "options": [
          "Containment is not required if the drums are stored on dry grass",
          "Exactly 50 liters of absorbent sawdust underneath the pallets",
          "At least 110% of the largest single container's capacity (220 liters) or 25% of the total aggregate volume (200 liters), whichever is greater (meaning minimum 220 liters)",
          "5,000 liters of poured asphalt with open drain channels leading to the river"
        ],
        "correct": 2,
        "correctExplanation": "Standard secondary containment rules require bunds to hold 110% of the largest container or 25% of the total stored volume, whichever is larger, ensuring complete containment of a catastrophic single-tank rupture.",
        "incorrectExplanation": "Incorrect. Secondary containment bunds must be engineered to contain at least 110% of the largest container or 25% of aggregate volume.",
        "optionFeedback": [
          "Incorrect. Storing chemical drums directly on soil or grass causes severe groundwater contamination.",
          "Incorrect. Sawdust is a flammable temporary absorbent, not an engineered secondary containment bund.",
          "Correct! 110% of the largest drum (220 L) exceeds 25% of total volume (200 L), establishing the legal 220 L minimum containment requirement.",
          "Incorrect. Open discharge channels to waterways violate environmental pollution prevention statutes."
        ]
      },
      {
        "order": 4,
        "question": "Emergency Response (Spill Kit Deployment & Containment Hierarchy): When a 100-liter chemical solvent spill occurs on a warehouse concrete floor, what is the correct immediate sequence of response actions under standard hazardous materials protocols?",
        "options": [
          "Flush the spill into the nearest floor drain using high-pressure fire hoses",
          "Evacuate the country and abandon the industrial building permanently",
          "Mop the solvent with paper towels and dispose of them in the standard office paper recycling bin",
          "Ensure responder PPE safety, eliminate ignition sources, contain the spill perimeter using absorbent booms to protect drains, and notify the designated spill coordinator"
        ],
        "correct": 3,
        "correctExplanation": "The spill containment hierarchy prioritizes: (1) Life safety & PPE, (2) Ignition source isolation (for flammable solvents), (3) Perimeter containment around drains using chemical-resistant booms, and (4) Proper hazardous waste disposal.",
        "incorrectExplanation": "Incorrect. Spill response requires donning appropriate PPE, isolating ignition sources, and damming storm drains with absorbent booms before recovery.",
        "optionFeedback": [
          "Incorrect. Flushing hazardous solvents into floor drains contaminates municipal water systems and creates explosive sewer atmospheres.",
          "Incorrect. Local containment by trained personnel using spill kits resolves warehouse-scale releases.",
          "Incorrect. Discarding solvent-soaked towels in paper bins creates major spontaneous combustion fire risks.",
          "Correct! Safety and PPE first, eliminate ignition risks, block drains with booms, absorb the fluid, and manage residues as hazardous waste."
        ]
      },
      {
        "order": 5,
        "question": "Safety Data Sheets (SDS Interpretation - Section 8 Exposure Controls): What critical operational information is found in Section 8 of a 16-section standard GHS Safety Data Sheet?",
        "options": [
          "Occupational Exposure Limits (OELs / TLVs / PELs), engineering ventilation controls, and specific personal protective equipment (PPE) requirements like glove breakthrough times and respirator types",
          "Wholesale commercial pricing and bulk discount rate structures",
          "Company marketing slogans and corporate annual shareholder reports",
          "Truck driver delivery routes and highway toll booth locations"
        ],
        "correct": 0,
        "correctExplanation": "Section 8 of the GHS Safety Data Sheet specifies Occupational Exposure Limits (PEL/TLV), mandatory local exhaust ventilation parameters, and specific PPE standards (e.g., nitrile vs butyl gloves, organic vapor cartridges).",
        "incorrectExplanation": "Incorrect. Section 8 of the GHS SDS details Occupational Exposure Limits, engineering controls, and mandatory PPE specifications.",
        "optionFeedback": [
          "Correct! Section 8 provides exposure limits (TWA/STEL) and engineering controls necessary to protect workers from inhalation and dermal risks.",
          "Incorrect. SDS documents are strictly hazard communication safety documents, containing zero commercial pricing.",
          "Incorrect. Marketing content has no place in standardized regulatory safety documentation.",
          "Incorrect. Transport information is located in Section 14, while Section 8 is dedicated to exposure controls and PPE."
        ]
      },
      {
        "order": 6,
        "question": "Chemical Substitution & Green Chemistry (Hierarchy of Controls): When seeking to reduce toxic chemical risk in an industrial degreasing process, what is the most effective approach according to the hierarchy of controls?",
        "options": [
          "Rely exclusively on issuing cloth dust masks to operators while continuing to use carcinogenic solvents",
          "Substitute chlorinated solvents (like trichloroethylene) with non-toxic aqueous bio-based or enzymatic cleaning solutions",
          "Increase the shift duration from 8 hours to 16 hours to finish degreasing faster",
          "Store the toxic chemicals in unmarked soda bottles to make workers comfortable"
        ],
        "correct": 1,
        "correctExplanation": "Substitution is at the top of the hierarchy of controls. Replacing toxic, volatile chlorinated solvents with aqueous or bio-based cleaners permanently eliminates the hazard at the source.",
        "incorrectExplanation": "Incorrect. Substitution of hazardous chemicals with safer alternatives is the most effective control measure, far superior to relying on PPE.",
        "optionFeedback": [
          "Incorrect. Cloth masks offer zero protection against toxic organic vapors and represent the lowest control tier.",
          "Correct! Substituting chlorinated degreasers with water-based or enzymatic cleaners eliminates carcinogen exposure and hazardous waste generation.",
          "Incorrect. Increasing shift lengths doubles worker chemical exposure doses.",
          "Incorrect. Storing toxic industrial chemicals in beverage bottles causes fatal accidental poisonings."
        ]
      },
      {
        "order": 7,
        "question": "Flammable Liquid Handling (Static Grounding & Bonding): Why is electrical bonding and grounding mandatory when transferring flammable solvents (such as acetone, toluene, or ethanol) between metal drums?",
        "options": [
          "To improve the electrical conductivity of the factory floor for radio reception",
          "To make the metal drums warm during winter production shifts",
          "To equalize electrical potential and dissipate static electricity, preventing static spark discharges that ignite flammable solvent vapors",
          "To prevent chemical molecules from separating into individual atoms"
        ],
        "correct": 2,
        "correctExplanation": "Fluid movement through pipes and funnels generates electrostatic charges. Bonding the supply and receiving containers equalizes potential, and grounding dissipates charges safely, preventing static sparks from igniting flammable vapors.",
        "incorrectExplanation": "Incorrect. Bonding and grounding dissipate static electrical charges that would otherwise generate sparks and ignite flammable solvent atmospheres.",
        "optionFeedback": [
          "Incorrect. Bonding cables serve life safety and fire protection, unrelated to radio equipment.",
          "Incorrect. Static bonding does not heat containers.",
          "Correct! Bonding and grounding equalize electrical potential and safely ground static charges, preventing catastrophic vapor explosions.",
          "Incorrect. Electrostatic bonding does not affect molecular atomic bonds."
        ]
      },
      {
        "order": 8,
        "question": "Hazardous Waste Manifesting & Disposal (Duty of Care): What is an industrial facility's legal responsibility regarding hazardous chemical waste under environmental 'Cradle-to-Grave' legislation?",
        "options": [
          "Responsibility terminates the instant the chemical waste truck drives off the factory premises",
          "Facilities may bury hazardous chemical sludges on site if done during nighttime hours",
          "Facilities may dilute chemical waste with tap water until it appears clear and discharge it to storm drains",
          "The waste generator retains legal liability from point of generation through final certified destruction, requiring licensed waste haulers and signed waste tracking manifests"
        ],
        "correct": 3,
        "correctExplanation": "Under international 'cradle-to-grave' environmental law (e.g., RCRA, EU Waste Framework Directive), the generator retains perpetual liability for hazardous waste. Generators must utilize licensed transport and verify certified disposal manifests.",
        "incorrectExplanation": "Incorrect. Cradle-to-grave principles mandate that generators retain legal liability for hazardous waste until certified destruction.",
        "optionFeedback": [
          "Incorrect. Generator liability persists even after waste leaves the facility gates.",
          "Incorrect. On-site burial of hazardous waste causes severe groundwater pollution and severe criminal penalties.",
          "Incorrect. Dilution of hazardous waste is explicitly prohibited under environmental law ('dilution is not the solution to pollution').",
          "Correct! Cradle-to-grave duty of care requires verifying carrier licensing, tracking transport manifests, and retaining disposal certificates."
        ]
      }
    ]
  },
  {
    "courseId": 732,
    "courseCode": "ELH-63",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Design for Recyclability (Mono-Material vs Multi-Layer Laminates): A food manufacturing company packages snacks in a 7-layer laminate pouch consisting of PET, Aluminum foil, and Polyethylene. Why does this design represent a major recyclability barrier, and what is the sustainable design alternative?",
        "options": [
          "Multi-material laminates cannot be mechanically separated in standard recycling streams; redesigning into an orientation-barrier mono-material PE or PP pouch enables full mechanical recycling",
          "Multi-layer pouches are too heavy for supermarket shelves; replace with single-use lead foil",
          "The aluminum layer attracts lightning bolts during ocean freight shipping",
          "Multi-layer pouches decompose too quickly in commercial warehouses"
        ],
        "correct": 0,
        "correctExplanation": "Multi-material flexible laminates bond incompatible polymers and metals that cannot be separated mechanically, causing them to be landfilled. High-barrier mono-material PE or PP solutions preserve barrier properties while enabling recycling.",
        "incorrectExplanation": "Incorrect. Incompatible bonded layers prevent mechanical recycling; mono-material PE/PP structures are required for circularity.",
        "optionFeedback": [
          "Correct! Mono-material designs (like all-PE or all-PP with EVOH barrier <5%) preserve recycling compatibility in existing recovery streams.",
          "Incorrect. Lead is a highly toxic heavy metal prohibited in packaging.",
          "Incorrect. Packaging foils do not attract lightning to cargo containers.",
          "Incorrect. Multi-layer synthetic laminates persist in the environment for hundreds of years."
        ]
      },
      {
        "order": 2,
        "question": "Workplace Scenario (Packaging Right-Sizing & Headspace Reduction): An e-commerce and retail fulfillment center packages small consumer goods into standardized large corrugated boxes, requiring 45% volume void-fill plastic air pillows. What packaging engineering change delivers the highest resource and freight optimization?",
        "options": [
          "Increase box sizes further so more air pillows can be sold to customers",
          "Implement on-demand box right-sizing automated equipment or right-sized box suites to eliminate empty headspace and reduce transport fuel emissions",
          "Eliminate shipping boxes entirely and send delicate electronics in loose unsealed envelopes",
          "Fill empty box volume with heavy wet sand to stabilize shipping pallets"
        ],
        "correct": 1,
        "correctExplanation": "Right-sizing packaging eliminates redundant corrugated material, cuts plastic void-fill consumption, and increases pallet cube utilization, directly reducing freight truck movements and transport carbon emissions.",
        "incorrectExplanation": "Incorrect. Eliminating empty headspace through custom right-sizing reduces material use and freight transport emissions.",
        "optionFeedback": [
          "Incorrect. Oversized boxes waste packaging materials and increase freight shipping emissions.",
          "Correct! Right-sizing packaging cuts cardboard consumption, eliminates void-fill, and optimizes pallet density to slash transport emissions.",
          "Incorrect. Unprotected electronics suffer high transit damage rates, creating severe defect and replacement waste.",
          "Incorrect. Adding sand increases shipping weight, dramatically inflating fuel burn and freight costs."
        ]
      },
      {
        "order": 3,
        "question": "Material Selection (Post-Consumer Recycled Content - PCR vs Virgin Resin): When qualifying 50% Post-Consumer Recycled (PCR) HDPE for blow-molded industrial cleaning bottles, what technical challenge must packaging engineers evaluate and resolve?",
        "options": [
          "PCR resin is completely invisible to human eyesight",
          "PCR resin produces nuclear radiation when exposed to sunlight",
          "Environmental Stress Crack Resistance (ESCR) and melt flow index consistency to prevent bottle cracking when exposed to surfactants",
          "PCR resin permanently dissolves plastic molding machinery"
        ],
        "correct": 2,
        "correctExplanation": "PCR plastics often have shorter polymer chains and contaminants that can reduce Environmental Stress Crack Resistance (ESCR). Engineers must adjust bottle wall geometry, add virgin masterbatch caps, or select high-grade PCR to maintain bottle integrity.",
        "incorrectExplanation": "Incorrect. Packaging engineers must validate ESCR and melt flow consistency when incorporating PCR resin to ensure chemical containment.",
        "optionFeedback": [
          "Incorrect. PCR plastics are solid, visible physical materials.",
          "Incorrect. PCR plastic is non-radioactive recycled commodity polymer.",
          "Correct! Testing ESCR and resin rheology ensures PCR bottles withstand surfactant chemicals without stress cracking or leaking.",
          "Incorrect. PCR melts and processes normally inside standard blow-molding equipment."
        ]
      },
      {
        "order": 4,
        "question": "Inks, Adhesives & Recycling Stream Contamination: A packaging designer specifies full-wrap PVC shrink sleeves with permanent solvent-based adhesives on clear PET beverage bottles. Why does this design cause severe contamination at PET recycling reclaimers?",
        "options": [
          "PVC sleeves make the bottle too slippery for store cashiers to scan",
          "Clear PET bottles are legally required to have paper stickers only",
          "PVC sleeves emit electromagnetic pulses that disrupt optical sorting lasers",
          "PVC and PET have nearly identical densities (both sink in water separation tanks), and PVC degrades into acidic hydrochloric acid that ruins entire batches of recycled PET flake"
        ],
        "correct": 3,
        "correctExplanation": "In PET recycling float-sink tanks, both PET and PVC sink. PVC melts at lower temperatures and releases corrosive hydrochloric gas that chars and ruins rPET batches. Using crystallizable PET or floatable polyolefin sleeves solves this.",
        "incorrectExplanation": "Incorrect. PVC contaminates PET recycling because both sink in float-sink wash tanks, and PVC thermally degrades into corrosive acid during PET reprocessing.",
        "optionFeedback": [
          "Incorrect. Barcode scanning is unaffected by sleeve polymer chemistry.",
          "Incorrect. Polyolefin and washable labels are widely approved on PET bottles.",
          "Incorrect. PVC does not emit electromagnetic interference.",
          "Correct! Because PVC and PET both sink in water tanks, PVC cannot be separated and burns during PET extrusion, ruining rPET quality."
        ]
      },
      {
        "order": 5,
        "question": "Secondary Packaging Optimization (Palletization & Cube Utilization): An industrial goods manufacturer redesigns its secondary corrugated shipping case, increasing pallet layer packing efficiency from 72% to 96% cube utilization. What is the immediate operational and environmental benefit?",
        "options": [
          "The company can ship the same volume of goods using 25% fewer truckloads, directly reducing freight logistics fuel costs and carbon emissions",
          "Pallet racks will immediately collapse under normal loading",
          "Workers will be required to carry pallets by hand without forklifts",
          "Trucks will be forced to drive at half speed to prevent cargo movement"
        ],
        "correct": 0,
        "correctExplanation": "Maximizing pallet cube utilization packs more saleable product into every shipping container or truck, reducing the total freight vehicle miles traveled (VMT) and lowering Scope 3 transportation greenhouse gas emissions.",
        "incorrectExplanation": "Incorrect. High pallet cube efficiency reduces the total number of truck trips required to ship products, slashing freight carbon emissions.",
        "optionFeedback": [
          "Correct! Optimizing pallet density directly reduces the total freight truck shipments required, lowering fuel burn and Scope 3 transport emissions.",
          "Incorrect. Standard industrial racking is engineered to support standard unit pallet loads.",
          "Incorrect. Efficient unit pallet loads are handled routinely by standard forklifts and pallet jacks.",
          "Incorrect. Secure, high-density palletization improves load stability during transport."
        ]
      },
      {
        "order": 6,
        "question": "Life Cycle Assessment (LCA in Packaging Decisions): When conducting a comparative Life Cycle Assessment between single-use glass jars and lightweight flexible pouches for food packaging, what critical environmental trade-off must be analyzed?",
        "options": [
          "Glass has zero environmental footprint because it is made from beach sand",
          "Heavy glass requires high embodied energy in manufacturing and heavy transport emissions, but has high circular recyclability, whereas flexible pouches have very low transport emissions but lower end-of-life recycling rates",
          "Flexible pouches are made entirely of compressed organic air",
          "LCA models are only capable of measuring the color of packaging graphics"
        ],
        "correct": 1,
        "correctExplanation": "Packaging LCA evaluates trade-offs across the entire lifecycle: glass is heavy and energy-intensive to melt/transport but highly recyclable, whereas lightweight plastic pouches require far less energy and transport fuel but have lower recycling rates.",
        "incorrectExplanation": "Incorrect. Comparative packaging LCA evaluates manufacturing energy, transport weight, and end-of-life recycling infrastructure holistically.",
        "optionFeedback": [
          "Incorrect. Glass manufacturing requires high-temperature furnaces (>1500°C) consuming substantial fossil energy.",
          "Correct! LCA quantifies the trade-off between manufacturing/freight weight emissions and end-of-life material recyclability.",
          "Incorrect. Flexible pouches are engineered polymers, not compressed air.",
          "Incorrect. LCA models quantify greenhouse gases, water use, acidification, and resource depletion."
        ]
      },
      {
        "order": 7,
        "question": "Circular Packaging Systems (Reusable / Returnable B2B Transport Packaging): An automotive parts supplier replaces single-use expendable corrugated cardboard boxes with returnable collapsible polypropylene (PP) totes for daily component deliveries to an assembly plant. What factor determines the environmental breakeven point of this reusable system?",
        "options": [
          "The color of the plastic totes chosen by the procurement team",
          "The returnable totes must achieve a minimum number of reuse turnaround cycles (typically 15-30 cycles) and maintain efficient reverse logistics backhauls to offset their higher initial manufacturing footprint",
          "The returnable totes must be melted down and re-molded after every single delivery",
          "Returnable packaging is always worse than single-use cardboard under every circumstance"
        ],
        "correct": 2,
        "correctExplanation": "Reusable plastic totes have a higher initial embodied carbon footprint than single-use cardboard. They achieve an environmental breakeven benefit once used across sufficient reuse loops (rotations) with optimized reverse logistics.",
        "incorrectExplanation": "Incorrect. Reusable packaging systems achieve environmental payback once the number of successful return cycles offsets the higher initial manufacturing energy.",
        "optionFeedback": [
          "Incorrect. Tote color does not dictate lifecycle environmental breakeven.",
          "Incorrect. Melting totes after every delivery destroys the reusable business model.",
          "Correct! Reusable transport packaging outperforms single-use alternatives once totes complete enough reuse rotations with efficient reverse freight.",
          "Incorrect. Well-managed returnable packaging systems dramatically cut lifecycle waste and emissions compared to expendable packaging."
        ]
      },
      {
        "order": 8,
        "question": "Labeling & Consumer Communication (On-Pack Recycling Labeling Standards): To prevent consumer sorting mistakes and recycling stream contamination, what on-pack labeling standard should sustainable packaging designers apply?",
        "options": [
          "Print misleading vague claims like '100% Eco-Friendly' without any disposal instructions",
          "Omit all recycling instructions to keep the label design minimalist",
          "Print the Mobius loop symbol on non-recyclable multi-layer plastics to make consumers feel good",
          "Apply standardized clear disposal instructions (e.g., How2Recycle / On-Pack Recycling Label - OPRL) detailing component-by-component separation (e.g., 'Rinse & Replace Cap', 'Separate Film')"
        ],
        "correct": 3,
        "correctExplanation": "Vague green claims create consumer confusion and recycling contamination. Standardized evidence-based labeling systems (like How2Recycle or OPRL) instruct consumers how to prepare and separate each packaging component accurately.",
        "incorrectExplanation": "Incorrect. On-pack labeling must provide clear, component-specific disposal and separation instructions rather than vague green claims.",
        "optionFeedback": [
          "Incorrect. Unsubstantiated claims like 'eco-friendly' constitute greenwashing and violate advertising codes.",
          "Incorrect. Omitting sorting guidance increases contamination in municipal recycling streams.",
          "Incorrect. Misusing recycling symbols on non-recyclable items deceives consumers and disrupts recycling operations.",
          "Correct! Component-specific on-pack instructions empower consumers to sort caps, trays, and films correctly, reducing contamination."
        ]
      }
    ]
  },
  {
    "courseId": 750,
    "courseCode": "ELH-64",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Industrial Symbiosis (Byproduct Synergies & Cross-Sector Material Flow): An aluminum smelting facility generates hundreds of tons of spent pot lining and high-alumina slag. Instead of landfilling this material as industrial waste, the facility partners with a neighboring Portland cement manufacturer to use the mineral slag as an alumina-silica raw material substitute in the cement kiln. What circular economy model does this represent?",
        "options": [
          "Industrial Symbiosis, where the byproduct or waste of one industrial process serves as a secondary raw material feedstock for another industry",
          "Linear Take-Make-Waste extraction",
          "Planned obsolescence of industrial machinery",
          "Uncontrolled hazardous waste dumping"
        ],
        "correct": 0,
        "correctExplanation": "Industrial Symbiosis engages traditionally separate industries in a collective approach to competitive advantage involving physical exchange of materials, energy, water, and byproducts, keeping resources in productive use.",
        "incorrectExplanation": "Incorrect. Exchanging industrial byproducts as secondary raw materials between distinct manufacturing facilities is the core definition of Industrial Symbiosis.",
        "optionFeedback": [
          "Correct! Industrial symbiosis converts mineral byproducts into valuable secondary feedstocks, eliminating landfill waste and virgin quarrying.",
          "Incorrect. Linear models discard byproducts into landfills rather than recovering material value.",
          "Incorrect. Planned obsolescence relates to consumer product lifespans, not industrial mineral recycling.",
          "Incorrect. Controlled industrial symbiosis meets strict environmental standards for secondary raw material reuse."
        ]
      },
      {
        "order": 2,
        "question": "Workplace Scenario (Post-Industrial vs Post-Consumer Scrap Substitution): A plastics extrusion company seeks to reduce its virgin polymer consumption. The quality engineering team is evaluating whether to blend in-house Post-Industrial Recycled (PIR) regrind or external Post-Consumer Recycled (PCR) resin. What is a key technical and supply-chain difference between PIR and PCR?",
        "options": [
          "PIR and PCR are chemically identical and originate from the exact same household sources",
          "PIR has known provenance, consistent thermal history, and near-zero foreign contamination, whereas PCR has wider melt-flow variability, potential color shifts, and requires rigorous contaminant screening",
          "PCR is free of charge and requires no processing, whereas PIR costs more than pure gold",
          "PIR cannot be melted inside standard plastic machinery"
        ],
        "correct": 1,
        "correctExplanation": "Post-Industrial Recycled (PIR) scrap is clean factory off-spec material with known polymer formulation. Post-Consumer Recycled (PCR) comes from municipal collection with greater batch-to-batch variation, requiring rigorous screening.",
        "incorrectExplanation": "Incorrect. PIR is clean scrap with known provenance, while PCR has higher variability and requires thorough decontamination and quality validation.",
        "optionFeedback": [
          "Incorrect. PIR originates from factory scrap, while PCR comes from end-of-life consumer waste streams.",
          "Correct! PIR offers predictable high-purity reprocessing, whereas PCR requires advanced washing, degassing, and rheology control.",
          "Incorrect. Both PIR and PCR carry commercial market pricing based on polymer grade and purity.",
          "Incorrect. PIR regrind is routinely blended into extrusion feedstocks."
        ]
      },
      {
        "order": 3,
        "question": "Quality Assurance (Mass Balance & Chain of Custody Standards): An international textile and apparel manufacturing plant claims that its polyester garments contain '60% Certified Recycled rPET'. What chain-of-custody standard is required to verify this circular material claim to global buyers?",
        "options": [
          "A verbal phone promise from the factory night shift supervisor",
          "An unsigned marketing flyer distributed at trade shows",
          "Global Recycled Standard (GRS) or Recycled Claim Standard (RCS) with verified Transaction Certificates (TCs) tracking recycled inputs through every processing tier",
          "No documentation is necessary if the fabric feels soft"
        ],
        "correct": 2,
        "correctExplanation": "Third-party standards like GRS (Global Recycled Standard) track recycled material provenance through third-party audits and Transaction Certificates (TCs) across the entire supply chain, preventing fraudulent green claims.",
        "incorrectExplanation": "Incorrect. Circular claims require third-party chain-of-custody verification (such as GRS or RCS Transaction Certificates) across all processing stages.",
        "optionFeedback": [
          "Incorrect. Verbal statements fail international compliance and customer audit standards.",
          "Incorrect. Marketing brochures carry zero legal traceability weight without third-party auditing.",
          "Correct! GRS/RCS certification with verified Transaction Certificates guarantees traceable chain of custody for recycled content.",
          "Incorrect. Physical fabric texture provides zero evidence of recycled feedstock provenance."
        ]
      },
      {
        "order": 4,
        "question": "Technical Feasibility & Mechanical Degradation (Recycling Loops & Downcycling): In metallurgy and polymer recycling, what technical phenomenon occurs when secondary materials are remelted across multiple circular cycles without virgin virgin top-up or purification?",
        "options": [
          "The material turns into pure elemental gold automatically",
          "The material loses mass and vanishes into thin air",
          "The material becomes infinitely stronger and indestructible",
          "Accumulation of residual tramp elements (e.g., copper in recycled steel) or polymer thermal-oxidative chain scission, causing loss of mechanical tensile strength and ductility"
        ],
        "correct": 3,
        "correctExplanation": "Repeated recycling can introduce tramp elements in metals or cause molecular chain degradation in polymers. Engineers manage this through cascade utilization (downcycling), solid-state polymerization, or controlled virgin blending.",
        "incorrectExplanation": "Incorrect. Repeated thermal processing causes polymer degradation (chain scission) and accumulation of metallurgical impurities (tramp elements).",
        "optionFeedback": [
          "Incorrect. Metallurgy follows physical chemistry, not medieval alchemy.",
          "Incorrect. Matter cannot be created or destroyed; mass balance is conserved.",
          "Incorrect. Multiple heat cycles degrade mechanical properties rather than increasing strength.",
          "Correct! Managing tramp element buildup in alloys and polymer chain scission is essential for high-integrity circular material substitution."
        ]
      },
      {
        "order": 5,
        "question": "Bio-Based Material Substitution (Drop-In Bio-Polymers vs Compostable Resins): A consumer goods manufacturer wants to replace fossil-based Polyethylene (PE) bottles with bio-based alternatives without disrupting existing municipal recycling infrastructure. What material choice accomplishes this?",
        "options": [
          "Drop-in Bio-HDPE (derived from sugarcane ethanol), which possesses the exact identical chemical structure (C2H4)n and full recyclability in standard HDPE streams",
          "Biodegradable PLA plastic that contaminates and melts at different temperatures in HDPE streams",
          "Untreated wood chips glued together with water-soluble starch",
          "Expanding polystyrene foam painted green"
        ],
        "correct": 0,
        "correctExplanation": "Drop-in bio-plastics (like sugarcane Bio-PE or Bio-PET) are chemically identical to their fossil counterparts. They capture atmospheric carbon during biomass growth and integrate seamlessly into existing recycling infrastructure.",
        "incorrectExplanation": "Incorrect. Drop-in bio-polymers (like Bio-HDPE) match fossil polymer chemistry perfectly and recycle in standard municipal streams without disruption.",
        "optionFeedback": [
          "Correct! Bio-HDPE is chemically identical to fossil HDPE, offering biogenic carbon uptake while recycling seamlessly in existing HDPE streams.",
          "Incorrect. PLA is chemically distinct and contaminates commodity PE/PET recycling batches.",
          "Incorrect. Wood chips lack the liquid barrier and structural containment properties required for bottles.",
          "Incorrect. Polystyrene foam is fossil-derived and non-equivalent to blow-molding HDPE."
        ]
      },
      {
        "order": 6,
        "question": "Life Cycle Carbon Accounting (Scope 3 Category 1 - Purchased Goods): When an industrial manufacturing facility substitutes 1,000 tons of virgin primary aluminum with 1,000 tons of post-consumer recycled aluminum ingot, what is the approximate reduction in embodied carbon (cradle-to-gate emissions)?",
        "options": [
          "Zero reduction because aluminum is already a lightweight metal",
          "Approximately 90% to 95% reduction in embodied energy and carbon emissions, because remelting scrap avoids high-energy Hall-Héroult bauxite smelting",
          "Emissions increase by 500% due to scrap collection trucks",
          "Recycled aluminum cannot be measured under the GHG Protocol"
        ],
        "correct": 1,
        "correctExplanation": "Smelting virgin bauxite ore into primary aluminum consumes massive electrical energy (~14-15 kWh/kg). Recycled secondary aluminum requires only 5% of this energy (remelting), cutting embodied greenhouse gas emissions by up to 95%.",
        "incorrectExplanation": "Incorrect. Secondary recycled aluminum requires only 5% of the energy needed for primary bauxite smelting, slashing embodied carbon by ~95%.",
        "optionFeedback": [
          "Incorrect. Primary aluminum smelting is one of the most carbon-intensive industrial processes in the world.",
          "Correct! Recycled aluminum saves ~95% of embodied energy and emissions compared to primary electrolytic bauxite smelting.",
          "Incorrect. Transport emissions are dwarfed by the massive energy savings of avoiding primary smelting.",
          "Incorrect. The GHG Protocol explicitly quantifies Scope 3 reductions from low-carbon secondary raw material purchases."
        ]
      },
      {
        "order": 7,
        "question": "Hazardous Substance Compliance (RoHS & REACH in Circular Feedstocks): When sourcing secondary recycled plastics or metals for electronic product manufacturing, why is rigorous laboratory testing for RoHS-restricted hazardous substances mandatory?",
        "options": [
          "To test if the recycled material can conduct internet broadband signals",
          "RoHS testing is only required for food products, not electronics",
          "To verify that recycled plastics do not contain prohibited legacy additives like brominated flame retardants (PBDEs) or heavy metals (lead, cadmium) from historical scrap sources",
          "To ensure the plastic has an attractive floral scent"
        ],
        "correct": 2,
        "correctExplanation": "Legacy plastics manufactured before modern regulations often contained toxic flame retardants (PBDEs) or heavy metal stabilizers. Circular feedstocks must be screened via XRF and GC-MS to ensure compliance with RoHS/REACH limits.",
        "incorrectExplanation": "Incorrect. Recycled feedstocks must be verified free of legacy restricted hazardous substances (like heavy metals and brominated flame retardants) under RoHS/REACH.",
        "optionFeedback": [
          "Incorrect. RoHS compliance focuses on hazardous chemical toxicology, not data communications.",
          "Incorrect. RoHS applies specifically to Electrical and Electronic Equipment (EEE).",
          "Correct! Rigorous screening (e.g., XRF spectrometry) prevents legacy toxic flame retardants (PBDEs/PBBs) and heavy metals from entering new products.",
          "Incorrect. Chemical safety standards govern toxic heavy metals, not synthetic fragrances."
        ]
      },
      {
        "order": 8,
        "question": "Circularity Metrics (Material Circularity Indicator - MCI / CTI): What does the Ellen MacArthur Foundation Material Circularity Indicator (MCI) measure for an industrial manufactured product?",
        "options": [
          "The physical roundness and circular geometry of the manufactured parts",
          "The percentage of employees who commute to work by riding circular bicycles",
          "The company's annual financial stock market dividend yield",
          "A standardized index (from 0 to 1.0) measuring the degree to which linear material flows have been minimized through recycled/bio-based inputs, product utility/lifespan, and end-of-life recovery rates"
        ],
        "correct": 3,
        "correctExplanation": "The Material Circularity Indicator (MCI) provides a quantitative score (0 to 1.0) assessing how circular a product is, factoring in virgin vs recycled feedstock, lifespan, intensity of use, and recycling efficiency.",
        "incorrectExplanation": "Incorrect. The Material Circularity Indicator (MCI) quantitatively measures virgin input reduction, product longevity, and end-of-life recovery on a 0 to 1.0 scale.",
        "optionFeedback": [
          "Incorrect. Circular economy refers to material lifecycle closed loops, not geometric shapes.",
          "Incorrect. Employee commuting is captured under Scope 3 Category 7, not product circularity indices.",
          "Incorrect. Financial dividends reflect corporate earnings, not material circularity.",
          "Correct! The MCI measures the restoration of material loops by tracking virgin vs recycled content, product durability, and recycling efficiency."
        ]
      }
    ]
  },
  {
    "courseId": 775,
    "courseCode": "ELH-65",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Air Pollution Abatement (Regenerative Thermal Oxidizers - RTO Operations): How does a Regenerative Thermal Oxidizer (RTO) achieve high destruction efficiency of volatile organic compounds (VOCs) while minimizing auxiliary natural gas fuel consumption?",
        "options": [
          "It uses ceramic media heat recovery beds to preheat incoming solvent-laden process air using thermal energy captured from previous combustion cycles, achieving >95% thermal heat recovery and >99% VOC destruction at 815°C (1,500°F)",
          "It freezes incoming VOC gases into solid ice blocks using cryogenic nitrogen refrigerators",
          "It vents solvent gases directly into local residential neighborhoods during windy nights",
          "It mixes VOC fumes with perfume and releases them unheated through roof vents"
        ],
        "correct": 0,
        "correctExplanation": "RTOs utilize dual or multi-bed ceramic heat exchange media to preheat incoming solvent-laden process air up to combustion temperatures (~815°C), achieving self-sustaining auto-thermal VOC destruction with minimal auxiliary fuel.",
        "incorrectExplanation": "Incorrect. RTOs achieve >99% VOC destruction and >95% thermal efficiency through high-temperature oxidation in regenerative ceramic heat-exchange beds.",
        "optionFeedback": [
          "Correct! Ceramic heat recovery beds capture exhaust heat and preheat incoming VOC fumes, enabling high-efficiency destruction with minimal fuel burn.",
          "Incorrect. Cryogenic condensation is a distinct technology with high energy consumption, not an RTO.",
          "Incorrect. Direct emission of untreated VOCs violates environmental clean air statutes.",
          "Incorrect. Masking toxic chemical vapors with fragrances is illegal and hazardous to public health."
        ]
      },
      {
        "order": 2,
        "question": "Workplace Scenario (Wet Scrubber Differential Pressure & pH Control): An environmental engineer monitors a packed-bed wet scrubber treating acidic hydrogen chloride (HCl) gas fumes from an industrial pickling line. The differential pressure (Delta-P) across the packing rises from 250 Pa to 950 Pa, and the scrubbing liquor pH drops to 2.8. What is the diagnosis and required operational corrective action?",
        "options": [
          "Turn off the scrubber exhaust fan and allow acid fumes to vent inside the employee factory floor",
          "Differential pressure rise indicates packing bed particulate fouling or chemical scaling, and low pH indicates insufficient caustic (NaOH) dosing; initiate packing wash-down and increase caustic dosing to maintain pH between 7.5 and 8.5",
          "Add concentrated sulfuric acid directly into the scrubber sump to clear the obstruction",
          "The scrubber is operating perfectly and requires zero maintenance intervention"
        ],
        "correct": 1,
        "correctExplanation": "High differential pressure indicates packing bed clogging, channeling, or scaling. Acidic pH (<7.0) means neutralization capacity is exhausted, allowing acid gas breakthrough. Maintenance must clean packing and restore automated caustic dosing (pH 7.5-8.5).",
        "incorrectExplanation": "Incorrect. Elevated differential pressure indicates packing clogging, while low pH signals depleted neutralization chemistry requiring caustic dosing and packing descaling.",
        "optionFeedback": [
          "Incorrect. Shutting off exhaust ventilation exposes factory workers to lethal corrosive acid atmospheres.",
          "Correct! Cleaning fouled packing restores proper airflow and gas contact, while caustic dosing ensures complete acidic gas neutralization.",
          "Incorrect. Adding sulfuric acid worsens acidity, accelerates corrosion, and destroys neutralization capacity.",
          "Incorrect. High delta-P and acidic pH are critical warning indicators of impending scrubber failure and gas breakthrough."
        ]
      },
      {
        "order": 3,
        "question": "Adsorption Technology (Activated Carbon Bed Breakthrough & Saturation): How do plant operators detect when an industrial activated carbon adsorption bed treating solvent vapors has reached its adsorption saturation capacity (breakthrough point)?",
        "options": [
          "By waiting until the carbon bed bursts into flames spontaneously",
          "By tasting the exhaust air stack with a spoon",
          "By monitoring continuous photoionization detectors (PID) or flame ionization detectors (FID) in the exhaust stack for rising VOC concentrations exceeding baseline permit thresholds",
          "Activated carbon lasts forever and never requires regeneration or replacement"
        ],
        "correct": 2,
        "correctExplanation": "As activated carbon micropores fill with adsorbed VOC molecules, the 'breakthrough point' is reached where inlet and outlet VOC levels equalize. Continuous stack analyzers (PID/FID) detect this rise, signaling the need for carbon regeneration or bed replacement.",
        "incorrectExplanation": "Incorrect. VOC breakthrough in activated carbon beds is monitored continuously using stack PID or FID hydrocarbon analyzers.",
        "optionFeedback": [
          "Incorrect. Carbon bed fires are catastrophic safety hazards caused by hot-spot adsorption of ketones, not a monitoring method.",
          "Incorrect. Inhaling or tasting toxic stack gases is an extreme safety violation.",
          "Correct! Continuous online PID/FID VOC analyzers detect the onset of bed saturation, alerting operators to swap or regenerate carbon beds before permit exceedances.",
          "Incorrect. Activated carbon has finite adsorption capacity (typically 10-30% by weight) and requires regular replacement or steam regeneration."
        ]
      },
      {
        "order": 4,
        "question": "Particulate Control (Fabric Filter Baghouse vs Cyclone Separators): In an industrial woodworking or mineral processing plant, why are high-efficiency reverse-pulse jet baghouses installed downstream of cyclone separators?",
        "options": [
          "Cyclones serve as decorative ornaments on factory rooftops",
          "Baghouses are installed solely to catch birds that fly into exhaust ducts",
          "Baghouses cannot handle dust and are only used for water filtration",
          "Cyclones remove heavy, coarse abrasive dust particles (primary stage), protecting the fine needle-felt fabric filter bags from premature abrasion and blinding while capturing sub-micron particulate matter (PM2.5 / PM10) to >99.9% efficiency"
        ],
        "correct": 3,
        "correctExplanation": "Cyclones utilize centrifugal force to drop out large, abrasive particles, reducing dust loading on the downstream baghouse. The baghouse then captures fine inhalable PM2.5 and PM10 particles to achieve clean air compliance.",
        "incorrectExplanation": "Incorrect. Cyclone separators remove coarse abrasive particles, protecting downstream fabric baghouses that filter sub-micron particulate matter (PM2.5/PM10).",
        "optionFeedback": [
          "Incorrect. Cyclones are functional aerodynamic inertial separation equipment.",
          "Incorrect. Industrial air pollution controls are engineered for process dust capture, not avian wildlife.",
          "Incorrect. Baghouses are premier dry particulate air filtration systems.",
          "Correct! Staging cyclones upstream of pulse-jet baghouses prevents fabric abrasion and captures fine particulate emissions to >99.9%."
        ]
      },
      {
        "order": 5,
        "question": "Safety & Explosive Atmospheres (ATEX / NFPA 652 Combustible Dust Control): What critical engineered safety device must be installed on industrial dust collectors capturing organic combustible dusts (e.g., flour, wood, sugar, plastic powder) to prevent structural building destruction during a deflagration?",
        "options": [
          "Certified explosion relief venting panels directed to safe outdoor exclusion zones, combined with fast-acting chemical explosion suppression or mechanical isolation valves in inlet ducts",
          "Paper tape placed over duct seams",
          "Open open-flame heaters installed inside the dirty dust hopper to burn off dust accumulations",
          "Heavy padlocks welded onto dust collector access doors to trap explosions inside"
        ],
        "correct": 0,
        "correctExplanation": "NFPA 652 and ATEX standards mandate deflagration venting (explosion panels directed to unoccupied outdoor areas) and inlet duct isolation to prevent pressure waves and flames from propagating backwards into the occupied factory.",
        "incorrectExplanation": "Incorrect. Combustible dust systems require certified explosion relief venting and fast-acting inlet isolation valves to mitigate deflagration hazards.",
        "optionFeedback": [
          "Correct! Explosion relief panels vent blast overpressure safely outdoors, and isolation valves prevent secondary explosions inside factory work areas.",
          "Incorrect. Tape offers zero structural resistance to explosive deflagration pressure waves.",
          "Incorrect. Installing open flames inside combustible dust clouds triggers catastrophic dust explosions.",
          "Incorrect. Trapping blast pressure causes catastrophic shrapnel rupture of the entire dust collector casing."
        ]
      },
      {
        "order": 6,
        "question": "Source Reduction (Capture Efficiency & Hood Design): According to ACGIH Industrial Ventilation principles, what is the most effective engineering method to capture welding fumes and solvent vapors with the lowest exhaust airflow requirement?",
        "options": [
          "Place a high-volume roof fan 20 meters above the workplace floor to dilute air across the entire building",
          "Use close-capture local exhaust ventilation (LEV) hoods positioned within one duct diameter of the emission source, equipped with side baffles",
          "Open all factory doors during rainstorms to allow wind to blow fumes across adjacent workstations",
          "Provide workers with hand-held paper fans to blow fumes away from their faces"
        ],
        "correct": 1,
        "correctExplanation": "Capture velocity drops inversely with the square of distance (V = Q / (10 * x^2)). Close-capture source hoods positioned near the point of generation capture contaminants effectively with dramatically lower airflow and fan electrical power.",
        "incorrectExplanation": "Incorrect. Local exhaust ventilation (LEV) hoods positioned immediately adjacent to the emission source maximize capture while minimizing required airflow.",
        "optionFeedback": [
          "Incorrect. General dilution ventilation requires massive air volumes and energy without protecting the worker's immediate breathing zone.",
          "Correct! Close-capture LEV hoods position capture velocity directly at the emission source, minimizing required exhaust volume and heating/cooling energy.",
          "Incorrect. Uncontrolled cross-drafts disperse toxic fumes into neighboring work zones.",
          "Incorrect. Manual paper fans fail to provide engineered capture or respiratory protection."
        ]
      },
      {
        "order": 7,
        "question": "Continuous Emission Monitoring (CEMS Calibration & EPA Reference Methods): What is the purpose of Daily Zero and Span Drift Calibration checks on continuous emission monitoring systems (CEMS) installed on industrial exhaust stacks?",
        "options": [
          "To entertain factory visitors with flashing instrument lights",
          "To alter official emissions records whenever plant emissions exceed legal limits",
          "To verify optical and electrochemical sensor calibration against certified zero gas (nitrogen) and NIST-traceable span calibration gas, ensuring emissions data accuracy for regulatory compliance",
          "To consume compressed gas cylinders before their expiration dates"
        ],
        "correct": 2,
        "correctExplanation": "Daily zero and span calibration tests instrument stability against known certified reference gases, detecting optical drift or sensor degradation to guarantee legally defensible environmental compliance reporting.",
        "incorrectExplanation": "Incorrect. Zero and span calibrations verify CEMS instrument accuracy and sensor stability against certified reference gases under clean air regulations.",
        "optionFeedback": [
          "Incorrect. CEMS calibration is a rigorous regulatory compliance procedure.",
          "Incorrect. Falsifying emissions data is a serious criminal offense under environmental protection laws.",
          "Correct! Automated zero and span checks against NIST-traceable gases verify optical alignment and detector accuracy, preventing measurement drift.",
          "Incorrect. Calibration gases are precision reference standards, not disposable inventory."
        ]
      },
      {
        "order": 8,
        "question": "Energy Optimization in Air Pollution Control (Variable Frequency Fan Control): An industrial exhaust ventilation system runs a 90 kW centrifugal fan continuously at fixed speed, even when only 2 out of 10 process workstations are operating. What energy retrofit delivers immediate power savings?",
        "options": [
          "Run the exhaust fan backwards to blow outside smog into the manufacturing plant",
          "Shut off the exhaust fan completely and weld ductwork closed permanently",
          "Replace the 90 kW motor with five 100 kW motors running simultaneously",
          "Install variable air volume (VAV) dampers at each workstation interlocked with equipment run switches, and install a VFD on the main exhaust fan modulated by static pressure control in the main duct"
        ],
        "correct": 3,
        "correctExplanation": "By installing automated blast gates at inactive workstations and modulating the main fan with a VFD based on duct static pressure, the system extracts only the required air volume, exploiting cubic affinity law savings.",
        "incorrectExplanation": "Incorrect. Modulating exhaust airflow via workstation interlocks and a VFD static pressure loop dramatically reduces fan electrical consumption.",
        "optionFeedback": [
          "Incorrect. Reversing exhaust fans blows outdoor dust indoors and fails contaminant capture.",
          "Incorrect. Shutting off exhaust ventilation exposes operators to hazardous airborne contaminants.",
          "Incorrect. Upsizing motors dramatically inflates capital expenditure and electrical power consumption.",
          "Correct! VAV workstation dampers and VFD static pressure control scale fan energy proportionally with active production demand, saving substantial energy."
        ]
      }
    ]
  },
  {
    "courseId": 776,
    "courseCode": "ELH-66",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Supply Chain Due Diligence (EU CSDDD & Modern Slavery Compliance): Under modern supply chain due diligence frameworks (such as the EU Corporate Sustainability Due Diligence Directive - CSDDD), what is a manufacturing company's legal obligation regarding its tier-1 and upstream suppliers?",
        "options": [
          "Identify, prevent, mitigate, and account for adverse human rights and environmental impacts (e.g., child labor, forced labor, water pollution, deforestation) across direct suppliers and deep upstream supply tiers",
          "Ignore all supplier activities outside the factory's own geographical boundary",
          "Require suppliers to sign a document stating that the buyer assumes all supplier legal fines",
          "Outsource all production to unlisted shell companies to avoid transparency requirements"
        ],
        "correct": 0,
        "correctExplanation": "Mandatory corporate sustainability due diligence laws require companies to conduct risk assessments, audits, and corrective action plans across global supply networks to eliminate human rights abuses and environmental degradation.",
        "incorrectExplanation": "Incorrect. Modern supply chain legislation mandates comprehensive environmental and human rights due diligence across upstream supply tiers.",
        "optionFeedback": [
          "Correct! CSDDD and modern slavery legislation mandate proactive risk mapping, supplier auditing, grievance mechanisms, and remediation across upstream supply chains.",
          "Incorrect. Corporate responsibility legally extends deep into supply networks under modern due diligence directives.",
          "Incorrect. Buyers cannot contractually waive regulatory due diligence duties through indemnity clauses.",
          "Incorrect. Obfuscating supply chain tiers violates mandatory disclosure and trade compliance regulations."
        ]
      },
      {
        "order": 2,
        "question": "Workplace Scenario (Chain of Custody Models - Mass Balance vs Segregation): An electronics manufacturer sources certified conflict-free tin and recycled gold. The procurement team must select a Chain of Custody (CoC) model. What is the key operational distinction between 'Identity Preserved / Physical Segregation' and 'Mass Balance'?",
        "options": [
          "Identity Preserved allows mixing toxic and certified materials freely without records",
          "Physical Segregation guarantees that certified sustainable physical material is strictly separated from non-certified material throughout transport and processing, whereas Mass Balance tracks equivalent certified volume inputs and outputs through a shared production system",
          "Mass Balance is a method for weighing shipping containers with bathroom scales",
          "Physical Segregation is prohibited under all international sustainability standards"
        ],
        "correct": 1,
        "correctExplanation": "Physical Segregation ensures physical tracking of certified material from source to end product. Mass Balance allows physical mixing during processing while administratively ensuring that certified output volume does not exceed certified input volume.",
        "incorrectExplanation": "Incorrect. Physical Segregation strictly separates certified physical material, whereas Mass Balance administratively tracks equivalent volumes through shared processing.",
        "optionFeedback": [
          "Incorrect. Identity Preserved enforces the strictest physical separation and batch tracing.",
          "Correct! Physical Segregation provides 100% physical material isolation, while Mass Balance reconciles administrative input/output volume credits.",
          "Incorrect. Mass Balance is an accounting methodology for certified material reconciliation, not scale equipment.",
          "Incorrect. Physical Segregation is the gold standard for high-integrity supply chain certification."
        ]
      },
      {
        "order": 3,
        "question": "Scope 3 GHG Accounting (Primary Supplier Carbon Data vs Secondary Emission Factors): Why is collecting primary, supplier-specific activity and emission data (via CDP or supplier carbon disclosures) superior to using secondary industry-average spend-based emission factors for Scope 3 Category 1 reporting?",
        "options": [
          "Spend-based factors are legally banned across all international accounting standards",
          "Primary data is always zero kilograms of CO2 for all global suppliers",
          "Primary data allows a manufacturer to reflect actual supplier decarbonization investments (e.g., a supplier switching to solar power) in its carbon footprint, whereas spend-based factors penalize the buyer when prices rise regardless of environmental progress",
          "Primary data is generated automatically by satellite weather maps"
        ],
        "correct": 2,
        "correctExplanation": "Spend-based methods estimate emissions from dollar spend, so price inflation falsely increases reported carbon. Primary supplier data reflects verified low-carbon investments (renewable energy, recycled content), enabling genuine Scope 3 reductions.",
        "incorrectExplanation": "Incorrect. Primary supplier carbon data accurately reflects verified decarbonization actions, whereas spend-based methods distort emissions with price fluctuations.",
        "optionFeedback": [
          "Incorrect. Spend-based accounting is an accepted initial screening tier under the GHG Protocol, but inferior to primary data.",
          "Incorrect. Primary data reflects real physical emissions, which are non-zero.",
          "Correct! Primary supplier data rewards actual supplier decarbonization efforts and decouples greenhouse gas reporting from monetary inflation.",
          "Incorrect. Primary data requires verified supplier disclosures and utility-level billing records."
        ]
      },
      {
        "order": 4,
        "question": "Supplier Auditing & Corrective Action Plans (CAP): During a third-party SMETA / BSCI on-site social and environmental audit of a tier-2 component supplier, auditors discover inadequate chemical secondary containment and locked emergency fire exits. What is the appropriate procurement response?",
        "options": [
          "Immediately leak the audit findings to social media and ignore the supplier",
          "Ignore the fire safety violations because tier-2 factories are far away",
          "Demand that the supplier bribe the auditor to change the report score",
          "Issue a formal Corrective Action Plan (CAP) with strict 30-day remediation milestones, verified by photographic evidence or a follow-up verification audit, while pausing new purchase orders if critical life safety issues persist"
        ],
        "correct": 3,
        "correctExplanation": "Responsible procurement utilizes Corrective Action Plans (CAPs) with defined timeframes and follow-up verification audits to remediate non-conformances, working with suppliers to solve root causes while enforcing compliance.",
        "incorrectExplanation": "Incorrect. Responsible supply chain management enforces structured Corrective Action Plans (CAPs) with verified milestone remediation for non-conformances.",
        "optionFeedback": [
          "Incorrect. Responsible due diligence focuses on structured remediation rather than unconstructive public disclosures.",
          "Incorrect. Locked fire exits and chemical containment failures are critical life-safety non-conformances requiring immediate action.",
          "Incorrect. Bribery is illegal and violates global anti-corruption compliance laws.",
          "Correct! A formal CAP with strict verification milestones enforces immediate safety remediation and establishes commercial accountability."
        ]
      },
      {
        "order": 5,
        "question": "Digital Traceability & Verification Technologies: How do digital product passports (DPPs) and blockchain-enabled traceability systems enhance circular economy accountability in industrial manufacturing?",
        "options": [
          "They provide an immutable, decentralized digital record capturing material origins, chemical composition, repair history, recycled content percentage, and end-of-life disassembly instructions accessible across the product lifecycle",
          "They permanently disable the product so it cannot be repaired or disassembled",
          "They replace physical manufacturing equipment with cryptocurrency trading algorithms",
          "They transmit secret radio waves to monitor customer private phone calls"
        ],
        "correct": 0,
        "correctExplanation": "Digital Product Passports (DPPs) securely store granular data on component origin, material circularity, recycled content, and disassembly guidance, enabling recyclers and repairers to extract maximum value at end-of-life.",
        "incorrectExplanation": "Incorrect. Digital Product Passports provide transparent, accessible lifecycle data regarding material composition, carbon footprint, and circular end-of-life recycling.",
        "optionFeedback": [
          "Correct! Digital Product Passports provide verifiable material provenance and disassembly instructions to enable circular recycling and repair.",
          "Incorrect. DPPs actively encourage and facilitate product repair and remanufacturing.",
          "Incorrect. DPPs are data architecture standards, not financial cryptocurrency trading platforms.",
          "Incorrect. DPPs record product material and environmental data, protecting personal privacy."
        ]
      },
      {
        "order": 6,
        "question": "Deforestation & Commodity Traceability (EUDR Compliance): Under the European Union Deforestation Regulation (EUDR), what specific data must manufacturers import or supply when sourcing forest-risk commodities (e.g., rubber, timber, palm oil, cocoa, soy)?",
        "options": [
          "A generic self-declaration saying 'All products are from happy trees'",
          "Exact GPS geographic coordinates (polygons for plots >4 hectares) of the land plots where the raw material was harvested, proving production occurred on land not deforested after December 31, 2020",
          "The name of the local weather forecast station",
          "A photograph of a chainsaw in a tool shed"
        ],
        "correct": 1,
        "correctExplanation": "EUDR mandates geolocation polygon data for production plots, proving that commodities were harvested legally and on land free from deforestation after the cutoff date of December 31, 2020.",
        "incorrectExplanation": "Incorrect. EUDR compliance requires exact geographic GPS coordinates (polygons) of the production plot proving zero deforestation after December 31, 2020.",
        "optionFeedback": [
          "Incorrect. Generic self-declarations fail mandatory EUDR due diligence and customs clearance checks.",
          "Correct! EUDR mandates verified geolocation coordinates and satellite time-stamped proof of zero deforestation after December 31, 2020.",
          "Incorrect. Weather station names provide zero proof of plot-level deforestation compliance.",
          "Incorrect. Equipment photos carry zero legal evidentiary value under deforestation due diligence rules."
        ]
      },
      {
        "order": 7,
        "question": "Tier-N Mapping & Upstream Visibility: Why do industrial supply chain risk managers perform 'Tier-N Mapping' beyond direct Tier-1 suppliers down to raw material mines and smelters?",
        "options": [
          "To increase executive administrative paperwork without operational benefit",
          "To fire all Tier-1 suppliers and handle every manufacturing process internally",
          "To identify hidden bottlenecks, single-source critical mineral dependencies, high-climate-risk geographical nodes, and human rights risks buried deep in Tier-2 through Tier-4 supply chains",
          "Tier-N mapping is mathematically impossible and has never been attempted"
        ],
        "correct": 2,
        "correctExplanation": "Critical risks (geopolitical disruptions, child labor, water scarcity, carbon intensity) are overwhelmingly concentrated in deep Tier-2 to Tier-4 raw material suppliers. Mapping multi-tier networks enables proactive mitigation.",
        "incorrectExplanation": "Incorrect. Multi-tier (Tier-N) supply chain mapping uncovers deep upstream vulnerabilities, sole-source dependencies, and critical ESG risks.",
        "optionFeedback": [
          "Incorrect. Multi-tier mapping is a high-value strategic risk management process.",
          "Incorrect. The goal is risk visibility and supplier collaboration, not vertical integration.",
          "Correct! Deep upstream mapping exposes critical mineral dependencies, environmental vulnerabilities, and ESG risks before disruptions occur.",
          "Incorrect. Modern supply chain analytics routinely map multi-tier global supply networks."
        ]
      },
      {
        "order": 8,
        "question": "Supplier Capacity Building & Decarbonization Incentives: What is the most effective commercial strategy for a large manufacturer to drive Scope 3 emissions reductions among small-to-medium enterprise (SME) suppliers?",
        "options": [
          "Immediately terminate any supplier that does not achieve net-zero emissions within 24 hours",
          "Provide zero training or financial assistance and demand continuous price cuts",
          "Ban SME suppliers from using electricity in their factories",
          "Offer technical energy audit toolkits, preferred supplier status, longer-term purchase contracts, and access to favorable sustainable supply chain finance (SSCF) linked to ESG performance milestones"
        ],
        "correct": 3,
        "correctExplanation": "SMEs often lack capital and technical expertise to decarbonize independently. Combining technical toolkits, long-term procurement commitments, and sustainable supply-chain financing accelerates joint decarbonization.",
        "incorrectExplanation": "Incorrect. Collaborative supplier development (technical training, preferential contracts, and sustainability-linked financing) drives sustained Scope 3 reductions.",
        "optionFeedback": [
          "Incorrect. Unrealistic punitive ultimatums destroy supplier relationships and collapse supply security.",
          "Incorrect. Demanding price cuts while requiring decarbonization without support leads to supplier failure.",
          "Incorrect. Disabling electricity halts manufacturing and causes commercial collapse.",
          "Correct! Providing technical support, commercial incentives, and sustainability-linked financing empowers suppliers to invest in efficiency."
        ]
      }
    ]
  },
  {
    "courseId": 733,
    "courseCode": "ELH-67",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Workplace Scenario (Open Multi-Deck vs Glass Door Retrofits): A supermarket chain operates open refrigerated display cases for dairy and beverages. In-store energy sub-metering reveals that refrigeration accounts for 55% of the store's total electrical power consumption. What retrofit delivers the largest immediate energy and food quality improvement?",
        "options": [
          "Retrofit frameless double-pane anti-reflective glass doors onto open multi-deck display cases, reducing refrigeration thermal load by 35-45% while stabilizing product temperatures",
          "Turn off all refrigeration compressors at night and let dairy products warm to room temperature",
          "Paint the open cases with bright fluorescent paint to reflect ambient indoor light",
          "Install high-powered electric floor heaters directly in front of open cases to warm browsing shoppers"
        ],
        "correct": 0,
        "correctExplanation": "Open multi-deck cases draw in warm store ambient air continuously. Installing glass doors reduces radiative and convective infiltration loads by up to 45%, slashing compressor energy and extending food shelf life.",
        "incorrectExplanation": "Incorrect. Retrofitting glass doors on open refrigerated display cases blocks warm ambient air infiltration, reducing refrigeration energy consumption by 35-45%.",
        "optionFeedback": [
          "Correct! Glass door retrofits eliminate massive convective air entrainment, reducing refrigeration electrical demand by 35-45% and stabilizing food temperatures.",
          "Incorrect. De-energizing cooling breaks the cold chain, causing severe bacterial spoilage and food safety violations.",
          "Incorrect. Paint does not prevent warm air infiltration into open refrigerated cases.",
          "Incorrect. Heating the cold aisle increases the thermal gradient and dramatically inflates compressor energy waste."
        ]
      },
      {
        "order": 2,
        "question": "Natural Refrigerants (Transcritical CO2 - R-744 Systems): Supermarkets are transitioning away from high-Global Warming Potential (GWP) hydrofluorocarbons (e.g., R-404A with GWP 3,922). Why is carbon dioxide (R-744) an environmentally superior refrigerant, and what operational feature characterizes transcritical operation?",
        "options": [
          "CO2 has a GWP of 100,000 and freezes at room temperature",
          "R-744 has a GWP of exactly 1, zero Ozone Depletion Potential (ODP), is non-flammable, and operates above its critical point (31.1°C / 73.8 bar) with dedicated gas coolers during warm ambient conditions",
          "R-744 operates with zero pressure and requires no pipes",
          "R-744 is an explosive gas that destroys stainless steel piping"
        ],
        "correct": 1,
        "correctExplanation": "CO2 (R-744) has an ultra-low GWP of 1 and zero ODP. In transcritical systems, when ambient temperature exceeds 31.1°C, high-side pressure exceeds the critical point (gas cooler replaces condenser) with high efficiency heat recovery.",
        "incorrectExplanation": "Incorrect. R-744 (CO2) has a GWP of 1, zero ODP, non-flammable classification (A1), and operates in transcritical mode above 31.1°C.",
        "optionFeedback": [
          "Incorrect. CO2 has a baseline GWP of exactly 1.0, not 100,000.",
          "Correct! R-744 offers ultra-low GWP (GWP = 1), non-toxic/non-flammable safety (A1), and excellent thermodynamic heat-recovery potential.",
          "Incorrect. Transcritical CO2 systems operate at elevated pressures (up to 120 bar) requiring robust copper-iron or stainless steel piping.",
          "Incorrect. CO2 is non-flammable (ASHRAE safety group A1) and standard in modern green supermarket refrigeration."
        ]
      },
      {
        "order": 3,
        "question": "Engineering Optimization (Floating Head Pressure & Electronic Expansion Valves): How does implementing floating condensing pressure (floating head pressure control) with Electronic Expansion Valves (EEVs) optimize commercial refrigeration efficiency in winter?",
        "options": [
          "By fixing condensing temperature permanently at 45°C regardless of outside weather",
          "By venting refrigerant into the parking lot during cold days",
          "By allowing condensing pressure to float downward when outdoor ambient temperatures drop, reducing compressor discharge pressure and saving 2-3% electrical energy per degree Celsius drop",
          "By turning off all electronic valves so refrigerant flows as an uncontrolled liquid"
        ],
        "correct": 2,
        "correctExplanation": "Traditional systems maintain artificially high condensing pressure year-round. Floating head pressure allows condensing temperatures to drop with cool ambient weather, drastically lowering compressor lift and power consumption.",
        "incorrectExplanation": "Incorrect. Floating head pressure lowers condensing temperature during cooler weather, reducing compressor lift and saving significant energy.",
        "optionFeedback": [
          "Incorrect. Fixed high condensing pressure forces compressors to work against unnecessary head pressure during cool weather.",
          "Incorrect. Venting refrigerant is an illegal environmental crime under clean air and F-gas regulations.",
          "Correct! Allowing head pressure to float down with ambient temperature reduces compressor pressure lift, delivering 2-3% energy savings per °C reduction.",
          "Incorrect. Electronic Expansion Valves provide precise superheat control, preventing liquid floodback."
        ]
      },
      {
        "order": 4,
        "question": "Refrigerant Leak Detection & Maintenance (Direct F-Gas Emissions): A supermarket refrigeration rack with a 500 kg R-448A charge suffers an undetected 12% annual leak rate through vibration-cracked flare joints. What is the environmental and financial consequence?",
        "options": [
          "Zero impact because synthetic refrigerants are beneficial to the atmosphere",
          "The leak costs nothing because chemical suppliers provide free replacement gas",
          "Direct emissions equal over 75,000 kg of CO2 equivalent (hundreds of car emissions), accompanied by diminished cooling efficiency, increased compressor runtime, and high chemical recharge costs",
          "Refrigerant leaks turn into edible ice cream on the floor"
        ],
        "correct": 3,
        "correctExplanation": "Synthetic HFC blends have high GWPs (R-448A GWP ~1,387). A 60 kg leak releases ~83 metric tons of CO2e directly, degrades thermodynamic efficiency, increases electrical power draw, and incurs high replacement costs.",
        "incorrectExplanation": "Incorrect. Refrigerant leaks cause massive direct greenhouse gas emissions, degrade system efficiency, and incur heavy chemical replacement costs.",
        "optionFeedback": [
          "Incorrect. HFC refrigerants are potent greenhouse gases with GWPs thousands of times higher than CO2.",
          "Incorrect. Synthetic refrigerants are costly chemical commodities with escalating F-gas quotas.",
          "Incorrect. Chemical vapors disperse into the atmosphere, not edible dairy products.",
          "Correct! A 12% leak generates severe Scope 1 direct emissions (~83 tCO2e), inflates energy bills from reduced cooling capacity, and risks equipment burnout."
        ]
      },
      {
        "order": 5,
        "question": "Thermal Heat Recovery (Water Heating & Space Heating from Discharge Gas): How can a commercial supermarket central refrigeration plant utilize superheated compressor discharge gas for facility sustainability?",
        "options": [
          "Route hot compressor discharge gas through a desuperheater and plate heat exchanger to generate free domestic hot water for bakeries, delis, and space heating",
          "Vent the hot gas into the walk-in freezers to speed up defrosting",
          "Spray cold water onto electrical switchgear to absorb the heat",
          "Heat recovery from refrigeration is prohibited by international thermodynamic laws"
        ],
        "correct": 0,
        "correctExplanation": "Superheated discharge gas from refrigeration compressors contains high-grade thermal energy. Installing a desuperheater heat exchanger captures this heat for store water heating and HVAC space heating, displacing natural gas/electric boilers.",
        "incorrectExplanation": "Incorrect. Installing desuperheater heat exchangers on compressor discharge lines recovers thermal energy for store hot water and space heating.",
        "optionFeedback": [
          "Correct! Desuperheater heat recovery extracts waste heat from refrigerant discharge, meeting 100% of store hot water and space heating needs.",
          "Incorrect. Venting hot gas into freezers melts frozen inventory and causes catastrophic compressor overload.",
          "Incorrect. Spraying water on energized switchboards causes lethal explosions and short circuits.",
          "Incorrect. Waste heat recovery is a foundational, highly efficient thermodynamic application."
        ]
      },
      {
        "order": 6,
        "question": "Defrost Management (Demand Defrost vs Timed Electric Defrost): Why is adaptive demand defrost (using optical ice sensors or coil temperature delta-T algorithms) substantially more energy-efficient than traditional scheduled timer defrosts in supermarket walk-in freezers?",
        "options": [
          "Adaptive defrost uses open-flame blowtorches that consume zero electricity",
          "Timer defrosts run electric resistive heating elements on a fixed clock schedule regardless of actual frost buildup, whereas adaptive demand defrost initiates heating only when ice accumulation restricts airflow, preventing unnecessary heat injection and refrigeration re-cooling cycles",
          "Electric timer defrosts generate renewable solar electricity inside the freezer",
          "Demand defrost keeps freezer coils completely encased in solid ice permanently"
        ],
        "correct": 1,
        "correctExplanation": "Fixed timer defrosts inject unwanted electrical heat into freezers even when coils are clean. Adaptive demand defrost monitors real frost accumulation, cutting defrost cycles by 40-60% and avoiding compressor re-pull-down energy.",
        "incorrectExplanation": "Incorrect. Adaptive demand defrosting initiates heating only when physical ice builds up, avoiding redundant electrical heating and subsequent re-cooling energy.",
        "optionFeedback": [
          "Incorrect. Open flames are prohibited in refrigeration systems and create lethal fire hazards.",
          "Correct! Demand defrosting prevents redundant heating cycles, protecting food temperatures and saving significant electric heater and compressor energy.",
          "Incorrect. Electric defrost heaters consume substantial electrical power from the grid.",
          "Incorrect. Demand defrosting maintains clean, ice-free evaporator coils for optimal heat transfer."
        ]
      },
      {
        "order": 7,
        "question": "Night Covers & Blinds (Unoccupied Thermal Load Management): For retail stores operating open produce or multi-deck display cases, what is the measured operational benefit of deploying manual or automated woven thermal night blinds during closed store hours?",
        "options": [
          "Night blinds are used solely to prevent store security guards from snacking",
          "Night blinds double the lighting electricity consumption of the supermarket",
          "Night blinds reduce radiative and convective heat gains into display cases by 30-40% during closed hours, lowering compressor power consumption and preventing food temperature spikes",
          "Night blinds cause display cases to freeze solid into ice cubes"
        ],
        "correct": 2,
        "correctExplanation": "Deploying aluminized woven night blinds over open cases creates a thermal radiation barrier and blocks ambient air entrainment, reducing case refrigeration load by 30-40% during unoccupied store hours.",
        "incorrectExplanation": "Incorrect. Thermal night blinds block radiation and convective infiltration during closed hours, reducing refrigeration energy demand by 30-40%.",
        "optionFeedback": [
          "Incorrect. Night blinds are thermal insulation barriers, not security locking mechanisms.",
          "Incorrect. Case lighting is switched off during closed hours, saving additional energy.",
          "Correct! Night blinds reduce heat entrainment into open cases during closed hours, saving 30-40% refrigeration energy and stabilizing product temperature.",
          "Incorrect. Refrigeration thermostats maintain stable setpoints without over-freezing."
        ]
      },
      {
        "order": 8,
        "question": "Cold Chain Temperature Integrity & Food Safety (Critical Control Points): In a commercial cold chain management system, what is the required temperature threshold and corrective protocol for chilled perishable dairy and meat display cases under HACCP standards?",
        "options": [
          "Turn off all temperature alarms because buzzing sounds irritate retail cashiers",
          "Allow meat to reach 25°C to speed up natural tenderizing",
          "Check temperatures once every six months using a visual guess",
          "Maintain core product temperatures strictly below 4°C (40°F), with automated digital temperature logging; if temperatures exceed 7°C for more than 2 hours, quarantine product for food safety evaluation and dispatch emergency refrigeration technicians"
        ],
        "correct": 3,
        "correctExplanation": "HACCP cold chain standards mandate maintaining chilled food below 4°C (40°F) to prevent pathogen proliferation (e.g., Listeria, Salmonella). Automated IoT sensors alert technicians to excursions before food safety is compromised.",
        "incorrectExplanation": "Incorrect. HACCP requires maintaining chilled foods below 4°C with continuous logging and automated excursion alerts.",
        "optionFeedback": [
          "Incorrect. Silencing temperature alarms leads to undetected cold-chain failures and catastrophic food spoilage.",
          "Incorrect. Allowing meat to reach 25°C causes rapid microbial proliferation and severe food poisoning outbreaks.",
          "Incorrect. Manual biennial checks violate food safety compliance and regulatory auditing standards.",
          "Correct! Maintaining chilled foods strictly below 4°C with automated sensor alarms prevents foodborne bacterial growth and complies with HACCP."
        ]
      }
    ]
  },
  {
    "courseId": 734,
    "courseCode": "ELH-68",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Workplace Scenario (Dynamic Markdown Algorithms vs Static Discounts): A supermarket store manager reviews evening waste logs and discovers that 80 kg of fresh bakery and packaged meats are discarded at closing. The store currently applies a flat 20% discount sticker at 5:00 PM. How does an automated dynamic markdown system optimize food waste reduction and revenue recovery?",
        "options": [
          "Dynamic markdown algorithms use historical sales velocity, current shelf stock levels, and days-to-expiry to calculate tiered progressive discounts (e.g., 20% at 2 days, 50% at 1 day, 75% on final afternoon), maximizing sell-through before expiration",
          "Dynamic markdowns double the retail price of expiring food to force customers to buy quickly",
          "Dynamic markdowns hide expiring food in employee break rooms so shoppers cannot see it",
          "Dynamic markdowns require throwing all food into dumpsters at noon every day"
        ],
        "correct": 0,
        "correctExplanation": "Dynamic markdown algorithms optimize price elasticity over time, applying graduated discount tiers based on real-time inventory and shelf life, achieving 60-80% waste reduction compared to static single-tier discounting.",
        "incorrectExplanation": "Incorrect. Dynamic markdown systems adjust discount percentages progressively based on real-time inventory and remaining shelf life to maximize sell-through.",
        "optionFeedback": [
          "Correct! Graduated, algorithmically determined markdowns match price sensitivity to remaining shelf life, selling through perishable inventory before expiration.",
          "Incorrect. Increasing prices on expiring products guarantees 100% waste and customer rejection.",
          "Incorrect. Concealing inventory prevents sales and guarantees disposal waste.",
          "Incorrect. Premature disposal destroys edible food value and inflates waste hauling costs."
        ]
      },
      {
        "order": 2,
        "question": "Food Waste Hierarchy (EPA Wasted Food Scale / Circular Economy): Under the international food waste hierarchy, what is the prioritized sequence for managing surplus food in a commercial retail grocery operation?",
        "options": [
          "Landfill first, then incineration, then animal feed, and finally source reduction",
          "Source Reduction (inventory optimization) -> Human Food Donation (food rescue charities) -> Animal Feed -> Industrial Bio-Digestion / Composting -> Landfill (last resort)",
          "Incinerate all surplus food in outdoor barrels behind the grocery store",
          "Export surplus perishable food on international cargo planes to distant continents"
        ],
        "correct": 1,
        "correctExplanation": "The food waste hierarchy prioritizes prevention (source reduction), followed by feeding hungry people (rescue donation), animal feed, biological recovery (anaerobic digestion/compost), and landfill as the least preferred option.",
        "incorrectExplanation": "Incorrect. The food recovery hierarchy prioritizes prevention first, followed by human donation, animal feed, composting/biogas, and landfill last.",
        "optionFeedback": [
          "Incorrect. Landfilling is the lowest and most damaging tier in the food waste hierarchy.",
          "Correct! Prioritizing source reduction and surplus food donation saves resources, feeds communities, and diverts organic waste from landfills.",
          "Incorrect. Open burning of waste generates toxic emissions and violates environmental safety laws.",
          "Incorrect. Air freighting surplus perishable food creates massive carbon emissions and breaks food safety cold chains."
        ]
      },
      {
        "order": 3,
        "question": "Legal Protections & Food Safety (Surplus Food Donation Protocols): Retail store employees are often reluctant to donate edible surplus food to food banks due to fear of liability if someone becomes ill. What legal protection (e.g., US Bill Emerson Good Samaritan Act / National Food Donation Laws) and operational protocol governs retail food donation?",
        "options": [
          "Retailers are strictly and criminally liable for any food donated, so donation is illegal",
          "Food donation requires removing all product packaging and dumping food onto open trucks",
          "Good Samaritan legislation protects food donors from civil and criminal liability when donating apparently wholesome food in good faith, provided standard cold-chain and hygienic handling protocols are followed",
          "Food banks must pay full retail price in cash before picking up surplus food"
        ],
        "correct": 2,
        "correctExplanation": "Good Samaritan food donation laws protect food businesses from legal liability when donating wholesome food in good faith. Donors must follow basic food hygiene and cold-chain temperature controls during transfer.",
        "incorrectExplanation": "Incorrect. Good Samaritan legislation protects food donors from liability for good-faith donations meeting hygienic and cold-chain standards.",
        "optionFeedback": [
          "Incorrect. Good Samaritan food donation laws explicitly shield donors from liability to encourage food rescue.",
          "Incorrect. Food must remain in sanitary, properly labeled packaging during transfer.",
          "Correct! Good Samaritan legislation shields retailers from liability when donating wholesome surplus food following standard hygiene protocols.",
          "Incorrect. Food donation is a non-commercial charitable partnership, not a cash retail transaction."
        ]
      },
      {
        "order": 4,
        "question": "Fresh Produce Management (First-In, First-Out - FIFO & Display Merchandising): How does proper rotation (FIFO) and controlled bulk display merchandising prevent produce shrink and waste in retail grocery departments?",
        "options": [
          "Stacking fresh produce 10 layers deep to crush bottom fruits with excessive weight",
          "Placing newly arrived produce boxes directly on top of older stock without rotating",
          "Washing all fresh berries in hot water before placing them on warm shelves",
          "Rotating existing stock forward before placing new deliveries behind (FIFO), and using dummy shelf risers to create visual abundance without piling excess perishable inventory that bruises and spoils"
        ],
        "correct": 3,
        "correctExplanation": "FIFO ensures older stock sells first. Using false-bottom dummy shelf risers creates the visual perception of overflowing abundance for shoppers while keeping actual exposed perishable inventory small and fresh.",
        "incorrectExplanation": "Incorrect. FIFO rotation and false-bottom display risers prevent produce bruising, maintain shelf freshness, and minimize shrink.",
        "optionFeedback": [
          "Incorrect. Over-stacking crushes and bruises produce, accelerating mold and rot.",
          "Incorrect. Neglecting rotation leaves older stock at the bottom to rot and spoil.",
          "Incorrect. Hot water and moisture cause immediate berry degradation and mold proliferation.",
          "Correct! FIFO rotation ensures timely sell-through, and dummy risers provide appealing visual merchandising without excess perishable stock."
        ]
      },
      {
        "order": 5,
        "question": "Bakery & Deli Waste Upcycling (Value-Added Circular Processing): What is an example of value-added internal circular processing for unsaleable day-old bakery bread and surplus deli produce within a grocery store?",
        "options": [
          "Reprocessing day-old bread into seasoned croutons, breadcrumbs, or craft beer fermentation mash, and converting surplus vegetables into prepared soup stocks",
          "Selling moldy bread as fresh gluten-free pastry",
          "Flushing day-old bread down customer restrooms",
          "Burying bread in the parking lot asphalt"
        ],
        "correct": 0,
        "correctExplanation": "Day-old bread is wholesome but loses freshness. Upcycling it into breadcrumbs, croutons, or brewing mash captures full economic value and eliminates organic waste generation.",
        "incorrectExplanation": "Incorrect. Reprocessing wholesome surplus bakery and produce into croutons, breadcrumbs, and prepared soups captures culinary value and prevents waste.",
        "optionFeedback": [
          "Correct! Converting day-old bread into croutons/breadcrumbs and surplus vegetables into deli stocks captures revenue and eliminates waste.",
          "Incorrect. Selling moldy food is a severe food safety violation.",
          "Incorrect. Flushing solids causes massive plumbing blockages and municipal sewer overflows.",
          "Incorrect. Burying organic matter under asphalt damages pavement and wastes edible resources."
        ]
      },
      {
        "order": 6,
        "question": "Demand Forecasting & Ordering Precision (AI & Automated Replenishment): How does modern AI-driven automated store replenishment reduce retail grocery shrink compared to manual spreadsheet ordering?",
        "options": [
          "AI ordering ignores all customer purchases and orders fixed quantities every day",
          "AI replenishment integrates point-of-sale (POS) real-time velocity, weather forecasts, local holiday events, and historical shelf-life degradation to order optimal batch sizes, avoiding upstream over-ordering",
          "AI systems require store managers to manually guess every item quantity with dice",
          "AI ordering triples inventory orders during quiet rainy weekdays"
        ],
        "correct": 1,
        "correctExplanation": "AI replenishment models correlate weather, local events, day-of-week trends, and real-time POS data to optimize replenishment quantities, cutting over-ordering shrink by 20-30% while maintaining on-shelf availability.",
        "incorrectExplanation": "Incorrect. AI automated replenishment combines POS sales data, weather forecasts, and shelf-life metrics to generate precise order quantities.",
        "optionFeedback": [
          "Incorrect. Fixed ordering ignores dynamic consumer purchasing patterns.",
          "Correct! Incorporating POS sales velocity, weather trends, and shelf-life constraints prevents over-ordering and drastically cuts perishable shrink.",
          "Incorrect. AI utilizes statistical regression and machine learning algorithms, not random guessing.",
          "Incorrect. Smart replenishment dampens orders during low-demand weather conditions."
        ]
      },
      {
        "order": 7,
        "question": "Customer Communication & Nudge Strategies ('Ugly Produce' / Approaching Expiry): How can retail grocery stores effectively merchandise cosmetically imperfect fruits and vegetables ('wonky' / 'ugly' produce) to eliminate farm-level and retail waste?",
        "options": [
          "Hide cosmetically imperfect produce in black trash bags in the store basement",
          "Throw away all slightly curved cucumbers before they enter the supermarket",
          "Create a dedicated branded discount line (e.g., 'Naturally Imperfect' / 'Imperfectly Delicious') with attractive pricing and clear sustainability messaging explaining that surface blemishes do not affect taste or nutrition",
          "Spray produce with toxic automotive paint to create uniform color"
        ],
        "correct": 2,
        "correctExplanation": "Millions of tons of edible produce are rejected for minor aesthetic flaws (shape, size, color). Branded discount lines (e.g., 'Naturally Imperfect') celebrate authentic food, offering value to consumers and revenue to farmers.",
        "incorrectExplanation": "Incorrect. Dedicated branded discount programs for cosmetically imperfect produce recover edible food and engage eco-conscious shoppers.",
        "optionFeedback": [
          "Incorrect. Hiding produce prevents customer purchases and guarantees waste.",
          "Incorrect. Rejecting curved produce wastes massive agricultural resources and edible food.",
          "Correct! Branded imperfect produce programs educate shoppers, offer lower price points, and recover vast volumes of nutritious food.",
          "Incorrect. Applying chemical paint to food products is lethal and illegal."
        ]
      },
      {
        "order": 8,
        "question": "Organic Waste Separation & Commercial Composting: When food waste is unavoidable (e.g., vegetable trimmings, bones, spoiled perishables), what operational protocol ensures successful off-site commercial composting or anaerobic digestion?",
        "options": [
          "Mix plastic shopping bags, metal cutlery, and glass bottles into the organic waste bins",
          "Keep organic bins tightly sealed in outdoor sun for weeks until they attract pests",
          "Pour motor oil into organic bins to prevent bad smells",
          "Enforce strict depackaging and segregation protocols to ensure zero plastic, film, or metal contamination enters dedicated organic collection bins, using certified compostable liner bags where required"
        ],
        "correct": 3,
        "correctExplanation": "Commercial composters and anaerobic digesters reject organic waste contaminated with plastics, glass, or metals. Strict depackaging and designated clean organic bins ensure material can be transformed into high-grade compost or biogas.",
        "incorrectExplanation": "Incorrect. Organic waste streams must undergo strict depackaging and zero-contamination sorting to produce clean agricultural compost and biogas.",
        "optionFeedback": [
          "Incorrect. Inorganic contaminants (plastics, metals, glass) ruin compost batches and cause rejections at processing facilities.",
          "Incorrect. Organic bins must be collected regularly and kept hygienic to prevent vectors and odor nuisance.",
          "Incorrect. Hazardous motor oil poisons compost biology and contaminates soil ecosystems.",
          "Correct! Meticulous depackaging and contamination-free sorting produce premium organic feedstock for commercial composting and biomethane generation."
        ]
      }
    ]
  },
  {
    "courseId": 751,
    "courseCode": "ELH-69",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Workplace Scenario (Retail Lighting Power Density - LPD & LED Retrofits): A fashion retail chain audits an existing store illuminated with ceramic metal halide (CMH) and halogen spotlights. The measured Lighting Power Density (LPD) is 22 W/m2. What retrofit achieves compliance with ASHRAE 90.1 / Title 24 standards (LPD < 8 W/m2) while enhancing product visual appeal?",
        "options": [
          "Replace all CMH and halogen fixtures with high Color Rendering Index (CRI >90) LED track luminaires equipped with precision optical lenses and automated daylight dimming, dropping LPD below 6.5 W/m2",
          "Turn off all store lights and force customers to shop in complete darkness using their mobile phone flashlights",
          "Replace halogen bulbs with incandescent filament bulbs from the 19th century",
          "Remove all ceiling fixtures and place kerosene oil lanterns on display tables"
        ],
        "correct": 0,
        "correctExplanation": "High-CRI (>90) LED track fixtures deliver superior color rendering for merchandise while slashing lighting power density by over 70% (from 22 W/m2 down to <6.5 W/m2), complying with stringent building energy codes.",
        "incorrectExplanation": "Incorrect. High-CRI LED retrofits provide exceptional merchandise visual appeal while reducing lighting power density below ASHRAE 90.1 limits (<8 W/m2).",
        "optionFeedback": [
          "Correct! High-CRI LED fixtures enhance clothing colors while reducing electrical lighting power density by >70% and slashing air conditioning heat loads.",
          "Incorrect. Eliminating store lighting destroys customer experience and retail sales.",
          "Incorrect. Incandescent bulbs are highly inefficient (emitting 90% of power as heat) and violate modern energy codes.",
          "Incorrect. Kerosene lanterns create severe fire hazards and toxic indoor air emissions."
        ]
      },
      {
        "order": 2,
        "question": "HVAC Efficiency (Vestibules, Air Curtains & Infiltration Control): In high-traffic retail stores, front entrance sliding doors open hundreds of times per hour. How do high-efficiency vestibules and downward-velocity air curtains minimize HVAC energy waste?",
        "options": [
          "They blow cold refrigerated air out onto the street to attract pedestrians",
          "They create an engineered aerodynamic air barrier across the door opening, reducing conditioned air loss and outdoor humidity infiltration by 70-80%",
          "They trap customers inside the store so they cannot leave without buying",
          "They generate electricity from customer footsteps to power the cash registers"
        ],
        "correct": 1,
        "correctExplanation": "Uncontrolled door openings cause massive infiltration of outdoor hot/humid or freezing air. Air curtains generate a high-velocity planar jet of air that acts as an invisible door, blocking 70-80% of infiltration energy losses.",
        "incorrectExplanation": "Incorrect. Air curtains and vestibules create aerodynamic barriers that prevent conditioned indoor air from escaping through open store entrance doors.",
        "optionFeedback": [
          "Incorrect. Discharging conditioned air outdoors wastes vast amounts of HVAC energy.",
          "Correct! Properly commissioned air curtains and vestibules block 70-80% of air infiltration, stabilizing store comfort and slashing HVAC loads.",
          "Incorrect. Store entrances must maintain unobstructed customer egress under building life-safety codes.",
          "Incorrect. Piezoelectric footstep generation produces negligible power and is unrelated to entrance HVAC barriers."
        ]
      },
      {
        "order": 3,
        "question": "Demand-Controlled Ventilation (DCV with CO2 Sensing in Retail): Retail stores experience extreme occupancy swings between quiet weekday mornings and packed weekend afternoons. How does Demand-Controlled Ventilation (DCV) optimize indoor air quality and energy consumption?",
        "options": [
          "DCV shuts off outside air ventilation completely on busy weekends to save energy",
          "DCV pumps pure oxygen into the store to make shoppers buy more merchandise",
          "DCV continuously modulates outdoor air intake dampers based on real-time indoor CO2 sensor readings (maintaining 800-1000 ppm), delivering clean air during peak rushes while avoiding over-ventilating and over-conditioning empty stores",
          "DCV opens all roof vents during thunderstorms to clean store carpets"
        ],
        "correct": 2,
        "correctExplanation": "DCV uses indoor CO2 sensors to gauge real-time occupancy. It provides full fresh air ventilation during crowded peak hours while reducing outdoor air intake during low occupancy, saving 20-30% in ventilation heating and cooling energy.",
        "incorrectExplanation": "Incorrect. DCV modulates fresh air dampers based on real-time CO2 levels, ensuring clean indoor air during peak hours while avoiding over-conditioning empty spaces.",
        "optionFeedback": [
          "Incorrect. Restricting fresh air during peak occupancy causes stuffy air, drowsiness, and building code violations.",
          "Incorrect. Pure oxygen systems are explosive hazards and prohibited in commercial building ventilation.",
          "Correct! CO2-based DCV dynamically matches outdoor air ventilation rates to actual customer density, optimizing air quality and saving 20-30% energy.",
          "Incorrect. Ingesting rain through ventilation ducts causes water damage and mold growth."
        ]
      },
      {
        "order": 4,
        "question": "Smart Lighting Controls (Daylight Harvesting & Task Tuning): In a retail storefront with large floor-to-ceiling perimeter glass windows, what operational feature of daylight harvesting controls maximizes energy savings?",
        "options": [
          "Flashing strobe lights that pulse at high speed to save battery power",
          "Manual light switches that require employees to flip switches every 5 minutes",
          "Blackout curtains drawn over all storefront windows to block all natural daylight",
          "Photo-sensors measure ambient natural daylight entering perimeter zones and automatically dim adjacent electrical LED fixtures continuously, exploiting natural sunlight without creating glare"
        ],
        "correct": 3,
        "correctExplanation": "Daylight harvesting utilizes continuous dimming photosensors in perimeter daylight zones. As natural sunlight illuminates the storefront, electrical LED output dims smoothly, saving up to 40-60% in perimeter lighting energy.",
        "incorrectExplanation": "Incorrect. Daylight harvesting photosensors automatically dim LED lighting in perimeter zones when natural sunlight is sufficient.",
        "optionFeedback": [
          "Incorrect. Strobe lighting causes visual discomfort, headaches, and seizure risks for occupants.",
          "Incorrect. Manual switching is unreliable, disruptive, and rarely maintained by retail sales staff.",
          "Incorrect. Blocking natural daylight eliminates energy savings and reduces visual storefront appeal.",
          "Correct! Continuous daylight harvesting sensors dim perimeter fixtures automatically, cutting electrical consumption while maintaining uniform target illuminance."
        ]
      },
      {
        "order": 5,
        "question": "HVAC Sub-Zoning & Temperature Setpoint Hygiene: In a multi-story department store, why is independent thermal sub-zoning between perimeter zones (window frontage) and core interior zones essential for energy efficiency?",
        "options": [
          "Because perimeter zones experience high solar radiation and envelope heat gains while interior zones experience heat gains solely from lighting and people; independent zoning prevents simultaneous heating and cooling battles",
          "Because all floors must have identical temperatures regardless of sun exposure",
          "To allow sales staff to store ice cream in the changing rooms",
          "Sub-zoning is prohibited by modern mechanical engineering standards"
        ],
        "correct": 0,
        "correctExplanation": "Perimeter zones fluctuate with solar radiation and outdoor weather, while interior zones have stable internal loads. Dedicated Variable Air Volume (VAV) sub-zoning prevents the common defect of simultaneous perimeter cooling and interior heating.",
        "incorrectExplanation": "Incorrect. Independent zoning prevents simultaneous heating and cooling by isolating exterior solar loads from interior occupant/lighting loads.",
        "optionFeedback": [
          "Correct! Thermal sub-zoning decouples weather-sensitive perimeter loads from interior heat gains, eliminating simultaneous heating/cooling battles.",
          "Incorrect. Uniform single-zone control causes severe hot/cold complaints and energy waste.",
          "Incorrect. Retail changing rooms require standard comfortable HVAC conditions.",
          "Incorrect. Independent thermal zoning is a foundational requirement under commercial building energy codes (ASHRAE 90.1)."
        ]
      },
      {
        "order": 6,
        "question": "Building Automation & Night Setback Schedules: What is the proven energy management best practice for retail HVAC thermostat setpoints during unoccupied night hours?",
        "options": [
          "Maintain daytime comfort setpoints (21°C / 70°F) 24 hours a day, 365 days a year in empty stores",
          "Implement automated night setback schedules (e.g., relaxing cooling to 28°C / 82°F and heating to 15°C / 60°F during closed hours), with optimal morning pre-start algorithms",
          "Shut off all building power and let pipes freeze during winter",
          "Run all heating and air conditioning units simultaneously at maximum capacity all night"
        ],
        "correct": 1,
        "correctExplanation": "Unoccupied night setback allows indoor temperatures to float within safe non-damaging boundaries when stores are empty, cutting compressor and boiler runtime by 15-25% without impacting morning customer comfort.",
        "incorrectExplanation": "Incorrect. Implementing automated night temperature setback schedules during closed hours eliminates wasteful unoccupied heating and cooling.",
        "optionFeedback": [
          "Incorrect. Maintaining tight daytime comfort setpoints in empty buildings wastes substantial utility energy.",
          "Correct! Night setback schedules relax thermostat setpoints during closed hours, slashing HVAC runtime while maintaining morning readiness.",
          "Incorrect. Complete shutdown in freezing climates causes catastrophic burst pipes and inventory water damage.",
          "Incorrect. Simultaneous heating and cooling at full blast is a catastrophic control failure."
        ]
      },
      {
        "order": 7,
        "question": "Economizer Free Cooling (Dry-Bulb vs Enthalpy Control): Under what ambient outdoor weather conditions should a retail packaged rooftop unit (RTU) economizer introduce 100% outside air for 'free cooling'?",
        "options": [
          "When outdoor air is hotter and more humid than store return air",
          "When outdoor air contains heavy smoke and dust storms",
          "When outdoor ambient air temperature and total enthalpy are lower than indoor return air parameters (e.g., cool, dry outdoor air between 12°C and 18°C), allowing compressors to stage off completely",
          "Only when outside temperatures drop below -30°C"
        ],
        "correct": 2,
        "correctExplanation": "An air economizer uses motorized dampers to bring in cool outdoor air to satisfy indoor cooling demands without running energy-intensive mechanical refrigeration compressors, delivering major energy savings.",
        "incorrectExplanation": "Incorrect. Economizers provide free cooling by introducing 100% outdoor air when ambient temperature and enthalpy are lower than return air setpoints.",
        "optionFeedback": [
          "Incorrect. Introducing hot, humid air forces compressors to work harder to dehumidify and cool the store.",
          "Incorrect. Polluted outdoor air must not be introduced into indoor retail spaces.",
          "Correct! Economizer free cooling exploits cool outdoor ambient conditions, modulating dampers to satisfy cooling loads with zero compressor energy.",
          "Incorrect. Freezing outdoor air requires heating, not free cooling."
        ]
      },
      {
        "order": 8,
        "question": "Refrigeration Heat Interaction in Supermarkets (Cold Aisle Effect): In grocery stores with open refrigeration cases, the 'cold aisle effect' causes store air conditioning thermostats to register artificially cold temperatures while interior clothing/dry aisles remain hot. How should retail HVAC engineers solve this interaction?",
        "options": [
          "Ignore air distribution and install 50 portable space heaters in every aisle",
          "Place electric baseboard heaters inside the open ice cream freezers",
          "Turn off all grocery store lighting permanently to cool down the hot aisles",
          "Install ceiling-mounted low-velocity destratification fans and under-shelf return air grilles to draw spilled cold air directly back to refrigeration systems, while balancing store-wide air distribution"
        ],
        "correct": 3,
        "correctExplanation": "Cold air spillage from open refrigerated display cases settles in grocery aisles, causing local over-cooling and false thermostat readings. Under-case return ducts and destratification fans recover and redistribute this air efficiently.",
        "incorrectExplanation": "Incorrect. Air distribution balancing, destratification fans, and under-case return ducts mitigate cold-aisle air spillage and stabilize store comfort.",
        "optionFeedback": [
          "Incorrect. Uncontrolled portable heaters cause electrical circuit overloads and fire hazards.",
          "Incorrect. Placing heaters in freezers destroys food inventory and inflates electrical power bills.",
          "Incorrect. Disabling store lighting disrupts shopping operations without solving airflow imbalances.",
          "Correct! Destratification fans and under-case return grilles extract spilled cold air and rebalance retail microclimates efficiently."
        ]
      }
    ]
  },
  {
    "courseId": 752,
    "courseCode": "ELH-70",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Workplace Scenario (Supplier Code of Conduct Enforcement): A retail category manager audits a key private-label apparel vendor. The audit reveals that the vendor subcontracts garment sewing to an unapproved shadow factory with locked fire exits and sub-minimum wage pay. What is the mandatory procurement and ESG response?",
        "options": [
          "Issue a formal non-conformance notice, suspend unapproved subcontracting immediately, require an urgent Corrective Action Plan (CAP) with third-party verification, and terminate the vendor relationship if systemic non-compliance persists",
          "Praise the vendor for reducing manufacturing labor costs and increase order volumes",
          "Ask the vendor to hide the shadow factory from future audit teams",
          "Ignore the issue because the retail store is located in a different country"
        ],
        "correct": 0,
        "correctExplanation": "Unauthorized subcontracting to sweatshops violates retail Supplier Codes of Conduct and international labor laws. Retailers must immediately stop unauthorized production, enforce strict corrective actions, or terminate the supplier.",
        "incorrectExplanation": "Incorrect. Subcontracting to non-compliant shadow factories requires immediate suspension, a verified Corrective Action Plan, or commercial termination.",
        "optionFeedback": [
          "Correct! Enforcing Supplier Code of Conduct rules through immediate suspension, verified CAPs, and potential termination protects worker rights and brand integrity.",
          "Incorrect. Benefiting from illegal labor exploitation violates international human rights laws and brand ESG codes.",
          "Incorrect. Conspiring to conceal audit non-conformances is fraudulent and illegal.",
          "Incorrect. Retailers face direct legal liability and brand boycott risks for supply chain labor abuses."
        ]
      },
      {
        "order": 2,
        "question": "Sustainable Commodity Certifications (Third-Party Eco-Labels): When a retail supermarket sources private-label coffee, tea, and chocolate, which independent third-party certification guarantees fair farmer wages, safe working conditions, and prohibitions on child labor and deforestation?",
        "options": [
          "An unverified cartoon picture of a green tree printed by the marketing team",
          "Fairtrade International / Rainforest Alliance certification, with verified audit trails and premium payments directly supporting smallholder agricultural cooperatives",
          "A handwritten note from the shipping container driver",
          "Certifications are decorative and have no verified standards"
        ],
        "correct": 1,
        "correctExplanation": "Recognized third-party certifications like Fairtrade and Rainforest Alliance establish verified standards for minimum farmer pricing, social premiums, worker safety, zero child labor, and environmental conservation.",
        "incorrectExplanation": "Incorrect. Third-party certifications like Fairtrade and Rainforest Alliance ensure audited compliance with fair labor, living wages, and environmental criteria.",
        "optionFeedback": [
          "Incorrect. Unverified marketing icons represent greenwashing and lack independent auditing.",
          "Correct! Fairtrade and Rainforest Alliance certifications guarantee audited labor standards, fair pricing, and biodiversity protection.",
          "Incorrect. Driver notes offer zero agricultural or labor compliance verification.",
          "Incorrect. Independent certification schemes utilize rigorous third-party auditing protocols."
        ]
      },
      {
        "order": 3,
        "question": "Sustainable Seafood Sourcing (MSC & ASC Chain of Custody): What is the primary difference between Marine Stewardship Council (MSC) and Aquaculture Stewardship Council (ASC) certifications in retail seafood procurement?",
        "options": [
          "MSC and ASC are competing brands of canned tuna with identical ownership",
          "MSC certifies plastic toys, whereas ASC certifies beef cattle",
          "MSC certifies wild-capture sustainable fisheries (preventing overfishing and protecting marine habitats), whereas ASC certifies responsibly farmed aquaculture (controlling water pollution, feed sustainability, and disease management)",
          "Neither certification addresses environmental protection or overfishing"
        ],
        "correct": 2,
        "correctExplanation": "MSC focuses on wild-caught marine fisheries to ensure stocks are sustainable and ecosystems protected. ASC focuses on farmed seafood (aquaculture) to control chemical use, water quality, and sustainable feed sourcing.",
        "incorrectExplanation": "Incorrect. MSC certifies wild-capture fisheries against overfishing, while ASC certifies responsible farmed aquaculture against environmental degradation.",
        "optionFeedback": [
          "Incorrect. Both are independent non-profit certification organizations, not commercial canned food brands.",
          "Incorrect. MSC and ASC are premier global seafood sustainability standards.",
          "Correct! MSC certifies sustainable wild fisheries against overfishing, while ASC ensures responsible environmental stewardship in aquaculture farming.",
          "Incorrect. Both standards represent gold benchmarks in ocean and aquaculture conservation."
        ]
      },
      {
        "order": 4,
        "question": "Living Wage & Ethical Trading Initiatives (ETI Base Code): What does the Ethical Trading Initiative (ETI) Base Code specify regarding worker wages in retail merchandise manufacturing?",
        "options": [
          "Wages must be paid entirely in company store discount coupons",
          "Wages may be withheld indefinitely if the factory does not make a profit",
          "Wages should be set at zero for all female and migrant workers",
          "Wages should always be enough to meet basic needs and provide some discretionary income (a living wage), and must be paid in legal tender without unauthorized deductions"
        ],
        "correct": 3,
        "correctExplanation": "The ETI Base Code mandates that living wages must be paid to all workers to meet basic living costs (food, housing, healthcare, education) plus discretionary savings, without illegal deductions or delayed pay.",
        "incorrectExplanation": "Incorrect. The ETI Base Code mandates that wages must meet basic needs and provide discretionary income (living wage) without unauthorized deductions.",
        "optionFeedback": [
          "Incorrect. Paying wages in store coupons (scrip) is an illegal form of debt bondage.",
          "Incorrect. Withholding earned wages violates international labor standards and national laws.",
          "Incorrect. Wage discrimination based on gender or migrant status is a severe human rights violation.",
          "Correct! The ETI Base Code requires living wages that cover basic family needs and discretionary income with transparent payroll records."
        ]
      },
      {
        "order": 5,
        "question": "Chemical Safety in Retail Consumer Goods (Manufacturing Restricted Substances List - MRSL): How does a brand-level ZDHC (Zero Discharge of Hazardous Chemicals) MRSL protect factory workers and consumers compared to a standard finished-product RSL?",
        "options": [
          "An MRSL bans hazardous toxic chemicals (e.g., Azo dyes, heavy metals, phthalates, PFAS) from being used anywhere in the manufacturing chemical inventory, protecting factory workers and wastewater streams, rather than only testing the final retail product",
          "An MRSL allows infinite use of toxic chemicals as long as garments are washed once before sale",
          "An MRSL applies exclusively to plastic toy packaging boxes",
          "An MRSL is an optional suggestion that requires zero compliance testing"
        ],
        "correct": 0,
        "correctExplanation": "A Restricted Substances List (RSL) tests only the final consumer garment. A Manufacturing RSL (MRSL) prohibits hazardous chemicals from entering the factory facility entirely, protecting chemical handlers, local rivers, and end consumers.",
        "incorrectExplanation": "Incorrect. An MRSL bans hazardous process chemicals from the entire factory manufacturing inventory, eliminating toxics at the source.",
        "optionFeedback": [
          "Correct! ZDHC MRSL standards eliminate hazardous chemicals from factory inputs, protecting worker health, municipal waterways, and consumers.",
          "Incorrect. Washing garments does not eliminate worker chemical exposure or industrial wastewater pollution.",
          "Incorrect. MRSL standards govern textile, leather, footwear, and apparel manufacturing chemical formulations.",
          "Incorrect. Global retailers enforce mandatory MRSL testing and wastewater effluent verifications."
        ]
      },
      {
        "order": 6,
        "question": "Supplier ESG Scorecards & Procurement Integration: How should retail procurement teams integrate supplier ESG scorecard ratings into annual vendor purchasing decisions?",
        "options": [
          "Award 100% of purchase contracts solely to the lowest bidder regardless of child labor or severe pollution violations",
          "Weight ESG performance metrics (e.g., carbon reduction, ethical labor audits, sustainable raw materials) alongside commercial price and delivery quality in the formal vendor scorecard, allocating greater order volume to top ESG performers",
          "Delete all ESG scorecards before commercial price negotiation meetings",
          "Use ESG scorecards solely as decorative wall posters in the reception lobby"
        ],
        "correct": 1,
        "correctExplanation": "Sustainable procurement requires integrating ESG metrics directly into vendor evaluation scorecards. Tying commercial purchase volumes and preferred supplier status to verified ESG performance drives real supplier investment.",
        "incorrectExplanation": "Incorrect. Retail procurement must formally weight ESG scores alongside price and quality, allocating higher business volumes to sustainable vendors.",
        "optionFeedback": [
          "Incorrect. Solely prioritizing lowest price encourages vendor corner-cutting on safety, labor, and pollution controls.",
          "Correct! Weighting ESG performance in procurement scorecards creates tangible commercial incentives for suppliers to decarbonize and treat workers ethically.",
          "Incorrect. Excluding ESG data from commercial discussions renders sustainability policies ineffective.",
          "Incorrect. ESG scorecards must function as live, decisive procurement governance tools."
        ]
      },
      {
        "order": 7,
        "question": "Animal Welfare in Retail Supply Chains (Cruelty-Free & Sustainable Fibers): What certified sourcing standard ensures that wool and down garments sold by a retail brand originate from farms with strict animal welfare protections (e.g., zero mulesing for sheep, zero live-plucking for geese)?",
        "options": [
          "Printing a cartoon sheep on the garment price tag",
          "A verbal statement from a market trader claiming that sheep enjoy being cut",
          "Responsible Wool Standard (RWS) and Responsible Down Standard (RDS), verified through independent farm audits and complete supply chain custody tracing",
          "Importing unverified synthetic fur coated in toxic petrochemicals"
        ],
        "correct": 2,
        "correctExplanation": "The Responsible Wool Standard (RWS) and Responsible Down Standard (RDS) verify animal welfare on farms (prohibiting mulesing, live-plucking, and force-feeding) and track fiber custody from farm to retail store.",
        "incorrectExplanation": "Incorrect. The Responsible Wool Standard (RWS) and Responsible Down Standard (RDS) independently verify strict animal welfare and fiber traceability.",
        "optionFeedback": [
          "Incorrect. Decorative graphics provide zero proof of animal welfare or ethical farming practices.",
          "Incorrect. Mulesing causes acute animal suffering and is banned under responsible wool standards.",
          "Correct! RWS and RDS standards guarantee third-party verified animal welfare protections (no mulesing, no force-feeding) and chain-of-custody tracking.",
          "Incorrect. Unverified synthetic fur creates microplastic pollution and fails ethical fiber sourcing criteria."
        ]
      },
      {
        "order": 8,
        "question": "Anti-Greenwashing & Consumer Claims Substantiation (EU Green Claims Directive): Under modern consumer protection and anti-greenwashing directives, what is required before a retail brand can market a clothing line as '100% Sustainable' or 'Eco-Conscious'?",
        "options": [
          "No proof is needed if the marketing director likes the slogan",
          "Retailers may claim sustainability if at least 1% of the button is made from wood",
          "The brand must promise to donate 5 cents to an unspecified charity in 2050",
          "Vague generic claims are prohibited; brands must provide comprehensive Life Cycle Assessment (LCA) data, third-party verified certifications, and transparent evidence substantiating specific environmental benefits on public labels"
        ],
        "correct": 3,
        "correctExplanation": "The EU Green Claims Directive and FTC Green Guides prohibit vague claims like 'eco-friendly' or 'sustainable'. Retailers must substantiate claims with objective third-party LCA evidence, verified certifications, and clear scope explanations.",
        "incorrectExplanation": "Incorrect. Anti-greenwashing directives prohibit unsubstantiated generic claims, requiring verifiable third-party LCA evidence and specific environmental disclosures.",
        "optionFeedback": [
          "Incorrect. Unsubstantiated claims violate consumer protection laws and incur heavy regulatory fines.",
          "Incorrect. De minimis recycled content does not justify broad sustainability marketing claims.",
          "Incorrect. Vague distant charitable promises do not substantiate product-level environmental performance.",
          "Correct! Green claims directives mandate robust LCA data, third-party certification, and clear, non-misleading consumer communication."
        ]
      }
    ]
  },
  {
    "courseId": 735,
    "courseCode": "ELH-71",
    "passingScore": 80,
    "questions": [
      {
        "order": 1,
        "question": "Workplace Scenario (Checkout Carrier Bag Phaseout & Behavioral Nudges): A retail supermarket chain is legally phasing out lightweight single-use plastic checkout bags. Store cashiers face customer complaints and resistance at the checkout registers. What is the most effective operational and behavioral strategy to achieve high customer adoption of reusable bags?",
        "options": [
          "Train frontline cashiers to communicate the positive environmental benefits, implement a small mandatory charge for paper/reusable bags, place sturdy reusable bags at eye level, and offer loyalty reward points when shoppers bring their own bags",
          "Provide free single-use plastic bags secretly from underneath the counter",
          "Argue aggressively with shoppers and ban upset customers from the supermarket",
          "Eliminate all checkout bags and force customers to carry groceries loose in their bare arms"
        ],
        "correct": 0,
        "correctExplanation": "Successful plastic bag phaseouts combine clear frontline customer education, default visual merchandising of reusable options, behavioral pricing signals (bag charges), and positive reinforcement loyalty points.",
        "incorrectExplanation": "Incorrect. Combining positive cashier messaging, prominent reusable bag placement, pricing nudges, and loyalty rewards successfully shifts customer behavior.",
        "optionFeedback": [
          "Correct! Behavioral nudges, trained cashier communication, and loyalty incentives transition shoppers smoothly to durable reusable bags.",
          "Incorrect. Distributing secret plastic bags undermines company policy and violates statutory phaseout laws.",
          "Incorrect. Antagonistic behavior alienates shoppers and destroys customer satisfaction.",
          "Incorrect. Failing to provide convenient reusable alternatives creates severe customer friction."
        ]
      },
      {
        "order": 2,
        "question": "Produce Department Plastic Reduction (Bulk Produce & Reusable Mesh Bags): In the fresh produce section, supermarkets consume millions of thin single-use plastic barrier bags for loose fruits and vegetables. What operational alternative eliminates plastic waste without compromising cashier checkout speed?",
        "options": [
          "Wrap every single apple and banana individually in three layers of PVC cling film",
          "Encourage shoppers to buy loose produce using washable, tare-weighted certified organic cotton or rPET mesh bags, and install barcode price-computing scales in the produce aisle so items are pre-labeled before checkout",
          "Ban all fresh fruits and vegetables and sell only canned food",
          "Require customers to eat all produce inside the store before reaching the checkout registers"
        ],
        "correct": 1,
        "correctExplanation": "Reusable mesh produce bags allow cashiers to see the produce easily. Pairing them with tare-weighing scales and aisle pre-labeling eliminates thin single-use plastic barrier bags while keeping checkout lines moving quickly.",
        "incorrectExplanation": "Incorrect. Reusable tare-weighted mesh produce bags and pre-weighed barcode scales eliminate thin single-use produce plastic bags.",
        "optionFeedback": [
          "Incorrect. Wrapping individual produce items in plastic cling film massively inflates single-use plastic waste.",
          "Correct! Reusable mesh bags with tare-weight deductions and aisle pre-labeling scales eliminate millions of single-use barrier bags seamlessly.",
          "Incorrect. Eliminating fresh produce undermines consumer nutrition and core retail sales.",
          "Incorrect. Expecting immediate consumption inside store aisles is unrealistic and violates retail hygiene."
        ]
      },
      {
        "order": 3,
        "question": "Refill & Reuse Stations (Dry Bulk & Liquid Dispensers): A grocery retailer introduces dry bulk refill dispensers (for rice, pasta, nuts, grains) and liquid refill stations (for laundry detergents and olive oil). What operational standard is critical to maintain hygiene and prevent cross-contamination?",
        "options": [
          "Allow customers to put their unwashed hands directly inside bulk dispensing hoppers",
          "Mix all nuts, grains, and detergents together in a single open wooden barrel",
          "Implement gravity-fed sealed dispensers with mechanical portion handles, clean-in-place sanitation schedules, clear allergen labeling, and automated container tare-weight scales",
          "Refill stations do not require cleaning because dry food is naturally sterile"
        ],
        "correct": 2,
        "correctExplanation": "Refill systems require gravity-fed sealed hoppers to prevent physical contact, strict allergen segregation (e.g., peanuts vs oats), regular sanitation protocols, and automated tare-weight scales so shoppers only pay for net product.",
        "incorrectExplanation": "Incorrect. Refill stations require hygienic gravity-fed dispensers, strict allergen isolation, clean-in-place protocols, and tare-weight scales.",
        "optionFeedback": [
          "Incorrect. Direct hand contact causes severe microbial contamination and food safety violations.",
          "Incorrect. Mixing food with chemicals and cross-contaminating allergens causes fatal poisoning and anaphylaxis risks.",
          "Correct! Gravity-fed dispensers and tare scales provide hygienic, contactless dispensing with robust allergen control and accurate pricing.",
          "Incorrect. All food-contact surfaces require scheduled sanitation to prevent bacterial and pest infestation."
        ]
      },
      {
        "order": 4,
        "question": "Bio-Plastics vs Reusables (The PLA / Compostable Plastic Pitfall): Why is replacing single-use petroleum plastic deli containers with 'compostable' Polylactic Acid (PLA) bio-plastic containers often problematic in standard municipal waste systems?",
        "options": [
          "PLA containers explode when touched by human fingers",
          "PLA is completely illegal across all countries globally",
          "PLA is made of toxic uranium metal",
          "Most municipal systems lack high-heat (>58°C) commercial industrial composting facilities, causing PLA to end up in landfills where it does not degrade, or in plastic recycling bins where it contaminates and ruins commodity PET recycling batches"
        ],
        "correct": 3,
        "correctExplanation": "PLA requires industrial composting facilities (>58°C with high humidity) to decompose; it will not break down in home compost or oceans. Furthermore, PLA visually mimics PET, contaminating and ruining conventional PET recycling streams.",
        "incorrectExplanation": "Incorrect. PLA requires commercial industrial composting facilities (>58°C) and acts as a severe contaminant in conventional PET plastic recycling streams.",
        "optionFeedback": [
          "Incorrect. PLA is a non-explosive solid polymer.",
          "Incorrect. PLA is legally permitted but requires realistic end-of-life recovery infrastructure.",
          "Incorrect. PLA is derived from fermented plant starch (corn/sugarcane), not radioactive elements.",
          "Correct! Without dedicated industrial composting infrastructure, PLA ends up in landfills or ruins mechanical PET recycling batches."
        ]
      },
      {
        "order": 5,
        "question": "Supply Chain Packaging (B2B Pallet Stretch Wrap Reduction): A retail distribution center uses 50 tons of single-use LLDPE stretch film annually to secure merchandise boxes onto shipping pallets. How can the warehouse operations team eliminate this plastic waste?",
        "options": [
          "Switch to reusable heavy-duty pallet wraps with Velcro straps, or install automated pallet banders and high-tension reusable pallet nets designed for hundreds of transport loops",
          "Stop securing pallet loads and let boxes tumble off forklift trucks during transit",
          "Wrap pallets with single-use duct tape instead",
          "Glue all shipping boxes together with permanent epoxy adhesive so they can never be separated"
        ],
        "correct": 0,
        "correctExplanation": "Reusable pallet wraps with heavy-duty straps or tension nets replace single-use plastic stretch film in closed-loop retail distribution networks, eliminating tons of plastic waste and providing rapid 6-month financial paybacks.",
        "incorrectExplanation": "Incorrect. Reusable pallet wraps, tension nets, and strapping systems eliminate single-use plastic stretch film across closed-loop distribution routes.",
        "optionFeedback": [
          "Correct! Reusable heavy-duty pallet wraps and tension strapping systems eliminate single-use stretch wrap across closed-loop logistics.",
          "Incorrect. Unsecured pallets cause severe transit damage, worker crush injuries, and product loss.",
          "Incorrect. Single-use duct tape generates identical disposable adhesive waste.",
          "Incorrect. Permanent epoxy destroys corrugated cardboard boxes during depalletization."
        ]
      },
      {
        "order": 6,
        "question": "Deposit Return Schemes (DRS & Reverse Vending Machines): How do nationwide automated Deposit Return Schemes (DRS) utilizing Reverse Vending Machines (RVMs) achieve >90% collection rates for retail beverage containers (PET bottles and aluminum cans)?",
        "options": [
          "By banning all beverages and selling only powdered drinks",
          "By charging a small refundable monetary deposit at purchase that is returned to the consumer when the empty, uncrushed container is inserted into an in-store Reverse Vending Machine",
          "By requiring shoppers to mail empty bottles to government ministries via postal mail",
          "By hiring security guards to search customer homes for empty bottles"
        ],
        "correct": 1,
        "correctExplanation": "DRS assigns a visible financial deposit value to beverage containers. Consumers recover their deposit by returning empty containers to store Reverse Vending Machines (RVMs), generating clean, uncontaminated high-grade rPET and aluminum streams.",
        "incorrectExplanation": "Incorrect. Deposit Return Schemes place a refundable deposit on beverage containers that consumers reclaim via automated Reverse Vending Machines.",
        "optionFeedback": [
          "Incorrect. Banning beverages is commercially impossible and unnecessary.",
          "Correct! Refundable financial deposits combined with convenient retail Reverse Vending Machines drive recycling rates above 90% and supply clean food-grade rPET.",
          "Incorrect. Postal mailing of empty beverage containers is completely impractical.",
          "Incorrect. DRS relies on positive economic incentives, not invasive home searches."
        ]
      },
      {
        "order": 7,
        "question": "Microplastics & Synthetic Fibers in Retail Apparel: What operational initiative can a clothing retailer implement to address microplastic fiber shedding from synthetic apparel (polyester, nylon, acrylic)?",
        "options": [
          "Sell garments that dissolve instantly in cold water",
          "Tell customers to never wash their clothes under any circumstance",
          "Educate customers on full-load cold-water laundering, provide micro-fiber catching wash bags (e.g., Guppyfriend), and transition textile product lines to natural fibers or high-filament recycled yarns engineered for low fiber shedding",
          "Microplastics are completely harmless and beneficial to marine life"
        ],
        "correct": 2,
        "correctExplanation": "Synthetic clothes release hundreds of thousands of microplastic fibers per wash cycle. Retailers tackle this by transitioning to low-shedding textiles, encouraging cold-water washing, and retailing micro-fiber filter wash bags.",
        "incorrectExplanation": "Incorrect. Retailers reduce microplastic shedding through low-shed yarn engineering, cold-water washing education, and microfiber filter bags.",
        "optionFeedback": [
          "Incorrect. Dissolving clothing destroys product utility and customer trust.",
          "Incorrect. Advising against washing creates severe hygiene and odor problems.",
          "Correct! Promoting cold washing, fiber-capturing laundry accessories, and low-shed yarn engineering significantly reduces synthetic microplastic emissions.",
          "Incorrect. Microplastics bioaccumulate in marine food webs and cause severe toxicological harm."
        ]
      },
      {
        "order": 8,
        "question": "Corporate Plastic Audits & Baseline Accounting (Global Commitment / WWF ReSource): How does a retail enterprise establish an empirical baseline to measure its progress in eliminating single-use plastics under the Ellen MacArthur Global Commitment?",
        "options": [
          "Estimate plastic weight by guessing based on the number of stores",
          "Burn all plastic inventory before conducting the accounting survey",
          "Assume plastic consumption is zero if the store has green recycling bins",
          "Conduct a comprehensive SKU-level plastic packaging audit measuring the exact metric tonnage of virgin plastic, PCR content, polymer types (PET, HDPE, PP, PVC), and reuse model percentages across all private-label and operational categories"
        ],
        "correct": 3,
        "correctExplanation": "Establishing a credible baseline requires calculating the exact metric tonnage and polymer breakdown across every product SKU, tracking virgin plastic reduction, recycled content percentages, and reusable packaging growth annually.",
        "incorrectExplanation": "Incorrect. Corporate plastic accounting requires auditing SKU-level metric tonnage, polymer types, recycled content, and reuse percentages.",
        "optionFeedback": [
          "Incorrect. Subjective guesswork fails global reporting standards and corporate audit scrutiny.",
          "Incorrect. Incinerating inventory destroys assets and generates hazardous air emissions.",
          "Incorrect. The presence of recycling bins does not measure corporate plastic consumption.",
          "Correct! Granular SKU-level material accounting quantifies total plastic tonnage and polymer mix, providing a verified baseline for reduction targets."
        ]
      }
    ]
  }
];

export async function ensureCohort15_2_10FRemediation(): Promise<void> {
  try {
    const [existingSeed] = await db
      .select()
      .from(systemSeedsTable)
      .where(eq(systemSeedsTable.name, "sprint-15-2-10f-assessment-remediation"))
      .limit(1);

    if (existingSeed) {
      logger.info("Sprint 15.2.10F Controlled Assessment Quality Remediation already applied. Skipping runtime rewrite.");
      return;
    }

    const cohortCourses = await db
      .select()
      .from(coursesTable)
      .where(inArray(coursesTable.id, SPRINT_15_2_10F_COHORT_COURSE_IDS));

    if (cohortCourses.length !== 12) {
      logger.warn(
        { found: cohortCourses.length, expected: 12 },
        "Cohort 15.2.10F courses not fully present in DB yet. Skipping assessment remediation until seeded."
      );
      return;
    }

    await db.transaction(async (tx) => {
      for (const courseData of COHORT_15_2_10F_DATA) {
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
          name: "sprint-15-2-10f-assessment-remediation",
          version: 1,
        })
        .onConflictDoUpdate({
          target: systemSeedsTable.name,
          set: { version: 1, runAt: new Date() },
        });

      logger.info("Sprint 15.2.10F Controlled Assessment Quality Remediation transaction completed successfully.");
    });
  } catch (err) {
    logger.error({ err }, "Failed to execute Sprint 15.2.10F assessment remediation");
    throw err;
  }
}
