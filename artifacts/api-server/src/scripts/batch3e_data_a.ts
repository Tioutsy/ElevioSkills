import { RemediatedCourseDataBatch3E } from "./batch3e_part1";
import { PART1_COURSES } from "./batch3e_part1";

export const BATCH3E_DATA_A: RemediatedCourseDataBatch3E[] = [
  ...PART1_COURSES, // ELH-103, ELH-104, ELH-107

  // 4. ELH-108
  {
    courseCode: "ELH-108",
    title: "Renewable Energy: Rooftop Solar PV & Storage",
    slug: "renewable-energy-rooftop-solar-pv-storage",
    description: "Master commercial rooftop solar PV engineering, string vs. central inverter sizing, lithium iron phosphate (LFP) BESS storage integration, grid-tie compliance with the CEB Medium-Scale Distributed Generation (MSDG) scheme, and levelized cost of energy (LCOE) optimization.",
    fullDescription: "This advanced technical course prepares electrical engineers, solar project developers, and energy facility managers to design, permit, and commission commercial and industrial rooftop solar PV systems paired with battery energy storage. It covers solar irradiance modeling (PVSyst/PVGIS), bifacial monocrystalline panel selection, MPPT charge controllers, grid interconnection protection relays, peak shaving dispatch strategies, and Mauritian CEB grid-code compliance.",
    categoryId: 6,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_ENERGY_EFFICIENCY",
    secondaryCompetencies: ["COMP_SUSTAINABLE_DESIGN", "COMP_FINANCE"],
    learningObjectives: [
      "Model commercial solar PV yields, shading derating factors, and specific yield (kWh/kWp/year) using industry modeling methodologies.",
      "Dimension grid-tied inverter topologies, string matching, DC/AC oversizing ratios (1.2–1.3), and balance of plant (BoP).",
      "Specify lithium iron phosphate (LiFePO4/LFP) Battery Energy Storage Systems (BESS) for commercial peak shaving and power factor support.",
      "Navigate Central Electricity Board (CEB) MSDG interconnection rules, anti-islanding protection, and net-billing regulations.",
      "Develop a 30-day commercial rooftop solar project feasibility and financial modeling plan (IRR, NPV, LCOE)."
    ],
    intendedRoles: [
      "Solar PV Systems Engineers",
      "Commercial Electrical Contractors",
      "Energy & Sustainability Managers",
      "Renewable Energy Project Developers"
    ],
    badgeName: "Commercial Solar PV & Storage Engineer",
    badgeDescription: "Demonstrates applied mastery in commercial rooftop solar design, BESS integration, grid compliance, and solar financial modeling.",
    completionMessage: "Congratulations! You have completed Renewable Energy: Rooftop Solar PV & Storage. You are prepared to engineer bankable, high-yield commercial solar assets.",
    recommendedNextCourseCode: "ELH-109",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: Inverter Tripping at Peak Insolation",
        durationMinutes: 4,
        content: "A 450 kWp commercial rooftop solar system installed on a logistics warehouse in Plaine Magnien continuously trips offline at 12:30 PM on sunny days. The contractor oversized the DC array to 1.45 without checking local grid voltage limits, causing grid overvoltage protection to trip the string inverters whenever solar generation peaks. The warehouse loses over 35% of its potential clean energy yield and faces penalties from the Central Electricity Board (CEB). Renewable engineers must diagnose grid impedance, inverter voltage rise, and battery dispatch controls to restore reliable generation.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Solar PV engineering requires rigorous co-ordination between DC array generation, inverter power clipping limits, and local distribution grid voltage capacity."
          },
          {
            type: "callout",
            style: "warning",
            title: "Grid Voltage Rise Risk",
            content: "Injecting high solar currents into weak or high-impedance distribution feeders causes AC voltage to rise above statutory thresholds (e.g., +6% of 230/400V), triggering automatic inverter trip protection."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: Solar Resource Yield, Shading & Inverter Sizing",
        durationMinutes: 4,
        content: "Diagnose solar resource potential using Global Horizontal Irradiance (GHI) and Plane of Array (POA) irradiance data. In Mauritius, expected specific yields range from 1,450 to 1,750 kWh/kWp/year. Optimize DC/AC inverter sizing ratios between 1.15 and 1.28. Evaluate temperature coefficients (e.g., -0.35%/°C for monocrystalline PERC/TOPCon cells) and ensure string voltages stay within inverter MPPT voltage operating windows across local ambient extremes (15°C winter morning to 40°C rooftop summer).",
        contentBlocks: [
          {
            type: "paragraph",
            content: "String voltage calculations must account for open-circuit voltage (Voc) at minimum winter temperatures to prevent overvoltage destruction of inverter input stages."
          },
          {
            type: "table",
            title: "Solar PV Sizing & Performance Benchmarks",
            headers: ["Parameter", "Engineering Benchmark", "Operational Significance", "Failure Impact"],
            rows: [
              ["DC/AC Ratio", "1.15 to 1.28", "Optimizes inverter utilization at lower morning/evening sun", "Over 1.40 causes heavy thermal clipping"],
              ["Module Temp Coefficient (Pmax)", "-0.30% to -0.35%/°C", "Determines cell power loss at elevated roof temps", "Loss of 8–12% output at 60°C cell temp"],
              ["BESS C-Rate (Peak Shaving)", "0.5C (2-hour duration)", "Smooths demand spikes without cell overheating", "Excessive C-rate accelerates cell degradation"],
              ["Specific Yield (Mauritius)", "1,500–1,700 kWh/kWp/yr", "Measures annual energy per installed kilowatt peak", "Sub-1,300 indicates severe shading or fouling"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: BESS Storage Integration & Peak Shaving Dispatch",
        durationMinutes: 4,
        content: "Integrate Lithium Iron Phosphate (LiFePO4 / LFP) Battery Energy Storage Systems (BESS) behind the meter. Size BESS capacity to shave facility peak 15-minute maximum demand charges during evening tariff peaks. Configure the Energy Management System (EMS) to charge batteries during mid-day solar surplus (preventing grid curtailment) and discharge during 18:00–21:00 peak industrial tariffs, maximizing project Internal Rate of Return (IRR).",
        contentBlocks: [
          {
            type: "paragraph",
            content: "LiFePO4 chemistry provides high thermal stability, zero cobalt supply chain risk, and 6,000+ cycle life at 80% Depth of Discharge (DoD)."
          },
          {
            type: "callout",
            style: "tip",
            title: "Peak Shaving Economics",
            content: "In commercial industrial tariffs where maximum demand kVA charges represent 30–45% of the total monthly bill, shaving just 100 kVA of peak load can yield immediate payback within 3.5 years."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Factory Solar Grid Interconnection Bottleneck",
        durationMinutes: 4,
        content: "A textile dyehouse in Triolet applies to install a 600 kWp rooftop solar PV system under the CEB Medium-Scale Distributed Generation (MSDG) scheme. The utility grid audit reveals the local 22 kV feeder is constrained and limits net injection to a maximum of 250 kVA. The factory owner considers canceling the project. How should the solar lead engineer advise the client?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "Utility export is capped at 250 kVA while rooftop solar capacity is 600 kWp.",
            options: [
              {
                id: "A",
                text: "Proceed with the 600 kWp array paired with a 250 kW / 500 kWh LFP BESS and zero-export dynamic reverse-power limiters to absorb surplus solar for evening production shifts.",
                outcome: "Optimal. Maximizes 100% on-site self-consumption, complies with CEB export caps, and slashes expensive peak demand grid charges."
              },
              {
                id: "B",
                text: "Downsize the solar array to 250 kWp and abandon any battery storage.",
                outcome: "Sub-optimal. Leaves 50% of available roof area unused and fails to capture high daytime textile manufacturing loads."
              },
              {
                id: "C",
                text: "Install the 600 kWp array without notifying the CEB and illegally feed unmetered excess power into the public grid.",
                outcome: "Severe Violation. Results in immediate utility disconnect, heavy criminal fines, and dangerous transformer islanding hazards."
              },
              {
                id: "D",
                text: "Replace all factory electric motors with diesel engines.",
                outcome: "Regressive. Drastically increases Scope 1 carbon emissions and operating fuel expenses."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Solar Feasibility & Permitting Plan",
        durationMinutes: 4,
        content: "Formulate a 30-day solar PV project execution plan. Perform high-precision drone roof shading surveys, calculate hourly load profiles using 15-minute smart meter interval data, run PVSyst yield simulations, and prepare the CEB MSDG grid-connection technical dossier. Earn your Commercial Solar PV & Storage Engineer badge and proceed to ELH-109.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "A comprehensive bankable feasibility study includes structural roof load validation, wind uplift engineering calculations for cyclone zones, and 25-year financial cash flow modeling."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Continue your industrial energy engineering journey with ELH-109: Industrial Heat Recovery & Combined Heat and Power."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "What is the typical specific yield range (kWh/kWp/year) for well-designed commercial rooftop solar PV installations in Mauritius?",
        options: [
          "1,450 to 1,750 kWh/kWp/year.",
          "250 to 400 kWh/kWp/year.",
          "8,000 to 10,000 kWh/kWp/year.",
          "Zero kWh/kWp/year unless installed directly on the equator."
        ],
        correctOption: 0,
        correctExplanation: "Mauritius receives high solar irradiance, yielding 1,450 to 1,750 kWh per installed kWp annually for unshaded, optimally tilted (15–20° north-facing) crystalline PV arrays.",
        incorrectExplanation: "Tropical island solar yields typically range between 1,450 and 1,750 kWh/kWp/year.",
        optionFeedback: [
          "Correct. 1,450–1,750 kWh/kWp/yr is the empirical benchmark for quality commercial systems in Mauritius.",
          "Incorrect. 250–400 is typical of sub-arctic regions with extreme winter cloud cover.",
          "Incorrect. 8,000+ violates thermodynamic limits of solar insolation on Earth.",
          "Incorrect. Subtropical latitudes (20°S) experience excellent solar resource availability."
        ],
        practicalTakeaway: "Use 1,500–1,700 kWh/kWp/yr as the baseline yield benchmark for commercial PV financial modeling in Mauritius.",
        learningOutcome: "Calculate specific annual solar energy yield for commercial rooftop PV systems.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 2,
        question: "Why do solar PV modules produce less electrical power when operating at high ambient and cell temperatures?",
        options: [
          "Elevated semiconductor cell temperature increases electron recombination rates and reduces the bandgap voltage (negative temperature coefficient of Pmax).",
          "Solar panels convert into water vapor when heated above 30°C.",
          "High temperatures cause electrical cables to reverse their positive and negative polarities.",
          "Inverters automatically turn off all cooling fans on hot days to save battery energy."
        ],
        correctOption: 0,
        correctExplanation: "Silicon PV cells have a negative temperature coefficient (typically -0.30% to -0.38%/°C). As cell temperatures reach 55–65°C on hot rooftops, voltage drops, reducing overall power output.",
        incorrectExplanation: "Semiconductor physics dictates that higher cell temperature lowers open-circuit voltage and output power.",
        optionFeedback: [
          "Correct. Voltage drops with increasing temperature, causing a 0.35%/°C loss in peak module output.",
          "Incorrect. Photovoltaic modules are solid-state glass and silicon laminates that do not evaporate.",
          "Incorrect. Electrical polarity is determined by circuit wiring and semiconductor doping, not temperature.",
          "Incorrect. Inverters increase fan cooling on hot days to prevent thermal shutdown."
        ],
        practicalTakeaway: "Account for module temperature derating (-0.35%/°C above 25°C STC) in rooftop energy yield modeling.",
        learningOutcome: "Analyze thermal derating effects on photovoltaic system generation.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 3,
        question: "What is the primary operational objective of a behind-the-meter Battery Energy Storage System (BESS) configured for peak shaving?",
        options: [
          "Discharging stored energy during high facility load spikes to suppress maximum 15-minute kVA demand charges billed by the electric utility.",
          "Selling emergency diesel fuel to neighboring industrial facilities.",
          "Replacing all building circuit breakers with chemical thermal fuses.",
          "Powering external floodlights during mid-day sunlight hours."
        ],
        correctOption: 0,
        correctExplanation: "Peak shaving BESS discharges power during brief maximum demand periods, flattening the facility's grid load profile and eliminating costly monthly maximum demand (kVA) tariff penalties.",
        incorrectExplanation: "Peak shaving suppresses peak demand charges by injecting stored battery power during high-consumption intervals.",
        optionFeedback: [
          "Correct. Peak shaving targets high-cost utility demand charges by discharging during peak facility load spikes.",
          "Incorrect. BESS stores electrochemical electrical energy, not fossil fuels.",
          "Incorrect. Batteries work with certified circuit protection and do not replace safety switchgear.",
          "Incorrect. Discharging batteries to power lights in broad daylight is unnecessary and wasteful."
        ],
        practicalTakeaway: "Configure EMS peak-shaving thresholds to cap facility maximum kVA demand.",
        learningOutcome: "Design behind-the-meter battery storage dispatch strategies for commercial peak demand reduction.",
        competencyArea: "COMP_FINANCE"
      },
      {
        orderIndex: 4,
        question: "Why is Lithium Iron Phosphate (LiFePO4 / LFP) preferred over Nickel Manganese Cobalt (NMC) for stationary commercial energy storage installations?",
        options: [
          "LFP offers superior thermal runway resistance, longer cycle life (6,000+ cycles), lower degradation rates, and contains no cobalt or nickel.",
          "LFP batteries can be charged with ordinary household tap water.",
          "LFP batteries are completely weightless and require no structural mounting.",
          "LFP chemistry produces zero electromagnetic waves of any frequency."
        ],
        correctOption: 0,
        correctExplanation: "LFP chemistry possesses an exceptionally stable olivine crystal structure that resists thermal runaway up to high temperatures, making it significantly safer and more durable for commercial buildings.",
        incorrectExplanation: "LFP provides higher thermal safety, extended cycle longevity, and ethical cobalt-free supply chains.",
        optionFeedback: [
          "Correct. LFP delivers exceptional fire safety and 6,000+ cycle durability for stationary commercial applications.",
          "Incorrect. LiFePO4 cells are sealed electrochemical units; adding water causes catastrophic failure.",
          "Incorrect. LFP battery racks are heavy (requiring verified structural floor loading calculations).",
          "Incorrect. All electrical circuits produce standard electromagnetic fields conforming to EMC regulations."
        ],
        practicalTakeaway: "Specify LiFePO4 (LFP) chemistry for stationary commercial and industrial BESS installations.",
        learningOutcome: "Select and specify battery chemistries for commercial energy storage systems.",
        competencyArea: "COMP_SUSTAINABLE_DESIGN"
      },
      {
        orderIndex: 5,
        question: "What is the function of an Anti-Islanding Protection relay in a grid-tied commercial solar PV inverter?",
        options: [
          "Automatically disconnecting the solar inverter within milliseconds if the utility grid loses power, preventing energized lines from electrocuting utility line workers.",
          "Preventing solar panels from blowing away during island tropical cyclones.",
          "Stopping birds from nesting underneath rooftop solar mounting rails.",
          "Increasing inverter output voltage to 10,000 volts during rainy weather."
        ],
        correctOption: 0,
        correctExplanation: "Anti-islanding is a mandatory life-safety feature (IEC 62116 / IEEE 1547). If the public grid goes down, the inverter must immediately cease energizing external utility lines.",
        incorrectExplanation: "Anti-islanding prevents back-feeding power into de-energized utility grid lines during maintenance or blackouts.",
        optionFeedback: [
          "Correct. Anti-islanding prevents dangerous unintentional back-feeding into de-energized public utility lines.",
          "Incorrect. Wind uplift protection is achieved through structural mechanical engineering, not anti-islanding relays.",
          "Incorrect. Bird deterrents use physical mesh barriers, not electrical inverter relays.",
          "Incorrect. Inverters maintain regulated voltage; stepping up to 10 kV in low-voltage systems causes severe arcing."
        ],
        practicalTakeaway: "Ensure all grid-tied inverters comply with IEC 62116 anti-islanding disconnection standards.",
        learningOutcome: "Verify grid-interconnection safety and anti-islanding compliance for distributed generation.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 6,
        question: "When designing commercial rooftop solar in cyclone-prone regions, what structural engineering factor must be rigorously verified?",
        options: [
          "Aerodynamic wind uplift forces and mechanical clamp torque ratings against maximum gust speeds (e.g., 250–280 km/h wind zones).",
          "Painting all solar frames with bright neon colors to reflect moonlight.",
          "Mounting solar panels on vertical rubber springs to allow them to bounce freely in the wind.",
          "Removing all grounding conductors to avoid attracting tropical lightning."
        ],
        correctOption: 0,
        correctExplanation: "Cyclonic winds create extreme suction (uplift) forces on roof corners and edges. Racking, ballast, roof anchors, and module clamps must be engineered for localized peak cyclone gust velocities.",
        incorrectExplanation: "Structural roof mounting in cyclone zones requires certified aerodynamic wind uplift engineering.",
        optionFeedback: [
          "Correct. Racking systems and fasteners must be certified to withstand peak cyclonic wind uplift forces.",
          "Incorrect. Frame color has no effect on structural mechanical resilience.",
          "Incorrect. Flexible bouncing mounts cause module glass micro-cracking and catastrophic detachment.",
          "Incorrect. Proper equipotential grounding and surge protection are critical to prevent lightning damage."
        ],
        practicalTakeaway: "Perform structural wind load engineering calculations for all commercial rooftop PV arrays in cyclone zones.",
        learningOutcome: "Evaluate mechanical and structural mounting requirements for solar PV in high-wind regions.",
        competencyArea: "COMP_SUSTAINABLE_DESIGN"
      },
      {
        orderIndex: 7,
        question: "What does the Levelized Cost of Energy (LCOE) represent in commercial solar PV project evaluation?",
        options: [
          "The total lifetime net present cost of installing, operating, and maintaining the solar system divided by total expected lifetime electricity generated ($/kWh).",
          "The daily rental cost of the crane used during panel installation.",
          "The retail purchase price of an electric vehicle charging station.",
          "The maximum tax penalty charged by the government on unused rooftop area."
        ],
        correctOption: 0,
        correctExplanation: "LCOE represents the true unit cost of generated clean electricity over the 25-year system lifecycle, allowing direct financial comparison against utility retail electricity tariffs.",
        incorrectExplanation: "LCOE measures the lifetime levelized cost per kilowatt-hour of generated electricity ($/kWh).",
        optionFeedback: [
          "Correct. LCOE ($/kWh) allows apples-to-apples economic comparison between solar generation and grid tariffs.",
          "Incorrect. Crane rental is a minor one-time installation CapEx item.",
          "Incorrect. EV charging price is an end-use consumer charge, not solar LCOE.",
          "Incorrect. LCOE is an investment performance metric, not a government tax penalty."
        ],
        practicalTakeaway: "Calculate LCOE to demonstrate long-term electricity cost savings against retail grid tariffs.",
        learningOutcome: "Perform financial modeling and LCOE calculations for commercial solar investments.",
        competencyArea: "COMP_FINANCE"
      },
      {
        orderIndex: 8,
        question: "What is the key milestone deliverable for a 30-day commercial rooftop solar project development sprint?",
        options: [
          "A comprehensive bankable project dossier containing PVSyst production modeling, structural roof sign-off, single-line electrical diagrams, and CEB grid-connection application.",
          "A verbal promise from the contractor that the panels will work without maintenance for 50 years.",
          "An invoice purchasing uncertified secondhand panels from an online auction.",
          "A photo of the roof taken from street level without any engineering calculations."
        ],
        correctOption: 0,
        correctExplanation: "A bankable solar proposal requires empirical yield simulations (PVSyst), certified structural load calculations, detailed electrical single-line diagrams, and formal utility grid connection dossiers.",
        incorrectExplanation: "Bankable projects require certified simulation data, structural verification, and utility permit dossiers.",
        optionFeedback: [
          "Correct. Empirical simulations, structural engineering, and formal utility permits make a project bankable.",
          "Incorrect. Verbal promises carry zero legal or technical validity for commercial asset investments.",
          "Incorrect. Uncertified secondhand modules void insurance, fail grid codes, and create fire hazards.",
          "Incorrect. Street photos cannot verify electrical capacity, structural integrity, or solar insolation."
        ],
        practicalTakeaway: "Deliver an integrated engineering dossier with PVSyst simulations and utility compliance documentation.",
        learningOutcome: "Compile a complete bankable commercial solar PV project feasibility and permitting dossier.",
        competencyArea: "COMP_COMPLIANCE"
      }
    ]
  },

  // 5. ELH-109
  {
    courseCode: "ELH-109",
    title: "Industrial Heat Recovery & Combined Heat and Power",
    slug: "industrial-heat-recovery-combined-heat-power",
    description: "Master thermodynamic pinch analysis, waste heat boiler integration, economizers, organic Rankine cycles (ORC), and Combined Heat and Power (CHP/cogen) systems in heavy industrial and manufacturing facilities.",
    fullDescription: "This advanced thermal engineering course equips industrial plant engineers, energy managers, and manufacturing facility directors with practical tools to capture and monetize high, medium, and low-grade industrial waste heat. It covers boiler flue-gas economizers, steam system pinch analysis, thermal integration of kilns and furnaces, Organic Rankine Cycle (ORC) power generation, and high-efficiency Combined Heat and Power (CHP) cogeneration.",
    categoryId: 7,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_ENERGY_EFFICIENCY",
    secondaryCompetencies: ["COMP_DECARBONIZATION", "COMP_OPERATIONS"],
    learningObjectives: [
      "Conduct thermal pinch analysis to identify maximum heat recovery potential across industrial process streams.",
      "Specify and integrate boiler flue-gas condensing economizers, recuperators, and waste heat recovery boilers (WHRB).",
      "Evaluate Organic Rankine Cycle (ORC) systems for converting low-grade industrial waste heat (80–180°C) into clean electricity.",
      "Size and model industrial Combined Heat and Power (CHP / Cogeneration) systems to achieve overall thermal efficiencies >80%.",
      "Develop a 30-day industrial waste heat capture audit, mass/energy balance, and CapEx business case."
    ],
    intendedRoles: [
      "Industrial Thermal Engineers",
      "Plant & Process Operations Managers",
      "Manufacturing Energy Managers",
      "Boiler & Utility Systems Specialists"
    ],
    badgeName: "Industrial Thermal Energy & CHP Specialist",
    badgeDescription: "Demonstrates applied mastery in thermodynamic pinch analysis, industrial waste heat recovery, and high-efficiency cogeneration engineering.",
    completionMessage: "Congratulations! You have completed Industrial Heat Recovery & Combined Heat and Power. You are equipped to eliminate industrial thermal waste and maximize plant thermodynamic efficiency.",
    recommendedNextCourseCode: "ELH-126",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: The Steaming Exhaust Stack in Saint Pierre",
        durationMinutes: 4,
        content: "An agro-processing plant in Saint Pierre discharges 280°C flue gas from its heavy fuel oil boiler directly into the atmosphere, while burning thousands of liters of fuel monthly to generate low-pressure process steam for juice pasteurization. A thermal imaging survey reveals that over 22% of total purchased fuel energy escapes through the exhaust stack as unrecovered thermal waste. Industrial engineers must deploy waste heat recovery economizers and heat exchangers to slash boiler fuel consumption and reduce operational carbon emissions.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "In thermal manufacturing processes, fuel burned in boilers and furnaces frequently loses 15–35% of its gross calorific value through exhaust stacks and uninsulated piping."
          },
          {
            type: "callout",
            style: "warning",
            title: "Thermal Energy Destruction",
            content: "Venting high-temperature exhaust gas while simultaneously purchasing grid power or burning additional boiler fuel is an expensive operational inefficiency that degrades plant profit margins."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: Pinch Analysis & Waste Heat Quality Grading",
        durationMinutes: 4,
        content: "Classify industrial waste heat into three thermal grades: High-Grade (>400°C from furnaces/kilns), Medium-Grade (150–400°C from boiler flues/diesel exhausts), and Low-Grade (<150°C from cooling jackets/condensate). Apply thermodynamic Pinch Analysis: plot composite hot and cold curves, identify the minimum temperature difference (ΔTmin), and ensure no heat is transferred across the pinch point to achieve theoretical maximum thermal integration.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Pinch analysis systematically pairs process streams that need cooling with process streams that need heating, minimizing external fuel and cooling utility requirements."
          },
          {
            type: "table",
            title: "Industrial Waste Heat Temperature Hierarchy & Technologies",
            headers: ["Waste Heat Grade", "Temperature Range", "Typical Source", "Optimal Recovery Technology"],
            rows: [
              ["High-Grade", ">400°C", "Glass/metal furnaces, cement kilns", "Waste Heat Recovery Boiler (WHRB) for high-pressure steam"],
              ["Medium-Grade", "150–400°C", "Boiler flue gas, gas turbine exhaust", "Feedwater condensing economizers, thermal oil recuperators"],
              ["Low-Grade", "70–150°C", "Engine cooling jackets, air compressor coolers", "Organic Rankine Cycle (ORC) power, preheating wash water"],
              ["Ultra-Low Grade", "<70°C", "Chiller condenser water, effluent", "Industrial high-temperature heat pumps (up to 95°C)"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: Economizers, Organic Rankine Cycles (ORC) & CHP",
        durationMinutes: 4,
        content: "Implement condensing economizers on industrial boiler stacks to recover both sensible and latent heat of moisture, boosting boiler thermal efficiency by 5–8%. For low-to-medium heat sources, deploy Organic Rankine Cycle (ORC) turbo-generators using organic refrigerants with low boiling points (e.g., cyclopentane, R1233zd) to generate clean electricity. In continuous thermal plants, size Combined Heat and Power (CHP) gas turbines or reciprocating engines to generate electricity on-site while capturing jacket and exhaust heat for process steam.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Cogeneration (CHP) achieves overall thermodynamic efficiencies exceeding 80–85%, compared to only 35–45% for conventional centralized fossil fuel grid power stations."
          },
          {
            type: "callout",
            style: "tip",
            title: "Acid Dew Point Protection",
            content: "When recovering heat from sulfur-bearing fuels, ensure flue-gas metal temperatures stay above the sulfuric acid dew point (~130°C) or utilize corrosion-resistant fluoropolymer/stainless condensing heat exchangers."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Food Processing Plant Boiler Upgrade Dilemma",
        durationMinutes: 4,
        content: "A major canning facility in Port Louis needs to replace its aging 10-ton/hour saturated steam boiler. The plant uses 8 MWh of electricity and 14 MWth of process steam continuously 24/7. Management is considering either purchasing a standard replacement boiler or investing in a Combined Heat and Power (CHP) gas engine with exhaust heat boiler. How should the energy director structure the decision?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A 24/7 food processing plant needs to replace its industrial steam boiler.",
            options: [
              {
                id: "A",
                text: "Select the CHP cogeneration system: it generates 3.5 MWe of baseline clean on-site electricity while the exhaust heat boiler supplies 80% of process steam needs, cutting total plant operating utility costs by 38% with a 3.2-year payback.",
                outcome: "Optimal. Maximizes primary energy efficiency, slashes electricity grid costs, and drastically reduces Scope 1 and Scope 2 carbon footprints."
              },
              {
                id: "B",
                text: "Buy the cheapest low-efficiency standard boiler with no economizer and continue purchasing 100% of electricity from the grid at peak tariffs.",
                outcome: "Severe Long-Term Cost. Locks the plant into millions of dollars in unnecessary fuel and electricity expenses over the 20-year asset life."
              },
              {
                id: "C",
                text: "Install an uninsulated exhaust pipe directly into the factory floor to heat the packing room.",
                outcome: "Fatal Hazard. Discharges toxic carbon monoxide and combustion particulates into occupied worker spaces, causing immediate asphyxiation."
              },
              {
                id: "D",
                text: "Shut down the canning steam process entirely and switch to cold manual washing.",
                outcome: "Commercial Failure. Violates food safety pasteurization standards and causes mass microbial contamination."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Industrial Thermal Audit & Business Case",
        durationMinutes: 4,
        content: "Formulate a 30-day industrial heat recovery roadmap. Measure exhaust stack temperatures and mass flow rates, construct plant Sankey energy flow diagrams, perform pinch calculations to identify cross-stream heat exchange pairings, and draft a bankable CapEx proposal for an economizer or ORC unit. Earn the Industrial Thermal Energy & CHP Specialist badge and proceed to ELH-126.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Thermal energy audits provide the empirical engineering foundation required to secure industrial green financing and ESG sustainability incentives."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Continue mastering facility energy optimization with ELH-126: Facilities Energy Management for Specialists."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "In industrial thermodynamics, what is the fundamental rule of Pinch Analysis regarding heat transfer across the pinch temperature?",
        options: [
          "Do not transfer heat across the pinch point; doing so increases both external hot utility and cold utility requirements simultaneously.",
          "Always transfer 100% of high-temperature heat directly into ambient drainage water.",
          "Heat should only flow from cold streams into hotter streams without external work.",
          "Pinch analysis only applies to residential electric kitchen kettles."
        ],
        correctOption: 0,
        correctExplanation: "The Golden Rule of Pinch Technology states: Never transfer heat across the pinch. Crossing the pinch forces the plant to burn extra fuel above the pinch and use extra cooling water below the pinch.",
        incorrectExplanation: "Transferring heat across the pinch creates dual thermodynamic penalties in both heating and cooling utilities.",
        optionFeedback: [
          "Correct. Avoiding heat transfer across the pinch guarantees minimum external heating and cooling consumption.",
          "Incorrect. Dumping heat into drainage wastes valuable energy and causes thermal water pollution.",
          "Incorrect. Spontaneous heat flow from cold to hot violates the Second Law of Thermodynamics.",
          "Incorrect. Pinch analysis is a powerful thermodynamic methodology for complex industrial process plants."
        ],
        practicalTakeaway: "Apply pinch analysis to design heat exchanger networks that never transfer heat across the pinch point.",
        learningOutcome: "Apply thermodynamic pinch analysis principles to industrial process heat integration.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 2,
        question: "How does a boiler flue-gas economizer improve steam boiler thermal efficiency?",
        options: [
          "It captures waste heat from the hot flue gas leaving the boiler to preheat incoming boiler feedwater, reducing fuel needed to generate steam.",
          "It injects cold air directly into the combustion burner to extinguish the flame.",
          "It increases the chemical sulfur content of the fuel oil.",
          "It vents saturated steam into the ambient air to lower boiler pressure."
        ],
        correctOption: 0,
        correctExplanation: "Every 20°C drop in flue gas temperature achieved by preheating boiler feedwater in an economizer increases overall boiler efficiency by approximately 1%.",
        incorrectExplanation: "Economizers preheat boiler feedwater using exhaust gas heat, directly saving boiler fuel.",
        optionFeedback: [
          "Correct. Feedwater preheating in economizers captures flue heat and directly reduces fuel consumption.",
          "Incorrect. Extinguishing burner flames halts steam production entirely.",
          "Incorrect. Economizers do not modify the chemical composition of fuel.",
          "Incorrect. Venting steam wastes energy, treated water, and boiler chemicals."
        ],
        practicalTakeaway: "Install boiler economizers to recover 5–8% of fuel energy through feedwater preheating.",
        learningOutcome: "Calculate energy savings and sizing parameters for boiler flue-gas economizers.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 3,
        question: "What makes Organic Rankine Cycle (ORC) technology particularly suitable for industrial waste heat recovery compared to traditional steam Rankine cycles?",
        options: [
          "ORC uses high-molecular-weight organic fluids with lower boiling points, allowing efficient power generation from low-to-medium temperature heat (80–200°C) without superheating.",
          "ORC engines run on concentrated crude petroleum rather than heat.",
          "ORC systems produce zero noise and can be made entirely out of cardboard.",
          "ORC systems require negative thermodynamic entropy to operate."
        ],
        correctOption: 0,
        correctExplanation: "Traditional steam cycles require high temperatures (>350°C) to prevent turbine blade moisture erosion. ORC fluids vaporize at low temperatures and expand dry through turbines, ideal for low-grade heat.",
        incorrectExplanation: "ORC leverages low-boiling organic fluids to generate electricity from low-to-medium grade industrial waste heat.",
        optionFeedback: [
          "Correct. Low boiling points and dry expansion make ORC ideal for recovering low-grade industrial heat (80–200°C).",
          "Incorrect. ORC is a thermodynamic heat engine, not an internal combustion engine burning crude oil.",
          "Incorrect. ORC systems are precision metal turbomachinery operating under pressure.",
          "Incorrect. All real thermal processes obey positive entropy generation according to the Second Law."
        ],
        practicalTakeaway: "Specify Organic Rankine Cycle systems to generate electricity from low-grade waste heat streams (80–200°C).",
        learningOutcome: "Evaluate Organic Rankine Cycle (ORC) power generation from industrial thermal waste.",
        competencyArea: "COMP_DECARBONIZATION"
      },
      {
        orderIndex: 4,
        question: "Why do Combined Heat and Power (CHP / Cogeneration) systems achieve overall energy efficiencies exceeding 80%, compared to ~40% for conventional power plants?",
        options: [
          "CHP captures the thermal byproduct heat from electricity generation and uses it immediately for on-site industrial heating and steam processes.",
          "CHP turbines generate electricity without using any fuel or energy input.",
          "CHP systems cool exhaust gases down to absolute zero (-273.15°C).",
          "CHP plants operate in complete vacuum without any air resistance."
        ],
        correctOption: 0,
        correctExplanation: "Conventional power stations vent ~60% of fuel energy into cooling towers and air. CHP captures this rejected heat on-site to produce process steam or hot water, utilizing >80% of total fuel energy.",
        incorrectExplanation: "CHP captures and uses both electrical and thermal output from the same fuel source on-site.",
        optionFeedback: [
          "Correct. Sequential generation of electricity and useful thermal energy yields overall efficiencies >80%.",
          "Incorrect. CHP uses fuel (natural gas, biogas, biomass) but extracts far more useful work per unit.",
          "Incorrect. Exhaust is cooled to safe flue temperatures, not absolute zero.",
          "Incorrect. CHP combustors require atmospheric oxygen for fuel combustion."
        ],
        practicalTakeaway: "Deploy CHP cogeneration in facilities with continuous, simultaneous electric and thermal demands.",
        learningOutcome: "Evaluate the thermodynamic efficiency and operational economics of industrial CHP systems.",
        competencyArea: "COMP_OPERATIONS"
      },
      {
        orderIndex: 5,
        question: "What is the critical risk of cooling boiler exhaust gases below the sulfuric acid dew point in oil-fired industrial boilers?",
        options: [
          "Sulfur trioxide (SO3) condenses with flue moisture to form liquid sulfuric acid (H2SO4), causing rapid severe corrosion of metal heat exchanger tubes and ductwork.",
          "The boiler water instantaneously turns into solid ice crystals.",
          "The flue gas transforms into pure breathable oxygen.",
          "The boiler chimney increases in height by several meters."
        ],
        correctOption: 0,
        correctExplanation: "If flue gas temperature drops below the acid dew point (~120–140°C depending on fuel sulfur content), highly corrosive sulfuric acid condenses, eating through mild steel tubes within weeks.",
        incorrectExplanation: "Acid condensation causes catastrophic metal corrosion unless acid-resistant condensing materials are used.",
        optionFeedback: [
          "Correct. Acid condensation causes severe tube corrosion; maintain temperatures above dew point or use specialized alloys.",
          "Incorrect. Flue gas is hot (100–250°C) and will not freeze.",
          "Incorrect. Combustion products consist of CO2, N2, H2O, and NOx, not pure oxygen.",
          "Incorrect. Temperature changes do not cause physical chimney elongation of multiple meters."
        ],
        practicalTakeaway: "Verify fuel sulfur content and maintain exhaust metal temperatures safely above the acid dew point.",
        learningOutcome: "Manage acid dew point corrosion risks in industrial waste heat recovery systems.",
        competencyArea: "COMP_OPERATIONS"
      },
      {
        orderIndex: 6,
        question: "How can industrial facilities recover ultra-low grade waste heat (40–60°C) from chiller condenser loops or industrial wastewater?",
        options: [
          "By installing Industrial High-Temperature Heat Pumps (HTHP) that use waste heat as an evaporator source and upgrade it to useful process water at 80–95°C.",
          "By pumping the warm water onto outdoor parking lots to evaporate naturally.",
          "By freezing the wastewater with liquid nitrogen and storing it in warehouses.",
          "By pouring industrial chemicals into the cooling tower to create an exothermic explosion."
        ],
        correctOption: 0,
        correctExplanation: "Industrial High-Temperature Heat Pumps (HTHP) with low-GWP refrigerants absorb low-grade waste heat (40–60°C) and lift it to 80–100°C with Coefficients of Performance (COP) of 3.5 to 5.0.",
        incorrectExplanation: "High-Temperature Heat Pumps efficiently upgrade low-grade thermal waste into useful process heat.",
        optionFeedback: [
          "Correct. HTHPs efficiently upgrade low-grade thermal effluent to 80–95°C for process washing and heating.",
          "Incorrect. Discharging warm water into lots causes environmental flooding and thermal pollution.",
          "Incorrect. Liquid nitrogen cooling is energy-intensive and destroys thermal recovery potential.",
          "Incorrect. Chemical explosions are dangerous industrial safety violations."
        ],
        practicalTakeaway: "Use High-Temperature Heat Pumps to lift low-grade effluent heat into 80–95°C process hot water.",
        learningOutcome: "Specify industrial heat pumps for low-grade thermal waste upgrading.",
        competencyArea: "COMP_ENERGY_EFFICIENCY"
      },
      {
        orderIndex: 7,
        question: "What does an industrial Sankey Energy Diagram illustrate?",
        options: [
          "A visual flow diagram where the width of arrows is proportional to the quantity of energy flow, clearly showing primary fuel inputs, useful energy, and unrecovered losses.",
          "A map showing the location of company vehicles on public roads.",
          "An organizational chart showing the reporting structure of human resources.",
          "A chemical molecular diagram of synthetic plastics."
        ],
        correctOption: 0,
        correctExplanation: "Sankey diagrams depict thermal and electrical energy balances. Arrow widths visually highlight where energy is converted into useful work versus lost as stack heat, radiation, or effluent.",
        incorrectExplanation: "Sankey diagrams visually map energy mass balances and highlight major loss points across a plant.",
        optionFeedback: [
          "Correct. Sankey diagrams visually expose the magnitude and location of thermal energy losses across a facility.",
          "Incorrect. Vehicle tracking uses GPS fleet mapping, not thermodynamic Sankey diagrams.",
          "Incorrect. Corporate hierarchies are depicted via organizational charts.",
          "Incorrect. Molecular structures are drawn using chemical structural formulas."
        ],
        practicalTakeaway: "Construct plant Sankey diagrams to identify and prioritize the largest waste heat recovery opportunities.",
        learningOutcome: "Construct and interpret industrial Sankey diagrams for thermal mass and energy balances.",
        competencyArea: "COMP_OPERATIONS"
      },
      {
        orderIndex: 8,
        question: "What is the primary objective of a 30-day industrial heat recovery feasibility assessment?",
        options: [
          "Quantifying thermal mass/energy flows, conducting pinch analysis, sizing recovery heat exchangers, and establishing a bankable CapEx payback model for executive approval.",
          "Painting all industrial boilers with green latex paint.",
          "Shutting down all factory operations permanently to eliminate all fuel use.",
          "Replacing all steam pipes with uninsulated garden hoses."
        ],
        correctOption: 0,
        correctExplanation: "A rigorous thermal feasibility assessment delivers empirical temperature/flow logs, pinch integration designs, equipment sizing, and lifecycle cash flow payback models for investment sign-off.",
        incorrectExplanation: "Feasibility audits establish empirical thermal data, pinch integration, and bankable financial models.",
        optionFeedback: [
          "Correct. Quantified energy balances and lifecycle financial models secure capital investment for heat recovery.",
          "Incorrect. Cosmetic painting does not reduce thermodynamic fuel consumption.",
          "Incorrect. Energy management improves efficiency while supporting profitable industrial manufacturing.",
          "Incorrect. Uninsulated garden hoses melt under steam temperatures and create severe scalding hazards."
        ],
        practicalTakeaway: "Deliver an empirical thermal audit, pinch integration model, and lifecycle CapEx payback analysis.",
        learningOutcome: "Formulate a bankable 30-day industrial waste heat recovery engineering and investment proposal.",
        competencyArea: "COMP_FINANCE"
      }
    ]
  },

  // 6. ELH-110
  {
    courseCode: "ELH-110",
    title: "Closed-Loop Water Recycling in Commercial Real Estate",
    slug: "closed-loop-water-recycling-commercial-real-estate",
    description: "Master greywater recycling, rainwater harvesting, blackwater membrane bioreactor (MBR) treatment, cooling tower blowdown optimization, and closed-loop circular water systems in commercial real estate.",
    fullDescription: "This advanced course provides building services engineers, sustainability managers, and commercial property asset directors with practical methodologies to design and operate closed-loop commercial water recycling systems. It covers greywater dual-plumbing networks, rainwater storage sizing, submerged Membrane Bioreactors (MBR), reverse osmosis polishing, cooling tower cycles of concentration (CoC), and non-potable water reuse standards.",
    categoryId: 6,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_CIRCULAR_ECONOMY",
    secondaryCompetencies: ["COMP_SUSTAINABLE_DESIGN", "COMP_COMPLIANCE"],
    learningObjectives: [
      "Design dual-plumbing reticulation systems separating potable water from non-potable recycled greywater/rainwater.",
      "Dimension on-site Membrane Bioreactor (MBR) and ultrafiltration systems for commercial wastewater treatment.",
      "Optimize cooling tower water chemistry to increase Cycles of Concentration (CoC) from 3 to 6+, cutting blowdown water waste by 50%.",
      "Model rainwater harvesting storage capacity and non-potable toilet flushing / irrigation demand balances.",
      "Formulate a 30-day commercial property water neutrality and closed-loop recycling management protocol."
    ],
    intendedRoles: [
      "Commercial Building Services Engineers",
      "Property & Estate Sustainability Directors",
      "Facilities & Plumbing Engineering Managers",
      "Water Treatment & Environmental Specialists"
    ],
    badgeName: "Commercial Water Recycling & Circularity Specialist",
    badgeDescription: "Demonstrates applied competence in commercial water recycling engineering, MBR wastewater reuse, and cooling tower water optimization.",
    completionMessage: "Congratulations! You have completed Closed-Loop Water Recycling in Commercial Real Estate. You are prepared to engineer resilient, water-neutral commercial properties.",
    recommendedNextCourseCode: "ELH-107",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: Municipal Water Rationing at the Shopping Mall",
        durationMinutes: 4,
        content: "During a seasonal summer drought in Grand Baie, the municipal water authority limits commercial utility supply by 60%. A 25,000 m² luxury retail mall faces an emergency shutdown because its centralized evaporative cooling towers and public restrooms consume 120,000 liters of potable water daily. Restrooms begin running dry, tenant air conditioning throttles down, and the asset faces severe operational disruption. Facilities engineers must immediately implement on-site closed-loop water treatment, rainwater capture, and greywater recycling to achieve water resilience.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Commercial properties that rely 100% on municipal potable water for non-potable uses (cooling towers, toilet flushing, landscaping) face extreme vulnerability to municipal tariff spikes and drought rationing."
          },
          {
            type: "callout",
            style: "danger",
            title: "Business Continuity Hazard",
            content: "Cooling towers cannot operate without water; losing water supply instantly forces chiller plants offline, making modern sealed glass commercial buildings unoccupiable."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: Commercial Water Balances & Quality Standards",
        durationMinutes: 4,
        content: "Perform a comprehensive commercial water audit: categorize consumption into Potable (drinking, food prep, showers), Non-Potable Recycled (toilet flushing, sub-surface irrigation), and Process (HVAC cooling tower make-up). Apply international non-potable reuse standards (e.g., ISO 16075, USEPA Water Reuse Guidelines): turbidity < 2 NTU, BOD5 < 10 mg/L, E. coli non-detectable per 100 mL, and residual chlorine 0.5–2.0 mg/L.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Dual plumbing codes mandate purple-colored piping, backflow preventers, and complete air-gap physical separation to prevent cross-connection between recycled water and potable drinking supplies."
          },
          {
            type: "table",
            title: "Commercial Water Quality & Non-Potable Reuse Matrix",
            headers: ["Water Stream", "Source", "Treatment Train", "Permitted Reuse Application"],
            rows: [
              ["Rainwater Runoff", "Roof drainage", "Sediment screen + Sand filter + UV disinfection", "Restroom flushing, landscape irrigation"],
              ["Greywater", "Sinks, hand basins, showers", "Screening + MBR + Activated carbon + Chlorine", "Restroom flushing, cooling tower makeup"],
              ["Blackwater", "Toilets, kitchen grease traps", "Grease trap + Anoxic/Aerobic MBR + RO + UV", "Restroom flushing, sub-surface landscaping"],
              ["Cooling Blowdown", "Chiller cooling towers", "Side-stream sand filtration + Scale inhibitor", "Restroom flushing, vehicle washing"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: MBR Treatment & Cooling Tower Optimization",
        durationMinutes: 4,
        content: "Deploy submerged Membrane Bioreactors (MBR) combining biological activated sludge digestion with 0.04-micron hollow-fiber ultrafiltration membranes. Optimize cooling tower chemistry: monitor Total Dissolved Solids (TDS) and conductivity, install automated blowdown controllers, and introduce eco-friendly anti-scalant polymers to increase Cycles of Concentration (CoC) from 3.0 to 6.5. This cuts cooling tower blowdown discharge by over 55% while safely preventing mineral scaling on chiller condenser tubes.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "MBR systems produce crystal-clear, pathogen-free water in a compact physical footprint 70% smaller than conventional clarifier wastewater treatment plants."
          },
          {
            type: "callout",
            style: "tip",
            title: "Cycles of Concentration (CoC) Math",
            content: "Increasing CoC from 3 to 6 reduces make-up water consumption by 20% and slashes wastewater sewer discharge by 50%, saving millions of liters annually."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Commercial Office Water Recycling Retrofit",
        durationMinutes: 4,
        content: "A 10-story office building in Ébène with 1,200 occupants is evaluating an on-site water recycling retrofit. The facility currently buys 45,000 liters/day of municipal potable water, with 60% used for toilet flushing and cooling towers. The plumbing contractor suggests either installing a dedicated basement MBR greywater recycling system or drilling an illegal unpermitted groundwater borehole. How should the sustainability manager decide?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A commercial office building seeks to cut potable water demand by 60%.",
            options: [
              {
                id: "A",
                text: "Install the basement MBR greywater recycling system with purple-pipe reticulation, cutting municipal potable consumption by 55% with a 3.4-year payback and full regulatory compliance.",
                outcome: "Optimal. Achieves verified water circularity, ensures uninterrupted drought resilience, and secures green building certification credits."
              },
              {
                id: "B",
                text: "Drill an illegal borehole to pump untreated groundwater into the building's drinking taps.",
                outcome: "Severe Violation. Violates water resources laws, risks heavy environmental fines, and exposes occupants to contaminated waterborne pathogens."
              },
              {
                id: "C",
                text: "Turn off water supply to all office restrooms and advise tenants to use neighboring public facilities.",
                outcome: "Unacceptable. Destroys tenant satisfaction, breaches lease contracts, and causes immediate commercial tenant departures."
              },
              {
                id: "D",
                text: "Pipe raw, untreated blackwater directly from toilets back into office drinking fountains.",
                outcome: "Catastrophic. Causes acute mass poisoning, severe dysentery outbreaks, and criminal negligence prosecution."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Commercial Water Circularity Protocol",
        durationMinutes: 4,
        content: "Formulate a 30-day commercial water efficiency action plan. Install smart ultrasonic water sub-meters on cooling towers and irrigation circuits, audit plumbing fixtures for low-flow aerators (≤4.5 L/min), verify backflow preventer certifications, and calibrate cooling tower conductivity controllers. Earn the Commercial Water Recycling & Circularity Specialist badge and advance to ELH-107.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Continuous sub-metering and water balance logging allow immediate detection of hidden underground pipe bursts and silent toilet flapper leaks."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Advance your sustainable building design expertise with ELH-107: Net-Zero Energy Building Design & Passive Architecture."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "What is the primary function of a dual-plumbing (purple pipe) reticulation network in commercial buildings?",
        options: [
          "To physically separate treated non-potable recycled water (used for toilet flushing and cooling) from potable drinking water supplies, preventing cross-contamination.",
          "To transport high-pressure steam directly to employee desks for tea making.",
          "To drain rainwater directly into electrical elevator shafts.",
          "To color-code pipes purely for aesthetic architectural decoration."
        ],
        correctOption: 0,
        correctExplanation: "Dual plumbing systems use distinctive purple piping and air gaps to deliver non-potable recycled water safely to toilets and cooling towers without any risk of backflow into drinking water.",
        incorrectExplanation: "Purple pipe systems deliver non-potable recycled water safely separated from potable drinking water.",
        optionFeedback: [
          "Correct. Dual plumbing provides strict physical separation to eliminate backflow and cross-contamination risks.",
          "Incorrect. Steam distribution requires specialized high-pressure insulated steel piping, not plumbing networks.",
          "Incorrect. Water must never be routed into elevator shafts.",
          "Incorrect. Purple coloration is a mandatory safety coding standard (UPC/IPC) indicating non-potable water."
        ],
        practicalTakeaway: "Specify purple pipe reticulation with certified backflow preventers for all non-potable reuse networks.",
        learningOutcome: "Design commercial dual-plumbing reticulation systems for non-potable recycled water.",
        competencyArea: "COMP_SUSTAINABLE_DESIGN"
      },
      {
        orderIndex: 2,
        question: "How does increasing Cooling Tower Cycles of Concentration (CoC) from 3.0 to 6.0 reduce commercial water consumption?",
        options: [
          "It allows the recirculating water to carry higher dissolved solids before bleed-off, cutting cooling tower blowdown wastewater discharge by over 50%.",
          "It cools the water down to sub-zero temperatures using chemical antifreeze.",
          "It eliminates the need for electric fan motors on the cooling tower.",
          "It converts cooling tower steam plumes into solid gold bars."
        ],
        correctOption: 0,
        correctExplanation: "Blowdown volume equals Evaporation ÷ (CoC - 1). Increasing CoC from 3 to 6 cuts required blowdown volume from 50% of evaporation down to 20%, saving vast quantities of make-up water.",
        incorrectExplanation: "Higher CoC keeps water circulating longer before discharging blowdown, significantly reducing water waste.",
        optionFeedback: [
          "Correct. Increasing CoC from 3 to 6 slashes blowdown volume by over 50%, saving millions of liters annually.",
          "Incorrect. Cooling towers operate on evaporative heat rejection, not chemical antifreeze chilling.",
          "Incorrect. Cooling tower fans provide induced airflow and are unrelated to CoC water chemistry.",
          "Incorrect. Thermodynamic water evaporation cannot perform elemental chemical transmutation."
        ],
        practicalTakeaway: "Optimize automated conductivity blowdown controls to maintain cooling tower CoC between 5.0 and 7.0.",
        learningOutcome: "Calculate cooling tower mass balances and water savings from Cycles of Concentration optimization.",
        competencyArea: "COMP_CIRCULAR_ECONOMY"
      },
      {
        orderIndex: 3,
        question: "What physical mechanism allows Membrane Bioreactor (MBR) technology to produce high-clarity non-potable water?",
        options: [
          "Combining biological digestion of organic contaminants with 0.04-micron micro/ultrafiltration membrane barriers that physically block suspended solids, bacteria, and protozoa.",
          "Heating wastewater to 5,000°C in an atomic plasma torch.",
          "Adding heavy doses of mercury and lead to sterilize microbes.",
          "Filtering wastewater through recycled plastic shopping bags."
        ],
        correctOption: 0,
        correctExplanation: "MBRs combine activated sludge microbiology with hollow-fiber ultrafiltration membranes (pore sizes 0.04 µm), filtering out particulate matter, turbidity, and 99.99% of bacteria.",
        incorrectExplanation: "MBRs integrate biological degradation with microscopic membrane filtration barriers.",
        optionFeedback: [
          "Correct. Ultrafiltration membrane barriers physically block pathogens and suspended solids, yielding crystal-clear effluent.",
          "Incorrect. MBRs operate at ambient biological temperatures without plasma torches.",
          "Incorrect. Heavy metals are toxic environmental poisons that are strictly prohibited.",
          "Incorrect. MBRs use engineered PVDF or ceramic hollow-fiber membranes, not plastic shopping bags."
        ],
        practicalTakeaway: "Deploy MBR systems for compact, pathogen-free on-site commercial wastewater treatment.",
        learningOutcome: "Evaluate Membrane Bioreactor (MBR) treatment trains for commercial wastewater recycling.",
        competencyArea: "COMP_SUSTAINABLE_DESIGN"
      },
      {
        orderIndex: 4,
        question: "Under international water reuse guidelines, what is the maximum permissible turbidity and E. coli count for unrestricted non-potable commercial reuse (e.g., toilet flushing)?",
        options: [
          "Turbidity < 2 NTU and 0 detectable E. coli per 100 mL sample.",
          "Turbidity < 500 NTU and 1,000,000 E. coli per 100 mL.",
          "Water can contain visible sewage sludge as long as it smells pleasant.",
          "Zero regulations exist for commercial toilet water."
        ],
        correctOption: 0,
        correctExplanation: "Unrestricted urban reuse standards (USEPA/ISO 16075) mandate turbidity < 2 NTU (to ensure effective UV disinfection) and zero detectable E. coli to protect human health from aerosol exposure.",
        incorrectExplanation: "Non-potable water for indoor flushing requires strict microbiological safety (0 E. coli) and clarity (<2 NTU).",
        optionFeedback: [
          "Correct. Strict biological limits (0 E. coli, <2 NTU) protect building occupants from microbial aerosols.",
          "Incorrect. High turbidity and pathogens cause severe health hazards and immediate system closure.",
          "Incorrect. Visible sludge indicates severe treatment failure and creates biological contamination.",
          "Incorrect. Non-potable water reuse is strictly regulated by public health and building safety codes."
        ],
        practicalTakeaway: "Monitor turbidity and maintain residual disinfectant to guarantee microbiological safety.",
        learningOutcome: "Verify treated recycled water quality against international non-potable reuse standards.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 5,
        question: "Why is first-flush diversion essential in commercial rainwater harvesting systems?",
        options: [
          "It automatically diverts the initial dirty roof runoff containing bird droppings, dust, and debris away from the clean storage cistern.",
          "It flushes municipal drinking water backward through the storm gutters.",
          "It adds heavy minerals to the water to make it heavier for storage.",
          "It heats the rainwater to boiling temperature on the roof."
        ],
        correctOption: 0,
        correctExplanation: "The initial 1–2 mm of rainfall washes particulate matter, atmospheric soot, and bird droppings off the roof. Diverting this first flush preserves the water quality in the main storage cistern.",
        incorrectExplanation: "First-flush diverters discard the heavily contaminated initial rainfall to protect storage tank water quality.",
        optionFeedback: [
          "Correct. First-flush diversion removes roof debris, dramatically extending filter life and water clarity.",
          "Incorrect. First flush manages natural stormwater and does not consume municipal potable water.",
          "Incorrect. Rainwater harvesting aims for clean, low-mineral water, not adding heavy sediment.",
          "Incorrect. First-flush diverters are passive hydraulic chambers, not thermal boiling units."
        ],
        practicalTakeaway: "Install first-flush diversion chambers sized for 1–2 mm of roof catchment area.",
        learningOutcome: "Design rainwater harvesting pre-treatment and storage sizing systems.",
        competencyArea: "COMP_SUSTAINABLE_DESIGN"
      },
      {
        orderIndex: 6,
        question: "What is the function of a reduced-pressure zone (RPZ) backflow preventer installed at the commercial water service boundary?",
        options: [
          "It provides fail-safe mechanical backflow prevention to ensure non-potable on-site recycled water can never siphon backward into the public municipal water mains.",
          "It reduces water bills by 99% by falsifying utility meter readings.",
          "It converts saltwater into freshwater without using any electricity.",
          "It increases municipal water pressure to 50 bar for firefighting."
        ],
        correctOption: 0,
        correctExplanation: "RPZ valves contain two independent check valves separated by a differential relief valve, creating a physical air break that guarantees zero cross-contamination into the municipal supply.",
        incorrectExplanation: "RPZ devices protect the public drinking grid from on-site non-potable backflow and back-siphonage.",
        optionFeedback: [
          "Correct. RPZ backflow preventers provide vital hydraulic protection to public municipal drinking supplies.",
          "Incorrect. RPZ valves are mechanical safety devices, not utility meter tampering mechanisms.",
          "Incorrect. Desalination requires high-pressure reverse osmosis membranes, not backflow valves.",
          "Incorrect. Firefighting pressure is delivered by dedicated fire booster pump sets."
        ],
        practicalTakeaway: "Install and annually certify RPZ backflow preventers on all commercial water connections.",
        learningOutcome: "Specify backflow prevention devices to safeguard municipal and potable water networks.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 7,
        question: "How do low-flow sanitary fixtures (e.g., 4.5 L/min aerators, dual-flush 3/4.5 L toilets) support commercial water circularity?",
        options: [
          "By reducing baseline water demand at the point of use, decreasing required MBR plant sizing and extending rainwater storage autonomy.",
          "By completely eliminating the need for any sewer pipes in the building.",
          "By forcing occupants to bring their own water from home.",
          "By converting liquid wastewater directly into hydrogen fuel in the sink."
        ],
        correctOption: 0,
        correctExplanation: "Water efficiency starts with source reduction. Low-flow fixtures cut baseline water volume by 35–50%, making on-site circular recycling systems smaller, cheaper, and more effective.",
        incorrectExplanation: "Source reduction minimizes required treatment capacity and maximizes water self-sufficiency.",
        optionFeedback: [
          "Correct. Demand-side efficiency reduces capital costs for on-site recycling infrastructure.",
          "Incorrect. Drainage piping is still required to convey sanitary waste to treatment systems.",
          "Incorrect. Low-flow fixtures provide comfortable, high-performance hand washing and sanitation.",
          "Incorrect. Aerators mix air with water to reduce volume, not generate hydrogen fuel."
        ],
        practicalTakeaway: "Retrofit low-flow fixtures to reduce baseline water consumption before sizing recycling plants.",
        learningOutcome: "Implement demand-side water conservation technologies across commercial properties.",
        competencyArea: "COMP_CIRCULAR_ECONOMY"
      },
      {
        orderIndex: 8,
        question: "What is the primary deliverable of a 30-day commercial water recycling and efficiency protocol?",
        options: [
          "A comprehensive facility water balance, smart sub-metering audit, cooling tower CoC optimization report, and an MBR recycling engineering design.",
          "A signed memo canceling all plumbing maintenance for the next decade.",
          "An order purchasing 50,000 single-use plastic bottled water packs for office toilets.",
          "A proposal to drain all commercial wastewater into the local stormwater canal."
        ],
        correctOption: 0,
        correctExplanation: "A 30-day water circularity sprint delivers empirical facility water mass balances, sub-metered telemetry data, cooling tower chemical optimization, and certified non-potable reuse engineering plans.",
        incorrectExplanation: "Real water resilience requires empirical auditing, sub-metering, and closed-loop engineering designs.",
        optionFeedback: [
          "Correct. Empirical balances, sub-meter logs, and engineering plans deliver permanent water savings.",
          "Incorrect. Canceling maintenance leads to undetected leaks and catastrophic pipe failures.",
          "Incorrect. Single-use bottled water creates severe plastic waste and cannot supply commercial plumbing.",
          "Incorrect. Discharging untreated commercial wastewater into storm drains is an illegal environmental crime."
        ],
        practicalTakeaway: "Deliver an empirical water audit, cooling tower optimization plan, and MBR reuse design.",
        learningOutcome: "Formulate and execute a structured 30-day commercial water circularity action plan.",
        competencyArea: "COMP_CIRCULAR_ECONOMY"
      }
    ]
  },

  // 7. ELH-111
  {
    courseCode: "ELH-111",
    title: "Zero Waste to Landfill Certification in Manufacturing",
    slug: "zero-waste-landfill-certification-manufacturing",
    description: "Master manufacturing waste characterization, UL 2799 Zero Waste to Landfill certification, industrial byproduct synergy, upstream supplier take-back programs, and circular material loops in industrial plants.",
    fullDescription: "This advanced course trains plant operations managers, environmental compliance officers, and manufacturing sustainability directors to achieve verified Zero Waste to Landfill (ZWTL) certification under international standards (UL 2799, TRUE Zero Waste). Learners master industrial waste stream auditing, source segregation, material recovery optimization, industrial symbiosis exchanges, and waste diversion accounting exceeding 90–99%.",
    categoryId: 7,
    durationMinutes: 20,
    priceUsd: "0.00",
    level: "D3 Applied",
    passingScore: 75,
    primaryCompetency: "COMP_CIRCULAR_ECONOMY",
    secondaryCompetencies: ["COMP_COMPLIANCE", "COMP_OPERATIONS"],
    learningObjectives: [
      "Conduct mass-balance manufacturing waste characterization audits across all production lines and packaging stations.",
      "Calculate Waste Diversion Rate (%) according to UL 2799 and TRUE Zero Waste validation methodologies.",
      "Implement point-of-generation waste segregation, color-coded material flow tracking, and lean 5S waste elimination.",
      "Develop industrial byproduct synergy partnerships, finding secondary manufacturing uses for process scrap and sludge.",
      "Formulate a 30-day manufacturing Zero Waste to Landfill transition and third-party audit readiness plan."
    ],
    intendedRoles: [
      "Manufacturing Plant Managers",
      "Environmental Compliance Specialists",
      "Lean & Continuous Improvement Leads",
      "Industrial Operations Directors"
    ],
    badgeName: "Zero Waste Manufacturing Specialist",
    badgeDescription: "Demonstrates applied mastery in industrial waste diversion accounting, UL 2799 compliance, and zero-waste manufacturing engineering.",
    completionMessage: "Congratulations! You have completed Zero Waste to Landfill Certification in Manufacturing. You are equipped to lead your plant to verified zero-waste operational excellence.",
    recommendedNextCourseCode: "ELH-116",
    lessons: [
      {
        orderIndex: 1,
        title: "Workplace Hook: Landfill Tipping Fee Explosion in Triolet",
        durationMinutes: 4,
        content: "A light-manufacturing and plastics processing plant in Triolet generates 45 tons of solid waste monthly, sending 88% directly to the municipal Mare Chicose landfill. Rising municipal tipping fees and new national solid waste landfill diversion regulations increase disposal costs by 240% in a single fiscal year. Furthermore, a top European corporate retail buyer threatens to cancel supply contracts unless the manufacturing facility achieves a verified >90% Zero Waste to Landfill diversion rating within 6 months. Plant management must immediately overhaul waste operations.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Modern manufacturing cannot treat waste as an inevitable byproduct—waste represents unmonetized raw materials and direct financial loss."
          },
          {
            type: "callout",
            style: "danger",
            title: "Supply Chain Exclusion Risk",
            content: "Global brands increasingly require tier-1 manufacturing suppliers to hold validated Zero Waste to Landfill (ZWTL) certifications to maintain preferred vendor status."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Diagnostic Baseline: Waste Characterization & UL 2799 Diversion Accounting",
        durationMinutes: 4,
        content: "Perform a comprehensive 100% mass-balance waste audit. Categorize all factory waste into distinct streams: metals, engineered thermoplastics, corrugated paperboard, chemical drums, organic cafeteria waste, and hazardous sludge. Calculate the Waste Diversion Rate using the UL 2799 formula: Diversion Rate (%) = (Total Material Reused + Recycled + Composted + Waste-to-Energy with Heat Recovery) ÷ Total Waste Generated × 100. Note that thermal waste-to-energy without thermal recovery is counted as landfill disposal.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "UL 2799 awards tiered certifications: Zero Waste to Landfill (100% diversion with ≤10% thermal WTE), Platinum (100%), Gold (95–99%), and Silver (90–94%)."
          },
          {
            type: "table",
            title: "UL 2799 Waste Diversion Hierarchy & Certification Tiers",
            headers: ["Certification Tier", "Minimum Overall Diversion", "Thermal WTE Cap", "Permitted Landfill Fraction"],
            rows: [
              ["Zero Waste to Landfill", "100%", "Max 10% with energy recovery", "0.0% (Zero direct landfill)"],
              ["Platinum", "100%", "Any validated diversion", "0.0%"],
              ["Gold", "95% to 99%", "Evaluated per standard", "1% to 5% maximum"],
              ["Silver", "90% to 94%", "Evaluated per standard", "6% to 10% maximum"]
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        title: "Applied Methodology: Lean 5S Segregation, Industrial Symbiosis & Upstream Re-engineering",
        durationMinutes: 4,
        content: "Deploy lean 5S waste segregation at the point of origin: place dedicated, color-coded bins directly at stamping, trimming, and CNC workstations to prevent material cross-contamination. Establish industrial symbiosis partnerships: sell clean thermoplastic sprues back to resin compounders, route clean wood pallets to furniture craftsmen, and send biological wastewater sludge to commercial composters. Work with upstream component suppliers to replace single-use wooden crates with reusable collapsible returnable plastic totes.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Preventing contamination at the workstation increases the market commodity value of recyclable manufacturing scrap by 300–500%."
          },
          {
            type: "callout",
            style: "tip",
            title: "Returnable Packaging Loop",
            content: "Replacing expendable cardboard boxes with returnable collapsible containers on a closed-loop supplier delivery route eliminates up to 40% of factory packaging waste."
          }
        ]
      },
      {
        orderIndex: 4,
        title: "Decision Scenario: Contaminated Hazardous Sludge Diversion",
        durationMinutes: 4,
        content: "A metal finishing plant produces 4 tons/month of electroplating rinse sludge containing heavy metal oxides. A rogue recycling contractor offers to haul the sludge away for $50/ton without paperwork, claiming they will mix it into agricultural fertilizer. Meanwhile, a certified hazardous waste co-processing facility charges $280/ton to stabilize and incorporate the inorganic metal oxides into certified industrial cement clinker. How should the environmental compliance manager proceed?",
        contentBlocks: [
          {
            type: "scenario",
            situation: "A metal finishing plant must dispose of hazardous electroplating sludge.",
            options: [
              {
                id: "A",
                text: "Contract the certified hazardous waste co-processing facility, verifying the cradle-to-grave manifest and ISO 14001 clinker encapsulation certificate.",
                outcome: "Optimal. Ensures 100% legal compliance, eliminates toxic environmental contamination liability, and qualifies for verified industrial diversion."
              },
              {
                id: "B",
                text: "Pay the rogue contractor $50/ton without tracking paperwork to save operating budget.",
                outcome: "Severe Criminal Liability. Results in catastrophic farmland poisoning, heavy environmental fines, plant shutdown, and executive imprisonment."
              },
              {
                id: "C",
                text: "Dump the electroplating sludge into the nearest river late at night.",
                outcome: "Egregious Environmental Crime. Destroys aquatic biodiversity, contaminates municipal water supplies, and triggers criminal prosecution."
              },
              {
                id: "D",
                text: "Hide the sludge bags inside employee locker rooms.",
                outcome: "Severe Hazard. Exposes workers to toxic chemical fumes and violates fundamental occupational health standards."
              }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        title: "Workplace Action: 30-Day Zero Waste Action Plan & Audit Preparation",
        durationMinutes: 4,
        content: "Formulate a 30-day manufacturing Zero Waste to Landfill action plan. Perform a whole-plant waste stream mass balance, install calibrated digital floor scales at waste bays, establish certified downstream vendor audit chains, and train 100% of line supervisors on contamination-free segregation. Earn your Zero Waste Manufacturing Specialist badge and proceed to ELH-116.",
        contentBlocks: [
          {
            type: "paragraph",
            content: "Third-party UL 2799 auditors inspect physical weighbridge tickets, downstream recycler processing certificates, and mass-balance reconciliations for 12 continuous months."
          },
          {
            type: "callout",
            style: "info",
            title: "Recommended Next Course",
            content: "Deepen your circular product strategy with ELH-116: Circular Economy Business Models & Product-as-a-Service."
          }
        ]
      }
    ],
    quizQuestions: [
      {
        orderIndex: 1,
        question: "Under the UL 2799 Zero Waste to Landfill standard, what is the minimum overall waste diversion rate required to achieve Silver certification?",
        options: [
          "90% to 94% diversion from landfill.",
          "50% diversion provided the rest is buried in the factory yard.",
          "10% diversion with no documentation required.",
          "100% diversion with zero waste generated by the entire country."
        ],
        correctOption: 0,
        correctExplanation: "UL 2799 tiers are: Silver (90–94%), Gold (95–99%), Platinum (100%), and Zero Waste to Landfill (100% diversion with ≤10% thermal waste-to-energy).",
        incorrectExplanation: "UL 2799 Silver certification requires a validated waste diversion rate between 90% and 94%.",
        optionFeedback: [
          "Correct. 90–94% diversion achieves UL 2799 Silver, demonstrating top-tier industrial waste management.",
          "Incorrect. 50% diversion fails all international zero-waste certification thresholds.",
          "Incorrect. 10% diversion is statistically negligible and uncertifiable.",
          "Incorrect. Certification applies to individual validated manufacturing facilities, not entire nations."
        ],
        practicalTakeaway: "Target a minimum 90% diversion rate to enter the UL 2799 certification framework.",
        learningOutcome: "Calculate manufacturing waste diversion rates under the UL 2799 validation standard.",
        competencyArea: "COMP_CIRCULAR_ECONOMY"
      },
      {
        orderIndex: 2,
        question: "How does the UL 2799 standard treat mass-burn thermal incineration without energy recovery?",
        options: [
          "It is classified as landfill disposal (0% diversion credit).",
          "It is counted as 100% material recycling.",
          "It is awarded bonus green building points.",
          "It is mandatory for all organic food waste."
        ],
        correctOption: 0,
        correctExplanation: "Under UL 2799 and TRUE standards, simple incineration without energy recovery is treated as landfill equivalent, providing zero diversion credit.",
        incorrectExplanation: "Incineration without energy recovery is counted as disposal rather than beneficial diversion.",
        optionFeedback: [
          "Correct. Incineration without energy recovery receives zero diversion credit under rigorous zero-waste standards.",
          "Incorrect. Thermal destruction is not material recycling.",
          "Incorrect. Unrecovered incineration carries negative environmental ratings.",
          "Incorrect. Organic food waste should be composted or biodigested, not mass-burned."
        ],
        practicalTakeaway: "Prioritize reduction, reuse, and recycling over thermal energy recovery to maximize diversion credits.",
        learningOutcome: "Evaluate waste treatment pathways within the zero-waste diversion hierarchy.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 3,
        question: "Why is point-of-generation waste segregation directly at the workstation critical for industrial recyclability?",
        options: [
          "It prevents cross-contamination of clean materials (e.g., oil soaking into cardboard or plastic polymers mixing), preserving their commercial market recycling value.",
          "It gives machine operators more physical exercise walking between bins.",
          "It allows factory lights to be turned off during shifts.",
          "It eliminates the need for machine maintenance."
        ],
        correctOption: 0,
        correctExplanation: "Once clean recyclable materials are mixed or contaminated with oil, grease, or incompatible resins, they become unrecyclable and must be landfilled. Segregation at the source preserves purity.",
        incorrectExplanation: "Source segregation maintains material purity and prevents cross-contamination.",
        optionFeedback: [
          "Correct. Purity at the source ensures high commodity resale value and successful recycling processing.",
          "Incorrect. Point-of-generation bins are placed within arm's reach to minimize operator travel time.",
          "Incorrect. Waste segregation does not alter factory lighting requirements.",
          "Incorrect. Machine preventive maintenance is an independent mechanical requirement."
        ],
        practicalTakeaway: "Implement color-coded 5S segregation bins directly at individual manufacturing workstations.",
        learningOutcome: "Design lean point-of-generation waste segregation systems for industrial manufacturing lines.",
        competencyArea: "COMP_OPERATIONS"
      },
      {
        orderIndex: 4,
        question: "What is 'Industrial Symbiosis' in the context of manufacturing circular economy?",
        options: [
          "An operational collaboration where the waste, byproduct, or effluent of one industrial plant becomes the raw material or energy input for an adjacent facility.",
          "A marketing partnership where companies share the same advertising billboard.",
          "A legal merger of two bankrupt manufacturing companies.",
          "An automated computer virus that synchronizes factory clocks."
        ],
        correctOption: 0,
        correctExplanation: "Industrial symbiosis creates closed-loop multi-enterprise ecosystems (like Kalundborg Eco-Industrial Park) where byproducts, steam, and waste materials are traded as valuable inputs.",
        incorrectExplanation: "Industrial symbiosis turns one company's waste byproduct into another company's valuable feedstock.",
        optionFeedback: [
          "Correct. Industrial symbiosis monetizes waste by converting byproducts into secondary raw materials.",
          "Incorrect. Shared advertising is a commercial marketing tactic, not material symbiosis.",
          "Incorrect. Corporate mergers are financial restructurings.",
          "Incorrect. Industrial symbiosis relates to physical material and energy resource flows."
        ],
        practicalTakeaway: "Identify local industrial partners capable of utilizing your manufacturing byproducts as feedstocks.",
        learningOutcome: "Develop industrial symbiosis and byproduct exchange partnerships.",
        competencyArea: "COMP_CIRCULAR_ECONOMY"
      },
      {
        orderIndex: 5,
        question: "How does transitioning from single-use corrugated cardboard boxes to reusable returnable plastic containers (RPCs) benefit manufacturing operations?",
        options: [
          "It eliminates recurring packaging procurement costs, eliminates packaging waste generation, and provides superior mechanical protection for inbound components.",
          "It increases factory floor weight so the building does not float away.",
          "It allows workers to dissolve the plastic containers in drinking water.",
          "It requires 10 times more cardboard to be purchased every month."
        ],
        correctOption: 0,
        correctExplanation: "Returnable collapsible plastic containers circulate in closed supplier loops hundreds of times, eliminating thousands of single-use cardboard boxes and cutting operating costs.",
        incorrectExplanation: "Returnable packaging eliminates recurring packaging procurement costs and packaging waste.",
        optionFeedback: [
          "Correct. Reusable containers eliminate continuous packaging waste and deliver rapid multi-cycle payback.",
          "Incorrect. Returnable totes are lightweight and stackable, designed for lean logistics.",
          "Incorrect. Reusable plastic totes are durable polymers that do not dissolve in water.",
          "Incorrect. Reusable totes replace cardboard boxes, dramatically reducing cardboard consumption."
        ],
        practicalTakeaway: "Collaborate with tier-1 suppliers to replace single-use boxes with returnable packaging loops.",
        learningOutcome: "Design closed-loop returnable packaging programs with industrial supply chain partners.",
        competencyArea: "COMP_OPERATIONS"
      },
      {
        orderIndex: 6,
        question: "What documentation must a manufacturing facility maintain to prove 'cradle-to-grave' traceability during a third-party Zero Waste audit?",
        options: [
          "Certified weighbridge tickets, downstream recycling processor verification letters, hazardous waste manifests, and mass-balance reconciliation spreadsheets.",
          "A handwritten diary entry stating that no waste was thrown away this year.",
          "Photographs of clean empty trash cans taken before the factory opened.",
          "A certificate of incorporation from the registrar of companies."
        ],
        correctOption: 0,
        correctExplanation: "Third-party certification bodies (UL, Green Business Certification Inc.) require empirical mass-balance logs matching outgoing weighbridge receipts with certified recycler processing records.",
        incorrectExplanation: "Auditors require verified weighbridge logs, recycler processing manifests, and empirical mass balances.",
        optionFeedback: [
          "Correct. Empirical weighbridge tickets and downstream processor certificates prove chain of custody.",
          "Incorrect. Unsubstantiated diary notes fail all third-party audit verification standards.",
          "Incorrect. Empty bin photos do not prove where waste was ultimately transported and processed.",
          "Incorrect. Company registration is a corporate legal document, not waste traceability evidence."
        ],
        practicalTakeaway: "Maintain a complete 12-month digital database of weighbridge tickets and recycler disposition certificates.",
        learningOutcome: "Establish chain-of-custody documentation and audit readiness for zero-waste certification.",
        competencyArea: "COMP_COMPLIANCE"
      },
      {
        orderIndex: 7,
        question: "In lean manufacturing, what does the term 'Overproduction' represent in relation to waste generation?",
        options: [
          "Manufacturing goods ahead of demand, creating excess inventory that risks product obsolescence, damage, packaging scrap, and eventual disposal.",
          "Producing items at twice the speed of light.",
          "Hiring more employees than there are chairs in the cafeteria.",
          "Operating factory machines during national public holidays."
        ],
        correctOption: 0,
        correctExplanation: "Overproduction is considered the worst of the 7 Lean Wastes because it consumes raw materials, energy, and warehouse space, frequently ending in scrap when designs or demand change.",
        incorrectExplanation: "Overproduction ties up capital and often leads directly to obsolete product scrapping and landfilling.",
        optionFeedback: [
          "Correct. Overproduction drives material obsolescence, scrap generation, and unnecessary raw material extraction.",
          "Incorrect. Manufacturing physical speeds are bounded by machine mechanical tolerances.",
          "Incorrect. Staffing ratios relate to human resource planning, not manufacturing overproduction waste.",
          "Incorrect. Shift scheduling does not define lean overproduction if output matches pull customer demand."
        ],
        practicalTakeaway: "Implement pull production (Kanban) to eliminate overproduction and prevent material obsolescence scrap.",
        learningOutcome: "Apply lean manufacturing principles to eliminate root causes of industrial waste generation.",
        competencyArea: "COMP_OPERATIONS"
      },
      {
        orderIndex: 8,
        question: "What is the primary deliverable of a 30-day Zero Waste to Landfill implementation roadmap?",
        options: [
          "A verified 100% plant waste characterization baseline, a formal UL 2799 diversion rate calculation, 5S workstation segregation deployment, and audited recycler partner agreements.",
          "A contract to bury all industrial waste on private agricultural land.",
          "A marketing press release declaring zero waste before any changes are made on the factory floor.",
          "An order to cancel all employee waste training programs to save time."
        ],
        correctOption: 0,
        correctExplanation: "A 30-day ZWTL action plan establishes baseline mass balances, deploys physical 5S segregation across all production lines, and signs verified agreements with certified recycling processors.",
        incorrectExplanation: "Zero-waste readiness requires empirical mass balances, shop-floor 5S segregation, and certified recycler contracts.",
        optionFeedback: [
          "Correct. Baseline audits, 5S shop-floor segregation, and verified vendor chains establish true zero-waste readiness.",
          "Incorrect. Burying waste on agricultural land is an illegal and hazardous environmental violation.",
          "Incorrect. Unsubstantiated marketing claims constitute illegal greenwashing.",
          "Incorrect. Frontline employee training is critical to ensure contamination-free waste segregation."
        ],
        practicalTakeaway: "Deliver an empirical waste baseline, 5S workstation bins, and verified downstream recycling contracts.",
        learningOutcome: "Formulate a structured 30-day Zero Waste to Landfill operational action plan.",
        competencyArea: "COMP_CIRCULAR_ECONOMY"
      }
    ]
  }
];

console.log("BATCH3E_DATA_A successfully constructed with 7 courses.");
